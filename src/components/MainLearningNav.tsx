import React from 'react';
import { Layers, FileText, Gamepad2 } from 'lucide-react';
import {
  LearningTrack,
  LearningMethod,
} from '../types';
import { UiLanguage, NAV_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { playCutePop } from '../utils/audio';

interface MainLearningNavProps {
  activeTrack: LearningTrack;
  onSelectTrack: (track: LearningTrack) => void;
  activeMethod: LearningMethod;
  onSelectMethod: (method: LearningMethod) => void;
  currentLang: UiLanguage;
  onOpenStickmanBonus?: () => void;
}

export const MainLearningNav: React.FC<MainLearningNavProps> = ({
  activeTrack,
  onSelectTrack,
  activeMethod,
  onSelectMethod,
  currentLang,
  onOpenStickmanBonus,
}) => {
  const isKo = currentLang === 'ko';
  const activeUi = NAV_UI[currentLang] || NAV_UI.ko;
  const stickmanTitle = (MENU_EXTRAS_UI[currentLang] || MENU_EXTRAS_UI.ko).stickman.modalTitle;
  const koUi = NAV_UI.ko;
  const enUi = NAV_UI.en;

  const trackPrimary = activeUi.tracks;
  const trackSub = isKo ? enUi.tracks : koUi.tracks;
  const methodPrimary = activeUi.methods;
  const methodSub = isKo ? enUi.methods : koUi.methods;

  const trackItems: {
    id: LearningTrack;
    ko: string;
    koDesc: string;
    sub: string;
    activeClass: string;
    inactiveClass: string;
    subActiveClass: string;
    subInactiveClass: string;
    underlineClass: string;
  }[] = [
    {
      id: 'hangeul',
      ko: trackPrimary.hangeul,
      koDesc: koUi.tracks.hangeul,
      sub: trackSub.hangeul,
      activeClass: 'text-amber-700 font-black bg-amber-50/45',
      inactiveClass: 'text-slate-700 hover:text-amber-800 hover:bg-amber-50/25 font-bold',
      subActiveClass: 'text-amber-600 font-extrabold',
      subInactiveClass: 'text-slate-400 font-semibold',
      underlineClass: 'bg-amber-400',
    },
    {
      id: 'classroom',
      ko: trackPrimary.classroom,
      koDesc: koUi.tracks.classroom,
      sub: trackSub.classroom,
      activeClass: 'text-[#D94A6B] font-black bg-rose-50/45',
      inactiveClass: 'text-slate-700 hover:text-[#D94A6B] hover:bg-rose-50/25 font-bold',
      subActiveClass: 'text-[#D94A6B]/90 font-bold',
      subInactiveClass: 'text-slate-400 font-semibold',
      underlineClass: 'bg-[#D94A6B]',
    },
    {
      id: 'verb',
      ko: trackPrimary.verb,
      koDesc: koUi.tracks.verb,
      sub: trackSub.verb,
      activeClass: 'text-[#7E22CE] font-black bg-purple-50/45',
      inactiveClass: 'text-slate-700 hover:text-[#7E22CE] hover:bg-purple-50/25 font-bold',
      subActiveClass: 'text-[#7E22CE]/90 font-bold',
      subInactiveClass: 'text-slate-400 font-semibold',
      underlineClass: 'bg-[#7E22CE]',
    },
    {
      id: 'particle',
      ko: trackPrimary.particle,
      koDesc: koUi.tracks.particle,
      sub: trackSub.particle,
      activeClass: 'text-emerald-950 font-black bg-emerald-50/80',
      inactiveClass: 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/40 font-bold',
      subActiveClass: 'text-emerald-700/90 font-bold',
      subInactiveClass: 'text-slate-400 font-semibold',
      underlineClass: 'bg-emerald-500',
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

  const getMethodActiveStyles = () => {
    if (activeTrack === 'hangeul') {
      return {
        barBg: 'bg-[#FFFDF5]/95 border-amber-200/80',
        activeBtn: 'bg-amber-200 text-amber-950 font-black border border-amber-400 shadow-2xs',
        inactiveBtn: 'bg-transparent text-slate-600 hover:text-amber-900 hover:bg-amber-100/50 border border-transparent font-bold',
        activeSub: 'text-amber-900 font-extrabold',
        inactiveSub: 'text-slate-400 font-semibold',
        iconActive: 'text-amber-950',
        iconInactive: 'text-slate-400',
      };
    }
    if (activeTrack === 'classroom') {
      return {
        barBg: 'bg-[#FFF9FB]/95 border-rose-200/80',
        activeBtn: 'bg-[#D94A6B] text-white font-black border border-[#C03A59] shadow-2xs',
        inactiveBtn: 'bg-transparent text-slate-600 hover:text-rose-900 hover:bg-rose-100/50 border border-transparent font-bold',
        activeSub: 'text-pink-100 font-bold',
        inactiveSub: 'text-slate-400 font-semibold',
        iconActive: 'text-white',
        iconInactive: 'text-slate-400',
      };
    }
    if (activeTrack === 'particle') {
      return {
        barBg: 'bg-emerald-50/95 border-emerald-200',
        activeBtn: 'bg-emerald-600 text-white font-black border border-emerald-700 shadow-2xs',
        inactiveBtn: 'bg-transparent text-slate-600 hover:text-emerald-950 hover:bg-emerald-100/70 border border-transparent font-bold',
        activeSub: 'text-emerald-100 font-bold',
        inactiveSub: 'text-slate-400 font-semibold',
        iconActive: 'text-white',
        iconInactive: 'text-slate-400',
      };
    }
    return {
      barBg: 'bg-[#FAF7FF]/95 border-purple-200/80',
      activeBtn: 'bg-[#7E22CE] text-white font-black border border-[#6B21A8] shadow-2xs',
      inactiveBtn: 'bg-transparent text-slate-600 hover:text-purple-900 hover:bg-purple-100/50 border border-transparent font-bold',
      activeSub: 'text-purple-100 font-bold',
      inactiveSub: 'text-slate-400 font-semibold',
      iconActive: 'text-white',
      iconInactive: 'text-slate-400',
    };
  };

  const mStyles = getMethodActiveStyles();

  return (
    <div className="lg:hidden sticky top-0 z-30 w-full bg-[#FFF5F8]/95 backdrop-blur-md no-print select-none font-korean-gothic">
      {/* Row 3 (Tier 1 Top Navigation): 4-Track Underline Text Tabs — Light Pink Surface */}
      <nav aria-label="학습 영역 선택" className="border-b border-pink-200/80 bg-[#FFF5F8] relative">
        <div className="grid grid-cols-4 w-full h-[44px] sm:h-[48px] px-0.5 sm:px-3">
          {trackItems.map(item => {
            const isActive = activeTrack === item.id;
            const hasRightMascot = item.id === 'particle' && Boolean(onOpenStickmanBonus);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  playCutePop();
                  onSelectTrack(item.id);
                }}
                className={`relative py-1 px-0.5 sm:px-2 rounded-none transition-colors cursor-pointer text-center flex flex-col items-center justify-center leading-none min-w-0 overflow-hidden ${
                  hasRightMascot ? 'pr-5 sm:pr-7' : ''
                } ${isActive ? item.activeClass : item.inactiveClass}`}
                title={`${item.ko} · ${item.koDesc} (${item.sub})`}
              >
                <span className="text-[12px] xs:text-[13.5px] sm:text-base md:text-[17px] leading-tight truncate w-full tracking-tight">
                  {item.ko}
                </span>
                <span
                  className={`text-[8.5px] xs:text-[9.5px] sm:text-[11px] leading-none mt-0.5 truncate w-full tracking-tight ${
                    isActive ? item.subActiveClass : item.subInactiveClass
                  }`}
                >
                  [{item.sub}]
                </span>
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-1.5 right-1.5 sm:left-4 sm:right-4 h-[3px] ${item.underlineClass}`}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 0.8x Stationary Waving Slingshot-Hero Stickman at the far right of the [조사] button */}
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
              className="w-[19px] h-[32px] sm:w-[22px] sm:h-[35px] block"
              aria-hidden="true"
            >
              {/* Head (Slingshot Hero StickmanPlayer shape) */}
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
              {/* Torso */}
              <line x1="0" y1="-20" x2="0" y2="16" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
              {/* Left Arm (resting) */}
              <line x1="0" y1="-10" x2="-16" y2="6" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              {/* Right Arm (gently waving hello) */}
              <g transform="translate(0, -10)">
                <g className="stickman-arm-wave">
                  <line x1="0" y1="0" x2="0" y2="23" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
                </g>
              </g>
              {/* Standing Legs */}
              <line x1="0" y1="16" x2="-11" y2="48" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="0" y1="16" x2="11" y2="48" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </nav>

      {/* Row 4 (Tier 2 Method Switcher): Solid Rectangular Block on Clean Surface */}
      <nav aria-label="학습 방법 선택" className={`border-b ${mStyles.barBg}`}>
        <div className="grid grid-cols-3 w-full h-[34px] sm:h-[40px] gap-1 sm:gap-2 px-1.5 sm:px-3 py-1">
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
                className={`h-full px-1 sm:px-3 rounded-xs transition-colors cursor-pointer text-center flex flex-col sm:flex-row items-center justify-center sm:gap-1.5 leading-none min-w-0 overflow-hidden ${
                  isActive ? mStyles.activeBtn : mStyles.inactiveBtn
                }`}
                title={`${ko} (${sub})`}
              >
                <span className="flex items-center justify-center gap-1 min-w-0 sm:shrink-0">
                  <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? mStyles.iconActive : mStyles.iconInactive}`} />
                  <span className="text-[11px] xs:text-xs sm:text-[13.5px] leading-tight truncate">
                    {ko}
                  </span>
                </span>
                <span
                  className={`text-[7.5px] xs:text-[8.5px] sm:text-[10.5px] leading-none mt-0.5 sm:mt-0 truncate w-full sm:w-auto tracking-tight ${
                    isActive ? mStyles.activeSub : mStyles.inactiveSub
                  }`}
                >
                  [{sub}]
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
