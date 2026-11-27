import React, { useState } from 'react';
import { Layers, FileText, Gamepad2, Check } from 'lucide-react';
import {
  LearningTrack,
  LearningMethod,
} from '../types';
import {
  UiLanguage,
  UI_LANGUAGES,
  getUiLanguageMeta,
  HEADER_UI,
  NAV_UI,
  MENU_EXTRAS_UI,
} from '../i18n/uiTranslations';
import { playCutePop } from '../utils/audio';

interface MainLearningNavProps {
  activeTrack: LearningTrack;
  onSelectTrack: (track: LearningTrack) => void;
  activeMethod: LearningMethod;
  onSelectMethod: (method: LearningMethod) => void;
  currentLang: UiLanguage;
  onLanguageChange?: (lang: UiLanguage) => void;
  onOpenStickmanBonus?: () => void;
}

export const MainLearningNav: React.FC<MainLearningNavProps> = ({
  activeTrack,
  onSelectTrack,
  activeMethod,
  onSelectMethod,
  currentLang,
  onLanguageChange,
  onOpenStickmanBonus,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const isKo = currentLang === 'ko';
  const activeUi = NAV_UI[currentLang] || NAV_UI.ko;
  const headerUi = HEADER_UI[currentLang] || HEADER_UI.ko;
  const selectedLangObj = getUiLanguageMeta(currentLang);
  const stickmanTitle = (MENU_EXTRAS_UI[currentLang] || MENU_EXTRAS_UI.ko).stickman.modalTitle;
  const koUi = NAV_UI.ko;
  const enUi = NAV_UI.en;

  const trackPrimary = activeUi.tracks;
  const methodPrimary = activeUi.methods;
  const methodSub = isKo ? enUi.methods : koUi.methods;

  const mainTrackItems: {
    id: LearningTrack;
    ko: string;
    koDesc: string;
    activeClass: string;
    inactiveClass: string;
    underlineClass: string;
  }[] = [
    {
      id: 'hangeul',
      ko: trackPrimary.hangeul,
      koDesc: koUi.tracks.hangeul,
      activeClass: 'text-amber-700 font-black bg-amber-50/55',
      inactiveClass: 'text-slate-700 hover:text-amber-800 hover:bg-amber-50/25 font-bold',
      underlineClass: 'bg-amber-400',
    },
    {
      id: 'classroom',
      ko: trackPrimary.classroom,
      koDesc: koUi.tracks.classroom,
      activeClass: 'text-[#D94A6B] font-black bg-rose-50/55',
      inactiveClass: 'text-slate-700 hover:text-[#D94A6B] hover:bg-rose-50/25 font-bold',
      underlineClass: 'bg-[#D94A6B]',
    },
    {
      id: 'verb',
      ko: trackPrimary.verb,
      koDesc: koUi.tracks.verb,
      activeClass: 'text-[#7E22CE] font-black bg-purple-50/55',
      inactiveClass: 'text-slate-700 hover:text-[#7E22CE] hover:bg-purple-50/25 font-bold',
      underlineClass: 'bg-[#7E22CE]',
    },
    {
      id: 'particle',
      ko: trackPrimary.particle,
      koDesc: koUi.tracks.particle,
      activeClass: 'text-[#214A1C] font-black bg-[#E9F5E4]/80',
      inactiveClass: 'text-slate-700 hover:text-[#357A2C] hover:bg-[#F3FAF0]/60 font-bold',
      underlineClass: 'bg-[#69B35C]',
    },
  ];

  const methodItems: {
    id: LearningMethod;
    ko: string;
    sub: string;
    Icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'flashcard', ko: methodPrimary.flashcard, sub: methodSub.flashcard, Icon: Layers },
    { id: 'worksheet', ko: methodPrimary.study, sub: methodSub.study, Icon: FileText },
    { id: 'game', ko: methodPrimary.games, sub: methodSub.games, Icon: Gamepad2 },
  ];

  return (
    <div className={`lg:hidden sticky top-0 ${isLangOpen ? 'z-50' : 'z-30'} w-full bg-[#F4F5F7]/95 backdrop-blur-md no-print select-none font-korean-gothic`}>
      {/* Mobile Row 2 (Top-Level Mode Switcher): [플래시카드 | 학습지 | 게임] + [🌐 Flag] */}
      <nav aria-label="학습 방법 선택" className="border-b border-[#5B2399]/35 bg-[#4A1C80]">
        <div className="flex items-center w-full h-[32px] sm:h-[36px] gap-1 sm:gap-2 px-1.5 sm:px-3 py-1">
          <div className="flex-1 grid grid-cols-3 h-full gap-1 sm:gap-1.5 min-w-0">
            {methodItems.map(({ id, ko, sub, Icon }) => {
              const isActive = activeMethod === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    playCutePop();
                    onSelectMethod(id);
                  }}
                  className={`h-full px-1 sm:px-2.5 rounded-sm transition-colors cursor-pointer text-center flex items-center justify-center gap-1 leading-none min-w-0 overflow-hidden ${
                    isActive
                      ? 'bg-white text-[#3B1566] font-black shadow-2xs'
                      : 'bg-transparent text-purple-100 hover:bg-white/12 hover:text-white font-bold'
                  }`}
                  title={`${ko} (${sub})`}
                >
                  <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? 'text-[#3B1566]' : 'text-purple-200'}`} />
                  <span className="text-[11px] xs:text-[11.5px] sm:text-[13.5px] leading-none truncate">
                    {ko}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Ultra-Compact Language Selector (Globe + Flag only) right of Game tab */}
          {onLanguageChange && (
            <div className="relative h-full shrink-0 pl-1 border-l border-white/20">
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setIsLangOpen((prev) => !prev);
                }}
                className="h-full px-1.5 sm:px-2 rounded-sm bg-[#34115C] hover:bg-[#290D4A] active:scale-[0.98] text-white border border-purple-300/40 flex items-center justify-center gap-1 transition-all focus:outline-none cursor-pointer whitespace-nowrap"
                aria-label={`${headerUi.myLangTitle} (${selectedLangObj.nativeName})`}
                aria-expanded={isLangOpen}
                title={`${headerUi.myLangTitle} · ${selectedLangObj.nativeName}`}
              >
                <span className="text-[12px] sm:text-[13px] leading-none shrink-0" role="img" aria-label="Globe">🌐</span>
                <span className="text-[12px] sm:text-[13px] leading-none shrink-0">{selectedLangObj.flag}</span>
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-1.5 w-[270px] sm:w-[320px] bg-white rounded-xl shadow-2xl border-2 border-[#441A75]/25 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 text-slate-800">
                    <div className="px-3.5 py-1 text-[11px] font-black text-purple-950 border-b border-purple-100 mb-1 flex items-center justify-between">
                      <span>{headerUi.dropdownHeader}</span>
                      <span className="text-[10px] text-purple-600 font-medium">{headerUi.langCountBadge}</span>
                    </div>
                    <div className="max-h-[360px] overflow-y-auto">
                      {UI_LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            playCutePop();
                            onLanguageChange(lang.code);
                            setIsLangOpen(false);
                          }}
                          className={`w-full h-9 px-3.5 text-left flex items-center justify-between hover:bg-purple-50 text-xs transition-colors cursor-pointer ${
                            currentLang === lang.code
                              ? 'bg-purple-100/70 text-purple-950 font-black'
                              : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{lang.flag}</span>
                            <span className="font-bold">{lang.fullName}</span>
                          </div>
                          {currentLang === lang.code ? (
                            <Check className="w-4 h-4 text-purple-700" />
                          ) : (
                            <span className="text-[11px] text-slate-400 font-medium">{lang.nativeName}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Row 2: 4 Main Tracks (+ compact 시험/놀이 appendix ONLY in 학습지 mode) */}
      <nav aria-label="학습 영역 선택" className="border-b border-pink-200/80 bg-white relative">
        <div className="flex items-stretch w-full h-[34px] sm:h-[38px] px-1 sm:px-3 pr-6 sm:pr-8 gap-1">
          <div className="flex-1 grid grid-cols-4 min-w-0">
            {mainTrackItems.map(item => {
              const isActive = activeTrack === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    playCutePop();
                    onSelectTrack(item.id);
                  }}
                  className={`relative py-0.5 px-0.5 sm:px-1.5 rounded-none transition-colors cursor-pointer text-center flex items-center justify-center leading-none min-w-0 overflow-hidden ${
                    isActive ? item.activeClass : item.inactiveClass
                  }`}
                  title={`${item.ko} · ${item.koDesc}`}
                >
                  <span className="text-[11px] xs:text-[12px] sm:text-[14px] leading-none truncate w-full tracking-tight">
                    {item.ko}
                  </span>
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-1 right-1 sm:left-3 sm:right-3 h-[2.5px] ${item.underlineClass}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stationary Waving Stickman at the far right */}
        {onOpenStickmanBonus && (
          <button
            type="button"
            onClick={() => {
              playCutePop();
              onOpenStickmanBonus();
            }}
            className="absolute right-0.5 sm:right-2.5 bottom-0 z-20 p-0 m-0 bg-transparent border-0 cursor-pointer focus:outline-none transition-transform hover:scale-110 active:scale-95"
            title={stickmanTitle}
            aria-label={stickmanTitle}
          >
            <svg
              viewBox="-26 -60 52 114"
              className="w-[16px] h-[27px] sm:w-[19px] sm:h-[31px] block"
              aria-hidden="true"
            >
              <circle cx="0" cy="-38" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <circle cx="-6" cy="-41" r="2.5" fill="#0F172A" />
              <circle cx="6" cy="-41" r="2.5" fill="#0F172A" />
              <path
                d="M-6 -32 Q0 -26 6 -32"
                fill="none"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line x1="0" y1="-20" x2="0" y2="16" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="0" y1="-10" x2="-16" y2="6" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <g transform="translate(0, -10)">
                <g className="stickman-arm-wave">
                  <line x1="0" y1="0" x2="0" y2="23" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
                </g>
              </g>
              <line x1="0" y1="16" x2="-11" y2="48" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="0" y1="16" x2="11" y2="48" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </nav>
    </div>
  );
};
