import React, { useState } from 'react';
import { RotateCcw, Printer } from 'lucide-react';
import { SupportedLanguage } from '../types';
import {
  PARTICLE_UNIT_1_ITEMS,
  PARTICLE_UNIT_2_ITEMS,
  PARTICLE_UNIT_3_ROWS,
  PARTICLE_UNIT_4_ITEMS,
  PARTICLE_UNIT_5_ITEMS,
  ParticleColsItem,
} from '../data/particleWorksheetData';
import { ManduMascot } from './ManduMascot';
import { JollaComic, PlaybookHeader } from './JollaPlayArt';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';
import { PlaySheetMeta } from './ClassroomPlayDraft5Sheets';

export const PARTICLE_PLAY_SHEETS_META: PlaySheetMeta[] = [
  {
    id: 'particle_play_1',
    idx: 0,
    circledNo: '①',
    title: '끙차! 받침 바위 들기 대회',
    subtitle: '1·2·4단원 · 받침 있으면 무거운 바위(은·이·이에요), 없으면 풍선(는·가·예요)!',
    dropdownLabel: '① 1강(1~5단원) · 끙차! 받침 바위 들기 대회',
    previewMain: '🪨 받침바위',
    previewChips: ['1·2·4단원', '받침O 바위', '받침X 풍선'],
  },
  {
    id: 'particle_play_2',
    idx: 1,
    circledNo: '②',
    title: '끼익끼익! 놀이터 시소 균형 맞추기',
    subtitle: '2·4단원 · 대빵 큰 시소 4개! 알맞은 조사를 태워 시소를 똑바로!',
    dropdownLabel: '② 1강(1~5단원) · 놀이터 시소 균형 맞추기',
    previewMain: '⚖️ 시소균형',
    previewChips: ['2·4단원', '대빵 큰 시소', '균형 맞추기'],
  },
  {
    id: 'particle_play_3',
    idx: 2,
    circledNo: '③',
    title: '슈웅~! 문장 로켓 발사대',
    subtitle: '3단원 · 대빵 큰 우주 로켓 4대! 알맞은 연료 글자 골라 발사!',
    dropdownLabel: '③ 1강(1~5단원) · 슈웅~! 문장 로켓 발사대',
    previewMain: '🚀 로켓발사',
    previewChips: ['3단원 문장', '우주 졸라맨', '로켓 조립'],
  },
  {
    id: 'particle_play_4',
    idx: 3,
    circledNo: '④',
    title: '으악! 외계인 글자 UFO 잡기',
    subtitle: '5단원 ★변신 · 가짜 외계인 말(나가·너가·저가·누구가·이것가)에 X표!',
    dropdownLabel: '④ 1강(1~5단원) · 으악! 외계인 UFO 잡기',
    previewMain: '🛸 UFO잡기',
    previewChips: ['5단원 ★', '내가·네가·제가', '외계인 잡기'],
  },
  {
    id: 'particle_play_5',
    idx: 4,
    circledNo: '⑤',
    title: '뻥~! 방귀 풍선 피해서 구름성 가기',
    subtitle: '1~5단원 종합 · 방귀 함정 풍선 4개를 뻥! 터뜨리고 진짜 풍선만 색칠!',
    dropdownLabel: '⑤ 1강(1~5단원) · 뻥~! 방귀 풍선 피하기',
    previewMain: '💨 방귀풍선',
    previewChips: ['1~5단원 종합', '함정 터뜨리기', '구름성'],
  },
];

// 1~5단원 데이터 전용 lookup
const ALL_P_ITEMS: ParticleColsItem[] = [
  ...PARTICLE_UNIT_1_ITEMS,
  ...PARTICLE_UNIT_2_ITEMS,
  ...PARTICLE_UNIT_4_ITEMS,
  ...PARTICLE_UNIT_5_ITEMS,
];

function findPItem(noun: string): ParticleColsItem {
  return ALL_P_ITEMS.find((p) => p.baseNoun === noun) || ALL_P_ITEMS[0];
}

