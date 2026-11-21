import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Check,
  Mic,
} from 'lucide-react';
import {
  SupportedLanguage,
  EmergencyCardData,
  LearningTrack,
} from '../types';
import {
  UiLanguage,
  UI_LANGUAGES,
  getUiLanguageMeta,
  HEADER_UI,
  NAV_UI,
  MENU_EXTRAS_UI,
} from '../i18n/uiTranslations';
import { EMERGENCY_CARDS } from '../data/emergency';
import { ManduMascot } from './ManduMascot';
import { playCutePop, playEmergencyAlert, speakKorean } from '../utils/audio';

export const APP_DESCRIPTIONS: Record<SupportedLanguage, string> = {
  en: 'Multicultural Elementary Korean',
  vi: 'Tiếng Hàn Tiểu học Đa văn hóa',
  bn: 'বহুসাংস্কৃতিক প্রাথমিক কোরিয়ান',
  zh: '多元文化小学韩语',
  ru: 'Корейский для начальной школы',
  ja: '多文化・小学校韓国語',
  mn: 'Олон соёлт бага ангийн солонгос хэл'
};

export const USE_YOUR_LANG_SUBTITLES: Record<SupportedLanguage, string> = {
  en: 'Use Your Language',
  vi: 'Sử dụng ngôn ngữ của bạn',
  bn: 'নিজস্ব ভাষায় ব্যবহার করুন',
  zh: '使用我的母语',
  ru: 'Использовать родной язык',
  ja: '母国語で利用する',
  mn: 'Өөрийн хэлээр ашиглах'
};

interface HeaderAndEmergencyBarProps {
  currentLang: SupportedLanguage;
  uiLang?: UiLanguage;
  activeTrack: LearningTrack;
  onSelectTrack: (track: LearningTrack) => void;
  onLanguageChange: (lang: UiLanguage) => void;
  onSelectEmergencyCard?: (card: EmergencyCardData) => void;
  onOpenVoiceModal?: () => void;
  onOpenStickmanBonus?: () => void;
  onOpenTeacherAdmin?: () => void;
  onGoHome?: () => void;
  isMenuCollapsed?: boolean;
  onToggleMenuCollapse?: () => void;
}

