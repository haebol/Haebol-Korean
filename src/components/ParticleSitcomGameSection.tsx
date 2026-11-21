import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Camera,
  Volume2,
  VolumeX,
  Search,
  RotateCcw,
  ArrowRight,
  X,
  Lock,
  Play,
  Sparkles,
  Film,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import {
  UNIT1_SITCOM_EPISODES,
  SITCOM_UI_STRINGS,
  SITCOM_LOCAL_STORAGE_KEY,
  SitcomEpisodeItem,
  SitcomBlunderItem,
} from '../data/particleSitcomUnit1Data';
import { ParticleSitcomStage, StageMode } from './ParticleSitcomStage';
import {
  speakKorean,
  playCutePop,
  playSuccessChime,
  playApplauseFanfare,
  playCameraShutterSfx,
  playSitcomBlunderSfx,
} from '../utils/audio';

interface ParticleSitcomGameSectionProps {
  lang: SupportedLanguage;
}

interface ShuffledChoice {
  particle: string;
  isCorrect: boolean;
  blunder?: SitcomBlunderItem;
}

interface EpisodeEntry {
  episode: SitcomEpisodeItem;
  choices: ShuffledChoice[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildShuffledDeck(): EpisodeEntry[] {
  return shuffleArray(UNIT1_SITCOM_EPISODES).map((ep) => {
    const allChoices: ShuffledChoice[] = [
      { particle: ep.correctParticle, isCorrect: true },
      ...ep.blunders.map((b) => ({
        particle: b.particle,
        isCorrect: false,
        blunder: b,
      })),
    ];
    return {
      episode: ep,
      choices: shuffleArray(allChoices),
    };
  });
}

function loadUnlockedCardIds(): string[] {
  try {
    const raw = localStorage.getItem(SITCOM_LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === 'string');
    }
  } catch {
    // Ignore storage read failures
  }
  return [];
}

function saveUnlockedCardIds(ids: string[]): void {
  try {
    localStorage.setItem(SITCOM_LOCAL_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Ignore storage write failures
  }
}

export const ParticleSitcomGameSection: React.FC<ParticleSitcomGameSectionProps> = ({
  lang,
}) => {
  const ui = SITCOM_UI_STRINGS[lang] || SITCOM_UI_STRINGS.en;

  // Game Deck & Episode State
  const [deck, setDeck] = useState<EpisodeEntry[]>(() => buildShuffledDeck());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [stageMode, setStageMode] = useState<StageMode>('IDLE');
  const [activeBlunder, setActiveBlunder] = useState<SitcomBlunderItem | null>(null);
  const [triedBlunderIds, setTriedBlunderIds] = useState<string[]>([]);
  const [replayKey, setReplayKey] = useState(0);

  // Scoring & Summary State
  const [isSummary, setIsSummary] = useState(false);
  const [firstTryCount, setFirstTryCount] = useState(0);
  const [sessionBlunderCount, setSessionBlunderCount] = useState(0);
  const [hadWrongOnCurrent, setHadWrongOnCurrent] = useState(false);

  // UI & Audio Controls
  const [showBatchimHint, setShowBatchimHint] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [shutterFlash, setShutterFlash] = useState(false);
  const [photoToast, setPhotoToast] = useState<{ cardNumber: number; titleKo: string; isNew: boolean } | null>(null);

  // Persistent Photo Card Album (15 cards for Unit 1)
  const [unlockedCardIds, setUnlockedCardIds] = useState<string[]>(() => loadUnlockedCardIds());
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [previewCard, setPreviewCard] = useState<{
    episode: SitcomEpisodeItem;
    blunder: SitcomBlunderItem;
    key: number;
  } | null>(null);

  const timersRef = useRef<number[]>([]);

  const clearPendingTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const scheduleTimeout = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  const stopAllSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearPendingTimers();
      stopAllSpeech();
    };
  }, [clearPendingTimers, stopAllSpeech]);

  const currentEntry = deck[currentIdx] || deck[0];
  const currentEpisode = currentEntry.episode;

  // All 15 collectible cards flattened in order 1..15
  const allCollectibleCards = useMemo(() => {
    return UNIT1_SITCOM_EPISODES.flatMap((ep) =>
      ep.blunders.map((b) => ({ episode: ep, blunder: b }))
    );
  }, []);

  const handleToggleMute = () => {
    playCutePop();
    setIsMuted((prev) => {
      const next = !prev;
      if (next) stopAllSpeech();
      return next;
    });
  };

  const handleSpeakSentence = useCallback(
    (text: string) => {
      if (isMuted) return;
      speakKorean(text, 0.92);
    },
    [isMuted]
  );

  const handleChoiceSelect = useCallback(
    (choice: ShuffledChoice) => {
      if (stageMode === 'SUCCESS' || isSummary) return;

      clearPendingTimers();

      if (choice.isCorrect) {
        setStageMode('SUCCESS');
        setActiveBlunder(null);
        setPhotoToast(null);

        if (!hadWrongOnCurrent) {
          setFirstTryCount((c) => c + 1);
        }

        if (!isMuted) {
          playSuccessChime();
          scheduleTimeout(() => {
            speakKorean(currentEpisode.fullCorrectSentence, 0.9);
          }, 180);
        }

        try {
          confetti({
            particleCount: 55,
            spread: 68,
            origin: { y: 0.6 },
            colors: ['#059669', '#10B981', '#F59E0B', '#FDE68A'],
          });
        } catch {
          // Ignore confetti errors in headless test envs
        }
        return;
      }

      // WRONG CHOICE -> COMEDY BLUNDER CUTSCENE!
      const blunder = choice.blunder;
      if (!blunder) return;

      setHadWrongOnCurrent(true);
      setSessionBlunderCount((c) => c + 1);
      setStageMode('BLUNDER');
      setActiveBlunder(blunder);
      setReplayKey((k) => k + 1);

      setTriedBlunderIds((prev) =>
        prev.includes(blunder.id) ? prev : [...prev, blunder.id]
      );

      // Unlock in Photo Album if new + trigger shutter flash!
      const isNewCard = !unlockedCardIds.includes(blunder.id);
      if (isNewCard) {
        const nextIds = [...unlockedCardIds, blunder.id];
        setUnlockedCardIds(nextIds);
        saveUnlockedCardIds(nextIds);
      }

      setShutterFlash(true);
      scheduleTimeout(() => setShutterFlash(false), 260);
      setPhotoToast({
        cardNumber: blunder.cardNumber,
        titleKo: blunder.titleKo,
        isNew: isNewCard,
      });

      if (!isMuted) {
        playSitcomBlunderSfx(blunder.sfx);
        scheduleTimeout(() => {
          playCameraShutterSfx();
        }, 280);
        scheduleTimeout(() => {
          speakKorean(blunder.ttsText, 0.98);
        }, 560);
      }
    },
    [
      stageMode,
      isSummary,
      clearPendingTimers,
      hadWrongOnCurrent,
      isMuted,
      scheduleTimeout,
      currentEpisode.fullCorrectSentence,
      unlockedCardIds,
    ]
  );

  const handleNextEpisode = useCallback(() => {
    clearPendingTimers();
    stopAllSpeech();
    playCutePop();

    if (currentIdx + 1 >= deck.length) {
      setIsSummary(true);
      if (!isMuted) {
        scheduleTimeout(() => playApplauseFanfare(), 120);
      }
      try {
        confetti({
          particleCount: 90,
          spread: 85,
          origin: { y: 0.55 },
          colors: ['#059669', '#34D399', '#FBBF24', '#F43F5E'],
        });
      } catch {
        // Ignore confetti failures
      }
      return;
    }

    setCurrentIdx((idx) => idx + 1);
    setStageMode('IDLE');
    setActiveBlunder(null);
    setTriedBlunderIds([]);
    setHadWrongOnCurrent(false);
    setPhotoToast(null);
    setShowBatchimHint(false);
  }, [clearPendingTimers, stopAllSpeech, currentIdx, deck.length, isMuted, scheduleTimeout]);

  const handleRestartGame = useCallback(() => {
    clearPendingTimers();
    stopAllSpeech();
    playCutePop();
    setDeck(buildShuffledDeck());
    setCurrentIdx(0);
    setStageMode('IDLE');
    setActiveBlunder(null);
    setTriedBlunderIds([]);
    setIsSummary(false);
    setFirstTryCount(0);
    setSessionBlunderCount(0);
    setHadWrongOnCurrent(false);
    setPhotoToast(null);
    setShowBatchimHint(false);
  }, [clearPendingTimers, stopAllSpeech]);

  const handleOpenAlbum = () => {
    playCutePop();
    setIsAlbumOpen(true);
    setPreviewCard(null);
  };

  const handleReplayAlbumCard = (ep: SitcomEpisodeItem, blunder: SitcomBlunderItem) => {
    clearPendingTimers();
    stopAllSpeech();
    setPreviewCard({ episode: ep, blunder, key: Date.now() });
    if (!isMuted) {
      playSitcomBlunderSfx(blunder.sfx);
      scheduleTimeout(() => {
        speakKorean(blunder.ttsText, 0.98);
      }, 420);
    }
  };

  // Keyboard shortcuts (1-4 choices, Enter/Space next, Escape close modal)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isAlbumOpen) {
        if (e.key === 'Escape') {
          setIsAlbumOpen(false);
          setPreviewCard(null);
          stopAllSpeech();
        }
        return;
      }
      if (isSummary) return;

      if (e.key >= '1' && e.key <= '4' && stageMode !== 'SUCCESS') {
        const idx = Number(e.key) - 1;
        const choice = currentEntry.choices[idx];
        if (choice) {
          e.preventDefault();
          handleChoiceSelect(choice);
        }
      } else if ((e.key === 'Enter' || e.key === ' ') && stageMode === 'SUCCESS') {
        e.preventDefault();
        handleNextEpisode();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    isAlbumOpen,
    isSummary,
    stageMode,
    currentEntry,
    handleChoiceSelect,
    handleNextEpisode,
    stopAllSpeech,
  ]);

  const unlockedCount = unlockedCardIds.length;
  const totalCardCount = allCollectibleCards.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-1.5 sm:px-3 pb-6 font-korean-gothic select-none">
      {/* MAIN EMERALD SITCOM THEATER CARD */}
      <div className="relative bg-gradient-to-b from-[#FAFDFB] via-white to-emerald-50/40 border-2 border-emerald-200 rounded-2xl shadow-md px-2.5 sm:px-5 pt-3 pb-4 overflow-hidden">
        {/* Camera Shutter Flash Overlay */}
        <AnimatePresence>
          {shutterFlash && (
            <motion.div
              initial={{ opacity: 0.92 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-none absolute inset-0 z-50 bg-white"
            />
          )}
        </AnimatePresence>

        {/* TOP BAR: Clean 1-line guide + Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-emerald-100">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black shrink-0 shadow-xs">
              <Film className="w-3.5 h-3.5" />
              <span>{ui.unitPill}</span>
            </span>
            <p className="hidden sm:block text-xs font-bold text-emerald-900/85 truncate">
              {ui.leftGuide}
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
            {!isSummary && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-black text-emerald-900 tabular-nums">
                {currentIdx + 1} / {deck.length}
              </span>
            )}

            {/* Photo Album Progress Button */}
            <button
              type="button"
              onClick={handleOpenAlbum}
              className="h-9 px-2.5 sm:px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-300 text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              title={ui.albumBtn}
            >
              <Camera className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>{ui.albumBtn}</span>
              <span className="px-1.5 py-0.5 rounded-md bg-amber-600 text-white text-[11px] tabular-nums leading-none">
                {unlockedCount}/{totalCardCount}
              </span>
            </button>

            {/* Mute Toggle */}
            <button
              type="button"
              onClick={handleToggleMute}
              className={`h-9 w-9 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${
                isMuted
                  ? 'bg-slate-100 border-slate-300 text-slate-500'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
              }`}
              title={isMuted ? '소리 켜기' : '소리 끄기'}
              aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Restart */}
            <button
              type="button"
              onClick={handleRestartGame}
              className="h-9 w-9 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center cursor-pointer transition-colors"
              title={ui.newEpisodeBtn}
              aria-label={ui.newEpisodeBtn}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile 1-line guide */}
        <p className="sm:hidden text-[11.5px] font-bold text-emerald-900/85 text-center mb-2">
          {ui.leftGuide}
        </p>

        {/* GAMEPLAY vs SUMMARY */}
        {!isSummary ? (
          <div className="space-y-3">
            {/* 1. ANIMATED THEATER STAGE */}
            <div className="relative">
              <ParticleSitcomStage
                mode={stageMode}
                episode={currentEpisode}
                activeBlunder={activeBlunder}
                replayKey={replayKey}
                correctStampText={ui.correctStamp}
              />

              {/* Photo Card Unlock Floating Toast */}
              <AnimatePresence>
                {photoToast && stageMode === 'BLUNDER' && (
                  <motion.button
                    type="button"
                    onClick={handleOpenAlbum}
                    initial={{ y: 12, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border-2 shadow-md cursor-pointer transition-transform hover:scale-105 ${
                      photoToast.isNew
                        ? 'bg-amber-400 border-white text-slate-950'
                        : 'bg-white/95 border-amber-300 text-amber-950'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] font-black whitespace-nowrap">
                      #{String(photoToast.cardNumber).padStart(2, '0')}{' '}
                      {photoToast.isNew ? ui.albumUnlockedToast : ui.albumAlreadyToast}
                    </span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* 2. KOREAN SENTENCE & MEANING BOARD */}
            <div className="bg-white border-2 border-emerald-100 rounded-2xl px-3 sm:px-5 py-3 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                {/* Korean Sentence with Grammar Highlighting */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-1.5">
                  <span className="font-badasseugi text-3xl sm:text-4xl font-bold text-[#1E293B] tracking-tight">
                    {currentEpisode.baseNoun}
                  </span>

                  {/* Particle Slot */}
                  {stageMode === 'IDLE' && (
                    <span className="inline-flex items-center justify-center min-w-[44px] sm:min-w-[52px] h-10 sm:h-11 px-2.5 rounded-xl border-2 border-dashed border-emerald-500 bg-emerald-50 text-emerald-700 font-black text-2xl sm:text-3xl animate-pulse">
                      ?
                    </span>
                  )}

                  {stageMode === 'BLUNDER' && activeBlunder && (
                    <motion.span
                      key={activeBlunder.id + replayKey}
                      initial={{ scale: 1.35, rotate: -6 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="inline-flex items-center justify-center min-w-[44px] sm:min-w-[52px] h-10 sm:h-11 px-2.5 rounded-xl border-2 border-rose-500 bg-rose-100 text-rose-700 font-badasseugi font-bold text-3xl sm:text-4xl line-through decoration-rose-600/80 decoration-2"
                    >
                      {activeBlunder.particle}
                    </motion.span>
                  )}

                  {stageMode === 'SUCCESS' && (
                    <motion.span
                      initial={{ scale: 1.4 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 14 }}
                      className="inline-flex items-center justify-center min-w-[44px] sm:min-w-[52px] h-10 sm:h-11 px-2.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-[#E03131] font-badasseugi font-bold text-3xl sm:text-4xl shadow-xs"
                    >
                      {currentEpisode.correctParticle}
                    </motion.span>
                  )}

                  <span className="font-badasseugi text-3xl sm:text-4xl font-bold text-slate-700 ml-1">
                    {currentEpisode.sentenceSuffix}
                  </span>
                </div>

                {/* Right: Sentence Meaning + Hint Button + TTS Listen */}
                <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">
                  <span className="text-xs sm:text-sm font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {currentEpisode.sentenceTranslations[lang] || currentEpisode.sentenceTranslations.en}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setShowBatchimHint((v) => !v);
                    }}
                    className={`h-9 px-2.5 rounded-xl border text-xs font-black flex items-center gap-1 cursor-pointer transition-colors ${
                      showBatchimHint
                        ? 'bg-amber-100 border-amber-400 text-amber-950'
                        : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-700'
                    }`}
                    title={ui.hintBtn}
                  >
                    <Search className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="hidden xs:inline">{ui.hintBtn}</span>
                  </button>

                  {stageMode === 'SUCCESS' && (
                    <button
                      type="button"
                      onClick={() => handleSpeakSentence(currentEpisode.fullCorrectSentence)}
                      className="h-9 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1 cursor-pointer transition-colors"
                      title={ui.listenBtn}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{ui.listenBtn}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Optional Batchim Hint Reveal */}
              <AnimatePresence>
                {showBatchimHint && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2.5 pt-2 border-t border-amber-100 flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-black text-amber-900 bg-amber-50/90 px-3 py-1.5 rounded-xl border border-amber-200">
                      <span>🔍</span>
                      <span>{currentEpisode.batchimHintKo}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Feedback Strip for BLUNDER or SUCCESS */}
              {stageMode === 'BLUNDER' && activeBlunder && (
                <div className="mt-2.5 pt-2 border-t border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-rose-50/80 border border-rose-200 rounded-xl px-3 py-2">
                  <div className="text-xs sm:text-sm leading-snug">
                    <span className="inline-block font-black text-rose-700 mr-1.5">
                      💥 [{activeBlunder.wrongWord}]
                    </span>
                    <span className="font-bold text-slate-800">{activeBlunder.whyFunnyKo}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSpeakSentence(activeBlunder.ttsText)}
                    className="self-end sm:self-center shrink-0 px-2.5 py-1 rounded-lg bg-white hover:bg-rose-100 border border-rose-300 text-rose-800 text-[11px] font-black flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>다시 듣기</span>
                  </button>
                </div>
              )}

              {stageMode === 'SUCCESS' && (
                <div className="mt-2.5 pt-2 border-t border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-emerald-50 border border-emerald-300 rounded-xl px-3 py-2">
                  <div className="text-xs sm:text-sm font-black text-emerald-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{currentEpisode.ruleWhyKo}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleNextEpisode}
                    className="self-end sm:self-center shrink-0 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-transform active:scale-95"
                  >
                    <span>{ui.nextEpisodeBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* 3. 4 PARTICLE CHOICE CARDS */}
            {stageMode !== 'SUCCESS' && (
              <div className="space-y-1.5">
                <p className="text-center text-xs font-bold text-slate-500">
                  {stageMode === 'BLUNDER' ? ui.retryPrompt : ui.chooseParticlePrompt}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {currentEntry.choices.map((choice, idx) => {
                    const isTriedBlunder =
                      !choice.isCorrect &&
                      choice.blunder &&
                      triedBlunderIds.includes(choice.blunder.id);
                    const isCurrentlyPlaying =
                      stageMode === 'BLUNDER' &&
                      activeBlunder &&
                      choice.blunder?.id === activeBlunder.id;

                    return (
                      <motion.button
                        key={`${currentEpisode.id}-${choice.particle}`}
                        type="button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleChoiceSelect(choice)}
                        className={`relative min-h-[64px] sm:min-h-[76px] rounded-2xl border-2 px-3 py-2 flex flex-col items-center justify-center cursor-pointer transition-all shadow-xs ${
                          isCurrentlyPlaying
                            ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300'
                            : isTriedBlunder
                            ? 'bg-amber-50/60 border-amber-300 hover:border-amber-400'
                            : 'bg-white hover:bg-emerald-50/70 border-emerald-200 hover:border-emerald-500'
                        }`}
                      >
                        {/* Keyboard number hint */}
                        <span className="absolute top-1.5 left-2 text-[10px] font-black text-slate-400 tabular-nums">
                          {idx + 1}
                        </span>

                        {/* Already viewed funny scene marker */}
                        {isTriedBlunder && (
                          <span className="absolute top-1.5 right-1.5 text-[10px] font-black bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded-md">
                            🎬
                          </span>
                        )}

                        <span
                          className={`font-badasseugi text-3xl sm:text-4xl font-bold leading-none ${
                            isCurrentlyPlaying ? 'text-rose-700' : 'text-slate-900'
                          }`}
                        >
                          {choice.particle}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SUMMARY VIEW */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 sm:py-8 px-3 text-center flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-3xl shadow-xs">
              🎬
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
                {ui.summaryTitle}
              </h3>
              <p className="text-sm font-bold text-slate-600 mt-1">{ui.summarySub}</p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full max-w-md">
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-3">
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 tabular-nums">
                  {firstTryCount}/{deck.length}
                </div>
                <div className="text-[11px] font-bold text-emerald-900 mt-0.5">
                  {ui.firstTryBadge}
                </div>
              </div>

              <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3">
                <div className="text-2xl sm:text-3xl font-black text-rose-600 tabular-nums">
                  {sessionBlunderCount}
                </div>
                <div className="text-[11px] font-bold text-rose-900 mt-0.5">
                  {ui.blunderBadge}
                </div>
              </div>

              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3">
                <div className="text-2xl sm:text-3xl font-black text-amber-700 tabular-nums">
                  {unlockedCount}/{totalCardCount}
                </div>
                <div className="text-[11px] font-bold text-amber-950 mt-0.5">
                  {ui.albumBtn}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleOpenAlbum}
                className="px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 border-2 border-amber-400 text-sm font-black flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>{ui.openAlbumBtn} ({unlockedCount}/{totalCardCount})</span>
              </button>

              <button
                type="button"
                onClick={handleRestartGame}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black flex items-center gap-1.5 shadow-sm cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{ui.playAgainBtn}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* PHOTO CARD ALBUM MODAL (15 BLUNDER CARDS) */}
      <AnimatePresence>
        {isAlbumOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-5"
            onClick={() => {
              setIsAlbumOpen(false);
              setPreviewCard(null);
              stopAllSpeech();
            }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[88vh] bg-white border-2 border-emerald-300 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-emerald-50 border-b border-emerald-200 shrink-0">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-emerald-950 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-emerald-700" />
                    <span>{ui.albumModalTitle}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs tabular-nums">
                      {unlockedCount} / {totalCardCount}
                    </span>
                  </h3>
                  <p className="text-xs font-bold text-emerald-800/80 mt-0.5">
                    {previewCard ? ui.albumReplayHint : ui.albumModalSub}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAlbumOpen(false);
                    setPreviewCard(null);
                    stopAllSpeech();
                  }}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer"
                  aria-label={ui.albumClose}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-3 sm:p-4 overflow-y-auto space-y-3">
                {/* Replay Mini Theater if a card is selected */}
                {previewCard && (
                  <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-3 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        #{String(previewCard.blunder.cardNumber).padStart(2, '0')} ·{' '}
                        <span className="text-rose-600">[{previewCard.blunder.wrongWord}]</span>{' '}
                        {previewCard.blunder.titleKo}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleReplayAlbumCard(previewCard.episode, previewCard.blunder)
                        }
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-black flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <Play className="w-3 h-3" />
                        <span>다시 재생</span>
                      </button>
                    </div>

                    <ParticleSitcomStage
                      mode="BLUNDER"
                      episode={previewCard.episode}
                      activeBlunder={previewCard.blunder}
                      replayKey={previewCard.key}
                      compact={true}
                    />

                    <p className="text-xs font-bold text-slate-700 leading-snug bg-white px-3 py-2 rounded-xl border border-amber-200">
                      {previewCard.blunder.whyFunnyKo}
                    </p>
                  </div>
                )}

                {/* 15 Photo Card Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {allCollectibleCards.map(({ episode, blunder }) => {
                    const isUnlocked = unlockedCardIds.includes(blunder.id);
                    const isSelected = previewCard?.blunder.id === blunder.id;

                    if (!isUnlocked) {
                      return (
                        <div
                          key={blunder.id}
                          className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/90 p-2.5 flex flex-col justify-between min-h-[96px] opacity-80"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-black text-slate-400 tabular-nums">
                              #{String(blunder.cardNumber).padStart(2, '0')}
                            </span>
                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                          </div>
                          <div className="text-center my-1">
                            <span className="text-sm font-black text-slate-500">
                              {episode.baseNoun} + 「{blunder.particle}」
                            </span>
                          </div>
                          <p className="text-[10.5px] font-bold text-slate-400 text-center leading-tight">
                            {ui.albumLockedLabel}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={blunder.id}
                        type="button"
                        onClick={() => handleReplayAlbumCard(episode, blunder)}
                        className={`text-left rounded-xl border-2 p-2.5 flex flex-col justify-between min-h-[96px] cursor-pointer transition-all hover:scale-[1.02] ${
                          blunder.cardTheme.bg
                        } ${blunder.cardTheme.border} ${
                          isSelected ? 'ring-2 ring-emerald-500 shadow-md' : 'shadow-xs'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.5 rounded-md tabular-nums ${blunder.cardTheme.tagBg} ${blunder.cardTheme.tagText}`}
                          >
                            #{String(blunder.cardNumber).padStart(2, '0')}
                          </span>
                          <span className="text-[11px] font-black text-slate-500">
                            {episode.unitBadge}
                          </span>
                        </div>

                        <div className="my-1">
                          <div className="text-xs font-black text-rose-700">
                            {blunder.wrongWord}?!
                          </div>
                          <div className="text-xs sm:text-[13px] font-black text-slate-900 leading-tight mt-0.5">
                            {blunder.titleKo}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                          <span>{episode.baseNoun} + {blunder.particle}</span>
                          <span className="inline-flex items-center gap-0.5 text-emerald-700 font-black">
                            <Play className="w-2.5 h-2.5" /> 재생
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
