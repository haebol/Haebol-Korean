import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Play,
  Square,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  RotateCcw,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  Star,
  LayoutGrid
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UiLanguage, FLASHCARD_COMMON_UI, NAV_UI, SUBTAB_UI } from '../i18n/uiTranslations';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';
import { BASIC_LETTERS_ILLUSTRATIONS } from '../data/basicLettersIllustrations';
import { CompactUnitSelectButton } from './CompactUnitSelectButton';
import {
  useAdminCurriculumConfig,
  getOrderedHangeulMeta,
  isUnitLocked,
} from '../utils/adminCurriculumConfig';
import { renderBatchimIllustration } from './PrintableBatchimSheet';
import {
  HANGEUL_GROUPS,
  BasicCombinationData,
  HangeulCardData,
  HangeulUnitGroup,
} from '../data/hangeulGroupsData';

export { HANGEUL_GROUPS };
export type { BasicCombinationData, HangeulCardData, HangeulUnitGroup };

// [한글]-[자음모음] 4~8쪽과 100% 동일한 획순별 컬러 팔레트 (1획 파랑, 2획 빨강, 3획 검정, 4획 초록 등)
const STROKE_COLORS = [
  '#0077c8', // 1획: 파랑 (Blue)
  '#dc2626', // 2획: 빨강 (Red)
  '#18181b', // 3획: 검정 (Black/Dark Slate)
  '#16a34a', // 4획: 초록 (Green)
  '#d97706', // 5획: 황갈색 (Amber)
  '#9333ea', // 6획: 보라 (Purple)
  '#0891b2', // 7획: 청록 (Cyan)
  '#be123c', // 8획: 로즈 (Rose)
];

// 자음 음가 기본 발음 (마지막 획 직전까지 재생)
export const CONSONANT_BASE_SOUNDS: Record<string, string> = {
  'ㄱ': '그',
  'ㄴ': '느',
  'ㄷ': '드',
  'ㄹ': '르',
  'ㅁ': '므',
  'ㅂ': '브',
  'ㅅ': '스',
  'ㅇ': '으',
  'ㅈ': '즈',
  'ㅊ': '츠',
  'ㅋ': '크',
  'ㅌ': '트',
  'ㅍ': '프',
  'ㅎ': '흐',
  'ㄲ': '끄',
  'ㄸ': '뜨',
  'ㅃ': '쁘',
  'ㅆ': '쓰',
  'ㅉ': '쯔',
};

// Helper labels by selected language
const UI_TEXT: Record<UiLanguage, {
  clickHint: string;
  strokeGuide: string;
  totalStrokes: string;
  listen: string;
  stopContinuous: string;
  stopShort: string;
  replay: string;
  tipTitle: string;
  sampleWordLabel: string;
}> = {
  ko: {
    clickHint: '카드를 눌러 한 획씩 따라 써 보세요! ✍️',
    strokeGuide: '클릭하여 획순 확인',
    totalStrokes: '획',
    listen: '연속감상',
    stopContinuous: '감상 멈춤',
    stopShort: '멈춤',
    replay: '다시 쓰기',
    tipTitle: '쓰기 순서 팁',
    sampleWordLabel: '예시 단어'
  },
  en: {
    clickHint: 'Touch card to trace stroke by stroke! ✍️',
    strokeGuide: 'Click to see strokes',
    totalStrokes: 'strokes',
    listen: 'Auto Play',
    stopContinuous: 'Stop',
    stopShort: 'Stop',
    replay: 'Start Over',
    tipTitle: 'Stroke Tip',
    sampleWordLabel: 'Sample Word'
  },
  vi: {
    clickHint: 'Chạm vào thẻ để viết từng nét một! ✍️',
    strokeGuide: 'Chạm để xem nét viết',
    totalStrokes: 'nét',
    listen: 'Liên tục',
    stopContinuous: 'Dừng lại',
    stopShort: 'Dừng',
    replay: 'Bắt đầu lại',
    tipTitle: 'Mẹo viết',
    sampleWordLabel: 'Từ ví dụ'
  },
  bn: {
    clickHint: '১টি করে স্ট্রোক লিখতে কার্ড স্পর্শ করুন! ✍️',
    strokeGuide: 'স্ট্রোক দেখতে ক্লিক করুন',
    totalStrokes: 'স্ট্রোক',
    listen: 'ধারাবাহিক',
    stopContinuous: 'থামুন',
    stopShort: 'থামুন',
    replay: 'শুরু থেকে লিখুন',
    tipTitle: 'লেখার টিপস',
    sampleWordLabel: 'নমুনা শব্দ'
  },
  zh: {
    clickHint: '点击卡片按笔顺一笔一画书写！✍️',
    strokeGuide: '点击查看笔顺',
    totalStrokes: '画',
    listen: '连续播放',
    stopContinuous: '停止播放',
    stopShort: '停止',
    replay: '重新开始',
    tipTitle: '笔顺提示',
    sampleWordLabel: '例词'
  },
  ru: {
    clickHint: 'Коснитесь карточки, чтобы писать по одной черте! ✍️',
    strokeGuide: 'Нажмите для черт',
    totalStrokes: 'черт(ы)',
    listen: 'Авто',
    stopContinuous: 'Стоп',
    stopShort: 'Стоп',
    replay: 'С начала',
    tipTitle: 'Подсказка',
    sampleWordLabel: 'Пример слова'
  },
  ja: {
    clickHint: 'カードをタップして1画ずつ書いてみよう！✍️',
    strokeGuide: 'クリックして書き順確認',
    totalStrokes: '画',
    listen: '連続再生',
    stopContinuous: '停止',
    stopShort: '停止',
    replay: '最初から',
    tipTitle: '書き順のコツ',
    sampleWordLabel: '例文単語'
  },
  mn: {
    clickHint: 'Карт дээр дарж 1 зурлагаар бичээрэй! ✍️',
    strokeGuide: 'Дарж зурлага харах',
    totalStrokes: 'зурлага',
    listen: 'Тасралтгүй',
    stopContinuous: 'Зогсоох',
    stopShort: 'Зогсоох',
    replay: 'Эхнээс нь',
    tipTitle: 'Зурлагын зөвлөгөө',
    sampleWordLabel: 'Жишээ үг'
  }
};

interface HangeulStrokeFlashcardSectionProps {
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  savedWords?: string[];
  onToggleSave?: (word: string) => void;
  selectedGroupId?: string;
  onSelectGroupId?: (groupId: string) => void;
  onOpenOverview?: () => void;
  hideDesktopUnitBar?: boolean;
  isMenuCollapsed?: boolean;
}

