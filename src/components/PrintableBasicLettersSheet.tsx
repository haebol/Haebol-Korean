import React from 'react';
import { speakKorean, playCutePop } from '../utils/audio';
import {
  BASIC_LETTERS_DATA,
  BasicLetterPageData,
  BasicLetterCardData,
  getBasicLetterPage
} from '../data/basicLettersData';
import { BASIC_LETTERS_ILLUSTRATIONS } from '../data/basicLettersIllustrations';

// 초등 다문화·외국인 학습자를 위한 1:1 단일 로마자 표기 매핑 기준
const CONSONANT_ROMAJA_RAW: Record<string, string> = {
  'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅅ': 's',
  'ㅇ': '', 'ㅈ': 'j', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
  'ㄲ': 'kk', 'ㄸ': 'tt', 'ㅃ': 'pp', 'ㅆ': 'ss', 'ㅉ': 'jj'
};

// 자음 음가(발음) 매핑: '기역', '니은' 등 자음 이름 대신 '그, 느, 드...' 발음 재생용
export const BASIC_CONSONANT_PHONIC_MAP: Record<string, string> = {
  'ㄱ': '그', 'ㄴ': '느', 'ㄷ': '드', 'ㄹ': '르', 'ㅁ': '므', 'ㅂ': '브', 'ㅅ': '스',
  'ㅇ': '으', 'ㅈ': '즈', 'ㅊ': '츠', 'ㅋ': '크', 'ㅌ': '트', 'ㅍ': '프', 'ㅎ': '흐',
  'ㄲ': '끄', 'ㄸ': '뜨', 'ㅃ': '쁘', 'ㅆ': '쓰', 'ㅉ': '쯔'
};

const getConsonantSound = (consonant: string): string => {
  return BASIC_CONSONANT_PHONIC_MAP[consonant] || consonant;
};

// 15~21쪽 이중모음 분할 카드 클릭시 단일 합성 음성 ('와', '워', '외', '위', '왜', '웨', '의')
const COMPOUND_VOWEL_AUDIO_MAP: Record<number, string> = {
  15: '와',
  16: '워',
  17: '외',
  18: '위',
  19: '왜',
  20: '웨',
  21: '의'
};

const VOWEL_ROMAJA_RAW: Record<string, string> = {
  'ㅏ': 'a', 'ㅑ': 'ya', 'ㅓ': 'eo', 'ㅕ': 'yeo', 'ㅗ': 'o', 'ㅛ': 'yo',
  'ㅜ': 'u', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅣ': 'i',
  'ㅐ': 'ae', 'ㅒ': 'yae', 'ㅔ': 'e', 'ㅖ': 'ye', 'ㅘ': 'wa', 'ㅝ': 'wo',
  'ㅚ': 'oe', 'ㅟ': 'wi', 'ㅙ': 'wae', 'ㅞ': 'we', 'ㅢ': 'ui'
};

const getConsonantRomaja = (c: string): string => {
  if (c === 'ㅇ') return '[-]';
  const val = CONSONANT_ROMAJA_RAW[c];
  return val ? `[${val}]` : '';
};

const getVowelRomaja = (v: string): string => {
  const val = VOWEL_ROMAJA_RAW[v];
  return val ? `[${val}]` : '';
};

const getSyllableRomaja = (c: string, v: string): string => {
  const cVal = CONSONANT_ROMAJA_RAW[c] ?? '';
  const vVal = VOWEL_ROMAJA_RAW[v] ?? '';
  return `[${cVal}${vVal}]`;
};

interface BasicLetterWorksheetPageProps {
  pageIndex?: number; // 0 to 20
  pageData?: BasicLetterPageData;
  interactiveAudio?: boolean;
  className?: string;
}

