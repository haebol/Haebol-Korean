import React from 'react';
import { LearningTrack, SupportedLanguage } from '../types';
import { ManduMascot } from './ManduMascot';
import { MiniJollaman, MiniJollaPose } from './HangeulJollaQuizAndGameSheets';
import { VocabVisual } from './VocabVisual';
import {
  VOCABULARY_DATA,
  CHAPTER_LIST,
  CHAPTER_THEME_TRANSLATIONS,
} from '../data/vocabulary';
import { BASIC_LETTERS_DATA } from '../data/basicLettersData';
import { BATCHIM_PAGES_DATA } from './PrintableBatchimSheet';
import { VERB_UNIT_META } from './VerbConjugationSection';
import { PARTICLE_UNIT_META } from '../data/particleWorksheetData';

export type ClassroomCoverVariant = 'cards' | 'writing' | 'quiz';

interface ChapterSheetProps {
  track: LearningTrack;
  lang?: SupportedLanguage;
  classroomVariant?: ClassroomCoverVariant;
}

interface TrackCoverConfig {
  volLabel: string;
  spineTitle: string;
  koreanTitle: string;
  subSeriesLabel: string;
  tagline: string;
  metaLine: string[];
  accentHex: string;
  accentDarkHex: string;
  highlightHex: string;
  paperTintHex: string;
  spineBgHex: string;
  manduMood: 'happy' | 'cheer' | 'think' | 'speak';
  jollaPose: MiniJollaPose;
  speechLines: [string, string];
  tocGuide: string;
  tocFooter: string;
}

const TRACK_CONFIGS: Record<LearningTrack, TrackCoverConfig> = {
  hangeul: {
    volLabel: '제1권',
    spineTitle: '해볼 한국어 · 01 한글',
    koreanTitle: '한글',
    subSeriesLabel: '자음 · 모음 · 기본글자 · 받침',
    tagline: '자음과 모음이 만나 소리가 되고 글자가 되는 원리를 천천히 익혀요.',
    metaLine: ['자음·모음 15쪽', '기본글자 21쪽', '받침·겹받침 15쪽', '시험 20강 · 놀이 10종'],
    accentHex: '#D97706',
    accentDarkHex: '#78350F',
    highlightHex: '#FDE68A',
    paperTintHex: '#FFFBEB',
    spineBgHex: '#FEF3C7',
    manduMood: 'cheer',
    jollaPose: 'flag',
    speechLines: ['자음·모음 짝꿍이랑', '오늘도 한 장 해볼까요?'],
    tocGuide: '공부를 마친 쪽은 □에 예쁘게 체크하거나 색칠해요!',
    tocFooter: '한글 쪽지시험 20강은 [시험] 탭, 졸라맨 놀이 학습지 10종은 [놀이] 탭에서 바로 인쇄할 수 있어요.',
  },
  classroom: {
    volLabel: '제2권',
    spineTitle: '해볼 한국어 · 02 교실 한국어 (그림카드)',
    koreanTitle: '교실 한국어',
    subSeriesLabel: '그림카드 편 · 학교생활 필수 300단어',
    tagline: '교실·급식·쉬는 시간에 매일 쓰는 300단어를 그림과 모국어 뜻으로 익혀요.',
    metaLine: ['주제 30단원', '필수 300단어', '다국어 최대 3언어', '시험 6강 · 놀이 5종'],
    accentHex: '#D94A6B',
    accentDarkHex: '#881337',
    highlightHex: '#FECDD3',
    paperTintHex: '#FFF5F7',
    spineBgHex: '#FFE4E6',
    manduMood: 'happy',
    jollaPose: 'cheer',
    speechLines: ['학교에서 꼭 쓰는 말,', '그림카드로 쏙쏙 익혀요!'],
    tocGuide: '그림카드로 소리 내어 읽은 단원은 □에 체크해요!',
    tocFooter: '교실 한국어 5단원 종합 시험 6강은 [시험] 탭, 동기부여 놀이 학습지는 [놀이] 탭에 있어요.',
  },
  verb: {
    volLabel: '제3권',
    spineTitle: '해볼 한국어 · 03 용언 활용',
    koreanTitle: '용언 활용',
    subSeriesLabel: '현재 · 과거 · 부정 · 연결 30문형',
    tagline: '동사·형용사의 ‘-다’가 짠! 하고 변신하는 규칙을 예문과 함께 익혀요.',
    metaLine: ['문법 30단원', '필수 용언 150개', '현재~경험 총정리', '시험 6강 · 놀이 5종'],
    accentHex: '#7E22CE',
    accentDarkHex: '#4C1D95',
    highlightHex: '#E9D5FF',
    paperTintHex: '#FAF5FF',
    spineBgHex: '#F3E8FF',
    manduMood: 'think',
    jollaPose: 'run',
    speechLines: ['‘-다’가 짠! 변신하는 재미,', '만두랑 같이 해 봐요!'],
    tocGuide: '변신 연습을 마친 단원은 □에 체크하고 큰 소리로 읽어요!',
    tocFooter: '용언 활용 5단원 종합 시험 6강은 [시험] 탭, 변신 놀이 학습지는 [놀이] 탭에 있어요.',
  },
  particle: {
    volLabel: '제4권',
    spineTitle: '해볼 한국어 · 04 조사 결합',
    koreanTitle: '조사 결합',
    subSeriesLabel: '조사 결합 22단원 · 문장 만들기 8단원',
    tagline: '받침이 있는지 없는지만 콕! 확인하면 딱 맞는 조사가 저절로 붙어요.',
    metaLine: ['조사 결합 22단원', '문장 만들기 8단원', '핵심 명사 150개', '시험 6강 · 놀이 5종'],
    accentHex: '#059669',
    accentDarkHex: '#064E3B',
    highlightHex: '#A7F3D0',
    paperTintHex: '#F0FDF4',
    spineBgHex: '#D1FAE5',
    manduMood: 'speak',
    jollaPose: 'hat',
    speechLines: ['받침만 콕! 살펴보면', '조사가 착착 붙어요!'],
    tocGuide: '조사 결합과 문장 만들기를 마친 단원은 □에 체크해요!',
    tocFooter: '조사 결합 5단원 종합 시험 6강은 [시험] 탭, 받침·탐정 놀이 학습지는 [놀이] 탭에 있어요.',
  },
};

