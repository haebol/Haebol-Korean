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
  useStickmanAudio,
} from './stickmanShared';

export type { StickmanLang };
export type StickmanJaeumSimProps = StickmanSimProps;

interface ConsonantItem {
  char: string;
  name: string;
  soundCue: string;
  ttsSoundCue: string;
  triggerWord: string;
  sceneTheme: BackdropThemeKey;
  color: string;
  skyX: number;
  skyY: number;
}

const KOREAN_CONSONANTS: ConsonantItem[] = [
  { char: 'ㄱ', name: '기역', soundCue: '그', ttsSoundCue: '그', triggerWord: '기차', sceneTheme: 'railway', color: '#EF4444', skyX: 70, skyY: 64 },
  { char: 'ㄴ', name: '니은', soundCue: '느', ttsSoundCue: '느', triggerWord: '나무', sceneTheme: 'sunset', color: '#F97316', skyX: 136, skyY: 82 },
  { char: 'ㄷ', name: '디귿', soundCue: '드', ttsSoundCue: '드', triggerWord: '다리', sceneTheme: 'jungle', color: '#EAB308', skyX: 202, skyY: 60 },
  { char: 'ㄹ', name: '리을', soundCue: '르', ttsSoundCue: '르', triggerWord: '로켓', sceneTheme: 'space', color: '#22C55E', skyX: 268, skyY: 84 },
  { char: 'ㅁ', name: '미음', soundCue: '므', ttsSoundCue: '므', triggerWord: '모기', sceneTheme: 'jungle', color: '#10B981', skyX: 334, skyY: 64 },
  { char: 'ㅂ', name: '비읍', soundCue: '브', ttsSoundCue: '브', triggerWord: '번개', sceneTheme: 'thunderstorm', color: '#06B6D4', skyX: 400, skyY: 82 },
  { char: 'ㅅ', name: '시옷', soundCue: '스', ttsSoundCue: '스', triggerWord: '사자', sceneTheme: 'savannah', color: '#0EA5E9', skyX: 466, skyY: 60 },
  { char: 'ㅇ', name: '이응', soundCue: '첫소리 무음', ttsSoundCue: '첫소리는 무음', triggerWord: '오리', sceneTheme: 'farm', color: '#3B82F6', skyX: 534, skyY: 84 },
  { char: 'ㅈ', name: '지읒', soundCue: '즈', ttsSoundCue: '즈', triggerWord: '자동차', sceneTheme: 'city', color: '#6366F1', skyX: 600, skyY: 62 },
  { char: 'ㅊ', name: '치읓', soundCue: '츠', ttsSoundCue: '츠', triggerWord: '춤', sceneTheme: 'disco', color: '#8B5CF6', skyX: 666, skyY: 84 },
  { char: 'ㅋ', name: '키읔', soundCue: '크', ttsSoundCue: '크', triggerWord: '코끼리', sceneTheme: 'savannah', color: '#A855F7', skyX: 732, skyY: 60 },
  { char: 'ㅌ', name: '티읕', soundCue: '트', ttsSoundCue: '트', triggerWord: '토끼', sceneTheme: 'nightmarket', color: '#EC4899', skyX: 798, skyY: 84 },
  { char: 'ㅍ', name: '피읖', soundCue: '프', ttsSoundCue: '프', triggerWord: '풍선', sceneTheme: 'beach', color: '#F43F5E', skyX: 864, skyY: 62 },
  { char: 'ㅎ', name: '히읗', soundCue: '흐', ttsSoundCue: '흐', triggerWord: '호랑이', sceneTheme: 'sunset', color: '#E11D48', skyX: 930, skyY: 82 },
];

const REVEAL_I18N: Record<
  string,
  { phonetic: string; wordRom: string; meanings: Record<StickmanLang, string> }
> = {
  ㄱ: { phonetic: '[g / k]', wordRom: 'gicha', meanings: { en: 'train', vi: 'tàu hỏa', zh: '火车', ja: '電車', ru: 'поезд', mn: 'галт тэрэг', bn: 'ট্রেন' } },
  ㄴ: { phonetic: '[n]', wordRom: 'namu', meanings: { en: 'tree', vi: 'cây', zh: '树', ja: '木', ru: 'дерево', mn: 'мод', bn: 'গাছ' } },
  ㄷ: { phonetic: '[d / t]', wordRom: 'dari', meanings: { en: 'bridge', vi: 'cây cầu', zh: '桥', ja: '橋', ru: 'мост', mn: 'гүүр', bn: 'সেতু' } },
  ㄹ: { phonetic: '[r / l]', wordRom: 'roket', meanings: { en: 'rocket', vi: 'tên lửa', zh: '火箭', ja: 'ロケット', ru: 'ракета', mn: 'пуужин', bn: 'রকেট' } },
  ㅁ: { phonetic: '[m]', wordRom: 'mogi', meanings: { en: 'mosquito', vi: 'con muỗi', zh: '蚊子', ja: '蚊', ru: 'комар', mn: 'шумуул', bn: 'মশা' } },
  ㅂ: { phonetic: '[b / p]', wordRom: 'beongae', meanings: { en: 'lightning', vi: 'tia chớp', zh: '闪电', ja: '雷', ru: 'молния', mn: 'аянга', bn: 'বজ্রপাত' } },
  ㅅ: { phonetic: '[s / t]', wordRom: 'saja', meanings: { en: 'lion', vi: 'sư tử', zh: '狮子', ja: 'ライオン', ru: 'лев', mn: 'арслан', bn: 'সিংহ' } },
  ㅇ: { phonetic: '[silent / -ng]', wordRom: 'ori', meanings: { en: 'duck', vi: 'con vịt', zh: '鸭子', ja: 'アヒル', ru: 'утка', mn: 'нугас', bn: 'হাঁস' } },
  ㅈ: { phonetic: '[j / t]', wordRom: 'jadongcha', meanings: { en: 'car', vi: 'ô tô', zh: '汽车', ja: '車', ru: 'машина', mn: 'машин', bn: 'গাড়ি' } },
  ㅊ: { phonetic: '[ch / t]', wordRom: 'chum', meanings: { en: 'dance', vi: 'nhảy múa', zh: '跳舞', ja: 'ダンス', ru: 'танец', mn: 'бүжиг', bn: 'নাচ' } },
  ㅋ: { phonetic: '[k]', wordRom: 'kokkiri', meanings: { en: 'elephant', vi: 'con voi', zh: '大象', ja: 'ゾウ', ru: 'слон', mn: 'заан', bn: 'হাতি' } },
  ㅌ: { phonetic: '[t]', wordRom: 'tokki', meanings: { en: 'rabbit', vi: 'con thỏ', zh: '兔子', ja: 'ウサギ', ru: 'кролик', mn: 'туулай', bn: 'খরগোশ' } },
  ㅍ: { phonetic: '[p]', wordRom: 'pungseon', meanings: { en: 'balloon', vi: 'bóng bay', zh: '气球', ja: '風船', ru: 'шарик', mn: 'бөмбөлөг', bn: 'বেলুন' } },
  ㅎ: { phonetic: '[h / t]', wordRom: 'horangi', meanings: { en: 'tiger', vi: 'con hổ', zh: '老虎', ja: 'トラ', ru: 'тигр', mn: 'бар', bn: 'বাঘ' } },
};



const getActionDuration = (char: string): number => {
  if (char === 'ㄱ') return 2.05;
  if (char === 'ㅈ') return 3.6;
  if (char === 'ㅊ') return 2.4;
  if (char === 'ㅋ') return 2.35;
  if (char === 'ㅍ') return 2.6;
  if (char === 'ㅎ') return 3.25;
  if (char === 'ㅁ' || char === 'ㅇ') return 1.65;
  return 1.5;
};

// ============================================================================
// INLINE SPRITES & BACKDROP
// ============================================================================

const MuscularRabbitSvg: React.FC = () => (
  <g>
    <circle cx="-48" cy="24" r="14" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3.5" />
    <ellipse cx="-14" cy="-64" rx="11" ry="28" transform="rotate(-12, -14, -64)" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3.5" />
    <ellipse cx="-14" cy="-62" rx="5.5" ry="18" transform="rotate(-12, -14, -62)" fill="#FDA4AF" />
    <ellipse cx="14" cy="-64" rx="11" ry="28" transform="rotate(14, 14, -64)" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3.5" />
    <ellipse cx="14" cy="-62" rx="5.5" ry="18" transform="rotate(14, 14, -62)" fill="#FDA4AF" />
    <path d="M-24 38 Q-44 58 -36 80 L-12 80 Q-8 56 -6 38 Z" fill="#F1F5F9" stroke="#0F172A" strokeWidth="3.5" />
    <path d="M16 32 Q54 22 86 8 Q94 18 82 28 Q50 42 18 48 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
    <ellipse cx="86" cy="14" rx="13" ry="8" transform="rotate(-18, 86, 14)" fill="#FDE047" stroke="#0F172A" strokeWidth="3" />
    <path d="M-40 -14 Q0 -26 40 -14 Q48 16 32 42 Q0 48 -32 42 Q-48 16 -40 -14 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />
    <rect x="-33" y="28" width="66" height="10" rx="3" fill="#0F172A" />
    <rect x="-6" y="26" width="12" height="14" rx="2" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
    <path d="M-26 -2 Q-12 8 0 0 Q12 8 26 -2" fill="none" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M-12 10 H12 M-11 19 H11 M0 6 V24" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M-36 -8 Q-68 -18 -64 12 Q-52 24 -32 10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
    <circle cx="-54" cy="-6" r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
    <g transform="translate(-62, -6) rotate(-25)">
      <polygon points="-8,-44 10,-44 1,18" fill="#F97316" stroke="#9A3412" strokeWidth="2.8" />
      <path d="M-5 -30 H5 M-4 -18 H4" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
      <path d="M-2 -44 Q-12 -62 -2 -60 Q2 -66 6 -58 Q14 -62 4 -44 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
    </g>
    <path d="M36 -8 Q66 -22 68 2 Q56 16 36 8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
    <circle cx="58" cy="-4" r="13" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
    <circle cx="0" cy="-32" r="24" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />
    <rect x="-20" y="-42" width="18" height="11" rx="3" fill="#0F172A" />
    <rect x="2" y="-42" width="18" height="11" rx="3" fill="#0F172A" />
    <line x1="-2" y1="-38" x2="2" y2="-38" stroke="#0F172A" strokeWidth="3" />
    <line x1="-16" y1="-39" x2="-9" y2="-34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <line x1="6" y1="-39" x2="13" y2="-34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <polygon points="-4,-28 4,-28 0,-23" fill="#FB7185" />
    <path d="M-9 -18 Q0 -12 10 -19" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
  </g>
);



const SkinnyMosquitoSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const wingFlap = Math.sin(walkTime * 54) * 26;
  return (
    <g>
      <ellipse
        cx="14"
        cy="-18"
        rx="28"
        ry="7"
        transform={`rotate(${wingFlap - 22}, 8, -10)`}
        fill="#E0F2FE"
        fillOpacity="0.82"
        stroke="#64748B"
        strokeWidth="1.6"
      />
      <ellipse
        cx="18"
        cy="-14"
        rx="24"
        ry="5.5"
        transform={`rotate(${-wingFlap - 12}, 10, -10)`}
        fill="#BAE6FD"
        fillOpacity="0.72"
        stroke="#64748B"
        strokeWidth="1.5"
      />
      <path d="M-4 2 L-16 20 L-24 34" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M6 3 L2 24 L-4 38" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 3 L24 24 L32 36" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M26 2 L38 18 L48 30" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <path d="M-6 -2 Q16 -9 44 2 Q48 6 42 10 Q14 7 -6 4 Z" fill="#334155" stroke="#0F172A" strokeWidth="2.2" />
      <line x1="12" y1="-4" x2="12" y2="7" stroke="#CBD5E1" strokeWidth="2.4" />
      <line x1="22" y1="-3" x2="22" y2="8" stroke="#CBD5E1" strokeWidth="2.4" />
      <line x1="32" y1="-1" x2="32" y2="8" stroke="#CBD5E1" strokeWidth="2.2" />
      <ellipse cx="-10" cy="0" rx="8" ry="6" fill="#475569" stroke="#0F172A" strokeWidth="2.2" />
      <circle cx="-21" cy="-2" r="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="-23" cy="-4" r="2.6" fill="#EF4444" />
      <polygon points="-26,-2 -64,2 -26,1" fill="#64748B" stroke="#0F172A" strokeWidth="1.2" />
    </g>
  );
};

const TigerSpriteSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const tailWag = Math.sin(walkTime * 12) * 14;
  return (
    <g>
      <path d={`M48 4 Q80 ${-16 + tailWag} 84 -36`} fill="none" stroke="#F97316" strokeWidth="10" strokeLinecap="round" />
      <path d={`M48 4 Q80 ${-16 + tailWag} 84 -36`} fill="none" stroke="#1E293B" strokeWidth="10" strokeDasharray="6 10" strokeLinecap="round" />
      <rect x="-32" y="22" width="18" height="34" rx="7" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
      <rect x="26" y="22" width="18" height="34" rx="7" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
      <ellipse cx="-26" cy="54" rx="11" ry="6" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
      <ellipse cx="32" cy="54" rx="11" ry="6" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
      <ellipse cx="6" cy="6" rx="52" ry="28" fill="#F97316" stroke="#9A3412" strokeWidth="3" />
      <ellipse cx="6" cy="22" rx="38" ry="12" fill="#FFEDD5" />
      <path d="M-16 -20 L-10 -2 L-22 -18" fill="#0F172A" />
      <path d="M2 -22 L8 -2 L-4 -20" fill="#0F172A" />
      <path d="M20 -20 L24 -2 L14 -18" fill="#0F172A" />
      <g transform="translate(-46, -16)">
        <circle cx="-16" cy="-22" r="10" fill="#F97316" stroke="#9A3412" strokeWidth="2.5" />
        <circle cx="16" cy="-22" r="10" fill="#F97316" stroke="#9A3412" strokeWidth="2.5" />
        <circle cx="-16" cy="-22" r="5" fill="#1E293B" />
        <circle cx="16" cy="-22" r="5" fill="#1E293B" />
        <circle cx="0" cy="0" r="27" fill="#FB923C" stroke="#9A3412" strokeWidth="3" />
        <ellipse cx="-10" cy="8" rx="12" ry="10" fill="#FFF7ED" />
        <ellipse cx="10" cy="8" rx="12" ry="10" fill="#FFF7ED" />
        <path d="M-8 -16 L8 -16 M-6 -10 L6 -10 M0 -18 L0 -8" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M-24 -2 L-16 0 M-25 5 L-17 6 M24 -2 L16 0 M25 5 L17 6" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="-10" cy="-4" r="3.8" fill="#0F172A" />
        <circle cx="10" cy="-4" r="3.8" fill="#0F172A" />
        <circle cx="-9" cy="-5" r="1.3" fill="#FFFFFF" />
        <circle cx="11" cy="-5" r="1.3" fill="#FFFFFF" />
        <polygon points="-4,3 4,3 0,8" fill="#F43F5E" />
        <path d="M-7 13 Q0 19 7 13" fill="#DC2626" stroke="#0F172A" strokeWidth="2" />
      </g>
    </g>
  );
};

const DetailedLionSvg: React.FC<{ roaring?: boolean }> = ({ roaring = false }) => (
  <g>
    <path d="M44 6 Q78 -22 72 -46" fill="none" stroke="#D97706" strokeWidth="6.5" strokeLinecap="round" />
    <path d="M72 -46 Q82 -58 68 -62 Q58 -52 72 -46 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />
    <rect x="24" y="20" width="16" height="34" rx="6" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
    <rect x="-12" y="20" width="16" height="34" rx="6" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
    <ellipse cx="29" cy="54" rx="11" ry="6" fill="#FCD34D" stroke="#78350F" strokeWidth="2" />
    <ellipse cx="-7" cy="54" rx="11" ry="6" fill="#FCD34D" stroke="#78350F" strokeWidth="2" />
    <path d="M-24 -12 Q14 -24 52 -6 Q62 18 46 32 Q12 36 -20 26 Z" fill="#F59E0B" stroke="#92400E" strokeWidth="3" />
    <ellipse cx="18" cy="24" rx="28" ry="10" fill="#FEF3C7" />
    <g transform="translate(-32, -16)">
      <polygon
        points="0,-52 14,-38 34,-44 32,-24 50,-16 38,2 48,22 28,24 24,44 6,34 -10,48 -20,30 -40,34 -34,14 -52,2 -36,-14 -44,-34 -24,-32 -14,-50"
        fill="#92400E"
        stroke="#451A03"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="0" r="32" fill="#B45309" />
      <circle cx="-22" cy="-24" r="9" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
      <circle cx="18" cy="-24" r="9" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
      <circle cx="-22" cy="-24" r="4" fill="#78350F" />
      <circle cx="18" cy="-24" r="4" fill="#78350F" />
      <circle cx="-2" cy="0" r="24" fill="#FBBF24" stroke="#92400E" strokeWidth="2.5" />
      <ellipse cx="-2" cy="8" rx="17" ry="13" fill="#FDE68A" />
      <path d="M-17 -13 L-6 -7 M13 -13 L2 -7" stroke="#451A03" strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx="-11" cy="-6" rx="3.8" ry="4.2" fill="#0F172A" />
      <ellipse cx="7" cy="-6" rx="3.8" ry="4.2" fill="#0F172A" />
      <circle cx="-10" cy="-7.5" r="1.4" fill="#FFFFFF" />
      <circle cx="8" cy="-7.5" r="1.4" fill="#FFFFFF" />
      <polygon points="-7,1 3,1 -2,6" fill="#78350F" />
      <path d="M-20 5 L-32 3 M-20 10 L-32 12 M16 5 L28 3 M16 10 L28 12" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />
      {roaring ? (
        <g>
          <ellipse cx="-2" cy="15" rx="12" ry="11" fill="#7F1D1D" stroke="#451A03" strokeWidth="2" />
          <ellipse cx="-2" cy="21" rx="7" ry="4.5" fill="#F43F5E" />
          <polygon points="-10,7 -6,7 -8,14" fill="#FFFFFF" />
          <polygon points="2,7 6,7 4,14" fill="#FFFFFF" />
          <polygon points="-9,24 -6,18 -4,24" fill="#FFFFFF" />
          <polygon points="1,24 4,18 6,24" fill="#FFFFFF" />
        </g>
      ) : (
        <path d="M-9 12 Q-2 17 5 12" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      )}
    </g>
  </g>
);

const SpaceXRocketSvg: React.FC<{ firing?: boolean; legsDeployed?: boolean; walkTime: number }> = ({
  firing = true,
  legsDeployed = true,
  walkTime,
}) => {
  const flameFlicker = 1 + Math.sin(walkTime * 48) * 0.18;
  return (
    <g>
      {firing && (
        <g transform={`translate(0, 48) scale(1, ${flameFlicker})`}>
          <path d="M-16 0 Q-22 36 0 72 Q22 36 16 0 Z" fill="#F97316" opacity="0.92" />
          <path d="M-9 0 Q-12 24 0 50 Q12 24 9 0 Z" fill="#FDE047" />
          <path d="M-4 0 L0 26 L4 0 Z" fill="#FFFFFF" />
        </g>
      )}
      <path
        d={legsDeployed ? 'M-14 26 L-34 52 L-24 52 L-10 38 Z' : 'M-14 14 L-18 38 L-12 38 Z'}
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="2"
      />
      <path
        d={legsDeployed ? 'M14 26 L34 52 L24 52 L10 38 Z' : 'M14 14 L18 38 L12 38 Z'}
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="2"
      />
      <polygon points="-9,38 9,38 13,49 -13,49" fill="#334155" stroke="#0F172A" strokeWidth="2" />
      <rect x="-15" y="-58" width="30" height="96" rx="4" fill="#F8FAFC" stroke="#1E293B" strokeWidth="3" />
      <rect x="-15" y="-44" width="30" height="16" fill="#1E293B" />
      <rect x="-24" y="-42" width="9" height="8" rx="1.5" fill="#475569" stroke="#0F172A" strokeWidth="1.5" />
      <rect x="15" y="-42" width="9" height="8" rx="1.5" fill="#475569" stroke="#0F172A" strokeWidth="1.5" />
      <path d="M-15 -58 Q0 -96 15 -58 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.8" />
      <circle cx="0" cy="-10" r="10" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <text x="0" y="-4" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FFFFFF">
        ㄹ
      </text>
    </g>
  );
};

