import React, { useState } from 'react';
import { Volume2, CheckCircle2, Eye, RotateCcw } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { ManduMascot } from './ManduMascot';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';
import {
  VerbWorksheetItem,
  VERB_UNIT_1_WORKSHEET_ITEMS,
  VERB_UNIT_2_WORKSHEET_ITEMS,
  VERB_UNIT_3_WORKSHEET_ITEMS,
  VERB_UNIT_4_WORKSHEET_ITEMS,
  VERB_UNIT_5_WORKSHEET_ITEMS,
  VERB_UNIT_6_WORKSHEET_ITEMS,
  VERB_UNIT_7_WORKSHEET_ITEMS,
  VERB_UNIT_8_WORKSHEET_ITEMS,
  VERB_UNIT_9_WORKSHEET_ITEMS,
  VERB_UNIT_10_WORKSHEET_ITEMS,
  VERB_UNIT_11_WORKSHEET_ITEMS,
  VERB_UNIT_12_WORKSHEET_ITEMS,
  VERB_UNIT_13_WORKSHEET_ITEMS,
  VERB_UNIT_14_WORKSHEET_ITEMS,
  VERB_UNIT_15_WORKSHEET_ITEMS,
  VERB_UNIT_16_WORKSHEET_ITEMS,
  VERB_UNIT_17_WORKSHEET_ITEMS,
  VERB_UNIT_18_WORKSHEET_ITEMS,
  VERB_UNIT_19_WORKSHEET_ITEMS,
  VERB_UNIT_20_WORKSHEET_ITEMS,
  VERB_UNIT_21_WORKSHEET_ITEMS,
  VERB_UNIT_22_WORKSHEET_ITEMS,
  VERB_UNIT_23_WORKSHEET_ITEMS,
  VERB_UNIT_24_WORKSHEET_ITEMS,
  VERB_UNIT_25_WORKSHEET_ITEMS,
  VERB_UNIT_26_WORKSHEET_ITEMS,
  VERB_UNIT_27_WORKSHEET_ITEMS,
  VERB_UNIT_28_WORKSHEET_ITEMS,
  VERB_UNIT_29_WORKSHEET_ITEMS,
  VERB_UNIT_30_WORKSHEET_ITEMS,
} from './VerbConjugationWorksheetPage';

export interface VerbExamQuestion {
  id: number;
  /** 좌측 1~5번: 기본형→활용형 / 우측 6~10번: 문장 속 고르기 */
  kind: 'form' | 'sentence';
  unitNo: number;
  baseWord: string;
  grammarLabel?: string;
  prefix?: string;
  optionA: string;
  optionB: string;
  suffix?: string;
  answer: 'A' | 'B';
  audioText: string;
  illustrationSvg?: string;
  meanings?: Record<SupportedLanguage, string>;
}

export interface VerbExamLesson {
  /** 0 ~ 5 */
  globalIndex: number;
  id: string;
  lessonNo: number; // 1 ~ 6
  circledNo: string; // ① ~ ⑥
  rangeLabel: string; // e.g. '1~5단원'
  headerTitle: string;
  subtitle: string;
  dropdownLabel: string;
  previewMain: string;
  previewChips: string[];
  leftColHeader: string;
  rightColHeader: string;
  questions: VerbExamQuestion[];
}

