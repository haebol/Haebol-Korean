import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { List, LayoutGrid, Search, X, ChevronDown, ChevronLeft, ChevronRight, Check, BookOpen, Lock } from 'lucide-react';
import { playCutePop } from '../utils/audio';

export interface UnitSelectOption {
  value: string | number;
  label: string;
  shortLabel?: string;
  searchText?: string;
  groupLabel?: string;
  disabled?: boolean;
  lockedLabel?: string;
}

interface CompactUnitSelectButtonProps {
  value: string | number;
  onChange: (value: string) => void;
  options: UnitSelectOption[];
  theme?: 'amber' | 'rose' | 'purple' | 'emerald';
  title?: string;
  ariaLabel?: string;
  align?: 'left' | 'right';
  className?: string;
  compactIcon?: boolean;
  popoverLayout?: 'list' | 'grid';
  searchPlaceholder?: string;
  variant?: 'default' | 'twin';
  footerAction?: {
    label: string;
    onClick: () => void;
  };
}

export const CompactUnitSelectButton: React.FC<CompactUnitSelectButtonProps> = ({
  value,
  onChange,
  options,
  theme = 'rose',
  title = '단원 선택',
  ariaLabel = '단원 선택 드롭다운',
  align = 'left',
  className = '',
  compactIcon = false,
  popoverLayout = 'list',
  searchPlaceholder = '단원 검색...',
  variant = 'default',
  footerAction,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const activeOptionRef = useRef<HTMLButtonElement | null>(null);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  const isGridPopover = popoverLayout === 'grid';
  const isTwin = variant === 'twin';

  const matchedIndex = options.findIndex((o) => String(o.value) === String(value));
  const currentIndex = matchedIndex >= 0 ? matchedIndex : 0;
  const currentOption = matchedIndex >= 0 ? options[matchedIndex] : options[0];
  const totalCount = options.length;
  const prevEnabledIndex = (() => {
    for (let i = currentIndex - 1; i >= 0; i -= 1) {
      if (!options[i]?.disabled) return i;
    }
    return -1;
  })();
  const nextEnabledIndex = (() => {
    for (let i = currentIndex + 1; i < totalCount; i += 1) {
      if (!options[i]?.disabled) return i;
    }
    return -1;
  })();
  const hasPrev = prevEnabledIndex >= 0;
  const hasNext = nextEnabledIndex >= 0;
  const fullTooltip = currentOption ? `${title}: ${currentOption.label}` : title;

  const filteredOptions = useMemo(() => {
    if (!isGridPopover) return options;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => {
      const haystack = `${opt.shortLabel || ''} ${opt.label} ${opt.searchText || ''} ${opt.value}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [isGridPopover, options, searchQuery]);

  const handlePrev = () => {
    if (!hasPrev) return;
    playCutePop();
    setIsOpen(false);
    onChange(String(options[prevEnabledIndex].value));
  };

  const handleNext = () => {
    if (!hasNext) return;
    playCutePop();
    setIsOpen(false);
    onChange(String(options[nextEnabledIndex].value));
  };

  const updatePanelPosition = useCallback(() => {
    const triggerEl = containerRef.current;
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const edgePad = 8;
    const targetGridW = Math.min(368, vw - edgePad * 2);
    const maxW = isGridPopover ? targetGridW : Math.min(440, vw - edgePad * 2);
    const measuredW = isGridPopover
      ? targetGridW
      : panelRef.current?.offsetWidth || Math.min(maxW, Math.max(rect.width, 260));
    const panelW = Math.min(measuredW, maxW);

    let leftPos = align === 'right' ? rect.right - panelW : rect.left;
    if (leftPos < edgePad) {
      leftPos = edgePad;
    }
    if (leftPos + panelW > vw - edgePad) {
      leftPos = Math.max(edgePad, vw - panelW - edgePad);
    }

    const availableBelow = vh - rect.bottom - 12;
    const maxH = isGridPopover
      ? Math.max(220, Math.min(Math.round(vh * 0.66), availableBelow))
      : Math.max(160, Math.min(Math.round(vh * 0.54), availableBelow));
    const topPos = Math.max(8, Math.min(rect.bottom + (isGridPopover || isTwin ? 6 : 2), vh - Math.min(maxH, 220) - 8));

    setPanelStyle({
      position: 'fixed',
      top: `${Math.round(topPos)}px`,
      left: `${Math.round(leftPos)}px`,
      width: isGridPopover ? `${Math.round(panelW)}px` : undefined,
      minWidth: isGridPopover ? undefined : `${Math.max(Math.round(rect.width), 180)}px`,
      maxWidth: `${maxW}px`,
      maxHeight: `${Math.round(maxH)}px`,
      zIndex: 90,
    });
  }, [align, isGridPopover, isTwin]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePanelPosition();
    const rafId = requestAnimationFrame(updatePanelPosition);
    window.addEventListener('resize', updatePanelPosition);
    window.addEventListener('scroll', updatePanelPosition, true);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updatePanelPosition);
      window.removeEventListener('scroll', updatePanelPosition, true);
    };
  }, [isOpen, updatePanelPosition, options.length]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      return;
    }

    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const inTrigger = containerRef.current?.contains(target);
      const inPanel = panelRef.current?.contains(target);
      if (!inTrigger && !inPanel) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside, { passive: true });
    document.addEventListener('keydown', handleKey);

    if (activeOptionRef.current) {
      activeOptionRef.current.scrollIntoView({ block: 'nearest' });
    }

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const outerThemeClasses = isTwin
    ? 'bg-[#FCF9FF] text-[#240D42] border-purple-200/95 shadow-2xs'
    : theme === 'amber'
    ? 'bg-white text-amber-950 border-amber-300'
    : theme === 'purple'
    ? 'bg-white text-purple-950 border-purple-300'
    : theme === 'emerald'
    ? 'bg-white text-[#214A1C] border-[#84C678]'
    : 'bg-white text-rose-950 border-rose-300';

  const hoverBgClasses = isTwin
    ? 'hover:bg-purple-50/90'
    : theme === 'amber'
    ? 'hover:bg-amber-50'
    : theme === 'purple'
    ? 'hover:bg-purple-50'
    : theme === 'emerald'
    ? 'hover:bg-[#F3FAF0]'
    : 'hover:bg-rose-50';

  const dividerThemeClasses = isTwin
    ? 'border-purple-200/85'
    : theme === 'amber'
    ? 'border-amber-200'
    : theme === 'purple'
    ? 'border-purple-200'
    : theme === 'emerald'
    ? 'border-[#C3E0B8]'
    : 'border-rose-200';

  const badgeThemeClasses = isTwin
    ? 'bg-white border-purple-200/90 text-[#3B1668]'
    : theme === 'amber'
    ? 'bg-amber-50/70 border-amber-300/80 text-amber-950'
    : theme === 'purple'
    ? 'bg-purple-50/70 border-purple-300/80 text-purple-950'
    : theme === 'emerald'
    ? 'bg-[#F3FAF0] border-[#84C678]/80 text-[#214A1C]'
    : 'bg-rose-50/70 border-rose-300/80 text-rose-950';

  const triggerThemeClasses = `${outerThemeClasses} ${hoverBgClasses}`;

  const chevronColor = isTwin
    ? 'text-[#5B21B6]'
    : theme === 'amber'
    ? 'text-amber-700'
    : theme === 'purple'
    ? 'text-purple-700'
    : theme === 'emerald'
    ? 'text-[#448E3A]'
    : 'text-rose-600';

  const panelBorderClasses = isTwin
    ? 'border-purple-300'
    : theme === 'amber'
    ? 'border-amber-400'
    : theme === 'purple'
    ? 'border-purple-400'
    : theme === 'emerald'
    ? 'border-[#69B35C]'
    : 'border-rose-400';

  const activeItemClasses = isTwin
    ? 'bg-purple-100/90 text-[#3B1668] font-black'
    : theme === 'amber'
    ? 'bg-amber-100/90 text-amber-950 font-black'
    : theme === 'purple'
    ? 'bg-purple-100/90 text-purple-950 font-black'
    : theme === 'emerald'
    ? 'bg-[#E7F4E2] text-[#214A1C] font-black'
    : 'bg-rose-100/90 text-rose-950 font-black';

  const hoverItemClasses = isTwin
    ? 'hover:bg-purple-50 text-slate-800'
    : theme === 'amber'
    ? 'hover:bg-amber-50 text-slate-800'
    : theme === 'purple'
    ? 'hover:bg-purple-50 text-slate-800'
    : theme === 'emerald'
    ? 'hover:bg-[#F3FAF0] text-slate-800'
    : 'hover:bg-rose-50 text-slate-800';

  const gridOuterBorder = isTwin
    ? 'border-purple-200'
    : theme === 'amber'
    ? 'border-amber-200'
    : theme === 'purple'
    ? 'border-purple-200'
    : theme === 'emerald'
    ? 'border-[#C3E0B8]'
    : 'border-rose-200';
  const gridSearchFocus = isTwin
    ? 'focus-within:border-purple-400'
    : theme === 'amber'
    ? 'focus-within:border-amber-400'
    : theme === 'purple'
    ? 'focus-within:border-purple-400'
    : theme === 'emerald'
    ? 'focus-within:border-[#69B35C]'
    : 'focus-within:border-rose-300';
  const gridTileActive = isTwin
    ? 'bg-purple-100 border-[#3B1668] text-[#2E1052] font-black shadow-2xs ring-1 ring-[#3B1668]/20'
    : theme === 'amber'
    ? 'bg-amber-100 border-amber-600 text-amber-950 font-black shadow-2xs ring-1 ring-amber-600/20'
    : theme === 'purple'
    ? 'bg-purple-100 border-purple-700 text-purple-950 font-black shadow-2xs ring-1 ring-purple-700/20'
    : theme === 'emerald'
    ? 'bg-[#E7F4E2] border-[#448E3A] text-[#214A1C] font-black shadow-2xs ring-1 ring-[#448E3A]/20'
    : 'bg-[#FDECE4] border-[#5C3A31] text-[#3B1D16] font-black shadow-2xs ring-1 ring-[#5C3A31]/20';
  const gridTileInactive = isTwin
    ? 'bg-[#FDFBFF] hover:bg-purple-50 border-purple-200/85 hover:border-purple-300 text-slate-700 hover:text-[#2E1052] font-bold'
    : theme === 'amber'
    ? 'bg-[#FFFDF7] hover:bg-amber-50 border-amber-200/85 hover:border-amber-300 text-slate-700 hover:text-amber-950 font-bold'
    : theme === 'purple'
    ? 'bg-[#FDFBFF] hover:bg-purple-50 border-purple-200/85 hover:border-purple-300 text-slate-700 hover:text-purple-950 font-bold'
    : theme === 'emerald'
    ? 'bg-[#F9FCF8] hover:bg-[#F3FAF0] border-[#C3E0B8]/85 hover:border-[#84C678] text-slate-700 hover:text-[#214A1C] font-bold'
    : 'bg-[#FFFBFB] hover:bg-rose-50 border-rose-200/85 hover:border-rose-300 text-slate-700 hover:text-rose-950 font-bold';
  const gridFooterClasses =
    theme === 'amber'
      ? 'border-amber-200 bg-amber-50/75 hover:bg-amber-100/80 text-amber-950'
      : theme === 'purple'
      ? 'border-purple-200 bg-purple-50/75 hover:bg-purple-100/80 text-purple-950'
      : theme === 'emerald'
      ? 'border-[#C3E0B8] bg-[#F3FAF0]/85 hover:bg-[#E7F4E2] text-[#214A1C]'
      : 'border-rose-200 bg-rose-50/75 hover:bg-rose-100/80 text-rose-950';

  const listboxPortal =
    isOpen && typeof document !== 'undefined'
      ? createPortal(
          isGridPopover ? (
            <div
              ref={panelRef}
              role="listbox"
              aria-label={ariaLabel}
              style={panelStyle}
              className={`flex flex-col bg-white border ${gridOuterBorder} shadow-[0_14px_38px_rgba(59,22,104,0.16)] rounded-2xl overflow-hidden font-korean-gothic`}
            >
              {/* Sticky Search Input Header */}
              <div className="p-2.5 pb-2 bg-white border-b border-purple-100/80 shrink-0">
                <div className={`h-9 px-2.5 rounded-lg bg-[#F5F2F8] border border-transparent ${gridSearchFocus} focus-within:bg-white flex items-center gap-2 transition-colors`}>
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full bg-transparent text-[13px] font-semibold text-slate-800 placeholder:text-slate-400 focus:outline-none"
                    aria-label={searchPlaceholder}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="p-0.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="검색어 지우기"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* 3-Column Grid of Unit Tiles */}
              <div className="overflow-y-auto p-2.5 pt-2">
                {filteredOptions.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {filteredOptions.map((opt) => {
                      const isSelected = String(opt.value) === String(value);
                      const isDisabled = Boolean(opt.disabled);
                      return (
                        <button
                          key={opt.value}
                          ref={isSelected ? activeOptionRef : undefined}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={isDisabled}
                          disabled={isDisabled}
                          title={isDisabled ? `${opt.label} (${opt.lockedLabel || '준비중'})` : opt.label}
                          onClick={() => {
                            if (isDisabled) return;
                            playCutePop();
                            onChange(String(opt.value));
                            setIsOpen(false);
                          }}
                          className={`min-h-[38px] px-2 py-1.5 rounded-lg border text-[12.5px] leading-tight text-center flex items-center justify-center gap-1 transition-all truncate ${
                            isDisabled
                              ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                              : isSelected
                              ? `cursor-pointer ${gridTileActive}`
                              : `cursor-pointer ${gridTileInactive}`
                          }`}
                        >
                          {isDisabled && <Lock className="w-3 h-3 shrink-0" />}
                          <span className="truncate">{opt.shortLabel || opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs font-bold text-slate-400">
                    검색 결과가 없습니다
                  </div>
                )}

                {footerAction && (!searchQuery.trim() || footerAction.label.toLowerCase().includes(searchQuery.trim().toLowerCase())) && (
                  <div className={`mt-2.5 pt-2 border-t ${gridOuterBorder}`}>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setIsOpen(false);
                        footerAction.onClick();
                      }}
                      className={`w-full min-h-[38px] px-3 py-2 rounded-lg border font-black text-[12.5px] flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${gridFooterClasses}`}
                    >
                      <BookOpen className={`w-3.5 h-3.5 shrink-0 ${chevronColor}`} />
                      <span>{footerAction.label}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              ref={panelRef}
              role="listbox"
              aria-label={ariaLabel}
              style={panelStyle}
              className={`w-max overflow-y-auto bg-white border shadow-xl py-1 font-korean-gothic ${
                isTwin ? 'rounded-xl border-purple-200 shadow-[0_14px_38px_rgba(59,22,104,0.16)]' : `border-2 rounded-none py-0.5 ${panelBorderClasses}`
              }`}
            >
              {options.map((opt, idx) => {
                const isSelected = String(opt.value) === String(value);
                const isDisabled = Boolean(opt.disabled);
                const prevGroup = idx > 0 ? options[idx - 1].groupLabel : undefined;
                const showGroupHeader = Boolean(opt.groupLabel && opt.groupLabel !== prevGroup);
                return (
                  <React.Fragment key={opt.value}>
                    {showGroupHeader && (
                      <div className="sticky top-0 z-10 px-3 py-1 bg-slate-100/95 border-y border-slate-200 text-[10.5px] font-black text-slate-600 tracking-tight">
                        {opt.groupLabel}
                      </div>
                    )}
                    <button
                      ref={isSelected ? activeOptionRef : undefined}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={isDisabled}
                      disabled={isDisabled}
                      onClick={() => {
                        if (isDisabled) return;
                        playCutePop();
                        onChange(String(opt.value));
                        setIsOpen(false);
                      }}
                      className={`w-full px-3.5 py-2 text-left text-xs sm:text-[13px] flex items-center justify-between gap-2.5 transition-colors border-b border-slate-100 last:border-b-0 whitespace-normal break-keep leading-snug sm:whitespace-nowrap ${
                        isDisabled
                          ? 'bg-slate-50/90 text-slate-400 font-semibold cursor-not-allowed'
                          : isSelected
                          ? `cursor-pointer ${activeItemClasses}`
                          : `cursor-pointer font-bold ${hoverItemClasses}`
                      }`}
                    >
                      <span className="min-w-0 flex items-center gap-1.5">
                        {isDisabled && <Lock className="w-3 h-3 shrink-0 text-slate-400" />}
                        <span className="min-w-0">{opt.label}</span>
                      </span>
                      {isDisabled ? (
                        <span className="text-[10.5px] font-bold text-slate-400 shrink-0">
                          {opt.lockedLabel || '준비중'}
                        </span>
                      ) : (
                        isSelected && <Check className={`w-3.5 h-3.5 shrink-0 ${chevronColor}`} />
                      )}
                    </button>
                  </React.Fragment>
                );
              })}

              {footerAction && (
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setIsOpen(false);
                    footerAction.onClick();
                  }}
                  className={`w-full px-3.5 py-2.5 text-left text-xs sm:text-[13px] font-black flex items-center gap-2 cursor-pointer transition-colors border-t-2 border-slate-200 bg-slate-50/85 ${hoverItemClasses}`}
                >
                  <BookOpen className={`w-3.5 h-3.5 shrink-0 ${chevronColor}`} />
                  <span>{footerAction.label}</span>
                </button>
              )}
            </div>
          ),
          document.body
        )
      : null;

  return (
    <div
      ref={containerRef}
      className={`relative select-none font-korean-gothic ${
        compactIcon ? 'w-8 sm:w-8.5 shrink-0' : className || 'min-w-[180px] max-w-[340px]'
      }`}
    >
      {compactIcon ? (
        <button
          type="button"
          onClick={() => {
            playCutePop();
            setIsOpen((prev) => !prev);
          }}
          aria-label={ariaLabel}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          title={fullTooltip}
          className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-none border flex items-center justify-center gap-0 cursor-pointer transition-colors focus:outline-none ${triggerThemeClasses}`}
        >
          {isGridPopover ? (
            <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <List className="w-3.5 h-3.5 shrink-0" />
          )}
          <ChevronDown
            className={`w-2.5 h-2.5 -ml-0.5 shrink-0 transition-transform duration-150 ${chevronColor} ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      ) : (
        <div
          className={`w-full ${
            isTwin ? 'h-[38px] rounded-md' : 'h-8 sm:h-8.5 rounded-none'
          } border flex items-stretch overflow-hidden ${outerThemeClasses}`}
        >
          {/* Left Prev Unit Button */}
          <button
            type="button"
            disabled={!hasPrev}
            onClick={handlePrev}
            aria-label="이전 단원"
            title={hasPrev ? `이전: ${options[prevEnabledIndex].label}` : '첫 번째 단원'}
            className={`${
              isTwin ? 'w-[34px]' : 'w-5.5 sm:w-7'
            } h-full shrink-0 flex items-center justify-center border-r transition-colors focus:outline-none ${dividerThemeClasses} ${
              hasPrev
                ? `cursor-pointer ${hoverBgClasses} ${chevronColor}`
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className={isTwin ? 'w-4 h-4 stroke-[2.25]' : 'w-3.5 h-3.5 stroke-[2.25]'} />
          </button>

          {/* Center Dropdown Trigger: Label + [current/total on PC twin only] + ChevronDown */}
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setIsOpen((prev) => !prev);
            }}
            aria-label={ariaLabel}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            title={fullTooltip}
            className={`flex-1 min-w-0 h-full ${
              isTwin ? 'px-3 gap-2' : 'px-1.5 sm:px-2 gap-1'
            } flex items-center justify-between cursor-pointer transition-colors focus:outline-none whitespace-nowrap overflow-hidden ${hoverBgClasses}`}
          >
            <span
              className={`truncate font-black ${
                isTwin ? 'text-[13.5px]' : 'text-[11.5px] sm:text-[13px]'
              } leading-none whitespace-nowrap min-w-0 text-left`}
            >
              {currentOption ? currentOption.label : title}
            </span>
            <span className="flex items-center gap-1.5 shrink-0">
              {isTwin && totalCount > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-sm text-[11.5px] font-extrabold border leading-none tabular-nums tracking-tight ${badgeThemeClasses}`}
                >
                  {currentIndex + 1}/{totalCount}
                </span>
              )}
              <ChevronDown
                className={`${
                  isTwin ? 'w-4 h-4' : 'w-3 h-3 sm:w-3.5 sm:h-3.5'
                } shrink-0 transition-transform duration-150 ${chevronColor} ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>

          {/* Right Next Unit Button */}
          <button
            type="button"
            disabled={!hasNext}
            onClick={handleNext}
            aria-label="다음 단원"
            title={hasNext ? `다음: ${options[nextEnabledIndex].label}` : '마지막 단원'}
            className={`${
              isTwin ? 'w-[34px]' : 'w-5.5 sm:w-7'
            } h-full shrink-0 flex items-center justify-center border-l transition-colors focus:outline-none ${dividerThemeClasses} ${
              hasNext
                ? `cursor-pointer ${hoverBgClasses} ${chevronColor}`
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            <ChevronRight className={isTwin ? 'w-4 h-4 stroke-[2.25]' : 'w-3.5 h-3.5 stroke-[2.25]'} />
          </button>
        </div>
      )}

      {listboxPortal}
    </div>
  );
};
