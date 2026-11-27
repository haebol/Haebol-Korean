import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Volume2, RefreshCw, ChevronDown, ArrowRight, Sparkles, Crown } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { UiLanguage, GAMES_UI, SUBTAB_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import {
  HANGEUL_GROUPS,
  CONSONANT_BASE_SOUNDS,
  HangeulCardData as HangeulStrokeCard,
} from './HangeulStrokeFlashcardSection';
import {
  speakKorean,
  playCutePop,
  playBalloonPopSound,
  playComicWrongSound,
  playWindGustSound,
  playApplauseFanfare,
} from '../utils/audio';
import {
  ArcadeBadgeTier,
  BalloonBadgeGraphic,
  GameBadgeAlbumButton,
  GameBadgeAndHallOfFameModal,
  recordBalloonBadgeClear,
} from '../utils/gameBadges';

interface HangeulBalloonGameSectionProps {
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  selectedGroupId?: string;
  onSelectGroupId?: (groupId: string) => void;
  hideGroupBar?: boolean;
}

interface HangeulBalloonItem {
  id: string;
  card: HangeulStrokeCard;
  displayChar: string;
  color: {
    gradLight: string;
    gradMid: string;
    gradDeep: string;
    knotHex: string;
    stringHex: string;
    textHex: string;
  };
  isGoldenSpecial: boolean;
  isKingBalloon: boolean;
  isPopped: boolean;
  popCombo: number;
  popPoints: number;
  isWobbling: boolean;
}

interface BalloonPhysicsBody {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  bobPhase: number;
  bobAmp: number;
  bobFreq: number;
  speedFactor: number;
  isPopped: boolean;
}

const TOTAL_ROUNDS = 9;

const BALLOON_COLORS = [
  {
    gradLight: '#FFFDF7',
    gradMid: '#FEF3C7',
    gradDeep: '#FDE047',
    knotHex: '#FACC15',
    stringHex: '#F59E0B',
    textHex: '#92400E',
  },
  {
    gradLight: '#FEF9FF',
    gradMid: '#F3E8FF',
    gradDeep: '#D8B4FE',
    knotHex: '#C084FC',
    stringHex: '#A855F7',
    textHex: '#6B21A8',
  },
  {
    gradLight: '#FFF7FA',
    gradMid: '#FCE7F3',
    gradDeep: '#F9A8D4',
    knotHex: '#F472B6',
    stringHex: '#EC4899',
    textHex: '#9D174D',
  },
  {
    gradLight: '#F7FCFF',
    gradMid: '#E0F2FE',
    gradDeep: '#7DD3FC',
    knotHex: '#38BDF8',
    stringHex: '#0EA5E9',
    textHex: '#0369A1',
  },
  {
    gradLight: '#F5FFFA',
    gradMid: '#D1FAE5',
    gradDeep: '#6EE7B7',
    knotHex: '#34D399',
    stringHex: '#10B981',
    textHex: '#047857',
  },
  {
    gradLight: '#FFF9F5',
    gradMid: '#FFEDD5',
    gradDeep: '#FDBA74',
    knotHex: '#FB923C',
    stringHex: '#F97316',
    textHex: '#C2410C',
  },
];

// Magical Heartsping ("하츄핑 변신") transformation burst particles
const POP_PARTICLES = [
  { x: -46, y: -44, icon: '💖', color: 'text-pink-500' },
  { x: 46, y: -42, icon: '✨', color: 'text-amber-400' },
  { x: -56, y: 6, icon: '🎀', color: 'text-rose-400' },
  { x: 56, y: 8, icon: '💗', color: 'text-pink-400' },
  { x: -34, y: 46, icon: '⭐', color: 'text-yellow-400' },
  { x: 36, y: 44, icon: '💖', color: 'text-fuchsia-500' },
  { x: 0, y: -58, icon: '✨', color: 'text-pink-400' },
  { x: 0, y: 54, icon: '💕', color: 'text-rose-500' },
];

function getStageConfig(roundNum: number): {
  stage: 1 | 2 | 3;
  balloonCount: number;
  baseSpeed: number;
} {
  if (roundNum <= 3) {
    // Stage 1: 천천히 산책하듯 (3개)
    return { stage: 1, balloonCount: 3, baseSpeed: 46 };
  }
  if (roundNum <= 6) {
    // Stage 2: 중간 속도 (4개)
    return { stage: 2, balloonCount: 4, baseSpeed: 80 };
  }
  // Stage 3: 빠른 속도 (5개)
  return { stage: 3, balloonCount: 5, baseSpeed: 115 };
}

function getHangeulCardAudioText(card: HangeulStrokeCard, badge: string): string {
  if (card.combination) {
    return card.combination.isWordCard
      ? card.sampleWord
      : card.combination.syllableSound || card.char;
  }
  if (badge === '자음' || badge === '쌍자음') {
    const base = CONSONANT_BASE_SOUNDS[card.char] || card.char;
    return `${base}, ${card.name}`;
  }
  return card.name || card.char;
}

function getHangeulDisplayChar(card: HangeulStrokeCard): string {
  if (card.combination?.isWordCard) {
    return card.sampleWord;
  }
  return card.char;
}

// Homophone grouping so two identical-sounding vowels never appear in the same round
function getPhoneticCollisionKey(card: HangeulStrokeCard, badge: string): string {
  if (badge === '복합모음') {
    if (card.char === 'ㅐ' || card.char === 'ㅔ') return 'AE_E';
    if (card.char === 'ㅒ' || card.char === 'ㅖ') return 'YAE_YE';
    if (card.char === 'ㅚ' || card.char === 'ㅙ' || card.char === 'ㅞ') return 'OE_WAE_WE';
  }
  if (badge === '기본글자') {
    if (card.char === '얘' || card.char === '예') return 'YAE_YE';
    if (card.char === '걔' || card.char === '계') return 'GYAE_GYE';
  }
  return getHangeulDisplayChar(card);
}

const CHO_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const JUNG_LIST = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const JONG_LIST = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function decomposeSyllable(ch: string): { cho: string; jung: string; jong: string } | null {
  if (!ch) return null;
  const code = ch.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return null;
  const offset = code - 0xac00;
  const jongIdx = offset % 28;
  const jungIdx = Math.floor(offset / 28) % 21;
  const choIdx = Math.floor(offset / (28 * 21));
  return {
    cho: CHO_LIST[choIdx],
    jung: JUNG_LIST[jungIdx],
    jong: JONG_LIST[jongIdx],
  };
}

const MINIMAL_CONSONANT_GROUPS: string[][] = [
  ['ㄱ', 'ㄲ', 'ㅋ'],
  ['ㄷ', 'ㄸ', 'ㅌ'],
  ['ㅂ', 'ㅃ', 'ㅍ'],
  ['ㅈ', 'ㅉ', 'ㅊ'],
  ['ㅅ', 'ㅆ'],
  ['ㄴ', 'ㅁ', 'ㅇ'],
];

const MINIMAL_VOWEL_GROUPS: string[][] = [
  ['ㅓ', 'ㅗ'],
  ['ㅑ', 'ㅕ'],
  ['ㅕ', 'ㅛ'],
  ['ㅐ', 'ㅔ'],
  ['ㅒ', 'ㅖ'],
  ['ㅏ', 'ㅓ'],
  ['ㅗ', 'ㅜ'],
  ['ㅜ', 'ㅡ'],
  ['ㅘ', 'ㅝ'],
  ['ㅚ', 'ㅟ'],
];

function getMinimalPairPriority(targetDisp: string, candidateDisp: string): number {
  if (!targetDisp || !candidateDisp || targetDisp === candidateDisp) return 0;

  // Single jamo minimal pairs
  if (targetDisp.length === 1 && candidateDisp.length === 1) {
    for (const grp of MINIMAL_CONSONANT_GROUPS) {
      if (grp.includes(targetDisp) && grp.includes(candidateDisp)) return 3;
    }
    for (const grp of MINIMAL_VOWEL_GROUPS) {
      if (grp.includes(targetDisp) && grp.includes(candidateDisp)) return 3;
    }
  }

  // Syllable minimal pairs (same vowel+coda contrasting onset, or same onset+coda contrasting vowel)
  const a = decomposeSyllable(targetDisp[0]);
  const b = decomposeSyllable(candidateDisp[0]);
  if (a && b && targetDisp.length === candidateDisp.length) {
    if (a.jung === b.jung && a.jong === b.jong && a.cho !== b.cho) {
      for (const grp of MINIMAL_CONSONANT_GROUPS) {
        if (grp.includes(a.cho) && grp.includes(b.cho)) return 3;
      }
      return 1;
    }
    if (a.cho === b.cho && a.jong === b.jong && a.jung !== b.jung) {
      for (const grp of MINIMAL_VOWEL_GROUPS) {
        if (grp.includes(a.jung) && grp.includes(b.jung)) return 3;
      }
      return 1;
    }
    if (a.cho === b.cho && a.jung === b.jung && a.jong !== b.jong && a.jong && b.jong) {
      return 2;
    }
  }
  return 0;
}

const CONSONANT_KOREAN_NAMES: Record<string, string> = {
  'ㄱ': '기역',
  'ㄲ': '쌍기역',
  'ㄴ': '니은',
  'ㄷ': '디귿',
  'ㄸ': '쌍디귿',
  'ㄹ': '리을',
  'ㅁ': '미음',
  'ㅂ': '비읍',
  'ㅃ': '쌍비읍',
  'ㅅ': '시옷',
  'ㅆ': '쌍시옷',
  'ㅇ': '이응',
  'ㅈ': '지읒',
  'ㅉ': '쌍지읒',
  'ㅊ': '치읓',
  'ㅋ': '키읔',
  'ㅌ': '티읕',
  'ㅍ': '피읖',
  'ㅎ': '히읗',
};

function getScaffoldingHint(card: HangeulStrokeCard): string {
  const disp = getHangeulDisplayChar(card);
  const firstChar = disp[0] || card.char;

  if (CONSONANT_KOREAN_NAMES[firstChar]) {
    return CONSONANT_KOREAN_NAMES[firstChar];
  }

  const dec = decomposeSyllable(firstChar);
  if (dec && CONSONANT_KOREAN_NAMES[dec.cho]) {
    return CONSONANT_KOREAN_NAMES[dec.cho];
  }

  return card.name || firstChar;
}

export const HangeulBalloonGameSection: React.FC<HangeulBalloonGameSectionProps> = ({
  lang,
  uiLang = 'ko',
  selectedGroupId: propGroupId,
  onSelectGroupId,
  hideGroupBar = false,
}) => {
  const [internalGroupId, setInternalGroupId] = useState<string>(
    propGroupId || HANGEUL_GROUPS[0].id
  );
  const activeGroupId = propGroupId ?? internalGroupId;

  const currentGroup = useMemo(
    () => HANGEUL_GROUPS.find((g) => g.id === activeGroupId) || HANGEUL_GROUPS[0],
    [activeGroupId]
  );

  const [round, setRound] = useState(1);
  const [targetCard, setTargetCard] = useState<HangeulStrokeCard | null>(null);
  const [balloons, setBalloons] = useState<HangeulBalloonItem[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [wrongAttemptsInRound, setWrongAttemptsInRound] = useState(0);
  const [isWindEvent, setIsWindEvent] = useState(false);
  const [roundTargets, setRoundTargets] = useState<HangeulStrokeCard[]>([]);
  const [isRoundLocked, setIsRoundLocked] = useState(false);

  const [stageNotice, setStageNotice] = useState<{
    id: number;
    text: string;
    tone: 'speed' | 'fever' | 'king' | 'pair';
  } | null>(null);

  const [clearModal, setClearModal] = useState<{
    clearedGroupId: string;
    tier: ArcadeBadgeTier;
    mistakes: number;
    newlyUnlockedTrophyMilestone: number | null;
  } | null>(null);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);

  const arenaRef = useRef<HTMLDivElement | null>(null);
  const balloonElRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const physicsBodiesRef = useRef<BalloonPhysicsBody[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const totalWrongInRunRef = useRef<number>(0);

  const audioTimerRef = useRef<NodeJS.Timeout | null>(null);
  const nextRoundTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stageNoticeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wobbleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const windTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wrongAudioTimerRef = useRef<NodeJS.Timeout | null>(null);

  const uniquePool = useMemo(() => {
    const seen = new Set<string>();
    const list: HangeulStrokeCard[] = [];
    for (const c of currentGroup.cards) {
      const display = getHangeulDisplayChar(c);
      if (!seen.has(display)) {
        seen.add(display);
        list.push(c);
      }
    }
    return list;
  }, [currentGroup]);

  const fallbackPool = useMemo(() => {
    const seen = new Set<string>(uniquePool.map((c) => getHangeulDisplayChar(c)));
    const extras: HangeulStrokeCard[] = [];
    const primaryFallbackGroup =
      currentGroup.badge === '쌍자음' || currentGroup.badge === '자음'
        ? HANGEUL_GROUPS[0]
        : HANGEUL_GROUPS[2];
    const orderedGroups = [primaryFallbackGroup, ...HANGEUL_GROUPS];
    for (const grp of orderedGroups) {
      for (const c of grp.cards) {
        const display = getHangeulDisplayChar(c);
        if (!seen.has(display)) {
          seen.add(display);
          extras.push(c);
        }
      }
    }
    return extras;
  }, [uniquePool, currentGroup.badge]);

  const clearAllTimers = () => {
    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
    if (stageNoticeTimerRef.current) clearTimeout(stageNoticeTimerRef.current);
    if (wobbleTimerRef.current) clearTimeout(wobbleTimerRef.current);
    if (windTimerRef.current) clearTimeout(windTimerRef.current);
    if (wrongAudioTimerRef.current) clearTimeout(wrongAudioTimerRef.current);
  };

  const speakCardSound = (card: HangeulStrokeCard) => {
    const text = getHangeulCardAudioText(card, currentGroup.badge);
    speakKorean(text, 0.92);
  };

  const showStageAlert = (text: string, tone: 'speed' | 'fever' | 'king' | 'pair') => {
    if (stageNoticeTimerRef.current) clearTimeout(stageNoticeTimerRef.current);
    setStageNotice({ id: Date.now(), text, tone });
    stageNoticeTimerRef.current = setTimeout(() => {
      setStageNotice(null);
    }, 2400);
  };

  const getBalloonBoxDims = (arenaWidth: number, _stage: 1 | 2 | 3) => {
    const isSmallScreen = arenaWidth < 520;
    // 모든 라운드에서 1라운드 풍선 크기 그대로 유지
    return isSmallScreen ? { w: 100, h: 132 } : { w: 130, h: 170 };
  };

  // Free-roaming physics simulation across the entire arena with wall bounce & soft separation
  useEffect(() => {
    if (balloons.length === 0) return;

    const arenaEl = arenaRef.current;
    const arenaW = arenaEl?.clientWidth || 640;
    const arenaH = arenaEl?.clientHeight || 340;
    const { stage, baseSpeed } = getStageConfig(round);
    const { w: boxW, h: boxH } = getBalloonBoxDims(arenaW, stage);
    const speedScale = arenaW < 500 ? 0.78 : 1.0;

    const padX = 8;
    const padY = 8;
    const maxX = Math.max(padX + 10, arenaW - boxW - padX);
    const maxY = Math.max(padY + 10, arenaH - boxH - padY);

    // Preserve positions if only balloon state (popped/wobbling) changed within the same round
    const existingIds = physicsBodiesRef.current.map((b) => b.id).join(',');
    const currentIds = balloons.map((b) => b.id).join(',');

    if (existingIds !== currentIds) {
      const cols = balloons.length <= 4 ? 2 : 3;
      const rows = Math.ceil(balloons.length / cols);
      const cellW = (maxX - padX) / cols;
      const cellH = (maxY - padY) / rows;

      physicsBodiesRef.current = balloons.map((b, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const startX = Math.min(
          maxX,
          Math.max(padX, padX + col * cellW + Math.random() * Math.max(12, cellW * 0.6))
        );
        const startY = Math.min(
          maxY,
          Math.max(padY, padY + row * cellH + Math.random() * Math.max(12, cellH * 0.55))
        );

        // Distinct non-axis-aligned angles so each balloon travels diagonally across the stage
        const baseAngle = ((idx * 137.5 + Math.random() * 55) % 360) * (Math.PI / 180);
        const speedFactor = b.isKingBalloon ? 0.56 : 1.0;
        const spd = baseSpeed * speedScale * speedFactor * (0.88 + Math.random() * 0.28);

        return {
          id: b.id,
          x: startX,
          y: startY,
          vx: Math.cos(baseAngle) * spd,
          vy: Math.sin(baseAngle) * spd,
          bobPhase: Math.random() * Math.PI * 2,
          bobAmp: b.isKingBalloon ? 3 : stage === 1 ? 4 : stage === 2 ? 6 : 8,
          bobFreq: b.isKingBalloon ? 1.4 : stage === 1 ? 1.8 : stage === 2 ? 2.8 : 4.2,
          speedFactor,
          isPopped: b.isPopped,
        };
      });
    } else {
      // Sync popped flag without resetting positions
      physicsBodiesRef.current.forEach((body) => {
        const match = balloons.find((b) => b.id === body.id);
        if (match) body.isPopped = match.isPopped;
      });
    }

    let lastTime = performance.now();

    const step = (now: number) => {

      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const curArena = arenaRef.current;
      const curW = curArena?.clientWidth || arenaW;
      const curH = curArena?.clientHeight || arenaH;
      const dims = getBalloonBoxDims(curW, stage);
      const curMaxX = Math.max(padX + 6, curW - dims.w - padX);
      const curMaxY = Math.max(padY + 6, curH - dims.h - padY);

      const bodies = physicsBodiesRef.current;

      // 1. Move & bounce off arena borders
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (body.isPopped) {
          const el = balloonElRefs.current[body.id];
          if (el) {
            el.style.transform = `translate3d(${body.x.toFixed(1)}px, ${body.y.toFixed(1)}px, 0)`;
          }
          continue;
        }

        body.x += body.vx * dt;
        body.y += body.vy * dt;
        body.bobPhase += body.bobFreq * dt;

        if (body.x <= padX) {
          body.x = padX;
          body.vx = Math.abs(body.vx);
        } else if (body.x >= curMaxX) {
          body.x = curMaxX;
          body.vx = -Math.abs(body.vx);
        }

        if (body.y <= padY) {
          body.y = padY;
          body.vy = Math.abs(body.vy);
        } else if (body.y >= curMaxY) {
          body.y = curMaxY;
          body.vy = -Math.abs(body.vy);
        }
      }

      // 2. Soft pairwise separation so balloons never stack or obscure each other's letters
      const minDistX = dims.w * 0.92;
      const minDistY = dims.h * 0.82;
      for (let i = 0; i < bodies.length; i++) {
        if (bodies[i].isPopped) continue;
        for (let j = i + 1; j < bodies.length; j++) {
          if (bodies[j].isPopped) continue;
          const a = bodies[i];
          const b = bodies[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const normDx = dx / minDistX;
          const normDy = dy / minDistY;
          const normDistSq = normDx * normDx + normDy * normDy;

          if (normDistSq < 1 && normDistSq > 0.0001) {
            const normDist = Math.sqrt(normDistSq);
            const overlap = 1 - normDist;
            const nx = normDx / normDist;
            const ny = normDy / normDist;

            // Gentle positional separation
            const push = overlap * 0.5;
            a.x = Math.min(curMaxX, Math.max(padX, a.x - nx * minDistX * push));
            a.y = Math.min(curMaxY, Math.max(padY, a.y - ny * minDistY * push));
            b.x = Math.min(curMaxX, Math.max(padX, b.x + nx * minDistX * push));
            b.y = Math.min(curMaxY, Math.max(padY, b.y + ny * minDistY * push));

            // Elastic velocity impulse along normal if approaching each other
            const relVx = b.vx - a.vx;
            const relVy = b.vy - a.vy;
            const approach = relVx * nx + relVy * ny;
            if (approach < 0) {
              const impulse = -approach * 0.9;
              a.vx -= nx * impulse;
              a.vy -= ny * impulse;
              b.vx += nx * impulse;
              b.vy += ny * impulse;

              // Clamp speeds so balloons keep lively stage tempo after collisions (King balloons stay slower)
              [a, b].forEach((body) => {
                const minSpd = baseSpeed * speedScale * body.speedFactor * 0.8;
                const maxSpd = baseSpeed * speedScale * body.speedFactor * 1.35;
                const curSpd = Math.hypot(body.vx, body.vy) || 1;
                if (curSpd < minSpd) {
                  body.vx = (body.vx / curSpd) * minSpd;
                  body.vy = (body.vy / curSpd) * minSpd;
                } else if (curSpd > maxSpd) {
                  body.vx = (body.vx / curSpd) * maxSpd;
                  body.vy = (body.vy / curSpd) * maxSpd;
                }
              });
            }
          }
        }
      }

      // 3. Apply compositor transform directly (60fps smooth)
      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        if (body.isPopped) continue;
        const bobOffset = Math.sin(body.bobPhase) * body.bobAmp;
        const drawY = Math.min(curMaxY, Math.max(padY, body.y + bobOffset));
        const el = balloonElRefs.current[body.id];
        if (el) {
          el.style.transform = `translate3d(${body.x.toFixed(1)}px, ${drawY.toFixed(1)}px, 0)`;
        }
      }

      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [balloons, round]);

  const setupRound = (roundNum: number, targetsList: HangeulStrokeCard[]) => {
    if (uniquePool.length < 3 || targetsList.length === 0) return;

    const { balloonCount } = getStageConfig(roundNum);
    const neededDistractors = balloonCount - 1;

    const target = targetsList[(roundNum - 1) % targetsList.length];
    const targetDisplay = getHangeulDisplayChar(target);
    const targetKey = getPhoneticCollisionKey(target, currentGroup.badge);
    const isMinimalPairRound = roundNum >= 7;

    const usedKeys = new Set<string>([targetKey]);
    const usedChars = new Set<string>([targetDisplay]);
    const distractors: HangeulStrokeCard[] = [];

    // Rounds 7~9: Minimal Pair Focus Stage — intentionally surface ㄱ-ㄲ-ㅋ, ㄷ-ㄸ-ㅌ, ㅂ-ㅃ-ㅍ, ㅓ-ㅗ, ㅐ-ㅔ, ㅑ-ㅕ etc.
    if (isMinimalPairRound) {
      const combinedPool = [...uniquePool, ...fallbackPool];
      const rankedMinimal = combinedPool
        .map((c) => ({
          card: c,
          disp: getHangeulDisplayChar(c),
          prio: getMinimalPairPriority(targetDisplay, getHangeulDisplayChar(c)),
        }))
        .filter((entry) => entry.prio >= 2 && !usedChars.has(entry.disp))
        .sort((a, b) => b.prio - a.prio);

      for (const entry of rankedMinimal) {
        if (!usedChars.has(entry.disp)) {
          usedChars.add(entry.disp);
          usedKeys.add(getPhoneticCollisionKey(entry.card, currentGroup.badge));
          distractors.push(entry.card);
          if (distractors.length >= Math.min(3, neededDistractors)) break;
        }
      }
    }

    // Fill remaining distractors with non-colliding cards from the current group first
    const candidates = uniquePool.filter(
      (c) =>
        !usedChars.has(getHangeulDisplayChar(c)) &&
        !usedKeys.has(getPhoneticCollisionKey(c, currentGroup.badge))
    );

    for (const c of [...candidates].sort(() => 0.5 - Math.random())) {
      const k = getPhoneticCollisionKey(c, currentGroup.badge);
      const disp = getHangeulDisplayChar(c);
      if (!usedKeys.has(k) && !usedChars.has(disp)) {
        usedKeys.add(k);
        usedChars.add(disp);
        distractors.push(c);
        if (distractors.length === neededDistractors) break;
      }
    }

    // Fallback within group if unique phonetic keys < neededDistractors
    if (distractors.length < neededDistractors) {
      for (const c of [...uniquePool].sort(() => 0.5 - Math.random())) {
        const disp = getHangeulDisplayChar(c);
        if (!usedChars.has(disp)) {
          usedChars.add(disp);
          distractors.push(c);
          if (distractors.length === neededDistractors) break;
        }
      }
    }

    // Fallback across basic groups ONLY when a unit has < 6 unique cards
    if (distractors.length < neededDistractors) {
      for (const c of fallbackPool) {
        const disp = getHangeulDisplayChar(c);
        if (!usedChars.has(disp)) {
          usedChars.add(disp);
          distractors.push(c);
          if (distractors.length === neededDistractors) break;
        }
      }
    }

    const roundCards = [target, ...distractors.slice(0, neededDistractors)].sort(
      () => 0.5 - Math.random()
    );
    const colorOrder = [...BALLOON_COLORS].sort(() => 0.5 - Math.random());

    // King Balloon (느리게 뜨는 왕풍선, +2점) appears on stage finale rounds (3, 6, 9)
    const spawnKingBalloon =
      roundNum === 3 ||
      roundNum === 6 ||
      roundNum === TOTAL_ROUNDS;

    const balloonData: HangeulBalloonItem[] = roundCards.map((card, index) => {
      const displayChar = getHangeulDisplayChar(card);
      const isTarget = displayChar === targetDisplay;
      const isGoldenSpecial = roundNum === TOTAL_ROUNDS && isTarget;
      const isKingBalloon = spawnKingBalloon && isTarget;

      return {
        id: `${card.id}-${roundNum}-${index}-${Date.now()}`,
        card,
        displayChar,
        color: colorOrder[index % colorOrder.length],
        isGoldenSpecial,
        isKingBalloon,
        isPopped: false,
        popCombo: 1,
        popPoints: isKingBalloon ? 2 : 1,
        isWobbling: false,
      };
    });

    // Seed initial spread positions synchronously so frame 1 never flashes at (0, 0)
    const fallbackW = typeof window !== 'undefined' ? Math.min(820, Math.max(300, window.innerWidth - 48)) : 640;
    const arenaW = arenaRef.current?.clientWidth || fallbackW;
    const arenaH = arenaRef.current?.clientHeight || (arenaW < 520 ? 290 : 350);
    const { stage, baseSpeed } = getStageConfig(roundNum);
    const { w: boxW, h: boxH } = getBalloonBoxDims(arenaW, stage);
    const speedScale = arenaW < 500 ? 0.78 : 1.0;
    const padX = 8;
    const padY = 8;
    const maxX = Math.max(padX + 10, arenaW - boxW - padX);
    const maxY = Math.max(padY + 10, arenaH - boxH - padY);
    const cols = balloonData.length <= 4 ? 2 : 3;
    const rows = Math.ceil(balloonData.length / cols);
    const cellW = (maxX - padX) / cols;
    const cellH = (maxY - padY) / rows;

    physicsBodiesRef.current = balloonData.map((b, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const startX = Math.min(
        maxX,
        Math.max(padX, padX + col * cellW + Math.random() * Math.max(12, cellW * 0.55))
      );
      const startY = Math.min(
        maxY,
        Math.max(padY, padY + row * cellH + Math.random() * Math.max(12, cellH * 0.5))
      );
      const baseAngle = ((idx * 137.5 + 25 + Math.random() * 50) % 360) * (Math.PI / 180);
      const speedFactor = b.isKingBalloon ? 0.56 : 1.0;
      const spd = baseSpeed * speedScale * speedFactor * (0.9 + Math.random() * 0.25);

      return {
        id: b.id,
        x: startX,
        y: startY,
        vx: Math.cos(baseAngle) * spd,
        vy: Math.sin(baseAngle) * spd,
        bobPhase: Math.random() * Math.PI * 2,
        bobAmp: b.isKingBalloon ? 3 : stage === 1 ? 4 : stage === 2 ? 6 : 8,
        bobFreq: b.isKingBalloon ? 1.4 : stage === 1 ? 1.8 : stage === 2 ? 2.8 : 4.2,
        speedFactor,
        isPopped: false,
      };
    });

    setTargetCard(target);
    setBalloons(balloonData);
    setWrongAttemptsInRound(0);
    setIsWindEvent(false);
    setIsRoundLocked(false);

    if (roundNum === 4) {
      showStageAlert(gameUi.speedUp, 'speed');
    } else if (roundNum === 7) {
      showStageAlert('👂 헷갈림 주의! 비슷한 소리 집중 라운드!', 'pair');
    } else if (spawnKingBalloon) {
      showStageAlert('👑 느리게 뜨는 왕풍선 등장! (2점)', 'king');
    }

    if (audioTimerRef.current) clearTimeout(audioTimerRef.current);
    audioTimerRef.current = setTimeout(() => {
      speakCardSound(target);
    }, 260);
  };

  const initGame = () => {
    if (uniquePool.length < 3) return;
    clearAllTimers();

    // Build 9 randomized rounds; prioritize minimal-pair-rich targets in Rounds 7~9
    const targets: HangeulStrokeCard[] = [];
    const combinedCheckPool = [...uniquePool, ...fallbackPool];
    const minimalCapableTargets = uniquePool.filter((cand) => {
      const candDisp = getHangeulDisplayChar(cand);
      return combinedCheckPool.some(
        (other) => getMinimalPairPriority(candDisp, getHangeulDisplayChar(other)) >= 2
      );
    });

    while (targets.length < 6) {
      const batch = [...uniquePool].sort(() => 0.5 - Math.random());
      for (const item of batch) {
        if (targets.length >= 6) break;
        const last = targets[targets.length - 1];
        if (
          last &&
          getHangeulDisplayChar(last) === getHangeulDisplayChar(item) &&
          uniquePool.length > 1
        ) {
          continue;
        }
        targets.push(item);
      }
    }

    const latePool = minimalCapableTargets.length >= 2 ? minimalCapableTargets : uniquePool;
    while (targets.length < TOTAL_ROUNDS) {
      const batch = [...latePool].sort(() => 0.5 - Math.random());
      for (const item of batch) {
        if (targets.length >= TOTAL_ROUNDS) break;
        const last = targets[targets.length - 1];
        if (
          last &&
          getHangeulDisplayChar(last) === getHangeulDisplayChar(item) &&
          latePool.length > 1
        ) {
          continue;
        }
        targets.push(item);
      }
    }

    totalWrongInRunRef.current = 0;
    setRoundTargets(targets);
    setRound(1);
    setScore(0);
    setCombo(0);
    setWrongAttemptsInRound(0);
    setIsWindEvent(false);
    setStageNotice(null);
    setClearModal(null);
    setIsRoundLocked(false);
    setupRound(1, targets);
  };

  useEffect(() => {
    initGame();
    return () => {
      clearAllTimers();
    };
  }, [activeGroupId, uniquePool]);

  const handleBalloonTap = (balloon: HangeulBalloonItem) => {
    if (!targetCard || balloon.isPopped || isRoundLocked) return;

    const isCorrect =
      getHangeulDisplayChar(balloon.card) === getHangeulDisplayChar(targetCard);

    if (isCorrect) {
      const nextCombo = combo + 1;
      const earnedPts = balloon.isKingBalloon ? 2 : 1;
      setIsRoundLocked(true);
      playBalloonPopSound(nextCombo);
      speakCardSound(balloon.card);

      setBalloons((prev) =>
        prev.map((b) =>
          b.id === balloon.id
            ? {
                ...b,
                isPopped: true,
                popCombo: nextCombo,
                popPoints: earnedPts,
              }
            : b
        )
      );
      setScore((prev) => prev + earnedPts);
      setCombo(nextCombo);

      if (nextRoundTimerRef.current) clearTimeout(nextRoundTimerRef.current);
      nextRoundTimerRef.current = setTimeout(() => {
        if (round >= TOTAL_ROUNDS) {
          playApplauseFanfare();
          try {
            confetti({
              particleCount: 120,
              spread: 90,
              origin: { y: 0.5 },
              colors: ['#FDE68A', '#F59E0B', '#38BDF8', '#FB7185', '#34D399'],
            });
          } catch {
            // ignore
          }
          const runMistakes = totalWrongInRunRef.current;
          const badgeOutcome = recordBalloonBadgeClear(activeGroupId, runMistakes);
          setClearModal({
            clearedGroupId: activeGroupId,
            tier: badgeOutcome.tier,
            mistakes: runMistakes,
            newlyUnlockedTrophyMilestone: badgeOutcome.newlyUnlockedTrophyMilestone,
          });
        } else {
          const nextRound = round + 1;
          setRound(nextRound);
          setupRound(nextRound, roundTargets);
        }
      }, 1050);
    } else {
      playComicWrongSound();
      playWindGustSound();
      setCombo(0);
      totalWrongInRunRef.current += 1;
      setWrongAttemptsInRound((prev) => prev + 1);
      setIsWindEvent(true);
      if (windTimerRef.current) clearTimeout(windTimerRef.current);
      windTimerRef.current = setTimeout(() => {
        setIsWindEvent(false);
      }, 1000);

      // Gentle wind gust nudge on remaining balloons
      physicsBodiesRef.current.forEach((body) => {
        if (!body.isPopped) {
          body.vx += (Math.random() > 0.3 ? 1 : -1) * 55;
        }
      });

      setBalloons((prev) =>
        prev.map((b) => (b.id === balloon.id ? { ...b, isWobbling: true } : b))
      );

      if (wobbleTimerRef.current) clearTimeout(wobbleTimerRef.current);
      wobbleTimerRef.current = setTimeout(() => {
        setBalloons((prev) =>
          prev.map((b) => (b.id === balloon.id ? { ...b, isWobbling: false } : b))
        );
      }, 480);

      if (wrongAudioTimerRef.current) clearTimeout(wrongAudioTimerRef.current);
      wrongAudioTimerRef.current = setTimeout(() => {
        if (targetCard) speakCardSound(targetCard);
      }, 380);
    }
  };

  const handleReplayTargetSound = () => {
    if (targetCard) {
      playCutePop();
      speakCardSound(targetCard);
    }
  };

  const handlePlayboardClick = () => {
    if (targetCard) {
      speakCardSound(targetCard);
    }
  };

  const gameUi = (GAMES_UI[uiLang] || GAMES_UI.ko).balloon;
  const subUi = SUBTAB_UI[uiLang] || SUBTAB_UI.ko;
  const [guideVoiceLine1, guideVoiceLine2] = gameUi.guideVoice.split(' / ');
  const [guideSpeedLine1, guideSpeedLine2] = gameUi.guideSpeed.split(' / ');
  const stageConfig = getStageConfig(round);
  const scaffoldingHint =
    wrongAttemptsInRound >= 1 && targetCard
      ? getScaffoldingHint(targetCard)
      : null;

  const renderFloatingBalloon = (balloon: HangeulBalloonItem, idx: number) => {
    // 1~3단계 모두 1라운드 대형 풍선 크기 그대로 유지
    const sizeBoxClass = 'w-[100px] h-[130px] sm:w-[130px] sm:h-[168px]';
    const isWord = balloon.displayChar.length >= 2;

    const charTextSizeClass = isWord ? 'text-2xl sm:text-4xl' : 'text-4xl sm:text-5xl';

    const isGold = balloon.isGoldenSpecial || balloon.isKingBalloon;
    const gradLight = isGold ? '#FFFDF4' : balloon.color.gradLight;
    const gradMid = isGold ? '#FEF08A' : balloon.color.gradMid;
    const gradDeep = isGold ? '#F59E0B' : balloon.color.gradDeep;
    const knotHex = isGold ? '#F59E0B' : balloon.color.knotHex;
    const stringHex = isGold ? '#D97706' : balloon.color.stringHex;
    const textHex = isGold ? '#78350F' : balloon.color.textHex;
    const svgGradId = `balloon3d-${balloon.id}`;
    const svgShadowId = `balloonShadow-${balloon.id}`;

    const initialBody = physicsBodiesRef.current.find((b) => b.id === balloon.id);
    const comboScale = Math.min(1.85, 1 + Math.max(0, balloon.popCombo - 1) * 0.14);

    return (
      <div
        key={balloon.id}
        ref={(el) => {
          balloonElRefs.current[balloon.id] = el;
        }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: initialBody
            ? `translate3d(${initialBody.x.toFixed(1)}px, ${initialBody.y.toFixed(1)}px, 0)`
            : undefined,
          willChange: 'transform',
          touchAction: 'manipulation',
        }}
        className={balloon.isPopped ? 'z-30 pointer-events-none' : 'z-20'}
      >
        {balloon.isPopped ? (
          <div className={`relative ${sizeBoxClass} flex flex-col items-center justify-center`}>
            {/* Heartsping ("하츄핑 변신") radiant magenta/gold glow */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: [0.4, 1.45 * comboScale, 1.9 * comboScale], opacity: [0.9, 0.55, 0] }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300/70 via-rose-200/60 to-amber-200/70 blur-md"
            />
            <motion.div
              initial={{ scale: 0.6, opacity: 0.95 }}
              animate={{
                scale: [0.6, 1.4 * comboScale, 1.85 * comboScale],
                opacity: [0.95, 0.5, 0],
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-1 rounded-full border-4 border-pink-400"
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0.9 }}
              animate={{
                scale: [0.5, 1.2 * comboScale, 1.6 * comboScale],
                opacity: [0.9, 0.45, 0],
              }}
              transition={{ duration: 0.52, delay: 0.05, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-2 rounded-full border-2 border-amber-300"
            />

            {/* Heart & Ribbon & Starburst Transformation Particles */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {POP_PARTICLES.map((p, pIdx) => (
                <motion.span
                  key={pIdx}
                  initial={{ x: 0, y: 0, scale: 0.35, opacity: 1, rotate: 0 }}
                  animate={{
                    x: p.x * comboScale,
                    y: p.y * comboScale,
                    scale: [0.45, 1.35 * comboScale, 0.8],
                    opacity: [1, 1, 0],
                    rotate: pIdx % 2 === 0 ? 140 : -140,
                  }}
                  transition={{ duration: 0.62, ease: 'easeOut' }}
                  className={`absolute ${balloon.popCombo >= 3 ? 'text-base sm:text-xl' : 'text-sm sm:text-base'} font-black ${p.color}`}
                >
                  {p.icon}
                </motion.span>
              ))}
            </div>

            {/* Central Heartsping Transformation Heart Gem */}
            <motion.div
              initial={{ scale: 0, rotate: -18 }}
              animate={{ scale: [0, 1.25, 1.05], rotate: [0, 8, -4, 0] }}
              transition={{ duration: 0.44, delay: 0.04, ease: 'backOut' }}
              className="relative z-10 flex flex-col items-center justify-center select-none"
            >
              <svg
                viewBox="0 0 64 64"
                className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-[0_4px_10px_rgba(244,63,94,0.45)]"
              >
                <defs>
                  <linearGradient id={`heartGem-${balloon.id}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FBCFE8" />
                    <stop offset="45%" stopColor="#EC4899" />
                    <stop offset="100%" stopColor="#DB2777" />
                  </linearGradient>
                </defs>
                {/* Tiny golden princess crown sparkle on top */}
                <path
                  d="M23 14 L27 6 L32 12 L37 6 L41 14 Z"
                  fill="#FDE047"
                  stroke="#F59E0B"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* Faceted Heart */}
                <path
                  d="M32 54 C32 54 10 40 10 24.5 C10 17 16 12 22.5 12 C27 12 30.2 14.8 32 18.2 C33.8 14.8 37 12 41.5 12 C48 12 54 17 54 24.5 C54 40 32 54 32 54 Z"
                  fill={`url(#heartGem-${balloon.id})`}
                  stroke="#FFFFFF"
                  strokeWidth="2.6"
                />
                <path
                  d="M19 22 Q23 17 28 21"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                <circle cx="43" cy="22" r="2.2" fill="#FFFFFF" opacity="0.85" />
              </svg>
              <span className="mt-0.5 text-[11px] sm:text-xs font-black text-pink-600 drop-shadow-[0_1px_2px_rgba(255,255,255,0.95)] whitespace-nowrap">
                {balloon.popPoints >= 2 ? '💖 +2점!' : '💖 변신 성공!'}
              </span>
            </motion.div>
          </div>
        ) : (
          <motion.div
            animate={
              balloon.isWobbling
                ? {
                    x: [0, -10, 10, -8, 8, -4, 4, 0],
                    rotate: [0, -7, 7, -5, 5, 0],
                    scale: [1, 0.95, 1],
                  }
                : {
                    rotate: [-3, 3, -3],
                  }
            }
            transition={
              balloon.isWobbling
                ? { duration: 0.42, ease: 'easeInOut' }
                : {
                    duration: stageConfig.stage === 3 ? 0.9 : stageConfig.stage === 2 ? 1.4 : 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: (idx * 0.17) % 0.6,
                  }
            }
            className="flex flex-col items-center cursor-pointer select-none group"
            onClick={(e) => {
              e.stopPropagation();
              handleBalloonTap(balloon);
            }}
          >
            <div
              className={`relative ${sizeBoxClass} ${balloon.isKingBalloon ? 'scale-105 sm:scale-110' : ''} flex items-center justify-center active:scale-95 group-hover:scale-105 transition-transform overflow-visible`}
            >
              {/* Realistic 3D Heartsping Pastel Balloon Artwork (Zero border, Zero dots) */}
              <svg
                viewBox="0 0 120 156"
                className="pointer-events-none absolute inset-0 w-full h-full overflow-visible"
              >
                <defs>
                  <radialGradient id={svgGradId} cx="35%" cy="28%" r="68%" fx="30%" fy="24%">
                    <stop offset="0%" stopColor={gradLight} />
                    <stop offset="44%" stopColor={gradMid} />
                    <stop offset="100%" stopColor={gradDeep} />
                  </radialGradient>
                  <filter id={svgShadowId} x="-20%" y="-15%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="5" stdDeviation="4.5" floodColor={stringHex} floodOpacity="0.26" />
                  </filter>
                </defs>

                {/* String curling smoothly down from knot */}
                <path
                  d="M 60 125 Q 53 135, 60 144 T 58 155"
                  fill="none"
                  stroke={stringHex}
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  opacity="0.82"
                />

                {/* Rubber knot & lip */}
                <path
                  d="M 55 118 Q 60 121 65 118 L 68 125.5 Q 60 128 52 125.5 Z"
                  fill={knotHex}
                />

                {/* Realistic 3D teardrop latex balloon body */}
                <path
                  d="M 60 5 C 94 5, 112 28, 112 58 C 112 87, 86 111, 60 120 C 34 111, 8 87, 8 58 C 8 28, 26 5, 60 5 Z"
                  fill={`url(#${svgGradId})`}
                  filter={`url(#${svgShadowId})`}
                />

                {/* Soft lower-right ambient light bounce */}
                <ellipse
                  cx="82"
                  cy="92"
                  rx="16"
                  ry="8"
                  transform="rotate(-32 82 92)"
                  fill="#FFFFFF"
                  opacity="0.28"
                />

                {/* Glossy upper-left latex specular highlight */}
                <path
                  d="M 29 32 C 23 44, 22 57, 26 68"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  opacity="0.65"
                />
                <ellipse
                  cx="35"
                  cy="24"
                  rx="8.5"
                  ry="4.2"
                  transform="rotate(-32 35 24)"
                  fill="#FFFFFF"
                  opacity="0.92"
                />
                <circle cx="24" cy="43" r="2.4" fill="#FFFFFF" opacity="0.85" />
              </svg>

              {/* King Balloon / Golden Special 12th Round Sparkles */}
              {(balloon.isKingBalloon || balloon.isGoldenSpecial) && (
                <>
                  <Sparkles className="pointer-events-none absolute -top-2 -right-1 w-5 h-5 sm:w-6 sm:h-6 text-amber-500 animate-pulse drop-shadow-sm" />
                  <span className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-black text-amber-950 bg-yellow-200 border border-amber-400 px-1.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                    <Crown className="w-2.5 h-2.5 text-amber-700" />
                    {balloon.isKingBalloon ? '왕풍선 2점' : 'SPECIAL'}
                  </span>
                </>
              )}

              <span
                style={{
                  fontFamily:
                    "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif",
                  color: textHex,
                  WebkitTextStroke: '2.4px rgba(255, 255, 255, 0.96)',
                  paintOrder: 'stroke fill',
                }}
                className={`relative z-10 pb-[24%] ${charTextSizeClass} font-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.75)] text-center leading-none select-none`}
              >
                {balloon.displayChar}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full space-y-1 sm:space-y-1.5 max-w-4xl mx-auto font-korean-gothic overflow-x-clip">
      {!hideGroupBar && (
        <div className="sticky top-[80px] sm:top-[90px] z-[22] bg-[#F4F3F8]/95 lg:bg-[#FFF5F8]/95 backdrop-blur-md pb-1 w-full">
          <div className="relative w-full max-w-md mx-auto">
            <select
              value={activeGroupId}
              onChange={(e) => {
                playCutePop();
                setInternalGroupId(e.target.value);
                onSelectGroupId?.(e.target.value);
              }}
              className="w-full h-8 sm:h-8.5 pl-3 pr-8 rounded-none bg-white hover:bg-amber-50/80 border border-amber-300 text-amber-950 font-black text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-400 font-korean-gothic shadow-none truncate"
              title={subUi.studyControls.unitSelectTitle}
            >
              {HANGEUL_GROUPS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.titleKo} ({g.titleEn})
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      )}

      <motion.div
        animate={
          isWindEvent
            ? {
                x: [0, -2, 2, -1, 0],
                y: 0,
              }
            : { x: 0, y: 0 }
        }
        transition={isWindEvent ? { duration: 0.28, ease: 'easeInOut' } : { duration: 0.15 }}
        onClick={handlePlayboardClick}
        className="relative bg-[#FFFDF5] border-2 border-amber-300 rounded-lg p-2 sm:p-4 shadow-md shadow-amber-200/40 flex flex-col font-korean-gothic h-[400px] sm:h-[500px] justify-between gap-0.5 sm:gap-1 overflow-hidden cursor-pointer"
      >

        {/* TOP SYMMETRIC CORNER INSTRUCTIONS + TOP-CENTER BADGE ALBUM BUTTON + RELOCATED LISTEN ICON */}
        <div className="relative z-20 w-full flex flex-col gap-0.5 sm:gap-1 shrink-0">
          <div className="w-full grid grid-cols-[1fr_auto_1fr] items-start gap-1.5 sm:gap-4 px-1 pt-0 sm:pt-0.5">
            {/* Left Top: Slightly tilted down-left instruction + compact replay icon button */}
            <div className="flex flex-col items-start gap-1">
              <p className="font-badasseugi text-xs sm:text-sm font-bold text-amber-950 leading-snug text-left break-keep -rotate-3 origin-center select-none">
                {guideVoiceLine1}
                {guideVoiceLine2 && (
                  <>
                    <br />
                    {guideVoiceLine2}
                  </>
                )}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReplayTargetSound();
                }}
                className="bg-[#FEF08A] hover:bg-[#FDE047] border border-[#EAB308] text-amber-950 px-2 py-0.5 text-[11px] sm:text-xs font-bold rounded-md inline-flex items-center gap-1 cursor-pointer transition-colors select-none shadow-2xs"
                title={gameUi.listenBtn}
                aria-label={gameUi.listenBtn}
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-900 shrink-0" />
                <span>{gameUi.listenBtn}</span>
              </button>
            </div>

            {/* Top Center: Identical Gold Medal Badge Album Button */}
            <GameBadgeAlbumButton
              onClick={() => setIsBadgeModalOpen(true)}
              title="내 앨범"
            />

            {/* Right Top: Tilted instruction + Round counter */}
            <div className="flex flex-col items-end gap-0.5 pt-0.5 sm:pt-1">
              <p className="font-badasseugi text-xs sm:text-sm font-bold text-amber-900 leading-snug text-right break-keep rotate-3 origin-center select-none">
                {guideSpeedLine1}
                {guideSpeedLine2 && (
                  <>
                    <br />
                    {guideSpeedLine2}
                  </>
                )}
              </p>
              <span className="text-[11px] font-black text-amber-700 tabular-nums select-none">
                {round} / {TOTAL_ROUNDS}
              </span>
            </div>
          </div>

          {/* Stage Transition Alert + Minimal Pair Badge + Combo Display (Text Only: No Background, No Border) */}
          <div className="min-h-[16px] sm:min-h-[20px] flex flex-wrap items-center justify-center gap-2.5">
            <AnimatePresence mode="wait">
              {stageNotice && (
                <motion.span
                  key={stageNotice.id}
                  initial={{ scale: 0.78, opacity: 0, y: -6 }}
                  animate={{ scale: [0.85, 1.08, 1], opacity: 1, y: 0 }}
                  exit={{ scale: 0.88, opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={`font-black text-xs sm:text-sm select-none ${
                    stageNotice.tone === 'fever'
                      ? 'text-rose-600'
                      : stageNotice.tone === 'pair'
                      ? 'text-indigo-700'
                      : 'text-amber-700'
                  }`}
                >
                  {stageNotice.text}
                </motion.span>
              )}
            </AnimatePresence>

            {round >= 7 && !stageNotice && (
              <span className="font-black text-[11px] sm:text-xs text-indigo-700 select-none">
                👂 헷갈림 주의 라운드
              </span>
            )}

            <AnimatePresence>
              {combo >= 2 && (
                <motion.span
                  key={`combo-${combo}`}
                  initial={{ scale: 0.72, opacity: 0 }}
                  animate={{ scale: [0.85, 1.12, 1], opacity: 1 }}
                  exit={{ scale: 0.82, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="font-black text-xs sm:text-sm text-rose-600 tabular-nums select-none"
                >
                  🔥 {combo} COMBO!
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* 오답 1회 이상 시 등장하는 비계(Scaffolding) 힌트: 바탕/테두리 없이 자음 이름만 글자로 표시 */}
          <AnimatePresence>
            {scaffoldingHint && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                onClick={(e) => e.stopPropagation()}
                className="mx-auto text-center text-xs sm:text-sm font-black text-amber-700 select-none"
              >
                💡 힌트: {scaffoldingHint}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* FREE-ROAMING SKY ARENA (Full-box bouncing motion across remaining vertical & horizontal space) */}
        <div
          ref={arenaRef}
          className="relative z-10 w-full flex-1 min-h-0 my-0.5 sm:my-1 overflow-hidden select-none"
        >
          {balloons.map((b, idx) => renderFloatingBalloon(b, idx))}
        </div>
      </motion.div>

      {/* 9-ROUND CLEAR CELEBRATION MODAL */}
      <AnimatePresence>
        {clearModal && (
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
              className="w-full max-w-sm bg-[#FFFDF5] border-3 border-amber-400 rounded-xl shadow-2xl p-6 text-center space-y-4"
            >
              <div className="w-18 h-18 mx-auto rounded-full bg-amber-50 border-3 border-amber-400 flex items-center justify-center shadow-xs p-2">
                <BalloonBadgeGraphic tier={clearModal.tier} className="w-13 h-13" />
              </div>

              <div className="space-y-1">
                <p className="text-xl sm:text-2xl font-black text-amber-950">
                  {gameUi.clearTitle}
                </p>
                <p className="text-xs sm:text-sm font-bold text-amber-800">
                  {currentGroup.titleKo} · {clearModal.tier === 'gold' ? '👑 금색 풍선' : clearModal.tier === 'silver' ? '🥈 은색 풍선' : '🌿 민트 풍선'} 뱃지 획득! (실수 {clearModal.mistakes}회)
                </p>
                {clearModal.newlyUnlockedTrophyMilestone && (() => {
                  const hallUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).hallOfFame;
                  return (
                    <p className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md">
                      {hallUi.trophyUnlockedPrefix} ({clearModal.newlyUnlockedTrophyMilestone} {hallUi.badgeLabel})
                    </p>
                  );
                })()}
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    const curIdx = HANGEUL_GROUPS.findIndex(
                      (g) => g.id === clearModal.clearedGroupId
                    );
                    const nextGroup = HANGEUL_GROUPS[(curIdx + 1) % HANGEUL_GROUPS.length];
                    setClearModal(null);
                    setInternalGroupId(nextGroup.id);
                    onSelectGroupId?.(nextGroup.id);
                  }}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-black text-base rounded-none border-2 border-amber-500 shadow-md cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>{gameUi.nextStageBtn}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setClearModal(null);
                    initGame();
                  }}
                  className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-900 font-black text-sm rounded-none border border-amber-300 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{gameUi.replayBtn}</span>
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
        initialGame="balloon"
        uiLang={uiLang}
      />
    </div>
  );
};
