import React from 'react';
import { speakKorean, playCutePop } from '../utils/audio';
import { ManduMascot } from './ManduMascot';

export interface BatchimSplitPart {
  char: string;
  romaja: string;
  isSilent?: boolean;
  sound?: string;
}

export interface BatchimCardData {
  baseSyllable: string;
  baseRomaja: string;
  batchim: string;
  batchimName: string;
  batchimSound: string;
  batchimRomaja: string;
  syllable: string;
  romaja: string;
  pronunciationNote?: string;
  isDoubleBatchim?: boolean;
  firstBatchim?: BatchimSplitPart;
  secondBatchim?: BatchimSplitPart;
  isAspirationFormulaCard?: boolean;
  writeWords?: string[];
}

export interface BatchimSpeechRule {
  target: string;
  sound: string;
  customText?: string;
}

export interface BatchimWordCardConfig {
  wordLabel: string;
  writeChar: string;
  audioWord: string;
  illustrationType:
    | 'bear'
    | 'house'
    | 'ball'
    | 'giraffe'
    | 'hand'
    | 'water'
    | 'spoon'
    | 'forest'
    | 'outside'
    | 'clothes'
    | 'flower'
    | 'chicken'
    | 'scissors'
    | 'number8'
    | 'awl'
    | 'dog_licking_bone'
    | 'many_candies';
  speechRules: BatchimSpeechRule[];
  hideWordLabel?: boolean;
  customBadgeNote?: string;
  customBadgeContent?: React.ReactNode;
  ruleFormat?: 'short' | 'standard';
}

export interface BatchimRuleSection {
  text?: string;
  bullets?: string[];
  noteBox?: {
    title?: string;
    items: string[];
    isWarning?: boolean;
  };
}

export interface BatchimRulePanelConfig {
  title: string;
  sections: BatchimRuleSection[];
}

export interface BatchimPageConfig {
  pageNumber: number;
  circledNumber: string;
  title: string;
  dropdownTitle: string;
  subTitle: string;
  cards: BatchimCardData[];
  wordCard: BatchimWordCardConfig;
  rulePanel?: BatchimRulePanelConfig;
}

export interface BatchimWorksheetPageProps {
  pageIndex?: number;
  pageData?: BatchimPageConfig;
  interactiveAudio?: boolean;
  className?: string;
}

// -------------------------------------------------------------
// Vector Illustrations with Embedded Speech Bubble for Pages 1~15
// -------------------------------------------------------------

const renderSpeechBubble = (rules: BatchimSpeechRule[], ruleFormat: 'short' | 'standard' = 'standard') => {
  if (!rules || rules.length === 0) return null;

  // Single Custom Pronunciation Bubble (e.g. Pages 12~15: [여덜], [할따], [닥], [만타])
  if (rules.length === 1 && rules[0].customText) {
    const text = rules[0].customText;
    return (
      <g id="custom-speech-bubble">
        <path
          d="M 98 4 L 208 4 Q 218 4 218 14 L 218 44 Q 218 54 208 54 L 122 54 L 94 66 L 108 54 L 98 54 Q 88 54 88 44 L 88 14 Q 88 4 98 4 Z"
          fill="#f0f9ff"
          stroke="#0284c7"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <text
          x="153"
          y="35.5"
          textAnchor="middle"
          fontSize="19"
          fontWeight="900"
          fontFamily="'NanumBarunGothic', 'Nanum Barun Gothic', '나눔바른고딕', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Noto Sans KR', sans-serif"
        >
          <tspan fill="#1d4ed8" fontWeight="900">{text}</tspan>
        </text>
      </g>
    );
  }

  if (ruleFormat === 'short') {
    const isTwo = rules.length === 2;
    return (
      <g>
        <path
          d={
            isTwo
              ? "M 94 8 L 212 8 Q 222 8 222 16 L 222 66 Q 222 74 212 74 L 120 74 L 92 84 L 106 74 L 94 74 Q 84 74 84 66 L 84 16 Q 84 8 94 8 Z"
              : "M 94 2 L 212 2 Q 222 2 222 10 L 222 72 Q 222 80 212 80 L 120 80 L 92 90 L 106 80 L 94 80 Q 84 80 84 72 L 84 10 Q 84 2 94 2 Z"
          }
          fill="#f0f9ff"
          stroke="#0284c7"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {rules.map((r, i) => (
          <text
            key={`rule-${r.target}-${i}`}
            x="153"
            y={isTwo ? (i === 0 ? 34 : 58) : (24 + i * 23)}
            textAnchor="middle"
            fontSize={isTwo ? "17.5" : "16.5"}
            fontWeight="900"
            fontFamily="'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 'Noto Sans KR', system-ui, sans-serif"
          >
            <tspan fill="#0284c7" fontWeight="900">{r.target}</tspan>
            <tspan fill="#0369a1" fontWeight="800"> = </tspan>
            <tspan fill="#1e3a8a" fontWeight="900">[{r.sound}]</tspan>
          </text>
        ))}
      </g>
    );
  }

  if (rules.length === 1) {
    const r = rules[0];
    return (
      <g>
        <path
          d="M 98 2 L 208 2 Q 218 2 218 12 L 218 38 Q 218 48 208 48 L 122 48 L 94 60 L 108 48 L 98 48 Q 88 48 88 38 L 88 12 Q 88 2 98 2 Z"
          fill="#f0f9ff"
          stroke="#0284c7"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <text
          x="153"
          y="32.5"
          textAnchor="middle"
          fontSize="19"
          fontWeight="900"
          fontFamily="'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 'Noto Sans KR', system-ui, sans-serif"
        >
          <tspan fill="#0284c7" fontWeight="900">{r.target}</tspan>
          <tspan fill="#0369a1" fontWeight="800">받침 = </tspan>
          <tspan fill="#1e3a8a" fontWeight="900">[{r.sound || '읃'}]</tspan>
        </text>
      </g>
    );
  }

  if (rules.length === 2) {
    return (
      <g>
        <path
          d="M 96 2 L 210 2 Q 220 2 220 12 L 220 54 Q 220 64 210 64 L 122 64 L 94 74 L 108 64 L 96 64 Q 86 64 86 54 L 86 12 Q 86 2 96 2 Z"
          fill="#f0f9ff"
          stroke="#0284c7"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {rules.map((r, i) => (
          <text
            key={`rule-${r.target}-${i}`}
            x="153"
            y={i === 0 ? 27 : 51}
            textAnchor="middle"
            fontSize="16.5"
            fontWeight="900"
            fontFamily="'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 'Noto Sans KR', system-ui, sans-serif"
          >
            <tspan fill="#0284c7" fontWeight="900">{r.target}</tspan>
            <tspan fill="#0369a1" fontWeight="800">받침 = </tspan>
            <tspan fill="#1e3a8a" fontWeight="900">[{r.sound || '읃'}]</tspan>
          </text>
        ))}
      </g>
    );
  }

  // 3 rules (Pages 9, 10, 11)
  return (
    <g>
      <path
        d="M 94 2 L 212 2 Q 222 2 222 10 L 222 72 Q 222 80 212 80 L 120 80 L 92 90 L 106 80 L 94 80 Q 84 80 84 72 L 84 10 Q 84 2 94 2 Z"
        fill="#f0f9ff"
        stroke="#0284c7"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {rules.map((r, i) => (
        <text
          key={`rule-${r.target}-${i}`}
          x="153"
          y={23 + i * 23}
          textAnchor="middle"
          fontSize="14.5"
          fontWeight="900"
          fontFamily="'Apple SD Gothic Neo', 'Malgun Gothic', '맑은 고딕', 'Noto Sans KR', system-ui, sans-serif"
        >
          <tspan fill="#0284c7" fontWeight="900">{r.target}</tspan>
          <tspan fill="#0369a1" fontWeight="800">받침 = </tspan>
          <tspan fill="#1e3a8a" fontWeight="900">[{r.sound || '읃'}]</tspan>
        </text>
      ))}
    </g>
  );
};

