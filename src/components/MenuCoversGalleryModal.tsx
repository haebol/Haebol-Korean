import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { toPng } from 'html-to-image';
import { X, Download, Printer, Image as ImageIcon, Loader2, Check } from 'lucide-react';
import {
  MENU_INTRO_COVERS,
  MenuCoverId,
  MenuCoverMeta,
  MenuIntroCoverSheet,
} from './MenuIntroCoverSheet';
import { playCutePop } from '../utils/audio';
import { getLocalFontEmbedCSS } from './AdminCaptureCards';

interface MenuCoversGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COVER_W = 1122;
const COVER_H = 794;

const ScaledCoverPreview: React.FC<{ cover: MenuCoverMeta }> = ({ cover }) => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.72);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const update = () => {
      const availW = el.clientWidth;
      if (availW > 0) {
        setScale(Math.min(1, availW / COVER_W));
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="w-full relative overflow-hidden mx-auto"
      style={{ height: `${Math.round(COVER_H * scale)}px` }}
    >
      <div
        style={{
          width: `${COVER_W}px`,
          height: `${COVER_H}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <MenuIntroCoverSheet cover={cover} />
      </div>
    </div>
  );
};

export const MenuCoversGalleryContent: React.FC<{ onClose?: () => void; embedded?: boolean }> = ({
  onClose,
  embedded = false,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | MenuCoverId>('all');
  const [downloadingId, setDownloadingId] = useState<'all' | MenuCoverId | null>(null);
  const [downloadedId, setDownloadedId] = useState<MenuCoverId | null>(null);
  const [batchProgress, setBatchProgress] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [printTarget, setPrintTarget] = useState<'all' | MenuCoverId | null>(null);

  const captureRefs = useRef<Record<MenuCoverId, HTMLDivElement | null>>({
    hangeul: null,
    classroom: null,
    verb: null,
    particle: null,
  });

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove('printing-menu-covers');
      setPrintTarget(null);
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('printing-menu-covers');
    };
  }, []);

  const visibleCovers =
    selectedFilter === 'all'
      ? MENU_INTRO_COVERS
      : MENU_INTRO_COVERS.filter((c) => c.id === selectedFilter);

  const coversToPrint =
    printTarget === 'all'
      ? MENU_INTRO_COVERS
      : printTarget
      ? MENU_INTRO_COVERS.filter((c) => c.id === printTarget)
      : [];

  const captureAndDownloadPng = async (cover: MenuCoverMeta) => {
    const node = captureRefs.current[cover.id];
    if (!node) {
      throw new Error('표지 렌더링 노드를 찾을 수 없습니다.');
    }
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    const fontEmbedCSS = await getLocalFontEmbedCSS();
    const dataUrl = await toPng(node, {
      width: COVER_W,
      height: COVER_H,
      pixelRatio: 2.5,
      backgroundColor: cover.palette.canvasBg,
      fontEmbedCSS,
    });

    const link = document.createElement('a');
    link.download = cover.fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSingle = async (cover: MenuCoverMeta) => {
    playCutePop();
    setErrorMessage(null);
    setDownloadingId(cover.id);
    try {
      await captureAndDownloadPng(cover);
      setDownloadedId(cover.id);
      setTimeout(() => {
        setDownloadedId((prev) => (prev === cover.id ? null : prev));
      }, 2200);
    } catch {
      setErrorMessage(
        'PNG 이미지 저장 중 문제가 발생했습니다. 잠시 후 다시 시도하거나 [A4 인쇄 / PDF]를 이용해 주세요.'
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadAll = async () => {
    playCutePop();
    setErrorMessage(null);
    setDownloadingId('all');
    try {
      for (let i = 0; i < MENU_INTRO_COVERS.length; i++) {
        const cover = MENU_INTRO_COVERS[i];
        setBatchProgress(`${i + 1}/${MENU_INTRO_COVERS.length}`);
        await captureAndDownloadPng(cover);
        await new Promise((r) => setTimeout(r, 320));
      }
    } catch {
      setErrorMessage(
        '일괄 PNG 저장 중 일부 파일이 차단되었을 수 있습니다. 브라우저 다중 다운로드 허용 또는 개별 저장을 이용해 주세요.'
      );
    } finally {
      setBatchProgress('');
      setDownloadingId(null);
    }
  };

  const handlePrint = (target: 'all' | MenuCoverId) => {
    playCutePop();
    setErrorMessage(null);
    setPrintTarget(target);
    document.body.classList.add('printing-menu-covers');
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <>
      {/* Isolated Print Rules for Menu Covers */}
      <style>{`
        @media print {
          body.printing-menu-covers > *:not(.menu-covers-print-portal) {
            display: none !important;
          }
          body.printing-menu-covers .menu-covers-print-portal {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
          }
          body.printing-menu-covers .menu-cover-print-page {
            width: 281mm !important;
            height: 194mm !important;
            margin: 0 auto !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            overflow: hidden !important;
          }
          body.printing-menu-covers .menu-cover-print-page:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          body.printing-menu-covers .menu-cover-print-page .menu-cover-sheet {
            width: 281mm !important;
            height: 194mm !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div className={embedded ? 'flex flex-col flex-1 min-h-0 bg-[#F8FAFC]' : 'w-full max-w-6xl max-h-[92vh] bg-[#F8FAFC] rounded-2xl border-2 border-slate-300 shadow-2xl flex flex-col overflow-hidden'}>
          {/* Modal / Subtab Header */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-black text-slate-950 leading-tight truncate">
                  메뉴 소개 표지 자료실 (A4 가로 · 4종)
                </h2>
                <p className="text-xs text-slate-500 font-semibold leading-snug truncate">
                  블로그 대표 이미지 · PPT 타이틀 · 학습지 겉표지용 고화질 PNG 및 A4 인쇄(PDF) 지원
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto shrink-0 flex-wrap">
              <button
                type="button"
                disabled={downloadingId !== null}
                onClick={handleDownloadAll}
                className="h-10 px-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all whitespace-nowrap"
                title="4개 메뉴 표지를 고화질 PNG 파일로 모두 저장"
              >
                {downloadingId === 'all' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    <span>저장 중 {batchProgress}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 shrink-0" />
                    <span>4장 모두 PNG 저장</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handlePrint('all')}
                className="h-10 px-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-black text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all whitespace-nowrap"
                title="4개 메뉴 표지 전체를 A4 가로 PDF/인쇄로 출력"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>전체 A4 인쇄 / PDF</span>
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    onClose();
                  }}
                  className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer active:scale-95 transition-all shrink-0"
                  aria-label="자료실 닫기"
                  title="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Menu Filter Tabs */}
          <div className="px-4 py-2.5 sm:px-6 bg-white border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setSelectedFilter('all');
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-black whitespace-nowrap cursor-pointer transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              전체 4장 보기
            </button>
            {MENU_INTRO_COVERS.map((c) => {
              const isSelected = selectedFilter === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setSelectedFilter(c.id);
                  }}
                  style={
                    isSelected
                      ? { backgroundColor: c.palette.accentHex, color: '#FFFFFF' }
                      : undefined
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-black whitespace-nowrap cursor-pointer transition-colors ${
                    isSelected
                      ? 'shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {c.orderNumber}. {c.titleKo}
                </button>
              );
            })}
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="mx-4 sm:mx-6 mt-3 px-4 py-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm font-bold flex items-center justify-between gap-2 shrink-0">
              <span>{errorMessage}</span>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="text-rose-700 hover:text-rose-950 font-black cursor-pointer shrink-0"
              >
                확인
              </button>
            </div>
          )}

          {/* Scrollable Covers List */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-6">
            {visibleCovers.map((cover) => {
              const isSavingThis = downloadingId === cover.id;
              const isSavedThis = downloadedId === cover.id;
              return (
                <section
                  key={cover.id}
                  className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-5 shadow-xs space-y-3"
                >
                  {/* Card Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-3 h-3 rounded-sm shrink-0"
                        style={{ backgroundColor: cover.palette.accentHex }}
                      />
                      <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
                        {cover.orderNumber}. {cover.titleKo}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
                        · {cover.subtitleEn}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 ml-auto shrink-0">
                      <button
                        type="button"
                        disabled={downloadingId !== null}
                        onClick={() => handleDownloadSingle(cover)}
                        style={{ backgroundColor: cover.palette.accentHex }}
                        className="h-9 px-3 rounded-lg text-white hover:brightness-95 disabled:opacity-60 font-black text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all whitespace-nowrap"
                      >
                        {isSavingThis ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                            <span>PNG 변환 중...</span>
                          </>
                        ) : isSavedThis ? (
                          <>
                            <Check className="w-3.5 h-3.5 shrink-0" />
                            <span>저장 완료!</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5 shrink-0" />
                            <span>PNG 이미지 저장</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePrint(cover.id)}
                        className="h-9 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-black text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all whitespace-nowrap"
                      >
                        <Printer className="w-3.5 h-3.5 shrink-0" />
                        <span>이 표지만 A4 인쇄</span>
                      </button>
                    </div>
                  </div>

                  {/* Responsive A4 Preview */}
                  <ScaledCoverPreview cover={cover} />
                </section>
              );
            })}
          </div>
      </div>

      {/* Off-screen unscaled 1122x794 capture nodes for crisp PNG export */}
      <div
        aria-hidden="true"
        className="no-print fixed top-0 pointer-events-none select-none"
        style={{ left: '-14000px', zIndex: -1 }}
      >
        {MENU_INTRO_COVERS.map((cover) => (
          <div
            key={`capture-${cover.id}`}
            ref={(el) => {
              captureRefs.current[cover.id] = el;
            }}
            style={{ width: `${COVER_W}px`, height: `${COVER_H}px` }}
          >
            <MenuIntroCoverSheet cover={cover} />
          </div>
        ))}
      </div>

      {/* Isolated A4 Landscape Print Portal */}
      {printTarget &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="menu-covers-print-portal hidden print:block">
            {coversToPrint.map((cover) => (
              <div key={`print-${cover.id}`} className="menu-cover-print-page">
                <MenuIntroCoverSheet cover={cover} />
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
};

export const MenuCoversGalleryModal: React.FC<MenuCoversGalleryModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="no-print fixed inset-0 z-[135] flex items-center justify-center p-2 sm:p-5 bg-slate-900/65 backdrop-blur-xs font-korean-gothic"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="메뉴 소개 표지 자료실"
    >
      <div
        className="w-full max-w-6xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <MenuCoversGalleryContent onClose={onClose} />
      </div>
    </div>
  );
};
