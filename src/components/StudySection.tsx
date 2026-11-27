import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Globe,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Printer,
  Layers,
  ArrowUp,
  BookOpen,
  Lock,
  Rows3,
  FileText
} from 'lucide-react';
import {
  VocabularyItem,
  SupportedLanguage,
  LearningTrack,
  LearningMethod,
  SUPPORTED_LANGUAGES,
  SUB_MENU_LABELS
} from '../types';
import { UiLanguage, SUBTAB_UI, NAV_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { VOCABULARY_DATA, CHAPTER_LIST, CHAPTER_THEME_TRANSLATIONS, getChapterCircledTitle } from '../data/vocabulary';
import {
  StudyMode,
  HANGEUL_GROUP_TO_SHEET,
  JAMO_SHEET_ITEMS,
  JAMO_SECTION_OPTIONS,
  BASIC_SECTION_OPTIONS,
  BATCHIM_SECTION_OPTIONS,
  JOLLA_PLAY_OPTIONS,
  JOLLA_PLAY_ITEMS,
  WORDS_SECTION_OPTIONS,
} from '../data/studySheetOptions';
export type { StudyMode };
import { PrintableWorksheetPage } from './PrintableWorksheetPage';
import { PrintableWordWorksheetPage } from './PrintableWordWorksheetPage';
import {
  ConsonantsWorksheetPage,
  VowelsWorksheetPage,
  ComboTracingWorksheetPage,
  ComboWorksheetPage,
  ConsonantsStrokeWorksheetPage,
  ConsonantsStrokeWorksheetPage2,
  ConsonantsStrokeWorksheetPage3,
  ConsonantsStrokeWorksheetPage4,
  ConsonantsStrokeWorksheetPage5,
  VowelsStrokeWorksheetPage1,
  VowelsStrokeWorksheetPage2,
  VowelsStrokeWorksheetPage3,
  VowelsStrokeWorksheetPage4,
  VowelsStrokeWorksheetPage5,
  VowelsStrokeWorksheetPage6
} from './PrintableJamoSheets';
import { BasicLetterWorksheetPage } from './PrintableJamoSheets';
import { BASIC_LETTERS_DATA } from '../data/basicLettersData';
import { BatchimWorksheetPage, BATCHIM_PAGES_DATA } from './PrintableBatchimSheet';
import { playCutePop } from '../utils/audio';
import { waitForPrintReadiness, WebPrintRequest } from '../utils/printReadiness';
import { VerbConjugationWorksheetPage } from './VerbConjugationWorksheetPage';
import { VERB_UNIT_META } from './VerbConjugationSection';
import { ParticleWorksheetPage } from './ParticleWorksheetPage';
import { PARTICLE_UNIT_META } from '../data/particleWorksheetData';
import { OverviewGridModal, OverviewCardItem, OverviewThemeColor } from './OverviewGridModal';
import { CompactUnitSelectButton } from './CompactUnitSelectButton';
import { DesktopControlBar } from './DesktopControlBar';
import { DesktopTocSidebar } from './DesktopTocSidebar';
import { MobileScaledWorksheetWrapper } from './MobileScaledWorksheetWrapper';
import {
  JollaHiddenLettersSheet,
  JollaTerritoryGameSheet,
  JollaMazeGameSheet,
  JollaBingoGameSheet,
} from './HangeulJollaQuizAndGameSheets';
import { ChapterCoverSheet, ChapterTocSheet } from './ChapterCoverTocSheets';
import {
  HANGEUL_EXAM_LESSONS,
  HANGEUL_EXAM_PARTS,
  HangeulExamPartId,
  HangeulExamSheet,
} from './HangeulExam20Sheets';
import {
  VERB_EXAM_LESSONS,
  VerbExamSheet,
} from './VerbExam30Sheets';
import {
  PARTICLE_EXAM_LESSONS,
  ParticleExamSheet,
} from './ParticleExam6Sheets';
import {
  CLASSROOM_EXAM_LESSONS,
  ClassroomExamSheet,
} from './ClassroomExam6Sheets';
import {
  CLASSROOM_PLAY_SHEETS_META,
  ClassroomPlayDraftSheet,
} from './ClassroomPlayDraft5Sheets';
import {
  VERB_PLAY_SHEETS_META,
  VerbPlayDraftSheet,
} from './VerbPlayDraft5Sheets';
import {
  PARTICLE_PLAY_SHEETS_META,
  ParticlePlayDraftSheet,
} from './ParticlePlayDraft5Sheets';
import {
  JollaJamoTerritoryBoardSheet,
  JollaConsonantBingoSheet,
  JollaVowelBingoSheet,
  JollaMountainStampSheet,
  JollaDiceFactorySheet,
  JollaHeroAwardCouponSheet,
} from './JollaPrintGameMotivationSheets';

interface StudySectionProps {
  vocabulary?: VocabularyItem[];
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  selectedChapter?: number;
  onSelectChapter?: (ch: number) => void;
  selectedHangeulGroupId?: string;
  hangeulJumpTrigger?: number;
  selectedVerbUnitIndex?: number;
  selectedParticleUnitIndex?: number;
  particleJumpTrigger?: number;
  sectionType?: LearningTrack;
  activeMethod?: LearningMethod;
  onSelectMethod?: (method: LearningMethod) => void;
  isMenuCollapsed?: boolean;
  isTeacherAuthed?: boolean;
  controlledStudyMode?: StudyMode;
  onStudyModeChange?: (mode: StudyMode) => void;
  controlledParticleSubMode?: 'combination' | 'sentence';
  onParticleSubModeChange?: (subMode: 'combination' | 'sentence') => void;
  worksheetViewMode?: 'single' | 'continuous';
  onSetWorksheetViewMode?: (mode: 'single' | 'continuous') => void;
  isTocOpen?: boolean;
  onToggleToc?: () => void;
  onToggleContinuous?: () => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
  headerPrintTrigger?: number;
  webPrintRequest?: WebPrintRequest | null;
  coverTocTrigger?: number;
  worksheetFocusTrigger?: number;
}



const HANGEUL_EXAM_OPTIONS = HANGEUL_EXAM_LESSONS.map((lesson) => ({
  id: lesson.id,
  label: lesson.dropdownLabel,
  targetSheet: lesson.globalIndex,
}));

const VERB_EXAM_OPTIONS = VERB_EXAM_LESSONS.map((lesson) => ({
  id: lesson.id,
  label: lesson.dropdownLabel,
  targetSheet: lesson.globalIndex,
}));

const PARTICLE_EXAM_OPTIONS = PARTICLE_EXAM_LESSONS.map((lesson) => ({
  id: lesson.id,
  label: lesson.dropdownLabel,
  targetSheet: lesson.globalIndex,
}));

const CLASSROOM_EXAM_OPTIONS = CLASSROOM_EXAM_LESSONS.map((lesson) => ({
  id: lesson.id,
  label: lesson.dropdownLabel,
  targetSheet: lesson.globalIndex,
}));

const CLASSROOM_PLAY_OPTIONS = CLASSROOM_PLAY_SHEETS_META.map((sheet) => ({
  id: sheet.id,
  label: sheet.dropdownLabel,
  targetSheet: sheet.idx,
}));

const VERB_PLAY_OPTIONS = VERB_PLAY_SHEETS_META.map((sheet) => ({
  id: sheet.id,
  label: sheet.dropdownLabel,
  targetSheet: sheet.idx,
}));

const PARTICLE_PLAY_OPTIONS = PARTICLE_PLAY_SHEETS_META.map((sheet) => ({
  id: sheet.id,
  label: sheet.dropdownLabel,
  targetSheet: sheet.idx,
}));



const PARTICLE_COMBINATION_UNITS = PARTICLE_UNIT_META;
const PARTICLE_SENTENCE_UNITS = PARTICLE_UNIT_META.filter((u) => u.layoutType === 'rows5');

const PARTICLE_COMBINATION_OPTIONS = PARTICLE_COMBINATION_UNITS.map((u, idx) => ({
  id: `particle_${u.id}`,
  label: `${u.circled} ${u.title}`,
  targetSheet: idx,
}));

const PARTICLE_SENTENCE_OPTIONS = PARTICLE_SENTENCE_UNITS.map((u, idx) => ({
  id: `particle_${u.id}`,
  label: `${u.circled} ${u.title}`,
  targetSheet: idx,
}));

export const StudySection: React.FC<StudySectionProps> = ({
  vocabulary = VOCABULARY_DATA,
  lang,
  uiLang = 'ko',
  selectedChapter: propSelectedChapter,
  onSelectChapter,
  selectedHangeulGroupId,
  hangeulJumpTrigger,
  selectedVerbUnitIndex,
  selectedParticleUnitIndex,
  particleJumpTrigger,
  sectionType = 'classroom',
  activeMethod = 'worksheet',
  onSelectMethod,
  isMenuCollapsed = false,
  isTeacherAuthed = false,
  controlledStudyMode,
  onStudyModeChange,
  controlledParticleSubMode,
  onParticleSubModeChange,
  worksheetViewMode,
  onSetWorksheetViewMode,
  isTocOpen = false,
  onToggleToc,
  onToggleContinuous,
  isFocusMode = false,
  onToggleFocusMode,
  headerPrintTrigger,
  webPrintRequest,
  coverTocTrigger,
}) => {
  const isExamPlayLocked = !isTeacherAuthed;
  const isLockedMode = (mode: StudyMode): boolean =>
    mode === 'hangeulExam' ||
    mode === 'jollaPlay' ||
    mode === 'verbExam' ||
    mode === 'verbPlay' ||
    mode === 'particleExam' ||
    mode === 'particlePlay' ||
    mode === 'classroomExam' ||
    mode === 'classroomPlay';

  const isModeValidForTrack = (mode: StudyMode, track: LearningTrack | string): boolean => {
    if (track === 'hangeul') {
      return (
        mode === 'jamo' ||
        mode === 'basic' ||
        mode === 'batchim' ||
        mode === 'hangeulExam' ||
        mode === 'jollaPlay'
      );
    }
    if (track === 'verb') {
      return mode === 'words' || mode === 'verbExam' || mode === 'verbPlay';
    }
    if (track === 'particle') {
      return mode === 'particle' || mode === 'particleExam' || mode === 'particlePlay';
    }
    return (
      mode === 'cards' ||
      mode === 'writing' ||
      mode === 'quiz' ||
      mode === 'classroomExam' ||
      mode === 'classroomPlay'
    );
  };

  const getDefaultMode = (track: LearningTrack | string): StudyMode =>
    track === 'hangeul'
      ? 'jamo'
      : track === 'verb'
      ? 'words'
      : track === 'particle'
      ? 'particle'
      : 'cards';

  const [studyMode, setStudyMode] = useState<StudyMode>(() => {
    if (
      controlledStudyMode &&
      isModeValidForTrack(controlledStudyMode, sectionType) &&
      (!isExamPlayLocked || !isLockedMode(controlledStudyMode))
    ) {
      return controlledStudyMode;
    }
    return getDefaultMode(sectionType);
  });
  const [selectedJumpCh, setSelectedJumpCh] = useState<number>(propSelectedChapter ?? 0);
  const [selectedJamoSection, setSelectedJamoSection] = useState<string>('chart');
  const [selectedBasicSection, setSelectedBasicSection] = useState<string>('basic_1_6');
  const [selectedBatchimSection, setSelectedBatchimSection] = useState<string>('batchim_1_7');
  const [selectedHangeulExamSection, setSelectedHangeulExamSection] = useState<string>(
    HANGEUL_EXAM_OPTIONS[0]?.id || 'exam_jamo_1'
  );
  const [examPartFilter, setExamPartFilter] = useState<'all' | HangeulExamPartId>('all');
  const [selectedJollaPlaySection, setSelectedJollaPlaySection] = useState<string>('jolla_jamo_territory');
  const [selectedWordsSection, setSelectedWordsSection] = useState<string>(
    WORDS_SECTION_OPTIONS[selectedVerbUnitIndex ?? 0]?.id || 'words_unit1'
  );
  const [selectedVerbExamSection, setSelectedVerbExamSection] = useState<string>(
    VERB_EXAM_OPTIONS[0]?.id || 'verb_exam_1'
  );
  const [selectedParticleExamSection, setSelectedParticleExamSection] = useState<string>(
    PARTICLE_EXAM_OPTIONS[0]?.id || 'particle_exam_1'
  );
  const [selectedClassroomExamSection, setSelectedClassroomExamSection] = useState<string>(
    CLASSROOM_EXAM_OPTIONS[0]?.id || 'classroom_exam_1'
  );
  const [selectedClassroomPlaySection, setSelectedClassroomPlaySection] = useState<string>(
    CLASSROOM_PLAY_OPTIONS[0]?.id || 'classroom_play_1'
  );
  const [selectedVerbPlaySection, setSelectedVerbPlaySection] = useState<string>(
    VERB_PLAY_OPTIONS[0]?.id || 'verb_play_1'
  );
  const [selectedParticlePlaySection, setSelectedParticlePlaySection] = useState<string>(
    PARTICLE_PLAY_OPTIONS[0]?.id || 'particle_play_1'
  );
  const [particleSubMode, setParticleSubMode] = useState<'combination' | 'sentence'>(
    controlledParticleSubMode ?? 'combination'
  );
  const [selectedParticleSection, setSelectedParticleSection] = useState<string>(
    (controlledParticleSubMode === 'sentence'
      ? PARTICLE_SENTENCE_OPTIONS[0]?.id
      : PARTICLE_COMBINATION_OPTIONS[0]?.id) || 'particle_unit1'
  );
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  // [교실한국어 - 학습지] 전용 뷰 모드 (기본: 'single' 1장 보기 / 토글: 'continuous' 연속 보기)
  const [classroomViewMode, setClassroomViewMode] = useState<'single' | 'continuous'>('single');
  const isInternalJumpRef = useRef(false);
  const prevVerbUnitIndexRef = useRef<number | undefined>(selectedVerbUnitIndex);
  const prevHangeulJumpTriggerRef = useRef<number | undefined>(hangeulJumpTrigger);
  const prevParticleJumpTriggerRef = useRef<number | undefined>(particleJumpTrigger);
  const prevHeaderPrintTriggerRef = useRef<number | undefined>(headerPrintTrigger);
  const prevWebPrintRequestIdRef = useRef<number>(0);
  const prevCoverTocTriggerRef = useRef<number | undefined>(coverTocTrigger);
  const [activePrintRange, setActivePrintRange] = useState<{ startIdx: number; endIdx: number } | null>(null);
  const skipNextModeResetRef = useRef(false);
  const subLabels = SUB_MENU_LABELS[lang] || SUB_MENU_LABELS.en;

  // Sync studyMode when controlledStudyMode changes externally (from PC Row 2 pill bar)
  useEffect(() => {
    if (
      controlledStudyMode &&
      controlledStudyMode !== studyMode &&
      isModeValidForTrack(controlledStudyMode, sectionType) &&
      (!isExamPlayLocked || !isLockedMode(controlledStudyMode))
    ) {
      setStudyMode(controlledStudyMode);
    }
  }, [controlledStudyMode, sectionType, isExamPlayLocked]);

  // Report internal studyMode changes up to App so PC Row 2 stays highlighted accurately
  useEffect(() => {
    onStudyModeChange?.(studyMode);
  }, [studyMode]);

  // Sync controlledParticleSubMode changes externally (from PC Row 2 pill bar)
  useEffect(() => {
    if (controlledParticleSubMode && controlledParticleSubMode !== particleSubMode) {
      setParticleSubMode(controlledParticleSubMode);
      setSelectedJumpCh(0);
      setSelectedParticleSection(
        controlledParticleSubMode === 'sentence'
          ? PARTICLE_SENTENCE_OPTIONS[0]?.id || 'particle_unit3'
          : PARTICLE_COMBINATION_OPTIONS[0]?.id || 'particle_unit1'
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [controlledParticleSubMode]);

  useEffect(() => {
    onParticleSubModeChange?.(particleSubMode);
  }, [particleSubMode]);

  // Sync studyMode when sectionType prop changes
  useEffect(() => {
    if (sectionType === 'hangeul') {
      if (
        hangeulJumpTrigger !== undefined &&
        hangeulJumpTrigger !== prevHangeulJumpTriggerRef.current &&
        selectedHangeulGroupId &&
        HANGEUL_GROUP_TO_SHEET[selectedHangeulGroupId]
      ) {
        return;
      }
      if (!isModeValidForTrack(studyMode, 'hangeul')) {
        if (
          controlledStudyMode &&
          isModeValidForTrack(controlledStudyMode, 'hangeul') &&
          (!isExamPlayLocked || !isLockedMode(controlledStudyMode))
        ) {
          setStudyMode(controlledStudyMode);
        } else {
          setStudyMode('jamo');
        }
      }
    } else if (sectionType === 'verb') {
      if (!isModeValidForTrack(studyMode, 'verb')) {
        if (
          controlledStudyMode &&
          isModeValidForTrack(controlledStudyMode, 'verb') &&
          (!isExamPlayLocked || !isLockedMode(controlledStudyMode))
        ) {
          setStudyMode(controlledStudyMode);
        } else {
          setStudyMode('words');
        }
      }
    } else if (sectionType === 'particle') {
      if (!isModeValidForTrack(studyMode, 'particle')) {
        if (
          controlledStudyMode &&
          isModeValidForTrack(controlledStudyMode, 'particle') &&
          (!isExamPlayLocked || !isLockedMode(controlledStudyMode))
        ) {
          setStudyMode(controlledStudyMode);
        } else {
          setStudyMode('particle');
        }
      }
    } else {
      if (!isModeValidForTrack(studyMode, 'classroom')) {
        if (
          controlledStudyMode &&
          isModeValidForTrack(controlledStudyMode, 'classroom') &&
          (!isExamPlayLocked || !isLockedMode(controlledStudyMode))
        ) {
          setStudyMode(controlledStudyMode);
        } else {
          setStudyMode('cards');
        }
      }
    }
  }, [sectionType]);

  // If teacher admin locks again while viewing an exam/play draft, fall back to the main worksheet
  useEffect(() => {
    if (isExamPlayLocked && isLockedMode(studyMode)) {
      if (sectionType === 'hangeul') setStudyMode('jamo');
      else if (sectionType === 'verb') setStudyMode('words');
      else if (sectionType === 'particle') setStudyMode('particle');
      else setStudyMode('cards');
    }
  }, [isExamPlayLocked, sectionType, studyMode]);

  // 1~3개 다국어 커스텀 선택 상태 (그림카드, 쓰기학습지, 테스트지 공통 - 기본 영어, 베트남어 2개 선택)
  const [customSelectedLangs, setCustomSelectedLangs] = useState<SupportedLanguage[]>(['en', 'vi']);
  const [isCustomLangOpen, setIsCustomLangOpen] = useState(false);

  // FIFO auto-rotation language toggle (최대 3개 대기열 순환, 최소 1개 유지)
  const handleToggleCustomLang = (code: SupportedLanguage) => {
    playCutePop();
    setCustomSelectedLangs(prev => {
      const isSelected = prev.includes(code);
      if (isSelected) {
        if (prev.length > 1) {
          return prev.filter(c => c !== code);
        }
        return prev;
      } else {
        if (prev.length < 3) {
          return [...prev, code];
        } else {
          return [...prev.slice(1), code];
        }
      }
    });
  };

  // 단원별 3종세트 (그림카드 + 쓰기학습지 + 테스트지) 일괄 인쇄 상태
  const [isPrintingTripleSet, setIsPrintingTripleSet] = useState(false);

  // 챕터 하단 [표지 · 차례] 개별/묶음 인쇄 상태
  const [extraPrintTarget, setExtraPrintTarget] = useState<
    null | 'all-extras' | 'cover' | 'toc'
  >(null);

  // 한글 시험 20강 / 졸라 놀이 10종 중 1장 단독 인쇄 상태
  const [singleSheetPrintKey, setSingleSheetPrintKey] = useState<string | null>(null);

  // Sync propSelectedChapter with selectedJumpCh when changed externally
  useEffect(() => {
    if (propSelectedChapter !== undefined && sectionType === 'classroom') {
      if (isInternalJumpRef.current) {
        isInternalJumpRef.current = false;
        return;
      }
      setSelectedJumpCh(propSelectedChapter);
      if (studyMode !== 'cards' && studyMode !== 'writing' && studyMode !== 'quiz') {
        setStudyMode('cards');
      }
      setTimeout(() => {
        const targetId = `study-sheet-ch-${propSelectedChapter}`;
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  }, [propSelectedChapter, sectionType]);

  // Sync selectedVerbUnitIndex when changed from sidebar in verb > worksheet
  useEffect(() => {
    if (prevVerbUnitIndexRef.current === selectedVerbUnitIndex) {
      return;
    }
    prevVerbUnitIndexRef.current = selectedVerbUnitIndex;
    if (sectionType === 'verb' && selectedVerbUnitIndex !== undefined && selectedVerbUnitIndex >= 0) {
      setStudyMode('words');
      setSelectedJumpCh(selectedVerbUnitIndex);
      const opt = WORDS_SECTION_OPTIONS[selectedVerbUnitIndex];
      if (opt) setSelectedWordsSection(opt.id);
      setTimeout(() => {
        const element = document.getElementById(`study-words-sheet-${selectedVerbUnitIndex}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  }, [selectedVerbUnitIndex, sectionType]);

  // Sync selectedParticleUnitIndex when clicked from sidebar in particle > worksheet
  useEffect(() => {
    if (particleJumpTrigger === undefined || particleJumpTrigger === prevParticleJumpTriggerRef.current) {
      return;
    }
    prevParticleJumpTriggerRef.current = particleJumpTrigger;
    if (sectionType === 'particle' && selectedParticleUnitIndex !== undefined && selectedParticleUnitIndex >= 0) {
      const targetUnit = PARTICLE_UNIT_META[selectedParticleUnitIndex];
      const nextSubMode: 'combination' | 'sentence' =
        particleSubMode === 'sentence' && targetUnit?.layoutType === 'rows5'
          ? 'sentence'
          : 'combination';
      const targetUnits =
        nextSubMode === 'sentence' ? PARTICLE_SENTENCE_UNITS : PARTICLE_COMBINATION_UNITS;
      const targetOpts =
        nextSubMode === 'sentence' ? PARTICLE_SENTENCE_OPTIONS : PARTICLE_COMBINATION_OPTIONS;
      const subIdx = Math.max(
        0,
        targetUnits.findIndex((u) => u.id === targetUnit?.id)
      );

      setStudyMode('particle');
      setParticleSubMode(nextSubMode);
      setSelectedJumpCh(subIdx);
      const opt = targetOpts[subIdx];
      if (opt) setSelectedParticleSection(opt.id);
      setTimeout(() => {
        const element = document.getElementById(`study-particle-sheet-${subIdx}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 90);
    }
  }, [particleJumpTrigger, selectedParticleUnitIndex, sectionType]);

  // Sync selectedHangeulGroupId when clicked from sidebar in hangeul > worksheet
  useEffect(() => {
    if (hangeulJumpTrigger === undefined || hangeulJumpTrigger === prevHangeulJumpTriggerRef.current) {
      return;
    }
    prevHangeulJumpTriggerRef.current = hangeulJumpTrigger;
    if (sectionType !== 'hangeul' || !selectedHangeulGroupId) return;

    const mapping = HANGEUL_GROUP_TO_SHEET[selectedHangeulGroupId];
    if (!mapping) return;

    const { mode, targetIdx } = mapping;
    if (studyMode !== mode) {
      skipNextModeResetRef.current = true;
      setStudyMode(mode);
    }
    setSelectedJumpCh(targetIdx);

    if (mode === 'jamo') {
      const opt = [...JAMO_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= targetIdx);
      if (opt) setSelectedJamoSection(opt.id);
    } else if (mode === 'basic') {
      const opt = [...BASIC_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= targetIdx);
      if (opt) setSelectedBasicSection(opt.id);
    } else if (mode === 'batchim') {
      const opt = [...BATCHIM_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= targetIdx);
      if (opt) setSelectedBatchimSection(opt.id);
    }

    const targetId = `study-${mode}-sheet-${targetIdx}`;
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 90);
  }, [hangeulJumpTrigger, selectedHangeulGroupId, sectionType]);

  // 현재 선택된 단원 객체 & PC 1장씩 보기 / 연속 보기 통합 상태
  const effectiveViewMode = worksheetViewMode ?? classroomViewMode;
  const setEffectiveViewMode = (next: 'single' | 'continuous') => {
    setClassroomViewMode(next);
    onSetWorksheetViewMode?.(next);
  };
  const isPcSingleView = effectiveViewMode === 'single';

  const activeJamoIdx =
    selectedJumpCh >= 0 && selectedJumpCh < JAMO_SHEET_ITEMS.length ? selectedJumpCh : 0;
  const activeBasicIdx =
    selectedJumpCh >= 0 && selectedJumpCh < BASIC_LETTERS_DATA.length ? selectedJumpCh : 0;
  const activeBatchimIdx =
    selectedJumpCh >= 0 && selectedJumpCh < BATCHIM_PAGES_DATA.length ? selectedJumpCh : 0;
  const activeHangeulExamIdx = Math.max(
    0,
    HANGEUL_EXAM_OPTIONS.findIndex((o) => o.id === selectedHangeulExamSection)
  );
  const activeJollaPlayIdx = Math.max(
    0,
    JOLLA_PLAY_OPTIONS.findIndex((o) => o.id === selectedJollaPlaySection)
  );
  const activeWordsIdx = Math.max(
    0,
    WORDS_SECTION_OPTIONS.findIndex((o) => o.id === selectedWordsSection)
  );
  const activeVerbExamIdx = Math.max(
    0,
    VERB_EXAM_OPTIONS.findIndex((o) => o.id === selectedVerbExamSection)
  );
  const activeVerbPlayIdx = Math.max(
    0,
    VERB_PLAY_OPTIONS.findIndex((o) => o.id === selectedVerbPlaySection)
  );
  const activeParticleOpts =
    particleSubMode === 'sentence' ? PARTICLE_SENTENCE_OPTIONS : PARTICLE_COMBINATION_OPTIONS;
  const activeParticleIdx = Math.max(
    0,
    activeParticleOpts.findIndex((o) => o.id === selectedParticleSection)
  );
  const activeParticleExamIdx = Math.max(
    0,
    PARTICLE_EXAM_OPTIONS.findIndex((o) => o.id === selectedParticleExamSection)
  );
  const activeParticlePlayIdx = Math.max(
    0,
    PARTICLE_PLAY_OPTIONS.findIndex((o) => o.id === selectedParticlePlaySection)
  );

  const activeClassroomCh = CHAPTER_LIST.some((c) => c.ch === selectedJumpCh)
    ? selectedJumpCh
    : CHAPTER_LIST[0].ch;
  const activeClassroomIdx = Math.max(
    0,
    CHAPTER_LIST.findIndex((c) => c.ch === activeClassroomCh)
  );
  const activeClassroomExamIdx = Math.max(
    0,
    CLASSROOM_EXAM_OPTIONS.findIndex((o) => o.id === selectedClassroomExamSection)
  );
  const activeClassroomPlayIdx = Math.max(
    0,
    CLASSROOM_PLAY_OPTIONS.findIndex((o) => o.id === selectedClassroomPlaySection)
  );
  const isSingleView = effectiveViewMode === 'single';
  const currentChapterObj =
    CHAPTER_LIST.find((c) => c.ch === (sectionType === 'classroom' ? activeClassroomCh : selectedJumpCh)) ||
    CHAPTER_LIST[0];

  const getCurrentActiveSheetIdx = (): number => {
    if (studyMode === 'jamo') return activeJamoIdx;
    if (studyMode === 'basic') return activeBasicIdx;
    if (studyMode === 'batchim') return activeBatchimIdx;
    if (studyMode === 'hangeulExam') return activeHangeulExamIdx;
    if (studyMode === 'jollaPlay') return activeJollaPlayIdx;
    if (studyMode === 'words') return activeWordsIdx;
    if (studyMode === 'verbExam') return activeVerbExamIdx;
    if (studyMode === 'verbPlay') return activeVerbPlayIdx;
    if (studyMode === 'particle') return activeParticleIdx;
    if (studyMode === 'particleExam') return activeParticleExamIdx;
    if (studyMode === 'particlePlay') return activeParticlePlayIdx;
    if (studyMode === 'classroomExam') return activeClassroomExamIdx;
    if (studyMode === 'classroomPlay') return activeClassroomPlayIdx;
    return activeClassroomIdx;
  };

  const jamoGridOptions = useMemo(() => {
    const shortLabels = [
      '01 자음쓰기', '02 모음쓰기', '03 표따라', '04 표쓰기', '05 ㄱ~ㄹ',
      '06 ㅁ~ㅇ', '07 ㅈ~ㅋ', '08 ㅌ~ㅎ', '09 ㄲ~ㅉ', '10 ㅏㅑㅓㅕ',
      '11 ㅗㅛㅜㅠ', '12 ㅡㅣㅢ', '13 ㅐㅒㅔㅖ', '14 ㅘㅝㅟ', '15 ㅚㅙㅞ',
    ];
    return JAMO_SHEET_ITEMS.map((item, idx) => ({
      value: idx,
      label: item.title,
      shortLabel: shortLabels[idx] || `${String(idx + 1).padStart(2, '0')} ${item.title.slice(2, 6)}`,
      searchText: `${String(idx + 1).padStart(2, '0')} ${idx + 1} ${item.title} ${item.subtitle} ${item.previewMain}`,
    }));
  }, []);

  const basicGridOptions = useMemo(
    () =>
      BASIC_LETTERS_DATA.map((p, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        return {
          value: idx,
          label: `${p.circledNumber} ${p.vowel}와 만나요`,
          shortLabel: `${numStr} ${p.vowel} 만나요`,
          searchText: `${numStr} ${idx + 1} ${p.vowel} ${p.wordCard.word}`,
        };
      }),
    []
  );

  const batchimGridOptions = useMemo(() => {
    const shortLabels = [
      '01 ㅁ 받침', '02 ㅂ 받침', '03 ㅇ 받침', '04 ㄱ 받침', '05 ㄴ 받침',
      '06 ㄹ 받침', '07 ㄷ 받침', '08 ㅂ가족', '09 ㄱ가족', '10 ㄷ가족①',
      '11 ㄷ가족②', '12 겹ㄳㄵㄼ', '13 겹ㄽㄾㅄ', '14 겹ㄺㄻㄿ', '15 겹ㄶㅀ',
    ];
    return BATCHIM_PAGES_DATA.map((p, idx) => {
      const cleanTitle = p.title.replace('✏️ ', '');
      const numStr = String(idx + 1).padStart(2, '0');
      return {
        value: idx,
        label: cleanTitle,
        shortLabel: shortLabels[idx] || `${numStr} 받침`,
        searchText: `${numStr} ${idx + 1} ${cleanTitle}`,
      };
    });
  }, []);

  const hangeulExamGridOptions = useMemo(
    () =>
      HANGEUL_EXAM_OPTIONS.map((opt, idx) => ({
        value: opt.id,
        label: opt.label,
        shortLabel: `${String(idx + 1).padStart(2, '0')} ${idx + 1}강`,
        searchText: `${idx + 1}강 ${opt.label}`,
      })),
    []
  );

  const jollaPlayGridOptions = useMemo(() => {
    const shortLabels = [
      '01 땅차지', '02 자음빙고', '03 모음빙고', '04 도장판', '05 글자공장',
      '06 상장쿠폰', '07 숨은졸라', '08 땅따먹기', '09 낱말미로', '10 3×3빙고',
    ];
    return JOLLA_PLAY_OPTIONS.map((opt, idx) => ({
      value: opt.id,
      label: opt.label,
      shortLabel: shortLabels[idx] || `${String(idx + 1).padStart(2, '0')} 놀이`,
      searchText: `${idx + 1} ${opt.label}`,
    }));
  }, []);

  const wordsGridOptions = useMemo(() => {
    const customShort: Record<number, string> = {
      0: '01 현재아요',
      1: '02 현재어요',
      2: '03 현재해요',
      3: '04 현재아★',
      4: '05 현재어★',
      5: '06 과거았',
      6: '07 과거었',
      7: '08 과거했',
      8: '09 과거았★',
      9: '10 과거었★',
    };
    return WORDS_SECTION_OPTIONS.map((opt, idx) => {
      const numStr = String(idx + 1).padStart(2, '0');
      const baseKo = opt.label.replace(/^[^\s]+\s*/, '').split(' (')[0].trim();
      return {
        value: opt.id,
        label: opt.label,
        shortLabel: customShort[idx] || `${numStr} ${baseKo}`,
        searchText: `${numStr} ${idx + 1} ${opt.label}`,
      };
    });
  }, []);

  const verbExamGridOptions = useMemo(
    () =>
      VERB_EXAM_OPTIONS.map((opt, idx) => ({
        value: opt.id,
        label: opt.label,
        shortLabel: `${idx + 1}강 (${idx * 5 + 1}~${idx * 5 + 5})`,
        searchText: `${idx + 1}강 ${opt.label}`,
      })),
    []
  );

  const verbPlayGridOptions = useMemo(
    () =>
      VERB_PLAY_OPTIONS.map((opt, idx) => ({
        value: opt.id,
        label: opt.label,
        shortLabel: `${String(idx + 1).padStart(2, '0')} ${opt.label.replace(/^[^·]*·\s*/, '').slice(0, 6)}`,
        searchText: `${idx + 1} ${opt.label}`,
      })),
    []
  );

  const particleComboGridOptions = useMemo(
    () =>
      PARTICLE_COMBINATION_UNITS.map((u, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        const shortKo = u.title.split(' (')[0].replace('문장 만들기 ', '문장').trim();
        return {
          value: `particle_${u.id}`,
          label: `${u.circled} ${u.title}`,
          shortLabel: `${numStr} ${shortKo}`,
          searchText: `${numStr} ${idx + 1} ${u.title} ${u.grammar} ${u.keywords.join(' ')}`,
        };
      }),
    []
  );

  const particleSentenceGridOptions = useMemo(
    () =>
      PARTICLE_SENTENCE_UNITS.map((u, idx) => {
        const numStr = String(idx + 1).padStart(2, '0');
        const shortKo = u.title.split(' (')[0].replace('문장 만들기 ', '문장').trim();
        return {
          value: `particle_${u.id}`,
          label: `${u.circled} ${u.title}`,
          shortLabel: `${numStr} ${shortKo}`,
          searchText: `${numStr} ${idx + 1} ${u.title} ${u.grammar} ${u.keywords.join(' ')}`,
        };
      }),
    []
  );

  const particleExamGridOptions = useMemo(
    () =>
      PARTICLE_EXAM_OPTIONS.map((opt, idx) => ({
        value: opt.id,
        label: opt.label,
        shortLabel: `${idx + 1}강`,
        searchText: `${idx + 1}강 ${opt.label}`,
      })),
    []
  );

  const particlePlayGridOptions = useMemo(
    () =>
      PARTICLE_PLAY_OPTIONS.map((opt, idx) => ({
        value: opt.id,
        label: opt.label,
        shortLabel: `${String(idx + 1).padStart(2, '0')} ${opt.label.replace(/^[^·]*·\s*/, '').slice(0, 6)}`,
        searchText: `${idx + 1} ${opt.label}`,
      })),
    []
  );

  const classroomChapterOptions = useMemo(
    () =>
      CHAPTER_LIST.map((ch) => {
        const themeData = CHAPTER_THEME_TRANSLATIONS[ch.ch];
        const shortKo = themeData?.ko || ch.theme.split(' (')[0];
        const numStr = String(ch.ch).padStart(2, '0');
        const fullTitle = getChapterCircledTitle(ch.ch, lang);
        return {
          value: ch.ch,
          label: fullTitle,
          shortLabel: `${numStr} ${shortKo}`,
          searchText: `${numStr} ${ch.ch} ${shortKo} ${ch.theme} ${fullTitle}`,
        };
      }),
    [lang]
  );

  const classroomExamOptions = useMemo(
    () =>
      CLASSROOM_EXAM_OPTIONS.map((opt, idx) => ({
        value: opt.id,
        label: opt.label,
        shortLabel: `${idx + 1}강 (${idx * 5 + 1}~${idx * 5 + 5}과)`,
        searchText: `${idx + 1}강 ${opt.label}`,
      })),
    []
  );

  const classroomPlayOptions = useMemo(
    () =>
      CLASSROOM_PLAY_OPTIONS.map((opt, idx) => ({
        value: opt.id,
        label: opt.label,
        shortLabel: `${String(idx + 1).padStart(2, '0')} ${opt.label.replace(/^[^·]*·\s*/, '').slice(0, 6)}`,
        searchText: `${idx + 1} ${opt.label}`,
      })),
    []
  );

  // Reset jump index when switching mode
  useEffect(() => {
    if (skipNextModeResetRef.current) {
      skipNextModeResetRef.current = false;
      return;
    }
    if (propSelectedChapter !== undefined && (studyMode === 'cards' || studyMode === 'writing' || studyMode === 'quiz')) {
      setSelectedJumpCh(propSelectedChapter);
    } else {
      setSelectedJumpCh(0);
    }
  }, [studyMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToSheet = (idx: number) => {
    playCutePop();
    setSelectedJumpCh(idx);

    if (studyMode === 'jamo') {
      const opt = [...JAMO_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= idx);
      if (opt) setSelectedJamoSection(opt.id);
    } else if (studyMode === 'basic') {
      const opt = [...BASIC_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= idx);
      if (opt) setSelectedBasicSection(opt.id);
    } else if (studyMode === 'batchim') {
      const opt = [...BATCHIM_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= idx);
      if (opt) setSelectedBatchimSection(opt.id);
    } else if (studyMode === 'hangeulExam') {
      setExamPartFilter('all');
      const opt = HANGEUL_EXAM_OPTIONS[idx];
      if (opt) setSelectedHangeulExamSection(opt.id);
    } else if (studyMode === 'jollaPlay') {
      const opt = JOLLA_PLAY_OPTIONS[idx];
      if (opt) setSelectedJollaPlaySection(opt.id);
    } else if (studyMode === 'words') {
      const opt = WORDS_SECTION_OPTIONS[idx];
      if (opt) setSelectedWordsSection(opt.id);
    } else if (studyMode === 'verbExam') {
      const opt = VERB_EXAM_OPTIONS[idx];
      if (opt) setSelectedVerbExamSection(opt.id);
    } else if (studyMode === 'verbPlay') {
      const opt = VERB_PLAY_OPTIONS[idx];
      if (opt) setSelectedVerbPlaySection(opt.id);
    } else if (studyMode === 'particleExam') {
      const opt = PARTICLE_EXAM_OPTIONS[idx];
      if (opt) setSelectedParticleExamSection(opt.id);
    } else if (studyMode === 'particlePlay') {
      const opt = PARTICLE_PLAY_OPTIONS[idx];
      if (opt) setSelectedParticlePlaySection(opt.id);
    } else if (studyMode === 'classroomExam') {
      const opt = CLASSROOM_EXAM_OPTIONS[idx];
      if (opt) setSelectedClassroomExamSection(opt.id);
    } else if (studyMode === 'classroomPlay') {
      const opt = CLASSROOM_PLAY_OPTIONS[idx];
      if (opt) setSelectedClassroomPlaySection(opt.id);
    } else if (studyMode === 'particle') {
      const targetOpts =
        particleSubMode === 'sentence' ? PARTICLE_SENTENCE_OPTIONS : PARTICLE_COMBINATION_OPTIONS;
      const opt = targetOpts[idx];
      if (opt) setSelectedParticleSection(opt.id);
    } else if (sectionType === 'classroom' && (studyMode === 'cards' || studyMode === 'writing' || studyMode === 'quiz')) {
      isInternalJumpRef.current = true;
      onSelectChapter?.(idx);
    }

    const targetId =
      studyMode === 'jamo'
        ? `study-jamo-sheet-${idx}`
        : studyMode === 'basic'
        ? `study-basic-sheet-${idx}`
        : studyMode === 'batchim'
        ? `study-batchim-sheet-${idx}`
        : studyMode === 'hangeulExam'
        ? `study-exam-sheet-${idx}`
        : studyMode === 'jollaPlay'
        ? `study-jolla-sheet-${idx}`
        : studyMode === 'words'
        ? `study-words-sheet-${idx}`
        : studyMode === 'verbExam'
        ? `study-verb-exam-sheet-${idx}`
        : studyMode === 'verbPlay'
        ? `study-verb-play-sheet-${idx}`
        : studyMode === 'particleExam'
        ? `study-particle-exam-sheet-${idx}`
        : studyMode === 'particlePlay'
        ? `study-particle-play-sheet-${idx}`
        : studyMode === 'classroomExam'
        ? `study-classroom-exam-sheet-${idx}`
        : studyMode === 'classroomPlay'
        ? `study-classroom-play-sheet-${idx}`
        : studyMode === 'particle'
        ? `study-particle-sheet-${idx}`
        : `study-sheet-ch-${idx}`;
    if (isSingleView) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 30);
  };

  // 인쇄 직전 웹폰트 + 모든 마운트된 이미지(SVG data URI 등) 디코딩 완료 보장 후 인쇄 창 실행
  const triggerPrintWithDecodedImages = (onAfterPrint?: () => void) => {
    let cleaned = false;
    const cleanup = () => {
      if (cleaned) return;
      cleaned = true;
      window.removeEventListener('afterprint', cleanup);
      onAfterPrint?.();
    };
    if (onAfterPrint) {
      window.addEventListener('afterprint', cleanup, { once: true });
    }
    void waitForPrintReadiness(document, 1000).then(() => {
      window.print();
      if (onAfterPrint) {
        window.setTimeout(cleanup, 1200);
      }
    });
  };

  // [단원별 3종세트 인쇄]: 현재 선택된 단원의 [그림카드 + 쓰기학습지 + 테스트지] 3장 연속 인쇄
  const handlePrintTripleSet = () => {
    playCutePop();
    setActivePrintRange(null);
    setExtraPrintTarget(null);
    setSingleSheetPrintKey(null);
    setIsPrintingTripleSet(true);
    setTimeout(() => {
      triggerPrintWithDecodedImages(() => setIsPrintingTripleSet(false));
    }, 120);
  };

  // [1장 / 10장 묶음 범위 인쇄] — 선택한 범위의 시트만 마운트하여 초고속·고선명 출력
  const handlePrintRange = (startIdx: number, endIdx: number) => {
    playCutePop();
    setIsPrintingTripleSet(false);
    setExtraPrintTarget(null);
    setSingleSheetPrintKey(null);
    setActivePrintRange({ startIdx, endIdx });
    setTimeout(() => {
      triggerPrintWithDecodedImages(() => setActivePrintRange(null));
    }, 120);
  };

  // [현재 페이지 1장 즉시 인쇄]
  const handlePrintCurrentPage = () => {
    const idx = getCurrentActiveSheetIdx();
    handlePrintRange(idx, idx);
  };

  // 챕터 하단 [표지 · 차례] 선택 인쇄
  const handlePrintChapterExtras = (target: 'all-extras' | 'cover' | 'toc') => {
    playCutePop();
    setIsPrintingTripleSet(false);
    setActivePrintRange(null);
    setSingleSheetPrintKey(null);
    setExtraPrintTarget(target);
    setTimeout(() => {
      triggerPrintWithDecodedImages(() => setExtraPrintTarget(null));
    }, 140);
  };

  // 개별 시험지 / 졸라 놀이 학습지 1장만 A4 가로 인쇄
  const handlePrintSingleSheet = (sheetKey: string) => {
    playCutePop();
    setIsPrintingTripleSet(false);
    setActivePrintRange(null);
    setExtraPrintTarget(null);
    setSingleSheetPrintKey(sheetKey);
    setTimeout(() => {
      triggerPrintWithDecodedImages(() => setSingleSheetPrintKey(null));
    }, 140);
  };

  const scrollToChapterExtras = () => {
    playCutePop();
    if (isSingleView) {
      setEffectiveViewMode('continuous');
      setTimeout(() => {
        const el = document.getElementById('chapter-bottom-extras');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 110);
      return;
    }
    const el = document.getElementById('chapter-bottom-extras');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger 1-page print from legacy headerPrintTrigger prop
  useEffect(() => {
    if (
      headerPrintTrigger !== undefined &&
      headerPrintTrigger > 0 &&
      headerPrintTrigger !== prevHeaderPrintTriggerRef.current
    ) {
      prevHeaderPrintTriggerRef.current = headerPrintTrigger;
      handlePrintCurrentPage();
    }
  }, [headerPrintTrigger]);

  // Trigger scoped print from Header [인쇄] Popover Menu (1장 / 10장 묶음 / 3종세트)
  useEffect(() => {
    if (!webPrintRequest || webPrintRequest.id === prevWebPrintRequestIdRef.current) return;
    prevWebPrintRequestIdRef.current = webPrintRequest.id;

    if (webPrintRequest.type === 'triple') {
      handlePrintTripleSet();
      return;
    }
    if (
      webPrintRequest.type === 'range' &&
      typeof webPrintRequest.startIdx === 'number' &&
      typeof webPrintRequest.endIdx === 'number'
    ) {
      handlePrintRange(webPrintRequest.startIdx, webPrintRequest.endIdx);
      return;
    }
    handlePrintCurrentPage();
  }, [webPrintRequest]);

  // Trigger jump to Cover/TOC from Row 3 [표지·차례] button
  useEffect(() => {
    if (
      coverTocTrigger !== undefined &&
      coverTocTrigger > 0 &&
      coverTocTrigger !== prevCoverTocTriggerRef.current
    ) {
      prevCoverTocTriggerRef.current = coverTocTrigger;
      scrollToChapterExtras();
    }
  }, [coverTocTrigger]);

  const scrollToTop = () => {
    playCutePop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuExtras = MENU_EXTRAS_UI[uiLang || 'ko'] || MENU_EXTRAS_UI.ko;

  const overviewConfig = useMemo<{
    title: string;
    subtitle: string;
    accentTheme: OverviewThemeColor;
    items: OverviewCardItem[];
  }>(() => {
    if (studyMode === 'jamo') {
      return {
        title: menuExtras.overview.worksheetTitles.jamo,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: JAMO_SHEET_ITEMS.map((item, idx) => ({
          id: `jamo-${item.id}`,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${JAMO_SHEET_ITEMS.length}`,
          title: item.title,
          subtitle: item.subtitle,
          previewMain: item.previewMain,
          previewChips: item.previewChips,
          themeColor: 'amber',
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'basic') {
      return {
        title: menuExtras.overview.worksheetTitles.basic,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: BASIC_LETTERS_DATA.map((pageData, idx) => ({
          id: `basic-${pageData.pageNumber}`,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${BASIC_LETTERS_DATA.length}`,
          title: `${pageData.circledNumber} ${pageData.vowel}와 만나요`,
          subtitle: pageData.wordCard?.word ? `대표 낱말: ${pageData.wordCard.word}` : undefined,
          previewMain: pageData.vowel,
          previewSecondary: pageData.wordCard?.word,
          previewChips: pageData.cards.map(c => c.syllable),
          themeColor: 'amber',
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'batchim') {
      const totalBatchimSheets = BATCHIM_PAGES_DATA.length;
      return {
        title: menuExtras.overview.worksheetTitles.batchim,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: BATCHIM_PAGES_DATA.map((pageData, idx) => ({
          id: `batchim-${pageData.pageNumber}`,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${totalBatchimSheets}`,
          title: pageData.title.replace('✏️ ', ''),
          subtitle: pageData.subTitle,
          previewMain: pageData.cards[0]?.syllable || pageData.circledNumber,
          previewSecondary: pageData.wordCard?.wordLabel || pageData.wordCard?.audioWord,
          previewChips: pageData.cards.slice(0, 3).map(c => c.syllable),
          themeColor: 'amber' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'hangeulExam') {
      return {
        title: '한글 ( / ) 고르기 쪽지시험 (4파트 × 5강 = 20강)',
        subtitle: '자음모음 · 기본글자 · 받침1(대표·가족) · 받침2(겹받침)',
        accentTheme: 'amber',
        items: HANGEUL_EXAM_LESSONS.map((lesson, idx) => ({
          id: lesson.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${HANGEUL_EXAM_LESSONS.length}`,
          title: lesson.title,
          subtitle: lesson.subtitle,
          previewMain: lesson.previewMain,
          previewChips: lesson.previewChips,
          themeColor: ((lesson.partId as string) === 'batchim1'
            ? 'sky'
            : (lesson.partId as string) === 'batchim2'
            ? 'purple'
            : 'amber') as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'jollaPlay') {
      return {
        title: '졸라한글맨 놀이 · 동기부여 학습지 (10종)',
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: JOLLA_PLAY_ITEMS.map((item, idx) => ({
          id: `jolla-${item.id}`,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${JOLLA_PLAY_ITEMS.length}`,
          title: item.title,
          subtitle: item.subtitle,
          previewMain: item.previewMain,
          previewChips: item.previewChips,
          themeColor: 'amber' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'particleExam') {
      return {
        title: '조사 ( / ) 고르기 종합 시험 (5단원씩 총 6강)',
        subtitle: '1~5단원부터 26~30단원까지 5개 단원씩 섞어 출제한 종합 시험',
        accentTheme: 'emerald',
        items: PARTICLE_EXAM_LESSONS.map((lesson, idx) => ({
          id: lesson.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${PARTICLE_EXAM_LESSONS.length}`,
          title: lesson.dropdownLabel,
          subtitle: lesson.subtitle,
          previewMain: lesson.previewMain,
          previewChips: lesson.previewChips,
          themeColor: 'emerald' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'particlePlay') {
      return {
        title: '조사 놀이 학습지 초안 5종 (1강 · 1~5단원)',
        subtitle: '받침 바위 들기·놀이터 시소·문장 로켓·외계인 UFO·방귀 풍선 피하기',
        accentTheme: 'emerald',
        items: PARTICLE_PLAY_SHEETS_META.map((sheet, idx) => ({
          id: sheet.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${PARTICLE_PLAY_SHEETS_META.length}`,
          title: `${sheet.circledNo} ${sheet.title}`,
          subtitle: sheet.subtitle,
          previewMain: sheet.previewMain,
          previewChips: sheet.previewChips,
          themeColor: 'emerald' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'classroomExam') {
      return {
        title: '교실 한국어 ( / ) 고르기 종합 시험 (5단원씩 총 6강)',
        subtitle: '1~5단원부터 26~30단원까지 5개 단원씩 섞어 출제한 종합 시험',
        accentTheme: 'rose',
        items: CLASSROOM_EXAM_LESSONS.map((lesson, idx) => ({
          id: lesson.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${CLASSROOM_EXAM_LESSONS.length}`,
          title: lesson.dropdownLabel,
          subtitle: lesson.subtitle,
          previewMain: lesson.previewMain,
          previewChips: lesson.previewChips,
          themeColor: 'rose' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'classroomPlay') {
      return {
        title: '교실 한국어 놀이 학습지 초안 5종 (1강 · 1~5과)',
        subtitle: '대빵 큰 빙고·학교 대탈출 15칸·화장실 급해 미로·교실 숨은그림·짝꿍 카드',
        accentTheme: 'rose',
        items: CLASSROOM_PLAY_SHEETS_META.map((sheet, idx) => ({
          id: sheet.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${CLASSROOM_PLAY_SHEETS_META.length}`,
          title: `${sheet.circledNo} ${sheet.title}`,
          subtitle: sheet.subtitle,
          previewMain: sheet.previewMain,
          previewChips: sheet.previewChips,
          themeColor: 'rose' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'words') {
      const totalVerbSheets = VERB_UNIT_META.length;
      return {
        title: menuExtras.overview.worksheetTitles.verb,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'purple',
        items: VERB_UNIT_META.map((u, idx) => ({
          id: u.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${totalVerbSheets}`,
          title: `${u.circled} ${u.grammar}`,
          subtitle: u.verbs.join(', '),
          previewMain: u.verbs[0] || u.grammar,
          previewSecondary: u.grammar,
          previewChips: u.verbs.slice(0, 3),
          themeColor: 'purple' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'verbExam') {
      return {
        title: '용언 ( / ) 고르기 종합 시험 (5단원씩 총 6강)',
        subtitle: '1~5단원부터 26~30단원까지 5개 단원씩 섞어 출제한 종합 시험',
        accentTheme: 'purple',
        items: VERB_EXAM_LESSONS.map((lesson, idx) => ({
          id: lesson.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${VERB_EXAM_LESSONS.length}`,
          title: lesson.dropdownLabel,
          subtitle: lesson.subtitle,
          previewMain: lesson.previewMain,
          previewChips: lesson.previewChips,
          themeColor: 'purple' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'verbPlay') {
      return {
        title: '용언 놀이 학습지 초안 5종 (1강 · 1~5단원)',
        subtitle: '왕만두 찜통 요리·3색 풍선 색칠·동작 무대·변신 징검다리·문장 낚시터',
        accentTheme: 'purple',
        items: VERB_PLAY_SHEETS_META.map((sheet, idx) => ({
          id: sheet.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${VERB_PLAY_SHEETS_META.length}`,
          title: `${sheet.circledNo} ${sheet.title}`,
          subtitle: sheet.subtitle,
          previewMain: sheet.previewMain,
          previewChips: sheet.previewChips,
          themeColor: 'purple' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'particle') {
      const isSentence = particleSubMode === 'sentence';
      const targetUnits = isSentence ? PARTICLE_SENTENCE_UNITS : PARTICLE_COMBINATION_UNITS;
      const totalParticleSheets = targetUnits.length;
      const baseItems: OverviewCardItem[] = targetUnits.map((u, idx) => ({
        id: u.id,
        targetIdx: idx,
        pageLabel: `${idx + 1} / ${totalParticleSheets}`,
        title: `${u.circled} ${u.title}`,
        subtitle: u.keywords.join(', '),
        previewMain: u.keywords[0] || u.grammar,
        previewSecondary: u.grammar,
        previewChips: u.keywords.slice(0, 3),
        themeColor: 'emerald',
        isActive: selectedJumpCh === idx,
      }));
      return {
        title: isSentence
          ? menuExtras.overview.worksheetTitles.particleSentence
          : menuExtras.overview.worksheetTitles.particle,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'emerald',
        items: baseItems,
      };
    }

    const modeTitle =
      studyMode === 'cards'
        ? menuExtras.overview.worksheetTitles.classroomCards
        : studyMode === 'writing'
        ? menuExtras.overview.worksheetTitles.classroomWriting
        : menuExtras.overview.worksheetTitles.classroomQuiz;
    const modeTheme: OverviewThemeColor = studyMode === 'cards' ? 'rose' : studyMode === 'writing' ? 'purple' : 'sky';
    return {
      title: modeTitle,
      subtitle: menuExtras.overview.defaultSubtitle,
      accentTheme: modeTheme,
      items: CHAPTER_LIST.map((chObj, idx) => {
        const chWords = vocabulary.filter(v => v.ch === chObj.ch);
        return {
          id: `ch-${chObj.ch}`,
          targetIdx: chObj.ch,
          pageLabel: `${idx + 1} / ${CHAPTER_LIST.length}`,
          title: getChapterCircledTitle(chObj.ch, lang),
          subtitle: `${chWords.length}단어`,
          previewMain: chWords[0]?.ko || chObj.icon,
          previewSecondary: chWords[1]?.ko,
          previewChips: chWords.slice(0, 3).map(w => w.ko),
          themeColor: modeTheme,
          isActive: selectedJumpCh === chObj.ch,
        };
      }),
    };
  }, [studyMode, particleSubMode, selectedJumpCh, vocabulary, lang, menuExtras]);

  const tabUi = SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko;

  const isExamOrPlayMode =
    studyMode === 'hangeulExam' ||
    studyMode === 'jollaPlay' ||
    studyMode === 'verbExam' ||
    studyMode === 'verbPlay' ||
    studyMode === 'particleExam' ||
    studyMode === 'particlePlay' ||
    studyMode === 'classroomExam' ||
    studyMode === 'classroomPlay';

  // PC Row 3 Center Unit Select Dropdown (Twin Purple Spec matching 해볼 수학)
  const desktopCenterUnitControl = (
    <>
      {sectionType === 'hangeul' && studyMode === 'jamo' && (
        <CompactUnitSelectButton
          value={activeJamoIdx}
          onChange={(val) => handleJumpToSheet(Number(val))}
          options={JAMO_SHEET_ITEMS.map((item, idx) => ({
            value: idx,
            label: item.title,
          }))}
          theme="purple"
          variant="twin"
          title="자음모음 페이지 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'hangeul' && studyMode === 'basic' && (
        <CompactUnitSelectButton
          value={activeBasicIdx}
          onChange={(val) => handleJumpToSheet(Number(val))}
          options={BASIC_LETTERS_DATA.map((p, idx) => ({
            value: idx,
            label: `${p.circledNumber} ${p.vowel}와 만나요`,
          }))}
          theme="purple"
          variant="twin"
          title="기본글자 페이지 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'hangeul' && studyMode === 'batchim' && (
        <CompactUnitSelectButton
          value={activeBatchimIdx}
          onChange={(val) => handleJumpToSheet(Number(val))}
          options={BATCHIM_PAGES_DATA.map((p, idx) => ({
            value: idx,
            label: p.title.replace('✏️ ', ''),
          }))}
          theme="purple"
          variant="twin"
          title="받침글자 페이지 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'hangeul' && studyMode === 'hangeulExam' && (
        <CompactUnitSelectButton
          value={selectedHangeulExamSection}
          onChange={(val) => {
            setSelectedHangeulExamSection(String(val));
            const opt = HANGEUL_EXAM_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={HANGEUL_EXAM_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          variant="twin"
          title="한글 시험 20강 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'hangeul' && studyMode === 'jollaPlay' && (
        <CompactUnitSelectButton
          value={selectedJollaPlaySection}
          onChange={(val) => {
            setSelectedJollaPlaySection(String(val));
            const opt = JOLLA_PLAY_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={JOLLA_PLAY_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          variant="twin"
          title="졸라 놀이 학습지 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'particle' && studyMode === 'particle' && (() => {
        const targetOpts =
          particleSubMode === 'sentence'
            ? PARTICLE_SENTENCE_OPTIONS
            : PARTICLE_COMBINATION_OPTIONS;
        return (
          <CompactUnitSelectButton
            value={selectedParticleSection}
            onChange={(val) => {
              setSelectedParticleSection(String(val));
              const opt = targetOpts.find((o) => o.id === val);
              if (opt) handleJumpToSheet(opt.targetSheet);
            }}
            options={targetOpts.map((opt) => ({ value: opt.id, label: opt.label }))}
            theme="purple"
            variant="twin"
            title={particleSubMode === 'sentence' ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
            align="left"
            className="w-full"
          />
        );
      })()}
      {sectionType === 'verb' && studyMode === 'words' && (
        <CompactUnitSelectButton
          value={selectedWordsSection}
          onChange={(val) => {
            setSelectedWordsSection(String(val));
            const opt = WORDS_SECTION_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={WORDS_SECTION_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          variant="twin"
          title="용언 활용 단원 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'verb' && studyMode === 'verbExam' && (
        <CompactUnitSelectButton
          value={selectedVerbExamSection}
          onChange={(val) => {
            setSelectedVerbExamSection(String(val));
            const opt = VERB_EXAM_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={VERB_EXAM_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          variant="twin"
          title="용언 종합 시험 6강 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'verb' && studyMode === 'verbPlay' && (
        <CompactUnitSelectButton
          value={selectedVerbPlaySection}
          onChange={(val) => {
            setSelectedVerbPlaySection(String(val));
            const opt = VERB_PLAY_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={VERB_PLAY_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          variant="twin"
          title="용언 놀이 초안 5종 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'particle' && studyMode === 'particleExam' && (
        <CompactUnitSelectButton
          value={selectedParticleExamSection}
          onChange={(val) => {
            setSelectedParticleExamSection(String(val));
            const opt = PARTICLE_EXAM_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={PARTICLE_EXAM_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          variant="twin"
          title="조사 종합 시험 6강 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'particle' && studyMode === 'particlePlay' && (
        <CompactUnitSelectButton
          value={selectedParticlePlaySection}
          onChange={(val) => {
            setSelectedParticlePlaySection(String(val));
            const opt = PARTICLE_PLAY_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={PARTICLE_PLAY_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          variant="twin"
          title="조사 놀이 초안 5종 선택"
          align="left"
          className="w-full"
        />
      )}
      {sectionType === 'classroom' && studyMode !== 'classroomExam' && studyMode !== 'classroomPlay' && (
        <CompactUnitSelectButton
          value={activeClassroomCh}
          onChange={(val) => handleJumpToSheet(Number(val))}
          options={classroomChapterOptions}
          theme="purple"
          variant="twin"
          title="교실 한국어 단원 선택"
          align="left"
          popoverLayout="grid"
          searchPlaceholder="단원 검색..."
          className="w-full"
        />
      )}
      {sectionType === 'classroom' && studyMode === 'classroomExam' && (
        <CompactUnitSelectButton
          value={selectedClassroomExamSection}
          onChange={(val) => {
            setSelectedClassroomExamSection(String(val));
            const opt = CLASSROOM_EXAM_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={classroomExamOptions}
          theme="purple"
          variant="twin"
          title="교실 한국어 종합 시험 6강 선택"
          align="left"
          popoverLayout="grid"
          searchPlaceholder="시험 검색..."
          className="w-full"
        />
      )}
      {sectionType === 'classroom' && studyMode === 'classroomPlay' && (
        <CompactUnitSelectButton
          value={selectedClassroomPlaySection}
          onChange={(val) => {
            setSelectedClassroomPlaySection(String(val));
            const opt = CLASSROOM_PLAY_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={classroomPlayOptions}
          theme="purple"
          variant="twin"
          title="교실 한국어 놀이 초안 5종 선택"
          align="left"
          popoverLayout="grid"
          searchPlaceholder="놀이 검색..."
          className="w-full"
        />
      )}
    </>
  );

  // Conditional button right of center dropdown: ONLY on [교실한국어]-[학습지]
  const desktopExtraAfterCenter =
    sectionType === 'classroom' ? (
      <div className="relative z-30 shrink-0">
        <button
          type="button"
          onClick={() => {
            playCutePop();
            setIsCustomLangOpen((prev) => !prev);
          }}
          className="h-[40px] px-2.5 rounded-lg bg-[#441A75] hover:bg-[#52208E] text-white flex items-center gap-1.5 transition-all cursor-pointer border border-[#6328A6] shadow-2xs"
          title={tabUi.studyControls.pickLangsTitle}
          aria-expanded={isCustomLangOpen}
        >
          <span className="text-xs leading-none shrink-0" role="img" aria-label="Globe">🌐</span>
          <span className="hidden xl:inline text-[12px] font-extrabold text-white whitespace-nowrap">
            {tabUi.studyControls.pickLangs}
          </span>
          <span className="bg-[#FEF08A] text-[#1E0B36] font-extrabold text-[10.5px] px-1.5 py-0.5 rounded whitespace-nowrap leading-none">
            [{customSelectedLangs.length}/3]
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform shrink-0 ${isCustomLangOpen ? 'rotate-180' : ''}`} />
        </button>

        {isCustomLangOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[0.5px]"
              onClick={() => setIsCustomLangOpen(false)}
            />
            <div className="absolute right-0 mt-1.5 w-[320px] bg-white rounded-xl shadow-2xl border-2 border-[#441A75]/30 p-3 z-50 font-korean-gothic text-xs text-slate-800 animate-in fade-in slide-in-from-top-1">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
                <span className="font-black text-purple-950 text-xs">
                  {tabUi.studyControls.pickModalHeader}
                </span>
                <span className="text-[11px] font-extrabold text-[#1E0B36] bg-[#FEF08A] px-2 py-0.5 rounded-sm shadow-2xs">
                  [{customSelectedLangs.length}/3] {tabUi.studyControls.selectedSuffix}
                </span>
              </div>
              <div className="space-y-1">
                {SUPPORTED_LANGUAGES.map((langMeta) => {
                  const isChecked = customSelectedLangs.includes(langMeta.code);
                  const orderIdx = customSelectedLangs.indexOf(langMeta.code);
                  const prioritySfx = tabUi.studyControls.prioritySuffix;
                  return (
                    <button
                      key={langMeta.code}
                      type="button"
                      onClick={() => handleToggleCustomLang(langMeta.code)}
                      className={`w-full px-2.5 py-2 rounded-md flex items-center justify-between transition-colors text-left cursor-pointer border ${
                        isChecked
                          ? 'bg-purple-100/80 text-purple-950 font-black border-purple-300 shadow-2xs'
                          : 'bg-white hover:bg-purple-50/80 text-slate-800 font-bold border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base leading-none">{langMeta.flag}</span>
                        <span className="font-bold">{langMeta.fullName}</span>
                        {isChecked && (
                          <span className="text-[10px] font-extrabold text-purple-700 bg-purple-200/80 px-1.5 py-0.2 rounded-sm">
                            #{orderIdx + 1}{prioritySfx ? ` (${orderIdx + 1}${prioritySfx})` : ''}
                          </span>
                        )}
                      </div>
                      <div
                        className={`w-4 h-4 rounded-sm flex items-center justify-center border text-[11px] font-bold ${
                          isChecked
                            ? 'bg-purple-700 border-purple-700 text-white'
                            : 'border-slate-400 bg-white text-transparent'
                        }`}
                      >
                        ✓
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    ) : undefined;

  return (
    <div
      className={`study-section flex flex-col items-center w-full ${
        extraPrintTarget || singleSheetPrintKey !== null ? 'printing-chapter-extras' : ''
      }`}
    >
      {/* Print CSS Rules for Continuous Study View & Single Page Printing */}
      <style>{`
        @font-face {
          font-family: 'Hakgyoansim Bareondotum';
          src: local('Hakgyoansim Bareondotum Regular'),
               local('Hakgyoansim Bareondotum'),
               local('학교안심 바른돋움 R'),
               local('학교안심 바른돋움'),
               url('/fonts/HakgyoansimBareondotum-Regular.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Hakgyoansim Bareondotum';
          src: local('Hakgyoansim Bareondotum Bold'),
               local('학교안심 바른돋움 B'),
               url('/fonts/HakgyoansimBareondotum-Bold.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교안심 바른돋움';
          src: local('Hakgyoansim Bareondotum Regular'),
               local('Hakgyoansim Bareondotum'),
               local('학교안심 바른돋움 R'),
               local('학교안심 바른돋움'),
               url('/fonts/HakgyoansimBareondotum-Regular.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Hakgyoansim Badasseugi';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Hakgyoansim Badasseugi';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교안심 받아쓰기';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교안심 받아쓰기';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교알림받아쓰기';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교알림받아쓰기';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        .font-school-base,
        .font-korean-gothic {
          font-family: 'Hakgyoansim Bareondotum', '학교안심 바른돋움', 'NanumBarunGothic', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans', 'Meiryo', 'Noto Sans KR', sans-serif !important;
        }
        .font-school-hand,
        .font-badasseugi,
        .font-kyobo {
          font-family: 'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important;
          letter-spacing: -0.01em;
        }
        @media screen {
          .classroom-single-hidden {
            display: none !important;
          }
        }
        @media screen and (min-width: 1024px) {
          .pc-single-sheet-hidden {
            display: none !important;
          }
        }

        @media print {
          @page {
            size: A4 landscape;
            margin: 4mm 6mm;
          }
          html, body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            overflow: visible !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          /* Hide app shell and navigation during print */
          header, nav, footer, button, aside, .no-print, .study-section > .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .study-section {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .study-worksheets-container {
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .study-worksheets-container img,
          .study-worksheets-container svg {
            filter: none !important;
            -webkit-filter: none !important;
          }
          .study-worksheets-container .print-sheet,
          .study-worksheets-container .printable-a4-page,
          .study-worksheets-container .verb-worksheet-page {
            box-shadow: none !important;
            font-synthesis: none !important;
            text-rendering: geometricPrecision;
          }
          .study-sheet-wrapper {
            margin: 0 !important;
            padding: 0 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
            overflow: visible !important;
          }
          .mobile-scaled-outer {
            height: auto !important;
            width: 100% !important;
            overflow: visible !important;
            position: static !important;
            display: block !important;
          }
          .mobile-scaled-inner {
            position: static !important;
            width: 100% !important;
            transform: none !important;
          }

          /* [학습지 - 자음모음 전체인쇄 & 1장인쇄] 7, 8, 12, 14, 15쪽 (3열 학습지) */
          #study-jamo-sheet-6,
          #study-jamo-sheet-7,
          #study-jamo-sheet-11,
          #study-jamo-sheet-13 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          #study-jamo-sheet-14 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          #study-jamo-sheet-15 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            display: block !important;
          }
          #study-jamo-sheet-16,
          #study-batchim-sheet-15 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            display: block !important;
          }
          #study-jamo-sheet-15 .consonants-summary-sheet,
          #study-jamo-sheet-16 .vowels-summary-sheet,
          #study-batchim-sheet-15 .batchim-summary-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          #study-jamo-sheet-15 .consonants-summary-sheet,
          #study-jamo-sheet-15 .consonants-summary-sheet *,
          #study-jamo-sheet-16 .vowels-summary-sheet,
          #study-jamo-sheet-16 .vowels-summary-sheet *,
          #study-batchim-sheet-15 .batchim-summary-sheet,
          #study-batchim-sheet-15 .batchim-summary-sheet * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #study-jamo-sheet-15 .summary-basic-grid {
            display: grid !important;
            grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-15 .summary-bottom-split {
            display: grid !important;
            grid-template-columns: 57fr 43fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-15 .summary-double-grid {
            display: grid !important;
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-16 .summary-vowel-basic-grid {
            display: grid !important;
            grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-16 .summary-vowel-bottom-split {
            display: grid !important;
            grid-template-columns: 62fr 38fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-16 .summary-vowel-compound-grid {
            display: grid !important;
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-batchim-sheet-15 .summary-batchim-rep-grid {
            display: grid !important;
            grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-batchim-sheet-15 .summary-batchim-bottom-split {
            display: grid !important;
            grid-template-columns: 59fr 41fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          #study-batchim-sheet-15 .summary-batchim-double-grid {
            display: grid !important;
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }

          /* 용언·조사·교실한국어 총정리표 인쇄 전용 스타일 */
          #study-words-sheet-30,
          #study-ch-summary-sheet-2 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            display: block !important;
          }
          .study-sheet-wrapper .verb-summary-sheet,
          .study-sheet-wrapper .particle-summary-sheet,
          .study-sheet-wrapper .classroom-summary-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper .verb-summary-sheet *,
          .study-sheet-wrapper .particle-summary-sheet *,
          .study-sheet-wrapper .classroom-summary-sheet * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .study-sheet-wrapper .summary-verb-grid {
            display: grid !important;
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper .summary-particle-grid {
            display: grid !important;
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper .summary-verb-bottom {
            display: grid !important;
            grid-template-columns: 40fr 60fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper .summary-particle-bottom {
            display: grid !important;
            grid-template-columns: 54fr 46fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper .summary-classroom-grid {
            display: grid !important;
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 6px !important;
            width: 100% !important;
          }

          /* 대형 4분할 결합 쓰기 학습지 (16~19쪽) 인쇄 스타일 */
          .study-sheet-wrapper[id^="study-jamo-sheet-"] table.large-combo-table {
            width: 100% !important;
            height: 156mm !important;
            max-height: 156mm !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
          }
          .study-sheet-wrapper[id^="study-jamo-sheet-"] table.large-combo-table thead tr {
            height: 14mm !important;
            max-height: 14mm !important;
          }
          .study-sheet-wrapper[id^="study-jamo-sheet-"] table.large-combo-table tbody tr {
            height: 28.4mm !important;
            max-height: 28.4mm !important;
          }
          #study-basic-sheet-20 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            display: block !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"]:not(#study-basic-sheet-20) {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          #study-jamo-sheet-6 .print-sheet,
          #study-jamo-sheet-7 .print-sheet,
          #study-jamo-sheet-11 .print-sheet,
          #study-jamo-sheet-13 .print-sheet,
          #study-jamo-sheet-14 .print-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .print-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            overflow: visible !important;
          }
          #study-jamo-sheet-6 .jamo-card-grid,
          #study-jamo-sheet-7 .jamo-card-grid,
          #study-jamo-sheet-11 .jamo-card-grid,
          #study-jamo-sheet-13 .jamo-card-grid,
          #study-jamo-sheet-14 .jamo-card-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 16px !important;
            width: 100% !important;
            margin: 2mm 0 !important;
            flex: 1 1 auto !important;
          }
          #study-jamo-sheet-6 .jamo-stroke-card,
          #study-jamo-sheet-7 .jamo-stroke-card,
          #study-jamo-sheet-11 .jamo-stroke-card,
          #study-jamo-sheet-13 .jamo-stroke-card,
          #study-jamo-sheet-14 .jamo-stroke-card {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            height: 100% !important;
            padding: 2.5mm 3.5mm !important;
            box-sizing: border-box !important;
          }
          #study-jamo-sheet-6 .stroke-example-cell,
          #study-jamo-sheet-7 .stroke-example-cell,
          #study-jamo-sheet-11 .stroke-example-cell,
          #study-jamo-sheet-13 .stroke-example-cell,
          #study-jamo-sheet-14 .stroke-example-cell {
            flex: 1 1 auto !important;
            min-height: 90px !important;
            max-height: 155px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 1.5mm 0 !important;
          }
          #study-jamo-sheet-6 .stroke-example-cell svg,
          #study-jamo-sheet-7 .stroke-example-cell svg,
          #study-jamo-sheet-11 .stroke-example-cell svg,
          #study-jamo-sheet-13 .stroke-example-cell svg,
          #study-jamo-sheet-14 .stroke-example-cell svg {
            max-height: 145px !important;
            height: 100% !important;
            width: auto !important;
          }
          #study-jamo-sheet-6 .jamo-rows-container,
          #study-jamo-sheet-7 .jamo-rows-container,
          #study-jamo-sheet-11 .jamo-rows-container,
          #study-jamo-sheet-13 .jamo-rows-container,
          #study-jamo-sheet-14 .jamo-rows-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 4px !important;
            margin-top: 2px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-6 .jamo-practice-row,
          #study-jamo-sheet-7 .jamo-practice-row,
          #study-jamo-sheet-11 .jamo-practice-row,
          #study-jamo-sheet-13 .jamo-practice-row,
          #study-jamo-sheet-14 .jamo-practice-row {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            width: 100% !important;
            height: 32mm !important;
            max-height: 32mm !important;
          }
          #study-jamo-sheet-6 .jamo-practice-cell,
          #study-jamo-sheet-7 .jamo-practice-cell,
          #study-jamo-sheet-11 .jamo-practice-cell,
          #study-jamo-sheet-13 .jamo-practice-cell,
          #study-jamo-sheet-14 .jamo-practice-cell {
            height: 32mm !important;
            max-height: 32mm !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper[id^="study-jamo-sheet-"] .jamo-practice-cell span {
            font-size: 24mm !important;
            line-height: 1 !important;
          }
          #study-jamo-sheet-8 .jamo-practice-cell span {
            font-size: 19mm !important;
            line-height: 1 !important;
          }

          /* [기본글자] 21쪽 전체: 4열 인쇄 전용 크기 최적화 (정사각형 셀 & 교과서 느낌 꽉 찬 글자) */
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-card-grid {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 10px !important;
            width: 100% !important;
            margin: 1mm 0 !important;
            flex: 1 1 auto !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-stroke-card {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            height: 100% !important;
            padding: 2mm 2mm !important;
            box-sizing: border-box !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-card-top {
            flex: 1 1 auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 85px !important;
            padding: 1mm 0 !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-rows-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 3px !important;
            margin-top: 2px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-single-col-table {
            width: 50% !important;
            margin: 0 auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 3px !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-single-col-table .jamo-practice-row {
            width: 100% !important;
            height: 33mm !important;
            max-height: 33mm !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row {
            display: grid !important;
            width: 100% !important;
            height: 33mm !important;
            max-height: 33mm !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row.grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row.grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row.grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-cell {
            height: 33mm !important;
            max-height: 33mm !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-cell span {
            font-size: 24mm !important;
            line-height: 1 !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row.grid-cols-3 .jamo-practice-cell span {
            font-size: 15.5mm !important;
            line-height: 1 !important;
          }



          /* 4. Triple Set Print Filtering (단원별 3종세트 일괄 인쇄) */
          ${
            isPrintingTripleSet
              ? `
            .study-sheet-wrapper {
              display: none !important;
            }
            .triple-print-container {
              display: block !important;
            }
            .triple-print-item {
              margin: 0 !important;
              padding: 0 !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              page-break-after: always !important;
              break-after: page !important;
            }
            .triple-print-item:last-child {
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
          `
              : `
            .triple-print-container {
              display: none !important;
            }
          `
          }

          /* 1. Flashcards (그림카드) print layout */
          .printable-a4-page {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 198mm !important;
            min-height: 198mm !important;
            max-height: 198mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            background: #ffffff !important;
            border: 1.5px solid #1e293b !important;
            border-radius: 6px !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-card {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* 2. Word Writing, Quiz, and Jamo print layout */
          .printable-word-sheet, .print-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            background: #ffffff !important;
            border: 1.5px solid #1e293b !important;
            border-radius: 6px !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          table.word-table {
            width: 100% !important;
            max-width: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            background: #ffffff !important;
          }
          table.word-table thead tr {
            height: 6.5mm !important;
            max-height: 6.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.word-table tbody tr {
            height: 16.5mm !important;
            max-height: 16.5mm !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.word-table th, table.word-table td {
            border: 1.5px solid #374151 !important;
            text-align: center !important;
            vertical-align: middle !important;
            padding: 0 !important;
            background: transparent !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          /* 3열 다국어 함께(all) 3줄 분할 인쇄 전용 스타일 */
          .all-langs-cell {
            height: 100% !important;
            max-height: 16.2mm !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-evenly !important;
            padding: 0.3mm 1.2mm !important;
            box-sizing: border-box !important;
          }
          .all-langs-cell .lang-row {
            display: flex !important;
            align-items: center !important;
            gap: 0.8mm !important;
            line-height: 1.15 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .all-langs-cell .lang-tag {
            font-size: 5.5pt !important;
            padding: 0.1mm 0.6mm !important;
            line-height: 1 !important;
            border: 0.5px solid #94a3b8 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .all-langs-cell .lang-text {
            font-size: 7.2pt !important;
            line-height: 1.15 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          /* 3. 자음 및 모음 18열 테이블 & 조합표 (15×11) 인쇄 스타일 */
          table.square-grid-table {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
          }
          table.square-grid-table thead tr {
            height: 6.5mm !important;
            max-height: 6.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.square-grid-table thead th {
            border: 1.5px solid #374151 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            vertical-align: middle !important;
          }
          table.square-grid-table tbody td {
            border: 1.5px solid #374151 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            vertical-align: middle !important;
          }
          table.consonant-table tbody tr {
            height: 17.5mm !important;
            max-height: 17.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.consonant-table tbody td .cell-square-box {
            width: 100% !important;
            height: 17.5mm !important;
            max-height: 17.5mm !important;
          }
          table.vowel-table tbody tr {
            height: 12.2mm !important;
            max-height: 12.2mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.vowel-table tbody td .cell-square-box {
            width: 100% !important;
            height: 12.2mm !important;
            max-height: 12.2mm !important;
          }
          table.combo-table thead tr {
            height: 7mm !important;
            max-height: 7mm !important;
          }
          table.combo-table tbody tr {
            height: 13.5mm !important;
            max-height: 13.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.combo-table tbody td .cell-square-box {
            width: 100% !important;
            height: 13.5mm !important;
            max-height: 13.5mm !important;
          }

          /* 3-1. 대형 4분할 결합표 (16~23쪽) 인쇄 스타일 */
          table.large-combo-table {
            width: 100% !important;
            table-layout: fixed !important;
          }
          table.large-combo-table thead tr {
            height: 8.5mm !important;
            max-height: 8.5mm !important;
          }
          table.large-combo-table tbody tr {
            height: 29.5mm !important;
            max-height: 29.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.large-combo-table th:first-child,
          table.large-combo-table td:first-child {
            width: 4.8% !important;
            max-width: 4.8% !important;
          }
          table.large-combo-table th:not(:first-child),
          table.large-combo-table td:not(:first-child) {
            width: 13.6% !important;
            max-width: 13.6% !important;
          }
          table.large-combo-table tbody td .cell-square-box {
            width: 100% !important;
            height: 29.5mm !important;
            max-height: 29.5mm !important;
          }

          /* 4. Wordbook (단어장) 150단어(5열×30행) 표 print layout */
          .printable-wordbook-page {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2mm 3mm !important;
            background: #ffffff !important;
            border: 1.5px solid #1e293b !important;
            border-radius: 6px !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .printable-wordbook-page .wb-columns-grid {
            flex: 1 1 auto !important;
            gap: 2mm !important;
          }
          table.wordbook-table {
            width: 100% !important;
            height: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            background: #ffffff !important;
          }
          table.wordbook-table thead tr {
            height: 5.3mm !important;
            max-height: 5.3mm !important;
          }
          table.wordbook-table tbody tr {
            height: 5.25mm !important;
            max-height: 5.25mm !important;
          }
          table.wordbook-table th, table.wordbook-table td {
            border-collapse: collapse !important;
            box-sizing: border-box !important;
            padding-top: 0.4mm !important;
            padding-bottom: 0.4mm !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          table.wordbook-table span {
            line-height: 1.15 !important;
          }

          /* 5. 챕터 하단 [표지 · 차례 · ( / ) 고르기 쪽지시험 초안] A4 가로 1쪽 맞춤 인쇄 */
          .chapter-extra-sheet-wrapper {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            margin: 0 auto !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          .chapter-extra-sheet-wrapper.is-first-extra-sheet {
            page-break-before: always !important;
            break-before: page !important;
          }
          .chapter-extra-sheet-wrapper.is-last-extra-sheet {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .chapter-extra-a4-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .chapter-extra-a4-sheet * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* 개별/묶음 인쇄 모드: 선택된 표지/차례/쪽지시험 시트만 출력 */
          .printing-chapter-extras .study-sheet-wrapper:not(.is-selected-extra-print) {
            display: none !important;
          }
          .printing-chapter-extras .chapter-extra-sheet-wrapper.is-selected-extra-print.is-first-extra-sheet {
            page-break-before: avoid !important;
            break-before: avoid !important;
          }
          .printing-chapter-extras .chapter-extra-sheet-wrapper.is-selected-extra-print.is-single-extra-print {
            page-break-before: avoid !important;
            break-before: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
        }

        /* Screen Styles for Square Grids (자음 8×18, 모음 12×18, 자음모음 15×11) */
        table.square-grid-table {
          width: 100% !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
          margin: 0 auto !important;
        }
        table.square-grid-table th,
        table.square-grid-table td {
          padding: 0 !important;
          border: 1.5px solid #374151 !important;
          box-sizing: border-box !important;
          text-align: center !important;
          vertical-align: middle !important;
        }
        table.square-grid-table thead tr {
          height: 28px !important;
        }
        table.square-grid-table thead th {
          padding: 2px 0 !important;
        }
        table.square-grid-table tbody td {
          height: auto !important;
        }
        table.square-grid-table tbody td .cell-square-box {
          width: 100% !important;
          aspect-ratio: 1 / 1 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
        table.combo-table th,
        table.combo-table td {
          width: 6.66% !important;
        }
        table.combo-table tbody td .cell-square-box {
          aspect-ratio: unset !important;
          height: 44px !important;
          max-height: 48px !important;
        }
        table.large-combo-table th:first-child,
        table.large-combo-table td:first-child {
          width: 4.8% !important;
        }
        table.large-combo-table th:not(:first-child),
        table.large-combo-table td:not(:first-child) {
          width: 13.6% !important;
        }

        .font-school-base,
        .font-korean-gothic {
          font-family: 'Hakgyoansim Bareondotum', '학교안심 바른돋움', 'NanumBarunGothic', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans', 'Meiryo', 'Noto Sans KR', sans-serif !important;
        }

        .font-school-hand,
        .font-badasseugi,
        .font-kyobo {
          font-family: 'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important;
          letter-spacing: -0.01em;
        }

        .wb-columns-grid {
          grid-template-columns: repeat(var(--wb-cols, 5), minmax(0, 1fr)) !important;
        }

        /* Mobile / Narrow Screen: Full Desktop Worksheet Fit-to-Screen View (Print is 100% Untouched) */
        @media screen and (max-width: 768px) {
          .study-sheet-wrapper {
            width: 100% !important;
            overflow: visible !important;
          }
          .study-sheet-wrapper .print-sheet,
          .study-sheet-wrapper .printable-a4-page,
          .study-sheet-wrapper .verb-worksheet-page {
            width: 100% !important;
            max-width: none !important;
          }
          .study-sheet-wrapper .flashcard-print-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 0.5rem !important;
          }
          .study-sheet-wrapper .jamo-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 1.25rem !important;
          }
          .study-sheet-wrapper .jamo-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 0.75rem !important;
          }
          .study-sheet-wrapper .jamo-cols-5 {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 0.625rem !important;
          }
          .study-sheet-wrapper .verb-cards-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 0.5rem !important;
          }
          .study-sheet-wrapper .particle-rows-grid {
            grid-template-rows: repeat(5, minmax(0, 1fr)) !important;
            gap: 0.375rem !important;
          }
          .study-sheet-wrapper .verb-tips-grid {
            grid-template-columns: 15fr 33fr !important;
            gap: 1rem !important;
          }
          .study-sheet-wrapper .word-trace-row {
            padding-left: 16px !important;
          }
          .study-sheet-wrapper .word-quiz-boxes-row {
            padding-left: 14px !important;
          }
          .study-sheet-wrapper .word-quiz-boxes {
            width: auto !important;
          }
          .study-sheet-wrapper .word-quiz-box {
            flex: none !important;
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>

      {/* Desktop Row 3 Independent Controls (PC lg+ only) */}
      {!isFocusMode && !isMenuCollapsed && onSelectMethod && (
        <DesktopControlBar
          activeTrack={sectionType}
          activeMethod={activeMethod}
          onSelectMethod={onSelectMethod}
          uiLang={uiLang}
          isTocOpen={isTocOpen}
          onToggleToc={onToggleToc}
          isContinuousView={effectiveViewMode === 'continuous'}
          onToggleContinuous={
            onToggleContinuous ??
            (() => {
              const next = effectiveViewMode === 'single' ? 'continuous' : 'single';
              setEffectiveViewMode(next);
              if (next === 'single') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            })
          }
          onJumpCoverToc={scrollToChapterExtras}
          disableCoverToc={isExamOrPlayMode}
          centerUnitControl={desktopCenterUnitControl}
          extraAfterCenter={desktopExtraAfterCenter}
          onToggleFocusMode={onToggleFocusMode}
        />
      )}

      {/* Mobile Only Row 5 (< lg, Screen Only): Transparent 최하위 텍스트 메뉴 + [언어담기] + [1x1 단원드롭] [1x1 그리드] [1x1 인쇄] */}
      {!isMenuCollapsed && (
      <div
        className={`lg:hidden no-print sticky top-[66px] sm:top-[74px] ${
          isCustomLangOpen ? 'z-[35]' : 'z-[24]'
        } w-full bg-[#F4F3F8]/95 backdrop-blur-md pb-1 mb-1.5 select-none font-korean-gothic border-b ${
          sectionType === 'hangeul'
            ? 'border-amber-200/80'
            : sectionType === 'particle'
            ? 'border-emerald-200/80'
            : sectionType === 'verb'
            ? 'border-purple-200/80'
            : 'border-rose-200/80'
        }`}
      >
        <div className="flex flex-nowrap items-center justify-between gap-2 h-[38px] sm:h-[42px] px-2.5 sm:px-4 overflow-visible">
          {/* Left: Transparent-background lowest-level subtype text tabs (Unified sizing/font across all 4 tracks) */}
          {(() => {
            const tabUi = SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko;
            const isKoUi = (uiLang || 'ko') === 'ko';
            if (sectionType === 'hangeul') {
              return (
                <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-5 min-w-0 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('jamo');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'jamo'
                        ? "text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.jamo} (${isKoUi ? subLabels.jamo : '자음모음'})`}
                  >
                    <span>{tabUi.studyTabs.jamo}</span>
                    <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'jamo' ? 'text-amber-800/85' : 'text-slate-400'}`}>
                      [{isKoUi ? subLabels.jamo : '자음모음'}]
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('basic');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'basic'
                        ? "text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.basic} (${isKoUi ? subLabels.basic : '기본글자'})`}
                  >
                    <span>{tabUi.studyTabs.basic}</span>
                    <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'basic' ? 'text-amber-800/85' : 'text-slate-400'}`}>
                      [{isKoUi ? subLabels.basic : '기본글자'}]
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('batchim');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'batchim'
                        ? "text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.batchim} (${isKoUi ? subLabels.batchim : '받침글자'})`}
                  >
                    <span>{tabUi.studyTabs.batchim}</span>
                    <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'batchim' ? 'text-amber-800/85' : 'text-slate-400'}`}>
                      [{isKoUi ? subLabels.batchim : '받침글자'}]
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={isExamPlayLocked}
                    onClick={() => {
                      if (isExamPlayLocked) return;
                      playCutePop();
                      setStudyMode('hangeulExam');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      isExamPlayLocked
                        ? 'text-slate-400 opacity-60 cursor-not-allowed font-semibold'
                        : studyMode === 'hangeulExam'
                        ? "text-amber-950 font-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold cursor-pointer'
                    }`}
                    title={isExamPlayLocked ? '준비 중입니다 (곧 공개 예정)' : '한글 시험 (20강)'}
                  >
                    {isExamPlayLocked && <Lock className="w-3 h-3 shrink-0" />}
                    <span>시험</span>
                  </button>

                  <button
                    type="button"
                    disabled={isExamPlayLocked}
                    onClick={() => {
                      if (isExamPlayLocked) return;
                      playCutePop();
                      setStudyMode('jollaPlay');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      isExamPlayLocked
                        ? 'text-slate-400 opacity-60 cursor-not-allowed font-semibold'
                        : studyMode === 'jollaPlay'
                        ? "text-amber-950 font-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold cursor-pointer'
                    }`}
                    title={isExamPlayLocked ? '준비 중입니다 (곧 공개 예정)' : '졸라 놀이 학습지 (10종)'}
                  >
                    {isExamPlayLocked && <Lock className="w-3 h-3 shrink-0" />}
                    <span>놀이</span>
                  </button>
                </div>
              );
            }
            if (sectionType === 'verb') {
              return (
                <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-5 min-w-0 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('words');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'words'
                        ? "text-purple-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#7E22CE]"
                        : 'text-slate-500 hover:text-purple-900 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.verb} (${isKoUi ? subLabels.words : '용언 활용'})`}
                  >
                    <span>{tabUi.studyTabs.verb}</span>
                    <span className="hidden xl:inline text-[11px] font-bold text-purple-700/80">
                      [{isKoUi ? subLabels.words : '용언 활용'}]
                    </span>
                  </button>
                  <button
                    type="button"
                    disabled={isExamPlayLocked}
                    onClick={() => {
                      if (isExamPlayLocked) return;
                      playCutePop();
                      setStudyMode('verbExam');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      isExamPlayLocked
                        ? 'text-slate-400 opacity-60 cursor-not-allowed font-semibold'
                        : studyMode === 'verbExam'
                        ? "text-purple-950 font-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#7E22CE]"
                        : 'text-slate-500 hover:text-purple-900 font-semibold cursor-pointer'
                    }`}
                    title={isExamPlayLocked ? '준비 중입니다 (곧 공개 예정)' : '용언 종합 시험 6강'}
                  >
                    {isExamPlayLocked && <Lock className="w-3 h-3 shrink-0" />}
                    <span>시험</span>
                  </button>
                  <button
                    type="button"
                    disabled={isExamPlayLocked}
                    onClick={() => {
                      if (isExamPlayLocked) return;
                      playCutePop();
                      setStudyMode('verbPlay');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      isExamPlayLocked
                        ? 'text-slate-400 opacity-60 cursor-not-allowed font-semibold'
                        : studyMode === 'verbPlay'
                        ? "text-purple-950 font-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#7E22CE]"
                        : 'text-slate-500 hover:text-purple-900 font-semibold cursor-pointer'
                    }`}
                    title={isExamPlayLocked ? '준비 중입니다 (곧 공개 예정)' : '용언 놀이 학습지 초안 5종 (1강)'}
                  >
                    {isExamPlayLocked && <Lock className="w-3 h-3 shrink-0" />}
                    <span>놀이</span>
                  </button>
                </div>
              );
            }
            if (sectionType === 'particle') {
              return (
                <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-5 min-w-0 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('particle');
                      setParticleSubMode('combination');
                      setSelectedJumpCh(0);
                      setSelectedParticleSection(PARTICLE_COMBINATION_OPTIONS[0]?.id || 'particle_unit1');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'particle' && particleSubMode === 'combination'
                        ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.particle} (${isKoUi ? subLabels.particle : '조사 결합'})`}
                  >
                    <span>{tabUi.studyTabs.particle}</span>
                    <span className="hidden xl:inline text-[11px] font-bold text-emerald-700/85">
                      [{isKoUi ? subLabels.particle : '조사 결합'}]
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('particle');
                      setParticleSubMode('sentence');
                      setSelectedJumpCh(0);
                      setSelectedParticleSection(PARTICLE_SENTENCE_OPTIONS[0]?.id || 'particle_unit3');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'particle' && particleSubMode === 'sentence'
                        ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-semibold'
                    }`}
                    title={menuExtras.particleSentenceTab}
                  >
                    <span>{menuExtras.particleSentenceTab}</span>
                  </button>
                  <button
                    type="button"
                    disabled={isExamPlayLocked}
                    onClick={() => {
                      if (isExamPlayLocked) return;
                      playCutePop();
                      setStudyMode('particleExam');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      isExamPlayLocked
                        ? 'text-slate-400 opacity-60 cursor-not-allowed font-semibold'
                        : studyMode === 'particleExam'
                        ? "text-emerald-950 font-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-semibold cursor-pointer'
                    }`}
                    title={isExamPlayLocked ? '준비 중입니다 (곧 공개 예정)' : '조사 종합 시험 6강'}
                  >
                    {isExamPlayLocked && <Lock className="w-3 h-3 shrink-0" />}
                    <span>시험</span>
                  </button>
                  <button
                    type="button"
                    disabled={isExamPlayLocked}
                    onClick={() => {
                      if (isExamPlayLocked) return;
                      playCutePop();
                      setStudyMode('particlePlay');
                    }}
                    className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                      isExamPlayLocked
                        ? 'text-slate-400 opacity-60 cursor-not-allowed font-semibold'
                        : studyMode === 'particlePlay'
                        ? "text-emerald-950 font-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-semibold cursor-pointer'
                    }`}
                    title={isExamPlayLocked ? '준비 중입니다 (곧 공개 예정)' : '조사 놀이 학습지 초안 5종 (1강)'}
                  >
                    {isExamPlayLocked && <Lock className="w-3 h-3 shrink-0" />}
                    <span>놀이</span>
                  </button>
                </div>
              );
            }
            return (
              <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-5 min-w-0 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setStudyMode('cards');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    studyMode === 'cards'
                      ? "text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold'
                  }`}
                  title={`${tabUi.studyTabs.flashcards} (${isKoUi ? subLabels.cards : '그림카드'})`}
                >
                  <span>{tabUi.studyTabs.flashcards}</span>
                  <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'cards' ? 'text-rose-700/85' : 'text-slate-400'}`}>
                    [{isKoUi ? subLabels.cards : '그림카드'}]
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setStudyMode('writing');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    studyMode === 'writing'
                      ? "text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold'
                  }`}
                  title={`${tabUi.studyTabs.writing} (${isKoUi ? subLabels.writing : '따라쓰기'})`}
                >
                  <span>{tabUi.studyTabs.writing}</span>
                  <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'writing' ? 'text-rose-700/85' : 'text-slate-400'}`}>
                    [{isKoUi ? subLabels.writing : '따라쓰기'}]
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setStudyMode('quiz');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    studyMode === 'quiz'
                      ? "text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold'
                  }`}
                  title={`${tabUi.studyTabs.quiz} (${isKoUi ? subLabels.quiz : '받아쓰기'})`}
                >
                  <span>{tabUi.studyTabs.quiz}</span>
                  <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'quiz' ? 'text-rose-700/85' : 'text-slate-400'}`}>
                    [{isKoUi ? subLabels.quiz : '받아쓰기'}]
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isExamPlayLocked}
                  onClick={() => {
                    if (isExamPlayLocked) return;
                    playCutePop();
                    setStudyMode('classroomExam');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    isExamPlayLocked
                      ? 'text-slate-400 opacity-60 cursor-not-allowed font-semibold'
                      : studyMode === 'classroomExam'
                      ? "text-rose-950 font-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold cursor-pointer'
                  }`}
                  title={isExamPlayLocked ? '준비 중입니다 (곧 공개 예정)' : '교실 한국어 종합 시험 6강'}
                >
                  {isExamPlayLocked && <Lock className="w-3 h-3 shrink-0" />}
                  <span>시험</span>
                </button>

                <button
                  type="button"
                  disabled={isExamPlayLocked}
                  onClick={() => {
                    if (isExamPlayLocked) return;
                    playCutePop();
                    setStudyMode('classroomPlay');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    isExamPlayLocked
                      ? 'text-slate-400 opacity-60 cursor-not-allowed font-semibold'
                      : studyMode === 'classroomPlay'
                      ? "text-rose-950 font-black cursor-pointer after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold cursor-pointer'
                  }`}
                  title={isExamPlayLocked ? '준비 중입니다 (곧 공개 예정)' : '교실 한국어 놀이 학습지 초안 5종 (1강)'}
                >
                  {isExamPlayLocked && <Lock className="w-3 h-3 shrink-0" />}
                  <span>놀이</span>
                </button>
              </div>
            );
          })()}

          {/* Right: (Classroom Lang Control) + [1x1 단원드롭] [1x1 그리드] [단원별인쇄] [전체인쇄] */}
          <div className="flex items-center gap-1 shrink-0 ml-auto">
            {sectionType === 'classroom' && (
              <div className="relative z-30 shrink-0">
                <>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setIsCustomLangOpen(prev => !prev);
                    }}
                    className="h-8 sm:h-8.5 px-1.5 sm:px-2.5 rounded-none bg-[#441A75] hover:bg-[#52208E] active:scale-[0.98] text-white shadow-none flex items-center gap-1 sm:gap-1.5 transition-all focus:outline-none cursor-pointer border border-[#6328A6]"
                    title={(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.pickLangsTitle}
                    aria-expanded={isCustomLangOpen}
                  >
                    <span className="text-xs sm:text-sm leading-none shrink-0" role="img" aria-label="Globe">🌐</span>
                    <span className="hidden md:inline text-xs font-bold text-white tracking-tight whitespace-nowrap">
                      {(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.pickLangs}
                    </span>
                    <span className="bg-[#FEF08A] text-[#1E0B36] font-extrabold text-[9px] sm:text-[10.5px] px-1 py-0.5 rounded-none whitespace-nowrap leading-none">
                      [{customSelectedLangs.length}/3]
                    </span>
                    <ChevronDown className={`w-3 h-3 text-white transition-transform shrink-0 ${isCustomLangOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* 다국어 커스텀 드롭다운 팝오버 (우측 정렬로 화면 밖 잘림 방지) */}
                  {isCustomLangOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[0.5px]"
                        onClick={() => setIsCustomLangOpen(false)}
                      />
                      <div className="absolute right-0 mt-1.5 w-[280px] xs:w-[320px] sm:w-[360px] max-w-[92vw] bg-white rounded-lg shadow-2xl border-2 border-[#441A75]/30 p-2.5 sm:p-3 z-50 font-korean-gothic text-xs text-slate-800 animate-in fade-in slide-in-from-top-1">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
                          <span className="font-black text-purple-950 text-xs">
                            {(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.pickModalHeader}
                          </span>
                          <span className="text-[11px] font-extrabold text-[#1E0B36] bg-[#FEF08A] px-2 py-0.5 rounded-sm shadow-2xs">
                            [{customSelectedLangs.length}/3] {(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.selectedSuffix}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {SUPPORTED_LANGUAGES.map(langMeta => {
                            const isChecked = customSelectedLangs.includes(langMeta.code);
                            const orderIdx = customSelectedLangs.indexOf(langMeta.code);
                            const prioritySfx = (SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.prioritySuffix;
                            return (
                              <button
                                key={langMeta.code}
                                type="button"
                                onClick={() => handleToggleCustomLang(langMeta.code)}
                                className={`w-full px-2.5 py-2 rounded-md flex items-center justify-between transition-colors text-left cursor-pointer border ${
                                  isChecked
                                    ? 'bg-purple-100/80 text-purple-950 font-black border-purple-300 shadow-2xs'
                                    : 'bg-white hover:bg-purple-50/80 text-slate-800 font-bold border-slate-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-base leading-none">{langMeta.flag}</span>
                                  <span className="font-bold">{langMeta.fullName}</span>
                                  {isChecked && (
                                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-200/80 px-1.5 py-0.2 rounded-sm">
                                      #{orderIdx + 1}{prioritySfx ? ` (${orderIdx + 1}${prioritySfx})` : ''}
                                    </span>
                                  )}
                                </div>
                                <div className={`w-4 h-4 rounded-sm flex items-center justify-center border text-[11px] font-bold ${
                                  isChecked
                                    ? 'bg-purple-700 border-purple-700 text-white'
                                    : 'border-slate-400 bg-white text-transparent'
                                }`}>
                                  ✓
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </>
              </div>
            )}

            {/* Unified Grid-Popover Unit Dropdown across ALL 4 tracks (1x1 grid icon on < sm, compact bar on sm+) */}
            {sectionType === 'hangeul' && studyMode === 'jamo' && (
              <>
                <div className="sm:hidden">
                  <CompactUnitSelectButton
                    value={activeJamoIdx}
                    onChange={(val) => handleJumpToSheet(Number(val))}
                    options={jamoGridOptions}
                    theme="amber"
                    title="자음모음 페이지 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="자음모음 검색..."
                    compactIcon={true}
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
                <div className="hidden sm:block">
                  <CompactUnitSelectButton
                    value={activeJamoIdx}
                    onChange={(val) => handleJumpToSheet(Number(val))}
                    options={jamoGridOptions}
                    theme="amber"
                    title="자음모음 페이지 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="자음모음 검색..."
                    className="w-[180px] md:w-[215px]"
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
              </>
            )}
            {sectionType === 'hangeul' && studyMode === 'basic' && (
              <>
                <div className="sm:hidden">
                  <CompactUnitSelectButton
                    value={activeBasicIdx}
                    onChange={(val) => handleJumpToSheet(Number(val))}
                    options={basicGridOptions}
                    theme="amber"
                    title="기본글자 페이지 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="기본글자 검색..."
                    compactIcon={true}
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
                <div className="hidden sm:block">
                  <CompactUnitSelectButton
                    value={activeBasicIdx}
                    onChange={(val) => handleJumpToSheet(Number(val))}
                    options={basicGridOptions}
                    theme="amber"
                    title="기본글자 페이지 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="기본글자 검색..."
                    className="w-[180px] md:w-[215px]"
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
              </>
            )}
            {sectionType === 'hangeul' && studyMode === 'batchim' && (
              <>
                <div className="sm:hidden">
                  <CompactUnitSelectButton
                    value={activeBatchimIdx}
                    onChange={(val) => handleJumpToSheet(Number(val))}
                    options={batchimGridOptions}
                    theme="amber"
                    title="받침글자 페이지 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="받침 검색..."
                    compactIcon={true}
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
                <div className="hidden sm:block">
                  <CompactUnitSelectButton
                    value={activeBatchimIdx}
                    onChange={(val) => handleJumpToSheet(Number(val))}
                    options={batchimGridOptions}
                    theme="amber"
                    title="받침글자 페이지 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="받침 검색..."
                    className="w-[180px] md:w-[215px]"
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
              </>
            )}
            {sectionType === 'hangeul' && studyMode === 'hangeulExam' && (
              <CompactUnitSelectButton
                value={selectedHangeulExamSection}
                onChange={(val) => {
                  setSelectedHangeulExamSection(val);
                  const opt = HANGEUL_EXAM_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={hangeulExamGridOptions}
                theme="amber"
                title="한글 시험 20강 선택"
                align="right"
                popoverLayout="grid"
                searchPlaceholder="시험 검색..."
                compactIcon={true}
              />
            )}
            {sectionType === 'hangeul' && studyMode === 'jollaPlay' && (
              <CompactUnitSelectButton
                value={selectedJollaPlaySection}
                onChange={(val) => {
                  setSelectedJollaPlaySection(val);
                  const opt = JOLLA_PLAY_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={jollaPlayGridOptions}
                theme="amber"
                title="졸라 놀이 학습지 선택"
                align="right"
                popoverLayout="grid"
                searchPlaceholder="놀이 검색..."
                compactIcon={true}
              />
            )}
            {sectionType === 'particle' && studyMode === 'particle' && (() => {
              const targetOpts =
                particleSubMode === 'sentence'
                  ? PARTICLE_SENTENCE_OPTIONS
                  : PARTICLE_COMBINATION_OPTIONS;
              const gridOpts =
                particleSubMode === 'sentence'
                  ? particleSentenceGridOptions
                  : particleComboGridOptions;
              const selectTitle =
                particleSubMode === 'sentence' ? '문장 만들기 단원 선택' : '조사 결합 단원 선택';
              const handleParticleSelect = (val: string) => {
                setSelectedParticleSection(val);
                const opt = targetOpts.find(o => o.id === val);
                if (opt) handleJumpToSheet(opt.targetSheet);
              };
              return (
                <>
                  <div className="sm:hidden">
                    <CompactUnitSelectButton
                      value={selectedParticleSection}
                      onChange={handleParticleSelect}
                      options={gridOpts}
                      theme="emerald"
                      title={selectTitle}
                      align="right"
                      popoverLayout="grid"
                      searchPlaceholder="단원 검색..."
                      compactIcon={true}
                      footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <CompactUnitSelectButton
                      value={selectedParticleSection}
                      onChange={handleParticleSelect}
                      options={gridOpts}
                      theme="emerald"
                      title={selectTitle}
                      align="right"
                      popoverLayout="grid"
                      searchPlaceholder="단원 검색..."
                      className="w-[180px] md:w-[215px]"
                      footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                    />
                  </div>
                </>
              );
            })()}
            {sectionType === 'verb' && studyMode === 'words' && (
              <>
                <div className="sm:hidden">
                  <CompactUnitSelectButton
                    value={selectedWordsSection}
                    onChange={(val) => {
                      setSelectedWordsSection(val);
                      const opt = WORDS_SECTION_OPTIONS.find(o => o.id === val);
                      if (opt) handleJumpToSheet(opt.targetSheet);
                    }}
                    options={wordsGridOptions}
                    theme="purple"
                    title="용언 활용 단원 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="단원 검색..."
                    compactIcon={true}
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
                <div className="hidden sm:block">
                  <CompactUnitSelectButton
                    value={selectedWordsSection}
                    onChange={(val) => {
                      setSelectedWordsSection(val);
                      const opt = WORDS_SECTION_OPTIONS.find(o => o.id === val);
                      if (opt) handleJumpToSheet(opt.targetSheet);
                    }}
                    options={wordsGridOptions}
                    theme="purple"
                    title="용언 활용 단원 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="단원 검색..."
                    className="w-[180px] md:w-[215px]"
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
              </>
            )}
            {sectionType === 'verb' && studyMode === 'verbExam' && (
              <CompactUnitSelectButton
                value={selectedVerbExamSection}
                onChange={(val) => {
                  setSelectedVerbExamSection(val);
                  const opt = VERB_EXAM_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={verbExamGridOptions}
                theme="purple"
                title="용언 종합 시험 6강 선택"
                align="right"
                popoverLayout="grid"
                searchPlaceholder="시험 검색..."
                compactIcon={true}
              />
            )}
            {sectionType === 'verb' && studyMode === 'verbPlay' && (
              <CompactUnitSelectButton
                value={selectedVerbPlaySection}
                onChange={(val) => {
                  setSelectedVerbPlaySection(val);
                  const opt = VERB_PLAY_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={verbPlayGridOptions}
                theme="purple"
                title="용언 놀이 초안 5종 선택"
                align="right"
                popoverLayout="grid"
                searchPlaceholder="놀이 검색..."
                compactIcon={true}
              />
            )}
            {sectionType === 'particle' && studyMode === 'particleExam' && (
              <CompactUnitSelectButton
                value={selectedParticleExamSection}
                onChange={(val) => {
                  setSelectedParticleExamSection(val);
                  const opt = PARTICLE_EXAM_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={particleExamGridOptions}
                theme="emerald"
                title="조사 종합 시험 6강 선택"
                align="right"
                popoverLayout="grid"
                searchPlaceholder="시험 검색..."
                compactIcon={true}
              />
            )}
            {sectionType === 'particle' && studyMode === 'particlePlay' && (
              <CompactUnitSelectButton
                value={selectedParticlePlaySection}
                onChange={(val) => {
                  setSelectedParticlePlaySection(val);
                  const opt = PARTICLE_PLAY_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={particlePlayGridOptions}
                theme="emerald"
                title="조사 놀이 초안 5종 선택"
                align="right"
                popoverLayout="grid"
                searchPlaceholder="놀이 검색..."
                compactIcon={true}
              />
            )}
            {sectionType === 'classroom' && studyMode !== 'classroomExam' && studyMode !== 'classroomPlay' && (
              <>
                <div className="sm:hidden">
                  <CompactUnitSelectButton
                    value={activeClassroomCh}
                    onChange={(val) => handleJumpToSheet(Number(val))}
                    options={classroomChapterOptions}
                    theme="rose"
                    title="교실 한국어 단원 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="단원 검색..."
                    compactIcon={true}
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
                <div className="hidden sm:block">
                  <CompactUnitSelectButton
                    value={activeClassroomCh}
                    onChange={(val) => handleJumpToSheet(Number(val))}
                    options={classroomChapterOptions}
                    theme="rose"
                    title="교실 한국어 단원 선택"
                    align="right"
                    popoverLayout="grid"
                    searchPlaceholder="단원 검색..."
                    className="w-[180px] md:w-[215px]"
                    footerAction={{ label: '표지 · 차례 바로가기', onClick: scrollToChapterExtras }}
                  />
                </div>
              </>
            )}
            {sectionType === 'classroom' && studyMode === 'classroomExam' && (
              <CompactUnitSelectButton
                value={selectedClassroomExamSection}
                onChange={(val) => {
                  setSelectedClassroomExamSection(val);
                  const opt = CLASSROOM_EXAM_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={classroomExamOptions}
                theme="rose"
                title="교실 한국어 종합 시험 6강 선택"
                align="right"
                popoverLayout="grid"
                searchPlaceholder="시험 검색..."
                compactIcon={true}
              />
            )}
            {sectionType === 'classroom' && studyMode === 'classroomPlay' && (
              <CompactUnitSelectButton
                value={selectedClassroomPlaySection}
                onChange={(val) => {
                  setSelectedClassroomPlaySection(val);
                  const opt = CLASSROOM_PLAY_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={classroomPlayOptions}
                theme="rose"
                title="교실 한국어 놀이 초안 5종 선택"
                align="right"
                popoverLayout="grid"
                searchPlaceholder="놀이 검색..."
                compactIcon={true}
              />
            )}

            {/* Unified 1x1 View Mode Icon Toggle ([연속 보기] <-> [1장 보기]) across ALL 4 tracks */}
            {(() => {
              const toggleThemeClass =
                sectionType === 'hangeul'
                  ? effectiveViewMode === 'continuous'
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                    : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-300'
                  : sectionType === 'verb'
                  ? effectiveViewMode === 'continuous'
                    ? 'bg-purple-100 hover:bg-purple-200 text-purple-950 border-purple-300'
                    : 'bg-white hover:bg-purple-50 text-purple-800 border-purple-300'
                  : sectionType === 'particle'
                  ? effectiveViewMode === 'continuous'
                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-emerald-300'
                    : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-300'
                  : effectiveViewMode === 'continuous'
                  ? 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300'
                  : 'bg-white hover:bg-rose-50 text-rose-800 border-rose-300';
              return (
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    const next = effectiveViewMode === 'single' ? 'continuous' : 'single';
                    setEffectiveViewMode(next);
                    if (next === 'single') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none shadow-none active:scale-95 flex items-center justify-center transition-all cursor-pointer border shrink-0 ${toggleThemeClass}`}
                  title={effectiveViewMode === 'single' ? '모든 학습지 연속 보기로 전환' : '1장씩 보기로 전환'}
                  aria-label={effectiveViewMode === 'single' ? '연속 보기' : '1장 보기'}
                >
                  {effectiveViewMode === 'single' ? (
                    <Rows3 className="w-4 h-4 shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 shrink-0" />
                  )}
                </button>
              );
            })()}
          </div>
        </div>
      </div>
      )}

      {/* Main Worksheet Container (평소 1장 보기 시 현재 1장만 DOM 마운트 · 인쇄 시 요청 범위만 마운트해 메모리/속도 최적화) */}
      <div
        className={`study-worksheets-container w-full mx-auto flex flex-col items-center space-y-3 sm:space-y-8 px-1 sm:px-4 ${
          isFocusMode ? 'max-w-[1600px]' : 'lg:max-w-[1080px] max-w-[1600px]'
        }`}
      >
        {(() => {
          const shouldMountSheet = (idx: number, activeIdx: number, printKey?: string): boolean => {
            if (isPrintingTripleSet) return false;
            if (extraPrintTarget !== null) return false;
            if (singleSheetPrintKey !== null) {
              return Boolean(printKey && singleSheetPrintKey === printKey);
            }
            if (activePrintRange !== null) {
              return idx >= activePrintRange.startIdx && idx <= activePrintRange.endIdx;
            }
            if (isSingleView) {
              return idx === activeIdx;
            }
            return true;
          };

          if (studyMode === 'jamo') {
            return (
              <>
                {[
                  { idx: 0, node: <ConsonantsWorksheetPage key="study-jamo-p1-roma-v2" interactiveAudio={true} /> },
                  { idx: 1, node: <VowelsWorksheetPage key="study-jamo-p2-roma-v2" interactiveAudio={true} /> },
                  { idx: 2, node: <ComboTracingWorksheetPage key="study-jamo-p3-roma-v2" interactiveAudio={true} /> },
                  { idx: 3, node: <ComboWorksheetPage key="study-jamo-p4-roma-v2" interactiveAudio={true} /> },
                  { idx: 4, node: <ConsonantsStrokeWorksheetPage interactiveAudio={true} /> },
                  { idx: 5, node: <ConsonantsStrokeWorksheetPage2 interactiveAudio={true} /> },
                  { idx: 6, node: <ConsonantsStrokeWorksheetPage3 interactiveAudio={true} /> },
                  { idx: 7, node: <ConsonantsStrokeWorksheetPage4 interactiveAudio={true} /> },
                  { idx: 8, node: <ConsonantsStrokeWorksheetPage5 interactiveAudio={true} /> },
                  { idx: 9, node: <VowelsStrokeWorksheetPage1 interactiveAudio={true} /> },
                  { idx: 10, node: <VowelsStrokeWorksheetPage2 interactiveAudio={true} /> },
                  { idx: 11, node: <VowelsStrokeWorksheetPage3 interactiveAudio={true} /> },
                  { idx: 12, node: <VowelsStrokeWorksheetPage4 interactiveAudio={true} /> },
                  { idx: 13, node: <VowelsStrokeWorksheetPage5 interactiveAudio={true} /> },
                  { idx: 14, node: <VowelsStrokeWorksheetPage6 interactiveAudio={true} /> },
                ]
                  .filter((item) => shouldMountSheet(item.idx, activeJamoIdx))
                  .map((item) => {
                    const hideOnScreen = isSingleView && item.idx !== activeJamoIdx;
                    return (
                      <div
                        key={item.idx}
                        id={`study-jamo-sheet-${item.idx}`}
                        data-sheet-idx={item.idx}
                        className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                          hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                        }`}
                      >
                        <MobileScaledWorksheetWrapper desktopWidth={990}>
                          {item.node}
                        </MobileScaledWorksheetWrapper>
                      </div>
                    );
                  })}
              </>
            );
          }

          if (studyMode === 'basic') {
            return (
              <>
                {BASIC_LETTERS_DATA.map((pageData, idx) => ({ pageData, idx }))
                  .filter(({ idx }) => shouldMountSheet(idx, activeBasicIdx))
                  .map(({ pageData, idx }) => {
                    const hideOnScreen = isSingleView && idx !== activeBasicIdx;
                    return (
                      <div
                        key={pageData.pageNumber}
                        id={`study-basic-sheet-${idx}`}
                        data-sheet-idx={idx}
                        className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                          hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                        }`}
                      >
                        <MobileScaledWorksheetWrapper desktopWidth={990}>
                          <BasicLetterWorksheetPage pageIndex={idx} pageData={pageData} interactiveAudio={true} />
                        </MobileScaledWorksheetWrapper>
                      </div>
                    );
                  })}
              </>
            );
          }

          if (studyMode === 'batchim') {
            return (
              <>
                {BATCHIM_PAGES_DATA.map((pageData, idx) => ({ pageData, idx }))
                  .filter(({ idx }) => shouldMountSheet(idx, activeBatchimIdx))
                  .map(({ pageData, idx }) => {
                    const hideOnScreen = isSingleView && idx !== activeBatchimIdx;
                    return (
                      <div
                        key={pageData.pageNumber}
                        id={`study-batchim-sheet-${idx}`}
                        data-sheet-idx={idx}
                        className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                          hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                        }`}
                      >
                        <MobileScaledWorksheetWrapper desktopWidth={990}>
                          <BatchimWorksheetPage pageIndex={idx} pageData={pageData} interactiveAudio={true} />
                        </MobileScaledWorksheetWrapper>
                      </div>
                    );
                  })}
              </>
            );
          }

          if (studyMode === 'hangeulExam') {
            return (
              <>
                {/* Part Filter Bar (Web-only) */}
                <div className="no-print w-full max-w-[1040px] mx-auto bg-white border border-amber-200 rounded-xl px-3.5 py-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setExamPartFilter('all');
                      }}
                      className={`px-2.5 py-1 rounded-md text-xs font-black cursor-pointer transition-colors border ${
                        examPartFilter === 'all'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      전체 20강
                    </button>
                    {HANGEUL_EXAM_PARTS.map((part) => (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => {
                          playCutePop();
                          setExamPartFilter(part.id);
                          const firstInPart = HANGEUL_EXAM_LESSONS.find((l) => l.partId === part.id);
                          if (firstInPart) {
                            const opt = HANGEUL_EXAM_OPTIONS[firstInPart.globalIndex];
                            if (opt) setSelectedHangeulExamSection(opt.id);
                            setSelectedJumpCh(firstInPart.globalIndex);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-md text-xs font-black cursor-pointer transition-colors border ${
                          examPartFilter === part.id
                            ? 'text-white border-transparent'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                        style={
                          examPartFilter === part.id
                            ? { backgroundColor: part.accentHex }
                            : undefined
                        }
                      >
                        {part.partNumber} · {part.shortLabel} (5강)
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">
                    해볼한국어 기존 데이터 100% 기반 · A4 가로 1장 = 1강 (10문항)
                  </span>
                </div>

                {HANGEUL_EXAM_LESSONS.filter(
                  (lesson) =>
                    (activePrintRange !== null ||
                      singleSheetPrintKey !== null ||
                      examPartFilter === 'all' ||
                      lesson.partId === examPartFilter) &&
                    shouldMountSheet(
                      lesson.globalIndex,
                      activeHangeulExamIdx,
                      `exam-${lesson.globalIndex}`
                    )
                ).map((lesson) => {
                  const printKey = `exam-${lesson.globalIndex}`;
                  const hideOnScreen = isSingleView && lesson.globalIndex !== activeHangeulExamIdx;
                  return (
                    <div
                      key={lesson.id}
                      id={`study-exam-sheet-${lesson.globalIndex}`}
                      data-sheet-idx={lesson.globalIndex}
                      className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                        hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                      } ${
                        singleSheetPrintKey === printKey
                          ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                          : ''
                      }`}
                    >
                      <div className="no-print w-full max-w-[1040px] flex items-center justify-between mb-1.5 px-1">
                        <span className="text-xs font-extrabold text-slate-600">
                          {lesson.globalIndex + 1} / 20 · {lesson.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => handlePrintSingleSheet(printKey)}
                          className="px-2.5 py-1 rounded-md bg-white hover:bg-amber-50 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-600" />
                          이 시험지 1장 인쇄
                        </button>
                      </div>
                      <MobileScaledWorksheetWrapper desktopWidth={1040}>
                        <HangeulExamSheet lesson={lesson} />
                      </MobileScaledWorksheetWrapper>
                    </div>
                  );
                })}
              </>
            );
          }

          if (studyMode === 'jollaPlay') {
            return (
              <>
                {[
                  { idx: 0, label: '① 자음·모음 땅 차지하기 (졸라 보드게임)', width: 1040, node: <JollaJamoTerritoryBoardSheet /> },
                  { idx: 1, label: '② 졸라맨 자음 빙고게임 (2판 1장)', width: 1040, node: <JollaConsonantBingoSheet /> },
                  { idx: 2, label: '③ 졸라맨 모음 빙고게임 (2판 1장)', width: 1040, node: <JollaVowelBingoSheet /> },
                  { idx: 3, label: '④ [동기부여 ①] 한글산 20칸 등산 도장판', width: 1040, node: <JollaMountainStampSheet /> },
                  { idx: 4, label: '⑤ [동기부여 ②] 주사위 글자 공장 챌린지', width: 1040, node: <JollaDiceFactorySheet /> },
                  { idx: 5, label: '⑥ [동기부여 ③] 한글 영웅 상장 & 쿠폰 3종', width: 1040, node: <JollaHeroAwardCouponSheet /> },
                  { idx: 6, label: '⑦ 숨은 졸라한글맨 찾기', width: 990, node: <JollaHiddenLettersSheet /> },
                  { idx: 7, label: '⑧ 기본글자 땅따먹기', width: 990, node: <JollaTerritoryGameSheet /> },
                  { idx: 8, label: '⑨ 졸라한글맨 낱말 미로 탈출', width: 990, node: <JollaMazeGameSheet /> },
                  { idx: 9, label: '⑩ 자모·낱말 3×3 초스피드 빙고', width: 990, node: <JollaBingoGameSheet /> },
                ]
                  .filter((item) => shouldMountSheet(item.idx, activeJollaPlayIdx, `play-${item.idx}`))
                  .map((item) => {
                    const printKey = `play-${item.idx}`;
                    const hideOnScreen = isSingleView && item.idx !== activeJollaPlayIdx;
                    return (
                      <div
                        key={item.idx}
                        id={`study-jolla-sheet-${item.idx}`}
                        data-sheet-idx={item.idx}
                        className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                          hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                        } ${
                          singleSheetPrintKey === printKey
                            ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                            : ''
                        }`}
                      >
                        <div className="no-print w-full max-w-[1040px] flex items-center justify-between mb-1.5 px-1">
                          <span className="text-xs font-extrabold text-slate-600">{item.label}</span>
                          <button
                            type="button"
                            onClick={() => handlePrintSingleSheet(printKey)}
                            className="px-2.5 py-1 rounded-md bg-white hover:bg-amber-50 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                          >
                            <Printer className="w-3.5 h-3.5 text-amber-600" />
                            이 학습지 1장 인쇄
                          </button>
                        </div>
                        <MobileScaledWorksheetWrapper desktopWidth={item.width}>
                          {item.node}
                        </MobileScaledWorksheetWrapper>
                      </div>
                    );
                  })}
              </>
            );
          }

          if (studyMode === 'particleExam') {
            return (
              <>
                {PARTICLE_EXAM_LESSONS.filter((lesson) =>
                  shouldMountSheet(
                    lesson.globalIndex,
                    activeParticleExamIdx,
                    `particle-exam-${lesson.globalIndex}`
                  )
                ).map((lesson) => {
                  const printKey = `particle-exam-${lesson.globalIndex}`;
                  const hideOnScreen = isSingleView && lesson.globalIndex !== activeParticleExamIdx;
                  return (
                    <div
                      key={lesson.id}
                      id={`study-particle-exam-sheet-${lesson.globalIndex}`}
                      data-sheet-idx={lesson.globalIndex}
                      className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                        hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                      } ${
                        singleSheetPrintKey === printKey
                          ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                          : ''
                      }`}
                    >
                      <MobileScaledWorksheetWrapper desktopWidth={1040}>
                        <ParticleExamSheet
                          lesson={lesson}
                          lang={lang}
                          onPrintSingle={() => handlePrintSingleSheet(printKey)}
                        />
                      </MobileScaledWorksheetWrapper>
                    </div>
                  );
                })}
              </>
            );
          }

          if (studyMode === 'particlePlay') {
            return (
              <>
                {PARTICLE_PLAY_SHEETS_META.filter((sheet) =>
                  shouldMountSheet(sheet.idx, activeParticlePlayIdx, `particle-play-${sheet.idx}`)
                ).map((sheet) => {
                  const printKey = `particle-play-${sheet.idx}`;
                  const hideOnScreen = isSingleView && sheet.idx !== activeParticlePlayIdx;
                  return (
                    <div
                      key={sheet.id}
                      id={`study-particle-play-sheet-${sheet.idx}`}
                      data-sheet-idx={sheet.idx}
                      className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                        hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                      } ${
                        singleSheetPrintKey === printKey
                          ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                          : ''
                      }`}
                    >
                      <MobileScaledWorksheetWrapper desktopWidth={1040}>
                        <ParticlePlayDraftSheet
                          sheetIndex={sheet.idx}
                          lang={lang}
                          onPrintSingle={() => handlePrintSingleSheet(printKey)}
                        />
                      </MobileScaledWorksheetWrapper>
                    </div>
                  );
                })}
              </>
            );
          }

          if (studyMode === 'classroomExam') {
            return (
              <>
                {CLASSROOM_EXAM_LESSONS.filter((lesson) =>
                  shouldMountSheet(
                    lesson.globalIndex,
                    activeClassroomExamIdx,
                    `classroom-exam-${lesson.globalIndex}`
                  )
                ).map((lesson) => {
                  const printKey = `classroom-exam-${lesson.globalIndex}`;
                  const hideOnScreen = isSingleView && lesson.globalIndex !== activeClassroomExamIdx;
                  return (
                    <div
                      key={lesson.id}
                      id={`study-classroom-exam-sheet-${lesson.globalIndex}`}
                      data-sheet-idx={lesson.globalIndex}
                      className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                        hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                      } ${
                        singleSheetPrintKey === printKey
                          ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                          : ''
                      }`}
                    >
                      <MobileScaledWorksheetWrapper desktopWidth={1040}>
                        <ClassroomExamSheet
                          lesson={lesson}
                          lang={lang}
                          onPrintSingle={() => handlePrintSingleSheet(printKey)}
                        />
                      </MobileScaledWorksheetWrapper>
                    </div>
                  );
                })}
              </>
            );
          }

          if (studyMode === 'classroomPlay') {
            return (
              <>
                {CLASSROOM_PLAY_SHEETS_META.filter((sheet) =>
                  shouldMountSheet(sheet.idx, activeClassroomPlayIdx, `classroom-play-${sheet.idx}`)
                ).map((sheet) => {
                  const printKey = `classroom-play-${sheet.idx}`;
                  const hideOnScreen = isSingleView && sheet.idx !== activeClassroomPlayIdx;
                  return (
                    <div
                      key={sheet.id}
                      id={`study-classroom-play-sheet-${sheet.idx}`}
                      data-sheet-idx={sheet.idx}
                      className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                        hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                      } ${
                        singleSheetPrintKey === printKey
                          ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                          : ''
                      }`}
                    >
                      <MobileScaledWorksheetWrapper desktopWidth={1040}>
                        <ClassroomPlayDraftSheet
                          sheetIndex={sheet.idx}
                          lang={lang}
                          onPrintSingle={() => handlePrintSingleSheet(printKey)}
                        />
                      </MobileScaledWorksheetWrapper>
                    </div>
                  );
                })}
              </>
            );
          }

          if (studyMode === 'verbExam') {
            return (
              <>
                {VERB_EXAM_LESSONS.filter((lesson) =>
                  shouldMountSheet(
                    lesson.globalIndex,
                    activeVerbExamIdx,
                    `verb-exam-${lesson.globalIndex}`
                  )
                ).map((lesson) => {
                  const printKey = `verb-exam-${lesson.globalIndex}`;
                  const hideOnScreen = isSingleView && lesson.globalIndex !== activeVerbExamIdx;
                  return (
                    <div
                      key={lesson.id}
                      id={`study-verb-exam-sheet-${lesson.globalIndex}`}
                      data-sheet-idx={lesson.globalIndex}
                      className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                        hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                      } ${
                        singleSheetPrintKey === printKey
                          ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                          : ''
                      }`}
                    >
                      <MobileScaledWorksheetWrapper desktopWidth={1040}>
                        <VerbExamSheet
                          lesson={lesson}
                          lang={lang}
                          onPrintSingle={() => handlePrintSingleSheet(printKey)}
                        />
                      </MobileScaledWorksheetWrapper>
                    </div>
                  );
                })}
              </>
            );
          }

          if (studyMode === 'verbPlay') {
            return (
              <>
                {VERB_PLAY_SHEETS_META.filter((sheet) =>
                  shouldMountSheet(sheet.idx, activeVerbPlayIdx, `verb-play-${sheet.idx}`)
                ).map((sheet) => {
                  const printKey = `verb-play-${sheet.idx}`;
                  const hideOnScreen = isSingleView && sheet.idx !== activeVerbPlayIdx;
                  return (
                    <div
                      key={sheet.id}
                      id={`study-verb-play-sheet-${sheet.idx}`}
                      data-sheet-idx={sheet.idx}
                      className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                        hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                      } ${
                        singleSheetPrintKey === printKey
                          ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                          : ''
                      }`}
                    >
                      <MobileScaledWorksheetWrapper desktopWidth={1040}>
                        <VerbPlayDraftSheet
                          sheetIndex={sheet.idx}
                          lang={lang}
                          onPrintSingle={() => handlePrintSingleSheet(printKey)}
                        />
                      </MobileScaledWorksheetWrapper>
                    </div>
                  );
                })}
              </>
            );
          }

          if (studyMode === 'words') {
            return (
              <>
                {VERB_UNIT_META.map((u, idx) => ({ u, idx }))
                  .filter(({ idx }) => shouldMountSheet(idx, activeWordsIdx))
                  .map(({ u, idx }) => {
                    const hideOnScreen = isSingleView && idx !== activeWordsIdx;
                    return (
                      <div
                        key={u.id}
                        id={`study-words-sheet-${idx}`}
                        data-sheet-idx={idx}
                        className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 print:mb-0 ${
                          hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                        }`}
                      >
                        <MobileScaledWorksheetWrapper desktopWidth={1040}>
                          <VerbConjugationWorksheetPage unit={u.id} lang={lang} />
                        </MobileScaledWorksheetWrapper>
                      </div>
                    );
                  })}
              </>
            );
          }

          if (studyMode === 'particle') {
            const particlePool =
              particleSubMode === 'sentence'
                ? PARTICLE_SENTENCE_UNITS
                : PARTICLE_COMBINATION_UNITS;
            return (
              <>
                {particlePool
                  .map((u, idx) => ({ u, idx }))
                  .filter(({ idx }) => shouldMountSheet(idx, activeParticleIdx))
                  .map(({ u, idx }) => {
                    const hideOnScreen = isSingleView && idx !== activeParticleIdx;
                    return (
                      <div
                        key={u.id}
                        id={`study-particle-sheet-${idx}`}
                        data-sheet-idx={idx}
                        className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 print:mb-0 ${
                          hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                        }`}
                      >
                        <MobileScaledWorksheetWrapper desktopWidth={1040}>
                          <ParticleWorksheetPage unit={u.id} lang={lang} />
                        </MobileScaledWorksheetWrapper>
                      </div>
                    );
                  })}
              </>
            );
          }

          // 그림카드, 따라쓰기, 받아쓰기 30개 단원 렌더링
          return CHAPTER_LIST.map((chObj, listIdx) => ({ chObj, listIdx }))
            .filter(({ listIdx }) => shouldMountSheet(listIdx, activeClassroomIdx))
            .map(({ chObj }) => {
              const items = vocabulary.filter((v) => v.ch === chObj.ch);
              const hideOnScreen = isSingleView && chObj.ch !== activeClassroomCh;
              return (
                <div
                  key={chObj.ch}
                  id={`study-sheet-ch-${chObj.ch}`}
                  data-sheet-idx={chObj.ch}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    hideOnScreen ? 'classroom-single-hidden pc-single-sheet-hidden' : ''
                  }`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={990}>
                    {studyMode === 'cards' ? (
                      <PrintableWorksheetPage
                        chapter={chObj}
                        items={items}
                        selectedLangs={customSelectedLangs}
                        interactiveAudio={true}
                      />
                    ) : (
                      <PrintableWordWorksheetPage
                        chapter={chObj}
                        items={items}
                        mode={studyMode === 'quiz' ? 'quiz' : 'writing'}
                        selectedLangs={customSelectedLangs}
                        interactiveAudio={true}
                      />
                    )}
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            });
        })()}

        {/* Mobile Only (< lg): 전체 4영역 1장보기 모드 전용 하단 [앞장 / 뒷장] 간단 이동 버튼 */}
        {isSingleView && !isPrintingTripleSet && (() => {
          let hasPrev = false;
          let hasNext = false;
          let pageIndicator = '';
          let onPrev = () => {};
          let onNext = () => {};

          if (studyMode === 'jamo') {
            const idx = activeJamoIdx;
            const total = JAMO_SHEET_ITEMS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => { if (hasPrev) handleJumpToSheet(idx - 1); };
            onNext = () => { if (hasNext) handleJumpToSheet(idx + 1); };
          } else if (studyMode === 'basic') {
            const idx = activeBasicIdx;
            const total = BASIC_LETTERS_DATA.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => { if (hasPrev) handleJumpToSheet(idx - 1); };
            onNext = () => { if (hasNext) handleJumpToSheet(idx + 1); };
          } else if (studyMode === 'batchim') {
            const idx = activeBatchimIdx;
            const total = BATCHIM_PAGES_DATA.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => { if (hasPrev) handleJumpToSheet(idx - 1); };
            onNext = () => { if (hasNext) handleJumpToSheet(idx + 1); };
          } else if (studyMode === 'hangeulExam') {
            const idx = activeHangeulExamIdx;
            const total = HANGEUL_EXAM_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const opt = HANGEUL_EXAM_OPTIONS[idx - 1];
              setSelectedHangeulExamSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const opt = HANGEUL_EXAM_OPTIONS[idx + 1];
              setSelectedHangeulExamSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
          } else if (studyMode === 'jollaPlay') {
            const idx = activeJollaPlayIdx;
            const total = JOLLA_PLAY_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const opt = JOLLA_PLAY_OPTIONS[idx - 1];
              setSelectedJollaPlaySection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const opt = JOLLA_PLAY_OPTIONS[idx + 1];
              setSelectedJollaPlaySection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
          } else if (studyMode === 'words') {
            const idx = activeWordsIdx;
            const total = WORDS_SECTION_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const opt = WORDS_SECTION_OPTIONS[idx - 1];
              setSelectedWordsSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const opt = WORDS_SECTION_OPTIONS[idx + 1];
              setSelectedWordsSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
          } else if (studyMode === 'verbExam') {
            const idx = activeVerbExamIdx;
            const total = VERB_EXAM_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const opt = VERB_EXAM_OPTIONS[idx - 1];
              setSelectedVerbExamSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const opt = VERB_EXAM_OPTIONS[idx + 1];
              setSelectedVerbExamSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
          } else if (studyMode === 'verbPlay') {
            const idx = activeVerbPlayIdx;
            const total = VERB_PLAY_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const opt = VERB_PLAY_OPTIONS[idx - 1];
              setSelectedVerbPlaySection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const opt = VERB_PLAY_OPTIONS[idx + 1];
              setSelectedVerbPlaySection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
          } else if (studyMode === 'particle') {
            const idx = activeParticleIdx;
            const total = activeParticleOpts.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const opt = activeParticleOpts[idx - 1];
              setSelectedParticleSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const opt = activeParticleOpts[idx + 1];
              setSelectedParticleSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
          } else if (studyMode === 'particleExam') {
            const idx = activeParticleExamIdx;
            const total = PARTICLE_EXAM_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const opt = PARTICLE_EXAM_OPTIONS[idx - 1];
              setSelectedParticleExamSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const opt = PARTICLE_EXAM_OPTIONS[idx + 1];
              setSelectedParticleExamSection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
          } else if (studyMode === 'particlePlay') {
            const idx = activeParticlePlayIdx;
            const total = PARTICLE_PLAY_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const opt = PARTICLE_PLAY_OPTIONS[idx - 1];
              setSelectedParticlePlaySection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const opt = PARTICLE_PLAY_OPTIONS[idx + 1];
              setSelectedParticlePlaySection(opt.id);
              handleJumpToSheet(opt.targetSheet);
            };
          } else if (studyMode === 'classroomExam') {
            const idx = activeClassroomExamIdx;
            const total = CLASSROOM_EXAM_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const prevOpt = CLASSROOM_EXAM_OPTIONS[idx - 1];
              setSelectedClassroomExamSection(prevOpt.id);
              handleJumpToSheet(prevOpt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const nextOpt = CLASSROOM_EXAM_OPTIONS[idx + 1];
              setSelectedClassroomExamSection(nextOpt.id);
              handleJumpToSheet(nextOpt.targetSheet);
            };
          } else if (studyMode === 'classroomPlay') {
            const idx = activeClassroomPlayIdx;
            const total = CLASSROOM_PLAY_OPTIONS.length;
            hasPrev = idx > 0;
            hasNext = idx < total - 1;
            pageIndicator = `${idx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              const prevOpt = CLASSROOM_PLAY_OPTIONS[idx - 1];
              setSelectedClassroomPlaySection(prevOpt.id);
              handleJumpToSheet(prevOpt.targetSheet);
            };
            onNext = () => {
              if (!hasNext) return;
              const nextOpt = CLASSROOM_PLAY_OPTIONS[idx + 1];
              setSelectedClassroomPlaySection(nextOpt.id);
              handleJumpToSheet(nextOpt.targetSheet);
            };
          } else {
            const idx = CHAPTER_LIST.findIndex((c) => c.ch === activeClassroomCh);
            const safeIdx = idx >= 0 ? idx : 0;
            const total = CHAPTER_LIST.length;
            hasPrev = safeIdx > 0;
            hasNext = safeIdx < total - 1;
            pageIndicator = `${safeIdx + 1} / ${total}`;
            onPrev = () => {
              if (!hasPrev) return;
              handleJumpToSheet(CHAPTER_LIST[safeIdx - 1].ch);
            };
            onNext = () => {
              if (!hasNext) return;
              handleJumpToSheet(CHAPTER_LIST[safeIdx + 1].ch);
            };
          }

          const navActiveClass =
            sectionType === 'hangeul'
              ? 'bg-white hover:bg-amber-50 active:scale-95 text-amber-950 border-amber-200 shadow-2xs cursor-pointer'
              : sectionType === 'verb'
              ? 'bg-white hover:bg-purple-50 active:scale-95 text-purple-950 border-purple-200 shadow-2xs cursor-pointer'
              : sectionType === 'particle'
              ? 'bg-white hover:bg-emerald-50 active:scale-95 text-emerald-950 border-emerald-200 shadow-2xs cursor-pointer'
              : 'bg-white hover:bg-rose-50 active:scale-95 text-rose-900 border-rose-200 shadow-2xs cursor-pointer';

          const indicatorColorClass =
            sectionType === 'hangeul'
              ? 'text-amber-900/80'
              : sectionType === 'verb'
              ? 'text-purple-900/80'
              : sectionType === 'particle'
              ? 'text-emerald-900/80'
              : 'text-rose-800/80';

          return (
            <div className="lg:hidden no-print w-full flex items-center justify-center gap-3 pt-1 pb-2 px-3 font-korean-gothic select-none">
              <button
                type="button"
                disabled={!hasPrev}
                onClick={onPrev}
                className={`w-10 h-9 rounded-lg border flex items-center justify-center transition-all ${
                  hasPrev
                    ? navActiveClass
                    : 'bg-white/60 text-slate-300 border-slate-200 cursor-not-allowed'
                }`}
                aria-label="이전 페이지"
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
              </button>

              <span className={`min-w-[54px] text-center text-xs font-extrabold tabular-nums ${indicatorColorClass}`}>
                {pageIndicator}
              </span>

              <button
                type="button"
                disabled={!hasNext}
                onClick={onNext}
                className={`w-10 h-9 rounded-lg border flex items-center justify-center transition-all ${
                  hasNext
                    ? navActiveClass
                    : 'bg-white/60 text-slate-300 border-slate-200 cursor-not-allowed'
                }`}
                aria-label="다음 페이지"
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          );
        })()}

        {/* 각 챕터 학습지 가장 아래: [A4 가로 표지] + [A4 가로 차례] (연속 보기 또는 표지·차례 인쇄 시에만 마운트) */}
        {!isPrintingTripleSet &&
          !isExamOrPlayMode &&
          activePrintRange === null &&
          singleSheetPrintKey === null &&
          (!isSingleView || extraPrintTarget !== null) && (() => {
            const classroomVariant =
              studyMode === 'writing'
                ? 'writing'
                : studyMode === 'quiz'
                ? 'quiz'
                : 'cards';
            const coverSectionLabel =
              sectionType === 'classroom'
                ? classroomVariant === 'writing'
                  ? '교실 한국어 [따라쓰기] 제본용 표지 · 차례 (A4 가로)'
                  : classroomVariant === 'quiz'
                  ? '교실 한국어 [받아쓰기] 제본용 표지 · 차례 (A4 가로)'
                  : '교실 한국어 [그림카드] 제본용 표지 · 차례 (A4 가로)'
                : '챕터 제본용 표지 · 차례 (A4 가로)';
            const hideExtrasClass = isSingleView
              ? 'classroom-single-hidden pc-single-sheet-hidden'
              : '';

            return (
              <>
                <div
                  id="chapter-bottom-extras"
                  className={`no-print w-full max-w-[1040px] mx-auto mt-6 pt-6 border-t-2 border-dashed border-slate-300 scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${hideExtrasClass}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-slate-700 shrink-0" />
                      <div>
                        <div className="text-sm font-black text-slate-900">
                          {coverSectionLabel}
                        </div>
                        <div className="text-xs font-semibold text-slate-500">
                          표지·차례만 골라 바로 인쇄하거나 2장을 한 번에 인쇄할 수 있어요.
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handlePrintChapterExtras('cover')}
                        className="px-2.5 py-1.5 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        표지 인쇄
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePrintChapterExtras('toc')}
                        className="px-2.5 py-1.5 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        차례 인쇄
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePrintChapterExtras('all-extras')}
                        className="px-3 py-1.5 rounded-md text-xs font-black bg-slate-800 hover:bg-slate-900 text-white border border-slate-900 cursor-pointer flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        2장 모두 인쇄
                      </button>
                    </div>
                  </div>
                </div>

                {/* 1) A4 가로 챕터 표지 */}
                <div
                  id={`chapter-cover-sheet-${sectionType}-${classroomVariant}`}
                  className={`study-sheet-wrapper chapter-extra-sheet-wrapper is-first-extra-sheet w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${hideExtrasClass} ${
                    extraPrintTarget === 'all-extras' || extraPrintTarget === 'cover'
                      ? 'is-selected-extra-print'
                      : ''
                  } ${extraPrintTarget === 'cover' ? 'is-single-extra-print' : ''}`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <ChapterCoverSheet
                      track={sectionType}
                      lang={lang}
                      classroomVariant={classroomVariant}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>

                {/* 2) A4 가로 챕터 차례 */}
                <div
                  id={`chapter-toc-sheet-${sectionType}-${classroomVariant}`}
                  className={`study-sheet-wrapper chapter-extra-sheet-wrapper is-last-extra-sheet w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${hideExtrasClass} ${
                    extraPrintTarget === 'all-extras' || extraPrintTarget === 'toc'
                      ? 'is-selected-extra-print'
                      : ''
                  } ${extraPrintTarget === 'toc' ? 'is-single-extra-print' : ''}`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <ChapterTocSheet
                      track={sectionType}
                      lang={lang}
                      classroomVariant={classroomVariant}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>
              </>
            );
          })()}

        {/* 단원별 3종세트 (그림카드 + 쓰기학습지 + 테스트지) 전용 인쇄 컨테이너 */}
        {isPrintingTripleSet && (() => {
          const chObj = CHAPTER_LIST.find(c => c.ch === activeClassroomCh) || CHAPTER_LIST[0];
          const items = vocabulary.filter(v => v.ch === chObj.ch);
          return (
            <div className="triple-print-container w-full">
              <div className="triple-print-item w-full flex flex-col items-center">
                <PrintableWorksheetPage
                  chapter={chObj}
                  items={items}
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={false}
                />
              </div>
              <div className="triple-print-item w-full flex flex-col items-center">
                <PrintableWordWorksheetPage
                  chapter={chObj}
                  items={items}
                  mode="writing"
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={false}
                />
              </div>
              <div className="triple-print-item w-full flex flex-col items-center">
                <PrintableWordWorksheetPage
                  chapter={chObj}
                  items={items}
                  mode="quiz"
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={false}
                />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Floating Scroll-to-Top Button Only (모아보기 플로팅 버튼 제거됨) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="no-print fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-white/95 hover:bg-rose-50 active:scale-95 text-rose-900 border-2 border-rose-300 shadow-[0_6px_20px_rgba(217,74,107,0.22)] flex items-center justify-center transition-all cursor-pointer"
          aria-label="맨 위로 이동"
          title="맨 위로 이동"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* PC PDF-Bookmark TOC Sidebar */}
      <DesktopTocSidebar
        isOpen={Boolean(isTocOpen)}
        onClose={() => onToggleToc?.()}
        title={overviewConfig.title}
        items={overviewConfig.items}
        onSelectItem={(item) => {
          const found = overviewConfig.items.find((i) => i.id === item.id);
          if (found) handleJumpToSheet(found.targetIdx);
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
        onSelectItem={(item) => handleJumpToSheet(item.targetIdx)}
        uiLang={uiLang}
      />
    </div>
  );
};
