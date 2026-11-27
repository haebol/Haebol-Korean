import React, { useState } from 'react';
import { Volume2, CheckCircle2, Eye, RotateCcw } from 'lucide-react';
import { BASIC_LETTERS_ILLUSTRATIONS } from '../data/basicLettersIllustrations';
import { MiniJollaman } from './HangeulJollaQuizAndGameSheets';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';

export type HangeulExamPartId = 'jamo' | 'basic';

export interface HangeulExamQuestion {
  id: number;
  tag: string;
  prefix?: string;
  optionA: string;
  optionB: string;
  suffix?: string;
  answer: 'A' | 'B';
  audioText: string;
  basicIllustKey?: string;
  hint?: string;
}

export interface HangeulExamPartMeta {
  id: HangeulExamPartId;
  partNumber: string;
  shortLabel: string;
  fullTitle: string;
  accentHex: string;
  accentDarkHex: string;
  tintBgHex: string;
  borderHex: string;
}

export interface HangeulExamLesson {
  /** 0 ~ 2 */
  globalIndex: number;
  id: string;
  partId: HangeulExamPartId;
  lessonNo: number;
  circledNo: string;
  title: string;
  subtitle: string;
  dropdownLabel: string;
  previewMain: string;
  previewChips: string[];
  sectionLabels: [string, string];
  questions: HangeulExamQuestion[];
}

export const HANGEUL_EXAM_PARTS: HangeulExamPartMeta[] = [
  {
    id: 'jamo',
    partNumber: 'PART 1',
    shortLabel: '자음모음',
    fullTitle: '자음·모음',
    accentHex: '#D97706',
    accentDarkHex: '#92400E',
    tintBgHex: '#FFFBEB',
    borderHex: '#F59E0B',
  },
  {
    id: 'basic',
    partNumber: 'PART 2',
    shortLabel: '기본글자',
    fullTitle: '기본글자',
    accentHex: '#EA580C',
    accentDarkHex: '#9A3412',
    tintBgHex: '#FFF7ED',
    borderHex: '#FB923C',
  },
];

export const HANGEUL_EXAM_PART_MAP: Record<HangeulExamPartId, HangeulExamPartMeta> =
  HANGEUL_EXAM_PARTS.reduce((acc, part) => {
    acc[part.id] = part;
    return acc;
  }, {} as Record<HangeulExamPartId, HangeulExamPartMeta>);

/**
 * 100% 해볼한국어 기존 데이터(자음모음표, BASIC_LETTERS_DATA 21쪽, BATCHIM_PAGES_DATA 1~15쪽)만
 * 사용하여 구성한 한글 ( / ) 고르기 쪽지시험 4파트 × 5강 = 총 20강 (200문항)
 */
