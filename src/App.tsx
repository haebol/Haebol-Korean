/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import {
  SupportedLanguage,
  EmergencyCardData,
  LearningTrack,
  LearningMethod,
} from './types';
import { UiLanguage } from './i18n/uiTranslations';
import {
  HeaderAndEmergencyBar,
  DesktopRow2TabItem,
  HeaderPrintMenuMeta,
} from './components/HeaderAndEmergencyBar';
import { EmergencyModal } from './components/EmergencyModal';
import type { StudyMode } from './data/studySheetOptions';
import { StudyTabSection } from './components/StudyTabSection';
import { DEFAULT_HANGEUL_GROUP_ID } from './data/hangeulGroupMeta';
import { VerbUnitType, VERB_UNIT_META } from './data/verbUnitMeta';
import { PARTICLE_UNIT_META, ParticleUnitId } from './data/particleUnitMeta';
import type { ParticleGameUnitId } from './components/GamesSection';
import { RealtimeVoiceModal } from './components/RealtimeVoiceModal';
import { MainLearningNav } from './components/MainLearningNav';
import { playCutePop } from './utils/audio';
import { useAdminCurriculumConfig } from './utils/adminCurriculumConfig';
import type { WebPrintRequest } from './utils/printReadiness';

const StudySection = lazy(() =>
  import('./components/StudySection').then((m) => ({ default: m.StudySection }))
);
const GamesSection = lazy(() =>
  import('./components/GamesSection').then((m) => ({ default: m.GamesSection }))
);
const TeacherAdminStudioModal = lazy(() =>
  import('./components/TeacherAdminStudioModal').then((m) => ({
    default: m.TeacherAdminStudioModal,
  }))
);
const StickmanBonusModal = lazy(() =>
  import('./components/StickmanBonusModal').then((m) => ({
    default: m.StickmanBonusModal,
  }))
);

const LazySectionFallback = () => (
  <div className="w-full py-16 flex flex-col items-center justify-center gap-2.5 text-purple-700/70">
    <div className="w-7 h-7 rounded-full border-2 border-purple-200 border-t-purple-600 animate-spin" />
    <span className="text-xs font-bold font-korean-gothic">불러오는 중...</span>
  </div>
);

const getDefaultStudyModeForTrack = (
  track: 'hangeul' | 'classroom' | 'verb' | 'particle'
): StudyMode => {
  if (track === 'hangeul') return 'jamo';
  if (track === 'classroom') return 'cards';
  if (track === 'particle') return 'particle';
  return 'words';
};

