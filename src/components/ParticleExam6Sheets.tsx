import React, { useState } from 'react';
import { Volume2, CheckCircle2, Eye, RotateCcw } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { ManduMascot } from './ManduMascot';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';
import {
  PARTICLE_COLS_BY_UNIT,
  ParticleUnitId,
} from '../data/particleWorksheetData';

export interface ParticleExamQuestion {
  id: number;
  kind: 'form' | 'sentence';
  unitId: ParticleUnitId;
  baseNoun: string;
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

export interface ParticleExamLesson {
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
  questions: ParticleExamQuestion[];
}

interface ParticlePickSpec {
  unitId: ParticleUnitId;
  itemIdx: number;
  wrong: string;
  answer: 'A' | 'B';
  grammarLabel?: string;
}

const buildParticleFormQuestion = (
  id: number,
  spec: ParticlePickSpec
): ParticleExamQuestion => {
  const items = PARTICLE_COLS_BY_UNIT[spec.unitId] || [];
  const item = items[spec.itemIdx];
  const correct = item.combinedWord;
  return {
    id,
    kind: 'form',
    unitId: spec.unitId,
    baseNoun: item.baseNoun,
    grammarLabel: spec.grammarLabel,
    optionA: spec.answer === 'A' ? correct : spec.wrong,
    optionB: spec.answer === 'B' ? correct : spec.wrong,
    answer: spec.answer,
    audioText: `${item.baseNoun}, ${correct}`,
    illustrationSvg: item.illustrationSvg,
    meanings: item.meanings,
  };
};

const buildParticleSentenceQuestion = (
  id: number,
  spec: ParticlePickSpec
): ParticleExamQuestion => {
  const items = PARTICLE_COLS_BY_UNIT[spec.unitId] || [];
  const item = items[spec.itemIdx];
  // Remove trailing punctuation from highlight if included (e.g. '지우개예요.' or '민수야,')
  const rawHighlight = item.sentenceHighlight;
  const trailingPunctMatch = rawHighlight.match(/([.,?!]+)$/);
  const trailingPunct = trailingPunctMatch ? trailingPunctMatch[1] : '';
  const cleanCorrect = trailingPunct
    ? rawHighlight.slice(0, -trailingPunct.length)
    : rawHighlight;
  const fullSentence = `${item.sentencePrefix}${item.sentenceHighlight}${item.sentenceSuffix}`;

  return {
    id,
    kind: 'sentence',
    unitId: spec.unitId,
    baseNoun: item.baseNoun,
    grammarLabel: spec.grammarLabel,
    prefix: item.sentencePrefix.trimEnd(),
    optionA: spec.answer === 'A' ? cleanCorrect : spec.wrong,
    optionB: spec.answer === 'B' ? cleanCorrect : spec.wrong,
    suffix: `${trailingPunct}${item.sentenceSuffix}`,
    answer: spec.answer,
    audioText: fullSentence,
    illustrationSvg: item.illustrationSvg,
    meanings: item.meanings,
  };
};

/**
 * 조사 결합 5단원씩 묶어 섞은 종합 ( / ) 쪽지시험 — 총 6강 (60문항)
 * 100% 해볼한국어 기존 조사 데이터(1~30단원)와 예문·일러스트만 사용
 */
export const PARTICLE_EXAM_LESSONS: ParticleExamLesson[] = [
  // ① 1~5단원 종합 (은/는 · 이에요/예요 · 이/가 · 내가/네가/제가/누가)
  {
    globalIndex: 0,
    id: 'particle_exam_1',
    lessonNo: 1,
    circledNo: '①',
    rangeLabel: '1~5단원',
    headerTitle: '해볼한국어 [조사 시험] ① 1~5단원 종합 (은/는 · 이에요/예요 · 이/가)',
    subtitle: '은/는 · 이에요/예요 · 이/가 · 내가/네가/제가/누가 혼합 평가',
    dropdownLabel: '① 1강 · 1~5단원 종합 (은/는·이에요·이/가)',
    previewMain: '은/는·이/가',
    previewChips: ['1~5단원', '은/는·이에요·이/가', '10문항'],
    leftColHeader: '[1~5] 명사 → 알맞은 조사에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildParticleFormQuestion(1, { unitId: 'unit1', itemIdx: 0, wrong: '나은', answer: 'A', grammarLabel: '은/는' }),
      buildParticleFormQuestion(2, { unitId: 'unit2', itemIdx: 0, wrong: '학생예요', answer: 'B', grammarLabel: '이에요/예요' }),
      buildParticleFormQuestion(3, { unitId: 'unit4', itemIdx: 0, wrong: '물가', answer: 'A', grammarLabel: '이/가' }),
      buildParticleFormQuestion(4, { unitId: 'unit5', itemIdx: 0, wrong: '나가', answer: 'B', grammarLabel: '이/가 ★' }),
      buildParticleFormQuestion(5, { unitId: 'unit2', itemIdx: 3, wrong: '의자이에요', answer: 'A', grammarLabel: '이에요/예요' }),
      buildParticleSentenceQuestion(6, { unitId: 'unit1', itemIdx: 2, wrong: '동생는', answer: 'B', grammarLabel: '은/는' }),
      buildParticleSentenceQuestion(7, { unitId: 'unit5', itemIdx: 3, wrong: '누구가', answer: 'A', grammarLabel: '이/가 ★' }),
      buildParticleSentenceQuestion(8, { unitId: 'unit4', itemIdx: 3, wrong: '배이', answer: 'B', grammarLabel: '이/가' }),
      buildParticleSentenceQuestion(9, { unitId: 'unit2', itemIdx: 4, wrong: '지우개이에요', answer: 'A', grammarLabel: '이에요/예요' }),
      buildParticleSentenceQuestion(10, { unitId: 'unit5', itemIdx: 2, wrong: '저가', answer: 'B', grammarLabel: '이/가 ★' }),
    ],
  },

