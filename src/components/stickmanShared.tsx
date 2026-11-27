import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { Maximize2, Minimize2, Play, Square } from 'lucide-react';
import { speakKorean as speakAppKorean } from '../utils/audio';
import { UiLanguage, MENU_EXTRAS_UI } from '../i18n/uiTranslations';

export type StickmanLang = 'en' | 'vi' | 'zh' | 'ja' | 'ru' | 'mn' | 'bn';

export interface StickmanSimProps {
  /** 초기 음향/음성 활성화 여부 (기본값: true) */
  defaultAudioEnabled?: boolean;
  /** 결과 카드 부제 언어 (기본값: 'en') */
  lang?: StickmanLang;
  /** 추가 컨테이너 클래스 */
  className?: string;
  /** 유튜브 클린 촬영용: 상단 조작 바 숨김 */
  hideControlBar?: boolean;
  /** true로 전환 시 자동으로 전체감상 시작, false로 전환 시 걷기 상태로 복귀 */
  autoStartAllPlay?: boolean;
}

export type BackdropThemeKey =
  | 'default'
  | 'sunset'
  | 'farm'
  | 'nightmarket'
  | 'city'
  | 'jungle'
  | 'beach'
  | 'space'
  | 'railway'
  | 'thunderstorm'
  | 'savannah'
  | 'disco'
  | 'livingroom'
  | 'nightcity'
  | 'spookyhouse'
  | 'pond'
  | 'town'
  | 'meadow';

export type SimPhase = 'walking' | 'approaching' | 'action' | 'aftermath' | 'reveal';

export type VowelFaceExtension =
  | 'parentTeary'
  | 'headClutch'
  | 'greenPoison'
  | 'inked'
  | 'fainted'
  | 'crying';

export type JollamanFaceMode =
  | 'happy'
  | 'panic'
  | 'dizzy'
  | 'burnt'
  | 'squashed'
  | 'swollenRed'
  | 'jellyMelt'
  | VowelFaceExtension;

export const LEFT_EDGE_X = 95;
export const RIGHT_EDGE_X = 875;
export const ACTION_SPOT_X = 290;
export const GROUND_Y = 368;

// ============================================================================
// SHARED JOLLAMAN CHARACTER SVG (EPISODE 1 + EPISODE 2+ EXTENSIONS)
// ============================================================================