const MirrorBallSvg: React.FC<{ dropY: number; walkTime: number }> = ({ dropY, walkTime }) => {
  const glintShift = (walkTime * 22) % 16;
  const beamRot = Math.sin(walkTime * 4) * 12;
  return (
    <g>
      <line x1="0" y1="-80" x2="0" y2={dropY - 34} stroke="#94A3B8" strokeWidth="3.5" />
      <g transform={`translate(0, ${dropY})`}>
        <circle cx="0" cy="0" r="56" fill="#FDE047" opacity="0.16" />
        <g transform={`rotate(${beamRot})`} opacity="0.72">
          <polygon points="-4,0 -68,-14 -68,14" fill="#F472B6" opacity="0.55" />
          <polygon points="4,0 68,-14 68,14" fill="#38BDF8" opacity="0.55" />
          <polygon points="0,4 -16,74 16,74" fill="#FACC15" opacity="0.45" />
        </g>
        <circle cx="0" cy="0" r="34" fill="#E2E8F0" stroke="#FFFFFF" strokeWidth="2.5" />
        {[-22, -11, 0, 11, 22].map((ty, rIdx) => (
          <line key={`h-${rIdx}`} x1="-31" y1={ty} x2="31" y2={ty} stroke="#64748B" strokeWidth="1.5" opacity="0.65" />
        ))}
        {[-24, -12, 0, 12, 24].map((tx, cIdx) => {
          const xPos = ((tx + glintShift + 30) % 60) - 30;
          return <line key={`v-${cIdx}`} x1={xPos} y1="-31" x2={xPos} y2="31" stroke="#475569" strokeWidth="1.5" opacity="0.65" />;
        })}
        <rect x={-16 + glintShift * 0.4} y="-14" width="9" height="9" fill="#FFFFFF" />
        <rect x={6 - glintShift * 0.3} y="4" width="9" height="9" fill="#FEF08A" />
        <rect x="-6" y="14" width="8" height="8" fill="#BAE6FD" />
        <circle cx="0" cy="0" r="34" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
      </g>
    </g>
  );
};

const DiscoDancingJollamanSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const modeCycle = (walkTime * 1.15) % 2;
  const isBreakdance = modeCycle >= 1.05;
  const w1 = Math.sin(walkTime * 15);
  const w2 = Math.cos(walkTime * 15);
  const bounce = Math.abs(Math.sin(walkTime * 12)) * 8;

  if (isBreakdance) {
    const kick = Math.sin(walkTime * 22) * 26;
    const tilt = Math.sin(walkTime * 11) * 14;
    return (
      <g transform={`translate(0, ${6 - bounce * 0.6}) rotate(${tilt})`}>
        <ellipse cx="0" cy="46" rx="28" ry="6" fill="#38BDF8" opacity="0.45" />
        <path d={`M0 -6 Q${-18 + kick * 0.4} -28 ${-26 + kick} -46`} fill="none" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" />
        <ellipse cx={-26 + kick} cy="-47" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        <path d={`M0 -6 Q${18 - kick * 0.4} -26 ${28 - kick} -42`} fill="none" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" />
        <ellipse cx={28 - kick} cy="-43" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        <line x1="0" y1="-8" x2="0" y2="20" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
        <line x1="0" y1="16" x2="-12" y2="45" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <circle cx="-12" cy="45" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        <path d={`M0 14 Q22 ${12 + w1 * 10} 28 ${-4 + w2 * 10}`} fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
        <circle cx="28" cy={-4 + w2 * 10} r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        <circle cx="14" cy="24" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        <path d="M9 21 Q12 18 15 21 M17 21 Q20 18 23 21" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M10 29 Q15 33 21 29" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g transform={`translate(${w1 * 7}, ${-bounce})`}>
      <ellipse cx="0" cy={52 + bounce} rx="24" ry="6" fill="#EC4899" opacity="0.38" />
      <path d={`M-2 14 Q${-16 + w1 * 12} 30 ${-14 - w2 * 10} 47`} fill="none" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
      <ellipse cx={-12 - w2 * 10} cy="48" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
      <path d={`M2 14 Q${18 + w2 * 12} 30 ${14 + w1 * 10} 47`} fill="none" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
      <ellipse cx={16 + w1 * 10} cy="48" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
      <path d={`M${w1 * 5} -19 Q${-w1 * 9} -2 0 15`} fill="none" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
      <path d={`M${w1 * 4} -12 Q-22 ${-24 + w1 * 16} -36 ${-8 - w1 * 18}`} fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
      <circle cx="-36" cy={-8 - w1 * 18} r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
      <path d={`M${w1 * 4} -12 Q22 ${-24 - w1 * 16} 36 ${-8 + w1 * 18}`} fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
      <circle cx="36" cy={-8 + w1 * 18} r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
      <g transform={`translate(${w1 * 6}, -35) rotate(${w1 * 14})`}>
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        <path d="M-2 -16 Q3 -25 8 -18" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        <rect x="-12" y="-6" width="10" height="7" rx="2" fill="#0F172A" />
        <rect x="2" y="-6" width="10" height="7" rx="2" fill="#0F172A" />
        <line x1="-2" y1="-3" x2="2" y2="-3" stroke="#0F172A" strokeWidth="2.2" />
        <path d="M-5 6 Q0 11 6 6" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
};

const DancingTigerSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const modeCycle = (walkTime * 1.15) % 2;
  const isBreakdance = modeCycle >= 1.05;
  const w1 = Math.sin(walkTime * 15);
  const w2 = Math.cos(walkTime * 15);
  const bounce = Math.abs(Math.sin(walkTime * 12)) * 8;

  if (isBreakdance) {
    const kick = Math.sin(walkTime * 22) * 26;
    const tilt = Math.sin(walkTime * 11) * 14;
    return (
      <g transform={`translate(0, ${2 - bounce * 0.6}) rotate(${-tilt})`}>
        <ellipse cx="0" cy="50" rx="34" ry="7" fill="#FACC15" opacity="0.4" />
        <path d={`M-6 -6 Q${-22 + kick * 0.3} -30 ${-30 + kick} -48`} fill="none" stroke="#F97316" strokeWidth="13" strokeLinecap="round" />
        <ellipse cx={-30 + kick} cy="-49" rx="9" ry="5.5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
        <path d={`M6 -6 Q${22 - kick * 0.3} -28 ${32 - kick} -44`} fill="none" stroke="#F97316" strokeWidth="13" strokeLinecap="round" />
        <ellipse cx={32 - kick} cy="-45" rx="9" ry="5.5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
        <ellipse cx="0" cy="4" rx="22" ry="26" fill="#F97316" stroke="#9A3412" strokeWidth="3" />
        <ellipse cx="0" cy="4" rx="12" ry="18" fill="#FFEDD5" />
        <path d="M-20 -4 L-8 -2 L-19 3 M20 -4 L8 -2 L19 3" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        <line x1="-8" y1="22" x2="-12" y2="48" stroke="#F97316" strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="-12" cy="49" rx="8" ry="5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
        <path d={`M10 20 Q28 ${16 + w1 * 10} 34 ${-2 + w2 * 10}`} fill="none" stroke="#F97316" strokeWidth="9" strokeLinecap="round" />
        <g transform="translate(18, 28) scale(0.85)">
          <circle cx="-14" cy="18" r="8" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <circle cx="14" cy="18" r="8" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <circle cx="0" cy="0" r="24" fill="#FB923C" stroke="#9A3412" strokeWidth="3" />
          <ellipse cx="0" cy="-6" rx="14" ry="9" fill="#FFF7ED" />
          <path d="M-11 2 Q-8 5 -5 2 M5 2 Q8 5 11 2" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M-6 -8 Q0 -13 6 -8" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </g>
    );
  }

  return (
    <g transform={`translate(${-w1 * 7}, ${-bounce})`}>
      <ellipse cx="0" cy={52 + bounce} rx="30" ry="6.5" fill="#FACC15" opacity="0.38" />
      <path d={`M14 14 Q38 ${8 + w1 * 14} 46 ${-10 - w2 * 12}`} fill="none" stroke="#F97316" strokeWidth="8.5" strokeLinecap="round" />
      <path d={`M14 14 Q38 ${8 + w1 * 14} 46 ${-10 - w2 * 12}`} fill="none" stroke="#1E293B" strokeWidth="8.5" strokeDasharray="5 8" strokeLinecap="round" />
      <path d={`M-7 16 Q${-18 + w1 * 10} 32 ${-14 - w2 * 9} 48`} fill="none" stroke="#F97316" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx={-14 - w2 * 9} cy="49" rx="9" ry="5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
      <path d={`M7 16 Q${18 + w2 * 10} 32 ${14 + w1 * 9} 48`} fill="none" stroke="#F97316" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx={14 + w1 * 9} cy="49" rx="9" ry="5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
      <ellipse cx={w1 * 3} cy="-1" rx="22" ry="26" fill="#F97316" stroke="#9A3412" strokeWidth="3" />
      <ellipse cx={w1 * 3} cy="0" rx="13" ry="18" fill="#FFEDD5" />
      <path d="M-19 -8 L-8 -6 L-18 -1 M19 -8 L8 -6 L18 -1" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      <path d={`M-14 -12 Q-28 ${-24 + w1 * 16} -42 ${-8 - w1 * 18}`} fill="none" stroke="#F97316" strokeWidth="9.5" strokeLinecap="round" />
      <circle cx="-42" cy={-8 - w1 * 18} r="6.5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
      <path d={`M14 -12 Q28 ${-24 - w1 * 16} 42 ${-8 + w1 * 18}`} fill="none" stroke="#F97316" strokeWidth="9.5" strokeLinecap="round" />
      <circle cx="42" cy={-8 + w1 * 18} r="6.5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
      <g transform={`translate(${w1 * 5}, -39) rotate(${-w1 * 14})`}>
        <circle cx="-15" cy="-19" r="8.5" fill="#F97316" stroke="#9A3412" strokeWidth="2.2" />
        <circle cx="15" cy="-19" r="8.5" fill="#F97316" stroke="#9A3412" strokeWidth="2.2" />
        <circle cx="-15" cy="-19" r="4" fill="#1E293B" />
        <circle cx="15" cy="-19" r="4" fill="#1E293B" />
        <circle cx="0" cy="0" r="24" fill="#FB923C" stroke="#9A3412" strokeWidth="3" />
        <ellipse cx="0" cy="7" rx="14" ry="10" fill="#FFF7ED" />
        <path d="M-7 -14 L7 -14 M-5 -9 L5 -9 M0 -16 L0 -7" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        <rect x="-15" y="-6" width="12" height="8" rx="2" fill="#0F172A" />
        <rect x="3" y="-6" width="12" height="8" rx="2" fill="#0F172A" />
        <line x1="-3" y1="-2" x2="3" y2="-2" stroke="#0F172A" strokeWidth="2.5" />
        <polygon points="-4,3 4,3 0,7" fill="#F43F5E" />
        <path d="M-7 11 Q0 16 7 11" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
};



// ============================================================================
// MAIN STANDALONE COMPONENT
// ============================================================================

export const StickmanJaeumSim: React.FC<StickmanJaeumSimProps> = ({
  defaultAudioEnabled = true,
  lang = 'en',
  className = '',
  hideControlBar = false,
  autoStartAllPlay = false,
}) => {
  const uid = useId();
  const [phase, setPhase] = useState<SimPhase>('walking');
  const [selectedConsonant, setSelectedConsonant] = useState<ConsonantItem>(KOREAN_CONSONANTS[0]);
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
  const selectedRef = useRef<ConsonantItem>(selectedConsonant);
  selectedRef.current = selectedConsonant;
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
    playCutePop,
    playCartoonImpact,
    playCartoonSplat,
    playSuccessChime,
    speakKorean,
  } = useStickmanAudio();

  const playTrainHorn = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      [349.23, 440.0].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.05);
        gain.gain.setValueAtTime(0.09, now + 0.28);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        registerOsc(osc);
        osc.start(now);
        osc.stop(now + 0.48);
      });
    } catch {
      // Silent fallback
    }
  }, [getAudioCtx, registerOsc]);

  // Pure Web Audio comic duck quack for ㅇ (replaces misleading TTS '꽥')
  const playDuckQuack = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      [0, 0.22, 0.44].forEach((offset) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(380, now + offset);
        osc.frequency.exponentialRampToValueAtTime(260, now + offset + 0.14);
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1100, now + offset);
        filter.Q.setValueAtTime(3.2, now + offset);
        gain.gain.setValueAtTime(0.001, now + offset);
        gain.gain.linearRampToValueAtTime(0.18, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        registerOsc(osc);
        osc.start(now + offset);
        osc.stop(now + offset + 0.16);
      });
    } catch {
      // Silent fallback
    }
  }, [getAudioCtx, registerOsc]);

  const playCarWhoosh = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.14);
      osc.frequency.exponentialRampToValueAtTime(95, now + 0.36);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.11, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      registerOsc(osc);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Silent fallback
    }
  }, [getAudioCtx, registerOsc]);

  const playMosquitoBuzz = useCallback(
    (duration = 1.4) => {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.linearRampToValueAtTime(640, now + duration * 0.6);
        osc.frequency.linearRampToValueAtTime(580, now + duration);

        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(24, now);
        lfoGain.gain.setValueAtTime(28, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.085, now + 0.18);
        gain.gain.setValueAtTime(0.095, now + duration * 0.78);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        registerOsc(lfo);
        registerOsc(osc);
        lfo.start(now);
        osc.start(now);
        lfo.stop(now + duration + 0.03);
        osc.stop(now + duration + 0.03);
      } catch {
        // Silent fallback
      }
    },
    [getAudioCtx, registerOsc]
  );

  const playCarHorn = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      [0, 0.22].forEach((offset) => {
        [415, 523].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + offset);
          gain.gain.setValueAtTime(0.001, now + offset);
          gain.gain.linearRampToValueAtTime(0.09, now + offset + 0.015);
          gain.gain.setValueAtTime(0.09, now + offset + 0.11);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);
          osc.connect(gain);
          gain.connect(ctx.destination);
          registerOsc(osc);
          osc.start(now + offset);
          osc.stop(now + offset + 0.15);
        });
      });
    } catch {
      // Silent fallback
    }
  }, [getAudioCtx, registerOsc]);

  const playDiscoDanceBeat = useCallback(
    (durationSec = 2.0) => {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
        const beatStep = 0.24;
        const totalBeats = Math.floor(durationSec / beatStep);
        const bassNotes = [130.81, 164.81, 196.0, 220.0];
        const leadNotes = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25];

        for (let i = 0; i < totalBeats; i++) {
          const t = now + i * beatStep;

          const kick = ctx.createOscillator();
          const kickGain = ctx.createGain();
          kick.type = 'sine';
          kick.frequency.setValueAtTime(145, t);
          kick.frequency.exponentialRampToValueAtTime(42, t + 0.12);
          kickGain.gain.setValueAtTime(0.28, t);
          kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
          kick.connect(kickGain);
          kickGain.connect(ctx.destination);
          registerOsc(kick);
          kick.start(t);
          kick.stop(t + 0.15);

          const bass = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bass.type = 'triangle';
          bass.frequency.setValueAtTime(bassNotes[i % bassNotes.length], t + beatStep * 0.5);
          bassGain.gain.setValueAtTime(0.14, t + beatStep * 0.5);
          bassGain.gain.exponentialRampToValueAtTime(0.001, t + beatStep * 0.95);
          bass.connect(bassGain);
          bassGain.connect(ctx.destination);
          registerOsc(bass);
          bass.start(t + beatStep * 0.5);
          bass.stop(t + beatStep);

          const lead = ctx.createOscillator();
          const leadGain = ctx.createGain();
          lead.type = 'square';
          lead.frequency.setValueAtTime(leadNotes[i % leadNotes.length], t);
          leadGain.gain.setValueAtTime(0.075, t);
          leadGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
          lead.connect(leadGain);
          leadGain.connect(ctx.destination);
          registerOsc(lead);
          lead.start(t);
          lead.stop(t + 0.16);
        }
      } catch {
        // Silent fallback
      }
    },
    [getAudioCtx, registerOsc]
  );

  const playScenarioSfx = useCallback(
    (char: string) => {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const now = ctx.currentTime;

        const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.18, delay = 0) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(f1, now + delay);
          osc.frequency.exponentialRampToValueAtTime(Math.max(20, f2), now + delay + dur);
          gain.gain.setValueAtTime(vol, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
          osc.connect(gain);
          gain.connect(ctx.destination);
          registerOsc(osc);
          osc.start(now + delay);
          osc.stop(now + delay + dur + 0.02);
        };

        switch (char) {
          case 'ㄴ':
            playTone('sawtooth', 180, 55, 0.25, 0.2, 0);
            playTone('triangle', 120, 40, 0.35, 0.25, 0.25);
            break;
          case 'ㄷ':
          case 'ㅈ':
            playTone('sine', 700, 180, 0.32, 0.16, 0);
            playTone('triangle', 320, 90, 0.22, 0.2, 0.25);
            break;
          case 'ㄹ':
            playTone('sawtooth', 580, 150, 0.42, 0.14, 0);
            playTone('triangle', 220, 65, 0.36, 0.2, 0.06);
            break;
          case 'ㅁ':
            playTone('sine', 1050, 340, 0.16, 0.18, 0);
            break;
          case 'ㅂ':
            playTone('sawtooth', 920, 120, 0.18, 0.22, 0);
            playTone('square', 680, 95, 0.24, 0.16, 0.08);
            playTone('triangle', 110, 42, 0.4, 0.22, 0.16);
            break;
          case 'ㅅ':
            playTone('sawtooth', 170, 70, 0.55, 0.22, 0);
            playTone('sine', 420, 160, 0.5, 0.14, 0.42);
            break;
          case 'ㅊ':
            playDiscoDanceBeat(2.0);
            break;
          case 'ㅋ':
            playTone('sawtooth', 360, 680, 0.22, 0.15, 0);
            playTone('sine', 450, 1200, 0.45, 0.16, 0.24);
            break;
          case 'ㅌ':
            playTone('triangle', 680, 120, 0.14, 0.25, 0);
            playTone('sine', 520, 980, 0.35, 0.14, 0.12);
            break;
          case 'ㅍ':
            playTone('sine', 300, 620, 0.32, 0.12, 0);
            playTone('square', 920, 80, 0.12, 0.28, 0.38);
            break;
          case 'ㅎ':
            playTone('sawtooth', 145, 58, 0.48, 0.24, 0);
            playTone('triangle', 95, 48, 0.45, 0.2, 0.04);
            break;
          default:
            break;
        }
      } catch {
        // Silent fallback
      }
    },
    [getAudioCtx, playDiscoDanceBeat, registerOsc]
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

  const startConsonantPlayback = useCallback(
    (item: ConsonantItem) => {
      clearAllTimers();
      stopAllAudio();
      pausedRef.current = false;
      setIsPaused(false);
      setSelectedConsonant(item);
      selectedRef.current = item;

      const anim = animRef.current;
      if (phaseRef.current === 'reveal' || phaseRef.current === 'aftermath') {
        anim.walkX = Math.min(RIGHT_EDGE_X, Math.max(LEFT_EDGE_X, anim.walkX));
      }
      if (item.char === 'ㄷ') {
        anim.walkX = 245;
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

      if (item.char === 'ㅁ' && audioRef.current) {
        playMosquitoBuzz(1.75);
      }
    },
    [clearAllTimers, stopAllAudio, playMosquitoBuzz]
  );

  const handleConsonantClick = useCallback(
    (item: ConsonantItem) => {
      allPlayRef.current = false;
      setIsAllPlayMode(false);
      startConsonantPlayback(item);
    },
    [startConsonantPlayback]
  );

  const toggleAllPlayMode = useCallback(() => {
    if (allPlayRef.current) {
      resetToWalking();
    } else {
      allPlayRef.current = true;
      setIsAllPlayMode(true);
      startConsonantPlayback(KOREAN_CONSONANTS[0]);
    }
  }, [resetToWalking, startConsonantPlayback]);

  const startConsonantRef = useRef(startConsonantPlayback);
  startConsonantRef.current = startConsonantPlayback;
  const resetToWalkingRef = useRef(resetToWalking);
  resetToWalkingRef.current = resetToWalking;

  useEffect(() => {
    if (autoStartAllPlay) {
      const id = window.setTimeout(() => {
        if (!allPlayRef.current) {
          allPlayRef.current = true;
          setIsAllPlayMode(true);
          startConsonantRef.current(KOREAN_CONSONANTS[0]);
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
        const t = Math.min(anim.phaseElapsed / 1.0, 1);
        const eased = 1 - Math.pow(1 - t, 2.2);

        anim.worldScrollX += dt * 360;
        anim.walkX = anim.approachStartX + (ACTION_SPOT_X - anim.approachStartX) * eased;
        anim.objectAppear = eased;

        if (t >= 1) {
          anim.walkX = ACTION_SPOT_X;
          anim.objectAppear = 1;
          anim.actionT = 0;
          anim.step1Triggered = false;
          anim.step2Triggered = false;
          anim.phaseElapsed = 0;
          phaseRef.current = 'action';
          setPhase('action');

          if (audioRef.current) {
            if (item.char === 'ㄱ') playTrainHorn();
            else if (item.char === 'ㅇ') playDuckQuack();
            else if (item.char === 'ㅈ') {
              playCarHorn();
              playCarWhoosh();
            } else if (item.char === 'ㄹ') playScenarioSfx('ㄹ');
            else if (item.char === 'ㅊ') playDiscoDanceBeat(2.35);
            else if (item.char === 'ㅎ') playScenarioSfx('ㅎ');
          }
        }
      } else if (currentPhase === 'action') {
        anim.phaseElapsed += dt;
        const duration = getActionDuration(item.char);
        const t = Math.min(anim.phaseElapsed / duration, 1);
        anim.actionT = t;

        if (item.char === 'ㅈ' && t >= 0.48 && !anim.step2Triggered) {
          anim.step2Triggered = true;
          if (audioRef.current) {
            playCarHorn();
            playCarWhoosh();
          }
        }

        const impactThreshold: Record<string, number> = {
          ㄱ: 0.28, ㄴ: 0.62, ㄷ: 0.35, ㄹ: 0.36, ㅁ: 0.55, ㅂ: 0.22, ㅅ: 0.25,
          ㅇ: 0.58, ㅈ: 0.74, ㅊ: 0.25, ㅋ: 0.56, ㅌ: 0.36, ㅍ: 0.58, ㅎ: 0.34,
        };
        const hitAt = impactThreshold[item.char] ?? 0.4;

        if (t >= hitAt && !anim.step1Triggered) {
          anim.step1Triggered = true;
          if (audioRef.current) {
            if (item.char === 'ㅊ') {
              // Happy dance music only
            } else if (item.char === 'ㅎ') {
              playDiscoDanceBeat(2.3);
            } else if (item.char === 'ㅍ') {
              playScenarioSfx('ㅌ');
              playScenarioSfx('ㅍ');
              playCartoonImpact();
            } else {
              playCartoonImpact();
              if (item.char !== 'ㄱ' && item.char !== 'ㄹ') {
                playScenarioSfx(item.char);
              }
            }
          }
        }

        if (t >= 1) {
          anim.actionT = 1;
          anim.aftermathT = 0;
          anim.phaseElapsed = 0;
          phaseRef.current = 'aftermath';
          setPhase('aftermath');

          if (audioRef.current && (item.char === 'ㄱ' || item.char === 'ㅍ')) {
            playCartoonSplat();
          }
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
            // Unified educational pronunciation using 해볼한국어 natural teacher voice
            speakKorean(`${cur.name}, ${cur.ttsSoundCue}, ${cur.triggerWord}!`, 0.92, 1.0);
          }
        }
      } else if (currentPhase === 'reveal') {
        if (allPlayRef.current) {
          anim.phaseElapsed += dt;
          if (anim.phaseElapsed >= 2.8) {
            const curIdx = KOREAN_CONSONANTS.findIndex((c) => c.char === item.char);
            const nextItem = curIdx >= 0 ? KOREAN_CONSONANTS[curIdx + 1] : undefined;
            if (nextItem) {
              startConsonantRef.current(nextItem);
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
  }, [
    clearAllTimers,
    playCarHorn,
    playCarWhoosh,
    playCartoonImpact,
    playCartoonSplat,
    playDiscoDanceBeat,
    playDuckQuack,
    playScenarioSfx,
    playSuccessChime,
    playTrainHorn,
    speakKorean,
  ]);

  const anim = animRef.current;
  const activeChar = selectedConsonant.char;
  const isTigerDiscoTwist =
    activeChar === 'ㅎ' &&
    ((phase === 'action' && anim.actionT >= 0.34) || phase === 'aftermath' || phase === 'reveal');
  const activeTheme: BackdropThemeKey =
    phase === 'walking' ? 'default' : isTigerDiscoTwist ? 'disco' : selectedConsonant.sceneTheme;
  const isWalkingMotion =
    phase === 'walking' ||
    phase === 'approaching' ||
    (phase === 'action' && activeChar === 'ㅈ' && anim.actionT >= 0.38 && anim.actionT < 0.74) ||
    (phase === 'action' && activeChar === 'ㄷ' && anim.actionT < 0.35);

  const walkCycle = anim.walkTime * 9.5;
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  const scrollOffset = anim.worldScrollX;
  const jollaFacing =
    phase === 'walking'
      ? anim.walkDir
      : phase === 'approaching'
      ? ACTION_SPOT_X >= anim.approachStartX
        ? 1
        : -1
      : 1;

  // Compute Jollaman character transform & face pose
  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScaleX = 1;
  let jollaScaleY = 1;
  let jollaVisible = true;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let showHeadBump = false;
  let showXraySkeleton = false;
  let showDizzyStars = false;
  let showParachute = false;
  let isDiscoDancing = false;

  if (phase === 'walking') {
    jollaFaceMode = 'happy';
  } else if (phase === 'approaching') {
    jollaFaceMode = 'happy';
    if (activeChar === 'ㄷ') {
      jollaY = GROUND_Y - 64 - bounceY;
    }
    if (activeChar === 'ㅍ' && anim.objectAppear > 0.72) {
      jollaY -= (anim.objectAppear - 0.72) * 35;
    }
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㄱ': {
        if (t < 0.28) {
          jollaFaceMode = 'panic';
        } else {
          const ft = (t - 0.28) / 0.72;
          jollaFaceMode = 'panic';
          jollaY = GROUND_Y - 52 - 4 * 190 * ft * (1 - ft);
          jollaX = ACTION_SPOT_X - Math.sin(ft * Math.PI) * 55;
          jollaRot = -1080 * ft;
        }
        break;
      }
      case 'ㄴ': {
        if (t < 0.62) {
          jollaFaceMode = 'panic';
        } else {
          const squashT = Math.min((t - 0.62) / 0.25, 1);
          jollaFaceMode = 'squashed';
          jollaY = GROUND_Y - 52 + squashT * 42;
          jollaScaleX = 1 + squashT * 0.75;
          jollaScaleY = 1 - squashT * 0.78;
        }
        break;
      }
      case 'ㄷ': {
        if (t < 0.35) {
          jollaX = ACTION_SPOT_X + (t / 0.35) * 145;
          jollaY = GROUND_Y - 64 - Math.abs(Math.sin(t * 25)) * 4;
          jollaFaceMode = 'happy';
        } else {
          const fallT = (t - 0.35) / 0.65;
          jollaX = ACTION_SPOT_X + 145;
          jollaY = GROUND_Y - 64 + fallT * fallT * 115;
          jollaRot = fallT * 210;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case 'ㄹ': {
        if (t < 0.36) {
          jollaFaceMode = 'panic';
        } else {
          const flyT = (t - 0.36) / 0.64;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X - flyT * 480;
          jollaY = GROUND_Y - 52 - flyT * 240;
          jollaRot = -1080 * flyT;
        }
        break;
      }
      case 'ㅁ': {
        jollaFaceMode = t < 0.55 ? 'panic' : 'swollenRed';
        break;
      }
      case 'ㅂ': {
        if (t < 0.2) {
          jollaFaceMode = 'panic';
        } else {
          jollaFaceMode = 'burnt';
          showXraySkeleton = Math.floor(t * 24) % 2 === 0;
          jollaX = ACTION_SPOT_X + Math.sin(t * 95) * 4;
        }
        break;
      }
      case 'ㅅ': {
        jollaFaceMode = t < 0.25 ? 'panic' : 'jellyMelt';
        break;
      }
      case 'ㅇ': {
        const peckBounce = Math.abs(Math.sin(t * Math.PI * 6)) * 10;
        jollaY = GROUND_Y - 46 + peckBounce;
        jollaFaceMode = 'dizzy';
        showHeadBump = t > 0.3;
        showDizzyStars = t > 0.3;
        break;
      }
      case 'ㅈ': {
        if (t < 0.38) {
          jollaFaceMode = 'happy';
        } else if (t < 0.74) {
          const wt = Math.min((t - 0.38) / 0.26, 1);
          jollaX = ACTION_SPOT_X + wt * 80;
          jollaFaceMode = 'happy';
        } else {
          // Spun by strong car wind gust instead of mud
          const spinT = (t - 0.74) / 0.26;
          jollaX = ACTION_SPOT_X + 80 - Math.sin(spinT * Math.PI) * 28;
          jollaY = GROUND_Y - 52 - Math.sin(spinT * Math.PI) * 32;
          jollaRot = spinT * 360;
          jollaFaceMode = 'dizzy';
          showDizzyStars = true;
        }
        break;
      }
      case 'ㅊ': {
        if (t < 0.2) {
          jollaFaceMode = 'panic';
        } else {
          isDiscoDancing = true;
          jollaVisible = false;
        }
        break;
      }
      case 'ㅋ': {
        if (t < 0.56) {
          jollaX = ACTION_SPOT_X + 20;
          jollaFaceMode = 'happy';
        } else {
          const flyT = (t - 0.56) / 0.44;
          jollaX = ACTION_SPOT_X + 100 - flyT * 460;
          jollaY = GROUND_Y - 80 - flyT * 240;
          jollaRot = flyT * 900;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case 'ㅌ': {
        if (t < 0.36) {
          jollaFaceMode = 'panic';
        } else {
          const flyT = (t - 0.36) / 0.64;
          jollaX = ACTION_SPOT_X - flyT * 460;
          jollaY = GROUND_Y - 60 - Math.sin(flyT * Math.PI) * 95;
          jollaRot = -flyT * 720;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case 'ㅍ': {
        if (t < 0.58) {
          const riseT = t / 0.58;
          const sway = Math.sin(riseT * Math.PI * 3.5) * 28;
          jollaX = ACTION_SPOT_X + 40 + riseT * 290 + sway;
          jollaY = GROUND_Y - 90 - riseT * 145;
          jollaRot = Math.cos(riseT * Math.PI * 3.5) * 14;
          jollaFaceMode = t >= 0.4 ? 'panic' : 'happy';
        } else {
          const dropT = (t - 0.58) / 0.42;
          jollaX = ACTION_SPOT_X + 330;
          jollaY = GROUND_Y - 235 + dropT * dropT * 190;
          jollaRot = dropT * 420;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case 'ㅎ': {
        if (t < 0.34) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 75) * 3;
        } else {
          isDiscoDancing = true;
          jollaVisible = false;
        }
        break;
      }
      default:
        break;
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    // Every consonant maintains a visible, coherent aftermath punchline
    switch (activeChar) {
      case 'ㄱ':
        jollaX = ACTION_SPOT_X;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ㅍ':
        jollaX = ACTION_SPOT_X + 330;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ㄴ':
        jollaFaceMode = 'squashed';
        jollaY = GROUND_Y - 10;
        jollaScaleX = 1.75;
        jollaScaleY = 0.22;
        break;
      case 'ㄷ':
        // Bobbing dizzy in the river instead of vanishing
        jollaX = ACTION_SPOT_X + 150;
        jollaY = GROUND_Y + 6 + Math.sin(anim.walkTime * 6) * 4;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ㄹ':
        // Tiny dizzy astronaut floating back down with parachute in space
        jollaX = ACTION_SPOT_X + Math.sin(anim.walkTime * 2.5) * 18;
        jollaY = GROUND_Y - 135 + Math.cos(anim.walkTime * 2) * 10;
        jollaScaleX = 0.78;
        jollaScaleY = 0.78;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        showParachute = true;
        break;
      case 'ㅋ':
        // Dizzy landing back on left side of the stage
        jollaX = 120;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ㅌ':
        // Dizzy with lump on left side of the stage
        jollaX = 115;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        showDizzyStars = true;
        break;
      case 'ㅁ':
        jollaFaceMode = 'swollenRed';
        break;
      case 'ㅂ':
        jollaFaceMode = 'burnt';
        showXraySkeleton = Math.floor(anim.walkTime * 14) % 2 === 0;
        break;
      case 'ㅅ':
        jollaFaceMode = 'jellyMelt';
        break;
      case 'ㅇ':
        jollaFaceMode = 'dizzy';
        jollaY = GROUND_Y - 46;
        showHeadBump = true;
        showDizzyStars = true;
        break;
      case 'ㅈ':
        jollaX = ACTION_SPOT_X + 75;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      case 'ㅊ':
      case 'ㅎ':
        isDiscoDancing = true;
        jollaVisible = false;
        break;
      default:
        break;
    }
  }

  const isSplatPose =
    (phase === 'aftermath' || phase === 'reveal') && (activeChar === 'ㄱ' || activeChar === 'ㅍ');

  const i18nEntry = REVEAL_I18N[selectedConsonant.char];
  const revealSubtitle = i18nEntry
    ? `${i18nEntry.phonetic} · ${i18nEntry.meanings[lang] ?? i18nEntry.meanings.en} [${i18nEntry.wordRom}]`
    : '';
  const localizedMeaning = i18nEntry ? i18nEntry.meanings[lang] ?? i18nEntry.meanings.en : '';

  return (
    <div className={`w-full flex flex-col gap-3 select-none ${className}`}>
      {/* Card / Modal Top Control Bar */}
      {!hideControlBar && (
        <StickmanControlBar
          title="졸라자음맨 (ㄱ ~ ㅎ)"
          icon="🏃"
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
          allPlayIndex={KOREAN_CONSONANTS.findIndex((c) => c.char === selectedConsonant.char)}
          allPlayTotal={KOREAN_CONSONANTS.length}
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
          aria-label="졸라맨 한글 자음 2D 시뮬레이션 무대"
        >
          <DynamicBackdrop
            idPrefix={uid}
            theme={activeTheme}
            scrollOffset={scrollOffset}
            walkTime={anim.walkTime}
            terrainMode={activeChar === 'ㄷ' && phase !== 'walking' ? 'river' : 'road'}
          />

          {/* Floating Sky Consonants ㄱ ~ ㅎ */}
          {KOREAN_CONSONANTS.map((item, idx) => {
            const floatY = item.skyY + Math.sin(anim.walkTime * 2.2 + idx * 0.65) * 6.5;
            const isSelected = selectedConsonant.char === item.char && phase !== 'walking';
            const isLearned = learnedChars.includes(item.char);

            return (
              <g
                key={item.char}
                transform={`translate(${item.skyX}, ${floatY}) scale(${isSelected ? 1.24 : 1})`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleConsonantClick(item);
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

          {/* Scenario Objects */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              {/* ㄱ: 3-Car Express Train */}
              {activeChar === 'ㄱ' && (() => {
                let tx = 1080;
                if (phase === 'approaching') {
                  tx = 1080 - anim.objectAppear * 80;
                } else if (phase === 'action') {
                  if (anim.actionT < 0.28) {
                    const rt = anim.actionT / 0.28;
                    tx = 1000 + (ACTION_SPOT_X + 25 - 1000) * rt;
                  } else {
                    const lt = (anim.actionT - 0.28) / 0.72;
                    tx = ACTION_SPOT_X + 25 - lt * 1050;
                  }
                } else {
                  tx = -520;
                }
                return tx > -480 ? (
                  <g transform={`translate(${tx}, ${GROUND_Y - 78})`}>
                    <circle cx="38" cy="-16" r="10" fill="#FFFFFF" opacity="0.85" />
                    <circle cx="58" cy="-28" r="13" fill="#F1F5F9" opacity="0.7" />
                    <circle cx="82" cy="-36" r="15" fill="#E2E8F0" opacity="0.55" />
                    <rect x="8" y="16" width="132" height="52" rx="8" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
                    <rect x="82" y="-6" width="58" height="34" rx="5" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
                    <rect x="92" y="2" width="32" height="18" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
                    <rect x="26" y="-4" width="18" height="22" rx="2" fill="#1E293B" />
                    <polygon points="8,44 -8,68 12,68" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
                    <circle cx="8" cy="30" r="6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
                    <circle cx="52" cy="42" r="17" fill="#FFFFFF" stroke="#991B1B" strokeWidth="2.5" />
                    <text x="52" y="49" textAnchor="middle" fontSize="22" fontWeight="900" fill="#EF4444">ㄱ</text>
                    <line x1="140" y1="52" x2="148" y2="52" stroke="#1E293B" strokeWidth="5" />
                    <rect x="148" y="12" width="124" height="56" rx="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
                    <rect x="160" y="22" width="26" height="20" rx="3" fill="#DBEAFE" />
                    <rect x="196" y="22" width="26" height="20" rx="3" fill="#DBEAFE" />
                    <rect x="232" y="22" width="26" height="20" rx="3" fill="#DBEAFE" />
                    <line x1="272" y1="52" x2="280" y2="52" stroke="#1E293B" strokeWidth="5" />
                    <rect x="280" y="12" width="124" height="56" rx="8" fill="#10B981" stroke="#047857" strokeWidth="3" />
                    <rect x="292" y="22" width="26" height="20" rx="3" fill="#D1FAE5" />
                    <rect x="328" y="22" width="26" height="20" rx="3" fill="#D1FAE5" />
                    <rect x="364" y="22" width="26" height="20" rx="3" fill="#D1FAE5" />
                    {[28, 66, 114, 174, 244, 306, 376].map((wx, wi) => (
                      <g key={wi} transform={`translate(${wx}, 70)`}>
                        <circle cx="0" cy="0" r="11" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
                        <circle cx="0" cy="0" r="4" fill="#FACC15" />
                      </g>
                    ))}
                  </g>
                ) : null;
              })()}

              {/* ㄴ: Oak Tree */}
              {activeChar === 'ㄴ' && (() => {
                const slideIn = phase === 'approaching' ? (1 - anim.objectAppear) * 140 : 0;
                let treeAngle = 0;
                if (phase === 'action') {
                  const fallP = Math.min(Math.max((anim.actionT - 0.15) / 0.55, 0), 1);
                  treeAngle = -90 * (fallP * fallP);
                } else if (phase === 'aftermath' || phase === 'reveal') {
                  treeAngle = -90;
                }
                return (
                  <g transform={`translate(${ACTION_SPOT_X + 165 + slideIn}, ${GROUND_Y})`}>
                    <path d="M-20 4 Q-12 -14 0 -14 Q12 -14 20 4 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
                    <g transform={`rotate(${treeAngle}, 0, -10)`}>
                      <path d="M-13 -8 L-9 -155 L9 -155 L13 -8 Z" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
                      <path d="M-4 -25 L-3 -115 M4 -45 L3 -135" stroke="#451A03" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                      <path d="M-6 -125 L-28 -155 M6 -130 L26 -156" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
                      <circle cx="-36" cy="-162" r="34" fill="#15803D" stroke="#14532D" strokeWidth="2.5" />
                      <circle cx="36" cy="-160" r="34" fill="#15803D" stroke="#14532D" strokeWidth="2.5" />
                      <circle cx="0" cy="-196" r="42" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
                      <circle cx="-18" cy="-176" r="32" fill="#4ADE80" />
                      <circle cx="20" cy="-176" r="30" fill="#22C55E" />
                    </g>
                    {phase === 'action' && anim.actionT > 0.15 && anim.actionT < 0.55 && (
                      <text x="-48" y="-50" fontSize="22">💥</text>
                    )}
                  </g>
                );
              })()}

              {/* ㄷ: Wooden Bridge */}
              {activeChar === 'ㄷ' && (() => {
                const broken = (phase === 'action' && anim.actionT >= 0.35) || phase === 'aftermath' || phase === 'reveal';
                return (
                  <g transform={`translate(245, ${GROUND_Y})`}>
                    <rect x="0" y="-16" width="170" height="17" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
                    <rect x="225" y="-16" width="185" height="17" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
                    <rect x="148" y="1" width="14" height="90" fill="#78350F" stroke="#451A03" strokeWidth="2" />
                    <rect x="234" y="1" width="14" height="90" fill="#78350F" stroke="#451A03" strokeWidth="2" />
                    {!broken ? (
                      <g>
                        <rect x="168" y="-16" width="59" height="17" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
                        <line x1="186" y1="-16" x2="186" y2="1" stroke="#78350F" strokeWidth="2" />
                        <line x1="208" y1="-16" x2="208" y2="1" stroke="#78350F" strokeWidth="2" />
                      </g>
                    ) : (
                      <>
                        <rect x="166" y="14" width="26" height="12" transform="rotate(42, 172, 16)" fill="#92400E" />
                        <rect x="206" y="16" width="26" height="12" transform="rotate(-38, 214, 16)" fill="#92400E" />
                        <ellipse cx="196" cy="22" rx="44" ry="14" fill="#E0F2FE" opacity="0.92" />
                        <circle cx="168" cy="-4" r="8" fill="#BAE6FD" />
                        <circle cx="222" cy="-6" r="9" fill="#BAE6FD" />
                        <text x="196" y="-26" textAnchor="middle" fontSize="24">💦</text>
                      </>
                    )}
                    {[8, 86, 162, 232, 316, 396].map((px) => (
                      <rect key={px} x={px} y="-46" width="7" height="30" rx="2" fill="#78350F" />
                    ))}
                    <path d="M10 -40 Q86 -34 164 -40 M234 -40 Q316 -34 398 -40" fill="none" stroke="#D97706" strokeWidth="4" />
                  </g>
                );
              })()}

              {/* ㄹ: Horizontal Missile Rocket */}
              {activeChar === 'ㄹ' && (() => {
                let rx = 1090;
                const ry = GROUND_Y - 58;
                if (phase === 'approaching') {
                  rx = 1090 - anim.objectAppear * 130;
                } else if (phase === 'action') {
                  if (anim.actionT < 0.36) {
                    const zoomT = anim.actionT / 0.36;
                    rx = 960 + (ACTION_SPOT_X + 20 - 960) * zoomT;
                  } else {
                    const pastT = (anim.actionT - 0.36) / 0.64;
                    rx = ACTION_SPOT_X + 20 - pastT * 960;
                  }
                } else {
                  rx = -320;
                }
                return rx > -180 ? (
                  <g>
                    <g transform={`translate(${rx}, ${ry}) rotate(-90)`}>
                      <SpaceXRocketSvg firing={true} legsDeployed={false} walkTime={anim.walkTime} />
                    </g>
                    {phase === 'action' && anim.actionT >= 0.36 && anim.actionT < 0.65 && (
                      <text x={ACTION_SPOT_X + 10} y={GROUND_Y - 108} textAnchor="middle" fontSize="28">
                        🚀💥
                      </text>
                    )}
                  </g>
                ) : null;
              })()}

              {/* ㅁ: Mosquito */}
              {activeChar === 'ㅁ' && (() => {
                let mx = ACTION_SPOT_X + 240;
                let my = GROUND_Y - 95;
                if (phase === 'approaching') {
                  mx = ACTION_SPOT_X + 380 - anim.objectAppear * 160;
                  my = GROUND_Y - 120 + Math.sin(anim.walkTime * 10) * 10;
                } else if (phase === 'action') {
                  if (anim.actionT < 0.55) {
                    const ct = anim.actionT / 0.55;
                    mx = ACTION_SPOT_X + 220 - ct * 155;
                    my = GROUND_Y - 92 + Math.sin(ct * 18) * 10;
                  } else {
                    mx = ACTION_SPOT_X + 64;
                    my = GROUND_Y - 84;
                  }
                } else {
                  mx = ACTION_SPOT_X + 235;
                  my = GROUND_Y - 165 + Math.sin(anim.walkTime * 12) * 10;
                }
                return (
                  <g transform={`translate(${mx}, ${my})`}>
                    <SkinnyMosquitoSvg walkTime={anim.walkTime} />
                  </g>
                );
              })()}

              {/* ㅂ: Lightning Bolt */}
              {activeChar === 'ㅂ' && (() => {
                const boltActive = phase === 'approaching' ? anim.objectAppear > 0.65 : phase === 'action';
                const pulse = Math.sin(anim.walkTime * 35) * 0.15 + 1;
                return boltActive ? (
                  <g>
                    <circle cx={ACTION_SPOT_X} cy="95" r="70" fill="#FACC15" opacity="0.22" />
                    <polygon
                      points={`${ACTION_SPOT_X - 18},0 ${ACTION_SPOT_X + 28},0 ${ACTION_SPOT_X - 2},118 ${ACTION_SPOT_X + 34},118 ${ACTION_SPOT_X - 10},225 ${ACTION_SPOT_X + 26},225 ${ACTION_SPOT_X - 16},325 ${ACTION_SPOT_X - 4},235 ${ACTION_SPOT_X - 36},235 ${ACTION_SPOT_X - 12},132 ${ACTION_SPOT_X - 42},132`}
                      fill="#FACC15"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      transform={`scale(1, ${pulse})`}
                    />
                    <text x={ACTION_SPOT_X + 60} y="165" fontSize="26">⚡</text>
                  </g>
                ) : null;
              })()}

              {/* ㅇ: Angry Duck + Silent Initial Visual Hint */}
              {activeChar === 'ㅇ' && (() => {
                const dx = phase === 'approaching' ? ACTION_SPOT_X + 280 - anim.objectAppear * 165 : ACTION_SPOT_X + 115;
                const peckTilt = phase === 'action' ? -Math.abs(Math.sin(anim.actionT * Math.PI * 6)) * 28 : 0;
                return (
                  <g transform={`translate(${dx}, ${GROUND_Y - 58})`}>
                    <line x1="0" y1="36" x2="0" y2="56" stroke="#EA580C" strokeWidth="6" />
                    <polygon points="-16,58 10,58 4,52" fill="#EA580C" />
                    <ellipse cx="18" cy="14" rx="50" ry="32" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
                    <path d="M58 -2 Q78 -18 68 8 Q82 -2 62 18" fill="#FFFFFF" stroke="#475569" strokeWidth="2.5" />
                    <path d="M-2 10 Q25 -6 46 14 Q24 28 -2 10 Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="2.5" />
                    <g transform={`rotate(${peckTilt}, -15, 0)`}>
                      <rect x="-26" y="-54" width="22" height="58" rx="10" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
                      <circle cx="-18" cy="-58" r="22" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
                      <circle cx="-25" cy="-60" r="3.8" fill="#0F172A" />
                      <line x1="-32" y1="-71" x2="-15" y2="-63" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
                      <polygon points="-38,-60 -78,-52 -38,-44" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
                      {/* Silent onset ○ dashed sound-off badge */}
                      <g transform="translate(-52, -92)">
                        <circle cx="0" cy="0" r="15" fill="#FFFFFF" fillOpacity="0.88" stroke="#3B82F6" strokeWidth="2.4" strokeDasharray="4 3" />
                        <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2563EB">🔇</text>
                      </g>
                    </g>
                    {phase === 'action' && (
                      <>
                        <ellipse cx="-55" cy="-25" rx="9" ry="3.5" transform="rotate(-30, -55, -25)" fill="#FFFFFF" stroke="#94A3B8" />
                        <ellipse cx="-35" cy="-86" rx="9" ry="3.5" transform="rotate(25, -35, -86)" fill="#FFFFFF" stroke="#94A3B8" />
                      </>
                    )}
                  </g>
                );
              })()}

              {/* ㅈ: Speeding Cars Wind Swirl (replaces brown mud puddle so ㅈ reads cleanly as 자동차) */}
              {activeChar === 'ㅈ' && (() => {
                const gustActive = (phase === 'action' && anim.actionT >= 0.72) || phase === 'aftermath' || phase === 'reveal';
                return gustActive ? (
                  <g transform={`translate(${ACTION_SPOT_X + 75}, ${GROUND_Y - 22})`} opacity={phase === 'aftermath' || phase === 'reveal' ? 0.55 : 0.92}>
                    <ellipse cx="-42" cy="-12" rx="22" ry="12" fill="#E2E8F0" />
                    <ellipse cx="38" cy="-16" rx="24" ry="13" fill="#CBD5E1" />
                    <path d="M-75 -8 Q-35 -24 5 -8" fill="none" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                    <path d="M-65 -26 Q-18 -42 30 -26" fill="none" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" />
                    <text x="48" y="-32" fontSize="24">💨</text>
                  </g>
                ) : null;
              })()}

              {/* ㅊ: Mirror Ball & Disco Breakdance (kept intact per user exclusion) */}
              {activeChar === 'ㅊ' && (() => {
                const dropY =
                  phase === 'approaching'
                    ? -40
                    : phase === 'action' && anim.actionT < 0.22
                    ? -40 + (anim.actionT / 0.22) * 165
                    : 125;
                const dancingNow = (phase === 'action' && anim.actionT >= 0.2) || phase === 'aftermath' || phase === 'reveal';
                return (
                  <g>
                    <g transform="translate(500, 0)">
                      <MirrorBallSvg dropY={dropY} walkTime={anim.walkTime} />
                    </g>
                    {dancingNow && (
                      <g>
                        <g transform={`translate(${ACTION_SPOT_X + 60}, ${GROUND_Y - 52})`}>
                          <DiscoDancingJollamanSvg walkTime={anim.walkTime} />
                        </g>
                        <text x={ACTION_SPOT_X - 45} y={GROUND_Y - 125 + Math.sin(anim.walkTime * 8) * 6} fontSize="26">🎵</text>
                        <text x={ACTION_SPOT_X + 165} y={GROUND_Y - 135 + Math.cos(anim.walkTime * 8) * 6} fontSize="26">🎶</text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅋ: Elephant */}
              {activeChar === 'ㅋ' && (() => {
                const ex = phase === 'approaching' ? ACTION_SPOT_X + 340 - anim.objectAppear * 135 : ACTION_SPOT_X + 205;
                const isHandshake = phase === 'action' && anim.actionT < 0.56;
                const wave = isHandshake ? Math.sin(anim.actionT * Math.PI * 8) * 14 : 0;
                const flingSwing =
                  phase === 'action' && anim.actionT >= 0.56
                    ? Math.sin(Math.min((anim.actionT - 0.56) / 0.4, 1) * Math.PI) * 65
                    : 0;
                return (
                  <g transform={`translate(${ex}, ${GROUND_Y - 70})`}>
                    <rect x="-25" y="25" width="22" height="46" rx="6" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                    <rect x="28" y="25" width="22" height="46" rx="6" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                    <ellipse cx="14" cy="4" rx="64" ry="45" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
                    <ellipse cx="-16" cy="-14" rx="28" ry="34" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                    <circle cx="-44" cy="-22" r="30" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
                    <circle cx="-54" cy="-28" r="4" fill="#0F172A" />
                    <path d="M-64 -6 Q-84 4 -88 -8" fill="none" stroke="#FEF9C3" strokeWidth="7" strokeLinecap="round" />
                    <path
                      d={
                        isHandshake
                          ? `M-70 -14 Q-118 ${6 + wave * 0.5} -156 ${8 + wave}`
                          : `M-70 -16 Q${-115 - flingSwing * 0.4} ${10 - flingSwing} ${-135 + flingSwing * 0.3} ${-30 - flingSwing}`
                      }
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    {isHandshake && (
                      <text x="-125" y="-26" textAnchor="middle" fontSize="22">🤝</text>
                    )}
                  </g>
                );
              })()}

              {/* ㅌ: Muscular Rabbit */}
              {activeChar === 'ㅌ' && (() => {
                const tx =
                  phase === 'approaching'
                    ? ACTION_SPOT_X + 350 - anim.objectAppear * 165
                    : phase === 'action' && anim.actionT < 0.42
                    ? ACTION_SPOT_X + 185 - (anim.actionT / 0.42) * 105
                    : ACTION_SPOT_X + 90;
                const kickJump =
                  phase === 'action' && anim.actionT >= 0.2 && anim.actionT <= 0.65
                    ? Math.sin(((anim.actionT - 0.2) / 0.45) * Math.PI) * 58
                    : 0;
                return (
                  <g transform={`translate(${tx}, ${GROUND_Y - 90 - kickJump})`}>
                    <g transform="scale(-1, 1)">
                      <MuscularRabbitSvg />
                    </g>
                    {kickJump > 15 && (
                      <text x="-85" y="-10" textAnchor="middle" fontSize="26">💥</text>
                    )}
                  </g>
                );
              })()}

              {/* ㅍ: Balloon + Rabbit Cameo Kick (kept intact per user exclusion) */}
              {activeChar === 'ㅍ' && (() => {
                const popped = (phase === 'action' && anim.actionT >= 0.58) || phase === 'aftermath' || phase === 'reveal';
                let bx = ACTION_SPOT_X + 40;
                let by = GROUND_Y - 125;
                let rot = 0;
                if (phase === 'approaching') {
                  by = GROUND_Y - 195 + anim.objectAppear * 70;
                } else if (phase === 'action' && !popped) {
                  const riseT = anim.actionT / 0.58;
                  const sway = Math.sin(riseT * Math.PI * 3.5) * 28;
                  bx = ACTION_SPOT_X + 40 + riseT * 290 + sway;
                  by = GROUND_Y - 125 - riseT * 145;
                  rot = Math.cos(riseT * Math.PI * 3.5) * 14;
                }

                const showRabbitCameo = (phase === 'action' && anim.actionT >= 0.32) || phase === 'aftermath' || phase === 'reveal';
                let rx = 890;
                let ry = GROUND_Y - 82;
                let rabbitRot = 0;
                if (phase === 'action') {
                  if (anim.actionT >= 0.32 && anim.actionT < 0.58) {
                    const leapT = (anim.actionT - 0.32) / 0.26;
                    rx = 910 - leapT * 205;
                    ry = GROUND_Y - 76 - Math.sin(leapT * Math.PI * 0.5) * 185;
                    rabbitRot = -leapT * 18;
                  } else if (anim.actionT >= 0.58) {
                    const landT = Math.min((anim.actionT - 0.58) / 0.32, 1);
                    rx = 705 + landT * 175;
                    ry = 110 + landT * landT * (GROUND_Y - 82 - 110);
                    rabbitRot = -18 + landT * 18;
                  }
                }

                return (
                  <g>
                    {!popped ? (
                      <g transform={`translate(${bx}, ${by}) rotate(${rot}, 0, 50)`}>
                        <line x1="0" y1="40" x2="0" y2="75" stroke="#475569" strokeWidth="3" />
                        <ellipse
                          cx="0"
                          cy="0"
                          rx={38 + (phase === 'action' ? anim.actionT * 20 : 0)}
                          ry={46 + (phase === 'action' ? anim.actionT * 20 : 0)}
                          fill="#F43F5E"
                          stroke="#9F1239"
                          strokeWidth="3"
                        />
                        <ellipse cx="-14" cy="-18" rx="9" ry="15" transform="rotate(-25, -14, -18)" fill="#FDA4AF" opacity="0.7" />
                        <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FFFFFF">ㅍ</text>
                      </g>
                    ) : (
                      phase === 'action' && anim.actionT < 0.88 && (
                        <g transform={`translate(${ACTION_SPOT_X + 330}, ${GROUND_Y - 270})`}>
                          <polygon
                            points="0,-48 14,-16 48,-20 20,4 44,36 10,18 -4,50 -16,18 -50,26 -20,0 -44,-30 -12,-16"
                            fill="#FDE047"
                            stroke="#EF4444"
                            strokeWidth="3"
                          />
                          <text x="0" y="8" textAnchor="middle" fontSize="24">💥</text>
                        </g>
                      )
                    )}

                    {showRabbitCameo && (
                      <g transform={`translate(${rx}, ${ry}) rotate(${rabbitRot})`}>
                        <g transform="scale(-1, 1)">
                          <MuscularRabbitSvg />
                        </g>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅎ: Tiger -> Mirrorball Duo Breakdance (kept intact per user exclusion) */}
              {activeChar === 'ㅎ' && (() => {
                const hx = phase === 'approaching' ? ACTION_SPOT_X + 360 - anim.objectAppear * 165 : ACTION_SPOT_X + 195;
                const discoTwist = (phase === 'action' && anim.actionT >= 0.34) || phase === 'aftermath' || phase === 'reveal';
                const dropY =
                  phase === 'action' && anim.actionT >= 0.34 && anim.actionT < 0.52
                    ? -40 + ((anim.actionT - 0.34) / 0.18) * 165
                    : 125;

                if (discoTwist) {
                  return (
                    <g>
                      <g transform="translate(500, 0)">
                        <MirrorBallSvg dropY={dropY} walkTime={anim.walkTime} />
                      </g>
                      <g transform={`translate(${ACTION_SPOT_X + 10}, ${GROUND_Y - 52})`}>
                        <DiscoDancingJollamanSvg walkTime={anim.walkTime} />
                      </g>
                      <g transform={`translate(${ACTION_SPOT_X + 165}, ${GROUND_Y - 52})`}>
                        <DancingTigerSvg walkTime={anim.walkTime} />
                      </g>
                      <text x={ACTION_SPOT_X - 45} y={GROUND_Y - 128 + Math.sin(anim.walkTime * 8) * 6} fontSize="24">🎵</text>
                      <text x={ACTION_SPOT_X + 215} y={GROUND_Y - 135 + Math.cos(anim.walkTime * 8) * 6} fontSize="24">🎶</text>
                    </g>
                  );
                }

                return (
                  <g transform={`translate(${hx}, ${GROUND_Y - 58})`}>
                    <TigerSpriteSvg walkTime={anim.walkTime} />
                  </g>
                );
              })()}
            </g>
          )}

          {/* Jollaman Stick Figure */}
          {jollaVisible && !isSplatPose && !isDiscoDancing && (
            <g
              transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaScaleX * jollaFacing}, ${jollaScaleY})`}
              className="cursor-pointer"
            >
              <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
              {showParachute && (
                <g transform="translate(0, -64)">
                  <path d="M-34 0 Q0 -44 34 0 Z" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
                  <path d="M-12 -1 Q0 -38 12 -1 Z" fill="#22C55E" opacity="0.85" />
                  <line x1="-30" y1="0" x2="-4" y2="34" stroke="#CBD5E1" strokeWidth="1.8" />
                  <line x1="30" y1="0" x2="4" y2="34" stroke="#CBD5E1" strokeWidth="1.8" />
                  <line x1="0" y1="0" x2="0" y2="34" stroke="#CBD5E1" strokeWidth="1.8" />
                </g>
              )}
              {jollaRot === 0 && !showParachute && activeChar !== 'ㄷ' && (
                <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
              )}
              {phase === 'action' && activeChar === 'ㄱ' && anim.actionT >= 0.28 && (
                <circle cx="0" cy="0" r="42" fill="none" stroke="#FACC15" strokeWidth="3" strokeDasharray="16 14" opacity="0.85" />
              )}
              <JollamanCharacterSvg
                faceMode={jollaFaceMode}
                isWalking={isWalkingMotion}
                legSwing={legSwing}
                armSwing={armSwing}
                showHeadBump={showHeadBump}
                showXraySkeleton={showXraySkeleton}
                showDizzyStars={showDizzyStars}
                walkTime={anim.walkTime}
                activeChar={activeChar}
              />
            </g>
          )}

          {/* Splat Pose for ㄱ & ㅍ */}
          {isSplatPose && (
            <g transform={`translate(${jollaX}, ${GROUND_Y - 4})`}>
              <ellipse cx="-44" cy="-4" rx="16" ry="8" fill="#E2E8F0" opacity="0.9" />
              <ellipse cx="44" cy="-4" rx="16" ry="8" fill="#E2E8F0" opacity="0.9" />
              <line x1="-26" y1="0" x2="22" y2="0" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="-26" y1="0" x2="-46" y2="-9" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="-26" y1="0" x2="-44" y2="7" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="8" y1="0" x2="18" y2="-16" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="6" y1="0" x2="-8" y2="10" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <ellipse cx="34" cy="-2" rx="14" ry="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.5" />
              <path d="M28 -6 L32 -2 M32 -6 L28 -2" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <path d="M36 -6 L40 -2 M40 -6 L36 -2" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <text x={32 + Math.cos(anim.walkTime * 6) * 16} y={-26 + Math.sin(anim.walkTime * 6) * 4} fontSize="16" textAnchor="middle">
                ⭐
              </text>
            </g>
          )}

          {/* ㅅ: Roaring Lion (visual soundwaves only, no conflicting text) */}
          {activeChar === 'ㅅ' && (phase === 'approaching' || phase === 'action' || phase === 'aftermath' || phase === 'reveal') && (() => {
            const lx = phase === 'approaching' ? ACTION_SPOT_X + 350 - anim.objectAppear * 145 : ACTION_SPOT_X + 205;
            const roaring = (phase === 'action' && anim.actionT >= 0.25) || phase === 'aftermath' || phase === 'reveal';
            return (
              <g transform={`translate(${lx}, ${GROUND_Y - 58})`}>
                <DetailedLionSvg roaring={roaring} />
                {roaring && (
                  <g opacity={0.65 + Math.sin(anim.walkTime * 22) * 0.25}>
                    <path d="M-86 -20 Q-108 -6 -86 10" fill="none" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
                    <path d="M-104 -30 Q-130 -6 -104 20" fill="none" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                )}
              </g>
            );
          })()}

          {/* Foreground Cars for ㅈ */}
          {phase === 'action' && activeChar === 'ㅈ' && (() => {
            const car1X = anim.actionT < 0.39 ? 1080 - (anim.actionT / 0.38) * 1420 : -460;
            const car2X = anim.actionT >= 0.48 ? 1080 - ((anim.actionT - 0.48) / 0.52) * 1420 : -460;
            return (
              <g>
                {car1X > -360 && (
                  <g transform={`translate(${car1X}, ${GROUND_Y - 88}) scale(2)`}>
                    <path d="M10 30 L32 8 L104 8 L128 30 L146 34 L146 58 L0 58 L0 34 Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="3" />
                    <polygon points="38,12 96,12 114,30 24,30" fill="#CCFBF1" />
                    <circle cx="32" cy="60" r="14" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
                    <circle cx="114" cy="60" r="14" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
                    <text x="72" y="48" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FFFFFF">ㅈ</text>
                  </g>
                )}
                {car2X > -360 && (
                  <g transform={`translate(${car2X}, ${GROUND_Y - 94}) scale(2)`}>
                    <path d="M10 30 L32 8 L104 8 L130 30 L148 34 L148 58 L0 58 L0 34 Z" fill="#6366F1" stroke="#312E81" strokeWidth="3" />
                    <polygon points="38,12 98,12 116,30 24,30" fill="#BAE6FD" />
                    <circle cx="32" cy="60" r="14" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
                    <circle cx="114" cy="60" r="14" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
                    <text x="72" y="48" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FEF08A">ㅈ</text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* Unified Bottom Fixed Subtitle Strip */}
          <g transform="translate(500, 434)">
            <rect x="-270" y="-18" width="540" height="32" rx="16" fill="#0F172A" fillOpacity="0.82" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.5" />
            <text x="0" y="3" textAnchor="middle" fontSize="15" fontWeight="800" fill="#FFFFFF">
              {phase === 'walking'
                ? '하늘의 자음 (ㄱ ~ ㅎ)을 눌러보세요!'
                : `${selectedConsonant.char} · ${selectedConsonant.name} [${selectedConsonant.soundCue}] · ${selectedConsonant.triggerWord} (${localizedMeaning})`}
            </text>
          </g>
        </svg>

        {/* Pause Indicator Badge (Click anywhere on stage to resume) */}
        {isPaused && phase !== 'reveal' && (
          <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-md bg-slate-900/80 text-white text-xs sm:text-sm font-black shadow-md border border-white/25 whitespace-nowrap">
            ⏸ 일시정지 · 화면을 누르면 다시 재생
          </div>
        )}

        {/* Consonant Reveal Card Overlay */}
        {phase === 'reveal' && (
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 bg-transparent pointer-events-none"
            role="dialog"
            aria-label={`${selectedConsonant.char} ${selectedConsonant.name}, ${selectedConsonant.triggerWord} 학습 화면`}
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
                  color: selectedConsonant.color,
                  WebkitTextStroke: '5px #FFFFFF',
                  paintOrder: 'stroke fill',
                  textShadow: '0 8px 24px rgba(15, 23, 42, 0.35)',
                }}
              >
                {selectedConsonant.char}
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
                <span style={{ color: selectedConsonant.color }}>{selectedConsonant.char}</span>{' '}
                {selectedConsonant.name} [{selectedConsonant.soundCue}], {selectedConsonant.triggerWord}!!
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

export default StickmanJaeumSim;
