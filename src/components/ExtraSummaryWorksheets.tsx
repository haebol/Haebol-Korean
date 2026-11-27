import React from 'react';
import { SupportedLanguage, VocabularyItem } from '../types';
import { CHAPTER_THEME_TRANSLATIONS } from '../data/vocabulary';
import { speakKorean, playCutePop } from '../utils/audio';

const FONT_TITLE =
  "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans KR', system-ui, sans-serif";
const FONT_HAND =
  "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif";

// ============================================================================
// 1. [용언 활용] ㉛ 한국어 용언 활용 총정리표 (A4 가로 1장 요약 정리표 - 교사용 원판)
// ============================================================================
export interface VerbCardMetaCopy {
  title: string;
  catLabel: string;
  formula?: string;
}

export interface VerbSummaryCopy {
  sheetTitle: string;
  totalBadge: string;
  gradeLabel: string;
  nameLabel: string;
  sec1Title: string;
  sec1Sub: string;
  catLegend: [string, string, string, string, string];
  mergedPresentTitle: string;
  mergedPastTitle: string;
  cardMeta?: VerbCardMetaCopy[];
  regularSecTitle: string;
  regularRules: { title: string; body: string; audio: string }[];
  irregularSecTitle: string;
  irregulars: { num: string; name: string; ex: string; note?: string; audio: string }[];
  irregularRefNote: string;
  footerLeft: string;
  footerRight: string;
}

export const DEFAULT_VERB_SUMMARY_COPY: VerbSummaryCopy = {
  sheetTitle: '해볼한국어 [용언 활용] ㉛ 한국어 용언 활용 총정리표 | Korean Verb Conjugation Master Chart',
  totalBadge: '총 30단원 · 150어휘',
  gradeLabel: '학년',
  nameLabel: '이름',
  sec1Title: '30단원 용언 활용 한눈에 보기',
  sec1Sub: '클릭하면 대표 활용형을 들을 수 있어요',
  catLegend: ['현재', '과거', '부정·요청', '미래·의무·제안', '연결·경험'],
  mergedPresentTitle: '[01~05] 현재형: -아요 / -어요 / -해요',
  mergedPastTitle: '[06~10] 과거형: -았어요 / -었어요 / -했어요',
  regularSecTitle: '대표적인 규칙 활용 3가지',
  regularRules: [
    {
      title: '① 모음조화 규칙',
      body: '어간 끝 모음 ㅏ·ㅗ → -아요/-았어요 · 그 외 모음 → -어요/-었어요 · 하다 → -해요/-했어요',
      audio: '받아요, 먹어요, 공부해요',
    },
    {
      title: '② 받침 유무 규칙',
      body: "받침 O → '-으세요 / -으면 / -을' · 받침 X 및 ㄹ받침 → '-세요 / -면 / -ㄹ'",
      audio: '읽으세요, 가세요, 살 거예요',
    },
    {
      title: '③ 어간·어미 고정',
      body: '어간이나 어미 모양이 바뀌지 않고 그대로 연결: -고, -지만, -지 마세요',
      audio: '먹고, 어렵지만, 뛰지 마세요',
    },
  ],
  irregularSecTitle: '한국어교육(외국인 학습자) 기준 7대 불규칙 활용',
  irregulars: [
    {
      num: '①',
      name: '‘ㅡ’ 불규칙',
      ex: 'ㅡ 탈락: 쓰다→써요, 예쁘다→예뻤어요',
      note: '※학교 문법에서는 규칙 활용이나 외국인 교육에서는 불규칙으로 지도',
      audio: '써요, 예뻤어요',
    },
    {
      num: '②',
      name: '‘ㄹ’ 불규칙',
      ex: 'ㄹ 탈락: 살다→사세요, 만들다→만드네요',
      note: '※학교 문법에서는 규칙 활용이나 외국인 교육에서는 불규칙으로 지도',
      audio: '사세요, 만드네요',
    },
    { num: '③', name: '‘ㅂ’ 불규칙', ex: '돕다→도와요, 춥다→추워요', audio: '도와요, 추워요' },
    { num: '④', name: '‘ㄷ’ 불규칙', ex: '듣다→들어요, 걷다→걸어요', audio: '들어요, 걸어요' },
    { num: '⑤', name: '‘르’ 불규칙', ex: '모르다→몰라요, 부르다→불렀어요', audio: '몰라요, 불렀어요' },
    { num: '⑥', name: '‘ㅅ’ 불규칙', ex: '낫다→나아요, 짓다→지어요', audio: '나아요, 지어요' },
    { num: '⑦', name: '‘ㅎ’ 불규칙', ex: '그렇다→그러면, 까맣다→까매요', audio: '그러면, 까매요' },
  ],
  irregularRefNote:
    "※ 참고: 학교 문법의 '우(푸다→퍼)·여(하다→하여)·러(이르다→이르러)·거라/너라' 불규칙은 외국인 초·중급 교육에서는 개별 단어 암기나 기본 문형(-해요)으로 처리하며, 위 7대 불규칙을 표준 체계로 학습합니다.",
  footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
  footerRight: '카드를 누르면 대표 활용형 소리가 재생됩니다 · ★ 불규칙 주의 단원',
};

type VerbSummaryCat = 'expr' | 'modal' | 'connect';

interface VerbSummaryCardItem {
  circled: string;
  title: string;
  cat: VerbSummaryCat;
  catLabel: string;
  formula: string;
  examplePair: string;
  audioWord: string;
  isStar?: boolean;
}

const VERB_DETAIL_CARDS: VerbSummaryCardItem[] = [
  { circled: '⑪', title: '부정 1', cat: 'expr', catLabel: '부정', formula: '안 / 못 [용언]', examplePair: '울다 → 안 울어요', audioWord: '안 울어요' },
  { circled: '⑫', title: '부정 2', cat: 'expr', catLabel: '부정', formula: '[명사] 안/못 해요', examplePair: '요리 → 요리 못 해요', audioWord: '요리 못 해요' },
  { circled: '⑬', title: '희망', cat: 'expr', catLabel: '마음', formula: '-고 싶어요', examplePair: '배우다 → 배우고 싶어요', audioWord: '배우고 싶어요' },
  { circled: '⑭', title: '진행', cat: 'expr', catLabel: '진행', formula: '-고 있어요', examplePair: '일하다 → 일하고 있어요', audioWord: '일하고 있어요' },
  { circled: '⑮', title: '요청', cat: 'expr', catLabel: '요청', formula: '-세요 / -으세요', examplePair: '넣다 → 넣으세요', audioWord: '넣으세요' },
  { circled: '⑯', title: '금지', cat: 'expr', catLabel: '금지', formula: '-지 마세요', examplePair: '뛰다 → 뛰지 마세요', audioWord: '뛰지 마세요' },
  { circled: '⑰', title: '미래', cat: 'modal', catLabel: '미래', formula: '-ㄹ / -을 거예요', examplePair: '살다 → 살 거예요', audioWord: '살 거예요' },
  { circled: '⑱', title: '부탁', cat: 'modal', catLabel: '부탁', formula: '-아/어/해 주세요', examplePair: '켜다 → 켜 주세요', audioWord: '켜 주세요' },
  { circled: '⑲', title: '허락', cat: 'modal', catLabel: '허락', formula: '-아도/어도/해도 돼요?', examplePair: '들어가다 → 들어가도 돼요?', audioWord: '들어가도 돼요?' },
  { circled: '⑳', title: '의무', cat: 'modal', catLabel: '의무', formula: '-아야/어야/해야 돼요', examplePair: '조심하다 → 조심해야 돼요', audioWord: '조심해야 돼요' },
  { circled: '㉑', title: '능력', cat: 'modal', catLabel: '능력', formula: '-(으)ㄹ 수 있어요/없어요', examplePair: '건너다 → 건널 수 있어요', audioWord: '건널 수 있어요' },
  { circled: '㉒', title: '제안', cat: 'modal', catLabel: '제안', formula: '-ㄹ까요? / -을까요?', examplePair: '모이다 → 모일까요?', audioWord: '모일까요?' },
  { circled: '㉓', title: '나열', cat: 'connect', catLabel: '연결', formula: '-고', examplePair: '세수하다 → 세수하고', audioWord: '세수하고' },
  { circled: '㉔', title: '대조', cat: 'connect', catLabel: '연결', formula: '-지만', examplePair: '어렵다 → 어렵지만', audioWord: '어렵지만' },
  { circled: '㉕', title: '이유 ★', cat: 'connect', catLabel: '이유', formula: '-아서/어서/해서', examplePair: '덥다 → 더워서', audioWord: '더워서', isStar: true },
  { circled: '㉖', title: '조건 ★', cat: 'connect', catLabel: '조건', formula: '-면 / -으면', examplePair: '그렇다 → 그러면', audioWord: '그러면', isStar: true },
  { circled: '㉗', title: '시간', cat: 'connect', catLabel: '시간', formula: '-ㄹ 때 / -을 때', examplePair: '발표하다 → 발표할 때', audioWord: '발표할 때' },
  { circled: '㉘', title: '목적', cat: 'connect', catLabel: '목적', formula: '-(으)러 가요/와요', examplePair: '산책하다 → 산책하러 가요', audioWord: '산책하러 가요' },
  { circled: '㉙', title: '순서', cat: 'connect', catLabel: '순서', formula: '-기 전에 / -(으)ㄴ 후에', examplePair: '양치하기 전에 · 자른 후에', audioWord: '양치하기 전에' },
  { circled: '㉚', title: '경험', cat: 'connect', catLabel: '경험', formula: '-아/어/해 봤어요', examplePair: '춤추다 → 춤춰 봤어요', audioWord: '춤춰 봤어요' },
];

const VERB_CAT_STYLE: Record<
  VerbSummaryCat,
  { border: string; topBg: string; topText: string; formulaText: string; hover: string }
