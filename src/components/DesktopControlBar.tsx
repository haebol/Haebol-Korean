import React from 'react';
import { Layers, Printer, Gamepad2 } from 'lucide-react';
import { LearningTrack, LearningMethod } from '../types';
import { UiLanguage, NAV_UI } from '../i18n/uiTranslations';
import { playCutePop } from '../utils/audio';

interface DesktopControlBarProps {
  activeTrack: LearningTrack;
  activeMethod: LearningMethod;
  onSelectMethod: (method: LearningMethod) => void;
  uiLang?: UiLanguage;
  rightControls?: React.ReactNode;
}

export const DesktopControlBar: React.FC<DesktopControlBarProps> = ({
  activeTrack,
  activeMethod,
  onSelectMethod,
  uiLang = 'ko',
  rightControls,
}) => {
  const navUi = NAV_UI[uiLang] || NAV_UI.ko;

  const getTrackTheme = () => {
    if (activeTrack === 'hangeul') {
      return {
        barBg: 'bg-[#FFFDF5] border-amber-200/90',
        groupBg: 'bg-amber-100/70 border-amber-200',
        activeBtn: 'bg-amber-300/90 text-amber-950 font-black shadow-2xs border-amber-400',
        inactiveBtn: 'text-amber-900/75 hover:text-amber-950 hover:bg-amber-100/70 border-transparent font-bold',
      };
    }
    if (activeTrack === 'classroom') {
      return {
        barBg: 'bg-[#FFF9FB] border-rose-200/90',
        groupBg: 'bg-rose-100/60 border-rose-200',
        activeBtn: 'bg-[#D94A6B] text-white font-black shadow-2xs border-[#C03A59]',
        inactiveBtn: 'text-rose-900/75 hover:text-rose-950 hover:bg-rose-100/60 border-transparent font-bold',
      };
    }
    if (activeTrack === 'particle') {
      return {
        barBg: 'bg-emerald-50/90 border-emerald-200',
        groupBg: 'bg-emerald-100/70 border-emerald-200',
        activeBtn: 'bg-emerald-600 text-white font-black shadow-2xs border-emerald-700',
        inactiveBtn: 'text-emerald-950/75 hover:text-emerald-950 hover:bg-emerald-100/70 border-transparent font-bold',
      };
    }
    return {
      barBg: 'bg-[#FAF7FF] border-purple-200/90',
      groupBg: 'bg-purple-100/70 border-purple-200',
      activeBtn: 'bg-[#7E22CE] text-white font-black shadow-2xs border-[#6B21A8]',
      inactiveBtn: 'text-purple-950/75 hover:text-purple-950 hover:bg-purple-100/70 border-transparent font-bold',
    };
  };

  const theme = getTrackTheme();

  const methodItems: {
    id: LearningMethod;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'flashcard', label: navUi.methods.flashcard, Icon: Layers },
    { id: 'worksheet', label: navUi.methods.study, Icon: Printer },
    { id: 'game', label: navUi.methods.games, Icon: Gamepad2 },
  ];

  return (
    <div
      className={`hidden lg:block w-full border-b ${theme.barBg} no-print select-none font-korean-gothic mb-2`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 h-[44px] flex items-center justify-between gap-3">
        {/* Left: [플래시카드 / 프린트 / 게임] 3 Mode Buttons */}
        <nav
          aria-label="학습 모드 선택"
          className={`flex items-center gap-1 p-0.5 rounded-md border shrink-0 ${theme.groupBg}`}
        >
          {methodItems.map(({ id, label, Icon }) => {
            const isActive = activeMethod === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  playCutePop();
                  onSelectMethod(id);
                }}
                className={`h-[32px] px-3 rounded-sm border text-[13px] flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  isActive ? theme.activeBtn : theme.inactiveBtn
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Sub-categories, Unit Dropdown, Overview Grid, Print Buttons */}
        <div className="flex items-center justify-end gap-2 min-w-0 flex-1">
          {rightControls}
        </div>
      </div>
    </div>
  );
};