const ALL_UNIT_ITEMS: Record<number, VerbWorksheetItem[]> = {
  1: VERB_UNIT_1_WORKSHEET_ITEMS,
  2: VERB_UNIT_2_WORKSHEET_ITEMS,
  3: VERB_UNIT_3_WORKSHEET_ITEMS,
  4: VERB_UNIT_4_WORKSHEET_ITEMS,
  5: VERB_UNIT_5_WORKSHEET_ITEMS,
  6: VERB_UNIT_6_WORKSHEET_ITEMS,
  7: VERB_UNIT_7_WORKSHEET_ITEMS,
  8: VERB_UNIT_8_WORKSHEET_ITEMS,
  9: VERB_UNIT_9_WORKSHEET_ITEMS,
  10: VERB_UNIT_10_WORKSHEET_ITEMS,
  11: VERB_UNIT_11_WORKSHEET_ITEMS,
  12: VERB_UNIT_12_WORKSHEET_ITEMS,
  13: VERB_UNIT_13_WORKSHEET_ITEMS,
  14: VERB_UNIT_14_WORKSHEET_ITEMS,
  15: VERB_UNIT_15_WORKSHEET_ITEMS,
  16: VERB_UNIT_16_WORKSHEET_ITEMS,
  17: VERB_UNIT_17_WORKSHEET_ITEMS,
  18: VERB_UNIT_18_WORKSHEET_ITEMS,
  19: VERB_UNIT_19_WORKSHEET_ITEMS,
  20: VERB_UNIT_20_WORKSHEET_ITEMS,
  21: VERB_UNIT_21_WORKSHEET_ITEMS,
  22: VERB_UNIT_22_WORKSHEET_ITEMS,
  23: VERB_UNIT_23_WORKSHEET_ITEMS,
  24: VERB_UNIT_24_WORKSHEET_ITEMS,
  25: VERB_UNIT_25_WORKSHEET_ITEMS,
  26: VERB_UNIT_26_WORKSHEET_ITEMS,
  27: VERB_UNIT_27_WORKSHEET_ITEMS,
  28: VERB_UNIT_28_WORKSHEET_ITEMS,
  29: VERB_UNIT_29_WORKSHEET_ITEMS,
  30: VERB_UNIT_30_WORKSHEET_ITEMS,
};

interface QuestionPickSpec {
  unitNo: number;
  itemIdx: number;
  wrong: string;
  answer: 'A' | 'B';
  grammarLabel?: string;
}

const buildFormQuestion = (id: number, spec: QuestionPickSpec): VerbExamQuestion => {
  const item = ALL_UNIT_ITEMS[spec.unitNo][spec.itemIdx];
  const correct = item.conjugatedWord;
  return {
    id,
    kind: 'form',
    unitNo: spec.unitNo,
    baseWord: item.baseWord,
    grammarLabel: spec.grammarLabel,
    optionA: spec.answer === 'A' ? correct : spec.wrong,
    optionB: spec.answer === 'B' ? correct : spec.wrong,
    answer: spec.answer,
    audioText: `${item.baseWord}, ${correct}`,
    illustrationSvg: item.illustrationSvg,
    meanings: item.meanings,
  };
};

const buildSentenceQuestion = (id: number, spec: QuestionPickSpec): VerbExamQuestion => {
  const item = ALL_UNIT_ITEMS[spec.unitNo][spec.itemIdx];
  const correct = item.sentenceHighlight;
  const fullSentence = `${item.sentencePrefix}${item.sentenceHighlight}${item.sentenceSuffix}`;
  return {
    id,
    kind: 'sentence',
    unitNo: spec.unitNo,
    baseWord: item.baseWord,
    grammarLabel: spec.grammarLabel,
    prefix: item.sentencePrefix.trimEnd(),
    optionA: spec.answer === 'A' ? correct : spec.wrong,
    optionB: spec.answer === 'B' ? correct : spec.wrong,
    suffix: item.sentenceSuffix,
    answer: spec.answer,
    audioText: fullSentence,
    illustrationSvg: item.illustrationSvg,
    meanings: item.meanings,
  };
};

/**
 * 용언 활용 5단원씩 묶어 섞은 종합 ( / ) 쪽지시험 — 총 6강 (60문항)
 * 100% 해볼한국어 기존 용언 데이터(1~30단원)와 예문·일러스트만 사용
 */
