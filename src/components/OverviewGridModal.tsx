import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, LayoutGrid } from 'lucide-react';
import { playCutePop } from '../utils/audio';
import { UiLanguage, MENU_EXTRAS_UI } from '../i18n/uiTranslations';

export type OverviewThemeColor = 'amber' | 'rose' | 'purple' | 'teal' | 'sky' | 'emerald';

export interface OverviewCardItem {
  id: string | number;
  targetIdx: number;
  pageLabel: string;
  title: string;
  subtitle?: string;
  previewMain: string;
  previewSecondary?: string;
  previewChips?: string[];
  themeColor?: OverviewThemeColor;
  isActive?: boolean;
  groupLabel?: string;
}

interface OverviewGridModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  accentTheme?: OverviewThemeColor;
  items: OverviewCardItem[];
  onSelectItem: (item: OverviewCardItem) => void;
  uiLang?: UiLanguage;
}

const THEME_STYLES: Record<OverviewThemeColor, {
  headerBg: string;
  headerText: string;
  badgeBg: string;
  cardBorder: string;
  cardActiveBorder: string;
  cardActiveBg: string;
  miniBarBg: string;
  miniBarText: string;
  previewMainText: string;
  chipBg: string;
}> = {
  amber: {
    headerBg: 'from-amber-50 to-orange-50/80 border-amber-200',
    headerText: 'text-amber-950',
    badgeBg: 'bg-amber-500 text-white',
    cardBorder: 'border-amber-200 hover:border-amber-400',
    cardActiveBorder: 'border-amber-500 ring-2 ring-amber-400/70',
    cardActiveBg: 'bg-amber-50/70',
    miniBarBg: 'bg-amber-100/90 border-b border-amber-200',
    miniBarText: 'text-amber-950',
    previewMainText: 'text-amber-900',
    chipBg: 'bg-amber-50 text-amber-900 border-amber-200',
  },
  rose: {
    headerBg: 'from-rose-50 to-pink-50/80 border-rose-200',
    headerText: 'text-rose-950',
    badgeBg: 'bg-[#D94A6B] text-white',
    cardBorder: 'border-rose-200 hover:border-rose-400',
    cardActiveBorder: 'border-[#D94A6B] ring-2 ring-rose-400/70',
    cardActiveBg: 'bg-rose-50/70',
    miniBarBg: 'bg-rose-100/90 border-b border-rose-200',
    miniBarText: 'text-rose-950',
    previewMainText: 'text-rose-900',
    chipBg: 'bg-rose-50 text-rose-900 border-rose-200',
  },
  purple: {
    headerBg: 'from-purple-50 to-fuchsia-50/80 border-purple-200',
    headerText: 'text-purple-950',
    badgeBg: 'bg-purple-600 text-white',
    cardBorder: 'border-purple-200 hover:border-purple-400',
    cardActiveBorder: 'border-purple-600 ring-2 ring-purple-400/70',
    cardActiveBg: 'bg-purple-50/70',
    miniBarBg: 'bg-purple-100/90 border-b border-purple-200',
    miniBarText: 'text-purple-950',
    previewMainText: 'text-purple-900',
    chipBg: 'bg-purple-50 text-purple-900 border-purple-200',
  },
  teal: {
    headerBg: 'from-teal-50 to-emerald-50/80 border-teal-200',
    headerText: 'text-teal-950',
    badgeBg: 'bg-teal-600 text-white',
    cardBorder: 'border-teal-200 hover:border-teal-400',
    cardActiveBorder: 'border-teal-600 ring-2 ring-teal-400/70',
    cardActiveBg: 'bg-teal-50/70',
    miniBarBg: 'bg-teal-100/90 border-b border-teal-200',
    miniBarText: 'text-teal-950',
    previewMainText: 'text-teal-900',
    chipBg: 'bg-teal-50 text-teal-900 border-teal-200',
  },
  sky: {
    headerBg: 'from-sky-50 to-blue-50/80 border-sky-200',
    headerText: 'text-sky-950',
    badgeBg: 'bg-sky-600 text-white',
    cardBorder: 'border-sky-200 hover:border-sky-400',
    cardActiveBorder: 'border-sky-600 ring-2 ring-sky-400/70',
    cardActiveBg: 'bg-sky-50/70',
    miniBarBg: 'bg-sky-100/90 border-b border-sky-200',
    miniBarText: 'text-sky-950',
    previewMainText: 'text-sky-900',
    chipBg: 'bg-sky-50 text-sky-900 border-sky-200',
  },
  emerald: {
    headerBg: 'from-[#F3FAF0] to-[#E7F4E2] border-[#C3E0B8]',
    headerText: 'text-[#214A1C]',
    badgeBg: 'bg-[#448E3A] text-white',
    cardBorder: 'border-[#C3E0B8] hover:border-[#84C678]',
    cardActiveBorder: 'border-[#448E3A] ring-2 ring-[#84C678]/70',
    cardActiveBg: 'bg-[#F3FAF0]/80',
    miniBarBg: 'bg-[#E7F4E2] border-b border-[#C3E0B8]',
    miniBarText: 'text-[#214A1C]',
    previewMainText: 'text-[#265A20]',
    chipBg: 'bg-[#F3FAF0] text-[#214A1C] border-[#C3E0B8]',
  },
};

