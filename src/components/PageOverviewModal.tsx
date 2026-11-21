import React from 'react';
import { X, LayoutGrid, Check, ChevronDown } from 'lucide-react';
import { ActiveTab, SupportedLanguage } from '../types';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { BASIC_LETTERS_DATA } from '../data/basicLettersData';
import { BATCHIM_PAGES_DATA } from './PrintableBatchimSheet';
import { StudyMode } from './StudySection';
import { HANGEUL_GROUPS } from './HangeulStrokeFlashcardSection';
import {
  JAMO_SHEET_ITEMS,
  JAMO_SHEET_BADGES,
  JAMO_SECTION_OPTIONS,
  BASIC_SECTION_OPTIONS,
  BATCHIM_SECTION_OPTIONS,
  WORDS_SECTION_OPTIONS,
  VERB_UNIT_OPTIONS,
  VerbUnitOption,
} from '../data/worksheetMeta';
import { playCutePop } from '../utils/audio';

interface PageOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  currentLang: SupportedLanguage;
  hangeulStudyMode: StudyMode;
  classroomStudyMode: StudyMode;
  studySubTab: 'hangeul' | 'words' | 'verbs';
  activeSheetIndex: number;
  selectedChapter: number;
  selectedHangeulGroupId: string;
  selectedVerbUnit: VerbUnitOption['id'];
  selectedJamoSection: string;
  selectedBasicSection: string;
  selectedBatchimSection: string;
  selectedWordsSection: string;
  onSelectJamoSection: (id: string, targetSheet: number) => void;
  onSelectBasicSection: (id: string, targetSheet: number) => void;
  onSelectBatchimSection: (id: string, targetSheet: number) => void;
  onSelectWordsSection: (id: string, targetSheet: number) => void;
  onJumpToWorksheet: (idx: number) => void;
  onSelectChapter: (ch: number) => void;
  onSelectHangeulGroup: (id: string) => void;
  onSelectVerbUnit: (unit: VerbUnitOption['id']) => void;
}

interface ThumbnailItem {
  key: string;
  pageNumberLabel: string;
  badgeText: string;
  title: string;
  subtitle?: string;
  isActive: boolean;
  accent: 'amber' | 'rose' | 'purple' | 'teal';
  onSelect: () => void;
}

const MODAL_SELECT_CLASS =
  'row5-select w-full h-[42px] sm:h-[44px] py-2 pl-3 pr-9 rounded-xl bg-white border font-black text-[13px] sm:text-sm leading-[1.4] appearance-none cursor-pointer focus:outline-none focus:ring-2 font-korean-gothic shadow-2xs text-ellipsis';