export const VERB_EXAM_LESSONS: VerbExamLesson[] = [
  // ① 1~5단원 종합 (현재형)
  {
    globalIndex: 0,
    id: 'verb_exam_1',
    lessonNo: 1,
    circledNo: '①',
    rangeLabel: '1~5단원',
    headerTitle: '해볼한국어 [용언 시험] ① 1~5단원 종합 (현재형)',
    subtitle: '현재형 -아요 · -어요 · -해요 · 불규칙/축약(★) 혼합 평가',
    dropdownLabel: '① 1강 · 1~5단원 종합 (현재형)',
    previewMain: '현재형',
    previewChips: ['1~5단원', '-아요/-어요/-해요', '10문항'],
    leftColHeader: '[1~5] 기본형 → 알맞은 현재형에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildFormQuestion(1, { unitNo: 2, itemIdx: 0, wrong: '먹아요', answer: 'A' }),
      buildFormQuestion(2, { unitNo: 1, itemIdx: 0, wrong: '받어요', answer: 'B' }),
      buildFormQuestion(3, { unitNo: 4, itemIdx: 0, wrong: '오아요', answer: 'A' }),
      buildFormQuestion(4, { unitNo: 3, itemIdx: 0, wrong: '공부하아요', answer: 'B' }),
      buildFormQuestion(5, { unitNo: 5, itemIdx: 3, wrong: '듣어요', answer: 'A' }),
      buildSentenceQuestion(6, { unitNo: 4, itemIdx: 4, wrong: '도워요', answer: 'B' }),
      buildSentenceQuestion(7, { unitNo: 5, itemIdx: 4, wrong: '부르어요', answer: 'A' }),
      buildSentenceQuestion(8, { unitNo: 1, itemIdx: 4, wrong: '닫어요', answer: 'B' }),
      buildSentenceQuestion(9, { unitNo: 3, itemIdx: 1, wrong: '청소하어요', answer: 'A' }),
      buildSentenceQuestion(10, { unitNo: 2, itemIdx: 4, wrong: '열아요', answer: 'B' }),
    ],
  },

  // ② 6~10단원 종합 (과거형)
  {
    globalIndex: 1,
    id: 'verb_exam_2',
    lessonNo: 2,
    circledNo: '②',
    rangeLabel: '6~10단원',
    headerTitle: '해볼한국어 [용언 시험] ② 6~10단원 종합 (과거형)',
    subtitle: '과거형 -았어요 · -었어요 · -했어요 · 불규칙/축약(★) 혼합 평가',
    dropdownLabel: '② 2강 · 6~10단원 종합 (과거형)',
    previewMain: '과거형',
    previewChips: ['6~10단원', '-았어요/-었어요/-했어요', '10문항'],
    leftColHeader: '[1~5] 기본형 → 알맞은 과거형에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildFormQuestion(1, { unitNo: 6, itemIdx: 2, wrong: '앉었어요', answer: 'B' }),
      buildFormQuestion(2, { unitNo: 9, itemIdx: 3, wrong: '모르았어요', answer: 'A' }),
      buildFormQuestion(3, { unitNo: 7, itemIdx: 4, wrong: '만들았어요', answer: 'B' }),
      buildFormQuestion(4, { unitNo: 10, itemIdx: 4, wrong: '춥었어요', answer: 'A' }),
      buildFormQuestion(5, { unitNo: 8, itemIdx: 0, wrong: '시작하았어요', answer: 'B' }),
      buildSentenceQuestion(6, { unitNo: 10, itemIdx: 0, wrong: '그리었어요', answer: 'A' }),
      buildSentenceQuestion(7, { unitNo: 6, itemIdx: 4, wrong: '좋었어요', answer: 'B' }),
      buildSentenceQuestion(8, { unitNo: 8, itemIdx: 2, wrong: '정리하었어요', answer: 'A' }),
      buildSentenceQuestion(9, { unitNo: 9, itemIdx: 0, wrong: '타았어요', answer: 'B' }),
      buildSentenceQuestion(10, { unitNo: 7, itemIdx: 2, wrong: '웃았어요', answer: 'A' }),
    ],
  },

  // ③ 11~15단원 종합 (부정 · 희망 · 진행 · 요청)
  {
    globalIndex: 2,
    id: 'verb_exam_3',
    lessonNo: 3,
    circledNo: '③',
    rangeLabel: '11~15단원',
    headerTitle: '해볼한국어 [용언 시험] ③ 11~15단원 종합 (부정·희망·진행·요청)',
    subtitle: '안/못 · -고 싶어요 · -고 있어요 · -(으)세요 혼합 평가',
    dropdownLabel: '③ 3강 · 11~15단원 종합 (부정~요청)',
    previewMain: '부정~요청',
    previewChips: ['11~15단원', '안/못·희망·진행·요청', '10문항'],
    leftColHeader: '[1~5] 기본형 → 알맞은 표현에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildFormQuestion(1, { unitNo: 11, itemIdx: 0, wrong: '울어요 안', answer: 'A', grammarLabel: '부정' }),
      buildFormQuestion(2, { unitNo: 13, itemIdx: 0, wrong: '배워고 싶어요', answer: 'B', grammarLabel: '희망' }),
      buildFormQuestion(3, { unitNo: 15, itemIdx: 3, wrong: '걷으세요', answer: 'A', grammarLabel: '요청' }),
      buildFormQuestion(4, { unitNo: 12, itemIdx: 0, wrong: '안 게임해요', answer: 'B', grammarLabel: '부정' }),
      buildFormQuestion(5, { unitNo: 14, itemIdx: 0, wrong: '일해고 있어요', answer: 'A', grammarLabel: '진행' }),
      buildSentenceQuestion(6, { unitNo: 15, itemIdx: 4, wrong: '풀세요', answer: 'B', grammarLabel: '요청' }),
      buildSentenceQuestion(7, { unitNo: 12, itemIdx: 2, wrong: '못 요리해요', answer: 'A', grammarLabel: '부정' }),
      buildSentenceQuestion(8, { unitNo: 14, itemIdx: 4, wrong: '물어봐고 있어요', answer: 'B', grammarLabel: '진행' }),
      buildSentenceQuestion(9, { unitNo: 11, itemIdx: 3, wrong: '못 참어요', answer: 'A', grammarLabel: '부정' }),
      buildSentenceQuestion(10, { unitNo: 13, itemIdx: 1, wrong: '만나고 싶아요', answer: 'B', grammarLabel: '희망' }),
    ],
  },

  // ④ 16~20단원 종합 (금지 · 미래 · 부탁 · 허락 · 의무)
  {
    globalIndex: 3,
    id: 'verb_exam_4',
    lessonNo: 4,
    circledNo: '④',
    rangeLabel: '16~20단원',
    headerTitle: '해볼한국어 [용언 시험] ④ 16~20단원 종합 (금지·미래·부탁·허락·의무)',
    subtitle: '-지 마세요 · -(으)ㄹ 거예요 · -아/어/해 주세요 · 돼요 혼합 평가',
    dropdownLabel: '④ 4강 · 16~20단원 종합 (금지~의무)',
    previewMain: '금지~의무',
    previewChips: ['16~20단원', '금지·미래·부탁·허락·의무', '10문항'],
    leftColHeader: '[1~5] 기본형 → 알맞은 표현에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildFormQuestion(1, { unitNo: 17, itemIdx: 2, wrong: '살을 거예요', answer: 'B', grammarLabel: '미래' }),
      buildFormQuestion(2, { unitNo: 16, itemIdx: 0, wrong: '뛰어지 마세요', answer: 'A', grammarLabel: '금지' }),
      buildFormQuestion(3, { unitNo: 19, itemIdx: 2, wrong: '빌리어도 돼요?', answer: 'B', grammarLabel: '허락' }),
      buildFormQuestion(4, { unitNo: 18, itemIdx: 0, wrong: '기다리 주세요', answer: 'A', grammarLabel: '부탁' }),
      buildFormQuestion(5, { unitNo: 20, itemIdx: 4, wrong: '바르아야 돼요', answer: 'B', grammarLabel: '의무' }),
      buildSentenceQuestion(6, { unitNo: 18, itemIdx: 4, wrong: '끄어 주세요', answer: 'A', grammarLabel: '부탁' }),
      buildSentenceQuestion(7, { unitNo: 20, itemIdx: 3, wrong: '지키어야 돼요', answer: 'B', grammarLabel: '의무' }),
      buildSentenceQuestion(8, { unitNo: 16, itemIdx: 4, wrong: '버려지 마세요', answer: 'A', grammarLabel: '금지' }),
      buildSentenceQuestion(9, { unitNo: 19, itemIdx: 3, wrong: '사용하아도 돼요?', answer: 'B', grammarLabel: '허락' }),
      buildSentenceQuestion(10, { unitNo: 17, itemIdx: 3, wrong: '놓 거예요', answer: 'A', grammarLabel: '미래' }),
    ],
  },

  // ⑤ 21~25단원 종합 (능력 · 제안 · 나열 · 대조 · 이유)
  {
    globalIndex: 4,
    id: 'verb_exam_5',
    lessonNo: 5,
    circledNo: '⑤',
    rangeLabel: '21~25단원',
    headerTitle: '해볼한국어 [용언 시험] ⑤ 21~25단원 종합 (능력·제안·나열·대조·이유)',
    subtitle: '-(으)ㄹ 수 있어요 · -(으)ㄹ까요? · -고 · -지만 · -아/어/해서 혼합 평가',
    dropdownLabel: '⑤ 5강 · 21~25단원 종합 (능력~이유)',
    previewMain: '능력~이유',
    previewChips: ['21~25단원', '능력·제안·나열·대조·이유', '10문항'],
    leftColHeader: '[1~5] 기본형 → 알맞은 표현에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildFormQuestion(1, { unitNo: 21, itemIdx: 2, wrong: '접 수 있어요', answer: 'A', grammarLabel: '능력' }),
      buildFormQuestion(2, { unitNo: 25, itemIdx: 2, wrong: '덥어서', answer: 'B', grammarLabel: '이유' }),
      buildFormQuestion(3, { unitNo: 22, itemIdx: 0, wrong: '나누을까요?', answer: 'A', grammarLabel: '제안' }),
      buildFormQuestion(4, { unitNo: 24, itemIdx: 0, wrong: '어려워지만', answer: 'B', grammarLabel: '대조' }),
      buildFormQuestion(5, { unitNo: 23, itemIdx: 0, wrong: '세수해고', answer: 'A', grammarLabel: '나열' }),
      buildSentenceQuestion(6, { unitNo: 24, itemIdx: 2, wrong: '무거워지만', answer: 'B', grammarLabel: '대조' }),
      buildSentenceQuestion(7, { unitNo: 23, itemIdx: 3, wrong: '치워고', answer: 'A', grammarLabel: '나열' }),
      buildSentenceQuestion(8, { unitNo: 25, itemIdx: 3, wrong: '빠르아서', answer: 'B', grammarLabel: '이유' }),
      buildSentenceQuestion(9, { unitNo: 21, itemIdx: 1, wrong: '날을 수 있어요', answer: 'A', grammarLabel: '능력' }),
      buildSentenceQuestion(10, { unitNo: 22, itemIdx: 1, wrong: '바꾸을까요?', answer: 'B', grammarLabel: '제안' }),
    ],
  },

  // ⑥ 26~30단원 종합 (조건 · 시간 · 목적 · 순서 · 경험)
  {
    globalIndex: 5,
    id: 'verb_exam_6',
    lessonNo: 6,
    circledNo: '⑥',
    rangeLabel: '26~30단원',
    headerTitle: '해볼한국어 [용언 시험] ⑥ 26~30단원 종합 (조건·시간·목적·순서·경험)',
    subtitle: '-(으)면 · -(으)ㄹ 때 · -(으)러 가요 · -기 전에/-(으)ㄴ 후에 · -아/어/해 봤어요',
    dropdownLabel: '⑥ 6강 · 26~30단원 종합 (조건~경험)',
    previewMain: '조건~경험',
    previewChips: ['26~30단원', '조건·시간·목적·순서·경험', '10문항'],
    leftColHeader: '[1~5] 기본형 → 알맞은 표현에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildFormQuestion(1, { unitNo: 26, itemIdx: 4, wrong: '작면', answer: 'B', grammarLabel: '조건' }),
      buildFormQuestion(2, { unitNo: 28, itemIdx: 3, wrong: '심러 가요', answer: 'A', grammarLabel: '목적' }),
      buildFormQuestion(3, { unitNo: 30, itemIdx: 4, wrong: '묻어봤어요', answer: 'B', grammarLabel: '경험' }),
      buildFormQuestion(4, { unitNo: 27, itemIdx: 3, wrong: '벗 때', answer: 'A', grammarLabel: '시간' }),
      buildFormQuestion(5, { unitNo: 29, itemIdx: 4, wrong: '섞기 후에', answer: 'B', grammarLabel: '순서' }),
      buildSentenceQuestion(6, { unitNo: 29, itemIdx: 0, wrong: '양치한 전에', answer: 'A', grammarLabel: '순서' }),
      buildSentenceQuestion(7, { unitNo: 26, itemIdx: 1, wrong: '그렇으면', answer: 'B', grammarLabel: '조건' }),
      buildSentenceQuestion(8, { unitNo: 30, itemIdx: 1, wrong: '춤추아 봤어요', answer: 'A', grammarLabel: '경험' }),
      buildSentenceQuestion(9, { unitNo: 27, itemIdx: 0, wrong: '발표하을 때', answer: 'B', grammarLabel: '시간' }),
      buildSentenceQuestion(10, { unitNo: 28, itemIdx: 0, wrong: '구경하으러 가요', answer: 'A', grammarLabel: '목적' }),
    ],
  },
];

