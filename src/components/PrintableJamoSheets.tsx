import React from 'react';
import { speakKorean, playCutePop } from '../utils/audio';

// 14 Korean Primary Consonants (7 Left: ㄱ~ㅅ, 7 Right: ㅇ~ㅎ)
export const CONSONANTS_DATA = [
  { left: { char: 'ㄱ', name: '기역' }, right: { char: 'ㅇ', name: '이응' } },
  { left: { char: 'ㄴ', name: '니은' }, right: { char: 'ㅈ', name: '지읒' } },
  { left: { char: 'ㄷ', name: '디귿' }, right: { char: 'ㅊ', name: '치읓' } },
  { left: { char: 'ㄹ', name: '리을' }, right: { char: 'ㅋ', name: '키읔' } },
  { left: { char: 'ㅁ', name: '미음' }, right: { char: 'ㅌ', name: '티읕' } },
  { left: { char: 'ㅂ', name: '비읍' }, right: { char: 'ㅍ', name: '피읖' } },
  { left: { char: 'ㅅ', name: '시옷' }, right: { char: 'ㅎ', name: '히읗' } },
];

// 22 Korean Vowels Array (11 Left: ㅏ~ㅣ+♡, 11 Right: ㅐ~ㅢ)
export const VOWELS_DATA = [
  { left: 'ㅏ', right: 'ㅐ' },
  { left: 'ㅑ', right: 'ㅔ' },
  { left: 'ㅓ', right: 'ㅒ' },
  { left: 'ㅕ', right: 'ㅖ' },
  { left: 'ㅗ', right: 'ㅘ' },
  { left: 'ㅛ', right: 'ㅝ' },
  { left: 'ㅜ', right: 'ㅚ' },
  { left: 'ㅠ', right: 'ㅟ' },
  { left: 'ㅡ', right: 'ㅙ' },
  { left: 'ㅣ', right: 'ㅞ' },
  { left: '♡', right: 'ㅢ' },
];

// 15×11 자음 모음 쓰기 (조합표) 헤더 데이터
export const COMBO_CONSONANTS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
export const COMBO_VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];

// 초등 다문화·외국인 학습자를 위한 1:1 단일 로마자 표기 매핑 기준
export const CONSONANT_ROMAJA_MAP: Record<string, string> = {
  'ㄱ': '[g]',
  'ㄴ': '[n]',
  'ㄷ': '[d]',
  'ㄹ': '[r]',
  'ㅁ': '[m]',
  'ㅂ': '[b]',
  'ㅅ': '[s]',
  'ㅇ': '[-]',
  'ㅈ': '[j]',
  'ㅊ': '[ch]',
  'ㅋ': '[k]',
  'ㅌ': '[t]',
  'ㅍ': '[p]',
  'ㅎ': '[h]',
  'ㄲ': '[kk]',
  'ㄸ': '[tt]',
  'ㅃ': '[pp]',
  'ㅆ': '[ss]',
  'ㅉ': '[jj]'
};

// 자음 음가(발음) 매핑: 기역, 니은 등 자음 이름 대신 '그, 느, 드...' 발음 재생용
export const CONSONANT_PHONIC_SOUND_MAP: Record<string, string> = {
  'ㄱ': '그',
  'ㄴ': '느',
  'ㄷ': '드',
  'ㄹ': '르',
  'ㅁ': '므',
  'ㅂ': '브',
  'ㅅ': '스',
  'ㅇ': '으',
  'ㅈ': '즈',
  'ㅊ': '츠',
  'ㅋ': '크',
  'ㅌ': '트',
  'ㅍ': '프',
  'ㅎ': '흐'
};

export const VOWEL_ROMAJA_MAP: Record<string, string> = {
  'ㅏ': '[a]',
  'ㅑ': '[ya]',
  'ㅓ': '[eo]',
  'ㅕ': '[yeo]',
  'ㅗ': '[o]',
  'ㅛ': '[yo]',
  'ㅜ': '[u]',
  'ㅠ': '[yu]',
  'ㅡ': '[eu]',
  'ㅣ': '[i]',
  'ㅐ': '[ae]',
  'ㅒ': '[yae]',
  'ㅔ': '[e]',
  'ㅖ': '[ye]',
  'ㅘ': '[wa]',
  'ㅝ': '[wo]',
  'ㅚ': '[oe]',
  'ㅟ': '[wi]',
  'ㅙ': '[wae]',
  'ㅞ': '[we]',
  'ㅢ': '[ui]'
};

export const getJamoRomaja = (char: string): string => {
  return CONSONANT_ROMAJA_MAP[char] || VOWEL_ROMAJA_MAP[char] || '';
};

// Unicode Korean Syllable combination mapping
const CHOSEONG_INDEX_MAP: Record<string, number> = {
  'ㄱ': 0, 'ㄴ': 2, 'ㄷ': 3, 'ㄹ': 5, 'ㅁ': 6, 'ㅂ': 7,
  'ㅅ': 9, 'ㅇ': 11, 'ㅈ': 12, 'ㅊ': 14, 'ㅋ': 15, 'ㅌ': 16,
  'ㅍ': 17, 'ㅎ': 18
};

const JUNGSEONG_INDEX_MAP: Record<string, number> = {
  'ㅏ': 0, 'ㅑ': 2, 'ㅓ': 4, 'ㅕ': 6, 'ㅗ': 8,
  'ㅛ': 12, 'ㅜ': 13, 'ㅠ': 17, 'ㅡ': 18, 'ㅣ': 20
};

export const combineHangul = (c: string, v: string): string => {
  const cIdx = CHOSEONG_INDEX_MAP[c];
  const vIdx = JUNGSEONG_INDEX_MAP[v];
  if (cIdx === undefined || vIdx === undefined) return '';
  const code = 0xac00 + (cIdx * 21 + vIdx) * 28;
  return String.fromCharCode(code);
};

interface JamoSheetProps {
  interactiveAudio?: boolean;
  className?: string;
}

// [학습지] - [모음자음] 전용 학교안심 받아쓰기 고정 스타일
export const JamoStyleSheet: React.FC = () => (
  <style>{`
    @font-face {
      font-family: 'Hakgyoansim Badasseugi';
      src: url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
           url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimBadasseugiTTF-L.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: '학교안심 받아쓰기';
      src: url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
           url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimBadasseugiTTF-L.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: '학교안심받아쓰기';
      src: url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
           url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimBadasseugiTTF-L.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }
    @font-face {
      font-family: 'HakgyoansimBadasseugiTTF-L';
      src: url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
           url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimBadasseugiTTF-L.woff2') format('woff2');
      font-weight: 100 900;
      font-style: normal;
      font-display: swap;
    }

    /* [학습지] - [모음자음] 표 내부, 격자 셀, 자모 글씨에 학교안심받아쓰기 적용 */
    .printable-jamo-sheet table,
    .printable-jamo-sheet table *:not(.romaja-badge),
    .printable-jamo-sheet .square-grid-table,
    .printable-jamo-sheet .square-grid-table *:not(.romaja-badge),
    .printable-jamo-sheet .consonant-table,
    .printable-jamo-sheet .consonant-table *:not(.romaja-badge),
    .printable-jamo-sheet .vowel-table,
    .printable-jamo-sheet .vowel-table *:not(.romaja-badge),
    .printable-jamo-sheet .combo-table,
    .printable-jamo-sheet .combo-table *:not(.romaja-badge),
    .printable-jamo-sheet .large-combo-table,
    .printable-jamo-sheet .large-combo-table *:not(.romaja-badge),
    .printable-jamo-sheet .stroke-order-table,
    .printable-jamo-sheet .stroke-order-table *:not(.romaja-badge),
    .font-badasseugi:not(.romaja-badge),
    .font-badasseugi *:not(.romaja-badge) {
      font-family: 'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif !important;
    }

    /* 최상단 헤더 타이틀 1행: 그림카드와 동일한 나눔바른고딕 / 굵은 고딕 강제 적용 + 다국어 폴백 */
    .printable-jamo-sheet .sheet-header-title,
    .printable-jamo-sheet .sheet-header-title *,
    .printable-jamo-sheet .sheet-header-text,
    .sheet-header-title,
    .sheet-header-title *,
    .sheet-header-text {
      font-family: 'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', '학교안심 바른돋움', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans KR', system-ui, sans-serif !important;
      font-weight: 700 !important;
    }

    /* 우측 학년/이름 영역: 초등 공교육 표준 바른돋움체 + 다국어 폴백 */
    .printable-jamo-sheet .sheet-header-info,
    .printable-jamo-sheet .sheet-header-info *,
    .printable-jamo-sheet .font-korean-gothic,
    .printable-jamo-sheet .font-korean-gothic * {
      font-family: 'Hakgyoansim Bareondotum', '학교안심 바른돋움', 'NanumBarunGothic', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans KR', system-ui, sans-serif !important;
    }

    /* 다문화·외국인 학습자용 1:1 로마자 표기 스타일 (네이비 톤, 진하게, 인쇄 레이아웃 완벽 보존) */
    .printable-jamo-sheet .romaja-badge,
    .romaja-badge {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      font-weight: 800 !important;
      color: #1e3a8a !important; /* navy */
    }
  `}</style>
);

