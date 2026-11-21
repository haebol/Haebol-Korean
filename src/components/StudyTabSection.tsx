import React, { useState, useMemo, useRef, useEffect } from 'react';
import { LayoutGrid } from 'lucide-react';
import { VocabularyItem, SupportedLanguage, LearningTrack, LearningMethod, SUB_MENU_LABELS } from '../types';
import { UiLanguage, SUBTAB_UI, NAV_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { FlashcardSection } from './FlashcardSection';
import { VerbConjugationSection, VERB_UNIT_META, VerbUnitType } from './VerbConjugationSection';
import {
  ParticleFlashcardSection,
  PARTICLE_FLASHCARD_UNIT_META,
  ParticleFlashcardUnitId,
} from './ParticleFlashcardSection';
import { HangeulStrokeFlashcardSection, HANGEUL_GROUPS } from './HangeulStrokeFlashcardSection';
import { OverviewGridModal, OverviewCardItem, OverviewThemeColor } from './OverviewGridModal';
import { CompactUnitSelectButton } from './CompactUnitSelectButton';
import { DesktopControlBar } from './DesktopControlBar';
import { playCutePop } from '../utils/audio';

interface StudyTabSectionProps {
  activeTrack: LearningTrack;
  vocabulary: VocabularyItem[];
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  savedWords: string[];
  onToggleSave: (ko: string) => void;
  selectedChapter?: number;
  onSelectChapter?: (ch: number) => void;
  selectedHangeulGroupId?: string;
  onSelectHangeulGroupId?: (groupId: string) => void;
  selectedVerbUnit?: VerbUnitType;
  onSelectVerbUnit?: (unit: VerbUnitType) => void;
  selectedParticleUnit?: ParticleFlashcardUnitId;
  onSelectParticleUnit?: (unit: ParticleFlashcardUnitId) => void;
  onLanguageChange?: (lang: UiLanguage) => void;
  activeMethod?: LearningMethod;
  onSelectMethod?: (method: LearningMethod) => void;
  isMenuCollapsed?: boolean;
}

export const StudyTabSection: React.FC<StudyTabSectionProps> = ({
  activeTrack,
  vocabulary,
  lang,
  uiLang = 'ko',
  savedWords,
  onToggleSave,
  selectedChapter = 1,
  onSelectChapter,
  selectedHangeulGroupId: controlledHangeulGroupId,
  onSelectHangeulGroupId,
  selectedVerbUnit: controlledVerbUnit,
  onSelectVerbUnit,
  selectedParticleUnit: controlledParticleUnit,
  onSelectParticleUnit,
  onLanguageChange,
  activeMethod = 'flashcard',
  onSelectMethod,
  isMenuCollapsed = false,
}) => {
  const [localHangeulGroupId, setLocalHangeulGroupId] = useState<string>(
    HANGEUL_GROUPS[0]?.id || 'basic_consonants'
  );
  const [localVerbUnit, setLocalVerbUnit] = useState<VerbUnitType>('unit1');
  const [localParticleUnit, setLocalParticleUnit] = useState<ParticleFlashcardUnitId>('unit1');
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);

  const selectedHangeulGroupId = controlledHangeulGroupId ?? localHangeulGroupId;
  const setSelectedHangeulGroupId = (id: string) => {
    setLocalHangeulGroupId(id);
    onSelectHangeulGroupId?.(id);
  };

  const selectedVerbUnit = controlledVerbUnit ?? localVerbUnit;
  const setSelectedVerbUnit = (unit: VerbUnitType) => {
    setLocalVerbUnit(unit);
    onSelectVerbUnit?.(unit);
  };

  const selectedParticleUnit = controlledParticleUnit ?? localParticleUnit;
  const setSelectedParticleUnit = (unit: ParticleFlashcardUnitId) => {
    setLocalParticleUnit(unit);
    onSelectParticleUnit?.(unit);
  };

  const [particleSubMode, setParticleSubMode] = useState<'combination' | 'sentence'>('combination');

  const particleCombinationUnits = PARTICLE_FLASHCARD_UNIT_META;
  const particleSentenceUnits = useMemo(
    () => PARTICLE_FLASHCARD_UNIT_META.filter((u) => u.layoutType === 'rows5'),
    []
  );
  const currentParticleMeta = useMemo(
    () => PARTICLE_FLASHCARD_UNIT_META.find((u) => u.id === selectedParticleUnit),
    [selectedParticleUnit]
  );
  const isParticleSentenceMode = particleSubMode === 'sentence';

  const lastSentenceUnitRef = useRef<ParticleFlashcardUnitId>('unit3');

  useEffect(() => {
    if (currentParticleMeta?.layoutType === 'rows5') {
      lastSentenceUnitRef.current = selectedParticleUnit;
    } else if (particleSubMode === 'sentence') {
      setParticleSubMode('combination');
    }
  }, [particleSubMode, currentParticleMeta, selectedParticleUnit]);

  const subLabels = SUB_MENU_LABELS[lang] || SUB_MENU_LABELS.en;
  const tabUi = SUBTAB_UI[uiLang] || SUBTAB_UI.ko;
  const navUi = NAV_UI[uiLang] || NAV_UI.ko;
  const menuExtras = MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko;
  const isKoUi = uiLang === 'ko';

  const overviewConfig = useMemo<{
    title: string;
    subtitle: string;
    accentTheme: OverviewThemeColor;
    items: OverviewCardItem[];
  }>(() => {
    if (activeTrack === 'hangeul') {
      return {
        title: menuExtras.overview.flashcardTitles.hangeul,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: HANGEUL_GROUPS.map((group, idx) => ({
          id: group.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${HANGEUL_GROUPS.length}`,
          title: group.titleKo,
          subtitle: `${group.cards.length}장 · ${group.badge}`,
          previewMain: group.cards.slice(0, 3).map(c => c.char).join(' '),
          previewSecondary: group.cards[0]?.sampleWord,
          previewChips: group.cards.slice(0, 3).map(c => c.char),
          themeColor: 'amber',
          isActive: selectedHangeulGroupId === group.id,
        })),
      };
    }

    if (activeTrack === 'classroom') {
      return {
        title: menuExtras.overview.flashcardTitles.classroom,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'rose',
        items: CHAPTER_LIST.map((chObj, idx) => {
          const chWords = vocabulary.filter(v => v.ch === chObj.ch);
          return {
            id: chObj.ch,
            targetIdx: chObj.ch,
            pageLabel: `${idx + 1} / ${CHAPTER_LIST.length}`,
            title: getChapterCircledTitle(chObj.ch, lang),
            subtitle: `${chWords.length}단어`,
            previewMain: chWords[0]?.ko || chObj.icon,
            previewSecondary: chWords[1]?.ko,
            previewChips: chWords.slice(0, 3).map(w => w.ko),
            themeColor: 'rose',
            isActive: selectedChapter === chObj.ch,
          };
        }),
      };
    }

    if (activeTrack === 'particle') {
      const targetUnits = isParticleSentenceMode ? particleSentenceUnits : particleCombinationUnits;
      return {
        title: isParticleSentenceMode
          ? menuExtras.overview.flashcardTitles.particleSentence
          : menuExtras.overview.flashcardTitles.particle,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'emerald',
        items: targetUnits.map((u, idx) => ({
          id: u.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${targetUnits.length}`,
          title: `${u.circled} ${u.title}`,
          subtitle: u.keywords.join(', '),
          previewMain: u.keywords[0] || u.grammar,
          previewSecondary: u.grammar,
          previewChips: u.keywords.slice(0, 3),
          themeColor: 'emerald',
          isActive: selectedParticleUnit === u.id,
        })),
      };
    }

    return {
      title: menuExtras.overview.flashcardTitles.verb,
      subtitle: menuExtras.overview.defaultSubtitle,
      accentTheme: 'purple',
      items: VERB_UNIT_META.map((u, idx) => ({
        id: u.id,
        targetIdx: idx,
        pageLabel: `${idx + 1} / ${VERB_UNIT_META.length}`,
        title: `${u.circled} ${u.grammar}`,
        subtitle: u.verbs.join(', '),
        previewMain: u.verbs[0] || u.grammar,
        previewSecondary: u.grammar,
        previewChips: u.verbs.slice(0, 3),
        themeColor: 'purple',
        isActive: selectedVerbUnit === u.id,
      })),
    };
  }, [activeTrack, selectedHangeulGroupId, selectedChapter, selectedVerbUnit, selectedParticleUnit, isParticleSentenceMode, particleSentenceUnits, particleCombinationUnits, vocabulary, lang, menuExtras]);

  const handleSelectOverviewItem = (item: OverviewCardItem) => {
    if (activeTrack === 'hangeul') {
      setSelectedHangeulGroupId(String(item.id));
    } else if (activeTrack === 'classroom') {
      onSelectChapter?.(Number(item.id));
    } else if (activeTrack === 'particle') {
      setSelectedParticleUnit(item.id as ParticleFlashcardUnitId);
    } else {
      setSelectedVerbUnit(item.id as VerbUnitType);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const desktopRightControls = (
    <>
      {activeTrack === 'particle' && (
        <div className="flex items-center gap-3 mr-1">
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setParticleSubMode('combination');
            }}
            className={`relative py-1 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] transition-colors ${
              !isParticleSentenceMode
                ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2px] after:bg-emerald-600"
                : 'text-slate-500 hover:text-emerald-950 font-bold'
            }`}
          >
            <span>{tabUi.flashcardTabs.particle}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setParticleSubMode('sentence');
              if (currentParticleMeta?.layoutType !== 'rows5') {
                setSelectedParticleUnit(lastSentenceUnitRef.current);
              }
            }}
            className={`relative py-1 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] transition-colors ${
              isParticleSentenceMode
                ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2px] after:bg-emerald-600"
                : 'text-slate-500 hover:text-emerald-950 font-bold'
            }`}
          >
            <span>{menuExtras.particleSentenceTab}</span>
          </button>
        </div>
      )}

      {activeTrack === 'hangeul' && (
        <span className="text-xs font-bold text-amber-800 whitespace-nowrap mr-1">
          {tabUi.flashcardTabs.hangeulBasic}
        </span>
      )}
      {activeTrack === 'classroom' && (
        <span className="text-xs font-bold text-rose-800 whitespace-nowrap mr-1">
          {tabUi.flashcardTabs.classroomVocab}
        </span>
      )}
      {activeTrack === 'verb' && (
        <span className="text-xs font-bold text-purple-800 whitespace-nowrap mr-1">
          {tabUi.flashcardTabs.verb}
        </span>
      )}

      {activeTrack === 'hangeul' && (
        <CompactUnitSelectButton
          value={selectedHangeulGroupId}
          onChange={(val) => setSelectedHangeulGroupId(String(val))}
          options={HANGEUL_GROUPS.map((g) => ({
            value: g.id,
            label: `${g.titleKo} (${g.cards.length}자)`,
          }))}
          theme="amber"
          title={tabUi.studyControls.unitSelectTitle}
          ariaLabel={tabUi.studyControls.unitSelectTitle}
          align="right"
          className="w-[220px] xl:w-[260px]"
        />
      )}

      {activeTrack === 'classroom' && (
        <CompactUnitSelectButton
          value={selectedChapter}
          onChange={(val) => onSelectChapter?.(Number(val))}
          options={CHAPTER_LIST.map((ch) => ({
            value: ch.ch,
            label: getChapterCircledTitle(ch.ch, lang),
          }))}
          theme="rose"
          title={tabUi.studyControls.unitSelectTitle}
          ariaLabel={tabUi.studyControls.unitSelectTitle}
          align="right"
          className="w-[220px] xl:w-[260px]"
        />
      )}

      {activeTrack === 'verb' && (
        <CompactUnitSelectButton
          value={selectedVerbUnit}
          onChange={(val) => setSelectedVerbUnit(val as VerbUnitType)}
          options={VERB_UNIT_META.map((u) => ({
            value: u.id,
            label: u.label,
          }))}
          theme="purple"
          title="용언 활용 단원 선택"
          ariaLabel="용언 활용 단원 선택"
          align="right"
          className="w-[230px] xl:w-[270px]"
        />
      )}

      {activeTrack === 'particle' && (
        <CompactUnitSelectButton
          value={selectedParticleUnit}
          onChange={(val) => setSelectedParticleUnit(val as ParticleFlashcardUnitId)}
          options={(isParticleSentenceMode ? particleSentenceUnits : particleCombinationUnits).map((u) => ({
            value: u.id,
            label: `${u.circled} ${u.title}`,
          }))}
          theme="emerald"
          title={isParticleSentenceMode ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
          ariaLabel={isParticleSentenceMode ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
          align="right"
          className="w-[230px] xl:w-[270px]"
        />
      )}

      <button
        type="button"
        onClick={() => {
          playCutePop();
          setIsOverviewOpen(true);
        }}
        className={`h-8 w-8 rounded-sm border cursor-pointer shrink-0 flex items-center justify-center transition-colors ${
          activeTrack === 'hangeul'
            ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
            : activeTrack === 'classroom'
            ? 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-300'
            : activeTrack === 'particle'
            ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-emerald-300'
            : 'bg-purple-100 hover:bg-purple-200 text-purple-950 border-purple-300'
        }`}
        title={navUi.overviewBtn}
        aria-label={navUi.overviewBtn}
      >
        <LayoutGrid className="w-4 h-4 shrink-0" />
      </button>
    </>
  );

  return (
    <div className="w-full flex flex-col gap-0 font-korean-gothic">
      {/* Desktop Layer 2 Learning Control Bar */}
      {!isMenuCollapsed && onSelectMethod && (
        <DesktopControlBar
          activeTrack={activeTrack}
          activeMethod={activeMethod}
          onSelectMethod={onSelectMethod}
          uiLang={uiLang}
          rightControls={desktopRightControls}
        />
      )}

      {/* Mobile Only Row 5: 용언 / 조사 플래시카드 전용 */}
      {!isMenuCollapsed && (activeTrack === 'verb' || activeTrack === 'particle') && (
        <div
          className={`lg:hidden sticky top-[80px] sm:top-[90px] z-[28] bg-[#FFF5F8]/95 backdrop-blur-md pb-1 mb-1.5 border-b no-print w-full max-w-3xl mx-auto px-2.5 sm:px-4 select-none ${
            activeTrack === 'particle' ? 'border-emerald-200/80' : 'border-purple-200/80'
          }`}
        >
          <div className="flex items-center justify-between gap-2 h-[38px] sm:h-[42px]">
            {/* Left: Single active label or Particle dual tabs */}
            <div className="flex items-center gap-3.5 sm:gap-6 min-w-0 overflow-x-auto no-scrollbar">
              {activeTrack === 'verb' ? (
                <button
                  type="button"
                  onClick={() => playCutePop()}
                  className="relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] text-purple-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#7E22CE]"
                  title={`${tabUi.flashcardTabs.verb} (${isKoUi ? subLabels.verbConjugation : '용언 활용'})`}
                >
                  <span>{tabUi.flashcardTabs.verb}</span>
                  <span className="hidden md:inline text-[11px] font-bold text-purple-700/80">
                    [{isKoUi ? subLabels.verbConjugation : '용언 활용'}]
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-3 sm:gap-5">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setParticleSubMode('combination');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      !isParticleSentenceMode
                        ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-bold'
                    }`}
                    title={`${tabUi.flashcardTabs.particle} (${isKoUi ? subLabels.particle : '조사 결합'})`}
                  >
                    <span>{tabUi.flashcardTabs.particle}</span>
                    <span className="hidden md:inline text-[11px] font-bold text-emerald-700/85">
                      [{isKoUi ? subLabels.particle : '조사 결합'}]
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setParticleSubMode('sentence');
                      if (currentParticleMeta?.layoutType !== 'rows5') {
                        setSelectedParticleUnit(lastSentenceUnitRef.current);
                      }
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      isParticleSentenceMode
                        ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-bold'
                    }`}
                    title={menuExtras.particleSentenceTab}
                  >
                    <span>{menuExtras.particleSentenceTab}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: Single-line Unit Dropdown + 1x1 Overview Grid */}
            <div className="flex items-center gap-1 shrink-0 min-w-0">
              {activeTrack === 'particle' ? (
                <CompactUnitSelectButton
                  value={selectedParticleUnit}
                  onChange={(val) => setSelectedParticleUnit(val as ParticleFlashcardUnitId)}
                  options={(isParticleSentenceMode ? particleSentenceUnits : particleCombinationUnits).map((u) => ({
                    value: u.id,
                    label: `${u.circled} ${u.title}`,
                  }))}
                  theme="emerald"
                  title={isParticleSentenceMode ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
                  ariaLabel={isParticleSentenceMode ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
                  align="right"
                  className="w-[155px] xs:w-[195px] sm:w-[270px]"
                />
              ) : (
                <CompactUnitSelectButton
                  value={selectedVerbUnit}
                  onChange={(val) => setSelectedVerbUnit(val as VerbUnitType)}
                  options={VERB_UNIT_META.map((u) => ({
                    value: u.id,
                    label: u.label,
                  }))}
                  theme="purple"
                  title="용언 활용 단원 선택"
                  ariaLabel="용언 활용 단원 선택"
                  align="right"
                  className="w-[155px] xs:w-[195px] sm:w-[270px]"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setIsOverviewOpen(true);
                }}
                className={`h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none border cursor-pointer shrink-0 flex items-center justify-center transition-colors ${
                  activeTrack === 'particle'
                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-emerald-300'
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-950 border-purple-300'
                }`}
                title={navUi.overviewBtn}
                aria-label={navUi.overviewBtn}
              >
                <LayoutGrid className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Track별 플래시카드 본문 */}
      <div className="w-full max-w-[1600px] mx-auto px-1 sm:px-4">
        {activeTrack === 'hangeul' && (
          <HangeulStrokeFlashcardSection
            lang={lang}
            uiLang={uiLang}
            savedWords={savedWords}
            onToggleSave={onToggleSave}
            selectedGroupId={selectedHangeulGroupId}
            onSelectGroupId={setSelectedHangeulGroupId}
            onOpenOverview={() => setIsOverviewOpen(true)}
            hideDesktopUnitBar={true}
            isMenuCollapsed={isMenuCollapsed}
          />
        )}

        {activeTrack === 'classroom' && (
          <FlashcardSection
            vocabulary={vocabulary}
            lang={lang}
            uiLang={uiLang}
            savedWords={savedWords}
            onToggleSave={onToggleSave}
            selectedChapter={selectedChapter}
            onSelectChapter={onSelectChapter}
            onLanguageChange={onLanguageChange}
            onOpenOverview={() => setIsOverviewOpen(true)}
            hideDesktopUnitBar={true}
            isMenuCollapsed={isMenuCollapsed}
          />
        )}

      {activeTrack === 'verb' && (
        <VerbConjugationSection
          lang={lang}
          uiLang={uiLang}
          selectedUnit={selectedVerbUnit}
          onSelectUnit={setSelectedVerbUnit}
          onOpenOverview={() => setIsOverviewOpen(true)}
          hideStickyUnitBar={true}
        />
      )}

        {activeTrack === 'particle' && (
          <ParticleFlashcardSection
            lang={lang}
            uiLang={uiLang}
            selectedUnit={selectedParticleUnit}
            onSelectUnit={setSelectedParticleUnit}
            filterMode={particleSubMode}
          />
        )}
      </div>

      {/* Overview Grid Modal */}
      <OverviewGridModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        title={overviewConfig.title}
        subtitle={overviewConfig.subtitle}
        accentTheme={overviewConfig.accentTheme}
        items={overviewConfig.items}
        onSelectItem={handleSelectOverviewItem}
        uiLang={uiLang}
      />
    </div>
  );
};
