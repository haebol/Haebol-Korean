import React, { useState } from 'react';
import { Dices, RotateCcw, Sparkles } from 'lucide-react';
import { MiniJollaman, MiniJollaPose } from './HangeulJollaQuizAndGameSheets';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';

// ============================================================================
// SHARED PRINT-SAFE HEADER FOR A4 LANDSCAPE GAME & MOTIVATION SHEETS
// ============================================================================
interface PrintableSheetHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  accentHex: string;
  tintBgHex: string;
  borderHex: string;
  jollaPose: MiniJollaPose;
  rightMeta?: React.ReactNode;
  webControls?: React.ReactNode;
}

const PrintableSheetHeader: React.FC<PrintableSheetHeaderProps> = ({
  badge,
  title,
  subtitle,
  accentHex,
  tintBgHex,
  borderHex,
  jollaPose,
  rightMeta,
  webControls,
}) => (
  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b-2 border-slate-800 shrink-0">
    <div className="flex items-center gap-2.5 min-w-0">
      <div
        className="w-10 h-10 rounded-lg border-2 border-slate-800 flex items-center justify-center shrink-0"
        style={{ backgroundColor: tintBgHex }}
      >
        <MiniJollaman pose={jollaPose} size={34} teamColor={accentHex} />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="px-2 py-0.5 rounded text-[11px] font-black text-white shrink-0"
            style={{ backgroundColor: accentHex }}
          >
            {badge}
          </span>
          <h2 className="text-[19px] font-black text-slate-900 tracking-tight leading-tight truncate">
            {title}
          </h2>
        </div>
        <p className="text-[11.5px] font-bold text-slate-600 mt-0.5 truncate">{subtitle}</p>
      </div>
    </div>

    <div className="flex items-center gap-2 shrink-0">
      {webControls && <div className="no-print flex items-center gap-1.5">{webControls}</div>}
      {rightMeta || (
        <div
          className="px-3 py-1 rounded-lg border-2 text-xs font-black text-slate-800 flex items-center gap-3"
          style={{ borderColor: borderHex, backgroundColor: tintBgHex }}
        >
          <span>날짜: ___월 ___일</span>
          <span>이름: __________</span>
        </div>
      )}
    </div>
  </div>
);

// ============================================================================
// 1. 🚩 자음·모음 땅 차지하기 (졸라맨 주사위 보드게임 — 24칸: 자음 14 + 모음 10)
// ============================================================================
interface JamoTerritoryTile {
  id: number;
  char: string;
  kind: 'consonant' | 'vowel';
  romaja: string;
  special?: 'bonus' | 'jump' | 'rest';
  specialLabel?: string;
}

const JAMO_TERRITORY_TILES: JamoTerritoryTile[] = [
  // Row 1 (1~6): 자음 ㄱ~ㅂ
  { id: 0, char: 'ㄱ', kind: 'consonant', romaja: 'g' },
  { id: 1, char: 'ㄴ', kind: 'consonant', romaja: 'n' },
  { id: 2, char: 'ㄷ', kind: 'consonant', romaja: 'd', special: 'jump', specialLabel: '+1번 더!' },
  { id: 3, char: 'ㄹ', kind: 'consonant', romaja: 'r' },
  { id: 4, char: 'ㅁ', kind: 'consonant', romaja: 'm' },
  { id: 5, char: 'ㅂ', kind: 'consonant', romaja: 'b' },
  // Row 2 (7~12): 자음 ㅅ~ㅌ
  { id: 6, char: 'ㅅ', kind: 'consonant', romaja: 's' },
  { id: 7, char: 'ㅇ', kind: 'consonant', romaja: 'ng', special: 'bonus', specialLabel: '왕관 ×2' },
  { id: 8, char: 'ㅈ', kind: 'consonant', romaja: 'j' },
  { id: 9, char: 'ㅊ', kind: 'consonant', romaja: 'ch' },
  { id: 10, char: 'ㅋ', kind: 'consonant', romaja: 'k', special: 'rest', specialLabel: '1번 쉼' },
  { id: 11, char: 'ㅌ', kind: 'consonant', romaja: 't' },
  // Row 3 (13~18): 자음 ㅍ~ㅎ + 모음 ㅏ~ㅕ
  { id: 12, char: 'ㅍ', kind: 'consonant', romaja: 'p' },
  { id: 13, char: 'ㅎ', kind: 'consonant', romaja: 'h', special: 'bonus', specialLabel: '왕관 ×2' },
  { id: 14, char: 'ㅏ', kind: 'vowel', romaja: 'a' },
  { id: 15, char: 'ㅑ', kind: 'vowel', romaja: 'ya' },
  { id: 16, char: 'ㅓ', kind: 'vowel', romaja: 'eo', special: 'jump', specialLabel: '+1번 더!' },
  { id: 17, char: 'ㅕ', kind: 'vowel', romaja: 'yeo' },
  // Row 4 (19~24): 모음 ㅗ~ㅣ
  { id: 18, char: 'ㅗ', kind: 'vowel', romaja: 'o' },
  { id: 19, char: 'ㅛ', kind: 'vowel', romaja: 'yo', special: 'rest', specialLabel: '1번 쉼' },
  { id: 20, char: 'ㅜ', kind: 'vowel', romaja: 'u' },
  { id: 21, char: 'ㅠ', kind: 'vowel', romaja: 'yu' },
  { id: 22, char: 'ㅡ', kind: 'vowel', romaja: 'eu' },
  { id: 23, char: 'ㅣ', kind: 'vowel', romaja: 'i', special: 'bonus', specialLabel: '왕관 ×2' },
];

const JAMO_AUDIO_MAP: Record<string, string> = {
  ㄱ: '기역', ㄴ: '니은', ㄷ: '디귿', ㄹ: '리을', ㅁ: '미음', ㅂ: '비읍', ㅅ: '시옷',
  ㅇ: '이응', ㅈ: '지읒', ㅊ: '치읓', ㅋ: '키읔', ㅌ: '티읕', ㅍ: '피읖', ㅎ: '히읗',
  ㅏ: '아', ㅑ: '야', ㅓ: '어', ㅕ: '여', ㅗ: '오', ㅛ: '요', ㅜ: '우', ㅠ: '유', ㅡ: '으', ㅣ: '이',
};