// 1. 자음 쓰기 학습지 (8×18)
export const ConsonantsWorksheetPage: React.FC<JamoSheetProps> = ({
  interactiveAudio = true,
  className = ''
}) => {
  const handleCharClick = (char: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(char, 0.85);
  };

  return (
    <div
      className={`print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-300 p-2 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      {/* 1. Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-nanum-barun-gothic sheet-header-title min-w-0">
          <span className="text-base leading-none shrink-0">🥟</span>
          <span
            className="sheet-header-text font-nanum-barun-gothic font-black break-keep"
            style={{ fontFamily: "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', sans-serif", fontWeight: 900 }}
          >
            해볼한국어 [한글] ① 자음 쓰기 | Korean Consonant Writing
          </span>
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex items-center gap-3 sm:gap-5 font-korean-gothic sheet-header-info shrink-0">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 2. Main 8×18 Table */}
      <table className="square-grid-table consonant-table w-full border-collapse border border-slate-700 bg-white">
        <thead>
          <tr className="bg-slate-100 text-slate-900 font-bold font-badasseugi">
            {/* 좌측 9열 (1열 자음 + 2~9열 8회 따라쓰기) */}
            <th
              style={{
                width: '5.55%',
                border: '1.5px solid #374151',
                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                fontWeight: 700,
                fontSize: '1.45rem',
                lineHeight: 1
              }}
              className="py-1 bg-amber-50 text-amber-950 font-black font-badasseugi"
            >
              자음
            </th>
            {Array.from({ length: 8 }, (_, i) => (
              <th
                key={`head-left-${i}`}
                style={{
                  width: '5.55%',
                  border: '1.5px solid #374151',
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                  fontWeight: 700,
                  fontSize: '1.45rem',
                  lineHeight: 1
                }}
                className="py-1 text-slate-700 font-bold font-badasseugi"
              >
                {i + 1}
              </th>
            ))}

            {/* 우측 9열 (10열 자음 + 11~18열 8회 따라쓰기) */}
            <th
              style={{
                width: '5.55%',
                border: '1.5px solid #374151',
                borderLeft: '2.5px solid #1e293b',
                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                fontWeight: 700,
                fontSize: '1.45rem',
                lineHeight: 1
              }}
              className="py-1 bg-amber-50 text-amber-950 font-black font-badasseugi"
            >
              자음
            </th>
            {Array.from({ length: 8 }, (_, i) => (
              <th
                key={`head-right-${i}`}
                style={{
                  width: '5.55%',
                  border: '1.5px solid #374151',
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                  fontWeight: 700,
                  fontSize: '1.45rem',
                  lineHeight: 1
                }}
                className="py-1 text-slate-700 font-bold font-badasseugi"
              >
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CONSONANTS_DATA.map((row, rowIdx) => (
            <tr key={`consonant-row-${rowIdx}`} className="border-b-[1.5px] border-slate-700">
              {/* 1열: 가장 왼쪽 1열 아래로 'ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ' */}
              <td
                style={{ width: '5.55%', border: '1.5px solid #374151' }}
                className={`text-center align-middle p-0 bg-amber-50/70 ${interactiveAudio ? 'cursor-pointer hover:bg-amber-100/90' : ''}`}
                onClick={() => handleCharClick(row.left.char)}
                title={interactiveAudio ? `소리 듣기: ${row.left.name}` : undefined}
              >
                <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-amber-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-amber-300 pointer-events-none" />
                  <span
                    className="relative z-10 leading-none select-none font-black font-badasseugi whitespace-nowrap text-slate-950 -translate-y-1 sm:-translate-y-1.5"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: '2.15rem',
                      color: '#111827'
                    }}
                  >
                    {row.left.char}
                  </span>
                  {CONSONANT_ROMAJA_MAP[row.left.char] && (
                    <span className="romaja-badge absolute bottom-0.5 inset-x-0 text-center text-[10px] sm:text-[11px] font-black leading-none select-none tracking-tight z-20">
                      {CONSONANT_ROMAJA_MAP[row.left.char]}
                    </span>
                  )}
                </div>
              </td>

              {/* 2~9열: 좌측 자음 8번 따라쓰기 (1~2회: 회색 가이드 글자, 3~8회: 십자 점선 빈칸) */}
              {Array.from({ length: 8 }, (_, colIdx) => (
                <td
                  key={`cell-left-${rowIdx}-${colIdx}`}
                  style={{ width: '5.55%', border: '1.5px solid #374151' }}
                  className="text-center align-middle p-0"
                >
                  <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />

                    {colIdx < 2 ? (
                      <span
                        className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                          fontWeight: 700,
                          fontSize: '2.3rem',
                          color: '#94a3b8'
                        }}
                      >
                        {row.left.char}
                      </span>
                    ) : null}
                  </div>
                </td>
              ))}

              {/* 10열: 10열 아래로 'ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ' */}
              <td
                style={{ width: '5.55%', border: '1.5px solid #374151', borderLeft: '2.5px solid #1e293b' }}
                className={`text-center align-middle p-0 bg-amber-50/70 ${interactiveAudio ? 'cursor-pointer hover:bg-amber-100/90' : ''}`}
                onClick={() => handleCharClick(row.right.char)}
                title={interactiveAudio ? `소리 듣기: ${row.right.name}` : undefined}
              >
                <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-amber-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-amber-300 pointer-events-none" />
                  <span
                    className="relative z-10 leading-none select-none font-black font-badasseugi whitespace-nowrap text-slate-950 -translate-y-1 sm:-translate-y-1.5"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: '2.15rem',
                      color: '#111827'
                    }}
                  >
                    {row.right.char}
                  </span>
                  {CONSONANT_ROMAJA_MAP[row.right.char] && (
                    <span className="romaja-badge absolute bottom-0.5 inset-x-0 text-center text-[10px] sm:text-[11px] font-black leading-none select-none tracking-tight z-20">
                      {CONSONANT_ROMAJA_MAP[row.right.char]}
                    </span>
                  )}
                </div>
              </td>

              {/* 11~18열: 우측 자음 8번 따라쓰기 (1~2회: 회색 가이드 글자, 3~8회: 십자 점선 빈칸) */}
              {Array.from({ length: 8 }, (_, colIdx) => (
                <td
                  key={`cell-right-${rowIdx}-${colIdx}`}
                  style={{ width: '5.55%', border: '1.5px solid #374151' }}
                  className="text-center align-middle p-0"
                >
                  <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />

                    {colIdx < 2 ? (
                      <span
                        className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                          fontWeight: 700,
                          fontSize: '2.3rem',
                          color: '#94a3b8'
                        }}
                      >
                        {row.right.char}
                      </span>
                    ) : null}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 3. Sheet Footer */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-badasseugi">
        <span className="font-medium">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
      </div>
    </div>
  );
};

// 2. 모음 쓰기 학습지 (12×18)
export const VowelsWorksheetPage: React.FC<JamoSheetProps> = ({
  interactiveAudio = true,
  className = ''
}) => {
  const handleCharClick = (vowel: string) => {
    if (!interactiveAudio || vowel === '♡') return;
    playCutePop();
    speakKorean(vowel, 0.85);
  };

  return (
    <div
      className={`print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-300 p-2 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      {/* 1. Header Row */}
      <div className="flex items-center justify-between border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-nanum-barun-gothic sheet-header-title">
          <span className="text-base leading-none">🥟</span>
          <span
            className="sheet-header-text font-nanum-barun-gothic font-black"
            style={{ fontFamily: "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', sans-serif", fontWeight: 900 }}
          >
            해볼한국어 [한글] ② 모음 쓰기 | Korean Vowel Writing
          </span>
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex items-center gap-3 sm:gap-5 font-korean-gothic sheet-header-info">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 2. Main 12×18 Table */}
      <table className="square-grid-table vowel-table w-full border-collapse border border-slate-700 bg-white">
        <thead>
          <tr className="bg-slate-100 text-slate-900 font-bold font-badasseugi">
            {/* 좌측 9열 (1열 모음 + 2~9열 8회 따라쓰기) */}
            <th
              style={{
                width: '5.55%',
                border: '1.5px solid #374151',
                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                fontWeight: 700,
                fontSize: '1.45rem',
                lineHeight: 1
              }}
              className="py-1 bg-pink-50 text-pink-950 font-black font-badasseugi"
            >
              모음
            </th>
            {Array.from({ length: 8 }, (_, i) => (
              <th
                key={`vhead-left-${i}`}
                style={{
                  width: '5.55%',
                  border: '1.5px solid #374151',
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                  fontWeight: 700,
                  fontSize: '1.45rem',
                  lineHeight: 1
                }}
                className="py-1 text-slate-700 font-bold font-badasseugi"
              >
                {i + 1}
              </th>
            ))}

            {/* 우측 9열 (10열 복합모음 + 11~18열 8회 따라쓰기) */}
            <th
              style={{
                width: '5.55%',
                border: '1.5px solid #374151',
                borderLeft: '2.5px solid #1e293b',
                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                fontWeight: 700,
                fontSize: '1.45rem',
                lineHeight: 1
              }}
              className="py-1 bg-pink-50 text-pink-950 font-black font-badasseugi"
            >
              모음
            </th>
            {Array.from({ length: 8 }, (_, i) => (
              <th
                key={`vhead-right-${i}`}
                style={{
                  width: '5.55%',
                  border: '1.5px solid #374151',
                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                  fontWeight: 700,
                  fontSize: '1.45rem',
                  lineHeight: 1
                }}
                className="py-1 text-slate-700 font-bold font-badasseugi"
              >
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {VOWELS_DATA.map((row, rowIdx) => (
            <tr key={`vowel-row-${rowIdx}`} className="border-b-[1.5px] border-slate-700">
              {/* 1열: 가장 왼쪽 1열 아래로 'ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ ♡' */}
              <td
                style={{ width: '5.55%', border: '1.5px solid #374151' }}
                className={`text-center align-middle p-0 bg-pink-50/70 ${interactiveAudio && row.left !== '♡' ? 'cursor-pointer hover:bg-pink-100/90' : ''}`}
                onClick={() => handleCharClick(row.left)}
                title={interactiveAudio && row.left !== '♡' ? `소리 듣기: ${row.left}` : undefined}
              >
                <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-pink-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-pink-300 pointer-events-none" />
                  <span
                    className={`relative z-10 leading-none select-none font-black font-badasseugi whitespace-nowrap text-slate-950 ${row.left !== '♡' ? '-translate-y-1 sm:-translate-y-1.5' : ''}`}
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: row.left === '♡' ? '2.0rem' : '2.15rem',
                      color: row.left === '♡' ? '#e11d48' : '#111827'
                    }}
                  >
                    {row.left}
                  </span>
                  {row.left !== '♡' && VOWEL_ROMAJA_MAP[row.left] && (
                    <span className="romaja-badge absolute bottom-0.5 inset-x-0 text-center text-[10px] sm:text-[11px] font-black leading-none select-none tracking-tight z-20">
                      {VOWEL_ROMAJA_MAP[row.left]}
                    </span>
                  )}
                </div>
              </td>

              {/* 2~9열: 좌측 모음 8번 따라쓰기 (1~2회: 회색 가이드 글자, 3~8회: 십자 점선 빈칸) */}
              {Array.from({ length: 8 }, (_, colIdx) => (
                <td
                  key={`vcell-left-${rowIdx}-${colIdx}`}
                  style={{ width: '5.55%', border: '1.5px solid #374151' }}
                  className="text-center align-middle p-0"
                >
                  <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />

                    {colIdx < 2 ? (
                      <span
                        className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                          fontWeight: 700,
                          fontSize: row.left === '♡' ? '2.0rem' : '2.3rem',
                          color: row.left === '♡' ? '#fda4af' : '#94a3b8'
                        }}
                      >
                        {row.left}
                      </span>
                    ) : null}
                  </div>
                </td>
              ))}

              {/* 10열: 10열 아래로 'ㅐ ㅔ ㅒ ㅖ ㅘ ㅝ ㅚ ㅟ ㅙ ㅞ ㅢ' */}
              <td
                style={{ width: '5.55%', border: '1.5px solid #374151', borderLeft: '2.5px solid #1e293b' }}
                className={`text-center align-middle p-0 bg-pink-50/70 ${interactiveAudio ? 'cursor-pointer hover:bg-pink-100/90' : ''}`}
                onClick={() => handleCharClick(row.right)}
                title={interactiveAudio ? `소리 듣기: ${row.right}` : undefined}
              >
                <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-pink-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-pink-300 pointer-events-none" />
                  <span
                    className="relative z-10 leading-none select-none font-black font-badasseugi whitespace-nowrap text-slate-950 -translate-y-1 sm:-translate-y-1.5"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: row.right.length > 1 ? '1.9rem' : '2.15rem',
                      color: '#111827'
                    }}
                  >
                    {row.right}
                  </span>
                  {VOWEL_ROMAJA_MAP[row.right] && (
                    <span className="romaja-badge absolute bottom-0.5 inset-x-0 text-center text-[10px] sm:text-[11px] font-black leading-none select-none tracking-tight z-20">
                      {VOWEL_ROMAJA_MAP[row.right]}
                    </span>
                  )}
                </div>
              </td>

              {/* 11~18열: 우측 복합 모음 8번 따라쓰기 (1~2회: 회색 가이드 글자, 3~8회: 십자 점선 빈칸) */}
              {Array.from({ length: 8 }, (_, colIdx) => (
                <td
                  key={`vcell-right-${rowIdx}-${colIdx}`}
                  style={{ width: '5.55%', border: '1.5px solid #374151' }}
                  className="text-center align-middle p-0"
                >
                  <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />

                    {colIdx < 2 ? (
                      <span
                        className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                          fontWeight: 700,
                          fontSize: row.right.length > 1 ? '1.95rem' : '2.3rem',
                          color: '#94a3b8'
                        }}
                      >
                        {row.right}
                      </span>
                    ) : null}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 3. Sheet Footer */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-badasseugi">
        <span className="font-medium">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
      </div>
    </div>
  );
};

// 3. 자음·모음 결합 따라쓰기 학습지 (15×11 표, 140글자 회색 가이드)
export const ComboTracingWorksheetPage: React.FC<JamoSheetProps> = ({
  interactiveAudio = true,
  className = ''
}) => {
  const handleCharClick = (char: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(char, 0.85);
  };

  return (
    <div
      className={`print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-300 p-2 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      {/* 1. Header Row */}
      <div className="flex items-center justify-between border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-nanum-barun-gothic sheet-header-title">
          <span className="text-base leading-none">🥟</span>
          <span
            className="sheet-header-text font-nanum-barun-gothic font-black"
            style={{ fontFamily: "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', sans-serif", fontWeight: 900 }}
          >
            해볼한국어 [한글] ③ 자음·모음표 따라 쓰기 | Korean Complete the Chart
          </span>
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex items-center gap-3 sm:gap-5 font-korean-gothic sheet-header-info">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 2. Main 15×11 Combo Table (Tracing Mode with complete syllables in gray) */}
      <table className="square-grid-table combo-table w-full border-collapse border border-slate-700 bg-white">
        <thead>
          <tr className="bg-emerald-50 text-slate-900 font-extrabold text-[12px] sm:text-sm font-badasseugi">
            {/* 1행 1열: 빈칸 */}
            <th style={{ width: '6.66%', border: '1.5px solid #374151' }} className="py-0.5 bg-emerald-100/80">
            </th>
            {/* 1행 2~15열: 자음 14자 */}
            {COMBO_CONSONANTS.map((c, i) => {
              const sound = CONSONANT_PHONIC_SOUND_MAP[c] || c;
              return (
                <th
                  key={`combo-trace-head-${i}`}
                  style={{ width: '6.66%', border: '1.5px solid #374151' }}
                  className={`py-0.5 bg-emerald-50 text-emerald-950 font-bold ${interactiveAudio ? 'cursor-pointer hover:bg-emerald-100' : ''}`}
                  onClick={() => handleCharClick(sound)}
                  title={interactiveAudio ? `소리 듣기: ${c} (${sound})` : undefined}
                >
                <div className="cell-square-box relative w-full flex flex-col items-center justify-center py-0.5">
                  <span
                    className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap text-emerald-950"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: '1.75rem',
                      lineHeight: 1
                    }}
                  >
                    {c}
                  </span>
                  {CONSONANT_ROMAJA_MAP[c] && (
                    <span className="romaja-badge text-[9.5px] sm:text-[10px] font-black leading-tight select-none mt-0.5">
                      {CONSONANT_ROMAJA_MAP[c]}
                    </span>
                  )}
                </div>
              </th>
            ); })}
          </tr>
        </thead>
        <tbody>
          {COMBO_VOWELS.map((v, vIdx) => (
            <tr key={`combo-trace-row-${vIdx}`} className="border-b-[1.5px] border-slate-700">
              {/* 1열: 모음 10자 (2번째줄부터 아래로) */}
              <td
                style={{ width: '6.66%', border: '1.5px solid #374151' }}
                className={`text-center align-middle p-0 bg-emerald-50/80 ${interactiveAudio ? 'cursor-pointer hover:bg-emerald-100' : ''}`}
                onClick={() => handleCharClick(v)}
                title={interactiveAudio ? `소리 듣기: ${v}` : undefined}
              >
                <div className="cell-square-box relative w-full flex flex-col items-center justify-center py-0.5">
                  <span
                    className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap text-emerald-950"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: '1.75rem',
                      lineHeight: 1
                    }}
                  >
                    {v}
                  </span>
                  {VOWEL_ROMAJA_MAP[v] && (
                    <span className="romaja-badge text-[9.5px] sm:text-[10px] font-black leading-tight select-none mt-0.5">
                      {VOWEL_ROMAJA_MAP[v]}
                    </span>
                  )}
                </div>
              </td>

              {/* 2~15열: 자음 + 모음 완성된 글자 (회색 따라쓰기 글자 + 십자 점선 보조선) */}
              {COMBO_CONSONANTS.map((c, cIdx) => {
                const syllable = combineHangul(c, v);
                return (
                  <td
                    key={`combo-trace-cell-${vIdx}-${cIdx}`}
                    style={{ width: '6.66%', border: '1.5px solid #374151' }}
                    className={`text-center align-middle p-0 ${interactiveAudio ? 'cursor-pointer hover:bg-emerald-50/60' : ''}`}
                    onClick={() => handleCharClick(syllable)}
                    title={interactiveAudio ? `소리 듣기: ${syllable}` : undefined}
                  >
                    <div className="cell-square-box relative w-full flex items-center justify-center">
                      {/* 십자 점선 보조선 */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                      {/* 회색 따라쓰기 글자 */}
                      <span
                        className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap"
                        style={{
                          fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                          fontWeight: 700,
                          fontSize: '1.85rem',
                          lineHeight: 1,
                          color: '#94a3b8'
                        }}
                      >
                        {syllable}
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 3. Sheet Footer */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-badasseugi">
        <span className="font-medium">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
      </div>
    </div>
  );
};

// 4. 자음·모음 스스로 쓰기 조합표 (15×11 표, 빈칸 스스로쓰기)
export const ComboWorksheetPage: React.FC<JamoSheetProps> = ({
  interactiveAudio = true,
  className = ''
}) => {
  const handleCharClick = (char: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(char, 0.85);
  };

  return (
    <div
      className={`print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-300 p-2 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      {/* 1. Header Row */}
      <div className="flex items-center justify-between border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-nanum-barun-gothic sheet-header-title">
          <span className="text-base leading-none">🥟</span>
          <span
            className="sheet-header-text font-nanum-barun-gothic font-black"
            style={{ fontFamily: "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', sans-serif", fontWeight: 900 }}
          >
            해볼한국어 [한글] ④ 자음·모음표 스스로 쓰기 | Korean Consonant Stroke Order
          </span>
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex items-center gap-3 sm:gap-5 font-korean-gothic sheet-header-info">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 2. Main 15×11 Combo Table */}
      <table className="square-grid-table combo-table w-full border-collapse border border-slate-700 bg-white">
        <thead>
          <tr className="bg-emerald-50 text-slate-900 font-extrabold text-[12px] sm:text-sm font-badasseugi">
            {/* 1행 1열: 빈칸 */}
            <th style={{ width: '6.66%', border: '1.5px solid #374151' }} className="py-0.5 bg-emerald-100/80">
            </th>
            {/* 1행 2~15열: 자음 14자 */}
            {COMBO_CONSONANTS.map((c, i) => {
              const sound = CONSONANT_PHONIC_SOUND_MAP[c] || c;
              return (
                <th
                  key={`combo-head-${i}`}
                  style={{ width: '6.66%', border: '1.5px solid #374151' }}
                  className={`py-0.5 bg-emerald-50 text-emerald-950 font-bold ${interactiveAudio ? 'cursor-pointer hover:bg-emerald-100' : ''}`}
                  onClick={() => handleCharClick(sound)}
                  title={interactiveAudio ? `소리 듣기: ${c} (${sound})` : undefined}
                >
                  <div className="cell-square-box relative w-full flex flex-col items-center justify-center py-0.5">
                    <span
                      className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap text-emerald-950"
                      style={{
                        fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                        fontWeight: 700,
                        fontSize: '1.75rem',
                        lineHeight: 1
                      }}
                    >
                      {c}
                    </span>
                    {CONSONANT_ROMAJA_MAP[c] && (
                      <span className="romaja-badge text-[9.5px] sm:text-[10px] font-black leading-tight select-none mt-0.5">
                        {CONSONANT_ROMAJA_MAP[c]}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {COMBO_VOWELS.map((v, vIdx) => (
            <tr key={`combo-row-${vIdx}`} className="border-b-[1.5px] border-slate-700">
              {/* 1열: 모음 10자 (2번째줄부터 아래로) */}
              <td
                style={{ width: '6.66%', border: '1.5px solid #374151' }}
                className={`text-center align-middle p-0 bg-emerald-50/80 ${interactiveAudio ? 'cursor-pointer hover:bg-emerald-100' : ''}`}
                onClick={() => handleCharClick(v)}
                title={interactiveAudio ? `소리 듣기: ${v}` : undefined}
              >
                <div className="cell-square-box relative w-full flex flex-col items-center justify-center py-0.5">
                  <span
                    className="relative z-10 leading-none select-none font-bold font-badasseugi whitespace-nowrap text-emerald-950"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: '1.75rem',
                      lineHeight: 1
                    }}
                  >
                    {v}
                  </span>
                  {VOWEL_ROMAJA_MAP[v] && (
                    <span className="romaja-badge text-[9.5px] sm:text-[10px] font-black leading-tight select-none mt-0.5">
                      {VOWEL_ROMAJA_MAP[v]}
                    </span>
                  )}
                </div>
              </td>

              {/* 2~15열: 자음 + 모음 만나는 빈칸 (십자 점선 보조선) */}
              {COMBO_CONSONANTS.map((c, cIdx) => (
                <td
                  key={`combo-cell-${vIdx}-${cIdx}`}
                  style={{ width: '6.66%', border: '1.5px solid #374151' }}
                  className="text-center align-middle p-0"
                >
                  <div className="cell-square-box relative w-full flex items-center justify-center">
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 3. Sheet Footer */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-badasseugi">
        <span className="font-medium">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 획순 본보기 기반 자음 쓰기 공통 베이스 컴포넌트 & 학습지 5종 (⑤ ㄱ~ㄹ, ⑥ ㅁ~ㅇ, ⑦ ㅈ~ㅋ, ⑧ ㅌ~ㅎ, ⑨ ㄲ~ㅉ)
// -----------------------------------------------------------------------------
export interface StrokeItem {
  char: string;
  name: string;
  svg: React.ReactNode;
}

interface StrokeSheetBaseProps extends JamoSheetProps {
  sheetTitle: string;
  items: StrokeItem[];
  columnsCount?: 3 | 4 | 5;
}

export const ConsonantsStrokeSheetBase: React.FC<StrokeSheetBaseProps> = ({
  sheetTitle,
  items,
  columnsCount = 4,
  interactiveAudio = true,
  className = ''
}) => {
  const handleCharClick = (char: string, name: string) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(char, 0.88);
  };

  const gridColsClass =
    columnsCount === 3
      ? 'jamo-cols-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 print:grid-cols-3 gap-3.5 sm:gap-5 w-full'
      : columnsCount === 5
      ? 'jamo-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 print:grid-cols-5 gap-1.5 sm:gap-2.5 w-full'
      : 'jamo-cols-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 print:grid-cols-4 gap-2 sm:gap-3.5 w-full';

  const cellAspectClass =
    columnsCount === 3 ? 'aspect-[1/0.84] max-h-[126px]' : 'aspect-square';

  const tracingFontSize =
    columnsCount === 3
      ? 'clamp(3.8rem, 6.2vw, 4.6rem)'
      : columnsCount === 5
      ? 'clamp(2.7rem, 4.2vw, 3.3rem)'
      : 'clamp(3.3rem, 5.2vw, 4.0rem)';

  return (
    <div
      className={`print-sheet printable-word-sheet printable-jamo-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-300 p-2 sm:p-2.5 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '620px' }}
    >
      <JamoStyleSheet />
      {/* 1. Header Row */}
      <div className="flex items-center justify-between border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-nanum-barun-gothic sheet-header-title">
          <span className="text-base leading-none">🍂</span>
          <span
            className="sheet-header-text font-nanum-barun-gothic font-black"
            style={{ fontFamily: "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', sans-serif", fontWeight: 900 }}
          >
            {sheetTitle}
          </span>
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex items-center gap-3 sm:gap-5 font-korean-gothic sheet-header-info">
          <span>학년: ________</span>
          <span>이름: ________________</span>
        </div>
      </div>

      {/* 2. Color Legend (획순 색깔 규칙) */}
      <div className="my-1 sm:my-1.5 flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-sm font-black font-badasseugi shrink-0">
        <span className="text-slate-900 tracking-tight font-extrabold">획순 색깔 규칙:</span>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0077c8] text-white flex items-center justify-center text-[10px] sm:text-xs font-black shadow-2xs">
            1
          </span>
          <span className="text-[#0077c8] font-black">파랑</span>
        </div>
        <span className="text-slate-400 text-xs sm:text-sm font-bold">➔</span>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#dc2626] text-white flex items-center justify-center text-[10px] sm:text-xs font-black shadow-2xs">
            2
          </span>
          <span className="text-[#dc2626] font-black">빨강</span>
        </div>
        <span className="text-slate-400 text-xs sm:text-sm font-bold">➔</span>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#18181b] text-white flex items-center justify-center text-[10px] sm:text-xs font-black shadow-2xs">
            3
          </span>
          <span className="text-[#18181b] font-black">검정</span>
        </div>
        <span className="text-slate-400 text-xs sm:text-sm font-bold">➔</span>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[10px] sm:text-xs font-black shadow-2xs">
            4
          </span>
          <span className="text-[#16a34a] font-black">초록</span>
        </div>
      </div>

      {/* 3. Consonants Card Grid */}
      <div className={`jamo-card-grid grid ${gridColsClass} my-1 flex-1`}>
        {items.map((item) => (
          <div
            key={item.char}
            className="stroke-card jamo-stroke-card bg-white rounded-2xl sm:rounded-3xl border border-slate-300 shadow-[0_4px_16px_rgba(0,0,0,0.06)] p-2 sm:p-2.5 flex flex-col justify-between"
          >
            {/* 1행: 큰 본보기 자음 (획순별 색상 기능 유지 & 균형잡힌 크기/여백) + 이름과 로마자표기 */}
            <div
              className={`stroke-example-cell relative w-full flex-1 flex flex-col items-center justify-center font-badasseugi ${
                interactiveAudio ? 'cursor-pointer hover:scale-105 transition-transform' : ''
              }`}
              style={{ fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif" }}
              onClick={() => handleCharClick(item.char, item.name)}
              title={interactiveAudio ? `소리 듣기: ${item.name} (${item.char})` : undefined}
            >
              <div className="w-full flex-1 flex items-center justify-center max-h-[110px] sm:max-h-[125px]">
                {item.svg}
              </div>
              {/* 큰 글자와 아래 표 사이 정 중앙에 위치하도록 상하 균등 여백(my-1.5) 및 폰트 확대 */}
              <div className="w-full flex items-center justify-center gap-1.5 sm:gap-2 my-1.5 sm:my-2 leading-none shrink-0 select-none">
                <span
                  className="font-black text-slate-900 text-[15px] sm:text-[17px] font-badasseugi tracking-tight"
                  style={{
                    fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                    fontWeight: 700
                  }}
                >
                  {item.name}
                </span>
                <span className="romaja-badge text-[13px] sm:text-[14.5px] font-black text-[#1e3a8a] tracking-tight">
                  {getJamoRomaja(item.char)}
                </span>
              </div>
            </div>

            {/* 하단 3개 행 (따라쓰기 1줄 + 스스로 쓰기 2줄) */}
            <div className="jamo-rows-container space-y-1 sm:space-y-1.5 mt-0.5">
              {/* 2행: 연한 회색 자음 따라쓰기 점선 칸 (1줄, 2칸) - 나눔바른고딕 */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                <div className={`jamo-practice-cell relative ${cellAspectClass} flex items-center justify-center border-r border-dashed border-slate-400 overflow-hidden`}>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  <span
                    className="relative z-10 leading-none select-none font-bold font-badasseugi flex items-center justify-center"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: tracingFontSize,
                      color: '#94a3b8'
                    }}
                  >
                    {item.char}
                  </span>
                </div>
                <div className={`jamo-practice-cell relative ${cellAspectClass} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                  <span
                    className="relative z-10 leading-none select-none font-bold font-badasseugi flex items-center justify-center"
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 700,
                      fontSize: tracingFontSize,
                      color: '#94a3b8'
                    }}
                  >
                    {item.char}
                  </span>
                </div>
              </div>

              {/* 3행: 스스로 쓰기 빈 점선 칸 (1줄, 2칸) */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                <div className={`jamo-practice-cell relative ${cellAspectClass} flex items-center justify-center border-r border-dashed border-slate-400`}>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
                <div className={`jamo-practice-cell relative ${cellAspectClass} flex items-center justify-center`}>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
              </div>

              {/* 4행: 스스로 쓰기 빈 점선 칸 (1줄, 2칸) */}
              <div className="jamo-practice-row w-full grid grid-cols-2 border border-dashed border-slate-400 bg-white">
                <div className={`jamo-practice-cell relative ${cellAspectClass} flex items-center justify-center border-r border-dashed border-slate-400`}>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
                <div className={`jamo-practice-cell relative ${cellAspectClass} flex items-center justify-center`}>
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-slate-300 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Sheet Footer */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-badasseugi shrink-0">
        <span className="font-medium">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
      </div>
    </div>
  );
};

// 5. [한글] ⑤ 자음쓰기 (ㄱ~ㄹ)
export const ConsonantsStrokeWorksheetPage: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㄱ',
      name: '기역',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (가로로 가다가 아래로 꺾임) - 굵기 절반(10) 적용 */}
          <path
            d="M 32 46 L 116 46 Q 132 46 132 62 L 132 130"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      char: 'ㄴ',
      name: '니은',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (세로로 내려오다 오른쪽으로 꺾임) - 굵기 절반(10) 적용 */}
          <path
            d="M 46 32 L 46 116 Q 46 132 62 132 L 130 132"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      char: 'ㄷ',
      name: '디귿',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (위 가로선) - 굵기 절반(10) 적용 */}
          <path
            d="M 34 46 L 126 46"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (ㄴ 모양 세로 내려와서 아래 가로선) - 굵기 절반(10) 적용 */}
          <path
            d="M 48 50 L 48 116 Q 48 132 64 132 L 126 132"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      char: 'ㄹ',
      name: '리을',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (위 ㄱ) - 굵기 절반(9) 적용 */}
          <path
            d="M 36 46 L 116 46 Q 130 46 130 58 L 130 78"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 2획: 빨강 (가운데 ㅡ) - 굵기 절반(9) 적용 */}
          <path
            d="M 36 78 L 124 78"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (아래 ㄴ) - 굵기 절반(9) 적용 */}
          <path
            d="M 48 80 L 48 118 Q 48 132 62 132 L 128 132"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑤ 자음 획순 따라 쓰기 ㄱ~ㄹ | Korean Consonant Stroke Order"
      items={items}
      columnsCount={4}
      {...props}
    />
  );
};

// 6. [한글] ⑥ 자음쓰기 (ㅁ~ㅇ)
export const ConsonantsStrokeWorksheetPage2: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅁ',
      name: '미음',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (왼쪽 세로) */}
          <path
            d="M 42 40 L 42 122"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (위/오른쪽 ㄱ) */}
          <path
            d="M 40 46 L 118 46 Q 124 46 124 52 L 124 122"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 3획: 검정 (아래 ㅡ) */}
          <path
            d="M 38 120 L 128 120"
            stroke="#18181b"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅂ',
      name: '비읍',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (왼쪽 세로) */}
          <path
            d="M 44 38 L 44 122"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (오른쪽 세로) */}
          <path
            d="M 116 38 L 116 122"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (가운데 ㅡ) */}
          <path
            d="M 44 82 L 116 82"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (맨 아래 ㅡ) */}
          <path
            d="M 40 122 L 120 122"
            stroke="#16a34a"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅅ',
      name: '시옷',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (왼쪽 대각선) */}
          <path
            d="M 80 40 Q 72 75 42 126"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (오른쪽 대각선) */}
          <path
            d="M 72 72 L 122 126"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅇ',
      name: '이응',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (원) */}
          <circle
            cx="80"
            cy="80"
            r="42"
            stroke="#0077c8"
            strokeWidth="10"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑥ 자음 획순 따라 쓰기 ㅁ~ㅇ | Korean Consonant Stroke Order"
      items={items}
      columnsCount={4}
      {...props}
    />
  );
};

