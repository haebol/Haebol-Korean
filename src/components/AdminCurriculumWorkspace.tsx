import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  X,
  Lock,
  Unlock,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Eye,
  Smartphone,
  Monitor,
  Layers,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage, getLanguageMeta } from '../types';
import { HANGEUL_GROUPS, HangeulCardData } from '../data/hangeulGroupsData';
import { VOCABULARY_DATA, getChapterCircledTitle } from '../data/vocabulary';
import { VERB_CARDS_BY_UNIT } from '../data/verbCardsData';
import { VerbUnitType, VerbCardItem } from '../data/verbUnitMeta';
import {
  PARTICLE_COLS_BY_UNIT,
  PARTICLE_ROWS_BY_UNIT,
  ParticleColsItem,
  ParticleRowsItem,
} from '../data/particleWorksheetData';
import {
  PARTICLE_COLS_16_TO_30,
  PARTICLE_ROWS_16_TO_30,
} from '../data/particleWorksheetData2';
import { ParticleUnitId } from '../data/particleUnitMeta';
import { VocabVisual } from './VocabVisual';
import { PrintableWorksheetPage } from './PrintableWorksheetPage';
import { VerbConjugationWorksheetPage } from './VerbConjugationWorksheetPage';
import { ParticleWorksheetPage } from './ParticleWorksheetPage';
import { ScaledPreviewFrame } from './AdminCaptureCards';
import { speakKorean, playCutePop } from '../utils/audio';
import {
  AdminCurriculumConfig,
  AdminTrackId,
  makeUnitKey,
  isUnitLocked,
  toggleUnitLocked,
  setUnitsBulkLocked,
  moveUnitInTrack,
  getOrderedHangeulMeta,
  getOrderedChapterMeta,
  getOrderedVerbMeta,
  getOrderedParticleMeta,
} from '../utils/adminCurriculumConfig';

interface AdminCurriculumWorkspaceProps {
  config: AdminCurriculumConfig;
  onUpdateConfig: (
    updater: AdminCurriculumConfig | ((prev: AdminCurriculumConfig) => AdminCurriculumConfig)
  ) => void;
}

type TrackFilter = 'all' | AdminTrackId;

interface UnifiedUnitRow {
  track: AdminTrackId;
  id: string | number;
  unitKey: string;
  orderIndex: number;
  trackTotal: number;
  trackLabel: string;
  title: string;
  subtitle: string;
  itemCount: number;
  searchHaystack: string;
}

interface UnifiedItemRow {
  key: string;
  index: number;
  primaryText: string;
  secondaryText?: string;
  meaningText: string;
  sampleText?: string;
  speakText: string;
  hangeulCard?: HangeulCardData;
  vocabItem?: (typeof VOCABULARY_DATA)[number];
  verbCard?: VerbCardItem;
  particleCols?: ParticleColsItem;
  particleRows?: ParticleRowsItem;
}

interface BulkGroupDef {
  id: string;
  label: string;
  unitKeys: string[];
}

const TRACK_LABELS: Record<AdminTrackId, string> = {
  hangeul: '한글',
  classroom: '교실한국어',
  verb: '용언',
  particle: '조사',
};

