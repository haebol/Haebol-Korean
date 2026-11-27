import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  Check,
  Mic,
  Printer,
  Lock,
  FileText,
  Layers,
  ExternalLink,
  Gift,
} from 'lucide-react';
import {
  SupportedLanguage,
  EmergencyCardData,
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
import { EMERGENCY_CARDS } from '../data/emergency';
import { ManduMascot } from './ManduMascot';
import { playCutePop, playEmergencyAlert, speakKorean } from '../utils/audio';
import { buildPrintChunks, WebPrintRequest } from '../utils/printReadiness';

export interface DesktopRow2TabItem {
  id: string;
  label: string;
  isActive: boolean;
  locked?: boolean;
  group?: 'worksheet';
  onClick: () => void;
}

export interface HeaderPrintMenuMeta {
  sectionLabel: string;
  currentLabel: string;
  unitSuffix: string;
  totalCount: number;
  supportsTripleSet?: boolean;
}

interface HeaderAndEmergencyBarProps {
  currentLang: SupportedLanguage;
  uiLang?: UiLanguage;
  activeTrack: LearningTrack;
  onSelectTrack: (track: LearningTrack) => void;
  activeMethod?: LearningMethod;
  onSelectMethod?: (method: LearningMethod) => void;
  onLanguageChange: (lang: UiLanguage) => void;
  onSelectEmergencyCard?: (card: EmergencyCardData) => void;
  onOpenVoiceModal?: () => void;
  onOpenStickmanBonus?: () => void;
  onOpenTeacherAdmin?: () => void;
  onGoHome?: () => void;
  onPrint?: () => void;
  onPrintRequest?: (req: Omit<WebPrintRequest, 'id'>) => void;
  printMenuMeta?: HeaderPrintMenuMeta;
  blogBundleUrl?: string;
  desktopRow2Tabs?: DesktopRow2TabItem[];
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
  onPrint,
  onPrintRequest,
  printMenuMeta,
  blogBundleUrl = '',
  desktopRow2Tabs = [],
  onToggleMenuCollapse,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);

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
  }[] = [
    { id: 'hangeul', label: navUi.tracks.hangeul, koLabel: koNavUi.tracks.hangeul },
    { id: 'classroom', label: navUi.tracks.classroom, koLabel: koNavUi.tracks.classroom },
    { id: 'verb', label: navUi.tracks.verb, koLabel: koNavUi.tracks.verb },
    { id: 'particle', label: navUi.tracks.particle, koLabel: koNavUi.tracks.particle },
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
            size === 'desktop'
              ? 'w-[34px] h-[34px] text-[15px] rounded-lg bg-white/14 hover:bg-white/24 border-white/20 hover:border-white/40'
              : 'w-7 h-7 sm:w-9 sm:h-9 text-sm sm:text-lg rounded-md bg-white/14 hover:bg-white/24 border-white/22 hover:border-white/40'
          } active:scale-95 border shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0`}
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
        <div className="absolute right-0 mt-1.5 w-[270px] sm:w-[320px] bg-white rounded-xl shadow-2xl border-2 border-[#441A75]/25 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 text-slate-800">
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

  const printChunks = printMenuMeta
    ? buildPrintChunks(printMenuMeta.totalCount, printMenuMeta.unitSuffix, 10)
    : [];

  const dispatchPrint = (req: Omit<WebPrintRequest, 'id'>) => {
    playCutePop();
    setIsPrintMenuOpen(false);
    if (onPrintRequest) {
      onPrintRequest(req);
    } else {
      onPrint?.();
    }
  };

  const renderPrintMenuPopover = () =>
    isPrintMenuOpen && (
      <>
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsPrintMenuOpen(false)}
        />
        <div className="absolute right-0 mt-1.5 w-[270px] sm:w-[296px] bg-white rounded-xl shadow-2xl border-2 border-[#441A75]/25 p-3 z-50 text-slate-800 space-y-2.5 animate-in fade-in slide-in-from-top-1">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-purple-100">
            <div className="text-xs font-black text-[#2E1052] truncate">
              {printMenuMeta ? `${printMenuMeta.sectionLabel} 인쇄` : '학습지 인쇄'}
            </div>
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[#3B1668] text-[10px] font-black shrink-0">
              A4 가로
            </span>
          </div>

          {/* 1. 현재 페이지 인쇄 */}
          <button
            type="button"
            onClick={() => dispatchPrint({ type: 'current' })}
            className="w-full px-3 py-2.5 rounded-lg bg-[#3B1668] hover:bg-[#2E1052] active:scale-[0.99] text-white text-left flex items-center gap-2 transition-all cursor-pointer shadow-xs"
          >
            <FileText className="w-4 h-4 text-purple-200 shrink-0" />
            <span className="text-xs font-black leading-none">현재 페이지 인쇄</span>
          </button>

          {/* 1-B. 교실한국어 전용: 현재 단원 3종세트 */}
          {printMenuMeta?.supportsTripleSet && (
            <button
              type="button"
              onClick={() => dispatchPrint({ type: 'triple' })}
              className="w-full px-3 py-2 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-950 text-left flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="text-xs font-black leading-none">현재 단원 3종세트 인쇄</span>
            </button>
          )}

          {/* 2. 묶음 인쇄 */}
          {printChunks.length > 0 && (
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center gap-1 px-0.5 text-[11px] font-black text-slate-700">
                <Layers className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>묶음 인쇄</span>
              </div>
              <div
                className={`grid gap-1.5 ${
                  printChunks.length >= 3
                    ? 'grid-cols-3'
                    : printChunks.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {printChunks.map((chunk) => (
                  <button
                    key={`${chunk.startIdx}-${chunk.endIdx}`}
                    type="button"
                    onClick={() =>
                      dispatchPrint({
                        type: 'range',
                        startIdx: chunk.startIdx,
                        endIdx: chunk.endIdx,
                      })
                    }
                    className="px-2 py-2 rounded-lg bg-purple-50/75 hover:bg-purple-100 border border-purple-200/80 text-[#3B1668] text-center transition-colors cursor-pointer"
                  >
                    <span className="text-[11.5px] font-black leading-none whitespace-nowrap">
                      {chunk.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. 전체 합본 PDF */}
          <div className="pt-2 border-t border-purple-100">
            {blogBundleUrl ? (
              <a
                href={blogBundleUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  playCutePop();
                  setIsPrintMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 text-amber-950 flex items-center justify-between gap-2 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Gift className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-[11.5px] font-black leading-none truncate">
                    전체 합본 PDF (블로그)
                  </span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              </a>
            ) : (
              <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-slate-600 flex items-center gap-2">
                <Gift className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span className="text-[11px] font-bold text-slate-700 leading-none truncate">
                  전체 합본 PDF · 블로그 무료 배포 예정
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );

  return (
    <header className="relative z-40 w-full bg-[#3B1668] lg:bg-transparent border-b border-white/15 lg:border-b-0 shadow-2xs lg:shadow-none lg:px-4 lg:pt-2.5 no-print select-none font-korean-gothic">
      {/* ===================================================================== */}
      {/* DESKTOP (lg+): Twin '해볼 수학' Row 1 + Row 2 Unified Purple Card      */}
      {/* ===================================================================== */}
      <div className="hidden lg:block w-full max-w-[1080px] mx-auto rounded-2xl bg-white border border-purple-200/85 shadow-[0_2px_12px_rgba(59,22,104,0.08)]">
        {/* ROW 1: Solid Deep Purple Top Bar */}
        <div className="w-full px-4 h-[56px] flex items-center justify-between gap-3 bg-[#3B1668] text-white rounded-t-2xl">
          {/* Left: Mandu Logo + '해볼 한국어' + 4 Main Tracks (한글, 교실한국어, 용언, 조사) */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={handleBrandClick}
              onDoubleClick={handleBrandDoubleClick}
              onPointerDown={handleBrandPointerDown}
              onPointerUp={clearBrandLongPress}
              onPointerLeave={clearBrandLongPress}
              onPointerCancel={clearBrandLongPress}
              className="flex items-center gap-2 select-none cursor-pointer group text-left border-0 bg-transparent p-0 transition-transform active:scale-95 shrink-0"
              title={ui.brandTitle}
            >
              <ManduMascot size="xs" interactive={false} />
              <h1 className="text-[19px] font-black text-white font-korean-gothic tracking-tight leading-none whitespace-nowrap group-hover:text-purple-100 transition-colors">
                {ui.brandTitle}
              </h1>
            </button>

            <div className="h-5 w-px bg-white/20 shrink-0 mx-0.5" aria-hidden="true" />

            <nav aria-label="대분류 영역 선택" className="flex items-center gap-1 shrink-0">
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
                    className={`h-[34px] px-3.5 rounded-lg flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer transition-all text-[14px] tracking-tight ${
                      isActive
                        ? 'bg-white/20 text-white font-black ring-1 ring-white/30 shadow-2xs'
                        : 'text-purple-100/85 hover:text-white hover:bg-white/10 font-bold'
                    }`}
                    title={uiLang === 'ko' ? tab.label : `${tab.label} (${tab.koLabel})`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: 4 Emergency Icons + [KR 한국어 ∨] Language Dropdown + White [인쇄] Button */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1" aria-label="Emergency Quick Cards">
              {renderEmergencyButtons('desktop')}
            </div>

            <div className="h-5 w-px bg-white/20 shrink-0" aria-hidden="true" />

            {/* Compact Language Selector matching 해볼 수학 top-right selector */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsLangOpen(prev => !prev)}
                className="h-[36px] px-2.5 rounded-lg bg-white/14 hover:bg-white/22 active:scale-[0.98] text-white flex items-center gap-1.5 transition-all focus:outline-none cursor-pointer border border-white/22 whitespace-nowrap"
                aria-label={ui.myLangTitle}
                aria-expanded={isLangOpen}
                title={`${ui.myLangTitle} · ${ui.dropdownHeader}`}
              >
                <span className="text-[14px] leading-none shrink-0" aria-hidden="true">🌐</span>
                <span className="text-[13.5px] leading-none shrink-0">{selectedLangObj.flag}</span>
                <span className="px-1.5 py-[2px] rounded-[4px] border border-yellow-300 bg-yellow-300/15 text-[12.5px] font-black text-yellow-100 leading-tight whitespace-nowrap">
                  {selectedLangObj.nativeName}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-purple-100 transition-transform shrink-0 ${
                    isLangOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {renderLangDropdownPopover()}
            </div>

            {/* White Rounded-Rect [인쇄 ∨] Popover Trigger */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setIsLangOpen(false);
                  setIsPrintMenuOpen((prev) => !prev);
                }}
                className="h-[36px] px-3 rounded-lg bg-white hover:bg-purple-50 active:scale-95 text-[#2E1052] text-[13.5px] font-black flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs transition-all cursor-pointer border border-white"
                title="학습지 인쇄 메뉴 (1장 · 10장 묶음)"
                aria-label="인쇄 메뉴 열기"
                aria-expanded={isPrintMenuOpen}
              >
                <Printer className="w-4 h-4 text-[#3B1668] shrink-0" />
                <span>인쇄</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#3B1668]/75 transition-transform shrink-0 ${
                    isPrintMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {renderPrintMenuPopover()}
            </div>
          </div>
        </div>

        {/* ROW 2: Single-Row Lavender Pill Bar — [1. 플래시카드] [2. 게임] | (3. 학습지 ▸) [하위 메뉴들] ... [졸라맨] */}
        <div className="w-full px-3 py-2 bg-white rounded-b-2xl">
          <div className="w-full min-h-[42px] px-3 py-1 rounded-full bg-[#F3EFFA] border border-purple-200/80 flex items-center justify-between gap-2">
            {(() => {
              const primaryTabs = desktopRow2Tabs.filter((item) => item.group !== 'worksheet');
              const worksheetTabs = desktopRow2Tabs.filter((item) => item.group === 'worksheet');

              return (
                <nav
                  aria-label="세부 학습 메뉴"
                  className="flex items-center flex-1 justify-center gap-1.5 xl:gap-2 min-w-0"
                >
                  <div className="flex items-center gap-1 xl:gap-1.5 shrink-0">
                    {primaryTabs.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        disabled={item.locked}
                        onClick={() => {
                          if (item.locked) return;
                          playCutePop();
                          item.onClick();
                        }}
                        title={item.locked ? '준비 중입니다 (곧 공개 예정)' : item.label}
                        className={`h-[32px] px-3.5 rounded-full text-[13.5px] tracking-tight whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-1 transition-all ${
                          item.locked
                            ? 'text-slate-400 font-semibold cursor-not-allowed opacity-75'
                            : item.isActive
                            ? 'bg-[#3B1668] text-white font-black shadow-xs cursor-pointer'
                            : 'text-[#3A2259] hover:text-[#3B1668] hover:bg-purple-200/55 font-bold cursor-pointer'
                        }`}
                      >
                        {item.locked && <Lock className="w-3 h-3 shrink-0" />}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {worksheetTabs.length > 0 && (
                    <>
                      <span
                        className="w-px h-4 bg-purple-300/80 mx-1.5 xl:mx-2.5 shrink-0"
                        aria-hidden="true"
                      />
                      <div
                        role="group"
                        aria-label="3. 학습지 하위 메뉴"
                        className="flex items-center gap-1 shrink-0"
                      >
                        <span
                          className="h-[25px] px-2.5 mr-0.5 rounded-full bg-purple-200/65 text-[#5B2E91] text-[12px] font-extrabold tracking-tight whitespace-nowrap select-none pointer-events-none inline-flex items-center gap-1 shrink-0"
                          aria-hidden="true"
                        >
                          <span>3. 학습지</span>
                          <span className="text-[10px] opacity-80 leading-none">▸</span>
                        </span>
                        <div className="flex items-center gap-0.5 xl:gap-1">
                          {worksheetTabs.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              disabled={item.locked}
                              onClick={() => {
                                if (item.locked) return;
                                playCutePop();
                                item.onClick();
                              }}
                              title={item.locked ? '준비 중입니다 (곧 공개 예정)' : item.label}
                              className={`h-[30px] px-3 rounded-full text-[13.5px] tracking-tight whitespace-nowrap shrink-0 inline-flex items-center justify-center gap-1 transition-all ${
                                item.locked
                                  ? 'text-slate-400 font-semibold cursor-not-allowed opacity-75'
                                  : item.isActive
                                  ? 'bg-[#3B1668] text-white font-black shadow-xs cursor-pointer'
                                  : 'text-[#3A2259] hover:text-[#3B1668] hover:bg-purple-200/55 font-bold cursor-pointer'
                              }`}
                            >
                              {item.locked && <Lock className="w-3 h-3 shrink-0" />}
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </nav>
              );
            })()}

            {/* Stickman Icon moved from Row 1 to Far Right End of Row 2 */}
            {onOpenStickmanBonus && (
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  onOpenStickmanBonus();
                }}
                className="mr-1 w-8 h-8 rounded-full hover:bg-purple-200/60 border-0 bg-transparent cursor-pointer focus:outline-none transition-transform hover:scale-110 active:scale-95 shrink-0 flex items-center justify-center"
                title={stickmanTitle}
                aria-label={stickmanTitle}
              >
                <svg
                  viewBox="-26 -60 52 114"
                  className="w-[17px] h-[28px] block"
                  aria-hidden="true"
                >
                  <circle cx="0" cy="-38" r="18" fill="#FFFFFF" stroke="#3B1668" strokeWidth="4" />
                  <circle cx="-6" cy="-41" r="2.6" fill="#3B1668" />
                  <circle cx="6" cy="-41" r="2.6" fill="#3B1668" />
                  <path
                    d="M-6 -32 Q0 -26 6 -32"
                    fill="none"
                    stroke="#3B1668"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  />
                  <line x1="0" y1="-20" x2="0" y2="16" stroke="#3B1668" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="0" y1="-10" x2="-16" y2="6" stroke="#3B1668" strokeWidth="4.5" strokeLinecap="round" />
                  <g transform="translate(0, -10)">
                    <g className="stickman-arm-wave">
                      <line x1="0" y1="0" x2="0" y2="23" stroke="#3B1668" strokeWidth="4.5" strokeLinecap="round" />
                    </g>
                  </g>
                  <line x1="0" y1="16" x2="-11" y2="48" stroke="#3B1668" strokeWidth="5.5" strokeLinecap="round" />
                  <line x1="0" y1="16" x2="11" y2="48" stroke="#3B1668" strokeWidth="5.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE / TABLET (< lg): Compact Single-Row Header (Emergency + Mic + Print) */}
      {/* ===================================================================== */}
      <div className="flex lg:hidden w-full px-2 sm:px-6 py-1 sm:py-1.5 items-center justify-between gap-1.5 sm:gap-2.5">
        <button
          type="button"
          onClick={handleBrandClick}
          onDoubleClick={handleBrandDoubleClick}
          onPointerDown={handleBrandPointerDown}
          onPointerUp={clearBrandLongPress}
          onPointerLeave={clearBrandLongPress}
          onPointerCancel={clearBrandLongPress}
          className="flex items-center gap-1 sm:gap-2 select-none cursor-pointer group text-left border-0 bg-transparent p-0 transition-transform active:scale-95 min-w-0"
          title={ui.brandTitle}
        >
          <ManduMascot size="xs" interactive={false} />
          <h1 className="text-[13.5px] sm:text-lg font-black text-white font-korean-gothic tracking-tight leading-none whitespace-nowrap truncate group-hover:text-purple-100 transition-colors">
            {ui.brandTitle}
          </h1>
        </button>

        {/* Right: 4 Emergency Icons + Mic + Print (Far Right End) */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0" aria-label="긴급 알림 · 음성 · 인쇄">
          {renderEmergencyButtons('mobile')}

          <button
            type="button"
            onClick={handleMicClick}
            className="w-7 h-7 sm:w-9 sm:h-9 rounded-md bg-gradient-to-tr from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 active:scale-95 text-white border border-white/25 shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0"
            title={ui.aiTeacherTitle}
            aria-label={ui.aiTeacherTitle}
          >
            <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setIsLangOpen(false);
                setIsPrintMenuOpen((prev) => !prev);
              }}
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-md bg-white hover:bg-purple-50 active:scale-95 text-[#2E1052] border border-white shadow-2xs flex items-center justify-center transition-all cursor-pointer shrink-0"
              title="학습지 인쇄 메뉴 (1장 · 묶음)"
              aria-label="인쇄 메뉴 열기"
              aria-expanded={isPrintMenuOpen}
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#3B1668]" />
            </button>

            {renderPrintMenuPopover()}
          </div>
        </div>
      </div>
    </header>
  );
};