// 7. [한글] ⑦ 자음쓰기 (ㅈ~ㅋ)
export const ConsonantsStrokeWorksheetPage3: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅈ',
      name: '지읒',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (자음쓰기 1번 교보손글씨체 일치 - 위 가로 및 왼쪽 부드러운 꺾임) */}
          <path
            d="M 38 48 L 110 48 Q 116 48 108 58 L 42 120"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 2획: 빨강 (오른쪽 삐침) */}
          <path
            d="M 80 84 L 122 118"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅊ',
      name: '치읓',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (자음쓰기 1번 교보손글씨체 일치 - 맨 위 손글씨 단획) */}
          <path
            d="M 52 40 L 102 40"
            stroke="#0077c8"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (위 가로 및 왼쪽 부드러운 꺾임) */}
          <path
            d="M 38 64 L 110 64 Q 116 64 108 74 L 42 124"
            stroke="#dc2626"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 3획: 검정 (오른쪽 삐침) */}
          <path
            d="M 80 96 L 122 122"
            stroke="#18181b"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅋ',
      name: '키읔',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (바깥 ㄱ) */}
          <path
            d="M 34 46 L 120 46 Q 132 46 132 58 L 132 128"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 2획: 빨강 (가운데 ㅡ) */}
          <path
            d="M 34 86 L 124 86"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑦ 자음 획순 따라 쓰기 ㅈ~ㅋ | Korean Consonant Stroke Order"
      items={items}
      columnsCount={3}
      {...props}
    />
  );
};

