import React, { useState, useMemo } from 'react';
import { RotateCcw, Dices, Sparkles } from 'lucide-react';
import { JamoStyleSheet } from './PrintableJamoSheets';
import { BASIC_LETTERS_ILLUSTRATIONS } from '../data/basicLettersIllustrations';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';

// ============================================================================
// MINI JOLLAMAN CHARACTER (자음·모음 크기 26px~40px 초미니 졸라한글맨)
// ============================================================================
export type MiniJollaPose =
  | 'cheer'
  | 'peek'
  | 'pushRight'
  | 'pushLeft'
  | 'run'
  | 'dizzy'
  | 'kick'
  | 'flag'
  | 'sleep'
  | 'spy'
  | 'crown'
  | 'confused'
  | 'boxTrapped'
  | 'umbrella'
  | 'ballRoll'
  | 'hat';

interface MiniJollamanProps {
  pose?: MiniJollaPose;
  size?: number;
  teamColor?: string;
  className?: string;
}

export const MiniJollaman: React.FC<MiniJollamanProps> = ({
  pose = 'cheer',
  size = 34,
  teamColor = '#EF4444',
  className = '',
}) => {
  const shoeColor = teamColor;

  return (
    <svg
      viewBox="-36 -54 72 96"
      width={size}
      height={Math.round(size * 1.28)}
      className={`inline-block shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Special background/props per pose */}
      {pose === 'flag' && (
        <g>
          <line x1="18" y1="-44" x2="18" y2="30" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="18,-44 35,-36 18,-26" fill={teamColor} stroke="#0F172A" strokeWidth="2.2" strokeLinejoin="round" />
        </g>
      )}
      {pose === 'crown' && (
        <polygon
          points="-11,-38 -14,-51 -5,-44 0,-52 5,-44 14,-51 11,-38"
          fill="#FACC15"
          stroke="#92400E"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
      )}
      {pose === 'hat' && (
        <g>
          <path d="M-14,-35 Q0,-51 14,-35 Z" fill="#F59E0B" stroke="#0F172A" strokeWidth="2.5" />
          <line x1="-18" y1="-35" x2="18" y2="-35" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {pose === 'sleep' ? (
        /* Lying sideways sleeping peacefully */
        <g transform="rotate(-90 0 0) translate(-4, 0)">
          <line x1="0" y1="-10" x2="0" y2="14" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
          <line x1="0" y1="14" x2="-9" y2="30" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
          <line x1="0" y1="14" x2="8" y2="30" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
          <ellipse cx="-9" cy="33" rx="5.5" ry="3.2" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
          <ellipse cx="9" cy="33" rx="5.5" ry="3.2" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
          <line x1="0" y1="-4" x2="-13" y2="6" stroke="#0F172A" strokeWidth="3.8" strokeLinecap="round" />
          <line x1="0" y1="-4" x2="12" y2="-14" stroke="#0F172A" strokeWidth="3.8" strokeLinecap="round" />
          <circle cx="0" cy="-24" r="13.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.6" />
          <path d="M-1,-37 Q3,-45 7,-39" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M-6,-25 Q-3,-22 0,-25 M3,-25 Q6,-22 9,-25" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="2" cy="-18" r="2.2" fill="#38BDF8" />
        </g>
      ) : pose === 'kick' ? (
        /* Dynamic flying kick */
        <g>
          <line x1="-26" y1="-14" x2="-14" y2="-10" stroke="#FACC15" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="-28" y1="2" x2="-15" y2="2" stroke="#38BDF8" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="-6" y1="-8" x2="2" y2="12" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M2,12 L-10,23 L-18,16" fill="none" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="2" y1="10" x2="27" y2="2" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
          <ellipse cx="29" cy="2" rx="6.5" ry="4" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
          <line x1="-4" y1="-4" x2="-18" y2="4" stroke="#0F172A" strokeWidth="3.8" strokeLinecap="round" />
          <line x1="-4" y1="-4" x2="14" y2="-12" stroke="#0F172A" strokeWidth="3.8" strokeLinecap="round" />
          <circle cx="-8" cy="-23" r="13.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.6" />
          <path d="M-10,-36 Q-6,-44 -2,-38" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="-3" cy="-24" r="2.1" fill="#0F172A" />
          <path d="M-8,-29 L-1,-27" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="-4" cy="-17" rx="3.2" ry="3.6" fill="#EF4444" stroke="#0F172A" strokeWidth="1.4" />
        </g>
      ) : (
        /* Standing / Running / Pushing / Peeking / Dizzy / Spying */
        <g>
          {/* Legs */}
          {pose === 'run' ? (
            <>
              <path d="M0,12 L-14,22 L-20,30" fill="none" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0,12 L13,20 L21,29" fill="none" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="-20" cy="32" rx="6" ry="3.5" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
              <ellipse cx="22" cy="31" rx="6" ry="3.5" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : pose === 'pushRight' ? (
            <>
              <line x1="-2" y1="12" x2="-16" y2="30" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
              <line x1="2" y1="12" x2="7" y2="30" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
              <ellipse cx="-14" cy="32" rx="6" ry="3.5" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
              <ellipse cx="10" cy="32" rx="6" ry="3.5" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : pose === 'pushLeft' ? (
            <>
              <line x1="2" y1="12" x2="16" y2="30" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
              <line x1="-2" y1="12" x2="-7" y2="30" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
              <ellipse cx="14" cy="32" rx="6" ry="3.5" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
              <ellipse cx="-10" cy="32" rx="6" ry="3.5" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : (
            <>
              <line x1="-2" y1="12" x2="-11" y2="30" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
              <line x1="2" y1="12" x2="11" y2="30" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
              <ellipse cx="-10" cy="32" rx="6" ry="3.5" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
              <ellipse cx="12" cy="32" rx="6" ry="3.5" fill={shoeColor} stroke="#0F172A" strokeWidth="1.8" />
            </>
          )}

          {/* Torso */}
          <line x1="0" y1="-10" x2="0" y2="13" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />

          {/* Arms */}
          {pose === 'cheer' || pose === 'crown' || pose === 'hat' ? (
            <>
              <line x1="0" y1="-4" x2="-18" y2="-20" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-4" x2="18" y2="-20" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <circle cx="-19" cy="-21" r="3.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="19" cy="-21" r="3.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : pose === 'pushRight' || pose === 'ballRoll' ? (
            <>
              <line x1="0" y1="-5" x2="22" y2="-9" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="0" x2="22" y2="2" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <circle cx="23" cy="-9" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="23" cy="2" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : pose === 'pushLeft' ? (
            <>
              <line x1="0" y1="-5" x2="-22" y2="-9" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="0" x2="-22" y2="2" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <circle cx="-23" cy="-9" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="-23" cy="2" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : pose === 'flag' ? (
            <>
              <line x1="0" y1="-4" x2="-16" y2="-16" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-4" x2="17" y2="-4" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <circle cx="-17" cy="-17" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="18" cy="-4" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : pose === 'spy' ? (
            <>
              <line x1="0" y1="-4" x2="-14" y2="8" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-4" x2="15" y2="-16" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              {/* Mini magnifying glass */}
              <circle cx="21" cy="-21" r="7" fill="#BAE6FD" fillOpacity="0.7" stroke="#0F172A" strokeWidth="2.4" />
            </>
          ) : pose === 'confused' ? (
            <>
              <path d="M0,-4 Q-16,-8 -12,-24" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-4" x2="15" y2="9" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <text x="16" y="-26" fontSize="16" fontWeight="900" fill="#DC2626">?</text>
            </>
          ) : pose === 'boxTrapped' ? (
            <>
              <line x1="0" y1="-5" x2="-16" y2="-5" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-5" x2="16" y2="-5" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="0" y1="-4" x2="-16" y2="6" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <line x1="0" y1="-4" x2="16" y2="-12" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <circle cx="-17" cy="7" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
              <circle cx="17" cy="-13" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
            </>
          )}

          {/* Head */}
          <circle cx="0" cy="-24" r="13.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.6" />
          {/* Signature single hair strand (unless hat/crown) */}
          {pose !== 'hat' && pose !== 'crown' && (
            <path d="M-2,-37 Q3,-45 7,-39" fill="none" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
          )}

          {/* Face expressions */}
          {pose === 'dizzy' ? (
            <>
              <path d="M-7,-28 L-2,-23 M-2,-28 L-7,-23" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <path d="M2,-28 L7,-23 M7,-28 L2,-23" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <path d="M-4,-17 Q0,-20 4,-17" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <text x="-13" y="-40" fontSize="11">⭐</text>
              <text x="6" y="-42" fontSize="10">🌀</text>
            </>
          ) : pose === 'boxTrapped' ? (
            <>
              <circle cx="-4.5" cy="-26" r="2.2" fill="#0F172A" />
              <circle cx="4.5" cy="-26" r="2.2" fill="#0F172A" />
              <ellipse cx="0" cy="-18" rx="3.4" ry="3.8" fill="#EF4444" stroke="#0F172A" strokeWidth="1.4" />
            </>
          ) : (
            <>
              <circle cx="-4" cy="-26" r="2.1" fill="#0F172A" />
              <circle cx="5" cy="-26" r="2.1" fill="#0F172A" />
              <path d="M-3,-18 Q1,-14 6,-18" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
            </>
          )}
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// SHARED HEADER FOR PRINTABLE A4 LANDSCAPE QUIZ & GAME SHEETS
// ============================================================================
const SheetHeaderBar: React.FC<{
  badge: string;
  title: string;
  subtitle: string;
  accentBg: string;
  accentText: string;
  scoreBox?: string;
  jollaPose?: MiniJollaPose;
  webControls?: React.ReactNode;
}> = ({ badge, title, subtitle, accentBg, accentText, scoreBox, jollaPose = 'cheer', webControls }) => (
  <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b-2 border-slate-800 shrink-0">
    <div className="flex items-center gap-2 min-w-0">
      <MiniJollaman pose={jollaPose} size={30} />
      <span className={`px-2 py-0.5 rounded-md text-xs font-black tracking-tight shrink-0 ${accentBg} ${accentText} border border-slate-800/20`}>
        {badge}
      </span>
      <h2 className="sheet-header-title text-[17px] sm:text-[19px] font-black text-slate-900 tracking-tight truncate">
        {title}
      </h2>
      <span className="hidden sm:inline text-xs font-bold text-slate-500 truncate">
        · {subtitle}
      </span>
    </div>

    <div className="flex items-center gap-2 shrink-0">
      {webControls && <div className="no-print flex items-center gap-1.5">{webControls}</div>}
      <div className="sheet-header-info flex items-center gap-2 text-xs font-bold text-slate-700">
        <span className="whitespace-nowrap">이름: ____________</span>
        {scoreBox && (
          <span className="px-2 py-0.5 border-2 border-slate-700 rounded-md font-black text-slate-900 bg-amber-50 whitespace-nowrap tabular-nums">
            {scoreBox}
          </span>
        )}
      </div>
    </div>
  </div>
);

// ============================================================================
// GAME SHEET 1: 🕵️ 숨은 졸라한글맨 찾기 (자모 크기 미니 졸라맨 7명 숨바꼭질!)
// ============================================================================
interface HiddenJollaSpot {
  id: number;
  letter: string;
  pose: MiniJollaPose;
  clue: string;
  x: number; // %
  y: number; // %
  color: string;
}

const HIDDEN_SPOTS: HiddenJollaSpot[] = [
  { id: 1, letter: 'ㅅ', pose: 'peek', clue: 'ㅅ 지붕 밑에 쏙!', x: 14, y: 24, color: '#DC2626' },
  { id: 2, letter: 'ㅁ', pose: 'boxTrapped', clue: 'ㅁ 상자에 갇혔어!', x: 42, y: 18, color: '#2563EB' },
  { id: 3, letter: 'ㅇ', pose: 'ballRoll', clue: 'ㅇ 공 굴리는 중!', x: 74, y: 22, color: '#059669' },
  { id: 4, letter: 'ㅗ', pose: 'sleep', clue: 'ㅗ 위에서 꿀잠!', x: 26, y: 68, color: '#9333EA' },
  { id: 5, letter: 'ㄱ', pose: 'kick', clue: 'ㄱ 옆에서 날라차기!', x: 56, y: 58, color: '#EA580C' },
  { id: 6, letter: 'ㅏ', pose: 'cheer', clue: 'ㅏ 옆에서 만세!', x: 84, y: 66, color: '#E11D48' },
  { id: 7, letter: 'ㅎ', pose: 'hat', clue: 'ㅎ 모자 쓴 졸라맨!', x: 8, y: 72, color: '#0284C7' },
];

const DECOY_LETTERS = [
  { ch: 'ㄴ', x: 28, y: 22, rot: -8 },
  { ch: 'ㄷ', x: 58, y: 17, rot: 7 },
  { ch: 'ㄹ', x: 88, y: 22, rot: -5 },
  { ch: 'ㅂ', x: 6, y: 47, rot: 6 },
  { ch: 'ㅈ', x: 24, y: 44, rot: -9 },
  { ch: 'ㅊ', x: 41, y: 46, rot: 5 },
  { ch: 'ㅋ', x: 69, y: 44, rot: -7 },
  { ch: 'ㅌ', x: 86, y: 45, rot: 8 },
  { ch: 'ㅍ', x: 42, y: 78, rot: -6 },
  { ch: 'ㅓ', x: 68, y: 78, rot: 9 },
  { ch: 'ㅜ', x: 17, y: 86, rot: -4 },
  { ch: 'ㅡ', x: 55, y: 86, rot: 3 },
  { ch: 'ㅣ', x: 78, y: 86, rot: -6 },
  { ch: 'ㅑ', x: 35, y: 31, rot: 10 },
  { ch: 'ㅕ', x: 64, y: 31, rot: -10 },
  { ch: 'ㅛ', x: 50, y: 36, rot: 4 },
  { ch: 'ㅠ', x: 14, y: 54, rot: -6 },
];

export const JollaHiddenLettersSheet: React.FC = () => {
  const [foundIds, setFoundIds] = useState<number[]>([]);

  const handleSpotClick = (spot: HiddenJollaSpot) => {
    playCutePop();
    speakKorean(spot.letter, 0.85);
    setFoundIds((prev) => {
      if (prev.includes(spot.id)) return prev;
      const next = [...prev, spot.id];
      if (next.length === HIDDEN_SPOTS.length) {
        setTimeout(() => playSuccessChime(), 160);
      }
      return next;
    });
  };

  return (
    <div
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      <SheetHeaderBar
        badge="졸라게임 ①"
        title="숨은 졸라한글맨 7명을 찾아라!"
        subtitle="글자 크기의 작은 졸라맨을 찾아 동그라미 치고 글자를 쓰세요!"
        accentBg="bg-rose-200"
        accentText="text-rose-950"
        scoreBox={`발견: ${foundIds.length > 0 ? foundIds.length : '  '} / 7`}
        jollaPose="spy"
        webControls={
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setFoundIds([]);
            }}
            className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            초기화
          </button>
        }
      />

      {/* Big Playfield Canvas */}
      <div className="relative flex-1 rounded-xl border-2 border-slate-800 bg-[#FFFDF5] overflow-hidden min-h-[385px]">
        {/* Subtle notebook grid lines */}
        <div
          className="absolute inset-0 opacity-35 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Decoy Jamo Letters */}
        {DECOY_LETTERS.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              playCutePop();
              speakKorean(d.ch, 0.85);
            }}
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              transform: `translate(-50%, -50%) rotate(${d.rot}deg)`,
            }}
            className="absolute font-badasseugi text-[40px] font-black text-slate-700/80 hover:text-slate-950 cursor-pointer select-none leading-none transition-transform hover:scale-110"
          >
            {d.ch}
          </button>
        ))}

        {/* 7 Hidden Mini Jollaman + Jamo Pairings (Exact Jamo Scale!) */}
        {HIDDEN_SPOTS.map((spot) => {
          const isFound = foundIds.includes(spot.id);
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => handleSpotClick(spot)}
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute group flex items-center gap-0.5 px-1.5 py-1 rounded-full cursor-pointer transition-all ${
                isFound
                  ? 'ring-4 ring-rose-500 bg-rose-100/80 scale-105 z-10'
                  : 'hover:bg-amber-100/70'
              }`}
              title={`클릭해서 발견! (${spot.clue})`}
            >
              {spot.letter === 'ㅁ' ? (
                /* Trapped INSIDE ㅁ box! */
                <div className="relative flex items-center justify-center w-12 h-12">
                  <span className="font-badasseugi text-[52px] font-black text-slate-900 leading-none">ㅁ</span>
                  <div className="absolute inset-0 flex items-center justify-center pt-1">
                    <MiniJollaman pose="boxTrapped" size={22} teamColor={spot.color} />
                  </div>
                </div>
              ) : spot.letter === 'ㅗ' ? (
                /* Sleeping ON TOP of ㅗ! */
                <div className="relative flex flex-col items-center -space-y-3">
                  <MiniJollaman pose="sleep" size={24} teamColor={spot.color} />
                  <span className="font-badasseugi text-[44px] font-black text-slate-900 leading-none">ㅗ</span>
                </div>
              ) : spot.letter === 'ㅅ' ? (
                /* Peeking UNDER ㅅ roof! */
                <div className="relative flex flex-col items-center -space-y-5">
                  <span className="font-badasseugi text-[48px] font-black text-slate-900 leading-none">ㅅ</span>
                  <MiniJollaman pose="peek" size={24} teamColor={spot.color} />
                </div>
              ) : (
                <div className="flex items-center -space-x-1">
                  <MiniJollaman pose={spot.pose} size={27} teamColor={spot.color} />
                  <span className="font-badasseugi text-[42px] font-black text-slate-900 leading-none">
                    {spot.letter}
                  </span>
                </div>
              )}
              {isFound && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Collection Checklist (7 slots to write down found letters!) */}
      <div className="mt-2.5 grid grid-cols-7 gap-2 shrink-0">
        {HIDDEN_SPOTS.map((spot) => {
          const isFound = foundIds.includes(spot.id);
          return (
            <div
              key={spot.id}
              className={`rounded-lg border-2 p-1.5 flex flex-col items-center justify-between text-center transition-colors ${
                isFound ? 'border-rose-500 bg-rose-50' : 'border-slate-700 bg-white'
              }`}
            >
              <span className="text-[10px] font-black text-slate-600 leading-tight mb-1 truncate w-full">
                {spot.id}. {spot.clue}
              </span>
              <div className="w-10 h-10 rounded-md border-2 border-dashed border-slate-400 bg-amber-50/40 flex items-center justify-center font-badasseugi text-2xl font-black text-rose-700">
                {isFound ? spot.letter : ''}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};

// ============================================================================
// GAME SHEET 2: 🚩 졸라한글맨 땅따먹기 (2인 주사위 게임 — 보유 자모·기본글자 24칸)
// ============================================================================
interface TerritoryCell {
  id: number;
  text: string;
  special?: 'jump' | 'dizzy' | 'crown';
  specialLabel?: string;
}

const TERRITORY_CELLS: TerritoryCell[] = [
  { id: 0, text: '가' },
  { id: 1, text: '사' },
  { id: 2, text: '자', special: 'jump', specialLabel: '+1칸!' },
  { id: 3, text: '버' },
  { id: 4, text: '터' },
  { id: 5, text: '포' },
  { id: 6, text: '도' },
  { id: 7, text: '구', special: 'dizzy', specialLabel: '1번 쉼' },
  { id: 8, text: '두' },
  { id: 9, text: '스' },
  { id: 10, text: '비' },
  { id: 11, text: '시' },
  { id: 12, text: '지' },
  { id: 13, text: '사자', special: 'crown', specialLabel: '보너스×2' },
  { id: 14, text: '우' },
  { id: 15, text: '유' },
  { id: 16, text: '배' },
  { id: 17, text: '제' },
  { id: 18, text: '과', special: 'jump', specialLabel: '+1칸!' },
  { id: 19, text: '위' },
  { id: 20, text: '돼' },
  { id: 21, text: '의' },
  { id: 22, text: '포도', special: 'dizzy', specialLabel: '1번 쉼' },
  { id: 23, text: '사과', special: 'crown', specialLabel: '보너스×2' },
];

export const JollaTerritoryGameSheet: React.FC = () => {
  const [owners, setOwners] = useState<Record<number, 'red' | 'blue'>>({});
  const [activeTeam, setActiveTeam] = useState<'red' | 'blue'>('red');
  const [diceVal, setDiceVal] = useState<number | null>(null);

  const redScore = useMemo(
    () =>
      Object.entries(owners).reduce((sum, [idStr, team]) => {
        if (team !== 'red') return sum;
        const cell = TERRITORY_CELLS[Number(idStr)];
        return sum + (cell?.special === 'crown' ? 2 : 1);
      }, 0),
    [owners]
  );

  const blueScore = useMemo(
    () =>
      Object.entries(owners).reduce((sum, [idStr, team]) => {
        if (team !== 'blue') return sum;
        const cell = TERRITORY_CELLS[Number(idStr)];
        return sum + (cell?.special === 'crown' ? 2 : 1);
      }, 0),
    [owners]
  );

  const rollDice = () => {
    playCutePop();
    const rolled = Math.floor(Math.random() * 6) + 1;
    setDiceVal(rolled);
  };

  const handleCellClick = (cell: TerritoryCell) => {
    playCutePop();
    speakKorean(cell.text, 0.85);
    setOwners((prev) => {
      if (prev[cell.id] === activeTeam) {
        const copy = { ...prev };
        delete copy[cell.id];
        return copy;
      }
      return { ...prev, [cell.id]: activeTeam };
    });
    if (cell.special !== 'jump') {
      setActiveTeam((t) => (t === 'red' ? 'blue' : 'red'));
    }
  };

  return (
    <div
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      <SheetHeaderBar
        badge="졸라게임 ②"
        title="졸라한글맨 땅따먹기 (2인 주사위 게임)"
        subtitle="주사위 줄(1~6)에서 한 칸 읽고 내 깃발 색칠!"
        accentBg="bg-sky-200"
        accentText="text-sky-950"
        jollaPose="flag"
        webControls={
          <>
            <button
              type="button"
              onClick={rollDice}
              className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5 text-amber-300" />
              주사위 {diceVal ? `[${diceVal}줄]` : '굴리기'}
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setActiveTeam((t) => (t === 'red' ? 'blue' : 'red'));
              }}
              className={`px-2 py-1 rounded-md text-xs font-black border cursor-pointer ${
                activeTeam === 'red'
                  ? 'bg-rose-100 text-rose-800 border-rose-400'
                  : 'bg-sky-100 text-sky-800 border-sky-400'
              }`}
            >
              {activeTeam === 'red' ? '🔴 빨강 차례' : '🔵 파랑 차례'}
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setOwners({});
                setDiceVal(null);
              }}
              className="px-2 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold cursor-pointer"
              title="초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </>
        }
      />

      {/* Column Dice Numbers (1 ~ 6) */}
      <div className="grid grid-cols-6 gap-2 mb-1.5 shrink-0">
        {[1, 2, 3, 4, 5, 6].map((col) => (
          <div
            key={col}
            className={`py-1 rounded-md text-center text-xs font-black border-2 transition-colors ${
              diceVal === col
                ? 'bg-amber-300 border-slate-900 text-slate-950'
                : 'bg-slate-100 border-slate-400 text-slate-700'
            }`}
          >
            🎲 {col}번 줄
          </div>
        ))}
      </div>

      {/* 4×6 Territory Grid */}
      <div className="grid grid-cols-6 grid-rows-4 gap-2 flex-1">
        {TERRITORY_CELLS.map((cell, idx) => {
          const colNum = (idx % 6) + 1;
          const owner = owners[cell.id];
          const isHighlightedCol = diceVal === colNum;

          return (
            <button
              key={cell.id}
              type="button"
              onClick={() => handleCellClick(cell)}
              className={`relative rounded-lg border-2 p-1.5 flex flex-col items-center justify-between cursor-pointer transition-all ${
                owner === 'red'
                  ? 'bg-rose-100 border-rose-500'
                  : owner === 'blue'
                  ? 'bg-sky-100 border-sky-500'
                  : isHighlightedCol
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300'
                  : 'bg-white border-slate-700 hover:bg-slate-50'
              }`}
            >
              {/* Top corner: special event or flag checkbox */}
              <div className="w-full flex items-center justify-between text-[10px] font-black leading-none">
                <span className="text-slate-400 tabular-nums">{idx + 1}</span>
                {cell.specialLabel ? (
                  <span
                    className={`px-1 py-0.5 rounded-xs ${
                      cell.special === 'crown'
                        ? 'bg-amber-200 text-amber-950'
                        : cell.special === 'jump'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    {cell.specialLabel}
                  </span>
                ) : (
                  <span className="text-slate-400">🚩□</span>
                )}
              </div>

              {/* Center Big Hangul + Mini Jollaman */}
              <div className="flex items-center justify-center gap-1 my-auto">
                <span className="font-badasseugi text-[30px] sm:text-[32px] font-black text-slate-900 leading-none">
                  {cell.text}
                </span>
                {owner ? (
                  <MiniJollaman
                    pose="flag"
                    size={24}
                    teamColor={owner === 'red' ? '#EF4444' : '#2563EB'}
                  />
                ) : cell.special === 'jump' ? (
                  <MiniJollaman pose="kick" size={22} teamColor="#10B981" />
                ) : cell.special === 'dizzy' ? (
                  <MiniJollaman pose="dizzy" size={22} teamColor="#7C3AED" />
                ) : cell.special === 'crown' ? (
                  <MiniJollaman pose="crown" size={22} teamColor="#D97706" />
                ) : null}
              </div>

              <div className="w-full h-1" />
            </button>
          );
        })}
      </div>

      {/* Bottom 2-Player Scoreboard & Rule Strip */}
      <div className="mt-2 flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border-2 border-slate-700 bg-slate-50 text-xs font-bold shrink-0">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="font-black text-slate-900">규칙:</span>
          <span>① 주사위 굴리기(1~6줄) → ② 소리 내어 읽기 → ③ 내 색으로 깃발 칠하기!</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 tabular-nums">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 border border-rose-400 text-rose-900 font-black">
            <MiniJollaman pose="flag" size={18} teamColor="#EF4444" />
            빨강: {redScore > 0 ? redScore : '   '}점
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-100 border border-sky-400 text-sky-900 font-black">
            <MiniJollaman pose="flag" size={18} teamColor="#2563EB" />
            파랑: {blueScore > 0 ? blueScore : '   '}점
          </span>
        </div>
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};

// ============================================================================
// GAME SHEET 3: 🌀 졸라한글맨 낱말 미로 탈출 (보유 7낱말 길: 사자→버터→포도→구두→우유→가지→사과)
// ============================================================================
interface MazeCell {
  r: number;
  c: number;
  ch: string;
  stepIndex: number | null; // 0..13 for valid path, null for trap
  isTrapJolla?: boolean;
}

// 4 rows × 7 cols = 28 cells. Continuous 14-step orthogonal snake path!
// Path:
// (0,0)사 -> (0,1)자 -> (1,1)버 -> (2,1)터 -> (2,2)포 -> (1,2)도 -> (1,3)구 -> (0,3)두
// -> (0,4)우 -> (1,4)유 -> (2,4)가 -> (2,5)지 -> (3,5)사 -> (3,6)과
const MAZE_PATH: [number, number, string][] = [
  [0, 0, '사'],
  [0, 1, '자'],
  [1, 1, '버'],
  [2, 1, '터'],
  [2, 2, '포'],
  [1, 2, '도'],
  [1, 3, '구'],
  [0, 3, '두'],
  [0, 4, '우'],
  [1, 4, '유'],
  [2, 4, '가'],
  [2, 5, '지'],
  [3, 5, '사'],
  [3, 6, '과'],
];

const MAZE_DECOYS: Record<string, { ch: string; trap?: boolean }> = {
  '0-2': { ch: '다', trap: true },
  '0-5': { ch: '마' },
  '0-6': { ch: '라', trap: true },
  '1-0': { ch: '파' },
  '1-5': { ch: '너', trap: true },
  '1-6': { ch: '커' },
  '2-0': { ch: '리', trap: true },
  '2-3': { ch: '모', trap: true },
  '2-6': { ch: '수' },
  '3-0': { ch: '나' },
  '3-1': { ch: '허', trap: true },
  '3-2': { ch: '고' },
  '3-3': { ch: '미' },
  '3-4': { ch: '바', trap: true },
};

const MAZE_WORDS = ['사자', '버터', '포도', '구두', '우유', '가지', '사과'];

const MAZE_GRID: MazeCell[][] = Array.from({ length: 4 }, (_, r) =>
  Array.from({ length: 7 }, (_, c) => {
    const pIdx = MAZE_PATH.findIndex(([pr, pc]) => pr === r && pc === c);
    if (pIdx >= 0) {
      return { r, c, ch: MAZE_PATH[pIdx][2], stepIndex: pIdx };
    }
    const dec = MAZE_DECOYS[`${r}-${c}`] || { ch: '나' };
    return { r, c, ch: dec.ch, stepIndex: null, isTrapJolla: Boolean(dec.trap) };
  })
);

export const JollaMazeGameSheet: React.FC = () => {
  const [progressStep, setProgressStep] = useState<number>(0); // starts at (0,0) '사'
  const [wrongKey, setWrongKey] = useState<string | null>(null);

  const isGoalReached = progressStep === MAZE_PATH.length - 1;

  const handleCellClick = (cell: MazeCell) => {
    speakKorean(cell.ch, 0.85);
    if (cell.stepIndex === progressStep + 1) {
      playCutePop();
      setWrongKey(null);
      setProgressStep(cell.stepIndex);
      if (cell.stepIndex === MAZE_PATH.length - 1) {
        setTimeout(() => playSuccessChime(), 180);
      }
    } else if (cell.stepIndex !== null && cell.stepIndex <= progressStep) {
      playCutePop();
      setWrongKey(null);
    } else {
      playCutePop();
      setWrongKey(`${cell.r}-${cell.c}`);
      setTimeout(() => setWrongKey(null), 650);
    }
  };

  return (
    <div
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      <SheetHeaderBar
        badge="졸라게임 ③"
        title="졸라한글맨 낱말 미로 탈출!"
        subtitle="아래 7개 그림 순서대로 글자를 밟고 사과까지 탈출하세요!"
        accentBg="bg-emerald-200"
        accentText="text-emerald-950"
        scoreBox={isGoalReached ? '🎉 탈출 성공!' : `진행: ${progressStep + 1} / 14`}
        jollaPose={isGoalReached ? 'crown' : 'run'}
        webControls={
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setProgressStep(0);
              setWrongKey(null);
            }}
            className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            처음부터
          </button>
        }
      />

      {/* Top 7 Picture Clues Strip (100% existing Basic Letters SVG Illustrations!) */}
      <div className="grid grid-cols-7 gap-1.5 mb-2 shrink-0">
        {MAZE_WORDS.map((word, wIdx) => {
          const isCompleted = progressStep >= wIdx * 2 + 1;
          return (
            <button
              key={word}
              type="button"
              onClick={() => {
                playCutePop();
                speakKorean(word, 0.85);
              }}
              className={`rounded-lg border-2 px-1.5 py-1 flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                isCompleted
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-300 bg-amber-50/30 hover:border-amber-400'
              }`}
              title={`${wIdx + 1}번 힌트 소리 듣기`}
            >
              <span className="text-[11px] font-black text-slate-500">{wIdx + 1}.</span>
              <span className="w-9 h-9 flex items-center justify-center [&>svg]:w-9 [&>svg]:h-9">
                {BASIC_LETTERS_ILLUSTRATIONS[word]}
              </span>
              {isCompleted && <span className="text-xs font-black text-emerald-700">✓</span>}
            </button>
          );
        })}
      </div>

      {/* 4×7 Maze Board */}
      <div className="grid grid-cols-7 grid-rows-4 gap-2 flex-1">
        {MAZE_GRID.flat().map((cell) => {
          const cellKey = `${cell.r}-${cell.c}`;
          const isStart = cell.r === 0 && cell.c === 0;
          const isGoal = cell.r === 3 && cell.c === 6;
          const isCurrent = cell.stepIndex === progressStep;
          const isVisited = cell.stepIndex !== null && cell.stepIndex <= progressStep;
          const isWrongFlash = wrongKey === cellKey;

          return (
            <button
              key={cellKey}
              type="button"
              onClick={() => handleCellClick(cell)}
              className={`relative rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isWrongFlash
                  ? 'border-rose-600 bg-rose-100 scale-95'
                  : isCurrent
                  ? 'border-emerald-600 bg-emerald-100 ring-2 ring-emerald-400'
                  : isVisited
                  ? 'border-emerald-400 bg-emerald-50/80'
                  : isGoal
                  ? 'border-rose-500 bg-rose-50/60'
                  : 'border-slate-700 bg-white hover:bg-amber-50/50'
              }`}
            >
              {isStart && (
                <span className="absolute top-1 left-1.5 text-[9px] font-black text-emerald-800 bg-emerald-200 px-1 rounded-xs">
                  START
                </span>
              )}
              {isGoal && (
                <span className="absolute top-1 right-1.5 text-[9px] font-black text-rose-800 bg-rose-200 px-1 rounded-xs">
                  GOAL 🍎
                </span>
              )}

              <div className="flex items-center justify-center gap-0.5">
                {isCurrent && (
                  <MiniJollaman pose={isGoalReached ? 'crown' : 'run'} size={28} teamColor="#059669" />
                )}
                {!isCurrent && cell.isTrapJolla && (
                  <MiniJollaman pose="dizzy" size={22} teamColor="#94A3B8" />
                )}
                <span className="font-badasseugi text-[34px] font-black text-slate-900 leading-none">
                  {cell.ch}
                </span>
              </div>

              {isVisited && !isCurrent && (
                <span className="absolute bottom-1 right-1.5 text-[10px] font-black text-emerald-700">
                  ●
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Guide */}
      <div className="mt-2 flex items-center justify-between px-3 py-1 rounded-lg border border-slate-300 bg-slate-50 text-xs font-bold text-slate-700 shrink-0">
        <span>✏️ 종이에서는 색연필로 길을 쭉 이어보세요! (어질어질 졸라맨 칸은 함정!)</span>
        <span className="font-black text-emerald-800">사자 → 버터 → 포도 → 구두 → 우유 → 가지 → 사과</span>
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};

// ============================================================================
// GAME SHEET 4: 🎯 졸라한글맨 3×3 초스피드 빙고 (가로 1장에 2판! A판 자음모음 / B판 기본글자)
// ============================================================================
const BINGO_A_BANK = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'];
const BINGO_B_BANK = ['사자', '버터', '포도', '구두', '버스', '가지', '우유', '사과', '가위', '시계', '돼지', '의사'];

const BINGO_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function shufflePick8(list: string[]): string[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 8);
}

function countBingoLines(marked: boolean[]): number {
  return BINGO_LINES.filter((line) => line.every((idx) => marked[idx])).length;
}

const SingleBingoBoard: React.FC<{
  title: string;
  subtitle: string;
  bank: string[];
  accentBorder: string;
  accentBg: string;
  jollaColor: string;
  autoFilled: boolean;
  seed: number;
}> = ({ title, subtitle, bank, accentBorder, accentBg, jollaColor, autoFilled, seed }) => {
  const cells = useMemo(() => {
    if (!autoFilled) {
      return Array.from({ length: 9 }, (_, i) => (i === 4 ? 'FREE' : ''));
    }
    const picked = shufflePick8(bank);
    return [
      picked[0],
      picked[1],
      picked[2],
      picked[3],
      'FREE',
      picked[4],
      picked[5],
      picked[6],
      picked[7],
    ];
  }, [autoFilled, bank, seed]);

  const [marked, setMarked] = useState<boolean[]>(() =>
    Array.from({ length: 9 }, (_, i) => i === 4)
  );

  // Reset marks when mode/seed toggles
  React.useEffect(() => {
    setMarked(Array.from({ length: 9 }, (_, i) => i === 4));
  }, [autoFilled, seed]);

  const bingoCount = countBingoLines(marked);

  const toggleCell = (idx: number) => {
    if (idx === 4) {
      playCutePop();
      return;
    }
    const txt = cells[idx];
    if (txt) speakKorean(txt, 0.85);
    playCutePop();
    setMarked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      if (countBingoLines(next) > countBingoLines(prev)) {
        setTimeout(() => playSuccessChime(), 140);
      }
      return next;
    });
  };

  return (
    <div className={`rounded-xl border-2 ${accentBorder} p-2.5 bg-white flex flex-col justify-between h-full`}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <MiniJollaman pose={bingoCount > 0 ? 'crown' : 'cheer'} size={26} teamColor={jollaColor} />
          <div>
            <h3 className="text-[15px] font-black text-slate-900 leading-tight">{title}</h3>
            <p className="text-[10.5px] font-bold text-slate-500 leading-tight">{subtitle}</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-md text-xs font-black ${accentBg} text-slate-900 tabular-nums`}>
          빙고: {bingoCount}줄
        </span>
      </div>

      {/* 3×3 Bingo Grid */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2 flex-1 my-1">
        {cells.map((txt, idx) => {
          const isFree = idx === 4;
          const isMarked = marked[idx];

          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleCell(idx)}
              className={`relative rounded-xl border-2 flex flex-col items-center justify-center min-h-[96px] cursor-pointer transition-all ${
                isFree
                  ? 'border-amber-500 bg-amber-50'
                  : isMarked
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-slate-700 bg-white hover:bg-slate-50'
              }`}
            >
              {isFree ? (
                <div className="flex flex-col items-center">
                  <MiniJollaman pose="crown" size={32} teamColor={jollaColor} />
                  <span className="text-[10px] font-black text-amber-900 mt-0.5">★ 공짜 칸!</span>
                </div>
              ) : (
                <>
                  <span className="font-badasseugi text-[32px] font-black text-slate-900 leading-none">
                    {txt}
                  </span>
                  {isMarked && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="w-16 h-16 rounded-full border-[5px] border-rose-500/80" />
                    </span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Word Bank */}
      <div className="mt-1.5 rounded-lg border border-slate-300 bg-slate-50 px-2 py-1.5">
        <div className="text-[10px] font-black text-slate-500 mb-1">
          ✏️ 아래에서 8개를 골라 빈칸에 쓰세요 (클릭하면 소리 재생)
        </div>
        <div className="flex flex-wrap gap-1">
          {bank.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                playCutePop();
                speakKorean(item, 0.85);
              }}
              className="px-1.5 py-0.5 rounded-sm bg-white border border-slate-300 font-badasseugi text-sm font-black text-slate-900 hover:bg-amber-100 cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const JollaBingoGameSheet: React.FC = () => {
  const [autoFilled, setAutoFilled] = useState(false);
  const [seed, setSeed] = useState(1);

  return (
    <div
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      <SheetHeaderBar
        badge="졸라게임 ④"
        title="졸라한글맨 3×3 초스피드 빙고 (2판 1장!)"
        subtitle="가운데 점선으로 잘라 짝꿍과 나눠 쓰거나 2라운드 도전!"
        accentBg="bg-purple-200"
        accentText="text-purple-950"
        jollaPose="crown"
        webControls={
          <>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setAutoFilled(true);
                setSeed((s) => s + 1);
              }}
              className="px-2.5 py-1 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              웹 랜덤 채우기
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setAutoFilled(false);
              }}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              인쇄용 빈칸
            </button>
          </>
        }
      />

      {/* Side-by-side 2 Bingo Boards with Cut Line */}
      <div className="grid grid-cols-2 gap-4 flex-1 relative">
        <div className="hidden sm:block pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-slate-300" />
        <SingleBingoBoard
          title="A판 · 자음·모음 빙고"
          subtitle="선생님이 부르는 자음·모음에 ○!"
          bank={BINGO_A_BANK}
          accentBorder="border-amber-500"
          accentBg="bg-amber-200"
          jollaColor="#EA580C"
          autoFilled={autoFilled}
          seed={seed}
        />
        <SingleBingoBoard
          title="B판 · 기본글자 낱말 빙고"
          subtitle="배운 낱말 8개를 써서 빙고 완성!"
          bank={BINGO_B_BANK}
          accentBorder="border-purple-500"
          accentBg="bg-purple-200"
          jollaColor="#7C3AED"
          autoFilled={autoFilled}
          seed={seed + 100}
        />
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};