export const AdminCurriculumWorkspace: React.FC<AdminCurriculumWorkspaceProps> = ({
  config,
  onUpdateConfig,
}) => {
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('verb');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<AdminTrackId>('verb');
  const [selectedUnitId, setSelectedUnitId] = useState<string | number>('unit10');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  // Right preview controls
  const [previewMode, setPreviewMode] = useState<'flashcard' | 'worksheet'>('flashcard');
  const [previewLang, setPreviewLang] = useState<SupportedLanguage>('en');
  const [previewViewport, setPreviewViewport] = useState<'mobile' | 'desktop'>('mobile');
  const [previewFlipped, setPreviewFlipped] = useState<boolean>(false);
  const [simulateLearnerLock, setSimulateLearnerLock] = useState<boolean>(false);
  const [showBulkPanel, setShowBulkPanel] = useState<boolean>(false);

  // Mobile (< lg) 3-pane switcher
  const [mobilePane, setMobilePane] = useState<'units' | 'items' | 'preview'>('units');

  const orderedHangeul = useMemo(() => getOrderedHangeulMeta(config), [config]);
  const orderedChapters = useMemo(() => getOrderedChapterMeta(config), [config]);
  const orderedVerbs = useMemo(() => getOrderedVerbMeta(config), [config]);
  const orderedParticles = useMemo(() => getOrderedParticleMeta(config), [config]);

  const allUnits = useMemo<UnifiedUnitRow[]>(() => {
    const rows: UnifiedUnitRow[] = [];

    orderedHangeul.forEach((g, idx) => {
      rows.push({
        track: 'hangeul',
        id: g.id,
        unitKey: makeUnitKey('hangeul', g.id),
        orderIndex: idx,
        trackTotal: orderedHangeul.length,
        trackLabel: TRACK_LABELS.hangeul,
        title: g.titleKo,
        subtitle: `${g.badge} · ${g.previewChars.join(' ')}`,
        itemCount: g.cardCount,
        searchHaystack: `한글 ${g.titleKo} ${g.badge} ${g.previewChars.join(' ')} ${g.previewSampleWord}`.toLowerCase(),
      });
    });

    orderedChapters.forEach((c, idx) => {
      rows.push({
        track: 'classroom',
        id: c.ch,
        unitKey: makeUnitKey('classroom', c.ch),
        orderIndex: idx,
        trackTotal: orderedChapters.length,
        trackLabel: TRACK_LABELS.classroom,
        title: c.circledTitle,
        subtitle: c.previewWords.join(' · '),
        itemCount: c.itemCount,
        searchHaystack: `교실한국어 ${c.ch}단원 ${c.circledTitle} ${c.theme} ${c.previewWords.join(' ')}`.toLowerCase(),
      });
    });

    orderedVerbs.forEach((v, idx) => {
      rows.push({
        track: 'verb',
        id: v.id,
        unitKey: makeUnitKey('verb', v.id),
        orderIndex: idx,
        trackTotal: orderedVerbs.length,
        trackLabel: TRACK_LABELS.verb,
        title: v.label,
        subtitle: v.verbs.join(' · '),
        itemCount: v.verbs.length,
        searchHaystack: `용언 ${v.num}단원 ${v.label} ${v.grammar} ${v.verbs.join(' ')}`.toLowerCase(),
      });
    });

    orderedParticles.forEach((p, idx) => {
      rows.push({
        track: 'particle',
        id: p.id,
        unitKey: makeUnitKey('particle', p.id),
        orderIndex: idx,
        trackTotal: orderedParticles.length,
        trackLabel: TRACK_LABELS.particle,
        title: `${p.circled} ${p.title}`,
        subtitle: `${p.layoutType === 'rows5' ? '문장 만들기' : '조사 결합'} · ${p.grammar}`,
        itemCount: 5,
        searchHaystack: `조사 ${p.id} ${p.title} ${p.grammar} ${p.keywords.join(' ')}`.toLowerCase(),
      });
    });

    return rows;
  }, [orderedHangeul, orderedChapters, orderedVerbs, orderedParticles]);

  const filteredUnits = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allUnits.filter((u) => {
      if (trackFilter !== 'all' && u.track !== trackFilter) return false;
      if (!q) return true;
      return u.searchHaystack.includes(q);
    });
  }, [allUnits, trackFilter, searchQuery]);

  // Bulk group definitions based on active trackFilter
  const bulkGroups = useMemo<BulkGroupDef[]>(() => {
    const hangeulKeys = orderedHangeul.map((g) => makeUnitKey('hangeul', g.id));
    const classroomKeys = orderedChapters.map((c) => makeUnitKey('classroom', c.ch));
    const verbKeys = orderedVerbs.map((v) => makeUnitKey('verb', v.id));
    const particleKeys = orderedParticles.map((p) => makeUnitKey('particle', p.id));

    if (trackFilter === 'all') {
      return [
        { id: 'all-hangeul', label: '한글 전체 (12)', unitKeys: hangeulKeys },
        { id: 'all-classroom', label: '교실한국어 전체 (30)', unitKeys: classroomKeys },
        { id: 'all-verb', label: '용언 전체 (30)', unitKeys: verbKeys },
        { id: 'all-particle', label: '조사 전체 (30)', unitKeys: particleKeys },
      ];
    }

    if (trackFilter === 'hangeul') {
      return [
        { id: 'h-all', label: '한글 전체 (12)', unitKeys: hangeulKeys },
        {
          id: 'h-jamo',
          label: '자음·모음 (1~4)',
          unitKeys: ['basic_consonants', 'double_consonants', 'basic_vowels', 'compound_vowels'].map((id) =>
            makeUnitKey('hangeul', id)
          ),
        },
        {
          id: 'h-basic',
          label: '기본글자 (5~9)',
          unitKeys: [
            'basic_syllables_p1',
            'basic_syllables_p2',
            'basic_syllables_p3',
            'basic_syllables_p4',
            'basic_syllables_p5',
          ].map((id) => makeUnitKey('hangeul', id)),
        },
        {
          id: 'h-batchim',
          label: '받침글자 (10~12)',
          unitKeys: ['batchim_p1', 'batchim_p2', 'batchim_p3'].map((id) =>
            makeUnitKey('hangeul', id)
          ),
        },
      ];
    }

    if (trackFilter === 'classroom') {
      return [
        { id: 'c-all', label: '교실한국어 전체 (30)', unitKeys: classroomKeys },
        {
          id: 'c-1',
          label: '기초 생활 (1~10단원)',
          unitKeys: Array.from({ length: 10 }, (_, i) => makeUnitKey('classroom', i + 1)),
        },
        {
          id: 'c-2',
          label: '교과·학교 (11~20단원)',
          unitKeys: Array.from({ length: 10 }, (_, i) => makeUnitKey('classroom', i + 11)),
        },
        {
          id: 'c-3',
          label: '확장·표현 (21~30단원)',
          unitKeys: Array.from({ length: 10 }, (_, i) => makeUnitKey('classroom', i + 21)),
        },
      ];
    }

    if (trackFilter === 'verb') {
      return [
        { id: 'v-all', label: '용언 전체 (30)', unitKeys: verbKeys },
        {
          id: 'v-1',
          label: '현재·과거 (1~10단원)',
          unitKeys: Array.from({ length: 10 }, (_, i) => makeUnitKey('verb', `unit${i + 1}`)),
        },
        {
          id: 'v-2',
          label: '부정·요청·미래 (11~20단원)',
          unitKeys: Array.from({ length: 10 }, (_, i) => makeUnitKey('verb', `unit${i + 11}`)),
        },
        {
          id: 'v-3',
          label: '연결·고급 (21~30단원)',
          unitKeys: Array.from({ length: 10 }, (_, i) => makeUnitKey('verb', `unit${i + 21}`)),
        },
      ];
    }

    // particle
    const combKeys = orderedParticles
      .filter((p) => p.layoutType === 'cols5')
      .map((p) => makeUnitKey('particle', p.id));
    const sentKeys = orderedParticles
      .filter((p) => p.layoutType === 'rows5')
      .map((p) => makeUnitKey('particle', p.id));

    return [
      { id: 'p-all', label: '조사 전체 (30)', unitKeys: particleKeys },
      { id: 'p-comb', label: `조사 결합 (${combKeys.length})`, unitKeys: combKeys },
      { id: 'p-sent', label: `문장 만들기 (${sentKeys.length})`, unitKeys: sentKeys },
    ];
  }, [trackFilter, orderedHangeul, orderedChapters, orderedVerbs, orderedParticles]);

  const activeUnit = useMemo(() => {
    return (
      allUnits.find(
        (u) => u.track === selectedTrack && String(u.id) === String(selectedUnitId)
      ) || allUnits[0]
    );
  }, [allUnits, selectedTrack, selectedUnitId]);

  const activeUnitLocked = isUnitLocked(config, activeUnit.track, activeUnit.id);

  // Extract real items for the selected unit (zero mutation!)
  const unitItems = useMemo<UnifiedItemRow[]>(() => {
    if (activeUnit.track === 'hangeul') {
      const grp = HANGEUL_GROUPS.find((g) => g.id === String(activeUnit.id)) || HANGEUL_GROUPS[0];
      return grp.cards.map((card, idx) => ({
        key: `${grp.id}-${idx}-${card.char}`,
        index: idx,
        primaryText: card.char,
        secondaryText: card.combination
          ? `${card.combination.consonant} + ${card.combination.vowel} = ${card.combination.syllable}`
          : card.name,
        meaningText: `${card.sampleWord} (${card.meanings[previewLang] || card.meanings.en})`,
        sampleText: card.tips[previewLang] || card.tips.en || undefined,
        speakText: card.combination ? card.combination.syllableSound : card.name,
        hangeulCard: card,
      }));
    }

    if (activeUnit.track === 'classroom') {
      const chNum = Number(activeUnit.id);
      const items = VOCABULARY_DATA.filter((v) => v.ch === chNum);
      return items.map((item, idx) => ({
        key: `ch${chNum}-${idx}-${item.ko}`,
        index: idx,
        primaryText: item.ko,
        secondaryText: item.romaja ? `[${item.romaja}]` : undefined,
        meaningText: String((item as unknown as Record<string, unknown>)[previewLang] || item.en),
        sampleText: item.samplePhrase,
        speakText: item.ko,
        vocabItem: item,
      }));
    }

    if (activeUnit.track === 'verb') {
      const unitId = activeUnit.id as VerbUnitType;
      const cards = VERB_CARDS_BY_UNIT[unitId] || [];
      return cards.map((card, idx) => ({
        key: card.id,
        index: idx,
        primaryText: `${card.baseWord} → ${card.conjugatedWord}`,
        secondaryText: card.vowelHint,
        meaningText: card.meanings[previewLang] || card.meanings.en,
        sampleText: card.sampleSentence,
        speakText: `${card.baseWord}, ${card.conjugatedWord}`,
        verbCard: card,
      }));
    }

    // particle
    const pUnitId = activeUnit.id as ParticleUnitId;
    const colsItems =
      PARTICLE_COLS_BY_UNIT[pUnitId] || PARTICLE_COLS_16_TO_30[pUnitId] || null;
    if (colsItems) {
      return colsItems.map((item, idx) => ({
        key: item.id,
        index: idx,
        primaryText: `${item.baseNoun} → ${item.combinedWord}`,
        secondaryText: item.badge,
        meaningText: item.meanings[previewLang] || item.meanings.en,
        sampleText: `${item.sentencePrefix}${item.sentenceHighlight}${item.sentenceSuffix}`,
        speakText: `${item.combinedWord}. ${item.sentencePrefix}${item.sentenceHighlight}${item.sentenceSuffix}`,
        particleCols: item,
      }));
    }
    const rowsItems =
      PARTICLE_ROWS_BY_UNIT[pUnitId] || PARTICLE_ROWS_16_TO_30[pUnitId] || [];
    return rowsItems.map((item, idx) => ({
      key: item.id,
      index: idx,
      primaryText: item.fullSentence,
      secondaryText: item.badge,
      meaningText: item.meanings[previewLang] || item.meanings.en,
      sampleText: item.fullSentence,
      speakText: item.fullSentence,
      particleRows: item,
    }));
  }, [activeUnit, previewLang]);

  useEffect(() => {
    setSelectedItemIndex(0);
    setPreviewFlipped(false);
    setSimulateLearnerLock(false);
  }, [activeUnit.unitKey]);

  const activeItem = unitItems[selectedItemIndex] || unitItems[0];

  const handleSelectUnit = (u: UnifiedUnitRow) => {
    playCutePop();
    setSelectedTrack(u.track);
    setSelectedUnitId(u.id);
    setSelectedItemIndex(0);
    setPreviewFlipped(false);
    setMobilePane('items');
  };

  const handleSelectItem = (idx: number) => {
    playCutePop();
    setSelectedItemIndex(idx);
    setPreviewFlipped(false);
    setMobilePane('preview');
  };

  const canReorderRow = searchQuery.trim() === '' && trackFilter !== 'all';

  // Classroom worksheet props for real-time worksheet preview
  const classroomWorksheetData = useMemo(() => {
    if (activeUnit.track !== 'classroom') return null;
    const chNum = Number(activeUnit.id);
    const chMeta = orderedChapters.find((c) => c.ch === chNum) || orderedChapters[0];
    const items = VOCABULARY_DATA.filter((v) => v.ch === chMeta.ch);
    return {
      chapter: {
        ch: chMeta.ch,
        title: chMeta.theme,
        theme: chMeta.theme,
        circledTitle: getChapterCircledTitle(chMeta.ch, previewLang),
        itemCount: items.length,
      },
      items,
    };
  }, [activeUnit, orderedChapters, previewLang]);

  const menuExamLocked = config.lockedMenus['menu:exam'] !== false;
  const menuPlayLocked = config.lockedMenus['menu:play'] !== false;

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[#F8F9FB] font-korean-gothic">
      {/* Mobile / Tablet (< lg) 3-Pane Switcher */}
      <div className="lg:hidden bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 shrink-0">
        {(
          [
            { id: 'units', label: '1. 단원 목록' },
            { id: 'items', label: `2. 항목 (${unitItems.length})` },
            { id: 'preview', label: '3. 미리보기' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              playCutePop();
              setMobilePane(tab.id);
            }}
            className={`flex-1 h-9 px-2 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
              mobilePane === tab.id
                ? 'bg-[#3B1668] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main 3-Pane Split Workspace */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* ================================================================ */}
        {/* PANE 1 (LEFT): 전체 단원 및 카테고리 목록 + 검색 + 일괄 스위치       */}
        {/* ================================================================ */}
        <aside
          className={`${
            mobilePane === 'units' ? 'flex' : 'hidden'
          } lg:flex flex-col w-full lg:w-[325px] xl:w-[355px] shrink-0 bg-white border-r border-slate-200 min-h-0`}
        >
          {/* Search + Category Filter */}
          <div className="p-3.5 border-b border-slate-200 space-y-2.5 shrink-0">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="단원명 · 문법 · 단어 빠른 검색..."
                aria-label="단원 키워드 검색"
                className="w-full h-9 pl-9 pr-8 rounded-md bg-slate-50 border border-slate-200 focus:border-[#3B1668] focus:bg-white focus:outline-none text-xs font-medium text-slate-800 placeholder:text-slate-400 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="검색어 지우기"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Track Segmented Controls */}
            <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 rounded-md">
              {(
                [
                  { id: 'all', label: '전체' },
                  { id: 'hangeul', label: '한글' },
                  { id: 'classroom', label: '교실' },
                  { id: 'verb', label: '용언' },
                  { id: 'particle', label: '조사' },
                ] as const
              ).map((cat) => {
                const active = trackFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setTrackFilter(cat.id);
                    }}
                    className={`h-7 rounded text-[11.5px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-white text-[#3B1668] shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Collapsible Bulk Track/Group Switch Bar */}
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
                표시 단원 {filteredUnits.length}개
                {!canReorderRow && (
                  <span className="text-slate-400"> · 순서이동은 영역 선택 시</span>
                )}
              </span>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setShowBulkPanel((p) => !p);
                }}
                className={`text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  showBulkPanel
                    ? 'bg-[#3B1668] text-white'
                    : 'text-[#3B1668] hover:bg-purple-50'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>일괄 공개·잠금</span>
              </button>
            </div>

            {showBulkPanel && (
              <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-[11px] font-bold text-slate-700">
                  계통·단계별 일괄 전환
                </div>
                <div className="space-y-1.5">
                  {bulkGroups.map((grp) => {
                    const lockedCount = grp.unitKeys.filter((k) => Boolean(config.lockedUnits[k])).length;
                    const allLocked = lockedCount === grp.unitKeys.length && grp.unitKeys.length > 0;
                    const allOpen = lockedCount === 0;
                    return (
                      <div
                        key={grp.id}
                        className="flex items-center justify-between gap-2 text-[11px] py-1 border-b border-slate-200/70 last:border-b-0"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 truncate">{grp.label}</div>
                          <div className="text-[10px] text-slate-500 tabular-nums">
                            공개 {grp.unitKeys.length - lockedCount} · 준비중 {lockedCount}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={allOpen}
                            onClick={() => {
                              playCutePop();
                              onUpdateConfig((prev) =>
                                setUnitsBulkLocked(prev, grp.unitKeys, false)
                              );
                            }}
                            className="px-2 py-1 rounded text-[10.5px] font-bold bg-white border border-slate-300 text-emerald-700 hover:bg-emerald-50 disabled:opacity-40 cursor-pointer disabled:cursor-default whitespace-nowrap"
                          >
                            전체공개
                          </button>
                          <button
                            type="button"
                            disabled={allLocked}
                            onClick={() => {
                              playCutePop();
                              onUpdateConfig((prev) =>
                                setUnitsBulkLocked(prev, grp.unitKeys, true)
                              );
                            }}
                            className="px-2 py-1 rounded text-[10.5px] font-bold bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer disabled:cursor-default whitespace-nowrap"
                          >
                            준비중
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Menu-Level Lock Switches (부록 시험 / 놀이) */}
                <div className="pt-1.5 border-t border-slate-200 space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700">메뉴 잠금 설정</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        onUpdateConfig((prev) => ({
                          ...prev,
                          lockedMenus: {
                            ...prev.lockedMenus,
                            'menu:exam': !menuExamLocked,
                          },
                        }));
                      }}
                      className={`h-8 px-2 rounded border text-[11px] font-bold flex items-center justify-between cursor-pointer transition-colors ${
                        menuExamLocked
                          ? 'bg-slate-100 border-slate-300 text-slate-500'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      }`}
                    >
                      <span>시험 메뉴</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px]">
                        {menuExamLocked ? (
                          <>
                            <Lock className="w-3 h-3" />
                            준비중
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3" />
                            공개
                          </>
                        )}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        onUpdateConfig((prev) => ({
                          ...prev,
                          lockedMenus: {
                            ...prev.lockedMenus,
                            'menu:play': !menuPlayLocked,
                          },
                        }));
                      }}
                      className={`h-8 px-2 rounded border text-[11px] font-bold flex items-center justify-between cursor-pointer transition-colors ${
                        menuPlayLocked
                          ? 'bg-slate-100 border-slate-300 text-slate-500'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      }`}
                    >
                      <span>놀이 메뉴</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px]">
                        {menuPlayLocked ? (
                          <>
                            <Lock className="w-3 h-3" />
                            준비중
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3" />
                            공개
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scrollable Unit List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredUnits.length === 0 ? (
              <div className="py-16 px-4 text-center space-y-2">
                <p className="text-xs font-bold text-slate-500">검색된 단원이 없습니다.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setTrackFilter('all');
                  }}
                  className="text-xs font-bold text-[#3B1668] hover:underline cursor-pointer"
                >
                  전체 단원 보기
                </button>
              </div>
            ) : (
              filteredUnits.map((u) => {
                const isSelected = u.unitKey === activeUnit.unitKey;
                const locked = isUnitLocked(config, u.track, u.id);
                return (
                  <div
                    key={u.unitKey}
                    onClick={() => handleSelectUnit(u)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectUnit(u);
                      }
                    }}
                    className={`px-3 py-2.5 flex items-center gap-2 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#F3EFFA]'
                        : locked
                        ? 'bg-slate-50/75 hover:bg-slate-100/80'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                  >
                    {/* Order Move Arrows (▲/▼) */}
                    {canReorderRow && (
                      <div
                        className="flex flex-col gap-0.5 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          disabled={u.orderIndex === 0}
                          onClick={() => {
                            playCutePop();
                            onUpdateConfig((prev) => moveUnitInTrack(prev, u.track, u.id, 'up'));
                          }}
                          className="w-5 h-4 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-25 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-default"
                          title="위로 이동"
                          aria-label={`${u.title} 위로 이동`}
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          disabled={u.orderIndex >= u.trackTotal - 1}
                          onClick={() => {
                            playCutePop();
                            onUpdateConfig((prev) => moveUnitInTrack(prev, u.track, u.id, 'down'));
                          }}
                          className="w-5 h-4 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-25 flex items-center justify-center text-slate-600 cursor-pointer disabled:cursor-default"
                          title="아래로 이동"
                          aria-label={`${u.title} 아래로 이동`}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    {/* Unit Title & Metadata */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        {trackFilter === 'all' && (
                          <span className="text-[10.5px] font-bold text-slate-400 shrink-0">
                            {u.trackLabel} ·
                          </span>
                        )}
                        <span
                          className={`text-[12.5px] truncate ${
                            locked
                              ? 'text-slate-400 font-semibold line-through decoration-slate-300'
                              : isSelected
                              ? 'text-[#3B1668] font-black'
                              : 'text-slate-800 font-bold'
                          }`}
                        >
                          {u.title}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500 truncate tabular-nums">
                        {u.itemCount}항목 · {u.subtitle}
                      </div>
                    </div>

                    {/* Publish / Coming Soon Toggle Switch */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={!locked}
                      aria-label={`${u.title} ${locked ? '준비중 (클릭하여 공개)' : '공개 중 (클릭하여 준비중)'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playCutePop();
                        onUpdateConfig((prev) => toggleUnitLocked(prev, u.track, u.id));
                      }}
                      className="flex items-center gap-1.5 shrink-0 cursor-pointer group"
                      title={locked ? '현재 준비중 — 클릭하면 공개됩니다' : '현재 공개중 — 클릭하면 준비중(잠금)됩니다'}
                    >
                      <span
                        className={`text-[10.5px] font-bold whitespace-nowrap ${
                          locked ? 'text-slate-400' : 'text-emerald-700'
                        }`}
                      >
                        {locked ? '준비중' : '공개'}
                      </span>
                      <span
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          locked ? 'bg-slate-300' : 'bg-emerald-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform ${
                            locked ? 'translate-x-1' : 'translate-x-[18px]'
                          }`}
                        />
                      </span>
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* ================================================================ */}
        {/* PANE 2 (CENTER): 선택 단원의 항목 리스트                           */}
        {/* ================================================================ */}
        <section
          className={`${
            mobilePane === 'items' ? 'flex' : 'hidden'
          } lg:flex flex-col flex-1 min-w-0 bg-[#F8F9FB] min-h-0`}
        >
          {/* Unit Summary Header */}
          <div className="px-5 py-3.5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-slate-500 flex items-center gap-1.5">
                <span>{activeUnit.trackLabel}</span>
                <span aria-hidden="true">/</span>
                <span className="tabular-nums">
                  노출 순서 {activeUnit.orderIndex + 1} / {activeUnit.trackTotal}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">총 {unitItems.length}개 항목</span>
              </div>
              <h3 className="text-base font-black text-slate-900 truncate mt-0.5">
                {activeUnit.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Unit Reorder Controls */}
              <div className="inline-flex items-center rounded-md border border-slate-200 bg-white overflow-hidden">
                <button
                  type="button"
                  disabled={activeUnit.orderIndex === 0}
                  onClick={() => {
                    playCutePop();
                    onUpdateConfig((prev) =>
                      moveUnitInTrack(prev, activeUnit.track, activeUnit.id, 'up')
                    );
                  }}
                  className="h-8 px-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 border-r border-slate-200 flex items-center gap-0.5 cursor-pointer disabled:cursor-default whitespace-nowrap"
                  title="이 단원을 위로 이동"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>위로</span>
                </button>
                <button
                  type="button"
                  disabled={activeUnit.orderIndex >= activeUnit.trackTotal - 1}
                  onClick={() => {
                    playCutePop();
                    onUpdateConfig((prev) =>
                      moveUnitInTrack(prev, activeUnit.track, activeUnit.id, 'down')
                    );
                  }}
                  className="h-8 px-2 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 flex items-center gap-0.5 cursor-pointer disabled:cursor-default whitespace-nowrap"
                  title="이 단원을 아래로 이동"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span>아래로</span>
                </button>
              </div>

              {/* Unit Publish/Lock Button */}
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  onUpdateConfig((prev) =>
                    toggleUnitLocked(prev, activeUnit.track, activeUnit.id)
                  );
                }}
                className={`h-8 px-3 rounded-md border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
                  activeUnitLocked
                    ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {activeUnitLocked ? (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>준비중 (잠금)</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>공개 중</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Spacious Scannable Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2">
            {unitItems.map((item) => {
              const isItemSelected = item.index === selectedItemIndex;
              return (
                <div
                  key={item.key}
                  onClick={() => handleSelectItem(item.index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectItem(item.index);
                    }
                  }}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors cursor-pointer flex items-center gap-3.5 ${
                    isItemSelected
                      ? 'bg-white border-[#3B1668] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Index Number */}
                  <span
                    className={`w-6 text-right text-xs font-bold tabular-nums shrink-0 ${
                      isItemSelected ? 'text-[#3B1668]' : 'text-slate-400'
                    }`}
                  >
                    {String(item.index + 1).padStart(2, '0')}
                  </span>

                  {/* Visual Thumbnail / Glyph */}
                  <div className="w-11 h-11 rounded-md bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 overflow-hidden">
                    {item.hangeulCard ? (
                      <span className="text-xl font-black text-slate-900 font-badasseugi">
                        {item.hangeulCard.char}
                      </span>
                    ) : item.vocabItem ? (
                      <div className="w-9 h-9 flex items-center justify-center">
                        <VocabVisual item={item.vocabItem} size="sm" />
                      </div>
                    ) : item.verbCard?.illustrationSvg ? (
                      <img
                        src={item.verbCard.illustrationSvg}
                        alt={item.verbCard.baseWord}
                        className="w-9 h-9 object-contain"
                      />
                    ) : item.verbCard?.emojiIcon ? (
                      <span className="text-2xl">{item.verbCard.emojiIcon}</span>
                    ) : item.particleCols?.illustrationSvg ? (
                      <img
                        src={item.particleCols.illustrationSvg}
                        alt={item.particleCols.combinedWord}
                        className="w-9 h-9 object-contain"
                      />
                    ) : item.particleRows?.illustrationSvg ? (
                      <img
                        src={item.particleRows.illustrationSvg}
                        alt={item.particleRows.fullSentence}
                        className="w-9 h-9 object-contain"
                      />
                    ) : (
                      <span className="text-sm font-black text-slate-500">
                        {item.index + 1}
                      </span>
                    )}
                  </div>

                  {/* Main Text Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 min-w-0">
                      <span className="text-[14.5px] font-black text-slate-900 truncate">
                        {item.primaryText}
                      </span>
                      {item.secondaryText && (
                        <span className="text-[11.5px] font-semibold text-slate-500 truncate">
                          {item.secondaryText}
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-600 truncate">
                      {item.meaningText}
                      {item.sampleText && (
                        <span className="text-slate-400"> · &ldquo;{item.sampleText}&rdquo;</span>
                      )}
                    </div>
                  </div>

                  {/* Audio Quick Test Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakKorean(item.speakText, 0.88);
                    }}
                    className="w-8 h-8 rounded-md border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-300 text-slate-600 hover:text-[#3B1668] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                    title={`발음 확인: ${item.speakText}`}
                    aria-label="발음 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* PANE 3 (RIGHT): 실시간 학생 화면 미리보기                           */}
        {/* ================================================================ */}
        <aside
          className={`${
            mobilePane === 'preview' ? 'flex' : 'hidden'
          } lg:flex flex-col w-full lg:w-[410px] xl:w-[470px] shrink-0 bg-white border-l border-slate-200 min-h-0`}
        >
          {/* Preview Header & Controls */}
          <div className="px-4 py-3 border-b border-slate-200 space-y-2.5 shrink-0">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                <Eye className="w-4 h-4 text-[#3B1668]" />
                <span>실시간 학생 화면 미리보기</span>
              </div>

              {/* Mobile / PC Frame Toggle */}
              <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-md">
                <button
                  type="button"
                  onClick={() => setPreviewViewport('mobile')}
                  className={`h-7 px-2 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    previewViewport === 'mobile'
                      ? 'bg-white text-[#3B1668] shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>모바일</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewViewport('desktop')}
                  className={`h-7 px-2 rounded text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    previewViewport === 'desktop'
                      ? 'bg-white text-[#3B1668] shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>PC</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              {/* Preview Type Tabs */}
              <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-md">
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setPreviewMode('flashcard');
                  }}
                  className={`h-7 px-2.5 rounded text-[11.5px] font-bold flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap ${
                    previewMode === 'flashcard'
                      ? 'bg-white text-[#3B1668] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>플래시카드</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setPreviewMode('worksheet');
                  }}
                  className={`h-7 px-2.5 rounded text-[11.5px] font-bold flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap ${
                    previewMode === 'worksheet'
                      ? 'bg-white text-[#3B1668] shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>학습지</span>
                </button>
              </div>

              {/* Target Language Selector */}
              <select
                value={previewLang}
                onChange={(e) => setPreviewLang(e.target.value as SupportedLanguage)}
                aria-label="미리보기 번역 언어 선택"
                className="h-8 px-2.5 rounded-md border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 focus:border-[#3B1668] focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.shortName}
                  </option>
                ))}
              </select>
            </div>

            {/* Locked Unit Notice Banner (Admin-only visibility explanation) */}
            {activeUnitLocked && (
              <div className="px-3 py-2 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
                  <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="truncate font-semibold">
                    준비중 상태 · 학습자 화면에서는 잠금 표시
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSimulateLearnerLock((v) => !v)}
                  className="text-[11px] font-bold text-[#3B1668] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {simulateLearnerLock ? '원본 보기' : '잠금화면 확인'}
                </button>
              </div>
            )}
          </div>

          {/* Preview Viewport Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#F4F3F8] flex flex-col items-center">
            {activeUnitLocked && simulateLearnerLock ? (
              <div className="w-full max-w-[340px] my-auto bg-white rounded-xl border border-slate-200 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="text-sm font-black text-slate-700">{activeUnit.title}</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  현재 &lsquo;준비중&rsquo;으로 설정되어 있어 일반 학습자 화면에서는 회색 잠금 상태로 비활성화됩니다.
                </p>
                <button
                  type="button"
                  onClick={() => setSimulateLearnerLock(false)}
                  className="px-3.5 py-2 rounded-md bg-[#3B1668] text-white text-xs font-bold cursor-pointer hover:bg-[#2E1052] transition-colors"
                >
                  관리자 원본 미리보기로 돌아가기
                </button>
              </div>
            ) : previewMode === 'flashcard' && activeItem ? (
              <div
                className={`w-full transition-all ${
                  previewViewport === 'mobile' ? 'max-w-[340px]' : 'max-w-full'
                } space-y-3`}
              >
                {/* Simulated Student Header Strip */}
                <div className="rounded-lg overflow-hidden border border-slate-200 bg-white">
                  <div className="px-3 py-2 bg-[#3B1668] text-white flex items-center justify-between text-[11px] font-bold">
                    <span className="truncate">{activeUnit.title}</span>
                    <span className="tabular-nums text-purple-200 shrink-0">
                      {selectedItemIndex + 1} / {unitItems.length}
                    </span>
                  </div>

                  {/* Interactive Student Card Surface */}
                  <div
                    onClick={() => {
                      playCutePop();
                      setPreviewFlipped((f) => !f);
                      speakKorean(activeItem.speakText, 0.88);
                    }}
                    className={`p-5 min-h-[340px] flex flex-col items-center justify-center text-center cursor-pointer select-none transition-colors ${
                      activeUnit.track === 'hangeul'
                        ? 'bg-[#FFFBEB]'
                        : activeUnit.track === 'classroom'
                        ? 'bg-[#FFF4F7]'
                        : activeUnit.track === 'verb'
                        ? 'bg-[#FAF5FF]'
                        : 'bg-[#F0FDF4]'
                    }`}
                  >
                    {/* Visual */}
                    <div className="mb-3 flex items-center justify-center">
                      {activeItem.hangeulCard ? (
                        <div className="w-28 h-28 rounded-xl bg-white border-2 border-amber-300 flex items-center justify-center">
                          <span className="text-6xl font-black text-slate-900 font-badasseugi">
                            {activeItem.hangeulCard.char}
                          </span>
                        </div>
                      ) : activeItem.vocabItem ? (
                        <div className="w-24 h-24 flex items-center justify-center">
                          <VocabVisual item={activeItem.vocabItem} size="card" />
                        </div>
                      ) : activeItem.verbCard?.illustrationSvg ? (
                        <img
                          src={activeItem.verbCard.illustrationSvg}
                          alt={activeItem.verbCard.baseWord}
                          className="w-24 h-24 object-contain"
                        />
                      ) : activeItem.verbCard?.emojiIcon ? (
                        <span className="text-6xl">{activeItem.verbCard.emojiIcon}</span>
                      ) : activeItem.particleCols?.illustrationSvg ? (
                        <img
                          src={activeItem.particleCols.illustrationSvg}
                          alt={activeItem.particleCols.combinedWord}
                          className="w-24 h-24 object-contain"
                        />
                      ) : activeItem.particleRows?.illustrationSvg ? (
                        <img
                          src={activeItem.particleRows.illustrationSvg}
                          alt={activeItem.particleRows.fullSentence}
                          className="w-24 h-24 object-contain"
                        />
                      ) : null}
                    </div>

                    {/* Primary Word / Conjugation Toggle */}
                    {activeItem.verbCard ? (
                      <div className="my-2">
                        <div className="text-4xl font-black font-badasseugi tracking-tight">
                          {previewFlipped ? (
                            <span className="text-purple-700">
                              {activeItem.verbCard.conjugatedWord}
                            </span>
                          ) : (
                            <>
                              <span className="text-slate-900">{activeItem.verbCard.stem}</span>
                              <span className="text-blue-600">{activeItem.verbCard.ending}</span>
                            </>
                          )}
                        </div>
                        <div className="mt-1.5 text-[11.5px] font-bold text-purple-700">
                          {previewFlipped
                            ? '활용형 확인됨 (클릭하여 기본형)'
                            : `기본형 · 힌트: ${activeItem.verbCard.vowelHint} (클릭하여 활용)`}
                        </div>
                      </div>
                    ) : activeItem.particleCols ? (
                      <div className="my-2">
                        <div className="text-4xl font-black font-badasseugi">
                          {previewFlipped ? (
                            activeItem.particleCols.combinedSegments.map((seg, si) => (
                              <span key={si} style={{ color: seg.color }}>
                                {seg.text}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-900">
                              {activeItem.particleCols.baseNoun}
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 text-[11.5px] font-bold text-emerald-700">
                          {previewFlipped ? '조사 결합 완료' : '클릭하여 조사 결합 미리보기'}
                        </div>
                      </div>
                    ) : activeItem.particleRows ? (
                      <div className="my-2 px-2">
                        <div className="text-2xl font-black font-badasseugi text-slate-900 leading-snug">
                          {activeItem.particleRows.fullSentence}
                        </div>
                      </div>
                    ) : activeItem.vocabItem ? (
                      <div className="my-2">
                        <div className="text-4xl font-black text-slate-900 font-badasseugi">
                          {activeItem.vocabItem.ko}
                        </div>
                        {activeItem.vocabItem.romaja && !previewFlipped && (
                          <div className="mt-1.5 text-xs font-bold text-rose-800">
                            [{activeItem.vocabItem.romaja}]
                          </div>
                        )}
                      </div>
                    ) : activeItem.hangeulCard ? (
                      <div className="my-2">
                        <div className="text-xl font-black text-amber-950">
                          {activeItem.hangeulCard.name}
                        </div>
                        {activeItem.hangeulCard.combination && (
                          <div className="mt-1 text-sm font-bold text-amber-800">
                            {activeItem.hangeulCard.combination.consonant} +{' '}
                            {activeItem.hangeulCard.combination.vowel} ={' '}
                            {activeItem.hangeulCard.combination.syllable}
                          </div>
                        )}
                      </div>
                    ) : null}

                    {/* Meaning & Sample Sentence */}
                    <div className="mt-3 w-full max-w-[300px] space-y-2">
                      <div
                        className={`px-3.5 py-2 rounded-md bg-white border border-slate-200 text-sm font-black text-slate-900 ${
                          getLanguageMeta(previewLang).fontClass || ''
                        }`}
                      >
                        {activeItem.meaningText}
                      </div>
                      {activeItem.sampleText && (
                        <div className="px-3 py-1.5 rounded-md bg-white/80 border border-slate-200/80 text-xs font-bold text-slate-700">
                          &ldquo;{activeItem.sampleText}&rdquo;
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preview Navigation Controls */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    disabled={selectedItemIndex === 0}
                    onClick={() => {
                      playCutePop();
                      setSelectedItemIndex((i) => Math.max(0, i - 1));
                      setPreviewFlipped(false);
                    }}
                    className="h-9 px-3 rounded-md bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer disabled:cursor-default"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>이전 항목</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => speakKorean(activeItem.speakText, 0.88)}
                    className="h-9 px-3.5 rounded-md bg-[#3B1668] hover:bg-[#2E1052] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>발음 테스트</span>
                  </button>

                  <button
                    type="button"
                    disabled={selectedItemIndex >= unitItems.length - 1}
                    onClick={() => {
                      playCutePop();
                      setSelectedItemIndex((i) => Math.min(unitItems.length - 1, i + 1));
                      setPreviewFlipped(false);
                    }}
                    className="h-9 px-3 rounded-md bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer disabled:cursor-default"
                  >
                    <span>다음 항목</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Real Printable Worksheet Live Preview */
              <div className="w-full space-y-2.5">
                <div className="text-[11.5px] font-bold text-slate-600 flex items-center justify-between">
                  <span>실제 인쇄·학습지 학생 화면</span>
                  <span className="text-slate-400">
                    {getLanguageMeta(previewLang).shortName} 기준
                  </span>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-2 overflow-hidden">
                  {activeUnit.track === 'classroom' && classroomWorksheetData ? (
                    <ScaledPreviewFrame targetWidth={990} aspectPaddingTop="71%">
                      <PrintableWorksheetPage
                        chapter={classroomWorksheetData.chapter}
                        items={classroomWorksheetData.items}
                        selectedLangs={[previewLang]}
                        interactiveAudio={false}
                      />
                    </ScaledPreviewFrame>
                  ) : activeUnit.track === 'verb' ? (
                    <ScaledPreviewFrame targetWidth={1020} aspectPaddingTop="71%">
                      <VerbConjugationWorksheetPage
                        lang={previewLang}
                        unit={activeUnit.id as VerbUnitType}
                        interactiveAudio={false}
                      />
                    </ScaledPreviewFrame>
                  ) : activeUnit.track === 'particle' ? (
                    <ScaledPreviewFrame targetWidth={1020} aspectPaddingTop="71%">
                      <ParticleWorksheetPage
                        lang={previewLang}
                        unit={activeUnit.id as ParticleUnitId}
                        interactiveAudio={false}
                      />
                    </ScaledPreviewFrame>
                  ) : (
                    <div className="p-6 text-center space-y-3">
                      <div className="text-sm font-black text-slate-800">{activeUnit.title}</div>
                      <div className="grid grid-cols-4 gap-2">
                        {unitItems.slice(0, 12).map((h) => (
                          <div
                            key={h.key}
                            className="py-3 rounded-md border border-amber-200 bg-[#FFFBEB] flex flex-col items-center justify-center"
                          >
                            <span className="text-2xl font-black text-slate-900 font-badasseugi">
                              {h.primaryText}
                            </span>
                            <span className="text-[10px] text-slate-500 mt-0.5 truncate max-w-full px-1">
                              {h.hangeulCard?.sampleWord}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        한글 전체 A4 인쇄본은 상단 &lsquo;인쇄 · PDF 센터&rsquo; 탭에서 확인할 수 있습니다.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
