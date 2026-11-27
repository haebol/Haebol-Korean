import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
} from 'lucide-react';
import { ManduMascot } from './ManduMascot';
import { SupportedLanguage } from '../types';
import { UiLanguage, FLASHCARD_COMMON_UI } from '../i18n/uiTranslations';
import { speakKorean, playCutePop, playPaperFlipSound } from '../utils/audio';
import {
  ParticleUnitId,
  PARTICLE_UNIT_META,
  PARTICLE_COLS_BY_UNIT,
  PARTICLE_ROWS_BY_UNIT,
  ParticleColsItem,
  ParticleRowsItem,
} from '../data/particleWorksheetData';
import {
  getParticleBaseMeaning,
  getParticleCombinedMeaning,
} from '../data/particleCombinedMeanings';

export type ParticleFlashcardUnitId = ParticleUnitId;

export const PARTICLE_FLASHCARD_UNIT_META = PARTICLE_UNIT_META;

const FONT_HAND =
  "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif";

interface ParticleFlashcardSectionProps {
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  selectedUnit?: ParticleFlashcardUnitId;
  onSelectUnit?: (unit: ParticleFlashcardUnitId) => void;
  filterMode?: 'combination' | 'sentence';
}

export const COLS_HINTS: Record<string, string> = {
  // Unit 1: 은/는
  'particle-u1-1': '받침 X → 는',
  'particle-u1-2': '받침 X → 는',
  'particle-u1-3': '받침 ㅇ → 은',
  'particle-u1-4': '받침 ㅁ → 은',
  'particle-u1-5': '받침 ㅇ → 은',
  // Unit 2: 이에요/예요
  'particle-u2-1': '받침 ㅇ → 이에요',
  'particle-u2-2': '받침 ㄹ → 이에요',
  'particle-u2-3': '받침 ㅅ → 이에요',
  'particle-u2-4': '받침 X → 예요',
  'particle-u2-5': '받침 X → 예요',
  // Unit 4: 이/가
  'particle-u4-1': '받침 ㄹ → 이',
  'particle-u4-2': '받침 ㄱ → 이',
  'particle-u4-3': '받침 ㄱ → 이',
  'particle-u4-4': '받침 X → 가',
  'particle-u4-5': '받침 X → 가',
  // Unit 5: 이/가 ★ 변화형
  'particle-u5-1': '★ 나+가 → 내가',
  'particle-u5-2': '★ 너+가 → 네가',
  'particle-u5-3': '★ 저+가 → 제가',
  'particle-u5-4': '★ 누구+가 → 누가',
  'particle-u5-5': '★ 이것+이 → 이게',
  // Unit 6: 을/를
  'particle-u6-1': '받침 ㅂ → 을',
  'particle-u6-2': '받침 ㄴ → 을',
  'particle-u6-3': '받침 ㅅ → 을 (뭐를·뭘)',
  'particle-u6-4': '받침 X → 를',
  'particle-u6-5': '받침 X → 를',
  // Unit 8: 에
  'particle-u8-1': '놓는 곳 → 에',
  'particle-u8-2': '있는 곳 → 에',
  'particle-u8-3': '질문 장소 → 에',
  'particle-u8-4': '시간 → 에',
  'particle-u8-5': '시간 → 에',
  // Unit 9: 에서
  'particle-u9-1': '공부하는 곳 → 에서',
  'particle-u9-2': '노는 곳 → 에서',
  'particle-u9-3': '읽는 곳 → 에서',
  'particle-u9-4': '출신·출발 → 에서',
  'particle-u9-5': '기다리는 곳 → 에서',
  // Unit 10: 도
  'particle-u10-1': '받침 X → 도 (추가)',
  'particle-u10-2': '받침 X → 도 (추가)',
  'particle-u10-3': '받침 ㄹ → 도 (추가)',
  'particle-u10-4': '받침 X → 도 (추가)',
  'particle-u10-5': '받침 ㄴ → 도 (추가)',
  // Unit 12: 와, 과, 하고, 이랑, 랑
  'particle-u12-1': '함께 → 하고',
  'particle-u12-2': '받침 X → 와',
  'particle-u12-3': '받침 ㄹ → 이랑',
  'particle-u12-4': '받침 ㄱ → 과',
  'particle-u12-5': '받침 X → 랑',
  // Unit 13: 으로, 로
  'particle-u13-1': '받침 X → 로 (방향)',
  'particle-u13-2': '받침 ㅇ → 으로 (방향)',
  'particle-u13-3': '★ ‘ㄹ’ 받침 → 로',
  'particle-u13-4': '받침 X → 로 (수단)',
  'particle-u13-5': '받침 ㄱ → 으로 (도구)',
  // Unit 14: 에게, 한테
  'particle-u14-1': '대상(글·말) → 에게',
  'particle-u14-2': '대상(글·말) → 에게',
  'particle-u14-3': '대상(말할 때) → 한테',
  'particle-u14-4': '대상(말할 때) → 한테',
  'particle-u14-5': '질문 대상 → 한테',
  // Unit 16: 부터, 까지
  'particle-u16-1': '시작 시간 → 부터',
  'particle-u16-2': '질문 시작 → 부터',
  'particle-u16-3': '끝 시간 → 까지',
  'particle-u16-4': '질문 시간 끝 → 까지',
  'particle-u16-5': '질문 쪽수 끝 → 까지',
  // Unit 17: 이나, 나
  'particle-u17-1': '받침 ㅇ → 이나',
  'particle-u17-2': '받침 ㄹ → 이나',
  'particle-u17-3': '받침 ㄱ → 이나',
  'particle-u17-4': '받침 X → 나',
  'particle-u17-5': '받침 X → 나',
  // Unit 18: 마다 · -씩
  'particle-u18-1': '매일 반복 → 마다',
  'particle-u18-2': '아침 반복 → 마다',
  'particle-u18-3': '주말 반복 → 마다',
  'particle-u18-4': '모든 곳 → 마다',
  'particle-u18-5': '각 사람 → 마다',
  // Unit 20: 만
  'particle-u20-1': '긍정 한정 → 만',
  'particle-u20-2': '긍정 한정 → 만',
  'particle-u20-3': '수량 한정 → 만',
  'particle-u20-4': '시간 한정 → 만',
  'particle-u20-5': '대상 한정 → 만',
  // Unit 21: 밖에 ★
  'particle-u21-1': '★ 밖에 + 없어요',
  'particle-u21-2': '★ 밖에 + 없어요',
  'particle-u21-3': '★ 밖에 + 없어요',
  'particle-u21-4': '★ 밖에 + 없어요',
  'particle-u21-5': '★ 밖에 + 안 먹어요',
  // Unit 22: 보다
  'particle-u22-1': '비교 기준 → 보다',
  'particle-u22-2': '비교 시간 → 보다',
  'particle-u22-3': '비교 수단 → 보다',
  'particle-u22-4': '비교 대상 → 보다',
  'particle-u22-5': '질문 비교 → 보다',
  // Unit 24: 처럼, 같이
  'particle-u24-1': '모양·행동 비유 → 같이',
  'particle-u24-2': '모양 비유 → 같이',
  'particle-u24-3': '모양·느낌 비유 → 처럼',
  'particle-u24-4': '성질 비유 → 처럼',
  'particle-u24-5': '모습 비유 → 처럼',
  // Unit 25: 의 ★ (내, 네, 제)
  'particle-u25-1': '소유 → 의 ([에] 발음)',
  'particle-u25-2': '소유 → 의 ([에] 발음)',
  'particle-u25-3': '★ 나+의 → 내',
  'particle-u25-4': '★ 너+의 → 네',
  'particle-u25-5': '★ 저+의 → 제',
  // Unit 26: 끼리
  'particle-u26-1': '무리·함께 → 끼리',
  'particle-u26-2': '무리·함께 → 끼리',
  'particle-u26-3': '무리·함께 → 끼리',
  'particle-u26-4': '무리·함께 → 끼리',
  'particle-u26-5': '무리·함께 → 끼리',
  // Unit 28: 께서, 께
  'particle-u28-1': '높임 주어 → 께서',
  'particle-u28-2': '높임 주어 → 께서',
  'particle-u28-3': '높임 대상 → 께',
  'particle-u28-4': '높임 대상 → 께',
  'particle-u28-5': '높임 대상 → 께',
  // Unit 29: 아, 야
  'particle-u29-1': '받침 X → 야',
  'particle-u29-2': '받침 ㄴ → 아',
  'particle-u29-3': '받침 X → 야',
  'particle-u29-4': '받침 X → 야',
  'particle-u29-5': '받침 ㅇ → 아',
};

