import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  RefreshCw,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Trophy,
  Flame,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UiLanguage, GAMES_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import {
  VERB_UNIT_META,
  VERB_CARDS_BY_UNIT,
  VerbUnitType,
  VerbCardItem,
} from './VerbConjugationSection';
import { buildVerbEndingQuestion, VerbEndingQuestion } from '../utils/verbConjugationUtils';
import {
  speakKorean,
  playCutePop,
  playSuccessChime,
  playApplauseFanfare,
  playBeethovenFateMemeSound,
} from '../utils/audio';
import {
  ManduBadgeTier,
  ManduBadgeGraphic,
  GameBadgeAlbumButton,
  GameBadgeAndHallOfFameModal,
  recordManduBadgeClear,
} from '../utils/gameBadges';

interface VerbManduCookingGameSectionProps {
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  selectedUnit?: VerbUnitType;
  onSelectUnit?: (unit: VerbUnitType) => void;
  hideUnitBar?: boolean;
}

type ManduExpression = 'idle' | 'happy' | 'fever' | 'wince' | 'burnt';

interface DragState {
  option: string;
  paletteIdx: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  isDragging: boolean;
  isOverTarget: boolean;
}

interface FloatingSlot {
  id: string;
  posClass: string;
  baseRotate: number;
  bobY: number[];
  bobX: number[];
  duration: number;
}

const BEST_SCORE_STORAGE_KEY = 'haebol_mandu_best_score';
const COMPLETED_MANDU_STORAGE_KEY = 'haebol_mandu_completed_count';

const FLOATING_SLOTS: FloatingSlot[] = [
  {
    id: 'sky-1',
    posClass: '-translate-y-0.5 sm:-translate-y-1.5',
    baseRotate: -7,
    bobY: [0, -4, 0, 3, 0],
    bobX: [0, 3, 0, -2, 0],
    duration: 3.6,
  },
  {
    id: 'sky-2',
    posClass: 'translate-y-0.5 sm:translate-y-1.5',
    baseRotate: 5,
    bobY: [0, 4, 0, -3, 0],
    bobX: [0, -3, 0, 2, 0],
    duration: 3.9,
  },
  {
    id: 'sky-3',
    posClass: '-translate-y-0.5 sm:-translate-y-1.5',
    baseRotate: -4,
    bobY: [0, -3, 0, 3, 0],
    bobX: [0, 2, 0, -3, 0],
    duration: 3.8,
  },
  {
    id: 'sky-4',
    posClass: 'translate-y-0.5 sm:translate-y-1.5',
    baseRotate: 7,
    bobY: [0, 3, 0, -4, 0],
    bobX: [0, -2, 0, 3, 0],
    duration: 4.0,
  },
];

const SHAKER_PALETTES = [
  { body: '#FFFBEB', cap: '#CBD5E1', collar: '#94A3B8', labelBg: '#FFFFFF', accent: '#7E22CE' },
  { body: '#F3E8FF', cap: '#D8B4FE', collar: '#9333EA', labelBg: '#FFFFFF', accent: '#581C87' },
  { body: '#FFE4E6', cap: '#FDA4AF', collar: '#E11D48', labelBg: '#FFFFFF', accent: '#9F1239' },
  { body: '#E0F2FE', cap: '#93C5FD', collar: '#2563EB', labelBg: '#FFFFFF', accent: '#1E3A8A' },
];

const MAX_COOK_STEPS = 5;
const MAX_BURN_STEPS = 3;

function limitToThreeOptions(q: VerbEndingQuestion): VerbEndingQuestion {
  const distractors = q.options.filter((o) => o !== q.correctOption).slice(0, 2);
  const options = [q.correctOption, ...distractors].sort(() => 0.5 - Math.random());
  return { ...q, options };
}

function readStoredNumber(key: string): number {
  try {
    if (typeof window === 'undefined') return 0;
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  } catch {
    return 0;
  }
}

function writeStoredNumber(key: string, value: number) {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, String(value));
    }
  } catch {
    // ignore storage errors
  }
}

const ShakerBottleGraphic: React.FC<{
  label: string;
  paletteIdx: number;
  disabled?: boolean;
  isPouring?: boolean;
}> = ({ label, paletteIdx, disabled = false, isPouring = false }) => {
  const pal = SHAKER_PALETTES[paletteIdx % SHAKER_PALETTES.length];
  return (
    <div
      className={`relative flex flex-col items-center select-none ${
        disabled ? 'grayscale opacity-55' : ''
      }`}
    >
      {/* Metallic perforated shaker cap */}
      <div
        className="w-9 sm:w-12 h-3.5 sm:h-4.5 rounded-t-full border-2 border-slate-700 flex items-center justify-center gap-1 shadow-xs"
        style={{ backgroundColor: pal.cap }}
      >
        <span className="w-1 h-1 rounded-full bg-slate-700" />
        <span className="w-1 h-1 rounded-full bg-slate-700" />
        <span className="w-1 h-1 rounded-full bg-slate-700" />
      </div>

      {/* Neck Collar */}
      <div
        className="w-11 sm:w-13 h-1.5 sm:h-2 border-x-2 border-slate-700"
        style={{ backgroundColor: pal.collar }}
      />

      {/* Curved Glass / Ceramic Bottle Body */}
      <div
        className="relative min-w-[78px] sm:min-w-[106px] px-2.5 sm:px-3.5 py-1 sm:py-2 rounded-t-xl rounded-b-[1.35rem] border-2 border-slate-700 shadow-md flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: pal.body }}
      >
        <div className="pointer-events-none absolute top-1.5 left-1.5 bottom-2 w-1.5 rounded-full bg-white/75" />

        <div className="pointer-events-none absolute bottom-1 inset-x-2 flex justify-center gap-1 opacity-40">
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="w-1 h-1 rounded-full bg-slate-400" />
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="w-1 h-1 rounded-full bg-slate-400" />
        </div>

        <span
          className={`relative z-10 px-2 py-0.5 rounded-md font-black text-sm sm:text-base whitespace-nowrap shadow-xs border border-slate-300/80 ${
            disabled ? 'line-through text-slate-400' : ''
          }`}
          style={{
            backgroundColor: pal.labelBg,
            color: disabled ? undefined : pal.accent,
          }}
        >
          {label}
        </span>
      </div>

      {isPouring && (
        <div className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 flex gap-1 text-amber-500 font-black text-sm animate-bounce">
          <span>✦</span>
          <span>•</span>
          <span>✦</span>
        </div>
      )}
    </div>
  );
};

