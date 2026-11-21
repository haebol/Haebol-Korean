import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  DynamicBackdrop,
  GROUND_Y,
  JollamanCharacterSvg,
  JollamanFaceMode,
  LEFT_EDGE_X,
  RIGHT_EDGE_X,
  SimPhase,
  StickmanControlBar,
  StickmanLang,
  StickmanSimProps,
  useStickmanAudio,
} from './stickmanShared';

export type DoubleConsonantKey = 'ㄲ' | 'ㄸ' | 'ㅃ' | 'ㅆ' | 'ㅉ';

export interface DoubleConsonantItem {
  char: DoubleConsonantKey;
  sound: string;
  soundCue: string;
  triggerWord: string;
  color: string;
  sky: [number, number];
  dur: number;
  impactAt: number;
  secondaryAt?: number;
}

const EP3_ACTION_SPOT_X = 300;

export const JOLLAMAN3_ITEMS: DoubleConsonantItem[] = [
  { char: 'ㄲ', sound: '쌍기역', soundCue: '끄', triggerWord: '까마귀', color: '#DC2626', sky: [130, 56], dur: 1.9, impactAt: 0.34 },
  { char: 'ㄸ', sound: '쌍디귿', soundCue: '뜨', triggerWord: '똥', color: '#92400E', sky: [315, 56], dur: 2.4, impactAt: 0.48, secondaryAt: 0.68 },
  { char: 'ㅃ', sound: '쌍비읍', soundCue: '쁘', triggerWord: '뽀뽀', color: '#EC4899', sky: [500, 56], dur: 2.75, impactAt: 0.32, secondaryAt: 0.72 },
  { char: 'ㅆ', sound: '쌍시옷', soundCue: '쓰', triggerWord: '쓰레기차', color: '#16A34A', sky: [685, 56], dur: 2.7, impactAt: 0.36 },
  { char: 'ㅉ', sound: '쌍지읒', soundCue: '쯔', triggerWord: '짝꿍', color: '#0D9488', sky: [870, 56], dur: 3.15, impactAt: 0.72, secondaryAt: 0.14 },
];

const EP3_REVEAL_I18N: Record<
  DoubleConsonantKey,
  {
    phonetic: string;
    wordRom: string;
    rule: string;
    meanings: Record<StickmanLang, string>;
  }
> = {
  ㄲ: {
    phonetic: '[kk]',
    wordRom: 'kkamagwi',
    rule: '경음(된소리) ㄱ+ㄱ · 성대를 긴장시켜 힘 있게 발음',
    meanings: { en: 'crow', vi: 'con quạ', zh: '乌鸦', ja: 'カラス', ru: 'ворона', mn: 'хэрээ', bn: 'কাক' },
  },
  ㄸ: {
    phonetic: '[tt]',
    wordRom: 'ttong',
    rule: '경음(된소리) ㄷ+ㄷ · 공기를 막았다가 강하게 터뜨려 발음',
    meanings: { en: 'poop', vi: 'phân', zh: '便便', ja: 'うんち', ru: 'какашка', mn: 'баас', bn: 'পটি' },
  },
  ㅃ: {
    phonetic: '[pp]',
    wordRom: 'ppoppo',
    rule: '경음(된소리) ㅂ+ㅂ · 두 입술을 힘 있게 다물었다 떼며 발음',
    meanings: { en: 'kiss', vi: 'hôn má', zh: '亲亲', ja: 'チュー', ru: 'поцелуй', mn: 'үнсэлт', bn: 'চুমু' },
  },
  ㅆ: {
    phonetic: '[ss]',
    wordRom: 'sseuregicha',
    rule: '경음(된소리) ㅅ+ㅅ · 좁은 틈으로 날카롭고 강하게 마찰 발음',
    meanings: { en: 'garbage truck', vi: 'xe rác', zh: '垃圾车', ja: 'ゴミ収集車', ru: 'мусоровоз', mn: 'хогны машин', bn: 'ময়লার গাড়ি' },
  },
  ㅉ: {
    phonetic: '[jj]',
    wordRom: 'jjakkkung',
    rule: '경음(된소리) ㅈ+ㅈ · 경구개에서 강하게 막았다가 발음',
    meanings: { en: 'best buddy / partner', vi: 'bạn cùng bàn', zh: '同桌伙伴', ja: '相棒', ru: 'напарник', mn: 'хамтрагч', bn: 'সহপাঠী বন্ধু' },
  },
};

// ============================================================================
// EPISODE 3 CUSTOM SVG PROPS (ㄲ Crows, ㄸ Puppy & Poop, ㅃ Girl, ㅆ Truck, ㅉ Buddy)
// ============================================================================

const CrowBirdSvg: React.FC<{ walkTime: number; scale?: number; pecking?: boolean }> = ({
  walkTime,
  scale = 1,
  pecking = false,
}) => {
  const flap = Math.sin(walkTime * 22) * 18;
  const peckRot = pecking ? Math.sin(walkTime * 30) * 20 : 0;
  return (
    <g transform={`scale(${scale}) rotate(${peckRot})`}>
      {/* Left wing flapping */}
      <path d={`M0 -4 Q-20 ${-28 + flap} -38 ${-8 + flap * 0.7} Q-18 0 0 -4 Z`} fill="#1E293B" stroke="#0F172A" strokeWidth="2.4" />
      {/* Tail feathers */}
      <polygon points="14,0 34,-8 30,8" fill="#0F172A" />
      {/* Body */}
      <ellipse cx="0" cy="2" rx="18" ry="12" fill="#0F172A" stroke="#020617" strokeWidth="2.4" />
      {/* Head */}
      <circle cx="-16" cy="-8" r="10.5" fill="#0F172A" stroke="#020617" strokeWidth="2.2" />
      {/* Angry sharp eye */}
      <circle cx="-19" cy="-10" r="3" fill="#FEF08A" />
      <circle cx="-20" cy="-10" r="1.4" fill="#DC2626" />
      <path d="M-24 -15 L-13 -12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      {/* Sharp beak pointing left */}
      <polygon points="-25,-9 -41,-5 -25,-1" fill="#F59E0B" stroke="#78350F" strokeWidth="1.8" />
    </g>
  );
};