export const HangeulStrokeFlashcardSection: React.FC<HangeulStrokeFlashcardSectionProps> = ({
  lang,
  uiLang = 'ko',
  savedWords = [],
  onToggleSave,
  selectedGroupId: propSelectedGroupId,
  onSelectGroupId,
  onOpenOverview,
  hideDesktopUnitBar = false,
  isMenuCollapsed = false,
}) => {
  const [adminConfig] = useAdminCurriculumConfig();
  const orderedHangeulMeta = React.useMemo(() => getOrderedHangeulMeta(adminConfig), [adminConfig]);
  const [internalGroupId, setInternalGroupId] = useState<string>('basic_consonants');
  const selectedGroupId = propSelectedGroupId ?? internalGroupId;
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [drawnStrokesCount, setDrawnStrokesCount] = useState<number>(0);
  const [isContinuousPlaying, setIsContinuousPlaying] = useState<boolean>(false);

  // Continuous playback session token & active timer refs for clean cancellation
  const continuousSessionRef = useRef<number>(0);
  const isContinuousPlayingRef = useRef<boolean>(false);
  const activeTimersRef = useRef<number[]>([]);

  const clearActiveTimers = () => {
    activeTimersRef.current.forEach((id) => window.clearTimeout(id));
    activeTimersRef.current = [];
  };

  const stopContinuousPlay = () => {
    continuousSessionRef.current += 1;
    isContinuousPlayingRef.current = false;
    setIsContinuousPlaying(false);
    clearActiveTimers();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    return () => {
      stopContinuousPlay();
    };
  }, []);

  const handleGroupChange = (groupId: string) => {
    stopContinuousPlay();
    setInternalGroupId(groupId);
    onSelectGroupId?.(groupId);
    setCardIndex(0);
    setDrawnStrokesCount(0);
  };

  useEffect(() => {
    stopContinuousPlay();
    setCardIndex(0);
    setDrawnStrokesCount(0);
  }, [selectedGroupId]);

  const currentGroup = HANGEUL_GROUPS.find((g) => g.id === selectedGroupId) || HANGEUL_GROUPS[0];
  const card = currentGroup.cards[cardIndex] || currentGroup.cards[0];
  const t = UI_TEXT[uiLang] || UI_TEXT.ko;
  const commonUi = FLASHCARD_COMMON_UI[uiLang] || FLASHCARD_COMMON_UI.ko;
  const navUi = NAV_UI[uiLang] || NAV_UI.ko;
  const subUi = SUBTAB_UI[uiLang] || SUBTAB_UI.ko;

  const isSaved = savedWords.includes(card.name) || savedWords.includes(card.char);

  const handleToggleFavorite = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playSuccessChime();
    onToggleSave?.(card.name);
  };

  // Resolve the spoken text for a given stroke of a 1~4 unit card
  const getStrokeAudioText = (strokeNum: number, targetCard: HangeulCardData, badge: string): string | null => {
    if (targetCard.combination || !targetCard.strokes) return null;
    const totalStrokes = targetCard.strokes.length;
    const isLastStroke = strokeNum >= totalStrokes;

    if (badge === '쌍자음') {
      const doubleSound = CONSONANT_BASE_SOUNDS[targetCard.char] || '끄';
      return !isLastStroke ? doubleSound : targetCard.name;
    } else if (badge === '자음') {
      const baseSound = CONSONANT_BASE_SOUNDS[targetCard.char] || '그';
      if (totalStrokes === 1) {
        return `${baseSound}, ${targetCard.name}`;
      }
      return !isLastStroke ? baseSound : targetCard.name;
    }
    return targetCard.name;
  };

  // Helper to play stroke sound for units 1~4
  const playStrokeAudio = (strokeNum: number, targetCard: typeof card, badge: string) => {
    const text = getStrokeAudioText(strokeNum, targetCard, badge);
    if (text) {
      speakKorean(text, 1.0, 1.0);
    }
  };

  const waitWithSession = (ms: number, sessionId: number): Promise<boolean> =>
    new Promise((resolve) => {
      const timerId = window.setTimeout(() => {
        activeTimersRef.current = activeTimersRef.current.filter((id) => id !== timerId);
        resolve(continuousSessionRef.current === sessionId);
      }, ms);
      activeTimersRef.current.push(timerId);
    });

  const speakWithSession = (text: string, sessionId: number): Promise<boolean> =>
    new Promise((resolve) => {
      if (continuousSessionRef.current !== sessionId) {
        resolve(false);
        return;
      }
      let settled = false;
      const done = () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(fallbackTimer);
        activeTimersRef.current = activeTimersRef.current.filter((id) => id !== fallbackTimer);
        resolve(continuousSessionRef.current === sessionId);
      };
      // Safety fallback in case browser SpeechSynthesis never triggers onend
      const fallbackTimer = window.setTimeout(done, 2600);
      activeTimersRef.current.push(fallbackTimer);

      const started = speakKorean(text, 1.0, 1.0, done);
      if (!started) {
        done();
      }
    });

  // 연속감상: 현재 보고 있는 글자(예: ㅍ)부터 해당 단원의 마지막 글자(예: ㅎ)까지 모든 획순과 발음을 자동으로 순차 재생
  const handleToggleContinuousPlay = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (isContinuousPlayingRef.current) {
      stopContinuousPlay();
      playCutePop();
      return;
    }

    const groupSnapshot = currentGroup;
    const strokeCards = groupSnapshot.cards;
    if (!strokeCards || strokeCards.length === 0) return;

    const startIdx = Math.min(Math.max(0, cardIndex), strokeCards.length - 1);

    playCutePop();
    const sessionId = continuousSessionRef.current + 1;
    continuousSessionRef.current = sessionId;
    isContinuousPlayingRef.current = true;
    setIsContinuousPlaying(true);

    for (let idx = startIdx; idx < strokeCards.length; idx++) {
      if (continuousSessionRef.current !== sessionId) return;

      const targetCard = strokeCards[idx];
      const totalStrokes = targetCard.strokes?.length || 0;

      // 카드 전환 및 획순 초기화
      setCardIndex(idx);
      setDrawnStrokesCount(0);

      const okInit = await waitWithSession(140, sessionId);
      if (!okInit) return;

      if (totalStrokes > 0) {
        for (let strokeNum = 1; strokeNum <= totalStrokes; strokeNum++) {
          if (continuousSessionRef.current !== sessionId) return;

          setDrawnStrokesCount(strokeNum);
          const audioText = getStrokeAudioText(strokeNum, targetCard, groupSnapshot.badge);

          // 획순 그리기 애니메이션(1.05s)과 음성 발화가 모두 자연스럽게 마무리될 때까지 대기
          await Promise.all([
            audioText ? speakWithSession(audioText, sessionId) : Promise.resolve(true),
            waitWithSession(1120, sessionId),
          ]);

          if (continuousSessionRef.current !== sessionId) return;

          // 같은 글자 내 다음 획으로 넘어가기 전 짧은 호흡
          if (strokeNum < totalStrokes) {
            const okBetweenStrokes = await waitWithSession(180, sessionId);
            if (!okBetweenStrokes) return;
          }
        }
      } else {
        await speakWithSession(targetCard.name, sessionId);
      }

      if (continuousSessionRef.current !== sessionId) return;

      // 완성된 글자를 감상한 뒤 다음 글자로 이동
      const okNextCard = await waitWithSession(480, sessionId);
      if (!okNextCard) return;
    }

    if (continuousSessionRef.current === sessionId) {
      isContinuousPlayingRef.current = false;
      setIsContinuousPlaying(false);
      playSuccessChime();
    }
  };

  const [wiggle, setWiggle] = useState([false, false, false]);

  const playSequence = async () => {
    if (!card.combination) return;
    if (card.combination.isWordCard) {
      speakKorean(card.sampleWord, 1.0, 1.0);
      return;
    }
    const step2Sound = card.combination.isDoubleBatchim
      ? !card.combination.firstBatchim?.isSilent
        ? card.combination.firstBatchim?.sound || card.combination.vowelSound
        : card.combination.secondBatchim?.sound || card.combination.vowelSound
      : card.combination.vowelSound;

    // 1. 앞부분 (자음 또는 기본음절)
    setWiggle([true, false, false]);
    speakKorean(card.combination.consonantSound, 1.0, 1.0);
    await new Promise(r => setTimeout(r, 650));
    setWiggle([false, false, false]);
    await new Promise(r => setTimeout(r, 150));

    // 2. 뒷부분 (모음 또는 받침)
    setWiggle([false, true, false]);
    speakKorean(step2Sound, 1.0, 1.0);
    await new Promise(r => setTimeout(r, 650));
    setWiggle([false, false, false]);
    await new Promise(r => setTimeout(r, 150));

    // 3. 완성 음절
    setWiggle([false, false, true]);
    speakKorean(card.combination.syllableSound, 1.0, 1.0);
    await new Promise(r => setTimeout(r, 650));
    setWiggle([false, false, false]);
  };

  // 1~4단원(자음, 쌍자음, 모음, 복합모음)에 한해, 화면이 켜지자마자 1획이 그려지며 그에 맞는 소리가 나게 설정
  // (연속감상 중에는 연속감상 컨트롤러가 획순·음성을 직접 제어하므로 중복 실행 방지)
  useEffect(() => {
    setWiggle([false, false, false]);
    if (isContinuousPlayingRef.current) return;
    if (!card.combination && card.strokes && card.strokes.length > 0) {
      setDrawnStrokesCount(1);
      const timer = setTimeout(() => {
        if (!isContinuousPlayingRef.current) {
          playStrokeAudio(1, card, currentGroup.badge);
        }
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setDrawnStrokesCount(0);
    }
  }, [selectedGroupId, cardIndex]);


  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopContinuousPlay();
    playCutePop();
    if (cardIndex < currentGroup.cards.length - 1) {
      setCardIndex(cardIndex + 1);
    } else {
      setCardIndex(0);
    }
  };

  const handleCardClick = () => {
    if (isContinuousPlayingRef.current) {
      stopContinuousPlay();
      playCutePop();
      return;
    }

    if (card.combination) {
      playSequence();
      return;
    }

    if (!card.strokes) return;

    if (drawnStrokesCount < card.strokes.length) {
      const nextCount = drawnStrokesCount + 1;
      setDrawnStrokesCount(nextCount);
      playCutePop();
      playStrokeAudio(nextCount, card, currentGroup.badge);
    } else {
      // 쓰기 완료 후 터치하면 다음 플카로 넘어가기!
      playCutePop();
      handleNext();
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopContinuousPlay();
    playCutePop();
    if (cardIndex > 0) {
      setCardIndex(cardIndex - 1);
    } else {
      setCardIndex(currentGroup.cards.length - 1);
    }
  };

  const handlePrevUnit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopContinuousPlay();
    playCutePop();
    const curIdx = HANGEUL_GROUPS.findIndex((g) => g.id === selectedGroupId);
    const prevIdx = curIdx > 0 ? curIdx - 1 : HANGEUL_GROUPS.length - 1;
    handleGroupChange(HANGEUL_GROUPS[prevIdx].id);
  };

  const handleNextUnit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopContinuousPlay();
    playCutePop();
    const curIdx = HANGEUL_GROUPS.findIndex((g) => g.id === selectedGroupId);
    const nextIdx = curIdx < HANGEUL_GROUPS.length - 1 ? curIdx + 1 : 0;
    handleGroupChange(HANGEUL_GROUPS[nextIdx].id);
  };

  const handleListen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (card.combination) {
      if (card.combination.isWordCard) {
        speakKorean(`${card.sampleWord}, ${card.meanings[lang] || card.meanings.en}`, 1.0, 1.0);
      } else {
        const c = card.combination.consonantSound;
        const v = card.combination.isDoubleBatchim
          ? !card.combination.firstBatchim?.isSilent
            ? card.combination.firstBatchim?.sound || card.combination.vowelSound
            : card.combination.secondBatchim?.sound || card.combination.vowelSound
          : card.combination.vowelSound;
        const s = card.combination.syllableSound;
        speakKorean(`${c}, ${v}, ${s}`, 1.0, 1.0);
      }
    } else {
      speakKorean(`${card.name}, ${card.sampleWord}`, 1.0, 1.0);
    }
  };

  const handleReplay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    stopContinuousPlay();
    playCutePop();
    setDrawnStrokesCount(0);
    if (card.combination) {
      handleListen(e as any);
    }
  };

  return (
    <div className="w-full flex flex-col items-center select-none font-korean-gothic pb-0 sm:pb-1">
      {/* Row 5 Top Bar (Mobile Only when desktop control bar is active): 소제목(한글기초) + [1x1 단원드롭] [1x1 그리드] */}
      {!isMenuCollapsed && (
        <div className={`${hideDesktopUnitBar ? 'lg:hidden' : ''} sticky top-[66px] sm:top-[74px] lg:static z-[28] bg-[#F4F5F7]/95 backdrop-blur-md pb-1 mb-1.5 border-b border-amber-200/80 no-print -mx-1 w-[calc(100%+0.5rem)] sm:mx-auto sm:w-full max-w-3xl px-2.5 sm:px-4 select-none`}>
        <div className="flex items-center justify-between gap-2 h-[38px] sm:h-[42px]">
          <div className="flex items-center gap-3.5 sm:gap-6 min-w-0 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => playCutePop()}
              className="relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-600"
              title={subUi.flashcardTabs.hangeulBasic}
            >
              <span>{subUi.flashcardTabs.hangeulBasic}</span>
            </button>
          </div>

          <div className="flex items-center gap-1 shrink-0 min-w-0">
            <CompactUnitSelectButton
              value={selectedGroupId}
              onChange={(val) => handleGroupChange(val)}
              options={orderedHangeulMeta.map((g) => ({
                value: g.id,
                label: `${g.titleKo} (${g.cardCount}자)`,
                disabled: isUnitLocked(adminConfig, 'hangeul', g.id),
                lockedLabel: '준비중',
              }))}
              theme="amber"
              title={subUi.studyControls.unitSelectTitle}
              ariaLabel={subUi.studyControls.unitSelectTitle}
              align="right"
              className="w-[155px] xs:w-[175px] sm:w-[225px]"
            />
          </div>
        </div>
        </div>
      )}

      {/* 2. Main Flashcard Container: 모바일 화면 꽉 차게 확장 (px-1 sm:px-4), PC에서 max-w-5xl 좌우 끝선 정렬 */}
      <div className="w-full max-w-full sm:max-w-3xl lg:max-w-full flex justify-center px-1 sm:px-4 lg:px-0 mx-auto">
        <div className="w-full">
          <div
            onClick={handleCardClick}
            className="w-full min-h-[400px] sm:min-h-[460px] lg:min-h-[520px] bg-[#fffbeb] rounded-lg border-2 sm:border-4 border-amber-300 shadow-[0_8px_24px_rgba(217,119,6,0.10)] pt-3 sm:pt-5 px-3 sm:px-6 pb-3 sm:pb-5 flex flex-col items-center justify-between transition-all hover:shadow-[0_12px_30px_rgba(217,119,6,0.16)] cursor-pointer relative overflow-hidden"
          >
            {/* Top-Left Guide Text: 용언 플카 '낱말을 클릭해보세요'와 동일 디자인/크기 (레몬색) */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#FEF9C3]/95 border border-[#FDE047] text-[#854D0E] text-[11px] sm:text-xs font-black pointer-events-none shadow-xs">
              <span>{card.combination ? commonUi.touchHint : t.strokeGuide}</span>
            </div>

            {/* Top-Right: 1~4단원 전용 연속감상 작은 아이콘 버튼 (용언 플카 '힌트' 자리와 동일 위치) */}
            {!card.combination && (
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 flex items-center gap-2 z-20">
                <button
                  type="button"
                  onClick={handleToggleContinuousPlay}
                  className={`min-w-9 sm:min-w-10 h-9 sm:h-10 px-1.5 rounded-md flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xs border active:scale-95 ${
                    isContinuousPlaying
                      ? 'bg-[#441A75] text-white border-[#441A75] ring-2 ring-purple-300'
                      : 'bg-white/90 hover:bg-amber-100 text-amber-950 border-amber-300'
                  }`}
                  title={isContinuousPlaying ? t.stopContinuous : t.listen}
                  aria-label={isContinuousPlaying ? t.stopContinuous : t.listen}
                >
                  {isContinuousPlaying ? (
                    <>
                      <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-white" />
                      <span className="text-[8.5px] sm:text-[9.5px] font-black leading-none mt-0.5 whitespace-nowrap">
                        {t.stopShort}
                      </span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-amber-700" />
                      <span className="text-[8.5px] sm:text-[9.5px] font-black leading-none mt-0.5 whitespace-nowrap">
                        {t.listen}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* 5단원 이상(글자 결합 카드): 모바일에서 좌우 내비게이션 버튼(<</<<, >/>>) 터치를 가리지 않도록 래퍼는 pointer-events-none, 버튼만 pointer-events-auto */}
            {card.combination && (
              <div className="pointer-events-none relative w-full pt-12 sm:pt-10 pb-1 flex items-center justify-center z-20">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleListen();
                  }}
                  className="pointer-events-auto h-9 sm:h-11 px-4 sm:px-6 rounded-md bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors border border-amber-400 shadow-2xs cursor-pointer active:scale-95"
                  title={commonUi.listenAll}
                >
                  <Volume2 className="w-4 h-4 text-amber-900" />
                  <span>{commonUi.listenAll}</span>
                </button>
              </div>
            )}

            {/* Center Stage: Combination Formula vs Square Handwriting Grid */}
            {card.combination ? (
              card.combination.isWordCard ? (
                /* 단어 복습 카드 (기본글자 및 받침글자 1~3음절 단어 모두 지원) */
                <div className="flex-1 sm:flex-none sm:my-auto py-2 sm:py-5 w-full flex flex-col items-center justify-center text-center">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      speakKorean(card.sampleWord, 1.0, 1.0);
                    }}
                    className="cursor-pointer hover:scale-105 active:scale-95 transition-transform mb-3 flex items-center justify-center p-3 rounded-lg bg-white border-2 border-amber-200 shadow-md"
                    title={`단어 듣기: ${card.sampleWord}`}
                  >
                    {card.combination.batchimIllustrationType ? (
                      <div className="scale-110 sm:scale-120 flex items-center justify-center">
                        {renderBatchimIllustration(
                          card.combination.batchimIllustrationType,
                          card.combination.batchimSpeechRules || [],
                          card.combination.batchimRuleFormat
                        )}
                      </div>
                    ) : (
                      BASIC_LETTERS_ILLUSTRATIONS[card.sampleWord] || (
                        <span className="text-6xl sm:text-7xl">🦁</span>
                      )
                    )}
                  </div>

                  {/* 단어 결합 수식 */}
                  {card.combination.wordSyllables && card.combination.wordSyllables.length > 0 ? (
                    /* 3음절 이상 단어 수식 (예: 스+웨+터=스웨터, 숟+가+락=숟가락) */
                    <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2 select-none">
                      {card.combination.wordSyllables.map((syl, sIdx) => (
                        <React.Fragment key={`word-syl-part-${sIdx}`}>
                          {sIdx > 0 && <span className="text-purple-600 font-black text-xs sm:text-sm">➕</span>}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakKorean(syl.sound, 1.0, 1.0);
                            }}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#fffbeb] border-2 border-slate-700 flex items-center justify-center shadow-2xs cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                            title={`소리 듣기: ${syl.char}`}
                          >
                            <span className="text-lg sm:text-xl font-black text-slate-900 font-badasseugi">
                              {syl.char}
                            </span>
                          </button>
                        </React.Fragment>
                      ))}
                      <span className="text-purple-600 font-black text-xs sm:text-sm">🟰</span>
                      <div className="px-3 py-1 rounded-md bg-amber-300 text-amber-950 font-black text-lg sm:text-xl border-2 border-amber-400 shadow-xs font-badasseugi">
                        {card.combination.syllable}
                      </div>
                    </div>
                  ) : card.combination.isJamoWordCard ? (
                    /* 1음절 자모/받침 결합 단어 수식 (예: 배, 얘, 뭐, 표, 곰, 숲, 닭 등) */
                    card.combination.isDoubleBatchim ? (
                      <div className="flex items-center justify-center gap-2 mb-2 select-none">
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-white border-2 border-slate-700 flex items-center justify-center shadow-2xs">
                            <span className="text-base sm:text-lg font-black text-slate-900 font-badasseugi">
                              {card.combination.consonant}
                            </span>
                          </div>
                          <span className="text-purple-600 font-black text-[10px] leading-none">➕</span>
                          <div className="flex items-center gap-1">
                            {card.combination.firstBatchim && (
                              <div
                                className={`w-7 h-7 rounded-md border-2 flex items-center justify-center shadow-2xs ${
                                  card.combination.firstBatchim.isSilent
                                    ? 'bg-[#eff6ff] border-[#3B82F6] text-[#3B82F6]'
                                    : 'bg-[#fff1f2] border-[#E11D48] text-[#E11D48]'
                                }`}
                              >
                                <span className="text-sm font-black font-badasseugi">
                                  {card.combination.firstBatchim.char}
                                </span>
                              </div>
                            )}
                            {card.combination.secondBatchim && (
                              <div
                                className={`w-7 h-7 rounded-md border-2 flex items-center justify-center shadow-2xs ${
                                  card.combination.secondBatchim.isSilent
                                    ? 'bg-[#eff6ff] border-[#3B82F6] text-[#3B82F6]'
                                    : 'bg-[#fff1f2] border-[#E11D48] text-[#E11D48]'
                                }`}
                              >
                                <span className="text-sm font-black font-badasseugi">
                                  {card.combination.secondBatchim.char}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-purple-600 font-black text-sm">🟰</span>
                        <div className="px-3.5 py-1.5 rounded-md bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl border-2 border-amber-400 shadow-xs font-badasseugi">
                          {card.combination.syllable}
                        </div>
                      </div>
                    ) : card.combination.isBatchimCard ? (
                      <div className="flex items-center justify-center gap-2 mb-2 select-none">
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center shadow-2xs">
                            <span className="text-base sm:text-lg font-black text-red-600 font-badasseugi">
                              {card.combination.consonant}
                            </span>
                          </div>
                          <span className="text-purple-600 font-black text-[10px] leading-none">➕</span>
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center shadow-2xs">
                            <span className="text-base sm:text-lg font-black text-blue-600 font-badasseugi">
                              {card.combination.vowel}
                            </span>
                          </div>
                        </div>
                        <span className="text-purple-600 font-black text-sm">🟰</span>
                        <div className="px-3.5 py-1.5 rounded-md bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl border-2 border-amber-400 shadow-xs font-badasseugi">
                          {card.combination.syllable}
                        </div>
                      </div>
                    ) : card.combination.vowelComponents ? (
                      <div className="flex items-center justify-center gap-2 mb-2 select-none">
                        <div className="flex items-center gap-1">
                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center shadow-2xs">
                              <span className="text-base sm:text-lg font-black text-red-600 font-badasseugi">
                                {card.combination.consonant}
                              </span>
                            </div>
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center shadow-2xs">
                              <span className="text-base sm:text-lg font-black text-blue-600 font-badasseugi">
                                {card.combination.vowelComponents[0]}
                              </span>
                            </div>
                          </div>
                          <span className="text-purple-600 font-black text-xs">➕</span>
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center shadow-2xs">
                            <span className="text-base sm:text-lg font-black text-blue-600 font-badasseugi">
                              {card.combination.vowelComponents[1]}
                            </span>
                          </div>
                        </div>
                        <span className="text-purple-600 font-black text-sm">🟰</span>
                        <div className="px-3.5 py-1.5 rounded-md bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl border-2 border-amber-400 shadow-xs font-badasseugi">
                          {card.combination.syllable}
                        </div>
                      </div>
                    ) : ['ㅗ', 'ㅜ', 'ㅡ', 'ㅛ', 'ㅠ'].includes(card.combination.vowel) ? (
                      <div className="flex items-center justify-center gap-2 mb-2 select-none">
                        <div className="flex flex-col items-center gap-0.5">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center shadow-2xs">
                            <span className="text-base sm:text-lg font-black text-red-600 font-badasseugi">
                              {card.combination.consonant}
                            </span>
                          </div>
                          <span className="text-purple-600 font-black text-[10px] leading-none">➕</span>
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center shadow-2xs">
                            <span className="text-base sm:text-lg font-black text-blue-600 font-badasseugi">
                              {card.combination.vowel}
                            </span>
                          </div>
                        </div>
                        <span className="text-purple-600 font-black text-sm">🟰</span>
                        <div className="px-3.5 py-1.5 rounded-md bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl border-2 border-amber-400 shadow-xs font-badasseugi">
                          {card.combination.syllable}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 mb-2 select-none">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center shadow-2xs">
                          <span className="text-lg sm:text-xl font-black text-red-600 font-badasseugi">
                            {card.combination.consonant}
                          </span>
                        </div>
                        <span className="text-purple-600 font-black text-sm">➕</span>
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center shadow-2xs">
                          <span className="text-lg sm:text-xl font-black text-blue-600 font-badasseugi">
                            {card.combination.vowel}
                          </span>
                        </div>
                        <span className="text-purple-600 font-black text-sm">🟰</span>
                        <div className="px-3.5 py-1.5 rounded-md bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl border-2 border-amber-400 shadow-xs font-badasseugi">
                          {card.combination.syllable}
                        </div>
                      </div>
                    )
                  ) : ['ㅗ', 'ㅜ', 'ㅡ', 'ㅛ', 'ㅠ'].includes(card.combination.vowel) ? (
                    <div className="flex items-center justify-center gap-2 mb-2 select-none">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center shadow-2xs">
                          <span className="text-base sm:text-lg font-black text-red-600 font-badasseugi">
                            {card.combination.consonant}
                          </span>
                        </div>
                        <span className="text-purple-600 font-black text-[10px] leading-none">➕</span>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center shadow-2xs">
                          <span className="text-base sm:text-lg font-black text-blue-600 font-badasseugi">
                            {card.combination.vowel}
                          </span>
                        </div>
                      </div>
                      <span className="text-purple-600 font-black text-sm">🟰</span>
                      <div className="px-3.5 py-1.5 rounded-md bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl border-2 border-amber-400 shadow-xs font-badasseugi">
                        {card.combination.syllable}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 mb-2 select-none">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakKorean(card.combination!.consonantSound, 1.0, 1.0);
                        }}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#fffbeb] border-2 border-slate-700 flex items-center justify-center shadow-2xs cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        title={`소리 듣기: ${card.combination.consonant}`}
                      >
                        <span className="text-xl sm:text-2xl font-black text-slate-900 font-badasseugi">
                          {card.combination.consonant}
                        </span>
                      </button>
                      <span className="text-purple-600 font-black text-sm">➕</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakKorean(card.combination!.vowelSound, 1.0, 1.0);
                        }}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#fffbeb] border-2 border-slate-700 flex items-center justify-center shadow-2xs cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                        title={`소리 듣기: ${card.combination.vowel}`}
                      >
                        <span className="text-xl sm:text-2xl font-black text-slate-900 font-badasseugi">
                          {card.combination.vowel}
                        </span>
                      </button>
                      <span className="text-purple-600 font-black text-sm">🟰</span>
                      <div className="px-3.5 py-1 rounded-md bg-amber-300 text-amber-950 font-black text-xl sm:text-2xl border-2 border-amber-400 shadow-xs font-badasseugi">
                        {card.combination.syllable}
                      </div>
                    </div>
                  )}

                  <h3
                    style={{
                      fontFamily:
                        "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                      fontWeight: 900
                    }}
                    className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight font-badasseugi mt-1"
                  >
                    {card.sampleWord}
                  </h3>
                  {card.combination.pronunciationNote && (
                    <span className="text-sm sm:text-base font-black text-rose-600 font-sans mt-0.5">
                      {card.combination.pronunciationNote}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-bold text-amber-900 font-sans tracking-wide mt-0.5">
                    [{card.sampleWordRomaja}] · {card.meanings[lang] || card.meanings.en}
                  </span>
                </div>
              ) : (
                /* 1~3번 카드: 결합 수식 (겹받침 / 상하 받침·모음 / 복합모음 / 좌우 결합) */
                <div className="flex-1 sm:flex-none sm:my-auto py-2 sm:py-5 w-full flex flex-col items-center justify-center">
                  {card.combination.isDoubleBatchim ? (
                    /* 12단원 겹받침 카드: 상단 [기본음절] + 하단 [자음1][자음2] = 우측 [완성글자] + [표준발음] */
                    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-5 w-full select-none">
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] sm:text-xs font-black text-slate-700 font-sans tracking-tight mb-0.5">
                          {card.combination.consonantRomaja}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.consonantSound, 1.0, 1.0);
                          }}
                          className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-white border-3 border-slate-800 flex flex-col items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all group ${wiggle[0] ? 'animate-card-pop' : ''}`}
                          title={`기본 글자 듣기: [${card.combination.consonantSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#0f172a'
                            }}
                            className="text-2xl sm:text-4xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.consonant}
                          </span>
                        </button>

                        <span className="text-purple-600 font-black text-xs sm:text-sm select-none my-1">
                          ➕
                        </span>

                        <div className="flex items-start gap-2 sm:gap-2.5">
                          {card.combination.firstBatchim && (
                            <div className="flex flex-col items-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    !card.combination!.firstBatchim!.isSilent &&
                                    (card.combination!.firstBatchim!.sound || card.combination!.firstBatchim!.char)
                                  ) {
                                    speakKorean(
                                      card.combination!.firstBatchim!.sound || card.combination!.firstBatchim!.char,
                                      1.0,
                                      1.0
                                    );
                                  }
                                }}
                                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-3 flex items-center justify-center shadow-md transition-all ${
                                  card.combination.firstBatchim.isSilent
                                    ? 'bg-[#eff6ff] border-[#3B82F6] text-[#3B82F6] cursor-default'
                                    : 'bg-[#fff1f2] border-[#E11D48] text-[#E11D48] cursor-pointer hover:scale-105 active:scale-95'
                                } ${wiggle[1] && !card.combination.firstBatchim.isSilent ? 'animate-card-pop' : ''}`}
                                title={
                                  !card.combination.firstBatchim.isSilent
                                    ? `받침 소리 듣기: [${card.combination.firstBatchim.char}]`
                                    : '묵음 (발음하지 않음)'
                                }
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important"
                                  }}
                                  className="text-2xl sm:text-3xl font-black leading-none"
                                >
                                  {card.combination.firstBatchim.char}
                                </span>
                              </button>
                              <span
                                className={`mt-1 text-[10px] sm:text-xs font-black font-sans tracking-tight whitespace-nowrap ${
                                  card.combination.firstBatchim.isSilent ? 'text-[#2563eb]' : 'text-[#e11d48]'
                                }`}
                              >
                                {card.combination.firstBatchim.romaja}
                              </span>
                            </div>
                          )}

                          {card.combination.secondBatchim && (
                            <div className="flex flex-col items-center">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (
                                    !card.combination!.secondBatchim!.isSilent &&
                                    (card.combination!.secondBatchim!.sound || card.combination!.secondBatchim!.char)
                                  ) {
                                    speakKorean(
                                      card.combination!.secondBatchim!.sound || card.combination!.secondBatchim!.char,
                                      1.0,
                                      1.0
                                    );
                                  }
                                }}
                                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-3 flex items-center justify-center shadow-md transition-all ${
                                  card.combination.secondBatchim.isSilent
                                    ? 'bg-[#eff6ff] border-[#3B82F6] text-[#3B82F6] cursor-default'
                                    : 'bg-[#fff1f2] border-[#E11D48] text-[#E11D48] cursor-pointer hover:scale-105 active:scale-95'
                                } ${wiggle[1] && !card.combination.secondBatchim.isSilent ? 'animate-card-pop' : ''}`}
                                title={
                                  !card.combination.secondBatchim.isSilent
                                    ? `받침 소리 듣기: [${card.combination.secondBatchim.char}]`
                                    : '묵음 (발음하지 않음)'
                                }
                              >
                                <span
                                  style={{
                                    fontFamily:
                                      "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important"
                                  }}
                                  className="text-2xl sm:text-3xl font-black leading-none"
                                >
                                  {card.combination.secondBatchim.char}
                                </span>
                              </button>
                              <span
                                className={`mt-1 text-[10px] sm:text-xs font-black font-sans tracking-tight whitespace-nowrap ${
                                  card.combination.secondBatchim.isSilent ? 'text-[#2563eb]' : 'text-[#e11d48]'
                                }`}
                              >
                                {card.combination.secondBatchim.romaja}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="text-purple-600 font-black text-2xl sm:text-4xl select-none mx-1 sm:mx-2">
                        🟰
                      </span>

                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.syllableSound, 1.0, 1.0);
                          }}
                          className={`w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl bg-[#fffbeb] border-3 border-slate-700 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all hover:border-slate-900 group ${wiggle[2] ? 'animate-card-pop' : ''}`}
                          title={`완성 음절 소리 듣기: [${card.combination.syllableSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#0f172a'
                            }}
                            className="text-3xl sm:text-5xl md:text-6xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.syllable}
                          </span>
                        </button>
                        <span className="mt-1.5 text-xs sm:text-sm font-black text-slate-900 font-sans tracking-tight">
                          {card.combination.syllableRomaja}
                        </span>
                        {card.combination.pronunciationNote && (
                          <span className="mt-0.5 text-sm sm:text-base font-black text-[#E11D48] font-sans tracking-tight">
                            {card.combination.pronunciationNote}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : card.combination.isBatchimCard || ['ㅗ', 'ㅜ', 'ㅡ', 'ㅛ', 'ㅠ'].includes(card.combination.vowel) ? (
                    /* 2. 상하 결합형 (받침카드 및 ㅗ, ㅜ, ㅡ, ㅛ, ㅠ): 위(빨강) + 아래(파랑) = 완성음절 */
                    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 w-full select-none">
                      {/* 좌측 세로 스택: [빨강] + [파랑] */}
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] sm:text-xs font-black text-rose-900 font-sans tracking-tight mb-0.5">
                          {card.combination.consonantRomaja}
                        </span>

                        {/* 1. 빨강 카드 */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.consonantSound, 1.0, 1.0);
                          }}
                          className={`w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-[#fef2f2] border-3 border-[#f87171] flex flex-col items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all hover:border-red-500 group ${wiggle[0] ? 'animate-card-pop' : ''}`}
                          title={`소리 듣기: [${card.combination.consonantSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#dc2626'
                            }}
                            className="text-2xl sm:text-4xl md:text-5xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.consonant}
                          </span>
                        </button>

                        {/* ➕ 연산자 */}
                        <span className="text-purple-600 font-black text-xs sm:text-sm select-none my-0.5 sm:my-1">
                          ➕
                        </span>

                        {/* 2. 파랑 카드 */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.vowelSound, 1.0, 1.0);
                          }}
                          className={`w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-[#eff6ff] border-3 border-[#60a5fa] flex flex-col items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all hover:border-blue-500 group ${wiggle[1] ? 'animate-card-pop' : ''}`}
                          title={`소리 듣기: [${card.combination.vowelSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#0077c8'
                            }}
                            className="text-2xl sm:text-4xl md:text-5xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.vowel}
                          </span>
                        </button>

                        <span className="text-[11px] sm:text-xs font-black text-blue-900 font-sans tracking-tight mt-0.5">
                          {card.combination.vowelRomaja}
                        </span>
                      </div>

                      {/* 🟰 연산자 */}
                      <span className="text-purple-600 font-black text-2xl sm:text-4xl select-none mx-1 sm:mx-2">
                        🟰
                      </span>

                      {/* 3. 검정 카드 (완성 음절) */}
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.syllableSound, 1.0, 1.0);
                          }}
                          className={`w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl bg-[#fffbeb] border-3 border-slate-700 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all hover:border-slate-900 group ${wiggle[2] ? 'animate-card-pop' : ''}`}
                          title={`완성 음절 소리 듣기: [${card.combination.syllableSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#0f172a'
                            }}
                            className="text-3xl sm:text-5xl md:text-6xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.syllable}
                          </span>
                        </button>
                        <span className="mt-1.5 text-xs sm:text-sm font-black text-slate-900 font-sans tracking-tight">
                          {card.combination.syllableRomaja}
                        </span>
                        {card.combination.pronunciationNote && (
                          <span className="mt-0.5 text-sm sm:text-base font-black text-[#E11D48] font-sans tracking-tight">
                            {card.combination.pronunciationNote}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : card.combination.vowelComponents ? (
                    /* 3. 복합모음 결합형 (ㅘ, ㅝ, ㅚ, ㅟ, ㅙ, ㅞ, ㅢ): [자음+아래모음] + [오른쪽모음] = 완성음절 */
                    <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 w-full select-none">
                      {/* 좌측: [자음 / 아래모음] */}
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] sm:text-xs font-black text-rose-900 font-sans tracking-tight mb-0.5">
                          {card.combination.consonantRomaja}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.consonantSound, 1.0, 1.0);
                          }}
                          className={`w-14 h-14 sm:w-17 sm:h-17 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-[#fef2f2] border-3 border-[#f87171] flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all hover:border-red-500 group ${wiggle[0] ? 'animate-card-pop' : ''}`}
                          title={`자음 소리 듣기: [${card.combination.consonantSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#dc2626'
                            }}
                            className="text-2xl sm:text-4xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.consonant}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.vowelSound, 1.0, 1.0);
                          }}
                          className={`mt-1.5 w-14 h-12 sm:w-17 sm:h-14 md:w-18 md:h-15 rounded-xl bg-[#eff6ff] border-3 border-[#60a5fa] flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all hover:border-blue-500 group ${wiggle[1] ? 'animate-card-pop' : ''}`}
                          title={`모음 소리 듣기: [${card.combination.vowelSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#0077c8'
                            }}
                            className="text-2xl sm:text-3xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.vowelComponents[0]}
                          </span>
                        </button>
                      </div>

                      {/* ➕ 연산자 + 아래 복합모음 로마자 */}
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-purple-600 font-black text-base sm:text-2xl select-none">
                          ➕
                        </span>
                        <span className="mt-1 text-[11px] sm:text-xs font-black text-blue-900 font-sans tracking-tight">
                          {card.combination.vowelRomaja}
                        </span>
                      </div>

                      {/* 오른쪽 모음 */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakKorean(card.combination!.vowelSound, 1.0, 1.0);
                        }}
                        className={`w-13 h-22 sm:w-15 sm:h-26 md:w-16 md:h-28 rounded-xl sm:rounded-2xl bg-[#eff6ff] border-3 border-[#60a5fa] flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all hover:border-blue-500 group ${wiggle[1] ? 'animate-card-pop' : ''}`}
                        title={`모음 소리 듣기: [${card.combination.vowelSound}]`}
                      >
                        <span
                          style={{
                            fontFamily:
                              "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                            color: '#0077c8'
                          }}
                          className="text-2xl sm:text-4xl font-black leading-none group-hover:scale-110 transition-transform"
                        >
                          {card.combination.vowelComponents[1]}
                        </span>
                      </button>

                      {/* 🟰 연산자 */}
                      <span className="text-purple-600 font-black text-xl sm:text-3xl select-none">
                        🟰
                      </span>

                      {/* 완성 음절 */}
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.syllableSound, 1.0, 1.0);
                          }}
                          className={`w-18 h-18 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-2xl bg-[#fffbeb] border-3 border-slate-700 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all hover:border-slate-900 group ${wiggle[2] ? 'animate-card-pop' : ''}`}
                          title={`완성 음절 소리 듣기: [${card.combination.syllableSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#0f172a'
                            }}
                            className="text-3xl sm:text-5xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.syllable}
                          </span>
                        </button>
                        <span className="mt-1.5 text-xs sm:text-sm font-black text-slate-900 font-sans tracking-tight">
                          {card.combination.syllableRomaja}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* 1. 좌우 결합형 (ㅏ, ㅓ, ㅣ, ㅐ, ㅔ, ㅒ, ㅖ 등) */
                    <div className="flex items-center justify-center gap-1 sm:gap-3 md:gap-4 w-full select-none">
                      {/* 1. 빨강 카드 (자음) */}
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.consonantSound, 1.0, 1.0);
                          }}
                          className={`w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-2xl bg-[#fef2f2] border-3 border-[#f87171] flex flex-col items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all hover:border-red-500 group ${wiggle[0] ? 'animate-card-pop' : ''}`}
                          title={`자음 소리 듣기: [${card.combination.consonantSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#dc2626'
                            }}
                            className="text-3xl sm:text-5xl md:text-6xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.consonant}
                          </span>
                        </button>
                        <span className="mt-1.5 text-xs sm:text-sm font-black text-rose-900 font-sans tracking-tight">
                          {card.combination.consonantRomaja}
                        </span>
                      </div>

                      {/* ➕ 연산자 */}
                      <span className="text-purple-600 font-black text-xl sm:text-3xl select-none mb-3 sm:mb-4">
                        ➕
                      </span>

                      {/* 2. 파랑 카드 (모음) */}
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.vowelSound, 1.0, 1.0);
                          }}
                          className={`w-16 h-16 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-2xl bg-[#eff6ff] border-3 border-[#60a5fa] flex flex-col items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all hover:border-blue-500 group ${wiggle[1] ? 'animate-card-pop' : ''}`}
                          title={`모음 소리 듣기: [${card.combination.vowelSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#0077c8'
                            }}
                            className="text-3xl sm:text-5xl md:text-6xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.vowel}
                          </span>
                        </button>
                        <span className="mt-1.5 text-xs sm:text-sm font-black text-blue-900 font-sans tracking-tight">
                          {card.combination.vowelRomaja}
                        </span>
                      </div>

                      {/* 🟰 연산자 */}
                      <span className="text-purple-600 font-black text-xl sm:text-3xl select-none mb-3 sm:mb-4">
                        🟰
                      </span>

                      {/* 3. 검정 카드 (완성 음절) */}
                      <div className="flex flex-col items-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.combination!.syllableSound, 1.0, 1.0);
                          }}
                          className={`w-18 h-18 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-2xl bg-[#fffbeb] border-3 border-slate-700 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all hover:border-slate-900 group ${wiggle[2] ? 'animate-card-pop' : ''}`}
                          title={`완성 음절 소리 듣기: [${card.combination.syllableSound}]`}
                        >
                          <span
                            style={{
                              fontFamily:
                                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              color: '#0f172a'
                            }}
                            className="text-3xl sm:text-5xl md:text-6xl font-black leading-none group-hover:scale-110 transition-transform"
                          >
                            {card.combination.syllable}
                          </span>
                        </button>
                        <span className="mt-1.5 text-xs sm:text-sm font-black text-slate-900 font-sans tracking-tight">
                          {card.combination.syllableRomaja}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              /* 기존 자음/모음 획순 쓰기 애니메이션 스테이지 */
              <div className="flex-1 w-full pt-12 sm:pt-10 pb-2 sm:pb-3 relative flex flex-col items-center justify-center gap-3 sm:gap-4">
                {/* Square Grid Box (Four-Quadrant 십자선 가이드) */}
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-lg bg-white border-2 border-dashed border-amber-300 shadow-inner flex items-center justify-center p-2.5 sm:p-3 overflow-hidden">
                  {/* Dashed Crosshair Lines */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t-2 border-dashed border-amber-200 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l-2 border-dashed border-amber-200 pointer-events-none" />

                  {/* SVG Stroke Renderer */}
                  <svg
                    viewBox="0 0 160 160"
                    className="w-full h-full relative z-10"
                    fill="none"
                  >
                    {/* Layer 1: 컬러풀한 자음, 모음 */}
                    {card.strokes?.map((pathD, sIdx) => (
                      <path
                        key={`base-color-${card.id}-${sIdx}`}
                        d={pathD}
                        stroke={STROKE_COLORS[sIdx % STROKE_COLORS.length]}
                        strokeWidth="13"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}

                    {/* Layer 2: 터치 시 순차적으로 덮어써지는 보라색 글씨 */}
                    {card.strokes?.slice(0, drawnStrokesCount).map((pathD, sIdx) => {
                      const isLatestStroke = sIdx === drawnStrokesCount - 1;
                      return (
                        <path
                          key={`purple-stroke-${card.id}-${sIdx}-${drawnStrokesCount}`}
                          d={pathD}
                          stroke="#441A75"
                          strokeWidth="14"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            strokeDasharray: 450,
                            strokeDashoffset: isLatestStroke ? 450 : 0,
                            animation: isLatestStroke
                              ? 'hangeulSingleStrokeDraw 1.05s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                              : 'none'
                          }}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Letter Romanization & Sound Tag below Canvas */}
                <div className="flex items-center gap-2.5">
                  <span
                    className="text-2xl sm:text-3xl font-black text-slate-900"
                    style={{
                      fontFamily:
                        "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important"
                    }}
                  >
                    {card.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-sm text-xs sm:text-sm font-black bg-purple-100 text-[#441A75] border border-purple-200">
                    {card.romaja}
                  </span>
                </div>
              </div>
            )}

            {/* 왼쪽 이전 (<) + 이전단원 (<<) 버튼 */}
            <div className="absolute left-1.5 sm:left-3 top-18 sm:top-24 z-[30] flex flex-col gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="h-20 sm:h-24 w-11 sm:w-15 rounded-md bg-transparent hover:bg-amber-500/10 active:scale-95 border-2 border-amber-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-amber-400"
                title={commonUi.prevCard}
                aria-label={commonUi.prevCard}
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-amber-700" />
              </button>
              <button
                type="button"
                onClick={handlePrevUnit}
                className="h-10 sm:h-12 w-11 sm:w-15 rounded-md bg-transparent hover:bg-amber-500/10 active:scale-95 border-2 border-amber-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-amber-400"
                title={commonUi.prevUnit}
                aria-label={commonUi.prevUnit}
              >
                <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
              </button>
            </div>

            {/* 오른쪽 다음 (>) + 다음단원 (>>) 버튼 */}
            <div className="absolute right-1.5 sm:right-3 top-18 sm:top-24 z-[30] flex flex-col gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="h-20 sm:h-24 w-11 sm:w-15 rounded-md bg-transparent hover:bg-amber-500/10 active:scale-95 border-2 border-amber-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-amber-400"
                title={commonUi.nextCard}
                aria-label={commonUi.nextCard}
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-amber-700" />
              </button>
              <button
                type="button"
                onClick={handleNextUnit}
                className="h-10 sm:h-12 w-11 sm:w-15 rounded-md bg-transparent hover:bg-amber-500/10 active:scale-95 border-2 border-amber-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-amber-400"
                title={commonUi.nextUnit}
                aria-label={commonUi.nextUnit}
              >
                <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation Keyframes for Stroke Drawing */}
      <style>{`
        @keyframes hangeulSingleStrokeDraw {
          0% {
            stroke-dashoffset: 450;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};
