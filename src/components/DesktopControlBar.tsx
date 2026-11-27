import React, { useState, useRef, useEffect } from 'react';
import {
  PanelLeftOpen,
  PanelLeftClose,
  Rows3,
  BookOpen,
  BookMarked,
  Maximize2,
} from 'lucide-react';
import { LearningTrack, LearningMethod } from '../types';
import { UiLanguage } from '../i18n/uiTranslations';
import { playCutePop } from '../utils/audio';

// ============================================================================
// [단어장] 네이버 블로그 포스팅 URL 매핑 객체 (대분류별 추후 간편 수정)
// ============================================================================
export const WORDBOOK_BLOG_URLS: Record<'hangeul' | 'classroom' | 'verb' | 'particle', string> = {
  hangeul: 'https://blog.naver.com/do_mandu/224478171746',
  classroom: '', // 추후 교실한국어 단어장 블로그 URL 입력
  verb: '',      // 추후 용언 단어장 블로그 URL 입력
  particle: '',  // 추후 조사 단어장 블로그 URL 입력
};

interface DesktopControlBarProps {
  activeTrack: LearningTrack;
  activeMethod?: LearningMethod;
  onSelectMethod?: (method: LearningMethod) => void;
  uiLang?: UiLanguage;
  /** Left [메뉴펼치기] TOC Sidebar toggle */
  isTocOpen?: boolean;
  onToggleToc?: () => void;
  /** Left [연속보기] Continuous scroll toggle (default false = 1장씩 보기) */
  isContinuousView?: boolean;
  onToggleContinuous?: () => void;
  /** Left [표지·차례] Scroll to cover & TOC */
  onJumpCoverToc?: () => void;
  disableCoverToc?: boolean;
  /** Center unit select dropdown (< | ① 단원 [1/30] ∨ | >) */
  centerUnitControl?: React.ReactNode;
  /** Conditional button immediately to the right of center dropdown (only [교실한국어]-[학습지] 내 언어 골라담기) */
  extraAfterCenter?: React.ReactNode;
  /** Right [집중] Full-screen focus mode toggle */
  onToggleFocusMode?: () => void;
}