const CutePuppySvg: React.FC<{ walkTime: number; squatting?: boolean }> = ({ walkTime, squatting = false }) => {
  const legBounce = squatting ? 0 : Math.sin(walkTime * 16) * 6;
  const tailWag = Math.sin(walkTime * 20) * 14;
  return (
    <g transform={squatting ? 'translate(0, 6) rotate(10)' : undefined}>
      {/* Wagging tail */}
      <path d={`M20 -4 Q32 ${-22 + tailWag * 0.4} 28 -26`} fill="none" stroke="#B45309" strokeWidth="5.5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="-12" y1="10" x2={-14 + legBounce} y2="26" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
      <line x1="-4" y1="10" x2={-2 - legBounce} y2="26" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
      <line x1="12" y1="10" x2={14 - legBounce} y2="26" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
      <line x1="18" y1="10" x2={20 + legBounce} y2="26" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
      {/* Body */}
      <ellipse cx="2" cy="2" rx="22" ry="13" fill="#FBBF24" stroke="#78350F" strokeWidth="2.6" />
      {/* Collar */}
      <rect x="-15" y="-6" width="6" height="12" rx="2" fill="#EF4444" />
      {/* Head */}
      <circle cx="-18" cy="-8" r="14" fill="#FCD34D" stroke="#78350F" strokeWidth="2.6" />
      {/* Floppy ear */}
      <ellipse cx="-11" cy="-8" rx="5.5" ry="10" transform="rotate(-14, -11, -8)" fill="#B45309" stroke="#78350F" strokeWidth="2" />
      {/* Snout & nose */}
      <ellipse cx="-28" cy="-5" rx="7" ry="5.5" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.8" />
      <circle cx="-33" cy="-7" r="2.8" fill="#0F172A" />
      {/* Cute eyes */}
      <circle cx="-23" cy="-12" r="2.2" fill="#0F172A" />
    </g>
  );
};

const SteamingPoopSvg: React.FC<{ walkTime: number; squashed?: boolean }> = ({ walkTime, squashed = false }) => {
  if (squashed) {
    return (
      <g>
        <ellipse cx="0" cy="6" rx="28" ry="6" fill="#78350F" stroke="#451A03" strokeWidth="2.2" />
        <ellipse cx="-14" cy="4" rx="8" ry="3.5" fill="#92400E" />
        <ellipse cx="16" cy="5" rx="7" ry="3" fill="#92400E" />
      </g>
    );
  }
  const steam = Math.sin(walkTime * 6) * 3;
  return (
    <g>
      <path d={`M-8 -22 Q${-12 + steam} -32 -7 -40`} fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      <path d={`M6 -24 Q${10 - steam} -34 5 -42`} fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="0" cy="2" rx="18" ry="7" fill="#78350F" stroke="#451A03" strokeWidth="2.2" />
      <ellipse cx="0" cy="-5" rx="13" ry="6" fill="#92400E" stroke="#451A03" strokeWidth="2.2" />
      <path d="M-7 -10 Q0 -23 7 -10 Z" fill="#B45309" stroke="#451A03" strokeWidth="2" />
    </g>
  );
};

