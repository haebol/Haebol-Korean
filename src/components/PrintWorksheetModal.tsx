import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Printer, X, FileText, CheckCircle2, Globe, PenTool, Star, Sparkles, Grid } from 'lucide-react';
import { VocabularyItem, SupportedLanguage } from '../types';
import { CHAPTER_LIST } from '../data/vocabulary';
import { playCutePop } from '../utils/audio';

export interface PrintWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'writing' | 'quiz' | 'consonants' | 'vowels' | 'combo';
  chapter: number;
  vocabulary: VocabularyItem[];
  currentLang: SupportedLanguage;
  onSelectChapter?: (ch: number) => void;
}

// 14 Korean Primary Consonants (7 Left: ㄱ~ㅅ, 7 Right: ㅇ~ㅎ)
const CONSONANTS_DATA = [
  { left: { char: 'ㄱ', name: '기역' }, right: { char: 'ㅇ', name: '이응' } },
  { left: { char: 'ㄴ', name: '니은' }, right: { char: 'ㅈ', name: '지읒' } },
  { left: { char: 'ㄷ', name: '디귿' }, right: { char: 'ㅊ', name: '치읓' } },
  { left: { char: 'ㄹ', name: '리을' }, right: { char: 'ㅋ', name: '키읔' } },
  { left: { char: 'ㅁ', name: '미음' }, right: { char: 'ㅌ', name: '티읕' } },
  { left: { char: 'ㅂ', name: '비읍' }, right: { char: 'ㅍ', name: '피읖' } },
  { left: { char: 'ㅅ', name: '시옷' }, right: { char: 'ㅎ', name: '히읗' } },
];

