import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, ChevronDown, Volume2, Trophy, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';
import { VocabularyItem, SupportedLanguage, getLanguageMeta } from '../types';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { speakKorean, playCutePop, playSuccessChime, playGentleBoop, playApplauseFanfare, playBeethovenFateMemeSound } from '../utils/audio';
import { VocabVisual } from './VocabVisual';

interface QuizSectionProps {
  vocabulary: VocabularyItem[];
  lang: SupportedLanguage;
  selectedChapter?: number;
  onSelectChapter?: (ch: number) => void;
  hideChapterBar?: boolean;
}

interface Question {
  target: VocabularyItem;
  options: VocabularyItem[];
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  vocabulary,
  lang,
  selectedChapter,
  onSelectChapter,
  hideChapterBar = false,
}) => {
  const [internalChapter, setInternalChapter] = useState<number>(selectedChapter ?? 1);
  const activeChapter = selectedChapter !== undefined ? selectedChapter : internalChapter;

  const TOTAL_STOPS = 10;
  const [stops, setStops] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<VocabularyItem | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionQueue, setQuestionQueue] = useState<VocabularyItem[]>([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isArrivalModalOpen, setIsArrivalModalOpen] = useState(false);
  const [showHazardSign, setShowHazardSign] = useState(false);
  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pool of items for quiz: strictly scoped to activeChapter (exactly 10 words per chapter)
  const availablePool = useMemo(() => {
    return vocabulary.filter(v => v.ch === activeChapter);
  }, [vocabulary, activeChapter]);

  // Generate question with strictly scoped distractors
  const buildQuestion = (idx: number, queue: VocabularyItem[]) => {
    if (queue.length === 0 || availablePool.length < 4) return;
    const target = queue[idx % queue.length];

    // Distractors come strictly from the selected chapter
    const otherPool = availablePool.filter(v => v.ko !== target.ko);
    const shuffledOthers = [...otherPool].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3);

    // Combine & shuffle 4 options
    const options = [target, ...distractors].sort(() => 0.5 - Math.random());

    setCurrentQuestion({ target, options });
    setSelectedOption(null);
    setWrongAttempts([]);
    setIsAnswered(false);
    setShowHazardSign(false);

    // Play target audio clearly after small transition delay
    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    audioTimerRef.current = setTimeout(() => {
      speakKorean(target.ko, 0.85);
    }, 280);
  };

  const startNewGame = (ch: number) => {
    const chapterPool = vocabulary.filter(v => v.ch === ch);
    if (chapterPool.length === 0) return;
    // Exactly 10 questions per chapter
    const shuffled = [...chapterPool].sort(() => 0.5 - Math.random()).slice(0, TOTAL_STOPS);
    setQuestionQueue(shuffled);
    setQueueIndex(0);
    setStops(0);
    setIsArrivalModalOpen(false);
    setShowHazardSign(false);
    buildQuestion(0, shuffled);
  };

  const handleChapterChange = (newCh: number) => {
    setInternalChapter(newCh);
    onSelectChapter?.(newCh);
    startNewGame(newCh);
  };

  useEffect(() => {
    startNewGame(activeChapter);
    return () => {
      if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  }, [activeChapter]);

  const handleSelectOption = (item: VocabularyItem) => {
    if (isAnswered || !currentQuestion) return;

    const isCorrect = item.ko === currentQuestion.target.ko;

    if (isCorrect) {
      // Correct!
      playCutePop();
      playSuccessChime();
      setSelectedOption(item);
      setIsAnswered(true);
      setShowHazardSign(false);
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);

      const nextStop = stops + 1;
      setStops(nextStop);

      // (정답 시 과하거나 정신없는 꽃가루/Confetti 효과 전면 삭제 - 간소화된 깔끔한 피드백)

      // Pronounce target word
      setTimeout(() => {
        speakKorean(currentQuestion.target.ko, 0.85);
      }, 300);

      // Check if finished 10 questions and arrived at destination
      if (nextStop >= TOTAL_STOPS) {
        if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = setTimeout(() => {
          handleArriveDestination();
        }, 1200);
      } else {
        // Auto advance to next question smoothly after 1.5 seconds
        if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
        autoAdvanceTimerRef.current = setTimeout(() => {
          handleNextQuestion();
        }, 1500);
      }
    } else {
      // Wrong attempt - 베토벤 운명 교향곡(짜-잔-잔-잔~~) 밈 사운드 & 직관적인 위험 표지판 팝업
      playBeethovenFateMemeSound();
      setShowHazardSign(true);
      setTimeout(() => {
        setShowHazardSign(false);
      }, 1500);

      setWrongAttempts(prev => (prev.includes(item.ko) ? prev : [...prev, item.ko]));

      // Replay target sound gently after fate chord
      setTimeout(() => {
        if (currentQuestion) {
          speakKorean(currentQuestion.target.ko, 0.85);
        }
      }, 1100);
    }
  };

  const handleArriveDestination = () => {
    playApplauseFanfare();
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF1493', '#FFD700', '#10B981', '#3B82F6', '#EC4899'],
      });
    } catch {
      // ignore
    }
    setIsArrivalModalOpen(true);
  };

  const handleNextQuestion = () => {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    playCutePop();
    const nextIdx = queueIndex + 1;
    if (nextIdx < questionQueue.length) {
      setQueueIndex(nextIdx);
      buildQuestion(nextIdx, questionQueue);
    } else {
      handleArriveDestination();
    }
  };

  const handleNextCourse = () => {
    playCutePop();
    const nextCh = (activeChapter + 1) % 25;
    handleChapterChange(nextCh);
  };

  const handleReplayAudio = () => {
    if (currentQuestion) {
      playCutePop();
      speakKorean(currentQuestion.target.ko, 0.85);
    }
  };

  const labelsDict: Record<SupportedLanguage | 'ko', {
    gameTitle: string;
    prompt: string;
    replayBtn: string;
    stopsLabel: string;
    destinationReached: string;
    nextCoursePrompt: string;
    nextCourseBtn: string;
    replayCourseBtn: string;
    cheerMessage: string;
  }> = {
    ko: {
      gameTitle: '🚗 꼬마 자동차의 단어 여행',
      prompt: '소리를 듣고 알맞은 도로 표지판(정답)을 고르세요!',
      replayBtn: '🔊 소리 다시 듣기',
      stopsLabel: '통과 구간',
      destinationReached: '도착지에 무사히 도착했어요! 🏁',
      nextCoursePrompt: '다음 코스로 넘어가보자!',
      nextCourseBtn: '다음 코스로 달리기 🚗💨',
      replayCourseBtn: '이 코스 다시 달리기 🔁',
      cheerMessage: '부릉부릉~ 정답이에요! 🚗💨',
    },
    en: {
      gameTitle: "🚗 Little Car's Word Trip",
      prompt: 'Listen to the sound and choose the matching road sign!',
      replayBtn: '🔊 Listen Again',
      stopsLabel: 'Checkpoints',
      destinationReached: 'Safely arrived at destination! 🏁',
      nextCoursePrompt: "Let's move on to the next course!",
      nextCourseBtn: 'Drive to Next Course 🚗💨',
      replayCourseBtn: 'Replay This Course 🔁',
      cheerMessage: 'Vroom vroom~ Correct! 🚗💨',
    },
    vi: {
      gameTitle: '🚗 Chuyến du hành từ vựng của xe ô tô nhỏ',
      prompt: 'Hãy lắng nghe âm thanh và chọn đúng biển báo trên đường nhé!',
      replayBtn: '🔊 Nghe lại',
      stopsLabel: 'Chặng đã qua',
      destinationReached: 'Đã đến đích an toàn rồi! 🏁',
      nextCoursePrompt: 'Cùng chuyển sang chặng tiếp theo nào!',
      nextCourseBtn: 'Lái xe sang chặng tiếp theo 🚗💨',
      replayCourseBtn: 'Chơi lại chặng này 🔁',
      cheerMessage: 'Bíp bíp~ Đúng rồi! 🚗💨',
    },
    bn: {
      gameTitle: '🚗 ছোট গাড়ির শব্দের যাত্রা',
      prompt: 'উচ্চারণ শুনে সঠিক রাস্তার সাইনবোর্ডটি নির্বাচন করুন!',
      replayBtn: '🔊 আবার শুনুন',
      stopsLabel: 'অতিক্রান্ত পর্যায়',
      destinationReached: 'নিরাপদে গন্তব্যে পৌঁছে গেছ! 🏁',
      nextCoursePrompt: 'পরবর্তী কোর্সে এগিয়ে যাওয়া যাক!',
      nextCourseBtn: 'পরবর্তী কোর্সে চলুন 🚗💨',
      replayCourseBtn: 'আবার খেলুন 🔁',
      cheerMessage: 'দারুণ! সঠিক উত্তর! 🚗💨',
    },
    zh: {
      gameTitle: '🚗 嘟嘟小汽车的单词旅行',
      prompt: '听发音，选出正确的道路指示牌（答案）吧！',
      replayBtn: '🔊 重新收听',
      stopsLabel: '已过路段',
      destinationReached: '顺利到达终点站！🏁',
      nextCoursePrompt: '让我们前往下一个赛道吧！',
      nextCourseBtn: '前往下一赛道 🚗💨',
      replayCourseBtn: '重新挑战本赛道 🔁',
      cheerMessage: '嘟嘟~ 答对啦！🚗💨',
    },
    ru: {
      gameTitle: '🚗 Путешествие машинки по словам',
      prompt: 'Послушайте звук и выберите правильный дорожный знак!',
      replayBtn: '🔊 Послушать еще раз',
      stopsLabel: 'Пройдено этапов',
      destinationReached: 'Успешно добрались до финиша! 🏁',
      nextCoursePrompt: 'Поехали на следующий курс!',
      nextCourseBtn: 'На следующий курс 🚗💨',
      replayCourseBtn: 'Пройти снова 🔁',
      cheerMessage: 'Врум-врум~ Правильно! 🚗💨',
    },
    ja: {
      gameTitle: '🚗 ちびっこ自動車の言葉の旅',
      prompt: '音声を聴いて、正しい道路標識（答え）を選んでね！',
      replayBtn: '🔊 もう一度聴く',
      stopsLabel: '通過区間',
      destinationReached: 'ゴールに無事到着しました！🏁',
      nextCoursePrompt: '次のコースへ進んでみよう！',
      nextCourseBtn: '次のコースへドライブ 🚗💨',
      replayCourseBtn: 'もう一度走る 🔁',
      cheerMessage: 'ブーブー！せいかい！🚗💨',
    },
    mn: {
      gameTitle: '🚗 Бяцхан машины үгийн аялал',
      prompt: 'Дууг сонсоод тохирох замын тэмдгийг сонгоорой!',
      replayBtn: '🔊 Дахин сонсох',
      stopsLabel: 'Давсан хэсэг',
      destinationReached: 'Хүрэх газартаа амжилттай ирлээ! 🏁',
      nextCoursePrompt: 'Дараагийн зам руу шилжицгээе!',
      nextCourseBtn: 'Дараагийн зам руу явах 🚗💨',
      replayCourseBtn: 'Дахин явах 🔁',
      cheerMessage: 'Хүчтэй явцгаая~ Зөв! 🚗💨',
    },
  };

  const labels = labelsDict[lang as (SupportedLanguage | 'ko')] || labelsDict.ko;

  if (!currentQuestion) return null;

  // Car position percentage along the road (10 checkpoints: 0% to 88%)
  const carLeftPercent = Math.min(88, 3 + (stops / TOTAL_STOPS) * 85);

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

      {/* Main 꼬마 자동차의 단어 여행 Container */}
      <div className="bg-[#fff5f7] border-2 border-rose-200 rounded-3xl p-3 sm:p-5 shadow-md shadow-rose-200/40 flex flex-col font-korean-gothic">
        
        {/* 오디오 재생 영역 (단독 사운드 버튼, 안내 문구는 아래로 이동) */}
        <div className="flex flex-col items-center mb-2.5 sm:mb-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReplayAudio}
            className="h-10 sm:h-11 px-6 sm:px-8 rounded-full bg-[#D94A6B] hover:bg-[#BE3A58] active:scale-95 text-white font-black text-xs sm:text-base shadow-md shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all border border-rose-300 select-none"
            title={labels.replayBtn}
          >
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            <span>{labels.replayBtn}</span>
          </motion.button>
        </div>

        {/* 자동차 주행 스테이지 (10개 구간 시각적 쾌감 영역 - 높이 시원하게 확장) */}
        <div className="relative h-28 sm:h-36 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 rounded-3xl border-2 border-slate-600 shadow-inner overflow-hidden flex items-center px-2.5 sm:px-6 mb-3 sm:mb-4 select-none">
          {/* Top/Bottom Road Curbs */}
          <div className="absolute inset-x-0 h-1.5 top-1 bg-amber-400/50" />
          <div className="absolute inset-x-0 h-1.5 bottom-1 bg-amber-400/50" />

          {/* Central Dashed White Road Line */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0 border-t-2 border-dashed border-white/70 w-full pointer-events-none" />

          {/* 10 Checkpoint Milestones along the road */}
          <div className="absolute inset-0 flex items-center justify-between px-3 sm:px-6 pointer-events-none">
            {Array.from({ length: TOTAL_STOPS }).map((_, i) => {
              const stopIdx = i + 1;
              const isReached = stops >= stopIdx;
              const isDestination = stopIdx === TOTAL_STOPS;
              return (
                <div
                  key={stopIdx}
                  className="flex flex-col items-center justify-center z-10"
                >
                  <span
                    className={`text-base sm:text-2xl transition-all duration-500 ${
                      isReached
                        ? 'scale-125 filter-none animate-bounce drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]'
                        : 'opacity-35 grayscale scale-90'
                    }`}
                    style={{ animationDuration: '1.1s' }}
                  >
                    {isDestination ? '🏁' : '🌸'}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[11px] font-black mt-1 rounded px-1.5 py-0.5 ${
                      isReached
                        ? 'bg-amber-300 text-slate-900 font-extrabold shadow-xs'
                        : 'text-slate-400 bg-slate-900/70'
                    }`}
                  >
                    {isDestination ? '도착' : `${stopIdx}`}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 🚗 Car Object that drives smoothly along the 10 stops */}
          <div
            id="car"
            className="absolute z-20 flex items-center select-none"
            style={{
              left: `${carLeftPercent}%`,
              top: '50%',
              transform: 'translateY(-50%)',
              transition: 'left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Cheer Bubble above car on correct answer */}
            {isAnswered && selectedOption?.ko === currentQuestion.target.ko && (
              <div className="absolute -top-10 -left-6 whitespace-nowrap bg-white text-rose-900 text-[11px] sm:text-xs font-black px-3 py-1 rounded-full shadow-lg border-2 border-pink-300 animate-bounce z-30">
                {labels.cheerMessage}
              </div>
            )}

            {/* Car Emoji & Exhaust Smoke */}
            <div className="relative flex items-center">
              <span className="text-3xl sm:text-5xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] inline-block scale-x-[-1]">
                🚗
              </span>
              {isAnswered && selectedOption?.ko === currentQuestion.target.ko && (
                <span className="absolute -left-3 text-sm sm:text-lg animate-ping opacity-80">
                  💨
                </span>
              )}
            </div>
          </div>

          {/* ⚠️ 위험 경고 표지판 팝업 (오답 선택 시 극적이고 유쾌한 연출) */}
          <AnimatePresence>
            {showHazardSign && (
              <motion.div
                initial={{ scale: 0.3, opacity: 0, rotate: -12 }}
                animate={{ scale: [0.3, 1.15, 1], opacity: 1, rotate: [0, -6, 6, -3, 0] }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900/50 backdrop-blur-[1px] pointer-events-none"
              >
                <div className="bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-white font-black px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl shadow-2xl border-4 border-yellow-200 flex items-center gap-2.5 sm:gap-3.5">
                  <span className="text-3xl sm:text-4xl drop-shadow animate-bounce">⚠️</span>
                  <div className="flex flex-col text-left">
                    <span className="text-sm sm:text-lg font-black tracking-wide text-yellow-100 flex items-center gap-1.5">
                      🛑 위험! 다시 도전해 봐요!
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-white/95">
                      소리를 다시 듣고 알맞은 단어를 골라보세요
                    </span>
                  </div>
                  <span className="text-3xl sm:text-4xl drop-shadow animate-bounce">🛑</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4개의 보기 카드 (도로 표지판 콘셉트) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
          {currentQuestion.options.map((opt, idx) => {
            const isTarget = opt.ko === currentQuestion.target.ko;
            const isWrong = wrongAttempts.includes(opt.ko);
            const isSelectedTarget = isAnswered && isTarget;

            let btnStyle = 'bg-white border-2 border-gray-200 hover:border-pink-500 hover:bg-pink-50/70 text-slate-800 shadow-xs hover:shadow-md';

            if (isSelectedTarget) {
              btnStyle = 'bg-[#ecfdf5] border-3 border-[#10b981] text-emerald-950 font-black shadow-md scale-[1.01] ring-2 ring-emerald-300';
            } else if (isWrong) {
              btnStyle = 'bg-rose-50/80 border-2 border-rose-400 text-rose-900/70 line-through opacity-75';
            }

            return (
              <motion.button
                key={idx}
                disabled={isAnswered || isWrong}
                whileHover={!isAnswered && !isWrong ? { y: -2 } : {}}
                whileTap={!isAnswered && !isWrong ? { scale: 0.98 } : {}}
                onClick={() => handleSelectOption(opt)}
                className={`min-h-[68px] sm:min-h-[78px] p-3 sm:p-4 rounded-2xl font-bold flex items-center justify-between text-left transition-all cursor-pointer relative overflow-hidden ${btnStyle}`}
              >
                {/* Road Sign Concept Top Color Accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    isSelectedTarget ? 'bg-[#10b981]' : isWrong ? 'bg-rose-400' : 'bg-pink-200'
                  }`}
                />

                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  {/* Road Sign Circle Badge with Emoji / High-Def Visual */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-pink-50/80 border border-pink-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <VocabVisual item={opt} size="md" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base sm:text-xl font-black text-slate-900 leading-tight font-korean-gothic">
                      {opt.ko}
                    </p>
                    <p className="text-[11px] sm:text-sm text-slate-500 font-bold mt-0.5 flex items-center gap-1.5 truncate">
                      <span>{getLanguageMeta(lang).flag}</span>
                      <span>{(opt as any)[lang] || opt.en}</span>
                    </p>
                  </div>
                </div>

                {isSelectedTarget && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 shadow-sm animate-bounce">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}

                {isWrong && (
                  <div className="px-2 py-0.5 rounded-lg bg-rose-200/90 text-rose-800 font-black text-xs border border-rose-300 flex items-center gap-1 shrink-0">
                    <span>⚠️</span>
                    <span>위험</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* 안내 문구 영역 (조작 영역 아래로 이동하여 버튼들이 첫 화면에 바로 노출) */}
        <div className="text-center mt-3 pt-2 border-t border-rose-100">
          <span className="text-xs sm:text-sm font-bold text-slate-600 font-korean-gothic">
            {labels.prompt}
          </span>
        </div>
      </div>

      {/* 도착 팝업 모달 (박수소리, 폭죽, 트로피, "다음 코스로 넘어가보자!") */}
      <AnimatePresence>
        {isArrivalModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              className="bg-gradient-to-b from-white via-pink-50/70 to-rose-50 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-pink-300 text-center flex flex-col items-center relative overflow-hidden font-korean-gothic"
            >
              {/* Confetti / Firework Decorative Icons */}
              <div className="text-5xl sm:text-6xl mb-2 animate-bounce">
                🏆
              </div>

              <div className="flex items-center gap-2 text-2xl sm:text-3xl mb-1">
                <span>🎆</span>
                <span className="font-black text-rose-950">
                  {labels.destinationReached}
                </span>
                <span>🎉</span>
              </div>

              <p className="text-sm sm:text-base font-bold text-rose-600 mb-5">
                10개 문제를 모두 맞히고 무사히 도착했어요! 👏
              </p>

              {/* Big "다음 코스로 넘어가보자!" Prompt Banner */}
              <div className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-black text-lg sm:text-xl shadow-md mb-6 animate-pulse">
                ✨ {labels.nextCoursePrompt} ✨
              </div>

              <div className="w-full flex flex-col gap-2.5">
                {/* Next Course Button */}
                <button
                  type="button"
                  onClick={handleNextCourse}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF1493] to-rose-600 hover:from-pink-600 hover:to-rose-700 active:scale-95 text-white font-black text-base shadow-lg shadow-pink-300/80 flex items-center justify-center gap-2 cursor-pointer transition-all border border-pink-300"
                >
                  <span>{labels.nextCourseBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Replay Same Course Button */}
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    startNewGame(activeChapter);
                  }}
                  className="w-full py-2.5 px-4 rounded-2xl bg-white hover:bg-pink-100 text-slate-700 font-bold text-sm border border-pink-200 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{labels.replayCourseBtn}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
