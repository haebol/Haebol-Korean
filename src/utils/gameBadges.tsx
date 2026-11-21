import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Trophy } from 'lucide-react';
import { VocabularyItem } from '../types';
import { UiLanguage, GAMES_UI, FLASHCARD_COMMON_UI, MENU_EXTRAS_UI, SUBTAB_UI } from '../i18n/uiTranslations';
import { CHAPTER_LIST } from '../data/vocabulary';
import { getCustomVocabImage } from '../data/customVocabImages';
import { VocabVisual } from '../components/VocabVisual';
import { playCutePop, speakKorean } from './audio';

export type BadgeGameId = 'balloon' | 'memory' | 'mandu' | 'slingshot';

// Memory types (preserves existing haebol_memory_badges_v1 schema)
export type MemoryMedalTier = 'gold' | 'silver' | 'bronze';
export interface MemoryChapterBadgeRecord {
  tier: MemoryMedalTier;
  bestTurns: number;
  vocabKo: string;
}
export type MemoryBadgeMap = Record<number, MemoryChapterBadgeRecord>;

// Mandu 3-tier badges (0 mistakes = white, 1 = beige, 2+ = brown)
export type ManduBadgeTier = 'white' | 'beige' | 'brown';
export interface ManduBadgeRecord {
  tier: ManduBadgeTier;
  bestMistakes: number;
  updatedAt: number;
}
export type ManduBadgeMap = Record<string, ManduBadgeRecord>;

// Balloon & Slingshot 3-tier badges (0 mistakes = gold, 1 = silver, 2+ = mint)
export type ArcadeBadgeTier = 'gold' | 'silver' | 'mint';
export interface BalloonBadgeRecord {
  slotIndex: number;
  groupId: string;
  tier: ArcadeBadgeTier;
  mistakes: number;
  updatedAt: number;
}
export interface SlingshotBadgeRecord {
  tier: ArcadeBadgeTier;
  bestMistakes: number;
  updatedAt: number;
}
export type SlingshotBadgeMap = Record<string, SlingshotBadgeRecord>;

export const MEMORY_BADGE_STORAGE_KEY = 'haebol_memory_badges_v1';
export const BALLOON_BADGE_STORAGE_KEY = 'haebol_balloon_badges_v1';
export const MANDU_BADGE_STORAGE_KEY = 'haebol_mandu_badges_v1';
export const SLINGSHOT_BADGE_STORAGE_KEY = 'haebol_slingshot_badges_v1';

export const TOTAL_SLOTS_PER_GAME = 30;
export const TOTAL_ALL_BADGES = TOTAL_SLOTS_PER_GAME * 4; // 120
export const TROPHY_STEP = 10;
export const TOTAL_TROPHY_MILESTONES = TOTAL_ALL_BADGES / TROPHY_STEP; // 12

const BADGES_UPDATED_EVENT = 'haebol-badges-updated';

export const MANDU_UNIT_IDS: string[] = Array.from({ length: 30 }, (_, i) => `unit${i + 1}`);

export const SLINGSHOT_UNIT_IDS: string[] = [
  'unit1',
  'unit2',
  'sentence1',
  'unit3',
  'unit4',
  'unit5',
  'sentence2',
  'unit6',
  'unit6_2',
  'unit7',
  'sentence3',
  'unit8',
  'unit9',
  'unit10',
  'sentence4',
  'unit11',
  'unit12',
  'unit13',
  'sentence5',
  'unit14',
  'unit15',
  'unit16',
  'sentence6',
  'unit17',
  'unit18',
  'unit19',
  'sentence7',
  'unit20',
  'unit21',
  'sentence8',
];

const MEMORY_TIER_RANK: Record<MemoryMedalTier, number> = {
  bronze: 1,
  silver: 2,
  gold: 3,
};

const MANDU_TIER_RANK: Record<ManduBadgeTier, number> = {
  brown: 1,
  beige: 2,
  white: 3,
};

const ARCADE_TIER_RANK: Record<ArcadeBadgeTier, number> = {
  mint: 1,
  silver: 2,
  gold: 3,
};

export function getManduTierFromMistakes(mistakes: number): ManduBadgeTier {
  if (mistakes <= 0) return 'white';
  if (mistakes === 1) return 'beige';
  return 'brown';
}

export function getArcadeTierFromMistakes(mistakes: number): ArcadeBadgeTier {
  if (mistakes <= 0) return 'gold';
  if (mistakes === 1) return 'silver';
  return 'mint';
}

export function notifyBadgesUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(BADGES_UPDATED_EVENT));
  }
}

