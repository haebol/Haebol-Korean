import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  ACTION_SPOT_X,
  BackdropThemeKey,
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
  VowelFaceExtension,
  useStickmanAudio,
} from './stickmanShared';

export type VowelCharKey = 'ㅏ' | 'ㅑ' | 'ㅓ' | 'ㅕ' | 'ㅗ' | 'ㅛ' | 'ㅜ' | 'ㅠ' | 'ㅡ' | 'ㅣ';

export type VowelActionType =
  | 'cryingBaby'
  | 'fieryBaseball'
  | 'fishbowlFlood'
  | 'foxFart'
  | 'squidInk'
  | 'giantYoyo'
  | 'ufoAbduction'
  | 'sheetGhost'
  | 'spookyHouseSearch'
  | 'teethMonsterReunion';

export type { VowelFaceExtension };

export interface VowelWord {
  word: string;
  emoji: string;
  meaning: string;
}

export interface VowelEpisodeItem {
  char: VowelCharKey;
  sound: string;
  phoneticRule: string;
  triggerWord: string;
  speakLine: string;
  gagSummary: string;
  actionType: VowelActionType;
  durationSec: number;
  impactAt: number;
  resultFace: 'panic' | 'dizzy' | VowelFaceExtension | 'happy';
  color: string;
  skyX: number;
  skyY: number;
  words: VowelWord[];
}

export const VOWEL_EPISODES: VowelEpisodeItem[] = [
  {
    char: 'ㅏ',
    sound: '아',
    phoneticRule: '양성 기본모음 [a] · 입을 크게 벌리고 혀를 낮춰 발음',
    triggerWord: '아기',
    speakLine: '아, 아기!',
    gagSummary: '얼굴은 크고 팔다리·몸은 짧은 귀여운 아기가 "으앙~ 으앙~" 계속 울자 육아 중인 졸라맨도 눈물을 찔끔 흘린다!!',
    actionType: 'cryingBaby',
    durationSec: 2.35,
    impactAt: 0.42,
    resultFace: 'parentTeary',
    color: '#EC4899',
    skyX: 86,
    skyY: 66,
    words: [
      { word: '아기', emoji: '👶', meaning: 'baby' },
      { word: '아이', emoji: '🧒', meaning: 'child' },
      { word: '아버지', emoji: '👨', meaning: 'father' },
    ],
  },
  {
    char: 'ㅑ',
    sound: '야',
    phoneticRule: '이중모음 [ja] · 반모음 [j] + [a] 결합',
    triggerWord: '야구공',
    speakLine: '야, 야구공!',
    gagSummary: '아기가 졸라맨을 향해 던진 불꽃 야구공이 배를 정통으로 뚫고 지나간다!! 깡!!',
    actionType: 'fieryBaseball',
    durationSec: 1.75,
    impactAt: 0.36,
    resultFace: 'dizzy',
    color: '#F97316',
    skyX: 178,
    skyY: 84,
    words: [
      { word: '야구공', emoji: '⚾', meaning: 'baseball' },
      { word: '야채', emoji: '🥬', meaning: 'vegetables' },
      { word: '야자수', emoji: '🌴', meaning: 'palm tree' },
    ],
  },
  {
    char: 'ㅓ',
    sound: '어',
    phoneticRule: '음성 기본모음 [ʌ] · 턱을 살짝 내리고 입안을 둥글지 않게 벌려 발음',
    triggerWord: '어항',
    speakLine: '어, 어항!',
    gagSummary: '아기가 어항에서 놀다가 풍덩 빠져 거실이 물바다가 되자 졸라맨이 머리를 감싸쥐며 좌절한다!! "안돼~!!"',
    actionType: 'fishbowlFlood',
    durationSec: 2.35,
    impactAt: 0.28,
    resultFace: 'headClutch',
    color: '#0EA5E9',
    skyX: 270,
    skyY: 62,
    words: [
      { word: '어항', emoji: '🐠', meaning: 'fishbowl' },
      { word: '어머니', emoji: '👩', meaning: 'mother' },
      { word: '어부', emoji: '🎣', meaning: 'fisherman' },
    ],
  },
  {
    char: 'ㅕ',
    sound: '여',
    phoneticRule: '이중모음 [jʌ] · 반모음 [j] + [ʌ] 결합',
    triggerWord: '여우',
    speakLine: '여, 여우!',
    gagSummary: '아기가 화면 밖에서 목줄을 한 여우를 데려오더니 여우가 방귀를 뿡 뀌어 졸라맨이 기절한다!!',
    actionType: 'foxFart',
    durationSec: 1.75,
    impactAt: 0.44,
    resultFace: 'greenPoison',
    color: '#EA580C',
    skyX: 362,
    skyY: 84,
    words: [
      { word: '여우', emoji: '🦊', meaning: 'fox' },
      { word: '여자', emoji: '👧', meaning: 'woman' },
      { word: '여기', emoji: '📍', meaning: 'here' },
    ],
  },
  {
    char: 'ㅗ',
    sound: '오',
    phoneticRule: '양성 원순모음 [o] · 입술을 동그랗게 모아 앞으로 내밀어 발음',
    triggerWord: '오징어',
    speakLine: '오, 오징어!',
    gagSummary: '아기가 보던 그림책에서 오징어가 튀어나와 먹물을 정통으로 쏴 온 화면이 깜깜해진다!!',
    actionType: 'squidInk',
    durationSec: 1.95,
    impactAt: 0.38,
    resultFace: 'inked',
    color: '#9333EA',
    skyX: 454,
    skyY: 64,
    words: [
      { word: '오징어', emoji: '🦑', meaning: 'squid' },
      { word: '오리', emoji: '🦆', meaning: 'duck' },
      { word: '오이', emoji: '🥒', meaning: 'cucumber' },
    ],
  },
  {
    char: 'ㅛ',
    sound: '요',
    phoneticRule: '이중모음 [jo] · 반모음 [j] + 원순모음 [o] 결합',
    triggerWord: '요요',
    speakLine: '요, 요요!',
    gagSummary: '아기가 소파 위에 서서 가지고 놀던 요요 줄이 쭉 늘어나더니 졸라맨을 정통으로 맞춰 날려버린다!!',
    actionType: 'giantYoyo',
    durationSec: 1.95,
    impactAt: 0.36,
    resultFace: 'dizzy',
    color: '#E11D48',
    skyX: 546,
    skyY: 84,
    words: [
      { word: '요요', emoji: '🪀', meaning: 'yo-yo' },
      { word: '요리사', emoji: '👨‍🍳', meaning: 'chef' },
      { word: '요가', emoji: '🧘', meaning: 'yoga' },
    ],
  },
  {
    char: 'ㅜ',
    sound: '우',
    phoneticRule: '음성 원순모음 [u] · 입술을 작고 동그랗게 오므려 발음',
    triggerWord: '우주선',
    speakLine: '우, 우주선!',
    gagSummary: '깜깜한 밤의 도시를 산책하던 중 우주선이 나타나 아기 졸라맨만 광선으로 데려가버린다!! 아기야~~!!',
    actionType: 'ufoAbduction',
    durationSec: 2.2,
    impactAt: 0.28,
    resultFace: 'headClutch',
    color: '#10B981',
    skyX: 638,
    skyY: 62,
    words: [
      { word: '우주선', emoji: '🛸', meaning: 'spaceship' },
      { word: '우유', emoji: '🥛', meaning: 'milk' },
      { word: '우리', emoji: '🤝', meaning: 'we / us' },
    ],
  },
  {
    char: 'ㅠ',
    sound: '유',
    phoneticRule: '이중모음 [ju] · 반모음 [j] + 원순모음 [u] 결합',
    triggerWord: '유령',
    speakLine: '유, 유령!',
    gagSummary: '깜깜한 밤의 도시에서 "아기야~ ㅠㅠ" 찾아다니던 졸라맨 등 뒤에 유령이 나타나 기절한다!!',
    actionType: 'sheetGhost',
    durationSec: 1.75,
    impactAt: 0.42,
    resultFace: 'fainted',
    color: '#0284C7',
    skyX: 730,
    skyY: 84,
    words: [
      { word: '유령', emoji: '👻', meaning: 'ghost' },
      { word: '유리', emoji: '🪟', meaning: 'glass' },
      { word: '유자', emoji: '🍋', meaning: 'yuzu' },
    ],
  },
  {
    char: 'ㅡ',
    sound: '으',
    phoneticRule: '평순 고모음 [ɯ] · 입술을 옆으로 펴고 혀 뒤쪽을 올려 발음',
    triggerWord: '으스스',
    speakLine: '으, 으스스!',
    gagSummary: '깜깜한 밤의 도시, 아기를 찾아 으스스한 유령의 집 앞까지 온 졸라맨이 부들부들 떨며 용기를 내어 안으로 들어간다!!',
    actionType: 'spookyHouseSearch',
    durationSec: 2.0,
    impactAt: 0.45,
    resultFace: 'parentTeary',
    color: '#4F46E5',
    skyX: 822,
    skyY: 64,
    words: [
      { word: '으스스', emoji: '🏚️', meaning: 'spooky / eerie' },
      { word: '으르렁', emoji: '🐯', meaning: 'growl' },
      { word: '음악', emoji: '🎵', meaning: 'music' },
    ],
  },
  {
    char: 'ㅣ',
    sound: '이',
    phoneticRule: '평순 전설 고모음 [i] · 입꼬리를 양옆으로 당기고 혀를 앞쪽 높이 올려 발음',
    triggerWord: '이빨괴물',
    speakLine: '이, 이빨괴물!',
    gagSummary: '졸라맨이 집 문을 열자 이빨괴물이 튀어나오지만, 통쾌한 날라차기로 물리치고 울고 있던 아기를 구하는 해피엔딩!!',
    actionType: 'teethMonsterReunion',
    durationSec: 3.1,
    impactAt: 0.46,
    resultFace: 'happy',
    color: '#16A34A',
    skyX: 914,
    skyY: 84,
    words: [
      { word: '이빨', emoji: '🦷', meaning: 'teeth' },
      { word: '이름', emoji: '📛', meaning: 'name' },
      { word: '이야기', emoji: '📖', meaning: 'story' },
    ],
  },
];