export const renderBatchimIllustration = (
  type: BatchimWordCardConfig['illustrationType'],
  rules: BatchimSpeechRule[],
  ruleFormat?: 'short' | 'standard'
) => {
  return (
    <svg viewBox="0 0 225 150" className="w-28 h-20 sm:w-32 sm:h-24 select-none drop-shadow-sm">
      {/* 1. Bear (Page 1: 곰) */}
      {type === 'bear' && (
        <g id="bear-graphic">
          <circle cx="24" cy="55" r="15" fill="#92400e" stroke="#78350f" strokeWidth="2.8" />
          <circle cx="24" cy="55" r="8" fill="#fde68a" />
          <circle cx="80" cy="55" r="15" fill="#92400e" stroke="#78350f" strokeWidth="2.8" />
          <circle cx="80" cy="55" r="8" fill="#fde68a" />
          <ellipse cx="52" cy="126" rx="30" ry="20" fill="#92400e" stroke="#78350f" strokeWidth="2.8" />
          <ellipse cx="52" cy="126" rx="18" ry="13" fill="#fef3c7" />
          <circle cx="34" cy="120" r="8.5" fill="#b45309" stroke="#78350f" strokeWidth="2.2" />
          <circle cx="70" cy="120" r="8.5" fill="#b45309" stroke="#78350f" strokeWidth="2.2" />
          <circle cx="52" cy="80" r="32" fill="#a16207" stroke="#78350f" strokeWidth="3.2" />
          <ellipse cx="52" cy="89" rx="16" ry="11.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1.8" />
          <ellipse cx="52" cy="84" rx="5.5" ry="3.8" fill="#1e1b4b" />
          <ellipse cx="50.6" cy="82.8" rx="1.5" ry="0.9" fill="#ffffff" />
          <path d="M 52 87.8 L 52 92" stroke="#1e1b4b" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 46.5 92 Q 52 97 57.5 92" stroke="#1e1b4b" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle cx="34" cy="87" r="4.2" fill="#f472b6" opacity="0.65" />
          <circle cx="70" cy="87" r="4.2" fill="#f472b6" opacity="0.65" />
          <circle cx="39" cy="74" r="3.8" fill="#1e1b4b" />
          <circle cx="40.8" cy="72.2" r="1.4" fill="#ffffff" />
          <circle cx="65" cy="74" r="3.8" fill="#1e1b4b" />
          <circle cx="66.8" cy="72.2" r="1.4" fill="#ffffff" />
        </g>
      )}

      {/* 2. House (Page 2: 집) */}
      {type === 'house' && (
        <g id="house-graphic">
          {/* Ground */}
          <ellipse cx="50" cy="138" rx="42" ry="7" fill="#d1fae5" />
          {/* Chimney & Smoke */}
          <rect x="64" y="44" width="10" height="20" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" rx="1" />
          <circle cx="69" cy="36" r="4" fill="#cbd5e1" opacity="0.7" />
          <circle cx="73" cy="28" r="5" fill="#cbd5e1" opacity="0.5" />
          {/* Wall */}
          <rect x="20" y="70" width="60" height="60" fill="#fef3c7" stroke="#b45309" strokeWidth="3" rx="4" />
          {/* Roof */}
          <path d="M 12 72 L 50 36 L 88 72 Z" fill="#ef4444" stroke="#991b1b" strokeWidth="3.2" strokeLinejoin="round" />
          {/* Attic round window */}
          <circle cx="50" cy="56" r="6" fill="#67e8f9" stroke="#b91c1c" strokeWidth="1.8" />
          {/* Door */}
          <rect x="28" y="96" width="18" height="34" fill="#d97706" stroke="#78350f" strokeWidth="2" rx="2" />
          <circle cx="42" cy="113" r="1.8" fill="#fef08a" />
          {/* Window */}
          <rect x="52" y="86" width="22" height="22" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.2" rx="2" />
          <line x1="63" y1="86" x2="63" y2="108" stroke="#0284c7" strokeWidth="1.6" />
          <line x1="52" y1="97" x2="74" y2="97" stroke="#0284c7" strokeWidth="1.6" />
          {/* Flower Bush */}
          <circle cx="18" cy="130" r="5" fill="#4ade80" />
          <circle cx="18" cy="127" r="2.5" fill="#f43f5e" />
          <circle cx="82" cy="130" r="5" fill="#4ade80" />
          <circle cx="82" cy="127" r="2.5" fill="#fbbf24" />
        </g>
      )}

      {/* 3. Ball / Soccer (Page 3: 공) */}
      {type === 'ball' && (
        <g id="ball-graphic">
          <ellipse cx="50" cy="136" rx="32" ry="7" fill="#e2e8f0" />
          {/* Ball Base */}
          <circle cx="50" cy="85" r="42" fill="#ffffff" stroke="#1e293b" strokeWidth="3.2" />
          {/* Center Pentagon */}
          <polygon points="50,72 62,81 57,96 43,96 38,81" fill="#1e293b" />
          {/* Connecting lines & edge patches */}
          <line x1="50" y1="72" x2="50" y2="52" stroke="#1e293b" strokeWidth="2.8" />
          <line x1="62" y1="81" x2="80" y2="76" stroke="#1e293b" strokeWidth="2.8" />
          <line x1="57" y1="96" x2="72" y2="114" stroke="#1e293b" strokeWidth="2.8" />
          <line x1="43" y1="96" x2="28" y2="114" stroke="#1e293b" strokeWidth="2.8" />
          <line x1="38" y1="81" x2="20" y2="76" stroke="#1e293b" strokeWidth="2.8" />
          <polygon points="42,44 58,44 50,52" fill="#1e293b" />
          <polygon points="82,66 91,78 80,76" fill="#1e293b" />
          <polygon points="18,66 9,78 20,76" fill="#1e293b" />
          <polygon points="76,118 64,124 72,114" fill="#1e293b" />
          <polygon points="24,118 36,124 28,114" fill="#1e293b" />
          {/* Shine highlight */}
          <path d="M 24 64 A 34 34 0 0 1 50 51" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Sparkles */}
          <path d="M 85 46 Q 89 46 89 42 Q 89 46 93 46 Q 89 46 89 50 Q 89 46 85 46 Z" fill="#fbbf24" />
        </g>
      )}

      {/* 4. Giraffe Neck (Page 4: 목) */}
      {type === 'giraffe' && (
        <g id="giraffe-graphic">
          {/* Long Neck */}
          <path d="M 38 140 L 46 54 L 62 54 L 68 140 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="3" />
          {/* Mane */}
          <path d="M 44 56 L 40 64 L 43 72 L 39 80 L 42 88 L 38 96 L 41 106 L 37 116 L 39 128" stroke="#b45309" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          {/* Spots on neck */}
          <ellipse cx="54" cy="74" rx="4.5" ry="6" fill="#b45309" />
          <ellipse cx="56" cy="98" rx="5.5" ry="7" fill="#b45309" />
          <ellipse cx="52" cy="122" rx="6" ry="8" fill="#b45309" />
          {/* Head */}
          <ellipse cx="64" cy="46" rx="16" ry="12" fill="#fbbf24" stroke="#d97706" strokeWidth="2.8" />
          {/* Muzzle */}
          <ellipse cx="76" cy="48" rx="8" ry="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <circle cx="78" cy="47" r="1.5" fill="#78350f" />
          {/* Horns (Ossicones) */}
          <line x1="57" y1="36" x2="54" y2="25" stroke="#d97706" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="53" cy="24" r="3.2" fill="#92400e" />
          <line x1="65" y1="35" x2="65" y2="23" stroke="#d97706" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="65" cy="22" r="3.2" fill="#92400e" />
          {/* Ear */}
          <ellipse cx="48" cy="40" rx="6" ry="3.5" fill="#fbbf24" stroke="#d97706" strokeWidth="2" transform="rotate(-30 48 40)" />
          {/* Eye & Rosy Cheek */}
          <circle cx="65" cy="43" r="2.8" fill="#1e1b4b" />
          <circle cx="66" cy="42" r="1" fill="#ffffff" />
          <circle cx="68" cy="51" r="2.8" fill="#f472b6" opacity="0.6" />
        </g>
      )}

      {/* 5. Hand (Page 5: 손) */}
      {type === 'hand' && (
        <g id="hand-graphic">
          {/* Wrist */}
          <rect x="42" y="105" width="22" height="36" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.8" rx="4" />
          {/* Palm & 5 Fingers (Waving Friendly Hand) */}
          {/* Thumb */}
          <path d="M 36 94 C 28 88 24 74 34 70 C 39 68 44 76 45 84" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Index */}
          <path d="M 44 76 L 44 42 C 44 36 51 36 51 42 L 51 68" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
          {/* Middle */}
          <path d="M 51 68 L 52 34 C 52 28 59 28 59 34 L 59 68" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
          {/* Ring */}
          <path d="M 59 68 L 60 40 C 60 34 67 34 67 40 L 67 72" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
          {/* Pinky */}
          <path d="M 67 72 L 68 50 C 68 44 74 44 74 50 L 73 82" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
          {/* Palm Fill */}
          <path d="M 38 86 C 38 78 74 76 74 86 L 70 108 L 39 108 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="2.8" strokeLinejoin="round" />
          {/* Palm Heart Badge */}
          <path d="M 53 93 C 53 90 49 89 49 92 C 49 95 53 97 53 97 C 53 97 57 95 57 92 C 57 89 53 90 53 93 Z" fill="#f43f5e" />
          {/* Motion Waves */}
          <path d="M 24 54 C 20 62 20 74 24 82" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 18 58 C 14 64 14 72 18 78" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* 6. Water Drop (Page 6: 물) */}
      {type === 'water' && (
        <g id="water-graphic">
          <ellipse cx="52" cy="138" rx="34" ry="6" fill="#bae6fd" opacity="0.6" />
          {/* Big Drop Body */}
          <path
            d="M 52 34 C 52 34 22 75 22 100 C 22 118 35 132 52 132 C 69 132 82 118 82 100 C 82 75 52 34 52 34 Z"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />
          {/* Water Highlight Glow */}
          <path d="M 34 85 C 32 94 36 108 44 116" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="76" r="2.5" fill="#ffffff" />
          {/* Happy Face */}
          <circle cx="43" cy="98" r="3.2" fill="#0f172a" />
          <circle cx="44.2" cy="96.8" r="1.2" fill="#ffffff" />
          <circle cx="61" cy="98" r="3.2" fill="#0f172a" />
          <circle cx="62.2" cy="96.8" r="1.2" fill="#ffffff" />
          {/* Smile */}
          <path d="M 48 106 Q 52 111 56 106" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <circle cx="38" cy="104" r="3.2" fill="#f472b6" opacity="0.7" />
          <circle cx="66" cy="104" r="3.2" fill="#f472b6" opacity="0.7" />
          {/* Little Splash Drop */}
          <path d="M 86 112 C 86 112 80 120 80 124 C 80 127 83 129 86 129 C 89 129 92 127 92 124 C 92 120 86 112 86 112 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.8" />
        </g>
      )}

      {/* 7. Spoon (Page 7: 숟가락) */}
      {type === 'spoon' && (
        <g id="spoon-graphic">
          {/* Shadow */}
          <ellipse cx="50" cy="136" rx="34" ry="6" fill="#e2e8f0" />
          {/* Spoon Handle (Slanted) */}
          <path
            d="M 52 74 L 68 132 C 69 136 63 138 60 135 L 46 76 Z"
            fill="#cbd5e1"
            stroke="#64748b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Spoon Bowl (Glossy metallic oval) */}
          <ellipse cx="46" cy="56" rx="26" ry="20" fill="#e2e8f0" stroke="#64748b" strokeWidth="3" transform="rotate(-15 46 56)" />
          {/* Inner reflection */}
          <ellipse cx="46" cy="56" rx="20" ry="14" fill="#f1f5f9" transform="rotate(-15 46 56)" />
          {/* Cute Face on Spoon */}
          <circle cx="41" cy="53" r="2.5" fill="#334155" />
          <circle cx="53" cy="50" r="2.5" fill="#334155" />
          <path d="M 45 58 Q 48 62 51 57" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="36" cy="57" r="2.2" fill="#f472b6" opacity="0.65" />
          <circle cx="57" cy="53" r="2.2" fill="#f472b6" opacity="0.65" />
          {/* Sparkle Highlights */}
          <path d="M 25 38 Q 29 38 29 34 Q 29 38 33 38 Q 29 38 29 42 Q 29 38 25 38 Z" fill="#38bdf8" />
          <path d="M 72 44 Q 75 44 75 41 Q 75 44 78 44 Q 75 44 75 47 Q 75 44 72 44 Z" fill="#fbbf24" />
        </g>
      )}

      {/* 8. Forest (Page 8: 숲) */}
      {type === 'forest' && (
        <g id="forest-graphic">
          {/* Ground Hill */}
          <path d="M 10 140 Q 52 120 90 140 Z" fill="#86efac" stroke="#16a34a" strokeWidth="2.5" />
          {/* Back Tree (Round Deciduous) */}
          <rect x="66" y="80" width="8" height="45" fill="#92400e" />
          <circle cx="70" cy="74" r="20" fill="#22c55e" stroke="#15803d" strokeWidth="2.8" />
          <circle cx="62" cy="68" r="13" fill="#4ade80" />
          {/* Front Pine Tree 1 */}
          <rect x="36" y="94" width="9" height="38" fill="#78350f" />
          <polygon points="40.5,38 20,68 61,68" fill="#15803d" stroke="#14532d" strokeWidth="2.8" strokeLinejoin="round" />
          <polygon points="40.5,56 16,88 65,88" fill="#16a34a" stroke="#14532d" strokeWidth="2.8" strokeLinejoin="round" />
          <polygon points="40.5,74 12,108 69,108" fill="#22c55e" stroke="#14532d" strokeWidth="2.8" strokeLinejoin="round" />
          {/* Cute Mushroom */}
          <rect x="76" y="130" width="4" height="8" fill="#fef08a" />
          <path d="M 72 130 C 72 124 84 124 84 130 Z" fill="#ef4444" />
          <circle cx="76" cy="127" r="1" fill="#ffffff" />
          <circle cx="80" cy="126" r="1.2" fill="#ffffff" />
        </g>
      )}

      {/* 9. Outside / Open Door (Page 9: 밖) */}
      {type === 'outside' && (
        <g id="outside-graphic">
          {/* Floor / Threshold */}
          <rect x="14" y="132" width="74" height="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" rx="2" />
          {/* Door Frame Outer */}
          <rect x="22" y="38" width="58" height="96" fill="#f8fafc" stroke="#334155" strokeWidth="3" rx="3" />
          {/* Outdoor Scene Inside Frame */}
          <g>
            <clipPath id="door-frame-clip">
              <rect x="24" y="40" width="54" height="92" rx="2" />
            </clipPath>
            <g clipPath="url(#door-frame-clip)">
              {/* Sky */}
              <rect x="24" y="40" width="54" height="60" fill="#bae6fd" />
              {/* Sun */}
              <circle cx="38" cy="56" r="10" fill="#fbbf24" />
              {/* Cloud */}
              <ellipse cx="62" cy="54" rx="10" ry="6" fill="#ffffff" />
              <ellipse cx="56" cy="56" rx="6" ry="4" fill="#ffffff" />
              {/* Green Meadow / Path */}
              <path d="M 24 85 Q 50 72 78 85 L 78 132 L 24 132 Z" fill="#4ade80" />
              <path d="M 44 132 L 48 88 L 56 88 L 62 132 Z" fill="#fef08a" opacity="0.8" />
            </g>
          </g>
          {/* Open Door Swinging Out/Left */}
          <path
            d="M 22 38 L 10 46 L 10 134 L 22 134 Z"
            fill="#d97706"
            stroke="#78350f"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="90" r="2" fill="#fef08a" />
          {/* Arrow pointing outside */}
          <path d="M 50 114 L 62 114 M 58 108 L 64 114 L 58 120" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
      )}

      {/* 10. Clothes / T-Shirt (Page 10: 옷) */}
      {type === 'clothes' && (
        <g id="clothes-graphic">
          <ellipse cx="52" cy="138" rx="34" ry="6" fill="#e2e8f0" />
          {/* Hanger Hook */}
          <path d="M 52 38 C 52 30 46 26 46 32 C 46 36 52 38 52 44" stroke="#64748b" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          {/* Hanger Triangle */}
          <path d="M 52 44 L 28 58 L 76 58 Z" stroke="#64748b" strokeWidth="2.4" fill="none" />
          {/* T-Shirt Body */}
          <path
            d="M 38 56 L 22 66 L 28 80 L 36 74 L 36 126 L 68 126 L 68 74 L 76 80 L 82 66 L 66 56 Q 52 66 38 56 Z"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Collar Detail */}
          <path d="M 42 56 Q 52 66 62 56" stroke="#0369a1" strokeWidth="2.4" fill="none" />
          {/* Stripes */}
          <line x1="36" y1="88" x2="68" y2="88" stroke="#ffffff" strokeWidth="3" />
          <line x1="36" y1="102" x2="68" y2="102" stroke="#ffffff" strokeWidth="3" />
          <line x1="36" y1="116" x2="68" y2="116" stroke="#ffffff" strokeWidth="3" />
          {/* Cute Heart Badge */}
          <path d="M 56 74 C 56 71 52 70 52 73 C 52 76 56 78 56 78 C 56 78 60 76 60 73 C 60 70 56 71 56 74 Z" fill="#ef4444" />
        </g>
      )}

      {/* 11. Flower (Page 11: 꽃) */}
      {type === 'flower' && (
        <g id="flower-graphic">
          <ellipse cx="52" cy="138" rx="30" ry="6" fill="#dcfce7" />
          {/* Stem & Leaves */}
          <path d="M 52 86 Q 52 110 52 136" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="40" cy="112" rx="10" ry="5" fill="#4ade80" stroke="#15803d" strokeWidth="2" transform="rotate(-30 40 112)" />
          <ellipse cx="64" cy="104" rx="10" ry="5" fill="#4ade80" stroke="#15803d" strokeWidth="2" transform="rotate(25 64 104)" />
          {/* 5 Petals */}
          {/* Top */}
          <circle cx="52" cy="50" r="14" fill="#f472b6" stroke="#db2777" strokeWidth="2.4" />
          {/* Top Right */}
          <circle cx="68" cy="62" r="14" fill="#f472b6" stroke="#db2777" strokeWidth="2.4" />
          {/* Bottom Right */}
          <circle cx="63" cy="80" r="14" fill="#f472b6" stroke="#db2777" strokeWidth="2.4" />
          {/* Bottom Left */}
          <circle cx="41" cy="80" r="14" fill="#f472b6" stroke="#db2777" strokeWidth="2.4" />
          {/* Top Left */}
          <circle cx="36" cy="62" r="14" fill="#f472b6" stroke="#db2777" strokeWidth="2.4" />
          {/* Center Golden Core */}
          <circle cx="52" cy="68" r="13" fill="#fbbf24" stroke="#d97706" strokeWidth="2.8" />
          {/* Smiling Face in Flower Center */}
          <circle cx="48" cy="65" r="2.2" fill="#78350f" />
          <circle cx="56" cy="65" r="2.2" fill="#78350f" />
          <path d="M 49 71 Q 52 74 55 71" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="44" cy="68" r="1.8" fill="#f43f5e" opacity="0.6" />
          <circle cx="60" cy="68" r="1.8" fill="#f43f5e" opacity="0.6" />
        </g>
      )}

      {/* 12. Chicken / Rooster (Page 12: 닭) */}
      {type === 'chicken' && (
        <g id="chicken-graphic">
          <ellipse cx="50" cy="138" rx="34" ry="6" fill="#fef08a" opacity="0.6" />
          {/* Feet */}
          <path d="M 42 124 L 42 136 M 38 136 L 46 136" stroke="#d97706" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 58 124 L 58 136 M 54 136 L 62 136" stroke="#d97706" strokeWidth="2.4" strokeLinecap="round" />
          {/* Tail Feathers on left */}
          <path d="M 24 96 Q 14 84 20 72 Q 28 82 28 94 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.8" />
          <path d="M 28 92 Q 20 74 30 64 Q 34 78 32 92 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.8" />
          <path d="M 32 96 Q 28 86 36 78 Q 38 88 34 96 Z" fill="#f97316" stroke="#d97706" strokeWidth="1.6" />
          {/* Plump Body */}
          <ellipse cx="50" cy="98" rx="26" ry="22" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.6" />
          {/* Wing */}
          <path d="M 42 92 Q 30 98 40 110 Q 54 112 48 94 Z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          {/* Head */}
          <circle cx="62" cy="74" r="15" fill="#ffffff" stroke="#f59e0b" strokeWidth="2.6" />
          {/* Red Comb on head (3 rounded bumps) */}
          <path d="M 54 62 Q 52 50 58 54 Q 62 44 68 50 Q 74 48 74 60 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.8" />
          {/* Orange Beak */}
          <polygon points="76,73 87,77 76,81" fill="#f97316" stroke="#c2410c" strokeWidth="1.6" />
          {/* Red Wattle below beak */}
          <path d="M 74 82 Q 72 90 77 88 Q 80 86 77 81 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" />
          {/* Eye */}
          <circle cx="68" cy="71" r="2.8" fill="#1e1b4b" />
          <circle cx="69.2" cy="69.8" r="1.1" fill="#ffffff" />
          {/* Blush */}
          <ellipse cx="64" cy="78" rx="3.5" ry="2" fill="#f472b6" opacity="0.65" />
        </g>
      )}

      {/* 13. Cute Scissors cutting rope (Page 13: 가위로 줄을 끊는 캐릭터 - 끊) */}
      {type === 'scissors' && (
        <g id="scissors-graphic">
          <ellipse cx="50" cy="138" rx="34" ry="6" fill="#e0f2fe" opacity="0.6" />
          {/* Rope / Thread being cut */}
          <path d="M 12 108 C 24 104 36 102 44 100" stroke="#f59e0b" strokeWidth="3.6" strokeLinecap="round" strokeDasharray="3 3" fill="none" />
          <path d="M 58 96 C 68 94 78 92 88 90" stroke="#f59e0b" strokeWidth="3.6" strokeLinecap="round" strokeDasharray="3 3" fill="none" />
          {/* Cut effect sparkles */}
          <path d="M 49 92 L 53 104 M 45 99 L 57 97" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="51" cy="98" r="2" fill="#ef4444" />
          {/* Scissor Blades (Metallic Steel) */}
          <path d="M 40 86 L 68 62 L 64 58 L 36 82 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 38 88 L 70 108 L 74 104 L 42 84 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="2" strokeLinejoin="round" />
          {/* Pivot Screw */}
          <circle cx="41" cy="85" r="4.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1.6" />
          <circle cx="41" cy="85" r="1.5" fill="#ffffff" />
          {/* Upper Handle Loop (Red/Coral with cute eyes) */}
          <circle cx="22" cy="70" r="14" fill="#f43f5e" stroke="#be123c" strokeWidth="2.6" />
          <circle cx="22" cy="70" r="7.5" fill="#ffffff" stroke="#be123c" strokeWidth="1.8" />
          {/* Lower Handle Loop */}
          <circle cx="24" cy="102" r="14" fill="#f43f5e" stroke="#be123c" strokeWidth="2.6" />
          <circle cx="24" cy="102" r="7.5" fill="#ffffff" stroke="#be123c" strokeWidth="1.8" />
          {/* Cute Face on Handle */}
          <circle cx="21" cy="67" r="1.6" fill="#1e1b4b" />
          <circle cx="25" cy="67" r="1.6" fill="#1e1b4b" />
          <path d="M 21.5 72 Q 23 74 24.5 72" stroke="#1e1b4b" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          {/* Little Star sparkle */}
          <polygon points="76,64 78,69 83,69 79,72 81,77 76,74 72,77 74,72 70,69 75,69" fill="#fbbf24" />
        </g>
      )}

      {/* 14. Cute Number 8 (Page 14: 숫자 8 eight 캐릭터 - 덟) */}
      {type === 'number8' && (
        <g id="number8-graphic">
          <ellipse cx="50" cy="138" rx="34" ry="6" fill="#ede9fe" opacity="0.6" />
          {/* Upper Body Loop */}
          <ellipse cx="50" cy="74" rx="19" ry="17" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2.8" />
          <ellipse cx="50" cy="74" rx="8.5" ry="7.5" fill="#ffffff" stroke="#6d28d9" strokeWidth="2" />
          {/* Lower Body Loop */}
          <ellipse cx="50" cy="106" rx="24" ry="21" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2.8" />
          <ellipse cx="50" cy="106" rx="11" ry="9.5" fill="#ffffff" stroke="#6d28d9" strokeWidth="2" />
          {/* Cute Big Sparkling Eyes in upper loop */}
          <circle cx="43" cy="72" r="2.8" fill="#1e1b4b" />
          <circle cx="44.2" cy="70.8" r="1" fill="#ffffff" />
          <circle cx="57" cy="72" r="2.8" fill="#1e1b4b" />
          <circle cx="58.2" cy="70.8" r="1" fill="#ffffff" />
          {/* Smiling Mouth */}
          <path d="M 47 78 Q 50 82 53 78" stroke="#1e1b4b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          {/* Cheerful Blush */}
          <circle cx="38" cy="76" r="3" fill="#f472b6" opacity="0.75" />
          <circle cx="62" cy="76" r="3" fill="#f472b6" opacity="0.75" />
          {/* Cute Little Waving Hands */}
          <ellipse cx="23" cy="88" rx="5" ry="4" fill="#a78bfa" stroke="#6d28d9" strokeWidth="1.8" transform="rotate(-20 23 88)" />
          <ellipse cx="77" cy="88" rx="5" ry="4" fill="#a78bfa" stroke="#6d28d9" strokeWidth="1.8" transform="rotate(20 77 88)" />
          {/* Cute Shoes / Feet */}
          <ellipse cx="39" cy="128" rx="7" ry="4.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1.8" />
          <ellipse cx="61" cy="128" rx="7" ry="4.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1.8" />
          {/* Crown / Sparkle decoration */}
          <polygon points="46,53 50,48 54,53 58,49 54,58 46,58" fill="#fbbf24" stroke="#d97706" strokeWidth="1.2" />
        </g>
      )}

      {/* 15. Cute Awl piercing wall (Page 15: 벽을 뚫는 송곳 캐릭터 - 뚫) */}
      {type === 'awl' && (
        <g id="awl-graphic">
          <ellipse cx="50" cy="138" rx="34" ry="6" fill="#fef3c7" opacity="0.6" />
          {/* Wall / Brick block being pierced on right */}
          <rect x="66" y="60" width="22" height="64" rx="3" fill="#cbd5e1" stroke="#64748b" strokeWidth="2.4" />
          <line x1="66" y1="82" x2="88" y2="82" stroke="#94a3b8" strokeWidth="1.8" />
          <line x1="66" y1="104" x2="88" y2="104" stroke="#94a3b8" strokeWidth="1.8" />
          <line x1="77" y1="60" x2="77" y2="82" stroke="#94a3b8" strokeWidth="1.8" />
          <line x1="77" y1="104" x2="77" y2="124" stroke="#94a3b8" strokeWidth="1.8" />
          {/* Crack lines where awl tip enters */}
          <path d="M 66 90 L 61 88 M 66 92 L 62 95 M 72 88 L 78 86" stroke="#475569" strokeWidth="1.6" strokeLinecap="round" />
          {/* Sparkling debris dust */}
          <circle cx="70" cy="85" r="1.5" fill="#94a3b8" />
          <circle cx="68" cy="98" r="1.2" fill="#94a3b8" />
          <circle cx="84" cy="92" r="1.8" fill="#f59e0b" />
          {/* Awl Metal Shaft & Piercing Tip */}
          <polygon points="68,91 40,86 40,96" fill="#94a3b8" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="68,91 76,91 68,93" fill="#e2e8f0" stroke="#334155" strokeWidth="1.6" />
          {/* Awl Wooden Handle (Plump and friendly) */}
          <ellipse cx="26" cy="91" rx="16" ry="14" fill="#f59e0b" stroke="#b45309" strokeWidth="2.8" />
          <ellipse cx="14" cy="91" rx="4" ry="9" fill="#d97706" />
          {/* Cheerful Determined Face on Handle */}
          <circle cx="24" cy="88" r="2.4" fill="#1e1b4b" />
          <circle cx="25" cy="87" r="0.9" fill="#ffffff" />
          <circle cx="32" cy="88" r="2.4" fill="#1e1b4b" />
          <circle cx="33" cy="87" r="0.9" fill="#ffffff" />
          {/* Determined Smile / Winking Brow */}
          <path d="M 23 83 L 26 84 M 31 84 L 34 83" stroke="#78350f" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 26 94 Q 28 97 31 94" stroke="#1e1b4b" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          {/* Rosy Cheek */}
          <circle cx="21" cy="92" r="2.4" fill="#f472b6" opacity="0.75" />
          {/* Breakthrough Sparkles */}
          <polygon points="76,82 78,85 82,85 79,88 80,91 76,89 73,91 74,88 71,85 75,85" fill="#f59e0b" />
        </g>
      )}

      {/* 16. Cute Dog licking bone (Page 13: 핥다) */}
      {type === 'dog_licking_bone' && (
        <g id="dog-licking-bone-graphic">
          <ellipse cx="50" cy="138" rx="34" ry="6" fill="#fef3c7" opacity="0.6" />
          {/* Dog Body */}
          <ellipse cx="46" cy="104" rx="24" ry="20" fill="#fde68a" stroke="#d97706" strokeWidth="2.6" />
          {/* Floppy Left Ear */}
          <path d="M 28 62 C 16 68 14 90 26 94 C 32 94 32 82 28 62 Z" fill="#d97706" stroke="#b45309" strokeWidth="2" />
          {/* Floppy Right Ear */}
          <path d="M 72 62 C 84 68 86 90 74 94 C 68 94 68 82 72 62 Z" fill="#d97706" stroke="#b45309" strokeWidth="2" />
          {/* Dog Head */}
          <circle cx="50" cy="74" r="22" fill="#fef08a" stroke="#d97706" strokeWidth="2.6" />
          {/* Muzzle */}
          <ellipse cx="50" cy="83" rx="11" ry="8" fill="#ffffff" stroke="#d97706" strokeWidth="1.6" />
          <ellipse cx="50" cy="79" rx="3.5" ry="2.5" fill="#78350f" />
          {/* Happy Eyes (curved arches) */}
          <path d="M 39 72 Q 43 68 47 72" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 53 72 Q 57 68 61 72" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Pink Cheeks */}
          <circle cx="36" cy="78" r="3" fill="#f472b6" opacity="0.75" />
          <circle cx="64" cy="78" r="3" fill="#f472b6" opacity="0.75" />
          {/* Tongue sticking out to lick bone */}
          <path d="M 47 85 C 47 93 54 94 56 90 C 58 87 54 84 51 84 Z" fill="#f43f5e" stroke="#e11d48" strokeWidth="1.5" />
          {/* Delicious Dog Bone */}
          <g transform="translate(32, 94) rotate(-8)">
            <circle cx="6" cy="7" r="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="6" cy="15" r="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="34" cy="7" r="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="34" cy="15" r="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <rect x="6" y="8" width="28" height="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.8" />
          </g>
          {/* Little Love Heart */}
          <path d="M 67 52 C 67 48 62 47 62 51 C 62 55 67 58 67 58 C 67 58 72 55 72 51 C 72 47 67 48 67 52 Z" fill="#f43f5e" />
        </g>
      )}

      {/* 17. Many Candies (Page 15: 많다) */}
      {type === 'many_candies' && (
        <g id="many-candies-graphic">
          <ellipse cx="50" cy="138" rx="34" ry="6" fill="#fce7f3" opacity="0.6" />
          {/* Cute Candy Bowl / Wrapper Base */}
          <path d="M 22 100 Q 50 140 78 100 Q 50 110 22 100 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="2.5" />
          {/* Large Swirl Lollipop in background */}
          <line x1="38" y1="95" x2="30" y2="128" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="36" cy="72" r="15" fill="#fb7185" stroke="#e11d48" strokeWidth="2.2" />
          <path d="M 36 62 A 10 10 0 0 1 44 72 A 6 6 0 0 1 36 78 A 3 3 0 0 1 34 74" stroke="#ffffff" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          {/* Wrapped Candies Piled Up */}
          <g transform="translate(48, 64) rotate(15)">
            <polygon points="2,8 -6,2 -6,14" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.4" />
            <polygon points="18,8 26,2 26,14" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.4" />
            <ellipse cx="10" cy="8" rx="9" ry="6" fill="#7dd3fc" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="8" y1="4" x2="12" y2="12" stroke="#ffffff" strokeWidth="1.8" />
          </g>
          <g transform="translate(30, 88) rotate(-18)">
            <polygon points="2,8 -6,2 -6,14" fill="#fde047" stroke="#ca8a04" strokeWidth="1.4" />
            <polygon points="18,8 26,2 26,14" fill="#fde047" stroke="#ca8a04" strokeWidth="1.4" />
            <ellipse cx="10" cy="8" rx="8.5" ry="5.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.8" />
          </g>
          <g transform="translate(56, 84) rotate(25)">
            <polygon points="2,8 -6,2 -6,14" fill="#c084fc" stroke="#7e22ce" strokeWidth="1.4" />
            <polygon points="18,8 26,2 26,14" fill="#c084fc" stroke="#7e22ce" strokeWidth="1.4" />
            <ellipse cx="10" cy="8" rx="8.5" ry="5.5" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="1.8" />
          </g>
          <g transform="translate(40, 96) rotate(5)">
            <polygon points="2,8 -6,2 -6,14" fill="#34d399" stroke="#059669" strokeWidth="1.4" />
            <polygon points="18,8 26,2 26,14" fill="#34d399" stroke="#059669" strokeWidth="1.4" />
            <ellipse cx="10" cy="8" rx="9" ry="6" fill="#6ee7b7" stroke="#059669" strokeWidth="1.8" />
            <circle cx="10" cy="8" r="2.2" fill="#ffffff" />
          </g>
          <polygon points="76,60 78,64 82,64 79,67 80,71 76,68 72,71 74,67 71,64 75,64" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          <polygon points="20,70 21.5,73 25,73 22,75 23,78 20,76 17,78 18,75 15,73 18.5,73" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
        </g>
      )}

      {/* Upper-Right Speech Bubble */}
      {renderSpeechBubble(rules, ruleFormat)}
    </svg>
  );
};