// 8. [한글] ⑧ 자음쓰기 (ㅌ~ㅎ)
export const ConsonantsStrokeWorksheetPage4: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅌ',
      name: '티읕',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (맨 위 ㅡ) */}
          <path
            d="M 40 44 L 122 44"
            stroke="#0077c8"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (가운데 ㅡ) */}
          <path
            d="M 44 82 L 118 82"
            stroke="#dc2626"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (자음쓰기 1번 교보손글씨체 일치 - 세로 기둥 및 아래 ㄴ) */}
          <path
            d="M 44 44 L 40 114 Q 40 120 50 120 L 124 120"
            stroke="#18181b"
            strokeWidth="9.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅍ',
      name: '피읖',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (맨 위 ㅡ) */}
          <path
            d="M 32 44 L 128 44"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (왼쪽 세로) */}
          <path
            d="M 58 44 L 58 122"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (오른쪽 세로) */}
          <path
            d="M 102 44 L 102 122"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (맨 아래 ㅡ) */}
          <path
            d="M 32 122 L 128 122"
            stroke="#16a34a"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅎ',
      name: '히읗',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (자음쓰기 1번 교보손글씨체 일치 - 맨 위 손글씨 단획) */}
          <path
            d="M 54 38 L 106 38"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (가운데 긴 ㅡ) */}
          <path
            d="M 34 64 L 126 64"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (아래 원) */}
          <circle
            cx="80"
            cy="104"
            r="25"
            stroke="#18181b"
            strokeWidth="9"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑧ 자음 획순 따라 쓰기 ㅌ~ㅎ | Korean Consonant Stroke Order"
      items={items}
      columnsCount={3}
      {...props}
    />
  );
};

