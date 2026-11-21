import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Printer, X, Download, HelpCircle, Scissors, BookOpen, Check, Layers, FileText } from 'lucide-react';
import { VocabularyItem, SupportedLanguage, getCircledNumber } from '../types';
import { CHAPTER_LIST } from '../data/vocabulary';
import { playCutePop } from '../utils/audio';
import { VocabVisual } from './VocabVisual';

interface PrintA4FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabulary: VocabularyItem[];
  defaultChapter?: number;
  currentLang: SupportedLanguage;
  initialScope?: 'current' | 'all';
}

import { PrintableWorksheetPage } from './PrintableWorksheetPage';

export const PrintA4FlashcardsModal: React.FC<PrintA4FlashcardsModalProps> = ({
  isOpen,
  onClose,
  vocabulary,
  defaultChapter = 0,
  currentLang,
  initialScope = 'current'
}) => {
  const [selectedCh, setSelectedCh] = useState<number>(defaultChapter);
  const [printScope, setPrintScope] = useState<'current' | 'all'>(initialScope);

  // Sync selected chapter & initial scope when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedCh(defaultChapter);
      setPrintScope(initialScope);
    }
  }, [isOpen, defaultChapter, initialScope]);

  const handlePrintCurrent = () => {
    playCutePop();
    setPrintScope('current');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handlePrintAll = () => {
    playCutePop();
    setPrintScope('all');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="print-modal-overlay fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      {/* Printable Sheet Style Injection */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 6mm 8mm;
          }
          html, body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          /* Hide the entire website root during print to eliminate offset and background bleed */
          #root {
            display: none !important;
          }
          /* Hide non-print UI and buttons & reset sticky */
          .top-sticky-menu-box, .sticky, header, nav, aside {
            position: static !important;
            top: auto !important;
          }
          .top-sticky-menu-box, header, nav, footer, button, .no-print {
            display: none !important;
          }
          /* Reset modal wrappers for clean full-width print */
          .print-modal-overlay {
            position: static !important;
            inset: auto !important;
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            backdrop-filter: none !important;
            overflow: visible !important;
            display: block !important;
            width: 100% !important;
            z-index: auto !important;
          }
          .print-modal-card {
            max-width: none !important;
            max-height: none !important;
            width: 100% !important;
            height: auto !important;
            background: transparent !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
            display: block !important;
          }
          .print-preview-container {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
            overflow: visible !important;
            display: block !important;
            width: 100% !important;
          }
          /* Centered, perfectly balanced A4 Landscape worksheet without clipping */
          .printable-a4-page {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 198mm !important;
            min-height: 198mm !important;
            max-height: 198mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            background: #ffffff !important;
            border: 1.5px solid #1e293b !important;
            border-radius: 6px !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
          }
          .printable-a4-page:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .print-card {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Screen Modal Container */}
      <div className="print-modal-card relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden flex flex-col max-h-[94vh] my-auto">
        {/* Modal Top Header */}
        <div className="no-print bg-amber-500 text-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black font-korean-gothic flex items-center gap-1.5 leading-tight">
                플래시카드 A4 가로 프린트 인쇄
              </h2>
              <p className="text-[11px] sm:text-xs text-amber-100 font-medium">
                {printScope === 'all'
                  ? `①~㉚ 전체 ${CHAPTER_LIST.length}개 챕터(${vocabulary.length}단어)를 총 ${CHAPTER_LIST.length}장의 A4 가로 학습지로 일괄 출력합니다 📚`
                  : '한 챕터(10단어)를 A4 한 장에 쏙! 가위선으로 잘라 단어 카드로 활용하세요 ✂️'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playCutePop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Control Bar: Scope Selector Tabs + Chapter Selector + Print Buttons */}
        <div className="no-print bg-amber-50/90 px-4 sm:px-6 py-2.5 border-b border-amber-200 flex flex-wrap items-center justify-between gap-3">
          {/* Scope Toggle: Single Chapter vs All 17 Chapters */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-700 font-korean-gothic whitespace-nowrap">
              인쇄 범위:
            </span>
            <div className="inline-flex bg-amber-200/80 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setPrintScope('current');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer font-korean-gothic ${
                  printScope === 'current'
                    ? 'bg-white text-amber-950 shadow-xs'
                    : 'text-amber-900 hover:text-amber-950'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>현재 챕터 (1장)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setPrintScope('all');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer font-korean-gothic ${
                  printScope === 'all'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-amber-900 hover:text-amber-950'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>전체 0~{CHAPTER_LIST[CHAPTER_LIST.length - 1]?.ch ?? 24} ({CHAPTER_LIST.length}장)</span>
              </button>
            </div>

            {/* Chapter Selector Dropdown (visible when 'current' mode) */}
            {printScope === 'current' && (
              <select
                value={selectedCh}
                onChange={e => {
                  playCutePop();
                  setSelectedCh(Number(e.target.value));
                }}
                className="bg-white border-2 border-amber-300 rounded-xl px-2.5 py-1 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 font-korean-gothic cursor-pointer"
              >
                {CHAPTER_LIST.map(c => (
                  <option key={c.ch} value={c.ch}>
                    {c.icon} {c.circledTitle}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Top Quick Print Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {printScope === 'current' ? (
              <button
                onClick={handlePrintCurrent}
                className="h-9 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-sm active:scale-95 flex items-center gap-1.5 transition-all cursor-pointer font-korean-gothic"
              >
                <Printer className="w-4 h-4" />
                <span>1장씩 인쇄</span>
              </button>
            ) : (
              <button
                onClick={handlePrintAll}
                className="h-9 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 flex items-center gap-1.5 transition-all cursor-pointer font-korean-gothic animate-pulse"
              >
                <Printer className="w-4 h-4" />
                <span>📚 전체인쇄</span>
              </button>
            )}
          </div>
        </div>

        {/* Helpful Teacher/Parent Guide Banner */}
        <div className="no-print bg-emerald-50/90 border-b border-emerald-200 px-4 py-1.5 text-xs text-emerald-900 flex items-center justify-between gap-2 font-korean-gothic">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">💡</span>
            <span className="font-medium">
              인쇄 창에서 <strong>[방향: 가로]</strong>를 선택하여 프린터로 인쇄하세요!
              {printScope === 'all' && (
                <strong className="text-amber-800 ml-1.5 bg-amber-100 px-1.5 py-0.5 rounded">
                  (총 {CHAPTER_LIST.length}장의 A4 가로 학습지로 한 번에 인쇄됩니다)
                </strong>
              )}
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-bold hidden sm:inline">
            ✂️ 점선을 따라 가위로 자르면 10장씩 낱말카드가 완성됩니다
          </span>
        </div>

        {/* Sheet Preview Scroll Container */}
        <div className="print-preview-container flex-1 overflow-y-auto p-2 sm:p-4 bg-slate-100 flex flex-col items-center">
          {printScope === 'current' ? (
            /* Single Chapter View */
            <div className="w-full flex justify-center">
              <PrintableWorksheetPage
                chapter={CHAPTER_LIST.find(c => c.ch === selectedCh) || CHAPTER_LIST[0]}
                items={vocabulary.filter(item => item.ch === selectedCh)}
              />
            </div>
          ) : (
            /* All 17 Chapters Sequential View (0 to 16) */
            <div className="w-full flex flex-col items-center space-y-6">
              <div className="no-print w-full max-w-[990px] bg-amber-100 border border-amber-300 rounded-xl p-2.5 text-xs sm:text-sm text-amber-950 font-medium flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 font-korean-gothic">
                  📚 챕터 ⓪부터 ⑯까지 총 17개 챕터 (170단어) 일괄 인쇄 모드
                </span>
                <span className="text-xs text-amber-800 font-bold">
                  총 17페이지
                </span>
              </div>

              {CHAPTER_LIST.map((chObj, idx) => {
                const items = vocabulary.filter(v => v.ch === chObj.ch);
                return (
                  <div key={chObj.ch} className="w-full flex flex-col items-center">
                    {/* Screen Page Badge (hidden during print) */}
                    <div className="no-print mb-1 px-3 py-0.5 bg-slate-800 text-white text-[11px] font-bold rounded-full shadow-xs flex items-center gap-1.5 font-korean-gothic">
                      <span>📄 페이지 {idx + 1} / 17</span>
                      <span>•</span>
                      <span>{chObj.circledTitle}</span>
                    </div>

                    <PrintableWorksheetPage
                      chapter={chObj}
                      items={items}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="no-print bg-white px-4 sm:px-6 py-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 font-korean-gothic">
          <div className="text-xs text-slate-600">
            {printScope === 'all' ? (
              <span>
                📚 전체 <strong>{vocabulary.length}개</strong> 단어가 <strong>A4 가로 총 {CHAPTER_LIST.length}장</strong>으로 한 번에 인쇄됩니다.
              </span>
            ) : (
              <span>
                현재 <strong>{CHAPTER_LIST.find(c => c.ch === selectedCh)?.circledTitle}</strong> ({CHAPTER_LIST.find(c => c.ch === selectedCh)?.itemCount ?? 10}단어)가 <strong>A4 가로 1장</strong>에 맞춰집니다.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                playCutePop();
                onClose();
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              닫기
            </button>

            {/* If currently viewing single chapter, offer both single print & all print */}
            {printScope === 'current' ? (
              <>
                <button
                  onClick={handlePrintAll}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-colors font-korean-gothic cursor-pointer"
                  title={`전체 ${CHAPTER_LIST.length}개 챕터를 한 번에 인쇄합니다`}
                >
                  <Layers className="w-4 h-4" />
                  <span>전체인쇄</span>
                </button>

                <button
                  onClick={handlePrintCurrent}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-colors font-korean-gothic cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>1장씩 인쇄</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    playCutePop();
                    setPrintScope('current');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm transition-colors font-korean-gothic cursor-pointer"
                >
                  1장만 인쇄 모드로 변경
                </button>

                <button
                  onClick={handlePrintAll}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-black text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-colors font-korean-gothic cursor-pointer animate-pulse"
                >
                  <Printer className="w-4 h-4" />
                  <span>📚 전체 {CHAPTER_LIST.length}장 지금 인쇄</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