  // ② 6~10단원 종합 (을/를 · 에 · 에서 · 도)
  {
    globalIndex: 1,
    id: 'particle_exam_2',
    lessonNo: 2,
    circledNo: '②',
    rangeLabel: '6~10단원',
    headerTitle: '해볼한국어 [조사 시험] ② 6~10단원 종합 (을/를 · 에 · 에서 · 도)',
    subtitle: '목적격 을/를 · 장소·시간 에 · 동작 장소 에서 · 추가 도 혼합 평가',
    dropdownLabel: '② 2강 · 6~10단원 종합 (을/를·에·에서·도)',
    previewMain: '을/를·에·에서',
    previewChips: ['6~10단원', '을/를·에·에서·도', '10문항'],
    leftColHeader: '[1~5] 명사 → 알맞은 조사에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildParticleFormQuestion(1, { unitId: 'unit6', itemIdx: 0, wrong: '밥를', answer: 'B', grammarLabel: '을/를' }),
      buildParticleFormQuestion(2, { unitId: 'unit8', itemIdx: 1, wrong: '집을', answer: 'A', grammarLabel: '장소 에' }),
      buildParticleFormQuestion(3, { unitId: 'unit9', itemIdx: 0, wrong: '교실에', answer: 'B', grammarLabel: '동작 에서' }),
      buildParticleFormQuestion(4, { unitId: 'unit6', itemIdx: 3, wrong: '우유을', answer: 'A', grammarLabel: '을/를' }),
      buildParticleFormQuestion(5, { unitId: 'unit10', itemIdx: 1, wrong: '친구이도', answer: 'B', grammarLabel: '추가 도' }),
      buildParticleSentenceQuestion(6, { unitId: 'unit9', itemIdx: 1, wrong: '운동장에', answer: 'A', grammarLabel: '동작 에서' }),
      buildParticleSentenceQuestion(7, { unitId: 'unit6', itemIdx: 4, wrong: '사과을', answer: 'B', grammarLabel: '을/를' }),
      buildParticleSentenceQuestion(8, { unitId: 'unit8', itemIdx: 3, wrong: '아침에서', answer: 'A', grammarLabel: '시간 에' }),
      buildParticleSentenceQuestion(9, { unitId: 'unit10', itemIdx: 4, wrong: '우산이도', answer: 'B', grammarLabel: '추가 도' }),
      buildParticleSentenceQuestion(10, { unitId: 'unit9', itemIdx: 2, wrong: '도서관에', answer: 'A', grammarLabel: '동작 에서' }),
    ],
  },

  // ③ 11~15단원 종합 (와/과 · 하고 · (이)랑 · 으로/로 · 에게/한테)
  {
    globalIndex: 2,
    id: 'particle_exam_3',
    lessonNo: 3,
    circledNo: '③',
    rangeLabel: '11~15단원',
    headerTitle: '해볼한국어 [조사 시험] ③ 11~15단원 종합 (와/과 · (이)랑 · (으)로 · 에게)',
    subtitle: '나열·동반 와/과·(이)랑 · 방향·수단 (으)로 · 행동 대상 에게/한테 혼합 평가',
    dropdownLabel: '③ 3강 · 11~15단원 종합 (와/과·(으)로·에게)',
    previewMain: '와/과·(으)로',
    previewChips: ['11~15단원', '와/과·(이)랑·(으)로·에게', '10문항'],
    leftColHeader: '[1~5] 명사 → 알맞은 조사에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildParticleFormQuestion(1, { unitId: 'unit12', itemIdx: 3, wrong: '책와', answer: 'A', grammarLabel: '와/과' }),
      buildParticleFormQuestion(2, { unitId: 'unit13', itemIdx: 0, wrong: '학교으로', answer: 'B', grammarLabel: '으로/로' }),
      buildParticleFormQuestion(3, { unitId: 'unit12', itemIdx: 2, wrong: '연필랑', answer: 'A', grammarLabel: '(이)랑' }),
      buildParticleFormQuestion(4, { unitId: 'unit13', itemIdx: 2, wrong: '연필으로', answer: 'B', grammarLabel: 'ㄹ 받침 → 로' }),
      buildParticleFormQuestion(5, { unitId: 'unit14', itemIdx: 1, wrong: '친구에서', answer: 'A', grammarLabel: '대상 에게' }),
      buildParticleSentenceQuestion(6, { unitId: 'unit12', itemIdx: 1, wrong: '우유과', answer: 'B', grammarLabel: '와/과' }),
      buildParticleSentenceQuestion(7, { unitId: 'unit13', itemIdx: 4, wrong: '숟가락로', answer: 'A', grammarLabel: '으로/로' }),
      buildParticleSentenceQuestion(8, { unitId: 'unit12', itemIdx: 4, wrong: '친구이랑', answer: 'B', grammarLabel: '(이)랑' }),
      buildParticleSentenceQuestion(9, { unitId: 'unit14', itemIdx: 2, wrong: '동생으로', answer: 'A', grammarLabel: '대상 한테' }),
      buildParticleSentenceQuestion(10, { unitId: 'unit13', itemIdx: 3, wrong: '버스으로', answer: 'B', grammarLabel: '으로/로' }),
    ],
  },

  // ④ 16~20단원 종합 (부터/까지 · (이)나 · 마다 · 만)
  {
    globalIndex: 3,
    id: 'particle_exam_4',
    lessonNo: 4,
    circledNo: '④',
    rangeLabel: '16~20단원',
    headerTitle: '해볼한국어 [조사 시험] ④ 16~20단원 종합 (부터/까지 · (이)나 · 마다 · 만)',
    subtitle: '시작·끝 부터/까지 · 선택 (이)나 · 반복 마다 · 한정 만 혼합 평가',
    dropdownLabel: '④ 4강 · 16~20단원 종합 (부터·(이)나·마다·만)',
    previewMain: '부터·(이)나·만',
    previewChips: ['16~20단원', '부터/까지·(이)나·마다·만', '10문항'],
    leftColHeader: '[1~5] 명사 → 알맞은 조사에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildParticleFormQuestion(1, { unitId: 'unit16', itemIdx: 0, wrong: '아침까지', answer: 'A', grammarLabel: '시작 부터' }),
      buildParticleFormQuestion(2, { unitId: 'unit17', itemIdx: 0, wrong: '빵나', answer: 'B', grammarLabel: '선택 (이)나' }),
      buildParticleFormQuestion(3, { unitId: 'unit18', itemIdx: 1, wrong: '아침부터', answer: 'A', grammarLabel: '반복 마다' }),
      buildParticleFormQuestion(4, { unitId: 'unit17', itemIdx: 3, wrong: '사과이나', answer: 'B', grammarLabel: '선택 (이)나' }),
      buildParticleFormQuestion(5, { unitId: 'unit20', itemIdx: 0, wrong: '물도', answer: 'A', grammarLabel: '한정 만' }),
      buildParticleSentenceQuestion(6, { unitId: 'unit17', itemIdx: 1, wrong: '물나', answer: 'B', grammarLabel: '선택 (이)나' }),
      buildParticleSentenceQuestion(7, { unitId: 'unit18', itemIdx: 2, wrong: '주말이나', answer: 'A', grammarLabel: '반복 마다' }),
      buildParticleSentenceQuestion(8, { unitId: 'unit17', itemIdx: 4, wrong: '버스이나', answer: 'B', grammarLabel: '선택 (이)나' }),
      buildParticleSentenceQuestion(9, { unitId: 'unit20', itemIdx: 4, wrong: '사과이나', answer: 'A', grammarLabel: '한정 만' }),
      buildParticleSentenceQuestion(10, { unitId: 'unit16', itemIdx: 3, wrong: '몇 시이나', answer: 'B', grammarLabel: '끝 까지' }),
    ],
  },

  // ⑤ 21~25단원 종합 (밖에 · 보다 · 처럼/같이 · 의/내/네/제)
  {
    globalIndex: 4,
    id: 'particle_exam_5',
    lessonNo: 5,
    circledNo: '⑤',
    rangeLabel: '21~25단원',
    headerTitle: '해볼한국어 [조사 시험] ⑤ 21~25단원 종합 (밖에 · 보다 · 처럼 · 의/내/제)',
    subtitle: '부정 한정 밖에 · 비교 보다 · 비유 처럼/같이 · 소유 의/내/네/제 혼합 평가',
    dropdownLabel: '⑤ 5강 · 21~25단원 종합 (밖에·보다·처럼·의)',
    previewMain: '밖에·보다·처럼',
    previewChips: ['21~25단원', '밖에·보다·처럼·의', '10문항'],
    leftColHeader: '[1~5] 명사 → 알맞은 조사에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildParticleFormQuestion(1, { unitId: 'unit21', itemIdx: 0, wrong: '하나보다', answer: 'A', grammarLabel: '부정 밖에' }),
      buildParticleFormQuestion(2, { unitId: 'unit22', itemIdx: 0, wrong: '형처럼', answer: 'B', grammarLabel: '비교 보다' }),
      buildParticleFormQuestion(3, { unitId: 'unit24', itemIdx: 3, wrong: '눈보다', answer: 'A', grammarLabel: '비유 처럼' }),
      buildParticleFormQuestion(4, { unitId: 'unit25', itemIdx: 2, wrong: '나가', answer: 'B', grammarLabel: '소유 ★' }),
      buildParticleFormQuestion(5, { unitId: 'unit25', itemIdx: 4, wrong: '저가', answer: 'A', grammarLabel: '소유 ★' }),
      buildParticleSentenceQuestion(6, { unitId: 'unit21', itemIdx: 2, wrong: '나보다', answer: 'B', grammarLabel: '밖에+없어요' }),
      buildParticleSentenceQuestion(7, { unitId: 'unit22', itemIdx: 2, wrong: '버스밖에', answer: 'A', grammarLabel: '비교 보다' }),
      buildParticleSentenceQuestion(8, { unitId: 'unit24', itemIdx: 4, wrong: '별보다', answer: 'B', grammarLabel: '비유 처럼' }),
      buildParticleSentenceQuestion(9, { unitId: 'unit25', itemIdx: 0, wrong: '친구보다', answer: 'A', grammarLabel: '소유 의' }),
      buildParticleSentenceQuestion(10, { unitId: 'unit21', itemIdx: 4, wrong: '빵처럼', answer: 'B', grammarLabel: '밖에+안' }),
    ],
  },

  // ⑥ 26~30단원 종합 (끼리 · 께서/께 · 아/야)
  {
    globalIndex: 5,
    id: 'particle_exam_6',
    lessonNo: 6,
    circledNo: '⑥',
    rangeLabel: '26~30단원',
    headerTitle: '해볼한국어 [조사 시험] ⑥ 26~30단원 종합 (끼리 · 께서/께 · 아/야)',
    subtitle: '무리 끼리 · 높임 께서/께 · 부름 아/야 혼합 평가',
    dropdownLabel: '⑥ 6강 · 26~30단원 종합 (끼리·께서/께·아/야)',
    previewMain: '끼리·께서·아/야',
    previewChips: ['26~30단원', '끼리·께서/께·아/야', '10문항'],
    leftColHeader: '[1~5] 명사 → 알맞은 조사에 ○ 표 하세요',
    rightColHeader: '[6~10] 문장에 알맞은 말에 ○ 표 하세요',
    questions: [
      buildParticleFormQuestion(1, { unitId: 'unit26', itemIdx: 0, wrong: '친구께', answer: 'A', grammarLabel: '무리 끼리' }),
      buildParticleFormQuestion(2, { unitId: 'unit28', itemIdx: 0, wrong: '할머니께', answer: 'B', grammarLabel: '높임 주어' }),
      buildParticleFormQuestion(3, { unitId: 'unit28', itemIdx: 2, wrong: '부모님께서', answer: 'A', grammarLabel: '높임 대상' }),
      buildParticleFormQuestion(4, { unitId: 'unit29', itemIdx: 0, wrong: '민수아', answer: 'B', grammarLabel: '부름 아/야' }),
      buildParticleFormQuestion(5, { unitId: 'unit29', itemIdx: 1, wrong: '수진야', answer: 'A', grammarLabel: '부름 아/야' }),
      buildParticleSentenceQuestion(6, { unitId: 'unit28', itemIdx: 1, wrong: '선생님께', answer: 'B', grammarLabel: '높임 주어' }),
      buildParticleSentenceQuestion(7, { unitId: 'unit29', itemIdx: 3, wrong: '친구아', answer: 'A', grammarLabel: '부름 아/야' }),
      buildParticleSentenceQuestion(8, { unitId: 'unit26', itemIdx: 2, wrong: '남자께', answer: 'B', grammarLabel: '무리 끼리' }),
      buildParticleSentenceQuestion(9, { unitId: 'unit28', itemIdx: 3, wrong: '할아버지께서', answer: 'A', grammarLabel: '높임 대상' }),
      buildParticleSentenceQuestion(10, { unitId: 'unit29', itemIdx: 4, wrong: '동생야', answer: 'B', grammarLabel: '부름 아/야' }),
    ],
  },
];

