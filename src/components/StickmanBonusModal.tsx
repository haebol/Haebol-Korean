import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { StickmanJaeumSim, StickmanLang } from './StickmanJaeumSim';
import { StickmanMoeumSim } from './StickmanMoeumSim';
import { StickmanSsangJaeumSim } from './StickmanSsangJaeumSim';
import { StickmanBokhapMoeumSim } from './StickmanBokhapMoeumSim';
import { StickmanFullscreenContext } from './stickmanShared';
import { UiLanguage, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { playCutePop } from '../utils/audio';

export interface StickmanEpisodeDef {
  id: 'ep1_consonants' | 'ep2_vowels' | 'ep3_double_consonants' | 'ep4_compound_vowels';
  label: string;
  render: (lang: StickmanLang) => React.ReactNode;
}

const STICKMAN_EPISODES: StickmanEpisodeDef[] = [
  {
    id: 'ep1_consonants',
    label: '01. 자음편',
    render: (lang) => <StickmanJaeumSim lang={lang} />,
  },
  {
    id: 'ep2_vowels',
    label: '02. 모음편',
    render: (lang) => <StickmanMoeumSim lang={lang} />,
  },
  {
    id: 'ep3_double_consonants',
    label: '03. 쌍자음편',
    render: (lang) => <StickmanSsangJaeumSim lang={lang} />,
  },
  {
    id: 'ep4_compound_vowels',
    label: '04. 복합모음편',
    render: (lang) => <StickmanBokhapMoeumSim lang={lang} />,
  },
];

interface StickmanBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: StickmanLang;
  uiLang?: UiLanguage;
}

export const StickmanBonusModal: React.FC<StickmanBonusModalProps> = ({
  isOpen,
  onClose,
  lang = 'en' as StickmanLang,
  uiLang = 'ko' as UiLanguage,
}) => {
  const stickmanUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).stickman;
  const [activeEpisodeId, setActiveEpisodeId] = useState<string>(
    STICKMAN_EPISODES[0]?.id || 'ep1_consonants'
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const modalBoxRef = useRef<HTMLDivElement | null>(null);

  const exitNativeFullscreen = useCallback(() => {
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    playCutePop();
    setIsFullscreen((prev) => {
      const next = !prev;
      if (next) {
        modalBoxRef.current?.requestFullscreen?.().catch(() => {
          // Cinema full-viewport fallback stays active even if browser blocks native fullscreen
        });
      } else {
        exitNativeFullscreen();
      }
      return next;
    });
  }, [exitNativeFullscreen]);

  // Sync if user exits native browser fullscreen via browser UI / ESC
  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') return;
    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsFullscreen(false);
      exitNativeFullscreen();
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
          exitNativeFullscreen();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {
          // Ignore cancellation errors
        }
      }
    };
  }, [isOpen, isFullscreen, onClose, exitNativeFullscreen]);

  if (!isOpen) return null;

  const activeEpisode =
    STICKMAN_EPISODES.find((ep) => ep.id === activeEpisodeId) || STICKMAN_EPISODES[0];

  return (
    <StickmanFullscreenContext.Provider value={{ isFullscreen, toggleFullscreen, uiLang }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget && !isFullscreen) {
            onClose();
          }
        }}
        className={`fixed inset-0 z-[120] flex items-center justify-center ${
          isFullscreen
            ? 'p-0 bg-slate-950'
            : 'p-2 sm:p-5 bg-slate-900/65 backdrop-blur-xs'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={stickmanUi.modalTitle}
      >
        <motion.div
          ref={modalBoxRef}
          initial={{ scale: 0.96, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.96, y: 12 }}
          transition={{ duration: 0.16 }}
          className={
            isFullscreen
              ? 'relative w-screen h-[100dvh] bg-slate-950 flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden font-korean-gothic'
              : 'relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col font-korean-gothic'
          }
        >
          {/* Compact Non-Overlapping Modal Header (hidden in Fullscreen cinema mode) */}
          {!isFullscreen && (
            <div className="px-2.5 sm:px-4 py-2 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-2 sticky top-0 z-10">
              <h2 className="hidden sm:block text-base font-black text-slate-900 whitespace-nowrap shrink-0">
                {stickmanUi.modalTitle}
              </h2>

              <div className="flex items-center gap-1.5 flex-1 sm:flex-initial min-w-0 justify-between sm:justify-end">
                <div className="flex items-center gap-1 p-1 bg-slate-200/75 rounded-lg overflow-x-auto no-scrollbar min-w-0 flex-1 sm:flex-initial">
                  {STICKMAN_EPISODES.map((ep) => {
                    const isSelected = ep.id === activeEpisode.id;
                    return (
                      <button
                        key={ep.id}
                        type="button"
                        onClick={() => {
                          playCutePop();
                          setActiveEpisodeId(ep.id);
                        }}
                        className={`min-h-[32px] px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {stickmanUi.episodes[ep.id] || ep.label}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    onClose();
                  }}
                  className="w-9 h-9 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors shrink-0"
                  aria-label={stickmanUi.close}
                  title={stickmanUi.close}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Active Episode Content */}
          <div
            className={
              isFullscreen
                ? 'w-full max-w-[min(100vw,calc((100dvh-56px)*1000/460))] mx-auto flex flex-col justify-center'
                : 'p-2.5 sm:p-4 bg-[#F8FAFC] flex-1'
            }
          >
            {activeEpisode.render(lang)}
          </div>
        </motion.div>
      </motion.div>
    </StickmanFullscreenContext.Provider>
  );
};

export default StickmanBonusModal;