export const JollamanCharacterSvg: React.FC<{
  faceMode: JollamanFaceMode;
  isWalking: boolean;
  legSwing: number;
  armSwing: number;
  showHeadBump?: boolean;
  showXraySkeleton?: boolean;
  showDizzyStars?: boolean;
  stomachHole?: boolean;
  muddy?: boolean;
  kneeling?: boolean;
  kneelStyle?: 'despair' | 'propose';
  sitting?: boolean;
  flyingKick?: boolean;
  slapMark?: boolean;
  blushCheeks?: boolean;
  capColor?: string;
  scarfColor?: string;
  walkTime: number;
  activeChar?: string;
}> = ({
  faceMode,
  isWalking,
  legSwing,
  armSwing,
  showHeadBump = false,
  showXraySkeleton = false,
  showDizzyStars = false,
  stomachHole = false,
  muddy = false,
  kneeling = false,
  kneelStyle = 'despair',
  sitting = false,
  flyingKick = false,
  slapMark = false,
  blushCheeks = false,
  capColor,
  scarfColor,
  walkTime,
  activeChar = '',
}) => {
  if (faceMode === 'jellyMelt') {
    const wobble = Math.sin(walkTime * 22) * 5;
    return (
      <g>
        <ellipse cx="0" cy="48" rx={42 + wobble * 0.6} ry="10" fill="#E2E8F0" stroke="#0F172A" strokeWidth="3.5" />
        <path
          d={`M${-16 + wobble * 0.4} 46 Q${-12 - wobble * 0.5} 10 ${-10 + wobble} -12 Q0 -18 ${10 + wobble} -12 Q${14 - wobble * 0.5} 12 ${18 + wobble * 0.4} 46 Z`}
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="3.5"
        />
        <ellipse cx={wobble * 0.7} cy="-24" rx={18 - wobble * 0.3} ry={14 + wobble * 0.2} fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        <ellipse cx={-6 + wobble * 0.7} cy="-27" rx="3.2" ry="4.5" fill="#0F172A" />
        <ellipse cx={5 + wobble * 0.7} cy="-27" rx="3.2" ry="4.5" fill="#0F172A" />
        <path
          d={`M${-6 + wobble * 0.7} -17 Q${wobble * 0.7} -22 ${6 + wobble * 0.7} -17`}
          fill="none"
          stroke="#0F172A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    );
  }

  const isHeadClutch = faceMode === 'headClutch';
  const isInked = faceMode === 'inked';
  const isGreenPoison = faceMode === 'greenPoison';
  const isFainted = faceMode === 'fainted';

  const limbColor =
    faceMode === 'burnt' ? (showXraySkeleton ? '#FFFFFF' : '#0F172A') : isGreenPoison ? '#365314' : '#0F172A';

  const headFill =
    faceMode === 'burnt'
      ? showXraySkeleton
        ? '#FFFFFF'
        : '#1E293B'
      : faceMode === 'swollenRed'
      ? '#F87171'
      : isGreenPoison
      ? '#BEF264'
      : isInked
      ? '#0F172A'
      : isFainted
      ? '#E2E8F0'
      : '#FFFFFF';

  const headStroke =
    faceMode === 'swollenRed'
      ? '#DC2626'
      : isGreenPoison
      ? '#3F6212'
      : '#0F172A';

  const legL = isWalking ? legSwing : -14;
  const legR = isWalking ? -legSwing : 14;
  const armL = isWalking ? armSwing : -23;
  const armR = isWalking ? -armSwing : 23;

  const isProposeKneel = kneeling && kneelStyle === 'propose';
  const isDespairKneel = kneeling && kneelStyle !== 'propose';

  const tearOffset = (walkTime * 28) % 14;
  const sobShake = isDespairKneel ? Math.sin(walkTime * 15) * 1.4 : 0;
  const headGroupTransform = isDespairKneel
    ? `translate(21, ${24 + sobShake}) rotate(24, 0, -35)`
    : isProposeKneel
    ? 'translate(0, 6)'
    : flyingKick
    ? 'translate(-15, 6) rotate(-14, 0, -35)'
    : undefined;

  return (
    <g>
      {faceMode === 'burnt' && (
        <g opacity="0.78">
          <circle cx={-9 + Math.sin(walkTime * 6) * 4} cy={-60 - ((walkTime * 18) % 16)} r="5.5" fill="#94A3B8" />
          <circle cx={9 - Math.sin(walkTime * 5) * 4} cy={-66 - ((walkTime * 15 + 6) % 18)} r="4.5" fill="#CBD5E1" />
        </g>
      )}

      {isGreenPoison && (
        <g opacity="0.78">
          <circle cx={-12 + Math.sin(walkTime * 4) * 5} cy={-62 - ((walkTime * 14) % 14)} r="5" fill="#84CC16" />
          <circle cx={14 - Math.cos(walkTime * 4) * 5} cy={-56 - ((walkTime * 11 + 5) % 14)} r="4" fill="#A3E635" />
        </g>
      )}

      {/* Flying kick speed lines */}
      {flyingKick && (
        <g opacity="0.88" strokeLinecap="round">
          <line x1="-58" y1="-22" x2="-30" y2="-16" stroke="#38BDF8" strokeWidth="3.2" />
          <line x1="-66" y1="-4" x2="-34" y2="-2" stroke="#FACC15" strokeWidth="3.5" />
          <line x1="-56" y1="16" x2="-28" y2="14" stroke="#38BDF8" strokeWidth="3" />
        </g>
      )}

      {/* Legs (flyingKick, propose kneel, detailed despair kneel, sitting, or normal) */}
      {flyingKick ? (
        <g>
          {/* Tucked back knee */}
          <path
            d="M0 12 L-16 27 L-30 19"
            fill="none"
            stroke={limbColor}
            strokeWidth="5.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse
            cx="-32"
            cy="19"
            rx="7.5"
            ry="4.5"
            transform="rotate(24, -32, 19)"
            fill="#EF4444"
            stroke="#0F172A"
            strokeWidth="2.2"
          />
          {/* Extended flying kick leg */}
          <line x1="2" y1="11" x2="46" y2="1" stroke={limbColor} strokeWidth="5.6" strokeLinecap="round" />
          <ellipse
            cx="50"
            cy="0"
            rx="10"
            ry="5.5"
            transform="rotate(-12, 50, 0)"
            fill="#EF4444"
            stroke="#0F172A"
            strokeWidth="2.4"
          />
          {/* Kick power shock arcs */}
          <path d="M58 -12 Q68 0 58 12" fill="none" stroke="#FACC15" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M64 -18 Q77 0 64 18" fill="none" stroke="#FB923C" strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
        </g>
      ) : isProposeKneel ? (
        <g>
          <ellipse cx="-2" cy="50" rx="30" ry="5" fill="#0F172A" opacity="0.2" />
          {/* Back knee resting on ground */}
          <path
            d="M-3 18 L-9 45 L-31 45"
            fill="none"
            stroke={limbColor}
            strokeWidth="5.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse
            cx="-34"
            cy="43"
            rx="7.5"
            ry="4.3"
            transform="rotate(-28, -34, 43)"
            fill="#DC2626"
            stroke="#0F172A"
            strokeWidth="2.1"
          />
          {/* Front knee bent 90 degrees upright */}
          <path
            d="M1 18 L18 22 L17 46"
            fill="none"
            stroke={limbColor}
            strokeWidth="5.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse
            cx="22"
            cy="47"
            rx="8"
            ry="4.5"
            fill="#EF4444"
            stroke="#0F172A"
            strokeWidth="2.2"
          />
        </g>
      ) : isDespairKneel ? (
        <g>
          {/* Kneeling ground contact shadow & tear puddle */}
          <ellipse cx="-2" cy="50" rx="38" ry="5.5" fill="#0F172A" opacity="0.22" />
          {faceMode === 'crying' && (
            <ellipse
              cx="24"
              cy="49"
              rx={11 + Math.sin(walkTime * 6) * 2}
              ry="3"
              fill="#38BDF8"
              opacity="0.65"
            />
          )}
          {/* Far/left knee tucked on ground */}
          <path
            d="M-15 24 L-11 45 L-35 44"
            fill="none"
            stroke={limbColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse
            cx="-38"
            cy="42"
            rx="7.5"
            ry="4.3"
            transform="rotate(-32, -38, 42)"
            fill="#DC2626"
            stroke="#0F172A"
            strokeWidth="2.1"
          />
          {/* Near/right knee firmly planted on ground */}
          <path
            d="M-11 26 L-2 46 L-27 46"
            fill="none"
            stroke={limbColor}
            strokeWidth="5.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse
            cx="-30"
            cy="44"
            rx="7.8"
            ry="4.5"
            transform="rotate(-26, -30, 44)"
            fill="#EF4444"
            stroke="#0F172A"
            strokeWidth="2.2"
          />
        </g>
      ) : sitting ? (
        <g>
          <path d="M-3 14 L14 17 L16 42" fill="none" stroke={limbColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="21" cy="44" rx="7.5" ry="4.2" fill="#EF4444" stroke="#0F172A" strokeWidth="2.1" />
          <path d="M3 14 L20 17 L22 42" fill="none" stroke={limbColor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="27" cy="44" rx="7.5" ry="4.2" fill="#EF4444" stroke="#0F172A" strokeWidth="2.1" />
        </g>
      ) : (
        <g>
          <line x1="-2" y1="14" x2={legL} y2="46" stroke={limbColor} strokeWidth="5.2" strokeLinecap="round" />
          <ellipse
            cx={legL + 4}
            cy="48"
            rx="8"
            ry="4.5"
            fill="#EF4444"
            stroke="#0F172A"
            strokeWidth="2.2"
          />

          <line x1="2" y1="14" x2={legR} y2="46" stroke={limbColor} strokeWidth="5.2" strokeLinecap="round" />
          <ellipse
            cx={legR + 4}
            cy="48"
            rx="8"
            ry="4.5"
            fill="#EF4444"
            stroke="#0F172A"
            strokeWidth="2.2"
          />
        </g>
      )}

      {/* Torso (flyingKick, propose kneel, slumped despair kneel, stomachHole, or normal) */}
      {flyingKick ? (
        <line x1="-13" y1="-13" x2="2" y2="12" stroke={limbColor} strokeWidth="6.5" strokeLinecap="round" />
      ) : isProposeKneel ? (
        <line x1="-1" y1="-13" x2="-1" y2="18" stroke={limbColor} strokeWidth="6.5" strokeLinecap="round" />
      ) : isDespairKneel ? (
        <path
          d={`M-13 25 Q-4 ${5 + sobShake * 0.4} 11 ${-1 + sobShake * 0.6}`}
          fill="none"
          stroke={limbColor}
          strokeWidth="6.4"
          strokeLinecap="round"
        />
      ) : stomachHole ? (
        <g>
          <line x1="0" y1="-19" x2="0" y2="-8" stroke={limbColor} strokeWidth="6.5" strokeLinecap="round" />
          <line x1="0" y1="6" x2="0" y2="15" stroke={limbColor} strokeWidth="6.5" strokeLinecap="round" />
          {/* Blasted cartoon stomach hole */}
          <ellipse cx="0" cy="-1" rx="11" ry="10" fill="#FEF3C7" fillOpacity="0.9" stroke="#F97316" strokeWidth="3.2" strokeDasharray="4 2" />
          <circle cx="0" cy="-1" r="6.5" fill="#0F172A" fillOpacity="0.16" stroke="#0F172A" strokeWidth="2.2" />
          {/* Trailing smoke wisps */}
          <circle cx={-6 - ((walkTime * 22) % 12)} cy={-4 - Math.sin(walkTime * 8) * 3} r="3.5" fill="#94A3B8" opacity="0.7" />
          <circle cx={6 + ((walkTime * 20) % 12)} cy={-5 + Math.cos(walkTime * 7) * 3} r="3" fill="#CBD5E1" opacity="0.65" />
        </g>
      ) : (
        <line x1="0" y1="-19" x2="0" y2="15" stroke={limbColor} strokeWidth="6.5" strokeLinecap="round" />
      )}

      {showXraySkeleton && (
        <g stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round">
          <line x1="-8" y1="-12" x2="8" y2="-12" />
          <line x1="-9" y1="-5" x2="9" y2="-5" />
          <line x1="-7" y1="2" x2="7" y2="2" />
        </g>
      )}

      {/* Arms (flyingKick, propose kneel offering ring, despair kneel OTL, sitting, headClutch, or normal) */}
      {flyingKick ? (
        <g>
          <path d="M-11 -9 L-33 -2" fill="none" stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle cx="-34" cy="-2" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d="M-9 -9 L8 -21 L22 -14" fill="none" stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="23" cy="-14" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </g>
      ) : isProposeKneel ? (
        <g>
          {/* Both arms extended gracefully offering the ring box */}
          <path d="M0 -7 L14 -10 L25 -12" fill="none" stroke={limbColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="26" cy="-12" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d="M0 -4 L15 -4 L26 -6" fill="none" stroke={limbColor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="27" cy="-6" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </g>
      ) : isDespairKneel ? (
        <g>
          {/* Back arm bracing palm on floor */}
          <path
            d={`M8 ${1 + sobShake * 0.5} L13 24 L20 46`}
            fill="none"
            stroke={limbColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="21" cy="46" rx="5.2" ry="3.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          {/* Front arm clenched fist trembling on floor */}
          <path
            d={`M12 ${1 + sobShake * 0.6} L21 23 L31 46`}
            fill="none"
            stroke={limbColor}
            strokeWidth="4.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="32" cy="46" rx="5.4" ry="3.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          {/* Falling teardrops dripping down to ground */}
          {faceMode === 'crying' && (
            <g fill="#38BDF8">
              <ellipse cx="22" cy={4 + ((walkTime * 44) % 38)} rx="2.3" ry="3.8" />
              <ellipse cx="28" cy={10 + ((walkTime * 44 + 19) % 34)} rx="2.1" ry="3.4" />
            </g>
          )}
        </g>
      ) : sitting ? (
        <g>
          <path d="M0 -10 L-10 8" fill="none" stroke={limbColor} strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="-11" cy="9" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d="M0 -10 L14 8" fill="none" stroke={limbColor} strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="15" cy="9" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </g>
      ) : isHeadClutch ? (
        <g>
          <path d="M0 -12 Q-25 -18 -18 -36" fill="none" stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle cx="-18" cy="-36" r="4.3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d="M0 -12 Q25 -18 18 -36" fill="none" stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle cx="18" cy="-36" r="4.3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </g>
      ) : (
        <g>
          <line x1="0" y1="-12" x2={armL} y2={isWalking ? 11 : -24} stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle
            cx={armL}
            cy={isWalking ? 11 : -24}
            r="4.2"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
          />

          <line x1="0" y1="-12" x2={armR} y2={isWalking ? 11 : -24} stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle
            cx={armR}
            cy={isWalking ? 11 : -24}
            r="4.2"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2"
          />
        </g>
      )}

      {/* Head, Scarf, Hair, Marks & Facial Expressions Group */}
      <g transform={headGroupTransform}>
      {/* Ink splatter drips for 'inked' */}
      {isInked && (
        <g fill="#0F172A">
          <circle cx="-13" cy="-22" r="4" />
          <circle cx="12" cy="-20" r="3.5" />
          <ellipse cx="-6" cy="-14" rx="2.5" ry="5" />
          <ellipse cx="7" cy="-15" rx="2.2" ry="4" />
        </g>
      )}

      {/* Optional Scarf */}
      {scarfColor && (
        <g>
          <path d="M-11 -18 Q0 -13 11 -18" fill="none" stroke={scarfColor} strokeWidth="6" strokeLinecap="round" />
          <path d="M-4 -16 L-12 2" fill="none" stroke={scarfColor} strokeWidth="4.8" strokeLinecap="round" />
        </g>
      )}

      {/* Head */}
      <circle
        cx="0"
        cy="-35"
        r={16}
        fill={headFill}
        stroke={headStroke}
        strokeWidth="4.2"
      />

      {/* Brown mud splatters for 'muddy' (ㄸ) */}
      {muddy && (
        <g opacity="0.92">
          <ellipse cx="-8" cy="-31" rx="4.5" ry="3.2" fill="#78350F" />
          <circle cx="8" cy="-41" r="3.4" fill="#92400E" />
          <ellipse cx="4" cy="-26" rx="5.2" ry="2.6" fill="#78350F" />
          <circle cx="-4" cy="-44" r="2.2" fill="#B45309" />
        </g>
      )}

      {/* Red slap handprint / cheek mark (ㅃ, ㅙ) */}
      {slapMark && (
        <g transform="translate(-8, -32)">
          <ellipse cx="0" cy="0" rx="5" ry="3.5" fill="#F43F5E" opacity="0.82" />
          <line x1="-4" y1="-2" x2="4" y2="-2" stroke="#BE123C" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="-4" y1="1.5" x2="4" y2="1.5" stroke="#BE123C" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      )}

      {/* Pink blushing cheeks */}
      {blushCheeks && (
        <g opacity="0.72">
          <ellipse cx="-9" cy="-31" rx="4.2" ry="2.5" fill="#FB7185" />
          <ellipse cx="9" cy="-31" rx="4.2" ry="2.5" fill="#FB7185" />
        </g>
      )}

      {/* Signature Hair Strand or Cap */}
      {capColor ? (
        <g>
          <path d="M-15 -41 Q0 -57 15 -41 Z" fill={capColor} stroke="#0F172A" strokeWidth="2.5" />
          <path d="M12 -41 L24 -40" stroke={capColor} strokeWidth="4" strokeLinecap="round" />
        </g>
      ) : faceMode === 'burnt' ? (
        <path d="M-8 -50 L-12 -60 L-3 -53 L2 -62 L7 -52 L14 -58 L9 -49" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
      ) : (
        <path d="M-2 -51 Q3 -60 8 -53" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      )}

      {showHeadBump && (
        <ellipse
          cx={activeChar === 'ㅇ' ? -6 : 0}
          cy="-54"
          rx="8"
          ry={9.5 + Math.sin(walkTime * 18) * 1.5}
          fill="#EF4444"
          stroke="#991B1B"
          strokeWidth="2.5"
        />
      )}

      {showDizzyStars && (
        <g>
          <text
            x={Math.cos(walkTime * 6.5) * 18}
            y={-64 + Math.sin(walkTime * 6.5) * 4}
            fontSize="14"
            textAnchor="middle"
          >
            ⭐
          </text>
          <text
            x={Math.cos(walkTime * 6.5 + Math.PI) * 18}
            y={-64 + Math.sin(walkTime * 6.5 + Math.PI) * 4}
            fontSize="12"
            textAnchor="middle"
          >
            ✨
          </text>
        </g>
      )}

      {/* Expressions */}
      {flyingKick ? (
        <>
          {/* Heroic determined flying-kick battle face */}
          <path d="M-7 -43 L-1 -40 M9 -43 L3 -40" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="-3.5" cy="-37" r="2.3" fill="#0F172A" />
          <circle cx="6.5" cy="-37" r="2.3" fill="#0F172A" />
          <ellipse cx="2" cy="-27" rx="4.8" ry="5.4" fill="#DC2626" stroke="#0F172A" strokeWidth="1.6" />
        </>
      ) : faceMode === 'happy' && (
        <>
          <circle cx="5.5" cy="-37" r="2.3" fill="#0F172A" />
          <path d="M2 -43 L9 -42" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M1 -29 Q7 -25 12 -30" fill="none" stroke="#0F172A" strokeWidth="2.3" strokeLinecap="round" />
        </>
      )}
      {!flyingKick && (faceMode === 'panic' || faceMode === 'swollenRed') && (
        <>
          <circle cx="-4.5" cy="-38" r="2.4" fill="#0F172A" />
          <circle cx="5.5" cy="-38" r="2.4" fill="#0F172A" />
          <path d="M-8 -44 L-2 -42 M8 -44 L2 -42" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="0.5" cy="-27" rx="4.5" ry="5.5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.6" />
        </>
      )}
      {!flyingKick && (faceMode === 'dizzy' || faceMode === 'squashed' || faceMode === 'fainted') && (
        <>
          <path d="M-7 -40 L-2 -34 M-2 -40 L-7 -34" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M2 -40 L7 -34 M7 -40 L2 -34" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          {isFainted ? (
            <>
              <path d="M-5 -27 Q-2 -29 0 -27 Q3 -25 6 -27" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="4" cy="-23.5" rx="2.6" ry="3.4" fill="#FB7185" stroke="#0F172A" strokeWidth="1.2" />
            </>
          ) : (
            <path d="M-3 -26 Q1 -29 5 -26" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          )}
        </>
      )}
      {!flyingKick && faceMode === 'burnt' && (
        <>
          <circle cx="-5" cy="-37" r="3.4" fill="#FFFFFF" />
          <circle cx="5" cy="-37" r="3.4" fill="#FFFFFF" />
          <circle cx="-5" cy="-37" r="1.5" fill="#0F172A" />
          <circle cx="5" cy="-37" r="1.5" fill="#0F172A" />
          <path d="M-3 -27 Q1 -30 5 -27" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {!flyingKick && faceMode === 'parentTeary' && (
        <>
          {/* Worried raised inner eyebrows */}
          <path d="M-9 -42 L-3 -44 M9 -42 L3 -44" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="-5" cy="-37" r="2.5" fill="#0F172A" />
          <circle cx="5" cy="-37" r="2.5" fill="#0F172A" />
          {/* Glistening tears */}
          <ellipse cx="-6" cy={-33 + tearOffset * 0.45} rx="2.2" ry="3.2" fill="#38BDF8" />
          <ellipse cx="6" cy={-33 + ((tearOffset + 6) % 14) * 0.45} rx="2.2" ry="3.2" fill="#38BDF8" />
          <path d="M-4 -27 Q0 -30 4 -27" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {!flyingKick && faceMode === 'headClutch' && (
        <>
          <circle cx="-5" cy="-38" r="2.8" fill="#0F172A" />
          <circle cx="5" cy="-38" r="2.8" fill="#0F172A" />
          <circle cx="-5" cy="-39" r="1" fill="#FFFFFF" />
          <circle cx="5" cy="-39" r="1" fill="#FFFFFF" />
          <ellipse cx="0" cy="-26" rx="5.5" ry="6.2" fill="#DC2626" stroke="#0F172A" strokeWidth="1.8" />
        </>
      )}
      {!flyingKick && faceMode === 'greenPoison' && (
        <>
          <path d="M-8 -40 L-2 -37 L-8 -34" fill="none" stroke="#365314" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 -40 L2 -37 L8 -34" fill="none" stroke="#365314" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-6 -27 Q-3 -30 0 -27 Q3 -24 6 -27" fill="none" stroke="#365314" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      {!flyingKick && faceMode === 'inked' && (
        <>
          <circle cx="-5" cy="-37" r="3.8" fill="#FFFFFF" />
          <circle cx="5" cy="-37" r="3.8" fill="#FFFFFF" />
          <circle cx="-4.5" cy="-37" r="1.6" fill="#0F172A" />
          <circle cx="5.5" cy="-37" r="1.6" fill="#0F172A" />
          <path d="M-4 -26 H4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {!flyingKick && faceMode === 'crying' && (
        <>
          <path d="M-8 -40 L-3 -37 L-8 -34" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 -40 L3 -37 L8 -34" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-6 -33 Q-8 -24 -7 -16" fill="none" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M6 -33 Q8 -24 7 -16" fill="none" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="0" cy="-26" rx="5" ry="5.5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.6" />
        </>
      )}
      </g>
    </g>
  );
};

// ============================================================================
// SHARED DYNAMIC BACKDROP (EPISODE 1 + LIVING ROOM / NIGHT CITY / SPOOKY HOUSE)
// ============================================================================

export const DynamicBackdrop: React.FC<{
  idPrefix: string;
  theme: BackdropThemeKey;
  scrollOffset: number;
  walkTime: number;
  terrainMode?: 'road' | 'river';
}> = ({ idPrefix, theme, scrollOffset, walkTime, terrainMode = 'road' }) => {
  const skyColors: Record<BackdropThemeKey, [string, string]> = {
    default: ['#7DD3FC', '#E0F2FE'],
    sunset: ['#F97316', '#FDE047'],
    farm: ['#38BDF8', '#FEF9C3'],
    nightmarket: ['#1E1B4B', '#312E81'],
    city: ['#475569', '#94A3B8'],
    jungle: ['#065F46', '#6EE7B7'],
    beach: ['#0EA5E9', '#BAE6FD'],
    space: ['#09090B', '#3B0764'],
    railway: ['#60A5FA', '#FEF3C7'],
    thunderstorm: ['#0F172A', '#475569'],
    savannah: ['#EA580C', '#FDE68A'],
    disco: ['#090517', '#1E1B4B'],
    livingroom: ['#FEF3C7', '#FFFBEB'],
    nightcity: ['#0B1120', '#1E293B'],
    spookyhouse: ['#1E1B4B', '#3B0764'],
    pond: ['#BAE6FD', '#DCFCE7'],
    town: ['#93C5FD', '#FEF3C7'],
    meadow: ['#60A5FA', '#E0F2FE'],
  };

  const [skyTop, skyBot] = skyColors[theme];
  const gradId = `${idPrefix}-sky-${theme}`;

  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1000" height="350" fill={`url(#${gradId})`} />

      {theme === 'sunset' && (
        <g>
          <circle cx="880" cy="240" r="64" fill="#FDE047" opacity="0.88" />
          <g transform={`translate(${-(scrollOffset * 0.18) % 1000}, 0)`}>
            {[0, 1000].map((off) => (
              <g key={off} transform={`translate(${off}, 0)`}>
                {[90, 210, 350, 520, 680, 840].map((tx, idx) => (
                  <g key={idx} transform={`translate(${tx}, 330)`}>
                    <rect x="-8" y="-85" width="16" height="85" fill="#451A03" />
                    <circle cx="0" cy="-95" r="34" fill="#7C2D12" />
                  </g>
                ))}
              </g>
            ))}
          </g>
        </g>
      )}

      {theme === 'farm' && (
        <g>
          <circle cx="910" cy="52" r="28" fill="#FDE047" />
          <path d="M0 335 Q250 265 520 330 T1000 325 L1000 350 L0 350 Z" fill="#86EFAC" />
          <g transform="translate(760, 250)">
            <polygon points="0,30 50,0 100,30 100,90 0,90" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" />
            <rect x="34" y="48" width="32" height="42" fill="#FEF3C7" stroke="#7F1D1D" strokeWidth="2.5" />
            <line x1="34" y1="48" x2="66" y2="90" stroke="#7F1D1D" strokeWidth="2" />
            <line x1="66" y1="48" x2="34" y2="90" stroke="#7F1D1D" strokeWidth="2" />
          </g>
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 90 - ((scrollOffset * 0.45) % 90)}, 306)`}>
              <rect x="0" y="0" width="10" height="32" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
              <rect x="-45" y="10" width="90" height="6" fill="#D97706" />
            </g>
          ))}
        </g>
      )}

      {theme === 'nightmarket' && (
        <g>
          {[70, 190, 310, 460, 620, 770, 910].map((sx, idx) => (
            <circle key={idx} cx={sx} cy={35 + (idx % 3) * 28} r="2.5" fill="#FEF08A" opacity={0.6 + Math.sin(walkTime * 5 + idx) * 0.35} />
          ))}
          <path d="M0 165 Q250 205 500 165 T1000 165" fill="none" stroke="#F8FAFC" strokeWidth="2.5" />
          {[60, 160, 260, 360, 460, 560, 660, 760, 860, 960].map((lx, idx) => (
            <circle key={lx} cx={lx} cy={175 + Math.sin(lx * 0.012) * 18} r="7.5" fill={idx % 2 === 0 ? '#FDE047' : '#FB7185'} />
          ))}
          {[140, 520, 840].map((mx, i) => (
            <g key={i} transform={`translate(${mx}, 240)`}>
              <rect x="-65" y="0" width="130" height="96" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
              <polygon points="-75,0 75,0 65,-28 -65,-28" fill={i % 2 === 0 ? '#EF4444' : '#F59E0B'} stroke="#0F172A" strokeWidth="2.5" />
            </g>
          ))}
        </g>
      )}

      {theme === 'city' && (
        <g>
          {[60, 190, 320, 480, 630, 790, 900].map((cx, i) => (
            <g key={i} transform={`translate(${cx}, ${170 + (i % 3) * 35})`}>
              <rect x="0" y="0" width="95" height="190" fill="#334155" stroke="#1E293B" strokeWidth="2.5" />
              {[0, 1, 2].map((r) =>
                [0, 1].map((c) => (
                  <rect key={`${r}-${c}`} x={16 + c * 38} y={18 + r * 32} width="22" height="18" fill="#FEF08A" opacity="0.7" />
                ))
              )}
            </g>
          ))}
        </g>
      )}

      {theme === 'nightcity' && (
        <g>
          {[48, 130, 220, 315, 420, 510, 600, 710, 815, 920].map((sx, idx) => (
            <circle
              key={sx}
              cx={sx}
              cy={26 + ((idx * 41) % 130)}
              r={idx % 3 === 0 ? 2.6 : 1.7}
              fill="#FEF9C3"
              opacity={0.45 + Math.abs(Math.sin(walkTime * 3.5 + idx)) * 0.55}
            />
          ))}
          <circle cx="880" cy="72" r="24" fill="#FEF08A" opacity="0.92" />
          <circle cx="890" cy="66" r="21" fill="#0B1120" />
          {[40, 165, 295, 440, 595, 745, 875].map((cx, i) => (
            <g key={i} transform={`translate(${cx}, ${165 + (i % 3) * 28})`}>
              <rect x="0" y="0" width="102" height="195" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
              {[0, 1, 2].map((r) =>
                [0, 1].map((c) => (
                  <rect
                    key={`${r}-${c}`}
                    x={18 + c * 40}
                    y={18 + r * 32}
                    width="22"
                    height="18"
                    fill={(i + r + c) % 3 === 0 ? '#FDE047' : '#334155'}
                    opacity="0.82"
                  />
                ))
              )}
            </g>
          ))}
        </g>
      )}

      {theme === 'livingroom' && (
        <g>
          {/* Warm pastel wallpaper stripes */}
          {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((wx, idx) => (
            <rect
              key={wx}
              x={wx}
              y="0"
              width="50"
              height="332"
              fill={idx % 2 === 0 ? '#FDE68A' : '#FEF3C7'}
              opacity="0.28"
            />
          ))}
          {/* Sunny window */}
          <g transform="translate(135, 130)">
            <rect x="0" y="0" width="128" height="110" rx="6" fill="#BAE6FD" stroke="#92400E" strokeWidth="5" />
            <line x1="64" y1="0" x2="64" y2="110" stroke="#92400E" strokeWidth="4" />
            <line x1="0" y1="55" x2="128" y2="55" stroke="#92400E" strokeWidth="4" />
            <circle cx="96" cy="26" r="12" fill="#FDE047" />
          </g>
          {/* Wall clock */}
          <g transform="translate(500, 152)">
            <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#B45309" strokeWidth="4" />
            <line x1="0" y1="0" x2="0" y2="-13" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="0" x2="10" y2="4" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* Framed picture on wall */}
          <g transform="translate(755, 148)">
            <rect x="0" y="0" width="110" height="78" rx="4" fill="#FFFFFF" stroke="#B45309" strokeWidth="4" />
            <rect x="10" y="10" width="90" height="58" fill="#E0F2FE" />
            <circle cx="42" cy="36" r="9" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <circle cx="68" cy="40" r="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </g>
          {/* Sofa silhouette in living room background */}
          <g transform="translate(490, 255)">
            <rect x="-110" y="12" width="220" height="65" rx="14" fill="#FB7185" stroke="#9F1239" strokeWidth="3" />
            <rect x="-120" y="28" width="24" height="50" rx="8" fill="#F43F5E" stroke="#9F1239" strokeWidth="2.5" />
            <rect x="96" y="28" width="24" height="50" rx="8" fill="#F43F5E" stroke="#9F1239" strokeWidth="2.5" />
            <rect x="-96" y="42" width="192" height="28" rx="6" fill="#FDA4AF" stroke="#9F1239" strokeWidth="2" />
          </g>
          {/* Wooden wainscoting */}
          <rect x="0" y="318" width="1000" height="16" fill="#D97706" stroke="#92400E" strokeWidth="2" />
        </g>
      )}

      {theme === 'spookyhouse' && (
        <g>
          {[55, 165, 290, 440, 610, 775, 920].map((sx, idx) => (
            <circle
              key={sx}
              cx={sx}
              cy={32 + (idx % 3) * 28}
              r="2.2"
              fill="#E9D5FF"
              opacity={0.45 + Math.sin(walkTime * 4 + idx) * 0.4}
            />
          ))}
          {/* Eerie full moon */}
          <circle cx="150" cy="140" r="46" fill="#FEF08A" opacity="0.88" />
          <circle cx="136" cy="128" r="8" fill="#EAB308" opacity="0.35" />
          <circle cx="164" cy="152" r="6" fill="#EAB308" opacity="0.35" />
          {/* Twisted dead trees */}
          <path d="M90 332 Q84 265 60 225 M76 270 L108 242" fill="none" stroke="#1E1B4B" strokeWidth="8" strokeLinecap="round" />
          <path d="M915 332 Q922 255 950 218 M925 266 L892 238" fill="none" stroke="#1E1B4B" strokeWidth="8" strokeLinecap="round" />
          {/* Haunted Wooden House */}
          <g transform="translate(650, 138)">
            <polygon points="-24,62 95,-12 214,62" fill="#312E81" stroke="#0F172A" strokeWidth="3.5" />
            <rect x="0" y="62" width="190" height="134" fill="#4C1D95" stroke="#0F172A" strokeWidth="3.5" />
            <rect x="24" y="88" width="38" height="38" rx="4" fill="#FDE047" opacity={0.4 + Math.sin(walkTime * 6) * 0.25} stroke="#0F172A" strokeWidth="2.5" />
            <rect x="128" y="88" width="38" height="38" rx="4" fill="#1E1B4B" stroke="#0F172A" strokeWidth="2.5" />
            {/* Front door */}
            <rect x="74" y="106" width="44" height="90" rx="4" fill="#2E1065" stroke="#0F172A" strokeWidth="3" />
            <circle cx="108" cy="154" r="3.5" fill="#FDE047" />
          </g>
        </g>
      )}

      {theme === 'jungle' && (
        <g>
          <path d="M0 330 Q200 260 400 325 T800 320 T1000 330 L1000 355 L0 355 Z" fill="#047857" />
          {[120, 280, 440, 600, 760, 910].map((rx, idx) => (
            <line
              key={rx}
              x1={rx}
              y1={(walkTime * 220 + idx * 50) % 300}
              x2={rx - 8}
              y2={((walkTime * 220 + idx * 50) % 300) + 18}
              stroke="#A7F3D0"
              strokeWidth="2.2"
              opacity="0.75"
            />
          ))}
          <ellipse cx="760" cy="340" rx="45" ry="10" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
        </g>
      )}

      {theme === 'beach' && (
        <g>
          <circle cx="900" cy="54" r="30" fill="#FDE047" />
          <rect x="0" y="255" width="1000" height="90" fill="#0284C7" />
          <path d="M0 285 Q120 272 240 285 T480 285 T720 285 T1000 285" fill="none" stroke="#BAE6FD" strokeWidth="4" />
          <g transform="translate(880, 330)">
            <path d="M0 0 Q18 -70 8 -140" fill="none" stroke="#78350F" strokeWidth="14" strokeLinecap="round" />
            <path d="M8 -140 Q-40 -165 -65 -130 Q-25 -140 8 -140 Z" fill="#16A34A" />
            <path d="M8 -140 Q55 -168 78 -132 Q38 -142 8 -140 Z" fill="#22C55E" />
          </g>
        </g>
      )}

      {theme === 'space' && (
        <g>
          {[40, 110, 185, 250, 330, 410, 495, 575, 665, 745, 835, 920].map((sx, i) => (
            <circle
              key={sx}
              cx={sx}
              cy={25 + ((i * 53) % 270)}
              r={i % 3 === 0 ? 3 : 1.8}
              fill="#FFFFFF"
              opacity={0.45 + Math.abs(Math.sin(walkTime * 3 + i)) * 0.55}
            />
          ))}
          <g transform="translate(860, 210)">
            <circle cx="0" cy="0" r="36" fill="#A855F7" stroke="#581C87" strokeWidth="2.5" />
            <ellipse cx="0" cy="2" rx="64" ry="13" fill="none" stroke="#FDE047" strokeWidth="5" transform="rotate(-18)" />
          </g>
        </g>
      )}

      {theme === 'railway' && (
        <g>
          <path d="M0 330 Q220 260 440 325 T900 320 L1000 330 L1000 355 L0 355 Z" fill="#86EFAC" />
          <g transform="translate(815, 225)">
            <rect x="-5" y="0" width="10" height="115" fill="#475569" />
            <rect x="-26" y="4" width="52" height="16" rx="4" fill="#1E293B" />
            <circle cx="-12" cy="12" r="5.5" fill={Math.floor(walkTime * 6) % 2 === 0 ? '#EF4444' : '#7F1D1D'} />
            <circle cx="12" cy="12" r="5.5" fill={Math.floor(walkTime * 6) % 2 === 1 ? '#EF4444' : '#7F1D1D'} />
            <line x1="-22" y1="-16" x2="22" y2="2" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
            <line x1="22" y1="-16" x2="-22" y2="2" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
          </g>
        </g>
      )}

      {theme === 'thunderstorm' && (
        <g>
          {[140, 420, 740].map((cx, idx) => (
            <g key={cx} transform={`translate(${cx}, ${140 + (idx % 2) * 20})`}>
              <ellipse cx="0" cy="0" rx="74" ry="26" fill="#334155" />
              <ellipse cx="-34" cy="12" rx="44" ry="20" fill="#1E293B" />
              <ellipse cx="38" cy="10" rx="48" ry="20" fill="#1E293B" />
            </g>
          ))}
        </g>
      )}

      {theme === 'savannah' && (
        <g>
          <circle cx="890" cy="220" r="68" fill="#FEF08A" opacity="0.88" />
          {[140, 740].map((ax, i) => (
            <g key={i} transform={`translate(${ax}, 332)`}>
              <path d="M0 0 Q8 -45 2 -95" stroke="#78350F" strokeWidth="10" fill="none" strokeLinecap="round" />
              <ellipse cx="2" cy="-98" rx="68" ry="15" fill="#15803D" />
            </g>
          ))}
        </g>
      )}

      {theme === 'disco' && (
        <g>
          {[75, 220, 380, 560, 740, 895].map((sx, idx) => (
            <circle
              key={sx}
              cx={sx}
              cy={36 + (idx % 3) * 32}
              r="2.4"
              fill="#FDE047"
              opacity={0.35 + Math.abs(Math.sin(walkTime * 6 + idx)) * 0.55}
            />
          ))}
          <polygon points={`500,90 ${180 + Math.sin(walkTime * 5) * 90},372 ${310 + Math.sin(walkTime * 5) * 90},372`} fill="#EC4899" opacity="0.22" />
          <polygon points={`500,90 ${440 + Math.cos(walkTime * 4.5) * 90},372 ${580 + Math.cos(walkTime * 4.5) * 90},372`} fill="#38BDF8" opacity="0.22" />
          <polygon points={`500,90 ${700 - Math.sin(walkTime * 5.2) * 90},372 ${830 - Math.sin(walkTime * 5.2) * 90},372`} fill="#FACC15" opacity="0.20" />
        </g>
      )}

      {theme === 'pond' && (
        <g>
          {/* Soft warm sunlight & dappled sunlit forest atmosphere */}
          <circle cx="902" cy="54" r="32" fill="#FEF08A" opacity="0.92" />
          <circle cx="902" cy="54" r="52" fill="#FEF9C3" opacity="0.28" />
          {/* Gentle fluffy clouds */}
          <g transform={`translate(${-(scrollOffset * 0.1) % 1000}, 0)`}>
            {[0, 1000].map((offset) => (
              <g key={offset} transform={`translate(${offset}, 0)`}>
                {[150, 490, 770].map((cx, idx) => (
                  <g key={cx} transform={`translate(${cx}, ${72 + (idx % 2) * 24})`} opacity="0.82">
                    <ellipse cx="0" cy="0" rx="46" ry="15" fill="#FFFFFF" />
                    <ellipse cx="-18" cy="-8" rx="22" ry="13" fill="#FFFFFF" />
                    <ellipse cx="18" cy="-7" rx="24" ry="14" fill="#FFFFFF" />
                  </g>
                ))}
              </g>
            ))}
          </g>

          {/* Scrolling distant lush green forest hills & tree canopies */}
          <g transform={`translate(${-(scrollOffset * 0.18) % 1000}, 0)`}>
            {[0, 1000].map((offset) => (
              <g key={offset} transform={`translate(${offset}, 0)`}>
                {/* Far soft sage-green woodland hills */}
                <path d="M0 330 Q170 218 360 302 T720 296 T1000 315 L1000 352 L0 352 Z" fill="#86EFAC" />
                {/* Distant rounded woodland tree silhouettes */}
                {[75, 195, 325, 455, 590, 735, 870, 965].map((tx, idx) => (
                  <g key={tx} transform={`translate(${tx}, ${266 + (idx % 3) * 14})`} opacity="0.72">
                    <circle cx="0" cy="-16" r={30 + (idx % 2) * 8} fill="#4ADE80" />
                    <circle cx="-22" cy="-6" r="22" fill="#22C55E" />
                    <circle cx="24" cy="-8" r="24" fill="#4ADE80" />
                  </g>
                ))}
                {/* Mid-layer vibrant emerald forest hill */}
                <path d="M0 336 Q240 258 510 326 T1000 320 L1000 356 L0 356 Z" fill="#4ADE80" />
              </g>
            ))}
          </g>

          {/* Dense Lush Green Forest Bushes (풀숲) along the meadow & pond bank */}
          <g transform={`translate(${-(scrollOffset * 0.34) % 1000}, 0)`}>
            {[0, 1000].map((offset) => (
              <g key={offset} transform={`translate(${offset}, 0)`}>
                {[42, 138, 250, 382, 518, 650, 786, 918].map((bx, idx) => (
                  <g key={bx} transform={`translate(${bx}, 334)`}>
                    {/* Deep shadow bush layer */}
                    <circle cx="-26" cy="-10" r="26" fill="#15803D" />
                    <circle cx="0" cy="-22" r="32" fill="#16A34A" />
                    <circle cx="28" cy="-12" r="24" fill="#15803D" />
                    {/* Bright sunlit leaf top highlights */}
                    <circle cx="-12" cy="-22" r="16" fill="#22C55E" />
                    <circle cx="14" cy="-24" r="15" fill="#4ADE80" opacity="0.88" />
                    {/* Arching fern fronds */}
                    <path
                      d="M-36 0 Q-48 -24 -32 -38 M34 0 Q48 -22 36 -36"
                      fill="none"
                      stroke="#15803D"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    {/* Cute meadow wildflowers tucked in bushes */}
                    <circle cx={idx % 2 === 0 ? -18 : 18} cy="-12" r="4" fill={idx % 3 === 0 ? '#FEF08A' : idx % 3 === 1 ? '#FBCFE8' : '#FFFFFF'} />
                    <circle cx={idx % 2 === 0 ? -18 : 18} cy="-12" r="1.6" fill="#F59E0B" />
                  </g>
                ))}
              </g>
            ))}
          </g>

          {/* Swaying Cattail Reeds & Tall Pond Grass framing the frog pond */}
          {[586, 608, 628, 846, 868, 892].map((rx, idx) => {
            const sway = Math.sin(walkTime * 2.8 + idx * 0.9) * 3.5;
            return (
              <g key={rx} transform={`translate(${rx}, 346)`}>
                <path
                  d={`M0 0 Q${sway * 0.5} -22 ${sway + (idx % 2 === 0 ? -6 : 6)} -48`}
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
                <path
                  d={`M-2 0 Q${-12 + sway * 0.4} -16 ${-16 + sway} -30`}
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d={`M2 0 Q${11 + sway * 0.4} -14 ${15 + sway} -26`}
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                {idx % 2 === 0 && (
                  <ellipse
                    cx={sway + (idx % 2 === 0 ? -6 : 6)}
                    cy="-42"
                    rx="4.2"
                    ry="10"
                    fill="#78350F"
                    stroke="#451A03"
                    strokeWidth="1.2"
                  />
                )}
              </g>
            );
          })}

          {/* Tiny glowing forest fireflies / sunlit pollen drifting gently */}
          {[140, 340, 560, 740, 890].map((fx, idx) => (
            <circle
              key={fx}
              cx={fx + Math.sin(walkTime * 1.6 + idx * 1.4) * 16}
              cy={210 + (idx % 3) * 32 + Math.cos(walkTime * 2.1 + idx) * 10}
              r="3"
              fill="#FEF08A"
              opacity={0.45 + Math.abs(Math.sin(walkTime * 3 + idx)) * 0.5}
            />
          ))}
        </g>
      )}

      {theme === 'town' && (
        <g>
          <circle cx="915" cy="46" r="24" fill="#FDE047" opacity="0.92" />
          {/* Fluffy clouds */}
          <g transform={`translate(${-(scrollOffset * 0.14) % 1000}, 0)`}>
            {[0, 1000].map((offset) => (
              <g key={offset} transform={`translate(${offset}, 0)`}>
                {[140, 480, 810].map((cx, idx) => (
                  <g key={cx} transform={`translate(${cx}, ${92 + idx * 18})`} opacity="0.88">
                    <ellipse cx="0" cy="0" rx="42" ry="16" fill="#FFFFFF" />
                    <ellipse cx="-18" cy="-8" rx="22" ry="14" fill="#FFFFFF" />
                    <ellipse cx="16" cy="-6" rx="24" ry="15" fill="#FFFFFF" />
                  </g>
                ))}
              </g>
            ))}
          </g>
          {/* Pastel houses in town background */}
          {[75, 255, 595, 795].map((hx, i) => (
            <g key={hx} transform={`translate(${hx}, 230)`}>
              <rect x="0" y="28" width="96" height="78" fill={['#FDE68A', '#FBCFE8', '#BAE6FD', '#BBF7D0'][i]} stroke="#475569" strokeWidth="2.5" />
              <polygon points="-8,28 48,-8 104,28" fill={['#F97316', '#EC4899', '#0284C7', '#16A34A'][i]} stroke="#475569" strokeWidth="2.5" />
              <rect x="18" y="48" width="22" height="22" rx="3" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
              <rect x="56" y="48" width="22" height="58" rx="3" fill="#92400E" stroke="#475569" strokeWidth="2" />
            </g>
          ))}
        </g>
      )}

      {theme === 'meadow' && (
        <g>
          <circle cx="910" cy="48" r="25" fill="#FDE047" opacity="0.92" />
          <g transform={`translate(${-(scrollOffset * 0.16) % 1000}, 0)`}>
            {[0, 1000].map((offset) => (
              <g key={offset} transform={`translate(${offset}, 0)`}>
                {[160, 440, 740].map((cx, idx) => (
                  <g key={cx} transform={`translate(${cx}, ${85 + (idx % 2) * 26})`} opacity="0.86">
                    <ellipse cx="0" cy="0" rx="44" ry="16" fill="#FFFFFF" />
                    <ellipse cx="14" cy="-9" rx="24" ry="15" fill="#FFFFFF" />
                  </g>
                ))}
                <path d="M0 328 Q220 245 460 320 T920 315 T1000 326 L1000 352 L0 352 Z" fill="#86EFAC" />
                <path d="M0 338 Q300 282 620 335 T1000 332 L1000 356 L0 356 Z" fill="#22C55E" />
                {[110, 290, 510, 690, 880].map((fx, i) => (
                  <circle key={fx} cx={fx} cy={322 + (i % 2) * 8} r="4" fill={i % 2 === 0 ? '#FEF08A' : '#F472B6'} />
                ))}
              </g>
            ))}
          </g>
        </g>
      )}

      {theme === 'default' && (
        <g>
          <circle cx="945" cy="44" r="24" fill="#FDE047" opacity="0.9" />
          <g transform={`translate(${-(scrollOffset * 0.2) % 1000}, 0)`}>
            {[0, 1000].map((offset) => (
              <g key={offset} transform={`translate(${offset}, 0)`}>
                <path d="M0 330 Q180 245 360 320 T720 315 T1000 325 L1000 350 L0 350 Z" fill="#86EFAC" />
                <path d="M0 335 Q250 275 500 332 T1000 328 L1000 355 L0 355 Z" fill="#4ADE80" />
              </g>
            ))}
          </g>
        </g>
      )}

      {terrainMode === 'river' ? (
        <g>
          <rect x="0" y="332" width="255" height="36" fill="#4ADE80" />
          <rect x="645" y="332" width="355" height="36" fill="#4ADE80" />
          <rect x="0" y="368" width="255" height="92" fill="#92400E" />
          <rect x="645" y="368" width="355" height="92" fill="#92400E" />
          <rect x="0" y="364" width="255" height="8" fill="#16A34A" />
          <rect x="645" y="364" width="355" height="8" fill="#16A34A" />
          <rect x="242" y="348" width="18" height="112" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
          <rect x="640" y="348" width="18" height="112" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
          <rect x="260" y="356" width="380" height="104" fill="#0284C7" />
          <path d={`M260 384 Q${315 + Math.sin(walkTime * 5) * 14} 374 370 384 T490 384 T640 384`} fill="none" stroke="#BAE6FD" strokeWidth="3.5" strokeLinecap="round" />
          <path d={`M260 416 Q${330 - Math.sin(walkTime * 4.5) * 14} 406 400 416 T530 416 T640 416`} fill="none" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
          <path d={`M260 442 Q${320 + Math.cos(walkTime * 4) * 12} 434 385 442 T510 442 T640 442`} fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ) : theme === 'livingroom' ? (
        <g>
          {/* Warm wood living-room floor + cozy pastel rug */}
          <rect x="0" y="332" width="1000" height="128" fill="#FDE68A" />
          <rect x="0" y="332" width="1000" height="14" fill="#F59E0B" opacity="0.45" />
          {[362, 394, 428].map((ly) => (
            <line key={ly} x1="0" y1={ly} x2="1000" y2={ly} stroke="#D97706" strokeWidth="1.5" opacity="0.35" />
          ))}
          <ellipse cx="470" cy="398" rx="280" ry="34" fill="#FBCFE8" stroke="#F472B6" strokeWidth="3" />
          <ellipse cx="470" cy="398" rx="230" ry="22" fill="#FCE7F3" />
        </g>
      ) : theme === 'pond' ? (
        <g>
          {/* Rich sunlit lush green meadow floor (no grey road!) */}
          <rect x="0" y="332" width="1000" height="38" fill="#4ADE80" />
          <rect x="0" y="366" width="1000" height="94" fill="#22C55E" />
          {/* Soft dappled clover & grass footpath strip */}
          <rect x="0" y="370" width="1000" height="44" fill="#86EFAC" opacity="0.52" />
          <path d="M0 370 Q250 364 500 371 T1000 368" fill="none" stroke="#16A34A" strokeWidth="3" opacity="0.55" />
          {/* Scrolling grass tufts, clovers & tiny flowers on the green meadow */}
          {Array.from({ length: 14 }).map((_, i) => {
            const rawX = i * 82 - ((scrollOffset * 0.72) % 82);
            return (
              <g key={i} transform={`translate(${rawX}, ${i % 2 === 0 ? 356 : 428})`}>
                <path d="M-8 0 L-12 -10 M0 0 L0 -13 M8 0 L12 -9" stroke="#15803D" strokeWidth="2.4" strokeLinecap="round" />
                {i % 3 === 0 && (
                  <g transform="translate(18, -4)">
                    <circle cx="0" cy="0" r="3.8" fill={i % 2 === 0 ? '#FFFFFF' : '#FEF08A'} />
                    <circle cx="0" cy="0" r="1.5" fill="#F59E0B" />
                  </g>
                )}
              </g>
            );
          })}

          {/* Sparkling Forest Lily Pond on right side (x=730, y=388) */}
          <g transform="translate(730, 388)">
            {/* Mossy outer shoreline bank */}
            <ellipse cx="0" cy="2" rx="152" ry="42" fill="#15803D" opacity="0.55" />
            <ellipse cx="0" cy="0" rx="142" ry="37" fill="#0284C7" stroke="#16A34A" strokeWidth="4" />
            <ellipse cx="-10" cy="-2" rx="122" ry="28" fill="#0EA5E9" />
            <ellipse cx="-22" cy="-6" rx="88" ry="18" fill="#38BDF8" opacity="0.72" />
            {/* Animated shimmering water ripples */}
            <path
              d={`M-72 4 Q${-42 + Math.sin(walkTime * 3.5) * 6} -2 -12 4`}
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d={`M-16 14 Q${12 - Math.sin(walkTime * 3.2) * 5} 9 42 14`}
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Floating notched lily pad + pink lotus blossom */}
            <g transform="translate(68, 9)">
              <path d="M-24 0 A24 8.5 0 1 1 20 -3 L0 0 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
              <ellipse cx="-6" cy="-5" rx="6" ry="3.6" fill="#F472B6" stroke="#BE185D" strokeWidth="1.2" />
              <ellipse cx="0" cy="-7" rx="5.5" ry="4.2" fill="#FBCFE8" stroke="#BE185D" strokeWidth="1.2" />
              <circle cx="-1" cy="-5" r="2.2" fill="#FDE047" />
            </g>
            {/* Smaller decorative lily pad on left edge of pond */}
            <path d="M-104 6 A18 6.5 0 1 1 -74 3 L-89 6 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1.8" />
            {/* Smooth river pebbles on shoreline */}
            <ellipse cx="-126" cy="22" rx="11" ry="6" fill="#94A3B8" stroke="#475569" strokeWidth="1.8" />
            <ellipse cx="-110" cy="27" rx="7" ry="4" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
            <ellipse cx="122" cy="24" rx="12" ry="6.5" fill="#94A3B8" stroke="#475569" strokeWidth="1.8" />
          </g>

          {/* Foreground framing green grass & fern blades at bottom corners */}
          <g fill="#15803D" opacity="0.88">
            <path d="M0 460 L0 426 Q18 438 28 460 Z" />
            <path d="M18 460 Q32 428 48 442 Q42 452 52 460 Z" fill="#16A34A" />
            <path d="M1000 460 L1000 424 Q980 436 968 460 Z" />
            <path d="M982 460 Q964 426 948 444 Q956 452 944 460 Z" fill="#16A34A" />
          </g>
        </g>
      ) : (
        <g>
          <rect
            x="0"
            y="332"
            width="1000"
            height="36"
            fill={
                theme === 'beach'
                  ? '#FDE68A'
                  : theme === 'space'
                  ? '#334155'
                  : theme === 'savannah'
                  ? '#FACC15'
                  : theme === 'thunderstorm' || theme === 'disco' || theme === 'nightcity'
                  ? '#334155'
                  : theme === 'spookyhouse'
                  ? '#312E81'
                  : theme === 'town'
                  ? '#A3E635'
                  : '#4ADE80'
            }
          />
          <rect
            x="0"
            y="362"
            width="1000"
            height="10"
            fill={theme === 'disco' ? '#6366F1' : theme === 'spookyhouse' ? '#4C1D95' : '#CBD5E1'}
          />
          <rect
            x="0"
            y="372"
            width="1000"
            height="88"
            fill={
              theme === 'beach'
                ? '#FCD34D'
                : theme === 'space' || theme === 'disco' || theme === 'nightcity' || theme === 'spookyhouse'
                ? '#1E293B'
                : theme === 'town'
                ? '#64748B'
                : theme === 'meadow'
                ? '#16A34A'
                : '#475569'
            }
          />
          {Array.from({ length: 20 }).map((_, i) => {
            const rawX = i * 58 - (scrollOffset % 58);
            return (
              <rect
                key={i}
                x={rawX}
                y="404"
                width="32"
                height="7"
                rx="3"
                fill={
                  theme === 'space'
                    ? '#A855F7'
                    : theme === 'spookyhouse'
                    ? '#64748B'
                    : theme === 'meadow'
                    ? '#86EFAC'
                    : theme === 'disco'
                    ? ['#EC4899', '#38BDF8', '#FACC15', '#A855F7'][i % 4]
                    : '#FDE047'
                }
                opacity="0.85"
              />
            );
          })}
          <line x1="0" y1="376" x2="1000" y2="376" stroke="#94A3B8" strokeWidth="3" />
        </g>
      )}
    </g>
  );
};

// ============================================================================
// SHARED WEB AUDIO & SPEECH LIFECYCLE HOOK
// ============================================================================

export function useStickmanAudio() {
  const timersRef = useRef<number[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscRef = useRef<Set<OscillatorNode>>(new Set());

  const stopAllAudio = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    activeOscRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore already stopped oscillators
      }
    });
    activeOscRef.current.clear();
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimers();
      stopAllAudio();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [clearAllTimers, stopAllAudio]);

  const getAudioCtx = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        audioCtxRef.current = new Ctx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const registerOsc = useCallback((osc: OscillatorNode) => {
    activeOscRef.current.add(osc);
    osc.onended = () => {
      activeOscRef.current.delete(osc);
    };
  }, []);

  const playTone = useCallback(
    (
      type: OscillatorType,
      f1: number,
      f2: number,
      dur: number,
      vol = 0.18,
      delay = 0
    ) => {
      try {
        const ctx = getAudioCtx();
        if (!ctx) return;
        const now = ctx.currentTime;
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
      } catch {
        // Silent fallback
      }
    },
    [getAudioCtx, registerOsc]
  );

  const playCutePop = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      registerOsc(osc);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Silent fallback
    }
  }, [getAudioCtx, registerOsc]);

  const playCartoonImpact = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      const kick = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kick.type = 'triangle';
      kick.frequency.setValueAtTime(240, now);
      kick.frequency.exponentialRampToValueAtTime(38, now + 0.22);
      kickGain.gain.setValueAtTime(0.4, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
      kick.connect(kickGain);
      kickGain.connect(ctx.destination);
      registerOsc(kick);
      kick.start(now);
      kick.stop(now + 0.26);

      const boing = ctx.createOscillator();
      const boingLfo = ctx.createOscillator();
      const boingLfoGain = ctx.createGain();
      const boingGain = ctx.createGain();
      boing.type = 'sine';
      boing.frequency.setValueAtTime(320, now + 0.04);
      boing.frequency.exponentialRampToValueAtTime(760, now + 0.32);
      boingLfo.frequency.setValueAtTime(24, now + 0.04);
      boingLfoGain.gain.setValueAtTime(55, now + 0.04);
      boingLfo.connect(boingLfoGain);
      boingLfoGain.connect(boing.frequency);
      boingGain.gain.setValueAtTime(0.001, now + 0.04);
      boingGain.gain.linearRampToValueAtTime(0.16, now + 0.08);
      boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.44);
      boing.connect(boingGain);
      boingGain.connect(ctx.destination);
      registerOsc(boingLfo);
      registerOsc(boing);
      boingLfo.start(now + 0.04);
      boing.start(now + 0.04);
      boingLfo.stop(now + 0.45);
      boing.stop(now + 0.45);
    } catch {
      // Silent fallback
    }
  }, [getAudioCtx, registerOsc]);

  const playCartoonSplat = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.22);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      registerOsc(osc);
      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Silent fallback
    }
  }, [getAudioCtx, registerOsc]);

  const playSuccessChime = useCallback(() => {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + index * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        registerOsc(osc);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Silent fallback
    }
  }, [getAudioCtx, registerOsc]);

  const speakKorean = useCallback((text: string, rate = 0.92, pitch = 1.0) => {
    speakAppKorean(text, rate, pitch);
  }, []);

  return {
    timersRef,
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
  };
}

// ============================================================================
// SHARED FULLSCREEN CONTEXT & MINIMAL TOP CONTROL BAR
// ============================================================================

export interface StickmanFullscreenContextValue {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  uiLang?: UiLanguage;
}

export const StickmanFullscreenContext = createContext<StickmanFullscreenContextValue | null>(null);

export const StickmanControlBar: React.FC<{
  title: string;
  icon?: string;
  audioEnabled?: boolean;
  onToggleAudio?: () => void;
  isPaused?: boolean;
  onTogglePause?: () => void;
  showWalkingReset?: boolean;
  onResetWalking?: () => void;
  isAllPlayMode: boolean;
  onToggleAllPlay: () => void;
  allPlayIndex: number;
  allPlayTotal: number;
}> = ({
  title,
  icon = '🏃',
  isAllPlayMode,
  onToggleAllPlay,
  allPlayIndex,
  allPlayTotal,
}) => {
  const fullscreenCtx = useContext(StickmanFullscreenContext);
  const isFullscreen = fullscreenCtx?.isFullscreen ?? false;
  const uiLang: UiLanguage = fullscreenCtx?.uiLang ?? 'ko';
  const stickmanUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).stickman;

  const localizedTitle =
    uiLang === 'ko'
      ? title
      : title.includes('ㄱ ~ ㅎ')
      ? stickmanUi.barTitles.ep1
      : title.includes('ㅏ ~ ㅣ')
      ? stickmanUi.barTitles.ep2
      : title.includes('ㄲ ~ ㅉ')
      ? stickmanUi.barTitles.ep3
      : title.includes('ㅐ ~ ㅢ')
      ? stickmanUi.barTitles.ep4
      : title;

  const handleToggleFullscreen = () => {
    if (fullscreenCtx) {
      fullscreenCtx.toggleFullscreen();
      return;
    }
    if (typeof document !== 'undefined') {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        document.documentElement.requestFullscreen?.().catch(() => {});
      }
    }
  };

  return (
    <div
      className={`rounded-xl px-2.5 sm:px-3 py-1.5 flex items-center justify-between gap-2 transition-colors ${
        isFullscreen
          ? 'bg-slate-900/90 border border-slate-700/80 text-white'
          : 'bg-white border border-slate-200 text-slate-900 shadow-2xs'
      }`}
    >
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-sm sm:text-base shrink-0" aria-hidden="true">
          {icon}
        </span>
        <h2
          className={`text-xs sm:text-sm font-black leading-tight truncate ${
            isFullscreen ? 'text-slate-100' : 'text-slate-900'
          }`}
        >
          {localizedTitle}
        </h2>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={onToggleAllPlay}
          className={`px-2.5 sm:px-3 py-1.5 text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1.5 ${
            isAllPlayMode
              ? 'bg-slate-700 hover:bg-slate-800'
              : 'bg-rose-600 hover:bg-rose-700'
          }`}
          aria-pressed={isAllPlayMode}
        >
          {isAllPlayMode ? (
            <Square className="w-3 h-3 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
          <span>
            {isAllPlayMode
              ? `${stickmanUi.playingAll} (${allPlayIndex + 1}/${allPlayTotal})`
              : stickmanUi.playAll}
          </span>
        </button>

        <button
          type="button"
          onClick={handleToggleFullscreen}
          className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
            isFullscreen
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-white'
              : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
          }`}
          aria-label={isFullscreen ? stickmanUi.exitFullscreen : stickmanUi.enterFullscreen}
          title={isFullscreen ? `${stickmanUi.exitFullscreen} (ESC)` : stickmanUi.enterFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
