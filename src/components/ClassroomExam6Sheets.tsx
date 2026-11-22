import React, { useState } from 'react';
import { Volume2, CheckCircle2, Eye, RotateCcw, Printer } from 'lucide-react';
import { SupportedLanguage, VocabularyItem } from '../types';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { ManduMascot } from './ManduMascot';
import { VocabVisual } from './VocabVisual';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';

export interface ClassroomExamQuestion {
  id: number;
  kind: 'vocab' | 'sentence';
  vocabItem: VocabularyItem;
  prefix?: string;
  optionA: string;
  optionB: string;
  suffix?: string;
  answer: 'A' | 'B';
  audioText: string;
}

export interface ClassroomExamLesson {
  /** 0 ~ 5 */
  globalIndex: number;
  id: string;
  lessonNo: number; // 1 ~ 6
  circledNo: string; // ① ~ ⑥
  rangeLabel: string;
  headerTitle: string;
  subtitle: string;
  dropdownLabel: string;
  previewMain: string;
  previewChips: string[];
  leftColHeader: string;
  rightColHeader: string;
  questions: ClassroomExamQuestion[];
}

interface ClassroomPickSpec {
  ch: number;
  ko: string;
  wrongKo: string;
  answer: 'A' | 'B';
}

const findVocab = (ch: number, ko: string): VocabularyItem => {
  const found =
    VOCABULARY_DATA.find((v) => v.ch === ch && v.ko === ko) ||
    VOCABULARY_DATA.find((v) => v.ko === ko) ||
    VOCABULARY_DATA[0];
  return found;
};

const buildVocabQuestion = (
  id: number,
  spec: ClassroomPickSpec
): ClassroomExamQuestion => {
  const item = findVocab(spec.ch, spec.ko);
  return {
    id,
    kind: 'vocab',
    vocabItem: item,
    optionA: spec.answer === 'A' ? item.ko : spec.wrongKo,
    optionB: spec.answer === 'B' ? item.ko : spec.wrongKo,
    answer: spec.answer,
    audioText: item.ko,
  };
};

const buildPhraseQuestion = (
  id: number,
  spec: ClassroomPickSpec
): ClassroomExamQuestion => {
  const item = findVocab(spec.ch, spec.ko);
  const phrase = item.samplePhrase || item.ko;
  const idx = phrase.indexOf(item.ko);
  const prefix = idx >= 0 ? phrase.slice(0, idx).trimEnd() : '';
  const suffix = idx >= 0 ? phrase.slice(idx + item.ko.length) : '';

  return {
    id,
    kind: 'sentence',
    vocabItem: item,
    prefix,
    optionA: spec.answer === 'A' ? item.ko : spec.wrongKo,
    optionB: spec.answer === 'B' ? item.ko : spec.wrongKo,
    suffix,
    answer: spec.answer,
    audioText: phrase,
  };
};

/**
 * 교실 한국어 5단원씩 묶어 섞은 종합 ( / ) 쪽지시험 — 총 6강 (60문항)
 * 100% 해볼 한국어 기존 교실 한국어 30단원(300단어)과 예문·그림만 사용
 */
