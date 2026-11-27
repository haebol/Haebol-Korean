import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
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

const DOT_GRID_STYLE: React.CSSProperties = {
  backgroundImage: 'radial-gradient(#cbd5e1 1.1px, transparent 1.1px)',
  backgroundSize: '22px 22px',
};

const INLINE_BTN_CLASS =
  'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 transition-colors cursor-pointer';

/* ============================================================================
 * ① 끙차! 받침 바위 들기 대회
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
}> = () => {
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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="조사 놀이 ①"
          title="끙차! 받침 바위 들기 대회"
          hint="받침이 있으면 🪨 바위, 없으면 🎈 풍선에 동그라미 ○!"
          accentHex="#265A20"
          tintHex="#E7F4E2"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setPicked({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 상단 규칙 배너 */}
        <div className="grid grid-cols-2 gap-3.5 mb-2 shrink-0">
          <div className="rounded-2xl border-[1.5px] border-[#C3E0B8] bg-[#F3FAF0]/85 px-4 py-1.5 flex items-center justify-center gap-3.5">
            <JollaComic pose="heavy" size={50} color="#448E3A" speech="무거워!!" />
            <div>
              <div className="text-[16.5px] font-black text-slate-800">🪨 받침 있어!</div>
              <div className="text-[18px] font-black text-[#2F6F27]">은 · 이 · 이에요</div>
            </div>
          </div>
          <div className="rounded-2xl border-[1.5px] border-amber-200 bg-amber-50/70 px-4 py-1.5 flex items-center justify-center gap-3.5">
            <JollaComic pose="float" size={50} color="#D97706" speech="둥실~" />
            <div>
              <div className="text-[16.5px] font-black text-slate-800">🎈 받침 없어!</div>
              <div className="text-[18px] font-black text-amber-700">는 · 가 · 예요</div>
            </div>
          </div>
        </div>

        {/* 따뜻한 크림 4×2 카드판 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] p-3 grid grid-cols-4 grid-rows-2 gap-3 my-0.5 overflow-hidden">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={DOT_GRID_STYLE} />

          {ROCK_CARDS.map((card) => {
            const item = findPItem(card.noun);
            const sel = picked[card.noun];
            return (
              <div
                key={card.noun}
                className="relative z-10 rounded-2xl border-[1.5px] border-slate-300 bg-white p-2.5 flex flex-col items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item.illustrationSvg}
                    alt={card.noun}
                    className="w-15 h-15 object-contain"
                  />
                  <span className="text-[26px] font-black text-slate-800 leading-none">
                    {card.noun}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full mt-2">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => choose(card.noun, 'rock', card.hasBatchim, card.full)}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && choose(card.noun, 'rock', card.hasBatchim, card.full)
                    }
                    className={`rounded-xl border-[1.5px] py-1.5 text-center text-[17px] font-black cursor-pointer select-none transition-colors ${
                      sel === 'rock'
                        ? card.hasBatchim
                          ? 'bg-[#E7F4E2] border-[#69B35C] text-[#214A1C]'
                          : 'bg-rose-100 border-rose-400 text-rose-800'
                        : 'bg-slate-50 border-slate-300 text-slate-800 hover:border-[#69B35C]'
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
                    className={`rounded-xl border-[1.5px] py-1.5 text-center text-[17px] font-black cursor-pointer select-none transition-colors ${
                      sel === 'balloon'
                        ? !card.hasBatchim
                          ? 'bg-amber-100 border-amber-400 text-amber-900'
                          : 'bg-rose-100 border-rose-400 text-rose-800'
                        : 'bg-[#FFFDF7] border-amber-200 text-slate-800 hover:border-amber-400'
                    }`}
                  >
                    🎈 {card.balloon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-center text-[12.5px] font-bold text-slate-600 shrink-0">
          🪨 받침 있는 글자는 무거워요! 고른 뒤 “가방은! 친구는!” 크게 읽어 보세요!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ② 끼익끼익! 놀이터 시소 균형 맞추기
 * ============================================================================ */
const SEESAWS = [
  { noun: '책', optA: '이', optB: '가', answer: '이', full: '책이' },
  { noun: '배', optA: '이', optB: '가', answer: '가', full: '배가' },
  { noun: '연필', optA: '이에요', optB: '예요', answer: '이에요', full: '연필이에요' },
  { noun: '지우개', optA: '이에요', optB: '예요', answer: '예요', full: '지우개예요' },
];

const ParticleSeesawSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="조사 놀이 ②"
          title="끼익끼익! 놀이터 시소 균형 맞추기"
          hint="알맞은 조사를 써 넣고 시소를 똑바로 맞춰 주세요!"
          accentHex="#265A20"
          tintHex="#E7F4E2"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setChosen({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 2×2 따뜻한 놀이터 시소 4개 */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4 my-0.5">
          {SEESAWS.map((sw, idx) => {
            const item = findPItem(sw.noun);
            const val = chosen[sw.noun];
            const isBalanced = val === sw.answer;

            return (
              <div
                key={sw.noun}
                className="relative rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] p-3.5 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={DOT_GRID_STYLE} />

                <span className="relative z-10 self-start px-2.5 py-0.5 rounded-lg bg-[#E7F4E2] text-[#265A20] text-[12px] font-black">
                  시소 {idx + 1}
                </span>

                <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-1.5">
                  <div
                    className="w-[88%] flex items-end justify-between px-3 pb-1 border-b-[8px] border-amber-400 rounded-b-sm transition-transform duration-300"
                    style={{
                      transform: isBalanced ? 'rotate(0deg)' : 'rotate(-6deg)',
                    }}
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={item.illustrationSvg}
                        alt={sw.noun}
                        className="w-15 h-15 object-contain"
                      />
                      <span className="px-3 py-0.5 rounded-xl bg-white border-[1.5px] border-slate-400 text-[24px] font-black text-slate-800 leading-none">
                        {sw.noun}
                      </span>
                    </div>

                    <div className="flex items-end gap-1.5">
                      <div
                        className={`w-[100px] h-[50px] rounded-xl border-[1.5px] border-dashed flex items-center justify-center text-[22px] font-black ${
                          isBalanced
                            ? 'bg-[#E7F4E2] border-[#69B35C] text-[#214A1C]'
                            : 'bg-white border-slate-400 text-slate-400'
                        }`}
                      >
                        {val || '?'}
                      </div>
                      <JollaComic
                        pose={isBalanced ? 'cheer' : 'cling'}
                        size={46}
                        color={isBalanced ? '#448E3A' : '#E11D48'}
                        speech={isBalanced ? '똑바로!' : '기울어!'}
                      />
                    </div>
                  </div>

                  {/* 시소 삼각 받침대 */}
                  <div className="w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[24px] border-b-slate-500 -mt-0.5" />
                </div>

                {/* 아래 고르기 2개 버튼 */}
                <div className="relative z-10 flex items-center justify-center gap-3.5 pt-2 border-t border-dashed border-slate-300">
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
                        className={`px-6 py-1 rounded-full border-[1.5px] text-[19px] font-black cursor-pointer select-none transition-all hover:scale-105 ${
                          isRight
                            ? 'bg-[#E7F4E2] border-[#69B35C] text-[#214A1C]'
                            : isWrong
                            ? 'bg-rose-100 border-rose-400 text-rose-800'
                            : 'bg-white border-slate-400 text-slate-800 hover:border-[#69B35C]'
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

        <div className="mt-2 flex items-center justify-center text-[12.5px] font-bold text-slate-600 shrink-0">
          ⚖️ 알맞은 조사에 동그라미 ○ 치고 빈칸에 쓱쓱 써 보세요!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ③ 슈웅~! 문장 로켓 발사대 (3단원 문장 조립)
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
    color: '#FB7185',
    bg: '#FFF1F2',
    border: '#FDA4AF',
  },
  {
    idx: 1,
    subject: '너',
    pGood: '는',
    pOpts: ['은', '는'],
    endGood: '여자예요',
    endOpts: ['여자이에요', '여자예요'],
    full: '너는 여자예요.',
    color: '#FBBF24',
    bg: '#FFFBEB',
    border: '#FCD34D',
  },
  {
    idx: 2,
    subject: '친구',
    pGood: '는',
    pOpts: ['은', '는'],
    endGood: '학생이에요',
    endOpts: ['학생이에요', '학생예요'],
    full: '친구는 학생이에요.',
    color: '#60A5FA',
    bg: '#EFF6FF',
    border: '#93C5FD',
  },
  {
    idx: 3,
    subject: '동생',
    pGood: '은',
    pOpts: ['은', '는'],
    endGood: '아기예요',
    endOpts: ['아기이에요', '아기예요'],
    full: '동생은 아기예요.',
    color: '#69B35C',
    bg: '#F3FAF0',
    border: '#84C678',
  },
];

const ParticleRocketLaunchSheet: React.FC<{
  lang: SupportedLanguage;
}> = () => {
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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="조사 놀이 ③"
          title="슈웅~! 문장 로켓 발사대"
          hint="알맞은 연료 글자에 동그라미 ○ 치고 로켓을 발사해요!"
          accentHex="#265A20"
          tintHex="#E7F4E2"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setFuelP({});
                setFuelE({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 따뜻한 크림 우주 발사대 + 로켓 4대 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] p-3.5 grid grid-cols-4 gap-4 items-stretch my-0.5 overflow-hidden">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={DOT_GRID_STYLE} />

          {ROCKETS.map((r) => {
            const rowImg = PARTICLE_UNIT_3_ROWS[r.idx]?.illustrationSvg;
            const launched = fuelP[r.idx] === r.pGood && fuelE[r.idx] === r.endGood;

            return (
              <div
                key={r.idx}
                className={`relative z-10 flex flex-col items-center justify-between transition-transform duration-300 ${
                  launched ? '-translate-y-2' : ''
                }`}
              >
                {/* 로켓 뾰족 머리 */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-24 h-11 rounded-t-full border-[1.5px] border-b-0 flex items-end justify-center pb-1"
                    style={{ backgroundColor: r.bg, borderColor: r.border }}
                  >
                    <span className="text-[12.5px] font-black text-slate-700">
                      {launched ? '발사!! 🚀' : `${r.idx + 1}호기`}
                    </span>
                  </div>
                </div>

                {/* 로켓 동체 */}
                <div
                  className="w-full flex-1 rounded-2xl border-[1.5px] bg-white px-2.5 py-2.5 flex flex-col items-center justify-between shadow-2xs"
                  style={{ borderColor: r.border }}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    {rowImg && (
                      <div className="w-15 h-15 rounded-full border-[1.5px] border-slate-300 bg-sky-50/70 flex items-center justify-center overflow-hidden p-1">
                        <img src={rowImg} alt={r.full} className="w-full h-full object-contain" />
                      </div>
                    )}
                    <JollaComic
                      pose="astronaut"
                      size={42}
                      color={r.color}
                      speech={launched ? '슈웅~!' : undefined}
                    />
                  </div>

                  <div className="text-[26px] font-black text-slate-800 leading-none my-1">
                    {r.subject}
                  </div>

                  {/* 1단 연료 */}
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
                          className={`py-1.5 rounded-xl border-[1.5px] text-center text-[20px] font-black cursor-pointer select-none transition-colors ${
                            sel
                              ? op === r.pGood
                                ? 'bg-[#E7F4E2] border-[#69B35C] text-[#214A1C]'
                                : 'bg-rose-100 border-rose-400 text-rose-800'
                              : 'bg-[#FFFDF7] border-slate-300 text-slate-800 hover:border-amber-400'
                          }`}
                        >
                          {op}
                        </div>
                      );
                    })}
                  </div>

                  {/* 2단 연료 */}
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
                          className={`py-1.5 rounded-xl border-[1.5px] text-center text-[18px] font-black cursor-pointer select-none transition-colors ${
                            sel
                              ? op === r.endGood
                                ? 'bg-[#E7F4E2] border-[#69B35C] text-[#214A1C]'
                                : 'bg-rose-100 border-rose-400 text-rose-800'
                              : 'bg-sky-50/50 border-slate-300 text-slate-800 hover:border-sky-400'
                          }`}
                        >
                          {op}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 부드러운 로켓 불꽃 */}
                <div className="flex items-start justify-center -mt-0.5">
                  <svg viewBox="0 0 80 42" className="w-15 h-8">
                    <path
                      d="M 18 0 L 62 0 L 52 24 L 40 38 L 28 24 Z"
                      fill={launched ? '#FB923C' : '#FEF08A'}
                      stroke="#64748B"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path d="M 30 0 L 50 0 L 40 22 Z" fill="#FDA4AF" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-center text-[12.5px] font-bold text-slate-600 shrink-0">
          🚀 완성한 로켓 문장을 3·2·1 발사! 하며 크게 외쳐 보세요!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ④ 으악! 외계인 글자 UFO 잡기 (5단원 ★ 변신 대작전)
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
}> = () => {
  const [caught, setCaught] = useState<Record<string, boolean>>({});
  const caughtCount = Object.values(caught).filter(Boolean).length;

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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="조사 놀이 ④"
          title="으악! 외계인 글자 UFO 잡기"
          hint="가짜 외계인 글자에 큰 X표, 진짜 한국어에 동그라미 ○!"
          accentHex="#265A20"
          tintHex="#E7F4E2"
          scoreBadge={`잡음: ${caughtCount > 0 ? caughtCount : ' '} / 5`}
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setCaught({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 따뜻한 크림 하늘 + UFO 5대 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#FFFDF5] p-3.5 flex flex-col justify-between my-0.5 overflow-hidden">
          <div className="absolute inset-0 opacity-35 pointer-events-none" style={DOT_GRID_STYLE} />

          <div className="relative z-10 grid grid-cols-5 gap-3 flex-1 items-start pt-1">
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
                  <div className="relative w-full flex flex-col items-center">
                    <svg viewBox="0 0 160 88" className="w-[144px] h-[78px]">
                      <polygon points="48,66 112,66 144,88 16,88" fill="#E7F4E2" opacity="0.65" />
                      <path
                        d="M 46 44 A 34 28 0 0 1 114 44 Z"
                        fill="#E0F2FE"
                        stroke="#475569"
                        strokeWidth="2.2"
                      />
                      <ellipse
                        cx="80"
                        cy="50"
                        rx="64"
                        ry="18"
                        fill="#C3E0B8"
                        stroke="#475569"
                        strokeWidth="2.2"
                      />
                      <circle cx="42" cy="50" r="4.5" fill="#FEF08A" stroke="#475569" strokeWidth="1.5" />
                      <circle cx="80" cy="54" r="4.5" fill="#FDA4AF" stroke="#475569" strokeWidth="1.5" />
                      <circle cx="118" cy="50" r="4.5" fill="#FEF08A" stroke="#475569" strokeWidth="1.5" />
                    </svg>
                    <div className="absolute top-1 bg-white border border-slate-400 rounded-full px-2.5 py-0.5 text-[13.5px] font-black text-slate-700">
                      {u.noun} + 가
                    </div>
                  </div>

                  <div className="w-full rounded-2xl border-[1.5px] border-[#84C678] bg-white/95 p-2.5 flex flex-col items-center gap-2 shadow-2xs -mt-1">
                    <img
                      src={item.illustrationSvg}
                      alt={u.noun}
                      className="w-15 h-15 object-contain"
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
                        className={`relative w-full py-1.5 rounded-xl border-[1.5px] text-center text-[20px] font-black cursor-pointer select-none transition-all hover:scale-105 ${
                          isCaught && ch.isAlien
                            ? 'bg-rose-100 border-rose-400 text-rose-700 line-through'
                            : isCaught && !ch.isAlien
                            ? 'bg-[#E7F4E2] border-[#69B35C] text-[#214A1C]'
                            : 'bg-[#FFFDF8] border-slate-300 text-slate-800 hover:border-[#69B35C]'
                        }`}
                      >
                        {ch.text}
                        {isCaught && ch.isAlien && <span className="ml-1 text-[14px]">👽✕</span>}
                        {isCaught && !ch.isAlien && <span className="ml-1 text-[14px]">○</span>}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 땅 위 졸라맨 + 힌트 배너 */}
          <div className="relative z-10 flex items-center justify-around pt-1">
            <JollaComic pose="net" size={58} color="#448E3A" speech="가짜 잡아라!" />
            <div className="px-4 py-1.5 rounded-xl bg-white border-[1.5px] border-[#84C678] text-[15px] font-black text-slate-700 shadow-2xs">
              ★ <span className="text-[#2F6F27]">내가 · 네가 · 제가 · 누가 · 이게</span> 만 진짜 지구 말!
            </div>
            <ManduMascot size="sm" mood="cheer" interactive={false} />
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center text-[12.5px] font-bold text-slate-600 shrink-0">
          🛸 가짜 외계인 글자 5개를 모두 X표로 물리쳐 주세요!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * ⑤ 뻥~! 방귀 풍선 피해서 구름성 가기 (1~5단원 종합)
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
}> = () => {
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
      <div
        className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
        style={{ minHeight: '690px', padding: '16px 20px 14px' }}
      >
        <PlaybookHeader
          chapterTag="조사 놀이 ⑤"
          title="뻥~! 방귀 풍선 피해서 구름성 가기"
          hint="틀린 방귀 풍선 4개는 X표로 뻥! 진짜 풍선 6개만 예쁘게 색칠!"
          accentHex="#265A20"
          tintHex="#E7F4E2"
          webControls={
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setPopped({});
                setColored({});
              }}
              className={INLINE_BTN_CLASS}
            >
              <RotateCcw className="w-3.5 h-3.5" /> 초기화
            </button>
          }
        />

        {/* 따뜻한 크림 하늘 + 구름성 + 10개 풍선 */}
        <div className="relative flex-1 rounded-2xl border-[1.5px] border-slate-700 bg-[#F7FBFF] p-3.5 flex flex-col justify-between overflow-hidden my-0.5">
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={DOT_GRID_STYLE} />

          <div className="relative z-10 flex items-center justify-between px-3">
            <JollaComic pose="float" size={48} color="#448E3A" speech="구름성 가자!" />
            <div className="px-5 py-1 rounded-full bg-white border-[1.5px] border-sky-300 shadow-2xs flex items-center gap-2">
              <ManduMascot size="xs" mood="cheer" interactive={false} />
              <span className="text-[18px] font-black text-sky-800">🏰 반짝반짝 구름성 ☁️</span>
            </div>
            <JollaComic pose="splat" size={48} color="#E11D48" speech="뻥~ 으악!" />
          </div>

          <div className="relative z-10 grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-2.5 flex-1 items-center px-2 my-1">
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
                    className={`relative w-full h-[108px] rounded-[50%] border-[1.5px] flex flex-col items-center justify-center shadow-2xs ${
                      isPopped
                        ? 'bg-rose-50 border-dashed border-rose-400'
                        : isColored
                        ? 'bg-[#E7F4E2] border-[#69B35C]'
                        : 'bg-white border-sky-300 hover:border-[#69B35C]'
                    }`}
                  >
                    <span
                      className={`text-[22px] font-black leading-none ${
                        isPopped ? 'text-rose-500 line-through' : 'text-slate-800'
                      }`}
                    >
                      {b.text}
                    </span>
                    {isPopped && (
                      <span className="mt-1 text-[12px] font-black text-rose-600">
                        💨 뻥! ({b.fix})
                      </span>
                    )}
                    {isColored && (
                      <span className="mt-1 text-[12px] font-black text-[#2F6F27]">
                        ★ 진짜!
                      </span>
                    )}
                  </div>
                  <div className="w-0 h-0 border-l-[4.5px] border-l-transparent border-r-[4.5px] border-r-transparent border-b-[6px] border-b-slate-400" />
                  <div className="w-[1.5px] h-4 bg-slate-400" />
                </div>
              );
            })}
          </div>

          <div className="relative z-10 flex items-center justify-center gap-4 text-[13px] font-bold text-slate-700">
            <span className="px-3 py-0.5 rounded-full bg-white border border-[#84C678] text-[#265A20]">
              ✅ 진짜 풍선: 6개 색칠!
            </span>
            <span className="px-3 py-0.5 rounded-full bg-rose-50 border border-rose-300 text-rose-700">
              💨 방귀 함정: 4개 뻥! X표!
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center text-[12.5px] font-bold text-slate-600 shrink-0">
          💨 방귀 풍선 4개를 모두 터뜨리면 구름성 도착 만세!
        </div>
        <div className="mt-1 pt-0.5 border-t border-slate-200 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-400 font-korean-gothic shrink-0">
          <span className="font-medium">해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
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
}> = ({ sheetIndex, lang }) => {
  switch (sheetIndex) {
    case 0:
      return <ParticleRockLiftSheet lang={lang} />;
    case 1:
      return <ParticleSeesawSheet lang={lang} />;
    case 2:
      return <ParticleRocketLaunchSheet lang={lang} />;
    case 3:
      return <ParticleUfoCatchSheet lang={lang} />;
    case 4:
    default:
      return <ParticleFartBalloonSheet lang={lang} />;
  }
};