// 22 Korean Vowels Array (11 Left: ㅏ~ㅣ+♡, 11 Right: ㅐ~ㅢ)
const VOWELS_DATA = [
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
// 1행 (2번째칸~): 14자음 ㄱ~ㅎ
const COMBO_CONSONANTS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
// 1열 (2번째줄~): 10모음 ㅏ~ㅣ
const COMBO_VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'];

export type WorksheetLanguage = SupportedLanguage | 'all';

export const PrintWorksheetModal: React.FC<PrintWorksheetModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'writing',
  chapter: propChapter,
  vocabulary,
  currentLang,
  onSelectChapter
}) => {
  const [mode, setMode] = useState<'writing' | 'quiz' | 'consonants' | 'vowels' | 'combo'>(initialMode);
  const [selectedCh, setSelectedCh] = useState<number>(propChapter);
  const [selectedLang, setSelectedLang] = useState<WorksheetLanguage>(currentLang);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedCh(propChapter);
      setSelectedLang(currentLang);
    }
  }, [isOpen, initialMode, propChapter, currentLang]);

  if (!isOpen) return null;

  const currentChapterObj = CHAPTER_LIST.find(c => c.ch === selectedCh) || CHAPTER_LIST[0];
  const items = vocabulary.filter(v => v.ch === selectedCh).slice(0, 10);

  // Dynamic language configuration based on selectedLang
  const getLanguageDetails = () => {
    switch (selectedLang) {
      case 'all':
        return {
          code: 'all',
          label: '함께(all) 뜻',
          flag: '🌐',
          getTranslation: (item: VocabularyItem) => `${item.en} / ${item.vi} / ${item.bn}`,
          fontClass: 'font-bold'
        };
      case 'vi':
        return {
          code: 'vi',
          label: '베트남어 (Tiếng Việt)',
          flag: '🇻🇳',
          getTranslation: (item: VocabularyItem) => item.vi,
          fontClass: 'font-bold'
        };
      case 'bn':
        return {
          code: 'bn',
          label: '벵골어 (বাংলা)',
          flag: '🇧🇩',
          getTranslation: (item: VocabularyItem) => item.bn,
          fontClass: "font-['Noto_Sans_Bengali',sans-serif] font-bold"
        };
      case 'zh':
        return {
          code: 'zh',
          label: '중국어 (中文)',
          flag: '🇨🇳',
          getTranslation: (item: VocabularyItem) => (item as any).zh || item.en,
          fontClass: 'font-bold'
        };
      case 'ru':
        return {
          code: 'ru',
          label: '러시아어 (Русский)',
          flag: '🇷🇺',
          getTranslation: (item: VocabularyItem) => (item as any).ru || item.en,
          fontClass: 'font-bold'
        };
      case 'ja':
        return {
          code: 'ja',
          label: '일본어 (日本語)',
          flag: '🇯🇵',
          getTranslation: (item: VocabularyItem) => (item as any).ja || item.en,
          fontClass: 'font-bold'
        };
      case 'mn':
        return {
          code: 'mn',
          label: '몽골어 (Монгол хэл)',
          flag: '🇲🇳',
          getTranslation: (item: VocabularyItem) => (item as any).mn || item.en,
          fontClass: 'font-bold'
        };
      case 'en':
      default:
        return {
          code: 'en',
          label: '영어 (English)',
          flag: '🇺🇸',
          getTranslation: (item: VocabularyItem) => item.en,
          fontClass: 'font-bold'
        };
    }
  };

  const langDetails = getLanguageDetails();

  // 3열 다국어 렌더링 헬퍼: '함께(all)' 선택 시 3줄(1줄 영어, 2줄 베트남어, 3줄 벵골어)로 분할
  const renderTranslationCell = (item: VocabularyItem) => {
    if (selectedLang === 'all') {
      return (
        <div className="all-langs-cell w-full h-full flex flex-col justify-evenly divide-y divide-slate-200/90 text-left px-1.5 py-0.5 box-border">
          {/* 1줄: 영어 뜻 */}
          <div className="lang-row flex items-center gap-1 min-h-0 py-0.5 overflow-hidden">
            <span className="lang-tag text-[7.5px] font-black text-indigo-700 bg-indigo-50 px-1 py-0.2 rounded shrink-0 select-none border border-indigo-200/60 leading-none">
              영
            </span>
            <span className="lang-text text-[9.5px] sm:text-[10px] font-bold text-slate-900 truncate leading-tight" title={item.en}>
              {item.en}
            </span>
          </div>

          {/* 2줄: 베트남어 */}
          <div className="lang-row flex items-center gap-1 min-h-0 py-0.5 overflow-hidden">
            <span className="lang-tag text-[7.5px] font-black text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded shrink-0 select-none border border-emerald-200/60 leading-none">
              베
            </span>
            <span className="lang-text text-[9.5px] sm:text-[10px] font-bold text-slate-900 truncate leading-tight" title={item.vi}>
              {item.vi}
            </span>
          </div>

          {/* 3줄: 벵골어 */}
          <div className="lang-row flex items-center gap-1 min-h-0 py-0.5 overflow-hidden font-['Noto_Sans_Bengali',sans-serif]">
            <span className="lang-tag text-[7.5px] font-black text-amber-800 bg-amber-50 px-1 py-0.2 rounded shrink-0 select-none border border-amber-200/60 leading-none">
              벵
            </span>
            <span className="lang-text text-[9px] sm:text-[9.5px] font-bold text-slate-900 truncate leading-tight" title={item.bn}>
              {item.bn}
            </span>
          </div>
        </div>
      );
    }

    return (
      <span
        style={{
          fontSize: '1.15rem',
          whiteSpace: 'nowrap',
          lineHeight: 1.2
        }}
        className={`inline-block text-slate-900 truncate max-w-full ${langDetails.fontClass}`}
        title={langDetails.getTranslation(item)}
      >
        {langDetails.getTranslation(item)}
      </span>
    );
  };

  const handlePrint = () => {
    playCutePop();
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return createPortal(
    <div className="print-modal-overlay fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      {/* Strict A4 Landscape 1-Page Print CSS Rules with Square Cells (각 1칸 정사각형) */}
      <style>{`
        @font-face {
          font-family: 'Hakgyoansim Bareondotum';
          src: local('Hakgyoansim Bareondotum Regular'),
               local('Hakgyoansim Bareondotum'),
               local('학교안심 바른돋움 R'),
               local('학교안심 바른돋움'),
               url('/fonts/HakgyoansimBareondotum-Regular.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Hakgyoansim Bareondotum';
          src: local('Hakgyoansim Bareondotum Bold'),
               local('학교안심 바른돋움 B'),
               url('/fonts/HakgyoansimBareondotum-Bold.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: '학교안심 바른돋움';
          src: local('Hakgyoansim Bareondotum Regular'),
               local('Hakgyoansim Bareondotum'),
               local('학교안심 바른돋움 R'),
               local('학교안심 바른돋움'),
               url('/fonts/HakgyoansimBareondotum-Regular.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Hakgyoansim Badasseugi';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Hakgyoansim Badasseugi';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: '학교안심 받아쓰기';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: '학교안심 받아쓰기';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: '학교알림받아쓰기';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: '학교알림받아쓰기';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'NanumBarunGothic';
          src: local('NanumBarunGothic'),
               local('나눔바른고딕'),
               url('/fonts/NanumBarunGothic.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/moonspam/NanumBarunGothic@latest/NanumBarunGothicSubset.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'NanumBarunGothic';
          src: local('NanumBarunGothic Bold'),
               local('나눔바른고딕 Bold'),
               url('/fonts/NanumBarunGothicBold.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/moonspam/NanumBarunGothic@latest/NanumBarunGothicBoldSubset.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'KyoboHand';
          src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/KyoboHand.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .font-school-hand,
        .font-badasseugi,
        .font-kyobo {
          font-family: 'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important;
          font-weight: 400 !important;
          letter-spacing: -0.01em;
        }

        .font-school-base,
        .font-korean-gothic {
          font-family: 'Hakgyoansim Bareondotum', '학교안심 바른돋움', 'NanumBarunGothic', sans-serif !important;
        }

        .font-nanum-barun-gothic,
        .sheet-header-title {
          font-family: 'NanumBarunGothic', '나눔바른고딕', 'NanumBarunGothicBold', sans-serif !important;
        }

        /* Screen Styles for Square Grids (자음 8×18, 모음 12×18, 자음모음 15×11) */
        table.square-grid-table {
          width: 100% !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
          margin: 0 auto !important;
        }
        table.square-grid-table th,
        table.square-grid-table td {
          padding: 0 !important;
          border: 1.5px solid #374151 !important;
          box-sizing: border-box !important;
          text-align: center !important;
          vertical-align: middle !important;
        }
        table.square-grid-table thead tr {
          height: 28px !important;
        }
        table.square-grid-table thead th {
          padding: 2px 0 !important;
        }
        table.square-grid-table tbody td {
          height: auto !important;
        }
        table.square-grid-table tbody td .cell-square-box {
          width: 100% !important;
          aspect-ratio: 1 / 1 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          box-sizing: border-box !important;
        }

        /* combo table (15×11) specific screen styling */
        table.combo-table th,
        table.combo-table td {
          width: 6.66% !important;
        }
        table.combo-table tbody td .cell-square-box {
          aspect-ratio: unset !important;
          height: 44px !important;
          max-height: 48px !important;
        }
        table.large-combo-table th:first-child,
        table.large-combo-table td:first-child {
          width: 4.8% !important;
        }
        table.large-combo-table th:not(:first-child),
        table.large-combo-table td:not(:first-child) {
          width: 13.6% !important;
        }

        @page {
          size: A4 landscape;
          margin: 4mm 6mm;
        }

        @media print {
          html, body {
            width: 100% !important;
            height: 100% !important;
            max-height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .top-sticky-menu-box, .sticky, header, nav, aside {
            position: static !important;
            top: auto !important;
          }
          #root, .top-sticky-menu-box, header, nav, footer, .no-print, button, .quiz-modal {
            display: none !important;
          }
          .print-modal-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
            display: block !important;
            box-shadow: none !important;
          }
          .print-modal-card {
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            max-height: none !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            display: block !important;
          }
          .print-sheet {
            width: 100% !important;
            max-width: 100% !important;
            height: 190mm !important;
            max-height: 192mm !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            border: none !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          table {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            background: #ffffff !important;
            box-sizing: border-box !important;
          }
          thead tr {
            height: 6.5mm !important;
            max-height: 6.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          tbody tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          th, td {
            border: 1.5px solid #374151 !important;
            text-align: center !important;
            vertical-align: middle !important;
            padding: 0 !important;
            background: transparent !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          /* 단어 쓰기(6×11) 높이 고정 규격 */
          table.word-table thead tr {
            height: 6.5mm !important;
            max-height: 6.5mm !important;
          }
          table.word-table tbody tr {
            height: 16.5mm !important;
            max-height: 16.5mm !important;
          }

          /* 3열 다국어 함께(all) 3줄 분할 인쇄 전용 스타일 */
          .all-langs-cell {
            height: 100% !important;
            max-height: 16.2mm !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-evenly !important;
            padding: 0.3mm 1.2mm !important;
            box-sizing: border-box !important;
          }
          .all-langs-cell .lang-row {
            display: flex !important;
            align-items: center !important;
            gap: 0.8mm !important;
            line-height: 1.15 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .all-langs-cell .lang-tag {
            font-size: 5.5pt !important;
            padding: 0.1mm 0.6mm !important;
            line-height: 1 !important;
            border: 0.5px solid #94a3b8 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .all-langs-cell .lang-text {
            font-size: 7.2pt !important;
            line-height: 1.15 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          /* 18열 테이블 (자음 8×18, 모음 12×18) 및 자음모음 (15×11) */
          table.square-grid-table {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
          }
          table.square-grid-table thead tr {
            height: 6.5mm !important;
            max-height: 6.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.square-grid-table thead th {
            border: 1.5px solid #374151 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            vertical-align: middle !important;
          }
          table.square-grid-table tbody td {
            border: 1.5px solid #374151 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            vertical-align: middle !important;
          }

          /* 자음 쓰기 (8×18): 7개 데이터 행 -> 행당 17.5mm */
          table.consonant-table tbody tr {
            height: 17.5mm !important;
            max-height: 17.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.consonant-table tbody td .cell-square-box {
            width: 100% !important;
            height: 17.5mm !important;
            max-height: 17.5mm !important;
            aspect-ratio: unset !important;
          }

          /* 모음 쓰기 (12×18): 11개 데이터 행 -> 행당 14.2mm */
          table.vowel-table tbody tr {
            height: 14.2mm !important;
            max-height: 14.2mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.vowel-table tbody td .cell-square-box {
            width: 100% !important;
            height: 14.2mm !important;
            max-height: 14.2mm !important;
            aspect-ratio: unset !important;
          }

          /* 자음 모음 쓰기 (15×11): 1헤더 + 10행 모음 -> 행당 15.2mm (전체 페이지 100% 여유 수용) */
          table.combo-table thead tr {
            height: 6.0mm !important;
            max-height: 6.0mm !important;
          }
          table.combo-table thead th {
            height: 6.0mm !important;
            padding: 0 !important;
            vertical-align: middle !important;
          }
          table.combo-table tbody tr {
            height: 13.5mm !important;
            max-height: 13.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.combo-table tbody td {
            height: 13.5mm !important;
            max-height: 13.5mm !important;
            padding: 0 !important;
            vertical-align: middle !important;
          }
          table.combo-table tbody td .cell-square-box {
            width: 100% !important;
            height: 13.5mm !important;
            max-height: 13.5mm !important;
            aspect-ratio: unset !important;
            margin: 0 auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
            box-sizing: border-box !important;
          }

          /* 대형 4분할 결합표 (16~23쪽) 인쇄 스타일 */
          table.large-combo-table {
            width: 100% !important;
            table-layout: fixed !important;
          }
          table.large-combo-table thead tr {
            height: 8.5mm !important;
            max-height: 8.5mm !important;
          }
          table.large-combo-table tbody tr {
            height: 29.5mm !important;
            max-height: 29.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.large-combo-table th:first-child,
          table.large-combo-table td:first-child {
            width: 4.8% !important;
            max-width: 4.8% !important;
          }
          table.large-combo-table th:not(:first-child),
          table.large-combo-table td:not(:first-child) {
            width: 13.6% !important;
            max-width: 13.6% !important;
          }
          table.large-combo-table tbody td .cell-square-box {
            width: 100% !important;
            height: 29.5mm !important;
            max-height: 29.5mm !important;
          }
        }
      `}</style>

      {/* Screen Modal Container */}
      <div className="print-modal-card relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-indigo-300 overflow-hidden flex flex-col max-h-[96vh] my-auto">
        {/* Top Control Bar (Screen only) */}
        <div className="no-print bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-md shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base leading-tight flex items-center gap-2">
                <span>
                  {mode === 'writing'
                    ? '단어쓰기 학습지'
                    : mode === 'quiz'
                    ? '단어시험지'
                    : mode === 'consonants'
                    ? '자음 쓰기 학습지'
                    : mode === 'vowels'
                    ? '모음 쓰기 학습지'
                    : '자음·모음 결합 학습지'}
                </span>
                <span className="text-[11px] bg-indigo-500/80 px-2 py-0.5 rounded-full font-bold">
                  A4 가로
                </span>
              </h2>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-indigo-900/60 p-1 rounded-xl flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setMode('writing');
              }}
              className={`px-2 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                mode === 'writing'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>단어쓰기</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setMode('quiz');
              }}
              className={`px-2 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                mode === 'quiz'
                  ? 'bg-white text-indigo-900 shadow-sm'
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>단어시험</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setMode('consonants');
              }}
              className={`px-2 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                mode === 'consonants'
                  ? 'bg-amber-400 text-amber-950 shadow-sm'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>자음 쓰기</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setMode('vowels');
              }}
              className={`px-2 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                mode === 'vowels'
                  ? 'bg-pink-400 text-pink-950 shadow-sm'
                  : 'text-pink-200 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>모음 쓰기</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setMode('combo');
              }}
              className={`px-2 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                mode === 'combo'
                  ? 'bg-emerald-400 text-emerald-950 shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>자음·모음 결합</span>
            </button>
          </div>

          {/* Controls: Language Selector + Chapter Selector + Print Button */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* 번역 언어 선택 드롭다운 옵션 (단어 모드에서 주로 활용) */}
            {mode !== 'consonants' && mode !== 'vowels' && mode !== 'combo' && (
              <div className="flex items-center gap-1 bg-indigo-950/70 border border-indigo-400/90 rounded-xl px-2 py-1">
                <Globe className="w-3.5 h-3.5 text-indigo-200" />
                <select
                  value={selectedLang}
                  onChange={e => {
                    playCutePop();
                    setSelectedLang(e.target.value as WorksheetLanguage);
                  }}
                  className="bg-transparent text-white text-xs sm:text-sm font-bold focus:outline-none cursor-pointer"
                  title="인쇄할 번역 언어 선택"
                >
                  <option value="all" className="text-slate-900 bg-white">🌐 함께(all)</option>
                  <option value="en" className="text-slate-900 bg-white">🇺🇸 영어 (English)</option>
                  <option value="vi" className="text-slate-900 bg-white">🇻🇳 베트남어 (Tiếng Việt)</option>
                  <option value="bn" className="text-slate-900 bg-white">🇧🇩 벵골어 (বাংলা)</option>
                  <option value="zh" className="text-slate-900 bg-white">🇨🇳 중국어 (中文)</option>
                  <option value="ru" className="text-slate-900 bg-white">🇷🇺 러시아어 (Русский)</option>
                  <option value="ja" className="text-slate-900 bg-white">🇯🇵 일본어 (日本語)</option>
                  <option value="mn" className="text-slate-900 bg-white">🇲🇳 몽골어 (Монгол хэл)</option>
                </select>
              </div>
            )}

            {/* Chapter Selector Dropdown (단어 모드 시) */}
            {mode !== 'consonants' && mode !== 'vowels' && mode !== 'combo' ? (
              <select
                value={selectedCh}
                onChange={e => {
                  const val = Number(e.target.value);
                  setSelectedCh(val);
                  onSelectChapter?.(val);
                }}
                className="h-8.5 bg-indigo-950/70 border border-indigo-400/90 text-white rounded-xl text-xs sm:text-sm px-2 font-bold focus:outline-none cursor-pointer"
                title="챕터 선택"
              >
                {CHAPTER_LIST.map(ch => (
                  <option key={ch.ch} value={ch.ch} className="text-slate-900 bg-white">
                    {ch.icon} {ch.circledTitle}
                  </option>
                ))}
              </select>
            ) : mode === 'consonants' ? (
              <div className="h-8.5 bg-indigo-950/70 border border-indigo-400/90 text-amber-300 rounded-xl text-xs sm:text-sm px-2.5 flex items-center font-bold">
                자음 14자 쓰기
              </div>
            ) : mode === 'vowels' ? (
              <div className="h-8.5 bg-indigo-950/70 border border-indigo-400/90 text-pink-300 rounded-xl text-xs sm:text-sm px-2.5 flex items-center font-bold">
                모음 21자 쓰기
              </div>
            ) : (
              <div className="h-8.5 bg-indigo-950/70 border border-indigo-400/90 text-emerald-300 rounded-xl text-xs sm:text-sm px-2.5 flex items-center font-bold">
                자음·모음 결합 표
              </div>
            )}

            <button
              type="button"
              onClick={handlePrint}
              className="h-8.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-4 h-4" />
              <span>인쇄하기 (A4 가로 1장)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playCutePop();
                onClose();
              }}
              className="w-8.5 h-8.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sheet Preview Container: 여백을 순수 흰색(bg-white)으로 설정 */}
        <div className="p-3 sm:p-5 overflow-y-auto bg-white flex-1 flex flex-col items-center pb-8">
          <div className="print-sheet w-full max-w-[990px] bg-white rounded-xl border-2 border-slate-700 p-2 sm:p-3 text-slate-800 flex flex-col justify-between">
            {/* 1. Header Row */}
            <div className="flex items-center justify-between border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
              <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-korean-gothic">
                <span className="text-base leading-none">🥟</span>
                <span>
                  {mode === 'writing'
                    ? `해볼 한국어 [쓰기학습지] ${currentChapterObj.circledTitle}`
                    : mode === 'quiz'
                    ? `해볼 한국어 [테스트지] ${currentChapterObj.circledTitle}`
                    : mode === 'consonants'
                    ? `해볼 한국어 [한글] ① 자음쓰기 (Consonants)`
                    : mode === 'vowels'
                    ? `해볼 한국어 [한글] ② 모음쓰기 (Vowels)`
                    : `해볼 한국어 [한글] ③ 자음·모음 결합 (Combination)`}
                </span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-700 flex items-center gap-4 font-korean-gothic">
                {mode === 'quiz' ? (
                  <>
                    <span>학년: ________</span>
                    <span>이름: ________________</span>
                    <span>점수: ____ / 10</span>
                  </>
                ) : (
                  <span>학년: ________   이름: ________________</span>
                )}
              </div>
            </div>

            {/* 2. Main Tables */}
            {mode === 'combo' ? (
              /* ★자음 모음 쓰기 (음절 조합표): 15×11 표
                 - 1행: 첫칸 빈칸, 2~15열 자음 14자 (ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ)
                 - 1열: 첫칸 빈칸, 2~11행 모음 10자 (ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ)
                 - 내부: 학생들이 십자선에 맞춰 자음+모음 조합(가, 나, 다...)을 직접 써보는 14×10 셀 매트릭스
              */
              <table className="square-grid-table combo-table w-full border-collapse border border-slate-700 bg-white">
                <thead>
                  <tr className="bg-emerald-50 text-slate-900 font-extrabold text-[12px] sm:text-sm font-korean-gothic">
                    {/* 1행 1열: 빈칸 */}
                    <th style={{ width: '6.66%', border: '1.5px solid #374151' }} className="py-0.5 bg-emerald-100/80">
                    </th>
                    {/* 1행 2~15열: 자음 14자 */}
                    {COMBO_CONSONANTS.map((c, i) => (
                      <th
                        key={`combo-head-${i}`}
                        style={{ width: '6.66%', border: '1.5px solid #374151' }}
                        className="py-0.5 bg-emerald-50 text-emerald-950 font-black"
                      >
                        <span
                          className="font-korean-gothic font-black text-lg sm:text-xl leading-none select-none inline-block"
                          style={{ fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important" }}
                        >
                          {c}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMBO_VOWELS.map((v, vIdx) => (
                    <tr key={`combo-row-${vIdx}`} className="border-b-[1.5px] border-slate-700">
                      {/* 1열: 모음 10자 (2번째줄부터 아래로) */}
                      <td
                        style={{ width: '6.66%', border: '1.5px solid #374151' }}
                        className="text-center align-middle p-0 bg-emerald-50/80"
                      >
                        <div className="cell-square-box relative w-full flex items-center justify-center">
                          <span
                            className="relative z-10 leading-none select-none font-bold font-korean-gothic whitespace-nowrap text-emerald-950"
                            style={{
                              fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              fontWeight: 700,
                              fontSize: '1.75rem',
                              lineHeight: 1
                            }}
                          >
                            {v}
                          </span>
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
            ) : mode === 'vowels' ? (
              /* ★모음 쓰기 학습지: 12×18 배열 정사각형 테이블 (1헤더 + 11행 모음 × 18열)
                 - 좌측 9열: 1열 모음 + 2~9열 8회 따라쓰기 (1~2회 가이드 글자, 3~8회 빈칸)
                 - 우측 9열: 10열 모음 + 11~18열 8회 따라쓰기 (1~2회 가이드 글자, 3~8회 빈칸)
              */
              <table className="square-grid-table vowel-table w-full border-collapse border border-slate-700 bg-white">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-extrabold text-[11px] sm:text-xs font-korean-gothic">
                    {/* 좌측 9열 (1열 모음 + 2~9열 8회 따라쓰기) */}
                    <th style={{ width: '5.55%', border: '1.5px solid #374151' }} className="py-1 bg-pink-50 text-pink-950 font-black">
                      모음
                    </th>
                    {Array.from({ length: 8 }, (_, i) => (
                      <th key={`vhead-left-${i}`} style={{ width: '5.55%', border: '1.5px solid #374151' }} className="py-1 text-slate-700">
                        {i + 1}
                      </th>
                    ))}

                    {/* 우측 9열 (10열 모음 + 11~18열 8회 따라쓰기) */}
                    <th
                      style={{ width: '5.55%', border: '1.5px solid #374151', borderLeft: '2.5px solid #1e293b' }}
                      className="py-1 bg-pink-50 text-pink-950 font-black"
                    >
                      모음
                    </th>
                    {Array.from({ length: 8 }, (_, i) => (
                      <th key={`vhead-right-${i}`} style={{ width: '5.55%', border: '1.5px solid #374151' }} className="py-1 text-slate-700">
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
                        className="text-center align-middle p-0 bg-pink-50/70"
                      >
                        <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-pink-300 pointer-events-none" />
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-pink-300 pointer-events-none" />
                          <span
                            className="relative z-10 leading-none select-none font-black font-korean-gothic whitespace-nowrap text-slate-950"
                            style={{
                              fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              fontWeight: 700,
                              fontSize: row.left === '♡' ? '1.75rem' : '2.05rem',
                              color: row.left === '♡' ? '#e11d48' : '#111827'
                            }}
                          >
                            {row.left}
                          </span>
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
                                className="relative z-10 leading-none select-none font-bold font-korean-gothic whitespace-nowrap"
                                style={{
                                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                                  fontWeight: 700,
                                  fontSize: row.left === '♡' ? '1.75rem' : '2.05rem',
                                  color: row.left === '♡' ? '#fda4af' : '#cbd5e1'
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
                        className="text-center align-middle p-0 bg-pink-50/70"
                      >
                        <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-pink-300 pointer-events-none" />
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-pink-300 pointer-events-none" />
                          <span
                            className="relative z-10 leading-none select-none font-black font-korean-gothic whitespace-nowrap text-slate-950"
                            style={{
                              fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              fontWeight: 700,
                              fontSize: ['ㅘ', 'ㅝ', 'ㅚ', 'ㅟ', 'ㅙ', 'ㅞ', 'ㅢ', 'ㅒ', 'ㅖ'].includes(row.right) ? '1.75rem' : '2.05rem',
                              color: '#111827'
                            }}
                          >
                            {row.right}
                          </span>
                        </div>
                      </td>

                      {/* 11~18열: 우측 모음 8번 따라쓰기 (1~2회: 회색 가이드 글자, 3~8회: 십자 점선 빈칸) */}
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
                                className="relative z-10 leading-none select-none font-bold font-korean-gothic whitespace-nowrap text-slate-300"
                                style={{
                                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                                  fontWeight: 700,
                                  fontSize: ['ㅘ', 'ㅝ', 'ㅚ', 'ㅟ', 'ㅙ', 'ㅞ', 'ㅢ', 'ㅒ', 'ㅖ'].includes(row.right) ? '1.75rem' : '2.05rem',
                                  color: '#cbd5e1'
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
            ) : mode === 'consonants' ? (
              /* ★자음 쓰기 학습지: 8×18 배열 정사각형 테이블 (1헤더 + 7행 자음 × 18열, 1칸=정사각형)
                 - 좌측 9열: 1열 자음 + 2~9열 8회 따라쓰기 (1~2회 가이드 글자, 3~8회 빈칸)
                 - 우측 9열: 10열 자음 + 11~18열 8회 따라쓰기 (1~2회 가이드 글자, 3~8회 빈칸)
              */
              <table className="square-grid-table consonant-table w-full border-collapse border border-slate-700 bg-white">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-extrabold text-[11px] sm:text-xs font-korean-gothic">
                    {/* 좌측 9열 (1열 자음 + 2~9열 8회 따라쓰기) */}
                    <th style={{ width: '5.55%', border: '1.5px solid #374151' }} className="py-1 bg-amber-50 text-amber-950 font-black">
                      자음
                    </th>
                    {Array.from({ length: 8 }, (_, i) => (
                      <th key={`head-left-${i}`} style={{ width: '5.55%', border: '1.5px solid #374151' }} className="py-1 text-slate-700">
                        {i + 1}
                      </th>
                    ))}

                    {/* 우측 9열 (10열 자음 + 11~18열 8회 따라쓰기) */}
                    <th
                      style={{ width: '5.55%', border: '1.5px solid #374151', borderLeft: '2.5px solid #1e293b' }}
                      className="py-1 bg-amber-50 text-amber-950 font-black"
                    >
                      자음
                    </th>
                    {Array.from({ length: 8 }, (_, i) => (
                      <th key={`head-right-${i}`} style={{ width: '5.55%', border: '1.5px solid #374151' }} className="py-1 text-slate-700">
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
                        className="text-center align-middle p-0 bg-amber-50/70"
                      >
                        <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-amber-300 pointer-events-none" />
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-amber-300 pointer-events-none" />
                          <span
                            className="relative z-10 leading-none select-none font-black font-korean-gothic whitespace-nowrap text-slate-950"
                            style={{
                              fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              fontWeight: 700,
                              fontSize: '2.05rem',
                              color: '#111827'
                            }}
                          >
                            {row.left.char}
                          </span>
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
                                className="relative z-10 leading-none select-none font-bold font-korean-gothic whitespace-nowrap text-slate-300"
                                style={{
                                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                                  fontWeight: 700,
                                  fontSize: '2.05rem',
                                  color: '#cbd5e1'
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
                        className="text-center align-middle p-0 bg-amber-50/70"
                      >
                        <div className="cell-square-box relative w-full aspect-square flex items-center justify-center">
                          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full border-t border-dashed border-amber-300 pointer-events-none" />
                          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-amber-300 pointer-events-none" />
                          <span
                            className="relative z-10 leading-none select-none font-black font-korean-gothic whitespace-nowrap text-slate-950"
                            style={{
                              fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                              fontWeight: 700,
                              fontSize: '2.05rem',
                              color: '#111827'
                            }}
                          >
                            {row.right.char}
                          </span>
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
                                className="relative z-10 leading-none select-none font-bold font-korean-gothic whitespace-nowrap text-slate-300"
                                style={{
                                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'Hakgyoansim Bareondotum', sans-serif !important",
                                  fontWeight: 700,
                                  fontSize: '2.05rem',
                                  color: '#cbd5e1'
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
            ) : (
              /* 단어 쓰기 학습지 & 시험지: 6×11 통합 테이블 */
              <table className="word-table w-full border-collapse border border-slate-700 bg-white">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-extrabold text-[11px] sm:text-xs font-korean-gothic border-b-[1.5px] border-slate-700">
                    {mode === 'writing' ? (
                      <>
                        <th style={{ width: '4%', border: '1.5px solid #374151' }} className="py-1">번호</th>
                        <th style={{ width: '7%', border: '1.5px solid #374151' }} className="py-1">그림</th>
                        <th style={{ width: '15%', border: '1.5px solid #374151' }} className="py-1">
                          {selectedLang === 'all' ? '함께(all) 뜻' : langDetails.label}
                        </th>
                        <th style={{ width: '24.6%', border: '1.5px solid #374151' }} className="py-1">[1] 따라 읽기</th>
                        <th style={{ width: '24.6%', border: '1.5px solid #374151' }} className="py-1">[2] 따라 쓰기</th>
                        <th style={{ width: '24.8%', border: '1.5px solid #374151' }} className="py-1">[3] 스스로 쓰기</th>
                      </>
                    ) : (
                      <>
                        <th style={{ width: '4%', border: '1.5px solid #374151' }} className="py-1">번호</th>
                        <th style={{ width: '7%', border: '1.5px solid #374151' }} className="py-1">그림</th>
                        <th style={{ width: '15%', border: '1.5px solid #374151' }} className="py-1">
                          {selectedLang === 'all' ? '함께(all) 뜻' : langDetails.label}
                        </th>
                        <th colSpan={3} style={{ width: '74%', border: '1.5px solid #374151' }} className="py-1">한국어 (Korean)</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={`${item.ch}-${item.ko}-${idx}`} className="border-b-[1.5px] border-slate-700">
                      {mode === 'writing' ? (
                        <>
                          {/* ① 번호 (4%) */}
                          <td
                            style={{ width: '4%', border: '1.5px solid #374151' }}
                            className="font-black text-sm sm:text-base text-slate-900 text-center align-middle"
                          >
                            {idx + 1}
                          </td>

                          {/* ② 그림 (7%) */}
                          <td
                            style={{ width: '7%', border: '1.5px solid #374151' }}
                            className="text-center align-middle p-0"
                          >
                            <span
                              style={{ fontSize: '1.85rem', lineHeight: 1 }}
                              className="inline-block select-none drop-shadow-xs"
                            >
                              {item.icon}
                            </span>
                          </td>

                          {/* ③ 번역 언어 (15%): '함께(all)' 선택 시 3줄 분할 (1줄 영어, 2줄 베트남어, 3줄 벵골어) */}
                          <td
                            style={{ width: '15%', border: '1.5px solid #374151' }}
                            className={`text-center align-middle ${selectedLang === 'all' ? 'p-0' : 'px-1'}`}
                          >
                            {renderTranslationCell(item)}
                          </td>

                          {/* ④ [1] 기준 글자 (24.6%) */}
                          <td
                            style={{ width: '24.6%', border: '1.5px solid #374151' }}
                            className="text-center align-middle p-0"
                          >
                            <div className="relative w-full h-full min-h-[50px] flex items-center justify-center">
                              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300 pointer-events-none" />
                              <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300 pointer-events-none" />
                              <span
                                className="relative z-10 leading-none select-none font-normal font-kyobo whitespace-nowrap"
                                style={{
                                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important",
                                  fontWeight: 400,
                                  fontSize: item.ko.length >= 9 ? '1.5rem' : item.ko.length >= 6 ? '1.85rem' : '2.2rem',
                                  letterSpacing: item.ko.length >= 9 ? '0.04em' : item.ko.length >= 6 ? '0.08em' : '0.16em',
                                  paddingLeft: item.ko.length >= 9 ? '0.04em' : item.ko.length >= 6 ? '0.08em' : '0.16em',
                                  color: '#111827'
                                }}
                              >
                                {item.ko}
                              </span>
                            </div>
                          </td>

                          {/* ⑤ [2] 따라 쓰기 (24.6%) */}
                          <td
                            style={{ width: '24.6%', border: '1.5px solid #374151' }}
                            className="text-center align-middle p-0"
                          >
                            <div className="relative w-full h-full min-h-[50px] flex items-center justify-center">
                              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300 pointer-events-none" />
                              <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300 pointer-events-none" />
                              <span
                                className="relative z-10 leading-none select-none font-normal font-kyobo whitespace-nowrap"
                                style={{
                                  fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important",
                                  fontWeight: 400,
                                  fontSize: item.ko.length >= 9 ? '1.5rem' : item.ko.length >= 6 ? '1.85rem' : '2.2rem',
                                  letterSpacing: item.ko.length >= 9 ? '0.04em' : item.ko.length >= 6 ? '0.08em' : '0.16em',
                                  paddingLeft: item.ko.length >= 9 ? '0.04em' : item.ko.length >= 6 ? '0.08em' : '0.16em',
                                  color: '#cbd5e1'
                                }}
                              >
                                {item.ko}
                              </span>
                            </div>
                          </td>

                          {/* ⑥ [3] 스스로 쓰기 (24.8%) */}
                          <td
                            style={{ width: '24.8%', border: '1.5px solid #374151' }}
                            className="text-center align-middle p-0"
                          >
                            <div className="relative w-full h-full min-h-[50px] flex items-center justify-center">
                              <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300 pointer-events-none" />
                              <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300 pointer-events-none" />
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          {/* ① 번호 (4%) */}
                          <td
                            style={{ width: '4%', border: '1.5px solid #374151' }}
                            className="font-black text-sm sm:text-base text-slate-900 text-center align-middle"
                          >
                            {idx + 1}
                          </td>

                          {/* ② 그림 (7%) */}
                          <td
                            style={{ width: '7%', border: '1.5px solid #374151' }}
                            className="text-center align-middle p-0"
                          >
                            <span
                              style={{ fontSize: '1.85rem', lineHeight: 1 }}
                              className="inline-block select-none drop-shadow-xs"
                            >
                              {item.icon}
                            </span>
                          </td>

                          {/* ③ 번역 언어 (15%): '함께(all)' 선택 시 3줄 분할 (1줄 영어, 2줄 베트남어, 3줄 벵골어) */}
                          <td
                            style={{ width: '15%', border: '1.5px solid #374151' }}
                            className={`text-center align-middle ${selectedLang === 'all' ? 'p-0' : 'px-1'}`}
                          >
                            {renderTranslationCell(item)}
                          </td>

                          {/* ④ 한국어 (Korean) 쓰기 정답란 (74%) - 초등 저학년 10칸공책 형식 */}
                          <td
                            colSpan={3}
                            style={{ width: '74%', border: '1.5px solid #374151' }}
                            className="text-center align-middle p-1 bg-white"
                          >
                            <div className="w-full flex items-center justify-center">
                              <div className="inline-flex border border-slate-400 rounded-xs overflow-hidden shadow-2xs">
                                {Array.from({ length: 10 }, (_, boxIdx) => (
                                  <div
                                    key={`quiz-box-modal-${boxIdx}`}
                                    className="relative aspect-square w-[42px] sm:w-[46px] h-[42px] sm:h-[46px] border-r border-slate-400 last:border-r-0 bg-white flex items-center justify-center"
                                  >
                                    {/* 중간 회색 수평 점선 */}
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-dashed border-slate-300 pointer-events-none" />
                                    {/* 중간 회색 수직 점선 */}
                                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full border-l border-dashed border-slate-300 pointer-events-none" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* 3. Sheet Footer */}
            <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500 font-korean-gothic shrink-0">
              <span className="font-medium">
                해볼 한국어 haebol.com | 다국어로 배우는 쉬운 한국어
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