> = {
  expr: {
    border: 'border-sky-300',
    topBg: 'bg-sky-50 border-b border-sky-200',
    topText: 'text-sky-900',
    formulaText: 'text-sky-950',
    hover: 'hover:border-sky-500 hover:bg-sky-50/30',
  },
  modal: {
    border: 'border-emerald-300',
    topBg: 'bg-emerald-50 border-b border-emerald-200',
    topText: 'text-emerald-900',
    formulaText: 'text-emerald-950',
    hover: 'hover:border-emerald-500 hover:bg-emerald-50/30',
  },
  connect: {
    border: 'border-rose-300',
    topBg: 'bg-rose-50 border-b border-rose-200',
    topText: 'text-rose-900',
    formulaText: 'text-rose-950',
    hover: 'hover:border-rose-500 hover:bg-rose-50/30',
  },
};

export const VerbSummaryWorksheetPage: React.FC<{
  interactiveAudio?: boolean;
  className?: string;
  copy?: VerbSummaryCopy;
  pagePart?: 'grid' | 'rules';
}> = ({
  interactiveAudio = true,
  className = '',
  copy = DEFAULT_VERB_SUMMARY_COPY,
  pagePart = 'grid',
}) => {
  const handleSpeak = (text: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(text, 0.85);
  };

  const pageBadge = pagePart === 'grid' ? '1/2' : '2/2';

  return (
    <div
      className={`verb-worksheet-page verb-summary-sheet printable-a4-page print:m-0 print:p-2.5 print:shadow-none w-full max-w-[1060px] mx-auto bg-white rounded-xl shadow-lg border-2 border-slate-300 p-2.5 sm:p-3 text-slate-900 flex flex-col justify-between font-korean-gothic select-none ${className}`}
      style={{ minHeight: '680px' }}
    >
      {/* 1. Sheet Header */}
      <div className="flex flex-nowrap items-center justify-between gap-x-2.5 border-b-2 border-purple-700 pb-1.5 mb-2 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-x-hidden overflow-y-visible py-0.5">
          <span className="text-base leading-none shrink-0">🥟</span>
          <h1
            className="text-[12px] sm:text-[13px] font-bold text-purple-950 tracking-normal whitespace-nowrap leading-normal"
            style={{ fontFamily: FONT_TITLE, fontWeight: 700, letterSpacing: '0' }}
          >
            {copy.sheetTitle}{' '}
            <span className="inline-block px-1.5 py-0.5 ml-1 rounded bg-purple-100 text-purple-900 text-[10px] font-bold align-middle">
              {pageBadge}
            </span>
          </h1>
        </div>
        <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-700 flex flex-nowrap items-center gap-x-2.5 whitespace-nowrap shrink-0 leading-normal">
          <span className="text-purple-700 font-bold whitespace-nowrap">{copy.totalBadge}</span>
          <span className="whitespace-nowrap">{copy.gradeLabel}: _____</span>
          <span className="whitespace-nowrap">{copy.nameLabel}: __________</span>
        </div>
      </div>

      {pagePart === 'grid' ? (
        /* PAGE 1: 통합 현재/과거 2블록 + 11~30 핵심 문형 20카드 (5열 × 4행) */
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-nowrap items-center justify-between gap-x-2 shrink-0 leading-normal">
            <div className="flex flex-nowrap items-center gap-1.5 text-[12px] sm:text-[12.5px] font-black text-slate-900 min-w-0">
              <span className="w-5 h-5 rounded-md bg-purple-700 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                1
              </span>
              <span className="whitespace-nowrap">{copy.sec1Title}</span>
              <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{copy.sec1Sub}</span>
            </div>
            <div className="flex flex-nowrap items-center gap-x-1.5 text-[9px] sm:text-[9.5px] font-bold text-slate-600 whitespace-nowrap shrink-0">
              <span className="text-amber-800">{copy.catLegend[0]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-purple-800">{copy.catLegend[1]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-sky-800">{copy.catLegend[2]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-emerald-800">{copy.catLegend[3]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-rose-800">{copy.catLegend[4]}</span>
            </div>
          </div>

          {/* Merged Row: [01~05] Present & [06~10] Past */}
          <div className="grid grid-cols-2 print:grid-cols-2 gap-2 shrink-0">
            <div
              onClick={() => handleSpeak('받아요, 먹어요, 공부해요')}
              className={`rounded-xl border-[1.5px] border-amber-300 bg-amber-50/45 px-3 py-2 flex items-center justify-between gap-2 shadow-2xs transition-all min-w-0 ${
                interactiveAudio ? 'cursor-pointer hover:border-amber-500 hover:bg-amber-50/75 active:scale-[0.99]' : ''
              }`}
              title={interactiveAudio ? '클릭하여 듣기: 받아요, 먹어요, 공부해요' : undefined}
            >
              <div className="min-w-0">
                <div className="text-[12px] font-black text-amber-950 leading-snug break-words">
                  {copy.mergedPresentTitle}
                </div>
                <div className="text-[10.5px] font-bold text-slate-700 leading-snug mt-0.5 break-words">
                  받다→받아요 · 먹다→먹어요 · 공부하다→공부해요 (★ 오다→와요 · 돕다→도와요)
                </div>
              </div>
              <span className="text-[10.5px] font-black text-amber-800 bg-white border border-amber-200 rounded-md px-2 py-0.5 shrink-0">
                01~05
              </span>
            </div>

            <div
              onClick={() => handleSpeak('앉았어요, 웃었어요, 시작했어요')}
              className={`rounded-xl border-[1.5px] border-purple-300 bg-purple-50/45 px-3 py-2 flex items-center justify-between gap-2 shadow-2xs transition-all min-w-0 ${
                interactiveAudio ? 'cursor-pointer hover:border-purple-500 hover:bg-purple-50/75 active:scale-[0.99]' : ''
              }`}
              title={interactiveAudio ? '클릭하여 듣기: 앉았어요, 웃었어요, 시작했어요' : undefined}
            >
              <div className="min-w-0">
                <div className="text-[12px] font-black text-purple-950 leading-snug break-words">
                  {copy.mergedPastTitle}
                </div>
                <div className="text-[10.5px] font-bold text-slate-700 leading-snug mt-0.5 break-words">
                  앉다→앉았어요 · 웃다→웃었어요 · 시작하다→시작했어요 (★ 모르다→몰랐어요)
                </div>
              </div>
              <span className="text-[10.5px] font-black text-purple-800 bg-white border border-purple-200 rounded-md px-2 py-0.5 shrink-0">
                06~10
              </span>
            </div>
          </div>

          {/* Cards 11~30: 5 cols × 4 rows (Zero Truncation, Spacious Cards) */}
          <div className="summary-verb-grid grid grid-cols-5 print:grid-cols-5 gap-2 flex-1">
            {VERB_DETAIL_CARDS.map((item, idx) => {
              const st = VERB_CAT_STYLE[item.cat];
              const meta = copy.cardMeta?.[idx];
              const displayTitle = meta?.title ?? item.title;
              const displayCatLabel = meta?.catLabel ?? item.catLabel;
              const displayFormula = meta?.formula ?? item.formula;
              return (
                <div
                  key={item.circled}
                  onClick={() => handleSpeak(item.audioWord)}
                  className={`rounded-xl border-[1.5px] ${st.border} bg-white flex flex-col justify-between overflow-hidden shadow-2xs transition-all min-w-0 ${
                    interactiveAudio ? `cursor-pointer ${st.hover} hover:shadow-sm active:scale-[0.98]` : ''
                  }`}
                  title={interactiveAudio ? `클릭하여 듣기: ${item.audioWord}` : undefined}
                >
                  <div className={`px-2 py-1 flex flex-nowrap items-center justify-between gap-x-1 ${st.topBg} shrink-0`}>
                    <span className={`text-[9.5px] font-black ${st.topText} leading-normal whitespace-nowrap min-w-0`}>
                      {item.circled} {displayTitle}
                    </span>
                    <span className="text-[8.5px] font-black text-slate-500 whitespace-nowrap shrink-0 leading-normal">
                      {item.isStar ? '★' : displayCatLabel}
                    </span>
                  </div>

                  <div className="px-2 py-2 flex-1 flex flex-col items-center justify-center text-center min-h-[38px]">
                    <span className={`text-[12px] sm:text-[12.5px] font-black leading-normal tracking-normal break-words w-full ${st.formulaText}`}>
                      {displayFormula}
                    </span>
                  </div>

                  <div className="px-2 py-1.5 bg-slate-50/95 border-t border-slate-200 text-center shrink-0">
                    <span className="text-[10px] font-bold text-slate-700 block leading-snug break-words">
                      {item.examplePair}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* PAGE 2: 대표적인 규칙 활용 3가지 & 한국어교육 기준 7대 불규칙 활용 (넉넉한 2단 레이아웃) */
        <div className="summary-verb-bottom grid grid-cols-[42fr_58fr] print:grid-cols-[42fr_58fr] gap-3 items-stretch flex-1">
          {/* Left: 대표적인 규칙 활용 3가지 */}
          <div className="rounded-xl border-[1.5px] border-purple-300 bg-[#FCF9FF] p-3 flex flex-col justify-between gap-2.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-black text-purple-950 shrink-0">
              <span className="w-5.5 h-5.5 rounded-md bg-purple-700 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                2
              </span>
              <span className="break-words">{copy.regularSecTitle}</span>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-2.5">
              {copy.regularRules.map((rule) => (
                <div
                  key={rule.title}
                  onClick={() => handleSpeak(rule.audio)}
                  className={`rounded-xl bg-white border border-purple-200 px-3 py-3 flex-1 flex flex-col justify-center gap-1.5 shadow-2xs min-w-0 ${
                    interactiveAudio ? 'cursor-pointer hover:bg-purple-50/60 hover:border-purple-400 transition-colors' : ''
                  }`}
                >
                  <div className="text-[12.5px] font-black text-purple-900 leading-snug break-words">
                    {rule.title}
                  </div>
                  <div className="text-[11px] font-bold text-slate-700 leading-relaxed break-words">
                    {rule.body}
                  </div>
                  <div className="text-[10px] font-bold text-purple-700 bg-purple-50/80 border border-purple-100 rounded-md px-2 py-1 leading-snug break-words">
                    🔊 {rule.audio}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 한국어교육(외국인 학습자) 기준 7대 불규칙 활용 */}
          <div className="rounded-xl border-[1.5px] border-amber-300 bg-[#FFFDF6] p-3 flex flex-col justify-between gap-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-black text-amber-950 shrink-0">
              <span className="w-5.5 h-5.5 rounded-md bg-amber-500 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                3
              </span>
              <span className="break-words">{copy.irregularSecTitle}</span>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-1.5">
              {copy.irregulars.map((ir) => (
                <div
                  key={ir.num}
                  onClick={() => handleSpeak(ir.audio)}
                  className={`rounded-lg bg-white border border-amber-200 px-3 py-2 flex flex-col justify-center gap-0.5 shadow-2xs min-w-0 ${
                    interactiveAudio ? 'cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-colors' : ''
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                    <span className="font-black text-purple-900 text-[11.5px] shrink-0">
                      {ir.num} {ir.name}
                    </span>
                    <span className="font-bold text-slate-800 text-[11px] leading-snug break-words min-w-0">
                      {ir.ex}
                    </span>
                  </div>
                  {ir.note && (
                    <div className="text-[9.5px] font-bold text-amber-800 leading-snug break-words">
                      {ir.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-amber-100/80 border border-dashed border-amber-400 px-3 py-2 text-[10px] font-bold text-amber-950 leading-relaxed break-words shrink-0">
              {copy.irregularRefNote}
            </div>
          </div>
        </div>
      )}

      {/* 4. Sheet Footer */}
      <div className="mt-2 pt-1.5 border-t border-purple-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[9.5px] text-slate-500 shrink-0">
        <span className="font-bold break-words">{copy.footerLeft}</span>
        <span className="font-bold text-slate-400 break-words">
          {copy.footerRight} ({pageBadge})
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// 2. [조사 결합] ㉛ 한국어 조사 결합 총정리표 (A4 가로 1장 요약 정리표 - 교사용 원판)
// ============================================================================
export interface ParticleCardMetaCopy {
  title: string;
  catLabel: string;
  particles?: string;
}

export interface ParticleSummaryCopy {
  sheetTitle: string;
  totalBadge: string;
  gradeLabel: string;
  nameLabel: string;
  sec1Title: string;
  sec1Sub: string;
  catLegend: [string, string, string, string, string];
  cardMeta?: ParticleCardMetaCopy[];
  sec2Title: string;
  sec2Hint: string;
  pairRoles?: string[];
  batchimOLabel?: string;
  batchimXLabel?: string;
  batchimXRLabel?: string;
  fixedListText: string;
  sec3Title: string;
  cautionLines: { label: string; body: string; audio: string }[];
  footerLeft: string;
  footerRight: string;
}

export const DEFAULT_PARTICLE_SUMMARY_COPY: ParticleSummaryCopy = {
  sheetTitle: '해볼한국어 [조사 결합] ㉛ 한국어 조사 결합 총정리표 | Korean Particles Master Chart',
  totalBadge: '총 30단원 (조사 22 · 문장 8)',
  gradeLabel: '학년',
  nameLabel: '이름',
  sec1Title: '30단원 조사 결합 한눈에 보기',
  sec1Sub: '클릭하면 대표 결합형 소리가 나와요',
  catLegend: ['격·서술', '장소·대상', '범위·선택', '보조·높임', '문장만들기'],
  sec2Title: '탐정 찬스! 받침 유무로 고르는 짝꿍 조사',
  sec2Hint: '★ ‘ㄹ’ 받침은 ‘로’',
  pairRoles: ['주제·대조', '주격', '목적격', '서술(이다)', '나열·동반', '방향·수단', '선택 · 부름'],
  batchimOLabel: 'O',
  batchimXLabel: 'X',
  batchimXRLabel: 'X/ㄹ',
  fixedListText: '받침 관계없이 고정: 에 · 에서 · 도 · 만 · 보다 · 처럼 · 께',
  sec3Title: '헷갈리기 쉬운 변신·주의 조사 4가지',
  cautionLines: [
    {
      label: '주격·소유 변신 ★:',
      body: '나→내가/내 · 너→네가/네 · 저→제가/제 · 누구→누가 · 이것→이게',
      audio: '내가, 네가, 제가, 누가, 이게',
    },
    {
      label: '에 vs 에서:',
      body: '위치·도착은 에(집에 있어요) / 동작 장소는 에서(교실에서 공부해요)',
      audio: '학교에 가요, 교실에서 공부해요',
    },
    {
      label: '밖에 ★ & 높임:',
      body: '-밖에 뒤엔 꼭 부정(없다/못하다/-지 않다) · 어른 높임은 께서(주어)·께(대상)',
      audio: '하나밖에 없어요, 할머니께서 주셨어요',
    },
  ],
  footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
  footerRight: '카드를 누르면 조사 결합 예시 소리가 재생됩니다 · ★ 변신·예외 주의 단원',
};

type ParticleSummaryCat = 'case' | 'place' | 'range' | 'limit' | 'sentence';

interface ParticleSummaryCardItem {
  circled: string;
  title: string;
  cat: ParticleSummaryCat;
  catLabel: string;
  particles: string;
  example: string;
  audioWord: string;
  isStar?: boolean;
}

const PARTICLE_SUMMARY_CARDS: ParticleSummaryCardItem[] = [
  { circled: '①', title: '주제·대조', cat: 'case', catLabel: '받침O/X', particles: '은 / 는', example: '동생은 · 나는', audioWord: '동생은, 나는' },
  { circled: '②', title: '서술(이다)', cat: 'case', catLabel: '받침O/X', particles: '이에요 / 예요', example: '학생이에요 · 의자예요', audioWord: '학생이에요, 의자예요' },
  { circled: '④', title: '주격', cat: 'case', catLabel: '받침O/X', particles: '이 / 가', example: '책이 · 비누가', audioWord: '책이, 비누가' },
  { circled: '⑤', title: '주격 변신 ★', cat: 'case', catLabel: '변신★', particles: '내가 · 네가 · 제가 · 누가 · 이게', example: '나→내가 · 저→제가', audioWord: '내가, 네가, 제가, 누가, 이게', isStar: true },
  { circled: '⑥', title: '목적격', cat: 'case', catLabel: '받침O/X', particles: '을 / 를', example: '밥을 · 우유를', audioWord: '밥을, 우유를' },
  { circled: '⑧', title: '장소·시간', cat: 'place', catLabel: '고정', particles: '에', example: '집에 · 아침에', audioWord: '집에, 아침에' },
  { circled: '⑨', title: '동작 장소', cat: 'place', catLabel: '고정', particles: '에서', example: '교실에서 · 도서관에서', audioWord: '교실에서, 도서관에서' },
  { circled: '⑩', title: '추가·포함', cat: 'place', catLabel: '고정', particles: '도', example: '저희도 · 물도', audioWord: '저희도, 물도' },
  { circled: '⑫', title: '나열·동반', cat: 'place', catLabel: '받침O/X', particles: '과·와 / 하고 / 이랑·랑', example: '책과 · 엄마와 · 친구랑', audioWord: '책과, 친구랑' },
  { circled: '⑬', title: '방향·수단', cat: 'place', catLabel: '★ㄹ예외', particles: '으로 / 로', example: '연필로 · 버스로 · 집으로', audioWord: '연필로, 집으로', isStar: true },
  { circled: '⑭', title: '행동 대상', cat: 'place', catLabel: '고정', particles: '에게 / 한테', example: '친구에게 · 동생한테', audioWord: '친구에게, 동생한테' },
  { circled: '⑯', title: '시작과 끝', cat: 'range', catLabel: '고정', particles: '부터 ~ 까지', example: '아침부터 저녁까지', audioWord: '아침부터 저녁까지' },
  { circled: '⑰', title: '선택', cat: 'range', catLabel: '받침O/X', particles: '이나 / 나', example: '빵이나 · 사과나', audioWord: '빵이나, 사과나' },
  { circled: '⑱', title: '반복·분배', cat: 'range', catLabel: '접미-씩', particles: '마다 (-씩)', example: '날마다 · 하나씩', audioWord: '날마다, 하나씩' },
  { circled: '⑳', title: '한정', cat: 'limit', catLabel: '고정', particles: '만', example: '물만 · 하나만', audioWord: '물만, 하나만' },
  { circled: '㉑', title: '부정 한정 ★', cat: 'limit', catLabel: '부정★', particles: '밖에 (+없다/못하다/-지 않다)', example: '하나밖에 없어요', audioWord: '하나밖에 없어요', isStar: true },
  { circled: '㉒', title: '비교', cat: 'limit', catLabel: '고정', particles: '보다', example: '어제보다 · 형보다', audioWord: '어제보다, 형보다' },
  { circled: '㉔', title: '비유', cat: 'limit', catLabel: '고정', particles: '처럼 / 같이', example: '토끼처럼 · 별같이', audioWord: '토끼처럼, 별같이' },
  { circled: '㉕', title: '소유 ★', cat: 'limit', catLabel: '변신★', particles: '의 (내·네·제)', example: '친구의 · 내 · 제', audioWord: '친구의, 내, 제', isStar: true },
  { circled: '㉖', title: '무리·함께', cat: 'limit', catLabel: '고정', particles: '끼리', example: '친구끼리 · 우리끼리', audioWord: '친구끼리, 우리끼리' },
  { circled: '㉘', title: '높임', cat: 'limit', catLabel: '높임', particles: '께서 / 께', example: '할머니께서 · 선생님께', audioWord: '할머니께서, 선생님께' },
  { circled: '㉙', title: '부름', cat: 'limit', catLabel: '받침O/X', particles: '아 / 야', example: '수진아 · 민수야', audioWord: '수진아, 민수야' },
  { circled: '③⑦⑪⑮', title: '문장 만들기 1~4', cat: 'sentence', catLabel: '기초문장', particles: '주어 + 장소/수단 + 동사', example: '나도 학교에 가요', audioWord: '나도 학교에 가요' },
  { circled: '⑲㉓㉗㉚', title: '문장 만들기 5~8', cat: 'sentence', catLabel: '확장문장', particles: '범위·비교·소유·높임', example: '할머니께서 선물을 주셨어요', audioWord: '할머니께서 선물을 주셨어요' },
];

const PARTICLE_CAT_STYLE: Record<
  ParticleSummaryCat,
  { border: string; topBg: string; topText: string; mainText: string; hover: string }
> = {
  case: {
    border: 'border-emerald-300',
    topBg: 'bg-emerald-50 border-b border-emerald-200',
    topText: 'text-emerald-900',
    mainText: 'text-emerald-950',
    hover: 'hover:border-emerald-500 hover:bg-emerald-50/30',
  },
  place: {
    border: 'border-teal-300',
    topBg: 'bg-teal-50 border-b border-teal-200',
    topText: 'text-teal-900',
    mainText: 'text-teal-950',
    hover: 'hover:border-teal-500 hover:bg-teal-50/30',
  },
  range: {
    border: 'border-sky-300',
    topBg: 'bg-sky-50 border-b border-sky-200',
    topText: 'text-sky-900',
    mainText: 'text-sky-950',
    hover: 'hover:border-sky-500 hover:bg-sky-50/30',
  },
  limit: {
    border: 'border-amber-300',
    topBg: 'bg-amber-50 border-b border-amber-200',
    topText: 'text-amber-900',
    mainText: 'text-amber-950',
    hover: 'hover:border-amber-500 hover:bg-amber-50/30',
  },
  sentence: {
    border: 'border-indigo-300',
    topBg: 'bg-indigo-50 border-b border-indigo-200',
    topText: 'text-indigo-900',
    mainText: 'text-indigo-950',
    hover: 'hover:border-indigo-500 hover:bg-indigo-50/30',
  },
};

export const ParticleSummaryWorksheetPage: React.FC<{
  interactiveAudio?: boolean;
  className?: string;
  copy?: ParticleSummaryCopy;
  pagePart?: 'grid' | 'rules';
}> = ({
  interactiveAudio = true,
  className = '',
  copy = DEFAULT_PARTICLE_SUMMARY_COPY,
  pagePart = 'grid',
}) => {
  const handleSpeak = (text: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(text, 0.85);
  };

  const pairRoles = copy.pairRoles || DEFAULT_PARTICLE_SUMMARY_COPY.pairRoles!;
  const oLbl = copy.batchimOLabel ?? 'O';
  const xLbl = copy.batchimXLabel ?? 'X';
  const xrLbl = copy.batchimXRLabel ?? 'X/ㄹ';

  const batchimPairs = [
    { role: pairRoles[0] || '주제·대조', oForm: '은', xLabel: xLbl, xForm: '는', audio: '동생은, 나는' },
    { role: pairRoles[1] || '주격', oForm: '이', xLabel: xLbl, xForm: '가', audio: '책이, 비누가' },
    { role: pairRoles[2] || '목적격', oForm: '을', xLabel: xLbl, xForm: '를', audio: '밥을, 우유를' },
    { role: pairRoles[3] || '서술(이다)', oForm: '이에요', xLabel: xLbl, xForm: '예요', audio: '학생이에요, 의자예요' },
    { role: pairRoles[4] || '나열·동반', oForm: '과 · 이랑', xLabel: xLbl, xForm: '와 · 랑', audio: '책과, 엄마와' },
    { role: pairRoles[5] || '방향·수단', oForm: '으로', xLabel: xrLbl, xForm: '로', audio: '집으로, 버스로' },
    { role: pairRoles[6] || '선택 · 부름', oForm: '이나 · 아', xLabel: xLbl, xForm: '나 · 야', audio: '빵이나, 수진아' },
  ];

  const pageBadge = pagePart === 'grid' ? '1/2' : '2/2';

  return (
    <div
      className={`verb-worksheet-page particle-summary-sheet printable-a4-page print:m-0 print:p-2.5 print:shadow-none w-full max-w-[1060px] mx-auto bg-white rounded-xl shadow-lg border-2 border-slate-300 p-2.5 sm:p-3 text-slate-900 flex flex-col justify-between font-korean-gothic select-none ${className}`}
      style={{ minHeight: '680px' }}
    >
      {/* 1. Sheet Header */}
      <div className="flex flex-nowrap items-center justify-between gap-x-2.5 border-b-2 border-emerald-600 pb-1.5 mb-2 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-x-hidden overflow-y-visible py-0.5">
          <span className="text-base leading-none shrink-0">🥟</span>
          <h1
            className="text-[12px] sm:text-[13px] font-bold text-emerald-950 tracking-normal whitespace-nowrap leading-normal"
            style={{ fontFamily: FONT_TITLE, fontWeight: 700, letterSpacing: '0' }}
          >
            {copy.sheetTitle}{' '}
            <span className="inline-block px-1.5 py-0.5 ml-1 rounded bg-emerald-100 text-emerald-900 text-[10px] font-bold align-middle">
              {pageBadge}
            </span>
          </h1>
        </div>
        <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-700 flex flex-nowrap items-center gap-x-2.5 whitespace-nowrap shrink-0 leading-normal">
          <span className="text-emerald-700 font-bold whitespace-nowrap">{copy.totalBadge}</span>
          <span className="whitespace-nowrap">{copy.gradeLabel}: _____</span>
          <span className="whitespace-nowrap">{copy.nameLabel}: __________</span>
        </div>
      </div>

      {pagePart === 'grid' ? (
        /* PAGE 1: 24종 조사 + 문장 만들기 카드 그리드 (4열 × 6행 — 넓은 카드폭으로 말줄임 0%) */
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-nowrap items-center justify-between gap-x-2 shrink-0 leading-normal">
            <div className="flex flex-nowrap items-center gap-1.5 text-[12px] sm:text-[12.5px] font-black text-slate-900 min-w-0">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                1
              </span>
              <span className="whitespace-nowrap">{copy.sec1Title}</span>
              <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{copy.sec1Sub}</span>
            </div>
            <div className="flex flex-nowrap items-center gap-x-1.5 text-[9px] sm:text-[9.5px] font-bold text-slate-600 whitespace-nowrap shrink-0">
              <span className="text-emerald-800">{copy.catLegend[0]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-teal-800">{copy.catLegend[1]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-sky-800">{copy.catLegend[2]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-amber-800">{copy.catLegend[3]}</span>
              <span className="text-slate-300">·</span>
              <span className="text-indigo-800">{copy.catLegend[4]}</span>
            </div>
          </div>

          <div className="summary-particle-grid grid grid-cols-4 print:grid-cols-4 gap-2 flex-1">
            {PARTICLE_SUMMARY_CARDS.map((item, idx) => {
              const st = PARTICLE_CAT_STYLE[item.cat];
              const meta = copy.cardMeta?.[idx];
              const displayTitle = meta?.title ?? item.title;
              const displayCatLabel = meta?.catLabel ?? item.catLabel;
              const displayParticles = meta?.particles ?? item.particles;
              return (
                <div
                  key={item.circled}
                  onClick={() => handleSpeak(item.audioWord)}
                  className={`rounded-xl border-[1.5px] ${st.border} bg-white flex flex-col justify-between overflow-hidden shadow-2xs transition-all min-w-0 ${
                    interactiveAudio ? `cursor-pointer ${st.hover} hover:shadow-sm active:scale-[0.98]` : ''
                  }`}
                  title={interactiveAudio ? `클릭하여 듣기: ${item.audioWord}` : undefined}
                >
                  <div className={`px-2 py-1 flex flex-nowrap items-center justify-between gap-x-1 ${st.topBg} shrink-0`}>
                    <span className={`text-[9.5px] font-black ${st.topText} leading-normal whitespace-nowrap min-w-0`}>
                      {item.circled} {displayTitle}
                    </span>
                    <span className="text-[8.5px] font-black text-slate-500 whitespace-nowrap shrink-0 leading-normal">
                      {item.isStar ? '★' : displayCatLabel}
                    </span>
                  </div>

                  <div className="px-2 py-1.5 flex-1 flex items-center justify-center text-center min-h-[34px]">
                    <span
                      className={`font-black leading-normal tracking-normal break-words w-full ${
                        displayParticles.length >= 20
                          ? 'text-[10.5px]'
                          : displayParticles.length >= 14
                            ? 'text-[11.5px]'
                            : 'text-[13px]'
                      } ${st.mainText}`}
                    >
                      {displayParticles}
                    </span>
                  </div>

                  <div className="px-2 py-1 bg-slate-50/95 border-t border-slate-200 text-center shrink-0">
                    <span className="text-[10px] font-bold text-slate-700 block leading-snug break-words">
                      {item.example}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* PAGE 2: 받침 O/X 짝꿍 조사 표 & 변신·주의 4대 핵심 정리 */
        <div className="summary-particle-bottom grid grid-cols-[50fr_50fr] print:grid-cols-[50fr_50fr] gap-3 items-stretch flex-1">
          {/* Left: 받침 유무 짝꿍 조사 표 (1열 7행 — 넓은 폭으로 말줄임 0%) */}
          <div className="rounded-xl border-[1.5px] border-emerald-300 bg-[#F4FDF9] p-3 flex flex-col justify-between gap-2 min-w-0">
            <div className="flex flex-nowrap items-center justify-between gap-x-2 shrink-0 leading-normal">
              <div className="flex items-center gap-2 text-[12px] font-black text-emerald-950 min-w-0">
                <span className="w-5.5 h-5.5 rounded-md bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span className="whitespace-nowrap">{copy.sec2Title}</span>
              </div>
              <span className="text-[9.5px] font-black text-emerald-800 bg-white border border-emerald-200 rounded-md px-2 py-0.5 whitespace-nowrap shrink-0">
                {copy.sec2Hint}
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-1.5">
              {batchimPairs.map((pair, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSpeak(pair.audio)}
                  className={`rounded-lg bg-white border border-emerald-200 px-3 py-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 shadow-2xs min-w-0 ${
                    interactiveAudio ? 'cursor-pointer hover:bg-emerald-50/70 hover:border-emerald-400 transition-colors' : ''
                  }`}
                >
                  <span className="text-[11.5px] font-black text-emerald-950 break-words">
                    {pair.role}
                  </span>
                  <span className="text-[11.5px] font-bold text-slate-800 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                      <b className="text-amber-800">{oLbl}</b>
                      <span className="font-black text-slate-900">{pair.oForm}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-rose-50 border border-rose-200 rounded px-1.5 py-0.5">
                      <b className="text-rose-700">{pair.xLabel}</b>
                      <span className="font-black text-slate-900">{pair.xForm}</span>
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-emerald-100/85 border border-dashed border-emerald-400 px-3 py-2 text-center text-[11px] leading-snug font-black text-emerald-950 break-words shrink-0">
              {copy.fixedListText}
            </div>
          </div>

          {/* Right: 변신·주의 4대 포인트 */}
          <div className="rounded-xl border-[1.5px] border-amber-300 bg-[#FFFDF6] p-3 flex flex-col justify-between gap-2.5 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-black text-amber-950 shrink-0">
              <span className="w-5.5 h-5.5 rounded-md bg-amber-500 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                ★
              </span>
              <span className="break-words">{copy.sec3Title}</span>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-2.5">
              {copy.cautionLines.map((line) => (
                <div
                  key={line.label}
                  onClick={() => handleSpeak(line.audio)}
                  className={`rounded-xl bg-white border border-amber-200 px-3.5 py-3 flex-1 flex flex-col justify-center gap-1.5 shadow-2xs min-w-0 ${
                    interactiveAudio ? 'cursor-pointer hover:bg-amber-50 hover:border-amber-400 transition-colors' : ''
                  }`}
                >
                  <div className="text-[12px] font-black text-amber-900 leading-snug break-words">
                    {line.label}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-800 leading-relaxed break-words">
                    {line.body}
                  </div>
                  <div className="text-[10px] font-bold text-amber-800 bg-amber-50/80 border border-amber-100 rounded-md px-2 py-1 leading-snug break-words">
                    🔊 {line.audio}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Sheet Footer */}
      <div className="mt-2 pt-1.5 border-t border-emerald-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[9.5px] text-slate-500 shrink-0">
        <span className="font-bold break-words">{copy.footerLeft}</span>
        <span className="font-bold text-slate-400 break-words">
          {copy.footerRight} ({pageBadge})
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// 3. [교실 한국어] 단원 어휘 총정리표 (6쪽: 쪽당 5단원 · 50어휘, 2줄 적층형 말줄임 0%)
// ============================================================================
export const CLASSROOM_SUMMARY_PAGES = [
  {
    pageIndex: 0,
    startCh: 1,
    endCh: 5,
    title: '1쪽 ①~⑤ 단원 어휘 총정리 (1~50번)',
    shortTitle: '①~⑤ 단원 총정리',
    badge: '1~5단원',
    rangeText: '1~50',
  },
  {
    pageIndex: 1,
    startCh: 6,
    endCh: 10,
    title: '2쪽 ⑥~⑩ 단원 어휘 총정리 (51~100번)',
    shortTitle: '⑥~⑩ 단원 총정리',
    badge: '6~10단원',
    rangeText: '51~100',
  },
  {
    pageIndex: 2,
    startCh: 11,
    endCh: 15,
    title: '3쪽 ⑪~⑮ 단원 어휘 총정리 (101~150번)',
    shortTitle: '⑪~⑮ 단원 총정리',
    badge: '11~15단원',
    rangeText: '101~150',
  },
  {
    pageIndex: 3,
    startCh: 16,
    endCh: 20,
    title: '4쪽 ⑯~⑳ 단원 어휘 총정리 (151~200번)',
    shortTitle: '⑯~⑳ 단원 총정리',
    badge: '16~20단원',
    rangeText: '151~200',
  },
  {
    pageIndex: 4,
    startCh: 21,
    endCh: 25,
    title: '5쪽 ㉑~㉕ 단원 어휘 총정리 (201~250번)',
    shortTitle: '㉑~㉕ 단원 총정리',
    badge: '21~25단원',
    rangeText: '201~250',
  },
  {
    pageIndex: 5,
    startCh: 26,
    endCh: 30,
    title: '6쪽 ㉖~㉚ 단원 어휘 총정리 (251~300번)',
    shortTitle: '㉖~㉚ 단원 총정리',
    badge: '26~30단원',
    rangeText: '251~300',
  },
] as const;

type ClassroomUiLang = 'ko' | SupportedLanguage;

interface ClassroomSummaryUiCopy {
  headerPrefix: string;
  unitRangeFmt: (s: number, e: number) => string;
  wordsCountText: string;
  gradeLabel: string;
  nameLabel: string;
  footerLeft: string;
  footerRight: (pageNum: number, totalPages: number) => string;
}

const CLASSROOM_SUMMARY_UI_COPY: Record<ClassroomUiLang, ClassroomSummaryUiCopy> = {
  ko: {
    headerPrefix: '해볼한국어 [교실 한국어]',
    unitRangeFmt: (s, e) => `${s}~${e}단원`,
    wordsCountText: '50단어',
    gradeLabel: '학년',
    nameLabel: '이름',
    footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
    footerRight: (p, t) => `단어를 누르면 한국어 발음이 재생됩니다 · 30단원 300어휘 총정리 (${p}/${t}쪽)`,
  },
  en: {
    headerPrefix: 'Haebol Korean [Classroom 300]',
    unitRangeFmt: (s, e) => `Units ${s}–${e}`,
    wordsCountText: '50 Words',
    gradeLabel: 'Grade',
    nameLabel: 'Name',
    footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
    footerRight: (p, t) => `Tap any word for Korean audio · 30 Units 300 Words (${p}/${t})`,
  },
  vi: {
    headerPrefix: 'Haebol Korean [Tiếng Hàn Lớp Học]',
    unitRangeFmt: (s, e) => `Bài ${s}–${e}`,
    wordsCountText: '50 từ',
    gradeLabel: 'Lớp',
    nameLabel: 'Tên',
    footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
    footerRight: (p, t) => `Chạm từ để nghe phát âm · Tổng hợp 300 từ vựng (${p}/${t})`,
  },
  bn: {
    headerPrefix: 'হেবল কোরিয়ান [শ্রেণিকক্ষ ৩০০]',
    unitRangeFmt: (s, e) => `অধ্যায় ${s}–${e}`,
    wordsCountText: '৫০ শব্দ',
    gradeLabel: 'শ্রেণি',
    nameLabel: 'নাম',
    footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
    footerRight: (p, t) => `উচ্চারণ শুনতে শব্দে ট্যাপ করুন · ৩০০ শব্দ চার্ট (${p}/${t})`,
  },
  zh: {
    headerPrefix: 'Haebol 韩语 [教室韩语 300词]',
    unitRangeFmt: (s, e) => `第${s}~${e}单元`,
    wordsCountText: '50词',
    gradeLabel: '年级',
    nameLabel: '姓名',
    footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
    footerRight: (p, t) => `点击单词可听韩语发音 · 30单元300词总整理 (${p}/${t}页)`,
  },
  ru: {
    headerPrefix: 'Haebol Корейский [Класс 300]',
    unitRangeFmt: (s, e) => `Темы ${s}–${e}`,
    wordsCountText: '50 слов',
    gradeLabel: 'Класс',
    nameLabel: 'Имя',
    footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
    footerRight: (p, t) => `Нажмите на слово для звука · 30 тем 300 слов (${p}/${t})`,
  },
  ja: {
    headerPrefix: 'Haebol 韓国語 [教室韓国語 300]',
    unitRangeFmt: (s, e) => `${s}~${e}課`,
    wordsCountText: '50語',
    gradeLabel: '学年',
    nameLabel: '名前',
    footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
    footerRight: (p, t) => `単語をタップして発音再生 · 全30課300語まとめ (${p}/${t})`,
  },
  mn: {
    headerPrefix: 'Haebol Солонгос хэл [Ангийн 300]',
    unitRangeFmt: (s, e) => `${s}–${e} хичээл`,
    wordsCountText: '50 үг',
    gradeLabel: 'Анги',
    nameLabel: 'Нэр',
    footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
    footerRight: (p, t) => `Үг дээр дарж сонсоно уу · 30 хичээл 300 үг (${p}/${t})`,
  },
};

const CIRCLED_CH_NUMS = [
  '', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩',
  '⑪', '⑫', '⑬', '⑭', '⑮', '⑯', '⑰', '⑱', '⑲', '⑳',
  '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘', '㉙', '㉚',
];

export const ClassroomSummaryWorksheetPage: React.FC<{
  vocabulary: VocabularyItem[];
  pageIndex: number;
  selectedLang: SupportedLanguage;
  uiLang?: ClassroomUiLang;
  interactiveAudio?: boolean;
  className?: string;
}> = ({
  vocabulary,
  pageIndex,
  selectedLang,
  uiLang,
  interactiveAudio = true,
  className = '',
}) => {
  const pageMeta = CLASSROOM_SUMMARY_PAGES[pageIndex] || CLASSROOM_SUMMARY_PAGES[0];
  const totalPages = CLASSROOM_SUMMARY_PAGES.length;
  const resolvedUiLang: ClassroomUiLang = uiLang ?? selectedLang;
  const uiCopy = CLASSROOM_SUMMARY_UI_COPY[resolvedUiLang] || CLASSROOM_SUMMARY_UI_COPY.ko;

  const chapterNums = Array.from(
    { length: pageMeta.endCh - pageMeta.startCh + 1 },
    (_, i) => pageMeta.startCh + i
  );

  const handleWordClick = (koText: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(koText, 0.85);
  };

  const unitRangeLabel = uiCopy.unitRangeFmt(pageMeta.startCh, pageMeta.endCh);

  return (
    <div
      className={`print-sheet printable-word-sheet classroom-summary-sheet w-full max-w-[1060px] bg-white rounded-xl border-2 border-slate-300 p-2.5 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg font-korean-gothic select-none ${className}`}
      style={{ minHeight: '690px' }}
    >
      {/* 1. Sheet Header */}
      <div className="flex flex-nowrap items-center justify-between gap-x-2.5 border-b-2 border-rose-500 pb-1.5 mb-2 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-x-hidden overflow-y-visible py-0.5">
          <span className="text-base leading-none shrink-0">🥟</span>
          <span
            className="text-[12px] sm:text-[13px] font-bold text-rose-950 tracking-normal whitespace-nowrap leading-normal"
            style={{ fontFamily: FONT_TITLE, fontWeight: 700, letterSpacing: '0' }}
          >
            {uiCopy.headerPrefix} {unitRangeLabel} (#{pageMeta.rangeText}){' '}
            <span className="inline-block px-1.5 py-0.5 ml-1 rounded bg-rose-100 text-rose-900 text-[10px] font-bold align-middle">
              {pageIndex + 1}/{totalPages}
            </span>
          </span>
        </div>
        <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-700 flex flex-nowrap items-center gap-x-2.5 whitespace-nowrap shrink-0 leading-normal">
          <span className="text-rose-700 font-bold whitespace-nowrap">
            {unitRangeLabel} ({uiCopy.wordsCountText})
          </span>
          <span className="whitespace-nowrap">{uiCopy.gradeLabel}: _____</span>
          <span className="whitespace-nowrap">{uiCopy.nameLabel}: __________</span>
        </div>
      </div>

      {/* 2. Main Body: 5열 × 1행 = 5개 단원 세로 카드 (단어 + 번역 2줄 적층, 말줄임 0%) */}
      <div className="summary-classroom-grid grid grid-cols-5 print:grid-cols-5 gap-2 flex-1 items-stretch">
        {chapterNums.map((chNum, cIdx) => {
          const words = vocabulary.filter((v) => v.ch === chNum).slice(0, 10);
          const themeInfo = CHAPTER_THEME_TRANSLATIONS[chNum];
          const chIcon = words[0]?.icon || '📘';
          const isAltCol = cIdx % 2 === 1;
          const themeTrans = themeInfo?.trans?.[selectedLang] || themeInfo?.trans?.en || '';

          return (
            <div
              key={chNum}
              className={`rounded-xl border-[1.5px] ${
                isAltCol ? 'border-pink-300' : 'border-rose-300'
              } bg-white flex flex-col justify-between overflow-hidden shadow-2xs min-w-0`}
            >
              {/* Chapter Card Top Header (Stacked 2-line, Zero Truncation) */}
              <div
                className={`px-2 py-1.5 flex flex-col gap-0.5 border-b shrink-0 ${
                  isAltCol
                    ? 'bg-pink-50 border-pink-200 text-rose-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-1 min-w-0">
                  <span className="text-xs leading-none shrink-0">{chIcon}</span>
                  <span className="text-[11.5px] font-black leading-tight break-words">
                    {CIRCLED_CH_NUMS[chNum]} {themeInfo?.ko || `${chNum}단원`}
                  </span>
                </div>
                {themeTrans && (
                  <div className="text-[9.5px] font-bold text-rose-700 leading-[1.35] break-words pl-4">
                    {themeTrans}
                  </div>
                )}
              </div>

              {/* 10 Words List (Each word gets spacious 2-line vertical cell, Zero Truncation) */}
              <div className="flex-1 px-1.5 py-1 flex flex-col justify-between divide-y divide-slate-100">
                {words.map((word, wIdx) => {
                  const transText = (word as any)[selectedLang] || word.en || '';
                  return (
                    <div
                      key={`${chNum}-${word.ko}-${wIdx}`}
                      onClick={() => handleWordClick(word.ko)}
                      className={`py-1 px-1 rounded flex flex-col justify-center gap-0.5 transition-colors min-w-0 flex-1 ${
                        interactiveAudio ? 'cursor-pointer hover:bg-rose-50/80 active:scale-[0.99]' : ''
                      }`}
                      title={interactiveAudio ? `클릭하여 듣기: ${word.ko}` : undefined}
                    >
                      <div className="flex items-baseline gap-1 min-w-0">
                        <span className="text-[9px] font-black text-rose-400 tabular-nums shrink-0 w-3.5 text-right">
                          {wIdx + 1}
                        </span>
                        <span
                          className={`font-black text-slate-950 leading-tight break-words min-w-0 ${
                            word.ko.length >= 10 ? 'text-[11px]' : 'text-[12px]'
                          }`}
                        >
                          {word.ko}
                        </span>
                      </div>
                      <div className="pl-4.5 text-[9.5px] font-semibold text-slate-600 leading-[1.35] break-words">
                        {transText}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Sheet Footer */}
      <div className="mt-2 pt-1.5 border-t border-rose-200 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[9px] sm:text-[9.5px] text-slate-500 shrink-0">
        <span className="font-bold break-words">{uiCopy.footerLeft}</span>
        <span className="font-bold text-slate-400 break-words">
          {uiCopy.footerRight(pageIndex + 1, totalPages)}
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// 4. [한·영 전용 기존 압축판 8장] 용언 1장 · 조사 1장 · 교실한국어 3장 (5×2)
// ============================================================================
export const VerbSummaryCompactWorksheetPage: React.FC<{
  interactiveAudio?: boolean;
  className?: string;
  copy?: VerbSummaryCopy;
}> = ({
  interactiveAudio = true,
  className = '',
  copy = DEFAULT_VERB_SUMMARY_COPY,
}) => {
  const handleSpeak = (text: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(text, 0.85);
  };

  return (
    <div
      className={`verb-worksheet-page verb-summary-sheet verb-summary-compact-sheet printable-a4-page print:m-0 print:p-2 print:shadow-none w-full max-w-[990px] mx-auto bg-white rounded-xl shadow-lg border-2 border-slate-300 p-2 sm:p-2.5 text-slate-900 flex flex-col justify-between font-korean-gothic select-none ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* Header */}
      <div className="flex flex-nowrap items-center justify-between gap-2 border-b-2 border-purple-700 pb-1 mb-1.5 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
          <span className="text-sm leading-none shrink-0">🥟</span>
          <h1
            className="text-xs sm:text-[13px] font-bold text-purple-950 tracking-tight whitespace-nowrap"
            style={{ fontFamily: FONT_TITLE, fontWeight: 700 }}
          >
            {copy.sheetTitle}
          </h1>
        </div>
        <div className="text-[10px] font-bold text-slate-700 flex flex-nowrap items-center gap-2.5 whitespace-nowrap shrink-0">
          <span className="text-purple-700 font-bold">{copy.totalBadge}</span>
          <span>{copy.gradeLabel}: _____</span>
          <span>{copy.nameLabel}: __________</span>
        </div>
      </div>

      {/* Section 1: Merged Present/Past + 5×4 Compact Grid */}
      <div className="flex flex-col gap-1 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-900 min-w-0">
            <span className="w-4 h-4 rounded bg-purple-700 text-white text-[9.5px] font-black flex items-center justify-center shrink-0">
              1
            </span>
            <span className="truncate">{copy.sec1Title}</span>
            <span className="text-[9px] font-bold text-slate-400 truncate">{copy.sec1Sub}</span>
          </div>
          <div className="flex items-center gap-1 text-[8.5px] font-bold text-slate-600 shrink-0">
            <span className="text-amber-800">{copy.catLegend[0]}</span>·
            <span className="text-purple-800">{copy.catLegend[1]}</span>·
            <span className="text-sky-800">{copy.catLegend[2]}</span>·
            <span className="text-emerald-800">{copy.catLegend[3]}</span>·
            <span className="text-rose-800">{copy.catLegend[4]}</span>
          </div>
        </div>

        {/* Present & Past Merged */}
        <div className="grid grid-cols-2 gap-1.5">
          <div
            onClick={() => handleSpeak('받아요, 먹어요, 공부해요')}
            className={`rounded-lg border border-amber-300 bg-amber-50/50 px-2 py-1 flex items-center justify-between gap-1.5 ${
              interactiveAudio ? 'cursor-pointer hover:border-amber-500' : ''
            }`}
          >
            <div className="min-w-0">
              <div className="text-[10px] font-black text-amber-950 truncate">{copy.mergedPresentTitle}</div>
              <div className="text-[8.5px] font-bold text-slate-700 truncate">
                받다→받아요 · 먹다→먹어요 · 공부하다→공부해요 (★ 오다→와요 · 돕다→도와요)
              </div>
            </div>
            <span className="text-[8.5px] font-black text-amber-800 bg-white border border-amber-200 rounded px-1.5 py-0.5 shrink-0">
              01~05
            </span>
          </div>
          <div
            onClick={() => handleSpeak('앉았어요, 웃었어요, 시작했어요')}
            className={`rounded-lg border border-purple-300 bg-purple-50/50 px-2 py-1 flex items-center justify-between gap-1.5 ${
              interactiveAudio ? 'cursor-pointer hover:border-purple-500' : ''
            }`}
          >
            <div className="min-w-0">
              <div className="text-[10px] font-black text-purple-950 truncate">{copy.mergedPastTitle}</div>
              <div className="text-[8.5px] font-bold text-slate-700 truncate">
                앉다→앉았어요 · 웃다→웃었어요 · 시작하다→시작했어요 (★ 모르다→몰랐어요)
              </div>
            </div>
            <span className="text-[8.5px] font-black text-purple-800 bg-white border border-purple-200 rounded px-1.5 py-0.5 shrink-0">
              06~10
            </span>
          </div>
        </div>

        {/* 5x4 Compact Cards */}
        <div className="summary-verb-grid grid grid-cols-5 print:grid-cols-5 gap-1">
          {VERB_DETAIL_CARDS.map((item, idx) => {
            const st = VERB_CAT_STYLE[item.cat];
            const meta = copy.cardMeta?.[idx];
            const displayTitle = meta?.title ?? item.title;
            const displayCatLabel = meta?.catLabel ?? item.catLabel;
            const displayFormula = meta?.formula ?? item.formula;
            return (
              <div
                key={item.circled}
                onClick={() => handleSpeak(item.audioWord)}
                className={`rounded-lg border ${st.border} bg-white flex flex-col justify-between overflow-hidden min-w-0 ${
                  interactiveAudio ? `cursor-pointer ${st.hover}` : ''
                }`}
              >
                <div className={`px-1.5 py-0.5 flex items-center justify-between gap-1 ${st.topBg}`}>
                  <span className={`text-[8.5px] font-black ${st.topText} truncate`}>
                    {item.circled} {displayTitle}
                  </span>
                  <span className="text-[7.5px] font-black text-slate-500 shrink-0">
                    {item.isStar ? '★' : displayCatLabel}
                  </span>
                </div>
                <div className="px-1 py-1 text-center">
                  <span className={`text-[10px] font-black leading-tight truncate block ${st.formulaText}`}>
                    {displayFormula}
                  </span>
                </div>
                <div className="px-1 py-0.5 bg-slate-50 border-t border-slate-200 text-center">
                  <span className="text-[8px] font-bold text-slate-700 truncate block">
                    {item.examplePair}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Compact Section 2 & 3 */}
      <div className="summary-verb-compact-bottom grid grid-cols-[37fr_63fr] print:grid-cols-[37fr_63fr] gap-2 mt-1.5 flex-1 items-stretch">
        {/* Regular Rules 3 */}
        <div className="rounded-lg border border-purple-300 bg-[#FCF9FF] p-1.5 flex flex-col justify-between gap-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] font-black text-purple-950">
            <span className="w-4 h-4 rounded bg-purple-700 text-white text-[9px] font-black flex items-center justify-center shrink-0">
              2
            </span>
            <span className="truncate">{copy.regularSecTitle}</span>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-1">
            {copy.regularRules.map((rule) => (
              <div
                key={rule.title}
                onClick={() => handleSpeak(rule.audio)}
                className={`rounded bg-white border border-purple-200 px-1.5 py-1 flex flex-col justify-center ${
                  interactiveAudio ? 'cursor-pointer hover:bg-purple-50/60' : ''
                }`}
              >
                <div className="text-[9px] font-black text-purple-900 leading-tight">{rule.title}</div>
                <div className="text-[8px] font-semibold text-slate-700 leading-tight mt-0.5">{rule.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 7 Irregulars */}
        <div className="rounded-lg border border-amber-300 bg-[#FFFDF6] p-1.5 flex flex-col justify-between gap-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] font-black text-amber-950">
            <span className="w-4 h-4 rounded bg-amber-500 text-white text-[9px] font-black flex items-center justify-center shrink-0">
              3
            </span>
            <span className="truncate">{copy.irregularSecTitle}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-1.5 gap-y-0.5 flex-1">
            {copy.irregulars.map((ir) => (
              <div
                key={ir.num}
                onClick={() => handleSpeak(ir.audio)}
                className={`rounded bg-white border border-amber-200 px-1.5 py-0.5 flex flex-col justify-center min-w-0 ${
                  interactiveAudio ? 'cursor-pointer hover:bg-amber-50' : ''
                }`}
              >
                <div className="text-[8.5px] leading-tight truncate">
                  <span className="font-black text-purple-900 mr-1">{ir.num} {ir.name}</span>
                  <span className="font-bold text-slate-700">{ir.ex}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded bg-amber-100/75 border border-dashed border-amber-400 px-1.5 py-0.5 text-[7.5px] font-bold text-amber-950 leading-tight">
            {copy.irregularRefNote}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-1 pt-1 border-t border-purple-200 flex items-center justify-between text-[8.5px] text-slate-500 shrink-0">
        <span className="font-bold">{copy.footerLeft}</span>
        <span className="font-bold text-slate-400">{copy.footerRight} (압축 1쪽)</span>
      </div>
    </div>
  );
};

export const ParticleSummaryCompactWorksheetPage: React.FC<{
  interactiveAudio?: boolean;
  className?: string;
  copy?: ParticleSummaryCopy;
}> = ({
  interactiveAudio = true,
  className = '',
  copy = DEFAULT_PARTICLE_SUMMARY_COPY,
}) => {
  const handleSpeak = (text: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(text, 0.85);
  };

  const pairRoles = copy.pairRoles || DEFAULT_PARTICLE_SUMMARY_COPY.pairRoles!;
  const oLbl = copy.batchimOLabel ?? 'O';
  const xLbl = copy.batchimXLabel ?? 'X';
  const xrLbl = copy.batchimXRLabel ?? 'X/ㄹ';

  const batchimPairs = [
    { role: pairRoles[0] || '주제·대조', oForm: '은', xLabel: xLbl, xForm: '는', audio: '동생은, 나는' },
    { role: pairRoles[1] || '주격', oForm: '이', xLabel: xLbl, xForm: '가', audio: '책이, 비누가' },
    { role: pairRoles[2] || '목적격', oForm: '을', xLabel: xLbl, xForm: '를', audio: '밥을, 우유를' },
    { role: pairRoles[3] || '서술(이다)', oForm: '이에요', xLabel: xLbl, xForm: '예요', audio: '학생이에요, 의자예요' },
    { role: pairRoles[4] || '나열·동반', oForm: '과 · 이랑', xLabel: xLbl, xForm: '와 · 랑', audio: '책과, 엄마와' },
    { role: pairRoles[5] || '방향·수단', oForm: '으로', xLabel: xrLbl, xForm: '로', audio: '집으로, 버스로' },
    { role: pairRoles[6] || '선택 · 부름', oForm: '이나 · 아', xLabel: xLbl, xForm: '나 · 야', audio: '빵이나, 수진아' },
  ];

  return (
    <div
      className={`verb-worksheet-page particle-summary-sheet particle-summary-compact-sheet printable-a4-page print:m-0 print:p-2 print:shadow-none w-full max-w-[990px] mx-auto bg-white rounded-xl shadow-lg border-2 border-slate-300 p-2 sm:p-2.5 text-slate-900 flex flex-col justify-between font-korean-gothic select-none ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* Header */}
      <div className="flex flex-nowrap items-center justify-between gap-2 border-b-2 border-emerald-600 pb-1 mb-1.5 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
          <span className="text-sm leading-none shrink-0">🥟</span>
          <h1
            className="text-xs sm:text-[13px] font-bold text-emerald-950 tracking-tight whitespace-nowrap"
            style={{ fontFamily: FONT_TITLE, fontWeight: 700 }}
          >
            {copy.sheetTitle}
          </h1>
        </div>
        <div className="text-[10px] font-bold text-slate-700 flex flex-nowrap items-center gap-2.5 whitespace-nowrap shrink-0">
          <span className="text-emerald-700 font-bold">{copy.totalBadge}</span>
          <span>{copy.gradeLabel}: _____</span>
          <span>{copy.nameLabel}: __________</span>
        </div>
      </div>

      {/* Section 1: 6 cols x 4 rows compact cards */}
      <div className="flex flex-col gap-1 shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-900 min-w-0">
            <span className="w-4 h-4 rounded bg-emerald-600 text-white text-[9.5px] font-black flex items-center justify-center shrink-0">
              1
            </span>
            <span className="truncate">{copy.sec1Title}</span>
            <span className="text-[9px] font-bold text-slate-400 truncate">{copy.sec1Sub}</span>
          </div>
          <div className="flex items-center gap-1 text-[8.5px] font-bold text-slate-600 shrink-0">
            <span className="text-emerald-800">{copy.catLegend[0]}</span>·
            <span className="text-teal-800">{copy.catLegend[1]}</span>·
            <span className="text-sky-800">{copy.catLegend[2]}</span>·
            <span className="text-amber-800">{copy.catLegend[3]}</span>·
            <span className="text-indigo-800">{copy.catLegend[4]}</span>
          </div>
        </div>

        <div className="summary-particle-compact-grid grid grid-cols-6 print:grid-cols-6 gap-1">
          {PARTICLE_SUMMARY_CARDS.map((item, idx) => {
            const st = PARTICLE_CAT_STYLE[item.cat];
            const meta = copy.cardMeta?.[idx];
            const displayTitle = meta?.title ?? item.title;
            const displayCatLabel = meta?.catLabel ?? item.catLabel;
            const displayParticles = meta?.particles ?? item.particles;
            return (
              <div
                key={item.circled}
                onClick={() => handleSpeak(item.audioWord)}
                className={`rounded-lg border ${st.border} bg-white flex flex-col justify-between overflow-hidden min-w-0 ${
                  interactiveAudio ? `cursor-pointer ${st.hover}` : ''
                }`}
              >
                <div className={`px-1 py-0.5 flex items-center justify-between gap-0.5 ${st.topBg}`}>
                  <span className={`text-[8px] font-black ${st.topText} truncate`}>
                    {item.circled} {displayTitle}
                  </span>
                  <span className="text-[7px] font-black text-slate-500 shrink-0">
                    {item.isStar ? '★' : displayCatLabel}
                  </span>
                </div>
                <div className="px-1 py-1 text-center">
                  <span className={`text-[9.5px] font-black leading-tight truncate block ${st.mainText}`}>
                    {displayParticles}
                  </span>
                </div>
                <div className="px-1 py-0.5 bg-slate-50 border-t border-slate-200 text-center">
                  <span className="text-[7.5px] font-bold text-slate-700 truncate block">
                    {item.example}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Compact Section 2 & 3 */}
      <div className="summary-particle-compact-bottom grid grid-cols-[52fr_48fr] print:grid-cols-[52fr_48fr] gap-2 mt-1.5 flex-1 items-stretch">
        {/* Batchim O/X pairs */}
        <div className="rounded-lg border border-emerald-300 bg-[#F4FDF9] p-1.5 flex flex-col justify-between gap-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-950 min-w-0">
              <span className="w-4 h-4 rounded bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                2
              </span>
              <span className="truncate">{copy.sec2Title}</span>
            </div>
            <span className="text-[8px] font-black text-emerald-800 bg-white border border-emerald-200 rounded px-1.5 py-0.5 shrink-0">
              {copy.sec2Hint}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 flex-1">
            {batchimPairs.map((pair, idx) => (
              <div
                key={idx}
                onClick={() => handleSpeak(pair.audio)}
                className={`rounded bg-white border border-emerald-200 px-1.5 py-0.5 flex items-center justify-between gap-1 min-w-0 ${
                  interactiveAudio ? 'cursor-pointer hover:bg-emerald-50/70' : ''
                }`}
              >
                <span className="text-[8px] font-black text-emerald-950 truncate">{pair.role}</span>
                <span className="text-[8px] font-bold text-slate-800 shrink-0">
                  <b className="text-amber-800">{oLbl}</b> {pair.oForm} / <b className="text-rose-700">{pair.xLabel}</b> {pair.xForm}
                </span>
              </div>
            ))}
          </div>
          <div className="rounded bg-emerald-100/80 border border-dashed border-emerald-400 px-1.5 py-0.5 text-center text-[8px] font-black text-emerald-950 truncate">
            {copy.fixedListText}
          </div>
        </div>

        {/* Caution Lines */}
        <div className="rounded-lg border border-amber-300 bg-[#FFFDF6] p-1.5 flex flex-col justify-between gap-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] font-black text-amber-950">
            <span className="w-4 h-4 rounded bg-amber-500 text-white text-[9px] font-black flex items-center justify-center shrink-0">
              ★
            </span>
            <span className="truncate">{copy.sec3Title}</span>
          </div>
          <div className="flex-1 flex flex-col justify-between gap-1">
            {copy.cautionLines.map((line) => (
              <div
                key={line.label}
                onClick={() => handleSpeak(line.audio)}
                className={`rounded bg-white border border-amber-200 px-2 py-1 flex flex-col justify-center ${
                  interactiveAudio ? 'cursor-pointer hover:bg-amber-50' : ''
                }`}
              >
                <div className="text-[8.5px] font-black text-amber-900 leading-tight">{line.label}</div>
                <div className="text-[8px] font-semibold text-slate-800 leading-tight mt-0.5">{line.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-1 pt-1 border-t border-emerald-200 flex items-center justify-between text-[8.5px] text-slate-500 shrink-0">
        <span className="font-bold">{copy.footerLeft}</span>
        <span className="font-bold text-slate-400">{copy.footerRight} (압축 1쪽)</span>
      </div>
    </div>
  );
};

export const CLASSROOM_COMPACT_PAGES = [
  {
    pageIndex: 0,
    startCh: 1,
    endCh: 10,
    title: '1쪽 ①~⑩ 단원 어휘 총정리 (1~100번 · 압축)',
    badge: '1~10단원',
    rangeText: '1~100',
  },
  {
    pageIndex: 1,
    startCh: 11,
    endCh: 20,
    title: '2쪽 ⑪~⑳ 단원 어휘 총정리 (101~200번 · 압축)',
    badge: '11~20단원',
    rangeText: '101~200',
  },
  {
    pageIndex: 2,
    startCh: 21,
    endCh: 30,
    title: '3쪽 ㉑~㉚ 단원 어휘 총정리 (201~300번 · 압축)',
    badge: '21~30단원',
    rangeText: '201~300',
  },
] as const;

export const ClassroomSummaryCompactWorksheetPage: React.FC<{
  vocabulary: VocabularyItem[];
  pageIndex: number;
  selectedLang: SupportedLanguage;
  uiLang?: ClassroomUiLang;
  interactiveAudio?: boolean;
  className?: string;
}> = ({
  vocabulary,
  pageIndex,
  selectedLang,
  uiLang,
  interactiveAudio = true,
  className = '',
}) => {
  const pageMeta = CLASSROOM_COMPACT_PAGES[pageIndex] || CLASSROOM_COMPACT_PAGES[0];
  const resolvedUiLang: ClassroomUiLang = uiLang ?? selectedLang;
  const uiCopy = CLASSROOM_SUMMARY_UI_COPY[resolvedUiLang] || CLASSROOM_SUMMARY_UI_COPY.ko;
  const chapterNums = Array.from(
    { length: pageMeta.endCh - pageMeta.startCh + 1 },
    (_, i) => pageMeta.startCh + i
  );
  const unitRangeLabel = uiCopy.unitRangeFmt(pageMeta.startCh, pageMeta.endCh);

  const handleWordClick = (koText: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(koText, 0.85);
  };

  return (
    <div
      className={`print-sheet printable-word-sheet classroom-summary-sheet classroom-summary-compact-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-300 p-2 sm:p-2.5 text-slate-800 flex flex-col justify-between shadow-lg font-korean-gothic select-none ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* Header */}
      <div className="flex flex-nowrap items-center justify-between gap-2 border-b-2 border-rose-500 pb-1 mb-1.5 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
          <span className="text-sm leading-none shrink-0">🥟</span>
          <span
            className="text-xs sm:text-[13px] font-bold text-rose-950 tracking-tight whitespace-nowrap"
            style={{ fontFamily: FONT_TITLE, fontWeight: 700 }}
          >
            {uiCopy.headerPrefix} {unitRangeLabel} (#{pageMeta.rangeText}) ({pageIndex + 1}/3)
          </span>
        </div>
        <div className="text-[10px] font-bold text-slate-700 flex flex-nowrap items-center gap-2.5 whitespace-nowrap shrink-0">
          <span className="text-rose-700 font-bold">{unitRangeLabel} (100어휘)</span>
          <span>{uiCopy.gradeLabel}: _____</span>
          <span>{uiCopy.nameLabel}: __________</span>
        </div>
      </div>

      {/* 5 cols x 2 rows = 10 chapters (100 words per sheet) */}
      <div className="summary-classroom-grid grid grid-cols-5 print:grid-cols-5 gap-1.5 flex-1">
        {chapterNums.map((chNum, cIdx) => {
          const words = vocabulary.filter((v) => v.ch === chNum).slice(0, 10);
          const themeInfo = CHAPTER_THEME_TRANSLATIONS[chNum];
          const chIcon = words[0]?.icon || '📘';
          const isAltCol = cIdx % 2 === 1;
          const themeTrans = themeInfo?.trans?.[selectedLang] || themeInfo?.trans?.en || '';

          return (
            <div
              key={chNum}
              className={`rounded-lg border ${
                isAltCol ? 'border-pink-300' : 'border-rose-300'
              } bg-white flex flex-col justify-between overflow-hidden min-w-0`}
            >
              <div
                className={`px-1.5 py-0.5 flex items-center justify-between gap-1 border-b shrink-0 ${
                  isAltCol ? 'bg-pink-50 border-pink-200 text-rose-950' : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <span className="text-[9.5px] font-black truncate">
                  {chIcon} {CIRCLED_CH_NUMS[chNum]} {themeInfo?.ko || `${chNum}단원`}
                </span>
                {themeTrans && (
                  <span className="text-[7.5px] font-bold text-rose-700 truncate max-w-[66px]">
                    {themeTrans}
                  </span>
                )}
              </div>

              <div className="flex-1 px-1 py-0.5 flex flex-col justify-between divide-y divide-slate-100">
                {words.map((word, wIdx) => {
                  const transText = (word as any)[selectedLang] || word.en || '';
                  return (
                    <div
                      key={`${chNum}-${word.ko}-${wIdx}`}
                      onClick={() => handleWordClick(word.ko)}
                      className={`py-[1.5px] px-0.5 flex items-center justify-between gap-1 min-w-0 ${
                        interactiveAudio ? 'cursor-pointer hover:bg-rose-50/80' : ''
                      }`}
                      title={interactiveAudio ? `클릭하여 듣기: ${word.ko}` : undefined}
                    >
                      <span className="text-[9.5px] font-black text-slate-950 truncate min-w-0">
                        {word.ko}
                      </span>
                      <span className="text-[8px] font-semibold text-slate-500 truncate max-w-[78px] text-right shrink-0">
                        {transText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-1 pt-1 border-t border-rose-200 flex items-center justify-between text-[8.5px] text-slate-500 shrink-0">
        <span className="font-bold">{uiCopy.footerLeft}</span>
        <span className="font-bold text-slate-400">
          {uiCopy.footerRight(pageIndex + 1, 3)}
        </span>
      </div>
    </div>
  );
};