// -------------------------------------------------------------
// COMPLETE 11 PAGES DATA (PAGES 1 ~ 11)
// -------------------------------------------------------------

export const BATCHIM_PAGES_DATA: BatchimPageConfig[] = [
  // Page 1: ① ㅁ 받침을 만나요 | Final Consonant ㅁ
  {
    pageNumber: 1,
    circledNumber: '①',
    title: '✏️ 해볼 한국어 [받침글자] ① ㅁ 받침을 만나요 | Final Consonant ㅁ',
    dropdownTitle: '① ㅁ 받침을 만나요 (Final Consonant ㅁ)',
    subTitle: 'ㅁ 받침',
    cards: [
      {
        baseSyllable: '고',
        baseRomaja: '[go]',
        batchim: 'ㅁ',
        batchimName: '미음',
        batchimSound: '음',
        batchimRomaja: '[m]',
        syllable: '곰',
        romaja: '[gom]'
      },
      {
        baseSyllable: '나',
        baseRomaja: '[na]',
        batchim: 'ㅁ',
        batchimName: '미음',
        batchimSound: '음',
        batchimRomaja: '[m]',
        syllable: '남',
        romaja: '[nam]'
      },
      {
        baseSyllable: '바',
        baseRomaja: '[ba]',
        batchim: 'ㅁ',
        batchimName: '미음',
        batchimSound: '음',
        batchimRomaja: '[m]',
        syllable: '밤',
        romaja: '[bam]'
      }
    ],
    wordCard: {
      wordLabel: '곰',
      writeChar: '곰',
      audioWord: '곰',
      illustrationType: 'bear',
      speechRules: [{ target: 'ㅁ', sound: '음' }]
    }
  },

  // Page 2: ② ㅂ 받침을 만나요 | Final Consonant ㅂ
  {
    pageNumber: 2,
    circledNumber: '②',
    title: '✏️ 해볼 한국어 [받침글자] ② ㅂ 받침을 만나요 | Final Consonant ㅂ',
    dropdownTitle: '② ㅂ 받침을 만나요 (Final Consonant ㅂ)',
    subTitle: 'ㅂ 받침',
    cards: [
      {
        baseSyllable: '바',
        baseRomaja: '[ba]',
        batchim: 'ㅂ',
        batchimName: '비읍',
        batchimSound: '읍',
        batchimRomaja: '[p]',
        syllable: '밥',
        romaja: '[bap]'
      },
      {
        baseSyllable: '지',
        baseRomaja: '[ji]',
        batchim: 'ㅂ',
        batchimName: '비읍',
        batchimSound: '읍',
        batchimRomaja: '[p]',
        syllable: '집',
        romaja: '[jip]'
      },
      {
        baseSyllable: '이',
        baseRomaja: '[i]',
        batchim: 'ㅂ',
        batchimName: '비읍',
        batchimSound: '읍',
        batchimRomaja: '[p]',
        syllable: '입',
        romaja: '[ip]'
      }
    ],
    wordCard: {
      wordLabel: '집',
      writeChar: '집',
      audioWord: '집',
      illustrationType: 'house',
      speechRules: [{ target: 'ㅂ', sound: '읍' }]
    }
  },

  // Page 3: ③ ㅇ 받침을 만나요 | Final Consonant ㅇ
  {
    pageNumber: 3,
    circledNumber: '③',
    title: '✏️ 해볼 한국어 [받침글자] ③ ㅇ 받침을 만나요 | Final Consonant ㅇ',
    dropdownTitle: '③ ㅇ 받침을 만나요 (Final Consonant ㅇ)',
    subTitle: 'ㅇ 받침',
    cards: [
      {
        baseSyllable: '가',
        baseRomaja: '[ga]',
        batchim: 'ㅇ',
        batchimName: '이응',
        batchimSound: '응',
        batchimRomaja: '[ng]',
        syllable: '강',
        romaja: '[gang]'
      },
      {
        baseSyllable: '바',
        baseRomaja: '[ba]',
        batchim: 'ㅇ',
        batchimName: '이응',
        batchimSound: '응',
        batchimRomaja: '[ng]',
        syllable: '방',
        romaja: '[bang]'
      },
      {
        baseSyllable: '고',
        baseRomaja: '[go]',
        batchim: 'ㅇ',
        batchimName: '이응',
        batchimSound: '응',
        batchimRomaja: '[ng]',
        syllable: '공',
        romaja: '[gong]'
      }
    ],
    wordCard: {
      wordLabel: '공',
      writeChar: '공',
      audioWord: '공',
      illustrationType: 'ball',
      speechRules: [{ target: 'ㅇ', sound: '응' }]
    }
  },

  // Page 4: ④ ㄱ 받침을 만나요 | Final Consonant ㄱ
  {
    pageNumber: 4,
    circledNumber: '④',
    title: '✏️ 해볼 한국어 [받침글자] ④ ㄱ 받침을 만나요 | Final Consonant ㄱ',
    dropdownTitle: '④ ㄱ 받침을 만나요 (Final Consonant ㄱ)',
    subTitle: 'ㄱ 받침',
    cards: [
      {
        baseSyllable: '수',
        baseRomaja: '[su]',
        batchim: 'ㄱ',
        batchimName: '기역',
        batchimSound: '윽',
        batchimRomaja: '[k]',
        syllable: '숙',
        romaja: '[suk]'
      },
      {
        baseSyllable: '바',
        baseRomaja: '[ba]',
        batchim: 'ㄱ',
        batchimName: '기역',
        batchimSound: '윽',
        batchimRomaja: '[k]',
        syllable: '박',
        romaja: '[bak]'
      },
      {
        baseSyllable: '모',
        baseRomaja: '[mo]',
        batchim: 'ㄱ',
        batchimName: '기역',
        batchimSound: '윽',
        batchimRomaja: '[k]',
        syllable: '목',
        romaja: '[mok]'
      }
    ],
    wordCard: {
      wordLabel: '목',
      writeChar: '목',
      audioWord: '목',
      illustrationType: 'giraffe',
      speechRules: [{ target: 'ㄱ', sound: '윽' }]
    }
  },

  // Page 5: ⑤ ㄴ 받침을 만나요 | Final Consonant ㄴ
  {
    pageNumber: 5,
    circledNumber: '⑤',
    title: '✏️ 해볼 한국어 [받침글자] ⑤ ㄴ 받침을 만나요 | Final Consonant ㄴ',
    dropdownTitle: '⑤ ㄴ 받침을 만나요 (Final Consonant ㄴ)',
    subTitle: 'ㄴ 받침',
    cards: [
      {
        baseSyllable: '누',
        baseRomaja: '[nu]',
        batchim: 'ㄴ',
        batchimName: '니은',
        batchimSound: '은',
        batchimRomaja: '[n]',
        syllable: '눈',
        romaja: '[nun]'
      },
      {
        baseSyllable: '무',
        baseRomaja: '[mu]',
        batchim: 'ㄴ',
        batchimName: '니은',
        batchimSound: '은',
        batchimRomaja: '[n]',
        syllable: '문',
        romaja: '[mun]'
      },
      {
        baseSyllable: '소',
        baseRomaja: '[so]',
        batchim: 'ㄴ',
        batchimName: '니은',
        batchimSound: '은',
        batchimRomaja: '[n]',
        syllable: '손',
        romaja: '[son]'
      }
    ],
    wordCard: {
      wordLabel: '손',
      writeChar: '손',
      audioWord: '손',
      illustrationType: 'hand',
      speechRules: [{ target: 'ㄴ', sound: '은' }]
    }
  },

  // Page 6: ⑥ ㄹ 받침을 만나요 | Final Consonant ㄹ
  {
    pageNumber: 6,
    circledNumber: '⑥',
    title: '✏️ 해볼 한국어 [받침글자] ⑥ ㄹ 받침을 만나요 | Final Consonant ㄹ',
    dropdownTitle: '⑥ ㄹ 받침을 만나요 (Final Consonant ㄹ)',
    subTitle: 'ㄹ 받침',
    cards: [
      {
        baseSyllable: '다',
        baseRomaja: '[da]',
        batchim: 'ㄹ',
        batchimName: '리을',
        batchimSound: '을',
        batchimRomaja: '[l]',
        syllable: '달',
        romaja: '[dal]'
      },
      {
        baseSyllable: '부',
        baseRomaja: '[bu]',
        batchim: 'ㄹ',
        batchimName: '리을',
        batchimSound: '을',
        batchimRomaja: '[l]',
        syllable: '불',
        romaja: '[bul]'
      },
      {
        baseSyllable: '무',
        baseRomaja: '[mu]',
        batchim: 'ㄹ',
        batchimName: '리을',
        batchimSound: '을',
        batchimRomaja: '[l]',
        syllable: '물',
        romaja: '[mul]'
      }
    ],
    wordCard: {
      wordLabel: '물',
      writeChar: '물',
      audioWord: '물',
      illustrationType: 'water',
      speechRules: [{ target: 'ㄹ', sound: '을' }]
    }
  },

  // Page 7: ⑦ ㄷ 받침을 만나요 | Final Consonant ㄷ
  {
    pageNumber: 7,
    circledNumber: '⑦',
    title: '✏️ 해볼 한국어 [받침글자] ⑦ ㄷ 받침을 만나요 | Final Consonant ㄷ',
    dropdownTitle: '⑦ ㄷ 받침을 만나요 (Final Consonant ㄷ)',
    subTitle: 'ㄷ 받침',
    cards: [
      {
        baseSyllable: '고',
        baseRomaja: '[go]',
        batchim: 'ㄷ',
        batchimName: '디귿',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '곧',
        romaja: '[got]'
      },
      {
        baseSyllable: '미',
        baseRomaja: '[mi]',
        batchim: 'ㄷ',
        batchimName: '디귿',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '믿',
        romaja: '[mit]'
      },
      {
        baseSyllable: '수',
        baseRomaja: '[su]',
        batchim: 'ㄷ',
        batchimName: '디귿',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '숟',
        romaja: '[sut]'
      }
    ],
    wordCard: {
      wordLabel: '숟가락',
      writeChar: '숟',
      audioWord: '숟가락',
      illustrationType: 'spoon',
      speechRules: [{ target: 'ㄷ', sound: '읃' }]
    }
  },

  // Page 8: ⑧ ㅂ 가족 (ㅍ) | Sound Family [ㅂ] ㅍ
  {
    pageNumber: 8,
    circledNumber: '⑧',
    title: '✏️ 해볼 한국어 [받침글자] ⑧ ㅂ 가족 (ㅍ) | Sound Family [ㅂ] ㅍ',
    dropdownTitle: '⑧ ㅂ 가족 (ㅍ) (Sound Family [ㅂ] ㅍ)',
    subTitle: 'ㅂ 가족 (ㅍ)',
    cards: [
      {
        baseSyllable: '아',
        baseRomaja: '[a]',
        batchim: 'ㅍ',
        batchimName: '피읖',
        batchimSound: '읍',
        batchimRomaja: '[p]',
        syllable: '앞',
        romaja: '[ap]'
      },
      {
        baseSyllable: '여',
        baseRomaja: '[yeo]',
        batchim: 'ㅍ',
        batchimName: '피읖',
        batchimSound: '읍',
        batchimRomaja: '[p]',
        syllable: '옆',
        romaja: '[yeop]'
      },
      {
        baseSyllable: '수',
        baseRomaja: '[su]',
        batchim: 'ㅍ',
        batchimName: '피읖',
        batchimSound: '읍',
        batchimRomaja: '[p]',
        syllable: '숲',
        romaja: '[sup]'
      }
    ],
    wordCard: {
      wordLabel: '숲',
      writeChar: '숲',
      audioWord: '숲',
      illustrationType: 'forest',
      speechRules: [
        { target: 'ㅍ', sound: '읍' },
        { target: 'ㅂ', sound: '읍' }
      ]
    }
  },

  // Page 9: ⑨ ㄱ 가족 (ㅋ, ㄲ) | Sound Family [ㄱ] ㅋ, ㄲ
  {
    pageNumber: 9,
    circledNumber: '⑨',
    title: '✏️ 해볼 한국어 [받침글자] ⑨ ㄱ 가족 (ㅋ, ㄲ) | Sound Family [ㄱ] ㅋ, ㄲ',
    dropdownTitle: '⑨ ㄱ 가족 (ㅋ, ㄲ) (Sound Family [ㄱ] ㅋ, ㄲ)',
    subTitle: 'ㄱ 가족 (ㅋ, ㄲ)',
    cards: [
      {
        baseSyllable: '어',
        baseRomaja: '[eo]',
        batchim: 'ㅋ',
        batchimName: '키읔',
        batchimSound: '윽',
        batchimRomaja: '[k]',
        syllable: '엌',
        romaja: '[eok]'
      },
      {
        baseSyllable: '바',
        baseRomaja: '[ba]',
        batchim: 'ㄲ',
        batchimName: '쌍기역',
        batchimSound: '윽',
        batchimRomaja: '[k]',
        syllable: '밖',
        romaja: '[bak]'
      },
      {
        baseSyllable: '꺼',
        baseRomaja: '[kkeo]',
        batchim: 'ㄲ',
        batchimName: '쌍기역',
        batchimSound: '윽',
        batchimRomaja: '[k]',
        syllable: '꺾',
        romaja: '[kkeok]'
      }
    ],
    wordCard: {
      wordLabel: '밖',
      writeChar: '밖',
      audioWord: '밖',
      illustrationType: 'outside',
      speechRules: [
        { target: 'ㄱ', sound: '윽' },
        { target: 'ㅋ', sound: '윽' },
        { target: 'ㄲ', sound: '윽' }
      ]
    }
  },

  // Page 10: ⑩ ㄷ 가족 (ㅅ, ㅆ, ㅈ) | Sound Family [ㄷ] ㅅ, ㅆ, ㅈ
  {
    pageNumber: 10,
    circledNumber: '⑩',
    title: '✏️ 해볼 한국어 [받침글자] ⑩ ㄷ 가족 (ㅅ, ㅆ, ㅈ) | Sound Family [ㄷ] ㅅ, ㅆ, ㅈ',
    dropdownTitle: '⑩ ㄷ 가족 (ㅅ, ㅆ, ㅈ) (Sound Family [ㄷ] ㅅ, ㅆ, ㅈ)',
    subTitle: 'ㄷ 가족 (ㅅ, ㅆ, ㅈ)',
    cards: [
      {
        baseSyllable: '오',
        baseRomaja: '[o]',
        batchim: 'ㅅ',
        batchimName: '시옷',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '옷',
        romaja: '[ot]'
      },
      {
        baseSyllable: '이',
        baseRomaja: '[i]',
        batchim: 'ㅆ',
        batchimName: '쌍시옷',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '있',
        romaja: '[it]'
      },
      {
        baseSyllable: '나',
        baseRomaja: '[na]',
        batchim: 'ㅈ',
        batchimName: '지읒',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '낮',
        romaja: '[nat]'
      }
    ],
    wordCard: {
      wordLabel: '옷',
      writeChar: '옷',
      audioWord: '옷',
      illustrationType: 'clothes',
      speechRules: [
        { target: 'ㅅ', sound: '읃' },
        { target: 'ㅆ', sound: '읃' },
        { target: 'ㅈ', sound: '읃' }
      ]
    }
  },

  // Page 11: ⑪ ㄷ 가족 (ㅊ, ㅌ, ㅎ) | Sound Family [ㄷ] ㅊ, ㅌ, ㅎ
  {
    pageNumber: 11,
    circledNumber: '⑪',
    title: '✏️ 해볼 한국어 [받침글자] ⑪ ㄷ 가족 (ㅊ, ㅌ, ㅎ) | Sound Family [ㄷ] ㅊ, ㅌ, ㅎ',
    dropdownTitle: '⑪ ㄷ 가족 (ㅊ, ㅌ, ㅎ) (Sound Family [ㄷ] ㅊ, ㅌ, ㅎ)',
    subTitle: 'ㄷ 가족 (ㅊ, ㅌ, ㅎ)',
    cards: [
      {
        baseSyllable: '꼬',
        baseRomaja: '[kko]',
        batchim: 'ㅊ',
        batchimName: '치읓',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '꽃',
        romaja: '[kkot]'
      },
      {
        baseSyllable: '바',
        baseRomaja: '[ba]',
        batchim: 'ㅌ',
        batchimName: '티읕',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '밭',
        romaja: '[bat]'
      },
      {
        baseSyllable: '으',
        baseRomaja: '[eu]',
        batchim: 'ㅎ',
        batchimName: '히읗',
        batchimSound: '읃',
        batchimRomaja: '[t]',
        syllable: '읗',
        romaja: '[eut]'
      }
    ],
    wordCard: {
      wordLabel: '꽃',
      writeChar: '꽃',
      audioWord: '꽃',
      illustrationType: 'flower',
      speechRules: [
        { target: 'ㅊ', sound: '읃' },
        { target: 'ㅌ', sound: '읃' },
        { target: 'ㅎ', sound: '읃' }
      ]
    }
  },

  // Page 12: ⑫ [겹받침] ① 앞 자음 발음 1 (ㄳ, ㄵ, ㄼ)
  {
    pageNumber: 12,
    circledNumber: '⑫',
    title: '✏️ 해볼 한국어 [겹받침] ① 앞 자음 발음 1 (ㄳ, ㄵ, ㄼ)',
    dropdownTitle: '⑫ [겹받침] ① 앞 자음 발음 1 (ㄳ, ㄵ, ㄼ)',
    subTitle: '앞 자음 발음 1 (ㄳ, ㄵ, ㄼ)',
    cards: [
      {
        baseSyllable: '모',
        baseRomaja: '[mo]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄱ', romaja: '[k]', isSilent: false, sound: '윽' },
        secondBatchim: { char: 'ㅅ', romaja: '[t : 발음x]', isSilent: true, sound: '' },
        batchim: 'ㄳ',
        batchimName: '기역시옷',
        batchimSound: '윽',
        batchimRomaja: '[k]',
        syllable: '몫',
        romaja: '[mok]',
        pronunciationNote: '[목]',
        writeWords: ['몫', '몫']
      },
      {
        baseSyllable: '아',
        baseRomaja: '[a]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄴ', romaja: '[n]', isSilent: false, sound: '은' },
        secondBatchim: { char: 'ㅈ', romaja: '[t : 발음x]', isSilent: true, sound: '' },
        batchim: 'ㄵ',
        batchimName: '니은지읒',
        batchimSound: '은',
        batchimRomaja: '[n]',
        syllable: '앉',
        romaja: '[an]',
        pronunciationNote: '[안]',
        writeWords: ['앉', '다']
      },
      {
        baseSyllable: '더',
        baseRomaja: '[deo]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄹ', romaja: '[l]', isSilent: false, sound: '을' },
        secondBatchim: { char: 'ㅂ', romaja: '[p : 발음x]', isSilent: true, sound: '' },
        batchim: 'ㄼ',
        batchimName: '리을비읍',
        batchimSound: '을',
        batchimRomaja: '[l]',
        syllable: '덟',
        romaja: '[deol]',
        pronunciationNote: '[덜]',
        writeWords: ['더', '덟']
      }
    ],
    wordCard: {
      wordLabel: '여덟',
      writeChar: '덟',
      audioWord: '여덟',
      illustrationType: 'number8',
      hideWordLabel: false,
      speechRules: [{ target: '', sound: '', customText: '[여덜]' }]
    },
    rulePanel: {
      title: '앞 자음으로 발음하는 겹받침 1',
      sections: [
        {
          text: "겹받침 'ㄳ, ㄵ, ㄼ'은 어말 또는 자음 앞에서 앞의 자음으로 발음해요.",
          bullets: [
            '• ㄳ ➔ [ㄱ] (몫 ➔ [목])',
            '• ㄵ ➔ [ㄴ] (앉다 ➔ [안])',
            '• ㄼ ➔ [ㄹ] (여덟 ➔ [덜])'
          ],
          noteBox: {
            title: "※ [주의]: 'ㄼ' 받침의 예외",
            items: [
              "• 밟다 ➔ [밥따] (자음 앞에서 'ㅂ'으로 발음!)",
              '• 넓죽하다 ➔ [넙쭈카다]'
            ],
            isWarning: true
          }
        }
      ]
    }
  },

  // Page 13: ⑬ [겹받침] ② 앞 자음 발음 2 (ㄽ, ㄾ, ㅄ)
  {
    pageNumber: 13,
    circledNumber: '⑬',
    title: '✏️ 해볼 한국어 [겹받침] ② 앞 자음 발음 2 (ㄽ, ㄾ, ㅄ)',
    dropdownTitle: '⑬ [겹받침] ② 앞 자음 발음 2 (ㄽ, ㄾ, ㅄ)',
    subTitle: '앞 자음 발음 2 (ㄽ, ㄾ, ㅄ)',
    cards: [
      {
        baseSyllable: '고',
        baseRomaja: '[go]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄹ', romaja: '[l]', isSilent: false, sound: '을' },
        secondBatchim: { char: 'ㅅ', romaja: '[t : 발음x]', isSilent: true, sound: '' },
        batchim: 'ㄽ',
        batchimName: '리을시옷',
        batchimSound: '을',
        batchimRomaja: '[l]',
        syllable: '곬',
        romaja: '[gol]',
        pronunciationNote: '[골]',
        writeWords: ['곬', '곬']
      },
      {
        baseSyllable: '하',
        baseRomaja: '[ha]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄹ', romaja: '[l]', isSilent: false, sound: '을' },
        secondBatchim: { char: 'ㅌ', romaja: '[t : 발음x]', isSilent: true, sound: '' },
        batchim: 'ㄾ',
        batchimName: '리을티읕',
        batchimSound: '을',
        batchimRomaja: '[l]',
        syllable: '핥',
        romaja: '[hal]',
        pronunciationNote: '[할]',
        writeWords: ['핥', '다']
      },
      {
        baseSyllable: '어',
        baseRomaja: '[eo]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㅂ', romaja: '[p]', isSilent: false, sound: '읍' },
        secondBatchim: { char: 'ㅅ', romaja: '[t : 발음x]', isSilent: true, sound: '' },
        batchim: 'ㅄ',
        batchimName: '비읍시옷',
        batchimSound: '읍',
        batchimRomaja: '[p]',
        syllable: '없',
        romaja: '[eop]',
        pronunciationNote: '[업]',
        writeWords: ['없', '다']
      }
    ],
    wordCard: {
      wordLabel: '핥다',
      writeChar: '핥',
      audioWord: '핥다',
      illustrationType: 'dog_licking_bone',
      hideWordLabel: false,
      speechRules: [{ target: '', sound: '', customText: '[할따]' }]
    },
    rulePanel: {
      title: '앞 자음으로 발음하는 겹받침 2',
      sections: [
        {
          text: "겹받침 'ㄽ, ㄾ, ㅄ'은 어말 또는 자음 앞에서 앞의 자음으로 발음해요.",
          bullets: [
            '• ㄽ ➔ [ㄹ] (곬 ➔ [골])',
            '• ㄾ ➔ [ㄹ] (핥다 ➔ [할])',
            '• ㅄ ➔ [ㅂ] (없다 ➔ [업])'
          ],
          noteBox: {
            title: '※ [정보] : 한글의 겹받침은 모두 11개',
            items: ['• ㄳ, ㄵ, ㄼ, ㄽ, ㄾ, ㅄ, ㄺ, ㄻ, ㄿ, ㄶ, ㅀ'],
            isWarning: false
          }
        }
      ]
    }
  },

  // Page 14: ⑭ [겹받침] ③ 뒤 자음 발음 (ㄺ, ㄻ, ㄿ)
  {
    pageNumber: 14,
    circledNumber: '⑭',
    title: '✏️ 해볼 한국어 [겹받침] ③ 뒤 자음 발음 (ㄺ, ㄻ, ㄿ)',
    dropdownTitle: '⑭ [겹받침] ③ 뒤 자음 발음 (ㄺ, ㄻ, ㄿ)',
    subTitle: '뒤 자음 발음 (ㄺ, ㄻ, ㄿ)',
    cards: [
      {
        baseSyllable: '다',
        baseRomaja: '[da]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄹ', romaja: '[l : 발음x]', isSilent: true, sound: '' },
        secondBatchim: { char: 'ㄱ', romaja: '[k]', isSilent: false, sound: '윽' },
        batchim: 'ㄺ',
        batchimName: '리을기역',
        batchimSound: '윽',
        batchimRomaja: '[k]',
        syllable: '닭',
        romaja: '[dak]',
        pronunciationNote: '[닥]',
        writeWords: ['닭', '닭']
      },
      {
        baseSyllable: '사',
        baseRomaja: '[sa]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄹ', romaja: '[l : 발음x]', isSilent: true, sound: '' },
        secondBatchim: { char: 'ㅁ', romaja: '[m]', isSilent: false, sound: '음' },
        batchim: 'ㄻ',
        batchimName: '리을미음',
        batchimSound: '음',
        batchimRomaja: '[m]',
        syllable: '삶',
        romaja: '[sam]',
        pronunciationNote: '[삼]',
        writeWords: ['삶', '삶']
      },
      {
        baseSyllable: '으',
        baseRomaja: '[eu]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄹ', romaja: '[l : 발음x]', isSilent: true, sound: '' },
        secondBatchim: { char: 'ㅍ', romaja: '[p]', isSilent: false, sound: '읍' },
        batchim: 'ㄿ',
        batchimName: '리을피읖',
        batchimSound: '읍',
        batchimRomaja: '[p]',
        syllable: '읊',
        romaja: '[eup]',
        pronunciationNote: '[읍]',
        writeWords: ['읊', '다']
      }
    ],
    wordCard: {
      wordLabel: '닭',
      writeChar: '닭',
      audioWord: '닭',
      illustrationType: 'chicken',
      hideWordLabel: false,
      speechRules: [{ target: '', sound: '', customText: '[닥]' }]
    },
    rulePanel: {
      title: '뒤 자음으로 발음하는 겹받침',
      sections: [
        {
          text: "겹받침 'ㄺ, ㄻ, ㄿ'은 어말 또는 자음 앞에서 뒤의 자음으로 발음해요.",
          bullets: [
            '• ㄺ ➔ [ㄱ] (닭 ➔ [닥])',
            '• ㄻ ➔ [ㅁ] (삶 ➔ [삼])',
            '• ㄿ ➔ [ㅂ] (읊다 ➔ [읍])'
          ],
          noteBox: {
            title: "※ [주의]: 'ㄺ' 받침의 예외",
            items: [
              '• (용언의 어간 말음) ㄺ+ㄱ ➔ [ㄹ] 로 발음!',
              '• 읽고 ➔ [일꼬], 맑게 ➔ [말께]'
            ],
            isWarning: true
          }
        }
      ]
    }
  },

  // Page 15: ⑮ [겹받침] ④ ㅎ이 있는 받침 (ㄶ, ㅀ)
  {
    pageNumber: 15,
    circledNumber: '⑮',
    title: '✏️ 해볼 한국어 [겹받침] ④ ㅎ이 있는 받침 (ㄶ, ㅀ)',
    dropdownTitle: '⑮ [겹받침] ④ ㅎ이 있는 받침 (ㄶ, ㅀ)',
    subTitle: 'ㅎ이 있는 받침 (ㄶ, ㅀ)',
    cards: [
      {
        baseSyllable: '마',
        baseRomaja: '[ma]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄴ', romaja: '[n]', isSilent: false, sound: '은' },
        secondBatchim: { char: 'ㅎ', romaja: '[t : 발음x/축약]', isSilent: true, sound: '' },
        batchim: 'ㄶ',
        batchimName: '니은히읗',
        batchimSound: '은',
        batchimRomaja: '[n]',
        syllable: '많',
        romaja: '[man]',
        pronunciationNote: '[만]',
        writeWords: ['많', '다']
      },
      {
        baseSyllable: '시',
        baseRomaja: '[si]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄹ', romaja: '[l]', isSilent: false, sound: '을' },
        secondBatchim: { char: 'ㅎ', romaja: '[t : 발음x/축약]', isSilent: true, sound: '' },
        batchim: 'ㅀ',
        batchimName: '리을히읗',
        batchimSound: '을',
        batchimRomaja: '[l]',
        syllable: '싫',
        romaja: '[sil]',
        pronunciationNote: '[실]',
        writeWords: ['싫', '다']
      },
      {
        baseSyllable: '이',
        baseRomaja: '[i]',
        isDoubleBatchim: true,
        firstBatchim: { char: 'ㄹ', romaja: '[l]', isSilent: false, sound: '을' },
        secondBatchim: { char: 'ㅎ', romaja: '[t : 발음x/축약]', isSilent: true, sound: '' },
        batchim: 'ㅀ',
        batchimName: '리을히읗',
        batchimSound: '을',
        batchimRomaja: '[l]',
        syllable: '잃',
        romaja: '[il]',
        pronunciationNote: '[일]',
        writeWords: ['잃', '다']
      }
    ],
    wordCard: {
      wordLabel: '많다',
      writeChar: '많',
      audioWord: '많다',
      illustrationType: 'many_candies',
      hideWordLabel: false,
      speechRules: [{ target: '', sound: '', customText: '[만타]' }]
    },
    rulePanel: {
      title: "받침 'ㅎ' 의 발음",
      sections: [
        {
          text: "1. 'ㅎ' 뒤에 'ㄱ, ㄷ, ㅈ'이 오면, [ㅋ, ㅌ, ㅊ]으로 발음해요.",
          bullets: [
            '• 많고 ➔ [만코] (ㅎ+ㄱ=ㅋ)',
            '• 많다 ➔ [만타] (ㅎ+ㄷ=ㅌ)',
            '• 싫지 ➔ [실치] (ㅎ+ㅈ=ㅊ)'
          ]
        },
        {
          noteBox: {
            title: "2. 'ㅎ' 뒤에 모음으로 시작된 어미나 접미사가 오면, 'ㅎ'은 발음하지 않아요!",
            items: ['• 많아 ➔ [마나]', '• 싫어 ➔ [시러]'],
            isWarning: false
          }
        }
      ]
    }
  }
];