export const VerbManduCookingGameSection: React.FC<VerbManduCookingGameSectionProps> = ({
  lang,
  uiLang = 'ko',
  selectedUnit: propUnit,
  onSelectUnit,
}) => {
  const [internalUnit, setInternalUnit] = useState<VerbUnitType>(propUnit || 'unit1');
  const activeUnit = propUnit ?? internalUnit;
  const gameUi = (GAMES_UI[uiLang] || GAMES_UI.ko).mandu;

  const currentUnitMeta = useMemo(
    () => VERB_UNIT_META.find((u) => u.id === activeUnit) || VERB_UNIT_META[0],
    [activeUnit]
  );

  const [queue, setQueue] = useState<VerbCardItem[]>([]);
  const [queueIdx, setQueueIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<VerbEndingQuestion | null>(null);
  const [assignedSlots, setAssignedSlots] = useState<FloatingSlot[]>([]);

  const [cookedCount, setCookedCount] = useState(0); // 0..5 total correct answers (does NOT reset on wrong answer)
  const [burnCount, setBurnCount] = useState(0); // 0..3 mistakes
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState<number>(() => readStoredNumber(BEST_SCORE_STORAGE_KEY));
  const [completedMandus, setCompletedMandus] = useState<number>(() =>
    readStoredNumber(COMPLETED_MANDU_STORAGE_KEY)
  );

  const [sessionCookedItems, setSessionCookedItems] = useState<VerbCardItem[]>([]);
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedbackState, setFeedbackState] = useState<{
    type: 'correct' | 'wrong';
    text: string;
    points?: number;
    sampleSentence?: string;
    meaning?: string;
    reasonText?: string;
  } | null>(null);

  const [manduStatus, setManduStatus] = useState<'none' | 'cooked' | 'burnt'>('none');
  const [wincePulse, setWincePulse] = useState(false);
  const [happyPulse, setHappyPulse] = useState(false);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const potStageRef = useRef<HTMLDivElement | null>(null);
  const audioTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const winceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const happyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uidSuffix = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  const [levelUpModal, setLevelUpModal] = useState<{
    clearedUnitId: VerbUnitType;
    cookedItems: VerbCardItem[];
    tier: ManduBadgeTier;
    mistakes: number;
    newlyUnlockedTrophyMilestone: number | null;
  } | null>(null);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  const isFever = streak >= 2 && manduStatus === 'none';

  const clearAllTimers = useCallback(() => {
    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (winceTimerRef.current) clearTimeout(winceTimerRef.current);
    if (happyTimerRef.current) clearTimeout(happyTimerRef.current);
  }, []);

  const pickRandomSlots = useCallback((count: number): FloatingSlot[] => {
    const cornerPool = FLOATING_SLOTS.slice(0, 4);
    if (count <= 4) {
      return [...cornerPool].sort(() => 0.5 - Math.random()).slice(0, count);
    }
    return [...FLOATING_SLOTS].sort(() => 0.5 - Math.random()).slice(0, count);
  }, []);

  const buildShuffledDeck = useCallback((unitId: VerbUnitType): VerbCardItem[] => {
    const cards = VERB_CARDS_BY_UNIT[unitId] || VERB_CARDS_BY_UNIT.unit1;
    const shuffled = [...cards].sort(() => 0.5 - Math.random());
    if (shuffled.length < 15) {
      return [...shuffled, ...cards, ...cards].sort(() => 0.5 - Math.random());
    }
    return shuffled;
  }, []);

  const startNewMandu = useCallback(
    (unitId: VerbUnitType, resetScoreAndStreak = false) => {
      clearAllTimers();
      const deck = buildShuffledDeck(unitId);

      setQueue(deck);
      setQueueIdx(0);
      setCookedCount(0);
      setBurnCount(0);
      setManduStatus('none');
      setSessionCookedItems([]);
      setWrongAttempts([]);
      setIsAnswered(false);
      setFeedbackState(null);
      setWincePulse(false);
      setHappyPulse(false);
      setDragState(null);
      setLevelUpModal(null);

      if (resetScoreAndStreak) {
        setStreak(0);
        setScore(0);
      }

      if (deck[0]) {
        const q = limitToThreeOptions(buildVerbEndingQuestion(unitId, deck[0]));
        setCurrentQuestion(q);
        setAssignedSlots(pickRandomSlots(q.options.length));
        audioTimerRef.current = setTimeout(() => {
          speakKorean(deck[0].baseWord, 0.88);
        }, 240);
      } else {
        setCurrentQuestion(null);
      }
    },
    [buildShuffledDeck, clearAllTimers, pickRandomSlots]
  );

  useEffect(() => {
    startNewMandu(activeUnit, false);
    return () => {
      clearAllTimers();
    };
  }, [activeUnit, clearAllTimers, startNewMandu]);

  const loadNextQuestion = useCallback(
    (nextIndex: number, currentQueue: VerbCardItem[]) => {
      let workingQueue = currentQueue;
      let idx = nextIndex;
      if (idx >= workingQueue.length) {
        workingQueue = buildShuffledDeck(activeUnit);
        setQueue(workingQueue);
        idx = 0;
      }
      setQueueIdx(idx);
      const nextCard = workingQueue[idx];
      if (nextCard) {
        const q = limitToThreeOptions(buildVerbEndingQuestion(activeUnit, nextCard));
        setCurrentQuestion(q);
        setAssignedSlots(pickRandomSlots(q.options.length));
        setWrongAttempts([]);
        setIsAnswered(false);
        setFeedbackState(null);
        audioTimerRef.current = setTimeout(() => {
          speakKorean(nextCard.baseWord, 0.88);
        }, 180);
      }
    },
    [activeUnit, buildShuffledDeck, pickRandomSlots]
  );

  const handleSelectOption = useCallback(
    (option: string) => {
      if (!currentQuestion || isAnswered || manduStatus !== 'none') return;
      if (wrongAttempts.includes(option)) return;

      const currentMeaning =
        currentQuestion.card.meanings[lang] || currentQuestion.card.meanings.en || '';

      if (option === currentQuestion.correctOption) {
        playSuccessChime();
        setIsAnswered(true);

        const nextStreak = streak + 1;
        const pointsEarned = nextStreak >= 3 ? 200 : nextStreak === 2 ? 150 : 100;
        const nextScore = score + pointsEarned;
        const nextCooked = cookedCount + 1;
        const nextSessionItems = [...sessionCookedItems, currentQuestion.card];

        setStreak(nextStreak);
        setScore(nextScore);
        if (nextScore > bestScore) {
          setBestScore(nextScore);
          writeStoredNumber(BEST_SCORE_STORAGE_KEY, nextScore);
        }

        setCookedCount(nextCooked);
        setSessionCookedItems(nextSessionItems);
        setHappyPulse(true);
        if (happyTimerRef.current) clearTimeout(happyTimerRef.current);
        happyTimerRef.current = setTimeout(() => setHappyPulse(false), 1100);

        setFeedbackState({
          type: 'correct',
          text: currentQuestion.card.conjugatedWord,
          points: pointsEarned,
          sampleSentence: currentQuestion.card.sampleSentence,
          meaning: currentMeaning,
        });

        speakKorean(currentQuestion.card.conjugatedWord, 0.88);

        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
        if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);

        feedbackTimerRef.current = setTimeout(() => {
          setFeedbackState(null);
        }, 1150);

        if (nextCooked >= MAX_COOK_STEPS) {
          advanceTimerRef.current = setTimeout(() => {
            playApplauseFanfare();
            try {
              confetti({
                particleCount: 110,
                spread: 85,
                origin: { y: 0.5 },
                colors: ['#FDE68A', '#F59E0B', '#9333EA', '#FB7185', '#FFFFFF'],
              });
            } catch {
              // ignore
            }
            const nextCompleted = completedMandus + 1;
            setCompletedMandus(nextCompleted);
            writeStoredNumber(COMPLETED_MANDU_STORAGE_KEY, nextCompleted);
            const badgeOutcome = recordManduBadgeClear(activeUnit, burnCount);
            setManduStatus('cooked');
            setLevelUpModal({
              clearedUnitId: activeUnit,
              cookedItems: nextSessionItems,
              tier: badgeOutcome.tier,
              mistakes: burnCount,
              newlyUnlockedTrophyMilestone: badgeOutcome.newlyUnlockedTrophyMilestone,
            });
          }, 1400);
        } else {
          advanceTimerRef.current = setTimeout(() => {
            loadNextQuestion(queueIdx + 1, queue);
          }, 1400);
        }
      } else {
        // 틀려도 cookedCount(맞힌 횟수)는 유지! 총 5번 맞히면 완성 (3번 틀리면 타버림)
        playBeethovenFateMemeSound();
        const nextBurn = burnCount + 1;
        setWrongAttempts((prev) => [...prev, option]);
        setStreak(0);
        setBurnCount(nextBurn);
        setWincePulse(true);
        if (winceTimerRef.current) clearTimeout(winceTimerRef.current);
        winceTimerRef.current = setTimeout(() => setWincePulse(false), 820);

        const reasonText =
          currentQuestion.optionHints?.[option] ||
          `${gameUi.wrongMsg} (${currentUnitMeta.grammar} 규칙을 확인해 보세요!)`;

        setFeedbackState({
          type: 'wrong',
          text: gameUi.wrongMsg,
          reasonText,
        });

        if (nextBurn >= MAX_BURN_STEPS) {
          setIsAnswered(true);
          advanceTimerRef.current = setTimeout(() => {
            setManduStatus('burnt');
          }, 600);
        }
      }
    },
    [
      currentQuestion,
      isAnswered,
      manduStatus,
      wrongAttempts,
      lang,
      streak,
      score,
      cookedCount,
      sessionCookedItems,
      bestScore,
      completedMandus,
      activeUnit,
      loadNextQuestion,
      queueIdx,
      queue,
      burnCount,
      gameUi.wrongMsg,
      currentUnitMeta.grammar,
    ]
  );

  // Pointer-based Drag-and-Drop (Works seamlessly on Mobile Touch & Desktop Mouse)
  const checkIsOverPotTarget = (clientX: number, clientY: number): boolean => {
    const el = potStageRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const pad = 26;
    return (
      clientX >= rect.left - pad &&
      clientX <= rect.right + pad &&
      clientY >= rect.top - pad &&
      clientY <= rect.bottom + pad
    );
  };

  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e: PointerEvent) => {
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      const dist = Math.hypot(dx, dy);
      const nowDragging = dragState.isDragging || dist >= 8;
      const overTarget = nowDragging ? checkIsOverPotTarget(e.clientX, e.clientY) : false;

      setDragState((prev) =>
        prev
          ? {
              ...prev,
              x: e.clientX,
              y: e.clientY,
              isDragging: nowDragging,
              isOverTarget: overTarget,
            }
          : null
      );
    };

    const handlePointerUp = (e: PointerEvent) => {
      const dx = e.clientX - dragState.startX;
      const dy = e.clientY - dragState.startY;
      const dist = Math.hypot(dx, dy);
      const isTap = dist < 8;
      const droppedOnTarget = checkIsOverPotTarget(e.clientX, e.clientY);

      const optionToSubmit = dragState.option;
      setDragState(null);

      if (isTap || droppedOnTarget) {
        handleSelectOption(optionToSubmit);
      }
    };

    const handlePointerCancel = () => {
      setDragState(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, [dragState, handleSelectOption]);

  const handleGoToNextUnit = () => {
    playCutePop();
    setLevelUpModal(null);
    const curIdx = VERB_UNIT_META.findIndex((u) => u.id === activeUnit);
    const nextMeta = VERB_UNIT_META[(curIdx + 1) % VERB_UNIT_META.length];
    if (onSelectUnit) onSelectUnit(nextMeta.id);
    else setInternalUnit(nextMeta.id);
  };

  const manduExpression: ManduExpression =
    manduStatus === 'burnt' || burnCount >= MAX_BURN_STEPS
      ? 'burnt'
      : wincePulse
      ? 'wince'
      : isFever
      ? 'fever'
      : happyPulse || manduStatus === 'cooked'
      ? 'happy'
      : 'idle';

  const currentMeaning =
    currentQuestion?.card.meanings[lang] || currentQuestion?.card.meanings.en || '';

  const isManduBurnt = manduStatus === 'burnt' || burnCount >= MAX_BURN_STEPS;
  const burnOpacity =
    burnCount >= MAX_BURN_STEPS ? 1 : burnCount === 2 ? 0.78 : burnCount === 1 ? 0.42 : 0;
  const manduScale =
    manduExpression === 'burnt'
      ? 0.84
      : 0.72 + cookedCount * 0.144 + (isFever ? 0.06 : 0);

  const multiplierLabel = streak >= 3 ? '×2 FEVER' : streak === 2 ? '×1.5 COMBO' : null;

  return (
    <div className="w-full max-w-4xl lg:max-w-full mx-auto font-korean-gothic select-none">
      {/* MAIN KITCHEN STAGE (모든 점수·게이지를 플레이박스 내부에 컴팩트하게 배치) */}
      <div
        className={`relative h-[400px] sm:h-[500px] rounded-lg bg-[#FAF7FF] ${
          isFever
            ? 'border-amber-400 shadow-lg'
            : 'border-purple-200 shadow-md'
        } border-2 p-2 sm:p-3 overflow-hidden flex flex-col items-center justify-between gap-0.5 sm:gap-1 transition-colors duration-300`}
      >
        {/* DECORATIVE WHITE KITCHEN UTENSILS */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none" aria-hidden="true">
          <svg
            viewBox="0 0 64 96"
            className="w-10 h-16 sm:w-14 sm:h-20 absolute left-2 sm:left-7 top-[44%] -rotate-12 drop-shadow-sm opacity-95"
            fill="none"
          >
            <circle cx="32" cy="11" r="3.5" fill="#FFF8F2" stroke="#CBD5E1" strokeWidth="2" />
            <rect x="28.5" y="7" width="7" height="54" rx="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <ellipse cx="32" cy="70" rx="18" ry="15" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.2" />
            <path d="M21 67C23 73 30 76 38 74" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <svg
            viewBox="0 0 64 96"
            className="w-10 h-16 sm:w-14 sm:h-20 absolute right-2 sm:right-7 top-[43%] rotate-12 drop-shadow-sm opacity-95"
            fill="none"
          >
            <rect x="28.5" y="7" width="7" height="42" rx="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="32" cy="12" r="2" fill="#CBD5E1" />
            <path
              d="M17 48C17 45 19.5 43 22.5 43H41.5C44.5 43 47 45 47 48L50 82C50.3 85 48 87.5 45 87.5H19C16 87.5 13.7 85 14 82L17 48Z"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <line x1="25" y1="53" x2="24" y2="78" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="32" y1="53" x2="32" y2="78" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="39" y1="53" x2="40" y2="78" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
          </svg>

          <svg
            viewBox="0 0 56 96"
            className="w-9 h-14 sm:w-12 sm:h-18 absolute left-3 sm:left-16 bottom-[19%] rotate-[16deg] drop-shadow-sm opacity-95"
            fill="none"
          >
            <rect x="24.5" y="45" width="7" height="43" rx="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            <path
              d="M15 11V32C15 41 21 47 28 47C35 47 41 41 41 32V11"
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <line x1="15" y1="11" x2="15" y2="28" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <path d="M15 10V31C15 40 21 46 28 46C35 46 41 40 41 31V10" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="23.5" y1="10" x2="23.5" y2="30" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="32.5" y1="10" x2="32.5" y2="30" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Fever Background Sparkles */}
        {isFever && !isManduBurnt && (
          <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-between px-6 text-amber-400/70">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <Sparkles className="w-7 h-7 animate-bounce" />
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        )}

        {/* TOP SYMMETRIC CORNER INSTRUCTIONS + TOP-CENTER BADGE ALBUM BUTTON + WORD CUE */}
        <div className="relative z-20 w-full flex flex-col gap-0.5 sm:gap-1 shrink-0">
          <div className="w-full grid grid-cols-[1fr_auto_1fr] items-start gap-1.5 sm:gap-4 px-1 pt-0 sm:pt-0.5 pb-0">
            <div className="flex justify-start pt-0.5 sm:pt-1">
              <p className="font-badasseugi text-xs sm:text-sm font-bold text-purple-950 leading-snug text-left break-keep -rotate-3 origin-center select-none">
                {gameUi.guideLine1}
                {gameUi.guideLine2 && (
                  <>
                    <br />
                    {gameUi.guideLine2}
                  </>
                )}
              </p>
            </div>

            <GameBadgeAlbumButton
              onClick={() => setIsBadgeModalOpen(true)}
              title="내 앨범"
            />

            <div className="flex justify-end pt-0.5 sm:pt-1">
              <p className="font-badasseugi text-xs sm:text-sm font-bold text-purple-900 leading-snug text-right break-keep rotate-3 origin-center select-none">
                {gameUi.dragHint}
              </p>
            </div>
          </div>

          {currentQuestion && manduStatus === 'none' ? (
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  speakKorean(currentQuestion.card.baseWord, 0.88);
                }}
                className="bg-white/95 hover:bg-purple-50 border border-slate-300 text-slate-800 px-2.5 py-0.5 text-xs sm:text-sm font-bold rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                title="기본형 발음 다시 듣기"
              >
                <Volume2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>
                  {currentQuestion.card.baseWord} ({currentMeaning})
                </span>
              </button>

              {currentQuestion.cueBadge && (
                <span className="bg-purple-100 border border-purple-300 text-purple-900 px-2.5 py-0.5 text-xs font-black rounded-md">
                  {currentQuestion.cueBadge}
                </span>
              )}
            </div>
          ) : (
            <div className="h-3 sm:h-5" />
          )}
        </div>

        {/* FLOATING SEASONING SHAKERS ZONE */}
        {currentQuestion && manduStatus === 'none' ? (
          <div className="relative z-20 w-full min-h-[44px] sm:min-h-[72px] flex items-center justify-center gap-2 sm:gap-6 flex-wrap py-0.5 px-1">
            {currentQuestion.options.map((opt, idx) => {
              const slot = assignedSlots[idx] || FLOATING_SLOTS[idx % FLOATING_SLOTS.length];
              const isWrong = wrongAttempts.includes(opt);
              const isThisDragging = dragState?.isDragging && dragState.option === opt;

              return (
                <motion.div
                  key={`${currentQuestion.unitId}-${currentQuestion.card.id}-${opt}-${idx}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: isThisDragging ? 0.35 : 1,
                    scale: isThisDragging ? 0.9 : 1,
                    y: isWrong ? 0 : slot.bobY,
                    x: isWrong ? 0 : slot.bobX,
                    rotate: isWrong
                      ? slot.baseRotate
                      : [slot.baseRotate - 3, slot.baseRotate + 3, slot.baseRotate - 3],
                  }}
                  transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.25 },
                    y: { duration: slot.duration, repeat: Infinity, ease: 'easeInOut' },
                    x: { duration: slot.duration * 1.15, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: slot.duration * 1.3, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  className={slot.posClass}
                >
                  <button
                    type="button"
                    disabled={isWrong || isAnswered}
                    onPointerDown={(e) => {
                      if (isWrong || isAnswered) return;
                      e.preventDefault();
                      setDragState({
                        option: opt,
                        paletteIdx: idx,
                        startX: e.clientX,
                        startY: e.clientY,
                        x: e.clientX,
                        y: e.clientY,
                        isDragging: false,
                        isOverTarget: false,
                      });
                    }}
                    style={{ touchAction: 'none' }}
                    className={`bg-transparent border-0 p-0 focus:outline-none transition-transform ${
                      isWrong
                        ? 'cursor-not-allowed'
                        : 'cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95'
                    }`}
                    title={isWrong ? '틀린 양념' : `${opt} 양념을 만두 냄비로 드래그하거나 누르세요!`}
                  >
                    <ShakerBottleGraphic
                      label={opt}
                      paletteIdx={idx}
                      disabled={isWrong}
                    />
                  </button>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="h-8 sm:h-12" />
        )}

        {/* CENTER DROP ZONE: Giant Haebol Mandu + White Pot + Fire + Desktop Flanking Scores */}
        <div className="relative z-20 w-full flex items-end justify-center gap-3 sm:gap-5">
          {/* Left Flank Scoreboard on sm+ (inside playbox next to pot) */}
          <div className="hidden sm:flex flex-col items-center gap-1 bg-white/95 border border-purple-200 rounded-lg px-3 py-2 shadow-2xs mb-4 tabular-nums min-w-[92px]">
            <span className="flex items-center gap-1 text-[11px] font-black text-purple-900 whitespace-nowrap">
              <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>점수</span>
            </span>
            <span className="text-base font-black text-purple-950 leading-none">{score}</span>
            <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">최고 {bestScore}</span>
          </div>

          <div
            ref={potStageRef}
            className={`relative z-20 w-[230px] sm:w-[310px] flex flex-col items-center pt-0 pb-0.5 transition-transform ${
              dragState?.isDragging && dragState.isOverTarget ? 'scale-[1.03]' : ''
            }`}
          >
            {/* Rising Steam or Dark Burnt Smoke */}
            <div className="relative h-2.5 sm:h-4 w-44 flex justify-around items-end pointer-events-none">
              {isManduBurnt ? (
                <>
                  <motion.span
                    animate={{ y: [2, -14, -22], opacity: [0.35, 0.9, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="text-base sm:text-lg grayscale contrast-200"
                  >
                    💨
                  </motion.span>
                  <motion.span
                    animate={{ y: [4, -16, -24], opacity: [0.4, 0.95, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                    className="text-lg sm:text-xl grayscale contrast-200"
                  >
                    💨
                  </motion.span>
                  <motion.span
                    animate={{ y: [2, -14, -22], opacity: [0.35, 0.9, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: 0.6 }}
                    className="text-base sm:text-lg grayscale contrast-200"
                  >
                    💨
                  </motion.span>
                </>
              ) : burnCount >= 1 && burnCount < MAX_BURN_STEPS ? (
                <>
                  <motion.span
                    animate={{ y: [4, -12, -20], opacity: [0.2, 0.85, 0] }}
                    transition={{ duration: 1.3, repeat: Infinity }}
                    className="text-base sm:text-lg"
                  >
                    💨
                  </motion.span>
                  <motion.span
                    animate={{ y: [4, -14, -22], opacity: [0.25, 0.9, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity, delay: 0.35 }}
                    className="text-lg sm:text-xl"
                  >
                    💨
                  </motion.span>
                </>
              ) : (
                <>
                  <motion.span
                    animate={{ y: [4, -10, -18], opacity: [0, 0.7, 0] }}
                    transition={{ duration: isFever ? 1.1 : 1.9, repeat: Infinity, delay: 0 }}
                    className="text-base sm:text-lg"
                  >
                    💨
                  </motion.span>
                  <motion.span
                    animate={{ y: [6, -12, -20], opacity: [0, 0.85, 0] }}
                    transition={{ duration: isFever ? 0.95 : 1.7, repeat: Infinity, delay: 0.45 }}
                    className="text-lg sm:text-xl"
                  >
                    ♨️
                  </motion.span>
                  <motion.span
                    animate={{ y: [4, -10, -18], opacity: [0, 0.7, 0] }}
                    transition={{ duration: isFever ? 1.1 : 1.9, repeat: Infinity, delay: 0.9 }}
                    className="text-base sm:text-lg"
                  >
                    💨
                  </motion.span>
                </>
              )}
            </div>

            {/* GROWING HAEBOL MANDU CHARACTER */}
            <motion.div
              animate={{
                scale: manduScale,
                y:
                  manduExpression === 'burnt'
                    ? 4
                    : manduExpression === 'wince'
                    ? [0, -2, 2, -2, 0]
                    : isFever
                    ? [0, -6, 0]
                    : [0, -3, 0],
                rotate:
                  manduExpression === 'wince'
                    ? [-5, 5, -4, 4, 0]
                    : isFever
                    ? [-2, 2, -2]
                    : 0,
              }}
              transition={{
                scale: { type: 'spring', stiffness: 250, damping: 17 },
                y:
                  manduExpression === 'wince'
                    ? { duration: 0.45 }
                    : { duration: isFever ? 0.9 : 2.4, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: isFever ? 0.8 : 0.45, repeat: isFever ? Infinity : 0 },
              }}
              className="relative z-20 -mb-4 sm:-mb-5 origin-bottom"
            >
              <svg
                className="w-15 h-13 sm:w-28 sm:h-24 overflow-visible"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="해볼 만두 요리 캐릭터"
              >
                <defs>
                  <radialGradient id={`cleanDough_${uidSuffix}`} cx="45%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="55%" stopColor="#FFFFFF" />
                    <stop offset="85%" stopColor="#F8FAFC" />
                    <stop offset="100%" stopColor="#F1F5F9" />
                  </radialGradient>

                  <radialGradient id={`manduSun_${uidSuffix}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFF385" />
                    <stop offset="55%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#D97706" />
                  </radialGradient>
                </defs>

                <path
                  d="M60 22C42 22 24 34 19 55C14 74 22 96 42 103C54 107 72 107 86 101C102 94 108 72 103 54C97 34 78 22 60 22Z"
                  fill={`url(#cleanDough_${uidSuffix})`}
                  stroke="#CBD5E1"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {burnCount > 0 && (
                  <path
                    d="M60 22C42 22 24 34 19 55C14 74 22 96 42 103C54 107 72 107 86 101C102 94 108 72 103 54C97 34 78 22 60 22Z"
                    fill={isManduBurnt ? '#18181B' : '#78350F'}
                    opacity={burnOpacity}
                    stroke={isManduBurnt ? '#09090B' : '#5C2D16'}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                )}

                {isManduBurnt && (
                  <g opacity="0.55">
                    <circle cx="36" cy="44" r="4.5" fill="#09090B" />
                    <circle cx="84" cy="46" r="5" fill="#09090B" />
                    <circle cx="62" cy="92" r="4" fill="#09090B" />
                    <circle cx="44" cy="86" r="3" fill="#27272A" />
                  </g>
                )}

                <path
                  d="M48 24C44 14 54 12 59 20C63 12 73 14 69 24"
                  stroke={isManduBurnt ? '#09090B' : burnCount >= 1 ? '#5C2D16' : '#94A3B8'}
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill={isManduBurnt ? '#18181B' : burnCount >= 1 ? '#78350F' : '#FFFFFF'}
                />
                <path d="M38 31C39 22 47 21 51 27" stroke={isManduBurnt ? '#09090B' : burnCount >= 1 ? '#5C2D16' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M68 27C72 21 80 22 81 31" stroke={isManduBurnt ? '#09090B' : burnCount >= 1 ? '#5C2D16' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round" />
                <path d="M58 20L60 27" stroke={isManduBurnt ? '#09090B' : burnCount >= 1 ? '#5C2D16' : '#94A3B8'} strokeWidth="2.5" strokeLinecap="round" />

                {manduExpression !== 'burnt' && (
                  <>
                    <ellipse cx="38" cy="73" rx="8.5" ry="5.5" fill="#F87171" opacity={isFever ? 0.65 : 0.45} />
                    <ellipse cx="84" cy="73" rx="8.5" ry="5.5" fill="#F87171" opacity={isFever ? 0.65 : 0.45} />
                  </>
                )}

                {manduExpression === 'burnt' ? (
                  <>
                    <path d="M39 57L49 67 M49 57L39 67" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
                    <path d="M73 57L83 67 M83 57L73 67" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
                    <path d="M48 80Q54 73 60 80Q66 87 72 80" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </>
                ) : manduExpression === 'wince' ? (
                  <>
                    <path d="M38 56L48 62L38 67" stroke="#261A14" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M84 56L74 62L84 67" stroke="#261A14" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M49 79Q55 72 60 77Q65 72 71 79" stroke="#7F1D1D" strokeWidth="3" strokeLinecap="round" fill="none" />
                  </>
                ) : manduExpression === 'fever' ? (
                  <>
                    <path d="M37 64C40 54 48 54 51 64" stroke="#261A14" strokeWidth="3.4" strokeLinecap="round" fill="none" />
                    <path d="M71 64C74 54 82 54 85 64" stroke="#261A14" strokeWidth="3.4" strokeLinecap="round" fill="none" />
                    <path d="M46 69C46 86 76 86 76 69Z" fill="#881337" />
                    <path d="M51 77C56 72 66 72 71 77C66 83 56 83 51 77Z" fill="#FB7185" />
                  </>
                ) : manduExpression === 'happy' ? (
                  <>
                    <path d="M38 63C41 56 47 56 50 63" stroke="#261A14" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                    <path d="M72 63C75 56 81 56 84 63" stroke="#261A14" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                    <path d="M50 70C50 84 72 84 72 70Z" fill="#881337" />
                    <path d="M54 76C58 72 64 72 68 76C64 80 58 80 54 76Z" fill="#FB7185" />
                  </>
                ) : (
                  <>
                    <ellipse cx="44" cy="61" rx="5.8" ry="6.4" fill="#261A14" />
                    <circle cx="42" cy="58.5" r="2.2" fill="#FFFFFF" />
                    <circle cx="46" cy="63.5" r="1.2" fill="#FFFFFF" />
                    <ellipse cx="78" cy="61" rx="5.8" ry="6.4" fill="#261A14" />
                    <circle cx="76" cy="58.5" r="2.2" fill="#FFFFFF" />
                    <circle cx="80" cy="63.5" r="1.2" fill="#FFFFFF" />
                    <path d="M52 70C52 82 70 82 70 70Z" fill="#881337" />
                    <path d="M55 75C58 71 64 71 67 75C64 79 58 79 55 75Z" fill="#FB7185" />
                  </>
                )}

                <g>
                  <circle cx="26" cy="82" r="10.5" fill={`url(#manduSun_${uidSuffix})`} stroke="#D97706" strokeWidth="1.2" />
                  <circle cx="22.8" cy="80.5" r="1.2" fill="#451A03" />
                  <circle cx="29.2" cy="80.5" r="1.2" fill="#451A03" />
                  <path d="M24 84C25 85.8 27 85.8 28 84" stroke="#451A03" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                <path
                  d="M32 88C29 89 25 89 23 86C21 83 23 80 26 80C30 80 33 83 35 87Z"
                  fill={isManduBurnt ? '#18181B' : burnCount >= 1 ? '#78350F' : '#FFFFFF'}
                  stroke={isManduBurnt ? '#09090B' : burnCount >= 1 ? '#5C2D16' : '#94A3B8'}
                  strokeWidth="1.7"
                />
                <ellipse
                  cx="94"
                  cy="80"
                  rx="5"
                  ry="6"
                  fill={isManduBurnt ? '#18181B' : burnCount >= 1 ? '#78350F' : '#FFFFFF'}
                  stroke={isManduBurnt ? '#09090B' : burnCount >= 1 ? '#5C2D16' : '#94A3B8'}
                  strokeWidth="1.7"
                />
              </svg>
            </motion.div>

            {/* ALL-WHITE POT WITH CLEAN OUTLINE */}
            <div className="relative z-10 w-full">
              <div className="absolute -left-3.5 sm:-left-4 top-3.5 w-4 sm:w-5 h-7 border-2 border-slate-700 rounded-l-xl bg-white z-0" />
              <div className="absolute -right-3.5 sm:-right-4 top-3.5 w-4 sm:w-5 h-7 border-2 border-slate-700 rounded-r-xl bg-white z-0" />
              <div className="relative z-10 h-3 sm:h-3.5 bg-white border-2 border-slate-700 rounded-t-md shadow-2xs" />

              <div className="relative z-10 bg-white border-2 border-t-0 border-slate-700 rounded-b-3xl px-2.5 sm:px-4 pt-1.5 sm:pt-2 pb-1.5 sm:pb-2.5 shadow-md flex flex-col items-center justify-center">
                {currentQuestion && manduStatus === 'none' && (
                  <div className="w-full px-1 py-0.5 flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap font-nanum-barun-gothic font-bold">
                    <div className="min-w-[64px] sm:min-w-[82px] h-9 sm:h-11 px-2 sm:px-2.5 bg-[#F4F7FA] border-2 border-slate-300 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold text-slate-900 font-nanum-barun-gothic">
                      {currentQuestion.stemDisplay}
                    </div>

                    <span className="text-lg sm:text-xl font-bold text-purple-600 font-nanum-barun-gothic">+</span>

                    <div
                      className={`min-w-[68px] sm:min-w-[88px] h-9 sm:h-11 px-2 sm:px-2.5 rounded-lg flex items-center justify-center text-base sm:text-lg font-bold font-nanum-barun-gothic transition-all ${
                        feedbackState?.type === 'correct'
                          ? 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700'
                          : dragState?.isOverTarget
                          ? 'bg-purple-100 border-2 border-dashed border-purple-600 text-purple-800 scale-105'
                          : 'bg-[#FAF5FF] border-2 border-dashed border-purple-400 text-purple-600'
                      }`}
                    >
                      {feedbackState?.type === 'correct' ? (
                        <span>{currentQuestion.correctOption}</span>
                      ) : (
                        <span className="text-xl sm:text-2xl">?</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Wrong grammatical explanation inside pot (text-only without box/border) */}
                <AnimatePresence mode="wait">
                  {feedbackState?.type === 'wrong' && manduStatus === 'none' && (
                    <motion.div
                      key={`${feedbackState.text}-${wrongAttempts.length}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-1.5 w-full px-1 text-[11px] sm:text-xs font-bold font-nanum-barun-gothic text-center text-rose-700 space-y-0.5"
                    >
                      <div className="flex items-center justify-center gap-1 font-black text-rose-600">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>왜 틀렸을까?</span>
                      </div>
                      <p className="leading-snug break-keep text-rose-800 font-bold">
                        {feedbackState.reasonText}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cooked / Burnt State Overlay inside Pot */}
                {manduStatus === 'cooked' && (
                  <div className="w-full bg-purple-50 border-2 border-purple-300 rounded-lg p-2.5 text-center space-y-2">
                    <p className="text-sm sm:text-base font-black text-purple-950">
                      {gameUi.clearBanner}
                    </p>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={handleGoToNextUnit}
                        className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs sm:text-sm font-black rounded-md cursor-pointer flex items-center gap-1"
                      >
                        <span>{gameUi.nextUnitBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playCutePop();
                          startNewMandu(activeUnit, false);
                        }}
                        className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 text-xs sm:text-sm font-black rounded-md cursor-pointer flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{gameUi.nextManduBtn}</span>
                      </button>
                    </div>
                  </div>
                )}

                {manduStatus === 'burnt' && (
                  <div className="w-full bg-stone-50 border-2 border-stone-400 rounded-lg p-2.5 text-center space-y-2 shadow-sm">
                    <p className="text-sm sm:text-base font-black text-stone-800">
                      {gameUi.burntTitle}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        startNewMandu(activeUnit, false);
                      }}
                      className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs sm:text-sm font-black rounded-md cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{gameUi.retryManduBtn}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* STOVE FLAMES UNDER THE POT */}
              <div className="mt-0.5 flex items-center justify-center gap-1.5 sm:gap-2 h-4 sm:h-5 pointer-events-none">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <motion.span
                    key={idx}
                    animate={{
                      y: isFever ? [0, -5, 0] : [0, -2, 0],
                      scale: isFever ? [1.15, 1.35, 1.15] : [0.95, 1.08, 0.95],
                      opacity: isManduBurnt ? 0.35 : 1,
                    }}
                    transition={{
                      duration: isFever ? 0.35 : 0.65,
                      repeat: Infinity,
                      delay: idx * 0.08,
                    }}
                    className="text-sm sm:text-lg leading-none"
                  >
                    🔥
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Flank Completed Mandu & Combo on sm+ (inside playbox next to pot) */}
          <div className="hidden sm:flex flex-col items-center gap-1 bg-white/95 border border-purple-200 rounded-lg px-3 py-2 shadow-2xs mb-4 tabular-nums min-w-[92px]">
            <span className="text-[11px] font-black text-purple-900 whitespace-nowrap">🥟 완성</span>
            <span className="text-base font-black text-purple-950 leading-none">{completedMandus}개</span>
            {multiplierLabel ? (
              <span className="px-1.5 py-0.5 bg-amber-100 border border-amber-400 text-amber-900 rounded text-[10px] font-black flex items-center gap-0.5 whitespace-nowrap">
                <Flame className="w-3 h-3 text-amber-600 shrink-0" />
                <span>{multiplierLabel}</span>
              </span>
            ) : (
              <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">5개 완성</span>
            )}
          </div>
        </div>

        {/* COMPACT BOTTOM AREA INSIDE PLAYBOX: Mobile Score Row + Growth & Burn Gauges */}
        <div className="relative z-20 w-full max-w-2xl mx-auto mt-0 sm:mt-0.5 space-y-1 shrink-0">
          {/* Mobile-only ultra-compact 1-line score strip inside playbox */}
          <div className="flex sm:hidden items-center justify-center gap-2.5 text-[11px] font-black text-purple-950 bg-white/90 border border-purple-200 px-2 py-0.5 rounded-md tabular-nums">
            <span className="flex items-center gap-0.5 whitespace-nowrap">
              <Trophy className="w-3 h-3 text-amber-500 shrink-0" />
              <span>점수 {score}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600 whitespace-nowrap">최고 {bestScore}</span>
            <span className="text-slate-300">|</span>
            <span className="whitespace-nowrap">🥟 완성 {completedMandus}</span>
            {multiplierLabel && (
              <span className="px-1 py-0.2 bg-amber-100 border border-amber-400 text-amber-900 rounded text-[10px] font-black whitespace-nowrap">
                🔥 {multiplierLabel}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <div className="bg-white/95 border border-purple-200 px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center justify-between gap-1.5 sm:gap-2 shadow-2xs tabular-nums">
              <span className="text-[11px] sm:text-xs font-black text-purple-900 whitespace-nowrap">
                {gameUi.growthLabel} ({cookedCount}/{MAX_COOK_STEPS})
              </span>
              <div className="flex items-center gap-1 flex-1 justify-end">
                {Array.from({ length: MAX_COOK_STEPS }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 flex-1 max-w-[24px] border transition-colors ${
                      idx < cookedCount
                        ? 'bg-purple-500 border-purple-700'
                        : 'bg-slate-100 border-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/95 border border-rose-200 px-2 sm:px-2.5 py-1 sm:py-1.5 flex items-center justify-between gap-1.5 sm:gap-2 shadow-2xs tabular-nums">
              <span className="text-[11px] sm:text-xs font-black text-rose-900 whitespace-nowrap">
                {gameUi.burnLabel} ({burnCount}/{MAX_BURN_STEPS})
              </span>
              <div className="flex items-center gap-1 flex-1 justify-end">
                {Array.from({ length: MAX_BURN_STEPS }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2.5 flex-1 max-w-[24px] border transition-colors ${
                      idx < burnCount
                        ? 'bg-amber-900 border-stone-900'
                        : 'bg-slate-100 border-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* HUGE CONJUGATED CARD WITH SAMPLE SENTENCE ON CORRECT ANSWER */}
        <AnimatePresence>
          {feedbackState?.type === 'correct' && manduStatus === 'none' && (
            <motion.div
              key={`giant-${feedbackState.text}`}
              initial={{ opacity: 0, scale: 0.45, y: 18 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: 'spring', stiffness: 280, damping: 18 },
              }}
              exit={{
                opacity: 0,
                scale: 1.06,
                y: -12,
                transition: { duration: 0.35, ease: 'easeOut' },
              }}
              className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-3"
            >
              <div className="bg-white/97 border-3 border-purple-500 rounded-xl shadow-2xl px-6 py-4 sm:px-10 sm:py-5 flex flex-col items-center gap-1.5 max-w-md text-center">
                <span className="text-3xl sm:text-5xl font-black text-purple-950 font-badasseugi tracking-tight leading-none">
                  ✨ {feedbackState.text}
                </span>
                {feedbackState.meaning && (
                  <span className="text-xs sm:text-sm font-bold text-slate-600">
                    ({feedbackState.meaning})
                  </span>
                )}
                {feedbackState.sampleSentence && (
                  <p className="text-xs sm:text-sm font-bold text-purple-900 break-keep">
                    “{feedbackState.sampleSentence}”
                  </p>
                )}
                {feedbackState.points && (
                  <span className="text-xs sm:text-sm font-black text-amber-700 tabular-nums">
                    +{feedbackState.points}점
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Tilted Shaker Bottle Following Pointer During Drag */}
      {dragState?.isDragging && (
        <div
          style={{
            position: 'fixed',
            left: dragState.x,
            top: dragState.y,
            transform: dragState.isOverTarget
              ? 'translate(-50%, -65%) rotate(-42deg) scale(1.12)'
              : 'translate(-50%, -65%) rotate(-12deg) scale(1.06)',
            pointerEvents: 'none',
            zIndex: 9999,
            transition: 'transform 120ms ease-out',
          }}
        >
          <ShakerBottleGraphic
            label={dragState.option}
            paletteIdx={dragState.paletteIdx}
            isPouring={dragState.isOverTarget}
          />
        </div>
      )}

      {/* LEVEL-UP CELEBRATION MODAL */}
      <AnimatePresence>
        {levelUpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/55 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white border-3 border-purple-500 rounded-xl shadow-2xl p-5 sm:p-6 text-center space-y-4"
            >
              <div className="w-18 h-18 mx-auto rounded-full bg-purple-50 border-3 border-purple-300 flex items-center justify-center shadow-xs p-2">
                <ManduBadgeGraphic tier={levelUpModal.tier} className="w-13 h-13" />
              </div>

              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-black text-purple-950">
                  {gameUi.clearBanner}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-600 tabular-nums">
                  {levelUpModal.tier === 'white'
                    ? '🤍 흰만두'
                    : levelUpModal.tier === 'beige'
                    ? '🥟 베이지만두'
                    : '🤎 갈색만두'}{' '}
                  뱃지 획득! (실수 {levelUpModal.mistakes}회) · 현재 점수 {score}점
                </p>
                {levelUpModal.newlyUnlockedTrophyMilestone && (() => {
                  const hallUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).hallOfFame;
                  return (
                    <p className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md">
                      {hallUi.trophyUnlockedPrefix} ({levelUpModal.newlyUnlockedTrophyMilestone} {hallUi.badgeLabel})
                    </p>
                  );
                })()}
              </div>

              {levelUpModal.cookedItems.length > 0 && (
                <div className="bg-purple-50/80 border border-purple-200 rounded-lg p-2.5 text-left space-y-1.5">
                  <p className="text-[11px] sm:text-xs font-black text-purple-900">
                    🥟 오늘 완성한 활용 패턴 ({levelUpModal.cookedItems.length}개)
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {levelUpModal.cookedItems.map((card, idx) => (
                      <span
                        key={`${card.id}-${idx}`}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-purple-200 rounded-md text-xs font-bold text-slate-800"
                      >
                        <span className="text-slate-500">{card.baseWord}</span>
                        <span className="text-purple-500">→</span>
                        <span className="text-purple-900 font-black">
                          {card.conjugatedWord}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleGoToNextUnit}
                  className="w-full py-3 bg-purple-700 hover:bg-purple-800 active:scale-95 text-white font-black text-base rounded-md shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>{gameUi.nextUnitBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setLevelUpModal(null);
                    startNewMandu(levelUpModal.clearedUnitId, false);
                  }}
                  className="w-full py-2.5 bg-purple-100 hover:bg-purple-200 active:scale-95 text-purple-900 font-black text-sm rounded-md border border-purple-300 cursor-pointer transition-all"
                >
                  {gameUi.nextManduBtn}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🏆 SHARED BADGE COLLECTION & HALL OF FAME MODAL */}
      <GameBadgeAndHallOfFameModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        initialGame="mandu"
        uiLang={uiLang}
      />
    </div>
  );
};