export function loadMemoryBadges(): MemoryBadgeMap {
  try {
    const raw = localStorage.getItem(MEMORY_BADGE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function loadBalloonBadges(): BalloonBadgeRecord[] {
  try {
    const raw = localStorage.getItem(BALLOON_BADGE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, TOTAL_SLOTS_PER_GAME) : [];
  } catch {
    return [];
  }
}

export function loadManduBadges(): ManduBadgeMap {
  try {
    const raw = localStorage.getItem(MANDU_BADGE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function loadSlingshotBadges(): SlingshotBadgeMap {
  try {
    const raw = localStorage.getItem(SLINGSHOT_BADGE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export interface BadgeSummarySnapshot {
  memoryMap: MemoryBadgeMap;
  balloonList: BalloonBadgeRecord[];
  manduMap: ManduBadgeMap;
  slingshotMap: SlingshotBadgeMap;
  memoryCount: number;
  balloonCount: number;
  manduCount: number;
  slingshotCount: number;
  totalBadges: number;
  trophiesEarned: number;
  nextTrophyTarget: number;
}

export function getBadgeSummarySnapshot(): BadgeSummarySnapshot {
  const memoryMap = loadMemoryBadges();
  const balloonList = loadBalloonBadges();
  const manduMap = loadManduBadges();
  const slingshotMap = loadSlingshotBadges();

  const memoryCount = Object.keys(memoryMap).length;
  const balloonCount = Math.min(TOTAL_SLOTS_PER_GAME, balloonList.length);
  const manduCount = MANDU_UNIT_IDS.filter((id) => Boolean(manduMap[id])).length;
  const slingshotCount = SLINGSHOT_UNIT_IDS.filter((id) => Boolean(slingshotMap[id])).length;

  const totalBadges = memoryCount + balloonCount + manduCount + slingshotCount;
  const trophiesEarned = Math.floor(totalBadges / TROPHY_STEP);
  const nextTrophyTarget = Math.min(TOTAL_ALL_BADGES, (trophiesEarned + 1) * TROPHY_STEP);

  return {
    memoryMap,
    balloonList,
    manduMap,
    slingshotMap,
    memoryCount,
    balloonCount,
    manduCount,
    slingshotCount,
    totalBadges,
    trophiesEarned,
    nextTrophyTarget,
  };
}

export function useGameBadgeSummary(): BadgeSummarySnapshot {
  const [snapshot, setSnapshot] = useState<BadgeSummarySnapshot>(() => getBadgeSummarySnapshot());

  const refresh = useCallback(() => {
    setSnapshot(getBadgeSummarySnapshot());
  }, []);

  useEffect(() => {
    const handleUpdate = () => refresh();
    window.addEventListener(BADGES_UPDATED_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(BADGES_UPDATED_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refresh]);

  return snapshot;
}

export interface ClearBadgeOutcome<T> {
  tier: T;
  totalBadges: number;
  trophiesEarned: number;
  newlyUnlockedTrophyMilestone: number | null;
}

export function recordMemoryBadgeClear(
  chapter: number,
  tier: MemoryMedalTier,
  turns: number,
  vocabKo: string
): ClearBadgeOutcome<MemoryMedalTier> {
  const before = getBadgeSummarySnapshot();
  const map = { ...before.memoryMap };
  const existing = map[chapter];
  const bestTier: MemoryMedalTier =
    existing && MEMORY_TIER_RANK[existing.tier] > MEMORY_TIER_RANK[tier] ? existing.tier : tier;
  const bestTurns = existing ? Math.min(existing.bestTurns, turns) : turns;
  map[chapter] = {
    tier: bestTier,
    bestTurns,
    vocabKo: existing?.vocabKo || vocabKo,
  };
  try {
    localStorage.setItem(MEMORY_BADGE_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
  notifyBadgesUpdated();
  const after = getBadgeSummarySnapshot();
  const newlyUnlockedTrophyMilestone =
    after.trophiesEarned > before.trophiesEarned ? after.trophiesEarned * TROPHY_STEP : null;
  return {
    tier,
    totalBadges: after.totalBadges,
    trophiesEarned: after.trophiesEarned,
    newlyUnlockedTrophyMilestone,
  };
}

export function recordBalloonBadgeClear(
  groupId: string,
  mistakes: number
): ClearBadgeOutcome<ArcadeBadgeTier> {
  const before = getBadgeSummarySnapshot();
  const list = [...before.balloonList];
  const tier = getArcadeTierFromMistakes(mistakes);
  const now = Date.now();

  if (list.length < TOTAL_SLOTS_PER_GAME) {
    list.push({
      slotIndex: list.length,
      groupId,
      tier,
      mistakes,
      updatedAt: now,
    });
  } else {
    // All 30 sequential slots filled: upgrade lowest-ranked slot if newly earned tier is higher
    let upgradeIdx = -1;
    let lowestRank = ARCADE_TIER_RANK[tier];
    list.forEach((item, idx) => {
      const rank = ARCADE_TIER_RANK[item.tier];
      if (rank < lowestRank) {
        lowestRank = rank;
        upgradeIdx = idx;
      }
    });
    if (upgradeIdx >= 0) {
      list[upgradeIdx] = {
        slotIndex: upgradeIdx,
        groupId,
        tier,
        mistakes,
        updatedAt: now,
      };
    }
  }

  try {
    localStorage.setItem(BALLOON_BADGE_STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
  notifyBadgesUpdated();
  const after = getBadgeSummarySnapshot();
  const newlyUnlockedTrophyMilestone =
    after.trophiesEarned > before.trophiesEarned ? after.trophiesEarned * TROPHY_STEP : null;
  return {
    tier,
    totalBadges: after.totalBadges,
    trophiesEarned: after.trophiesEarned,
    newlyUnlockedTrophyMilestone,
  };
}

export function recordManduBadgeClear(
  unitId: string,
  mistakes: number
): ClearBadgeOutcome<ManduBadgeTier> {
  const before = getBadgeSummarySnapshot();
  const map = { ...before.manduMap };
  const tier = getManduTierFromMistakes(mistakes);
  const existing = map[unitId];
  const bestTier: ManduBadgeTier =
    existing && MANDU_TIER_RANK[existing.tier] > MANDU_TIER_RANK[tier] ? existing.tier : tier;
  const bestMistakes = existing ? Math.min(existing.bestMistakes, mistakes) : mistakes;

  map[unitId] = {
    tier: bestTier,
    bestMistakes,
    updatedAt: Date.now(),
  };

  try {
    localStorage.setItem(MANDU_BADGE_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
  notifyBadgesUpdated();
  const after = getBadgeSummarySnapshot();
  const newlyUnlockedTrophyMilestone =
    after.trophiesEarned > before.trophiesEarned ? after.trophiesEarned * TROPHY_STEP : null;
  return {
    tier,
    totalBadges: after.totalBadges,
    trophiesEarned: after.trophiesEarned,
    newlyUnlockedTrophyMilestone,
  };
}

export function recordSlingshotBadgeClear(
  unitId: string,
  mistakes: number
): ClearBadgeOutcome<ArcadeBadgeTier> {
  const before = getBadgeSummarySnapshot();
  const map = { ...before.slingshotMap };
  const tier = getArcadeTierFromMistakes(mistakes);
  const existing = map[unitId];
  const bestTier: ArcadeBadgeTier =
    existing && ARCADE_TIER_RANK[existing.tier] > ARCADE_TIER_RANK[tier] ? existing.tier : tier;
  const bestMistakes = existing ? Math.min(existing.bestMistakes, mistakes) : mistakes;

  map[unitId] = {
    tier: bestTier,
    bestMistakes,
    updatedAt: Date.now(),
  };

  try {
    localStorage.setItem(SLINGSHOT_BADGE_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
  notifyBadgesUpdated();
  const after = getBadgeSummarySnapshot();
  const newlyUnlockedTrophyMilestone =
    after.trophiesEarned > before.trophiesEarned ? after.trophiesEarned * TROPHY_STEP : null;
  return {
    tier,
    totalBadges: after.totalBadges,
    trophiesEarned: after.trophiesEarned,
    newlyUnlockedTrophyMilestone,
  };
}

export function resetBadgesForGame(gameId: BadgeGameId) {
  try {
    if (gameId === 'memory') localStorage.removeItem(MEMORY_BADGE_STORAGE_KEY);
    else if (gameId === 'balloon') localStorage.removeItem(BALLOON_BADGE_STORAGE_KEY);
    else if (gameId === 'mandu') localStorage.removeItem(MANDU_BADGE_STORAGE_KEY);
    else if (gameId === 'slingshot') localStorage.removeItem(SLINGSHOT_BADGE_STORAGE_KEY);
  } catch {
    // ignore
  }
  notifyBadgesUpdated();
}

// =========================================================
// SVG Sticker Artworks (3 tiers per game)
// =========================================================

export const ManduBadgeGraphic: React.FC<{ tier: ManduBadgeTier; className?: string }> = ({
  tier,
  className = 'w-10 h-10',
}) => {
  const palette =
    tier === 'white'
      ? {
          fill: '#FFFFFF',
          shade: '#F1F5F9',
          stroke: '#64748B',
          crease: '#CBD5E1',
          cheek: '#FDA4AF',
        }
      : tier === 'beige'
      ? {
          fill: '#FEF3C7',
          shade: '#FDE68A',
          stroke: '#B45309',
          crease: '#D97706',
          cheek: '#FB7185',
        }
      : {
          fill: '#D97706',
          shade: '#B45309',
          stroke: '#78350F',
          crease: '#92400E',
          cheek: '#FCA5A5',
        };

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      {/* Pleated rim top */}
      <path
        d="M14 34 C14 21 22 14 32 14 C42 14 50 21 50 34 C50 45 43 51 32 51 C21 51 14 45 14 34 Z"
        fill={palette.fill}
        stroke={palette.stroke}
        strokeWidth="2.8"
      />
      <path
        d="M16 39 C18 46 24 50 32 50 C40 50 46 46 48 39"
        fill={palette.shade}
        opacity="0.7"
      />
      {/* Crimped mandu pleats along top arch */}
      <path d="M24 16 Q26 22 28 24" stroke={palette.crease} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 14 L32 23" stroke={palette.crease} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M40 16 Q38 22 36 24" stroke={palette.crease} strokeWidth="2.2" strokeLinecap="round" />
      {/* Cute face */}
      <circle cx="25.5" cy="34" r="2.2" fill={tier === 'brown' ? '#FFFBEB' : '#1E293B'} />
      <circle cx="38.5" cy="34" r="2.2" fill={tier === 'brown' ? '#FFFBEB' : '#1E293B'} />
      <circle cx="21.5" cy="37" r="2.3" fill={palette.cheek} opacity="0.75" />
      <circle cx="42.5" cy="37" r="2.3" fill={palette.cheek} opacity="0.75" />
      <path
        d="M28.5 38 Q32 41.5 35.5 38"
        stroke={tier === 'brown' ? '#FFFBEB' : '#1E293B'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BalloonBadgeGraphic: React.FC<{ tier: ArcadeBadgeTier; className?: string }> = ({
  tier,
  className = 'w-10 h-10',
}) => {
  const palette =
    tier === 'gold'
      ? {
          light: '#FFFDF0',
          mid: '#FEF08A',
          deep: '#F59E0B',
          stroke: '#B45309',
        }
      : tier === 'silver'
      ? {
          light: '#FFFFFF',
          mid: '#E2E8F0',
          deep: '#94A3B8',
          stroke: '#475569',
        }
      : {
          light: '#F0FDFA',
          mid: '#99F6E4',
          deep: '#10B981',
          stroke: '#047857',
        };
  const gradId = `badge-balloon-${tier}`;

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="28%" r="68%">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="48%" stopColor={palette.mid} />
          <stop offset="100%" stopColor={palette.deep} />
        </radialGradient>
      </defs>
      <path d="M32 48 Q29 53 32 57 T31 62" stroke={palette.stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M29 44 Q32 46 35 44 L36.5 48 Q32 49.5 27.5 48 Z" fill={palette.deep} stroke={palette.stroke} strokeWidth="1.4" />
      <path
        d="M32 6 C46 6, 52 16, 52 26 C52 36, 42 43, 32 45 C22 43, 12 36, 12 26 C12 16, 18 6, 32 6 Z"
        fill={`url(#${gradId})`}
        stroke={palette.stroke}
        strokeWidth="2.4"
      />
      <ellipse cx="22.5" cy="17" rx="4.2" ry="2.2" transform="rotate(-32 22.5 17)" fill="#FFFFFF" opacity="0.9" />
      <path d="M18 22 C16.5 26 16.5 30 18 33" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};

export const BulletBadgeGraphic: React.FC<{ tier: ArcadeBadgeTier; className?: string }> = ({
  tier,
  className = 'w-10 h-10',
}) => {
  const palette =
    tier === 'gold'
      ? {
          top: '#FEF9C3',
          mid: '#FACC15',
          bottom: '#D97706',
          fin: '#F59E0B',
          stroke: '#92400E',
          star: '#FFFBEB',
        }
      : tier === 'silver'
      ? {
          top: '#FFFFFF',
          mid: '#E2E8F0',
          bottom: '#64748B',
          fin: '#94A3B8',
          stroke: '#334155',
          star: '#FFFFFF',
        }
      : {
          top: '#ECFDF5',
          mid: '#6EE7B7',
          bottom: '#059669',
          fin: '#34D399',
          stroke: '#065F46',
          star: '#ECFDF5',
        };
  const gradId = `badge-bullet-${tier}`;

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="68%">
          <stop offset="0%" stopColor={palette.top} />
          <stop offset="52%" stopColor={palette.mid} />
          <stop offset="100%" stopColor={palette.bottom} />
        </radialGradient>
      </defs>
      {/* Speed tail */}
      <path d="M9 44 L20 35" stroke={palette.fin} strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
      <path d="M15 51 L24 41" stroke={palette.mid} strokeWidth="3" strokeLinecap="round" opacity="0.75" />
      <path d="M7 35 L18 29" stroke={palette.mid} strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />
      {/* Slingshot power orb / bullet */}
      <circle cx="36" cy="28" r="17" fill={`url(#${gradId})`} stroke={palette.stroke} strokeWidth="2.8" />
      {/* Ring groove */}
      <circle cx="36" cy="28" r="12" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="4 3" opacity="0.7" />
      {/* Star emblem inside bullet */}
      <path
        d="M36 19 L38.4 24.5 L44.3 25.2 L39.9 29.2 L41.1 35 L36 32 L30.9 35 L32.1 29.2 L27.7 25.2 L33.6 24.5 Z"
        fill={palette.star}
        stroke={palette.stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// =========================================================
// Unified Top-Center Badge Album Button (Identical in all 4 games)
// =========================================================

interface BadgeAlbumButtonProps {
  onClick: () => void;
  title?: string;
  count?: number;
}

export const GameBadgeAlbumButton: React.FC<BadgeAlbumButtonProps> = ({
  onClick,
  title = '내 앨범',
}) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        playCutePop();
        onClick();
      }}
      className="relative group shrink-0 mx-auto cursor-pointer focus:outline-none active:scale-95 transition-transform hover:scale-105"
      title={title}
      aria-label={title}
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 sm:border-4 border-amber-400 ring-2 ring-amber-300/80 bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 shadow-md flex items-center justify-center p-0.5 overflow-hidden">
        <img
          src="/assets/aistudio/image_aba2d474.png"
          alt={title}
          className="w-full h-full object-cover rounded-full select-none"
        />
      </div>
      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-white border border-amber-300 shadow-sm flex items-center justify-center text-[9px] sm:text-[10px]">
        👑
      </span>
    </button>
  );
};

// =========================================================
// Header Hall of Fame Button (Desktop + Mobile Top Header)
// =========================================================

interface HallOfFameHeaderButtonProps {
  onClick: () => void;
  compact?: boolean;
  uiLang?: UiLanguage;
}

export const HallOfFameHeaderButton: React.FC<HallOfFameHeaderButtonProps> = ({
  onClick,
  compact = false,
  uiLang = 'ko',
}) => {
  const { totalBadges, trophiesEarned } = useGameBadgeSummary();
  const hallUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).hallOfFame;

  return (
    <button
      type="button"
      onClick={() => {
        playCutePop();
        onClick();
      }}
      className={`h-8 rounded-sm bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-black flex items-center gap-1 cursor-pointer transition-colors shrink-0 tabular-nums whitespace-nowrap ${
        compact ? 'px-2 text-[11px]' : 'px-2.5 text-xs'
      }`}
      title={`${hallUi.title} · ${hallUi.trophyLabel} ${trophiesEarned} (${hallUi.badgeLabel} ${totalBadges}/${TOTAL_ALL_BADGES})`}
      aria-label={`${hallUi.title} ${hallUi.trophyLabel} ${trophiesEarned}`}
    >
      <Trophy className="w-3.5 h-3.5 text-amber-600 shrink-0" />
      <span>{trophiesEarned}</span>
      <span className="text-amber-700/80 font-bold text-[10px] sm:text-[11px]">
        ({totalBadges})
      </span>
    </button>
  );
};

// =========================================================
// Shared Badge Album & Hall of Fame Modal
// =========================================================

function pickMemoryChapterRepItem(chapterNum: number, vocabulary: VocabularyItem[]): VocabularyItem | undefined {
  const items = vocabulary.filter((v) => v.ch === chapterNum);
  return items.find((item) => Boolean(getCustomVocabImage(item.ko))) || items[0];
}

function getTierRingStyle(tier: 'gold' | 'silver' | 'mint' | 'bronze' | ManduBadgeTier): {
  ringClass: string;
  bgClass: string;
  cornerIcon: string;
} {
  if (tier === 'gold' || tier === 'white') {
    return {
      ringClass: 'border-amber-400 ring-2 ring-amber-200/80',
      bgClass: 'bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100',
      cornerIcon: tier === 'white' ? '🤍' : '👑',
    };
  }
  if (tier === 'silver' || tier === 'beige') {
    return {
      ringClass: 'border-slate-400 ring-2 ring-slate-200',
      bgClass: 'bg-gradient-to-b from-slate-50 via-white to-slate-200',
      cornerIcon: tier === 'beige' ? '🥟' : '🥈',
    };
  }
  if (tier === 'mint') {
    return {
      ringClass: 'border-emerald-400 ring-2 ring-emerald-200',
      bgClass: 'bg-gradient-to-b from-emerald-50 via-teal-50 to-emerald-100',
      cornerIcon: '🌿',
    };
  }
  if (tier === 'brown') {
    return {
      ringClass: 'border-amber-700 ring-2 ring-amber-200',
      bgClass: 'bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200',
      cornerIcon: '🤎',
    };
  }
  return {
    ringClass: 'border-orange-400 ring-2 ring-orange-200',
    bgClass: 'bg-gradient-to-b from-orange-50 via-amber-50 to-orange-100',
    cornerIcon: '🥉',
  };
}

const MiniTrophySvg: React.FC<{ unlocked: boolean; className?: string }> = ({
  unlocked,
  className = 'w-4 h-4',
}) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    {unlocked ? (
      <>
        <defs>
          <linearGradient id="hofGoldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="48%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <path
          d="M7 4H17V9.5C17 12.6 14.8 15 12 15C9.2 15 7 12.6 7 9.5V4Z"
          fill="url(#hofGoldGrad)"
          stroke="#92400E"
          strokeWidth="1.4"
        />
        <path d="M7 6H4.5C4.5 9 5.5 10.5 7 10.8" stroke="#FBBF24" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M17 6H19.5C19.5 9 18.5 10.5 17 10.8" stroke="#FBBF24" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12 15V18.2" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="8.2" y="18.2" width="7.6" height="2.4" rx="1.1" fill="#F59E0B" stroke="#92400E" strokeWidth="1.1" />
        <path d="M9.6 6.2V9.4" stroke="#FFFBEB" strokeWidth="1.4" strokeLinecap="round" opacity="0.9" />
      </>
    ) : (
      <>
        <path
          d="M7 4H17V9.5C17 12.6 14.8 15 12 15C9.2 15 7 12.6 7 9.5V4Z"
          fill="currentColor"
          opacity="0.22"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />
        <path d="M12 15V18.2" stroke="currentColor" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" />
        <rect x="8.4" y="18.2" width="7.2" height="2.2" rx="1" fill="currentColor" opacity="0.28" />
      </>
    )}
  </svg>
);

const LockedSocketSilhouette: React.FC<{ game: BadgeGameId; slotNum: number }> = ({
  game,
  slotNum,
}) => (
  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-amber-100/75 to-amber-50/40 border border-amber-200/80 shadow-[inset_0_2px_5px_rgba(180,83,9,0.12)] flex items-center justify-center select-none">
    {game === 'balloon' && (
      <svg viewBox="0 0 40 40" className="w-6 h-6 text-amber-300/65" fill="currentColor" aria-hidden="true">
        <path d="M20 5C28 5 32 11 32 17.5C32 24 26 28.5 20 29.8C14 28.5 8 24 8 17.5C8 11 12 5 20 5Z" />
        <path d="M20 30V36" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )}
    {game === 'mandu' && (
      <svg viewBox="0 0 40 40" className="w-6 h-6 text-purple-300/65" fill="currentColor" aria-hidden="true">
        <path d="M8 23C8 14.5 13 10 20 10C27 10 32 14.5 32 23C32 29.5 27 32 20 32C13 32 8 29.5 8 23Z" />
      </svg>
    )}
    {game === 'slingshot' && (
      <svg viewBox="0 0 40 40" className="w-6 h-6 text-emerald-300/65" fill="currentColor" aria-hidden="true">
        <circle cx="21" cy="19" r="10.5" />
      </svg>
    )}
    {game === 'memory' && (
      <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 text-rose-300/65" fill="currentColor" aria-hidden="true">
        <path d="M20 6L23.5 14.2L32.4 15L25.6 20.8L27.7 29.5L20 24.8L12.3 29.5L14.4 20.8L7.6 15L16.5 14.2L20 6Z" />
      </svg>
    )}
    <span className="absolute bottom-1 text-[9px] font-black text-amber-800/35 tabular-nums leading-none">
      {slotNum}
    </span>
  </div>
);

interface GameBadgeAndHallOfFameModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGame: BadgeGameId;
  vocabulary?: VocabularyItem[];
  uiLang?: UiLanguage;
}

export const GameBadgeAndHallOfFameModal: React.FC<GameBadgeAndHallOfFameModalProps> = ({
  isOpen,
  onClose,
  initialGame,
  vocabulary = [],
  uiLang = 'ko',
}) => {
  const [activeTab, setActiveTab] = useState<BadgeGameId>(initialGame);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialGame);
      setIsResetConfirmOpen(false);
    }
  }, [isOpen, initialGame]);

  const summary = useGameBadgeSummary();
  const memoryUi = (GAMES_UI[uiLang] || GAMES_UI.ko).memory;
  const commonUi = FLASHCARD_COMMON_UI[uiLang] || FLASHCARD_COMMON_UI.ko;
  const hallUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).hallOfFame;
  const gameTabUi = (SUBTAB_UI[uiLang] || SUBTAB_UI.ko).gameTabs;

  const gameTabs: {
    id: BadgeGameId;
    label: string;
    count: number;
    icon: string;
    activeClass: string;
  }[] = [
    {
      id: 'balloon',
      label: gameTabUi.balloon,
      count: summary.balloonCount,
      icon: '🎈',
      activeClass: 'bg-amber-400 text-amber-950 border-amber-500 shadow-[0_2px_0_#D97706]',
    },
    {
      id: 'memory',
      label: gameTabUi.memory,
      count: summary.memoryCount,
      icon: '🃏',
      activeClass: 'bg-rose-400 text-white border-rose-500 shadow-[0_2px_0_#BE123C]',
    },
    {
      id: 'mandu',
      label: gameTabUi.mandu,
      count: summary.manduCount,
      icon: '🥟',
      activeClass: 'bg-purple-500 text-white border-purple-600 shadow-[0_2px_0_#6B21A8]',
    },
    {
      id: 'slingshot',
      label: gameTabUi.slingshot,
      count: summary.slingshotCount,
      icon: '🎯',
      activeClass: 'bg-emerald-500 text-white border-emerald-600 shadow-[0_2px_0_#047857]',
    },
  ];

  const activeCount =
    activeTab === 'balloon'
      ? summary.balloonCount
      : activeTab === 'memory'
      ? summary.memoryCount
      : activeTab === 'mandu'
      ? summary.manduCount
      : summary.slingshotCount;

  const progressPct = Math.min(100, Math.round((summary.totalBadges / TOTAL_ALL_BADGES) * 100));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[130] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
          onClick={() => {
            setIsResetConfirmOpen(false);
            onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 14 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[90vh] bg-[#FFFBF2] border-3 border-amber-400 rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.5)] flex flex-col overflow-hidden font-korean-gothic"
          >
            {/* 1. Royal Navy & Gold Trophy Showcase Header */}
            <div className="px-3.5 sm:px-5 pt-3 pb-2.5 bg-gradient-to-b from-[#1E1B4B] via-[#27235E] to-[#1E1B4B] text-amber-50 shrink-0 relative overflow-hidden">
              {/* Soft golden top ambient glow */}
              <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-20 rounded-full bg-amber-300/20 blur-xl" />

              {/* Row 1: Title + Trophy Counter + Reset/Close */}
              <div className="relative flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-yellow-300 to-amber-500 border border-yellow-200/80 shadow-[0_2px_8px_rgba(250,204,21,0.45)] flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4 text-amber-950" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black tracking-tight text-white truncate">
                    {hallUi.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[11px] sm:text-xs font-black tabular-nums shrink-0">
                    {summary.trophiesEarned} / {TOTAL_TROPHY_MILESTONES}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setIsResetConfirmOpen(true);
                    }}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-rose-500/80 border border-white/15 text-indigo-200 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                    title={memoryUi.resetTitle}
                    aria-label={memoryUi.resetTitle}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setIsResetConfirmOpen(false);
                      onClose();
                    }}
                    className="w-7 h-7 rounded-lg bg-white/15 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                    aria-label={commonUi.closeBtn}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Row 2: 12 Gleaming Trophy Pedestals (1 sleek line, zero text noise) */}
              <div className="relative grid grid-cols-12 gap-0.5 sm:gap-1 items-center bg-black/25 rounded-xl px-1.5 py-1.5 border border-amber-300/20">
                {Array.from({ length: TOTAL_TROPHY_MILESTONES }, (_, idx) => {
                  const threshold = (idx + 1) * TROPHY_STEP;
                  const unlocked = summary.totalBadges >= threshold;
                  return (
                    <div
                      key={threshold}
                      title={`${threshold}`}
                      className={`h-6 sm:h-7 rounded-md flex items-center justify-center transition-all ${
                        unlocked
                          ? 'bg-amber-400/25 ring-1 ring-amber-300/70 shadow-[0_0_10px_rgba(250,204,21,0.4)]'
                          : 'text-indigo-200'
                      }`}
                    >
                      <MiniTrophySvg
                        unlocked={unlocked}
                        className={unlocked ? 'w-4.5 h-4.5 sm:w-5 sm:h-5 drop-shadow-xs' : 'w-3.5 h-3.5 sm:w-4 sm:h-4'}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Row 3: Slim Golden Gauge Bar + Total Badge Counter */}
              <div className="relative mt-1.5 flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-black/35 border border-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className="text-[11px] font-black text-amber-200 tabular-nums shrink-0 leading-none">
                  {summary.totalBadges}/{TOTAL_ALL_BADGES}
                </span>
              </div>
            </div>

            {/* 2. Tactile Game Cartridge Tabs */}
            <div className="px-3 sm:px-4 pt-2.5 pb-1.5 bg-[#FFFBF2] shrink-0">
              <div className="grid grid-cols-4 gap-1.5">
                {gameTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setIsResetConfirmOpen(false);
                        setActiveTab(tab.id);
                      }}
                      className={`py-1.5 px-1 rounded-xl border text-[11px] sm:text-xs font-black flex items-center justify-center gap-1 cursor-pointer transition-all whitespace-nowrap tabular-nums active:translate-y-0.5 ${
                        isActive
                          ? tab.activeClass
                          : 'bg-white hover:bg-amber-50 border-amber-200/80 text-slate-600'
                      }`}
                    >
                      <span className="text-xs sm:text-sm leading-none shrink-0">{tab.icon}</span>
                      <span className="truncate">{tab.label}</span>
                      <span
                        className={`text-[10px] font-black shrink-0 ${
                          isActive ? 'opacity-90' : 'text-slate-400'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Visual-Only Mini Tier Bar (Actual Collectible Icons + Compact Numbers Only) */}
            <div className="px-3.5 sm:px-5 pb-1.5 flex items-center justify-between gap-2 text-[11px] font-black text-amber-900/80 shrink-0 tabular-nums">
              <span className="text-xs text-amber-950">
                {activeCount} <span className="text-amber-700/60">/ {TOTAL_SLOTS_PER_GAME}</span>
              </span>

              <div className="flex items-center gap-2.5 sm:gap-3">
                {activeTab === 'balloon' && (
                  <>
                    <span className="flex items-center gap-0.5">
                      <BalloonBadgeGraphic tier="gold" className="w-4.5 h-4.5" />
                      <span>0</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <BalloonBadgeGraphic tier="silver" className="w-4.5 h-4.5" />
                      <span>1</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <BalloonBadgeGraphic tier="mint" className="w-4.5 h-4.5" />
                      <span>2+</span>
                    </span>
                  </>
                )}
                {activeTab === 'mandu' && (
                  <>
                    <span className="flex items-center gap-0.5">
                      <ManduBadgeGraphic tier="white" className="w-4.5 h-4.5" />
                      <span>0</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <ManduBadgeGraphic tier="beige" className="w-4.5 h-4.5" />
                      <span>1</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <ManduBadgeGraphic tier="brown" className="w-4.5 h-4.5" />
                      <span>2+</span>
                    </span>
                  </>
                )}
                {activeTab === 'slingshot' && (
                  <>
                    <span className="flex items-center gap-0.5">
                      <BulletBadgeGraphic tier="gold" className="w-4.5 h-4.5" />
                      <span>0</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <BulletBadgeGraphic tier="silver" className="w-4.5 h-4.5" />
                      <span>1</span>
                    </span>
                    <span className="flex items-center gap-0.5">
                      <BulletBadgeGraphic tier="mint" className="w-4.5 h-4.5" />
                      <span>2+</span>
                    </span>
                  </>
                )}
                {activeTab === 'memory' && (
                  <>
                    <span>👑 ≤6</span>
                    <span>🥈 7~9</span>
                    <span>🥉 10+</span>
                  </>
                )}
              </div>
            </div>

            {/* 4. Hero 30-Slot Collectible Sticker Book Tray */}
            <div className="px-3 sm:px-5 pb-4 pt-1 overflow-y-auto grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-2.5 justify-items-center bg-gradient-to-b from-[#FFFBF2] to-[#FEF5E1]">
              {Array.from({ length: TOTAL_SLOTS_PER_GAME }, (_, idx) => {
                if (activeTab === 'memory') {
                  const unitNum = idx + 1;
                  const chapterMeta = CHAPTER_LIST.find((c) => c.ch === unitNum);
                  const record = summary.memoryMap[unitNum];
                  if (chapterMeta && record) {
                    const style = getTierRingStyle(record.tier);
                    const repItem =
                      vocabulary.find((v) => v.ch === unitNum && v.ko === record.vocabKo) ||
                      pickMemoryChapterRepItem(unitNum, vocabulary);
                    return (
                      <button
                        key={`mem-${unitNum}`}
                        type="button"
                        onClick={() => {
                          if (repItem) speakKorean(repItem.ko, 0.85);
                        }}
                        title={`${unitNum}단원 ${chapterMeta.theme}`}
                        className="relative group cursor-pointer focus:outline-none active:scale-95 transition-transform"
                      >
                        <div
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 ${style.ringClass} ${style.bgClass} shadow-[0_3px_8px_rgba(180,83,9,0.2)] flex items-center justify-center p-1 group-hover:scale-105 transition-transform overflow-hidden`}
                        >
                          <span className="pointer-events-none absolute top-0.5 left-2 right-2 h-2.5 rounded-full bg-white/45" />
                          {repItem && <VocabVisual item={repItem} size="sm" />}
                        </div>
                        <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-white border border-amber-200 shadow-xs flex items-center justify-center text-[10px]">
                          {style.cornerIcon}
                        </span>
                      </button>
                    );
                  }
                  return <LockedSocketSilhouette key={`mem-${unitNum}`} game="memory" slotNum={unitNum} />;
                }

                if (activeTab === 'mandu') {
                  const unitId = MANDU_UNIT_IDS[idx];
                  const record = summary.manduMap[unitId];
                  if (record) {
                    const style = getTierRingStyle(record.tier);
                    return (
                      <div
                        key={`mandu-${unitId}`}
                        title={`${idx + 1}단원`}
                        className="relative select-none hover:scale-105 transition-transform"
                      >
                        <div
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 ${style.ringClass} ${style.bgClass} shadow-[0_3px_8px_rgba(126,34,206,0.18)] flex items-center justify-center p-1 overflow-hidden`}
                        >
                          <span className="pointer-events-none absolute top-0.5 left-2 right-2 h-2.5 rounded-full bg-white/45" />
                          <ManduBadgeGraphic tier={record.tier} className="w-9 h-9 sm:w-11 sm:h-11 relative z-10" />
                        </div>
                        <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-white border border-amber-200 shadow-xs flex items-center justify-center text-[10px]">
                          {style.cornerIcon}
                        </span>
                      </div>
                    );
                  }
                  return <LockedSocketSilhouette key={`mandu-${unitId}`} game="mandu" slotNum={idx + 1} />;
                }

                if (activeTab === 'balloon') {
                  const record = summary.balloonList[idx];
                  if (record) {
                    const style = getTierRingStyle(record.tier);
                    return (
                      <div
                        key={`balloon-${idx}`}
                        title={`#${idx + 1}`}
                        className="relative select-none hover:scale-105 transition-transform"
                      >
                        <div
                          className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 ${style.ringClass} ${style.bgClass} shadow-[0_3px_8px_rgba(217,119,6,0.2)] flex items-center justify-center p-1 overflow-hidden`}
                        >
                          <span className="pointer-events-none absolute top-0.5 left-2 right-2 h-2.5 rounded-full bg-white/50" />
                          <BalloonBadgeGraphic tier={record.tier} className="w-9 h-9 sm:w-11 sm:h-11 relative z-10" />
                        </div>
                        <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-white border border-amber-200 shadow-xs flex items-center justify-center text-[10px]">
                          {style.cornerIcon}
                        </span>
                      </div>
                    );
                  }
                  return <LockedSocketSilhouette key={`balloon-${idx}`} game="balloon" slotNum={idx + 1} />;
                }

                // Slingshot bullet badges
                const unitId = SLINGSHOT_UNIT_IDS[idx];
                const record = summary.slingshotMap[unitId];
                if (record) {
                  const style = getTierRingStyle(record.tier);
                  return (
                    <div
                      key={`sling-${unitId}`}
                      title={`${idx + 1}단원`}
                      className="relative select-none hover:scale-105 transition-transform"
                    >
                      <div
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 ${style.ringClass} ${style.bgClass} shadow-[0_3px_8px_rgba(5,150,105,0.2)] flex items-center justify-center p-1 overflow-hidden`}
                      >
                        <span className="pointer-events-none absolute top-0.5 left-2 right-2 h-2.5 rounded-full bg-white/50" />
                        <BulletBadgeGraphic tier={record.tier} className="w-9 h-9 sm:w-11 sm:h-11 relative z-10" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-white border border-amber-200 shadow-xs flex items-center justify-center text-[10px]">
                        {style.cornerIcon}
                      </span>
                    </div>
                  );
                }
                return <LockedSocketSilhouette key={`sling-${unitId}`} game="slingshot" slotNum={idx + 1} />;
              })}
            </div>

            {/* Safe Reset Confirmation Overlay */}
            {isResetConfirmOpen && (
              <div className="absolute inset-0 z-20 bg-slate-950/55 backdrop-blur-[1px] flex items-center justify-center p-4">
                <div className="w-full max-w-xs bg-white border-2 border-rose-400 rounded-2xl shadow-xl p-5 text-center space-y-3">
                  <p className="text-sm sm:text-base font-black text-slate-900">
                    {memoryUi.resetTitle}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setIsResetConfirmOpen(false);
                      }}
                      className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs sm:text-sm rounded-xl cursor-pointer transition-colors"
                    >
                      {memoryUi.cancelBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        resetBadgesForGame(activeTab);
                        setIsResetConfirmOpen(false);
                      }}
                      className="py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm rounded-xl cursor-pointer transition-colors"
                    >
                      {memoryUi.resetBtn}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