export const ROW_HINTS: Record<string, string[]> = {
  // Unit 3
  'particle-u3-1': ['받침 X → 는', '받침 X → 예요'],
  'particle-u3-2': ['받침 X → 는', '받침 X → 예요'],
  'particle-u3-3': ['받침 X → 는', '받침 ㅇ → 이에요'],
  'particle-u3-4': ['받침 ㅇ → 은', '받침 X → 예요'],
  'particle-u3-5': ['받침 ㅅ → 은', '받침 ㅇ → 이에요'],
  // Unit 7
  'particle-u7-1': ['★ 저+가→제가', '받침 ㄴ → 을'],
  'particle-u7-2': ['받침 ㅇ → 이', '받침 X → 를'],
  'particle-u7-3': ['★ 나+가→내가', '받침 ㅁ → 을'],
  'particle-u7-4': ['받침 X → 가', '받침 ㅅ → 을'],
  'particle-u7-5': ['★ 누구+가→누가', '받침 X → 를'],
  // Unit 11
  'particle-u11-1': ['추가 → 도', '가는 곳 → 에'],
  'particle-u11-2': ['추가 → 도', '행동 → 에서'],
  'particle-u11-3': ['시간 → 에', '추가 → 도'],
  'particle-u11-4': ['시간 → 에', '행동 → 에서'],
  'particle-u11-5': ['행동 → 에서', '추가 → 도'],
  // Unit 15
  'particle-u15-1': ['받침 X → 랑', '받침 ㅇ → 으로'],
  'particle-u15-2': ['받침 ㅇ → 이랑', '받침 X → 로'],
  'particle-u15-3': ['함께 → 하고', '대상 → 한테'],
  'particle-u15-4': ['대상 → 에게', '받침 X → 로'],
  'particle-u15-5': ['받침 ㄱ → 과', '받침 ㄱ → 으로'],
  // Unit 19
  'particle-u19-1': ['시작 → 부터', '끝 → 까지'],
  'particle-u19-2': ['시작 → 부터', '끝 → 까지'],
  'particle-u19-3': ['반복 → 마다', '받침 ㅇ → 이나'],
  'particle-u19-4': ['반복 → 마다', '받침 X → 나'],
  'particle-u19-5': ['질문 시작 → 부터', '질문 끝 → 까지'],
  // Unit 23
  'particle-u23-1': ['받침 X → 는', '한정 → 만'],
  'particle-u23-2': ['★ 밖에 + 안 보여'],
  'particle-u23-3': ['비교 → 보다'],
  'particle-u23-4': ['비교 → 보다', '', '★ 너+가→네가'],
  'particle-u23-5': ['★ 밖에 + 몰라'],
  // Unit 27
  'particle-u27-1': ['소유 → 의', '받침 ㅇ → 이'],
  'particle-u27-2': ['★ 저+의→제', '받침 ㄱ → 을'],
  'particle-u27-3': ['무리 → 끼리', '행동 → 에서'],
  'particle-u27-4': ['무리 → 끼리', '행동 → 에서'],
  'particle-u27-5': ['받침 ㅇ → 이', '비유 → 처럼'],
  // Unit 30
  'particle-u30-1': ['높임 주어 → 께서', '받침 ㄹ → 을'],
  'particle-u30-2': ['높임 주어 → 께서', '받침 ㄱ → 을'],
  'particle-u30-3': ['받침 X → 야', '높임 대상 → 께'],
  'particle-u30-4': ['받침 ㄴ → 아', '높임 대상 → 께'],
  'particle-u30-5': ['받침 X → 야', '높임 대상 → 께'],
};

// Unit 5 & Unit 25 dropping raw particle before purple morph
export const COLS_INITIAL_PARTICLE: Record<string, string> = {
  'particle-u5-1': '가',
  'particle-u5-2': '가',
  'particle-u5-3': '가',
  'particle-u5-4': '가',
  'particle-u5-5': '이',
  'particle-u25-3': '의',
  'particle-u25-4': '의',
  'particle-u25-5': '의',
};

// Unit 7, Unit 23 & Unit 27 irregular base forms before purple morph
export const ROW_IRREGULAR_BASE: Record<string, { baseNoun: string; rawParticle: string }> = {
  'particle-u7-1': { baseNoun: '저', rawParticle: '가' },
  'particle-u7-3': { baseNoun: '나', rawParticle: '가' },
  'particle-u7-5': { baseNoun: '누구', rawParticle: '가' },
  'particle-u23-4-b2': { baseNoun: '너', rawParticle: '가' },
  'particle-u27-2': { baseNoun: '저', rawParticle: '의' },
};

const FLASHCARD_UI_LABELS: Record<
  SupportedLanguage | 'ko',
  {
    clickWordGuide: string;
    hint: string;
    tip: string;
    hintTitle: string;
    tipTitle: string;
    listenSentence: string;
  }
> = {
  en: {
    clickWordGuide: 'Click to see particle',
    hint: 'Hint',
    tip: 'Tip',
    hintTitle: 'View batchim hint',
    tipTitle: "View Teacher's Tip",
    listenSentence: 'Click to listen',
  },
  ko: {
    clickWordGuide: '클릭하여 조사 확인',
    hint: '힌트',
    tip: '팁',
    hintTitle: '받침 힌트 보기',
    tipTitle: '해볼쌤 팁 보기',
    listenSentence: '클릭해서 예문 듣기',
  },
  vi: {
    clickWordGuide: 'Nhấn để xem tiểu từ',
    hint: 'Gợi ý',
    tip: 'Mẹo',
    hintTitle: 'Xem gợi ý phụ âm cuối',
    tipTitle: 'Xem mẹo học',
    listenSentence: 'Nhấn để nghe câu mẫu',
  },
  bn: {
    clickWordGuide: 'অনুসর্গ দেখতে ক্লিক করুন',
    hint: 'ইঙ্গিত',
    tip: 'টিপস',
    hintTitle: 'ইঙ্গিত দেখুন',
    tipTitle: 'শিক্ষকের পরামর্শ দেখুন',
    listenSentence: 'বাক্য শুনতে ক্লিক করুন',
  },
  zh: {
    clickWordGuide: '点击查看助词',
    hint: '提示',
    tip: '秘诀',
    hintTitle: '查看收音提示',
    tipTitle: '查看教师小贴士',
    listenSentence: '点击听例句',
  },
  ru: {
    clickWordGuide: 'Нажмите, чтобы увидеть частицу',
    hint: 'Подсказка',
    tip: 'Совет',
    hintTitle: 'Посмотреть подсказку',
    tipTitle: 'Совет учителя',
    listenSentence: 'Нажмите, чтобы послушать',
  },
  ja: {
    clickWordGuide: 'クリックして助詞を確認',
    hint: 'ヒント',
    tip: 'コツ',
    hintTitle: 'パッチムのヒントを見る',
    tipTitle: '先生のコツを見る',
    listenSentence: 'クリックして例文を聞く',
  },
  mn: {
    clickWordGuide: 'Нөхцөлийг харахын тулд дарна уу',
    hint: 'Зөвлөгөө',
    tip: 'Санамж',
    hintTitle: 'Дэвсгэр үсгийн зөвлөгөө',
    tipTitle: 'Багшийн санамж',
    listenSentence: 'Жишээ өгүүлбэр сонсох',
  },
};