const BADASSEUGI_FONT =
  "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif";

interface ParticleExamSheetProps {
  lesson: ParticleExamLesson;
  lang?: SupportedLanguage;
  onPrintSingle?: () => void;
}

export const ParticleExamSheet: React.FC<ParticleExamSheetProps> = ({
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

  const getOptionCircleStyle = (q: ParticleExamQuestion, optKey: 'A' | 'B') => {
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
      return 'border-2 border-emerald-700 bg-emerald-50 text-slate-950 rounded-full';
    }
    return 'border-2 border-transparent hover:border-slate-400 rounded-full text-slate-950';
  };

  const renderChoicePair = (q: ParticleExamQuestion) => {
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
        {/* 1. HEADER ROW */}
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
                className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-bold cursor-pointer transition-colors"
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

        {/* 2. UNIFIED SINGLE TABLE (Laser-straight horizontal rows) */}
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
                className="bg-emerald-50/80 py-1.5 text-center"
              >
                번호
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-emerald-50/80 py-1.5 text-center"
              >
                그림
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-emerald-50/80 py-1.5 text-center"
              >
                명사
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-emerald-50/80 py-1.5 px-1.5 text-center"
              >
                {lesson.leftColHeader}
              </th>
              <th style={{ border: 'none' }} className="bg-white p-0" aria-hidden="true" />
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-emerald-50/80 py-1.5 text-center"
              >
                번호
              </th>
              <th
                style={{ border: '1.5px solid #334155' }}
                className="bg-emerald-50/80 py-1.5 px-2 text-center"
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
                        alt={`${leftQ.baseNoun} 그림`}
                        className="w-11 h-11 object-contain mx-auto select-none pointer-events-none"
                        loading="eager"
                        decoding="sync"
                      />
                    )}
                  </td>
                  {/* Left 명사 */}
                  <td
                    style={{ border: '1.5px solid #334155' }}
                    className="px-1.5 py-1 text-center align-middle"
                  >
                    <div
                      style={{ fontFamily: BADASSEUGI_FONT }}
                      className="text-[17px] sm:text-[18.5px] font-black text-slate-950 leading-tight break-keep"
                    >
                      {leftQ.baseNoun}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 mt-0.5 leading-tight truncate">
                      {leftQ.grammarLabel ? `[${leftQ.grammarLabel}]` : leftMeaning}
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
                          {rightQ.baseNoun}
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

        {/* 3. BOTTOM FOOTER */}
        <div className="mt-2 pt-1.5 border-t border-slate-300 flex items-center justify-between gap-2 text-[9.5px] sm:text-[10px] text-slate-500 font-korean-gothic font-bold">
          <span className="shrink-0">
            해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어 · 조사 {lesson.rangeLabel} 종합 ({lesson.lessonNo}/6)
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
