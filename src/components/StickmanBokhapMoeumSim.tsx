import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
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
  useStickmanAudio,
} from './stickmanShared';

export type CompoundVowelKey = 'ㅐ' | 'ㅒ' | 'ㅔ' | 'ㅖ' | 'ㅘ' | 'ㅙ' | 'ㅚ' | 'ㅝ' | 'ㅞ' | 'ㅟ' | 'ㅢ';

export interface CompoundVowelItem {
  char: CompoundVowelKey;
  sound: string;
  triggerWord: string;
  theme: Extract<BackdropThemeKey, 'pond' | 'beach' | 'town' | 'meadow'>;
  color: string;
  sky: [number, number];
  dur: number;
  setupAt: number;
  impactAt: number;
  splat?: boolean;
}

const EP4_ACTION_SPOT_X = 320;

export const COMPOUND_VOWELS: CompoundVowelItem[] = [
  { char: 'ㅐ', sound: '애', triggerWord: '개구리', theme: 'pond',   color: '#16A34A', sky: [75, 64],  dur: 2.65, setupAt: 0.16, impactAt: 0.80, splat: true },
  { char: 'ㅒ', sound: '얘', triggerWord: '얘기',   theme: 'town',   color: '#EC4899', sky: [160, 84], dur: 2.65, setupAt: 0.18, impactAt: 0.82 },
  { char: 'ㅔ', sound: '에', triggerWord: '게',     theme: 'beach',  color: '#EF4444', sky: [245, 62], dur: 2.85, setupAt: 0.24, impactAt: 0.66 },
  { char: 'ㅖ', sound: '예', triggerWord: '계란',   theme: 'meadow', color: '#F59E0B', sky: [330, 84], dur: 2.75, setupAt: 0.08, impactAt: 0.56 },
  { char: 'ㅘ', sound: '와', triggerWord: '사과',   theme: 'meadow', color: '#DC2626', sky: [415, 64], dur: 2.55, setupAt: 0.06, impactAt: 0.56 },
  { char: 'ㅙ', sound: '왜', triggerWord: '왜',     theme: 'town',   color: '#DB2777', sky: [500, 84], dur: 2.6,  setupAt: 0.06, impactAt: 0.44 },
  { char: 'ㅚ', sound: '외', triggerWord: '회오리', theme: 'town',   color: '#0EA5E9', sky: [585, 62], dur: 2.8,  setupAt: 0.06, impactAt: 0.82, splat: true },
  { char: 'ㅝ', sound: '워', triggerWord: '원숭이', theme: 'meadow', color: '#D97706', sky: [670, 84], dur: 2.85, setupAt: 0.08, impactAt: 0.46 },
  { char: 'ㅞ', sound: '웨', triggerWord: '웨딩',   theme: 'meadow', color: '#E11D48', sky: [755, 64], dur: 2.7,  setupAt: 0.06, impactAt: 0.42 },
  { char: 'ㅟ', sound: '위', triggerWord: '쥐',     theme: 'meadow', color: '#64748B', sky: [840, 84], dur: 2.75, setupAt: 0.14, impactAt: 0.64 },
  { char: 'ㅢ', sound: '의', triggerWord: '의자',   theme: 'town',   color: '#059669', sky: [925, 64], dur: 2.85, setupAt: 0.06, impactAt: 0.64 },
];

const EP4_REVEAL_I18N: Record<
  CompoundVowelKey,
  {
    phonetic: string;
    wordRom: string;
    rule: string;
    meanings: Record<StickmanLang, string>;
  }
> = {
  ㅐ: {
    phonetic: '[ae]',
    wordRom: 'gaeguri',
    rule: '복합모음 ㅏ + ㅣ → [ɛ] · 입을 조금 크게 벌려 발음',
    meanings: { en: 'frog', vi: 'con ếch', zh: '青蛙', ja: 'カエル', ru: 'лягушка', mn: 'мэлхий', bn: 'ব্যাঙ' },
  },
  ㅒ: {
    phonetic: '[yae]',
    wordRom: 'yaegi',
    rule: '이중모음 ㅑ + ㅣ → [jɛ] · 짧게 [j]를 더해 발음',
    meanings: { en: 'story / talk', vi: 'câu chuyện', zh: '谈话', ja: '話', ru: 'разговор', mn: 'яриа', bn: 'গল্প / কথা' },
  },
  ㅔ: {
    phonetic: '[e]',
    wordRom: 'ge',
    rule: '복합모음 ㅓ + ㅣ → [e] · ㅐ보다 입을 살짝 덜 벌려 발음',
    meanings: { en: 'crab', vi: 'con cua', zh: '螃蟹', ja: 'カニ', ru: 'краб', mn: 'хавч', bn: 'কাঁকড়া' },
  },
  ㅖ: {
    phonetic: '[ye]',
    wordRom: 'gyeran',
    rule: '이중모음 ㅕ + ㅣ → [je] · 반모음 [j] + [e] 결합',
    meanings: { en: 'egg', vi: 'quả trứng', zh: '鸡蛋', ja: '卵', ru: 'яйцо', mn: 'өндөг', bn: 'ডিম' },
  },
  ㅘ: {
    phonetic: '[wa]',
    wordRom: 'sagwa',
    rule: '이중모음 ㅗ + ㅏ → [wa] · 입술을 오므렸다 크게 벌려 발음',
    meanings: { en: 'apple', vi: 'quả táo', zh: '苹果', ja: 'リンゴ', ru: 'яблоко', mn: 'алим', bn: 'আপেল' },
  },
  ㅙ: {
    phonetic: '[wae]',
    wordRom: 'wae',
    rule: '복합모음 ㅗ + ㅐ → [wɛ] · [w] 뒤 입을 벌려 발음',
    meanings: { en: 'why', vi: 'tại sao', zh: '为什么', ja: 'なぜ', ru: 'почему', mn: 'яагаад', bn: 'কেন' },
  },
  ㅚ: {
    phonetic: '[oe / we]',
    wordRom: 'hoeori',
    rule: '복합모음 ㅗ + ㅣ → [we] · 현대 한국어에서는 [we]로 발음',
    meanings: { en: 'whirlwind', vi: 'lốc xoáy', zh: '龙卷风', ja: 'つむじ風', ru: 'вихрь', mn: 'хуй салхи', bn: 'ঘূর্ণিঝড়' },
  },
  ㅝ: {
    phonetic: '[wo]',
    wordRom: 'wonsungi',
    rule: '복합모음 ㅜ + ㅓ → [wʌ] · 입술을 내밀었다 뒤로 벌려 발음',
    meanings: { en: 'monkey', vi: 'con khỉ', zh: '猴子', ja: 'サル', ru: 'обезьяна', mn: 'сармагчин', bn: 'বানর' },
  },
  ㅞ: {
    phonetic: '[we]',
    wordRom: 'weding',
    rule: '복합모음 ㅜ + ㅔ → [we] · [w] 뒤에 [e]를 이어 발음',
    meanings: { en: 'wedding', vi: 'đám cưới', zh: '婚礼', ja: 'ウェディング', ru: 'свадьба', mn: 'хурим', bn: 'বিয়ে' },
  },
  ㅟ: {
    phonetic: '[wi]',
    wordRom: 'jwi',
    rule: '복합모음 ㅜ + ㅣ → [wi] · 입술을 오므렸다 옆으로 당겨 발음',
    meanings: { en: 'mouse / rat', vi: 'con chuột', zh: '老鼠', ja: 'ネズミ', ru: 'мышь', mn: 'хулгана', bn: 'ইঁদুর' },
  },
  ㅢ: {
    phonetic: '[ui]',
    wordRom: 'uija',
    rule: '복합모음 ㅡ + ㅣ → [ɰi] · ㅡ에서 ㅣ로 자연스럽게 이어 발음',
    meanings: { en: 'chair', vi: 'cái ghế', zh: '椅子', ja: '椅子', ru: 'стул', mn: 'сандал', bn: 'চেয়ার' },
  },
};

// ============================================================================
// HIGH-CRAFT ANIMATED CARTOON CHARACTERS & PROPS FOR EPISODE 4
// ============================================================================