export const HANGEUL_EXAM_LESSONS: HangeulExamLesson[] = [
  // =========================================================================
  // PART 1. 자음·모음 (1강 ~ 5강)
  // =========================================================================
  {
    globalIndex: 0,
    id: 'exam_jamo_1',
    partId: 'jamo',
    lessonNo: 1,
    circledNo: '①',
    title: '자음·모음 1강 · 기본자음 ① (ㄱ~ㅅ)',
    subtitle: '기본자음 ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ의 이름과 순서, 소리에 ○ 표 하세요.',
    dropdownLabel: '[자음모음 1강] 기본자음 ① (ㄱ~ㅅ)',
    previewMain: 'ㄱ~ㅅ',
    previewChips: ['ㄱㄴㄷㄹ', 'ㅁㅂㅅ', '10문항'],
    sectionLabels: ['1~5번 · 자음 이름과 모양 고르기', '6~10번 · 자음 순서와 ㅏ 합체 고르기'],
    questions: [
      { id: 1, tag: '자음 이름', prefix: 'ㄱ 의 이름은?', optionA: '기역', optionB: '니은', answer: 'A', audioText: '기역', hint: 'ㄱ [g/k]' },
      { id: 2, tag: '자음 이름', prefix: 'ㄴ 의 이름은?', optionA: '디귿', optionB: '니은', answer: 'B', audioText: '니은', hint: 'ㄴ [n]' },
      { id: 3, tag: '자음 이름', prefix: 'ㄷ 의 이름은?', optionA: '디귿', optionB: '리을', answer: 'A', audioText: '디귿', hint: 'ㄷ [d/t]' },
      { id: 4, tag: '자음 이름', prefix: 'ㅁ 의 이름은?', optionA: '비읍', optionB: '미음', answer: 'B', audioText: '미음', hint: 'ㅁ [m]' },
      { id: 5, tag: '자음 이름', prefix: 'ㅅ 의 이름은?', optionA: '시옷', optionB: '비읍', answer: 'A', audioText: '시옷', hint: 'ㅅ [s]' },
      { id: 6, tag: '자음 순서', prefix: 'ㄱ → ㄴ → (  ) → ㄹ', optionA: 'ㄷ', optionB: 'ㅁ', answer: 'A', audioText: '디귿', hint: '순서 찾기' },
      { id: 7, tag: '자음 순서', prefix: 'ㄹ → ㅁ → (  ) → ㅅ', optionA: 'ㄱ', optionB: 'ㅂ', answer: 'B', audioText: '비읍', hint: '순서 찾기' },
      { id: 8, tag: 'ㅏ 합체', prefix: 'ㄱ + ㅏ =', optionA: '가', optionB: '나', answer: 'A', audioText: '가', hint: '자모표' },
      { id: 9, tag: 'ㅏ 합체', prefix: 'ㅁ + ㅏ =', optionA: '바', optionB: '마', answer: 'B', audioText: '마', hint: '자모표' },
      { id: 10, tag: 'ㅏ 합체', prefix: 'ㅅ + ㅏ =', optionA: '사', optionB: '다', answer: 'A', audioText: '사', hint: '자모표' },
    ],
  },
  {
    globalIndex: 1,
    id: 'exam_jamo_5',
    partId: 'jamo',
    lessonNo: 5,
    circledNo: '⑤',
    title: '자음·모음 5강 · 복합모음 11자 (ㅐ~ㅢ)',
    subtitle: '두 모음이 만나 만들어진 복합모음 11자에 알맞게 ○ 표 하세요.',
    dropdownLabel: '[자음모음 5강] 복합모음 11자 (ㅐ~ㅢ)',
    previewMain: 'ㅐ~ㅢ',
    previewChips: ['ㅐㅒㅔㅖ', 'ㅘㅝㅚㅟㅢ', '10문항'],
    sectionLabels: ['1~5번 · ㅣ 결합 복합모음 (ㅐ, ㅒ, ㅔ, ㅖ, ㅢ)', '6~10번 · ㅗ/ㅜ 결합 복합모음 (ㅘ, ㅝ, ㅚ, ㅟ, ㅙ, ㅞ)'],
    questions: [
      { id: 1, tag: 'ㅣ 결합', prefix: 'ㅏ + ㅣ =', optionA: 'ㅐ', optionB: 'ㅔ', answer: 'A', audioText: '애', hint: 'ㅏ + ㅣ' },
      { id: 2, tag: 'ㅣ 결합', prefix: 'ㅓ + ㅣ =', optionA: 'ㅐ', optionB: 'ㅔ', answer: 'B', audioText: '에', hint: 'ㅓ + ㅣ' },
      { id: 3, tag: 'ㅣ 결합', prefix: 'ㅑ + ㅣ =', optionA: 'ㅒ', optionB: 'ㅖ', answer: 'A', audioText: '얘', hint: 'ㅑ + ㅣ' },
      { id: 4, tag: 'ㅣ 결합', prefix: 'ㅕ + ㅣ =', optionA: 'ㅒ', optionB: 'ㅖ', answer: 'B', audioText: '예', hint: 'ㅕ + ㅣ' },
      { id: 5, tag: 'ㅣ 결합', prefix: 'ㅡ + ㅣ =', optionA: 'ㅢ', optionB: 'ㅟ', answer: 'A', audioText: '의', hint: 'ㅡ + ㅣ' },
      { id: 6, tag: 'ㅗ 결합', prefix: 'ㅗ + ㅏ =', optionA: 'ㅘ', optionB: 'ㅝ', answer: 'A', audioText: '와', hint: 'ㅗ + ㅏ' },
      { id: 7, tag: 'ㅜ 결합', prefix: 'ㅜ + ㅓ =', optionA: 'ㅘ', optionB: 'ㅝ', answer: 'B', audioText: '워', hint: 'ㅜ + ㅓ' },
      { id: 8, tag: 'ㅗ/ㅜ+ㅣ', prefix: 'ㅗ + ㅣ =', optionA: 'ㅚ', optionB: 'ㅟ', answer: 'A', audioText: '외', hint: 'ㅗ + ㅣ' },
      { id: 9, tag: 'ㅗ/ㅜ+ㅣ', prefix: 'ㅜ + ㅣ =', optionA: 'ㅚ', optionB: 'ㅟ', answer: 'B', audioText: '위', hint: 'ㅜ + ㅣ' },
      { id: 10, tag: '삼총사', prefix: 'ㅗ + ㅐ =', optionA: 'ㅙ', optionB: 'ㅞ', answer: 'A', audioText: '왜', hint: 'ㅗ + ㅐ' },
    ],
  },

  // =========================================================================
  // PART 2. 기본글자 (1강 ~ 5강) — BASIC_LETTERS_DATA 21쪽 데이터 100% 기반
  // =========================================================================
  {
    globalIndex: 2,
    id: 'exam_basic_1',
    partId: 'basic',
    lessonNo: 1,
    circledNo: '①',
    title: '기본글자 1강 · ㅏ·ㅓ·ㅗ·ㅜ·ㅡ·ㅣ (1~6쪽)',
    subtitle: '그림과 글자 합체를 보고 알맞은 글자·낱말에 ○ 표 하세요.',
    dropdownLabel: '[기본글자 1강] ㅏㅓㅗㅜㅡㅣ (사자~가지)',
    previewMain: '사자·포도',
    previewChips: ['사자·버터', '포도·구두', '버스·가지'],
    sectionLabels: ['1~5번 · 그림 보고 낱말 고르기', '6~10번 · 기본글자 합체 & 낱말 확인'],
    questions: [
      { id: 1, tag: '① ㅏ', basicIllustKey: '사자', optionA: '사자', optionB: '자사', answer: 'A', audioText: '사자' },
      { id: 2, tag: '② ㅓ', basicIllustKey: '버터', optionA: '터버', optionB: '버터', answer: 'B', audioText: '버터' },
      { id: 3, tag: '③ ㅗ', basicIllustKey: '포도', optionA: '포도', optionB: '도포', answer: 'A', audioText: '포도' },
      { id: 4, tag: '④ ㅜ', basicIllustKey: '구두', optionA: '두구', optionB: '구두', answer: 'B', audioText: '구두' },
      { id: 5, tag: '⑤ ㅡ', basicIllustKey: '버스', optionA: '버스', optionB: '바스', answer: 'A', audioText: '버스' },
      { id: 6, tag: '⑥ ㅣ', basicIllustKey: '가지', optionA: '가시', optionB: '가지', answer: 'B', audioText: '가지' },
      { id: 7, tag: '① ㅏ 합체', prefix: 'ㄱ + ㅏ =', optionA: '가', optionB: '거', answer: 'A', audioText: '가', hint: '좌우조합' },
      { id: 8, tag: '② ㅓ 합체', prefix: 'ㅁ + ㅓ =', optionA: '모', optionB: '머', answer: 'B', audioText: '머', hint: '좌우조합' },
      { id: 9, tag: '③ ㅗ 합체', prefix: 'ㅌ + ㅗ =', optionA: '토', optionB: '트', answer: 'A', audioText: '토', hint: '상하조합' },
      { id: 10, tag: '⑤ ㅡ 합체', prefix: 'ㅋ + ㅡ =', optionA: '구', optionB: '크', answer: 'B', audioText: '크', hint: '상하조합' },
    ],
  },
];