export const JollaJamoTerritoryBoardSheet: React.FC = () => {
  const [owners, setOwners] = useState<Record<number, 'red' | 'blue'>>({});
  const [turn, setTurn] = useState<'red' | 'blue'>('red');
  const [dice, setDice] = useState<number | null>(null);

  const calcScore = (team: 'red' | 'blue') =>
    Object.entries(owners).reduce((sum, [idStr, t]) => {
      if (t !== team) return sum;
      const tile = JAMO_TERRITORY_TILES[Number(idStr)];
      return sum + (tile?.special === 'bonus' ? 2 : 1);
    }, 0);

  const redScore = calcScore('red');
  const blueScore = calcScore('blue');

  const handleTileClick = (tile: JamoTerritoryTile) => {
    playCutePop();
    speakKorean(JAMO_AUDIO_MAP[tile.char] || tile.char, 0.88);
    setOwners((prev) => {
      if (prev[tile.id] === turn) {
        const next = { ...prev };
        delete next[tile.id];
        return next;
      }
      return { ...prev, [tile.id]: turn };
    });
    if (tile.special !== 'jump') {
      setTurn((t) => (t === 'red' ? 'blue' : 'red'));
    }
  };

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
      style={{ minHeight: '690px', padding: '16px 22px 14px' }}
    >
      <PrintableSheetHeader
        badge="졸라 보드게임"
        title="자음·모음 땅 차지하기 (졸라맨 주사위 보드게임)"
        subtitle="기본자음 14자 + 기본모음 10자 = 24칸! 주사위를 굴려 읽고 졸라맨 깃발을 내 색깔로 칠해요."
        accentHex="#0284C7"
        tintBgHex="#F0F9FF"
        borderHex="#38BDF8"
        jollaPose="flag"
        webControls={
          <>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setDice(Math.floor(Math.random() * 6) + 1);
              }}
              className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5 text-amber-300" />
              주사위 {dice ? `[${dice}번 줄]` : '굴리기'}
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setTurn((t) => (t === 'red' ? 'blue' : 'red'));
              }}
              className={`px-2 py-1 rounded-md text-xs font-black border cursor-pointer ${
                turn === 'red'
                  ? 'bg-rose-100 border-rose-400 text-rose-800'
                  : 'bg-sky-100 border-sky-400 text-sky-800'
              }`}
            >
              {turn === 'red' ? '🔴 빨강 차례' : '🔵 파랑 차례'}
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setOwners({});
                setDice(null);
              }}
              className="p-1.5 rounded-md bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </>
        }
        rightMeta={
          <div className="flex items-center gap-2 text-[11px] font-black">
            <span className="px-2 py-1 rounded border border-amber-400 bg-amber-50 text-amber-900">
              자음 14칸
            </span>
            <span className="px-2 py-1 rounded border border-sky-400 bg-sky-50 text-sky-900">
              모음 10칸
            </span>
          </div>
        }
      />

      {/* Top Dice Column Header (1 ~ 6) */}
      <div className="grid grid-cols-6 gap-2 mb-2 shrink-0">
        {[1, 2, 3, 4, 5, 6].map((col) => {
          const diceFace = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][col - 1];
          const isRolled = dice === col;
          return (
            <div
              key={col}
              className={`py-1 rounded-lg border-2 text-center flex items-center justify-center gap-1.5 font-black text-xs transition-colors ${
                isRolled
                  ? 'bg-amber-300 border-slate-900 text-slate-950'
                  : 'bg-slate-100 border-slate-700 text-slate-800'
              }`}
            >
              <span className="text-base leading-none">{diceFace}</span>
              <span>{col}번 줄</span>
            </div>
          );
        })}
      </div>

      {/* 6 Columns × 4 Rows = 24 Jamo Territory Grid (100% print-safe div cells!) */}
      <div className="grid grid-cols-6 grid-rows-4 gap-2 flex-1">
        {JAMO_TERRITORY_TILES.map((tile, idx) => {
          const colNum = (idx % 6) + 1;
          const owner = owners[tile.id];
          const isRolledCol = dice === colNum;
          const isConsonant = tile.kind === 'consonant';

          const jollaPose: MiniJollaPose =
            tile.special === 'bonus'
              ? 'crown'
              : tile.special === 'jump'
              ? 'kick'
              : tile.special === 'rest'
              ? 'dizzy'
              : 'flag';

          const jollaShoe =
            owner === 'red'
              ? '#EF4444'
              : owner === 'blue'
              ? '#2563EB'
              : tile.special === 'bonus'
              ? '#D97706'
              : tile.special === 'jump'
              ? '#059669'
              : tile.special === 'rest'
              ? '#7C3AED'
              : isConsonant
              ? '#D97706'
              : '#0284C7';

          return (
            <div
              key={tile.id}
              role="button"
              tabIndex={0}
              onClick={() => handleTileClick(tile)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTileClick(tile);
                }
              }}
              className={`relative rounded-xl border-2 px-2 py-1.5 flex flex-col justify-between cursor-pointer select-none transition-all ${
                owner === 'red'
                  ? 'bg-rose-100 border-rose-500'
                  : owner === 'blue'
                  ? 'bg-sky-100 border-sky-500'
                  : isRolledCol
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-300'
                  : isConsonant
                  ? 'bg-amber-50/35 border-slate-700 hover:bg-amber-50'
                  : 'bg-sky-50/35 border-slate-700 hover:bg-sky-50'
              }`}
            >
              {/* Top Row: Tile number + Category or Special Badge */}
              <div className="flex items-center justify-between text-[10px] font-black leading-none">
                <span className="text-slate-400 tabular-nums">{idx + 1}</span>
                {tile.specialLabel ? (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9.5px] font-black ${
                      tile.special === 'bonus'
                        ? 'bg-amber-200 text-amber-950'
                        : tile.special === 'jump'
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'bg-purple-100 text-purple-900'
                    }`}
                  >
                    {tile.specialLabel}
                  </span>
                ) : (
                  <span
                    className={`px-1 py-0.5 rounded text-[9px] font-extrabold ${
                      isConsonant ? 'bg-amber-100 text-amber-800' : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {isConsonant ? '자음' : '모음'}
                  </span>
                )}
              </div>

              {/* Middle Row: Big Jamo + Same-size Occupying Mini Jollaman */}
              <div className="flex items-center justify-center gap-1.5 my-0.5">
                <span className="font-badasseugi text-[36px] font-black text-slate-900 leading-none">
                  {tile.char}
                </span>
                <div className="flex flex-col items-center">
                  <MiniJollaman pose={jollaPose} size={30} teamColor={jollaShoe} />
                </div>
              </div>

              {/* Bottom Row: Romaja + Color-in Territory Flag Box */}
              <div className="flex items-center justify-between pt-0.5 border-t border-dashed border-slate-300/80">
                <span className="text-[10px] font-bold text-slate-500">[{tile.romaja}]</span>
                <span className="inline-flex items-center gap-1 text-[9.5px] font-black text-slate-600">
                  <span>내 땅</span>
                  <span
                    className={`w-3.5 h-3.5 rounded-sm border-[1.5px] inline-block ${
                      owner === 'red'
                        ? 'bg-rose-500 border-rose-700'
                        : owner === 'blue'
                        ? 'bg-sky-500 border-sky-700'
                        : 'bg-white border-slate-500'
                    }`}
                  />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Printable Game Rules & 2-Player Score Box */}
      <div className="mt-2.5 pt-2 border-t-2 border-slate-800 grid grid-cols-12 gap-3 items-center shrink-0">
        <div className="col-span-8 bg-slate-50 rounded-lg border border-slate-300 px-3 py-1.5 text-[11px] font-bold text-slate-700 leading-snug">
          <div className="font-black text-slate-900 mb-0.5">
            🎲 게임 규칙 (2인 주사위 땅 차지하기 · 준비물: 주사위 1개, 색연필 2색)
          </div>
          <div>
            ① 주사위를 굴려 나온 줄(1~6번 줄)에서 빈 땅 1칸을 골라 <strong>소리 내어 읽어요.</strong>{' '}
            ② 맞게 읽으면 그 칸의 <strong>졸라맨과 □ 칸을 내 색깔로 칠해</strong> 땅을 차지해요!{' '}
            ③ <strong>왕관 ×2</strong>은 2점, <strong>+1번 더!</strong>는 한 번 더 굴려요. 점수가 높은 사람 우승!
          </div>
        </div>
        <div className="col-span-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg border-2 border-rose-400 bg-rose-50 px-2.5 py-1.5 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[11px] font-black text-rose-900">
              <MiniJollaman pose="flag" size={18} teamColor="#EF4444" />
              <span>빨강팀: ______</span>
            </div>
            <div className="text-right text-xs font-black text-rose-700 mt-0.5 tabular-nums">
              점수: {redScore > 0 ? redScore : '    '} 점
            </div>
          </div>
          <div className="rounded-lg border-2 border-sky-400 bg-sky-50 px-2.5 py-1.5 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[11px] font-black text-sky-900">
              <MiniJollaman pose="flag" size={18} teamColor="#2563EB" />
              <span>파랑팀: ______</span>
            </div>
            <div className="text-right text-xs font-black text-sky-700 mt-0.5 tabular-nums">
              점수: {blueScore > 0 ? blueScore : '    '} 점
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};

