import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Video,
  Play,
  Square,
  Maximize2,
  X,
  Download,
  Copy,
  Check,
  Loader2,
  Image as ImageIcon,
  Subtitles,
  FileText,
  Smartphone,
  Monitor,
  Film,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { HANGEUL_GROUPS, HangeulCardData } from './HangeulStrokeFlashcardSection';
import { ADMIN_SUMMARY_LANGUAGES, AdminSummaryLang } from '../data/summaryTranslations';
import {
  STROKE_GROUP_IDS,
  STROKE_HOOK_STYLE_META,
  StrokeHookPresetStyle,
  YoutubeAspectRatio,
  LANG_LOCALIZED_YT_COPY,
  buildStrokeHookPreset,
  buildStrokeSrt,
  buildYoutubeUploadPackage,
  getStrokeCardDurationSec,
  triggerTextFileDownload,
} from '../data/youtubeStudioData';
import {
  HAEBOL_STROKE_COLORS,
  STROKE_STAGE_THEMES,
  StrokeStageThemeId,
  recordStrokeVideoWebm,
} from '../utils/strokeVideoRecorder';
import {
  YOUTUBE_THUMB_THEMES,
  YoutubeThumbThemeId,
  YoutubeThumbnailCard,
} from './YoutubeThumbnailCard';
import { ScaledPreviewFrame, captureNodeToPng } from './AdminCaptureCards';
import { playCutePop, speakKorean } from '../utils/audio';

type StudioSubPanel = 'stage' | 'thumbnail' | 'package';
type StrokeScope = 'single' | 'group';

const HAEBOL_HAND_FONT =
  "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', 'Hakgyoansim Bareondotum', sans-serif";

// ============================================================================
// LIVE ANIMATED STROKE STAGE (HAEBOL ORIGINAL FLASHCARD + TOP/BOTTOM HOOK CTA)
// ============================================================================

interface LiveStrokeStageProps {
  cards: HangeulCardData[];
  groupBadge: string;
  currentIndex: number;
  activeStrokeIdx: number;
  activeStrokeProgress: number;
  aspect: YoutubeAspectRatio;
  lang: AdminSummaryLang;
  themeId: StrokeStageThemeId;
  showStrokeNumbers: boolean;
  showSubtitle: boolean;
  showWatermark: boolean;
  showHookOverlay: boolean;
  topHookText: string;
  bottomCtaText: string;
  isFullscreen?: boolean;
}