// 9. [한글] ⑨ 쌍자음 쓰기 (ㄲ~ㅉ)
export const ConsonantsStrokeWorksheetPage5: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㄲ',
      name: '쌍기역',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (첫 번째 ㄱ) */}
          <path
            d="M 18 48 L 68 48 Q 78 48 78 58 L 78 124"
            stroke="#0077c8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 2획: 빨강 (두 번째 ㄱ) */}
          <path
            d="M 86 48 L 136 48 Q 146 48 146 58 L 146 124"
            stroke="#dc2626"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      char: 'ㄸ',
      name: '쌍디귿',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (첫 번째 ㄷ 위 가로) */}
          <path
            d="M 18 46 L 72 46"
            stroke="#0077c8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (첫 번째 ㄷ 아래 ㄴ) */}
          <path
            d="M 30 50 L 30 120 Q 30 126 38 126 L 72 126"
            stroke="#dc2626"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 3획: 검정 (두 번째 ㄷ 위 가로) */}
          <path
            d="M 86 46 L 140 46"
            stroke="#18181b"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (두 번째 ㄷ 아래 ㄴ) */}
          <path
            d="M 98 50 L 98 120 Q 98 126 106 126 L 140 126"
            stroke="#16a34a"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅃ',
      name: '쌍비읍',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (첫 번째 ㅂ 세로 기둥들) */}
          <path
            d="M 22 42 L 22 124 M 64 42 L 64 124"
            stroke="#0077c8"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (첫 번째 ㅂ 가로선들) */}
          <path
            d="M 22 82 L 64 82 M 18 124 L 68 124"
            stroke="#dc2626"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (두 번째 ㅂ 세로 기둥들) */}
          <path
            d="M 94 42 L 94 124 M 136 42 L 136 124"
            stroke="#18181b"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (두 번째 ㅂ 가로선들) */}
          <path
            d="M 94 82 L 136 82 M 90 124 L 140 124"
            stroke="#16a34a"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅆ',
      name: '쌍시옷',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (첫 번째 ㅅ 왼쪽) */}
          <path
            d="M 50 46 Q 44 80 22 126"
            stroke="#0077c8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (첫 번째 ㅅ 오른쪽) */}
          <path
            d="M 44 76 L 74 126"
            stroke="#dc2626"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (두 번째 ㅅ 왼쪽) */}
          <path
            d="M 112 46 Q 106 80 84 126"
            stroke="#18181b"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (두 번째 ㅅ 오른쪽) */}
          <path
            d="M 106 76 L 136 126"
            stroke="#16a34a"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅉ',
      name: '쌍지읒',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (첫 번째 ㅈ 위 가로 및 왼쪽 꺾임 - 교보손글씨체 일치) */}
          <path
            d="M 20 50 L 70 50 Q 74 50 70 56 L 24 120"
            stroke="#0077c8"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 2획: 빨강 (첫 번째 ㅈ 오른쪽 삐침) */}
          <path
            d="M 52 82 L 76 118"
            stroke="#dc2626"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (두 번째 ㅈ 위 가로 및 왼쪽 꺾임 - 교보손글씨체 일치) */}
          <path
            d="M 86 50 L 136 50 Q 140 50 136 56 L 90 120"
            stroke="#18181b"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 4획: 초록 (두 번째 ㅈ 오른쪽 삐침) */}
          <path
            d="M 118 82 L 142 118"
            stroke="#16a34a"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑨ 쌍자음 획순 따라 쓰기 ㄲ~ㅉ | Korean Double Consonant Stroke"
      items={items}
      columnsCount={5}
      {...props}
    />
  );
};

// -----------------------------------------------------------------------------
// 한글 모음 쓰기(Vowels) 획순별 색상 본보기 & 따라쓰기 학습지 6종 (⑩~⑮)
// -----------------------------------------------------------------------------

// 10. [한글] ⑩ 모음쓰기 1쪽 (기본형 4자: ㅏ, ㅑ, ㅓ, ㅕ)
export const VowelsStrokeWorksheetPage1: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅏ',
      name: '아',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (세로 'ㅣ') */}
          <path
            d="M 70 32 L 70 128"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (오른쪽 가로) */}
          <path
            d="M 70 80 L 118 80"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅑ',
      name: '야',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (세로 'ㅣ') */}
          <path
            d="M 64 32 L 64 128"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (위 가로) */}
          <path
            d="M 64 62 L 114 62"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (아래 가로) */}
          <path
            d="M 64 98 L 114 98"
            stroke="#18181b"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅓ',
      name: '어',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (왼쪽 가로) */}
          <path
            d="M 42 80 L 90 80"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (세로 'ㅣ') */}
          <path
            d="M 90 32 L 90 128"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅕ',
      name: '여',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (위 가로) */}
          <path
            d="M 46 62 L 96 62"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (아래 가로) */}
          <path
            d="M 46 98 L 96 98"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (세로 'ㅣ') */}
          <path
            d="M 96 32 L 96 128"
            stroke="#18181b"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑩ 모음 획순 따라 쓰기 ㅏ·ㅑ·ㅓ·ㅕ | Korean Vowel Stroke Order"
      items={items}
      columnsCount={4}
      {...props}
    />
  );
};

// 11. [한글] ⑪ 모음쓰기 2쪽 (상하형 4자: ㅗ, ㅛ, ㅜ, ㅠ)
export const VowelsStrokeWorksheetPage2: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅗ',
      name: '오',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (위 세로) */}
          <path
            d="M 80 42 L 80 92"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (아래 가로) */}
          <path
            d="M 32 92 L 128 92"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅛ',
      name: '요',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (왼쪽 세로) */}
          <path
            d="M 62 42 L 62 92"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (오른쪽 세로) */}
          <path
            d="M 98 42 L 98 92"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (아래 가로) */}
          <path
            d="M 32 92 L 128 92"
            stroke="#18181b"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅜ',
      name: '우',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (위 가로) */}
          <path
            d="M 32 68 L 128 68"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (아래 세로) */}
          <path
            d="M 80 68 L 80 118"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅠ',
      name: '유',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (위 가로) */}
          <path
            d="M 32 68 L 128 68"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (왼쪽 세로) */}
          <path
            d="M 62 68 L 62 118"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (오른쪽 세로) */}
          <path
            d="M 98 68 L 98 118"
            stroke="#18181b"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑪ 모음 획순 따라 쓰기 ㅗ·ㅛ·ㅜ·ㅠ | Korean Vowel Stroke Order"
      items={items}
      columnsCount={4}
      {...props}
    />
  );
};

// 12. [한글] ⑫ 모음쓰기 3쪽 (결합 원리 3자: ㅡ, ㅣ, ㅢ)
export const VowelsStrokeWorksheetPage3: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅡ',
      name: '으',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (가로) */}
          <path
            d="M 34 80 L 126 80"
            stroke="#0077c8"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅣ',
      name: '이',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (세로) */}
          <path
            d="M 80 32 L 80 128"
            stroke="#0077c8"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅢ',
      name: '의',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (가로 'ㅡ') */}
          <path
            d="M 30 80 L 98 80"
            stroke="#0077c8"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (세로 'ㅣ') */}
          <path
            d="M 116 32 L 116 128"
            stroke="#dc2626"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑫ 모음 획순 따라 쓰기 ㅡ·ㅣ·ㅢ | Korean Vowel Stroke Order"
      items={items}
      columnsCount={3}
      {...props}
    />
  );
};

// 13. [한글] ⑬ 모음쓰기 4쪽 ('ㅣ' 결합형 4자: ㅐ, ㅒ, ㅔ, ㅖ)
export const VowelsStrokeWorksheetPage4: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅐ',
      name: '애',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (세로) */}
          <path
            d="M 52 32 L 52 128"
            stroke="#0077c8"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (가로) */}
          <path
            d="M 52 80 L 108 80"
            stroke="#dc2626"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (오른쪽 세로) */}
          <path
            d="M 108 32 L 108 128"
            stroke="#18181b"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅒ',
      name: '얘',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (세로) */}
          <path
            d="M 52 32 L 52 128"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (위 가로) */}
          <path
            d="M 52 64 L 108 64"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (아래 가로) */}
          <path
            d="M 52 96 L 108 96"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (오른쪽 세로) */}
          <path
            d="M 108 32 L 108 128"
            stroke="#16a34a"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅔ',
      name: '에',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (왼쪽 가로) */}
          <path
            d="M 40 80 L 78 80"
            stroke="#0077c8"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (가운데 세로) */}
          <path
            d="M 78 32 L 78 128"
            stroke="#dc2626"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (오른쪽 세로) */}
          <path
            d="M 118 32 L 118 128"
            stroke="#18181b"
            strokeWidth="9.5"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅖ',
      name: '예',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (왼쪽 위 가로) */}
          <path
            d="M 40 62 L 78 62"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (왼쪽 아래 가로) */}
          <path
            d="M 40 98 L 78 98"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (가운데 세로) */}
          <path
            d="M 78 32 L 78 128"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (오른쪽 세로) */}
          <path
            d="M 118 32 L 118 128"
            stroke="#16a34a"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑬ 모음 획순 따라 쓰기 ㅐ·ㅒ·ㅔ·ㅖ | Korean Vowel Stroke Order"
      items={items}
      columnsCount={4}
      {...props}
    />
  );
};

