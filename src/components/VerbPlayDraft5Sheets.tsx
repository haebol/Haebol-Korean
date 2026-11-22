import React, { useState } from 'react';
import { Dices, RotateCcw, Printer } from 'lucide-react';
import { SupportedLanguage } from '../types';
import {
  VerbWorksheetItem,
  VERB_UNIT_1_WORKSHEET_ITEMS,
  VERB_UNIT_2_WORKSHEET_ITEMS,
  VERB_UNIT_3_WORKSHEET_ITEMS,
  VERB_UNIT_4_WORKSHEET_ITEMS,
  VERB_UNIT_5_WORKSHEET_ITEMS,
} from './VerbConjugationWorksheetPage';
import { ManduMascot } from './ManduMascot';
import { JollaComic, PlaybookHeader } from './JollaPlayArt';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';
import { PlaySheetMeta } from './ClassroomPlayDraft5Sheets';

export const VERB_PLAY_SHEETS_META: PlaySheetMeta[] = [
  {
    id: 'verb_play_1',
    idx: 0,
    circledNo: '①',
    title: '우당탕탕! 왕만두 찜통 요리사',
    subtitle: '1~5단원 · 왕만두 용언을 알맞은 찜통(-아요·-어요·-해요)에 퐁당!',
    dropdownLabel: '① 1강(1~5단원) · 우당탕탕! 왕만두 찜통 요리사',
    previewMain: '🥟 찜통요리',
    previewChips: ['1~5단원', '만두 선잇기', '요리사 졸라맨'],
  },
  {
    id: 'verb_play_2',
    idx: 1,
    circledNo: '②',
    title: '둥실둥실! 3색 풍선 색칠하기',
    subtitle: '1~5단원 · 하늘로 날아가는 9개 대빵 큰 풍선! 빨강·파랑·보라 색칠!',
    dropdownLabel: '② 1강(1~5단원) · 둥실둥실 3색 풍선 색칠하기',
    previewMain: '🎈 3색풍선',
    previewChips: ['1~5단원', '색칠 놀이', '9개 왕풍선'],
  },
  {
    id: 'verb_play_3',
    idx: 2,
    circledNo: '③',
    title: '몸으로 말해요! 엉뚱 졸라맨 동작 무대',
    subtitle: '1~5단원 · 큼직한 12칸 바깥길 + 가운데 대빵 큰 댄스 무대!',
    dropdownLabel: '③ 1강(1~5단원) · 몸으로 말해요 동작 무대',
    previewMain: '🕺 동작무대',
    previewChips: ['1~5단원', '12칸 보드', '몸짓 흉내'],
  },
  {
    id: 'verb_play_4',
    idx: 3,
    circledNo: '④',
    title: '어푸어푸! 변신 징검다리 강 건너기',
    subtitle: '4·5단원 ★불규칙 · 폭탄 돌 피하고 진짜 변신 돌만 밟아 건너기!',
    dropdownLabel: '④ 1강(1~5단원) · 어푸어푸! 변신 징검다리',
    previewMain: '🌊 징검다리',
    previewChips: ['4·5단원 ★', '폭탄 피하기', '강 건너기'],
  },
  {
    id: 'verb_play_5',
    idx: 4,
    circledNo: '⑤',
    title: '월척이다! 낚시왕 졸라맨 문장 낚시터',
    subtitle: '1~5단원 · 연못 속 대빵 큰 물고기 용언을 낚싯줄로 쭈욱 낚기!',
    dropdownLabel: '⑤ 1강(1~5단원) · 낚시왕 졸라맨 문장 낚시터',
    previewMain: '🎣 문장낚시',
    previewChips: ['1~5단원', '물고기 선잇기', '낚시터'],
  },
];

// 1~5단원 데이터 전용 lookup
const ALL_U1_5_VERBS: VerbWorksheetItem[] = [
  ...VERB_UNIT_1_WORKSHEET_ITEMS,
  ...VERB_UNIT_2_WORKSHEET_ITEMS,
  ...VERB_UNIT_3_WORKSHEET_ITEMS,
  ...VERB_UNIT_4_WORKSHEET_ITEMS,
  ...VERB_UNIT_5_WORKSHEET_ITEMS,
];

function findVerb(base: string): VerbWorksheetItem {
  return ALL_U1_5_VERBS.find((v) => v.baseWord === base) || ALL_U1_5_VERBS[0];
}

