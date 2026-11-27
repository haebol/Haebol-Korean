import React, { useState } from 'react';
import { Dices, RotateCcw } from 'lucide-react';
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

const DOT_GRID_STYLE: React.CSSProperties = {
  backgroundImage: 'radial-gradient(#cbd5e1 1.1px, transparent 1.1px)',
  backgroundSize: '22px 22px',
};

const INLINE_BTN_CLASS =
  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 transition-colors cursor-pointer';

/* ============================================================================
 * ① 우당탕탕! 왕만두 찜통 요리사
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

const STEAMERS: { id: SteamerType; label: string; color: string; bg: string; border: string; xPct: number }[] = [
  { id: 'ayo', label: '-아요 찜통', color: '#BE123C', bg: '#FFF1F2', border: '#FDA4AF', xPct: 18 },
  { id: 'eoyo', label: '-어요 찜통', color: '#1D4ED8', bg: '#EFF6FF', border: '#93C5FD', xPct: 50 },
  { id: 'haeyo', label: '-해요 찜통', color: '#6B21A8', bg: '#FAF5FF', border: '#D8B4FE', xPct: 82 },
];

const VerbDumplingChefSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="용언 놀이 ①"
          title="우당탕탕! 왕만두 찜통 요리사"
          hint="만두를 알맞은 찜통으로 쭈욱~ 선 이어 퐁당!"
          accentHex="#6B21A8"
          tintHex="#F3E8FF"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setPicked(null);
                setDropped({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 따뜻한 크림 도트 요리 캔버스 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] px-4 py-3 flex flex-col justify-between my-0.5 overflow-hidden">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={DOT_GRID_STYLE} />

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
                  d={`M ${x1} 215 C ${x1} 290, ${x2} 255, ${x2} 330`}
                  stroke={st.color}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.78"
                />
              );
            })}
          </svg>

          {/* 위쪽: 6개 왕만두 용언 카드 */}
          <div className="relative z-20 grid grid-cols-6 gap-2.5">
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
                  <div
                    className={`w-full rounded-[28px] border-[1.5px] px-2 pt-2.5 pb-3 flex flex-col items-center shadow-2xs transition-all ${
                      isDone
                        ? 'bg-emerald-50 border-emerald-400'
                        : isPicked
                        ? 'bg-amber-100/90 border-amber-400 scale-105'
                        : 'bg-white border-amber-300/90 hover:border-amber-400'
                    }`}
                  >
                    <img
                      src={item.illustrationSvg}
                      alt={item.baseWord}
                      className="w-16 h-16 object-contain"
                    />
                    <span className="mt-1 text-[20px] font-black text-slate-800 leading-none">
                      {item.baseWord}
                    </span>
                    {isDone && (
                      <span className="mt-1 text-[12px] font-black text-emerald-700">
                        → {item.conjugatedWord}!
                      </span>
                    )}
                  </div>
                  <span className="mt-1.5 w-3.5 h-3.5 rounded-full bg-slate-600 border-2 border-white shadow-2xs" />
                </div>
              );
            })}
          </div>

          {/* 중간 요리사 졸라맨 & 만두 */}
          <div className="relative z-10 flex items-center justify-around py-1 pointer-events-none">
            <JollaComic pose="chef" size={56} color="#E11D48" speech="뜨거워!!" />
            <ManduMascot size="sm" mood="cheer" interactive={false} />
            <JollaComic pose="chef" size={56} color="#7E22CE" speech="어느 찜통?!" />
          </div>

          {/* 아래쪽: 3개 대나무 찜통 */}
          <div className="relative z-20 grid grid-cols-3 gap-6 px-3">
            {STEAMERS.map((st) => (
              <div
                key={st.id}
                role="button"
                tabIndex={0}
                onClick={() => dropToSteamer(st.id)}
                onKeyDown={(e) => e.key === 'Enter' && dropToSteamer(st.id)}
                className="flex flex-col items-center cursor-pointer select-none group"
              >
                <span
                  className="mb-1.5 w-4 h-4 rounded-full border-2 border-white shadow-2xs"
                  style={{ backgroundColor: st.color }}
                />
                <div
                  className="w-full rounded-b-[26px] rounded-t-2xl border-[1.5px] p-3.5 flex flex-col items-center shadow-2xs transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: st.bg, borderColor: st.border }}
                >
                  <div className="text-[12px] font-bold text-slate-500 tracking-widest mb-1">
                    ♨ 모락모락 ♨
                  </div>
                  <span
                    className="text-[26px] font-black tracking-tight leading-none"
                    style={{ color: st.color }}
                  >
                    {st.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-4 text-[12.5px] font-bold text-slate-600 shrink-0">
          <span>🥟 ㅏ·ㅗ → <strong className="text-rose-600">-아요</strong></span>
          <span className="text-slate-300">·</span>
          <span>🥟 그 밖 → <strong className="text-blue-600">-어요</strong></span>
          <span className="text-slate-300">·</span>
          <span>🥟 하다 → <strong className="text-purple-700">-해요</strong></span>
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ② 둥실둥실! 3색 풍선 색칠하기
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
}> = () => {
  const [brush, setBrush] = useState<SteamerType>('ayo');
  const [painted, setPainted] = useState<Record<string, SteamerType>>({});

  const colorMap: Record<SteamerType, { fill: string; border: string; text: string; label: string }> = {
    ayo: { fill: '#FFE4E6', border: '#FDA4AF', text: '#BE123C', label: '빨강 -아요' },
    eoyo: { fill: '#DBEAFE', border: '#93C5FD', text: '#1D4ED8', label: '파랑 -어요' },
    haeyo: { fill: '#F3E8FF', border: '#D8B4FE', text: '#6B21A8', label: '보라 -해요' },
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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="용언 놀이 ②"
          title="둥실둥실! 3색 풍선 색칠하기"
          hint="알맞은 색연필로 풍선을 예쁘게 색칠해요!"
          accentHex="#6B21A8"
          tintHex="#F3E8FF"
          webControls={
            <>
              {(['ayo', 'eoyo', 'haeyo'] as SteamerType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setBrush(t);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-black border cursor-pointer transition-all ${
                    brush === t ? 'ring-2 ring-slate-600' : 'opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: colorMap[t].fill,
                    borderColor: colorMap[t].border,
                    color: colorMap[t].text,
                  }}
                >
                  🖍 {t === 'ayo' ? '-아요' : t === 'eoyo' ? '-어요' : '-해요'}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setPainted({});
                }}
                className={INLINE_BTN_CLASS}
              >
                <RotateCcw className="w-3.5 h-3.5" /> 초기화
              </button>
            </>
          }
        />

        {/* 색연필 범례 3개 */}
        <div className="flex items-center justify-center gap-4 mb-2 shrink-0">
          {(['ayo', 'eoyo', 'haeyo'] as SteamerType[]).map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 px-3.5 py-1 rounded-full border-[1.5px]"
              style={{ backgroundColor: colorMap[t].fill, borderColor: colorMap[t].border }}
            >
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: colorMap[t].text }}
              />
              <span className="text-[14.5px] font-black" style={{ color: colorMap[t].text }}>
                {colorMap[t].label}
              </span>
            </div>
          ))}
        </div>

        {/* 따뜻한 크림 하늘 캔버스 + 9개 풍선 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] p-3.5 grid grid-cols-3 gap-x-6 gap-y-2 items-center overflow-hidden">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={DOT_GRID_STYLE} />

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
                className="relative z-10 flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-[184px] h-[112px] rounded-[50%] border-[1.5px] flex items-center justify-center gap-2.5 px-4 shadow-2xs transition-all hover:scale-[1.03]"
                    style={{
                      backgroundColor: pColor ? colorMap[pColor].fill : '#FFFFFF',
                      borderColor: pColor ? colorMap[pColor].border : '#94A3B8',
                    }}
                  >
                    <img
                      src={item.illustrationSvg}
                      alt={item.baseWord}
                      className="w-15 h-15 object-contain shrink-0"
                    />
                    <span className="text-[22px] font-black text-slate-800 leading-tight">
                      {item.baseWord}
                    </span>
                  </div>
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[7px] border-b-slate-500" />
                  <div className="w-[1.5px] h-4 bg-slate-400" />
                </div>

                {idx % 2 === 0 && (
                  <JollaComic
                    pose="float"
                    size={40}
                    color={idx % 4 === 0 ? '#7E22CE' : '#E11D48'}
                    speech={idx === 0 ? '둥실~' : idx === 4 ? '높아!' : undefined}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-center text-[12.5px] font-bold text-slate-600 shrink-0">
          🎈 색칠하고 “놀아요! 먹어요! 공부해요!” 큰 소리로 변신해 보세요!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ③ 몸으로 말해요! 엉뚱 졸라맨 동작 주사위 무대
 * ============================================================================ */
const STAGE_12 = [
  '먹다', '씻다', '입다', '읽다',
  '놀다', '청소하다', '인사하다', '공부하다',
  '마시다', '쓰다', '듣다', '부르다',
].map(findVerb);

const RING_POS: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3],
  [1, 3], [2, 3],
  [3, 3], [3, 2], [3, 1], [3, 0],
  [2, 0], [1, 0],
];

const VerbActionStageSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="용언 놀이 ③"
          title="몸으로 말해요! 엉뚱 졸라맨 동작 무대"
          hint="도착한 칸 동작을 몸으로 흉내 내며 '~해요!' 외치기!"
          accentHex="#6B21A8"
          tintHex="#F3E8FF"
          webControls={
            <>
              <button
                type="button"
                onClick={roll}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-300 text-xs font-black text-purple-800 transition-colors cursor-pointer"
              >
                <Dices className="w-3.5 h-3.5" /> 주사위 {dice ? `(${dice}칸)` : ''}
              </button>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setPos(0);
                  setDice(null);
                }}
                className={INLINE_BTN_CLASS}
              >
                <RotateCcw className="w-3.5 h-3.5" /> 초기화
              </button>
            </>
          }
        />

        {/* 따뜻한 크림 4×4 보드판 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] p-3 grid grid-cols-4 grid-rows-4 gap-2.5 my-0.5 overflow-hidden">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={DOT_GRID_STYLE} />

          {Array.from({ length: 16 }).map((_, cellIdx) => {
            const r = Math.floor(cellIdx / 4);
            const c = cellIdx % 4;

            if (r === 1 && c === 1) {
              return (
                <div
                  key="center-stage"
                  className="relative z-10 col-span-2 row-span-2 rounded-2xl border-[1.5px] border-purple-300 bg-purple-50/70 p-3 flex flex-col items-center justify-between"
                >
                  <div className="px-3 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-[12.5px] font-black tracking-wide">
                    ★ 엉뚱 졸라맨 동작 무대 ★
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <JollaComic pose="dance" size={82} color="#7E22CE" speech="따라 해 봐!" />
                    <ManduMascot size="md" mood="cheer" interactive={false} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-purple-200 text-[12px] font-bold text-slate-700">
                      🤖 로봇처럼!
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-purple-200 text-[12px] font-bold text-slate-700">
                      📣 왕 크게!
                    </span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-purple-200 text-[12px] font-bold text-slate-700">
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
                className={`relative z-10 rounded-2xl border-[1.5px] px-3 py-2 flex items-center justify-center gap-2.5 cursor-pointer select-none shadow-2xs transition-all hover:scale-[1.02] ${
                  isHere
                    ? 'bg-amber-100/90 border-amber-400'
                    : ringIdx === 0
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : 'bg-white border-slate-300'
                }`}
              >
                <span className="absolute top-1 left-2 text-[11px] font-black text-purple-500">
                  {ringIdx === 0 ? '출발!' : ringIdx + 1}
                </span>
                <img
                  src={item.illustrationSvg}
                  alt={item.baseWord}
                  className="w-15 h-15 object-contain shrink-0"
                />
                <div className="flex flex-col items-start">
                  <span className="text-[20px] font-black text-slate-800 leading-none">
                    {item.baseWord}
                  </span>
                  <span className="mt-1 text-[12px] font-bold text-purple-700">
                    → ______요!
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-center text-[12.5px] font-bold text-slate-600 shrink-0">
          🕺 짝꿍이 내 동작을 맞히면 박수 짝짝짝!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ④ 어푸어푸! 변신 징검다리 강 건너기 (4·5단원 ★불규칙)
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
}> = () => {
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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="용언 놀이 ④"
          title="어푸어푸! 변신 징검다리 강 건너기"
          hint="진짜 변신 돌에 동그라미 ○ 치고 강을 건너요!"
          accentHex="#6B21A8"
          tintHex="#F3E8FF"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setStepped({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 파스텔 강물 캔버스 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-sky-50/90 overflow-hidden my-0.5 flex items-stretch">
          <svg
            viewBox="0 0 1000 500"
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
          >
            <path d="M 100 95 Q 160 75 220 95 T 340 95 T 460 95 T 580 95 T 700 95 T 880 95" stroke="#BAE6FD" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 120 260 Q 180 240 240 260 T 360 260 T 480 260 T 600 260 T 720 260 T 880 260" stroke="#BAE6FD" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M 110 425 Q 170 405 230 425 T 350 425 T 470 425 T 590 425 T 710 425 T 890 425" stroke="#7DD3FC" strokeWidth="5" fill="none" strokeLinecap="round" />
          </svg>

          {/* 왼쪽 풀밭 */}
          <div className="w-[104px] bg-emerald-50 border-r-[1.5px] border-emerald-200 flex flex-col items-center justify-center p-2 z-10 shrink-0">
            <JollaComic pose="urgent" size={62} color="#7E22CE" speech="건너자!" />
            <span className="mt-2 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[13px] font-black">
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
                  <div className="bg-white rounded-2xl border-[1.5px] border-slate-400 px-2 py-1.5 flex flex-col items-center shadow-2xs w-full">
                    <img
                      src={item.illustrationSvg}
                      alt={item.baseWord}
                      className="w-12 h-12 object-contain"
                    />
                    <span className="text-[17px] font-black text-slate-800 leading-none mt-0.5">
                      {item.baseWord}
                    </span>
                  </div>

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
                          className={`rounded-[26px] border-[1.5px] py-3.5 px-2 text-center cursor-pointer select-none shadow-2xs transition-all hover:scale-105 ${
                            pickedGood
                              ? 'bg-emerald-100 border-emerald-400'
                              : pickedBad
                              ? 'bg-rose-100 border-rose-400'
                              : 'bg-[#FFFDF8] border-slate-400 hover:border-purple-400'
                          }`}
                        >
                          <span className="text-[21px] font-black text-slate-800 leading-none">
                            {stone.text}
                          </span>
                          {pickedBad && (
                            <div className="text-[11px] font-black text-rose-700 mt-0.5">풍덩! 💦</div>
                          )}
                          {pickedGood && (
                            <div className="text-[11px] font-black text-emerald-700 mt-0.5">성공! ○</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 오른쪽 풀밭 */}
          <div className="w-[104px] bg-emerald-50 border-l-[1.5px] border-emerald-200 flex flex-col items-center justify-center p-2 z-10 shrink-0">
            <ManduMascot size="md" mood="cheer" interactive={false} />
            <span className="mt-2 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[13px] font-black">
              도착! 🎉
            </span>
          </div>

          {/* 강물 아래쪽 어푸어푸 졸라맨 */}
          <div className="absolute bottom-1 left-[28%] z-20 pointer-events-none">
            <JollaComic pose="swim" size={46} color="#0284C7" speech="어푸어푸!" />
          </div>
          <div className="absolute bottom-1 left-[65%] z-20 pointer-events-none">
            <JollaComic pose="swim" size={44} color="#E11D48" speech="살려줘~!" />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-4 text-[12.5px] font-bold text-slate-600 shrink-0">
          <span>🌊 진짜 변신 돌을 찾아 선으로 이어 강을 건너 보세요!</span>
          <span className="text-rose-600">틀린 돌 밟으면 풍덩~!</span>
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ⑤ 월척이다! 낚시왕 졸라맨 문장 낚시터
 * ============================================================================ */
const FISH_QUIZ = [
  { id: 0, bait: '밥을', verbBase: '먹다', fishWord: '먹어요' },
  { id: 1, bait: '책을', verbBase: '읽다', fishWord: '읽어요' },
  { id: 2, bait: '창문을', verbBase: '열다', fishWord: '열어요' },
  { id: 3, bait: '물을', verbBase: '마시다', fishWord: '마셔요' },
  { id: 4, bait: '노래를', verbBase: '부르다', fishWord: '불러요' },
];

const FISH_ORDER = [2, 0, 4, 1, 3];
const FISH_COLORS = ['#FDBA74', '#F9A8D4', '#C4B5FD', '#6EE7B7', '#FDE047'];

const VerbFishingPondSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
  const [selectedAngler, setSelectedAngler] = useState<number | null>(null);
  const [caught, setCaught] = useState<Record<number, number>>({});

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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="용언 놀이 ⑤"
          title="월척이다! 낚시왕 졸라맨 문장 낚시터"
          hint="알맞은 물고기까지 낚싯줄을 쭈욱~ 이어 문장을 완성해요!"
          accentHex="#6B21A8"
          tintHex="#F3E8FF"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setSelectedAngler(null);
                setCaught({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 풀밭 + 연못 캔버스 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 overflow-hidden my-0.5 flex flex-col justify-between">
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            <div className="h-[46%] bg-[#F4FBF6] border-b-[1.5px] border-sky-200" />
            <div className="flex-1 bg-sky-50/90" />
          </div>

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
                  strokeWidth="4"
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.8"
                />
              );
            })}
          </svg>

          {/* 위쪽: 5명의 낚시왕 졸라맨 + 미끼 팻말 */}
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
                    className={`w-full rounded-2xl border-[1.5px] p-2 flex flex-col items-center shadow-2xs transition-all ${
                      isCaught
                        ? 'bg-emerald-50 border-emerald-400'
                        : isSel
                        ? 'bg-amber-50 border-amber-400 scale-105'
                        : 'bg-white border-slate-400 hover:border-purple-400'
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
                        size={44}
                        color="#7E22CE"
                        speech={isCaught ? '월척!' : undefined}
                      />
                    </div>
                    <span className="mt-1 text-[22px] font-black text-slate-800 leading-none">
                      {fq.bait}
                    </span>
                  </div>
                  <span className="mt-1.5 w-3.5 h-3.5 rounded-full bg-slate-600 border-2 border-white" />
                </div>
              );
            })}
          </div>

          {/* 아래쪽: 연못 속 물고기 5마리 */}
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
                    className="mb-1.5 w-3.5 h-3.5 rounded-full border border-slate-500"
                    style={{ backgroundColor: fishColor }}
                  />
                  <div className="relative w-full h-[112px] flex items-center justify-center transition-transform group-hover:scale-105">
                    <svg viewBox="0 0 180 110" className="w-full h-full overflow-visible">
                      <path
                        d="M 136 55 L 172 24 L 164 55 L 172 86 Z"
                        fill={fishColor}
                        stroke="#475569"
                        strokeWidth="2.4"
                        strokeLinejoin="round"
                      />
                      <ellipse
                        cx="78"
                        cy="55"
                        rx="68"
                        ry="42"
                        fill={isCaught ? '#FEF9C3' : '#FFFFFF'}
                        stroke="#475569"
                        strokeWidth="2.4"
                      />
                      <path
                        d="M 10 55 A 68 42 0 0 1 42 20 L 42 90 A 68 42 0 0 1 10 55 Z"
                        fill={fishColor}
                        opacity="0.45"
                      />
                      <circle cx="30" cy="44" r="4.5" fill="#334155" />
                      <circle cx="28.5" cy="42.5" r="1.5" fill="#FFFFFF" />
                      <path d="M 18 62 Q 26 67 32 62" stroke="#334155" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    </svg>
                    <span className="absolute left-[46%] top-1/2 -translate-x-1/2 -translate-y-1/2 text-[22px] font-black text-slate-800 whitespace-nowrap">
                      {fq.fishWord}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center text-[12.5px] font-bold text-slate-600 shrink-0">
          🎣 “밥을 먹어요! 책을 읽어요!” 낚은 물고기 문장을 큰 소리로 외쳐 보세요!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
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
}> = ({ sheetIndex, lang }) => {
  switch (sheetIndex) {
    case 0:
      return <VerbDumplingChefSheet lang={lang} />;
    case 1:
      return <VerbBalloonsSheet lang={lang} />;
    case 2:
      return <VerbActionStageSheet lang={lang} />;
    case 3:
      return <VerbRiverCrossingSheet lang={lang} />;
    case 4:
    default:
      return <VerbFishingPondSheet lang={lang} />;
  }
};