const GirlRibbonSkirtSvg: React.FC<{
  walkTime: number;
  isWalking: boolean;
  mood: 'angry' | 'kiss' | 'happy';
}> = ({ walkTime, isWalking, mood }) => {
  const legSwing = isWalking ? Math.sin(walkTime * 11) * 14 : 0;
  const armSwing = isWalking ? Math.sin(walkTime * 11 + Math.PI) * 13 : 0;
  return (
    <g>
      {/* Legs */}
      <line x1="-3" y1="16" x2={-5 + legSwing} y2="46" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
      <ellipse cx={-5 + legSwing - 3} cy="48" rx="7.5" ry="4.2" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
      <line x1="3" y1="16" x2={5 - legSwing} y2="46" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
      <ellipse cx={5 - legSwing - 3} cy="48" rx="7.5" ry="4.2" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
      {/* Pink Skirt Dress */}
      <polygon points="0,-18 -19,20 19,20" fill="#F472B6" stroke="#BE185D" strokeWidth="2.6" strokeLinejoin="round" />
      {/* Arms */}
      <line x1="-4" y1="-10" x2={-22 - armSwing * 0.5} y2={mood === 'angry' ? -22 : 10} stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
      <line x1="4" y1="-10" x2={18 + armSwing * 0.5} y2="10" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
      {/* Ponytail */}
      <path d="M12 -40 Q26 -42 24 -22 Q18 -26 14 -34 Z" fill="#0F172A" />
      {/* Ribbon */}
      <polygon points="10,-46 2,-52 2,-40" fill="#EC4899" stroke="#9D174D" strokeWidth="1.5" />
      <polygon points="10,-46 18,-52 18,-40" fill="#EC4899" stroke="#9D174D" strokeWidth="1.5" />
      <circle cx="10" cy="-46" r="3" fill="#FDE047" />
      {/* Head */}
      <circle cx="0" cy="-35" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
      {mood === 'angry' ? (
        <>
          <path d="M-8 -42 L-2 -39 M8 -42 L2 -39" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="-5" cy="-36" r="2.2" fill="#0F172A" />
          <circle cx="5" cy="-36" r="2.2" fill="#0F172A" />
          <path d="M-5 -27 Q0 -31 5 -27" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : mood === 'kiss' ? (
        <>
          <path d="M-8 -38 Q-5 -41 -2 -38" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 -38 Q5 -41 8 -38" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="6" cy="-28" r="3" fill="#EC4899" />
        </>
      ) : (
        <>
          <circle cx="-5" cy="-36" r="2.2" fill="#0F172A" />
          <circle cx="5" cy="-36" r="2.2" fill="#0F172A" />
          <path d="M-4 -29 Q0 -25 4 -29" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </g>
  );
};

const GarbageTruckSvg: React.FC<{
  walkTime: number;
  scooping?: boolean;
  hasVictim?: boolean;
  victimMood?: 'dizzy' | 'crying';
  facingRight?: boolean;
  wheelsMoving?: boolean;
}> = ({
  walkTime,
  scooping = false,
  hasVictim = false,
  victimMood = 'crying',
  facingRight = false,
  wheelsMoving = true,
}) => {
  const wheelSpin = wheelsMoving ? (walkTime * 360) % 360 : 0;
  const armAngle = scooping ? -45 : 0;
  return (
    <g transform={facingRight ? 'scale(-1, 1)' : undefined}>
      {/* Exhaust puffs behind truck */}
      <circle cx="152" cy="18" r="8" fill="#CBD5E1" opacity="0.7" />
      <circle cx="170" cy="10" r="11" fill="#E2E8F0" opacity="0.55" />
      {/* Mechanical scoop loader arm on front */}
      <g transform={`translate(-84, 10) rotate(${armAngle})`}>
        <path d="M0 0 L-36 -8 L-48 16" fill="none" stroke="#EAB308" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="-56" y="10" width="22" height="14" rx="3" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
      </g>
      {/* Cab */}
      <path d="M-84 26 L-84 -18 Q-84 -32 -66 -32 L-30 -32 L-30 26 Z" fill="#FACC15" stroke="#0F172A" strokeWidth="3.5" />
      <polygon points="-76,-22 -42,-22 -42,-2 -76,-2" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2.5" />
      {/* Green Trash Compactor Body */}
      <rect x="-28" y="-44" width="166" height="72" rx="8" fill="#16A34A" stroke="#14532D" strokeWidth="3.5" />
      <rect x="-18" y="-34" width="146" height="50" rx="5" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <g transform={facingRight ? 'translate(55, 0) scale(-1, 1) translate(-55, 0)' : undefined}>
        <text x="55" y="-2" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF">
          ♻️ 청소
        </text>
      </g>
      {/* Headlight */}
      <rect x="-89" y="8" width="6" height="10" rx="2" fill="#FEF08A" />
      {/* Victim head peeking out of top hopper */}
      {hasVictim && (
        <g transform="translate(55, -54)">
          {/* Raised tiny pleading hands */}
          <line x1="-14" y1="6" x2="-22" y2="-6" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" />
          <line x1="14" y1="6" x2="22" y2="-6" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="0" cy="0" r="12.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          {victimMood === 'crying' ? (
            <>
              <path d="M-6 -4 L-2 -1.5 L-6 1" fill="none" stroke="#0F172A" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 -4 L2 -1.5 L6 1" fill="none" stroke="#0F172A" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M-5 1 Q-7 7 -6 12" fill="none" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M5 1 Q7 7 6 12" fill="none" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" />
              <ellipse cx="0" cy="6" rx="3.4" ry="3.8" fill="#EF4444" stroke="#0F172A" strokeWidth="1.2" />
            </>
          ) : (
            <>
              <path d="M-4 -4 L-1 -1 M-1 -4 L-4 -1" stroke="#0F172A" strokeWidth="1.8" />
              <path d="M2 -4 L5 -1 M5 -4 L2 -1" stroke="#0F172A" strokeWidth="1.8" />
            </>
          )}
        </g>
      )}
      {/* Chassis */}
      <rect x="-86" y="24" width="226" height="10" rx="3" fill="#334155" />
      {/* Wheels */}
      {[-54, 42, 108].map((wx) => (
        <g key={wx} transform={`translate(${wx}, 34) rotate(${wheelSpin})`}>
          <circle cx="0" cy="0" r="18" fill="#0F172A" stroke="#475569" strokeWidth="3" />
          <circle cx="0" cy="0" r="7" fill="#CBD5E1" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#94A3B8" strokeWidth="2" />
        </g>
      ))}
    </g>
  );
};

// ============================================================================
// MAIN EPISODE 3 COMPONENT (3. 졸라쌍자음맨 ㄲ ~ ㅉ)
// ============================================================================

export const StickmanSsangJaeumSim: React.FC<StickmanSimProps> = ({
  defaultAudioEnabled = true,
  lang = 'en',
  className = '',
  hideControlBar = false,
  autoStartAllPlay = false,
}) => {
  const uid = useId();
  const [phase, setPhase] = useState<SimPhase>('walking');
  const [selectedItem, setSelectedItem] = useState<DoubleConsonantItem>(JOLLAMAN3_ITEMS[0]);
  const [learnedChars, setLearnedChars] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isAllPlayMode, setIsAllPlayMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(defaultAudioEnabled);
  const [, setFrameTick] = useState(0);

  const animRef = useRef({
    walkX: 140,
    walkDir: 1 as 1 | -1,
    walkTime: 0,
    worldScrollX: 0,
    phaseElapsed: 0,
    approachStartX: 140,
    objectAppear: 0,
    actionT: 0,
    aftermathT: 0,
    step1Triggered: false,
    step2Triggered: false,
    lastTime: performance.now(),
  });

  const phaseRef = useRef<SimPhase>(phase);
  phaseRef.current = phase;
  const selectedRef = useRef<DoubleConsonantItem>(selectedItem);
  selectedRef.current = selectedItem;
  const audioRef = useRef<boolean>(audioEnabled);
  audioRef.current = audioEnabled;
  const pausedRef = useRef<boolean>(isPaused);
  pausedRef.current = isPaused;
  const allPlayRef = useRef<boolean>(isAllPlayMode);
  allPlayRef.current = isAllPlayMode;

  const {
    stopAllAudio,
    clearAllTimers,
    getAudioCtx,
    playTone,
    playCutePop,
    playCartoonImpact,
    playCartoonSplat,
    playSuccessChime,
    speakKorean,
  } = useStickmanAudio();

  const playDoubleConsonantSfx = useCallback(
    (char: DoubleConsonantKey, stage: 'start' | 'impact' | 'secondary') => {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;

        if (char === 'ㄲ') {
          if (stage === 'impact') {
            playCartoonImpact();
            playTone('sawtooth', 780, 420, 0.16, 0.16, 0.04);
            playTone('sawtooth', 780, 420, 0.16, 0.16, 0.28);
            playTone('sawtooth', 780, 420, 0.18, 0.16, 0.52);
          }
        } else if (char === 'ㄸ') {
          if (stage === 'impact') {
            // Puppy 멍멍
            playTone('triangle', 420, 620, 0.12, 0.18, 0);
            playTone('triangle', 450, 650, 0.14, 0.18, 0.17);
          } else if (stage === 'secondary') {
            // Poop squish + splat
            playTone('sawtooth', 260, 68, 0.28, 0.22, 0);
            playCartoonSplat();
          }
        } else if (char === 'ㅃ') {
          if (stage === 'impact') {
            // Slap (따귀)
            playTone('square', 1100, 140, 0.14, 0.24, 0);
          } else if (stage === 'secondary') {
            // Cheek kiss + sad trombone
            playTone('sine', 420, 960, 0.16, 0.2, 0);
            playTone('triangle', 260, 145, 0.55, 0.18, 0.22);
          }
        } else if (char === 'ㅆ') {
          if (stage === 'start') {
            // Reverse beeps x2
            playTone('square', 1180, 1180, 0.12, 0.15, 0);
            playTone('square', 1180, 1180, 0.12, 0.15, 0.22);
          } else if (stage === 'impact') {
            // Truck acceleration
            playTone('sawtooth', 120, 290, 0.72, 0.18, 0);
          }
        } else if (char === 'ㅉ') {
          if (stage === 'start') {
            // Truck braking to drop off crying Jollaman
            playTone('sawtooth', 220, 110, 0.24, 0.14, 0);
          } else if (stage === 'secondary') {
            // Gentle drop-off thud onto road
            playTone('triangle', 260, 120, 0.18, 0.16, 0);
          } else if (stage === 'impact') {
            // Warm chord chime when buddy hugs crying Jollaman
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
              playTone('sine', freq, freq, 0.42, 0.14, idx * 0.06);
            });
          }
        }
      } catch {
        // Silent fallback
      }
    },
    [getAudioCtx, playCartoonImpact, playCartoonSplat, playTone]
  );

  const toggleJollaPause = useCallback(() => {
    setIsPaused((prev) => {
      const next = !prev;
      pausedRef.current = next;
      if (next) {
        stopAllAudio();
      }
      if (audioRef.current) playCutePop();
      return next;
    });
  }, [playCutePop, stopAllAudio]);

  const resetToWalking = useCallback(() => {
    clearAllTimers();
    stopAllAudio();
    allPlayRef.current = false;
    setIsAllPlayMode(false);
    pausedRef.current = false;
    setIsPaused(false);
    const anim = animRef.current;
    if (anim.walkX < LEFT_EDGE_X || anim.walkX > RIGHT_EDGE_X) {
      anim.walkX = EP3_ACTION_SPOT_X;
      anim.walkDir = 1;
    }
    anim.objectAppear = 0;
    anim.actionT = 0;
    anim.aftermathT = 0;
    anim.phaseElapsed = 0;
    phaseRef.current = 'walking';
    setPhase('walking');
  }, [clearAllTimers, stopAllAudio]);

  const startItemPlayback = useCallback(
    (item: DoubleConsonantItem) => {
      const prevChar = selectedRef.current?.char;
      clearAllTimers();
      stopAllAudio();
      pausedRef.current = false;
      setIsPaused(false);
      setSelectedItem(item);
      selectedRef.current = item;

      const anim = animRef.current;
      if (item.char === 'ㅆ' || item.char === 'ㅉ') {
        // Keep exact continuous scene position from ㅃ -> ㅆ -> ㅉ without walking away
        anim.walkX = EP3_ACTION_SPOT_X;
      } else if (prevChar === 'ㄸ' && (phaseRef.current === 'reveal' || phaseRef.current === 'aftermath')) {
        anim.walkX = 425;
      } else if (phaseRef.current === 'reveal' || phaseRef.current === 'aftermath') {
        anim.walkX = Math.min(RIGHT_EDGE_X, Math.max(LEFT_EDGE_X, anim.walkX));
      }
      anim.approachStartX = anim.walkX;
      anim.objectAppear = 0;
      anim.actionT = 0;
      anim.aftermathT = 0;
      anim.step1Triggered = false;
      anim.step2Triggered = false;
      anim.phaseElapsed = 0;

      phaseRef.current = 'approaching';
      setPhase('approaching');
    },
    [clearAllTimers, stopAllAudio]
  );

  const handleSkyClick = useCallback(
    (item: DoubleConsonantItem) => {
      allPlayRef.current = false;
      setIsAllPlayMode(false);
      startItemPlayback(item);
    },
    [startItemPlayback]
  );

  const toggleAllPlayMode = useCallback(() => {
    if (allPlayRef.current) {
      resetToWalking();
    } else {
      allPlayRef.current = true;
      setIsAllPlayMode(true);
      startItemPlayback(JOLLAMAN3_ITEMS[0]);
    }
  }, [resetToWalking, startItemPlayback]);

  const startRef = useRef(startItemPlayback);
  startRef.current = startItemPlayback;
  const resetRef = useRef(resetToWalking);
  resetRef.current = resetToWalking;

  useEffect(() => {
    if (autoStartAllPlay) {
      const id = window.setTimeout(() => {
        if (!allPlayRef.current) {
          allPlayRef.current = true;
          setIsAllPlayMode(true);
          startRef.current(JOLLAMAN3_ITEMS[0]);
        }
      }, 120);
      return () => window.clearTimeout(id);
    } else if (allPlayRef.current) {
      resetRef.current();
    }
  }, [autoStartAllPlay]);

  useEffect(() => {
    let rafId: number;

    const tick = (now: number) => {
      const anim = animRef.current;
      const dt = Math.min((now - anim.lastTime) / 1000, 0.05);
      anim.lastTime = now;

      if (pausedRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      anim.walkTime += dt;
      const curPhase = phaseRef.current;
      const item = selectedRef.current;

      if (curPhase === 'walking') {
        anim.worldScrollX += dt * 70;
        anim.walkX += dt * 95 * anim.walkDir;
        if (anim.walkX >= RIGHT_EDGE_X) {
          anim.walkX = RIGHT_EDGE_X;
          anim.walkDir = -1;
        } else if (anim.walkX <= LEFT_EDGE_X) {
          anim.walkX = LEFT_EDGE_X;
          anim.walkDir = 1;
        }
      } else if (curPhase === 'approaching') {
        anim.phaseElapsed += dt;
        const t = Math.min(anim.phaseElapsed / 0.85, 1);
        const eased = 1 - Math.pow(1 - t, 2.2);

        // Preserve continuous backdrop for ㅃ -> ㅆ -> ㅉ chain
        if (item.char !== 'ㅆ' && item.char !== 'ㅉ') {
          anim.worldScrollX += dt * 260;
        }
        anim.walkX = anim.approachStartX + (EP3_ACTION_SPOT_X - anim.approachStartX) * eased;
        anim.objectAppear = eased;

        if (t >= 1) {
          anim.walkX = EP3_ACTION_SPOT_X;
          anim.objectAppear = 1;
          anim.actionT = 0;
          anim.step1Triggered = false;
          anim.step2Triggered = false;
          anim.phaseElapsed = 0;
          phaseRef.current = 'action';
          setPhase('action');

          if (audioRef.current) {
            playDoubleConsonantSfx(item.char, 'start');
          }
        }
      } else if (curPhase === 'action') {
        anim.phaseElapsed += dt;
        const t = Math.min(anim.phaseElapsed / item.dur, 1);
        anim.actionT = t;

        if (t >= item.impactAt && !anim.step1Triggered) {
          anim.step1Triggered = true;
          if (audioRef.current) {
            playDoubleConsonantSfx(item.char, 'impact');
          }
        }

        if (item.secondaryAt !== undefined && t >= item.secondaryAt && !anim.step2Triggered) {
          anim.step2Triggered = true;
          if (audioRef.current) {
            playDoubleConsonantSfx(item.char, 'secondary');
          }
        }

        if (t >= 1) {
          anim.actionT = 1;
          anim.aftermathT = 0;
          anim.phaseElapsed = 0;
          phaseRef.current = 'aftermath';
          setPhase('aftermath');
        }
      } else if (curPhase === 'aftermath') {
        anim.phaseElapsed += dt;
        anim.aftermathT = Math.min(anim.phaseElapsed / 1.15, 1);

        if (anim.phaseElapsed >= 1.15) {
          anim.phaseElapsed = 0;
          phaseRef.current = 'reveal';
          setPhase('reveal');
          const cur = selectedRef.current;
          setLearnedChars((prev) => (prev.includes(cur.char) ? prev : [...prev, cur.char]));

          if (audioRef.current) {
            playSuccessChime();
            speakKorean(`${cur.sound}, ${cur.triggerWord}!`, 0.92, 1.0);
          }
        }
      } else if (curPhase === 'reveal') {
        if (allPlayRef.current) {
          anim.phaseElapsed += dt;
          if (anim.phaseElapsed >= 3.0) {
            const curIdx = JOLLAMAN3_ITEMS.findIndex((i) => i.char === item.char);
            const nextItem = curIdx >= 0 ? JOLLAMAN3_ITEMS[curIdx + 1] : undefined;
            if (nextItem) {
              startRef.current(nextItem);
            } else {
              resetRef.current();
            }
          }
        }
      }

      setFrameTick((v) => (v + 1) % 100000);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearAllTimers();
    };
  }, [clearAllTimers, playDoubleConsonantSfx, playSuccessChime, speakKorean]);

  const anim = animRef.current;
  const activeChar = selectedItem.char;

  const isWalkingMotion =
    phase === 'walking' ||
    (phase === 'approaching' && activeChar !== 'ㅆ' && activeChar !== 'ㅉ') ||
    (phase === 'action' && activeChar === 'ㄸ' && anim.actionT >= 0.2 && anim.actionT < 0.68);

  const walkCycle = anim.walkTime * 9.5;
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  const scrollOffset = anim.worldScrollX;
  const jollaFacing = phase === 'walking' ? anim.walkDir : 1;

  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaVisible = true;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let showHeadBump = false;
  let showDizzyStars = false;
  let muddy = false;
  let kneeling = false;
  let slapMark = false;

  if (phase === 'approaching') {
    if (activeChar === 'ㅆ') {
      // Exact continuation of ㅃ's despair kneeling pose!
      jollaX = EP3_ACTION_SPOT_X;
      kneeling = true;
      jollaFaceMode = 'crying';
      jollaY = GROUND_Y - 50;
      slapMark = true;
    } else if (activeChar === 'ㅉ') {
      // Still riding inside the garbage truck entering from the left!
      jollaVisible = false;
      jollaFaceMode = 'crying';
    }
  } else if (phase === 'action') {
    const t = anim.actionT;
    if (activeChar === 'ㄲ') {
      if (t < selectedItem.impactAt) {
        jollaFaceMode = 'panic';
      } else {
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = EP3_ACTION_SPOT_X + Math.sin(t * 78) * 5;
      }
    } else if (activeChar === 'ㄸ') {
      if (t < 0.2) {
        jollaX = EP3_ACTION_SPOT_X;
        jollaFaceMode = 'happy';
      } else if (t < 0.68) {
        const strollP = (t - 0.2) / 0.48;
        jollaX = EP3_ACTION_SPOT_X + strollP * 125;
        jollaFaceMode = 'happy';
      } else {
        const leapP = (t - 0.68) / 0.32;
        jollaX = 425;
        jollaY = GROUND_Y - 52 - Math.sin(leapP * Math.PI) * 110;
        jollaFaceMode = 'panic';
        muddy = true;
      }
    } else if (activeChar === 'ㅃ') {
      if (t < 0.32) {
        jollaFaceMode = 'happy';
      } else if (t < 0.56) {
        const slapRecoil = Math.sin(((t - 0.32) / 0.24) * Math.PI);
        jollaRot = -18 * slapRecoil;
        jollaFaceMode = 'panic';
        slapMark = true;
      } else {
        kneeling = true;
        jollaY = GROUND_Y - 50;
        jollaFaceMode = 'crying';
        slapMark = true;
      }
    } else if (activeChar === 'ㅆ') {
      if (t < 0.40) {
        // Remains in exact ㅃ kneeling despair pose until scooped!
        jollaX = EP3_ACTION_SPOT_X;
        kneeling = true;
        jollaY = GROUND_Y - 50;
        jollaFaceMode = 'crying';
        slapMark = true;
      } else if (t < 0.56) {
        // Scooped up into the garbage truck hopper
        const liftP = (t - 0.40) / 0.16;
        jollaX = EP3_ACTION_SPOT_X + liftP * 185;
        jollaY = GROUND_Y - 50 - Math.sin(liftP * Math.PI) * 125;
        jollaRot = liftP * 360;
        jollaFaceMode = 'crying';
        slapMark = true;
      } else {
        // Loaded inside the garbage truck speeding off to the left!
        jollaVisible = false;
      }
    } else if (activeChar === 'ㅉ') {
      if (t < 0.12) {
        // Inside the garbage truck arriving from the left
        jollaVisible = false;
        jollaFaceMode = 'crying';
      } else if (t < 0.30) {
        // Dropped off gently onto the road from the truck!
        const dropP = (t - 0.12) / 0.18;
        jollaX = 215 + dropP * (EP3_ACTION_SPOT_X - 215);
        jollaY = GROUND_Y - 82 + dropP * 32 - Math.sin(dropP * Math.PI) * 34;
        jollaRot = (1 - dropP) * -28;
        jollaFaceMode = 'crying';
      } else if (t < selectedItem.impactAt) {
        // Sitting/kneeling crying on the road while buddy approaches
        jollaX = EP3_ACTION_SPOT_X;
        kneeling = true;
        jollaY = GROUND_Y - 50;
        jollaFaceMode = 'crying';
      } else {
        // Comforted by buddy -> stands up smiling!
        jollaX = EP3_ACTION_SPOT_X;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'happy';
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    if (activeChar === 'ㄲ') {
      jollaFaceMode = 'dizzy';
      showHeadBump = true;
      showDizzyStars = true;
    } else if (activeChar === 'ㄸ') {
      jollaX = 425;
      jollaFaceMode = 'dizzy';
      muddy = true;
      showDizzyStars = true;
    } else if (activeChar === 'ㅃ') {
      kneeling = true;
      jollaY = GROUND_Y - 50;
      jollaFaceMode = 'crying';
      slapMark = true;
    } else if (activeChar === 'ㅆ') {
      // Carried away to the left inside the garbage truck (stays gone!)
      jollaVisible = false;
    } else if (activeChar === 'ㅉ') {
      jollaX = EP3_ACTION_SPOT_X;
      jollaFaceMode = 'happy';
    }
  }

  const i18nEntry = EP3_REVEAL_I18N[selectedItem.char];
  const localizedMeaning = i18nEntry.meanings[lang] ?? i18nEntry.meanings.en;
  const revealSubtitle = `${i18nEntry.phonetic} · ${localizedMeaning} [${i18nEntry.wordRom}]`;

  return (
    <div className={`w-full flex flex-col gap-3 select-none ${className}`}>
      {!hideControlBar && (
        <StickmanControlBar
          title="졸라쌍자음맨 (ㄲ ~ ㅉ)"
          icon="🐦"
          audioEnabled={audioEnabled}
          onToggleAudio={() => {
            const next = !audioEnabled;
            setAudioEnabled(next);
            audioRef.current = next;
            if (!next) {
              stopAllAudio();
            } else {
              playCutePop();
            }
          }}
          isPaused={isPaused}
          onTogglePause={toggleJollaPause}
          showWalkingReset={phase !== 'walking'}
          onResetWalking={() => {
            if (audioRef.current) playCutePop();
            resetToWalking();
          }}
          isAllPlayMode={isAllPlayMode}
          onToggleAllPlay={() => {
            if (audioRef.current) playCutePop();
            toggleAllPlayMode();
          }}
          allPlayIndex={JOLLAMAN3_ITEMS.findIndex((v) => v.char === selectedItem.char)}
          allPlayTotal={JOLLAMAN3_ITEMS.length}
        />
      )}

      {/* 2D SVG Simulation Stage */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
        <svg
          viewBox="0 0 1000 460"
          preserveAspectRatio="xMidYMid meet"
          onClick={toggleJollaPause}
          className="w-full h-auto block cursor-pointer"
          role="img"
          aria-label="졸라맨 한글 쌍자음 2D 시뮬레이션 무대"
        >
          <DynamicBackdrop
            idPrefix={uid}
            theme="sunset"
            scrollOffset={scrollOffset}
            walkTime={anim.walkTime}
          />

          {/* Floating Sky Double Consonants ㄲ ~ ㅉ */}
          {JOLLAMAN3_ITEMS.map((item, idx) => {
            const floatY = item.sky[1] + Math.sin(anim.walkTime * 2.2 + idx * 0.8) * 6;
            const isSelected = selectedItem.char === item.char && phase !== 'walking';
            const isLearned = learnedChars.includes(item.char);

            return (
              <g
                key={item.char}
                transform={`translate(${item.sky[0]}, ${floatY}) scale(${isSelected ? 1.24 : 1})`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkyClick(item);
                }}
                className="cursor-pointer"
              >
                <circle cx="0" cy="0" r="30" fill="#FFFFFF" fillOpacity={isSelected ? 0.95 : 0.72} />
                <text
                  x="0"
                  y="12"
                  textAnchor="middle"
                  fontSize="36"
                  fontWeight="900"
                  fill={item.color}
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  style={{ paintOrder: 'stroke fill' }}
                >
                  {item.char}
                </text>
                {isLearned && <circle cx="20" cy="-18" r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />}
              </g>
            );
          })}

          {/* Episode 3 Scenario Props */}
          {phase !== 'walking' && (
            <g
              opacity={
                phase === 'approaching' && activeChar !== 'ㅆ' && activeChar !== 'ㅉ'
                  ? Math.min(1, anim.objectAppear * 1.25)
                  : 1
              }
            >
              {/* ㄲ: Giant Crow + 2 Small Crows pecking head */}
              {activeChar === 'ㄲ' && (() => {
                const t = anim.actionT;
                const flyingIn = phase === 'approaching';
                const flockP = flyingIn ? anim.objectAppear : Math.min(t / 0.34, 1);
                const mainX = flyingIn ? 820 - flockP * 280 : phase === 'action' && t < 0.34 ? 540 - (t / 0.34) * 205 : 335;
                const mainY = flyingIn ? 140 : phase === 'action' && t < 0.34 ? 140 + (t / 0.34) * 100 : GROUND_Y - 126;
                const pecking = (phase === 'action' && t >= 0.34) || phase === 'aftermath' || phase === 'reveal';
                return (
                  <g>
                    <g transform={`translate(${mainX}, ${mainY})`}>
                      <CrowBirdSvg walkTime={anim.walkTime} scale={1.45} pecking={pecking} />
                    </g>
                    <g transform={`translate(${mainX + 68}, ${mainY - 46 + Math.sin(anim.walkTime * 9) * 8})`}>
                      <CrowBirdSvg walkTime={anim.walkTime + 0.4} scale={0.85} pecking={pecking} />
                    </g>
                    <g transform={`translate(${mainX + 108}, ${mainY + 12 + Math.cos(anim.walkTime * 10) * 8})`}>
                      <CrowBirdSvg walkTime={anim.walkTime + 0.8} scale={0.8} pecking={pecking} />
                    </g>
                    {pecking && (
                      <text x={EP3_ACTION_SPOT_X + 6} y={GROUND_Y - 144} textAnchor="middle" fontSize="24">
                        🐦⬛💢
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* ㄸ: Cute puppy dropping steaming poop at x=425, Jollaman hums & steps on it */}
              {activeChar === 'ㄸ' && (() => {
                const t = anim.actionT;
                const dogX =
                  phase === 'approaching'
                    ? 240 + anim.objectAppear * 185
                    : phase === 'action' && t < 0.48
                    ? t < 0.25
                      ? 425
                      : 425 + ((t - 0.25) / 0.23) * 640
                    : 1080;
                const dogSquatting = phase === 'action' && t < 0.2;
                const poopDropped = (phase === 'action' && t >= 0.16) || phase === 'aftermath' || phase === 'reveal';
                const poopSquashed = (phase === 'action' && t >= 0.68) || phase === 'aftermath' || phase === 'reveal';
                return (
                  <g>
                    {poopDropped && (
                      <g transform={`translate(425, ${GROUND_Y - 12})`}>
                        <SteamingPoopSvg walkTime={anim.walkTime} squashed={poopSquashed} />
                      </g>
                    )}
                    {dogX < 1040 && (
                      <g transform={`translate(${dogX}, ${GROUND_Y - 26}) scale(-1, 1)`}>
                        <CutePuppySvg walkTime={anim.walkTime} squatting={dogSquatting} />
                      </g>
                    )}
                    {phase === 'action' && t >= 0.2 && t < 0.68 && (
                      <text x={jollaX} y={jollaY - 62 + Math.sin(anim.walkTime * 9) * 5} textAnchor="middle" fontSize="22">
                        🎵
                      </text>
                    )}
                    {((phase === 'action' && t >= 0.68) || phase === 'aftermath') && (
                      <text x={425} y={GROUND_Y - 125} textAnchor="middle" fontSize="28">
                        💩💥
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* ㅃ: Girlfriend slaps Jollaman -> walks to blue-cap stickman & cheek kiss -> couple walks off right leaving Jollaman kneeling alone */}
              {activeChar === 'ㅃ' && (() => {
                const t = anim.actionT;
                const coupleExitP =
                  phase === 'aftermath'
                    ? Math.max(0, (anim.aftermathT - 0.15) / 0.85)
                    : phase === 'reveal'
                    ? 1
                    : 0;
                const coupleExiting = coupleExitP > 0;
                const capGuyX = 630 + coupleExitP * 460;
                let girlX = 430;
                let girlScaleX = 1;
                let girlMood: 'angry' | 'kiss' | 'happy' = 'angry';

                if (phase === 'approaching') {
                  girlX = 480 - anim.objectAppear * 115;
                } else if (phase === 'action') {
                  if (t < 0.32) {
                    girlX = 365 - (t / 0.32) * 28;
                    girlMood = 'angry';
                  } else if (t < 0.46) {
                    girlX = 337;
                    girlMood = 'angry';
                  } else if (t < 0.72) {
                    const walkP = (t - 0.46) / 0.26;
                    girlX = 337 + walkP * (630 - 42 - 337);
                    girlScaleX = -1;
                    girlMood = 'happy';
                  } else {
                    girlX = 630 - 42;
                    girlScaleX = -1;
                    girlMood = 'kiss';
                  }
                } else {
                  girlX = capGuyX - 42;
                  girlScaleX = -1;
                  girlMood = coupleExiting ? 'happy' : 'kiss';
                }

                const kissed =
                  (phase === 'action' && t >= 0.72) || (phase === 'aftermath' && coupleExitP < 0.85);
                const heartbroken =
                  (phase === 'action' && t >= 0.56) || phase === 'aftermath' || phase === 'reveal';

                return (
                  <g>
                    {/* Other Stickman wearing blue cap on right (walks off right with girl in aftermath) */}
                    {capGuyX < 1060 && (
                      <g transform={`translate(${capGuyX}, ${GROUND_Y - 52}) scale(${coupleExiting ? 1 : -1}, 1)`}>
                        <JollamanCharacterSvg
                          faceMode="happy"
                          isWalking={coupleExiting && phase === 'aftermath'}
                          legSwing={coupleExiting ? Math.sin(anim.walkTime * 9.5) * 16 : 0}
                          armSwing={coupleExiting ? Math.sin(anim.walkTime * 9.5 + Math.PI) * 14 : 0}
                          capColor="#2563EB"
                          blushCheeks={kissed}
                          walkTime={anim.walkTime}
                        />
                      </g>
                    )}

                    {/* Girl with ribbon & pink skirt */}
                    {girlX < 1050 && (
                      <g transform={`translate(${girlX}, ${GROUND_Y - 52}) scale(${girlScaleX}, 1)`}>
                        <GirlRibbonSkirtSvg
                          walkTime={anim.walkTime}
                          isWalking={
                            (phase === 'action' && ((t >= 0.46 && t < 0.72) || t < 0.32)) ||
                            (coupleExiting && phase === 'aftermath')
                          }
                          mood={girlMood}
                        />
                      </g>
                    )}

                    {/* Slap impact burst */}
                    {phase === 'action' && t >= 0.32 && t < 0.48 && (
                      <text x={EP3_ACTION_SPOT_X + 18} y={GROUND_Y - 96} textAnchor="middle" fontSize="28">
                        👋💥
                      </text>
                    )}

                    {/* Cheek kiss hearts */}
                    {kissed && capGuyX < 1020 && (
                      <text x={capGuyX - 24} y={GROUND_Y - 118 + Math.sin(anim.walkTime * 6) * 5} textAnchor="middle" fontSize="26">
                        💋❤️
                      </text>
                    )}

                    {/* Dark gloom cloud with vertical rain lines over Jollaman (matches ㅆ start position identically!) */}
                    {heartbroken && (
                      <g transform={`translate(${EP3_ACTION_SPOT_X + 14}, ${GROUND_Y - 122})`}>
                        <text x="0" y="-12" textAnchor="middle" fontSize="22">
                          😭💔
                        </text>
                        <ellipse cx="0" cy="-36" rx="32" ry="12" fill="#475569" stroke="#1E293B" strokeWidth="2" />
                        <ellipse cx="-14" cy="-42" rx="16" ry="10" fill="#64748B" />
                        <ellipse cx="14" cy="-41" rx="16" ry="10" fill="#64748B" />
                        {[-16, -5, 6, 16].map((lx) => (
                          <line key={lx} x1={lx} y1="-25" x2={lx} y2="6" stroke="#64748B" strokeWidth="2" strokeDasharray="5 3" />
                        ))}
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅆ: Starts from ㅃ kneeling despair -> Garbage Truck scoops him & speeds off LEFT! */}
              {activeChar === 'ㅆ' && (() => {
                const t = anim.actionT;
                let truckX = 1140;
                if (phase === 'approaching') {
                  truckX = 1120 - anim.objectAppear * 420;
                } else if (phase === 'action') {
                  if (t < 0.36) {
                    truckX = 700 - (t / 0.36) * 265;
                  } else if (t < 0.58) {
                    truckX = 435;
                  } else {
                    truckX = 435 - ((t - 0.58) / 0.42) * 420;
                  }
                } else if (phase === 'aftermath') {
                  // Smoothly finishes disappearing completely off the LEFT edge!
                  truckX = 15 - anim.aftermathT * 365;
                } else {
                  truckX = -350;
                }
                const scooping = phase === 'action' && t >= 0.38 && t < 0.58;
                const hasVictim = (phase === 'action' && t >= 0.56) || phase === 'aftermath';
                const stillKneelingGloom =
                  phase === 'approaching' || (phase === 'action' && t < 0.40);
                const wheelsMoving = !(phase === 'action' && t >= 0.36 && t < 0.58);
                return (
                  <g>
                    {/* Carry over the gloom cloud from ㅃ until scooped */}
                    {stillKneelingGloom && (
                      <g transform={`translate(${EP3_ACTION_SPOT_X + 14}, ${GROUND_Y - 122})`}>
                        <ellipse cx="0" cy="-36" rx="32" ry="12" fill="#475569" stroke="#1E293B" strokeWidth="2" />
                        <ellipse cx="-14" cy="-42" rx="16" ry="10" fill="#64748B" />
                        <ellipse cx="14" cy="-41" rx="16" ry="10" fill="#64748B" />
                        {[-16, -5, 6, 16].map((lx) => (
                          <line key={lx} x1={lx} y1="-25" x2={lx} y2="6" stroke="#64748B" strokeWidth="2" strokeDasharray="5 3" />
                        ))}
                      </g>
                    )}

                    {truckX > -320 && (
                      <g transform={`translate(${truckX}, ${GROUND_Y - 52})`}>
                        <GarbageTruckSvg
                          walkTime={anim.walkTime}
                          scooping={scooping}
                          hasVictim={hasVictim}
                          victimMood="crying"
                          wheelsMoving={wheelsMoving}
                        />
                      </g>
                    )}

                    {/* Speeding left dust & exhaust trail */}
                    {((phase === 'action' && t >= 0.58) || phase === 'aftermath') && truckX > -300 && (
                      <text x={Math.max(85, truckX + 175)} y={GROUND_Y - 108} textAnchor="middle" fontSize="28">
                        🚛💨
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* ㅉ: Garbage Truck enters from LEFT -> drops off crying Jollaman -> Buddy comforts & hugs! */}
              {activeChar === 'ㅉ' && (() => {
                const t = anim.actionT;
                let truckX = -320;
                if (phase === 'approaching') {
                  // Emerges smoothly from the LEFT edge continuing right after ㅆ!
                  truckX = -260 + anim.objectAppear * 425;
                } else if (phase === 'action') {
                  if (t < 0.30) {
                    truckX = 165;
                  } else if (t < 0.60) {
                    const exitP = (t - 0.30) / 0.30;
                    truckX = 165 - exitP * 485;
                  } else {
                    truckX = -340;
                  }
                }
                const truckHasVictim = phase === 'approaching' || (phase === 'action' && t < 0.12);
                const truckScooping = phase === 'action' && t >= 0.04 && t < 0.26;
                const truckWheelsMoving =
                  phase === 'approaching' || (phase === 'action' && t >= 0.30 && t < 0.60);

                // Buddy walks in from the right after crying Jollaman is dropped off
                const buddyVisible =
                  (phase === 'action' && t >= 0.32) || phase === 'aftermath' || phase === 'reveal';
                const buddyX =
                  phase === 'action' && t < 0.72
                    ? 880 - Math.max(0, (t - 0.32) / 0.40) * (880 - (EP3_ACTION_SPOT_X + 38))
                    : EP3_ACTION_SPOT_X + 38;
                const hugging =
                  (phase === 'action' && t >= selectedItem.impactAt) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';

                return (
                  <g>
                    {/* Garbage Truck emerging from LEFT and unloading crying Jollaman */}
                    {truckX > -310 && (
                      <g transform={`translate(${truckX}, ${GROUND_Y - 52})`}>
                        <GarbageTruckSvg
                          walkTime={phase === 'action' && t >= 0.30 ? -anim.walkTime : anim.walkTime}
                          facingRight={true}
                          scooping={truckScooping}
                          hasVictim={truckHasVictim}
                          victimMood="crying"
                          wheelsMoving={truckWheelsMoving}
                        />
                      </g>
                    )}

                    {/* Crying bubble after being dropped off until buddy hugs */}
                    {phase === 'action' && t >= 0.28 && t < selectedItem.impactAt && (
                      <g transform={`translate(${EP3_ACTION_SPOT_X + 18}, ${GROUND_Y - 108})`}>
                        <rect x="-46" y="-16" width="92" height="24" rx="12" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2.2" />
                        <text x="0" y="0" textAnchor="middle" fontSize="12" fontWeight="900" fill="#0369A1">
                          흐엉~ ㅠㅠ
                        </text>
                      </g>
                    )}

                    {/* Mint-scarf Buddy walking in from right */}
                    {buddyVisible && (
                      <g transform={`translate(${buddyX}, ${GROUND_Y - 52}) scale(-1, 1)`}>
                        <JollamanCharacterSvg
                          faceMode="happy"
                          isWalking={phase === 'action' && t < selectedItem.impactAt}
                          legSwing={Math.sin(anim.walkTime * 9.5) * 16}
                          armSwing={Math.sin(anim.walkTime * 9.5 + Math.PI) * 14}
                          scarfColor="#14B8A6"
                          walkTime={anim.walkTime}
                        />
                      </g>
                    )}

                    {hugging && (
                      <g>
                        {/* Comforting shoulder-hug arm */}
                        <path
                          d={`M${EP3_ACTION_SPOT_X + 38} ${GROUND_Y - 64} Q${EP3_ACTION_SPOT_X + 18} ${GROUND_Y - 76} ${EP3_ACTION_SPOT_X - 4} ${GROUND_Y - 62}`}
                          fill="none"
                          stroke="#0F172A"
                          strokeWidth="4.8"
                          strokeLinecap="round"
                        />
                        <text
                          x={EP3_ACTION_SPOT_X + 18}
                          y={GROUND_Y - 122 + Math.sin(anim.walkTime * 5) * 6}
                          textAnchor="middle"
                          fontSize="28"
                        >
                          ❤️✨
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* Main Jollaman Character */}
          {jollaVisible && (
            <g
              transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing}, 1)`}
              className="cursor-pointer"
            >
              <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
              {jollaRot === 0 && !kneeling && (
                <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
              )}
              <JollamanCharacterSvg
                faceMode={jollaFaceMode}
                isWalking={isWalkingMotion}
                legSwing={legSwing}
                armSwing={armSwing}
                showHeadBump={showHeadBump}
                showDizzyStars={showDizzyStars}
                muddy={muddy}
                kneeling={kneeling}
                slapMark={slapMark}
                walkTime={anim.walkTime}
                activeChar={selectedItem.char}
              />
            </g>
          )}

          {/* Unified Bottom Fixed Subtitle Strip */}
          <g transform="translate(500, 434)">
            <rect
              x="-270"
              y="-18"
              width="540"
              height="32"
              rx="16"
              fill="#0F172A"
              fillOpacity="0.82"
              stroke="#FFFFFF"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <text x="0" y="3" textAnchor="middle" fontSize="15" fontWeight="800" fill="#FFFFFF">
              {phase === 'walking'
                ? '하늘의 쌍자음 (ㄲ ~ ㅉ)을 눌러보세요!'
                : `${selectedItem.char} · ${selectedItem.sound} [${selectedItem.soundCue}] · ${selectedItem.triggerWord} (${localizedMeaning})`}
            </text>
          </g>
        </svg>

        {/* Pause Indicator Badge (Click anywhere on stage to resume) */}
        {isPaused && phase !== 'reveal' && (
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-md bg-slate-900/80 text-white text-xs sm:text-sm font-black shadow-md border border-white/25 whitespace-nowrap">
            ⏸ 일시정지 · 화면을 누르면 다시 재생
          </div>
        )}

        {/* Reveal Overlay Card */}
        {phase === 'reveal' && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 bg-transparent pointer-events-none"
            role="dialog"
            aria-label={`${selectedItem.char} ${selectedItem.sound}, ${selectedItem.triggerWord} 학습 화면`}
          >
            <button
              type="button"
              onClick={() => {
                if (audioRef.current) playCutePop();
                resetToWalking();
              }}
              className="pointer-events-auto group focus:outline-none cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] w-[86%] h-[78%] rounded-2xl bg-white/85 backdrop-blur-[2px] border-2 border-white/95 shadow-lg px-6 py-4 flex flex-col items-center justify-center"
              title="클릭하면 계속 걸어요!"
            >
              <div
                className="font-black leading-none"
                style={{
                  fontSize: 'clamp(3rem, 11vw, 9rem)',
                  color: selectedItem.color,
                  WebkitTextStroke: '5px #FFFFFF',
                  paintOrder: 'stroke fill',
                  textShadow: '0 8px 24px rgba(15, 23, 42, 0.35)',
                }}
              >
                {selectedItem.char}
              </div>

              <div
                className="font-black tracking-tight mt-2 leading-tight text-center"
                style={{
                  fontSize: 'clamp(1.1rem, 4vw, 2.6rem)',
                  color: '#0F172A',
                  WebkitTextStroke: '6px #FFFFFF',
                  paintOrder: 'stroke fill',
                  textShadow: '0 4px 16px rgba(15, 23, 42, 0.25)',
                }}
              >
                <span style={{ color: selectedItem.color }}>{selectedItem.char}</span>{' '}
                {selectedItem.sound} [{selectedItem.soundCue}], {selectedItem.triggerWord}!!
              </div>

              <div
                className="font-black tracking-tight mt-1.5 leading-snug text-center"
                style={{
                  fontSize: 'clamp(0.85rem, 2vw, 1.25rem)',
                  color: '#1E293B',
                  WebkitTextStroke: '4px #FFFFFF',
                  paintOrder: 'stroke fill',
                }}
              >
                {revealSubtitle}
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickmanSsangJaeumSim;
