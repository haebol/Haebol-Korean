import React from 'react';
import { VocabularyItem, SupportedLanguage, getLanguageMeta } from '../types';
import { speakKorean, playCutePop } from '../utils/audio';
import { VocabVisual } from './VocabVisual';

export type WorksheetLanguage = SupportedLanguage | 'all';

export interface PrintableWordWorksheetPageProps {
  chapter: { ch: number; circledTitle: string; itemCount?: number };
  items: VocabularyItem[];
  mode: 'writing' | 'quiz';
  selectedLang?: WorksheetLanguage;
  selectedLangs?: SupportedLanguage[];
  interactiveAudio?: boolean;
  className?: string;
}

export const PrintableWordWorksheetPage: React.FC<PrintableWordWorksheetPageProps> = ({
  chapter,
  items,
  mode,
  selectedLang,
  selectedLangs,
  interactiveAudio = true,
  className = ''
}) => {
  // Compute active languages (1 to 3)
  const activeLangs: SupportedLanguage[] = React.useMemo(() => {
    if (selectedLangs && selectedLangs.length > 0) {
      return selectedLangs.slice(0, 3);
    }
    if (selectedLang) {
      if (selectedLang === 'all') return ['en', 'vi'];
      return [selectedLang as SupportedLanguage];
    }
    return ['en', 'vi'];
  }, [selectedLangs, selectedLang]);

  // Compute table column header for the meaning column
  const meaningColumnHeader = React.useMemo(() => {
    if (activeLangs.length === 1) {
      const meta = getLanguageMeta(activeLangs[0]);
      return `${meta.flag} ${meta.fullName}`;
    }
    return `뜻 (${activeLangs.map(code => getLanguageMeta(code).flag).join(' ')})`;
  }, [activeLangs]);

  // 3열 다국어 렌더링: 선택된 1~3개 언어에 따라 자동 최적화 분할 (국기 이모티콘 완벽 병기)
  const renderTranslationCell = (item: VocabularyItem) => {
    if (activeLangs.length === 1) {
      const lMeta = getLanguageMeta(activeLangs[0]);
      const text = (item as any)[lMeta.code] || '';
      return (
        <div className="flex items-center justify-center gap-1.5 px-1 text-slate-900 truncate">
          <span className="text-sm shrink-0">{lMeta.flag}</span>
          <span
            style={{
              fontSize: '1.15rem',
              whiteSpace: 'nowrap',
              lineHeight: 1.2
            }}
            className={`word-single-lang-text inline-block truncate max-w-full font-bold ${lMeta.fontClass || ''}`}
            title={`${lMeta.fullName}: ${text}`}
          >
            {text}
          </span>
        </div>
      );
    }

    return (
      <div className="all-langs-cell w-full h-full flex flex-col justify-evenly divide-y divide-slate-200/90 text-left px-1.5 py-0.5 box-border">
        {activeLangs.map(code => {
          const lMeta = getLanguageMeta(code);
          const text = (item as any)[code] || '';
          return (
            <div
              key={code}
              className={`lang-row flex items-center gap-1 min-h-0 py-0.5 overflow-hidden ${lMeta.fontClass || ''}`}
            >
              <span
                className={`lang-tag text-[7.5px] font-black ${lMeta.tagColor.text} ${lMeta.tagColor.bg} px-1 py-0.2 rounded shrink-0 select-none border ${lMeta.tagColor.border} leading-none flex items-center gap-0.5`}
              >
                <span>{lMeta.flag}</span>
                <span>{lMeta.singleChar}</span>
              </span>
              <span
                className={`lang-text font-bold text-slate-900 truncate leading-tight ${
                  activeLangs.length === 2 ? 'text-[10px] sm:text-[10.5px]' : 'text-[9.5px] sm:text-[10px]'
                }`}
                title={`${lMeta.fullName}: ${text}`}
              >
                {text}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const currentItems = items.slice(0, 10);

  return (
    <div
      className={`print-sheet printable-word-sheet w-full max-w-[1040px] bg-white rounded-xl border-2 border-slate-300 p-2 sm:p-3 text-slate-800 flex flex-col justify-between shadow-lg ${className}`}
      style={{ minHeight: '620px' }}
    >
      {/* 1. Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-1 border-b-2 border-slate-700 pb-1 mb-1 text-slate-900 shrink-0">
        <div className="flex items-center gap-1.5 font-black text-xs sm:text-sm font-korean-gothic min-w-0">
          <span className="text-base leading-none shrink-0">🥟</span>
          <span className="break-keep">
            {mode === 'writing'
              ? `해볼한국어 [쓰기학습지] ${chapter.circledTitle}`
              : `해볼한국어 [테스트지] ${chapter.circledTitle}`}
          </span>
        </div>
        <div className="text-[10.5px] sm:text-[11.5px] font-bold text-slate-700 flex flex-wrap items-center gap-2 sm:gap-5 font-korean-gothic shrink-0">
          {mode === 'quiz' ? (
            <>
              <span>학년: ________</span>
              <span>이름: ________________</span>
              <span>점수: ____ / 10</span>
            </>
          ) : (
            <>
              <span>학년: ________</span>
              <span>이름: ________________</span>
            </>
          )}
        </div>
      </div>

      {/* 2. Main 6×11 Table */}
      <table className="word-table w-full border-collapse border border-slate-700 bg-white">
        <thead>
          <tr className="bg-slate-100 text-slate-900 font-extrabold text-[11px] sm:text-xs font-korean-gothic border-b-[1.5px] border-slate-700">
            {mode === 'writing' ? (
              <>
                <th style={{ width: '4%', border: '1.5px solid #374151' }} className="py-1">번호</th>
                <th style={{ width: '7%', border: '1.5px solid #374151' }} className="py-1">그림</th>
                <th style={{ width: '15%', border: '1.5px solid #374151' }} className="py-1">
                  {meaningColumnHeader}
                </th>
                <th style={{ width: '24.6%', border: '1.5px solid #374151' }} className="py-1">[1] 따라 읽기</th>
                <th style={{ width: '24.6%', border: '1.5px solid #374151' }} className="py-1">[2] 따라 쓰기</th>
                <th style={{ width: '24.8%', border: '1.5px solid #374151' }} className="py-1">[3] 스스로 쓰기</th>
              </>
            ) : (
              <>
                <th style={{ width: '4%', border: '1.5px solid #374151' }} className="py-1">번호</th>
                <th style={{ width: '7%', border: '1.5px solid #374151' }} className="py-1">그림</th>
                <th style={{ width: '30%', border: '1.5px solid #374151' }} className="py-1">
                  {meaningColumnHeader}
                </th>
                <th colSpan={3} style={{ width: '59%', border: '1.5px solid #374151' }} className="py-1">한국어 (Korean)</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, idx) => (
            <tr
              key={`${item.ch}-${item.ko}-${idx}`}
              onClick={() => {
                if (interactiveAudio) {
                  playCutePop();
                  speakKorean(item.ko, 0.85);
                }
              }}
              className={`border-b-[1.5px] border-slate-700 transition-colors ${
                interactiveAudio ? 'cursor-pointer hover:bg-indigo-50/40' : ''
              }`}
              title={interactiveAudio ? `클릭하여 발음 듣기: "${item.ko}"` : undefined}
            >
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
                    className="text-center align-middle p-0.5"
                  >
                    <div className="flex items-center justify-center min-h-[30px]">
                      <VocabVisual item={item} size="sm" />
                    </div>
                  </td>

                  {/* ③ 번역 언어 (15%) */}
                  <td
                    style={{ width: '15%', border: '1.5px solid #374151' }}
                    className={`text-center align-middle ${activeLangs.length > 1 ? 'p-0' : 'px-1'}`}
                  >
                    {renderTranslationCell(item)}
                  </td>

                  {/* ④ [1] 기준 글자 (24.6%) */}
                  <td
                    style={{ width: '24.6%', border: '1.5px solid #374151' }}
                    className="text-left align-middle p-0"
                  >
                    <div className="word-trace-row relative w-full h-full min-h-[42px] sm:min-h-[50px] flex items-center justify-start pl-1 sm:pl-3.5 md:pl-4">
                      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300 pointer-events-none" />
                      <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300 pointer-events-none" />
                      <span
                        className="word-trace-text relative z-10 leading-none select-none font-normal font-kyobo whitespace-nowrap"
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
                    className="text-left align-middle p-0"
                  >
                    <div className="word-trace-row relative w-full h-full min-h-[42px] sm:min-h-[50px] flex items-center justify-start pl-1 sm:pl-3.5 md:pl-4">
                      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-slate-300 pointer-events-none" />
                      <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-slate-300 pointer-events-none" />
                      <span
                        className="word-trace-text relative z-10 leading-none select-none font-normal font-kyobo whitespace-nowrap"
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
                    className="text-center align-middle p-0.5"
                  >
                    <div className="flex items-center justify-center min-h-[30px]">
                      <VocabVisual item={item} size="sm" />
                    </div>
                  </td>

                  {/* ③ 번역 언어 (30% - 두 배로 확대) */}
                  <td
                    style={{ width: '30%', border: '1.5px solid #374151' }}
                    className={`text-center align-middle ${activeLangs.length > 1 ? 'p-0' : 'px-1'}`}
                  >
                    {renderTranslationCell(item)}
                  </td>

                  {/* ④ 한국어 (Korean) 쓰기 정답란 (59% - 뜻 확대분만큼 축소) - 초등 저학년 10칸공책 형식 */}
                  <td
                    colSpan={3}
                    style={{ width: '59%', border: '1.5px solid #374151' }}
                    className="text-left align-middle p-1 bg-white"
                  >
                    <div className="word-quiz-boxes-row w-full flex items-center justify-start pl-0.5 sm:pl-3.5 print:pl-4">
                      <div className="word-quiz-boxes inline-flex w-full sm:w-auto max-w-full border border-slate-400 rounded-xs overflow-hidden shadow-2xs">
                        {Array.from({ length: 10 }, (_, boxIdx) => (
                          <div
                            key={`quiz-box-${boxIdx}`}
                            className="word-quiz-box relative aspect-square flex-1 sm:flex-none min-w-0 sm:w-[36px] md:w-[40px] sm:h-[36px] md:h-[40px] print:w-[40px] print:h-[40px] border-r border-slate-400 last:border-r-0 bg-white flex items-center justify-center"
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

      {/* 3. Sheet Footer */}
      <div className="mt-1 pt-0.5 border-t border-slate-300 flex items-center justify-between text-[9px] sm:text-[9.5px] text-slate-500 font-korean-gothic">
        <span className="font-medium">
          해볼한국어 haebol.com | 다국어로 배우는 쉬운 한국어
        </span>
      </div>
    </div>
  );
};
