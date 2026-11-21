import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { List, ChevronDown, Check } from 'lucide-react';
import { playCutePop } from '../utils/audio';

export interface UnitSelectOption {
  value: string | number;
  label: string;
  groupLabel?: string;
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const activeOptionRef = useRef<HTMLButtonElement | null>(null);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});

  const currentOption = options.find((o) => String(o.value) === String(value));
  const fullTooltip = currentOption ? `${title}: ${currentOption.label}` : title;

  const updatePanelPosition = useCallback(() => {
    const triggerEl = containerRef.current;
    if (!triggerEl) return;
    const rect = triggerEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const edgePad = 8;
    const maxW = Math.min(380, vw - edgePad * 2);
    const measuredW = panelRef.current?.offsetWidth || Math.min(maxW, Math.max(rect.width, 260));
    const panelW = Math.min(measuredW, maxW);

    let leftPos = align === 'right' ? rect.right - panelW : rect.left;
    if (leftPos < edgePad) {
      leftPos = edgePad;
    }
    if (leftPos + panelW > vw - edgePad) {
      leftPos = Math.max(edgePad, vw - panelW - edgePad);
    }

    const availableBelow = vh - rect.bottom - 12;
    const maxH = Math.max(160, Math.min(Math.round(vh * 0.54), availableBelow));
    const topPos = Math.max(8, Math.min(rect.bottom + 2, vh - Math.min(maxH, 200) - 8));

    setPanelStyle({
      position: 'fixed',
      top: `${Math.round(topPos)}px`,
      left: `${Math.round(leftPos)}px`,
      minWidth: `${Math.max(Math.round(rect.width), 160)}px`,
      maxWidth: `${maxW}px`,
      maxHeight: `${Math.round(maxH)}px`,
      zIndex: 90,
    });
  }, [align]);

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
    if (!isOpen) return;

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

  const triggerThemeClasses =
    theme === 'amber'
      ? 'bg-white hover:bg-amber-50 text-amber-950 border-amber-300'
      : theme === 'purple'
      ? 'bg-white hover:bg-purple-50 text-purple-950 border-purple-300'
      : theme === 'emerald'
      ? 'bg-white hover:bg-emerald-50 text-emerald-950 border-emerald-300'
      : 'bg-white hover:bg-rose-50 text-rose-950 border-rose-300';

  const chevronColor =
    theme === 'amber'
      ? 'text-amber-700'
      : theme === 'purple'
      ? 'text-purple-700'
      : theme === 'emerald'
      ? 'text-emerald-700'
      : 'text-rose-600';

  const panelBorderClasses =
    theme === 'amber'
      ? 'border-amber-400'
      : theme === 'purple'
      ? 'border-purple-400'
      : theme === 'emerald'
      ? 'border-emerald-400'
      : 'border-rose-400';

  const activeItemClasses =
    theme === 'amber'
      ? 'bg-amber-100/90 text-amber-950 font-black'
      : theme === 'purple'
      ? 'bg-purple-100/90 text-purple-950 font-black'
      : theme === 'emerald'
      ? 'bg-emerald-100/90 text-emerald-950 font-black'
      : 'bg-rose-100/90 text-rose-950 font-black';

  const hoverItemClasses =
    theme === 'amber'
      ? 'hover:bg-amber-50 text-slate-800'
      : theme === 'purple'
      ? 'hover:bg-purple-50 text-slate-800'
      : theme === 'emerald'
      ? 'hover:bg-emerald-50 text-slate-800'
      : 'hover:bg-rose-50 text-slate-800';

  const listboxPortal =
    isOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={panelRef}
            role="listbox"
            aria-label={ariaLabel}
            style={panelStyle}
            className={`w-max overflow-y-auto bg-white border-2 shadow-xl rounded-none py-0.5 font-korean-gothic ${panelBorderClasses}`}
          >
            {options.map((opt, idx) => {
              const isSelected = String(opt.value) === String(value);
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
                    onClick={() => {
                      playCutePop();
                      onChange(String(opt.value));
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs sm:text-[13px] flex items-center justify-between gap-2.5 cursor-pointer transition-colors border-b border-slate-100 last:border-b-0 whitespace-normal break-keep leading-snug sm:whitespace-nowrap ${
                      isSelected ? activeItemClasses : `font-bold ${hoverItemClasses}`
                    }`}
                  >
                    <span className="min-w-0">{opt.label}</span>
                    {isSelected && <Check className={`w-3.5 h-3.5 shrink-0 ${chevronColor}`} />}
                  </button>
                </React.Fragment>
              );
            })}
          </div>,
          document.body
        )
      : null;

  return (
    <div
      ref={containerRef}
      className={`relative select-none font-korean-gothic ${
        compactIcon ? 'w-8 sm:w-8.5 shrink-0' : className || 'min-w-[120px] max-w-[260px]'
      }`}
    >
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
        className={
          compactIcon
            ? `w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-none border flex items-center justify-center gap-0 cursor-pointer transition-colors focus:outline-none ${triggerThemeClasses}`
            : `w-full h-8 sm:h-8.5 px-2 sm:px-3 rounded-none border flex items-center justify-between gap-1 sm:gap-1.5 cursor-pointer transition-colors focus:outline-none whitespace-nowrap overflow-hidden ${triggerThemeClasses}`
        }
      >
        {compactIcon ? (
          <>
            <List className="w-3.5 h-3.5 shrink-0" />
            <ChevronDown
              className={`w-2.5 h-2.5 -ml-0.5 shrink-0 transition-transform duration-150 ${chevronColor} ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </>
        ) : (
          <>
            <span className="truncate font-black text-[11.5px] sm:text-[13px] leading-none whitespace-nowrap min-w-0 text-left">
              {currentOption ? currentOption.label : title}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${chevronColor} ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </>
        )}
      </button>

      {listboxPortal}
    </div>
  );
};