// 14. [한글] ⑭ 모음쓰기 5쪽 (소리 결합 3자: ㅘ, ㅝ, ㅟ)
export const VowelsStrokeWorksheetPage5: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅘ',
      name: '와',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (ㅗ 세로) */}
          <path
            d="M 56 46 L 56 86"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (ㅗ 가로) */}
          <path
            d="M 28 86 L 94 86"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (ㅏ 세로) */}
          <path
            d="M 112 32 L 112 128"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (ㅏ 가로) */}
          <path
            d="M 112 76 L 138 76"
            stroke="#16a34a"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅝ',
      name: '워',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (ㅜ 가로 - 상단) */}
          <path
            d="M 24 54 L 80 54"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (ㅜ 세로 - 상단에서 아래로) */}
          <path
            d="M 52 54 L 52 98"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (ㅓ 가로 - 하단) */}
          <path
            d="M 78 86 L 114 86"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (ㅓ 세로) */}
          <path
            d="M 114 32 L 114 128"
            stroke="#16a34a"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅟ',
      name: '위',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (ㅜ 가로) */}
          <path
            d="M 32 72 L 98 72"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (ㅜ 세로) */}
          <path
            d="M 62 72 L 62 114"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (ㅣ 세로) */}
          <path
            d="M 118 32 L 118 128"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑭ 모음 획순 따라 쓰기 ㅘ·ㅝ·ㅟ | Korean Vowel Stroke Order"
      items={items}
      columnsCount={3}
      {...props}
    />
  );
};

// 15. [한글] ⑮ 모음쓰기 6쪽 (발음 같은 삼총사 3자: ㅚ, ㅙ, ㅞ)
export const VowelsStrokeWorksheetPage6: React.FC<JamoSheetProps> = (props) => {
  const items: StrokeItem[] = [
    {
      char: 'ㅚ',
      name: '외',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (ㅗ 세로) */}
          <path
            d="M 60 46 L 60 86"
            stroke="#0077c8"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (ㅗ 가로) */}
          <path
            d="M 30 86 L 96 86"
            stroke="#dc2626"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (ㅣ 세로) */}
          <path
            d="M 118 32 L 118 128"
            stroke="#18181b"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅙ',
      name: '왜',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (ㅗ 세로) */}
          <path
            d="M 48 46 L 48 86"
            stroke="#0077c8"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (ㅗ 가로) */}
          <path
            d="M 24 86 L 82 86"
            stroke="#dc2626"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (ㅏ 세로) */}
          <path
            d="M 98 32 L 98 128"
            stroke="#18181b"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (ㅏ 가로) */}
          <path
            d="M 98 78 L 128 78"
            stroke="#16a34a"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* 5획: 초록 (ㅣ 세로) */}
          <path
            d="M 128 32 L 128 128"
            stroke="#16a34a"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
        </svg>
      )
    },
    {
      char: 'ㅞ',
      name: '웨',
      svg: (
        <svg viewBox="0 0 160 160" className="w-full h-full max-h-[140px] sm:max-h-[160px]" fill="none">
          {/* 1획: 파랑 (ㅜ 가로 - 상단) */}
          <path
            d="M 20 54 L 70 54"
            stroke="#0077c8"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* 2획: 빨강 (ㅜ 세로 - 상단에서 아래로) */}
          <path
            d="M 45 54 L 45 98"
            stroke="#dc2626"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* 3획: 검정 (ㅓ 가로 - 하단) */}
          <path
            d="M 68 86 L 98 86"
            stroke="#18181b"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* 4획: 초록 (ㅓ 세로) */}
          <path
            d="M 98 32 L 98 128"
            stroke="#16a34a"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          {/* 5획: 초록 (ㅣ 세로) */}
          <path
            d="M 130 32 L 130 128"
            stroke="#16a34a"
            strokeWidth="8.5"
            strokeLinecap="round"
          />
        </svg>
      )
    }
  ];

  return (
    <ConsonantsStrokeSheetBase
      sheetTitle="해볼한국어 [한글] ⑮ 모음 획순 따라 쓰기 ㅚ·ㅙ·ㅞ | Korean Vowel Stroke Order"
      items={items}
      columnsCount={3}
      {...props}
    />
  );
};

// ============================================================================
// [자음모음] ⑯ 한국어 자음 총정리 한눈에 보기 (A4 가로 1장 요약 정리표 - 교사용 원판)
// ============================================================================
export interface ConsonantsSummaryCopy {
  sheetTitle: string;
  totalBadge: string;
  gradeLabel: string;
  nameLabel: string;
  sec1Title: string;
  sec1Sub: string;
  sec2Title: string;
  sec2Sub: string;
  sec3Title: string;
  sec3Sub: string;
  guideIntroTitle: string;
  guideIntroDesc: string;
  guideFrontLabel: string;
  guideFrontDesc: string;
  guideBackLabel: string;
  guideBackDesc: string;
  guideTips: string[];
  footerLeft: string;
  footerRight: string;
}

export const DEFAULT_CONSONANTS_SUMMARY_COPY: ConsonantsSummaryCopy = {
  sheetTitle: '해볼한국어 [한글] ⑯ 한국어 자음 총정리표 | Korean Consonants Master Chart',
  totalBadge: '총 19자 (기본 14 · 쌍자음 5)',
  gradeLabel: '학년',
  nameLabel: '이름',
  sec1Title: '기본 자음 14자',
  sec1Sub: 'Basic Consonants',
  sec2Title: '쌍자음 5자',
  sec2Sub: 'Double Consonants',
  sec3Title: '발음 로마자 [앞 / 뒤] 읽는 법 안내',
  sec3Sub: 'Romanization Guide',
  guideIntroTitle: '자음의 위치에 따라 대표 소리가 달라져요',
  guideIntroDesc: '표기된 [앞 / 뒤]는 같은 자음이라도 글자에서 놓이는 자리에 따른 발음 차이입니다.',
  guideFrontLabel: '앞 (첫소리 · 초성)',
  guideFrontDesc: '모음 앞에 오는 처음 소리 (예: 가[ga], 나[na], 바[ba])',
  guideBackLabel: '뒤 (받침 · 종성)',
  guideBackDesc: '모음 아래에 오는 끝소리 (예: 악[ak], 압[ap], 앙[ang])',
  guideTips: [
    'ㅇ [- / ng]: 첫소리 자리에선 소리가 없고(-), 받침 자리에선 [ng] 콧소리가 나요.',
    'ㄱ[g/k] · ㄷ[d/t] · ㅂ[b/p] · ㄹ[r/l]: 앞·뒤 위치에 따라 소리가 조금씩 달라져요.',
    'ㄸ · ㅃ · ㅉ: 받침으로 거의 쓰이지 않아 첫소리 [tt], [pp], [jj]만 익히면 돼요.',
  ],
  footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
  footerRight: '카드 표기: 순번 · 자음 글자 · 자음 이름 · 발음 로마자 [앞 / 뒤]',
};

type ConsonantGroup = 'basic' | 'double';

interface ConsonantSummaryItem {
  num: string;
  char: string;
  name: string;
  nameRomaja: string;
  soundRomaja: string;
  group: ConsonantGroup;
}

const SUMMARY_BASIC_CONSONANTS: ConsonantSummaryItem[] = [
  { num: '01', char: 'ㄱ', name: '기역', nameRomaja: 'giyeok', soundRomaja: '[g / k]', group: 'basic' },
  { num: '02', char: 'ㄴ', name: '니은', nameRomaja: 'nieun', soundRomaja: '[n]', group: 'basic' },
  { num: '03', char: 'ㄷ', name: '디귿', nameRomaja: 'digeut', soundRomaja: '[d / t]', group: 'basic' },
  { num: '04', char: 'ㄹ', name: '리을', nameRomaja: 'rieul', soundRomaja: '[r / l]', group: 'basic' },
  { num: '05', char: 'ㅁ', name: '미음', nameRomaja: 'mieum', soundRomaja: '[m]', group: 'basic' },
  { num: '06', char: 'ㅂ', name: '비읍', nameRomaja: 'bieup', soundRomaja: '[b / p]', group: 'basic' },
  { num: '07', char: 'ㅅ', name: '시옷', nameRomaja: 'siot', soundRomaja: '[s / t]', group: 'basic' },
  { num: '08', char: 'ㅇ', name: '이응', nameRomaja: 'ieung', soundRomaja: '[- / ng]', group: 'basic' },
  { num: '09', char: 'ㅈ', name: '지읒', nameRomaja: 'jieut', soundRomaja: '[j / t]', group: 'basic' },
  { num: '10', char: 'ㅊ', name: '치읓', nameRomaja: 'chieut', soundRomaja: '[ch / t]', group: 'basic' },
  { num: '11', char: 'ㅋ', name: '키읔', nameRomaja: 'kieuk', soundRomaja: '[k]', group: 'basic' },
  { num: '12', char: 'ㅌ', name: '티읕', nameRomaja: 'tieut', soundRomaja: '[t]', group: 'basic' },
  { num: '13', char: 'ㅍ', name: '피읖', nameRomaja: 'pieup', soundRomaja: '[p]', group: 'basic' },
  { num: '14', char: 'ㅎ', name: '히읗', nameRomaja: 'hieut', soundRomaja: '[h / t]', group: 'basic' },
];

const SUMMARY_DOUBLE_CONSONANTS: ConsonantSummaryItem[] = [
  { num: '15', char: 'ㄲ', name: '쌍기역', nameRomaja: 'ssanggiyeok', soundRomaja: '[kk / k]', group: 'double' },
  { num: '16', char: 'ㄸ', name: '쌍디귿', nameRomaja: 'ssangdigeut', soundRomaja: '[tt]', group: 'double' },
  { num: '17', char: 'ㅃ', name: '쌍비읍', nameRomaja: 'ssangbieup', soundRomaja: '[pp]', group: 'double' },
  { num: '18', char: 'ㅆ', name: '쌍시옷', nameRomaja: 'ssangsiot', soundRomaja: '[ss / t]', group: 'double' },
  { num: '19', char: 'ㅉ', name: '쌍지읒', nameRomaja: 'ssangjieut', soundRomaja: '[jj]', group: 'double' },
];

const CONSONANT_GROUP_STYLE: Record<
  ConsonantGroup,
  { border: string; topBg: string; numText: string; cardHover: string }
