import React, { useState, useMemo, useRef, useEffect, lazy, Suspense } from 'react';
import { VocabularyItem, SupportedLanguage, LearningTrack, LearningMethod, SUB_MENU_LABELS } from '../types';
import { UiLanguage, SUBTAB_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { CHAPTER_META_LIST, getChapterCircledTitle } from '../data/chapterMeta';
import { VerbConjugationSection } from './VerbConjugationSection';
import { VERB_UNIT_META, VerbUnitType } from '../data/verbUnitMeta';
import {
  PARTICLE_UNIT_META as PARTICLE_FLASHCARD_UNIT_META,
  ParticleUnitId as ParticleFlashcardUnitId,
} from '../data/particleUnitMeta';
import { HANGEUL_GROUP_META, DEFAULT_HANGEUL_GROUP_ID } from '../data/hangeulGroupMeta';
import { OverviewGridModal, OverviewCardItem, OverviewThemeColor } from './OverviewGridModal';
import { CompactUnitSelectButton } from './CompactUnitSelectButton';
import { DesktopControlBar } from './DesktopControlBar';
import { DesktopTocSidebar } from './DesktopTocSidebar';
import { playCutePop } from '../utils/audio';
import { Lock } from 'lucide-react';
import {
  useAdminCurriculumConfig,
  getOrderedHangeulMeta,
  getOrderedChapterMeta,
  getOrderedVerbMeta,
  getOrderedParticleMeta,
  isUnitLocked,
} from '../utils/adminCurriculumConfig';

const FlashcardSection = lazy(() =>
  import('./FlashcardSection').then((m) => ({ default: m.FlashcardSection }))
);
const ParticleFlashcardSection = lazy(() =>
  import('./ParticleFlashcardSection').then((m) => ({ default: m.ParticleFlashcardSection }))
);
const HangeulStrokeFlashcardSection = lazy(() =>
  import('./HangeulStrokeFlashcardSection').then((m) => ({
    default: m.HangeulStrokeFlashcardSection,
  }))
);

const FlashcardTrackFallback = () => (
  <div className="w-full py-16 flex flex-col items-center justify-center gap-2.5 text-purple-700/70">
    <div className="w-7 h-7 rounded-full border-2 border-purple-200 border-t-purple-600 animate-spin" />
    <span className="text-xs font-bold font-korean-gothic">불러오는 중...</span>
  </div>
);

interface StudyTabSectionProps {
  activeTrack: LearningTrack;
  vocabulary?: VocabularyItem[];
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
  isTocOpen?: boolean;
  onToggleToc?: () => void;
  onToggleContinuous?: () => void;
  onJumpCoverToc?: () => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
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
  isTocOpen = false,
  onToggleToc,
  onToggleContinuous,
  onJumpCoverToc,
  isFocusMode = false,
  onToggleFocusMode,
}) => {
  const [localHangeulGroupId, setLocalHangeulGroupId] = useState<string>(
    DEFAULT_HANGEUL_GROUP_ID
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

  const [adminConfig] = useAdminCurriculumConfig();
  const orderedHangeulMeta = useMemo(() => getOrderedHangeulMeta(adminConfig), [adminConfig]);
  const orderedChapterMeta = useMemo(() => getOrderedChapterMeta(adminConfig), [adminConfig]);
  const orderedVerbMeta = useMemo(() => getOrderedVerbMeta(adminConfig), [adminConfig]);
  const orderedParticleMeta = useMemo(() => getOrderedParticleMeta(adminConfig), [adminConfig]);

  const [particleSubMode, setParticleSubMode] = useState<'combination' | 'sentence'>('combination');

  const particleCombinationUnits = orderedParticleMeta;
  const particleSentenceUnits = useMemo(
    () => orderedParticleMeta.filter((u) => u.layoutType === 'rows5'),
    [orderedParticleMeta]
  );

  // If the active unit is marked 준비중, automatically select the first published unit in this track
  useEffect(() => {
    if (activeTrack === 'hangeul' && isUnitLocked(adminConfig, 'hangeul', selectedHangeulGroupId)) {
      const firstOpen = orderedHangeulMeta.find((g) => !isUnitLocked(adminConfig, 'hangeul', g.id));
      if (firstOpen) setSelectedHangeulGroupId(firstOpen.id);
    } else if (activeTrack === 'classroom' && isUnitLocked(adminConfig, 'classroom', selectedChapter)) {
      const firstOpen = orderedChapterMeta.find((c) => !isUnitLocked(adminConfig, 'classroom', c.ch));
      if (firstOpen) onSelectChapter?.(firstOpen.ch);
    } else if (activeTrack === 'verb' && isUnitLocked(adminConfig, 'verb', selectedVerbUnit)) {
      const firstOpen = orderedVerbMeta.find((v) => !isUnitLocked(adminConfig, 'verb', v.id));
      if (firstOpen) setSelectedVerbUnit(firstOpen.id);
    } else if (activeTrack === 'particle' && isUnitLocked(adminConfig, 'particle', selectedParticleUnit)) {
      const firstOpen = orderedParticleMeta.find((p) => !isUnitLocked(adminConfig, 'particle', p.id));
      if (firstOpen) setSelectedParticleUnit(firstOpen.id);
    }
  }, [
    adminConfig,
    activeTrack,
    selectedHangeulGroupId,
    selectedChapter,
    selectedVerbUnit,
    selectedParticleUnit,
    orderedHangeulMeta,
    orderedChapterMeta,
    orderedVerbMeta,
    orderedParticleMeta,
  ]);

  const isActiveUnitLocked =
    (activeTrack === 'hangeul' && isUnitLocked(adminConfig, 'hangeul', selectedHangeulGroupId)) ||
    (activeTrack === 'classroom' && isUnitLocked(adminConfig, 'classroom', selectedChapter)) ||
    (activeTrack === 'verb' && isUnitLocked(adminConfig, 'verb', selectedVerbUnit)) ||
    (activeTrack === 'particle' && isUnitLocked(adminConfig, 'particle', selectedParticleUnit));
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
        items: HANGEUL_GROUP_META.map((group, idx) => ({
          id: group.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${HANGEUL_GROUP_META.length}`,
          title: group.titleKo,
          subtitle: `${group.cardCount}장 · ${group.badge}`,
          previewMain: group.previewChars.join(' '),
          previewSecondary: group.previewSampleWord,
          previewChips: group.previewChars,
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
        items: CHAPTER_META_LIST.map((chObj, idx) => ({
          id: chObj.ch,
          targetIdx: chObj.ch,
          pageLabel: `${idx + 1} / ${CHAPTER_META_LIST.length}`,
          title: getChapterCircledTitle(chObj.ch, lang),
          subtitle: `${chObj.itemCount}단어`,
          previewMain: chObj.previewWords[0] || chObj.icon,
          previewSecondary: chObj.previewWords[1],
          previewChips: chObj.previewWords,
          themeColor: 'rose',
          isActive: selectedChapter === chObj.ch,
        })),
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

  const desktopCenterUnitControl = (
    <>
      {activeTrack === 'hangeul' && (
        <CompactUnitSelectButton
          value={selectedHangeulGroupId}
          onChange={(val) => setSelectedHangeulGroupId(String(val))}
          options={orderedHangeulMeta.map((g) => ({
            value: g.id,
            label: `${g.titleKo} (${g.cardCount}자)`,
            disabled: isUnitLocked(adminConfig, 'hangeul', g.id),
            lockedLabel: '준비중',
          }))}
          theme="purple"
          variant="twin"
          title={tabUi.studyControls.unitSelectTitle}
          ariaLabel={tabUi.studyControls.unitSelectTitle}
          align="left"
          className="w-full"
        />
      )}

      {activeTrack === 'classroom' && (
        <CompactUnitSelectButton
          value={selectedChapter}
          onChange={(val) => onSelectChapter?.(Number(val))}
          options={orderedChapterMeta.map((ch) => ({
            value: ch.ch,
            label: getChapterCircledTitle(ch.ch, lang),
            disabled: isUnitLocked(adminConfig, 'classroom', ch.ch),
            lockedLabel: '준비중',
          }))}
          theme="purple"
          variant="twin"
          title={tabUi.studyControls.unitSelectTitle}
          ariaLabel={tabUi.studyControls.unitSelectTitle}
          align="left"
          className="w-full"
        />
      )}

      {activeTrack === 'verb' && (
        <CompactUnitSelectButton
          value={selectedVerbUnit}
          onChange={(val) => setSelectedVerbUnit(val as VerbUnitType)}
          options={orderedVerbMeta.map((u) => ({
            value: u.id,
            label: u.label,
            disabled: isUnitLocked(adminConfig, 'verb', u.id),
            lockedLabel: '준비중',
          }))}
          theme="purple"
          variant="twin"
          title="용언 활용 단원 선택"
          ariaLabel="용언 활용 단원 선택"
          align="left"
          className="w-full"
        />
      )}

      {activeTrack === 'particle' && (
        <CompactUnitSelectButton
          value={selectedParticleUnit}
          onChange={(val) => setSelectedParticleUnit(val as ParticleFlashcardUnitId)}
          options={(isParticleSentenceMode ? particleSentenceUnits : particleCombinationUnits).map((u) => ({
            value: u.id,
            label: `${u.circled} ${u.title}`,
            disabled: isUnitLocked(adminConfig, 'particle', u.id),
            lockedLabel: '준비중',
          }))}
          theme="purple"
          variant="twin"
          title={isParticleSentenceMode ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
          ariaLabel={isParticleSentenceMode ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
          align="left"
          className="w-full"
        />
      )}
    </>
  );

  return (
    <div className="w-full flex flex-col gap-0 font-korean-gothic">
      {/* Desktop Row 3 Independent Controls (PC lg+ only) */}
      {!isFocusMode && !isMenuCollapsed && onSelectMethod && (
        <DesktopControlBar
          activeTrack={activeTrack}
          activeMethod={activeMethod}
          onSelectMethod={onSelectMethod}
          uiLang={uiLang}
          isTocOpen={isTocOpen}
          onToggleToc={onToggleToc}
          isContinuousView={false}
          onToggleContinuous={onToggleContinuous}
          onJumpCoverToc={onJumpCoverToc}
          centerUnitControl={desktopCenterUnitControl}
          onToggleFocusMode={onToggleFocusMode}
        />
      )}

      {/* Mobile Only Row 5: 용언 / 조사 플래시카드 전용 */}
      {!isMenuCollapsed && (activeTrack === 'verb' || activeTrack === 'particle') && (
        <div
          className={`lg:hidden sticky top-[66px] sm:top-[74px] z-[28] bg-[#F4F3F8]/95 backdrop-blur-md pb-1 mb-1.5 border-b no-print w-full max-w-3xl mx-auto px-2.5 sm:px-4 select-none ${
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

            {/* Right: Compact Single-line Unit Dropdown (Mobile) */}
            <div className="flex items-center gap-1 shrink-0 min-w-0">
              {activeTrack === 'particle' ? (
                <CompactUnitSelectButton
                  value={selectedParticleUnit}
                  onChange={(val) => setSelectedParticleUnit(val as ParticleFlashcardUnitId)}
                  options={(isParticleSentenceMode ? particleSentenceUnits : particleCombinationUnits).map((u) => ({
                    value: u.id,
                    label: `${u.circled} ${u.title}`,
                    disabled: isUnitLocked(adminConfig, 'particle', u.id),
                    lockedLabel: '준비중',
                  }))}
                  theme="emerald"
                  title={isParticleSentenceMode ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
                  ariaLabel={isParticleSentenceMode ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
                  align="right"
                  className="w-[145px] xs:w-[165px] sm:w-[220px]"
                />
              ) : (
                <CompactUnitSelectButton
                  value={selectedVerbUnit}
                  onChange={(val) => setSelectedVerbUnit(val as VerbUnitType)}
                  options={orderedVerbMeta.map((u) => ({
                    value: u.id,
                    label: u.label,
                    disabled: isUnitLocked(adminConfig, 'verb', u.id),
                    lockedLabel: '준비중',
                  }))}
                  theme="purple"
                  title="용언 활용 단원 선택"
                  ariaLabel="용언 활용 단원 선택"
                  align="right"
                  className="w-[155px] xs:w-[175px] sm:w-[225px]"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Track별 플래시카드 본문 */}
      <div
        className={`w-full mx-auto px-1 sm:px-4 ${
          isFocusMode ? 'max-w-[1600px]' : 'lg:max-w-[1080px] max-w-[1600px]'
        }`}
      >
        {isActiveUnitLocked ? (
          <div className="w-full max-w-3xl mx-auto my-6 bg-white rounded-xl border border-slate-200 px-6 py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-700">현재 준비중인 단원입니다</h3>
            <p className="text-xs text-slate-500">
              공개된 다른 단원을 선택해 학습을 이어가 주세요.
            </p>
          </div>
        ) : (
        <>
        {activeTrack === 'hangeul' && (
          <Suspense fallback={<FlashcardTrackFallback />}>
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
          </Suspense>
        )}

        {activeTrack === 'classroom' && (
          <Suspense fallback={<FlashcardTrackFallback />}>
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
          </Suspense>
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
          <Suspense fallback={<FlashcardTrackFallback />}>
            <ParticleFlashcardSection
              lang={lang}
              uiLang={uiLang}
              selectedUnit={selectedParticleUnit}
              onSelectUnit={setSelectedParticleUnit}
              filterMode={particleSubMode}
            />
          </Suspense>
        )}
        </>
        )}
      </div>

      {/* PC PDF-Bookmark TOC Sidebar */}
      <DesktopTocSidebar
        isOpen={Boolean(isTocOpen)}
        onClose={() => onToggleToc?.()}
        title={overviewConfig.title}
        items={overviewConfig.items}
        onSelectItem={(item) => {
          const found = overviewConfig.items.find((i) => i.id === item.id);
          if (found) handleSelectOverviewItem(found);
        }}
      />

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