interface HangeulExamSheetProps {
  lesson: HangeulExamLesson;
}

export const HangeulExamSheet: React.FC<HangeulExamSheetProps> = ({ lesson }) => {
  const part = HANGEUL_EXAM_PART_MAP[lesson.partId];
  const [selected, setSelected] = useState<Record<number, 'A' | 'B'>>({});
  const [isGraded, setIsGraded] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  const handleChoose = (qId: number, choice: 'A' | 'B') => {
    playCutePop();
    setSelected((prev) => ({ ...prev, [qId]: choice }));
    if (isGraded) setIsGraded(false);
  };

  const handleGrade = () => {
    playSuccessChime();
    setIsGraded(true);
  };

  const handleReset = () => {
    playCutePop();
    setSelected({});
    setIsGraded(false);
    setShowAnswerKey(false);
  };

  const correctCount = lesson.questions.reduce(
    (acc, q) => acc + (selected[q.id] === q.answer ? 1 : 0),
    0
  );

  const leftQuestions = lesson.questions.slice(0, 5);
  const rightQuestions = lesson.questions.slice(5, 10);

  const renderQuestionRow = (q: HangeulExamQuestion) => {
    const userChoice = selected[q.id];
    const basicIllust = q.basicIllustKey
      ? BASIC_LETTERS_ILLUSTRATIONS[q.basicIllustKey]
      : undefined;

    const getOptionCircleStyle = (optKey: 'A' | 'B') => {
      const isChosen = userChoice === optKey;
      const isCorrectOpt = q.answer === optKey;

      if (showAnswerKey && isCorrectOpt) {
        return 'border-[2.5px] border-rose-500 bg-rose-50 text-rose-800 rounded-full';
      }
      if (isGraded) {
        if (isChosen && isCorrectOpt) {
          return 'border-[2.5px] border-emerald-500 bg-emerald-50 text-emerald-900 rounded-full';
        }
        if (isChosen && !isCorrectOpt) {
          return 'border-[2.5px] border-rose-500 bg-rose-50 text-rose-700 line-through rounded-full';
        }
        if (!isChosen && isCorrectOpt) {
          return 'border-2 border-dashed border-emerald-500 text-emerald-800 rounded-full';
        }
      } else if (isChosen) {
        return 'border-[2.5px] border-rose-500 bg-rose-50/60 text-slate-900 rounded-full';
      }
      return 'border-2 border-transparent hover:border-slate-300 hover:bg-slate-50 rounded-full text-slate-900';
    };

    return (
      <div
        key={q.id}
        className="rounded-xl border-[1.5px] border-slate-200 bg-white px-3 py-2 flex items-center justify-between gap-2 min-h-[82px]"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
            style={{ backgroundColor: part.accentHex }}
          >
            {q.id}
          </div>

          {basicIllust && (
            <div className="w-14 h-14 rounded-lg border border-amber-200 bg-amber-50/40 flex items-center justify-center shrink-0 overflow-hidden [&>svg]:w-12 [&>svg]:h-12">
              {basicIllust}
            </div>
          )}

          <div className="flex flex-col justify-center min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="text-[10px] font-black px-1.5 py-[1px] rounded"
                style={{
                  backgroundColor: part.tintBgHex,
                  color: part.accentDarkHex,
                }}
              >
                {q.tag}
              </span>
              {q.hint && (
                <span className="text-[10.5px] font-bold text-slate-500">[{q.hint}]</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[16px] font-black text-slate-900 leading-snug">
              {q.prefix && <span className="mr-0.5">{q.prefix}</span>}
              <span className="inline-flex items-center font-black tracking-tight">
                <span className="text-slate-400 font-bold mr-0.5">(</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => handleChoose(q.id, 'A')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleChoose(q.id, 'A');
                    }
                  }}
                  className={`inline-block px-2 py-0.5 transition-all cursor-pointer select-none font-black text-[16px] leading-tight ${getOptionCircleStyle('A')}`}
                >
                  {q.optionA}
                </span>
                <span className="text-slate-400 font-extrabold mx-1">/</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => handleChoose(q.id, 'B')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleChoose(q.id, 'B');
                    }
                  }}
                  className={`inline-block px-2 py-0.5 transition-all cursor-pointer select-none font-black text-[16px] leading-tight ${getOptionCircleStyle('B')}`}
                >
                  {q.optionB}
                </span>
                <span className="text-slate-400 font-bold ml-0.5">)</span>
              </span>
              {q.suffix && <span>{q.suffix}</span>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {isGraded && userChoice && (
            <span
              className={`no-print text-xs font-black px-1.5 py-0.5 rounded ${
                userChoice === q.answer
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              {userChoice === q.answer ? '○' : '×'}
            </span>
          )}
          <button
            type="button"
            onClick={() => speakKorean(q.audioText)}
            className="no-print w-7 h-7 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            title="발음 듣기"
            aria-label={`${q.id}번 발음 듣기`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 shadow-lg mx-auto flex flex-col justify-between overflow-hidden font-school-base"
      style={{
        minHeight: '690px',
        padding: '16px 24px 14px',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b-2 border-slate-200 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="px-2.5 py-1 rounded-lg text-white text-xs font-black shrink-0"
            style={{ backgroundColor: part.accentHex }}
          >
            {part.partNumber} · {lesson.lessonNo}강
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-[19px] font-black text-slate-900 leading-tight truncate">
                {lesson.title}
              </h2>
              <span
                className="text-[10.5px] font-black px-2 py-0.5 rounded border shrink-0"
                style={{
                  backgroundColor: part.tintBgHex,
                  borderColor: part.borderHex,
                  color: part.accentDarkHex,
                }}
              >
                {lesson.globalIndex + 1} / {HANGEUL_EXAM_LESSONS.length}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">
              ✏️ {lesson.subtitle}
            </p>
          </div>
        </div>

        {/* Name, Inline Controls & Score Strip */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="no-print flex items-center gap-1">
            <button
              type="button"
              onClick={handleGrade}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-[11px] font-black text-white cursor-pointer transition-opacity hover:opacity-90"
              style={{ backgroundColor: part.accentHex }}
            >
              <CheckCircle2 className="w-3 h-3" />
              채점
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setShowAnswerKey((v) => !v);
              }}
              className={`inline-flex items-center gap-0.5 px-2 py-1 rounded-md text-[11px] font-bold border cursor-pointer transition-colors ${
                showAnswerKey
                  ? 'bg-rose-50 border-rose-400 text-rose-700'
                  : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Eye className="w-3 h-3" />
              {showAnswerKey ? '숨김' : '정답'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-0.5 px-1.5 py-1 rounded-md text-[11px] font-bold bg-slate-50 border border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="초기화"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
          <div className="rounded-lg border-[1.5px] border-slate-300 px-3 py-1 bg-slate-50/60 flex items-center gap-3 text-xs font-bold text-slate-700">
            <span>학년·반: ______</span>
            <span>이름: __________</span>
            <span
              className="px-2 py-0.5 rounded bg-white border font-black"
              style={{ borderColor: part.borderHex, color: part.accentDarkHex }}
            >
              점수: {isGraded ? `${correctCount}` : '   '} / 10
            </span>
          </div>
          <div className="shrink-0 -my-1">
            <MiniJollaman pose="cheer" size={34} teamColor={part.accentHex} />
          </div>
        </div>
      </div>

      {/* 2 Columns × 5 Questions Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <div
            className="px-3 py-1 rounded-lg text-xs font-black border"
            style={{
              backgroundColor: part.tintBgHex,
              borderColor: part.borderHex,
              color: part.accentDarkHex,
            }}
          >
            {lesson.sectionLabels[0]}
          </div>
          <div className="flex flex-col gap-2 flex-1 justify-between">
            {leftQuestions.map(renderQuestionRow)}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="px-3 py-1 rounded-lg text-xs font-black border"
            style={{
              backgroundColor: part.tintBgHex,
              borderColor: part.borderHex,
              color: part.accentDarkHex,
            }}
          >
            {lesson.sectionLabels[1]}
          </div>
          <div className="flex flex-col gap-2 flex-1 justify-between">
            {rightQuestions.map(renderQuestionRow)}
          </div>
        </div>
      </div>

      {/* Bottom Footer & Teacher Answer Key */}
      <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-bold text-slate-500">
        <span>
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어 · {part.fullTitle} {lesson.lessonNo}강
        </span>
        <span className="text-[10px] font-extrabold text-slate-400">
          {showAnswerKey
            ? `정답: ${lesson.questions
                .map((q) => `${q.id}.${q.answer === 'A' ? q.optionA : q.optionB}`)
                .join(' / ')}`
            : '참 잘했어요! ★ ★ ★'}
        </span>
      </div>
    </div>
  );
};