const BADASSEUGI_FONT =
  "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif";

interface VerbExamSheetProps {
  lesson: VerbExamLesson;
  lang?: SupportedLanguage;
  onPrintSingle?: () => void;
}

export const VerbExamSheet: React.FC<VerbExamSheetProps> = ({
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

  const getOptionCircleStyle = (q: VerbExamQuestion, optKey: 'A' | 'B') => {
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
      return 'border-2 border-purple-700 bg-purple-50 text-slate-950 rounded-full';
    }
    return 'border-2 border-transparent hover:border-slate-400 rounded-full text-slate-950';
  };

  const renderChoicePair = (q: VerbExamQuestion) => {
    const totalLen = q.optionA.length + q.optionB.length;
    const sizeClass =
      totalLen >= 13
        ? 'text-[13.5px]'
        : totalLen >= 10
        ? 'text-[14.5px]'
        : totalLen >= 8
        ? 'text-[16px]'
        : 'text-[17.5px]';

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

  return (
    <div className="w-full max-w-[1040px] mx-auto flex flex-col">
      {/* Authentic Haebol Korean A4 Landscape Worksheet Sheet */}
      <div
        className="verb-worksheet-page chapter-extra-a4-sheet print-sheet printable-a4-page print:m-0 print:p-2 print:shadow-none print:border-none w-full bg-white rounded-xl shadow-lg border-2 border-slate-300 p-2.5 sm:p-3 text-slate-900 flex flex-col justify-between font-korean-gothic"
        style={{ minHeight: '620px' }}
      >
        {/* 1. HEADER ROW — exact VerbConjugationWorksheetPage & PrintableWordWorksheetPage style */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 border-b-2 border-slate-700 pb-1 mb-2 text-slate-900 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <ManduMascot size="xs" interactive={false} />
            <h1 className="text-xs sm:text-sm md:text-[15.5px] font-black text-slate-950 font-korean-gothic tracking-tight break-keep">
              {lesson.headerTitle}
            </h1>
          </div>

          <div className="text-[11px] sm:text-xs font-extrabold text-slate-800 flex items-center gap-2.5 sm:gap-4 font-korean-gothic shrink-0">
            <div className="no-print flex items-center gap-1">
              <button
                type="button"
                onClick={handleGrade}
                className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 border border-purple-300 text-purple-800 text-[11px] font-bold cursor-pointer transition-colors"
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
                className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold border cursor-pointer transition-colors ${
                  showAnswerKey
                    ? 'bg-rose-100 border-rose-400 text-rose-800'
                    : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Eye className="w-3 h-3" />
                {showAnswerKey ? '숨김' : '정답'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-50 border border-slate-300 text-slate-600 hover:bg-slate-100 cursor-pointer"
                title="초기화"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
            <span>학년: ________</span>
            <span>이름: ______________</span>
            <span>점수: {isGraded ? ` ${correctCount} ` : '____'} / 10</span>
          </div>
        </div>

        {/* 2. UNIFIED SINGLE TABLE (Q1~5 paired with Q6~10 in identical <tr> rows for laser-straight horizontal alignment) */}
        <table className="w-full table-fixed border-collapse flex-1 bg-white">
          <colgroup>
            <col style={{ width: '3.5%' }} />
            <col style={{ width: '6%' }} />
            <col style={{ width: '10.5%' }} />
            <col style={{ width: '29.5%' }} />
            <col style={{ width: '1%' }} />
            <col style={{ width: '3.5%' }} />
            <col style={{ width: '46%' }} />
          </colgroup>
          <thead>
            <tr className="text-slate-950 font-black text-[11px] sm:text-xs">
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-purple-50/80 py-1.5 text-center"
              >
                번호
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-purple-50/80 py-1.5 text-center"
              >
                그림
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-purple-50/80 py-1.5 text-center"
              >
                기본형
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-purple-50/80 py-1.5 px-1.5 text-center"
              >
                {lesson.leftColHeader}
              </th>
              <th style={{ border: 'none' }} className="bg-white p-0" aria-hidden="true" />
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-purple-50/80 py-1.5 text-center"
              >
                번호
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-purple-50/80 py-1.5 px-2 text-center"
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
              const leftMeaning = leftQ.meanings?.[resolvedLang] || leftQ.meanings?.en || '';
              const rightMeaning = rightQ.meanings?.[resolvedLang] || rightQ.meanings?.en || '';

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
                    {leftQ.illustrationSvg && (
                      <img
                        src={leftQ.illustrationSvg}
                        alt={`${leftQ.baseWord} 그림`}
                        className="w-11 h-11 object-contain mx-auto select-none pointer-events-none"
                        loading="eager"
                        decoding="sync"
                      />
                    )}
                  </td>
                  {/* Left 기본형 */}
                  <td
                    style={{ border: '1.5px solid #334155' }}
                    className="px-1.5 py-1 text-center align-middle"
                  >
                    <div
                      style={{ fontFamily: BADASSEUGI_FONT }}
                      className="text-[17px] sm:text-[18.5px] font-black text-slate-950 leading-tight break-keep"
                    >
                      {leftQ.baseWord}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 mt-0.5 leading-tight truncate">
                      {leftQ.grammarLabel ? `[${leftQ.grammarLabel}] ` : ''}
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
                        <div className="text-[10px] font-bold text-slate-500 mt-0.5 truncate">
                          {rightQ.baseWord}
                          {rightQ.grammarLabel ? ` · ${rightQ.grammarLabel}` : ''}
                          {rightMeaning ? ` (${rightMeaning})` : ''}
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

        {/* 3. BOTTOM NOTE & FOOTER — exact VerbConjugationWorksheetPage footer */}
        <div className="mt-2 pt-1.5 border-t border-slate-300 flex items-center justify-between gap-2 text-[9.5px] sm:text-[10px] text-slate-500 font-korean-gothic font-bold">
          <span className="shrink-0">
            해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어 · {lesson.rangeLabel} 종합 ({lesson.lessonNo}/6)
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
