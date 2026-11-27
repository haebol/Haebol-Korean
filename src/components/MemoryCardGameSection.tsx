import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Volume2, CheckCircle2, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';
import { VocabularyItem, SupportedLanguage, getLanguageMeta } from '../types';
import { UiLanguage, GAMES_UI, SUBTAB_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { getCustomVocabImage } from '../data/customVocabImages';
import {
  speakKorean,
  playCutePop,
  playGentleBoop,
  playMemeSuccessSfx,
  playApplauseFanfare,
  playSuccessChime,
} from '../utils/audio';
import { ManduMascot } from './ManduMascot';
import { VocabVisual } from './VocabVisual';
import {
  GameBadgeAlbumButton,
  GameBadgeAndHallOfFameModal,
  recordMemoryBadgeClear,
} from '../utils/gameBadges';

interface MemoryCardGameSectionProps {
  vocabulary: VocabularyItem[];
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  selectedChapter?: number;
  onSelectChapter?: (ch: number) => void;
  hideChapterBar?: boolean;
}

type CardRole = 'both' | 'image' | 'word';
type MatchMode = 'standard' | 'cross';
const PAIR_COUNT = 4;

interface CardItem {
  instanceId: string;
  item: VocabularyItem;
  cardRole: CardRole;
  hasBonusMandu?: boolean;
  bonusClaimed?: boolean;
  isFlipped: boolean;
  isMatched: boolean;
}

type MedalTier = 'gold' | 'silver' | 'bronze';

function getMedalMeta(tier: MedalTier): {
  emoji: string;
  title: string;
  ringClass: string;
  bgClass: string;
  badgeTextClass: string;
} {
  if (tier === 'gold') {
    return {
      emoji: '👑',
      title: '👑 금메달 왕관 배지 (완벽해요!)',
      ringClass: 'border-amber-400 ring-2 ring-amber-300/70',
      bgClass: 'bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100',
      badgeTextClass: 'text-amber-900',
    };
  }
  if (tier === 'silver') {
    return {
      emoji: '🥈',
      title: '🥈 은메달 별 배지 (참 잘했어요!)',
      ringClass: 'border-slate-400 ring-2 ring-slate-200',
      bgClass: 'bg-gradient-to-b from-slate-50 via-white to-slate-200',
      badgeTextClass: 'text-slate-800',
    };
  }
  return {
    emoji: '🥉',
    title: '🥉 동메달 새싹 배지 (성공! 한 번 더 도전해 볼까요?)',
    ringClass: 'border-orange-400 ring-2 ring-orange-200',
    bgClass: 'bg-gradient-to-b from-orange-50 via-amber-50 to-orange-100',
    badgeTextClass: 'text-orange-950',
  };
}

function getTierFromTurns(turnsCount: number): MedalTier {
  if (turnsCount <= 6) return 'gold';
  if (turnsCount <= 9) return 'silver';
  return 'bronze';
}

export const MemoryCardGameSection: React.FC<MemoryCardGameSectionProps> = ({
  vocabulary,
  lang,
  uiLang = 'ko',
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

  const [matchMode, setMatchMode] = useState<MatchMode>('standard');
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [collectedPairs, setCollectedPairs] = useState<VocabularyItem[]>([]);
  const [turns, setTurns] = useState(0);
  const [bonusNotice, setBonusNotice] = useState<{ key: number; message: string } | null>(null);
  const [levelUpModal, setLevelUpModal] = useState<{
    clearedChapter: number;
    turns: number;
    tier: MedalTier;
    badgeItem: VocabularyItem;
    newlyUnlockedTrophyMilestone: number | null;
  } | null>(null);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const suppressModalClearRef = useRef(false);
  const bonusTimerRef = useRef<number | null>(null);

  const pickChapterSvgItem = (chNum: number): VocabularyItem | undefined => {
    const chItems = vocabulary.filter((v) => v.ch === chNum);
    return (
      chItems.find((v) => Boolean(v.imageUrl || getCustomVocabImage(v.ko))) ||
      chItems[0]
    );
  };

  // Pool based on activeChapter
  const pool = useMemo(() => {
    return vocabulary.filter(v => v.ch === activeChapter);
  }, [vocabulary, activeChapter]);

  // Generate game board (always 8 cards = 4 pairs)
  const setupBoard = (targetMatchMode: MatchMode = matchMode) => {
    if (bonusTimerRef.current) {
      window.clearTimeout(bonusTimerRef.current);
      bonusTimerRef.current = null;
    }

    const basePool = [...pool].sort(() => 0.5 - Math.random());
    let selectedItems = basePool.slice(0, PAIR_COUNT);

    // Defensive fallback if a chapter has fewer than 4 items
    if (selectedItems.length < PAIR_COUNT) {
      const usedKo = new Set(selectedItems.map((i) => i.ko));
      const extras = [...vocabulary]
        .filter((v) => !usedKo.has(v.ko))
        .sort(() => 0.5 - Math.random())
        .slice(0, PAIR_COUNT - selectedItems.length);
      selectedItems = [...selectedItems, ...extras];
    }

    if (selectedItems.length === 0) return;

    const stamp = Date.now();
    const cardList: CardItem[] = [];
    selectedItems.forEach((item, idx) => {
      cardList.push({
        instanceId: `${item.ko}-a-${idx}-${stamp}`,
        item,
        cardRole: targetMatchMode === 'cross' ? 'image' : 'both',
        isFlipped: false,
        isMatched: false,
      });
      cardList.push({
        instanceId: `${item.ko}-b-${idx}-${stamp}`,
        item,
        cardRole: targetMatchMode === 'cross' ? 'word' : 'both',
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle cards
    const shuffledCards = cardList.sort(() => 0.5 - Math.random());

    // Occasional hidden Bonus Mandu card (~70% of boards) that cuts 1 turn when revealed
    const spawnBonus = Math.random() < 0.7;
    if (spawnBonus && shuffledCards.length > 0) {
      const bonusIdx = Math.floor(Math.random() * shuffledCards.length);
      shuffledCards[bonusIdx] = {
        ...shuffledCards[bonusIdx],
        hasBonusMandu: true,
        bonusClaimed: false,
      };
    }

    setCards(shuffledCards);
    setFlippedIndices([]);
    setIsProcessing(false);
    setMatchedPairs(0);
    setCollectedPairs([]);
    setTurns(0);
    setBonusNotice(null);
  };

  useEffect(() => {
    if (suppressModalClearRef.current) {
      suppressModalClearRef.current = false;
    } else {
      setLevelUpModal(null);
    }
    setupBoard(matchMode);
  }, [activeChapter, matchMode]);

  useEffect(() => {
    return () => {
      if (bonusTimerRef.current) {
        window.clearTimeout(bonusTimerRef.current);
      }
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (isProcessing) return;

    const clickedCard = cards[index];
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip sound & reading pedagogy:
    // In standard mode, speak word on flip. In cross mode, only speak when matched (or explicit button on word cards)
    // so the learner genuinely reads the Korean word card!
    playCutePop();
    if (clickedCard.cardRole === 'both') {
      speakKorean(clickedCard.item.ko, 0.85);
    }

    const foundNewBonus = Boolean(clickedCard.hasBonusMandu && !clickedCard.bonusClaimed);
    if (foundNewBonus) {
      playSuccessChime();
      setBonusNotice({
        key: Date.now(),
        message: '🥟 보너스 만두 발견! (-1턴)',
      });
      if (bonusTimerRef.current) {
        window.clearTimeout(bonusTimerRef.current);
      }
      bonusTimerRef.current = window.setTimeout(() => {
        setBonusNotice(null);
      }, 2400);

      try {
        confetti({
          particleCount: 24,
          spread: 55,
          origin: { y: 0.55 },
          colors: ['#F59E0B', '#FDE68A', '#FB7185', '#FFFFFF'],
        });
      } catch {
        // ignore
      }
    }

    const newCards = [...cards];
    newCards[index] = {
      ...clickedCard,
      isFlipped: true,
      bonusClaimed: foundNewBonus ? true : clickedCard.bonusClaimed,
    };
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 1) {
      if (foundNewBonus) {
        setTurns((prev) => Math.max(0, prev - 1));
      }
      return;
    }

    // If 2 cards flipped, check match
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      // Standard turn increments by +1; if the 2nd flipped card also triggered bonus (-1), net delta is 0
      const nextTurns = Math.max(0, turns + (foundNewBonus ? 0 : 1));
      setTurns(nextTurns);

      const [firstIdx, secondIdx] = newFlipped;
      const card1 = newCards[firstIdx];
      const card2 = newCards[secondIdx];

      if (card1.item.ko === card2.item.ko) {
        // MATCH!
        setTimeout(() => {
          // 숏폼 밈 사운드 효과음 (초등학생들에게 친숙한 8비트 아이템 획득 & 팡파레 사운드)
          playMemeSuccessSfx();
          if (matchMode === 'cross') {
            window.setTimeout(() => {
              speakKorean(card1.item.ko, 0.85);
            }, 240);
          }

          newCards[firstIdx] = { ...card1, isMatched: true };
          newCards[secondIdx] = { ...card2, isMatched: true };
          setCards(newCards);
          setFlippedIndices([]);
          setIsProcessing(false);

          const newMatchedCount = matchedPairs + 1;
          setMatchedPairs(newMatchedCount);
          setCollectedPairs((prev) =>
            prev.some((p) => p.ko === card1.item.ko) ? prev : [...prev, card1.item]
          );

          // Mini confetti on match
          try {
            confetti({
              particleCount: 30,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#FF69B4', '#FFB6C1', '#FFD700', '#FF1493', '#8B5CF6'],
            });
          } catch {
            // ignore
          }

          // Check if game complete
          if (newMatchedCount >= PAIR_COUNT) {
            const clearedCh = activeChapter;
            const finalTurns = nextTurns;
            const earnedTier = getTierFromTurns(finalTurns);
            const repItem = pickChapterSvgItem(clearedCh) || card1.item;
            const badgeOutcome = recordMemoryBadgeClear(
              clearedCh,
              earnedTier,
              finalTurns,
              repItem.ko
            );

            setTimeout(() => {
              playApplauseFanfare();
              try {
                confetti({
                  particleCount: 110,
                  spread: 90,
                  origin: { y: 0.5 },
                });
              } catch {
                // ignore
              }
              setLevelUpModal({
                clearedChapter: clearedCh,
                turns: finalTurns,
                tier: earnedTier,
                badgeItem: repItem,
                newlyUnlockedTrophyMilestone: badgeOutcome.newlyUnlockedTrophyMilestone,
              });
            }, 650);
          }
        }, 450);
      } else {
        // NO MATCH - Flip back gently after small pause
        setTimeout(() => {
          playGentleBoop();
          newCards[firstIdx] = { ...card1, isFlipped: false };
          newCards[secondIdx] = { ...card2, isFlipped: false };
          setCards(newCards);
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 950);
      }
    }
  };

  const gameUi = (GAMES_UI[uiLang] || GAMES_UI.ko).memory;
  const subUi = SUBTAB_UI[uiLang] || SUBTAB_UI.ko;

  return (
    <div className="w-full space-y-1 sm:space-y-1.5 max-w-4xl lg:max-w-full mx-auto font-korean-gothic overflow-x-clip">
      {/* Row 5 Sticky Top Bar */}
      {!hideChapterBar && (
        <div className="sticky top-[80px] sm:top-[90px] z-[22] bg-[#F4F5F7]/95 backdrop-blur-md pb-1 w-full">
          <div className="relative w-full max-w-md mx-auto">
            <select
              value={activeChapter}
              onChange={(e) => {
                playCutePop();
                handleChapterChange(Number(e.target.value));
              }}
              className="w-full h-8 sm:h-8.5 pl-3 pr-8 rounded-none bg-white hover:bg-rose-50/80 border border-rose-300 text-rose-950 font-black text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-rose-400 font-korean-gothic shadow-none truncate"
              title={subUi.studyControls.unitSelectTitle}
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

      {/* Main Board Stage - 카드게임 컨테이너 */}
      <div className="relative bg-[#fff5f7] border-2 border-rose-200 rounded-lg p-2 sm:p-4 shadow-md shadow-rose-200/40 flex flex-col font-korean-gothic h-[400px] sm:h-[500px] justify-between gap-1 sm:gap-1.5 overflow-hidden">
        {/* TOP HEADER: Left instruction, Top-Center Gold Medal Album Icon (No Text), Right instruction */}
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-start gap-1.5 sm:gap-4 px-1 pt-0 sm:pt-0.5 shrink-0">
          {/* Left Top: Slightly tilted down-left instruction text */}
          <div className="flex justify-start pt-0.5 sm:pt-1">
            <p className="font-badasseugi text-xs sm:text-sm font-bold text-rose-950 leading-snug text-left break-keep -rotate-3 origin-center select-none">
              {gameUi.guideLine1}
            </p>
          </div>

          {/* Top Center: Icon-only Gold Medal Badge Album Button */}
          <GameBadgeAlbumButton
            onClick={() => setIsBadgeModalOpen(true)}
            title={gameUi.albumBtn}
          />

          {/* Right Top: Slightly tilted down-right instruction text */}
          <div className="flex justify-end pt-0.5 sm:pt-1">
            <p className="font-badasseugi text-xs sm:text-sm font-bold text-rose-900 leading-snug text-right break-keep rotate-3 origin-center select-none">
              {gameUi.guideLine2}
            </p>
          </div>
        </div>

        {/* Bonus Mandu Notice (floating text-only so cards never shift vertically) */}
        <AnimatePresence>
          {bonusNotice && (
            <motion.p
              key={bonusNotice.key}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="pointer-events-none absolute top-11 sm:top-14 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap text-center text-xs sm:text-sm font-black text-amber-700 drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] select-none"
            >
              {bonusNotice.message}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Grid of 8 Cards (4 columns x 2 rows) generously centered */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 my-auto justify-center justify-items-center max-w-xl sm:max-w-2xl mx-auto w-full py-0.5">
          {cards.map((card, idx) => {
            const showFace = card.isFlipped || card.isMatched;
            const koLen = card.item.ko.length;
            const nativeText = String((card.item as Record<string, unknown>)[lang] || card.item.en || '');
            const nativeLen = nativeText.length;
            const cardHeightClass = 'max-w-[92px] sm:max-w-[126px] h-[104px] sm:h-[144px]';
            const showSpeakerBtn =
              card.cardRole !== 'image' || card.isMatched;

            return (
              <div
                key={card.instanceId}
                className={`w-full ${cardHeightClass} perspective-[1000px] select-none cursor-pointer`}
                onClick={() => handleCardClick(idx)}
              >
                <motion.div
                  animate={{ rotateY: showFace ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="relative w-full h-full rounded-md shadow-sm transition-shadow hover:shadow-md"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* BACK of card (Face Down: Beautiful Pastel Pink Fairy Pattern) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-md bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 border-2 border-pink-200 flex flex-col items-center justify-center p-2 shadow-inner"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                    }}
                  >
                    <div className="pointer-events-none flex items-center justify-center scale-90 sm:scale-100">
                      <ManduMascot size="sm" interactive={false} />
                    </div>
                    <span className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] font-black text-white/95 tracking-widest uppercase">
                      해볼한국어
                    </span>
                  </div>

                  {/* FRONT of card (Face Up: Role-aware Rendering) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-md p-1 sm:p-1.5 flex flex-col items-center justify-between border-3 overflow-hidden transition-colors ${
                      card.isMatched
                        ? 'bg-gradient-to-b from-amber-50 to-pink-50 border-amber-300 shadow-md shadow-amber-100'
                        : card.cardRole === 'word'
                        ? 'bg-gradient-to-b from-white to-amber-50/50 border-amber-300 shadow-sm'
                        : 'bg-white border-pink-300 shadow-sm'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    {/* Top Mini Header */}
                    <div className="w-full flex items-center justify-between shrink-0 gap-0.5">
                      <div className="flex items-center gap-0.5">
                        {card.isMatched ? (
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 fill-emerald-100" />
                        ) : card.cardRole === 'image' ? (
                          <span className="px-1 py-0.2 rounded bg-rose-100 text-rose-700 text-[8px] sm:text-[9px] font-black">
                            그림
                          </span>
                        ) : card.cardRole === 'word' ? (
                          <span className="px-1 py-0.2 rounded bg-amber-100 text-amber-800 text-[8px] sm:text-[9px] font-black">
                            한글
                          </span>
                        ) : (
                          <span className="text-[10px] text-pink-400 font-bold">✨</span>
                        )}
                        {card.hasBonusMandu && card.bonusClaimed && (
                          <span
                            className="px-1 rounded bg-amber-300/90 text-amber-950 text-[8px] sm:text-[9px] font-black leading-tight"
                            title="보너스 만두 -1턴"
                          >
                            🥟-1
                          </span>
                        )}
                      </div>

                      {showSpeakerBtn ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKorean(card.item.ko, 0.85);
                          }}
                          className="p-0.5 text-rose-600 hover:text-rose-800"
                          title="발음 듣기"
                        >
                          <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      ) : (
                        <span className="w-3 h-3" />
                      )}
                    </div>

                    {/* Body by cardRole */}
                    {card.cardRole === 'image' ? (
                      <>
                        <div className="my-auto flex items-center justify-center shrink-0 h-8 sm:h-11">
                          <div className="scale-[0.68] sm:scale-[0.92] flex items-center justify-center">
                            <VocabVisual item={card.item} size="md" />
                          </div>
                        </div>
                        <p
                          className={`${
                            nativeLen >= 26
                              ? 'text-[7px] sm:text-[9px]'
                              : nativeLen >= 15
                              ? 'text-[8px] sm:text-[9.5px]'
                              : nativeLen >= 9
                              ? 'text-[8.5px] sm:text-[10.5px]'
                              : 'text-[9.5px] sm:text-[11px]'
                          } text-slate-700 w-full font-bold leading-[1.12] whitespace-normal break-words [overflow-wrap:anywhere] text-center shrink-0 pb-0.5 px-0.5`}
                        >
                          <span className="mr-0.5 inline-block">{getLanguageMeta(lang).flag}</span>
                          <span>{nativeText}</span>
                        </p>
                      </>
                    ) : card.cardRole === 'word' ? (
                      <div className="my-auto text-center w-full min-w-0 px-0.5 flex flex-col items-center justify-center">
                        <p
                          className={`${
                            koLen >= 6
                              ? 'text-xs sm:text-base'
                              : koLen >= 4
                              ? 'text-sm sm:text-lg'
                              : 'text-base sm:text-xl'
                          } font-black text-slate-900 leading-tight break-keep`}
                        >
                          {card.item.ko}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="my-auto flex items-center justify-center shrink-0 h-7 sm:h-10">
                          <div className="scale-[0.58] sm:scale-[0.86] flex items-center justify-center">
                            <VocabVisual item={card.item} size="md" />
                          </div>
                        </div>
                        <div className="text-center w-full min-w-0 shrink-0 px-0.5">
                          <p
                            className={`${
                              koLen >= 6
                                ? 'text-[10px] sm:text-sm'
                                : koLen >= 4
                                ? 'text-[11px] sm:text-base'
                                : 'text-[12.5px] sm:text-base'
                            } font-black text-slate-900 leading-[1.12] break-keep`}
                          >
                            {card.item.ko}
                          </p>
                          <p
                            className={`${
                              nativeLen >= 26
                                ? 'text-[7px] sm:text-[9px]'
                                : nativeLen >= 15
                                ? 'text-[8px] sm:text-[9.5px]'
                                : nativeLen >= 9
                                ? 'text-[8.5px] sm:text-[10px]'
                                : 'text-[9.5px] sm:text-[11px]'
                            } text-slate-600 w-full font-bold leading-[1.12] whitespace-normal break-words [overflow-wrap:anywhere] text-center mt-0.5`}
                          >
                            <span className="mr-0.5 inline-block">{getLanguageMeta(lang).flag}</span>
                            <span>{nativeText}</span>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM ROW: Collected Stickers (수집한 스티커) + Hard / Easy Toggle Button */}
        <div className="w-full max-w-2xl mx-auto mt-auto flex items-stretch gap-1.5 sm:gap-2.5 shrink-0">
          <div className="flex-1 min-w-0 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/90 border border-rose-200/80 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1">
              <span className="text-[10px] sm:text-xs font-black text-rose-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                <span>수집한 스티커</span>
              </span>
              <span className="text-[10px] sm:text-xs font-black text-rose-600 tabular-nums">
                {collectedPairs.length} / {PAIR_COUNT}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1 sm:gap-2">
              {Array.from({ length: PAIR_COUNT }, (_, slotIdx) => {
                const collectedItem = collectedPairs[slotIdx];
                if (!collectedItem) {
                  return (
                    <div
                      key={`empty-slot-${slotIdx}`}
                      className="h-7 sm:h-9 rounded-md border-2 border-dashed border-rose-200 bg-rose-50/40 flex items-center justify-center text-xs sm:text-sm font-black text-rose-300 select-none"
                    >
                      ?
                    </div>
                  );
                }
                return (
                  <motion.button
                    key={`collected-${collectedItem.ko}`}
                    type="button"
                    initial={{ scale: 0.45, opacity: 0, y: 12 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                    onClick={() => speakKorean(collectedItem.ko, 0.85)}
                    className="h-7 sm:h-9 px-1 rounded-md border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-rose-50 shadow-xs flex items-center justify-center gap-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform overflow-hidden"
                    title={`${collectedItem.ko} 듣기`}
                  >
                    <div className="shrink-0 scale-[0.5] sm:scale-[0.62] -mx-2">
                      <VocabVisual item={collectedItem} size="sm" />
                    </div>
                    <span className="text-[9px] sm:text-xs font-black text-slate-800 truncate leading-none">
                      {collectedItem.ko}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playCutePop();
              setMatchMode((prev) => (prev === 'standard' ? 'cross' : 'standard'));
            }}
            className={`shrink-0 w-[62px] sm:w-[88px] rounded-lg border-2 font-black text-xs sm:text-sm flex flex-col items-center justify-center gap-0.5 px-1.5 py-1 shadow-xs cursor-pointer active:scale-95 transition-all select-none ${
              matchMode === 'standard'
                ? 'bg-[#D94A6B] hover:bg-[#BE3A58] border-rose-300 text-white'
                : 'bg-amber-400 hover:bg-amber-500 border-amber-200 text-amber-950'
            }`}
            title={
              matchMode === 'standard'
                ? '한글 ↔ 모국어+그림 짝짓기(Hard) 모드로 전환'
                : '그림+한글(Easy) 모드로 전환'
            }
          >
            <span className="leading-none tracking-tight text-sm sm:text-base">
              {matchMode === 'standard' ? 'Hard' : 'Easy'}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold opacity-90 leading-none whitespace-nowrap">
              {matchMode === 'standard' ? '한글↔그림' : '그림+글자'}
            </span>
          </button>
        </div>
      </div>

      {/* CLEAR MEDAL REWARD MODAL */}
      <AnimatePresence>
        {levelUpModal && (() => {
          const medalMeta = getMedalMeta(levelUpModal.tier);
          const curIdx = CHAPTER_LIST.findIndex((c) => c.ch === levelUpModal.clearedChapter);
          const nextCh = CHAPTER_LIST[(curIdx + 1) % CHAPTER_LIST.length];
          const tierLabel =
            levelUpModal.tier === 'gold'
              ? gameUi.goldBadge
              : levelUpModal.tier === 'silver'
              ? gameUi.silverBadge
              : gameUi.bronzeBadge;

          return (
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
                className="w-full max-w-sm bg-[#FFF5F7] border-3 border-rose-400 rounded-xl shadow-2xl p-6 text-center space-y-4"
              >
                {/* Circular Medal Frame with Existing Chapter Illustration SVG */}
                <div className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <div
                      className={`w-24 h-24 rounded-full border-4 ${medalMeta.ringClass} ${medalMeta.bgClass} shadow-lg flex items-center justify-center p-2`}
                    >
                      <VocabVisual item={levelUpModal.badgeItem} size="lg" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border border-rose-200 shadow-sm flex items-center justify-center text-lg">
                      {medalMeta.emoji}
                    </span>
                  </div>

                  <p className={`text-lg sm:text-xl font-black leading-snug break-keep ${medalMeta.badgeTextClass}`}>
                    {medalMeta.emoji} {tierLabel} · {gameUi.earnedAllClear}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-600 tabular-nums">
                    {getChapterCircledTitle(levelUpModal.clearedChapter, lang)} · {gameUi.turnsPrefix} {levelUpModal.turns}{gameUi.turnsSuffix}
                  </p>
                  {levelUpModal.newlyUnlockedTrophyMilestone && (() => {
                    const hallUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).hallOfFame;
                    return (
                      <p className="text-xs font-black text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md">
                        {hallUi.trophyUnlockedPrefix} ({levelUpModal.newlyUnlockedTrophyMilestone} {hallUi.badgeLabel})
                      </p>
                    );
                  })()}
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setLevelUpModal(null);
                      handleChapterChange(nextCh.ch);
                    }}
                    className="w-full py-3 bg-[#D94A6B] hover:bg-[#BE3A58] active:scale-95 text-white font-black text-base rounded-none shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    <span>{gameUi.nextUnitBtn}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setLevelUpModal(null);
                      setupBoard(matchMode);
                    }}
                    className="w-full py-2.5 bg-rose-100 hover:bg-rose-200 active:scale-95 text-rose-900 font-black text-sm rounded-none border border-rose-300 cursor-pointer transition-all"
                  >
                    {gameUi.retryGoldBtn}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* 🏆 SHARED BADGE COLLECTION & HALL OF FAME MODAL */}
      <GameBadgeAndHallOfFameModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        initialGame="memory"
        vocabulary={vocabulary}
        uiLang={uiLang}
      />
    </div>
  );
};