export const PageOverviewModal: React.FC<PageOverviewModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  currentLang,
  hangeulStudyMode,
  classroomStudyMode,
  studySubTab,
  activeSheetIndex,
  selectedChapter,
  selectedHangeulGroupId,
  selectedVerbUnit,
  selectedJamoSection,
  selectedBasicSection,
  selectedBatchimSection,
  selectedWordsSection,
  onSelectJamoSection,
  onSelectBasicSection,
  onSelectBatchimSection,
  onSelectWordsSection,
  onJumpToWorksheet,
  onSelectChapter,
  onSelectHangeulGroup,
  onSelectVerbUnit,
}) => {
  if (!isOpen) return null;

  let modalTitle = '통합 목차 · 모아보기';
  let modalSubtitle = '단원을 선택하거나 카드를 누르면 바로 이동해요.';
  let items: ThumbnailItem[] = [];

  if (activeTab === 'hangeul') {
    if (hangeulStudyMode === 'jamo') {
      modalTitle = `한글 자음·모음 통합 목차 (1~${JAMO_SHEET_ITEMS.length}쪽)`;
      items = JAMO_SHEET_ITEMS.map((sheet, idx) => ({
        key: `jamo-${idx}`,
        pageNumberLabel: `${idx + 1}쪽`,
        badgeText: JAMO_SHEET_BADGES[idx] || `${idx + 1}`,
        title: sheet.title,
        subtitle: sheet.subtitle,
        isActive: activeSheetIndex === idx,
        accent: 'amber',
        onSelect: () => onJumpToWorksheet(idx),
      }));
    } else if (hangeulStudyMode === 'basic') {
      modalTitle = '한글 기본글자 통합 목차 (1~21쪽)';
      items = BASIC_LETTERS_DATA.map((page, idx) => ({
        key: `basic-${idx}`,
        pageNumberLabel: `${idx + 1}쪽`,
        badgeText: page.vowel,
        title: `${page.circledNumber} ${page.vowel}와 만나요`,
        subtitle: `${page.wordCard.word} · ${page.cards.slice(0, 4).map(c => c.syllable).join(' ')}`,
        isActive: activeSheetIndex === idx,
        accent: 'amber',
        onSelect: () => onJumpToWorksheet(idx),
      }));
    } else if (hangeulStudyMode === 'batchim') {
      modalTitle = `한글 받침글자 통합 목차 (1~${BATCHIM_PAGES_DATA.length}쪽)`;
      items = BATCHIM_PAGES_DATA.map((page, idx) => ({
        key: `batchim-${idx}`,
        pageNumberLabel: `${idx + 1}쪽`,
        badgeText: page.wordCard?.audioWord || page.wordCard?.wordLabel || page.cards?.[0]?.syllable || page.circledNumber || `${idx + 1}`,
        title: page.title.replace('✏️ ', ''),
        subtitle: page.subTitle,
        isActive: activeSheetIndex === idx,
        accent: 'amber' as const,
        onSelect: () => onJumpToWorksheet(idx),
      }));
    } else {
      modalTitle = `한글 용언 활용 통합 목차 (1~${VERB_UNIT_OPTIONS.length}쪽)`;
      items = VERB_UNIT_OPTIONS.map((unit, idx) => ({
        key: `words-sheet-${unit.id}`,
        pageNumberLabel: `${idx + 1}쪽`,
        badgeText: unit.badgeText,
        title: unit.shortTitle,
        subtitle: WORDS_SECTION_OPTIONS[idx]?.label || unit.verbsPreview,
        isActive: activeSheetIndex === idx,
        accent: 'purple' as const,
        onSelect: () => onJumpToWorksheet(idx),
      }));
    }
  } else if (activeTab === 'classroom') {
    const modeName =
      classroomStudyMode === 'cards'
        ? '그림카드'
        : classroomStudyMode === 'writing'
        ? '따라쓰기'
        : '받아쓰기';
    modalTitle = `교실 한국어 [${modeName}] 통합 목차 (1~${CHAPTER_LIST.length}쪽)`;
    items = CHAPTER_LIST.map((ch, idx) => ({
      key: `ch-sheet-${ch.ch}`,
      pageNumberLabel: `${idx + 1}쪽`,
      badgeText: ch.icon,
      title: getChapterCircledTitle(ch.ch, currentLang),
      subtitle: `${ch.itemCount}단어`,
      isActive: selectedChapter === ch.ch,
      accent: 'rose',
      onSelect: () => onJumpToWorksheet(ch.ch),
    }));
  } else if (activeTab === 'study') {
    if (studySubTab === 'hangeul') {
      modalTitle = '공부하기 [한글기초] 통합 목차';
      modalSubtitle = '단원을 선택하거나 카드를 누르면 바로 이동해요.';
      items = HANGEUL_GROUPS.map((g, idx) => ({
        key: `hg-${g.id}`,
        pageNumberLabel: `${idx + 1}단원`,
        badgeText: g.cards[0]?.char || g.badge,
        title: g.titleKo,
        subtitle: g.titleEn,
        isActive: selectedHangeulGroupId === g.id,
        accent: 'amber',
        onSelect: () => onSelectHangeulGroup(g.id),
      }));
    } else if (studySubTab === 'verbs') {
      modalTitle = '공부하기 [동사활용] 통합 목차 (30단원)';
      modalSubtitle = '단원을 선택하거나 카드를 누르면 바로 이동해요.';
      items = VERB_UNIT_OPTIONS.map((u, idx) => ({
        key: `verb-${u.id}`,
        pageNumberLabel: `${idx + 1}단원`,
        badgeText: u.badgeText,
        title: u.shortTitle,
        subtitle: u.verbsPreview,
        isActive: selectedVerbUnit === u.id,
        accent: 'purple',
        onSelect: () => onSelectVerbUnit(u.id),
      }));
    } else {
      modalTitle = `공부하기 [교실어휘] 통합 목차 (${CHAPTER_LIST.length}단원)`;
      modalSubtitle = '단원을 선택하거나 카드를 누르면 바로 이동해요.';
      items = CHAPTER_LIST.map((ch, idx) => ({
        key: `study-ch-${ch.ch}`,
        pageNumberLabel: `${idx + 1}단원`,
        badgeText: ch.icon,
        title: getChapterCircledTitle(ch.ch, currentLang),
        subtitle: `${ch.itemCount}단어`,
        isActive: selectedChapter === ch.ch,
        accent: 'rose',
        onSelect: () => onSelectChapter(ch.ch),
      }));
    }
  } else {
    modalTitle = `게임 통합 목차 (1~${CHAPTER_LIST.length}단원)`;
    modalSubtitle = '단원을 선택하거나 카드를 누르면 해당 단원 게임이 시작돼요.';
    items = CHAPTER_LIST.map((ch, idx) => ({
      key: `game-ch-${ch.ch}`,
      pageNumberLabel: `${idx + 1}단원`,
      badgeText: ch.icon,
      title: getChapterCircledTitle(ch.ch, currentLang),
      subtitle: `${ch.itemCount}단어`,
      isActive: selectedChapter === ch.ch,
      accent: 'rose',
      onSelect: () => onSelectChapter(ch.ch),
    }));
  }

  const getAccentClasses = (accent: ThumbnailItem['accent'], isActive: boolean) => {
    if (accent === 'amber') {
      return isActive
        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-300'
        : 'border-amber-200 bg-white hover:border-amber-400 hover:bg-amber-50/60';
    }
    if (accent === 'purple') {
      return isActive
        ? 'border-purple-600 bg-purple-50 ring-2 ring-purple-300'
        : 'border-purple-200 bg-white hover:border-purple-400 hover:bg-purple-50/60';
    }
    if (accent === 'teal') {
      return isActive
        ? 'border-teal-600 bg-teal-50 ring-2 ring-teal-300'
        : 'border-teal-200 bg-white hover:border-teal-400 hover:bg-teal-50/60';
    }
    return isActive
      ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-300'
      : 'border-pink-200 bg-white hover:border-rose-400 hover:bg-pink-50/60';
  };

  const getBadgeBgClass = (accent: ThumbnailItem['accent']) => {
    if (accent === 'amber') return 'bg-amber-500 text-white';
    if (accent === 'purple') return 'bg-purple-700 text-white';
    if (accent === 'teal') return 'bg-teal-600 text-white';
    return 'bg-[#D94A6B] text-white';
  };

  const renderTopUnitDropdown = () => {
    if (activeTab === 'hangeul') {
      if (hangeulStudyMode === 'jamo') {
        return (
          <div className="relative">
            <select
              value={selectedJamoSection}
              onChange={(e) => {
                playCutePop();
                const val = e.target.value;
                const opt = JAMO_SECTION_OPTIONS.find(o => o.id === val);
                onClose();
                onSelectJamoSection(val, opt ? opt.targetSheet : 0);
              }}
              className={`${MODAL_SELECT_CLASS} border-amber-300 text-amber-950 focus:ring-amber-400`}
              title="단원 빠른 선택"
            >
              {JAMO_SECTION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        );
      }
      if (hangeulStudyMode === 'basic') {
        return (
          <div className="relative">
            <select
              value={selectedBasicSection}
              onChange={(e) => {
                playCutePop();
                const val = e.target.value;
                const opt = BASIC_SECTION_OPTIONS.find(o => o.id === val);
                onClose();
                onSelectBasicSection(val, opt ? opt.targetSheet : 0);
              }}
              className={`${MODAL_SELECT_CLASS} border-amber-300 text-amber-950 focus:ring-amber-400`}
              title="단원 빠른 선택"
            >
              {BASIC_SECTION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        );
      }
      if (hangeulStudyMode === 'batchim') {
        return (
          <div className="relative">
            <select
              value={selectedBatchimSection}
              onChange={(e) => {
                playCutePop();
                const val = e.target.value;
                const opt = BATCHIM_SECTION_OPTIONS.find(o => o.id === val);
                onClose();
                onSelectBatchimSection(val, opt ? opt.targetSheet : 0);
              }}
              className={`${MODAL_SELECT_CLASS} border-amber-300 text-amber-950 focus:ring-amber-400`}
              title="단원 빠른 선택"
            >
              {BATCHIM_SECTION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        );
      }
      return (
        <div className="relative">
          <select
            value={selectedWordsSection}
            onChange={(e) => {
              playCutePop();
              const val = e.target.value;
              const opt = WORDS_SECTION_OPTIONS.find(o => o.id === val);
              onClose();
              onSelectWordsSection(val, opt ? opt.targetSheet : 0);
            }}
            className={`${MODAL_SELECT_CLASS} border-purple-300 text-purple-950 focus:ring-purple-400`}
            title="단원 빠른 선택"
          >
            {WORDS_SECTION_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-purple-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      );
    }

    if (activeTab === 'classroom') {
      return (
        <div className="relative">
          <select
            value={selectedChapter}
            onChange={(e) => {
              playCutePop();
              onClose();
              onJumpToWorksheet(Number(e.target.value));
            }}
            className={`${MODAL_SELECT_CLASS} border-rose-300 text-rose-950 focus:ring-rose-400`}
            title="단원 빠른 선택"
          >
            {CHAPTER_LIST.map((ch) => (
              <option key={ch.ch} value={ch.ch}>
                {getChapterCircledTitle(ch.ch, currentLang)}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      );
    }

    if (activeTab === 'study') {
      if (studySubTab === 'hangeul') {
        return (
          <div className="relative">
            <select
              value={selectedHangeulGroupId}
              onChange={(e) => {
                playCutePop();
                onClose();
                onSelectHangeulGroup(e.target.value);
              }}
              className={`${MODAL_SELECT_CLASS} border-amber-300 text-amber-950 focus:ring-amber-400`}
              title="한글 기초 단원 선택"
            >
              {HANGEUL_GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.titleKo} ({g.titleEn})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        );
      }
      if (studySubTab === 'verbs') {
        return (
          <div className="relative">
            <select
              value={selectedVerbUnit}
              onChange={(e) => {
                playCutePop();
                onClose();
                onSelectVerbUnit(e.target.value as VerbUnitOption['id']);
              }}
              className={`${MODAL_SELECT_CLASS} border-purple-300 text-purple-950 focus:ring-purple-400`}
              title="동사활용 단원 선택"
            >
              {VERB_UNIT_OPTIONS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-purple-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        );
      }
    }

    return (
      <div className="relative">
        <select
          value={selectedChapter}
          onChange={(e) => {
            playCutePop();
            onClose();
            onSelectChapter(Number(e.target.value));
          }}
          className={`${MODAL_SELECT_CLASS} border-rose-300 text-rose-950 focus:ring-rose-400`}
          title="단원 빠른 선택"
        >
          {CHAPTER_LIST.map((ch) => (
            <option key={ch.ch} value={ch.ch}>
              {getChapterCircledTitle(ch.ch, currentLang)}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-rose-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    );
  };

  return (
    <div
      className="no-print overview-modal-overlay fixed inset-0 z-[130] flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/65 backdrop-blur-xs font-korean-gothic"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={modalTitle}
    >
      <div
        className="w-full max-w-4xl max-h-[86vh] bg-[#FFF8FA] rounded-2xl sm:rounded-3xl border-2 border-pink-300 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#D94A6B] to-rose-500 text-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-black leading-tight truncate">
                {modalTitle}
              </h2>
              <p className="text-[11px] sm:text-xs text-pink-100 font-bold leading-snug truncate">
                {modalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playCutePop();
              onClose();
            }}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer active:scale-95 transition-all shrink-0"
            aria-label="모아보기 닫기"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 통합 목차: 최상단 단원/쪽 빠른 선택 드롭다운 */}
        <div className="px-3 py-2.5 sm:px-4 bg-white border-b border-pink-200 shrink-0">
          <label className="block text-[11px] font-black text-rose-900 mb-1">
            단원 바로 이동 (드롭다운)
          </label>
          {renderTopUnitDropdown()}
        </div>

        {/* Thumbnail Grid */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {items.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  playCutePop();
                  onClose();
                  item.onSelect();
                }}
                className={`group rounded-2xl border-2 p-2.5 text-left flex flex-col justify-between transition-all cursor-pointer active:scale-[0.97] shadow-2xs min-h-[118px] ${getAccentClasses(
                  item.accent,
                  item.isActive
                )}`}
              >
                {/* Top row: Page badge + Active checkmark */}
                <div className="flex items-center justify-between gap-1.5 w-full mb-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-black leading-tight ${getBadgeBgClass(
                      item.accent
                    )}`}
                  >
                    {item.pageNumberLabel}
                  </span>
                  {item.isActive && (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>

                {/* Mini worksheet thumbnail visual preview */}
                <div className="w-full flex-1 rounded-xl bg-slate-50/90 border border-slate-200/80 px-2 py-2 flex flex-col items-center justify-center text-center mb-1.5">
                  <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none font-badasseugi">
                    {item.badgeText}
                  </span>
                  {/* Mini grid lines representing worksheet rows */}
                  <div className="w-full mt-1.5 space-y-1 opacity-55">
                    <div className="h-1 w-full rounded bg-slate-300" />
                    <div className="h-1 w-4/5 mx-auto rounded bg-slate-200" />
                  </div>
                </div>

                {/* Title & optional subtitle */}
                <div className="w-full">
                  <div className="text-xs font-black text-slate-900 leading-snug line-clamp-2">
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="text-[10px] text-slate-500 font-bold leading-tight truncate mt-0.5">
                      {item.subtitle}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