const VOWEL_REVEAL_I18N: Record<
  VowelCharKey,
  { phonetic: string; wordRom: string; meanings: Record<StickmanLang, string> }
> = {
  ㅏ: { phonetic: '[a]', wordRom: 'agi', meanings: { en: 'baby', vi: 'em bé', zh: '婴儿', ja: '赤ちゃん', ru: 'малыш', mn: 'нялх хүүхэд', bn: 'শিশু' } },
  ㅑ: { phonetic: '[ya]', wordRom: 'yagugong', meanings: { en: 'baseball', vi: 'bóng chày', zh: '棒球', ja: '野球ボール', ru: 'бейсбольный мяч', mn: 'бэйсболын бөмбөг', bn: 'বেসবল' } },
  ㅓ: { phonetic: '[eo]', wordRom: 'eohang', meanings: { en: 'fishbowl', vi: 'bể cá', zh: '鱼缸', ja: '金魚鉢', ru: 'аквариум', mn: 'загасны сав', bn: 'মাছের অ্যাকোয়ারিয়াম' } },
  ㅕ: { phonetic: '[yeo]', wordRom: 'yeou', meanings: { en: 'fox', vi: 'con cáo', zh: '狐狸', ja: 'キツネ', ru: 'лиса', mn: 'үнэг', bn: 'শিয়াল' } },
  ㅗ: { phonetic: '[o]', wordRom: 'ojingeo', meanings: { en: 'squid', vi: 'con mực', zh: '鱿鱼', ja: 'イカ', ru: 'кальмар', mn: 'наймалж', bn: 'স্কুইড' } },
  ㅛ: { phonetic: '[yo]', wordRom: 'yoyo', meanings: { en: 'yo-yo', vi: 'con quay yo-yo', zh: '溜溜球', ja: 'ヨーヨー', ru: 'йо-йо', mn: 'ёо-ёо', bn: 'ইয়ো-ইয়ো' } },
  ㅜ: { phonetic: '[u]', wordRom: 'ujuseon', meanings: { en: 'spaceship', vi: 'tàu vũ trụ', zh: '宇宙飞船', ja: '宇宙船', ru: 'космический корабль', mn: 'сансрын хөлөг', bn: 'মহাকাশযান' } },
  ㅠ: { phonetic: '[yu]', wordRom: 'yuryeong', meanings: { en: 'ghost', vi: 'con ma', zh: '幽灵', ja: 'おばけ', ru: 'привидение', mn: 'сүнс', bn: 'ভূত' } },
  ㅡ: { phonetic: '[eu]', wordRom: 'euseuseu', meanings: { en: 'spooky / eerie', vi: 'rùng rợn', zh: '阴森森', ja: '不気味', ru: 'жутко', mn: 'аймшигтай', bn: 'ভৌতিক' } },
  ㅣ: { phonetic: '[i]', wordRom: 'ippal-goemul', meanings: { en: 'tooth monster', vi: 'quái vật răng', zh: '牙齿怪兽', ja: '歯のおばけ', ru: 'зубастый монстр', mn: 'шүдний мангас', bn: 'দাঁতের দৈত্য' } },
};

// ============================================================================
// EPISODE 2 CUSTOM LARVA-STYLE SVG PROPS & OVERLAYS (12 COMPONENTS)
// ============================================================================

const CuteCryingBabyJollamanSvg: React.FC<{
  walkTime: number;
  mood?: 'crying' | 'happy' | 'throw' | 'play';
}> = ({ walkTime, mood = 'crying' }) => {
  const wobble = Math.sin(walkTime * 14) * 3;
  const tearDrop = (walkTime * 26) % 14;
  return (
    <g transform={`translate(0, ${Math.abs(Math.sin(walkTime * 8)) * -2})`}>
      {/* Chubby short baby limbs + diaper */}
      <line x1="-5" y1="14" x2="-9" y2="27" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
      <line x1="5" y1="14" x2="9" y2="27" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
      <ellipse cx="-10" cy="28" rx="5.5" ry="3.2" fill="#F472B6" stroke="#0F172A" strokeWidth="1.8" />
      <ellipse cx="10" cy="28" rx="5.5" ry="3.2" fill="#F472B6" stroke="#0F172A" strokeWidth="1.8" />

      {/* Tiny short torso + cute diaper */}
      <path d="M-10 4 Q0 0 10 4 L12 16 Q0 20 -12 16 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
      <circle cx="0" cy="10" r="2.2" fill="#F472B6" />

      {/* Tiny waving baby arms */}
      <line x1="-10" y1="6" x2={mood === 'throw' ? -22 : -18} y2={mood === 'throw' ? -6 : 2 + wobble} stroke="#0F172A" strokeWidth="3.8" strokeLinecap="round" />
      <line x1="10" y1="6" x2="18" y2={2 - wobble} stroke="#0F172A" strokeWidth="3.8" strokeLinecap="round" />

      {/* Oversized round baby head */}
      <circle cx="0" cy="-14" r="19" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
      {/* Cute single baby curl */}
      <path d="M-2 -33 Q3 -43 9 -35 Q6 -31 2 -33" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
      {/* Rosy baby cheeks */}
      <ellipse cx="-11" cy="-9" rx="3.8" ry="2.2" fill="#FDA4AF" opacity="0.85" />
      <ellipse cx="11" cy="-9" rx="3.8" ry="2.2" fill="#FDA4AF" opacity="0.85" />

      {mood === 'crying' ? (
        <>
          <path d="M-10 -18 L-5 -15 L-10 -12" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 -18 L5 -15 L10 -12" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="-9" cy={-10 + tearDrop * 0.5} rx="2.4" ry="3.4" fill="#38BDF8" />
          <ellipse cx="9" cy={-10 + ((tearDrop + 7) % 14) * 0.5} rx="2.4" ry="3.4" fill="#38BDF8" />
          <ellipse cx="0" cy="-6" rx="6.5" ry="5.5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.8" />
        </>
      ) : (
        <>
          <circle cx="-6" cy="-16" r="2.6" fill="#0F172A" />
          <circle cx="6" cy="-16" r="2.6" fill="#0F172A" />
          <path d="M-4 -8 Q0 -3 4 -8" fill="none" stroke="#0F172A" strokeWidth="2.3" strokeLinecap="round" />
        </>
      )}
    </g>
  );
};

const FieryBaseballSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const flicker = 1 + Math.sin(walkTime * 42) * 0.16;
  return (
    <g>
      <g transform={`scale(${flicker}, 1)`}>
        <path d="M8 -16 Q42 -22 68 -4 Q42 0 56 12 Q28 16 8 14 Z" fill="#F97316" opacity="0.9" />
        <path d="M6 -9 Q30 -12 46 -2 Q28 4 36 9 Q18 10 6 9 Z" fill="#FACC15" />
      </g>
      <circle cx="0" cy="0" r="15" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
      <path d="M-8 -11 Q-2 0 -8 11" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeDasharray="3 2" />
      <path d="M8 -11 Q2 0 8 11" fill="none" stroke="#EF4444" strokeWidth="2.2" strokeDasharray="3 2" />
    </g>
  );
};