const CLASSROOM_VARIANT_CONFIGS: Record<ClassroomCoverVariant, TrackCoverConfig> = {
  cards: TRACK_CONFIGS.classroom,
  writing: {
    volLabel: '제2권-가',
    spineTitle: '해볼 한국어 · 02 교실 한국어 (따라쓰기)',
    koreanTitle: '교실 한국어',
    subSeriesLabel: '따라쓰기 공책 · 학교생활 필수 300단어',
    tagline: '네모 칸에 맞춰 또박또박 따라 쓰며 교실 필수 300단어를 손으로 익혀요.',
    metaLine: ['주제 30단원', '따라쓰기 300단어', '한 쪽 10단어', '시험 6강 · 놀이 5종'],
    accentHex: '#6D28D9',
    accentDarkHex: '#4C1D95',
    highlightHex: '#DDD6FE',
    paperTintHex: '#F5F3FF',
    spineBgHex: '#EDE9FE',
    manduMood: 'happy',
    jollaPose: 'pushRight',
    speechLines: ['네모 칸에 맞춰 천천히', '또박또박 써 볼까요?'],
    tocGuide: '따라쓰기를 끝낸 단원은 □에 체크하고 칭찬 도장을 받아요!',
    tocFooter: '교실 한국어 따라쓰기 30단원 · 종합 시험 6강은 [시험] 탭, 놀이 학습지는 [놀이] 탭에 있어요.',
  },
  quiz: {
    volLabel: '제2권-나',
    spineTitle: '해볼 한국어 · 02 교실 한국어 (받아쓰기)',
    koreanTitle: '교실 한국어',
    subSeriesLabel: '받아쓰기 공책 · 단원별 10점 실력 점검',
    tagline: '그림과 뜻을 보고 빈칸에 스스로 써 보며 300단어 실력을 쑥쑥 키워요.',
    metaLine: ['주제 30단원', '받아쓰기 300단어', '단원별 10점 만점', '시험 6강 · 놀이 5종'],
    accentHex: '#0284C7',
    accentDarkHex: '#0C4A6E',
    highlightHex: '#BAE6FD',
    paperTintHex: '#F0F9FF',
    spineBgHex: '#E0F2FE',
    manduMood: 'cheer',
    jollaPose: 'crown',
    speechLines: ['잘 듣고 스스로 척척!', '오늘도 100점에 도전해요!'],
    tocGuide: '단원별 받아쓰기 점수(___/10)를 차례에 차곡차곡 적어 보세요!',
    tocFooter: '교실 한국어 받아쓰기 30단원 · 종합 시험 6강은 [시험] 탭, 놀이 학습지는 [놀이] 탭에 있어요.',
  },
};

const getResolvedConfig = (
  track: LearningTrack,
  classroomVariant: ClassroomCoverVariant = 'cards'
): TrackCoverConfig =>
  track === 'classroom' ? CLASSROOM_VARIANT_CONFIGS[classroomVariant] : TRACK_CONFIGS[track];