export default function App() {
  const [adminConfig] = useAdminCurriculumConfig();
  const [uiLang, setUiLang] = useState<UiLanguage>('ko');
  const [translationLang, setTranslationLang] = useState<SupportedLanguage>('en');
  const currentLang = translationLang;

  const handleUiLanguageChange = (nextLang: UiLanguage) => {
    setUiLang(nextLang);
    if (nextLang !== 'ko') {
      setTranslationLang(nextLang);
    }
  };
  // 홈페이지 최초 진입 시: [용언 > 플래시카드 > 용언활용 10단원] 바로 표시
  const [activeTrack, setActiveTrack] = useState<LearningTrack>('verb');
  const [activeMethod, setActiveMethod] = useState<LearningMethod>('flashcard');
  const [activeStudyMode, setActiveStudyMode] = useState<StudyMode>('words');
  const [activeParticleSubMode, setActiveParticleSubMode] = useState<'combination' | 'sentence'>('combination');

  // PC Twin Header & Control Bar states (PC lg+ only; mobile untouched)
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isTocSidebarOpen, setIsTocSidebarOpen] = useState(false);
  const [worksheetViewMode, setWorksheetViewMode] = useState<'single' | 'continuous'>('single');
  const [coverTocTrigger, setCoverTocTrigger] = useState(0);

  const [selectedHangeulGroupId, setSelectedHangeulGroupId] = useState<string>(
    DEFAULT_HANGEUL_GROUP_ID
  );
  const [selectedVerbUnit, setSelectedVerbUnit] = useState<VerbUnitType>('unit10');
  const [selectedParticleUnit, setSelectedParticleUnit] = useState<ParticleUnitId>('unit1');
  const [selectedParticleGameUnit, setSelectedParticleGameUnit] = useState<ParticleGameUnitId>('unit1');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [activeEmergencyCard, setActiveEmergencyCard] = useState<EmergencyCardData | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isTeacherAdminOpen, setIsTeacherAdminOpen] = useState(false);
  const [isTeacherAuthed, setIsTeacherAuthed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('haebol_teacher_authed') === '1';
    } catch {
      return false;
    }
  });
  const [isStickmanModalOpen, setIsStickmanModalOpen] = useState(false);
  const [headerPrintTrigger, setHeaderPrintTrigger] = useState(0);
  const [webPrintRequest, setWebPrintRequest] = useState<WebPrintRequest | null>(null);
  const [worksheetFocusTrigger, setWorksheetFocusTrigger] = useState(0);
  const [lastMainTrack, setLastMainTrack] = useState<'hangeul' | 'classroom' | 'verb' | 'particle'>('verb');

  // Escape key exits PC focus mode
  useEffect(() => {
    if (!isFocusMode) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFocusMode]);

  const handleSelectTrack = (track: LearningTrack) => {
    if (track === 'exam' || track === 'play') {
      setActiveMethod('worksheet');
      setWorksheetFocusTrigger((prev) => prev + 1);
      setActiveTrack(track);
      return;
    }
    setLastMainTrack(track);
    setActiveTrack(track);
    setActiveStudyMode(getDefaultStudyModeForTrack(track));
    if (track === 'particle') {
      setActiveParticleSubMode('combination');
    }
  };

  const handleSelectMethod = (method: LearningMethod) => {
    if (method === 'worksheet') {
      setWorksheetFocusTrigger((prev) => prev + 1);
    } else if (activeTrack === 'exam' || activeTrack === 'play') {
      setActiveTrack(lastMainTrack);
    }
    setActiveMethod(method);
  };

  const selectDesktopWorksheetSubMode = (
    mode: StudyMode,
    particleSub?: 'combination' | 'sentence'
  ) => {
    if (activeTrack === 'exam' || activeTrack === 'play') {
      setActiveTrack(lastMainTrack);
    }
    setActiveMethod('worksheet');
    setActiveStudyMode(mode);
    if (particleSub) {
      setActiveParticleSubMode(particleSub);
    }
    setWorksheetFocusTrigger((prev) => prev + 1);
  };

  const handleToggleContinuousView = () => {
    if (activeMethod !== 'worksheet') {
      if (activeTrack === 'exam' || activeTrack === 'play') {
        setActiveTrack(lastMainTrack);
      }
      setActiveMethod('worksheet');
      setWorksheetViewMode('continuous');
      return;
    }
    setWorksheetViewMode((prev) => {
      const next = prev === 'single' ? 'continuous' : 'single';
      if (next === 'single') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return next;
    });
  };

  const handleJumpCoverToc = () => {
    if (activeMethod !== 'worksheet') {
      if (activeTrack === 'exam' || activeTrack === 'play') {
        setActiveTrack(lastMainTrack);
      }
      setActiveMethod('worksheet');
      window.setTimeout(() => {
        setCoverTocTrigger((prev) => prev + 1);
      }, 160);
      return;
    }
    setCoverTocTrigger((prev) => prev + 1);
  };

  const baseMainTrack: 'hangeul' | 'classroom' | 'verb' | 'particle' =
    activeTrack === 'exam' || activeTrack === 'play' ? lastMainTrack : activeTrack;

  const desktopRow2Tabs = useMemo<DesktopRow2TabItem[]>(() => {
    const examLocked = adminConfig.lockedMenus['menu:exam'] !== false && !isTeacherAuthed;
    const playLocked = adminConfig.lockedMenus['menu:play'] !== false && !isTeacherAuthed;

    if (baseMainTrack === 'hangeul') {
      return [
        {
          id: 'hangeul-flashcard',
          label: '1. 플래시카드',
          isActive: activeMethod === 'flashcard',
          onClick: () => handleSelectMethod('flashcard'),
        },
        {
          id: 'hangeul-game',
          label: '2. 게임',
          isActive: activeMethod === 'game',
          onClick: () => handleSelectMethod('game'),
        },
        {
          id: 'hangeul-jamo',
          label: '자음모음',
          group: 'worksheet',
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'jamo',
          onClick: () => selectDesktopWorksheetSubMode('jamo'),
        },
        {
          id: 'hangeul-basic',
          label: '기본글자',
          group: 'worksheet',
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'basic',
          onClick: () => selectDesktopWorksheetSubMode('basic'),
        },
        {
          id: 'hangeul-batchim',
          label: '받침글자',
          group: 'worksheet',
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'batchim',
          onClick: () => selectDesktopWorksheetSubMode('batchim'),
        },
        {
          id: 'hangeul-exam',
          label: '시험',
          group: 'worksheet',
          locked: examLocked,
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'hangeulExam',
          onClick: () => selectDesktopWorksheetSubMode('hangeulExam'),
        },
        {
          id: 'hangeul-play',
          label: '놀이',
          group: 'worksheet',
          locked: playLocked,
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'jollaPlay',
          onClick: () => selectDesktopWorksheetSubMode('jollaPlay'),
        },
      ];
    }

    if (baseMainTrack === 'classroom') {
      return [
        {
          id: 'classroom-flashcard',
          label: '1. 플래시카드',
          isActive: activeMethod === 'flashcard',
          onClick: () => handleSelectMethod('flashcard'),
        },
        {
          id: 'classroom-game',
          label: '2. 게임',
          isActive: activeMethod === 'game',
          onClick: () => handleSelectMethod('game'),
        },
        {
          id: 'classroom-cards',
          label: '그림카드',
          group: 'worksheet',
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'cards',
          onClick: () => selectDesktopWorksheetSubMode('cards'),
        },
        {
          id: 'classroom-writing',
          label: '따라쓰기',
          group: 'worksheet',
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'writing',
          onClick: () => selectDesktopWorksheetSubMode('writing'),
        },
        {
          id: 'classroom-quiz',
          label: '받아쓰기',
          group: 'worksheet',
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'quiz',
          onClick: () => selectDesktopWorksheetSubMode('quiz'),
        },
        {
          id: 'classroom-exam',
          label: '시험',
          group: 'worksheet',
          locked: examLocked,
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'classroomExam',
          onClick: () => selectDesktopWorksheetSubMode('classroomExam'),
        },
        {
          id: 'classroom-play',
          label: '놀이',
          group: 'worksheet',
          locked: playLocked,
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'classroomPlay',
          onClick: () => selectDesktopWorksheetSubMode('classroomPlay'),
        },
      ];
    }

    if (baseMainTrack === 'particle') {
      return [
        {
          id: 'particle-flashcard',
          label: '1. 플래시카드',
          isActive: activeMethod === 'flashcard',
          onClick: () => handleSelectMethod('flashcard'),
        },
        {
          id: 'particle-game',
          label: '2. 게임',
          isActive: activeMethod === 'game',
          onClick: () => handleSelectMethod('game'),
        },
        {
          id: 'particle-combination',
          label: '조사 결합',
          group: 'worksheet',
          isActive:
            activeMethod === 'worksheet' &&
            activeStudyMode === 'particle' &&
            activeParticleSubMode === 'combination',
          onClick: () => selectDesktopWorksheetSubMode('particle', 'combination'),
        },
        {
          id: 'particle-sentence',
          label: '문장 만들기',
          group: 'worksheet',
          isActive:
            activeMethod === 'worksheet' &&
            activeStudyMode === 'particle' &&
            activeParticleSubMode === 'sentence',
          onClick: () => selectDesktopWorksheetSubMode('particle', 'sentence'),
        },
        {
          id: 'particle-exam',
          label: '시험',
          group: 'worksheet',
          locked: examLocked,
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'particleExam',
          onClick: () => selectDesktopWorksheetSubMode('particleExam'),
        },
        {
          id: 'particle-play',
          label: '놀이',
          group: 'worksheet',
          locked: playLocked,
          isActive: activeMethod === 'worksheet' && activeStudyMode === 'particlePlay',
          onClick: () => selectDesktopWorksheetSubMode('particlePlay'),
        },
      ];
    }

    // verb
    return [
      {
        id: 'verb-flashcard',
        label: '1. 플래시카드',
        isActive: activeMethod === 'flashcard',
        onClick: () => handleSelectMethod('flashcard'),
      },
      {
        id: 'verb-game',
        label: '2. 게임',
        isActive: activeMethod === 'game',
        onClick: () => handleSelectMethod('game'),
      },
      {
        id: 'verb-words',
        label: '용언 활용',
        group: 'worksheet',
        isActive: activeMethod === 'worksheet' && activeStudyMode === 'words',
        onClick: () => selectDesktopWorksheetSubMode('words'),
      },
      {
        id: 'verb-exam',
        label: '시험',
        group: 'worksheet',
        locked: examLocked,
        isActive: activeMethod === 'worksheet' && activeStudyMode === 'verbExam',
        onClick: () => selectDesktopWorksheetSubMode('verbExam'),
      },
      {
        id: 'verb-play',
        label: '놀이',
        group: 'worksheet',
        locked: playLocked,
        isActive: activeMethod === 'worksheet' && activeStudyMode === 'verbPlay',
        onClick: () => selectDesktopWorksheetSubMode('verbPlay'),
      },
    ];
  }, [baseMainTrack, activeMethod, activeStudyMode, activeParticleSubMode, isTeacherAuthed, adminConfig.lockedMenus]);

  const [savedWords, setSavedWords] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('haebol_saved_words');
      return stored ? JSON.parse(stored) : ['화장실', '물', '도와주세요', '선생님'];
    } catch {
      return ['화장실', '물', '도와주세요', '선생님'];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('haebol_saved_words', JSON.stringify(savedWords));
    } catch {
      // Ignore localStorage quota errors
    }
  }, [savedWords]);

  const dispatchWebPrintRequest = (req: Omit<WebPrintRequest, 'id'>) => {
    const nextReq: WebPrintRequest = {
      ...req,
      id: Date.now() + Math.floor(Math.random() * 1000),
    };
    if (activeMethod === 'worksheet') {
      setWebPrintRequest(nextReq);
    } else {
      handleSelectMethod('worksheet');
      window.setTimeout(() => {
        setWebPrintRequest(nextReq);
      }, 280);
    }
  };

  const handleHeaderPrint = () => {
    dispatchWebPrintRequest({ type: 'current' });
  };

  const printMenuMeta = useMemo<HeaderPrintMenuMeta>(() => {
    if (baseMainTrack === 'hangeul') {
      if (activeStudyMode === 'basic') {
        return {
          sectionLabel: '한글 · 기본글자',
          currentLabel: '현재 선택 기본글자 1쪽',
          unitSuffix: '쪽',
          totalCount: 21,
        };
      }
      if (activeStudyMode === 'batchim') {
        return {
          sectionLabel: '한글 · 받침글자',
          currentLabel: '현재 선택 받침글자 1쪽',
          unitSuffix: '쪽',
          totalCount: 15,
        };
      }
      if (activeStudyMode === 'hangeulExam') {
        return {
          sectionLabel: '한글 · 시험',
          currentLabel: '현재 선택 시험지 1강',
          unitSuffix: '강',
          totalCount: 20,
        };
      }
      if (activeStudyMode === 'jollaPlay') {
        return {
          sectionLabel: '한글 · 놀이',
          currentLabel: '현재 선택 놀이 학습지 1장',
          unitSuffix: '종',
          totalCount: 10,
        };
      }
      return {
        sectionLabel: '한글 · 자음모음',
        currentLabel: '현재 선택 자음·모음 1쪽',
        unitSuffix: '쪽',
        totalCount: 15,
      };
    }

    if (baseMainTrack === 'classroom') {
      if (activeStudyMode === 'classroomExam') {
        return {
          sectionLabel: '교실한국어 · 시험',
          currentLabel: '현재 선택 종합 시험 1강',
          unitSuffix: '강',
          totalCount: 6,
        };
      }
      if (activeStudyMode === 'classroomPlay') {
        return {
          sectionLabel: '교실한국어 · 놀이',
          currentLabel: '현재 선택 놀이 학습지 1장',
          unitSuffix: '종',
          totalCount: 5,
        };
      }
      const modeName =
        activeStudyMode === 'writing'
          ? '따라쓰기'
          : activeStudyMode === 'quiz'
          ? '받아쓰기'
          : '그림카드';
      return {
        sectionLabel: `교실한국어 · ${modeName}`,
        currentLabel: `${selectedChapter}단원 ${modeName}`,
        unitSuffix: '단원',
        totalCount: 30,
        supportsTripleSet: true,
      };
    }

    if (baseMainTrack === 'particle') {
      if (activeStudyMode === 'particleExam') {
        return {
          sectionLabel: '조사 · 시험',
          currentLabel: '현재 선택 종합 시험 1강',
          unitSuffix: '강',
          totalCount: 6,
        };
      }
      if (activeStudyMode === 'particlePlay') {
        return {
          sectionLabel: '조사 · 놀이',
          currentLabel: '현재 선택 놀이 학습지 1장',
          unitSuffix: '종',
          totalCount: 5,
        };
      }
      if (activeParticleSubMode === 'sentence') {
        return {
          sectionLabel: '조사 · 문장 만들기',
          currentLabel: '현재 선택 문장 만들기 1장',
          unitSuffix: '단원',
          totalCount: 8,
        };
      }
      return {
        sectionLabel: '조사 · 조사 결합',
        currentLabel: '현재 선택 조사 단원 1장',
        unitSuffix: '단원',
        totalCount: PARTICLE_UNIT_META.length,
      };
    }

    // verb
    if (activeStudyMode === 'verbExam') {
      return {
        sectionLabel: '용언 · 시험',
        currentLabel: '현재 선택 종합 시험 1강',
        unitSuffix: '강',
        totalCount: 6,
      };
    }
    if (activeStudyMode === 'verbPlay') {
      return {
        sectionLabel: '용언 · 놀이',
        currentLabel: '현재 선택 놀이 학습지 1장',
        unitSuffix: '종',
        totalCount: 5,
      };
    }
    return {
      sectionLabel: '용언 · 용언 활용',
      currentLabel: '현재 선택 용언 단원 1장',
      unitSuffix: '단원',
      totalCount: VERB_UNIT_META.length,
    };
  }, [baseMainTrack, activeStudyMode, activeParticleSubMode, selectedChapter]);

  const handleToggleSave = (ko: string) => {
    setSavedWords(prev =>
      prev.includes(ko) ? prev.filter(w => w !== ko) : [...prev, ko]
    );
  };

  const [showLegacyDomainBanner, setShowLegacyDomainBanner] = useState(false);

  // Redirect legacy hbkorean.ai.studio visitors (including iframe-wrapped views) to haebol.com
  useEffect(() => {
    try {
      const host = window.location.hostname.toLowerCase();
      const isDirectLegacy = host === 'hbkorean.ai.studio' || host === 'www.hbkorean.ai.studio';
      let isFramedLegacy = false;
      if (window.top !== window.self) {
        try {
          const refHost = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : '';
          if (refHost === 'hbkorean.ai.studio' || refHost === 'www.hbkorean.ai.studio') {
            isFramedLegacy = true;
          }
        } catch {
          // Ignore invalid referrer
        }
        const origins = window.location.ancestorOrigins;
        if (!isFramedLegacy && origins && origins.length > 0) {
          for (let i = 0; i < origins.length; i += 1) {
            try {
              const oHost = new URL(origins[i]).hostname.toLowerCase();
              if (oHost === 'hbkorean.ai.studio' || oHost === 'www.hbkorean.ai.studio') {
                isFramedLegacy = true;
                break;
              }
            } catch {
              // Ignore invalid origin
            }
          }
        }
      }

      if (isDirectLegacy || isFramedLegacy) {
        const target = `https://haebol.com${window.location.pathname}${window.location.search}${window.location.hash}`;
        setShowLegacyDomainBanner(true);
        try {
          if (window.top && window.top !== window.self) {
            window.top.location.replace(target);
          } else {
            window.location.replace(target);
          }
        } catch {
          // Cross-origin iframe prevented top navigation; keep fallback banner visible
        }
      }
    } catch {
      // Ignore navigation errors
    }
  }, []);

  const selectedVerbUnitIndex = VERB_UNIT_META.findIndex(u => u.id === selectedVerbUnit);
  const selectedParticleUnitIndex = PARTICLE_UNIT_META.findIndex(u => u.id === selectedParticleUnit);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F3F8] lg:bg-[#FFF5F8] text-slate-800 font-sans">
      {showLegacyDomainBanner && (
        <div className="no-print bg-rose-600 text-white px-3 py-2 text-center text-xs sm:text-sm font-bold flex flex-wrap items-center justify-center gap-2">
          <span>해볼한국어 주소가 새 도메인(haebol.com)으로 이사했습니다.</span>
          <a
            href="https://haebol.com"
            target="_top"
            rel="noopener noreferrer"
            className="underline font-black bg-white text-rose-700 px-2.5 py-0.5 rounded-md hover:bg-rose-50 transition-colors"
          >
            haebol.com 바로가기 →
          </a>
        </div>
      )}

      {/* PC Full-Screen Focus Mode Floating Restore Button */}
      {isFocusMode && (
        <button
          type="button"
          onClick={() => {
            playCutePop();
            setIsFocusMode(false);
          }}
          className="hidden lg:flex fixed top-3 right-4 z-[60] no-print items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#3B1668]/85 hover:bg-[#3B1668] backdrop-blur-md text-white border border-white/25 shadow-lg text-xs font-extrabold cursor-pointer transition-all font-korean-gothic"
          title="상단 3행 메뉴 다시 표시 (ESC)"
        >
          <X className="w-3.5 h-3.5 shrink-0" />
          <span>집중 해제</span>
        </button>
      )}

      {/* Row 1 (Deep Plum Top Bar) + Row 2 (Desktop Rounded Pill Sub-Menu Bar) */}
      <div className={isFocusMode ? 'lg:hidden' : ''}>
        <HeaderAndEmergencyBar
          currentLang={currentLang}
          uiLang={uiLang}
          activeTrack={activeTrack}
          onSelectTrack={handleSelectTrack}
          activeMethod={activeMethod}
          onSelectMethod={handleSelectMethod}
          onLanguageChange={handleUiLanguageChange}
          onSelectEmergencyCard={setActiveEmergencyCard}
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          onOpenStickmanBonus={() => setIsStickmanModalOpen(true)}
          onOpenTeacherAdmin={() => setIsTeacherAdminOpen(true)}
          onGoHome={() => {
            setLastMainTrack('verb');
            setActiveTrack('verb');
            setActiveMethod('flashcard');
            setActiveStudyMode('words');
            setSelectedVerbUnit('unit10');
            setSelectedParticleUnit('unit1');
            setSelectedParticleGameUnit('unit1');
            setSelectedChapter(1);
          }}
          onPrint={handleHeaderPrint}
          onPrintRequest={dispatchWebPrintRequest}
          printMenuMeta={printMenuMeta}
          blogBundleUrl={adminConfig.blogBundleUrl}
          desktopRow2Tabs={desktopRow2Tabs}
        />
      </div>

      {/* Main Content Workspace */}
      <main className={`flex-1 w-full flex flex-col pb-2 sm:pb-4 ${isFocusMode ? 'lg:pt-3 pt-0' : 'pt-0'}`}>
        <div className="w-full flex flex-col gap-0">
          {/* Mobile Track & Mode Nav (< lg only) */}
          <MainLearningNav
            activeTrack={activeTrack}
            onSelectTrack={handleSelectTrack}
            activeMethod={activeMethod}
            onSelectMethod={handleSelectMethod}
            currentLang={uiLang}
            onLanguageChange={handleUiLanguageChange}
            onOpenStickmanBonus={() => setIsStickmanModalOpen(true)}
          />

          {/* Method 1: 플래시카드 (한글 / 교실한국어 / 용언 / 조사) */}
          {activeMethod === 'flashcard' && (
            <StudyTabSection
              activeTrack={baseMainTrack}
              lang={currentLang}
              uiLang={uiLang}
              savedWords={savedWords}
              onToggleSave={handleToggleSave}
              selectedChapter={selectedChapter}
              onSelectChapter={setSelectedChapter}
              selectedHangeulGroupId={selectedHangeulGroupId}
              onSelectHangeulGroupId={setSelectedHangeulGroupId}
              selectedVerbUnit={selectedVerbUnit}
              onSelectVerbUnit={setSelectedVerbUnit}
              selectedParticleUnit={selectedParticleUnit}
              onSelectParticleUnit={setSelectedParticleUnit}
              onLanguageChange={handleUiLanguageChange}
              activeMethod={activeMethod}
              onSelectMethod={handleSelectMethod}
              isTocOpen={isTocSidebarOpen}
              onToggleToc={() => setIsTocSidebarOpen((prev) => !prev)}
              onToggleContinuous={handleToggleContinuousView}
              onJumpCoverToc={handleJumpCoverToc}
              isFocusMode={isFocusMode}
              onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
            />
          )}

          {/* Method 2: 학습지 & 부록 시험/놀이 (한글 / 교실한국어 / 용언 / 조사 + 시험 / 놀이) */}
          {activeMethod === 'worksheet' && (
            <Suspense fallback={<LazySectionFallback />}>
              <StudySection
                sectionType={activeTrack}
                lang={currentLang}
                uiLang={uiLang}
                selectedChapter={selectedChapter}
                onSelectChapter={setSelectedChapter}
                selectedHangeulGroupId={selectedHangeulGroupId}
                selectedVerbUnitIndex={selectedVerbUnitIndex >= 0 ? selectedVerbUnitIndex : 0}
                selectedParticleUnitIndex={selectedParticleUnitIndex >= 0 ? selectedParticleUnitIndex : 0}
                activeMethod={activeMethod}
                onSelectMethod={handleSelectMethod}
                isTeacherAuthed={isTeacherAuthed}
                headerPrintTrigger={headerPrintTrigger}
                webPrintRequest={webPrintRequest}
                coverTocTrigger={coverTocTrigger}
                worksheetFocusTrigger={worksheetFocusTrigger}
                controlledStudyMode={activeStudyMode}
                onStudyModeChange={setActiveStudyMode}
                controlledParticleSubMode={activeParticleSubMode}
                onParticleSubModeChange={setActiveParticleSubMode}
                worksheetViewMode={worksheetViewMode}
                onSetWorksheetViewMode={setWorksheetViewMode}
                isTocOpen={isTocSidebarOpen}
                onToggleToc={() => setIsTocSidebarOpen((prev) => !prev)}
                onToggleContinuous={handleToggleContinuousView}
                isFocusMode={isFocusMode}
                onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
              />
            </Suspense>
          )}

          {/* Method 3: 게임 (한글 / 교실한국어 / 용언 / 조사) */}
          {activeMethod === 'game' && (
            <Suspense fallback={<LazySectionFallback />}>
              <GamesSection
                track={baseMainTrack}
                lang={currentLang}
                uiLang={uiLang}
                selectedChapter={selectedChapter}
                onSelectChapter={setSelectedChapter}
                selectedHangeulGroupId={selectedHangeulGroupId}
                onSelectHangeulGroupId={setSelectedHangeulGroupId}
                selectedVerbUnit={selectedVerbUnit}
                onSelectVerbUnit={setSelectedVerbUnit}
                selectedParticleUnit={selectedParticleGameUnit}
                onSelectParticleUnit={setSelectedParticleGameUnit}
                onSwitchTrackMethod={(t, m) => {
                  handleSelectTrack(t);
                  handleSelectMethod(m);
                }}
                activeMethod={activeMethod}
                onSelectMethod={handleSelectMethod}
                isTocOpen={isTocSidebarOpen}
                onToggleToc={() => setIsTocSidebarOpen((prev) => !prev)}
                onToggleContinuous={handleToggleContinuousView}
                onJumpCoverToc={handleJumpCoverToc}
                isFocusMode={isFocusMode}
                onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
              />
            </Suspense>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`mt-2 sm:mt-8 border-t border-[#E4E1EE] lg:border-pink-200/80 bg-[#F4F3F8] lg:bg-[#FFF5F8] py-2.5 sm:py-4 px-3 sm:px-4 text-center no-print ${
          isFocusMode ? 'lg:hidden' : ''
        }`}
      >
        <div className="max-w-[1080px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-sm text-[#3B1668]">
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-0.5">
            <span className="font-bold text-rose-950 font-korean-gothic">해볼한국어</span>
            <span className="font-semibold text-[#3B1668]">haebol.com</span>
            <span className="text-[#3B1668]/50">|</span>
            <span className="font-medium text-rose-950 font-korean-gothic">다국어로 배우는 쉬운 한국어</span>
          </div>
        </div>
      </footer>

      {/* Emergency Full-Screen Polite Modal */}
      <AnimatePresence>
        {activeEmergencyCard && (
          <EmergencyModal
            card={activeEmergencyCard}
            onClose={() => setActiveEmergencyCard(null)}
            lang={currentLang}
          />
        )}
      </AnimatePresence>

      {/* Real-time Voice Two-Way Communication Modal */}
      <RealtimeVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        lang={currentLang}
      />

      {/* Teacher-Only Admin Studio Modal (Opened secretly via double-click or long-press on '해볼 한국어' logo) */}
      {isTeacherAdminOpen && (
        <Suspense fallback={null}>
          <TeacherAdminStudioModal
            isOpen={isTeacherAdminOpen}
            onClose={() => setIsTeacherAdminOpen(false)}
            onAuthChange={setIsTeacherAuthed}
          />
        </Suspense>
      )}

      {/* Stickman Hangeul Simulation Bonus Modal */}
      <AnimatePresence>
        {isStickmanModalOpen && (
          <Suspense fallback={null}>
            <StickmanBonusModal
              isOpen={isStickmanModalOpen}
              onClose={() => setIsStickmanModalOpen(false)}
              lang={currentLang}
              uiLang={uiLang}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