export const CLASSROOM_EXAM_LESSONS: ClassroomExamLesson[] = [
  // ① 1~5단원 종합 (기본 · 생존 · 건강 · 교실 · 학습)
  {
    globalIndex: 0,
    id: 'classroom_exam_1',
    lessonNo: 1,
    circledNo: '①',
    rangeLabel: '1~5단원',
    headerTitle: '해볼 한국어 [교실 한국어 시험] ① 1~5단원 종합 (기본·생존·건강·교실·학습)',
    subtitle: '1~5단원 필수 어휘 50개 중 핵심 낱말·예문 혼합 평가',
    dropdownLabel: '① 1강 · 1~5단원 종합 (기본~학습)',
    previewMain: '기본~학습',
    previewChips: ['1~5단원', '기본·생존·건강·교실·학습', '10문항'],
    leftColHeader: '[1~5] 그림·뜻 보고 알맞은 말에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildVocabQuestion(1, { ch: 2, ko: '화장실', wrongKo: '보건실', answer: 'A' }),
      buildVocabQuestion(2, { ch: 5, ko: '연필', wrongKo: '지우개', answer: 'B' }),
      buildVocabQuestion(3, { ch: 4, ko: '선생님', wrongKo: '친구', answer: 'A' }),
      buildVocabQuestion(4, { ch: 3, ko: '약', wrongKo: '물', answer: 'B' }),
      buildVocabQuestion(5, { ch: 1, ko: '감사합니다', wrongKo: '미안해', answer: 'A' }),
      buildPhraseQuestion(6, { ch: 3, ko: '아파요', wrongKo: '쉬어요', answer: 'B' }),
      buildPhraseQuestion(7, { ch: 5, ko: '써요', wrongKo: '읽어요', answer: 'A' }),
      buildPhraseQuestion(8, { ch: 2, ko: '마셔요', wrongKo: '씻어요', answer: 'B' }),
      buildPhraseQuestion(9, { ch: 4, ko: '칠판', wrongKo: '자리', answer: 'A' }),
      buildPhraseQuestion(10, { ch: 1, ko: '주세요', wrongKo: '몰라요', answer: 'B' }),
    ],
  },

  // ② 6~10단원 종합 (규칙 · 급식 · 맛 · 친구 · 방과후)
  {
    globalIndex: 1,
    id: 'classroom_exam_2',
    lessonNo: 2,
    circledNo: '②',
    rangeLabel: '6~10단원',
    headerTitle: '해볼 한국어 [교실 한국어 시험] ② 6~10단원 종합 (규칙·급식·맛·친구·방과후)',
    subtitle: '6~10단원 필수 어휘 50개 중 핵심 낱말·예문 혼합 평가',
    dropdownLabel: '② 2강 · 6~10단원 종합 (규칙~방과후)',
    previewMain: '규칙~방과후',
    previewChips: ['6~10단원', '규칙·급식·맛·친구·방과후', '10문항'],
    leftColHeader: '[1~5] 그림·뜻 보고 알맞은 말에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildVocabQuestion(1, { ch: 7, ko: '식판', wrongKo: '물통', answer: 'B' }),
      buildVocabQuestion(2, { ch: 6, ko: '실내화', wrongKo: '가방', answer: 'A' }),
      buildVocabQuestion(3, { ch: 8, ko: '매워요', wrongKo: '맛있어요', answer: 'B' }),
      buildVocabQuestion(4, { ch: 10, ko: '돌봄교실', wrongKo: '간식', answer: 'A' }),
      buildVocabQuestion(5, { ch: 9, ko: '고마워요', wrongKo: '미안해요', answer: 'B' }),
      buildPhraseQuestion(6, { ch: 7, ko: '숟가락', wrongKo: '젓가락', answer: 'A' }),
      buildPhraseQuestion(7, { ch: 6, ko: '알림장', wrongKo: '시간표', answer: 'B' }),
      buildPhraseQuestion(8, { ch: 8, ko: '배불러요', wrongKo: '싫어요', answer: 'A' }),
      buildPhraseQuestion(9, { ch: 9, ko: '양보해요', wrongKo: '심심해요', answer: 'B' }),
      buildPhraseQuestion(10, { ch: 10, ko: '끝났어요', wrongKo: '기다려요', answer: 'A' }),
    ],
  },

  // ③ 11~15단원 종합 (국어 · 수학 · 미술 · 체육 · 음악)
  {
    globalIndex: 2,
    id: 'classroom_exam_3',
    lessonNo: 3,
    circledNo: '③',
    rangeLabel: '11~15단원',
    headerTitle: '해볼 한국어 [교실 한국어 시험] ③ 11~15단원 종합 (국어·수학·미술·체육·음악)',
    subtitle: '11~15단원 교과 필수 어휘 50개 중 핵심 낱말·예문 혼합 평가',
    dropdownLabel: '③ 3강 · 11~15단원 종합 (국어~음악)',
    previewMain: '국어~음악',
    previewChips: ['11~15단원', '국어·수학·미술·체육·음악', '10문항'],
    leftColHeader: '[1~5] 그림·뜻 보고 알맞은 말에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildVocabQuestion(1, { ch: 13, ko: '색연필', wrongKo: '색종이', answer: 'A' }),
      buildVocabQuestion(2, { ch: 14, ko: '운동장', wrongKo: '체육관', answer: 'B' }),
      buildVocabQuestion(3, { ch: 12, ko: '숫자', wrongKo: '글자', answer: 'A' }),
      buildVocabQuestion(4, { ch: 15, ko: '악기', wrongKo: '박수', answer: 'B' }),
      buildVocabQuestion(5, { ch: 11, ko: '손들어요', wrongKo: '대답해요', answer: 'A' }),
      buildPhraseQuestion(6, { ch: 12, ko: '커요', wrongKo: '작아요', answer: 'B' }),
      buildPhraseQuestion(7, { ch: 14, ko: '줄넘기', wrongKo: '공', answer: 'A' }),
      buildPhraseQuestion(8, { ch: 13, ko: '그려요', wrongKo: '오려요', answer: 'B' }),
      buildPhraseQuestion(9, { ch: 15, ko: '연주해요', wrongKo: '춤춰요', answer: 'A' }),
      buildPhraseQuestion(10, { ch: 11, ko: '낱말', wrongKo: '문장', answer: 'B' }),
    ],
  },

  // ④ 16~20단원 종합 (안전 · 일상 · 공간 · 시간 · 요일)
  {
    globalIndex: 3,
    id: 'classroom_exam_4',
    lessonNo: 4,
    circledNo: '④',
    rangeLabel: '16~20단원',
    headerTitle: '해볼 한국어 [교실 한국어 시험] ④ 16~20단원 종합 (안전·일상·공간·시간·요일)',
    subtitle: '16~20단원 학교 안전·시간·요일 어휘 50개 중 핵심 혼합 평가',
    dropdownLabel: '④ 4강 · 16~20단원 종합 (안전~요일)',
    previewMain: '안전~요일',
    previewChips: ['16~20단원', '안전·일상·공간·시간·요일', '10문항'],
    leftColHeader: '[1~5] 그림·뜻 보고 알맞은 말에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildVocabQuestion(1, { ch: 16, ko: '도서관', wrongKo: '과학실', answer: 'B' }),
      buildVocabQuestion(2, { ch: 18, ko: '위', wrongKo: '아래', answer: 'A' }),
      buildVocabQuestion(3, { ch: 19, ko: '아침', wrongKo: '저녁', answer: 'B' }),
      buildVocabQuestion(4, { ch: 20, ko: '주말', wrongKo: '월요일', answer: 'A' }),
      buildVocabQuestion(5, { ch: 17, ko: '아니요', wrongKo: '네', answer: 'B' }),
      buildPhraseQuestion(6, { ch: 16, ko: '계단', wrongKo: '교문', answer: 'A' }),
      buildPhraseQuestion(7, { ch: 19, ko: '내일', wrongKo: '어제', answer: 'B' }),
      buildPhraseQuestion(8, { ch: 18, ko: '옆', wrongKo: '위', answer: 'A' }),
      buildPhraseQuestion(9, { ch: 20, ko: '금요일', wrongKo: '화요일', answer: 'B' }),
      buildPhraseQuestion(10, { ch: 17, ko: '모르겠어요', wrongKo: '알겠어요', answer: 'A' }),
    ],
  },

  // ⑤ 21~25단원 종합 (숫자 · 협동 · 감정 · 색깔 · 가족)
  {
    globalIndex: 4,
    id: 'classroom_exam_5',
    lessonNo: 5,
    circledNo: '⑤',
    rangeLabel: '21~25단원',
    headerTitle: '해볼 한국어 [교실 한국어 시험] ⑤ 21~25단원 종합 (숫자·협동·감정·색깔·가족)',
    subtitle: '21~25단원 숫자·감정·색깔·가족 어휘 50개 중 핵심 혼합 평가',
    dropdownLabel: '⑤ 5강 · 21~25단원 종합 (숫자~가족)',
    previewMain: '숫자~가족',
    previewChips: ['21~25단원', '숫자·협동·감정·색깔·가족', '10문항'],
    leftColHeader: '[1~5] 그림·뜻 보고 알맞은 말에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildVocabQuestion(1, { ch: 23, ko: '기뻐요', wrongKo: '슬퍼요', answer: 'A' }),
      buildVocabQuestion(2, { ch: 24, ko: '무지개', wrongKo: '노랑', answer: 'B' }),
      buildVocabQuestion(3, { ch: 25, ko: '가족', wrongKo: '동생', answer: 'A' }),
      buildVocabQuestion(4, { ch: 21, ko: '백 점', wrongKo: '모두', answer: 'B' }),
      buildVocabQuestion(5, { ch: 22, ko: '모둠', wrongKo: '같이', answer: 'A' }),
      buildPhraseQuestion(6, { ch: 23, ko: '졸려요', wrongKo: '화나요', answer: 'B' }),
      buildPhraseQuestion(7, { ch: 24, ko: '초록', wrongKo: '주황', answer: 'A' }),
      buildPhraseQuestion(8, { ch: 25, ko: '아빠', wrongKo: '엄마', answer: 'B' }),
      buildPhraseQuestion(9, { ch: 21, ko: '몇 개예요?', wrongKo: '세 개예요', answer: 'A' }),
      buildPhraseQuestion(10, { ch: 22, ko: '같이', wrongKo: '잠깐만', answer: 'B' }),
    ],
  },

  // ⑥ 26~30단원 종합 (사람·학교 · 교통·길 · 의문사 · 지시·수량 · 접속·부사)
  {
    globalIndex: 5,
    id: 'classroom_exam_6',
    lessonNo: 6,
    circledNo: '⑥',
    rangeLabel: '26~30단원',
    headerTitle: '해볼 한국어 [교실 한국어 시험] ⑥ 26~30단원 종합 (학교·교통·의문사·부사)',
    subtitle: '26~30단원 사람·교통·의문사·지시·접속 어휘 50개 중 핵심 혼합 평가',
    dropdownLabel: '⑥ 6강 · 26~30단원 종합 (학교~부사)',
    previewMain: '학교~부사',
    previewChips: ['26~30단원', '학교·교통·의문사·지시·부사', '10문항'],
    leftColHeader: '[1~5] 그림·뜻 보고 알맞은 말에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildVocabQuestion(1, { ch: 27, ko: '자전거', wrongKo: '지하철', answer: 'B' }),
      buildVocabQuestion(2, { ch: 26, ko: '학교', wrongKo: '집', answer: 'A' }),
      buildVocabQuestion(3, { ch: 28, ko: '어디', wrongKo: '언제', answer: 'B' }),
      buildVocabQuestion(4, { ch: 30, ko: '천천히', wrongKo: '빨리', answer: 'A' }),
      buildVocabQuestion(5, { ch: 29, ko: '얼마', wrongKo: '어느', answer: 'B' }),
      buildPhraseQuestion(6, { ch: 27, ko: '버스', wrongKo: '차', answer: 'A' }),
      buildPhraseQuestion(7, { ch: 28, ko: '누구', wrongKo: '무엇', answer: 'B' }),
      buildPhraseQuestion(8, { ch: 30, ko: '그래서', wrongKo: '하지만', answer: 'A' }),
      buildPhraseQuestion(9, { ch: 29, ko: '거기', wrongKo: '그거', answer: 'B' }),
      buildPhraseQuestion(10, { ch: 26, ko: '남자', wrongKo: '여자', answer: 'A' }),
    ],
  },
];