> = {
  basic: {
    border: 'border-slate-300',
    topBg: 'bg-slate-100/90 border-b border-slate-200',
    numText: 'text-slate-600',
    cardHover: 'hover:border-slate-500 hover:bg-slate-50/40',
  },
  double: {
    border: 'border-rose-300',
    topBg: 'bg-rose-50/90 border-b border-rose-200',
    numText: 'text-rose-700',
    cardHover: 'hover:border-rose-500 hover:bg-rose-50/30',
  },
};

export const ConsonantsSummaryWorksheetPage: React.FC<
  JamoSheetProps & { copy?: ConsonantsSummaryCopy }
> = ({ interactiveAudio = true, className = '', copy = DEFAULT_CONSONANTS_SUMMARY_COPY }) => {
  const handleCardClick = (item: ConsonantSummaryItem) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(item.char, 0.85);
  };

  const renderCard = (item: ConsonantSummaryItem) => {
    const st = CONSONANT_GROUP_STYLE[item.group];
    return (
      <div
        key={item.char}
        onClick={() => handleCardClick(item)}
        className={`summary-consonant-card rounded-xl border-[1.5px] ${st.border} bg-white flex flex-col justify-between overflow-hidden shadow-2xs transition-all ${
          interactiveAudio ? `cursor-pointer ${st.cardHover} hover:shadow-md active:scale-[0.98]` : ''
        }`}
        title={interactiveAudio ? `클릭하여 소리 듣기: ${item.name} (${item.char})` : undefined}
      >
        {/* Top Number-Only Header */}
        <div className={`px-2 py-0.5 flex items-center justify-between ${st.topBg} shrink-0`}>
          <span className={`text-[10px] font-black tabular-nums ${st.numText}`}>
            {item.num}
          </span>
        </div>

        {/* Center Character + Korean Name + Name Romanization */}
        <div className="px-1.5 py-1.5 flex-1 flex flex-col items-center justify-center text-center">
          <span
            className="font-badasseugi font-black text-slate-950 leading-none select-none"
            style={{
              fontFamily:
                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
              fontWeight: 700,
              fontSize: '2.4rem',
              lineHeight: 1.02,
            }}
          >
            {item.char}
          </span>
          <span className="mt-1 text-[13px] font-black text-slate-900 leading-tight font-korean-gothic">
            {item.name}
          </span>
          <span className="text-[10px] font-semibold text-slate-500 leading-tight tracking-tight break-words text-center w-full">
            {item.nameRomaja}
          </span>
        </div>

        {/* Bottom Pronunciation Romanization */}
        <div className="px-1.5 py-1 bg-slate-50/90 border-t border-slate-200 text-center shrink-0">
          <span className="romaja-badge text-[11.5px] font-black tracking-tight leading-none">
            {item.soundRomaja}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`print-sheet printable-word-sheet printable-jamo-sheet consonants-summary-sheet w-full max-w-[1060px] bg-white rounded-xl border-2 border-slate-300 p-2.5 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '660px' }}
    >
      <JamoStyleSheet />

      {/* 1. Sheet Header */}
      <div className="flex flex-nowrap items-center justify-between gap-x-2.5 border-b-2 border-slate-700 pb-1.5 mb-2 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-[12px] sm:text-[13px] font-nanum-barun-gothic sheet-header-title min-w-0 flex-1 overflow-x-hidden overflow-y-visible py-0.5">
          <span className="text-base leading-none shrink-0">🥟</span>
          <span
            className="sheet-header-text font-nanum-barun-gothic font-bold whitespace-nowrap leading-normal"
            style={{
              fontFamily:
                "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans KR', system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: '0',
            }}
          >
            {copy.sheetTitle}
          </span>
        </div>
        <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-700 flex flex-nowrap items-center gap-x-2.5 font-korean-gothic sheet-header-info whitespace-nowrap shrink-0 leading-normal">
          <span className="text-slate-500 font-bold whitespace-nowrap">{copy.totalBadge}</span>
          <span className="whitespace-nowrap">{copy.gradeLabel}: _____</span>
          <span className="whitespace-nowrap">{copy.nameLabel}: __________</span>
        </div>
      </div>

      {/* 2. Section 1: 기본 자음 14자 (7열 × 2행) */}
      <div className="flex flex-col gap-1.5 flex-1 justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-black text-slate-900 font-korean-gothic">
              <span className="w-5 h-5 rounded-md bg-slate-800 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                1
              </span>
              <span>{copy.sec1Title}</span>
              <span className="text-[11px] font-bold text-slate-500">{copy.sec1Sub}</span>
            </div>
          </div>

          <div className="summary-basic-grid grid grid-cols-7 print:grid-cols-7 gap-1.5 sm:gap-2">
            {SUMMARY_BASIC_CONSONANTS.map(renderCard)}
          </div>
        </div>

        {/* 3. Section 2 & 3: 좌측 쌍자음 5자 + 우측 발음 로마자 [앞 / 뒤] 읽는 법 안내 */}
        <div className="summary-bottom-split grid grid-cols-[53fr_47fr] print:grid-cols-[53fr_47fr] gap-2.5 items-stretch pt-1">
          {/* Left: 쌍자음 5자 */}
          <div className="flex flex-col min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
              <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] font-black text-slate-900 font-korean-gothic">
                <span className="w-5 h-5 rounded-md bg-rose-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span>{copy.sec2Title}</span>
                <span className="text-[11px] font-bold text-slate-500">{copy.sec2Sub}</span>
              </div>
            </div>
            <div className="summary-double-grid grid grid-cols-5 print:grid-cols-5 gap-1.5 flex-1">
              {SUMMARY_DOUBLE_CONSONANTS.map(renderCard)}
            </div>
          </div>

          {/* Right: 발음 로마자 [앞 / 뒤] 읽는 법 안내 */}
          <div className="flex flex-col min-w-0">
            <div className="flex flex-nowrap items-center gap-1.5 text-[11.5px] sm:text-[12.5px] font-black text-slate-900 font-korean-gothic mb-1.5 leading-normal">
              <span className="w-5 h-5 rounded-md bg-indigo-700 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                3
              </span>
              <span className="whitespace-nowrap">{copy.sec3Title}</span>
              <span className="text-[10.5px] font-bold text-slate-500 whitespace-nowrap">{copy.sec3Sub}</span>
            </div>

            <div className="flex-1 rounded-xl border-[1.5px] border-slate-300 bg-[#F8FAFC] p-2.5 flex flex-col justify-between gap-1.5 font-korean-gothic min-w-0">
              <div className="space-y-0.5 min-w-0">
                <div className="text-[10.5px] font-black text-indigo-950 break-words leading-snug">
                  {copy.guideIntroTitle}
                </div>
                <div className="text-[9.5px] font-medium text-slate-600 leading-snug break-words">
                  {copy.guideIntroDesc}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-white border border-slate-200 px-2 py-1 min-w-0">
                  <div className="text-[10px] font-black text-indigo-900 break-words leading-snug">{copy.guideFrontLabel}</div>
                  <div className="text-[9px] font-semibold text-slate-600 leading-snug mt-0.5 break-words">
                    {copy.guideFrontDesc}
                  </div>
                </div>
                <div className="rounded-lg bg-white border border-slate-200 px-2 py-1 min-w-0">
                  <div className="text-[10px] font-black text-rose-800 break-words leading-snug">{copy.guideBackLabel}</div>
                  <div className="text-[9px] font-semibold text-slate-600 leading-snug mt-0.5 break-words">
                    {copy.guideBackDesc}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-1.5 space-y-0.5 text-[9.5px] leading-snug text-slate-700 font-medium break-words">
                {copy.guideTips.map((tip, idx) => (
                  <div key={idx}>• {tip}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sheet Footer */}
      <div className="mt-1.5 pt-1 border-t border-slate-300 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium break-words">{copy.footerLeft}</span>
        <span className="font-bold text-slate-400 break-words">{copy.footerRight}</span>
      </div>
    </div>
  );
};

// ============================================================================
// [자음모음] ⑰ 한국어 모음 총정리 한눈에 보기 (A4 가로 1장 요약 정리표 - 교사용 원판)
// ============================================================================
export interface VowelsSummaryCopy {
  sheetTitle: string;
  totalBadge: string;
  gradeLabel: string;
  nameLabel: string;
  sec1Title: string;
  sec1Sub: string;
  sec2Title: string;
  sec2Sub: string;
  completeCardTitle: string;
  completeCardSub: string;
  sec3Title: string;
  sec3Sub: string;
  similarGroupTitle: string;
  similarPairs: { formula: string; note: string }[];
  tipTitle: string;
  tips: string[];
  footerLeft: string;
  footerRight: string;
}

export const DEFAULT_VOWELS_SUMMARY_COPY: VowelsSummaryCopy = {
  sheetTitle: '해볼한국어 [한글] ⑰ 한국어 모음 총정리표 | Korean Vowels Master Chart',
  totalBadge: '총 21자 (기본 10 · 복합 11)',
  gradeLabel: '학년',
  nameLabel: '이름',
  sec1Title: '기본 모음 10자',
  sec1Sub: 'Basic Vowels',
  sec2Title: '복합 모음 11자',
  sec2Sub: 'Compound Vowels',
  completeCardTitle: '모음 21자 완성',
  completeCardSub: '카드를 누르면 소리가 나요',
  sec3Title: '비슷한 소리의 복합 모음 · 발음 팁',
  sec3Sub: 'Pronunciation Tips',
  similarGroupTitle: '소리가 비슷한 복합 모음 (현대 한국어 실제 발음)',
  similarPairs: [
    { formula: 'ㅐ = ㅔ', note: '[ae / e] 거의 같은 소리' },
    { formula: 'ㅒ = ㅖ', note: '[yae / ye] 거의 같은 소리' },
    { formula: 'ㅙ = ㅚ = ㅞ', note: '세 글자 모두 [we] 소리' },
  ],
  tipTitle: '외국인 학습자를 위한 핵심 발음 Tip',
  tips: [
    'ㅓ [eo] vs ㅗ [o]: ㅓ는 입을 세로로 벌리고, ㅗ는 입술을 둥글게 모아요.',
    'ㅡ [eu]: 입술을 앞으로 내밀지 말고 옆으로 살짝 당긴 채 발음해요.',
    'ㅢ [ui]: 첫소리(의사 [의]), 조사(나의 [에]), 자음 뒤(희망 [히]) 소리가 달라져요.',
  ],
  footerLeft: '해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어',
  footerRight: '카드 표기: 순번 · 모음 글자 · 모음 이름 · 발음 로마자',
};

type VowelGroup = 'basic' | 'compound';

interface VowelSummaryItem {
  num: string;
  char: string;
  soundSyllable: string;
  romaja: string;
  group: VowelGroup;
}

const SUMMARY_BASIC_VOWELS: VowelSummaryItem[] = [
  { num: '01', char: 'ㅏ', soundSyllable: '아', romaja: '[a]', group: 'basic' },
  { num: '02', char: 'ㅑ', soundSyllable: '야', romaja: '[ya]', group: 'basic' },
  { num: '03', char: 'ㅓ', soundSyllable: '어', romaja: '[eo]', group: 'basic' },
  { num: '04', char: 'ㅕ', soundSyllable: '여', romaja: '[yeo]', group: 'basic' },
  { num: '05', char: 'ㅗ', soundSyllable: '오', romaja: '[o]', group: 'basic' },
  { num: '06', char: 'ㅛ', soundSyllable: '요', romaja: '[yo]', group: 'basic' },
  { num: '07', char: 'ㅜ', soundSyllable: '우', romaja: '[u]', group: 'basic' },
  { num: '08', char: 'ㅠ', soundSyllable: '유', romaja: '[yu]', group: 'basic' },
  { num: '09', char: 'ㅡ', soundSyllable: '으', romaja: '[eu]', group: 'basic' },
  { num: '10', char: 'ㅣ', soundSyllable: '이', romaja: '[i]', group: 'basic' },
];

const SUMMARY_COMPOUND_VOWELS: VowelSummaryItem[] = [
  { num: '11', char: 'ㅐ', soundSyllable: '애', romaja: '[ae]', group: 'compound' },
  { num: '12', char: 'ㅒ', soundSyllable: '얘', romaja: '[yae]', group: 'compound' },
  { num: '13', char: 'ㅔ', soundSyllable: '에', romaja: '[e]', group: 'compound' },
  { num: '14', char: 'ㅖ', soundSyllable: '예', romaja: '[ye]', group: 'compound' },
  { num: '15', char: 'ㅘ', soundSyllable: '와', romaja: '[wa]', group: 'compound' },
  { num: '16', char: 'ㅝ', soundSyllable: '워', romaja: '[wo]', group: 'compound' },
  { num: '17', char: 'ㅚ', soundSyllable: '외', romaja: '[oe]', group: 'compound' },
  { num: '18', char: 'ㅟ', soundSyllable: '위', romaja: '[wi]', group: 'compound' },
  { num: '19', char: 'ㅙ', soundSyllable: '왜', romaja: '[wae]', group: 'compound' },
  { num: '20', char: 'ㅞ', soundSyllable: '웨', romaja: '[we]', group: 'compound' },
  { num: '21', char: 'ㅢ', soundSyllable: '의', romaja: '[ui]', group: 'compound' },
];

const VOWEL_GROUP_STYLE: Record<
  VowelGroup,
  { border: string; topBg: string; numText: string; cardHover: string }
> = {
  basic: {
    border: 'border-sky-300',
    topBg: 'bg-sky-50/90 border-b border-sky-200',
    numText: 'text-sky-800',
    cardHover: 'hover:border-sky-500 hover:bg-sky-50/30',
  },
  compound: {
    border: 'border-amber-300',
    topBg: 'bg-amber-50/90 border-b border-amber-200',
    numText: 'text-amber-800',
    cardHover: 'hover:border-amber-500 hover:bg-amber-50/30',
  },
};

export const VowelsSummaryWorksheetPage: React.FC<
  JamoSheetProps & { copy?: VowelsSummaryCopy }
> = ({ interactiveAudio = true, className = '', copy = DEFAULT_VOWELS_SUMMARY_COPY }) => {
  const handleCardClick = (item: VowelSummaryItem) => {
    if (!interactiveAudio) return;
    playCutePop();
    speakKorean(item.char, 0.85);
  };

  const renderVowelCard = (item: VowelSummaryItem, isCompact = false) => {
    const st = VOWEL_GROUP_STYLE[item.group];
    return (
      <div
        key={item.char}
        onClick={() => handleCardClick(item)}
        className={`summary-vowel-card rounded-xl border-[1.5px] ${st.border} bg-white flex flex-col justify-between overflow-hidden shadow-2xs transition-all ${
          interactiveAudio ? `cursor-pointer ${st.cardHover} hover:shadow-md active:scale-[0.98]` : ''
        }`}
        title={interactiveAudio ? `클릭하여 소리 듣기: ${item.soundSyllable} (${item.char})` : undefined}
      >
        {/* Top Number-Only Header */}
        <div className={`px-2 py-0.5 flex items-center justify-between ${st.topBg} shrink-0`}>
          <span className={`text-[9.5px] font-black tabular-nums ${st.numText}`}>
            {item.num}
          </span>
        </div>

        {/* Center Vowel + Name Syllable */}
        <div className={`px-1 ${isCompact ? 'py-1' : 'py-1.5'} flex-1 flex flex-col items-center justify-center text-center`}>
          <span
            className="font-badasseugi font-black text-slate-950 leading-none select-none"
            style={{
              fontFamily:
                "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
              fontWeight: 700,
              fontSize: isCompact ? '2.2rem' : '2.5rem',
              lineHeight: 1.02,
            }}
          >
            {item.char}
          </span>
          <span className="mt-1 text-[12.5px] font-black text-slate-900 leading-tight font-korean-gothic">
            {item.soundSyllable}
          </span>
        </div>

        {/* Bottom NIKL Pronunciation Romanization */}
        <div className="px-1 py-1 bg-slate-50/90 border-t border-slate-200 text-center shrink-0">
          <span className="romaja-badge text-[11.5px] font-black tracking-tight leading-none">
            {item.romaja}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`print-sheet printable-word-sheet printable-jamo-sheet vowels-summary-sheet w-full max-w-[1060px] bg-white rounded-xl border-2 border-slate-300 p-2.5 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '660px' }}
    >
      <JamoStyleSheet />

      {/* 1. Sheet Header */}
      <div className="flex flex-nowrap items-center justify-between gap-x-2.5 border-b-2 border-slate-700 pb-1.5 mb-2 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-[12px] sm:text-[13px] font-nanum-barun-gothic sheet-header-title min-w-0 flex-1 overflow-x-hidden overflow-y-visible py-0.5">
          <span className="text-base leading-none shrink-0">🥟</span>
          <span
            className="sheet-header-text font-nanum-barun-gothic font-bold whitespace-nowrap leading-normal"
            style={{
              fontFamily:
                "'NanumBarunGothic', '나눔바른고딕', 'Hakgyoansim Bareondotum', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans KR', system-ui, sans-serif",
              fontWeight: 700,
              letterSpacing: '0',
            }}
          >
            {copy.sheetTitle}
          </span>
        </div>
        <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-700 flex flex-nowrap items-center gap-x-2.5 font-korean-gothic sheet-header-info whitespace-nowrap shrink-0 leading-normal">
          <span className="text-slate-500 font-bold whitespace-nowrap">{copy.totalBadge}</span>
          <span className="whitespace-nowrap">{copy.gradeLabel}: _____</span>
          <span className="whitespace-nowrap">{copy.nameLabel}: __________</span>
        </div>
      </div>

      {/* 2. Section 1: 기본 모음 10자 (10열 × 1행) */}
      <div className="flex flex-col gap-2 flex-1 justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] font-black text-slate-900 font-korean-gothic">
              <span className="w-5 h-5 rounded-md bg-sky-700 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                1
              </span>
              <span>{copy.sec1Title}</span>
              <span className="text-[11px] font-bold text-slate-500">{copy.sec1Sub}</span>
            </div>
          </div>

          <div className="summary-vowel-basic-grid grid grid-cols-10 print:grid-cols-10 gap-1.5">
            {SUMMARY_BASIC_VOWELS.map((item) => renderVowelCard(item, false))}
          </div>
        </div>

        {/* 3. Section 2 & 3: 좌측 복합 모음 11자 + 우측 소리가 비슷한 복합 모음 · 발음 팁 */}
        <div className="summary-vowel-bottom-split grid grid-cols-[57fr_43fr] print:grid-cols-[57fr_43fr] gap-2.5 items-stretch pt-0.5 flex-1">
          {/* Left: 복합 모음 11자 */}
          <div className="flex flex-col min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-[13px] font-black text-slate-900 font-korean-gothic">
                <span className="w-5 h-5 rounded-md bg-amber-600 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <span>{copy.sec2Title}</span>
                <span className="text-[11px] font-bold text-slate-500">{copy.sec2Sub}</span>
              </div>
            </div>

            <div className="summary-vowel-compound-grid grid grid-cols-6 print:grid-cols-6 gap-1.5 flex-1">
              {SUMMARY_COMPOUND_VOWELS.map((item) => renderVowelCard(item, true))}
              <div className="rounded-xl border-[1.5px] border-dashed border-amber-300 bg-amber-50/60 p-1.5 flex flex-col items-center justify-center text-center font-korean-gothic min-w-0">
                <span className="text-[10.5px] font-black text-amber-950 leading-tight break-words w-full">
                  {copy.completeCardTitle}
                </span>
                <span className="mt-1 text-[9px] font-bold text-amber-800 leading-snug break-words w-full">
                  {copy.completeCardSub}
                </span>
              </div>
            </div>
          </div>

          {/* Right: 소리가 비슷한 복합 모음 · 발음 팁 */}
          <div className="flex flex-col min-w-0">
            <div className="flex flex-nowrap items-center gap-1.5 text-[11.5px] sm:text-[12.5px] font-black text-slate-900 font-korean-gothic mb-1.5 leading-normal">
              <span className="w-5 h-5 rounded-md bg-indigo-700 text-white text-[11px] font-black flex items-center justify-center shrink-0">
                3
              </span>
              <span className="whitespace-nowrap">{copy.sec3Title}</span>
              <span className="text-[10.5px] font-bold text-slate-500 whitespace-nowrap">{copy.sec3Sub}</span>
            </div>

            <div className="flex-1 rounded-xl border-[1.5px] border-slate-300 bg-[#F8FAFC] p-2.5 flex flex-col justify-between gap-1.5 font-korean-gothic min-w-0">
              <div className="space-y-1.5 min-w-0">
                <div className="text-[10.5px] font-black text-rose-800 break-words leading-snug">
                  {copy.similarGroupTitle}
                </div>
                <div className="space-y-1">
                  {copy.similarPairs.map((pair) => (
                    <div
                      key={pair.formula}
                      className="rounded-lg bg-white border border-slate-200 px-2 py-1 flex items-center justify-between gap-2 text-[10px] min-w-0"
                    >
                      <span className="font-black text-slate-900 shrink-0">{pair.formula}</span>
                      <span className="font-bold text-slate-600 text-right leading-snug break-words min-w-0">{pair.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-1.5 space-y-1 min-w-0">
                <div className="text-[10px] font-black text-indigo-900 break-words">{copy.tipTitle}</div>
                <div className="space-y-0.5 text-[9.5px] text-slate-700 font-medium leading-snug break-words">
                  {copy.tips.map((tip, idx) => (
                    <div key={idx}>• {tip}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Sheet Footer */}
      <div className="mt-1.5 pt-1 border-t border-slate-300 flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium break-words">{copy.footerLeft}</span>
        <span className="font-bold text-slate-400 break-words">{copy.footerRight}</span>
      </div>
    </div>
  );
};

// ============================================================================
// [기본글자] ①~㉑ 21쪽 커리큘럼 학습지 컴포넌트 Re-export
// ============================================================================
export { BasicLetterWorksheetPage, JamoCombinationWorksheetPage } from './PrintableBasicLettersSheet';