const PlayWebBar: React.FC<{
  badge: string;
  children?: React.ReactNode;
  onPrintSingle?: () => void;
}> = ({ badge, children, onPrintSingle }) => (
  <div className="no-print w-full max-w-[1040px] mx-auto mb-2.5 flex flex-wrap items-center justify-between gap-2 bg-emerald-50/90 border border-emerald-200 rounded-xl px-3.5 py-2 shadow-sm">
    <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-900">
      <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[11px] font-black">
        조사 놀이
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
 * ① [신규!] 끙차! 받침 바위 들기 대회
 * - 상단 대빵 큰 코믹 비교: 바위 들고 끙차 졸라맨(받침O) vs 풍선 매달고 둥실 졸라맨(받침X)
 * - 중앙 8개 널찍한 그림 카드(4×2) + 🪨 vs 🎈 고르기!
 * ============================================================================ */
const ROCK_CARDS = [
  { noun: '가방', rock: '은', balloon: '는', hasBatchim: true, full: '가방은' },
  { noun: '친구', rock: '은', balloon: '는', hasBatchim: false, full: '친구는' },
  { noun: '동생', rock: '은', balloon: '는', hasBatchim: true, full: '동생은' },
  { noun: '나', rock: '은', balloon: '는', hasBatchim: false, full: '나는' },
  { noun: '학생', rock: '이에요', balloon: '예요', hasBatchim: true, full: '학생이에요' },
  { noun: '의자', rock: '이에요', balloon: '예요', hasBatchim: false, full: '의자예요' },
  { noun: '물', rock: '이', balloon: '가', hasBatchim: true, full: '물이' },
  { noun: '비누', rock: '이', balloon: '가', hasBatchim: false, full: '비누가' },
];

const ParticleRockLiftSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [picked, setPicked] = useState<Record<string, 'rock' | 'balloon'>>({});

  const choose = (noun: string, choice: 'rock' | 'balloon', hasBatchim: boolean, full: string) => {
    playCutePop();
    const ok = (choice === 'rock' && hasBatchim) || (choice === 'balloon' && !hasBatchim);
    if (ok) {
      playSuccessChime();
      speakKorean(full);
    }
    setPicked((p) => ({ ...p, [noun]: choice }));
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="① 끙차! 받침 바위 들기 대회 (🪨 바위 vs 🎈 풍선 클릭!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => setPicked({})}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 하기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5단원 놀이 ①"
          title="끙차! 받침 바위 들기 대회"
          hint="받침이 있으면 🪨 바위, 없으면 🎈 풍선에 동그라미 ○!"
          accentHex="#059669"
          tintHex="#ECFDF5"
        />

        {/* 상단 대빵 큰 코믹 규칙 배너 */}
        <div className="grid grid-cols-2 gap-4 mb-2 shrink-0">
          <div className="rounded-2xl border-[3px] border-slate-900 bg-slate-100 px-4 py-2 flex items-center justify-center gap-4">
            <JollaComic pose="heavy" size={56} color="#059669" speech="무거워!!" />
            <div>
              <div className="text-[19px] font-black text-slate-900">🪨 받침 있어!</div>
              <div className="text-[20px] font-black text-emerald-700">은 · 이 · 이에요</div>
            </div>
          </div>
          <div className="rounded-2xl border-[3px] border-slate-900 bg-amber-50 px-4 py-2 flex items-center justify-center gap-4">
            <JollaComic pose="float" size={56} color="#F59E0B" speech="둥실~" />
            <div>
              <div className="text-[19px] font-black text-slate-900">🎈 받침 없어!</div>
              <div className="text-[20px] font-black text-amber-600">는 · 가 · 예요</div>
            </div>
          </div>
        </div>

        {/* 8개 널찍한 카드 (4×2) */}
        <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-3.5 my-1">
          {ROCK_CARDS.map((card) => {
            const item = findPItem(card.noun);
            const sel = picked[card.noun];
            return (
              <div
                key={card.noun}
                className="rounded-2xl border-[3px] border-slate-900 bg-white p-3 flex flex-col items-center justify-between shadow-[3px_3px_0_#0F172A]"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.illustrationSvg}
                    alt={card.noun}
                    className="w-16 h-16 object-contain"
                  />
                  <span className="text-[28px] font-black text-slate-900 leading-none">
                    {card.noun}
                  </span>
                </div>

                {/* 바위 vs 풍선 2개 대빵 큰 버튼 */}
                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => choose(card.noun, 'rock', card.hasBatchim, card.full)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && choose(card.noun, 'rock', card.hasBatchim, card.full)
                    }
                    className={`rounded-xl border-[2.5px] border-slate-900 py-2 text-center text-[18px] font-black cursor-pointer select-none ${
                      sel === 'rock'
                        ? card.hasBatchim
                          ? 'bg-emerald-300 text-emerald-950'
                          : 'bg-rose-200 text-rose-900'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    🪨 {card.rock}
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => choose(card.noun, 'balloon', card.hasBatchim, card.full)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && choose(card.noun, 'balloon', card.hasBatchim, card.full)
                    }
                    className={`rounded-xl border-[2.5px] border-slate-900 py-2 text-center text-[18px] font-black cursor-pointer select-none ${
                      sel === 'balloon'
                        ? !card.hasBatchim
                          ? 'bg-amber-300 text-amber-950'
                          : 'bg-rose-200 text-rose-900'
                        : 'bg-amber-50 text-slate-900'
                    }`}
                  >
                    🎈 {card.balloon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-1 flex items-center justify-center text-[13px] font-black text-slate-700 shrink-0">
          🪨 받침 있는 글자는 무거워요! 고른 뒤 “가방은! 친구는!” 크게 읽어 보세요!
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ② [신규!] 끼익끼익! 놀이터 시소 균형 맞추기
 * - 4개의 대빵 큰 놀이터 시소 (2×2 초여유 배치!)
 * - 왼쪽엔 그림+명사, 오른쪽엔 갸우뚱 졸라맨 + 빈 동그라미 자리!
 * - 알맞은 조사 스티커를 고르면 시소가 수평으로 짜잔!
 * ============================================================================ */
const SEESAWS = [
  { noun: '책', optA: '이', optB: '가', answer: '이', full: '책이' },
  { noun: '배', optA: '이', optB: '가', answer: '가', full: '배가' },
  { noun: '연필', optA: '이에요', optB: '예요', answer: '이에요', full: '연필이에요' },
  { noun: '지우개', optA: '이에요', optB: '예요', answer: '예요', full: '지우개예요' },
];

const ParticleSeesawSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [chosen, setChosen] = useState<Record<string, string>>({});

  const pick = (noun: string, val: string, answer: string, full: string) => {
    playCutePop();
    setChosen((p) => ({ ...p, [noun]: val }));
    if (val === answer) {
      playSuccessChime();
      speakKorean(full);
    }
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="② 끼익끼익! 놀이터 시소 균형 맞추기 (알맞은 조사 클릭!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => setChosen({})}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 타기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="2·4단원 놀이 ②"
          title="끼익끼익! 놀이터 시소 균형 맞추기"
          hint="알맞은 조사를 써 넣고 시소를 똑바로 맞춰 주세요!"
          accentHex="#059669"
          tintHex="#ECFDF5"
        />

        {/* 2×2 대빵 큰 시소 4개 */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-5 my-1">
          {SEESAWS.map((sw, idx) => {
            const item = findPItem(sw.noun);
            const val = chosen[sw.noun];
            const isBalanced = val === sw.answer;

            return (
              <div
                key={sw.noun}
                className="relative rounded-3xl border-[3px] border-slate-900 bg-gradient-to-b from-sky-50 to-emerald-50 p-4 flex flex-col justify-between overflow-hidden shadow-[4px_4px_0_#0F172A]"
              >
                <span className="absolute top-2.5 left-3.5 px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[13px] font-black">
                  시소 {idx + 1}
                </span>

                {/* 대빵 큰 시소 일러스트 영역 */}
                <div className="flex-1 flex flex-col items-center justify-end pb-2">
                  {/* 시소 판대기 (정답 맞추면 수평 0deg, 전에는 -7deg 기울어짐!) */}
                  <div
                    className="w-[88%] flex items-end justify-between px-3 pb-1 border-b-[10px] border-amber-500 rounded-b-sm transition-transform duration-300"
                    style={{
                      transform: isBalanced ? 'rotate(0deg)' : 'rotate(-7deg)',
                    }}
                  >
                    {/* 왼쪽: 그림 + 명사 */}
                    <div className="flex flex-col items-center">
                      <img
                        src={item.illustrationSvg}
                        alt={sw.noun}
                        className="w-16 h-16 object-contain"
                      />
                      <span className="px-3 py-0.5 rounded-xl bg-white border-[2.5px] border-slate-900 text-[26px] font-black text-slate-900 leading-none">
                        {sw.noun}
                      </span>
                    </div>

                    {/* 오른쪽: 빈 조사 자리 + 쩔쩔매는 졸라맨 */}
                    <div className="flex items-end gap-1.5">
                      <div
                        className={`w-[106px] h-[54px] rounded-2xl border-[3px] border-dashed flex items-center justify-center text-[24px] font-black ${
                          isBalanced
                            ? 'bg-emerald-200 border-emerald-700 text-emerald-950'
                            : 'bg-white border-slate-500 text-slate-400'
                        }`}
                      >
                        {val || '?'}
                      </div>
                      <JollaComic
                        pose={isBalanced ? 'cheer' : 'cling'}
                        size={48}
                        color={isBalanced ? '#059669' : '#E11D48'}
                        speech={isBalanced ? '똑바로!' : '기울어!'}
                      />
                    </div>
                  </div>

                  {/* 시소 삼각 받침대 */}
                  <div className="w-0 h-0 border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-b-[28px] border-b-slate-800 -mt-0.5" />
                </div>

                {/* 아래 고르기 2개 버튼 */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t-2 border-dashed border-emerald-300">
                  {[sw.optA, sw.optB].map((opt) => {
                    const isSelected = val === opt;
                    const isRight = isSelected && opt === sw.answer;
                    const isWrong = isSelected && opt !== sw.answer;
                    return (
                      <div
                        key={opt}
                        role="button"
                        tabIndex={0}
                        onClick={() => pick(sw.noun, opt, sw.answer, sw.full)}
                        onKeyDown={(e) => e.key === 'Enter' && pick(sw.noun, opt, sw.answer, sw.full)}
                        className={`px-6 py-1.5 rounded-full border-[2.5px] border-slate-900 text-[20px] font-black cursor-pointer select-none transition-transform hover:scale-105 ${
                          isRight
                            ? 'bg-emerald-400 text-slate-950'
                            : isWrong
                            ? 'bg-rose-300 text-rose-950'
                            : 'bg-white text-slate-900'
                        }`}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-1 flex items-center justify-center text-[13px] font-black text-slate-700 shrink-0">
          ⚖️ 알맞은 조사에 동그라미 ○ 치고 빈칸에 쓱쓱 써 보세요!
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ③ [신규!] 슈웅~! 문장 로켓 발사대 (3단원 문장 조립)
 * - 4대의 대빵 큰 세로형 우주 로켓 나란히 배치!
 * - 조종석 우주복 졸라맨 + 1단 연료(은/는) + 2단 부스터(남자예요/학생이에요 등) + 아래 불꽃!
 * ============================================================================ */
const ROCKETS = [
  {
    idx: 0,
    subject: '나',
    pGood: '는',
    pOpts: ['은', '는'],
    endGood: '남자예요',
    endOpts: ['남자예요', '남자이에요'],
    full: '나는 남자예요.',
    color: '#EF4444',
  },
  {
    idx: 1,
    subject: '너',
    pGood: '는',
    pOpts: ['은', '는'],
    endGood: '여자예요',
    endOpts: ['여자이에요', '여자예요'],
    full: '너는 여자예요.',
    color: '#F59E0B',
  },
  {
    idx: 2,
    subject: '친구',
    pGood: '는',
    pOpts: ['은', '는'],
    endGood: '학생이에요',
    endOpts: ['학생이에요', '학생예요'],
    full: '친구는 학생이에요.',
    color: '#3B82F6',
  },
  {
    idx: 3,
    subject: '동생',
    pGood: '은',
    pOpts: ['은', '는'],
    endGood: '아기예요',
    endOpts: ['아기이에요', '아기예요'],
    full: '동생은 아기예요.',
    color: '#10B981',
  },
];

const ParticleRocketLaunchSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [fuelP, setFuelP] = useState<Record<number, string>>({});
  const [fuelE, setFuelE] = useState<Record<number, string>>({});

  const pickFuel = (rIdx: number, kind: 'p' | 'e', val: string) => {
    playCutePop();
    const r = ROCKETS[rIdx];
    const nextP = kind === 'p' ? val : fuelP[rIdx];
    const nextE = kind === 'e' ? val : fuelE[rIdx];
    if (kind === 'p') setFuelP((prev) => ({ ...prev, [rIdx]: val }));
    else setFuelE((prev) => ({ ...prev, [rIdx]: val }));

    if (nextP === r.pGood && nextE === r.endGood) {
      playSuccessChime();
      speakKorean(r.full);
    }
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="③ 슈웅~! 문장 로켓 발사대 (연료 2개 골라 로켓 발사!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => {
            setFuelP({});
            setFuelE({});
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 발사 초기화
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="3단원 놀이 ③"
          title="슈웅~! 문장 로켓 발사대"
          hint="알맞은 연료 글자에 동그라미 ○ 치고 로켓을 발사해요!"
          accentHex="#059669"
          tintHex="#ECFDF5"
        />

        {/* 밤하늘 발사대 + 대빵 큰 로켓 4대 */}
        <div className="relative flex-1 rounded-2xl border-[3px] border-slate-900 bg-indigo-950/5 p-3 grid grid-cols-4 gap-4 items-stretch my-1">
          {ROCKETS.map((r) => {
            const rowImg = PARTICLE_UNIT_3_ROWS[r.idx]?.illustrationSvg;
            const launched = fuelP[r.idx] === r.pGood && fuelE[r.idx] === r.endGood;

            return (
              <div
                key={r.idx}
                className={`flex flex-col items-center justify-between transition-transform duration-300 ${
                  launched ? '-translate-y-2' : ''
                }`}
              >
                {/* 로켓 뾰족 머리 + 우주복 졸라맨 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-24 h-12 rounded-t-full border-[3px] border-b-0 border-slate-900 flex items-end justify-center pb-0.5"
                    style={{ backgroundColor: r.color }}
                  >
                    <span className="text-[13px] font-black text-white">
                      {launched ? '발사!! 🚀' : `${r.idx + 1}호기`}
                    </span>
                  </div>
                </div>

                {/* 로켓 동체 (그림 + 주어 + 연료1 + 연료2) */}
                <div className="w-full flex-1 rounded-2xl border-[3px] border-slate-900 bg-white px-2.5 py-2.5 flex flex-col items-center justify-between shadow-[3px_3px_0_#0F172A]">
                  {/* 조종석 창문: 3단원 일러스트 + 우주 졸라맨 */}
                  <div className="flex items-center justify-center gap-1.5">
                    {rowImg && (
                      <div className="w-16 h-16 rounded-full border-[2.5px] border-slate-900 bg-sky-50 flex items-center justify-center overflow-hidden p-1">
                        <img src={rowImg} alt={r.full} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <JollaComic
                      pose="astronaut"
                      size={44}
                      color={r.color}
                      speech={launched ? '슈웅~!' : undefined}
                    />
                  </div>

                  {/* 주어 왕글자 */}
                  <div className="text-[28px] font-black text-slate-900 leading-none my-1">
                    {r.subject}
                  </div>

                  {/* 1단 연료: 은 / 는 */}
                  <div className="grid grid-cols-2 gap-2 w-full">
                    {r.pOpts.map((op) => {
                      const sel = fuelP[r.idx] === op;
                      return (
                        <div
                          key={op}
                          role="button"
                          tabIndex={0}
                          onClick={() => pickFuel(r.idx, 'p', op)}
                          onKeyDown={(e) => e.key === 'Enter' && pickFuel(r.idx, 'p', op)}
                          className={`py-1.5 rounded-xl border-[2.5px] border-slate-900 text-center text-[21px] font-black cursor-pointer select-none ${
                            sel
                              ? op === r.pGood
                                ? 'bg-emerald-300'
                                : 'bg-rose-200'
                              : 'bg-amber-50'
                          }`}
                        >
                          {op}
                        </div>
                      );
                    })}
                  </div>

                  {/* 2단 연료: ~이에요 / ~예요 */}
                  <div className="flex flex-col gap-1.5 w-full mt-2">
                    {r.endOpts.map((op) => {
                      const sel = fuelE[r.idx] === op;
                      return (
                        <div
                          key={op}
                          role="button"
                          tabIndex={0}
                          onClick={() => pickFuel(r.idx, 'e', op)}
                          onKeyDown={(e) => e.key === 'Enter' && pickFuel(r.idx, 'e', op)}
                          className={`py-1.5 rounded-xl border-[2.5px] border-slate-900 text-center text-[19px] font-black cursor-pointer select-none ${
                            sel
                              ? op === r.endGood
                                ? 'bg-emerald-300'
                                : 'bg-rose-200'
                              : 'bg-sky-50'
                          }`}
                        >
                          {op}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 로켓 불꽃 🔥 */}
                <div className="flex items-start justify-center -mt-0.5">
                  <svg viewBox="0 0 80 42" className="w-16 h-9">
                    <path
                      d="M 18 0 L 62 0 L 52 24 L 40 40 L 28 24 Z"
                      fill={launched ? '#F97316' : '#FDE047'}
                      stroke="#0F172A"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <path d="M 30 0 L 50 0 L 40 24 Z" fill="#EF4444" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-1 flex items-center justify-center text-[13px] font-black text-slate-700 shrink-0">
          🚀 완성한 로켓 문장을 3·2·1 발사! 하며 크게 외쳐 보세요!
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ④ [신규!] 으악! 외계인 글자 UFO 잡기 (5단원 ★ 변신 대작전)
 * - 5대의 대빵 큰 우주 비행접시(UFO)가 빔을 쏘며 진짜 지구 글자 vs 가짜 외계인 글자를 내림!
 * - 아래쪽 잠자리채 든 졸라맨: "가짜 외계인 잡아라!"
 * ============================================================================ */
const UFO_LIST = [
  { noun: '나', real: '내가', alien: '나가', realLeft: true },
  { noun: '너', real: '네가', alien: '너가', realLeft: false },
  { noun: '저', real: '제가', alien: '저가', realLeft: true },
  { noun: '누구', real: '누가', alien: '누구가', realLeft: false },
  { noun: '이것', real: '이게', alien: '이것가', realLeft: true },
];

const ParticleUfoCatchSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [caught, setCaught] = useState<Record<string, boolean>>({});

  const catchAlien = (noun: string, isAlien: boolean, realWord: string) => {
    playCutePop();
    if (isAlien) {
      playSuccessChime();
      speakKorean(realWord);
      setCaught((p) => ({ ...p, [noun]: true }));
    } else {
      speakKorean(realWord);
    }
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="④ 으악! 외계인 글자 UFO 잡기 (가짜 외계인 글자를 클릭해 X표!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => setCaught({})}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 잡기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="5단원 ★ 놀이 ④"
          title="으악! 외계인 글자 UFO 잡기"
          hint="가짜 외계인 글자에 큰 X표, 진짜 한국어에 동그라미 ○!"
          accentHex="#059669"
          tintHex="#ECFDF5"
        />

        {/* 우주 하늘 + 5대 대빵 큰 UFO */}
        <div className="relative flex-1 rounded-2xl border-[3px] border-slate-900 bg-gradient-to-b from-slate-100 via-emerald-50/40 to-lime-100/70 p-3 flex flex-col justify-between my-1">
          {/* 5대 UFO 열 */}
          <div className="grid grid-cols-5 gap-3 flex-1 items-start pt-1">
            {UFO_LIST.map((u) => {
              const item = findPItem(u.noun);
              const isCaught = !!caught[u.noun];
              const leftChoice = u.realLeft
                ? { text: u.real, isAlien: false }
                : { text: u.alien, isAlien: true };
              const rightChoice = u.realLeft
                ? { text: u.alien, isAlien: true }
                : { text: u.real, isAlien: false };

              return (
                <div key={u.noun} className="flex flex-col items-center">
                  {/* 대빵 큰 UFO 비행접시 SVG */}
                  <div className="relative w-full flex flex-col items-center">
                    <svg viewBox="0 0 160 88" className="w-[150px] h-[82px]">
                      {/* 초록 빔 */}
                      <polygon points="48,66 112,66 146,88 14,88" fill="#BBF7D0" opacity="0.7" />
                      {/* 유리 돔 */}
                      <path
                        d="M 46 44 A 34 28 0 0 1 114 44 Z"
                        fill="#BAE6FD"
                        stroke="#0F172A"
                        strokeWidth="3.5"
                      />
                      {/* 비행접시 몸체 */}
                      <ellipse
                        cx="80"
                        cy="50"
                        rx="64"
                        ry="18"
                        fill="#A7F3D0"
                        stroke="#0F172A"
                        strokeWidth="3.5"
                      />
                      <circle cx="42" cy="50" r="5" fill="#FDE047" stroke="#0F172A" strokeWidth="2" />
                      <circle cx="80" cy="54" r="5" fill="#FB7185" stroke="#0F172A" strokeWidth="2" />
                      <circle cx="118" cy="50" r="5" fill="#FDE047" stroke="#0F172A" strokeWidth="2" />
                    </svg>
                    {/* UFO 돔 위 기본 명사 뱃지 */}
                    <div className="absolute top-1.5 bg-white border-2 border-slate-900 rounded-full px-2.5 py-0.5 text-[15px] font-black text-slate-900">
                      {u.noun} + 가
                    </div>
                  </div>

                  {/* 빔 아래 그림 + 선택지 2개 */}
                  <div className="w-full rounded-2xl border-[2.5px] border-emerald-700 bg-white/90 p-2.5 flex flex-col items-center gap-2 shadow-sm -mt-1">
                    <img
                      src={item.illustrationSvg}
                      alt={u.noun}
                      className="w-16 h-16 object-contain"
                    />

                    {[leftChoice, rightChoice].map((ch) => (
                      <div
                        key={ch.text}
                        role="button"
                        tabIndex={0}
                        onClick={() => catchAlien(u.noun, ch.isAlien, u.real)}
                        onKeyDown={(e) =>
                          e.key === 'Enter' && catchAlien(u.noun, ch.isAlien, u.real)
                        }
                        className={`relative w-full py-2 rounded-xl border-[2.5px] border-slate-900 text-center text-[22px] font-black cursor-pointer select-none transition-transform hover:scale-105 ${
                          isCaught && ch.isAlien
                            ? 'bg-rose-200 text-rose-800 line-through'
                            : isCaught && !ch.isAlien
                            ? 'bg-emerald-300 text-emerald-950'
                            : 'bg-white text-slate-900'
                        }`}
                      >
                        {ch.text}
                        {isCaught && ch.isAlien && (
                          <span className="ml-1 text-[16px]">👽✕</span>
                        )}
                        {isCaught && !ch.isAlien && (
                          <span className="ml-1 text-[16px]">○</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 땅 위에서 잠자리채 들고 뛰어다니는 졸라맨 + 만두 */}
          <div className="flex items-center justify-around pt-1">
            <JollaComic pose="net" size={62} color="#059669" speech="가짜 잡아라!" />
            <div className="px-4 py-1.5 rounded-2xl bg-white border-[2.5px] border-slate-900 text-[16px] font-black text-slate-900 shadow-[2px_2px_0_#0F172A]">
              ★ <span className="text-emerald-700">내가 · 네가 · 제가 · 누가 · 이게</span> 만 진짜 지구 말!
            </div>
            <ManduMascot size="sm" mood="cheer" interactive={false} />
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center text-[13px] font-black text-slate-700 shrink-0">
          🛸 가짜 외계인 글자 5개를 모두 X표로 물리쳐 주세요!
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ⑤ [신규!] 뻥~! 방귀 풍선 피해서 구름성 가기 (1~5단원 종합)
 * - 대빵 큰 하늘 그림판에 10개 대빵 큰 풍선(진짜 6개 + 방귀 함정 4개)이 둥실둥실!
 * - 함정 풍선에 X표("뻥~!"), 진짜 풍선 6개만 색칠해서 꼭대기 구름성 도착!
 * ============================================================================ */
interface SkyBalloon {
  id: number;
  text: string;
  isTrap: boolean;
  fix?: string;
}

const SKY_BALLOONS: SkyBalloon[] = [
  { id: 0, text: '나는', isTrap: false },
  { id: 1, text: '나은', isTrap: true, fix: '나는!' },
  { id: 2, text: '학생이에요', isTrap: false },
  { id: 3, text: '물가', isTrap: true, fix: '물이!' },
  { id: 4, text: '의자예요', isTrap: false },
  { id: 5, text: '학생예요', isTrap: true, fix: '학생이에요!' },
  { id: 6, text: '물이', isTrap: false },
  { id: 7, text: '내가', isTrap: false },
  { id: 8, text: '저가', isTrap: true, fix: '제가!' },
  { id: 9, text: '누가', isTrap: false },
];

const ParticleFartBalloonSheet: React.FC<{
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ onPrintSingle }) => {
  const [popped, setPopped] = useState<Record<number, boolean>>({});
  const [colored, setColored] = useState<Record<number, boolean>>({});

  const tapBalloon = (b: SkyBalloon) => {
    playCutePop();
    if (b.isTrap) {
      setPopped((p) => ({ ...p, [b.id]: !p[b.id] }));
    } else {
      speakKorean(b.text);
      setColored((p) => {
        const next = { ...p, [b.id]: !p[b.id] };
        if (Object.values(next).filter(Boolean).length === 6) playSuccessChime();
        return next;
      });
    }
  };

  return (
    <div className="w-full">
      <PlayWebBar badge="⑤ 뻥~! 방귀 풍선 피해서 구름성 가기 (방귀 풍선 클릭해 터뜨리기!)" onPrintSingle={onPrintSingle}>
        <button
          type="button"
          onClick={() => {
            setPopped({});
            setColored({});
          }}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 다시 날리기
        </button>
      </PlayWebBar>

      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-[2.5px] border-slate-800 shadow-sm mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '14px 18px 14px' }}
      >
        <PlaybookHeader
          chapterTag="1~5단원 종합 놀이 ⑤"
          title="뻥~! 방귀 풍선 피해서 구름성 가기"
          hint="틀린 방귀 풍선 4개는 X표로 뻥! 진짜 풍선 6개만 예쁘게 색칠!"
          accentHex="#059669"
          tintHex="#ECFDF5"
        />

        {/* 대빵 큰 하늘 + 구름성 + 10개 왕풍선 */}
        <div className="relative flex-1 rounded-2xl border-[3px] border-slate-900 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-50 p-3 flex flex-col justify-between overflow-hidden my-1">
          {/* 꼭대기 구름성 배너 */}
          <div className="flex items-center justify-between px-3">
            <JollaComic pose="float" size={50} color="#059669" speech="구름성 가자!" />
            <div className="px-6 py-1.5 rounded-full bg-white border-[3px] border-slate-900 shadow-[3px_3px_0_#0F172A] flex items-center gap-2.5">
              <ManduMascot size="xs" mood="cheer" interactive={false} />
              <span className="text-[20px] font-black text-sky-800">🏰 반짝반짝 구름성 ☁️</span>
            </div>
            <JollaComic pose="splat" size={50} color="#E11D48" speech="뻥~ 으악!" />
          </div>

          {/* 10개 대빵 큰 둥실 풍선 (5×2, 지그재그 높이로 생동감!) */}
          <div className="grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-3 flex-1 items-center px-2 my-1">
            {SKY_BALLOONS.map((b, idx) => {
              const isPopped = !!popped[b.id];
              const isColored = !!colored[b.id];
              const offsetClass = idx % 2 === 0 ? '-translate-y-1.5' : 'translate-y-1.5';

              return (
                <div
                  key={b.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => tapBalloon(b)}
                  onKeyDown={(e) => e.key === 'Enter' && tapBalloon(b)}
                  className={`flex flex-col items-center cursor-pointer select-none transition-transform hover:scale-105 ${offsetClass}`}
                >
                  <div
                    className={`relative w-full h-[112px] rounded-[50%] border-[3px] border-slate-900 flex flex-col items-center justify-center shadow-[3px_3px_0_#0F172A] ${
                      isPopped
                        ? 'bg-lime-200 border-dashed border-rose-600'
                        : isColored
                        ? 'bg-emerald-200'
                        : 'bg-white'
                    }`}
                  >
                    <span
                      className={`text-[24px] font-black leading-none ${
                        isPopped ? 'text-rose-600 line-through' : 'text-slate-900'
                      }`}
                    >
                      {b.text}
                    </span>
                    {isPopped && (
                      <span className="mt-1 text-[13px] font-black text-rose-700">
                        💨 뻥! ({b.fix})
                      </span>
                    )}
                    {isColored && (
                      <span className="mt-1 text-[13px] font-black text-emerald-800">
                        ★ 진짜!
                      </span>
                    )}
                  </div>
                  {/* 풍선 꼭지 + 줄 */}
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[7px] border-b-slate-900" />
                  <div className="w-[2px] h-5 bg-slate-700" />
                </div>
              );
            })}
          </div>

          {/* 바닥 표시 */}
          <div className="flex items-center justify-center gap-6 text-[14px] font-black text-slate-800">
            <span className="px-3 py-0.5 rounded-full bg-white border-2 border-slate-900">
              ✅ 진짜 풍선: 6개 색칠!
            </span>
            <span className="px-3 py-0.5 rounded-full bg-rose-100 border-2 border-slate-900 text-rose-800">
              💨 방귀 함정: 4개 뻥! X표!
            </span>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-center text-[13px] font-black text-slate-700 shrink-0">
          💨 방귀 풍선 4개를 모두 터뜨리면 구름성 도착 만세!
        </div>
      </div>
    </div>
  );
};

// Exported Renderer by index (0 ~ 4)
export const ParticlePlayDraftSheet: React.FC<{
  sheetIndex: number;
  lang: SupportedLanguage;
  onPrintSingle?: () => void;
}> = ({ sheetIndex, lang, onPrintSingle }) => {
  switch (sheetIndex) {
    case 0:
      return <ParticleRockLiftSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 1:
      return <ParticleSeesawSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 2:
      return <ParticleRocketLaunchSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 3:
      return <ParticleUfoCatchSheet lang={lang} onPrintSingle={onPrintSingle} />;
    case 4:
    default:
      return <ParticleFartBalloonSheet lang={lang} onPrintSingle={onPrintSingle} />;
  }
};