export const ParticleFlashcardSection: React.FC<ParticleFlashcardSectionProps> = ({
  lang,
  uiLang = 'ko',
  selectedUnit: propSelectedUnit,
  onSelectUnit,
  filterMode = 'combination',
}) => {
  const [internalUnit, setInternalUnit] = useState<ParticleFlashcardUnitId>('unit1');
  const selectedUnit = propSelectedUnit ?? internalUnit;
  const [cardIndex, setCardIndex] = useState(0);
  const [isCovered, setIsCovered] = useState(false);
  const [isMagicTransformed, setIsMagicTransformed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const magicTimerRef = useRef<NodeJS.Timeout | null>(null);

  const unitMeta =
    PARTICLE_UNIT_META.find((m) => m.id === selectedUnit) || PARTICLE_UNIT_META[0];
  const isRowUnit = unitMeta.layoutType === 'rows5';

  const colsList: ParticleColsItem[] = !isRowUnit
    ? PARTICLE_COLS_BY_UNIT[selectedUnit] || []
    : [];
  const rowsList: ParticleRowsItem[] = isRowUnit
    ? PARTICLE_ROWS_BY_UNIT[selectedUnit] || []
    : [];
  const totalCount = isRowUnit ? rowsList.length : colsList.length;

  const safeIndex = totalCount > 0 ? Math.min(cardIndex, totalCount - 1) : 0;
  const currentColCard = !isRowUnit ? colsList[safeIndex] || colsList[0] : null;
  const currentRowCard = isRowUnit ? rowsList[safeIndex] || rowsList[0] : null;

  const fcUiLabels =
    FLASHCARD_UI_LABELS[uiLang] || FLASHCARD_UI_LABELS.ko;
  const commonUi = FLASHCARD_COMMON_UI[uiLang] || FLASHCARD_COMMON_UI.ko;

  const clearMagicTimer = () => {
    if (magicTimerRef.current) {
      clearTimeout(magicTimerRef.current);
      magicTimerRef.current = null;
    }
  };

  // Helper to get spoken starter prompt for a row card
  const getRowStarterSpeech = (row: ParticleRowsItem): string => {
    const parts = row.blocks.map((blk, idx) => {
      const irreg =
        ROW_IRREGULAR_BASE[`${row.id}-b${idx}`] ||
        (idx === 0 ? ROW_IRREGULAR_BASE[row.id] : undefined);
      if (irreg) {
        return irreg.baseNoun;
      }
      if (blk.staticDisplay) {
        return blk.segments.map((s) => s.text).join('').trim();
      }
      return blk.segments[0]?.text || '';
    });
    return parts.filter(Boolean).join(', ');
  };

  // Reset cardIndex when switching units
  useEffect(() => {
    setCardIndex(0);
  }, [selectedUnit]);

  // Auto-reset animation & pronounce base word when card or unit changes
  useEffect(() => {
    setIsCovered(false);
    setIsMagicTransformed(false);
    clearMagicTimer();
    setShowHint(false);

    const timer = setTimeout(() => {
      if (isRowUnit && currentRowCard) {
        speakKorean(getRowStarterSpeech(currentRowCard), 0.85);
      } else if (currentColCard) {
        speakKorean(currentColCard.baseNoun, 0.85);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      clearMagicTimer();
    };
  }, [selectedUnit, safeIndex]);

  const handlePrev = () => {
    playCutePop();
    setCardIndex((prev) => (prev > 0 ? prev - 1 : totalCount - 1));
  };

  const handleNext = () => {
    playCutePop();
    setCardIndex((prev) => (prev < totalCount - 1 ? prev + 1 : 0));
  };

  const handlePrevUnit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playCutePop();
    const modeUnits =
      filterMode === 'sentence'
        ? PARTICLE_FLASHCARD_UNIT_META.filter((u) => u.layoutType === 'rows5')
        : PARTICLE_FLASHCARD_UNIT_META;
    const curIdx = modeUnits.findIndex((u) => u.id === selectedUnit);
    const prevIdx = curIdx > 0 ? curIdx - 1 : modeUnits.length - 1;
    const prevUnitId = modeUnits[prevIdx].id;
    setInternalUnit(prevUnitId);
    onSelectUnit?.(prevUnitId);
    setCardIndex(0);
  };

  const handleNextUnit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playCutePop();
    const modeUnits =
      filterMode === 'sentence'
        ? PARTICLE_FLASHCARD_UNIT_META.filter((u) => u.layoutType === 'rows5')
        : PARTICLE_FLASHCARD_UNIT_META;
    const curIdx = modeUnits.findIndex((u) => u.id === selectedUnit);
    const nextIdx = curIdx < modeUnits.length - 1 ? curIdx + 1 : 0;
    const nextUnitId = modeUnits[nextIdx].id;
    setInternalUnit(nextUnitId);
    onSelectUnit?.(nextUnitId);
    setCardIndex(0);
  };

  const handleCardClick = () => {
    playPaperFlipSound();
    clearMagicTimer();

    if (!isCovered) {
      setIsCovered(true);
      setIsMagicTransformed(false);
      const hasColMorph = Boolean(
        !isRowUnit && currentColCard && COLS_INITIAL_PARTICLE[currentColCard.id]
      );
      const hasRowMorph = Boolean(
        isRowUnit &&
          currentRowCard &&
          (ROW_IRREGULAR_BASE[currentRowCard.id] ||
            currentRowCard.blocks.some((_, idx) => ROW_IRREGULAR_BASE[`${currentRowCard.id}-b${idx}`]))
      );
      if (hasColMorph || hasRowMorph) {
        magicTimerRef.current = setTimeout(() => {
          setIsMagicTransformed(true);
        }, 760);
      }
      if (isRowUnit && currentRowCard) {
        speakKorean(currentRowCard.fullSentence, 0.85);
      } else if (currentColCard) {
        speakKorean(currentColCard.combinedWord, 0.85);
      }
    } else {
      setIsCovered(false);
      setIsMagicTransformed(false);
      if (isRowUnit && currentRowCard) {
        speakKorean(getRowStarterSpeech(currentRowCard), 0.85);
      } else if (currentColCard) {
        speakKorean(currentColCard.baseNoun, 0.85);
      }
    }
  };

  const handleMagnifierClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCutePop();
    setShowHint((prev) => !prev);
  };

  const handleTipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCutePop();
    setShowTipModal(true);
  };

  const handleSentenceSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    playCutePop();
    speakKorean(text, 0.85);
  };

  const renderSpeechBubble = (hintText: string, compact = false) => (
    <AnimatePresence>
      {showHint && hintText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 flex flex-col items-center pointer-events-none z-40"
        >
          <div
            className={`bg-red-500 text-white font-black rounded-lg shadow-md border border-white flex items-center gap-1 whitespace-nowrap ${
              compact ? 'px-2 py-0.5 text-[11px] sm:text-xs' : 'px-2.5 py-1 text-xs sm:text-sm'
            }`}
          >
            <span>🔍</span>
            <span>{hintText}</span>
          </div>
          <div className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[7px] border-t-red-500" />
        </motion.div>
      )}
    </AnimatePresence>
  );

  const currentMeaning = isRowUnit
    ? currentRowCard?.meanings[lang] || currentRowCard?.meanings.en || ''
    : currentColCard
      ? isCovered
        ? getParticleCombinedMeaning(currentColCard, lang)
        : getParticleBaseMeaning(currentColCard, lang)
      : '';

  const currentIllustration = isRowUnit
    ? currentRowCard?.illustrationSvg
    : currentColCard?.illustrationSvg;

  const currentAlt = isRowUnit
    ? currentRowCard?.fullSentence || '문장 일러스트'
    : `${currentColCard?.baseNoun || ''} 일러스트`;

  const fullSentenceText = isRowUnit
    ? currentRowCard?.fullSentence || ''
    : `${currentColCard?.sentencePrefix || ''}${currentColCard?.sentenceHighlight || ''}${currentColCard?.sentenceSuffix || ''}`;

  const renderTipBtn = (speakText: string, children: React.ReactNode) => (
    <button
      type="button"
      onClick={() => {
        playCutePop();
        speakKorean(speakText, 0.85);
      }}
      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-emerald-200/60 shadow-2xs text-xs sm:text-sm font-medium cursor-pointer transition-transform active:scale-95 text-slate-800"
      title="클릭하여 발음 듣기"
    >
      {children}
    </button>
  );

  const renderTipModalContent = () => {
    switch (selectedUnit) {
      case 'unit2':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              사람이나 사물이 무엇인지 나타낼 때, 명사 끝{' '}
              <span className="font-black text-amber-600">받침이 있으면</span>{' '}
              <span className="font-black text-red-600">‘-이에요’</span>,{' '}
              <span className="font-black text-amber-600">없으면</span>{' '}
              <span className="font-black text-red-600">‘-예요’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('학생, 학생이에요', <>학생 → <span className="font-black text-red-600">학생이에요</span></>)}
              {renderTipBtn('의자, 의자예요', <>의자 → <span className="font-black text-red-600">의자예요</span></>)}
              {renderTipBtn('친구예요', <>친구<span className="font-black text-red-600">예요</span> ○ / 친구에요 ×</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              기본형은 <span className="font-black text-amber-600">‘-이다’</span>인데 변신한 거예요. (예: 학생이다 → 학생이에요)
            </p>
          </div>
        );

      case 'unit4':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              어떤 일의 주인공이나 대상이 있음을 말할 때,{' '}
              <span className="font-black text-amber-600">받침이 있으면</span>{' '}
              <span className="font-black text-red-600">‘-이’</span>,{' '}
              <span className="font-black text-amber-600">없으면</span>{' '}
              <span className="font-black text-red-600">‘-가’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('물, 물이 있어요.', <>물 → <span className="font-black text-red-600">물이</span> 있어요.</>)}
              {renderTipBtn('배, 배가 아파요.', <>배 → <span className="font-black text-red-600">배가</span> 아파요.</>)}
              {renderTipBtn('비누, 비누가 있어요.', <>비누 → <span className="font-black text-red-600">비누가</span> 있어요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘물이 있어요’, ‘배가 아파요’처럼 학교와 생활 속에서 필요한 물건이나 상태를 말할 때 자주 써요.
            </p>
          </div>
        );

      case 'unit5':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              ‘나, 너, 저, 누구’ 뒤에 <span className="font-black text-red-600">‘-가’</span>가 오면 앞말이 보라색처럼 변신하고, ‘이것+이’는 줄어서 <span className="font-black text-purple-700">‘이게’</span>가 돼요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('나, 내가', <>나+가 → <span className="font-black text-purple-600">내</span><span className="font-black text-red-600">가</span></>)}
              {renderTipBtn('저, 제가', <>저+가 → <span className="font-black text-purple-600">제</span><span className="font-black text-red-600">가</span></>)}
              {renderTipBtn('누구, 누가', <>누구+가 → <span className="font-black text-purple-600">누</span><span className="font-black text-red-600">가</span></>)}
              {renderTipBtn('이것, 이게', <>이것+이 → <span className="font-black text-slate-800">이</span><span className="font-black text-purple-600">게</span></>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘나가, 저가, 누구가’가 되지 않도록 보라색 변화형 5가지를 소리 내어 입에 붙여 익혀 보세요.
            </p>
          </div>
        );

      case 'unit6':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              어떤 행동의 대상(목적어)을 나타낼 때,{' '}
              <span className="font-black text-amber-600">받침이 있으면</span>{' '}
              <span className="font-black text-red-600">‘-을’</span>,{' '}
              <span className="font-black text-amber-600">없으면</span>{' '}
              <span className="font-black text-red-600">‘-를’</span>을 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('밥, 밥을', <>밥 → <span className="font-black text-red-600">밥을</span></>)}
              {renderTipBtn('우유, 우유를', <>우유 → <span className="font-black text-red-600">우유를</span></>)}
              {renderTipBtn('무엇을 먹어요? 뭐를 먹어요?', <>무엇<span className="font-black text-red-600">을</span> (뭐<span className="font-black text-red-600">를</span>/뭘)</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘무엇을’은 말할 때 줄여서 <span className="font-black text-red-600">‘뭐를’</span>이나 <span className="font-black text-red-600">‘뭘’</span>로도 자주 써요. (예: 무엇을 먹어요? → 뭐를 먹어요?)
            </p>
          </div>
        );

      case 'unit8':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              사람이나 물건이{' '}
              <span className="font-black text-amber-600">있는 곳, 가는 곳, 또는 시간</span>을 말할 때 받침과 상관없이 명사 뒤에{' '}
              <span className="font-black text-red-600">‘-에’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('학교에 가요.', <>학교<span className="font-black text-red-600">에</span> 가요.</>)}
              {renderTipBtn('어디에 가요?', <>어디<span className="font-black text-red-600">에</span> 가요?</>)}
              {renderTipBtn('아침에 일어나요.', <>아침<span className="font-black text-red-600">에</span> 일어나요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘학교에 가요’, ‘집에 있어요’, ‘어디에 가요?’처럼 어디로 가는지, 언제인지 함께 말해 보세요.
            </p>
          </div>
        );

      case 'unit9':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              어떤 <span className="font-black text-amber-600">행동이 일어나는 장소</span>나{' '}
              <span className="font-black text-amber-600">출발점·출신</span>을 나타낼 때 받침과 상관없이 명사 뒤에{' '}
              <span className="font-black text-red-600">‘-에서’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('교실에서 공부해요.', <>교실<span className="font-black text-red-600">에서</span> 공부해요.</>)}
              {renderTipBtn('운동장에서 놀아요.', <>운동장<span className="font-black text-red-600">에서</span> 놀아요.</>)}
              {renderTipBtn('어느 나라에서 왔어요?', <>어느 나라<span className="font-black text-red-600">에서</span> 왔어요?</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘어디에 있어요(위치)’는 ‘-에’, ‘어디에서 공부해요·어느 나라에서 왔어요(행동·출신)’는 ‘-에서’를 써요.
            </p>
          </div>
        );

      case 'unit10':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              이미 이야기한 것에 다른 대상을{' '}
              <span className="font-black text-amber-600">똑같이 더하거나 보탤 때</span> 받침과 상관없이{' '}
              <span className="font-black text-red-600">‘-도’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('나도 갈래요.', <>나<span className="font-black text-red-600">도</span> 갈래요.</>)}
              {renderTipBtn('물도 주세요.', <>물<span className="font-black text-red-600">도</span> 주세요.</>)}
              {renderTipBtn('우산도 있어요.', <>우산<span className="font-black text-red-600">도</span> 있어요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘은/는, 이/가, 을/를’ 뒤에 붙이지 않고 그 자리에 바로 ‘-도’를 바꿔 넣어요. (나는도 × → 나도 ○)
            </p>
          </div>
        );

      case 'unit12':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              둘 이상의 명사를 나열하거나{' '}
              <span className="font-black text-amber-600">함께 행동하는 사람</span>을 나타낼 때{' '}
              <span className="font-black text-red-600">‘-와/-과’, ‘-하고’, ‘-이랑/-랑’</span>을 써요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('우유, 우유와', <>우유 → 우유<span className="font-black text-red-600">와</span></>)}
              {renderTipBtn('책, 책과', <>책 → 책<span className="font-black text-red-600">과</span></>)}
              {renderTipBtn('엄마, 엄마하고', <>엄마 → 엄마<span className="font-black text-red-600">하고</span></>)}
              {renderTipBtn('연필, 연필이랑', <>연필 → 연필<span className="font-black text-red-600">이랑</span></>)}
              {renderTipBtn('친구, 친구랑', <>친구 → 친구<span className="font-black text-red-600">랑</span></>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘-와/-과’는 글과 말에서 두루 쓰고, 대화에서는 ‘-하고’, ‘-이랑/-랑’을 더 자주 써요.
            </p>
          </div>
        );

      case 'unit13':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              가는 <span className="font-black text-amber-600">방향</span>이나{' '}
              <span className="font-black text-amber-600">수단·도구</span>를 나타낼 때, 받침이 있으면{' '}
              <span className="font-black text-red-600">‘-으로’</span>, 받침이 없거나{' '}
              <span className="font-black text-amber-600">‘ㄹ’ 받침</span>이면{' '}
              <span className="font-black text-red-600">‘-로’</span>를 써요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('학교, 학교로 가요.', <>학교 → 학교<span className="font-black text-red-600">로</span></>)}
              {renderTipBtn('연필, 연필로 써요.', <>연필 → 연필<span className="font-black text-red-600">로</span> (ㄹ 받침)</>)}
              {renderTipBtn('숟가락, 숟가락으로 먹어요.', <>숟가락 → 숟가락<span className="font-black text-red-600">으로</span></>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘연필로 써요’, ‘교실로 가요’처럼 끝 받침이 ‘ㄹ’일 때는 ‘으로’가 아니라 ‘-로’를 붙이는 점에 주의하세요.
            </p>
          </div>
        );

      case 'unit14':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              말하거나 물건을 주는{' '}
              <span className="font-black text-amber-600">행동의 대상(사람·동물)</span>을 나타낼 때 받침과 상관없이{' '}
              <span className="font-black text-red-600">‘-에게’</span>나{' '}
              <span className="font-black text-red-600">‘-한테’</span>를 써요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('짝꿍에게 물어요.', <>짝꿍<span className="font-black text-red-600">에게</span> 물어요.</>)}
              {renderTipBtn('동생한테 말해요.', <>동생<span className="font-black text-red-600">한테</span> 말해요.</>)}
              {renderTipBtn('우리한테 주세요.', <>우리<span className="font-black text-red-600">한테</span> 주세요.</>)}
              {renderTipBtn('누구한테 줘요?', <>누구<span className="font-black text-red-600">한테</span> 줘요?</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              선생님이나 부모님처럼 높여야 하는 어른께 말씀드릴 때는 ‘선생님께 드려요’처럼 ‘-께’를 써요.
            </p>
          </div>
        );

      case 'unit16':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              시간·순서의 <span className="font-black text-amber-600">시작점</span>에는{' '}
              <span className="font-black text-red-600">‘-부터’</span>, 시간·거리의{' '}
              <span className="font-black text-amber-600">끝·도착점</span>에는{' '}
              <span className="font-black text-red-600">‘-까지’</span>를 받침과 상관없이 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('아침부터 비가 와요.', <>아침<span className="font-black text-red-600">부터</span> 비가 와요.</>)}
              {renderTipBtn('저녁까지 숙제해요.', <>저녁<span className="font-black text-red-600">까지</span> 숙제해요.</>)}
              {renderTipBtn('집에서 학교까지 걸어요.', <>집에서 학교<span className="font-black text-red-600">까지</span> 걸어요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘아침부터 저녁까지’, ‘집에서 학교까지’처럼 시작과 끝을 짝지어 쓰면 뜻이 훨씬 분명해져요.
            </p>
          </div>
        );

      case 'unit17':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              둘 이상의 대상 중 <span className="font-black text-amber-600">하나를 선택</span>할 때, 명사 끝{' '}
              <span className="font-black text-amber-600">받침이 있으면</span>{' '}
              <span className="font-black text-red-600">‘-이나’</span>,{' '}
              <span className="font-black text-amber-600">없으면</span>{' '}
              <span className="font-black text-red-600">‘-나’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('빵이나 밥을 먹어요.', <>빵<span className="font-black text-red-600">이나</span> 밥을 먹어요.</>)}
              {renderTipBtn('물이나 우유를 마셔요.', <>물<span className="font-black text-red-600">이나</span> 우유를 마셔요.</>)}
              {renderTipBtn('사과나 포도를 먹어요.', <>사과<span className="font-black text-red-600">나</span> 포도를 먹어요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              여러 가지 중에서 하나를 고르거나 ‘우리 빵이나 먹을까요?’처럼 가볍게 권유할 때 자주 써요.
            </p>
          </div>
        );

      case 'unit18':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              시간이나 대상이 <span className="font-black text-amber-600">빠짐없이 반복</span>될 때는{' '}
              <span className="font-black text-red-600">‘-마다’</span>, 수량을 나누어 거듭할 때는{' '}
              <span className="font-black text-amber-600">접미사</span>{' '}
              <span className="font-black text-red-600">‘-씩’</span>을 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('날마다 운동해요.', <>날<span className="font-black text-red-600">마다</span> 운동해요.</>)}
              {renderTipBtn('주말마다 도서관에 가요.', <>주말<span className="font-black text-red-600">마다</span> 도서관에 가요.</>)}
              {renderTipBtn('하나씩 먹어요.', <>하나<span className="font-black text-red-600">씩</span> 먹어요.</>)}
              {renderTipBtn('하루씩 연습해요.', <>하루<span className="font-black text-red-600">씩</span> · 조금<span className="font-black text-red-600">씩</span></>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              접미사 ‘-씩’은 수량·단위 말 뒤에 붙어 ‘한 번에 그만큼씩 나누어’ 또는 ‘거듭하여’라는 뜻을 더해요.
            </p>
          </div>
        );

      case 'unit20':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              다른 것은 빼고{' '}
              <span className="font-black text-amber-600">그것 하나뿐</span>임을 말할 때 받침과 상관없이{' '}
              <span className="font-black text-red-600">‘-만’</span>을 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('물만 마셔요.', <>물<span className="font-black text-red-600">만</span> 마셔요.</>)}
              {renderTipBtn('나만 알아요.', <>나<span className="font-black text-red-600">만</span> 알아요.</>)}
              {renderTipBtn('사탕을 하나만 먹어요.', <>하나<span className="font-black text-red-600">만</span> 먹어요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘은/는, 이/가, 을/를’ 자리에 ‘-만’을 바로 넣으면 강조하는 뜻이 또렷해져요.
            </p>
          </div>
        );

      case 'unit21':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              <span className="font-black text-red-600">‘-밖에’</span> 뒤에는 반드시{' '}
              <span className="font-black text-purple-700">부정 표현(없어요 · 안 ~)</span>이 와야 해요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('연필이 하나밖에 없어요.', <>하나<span className="font-black text-red-600">밖에</span> <span className="font-black text-purple-600">없어요</span> ○</>)}
              {renderTipBtn('빵밖에 안 먹어요.', <>빵<span className="font-black text-red-600">밖에</span> <span className="font-black text-purple-600">안 먹어요</span> ○</>)}
              {renderTipBtn('물만 있어요.', <>물밖에 있어요 × → 물<span className="font-black text-red-600">만</span> 있어요 ○</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              긍정 문장에는 ‘-만’, 부정 문장(‘없어요/안 ~’)에는 ‘-밖에’가 짝꿍이라는 점을 꼭 구별해 보세요.
            </p>
          </div>
        );

      case 'unit22':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              두 대상을 비교할 때{' '}
              <span className="font-black text-amber-600">비교의 기준이 되는 명사</span> 뒤에{' '}
              <span className="font-black text-red-600">‘-보다’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('동생이 형보다 빨라요.', <>형<span className="font-black text-red-600">보다</span> 빨라요.</>)}
              {renderTipBtn('오늘이 어제보다 따뜻해요.', <>어제<span className="font-black text-red-600">보다</span> 따뜻해요.</>)}
              {renderTipBtn('수박이 사과보다 커요.', <>사과<span className="font-black text-red-600">보다</span> 커요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘친구가 누구보다 빨라요’처럼 비교 기준을 나타낼 때 항상 명사에 붙여 써요.
            </p>
          </div>
        );

      case 'unit24':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              어떤 대상과{' '}
              <span className="font-black text-amber-600">모양이나 행동이 닮았음</span>을 비유할 때 받침과 상관없이{' '}
              <span className="font-black text-red-600">‘-처럼, -같이’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('토끼같이 껑충 뛰어요.', <>토끼<span className="font-black text-red-600">같이</span> 뛰어요.</>)}
              {renderTipBtn('구름같이 하얘요.', <>구름<span className="font-black text-red-600">같이</span> 하얘요.</>)}
              {renderTipBtn('별처럼 반짝여요.', <>별<span className="font-black text-red-600">처럼</span> 반짝여요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘토끼같이, 별처럼’처럼 비유하는 조사일 땐 항상 앞 명사에 띄어쓰기 없이 붙여 써요.
            </p>
          </div>
        );

      case 'unit25':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              소유·소속을 나타낼 때 <span className="font-black text-red-600">‘-의’</span>를 붙이고, ‘나·너·저+의’는 보라색처럼 줄어들어 변신해요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('친구의 가방', <>친구<span className="font-black text-red-600">의</span> 가방</>)}
              {renderTipBtn('나, 내', <>나+의 → <span className="font-black text-purple-600">내</span></>)}
              {renderTipBtn('너, 네', <>너+의 → <span className="font-black text-purple-600">네</span></>)}
              {renderTipBtn('저, 제', <>저+의 → <span className="font-black text-purple-600">제</span></>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              조사 ‘-의’는 말할 때 [에]로 발음하기도 해요. (예: 친구의 [친구의 / 친구에])
            </p>
          </div>
        );

      case 'unit26':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              같은 무리나 비슷한 사람끼리{' '}
              <span className="font-black text-amber-600">여럿이 함께 어울림</span>을 나타낼 때 받침과 상관없이{' '}
              <span className="font-black text-red-600">‘-끼리’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('친구끼리 놀아요.', <>친구<span className="font-black text-red-600">끼리</span> 놀아요.</>)}
              {renderTipBtn('우리끼리 이야기해요.', <>우리<span className="font-black text-red-600">끼리</span> 이야기해요.</>)}
              {renderTipBtn('학생끼리 공부해요.', <>학생<span className="font-black text-red-600">끼리</span> 공부해요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘친구, 우리, 학생’처럼 여럿을 뜻하는 말 뒤에 붙어 ‘그들만의 모임·함께’를 뜻해요.
            </p>
          </div>
        );

      case 'unit28':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              어른을 높여 말할 때 주어 ‘이/가’ 대신{' '}
              <span className="font-black text-red-600">‘-께서’</span>, 대상 ‘에게/한테’ 대신{' '}
              <span className="font-black text-red-600">‘-께’</span>를 써요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('할머니께서 웃으세요.', <>할머니<span className="font-black text-red-600">께서</span> 웃으세요.</>)}
              {renderTipBtn('선생님께서 말씀하세요.', <>선생님<span className="font-black text-red-600">께서</span> 말씀하세요.</>)}
              {renderTipBtn('부모님께 인사해요.', <>부모님<span className="font-black text-red-600">께</span> 인사해요.</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘께서’가 올 때는 뒤의 동사도 ‘웃으세요, 말씀하세요’처럼 높임말로 짝을 맞춰 말해요.
            </p>
          </div>
        );

      case 'unit29':
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              친구나 동생을 부를 때 이름 끝{' '}
              <span className="font-black text-amber-600">받침이 있으면</span>{' '}
              <span className="font-black text-red-600">‘-아’</span>,{' '}
              <span className="font-black text-amber-600">없으면</span>{' '}
              <span className="font-black text-red-600">‘-야’</span>를 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-2">
              {renderTipBtn('민수, 민수야', <>민수 → 민수<span className="font-black text-red-600">야</span></>)}
              {renderTipBtn('수진, 수진아', <>수진 → 수진<span className="font-black text-red-600">아</span></>)}
              {renderTipBtn('친구야, 고마워!', <>친구<span className="font-black text-red-600">야</span>, 고마워!</>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              친구나 동물 등 가까운 대상을 부를 때만 쓰며, 선생님이나 어른께는 붙이지 않아요.
            </p>
          </div>
        );

      case 'unit1':
      default:
        return (
          <div className="space-y-3.5 text-slate-800 text-sm sm:text-base leading-relaxed">
            <p className="font-normal text-slate-800">
              명사의 끝음절에{' '}
              <span className="font-black text-amber-600">받침이 있으면</span>{' '}
              <span className="font-black text-red-600">‘은’</span>을,{' '}
              <span className="font-black text-amber-600">없으면</span>{' '}
              <span className="font-black text-red-600">‘는’</span>을 붙여요.
            </p>
            <div className="py-2.5 px-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-around gap-2">
              {renderTipBtn('나, 나는', <><span className="font-black text-amber-600">받침X</span> → 나<span className="font-black text-red-600">는</span></>)}
              {renderTipBtn('동생, 동생은', <><span className="font-black text-amber-600">받침O</span> → 동생<span className="font-black text-red-600">은</span></>)}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ‘은1’은 주제를 나타내거나 대조 및 강조의 뜻을 나타내는 보조사이다. 주격조사 ‘이’와 보조사 ‘은’을 헷갈리는 것은 ‘은’이 주어 자리에 자주 나타나기 때문이다. 그러나 ‘은’은 목적어, 부사어 자리에도 온다. -국립국어원
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              4단원에서 주격조사 ‘이’를 더 자세히 배워요.
            </p>
          </div>
        );
    }
  };

  // Render cols5 unit word + particle interaction
  const renderColsInteractiveWord = () => {
    if (!currentColCard) return null;

    const hintText = COLS_HINTS[currentColCard.id] || '';
    const initParticleForMorph = COLS_INITIAL_PARTICLE[currentColCard.id];
    const isMorphCard = Boolean(initParticleForMorph);

    let displayNounChars: { char: string; color: string }[] = currentColCard.baseNoun
      .split('')
      .map((c) => ({ char: c, color: '#1E293B' }));

    const rawParticleText =
      currentColCard.combinedSegments.slice(1).map((s) => s.text).join('') || '';
    let displayParticleChars: { char: string; color: string }[] = rawParticleText
      .split('')
      .map((c) => ({ char: c, color: '#EF4444' }));

    if (isMorphCard && isCovered) {
      if (!isMagicTransformed) {
        displayParticleChars = initParticleForMorph
          .split('')
          .map((c) => ({ char: c, color: '#EF4444' }));
      } else {
        const seg0 = currentColCard.combinedSegments[0];
        const seg1 = currentColCard.combinedSegments[1];
        displayNounChars = seg0.text.split('').map((c) => ({ char: c, color: seg0.color }));
        displayParticleChars = seg1
          ? seg1.text.split('').map((c) => ({ char: c, color: seg1.color }))
          : [];
      }
    }

    const totalCombinedLen = currentColCard.combinedWord.length;
    const cardTextSizeClass =
      totalCombinedLen >= 7
        ? 'text-2xl sm:text-[36px]'
        : totalCombinedLen >= 6
        ? 'text-3xl sm:text-[42px]'
        : 'text-4xl sm:text-5xl';

    const shouldMorph = Boolean(isMorphCard && isCovered && isMagicTransformed);

    return (
      <div className="w-full flex items-center justify-center min-h-[92px] my-2 sm:my-3 px-10 sm:px-14">
        <div className="w-full max-w-xl flex items-center justify-center">
          {/* LEFT HALF: 명사 영역 */}
          <div className="w-[46%] sm:w-1/2 flex justify-end items-center pr-0">
            <div className="relative inline-flex items-center justify-end bg-white rounded-none shadow-none pl-2 sm:pl-5 pr-0.5 py-2 sm:py-2.5 select-none whitespace-nowrap">
              <div
                style={{
                  fontFamily: FONT_HAND,
                  fontWeight: 900,
                  WebkitTextStroke: '0.8px currentColor',
                }}
                className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-right inline-flex items-center`}
              >
                {displayNounChars.map((item, idx, arr) => {
                  const isLast = idx === arr.length - 1;
                  return (
                    <span
                      key={idx}
                      className={isLast ? 'relative inline-block' : 'inline-block'}
                    >
                      <motion.span
                        key={`${currentColCard.id}-noun-${idx}-${shouldMorph ? 'magic' : 'base'}`}
                        initial={shouldMorph ? { opacity: 0.25, scale: 0.94 } : false}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        style={{ color: item.color }}
                        className="inline-block"
                      >
                        {item.char === ' ' ? '\u00A0' : item.char}
                      </motion.span>
                      {isLast && renderSpeechBubble(hintText)}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT HALF: 조사 슬롯 영역 */}
          <div className="w-[54%] sm:w-1/2 flex justify-start items-center relative pl-0">
            <div className="relative inline-flex items-center justify-start">
              {/* 미적용 상태: 점선 조사 빈칸 */}
              <div
                className={`bg-white/90 rounded-none pl-1 pr-3 sm:pr-5 py-2 sm:py-2.5 flex items-center justify-start transition-opacity duration-150 ${
                  isCovered ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <span className="inline-flex items-center justify-center min-w-[42px] sm:min-w-[52px] h-[38px] sm:h-[46px] px-2 border-2 border-dashed border-[#84C678] rounded-md bg-[#F3FAF0] text-[#3B8232] font-black text-lg sm:text-xl font-korean-gothic">
                  + ?
                </span>
              </div>

              {/* 적용 상태: 위에서 내려오는 조사 카드 */}
              <AnimatePresence>
                {isCovered && (
                  <motion.div
                    initial={{ y: -150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -150, opacity: 0 }}
                    transition={{
                      duration: 0.72,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute left-0 top-0 bottom-0 flex items-center justify-start z-20 pointer-events-none"
                  >
                    <div className="bg-white rounded-none shadow-none pl-0 pr-3 sm:pr-5 py-2 sm:py-2.5 flex items-center justify-start whitespace-nowrap">
                      <div
                        style={{
                          fontFamily: FONT_HAND,
                          fontWeight: 900,
                          WebkitTextStroke: '0.8px currentColor',
                        }}
                        className={`${cardTextSizeClass} font-black tracking-normal leading-tight font-badasseugi text-left inline-flex items-center`}
                      >
                        {displayParticleChars.map((pItem, pIdx) => (
                          <motion.span
                            key={`${currentColCard.id}-part-${pIdx}-${shouldMorph ? 'magic' : 'init'}`}
                            initial={shouldMorph ? { opacity: 0.25, scale: 0.94 } : false}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.45, ease: 'easeInOut' }}
                            style={{ color: pItem.color }}
                            className="inline-block"
                          >
                            {pItem.char}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render rows5 sentence-builder flashcards (Units 3, 7, 11, 15)
  const renderRowInteractiveSentence = () => {
    if (!currentRowCard) return null;

    const hints = ROW_HINTS[currentRowCard.id] || [];
    const isThreeBlocks = currentRowCard.blocks.length >= 3;
    const isFourBlocks = currentRowCard.blocks.length >= 4;
    const blockTextClass = isFourBlocks
      ? 'text-xl sm:text-[26px]'
      : isThreeBlocks
      ? 'text-2xl sm:text-[31px]'
      : 'text-3xl sm:text-[40px]';

    return (
      <div className="w-full flex items-center justify-center min-h-[92px] my-2 sm:my-3 px-11 sm:px-16">
        <div className={`flex flex-wrap items-center justify-center ${isFourBlocks ? 'gap-1.5 sm:gap-2.5' : isThreeBlocks ? 'gap-2 sm:gap-3.5' : 'gap-3 sm:gap-5'}`}>
          {currentRowCard.blocks.map((block, bIdx) => {
            if (block.staticDisplay) {
              return (
                <React.Fragment key={`${currentRowCard.id}-blk-${bIdx}`}>
                  {bIdx > 0 && (
                    <span
                      className={`font-black text-base sm:text-lg font-korean-gothic transition-colors ${
                        isCovered ? 'text-[#448E3A]' : 'text-slate-400'
                      }`}
                    >
                      +
                    </span>
                  )}
                  <div className="inline-flex items-center bg-white px-2 sm:px-3 py-1.5 sm:py-2 shadow-2xs border border-[#C3E0B8] select-none whitespace-nowrap">
                    <div
                      style={{
                        fontFamily: FONT_HAND,
                        fontWeight: 900,
                        WebkitTextStroke: '0.65px currentColor',
                      }}
                      className={`${blockTextClass} font-black tracking-normal leading-tight font-badasseugi inline-block whitespace-nowrap`}
                    >
                      {block.segments.map((seg, sIdx) => (
                        <span
                          key={sIdx}
                          className="whitespace-pre"
                          style={{ color: seg.color }}
                        >
                          {seg.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              );
            }

            const irregularInfo =
              ROW_IRREGULAR_BASE[`${currentRowCard.id}-b${bIdx}`] ||
              (bIdx === 0 ? ROW_IRREGULAR_BASE[currentRowCard.id] : undefined);
            const hasParticleSlot = Boolean(block.segments.length >= 2 || irregularInfo);

            // Default noun text & color
            let nounText = block.segments[0]?.text || '';
            let nounColor = block.segments[0]?.color || '#1E293B';
            let particleText = block.segments[1]?.text || '';
            const particleColor = block.segments[1]?.color || '#EF4444';

            const shouldMorphBlock = Boolean(
              irregularInfo && isCovered && isMagicTransformed
            );

            if (irregularInfo) {
              if (!isCovered || !isMagicTransformed) {
                nounText = irregularInfo.baseNoun;
                nounColor = '#1E293B';
                particleText = irregularInfo.rawParticle;
              } else {
                nounText = block.segments[0]?.text || irregularInfo.baseNoun;
                nounColor = block.segments[0]?.color || '#9333EA';
                particleText = block.segments[1]?.text || '';
              }
            }

            const hintForBlock = hasParticleSlot ? hints[bIdx] || '' : '';

            return (
              <React.Fragment key={`${currentRowCard.id}-blk-${bIdx}`}>
                {bIdx > 0 && (
                  <span
                    className={`font-black text-base sm:text-lg font-korean-gothic transition-colors ${
                      isCovered ? 'text-[#448E3A]' : 'text-slate-400'
                    }`}
                  >
                    +
                  </span>
                )}
                <div className="inline-flex items-center bg-white px-2 sm:px-3 py-1.5 sm:py-2 shadow-2xs border border-[#C3E0B8] select-none whitespace-nowrap">
                  {/* Noun (or Verb if 1 segment) */}
                  <div
                    style={{
                      fontFamily: FONT_HAND,
                      fontWeight: 900,
                      WebkitTextStroke: '0.65px currentColor',
                    }}
                    className={`${blockTextClass} font-black tracking-normal leading-tight font-badasseugi inline-flex items-center`}
                  >
                    {nounText.split('').map((char, cIdx, arr) => {
                      const isLast = cIdx === arr.length - 1;
                      return (
                        <span
                          key={cIdx}
                          className={isLast && hasParticleSlot ? 'relative inline-block' : 'inline-block'}
                        >
                          <motion.span
                            key={`${currentRowCard.id}-b${bIdx}-c${cIdx}-${shouldMorphBlock ? 'magic' : 'base'}`}
                            initial={shouldMorphBlock ? { opacity: 0.25, scale: 0.94 } : false}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.45, ease: 'easeInOut' }}
                            style={{ color: nounColor }}
                            className="inline-block"
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                          {isLast && hasParticleSlot && renderSpeechBubble(hintForBlock, isThreeBlocks)}
                        </span>
                      );
                    })}
                  </div>

                  {/* Particle slot (only for noun+particle blocks) */}
                  {hasParticleSlot && (
                    <div
                      className={`relative inline-flex items-center justify-start ml-0.5 pr-1 sm:pr-2 ${
                        isThreeBlocks ? 'min-w-[34px] sm:min-w-[42px]' : 'min-w-[40px] sm:min-w-[50px]'
                      }`}
                    >
                      {/* Invisible sizer reserves exact horizontal space inside white box for multi-char particles (e.g. 이에요., 예요., 에서) */}
                      <span
                        aria-hidden="true"
                        style={{
                          fontFamily: FONT_HAND,
                          fontWeight: 900,
                          WebkitTextStroke: '0.65px currentColor',
                        }}
                        className={`invisible ${blockTextClass} font-black tracking-normal leading-tight font-badasseugi whitespace-nowrap select-none`}
                      >
                        {particleText || '가'}
                      </span>

                      <span
                        className={`absolute inset-y-0 left-0.5 right-0 my-auto inline-flex items-center justify-center ${
                          isThreeBlocks ? 'h-[30px] sm:h-[34px] text-sm sm:text-base' : 'h-[34px] sm:h-[40px] text-base sm:text-lg'
                        } px-1.5 border-2 border-dashed border-[#84C678] rounded-md bg-[#F3FAF0] text-[#3B8232] font-black font-korean-gothic transition-opacity duration-150 ${
                          isCovered ? 'opacity-0' : 'opacity-100'
                        }`}
                      >
                        ?
                      </span>

                      <AnimatePresence>
                        {isCovered && (
                          <motion.span
                            initial={{ y: -120, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -120, opacity: 0 }}
                            transition={{
                              duration: 0.68,
                              delay: bIdx * 0.16,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                              fontFamily: FONT_HAND,
                              fontWeight: 900,
                              WebkitTextStroke: '0.65px currentColor',
                              color: particleColor,
                            }}
                            className={`absolute left-0 top-0 bottom-0 flex items-center ${blockTextClass} font-black tracking-normal leading-tight font-badasseugi whitespace-nowrap pointer-events-none`}
                          >
                            {particleText}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1312px] lg:max-w-full mx-auto px-1 sm:px-4 lg:px-0 space-y-1 sm:space-y-1.5 font-korean-gothic">
      {/* Main Flashcard Display Area */}
      <div className="w-full max-w-full sm:max-w-3xl lg:max-w-full flex justify-center px-1 sm:px-4 lg:px-0 font-korean-gothic mx-auto">
        <div className="w-full">
          <div
            onClick={handleCardClick}
            className="relative min-h-[400px] sm:min-h-[460px] lg:min-h-[520px] w-full rounded-lg pt-3 sm:pt-5 px-3 sm:px-6 pb-2 sm:pb-5 shadow-lg border-2 sm:border-4 border-[#84C678] flex flex-col justify-between transition-shadow hover:shadow-xl bg-gradient-to-b from-[#F3FAF0] via-[#F9FDF7] to-[#E9F5E4]/75 cursor-pointer select-none overflow-hidden"
          >
            {/* Top-Left Guide Text */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#E7F4E2]/95 border border-[#C3E0B8] text-[#214A1C] text-[11px] sm:text-xs font-black pointer-events-none shadow-xs">
              <span>{fcUiLabels.clickWordGuide}</span>
            </div>

            {/* Top-Right Buttons: 해볼쌤 팁(단어형 단원만) + 힌트 */}
            <div className="absolute top-4 sm:top-5 right-4 sm:right-5 flex items-center gap-2 z-20">
              {!isRowUnit && (
                <button
                  type="button"
                  onClick={handleTipClick}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-md flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs border bg-white/90 hover:bg-amber-50 active:scale-95 border-amber-300 text-amber-950 group"
                  title={fcUiLabels.tipTitle}
                  aria-label={fcUiLabels.tip}
                >
                  <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center pointer-events-none">
                    <ManduMascot size="xs" interactive={false} />
                  </div>
                  <span className="text-[8.5px] sm:text-[9.5px] font-black leading-none mt-0.5 text-amber-900">
                    {fcUiLabels.tip}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={handleMagnifierClick}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs border ${
                  showHint
                    ? 'bg-amber-300 text-amber-950 border-amber-400 ring-2 ring-amber-300'
                    : 'bg-white/90 hover:bg-[#E7F4E2] text-[#214A1C] border-[#C3E0B8]'
                } active:scale-95`}
                title={fcUiLabels.hintTitle}
                aria-label={fcUiLabels.hint}
              >
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#448E3A]" />
                <span className="text-[9px] sm:text-[10px] font-black leading-none mt-0.5">
                  {fcUiLabels.hint}
                </span>
              </button>
            </div>

            {/* Card Center Content */}
            <div className="flex flex-col items-center justify-start sm:justify-center flex-1 text-center pt-14 sm:pt-4 sm:my-auto">
              {/* 1. Illustration */}
              <div className="mb-3 sm:mb-4 flex items-center justify-center">
                <div className="w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center drop-shadow-xs">
                  {currentIllustration && (
                    <img
                      src={currentIllustration}
                      alt={currentAlt}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>

              {/* 2. Interactive Particle Slot */}
              {isRowUnit ? renderRowInteractiveSentence() : renderColsInteractiveWord()}

              {/* 3. Translation Badge (기본 명사 ↔ 조사 결합 뜻 전환) */}
              <div
                className={`mt-3 sm:mt-4 px-3.5 py-0.5 text-sm sm:text-base font-bold rounded-sm border shadow-xs tracking-wide transition-colors duration-300 ${
                  !isRowUnit && isCovered
                    ? 'bg-[#DCEFD5] text-[#1D4219] border-[#84C678]'
                    : 'bg-[#E7F4E2]/95 text-[#214A1C] border-[#C3E0B8]'
                }`}
              >
                [{currentMeaning}]
              </div>

              {/* 4. Sample Sentence Card (clickable to listen) */}
              <button
                type="button"
                onClick={(e) => handleSentenceSpeak(e, fullSentenceText)}
                title={fcUiLabels.listenSentence}
                className="mt-3.5 sm:mt-4.5 px-4 py-2 bg-white/95 hover:bg-[#F3FAF0] rounded-md border border-[#C3E0B8] shadow-sm max-w-md w-full flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Volume2 className="w-4 h-4 text-[#448E3A] shrink-0" />
                <p
                  style={{
                    fontFamily: FONT_HAND,
                    fontWeight: 600,
                  }}
                  className="text-sm sm:text-base font-bold text-slate-800 leading-snug font-badasseugi"
                >
                  {isRowUnit || !currentColCard ? (
                    <>
                      {selectedUnit === 'unit23' && currentRowCard?.id === 'particle-u23-2' ? (
                        <>
                          "너<span className="font-black text-red-600">밖에</span>{' '}
                          <span className="font-black text-purple-700 underline decoration-purple-400 underline-offset-4">
                            안 보여
                          </span>
                          ."
                        </>
                      ) : selectedUnit === 'unit23' && currentRowCard?.id === 'particle-u23-5' ? (
                        <>
                          "사랑<span className="font-black text-red-600">밖에</span> 난{' '}
                          <span className="font-black text-purple-700 underline decoration-purple-400 underline-offset-4">
                            몰라
                          </span>
                          ."
                        </>
                      ) : (
                        <>"{fullSentenceText}"</>
                      )}
                    </>
                  ) : (
                    <>
                      "{currentColCard.sentencePrefix}
                      <span className="font-black text-[#2F6F27]">
                        {currentColCard.sentenceHighlight}
                      </span>
                      {selectedUnit === 'unit21' ? (
                        <span className="font-black text-purple-700 underline decoration-purple-400 underline-offset-4">
                          {currentColCard.sentenceSuffix}
                        </span>
                      ) : (
                        currentColCard.sentenceSuffix
                      )}
                      "
                    </>
                  )}
                </p>
              </button>
            </div>

            {/* Prev (<) + Prev Unit (<<) */}
            <div className="absolute left-1.5 sm:left-3 top-18 sm:top-24 z-[15] flex flex-col gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="h-20 sm:h-24 w-12 sm:w-15 rounded-md bg-transparent hover:bg-[#84C678]/15 active:scale-95 border-2 border-[#84C678] shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-[#69B35C]"
                title={commonUi.prevCard}
                aria-label={commonUi.prevCard}
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#448E3A]" />
              </button>
              <button
                type="button"
                onClick={handlePrevUnit}
                className="h-10 sm:h-12 w-12 sm:w-15 rounded-md bg-transparent hover:bg-[#84C678]/15 active:scale-95 border-2 border-[#84C678] shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-[#69B35C]"
                title={commonUi.prevUnit}
                aria-label={commonUi.prevUnit}
              >
                <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6 text-[#448E3A]" />
              </button>
            </div>

            {/* Next (>) + Next Unit (>>) */}
            <div className="absolute right-1.5 sm:right-3 top-18 sm:top-24 z-[15] flex flex-col gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="h-20 sm:h-24 w-12 sm:w-15 rounded-md bg-transparent hover:bg-[#84C678]/15 active:scale-95 border-2 border-[#84C678] shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-[#69B35C]"
                title={commonUi.nextCard}
                aria-label={commonUi.nextCard}
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#448E3A]" />
              </button>
              <button
                type="button"
                onClick={handleNextUnit}
                className="h-10 sm:h-12 w-12 sm:w-15 rounded-md bg-transparent hover:bg-[#84C678]/15 active:scale-95 border-2 border-[#84C678] shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-[#69B35C]"
                title={commonUi.nextUnit}
                aria-label={commonUi.nextUnit}
              >
                <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#448E3A]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher's Tip Modal */}
      <AnimatePresence>
        {showTipModal && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowTipModal(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs font-korean-gothic select-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 8 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-white rounded-lg p-6 sm:p-7 shadow-2xl border-2 border-[#84C678] text-left"
            >
              <button
                type="button"
                onClick={() => setShowTipModal(false)}
                className="absolute top-4 right-4 p-2 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="닫기"
                aria-label="닫기"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
                <ManduMascot size="sm" interactive={false} />
                <h3 className="text-lg sm:text-xl font-black text-slate-950 font-korean-gothic tracking-tight">
                  {unitMeta.tipHeaderTitle}
                </h3>
              </div>

              {renderTipModalContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
