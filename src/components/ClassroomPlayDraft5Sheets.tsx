import React, { useState } from 'react';
import { Dices, RotateCcw, Printer, Scissors } from 'lucide-react';
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

// 1~5과 데이터 전용 lookup (새 어휘 절대 금지)
const UNIT_1_5_WORDS: VocabularyItem[] = VOCABULARY_DATA.filter(
  (v) => v.ch >= 1 && v.ch <= 5
);

function findWord(korean: string): VocabularyItem {
  return UNIT_1_5_WORDS.find((w) => w.ko === korean) || UNIT_1_5_WORDS[0];
}

// 공통 외부(웹 전용) 컨트롤 바
const PlayWebBar: React.FC<{
  badge: string;
  children?: React.ReactNode;
  onPrintSingle?: () => void;
}> = ({ badge, children, onPrintSingle }) => (
  <div className="no-print w-full max-w-[1040px] mx-auto mb-2.5 flex flex-wrap items-center justify-between gap-2 bg-rose-50/90 border border-rose-200 rounded-xl px-3.5 py-2 shadow-sm">
    <div className="flex items-center gap-2 text-xs font-extrabold text-rose-900">
      <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-black">
        교실 한국어 놀이
      </span>
      <span>{badge}</span>
    </div>
    <div className="flex flex-wrap items-center gap-1.5">
      {children}
      {onPrintSingle && (
        <button
          type="button"
          onClick={onPrintSingle}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold bg-slate-900 text-white hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" /> 이 장만 인쇄
        </button>
      )}
    </div>
  </div>
);

/* ============================================================================
 * ① [유지+강화] 대빵 큰 그림 3×3 빙고 (2판 1장 절취형)
 * - 텍스트·영어·설명 싹 덜어내고 그림과 글자를 대빵 크게!
 * - 가운데 가위 점선에 졸라맨들이 매달려 "자르지 마~!" "으악!" 아우성!
 * ============================================================================ */
const BINGO_A = ['화장실', '물', '연필', '책', '선생님', '가방', '지우개', '약', '비누'].map((k) =>
  k === '가방' ? findWord('공책') : findWord(k)
);
const BINGO_B = ['연필', '약', '휴지', '지우개', '화장실', '책', '물', '비누', '공책'].map(findWord);

const ClassroomBingoSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
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
      <PlayWebBar badge="① 대빵 큰 그림 3×3 빙고 (클릭해서 동그라미!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => {
            setMarkedA({});
            setMarkedB({});
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 하기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5과 놀이 ①"
          title="대빵 큰 그림 3×3 빙고!"
          hint="가위로 싹둑 잘라 짝꿍과 한판!"
          accentHex="#D94A6B"
          tintHex="#FFF1F2"
        />

        {/* 2판 1장 + 가운데 매달린 졸라맨 절취선 */}
        <div className="flex-1 grid grid-cols-[1fr_54px_1fr] items-stretch gap-1 my-1">
          {[
            { label: '빨강 졸라맨 판', color: '#E11D48', bg: '#FFF1F2', items: BINGO_A, marked: markedA, side: 'A' as const },
            { label: '파랑 졸라맨 판', color: '#2563EB', bg: '#EFF6FF', items: BINGO_B, marked: markedB, side: 'B' as const },
          ].map((board, bIdx) => (
            <React.Fragment key={board.side}>
              <div
                className="rounded-2xl border-[3px] border-slate-900 p-3 flex flex-col justify-between"
                style={{ backgroundColor: board.bg }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MiniJollaman pose={bIdx === 0 ? 'cheer' : 'point'} size={34} teamColor={board.color} />
                    <span
                      className="text-[18px] font-black tracking-tight"
                      style={{ color: board.color }}
                    >
                      {board.label}
                    </span>
                  </div>
                  <div className="px-2.5 py-0.5 bg-white rounded-lg border-2 border-slate-800 text-[12px] font-black text-slate-800">
                    이름: ______
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 flex-1">
                  {board.items.map((item, idx) => {
                    const isMarked = !!board.marked[idx];
                    return (
                      <div
                        key={`${board.side}-${item.ko}-${idx}`}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggle(board.side, idx, item.ko)}
                        onKeyDown={(e) => e.key === 'Enter' && toggle(board.side, idx, item.ko)}
                        className="relative bg-white rounded-2xl border-[2.5px] border-slate-900 flex flex-col items-center justify-center p-2 cursor-pointer select-none transition-transform hover:scale-[1.02]"
                      >
                        <div className="w-16 h-16 flex items-center justify-center">
                          <VocabVisual item={item} size="lg" />
                        </div>
                        <span className="mt-1 text-[21px] font-black text-slate-900 leading-none tracking-tight">
                          {item.ko}
                        </span>
                        {isMarked && (
                          <div
                            className="absolute inset-1.5 rounded-full border-[5px] pointer-events-none opacity-85"
                            style={{ borderColor: board.color }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 가운데 절취선 (첫 번째 보드 뒤에만) */}
              {bIdx === 0 && (
                <div className="relative flex flex-col items-center justify-between py-2 select-none">
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-[3px] border-dashed border-slate-500" />
                  <div className="relative z-10 bg-white rounded-full p-1 border-2 border-slate-800">
                    <Scissors className="w-4 h-4 text-rose-600 rotate-90" />
                  </div>
                  <div className="relative z-10">
                    <JollaComic pose="cling" size={44} color="#E11D48" speech="자르지 마~!" />
                  </div>
                  <div className="relative z-10">
                    <JollaComic pose="urgent" size={44} color="#2563EB" speech="으악!" />
                  </div>
                  <div className="relative z-10 bg-white rounded-full p-1 border-2 border-slate-800">
                    <Scissors className="w-4 h-4 text-rose-600 -rotate-90" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 초간단 한 줄 푸터 */}
        <div className="mt-1.5 flex items-center justify-center gap-4 text-[13px] font-black text-slate-700 shrink-0">
          <span>① 낱말을 크게 외치며 동그라미 ○!</span>
          <span>·</span>
          <span className="text-rose-700">② 가로·세로·대각선 2줄 먼저 완성하면 빙고 만세!</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ② [유지+강화] 졸라맨 학교 대탈출! 15칸 주사위 보드게임
 * - 20칸 빡빡한 칸을 15칸 대빵 큰 징검다리(3줄×5칸)로 뻥 뚫어줌!
 * - 큰 그림 + 왕글자 + 코믹 졸라맨 이벤트 3종!
 * ============================================================================ */
interface BoardTile {
  no: number;
  kind: 'start' | 'goal' | 'word' | 'event';
  word?: string;
  eventTitle?: string;
  eventPose?: 'urgent' | 'splat' | 'cheer';
  eventBg?: string;
}

const BOARD_15: BoardTile[] = [
  // 1줄 (→) 0..4
  { no: 0, kind: 'start' },
  { no: 1, kind: 'word', word: '안녕하세요' },
  { no: 2, kind: 'word', word: '물' },
  { no: 3, kind: 'event', eventTitle: '급해요! +2칸', eventPose: 'urgent', eventBg: '#FEF08A' },
  { no: 4, kind: 'word', word: '화장실' },
  // 2줄 (←) 9..5 (화면상 왼쪽이 9, 오른쪽이 5)
  { no: 5, kind: 'word', word: '비누' },
  { no: 6, kind: 'word', word: '손' },
  { no: 7, kind: 'event', eventTitle: '아파요! 1번 쉼', eventPose: 'splat', eventBg: '#FECDD3' },
  { no: 8, kind: 'word', word: '약' },
  { no: 9, kind: 'word', word: '선생님' },
  // 3줄 (→) 10..14
  { no: 10, kind: 'word', word: '칠판' },
  { no: 11, kind: 'word', word: '책' },
  { no: 12, kind: 'event', eventTitle: '알아요! 한 번 더!', eventPose: 'cheer', eventBg: '#BBF7D0' },
  { no: 13, kind: 'word', word: '연필' },
  { no: 14, kind: 'goal' },
];

const ClassroomBoardGameSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [turn, setTurn] = useState<1 | 2>(1);
  const [dice, setDice] = useState<number | null>(null);

  const rollDice = () => {
    const d = Math.floor(Math.random() * 4) + 1; // 1~4 주사위 (15칸 맞춤)
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

  // 스네이크 순서: 1줄(0..4), 2줄(9,8,7,6,5), 3줄(10..14)
  const displayRows: BoardTile[][] = [
    BOARD_15.slice(0, 5),
    [...BOARD_15.slice(5, 10)].reverse(),
    BOARD_15.slice(10, 15),
  ];

  return (
    <div className="w-full">
      <PlayWebBar badge="② 졸라맨 학교 대탈출! 15칸 주사위 보드게임" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={rollDice}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-rose-600 text-white hover:bg-rose-700 cursor-pointer"
        >
          <Dices className="w-4 h-4" />
          {turn === 1 ? '빨강 졸라맨' : '파랑 졸라맨'} 굴리기 {dice ? `(${dice}칸!)` : ''}
        </button>
        <button
          type="button"
          onClick={() => {
            setP1(0);
            setP2(0);
            setTurn(1);
            setDice(null);
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 처음부터
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5과 놀이 ②"
          title="졸라맨 학교 대탈출! 15칸 보드게임"
          hint="도착한 칸의 낱말을 크게 외치기!"
          accentHex="#D94A6B"
          tintHex="#FFF1F2"
        />

        {/* 대빵 큰 3×5 스네이크 보드 */}
        <div className="flex-1 flex flex-col justify-center gap-4 my-1 relative">
          {displayRows.map((row, rIdx) => (
            <div key={rIdx} className="relative grid grid-cols-5 gap-3.5 flex-1">
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
                    className="relative rounded-2xl border-[3px] border-slate-900 flex flex-col items-center justify-center p-2 cursor-pointer select-none shadow-[3px_3px_0_#0F172A]"
                    style={{
                      backgroundColor:
                        tile.kind === 'start'
                          ? '#DCFCE7'
                          : tile.kind === 'goal'
                          ? '#FEF08A'
                          : tile.kind === 'event'
                          ? tile.eventBg
                          : '#FFFFFF',
                    }}
                  >
                    {/* 칸 번호 뱃지 */}
                    {tile.no > 0 && tile.no < 14 && (
                      <span className="absolute top-1.5 left-2 text-[13px] font-black text-slate-400">
                        {tile.no}
                      </span>
                    )}

                    {/* 출발 */}
                    {tile.kind === 'start' && (
                      <div className="flex flex-col items-center">
                        <JollaComic pose="cheer" size={56} color="#16A34A" speech="출발!!" />
                        <span className="text-[20px] font-black text-emerald-800 mt-0.5">출발!</span>
                      </div>
                    )}

                    {/* 도착 */}
                    {tile.kind === 'goal' && (
                      <div className="flex flex-col items-center">
                        <ManduMascot size="sm" mood="cheer" interactive={false} />
                        <span className="text-[22px] font-black text-amber-800 mt-1">탈출 성공! 🎉</span>
                      </div>
                    )}

                    {/* 코믹 이벤트 칸 */}
                    {tile.kind === 'event' && tile.eventPose && (
                      <div className="flex flex-col items-center text-center">
                        <JollaComic pose={tile.eventPose} size={52} color="#E11D48" />
                        <span className="mt-1 text-[16px] font-black text-slate-900 leading-tight">
                          {tile.eventTitle}
                        </span>
                      </div>
                    )}

                    {/* 일반 낱말 칸 */}
                    {tile.kind === 'word' && item && (
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 flex items-center justify-center">
                          <VocabVisual item={item} size="lg" />
                        </div>
                        <span className="mt-1 text-[21px] font-black text-slate-900 leading-none">
                          {item.ko}
                        </span>
                      </div>
                    )}

                    {/* 웹 플레이어 말 */}
                    {(hasP1 || hasP2) && (
                      <div className="no-print absolute -top-2.5 -right-2 flex items-center gap-0.5 z-20">
                        {hasP1 && (
                          <span className="w-7 h-7 rounded-full bg-rose-600 text-white border-2 border-slate-900 text-xs font-black flex items-center justify-center shadow">
                            빨
                          </span>
                        )}
                        {hasP2 && (
                          <span className="w-7 h-7 rounded-full bg-blue-600 text-white border-2 border-slate-900 text-xs font-black flex items-center justify-center shadow">
                            파
                          </span>
                        )}
                      </div>
                    )}

                    {/* 방향 화살표 */}
                    {showRightArrow && (
                      <span className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-[18px] font-black text-rose-500">
                        ▶
                      </span>
                    )}
                    {showLeftArrow && (
                      <span className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-10 text-[18px] font-black text-rose-500">
                        ◀
                      </span>
                    )}
                    {showDownArrow && (
                      <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 text-[18px] font-black text-rose-500">
                        ▼
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[13px] font-black text-slate-700 shrink-0">
          <span>🎲 주사위나 지우개로 톡톡! 도착한 칸 낱말을 큰 소리로 읽기!</span>
          <span className="text-rose-700">★ 끝까지 먼저 탈출하면 승리!</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ③ [신규!] 앗! 화장실이 급해!! 대빵 큰 교실 미로 대작전
 * - 페이지 전체를 가로지르는 대빵 큰 그림 길!
 * - 왼쪽 땀 뻘뻘 급한 졸라맨 → 6개 대빵 큰 체크포인트 → 오른쪽 왕 화장실 문!
 * - 중간중간 막다른 꽝 길 3곳에 꽈당 넘어진 졸라맨들 ("쾅! 칠판!", "앗! 보건실!", "지우개에 쿵!")
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
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
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
      <PlayWebBar badge="③ 앗! 화장실이 급해!! 대빵 큰 교실 미로 (순서대로 톡톡!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => setStepDone([])}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 길 지우기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5과 놀이 ③"
          title="앗! 화장실이 급해!! 교실 미로 대작전"
          hint="연필로 길을 따라 낱말을 읽으며 화장실까지 슝~!"
          accentHex="#D94A6B"
          tintHex="#FFF1F2"
        />

        {/* 대빵 큰 일러스트 미로 캔버스 */}
        <div className="relative flex-1 rounded-2xl border-[3px] border-slate-900 bg-amber-50/60 overflow-hidden my-1">
          {/* SVG 구불구불 도로 + 막다른 꽝 길 */}
          <svg
            viewBox="0 0 1000 540"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* 바닥 격자 느낌 */}
            <rect x="0" y="0" width="1000" height="540" fill="#FFFBEB" />

            {/* 막다른 꽝 길 3개 (회색) */}
            <path
              d="M 420 120 L 420 265"
              stroke="#CBD5E1"
              strokeWidth="44"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 400 410 L 185 415"
              stroke="#CBD5E1"
              strokeWidth="44"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 640 140 L 840 100"
              stroke="#CBD5E1"
              strokeWidth="44"
              strokeLinecap="round"
              fill="none"
            />

            {/* 정답 메인 구불구불 도로 (노란 테두리 + 흰 길) */}
            <path
              d="M 85 260 C 120 120, 150 120, 200 130 L 420 120 L 640 140 C 710 210, 710 350, 640 400 L 400 410 C 480 350, 730 330, 860 280"
              stroke="#0F172A"
              strokeWidth="62"
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
              stroke="#FB7185"
              strokeWidth="5"
              strokeDasharray="12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          {/* 왼쪽 출발! 대빵 큰 땀 뻘뻘 졸라맨 */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
            style={{ left: '8%', top: '48%' }}
          >
            <JollaComic pose="urgent" size={82} color="#E11D48" speech="급해요!!" />
            <span className="mt-1 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[14px] font-black border-2 border-slate-900">
              출발!
            </span>
          </div>

          {/* 6개 대빵 큰 그림 체크포인트 */}
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
                  className={`rounded-2xl border-[3px] border-slate-900 flex flex-col items-center justify-center shadow-[3px_3px_0_#0F172A] ${
                    isGoal
                      ? 'px-4 py-3 bg-sky-100'
                      : done
                      ? 'px-3 py-2 bg-emerald-100'
                      : 'px-3 py-2 bg-white'
                  }`}
                >
                  <span
                    className={`absolute -top-3 -left-3 w-7 h-7 rounded-full border-2 border-slate-900 text-white text-[14px] font-black flex items-center justify-center ${
                      isGoal ? 'bg-sky-600' : 'bg-rose-600'
                    }`}
                  >
                    {isGoal ? '★' : idx + 1}
                  </span>
                  <div className={isGoal ? 'w-20 h-20 flex items-center justify-center' : 'w-14 h-14 flex items-center justify-center'}>
                    <VocabVisual item={item} size={isGoal ? 'xl' : 'lg'} />
                  </div>
                  <span className={`font-black text-slate-900 leading-none mt-1 ${isGoal ? 'text-[24px] text-sky-900' : 'text-[20px]'}`}>
                    {item.ko}
                  </span>
                  {isGoal && (
                    <span className="mt-1 text-[12px] font-black text-sky-700">도착! 살았다~</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* 막다른 꽝 길 3곳 + 꽈당 졸라맨 */}
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
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 bg-rose-50 border-2 border-dashed border-rose-400 rounded-2xl px-2.5 py-1.5 cursor-pointer"
                style={{ left: `${de.x}%`, top: `${de.y}%` }}
              >
                <JollaComic pose="splat" size={46} color="#94A3B8" speech={de.speech} />
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <VocabVisual item={item} size="sm" />
                  </div>
                  <span className="text-[14px] font-black text-slate-600">{item.ko}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[13px] font-black text-slate-700 shrink-0">
          <span>✏️ ①→②→③→④→⑤ 순서대로 선을 그으며 낱말을 크게 읽어 보세요!</span>
          <span className="text-rose-700">꽝 길에 빠지면 꽈당~!</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ④ [신규!] 쿵쾅! 교실 숨은 물건·졸라맨 찾기 (대빵 큰 교실 그림판)
 * - 대빵 큰 일러스트 교실 장면(칠판·창문·시계·책상 2개·사물함) 속에
 *   1~5과 물건 7개가 숨어 있고 졸라맨들이 온 교실을 난장판으로!
 * - 아래 7개 도장 칸에 찾으면 동그라미 ○!
 * ============================================================================ */
const HIDDEN_ITEMS = [
  { word: '연필', x: 22, y: 26, rotate: -18, jollaPose: 'cling' as const, speech: '칠판 위!' },
  { word: '지우개', x: 52, y: 28, rotate: 12, jollaPose: null, speech: '' },
  { word: '책', x: 26, y: 63, rotate: -6, jollaPose: 'heavy' as const, speech: '책 무거워!' },
  { word: '공책', x: 58, y: 62, rotate: 10, jollaPose: null, speech: '' },
  { word: '필통', x: 82, y: 28, rotate: -14, jollaPose: 'float' as const, speech: '창문 밖!' },
  { word: '물', x: 78, y: 66, rotate: 5, jollaPose: 'splat' as const, speech: '앗 쏟아!' },
  { word: '비누', x: 11, y: 80, rotate: -8, jollaPose: 'urgent' as const, speech: '미끌~!' },
];

const ClassroomHiddenPictureSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [found, setFound] = useState<Record<string, boolean>>({});

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
      <PlayWebBar
        badge={`④ 쿵쾅! 교실 숨은 물건 찾기 (${Object.values(found).filter(Boolean).length} / ${HIDDEN_ITEMS.length} 찾음)`}
        onPrintSingle={onPrintSingle}
      >
        <button
          type="button"
          onClick={() => setFound({})}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 찾기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5과 놀이 ④"
          title="쿵쾅! 교실 숨은 물건·졸라맨 찾기"
          hint="교실 그림 속에 숨은 물건 7개를 찾아 동그라미 ○!"
          accentHex="#D94A6B"
          tintHex="#FFF1F2"
        />

        {/* 대빵 큰 교실 일러스트 배경 + 숨은 물건 7개 */}
        <div className="relative flex-1 rounded-2xl border-[3px] border-slate-900 overflow-hidden my-1 bg-amber-50">
          {/* 대빵 큰 교실 SVG 배경 (칠판, 창문, 책상, 바닥) */}
          <svg
            viewBox="0 0 1000 440"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            {/* 벽 & 바닥 */}
            <rect x="0" y="0" width="1000" height="270" fill="#FEF9C3" />
            <rect x="0" y="270" width="1000" height="170" fill="#FDE68A" />
            <line x1="0" y1="270" x2="1000" y2="270" stroke="#0F172A" strokeWidth="3.5" />

            {/* 커다란 초록 칠판 */}
            <rect x="130" y="34" width="480" height="175" rx="10" fill="#15803D" stroke="#78350F" strokeWidth="10" />
            <text x="295" y="95" fontSize="26" fontWeight="900" fill="#DCFCE7" opacity="0.5">
              해볼 한국어 교실
            </text>
            <line x1="170" y1="196" x2="570" y2="196" stroke="#92400E" strokeWidth="8" strokeLinecap="round" />

            {/* 오른쪽 커다란 창문 (구름+하늘) */}
            <rect x="690" y="34" width="240" height="165" rx="10" fill="#BAE6FD" stroke="#0F172A" strokeWidth="4" />
            <line x1="810" y1="34" x2="810" y2="199" stroke="#0F172A" strokeWidth="3.5" />
            <line x1="690" y1="116" x2="930" y2="116" stroke="#0F172A" strokeWidth="3.5" />
            <circle cx="745" cy="76" r="20" fill="#FEF08A" />

            {/* 왼쪽 책상 1 */}
            <rect x="145" y="255" width="230" height="36" rx="8" fill="#D97706" stroke="#0F172A" strokeWidth="3.5" />
            <line x1="175" y1="291" x2="175" y2="395" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
            <line x1="345" y1="291" x2="345" y2="395" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />

            {/* 가운데 책상 2 */}
            <rect x="465" y="255" width="230" height="36" rx="8" fill="#D97706" stroke="#0F172A" strokeWidth="3.5" />
            <line x1="495" y1="291" x2="495" y2="395" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
            <line x1="665" y1="291" x2="665" y2="395" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />

            {/* 오른쪽 사물함 */}
            <rect x="750" y="245" width="175" height="150" rx="8" fill="#93C5FD" stroke="#0F172A" strokeWidth="3.5" />
            <line x1="837" y1="245" x2="837" y2="395" stroke="#0F172A" strokeWidth="3" />
          </svg>

          {/* 칠판 옆에서 구경하는 왕 만두 */}
          <div className="absolute left-3 top-4 z-10 flex flex-col items-center">
            <ManduMascot size="sm" mood="think" interactive={false} />
            <span className="px-2 py-0.5 bg-white border-2 border-slate-900 rounded-full text-[11px] font-black">
              어디 숨었지?
            </span>
          </div>

          {/* 7개 숨은 물건 + 코믹 졸라맨 */}
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
                  <JollaComic pose={hi.jollaPose} size={46} color="#E11D48" speech={hi.speech} />
                )}
                <div
                  className={`relative rounded-2xl p-1.5 transition-all ${
                    isFound
                      ? 'bg-rose-100/90 ring-4 ring-rose-500 scale-110'
                      : 'bg-white/85 border-2 border-slate-900 shadow-sm'
                  }`}
                  style={{ transform: `rotate(${hi.rotate}deg)` }}
                >
                  <div className="w-14 h-14 flex items-center justify-center">
                    <VocabVisual item={item} size="md" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 아래쪽 7개 체크리스트 도장 바 (깔끔하고 큼직하게!) */}
        <div className="mt-1.5 grid grid-cols-7 gap-2 shrink-0">
          {HIDDEN_ITEMS.map((hi) => {
            const item = findWord(hi.word);
            const isFound = !!found[hi.word];
            return (
              <div
                key={`chk-${hi.word}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleFind(hi.word)}
                onKeyDown={(e) => e.key === 'Enter' && toggleFind(hi.word)}
                className={`rounded-xl border-[2.5px] border-slate-900 px-2 py-1.5 flex items-center justify-between cursor-pointer select-none ${
                  isFound ? 'bg-rose-100' : 'bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    <VocabVisual item={item} size="xs" />
                  </div>
                  <span className="text-[16px] font-black text-slate-900">{item.ko}</span>
                </div>
                <span
                  className={`w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center text-[14px] font-black ${
                    isFound ? 'bg-rose-600 text-white' : 'bg-slate-50 text-transparent'
                  }`}
                >
                  ○
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ⑤ [유지+강화] 싹둑싹둑! 그림·글자 짝꿍 카드 12장
 * - 6쌍(그림 6장 + 왕글자 6장), 잡텍스트·로마자 싹 제거!
 * - 대빵 큰 그림(`w-20 h-20`) + 대빵 큰 글자(`text-[34px]`) + 귀퉁이 빼꼼 졸라맨!
 * ============================================================================ */
const CARD_PAIRS = ['화장실', '물', '약', '선생님', '책', '연필'].map(findWord);

const ClassroomMemoryCardsSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, boolean>>({});

  // 위줄 그림 6장 (순서대로), 아래줄 글자 6장 (살짝 섞음)
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
      <PlayWebBar badge="⑤ 싹둑싹둑! 그림·글자 짝꿍 카드 12장 (웹에서도 짝맞추기!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            setMatched({});
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 초기화
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5과 놀이 ⑤"
          title="싹둑싹둑! 그림·글자 짝꿍 카드 12장"
          hint="점선 따라 오려서 그림 카드와 글자 카드 짝꿍 찾기!"
          accentHex="#D94A6B"
          tintHex="#FFF1F2"
        />

        {/* 12장 대빵 큰 절취 카드 (윗줄 그림 6장 / 아랫줄 왕글자 6장) */}
        <div className="flex-1 flex flex-col justify-between gap-3 my-1">
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
                  className={`relative rounded-2xl border-[3px] border-dashed flex flex-col items-center justify-center p-2 cursor-pointer select-none transition-all ${
                    isMatched
                      ? 'border-emerald-600 bg-emerald-50'
                      : isSel
                      ? 'border-rose-600 bg-rose-50 scale-[1.03]'
                      : 'border-slate-700 bg-rose-50/40'
                  }`}
                >
                  <span className="absolute top-1.5 left-2 text-[11px] font-black text-rose-500">
                    그림
                  </span>
                  <div className="w-24 h-24 flex items-center justify-center">
                    <VocabVisual item={item} size="xl" />
                  </div>
                  <div className="absolute bottom-1 right-1 opacity-85">
                    <MiniJollaman
                      pose={idx % 2 === 0 ? 'cheer' : 'point'}
                      size={26}
                      teamColor="#E11D48"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 가운데 가위 절취선 */}
          <div className="flex items-center gap-2 shrink-0 select-none">
            <Scissors className="w-4 h-4 text-rose-600" />
            <div className="flex-1 border-t-[2.5px] border-dashed border-slate-400" />
            <span className="text-[12px] font-black text-rose-600">싹둑싹둑 오려요!</span>
            <div className="flex-1 border-t-[2.5px] border-dashed border-slate-400" />
            <Scissors className="w-4 h-4 text-rose-600 rotate-180" />
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
                  className={`relative rounded-2xl border-[3px] border-dashed flex flex-col items-center justify-center p-2 cursor-pointer select-none transition-all ${
                    isMatched
                      ? 'border-emerald-600 bg-emerald-50'
                      : isSel
                      ? 'border-sky-600 bg-sky-50 scale-[1.03]'
                      : 'border-slate-700 bg-white'
                  }`}
                >
                  <span className="absolute top-1.5 left-2 text-[11px] font-black text-sky-600">
                    글자
                  </span>
                  <span className="text-[32px] font-black text-slate-900 tracking-tight text-center leading-tight break-keep">
                    {item.ko}
                  </span>
                  <div className="absolute bottom-1 right-1 opacity-85">
                    <MiniJollaman
                      pose={idx % 2 === 0 ? 'run' : 'cheer'}
                      size={26}
                      teamColor="#2563EB"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-center gap-4 text-[13px] font-black text-slate-700 shrink-0">
          <span>✂️ 뒤집어서 메모리 게임!</span>
          <span>·</span>
          <span className="text-rose-700">짝꿍을 찾으면 큰 소리로 외치기!</span>
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
}> = ({ sheetIndex, lang, onPrintSingle }) => {
  switch (sheetIndex) {
    case 0:
      return <ClassroomBingoSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 1:
      return <ClassroomBoardGameSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 2:
      return <ClassroomUrgentMazeSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 3:
      return <ClassroomHiddenPictureSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 4:
    default:
      return <ClassroomMemoryCardsSheet lang={lang} onPrintSingle={onPrintSingle} />;
  }
};