const PlayWebBar: React.FC<{
  badge: string;
  children?: React.ReactNode;
  onPrintSingle?: () => void;
}> = ({ badge, children, onPrintSingle }) => (
  <div className="no-print w-full max-w-[1040px] mx-auto mb-2.5 flex flex-wrap items-center justify-between gap-2 bg-purple-50/90 border border-purple-200 rounded-xl px-3.5 py-2 shadow-sm">
    <div className="flex items-center gap-2 text-xs font-extrabold text-purple-900">
      <span className="px-2 py-0.5 rounded-md bg-purple-700 text-white text-[11px] font-black">
        용언 놀이
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
 * ① [신규!] 우당탕탕! 왕만두 찜통 요리사
 * - 위쪽: 요리사 졸라맨이 번쩍 든 6개 왕만두 용언
 * - 아래쪽: 대빵 큰 대나무 찜통 3개 (-아요 / -어요 / -해요)
 * - 선을 쭈욱 그어 찜통에 퐁당! (웹에선 만두 클릭 → 찜통 클릭으로 선 연결!)
 * ============================================================================ */
type SteamerType = 'ayo' | 'eoyo' | 'haeyo';

const DUMPLINGS: { base: string; target: SteamerType }[] = [
  { base: '놀다', target: 'ayo' },
  { base: '먹다', target: 'eoyo' },
  { base: '공부하다', target: 'haeyo' },
  { base: '오다', target: 'ayo' },
  { base: '씻다', target: 'eoyo' },
  { base: '청소하다', target: 'haeyo' },
];

const STEAMERS: { id: SteamerType; label: string; color: string; bg: string; xPct: number }[] = [
  { id: 'ayo', label: '-아요 찜통', color: '#E11D48', bg: '#FFE4E6', xPct: 18 },
  { id: 'eoyo', label: '-어요 찜통', color: '#2563EB', bg: '#DBEAFE', xPct: 50 },
  { id: 'haeyo', label: '-해요 찜통', color: '#7E22CE', bg: '#F3E8FF', xPct: 82 },
];

const VerbDumplingChefSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [picked, setPicked] = useState<number | null>(null);
  const [dropped, setDropped] = useState<Record<number, SteamerType>>({});

  const pickDumpling = (idx: number, word: string) => {
    playCutePop();
    speakKorean(word);
    setPicked(idx);
  };

  const dropToSteamer = (steamer: SteamerType) => {
    if (picked === null) return;
    const d = DUMPLINGS[picked];
    if (d.target === steamer) {
      playSuccessChime();
      const v = findVerb(d.base);
      speakKorean(v.conjugatedWord);
      setDropped((p) => ({ ...p, [picked]: steamer }));
      setPicked(null);
    } else {
      playCutePop();
    }
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="① 우당탕탕! 왕만두 찜통 요리사 (만두 → 찜통 클릭!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => {
            setPicked(null);
            setDropped({});
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-purple-300 text-purple-800 hover:bg-purple-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 요리
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5단원 놀이 ①"
          title="우당탕탕! 왕만두 찜통 요리사"
          hint="만두를 알맞은 찜통으로 쭈욱~ 선 이어 퐁당!"
          accentHex="#7E22CE"
          tintHex="#FAF5FF"
        />

        {/* 요리 캔버스 */}
        <div className="relative flex-1 flex flex-col justify-between py-2 my-1">
          {/* 연결선 SVG 오버레이 */}
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            preserveAspectRatio="none"
          >
            {Object.entries(dropped).map(([idxStr, stId]) => {
              const i = Number(idxStr);
              const x1 = ((i + 0.5) / 6) * 1000;
              const st = STEAMERS.find((s) => s.id === stId)!;
              const x2 = (st.xPct / 100) * 1000;
              return (
                <path
                  key={idxStr}
                  d={`M ${x1} 215 C ${x1} 290, ${x2} 255, ${x2} 325`}
                  stroke={st.color}
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* 위쪽: 6개 왕만두 용언 카드 */}
          <div className="grid grid-cols-6 gap-2.5 z-20">
            {DUMPLINGS.map((d, idx) => {
              const item = findVerb(d.base);
              const isPicked = picked === idx;
              const isDone = !!dropped[idx];
              return (
                <div
                  key={d.base}
                  role="button"
                  tabIndex={0}
                  onClick={() => pickDumpling(idx, item.baseWord)}
                  onKeyDown={(e) => e.key === 'Enter' && pickDumpling(idx, item.baseWord)}
                  className="flex flex-col items-center cursor-pointer select-none"
                >
                  {/* 왕만두 모양 버블 */}
                  <div
                    className={`w-full rounded-[32px] border-[3px] border-slate-900 px-2 pt-2.5 pb-3 flex flex-col items-center shadow-[3px_3px_0_#0F172A] transition-transform ${
                      isDone
                        ? 'bg-emerald-50 border-emerald-700'
                        : isPicked
                        ? 'bg-amber-100 scale-105'
                        : 'bg-amber-50'
                    }`}
                  >
                    <img
                      src={item.illustrationSvg}
                      alt={item.baseWord}
                      className="w-16 h-16 object-contain"
                    />
                    <span className="mt-1 text-[21px] font-black text-slate-900 leading-none">
                      {item.baseWord}
                    </span>
                    {isDone && (
                      <span className="mt-1 text-[13px] font-black text-emerald-700">
                        → {item.conjugatedWord}!
                      </span>
                    )}
                  </div>
                  {/* 출발 동그라미 점 */}
                  <span className="mt-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-white shadow" />
                </div>
              );
            })}
          </div>

          {/* 중간 빈 공간에 코믹 요리사 졸라맨들! */}
          <div className="flex items-center justify-around py-1 pointer-events-none">
            <JollaComic pose="chef" size={58} color="#E11D48" speech="뜨거워!!" />
            <ManduMascot size="sm" mood="cheer" interactive={false} />
            <JollaComic pose="chef" size={58} color="#7E22CE" speech="어느 찜통?!" />
          </div>

          {/* 아래쪽: 3개 대빵 큰 대나무 찜통 */}
          <div className="grid grid-cols-3 gap-6 z-20 px-4">
            {STEAMERS.map((st) => (
              <div
                key={st.id}
                role="button"
                tabIndex={0}
                onClick={() => dropToSteamer(st.id)}
                onKeyDown={(e) => e.key === 'Enter' && dropToSteamer(st.id)}
                className="flex flex-col items-center cursor-pointer select-none group"
              >
                {/* 도착 동그라미 점 */}
                <span
                  className="mb-1.5 w-5 h-5 rounded-full border-[3px] border-slate-900"
                  style={{ backgroundColor: st.color }}
                />
                {/* 대나무 찜통 일러스트 박스 */}
                <div
                  className="w-full rounded-b-[28px] rounded-t-2xl border-[3.5px] border-slate-900 p-4 flex flex-col items-center shadow-[4px_4px_0_#0F172A] transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: st.bg }}
                >
                  <div className="text-[13px] font-black text-slate-600 tracking-widest mb-1">
                    ♨ 모락모락 ♨
                  </div>
                  <span
                    className="text-[28px] font-black tracking-tight leading-none"
                    style={{ color: st.color }}
                  >
                    {st.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center gap-5 text-[13px] font-black text-slate-700 shrink-0">
          <span>🥟 ㅏ·ㅗ → <strong className="text-rose-600">-아요</strong></span>
          <span>·</span>
          <span>🥟 그 밖 → <strong className="text-blue-600">-어요</strong></span>
          <span>·</span>
          <span>🥟 하다 → <strong className="text-purple-700">-해요</strong></span>
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
          <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ② [유지+강화] 둥실둥실! -아요·-어요·-해요 3색 풍선 색칠하기
 * - 15개 빡빡한 표를 9개 대빵 큰 하늘 풍선(3×3)으로 뻥 뚫어줌!
 * - 풍선에 매달려 둥실 떠다니는 졸라맨 + 큰 그림 + 왕글자!
 * ============================================================================ */
const BALLOON_9: { base: string; type: SteamerType }[] = [
  { base: '놀다', type: 'ayo' },
  { base: '먹다', type: 'eoyo' },
  { base: '공부하다', type: 'haeyo' },
  { base: '받다', type: 'ayo' },
  { base: '씻다', type: 'eoyo' },
  { base: '청소하다', type: 'haeyo' },
  { base: '닫다', type: 'ayo' },
  { base: '읽다', type: 'eoyo' },
  { base: '인사하다', type: 'haeyo' },
];

const VerbBalloonsSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [brush, setBrush] = useState<SteamerType>('ayo');
  const [painted, setPainted] = useState<Record<string, SteamerType>>({});

  const colorMap: Record<SteamerType, { fill: string; border: string; label: string }> = {
    ayo: { fill: '#FFE4E6', border: '#E11D48', label: '빨강 -아요' },
    eoyo: { fill: '#DBEAFE', border: '#2563EB', label: '파랑 -어요' },
    haeyo: { fill: '#F3E8FF', border: '#7E22CE', label: '보라 -해요' },
  };

  const paintBalloon = (base: string, correct: SteamerType) => {
    playCutePop();
    const item = findVerb(base);
    speakKorean(item.conjugatedWord);
    setPainted((p) => {
      const next = { ...p, [base]: brush };
      if (brush === correct) playSuccessChime();
      return next;
    });
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="② 둥실둥실! 3색 풍선 색칠하기 (색연필 골라 풍선 클릭!)" onPrintSingle={onPrintSingle}>
        {(['ayo', 'eoyo', 'haeyo'] as SteamerType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setBrush(t)}
            className={`px-2.5 py-1 rounded-lg text-xs font-black border-2 cursor-pointer ${
              brush === t ? 'border-slate-900 scale-105' : 'border-transparent opacity-70'
            }`}
            style={{ backgroundColor: colorMap[t].fill, color: colorMap[t].border }}
          >
            🖍 {colorMap[t].label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPainted({})}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-purple-300 text-purple-800 hover:bg-purple-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 지우기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5단원 놀이 ②"
          title="둥실둥실! 3색 풍선 색칠하기"
          hint="알맞은 색연필로 대빵 큰 풍선을 예쁘게 색칠해요!"
          accentHex="#7E22CE"
          tintHex="#FAF5FF"
        />

        {/* 색연필 범례 3개 */}
        <div className="flex items-center justify-center gap-5 mb-1.5 shrink-0">
          {(['ayo', 'eoyo', 'haeyo'] as SteamerType[]).map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 px-4 py-1 rounded-full border-[2.5px] border-slate-900"
              style={{ backgroundColor: colorMap[t].fill }}
            >
              <span
                className="w-4 h-4 rounded-full border-2 border-slate-900"
                style={{ backgroundColor: colorMap[t].border }}
              />
              <span className="text-[16px] font-black" style={{ color: colorMap[t].border }}>
                {colorMap[t].label}
              </span>
            </div>
          ))}
        </div>

        {/* 대빵 큰 9개 풍선 하늘 (3×3) */}
        <div className="relative flex-1 rounded-2xl border-[2.5px] border-sky-200 bg-sky-50/40 p-3 grid grid-cols-3 gap-x-6 gap-y-2 items-center">
          {BALLOON_9.map((b, idx) => {
            const item = findVerb(b.base);
            const pColor = painted[b.base];
            return (
              <div
                key={b.base}
                role="button"
                tabIndex={0}
                onClick={() => paintBalloon(b.base, b.type)}
                onKeyDown={(e) => e.key === 'Enter' && paintBalloon(b.base, b.type)}
                className="flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                {/* 대빵 큰 풍선 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-[186px] h-[118px] rounded-[50%] border-[3px] border-slate-900 flex items-center justify-center gap-2.5 px-4 shadow-[3px_3px_0_#0F172A] transition-colors"
                    style={{
                      backgroundColor: pColor ? colorMap[pColor].fill : '#FFFFFF',
                    }}
                  >
                    <img
                      src={item.illustrationSvg}
                      alt={item.baseWord}
                      className="w-16 h-16 object-contain shrink-0"
                    />
                    <span className="text-[24px] font-black text-slate-900 leading-tight">
                      {item.baseWord}
                    </span>
                  </div>
                  {/* 풍선 매듭 + 꼬불꼬불 줄 */}
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-slate-900" />
                  <div className="w-[2.5px] h-4 bg-slate-800" />
                </div>

                {/* 매달린 졸라맨 (홀짝에 재미있게 배치) */}
                {idx % 2 === 0 && (
                  <JollaComic
                    pose="float"
                    size={42}
                    color={idx % 4 === 0 ? '#7E22CE' : '#E11D48'}
                    speech={idx === 0 ? '둥실~' : idx === 4 ? '높아!' : undefined}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-1 flex items-center justify-center text-[13px] font-black text-slate-700 shrink-0">
          🎈 색칠하고 “놀아요! 먹어요! 공부해요!” 큰 소리로 변신해 보세요!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
          <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ③ [유지+강화] 몸으로 말해요! 엉뚱 졸라맨 동작 주사위 무대
 * - 18칸 빡빡한 보드를 12칸 대빵 큰 바깥길(4×4 테두리) + 가운데 2×2 거대 스포트라이트 무대로!
 * ============================================================================ */
const STAGE_12 = [
  '먹다', '씻다', '입다', '읽다',
  '놀다', '청소하다', '인사하다', '공부하다',
  '마시다', '쓰다', '듣다', '부르다',
].map(findVerb);

// 4×4 테두리 12칸 좌표 (r, c) 시계방향
const RING_POS: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3],
  [1, 3], [2, 3],
  [3, 3], [3, 2], [3, 1], [3, 0],
  [2, 0], [1, 0],
];

const VerbActionStageSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [pos, setPos] = useState(0);
  const [dice, setDice] = useState<number | null>(null);

  const roll = () => {
    const d = Math.floor(Math.random() * 4) + 1;
    setDice(d);
    playCutePop();
    const next = (pos + d) % STAGE_12.length;
    setPos(next);
    speakKorean(STAGE_12[next].conjugatedWord);
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="③ 몸으로 말해요! 엉뚱 졸라맨 동작 무대" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={roll}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black bg-purple-700 text-white hover:bg-purple-800 cursor-pointer"
        >
          <Dices className="w-4 h-4" /> 주사위 굴리기 {dice ? `(${dice}칸!)` : ''}
        </button>
        <button
          type="button"
          onClick={() => {
            setPos(0);
            setDice(null);
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-purple-300 text-purple-800 hover:bg-purple-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 처음부터
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5단원 놀이 ③"
          title="몸으로 말해요! 엉뚱 졸라맨 동작 무대"
          hint="도착한 칸 동작을 몸으로 흉내 내며 '~해요!' 외치기!"
          accentHex="#7E22CE"
          tintHex="#FAF5FF"
        />

        {/* 4×4 그리드: 바깥 12칸 + 가운데 2×2 거대 댄스 무대 */}
        <div className="flex-1 grid grid-cols-4 grid-rows-4 gap-2.5 my-1">
          {Array.from({ length: 16 }).map((_, cellIdx) => {
            const r = Math.floor(cellIdx / 4);
            const c = cellIdx % 4;

            // 가운데 2×2 (r=1..2, c=1..2) -> (1,1)에서만 span-2로 렌더!
            if (r === 1 && c === 1) {
              return (
                <div
                  key="center-stage"
                  className="col-span-2 row-span-2 rounded-3xl border-[3.5px] border-slate-900 bg-gradient-to-b from-purple-100 via-fuchsia-50 to-amber-50 p-3 flex flex-col items-center justify-between shadow-inner"
                >
                  <div className="px-3 py-0.5 rounded-full bg-purple-700 text-white text-[13px] font-black tracking-wide">
                    ★ 엉뚱 졸라맨 동작 무대 ★
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <JollaComic pose="dance" size={88} color="#7E22CE" speech="따라 해 봐!" />
                    <ManduMascot size="md" mood="cheer" interactive={false} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-white border-2 border-slate-900 text-[13px] font-black">
                      🤖 로봇처럼!
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border-2 border-slate-900 text-[13px] font-black">
                      📣 왕 크게!
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border-2 border-slate-900 text-[13px] font-black">
                      😆 웃으면서!
                    </span>
                  </div>
                </div>
              );
            }
            if ((r === 1 && c === 2) || (r === 2 && c === 1) || (r === 2 && c === 2)) {
              return null;
            }

            const ringIdx = RING_POS.findIndex(([rr, cc]) => rr === r && cc === c);
            const item = STAGE_12[ringIdx];
            const isHere = pos === ringIdx;

            return (
              <div
                key={`tile-${ringIdx}`}
                role="button"
                tabIndex={0}
                onClick={() => {
                  playCutePop();
                  speakKorean(item.conjugatedWord);
                  setPos(ringIdx);
                }}
                onKeyDown={(e) => e.key === 'Enter' && speakKorean(item.conjugatedWord)}
                className={`relative rounded-2xl border-[3px] border-slate-900 px-3 py-2 flex items-center justify-center gap-2.5 cursor-pointer select-none shadow-[3px_3px_0_#0F172A] ${
                  isHere ? 'bg-amber-200' : ringIdx === 0 ? 'bg-emerald-50' : 'bg-white'
                }`}
              >
                <span className="absolute top-1 left-2 text-[12px] font-black text-purple-500">
                  {ringIdx === 0 ? '출발!' : ringIdx + 1}
                </span>
                <img
                  src={item.illustrationSvg}
                  alt={item.baseWord}
                  className="w-16 h-16 object-contain shrink-0"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[22px] font-black text-slate-900 leading-none">
                    {item.baseWord}
                  </span>
                  <span className="mt-1 text-[13px] font-black text-purple-700">
                    → ______요!
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-1 flex items-center justify-center text-[13px] font-black text-slate-700 shrink-0">
          🕺 짝꿍이 내 동작을 맞히면 박수 짝짝짝!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
          <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ④ [신규!] 어푸어푸! 변신 징검다리 강 건너기 (4·5단원 ★불규칙)
 * - 페이지 전체에 대빵 큰 파란 강물!
 * - 6쌍의 큼직한 징검다리 돌 (진짜 변신 돌 vs 뻥 폭탄 돌💣)
 * - 강물 속에서 허우적대는 어푸어푸 졸라맨 + 건너편 만두 응원!
 * ============================================================================ */
const RIVER_STONES = [
  { base: '오다', good: '와요', bad: '오아요', goodTop: true },
  { base: '보다', good: '봐요', bad: '보아요', goodTop: false },
  { base: '돕다', good: '도와요', bad: '돕아요', goodTop: true },
  { base: '주다', good: '줘요', bad: '주어요', goodTop: false },
  { base: '듣다', good: '들어요', bad: '듣어요', goodTop: true },
  { base: '부르다', good: '불러요', bad: '부르어요', goodTop: false },
];

const VerbRiverCrossingSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [stepped, setStepped] = useState<Record<number, 'good' | 'bad'>>({});

  const stepStone = (idx: number, kind: 'good' | 'bad', text: string) => {
    playCutePop();
    if (kind === 'good') {
      speakKorean(text);
      setStepped((p) => {
        const next = { ...p, [idx]: 'good' as const };
        if (Object.values(next).filter((v) => v === 'good').length === RIVER_STONES.length) {
          playSuccessChime();
        }
        return next;
      });
    } else {
      setStepped((p) => ({ ...p, [idx]: 'bad' }));
    }
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="④ 어푸어푸! 변신 징검다리 강 건너기 (진짜 돌만 밟아 건너기!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => setStepped({})}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-purple-300 text-purple-800 hover:bg-purple-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 건너기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="4·5단원 ★ 놀이 ④"
          title="어푸어푸! 변신 징검다리 강 건너기"
          hint="진짜 변신 돌에 동그라미 ○ 치고 강을 건너요!"
          accentHex="#7E22CE"
          tintHex="#FAF5FF"
        />

        {/* 대빵 큰 강물 캔버스 */}
        <div className="relative flex-1 rounded-2xl border-[3px] border-slate-900 bg-sky-200 overflow-hidden my-1 flex items-stretch">
          {/* 강물 물결 SVG */}
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <path d="M 100 90 Q 160 65 220 90 T 340 90 T 460 90 T 580 90 T 700 90 T 880 90" stroke="#7DD3FC" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 120 260 Q 180 235 240 260 T 360 260 T 480 260 T 600 260 T 720 260 T 880 260" stroke="#7DD3FC" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 110 430 Q 170 405 230 430 T 350 430 T 470 430 T 590 430 T 710 430 T 890 430" stroke="#38BDF8" strokeWidth="8" fill="none" strokeLinecap="round" />
          </svg>

          {/* 왼쪽 풀밭 (출발 졸라맨) */}
          <div className="w-[105px] bg-emerald-200 border-r-[3.5px] border-slate-900 flex flex-col items-center justify-center p-2 z-10 shrink-0">
            <JollaComic pose="urgent" size={66} color="#7E22CE" speech="건너자!" />
            <span className="mt-2 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[14px] font-black">
              출발!
            </span>
          </div>

          {/* 가운데 6쌍의 징검다리 돌 */}
          <div className="flex-1 grid grid-cols-6 gap-2.5 px-3 py-4 z-10 items-center">
            {RIVER_STONES.map((st, idx) => {
              const item = findVerb(st.base);
              const topIsGood = st.goodTop;
              const topWord = topIsGood ? st.good : st.bad;
              const botWord = topIsGood ? st.bad : st.good;
              const status = stepped[idx];

              return (
                <div key={st.base} className="flex flex-col items-center justify-between h-full py-1">
                  {/* 기본형 그림 팻말 */}
                  <div className="bg-white rounded-2xl border-[2.5px] border-slate-900 px-2 py-1.5 flex flex-col items-center shadow-sm w-full">
                    <img
                      src={item.illustrationSvg}
                      alt={item.baseWord}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-[18px] font-black text-slate-900 leading-none mt-0.5">
                      {item.baseWord}
                    </span>
                  </div>

                  {/* 위 돌 & 아래 돌 */}
                  <div className="flex flex-col gap-3 w-full my-auto">
                    {[
                      { text: topWord, isGood: topIsGood },
                      { text: botWord, isGood: !topIsGood },
                    ].map((stone, sIdx) => {
                      const pickedGood = status === 'good' && stone.isGood;
                      const pickedBad = status === 'bad' && !stone.isGood;
                      return (
                        <div
                          key={sIdx}
                          role="button"
                          tabIndex={0}
                          onClick={() => stepStone(idx, stone.isGood ? 'good' : 'bad', stone.text)}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && stepStone(idx, stone.isGood ? 'good' : 'bad', stone.text)
                          }
                          className={`rounded-[28px] border-[3px] border-slate-900 py-3.5 px-2 text-center cursor-pointer select-none shadow-[3px_4px_0_#0F172A] transition-transform hover:scale-105 ${
                            pickedGood
                              ? 'bg-emerald-300'
                              : pickedBad
                              ? 'bg-rose-300'
                              : 'bg-stone-100'
                          }`}
                        >
                          <span className="text-[22px] font-black text-slate-900 leading-none">
                            {stone.text}
                          </span>
                          {pickedBad && (
                            <div className="text-[11px] font-black text-rose-800 mt-0.5">풍덩! 💦</div>
                          )}
                          {pickedGood && (
                            <div className="text-[11px] font-black text-emerald-900 mt-0.5">성공! ○</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 오른쪽 풀밭 (도착 만두 + 응원) */}
          <div className="w-[105px] bg-emerald-200 border-l-[3.5px] border-slate-900 flex flex-col items-center justify-center p-2 z-10 shrink-0">
            <ManduMascot size="md" mood="cheer" interactive={false} />
            <span className="mt-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[14px] font-black">
              도착! 🎉
            </span>
          </div>

          {/* 강물 아래쪽 어푸어푸 졸라맨 2명 */}
          <div className="absolute bottom-1 left-[28%] z-20 pointer-events-none">
            <JollaComic pose="swim" size={50} color="#0284C7" speech="어푸어푸!" />
          </div>
          <div className="absolute bottom-1 left-[65%] z-20 pointer-events-none">
            <JollaComic pose="swim" size={48} color="#E11D48" speech="살려줘~!" />
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center gap-4 text-[13px] font-black text-slate-700 shrink-0">
          <span>🌊 진짜 변신 돌을 찾아 선으로 이어 강을 건너 보세요!</span>
          <span className="text-rose-600">틀린 돌 밟으면 풍덩~!</span>
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
          <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ⑤ [신규!] 월척이다! 낚시왕 졸라맨 문장 낚시터
 * - 위쪽 초록 강둑: 5명의 낚시왕 졸라맨이 든 대빵 큰 미끼 팻말 (`밥을`, `책을`, `창문을`, `물을`, `노래를`)
 * - 아래쪽 파란 연못: 5마리 대빵 큰 물고기가 짝꿍 용언(`먹어요`, `읽어요`, `열어요`, `마셔요`, `불러요`)을 물고 헤엄!
 * ============================================================================ */
const FISH_QUIZ = [
  { id: 0, bait: '밥을', verbBase: '먹다', fishWord: '먹어요' },
  { id: 1, bait: '책을', verbBase: '읽다', fishWord: '읽어요' },
  { id: 2, bait: '창문을', verbBase: '열다', fishWord: '열어요' },
  { id: 3, bait: '물을', verbBase: '마시다', fishWord: '마셔요' },
  { id: 4, bait: '노래를', verbBase: '부르다', fishWord: '불러요' },
];

// 아래 물고기 순서 섞기
const FISH_ORDER = [2, 0, 4, 1, 3];
const FISH_COLORS = ['#F97316', '#EC4899', '#8B5CF6', '#10B981', '#EAB308'];

const VerbFishingPondSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [selectedAngler, setSelectedAngler] = useState<number | null>(null);
  const [caught, setCaught] = useState<Record<number, number>>({}); // anglerId -> fishPosIdx

  const pickFish = (fishPosIdx: number) => {
    const fishObj = FISH_QUIZ[FISH_ORDER[fishPosIdx]];
    if (selectedAngler === null) {
      playCutePop();
      speakKorean(fishObj.fishWord);
      return;
    }
    if (selectedAngler === fishObj.id) {
      playSuccessChime();
      speakKorean(`${fishObj.bait} ${fishObj.fishWord}`);
      setCaught((p) => ({ ...p, [selectedAngler]: fishPosIdx }));
      setSelectedAngler(null);
    } else {
      playCutePop();
    }
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="⑤ 월척이다! 낚시왕 졸라맨 문장 낚시터 (졸라맨 → 물고기 클릭!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => {
            setSelectedAngler(null);
            setCaught({});
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-purple-300 text-purple-800 hover:bg-purple-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 낚기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5단원 놀이 ⑤"
          title="월척이다! 낚시왕 졸라맨 문장 낚시터"
          hint="알맞은 물고기까지 낚싯줄을 쭈욱~ 이어 문장을 완성해요!"
          accentHex="#7E22CE"
          tintHex="#FAF5FF"
        />

        {/* 위쪽 풀밭 + 아래쪽 파란 연못 캔버스 */}
        <div className="relative flex-1 rounded-2xl border-[3px] border-slate-900 overflow-hidden my-1 flex flex-col justify-between">
          {/* 배경: 위 풀밭 / 아래 파란 연못 */}
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            <div className="h-[46%] bg-emerald-100 border-b-[3.5px] border-slate-900" />
            <div className="flex-1 bg-sky-200" />
          </div>

          {/* 낚싯줄 SVG 오버레이 */}
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            preserveAspectRatio="none"
          >
            {Object.entries(caught).map(([anglerStr, fishPosIdx]) => {
              const aIdx = Number(anglerStr);
              const x1 = ((aIdx + 0.5) / 5) * 1000;
              const x2 = ((Number(fishPosIdx) + 0.5) / 5) * 1000;
              return (
                <path
                  key={anglerStr}
                  d={`M ${x1} 225 Q ${(x1 + x2) / 2} 285 ${x2} 345`}
                  stroke="#7E22CE"
                  strokeWidth="6"
                  strokeDasharray="10 6"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
          </svg>

          {/* 위쪽: 5명의 낚시왕 졸라맨 + 그림 미끼 팻말 */}
          <div className="relative z-10 grid grid-cols-5 gap-3 px-4 pt-3">
            {FISH_QUIZ.map((fq) => {
              const item = findVerb(fq.verbBase);
              const isSel = selectedAngler === fq.id;
              const isCaught = caught[fq.id] !== undefined;
              return (
                <div
                  key={fq.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    playCutePop();
                    speakKorean(fq.bait);
                    setSelectedAngler(fq.id);
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedAngler(fq.id)}
                  className="flex flex-col items-center cursor-pointer select-none"
                >
                  <div
                    className={`w-full rounded-2xl border-[3px] border-slate-900 p-2 flex flex-col items-center shadow-[3px_3px_0_#0F172A] transition-transform ${
                      isCaught
                        ? 'bg-emerald-200'
                        : isSel
                        ? 'bg-amber-200 scale-105'
                        : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <img
                        src={item.illustrationSvg}
                        alt={fq.bait}
                        className="w-14 h-14 object-contain"
                      />
                      <JollaComic
                        pose="fish"
                        size={46}
                        color="#7E22CE"
                        speech={isCaught ? '월척!' : undefined}
                      />
                    </div>
                    <span className="mt-1 text-[24px] font-black text-slate-900 leading-none">
                      {fq.bait}
                    </span>
                  </div>
                  <span className="mt-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-white" />
                </div>
              );
            })}
          </div>

          {/* 아래쪽: 연못 속 대빵 큰 물고기 5마리 */}
          <div className="relative z-10 grid grid-cols-5 gap-3 px-4 pb-5">
            {FISH_ORDER.map((qId, posIdx) => {
              const fq = FISH_QUIZ[qId];
              const isCaught = caught[fq.id] !== undefined;
              const fishColor = FISH_COLORS[posIdx];
              return (
                <div
                  key={fq.fishWord}
                  role="button"
                  tabIndex={0}
                  onClick={() => pickFish(posIdx)}
                  onKeyDown={(e) => e.key === 'Enter' && pickFish(posIdx)}
                  className="flex flex-col items-center cursor-pointer select-none group"
                >
                  <span
                    className="mb-1.5 w-4 h-4 rounded-full border-2 border-slate-900"
                    style={{ backgroundColor: fishColor }}
                  />
                  {/* 대빵 큰 물고기 SVG + 글자 */}
                  <div className="relative w-full h-[116px] flex items-center justify-center transition-transform group-hover:scale-105">
                    <svg viewBox="0 0 180 110" className="w-full h-full overflow-visible">
                      {/* 꼬리지느러미 */}
                      <path
                        d="M 136 55 L 174 22 L 166 55 L 174 88 Z"
                        fill={fishColor}
                        stroke="#0F172A"
                        strokeWidth="4"
                        strokeLinejoin="round"
                      />
                      {/* 몸통 */}
                      <ellipse
                        cx="78"
                        cy="55"
                        rx="68"
                        ry="42"
                        fill={isCaught ? '#FEF08A' : '#FFFFFF'}
                        stroke="#0F172A"
                        strokeWidth="4"
                      />
                      {/* 색 줄무늬 머리 */}
                      <path
                        d="M 10 55 A 68 42 0 0 1 42 20 L 42 90 A 68 42 0 0 1 10 55 Z"
                        fill={fishColor}
                        opacity="0.35"
                      />
                      {/* 귀여운 물고기 눈 */}
                      <circle cx="30" cy="44" r="5" fill="#0F172A" />
                      <circle cx="28" cy="42" r="1.8" fill="#FFFFFF" />
                      {/* 웃는 입 */}
                      <path d="M 18 62 Q 26 68 32 62" stroke="#0F172A" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                    </svg>
                    <span className="absolute left-[46%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-[23px] font-black text-slate-900 whitespace-nowrap">
                      {fq.fishWord}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center text-[13px] font-black text-slate-700 shrink-0">
          🎣 “밥을 먹어요! 책을 읽어요!” 낚은 물고기 문장을 큰 소리로 외쳐 보세요!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
          <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

// Exported Renderer by index (0 ~ 4)
export const VerbPlayDraftSheet: React.FC<{
  sheetIndex: number;
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ sheetIndex, lang, onPrintSingle }) => {
  switch (sheetIndex) {
    case 0:
      return <VerbDumplingChefSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 1:
      return <VerbBalloonsSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 2:
      return <VerbActionStageSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 3:
      return <VerbRiverCrossingSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 4:
    default:
      return <VerbFishingPondSheet lang={lang} onPrintSingle={onPrintSingle} />;
  }
};