const LiveStrokeStage: React.FC<LiveStrokeStageProps> = ({
  cards,
  groupBadge,
  currentIndex,
  activeStrokeIdx,
  activeStrokeProgress,
  aspect,
  lang,
  themeId,
  showStrokeNumbers,
  showSubtitle,
  showWatermark,
  showHookOverlay,
  topHookText,
  bottomCtaText,
  isFullscreen = false,
}) => {
  const card = cards[currentIndex] || cards[0];
  const theme = STROKE_STAGE_THEMES[themeId];
  const copy = LANG_LOCALIZED_YT_COPY[lang];
  const isVertical = aspect === '9:16';
  const strokes = card?.strokes || [];
  const strokePoints = card?.strokePoints || [];

  const cleanTopHook = showHookOverlay ? topHookText.trim() : '';
  const cleanBottomCta = showHookOverlay ? bottomCtaText.trim() : '';
  const hasTopHook = cleanTopHook.length > 0;
  const hasBottomCta = cleanBottomCta.length > 0;
  const hasAnyHook = hasTopHook || hasBottomCta;

  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [strokeLengths, setStrokeLengths] = useState<number[]>([]);
  const [penTip, setPenTip] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const lens = strokes.map((_, i) => {
      const el = pathRefs.current[i];
      if (!el) return 140;
      try {
        return Math.max(10, el.getTotalLength());
      } catch {
        return 140;
      }
    });
    setStrokeLengths(lens);
  }, [card?.id, strokes.length]);

  useEffect(() => {
    if (activeStrokeIdx >= 0 && activeStrokeIdx < strokes.length) {
      const el = pathRefs.current[activeStrokeIdx];
      const len = strokeLengths[activeStrokeIdx] || 140;
      if (el) {
        try {
          const pt = el.getPointAtLength(Math.min(len, Math.max(0.5, len * activeStrokeProgress)));
          setPenTip({ x: pt.x, y: pt.y });
          return;
        } catch {
          // fallback below
        }
      }
    }
    setPenTip(null);
  }, [activeStrokeIdx, activeStrokeProgress, strokeLengths, strokes.length]);

  if (!card) return null;

  const renderSvgBox = () => (
    <div
      className="relative flex items-center justify-center rounded-xl border-2 border-dashed shadow-inner aspect-square w-full"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.cardBorder,
        maxWidth: isVertical
          ? isFullscreen
            ? hasAnyHook
              ? '265px'
              : '310px'
            : hasAnyHook
            ? '188px'
            : '216px'
          : isFullscreen
          ? hasAnyHook
            ? '370px'
            : '430px'
          : hasAnyHook
          ? '212px'
          : '248px',
      }}
    >
      <svg viewBox="0 0 160 160" className="w-[88%] h-[88%] overflow-visible">
        {/* Dashed crosshair grid (Haebol amber crosshairs) */}
        <line
          x1="80"
          y1="6"
          x2="80"
          y2="154"
          stroke={theme.gridLine}
          strokeWidth="2"
          strokeDasharray="5 5"
        />
        <line
          x1="6"
          y1="80"
          x2="154"
          y2="80"
          stroke={theme.gridLine}
          strokeWidth="2"
          strokeDasharray="5 5"
        />

        {/* Layer 1: Haebol signature colorful per-stroke base guide */}
        {strokes.map((d, idx) => (
          <path
            key={`guide-${card.id}-${idx}`}
            ref={(el) => {
              pathRefs.current[idx] = el;
            }}
            d={d}
            fill="none"
            stroke={
              theme.useColorfulBaseStrokes
                ? HAEBOL_STROKE_COLORS[idx % HAEBOL_STROKE_COLORS.length]
                : theme.guideStroke
            }
            strokeWidth="14"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {/* Layer 2: Completed overwrite strokes in Haebol Deep Purple (#441A75) */}
        {strokes.map((d, idx) => {
          if (idx >= activeStrokeIdx) return null;
          return (
            <path
              key={`done-${card.id}-${idx}`}
              d={d}
              fill="none"
              stroke={theme.completedStroke}
              strokeWidth="15.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Layer 3: Active drawing stroke */}
        {activeStrokeIdx >= 0 && activeStrokeIdx < strokes.length && (
          <path
            d={strokes[activeStrokeIdx]}
            fill="none"
            stroke={theme.activeStroke}
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${Math.max(0.5, (strokeLengths[activeStrokeIdx] || 140) * activeStrokeProgress)} ${(strokeLengths[activeStrokeIdx] || 140) + 20}`}
          />
        )}

        {/* Glowing pen tip */}
        {penTip && (
          <g>
            <circle cx={penTip.x} cy={penTip.y} r="12" fill={theme.penGlow} />
            <circle
              cx={penTip.x}
              cy={penTip.y}
              r="5.8"
              fill={theme.penCore}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </g>
        )}

        {/* Numbered stroke points */}
        {showStrokeNumbers &&
          strokePoints.map((pt, idx) => {
            const isCurrent = idx === activeStrokeIdx;
            const isDone = idx < activeStrokeIdx;
            const baseColor = theme.useColorfulBaseStrokes
              ? HAEBOL_STROKE_COLORS[idx % HAEBOL_STROKE_COLORS.length]
              : '#64748B';
            return (
              <g key={`num-${idx}`}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isCurrent ? 9.5 : 8}
                  fill={isCurrent || isDone ? theme.activeStroke : baseColor}
                  stroke="#FFFFFF"
                  strokeWidth="1.8"
                />
                <text
                  x={pt.x}
                  y={pt.y + 3.4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="9.5"
                  fontWeight="900"
                >
                  {idx + 1}
                </text>
              </g>
            );
          })}
      </svg>
    </div>
  );

  const subtitleText =
    showSubtitle && lang !== 'ko'
      ? `[${card.sampleWordRomaja}] · ${card.meanings[lang]}`
      : `[${card.sampleWordRomaja}]`;

  if (isVertical) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-between select-none ${
          isFullscreen ? 'px-4 py-5 gap-3' : 'px-3 py-3 gap-2'
        }`}
        style={{ backgroundColor: theme.bg }}
      >
        {/* Top Hook Headline (Shorts Safe Zone) */}
        {hasTopHook && (
          <div className="w-full text-center px-1 shrink-0 pt-0.5">
            <div
              className={`font-black leading-tight tracking-tight break-keep text-balance ${
                isFullscreen ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'
              }`}
              style={{ color: theme.hookText }}
            >
              {cleanTopHook}
            </div>
          </div>
        )}

        {/* Outer Haebol Signature Flashcard (#FFFBEB + amber border) */}
        <div
          className={`w-full flex-1 min-h-0 rounded-2xl border-3 flex flex-col items-center justify-between text-center shadow-[0_10px_28px_rgba(217,119,6,0.12)] ${
            isFullscreen ? 'px-4 py-3.5' : 'px-3 py-2.5'
          }`}
          style={{
            backgroundColor: theme.surfaceBg,
            borderColor: theme.surfaceBorder,
          }}
        >
          {/* Card Header Bar */}
          <div
            className="w-full flex items-center justify-between gap-2 pb-1.5 border-b shrink-0"
            style={{ borderColor: theme.gridLine }}
          >
            <span
              className="px-2 py-0.5 rounded-sm text-[11px] font-black shrink-0"
              style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
            >
              {groupBadge}
            </span>
            {showWatermark && (
              <span
                className="text-[10px] sm:text-xs font-extrabold truncate"
                style={{ color: theme.subColor }}
              >
                {copy.brand} · {copy.strokeSeriesName}
              </span>
            )}
          </div>

          {/* Center Handwriting Box + Letter Name & Romaja */}
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-2 py-1.5 min-h-0">
            {renderSvgBox()}

            <div className="flex flex-col items-center gap-1">
              <div
                className={
                  isFullscreen
                    ? hasAnyHook
                      ? 'text-3xl font-black leading-none'
                      : 'text-4xl font-black leading-none'
                    : hasAnyHook
                    ? 'text-xl font-black leading-none'
                    : 'text-2xl font-black leading-none'
                }
                style={{ color: theme.titleColor, fontFamily: HAEBOL_HAND_FONT }}
              >
                {card.name}
              </div>
              <div
                className="px-2.5 py-0.5 rounded-sm border text-[11px] sm:text-xs font-black"
                style={{
                  backgroundColor: theme.romajaBg,
                  color: theme.romajaText,
                  borderColor: theme.romajaBorder,
                }}
              >
                {card.romaja} · {copy.strokesUnit(strokes.length)}
              </div>
            </div>
          </div>

          {/* Sample Word Card */}
          <div className="w-full flex flex-col items-center gap-1 shrink-0">
            <div
              className={`w-full rounded-xl border-2 shadow-2xs ${
                isFullscreen ? 'px-3 py-2' : 'px-2.5 py-1.5'
              }`}
              style={{
                backgroundColor: theme.wordCardBg,
                borderColor: theme.wordCardBorder,
              }}
            >
              <div
                className={
                  isFullscreen
                    ? hasAnyHook
                      ? 'text-2xl font-black leading-tight'
                      : 'text-3xl font-black leading-tight'
                    : 'text-lg font-black leading-tight'
                }
                style={{ color: theme.titleColor, fontFamily: HAEBOL_HAND_FONT }}
              >
                {card.sampleWord}
              </div>
              <div
                className={isFullscreen ? 'text-xs sm:text-sm font-bold mt-0.5' : 'text-[10px] font-bold mt-0.5'}
                style={{ color: theme.subColor }}
              >
                {subtitleText}
              </div>
            </div>

            {!hasBottomCta ? (
              <div
                className={isFullscreen ? 'text-xs font-bold opacity-85 pt-0.5' : 'text-[10px] font-bold opacity-85'}
                style={{ color: theme.subColor }}
              >
                {copy.followAlongCta}
                {cards.length > 1 ? ` · ${currentIndex + 1}/${cards.length}` : ''}
              </div>
            ) : (
              cards.length > 1 && (
                <div
                  className="text-[10px] font-black tabular-nums opacity-80"
                  style={{ color: theme.subColor }}
                >
                  {currentIndex + 1} / {cards.length}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom High-Contrast CTA Strip (Shorts Safe Zone) */}
        {hasBottomCta && (
          <div
            className={`w-full rounded-xl text-center font-black leading-snug break-keep text-balance shrink-0 ${
              isFullscreen ? 'px-4 py-2.5 text-sm sm:text-base mb-1' : 'px-3 py-2 text-[11px] sm:text-xs'
            }`}
            style={{
              backgroundColor: theme.ctaBg,
              color: theme.ctaText,
            }}
          >
            {cleanBottomCta}
          </div>
        )}
      </div>
    );
  }

  // 16:9 Widescreen Main Stage (Haebol Flashcard + Optional Top Hook & Bottom CTA)
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-between select-none ${
        isFullscreen ? 'px-6 py-4 gap-2.5' : 'px-4 py-3 gap-2'
      }`}
      style={{ backgroundColor: theme.bg }}
    >
      {hasTopHook && (
        <div
          className={`w-full text-center font-black leading-tight tracking-tight break-keep text-balance shrink-0 ${
            isFullscreen ? 'text-2xl sm:text-3xl' : 'text-sm sm:text-base'
          }`}
          style={{ color: theme.hookText }}
        >
          {cleanTopHook}
        </div>
      )}

      <div
        className="w-full flex-1 min-h-0 rounded-2xl border-3 flex flex-col justify-between px-5 sm:px-7 py-3 shadow-[0_10px_28px_rgba(217,119,6,0.12)]"
        style={{
          backgroundColor: theme.surfaceBg,
          borderColor: theme.surfaceBorder,
        }}
      >
        <div
          className="flex items-center justify-between pb-1.5 border-b shrink-0"
          style={{ borderColor: theme.gridLine }}
        >
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-sm text-xs font-black"
              style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
            >
              {groupBadge}
            </span>
            {showWatermark && (
              <span
                className={isFullscreen ? 'text-base font-extrabold' : 'text-xs font-extrabold'}
                style={{ color: theme.subColor }}
              >
                {copy.brand} · {copy.strokeSeriesName}
              </span>
            )}
          </div>
          {cards.length > 1 && (
            <span
              className={isFullscreen ? 'text-base font-black tabular-nums' : 'text-xs font-black tabular-nums'}
              style={{ color: theme.subColor }}
            >
              {currentIndex + 1} / {cards.length}
            </span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center gap-6 sm:gap-10 min-h-0 py-1.5">
          <div className="flex-shrink-0 flex items-center justify-center">{renderSvgBox()}</div>

          <div className="flex-1 flex flex-col items-center text-center gap-2 max-w-md">
            <div
              className={
                isFullscreen
                  ? hasAnyHook
                    ? 'text-5xl font-black leading-none'
                    : 'text-6xl font-black leading-none'
                  : hasAnyHook
                  ? 'text-3xl font-black leading-none'
                  : 'text-4xl font-black leading-none'
              }
              style={{ color: theme.titleColor, fontFamily: HAEBOL_HAND_FONT }}
            >
              {card.name}
            </div>
            <div
              className="px-3.5 py-1 rounded-sm border text-xs sm:text-base font-black"
              style={{
                backgroundColor: theme.romajaBg,
                color: theme.romajaText,
                borderColor: theme.romajaBorder,
              }}
            >
              {card.romaja} · {copy.strokesUnit(strokes.length)}
            </div>

            <div
              className="w-full rounded-xl border-2 px-4 py-2.5 mt-0.5 shadow-2xs"
              style={{
                backgroundColor: theme.wordCardBg,
                borderColor: theme.wordCardBorder,
              }}
            >
              <div
                className={isFullscreen ? 'text-4xl font-black' : 'text-xl font-black'}
                style={{ color: theme.titleColor, fontFamily: HAEBOL_HAND_FONT }}
              >
                {card.sampleWord}
              </div>
              <div
                className={isFullscreen ? 'text-base font-bold mt-0.5' : 'text-xs font-bold mt-0.5'}
                style={{ color: theme.subColor }}
              >
                {subtitleText}
              </div>
            </div>

            {!hasBottomCta && (
              <div
                className={isFullscreen ? 'text-sm font-bold mt-0.5' : 'text-[11px] font-bold mt-0.5'}
                style={{ color: theme.subColor }}
              >
                {copy.followAlongCta}
              </div>
            )}
          </div>
        </div>
      </div>

      {hasBottomCta && (
        <div
          className={`w-full rounded-xl text-center font-black leading-snug break-keep shrink-0 ${
            isFullscreen ? 'px-5 py-2 text-lg' : 'px-3 py-1.5 text-xs'
          }`}
          style={{
            backgroundColor: theme.ctaBg,
            color: theme.ctaText,
          }}
        >
          {cleanBottomCta}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// MAIN YOUTUBE STUDIO TAB COMPONENT (HANGEUL STROKE ORDER DEDICATED)
// ============================================================================

export const AdminYoutubeStudioTab: React.FC = () => {
  // Core Format / Language / Sub-Workspace
  const [aspect, setAspect] = useState<YoutubeAspectRatio>('9:16');
  const [lang, setLang] = useState<AdminSummaryLang>('ko');
  const [subPanel, setSubPanel] = useState<StudioSubPanel>('stage');

  // Stroke Studio State
  const strokeGroups = useMemo(
    () => HANGEUL_GROUPS.filter((g) => (STROKE_GROUP_IDS as readonly string[]).includes(g.id)),
    []
  );
  const [selectedGroupId, setSelectedGroupId] = useState<string>(strokeGroups[0]?.id || 'basic_consonants');
  const activeStrokeGroup = useMemo(
    () => strokeGroups.find((g) => g.id === selectedGroupId) || strokeGroups[0],
    [strokeGroups, selectedGroupId]
  );
  const [strokeScope, setStrokeScope] = useState<StrokeScope>('single');
  const [selectedCardIdx, setSelectedCardIdx] = useState<number>(0);

  const activeStrokeCards = useMemo(() => {
    const allCards = activeStrokeGroup?.cards || [];
    if (strokeScope === 'single') {
      const card = allCards[selectedCardIdx] || allCards[0];
      return card ? [card] : [];
    }
    return allCards;
  }, [activeStrokeGroup, strokeScope, selectedCardIdx]);

  // Stroke Playback Settings (Default: Haebol Original!)
  const [strokeThemeId, setStrokeThemeId] = useState<StrokeStageThemeId>('haebol');
  const [secPerStroke, setSecPerStroke] = useState<number>(1.05);
  const [pauseAfterCardSec, setPauseAfterCardSec] = useState<number>(1.6);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);
  const [showStrokeNumbers, setShowStrokeNumbers] = useState<boolean>(true);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(true);
  const [showWatermark, setShowWatermark] = useState<boolean>(true);

  // Top Hook & Bottom CTA Overlay State (8-Language Auto Presets + Manual Edit Protection)
  const [showHookOverlay, setShowHookOverlay] = useState<boolean>(true);
  const [hookPresetStyle, setHookPresetStyle] = useState<StrokeHookPresetStyle>('viral');
  const [isHookCustomized, setIsHookCustomized] = useState<boolean>(false);

  const autoHookPreset = useMemo(
    () =>
      buildStrokeHookPreset({
        lang,
        scope: strokeScope,
        card: activeStrokeCards[0],
        groupTitleKo: activeStrokeGroup?.titleKo,
        groupBadge: activeStrokeGroup?.badge,
        groupCount: activeStrokeGroup?.cards.length || 0,
        style: hookPresetStyle,
      }),
    [lang, strokeScope, activeStrokeCards, activeStrokeGroup, hookPresetStyle]
  );

  const [topHookText, setTopHookText] = useState<string>(() => autoHookPreset.topHook);
  const [bottomCtaText, setBottomCtaText] = useState<string>(() => autoHookPreset.bottomCta);

  // Keep hook synced with auto preset unless user manually customized it
  useEffect(() => {
    if (!isHookCustomized) {
      setTopHookText(autoHookPreset.topHook);
      setBottomCtaText(autoHookPreset.bottomCta);
    }
  }, [autoHookPreset, isHookCustomized]);

  // Live Stroke Animation State
  const [isPlayingStroke, setIsPlayingStroke] = useState<boolean>(false);
  const [playCardIdx, setPlayCardIdx] = useState<number>(0);
  const [activeStrokeIdx, setActiveStrokeIdx] = useState<number>(99);
  const [activeStrokeProgress, setActiveStrokeProgress] = useState<number>(1);
  const rafRef = useRef<number | null>(null);

  // WebM Direct Recorder State
  const [isRecordingWebm, setIsRecordingWebm] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<{ currentIndex: number; total: number; percent: number } | null>(null);
  const [recordError, setRecordError] = useState<string | null>(null);
  const recordAbortRef = useRef<AbortController | null>(null);

  // Fullscreen Clean Recording Overlay State (Button-Free Mobile Screen Recording!)
  const [isCleanFullscreen, setIsCleanFullscreen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showFsControls, setShowFsControls] = useState<boolean>(false);
  const fsHideTimerRef = useRef<number | null>(null);

  // Thumbnail Studio State (Default: Haebol Original!)
  const [thumbThemeId, setThumbThemeId] = useState<YoutubeThumbThemeId>('haebol');
  const [thumbBadge, setThumbBadge] = useState<string>('한글 획순 마스터');
  const [thumbHeadline, setThumbHeadline] = useState<string>("한글 'ㄱ' 기역\n예쁘게 쓰는 획순!");
  const [thumbSubline, setThumbSubline] = useState<string>('따라 쓰면서 발음까지 한 번에 끝!');
  const [isSavingThumb, setIsSavingThumb] = useState<boolean>(false);
  const thumbCaptureRef = useRef<HTMLDivElement | null>(null);

  // Upload Package & SRT State
  const [selectedTitleIdx, setSelectedTitleIdx] = useState<number>(0);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');
  const [editedPinnedComment, setEditedPinnedComment] = useState<string>('');
  const [editedTags, setEditedTags] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isBatchSrtBusy, setIsBatchSrtBusy] = useState<boolean>(false);

  // Keep selectedCardIdx safe when group changes
  useEffect(() => {
    setSelectedCardIdx(0);
    setPlayCardIdx(0);
    setIsPlayingStroke(false);
    setActiveStrokeIdx(99);
    setActiveStrokeProgress(1);
  }, [selectedGroupId]);

  // Sync Thumbnail copy automatically on card/group/lang change
  useEffect(() => {
    const card = activeStrokeCards[0];
    if (strokeScope === 'single' && card) {
      setThumbBadge('한글 획순 1분 완성');
      setThumbHeadline(`한글 '${card.char}' (${card.name})\n획순 따라쓰기!`);
      setThumbSubline(
        `${card.romaja} · ${card.sampleWord}${lang !== 'ko' ? ` (${card.meanings[lang]})` : ' 발음 연습'}`
      );
    } else {
      setThumbBadge('초급 필수 획순');
      setThumbHeadline(`${activeStrokeGroup?.badge || '한글'} 획순\n한 번에 끝내기!`);
      setThumbSubline(activeStrokeGroup?.titleKo.replace(/^[①-④]\s*/, '') || '한글 자음·모음 획순 따라쓰기');
    }
  }, [strokeScope, activeStrokeCards, activeStrokeGroup, lang]);

  // Build Upload Package whenever core selection changes
  const generatedPackage = useMemo(
    () =>
      buildYoutubeUploadPackage({
        aspect,
        lang,
        strokeGroupTitle: activeStrokeGroup?.titleKo.replace(/^[①-④]\s*/, ''),
        strokeCards: activeStrokeCards,
        secPerStroke,
        pauseAfterCardSec,
      }),
    [aspect, lang, activeStrokeGroup, activeStrokeCards, secPerStroke, pauseAfterCardSec]
  );

  useEffect(() => {
    setSelectedTitleIdx(0);
    setEditedTitle(generatedPackage.titles[0]?.text || '');
    setEditedDescription(generatedPackage.description);
    setEditedPinnedComment(generatedPackage.pinnedComment);
    setEditedTags(generatedPackage.tags);
  }, [generatedPackage]);

  // Generated SRT preview for active language
  const activeSrtContent = useMemo(
    () => buildStrokeSrt(activeStrokeCards, lang, secPerStroke, pauseAfterCardSec),
    [activeStrokeCards, lang, secPerStroke, pauseAfterCardSec]
  );

  const totalEstimatedSec = useMemo(
    () =>
      Math.round(
        activeStrokeCards.reduce(
          (sum, c) => sum + getStrokeCardDurationSec(c, secPerStroke, pauseAfterCardSec),
          0
        )
      ),
    [activeStrokeCards, secPerStroke, pauseAfterCardSec]
  );

  // ============================================================================
  // LIVE STROKE PLAYBACK LOOP (RAF)
  // ============================================================================

  const stopStrokePlayback = useCallback(() => {
    setIsPlayingStroke(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const startStrokePlayback = useCallback(() => {
    if (activeStrokeCards.length === 0) return;
    stopStrokePlayback();
    setPlayCardIdx(0);
    setActiveStrokeIdx(-1);
    setActiveStrokeProgress(0);
    setIsPlayingStroke(true);
  }, [activeStrokeCards.length, stopStrokePlayback]);

  useEffect(() => {
    if (!isPlayingStroke || activeStrokeCards.length === 0) return;

    let cardIndex = 0;
    let cardStartTime = performance.now();
    let spokenCharForIdx = -1;
    let spokenWordForIdx = -1;

    const leadInMs = 420;
    const strokeMs = Math.max(400, secPerStroke * 1000);
    const pauseMs = Math.max(600, pauseAfterCardSec * 1000);

    const tick = (now: number) => {
      const card = activeStrokeCards[cardIndex];
      if (!card) {
        setIsPlayingStroke(false);
        return;
      }

      const strokeCount = Math.max(1, card.strokes?.length || 1);
      const drawTotalMs = strokeCount * strokeMs;
      const cardTotalMs = leadInMs + drawTotalMs + pauseMs;
      const elapsed = now - cardStartTime;

      setPlayCardIdx(cardIndex);

      if (audioEnabled && spokenCharForIdx !== cardIndex && elapsed >= 120) {
        spokenCharForIdx = cardIndex;
        speakKorean(card.name);
      }

      if (elapsed < leadInMs) {
        setActiveStrokeIdx(-1);
        setActiveStrokeProgress(0);
      } else if (elapsed < leadInMs + drawTotalMs) {
        const drawElapsed = elapsed - leadInMs;
        const sIdx = Math.floor(drawElapsed / strokeMs);
        const sProg = Math.min(1, (drawElapsed % strokeMs) / strokeMs);
        setActiveStrokeIdx(sIdx);
        setActiveStrokeProgress(sProg);
      } else {
        setActiveStrokeIdx(strokeCount);
        setActiveStrokeProgress(1);
        if (audioEnabled && spokenWordForIdx !== cardIndex) {
          spokenWordForIdx = cardIndex;
          speakKorean(card.sampleWord);
        }
      }

      if (elapsed >= cardTotalMs) {
        if (cardIndex + 1 < activeStrokeCards.length) {
          cardIndex += 1;
          cardStartTime = now;
        } else {
          setIsPlayingStroke(false);
          rafRef.current = null;
          return;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isPlayingStroke, activeStrokeCards, secPerStroke, pauseAfterCardSec, audioEnabled]);

  // Escape key closes Clean Fullscreen Recording Overlay
  useEffect(() => {
    if (!isCleanFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopStrokePlayback();
        setCountdown(null);
        setShowFsControls(false);
        setIsCleanFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCleanFullscreen, stopStrokePlayback]);

  useEffect(() => {
    return () => {
      if (fsHideTimerRef.current !== null) {
        window.clearTimeout(fsHideTimerRef.current);
      }
    };
  }, []);

  // Countdown handler for Clean Fullscreen
  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      setCountdown(null);
      setShowFsControls(false);
      startStrokePlayback();
      return;
    }
    const timer = window.setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 850);
    return () => window.clearTimeout(timer);
  }, [countdown, startStrokePlayback]);

  const revealFullscreenControlsBriefly = useCallback(() => {
    setShowFsControls(true);
    if (fsHideTimerRef.current !== null) {
      window.clearTimeout(fsHideTimerRef.current);
    }
    fsHideTimerRef.current = window.setTimeout(() => {
      setShowFsControls(false);
      fsHideTimerRef.current = null;
    }, 3500);
  }, []);

  const handleOpenCleanFullscreen = () => {
    playCutePop();
    stopStrokePlayback();
    setShowFsControls(false);
    setIsCleanFullscreen(true);
    setCountdown(3);
  };

  // Handle language change (also refreshes auto hook preset!)
  const handleChangeLang = (nextLang: AdminSummaryLang) => {
    setLang(nextLang);
    setIsHookCustomized(false);
  };

  // Handle tone preset button click
  const handleSelectHookStyle = (style: StrokeHookPresetStyle) => {
    playCutePop();
    setHookPresetStyle(style);
    setIsHookCustomized(false);
  };

  const handleResetHookPreset = () => {
    playCutePop();
    setIsHookCustomized(false);
    setTopHookText(autoHookPreset.topHook);
    setBottomCtaText(autoHookPreset.bottomCta);
  };

  // Direct WebM Stroke Video Recorder (with Top Hook & Bottom CTA synced!)
  const handleRecordStrokeWebm = async () => {
    if (activeStrokeCards.length === 0 || isRecordingWebm) return;
    playCutePop();
    stopStrokePlayback();
    setRecordError(null);
    setIsRecordingWebm(true);
    setRecordProgress({ currentIndex: 1, total: activeStrokeCards.length, percent: 0 });

    const controller = new AbortController();
    recordAbortRef.current = controller;

    const suffix =
      strokeScope === 'single'
        ? activeStrokeCards[0].char
        : activeStrokeGroup?.id || 'group';
    const ratioTag = aspect === '9:16' ? 'shorts_9x16' : 'main_16x9';
    const fileName = `haebol_stroke_${suffix}_${ratioTag}_${lang}.webm`;

    try {
      await recordStrokeVideoWebm({
        cards: activeStrokeCards,
        groupBadge: activeStrokeGroup?.badge || '한글',
        aspect,
        lang,
        themeId: strokeThemeId,
        secPerStroke,
        pauseAfterCardSec,
        showStrokeNumbers,
        showSubtitle,
        showWatermark,
        showHookOverlay,
        topHookText,
        bottomCtaText,
        fileName,
        signal: controller.signal,
        onProgress: (info) => setRecordProgress(info),
      });
    } catch (err) {
      if (!controller.signal.aborted) {
        setRecordError(
          err instanceof Error ? err.message : '영상 녹화 중 오류가 발생했습니다.'
        );
      }
    } finally {
      setIsRecordingWebm(false);
      setRecordProgress(null);
      recordAbortRef.current = null;
    }
  };

  const handleCancelWebmRecord = () => {
    recordAbortRef.current?.abort();
  };

  // Thumbnail PNG Download
  const handleDownloadThumbnail = async () => {
    const node = thumbCaptureRef.current;
    if (!node || isSavingThumb) return;
    playCutePop();
    setIsSavingThumb(true);
    try {
      const width = aspect === '9:16' ? 1080 : 1280;
      const height = aspect === '9:16' ? 1920 : 720;
      const tag =
        strokeScope === 'single'
          ? `stroke_${activeStrokeCards[0]?.char || 'char'}`
          : `stroke_${activeStrokeGroup?.id || 'group'}`;
      const ratioTag = aspect === '9:16' ? 'shorts_1080x1920' : 'thumb_1280x720';
      await captureNodeToPng(node, `haebol_yt_${tag}_${ratioTag}_${lang}.png`, {
        width,
        height,
        backgroundColor: '#FFF5F8',
      });
    } finally {
      setIsSavingThumb(false);
    }
  };

  // Copy helper
  const handleCopyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      playCutePop();
      window.setTimeout(() => setCopiedKey(null), 1600);
    } catch {
      // Ignore clipboard failure
    }
  };

  // Single & Batch 8-Language SRT Downloads
  const handleDownloadSingleSrt = (targetLang: AdminSummaryLang) => {
    playCutePop();
    const srt = buildStrokeSrt(activeStrokeCards, targetLang, secPerStroke, pauseAfterCardSec);
    const tag =
      strokeScope === 'single'
        ? `stroke_${activeStrokeCards[0]?.char || 'char'}`
        : `stroke_${activeStrokeGroup?.id || 'group'}`;
    triggerTextFileDownload(srt, `haebol_${tag}_${targetLang}.srt`, 'application/x-subrip;charset=utf-8');
  };

  const handleDownloadAll8Srt = async () => {
    if (isBatchSrtBusy) return;
    playCutePop();
    setIsBatchSrtBusy(true);
    try {
      for (const l of ADMIN_SUMMARY_LANGUAGES) {
        handleDownloadSingleSrt(l.code);
        await new Promise((r) => window.setTimeout(r, 220));
      }
    } finally {
      setIsBatchSrtBusy(false);
    }
  };

  const handleDownloadUploadTxt = () => {
    playCutePop();
    const content = [
      '=== [제목] ===',
      editedTitle,
      '',
      '=== [설명란 + 챕터 타임스탬프] ===',
      editedDescription,
      '',
      '=== [고정 댓글 (블로그 총정리표 유입)] ===',
      editedPinnedComment,
      '',
      '=== [유튜브 태그] ===',
      editedTags,
    ].join('\n');
    const tag =
      strokeScope === 'single'
        ? `stroke_${activeStrokeCards[0]?.char || 'char'}`
        : `stroke_${activeStrokeGroup?.id || 'group'}`;
    triggerTextFileDownload(content, `haebol_yt_upload_${tag}_${lang}.txt`);
  };

  const tagCharCount = editedTags.length;
  const tagOverLimit = tagCharCount > 500;

  return (
    <div className="space-y-5">
      {/* ==================================================================== */}
      {/* TOP CONTROL BAR: Aspect Ratio + Language + Sub-Workspace Tabs        */}
      {/* ==================================================================== */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-black text-slate-900">
              학습 한국어 유튜브 스튜디오 · 한글 획순 따라쓰기 (40자)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              해볼 오리지널 플래시카드 + 8개국어 상·하단 후킹 문구 · 무버튼 전체화면 촬영 · .webm 저장 · 썸네일 · 자막
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
            <span>예상 길이 약 {totalEstimatedSec}초</span>
            <span aria-hidden="true">·</span>
            <span>{aspect === '9:16' ? '1080×1920 세로 쇼츠' : '1920×1080 가로 본영상'}</span>
          </div>
        </div>

        {/* Row 1: Sub-Workspace Navigation + Aspect Ratio + 8-Language Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'stage', label: '01. 클린 촬영 무대 · 영상 저장', icon: Video },
                { id: 'thumbnail', label: '02. 유튜브 썸네일 생성기 (PNG)', icon: ImageIcon },
                { id: 'package', label: '03. 8개국어 자막(.srt) · 업로드 패키지', icon: Subtitles },
              ] as { id: StudioSubPanel; label: string; icon: React.ComponentType<{ className?: string }> }[]
            ).map((tab) => {
              const Icon = tab.icon;
              const active = subPanel === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setSubPanel(tab.id);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setAspect('9:16');
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-black flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  aspect === '9:16'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>쇼츠 (9:16)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setAspect('16:9');
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-black flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  aspect === '16:9'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>본영상 (16:9)</span>
              </button>
            </div>

            <select
              value={lang}
              onChange={(e) => handleChangeLang(e.target.value as AdminSummaryLang)}
              aria-label="자막 및 후킹 문구 언어 선택"
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800 cursor-pointer"
            >
              {ADMIN_SUMMARY_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.labelKo} ({l.nativeName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SUB-PANEL 1: HAEBOL ORIGINAL STROKE STAGE & WEBM EXPORT              */}
      {/* ==================================================================== */}
      {subPanel === 'stage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Zone: Interactive Recording Preview Stage (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center gap-4">
            <div className="w-full flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">
                해볼 오리지널 촬영 미리보기 ({aspect === '9:16' ? '쇼츠 세로 9:16' : '본영상 가로 16:9'})
              </span>
              <span className="tabular-nums text-slate-400">
                {strokeScope === 'single'
                  ? `1자 선택 · ${activeStrokeCards[0]?.char || ''}`
                  : `${activeStrokeGroup?.titleKo.replace(/^[①-④]\s*/, '')} (${activeStrokeCards.length}자 연속)`}
              </span>
            </div>

            <div
              className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-[#FFF5F8] w-full"
              style={
                aspect === '9:16'
                  ? { maxWidth: '330px', aspectRatio: '9 / 16' }
                  : { maxWidth: '680px', aspectRatio: '16 / 9' }
              }
            >
              <LiveStrokeStage
                cards={activeStrokeCards}
                groupBadge={activeStrokeGroup?.badge || '한글'}
                currentIndex={Math.min(playCardIdx, Math.max(0, activeStrokeCards.length - 1))}
                activeStrokeIdx={activeStrokeIdx}
                activeStrokeProgress={activeStrokeProgress}
                aspect={aspect}
                lang={lang}
                themeId={strokeThemeId}
                showStrokeNumbers={showStrokeNumbers}
                showSubtitle={showSubtitle}
                showWatermark={showWatermark}
                showHookOverlay={showHookOverlay}
                topHookText={topHookText}
                bottomCtaText={bottomCtaText}
              />
            </div>

            {/* Stage Action Buttons */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  if (isPlayingStroke) {
                    stopStrokePlayback();
                  } else {
                    startStrokePlayback();
                  }
                }}
                className={`px-4 py-2.5 rounded-lg text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  isPlayingStroke
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white'
                }`}
              >
                {isPlayingStroke ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>미리보기 정지</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>자동 재생 미리보기</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenCleanFullscreen}
                className="px-4 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>무버튼 전체화면 촬영 (폰 화면녹화 추천)</span>
              </button>

              {isRecordingWebm ? (
                <button
                  type="button"
                  onClick={handleCancelWebmRecord}
                  className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>
                    저장 중 {recordProgress?.currentIndex}/{recordProgress?.total} ({recordProgress?.percent}%) · 취소
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRecordStrokeWebm}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>무음 영상(.webm) 파일 다운로드</span>
                </button>
              )}
            </div>

            {recordError && (
              <div className="w-full rounded-lg bg-rose-950/80 border border-rose-700 px-3 py-2 text-xs text-rose-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{recordError}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 text-center leading-relaxed max-w-lg">
              <strong className="text-amber-300">추천 촬영법:</strong> <strong className="text-slate-200">무버튼 전체화면 촬영</strong>을 누르고 휴대폰 상단바 <strong className="text-slate-200">화면 녹화(미디어 소리 포함)</strong>로 찍으면 상·하단 후킹 문구와 한국어 발음까지 갤러리에 바로 저장됩니다. (화면 터치 시 종료 버튼 표시)
            </p>
          </div>

          {/* Right Zone: Control Deck (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4">
            {/* 1. Hangeul Group Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700">1. 한글 획순 그룹 선택 (40자)</label>
              <div className="grid grid-cols-2 gap-1.5">
                {strokeGroups.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setSelectedGroupId(g.id);
                    }}
                    className={`px-2.5 py-2 rounded-lg text-xs font-bold border text-left transition-colors cursor-pointer ${
                      selectedGroupId === g.id
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {g.titleKo.replace(/^[①-④]\s*/, '')}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Single vs Group Scope */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700">2. 촬영 범위</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    stopStrokePlayback();
                    setStrokeScope('single');
                    setPlayCardIdx(0);
                    setActiveStrokeIdx(99);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-black border cursor-pointer transition-colors ${
                    strokeScope === 'single'
                      ? 'bg-rose-50 text-rose-700 border-rose-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  단일 글자 1개 (쇼츠 추천)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    stopStrokePlayback();
                    setStrokeScope('group');
                    setPlayCardIdx(0);
                    setActiveStrokeIdx(99);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-black border cursor-pointer transition-colors ${
                    strokeScope === 'group'
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  그룹 전체 연속 ({activeStrokeGroup?.cards.length || 0}자)
                </button>
              </div>
            </div>

            {/* 3. Letter Picker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-700">
                  {strokeScope === 'single' ? '3. 글자 선택' : '3. 포함 글자 미리보기'}
                </label>
                <span className="text-[11px] text-slate-500">
                  선택: {activeStrokeGroup?.cards[selectedCardIdx]?.char} ({activeStrokeGroup?.cards[selectedCardIdx]?.name})
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(activeStrokeGroup?.cards || []).map((c, idx) => {
                  const isSelected =
                    strokeScope === 'single'
                      ? selectedCardIdx === idx
                      : playCardIdx === idx;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        playCutePop();
                        stopStrokePlayback();
                        setSelectedCardIdx(idx);
                        if (strokeScope === 'group') setPlayCardIdx(idx);
                        setActiveStrokeIdx(99);
                        setActiveStrokeProgress(1);
                      }}
                      className={`w-9 h-9 rounded-lg text-sm font-black border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#441A75] text-white border-[#441A75]'
                          : 'bg-[#FFFBEB] text-slate-800 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {c.char}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Top Hook & Bottom CTA Overlay Controls (8-Language Auto Presets + Manual Edit) */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-xs font-black text-slate-900 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showHookOverlay}
                    onChange={(e) => setShowHookOverlay(e.target.checked)}
                    className="rounded accent-[#441A75]"
                  />
                  <span>4. 상·하단 후킹 & CTA 문구 (WebM 동시 반영)</span>
                </label>
                {showHookOverlay && (
                  <button
                    type="button"
                    onClick={handleResetHookPreset}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>프리셋 복원</span>
                  </button>
                )}
              </div>

              {showHookOverlay && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {STROKE_HOOK_STYLE_META.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectHookStyle(item.id)}
                          className={`px-2.5 py-1.5 rounded-md text-[11px] font-black border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            hookPresetStyle === item.id && !isHookCustomized
                              ? 'bg-[#441A75] text-white border-[#441A75]'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
                        <label htmlFor="stroke-top-hook">상단 후킹 타이틀</label>
                        <span className="text-slate-400">
                          {isHookCustomized ? '직접 수정됨' : '8개국어 자동 프리셋'}
                        </span>
                      </div>
                      <input
                        id="stroke-top-hook"
                        type="text"
                        value={topHookText}
                        onChange={(e) => {
                          setTopHookText(e.target.value);
                          setIsHookCustomized(true);
                        }}
                        placeholder="예: 딱 5초! 한글 'ㄱ' 예쁘게 쓰는 획순"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-[#441A75] focus:outline-none text-xs font-bold text-slate-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="stroke-bottom-cta" className="block text-[11px] font-bold text-slate-600 mb-1">
                        하단 CTA 문구 (비워두면 숨김)
                      </label>
                      <input
                        id="stroke-bottom-cta"
                        type="text"
                        value={bottomCtaText}
                        onChange={(e) => {
                          setBottomCtaText(e.target.value);
                          setIsHookCustomized(true);
                        }}
                        placeholder="예: 무료 한글 총정리표 PDF는 댓글 링크에서!"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-[#441A75] focus:outline-none text-xs font-bold text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Stage Theme */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-black text-slate-700">5. 카드 스타일 테마</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(STROKE_STAGE_THEMES) as StrokeStageThemeId[]).map((tid) => {
                  const t = STROKE_STAGE_THEMES[tid];
                  return (
                    <button
                      key={tid}
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setStrokeThemeId(tid);
                      }}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold border flex items-center gap-2 cursor-pointer transition-colors ${
                        strokeThemeId === tid
                          ? 'border-slate-900 bg-slate-100 text-slate-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-sm border border-slate-300 shrink-0"
                        style={{ backgroundColor: t.surfaceBg }}
                      />
                      <span className="truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Speed & Pause Sliders */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>획 그리기 속도</span>
                  <span className="tabular-nums text-slate-900">{secPerStroke.toFixed(2)}초 / 획</span>
                </div>
                <input
                  type="range"
                  min={0.6}
                  max={2.0}
                  step={0.05}
                  value={secPerStroke}
                  onChange={(e) => setSecPerStroke(parseFloat(e.target.value))}
                  className="w-full accent-[#441A75] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>글자 완성 후 멈춤 시간</span>
                  <span className="tabular-nums text-slate-900">{pauseAfterCardSec.toFixed(1)}초</span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={3.0}
                  step={0.2}
                  value={pauseAfterCardSec}
                  onChange={(e) => setPauseAfterCardSec(parseFloat(e.target.value))}
                  className="w-full accent-[#441A75] cursor-pointer"
                />
              </div>
            </div>

            {/* Display Option Checkboxes */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={audioEnabled}
                  onChange={(e) => setAudioEnabled(e.target.checked)}
                  className="rounded accent-[#441A75]"
                />
                <span>한국어 발음 자동 읽기</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showStrokeNumbers}
                  onChange={(e) => setShowStrokeNumbers(e.target.checked)}
                  className="rounded accent-[#441A75]"
                />
                <span>획순 번호 (①②③)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showSubtitle}
                  onChange={(e) => setShowSubtitle(e.target.checked)}
                  className="rounded accent-[#441A75]"
                />
                <span>다국어 뜻 자막</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                  className="rounded accent-[#441A75]"
                />
                <span>채널 워터마크</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SUB-PANEL 2: YOUTUBE THUMBNAIL GENERATOR (1280x720 & 1080x1920)      */}
      {/* ==================================================================== */}
      {subPanel === 'thumbnail' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7 bg-slate-950 rounded-xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">
                썸네일 미리보기 ({aspect === '9:16' ? '쇼츠 커버 1080×1920' : '본영상 썸네일 1280×720'})
              </span>
              <button
                type="button"
                onClick={handleDownloadThumbnail}
                disabled={isSavingThumb}
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-60"
              >
                {isSavingThumb ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>고화질 PNG 생성 중...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>고화질 PNG 저장</span>
                  </>
                )}
              </button>
            </div>

            <div className={aspect === '9:16' ? 'max-w-[340px] mx-auto' : 'w-full'}>
              <ScaledPreviewFrame
                targetWidth={aspect === '9:16' ? 1080 : 1280}
                fixedHeight={aspect === '9:16' ? 1920 : 720}
                className="rounded-lg shadow-2xl border border-slate-800"
              >
                <YoutubeThumbnailCard
                  aspect={aspect}
                  lang={lang}
                  themeId={thumbThemeId}
                  badgeText={thumbBadge}
                  headline={thumbHeadline}
                  subline={thumbSubline}
                  strokeCard={activeStrokeCards[0]}
                />
              </ScaledPreviewFrame>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700">1. 컬러 테마 프리셋</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(YOUTUBE_THUMB_THEMES) as YoutubeThumbThemeId[]).map((tid) => {
                  const t = YOUTUBE_THUMB_THEMES[tid];
                  return (
                    <button
                      key={tid}
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setThumbThemeId(tid);
                      }}
                      className={`px-2.5 py-2 rounded-lg text-xs font-bold border flex items-center gap-2 cursor-pointer transition-colors ${
                        thumbThemeId === tid
                          ? 'border-slate-900 bg-slate-100 text-slate-900'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-sm border border-slate-300 shrink-0"
                        style={{ background: t.bg }}
                      />
                      <span className="truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">상단 포인트 문구</label>
                <input
                  type="text"
                  value={thumbBadge}
                  onChange={(e) => setThumbBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  메인 헤드라인 (Enter로 줄바꿈, 2줄 권장)
                </label>
                <textarea
                  rows={2}
                  value={thumbHeadline}
                  onChange={(e) => setThumbHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm font-black text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">보조 설명 문구</label>
                <input
                  type="text"
                  value={thumbSubline}
                  onChange={(e) => setThumbSubline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div
              style={{
                position: 'fixed',
                left: '-10000px',
                top: 0,
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            >
              <div ref={thumbCaptureRef}>
                <YoutubeThumbnailCard
                  aspect={aspect}
                  lang={lang}
                  themeId={thumbThemeId}
                  badgeText={thumbBadge}
                  headline={thumbHeadline}
                  subline={thumbSubline}
                  strokeCard={activeStrokeCards[0]}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SUB-PANEL 3: MULTILINGUAL SRT SUBTITLES & UPLOAD METADATA PACKAGE    */}
      {/* ==================================================================== */}
      {subPanel === 'package' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4">
            <div>
              <h4 className="text-sm font-black text-slate-900">
                다국어 유튜브 자막 파일 (.srt)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                유튜브 스튜디오 → 자막 → 파일 업로드에서 바로 등록할 수 있는 표준 .srt 형식입니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleDownloadSingleSrt(lang)}
                className="flex-1 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-black inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>현재 언어 .srt 저장</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadAll8Srt}
                disabled={isBatchSrtBusy}
                className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs font-black inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                {isBatchSrtBusy ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>8개국어 저장 중...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>8개국어 .srt 일괄 저장</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>미리보기 ({ADMIN_SUMMARY_LANGUAGES.find((l) => l.code === lang)?.labelKo})</span>
                <button
                  type="button"
                  onClick={() => handleCopyText('srt', activeSrtContent)}
                  className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  {copiedKey === 'srt' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'srt' ? '복사됨' : '내용 복사'}</span>
                </button>
              </div>
              <pre className="w-full h-72 overflow-auto rounded-lg bg-slate-950 text-slate-100 p-3 text-[11px] font-mono leading-relaxed whitespace-pre-wrap">
                {activeSrtContent}
              </pre>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-black text-slate-900">
                  유튜브 업로드 텍스트 패키지 (제목·설명·챕터·고정댓글·태그)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  자동 계산된 챕터 타임스탬프와 블로그 무료 총정리표 유입 문구가 포함되어 있습니다.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDownloadUploadTxt}
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-black text-slate-800 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>전체 .txt 저장</span>
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-slate-700">제목 추천 3종:</span>
                  {generatedPackage.titles.map((t, idx) => (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setSelectedTitleIdx(idx);
                        setEditedTitle(t.text);
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold border cursor-pointer ${
                        selectedTitleIdx === idx
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('title', editedTitle)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'title' ? '복사됨' : '제목 복사'}</span>
                </button>
              </div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-700">설명란 (챕터 타임스탬프 포함)</label>
                <button
                  type="button"
                  onClick={() => handleCopyText('desc', editedDescription)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'desc' ? '복사됨' : '설명 복사'}</span>
                </button>
              </div>
              <textarea
                rows={7}
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-slate-700">고정 댓글 (블로그 총정리표 PDF 유입)</label>
                <button
                  type="button"
                  onClick={() => handleCopyText('pin', editedPinnedComment)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'pin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'pin' ? '복사됨' : '고정댓글 복사'}</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={editedPinnedComment}
                onChange={(e) => setEditedPinnedComment(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-800"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-black text-slate-700">유튜브 태그 (쉼표 구분)</label>
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      tagOverLimit ? 'text-rose-600' : 'text-slate-500'
                    }`}
                  >
                    {tagCharCount} / 500자
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText('tags', editedTags)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'tags' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'tags' ? '복사됨' : '태그 복사'}</span>
                </button>
              </div>
              <textarea
                rows={2}
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-medium text-slate-800 ${
                  tagOverLimit ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* FULLSCREEN CLEAN RECORDING PORTAL (ZERO VISIBLE UI FOR MOBILE & OBS) */}
      {/* ==================================================================== */}
      {isCleanFullscreen &&
        createPortal(
          <div
            onClick={revealFullscreenControlsBriefly}
            className="fixed inset-0 z-[10000] h-[100dvh] w-screen bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Floating Exit/Replay Controls — completely hidden during recording; tap screen to reveal for 3.5s */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`fixed top-3 right-3 z-50 flex items-center gap-2 transition-opacity duration-200 ${
                showFsControls
                  ? 'opacity-100 pointer-events-auto'
                  : 'opacity-0 pointer-events-none'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  stopStrokePlayback();
                  setShowFsControls(false);
                  setCountdown(3);
                }}
                className="px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>3초 후 다시 재생</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  stopStrokePlayback();
                  setCountdown(null);
                  setShowFsControls(false);
                  setIsCleanFullscreen(false);
                }}
                className="px-3 py-2 rounded-lg bg-rose-600/95 border border-rose-400 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <X className="w-3.5 h-3.5" />
                <span>촬영 종료</span>
              </button>
            </div>

            {/* 3·2·1 Countdown Overlay (auto-disappears before playback starts!) */}
            {countdown !== null && countdown > 0 && (
              <div className="fixed inset-0 z-40 bg-black/80 flex flex-col items-center justify-center gap-3 px-6 text-center pointer-events-none">
                <div className="text-8xl sm:text-9xl font-black text-amber-400 tabular-nums">
                  {countdown}
                </div>
                <div className="text-sm sm:text-base font-bold text-white">
                  지금 화면 녹화를 시작하세요!
                </div>
                <div className="text-xs text-slate-300">
                  녹화 중에는 모든 버튼이 사라집니다 · 화면을 터치하면 종료 버튼이 나타납니다
                </div>
              </div>
            )}

            {/* Clean Framed Stroke Stage */}
            <div
              className="relative overflow-hidden shadow-2xl"
              style={
                aspect === '9:16'
                  ? {
                      width: 'min(100vw, calc(100dvh * 9 / 16))',
                      height: 'min(100dvh, calc(100vw * 16 / 9))',
                    }
                  : {
                      width: 'min(100vw, calc(100dvh * 16 / 9))',
                      height: 'min(100dvh, calc(100vw * 9 / 16))',
                    }
              }
            >
              <LiveStrokeStage
                cards={activeStrokeCards}
                groupBadge={activeStrokeGroup?.badge || '한글'}
                currentIndex={Math.min(playCardIdx, Math.max(0, activeStrokeCards.length - 1))}
                activeStrokeIdx={activeStrokeIdx}
                activeStrokeProgress={activeStrokeProgress}
                aspect={aspect}
                lang={lang}
                themeId={strokeThemeId}
                showStrokeNumbers={showStrokeNumbers}
                showSubtitle={showSubtitle}
                showWatermark={showWatermark}
                showHookOverlay={showHookOverlay}
                topHookText={topHookText}
                bottomCtaText={bottomCtaText}
                isFullscreen
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