export const HeaderAndEmergencyBar: React.FC<HeaderAndEmergencyBarProps> = ({
  currentLang,
  uiLang = 'ko' as UiLanguage,
  activeTrack,
  onSelectTrack,
  onLanguageChange,
  onSelectEmergencyCard,
  onOpenVoiceModal,
  onOpenStickmanBonus,
  onOpenTeacherAdmin,
  onGoHome,
  isMenuCollapsed = false,
  onToggleMenuCollapse,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const singleClickTimerRef = useRef<number | null>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const longPressFiredRef = useRef(false);

  useEffect(() => {
    return () => {
      if (singleClickTimerRef.current) window.clearTimeout(singleClickTimerRef.current);
      if (longPressTimerRef.current) window.clearTimeout(longPressTimerRef.current);
    };
  }, []);

  const selectedLangObj = getUiLanguageMeta(uiLang);
  const ui = HEADER_UI[uiLang] || HEADER_UI.ko;
  const navUi = NAV_UI[uiLang] || NAV_UI.ko;
  const stickmanTitle = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).stickman.modalTitle;
  const koNavUi = NAV_UI.ko;

  const emergencyTooltipLabels: Record<string, Record<SupportedLanguage, string>> = {
    toilet: {
      en: 'Toilet (Restroom)',
      vi: 'Đi vệ sinh (Vệ sinh)',
      bn: 'বাথরুম (Toilet)',
      zh: '去洗手间 (卫生间)',
      ru: 'В туалет (Туалет)',
      ja: 'トイレに行きたい (トイレ)',
      mn: 'Бие засах газар (Угаалгын өрөө)'
    },
    water: {
      en: 'Drink Water (Water)',
      vi: 'Uống nước (Nước)',
      bn: 'পানি খাব (পানি)',
      zh: '喝水 (水)',
      ru: 'Пить воду (Вода)',
      ja: 'お水を飲みたい (水)',
      mn: 'Ус уух (Ус)'
    },
    sick: {
      en: 'Sick / Hurt',
      vi: 'Bị đau/Ốm',
      bn: 'অসুস্থ লাগছে',
      zh: '身体不舒服/生病',
      ru: 'Болит / Нездоровится',
      ja: '痛い/具合が悪い',
      mn: 'Өвдөж байна'
    },
    help: {
      en: 'Help me',
      vi: 'Giúp em với',
      bn: 'সাহায্য করুন',
      zh: '请帮帮我',
      ru: 'Помогите, пожалуйста',
      ja: '助けてください',
      mn: 'Туслаарай'
    }
  };

  const trackTabs: {
    id: LearningTrack;
    label: string;
    koLabel: string;
    activeClass: string;
    inactiveClass: string;
    underlineClass: string;
  }[] = [
    {
      id: 'hangeul',
      label: navUi.tracks.hangeul,
      koLabel: koNavUi.tracks.hangeul,
      activeClass: 'text-amber-800 font-black bg-amber-50/80',
      inactiveClass: 'text-slate-700 hover:text-amber-800 hover:bg-amber-50/40 font-bold',
      underlineClass: 'bg-amber-400',
    },
    {
      id: 'classroom',
      label: navUi.tracks.classroom,
      koLabel: koNavUi.tracks.classroom,
      activeClass: 'text-[#D94A6B] font-black bg-rose-50/75',
      inactiveClass: 'text-slate-700 hover:text-[#D94A6B] hover:bg-rose-50/40 font-bold',
      underlineClass: 'bg-[#D94A6B]',
    },
    {
      id: 'verb',
      label: navUi.tracks.verb,
      koLabel: koNavUi.tracks.verb,
      activeClass: 'text-[#7E22CE] font-black bg-purple-50/75',
      inactiveClass: 'text-slate-700 hover:text-[#7E22CE] hover:bg-purple-50/40 font-bold',
      underlineClass: 'bg-[#7E22CE]',
    },
    {
      id: 'particle',
      label: navUi.tracks.particle,
      koLabel: koNavUi.tracks.particle,
      activeClass: 'text-emerald-900 font-black bg-emerald-50/85',
      inactiveClass: 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50/45 font-bold',
      underlineClass: 'bg-emerald-500',
    },
  ];

  // Hidden teacher-admin trigger: double-click OR long-press (650ms) on brand logo
  const handleBrandPointerDown = () => {
    if (!onOpenTeacherAdmin) return;
    longPressFiredRef.current = false;
    if (longPressTimerRef.current) window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = window.setTimeout(() => {
      longPressFiredRef.current = true;
      if (singleClickTimerRef.current) {
        window.clearTimeout(singleClickTimerRef.current);
        singleClickTimerRef.current = null;
      }
      playCutePop();
      onOpenTeacherAdmin();
    }, 650);
  };

  const clearBrandLongPress = () => {
    if (longPressTimerRef.current) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleBrandClick = () => {
    if (longPressFiredRef.current) {
      longPressFiredRef.current = false;
      return;
    }
    if (singleClickTimerRef.current) {
      window.clearTimeout(singleClickTimerRef.current);
      singleClickTimerRef.current = null;
    }
    singleClickTimerRef.current = window.setTimeout(() => {
      singleClickTimerRef.current = null;
      playCutePop();
      onGoHome?.();
    }, 230);
  };

  const handleBrandDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (singleClickTimerRef.current) {
      window.clearTimeout(singleClickTimerRef.current);
      singleClickTimerRef.current = null;
    }
    clearBrandLongPress();
    if (onOpenTeacherAdmin) {
      playCutePop();
      onOpenTeacherAdmin();
    }
  };

  const handleCardClick = (card: EmergencyCardData) => {
    playEmergencyAlert();
    speakKorean(card.mainSentenceKo, 0.85);
    onSelectEmergencyCard?.(card);
  };

  const handleMicClick = () => {
    playCutePop();
    onOpenVoiceModal?.();
  };

  const renderEmergencyButtons = (size: 'mobile' | 'desktop') =>
    EMERGENCY_CARDS.map(card => {
      const tip = emergencyTooltipLabels[card.id]?.[currentLang] || card.titleKo;
      return (
        <button
          key={card.id}
          type="button"
          onClick={() => handleCardClick(card)}
          className={`${
            size === 'desktop' ? 'w-8 h-8 text-base' : 'w-7 h-7 sm:w-9 sm:h-9 text-sm sm:text-lg'
          } rounded-md bg-white hover:bg-pink-100/90 active:scale-95 border border-pink-200 hover:border-pink-400 shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0`}
          title={`${card.titleKo} (${tip})`}
          aria-label={card.titleKo}
        >
          <span className="leading-none">{card.icon}</span>
        </button>
      );
    });

  const renderLangDropdownPopover = () =>
    isLangOpen && (
      <>
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsLangOpen(false)}
        />
        <div className="absolute right-0 mt-1.5 w-[270px] sm:w-[320px] bg-white rounded-lg shadow-2xl border-2 border-[#441A75]/25 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
          <div className="px-3.5 py-1 text-[11px] font-black text-purple-950 border-b border-purple-100 mb-1 flex items-center justify-between">
            <span>{ui.dropdownHeader}</span>
            <span className="text-[10px] text-purple-600 font-medium">{ui.langCountBadge}</span>
          </div>
          <div className="max-h-[360px] overflow-y-auto">
            {UI_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  playCutePop();
                  onLanguageChange(lang.code);
                  setIsLangOpen(false);
                }}
                className={`w-full h-9 px-3.5 text-left flex items-center justify-between hover:bg-purple-50 text-xs transition-colors cursor-pointer ${
                  uiLang === lang.code ? 'bg-purple-100/70 text-purple-950 font-black' : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="font-bold">{lang.fullName}</span>
                </div>
                {uiLang === lang.code ? (
                  <Check className="w-4 h-4 text-purple-700" />
                ) : (
                  <span className="text-[11px] text-slate-400 font-medium">{lang.nativeName}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </>
    );

  return (
    <header className="relative z-40 w-full bg-[#FFF5F8] border-b border-pink-200/90 shadow-2xs no-print select-none font-korean-gothic">
      {/* ===================================================================== */}
      {/* DESKTOP (lg+): Slim 1-Row Main Header Bar (Layer 1)                  */}
      {/* ===================================================================== */}
      <div className="hidden lg:flex w-full max-w-[1600px] mx-auto px-4 h-[52px] items-center justify-between gap-3">
        {/* Left: Logo + 4 Track Tabs + Stickman */}
        <div className="flex items-center gap-2 xl:gap-3 min-w-0">
          {/* Brand Logo (Single click = Home, Hidden Double-Click / Long-Press = Teacher Admin) */}
          <button
            type="button"
            onClick={handleBrandClick}
            onDoubleClick={handleBrandDoubleClick}
            onPointerDown={handleBrandPointerDown}
            onPointerUp={clearBrandLongPress}
            onPointerLeave={clearBrandLongPress}
            onPointerCancel={clearBrandLongPress}
            className="flex items-center gap-1.5 select-none cursor-pointer group text-left border-0 bg-transparent p-0 transition-transform active:scale-95 shrink-0"
            title="해볼 한국어"
          >
            <ManduMascot size="xs" interactive={false} />
            <h1 className="text-[17px] xl:text-[19px] font-black text-rose-950 font-korean-gothic tracking-tight leading-none whitespace-nowrap group-hover:text-pink-600 transition-colors">
              해볼 한국어
            </h1>
          </button>

          <div className="h-5 w-px bg-pink-200/90 shrink-0 mx-0.5" aria-hidden="true" />

          {/* 4 Main Tracks + Stickman */}
          <nav aria-label="학습 영역 선택" className="flex items-center gap-1 xl:gap-1.5 h-[52px] shrink-0">
            {trackTabs.map(tab => {
              const isActive = activeTrack === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playCutePop();
                    onSelectTrack(tab.id);
                  }}
                  className={`relative h-full px-3 xl:px-4 flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer transition-colors text-[14px] xl:text-[15px] tracking-tight ${
                    isActive ? tab.activeClass : tab.inactiveClass
                  }`}
                  title={uiLang === 'ko' ? tab.label : `${tab.label} (${tab.koLabel})`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-1.5 right-1.5 h-[3px] ${tab.underlineClass}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}

            {onOpenStickmanBonus && (
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  onOpenStickmanBonus();
                }}
                className="ml-0.5 p-1 bg-transparent border-0 cursor-pointer focus:outline-none transition-transform hover:scale-110 active:scale-95 shrink-0 flex items-center"
                title={stickmanTitle}
                aria-label={stickmanTitle}
              >
                <svg
                  viewBox="-26 -60 52 114"
                  className="w-[18px] h-[30px] block"
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

        {/* Right: 4 Emergency Icons + Mic + Language Dropdown + Collapse Menu Button */}
        <div className="flex items-center gap-1.5 xl:gap-2 shrink-0">
          <div className="flex items-center gap-1" aria-label="Emergency Quick Cards">
            {renderEmergencyButtons('desktop')}
          </div>

          <button
            type="button"
            onClick={handleMicClick}
            className="w-8 h-8 rounded-md bg-gradient-to-tr from-rose-500 to-[#D94A6B] hover:from-rose-600 hover:to-[#BE3A58] active:scale-95 text-white shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0"
            title={ui.aiTeacherTitle}
            aria-label={ui.aiTeacherTitle}
          >
            <Mic className="w-3.5 h-3.5" />
          </button>

          <div className="h-5 w-px bg-pink-200/90 shrink-0 mx-0.5" aria-hidden="true" />

          {/* Compact Single-Line Language Selector */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsLangOpen(prev => !prev)}
              className="h-8 px-2.5 rounded-md bg-[#441A75] hover:bg-[#52208E] active:scale-[0.98] text-white shadow-2xs flex items-center gap-1.5 transition-all focus:outline-none cursor-pointer border border-[#6328A6] whitespace-nowrap"
              aria-label={ui.myLangTitle}
              aria-expanded={isLangOpen}
              title={`${ui.myLangTitle} · ${ui.dropdownHeader}`}
            >
              <span className="text-sm leading-none shrink-0" role="img" aria-label="Globe">🌐</span>
              <span className="hidden xl:inline text-[11.5px] font-bold text-purple-100 whitespace-nowrap">
                {ui.myLangTitle}
              </span>
              <span className="bg-[#FEF08A] text-[#1E0B36] font-bold text-[11px] px-1.5 py-0.5 rounded-sm whitespace-nowrap flex items-center gap-1 leading-none">
                <span>{selectedLangObj.flag}</span>
                <span>{selectedLangObj.nativeName}</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-white transition-transform shrink-0 ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {renderLangDropdownPopover()}
          </div>

          {/* Collapse Top Bars Button ('메뉴 접기') */}
          {onToggleMenuCollapse && (
            <button
              type="button"
              onClick={() => {
                playCutePop();
                onToggleMenuCollapse();
              }}
              className="h-8 px-2.5 rounded-md bg-white hover:bg-pink-50 active:scale-95 border border-pink-200 hover:border-pink-400 text-rose-900 text-xs font-bold flex items-center gap-1 whitespace-nowrap shrink-0 shadow-2xs transition-all cursor-pointer"
              title={isMenuCollapsed ? ui.expandMenu : ui.collapseMenu}
              aria-label={isMenuCollapsed ? ui.expandMenu : ui.collapseMenu}
            >
              <ChevronUp className="w-3.5 h-3.5 text-rose-700 shrink-0" />
              <span>{ui.collapseMenu}</span>
            </button>
          )}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE / TABLET (< lg): Existing Compact 2-Tier Header (Without ≡ 더보기) */}
      {/* ===================================================================== */}
      <div className="flex lg:hidden w-full px-2.5 sm:px-6 py-1.5 sm:py-2 flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-3">
        {/* Tier 1: Brand + Emergency Emojis (Mobile) */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-2">
          <button
            type="button"
            onClick={handleBrandClick}
            onDoubleClick={handleBrandDoubleClick}
            onPointerDown={handleBrandPointerDown}
            onPointerUp={clearBrandLongPress}
            onPointerLeave={clearBrandLongPress}
            onPointerCancel={clearBrandLongPress}
            className="flex items-center gap-1.5 sm:gap-2 select-none cursor-pointer group text-left border-0 bg-transparent p-0 transition-transform active:scale-95"
            title="해볼 한국어"
          >
            <ManduMascot size="xs" interactive={false} />
            <div>
              <h1 className="text-sm sm:text-lg font-bold text-rose-950 font-korean-gothic tracking-normal leading-none whitespace-nowrap group-hover:text-pink-600 transition-colors">
                해볼 한국어
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-bold text-rose-500 tracking-tight leading-tight">
                {ui.subtitle}
              </span>
            </div>
          </button>

          <div className="flex sm:hidden items-center gap-1 shrink-0">
            {renderEmergencyButtons('mobile')}
          </div>
        </div>

        {/* Tier 2: Desktop-sm Emergency + Mic + Collapse + Wide Language Selector */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
          <div
            className="hidden sm:flex items-center gap-1 sm:gap-1.5 pr-2 border-r-2 border-pink-200"
            aria-label="Emergency Quick Cards"
          >
            {renderEmergencyButtons('mobile')}
          </div>

          <button
            type="button"
            onClick={handleMicClick}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-to-tr from-rose-500 to-[#D94A6B] hover:from-rose-600 hover:to-[#BE3A58] active:scale-95 text-white shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0"
            title={ui.aiTeacherTitle}
            aria-label={ui.aiTeacherTitle}
          >
            <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {onToggleMenuCollapse && (
            <button
              type="button"
              onClick={() => {
                playCutePop();
                onToggleMenuCollapse();
              }}
              className="h-8 sm:h-9 px-2 rounded-md bg-white hover:bg-pink-50 border border-pink-200 text-rose-900 active:scale-95 shadow-2xs flex items-center justify-center gap-1 text-[11px] font-bold transition-all cursor-pointer shrink-0"
              title={ui.collapseMenu}
              aria-label={ui.collapseMenu}
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile Wide Language Selector */}
          <div className="relative flex-1 sm:flex-initial shrink-0 min-w-0">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="h-[36px] sm:h-[44px] w-full sm:w-[290px] px-2 sm:px-3 py-0.5 sm:py-1 rounded-md bg-[#441A75] hover:bg-[#52208E] active:scale-[0.98] text-white shadow-md flex items-center justify-between transition-all focus:outline-none cursor-pointer border border-[#6328A6]"
              aria-label={ui.myLangTitle}
              aria-expanded={isLangOpen}
              title={ui.dropdownHeader}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 text-left min-w-0">
                <span className="text-sm sm:text-base leading-none shrink-0" role="img" aria-label="Globe">🌐</span>
                <div className="flex flex-col justify-center leading-tight min-w-0">
                  <span className="text-[11px] sm:text-[12.5px] font-bold text-white tracking-tight leading-snug whitespace-nowrap truncate max-w-[140px] sm:max-w-[165px]">
                    {ui.myLangTitle}
                  </span>
                  <span className="text-[8.5px] sm:text-[9.5px] font-normal text-[#C084FC] tracking-normal leading-none mt-0.5 whitespace-nowrap truncate max-w-[130px] sm:max-w-[160px]">
                    {uiLang === 'ko'
                      ? 'Use Your Language'
                      : USE_YOUR_LANG_SUBTITLES[currentLang] || '내 언어로 이용하기'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-1.5">
                <span className="bg-[#FEF08A] text-[#1E0B36] font-bold text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm shadow-2xs whitespace-nowrap flex items-center gap-1 leading-none">
                  <span className="text-[11px] sm:text-sm">{selectedLangObj.flag}</span>
                  <span className="truncate max-w-[65px] sm:max-w-[90px]">{selectedLangObj.nativeName}</span>
                </span>
                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-white transition-transform shrink-0 ${isLangOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {renderLangDropdownPopover()}
          </div>
        </div>
      </div>
    </header>
  );
};
