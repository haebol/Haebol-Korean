import React from 'react';
import { ManduMascot } from './ManduMascot';
import { getCustomVocabImage } from '../data/customVocabImages';

export type MenuCoverId = 'hangeul' | 'classroom' | 'verb' | 'particle';

export interface MenuCoverHighlight {
  index: string;
  title: string;
  detail: string;
}

export interface MenuCoverMeta {
  id: MenuCoverId;
  orderNumber: string;
  englishCode: string;
  titleKo: string;
  subtitleEn: string;
  tagline: string;
  kicker: string;
  highlights: MenuCoverHighlight[];
  fileName: string;
  palette: {
    canvasBg: string;
    cardBg: string;
    accentHex: string;
    accentDarkHex: string;
    softHex: string;
    borderHex: string;
    mutedHex: string;
  };
}

export const MENU_INTRO_COVERS: MenuCoverMeta[] = [
  {
    id: 'hangeul',
    orderNumber: '01',
    englishCode: 'HAEBOL HANGEUL',
    titleKo: '해볼 한글',
    subtitleEn: 'Korean Alphabet · Stroke Order · Phonics System',
    kicker: '한글 공부의 시작 · 자음 모음부터 겹받침까지',
    tagline:
      '한국어 음성을 듣고 획순을 따라 쓰며, 자음과 모음이 만나 글자가 되는 원리를 스스로 깨치는 한국어 학습 프로그램입니다.',
    highlights: [
      {
        index: '01',
        title: '자음·모음 쓰기 & 자음·모음 총정리표 (17쪽)',
        detail: '기본 자모 획순 가이드부터 자음·모음 종류·결합 원리·발음 로마자 한눈에 정리',
      },
      {
        index: '02',
        title: '기본글자(21쪽) & 받침글자·총정리표 (16쪽)',
        detail: '자음 모음 결합, 받침 결합 과정을 눈으로 확인, 겹받침 11종·받침 총정리 완성',
      },
      {
        index: '03',
        title: '플래시카드 & 풍선 터뜨리기 게임',
        detail: '한국어 발음 듣기, 획순 애니메이션, 팡팡 터지는 한글 복습 게임 연계',
      },
    ],
    fileName: 'haebol-01-hangeul-cover-a4.png',
    palette: {
      canvasBg: '#FFFBEB',
      cardBg: '#FFFFFF',
      accentHex: '#D97706',
      accentDarkHex: '#78350F',
      softHex: '#FEF3C7',
      borderHex: '#FCD34D',
      mutedHex: '#92400E',
    },
  },
  {
    id: 'classroom',
    orderNumber: '02',
    englishCode: 'HAEBOL CLASSROOM KOREAN',
    titleKo: '해볼 교실 한국어',
    subtitleEn: '30 Units · 300 Essential School Vocabulary & Expressions',
    kicker: '학교생활 필수 어휘 · 7개 국어 다국어 맞춤형 교구',
    tagline:
      '교실 수업, 급식 시간, 친구 관계에서 바로 쓰는 300개 핵심 어휘와 회화를 7개 언어로 배우고 출력합니다.',
    highlights: [
      {
        index: '01',
        title: '30단원 그림카드 & 7개 국어 동시 표기',
        detail: '영어·베트남어·중국어·러시아어 등 최대 3개 언어 선택 맞춤형 학습지',
      },
      {
        index: '02',
        title: '따라쓰기 · 받아쓰기 · 단어장 · 어휘 총정리 (3쪽)',
        detail: '단원별 3종 학습지 일괄 출력, 미니 단어장 및 300어휘 총정리 지원',
      },
      {
        index: '03',
        title: '플래시카드 & 메모리 카드 게임',
        detail: '터치하면 모국어 뜻이 나오는 플래시카드와 30개의 금메달 뱃지를 모으는 게임',
      },
    ],
    fileName: 'haebol-02-classroom-korean-cover-a4.png',
    palette: {
      canvasBg: '#FFF5F8',
      cardBg: '#FFFFFF',
      accentHex: '#D94A6B',
      accentDarkHex: '#881337',
      softHex: '#FFE4EC',
      borderHex: '#F9A8D4',
      mutedHex: '#9F1239',
    },
  },
  {
    id: 'verb',
    orderNumber: '03',
    englishCode: 'HAEBOL VERB CONJUGATION',
    titleKo: '해볼 용언 활용',
    subtitleEn: '30 Units · 150 Verbs & Adjectives Conjugation Lab',
    kicker: '움직이는 문법 교구 · 어간과 어미의 직관적 변신',
    tagline:
      '150개 핵심 동사·형용사가 현재·과거·미래·부정·요청·이유 등 30가지 실전 문형으로 바뀌는 규칙을 익힙니다.',
    highlights: [
      {
        index: '01',
        title: '어미가 바뀌는 순간을 시각적으로 확인 & 불규칙(★) 가이드',
        detail: '어간과 어미를 색으로 구분하고 축약·탈락·불규칙 변화를 직관적으로 학습',
      },
      {
        index: '02',
        title: '30단원 용언 활용 연습 & 용언 활용 총정리표 (31쪽)',
        detail: '기본형·활용형 따라쓰기, 실전 예문, 해볼쌤 맞춤 팁과 총정리까지 완결',
      },
      {
        index: '03',
        title: '플래시 카드 & 왕만두 찌기 게임',
        detail: "터치하여 활용 장면을 눈으로 확인, 알맞는 '어간' 양념을 뿌려 만두 요리를 완성",
      },
    ],
    fileName: 'haebol-03-verb-conjugation-cover-a4.png',
    palette: {
      canvasBg: '#FAF5FF',
      cardBg: '#FFFFFF',
      accentHex: '#7E22CE',
      accentDarkHex: '#4C1D95',
      softHex: '#F3E8FF',
      borderHex: '#D8B4FE',
      mutedHex: '#6B21A8',
    },
  },
  {
    id: 'particle',
    orderNumber: '04',
    englishCode: 'HAEBOL PARTICLE COMBINATION',
    titleKo: '해볼 조사 결합',
    subtitleEn: '30 Units · Korean Particle Detective & Sentence Builder',
    kicker: '명사+조사 연결부터 문장 완성까지·올인원 학습 솔루션',
    tagline:
      '명사 끝 받침 유무를 손가락으로 짚어 확인하며 은/는·이/가를 넣어 보고, 완전한 문장을 완성합니다.',
    highlights: [
      {
        index: '01',
        title: '조사 결합 연습 & 변신 대명사(내가·누가) 정복',
        detail: '받침 O/X 판별 힌트와 자주 틀리는 형태 변화를 애니메이션 카드로 체득',
      },
      {
        index: '02',
        title: '30단원 조사 결합 & 조사 총정리표 · 문장 완성하기',
        detail: '학습지부터 총정리 한눈에 보기, 필수 명사·완전한 문장 말하기까지 완결',
      },
      {
        index: '03',
        title: '플래시 카드 & 명사·조사 결합 게임',
        detail: '터치 한 번이면 ok! 플래시카드와 게임으로 한국어 학습 완결',
      },
    ],
    fileName: 'haebol-04-particle-combination-cover-a4.png',
    palette: {
      canvasBg: '#ECFDF5',
      cardBg: '#FFFFFF',
      accentHex: '#059669',
      accentDarkHex: '#064E3B',
      softHex: '#D1FAE5',
      borderHex: '#6EE7B7',
      mutedHex: '#047857',
    },
  },
];