// ============================================================================
// 2 & 3. 🎯 졸라맨 빙고게임 — 자음 버전 & 모음 버전 (각 A4 가로 1장 = 짝꿍 2판 절취형)
// ============================================================================
const CONSONANT_BANK = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const VOWEL_BASIC_BANK = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];
const VOWEL_BONUS_BANK = ['ㅐ', 'ㅔ'];

const BINGO_WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function pickEight(pool: string[], seedOffset: number): string[] {
  const arr = [...pool];
  // Deterministic-ish shuffle when seed changes
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (i * 7 + seedOffset * 13 + Math.floor(Math.random() * 5)) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 8);
}

interface HalfBingoPanelProps {
  playerLabel: string;
  boardTitle: string;
  bank: string[];
  bonusBank?: string[];
  accentHex: string;
  tintBgHex: string;
  borderHex: string;
  autoFilled: boolean;
  seed: number;
}

const HalfBingoPanel: React.FC<HalfBingoPanelProps> = ({
  playerLabel,
  boardTitle,
  bank,
  bonusBank,
  accentHex,
  tintBgHex,
  borderHex,
  autoFilled,
  seed,
}) => {
  const [filledCells, setFilledCells] = useState<string[]>(() =>
    Array.from({ length: 9 }, (_, i) => (i === 4 ? 'FREE' : ''))
  );
  const [marked, setMarked] = useState<boolean[]>(() =>
    Array.from({ length: 9 }, (_, i) => i === 4)
  );

  React.useEffect(() => {
    if (!autoFilled) {
      setFilledCells(Array.from({ length: 9 }, (_, i) => (i === 4 ? 'FREE' : '')));
    } else {
      const picked = pickEight([...bank, ...(bonusBank || [])], seed);
      setFilledCells([
        picked[0], picked[1], picked[2],
        picked[3], 'FREE', picked[4],
        picked[5], picked[6], picked[7],
      ]);
    }
    setMarked(Array.from({ length: 9 }, (_, i) => i === 4));
  }, [autoFilled, seed, bank, bonusBank]);

  const bingoLines = BINGO_WIN_LINES.filter((line) => line.every((i) => marked[i])).length;

  const handleToggle = (idx: number) => {
    if (idx === 4) {
      playCutePop();
      return;
    }
    const ch = filledCells[idx];
    if (ch) speakKorean(JAMO_AUDIO_MAP[ch] || ch, 0.88);
    playCutePop();
    setMarked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      const prevLines = BINGO_WIN_LINES.filter((l) => l.every((i) => prev[i])).length;
      const nextLines = BINGO_WIN_LINES.filter((l) => l.every((i) => next[i])).length;
      if (nextLines > prevLines) {
        setTimeout(() => playSuccessChime(), 120);
      }
      return next;
    });
  };

  return (
    <div
      className="rounded-xl border-2 bg-white p-3 flex flex-col justify-between h-full"
      style={{ borderColor: accentHex }}
    >
      {/* Top Player Header */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <MiniJollaman pose={bingoLines > 0 ? 'crown' : 'cheer'} size={28} teamColor={accentHex} />
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className="px-1.5 py-0.5 rounded text-[10px] font-black text-white"
                style={{ backgroundColor: accentHex }}
              >
                {playerLabel}
              </span>
              <h3 className="text-[15px] font-black text-slate-900 leading-tight">{boardTitle}</h3>
            </div>
            <div className="text-[10.5px] font-bold text-slate-500 mt-0.5">
              이름: ______________
            </div>
          </div>
        </div>
        <div
          className="px-2 py-1 rounded-lg border text-xs font-black tabular-nums"
          style={{ backgroundColor: tintBgHex, borderColor: borderHex, color: accentHex }}
        >
          빙고: {bingoLines > 0 ? bingoLines : '  '}줄
        </div>
      </div>

      {/* 3×3 Print-Friendly Bingo Grid (with faint handwriting cross-guides!) */}
      <div className="grid grid-cols-3 grid-rows-3 gap-2.5 flex-1 my-1">
        {filledCells.map((ch, idx) => {
          const isFree = idx === 4;
          const isMarked = marked[idx];

          return (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => handleToggle(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggle(idx);
                }
              }}
              className={`relative rounded-xl border-2 flex flex-col items-center justify-center min-h-[104px] cursor-pointer select-none overflow-hidden ${
                isFree
                  ? 'border-amber-500 bg-amber-50/80'
                  : isMarked
                  ? 'border-rose-500 bg-rose-50/70'
                  : 'border-slate-800 bg-white'
              }`}
            >
              {/* Faint handwriting cross-guide for blank paper writing */}
              {!isFree && !ch && (
                <>
                  <div className="pointer-events-none absolute inset-x-3 top-1/2 border-t border-dashed border-slate-200" />
                  <div className="pointer-events-none absolute inset-y-3 left-1/2 border-l border-dashed border-slate-200" />
                </>
              )}

              {isFree ? (
                <div className="flex flex-col items-center justify-center">
                  <MiniJollaman pose="crown" size={38} teamColor={accentHex} />
                  <span className="text-[11px] font-black text-amber-900 mt-0.5">★ 공짜 칸!</span>
                </div>
              ) : (
                <>
                  <span className="font-badasseugi text-[42px] font-black text-slate-900 leading-none relative z-10">
                    {ch}
                  </span>
                  {isMarked && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
                      <span className="w-16 h-16 rounded-full border-[5px] border-rose-500/80" />
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Letter Bank (Print-safe div pills with check dots) */}
      <div
        className="mt-1.5 rounded-lg border px-2.5 py-1.5"
        style={{ backgroundColor: tintBgHex, borderColor: borderHex }}
      >
        <div className="text-[10px] font-black text-slate-700 mb-1 flex items-center justify-between">
          <span>✏️ 아래에서 8개를 골라 빈칸에 쓰고, 부르면 ○ 하세요!</span>
          <span className="text-slate-500">2줄 먼저 완성하면 빙고!</span>
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {bank.map((item) => (
            <span
              key={item}
              role="button"
              tabIndex={0}
              onClick={() => {
                playCutePop();
                speakKorean(JAMO_AUDIO_MAP[item] || item, 0.88);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  speakKorean(JAMO_AUDIO_MAP[item] || item, 0.88);
                }
              }}
              className="inline-flex items-center justify-center min-w-[26px] h-[26px] px-1 rounded bg-white border border-slate-400 font-badasseugi text-[15px] font-black text-slate-900 cursor-pointer hover:bg-amber-100"
            >
              {item}
            </span>
          ))}
          {bonusBank && bonusBank.length > 0 && (
            <>
              <span className="text-[9.5px] font-black text-slate-500 ml-1">보너스:</span>
              {bonusBank.map((item) => (
                <span
                  key={item}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    playCutePop();
                    speakKorean(item, 0.88);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      speakKorean(item, 0.88);
                    }
                  }}
                  className="inline-flex items-center justify-center min-w-[26px] h-[26px] px-1 rounded bg-amber-50 border border-dashed border-amber-500 font-badasseugi text-[15px] font-black text-amber-900 cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const JollaConsonantBingoSheet: React.FC = () => {
  const [autoFilled, setAutoFilled] = useState(false);
  const [seed, setSeed] = useState(1);

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
      style={{ minHeight: '690px', padding: '16px 22px 14px' }}
    >
      <PrintableSheetHeader
        badge="졸라 빙고 · 자음편"
        title="졸라맨 자음 빙고게임 (2판 1장 절취형)"
        subtitle="기본자음 14자 중 8개를 골라 직접 써넣는 3×3 초스피드 빙고! 가운데 점선을 잘라 짝꿍과 나눠요."
        accentHex="#D97706"
        tintBgHex="#FFFBEB"
        borderHex="#F59E0B"
        jollaPose="cheer"
        webControls={
          <>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setAutoFilled(true);
                setSeed((s) => s + 1);
              }}
              className="px-2.5 py-1 rounded-md bg-amber-600 hover:bg-amber-700 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              랜덤 채우기
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setAutoFilled(false);
              }}
              className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              인쇄용 빈칸
            </button>
          </>
        }
        rightMeta={
          <span className="px-2.5 py-1 rounded-lg border border-amber-400 bg-amber-50 text-xs font-black text-amber-900">
            ✂️ 반으로 잘라 2명 사용
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-6 flex-1 relative">
        {/* Center Scissor Cut Line */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-between py-1">
          <span className="text-xs text-slate-400 bg-white px-0.5">✂</span>
          <div className="flex-1 border-l-2 border-dashed border-slate-300 my-1" />
          <span className="text-xs text-slate-400 bg-white px-0.5">✂</span>
        </div>
        <HalfBingoPanel
          playerLabel="1P"
          boardTitle="자음 빙고 (ㄱ~ㅎ)"
          bank={CONSONANT_BANK}
          accentHex="#D97706"
          tintBgHex="#FFFBEB"
          borderHex="#FCD34D"
          autoFilled={autoFilled}
          seed={seed}
        />
        <HalfBingoPanel
          playerLabel="2P"
          boardTitle="자음 빙고 (ㄱ~ㅎ)"
          bank={CONSONANT_BANK}
          accentHex="#EA580C"
          tintBgHex="#FFF7ED"
          borderHex="#FDBA74"
          autoFilled={autoFilled}
          seed={seed + 50}
        />
      </div>

      <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 shrink-0">
        <span className="text-[9.5px] font-medium text-slate-500 font-korean-gothic shrink-0">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
        <span className="text-right">
          <strong>규칙:</strong> ① 자음 14자 중 8개를 빈칸에 써요 → ② 부르는 자음을 찾아 큰 소리로 읽고 ○ 표! → ③ 2줄 완성 시 &quot;빙고!&quot;
        </span>
      </div>
    </div>
  );
};

export const JollaVowelBingoSheet: React.FC = () => {
  const [autoFilled, setAutoFilled] = useState(false);
  const [seed, setSeed] = useState(1);

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
      style={{ minHeight: '690px', padding: '16px 22px 14px' }}
    >
      <PrintableSheetHeader
        badge="졸라 빙고 · 모음편"
        title="졸라맨 모음 빙고게임 (2판 1장 절취형)"
        subtitle="기본모음 10자(+보너스 ㅐ, ㅔ) 중 8개를 골라 직접 쓰는 3×3 모음 빙고! 가운데 점선으로 잘라 써요."
        accentHex="#0284C7"
        tintBgHex="#F0F9FF"
        borderHex="#38BDF8"
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
              className="px-2.5 py-1 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-black flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              랜덤 채우기
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setAutoFilled(false);
              }}
              className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              인쇄용 빈칸
            </button>
          </>
        }
        rightMeta={
          <span className="px-2.5 py-1 rounded-lg border border-sky-400 bg-sky-50 text-xs font-black text-sky-900">
            ✂️ 반으로 잘라 2명 사용
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-6 flex-1 relative">
        <div className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-between py-1">
          <span className="text-xs text-slate-400 bg-white px-0.5">✂</span>
          <div className="flex-1 border-l-2 border-dashed border-slate-300 my-1" />
          <span className="text-xs text-slate-400 bg-white px-0.5">✂</span>
        </div>
        <HalfBingoPanel
          playerLabel="1P"
          boardTitle="모음 빙고 (ㅏ~ㅣ)"
          bank={VOWEL_BASIC_BANK}
          bonusBank={VOWEL_BONUS_BANK}
          accentHex="#0284C7"
          tintBgHex="#F0F9FF"
          borderHex="#7DD3FC"
          autoFilled={autoFilled}
          seed={seed}
        />
        <HalfBingoPanel
          playerLabel="2P"
          boardTitle="모음 빙고 (ㅏ~ㅣ)"
          bank={VOWEL_BASIC_BANK}
          bonusBank={VOWEL_BONUS_BANK}
          accentHex="#4F46E5"
          tintBgHex="#EEF2FF"
          borderHex="#A5B4FC"
          autoFilled={autoFilled}
          seed={seed + 77}
        />
      </div>

      <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-600 shrink-0">
        <span className="text-[9.5px] font-medium text-slate-500 font-korean-gothic shrink-0">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
        <span className="text-right">
          <strong>규칙:</strong> ① 모음 10자(+ㅐ, ㅔ) 중 8개를 빈칸에 써요 → ② 부르는 모음 소리를 따라 읽고 ○ 표! → ③ 2줄 완성 시 &quot;빙고!&quot;
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// 4. 🏔️ [동기부여 학습지 ①] 졸라한글맨 한글산 정상 정복! (20칸 도장·스티커 등산판)
// ============================================================================
const MOUNTAIN_STEPS: { step: number; x: number; y: number; milestone?: string }[] = [
  { step: 1, x: 70, y: 340, milestone: '출발!' },
  { step: 2, x: 145, y: 345 },
  { step: 3, x: 222, y: 335 },
  { step: 4, x: 298, y: 315 },
  { step: 5, x: 375, y: 295, milestone: '★ 1차 보상' },
  { step: 6, x: 455, y: 310 },
  { step: 7, x: 535, y: 325 },
  { step: 8, x: 615, y: 310 },
  { step: 9, x: 695, y: 280 },
  { step: 10, x: 775, y: 255, milestone: '★ 2차 보상' },
  { step: 11, x: 848, y: 225 },
  { step: 12, x: 810, y: 168 },
  { step: 13, x: 725, y: 162 },
  { step: 14, x: 635, y: 175 },
  { step: 15, x: 545, y: 160, milestone: '★ 3차 보상' },
  { step: 16, x: 455, y: 142 },
  { step: 17, x: 365, y: 150 },
  { step: 18, x: 278, y: 125 },
  { step: 19, x: 205, y: 92 },
  { step: 20, x: 130, y: 62, milestone: '🏆 정상!' },
];

export const JollaMountainStampSheet: React.FC = () => {
  const [stamped, setStamped] = useState<Record<number, boolean>>({});

  const toggleStamp = (step: number) => {
    playCutePop();
    setStamped((prev) => {
      const next = { ...prev, [step]: !prev[step] };
      if (next[step] && (step % 5 === 0)) {
        setTimeout(() => playSuccessChime(), 100);
      }
      return next;
    });
  };

  const pathD = MOUNTAIN_STEPS.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
      style={{ minHeight: '690px', padding: '16px 22px 14px' }}
    >
      <PrintableSheetHeader
        badge="동기부여 ① · 도장판"
        title="졸라한글맨 한글산 정상 정복! (20칸 스티커·도장판)"
        subtitle="학습지 1장을 끝낼 때마다 도장이나 스티커를 붙이고, 한글산 정상(20칸)에 깃발을 꽂아요!"
        accentHex="#059669"
        tintBgHex="#ECFDF5"
        borderHex="#10B981"
        jollaPose="run"
        rightMeta={
          <div className="px-3 py-1 rounded-lg border-2 border-emerald-400 bg-emerald-50 text-xs font-black text-emerald-950 flex items-center gap-3">
            <span>등산 대장 이름: ______________</span>
            <span>시작일: ___/___</span>
          </div>
        }
      />

      {/* Illustrated Mountain Trail Board */}
      <div className="relative flex-1 rounded-xl border-2 border-emerald-300 bg-gradient-to-b from-sky-50 via-emerald-50/40 to-amber-50/40 overflow-hidden my-1">
        <svg
          viewBox="0 0 920 390"
          className="w-full h-full block select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Soft Decorative Mountain Silhouettes */}
          <path d="M 0 390 L 140 55 L 330 230 L 490 120 L 690 240 L 840 135 L 920 260 L 920 390 Z" fill="#D1FAE5" opacity="0.6" />
          <path d="M 0 390 L 130 62 L 295 275 L 540 155 L 775 255 L 920 315 L 920 390 Z" fill="#A7F3D0" opacity="0.45" />
          {/* Snow Cap on Summit */}
          <path d="M 103 118 L 130 62 L 160 112 L 145 104 L 132 115 L 118 105 Z" fill="#FFFFFF" stroke="#059669" strokeWidth="2" />
          {/* Sun & Clouds */}
          <circle cx="845" cy="52" r="24" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2.5" />
          <g fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="2">
            <rect x="330" y="34" width="76" height="24" rx="12" />
            <rect x="605" y="48" width="90" height="26" rx="13" />
          </g>

          {/* Dashed Mountain Trail */}
          <path
            d={pathD}
            fill="none"
            stroke="#047857"
            strokeWidth="6"
            strokeDasharray="10 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 20 Stepping Stone Stamp Circles */}
          {MOUNTAIN_STEPS.map((pt) => {
            const isMilestone = Boolean(pt.milestone);
            const isStamped = Boolean(stamped[pt.step]);
            const r = isMilestone ? 26 : 22;

            return (
              <g
                key={pt.step}
                className="cursor-pointer"
                onClick={() => toggleStamp(pt.step)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={r}
                  fill={isStamped ? '#FEF08A' : isMilestone ? '#FFFBEB' : '#FFFFFF'}
                  stroke={isStamped ? '#EA580C' : isMilestone ? '#D97706' : '#0F172A'}
                  strokeWidth={isMilestone ? 3.2 : 2.4}
                />
                {isStamped ? (
                  <text
                    x={pt.x}
                    y={pt.y + 7}
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="900"
                    fill="#EA580C"
                  >
                    ★
                  </text>
                ) : (
                  <text
                    x={pt.x}
                    y={pt.y + 6}
                    textAnchor="middle"
                    fontSize={isMilestone ? '16' : '15'}
                    fontWeight="900"
                    fill={isMilestone ? '#B45309' : '#1E293B'}
                  >
                    {pt.step}
                  </text>
                )}

                {pt.milestone && (
                  <g>
                    <rect
                      x={pt.x - 36}
                      y={pt.y + r + 4}
                      width="72"
                      height="18"
                      rx="5"
                      fill={pt.step === 20 ? '#F59E0B' : '#059669'}
                    />
                    <text
                      x={pt.x}
                      y={pt.y + r + 16.5}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="900"
                      fill="#FFFFFF"
                    >
                      {pt.milestone}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Cute Tiny Jollaman Characters placed along the mountain trail */}
        <div className="pointer-events-none absolute left-[3%] bottom-[17%]">
          <MiniJollaman pose="run" size={40} teamColor="#059669" />
        </div>
        <div className="pointer-events-none absolute left-[42%] bottom-[24%]">
          <MiniJollaman pose="cheer" size={38} teamColor="#D97706" />
        </div>
        <div className="pointer-events-none absolute right-[4%] top-[36%]">
          <MiniJollaman pose="dizzy" size={36} teamColor="#7C3AED" />
        </div>
        <div className="pointer-events-none absolute left-[18%] top-[5%] flex items-center gap-1 bg-white/90 border-2 border-amber-400 rounded-lg px-2 py-1">
          <MiniJollaman pose="crown" size={36} teamColor="#EA580C" />
          <span className="text-xs font-black text-amber-900">정상 만세!</span>
        </div>
      </div>

      {/* Bottom 4-Stage Reward Promise Strip (Write-in by Teacher/Parent) */}
      <div className="mt-2 pt-2 border-t-2 border-slate-800 grid grid-cols-4 gap-2.5 shrink-0">
        {[
          { step: '5칸 달성 보상', color: 'border-emerald-400 bg-emerald-50/70 text-emerald-900' },
          { step: '10칸 달성 보상', color: 'border-sky-400 bg-sky-50/70 text-sky-900' },
          { step: '15칸 달성 보상', color: 'border-purple-400 bg-purple-50/70 text-purple-900' },
          { step: '🏆 20칸 정상 보상', color: 'border-amber-500 bg-amber-50 text-amber-950' },
        ].map((r) => (
          <div key={r.step} className={`rounded-lg border-2 px-2.5 py-1.5 ${r.color}`}>
            <div className="text-[11px] font-black">{r.step}</div>
            <div className="mt-1.5 border-b border-dashed border-slate-500 h-5 text-[10px] text-slate-400">
              (선물·칭찬 약속 쓰기)
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};

// ============================================================================
// 5. 🎲 [동기부여 학습지 ②] 졸라한글맨 주사위 글자 공장! (자음+모음 합체 챌린지)
// ============================================================================
const FACTORY_CONSONANTS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㅁ', 'ㅂ', 'ㅅ'];
const FACTORY_VOWELS = ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ'];
const DICE_ICONS = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export const JollaDiceFactorySheet: React.FC = () => {
  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
      style={{ minHeight: '690px', padding: '16px 22px 14px' }}
    >
      <PrintableSheetHeader
        badge="동기부여 ② · 주사위 합체"
        title="졸라한글맨 주사위 글자 공장! (자음 + 모음 조립 챌린지)"
        subtitle="주사위를 두 번 굴려 [자음]과 [모음]을 합체하고, 12칸 글자 공장을 완성해요! (혼자·짝꿍 모두 가능)"
        accentHex="#4F46E5"
        tintBgHex="#EEF2FF"
        borderHex="#818CF8"
        jollaPose="pushRight"
      />

      {/* Main Split: Left Dice Reference Tables (4 cols) + Right 12-Slot Factory Grid (8 cols) */}
      <div className="grid grid-cols-12 gap-4 flex-1 my-1">
        {/* Left: Dice Lookup Panel */}
        <div className="col-span-4 flex flex-col justify-between gap-2.5">
          {/* Consonant Dice */}
          <div className="rounded-xl border-2 border-amber-500 bg-amber-50/50 p-2.5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-amber-300">
              <span className="text-xs font-black text-amber-950">① 첫 번째 주사위 · 자음</span>
              <MiniJollaman pose="pushRight" size={24} teamColor="#D97706" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 flex-1">
              {FACTORY_CONSONANTS.map((c, idx) => (
                <div
                  key={c}
                  className="rounded-lg border border-amber-400 bg-white py-1.5 flex flex-col items-center justify-center"
                >
                  <span className="text-sm leading-none text-amber-700">{DICE_ICONS[idx]}</span>
                  <span className="font-badasseugi text-2xl font-black text-slate-900 leading-tight">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vowel Dice */}
          <div className="rounded-xl border-2 border-sky-500 bg-sky-50/50 p-2.5 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-sky-300">
              <span className="text-xs font-black text-sky-950">② 두 번째 주사위 · 모음</span>
              <MiniJollaman pose="cheer" size={24} teamColor="#0284C7" />
            </div>
            <div className="grid grid-cols-3 gap-1.5 flex-1">
              {FACTORY_VOWELS.map((v, idx) => (
                <div
                  key={v}
                  className="rounded-lg border border-sky-400 bg-white py-1.5 flex flex-col items-center justify-center"
                >
                  <span className="text-sm leading-none text-sky-700">{DICE_ICONS[idx]}</span>
                  <span className="font-badasseugi text-2xl font-black text-slate-900 leading-tight">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Example Card */}
          <div className="rounded-xl border-2 border-indigo-400 bg-indigo-50 px-3 py-2 flex items-center justify-between">
            <span className="text-[11px] font-black text-indigo-900">예시 ▶</span>
            <div className="flex items-center gap-1.5 font-black text-base">
              <span className="px-1.5 py-0.5 rounded bg-white border border-amber-400">ㄱ</span>
              <span className="text-indigo-500">+</span>
              <span className="px-1.5 py-0.5 rounded bg-white border border-sky-400">ㅏ</span>
              <span className="text-slate-500">=</span>
              <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-lg">가</span>
            </div>
          </div>
        </div>

        {/* Right: 12-Slot Assembly Conveyor (3 cols × 4 rows) */}
        <div className="col-span-8 rounded-xl border-2 border-slate-800 bg-slate-50/50 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-slate-900">
              🏭 글자 공장 12칸 조립판 (만든 글자를 큰 소리로 읽고 □에 체크하세요!)
            </span>
            <span className="text-[11px] font-bold text-indigo-700">완성: ___ / 12칸</span>
          </div>

          <div className="grid grid-cols-3 grid-rows-4 gap-2.5 flex-1">
            {Array.from({ length: 12 }, (_, idx) => (
              <div
                key={idx}
                className="rounded-xl border-2 border-slate-700 bg-white px-2.5 py-1.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[10px] font-black text-slate-500">
                  <span>#{idx + 1}</span>
                  <span>□ 읽었어요!</span>
                </div>
                <div className="flex items-center justify-between gap-1 my-auto">
                  <div className="w-10 h-10 rounded-md border-[1.5px] border-dashed border-amber-400 bg-amber-50/30 flex items-center justify-center text-[9px] text-amber-400 font-bold">
                    자음
                  </div>
                  <span className="text-xs font-black text-slate-400">+</span>
                  <div className="w-10 h-10 rounded-md border-[1.5px] border-dashed border-sky-400 bg-sky-50/30 flex items-center justify-center text-[9px] text-sky-400 font-bold">
                    모음
                  </div>
                  <span className="text-xs font-black text-slate-400">=</span>
                  <div className="w-12 h-12 rounded-lg border-2 border-indigo-600 bg-white relative flex items-center justify-center">
                    <div className="pointer-events-none absolute inset-x-1.5 top-1/2 border-t border-dashed border-slate-200" />
                    <div className="pointer-events-none absolute inset-y-1.5 left-1/2 border-l border-dashed border-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bonus Word Hunt Challenge */}
      <div className="mt-2 pt-2 border-t-2 border-slate-800 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <MiniJollaman pose="crown" size={26} teamColor="#4F46E5" />
          <span>
            <strong className="text-indigo-900">★ 보너스 미션:</strong> 만든 글자 2개를 붙여 진짜 낱말(예: 구두, 버스, 나무, 바다, 사자 등)을 찾으면 써 보세요!
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-xs font-black text-slate-700">
          <span>① __________</span>
          <span>② __________</span>
          <span>③ __________</span>
        </div>
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};

// ============================================================================
// 6. 🏅 [동기부여 학습지 ③] 졸라한글맨 오늘의 한글 영웅 상장 & 칭찬 쿠폰 3종 (A4 가로 절취형)
// ============================================================================
export const JollaHeroAwardCouponSheet: React.FC = () => {
  const missionChecks = [
    '자음·모음을 큰 소리로 또박또박 읽었어요!',
    '한글 글자를 끝까지 예쁘게 썼어요!',
    '빙고·땅 차지하기 게임에 즐겁게 참여했어요!',
    '쪽지시험을 포기하지 않고 스스로 풀었어요!',
    '선생님·친구와 한국어로 인사했어요!',
  ];

  const coupons = [
    {
      num: 'COUPON 01',
      title: '짝꿍과 한글 게임 1판권',
      desc: '빙고·땅따먹기 중 원하는 게임 1판!',
      color: 'border-amber-500 bg-amber-50',
      badgeBg: '#D97706',
      pose: 'flag' as MiniJollaPose,
    },
    {
      num: 'COUPON 02',
      title: '5분 자유 그림·휴식권',
      desc: '수업 후 5분 자유 그림 그리기 찬스!',
      color: 'border-sky-500 bg-sky-50',
      badgeBg: '#0284C7',
      pose: 'cheer' as MiniJollaPose,
    },
    {
      num: 'COUPON 03',
      title: '선생님 특별 칭찬 쿠폰',
      desc: '약속 내용: ___________________',
      color: 'border-rose-500 bg-rose-50',
      badgeBg: '#E11D48',
      pose: 'crown' as MiniJollaPose,
    },
  ];

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
      style={{ minHeight: '690px', padding: '18px 22px' }}
    >
      <div className="grid grid-cols-12 gap-5 flex-1">
        {/* Left 8 Columns: Official-looking Adorable Certificate */}
        <div className="col-span-8 rounded-2xl border-[4px] border-double border-amber-500 bg-amber-50/30 p-5 flex flex-col justify-between relative">
          {/* Corner stars */}
          <span className="absolute top-2.5 left-3.5 text-amber-500 font-black text-lg">★</span>
          <span className="absolute top-2.5 right-3.5 text-amber-500 font-black text-lg">★</span>
          <span className="absolute bottom-2.5 left-3.5 text-amber-500 font-black text-lg">★</span>
          <span className="absolute bottom-2.5 right-3.5 text-amber-500 font-black text-lg">★</span>

          {/* Certificate Title */}
          <div className="text-center pt-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black tracking-wider mb-1.5">
              HAEBOL KOREAN · 한글 동기부여 상장
            </div>
            <div className="flex items-center justify-center gap-3">
              <MiniJollaman pose="cheer" size={44} teamColor="#D97706" />
              <h2 className="text-4xl font-black text-amber-950 tracking-widest">
                한글 영웅 상장
              </h2>
              <MiniJollaman pose="crown" size={44} teamColor="#EA580C" />
            </div>
          </div>

          {/* Recipient Name Line */}
          <div className="my-3 flex items-center justify-end gap-3 px-4">
            <span className="text-sm font-black text-slate-600">학년 · 반: ____________</span>
            <span className="text-lg font-black text-slate-900">
              이름: <span className="inline-block w-36 border-b-2 border-slate-800" />
            </span>
          </div>

          {/* Praise Paragraph */}
          <div className="text-center px-4 py-2 bg-white rounded-xl border-2 border-amber-200">
            <p className="text-[15px] font-black text-slate-800 leading-relaxed">
              위 어린이는 즐겁고 씩씩하게 한국어 공부에 참여하여
              <br />
              아래의 멋진 한글 미션을 훌륭하게 해냈으므로 이 상장을 드립니다!
            </p>
          </div>

          {/* Achievement Checkboxes */}
          <div className="my-3 bg-white rounded-xl border-2 border-amber-300 px-4 py-3">
            <div className="text-xs font-black text-amber-800 mb-2">
              ✔ 오늘 해낸 한글 영웅 미션 (선생님이 체크해 주세요!)
            </div>
            <div className="space-y-1.5">
              {missionChecks.map((m) => (
                <div key={m} className="flex items-center gap-2 text-[13px] font-bold text-slate-800">
                  <span className="w-4 h-4 rounded border-2 border-amber-500 bg-amber-50/40 inline-block shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Teacher Signature */}
          <div className="flex items-end justify-between px-4 pt-1">
            <div className="text-xs font-black text-slate-600">
              202___년 _____월 _____일
            </div>
            <div className="flex items-center gap-2.5">
              <div className="text-right">
                <div className="text-xs font-bold text-slate-500">해볼한국어</div>
                <div className="text-base font-black text-slate-900">선생님: ______________</div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-dashed border-rose-400 bg-rose-50/50 flex items-center justify-center text-[10px] font-black text-rose-500">
                도장
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: 3 Cut-Out Mini Motivation Coupons */}
        <div className="col-span-4 flex flex-col justify-between pl-4 border-l-2 border-dashed border-slate-400 relative">
          <span className="absolute -left-2.5 top-2 bg-white text-slate-500 text-xs">✂</span>
          <span className="absolute -left-2.5 bottom-2 bg-white text-slate-500 text-xs">✂</span>

          <div className="text-center pb-1.5 border-b border-slate-200">
            <div className="text-sm font-black text-slate-900">🎁 졸라맨 칭찬 쿠폰 3종</div>
            <div className="text-[10.5px] font-bold text-slate-500">
              점선을 따라 잘라 선물해 주세요!
            </div>
          </div>

          <div className="flex flex-col gap-3 flex-1 justify-between my-2">
            {coupons.map((cp) => (
              <div
                key={cp.num}
                className={`rounded-xl border-2 border-dashed p-3 flex flex-col justify-between flex-1 ${cp.color}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-black text-white"
                    style={{ backgroundColor: cp.badgeBg }}
                  >
                    {cp.num}
                  </span>
                  <span className="text-[10px] font-black text-slate-500">사용 완료 □</span>
                </div>
                <div className="flex items-center gap-2.5 my-1.5">
                  <div className="bg-white rounded-lg border border-slate-200 p-1 shrink-0">
                    <MiniJollaman pose={cp.pose} size={34} teamColor={cp.badgeBg} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14px] font-black text-slate-900 leading-tight">
                      {cp.title}
                    </div>
                    <div className="text-[10.5px] font-bold text-slate-600 mt-1">{cp.desc}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 pt-1 border-t border-slate-300/70">
                  <span>받은 사람: ________</span>
                  <span>확인: ____</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center text-[10px] font-extrabold text-slate-400">
            A4 가로 인쇄용 동기부여 세트
          </div>
        </div>
      </div>
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
      </div>
    </div>
  );
};
