import React, { useState, useMemo } from 'react';
import { RotateCcw, CheckCircle2, Eye, EyeOff, Dices, Sparkles } from 'lucide-react';
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
// SHEET 1: 쪽지시험 ① — [자음·모음] 3분 툭! 쪽지시험 (단답형 10문항)
// ============================================================================
const QUIZ1_Q1_ITEMS: { char: string; type: 'C' | 'V'; pose: MiniJollaPose }[] = [
  { char: 'ㅏ', type: 'V', pose: 'cheer' },
  { char: 'ㅁ', type: 'C', pose: 'boxTrapped' },
  { char: 'ㅗ', type: 'V', pose: 'sleep' },
  { char: 'ㅅ', type: 'C', pose: 'peek' },
];

const QUIZ1_Q2_ITEMS: { seq: [string, string, string, string]; blankIdx: number; answer: string }[] = [
  { seq: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'], blankIdx: 2, answer: 'ㄷ' },
  { seq: ['ㅁ', 'ㅂ', 'ㅅ', 'ㅇ'], blankIdx: 2, answer: 'ㅅ' },
  { seq: ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ'], blankIdx: 2, answer: 'ㅓ' },
];

const QUIZ1_Q3_ITEMS: { left: string; right: string; answer: string }[] = [
  { left: 'ㄱ', right: 'ㄱ', answer: 'ㄲ' },
  { left: 'ㅗ', right: 'ㅏ', answer: 'ㅘ' },
  { left: 'ㅜ', right: 'ㅓ', answer: 'ㅝ' },
];

export const HangeulQuizJamoSheet: React.FC = () => {
  const [q1Ans, setQ1Ans] = useState<Record<number, 'C' | 'V' | ''>>({});
  const [q2Ans, setQ2Ans] = useState<Record<number, string>>({});
  const [q3Ans, setQ3Ans] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const cycleQ1 = (idx: number) => {
    playCutePop();
    setChecked(false);
    setQ1Ans((prev) => {
      const cur = prev[idx] || '';
      const next = cur === '' ? 'C' : cur === 'C' ? 'V' : '';
      return { ...prev, [idx]: next };
    });
  };

  const score = useMemo(() => {
    let s = 0;
    QUIZ1_Q1_ITEMS.forEach((item, i) => {
      if (q1Ans[i] === item.type) s += 1;
    });
    QUIZ1_Q2_ITEMS.forEach((item, i) => {
      if ((q2Ans[i] || '').trim() === item.answer) s += 1;
    });
    QUIZ1_Q3_ITEMS.forEach((item, i) => {
      if ((q3Ans[i] || '').trim() === item.answer) s += 1;
    });
    return s;
  }, [q1Ans, q2Ans, q3Ans]);

  const handleGrade = () => {
    setChecked(true);
    if (score >= 8) playSuccessChime();
    else playCutePop();
  };

  const handleReset = () => {
    playCutePop();
    setQ1Ans({});
    setQ2Ans({});
    setQ3Ans({});
    setChecked(false);
    setShowKey(false);
  };

  return (
    <div
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-800 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      <SheetHeaderBar
        badge="쪽지시험 ①"
        title="한글 자음·모음 3분 쪽지시험"
        subtitle="단답형 · 가볍게 툭!"
        accentBg="bg-amber-200"
        accentText="text-amber-950"
        scoreBox={checked ? `점수: ${score} / 10` : '점수:     / 10'}
        jollaPose={checked && score === 10 ? 'crown' : 'cheer'}
        webControls={
          <>
            <button
              type="button"
              onClick={handleGrade}
              className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              채점
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setShowKey((v) => !v);
              }}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showKey ? '정답 숨김' : '정답'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-2 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="다시 풀기"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </>
        }
      />

      {/* Body Grid: Top Row (Q1) + Bottom Row (Q2 Left | Q3 Right) */}
      <div className="flex-1 flex flex-col justify-between gap-3">
        {/* Q1: 자음 ○ / 모음 △ */}
        <section className="rounded-lg border-2 border-slate-700 p-3 bg-amber-50/30">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black inline-flex items-center justify-center">1</span>
              <h3 className="text-[15px] font-black text-slate-900">
                자음은 <span className="text-sky-700">○</span>, 모음은 <span className="text-rose-600">△</span> 표시하세요.
              </h3>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-400 text-xs font-black text-slate-700">
              <span>예시</span>
              <span className="font-badasseugi text-lg text-slate-900">ㄱ</span>
              <span>→</span>
              <span className="text-sky-700 text-base">○</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {QUIZ1_Q1_ITEMS.map((item, idx) => {
              const val = q1Ans[idx] || '';
              const isCorrect = checked && val === item.type;
              const isWrong = checked && val !== item.type;
              const displaySymbol = showKey
                ? item.type === 'C'
                  ? '○'
                  : '△'
                : val === 'C'
                ? '○'
                : val === 'V'
                ? '△'
                : '';

              return (
                <div
                  key={item.char}
                  onClick={() => cycleQ1(idx)}
                  className={`relative rounded-lg border-2 p-2.5 bg-white flex items-center justify-between cursor-pointer transition-colors ${
                    isCorrect
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : isWrong
                      ? 'border-rose-500 bg-rose-50/50'
                      : 'border-slate-400 hover:border-amber-500'
                  }`}
                  title="웹에서 클릭하면 ○ / △ 전환"
                >
                  <div className="flex items-center gap-1.5">
                    <MiniJollaman pose={item.pose} size={28} />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakKorean(item.char, 0.85);
                      }}
                      className="font-badasseugi text-4xl font-black text-slate-900 leading-none px-1 cursor-pointer hover:text-amber-700"
                      title="소리 듣기"
                    >
                      {item.char}
                    </button>
                  </div>
                  <div className="w-12 h-12 rounded-lg border-2 border-dashed border-slate-400 bg-slate-50 flex items-center justify-center text-2xl font-black">
                    <span className={displaySymbol === '○' ? 'text-sky-600' : 'text-rose-600'}>
                      {displaySymbol}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom 2-Column Split: Q2 (순서 빈칸) + Q3 (합체 변신) */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {/* Q2: 빠진 글자 쓰기 */}
          <section className="rounded-lg border-2 border-slate-700 p-3 bg-sky-50/25 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black inline-flex items-center justify-center">2</span>
                <h3 className="text-[15px] font-black text-slate-900">빠진 글자를 쓰세요.</h3>
              </div>
              <MiniJollaman pose="confused" size={28} />
            </div>

            <div className="space-y-2.5 flex-1 flex flex-col justify-center">
              {QUIZ1_Q2_ITEMS.map((item, idx) => {
                const val = showKey ? item.answer : q2Ans[idx] || '';
                const isCorrect = checked && (q2Ans[idx] || '').trim() === item.answer;
                const isWrong = checked && (q2Ans[idx] || '').trim() !== item.answer;

                return (
                  <div key={idx} className="flex items-center justify-between gap-1.5 bg-white rounded-lg border border-slate-300 px-3 py-2">
                    {item.seq.map((ch, cIdx) => {
                      const isBlank = cIdx === item.blankIdx;
                      return (
                        <React.Fragment key={cIdx}>
                          {cIdx > 0 && <span className="text-slate-400 font-black">→</span>}
                          {isBlank ? (
                            <input
                              type="text"
                              maxLength={2}
                              value={val}
                              onChange={(e) => {
                                setChecked(false);
                                setQ2Ans((prev) => ({ ...prev, [idx]: e.target.value }));
                              }}
                              aria-label={`순서 문제 ${idx + 1} 빈칸`}
                              placeholder="?"
                              className={`w-12 h-12 rounded-md border-2 text-center font-badasseugi text-3xl font-black focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                                isCorrect
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                  : isWrong
                                  ? 'border-rose-500 bg-rose-50 text-rose-700'
                                  : showKey
                                  ? 'border-sky-500 bg-sky-50 text-sky-800'
                                  : 'border-slate-700 bg-amber-50/40 text-slate-900'
                              }`}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => speakKorean(ch, 0.85)}
                              className="w-11 h-11 rounded-md bg-slate-100 border border-slate-300 font-badasseugi text-3xl font-black text-slate-900 flex items-center justify-center cursor-pointer hover:bg-amber-100"
                            >
                              {ch}
                            </button>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Q3: 합체 변신 */}
          <section className="rounded-lg border-2 border-slate-700 p-3 bg-rose-50/25 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black inline-flex items-center justify-center">3</span>
                <h3 className="text-[15px] font-black text-slate-900">두 글자를 합쳐 쓰세요.</h3>
              </div>
              <div className="flex items-center -space-x-1">
                <MiniJollaman pose="pushRight" size={26} />
                <MiniJollaman pose="pushLeft" size={26} teamColor="#2563EB" />
              </div>
            </div>

            <div className="space-y-2.5 flex-1 flex flex-col justify-center">
              {QUIZ1_Q3_ITEMS.map((item, idx) => {
                const val = showKey ? item.answer : q3Ans[idx] || '';
                const isCorrect = checked && (q3Ans[idx] || '').trim() === item.answer;
                const isWrong = checked && (q3Ans[idx] || '').trim() !== item.answer;

                return (
                  <div key={idx} className="flex items-center justify-between gap-2 bg-white rounded-lg border border-slate-300 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <MiniJollaman pose="pushRight" size={24} />
                      <span className="w-11 h-11 rounded-md bg-amber-100/70 border border-amber-400 font-badasseugi text-3xl font-black text-slate-900 flex items-center justify-center">
                        {item.left}
                      </span>
                      <span className="font-black text-slate-500 text-lg">+</span>
                      <span className="w-11 h-11 rounded-md bg-rose-100/70 border border-rose-400 font-badasseugi text-3xl font-black text-slate-900 flex items-center justify-center">
                        {item.right}
                      </span>
                      <MiniJollaman pose="pushLeft" size={24} teamColor="#2563EB" />
                    </div>
                    <span className="font-black text-slate-700 text-xl">=</span>
                    <input
                      type="text"
                      maxLength={2}
                      value={val}
                      onChange={(e) => {
                        setChecked(false);
                        setQ3Ans((prev) => ({ ...prev, [idx]: e.target.value }));
                      }}
                      aria-label={`합체 문제 ${idx + 1}`}
                      placeholder="?"
                      className={`w-14 h-12 rounded-md border-2 text-center font-badasseugi text-3xl font-black focus:outline-none focus:ring-2 focus:ring-rose-400 ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : isWrong
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : showKey
                          ? 'border-rose-500 bg-rose-50 text-rose-800'
                          : 'border-slate-700 bg-amber-50/40 text-slate-900'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer Stamp Strip */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <MiniJollaman pose="run" size={24} />
            <span>해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-700 font-black">졸라맨 도장:</span>
            <span className="px-2 py-0.5 rounded-full border border-dashed border-amber-500 bg-white text-amber-800 font-black">
              {checked && score >= 8 ? '🌟 최고예요!' : '□ 참 잘했어요!'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SHEET 2: 쪽지시험 ② — [기본글자] 3분 툭! 쪽지시험 (100% 보유 데이터 & 일러스트!)
// ============================================================================
const QUIZ2_COMBINE_ITEMS = [
  { c: 'ㅅ', v: 'ㅏ', ans: '사' },
  { c: 'ㅍ', v: 'ㅗ', ans: '포' },
  { c: 'ㅂ', v: 'ㅓ', ans: '버' },
  { c: 'ㄱ', v: 'ㅜ', ans: '구' },
];

const QUIZ2_FILL_ITEMS: { word: string; given: string; blankPos: 0 | 1; ans: string }[] = [
  { word: '사자', given: '사', blankPos: 1, ans: '자' },
  { word: '포도', given: '도', blankPos: 0, ans: '포' },
  { word: '버스', given: '버', blankPos: 1, ans: '스' },
  { word: '우유', given: '우', blankPos: 1, ans: '유' },
];

const QUIZ2_FULL_WORDS = [
  { word: '사과', hintSyllables: ['사', '과'] },
  { word: '가위', hintSyllables: ['가', '위'] },
];

export const HangeulQuizBasicSheet: React.FC = () => {
  const [combineAns, setCombineAns] = useState<Record<number, string>>({});
  const [fillAns, setFillAns] = useState<Record<number, string>>({});
  const [fullAns, setFullAns] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const score = useMemo(() => {
    let s = 0;
    QUIZ2_COMBINE_ITEMS.forEach((it, i) => {
      if ((combineAns[i] || '').trim() === it.ans) s += 1;
    });
    QUIZ2_FILL_ITEMS.forEach((it, i) => {
      if ((fillAns[i] || '').trim() === it.ans) s += 1;
    });
    QUIZ2_FULL_WORDS.forEach((it, i) => {
      if ((fullAns[i] || '').trim() === it.word) s += 1;
    });
    return s;
  }, [combineAns, fillAns, fullAns]);

  const handleGrade = () => {
    setChecked(true);
    if (score >= 8) playSuccessChime();
    else playCutePop();
  };

  const handleReset = () => {
    playCutePop();
    setCombineAns({});
    setFillAns({});
    setFullAns({});
    setChecked(false);
    setShowKey(false);
  };

  return (
    <div
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-800 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      <SheetHeaderBar
        badge="쪽지시험 ②"
        title="한글 기본글자 3분 쪽지시험"
        subtitle="배운 낱말(사자·포도·버스·우유·사과·가위)만 출제!"
        accentBg="bg-emerald-200"
        accentText="text-emerald-950"
        scoreBox={checked ? `점수: ${score} / 10` : '점수:     / 10'}
        jollaPose={checked && score === 10 ? 'crown' : 'kick'}
        webControls={
          <>
            <button
              type="button"
              onClick={handleGrade}
              className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              채점
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setShowKey((v) => !v);
              }}
              className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showKey ? '정답 숨김' : '정답'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-2 py-1 rounded-md bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
              title="다시 풀기"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </>
        }
      />

      <div className="flex-1 flex flex-col justify-between gap-2.5">
        {/* Q1: 자음 + 모음 합쳐 쓰기 (4문항) */}
        <section className="rounded-lg border-2 border-slate-700 p-2.5 bg-amber-50/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black inline-flex items-center justify-center">1</span>
              <h3 className="text-[14.5px] font-black text-slate-900">자음과 모음을 합쳐 쓰세요.</h3>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-400 text-xs font-black">
              <span>예시</span>
              <span className="font-badasseugi text-base">ㄱ+ㅏ=</span>
              <span className="font-badasseugi text-lg text-amber-700">가</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {QUIZ2_COMBINE_ITEMS.map((item, idx) => {
              const val = showKey ? item.ans : combineAns[idx] || '';
              const isCorrect = checked && (combineAns[idx] || '').trim() === item.ans;
              const isWrong = checked && (combineAns[idx] || '').trim() !== item.ans;

              return (
                <div key={idx} className="rounded-lg border border-slate-400 bg-white px-2.5 py-2 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-0.5 font-badasseugi text-2xl font-black text-slate-900">
                    <span className="text-sky-700">{item.c}</span>
                    <span className="text-slate-400 text-base">+</span>
                    <span className="text-rose-600">{item.v}</span>
                    <span className="text-slate-500 text-base">=</span>
                  </div>
                  <input
                    type="text"
                    maxLength={2}
                    value={val}
                    onChange={(e) => {
                      setChecked(false);
                      setCombineAns((prev) => ({ ...prev, [idx]: e.target.value }));
                    }}
                    aria-label={`합치기 ${idx + 1}`}
                    className={`w-12 h-11 rounded-md border-2 text-center font-badasseugi text-2xl font-black focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      isCorrect
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : isWrong
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : showKey
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-700 bg-amber-50/30 text-slate-900'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* Q2: 그림 보고 빠진 한 글자 쓰기 (4문항 — 보유 일러스트!) */}
        <section className="rounded-lg border-2 border-slate-700 p-2.5 bg-emerald-50/25">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black inline-flex items-center justify-center">2</span>
              <h3 className="text-[14.5px] font-black text-slate-900">그림을 보고 빈칸에 알맞은 한 글자를 쓰세요.</h3>
            </div>
            <MiniJollaman pose="spy" size={26} />
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {QUIZ2_FILL_ITEMS.map((item, idx) => {
              const val = showKey ? item.ans : fillAns[idx] || '';
              const isCorrect = checked && (fillAns[idx] || '').trim() === item.ans;
              const isWrong = checked && (fillAns[idx] || '').trim() !== item.ans;

              return (
                <div key={item.word} className="rounded-lg border border-slate-400 bg-white p-2 flex flex-col items-center justify-between gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      speakKorean(item.word, 0.85);
                    }}
                    className="w-16 h-16 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform [&>svg]:w-16 [&>svg]:h-16"
                    title="그림 클릭해서 소리 듣기"
                  >
                    {BASIC_LETTERS_ILLUSTRATIONS[item.word]}
                  </button>

                  <div className="flex items-center gap-1.5">
                    {[0, 1].map((pos) =>
                      pos === item.blankPos ? (
                        <input
                          key={pos}
                          type="text"
                          maxLength={2}
                          value={val}
                          onChange={(e) => {
                            setChecked(false);
                            setFillAns((prev) => ({ ...prev, [idx]: e.target.value }));
                          }}
                          aria-label={`${item.word} 빈칸`}
                          className={`w-11 h-11 rounded-md border-2 text-center font-badasseugi text-2xl font-black focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                            isCorrect
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                              : isWrong
                              ? 'border-rose-500 bg-rose-50 text-rose-700'
                              : showKey
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                              : 'border-slate-800 bg-amber-50/40 text-slate-900'
                          }`}
                        />
                      ) : (
                        <span
                          key={pos}
                          className="w-11 h-11 rounded-md border border-slate-300 bg-slate-100 font-badasseugi text-2xl font-black text-slate-900 flex items-center justify-center"
                        >
                          {item.given}
                        </span>
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Q3: 그림 보고 낱말 쓰기 (보너스 2문항 + 글자 힌트 은행) */}
        <section className="rounded-lg border-2 border-slate-700 p-2.5 bg-sky-50/25">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black inline-flex items-center justify-center">3</span>
              <h3 className="text-[14.5px] font-black text-slate-900">그림을 보고 낱말을 쓰세요.</h3>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-slate-400 text-xs font-black text-slate-700">
              <span>글자 보기:</span>
              {['과', '위', '사', '가'].map((ch) => (
                <span key={ch} className="font-badasseugi text-base text-sky-900 px-1 bg-sky-100 rounded-xs">
                  {ch}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {QUIZ2_FULL_WORDS.map((item, idx) => {
              const val = showKey ? item.word : fullAns[idx] || '';
              const isCorrect = checked && (fullAns[idx] || '').trim() === item.word;
              const isWrong = checked && (fullAns[idx] || '').trim() !== item.word;

              return (
                <div key={item.word} className="rounded-lg border border-slate-400 bg-white px-4 py-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <MiniJollaman pose={idx === 0 ? 'cheer' : 'run'} size={28} />
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        speakKorean(item.word, 0.85);
                      }}
                      className="w-15 h-15 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform [&>svg]:w-15 [&>svg]:h-15"
                      title="그림 클릭해서 소리 듣기"
                    >
                      {BASIC_LETTERS_ILLUSTRATIONS[item.word]}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={val}
                      onChange={(e) => {
                        setChecked(false);
                        setFullAns((prev) => ({ ...prev, [idx]: e.target.value }));
                      }}
                      aria-label={`낱말 쓰기 ${idx + 1}`}
                      placeholder="두 글자 쓰기"
                      className={`w-36 h-12 rounded-md border-2 text-center font-badasseugi text-2xl font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                        isCorrect
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                          : isWrong
                          ? 'border-rose-500 bg-rose-50 text-rose-700'
                          : showKey
                          ? 'border-sky-500 bg-sky-50 text-sky-800'
                          : 'border-slate-800 bg-amber-50/40 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};

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
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-800 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
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
        <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
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
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-800 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
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
        <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
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
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-800 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
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
        <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
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
      className="print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-800 p-3 sm:p-4 text-slate-900 flex flex-col justify-between shadow-lg"
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
        <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};