const GiantFloorFishbowlSvg: React.FC<{ walkTime: number; cracked?: boolean }> = ({
  walkTime,
  cracked = false,
}) => {
  const fishSwim = Math.sin(walkTime * 4) * 18;
  return (
    <g>
      {/* Glass bowl rim and spherical body */}
      <ellipse cx="0" cy="48" rx="44" ry="9" fill="#94A3B8" opacity="0.4" />
      <circle cx="0" cy="0" r="58" fill="#E0F2FE" fillOpacity="0.58" stroke="#0284C7" strokeWidth="4" />
      {/* Water fill inside lower 2/3 */}
      <path d="M-54 4 Q-25 14 0 4 T54 4 A58 58 0 0 1 -54 4 Z" fill="#38BDF8" fillOpacity="0.65" />
      {/* Happy orange goldfish */}
      <g transform={`translate(${fishSwim}, 22)`}>
        <ellipse cx="0" cy="0" rx="13" ry="8" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
        <polygon points="11,0 21,-7 21,7" fill="#F97316" stroke="#C2410C" strokeWidth="1.8" />
        <circle cx="-6" cy="-2" r="2" fill="#0F172A" />
      </g>
      {/* Rim */}
      <ellipse cx="0" cy="-54" rx="34" ry="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="3" />
      <ellipse cx="-24" cy="-18" rx="7" ry="18" transform="rotate(-24, -24, -18)" fill="#FFFFFF" opacity="0.55" />
      {cracked && (
        <path
          d="M-22 -28 L-6 -8 L-14 10 L4 28 M18 -20 L6 -2 L22 14"
          fill="none"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

const WaterFloodOverlaySvg: React.FC<{ walkTime: number; level?: number }> = ({
  walkTime,
  level = 1,
}) => {
  const waveShift = Math.sin(walkTime * 6) * 18;
  const topY = 460 - 145 * level;
  return (
    <g opacity="0.72">
      <path
        d={`M0 ${topY} Q${130 + waveShift} ${topY - 16} 260 ${topY} T520 ${topY} T780 ${topY} T1000 ${topY} L1000 460 L0 460 Z`}
        fill="#0EA5E9"
      />
      <path
        d={`M0 ${topY + 24} Q${160 - waveShift} ${topY + 12} 320 ${topY + 24} T640 ${topY + 24} T1000 ${topY + 24} L1000 460 L0 460 Z`}
        fill="#38BDF8"
        opacity="0.7"
      />
      {/* Floating startled goldfish in the flood */}
      <g transform={`translate(${540 + Math.sin(walkTime * 3.5) * 45}, ${topY + 42})`}>
        <ellipse cx="0" cy="0" rx="14" ry="8" fill="#FB923C" stroke="#9A3412" strokeWidth="2" />
        <polygon points="12,0 22,-7 22,7" fill="#F97316" />
        <circle cx="-6" cy="-2" r="2" fill="#0F172A" />
      </g>
    </g>
  );
};

const NineTailFoxSvg: React.FC<{ walkTime: number; farting?: boolean }> = ({
  walkTime,
  farting = false,
}) => {
  const sway = Math.sin(walkTime * 8) * 6;
  return (
    <g>
      {/* Fan of fluffy orange-white tails */}
      {[-38, -22, -6, 10, 26].map((ang, i) => (
        <g key={i} transform={`translate(28, 6) rotate(${ang + sway * 0.5})`}>
          <path d="M0 0 Q34 -18 52 -6 Q38 14 0 8 Z" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <path d="M36 -10 Q48 -10 52 -6 Q44 4 32 4 Z" fill="#FFF7ED" />
        </g>
      ))}
      {/* Legs */}
      <rect x="-18" y="20" width="9" height="24" rx="4" fill="#EA580C" stroke="#7C2D12" strokeWidth="2" />
      <rect x="12" y="20" width="9" height="24" rx="4" fill="#EA580C" stroke="#7C2D12" strokeWidth="2" />
      {/* Body */}
      <ellipse cx="2" cy="12" rx="28" ry="17" fill="#F97316" stroke="#9A3412" strokeWidth="2.8" />
      <ellipse cx="-2" cy="18" rx="16" ry="9" fill="#FFF7ED" />
      {/* Fox head */}
      <g transform="translate(-26, -6)">
        <polygon points="-16,-14 -8,-34 0,-16" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.4" />
        <polygon points="2,-16 12,-34 18,-14" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.4" />
        <path d="M-20 -6 Q0 -22 20 -6 Q16 14 0 18 Q-16 14 -20 -6 Z" fill="#FB923C" stroke="#9A3412" strokeWidth="2.8" />
        <ellipse cx="-6" cy="9" rx="7" ry="5" fill="#FFF7ED" />
        <ellipse cx="6" cy="9" rx="7" ry="5" fill="#FFF7ED" />
        <circle cx="-7" cy="-3" r="2.8" fill="#0F172A" />
        <circle cx="7" cy="-3" r="2.8" fill="#0F172A" />
        <circle cx="0" cy="10" r="3" fill="#0F172A" />
      </g>
      {farting && (
        <g transform="translate(56, 2)">
          <ellipse cx="0" cy="0" rx="22" ry="14" fill="#84CC16" opacity="0.72" />
          <ellipse cx="20" cy="-8" rx="28" ry="18" fill="#A3E635" opacity="0.6" />
          <text x="12" y="4" textAnchor="middle" fontSize="18">💨</text>
        </g>
      )}
    </g>
  );
};

const PictureBookSvg: React.FC = () => (
  <g>
    <path d="M-38 -18 L-2 -14 L-2 22 L-38 18 Z" fill="#FEF9C3" stroke="#92400E" strokeWidth="2.8" />
    <path d="M2 -14 L38 -18 L38 18 L2 22 Z" fill="#FFFBEB" stroke="#92400E" strokeWidth="2.8" />
    <circle cx="19" cy="0" r="9" fill="#A855F7" opacity="0.75" />
    <text x="-20" y="6" textAnchor="middle" fontSize="14" fontWeight="900" fill="#9333EA">ㅗ</text>
  </g>
);

const ComicSquidSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const wiggle = Math.sin(walkTime * 18) * 6;
  return (
    <g>
      {/* Wiggling tentacles */}
      {[-18, -8, 2, 12, 20].map((tx, i) => (
        <path
          key={i}
          d={`M${tx * 0.6} 18 Q${tx + wiggle} 36 ${tx - wiggle * 0.6} 50`}
          fill="none"
          stroke="#A855F7"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
      ))}
      {/* Pointy squid mantle */}
      <polygon points="0,-48 -28,-8 28,-8" fill="#9333EA" stroke="#581C87" strokeWidth="3" strokeLinejoin="round" />
      <rect x="-20" y="-12" width="40" height="32" rx="12" fill="#A855F7" stroke="#581C87" strokeWidth="3" />
      <circle cx="-8" cy="2" r="5" fill="#FFFFFF" />
      <circle cx="8" cy="2" r="5" fill="#FFFFFF" />
      <circle cx="-8" cy="2" r="2.3" fill="#0F172A" />
      <circle cx="8" cy="2" r="2.3" fill="#0F172A" />
      <ellipse cx="0" cy="14" rx="5" ry="4" fill="#1E1B4B" />
    </g>
  );
};

const InkBlackoutOverlaySvg: React.FC<{ opacity?: number; walkTime: number }> = ({
  opacity = 0.88,
  walkTime,
}) => (
  <g opacity={opacity}>
    <rect x="0" y="0" width="1000" height="460" fill="#090D16" fillOpacity="0.82" />
    <circle cx="320" cy="210" r="145" fill="#020617" />
    <circle cx="510" cy="180" r="120" fill="#020617" />
    <circle cx="420" cy="310" r="110" fill="#020617" />
    <circle cx="670" cy="260" r="95" fill="#020617" />
    {/* Cartoon blinking white eyes in the dark ink */}
    <g transform="translate(290, 290)">
      <ellipse cx="-10" cy="0" rx="6" ry={Math.abs(Math.sin(walkTime * 3)) < 0.12 ? 1 : 8} fill="#FFFFFF" />
      <ellipse cx="10" cy="0" rx="6" ry={Math.abs(Math.sin(walkTime * 3)) < 0.12 ? 1 : 8} fill="#FFFFFF" />
      <circle cx="-9" cy="0" r="2.5" fill="#0F172A" />
      <circle cx="11" cy="0" r="2.5" fill="#0F172A" />
    </g>
  </g>
);

const GiantYoyoSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => (
  <g transform={`rotate(${(walkTime * 540) % 360})`}>
    <circle cx="0" cy="0" r="26" fill="#E11D48" stroke="#881337" strokeWidth="3.5" />
    <circle cx="0" cy="0" r="15" fill="#FFE4E6" stroke="#BE123C" strokeWidth="2.5" />
    <text x="0" y="6" textAnchor="middle" fontSize="16" fontWeight="900" fill="#BE123C">ㅛ</text>
  </g>
);

const ComicUfoSvg: React.FC<{ walkTime: number; beamActive?: boolean }> = ({
  walkTime,
  beamActive = false,
}) => (
  <g>
    {beamActive && (
      <polygon
        points="-24,18 24,18 96,260 -96,260"
        fill="#34D399"
        opacity={0.28 + Math.sin(walkTime * 16) * 0.08}
      />
    )}
    <path d="M-32 -6 Q0 -48 32 -6 Z" fill="#BAE6FD" fillOpacity="0.88" stroke="#0284C7" strokeWidth="3" />
    <ellipse cx="0" cy="6" rx="64" ry="18" fill="#64748B" stroke="#0F172A" strokeWidth="3.2" />
    <ellipse cx="0" cy="0" rx="48" ry="11" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
    {[-38, -16, 6, 28, 44].map((lx, idx) => (
      <circle
        key={lx}
        cx={lx}
        cy="8"
        r="5"
        fill={Math.floor(walkTime * 8 + idx) % 2 === 0 ? '#FACC15' : '#34D399'}
      />
    ))}
  </g>
);

const SheetGhostSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const floatY = Math.sin(walkTime * 6) * 8;
  return (
    <g transform={`translate(0, ${floatY})`}>
      <path
        d="M-34 42 Q-34 -42 0 -46 Q34 -42 34 42 Q22 30 12 44 Q0 30 -12 44 Q-22 30 -34 42 Z"
        fill="#F8FAFC"
        stroke="#0F172A"
        strokeWidth="3.5"
      />
      {/* Spooky arms */}
      <path d="M-30 2 Q-52 -12 -46 12" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 2 Q52 -12 46 12" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      {/* Eyes & wavy ghost mouth */}
      <ellipse cx="-11" cy="-12" rx="5.5" ry="7.5" fill="#0F172A" />
      <ellipse cx="11" cy="-12" rx="5.5" ry="7.5" fill="#0F172A" />
      <ellipse cx="0" cy="8" rx="8" ry="10" fill="#0F172A" />
    </g>
  );
};

const TeethMonsterSvg: React.FC<{ walkTime: number; chomping?: boolean }> = ({
  walkTime,
  chomping = true,
}) => {
  const jawOpen = chomping ? Math.abs(Math.sin(walkTime * 16)) * 18 : 6;
  return (
    <g>
      {/* Monster upper jaw */}
      <path d="M-48 0 Q-44 -54 0 -56 Q44 -54 48 0 Z" fill="#16A34A" stroke="#0F172A" strokeWidth="3.5" />
      {/* Googly monster eyes */}
      <circle cx="-18" cy="-36" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
      <circle cx="18" cy="-36" r="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
      <circle cx="-16" cy="-35" r="4" fill="#0F172A" />
      <circle cx="16" cy="-35" r="4" fill="#0F172A" />
      {/* Upper giant jagged teeth */}
      {[-34, -18, -2, 14, 30].map((tx) => (
        <polygon key={tx} points={`${tx - 7},0 ${tx + 7},0 ${tx},14`} fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
      ))}
      {/* Lower chomping jaw */}
      <g transform={`translate(0, ${jawOpen})`}>
        <path d="M-44 6 Q0 46 44 6 Z" fill="#15803D" stroke="#0F172A" strokeWidth="3.5" />
        {[-28, -12, 4, 20].map((tx) => (
          <polygon key={tx} points={`${tx - 7},8 ${tx + 7},8 ${tx},-6`} fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
        ))}
      </g>
    </g>
  );
};

// ============================================================================
// MAIN EPISODE 2 COMPONENT: StickmanMoeumSim
// ============================================================================

const getVowelBackdropTheme = (actionType: VowelActionType): BackdropThemeKey => {
  switch (actionType) {
    case 'ufoAbduction':
    case 'sheetGhost':
      return 'nightcity';
    case 'spookyHouseSearch':
    case 'teethMonsterReunion':
      return 'spookyhouse';
    default:
      return 'livingroom';
  }
};

export const StickmanMoeumSim: React.FC<StickmanSimProps> = ({
  defaultAudioEnabled = true,
  lang = 'en',
  className = '',
  hideControlBar = false,
  autoStartAllPlay = false,
}) => {
  const uid = useId();
  const [phase, setPhase] = useState<SimPhase>('walking');
  const [selectedVowel, setSelectedVowel] = useState<VowelEpisodeItem>(VOWEL_EPISODES[0]);
  const [learnedChars, setLearnedChars] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isAllPlayMode, setIsAllPlayMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(defaultAudioEnabled);
  const [, setFrameTick] = useState(0);

  const animRef = useRef({
    walkX: 130,
    walkDir: 1 as 1 | -1,
    walkTime: 0,
    worldScrollX: 0,
    phaseElapsed: 0,
    approachStartX: 130,
    objectAppear: 0,
    actionT: 0,
    aftermathT: 0,
    step1Triggered: false,
    step2Triggered: false,
    lastTime: performance.now(),
  });

  const phaseRef = useRef<SimPhase>(phase);
  phaseRef.current = phase;
  const selectedRef = useRef<VowelEpisodeItem>(selectedVowel);
  selectedRef.current = selectedVowel;
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
    registerOsc,
    playTone,
    playCutePop,
    playCartoonImpact,
    playCartoonSplat,
    playSuccessChime,
    speakKorean,
  } = useStickmanAudio();

  const playVowelActionSfx = useCallback(
    (actionType: VowelActionType, stage: 'start' | 'impact') => {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;

        if (actionType === 'cryingBaby') {
          if (stage === 'start') {
            playTone('sine', 560, 420, 0.24, 0.14, 0);
            playTone('sine', 580, 400, 0.26, 0.14, 0.35);
          } else {
            playTone('triangle', 460, 310, 0.35, 0.16, 0);
          }
        } else if (actionType === 'fieryBaseball') {
          if (stage === 'start') {
            playTone('sawtooth', 780, 220, 0.26, 0.15, 0);
          } else {
            playCartoonImpact();
            playTone('triangle', 620, 95, 0.22, 0.24, 0.02);
          }
        } else if (actionType === 'fishbowlFlood') {
          if (stage === 'impact') {
            playCartoonSplat();
            playTone('sine', 340, 820, 0.22, 0.14, 0.08);
            playTone('sine', 420, 960, 0.18, 0.12, 0.24);
          }
        } else if (actionType === 'foxFart') {
          if (stage === 'impact') {
            // Comical low tuba fart buzz
            playTone('sawtooth', 145, 58, 0.38, 0.24, 0);
            playTone('square', 92, 46, 0.32, 0.12, 0.06);
          }
        } else if (actionType === 'squidInk') {
          if (stage === 'impact') {
            playCartoonSplat();
            playTone('sine', 420, 150, 0.28, 0.16, 0.05);
          }
        } else if (actionType === 'giantYoyo') {
          if (stage === 'start') {
            playTone('sine', 320, 680, 0.25, 0.14, 0);
          } else {
            playCartoonImpact();
          }
        } else if (actionType === 'ufoAbduction') {
          if (stage === 'start' || stage === 'impact') {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.linearRampToValueAtTime(840, now + 0.55);
            lfo.frequency.setValueAtTime(14, now);
            lfoGain.gain.setValueAtTime(65, now);
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.72);
            osc.connect(gain);
            gain.connect(ctx.destination);
            registerOsc(lfo);
            registerOsc(osc);
            lfo.start(now);
            osc.start(now);
            lfo.stop(now + 0.74);
            osc.stop(now + 0.74);
          }
        } else if (actionType === 'sheetGhost') {
          if (stage === 'start') {
            playTone('sine', 440, 320, 0.45, 0.12, 0);
          } else {
            playCartoonImpact();
            playTone('sawtooth', 520, 160, 0.25, 0.16, 0);
          }
        } else if (actionType === 'spookyHouseSearch') {
          if (stage === 'start') {
            playTone('triangle', 190, 130, 0.5, 0.12, 0);
          } else {
            playTone('sawtooth', 280, 95, 0.3, 0.14, 0);
          }
        } else if (actionType === 'teethMonsterReunion') {
          if (stage === 'start') {
            // Creaking door + Teeth Monster chomping out
            playTone('triangle', 170, 260, 0.24, 0.13, 0);
            playTone('square', 230, 105, 0.14, 0.16, 0.32);
            playTone('square', 230, 105, 0.14, 0.16, 0.5);
          } else {
            // Flying kick SMASH + monster blasting off whistle
            playCartoonImpact();
            playTone('sawtooth', 520, 1280, 0.42, 0.16, 0.06);
          }
        }
      } catch {
        // Silent fallback
      }
    },
    [getAudioCtx, playCartoonImpact, playCartoonSplat, playSuccessChime, playTone, registerOsc]
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
      anim.walkX = ACTION_SPOT_X;
      anim.walkDir = 1;
    }
    anim.objectAppear = 0;
    anim.actionT = 0;
    anim.aftermathT = 0;
    anim.phaseElapsed = 0;
    phaseRef.current = 'walking';
    setPhase('walking');
  }, [clearAllTimers, stopAllAudio]);

  const startVowelPlayback = useCallback(
    (item: VowelEpisodeItem) => {
      const prevAction = selectedRef.current?.actionType;
      clearAllTimers();
      stopAllAudio();
      pausedRef.current = false;
      setIsPaused(false);
      setSelectedVowel(item);
      selectedRef.current = item;

      const anim = animRef.current;
      if (item.actionType === 'teethMonsterReunion' && prevAction === 'spookyHouseSearch') {
        // Seamless continuity from ㅡ (standing in front of haunted house at x=530) -> ㅣ (walk up to front door)
        anim.walkX = ACTION_SPOT_X + 240;
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

  const handleVowelClick = useCallback(
    (item: VowelEpisodeItem) => {
      allPlayRef.current = false;
      setIsAllPlayMode(false);
      startVowelPlayback(item);
    },
    [startVowelPlayback]
  );

  const toggleAllPlayMode = useCallback(() => {
    if (allPlayRef.current) {
      resetToWalking();
    } else {
      allPlayRef.current = true;
      setIsAllPlayMode(true);
      startVowelPlayback(VOWEL_EPISODES[0]);
    }
  }, [resetToWalking, startVowelPlayback]);

  const startVowelRef = useRef(startVowelPlayback);
  startVowelRef.current = startVowelPlayback;
  const resetToWalkingRef = useRef(resetToWalking);
  resetToWalkingRef.current = resetToWalking;

  useEffect(() => {
    if (autoStartAllPlay) {
      const id = window.setTimeout(() => {
        if (!allPlayRef.current) {
          allPlayRef.current = true;
          setIsAllPlayMode(true);
          startVowelRef.current(VOWEL_EPISODES[0]);
        }
      }, 120);
      return () => window.clearTimeout(id);
    } else if (allPlayRef.current) {
      resetToWalkingRef.current();
    }
  }, [autoStartAllPlay]);

  // Main 60fps animation loop
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
      const currentPhase = phaseRef.current;
      const item = selectedRef.current;

      if (currentPhase === 'walking') {
        anim.walkX += dt * 95 * anim.walkDir;
        if (anim.walkX >= RIGHT_EDGE_X) {
          anim.walkX = RIGHT_EDGE_X;
          anim.walkDir = -1;
        } else if (anim.walkX <= LEFT_EDGE_X) {
          anim.walkX = LEFT_EDGE_X;
          anim.walkDir = 1;
        }
      } else if (currentPhase === 'approaching') {
        anim.phaseElapsed += dt;
        const t = Math.min(anim.phaseElapsed / 0.95, 1);
        const eased = 1 - Math.pow(1 - t, 2.2);
        const approachTargetX = item.actionType === 'teethMonsterReunion' ? 678 : ACTION_SPOT_X;

        if (item.actionType !== 'teethMonsterReunion') {
          anim.worldScrollX += dt * 320;
        }
        anim.walkX = anim.approachStartX + (approachTargetX - anim.approachStartX) * eased;
        anim.objectAppear = eased;

        if (t >= 1) {
          anim.walkX = approachTargetX;
          anim.objectAppear = 1;
          anim.actionT = 0;
          anim.step1Triggered = false;
          anim.step2Triggered = false;
          anim.phaseElapsed = 0;
          phaseRef.current = 'action';
          setPhase('action');

          if (audioRef.current) {
            playVowelActionSfx(item.actionType, 'start');
          }
        }
      } else if (currentPhase === 'action') {
        anim.phaseElapsed += dt;
        const t = Math.min(anim.phaseElapsed / item.durationSec, 1);
        anim.actionT = t;

        if (t >= item.impactAt && !anim.step1Triggered) {
          anim.step1Triggered = true;
          if (audioRef.current) {
            playVowelActionSfx(item.actionType, 'impact');
          }
        }

        if (item.actionType === 'teethMonsterReunion' && t >= 0.78 && !anim.step2Triggered) {
          anim.step2Triggered = true;
          if (audioRef.current) {
            playSuccessChime();
          }
        }

        if (t >= 1) {
          anim.actionT = 1;
          anim.aftermathT = 0;
          anim.phaseElapsed = 0;
          phaseRef.current = 'aftermath';
          setPhase('aftermath');
        }
      } else if (currentPhase === 'aftermath') {
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
            speakKorean(cur.speakLine, 0.92, 1.0);
          }
        }
      } else if (currentPhase === 'reveal') {
        if (allPlayRef.current) {
          anim.phaseElapsed += dt;
          if (anim.phaseElapsed >= 3.0) {
            const curIdx = VOWEL_EPISODES.findIndex((v) => v.char === item.char);
            const nextItem = curIdx >= 0 ? VOWEL_EPISODES[curIdx + 1] : undefined;
            if (nextItem) {
              startVowelRef.current(nextItem);
            } else {
              resetToWalkingRef.current();
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
  }, [clearAllTimers, playSuccessChime, playVowelActionSfx, speakKorean]);

  const anim = animRef.current;
  const actionType = selectedVowel.actionType;
  const activeTheme: BackdropThemeKey =
    phase === 'walking' ? 'livingroom' : getVowelBackdropTheme(actionType);

  const isWalkingMotion =
    phase === 'walking' ||
    phase === 'approaching' ||
    (phase === 'action' && actionType === 'spookyHouseSearch' && anim.actionT < 0.72) ||
    (phase === 'action' && actionType === 'teethMonsterReunion' && anim.actionT >= 0.62 && anim.actionT < 0.78);

  const walkCycle = anim.walkTime * 9.5;
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  const scrollOffset = anim.worldScrollX;
  const approachTargetX = actionType === 'teethMonsterReunion' ? 678 : ACTION_SPOT_X;
  const jollaFacing =
    phase === 'walking'
      ? anim.walkDir
      : phase === 'approaching'
      ? approachTargetX >= anim.approachStartX
        ? 1
        : -1
      : 1;

  // Compute Jollaman transform, faceMode, stomachHole, flyingKick, stars
  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScaleX = 1;
  let jollaScaleY = 1;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let showDizzyStars = false;
  let stomachHole = false;
  let flyingKick = false;

  if (phase === 'walking' || phase === 'approaching') {
    jollaFaceMode = 'happy';
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (actionType) {
      case 'cryingBaby': {
        jollaFaceMode = t >= selectedVowel.impactAt ? 'parentTeary' : 'panic';
        break;
      }
      case 'fieryBaseball': {
        if (t < selectedVowel.impactAt) {
          jollaFaceMode = 'panic';
        } else {
          stomachHole = true;
          jollaFaceMode = 'dizzy';
          showDizzyStars = true;
          const shakeT = Math.min((t - selectedVowel.impactAt) / 0.35, 1);
          jollaX = ACTION_SPOT_X - Math.sin(shakeT * Math.PI) * 28;
          jollaRot = Math.sin(shakeT * Math.PI * 3) * 14;
        }
        break;
      }
      case 'fishbowlFlood': {
        jollaFaceMode = t >= selectedVowel.impactAt ? 'headClutch' : 'panic';
        if (t >= selectedVowel.impactAt) {
          jollaY = GROUND_Y - 54 + Math.sin(anim.walkTime * 8) * 3;
        }
        break;
      }
      case 'foxFart': {
        if (t < selectedVowel.impactAt) {
          jollaFaceMode = 'happy';
        } else {
          const dropT = Math.min((t - selectedVowel.impactAt) / 0.4, 1);
          jollaFaceMode = 'greenPoison';
          showDizzyStars = true;
          jollaRot = -dropT * 18;
          jollaY = GROUND_Y - 52 + dropT * 6;
        }
        break;
      }
      case 'squidInk': {
        jollaFaceMode = t >= selectedVowel.impactAt ? 'inked' : 'panic';
        break;
      }
      case 'giantYoyo': {
        if (t < selectedVowel.impactAt) {
          jollaFaceMode = 'panic';
        } else {
          const flyT = (t - selectedVowel.impactAt) / (1 - selectedVowel.impactAt);
          jollaX = ACTION_SPOT_X - flyT * 185;
          jollaY = GROUND_Y - 52 - Math.sin(flyT * Math.PI) * 115;
          jollaRot = -flyT * 720;
          jollaFaceMode = 'dizzy';
          showDizzyStars = true;
        }
        break;
      }
      case 'ufoAbduction': {
        jollaFaceMode = t >= selectedVowel.impactAt ? 'headClutch' : 'happy';
        break;
      }
      case 'sheetGhost': {
        if (t < selectedVowel.impactAt) {
          jollaFaceMode = 'parentTeary';
        } else {
          const jumpT = Math.min((t - selectedVowel.impactAt) / 0.32, 1);
          jollaY = GROUND_Y - 52 - Math.sin(jumpT * Math.PI) * 76 + (t > 0.72 ? 32 : 0);
          jollaRot = t > 0.72 ? -88 : 0;
          jollaFaceMode = t > 0.72 ? 'fainted' : 'panic';
          showDizzyStars = t > 0.72;
        }
        break;
      }
      case 'spookyHouseSearch': {
        jollaX = ACTION_SPOT_X + Math.min(t / 0.75, 1) * 240 + Math.sin(t * 72) * 3.5;
        jollaFaceMode = 'parentTeary';
        break;
      }
      case 'teethMonsterReunion': {
        if (t < 0.14) {
          // Opening the haunted house front door
          jollaX = 678;
          jollaFaceMode = 'parentTeary';
        } else if (t < 0.30) {
          // Startled recoil back as Teeth Monster leaps out of the door!
          const recoilP = Math.min((t - 0.14) / 0.14, 1);
          const easedRecoil = 1 - Math.pow(1 - recoilP, 2);
          jollaX = 678 - easedRecoil * 228;
          jollaY = GROUND_Y - 52 - Math.sin(recoilP * Math.PI) * 28;
          jollaFaceMode = 'panic';
        } else if (t < 0.62) {
          // Heroic Flying Kick (날라차기) leaping right into Teeth Monster!
          const kickP = (t - 0.30) / 0.32;
          flyingKick = kickP < 0.85;
          jollaX = 450 + Math.min(kickP / 0.52, 1) * 105 + Math.max(0, (kickP - 0.52) / 0.48) * 35;
          jollaY = GROUND_Y - 52 - Math.sin(kickP * Math.PI) * 84;
          jollaFaceMode = 'happy';
        } else if (t < 0.78) {
          // Running happily toward the rescued baby!
          const runP = (t - 0.62) / 0.16;
          jollaX = 590 + runP * 84;
          jollaFaceMode = 'happy';
        } else {
          // Happy ending celebration beside baby!
          jollaX = 674;
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 18)) * 9;
          jollaFaceMode = 'happy';
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (actionType) {
      case 'cryingBaby':
        jollaFaceMode = 'parentTeary';
        break;
      case 'fieryBaseball':
        stomachHole = true;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'fishbowlFlood':
        jollaFaceMode = 'headClutch';
        jollaY = GROUND_Y - 54 + Math.sin(anim.walkTime * 6) * 3;
        break;
      case 'foxFart':
        jollaFaceMode = 'greenPoison';
        jollaRot = -18;
        jollaY = GROUND_Y - 46;
        showDizzyStars = true;
        break;
      case 'squidInk':
        jollaFaceMode = 'inked';
        break;
      case 'giantYoyo':
        jollaX = 115;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ufoAbduction':
        jollaFaceMode = 'headClutch';
        break;
      case 'sheetGhost':
        jollaY = GROUND_Y - 20;
        jollaRot = -88;
        jollaFaceMode = 'fainted';
        showDizzyStars = true;
        break;
      case 'spookyHouseSearch':
        jollaX = ACTION_SPOT_X + 240;
        jollaFaceMode = 'parentTeary';
        break;
      case 'teethMonsterReunion':
        jollaX = 674;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(anim.walkTime * 7)) * 6;
        jollaFaceMode = 'happy';
        break;
    }
  }

  const i18nEntry = VOWEL_REVEAL_I18N[selectedVowel.char];
  const localizedMeaning = i18nEntry
    ? i18nEntry.meanings[lang] ?? i18nEntry.meanings.en
    : '';
  const revealSubtitle = i18nEntry
    ? `${i18nEntry.phonetic} · ${localizedMeaning} [${i18nEntry.wordRom}]`
    : '';

  return (
    <div className={`w-full flex flex-col gap-3 select-none ${className}`}>
      {/* Card / Modal Top Control Bar */}
      {!hideControlBar && (
        <StickmanControlBar
          title="졸라모음맨 (ㅏ ~ ㅣ)"
          icon="👶"
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
          allPlayIndex={VOWEL_EPISODES.findIndex((v) => v.char === selectedVowel.char)}
          allPlayTotal={VOWEL_EPISODES.length}
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
          aria-label="졸라맨 한글 모음 2D 시뮬레이션 무대"
        >
          <DynamicBackdrop
            idPrefix={uid}
            theme={activeTheme}
            scrollOffset={scrollOffset}
            walkTime={anim.walkTime}
          />

          {/* Floating Sky Vowels ㅏ ~ ㅣ */}
          {VOWEL_EPISODES.map((item, idx) => {
            const floatY = item.skyY + Math.sin(anim.walkTime * 2.2 + idx * 0.7) * 6.5;
            const isSelected = selectedVowel.char === item.char && phase !== 'walking';
            const isLearned = learnedChars.includes(item.char);

            return (
              <g
                key={item.char}
                transform={`translate(${item.skyX}, ${floatY}) scale(${isSelected ? 1.24 : 1})`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleVowelClick(item);
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

          {/* Scenario Props (Behind / Beside Jollaman) */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              {/* ㅏ: Crying Baby */}
              {actionType === 'cryingBaby' && (() => {
                const bx = phase === 'approaching' ? ACTION_SPOT_X + 260 - anim.objectAppear * 145 : ACTION_SPOT_X + 115;
                return (
                  <g transform={`translate(${bx}, ${GROUND_Y - 28})`}>
                    <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} mood="crying" />
                    {phase !== 'approaching' && (
                      <g transform="translate(0, -56)">
                        <rect x="-56" y="-18" width="112" height="28" rx="14" fill="#FFFFFF" stroke="#EC4899" strokeWidth="2.5" />
                        <text x="0" y="1" textAnchor="middle" fontSize="13" fontWeight="900" fill="#BE185D">
                          으앙~ 으앙~
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅑ: Baby + Fiery Baseball */}
              {actionType === 'fieryBaseball' && (() => {
                const bx = ACTION_SPOT_X + 245;
                const pitchDone = phase === 'aftermath' || phase === 'reveal';
                const t = anim.actionT;
                const ballFlying = phase === 'action' && t >= 0.14;
                const ballX = ballFlying
                  ? bx - ((t - 0.14) / 0.86) * 560
                  : bx - 22;
                const ballY = GROUND_Y - 54;
                return (
                  <g>
                    <g transform={`translate(${bx}, ${GROUND_Y - 28})`}>
                      <CuteCryingBabyJollamanSvg
                        walkTime={anim.walkTime}
                        mood={phase === 'action' && t < 0.25 ? 'throw' : 'happy'}
                      />
                    </g>
                    {!pitchDone && ballX > -60 && (
                      <g transform={`translate(${ballX}, ${ballY})`}>
                        <FieryBaseballSvg walkTime={anim.walkTime} />
                      </g>
                    )}
                    {phase === 'action' && t >= selectedVowel.impactAt && t < 0.72 && (
                      <text x={ACTION_SPOT_X} y={GROUND_Y - 108} textAnchor="middle" fontSize="28">
                        💥깡!!
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* ㅓ: Giant Fishbowl + Baby splashing inside */}
              {actionType === 'fishbowlFlood' && (() => {
                const fx = ACTION_SPOT_X + 185;
                const splashed =
                  (phase === 'action' && anim.actionT >= selectedVowel.impactAt) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const babyJumping = phase === 'action' && anim.actionT < selectedVowel.impactAt;
                const jumpP = babyJumping ? anim.actionT / selectedVowel.impactAt : 1;
                const babyX = babyJumping ? fx - 95 + jumpP * 95 : fx;
                const babyY = babyJumping
                  ? GROUND_Y - 28 - Math.sin(jumpP * Math.PI) * 95
                  : GROUND_Y - 46;
                return (
                  <g>
                    <g transform={`translate(${fx}, ${GROUND_Y - 56})`}>
                      <GiantFloorFishbowlSvg walkTime={anim.walkTime} cracked={splashed} />
                    </g>
                    <g transform={`translate(${babyX}, ${babyY})`}>
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} mood="happy" />
                    </g>
                    {splashed && (
                      <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 110})`}>
                        <rect x="-46" y="-18" width="92" height="28" rx="14" fill="#FFFFFF" stroke="#0EA5E9" strokeWidth="2.5" />
                        <text x="0" y="1" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0369A1">
                          안돼~!!
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅕ: Baby on leash with Nine-Tail Fox farting */}
              {actionType === 'foxFart' && (() => {
                const startOffset = phase === 'approaching' ? (1 - anim.objectAppear) * 260 : 0;
                const babyX = ACTION_SPOT_X + 245 + startOffset;
                const foxX = ACTION_SPOT_X + 150 + startOffset;
                const farting =
                  (phase === 'action' && anim.actionT >= 0.34) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                return (
                  <g>
                    {/* Leash connecting baby hand to fox */}
                    <path
                      d={`M${babyX - 18} ${GROUND_Y - 28} Q${(babyX + foxX) / 2} ${GROUND_Y - 10} ${foxX - 18} ${GROUND_Y - 24}`}
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="3"
                    />
                    <g transform={`translate(${foxX}, ${GROUND_Y - 42}) scale(-1, 1)`}>
                      <NineTailFoxSvg walkTime={anim.walkTime} farting={farting} />
                    </g>
                    <g transform={`translate(${babyX}, ${GROUND_Y - 28})`}>
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} mood="happy" />
                    </g>
                  </g>
                );
              })()}

              {/* ㅗ: Baby + Picture Book + Pop-out Squid */}
              {actionType === 'squidInk' && (() => {
                const bx = ACTION_SPOT_X + 195;
                const squidOut =
                  (phase === 'action' && anim.actionT >= 0.16) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const rise = phase === 'action' ? Math.min(anim.actionT / 0.38, 1) : 1;
                return (
                  <g>
                    <g transform={`translate(${bx + 55}, ${GROUND_Y - 28})`}>
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} mood="happy" />
                    </g>
                    <g transform={`translate(${bx - 12}, ${GROUND_Y - 24})`}>
                      <PictureBookSvg />
                    </g>
                    {squidOut && (
                      <g transform={`translate(${bx - 35}, ${GROUND_Y - 40 - rise * 78})`}>
                        <ComicSquidSvg walkTime={anim.walkTime} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅛ: Baby standing on sofa playing Giant Yoyo */}
              {actionType === 'giantYoyo' && (() => {
                const babySofaX = 490;
                const babySofaY = GROUND_Y - 128;
                const t = anim.actionT;
                let yoyoX = babySofaX - 24;
                let yoyoY = babySofaY + 18;
                if (phase === 'action') {
                  if (t < selectedVowel.impactAt) {
                    const p = t / selectedVowel.impactAt;
                    yoyoX = babySofaX - 24 - p * (babySofaX - 24 - ACTION_SPOT_X);
                    yoyoY = babySofaY + 18 + p * (GROUND_Y - 62 - (babySofaY + 18));
                  } else {
                    const ret = Math.min((t - selectedVowel.impactAt) / 0.45, 1);
                    yoyoX = ACTION_SPOT_X + ret * (babySofaX - 24 - ACTION_SPOT_X);
                    yoyoY = GROUND_Y - 62 + ret * (babySofaY + 18 - (GROUND_Y - 62));
                  }
                }
                return (
                  <g>
                    <g transform={`translate(${babySofaX}, ${babySofaY})`}>
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} mood="play" />
                    </g>
                    {/* Elastic yoyo string */}
                    <line
                      x1={babySofaX - 18}
                      y1={babySofaY + 4}
                      x2={yoyoX}
                      y2={yoyoY}
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                    />
                    <g transform={`translate(${yoyoX}, ${yoyoY})`}>
                      <GiantYoyoSvg walkTime={anim.walkTime} />
                    </g>
                  </g>
                );
              })()}

              {/* ㅜ: UFO Abducting Baby */}
              {actionType === 'ufoAbduction' && (() => {
                const beamActive = phase === 'action' && anim.actionT >= 0.14 && anim.actionT < 0.85;
                const abductedDone =
                  (phase === 'action' && anim.actionT >= 0.85) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const ufoX =
                  phase === 'approaching'
                    ? 880 - anim.objectAppear * 430
                    : abductedDone
                    ? 450 + (phase === 'action' ? ((anim.actionT - 0.85) / 0.15) * 650 : 650)
                    : 450;
                const ufoY =
                  phase === 'approaching'
                    ? 125
                    : abductedDone
                    ? 125 - (phase === 'action' ? ((anim.actionT - 0.85) / 0.15) * 180 : 180)
                    : 125 + Math.sin(anim.walkTime * 4) * 5;
                const liftP =
                  phase === 'action' && anim.actionT >= selectedVowel.impactAt
                    ? Math.min((anim.actionT - selectedVowel.impactAt) / 0.56, 1)
                    : 0;
                const babyY = GROUND_Y - 28 - liftP * 195;
                return (
                  <g>
                    {!abductedDone && (
                      <g transform={`translate(450, ${babyY})`}>
                        <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} mood="crying" />
                      </g>
                    )}
                    {ufoX < 1100 && (
                      <g transform={`translate(${ufoX}, ${ufoY})`}>
                        <ComicUfoSvg walkTime={anim.walkTime} beamActive={beamActive} />
                      </g>
                    )}
                    {(beamActive || abductedDone) && (
                      <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 112})`}>
                        <rect x="-54" y="-18" width="108" height="28" rx="14" fill="#FFFFFF" stroke="#10B981" strokeWidth="2.5" />
                        <text x="0" y="1" textAnchor="middle" fontSize="13" fontWeight="900" fill="#047857">
                          아기야~~!!
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅠ: Night Ghost sneaking behind Jollaman */}
              {actionType === 'sheetGhost' && (() => {
                const ghostAppear =
                  phase === 'approaching'
                    ? 0.25 + anim.objectAppear * 0.75
                    : 1;
                const gx =
                  phase === 'action' && anim.actionT < selectedVowel.impactAt
                    ? ACTION_SPOT_X - 180 + (anim.actionT / selectedVowel.impactAt) * 105
                    : ACTION_SPOT_X - 75;
                return (
                  <g opacity={ghostAppear}>
                    <g transform={`translate(${gx}, ${GROUND_Y - 72})`}>
                      <SheetGhostSvg walkTime={anim.walkTime} />
                    </g>
                    {phase === 'action' && anim.actionT < selectedVowel.impactAt && (
                      <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 108})`}>
                        <rect x="-54" y="-18" width="108" height="28" rx="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
                        <text x="0" y="1" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0369A1">
                          아기야~ ㅠㅠ
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅡ: Spooky House Search */}
              {actionType === 'spookyHouseSearch' && (
                <g>
                  <text x={ACTION_SPOT_X + 115} y={GROUND_Y - 125} fontSize="24" opacity="0.85">
                    💨
                  </text>
                  <text x={ACTION_SPOT_X + 390} y={GROUND_Y - 180} fontSize="22" opacity="0.85">
                    🦇
                  </text>
                  <g transform={`translate(${jollaX}, ${jollaY - 62})`}>
                    <rect x="-48" y="-18" width="96" height="28" rx="14" fill="#FFFFFF" stroke="#4F46E5" strokeWidth="2.5" />
                    <text x="0" y="1" textAnchor="middle" fontSize="13" fontWeight="900" fill="#3730A3">
                      으스스...
                    </text>
                  </g>
                </g>
              )}

              {/* ㅣ: Open House Door -> Teeth Monster Ambush -> Flying Kick Defeat -> Rescue Crying Baby Happy Ending */}
              {actionType === 'teethMonsterReunion' && (() => {
                const t = anim.actionT;
                // Haunted house door in DynamicBackdrop sits at x=724..768, y=244..334
                const doorOpenP =
                  phase === 'approaching'
                    ? 0
                    : phase === 'action'
                    ? Math.min(t / 0.14, 1)
                    : 1;
                const doorIsOpen = doorOpenP > 0.05;

                // Teeth Monster emerges only AFTER Jollaman opens the door (t >= 0.10), then gets flying-kicked away at t >= 0.46!
                const monsterActive = phase === 'action' && t >= 0.10 && t < 0.74;
                let mx = 746;
                let my = GROUND_Y - 62;
                let mRot = 0;
                let mScale = 0.55;
                if (phase === 'action' && t >= 0.10) {
                  if (t < 0.28) {
                    const outP = Math.min((t - 0.10) / 0.16, 1);
                    const easedOut = 1 - Math.pow(1 - outP, 2);
                    mx = 746 - easedOut * 144;
                    my = GROUND_Y - 62 - Math.sin(outP * Math.PI) * 26;
                    mScale = 0.55 + easedOut * 0.45;
                  } else if (t < 0.46) {
                    mx = 602 + Math.sin(t * 50) * 6;
                    my = GROUND_Y - 62;
                    mScale = 1;
                  } else {
                    // Blasted away by Jollaman's flying kick!
                    const blastP = Math.min((t - 0.46) / 0.26, 1);
                    mx = 602 + blastP * 490;
                    my = GROUND_Y - 62 - blastP * 380;
                    mRot = blastP * 900;
                    mScale = Math.max(0.15, 1 - blastP * 0.75);
                  }
                }

                const babyVisible =
                  (phase === 'action' && t >= 0.12) || phase === 'aftermath' || phase === 'reveal';
                const rescuedHappy =
                  (phase === 'action' && t >= 0.76) || phase === 'aftermath' || phase === 'reveal';
                const babyX =
                  phase === 'action' && t < 0.62
                    ? 746
                    : phase === 'action' && t < 0.78
                    ? 746 - ((t - 0.62) / 0.16) * 26
                    : 720;
                const babyY =
                  phase === 'action' && t < 0.62
                    ? GROUND_Y - 38
                    : GROUND_Y - 28 - (rescuedHappy ? Math.abs(Math.sin(anim.walkTime * 8)) * 5 : 0);

                return (
                  <g>
                    {/* Animated Haunted House Front Door Overlay at (724, 244, 44x90) */}
                    {doorIsOpen && (
                      <g>
                        {/* Dark open doorway interior */}
                        <rect
                          x="724"
                          y="244"
                          width="44"
                          height="90"
                          rx="2"
                          fill="#090D16"
                          stroke="#1E293B"
                          strokeWidth="2.5"
                        />
                        {/* Warm rescue glow once monster is defeated */}
                        {rescuedHappy && (
                          <rect
                            x="726"
                            y="246"
                            width="40"
                            height="86"
                            fill="#FDE68A"
                            opacity="0.22"
                          />
                        )}
                        {/* Swinging wooden door panel hinged on right edge (x=768) */}
                        <polygon
                          points={`${768},244 ${768 + doorOpenP * 34},${244 + doorOpenP * 8} ${768 + doorOpenP * 34},${334 + doorOpenP * 6} ${768},334`}
                          fill="#3B2F2F"
                          stroke="#1C1917"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx={768 + doorOpenP * 26}
                          cy={290 + doorOpenP * 5}
                          r="2.8"
                          fill="#F59E0B"
                        />
                      </g>
                    )}

                    {/* Crying baby inside the opened house -> rescued into joyful happy ending! */}
                    {babyVisible && (
                      <g>
                        <g transform={`translate(${babyX}, ${babyY})`}>
                          <CuteCryingBabyJollamanSvg
                            walkTime={anim.walkTime}
                            mood={rescuedHappy ? 'happy' : 'crying'}
                          />
                        </g>
                        {!rescuedHappy && phase === 'action' && t >= 0.16 && (
                          <g transform={`translate(${babyX}, ${babyY - 56})`}>
                            <rect x="-46" y="-16" width="92" height="24" rx="12" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2.2" />
                            <text x="0" y="0" textAnchor="middle" fontSize="12" fontWeight="900" fill="#0369A1">
                              으앙~ 무서워!
                            </text>
                          </g>
                        )}
                      </g>
                    )}

                    {/* Door creak cue while opening */}
                    {phase === 'action' && t < 0.15 && (
                      <g transform="translate(744, 224)">
                        <rect x="-40" y="-16" width="80" height="24" rx="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
                        <text x="0" y="0" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400E">
                          끼이익~
                        </text>
                      </g>
                    )}

                    {/* Teeth Monster bursting out & getting flying-kicked into the sky */}
                    {monsterActive && (
                      <g transform={`translate(${mx}, ${my}) rotate(${mRot}) scale(${mScale})`}>
                        <TeethMonsterSvg walkTime={anim.walkTime} chomping={t < 0.46} />
                      </g>
                    )}

                    {/* Flying kick impact comic burst */}
                    {phase === 'action' && t >= 0.44 && t < 0.62 && (
                      <g transform="translate(606, 266)">
                        <polygon
                          points="0,-34 11,-12 36,-18 18,2 34,24 10,14 -2,36 -12,13 -36,18 -18,-2 -34,-24 -10,-14"
                          fill="#FACC15"
                          stroke="#DC2626"
                          strokeWidth="3"
                        />
                        <text x="0" y="6" textAnchor="middle" fontSize="16" fontWeight="900" fill="#991B1B">
                          날라차기!
                        </text>
                      </g>
                    )}

                    {/* Monster blasted-off twinkle */}
                    {phase === 'action' && t >= 0.66 && t < 0.80 && (
                      <text x="940" y="72" textAnchor="middle" fontSize="28">
                        ✨💫
                      </text>
                    )}

                    {/* Happy Ending Celebration Hearts & Banner */}
                    {rescuedHappy && (
                      <g>
                        <text
                          x="697"
                          y={GROUND_Y - 120 + Math.sin(anim.walkTime * 6) * 6}
                          textAnchor="middle"
                          fontSize="26"
                        >
                          💖💕✨
                        </text>
                        <g transform="translate(697, 206)">
                          <rect x="-66" y="-17" width="132" height="28" rx="14" fill="#FFF1F2" stroke="#EC4899" strokeWidth="2.5" />
                          <text x="0" y="2" textAnchor="middle" fontSize="13" fontWeight="900" fill="#BE185D">
                            아기야! 해피엔딩 💖
                          </text>
                        </g>
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* Jollaman Stick Figure */}
          <g
            transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaScaleX * jollaFacing}, ${jollaScaleY})`}
            className="cursor-pointer"
          >
            <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
            {jollaRot === 0 && !flyingKick && (
              <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
            )}
            <JollamanCharacterSvg
              faceMode={jollaFaceMode}
              isWalking={isWalkingMotion}
              legSwing={legSwing}
              armSwing={armSwing}
              showDizzyStars={showDizzyStars}
              stomachHole={stomachHole}
              flyingKick={flyingKick}
              walkTime={anim.walkTime}
              activeChar={selectedVowel.char}
            />
          </g>

          {/* Foreground Overlays (Flood Water for ㅓ, Ink Blackout for ㅗ) */}
          {phase !== 'walking' && actionType === 'fishbowlFlood' &&
            ((phase === 'action' && anim.actionT >= selectedVowel.impactAt) ||
              phase === 'aftermath' ||
              phase === 'reveal') && (
              <WaterFloodOverlaySvg walkTime={anim.walkTime} level={1} />
            )}

          {phase !== 'walking' && actionType === 'squidInk' &&
            ((phase === 'action' && anim.actionT >= selectedVowel.impactAt) ||
              phase === 'aftermath' ||
              phase === 'reveal') && (
              <InkBlackoutOverlaySvg walkTime={anim.walkTime} opacity={0.9} />
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
                ? '하늘의 모음 (ㅏ ~ ㅣ)을 눌러보세요!'
                : `${selectedVowel.char} · ${selectedVowel.sound} · ${selectedVowel.triggerWord} (${localizedMeaning})`}
            </text>
          </g>
        </svg>

        {/* Pause Indicator Badge (Click anywhere on stage to resume) */}
        {isPaused && phase !== 'reveal' && (
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-md bg-slate-900/80 text-white text-xs sm:text-sm font-black shadow-md border border-white/25 whitespace-nowrap">
            ⏸ 일시정지 · 화면을 누르면 다시 재생
          </div>
        )}

        {/* Vowel Reveal Card Overlay */}
        {phase === 'reveal' && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 bg-transparent pointer-events-none"
            role="dialog"
            aria-label={`${selectedVowel.char} ${selectedVowel.sound}, ${selectedVowel.triggerWord} 학습 화면`}
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
                  color: selectedVowel.color,
                  WebkitTextStroke: '5px #FFFFFF',
                  paintOrder: 'stroke fill',
                  textShadow: '0 8px 24px rgba(15, 23, 42, 0.35)',
                }}
              >
                {selectedVowel.char}
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
                <span style={{ color: selectedVowel.color }}>{selectedVowel.char}</span>{' '}
                {selectedVowel.sound}, {selectedVowel.triggerWord}!!
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

export default StickmanMoeumSim;
