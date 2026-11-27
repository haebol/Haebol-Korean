import React, { useState } from 'react';
import { Dices, RotateCcw, Scissors } from 'lucide-react';
import { SupportedLanguage, VocabularyItem } from '../types';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { VocabVisual } from './VocabVisual';
import { ManduMascot } from './ManduMascot';
import { MiniJollaman } from './HangeulJollaQuizAndGameSheets';
import { JollaComic, PlaybookHeader } from './JollaPlayArt';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';

export interface PlaySheetMeta {
  id: string;
  idx: number;
  circledNo: string;
  title: string;
  subtitle: string;
  dropdownLabel: string;
  previewMain: string;
  previewChips: string[];
}

export const CLASSROOM_PLAY_SHEETS_META: PlaySheetMeta[] = [
  {
    id: 'classroom_play_1',
    idx: 0,
    circledNo: '①',
    title: '대빵 큰 그림 3×3 빙고 (2판 1장)',
    subtitle: '1~5과 · 가위 선에 매달린 졸라맨을 잘라 짝꿍과 한판!',
    dropdownLabel: '① 1강(1~5과) · 대빵 큰 그림 3×3 빙고',
    previewMain: '3×3 빙고',
    previewChips: ['1~5과', '2판 1장', '큰 그림'],
  },
  {
    id: 'classroom_play_2',
    idx: 1,
    circledNo: '②',
    title: '졸라맨 학교 대탈출! 15칸 주사위 보드게임',
    subtitle: '1~5과 · 큼직한 15칸 징검다리! 급해요·아파요 코믹 찬스!',
    dropdownLabel: '② 1강(1~5과) · 학교 대탈출 15칸 보드게임',
    previewMain: '🎲 15칸',
    previewChips: ['1~5과', '보드게임', '코믹 찬스'],
  },
  {
    id: 'classroom_play_3',
    idx: 2,
    circledNo: '③',
    title: '앗! 화장실이 급해!! 대빵 큰 교실 미로',
    subtitle: '1~5과 · 땀 뻘뻘 졸라맨! 꽝 벽을 피해 화장실까지 탈출!',
    dropdownLabel: '③ 1강(1~5과) · 앗! 화장실이 급해!! 교실 미로',
    previewMain: '🚽 대탈출',
    previewChips: ['1~5과', '큰 그림 미로', '화장실 급해'],
  },
  {
    id: 'classroom_play_4',
    idx: 3,
    circledNo: '④',
    title: '쿵쾅! 교실 숨은 물건·졸라맨 찾기',
    subtitle: '1~5과 · 대빵 큰 교실 그림 속에 숨은 물건 7개와 졸라맨 찾기!',
    dropdownLabel: '④ 1강(1~5과) · 교실 숨은 물건·졸라맨 찾기',
    previewMain: '🔍 숨은그림',
    previewChips: ['1~5과', '큰 교실 그림', '7개 찾기'],
  },
  {
    id: 'classroom_play_5',
    idx: 4,
    circledNo: '⑤',
    title: '싹둑싹둑! 그림·글자 짝꿍 카드 12장',
    subtitle: '1~5과 · 큼직한 그림 6장 + 왕글자 6장 오려서 짝꿍 맞추기!',
    dropdownLabel: '⑤ 1강(1~5과) · 그림·글자 짝꿍 카드 12장',
    previewMain: '✂️ 12장',
    previewChips: ['1~5과', '오리기 카드', '왕글자'],
  },
];

// 1~5과 데이터 전용 lookup
const UNIT_1_5_WORDS: VocabularyItem[] = VOCABULARY_DATA.filter(
  (v) => v.ch >= 1 && v.ch <= 5
);

function findWord(korean: string): VocabularyItem {
  return UNIT_1_5_WORDS.find((w) => w.ko === korean) || UNIT_1_5_WORDS[0];
}

const DOT_GRID_STYLE: React.CSSProperties = {
  backgroundImage: 'radial-gradient(#cbd5e1 1.1px, transparent 1.1px)',
  backgroundSize: '22px 22px',
};

const INLINE_BTN_CLASS =
  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 transition-colors cursor-pointer';

/* ============================================================================
 * ① 대빵 큰 그림 3×3 빙고 (2판 1장 절취형)
 * ============================================================================ */
const BINGO_A = ['화장실', '물', '연필', '책', '선생님', '가방', '지우개', '약', '비누'].map((k) =>
  k === '가방' ? findWord('공책') : findWord(k)
);
const BINGO_B = ['연필', '약', '휴지', '지우개', '화장실', '책', '물', '비누', '공책'].map(findWord);

const ClassroomBingoSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
  const [markedA, setMarkedA] = useState<Record<number, boolean>>({});
  const [markedB, setMarkedB] = useState<Record<number, boolean>>({});

  const toggle = (board: 'A' | 'B', idx: number, word: string) => {
    playCutePop();
    speakKorean(word);
    if (board === 'A') {
      setMarkedA((p) => ({ ...p, [idx]: !p[idx] }));
    } else {
      setMarkedB((p) => ({ ...p, [idx]: !p[idx] }));
    }
  };

  return (
    <div className="w-full">
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="교실 놀이 ①"
          title="대빵 큰 그림 3×3 빙고!"
          hint="가위로 싹둑 잘라 짝꿍과 한판!"
          accentHex="#9F1239"
          tintHex="#FFE4E6"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setMarkedA({});
                setMarkedB({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 2판 1장 + 가운데 매달린 졸라맨 절취선 */}
        <div className="flex-1 grid grid-cols-[1fr_54px_1fr] items-stretch gap-1 my-0.5">
          {[
            {
              label: '빨강 졸라맨 판',
              color: '#E11D48',
              borderClass: 'border-rose-300/90',
              bgClass: 'bg-[#FFF9FA]',
              tileBorder: 'border-rose-200 hover:border-rose-400',
              items: BINGO_A,
              marked: markedA,
              side: 'A' as const,
            },
            {
              label: '파랑 졸라맨 판',
              color: '#2563EB',
              borderClass: 'border-sky-300/90',
              bgClass: 'bg-[#F7FBFF]',
              tileBorder: 'border-sky-200 hover:border-sky-400',
              items: BINGO_B,
              marked: markedB,
              side: 'B' as const,
            },
          ].map((board, bIdx) => (
            <React.Fragment key={board.side}>
              <div
                className={`relative rounded-2xl border-[1.5px] ${board.borderClass} ${board.bgClass} p-3 flex flex-col justify-between overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={DOT_GRID_STYLE} />

                <div className="relative z-10 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MiniJollaman pose={bIdx === 0 ? 'cheer' : 'point'} size={32} teamColor={board.color} />
                    <span
                      className="text-[17px] font-black tracking-tight"
                      style={{ color: board.color }}
                    >
                      {board.label}
                    </span>
                  </div>
                  <div className="px-2.5 py-0.5 bg-white rounded-lg border border-slate-300 text-[11.5px] font-bold text-slate-600">
                    이름: ______
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-2.5 flex-1">
                  {board.items.map((item, idx) => {
                    const isMarked = !!board.marked[idx];
                    return (
                      <div
                        key={`${board.side}-${item.ko}-${idx}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggle(board.side, idx, item.ko)}
                        onKeyDown={(e) => e.key === 'Enter' && toggle(board.side, idx, item.ko)}
                        className={`relative bg-white rounded-2xl border-[1.5px] ${board.tileBorder} flex flex-col items-center justify-center p-2 cursor-pointer select-none transition-all hover:scale-[1.02] shadow-2xs`}
                      >
                        <div className="w-16 h-16 flex items-center justify-center">
                          <VocabVisual item={item} size="lg" />
                        </div>
                        <span className="mt-1 text-[20px] font-black text-slate-800 leading-none tracking-tight">
                          {item.ko}
                        </span>
                        {isMarked && (
                          <div
                            className="absolute inset-1.5 rounded-full border-[4px] pointer-events-none opacity-80"
                            style={{ borderColor: board.color }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 가운데 절취선 */}
              {bIdx === 0 && (
                <div className="relative flex flex-col items-center justify-between py-2 select-none">
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-[1.5px] border-dashed border-slate-400" />
                  <div className="relative z-10 bg-white rounded-full p-1 border border-slate-300 shadow-2xs">
                    <Scissors className="w-3.5 h-3.5 text-rose-500 rotate-90" />
                  </div>
                  <div className="relative z-10">
                    <JollaComic pose="cling" size={42} color="#E11D48" speech="자르지 마~!" />
                  </div>
                  <div className="relative z-10">
                    <JollaComic pose="urgent" size={42} color="#2563EB" speech="으악!" />
                  </div>
                  <div className="relative z-10 bg-white rounded-full p-1 border border-slate-300 shadow-2xs">
                    <Scissors className="w-3.5 h-3.5 text-rose-500 -rotate-90" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-center gap-3 text-[12.5px] font-bold text-slate-600 shrink-0">
          <span>① 낱말을 크게 외치며 동그라미 ○!</span>
          <span className="text-slate-300">·</span>
          <span className="text-rose-700">② 가로·세로·대각선 2줄 먼저 완성하면 빙고 만세!</span>
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ② 졸라맨 학교 대탈출! 15칸 주사위 보드게임
 * ============================================================================ */
interface BoardTile {
  no: number;
  kind: 'start' | 'goal' | 'word' | 'event';
  word?: string;
  eventTitle?: string;
  eventPose?: 'urgent' | 'splat' | 'cheer';
  eventBg?: string;
  eventBorder?: string;
}

const BOARD_15: BoardTile[] = [
  { no: 0, kind: 'start' },
  { no: 1, kind: 'word', word: '안녕하세요' },
  { no: 2, kind: 'word', word: '물' },
  { no: 3, kind: 'event', eventTitle: '급해요! +2칸', eventPose: 'urgent', eventBg: '#FEF9C3', eventBorder: '#FDE047' },
  { no: 4, kind: 'word', word: '화장실' },
  { no: 5, kind: 'word', word: '비누' },
  { no: 6, kind: 'word', word: '손' },
  { no: 7, kind: 'event', eventTitle: '아파요! 1번 쉼', eventPose: 'splat', eventBg: '#FFE4E6', eventBorder: '#FDA4AF' },
  { no: 8, kind: 'word', word: '약' },
  { no: 9, kind: 'word', word: '선생님' },
  { no: 10, kind: 'word', word: '칠판' },
  { no: 11, kind: 'word', word: '책' },
  { no: 12, kind: 'event', eventTitle: '알아요! 한 번 더!', eventPose: 'cheer', eventBg: '#DCFCE7', eventBorder: '#86EFAC' },
  { no: 13, kind: 'word', word: '연필' },
  { no: 14, kind: 'goal' },
];

const ClassroomBoardGameSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [turn, setTurn] = useState<1 | 2>(1);
  const [dice, setDice] = useState<number | null>(null);

  const rollDice = () => {
    const d = Math.floor(Math.random() * 4) + 1;
    setDice(d);
    playCutePop();
    if (turn === 1) {
      const next = Math.min(14, p1 + d);
      setP1(next);
      const tile = BOARD_15[next];
      if (tile.word) speakKorean(tile.word);
      if (next === 14) playSuccessChime();
      setTurn(2);
    } else {
      const next = Math.min(14, p2 + d);
      setP2(next);
      const tile = BOARD_15[next];
      if (tile.word) speakKorean(tile.word);
      if (next === 14) playSuccessChime();
      setTurn(1);
    }
  };

  const displayRows: BoardTile[][] = [
    BOARD_15.slice(0, 5),
    [...BOARD_15.slice(5, 10)].reverse(),
    BOARD_15.slice(10, 15),
  ];

  return (
    <div className="w-full">
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="교실 놀이 ②"
          title="졸라맨 학교 대탈출! 15칸 보드게임"
          hint="도착한 칸의 낱말을 크게 외치기!"
          accentHex="#9F1239"
          tintHex="#FFE4E6"
          webControls={
            <>
              <button
                type="button"
                onClick={rollDice}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-300 text-xs font-black text-rose-800 transition-colors cursor-pointer"
              >
                <Dices className="w-3.5 h-3.5" />
                {turn === 1 ? '빨강' : '파랑'} 주사위 {dice ? `(${dice})` : ''}
              </button>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setP1(0);
                  setP2(0);
                  setTurn(1);
                  setDice(null);
                }}
                className={INLINE_BTN_CLASS}
              >
                <RotateCcw className="w-3.5 h-3.5" /> 초기화
              </button>
            </>
          }
        />

        {/* 따뜻한 크림 도트 보드판 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] p-3.5 flex flex-col justify-center gap-4 my-0.5 overflow-hidden">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={DOT_GRID_STYLE} />

          {displayRows.map((row, rIdx) => (
            <div key={rIdx} className="relative z-10 grid grid-cols-5 gap-3.5 flex-1">
              {row.map((tile, cIdx) => {
                const item = tile.word ? findWord(tile.word) : null;
                const hasP1 = p1 === tile.no;
                const hasP2 = p2 === tile.no;
                const showRightArrow = rIdx !== 1 && cIdx < 4;
                const showLeftArrow = rIdx === 1 && cIdx > 0;
                const showDownArrow = (rIdx === 0 && cIdx === 4) || (rIdx === 1 && cIdx === 0);

                return (
                  <div
                    key={tile.no}
                    role="button"
                    tabIndex={0}
                    onClick={() => item && speakKorean(item.ko)}
                    onKeyDown={(e) => e.key === 'Enter' && item && speakKorean(item.ko)}
                    className="relative rounded-2xl border-[1.5px] flex flex-col items-center justify-center p-2 cursor-pointer select-none shadow-2xs transition-transform hover:scale-[1.02]"
                    style={{
                      backgroundColor:
                        tile.kind === 'start'
                          ? '#ECFDF5'
                          : tile.kind === 'goal'
                          ? '#FEF9C3'
                          : tile.kind === 'event'
                          ? tile.eventBg
                          : '#FFFFFF',
                      borderColor:
                        tile.kind === 'start'
                          ? '#6EE7B7'
                          : tile.kind === 'goal'
                          ? '#FCD34D'
                          : tile.kind === 'event'
                          ? tile.eventBorder
                          : '#CBD5E1',
                    }}
                  >
                    {tile.no > 0 && tile.no < 14 && (
                      <span className="absolute top-1.5 left-2.5 text-[12px] font-black text-slate-400">
                        {tile.no}
                      </span>
                    )}

                    {tile.kind === 'start' && (
                      <div className="flex flex-col items-center">
                        <JollaComic pose="cheer" size={54} color="#059669" speech="출발!!" />
                        <span className="text-[18px] font-black text-emerald-800 mt-0.5">출발!</span>
                      </div>
                    )}

                    {tile.kind === 'goal' && (
                      <div className="flex flex-col items-center">
                        <ManduMascot size="sm" mood="cheer" interactive={false} />
                        <span className="text-[19px] font-black text-amber-800 mt-1">탈출 성공! 🎉</span>
                      </div>
                    )}

                    {tile.kind === 'event' && tile.eventPose && (
                      <div className="flex flex-col items-center text-center">
                        <JollaComic pose={tile.eventPose} size={50} color="#E11D48" />
                        <span className="mt-1 text-[15px] font-black text-slate-800 leading-tight">
                          {tile.eventTitle}
                        </span>
                      </div>
                    )}

                    {tile.kind === 'word' && item && (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-15 h-15 flex items-center justify-center">
                          <VocabVisual item={item} size="lg" />
                        </div>
                        <span className="mt-1 text-[20px] font-black text-slate-800 leading-none">
                          {item.ko}
                        </span>
                      </div>
                    )}

                    {(hasP1 || hasP2) && (
                      <div className="no-print absolute -top-2 -right-2 flex items-center gap-0.5 z-20">
                        {hasP1 && (
                          <span className="w-6 h-6 rounded-full bg-rose-500 text-white border border-white text-[11px] font-black flex items-center justify-center shadow-sm">
                            빨
                          </span>
                        )}
                        {hasP2 && (
                          <span className="w-6 h-6 rounded-full bg-sky-500 text-white border border-white text-[11px] font-black flex items-center justify-center shadow-sm">
                            파
                          </span>
                        )}
                      </div>
                    )}

                    {showRightArrow && (
                      <span className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[15px] font-black text-rose-400">
                        ▸
                      </span>
                    )}
                    {showLeftArrow && (
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 text-[15px] font-black text-rose-400">
                        ◂
                      </span>
                    )}
                    {showDownArrow && (
                      <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-10 text-[15px] font-black text-rose-400">
                        ▾
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between text-[12.5px] font-bold text-slate-600 shrink-0">
          <span>🎲 주사위나 지우개로 톡톡! 도착한 칸 낱말을 큰 소리로 읽기!</span>
          <span className="text-rose-700">★ 끝까지 먼저 탈출하면 승리!</span>
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ③ 앗! 화장실이 급해!! 대빵 큰 교실 미로 대작전
 * ============================================================================ */
const MAZE_STEPS = [
  { id: 0, word: '선생님', speech: '화장실 가도 돼요?', x: 20, y: 24 },
  { id: 1, word: '물', speech: '물 밟지 마!', x: 42, y: 22 },
  { id: 2, word: '비누', speech: '미끄러워!', x: 64, y: 26 },
  { id: 3, word: '휴지', speech: '휴지 챙겨!', x: 64, y: 74 },
  { id: 4, word: '손', speech: '손 씻자!', x: 40, y: 76 },
  { id: 5, word: '화장실', speech: '살았다~!!', x: 86, y: 52 },
];

const DEAD_ENDS = [
  { word: '칠판', speech: '쾅! 여긴 칠판!', x: 42, y: 50 },
  { word: '보건실', speech: '앗! 보건실이야!', x: 18, y: 78 },
  { word: '지우개', speech: '지우개에 쿵!', x: 84, y: 18 },
];

const ClassroomUrgentMazeSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
  const [stepDone, setStepDone] = useState<number[]>([]);

  const handleStep = (idx: number, word: string) => {
    playCutePop();
    speakKorean(word);
    setStepDone((prev) => {
      const next = prev.includes(idx) ? prev : [...prev, idx];
      if (next.length === MAZE_STEPS.length) playSuccessChime();
      return next;
    });
  };

  return (
    <div className="w-full">
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="교실 놀이 ③"
          title="앗! 화장실이 급해!! 교실 미로 대작전"
          hint="연필로 길을 따라 낱말을 읽으며 화장실까지 슝~!"
          accentHex="#9F1239"
          tintHex="#FFE4E6"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setStepDone([]);
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 따뜻한 크림 미로 캔버스 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] overflow-hidden my-0.5">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={DOT_GRID_STYLE} />

          <svg
            viewBox="0 0 1000 540"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* 막다른 꽝 길 3개 (부드러운 연회색) */}
            <path d="M 420 120 L 420 265" stroke="#E2E8F0" strokeWidth="42" strokeLinecap="round" fill="none" />
            <path d="M 400 410 L 185 415" stroke="#E2E8F0" strokeWidth="42" strokeLinecap="round" fill="none" />
            <path d="M 640 140 L 840 100" stroke="#E2E8F0" strokeWidth="42" strokeLinecap="round" fill="none" />

            {/* 메인 구불구불 도로 (얇은 슬레이트 테두리 + 포근한 흰 길) */}
            <path
              d="M 85 260 C 120 120, 150 120, 200 130 L 420 120 L 640 140 C 710 210, 710 350, 640 400 L 400 410 C 480 350, 730 330, 860 280"
              stroke="#94A3B8"
              strokeWidth="58"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M 85 260 C 120 120, 150 120, 200 130 L 420 120 L 640 140 C 710 210, 710 350, 640 400 L 400 410 C 480 350, 730 330, 860 280"
              stroke="#FFFFFF"
              strokeWidth="52"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* 가운데 따라그리기 점선 */}
            <path
              d="M 85 260 C 120 120, 150 120, 200 130 L 420 120 L 640 140 C 710 210, 710 350, 640 400 L 400 410 C 480 350, 730 330, 860 280"
              stroke="#FDA4AF"
              strokeWidth="4"
              strokeDasharray="11 11"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          {/* 왼쪽 출발 졸라맨 */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
            style={{ left: '8%', top: '48%' }}
          >
            <JollaComic pose="urgent" size={78} color="#E11D48" speech="급해요!!" />
            <span className="mt-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[13px] font-black border border-rose-300">
              출발!
            </span>
          </div>

          {/* 6개 그림 체크포인트 */}
          {MAZE_STEPS.map((st, idx) => {
            const item = findWord(st.word);
            const done = stepDone.includes(idx);
            const isGoal = idx === MAZE_STEPS.length - 1;
            return (
              <div
                key={st.id}
                role="button"
                tabIndex={0}
                onClick={() => handleStep(idx, item.ko)}
                onKeyDown={(e) => e.key === 'Enter' && handleStep(idx, item.ko)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer select-none transition-transform hover:scale-105"
                style={{ left: `${st.x}%`, top: `${st.y}%` }}
              >
                <div
                  className={`rounded-2xl border-[1.5px] flex flex-col items-center justify-center shadow-2xs ${
                    isGoal
                      ? 'px-4 py-2.5 bg-sky-50 border-sky-400'
                      : done
                      ? 'px-3 py-2 bg-emerald-50 border-emerald-400'
                      : 'px-3 py-2 bg-white border-slate-400'
                  }`}
                >
                  <span
                    className={`absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full border border-white text-white text-[12.5px] font-black flex items-center justify-center shadow-2xs ${
                      isGoal ? 'bg-sky-500' : 'bg-rose-400'
                    }`}
                  >
                    {isGoal ? '★' : idx + 1}
                  </span>
                  <div className={isGoal ? 'w-18 h-18 flex items-center justify-center' : 'w-14 h-14 flex items-center justify-center'}>
                    <VocabVisual item={item} size={isGoal ? 'xl' : 'lg'} />
                  </div>
                  <span className={`font-black leading-none mt-1 ${isGoal ? 'text-[22px] text-sky-900' : 'text-[19px] text-slate-800'}`}>
                    {item.ko}
                  </span>
                  {isGoal && (
                    <span className="mt-1 text-[11.5px] font-bold text-sky-700">도착! 살았다~</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* 막다른 꽝 길 3곳 */}
          {DEAD_ENDS.map((de) => {
            const item = findWord(de.word);
            return (
              <div
                key={de.word}
                role="button"
                tabIndex={0}
                onClick={() => {
                  playCutePop();
                  speakKorean(item.ko);
                }}
                onKeyDown={(e) => e.key === 'Enter' && speakKorean(item.ko)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 bg-white/95 border-[1.5px] border-dashed border-rose-300 rounded-2xl px-2.5 py-1.5 cursor-pointer shadow-2xs"
                style={{ left: `${de.x}%`, top: `${de.y}%` }}
              >
                <JollaComic pose="splat" size={44} color="#94A3B8" speech={de.speech} />
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 flex items-center justify-center">
                    <VocabVisual item={item} size="sm" />
                  </div>
                  <span className="text-[13px] font-bold text-slate-600">{item.ko}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-between text-[12.5px] font-bold text-slate-600 shrink-0">
          <span>✏️ ①→②→③→④→⑤ 순서대로 선을 그으며 낱말을 크게 읽어 보세요!</span>
          <span className="text-rose-700">꽝 길에 빠지면 꽈당~!</span>
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ④ 쿵쾅! 교실 숨은 물건·졸라맨 찾기
 * ============================================================================ */
const HIDDEN_ITEMS = [
  { word: '연필', x: 22, y: 26, rotate: -14, jollaPose: 'cling' as const, speech: '칠판 위!' },
  { word: '지우개', x: 52, y: 28, rotate: 10, jollaPose: null, speech: '' },
  { word: '책', x: 26, y: 63, rotate: -5, jollaPose: 'heavy' as const, speech: '책 무거워!' },
  { word: '공책', x: 58, y: 62, rotate: 8, jollaPose: null, speech: '' },
  { word: '필통', x: 82, y: 28, rotate: -12, jollaPose: 'float' as const, speech: '창문 밖!' },
  { word: '물', x: 78, y: 66, rotate: 4, jollaPose: 'splat' as const, speech: '앗 쏟아!' },
  { word: '비누', x: 11, y: 80, rotate: -6, jollaPose: 'urgent' as const, speech: '미끌~!' },
];

const ClassroomHiddenPictureSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
  const [found, setFound] = useState<Record<string, boolean>>({});
  const foundCount = Object.values(found).filter(Boolean).length;

  const toggleFind = (word: string) => {
    playCutePop();
    speakKorean(word);
    setFound((prev) => {
      const next = { ...prev, [word]: !prev[word] };
      if (Object.values(next).filter(Boolean).length === HIDDEN_ITEMS.length) {
        playSuccessChime();
      }
      return next;
    });
  };

  return (
    <div className="w-full">
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="교실 놀이 ④"
          title="쿵쾅! 교실 숨은 물건·졸라맨 찾기"
          hint="교실 그림 속에 숨은 물건 7개를 찾아 동그라미 ○!"
          accentHex="#9F1239"
          tintHex="#FFE4E6"
          scoreBadge={`발견: ${foundCount > 0 ? foundCount : ' '} / ${HIDDEN_ITEMS.length}`}
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setFound({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 따뜻한 파스텔 동화책 교실 일러스트 배경 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 overflow-hidden my-0.5 bg-[#FFFDF5]">
          <svg
            viewBox="0 0 1000 440"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* 포근한 크림 벽 & 연한 우드 바닥 */}
            <rect x="0" y="0" width="1000" height="270" fill="#FFFDF5" />
            <rect x="0" y="270" width="1000" height="170" fill="#FEF3C7" opacity="0.65" />
            <line x1="0" y1="270" x2="1000" y2="270" stroke="#94A3B8" strokeWidth="2" />

            {/* 부드러운 파스텔 세이지 칠판 */}
            <rect x="130" y="34" width="480" height="175" rx="14" fill="#D1FAE5" stroke="#A78B71" strokeWidth="6" />
            <text x="295" y="95" fontSize="24" fontWeight="800" fill="#065F46" opacity="0.35">
              해볼한국어 교실
            </text>
            <line x1="170" y1="196" x2="570" y2="196" stroke="#B49A82" strokeWidth="5" strokeLinecap="round" />

            {/* 오른쪽 하늘 창문 */}
            <rect x="690" y="34" width="240" height="165" rx="12" fill="#E0F2FE" stroke="#64748B" strokeWidth="2.4" />
            <line x1="810" y1="34" x2="810" y2="199" stroke="#64748B" strokeWidth="2" />
            <line x1="690" y1="116" x2="930" y2="116" stroke="#64748B" strokeWidth="2" />
            <circle cx="745" cy="76" r="18" fill="#FEF08A" />

            {/* 왼쪽 책상 1 */}
            <rect x="145" y="255" width="230" height="34" rx="10" fill="#FDE68A" stroke="#64748B" strokeWidth="2.2" />
            <line x1="175" y1="289" x2="175" y2="392" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="345" y1="289" x2="345" y2="392" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />

            {/* 가운데 책상 2 */}
            <rect x="465" y="255" width="230" height="34" rx="10" fill="#FDE68A" stroke="#64748B" strokeWidth="2.2" />
            <line x1="495" y1="289" x2="495" y2="392" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="665" y1="289" x2="665" y2="392" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />

            {/* 오른쪽 파스텔 사물함 */}
            <rect x="750" y="245" width="175" height="150" rx="12" fill="#DBEAFE" stroke="#64748B" strokeWidth="2.2" />
            <line x1="837" y1="245" x2="837" y2="395" stroke="#64748B" strokeWidth="1.8" />
          </svg>

          {/* 칠판 옆 만두 */}
          <div className="absolute left-3 top-4 z-10 flex flex-col items-center">
            <ManduMascot size="sm" mood="think" interactive={false} />
            <span className="mt-0.5 px-2.5 py-0.5 bg-white border border-slate-400 rounded-full text-[10.5px] font-bold text-slate-700 shadow-2xs">
              어디 숨었지?
            </span>
          </div>

          {/* 7개 숨은 물건 + 졸라맨 */}
          {HIDDEN_ITEMS.map((hi) => {
            const item = findWord(hi.word);
            const isFound = !!found[hi.word];
            return (
              <div
                key={hi.word}
                role="button"
                tabIndex={0}
                onClick={() => toggleFind(hi.word)}
                onKeyDown={(e) => e.key === 'Enter' && toggleFind(hi.word)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1 cursor-pointer select-none transition-transform hover:scale-110"
                style={{ left: `${hi.x}%`, top: `${hi.y}%` }}
              >
                {hi.jollaPose && (
                  <JollaComic pose={hi.jollaPose} size={44} color="#E11D48" speech={hi.speech} />
                )}
                <div
                  className={`relative rounded-2xl p-1.5 transition-all ${
                    isFound
                      ? 'bg-rose-50/95 ring-[3px] ring-rose-400 scale-110'
                      : 'bg-white/90 border-[1.5px] border-slate-400/80 shadow-2xs'
                  }`}
                  style={{ transform: `rotate(${hi.rotate}deg)` }}
                >
                  <div className="w-13 h-13 flex items-center justify-center">
                    <VocabVisual item={item} size="md" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 아래쪽 7개 체크리스트 카드 (JollaHiddenLettersSheet 감성!) */}
        <div className="mt-2 grid grid-cols-7 gap-2 shrink-0">
          {HIDDEN_ITEMS.map((hi, idx) => {
            const item = findWord(hi.word);
            const isFound = !!found[hi.word];
            return (
              <div
                key={`chk-${hi.word}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleFind(hi.word)}
                onKeyDown={(e) => e.key === 'Enter' && toggleFind(hi.word)}
                className={`rounded-xl border-[1.5px] px-2 py-1.5 flex flex-col items-center justify-center gap-1 cursor-pointer select-none transition-colors ${
                  isFound ? 'bg-rose-50 border-rose-400' : 'bg-white border-slate-600'
                }`}
              >
                <span className="text-[11px] font-black text-slate-700 leading-none">
                  {idx + 1}. {item.ko}
                </span>
                <div
                  className={`w-10 h-10 rounded-lg border-[1.5px] border-dashed flex items-center justify-center ${
                    isFound
                      ? 'border-rose-400 bg-white'
                      : 'border-slate-400 bg-[#FFFDF7]'
                  }`}
                >
                  {isFound ? (
                    <span className="text-rose-500 font-black text-lg">○</span>
                  ) : (
                    <div className="w-7 h-7 opacity-80 flex items-center justify-center">
                      <VocabVisual item={item} size="xs" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-1.5 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ⑤ 싹둑싹둑! 그림·글자 짝꿍 카드 12장
 * ============================================================================ */
const CARD_PAIRS = ['화장실', '물', '약', '선생님', '책', '연필'].map(findWord);

const ClassroomMemoryCardsSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});

  const wordRowOrder = [CARD_PAIRS[2], CARD_PAIRS[0], CARD_PAIRS[4], CARD_PAIRS[1], CARD_PAIRS[5], CARD_PAIRS[3]];

  const handleCard = (type: 'pic' | 'txt', item: VocabularyItem) => {
    playCutePop();
    speakKorean(item.ko);
    const key = `${type}:${item.ko}`;
    if (!selected) {
      setSelected(key);
      return;
    }
    const [prevType, prevWord] = selected.split(':');
    if (prevType !== type && prevWord === item.ko) {
      playSuccessChime();
      setMatched((p) => ({ ...p, [item.ko]: true }));
      setSelected(null);
    } else {
      setSelected(key);
    }
  };

  return (
    <div className="w-full">
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="교실 놀이 ⑤"
          title="싹둑싹둑! 그림·글자 짝꿍 카드 12장"
          hint="점선 따라 오려서 그림 카드와 글자 카드 짝꿍 찾기!"
          accentHex="#9F1239"
          tintHex="#FFE4E6"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setSelected(null);
                setMatched({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 12장 절취 카드 */}
        <div className="flex-1 flex flex-col justify-between gap-3 my-0.5">
          {/* 윗줄: 그림 카드 6장 */}
          <div className="grid grid-cols-6 gap-2.5 flex-1">
            {CARD_PAIRS.map((item, idx) => {
              const isMatched = !!matched[item.ko];
              const isSel = selected === `pic:${item.ko}`;
              return (
                <div
                  key={`pic-${item.ko}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCard('pic', item)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCard('pic', item)}
                  className={`relative rounded-2xl border-[1.5px] border-dashed flex flex-col items-center justify-center p-2 cursor-pointer select-none transition-all ${
                    isMatched
                      ? 'border-emerald-400 bg-emerald-50/70'
                      : isSel
                      ? 'border-rose-400 bg-rose-50 scale-[1.03]'
                      : 'border-rose-300 bg-[#FFFDF9] hover:border-rose-400'
                  }`}
                >
                  <span className="absolute top-1.5 left-2 px-1.5 py-0.5 rounded bg-rose-100/80 text-[10.5px] font-black text-rose-700">
                    그림
                  </span>
                  <div className="w-22 h-22 flex items-center justify-center">
                    <VocabVisual item={item} size="xl" />
                  </div>
                  <div className="absolute bottom-1.5 right-1.5 opacity-80">
                    <MiniJollaman
                      pose={idx % 2 === 0 ? 'cheer' : 'point'}
                      size={24}
                      teamColor="#E11D48"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 가운데 가위 절취선 */}
          <div className="flex items-center gap-2 shrink-0 select-none">
            <Scissors className="w-4 h-4 text-rose-400" />
            <div className="flex-1 border-t-[1.5px] border-dashed border-slate-300" />
            <span className="text-[11.5px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
              싹둑싹둑 오려요!
            </span>
            <div className="flex-1 border-t-[1.5px] border-dashed border-slate-300" />
            <Scissors className="w-4 h-4 text-rose-400 rotate-180" />
          </div>

          {/* 아랫줄: 왕글자 카드 6장 */}
          <div className="grid grid-cols-6 gap-2.5 flex-1">
            {wordRowOrder.map((item, idx) => {
              const isMatched = !!matched[item.ko];
              const isSel = selected === `txt:${item.ko}`;
              return (
                <div
                  key={`txt-${item.ko}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCard('txt', item)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCard('txt', item)}
                  className={`relative rounded-2xl border-[1.5px] border-dashed flex flex-col items-center justify-center p-2 cursor-pointer select-none transition-all ${
                    isMatched
                      ? 'border-emerald-400 bg-emerald-50/70'
                      : isSel
                      ? 'border-sky-400 bg-sky-50 scale-[1.03]'
                      : 'border-sky-300 bg-white hover:border-sky-400'
                  }`}
                >
                  <span className="absolute top-1.5 left-2 px-1.5 py-0.5 rounded bg-sky-100/80 text-[10.5px] font-black text-sky-700">
                    글자
                  </span>
                  <span className="text-[30px] font-black text-slate-800 tracking-tight text-center leading-tight break-keep">
                    {item.ko}
                  </span>
                  <div className="absolute bottom-1.5 right-1.5 opacity-80">
                    <MiniJollaman
                      pose={idx % 2 === 0 ? 'run' : 'cheer'}
                      size={24}
                      teamColor="#2563EB"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-3 text-[12.5px] font-bold text-slate-600 shrink-0">
          <span>✂️ 뒤집어서 메모리 게임!</span>
          <span className="text-slate-300">·</span>
          <span className="text-rose-700">짝꿍을 찾으면 큰 소리로 외치기!</span>
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

// Exported Renderer by index (0 ~ 4)
export const ClassroomPlayDraftSheet: React.FC<{
  sheetIndex: number;
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ sheetIndex, lang }) => {
  switch (sheetIndex) {
    case 0:
      return <ClassroomBingoSheet lang={lang} />;
    case 1:
      return <ClassroomBoardGameSheet lang={lang} />;
    case 2:
      return <ClassroomUrgentMazeSheet lang={lang} />;
    case 3:
      return <ClassroomHiddenPictureSheet lang={lang} />;
    case 4:
    default:
      return <ClassroomMemoryCardsSheet lang={lang} />;
  }
};