export const BasicLetterWorksheetPage: React.FC<BasicLetterWorksheetPageProps> = ({
  pageIndex = 0,
  pageData: propPageData,
  interactiveAudio = true,
  className = ''
}) => {
  const data: BasicLetterPageData = propPageData || getBasicLetterPage(pageIndex);

  const [activeCompoundIdx, setActiveCompoundIdx] = React.useState<number | null>(null);
  const [hoveredCompoundIdx, setHoveredCompoundIdx] = React.useState<number | null>(null);
  const compoundTimerRef = React.useRef<any>(null);

  const handleCharClick = (text: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(text, 0.85);
  };

  // 1~3번 카드 수식 상단 렌더러
  const renderFormula = (card: BasicLetterCardData, cardIdx: number = 0) => {
    const shouldShowRomaja = [1, 2, 6, 7, 8, 11, 12, 13, 14].includes(data.pageNumber);

    if (data.combinationType === 'horizontal') {
      // 1. [좌우 결합형 (ㅏ, ㅓ, ㅣ, ㅑ, ㅕ, ㅐ, ㅔ, ㅒ, ㅖ) - 1, 2, 6, 7, 8, 11, 12, 13, 14쪽]
      return (
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full max-w-[204px]">
          {/* 자음 (빨강 박스 + 로마자) */}
          <div className="flex-1 max-w-[46px] flex flex-col items-center">
            <div
              className={`w-full aspect-square rounded-xl bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center font-korean-gothic ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
              }`}
              onClick={() => handleCharClick(getConsonantSound(card.consonant))}
              title={interactiveAudio ? `소리 듣기: ${card.consonant} (${getConsonantSound(card.consonant)})` : undefined}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                  color: '#dc2626',
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)'
                }}
              >
                {card.consonant}
              </span>
            </div>
            {shouldShowRomaja && (
              <span className="romaja-badge text-[10px] sm:text-[11px] font-black text-[#1e3a8a] leading-none mt-1 select-none font-sans tracking-tight">
                {getConsonantRomaja(card.consonant)}
              </span>
            )}
          </div>

          <span className={`text-purple-600 font-black text-base sm:text-lg select-none ${shouldShowRomaja ? 'mb-3.5' : ''}`}>
            ➕
          </span>

          {/* 모음 (파랑 박스 + 로마자) */}
          <div className="flex-1 max-w-[46px] flex flex-col items-center">
            <div
              className={`w-full aspect-square rounded-xl bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center font-korean-gothic ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
              }`}
              onClick={() => handleCharClick(card.vowel)}
              title={interactiveAudio ? `소리 듣기: 모음 (${card.vowel})` : undefined}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                  color: '#0077c8',
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)'
                }}
              >
                {card.vowel}
              </span>
            </div>
            {shouldShowRomaja && (
              <span className="romaja-badge text-[10px] sm:text-[11px] font-black text-[#1e3a8a] leading-none mt-1 select-none font-sans tracking-tight">
                {getVowelRomaja(card.vowel)}
              </span>
            )}
          </div>

          <span className={`text-purple-600 font-black text-base sm:text-lg select-none ${shouldShowRomaja ? 'mb-3.5' : ''}`}>
            🟰
          </span>

          {/* 완성 글자 (검정 박스 + 로마자) */}
          <div className="flex-1 max-w-[50px] flex flex-col items-center">
            <div
              className={`w-full aspect-square rounded-xl bg-[#fffbeb] border-2 border-slate-700 flex items-center justify-center font-korean-gothic shadow-2xs ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
              }`}
              onClick={() => handleCharClick(card.syllable)}
              title={interactiveAudio ? `소리 듣기: ${card.syllable}` : undefined}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                  color: '#0f172a',
                  fontSize: 'clamp(2.1rem, 3.2vw, 2.7rem)'
                }}
              >
                {card.syllable}
              </span>
            </div>
            {shouldShowRomaja && (
              <span className="romaja-badge text-[10px] sm:text-[11px] font-black text-[#1e3a8a] leading-none mt-1 select-none font-sans tracking-tight">
                {getSyllableRomaja(card.consonant, card.vowel)}
              </span>
            )}
          </div>
        </div>
      );
    }

    if (data.combinationType === 'vertical') {
      // 2. [상하 결합형 (ㅗ, ㅜ, ㅡ, ㅛ, ㅠ) - 3, 4, 5, 9, 10쪽]
      return (
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 w-full max-w-[190px]">
          {/* 세로형 결합: 자음(위) + 모음(아래) */}
          <div className="flex flex-col items-center justify-center">
            {/* 빨강자음카드 위에 [로마자표기] */}
            <span className="romaja-badge text-[9.5px] sm:text-[10.5px] font-black text-[#1e3a8a] leading-none mb-0.5 select-none font-sans tracking-tight">
              {getConsonantRomaja(card.consonant)}
            </span>

            {/* 자음 (빨강 박스) */}
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center font-korean-gothic ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
              }`}
              onClick={() => handleCharClick(getConsonantSound(card.consonant))}
              title={interactiveAudio ? `소리 듣기: ${card.consonant} (${getConsonantSound(card.consonant)})` : undefined}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                  color: '#dc2626',
                  fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)'
                }}
              >
                {card.consonant}
              </span>
            </div>

            <span className="text-purple-600 font-black text-xs leading-none select-none my-0.5">➕</span>

            {/* 모음 (파랑 박스) */}
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#eff6ff] border-2 border-[#60a5fa] flex items-center justify-center font-korean-gothic ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
              }`}
              onClick={() => handleCharClick(card.vowel)}
              title={interactiveAudio ? `소리 듣기: 모음 (${card.vowel})` : undefined}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                  color: '#0077c8',
                  fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)'
                }}
              >
                {card.vowel}
              </span>
            </div>

            {/* 파랑모음카드 아래에 [로마자표기] */}
            <span className="romaja-badge text-[9.5px] sm:text-[10.5px] font-black text-[#1e3a8a] leading-none mt-0.5 select-none font-sans tracking-tight">
              {getVowelRomaja(card.vowel)}
            </span>
          </div>

          <span className="text-purple-600 font-black text-base sm:text-lg select-none">🟰</span>

          {/* 완성 글자 (검정 박스 + 아래 로마자) */}
          <div className="flex flex-col items-center justify-center">
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#fffbeb] border-2 border-slate-700 flex items-center justify-center font-korean-gothic shadow-2xs ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
              }`}
              onClick={() => handleCharClick(card.syllable)}
              title={interactiveAudio ? `소리 듣기: ${card.syllable}` : undefined}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                  color: '#0f172a',
                  fontSize: 'clamp(2.1rem, 3.2vw, 2.7rem)'
                }}
              >
                {card.syllable}
              </span>
            </div>
            {/* 검정음절카드 아래에 [로마자표기] */}
            <span className="romaja-badge text-[10px] sm:text-[11px] font-black text-[#1e3a8a] leading-none mt-1 select-none font-sans tracking-tight">
              {getSyllableRomaja(card.consonant, card.vowel)}
            </span>
          </div>
        </div>
      );
    }

    // 3. [복합/이중모음 결합형 (ㅘ, ㅝ, ㅚ, ㅟ, ㅙ, ㅞ, ㅢ) - 15~21쪽]
    const [underVowel, rightVowel] = data.vowelComponents || ['ㅗ', 'ㅏ'];
    const compoundSound = COMPOUND_VOWEL_AUDIO_MAP[data.pageNumber] || data.vowel;

    const isPairActive = activeCompoundIdx === cardIdx;
    const isPairHovered = hoveredCompoundIdx === cardIdx;

    const triggerCompoundPair = () => {
      handleCharClick(compoundSound);
      setActiveCompoundIdx(cardIdx);
      if (compoundTimerRef.current) clearTimeout(compoundTimerRef.current);
      compoundTimerRef.current = setTimeout(() => {
        setActiveCompoundIdx(null);
      }, 400);
    };

    const vowelCardClasses = `w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-korean-gothic transition-all duration-150 select-none ${
      interactiveAudio ? 'cursor-pointer' : ''
    } ${
      isPairActive
        ? 'bg-blue-200 border-2 border-blue-600 ring-2 ring-blue-400 scale-95 shadow-inner'
        : isPairHovered && interactiveAudio
        ? 'bg-blue-100 border-2 border-blue-500 scale-105 shadow-xs'
        : 'bg-[#eff6ff] border-2 border-[#60a5fa]'
    }`;

    return (
      <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full max-w-[210px]">
        {/* 복합 결합 클러스터: [자음/아래모음] + [우측모음] */}
        <div className="relative flex items-center gap-0.5 sm:gap-1">
          {/* 좌측 세로: 자음(위) + 아래모음(아래) */}
          <div className="flex flex-col items-center gap-0.5">
            {/* 빨강자음카드 위에 [로마자표기] (예: [g]) */}
            <span className="romaja-badge text-[9.5px] sm:text-[10.5px] font-black text-[#1e3a8a] leading-none mb-0.5 select-none font-sans tracking-tight">
              {getConsonantRomaja(card.consonant)}
            </span>
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#fef2f2] border-2 border-[#f87171] flex items-center justify-center font-korean-gothic ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
              }`}
              onClick={() => handleCharClick(getConsonantSound(card.consonant))}
              title={interactiveAudio ? `소리 듣기: ${card.consonant} (${getConsonantSound(card.consonant)})` : undefined}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                  color: '#dc2626',
                  fontSize: 'clamp(1.35rem, 2vw, 1.65rem)'
                }}
              >
                {card.consonant}
              </span>
            </div>
            {/* 아래 모음 카드 (우측 모음과 동기화 활성화) */}
            <div
              className={vowelCardClasses}
              onPointerDown={() => setActiveCompoundIdx(cardIdx)}
              onPointerUp={() => {
                if (compoundTimerRef.current) clearTimeout(compoundTimerRef.current);
                compoundTimerRef.current = setTimeout(() => setActiveCompoundIdx(null), 300);
              }}
              onPointerEnter={() => setHoveredCompoundIdx(cardIdx)}
              onPointerLeave={() => setHoveredCompoundIdx(null)}
              onClick={triggerCompoundPair}
              title={interactiveAudio ? `소리 듣기: 모음 ${data.vowel} (${compoundSound})` : undefined}
            >
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                  color: '#0077c8',
                  fontSize: 'clamp(1.35rem, 2vw, 1.65rem)'
                }}
              >
                {underVowel}
              </span>
            </div>
          </div>

          {/* 중앙 '+' 기호 및 그 아래 교차점 결합 모음 로마자 표기 (예: [wa]) */}
          <div className="flex flex-col items-center justify-center self-center">
            <span className="text-purple-600 font-black text-xs leading-none select-none">➕</span>
            {/* ㅗ+ㅏ 교차점 하단 단일 결합 로마자 (예: [wa], [wo], [oe], [wi], [wae], [we], [ui]) */}
            <span className="romaja-badge text-[9.5px] sm:text-[10.5px] font-black text-[#1e3a8a] leading-none mt-2 sm:mt-2.5 select-none font-sans tracking-tight">
              {getVowelRomaja(data.vowel)}
            </span>
          </div>

          {/* 우측 모음 (아래 모음과 동기화 활성화) */}
          <div
            className={`${vowelCardClasses} self-center`}
            onPointerDown={() => setActiveCompoundIdx(cardIdx)}
            onPointerUp={() => {
              if (compoundTimerRef.current) clearTimeout(compoundTimerRef.current);
              compoundTimerRef.current = setTimeout(() => setActiveCompoundIdx(null), 300);
            }}
            onPointerEnter={() => setHoveredCompoundIdx(cardIdx)}
            onPointerLeave={() => setHoveredCompoundIdx(null)}
            onClick={triggerCompoundPair}
            title={interactiveAudio ? `소리 듣기: 모음 ${data.vowel} (${compoundSound})` : undefined}
          >
            <span
              className="font-black leading-none"
              style={{
                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                color: '#0077c8',
                fontSize: 'clamp(1.35rem, 2vw, 1.65rem)'
              }}
            >
              {rightVowel}
            </span>
          </div>
        </div>

        <span className="text-purple-600 font-black text-sm sm:text-base select-none">🟰</span>

        {/* 완성 글자 (검정 박스 + 아래에만 [로마자표기]) */}
        <div className="flex flex-col items-center justify-center">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#fffbeb] border-2 border-slate-700 flex items-center justify-center font-korean-gothic shadow-2xs ${
              interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
            }`}
            onClick={() => handleCharClick(card.syllable)}
            title={interactiveAudio ? `소리 듣기: ${card.syllable}` : undefined}
          >
            <span
              className="font-black leading-none"
              style={{
                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                color: '#0f172a',
                fontSize: 'clamp(1.85rem, 2.7vw, 2.3rem)'
              }}
            >
              {card.syllable}
            </span>
          </div>
          <span className="romaja-badge text-[10px] sm:text-[11px] font-black text-[#1e3a8a] leading-none mt-1 select-none font-sans tracking-tight">
            {getSyllableRomaja(card.consonant, card.vowel)}
          </span>
        </div>
      </div>
    );
  };

  const illustrationSvg = BASIC_LETTERS_ILLUSTRATIONS[data.wordCard.word] || null;

  return (
    <div
      className={`print-sheet printable-word-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-700 p-2 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* 1. Header Row (동적 원기호 및 해당 모음 표기) */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-korean-gothic min-w-0">
          <span className="text-base leading-none shrink-0">✏️</span>
          <span className="break-keep">
            해볼 한국어 [기본글자] {data.circledNumber} {data.vowel}와 만나요 | Build Syllables with {data.vowel}
          </span>
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex items-center gap-3 sm:gap-5 font-korean-gothic shrink-0">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 3. 4열 카드 그리드 (카드 1~3: 자모 결합 공식 / 카드 4: 단어 및 그림 일러스트) */}
      <div className="jamo-card-grid jamo-cols-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 print:grid-cols-4 gap-2 sm:gap-3 my-1 flex-1">
        {/* ==================== CARDS 1 ~ 3 ==================== */}
        {data.cards.map((card, idx) => (
          <div
            key={`card-${idx}-${card.syllable}`}
            className="stroke-card jamo-stroke-card bg-white rounded-2xl sm:rounded-3xl border border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-2 sm:p-2.5 flex flex-col justify-between"
          >
            {/* 상단 공식 박스 (4번 카드 일러스트와 정확히 동일한 수직 높이 및 중앙 정렬) */}
            <div className="jamo-card-top flex items-center justify-center py-1 sm:py-2 flex-1 min-h-[90px] sm:min-h-[105px]">
              {renderFormula(card, idx)}
            </div>

            {/* 하단 3개 행: 1행 회색 따라쓰기 + 2,3행 빈 십자선 칸 (정사각형) */}
            <div className="jamo-rows-container space-y-1 sm:space-y-1.5 mt-auto w-full">
              {/* 1행: 회색 따라쓰기 */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                {[card.syllable, card.syllable].map((char, cIdx) => (
                  <div
                    key={`trace-${idx}-${cIdx}`}
                    className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r last:border-r-0 border-dashed border-slate-400 overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                    <span
                      className="relative z-10 leading-none select-none font-normal font-kyobo flex items-center justify-center cursor-pointer"
                      style={{
                        fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important",
                        fontWeight: 400,
                        fontSize: 'clamp(3.8rem, 6.2vw, 4.8rem)',
                        color: '#94a3b8'
                      }}
                      onClick={() => handleCharClick(char)}
                      title={interactiveAudio ? `소리 듣기: ${char}` : undefined}
                    >
                      {char}
                    </span>
                  </div>
                ))}
              </div>

              {/* 2행: 스스로 쓰기 빈 점선 십자선 칸 */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                <div className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r border-dashed border-slate-400">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
                <div className="jamo-practice-cell relative aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
              </div>

              {/* 3행: 스스로 쓰기 빈 점선 십자선 칸 */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                <div className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r border-dashed border-slate-400">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
                <div className="jamo-practice-cell relative aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ==================== CARD 4: 단어장 가변 레이아웃 ==================== */}
        <div className="stroke-card jamo-stroke-card bg-white rounded-2xl sm:rounded-3xl border border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-2 sm:p-2.5 flex flex-col justify-between">
          {/* 상단: 완성된 단어(검정 텍스트) + 해당 단어 유아용 그림 일러스트 */}
          <div
            className={`jamo-card-top flex flex-col items-center justify-center py-1 sm:py-2 flex-1 min-h-[90px] sm:min-h-[105px] ${
              interactiveAudio ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
            }`}
            onClick={() => handleCharClick(data.wordCard.word)}
            title={interactiveAudio ? `단어 듣기: ${data.wordCard.word} (${data.wordCard.englishMeaning})` : undefined}
          >
            <div className="flex items-center justify-center max-h-[80px] sm:max-h-[92px]">
              {illustrationSvg}
            </div>
            <span
              className="font-black text-slate-900 text-xs sm:text-sm font-korean-gothic mt-0.5 tracking-wide"
              style={{ fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important" }}
            >
              {data.wordCard.word}
            </span>
          </div>

          {/* 하단 3개 행: 1~3음절에 따른 가변 분할 (프레임 높이 및 기준선 1~3번 카드와 100% 일치) */}
          <div className="jamo-rows-container space-y-1 sm:space-y-1.5 mt-auto w-full">
            {/* -------------------- 1음절 단어 (표, 배, 얘, 뭐) ➔ 1열 3행 정사각형 (왼쪽 표들과 동일 크기) -------------------- */}
            {data.wordCard.syllableCount === 1 && (
              <div className="jamo-single-col-table w-1/2 mx-auto space-y-1 sm:space-y-1.5">
                {/* 1행: 회색 따라쓰기 1칸 정사각형 */}
                <div className="jamo-practice-row w-full border border-dashed border-slate-400 bg-white">
                  <div className="jamo-practice-cell relative aspect-square w-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                    <span
                      className="relative z-10 leading-none select-none font-normal font-kyobo flex items-center justify-center cursor-pointer"
                      style={{
                        fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important",
                        fontWeight: 400,
                        fontSize: 'clamp(3.8rem, 6.2vw, 4.8rem)',
                        color: '#94a3b8'
                      }}
                      onClick={() => handleCharClick(data.wordCard.syllables[0])}
                      title={interactiveAudio ? `소리 듣기: ${data.wordCard.syllables[0]}` : undefined}
                    >
                      {data.wordCard.syllables[0]}
                    </span>
                  </div>
                </div>

                {/* 2행: 빈 점선 십자선 1칸 정사각형 */}
                <div className="jamo-practice-row w-full border border-dashed border-slate-400 bg-white">
                  <div className="jamo-practice-cell relative aspect-square w-full flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                </div>

                {/* 3행: 빈 점선 십자선 1칸 정사각형 */}
                <div className="jamo-practice-row w-full border border-dashed border-slate-400 bg-white">
                  <div className="jamo-practice-cell relative aspect-square w-full flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* -------------------- 2음절 단어 (사자, 버터, 포도 등) ➔ 2칸 균등 분할 -------------------- */}
            {data.wordCard.syllableCount === 2 && (
              <>
                {/* 1행: 회색 따라쓰기 2글자 */}
                <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                  {data.wordCard.syllables.map((char, cIdx) => (
                    <div
                      key={`word-syl-${cIdx}`}
                      className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r last:border-r-0 border-dashed border-slate-400 overflow-hidden"
                    >
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                      <span
                        className="relative z-10 leading-none select-none font-normal font-kyobo flex items-center justify-center cursor-pointer"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important",
                          fontWeight: 400,
                          fontSize: 'clamp(3.8rem, 6.2vw, 4.8rem)',
                          color: '#94a3b8'
                        }}
                        onClick={() => handleCharClick(char)}
                        title={interactiveAudio ? `소리 듣기: ${char}` : undefined}
                      >
                        {char}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 2행: 스스로 쓰기 빈 십자선 2칸 */}
                <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                  <div className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r border-dashed border-slate-400">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                  <div className="jamo-practice-cell relative aspect-square flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                </div>

                {/* 3행: 스스로 쓰기 빈 십자선 2칸 */}
                <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                  <div className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r border-dashed border-slate-400">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                  <div className="jamo-practice-cell relative aspect-square flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                </div>
              </>
            )}

            {/* -------------------- 3음절 단어 (스웨터) ➔ 3칸 좁게 균등 분할 -------------------- */}
            {data.wordCard.syllableCount === 3 && (
              <>
                {/* 1행: 회색 따라쓰기 3글자 */}
                <div className="jamo-practice-row w-full grid grid-cols-3 border border-dashed border-slate-400 bg-white">
                  {data.wordCard.syllables.map((char, cIdx) => (
                    <div
                      key={`word-syl-3-${cIdx}`}
                      className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r last:border-r-0 border-dashed border-slate-400 overflow-hidden"
                    >
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                      <span
                        className="relative z-10 leading-none select-none font-normal font-kyobo flex items-center justify-center cursor-pointer"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important",
                          fontWeight: 400,
                          fontSize: 'clamp(2.7rem, 4.4vw, 3.4rem)',
                          color: '#94a3b8'
                        }}
                        onClick={() => handleCharClick(char)}
                        title={interactiveAudio ? `소리 듣기: ${char}` : undefined}
                      >
                        {char}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 2행: 스스로 쓰기 빈 십자선 3칸 */}
                <div className="jamo-practice-row w-full grid grid-cols-3 border border-dashed border-slate-400 bg-white">
                  {Array.from({ length: 3 }).map((_, cIdx) => (
                    <div
                      key={`empty-row2-${cIdx}`}
                      className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r last:border-r-0 border-dashed border-slate-400"
                    >
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                    </div>
                  ))}
                </div>

                {/* 3행: 스스로 쓰기 빈 십자선 3칸 */}
                <div className="jamo-practice-row w-full grid grid-cols-3 border border-dashed border-slate-400 bg-white">
                  {Array.from({ length: 3 }).map((_, cIdx) => (
                    <div
                      key={`empty-row3-${cIdx}`}
                      className="jamo-practice-cell relative aspect-square flex items-center justify-center border-r last:border-r-0 border-dashed border-slate-400"
                    >
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 4. Sheet Footer (1~15쪽과 완전 일치) */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">
          해볼 한국어(hbkorean.ai.studio) | 다문화·초등 한국어 맞춤형 학습 교구
        </span>
      </div>
    </div>
  );
};

// Backward-compatible alias for Page 1
export const JamoCombinationWorksheetPage: React.FC<{
  interactiveAudio?: boolean;
  className?: string;
}> = (props) => {
  return <BasicLetterWorksheetPage pageIndex={0} {...props} />;
};