const BADASSEUGI_FONT =
  "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif";

interface ClassroomExamSheetProps {
  lesson: ClassroomExamLesson;
  lang?: SupportedLanguage;
  onPrintSingle?: () => void;
}

export const ClassroomExamSheet: React.FC<ClassroomExamSheetProps> = ({
  lesson,
  lang,
  onPrintSingle,
}) => {
  const resolvedLang: SupportedLanguage = lang || 'en';
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

  const getOptionCircleStyle = (q: ClassroomExamQuestion, optKey: 'A' | 'B') => {
    const userChoice = selected[q.id];
    const isChosen = userChoice === optKey;
    const isCorrectOpt = q.answer === optKey;

    if (showAnswerKey && isCorrectOpt) {
      return 'border-2 border-rose-600 bg-rose-50 text-rose-800 rounded-full';
    }
    if (isGraded) {
      if (isChosen && isCorrectOpt) {
        return 'border-2 border-emerald-600 bg-emerald-50 text-emerald-900 rounded-full';
      }
      if (isChosen && !isCorrectOpt) {
        return 'border-2 border-rose-600 bg-rose-50 text-rose-700 line-through rounded-full';
      }
      if (!isChosen && isCorrectOpt) {
        return 'border-2 border-dashed border-emerald-600 text-emerald-800 rounded-full';
      }
    } else if (isChosen) {
      return 'border-2 border-rose-600 bg-rose-50 text-slate-950 rounded-full';
    }
    return 'border-2 border-transparent hover:border-slate-400 rounded-full text-slate-950';
  };

  const renderChoicePair = (q: ClassroomExamQuestion) => {
    const totalLen = q.optionA.length + q.optionB.length;
    const sizeClass =
      totalLen >= 12
        ? 'text-[13.5px]'
        : totalLen >= 9
        ? 'text-[15px]'
        : totalLen >= 7
        ? 'text-[16.5px]'
        : 'text-[18px]';

    return (
      <span
        style={{ fontFamily: BADASSEUGI_FONT }}
        className={`inline-flex items-center whitespace-nowrap font-bold tracking-tight leading-none ${sizeClass}`}
      >
        <span className="text-slate-500 font-normal mr-0.5">(</span>
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
          className={`inline-block px-1.5 py-0.5 transition-colors cursor-pointer select-none ${getOptionCircleStyle(q, 'A')}`}
        >
          {q.optionA}
        </span>
        <span className="text-slate-400 font-normal mx-0.5">/</span>
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
          className={`inline-block px-1.5 py-0.5 transition-colors cursor-pointer select-none ${getOptionCircleStyle(q, 'B')}`}
        >
          {q.optionB}
        </span>
        <span className="text-slate-500 font-normal ml-0.5">)</span>
      </span>
    );
  };

  const getMeaning = (item: VocabularyItem): string => {
    return (item[resolvedLang] as string) || item.en || '';
  };

  return (
    <div className="w-full max-w-[1040px] mx-auto flex flex-col">
      {/* Web-only compact bar OUTSIDE the paper sheet */}
      <div className="no-print w-full flex flex-wrap items-center justify-between gap-2 mb-1.5 px-1">
        <span className="text-xs font-extrabold text-slate-700 font-korean-gothic">
          {lesson.lessonNo} / {CLASSROOM_EXAM_LESSONS.length} · 교실 한국어 {lesson.rangeLabel} 종합 쪽지시험
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleGrade}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#D94A6B] hover:bg-[#BE123C] text-white text-xs font-bold cursor-pointer transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            채점하기
          </button>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setShowAnswerKey((v) => !v);
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold border cursor-pointer transition-colors ${
              showAnswerKey
                ? 'bg-rose-50 border-rose-400 text-rose-700'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {showAnswerKey ? '정답 숨기기' : '정답 보기'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            초기화
          </button>
          {onPrintSingle && (
            <button
              type="button"
              onClick={onPrintSingle}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-rose-50 text-slate-800 border border-slate-300 text-xs font-bold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#D94A6B]" />
              이 시험지 1장 인쇄
            </button>
          )}
        </div>
      </div>

      {/* Authentic Haebol Korean A4 Landscape Worksheet Sheet */}
      <div
        className="verb-worksheet-page chapter-extra-a4-sheet print-sheet printable-a4-page print:m-0 print:p-2 print:shadow-none print:border-none w-full bg-white rounded-2xl shadow-md border-2 border-slate-300 p-2.5 sm:p-3 text-slate-900 flex flex-col justify-between font-korean-gothic"
        style={{ minHeight: '620px' }}
      >
        {/* 1. HEADER ROW */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b-2 border-slate-700 pb-1 mb-2 text-slate-900 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <ManduMascot size="xs" interactive={false} />
            <h1 className="text-xs sm:text-sm md:text-[15.5px] font-black text-slate-950 font-korean-gothic tracking-tight break-keep">
              {lesson.headerTitle}
            </h1>
          </div>

          <div className="text-[11px] sm:text-xs font-extrabold text-slate-800 flex items-center gap-3 sm:gap-5 font-korean-gothic shrink-0">
            <span>학년: ________</span>
            <span>이름: ______________</span>
            <span>점수: {isGraded ? ` ${correctCount} ` : '____'} / 10</span>
          </div>
        </div>

        {/* 2. UNIFIED SINGLE TABLE (Laser-straight horizontal rows) */}
        <table className="w-full table-fixed border-collapse flex-1 bg-white">
          <colgroup>
            <col style={{ width: '3.5%' }} />
            <col style={{ width: '6%' }} />
            <col style={{ width: '11.5%' }} />
            <col style={{ width: '28.5%' }} />
            <col style={{ width: '1%' }} />
            <col style={{ width: '3.5%' }} />
            <col style={{ width: '46%' }} />
          </colgroup>
          <thead>
            <tr className="text-slate-950 font-black text-[11px] sm:text-xs">
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-rose-50/80 py-1.5 text-center"
              >
                번호
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-rose-50/80 py-1.5 text-center"
              >
                그림
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-rose-50/80 py-1.5 text-center"
              >
                뜻
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-rose-50/80 py-1.5 px-1.5 text-center"
              >
                {lesson.leftColHeader}
              </th>
              <th style={{ border: 'none' }} className="bg-white p-0" aria-hidden="true" />
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-rose-50/80 py-1.5 text-center"
              >
                번호
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-rose-50/80 py-1.5 px-2 text-center"
              >
                {lesson.rightColHeader}
              </th>
            </tr>
          </thead>
          <tbody>
            {leftQuestions.map((leftQ, rowIdx) => {
              const rightQ = rightQuestions[rowIdx];
              const leftUser = selected[leftQ.id];
              const rightUser = selected[rightQ.id];
              const leftMeaning = getMeaning(leftQ.vocabItem);
              const rightMeaning = getMeaning(rightQ.vocabItem);

              return (
                <tr key={leftQ.id} style={{ height: '100px' }}>
                  {/* Left 번호 */}
                  <td
                    style={{ border: '1.5px solid #334155' }}
                    className="text-center font-black text-sm text-slate-900 bg-slate-50/60 align-middle"
                  >
                    {leftQ.id}
                  </td>
                  {/* Left 그림 */}
                  <td
                    style={{ border: '1.5px solid #334155' }}
                    className="p-1 text-center align-middle"
                  >
                    <div className="w-11 h-11 mx-auto flex items-center justify-center overflow-hidden">
                      <VocabVisual
                        item={leftQ.vocabItem}
                        size="sm"
                        className="w-11 h-11 object-contain"
                      />
                    </div>
                  </td>
                  {/* Left 다국어 뜻 */}
                  <td
                    style={{ border: '1.5px solid #334155' }}
                    className="px-1.5 py-1 text-center align-middle"
                  >
                    <div className="text-[12px] sm:text-[13px] font-extrabold text-slate-900 leading-snug break-words">
                      {leftMeaning}
                    </div>
                  </td>
                  {/* Left ( A / B ) */}
                  <td
                    style={{ border: '1.5px solid #334155' }}
                    className="px-2 py-1.5 align-middle"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex-1 flex items-center justify-center overflow-hidden">
                        {renderChoicePair(leftQ)}
                      </div>
                      <div className="no-print flex items-center gap-0.5 shrink-0">
                        {isGraded && leftUser && (
                          <span
                            className={`text-xs font-black ${
                              leftUser === leftQ.answer ? 'text-emerald-700' : 'text-rose-600'
                            }`}
                          >
                            {leftUser === leftQ.answer ? '○' : '×'}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => speakKorean(leftQ.audioText)}
                          className="w-6 h-6 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
                          title="발음 듣기"
                          aria-label={`${leftQ.id}번 발음 듣기`}
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Center Gutter */}
                  <td style={{ border: 'none' }} className="bg-white p-0" aria-hidden="true" />

                  {/* Right 번호 */}
                  <td
                    style={{ border: '1.5px solid #334155' }}
                    className="text-center font-black text-sm text-slate-900 bg-slate-50/60 align-middle"
                  >
                    {rightQ.id}
                  </td>
                  {/* Right 문장 ( A / B ) */}
                  <td
                    style={{ border: '1.5px solid #334155' }}
                    className="px-2.5 py-1.5 align-middle"
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="flex-1 min-w-0">
                        <div
                          style={{ fontFamily: BADASSEUGI_FONT }}
                          className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[16.5px] sm:text-[17.5px] text-slate-950 leading-snug"
                        >
                          {rightQ.prefix && <span className="font-normal">{rightQ.prefix}</span>}
                          {renderChoicePair(rightQ)}
                          {rightQ.suffix && <span className="font-normal">{rightQ.suffix}</span>}
                        </div>
                        <div className="text-[10.5px] font-bold text-slate-500 mt-0.5 truncate">
                          뜻: {rightMeaning}
                        </div>
                      </div>

                      <div className="no-print flex items-center gap-0.5 shrink-0">
                        {isGraded && rightUser && (
                          <span
                            className={`text-xs font-black ${
                              rightUser === rightQ.answer ? 'text-emerald-700' : 'text-rose-600'
                            }`}
                          >
                            {rightUser === rightQ.answer ? '○' : '×'}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => speakKorean(rightQ.audioText)}
                          className="w-6 h-6 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer"
                          title="문장 발음 듣기"
                          aria-label={`${rightQ.id}번 문장 듣기`}
                        >
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 3. BOTTOM FOOTER */}
        <div className="mt-2 pt-1.5 border-t border-slate-300 flex items-center justify-between gap-2 text-[9.5px] sm:text-[10px] text-slate-500 font-korean-gothic font-bold">
          <span className="shrink-0">
            해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어 · 교실 한국어 {lesson.rangeLabel} 종합 ({lesson.lessonNo}/6)
          </span>
          <span className="text-[10px] text-slate-600 truncate">
            {showAnswerKey
              ? `정답: ${lesson.questions
                  .map((q) => `${q.id}.${q.answer === 'A' ? q.optionA : q.optionB}`)
                  .join(' / ')}`
              : lesson.subtitle}
          </span>
        </div>
      </div>
    </div>
  );
};