interface MenuIntroCoverSheetProps {
  cover: MenuCoverMeta;
  className?: string;
}

const FONT_GOTHIC =
  "'Hakgyoansim Bareondotum', '학교안심 바른돋움', 'NanumBarunGothic', sans-serif";
const FONT_TITLE =
  "'NanumBarunGothic', 'Hakgyoansim Bareondotum', sans-serif";
const FONT_HAND =
  "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif";

export const MenuIntroCoverSheet: React.FC<MenuIntroCoverSheetProps> = ({
  cover,
  className = '',
}) => {
  const { palette } = cover;

  const teacherImg = getCustomVocabImage('선생님');
  const bagImg = getCustomVocabImage('가방');
  const trayImg = getCustomVocabImage('식판');
  const friendImg = getCustomVocabImage('친구');

  const renderRightVisualShowcase = () => {
    if (cover.id === 'hangeul') {
      return (
        <div
          className="h-full w-full rounded-2xl border-2 p-6 flex flex-col justify-between"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: palette.borderHex,
          }}
        >
          {/* Top Mascot + Greeting */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="rounded-2xl p-2 border"
                style={{
                  backgroundColor: palette.canvasBg,
                  borderColor: palette.borderHex,
                }}
              >
                <ManduMascot size="lg" interactive={false} />
              </div>
              <div>
                <div
                  className="text-xs font-extrabold tracking-wide"
                  style={{ color: palette.mutedHex }}
                >
                  해볼쌤과 함께하는 한글 원리
                </div>
                <div
                  className="text-lg font-black mt-0.5"
                  style={{ color: palette.accentDarkHex, fontFamily: FONT_TITLE }}
                >
                  자음 + 모음 = 소리 글자
                </div>
              </div>
            </div>
          </div>

          {/* Interactive-style Equation Graphic */}
          <div
            className="rounded-xl border p-4 flex items-center justify-center gap-3 my-2"
            style={{
              backgroundColor: palette.canvasBg,
              borderColor: palette.borderHex,
            }}
          >
            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-xl bg-white border-2 flex items-center justify-center"
                style={{ borderColor: '#60A5FA' }}
              >
                <span
                  style={{ fontFamily: FONT_HAND, color: '#2563EB' }}
                  className="text-5xl font-black leading-none"
                >
                  ㄱ
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 mt-1.5">
                자음 [g]
              </span>
            </div>

            <span className="text-2xl font-black text-slate-400 pb-5">+</span>

            <div className="flex flex-col items-center">
              <div
                className="w-20 h-20 rounded-xl bg-white border-2 flex items-center justify-center"
                style={{ borderColor: '#FB7185' }}
              >
                <span
                  style={{ fontFamily: FONT_HAND, color: '#E11D48' }}
                  className="text-5xl font-black leading-none"
                >
                  ㅏ
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 mt-1.5">
                모음 [a]
              </span>
            </div>

            <span className="text-2xl font-black text-slate-400 pb-5">=</span>

            <div className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-2xl bg-white border-2 flex items-center justify-center shadow-sm"
                style={{ borderColor: palette.accentHex }}
              >
                <span
                  style={{ fontFamily: FONT_HAND, color: '#0F172A' }}
                  className="text-6xl font-black leading-none"
                >
                  가
                </span>
              </div>
              <span
                className="text-xs font-black mt-1.5"
                style={{ color: palette.accentDarkHex }}
              >
                음절 [ga]
              </span>
            </div>
          </div>

          {/* 4-Card Consonant Summary Strip */}
          <div className="grid grid-cols-4 gap-2.5">
            {[
              { label: '자음', ch: 'ㄱ', sub: '기역 [g/k]', bg: '#FFFBEB', bd: '#FCD34D', tx: '#92400E' },
              { label: '모음', ch: 'ㅏ', sub: '아 [a]', bg: '#ECFDF5', bd: '#6EE7B7', tx: '#065F46' },
              { label: '대표받침', ch: 'ㅅ', sub: '시옷 [s]→[t]', bg: '#F0F9FF', bd: '#7DD3FC', tx: '#075985' },
              { label: '겹받침', ch: 'ㄳ', sub: '앞 자음 [k]', bg: '#FFF1F2', bd: '#FDA4AF', tx: '#9F1239' },
            ].map((item) => (
              <div
                key={item.ch}
                className="rounded-xl border p-2.5 text-center flex flex-col items-center justify-between"
                style={{ backgroundColor: item.bg, borderColor: item.bd }}
              >
                <span className="text-[10px] font-black" style={{ color: item.tx }}>
                  {item.label}
                </span>
                <span
                  style={{ fontFamily: FONT_HAND }}
                  className="text-3xl font-black text-slate-900 my-1 leading-none"
                >
                  {item.ch}
                </span>
                <span className="text-[10px] font-bold text-slate-600 whitespace-nowrap">
                  {item.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (cover.id === 'classroom') {
      const cards = [
        { word: '선생님', sub: 'Teacher', img: teacherImg, ch: '4단원' },
        { word: '가방', sub: 'Backpack', img: bagImg, ch: '6단원' },
        { word: '식판', sub: 'Meal Tray', img: trayImg, ch: '1단원' },
        { word: '친구', sub: 'Friend', img: friendImg, ch: '4단원' },
      ];

      return (
        <div
          className="h-full w-full rounded-2xl border-2 p-6 flex flex-col justify-between"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: palette.borderHex,
          }}
        >
          {/* Top Mascot Header */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className="rounded-2xl p-2 border"
                style={{
                  backgroundColor: palette.canvasBg,
                  borderColor: palette.borderHex,
                }}
              >
                <ManduMascot size="lg" interactive={false} />
              </div>
              <div>
                <div
                  className="text-xs font-extrabold tracking-wide"
                  style={{ color: palette.mutedHex }}
                >
                  학교생활 30단원 · 300개 그림카드
                </div>
                <div
                  className="text-lg font-black mt-0.5"
                  style={{ color: palette.accentDarkHex, fontFamily: FONT_TITLE }}
                >
                  그림 보고 말하고 쓰는 교실 어휘
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Classroom Illustration Flashcard Showcase */}
          <div className="grid grid-cols-2 gap-3 my-2 flex-1">
            {cards.map((c) => (
              <div
                key={c.word}
                className="rounded-xl border p-3 flex items-center gap-3"
                style={{
                  backgroundColor: palette.canvasBg,
                  borderColor: palette.borderHex,
                }}
              >
                <div className="w-16 h-16 rounded-lg bg-white border border-pink-200 flex items-center justify-center shrink-0 p-1">
                  {c.img && (
                    <img
                      src={c.img}
                      alt={c.word}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-slate-500">{c.ch}</div>
                  <div
                    style={{ fontFamily: FONT_HAND }}
                    className="text-2xl font-black text-slate-900 leading-tight"
                  >
                    {c.word}
                  </div>
                  <div
                    className="text-xs font-bold mt-0.5"
                    style={{ color: palette.accentHex }}
                  >
                    {c.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom 7-Language Strip */}
          <div
            className="rounded-xl border px-4 py-2.5 flex items-center justify-between text-xs font-bold"
            style={{
              backgroundColor: palette.softHex,
              borderColor: palette.borderHex,
              color: palette.accentDarkHex,
            }}
          >
            <span>7개 국어 지원</span>
            <span className="text-slate-700">
              한국어 · EN · TIẾNG VIỆT · বাংলা · 中文 · РУССКИЙ · 日本語 · МОНГОЛ
            </span>
          </div>
        </div>
      );
    }

    if (cover.id === 'verb') {
      return (
        <div
          className="h-full w-full rounded-2xl border-2 p-6 flex flex-col justify-between"
          style={{
            backgroundColor: '#FFFFFF',
            borderColor: palette.borderHex,
          }}
        >
          {/* Top Mascot Header */}
          <div className="flex items-center gap-3">
            <div
              className="rounded-2xl p-2 border"
              style={{
                backgroundColor: palette.canvasBg,
                borderColor: palette.borderHex,
              }}
            >
              <ManduMascot size="lg" interactive={false} />
            </div>
            <div>
              <div
                className="text-xs font-extrabold tracking-wide"
                style={{ color: palette.mutedHex }}
              >
                어간 + 어미가 만나는 마법
              </div>
              <div
                className="text-lg font-black mt-0.5"
                style={{ color: palette.accentDarkHex, fontFamily: FONT_TITLE }}
              >
                용언 활용 30단원 변신 공식
              </div>
            </div>
          </div>

          {/* Visual Conjugation Formula Cards */}
          <div className="space-y-3 my-2 flex-1 flex flex-col justify-center">
            <div
              className="rounded-xl border p-4 flex items-center justify-between gap-2"
              style={{
                backgroundColor: palette.canvasBg,
                borderColor: palette.borderHex,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  style={{ fontFamily: FONT_HAND, color: '#0F172A' }}
                  className="text-3xl font-black bg-white px-3 py-1.5 rounded-lg border border-purple-200"
                >
                  먹<span className="text-slate-400">다</span>
                </span>
                <span className="text-xl font-black text-purple-400">→</span>
                <span
                  style={{ fontFamily: FONT_HAND }}
                  className="text-3xl font-black bg-white px-3.5 py-1.5 rounded-lg border-2 border-purple-300"
                >
                  <span style={{ color: '#000000' }}>먹</span>
                  <span style={{ color: '#E03131' }}>어요</span>
                </span>
              </div>
              <span className="text-xs font-extrabold text-purple-800 whitespace-nowrap">
                현재형 · I eat
              </span>
            </div>

            <div
              className="rounded-xl border p-4 flex items-center justify-between gap-2"
              style={{
                backgroundColor: palette.canvasBg,
                borderColor: palette.borderHex,
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  style={{ fontFamily: FONT_HAND, color: '#0F172A' }}
                  className="text-3xl font-black bg-white px-3 py-1.5 rounded-lg border border-purple-200"
                >
                  가<span className="text-slate-400">다</span>
                </span>
                <span className="text-xl font-black text-purple-400">→</span>
                <span
                  style={{ fontFamily: FONT_HAND }}
                  className="text-3xl font-black bg-white px-3.5 py-1.5 rounded-lg border-2 border-purple-300"
                >
                  <span style={{ color: '#800080' }}>잡</span>
                  <span style={{ color: '#E03131' }}>았어요</span>
                </span>
              </div>
              <span className="text-xs font-extrabold text-purple-800 whitespace-nowrap">
                과거형 · caught
              </span>
            </div>
          </div>

          {/* Cute Steamer Mandu Illustration Strip */}
          <div
            className="rounded-xl border px-4 py-2.5 flex items-center justify-between"
            style={{
              backgroundColor: palette.softHex,
              borderColor: palette.borderHex,
            }}
          >
            <div className="flex items-center gap-2.5">
              {/* Simple inline dumpling steamer vector */}
              <svg viewBox="0 0 44 36" className="w-10 h-8 shrink-0" aria-hidden="true">
                <rect x="6" y="18" width="32" height="12" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
                <ellipse cx="16" cy="17" rx="7" ry="6" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.4" />
                <ellipse cx="28" cy="17" rx="7" ry="6" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.4" />
                <path d="M14 8 Q16 4 14 2 M28 8 Q30 4 28 2" stroke="#9333EA" strokeWidth="1.6" strokeLinecap="round" fill="none" />
              </svg>
              <div>
                <div className="text-xs font-black" style={{ color: palette.accentDarkHex }}>
                  [탐정 찬스] 문법 단서 제공 · [해볼 쌤 팁] 선생님을 위한 설명서
                </div>
                <div className="text-[11px] font-bold text-slate-600">
                  현재 · 과거 · 부정 · 희망 · 진행 · 요청 · 조건 · 이유 30단원
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // particle (조사 결합 - 초록/에메랄드 테마)
    return (
      <div
        className="h-full w-full rounded-2xl border-2 p-6 flex flex-col justify-between"
        style={{
          backgroundColor: '#FFFFFF',
          borderColor: palette.borderHex,
        }}
      >
        {/* Top Mascot Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="rounded-2xl p-2 border"
              style={{
                backgroundColor: palette.canvasBg,
                borderColor: palette.borderHex,
              }}
            >
              <ManduMascot size="lg" interactive={false} />
            </div>
            <div>
              <div
                className="text-xs font-extrabold tracking-wide"
                style={{ color: palette.mutedHex }}
              >
                명사 끝 받침을 찾는 탐정 원리
              </div>
              <div
                className="text-lg font-black mt-0.5"
                style={{ color: palette.accentDarkHex, fontFamily: FONT_TITLE }}
              >
                조사 결합 30단원 마스터
              </div>
            </div>
          </div>
        </div>

        {/* Batchim Detective Visual Cards */}
        <div className="grid grid-cols-2 gap-3 my-2 flex-1">
          {/* Card 1: 받침 X */}
          <div
            className="rounded-xl border-2 p-3.5 flex flex-col items-center justify-between text-center"
            style={{
              backgroundColor: palette.canvasBg,
              borderColor: palette.borderHex,
            }}
          >
            <div className="w-full flex items-center justify-between text-[11px] font-black">
              <span style={{ color: '#D97706' }}>받침 X</span>
              <span style={{ color: palette.mutedHex }}>→ -는</span>
            </div>
            <div className="w-16 h-16 rounded-xl bg-white border border-emerald-200 p-1 flex items-center justify-center my-1">
              {friendImg && (
                <img src={friendImg} alt="친구" className="w-full h-full object-contain" />
              )}
            </div>
            <div>
              <div
                style={{ fontFamily: FONT_HAND }}
                className="text-3xl font-black leading-none text-slate-900"
              >
                친구<span style={{ color: '#E03131' }}>는</span>
              </div>
              <div className="text-[11px] font-bold text-slate-600 mt-1">
                친구는 웃어요.
              </div>
            </div>
          </div>

          {/* Card 2: 받침 O */}
          <div
            className="rounded-xl border-2 p-3.5 flex flex-col items-center justify-between text-center"
            style={{
              backgroundColor: palette.canvasBg,
              borderColor: palette.borderHex,
            }}
          >
            <div className="w-full flex items-center justify-between text-[11px] font-black">
              <span style={{ color: '#D97706' }}>받침 O</span>
              <span style={{ color: palette.mutedHex }}>→ -은</span>
            </div>
            <div className="w-16 h-16 rounded-xl bg-white border border-emerald-200 p-1 flex items-center justify-center my-1">
              {bagImg && (
                <img src={bagImg} alt="가방" className="w-full h-full object-contain" />
              )}
            </div>
            <div>
              <div
                style={{ fontFamily: FONT_HAND }}
                className="text-3xl font-black leading-none text-slate-900"
              >
                가방<span style={{ color: '#E03131' }}>은</span>
              </div>
              <div className="text-[11px] font-bold text-slate-600 mt-1">
                가방은 무거워요.
              </div>
            </div>
          </div>
        </div>

        {/* Detective Tip Strip */}
        <div
          className="rounded-xl border px-4 py-2.5 flex items-center gap-3"
          style={{
            backgroundColor: palette.softHex,
            borderColor: palette.borderHex,
          }}
        >
          {/* Magnifier SVG */}
          <svg viewBox="0 0 32 32" className="w-7 h-7 shrink-0" aria-hidden="true">
            <circle cx="14" cy="14" r="8" fill="#FFFFFF" stroke="#059669" strokeWidth="2.4" />
            <path d="M20 20 L28 28" stroke="#065F46" strokeWidth="3" strokeLinecap="round" />
            <circle cx="14" cy="14" r="3" fill="#10B981" opacity="0.35" />
          </svg>
          <div>
            <div className="text-xs font-black" style={{ color: palette.accentDarkHex }}>
              은/는 · 이/가 · 을/를 · 에/에서 · 부터/까지 · 만/밖에 · 께서/께
            </div>
            <div className="text-[11px] font-bold text-slate-700">
              기초적인 격조사부터 말맛을 살리는 보조사까지 + 한국어 필수 명사 150단어장
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`menu-cover-sheet relative overflow-hidden flex flex-col justify-between select-none ${className}`}
      style={{
        width: '1122px',
        height: '794px',
        backgroundColor: palette.canvasBg,
        border: `3px solid ${palette.accentHex}`,
        borderRadius: '18px',
        padding: '30px 38px 24px 38px',
        boxSizing: 'border-box',
        fontFamily: FONT_GOTHIC,
        color: '#0F172A',
      }}
    >
      {/* Subtle Top Color Bar Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-2.5"
        style={{ backgroundColor: palette.accentHex }}
      />

      {/* 1. Header Brand Strip */}
      <div
        className="flex items-center justify-between pb-3.5 border-b-2 shrink-0"
        style={{ borderColor: palette.borderHex }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center border"
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: palette.borderHex,
            }}
          >
            <ManduMascot size="xs" interactive={false} />
          </div>
          <div className="flex items-baseline gap-2.5">
            <span
              className="text-lg font-black tracking-tight"
              style={{ color: palette.accentDarkHex, fontFamily: FONT_TITLE }}
            >
              해볼 한국어
            </span>
            <span className="text-xs font-bold text-slate-500">
              다문화·초등 한국어 맞춤형 학습 교구
            </span>
          </div>
        </div>

        <div
          className="text-xs font-black tracking-widest uppercase"
          style={{ color: palette.accentHex }}
        >
          {cover.orderNumber} / {cover.englishCode}
        </div>
      </div>

      {/* 2. Main 2-Column Editorial Split */}
      <div className="grid grid-cols-[53fr_47fr] gap-8 items-stretch flex-1 py-6 min-h-0">
        {/* Left: Brand Copy & Highlights */}
        <div className="flex flex-col justify-between min-w-0 pr-1">
          <div>
            <div
              className="text-sm font-extrabold tracking-tight mb-2"
              style={{ color: palette.accentHex }}
            >
              {cover.kicker}
            </div>

            <h1
              className="text-[52px] font-black leading-[1.12] tracking-tight"
              style={{ color: palette.accentDarkHex, fontFamily: FONT_TITLE }}
            >
              {cover.titleKo}
            </h1>

            <div
              className="text-[15px] font-bold mt-2 tracking-tight"
              style={{ color: palette.mutedHex }}
            >
              {cover.subtitleEn}
            </div>

            <p className="mt-4 text-[17px] font-bold leading-[1.55] text-slate-800 break-keep">
              {cover.tagline}
            </p>
          </div>

          {/* 3 Clean Highlight Rows */}
          <div
            className="rounded-2xl border-2 bg-white px-5 py-3.5 divide-y"
            style={{
              borderColor: palette.borderHex,
            }}
          >
            {cover.highlights.map((h) => (
              <div
                key={h.index}
                className="py-2.5 first:pt-1 last:pb-1 flex items-start gap-3"
                style={{ borderColor: palette.softHex }}
              >
                <span
                  className="text-base font-black tabular-nums leading-snug shrink-0"
                  style={{ color: palette.accentHex }}
                >
                  {h.index}.
                </span>
                <div className="min-w-0">
                  <div className="text-[14.5px] font-black text-slate-900 leading-snug">
                    {h.title}
                  </div>
                  <div className="text-[12.5px] font-semibold text-slate-600 leading-snug mt-0.5 break-keep">
                    {h.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Character & Menu Illustration Stage */}
        <div className="min-w-0 h-full flex items-stretch">
          {renderRightVisualShowcase()}
        </div>
      </div>

      {/* 3. Footer Strip */}
      <div
        className="pt-3 border-t flex items-center justify-between text-[11.5px] font-bold shrink-0"
        style={{
          borderColor: palette.borderHex,
          color: palette.mutedHex,
        }}
      >
        <span>해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어</span>
        <span>플래시카드 · A4 학습지 인쇄 · 인터랙티브 게임</span>
      </div>
    </div>
  );
};