const getClassroomSamples = () => {
  const targets = ['선생님', '연필', '식판'];
  return targets
    .map((ko) => VOCABULARY_DATA.find((v) => v.ko === ko))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));
};

/**
 * 해볼 한국어만의 공책/원고지 감성 미리보기 영역 (AI 카드 배제, 실제 교재 지면 느낌)
 */
const HaebolNotebookPreview: React.FC<{
  track: LearningTrack;
  classroomVariant?: ClassroomCoverVariant;
}> = ({ track, classroomVariant = 'cards' }) => {
  if (track === 'hangeul') {
    return (
      <div className="pt-3 border-t border-dashed border-slate-400">
        <div className="text-[11px] font-black text-amber-900 mb-2">
          책 속 미리보기 · 자음과 모음이 만나 글자가 돼요
        </div>
        <div className="flex items-center gap-3">
          {/* 원고지 네모칸 스타일 */}
          {[
            { ch: 'ㄱ', sub: '자음', tint: '#FFFBEB', border: '#D97706' },
            { ch: '+', sub: '', tint: 'transparent', border: 'transparent' },
            { ch: 'ㅏ', sub: '모음', tint: '#F0F9FF', border: '#0284C7' },
            { ch: '=', sub: '', tint: 'transparent', border: 'transparent' },
            { ch: '가', sub: '글자', tint: '#FEF3C7', border: '#B45309' },
          ].map((b, idx) =>
            b.ch === '+' || b.ch === '=' ? (
              <span key={idx} className="text-2xl font-black text-slate-500">
                {b.ch}
              </span>
            ) : (
              <div
                key={idx}
                className="relative w-16 h-16 border-2 flex items-center justify-center bg-white"
                style={{ borderColor: b.border, backgroundColor: b.tint }}
              >
                {/* 원고지 십자 점선 */}
                <span className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300/80" />
                <span className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300/80" />
                <span className="relative z-10 text-3xl font-black text-slate-900 leading-none">
                  {b.ch}
                </span>
                <span className="absolute -bottom-4 text-[9.5px] font-black text-slate-500">
                  {b.sub}
                </span>
              </div>
            )
          )}
          <div className="ml-2 flex items-end gap-1">
            <MiniJollaman pose="pushLeft" size={30} teamColor="#D97706" />
            <div className="text-[11px] font-black text-amber-900 leading-snug pl-1">
              사자 · 포도
              <br />
              우유 · 곰 · 물
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (track === 'classroom') {
    const samples = getClassroomSamples();
    if (classroomVariant === 'writing') {
      return (
        <div className="pt-3 border-t border-dashed border-slate-400">
          <div className="text-[11px] font-black text-violet-900 mb-2">
            책 속 미리보기 · 네모 칸에 또박또박 따라 써요
          </div>
          <div className="flex items-center gap-5">
            {samples.slice(0, 2).map((item) => (
              <div key={item.ko} className="flex items-center gap-2">
                <VocabVisual item={item} size="sm" className="w-9 h-9" />
                <div className="flex items-center">
                  {Array.from(item.ko).map((ch, idx) => (
                    <div
                      key={idx}
                      className="relative w-11 h-11 border-[1.5px] border-violet-600 bg-white flex items-center justify-center -ml-[1.5px] first:ml-0"
                    >
                      <span className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-violet-200" />
                      <span className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-violet-200" />
                      <span className="relative z-10 text-xl font-black text-violet-300">
                        {ch}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (classroomVariant === 'quiz') {
      return (
        <div className="pt-3 border-t border-dashed border-slate-400">
          <div className="text-[11px] font-black text-sky-900 mb-2">
            책 속 미리보기 · 그림을 보고 빈칸에 스스로 써요
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              {samples.slice(0, 2).map((item) => (
                <div key={item.ko} className="flex items-center gap-2">
                  <VocabVisual item={item} size="sm" className="w-9 h-9" />
                  <div className="flex items-center">
                    {Array.from(item.ko).map((_, idx) => (
                      <div
                        key={idx}
                        className="relative w-10 h-10 border-[1.5px] border-sky-700 bg-white -ml-[1.5px] first:ml-0"
                      >
                        <span className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-sky-200" />
                        <span className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-sky-200" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* 손도장 느낌 100점 스탬프 */}
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-rose-500 flex flex-col items-center justify-center -rotate-12 text-rose-600 shrink-0">
              <span className="text-[9px] font-black leading-none">참 잘했어요</span>
              <span className="text-sm font-black leading-tight">100점</span>
            </div>
          </div>
        </div>
      );
    }

    // cards variant: 책상 위 미니 그림카드 3장
    return (
      <div className="pt-3 border-t border-dashed border-slate-400">
        <div className="text-[11px] font-black text-rose-900 mb-2">
          책 속 미리보기 · 교실 필수 300단어 그림카드
        </div>
        <div className="flex items-center gap-3.5">
          {samples.map((item, i) => (
            <div
              key={item.ko}
              className="border-[1.8px] border-slate-800 bg-white px-3 py-2 flex items-center gap-2"
              style={{
                transform: i === 0 ? 'rotate(-1.5deg)' : i === 1 ? 'rotate(1deg)' : 'rotate(-1deg)',
              }}
            >
              <VocabVisual item={item} size="sm" className="w-9 h-9" />
              <div>
                <div className="text-[15px] font-black text-slate-900 leading-tight">{item.ko}</div>
                <div className="text-[10px] font-bold text-rose-700">{item.en}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (track === 'verb') {
    const rows = [
      { stem: '먹', end: '다', cStem: '먹', cEnd: '어요', color: '#2563EB' },
      { stem: '오', end: '다', cStem: '와', cEnd: '요', color: '#DC2626' },
      { stem: '공부', end: '하다', cStem: '공부', cEnd: '해요', color: '#7E22CE' },
    ];
    return (
      <div className="pt-3 border-t border-dashed border-slate-400">
        <div className="text-[11px] font-black text-purple-900 mb-2">
          책 속 미리보기 · 어간과 어미의 색깔 변신 규칙
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {rows.map((r) => (
            <div
              key={r.stem}
              className="border-[1.5px] border-slate-700 bg-white px-2.5 py-2 flex items-center justify-center gap-1.5 text-[15px] font-black"
            >
              <span className="text-slate-600">
                {r.stem}
                <span className="underline decoration-dotted">{r.end}</span>
              </span>
              <span className="text-purple-600">→</span>
              <span>
                <span className="text-slate-900">{r.cStem}</span>
                <span style={{ color: r.color }}>{r.cEnd}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // particle
  const rows = [
    { noun: '가방', p: '은', mark: '받침 O' },
    { noun: '친구', p: '는', mark: '받침 X' },
    { noun: '학생', p: '이에요', mark: '받침 O' },
    { noun: '의자', p: '예요', mark: '받침 X' },
  ];
  return (
    <div className="pt-3 border-t border-dashed border-slate-400">
      <div className="text-[11px] font-black text-emerald-900 mb-2">
        책 속 미리보기 · 받침 유무에 따른 조사 결합
      </div>
      <div className="grid grid-cols-4 gap-2">
        {rows.map((r) => (
          <div
            key={r.noun}
            className="border-[1.5px] border-slate-700 bg-white px-2 py-1.5 text-center"
          >
            <div className="text-[16px] font-black leading-tight">
              <span className="text-slate-900">{r.noun}</span>
              <span className="text-rose-600">{r.p}</span>
            </div>
            <div className="text-[10px] font-black text-emerald-800 mt-0.5">{r.mark}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * A4 가로모드 프린트 전용 챕터 표지 (해볼 한국어 공책·교재 컨셉)
 */
export const ChapterCoverSheet: React.FC<ChapterSheetProps> = ({
  track,
  classroomVariant,
}) => {
  const resolvedVariant: ClassroomCoverVariant = classroomVariant || 'cards';
  const cfg = getResolvedConfig(track, resolvedVariant);

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white border-[2.5px] border-slate-800 mx-auto flex overflow-hidden font-school-base"
      style={{ minHeight: '690px' }}
    >
      {/* 왼쪽 제본 책등(스파인) 여백 스트립 */}
      <div
        className="w-11 shrink-0 border-r-2 border-slate-800 flex flex-col items-center justify-between py-6 select-none"
        style={{ backgroundColor: cfg.spineBgHex }}
      >
        <span className="w-3.5 h-3.5 rounded-full border-[1.8px] border-slate-700 bg-white" />
        <span
          className="text-[12px] font-black tracking-widest [writing-mode:vertical-rl]"
          style={{ color: cfg.accentDarkHex }}
        >
          {cfg.spineTitle}
        </span>
        <span className="w-3.5 h-3.5 rounded-full border-[1.8px] border-slate-700 bg-white" />
      </div>

      {/* 본문 공책 표지 영역 (은은한 모눈종이 배경) */}
      <div
        className="flex-1 flex flex-col justify-between px-8 py-6"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148,163,184,0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.13) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        {/* 상단 출판 헤더선 */}
        <div className="flex items-end justify-between pb-2.5 border-b-2 border-slate-800">
          <div className="flex items-baseline gap-2.5">
            <span className="text-[18px] font-black text-slate-900 tracking-tight">
              해볼 한국어
            </span>
            <span className="text-slate-400 font-bold">|</span>
            <span className="text-[13px] font-black" style={{ color: cfg.accentHex }}>
              {cfg.volLabel} · {cfg.subSeriesLabel}
            </span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-[11.5px] font-bold text-slate-600">
              초등 · 기초 한국어 워크북 (A4 가로 제본용)
            </span>
          </div>
        </div>

        {/* 중앙 메인 표지 (좌: 손글씨형 큰 제목 + 교재 미리보기 / 우: 만두 & 졸라맨 일러스트) */}
        <div className="flex-1 grid grid-cols-12 gap-8 items-center py-5">
          {/* 좌측 타이포그래피 & 책 속 미리보기 */}
          <div className="col-span-7 flex flex-col justify-center gap-5">
            <div>
              <div className="text-[13px] font-black text-slate-500 mb-1.5">
                매일 한 장씩 즐겁게 익히는 나의 한국어 공책
              </div>

              {/* 형광펜 밑줄 스타일 큰 한글 제목 */}
              <h1 className="inline-block relative text-[56px] font-black tracking-tight leading-none text-slate-900 mb-3">
                <span
                  className="absolute left-0 right-0 bottom-1 h-4 -z-0"
                  style={{ backgroundColor: cfg.highlightHex }}
                />
                <span className="relative z-10">{cfg.koreanTitle}</span>
              </h1>

              {track === 'classroom' && (
                <div
                  className="text-[20px] font-black mb-2"
                  style={{ color: cfg.accentDarkHex }}
                >
                  {resolvedVariant === 'writing'
                    ? '— 따라쓰기 공책 —'
                    : resolvedVariant === 'quiz'
                    ? '— 받아쓰기 공책 —'
                    : '— 그림카드 편 —'}
                </div>
              )}

              <p className="text-[15.5px] font-bold text-slate-700 leading-relaxed max-w-[520px]">
                {cfg.tagline}
              </p>

              {/* 정갈한 텍스트 메타 인덱스 (AI 스탯 박스 없음) */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] font-black text-slate-700">
                {cfg.metaLine.map((m, i) => (
                  <React.Fragment key={m}>
                    {i > 0 && <span className="text-slate-400">·</span>}
                    <span style={i === 0 ? { color: cfg.accentDarkHex } : undefined}>{m}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 실제 해볼 한국어 교재 속 미리보기 */}
            <HaebolNotebookPreview track={track} classroomVariant={resolvedVariant} />
          </div>

          {/* 우측 캐릭터 일러스트 무대 (만두 + 졸라맨 콜라보!) */}
          <div className="col-span-5 flex flex-col items-center justify-center">
            {/* 손그림 느낌 말풍선 */}
            <div className="relative bg-white border-2 border-slate-800 rounded-2xl px-5 py-3 text-center mb-4">
              <div className="text-[15px] font-black text-slate-900 leading-snug">
                {cfg.speechLines[0]}
                <br />
                <span style={{ color: cfg.accentDarkHex }}>{cfg.speechLines[1]}</span>
              </div>
              {/* 말풍선 꼬리 */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-slate-800 rotate-45" />
            </div>

            {/* 만두 & 졸라맨 나란히 무대 */}
            <div
              className="relative w-64 h-48 rounded-full border-2 border-dashed flex items-end justify-center gap-3 pb-4"
              style={{
                backgroundColor: cfg.paperTintHex,
                borderColor: cfg.accentHex,
              }}
            >
              <ManduMascot size="lg" mood={cfg.manduMood} interactive={false} />
              <div className="pb-1">
                <MiniJollaman pose={cfg.jollaPose} size={46} teamColor={cfg.accentHex} />
              </div>
            </div>

            <div className="mt-2.5 text-[11.5px] font-black text-slate-500">
              해볼쌤 만두 &amp; 졸라한글맨과 함께!
            </div>
          </div>
        </div>

        {/* 하단 초등학교 국어 공책 스타일 이름표 (표 형태) */}
        <table className="w-full table-fixed border-collapse border-2 border-slate-800 bg-white shrink-0">
          <tbody>
            <tr style={{ height: '48px' }}>
              <td
                className="w-[9%] border-r-[1.5px] border-slate-800 text-center text-[13px] font-black"
                style={{ backgroundColor: cfg.spineBgHex, color: cfg.accentDarkHex }}
              >
                학교
              </td>
              <td className="w-[26%] border-r-[1.5px] border-slate-800 px-3 text-right text-[12px] font-bold text-slate-400">
                초등학교
              </td>
              <td
                className="w-[10%] border-r-[1.5px] border-slate-800 text-center text-[13px] font-black"
                style={{ backgroundColor: cfg.spineBgHex, color: cfg.accentDarkHex }}
              >
                학년·반
              </td>
              <td className="w-[17%] border-r-[1.5px] border-slate-800 px-2 text-center text-[12px] font-bold text-slate-400">
                ___학년 ___반
              </td>
              <td
                className="w-[9%] border-r-[1.5px] border-slate-800 text-center text-[13px] font-black"
                style={{ backgroundColor: cfg.spineBgHex, color: cfg.accentDarkHex }}
              >
                이름
              </td>
              <td className="w-[17%] border-r-[1.5px] border-slate-800 px-3" />
              <td className="w-[12%] px-2 text-center text-[11px] font-bold text-slate-500 leading-tight">
                시작한 날
                <br />
                ___/___
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
          <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};

/**
 * A4 가로모드 프린트 전용 챕터 차례 (해볼 한국어 공책 목차 & 공부 기록장)
 */
export const ChapterTocSheet: React.FC<ChapterSheetProps> = ({
  track,
  lang = 'en',
  classroomVariant,
}) => {
  const resolvedVariant: ClassroomCoverVariant = classroomVariant || 'cards';
  const cfg = getResolvedConfig(track, resolvedVariant);

  const renderHangeulTocBody = () => {
    const jamoItems = [
      { no: '1~4쪽', title: '자음·모음 쓰기 & 140글자 조합표' },
      { no: '5~9쪽', title: '기본자음 14자 · 쌍자음 5자 획순 쓰기' },
      { no: '10~15쪽', title: '기본모음 10자 · 복합모음 11자 획순 쓰기' },
    ];
    const extraItems = [
      { no: '시험 1~5강', title: '1부 자음·모음 쪽지시험 (5강)' },
      { no: '시험 6~10강', title: '2부 기본글자 쪽지시험 (5강)' },
      { no: '시험 11~15강', title: '3부 대표받침·가족 쪽지시험 (5강)' },
      { no: '시험 16~20강', title: '4부 겹받침 쪽지시험 (5강)' },
      { no: '놀이 1~10쪽', title: '졸라 보드게임·빙고·도장판·상장' },
    ];

    return (
      <div className="grid grid-cols-12 border-2 border-slate-800 bg-white flex-1 overflow-hidden">
        {/* 1열: 1부 자음·모음 + 별책 시험·놀이 */}
        <div className="col-span-4 border-r-[1.8px] border-slate-800 flex flex-col">
          <div
            className="px-3 py-1.5 border-b-[1.5px] border-slate-800 flex items-center justify-between text-[12px] font-black"
            style={{ backgroundColor: cfg.spineBgHex, color: cfg.accentDarkHex }}
          >
            <span>1부. 자음 · 모음</span>
            <span className="text-[10.5px]">15쪽</span>
          </div>
          <div className="divide-y divide-slate-200 px-3 py-1.5">
            {jamoItems.map((it) => (
              <div key={it.no} className="py-2 flex items-center gap-2 text-[11.5px]">
                <span className="w-3.5 h-3.5 border-[1.5px] border-slate-700 bg-white shrink-0 inline-block" />
                <span className="font-black text-amber-800 w-12 shrink-0 tabular-nums">{it.no}</span>
                <span className="font-bold text-slate-900 truncate">{it.title}</span>
              </div>
            ))}
          </div>

          <div
            className="px-3 py-1.5 border-y-[1.5px] border-slate-800 flex items-center justify-between text-[12px] font-black mt-1"
            style={{ backgroundColor: '#FFEDD5', color: '#9A3412' }}
          >
            <span>별책. 시험(20강) · 놀이(10종)</span>
            <span className="text-[10.5px]">별도 탭</span>
          </div>
          <div className="divide-y divide-slate-200 px-3 py-1 flex-1 flex flex-col justify-between">
            {extraItems.map((it) => (
              <div key={it.no} className="py-1.5 flex items-center gap-2 text-[11px]">
                <span className="w-3.5 h-3.5 border-[1.5px] border-slate-700 bg-white shrink-0 inline-block" />
                <span className="font-black text-orange-800 w-[68px] shrink-0 tabular-nums">{it.no}</span>
                <span className="font-bold text-slate-800 truncate">{it.title}</span>
              </div>
            ))}
          </div>

          {/* 졸라맨 응원 꼬마 코너 */}
          <div className="px-3 py-2 border-t border-dashed border-slate-300 bg-amber-50/40 flex items-center justify-between">
            <span className="text-[11px] font-black text-amber-900">
              한글 완성까지 화이팅!
            </span>
            <MiniJollaman pose="cheer" size={26} teamColor="#D97706" />
          </div>
        </div>

        {/* 2열: 2부 기본글자 (21쪽) */}
        <div className="col-span-4 border-r-[1.8px] border-slate-800 flex flex-col">
          <div
            className="px-3 py-1.5 border-b-[1.5px] border-slate-800 flex items-center justify-between text-[12px] font-black"
            style={{ backgroundColor: cfg.spineBgHex, color: cfg.accentDarkHex }}
          >
            <span>2부. 기본 글자 (모음 21개)</span>
            <span className="text-[10.5px]">21쪽</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 px-2.5 py-1.5 flex-1 content-between">
            {BASIC_LETTERS_DATA.map((p) => (
              <div
                key={p.pageNumber}
                className="flex items-center gap-1.5 text-[11px] py-[3px] border-b border-slate-200"
              >
                <span className="w-3 h-3 border-[1.4px] border-slate-700 bg-white shrink-0 inline-block" />
                <span className="font-black text-amber-800 shrink-0">{p.circledNumber}</span>
                <span className="font-black text-slate-900 shrink-0">{p.vowel}</span>
                <span className="font-bold text-slate-500 truncate">{p.wordCard.word}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3열: 3부 받침 · 겹받침 (15쪽) */}
        <div className="col-span-4 flex flex-col">
          <div
            className="px-3 py-1.5 border-b-[1.5px] border-slate-800 flex items-center justify-between text-[12px] font-black"
            style={{ backgroundColor: cfg.spineBgHex, color: cfg.accentDarkHex }}
          >
            <span>3부. 받침 · 겹받침</span>
            <span className="text-[10.5px]">15쪽</span>
          </div>
          <div className="divide-y divide-slate-200 px-2.5 py-1 flex-1 flex flex-col justify-between">
            {BATCHIM_PAGES_DATA.map((p) => (
              <div
                key={p.pageNumber}
                className="flex items-center justify-between gap-1.5 text-[11px] py-[2px]"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-3 h-3 border-[1.4px] border-slate-700 bg-white shrink-0 inline-block" />
                  <span className="font-black text-amber-800 shrink-0">{p.circledNumber}</span>
                  <span className="font-bold text-slate-900 truncate">
                    {p.dropdownTitle.replace(/^[①-⑮]\s*/, '')}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 shrink-0">
                  {p.wordCard?.audioWord || ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderUnified30UnitTable = (
    rows: { num: string; title: string; sub: string; isSentence?: boolean }[],
    options?: { rightHeader?: string; showScoreSlot?: boolean }
  ) => {
    const col1 = rows.slice(0, 10);
    const col2 = rows.slice(10, 20);
    const col3 = rows.slice(20, 30);
    const rightHeader = options?.rightHeader || '확인';
    const showScoreSlot = Boolean(options?.showScoreSlot);

    return (
      <div className="grid grid-cols-3 border-2 border-slate-800 bg-white flex-1 overflow-hidden">
        {[col1, col2, col3].map((col, colIdx) => (
          <div
            key={colIdx}
            className={`flex flex-col ${colIdx < 2 ? 'border-r-[1.8px] border-slate-800' : ''}`}
          >
            {/* 열 제목 */}
            <div
              className="px-3 py-1.5 border-b-[1.5px] border-slate-800 flex items-center justify-between text-[11.5px] font-black"
              style={{ backgroundColor: cfg.spineBgHex, color: cfg.accentDarkHex }}
            >
              <span>
                {colIdx === 0 ? '01 ~ 10 단원' : colIdx === 1 ? '11 ~ 20 단원' : '21 ~ 30 단원'}
              </span>
              <span className="text-[10.5px]">{rightHeader}</span>
            </div>

            {/* 10개 단원 줄 */}
            <div className="divide-y divide-slate-200 flex-1 flex flex-col justify-between">
              {col.map((row) => (
                <div
                  key={row.num}
                  className={`px-2.5 py-1.5 flex items-center justify-between gap-1.5 ${
                    row.isSentence ? 'bg-emerald-50/40' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="w-3.5 h-3.5 border-[1.5px] border-slate-700 bg-white shrink-0 inline-block" />
                    <span
                      className="text-[12.5px] font-black shrink-0"
                      style={{ color: cfg.accentHex }}
                    >
                      {row.num}
                    </span>
                    <span className="text-[12px] font-black text-slate-900 truncate">
                      {row.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {showScoreSlot ? (
                      <span className="text-[10.5px] font-black text-sky-800 border-b border-slate-400 px-1 whitespace-nowrap tabular-nums">
                        ___ / 10
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500 max-w-[94px] truncate text-right">
                        {row.sub}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTocContent = () => {
    if (track === 'hangeul') {
      return renderHangeulTocBody();
    }
    if (track === 'classroom') {
      const rows = CHAPTER_LIST.map((chObj) => {
        const transObj = CHAPTER_THEME_TRANSLATIONS[chObj.ch];
        const koName = transObj?.ko || chObj.theme;
        const translated = transObj?.trans?.[lang] || transObj?.trans?.en || '';
        return {
          num: chObj.circledTitle.split(' ')[0],
          title: koName,
          sub: translated,
        };
      });
      if (resolvedVariant === 'quiz') {
        return renderUnified30UnitTable(rows, {
          rightHeader: '받아쓰기 점수',
          showScoreSlot: true,
        });
      }
      if (resolvedVariant === 'writing') {
        return renderUnified30UnitTable(rows, {
          rightHeader: '따라쓰기 뜻',
        });
      }
      return renderUnified30UnitTable(rows, {
        rightHeader: '주제 뜻',
      });
    }
    if (track === 'verb') {
      const rows = VERB_UNIT_META.map((u) => ({
        num: u.circled,
        title: u.grammar,
        sub: u.verbs.slice(0, 2).join('·'),
      }));
      return renderUnified30UnitTable(rows, { rightHeader: '대표 용언' });
    }
    // particle
    const rows = PARTICLE_UNIT_META.map((u) => ({
      num: u.circled,
      title: u.title.replace(/^문장 만들기\s*/, '[문장] '),
      sub: u.layoutType === 'rows5' ? '문장완성' : u.keywords.slice(0, 2).join('·'),
      isSentence: u.layoutType === 'rows5',
    }));
    return renderUnified30UnitTable(rows, { rightHeader: '대표 낱말' });
  };

  return (
    <div
      className="chapter-extra-a4-sheet print-sheet printable-a4-page relative w-full max-w-[1040px] bg-white border-[2.5px] border-slate-800 mx-auto flex overflow-hidden font-school-base"
      style={{ minHeight: '690px' }}
    >
      {/* 왼쪽 제본 여백 스트립 (표지와 세트로 연결) */}
      <div
        className="w-8 shrink-0 border-r-2 border-slate-800 flex flex-col items-center justify-between py-6 select-none"
        style={{ backgroundColor: cfg.spineBgHex }}
      >
        <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-slate-700 bg-white" />
        <span
          className="text-[11px] font-black tracking-widest [writing-mode:vertical-rl]"
          style={{ color: cfg.accentDarkHex }}
        >
          차례 · 공부 기록장
        </span>
        <span className="w-2.5 h-2.5 rounded-full border-[1.5px] border-slate-700 bg-white" />
      </div>

      {/* 본문 차례 영역 */}
      <div className="flex-1 flex flex-col justify-between px-6 py-4">
        {/* 상단 정갈한 출판 차례 헤더 */}
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b-2 border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <ManduMascot size="xs" mood={cfg.manduMood} interactive={false} />
            <div className="flex items-baseline gap-2.5">
              <h2 className="text-[24px] font-black text-slate-900 tracking-widest leading-none">
                차 례
              </h2>
              <span className="text-slate-400 font-bold">|</span>
              <span className="text-[14px] font-black" style={{ color: cfg.accentDarkHex }}>
                해볼 한국어 {cfg.volLabel} · {cfg.koreanTitle}
                {track === 'classroom'
                  ? resolvedVariant === 'writing'
                    ? ' (따라쓰기)'
                    : resolvedVariant === 'quiz'
                    ? ' (받아쓰기)'
                    : ' (그림카드)'
                  : ''}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11.5px] font-bold text-slate-700">
            <span>{cfg.tocGuide}</span>
            <span className="text-slate-900 font-black border-b border-slate-600 pb-0.5">
              이름: __________
            </span>
          </div>
        </div>

        {/* 메인 차례 표 */}
        {renderTocContent()}

        {/* 하단 안내 및 완주 도장 바 */}
        <div className="mt-2 pt-2 border-t-[1.5px] border-slate-700 flex items-center justify-between gap-3 text-[11px] font-bold text-slate-700 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-black shrink-0" style={{ color: cfg.accentDarkHex }}>
              ※ 함께 쓰기:
            </span>
            <span className="truncate">{cfg.tocFooter}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <MiniJollaman pose="crown" size={22} teamColor={cfg.accentHex} />
            <span className="font-black text-slate-800">
              다 끝낸 날: ___월 ___일 · 참 잘했어요 ○
            </span>
          </div>
        </div>

        <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
          <span className="font-medium">해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        </div>
      </div>
    </div>
  );
};