export const GirlfriendJollamanSvg: React.FC<{
  walkTime: number;
  isWalking?: boolean;
  mood?:
    | 'happy'
    | 'shock'
    | 'shout'
    | 'angry'
    | 'crying'
    | 'swing'
    | 'sitting'
    | 'holdingTube'
    | 'handkerchief'
    | 'stomp'
    | 'shakeTree'
    | 'point';
}> = ({ walkTime, isWalking = false, mood = 'happy' }) => {
  const legSwing = isWalking ? Math.sin(walkTime * 11) * 14 : 0;
  const armSwing = isWalking ? Math.sin(walkTime * 11 + Math.PI) * 12 : 0;
  const hairSway = Math.sin(walkTime * (isWalking ? 11 : 4.5)) * (isWalking ? 8 : 3.5);
  const skirtSway = isWalking ? Math.sin(walkTime * 11) * 3 : 0;
  const waveHand = Math.sin(walkTime * 14) * 5;

  return (
    <g>
      {/* Legs */}
      {mood === 'sitting' ? (
        <g>
          <path d="M-4 14 L-18 18 L-20 42" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="-24" cy="44" rx="7.5" ry="4" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
          <path d="M4 14 L-10 18 L-12 42" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="-16" cy="44" rx="7.5" ry="4" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
        </g>
      ) : mood === 'stomp' ? (
        <g>
          <line x1="-3" y1="16" x2="-9" y2="46" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
          <ellipse cx="-12" cy="48" rx="7.5" ry="4.2" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
          <path d="M4 16 L15 31 L24 46" fill="none" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="27" cy="47" rx="9.5" ry="5" fill="#EC4899" stroke="#0F172A" strokeWidth="2.2" />
          <path d="M14 48 L38 48" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
        </g>
      ) : (
        <g>
          <line x1="-3" y1="16" x2={-5 + legSwing} y2="46" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
          <ellipse cx={-5 + legSwing - 2} cy="48" rx="7.5" ry="4" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
          <line x1="3" y1="16" x2={5 - legSwing} y2="46" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
          <ellipse cx={5 - legSwing - 2} cy="48" rx="7.5" ry="4" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
        </g>
      )}

      {/* Detailed Pink One-Piece Dress with Pleated Hem & White Collar */}
      <path
        d={`M-7 -18 L7 -18 L${20 + skirtSway} 18 Q10 23 0 19 Q-10 23 ${-20 + skirtSway} 18 Z`}
        fill="#F472B6"
        stroke="#BE185D"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M-8 -16 Q0 -10 8 -16" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M-11 2 Q0 6 11 2" fill="none" stroke="#BE185D" strokeWidth="1.8" opacity="0.65" />

      {/* Arms */}
      {mood === 'swing' ? (
        <g>
          <line x1="-6" y1="-10" x2="-32" y2="-16" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
          <circle cx="-32" cy="-16" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
          {/* Striped Swim Tube Baseball Swing */}
          <g transform="translate(-44, -18) rotate(-18)">
            <circle cx="0" cy="0" r="18" fill="none" stroke="#F43F5E" strokeWidth="10" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeDasharray="11 11" />
            <circle cx="0" cy="0" r="23" fill="none" stroke="#BE123C" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="13" fill="none" stroke="#BE123C" strokeWidth="1.8" />
          </g>
          <line x1="5" y1="-10" x2="18" y2="4" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
        </g>
      ) : mood === 'holdingTube' ? (
        <g>
          <line x1="-4" y1="-10" x2="-22" y2="-2" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="-29" cy="-1" r="14" fill="none" stroke="#FB7185" strokeWidth="8" />
          <circle cx="-29" cy="-1" r="14" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeDasharray="9 9" />
          <line x1="4" y1="-10" x2="16" y2="8" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
        </g>
      ) : mood === 'handkerchief' ? (
        <g>
          <path d={`M-4 -10 L-18 -14 L-26 ${-18 + waveHand * 0.4}`} fill="none" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
          <path
            d={`M-26 ${-18 + waveHand * 0.4} Q-38 ${-24 + waveHand * 0.6} -40 ${-10 + waveHand * 0.5} Q-32 -6 -24 ${-12 + waveHand * 0.4} Z`}
            fill="#FFFFFF"
            stroke="#60A5FA"
            strokeWidth="2"
          />
          <line x1="4" y1="-10" x2="18" y2="8" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
        </g>
      ) : mood === 'shakeTree' ? (
        <g>
          <line x1="-5" y1="-10" x2={-28 + waveHand * 0.8} y2="-18" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
          <circle cx={-28 + waveHand * 0.8} cy="-18" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
          <line x1="2" y1="-10" x2={-24 + waveHand * 0.8} y2="-4" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
          <circle cx={-24 + waveHand * 0.8} cy="-4" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
        </g>
      ) : mood === 'point' ? (
        <g>
          <line x1="-5" y1="-10" x2="-30" y2="-8" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
          <circle cx="-31" cy="-8" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
          <line x1="5" y1="-10" x2="17" y2="9" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
        </g>
      ) : mood === 'shout' ? (
        <g>
          <path d={`M-5 -10 L-22 ${-22 + waveHand * 0.6}`} fill="none" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
          <circle cx="-22" cy={-22 + waveHand * 0.6} r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
          <path d={`M5 -10 L22 ${-18 - waveHand * 0.6}`} fill="none" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
          <circle cx="22" cy={-18 - waveHand * 0.6} r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
        </g>
      ) : (
        <g>
          <line x1="-4" y1="-10" x2={-18 - armSwing * 0.6} y2={mood === 'shock' ? -24 : 8} stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx={-18 - armSwing * 0.6} cy={mood === 'shock' ? -24 : 8} r="3.8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
          <line x1="4" y1="-10" x2={18 + armSwing * 0.6} y2={mood === 'shock' ? -24 : 8} stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx={18 + armSwing * 0.6} cy={mood === 'shock' ? -24 : 8} r="3.8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
        </g>
      )}

      {/* Flowing Animated Ponytail */}
      <path
        d={`M11 -40 Q${28 + hairSway * 0.5} -44 ${26 + hairSway} -20 Q${18 + hairSway * 0.4} -24 14 -34 Z`}
        fill="#0F172A"
      />

      {/* Pink Hair Ribbon with Tails */}
      <g transform="translate(11, -46)">
        <polygon points="0,0 -9,-6 -8,6" fill="#EC4899" stroke="#9D174D" strokeWidth="1.6" strokeLinejoin="round" />
        <polygon points="0,0 9,-6 8,6" fill="#EC4899" stroke="#9D174D" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="0" cy="0" r="3.2" fill="#FDE047" stroke="#9D174D" strokeWidth="1.2" />
      </g>

      {/* Head */}
      <circle cx="0" cy="-35" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />

      {/* Cute side bangs */}
      <path d="M-12 -43 Q-4 -49 6 -45" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />

      {/* Eyes & Mouth */}
      {mood === 'shock' ? (
        <>
          <circle cx="-5" cy="-37" r="2.8" fill="#0F172A" />
          <circle cx="5" cy="-37" r="2.8" fill="#0F172A" />
          <circle cx="-4" cy="-38" r="1" fill="#FFFFFF" />
          <circle cx="6" cy="-38" r="1" fill="#FFFFFF" />
          <ellipse cx="0" cy="-26" rx="4.2" ry="5.4" fill="#EF4444" stroke="#0F172A" strokeWidth="1.5" />
        </>
      ) : mood === 'shout' || mood === 'angry' ? (
        <>
          <path d="M-8 -42 L-2 -39 M8 -42 L2 -39" stroke="#0F172A" strokeWidth="2.1" strokeLinecap="round" />
          <circle cx="-5" cy="-36" r="2.4" fill="#0F172A" />
          <circle cx="5" cy="-36" r="2.4" fill="#0F172A" />
          <ellipse cx="-2" cy="-26" rx="5.5" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.6" />
          {/* Comic anger vein */}
          <path d="M12 -48 L15 -45 M15 -48 L12 -45" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : mood === 'crying' ? (
        <>
          <path d="M-8 -40 L-3 -37 L-8 -34" fill="none" stroke="#0F172A" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M8 -40 L3 -37 L8 -34" fill="none" stroke="#0F172A" strokeWidth="2.1" strokeLinecap="round" />
          <path d="M-6 -33 Q-7 -24 -6 -16" fill="none" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M6 -33 Q7 -24 6 -16" fill="none" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M-4 -26 Q0 -29 4 -26" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="-5" cy="-36" r="2.5" fill="#0F172A" />
          <circle cx="5" cy="-36" r="2.5" fill="#0F172A" />
          <circle cx="-4.2" cy="-37" r="0.9" fill="#FFFFFF" />
          <circle cx="5.8" cy="-37" r="0.9" fill="#FFFFFF" />
          <ellipse cx="-9" cy="-31" rx="3.4" ry="2" fill="#FDA4AF" />
          <ellipse cx="9" cy="-31" rx="3.4" ry="2" fill="#FDA4AF" />
          <path d="M-5 -29 Q0 -24 5 -29" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
    </g>
  );
};

// ㅐ: Detailed Giant Bullfrog on Lily Pad with Puffing Vocal Sac & Muscular Legs
const GiantPondFrogSvg: React.FC<{ walkTime: number; puffed?: boolean; mouthOpen?: boolean }> = ({
  walkTime,
  puffed = false,
  mouthOpen = false,
}) => {
  const breathe = Math.sin(walkTime * 8) * 2.2;
  const puffScale = puffed ? 1.16 + Math.sin(walkTime * 18) * 0.05 : 1;
  const blink = Math.abs(Math.sin(walkTime * 1.9)) < 0.08;

  return (
    <g>
      {/* Veined Notched Lily Pad + Pink Lotus Flower */}
      <g transform="translate(4, 24)">
        <ellipse cx="0" cy="4" rx="58" ry="14" fill="#0284C7" opacity="0.24" />
        <path
          d="M-50 0 Q-50 -14 0 -13 Q44 -13 52 -2 L24 1 L48 7 Q28 15 -4 14 Q-48 13 -50 0 Z"
          fill="#22C55E"
          stroke="#15803D"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <path d="M-38 0 L8 0 M-24 -8 L4 0 M-22 8 L4 0 M10 -9 L8 0" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" />
        {/* Tiny pink water lily bloom */}
        <g transform="translate(38, -8)">
          <ellipse cx="-7" cy="0" rx="6" ry="3.5" transform="rotate(-24, -7, 0)" fill="#F9A8D4" stroke="#DB2777" strokeWidth="1.4" />
          <ellipse cx="7" cy="0" rx="6" ry="3.5" transform="rotate(24, 7, 0)" fill="#F9A8D4" stroke="#DB2777" strokeWidth="1.4" />
          <ellipse cx="0" cy="-3" rx="5.5" ry="4" fill="#F472B6" stroke="#BE185D" strokeWidth="1.4" />
          <circle cx="0" cy="-2" r="2.2" fill="#FDE047" />
        </g>
      </g>

      {/* Plump Cartoon Frog Body */}
      <g transform={`scale(${puffScale}) translate(0, ${-breathe * 0.4})`}>
        {/* Muscular folded back hind leg (right side) */}
        <path
          d="M14 4 Q42 -10 44 12 Q45 24 22 22 Z"
          fill="#16A34A"
          stroke="#14532D"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Webbed back foot */}
        <path
          d="M20 22 L44 20 L38 26 L48 27 L34 30 L18 26 Z"
          fill="#4ADE80"
          stroke="#14532D"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />

        {/* Main rounded frog torso */}
        <path
          d="M-36 10 Q-42 -22 -14 -26 Q18 -30 34 -4 Q40 20 12 24 Q-26 26 -36 10 Z"
          fill="#22C55E"
          stroke="#14532D"
          strokeWidth="3.2"
        />

        {/* Darker back spots */}
        <ellipse cx="14" cy="-12" rx="6.5" ry="4.5" transform="rotate(18, 14, -12)" fill="#15803D" opacity="0.7" />
        <ellipse cx="24" cy="-2" rx="5" ry="3.5" transform="rotate(26, 24, -2)" fill="#15803D" opacity="0.7" />
        <circle cx="4" cy="-17" r="3.5" fill="#15803D" opacity="0.65" />

        {/* Cream soft belly + inflating vocal throat sac */}
        <path
          d={`M-34 8 Q-20 26 10 22 Q-2 6 -24 2 Z`}
          fill="#FEF9C3"
          stroke="#15803D"
          strokeWidth="1.8"
        />
        {puffed && (
          <ellipse
            cx="-28"
            cy="12"
            rx={15 + Math.sin(walkTime * 22) * 3}
            ry={12 + Math.sin(walkTime * 22) * 2.5}
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="2.4"
          />
        )}

        {/* Front webbed legs bracing forward */}
        <path d="M-24 12 L-34 25 L-42 26 M-34 25 L-37 30 M-34 25 L-29 29" fill="none" stroke="#14532D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M-4 15 L-10 26 L-18 28 M-10 26 L-11 31 M-10 26 L-4 30" fill="none" stroke="#14532D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Big Bulgy Expressive Frog Eyes */}
        <g transform="translate(-22, -26)">
          <circle cx="0" cy="0" r="12.5" fill="#4ADE80" stroke="#14532D" strokeWidth="2.8" />
          <circle cx="-1.5" cy="-1" r="8.8" fill="#FFFFFF" stroke="#14532D" strokeWidth="2" />
          {blink ? (
            <line x1="-8" y1="-1" x2="6" y2="-1" stroke="#14532D" strokeWidth="2.6" strokeLinecap="round" />
          ) : (
            <>
              <circle cx="-3.5" cy="-1" r="4.4" fill="#0F172A" />
              <circle cx="-5" cy="-3" r="1.7" fill="#FFFFFF" />
            </>
          )}
        </g>
        <g transform="translate(2, -28)">
          <circle cx="0" cy="0" r="12.5" fill="#4ADE80" stroke="#14532D" strokeWidth="2.8" />
          <circle cx="-1.5" cy="-1" r="8.8" fill="#FFFFFF" stroke="#14532D" strokeWidth="2" />
          {blink ? (
            <line x1="-8" y1="-1" x2="6" y2="-1" stroke="#14532D" strokeWidth="2.6" strokeLinecap="round" />
          ) : (
            <>
              <circle cx="-3.5" cy="-1" r="4.4" fill="#0F172A" />
              <circle cx="-5" cy="-3" r="1.7" fill="#FFFFFF" />
            </>
          )}
        </g>

        {/* Nostrils & Rosy Cheek */}
        <circle cx="-31" cy="-9" r="1.7" fill="#14532D" />
        <circle cx="-24" cy="-9" r="1.7" fill="#14532D" />
        <ellipse cx="-6" cy="-5" rx="5.5" ry="3.2" fill="#FDA4AF" opacity="0.72" />

        {/* Expressive Frog Mouth */}
        {mouthOpen ? (
          <path
            d="M-38 -2 Q-24 14 -6 2 Q-22 -6 -38 -2 Z"
            fill="#991B1B"
            stroke="#14532D"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        ) : (
          <path d="M-37 0 Q-22 9 -5 1" fill="none" stroke="#14532D" strokeWidth="2.8" strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

// ㅔ: Detailed Scuttling King Crab with Articulated Legs, Eye Stalks & Snapping Claws
const DetailedBeachCrabSvg: React.FC<{ walkTime: number; snapping?: boolean }> = ({
  walkTime,
  snapping = false,
}) => {
  const scuttle = Math.sin(walkTime * 22) * 6;
  const clawAngle = snapping ? Math.abs(Math.sin(walkTime * 26)) * 22 : 12;

  return (
    <g>
      {/* 6 Articulated Jointed Crab Legs */}
      {[-1, 1].map((side) => (
        <g key={side} transform={`scale(${side}, 1)`}>
          <path d={`M18 4 L34 2 L42 ${15 + scuttle * side}`} fill="none" stroke="#B91C1C" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M20 9 L36 10 L44 ${22 - scuttle * side}`} fill="none" stroke="#B91C1C" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M16 14 L30 18 L36 ${27 + scuttle * side}`} fill="none" stroke="#B91C1C" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}

      {/* Giant Left Snapping Pincer Claw */}
      <g transform="translate(-24, -6)">
        <path d="M4 6 Q-12 2 -16 -10" fill="none" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
        <g transform={`translate(-16, -12) rotate(${-18 - clawAngle * 0.5})`}>
          <path d="M0 0 Q-16 -14 -4 -26 Q6 -20 4 -6 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.4" strokeLinejoin="round" />
        </g>
        <g transform={`translate(-16, -12) rotate(${12 + clawAngle * 0.5})`}>
          <path d="M0 0 Q-18 4 -12 -12 Q-2 -10 2 -2 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.4" strokeLinejoin="round" />
        </g>
      </g>

      {/* Giant Right Snapping Pincer Claw */}
      <g transform="translate(24, -6) scale(-1, 1)">
        <path d="M4 6 Q-12 2 -16 -10" fill="none" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
        <g transform={`translate(-16, -12) rotate(${-18 - clawAngle * 0.5})`}>
          <path d="M0 0 Q-16 -14 -4 -26 Q6 -20 4 -6 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.4" strokeLinejoin="round" />
        </g>
        <g transform={`translate(-16, -12) rotate(${12 + clawAngle * 0.5})`}>
          <path d="M0 0 Q-18 4 -12 -12 Q-2 -10 2 -2 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.4" strokeLinejoin="round" />
        </g>
      </g>

      {/* Tall Expressive Eye Stalks */}
      <line x1="-10" y1="-12" x2="-14" y2="-27" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
      <line x1="10" y1="-12" x2="14" y2="-27" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
      <circle cx="-14" cy="-28" r="6.5" fill="#FFFFFF" stroke="#7F1D1D" strokeWidth="2.2" />
      <circle cx="14" cy="-28" r="6.5" fill="#FFFFFF" stroke="#7F1D1D" strokeWidth="2.2" />
      <circle cx="-15.5" cy="-28" r="2.8" fill="#0F172A" />
      <circle cx="12.5" cy="-28" r="2.8" fill="#0F172A" />
      <circle cx="-16.3" cy="-29.2" r="1" fill="#FFFFFF" />
      <circle cx="11.7" cy="-29.2" r="1" fill="#FFFFFF" />
      {/* Mischievous angry brow on stalks */}
      <path d="M-20 -34 L-9 -31 M20 -34 L9 -31" stroke="#7F1D1D" strokeWidth="2.2" strokeLinecap="round" />

      {/* Domed Patterned Crimson Carapace */}
      <path
        d="M-28 4 Q-28 -18 0 -18 Q28 -18 28 4 Q24 18 0 18 Q-24 18 -28 4 Z"
        fill="#EF4444"
        stroke="#7F1D1D"
        strokeWidth="3"
      />
      <ellipse cx="-8" cy="-8" rx="9" ry="4" transform="rotate(-14, -8, -8)" fill="#FCA5A5" opacity="0.65" />
      <path d="M-16 6 Q0 12 16 6" fill="none" stroke="#991B1B" strokeWidth="2.2" strokeLinecap="round" />
      {/* Cheeky grin */}
      <path d="M-8 1 Q0 6 8 1" fill="none" stroke="#450A0A" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
};

// ㅖ: Fluffy Animated Farm Hen in Straw Nest
const FluffyFarmHenSvg: React.FC<{ walkTime: number; laying?: boolean }> = ({
  walkTime,
  laying = false,
}) => {
  const flap = laying ? Math.sin(walkTime * 34) * 20 : Math.sin(walkTime * 6) * 4;
  const bob = laying ? Math.abs(Math.sin(walkTime * 18)) * 5 : 0;

  return (
    <g>
      {/* Woven Golden Straw Nest */}
      <ellipse cx="2" cy="24" rx="44" ry="13" fill="#D97706" stroke="#78350F" strokeWidth="2.6" />
      <path d="M-36 22 Q-18 30 0 24 Q18 31 36 22" fill="none" stroke="#FDE68A" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M-28 28 Q0 34 28 28" fill="none" stroke="#92400E" strokeWidth="2.4" strokeLinecap="round" />

      <g transform={`translate(0, ${-bob})`}>
        {/* Tail Feathers fanning up on right */}
        <path
          d="M22 -4 Q44 -28 38 -6 Q52 -16 40 4 Q50 4 32 14 Z"
          fill="#F8FAFC"
          stroke="#0F172A"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Plump Scalloped White Hen Body */}
        <path
          d="M-30 8 Q-34 -16 -12 -20 Q16 -22 30 -4 Q36 16 14 22 Q-18 24 -30 8 Z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="3.2"
        />
        {/* Soft belly shadow */}
        <path d="M-22 14 Q2 23 24 12" fill="none" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />

        {/* Flapping Feathered Wing */}
        <path
          d="M-4 -4 Q16 -10 22 4 Q14 14 -2 10 Z"
          transform={`rotate(${flap}, 2, 0)`}
          fill="#F1F5F9"
          stroke="#0F172A"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />

        {/* Head & Neck */}
        <g transform="translate(-24, -18)">
          {/* Bright Red Scalloped Comb */}
          <path
            d="M-8 -12 Q-12 -26 -3 -20 Q2 -30 8 -18 Q16 -24 12 -10 Z"
            fill="#EF4444"
            stroke="#991B1B"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="0" cy="0" r="14.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          {/* Angry / Fierce Mother Hen Eye */}
          <path d="M-9 -7 L1 -3" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="-4" cy="-1" r="2.8" fill="#0F172A" />
          <circle cx="-4.8" cy="-2" r="1" fill="#FFFFFF" />
          {/* Open Clucking Beak */}
          <polygon points="-13,-3 -27,-8 -13,2" fill="#F59E0B" stroke="#92400E" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="-13,2 -24,9 -12,6" fill="#D97706" stroke="#92400E" strokeWidth="2" strokeLinejoin="round" />
          {/* Red Wattle */}
          <ellipse cx="-11" cy="11" rx="4.2" ry="5.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.8" />
        </g>
      </g>
    </g>
  );
};

// ㅘ: Rich Lush Cartoon Apple Tree with Bark Grain, Roots, Layered Foliage & Glossy Apples
const LushAppleTreeSvg: React.FC<{ walkTime: number; shake?: number; showCenterApple?: boolean }> = ({
  walkTime,
  shake = 0,
  showCenterApple = true,
}) => {
  const leafFlutter = Math.sin(walkTime * 5) * 2;
  return (
    <g>
      {/* Tree ground shadow */}
      <ellipse cx="0" cy="6" rx="76" ry="12" fill="#14532D" opacity="0.22" />

      {/* Gnarled Wooden Trunk with Roots & Branching Fork */}
      <path
        d="M-34 4 Q-18 -8 -16 -46 L-18 -134 L-44 -162 L-30 -168 L-6 -144 L10 -144 L36 -166 L46 -156 L18 -130 L16 -44 Q18 -6 36 4 Q12 -2 0 4 Q-14 -2 -34 4 Z"
        fill="#854D0E"
        stroke="#451A03"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Bark grain lines & wood knot */}
      <path d="M-8 -118 Q-5 -82 -9 -40 M6 -108 Q9 -72 5 -26" fill="none" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="0" cy="-70" rx="5.5" ry="9" fill="#713F12" stroke="#451A03" strokeWidth="1.8" />

      {/* Lush Multi-Layered Scalloped Foliage Canopy (sways with shake) */}
      <g transform={`translate(${shake}, ${leafFlutter * 0.4})`}>
        {/* Deep shadow foliage back layer */}
        <path
          d="M-98 -154 Q-118 -196 -74 -216 Q-58 -258 -6 -254 Q46 -264 76 -218 Q120 -202 98 -152 Q110 -114 62 -114 Q26 -100 -10 -114 Q-58 -98 -86 -122 Q-112 -128 -98 -154 Z"
          fill="#15803D"
          stroke="#14532D"
          strokeWidth="3.4"
          strokeLinejoin="round"
        />
        {/* Mid-tone vibrant emerald clusters */}
        <path
          d="M-82 -162 Q-92 -204 -52 -214 Q-34 -248 12 -242 Q56 -244 74 -204 Q102 -186 80 -146 Q56 -120 12 -126 Q-28 -116 -64 -132 Q-92 -136 -82 -162 Z"
          fill="#22C55E"
        />
        {/* Sunlit upper leaf crown highlights */}
        <path
          d="M-54 -206 Q-34 -236 6 -232 Q42 -232 54 -202 Q26 -190 -8 -194 Q-36 -188 -54 -206 Z"
          fill="#4ADE80"
          opacity="0.72"
        />
        <ellipse cx="-52" cy="-168" rx="22" ry="14" fill="#4ADE80" opacity="0.52" />
        <ellipse cx="48" cy="-166" rx="20" ry="13" fill="#4ADE80" opacity="0.52" />

        {/* Glossy Hanging Red Apples with Stems & Leaves */}
        {[
          { x: -56, y: -158 },
          { x: 52, y: -154 },
          { x: -24, y: -206 },
          { x: 26, y: -198 },
          ...(showCenterApple ? [{ x: 0, y: -148 }] : []),
        ].map((ap, i) => (
          <g key={i} transform={`translate(${ap.x}, ${ap.y})`}>
            <path d="M0 -11 Q2 -18 6 -17" fill="none" stroke="#451A03" strokeWidth="2.4" strokeLinecap="round" />
            <ellipse cx="7" cy="-15" rx="6" ry="3.2" transform="rotate(-24, 7, -15)" fill="#86EFAC" stroke="#15803D" strokeWidth="1.4" />
            <path
              d="M0 -10 C-9 -13 -14 -3 -11 6 C-9 13 -2 13 0 11 C2 13 9 13 11 6 C14 -3 9 -13 0 -10 Z"
              fill="#EF4444"
              stroke="#991B1B"
              strokeWidth="2.2"
            />
            <ellipse cx="-4.5" cy="-3" rx="2.6" ry="4.5" transform="rotate(-16, -4.5, -3)" fill="#FCA5A5" opacity="0.82" />
          </g>
        ))}

        {/* Fluttering falling leaves when tree is shaken */}
        {Math.abs(shake) > 0.5 && (
          <g>
            {[-42, 18, 64].map((lx, i) => (
              <ellipse
                key={lx}
                cx={lx + Math.sin(walkTime * 12 + i * 2) * 14}
                cy={-110 + ((walkTime * 120 + i * 44) % 95)}
                rx="7"
                ry="3.6"
                transform={`rotate(${(walkTime * 180 + i * 70) % 360}, ${lx}, -90)`}
                fill="#4ADE80"
                stroke="#15803D"
                strokeWidth="1.3"
              />
            ))}
          </g>
        )}
      </g>
    </g>
  );
};

// Glossy Falling Apple for ㅘ
const GlossyRedAppleSvg: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <path d="M0 -13 Q3 -21 8 -20" fill="none" stroke="#451A03" strokeWidth="2.8" strokeLinecap="round" />
    <ellipse cx="9" cy="-18" rx="7" ry="3.8" transform="rotate(-22, 9, -18)" fill="#4ADE80" stroke="#15803D" strokeWidth="1.6" />
    <path
      d="M0 -12 C-11 -16 -17 -3 -13 7 C-10 16 -2 16 0 13 C2 16 10 16 13 7 C17 -3 11 -16 0 -12 Z"
      fill="#EF4444"
      stroke="#991B1B"
      strokeWidth="2.6"
    />
    <ellipse cx="-5.5" cy="-4" rx="3" ry="5.5" transform="rotate(-16, -5.5, -4)" fill="#FECACA" opacity="0.86" />
  </g>
);

// ㅚ: Detailed Swirling Cartoon Tornado with Storm Cap, Wind Ribbons & Orbiting Leaves
const CartoonTornadoSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const sway = Math.sin(walkTime * 9) * 10;
  return (
    <g>
      {/* Swirling Ground Dust Vortex */}
      <ellipse cx={sway * 0.4} cy="148" rx={48 + Math.sin(walkTime * 18) * 6} ry="12" fill="#CBD5E1" opacity="0.72" />
      <ellipse cx={sway * 0.4} cy="146" rx="28" ry="7" fill="#94A3B8" opacity="0.6" />

      {/* Translucent Funnel Body */}
      <path
        d={`M-98 -122 Q-52 -40 ${-16 + sway * 0.5} 146 L${18 + sway * 0.5} 146 Q56 -40 98 -122 Z`}
        fill="#BAE6FD"
        fillOpacity="0.45"
        stroke="#0284C7"
        strokeWidth="3"
      />

      {/* Swirling Animated Wind Ribbons */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = -105 + i * 38;
        const rx = 88 - i * 10.5;
        const cx = Math.sin(walkTime * 16 + i * 1.1) * 12 + (i / 6) * sway * 0.5;
        return (
          <g key={i}>
            <ellipse
              cx={cx}
              cy={y}
              rx={rx}
              ry={14 - i * 1.1}
              fill="none"
              stroke={i % 2 === 0 ? '#0284C7' : '#38BDF8'}
              strokeWidth={4.5 - i * 0.3}
              strokeDasharray={i % 2 === 0 ? '42 18' : '28 14'}
              opacity="0.9"
            />
          </g>
        );
      })}

      {/* Orbiting Flying Leaves & Debris */}
      {[0, 1, 2, 3].map((idx) => {
        const ang = walkTime * 7 + idx * 1.6;
        const r = 72 - idx * 12;
        const lx = Math.cos(ang) * r;
        const ly = -70 + idx * 45 + Math.sin(ang) * 10;
        return (
          <ellipse
            key={idx}
            cx={lx}
            cy={ly}
            rx="8"
            ry="4"
            transform={`rotate(${(ang * 90) % 360}, ${lx}, ${ly})`}
            fill={idx % 2 === 0 ? '#22C55E' : '#FACC15'}
            stroke="#14532D"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Dark Brooding Storm Cloud Cap */}
      <g transform="translate(0, -130)">
        <ellipse cx="-48" cy="4" rx="48" ry="22" fill="#475569" stroke="#1E293B" strokeWidth="2.8" />
        <ellipse cx="48" cy="4" rx="48" ry="22" fill="#475569" stroke="#1E293B" strokeWidth="2.8" />
        <ellipse cx="0" cy="-6" rx="64" ry="28" fill="#64748B" stroke="#1E293B" strokeWidth="3" />
        <ellipse cx="-16" cy="-12" rx="32" ry="12" fill="#94A3B8" opacity="0.55" />
      </g>
    </g>
  );
};

// ㅟ: Detailed Cute-but-Chaotic Cartoon Mouse with Big Ears, Whiskers, Paws & Swishing Tail
const DetailedCartoonMouseSvg: React.FC<{ walkTime: number; runningRight?: boolean }> = ({
  walkTime,
  runningRight = false,
}) => {
  const pawBounce = Math.sin(walkTime * 34) * 5;
  const tailWag = Math.sin(walkTime * 18) * 10;

  return (
    <g transform={runningRight ? 'scale(-1, 1)' : undefined}>
      {/* Long Expressive S-Curve Pink Tail */}
      <path
        d={`M22 4 Q42 ${-10 + tailWag * 0.5} 48 ${4 - tailWag * 0.5} Q56 14 66 ${2 + tailWag * 0.4}`}
        fill="none"
        stroke="#F472B6"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* Far Big Round Ear */}
      <circle cx="-6" cy="-17" r="9.5" fill="#94A3B8" stroke="#334155" strokeWidth="2.4" />
      <circle cx="-6" cy="-17" r="5.5" fill="#FBCFE8" />

      {/* Fast-Pattering Little Pink Paws */}
      <ellipse cx={-12 + pawBounce} cy="12" rx="5.5" ry="3" fill="#F9A8D4" stroke="#831843" strokeWidth="1.5" />
      <ellipse cx={12 - pawBounce} cy="12" rx="5.5" ry="3" fill="#F9A8D4" stroke="#831843" strokeWidth="1.5" />

      {/* Curved Arched Furry Mouse Body + Pointed Snout */}
      <path
        d="M-28 5 Q-22 -12 -4 -14 Q18 -16 26 2 Q28 12 10 12 L-16 12 Q-26 12 -28 5 Z"
        fill="#94A3B8"
        stroke="#334155"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Soft Light Belly Highlight */}
      <path d="M-12 9 Q4 12 16 8" fill="none" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />

      {/* Near Big Round Ear */}
      <circle cx="-1" cy="-14" r="10.5" fill="#CBD5E1" stroke="#334155" strokeWidth="2.6" />
      <circle cx="-1" cy="-14" r="6" fill="#F9A8D4" />

      {/* Glossy Bead Eye */}
      <circle cx="-14" cy="-3" r="3" fill="#0F172A" />
      <circle cx="-15" cy="-4" r="1.1" fill="#FFFFFF" />

      {/* Twitching Pink Nose */}
      <circle cx="-28" cy="4" r="3.6" fill="#F43F5E" stroke="#881337" strokeWidth="1.4" />

      {/* Whiskers */}
      <path
        d="M-24 2 L-38 -2 M-24 5 L-39 6 M-23 8 L-35 12"
        stroke="#334155"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </g>
  );
};

// ㅢ: Detailed Ergonomic Rolling Office Swivel Chair with Armrests & Spinning Casters
const DetailedOfficeChairSvg: React.FC<{ walkTime: number; rolling?: boolean }> = ({
  walkTime,
  rolling = false,
}) => {
  const wheelSpin = rolling ? (walkTime * 540) % 360 : 0;
  return (
    <g>
      {/* Rolling speed streaks */}
      {rolling && (
        <g stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" opacity="0.8">
          <line x1="-58" y1="6" x2="-36" y2="6" />
          <line x1="-66" y1="22" x2="-38" y2="22" />
        </g>
      )}
      {/* Contoured Padded Backrest */}
      <path
        d="M16 -46 Q28 -46 30 -24 L26 2 Q22 8 15 4 L14 -40 Q14 -46 16 -46 Z"
        fill="#0284C7"
        stroke="#0C4A6E"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <path d="M21 -38 L22 -4" stroke="#7DD3FC" strokeWidth="2.6" strokeLinecap="round" opacity="0.7" />

      {/* Back Support Spine */}
      <path d="M22 4 Q24 14 8 14" fill="none" stroke="#334155" strokeWidth="5" strokeLinecap="round" />

      {/* Plush Seat Cushion */}
      <rect x="-32" y="-2" width="60" height="14" rx="6" fill="#0EA5E9" stroke="#0C4A6E" strokeWidth="2.8" />
      <line x1="-24" y1="2" x2="16" y2="2" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

      {/* Curved Armrests */}
      <path d="M-14 -14 L12 -14 L14 -2" fill="none" stroke="#1E293B" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Chrome Pneumatic Hydraulic Piston */}
      <rect x="-4" y="12" width="8" height="19" rx="2" fill="#94A3B8" stroke="#334155" strokeWidth="2" />

      {/* 5-Star Caster Base */}
      <path d="M-28 33 L0 27 L28 33" fill="none" stroke="#334155" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="0" y1="27" x2="0" y2="34" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />

      {/* Spinning Caster Wheels */}
      {[-26, 0, 26].map((wx) => (
        <g key={wx} transform={`translate(${wx}, 37) rotate(${wheelSpin})`}>
          <circle cx="0" cy="0" r="5.5" fill="#0F172A" stroke="#64748B" strokeWidth="1.6" />
          <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#CBD5E1" strokeWidth="1.4" />
        </g>
      ))}
    </g>
  );
};

// ㅞ: Floral Wedding Arch + Velvet Ring Box
const FloralWeddingArchSvg: React.FC = () => (
  <g>
    <path
      d="M-92 0 L-92 -118 Q-92 -192 0 -192 Q92 -192 92 -118 L92 0"
      fill="none"
      stroke="#FCE7F3"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <path
      d="M-92 0 L-92 -118 Q-92 -192 0 -192 Q92 -192 92 -118 L92 0"
      fill="none"
      stroke="#F472B6"
      strokeWidth="3.2"
      strokeDasharray="10 8"
      strokeLinecap="round"
    />
    {/* Rose & Leaf Clusters around Arch */}
    {[
      { x: -84, y: -136, c: '#F43F5E' },
      { x: -58, y: -174, c: '#FB7185' },
      { x: 0, y: -192, c: '#EC4899' },
      { x: 58, y: -174, c: '#FB7185' },
      { x: 84, y: -136, c: '#F43F5E' },
    ].map((fl, i) => (
      <g key={i} transform={`translate(${fl.x}, ${fl.y})`}>
        <ellipse cx="-10" cy="2" rx="8" ry="4" transform="rotate(-24, -10, 2)" fill="#4ADE80" stroke="#15803D" strokeWidth="1.4" />
        <ellipse cx="10" cy="2" rx="8" ry="4" transform="rotate(24, 10, 2)" fill="#4ADE80" stroke="#15803D" strokeWidth="1.4" />
        <circle cx="0" cy="0" r="9.5" fill={fl.c} stroke="#9D174D" strokeWidth="1.8" />
        <circle cx="0" cy="0" r="4" fill="#FFE4E6" />
      </g>
    ))}
  </g>
);

const WhySpeechBubbleSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const pulse = 1 + Math.sin(walkTime * 14) * 0.06;
  return (
    <g transform={`scale(${pulse})`}>
      <polygon
        points="0,-78 20,-62 52,-70 46,-44 74,-34 52,-14 60,6 22,-4 0,10 -14,-6 -58,2 -48,-20 -74,-38 -44,-48 -52,-72 -18,-62"
        fill="#FFFFFF"
        stroke="#DB2777"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <text x="0" y="-26" textAnchor="middle" fontSize="29" fontWeight="900" fill="#BE185D">
        왜?!!
      </text>
    </g>
  );
};

const RingBoxSparkleSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const pulse = 1 + Math.sin(walkTime * 10) * 0.14;
  return (
    <g transform={`scale(${pulse})`}>
      <rect x="-13" y="2" width="26" height="14" rx="3.5" fill="#BE123C" stroke="#881337" strokeWidth="2.2" />
      <rect x="-15" y="-9" width="30" height="11" rx="3.5" fill="#F43F5E" stroke="#881337" strokeWidth="2.2" />
      <rect x="-11" y="2" width="22" height="4" fill="#FFE4E6" />
      <circle cx="0" cy="-2" r="6.5" fill="none" stroke="#FACC15" strokeWidth="3" />
      <polygon points="0,-15 6,-9 0,-4 -6,-9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      <line x1="0" y1="-15" x2="0" y2="-4" stroke="#FFFFFF" strokeWidth="1.2" />
      <text x="-20" y="-12" fontSize="13">✨</text>
      <text x="13" y="-12" fontSize="13">✨</text>
    </g>
  );
};