export const BATCHIM_SHEET_ITEMS = BATCHIM_PAGES_DATA.map((p, idx) => ({
  id: idx,
  title: p.dropdownTitle
}));

// Backwards compatibility export for Page 1 cards
export const BATCHIM_PAGE_1_CARDS = BATCHIM_PAGES_DATA[0].cards;

// -------------------------------------------------------------
// Component: BatchimWorksheetPage
// -------------------------------------------------------------

export const BatchimWorksheetPage: React.FC<BatchimWorksheetPageProps> = ({
  pageIndex = 0,
  pageData: propPageData,
  interactiveAudio = true,
  className = ''
}) => {
  const pageData = propPageData || BATCHIM_PAGES_DATA[pageIndex] || BATCHIM_PAGES_DATA[0];

  const handleCharClick = (text: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(text, 0.85);
  };

  return (
    <div
      className={`print-sheet printable-word-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-700 p-2 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* 1. Header Row (표준 타이틀 & 학년/이름 영역) */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-korean-gothic min-w-0">
          <span className="text-base leading-none shrink-0">✏️</span>
          <span className="break-keep">{pageData.title.replace('✏️ ', '')}</span>
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex items-center gap-3 sm:gap-5 font-korean-gothic shrink-0">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 2. 4열 카드 그리드 ([기본글자] 3쪽 상하 결합형 레이아웃 적용) */}
      <div className="jamo-card-grid jamo-cols-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 print:grid-cols-4 gap-2 sm:gap-3 my-1 flex-1">
        {/* ==================== CARDS 1 ~ 3: 수식 카드 ==================== */}
        {pageData.cards.map((card, idx) => (
          <div
            key={`batchim-card-${pageData.pageNumber}-${idx}-${card.syllable}`}
            className="stroke-card jamo-stroke-card bg-white rounded-2xl sm:rounded-3xl border border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-2 sm:p-2.5 flex flex-col justify-between"
          >
            {/* 상단 공식 박스 */}
            <div className="jamo-card-top flex flex-col items-center justify-center py-1 sm:py-1.5 flex-1 min-h-[90px] sm:min-h-[105px]">
              {card.isAspirationFormulaCard ? (
                /* 15쪽 3열: 거센소리 되기 공식 카드 */
                <div className="flex flex-col items-center justify-center w-full px-1 my-auto">
                  <div className="bg-amber-50/90 border-2 border-amber-400 rounded-xl p-2 w-full flex flex-col items-center justify-center shadow-xs">
                    <div className="text-[10.5px] sm:text-[11.5px] font-black text-amber-950 mb-1.5 flex items-center gap-1 font-korean-gothic">
                      <span>⚡</span>
                      <span>거센소리 되기 공식</span>
                    </div>
                    <div className="flex items-center justify-center gap-1 text-xs sm:text-[13px] font-black text-slate-900 font-korean-gothic flex-wrap">
                      <span className="px-1.5 py-0.5 bg-blue-100 border border-blue-500 text-blue-700 rounded font-bold">[ㅎ]</span>
                      <span className="text-purple-600 font-bold">+</span>
                      <span className="px-1 py-0.5 bg-slate-100 border border-slate-400 text-slate-800 rounded text-[11px] font-bold">[ㄱ,ㄷ,ㅈ]</span>
                      <span className="text-rose-600 font-bold">➔</span>
                      <span className="px-1.5 py-0.5 bg-rose-100 border-2 border-rose-500 text-rose-700 rounded font-black text-xs sm:text-[13px]">[ㅋ,ㅌ,ㅊ]</span>
                    </div>
                  </div>
                  {card.pronunciationNote && (
                    <span className="text-[13px] sm:text-[14.5px] font-black text-rose-600 leading-tight mt-2 select-none font-sans tracking-tight whitespace-nowrap">
                      {card.pronunciationNote}
                    </span>
                  )}
                </div>
              ) : card.isDoubleBatchim ? (
                /* 겹받침 카드: 상단 [기본글자] + 하단 [자음1]+[자음2] = 우측 [완성글자] */
                <div className="flex items-center justify-center gap-1 sm:gap-2 w-full my-auto">
                  {/* 좌측 세로 결합: 상단 기본글자 + ➕ + 하단 2개 받침 카드 가로 나란히 */}
                  <div className="flex flex-col items-center justify-center">
                    {/* [기본글자] 상단 로마자 표기 */}
                    <span className="romaja-badge text-[9.5px] sm:text-[10px] font-black text-slate-600 leading-none mb-0.5 select-none font-sans tracking-tight">
                      {card.baseRomaja}
                    </span>

                    {/* [기본글자]: 검은색 테두리, 검은색 굵은 텍스트 */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border-2 border-slate-800 flex items-center justify-center font-korean-gothic ${
                        interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
                      }`}
                      onClick={() => handleCharClick(card.baseSyllable)}
                      title={interactiveAudio ? `소리 듣기: ${card.baseSyllable}` : undefined}
                    >
                      <span
                        className="font-black leading-none text-slate-900"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                          fontSize: 'clamp(1.35rem, 1.8vw, 1.6rem)'
                        }}
                      >
                        {card.baseSyllable}
                      </span>
                    </div>

                    <span className="text-purple-600 font-black text-[11px] leading-none select-none my-0.5">
                      ➕
                    </span>

                    {/* 하단 2개 받침 카드 가로 나란히: [발음되는 자음] + [발음 안 되는 자음] */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      {/* firstBatchim */}
                      {card.firstBatchim && (
                        <div className="flex flex-col items-center justify-center">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-korean-gothic border-2 ${
                              card.firstBatchim.isSilent
                                ? 'bg-[#eff6ff] border-[#3B82F6] text-[#3B82F6]'
                                : 'bg-[#fff1f2] border-[#E11D48] text-[#E11D48]'
                            } ${
                              interactiveAudio && !card.firstBatchim.isSilent
                                ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform'
                                : ''
                            }`}
                            onClick={() => {
                              if (!card.firstBatchim!.isSilent && (card.firstBatchim!.sound || card.firstBatchim!.char)) {
                                handleCharClick(card.firstBatchim!.sound || card.firstBatchim!.char);
                              }
                            }}
                            title={interactiveAudio && !card.firstBatchim.isSilent ? `소리 듣기: ${card.firstBatchim.char}` : undefined}
                          >
                            <span
                              className="font-black leading-none"
                              style={{
                                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                                fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)'
                              }}
                            >
                              {card.firstBatchim.char}
                            </span>
                          </div>
                          <span
                            className={`romaja-badge text-[9.5px] sm:text-[10px] font-black leading-none mt-0.5 select-none font-sans tracking-tight whitespace-nowrap ${
                              card.firstBatchim.isSilent ? 'text-[#2563eb]' : 'text-[#e11d48]'
                            }`}
                          >
                            {card.firstBatchim.romaja}
                          </span>
                        </div>
                      )}

                      {/* secondBatchim */}
                      {card.secondBatchim && (
                        <div className="flex flex-col items-center justify-center">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-korean-gothic border-2 ${
                              card.secondBatchim.isSilent
                                ? 'bg-[#eff6ff] border-[#3B82F6] text-[#3B82F6]'
                                : 'bg-[#fff1f2] border-[#E11D48] text-[#E11D48]'
                            } ${
                              interactiveAudio && !card.secondBatchim.isSilent
                                ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform'
                                : ''
                            }`}
                            onClick={() => {
                              if (!card.secondBatchim!.isSilent && (card.secondBatchim!.sound || card.secondBatchim!.char)) {
                                handleCharClick(card.secondBatchim!.sound || card.secondBatchim!.char);
                              }
                            }}
                            title={interactiveAudio && !card.secondBatchim.isSilent ? `소리 듣기: ${card.secondBatchim.char}` : undefined}
                          >
                            <span
                              className="font-black leading-none"
                              style={{
                                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                                fontSize: 'clamp(1.15rem, 1.5vw, 1.35rem)'
                              }}
                            >
                              {card.secondBatchim.char}
                            </span>
                          </div>
                          <span
                            className={`romaja-badge text-[9.5px] sm:text-[10px] font-black leading-none mt-0.5 select-none font-sans tracking-tight whitespace-nowrap ${
                              card.secondBatchim.isSilent ? 'text-[#2563eb]' : 'text-[#e11d48]'
                            }`}
                          >
                            {card.secondBatchim.romaja}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-purple-600 font-black text-base sm:text-lg select-none">
                    🟰
                  </span>

                  {/* 완성 글자: 검은색 굵은 테두리, 검은색 대형 텍스트 */}
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-slate-800 flex items-center justify-center font-korean-gothic shadow-2xs ${
                        interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
                      }`}
                      onClick={() => handleCharClick(card.syllable)}
                      title={interactiveAudio ? `소리 듣기: ${card.syllable}` : undefined}
                    >
                      <span
                        className="font-black leading-none text-slate-900"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                          fontSize: card.syllable.length > 2 ? 'clamp(1.2rem, 1.8vw, 1.5rem)' : 'clamp(2rem, 3.1vw, 2.6rem)'
                        }}
                      >
                        {card.syllable}
                      </span>
                    </div>
                    {/* 하단 완성 로마자 */}
                    <span className="romaja-badge text-[9.5px] sm:text-[10.5px] font-black text-slate-700 leading-none mt-1 select-none font-sans tracking-tight">
                      {card.romaja}
                    </span>
                    {/* 하단 붉은색 대괄호 [표준 발음] */}
                    {card.pronunciationNote && (
                      <span className="text-[13px] sm:text-[14.5px] font-black text-[#E11D48] leading-tight mt-0.5 select-none font-sans tracking-tight whitespace-nowrap">
                        {card.pronunciationNote}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                /* 기존 홑받침/쌍받침 단일 세로 결합: 음절(위) + 받침(아래) */
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full my-auto">
                  <div className="flex flex-col items-center justify-center">
                    <span className="romaja-badge text-[9.5px] sm:text-[10.5px] font-black text-[#dc2626] leading-none mb-0.5 select-none font-sans tracking-tight">
                      {card.baseRomaja}
                    </span>
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center font-korean-gothic ${
                        interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
                      }`}
                      onClick={() => handleCharClick(card.baseSyllable)}
                      title={interactiveAudio ? `소리 듣기: ${card.baseSyllable}` : undefined}
                    >
                      <span
                        className="font-black leading-none"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                          color: '#dc2626',
                          fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)'
                        }}
                      >
                        {card.baseSyllable}
                      </span>
                    </div>

                    <span className="text-purple-600 font-black text-xs leading-none select-none my-0.5">
                      ➕
                    </span>

                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center font-korean-gothic ${
                        interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
                      }`}
                      onClick={() => handleCharClick(card.batchimSound || '음')}
                      title={interactiveAudio ? `소리 듣기: 받침 ${card.batchim} (${card.batchimSound || '음'})` : undefined}
                    >
                      <span
                        className="font-black leading-none"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                          color: '#0077c8',
                          fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)'
                        }}
                      >
                        {card.batchim}
                      </span>
                    </div>

                    <span className="romaja-badge text-[9.5px] sm:text-[10.5px] font-black text-[#1e3a8a] leading-none mt-0.5 select-none font-sans tracking-tight">
                      {card.batchimRomaja}
                    </span>
                  </div>

                  <span className="text-purple-600 font-black text-base sm:text-lg select-none">
                    🟰
                  </span>

                  <div className="flex flex-col items-center justify-center">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#fffbeb] border-2 border-slate-700 flex items-center justify-center font-korean-gothic shadow-2xs ${
                        interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
                      }`}
                      onClick={() => handleCharClick(card.syllable)}
                      title={interactiveAudio ? `소리 듣기: ${card.syllable}` : undefined}
                    >
                      <span
                        className="font-black leading-none"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                          color: '#0f172a',
                          fontSize: 'clamp(2.1rem, 3.2vw, 2.7rem)'
                        }}
                      >
                        {card.syllable}
                      </span>
                    </div>
                    <span className="romaja-badge text-[10px] sm:text-[11px] font-black text-[#1e3a8a] leading-none mt-1 select-none font-sans tracking-tight">
                      {card.romaja}
                    </span>
                    {card.pronunciationNote && (
                      <span className="text-[14px] sm:text-[15.5px] font-black text-rose-600 leading-tight mt-1 select-none font-sans tracking-tight whitespace-nowrap">
                        {card.pronunciationNote}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 하단 3개 행: 1행 회색 따라쓰기 2칸 (writeWords 대응) + 2,3행 빈 십자선 칸 (총 6칸) */}
            <div className="jamo-rows-container space-y-1 sm:space-y-1.5 mt-auto w-full">
              {/* 1행: 회색 따라쓰기 2칸 */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                {(card.writeWords && card.writeWords.length >= 2 ? card.writeWords.slice(0, 2) : [card.syllable, card.syllable]).map((char, cIdx) => (
                  <div
                    key={`batchim-trace-${pageData.pageNumber}-${idx}-${cIdx}`}
                    className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r last:border-r-0 border-dashed border-slate-400 overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                    <span
                      className="relative z-10 leading-none select-none font-normal font-kyobo flex items-center justify-center cursor-pointer"
                      style={{
                        fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important",
                        fontWeight: 400,
                        fontSize: 'clamp(3.8rem, 6.2vw, 4.8rem)',
                        color: '#94a3b8'
                      }}
                      onClick={() => handleCharClick(char)}
                      title={interactiveAudio ? `소리 듣기: ${char}` : undefined}
                    >
                      {char}
                    </span>
                  </div>
                ))}
              </div>

              {/* 2행: 스스로 쓰기 빈 점선 십자선 2칸 */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                <div className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r border-dashed border-slate-400">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
                <div className="jamo-practice-cell relative aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
              </div>

              {/* 3행: 스스로 쓰기 빈 점선 십자선 2칸 */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                <div className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r border-dashed border-slate-400">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
                <div className="jamo-practice-cell relative aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ==================== CARD 4: 단어 카드 또는 핵심 규칙 패널 (해볼쌤 팁 A안) ==================== */}
        {pageData.rulePanel ? (
          <div className="stroke-card jamo-stroke-card bg-white rounded-2xl sm:rounded-3xl border border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-2 sm:p-2.5 flex flex-col justify-between text-slate-800">
            {/* 상단: 11쪽 그림체, 글씨체, 위치를 참조한 일러스트 + 한글단어 */}
            {pageData.wordCard && (
              <div
                className={`jamo-card-top flex flex-col items-center justify-center py-1 sm:py-2 flex-1 min-h-[90px] sm:min-h-[105px] ${
                  interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
                }`}
                onClick={() => handleCharClick(pageData.wordCard.audioWord)}
                title={interactiveAudio ? `단어 듣기: ${pageData.wordCard.wordLabel}` : undefined}
              >
                <div className="flex items-center justify-center max-h-[84px] sm:max-h-[96px] w-full">
                  {renderBatchimIllustration(pageData.wordCard.illustrationType, pageData.wordCard.speechRules, pageData.wordCard.ruleFormat)}
                </div>
                {!pageData.wordCard.hideWordLabel && (
                  <span
                    className="font-black text-slate-900 text-xs sm:text-sm font-korean-gothic mt-0.5 tracking-wide"
                    style={{ fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important" }}
                  >
                    {pageData.wordCard.wordLabel}
                  </span>
                )}
              </div>
            )}

            {/* 하단: 해볼쌤 팁 (제목과 내용 전부 하단 정렬, 내용부분 폰트만 1.3배) */}
            <div className="mt-auto w-full pt-1.5 border-t border-slate-200">
              <div className="flex items-center gap-1.5 pb-1 mb-1 border-b border-slate-200 text-slate-900 shrink-0">
                <ManduMascot size="xs" interactive={false} />
                <span className="font-black text-xs sm:text-[13px] text-slate-950 tracking-tight font-korean-gothic">
                  해볼쌤 팁 | {pageData.rulePanel.title.replace(/^💡\s*/, '')}
                </span>
              </div>

              {/* 패널 본문 섹션들: 폰트만 1.3배 확대 (내용부분 1.3배), 들여쓰기 취소, 깔끔한 글머리기호 */}
              <div className="w-full space-y-1.5 flex flex-col justify-start px-0.5">
                {pageData.rulePanel.sections.map((sec, sIdx) => (
                  <div key={`rule-sec-${sIdx}`} className="space-y-0.5">
                    {sec.text && (
                      <p className="text-[13.5px] sm:text-[15px] font-bold text-slate-800 leading-snug font-korean-gothic">
                        {sec.text}
                      </p>
                    )}

                    {sec.bullets && sec.bullets.length > 0 && (
                      <div className="space-y-0.5 py-0.5">
                        {sec.bullets.map((b, bIdx) => (
                          <div
                            key={`bullet-${bIdx}`}
                            className="text-[13px] sm:text-[14.5px] font-bold text-slate-900 font-sans tracking-tight leading-normal"
                          >
                            {b}
                          </div>
                        ))}
                      </div>
                    )}

                    {sec.noteBox && (
                      <div className="space-y-0.5 pt-0.5 text-slate-800">
                        <div className="font-black text-[13.5px] sm:text-[15px] flex items-center gap-1 font-korean-gothic text-rose-700">
                          <span>{sec.noteBox.title}</span>
                        </div>
                        <div className="space-y-0.5 text-[13px] sm:text-[14px] font-semibold text-slate-700 leading-relaxed">
                          {sec.noteBox.items.map((item, iIdx) => (
                            <div key={`note-item-${iIdx}`}>{item}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {pageData.rulePanel.footerNote && (
                <div className="mt-1 pt-0.5 border-t border-slate-200 text-[11px] sm:text-[12px] font-semibold text-slate-500 font-sans shrink-0">
                  {pageData.rulePanel.footerNote}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="stroke-card jamo-stroke-card bg-white rounded-2xl sm:rounded-3xl border border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-2 sm:p-2.5 flex flex-col justify-between">
            {/* 상단: 일러스트 + 말풍선 + 단어 텍스트 또는 예외 규칙 배지 */}
            <div
              className={`jamo-card-top flex flex-col items-center justify-center py-1 sm:py-2 flex-1 min-h-[90px] sm:min-h-[105px] ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
              }`}
              onClick={() => handleCharClick(pageData.wordCard.audioWord)}
              title={interactiveAudio ? `단어 듣기: ${pageData.wordCard.wordLabel}` : undefined}
            >
              <div className="flex items-center justify-center max-h-[84px] sm:max-h-[96px] w-full">
                {renderBatchimIllustration(pageData.wordCard.illustrationType, pageData.wordCard.speechRules, pageData.wordCard.ruleFormat)}
              </div>
              {pageData.wordCard.hideWordLabel ? (
                pageData.wordCard.customBadgeContent || null
              ) : (
                <span
                  className="font-black text-slate-900 text-xs sm:text-sm font-korean-gothic mt-0.5 tracking-wide"
                  style={{ fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important" }}
                >
                  {pageData.wordCard.wordLabel}
                </span>
              )}
            </div>

            {/* 하단 3개 행: [기본글자] 9쪽 포맷 ➔ 1열 3행 정사각형 (1행 회색 따라쓰기, 2~3행 빈칸) */}
            <div className="jamo-rows-container space-y-1 sm:space-y-1.5 mt-auto w-full">
              <div className="jamo-single-col-table w-1/2 mx-auto space-y-1 sm:space-y-1.5">
                {/* 1행: 회색 따라쓰기 1칸 정사각형 */}
                <div className="jamo-practice-row w-full border border-dashed border-slate-400 bg-white">
                  <div className="jamo-practice-cell relative aspect-square w-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                    <span
                      className="relative z-10 leading-none select-none font-normal font-kyobo flex items-center justify-center cursor-pointer"
                      style={{
                        fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important",
                        fontWeight: 400,
                        fontSize: 'clamp(3.8rem, 6.2vw, 4.8rem)',
                        color: '#94a3b8'
                      }}
                      onClick={() => handleCharClick(pageData.wordCard.writeChar)}
                      title={interactiveAudio ? `소리 듣기: ${pageData.wordCard.writeChar}` : undefined}
                    >
                      {pageData.wordCard.writeChar}
                    </span>
                  </div>
                </div>

                {/* 2행: 빈 점선 십자선 1칸 정사각형 */}
                <div className="jamo-practice-row w-full border border-dashed border-slate-400 bg-white">
                  <div className="jamo-practice-cell relative aspect-square w-full flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                </div>

                {/* 3행: 빈 점선 십자선 1칸 정사각형 */}
                <div className="jamo-practice-row w-full border border-dashed border-slate-400 bg-white">
                  <div className="jamo-practice-cell relative aspect-square w-full flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Sheet Footer */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-badasseugi">
        <span className="font-medium">
          해볼 한국어(hbkorean.ai.studio) | 다문화·초등 한국어 맞춤형 학습 교구
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// [받침글자] ⑯ 한국어 받침 총정리표 (A4 가로 1장 요약 정리표 - 교사용 원판)
// ============================================================================
export interface BatchimSummaryCopy {
  sheetTitle: string;
  totalBadge: string;
  gradeLabel: string;
  nameLabel: string;
  sec1Title: string;
  sec1Sub: string;
  sec2Title: string;
  sec2Sub: string;
  legendFront: string;
  legendBack: string;
  legendH: string;
  badgeFront: string;
  badgeBack: string;
  badgeH: string;
  exceptionTitle: string;
  exceptionLines: string[];
  sec3Title: string;
  sec3Sub: string;
  rule1Title: string;
  rule1Sub: string;
  rule1Body: string;
  rule2Title: string;
  rule2Lines: string[];
  rule3Title: string;
  rule3Lines: string[];
  footerLeft: string;
  footerRight: string;
}

export const DEFAULT_BATCHIM_SUMMARY_COPY: BatchimSummaryCopy = {
  sheetTitle: '해볼 한국어 [한글 · 받침] ⑯ 한국어 받침 총정리표 | Korean Batchim Master Chart',
  totalBadge: '총 27개 받침 → 7개 대표 소리',
  gradeLabel: '학년',
  nameLabel: '이름',
  sec1Title: '7개 대표 받침 소리 · 받침 가족',
  sec1Sub: '7 Representative Final Sounds',
  sec2Title: '겹받침 11자 한눈에 보기',
  sec2Sub: '11 Double Batchims',
  legendFront: '앞 자음',
  legendBack: '뒤 자음',
  legendH: 'ㅎ 특별',
  badgeFront: '앞 자음',
  badgeBack: '뒤 자음',
  badgeH: 'ㅎ 특별',
  exceptionTitle: '※ 예외 주의',
  exceptionLines: ['밟다 [밥따]', '읽고 [일꼬]'],
  sec3Title: '받침 발음 핵심 규칙 3가지',
  sec3Sub: 'Rules Guide',
  rule1Title: '1. 대표 소리 7가지 규칙',
  rule1Sub: '(가느다란 물방울)',
  rule1Body: '모든 받침 27개도 어말·자음 앞에서는 ㄱ·ㄴ·ㄷ·ㄹ·ㅁ·ㅂ·ㅇ 7개 소리로만 나요. (밖[박], 앞[압], 밭[받])',
  rule2Title: '2. ㅎ 받침의 특별함 (거센소리 변신 · 탈락)',
  rule2Lines: [
    '• ㅎ + ㄱ/ㄷ/ㅈ → [ㅋ·ㅌ·ㅊ] 거센소리 변신 (많고[만코], 많다[만타], 싫지[실치])',
    '• ㅎ 뒤에 모음이 오면 소리가 사라져요 (많아[마나], 싫어[시러])',
  ],
  rule3Title: '3. 받침 ㅇ 소리 및 연음 규칙',
  rule3Lines: [
    '• 첫소리 ㅇ은 소리 없음[-], 받침 ㅇ은 콧소리[ng]로 구별해 읽어요.',
    '• 받침 뒤에 모음이 오면 받침이 뒤로 이어져 발음돼요 (음악[으막], 꽃이[꼬치])',
  ],
  footerLeft: '해볼 한국어(hbkorean.ai.studio) | 다문화·초등 한국어 맞춤형 학습 교구',
  footerRight: '카드 표기: 순번 · 대표 소리 · 로마자 · 받침 가족 · 겹받침 11자',
};

interface RepBatchimSummaryItem {
  num: string;
  repSound: string;
  romaja: string;
  familyChars: string[];
  examples: string;
  audioSample: string;
}

const SUMMARY_REP_BATCHIMS: RepBatchimSummaryItem[] = [
  {
    num: '01',
    repSound: '[ㄱ]',
    romaja: '[k]',
    familyChars: ['ㄱ', 'ㅋ', 'ㄲ'],
    examples: '목 · 부엌 · 밖',
    audioSample: '목',
  },
  {
    num: '02',
    repSound: '[ㄴ]',
    romaja: '[n]',
    familyChars: ['ㄴ'],
    examples: '손 · 눈 · 문',
    audioSample: '손',
  },
  {
    num: '03',
    repSound: '[ㄷ]',
    romaja: '[t]',
    familyChars: ['ㄷ', 'ㅌ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅎ'],
    examples: '숟 · 밭 · 옷 · 꽃',
    audioSample: '꽃',
  },
  {
    num: '04',
    repSound: '[ㄹ]',
    romaja: '[l]',
    familyChars: ['ㄹ'],
    examples: '달 · 불 · 물',
    audioSample: '물',
  },
  {
    num: '05',
    repSound: '[ㅁ]',
    romaja: '[m]',
    familyChars: ['ㅁ'],
    examples: '곰 · 남 · 밤',
    audioSample: '곰',
  },
  {
    num: '06',
    repSound: '[ㅂ]',
    romaja: '[p]',
    familyChars: ['ㅂ', 'ㅍ'],
    examples: '집 · 앞 · 숲',
    audioSample: '집',
  },
  {
    num: '07',
    repSound: '[ㅇ]',
    romaja: '[ng]',
    familyChars: ['ㅇ'],
    examples: '강 · 방 · 공',
    audioSample: '공',
  },
];

type DoubleBatchimRuleType = 'front' | 'back' | 'h_combo';

interface DoubleBatchimSummaryItem {
  char: string;
  soundLabel: string;
  exampleWord: string;
  examplePron: string;
  audioWord: string;
  ruleType: DoubleBatchimRuleType;
}

const SUMMARY_DOUBLE_BATCHIMS: DoubleBatchimSummaryItem[] = [
  { char: 'ㄳ', soundLabel: '[ㄱ]', exampleWord: '몫', examplePron: '[목]', audioWord: '몫', ruleType: 'front' },
  { char: 'ㄵ', soundLabel: '[ㄴ]', exampleWord: '앉다', examplePron: '[안따]', audioWord: '앉다', ruleType: 'front' },
  { char: 'ㄼ', soundLabel: '[ㄹ]', exampleWord: '여덟', examplePron: '[여덜]', audioWord: '여덟', ruleType: 'front' },
  { char: 'ㄽ', soundLabel: '[ㄹ]', exampleWord: '곬', examplePron: '[골]', audioWord: '곬', ruleType: 'front' },
  { char: 'ㄾ', soundLabel: '[ㄹ]', exampleWord: '핥다', examplePron: '[할따]', audioWord: '핥다', ruleType: 'front' },
  { char: 'ㅄ', soundLabel: '[ㅂ]', exampleWord: '없다', examplePron: '[업따]', audioWord: '없다', ruleType: 'front' },
  { char: 'ㄺ', soundLabel: '[ㄱ]', exampleWord: '닭', examplePron: '[닥]', audioWord: '닭', ruleType: 'back' },
  { char: 'ㄻ', soundLabel: '[ㅁ]', exampleWord: '삶', examplePron: '[삼]', audioWord: '삶', ruleType: 'back' },
  { char: 'ㄿ', soundLabel: '[ㅂ]', exampleWord: '읊다', examplePron: '[읍따]', audioWord: '읊다', ruleType: 'back' },
  { char: 'ㄶ', soundLabel: '[ㄴ]', exampleWord: '많다', examplePron: '[만타]', audioWord: '많다', ruleType: 'h_combo' },
  { char: 'ㅀ', soundLabel: '[ㄹ]', exampleWord: '싫다', examplePron: '[실타]', audioWord: '싫다', ruleType: 'h_combo' },
];

const DOUBLE_RULE_STYLES: Record<
  DoubleBatchimRuleType,
  { border: string; topBg: string; topText: string; hover: string }
> = {
  front: {
    border: 'border-sky-300',
    topBg: 'bg-sky-50/95 border-b border-sky-200',
    topText: 'text-sky-900',
    hover: 'hover:border-sky-500 hover:bg-sky-50/20',
  },
  back: {
    border: 'border-rose-300',
    topBg: 'bg-rose-50/95 border-b border-rose-200',
    topText: 'text-rose-900',
    hover: 'hover:border-rose-500 hover:bg-rose-50/20',
  },
  h_combo: {
    border: 'border-violet-300',
    topBg: 'bg-violet-50/95 border-b border-violet-200',
    topText: 'text-violet-900',
    hover: 'hover:border-violet-500 hover:bg-violet-50/20',
  },
};

export const BatchimSummaryWorksheetPage: React.FC<{
  interactiveAudio?: boolean;
  className?: string;
  copy?: BatchimSummaryCopy;
}> = ({ interactiveAudio = true, className = '', copy = DEFAULT_BATCHIM_SUMMARY_COPY }) => {
  const handleSpeak = (text: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(text, 0.85);
  };

  const getRuleBadgeLabel = (ruleType: DoubleBatchimRuleType) => {
    if (ruleType === 'front') return copy.badgeFront;
    if (ruleType === 'back') return copy.badgeBack;
    return copy.badgeH;
  };

  return (
    <div
      className={`print-sheet printable-word-sheet batchim-summary-sheet w-full max-w-[1060px] bg-white rounded-xl border-2 border-slate-700 p-2.5 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '660px' }}
    >
      {/* 1. Sheet Header */}
      <div className="flex flex-nowrap items-center justify-between gap-x-2.5 border-b-2 border-slate-700 pb-1.5 mb-2 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-[12px] sm:text-[13px] font-korean-gothic min-w-0 flex-1 overflow-x-hidden overflow-y-visible py-0.5">
          <span className="text-base leading-none shrink-0">🥟</span>
          <span
            className="font-bold whitespace-nowrap leading-normal"
            style={{
              fontFamily:
                "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans KR', system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: '0',
            }}
          >
            {copy.sheetTitle}
          </span>
        </div>
        <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-700 flex flex-nowrap items-center gap-x-2.5 font-korean-gothic whitespace-nowrap shrink-0 leading-normal">
          <span className="text-slate-500 font-bold whitespace-nowrap">{copy.totalBadge}</span>
          <span className="whitespace-nowrap">{copy.gradeLabel}: _____</span>
          <span className="whitespace-nowrap">{copy.nameLabel}: __________</span>
        </div>
      </div>

      {/* 2. Section 1: 7개 대표 받침 소리 (7열 × 1행) */}
      <div className="flex flex-col gap-2 flex-1 justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] font-black text-slate-900 font-korean-gothic">
              <span className="w-5 h-5 rounded-md bg-slate-800 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                1
              </span>
              <span>{copy.sec1Title}</span>
              <span className="text-[11px] font-bold text-slate-500">{copy.sec1Sub}</span>
            </div>
          </div>

          <div className="summary-batchim-rep-grid grid grid-cols-7 print:grid-cols-7 gap-1.5">
            {SUMMARY_REP_BATCHIMS.map((item) => (
              <div
                key={item.num}
                onClick={() => handleSpeak(item.audioSample)}
                className={`rounded-xl border-[1.5px] border-slate-300 bg-white flex flex-col justify-between overflow-hidden shadow-2xs transition-all min-w-0 ${
                  interactiveAudio ? 'cursor-pointer hover:border-slate-500 hover:bg-slate-50/40 hover:shadow-md active:scale-[0.98]' : ''
                }`}
                title={interactiveAudio ? `클릭하여 대표 낱말 듣기: ${item.audioSample}` : undefined}
              >
                {/* Top Number-Only Bar */}
                <div className="px-2 py-0.5 flex items-center justify-between bg-slate-100/90 border-b border-slate-200 shrink-0">
                  <span className="text-[10px] font-black text-slate-600 tabular-nums">{item.num}</span>
                </div>

                {/* Center Sound + Prominent Romanization + Family Consonants */}
                <div className="px-1.5 py-1.5 flex-1 flex flex-col items-center justify-center text-center">
                  <span
                    className="font-badasseugi font-black text-slate-950 leading-none select-none"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif",
                      fontWeight: 700,
                      fontSize: '2.05rem',
                      lineHeight: 1.05,
                    }}
                  >
                    {item.repSound}
                  </span>
                  <div className="mt-1">
                    <span className="romaja-badge font-sans text-[15px] font-black tracking-tight leading-none">
                      {item.romaja}
                    </span>
                  </div>

                  {/* Family Consonants */}
                  <div className="mt-1.5 flex flex-wrap items-center justify-center gap-0.5 min-h-[22px]">
                    {item.familyChars.map((fc) => (
                      <span
                        key={fc}
                        className="px-1 py-0.2 rounded bg-slate-100 border border-slate-300 text-[10px] font-black text-slate-900 font-korean-gothic leading-tight"
                      >
                        {fc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Example Words (No Truncation) */}
                <div className="px-1 py-1 bg-slate-50/90 border-t border-slate-200 text-center shrink-0">
                  <span className="text-[10px] font-bold text-slate-700 font-korean-gothic tracking-tight block leading-tight break-words">
                    {item.examples}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Section 2 & 3: 좌측 겹받침 11자 + 우측 받침 발음 핵심 규칙 */}
        <div className="summary-batchim-bottom-split grid grid-cols-[58fr_42fr] print:grid-cols-[58fr_42fr] gap-2.5 items-stretch pt-0.5 flex-1">
          {/* Left: 겹받침 11자 한눈에 보기 */}
          <div className="flex flex-col min-w-0">
            <div className="flex flex-nowrap items-center justify-between gap-x-2 mb-1.5 leading-normal">
              <div className="flex flex-nowrap items-center gap-1.5 text-[11.5px] sm:text-[12.5px] font-black text-slate-900 font-korean-gothic min-w-0">
                <span className="w-5 h-5 rounded-md bg-sky-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="whitespace-nowrap">{copy.sec2Title}</span>
                <span className="text-[10.5px] font-bold text-slate-500 whitespace-nowrap">{copy.sec2Sub}</span>
              </div>
              <div className="flex flex-nowrap items-center gap-x-1.5 text-[9.5px] font-bold text-slate-600 font-korean-gothic whitespace-nowrap shrink-0">
                <span className="text-sky-800">{copy.legendFront}</span>
                <span className="text-slate-300">·</span>
                <span className="text-rose-800">{copy.legendBack}</span>
                <span className="text-slate-300">·</span>
                <span className="text-violet-800">{copy.legendH}</span>
              </div>
            </div>

            <div className="summary-batchim-double-grid grid grid-cols-6 print:grid-cols-6 gap-1.5 flex-1">
              {SUMMARY_DOUBLE_BATCHIMS.map((item) => {
                const st = DOUBLE_RULE_STYLES[item.ruleType];
                return (
                  <div
                    key={item.char}
                    onClick={() => handleSpeak(item.audioWord)}
                    className={`rounded-xl border-[1.5px] ${st.border} bg-white flex flex-col justify-between overflow-hidden shadow-2xs transition-all min-w-0 ${
                      interactiveAudio ? `cursor-pointer ${st.hover} hover:shadow-md active:scale-[0.98]` : ''
                    }`}
                    title={interactiveAudio ? `클릭하여 소리 듣기: ${item.exampleWord}` : undefined}
                  >
                    <div className={`px-1 py-0.5 flex items-center justify-center ${st.topBg} shrink-0 min-h-[20px]`}>
                      <span className={`text-[8.8px] font-black ${st.topText} leading-normal text-center whitespace-nowrap`}>
                        {getRuleBadgeLabel(item.ruleType)}
                      </span>
                    </div>

                    <div className="px-1 py-1 flex-1 flex flex-col items-center justify-center text-center">
                      <span
                        className="font-badasseugi font-black text-slate-950 leading-none select-none"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif",
                          fontWeight: 700,
                          fontSize: '1.85rem',
                          lineHeight: 1.02,
                        }}
                      >
                        {item.char}
                      </span>
                      <span className="mt-0.5 text-[10.5px] font-black text-indigo-700 leading-tight font-korean-gothic">
                        ➔ {item.soundLabel}
                      </span>
                    </div>

                    <div className="px-1 py-1 bg-slate-50/90 border-t border-slate-200 text-center shrink-0">
                      <span className="text-[9.5px] font-bold text-slate-800 font-korean-gothic flex flex-wrap items-center justify-center gap-x-0.5 leading-tight">
                        <span>{item.exampleWord}</span>
                        <span className="text-rose-600 font-black">{item.examplePron}</span>
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* 12th slot: Exception Warning Card */}
              <div className="rounded-xl border-[1.5px] border-dashed border-amber-400 bg-amber-50/80 p-1.5 flex flex-col items-center justify-center text-center font-korean-gothic min-w-0">
                <span className="text-[9.5px] font-black text-amber-900 mb-0.5 leading-tight break-words w-full">
                  {copy.exceptionTitle}
                </span>
                <span className="text-[9px] font-bold text-slate-800 leading-snug break-words w-full">
                  {copy.exceptionLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < copy.exceptionLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Right: 받침 발음 핵심 규칙 3가지 */}
          <div className="flex flex-col min-w-0">
            <div className="flex flex-nowrap items-center gap-1.5 text-[11.5px] sm:text-[12.5px] font-black text-slate-900 font-korean-gothic mb-1.5 leading-normal">
              <span className="w-5 h-5 rounded-md bg-indigo-700 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                3
              </span>
              <span className="whitespace-nowrap">{copy.sec3Title}</span>
              <span className="text-[10.5px] font-bold text-slate-500 whitespace-nowrap">{copy.sec3Sub}</span>
            </div>

            <div className="flex-1 rounded-xl border-[1.5px] border-slate-300 bg-[#F8FAFC] p-2.5 flex flex-col justify-between gap-1.5 font-korean-gothic min-w-0">
              {/* Rule 1 */}
              <div className="space-y-0.5 min-w-0">
                <div className="text-[10.5px] font-black text-slate-900 break-words leading-snug">
                  {copy.rule1Title} <span className="text-amber-700">{copy.rule1Sub}</span>
                </div>
                <div className="text-[9.5px] font-bold text-slate-700 leading-snug break-words">
                  {copy.rule1Body}
                </div>
              </div>

              {/* Rule 2 */}
              <div className="border-t border-slate-200 pt-1.5 space-y-0.5 min-w-0">
                <div className="text-[10.5px] font-black text-violet-900 break-words leading-snug">
                  {copy.rule2Title}
                </div>
                <div className="text-[9.5px] font-bold text-slate-700 leading-snug space-y-0.5 break-words">
                  {copy.rule2Lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>

              {/* Rule 3 */}
              <div className="border-t border-slate-200 pt-1.5 space-y-0.5 min-w-0">
                <div className="text-[10.5px] font-black text-emerald-900 break-words leading-snug">
                  {copy.rule3Title}
                </div>
                <div className="text-[9.5px] font-bold text-slate-700 leading-snug space-y-0.5 break-words">
                  {copy.rule3Lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sheet Footer */}
      <div className="mt-1.5 pt-1 border-t border-slate-300 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium break-words">{copy.footerLeft}</span>
        <span className="font-bold text-slate-400 break-words">{copy.footerRight}</span>
      </div>
    </div>
  );
};