export const DesktopControlBar: React.FC<DesktopControlBarProps> = ({
  activeTrack,
  isTocOpen = false,
  onToggleToc,
  isContinuousView = false,
  onToggleContinuous,
  onJumpCoverToc,
  disableCoverToc = false,
  centerUnitControl,
  extraAfterCenter,
  onToggleFocusMode,
}) => {
  const [wordbookNotice, setWordbookNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    };
  }, []);

  const baseTrack: 'hangeul' | 'classroom' | 'verb' | 'particle' =
    activeTrack === 'hangeul' ||
    activeTrack === 'classroom' ||
    activeTrack === 'verb' ||
    activeTrack === 'particle'
      ? activeTrack
      : 'classroom';

  const wordbookUrl = WORDBOOK_BLOG_URLS[baseTrack]?.trim() || '';

  const handleEmptyWordbookClick = () => {
    playCutePop();
    setWordbookNotice('단어장 블로그 주소를 준비 중입니다.');
    if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => {
      setWordbookNotice(null);
    }, 2400);
  };

  const baseBtnClass =
    'h-[40px] px-3 rounded-lg border text-[13px] font-extrabold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all shadow-2xs';
  const idleBtnClass =
    'bg-white hover:bg-purple-50 text-[#2E1052] border-purple-200/95 hover:border-purple-300 cursor-pointer active:scale-[0.98]';
  const activeBtnClass =
    'bg-[#3B1668] hover:bg-[#491C80] text-white border-[#3B1668] cursor-pointer active:scale-[0.98] shadow-xs';
  const disabledBtnClass =
    'bg-white/75 text-slate-400 border-purple-100 cursor-not-allowed opacity-70';

  return (
    <div className="hidden lg:block w-full px-4 mt-2.5 mb-3 no-print select-none font-korean-gothic">
      <div className="relative w-full max-w-[1080px] mx-auto flex items-center gap-2">
        {/* Left 3 Independent Rounded Action Buttons (4-char uniform spec) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* 1. [메뉴펼치기] */}
          <button
            type="button"
            onClick={() => {
              playCutePop();
              onToggleToc?.();
            }}
            className={`${baseBtnClass} ${isTocOpen ? activeBtnClass : idleBtnClass}`}
            title={isTocOpen ? '단원 목차 사이드바 닫기' : '단원 목차 사이드바 펼치기'}
            aria-pressed={isTocOpen}
          >
            {isTocOpen ? (
              <PanelLeftClose className="w-4 h-4 shrink-0" />
            ) : (
              <PanelLeftOpen className="w-4 h-4 shrink-0 text-[#5B21B6]" />
            )}
            <span>메뉴펼치기</span>
          </button>

          {/* 2. [연속보기] */}
          <button
            type="button"
            onClick={() => {
              playCutePop();
              onToggleContinuous?.();
            }}
            className={`${baseBtnClass} ${isContinuousView ? activeBtnClass : idleBtnClass}`}
            title={
              isContinuousView
                ? '1장씩 보기로 돌아가기'
                : '전체 학습지 연속 스크롤 보기로 전환'
            }
            aria-pressed={isContinuousView}
          >
            <Rows3
              className={`w-4 h-4 shrink-0 ${isContinuousView ? 'text-white' : 'text-[#5B21B6]'}`}
            />
            <span>연속보기</span>
          </button>

          {/* 3. [표지·차례] */}
          <button
            type="button"
            disabled={disableCoverToc}
            onClick={() => {
              if (disableCoverToc) return;
              playCutePop();
              onJumpCoverToc?.();
            }}
            className={`${baseBtnClass} ${disableCoverToc ? disabledBtnClass : idleBtnClass}`}
            title={
              disableCoverToc
                ? '기본 학습지 탭에서 표지·차례를 볼 수 있어요'
                : '제본용 표지·차례로 바로 이동'
            }
          >
            <BookOpen
              className={`w-4 h-4 shrink-0 ${disableCoverToc ? 'text-slate-400' : 'text-[#5B21B6]'}`}
            />
            <span>표지·차례</span>
          </button>
        </div>

        {/* Center Unit Dropdown (+ Conditional [내 언어 골라담기] right next to it ONLY on Classroom Worksheet) */}
        <div className="flex-1 min-w-0 flex items-center gap-1.5">
          <div className="flex-1 min-w-0">{centerUnitControl}</div>
          {extraAfterCenter && <div className="shrink-0">{extraAfterCenter}</div>}
        </div>

        {/* Right 2 Independent Rounded Action Buttons ([단어장], [집중]) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* 1. [단어장] */}
          {wordbookUrl ? (
            <a
              href={wordbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCutePop()}
              className={`${baseBtnClass} ${idleBtnClass} px-3.5 no-underline`}
              title="네이버 블로그 단어장 포스팅 새 창으로 열기"
            >
              <BookMarked className="w-4 h-4 shrink-0 text-[#5B21B6]" />
              <span>단어장</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={handleEmptyWordbookClick}
              className={`${baseBtnClass} ${idleBtnClass} px-3.5`}
              title="단어장 블로그 주소 준비 중"
            >
              <BookMarked className="w-4 h-4 shrink-0 text-[#5B21B6]" />
              <span>단어장</span>
            </button>
          )}

          {/* 2. [집중] */}
          <button
            type="button"
            onClick={() => {
              playCutePop();
              onToggleFocusMode?.();
            }}
            className={`${baseBtnClass} ${idleBtnClass} px-3.5`}
            title="상단 메뉴를 접고 풀스크린 집중 모드로 보기"
          >
            <Maximize2 className="w-3.5 h-3.5 shrink-0 text-[#5B21B6]" />
            <span>집중</span>
          </button>
        </div>

        {/* Non-blocking toast notice when wordbook URL is not configured yet */}
        {wordbookNotice && (
          <div
            role="status"
            className="absolute right-0 -bottom-11 z-50 px-3 py-1.5 rounded-lg bg-[#3B1668] text-white text-xs font-bold shadow-lg border border-purple-400/40 whitespace-nowrap animate-in fade-in slide-in-from-top-1"
          >
            {wordbookNotice}
          </div>
        )}
      </div>
    </div>
  );
};
