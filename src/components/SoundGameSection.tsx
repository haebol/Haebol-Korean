import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw, Star, ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { VocabularyItem, SupportedLanguage, getCircledNumber } from '../types';
import { CHAPTER_LIST } from '../data/vocabulary';
import { speakKorean, playCutePop, playSuccessChime, playGentleBoop } from '../utils/audio';
import { ManduMascot } from './ManduMascot';
import { VocabVisual } from './VocabVisual';

interface SoundGameSectionProps {
  vocabulary: VocabularyItem[];
  lang: SupportedLanguage;
}

interface GameRound {
  target: VocabularyItem;
  options: VocabularyItem[];
}

export const SoundGameSection: React.FC<SoundGameSectionProps> = ({ vocabulary, lang }) => {
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [currentRound, setCurrentRound] = useState<GameRound | null>(null);
  const [selectedOption, setSelectedOption] = useState<VocabularyItem | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [wrongSelections, setWrongSelections] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Available items based on chapter filter
  const pool = useMemo(() => {
    if (selectedChapter === 'all') return vocabulary;
    return vocabulary.filter(v => v.ch === selectedChapter);
  }, [vocabulary, selectedChapter]);

  // Generate a new round
  const generateNewRound = () => {
    if (pool.length < 4) return;

    // Pick target randomly from the pool
    const target = pool[Math.floor(Math.random() * pool.length)];

    // Pick 3 distractors from all vocabulary (or same chapter if possible)
    const candidates = vocabulary.filter(v => v.ko !== target.ko);
    const shuffledCandidates = [...candidates].sort(() => 0.5 - Math.random());
    const distractors = shuffledCandidates.slice(0, 3);

    // Combine & shuffle
    const options = [target, ...distractors].sort(() => 0.5 - Math.random());

    setCurrentRound({ target, options });
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setWrongSelections([]);

    // Auto-play pronunciation with visual ripple
    setIsPlayingAudio(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      speakKorean(target.ko, 0.85);
      setIsPlayingAudio(false);
    }, 300);
  };

  useEffect(() => {
    generateNewRound();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectedChapter]);

  // Audio trigger handlers
  const handlePlaySound = (rate: number = 0.85) => {
    if (!currentRound) return;
    playCutePop();
    setIsPlayingAudio(true);
    speakKorean(currentRound.target.ko, rate);
    setTimeout(() => setIsPlayingAudio(false), 800);
  };

  // Card selection
  const handleSelectCard = (option: VocabularyItem) => {
    if (!currentRound || isCorrect) return;

    if (option.ko === currentRound.target.ko) {
      // Correct!
      playSuccessChime();
      setIsCorrect(true);
      setIsAnswered(true);
      setSelectedOption(option);
      setStars(prev => prev + 1);
      setCombo(prev => prev + 1);

      // Confetti celebration
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Pronounce word again clearly for reinforcement
      setTimeout(() => {
        speakKorean(option.ko, 0.85);
      }, 350);
    } else {
      // Incorrect option: Friendly shake, gentle boop, allow child to try again
      playGentleBoop();
      if (!wrongSelections.includes(option.ko)) {
        setWrongSelections(prev => [...prev, option.ko]);
      }
      setCombo(0);

      // Replay sound gently to help them find it
      setTimeout(() => {
        speakKorean(currentRound.target.ko, 0.85);
      }, 400);
    }
  };

  // Labels for multi-language display
  const guideText = {
    ko: '소리를 듣고 알맞은 그림을 콕! 눌러보세요',
    en: 'Listen to the sound and tap the matching picture!',
    vi: 'Nghe âm thanh và chạm vào hình ảnh đúng!',
    bn: 'শব্দ শুনুন এবং সঠিক ছবিতে স্পর্শ করুন!'
  }[lang] || '소리를 듣고 알맞은 그림을 콕! 눌러보세요';

  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto pb-8">
      {/* 1. Header Bar: Circled Chapter Filter */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-amber-200">
        <div className="flex items-center justify-between gap-2 mb-2 px-1">
          <span className="text-xs sm:text-sm font-extrabold text-amber-900 flex items-center gap-1.5">
            <span>🎧</span> 소리 그림 챕터 선택
          </span>
          <div className="flex items-center gap-1 bg-amber-100/80 px-3 py-1 rounded-full text-amber-950 font-black text-xs sm:text-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>별 {stars}개 획득!</span>
          </div>
        </div>

        {/* Scrollable Chapter Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => {
              playCutePop();
              setSelectedChapter('all');
            }}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex-shrink-0 ${
              selectedChapter === 'all'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'bg-amber-100/60 hover:bg-amber-200/70 text-slate-700'
            }`}
          >
            🌟 전체 섞어서
          </button>
          {CHAPTER_LIST.map(ch => {
            const isSelected = selectedChapter === ch.ch;
            return (
              <button
                key={ch.ch}
                onClick={() => {
                  playCutePop();
                  setSelectedChapter(ch.ch);
                }}
                className={`min-h-[44px] px-3 py-1.5 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap flex items-center gap-1.5 transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-md scale-105'
                    : 'bg-amber-100/60 hover:bg-amber-200/70 text-slate-700'
                }`}
              >
                <span>{ch.icon}</span>
                <span>{ch.circledTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Main Question Audio Zone */}
      {currentRound && (
        <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50/50 rounded-3xl p-5 sm:p-7 shadow-md border-4 border-amber-300 flex flex-col items-center text-center relative overflow-hidden">
          {/* Subtle top decoration badge */}
          <div className="mb-2 px-3.5 py-1 bg-amber-200/80 text-amber-950 font-extrabold text-xs sm:text-sm rounded-full flex items-center gap-1">
            <span>{getCircledNumber(currentRound.target.ch)}</span>
            <span>{currentRound.target.theme}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-['Jua',sans-serif] mb-1 flex items-center gap-1.5">
            <span>👂 소리를 듣고 그림을 찾아요!</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mb-4">
            {guideText}
          </p>

          {/* Big Interactive Audio Speaker Button with Pulse Animation */}
          <div className="relative my-2">
            {isPlayingAudio && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0.7 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute inset-0 rounded-full bg-amber-400 -z-10"
              />
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handlePlaySound(0.85)}
              className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-90 text-white rounded-full shadow-lg flex flex-col items-center justify-center gap-1 border-4 border-white transition-all cursor-pointer"
              aria-label="소리 다시 듣기"
            >
              <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow" />
              <span className="text-xs font-black tracking-tight font-['Jua',sans-serif]">듣기</span>
            </motion.button>
          </div>

          {/* Audio Replay Button */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={() => handlePlaySound(0.85)}
              className="min-h-[44px] px-4 py-2 bg-white hover:bg-amber-100 text-amber-900 font-extrabold rounded-2xl border-2 border-amber-300 shadow-xs flex items-center gap-2 text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-amber-700" />
              <span>소리 다시 듣기 🔊</span>
            </button>
          </div>

          {/* Success Banner when answered correctly */}
          <AnimatePresence>
            {isCorrect && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-4 w-full bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow">
                    🎉
                  </div>
                  <div className="text-left">
                    <p className="font-['Jua',sans-serif] text-emerald-900 text-lg font-black flex items-center gap-1">
                      <span>정답이에요! 참 잘했어요!</span>
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-extrabold text-slate-900 text-base">{currentRound.target.ko}</span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-200/80 px-2 py-0.5 rounded-md">
                        [{currentRound.target.romaja}]
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateNewRound}
                  className="min-h-[48px] px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-sm sm:text-base rounded-2xl shadow-md flex items-center gap-2 whitespace-nowrap"
                >
                  <span>다음 문제</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 3. 4 Big Picture Cards Grid */}
      {currentRound && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {currentRound.options.map((option, idx) => {
            const isTarget = option.ko === currentRound.target.ko;
            const isSelected = selectedOption?.ko === option.ko;
            const isWrong = wrongSelections.includes(option.ko);

            let cardStyle = 'bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-md';
            if (isCorrect && isTarget) {
              cardStyle = 'bg-emerald-50 border-4 border-emerald-500 shadow-lg ring-4 ring-emerald-200 scale-[1.02]';
            } else if (isWrong) {
              cardStyle = 'bg-slate-100 border-2 border-rose-300 opacity-60 grayscale-[30%]';
            }

            return (
              <motion.button
                key={option.ko + idx}
                whileTap={{ scale: 0.96 }}
                whileHover={!isCorrect && !isWrong ? { scale: 1.02 } : {}}
                onClick={() => handleSelectCard(option)}
                disabled={isCorrect || isWrong}
                className={`min-h-[140px] sm:min-h-[160px] p-4 rounded-3xl flex flex-col items-center justify-center text-center transition-all relative overflow-hidden select-none cursor-pointer ${cardStyle}`}
              >
                {/* Big Emoji / Picture */}
                <div className="mb-2 flex items-center justify-center transition-transform group-hover:scale-110">
                  <VocabVisual item={option} size="xl" />
                </div>

                {/* Korean Word */}
                <span className="text-lg sm:text-xl font-black text-slate-900 font-['Jua',sans-serif] leading-tight">
                  {option.ko}
                </span>

                {/* English Romanization (Phonetic Guide for non-Hangul readers) */}
                <span className="text-xs sm:text-sm font-extrabold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full mt-1 border border-amber-200/80">
                  [{option.romaja}]
                </span>

                {/* Correct Stamp Indicator */}
                {isCorrect && isTarget && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full p-1 shadow"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </motion.div>
                )}

                {/* Friendly try again marker for wrong choice */}
                {isWrong && (
                  <span className="absolute top-2 right-2 text-rose-500 font-extrabold text-xs bg-rose-100 px-2 py-0.5 rounded-full">
                    다시 시도!
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* 4. Encouraging Mascot Bar */}
      <div className="bg-amber-100/60 rounded-3xl p-4 border border-amber-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ManduMascot size="sm" isHappy={isCorrect} />
          <div>
            <p className="font-['Jua',sans-serif] text-slate-800 text-sm sm:text-base font-bold">
              {combo >= 3 ? `🔥 대단해요! 연속 ${combo}번 정답!` : '스피커를 톡 누르면 소리가 나와요!'}
            </p>
            <p className="text-xs text-slate-500">
              글자를 몰라도 괜찮아요. 그림과 소리를 들으며 배워요!
            </p>
          </div>
        </div>

        <button
          onClick={generateNewRound}
          className="min-h-[44px] px-3.5 py-1.5 bg-white hover:bg-amber-50 text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-xs text-xs sm:text-sm flex items-center gap-1.5 whitespace-nowrap active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
          <span>다른 문제</span>
        </button>
      </div>
    </div>
  );
};
