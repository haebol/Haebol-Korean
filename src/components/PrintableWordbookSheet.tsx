import React from 'react';
import { VocabularyItem, SupportedLanguage, getLanguageMeta } from '../types';
import { speakKorean, playCutePop } from '../utils/audio';

export interface PrintableWordbookSheetProps {
  items: VocabularyItem[];
  pageIndex: number; // 0-based sheet index
  totalPages: number;
  startNumber: number;
  selectedLang: SupportedLanguage;
  columnsCount?: number; // 4 columns for A4 landscape 150-word sheets (38/38/37/37)
  sheetTitle?: string;
  interactiveAudio?: boolean;
  className?: string;
}

export const PrintableWordbookSheet: React.FC<PrintableWordbookSheetProps> = ({
  items = [],
  pageIndex = 0,
  totalPages = 4,
  startNumber = 1,
  selectedLang = 'en',
  columnsCount = 4,
  sheetTitle,
  interactiveAudio = true,
  className = ''
}) => {
  const safeLang: SupportedLanguage = (selectedLang as SupportedLanguage) || 'en';
  const langMeta = getLanguageMeta(safeLang) || getLanguageMeta('en');
  const safeItems = items || [];

  const getTranslation = (item: VocabularyItem) => {
    if (!item) return '';
    return (item as any)[safeLang] || item.en || '';
  };

  const getLangName = () => langMeta?.fullName || 'English';

  const getLangHeader = () => `${langMeta?.flag || '🌐'} ${langMeta?.labelKo || '영어'}`;

  const handleWordClick = (word: string) => {
    if (!interactiveAudio || !word) return;
    playCutePop();
    speakKorean(word, 0.85);
  };

  // Evenly balance items across columns (e.g. 150 / 4 -> 38, 38, 37, 37)
  const totalItems = safeItems.length;
  const colCount = Math.max(1, columnsCount);
  const basePerCol = Math.floor(totalItems / colCount);
  const remainder = totalItems % colCount;
  const maxItemsInCol = basePerCol + (remainder > 0 ? 1 : 0);
  const columns: { list: VocabularyItem[]; offset: number }[] = [];

  let cursor = 0;
  for (let c = 0; c < colCount; c++) {
    const count = basePerCol + (c < remainder ? 1 : 0);
    if (count > 0 && cursor < totalItems) {
      columns.push({
        list: safeItems.slice(cursor, cursor + count),
        offset: startNumber + cursor,
      });
      cursor += count;
    }
  }

  const isUltraCompact = totalPages === 1;
  const isDense38 = !isUltraCompact && maxItemsInCol >= 34;

  const resolvedTitle =
    sheetTitle ||
    (totalPages === 4
      ? pageIndex === 0
        ? '① 교실한국어 (1~150번 · 1~15단원)'
        : pageIndex === 1
        ? '② 교실한국어 (151~300번 · 16~30단원)'
        : pageIndex === 2
        ? '③ 용언 활용 (1~30단원 · 150단어)'
        : '④ 조사 결합 (1~30단원 · 150단어)'
      : totalPages === 1
      ? `① ${totalItems}개 (전체)`
      : pageIndex === 0
      ? '① 앞부분'
      : '② 뒷부분');

  return (
    <div
      className={`print-sheet printable-word-sheet printable-wordbook-page w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 p-2 sm:p-2.5 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '700px' }}
    >
      {/* 1. Header Row */}
      <div className="flex flex-nowrap items-center justify-between gap-2 border-b-2 border-slate-700 pb-1 mb-1.5 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-xs sm:text-[13px] font-korean-gothic min-w-0 flex-1 overflow-hidden">
          <span className="text-base leading-none shrink-0">📖</span>
          <span className="whitespace-nowrap">
            해볼한국어 [단어장] {resolvedTitle}
          </span>
          <span className="text-xs text-slate-500 font-bold ml-1 whitespace-nowrap shrink-0">
            · {getLangName()} ({colCount}열)
          </span>
        </div>
        <div className="text-[10px] sm:text-[10.5px] font-bold text-slate-700 flex flex-nowrap items-center gap-3 sm:gap-4 font-korean-gothic whitespace-nowrap shrink-0">
          <span className="whitespace-nowrap">학년: ______</span>
          <span className="whitespace-nowrap">이름: ____________</span>
        </div>
      </div>

      {/* 2. Main 4-Column A4 Landscape Wordbook Grid (Explicit inline columns so screen/PDF/PNG/print match 100%) */}
      <div
        className="wb-columns-grid w-full flex-1 grid gap-1.5 overflow-hidden items-stretch"
        style={{
          ['--wb-cols' as any]: columns.length,
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((col, colIdx) => (
          <div
            key={`wb-col-${colIdx}`}
            className="flex flex-col border-[1.5px] border-slate-700 rounded-md overflow-hidden bg-white min-w-0"
          >
            <table className="wordbook-table w-full h-full border-collapse table-fixed text-center">
              <thead>
                <tr className="bg-slate-100 border-b-[1.5px] border-slate-700 font-black text-slate-900 font-korean-gothic">
                  <th
                    style={{
                      width: '43%',
                      borderRight: '1.5px solid #374151',
                      padding: isUltraCompact ? '1px 2px' : isDense38 ? '1.5px 3px' : '2px 4px',
                      fontSize: isUltraCompact ? '8.5px' : isDense38 ? '9.5px' : '10.5px'
                    }}
                  >
                    한글
                  </th>
                  <th
                    style={{
                      width: '57%',
                      padding: isUltraCompact ? '1px 2px' : isDense38 ? '1.5px 3px' : '2px 4px',
                      fontSize: isUltraCompact ? '8.5px' : isDense38 ? '9.5px' : '10.5px'
                    }}
                  >
                    {getLangHeader()}
                  </th>
                </tr>
              </thead>
              <tbody>
                {col.list.map((item, itemIdx) => {
                  const translation = getTranslation(item);
                  const rowNum = col.offset + itemIdx;
                  return (
                    <tr
                      key={`wb-row-${item.ch}-${item.ko}-${itemIdx}`}
                      className="border-b border-slate-300 last:border-b-0 odd:bg-white even:bg-slate-50/55 hover:bg-amber-50/60 transition-colors"
                    >
                      {/* Left: 번호 + 한글 */}
                      <td
                        style={{
                          width: '43%',
                          borderRight: '1.5px solid #cbd5e1',
                          padding: isUltraCompact ? '0.5px 2px' : isDense38 ? '1px 3px' : '1.5px 4px'
                        }}
                        className={`text-left align-middle ${interactiveAudio ? 'cursor-pointer hover:text-emerald-700' : ''}`}
                        onClick={() => handleWordClick(item.ko)}
                        title={interactiveAudio ? `소리 듣기: ${item.ko}` : undefined}
                      >
                        <div className="flex items-baseline gap-1 min-w-0">
                          <span className="text-[7.5px] font-bold text-slate-400 tabular-nums shrink-0 w-3.5 text-right leading-none">
                            {rowNum}
                          </span>
                          <span
                            className="font-black text-slate-950 font-korean-gothic whitespace-nowrap block truncate leading-[1.15] min-w-0"
                            style={{
                              fontSize: isUltraCompact
                                ? (item.ko.length > 7 ? '8px' : '9px')
                                : isDense38
                                ? (item.ko.length > 7 ? '8.5px' : '9.5px')
                                : (item.ko.length > 8 ? '9.5px' : '10.5px')
                            }}
                          >
                            {item.ko}
                          </span>
                        </div>
                      </td>

                      {/* Right: 선택된 언어 번역 */}
                      <td
                        style={{
                          width: '57%',
                          padding: isUltraCompact ? '0.5px 2px' : isDense38 ? '1px 3px' : '1.5px 4px'
                        }}
                        className="text-left align-middle"
                      >
                        <span
                          className={`font-semibold text-slate-800 truncate block leading-[1.15] ${
                            selectedLang === 'bn' ? "font-['Noto_Sans_Bengali',sans-serif]" : ''
                          }`}
                          style={{
                            fontSize: isUltraCompact
                              ? (translation.length > 14 ? '7.5px' : '8.5px')
                              : isDense38
                              ? (translation.length > 18 ? '8px' : '9px')
                              : (translation.length > 16 ? '9px' : '10px')
                          }}
                          title={translation}
                        >
                          {translation}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {/* Pad short columns (37 vs 38) with clean empty row so all 4 column borders align evenly */}
                {col.list.length < maxItemsInCol &&
                  Array.from({ length: maxItemsInCol - col.list.length }).map((_, padIdx) => (
                    <tr key={`wb-pad-${colIdx}-${padIdx}`} className="border-b border-slate-200 last:border-b-0 bg-slate-50/30">
                      <td style={{ width: '43%', borderRight: '1.5px solid #cbd5e1', padding: '1px 3px' }}>&nbsp;</td>
                      <td style={{ width: '57%', padding: '1px 3px' }}>&nbsp;</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* 3. Sheet Footer */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] text-slate-500 font-korean-gothic shrink-0">
        <span className="font-medium">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
        <span className="font-bold text-slate-400">
          A4 가로 {colCount}열 압축 단어장 ({pageIndex + 1}/{totalPages}쪽 · {totalItems}단어)
        </span>
      </div>
    </div>
  );
};