// ㅝ: Hand-crafted Cheeky Cartoon Monkey (원숭이) & Banana Peel Trap
const BananaPeelSvg: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <ellipse cx="0" cy="6" rx="22" ry="5" fill="#0F172A" opacity="0.2" />
    {/* Back banana peel petal */}
    <path
      d="M-3 -10 Q-16 -4 -24 5 Q-12 7 -2 1 Z"
      fill="#EAB308"
      stroke="#854D0E"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Front-right curved yellow peel petal */}
    <path
      d="M3 -10 Q18 -3 25 6 Q12 8 2 0 Z"
      fill="#FACC15"
      stroke="#854D0E"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Front-center drooping yellow peel petal */}
    <path
      d="M-4 -8 Q0 4 10 9 Q-4 11 -11 4 Z"
      fill="#FEF08A"
      stroke="#854D0E"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Dark brown top stem */}
    <path d="M-3 -10 L0 -17 L4 -10 Z" fill="#78350F" stroke="#451A03" strokeWidth="1.6" strokeLinejoin="round" />
    {/* Gloss highlight */}
    <path d="M6 -5 Q14 -1 18 3" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.75" />
  </g>
);

const CheekyMonkeySvg: React.FC<{
  walkTime: number;
  state: 'eating' | 'tossing' | 'laughing';
}> = ({ walkTime, state }) => {
  const tailWag = Math.sin(walkTime * 11) * 14;
  const laughHop = state === 'laughing' ? Math.abs(Math.sin(walkTime * 14)) * 12 : 0;
  const armWave = state === 'laughing' ? Math.sin(walkTime * 16) * 12 : Math.sin(walkTime * 8) * 5;

  return (
    <g transform={`translate(0, ${-laughHop})`}>
      {/* Ground shadow */}
      <ellipse cx="0" cy={46 + laughHop} rx={24 - laughHop * 0.4} ry="6" fill="#0F172A" opacity="0.22" />

      {/* Curly animated S-curve monkey tail */}
      <path
        d={`M22 18 Q48 ${16 + tailWag * 0.4} 52 ${-8 + tailWag * 0.6} Q54 ${-28 + tailWag} 38 ${-24 + tailWag * 0.8}`}
        fill="none"
        stroke="#78350F"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d={`M22 18 Q48 ${16 + tailWag * 0.4} 52 ${-8 + tailWag * 0.6} Q54 ${-28 + tailWag} 38 ${-24 + tailWag * 0.8}`}
        fill="none"
        stroke="#92400E"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Articulated Monkey Legs & Feet */}
      <path
        d={`M-10 24 Q-16 36 ${state === 'laughing' ? -20 : -14} 42`}
        fill="none"
        stroke="#78350F"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <ellipse cx={state === 'laughing' ? -22 : -17} cy="43" rx="9" ry="5" fill="#FDE68A" stroke="#78350F" strokeWidth="2.2" />
      <path
        d={`M10 24 Q16 36 ${state === 'laughing' ? 20 : 14} 42`}
        fill="none"
        stroke="#78350F"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      <ellipse cx={state === 'laughing' ? 18 : 12} cy="43" rx="9" ry="5" fill="#FDE68A" stroke="#78350F" strokeWidth="2.2" />

      {/* Plump Chestnut Body & Soft Cream Belly */}
      <ellipse cx="0" cy="8" rx="22" ry="24" fill="#92400E" stroke="#451A03" strokeWidth="2.8" />
      <ellipse cx="-2" cy="11" rx="14" ry="17" fill="#FDE68A" />

      {/* Back Arm */}
      {state === 'eating' ? (
        <g>
          <path d="M-16 2 Q-30 -6 -24 -18" fill="none" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          <circle cx="-24" cy="-18" r="5" fill="#FDE68A" stroke="#451A03" strokeWidth="2" />
          {/* Whole Yellow Curved Banana being munched */}
          <path
            d="M-38 -26 Q-28 -10 -14 -20 Q-26 -24 -38 -26 Z"
            fill="#FACC15"
            stroke="#854D0E"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </g>
      ) : state === 'tossing' ? (
        <g>
          <path d="M-16 0 Q-36 -18 -42 -28" fill="none" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          <circle cx="-42" cy="-28" r="5" fill="#FDE68A" stroke="#451A03" strokeWidth="2" />
        </g>
      ) : (
        <g>
          {/* Pointing & giggling arm */}
          <path d={`M-16 2 Q-34 ${-4 + armWave * 0.4} -42 ${-10 + armWave * 0.5}`} fill="none" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
          <circle cx="-43" cy={-10 + armWave * 0.5} r="5" fill="#FDE68A" stroke="#451A03" strokeWidth="2" />
        </g>
      )}

      {/* Front Arm (clutching belly when laughing!) */}
      <path
        d={
          state === 'laughing'
            ? `M16 4 Q22 14 4 ${16 + armWave * 0.25}`
            : `M16 4 Q28 ${12 + armWave * 0.3} 22 22`
        }
        fill="none"
        stroke="#78350F"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle
        cx={state === 'laughing' ? 4 : 22}
        cy={state === 'laughing' ? 16 + armWave * 0.25 : 22}
        r="4.8"
        fill="#FDE68A"
        stroke="#451A03"
        strokeWidth="2"
      />

      {/* Big Round Monkey Ears */}
      <circle cx="-24" cy="-26" r="10.5" fill="#92400E" stroke="#451A03" strokeWidth="2.6" />
      <circle cx="-24" cy="-26" r="6" fill="#FDE68A" />
      <circle cx="22" cy="-26" r="10.5" fill="#92400E" stroke="#451A03" strokeWidth="2.6" />
      <circle cx="22" cy="-26" r="6" fill="#FDE68A" />

      {/* Monkey Head + Spiky Top Hair Tuft */}
      <circle cx="-1" cy="-28" r="22" fill="#92400E" stroke="#451A03" strokeWidth="2.8" />
      <path d="M-7 -49 L-2 -58 L3 -50 L9 -56 L8 -47" fill="#92400E" stroke="#451A03" strokeWidth="2.4" strokeLinejoin="round" />

      {/* Classic Heart-Shaped Cream Monkey Face Mask */}
      <path
        d="M-16 -28 Q-16 -41 -6 -41 Q-1 -41 -1 -34 Q-1 -41 4 -41 Q14 -41 14 -28 Q17 -20 12 -12 Q-1 -7 -14 -12 Q-19 -20 -16 -28 Z"
        fill="#FEF3C7"
      />

      {/* Expressive Cheeky Eyes */}
      {state === 'laughing' ? (
        <>
          <path d="M-12 -28 Q-8 -34 -4 -28" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M2 -28 Q6 -34 10 -28" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="-8" cy="-30" rx="3.4" ry="4.2" fill="#0F172A" />
          <circle cx="-9" cy="-31.5" r="1.2" fill="#FFFFFF" />
          <ellipse cx="5" cy="-30" rx="3.4" ry="4.2" fill="#0F172A" />
          <circle cx="4" cy="-31.5" r="1.2" fill="#FFFFFF" />
          {/* Mischievous angled brows */}
          <path d="M-13 -37 L-4 -35 M10 -37 L1 -35" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Cute Button Nose & Rosy Cheeks */}
      <ellipse cx="-2" cy="-22" rx="3.5" ry="2.2" fill="#78350F" />
      <ellipse cx="-13" cy="-21" rx="3.5" ry="2" fill="#FB7185" opacity="0.55" />
      <ellipse cx="9" cy="-21" rx="3.5" ry="2" fill="#FB7185" opacity="0.55" />

      {/* Mouth: Eating / Cheeky Grin / Belly Laugh */}
      {state === 'laughing' ? (
        <path
          d="M-11 -18 Q-2 -6 8 -18 Z"
          fill="#DC2626"
          stroke="#451A03"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M-10 -17 Q-2 -11 7 -17"
          fill="none"
          stroke="#451A03"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

// ============================================================================
// MAIN EPISODE 4 COMPONENT (4. 졸라복합모음맨 ㅐ ~ ㅢ)
// ============================================================================

export const StickmanBokhapMoeumSim: React.FC<StickmanSimProps> = ({
  defaultAudioEnabled = true,
  lang = 'en',
  className = '',
  hideControlBar = false,
  autoStartAllPlay = false,
}) => {
  const uid = useId();
  const [phase, setPhase] = useState<SimPhase>('walking');
  const [selectedItem, setSelectedItem] = useState<CompoundVowelItem>(COMPOUND_VOWELS[0]);
  const [learnedChars, setLearnedChars] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isAllPlayMode, setIsAllPlayMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(defaultAudioEnabled);
  const [, setFrameTick] = useState(0);

  const animRef = useRef({
    walkX: 150,
    walkDir: 1 as 1 | -1,
    walkTime: 0,
    worldScrollX: 0,
    phaseElapsed: 0,
    approachStartX: 150,
    objectAppear: 0,
    actionT: 0,
    aftermathT: 0,
    step1Triggered: false,
    step2Triggered: false,
    lastTime: performance.now(),
  });

  const phaseRef = useRef<SimPhase>(phase);
  phaseRef.current = phase;
  const selectedRef = useRef<CompoundVowelItem>(selectedItem);
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

  const playCompoundVowelSfx = useCallback(
    (char: CompoundVowelKey, stage: 'setup' | 'impact') => {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;

        if (char === 'ㅐ') {
          if (stage === 'setup') {
            // Giant frog ribbit + tongue whip!
            playTone('triangle', 150, 290, 0.16, 0.18, 0);
            playTone('triangle', 170, 320, 0.18, 0.18, 0.22);
            playTone('sine', 420, 960, 0.22, 0.16, 0.45);
          } else {
            // Big pond splash!
            playCartoonSplat();
            playTone('sine', 340, 880, 0.18, 0.15, 0.05);
            playTone('sine', 520, 1080, 0.15, 0.12, 0.18);
          }
        } else if (char === 'ㅒ') {
          if (stage === 'setup') {
            // Rapid-fire talk-bullet machine gun
            for (let i = 0; i < 7; i++) {
              playTone('square', 460 + (i % 2) * 160, 320, 0.07, 0.12, i * 0.13);
            }
          } else {
            playCartoonImpact();
            playTone('sine', 1620, 1280, 0.42, 0.12, 0.06);
          }
        } else if (char === 'ㅔ') {
          if (stage === 'setup') {
            // Crab pincer SNAP + panic yell!
            playTone('square', 840, 380, 0.1, 0.18, 0.12);
            playTone('sawtooth', 420, 880, 0.24, 0.14, 0.28);
          } else {
            // Swim-tube home run SMASH + flying whistle!
            playCartoonImpact();
            playTone('sine', 380, 1360, 0.48, 0.16, 0.05);
          }
        } else if (char === 'ㅖ') {
          if (stage === 'setup') {
            // Angry hen cluck + rolling egg bowling!
            playTone('sawtooth', 620, 960, 0.15, 0.14, 0);
            playTone('sawtooth', 900, 560, 0.18, 0.14, 0.16);
            for (let i = 0; i < 6; i++) {
              playTone('triangle', 320 + i * 38, 220, 0.09, 0.12, 0.36 + i * 0.11);
            }
          } else {
            // Bowling strike + egg crack splat!
            playCartoonImpact();
            playCartoonSplat();
          }
        } else if (char === 'ㅘ') {
          if (stage === 'setup') {
            // Tree shaking rustle
            playTone('triangle', 260, 180, 0.22, 0.12, 0);
            playTone('triangle', 310, 210, 0.22, 0.12, 0.24);
            playTone('triangle', 280, 195, 0.22, 0.12, 0.48);
          } else {
            // Apple BONK + boing wake-up!
            playCartoonImpact();
            playTone('sine', 360, 840, 0.24, 0.15, 0.08);
          }
        } else if (char === 'ㅙ') {
          if (stage === 'setup') {
            playTone('sine', 480, 380, 0.22, 0.13, 0.06);
            playTone('sine', 460, 360, 0.22, 0.13, 0.34);
          } else {
            // Dramatic slap + "왜?!!" comic shock
            playTone('square', 1120, 140, 0.14, 0.24, 0);
            playTone('sine', 320, 820, 0.26, 0.16, 0.16);
          }
        } else if (char === 'ㅚ') {
          if (stage === 'setup') {
            // Whirring tornado wind siren
            playTone('sawtooth', 240, 680, 0.85, 0.15, 0.1);
          } else {
            // Headfirst pavement THUD!
            playTone('sine', 860, 190, 0.32, 0.16, 0);
            playCartoonSplat();
          }
        } else if (char === 'ㅝ') {
          if (stage === 'setup') {
            // Cheeky monkey chatter ("우끼끼!") + banana peel toss whoosh
            playTone('triangle', 620, 920, 0.11, 0.15, 0.02);
            playTone('triangle', 680, 1020, 0.11, 0.15, 0.16);
            playTone('triangle', 740, 1100, 0.13, 0.15, 0.30);
            playTone('sine', 420, 880, 0.22, 0.13, 0.48);
          } else {
            // Classic cartoon banana-peel slip whistle + heavy comic thud!
            playTone('sine', 340, 1520, 0.34, 0.17, 0);
            playTone('sine', 1520, 480, 0.18, 0.14, 0.34);
            playCartoonImpact();
          }
        } else if (char === 'ㅞ') {
          if (stage === 'setup') {
            playTone('sine', 523.25, 659.25, 0.26, 0.12, 0);
          } else {
            // Romantic wedding bells chime!
            [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) =>
              playTone('sine', freq, freq, 0.52, 0.16, idx * 0.2)
            );
          }
        } else if (char === 'ㅟ') {
          if (stage === 'setup') {
            // Squeaky mouse + Jollaman panic shriek!
            playTone('sine', 1240, 1720, 0.09, 0.14, 0.06);
            playTone('sine', 1300, 1780, 0.09, 0.14, 0.20);
            playTone('sawtooth', 480, 960, 0.26, 0.15, 0.40);
          } else {
            // Girlfriend heroic stomp + mouse zip-away!
            playCartoonImpact();
            playTone('sine', 1420, 680, 0.22, 0.14, 0.10);
          }
        } else if (char === 'ㅢ') {
          if (stage === 'setup') {
            // Rolling caster wheel chase
            for (let i = 0; i < 6; i++) {
              playTone('triangle', 260 + i * 28, 240, 0.11, 0.11, i * 0.16);
            }
          } else {
            // Crisp shoe-stop + happy ending fanfare!
            playTone('square', 640, 240, 0.12, 0.18, 0);
            playSuccessChime();
          }
        }
      } catch {
        // Silent fallback
      }
    },
    [getAudioCtx, playCartoonImpact, playCartoonSplat, playSuccessChime, playTone]
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
      anim.walkX = EP4_ACTION_SPOT_X;
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
    (item: CompoundVowelItem) => {
      clearAllTimers();
      stopAllAudio();
      pausedRef.current = false;
      setIsPaused(false);
      setSelectedItem(item);
      selectedRef.current = item;

      const anim = animRef.current;
      if (item.char === 'ㅘ' || item.char === 'ㅚ' || item.char === 'ㅞ' || item.char === 'ㅟ') {
        // Seamless same-scene continuity for ㅖ->ㅘ, ㅙ->ㅚ, ㅝ->ㅞ->ㅟ
        anim.walkX = EP4_ACTION_SPOT_X;
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
    (item: CompoundVowelItem) => {
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
      startItemPlayback(COMPOUND_VOWELS[0]);
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
          startRef.current(COMPOUND_VOWELS[0]);
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
        const isSeamlessScene =
          item.char === 'ㅘ' || item.char === 'ㅚ' || item.char === 'ㅞ' || item.char === 'ㅟ';

        if (!isSeamlessScene) {
          anim.worldScrollX += dt * 260;
        }
        anim.walkX = anim.approachStartX + (EP4_ACTION_SPOT_X - anim.approachStartX) * eased;
        anim.objectAppear = eased;

        if (t >= 1) {
          anim.walkX = EP4_ACTION_SPOT_X;
          anim.objectAppear = 1;
          anim.actionT = 0;
          anim.step1Triggered = false;
          anim.step2Triggered = false;
          anim.phaseElapsed = 0;
          phaseRef.current = 'action';
          setPhase('action');
        }
      } else if (curPhase === 'action') {
        anim.phaseElapsed += dt;
        const t = Math.min(anim.phaseElapsed / item.dur, 1);
        anim.actionT = t;

        if (t >= item.setupAt && !anim.step1Triggered) {
          anim.step1Triggered = true;
          if (audioRef.current) {
            playCompoundVowelSfx(item.char, 'setup');
          }
        }

        if (t >= item.impactAt && !anim.step2Triggered) {
          anim.step2Triggered = true;
          if (audioRef.current) {
            playCompoundVowelSfx(item.char, 'impact');
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
            const curIdx = COMPOUND_VOWELS.findIndex((i) => i.char === item.char);
            const nextItem = curIdx >= 0 ? COMPOUND_VOWELS[curIdx + 1] : undefined;
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
  }, [clearAllTimers, playCompoundVowelSfx, playSuccessChime, speakKorean]);

  const anim = animRef.current;
  const activeChar = selectedItem.char;
  const isSeamlessScene =
    activeChar === 'ㅘ' || activeChar === 'ㅚ' || activeChar === 'ㅞ' || activeChar === 'ㅟ';
  // Match walking backdrop to first episode item (ㅐ: pond) for smooth start
  const activeTheme: BackdropThemeKey =
    phase === 'walking' ? COMPOUND_VOWELS[0].theme : selectedItem.theme;

  const isWalkingMotion =
    phase === 'walking' ||
    (phase === 'approaching' && !isSeamlessScene) ||
    (phase === 'action' && activeChar === 'ㅢ' && anim.actionT < 0.64) ||
    (phase === 'action' && activeChar === 'ㅝ' && anim.actionT < selectedItem.impactAt);

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
  let slapMark = false;
  let kneeling = false;
  let kneelStyle: 'despair' | 'propose' = 'despair';
  let sitting = false;
  let blushCheeks = false;
  let upsideDownFlailPos: { x: number; y: number; inWater: boolean } | null = null;

  if (phase === 'approaching') {
    if (activeChar === 'ㅘ') {
      // Seamless continuation from ㅖ's knocked-out ground pose into apple-tree nap
      jollaX = EP4_ACTION_SPOT_X;
      jollaY = GROUND_Y - 22;
      jollaRot = -84;
      jollaFaceMode = 'fainted';
    } else if (activeChar === 'ㅚ') {
      // Seamless continuation from ㅙ's town street slap shock
      jollaX = EP4_ACTION_SPOT_X;
      jollaFaceMode = 'panic';
      slapMark = true;
    } else if (activeChar === 'ㅞ') {
      // Seamless crying kneel before girlfriend comforts & wedding proposal
      jollaX = EP4_ACTION_SPOT_X;
      kneeling = true;
      kneelStyle = 'despair';
      jollaY = GROUND_Y - 50;
      jollaFaceMode = 'crying';
    } else if (activeChar === 'ㅟ') {
      // Seamless continuation from ㅞ's happy meadow date
      jollaX = EP4_ACTION_SPOT_X;
      jollaFaceMode = 'happy';
      blushCheeks = true;
    }
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㅐ': {
        if (t < 0.42) {
          jollaFaceMode = t < 0.24 ? 'happy' : 'panic';
          if (t < 0.24) blushCheeks = true;
        } else if (t < selectedItem.impactAt) {
          const arcP = (t - 0.42) / (selectedItem.impactAt - 0.42);
          jollaX = EP4_ACTION_SPOT_X + arcP * (735 - EP4_ACTION_SPOT_X);
          jollaY = GROUND_Y - 52 - Math.sin(arcP * Math.PI) * 185;
          jollaRot = arcP * 720;
          jollaFaceMode = 'panic';
        } else {
          jollaVisible = false;
          upsideDownFlailPos = { x: 735, y: GROUND_Y + 8, inWater: true };
        }
        break;
      }
      case 'ㅒ': {
        if (t < selectedItem.impactAt) {
          jollaFaceMode = 'headClutch';
          jollaX = EP4_ACTION_SPOT_X - (t / selectedItem.impactAt) * 105 + Math.sin(t * 72) * 3.5;
        } else {
          const fallP = Math.min((t - selectedItem.impactAt) / 0.14, 1);
          jollaX = EP4_ACTION_SPOT_X - 105 - fallP * 25;
          jollaY = GROUND_Y - 52 + fallP * 32;
          jollaRot = -fallP * 86;
          jollaFaceMode = 'dizzy';
          showDizzyStars = true;
        }
        break;
      }
      case 'ㅔ': {
        if (t < 0.36) {
          jollaX = 285;
          jollaY = GROUND_Y - 62;
          sitting = true;
          jollaFaceMode = 'happy';
          blushCheeks = true;
        } else if (t < 0.44) {
          // Pinch jump!
          const jumpP = (t - 0.36) / 0.08;
          jollaX = 285 + jumpP * 30;
          jollaY = GROUND_Y - 62 - Math.sin(jumpP * Math.PI) * 65;
          jollaFaceMode = 'panic';
        } else if (t < selectedItem.impactAt) {
          const dragP = (t - 0.44) / (selectedItem.impactAt - 0.44);
          jollaX = 315 + dragP * 165;
          jollaY = GROUND_Y - 40;
          jollaRot = -38;
          jollaFaceMode = 'panic';
        } else {
          jollaX = 480;
          jollaFaceMode = 'dizzy';
          showDizzyStars = true;
        }
        break;
      }
      case 'ㅖ': {
        if (t < selectedItem.impactAt) {
          jollaFaceMode = 'panic';
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 28)) * 12;
        } else {
          const knockP = Math.min((t - selectedItem.impactAt) / 0.40, 1);
          jollaX = EP4_ACTION_SPOT_X - knockP * 130;
          jollaY = GROUND_Y - 52 - Math.sin(knockP * Math.PI) * 64 + knockP * 30;
          jollaRot = -knockP * 88;
          jollaFaceMode = 'dizzy';
          showDizzyStars = true;
        }
        break;
      }
      case 'ㅘ': {
        if (t < selectedItem.impactAt) {
          jollaY = GROUND_Y - 22;
          jollaRot = -84;
          jollaFaceMode = 'fainted';
        } else {
          const bounceP = Math.min((t - selectedItem.impactAt) / 0.25, 1);
          jollaFaceMode = 'swollenRed';
          showHeadBump = true;
          jollaY = GROUND_Y - 52 - Math.sin(bounceP * Math.PI) * 34;
        }
        break;
      }
      case 'ㅙ': {
        if (t < selectedItem.impactAt) {
          jollaFaceMode = 'happy';
        } else if (t < 0.68) {
          const slapP = Math.sin(((t - selectedItem.impactAt) / 0.24) * Math.PI);
          jollaRot = -18 * slapP;
          jollaFaceMode = 'panic';
          slapMark = true;
        } else {
          jollaFaceMode = 'panic';
          slapMark = true;
        }
        break;
      }
      case 'ㅚ': {
        if (t < 0.16) {
          jollaFaceMode = 'headClutch';
          slapMark = true;
        } else if (t < 0.50) {
          const spinP = (t - 0.16) / 0.34;
          jollaX = EP4_ACTION_SPOT_X + spinP * 185 + Math.sin(spinP * Math.PI * 6) * 28;
          jollaY = GROUND_Y - 52 - spinP * 240;
          jollaRot = spinP * 1080;
          jollaFaceMode = 'dizzy';
        } else if (t < 0.62) {
          jollaX = 505;
          jollaY = GROUND_Y - 292;
          jollaRot = 1080;
          jollaFaceMode = 'dizzy';
        } else if (t < selectedItem.impactAt) {
          const dropP = (t - 0.62) / (selectedItem.impactAt - 0.62);
          jollaX = 505;
          jollaY = GROUND_Y - 292 + dropP * 280;
          jollaRot = 180;
          jollaFaceMode = 'panic';
        } else {
          jollaVisible = false;
          upsideDownFlailPos = { x: 505, y: GROUND_Y - 2, inWater: false };
        }
        break;
      }
      case 'ㅝ': {
        if (t < selectedItem.impactAt) {
          // Jollaman walks happily forward right toward the banana peel trap!
          const walkP = t / selectedItem.impactAt;
          jollaX = EP4_ACTION_SPOT_X + walkP * 145;
          jollaFaceMode = 'happy';
          blushCheeks = true;
        } else if (t < 0.72) {
          // Classic cartoon banana-peel sky-high flip!
          const slipP = (t - selectedItem.impactAt) / (0.72 - selectedItem.impactAt);
          jollaX = EP4_ACTION_SPOT_X + 145 + slipP * 38;
          jollaY = GROUND_Y - 52 - Math.sin(slipP * Math.PI) * 148 + slipP * 28;
          jollaRot = -slipP * 360 - 82 * slipP;
          jollaFaceMode = 'panic';
        } else {
          // Flat on his back with dizzy stars & red bump!
          const settleP = Math.min((t - 0.72) / 0.1, 1);
          jollaX = EP4_ACTION_SPOT_X + 183;
          jollaY = GROUND_Y - 22 - Math.sin(settleP * Math.PI) * 14;
          jollaRot = -86;
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          showDizzyStars = true;
        }
        break;
      }
      case 'ㅞ': {
        if (t < selectedItem.impactAt) {
          kneeling = true;
          kneelStyle = 'despair';
          jollaY = GROUND_Y - 50;
          jollaFaceMode = 'crying';
        } else {
          kneeling = true;
          kneelStyle = 'propose';
          jollaY = GROUND_Y - 50;
          jollaFaceMode = 'happy';
          blushCheeks = true;
        }
        break;
      }
      case 'ㅟ': {
        if (t < 0.22) {
          jollaFaceMode = 'happy';
          blushCheeks = true;
        } else if (t < selectedItem.impactAt + 0.06) {
          // Leaps straight up into Girlfriend's arms trembling!
          const jumpP = Math.min((t - 0.22) / 0.12, 1);
          jollaX = EP4_ACTION_SPOT_X + jumpP * (434 - EP4_ACTION_SPOT_X) + Math.sin(t * 78) * 4;
          jollaY = GROUND_Y - 52 - jumpP * 32 - Math.sin(jumpP * Math.PI) * 45;
          jollaFaceMode = 'panic';
        } else {
          jollaX = 408;
          jollaFaceMode = 'happy';
          blushCheeks = true;
        }
        break;
      }
      case 'ㅢ': {
        if (t < selectedItem.impactAt) {
          const runP = t / selectedItem.impactAt;
          jollaX = EP4_ACTION_SPOT_X + runP * 245;
          jollaRot = runP > 0.78 ? 18 : 8;
          jollaFaceMode = 'panic';
        } else if (t < 0.76) {
          jollaX = 565;
          jollaFaceMode = 'happy';
        } else {
          jollaX = 635;
          jollaY = GROUND_Y - 64;
          sitting = true;
          jollaFaceMode = 'happy';
          blushCheeks = true;
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeChar) {
      case 'ㅐ':
        jollaVisible = false;
        upsideDownFlailPos = { x: 735, y: GROUND_Y + 8, inWater: true };
        break;
      case 'ㅒ':
        jollaX = EP4_ACTION_SPOT_X - 130;
        jollaY = GROUND_Y - 20;
        jollaRot = -86;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ㅔ':
        jollaX = 480;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ㅖ':
        jollaX = EP4_ACTION_SPOT_X - 130;
        jollaY = GROUND_Y - 22;
        jollaRot = -88;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ㅘ':
        jollaFaceMode = 'swollenRed';
        showHeadBump = true;
        break;
      case 'ㅙ':
        jollaFaceMode = 'panic';
        slapMark = true;
        break;
      case 'ㅚ':
        jollaVisible = false;
        upsideDownFlailPos = { x: 505, y: GROUND_Y - 2, inWater: false };
        break;
      case 'ㅝ':
        jollaX = EP4_ACTION_SPOT_X + 183;
        jollaY = GROUND_Y - 22;
        jollaRot = -86;
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        showDizzyStars = true;
        break;
      case 'ㅞ':
        kneeling = true;
        kneelStyle = 'propose';
        jollaY = GROUND_Y - 50;
        jollaFaceMode = 'happy';
        blushCheeks = true;
        break;
      case 'ㅟ':
        jollaX = 408;
        jollaFaceMode = 'happy';
        blushCheeks = true;
        break;
      case 'ㅢ':
        jollaX = 635;
        jollaY = GROUND_Y - 64;
        sitting = true;
        jollaFaceMode = 'happy';
        blushCheeks = true;
        break;
    }
  }

  const i18nEntry = EP4_REVEAL_I18N[selectedItem.char];
  const localizedMeaning = i18nEntry.meanings[lang] ?? i18nEntry.meanings.en;
  const revealSubtitle = `${i18nEntry.phonetic} · ${localizedMeaning} [${i18nEntry.wordRom}]`;

  return (
    <div className={`w-full flex flex-col gap-3 select-none ${className}`}>
      {!hideControlBar && (
        <StickmanControlBar
          title="졸라복합모음맨 (ㅐ ~ ㅢ)"
          icon="🐸"
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
          allPlayIndex={COMPOUND_VOWELS.findIndex((v) => v.char === selectedItem.char)}
          allPlayTotal={COMPOUND_VOWELS.length}
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
          aria-label="졸라맨 한글 복합모음 2D 시뮬레이션 무대"
        >
          <DynamicBackdrop
            idPrefix={uid}
            theme={activeTheme}
            scrollOffset={scrollOffset}
            walkTime={anim.walkTime}
          />

          {/* Floating Sky Compound Vowels ㅐ ~ ㅢ */}
          {COMPOUND_VOWELS.map((item, idx) => {
            const floatY = item.sky[1] + Math.sin(anim.walkTime * 2.2 + idx * 0.65) * 6;
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
                <circle cx="0" cy="0" r="28" fill="#FFFFFF" fillOpacity={isSelected ? 0.95 : 0.72} />
                <text
                  x="0"
                  y="11"
                  textAnchor="middle"
                  fontSize="33"
                  fontWeight="900"
                  fill={item.color}
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  style={{ paintOrder: 'stroke fill' }}
                >
                  {item.char}
                </text>
                {isLearned && <circle cx="19" cy="-17" r="4.8" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />}
              </g>
            );
          })}

          {/* Episode 4 Scenario Props & Co-Star Girlfriend */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' && !isSeamlessScene ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              {/* ㅐ: Giant Bullfrog on Lily Pad whips Jollaman headfirst into pond */}
              {activeChar === 'ㅐ' && (() => {
                const t = anim.actionT;
                const puffed = phase === 'action' && t >= 0.14 && t < 0.30;
                const tongueOut = phase === 'action' && t >= 0.24 && t < selectedItem.impactAt;
                const shocked = (phase === 'action' && t >= 0.38) || phase === 'aftermath' || phase === 'reveal';
                const splashed = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                const tongueExtendP =
                  phase === 'action' && t >= 0.24 && t < 0.42
                    ? Math.min((t - 0.24) / 0.13, 1)
                    : 1;
                const tipX = t < 0.42 ? 520 - tongueExtendP * (520 - jollaX) : jollaX;
                const tipY = t < 0.42 ? GROUND_Y - 40 : jollaY;

                return (
                  <g>
                    <g transform={`translate(240, ${GROUND_Y - 52}) scale(-1, 1)`}>
                      <GirlfriendJollamanSvg walkTime={anim.walkTime} mood={shocked ? 'shock' : 'happy'} />
                    </g>
                    {!shocked && (
                      <text x="280" y={GROUND_Y - 115 + Math.sin(anim.walkTime * 6) * 5} textAnchor="middle" fontSize="22">
                        💕🌹
                      </text>
                    )}

                    {/* Detailed Giant Bullfrog on Veined Lily Pad */}
                    <g transform={`translate(552, ${GROUND_Y - 34})`}>
                      <GiantPondFrogSvg walkTime={anim.walkTime} puffed={puffed} mouthOpen={tongueOut} />
                    </g>

                    {puffed && (
                      <g transform={`translate(550, ${GROUND_Y - 105})`}>
                        <rect x="-46" y="-17" width="92" height="26" rx="13" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.4" />
                        <text x="0" y="1" textAnchor="middle" fontSize="14" fontWeight="900" fill="#15803D">
                          개구울!!
                        </text>
                      </g>
                    )}

                    {/* Elastic Sticky Pink Frog Tongue Whip */}
                    {tongueOut && (
                      <g>
                        <path
                          d={`M520 ${GROUND_Y - 36} Q${(520 + tipX) / 2} ${Math.min(GROUND_Y - 96, tipY - 38)} ${tipX} ${tipY}`}
                          fill="none"
                          stroke="#EC4899"
                          strokeWidth="7.5"
                          strokeLinecap="round"
                        />
                        <path
                          d={`M520 ${GROUND_Y - 36} Q${(520 + tipX) / 2} ${Math.min(GROUND_Y - 96, tipY - 38)} ${tipX} ${tipY}`}
                          fill="none"
                          stroke="#F9A8D4"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                        <circle cx={tipX} cy={tipY} r="7.5" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
                      </g>
                    )}

                    {/* Big Pond Water Splash & Rings */}
                    {splashed && (
                      <g>
                        <text x={735} y={GROUND_Y - 86} textAnchor="middle" fontSize="24" fontWeight="900" fill="#0369A1">
                          풍덩!! 🐸💦
                        </text>
                        <ellipse cx="735" cy={GROUND_Y + 12} rx={44 + Math.sin(anim.walkTime * 8) * 6} ry="10" fill="none" stroke="#E0F2FE" strokeWidth="3" />
                        {[-38, -20, 22, 40].map((dx, i) => (
                          <ellipse
                            key={dx}
                            cx={735 + dx}
                            cy={GROUND_Y - 16 - Math.abs(Math.sin(anim.walkTime * 10 + i)) * 26}
                            rx="5.5"
                            ry="7.5"
                            fill="#BAE6FD"
                            stroke="#0284C7"
                            strokeWidth="1.5"
                          />
                        ))}
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅒ: Girlfriend unleashes Talk-Bubble Machine Gun KO */}
              {activeChar === 'ㅒ' && (() => {
                const t = anim.actionT;
                const firing = phase === 'action' && t >= selectedItem.setupAt && t < selectedItem.impactAt;
                const knockedOut = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                return (
                  <g>
                    <g transform={`translate(480, ${GROUND_Y - 52})`}>
                      <GirlfriendJollamanSvg walkTime={anim.walkTime} mood={knockedOut ? 'angry' : 'shout'} />
                    </g>
                    <g transform={`translate(520, ${GROUND_Y - 130})`}>
                      <rect x="-46" y="-18" width="92" height="30" rx="15" fill="#FFFFFF" stroke="#EC4899" strokeWidth="2.8" />
                      <text x="0" y="2" textAnchor="middle" fontSize="16" fontWeight="900" fill="#BE185D">
                        얘기 좀 해!!
                      </text>
                    </g>
                    {firing && (
                      <g>
                        {['얘기!', '진짜!', '왜?!', '얘기!!'].map((word, i) => {
                          const p = ((t - selectedItem.setupAt) * 3.6 + i * 0.25) % 1;
                          const bx = 448 - p * (448 - jollaX);
                          const by = GROUND_Y - 76 + Math.sin(i * 2.1 + p * 8) * 14;
                          return (
                            <g key={i} transform={`translate(${bx}, ${by}) scale(${0.88 + p * 0.25})`}>
                              <rect x="-24" y="-14" width="48" height="26" rx="13" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2.4" />
                              <text x="0" y="4" textAnchor="middle" fontSize="12" fontWeight="900" fill="#BE185D">
                                {word}
                              </text>
                            </g>
                          );
                        })}
                        <text x={350} y={GROUND_Y - 126} textAnchor="middle" fontSize="19" fontWeight="900" fill="#BE185D">
                          타타타타탁!! 💬💥
                        </text>
                      </g>
                    )}
                    {knockedOut && (
                      <text x={EP4_ACTION_SPOT_X - 115} y={GROUND_Y - 96} textAnchor="middle" fontSize="22" fontWeight="900" fill="#BE185D">
                        말풍선 K.O!! 💫
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* ㅔ: Beach Lounge Bench + Detailed King Crab Pinch -> Swim-Tube Home Run! */}
              {activeChar === 'ㅔ' && (() => {
                const t = anim.actionT;
                const grabbed = phase === 'action' && t >= 0.36 && t < selectedItem.impactAt;
                const homeRun = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                const crabX =
                  phase === 'approaching'
                    ? 680 - anim.objectAppear * 120
                    : phase === 'action'
                    ? t < 0.36
                      ? 560 - (t / 0.36) * 232
                      : t < selectedItem.impactAt
                      ? 328 + ((t - 0.36) / (selectedItem.impactAt - 0.36)) * 192
                      : 520 + ((t - selectedItem.impactAt) / (1 - selectedItem.impactAt)) * 540
                    : 1120;
                const crabY =
                  homeRun && phase === 'action'
                    ? GROUND_Y - 26 - ((t - selectedItem.impactAt) / (1 - selectedItem.impactAt)) * 360
                    : GROUND_Y - 26;
                const girlX =
                  phase === 'action' && t >= 0.48 && t < selectedItem.impactAt
                    ? 235 + ((t - 0.48) / (selectedItem.impactAt - 0.48)) * 205
                    : phase === 'action' && t >= selectedItem.impactAt
                    ? 440
                    : phase === 'aftermath' || phase === 'reveal'
                    ? 440
                    : 235;
                return (
                  <g>
                    {/* Colorful Beach Parasol Umbrella behind Lounge Bench */}
                    <g transform={`translate(215, ${GROUND_Y - 24})`}>
                      <line x1="0" y1="24" x2="-12" y2="-104" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
                      <path d="M-76 -92 Q-12 -152 52 -92 Z" fill="#F43F5E" stroke="#9F1239" strokeWidth="2.6" />
                      <path d="M-44 -92 Q-12 -148 20 -92 Z" fill="#FFFFFF" stroke="#9F1239" strokeWidth="2" />
                      <path d="M-24 -92 Q-12 -146 0 -92 Z" fill="#FACC15" />
                    </g>

                    {/* Detailed Wooden Slatted Beach Lounge Bench */}
                    <g transform={`translate(290, ${GROUND_Y - 24})`}>
                      <rect x="-82" y="0" width="164" height="13" rx="4" fill="#F59E0B" stroke="#92400E" strokeWidth="2.6" />
                      <line x1="-74" y1="6" x2="74" y2="6" stroke="#FEF3C7" strokeWidth="2" />
                      <line x1="-62" y1="13" x2="-66" y2="26" stroke="#78350F" strokeWidth="5.5" strokeLinecap="round" />
                      <line x1="62" y1="13" x2="66" y2="26" stroke="#78350F" strokeWidth="5.5" strokeLinecap="round" />
                    </g>

                    {/* Heroic Girlfriend with Swim Tube */}
                    <g transform={`translate(${girlX}, ${GROUND_Y - 54}) scale(-1, 1)`}>
                      <GirlfriendJollamanSvg
                        walkTime={anim.walkTime}
                        isWalking={phase === 'action' && t >= 0.48 && t < selectedItem.impactAt}
                        mood={homeRun ? 'swing' : t >= 0.44 ? 'holdingTube' : 'sitting'}
                      />
                    </g>

                    {/* Detailed King Crab */}
                    {crabX < 1060 && (
                      <g transform={`translate(${crabX}, ${crabY}) rotate(${homeRun ? t * 840 : 0})`}>
                        <DetailedBeachCrabSvg walkTime={anim.walkTime} snapping={grabbed || (phase === 'action' && t < 0.36)} />
                      </g>
                    )}

                    {grabbed && (
                      <g transform={`translate(${crabX}, ${GROUND_Y - 82})`}>
                        <rect x="-46" y="-16" width="92" height="26" rx="13" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2.4" />
                        <text x="0" y="2" textAnchor="middle" fontSize="14" fontWeight="900" fill="#B91C1C">
                          으악!! 찝!! 🦀
                        </text>
                      </g>
                    )}

                    {homeRun && (
                      <g>
                        <g transform={`translate(520, ${GROUND_Y - 126})`}>
                          <rect x="-78" y="-18" width="156" height="30" rx="15" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.6" />
                          <text x="0" y="2" textAnchor="middle" fontSize="15" fontWeight="900" fill="#B45309">
                            튜브 홈런 펑!! 🛟💥
                          </text>
                        </g>
                        <text x="900" y="96" fontSize="26">✨🦀</text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅖ: Angry Fluffy Mother Hen rapid-fires Rolling Eggs Bowling Strike! */}
              {activeChar === 'ㅖ' && (() => {
                const t = anim.actionT;
                const girlJump =
                  phase === 'action' && t >= 0.40 && t < 0.70
                    ? Math.sin(((t - 0.40) / 0.30) * Math.PI) * 98
                    : 0;
                const bowled = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                return (
                  <g>
                    {/* Athletic Girlfriend jumping gracefully over rolling eggs */}
                    <g transform={`translate(230, ${GROUND_Y - 52 - girlJump}) scale(-1, 1)`}>
                      <GirlfriendJollamanSvg walkTime={anim.walkTime} mood="happy" />
                    </g>
                    {girlJump > 10 && (
                      <text x={230} y={GROUND_Y - 114 - girlJump} textAnchor="middle" fontSize="18" fontWeight="900" fill="#DB2777">
                        폴짝! ✨
                      </text>
                    )}

                    {/* Detailed Fluffy Mother Hen in Straw Nest */}
                    <g transform={`translate(856, ${GROUND_Y - 36})`}>
                      <FluffyFarmHenSvg walkTime={anim.walkTime} laying={phase === 'action' && t < 0.65} />
                    </g>
                    <g transform={`translate(845, ${GROUND_Y - 102})`}>
                      <rect x="-46" y="-16" width="92" height="26" rx="13" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.2" />
                      <text x="0" y="2" textAnchor="middle" fontSize="14" fontWeight="900" fill="#92400E">
                        꼬꼬댁!! 🐔
                      </text>
                    </g>

                    {/* Glossy Rolling Eggs -> Cracked Fried Egg Splats on Bowling Strike */}
                    {Array.from({ length: 8 }).map((_, idx) => {
                      const p = phase === 'action' ? Math.max(0, Math.min((t - idx * 0.05) / 0.54, 1)) : phase === 'approaching' ? 0 : 1;
                      if (p <= 0) return null;
                      const ex = 815 - p * 600 + idx * 18;
                      const ey = GROUND_Y - 13 - Math.abs(Math.sin(p * Math.PI * 5)) * 12;
                      return (
                        <g key={idx} transform={`translate(${ex}, ${ey}) rotate(${bowled && idx < 4 ? 0 : -p * 720})`}>
                          {bowled && idx < 4 ? (
                            <g>
                              <path
                                d="M-16 4 Q-12 -4 0 -2 Q14 -5 18 4 Q12 10 -2 8 Q-14 10 -16 4 Z"
                                fill="#FFFFFF"
                                stroke="#CBD5E1"
                                strokeWidth="1.8"
                              />
                              <circle cx="1" cy="2" r="5.8" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
                              <circle cx="-1" cy="0" r="1.8" fill="#FEF08A" />
                            </g>
                          ) : (
                            <g>
                              <ellipse cx="0" cy="0" rx="12" ry="9.5" fill="#FEF3C7" stroke="#B45309" strokeWidth="2.2" />
                              <ellipse cx="-3.5" cy="-3" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.8" />
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* Sizzling fried egg splattered right on Jollaman's knocked-out head! */}
                    {bowled && (
                      <g>
                        <g transform={`translate(${EP4_ACTION_SPOT_X - 155}, ${GROUND_Y - 36})`}>
                          <path d="M-14 0 Q-6 -9 6 -6 Q16 -2 12 7 Q2 10 -10 7 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.6" />
                          <circle cx="0" cy="0" r="5.2" fill="#F59E0B" />
                        </g>
                        <g transform={`translate(${EP4_ACTION_SPOT_X - 40}, ${GROUND_Y - 122})`}>
                          <rect x="-82" y="-17" width="164" height="28" rx="14" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.4" />
                          <text x="0" y="2" textAnchor="middle" fontSize="14" fontWeight="900" fill="#B45309">
                            계란 스트라이크!! 🍳💥
                          </text>
                        </g>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅘ: Lush Cartoon Apple Tree Shake -> Giant Glossy Apple Bonk! */}
              {activeChar === 'ㅘ' && (() => {
                const t = anim.actionT;
                const shaking = phase === 'action' && t < 0.42;
                const treeShake = shaking ? Math.sin(t * 54) * 8 : 0;
                const appleFalling = phase === 'action' && t >= 0.40 && t < selectedItem.impactAt;
                const hit = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                const appleY = appleFalling
                  ? GROUND_Y - 170 + ((t - 0.40) / (selectedItem.impactAt - 0.40)) * 98
                  : hit && phase === 'action'
                  ? GROUND_Y - 72 + Math.min((t - selectedItem.impactAt) / 0.25, 1) * 58
                  : GROUND_Y - 14;
                const appleX = hit && phase === 'action'
                  ? EP4_ACTION_SPOT_X - Math.min((t - selectedItem.impactAt) / 0.25, 1) * 56
                  : hit
                  ? EP4_ACTION_SPOT_X - 56
                  : EP4_ACTION_SPOT_X;

                return (
                  <g>
                    {/* Rich Lush Cartoon Apple Tree */}
                    <g transform={`translate(${EP4_ACTION_SPOT_X}, ${GROUND_Y - 10})`}>
                      <LushAppleTreeSvg
                        walkTime={anim.walkTime}
                        shake={treeShake}
                        showCenterApple={!appleFalling && !hit}
                      />
                    </g>

                    {/* Playful Girlfriend shaking the apple tree trunk */}
                    <g transform={`translate(${EP4_ACTION_SPOT_X + 66}, ${GROUND_Y - 52})`}>
                      <GirlfriendJollamanSvg
                        walkTime={anim.walkTime}
                        mood={shaking ? 'shakeTree' : hit ? 'shock' : 'happy'}
                      />
                    </g>

                    {/* Nap Zzz floating while sleeping */}
                    {(phase === 'approaching' || (phase === 'action' && t < selectedItem.impactAt)) && (
                      <text x={EP4_ACTION_SPOT_X - 30} y={GROUND_Y - 68 + Math.sin(anim.walkTime * 4) * 5} fontSize="22">
                        💤
                      </text>
                    )}

                    {/* Falling / Bouncing Glossy Red Apple */}
                    {(appleFalling || hit) && (
                      <g transform={`translate(${appleX}, ${appleY}) rotate(${hit ? -38 : 0})`}>
                        <GlossyRedAppleSvg scale={1.12} />
                      </g>
                    )}

                    {hit && (
                      <g transform={`translate(${EP4_ACTION_SPOT_X}, ${GROUND_Y - 126})`}>
                        <rect x="-74" y="-17" width="148" height="28" rx="14" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2.5" />
                        <text x="0" y="2" textAnchor="middle" fontSize="14" fontWeight="900" fill="#DC2626">
                          콩!! 사과 직격 🍎💥
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅙ: Crying Girlfriend Slap & Storm-Off -> Giant Comic "왜?!!" Shockwave */}
              {activeChar === 'ㅙ' && (() => {
                const t = anim.actionT;
                const girlX =
                  phase === 'approaching'
                    ? 520 - anim.objectAppear * 130
                    : phase === 'action'
                    ? t < selectedItem.impactAt
                      ? 390 - (t / selectedItem.impactAt) * 28
                      : 362 + ((t - selectedItem.impactAt) / (1 - selectedItem.impactAt)) * 700
                    : 1080;
                const slapped = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                return (
                  <g>
                    {girlX < 1060 && (
                      <g transform={`translate(${girlX}, ${GROUND_Y - 52}) scale(${t >= selectedItem.impactAt ? -1 : 1}, 1)`}>
                        <GirlfriendJollamanSvg
                          walkTime={anim.walkTime}
                          isWalking={phase === 'action'}
                          mood="crying"
                        />
                      </g>
                    )}
                    {phase === 'action' && t >= selectedItem.impactAt && t < 0.65 && (
                      <text x={EP4_ACTION_SPOT_X + 20} y={GROUND_Y - 96} textAnchor="middle" fontSize="28" fontWeight="900">
                        짝!! 💥👋
                      </text>
                    )}
                    {slapped && (
                      <g>
                        <text x={EP4_ACTION_SPOT_X - 48} y={GROUND_Y - 102 + Math.sin(anim.walkTime * 8) * 4} fontSize="24" fontWeight="900" fill="#DB2777">
                          ?
                        </text>
                        <text x={EP4_ACTION_SPOT_X + 66} y={GROUND_Y - 94 + Math.cos(anim.walkTime * 8) * 4} fontSize="22" fontWeight="900" fill="#DB2777">
                          ?
                        </text>
                        <g transform={`translate(${EP4_ACTION_SPOT_X + 12}, ${GROUND_Y - 122})`}>
                          <WhySpeechBubbleSvg walkTime={anim.walkTime} />
                        </g>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅚ: Detailed Cartoon Storm Tornado sucks Jollaman skyward & plants headfirst! */}
              {activeChar === 'ㅚ' && (() => {
                const t = anim.actionT;
                const tornadoVisible = phase === 'approaching' || (phase === 'action' && t < 0.68);
                const tornadoX =
                  phase === 'approaching'
                    ? 840 - anim.objectAppear * 335
                    : 505 + Math.sin(anim.walkTime * 10) * 14;
                const splatted = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                return (
                  <g>
                    {tornadoVisible && (
                      <g transform={`translate(${tornadoX}, ${GROUND_Y - 150})`}>
                        <CartoonTornadoSvg walkTime={anim.walkTime} />
                      </g>
                    )}
                    {splatted && (
                      <g transform={`translate(505, ${GROUND_Y - 126})`}>
                        <rect x="-64" y="-17" width="128" height="28" rx="14" fill="#F0F9FF" stroke="#0EA5E9" strokeWidth="2.5" />
                        <text x="0" y="2" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0369A1">
                          거꾸로 푹!! 🌪️👟
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅝ: Cheeky Monkey (원숭이) Tosses Banana Peel -> Classic Cartoon Slip & Wipeout! */}
              {activeChar === 'ㅝ' && (() => {
                const t = anim.actionT;
                const slipped = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                const landed = (phase === 'action' && t >= 0.72) || phase === 'aftermath' || phase === 'reveal';
                const monkeyX =
                  phase === 'approaching'
                    ? 840 - anim.objectAppear * 165
                    : 675;
                const monkeyState: 'eating' | 'tossing' | 'laughing' =
                  phase === 'approaching' || (phase === 'action' && t < 0.16)
                    ? 'eating'
                    : phase === 'action' && t < selectedItem.impactAt
                    ? 'tossing'
                    : 'laughing';

                // Banana peel arc from monkey's hand (638, GROUND_Y-75) -> trap spot (472, GROUND_Y-6) -> kicks flying left on slip!
                const showPeel = phase !== 'approaching' && (phase !== 'action' || t >= 0.14);
                let peelX = 472;
                let peelY = GROUND_Y - 6;
                let peelRot = 0;
                if (phase === 'action' && t >= 0.14 && t < 0.36) {
                  const tossP = (t - 0.14) / 0.22;
                  peelX = 638 + (472 - 638) * tossP;
                  peelY = GROUND_Y - 75 + (69) * tossP - Math.sin(tossP * Math.PI) * 95;
                  peelRot = -tossP * 360;
                } else if (phase === 'action' && t >= selectedItem.impactAt) {
                  const kickP = Math.min((t - selectedItem.impactAt) / 0.3, 1);
                  peelX = 472 - kickP * 230;
                  peelY = GROUND_Y - 6 - Math.sin(kickP * Math.PI) * 85;
                  peelRot = -kickP * 540;
                } else if (phase === 'aftermath' || phase === 'reveal') {
                  peelX = 242;
                  peelY = GROUND_Y - 6;
                  peelRot = -22;
                }

                return (
                  <g>
                    {/* Worried Girlfriend warning Jollaman from the left */}
                    <g transform={`translate(212, ${GROUND_Y - 52}) scale(-1, 1)`}>
                      <GirlfriendJollamanSvg
                        walkTime={anim.walkTime}
                        mood={slipped ? 'shock' : t >= 0.24 ? 'point' : 'happy'}
                      />
                    </g>

                    {/* Cheeky Monkey Sprite */}
                    <g transform={`translate(${monkeyX}, ${GROUND_Y - 46})`}>
                      <CheekyMonkeySvg walkTime={anim.walkTime} state={monkeyState} />
                    </g>

                    {/* Banana Peel Trap */}
                    {showPeel && (
                      <g transform={`translate(${peelX}, ${peelY}) rotate(${peelRot})`}>
                        <BananaPeelSvg scale={1.15} />
                      </g>
                    )}

                    {/* Girlfriend warning bubble before impact */}
                    {phase === 'action' && t >= 0.24 && t < selectedItem.impactAt && (
                      <g transform={`translate(230, ${GROUND_Y - 134})`}>
                        <rect x="-58" y="-16" width="116" height="26" rx="13" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.2" />
                        <text x="0" y="2" textAnchor="middle" fontSize="13" fontWeight="900" fill="#B45309">
                          바나나 조심!! 🍌😱
                        </text>
                      </g>
                    )}

                    {/* Slip comic FX burst */}
                    {phase === 'action' && t >= selectedItem.impactAt && t < 0.72 && (
                      <g transform={`translate(472, ${GROUND_Y - 122})`}>
                        <rect x="-48" y="-17" width="96" height="28" rx="14" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2.5" />
                        <text x="0" y="2" textAnchor="middle" fontSize="15" fontWeight="900" fill="#A16207">
                          미끌!! 🍌💫
                        </text>
                      </g>
                    )}

                    {/* Monkey triumphant laugh bubble + Jollaman thud comic */}
                    {landed && (
                      <g>
                        <g transform={`translate(${monkeyX}, ${GROUND_Y - 136})`}>
                          <rect x="-54" y="-17" width="108" height="28" rx="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.4" />
                          <text x="0" y="2" textAnchor="middle" fontSize="15" fontWeight="900" fill="#B45309">
                            우끼끼!! 🐒🍌
                          </text>
                        </g>
                        <g transform={`translate(${EP4_ACTION_SPOT_X + 183}, ${GROUND_Y - 88})`}>
                          <rect x="-44" y="-15" width="88" height="24" rx="12" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2.2" />
                          <text x="0" y="1" textAnchor="middle" fontSize="13" fontWeight="900" fill="#DC2626">
                            쿵!! 아이고 💫
                          </text>
                        </g>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅞ: Girlfriend wipes tears -> Floral Wedding Arch + One-Knee Proposal! */}
              {activeChar === 'ㅞ' && (() => {
                const t = anim.actionT;
                const weddingMoment = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                const bellSwing = Math.sin(anim.walkTime * 10) * 14;
                const girlX =
                  phase === 'approaching'
                    ? EP4_ACTION_SPOT_X + 215 - anim.objectAppear * 135
                    : EP4_ACTION_SPOT_X + 82;
                return (
                  <g>
                    {/* Romantic Floral Wedding Arch blooms behind the couple on proposal! */}
                    {weddingMoment && (
                      <g transform={`translate(${EP4_ACTION_SPOT_X + 42}, ${GROUND_Y - 6})`}>
                        <FloralWeddingArchSvg />
                      </g>
                    )}

                    <g transform={`translate(${girlX}, ${GROUND_Y - 52})`}>
                      <GirlfriendJollamanSvg
                        walkTime={anim.walkTime}
                        isWalking={phase === 'approaching'}
                        mood={weddingMoment ? 'happy' : 'handkerchief'}
                      />
                    </g>

                    {weddingMoment && (
                      <g>
                        {/* Swinging Golden Wedding Bell overhead with chime arcs */}
                        <g transform={`translate(${EP4_ACTION_SPOT_X + 42}, 122) rotate(${bellSwing})`}>
                          <path d="M-24 22 Q-20 -18 0 -22 Q20 -18 24 22 Z" fill="#FACC15" stroke="#B45309" strokeWidth="3" />
                          <ellipse cx="0" cy="22" rx="24" ry="5" fill="#EAB308" stroke="#B45309" strokeWidth="2.2" />
                          <circle cx="0" cy="27" r="5.5" fill="#D97706" stroke="#78350F" strokeWidth="1.6" />
                          <path d="M-32 4 Q-40 12 -32 20 M32 4 Q40 12 32 20" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                        </g>

                        {/* Drifting Rose Petals & Confetti */}
                        {[-155, -88, -22, 46, 114, 178].map((cx, i) => (
                          <ellipse
                            key={cx}
                            cx={EP4_ACTION_SPOT_X + 42 + cx + Math.sin(anim.walkTime * 4 + i) * 12}
                            cy={135 + ((anim.walkTime * 82 + i * 42) % 190)}
                            rx="6"
                            ry="4"
                            transform={`rotate(${(anim.walkTime * 120 + i * 60) % 360}, ${EP4_ACTION_SPOT_X + 42 + cx}, ${135 + ((anim.walkTime * 82 + i * 42) % 190)})`}
                            fill={['#EC4899', '#FACC15', '#38BDF8', '#FB7185'][i % 4]}
                          />
                        ))}

                        {/* Sparkling Velvet Ring Box held out by proposing Jollaman */}
                        <g transform={`translate(${EP4_ACTION_SPOT_X + 36}, ${GROUND_Y - 62})`}>
                          <RingBoxSparkleSvg walkTime={anim.walkTime} />
                        </g>

                        {/* Floating Reconciliation Hearts */}
                        <text
                          x={EP4_ACTION_SPOT_X + 42}
                          y={GROUND_Y - 134 + Math.sin(anim.walkTime * 5) * 6}
                          textAnchor="middle"
                          fontSize="30"
                        >
                          💍💖✨
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅟ: Detailed Cute Cartoon Mouse scares Jollaman -> Badass Girlfriend Stomps Mouse Away! */}
              {activeChar === 'ㅟ' && (() => {
                const t = anim.actionT;
                const scared = phase === 'action' && t >= 0.22 && t < selectedItem.impactAt + 0.06;
                const stomped = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                const mouseX =
                  phase === 'approaching'
                    ? 760 - anim.objectAppear * 165
                    : phase === 'action'
                    ? t < selectedItem.impactAt
                      ? 595 - (t / selectedItem.impactAt) * 100
                      : 495 + ((t - selectedItem.impactAt) / (1 - selectedItem.impactAt)) * 620
                    : 1120;
                const mouseY =
                  stomped && phase === 'action'
                    ? GROUND_Y - 22 - Math.sin(Math.min((t - selectedItem.impactAt) / 0.28, 1) * Math.PI) * 90
                    : GROUND_Y - 18;
                return (
                  <g>
                    <g transform={`translate(465, ${GROUND_Y - 52})`}>
                      <GirlfriendJollamanSvg
                        walkTime={anim.walkTime}
                        mood={phase === 'action' && t >= selectedItem.impactAt - 0.06 && t < selectedItem.impactAt + 0.16 ? 'stomp' : 'happy'}
                      />
                    </g>

                    {/* Detailed Cartoon Mouse */}
                    {mouseX < 1060 && (
                      <g transform={`translate(${mouseX}, ${mouseY}) rotate(${stomped ? (t - selectedItem.impactAt) * 540 : 0})`}>
                        <DetailedCartoonMouseSvg walkTime={anim.walkTime} runningRight={stomped} />
                      </g>
                    )}

                    {/* Mouse Squeak Cue */}
                    {!stomped && mouseX < 900 && (
                      <text x={mouseX} y={GROUND_Y - 46} textAnchor="middle" fontSize="14" fontWeight="900" fill="#475569">
                        찍찍!
                      </text>
                    )}

                    {scared && (
                      <g transform={`translate(432, ${GROUND_Y - 144})`}>
                        <rect x="-64" y="-16" width="128" height="26" rx="13" fill="#FFFFFF" stroke="#64748B" strokeWidth="2.2" />
                        <text x="0" y="2" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155">
                          으악!! 쥐다!! 🐭😱
                        </text>
                      </g>
                    )}

                    {stomped && (
                      <g transform={`translate(520, ${GROUND_Y - 122})`}>
                        <rect x="-66" y="-17" width="132" height="28" rx="14" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2.4" />
                        <text x="0" y="2" textAnchor="middle" fontSize="14" fontWeight="900" fill="#DC2626">
                          저리 가! 쾅!! 👟💨
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅢ: Runaway Detailed Office Swivel Chair -> Girlfriend Foot-Brake -> Cozy Couple Happy Ending! */}
              {activeChar === 'ㅢ' && (() => {
                const t = anim.actionT;
                const rolling = phase === 'action' && t < selectedItem.impactAt;
                const chairX =
                  phase === 'approaching'
                    ? 480
                    : rolling
                    ? 480 + (t / selectedItem.impactAt) * 175
                    : 655;
                const caught = (phase === 'action' && t >= selectedItem.impactAt) || phase === 'aftermath' || phase === 'reveal';
                const seatedTogether = (phase === 'action' && t >= 0.76) || phase === 'aftermath' || phase === 'reveal';
                const girlX =
                  phase === 'action' && t >= 0.50 && t < selectedItem.impactAt
                    ? 800 - ((t - 0.50) / (selectedItem.impactAt - 0.50)) * 116
                    : seatedTogether
                    ? 675
                    : caught
                    ? 684
                    : 800;
                const girlY = seatedTogether ? GROUND_Y - 64 : GROUND_Y - 52;
                return (
                  <g>
                    {/* Detailed Ergonomic Office Swivel Chair */}
                    <g transform={`translate(${chairX}, ${GROUND_Y - 40})`}>
                      <DetailedOfficeChairSvg walkTime={anim.walkTime} rolling={rolling} />
                    </g>

                    {/* Cool Girlfriend foot-stopping chair & sitting together */}
                    <g transform={`translate(${girlX}, ${girlY})`}>
                      <GirlfriendJollamanSvg
                        walkTime={anim.walkTime}
                        isWalking={phase === 'action' && t >= 0.50 && t < selectedItem.impactAt}
                        mood={seatedTogether ? 'sitting' : caught ? 'stomp' : 'happy'}
                      />
                    </g>

                    {rolling && (
                      <g transform={`translate(${jollaX}, ${GROUND_Y - 114})`}>
                        <rect x="-42" y="-16" width="84" height="24" rx="12" fill="#FFFFFF" stroke="#059669" strokeWidth="2.2" />
                        <text x="0" y="0" textAnchor="middle" fontSize="13" fontWeight="900" fill="#047857">
                          거기 서!! 💦
                        </text>
                      </g>
                    )}

                    {caught && !seatedTogether && (
                      <g transform={`translate(655, ${GROUND_Y - 122})`}>
                        <rect x="-64" y="-16" width="128" height="26" rx="13" fill="#ECFDF5" stroke="#059669" strokeWidth="2.4" />
                        <text x="0" y="2" textAnchor="middle" fontSize="14" fontWeight="900" fill="#047857">
                          탁! 잡았다!! 👟✨
                        </text>
                      </g>
                    )}

                    {seatedTogether && (
                      <g>
                        <text
                          x={655}
                          y={GROUND_Y - 140 + Math.sin(anim.walkTime * 5) * 6}
                          textAnchor="middle"
                          fontSize="30"
                        >
                          💖💕✨
                        </text>
                        <g transform={`translate(655, ${GROUND_Y - 180})`}>
                          <rect x="-68" y="-16" width="136" height="28" rx="14" fill="#FFF1F2" stroke="#EC4899" strokeWidth="2.5" />
                          <text x="0" y="2" textAnchor="middle" fontSize="13" fontWeight="900" fill="#BE185D">
                            우리 해피엔딩! ❤️
                          </text>
                        </g>
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* Main Jollaman Stick Figure */}
          {jollaVisible && (
            <g
              transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing}, 1)`}
              className="cursor-pointer"
            >
              <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
              {jollaRot === 0 && !upsideDownFlailPos && !kneeling && !sitting && (
                <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
              )}
              <JollamanCharacterSvg
                faceMode={jollaFaceMode}
                isWalking={isWalkingMotion}
                legSwing={legSwing}
                armSwing={armSwing}
                showHeadBump={showHeadBump}
                showDizzyStars={showDizzyStars}
                slapMark={slapMark}
                kneeling={kneeling}
                kneelStyle={kneelStyle}
                sitting={sitting}
                blushCheeks={blushCheeks}
                walkTime={anim.walkTime}
                activeChar={selectedItem.char}
              />
            </g>
          )}

          {/* Upside-down kicking legs splat pose for ㅐ (pond) and ㅚ (tornado drop) */}
          {upsideDownFlailPos && (() => {
            const kick = Math.sin(anim.walkTime * 18) * 14;
            return (
              <g transform={`translate(${upsideDownFlailPos.x}, ${upsideDownFlailPos.y})`}>
                {upsideDownFlailPos.inWater ? (
                  <ellipse cx="0" cy="4" rx="28" ry="7" fill="#BAE6FD" opacity="0.85" />
                ) : (
                  <ellipse cx="0" cy="2" rx="26" ry="6" fill="#94A3B8" opacity="0.65" />
                )}
                <line x1="-6" y1="0" x2={-16 + kick} y2="-38" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
                <ellipse cx={-16 + kick} cy="-40" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
                <line x1="6" y1="0" x2={16 - kick} y2="-38" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
                <ellipse cx={16 - kick} cy="-40" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
              </g>
            );
          })()}

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
                ? '하늘의 복합모음 (ㅐ ~ ㅢ)을 눌러보세요!'
                : `${selectedItem.char} · ${selectedItem.sound} · ${selectedItem.triggerWord} (${localizedMeaning})`}
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
                {selectedItem.sound}, {selectedItem.triggerWord}!!
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

export default StickmanBokhapMoeumSim;
