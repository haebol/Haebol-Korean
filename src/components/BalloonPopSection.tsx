import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, RefreshCw, Star, Heart, Trophy, ArrowRight, Play, ChevronDown } from 'lucide-react';
import { VocabularyItem, SupportedLanguage, getCircledNumber, getLanguageMeta } from '../types';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { speakKorean, playCutePop, playSuccessChime, playGentleBoop } from '../utils/audio';
import { ManduMascot } from './ManduMascot';

interface BalloonPopSectionProps {
  vocabulary: VocabularyItem[];
  lang: SupportedLanguage;
  selectedChapter?: number;
  onSelectChapter?: (ch: number) => void;
  hideChapterBar?: boolean;
}

interface BalloonItem {
  id: string;
  item: VocabularyItem;
  color: {
    bg: string;
    border: string;
    glow: string;
    text: string;
  };
  isPopped: boolean;
  isWobbling: boolean;
  xOffset: number; // slight random offset for natural layout
  funnyFace?: { emoji: string; text: string };
}

const FUNNY_FACES = [
  { emoji: '🤪', text: '메롱! 😜' },
  { emoji: '🥳', text: '야호! 🥳' },
  { emoji: '🤩', text: '반짝반짝! 🤩' },
  { emoji: '🥸', text: '변장 얍! 🥸' },
  { emoji: '🤠', text: '우와아! 🤠' },
  { emoji: '😝', text: '헤헤헤! 😝' },
  { emoji: '🥴', text: '빙글빙글~ 🥴' },
  { emoji: '😆', text: '하하호호! 😆' },
];

const BALLOON_COLORS = [
  { bg: 'from-pink-300 to-rose-400', border: 'border-pink-300', glow: 'shadow-pink-200', text: 'text-rose-950' },
  { bg: 'from-fuchsia-300 to-pink-400', border: 'border-fuchsia-300', glow: 'shadow-fuchsia-200', text: 'text-pink-950' },
  { bg: 'from-amber-200 to-rose-300', border: 'border-amber-200', glow: 'shadow-amber-200', text: 'text-amber-950' },
  { bg: 'from-sky-300 to-indigo-300', border: 'border-sky-300', glow: 'shadow-sky-200', text: 'text-indigo-950' },
  { bg: 'from-emerald-300 to-teal-400', border: 'border-emerald-300', glow: 'shadow-emerald-200', text: 'text-teal-950' },
];