export const OverviewGridModal: React.FC<OverviewGridModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  accentTheme = 'rose',
  items,
  onSelectItem,
  uiLang = 'ko',
}) => {
  const overviewUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).overview;
  const effectiveSubtitle = subtitle || overviewUi.defaultSubtitle;
  const [selectedGroup, setSelectedGroup] = React.useState<string>('ALL');

  const groupLabels = React.useMemo(() => {
    const labels: string[] = [];
    items.forEach((it) => {
      if (it.groupLabel && !labels.includes(it.groupLabel)) {
        labels.push(it.groupLabel);
      }
    });
    return labels;
  }, [items]);

  useEffect(() => {
    if (!isOpen) return;
    setSelectedGroup('ALL');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const headerTheme = THEME_STYLES[accentTheme] || THEME_STYLES.rose;

  const filteredItems =
    selectedGroup === 'ALL'
      ? items
      : items.filter((it) => it.groupLabel === selectedGroup);

  const renderCard = (item: OverviewCardItem) => {
    const t = THEME_STYLES[item.themeColor || accentTheme] || headerTheme;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => {
          playCutePop();
          onSelectItem(item);
          onClose();
        }}
        className={`group text-left rounded-md border-2 transition-all duration-150 overflow-hidden flex flex-col cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] bg-white ${
          item.isActive ? `${t.cardActiveBorder} ${t.cardActiveBg}` : t.cardBorder
        }`}
      >
        {/* Miniature Worksheet Top Bar */}
        <div className={`px-2.5 py-1.5 flex items-center justify-between gap-1 ${t.miniBarBg}`}>
          <span className={`text-[10px] sm:text-[11px] font-black tabular-nums ${t.miniBarText}`}>
            {item.pageLabel}
          </span>
          {item.isActive && (
            <span className="text-[10px] font-black text-rose-700 whitespace-nowrap">
              {overviewUi.currentView}
            </span>
          )}
        </div>

        {/* Miniature Visual Preview Body (A4-like proportion) */}
        <div className="px-2.5 pt-2.5 pb-2 flex-1 flex flex-col items-center justify-center text-center min-h-[82px] sm:min-h-[92px] bg-white">
          <div className={`text-xl sm:text-2xl font-black leading-tight tracking-tight font-badasseugi line-clamp-1 ${t.previewMainText}`}>
            {item.previewMain}
          </div>
          {item.previewSecondary && (
            <div className="text-[11px] font-bold text-slate-600 mt-0.5 line-clamp-1">
              {item.previewSecondary}
            </div>
          )}
          {item.previewChips && item.previewChips.length > 0 && (
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-1 max-w-full">
              {item.previewChips.slice(0, 3).map((chip, cIdx) => (
                <span
                  key={cIdx}
                  className={`text-[9.5px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded border leading-none truncate max-w-[78px] ${t.chipBg}`}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Card Footer Title */}
        <div className="px-2.5 py-1.5 bg-slate-50/90 border-t border-slate-100 w-full">
          <div className="text-[11px] sm:text-xs font-black text-slate-900 truncate leading-tight">
            {item.title}
          </div>
          {item.subtitle && (
            <div className="text-[10px] font-medium text-slate-500 truncate mt-0.5">
              {item.subtitle}
            </div>
          )}
        </div>
      </button>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="no-print fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-slate-900/55 backdrop-blur-xs font-korean-gothic select-none"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[88vh] bg-white rounded-lg shadow-2xl border-2 border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className={`px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r ${headerTheme.headerBg} border-b flex items-center justify-between gap-3 shrink-0`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md ${headerTheme.badgeBg} flex items-center justify-center shadow-xs shrink-0`}>
                  <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h2 className={`text-sm sm:text-lg font-black ${headerTheme.headerText} truncate leading-tight`}>
                    {title}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-bold text-slate-600 truncate mt-0.5">
                    {effectiveSubtitle} · {overviewUi.totalPrefix}
                    {items.length}
                    {overviewUi.totalSuffix}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  onClose();
                }}
                className="w-9 h-9 rounded-md bg-white/90 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-2xs"
                title={overviewUi.closeTitle}
                aria-label={overviewUi.closeTitle}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chapter Filter Bar (when multiple groups exist) */}
            {groupLabels.length > 1 && (
              <div className="px-4 sm:px-6 py-2 bg-white border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setSelectedGroup('ALL');
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-black whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    selectedGroup === 'ALL'
                      ? `${headerTheme.badgeBg}`
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {overviewUi.all} ({items.length})
                </button>
                {groupLabels.map((lbl) => {
                  const count = items.filter((i) => i.groupLabel === lbl).length;
                  const active = selectedGroup === lbl;
                  return (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setSelectedGroup(lbl);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-black whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                        active
                          ? `${headerTheme.badgeBg}`
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {lbl} ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Thumbnail Grid Body */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-[#F4F5F7] space-y-5">
              {groupLabels.length > 1 && selectedGroup === 'ALL' ? (
                groupLabels.map((lbl) => {
                  const groupItems = items.filter((it) => it.groupLabel === lbl);
                  return (
                    <div key={lbl} className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                        <h3 className="text-xs sm:text-sm font-black text-slate-800">
                          {lbl}
                        </h3>
                        <span className="text-[11px] font-bold text-slate-500 tabular-nums">
                          {groupItems.length}
                          {overviewUi.unitsSuffix}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
                        {groupItems.map(renderCard)}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
                  {filteredItems.map(renderCard)}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