export const BalloonPopSection: React.FC<BalloonPopSectionProps> = ({
  vocabulary,
  lang,
  selectedChapter,
  onSelectChapter,
  hideChapterBar = false,
}) => {
  const [internalChapter, setInternalChapter] = useState<number>(selectedChapter ?? 1);
  const activeChapter = selectedChapter !== undefined ? selectedChapter : internalChapter;

  const handleChapterChange = (newCh: number) => {
    setInternalChapter(newCh);
    onSelectChapter?.(newCh);
  };

  const [round, setRound] = useState(1);
  const [targetItem, setTargetItem] = useState<VocabularyItem | null>(null);
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [stars, setStars] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [hintMessage, setHintMessage] = useState<string>('');
  const [roundTargets, setRoundTargets] = useState<VocabularyItem[]>([]);
  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);

  const TOTAL_ROUNDS = 5;

  // Pool of available words: strictly from activeChapter
  const pool = useMemo(() => {
    return vocabulary.filter(v => v.ch === activeChapter);
  }, [vocabulary, activeChapter]);

  // Setup round with strictly scoped distractors
  const setupRound = (roundNum: number, targetsList: VocabularyItem[] = roundTargets) => {
    if (pool.length < 4 || targetsList.length === 0) return;

    const target = targetsList[(roundNum - 1) % targetsList.length];

    // CRITICAL FIX: Distractors MUST strictly come from pool (the selected chapter)!
    // NEVER from vocabulary when in chapter mode!
    const otherPool = pool.filter(v => v.ko !== target.ko);
    const shuffledOthers = [...otherPool].sort(() => 0.5 - Math.random()).slice(0, 3);

    // 4 balloons total (1 correct, 3 distractors) - ALL 4 FROM THE SAME CHAPTER!
    const roundItems = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());

    const balloonData: BalloonItem[] = roundItems.map((item, index) => ({
      id: `${item.ko}-${index}-${Date.now()}`,
      item,
      color: BALLOON_COLORS[index % BALLOON_COLORS.length],
      isPopped: false,
      isWobbling: false,
      xOffset: (index % 2 === 0 ? -1 : 1) * (Math.random() * 6),
    }));

    setTargetItem(target);
    setBalloons(balloonData);
    setHintMessage('');

    // Play target word sound automatically
    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    audioTimerRef.current = setTimeout(() => {
      speakKorean(target.ko, 0.85);
    }, 250);
  };

  const initGame = () => {
    if (pool.length < 4) return;
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const targets = shuffled.slice(0, TOTAL_ROUNDS);
    setRoundTargets(targets);
    setRound(1);
    setStars(0);
    setIsGameFinished(false);
    setupRound(1, targets);
  };

  // Initialize or restart
  useEffect(() => {
    initGame();

    return () => {
      if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    };
  }, [activeChapter, pool]);

  const handleBalloonTap = (balloon: BalloonItem) => {
    if (!targetItem || balloon.isPopped) return;

    const isCorrect = balloon.item.ko === targetItem.ko;

    if (isCorrect) {
      playCutePop();
      playSuccessChime();

      speakKorean(balloon.item.ko, 0.9);

      // Pick a random funny face
      const pickedFace = FUNNY_FACES[Math.floor(Math.random() * FUNNY_FACES.length)];

      // Mark popped with funny face
      setBalloons(prev =>
        prev.map(b => (b.id === balloon.id ? { ...b, isPopped: true, funnyFace: pickedFace } : b))
      );

      // Star & celebration
      setStars(prev => prev + 1);

      // Next round after enjoying the funny face
      setTimeout(() => {
        if (round >= TOTAL_ROUNDS) {
          setIsGameFinished(true);
          playSuccessChime();
        } else {
          const nextRound = round + 1;
          setRound(nextRound);
          setupRound(nextRound, roundTargets);
        }
      }, 1100);
    } else {
      // Gentle warm feedback - wobble balloon and replay sound
      playGentleBoop();
      setBalloons(prev =>
        prev.map(b => (b.id === balloon.id ? { ...b, isWobbling: true } : b))
      );

      setHintMessage('아쉬워요! 소리를 다시 듣고 찾아봐요 🌸');

      setTimeout(() => {
        setBalloons(prev =>
          prev.map(b => (b.id === balloon.id ? { ...b, isWobbling: false } : b))
        );
      }, 500);

      // Replay sound so toddler learns
      setTimeout(() => {
        if (targetItem) speakKorean(targetItem.ko, 0.85);
      }, 400);
    }
  };

  const handleReplayTargetSound = () => {
    if (targetItem) {
      playCutePop();
      speakKorean(targetItem.ko, 0.85);
    }
  };

  const handleRestartGame = () => {
    playCutePop();
    initGame();
  };

  const labelsDict: Record<SupportedLanguage | 'ko', {
    gameTitle: string;
    prompt: string;
    replayBtn: string;
    starsLabel: string;
    congrats: string;
    playAgain: string;
  }> = {
    ko: {
      gameTitle: '🎈 알록달록 풍선 터뜨리기',
      prompt: '들리는 한국어 풍선을 터뜨려보세요!',
      replayBtn: '🔊 소리 다시 듣기',
      starsLabel: '모은 별',
      congrats: '축하해요! 풍선을 모두 터뜨렸어요! 🎉',
      playAgain: '다시 하기 🎈',
    },
    en: {
      gameTitle: '🎈 Colorful Bubble Pop',
      prompt: 'Listen to the Korean and pop the matching balloon!',
      replayBtn: '🔊 Listen Again',
      starsLabel: 'Stars Collected',
      congrats: 'Super Duper! All Balloons Popped!',
      playAgain: 'Play Again 🎈',
    },
    vi: {
      gameTitle: '🎈 Bắn bong bóng sắc màu',
      prompt: 'Lắng nghe tiếng Hàn và bắn quả bóng đúng nhé!',
      replayBtn: '🔊 Nghe lại',
      starsLabel: 'Ngôi sao đã nhận',
      congrats: 'Tuyệt đỉnh! Bé đã bắn nổ hết bóng rồi!',
      playAgain: 'Chơi lại lần nữa 🎈',
    },
    bn: {
      gameTitle: '🎈 রঙিন বেলুন গেম',
      prompt: 'কোরিয়ান উচ্চারণ শুনে সঠিক বেলুনটি ফাটান!',
      replayBtn: '🔊 আবার শুনুন',
      starsLabel: 'অর্জিত তারা',
      congrats: 'অসাধারণ! সব বেলুন ফেটে গেছে!',
      playAgain: 'আবার খেলুন 🎈',
    },
    zh: {
      gameTitle: '🎈 缤纷气球泡泡乐',
      prompt: '听韩语音频，戳破正确的韩文字气球吧！',
      replayBtn: '🔊 重新收听',
      starsLabel: '已获星星',
      congrats: '太棒了！气球全部戳破啦！',
      playAgain: '再玩一次 🎈',
    },
    ru: {
      gameTitle: '🎈 Лопай цветные шарики',
      prompt: 'Слушайте корейский язык и лопните нужный шарик!',
      replayBtn: '🔊 Послушать еще раз',
      starsLabel: 'Собранные звёзды',
      congrats: 'Супер! Все шарики лопнули!',
      playAgain: 'Играть снова 🎈',
    },
    ja: {
      gameTitle: '🎈 カラフル風船割りゲーム',
      prompt: '韓国語を聴いて、合う風船を割ってね！',
      replayBtn: '🔊 もう一度聴く',
      starsLabel: '獲得した星',
      congrats: 'すごい！全部の風船を割りました！',
      playAgain: 'もう一度あそぶ 🎈',
    },
    mn: {
      gameTitle: '🎈 Өнгөлөг бөмбөлөг хагалах',
      prompt: 'Солонгос хэлээр сонсоод тохирох бөмбөлгийг хагалаарай!',
      replayBtn: '🔊 Дахин сонсох',
      starsLabel: 'Цуглуулсан од',
      congrats: 'Гайхалтай! Бүх бөмбөлгийг хагаллаа!',
      playAgain: 'Дахин тоглох 🎈',
    },
  };

  const labels = labelsDict[lang as (SupportedLanguage | 'ko')] || labelsDict.ko;

  return (
    <div className="w-full space-y-1 sm:space-y-1.5 max-w-4xl mx-auto font-korean-gothic overflow-x-clip">
      {/* Row 5 Sticky Top Bar */}
      {!hideChapterBar && (
        <div className="sticky top-[80px] sm:top-[90px] z-[22] bg-[#FFF5F8]/95 backdrop-blur-md pb-1 w-full">
          <div className="relative w-full max-w-md mx-auto">
            <select
              value={activeChapter}
              onChange={(e) => {
                playCutePop();
                handleChapterChange(Number(e.target.value));
              }}
              className="w-full h-8 sm:h-8.5 pl-3 pr-8 rounded-none bg-white hover:bg-rose-50/80 border border-rose-300 text-rose-950 font-black text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-rose-400 font-korean-gothic shadow-none truncate"
              title="단원 선택"
            >
              {CHAPTER_LIST.map((ch) => (
                <option key={ch.ch} value={ch.ch}>
                  {getChapterCircledTitle(ch.ch, lang)}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-rose-600 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Main Game Stage - 카트게임과 통일된 예쁜 컨테이너 디자인 */}
      {!isGameFinished ? (
        <div className="bg-[#fff5f7] border-2 border-rose-200 rounded-3xl p-3 sm:p-5 shadow-md shadow-rose-200/40 flex flex-col font-korean-gothic min-h-[440px] justify-between">
          {/* 오디오 재생 영역 (사운드 버튼만 상단에 배치) */}
          <div className="flex flex-col items-center mb-2 sm:mb-2.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReplayTargetSound}
              className="h-10 sm:h-11 px-6 sm:px-8 rounded-full bg-[#D94A6B] hover:bg-[#BE3A58] active:scale-95 text-white font-black text-xs sm:text-base shadow-md shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border border-rose-300 select-none"
              title={labels.replayBtn}
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <span>{labels.replayBtn}</span>
            </motion.button>
          </div>

          {/* 4 Floating Balloons Grid Area */}
          <div className="relative z-10 w-full my-3 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-center justify-items-center">
            {balloons.map((balloon) => {
              if (balloon.isPopped) {
                return (
                  <div
                    key={balloon.id}
                    className="w-28 sm:w-34 md:w-36 h-32 sm:h-36 flex flex-col items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -25 }}
                      animate={{ scale: [0, 1.4, 1.1], rotate: [0, 15, -10, 0] }}
                      transition={{ duration: 0.45, ease: 'backOut' }}
                      className="flex flex-col items-center justify-center select-none"
                    >
                      <span className="text-5xl sm:text-6xl drop-shadow-md animate-bounce">
                        {balloon.funnyFace?.emoji || '🤪'}
                      </span>
                      <span className="mt-1 text-xs sm:text-sm font-black text-rose-600 bg-white/95 px-2.5 py-0.5 rounded-full border border-pink-200 shadow-2xs">
                        {balloon.funnyFace?.text || '웃긴 표정! 🤪'}
                      </span>
                    </motion.div>
                  </div>
                );
              }

              return (
                <motion.div
                  key={balloon.id}
                  animate={
                    balloon.isWobbling
                      ? { rotate: [-6, 6, -4, 4, 0], scale: [1, 0.95, 1] }
                      : {
                          y: [0, -8, 0],
                          rotate: [-1.5, 1.5, -1.5],
                        }
                  }
                  transition={{
                    duration: 2.8 + Math.random() * 0.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="flex flex-col items-center cursor-pointer select-none group"
                  onClick={() => handleBalloonTap(balloon)}
                >
                  {/* Balloon Body - Optimized shape for Hangul Word Typography */}
                  <div
                    className={`relative w-28 sm:w-34 md:w-36 h-32 sm:h-36 rounded-[50%_50%_50%_50%_/_44%_44%_56%_56%] bg-gradient-to-b ${balloon.color.bg} px-2 py-3 flex flex-col items-center justify-center shadow-lg ${balloon.color.glow} border-2.5 ${balloon.color.border} active:scale-95 group-hover:scale-105 transition-transform`}
                  >
                    {/* Balloon Shine Highlight */}
                    <div className="absolute top-2.5 left-3.5 w-3.5 sm:w-4 h-6 sm:h-7 bg-white/40 rounded-full rotate-[-25deg] blur-[0.5px] pointer-events-none" />

                    {/* Pure Hangul Word Only */}
                    <span className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] text-center leading-tight tracking-normal px-2 break-keep select-none font-korean-gothic">
                      {balloon.item.ko}
                    </span>

                    {/* Balloon Knot */}
                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3.5 h-2 bg-pink-400 rounded-sm shadow-2xs" />
                  </div>

                  {/* Balloon String */}
                  <svg className="w-4 h-6 text-pink-300" viewBox="0 0 20 40">
                    <path
                      d="M10 0 Q 5 20, 10 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Star Collection Bar (모은 별 기능 유지) */}
          <div className="relative z-10 w-full flex items-center justify-between px-4 py-2.5 bg-white/90 rounded-2xl border border-pink-200 shadow-2xs mt-2">
            <span className="text-xs sm:text-sm font-black text-rose-900 flex items-center gap-1.5">
              <span>⭐</span>
              <span>{labels.starsLabel} ({stars}/{TOTAL_ROUNDS})</span>
            </span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 transition-all ${
                    i < stars
                      ? 'text-amber-400 fill-amber-300 scale-110'
                      : 'text-pink-200'
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* 안내 문구 영역 (풍선 조작 영역 아래에 배치) */}
          <div className="text-center mt-3 pt-2 border-t border-rose-100">
            <span className="text-xs sm:text-sm font-bold text-slate-600 font-korean-gothic">
              {labels.prompt}
            </span>
          </div>
        </div>
      ) : (
        /* Victory Screen */
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-b from-pink-50 via-rose-50 to-[#FFF0F5] rounded-3xl p-6 sm:p-8 shadow-lg border-3 border-pink-300 text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 rounded-3xl bg-pink-100 border-2 border-pink-300 flex items-center justify-center text-3xl shadow-sm mb-3">
            👑
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-rose-950 mb-1">
            {labels.congrats}
          </h3>
          <p className="text-sm text-rose-600 font-bold mb-5">
            5개 풍선을 모두 완벽하게 맞혔어요! 참 잘했어요 ⭐⭐⭐
          </p>

          <div className="flex items-center gap-2 mb-6">
            <Star className="w-8 h-8 text-amber-400 fill-amber-300 animate-bounce" />
            <Star className="w-10 h-10 text-amber-400 fill-amber-300 animate-bounce" style={{ animationDelay: '0.1s' }} />
            <Star className="w-8 h-8 text-amber-400 fill-amber-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>

          <div className="mb-6">
            <ManduMascot size="md" mood="happy" interactive={false} />
          </div>

          <button
            type="button"
            onClick={handleRestartGame}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 active:scale-95 text-white font-black text-base sm:text-lg rounded-2xl shadow-md shadow-pink-200 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{labels.playAgain}</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
