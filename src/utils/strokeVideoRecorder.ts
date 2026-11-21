import { HangeulCardData } from '../components/HangeulStrokeFlashcardSection';
import { AdminSummaryLang } from '../data/summaryTranslations';
import { YoutubeAspectRatio, LANG_LOCALIZED_YT_COPY } from '../data/youtubeStudioData';

/** 해볼 한국어 한글 플래시카드 본래 획순 컬러 팔레트 (1획 파랑, 2획 빨강, 3획 검정, 4획 초록 등) */
export const HAEBOL_STROKE_COLORS = [
  '#0077c8', // 1획: 파랑
  '#dc2626', // 2획: 빨강
  '#18181b', // 3획: 검정
  '#16a34a', // 4획: 초록
  '#d97706', // 5획: 황갈색
  '#9333ea', // 6획: 보라
  '#0891b2', // 7획: 청록
  '#be123c', // 8획: 로즈
];

export type StrokeStageThemeId = 'haebol' | 'light' | 'mint' | 'dark';

export interface StrokeStageThemePalette {
  id: StrokeStageThemeId;
  label: string;
  /** Outer background behind flashcard */
  bg: string;
  /** Flashcard surface */
  surfaceBg: string;
  surfaceBorder: string;
  /** Inner handwriting square box */
  cardBg: string;
  cardBorder: string;
  gridLine: string;
  /** If true, base strokes use HAEBOL_STROKE_COLORS like the actual web flashcard */
  useColorfulBaseStrokes: boolean;
  guideStroke: string;
  activeStroke: string;
  completedStroke: string;
  penGlow: string;
  penCore: string;
  titleColor: string;
  subColor: string;
  badgeBg: string;
  badgeText: string;
  romajaBg: string;
  romajaText: string;
  romajaBorder: string;
  wordCardBg: string;
  wordCardBorder: string;
  /** Top hook headline & bottom CTA banner colors (WCAG AA contrast) */
  hookText: string;
  ctaBg: string;
  ctaText: string;
}

export const STROKE_STAGE_THEMES: Record<StrokeStageThemeId, StrokeStageThemePalette> = {
  haebol: {
    id: 'haebol',
    label: '해볼 오리지널 (추천)',
    bg: '#FFF5F8',
    surfaceBg: '#FFFBEB',
    surfaceBorder: '#FCD34D',
    cardBg: '#FFFFFF',
    cardBorder: '#FCD34D',
    gridLine: '#FDE68A',
    useColorfulBaseStrokes: true,
    guideStroke: '#E2E8F0',
    activeStroke: '#441A75',
    completedStroke: '#441A75',
    penGlow: 'rgba(126, 34, 206, 0.36)',
    penCore: '#6B21A8',
    titleColor: '#0F172A',
    subColor: '#78350F',
    badgeBg: '#441A75',
    badgeText: '#FFFFFF',
    romajaBg: '#F3E8FF',
    romajaText: '#441A75',
    romajaBorder: '#D8B4FE',
    wordCardBg: '#FFFFFF',
    wordCardBorder: '#FDE68A',
    hookText: '#441A75',
    ctaBg: '#441A75',
    ctaText: '#FEF08A',
  },
  light: {
    id: 'light',
    label: '화이트 칠판',
    bg: '#F8FAFC',
    surfaceBg: '#FFFFFF',
    surfaceBorder: '#E2E8F0',
    cardBg: '#FFFFFF',
    cardBorder: '#CBD5E1',
    gridLine: '#CBD5E1',
    useColorfulBaseStrokes: true,
    guideStroke: '#E2E8F0',
    activeStroke: '#441A75',
    completedStroke: '#441A75',
    penGlow: 'rgba(68, 26, 117, 0.32)',
    penCore: '#441A75',
    titleColor: '#0F172A',
    subColor: '#475569',
    badgeBg: '#0F172A',
    badgeText: '#FFFFFF',
    romajaBg: '#F3E8FF',
    romajaText: '#441A75',
    romajaBorder: '#D8B4FE',
    wordCardBg: '#F8FAFC',
    wordCardBorder: '#E2E8F0',
    hookText: '#0F172A',
    ctaBg: '#0F172A',
    ctaText: '#FFFFFF',
  },
  mint: {
    id: 'mint',
    label: '민트 교실',
    bg: '#ECFDF5',
    surfaceBg: '#FFFFFF',
    surfaceBorder: '#6EE7B7',
    cardBg: '#FFFFFF',
    cardBorder: '#6EE7B7',
    gridLine: '#A7F3D0',
    useColorfulBaseStrokes: true,
    guideStroke: '#D1FAE5',
    activeStroke: '#065F46',
    completedStroke: '#065F46',
    penGlow: 'rgba(5, 150, 105, 0.35)',
    penCore: '#059669',
    titleColor: '#064E3B',
    subColor: '#047857',
    badgeBg: '#065F46',
    badgeText: '#FFFFFF',
    romajaBg: '#D1FAE5',
    romajaText: '#065F46',
    romajaBorder: '#6EE7B7',
    wordCardBg: '#ECFDF5',
    wordCardBorder: '#A7F3D0',
    hookText: '#064E3B',
    ctaBg: '#065F46',
    ctaText: '#ECFDF5',
  },
  dark: {
    id: 'dark',
    label: '다크 스튜디오',
    bg: '#0B1120',
    surfaceBg: '#111827',
    surfaceBorder: '#334155',
    cardBg: '#1E293B',
    cardBorder: '#475569',
    gridLine: '#334155',
    useColorfulBaseStrokes: false,
    guideStroke: '#334155',
    activeStroke: '#FACC15',
    completedStroke: '#F8FAFC',
    penGlow: 'rgba(250, 204, 21, 0.42)',
    penCore: '#FACC15',
    titleColor: '#F8FAFC',
    subColor: '#CBD5E1',
    badgeBg: '#FACC15',
    badgeText: '#0F172A',
    romajaBg: '#1E293B',
    romajaText: '#FDE047',
    romajaBorder: '#475569',
    wordCardBg: '#0F172A',
    wordCardBorder: '#334155',
    hookText: '#FDE047',
    ctaBg: '#FACC15',
    ctaText: '#0F172A',
  },
};

interface MeasuredStroke {
  d: string;
  path2d: Path2D;
  length: number;
  el: SVGPathElement;
}

function measureStrokes(strokes: string[]): {
  svg: SVGSVGElement;
  items: MeasuredStroke[];
} {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 160 160');
  svg.style.position = 'fixed';
  svg.style.left = '-9999px';
  svg.style.top = '-9999px';
  svg.style.width = '160px';
  svg.style.height = '160px';
  svg.style.pointerEvents = 'none';
  document.body.appendChild(svg);

  const items: MeasuredStroke[] = strokes.map((d) => {
    const el = document.createElementNS(ns, 'path');
    el.setAttribute('d', d);
    svg.appendChild(el);
    let length = 120;
    try {
      length = Math.max(10, el.getTotalLength());
    } catch {
      length = 120;
    }
    return {
      d,
      path2d: new Path2D(d),
      length,
      el,
    };
  });

  return { svg, items };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Multi-script safe text wrapper (handles Korean, Latin, Cyrillic, Bengali, CJK without clipping).
 * Fits into maxLines (default 2) and automatically steps down font size if needed.
 */
function drawFittedMultilineText(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  maxWidth: number,
  baseFontSize: number,
  minFontSize: number,
  fontWeight: number,
  fontFamily: string,
  color: string,
  maxLines = 2
) {
  const clean = text.trim();
  if (!clean) return;

  const wrap = (fontSize: number): string[] => {
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    if (ctx.measureText(clean).width <= maxWidth) {
      return [clean];
    }

    const hasSpaces = /\s+/.test(clean);
    const tokens = hasSpaces ? clean.split(/\s+/) : Array.from(clean);
    const sep = hasSpaces ? ' ' : '';
    const lines: string[] = [];
    let current = '';

    for (const token of tokens) {
      const candidate = current ? `${current}${sep}${token}` : token;
      if (ctx.measureText(candidate).width <= maxWidth) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        current = token;
      }
    }
    if (current) lines.push(current);
    return lines;
  };

  let chosenSize = baseFontSize;
  let chosenLines = wrap(chosenSize);

  while (chosenLines.length > maxLines && chosenSize > minFontSize) {
    chosenSize = Math.max(minFontSize, chosenSize - 3);
    chosenLines = wrap(chosenSize);
  }

  // If still exceeding maxLines at minFontSize, collapse remainder onto last line with ellipsis
  if (chosenLines.length > maxLines) {
    const merged = chosenLines.slice(0, maxLines);
    const rest = chosenLines.slice(maxLines - 1).join(/\s+/.test(clean) ? ' ' : '');
    let trimmed = rest;
    ctx.font = `${fontWeight} ${chosenSize}px ${fontFamily}`;
    while (trimmed.length > 3 && ctx.measureText(`${trimmed}…`).width > maxWidth) {
      trimmed = trimmed.slice(0, -1);
    }
    merged[maxLines - 1] = `${trimmed}…`;
    chosenLines = merged;
  }

  ctx.font = `${fontWeight} ${chosenSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lineHeight = chosenSize * 1.24;
  const totalHeight = lineHeight * (chosenLines.length - 1);
  const startY = centerY - totalHeight / 2;

  chosenLines.forEach((line, idx) => {
    ctx.fillText(line, centerX, startY + idx * lineHeight, maxWidth);
  });
}

export interface RecordStrokeVideoOptions {
  cards: HangeulCardData[];
  groupBadge?: string;
  aspect: YoutubeAspectRatio;
  lang: AdminSummaryLang;
  themeId: StrokeStageThemeId;
  secPerStroke: number;
  pauseAfterCardSec: number;
  showStrokeNumbers: boolean;
  showSubtitle: boolean;
  showWatermark: boolean;
  showHookOverlay?: boolean;
  topHookText?: string;
  bottomCtaText?: string;
  fileName: string;
  signal?: AbortSignal;
  onProgress?: (info: { currentIndex: number; total: number; percent: number }) => void;
}

export async function recordStrokeVideoWebm(options: RecordStrokeVideoOptions): Promise<void> {
  const {
    cards,
    groupBadge = '한글',
    aspect,
    lang,
    themeId,
    secPerStroke,
    pauseAfterCardSec,
    showStrokeNumbers,
    showSubtitle,
    showWatermark,
    showHookOverlay = false,
    topHookText = '',
    bottomCtaText = '',
    fileName,
    signal,
    onProgress,
  } = options;

  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') {
    throw new Error('이 브라우저는 직접 영상 녹화(MediaRecorder)를 지원하지 않습니다. 무버튼 전체화면 촬영 모드를 이용해 주세요.');
  }

  const width = aspect === '9:16' ? 1080 : 1920;
  const height = aspect === '9:16' ? 1920 : 1080;
  const theme = STROKE_STAGE_THEMES[themeId];
  const copy = LANG_LOCALIZED_YT_COPY[lang];

  const cleanTopHook = showHookOverlay ? topHookText.trim() : '';
  const cleanBottomCta = showHookOverlay ? bottomCtaText.trim() : '';
  const hasTopHook = cleanTopHook.length > 0;
  const hasBottomCta = cleanBottomCta.length > 0;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('캔버스 컨텍스트를 생성할 수 없습니다.');
  }

  const mimeCandidates = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ];
  const mimeType = mimeCandidates.find((m) => MediaRecorder.isTypeSupported(m)) || 'video/webm';

  const stream = canvas.captureStream(30);
  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 6_000_000,
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (ev) => {
    if (ev.data && ev.data.size > 0) chunks.push(ev.data);
  };

  const stopPromise = new Promise<Blob>((resolve, reject) => {
    recorder.onstop = () => {
      resolve(new Blob(chunks, { type: mimeType }));
    };
    recorder.onerror = () => {
      reject(new Error('영상 녹화 중 오류가 발생했습니다.'));
    };
  });

  const handFont = '"Hakgyoansim Badasseugi", "Hakgyoansim Bareondotum", "NanumBarunGothic", sans-serif';
  const uiFont = '"Hakgyoansim Bareondotum", "NanumBarunGothic", sans-serif';
  const isVertical = aspect === '9:16';

  const renderFrame = (
    card: HangeulCardData,
    cardIdx: number,
    measured: MeasuredStroke[],
    activeStrokeIdx: number,
    activeStrokeProgress: number
  ) => {
    // 1. Outer Haebol Background (#FFF5F8 etc.)
    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (isVertical) {
      // 9:16 Vertical Shorts (1080 x 1920)
      const cardPadX = 64;
      const cardW = width - cardPadX * 2;
      const cardTop = hasTopHook ? 228 : 132;
      const cardBottomLimit = hasBottomCta ? 1680 : 1768;
      const cardH = cardBottomLimit - cardTop;

      // Top Hook Headline (above flashcard in clean safe zone)
      if (hasTopHook) {
        drawFittedMultilineText(
          ctx,
          cleanTopHook,
          width / 2,
          126,
          width - 110,
          56,
          36,
          900,
          uiFont,
          theme.hookText,
          2
        );
      }

      // Outer Haebol Flashcard Frame (#FFFBEB + amber border)
      drawRoundedRect(ctx, cardPadX, cardTop, cardW, cardH, 42);
      ctx.fillStyle = theme.surfaceBg;
      ctx.fill();
      ctx.lineWidth = 10;
      ctx.strokeStyle = theme.surfaceBorder;
      ctx.stroke();

      // Top Header row inside flashcard: purple group badge + brand
      const headerY = cardTop + 36;
      drawRoundedRect(ctx, cardPadX + 40, headerY, 174, 60, 14);
      ctx.fillStyle = theme.badgeBg;
      ctx.fill();
      ctx.fillStyle = theme.badgeText;
      ctx.font = `900 32px ${uiFont}`;
      ctx.fillText(groupBadge, cardPadX + 40 + 87, headerY + 31);

      if (showWatermark) {
        ctx.textAlign = 'right';
        ctx.fillStyle = theme.subColor;
        ctx.font = `800 30px ${uiFont}`;
        ctx.fillText(`${copy.brand} · ${copy.strokeSeriesName}`, cardPadX + cardW - 40, headerY + 31);
        ctx.textAlign = 'center';
      }

      // Header divider line
      const dividerY = headerY + 84;
      ctx.strokeStyle = theme.gridLine;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cardPadX + 38, dividerY);
      ctx.lineTo(cardPadX + cardW - 38, dividerY);
      ctx.stroke();

      // Square Handwriting Box (generous 680px when hooks ON, 760px when hooks OFF)
      const boxSize = hasTopHook || hasBottomCta ? 680 : 750;
      const boxX = (width - boxSize) / 2;
      const boxY = dividerY + (hasTopHook || hasBottomCta ? 38 : 54);
      drawStrokeBox(ctx, boxX, boxY, boxSize, card, measured, activeStrokeIdx, activeStrokeProgress, theme, showStrokeNumbers, uiFont);

      // Name + Purple Romaja Tag directly below canvas
      const nameY = boxY + boxSize + (hasTopHook || hasBottomCta ? 74 : 90);
      ctx.fillStyle = theme.titleColor;
      ctx.font = `900 ${hasTopHook || hasBottomCta ? 84 : 92}px ${handFont}`;
      ctx.fillText(card.name, width / 2, nameY);

      const romajaText = `${card.romaja}  ·  ${copy.strokesUnit(measured.length)}`;
      const romajaY = nameY + (hasTopHook || hasBottomCta ? 56 : 66);
      drawRoundedRect(ctx, width / 2 - 225, romajaY, 450, 66, 16);
      ctx.fillStyle = theme.romajaBg;
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = theme.romajaBorder;
      ctx.stroke();
      ctx.fillStyle = theme.romajaText;
      ctx.font = `900 35px ${uiFont}`;
      ctx.fillText(romajaText, width / 2, romajaY + 34);

      // Example Word Box
      const wordCardW = 760;
      const wordCardX = (width - wordCardW) / 2;
      const wordCardY = romajaY + 96;
      const wordCardH = hasTopHook || hasBottomCta ? 204 : 226;
      drawRoundedRect(ctx, wordCardX, wordCardY, wordCardW, wordCardH, 30);
      ctx.fillStyle = theme.wordCardBg;
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = theme.wordCardBorder;
      ctx.stroke();

      ctx.fillStyle = theme.titleColor;
      ctx.font = `900 ${hasTopHook || hasBottomCta ? 76 : 84}px ${handFont}`;
      ctx.fillText(card.sampleWord, width / 2, wordCardY + (hasTopHook || hasBottomCta ? 76 : 86));

      ctx.fillStyle = theme.subColor;
      ctx.font = `800 35px ${uiFont}`;
      const subLine =
        showSubtitle && lang !== 'ko'
          ? `[${card.sampleWordRomaja}]  ·  ${card.meanings[lang]}`
          : `[${card.sampleWordRomaja}]`;
      ctx.fillText(subLine, width / 2, wordCardY + wordCardH - 48, wordCardW - 48);

      // Inside card bottom subtle counter / follow line (when bottom CTA is off, show default followAlongCta)
      if (!hasBottomCta) {
        ctx.fillStyle = theme.subColor;
        ctx.font = `800 30px ${uiFont}`;
        ctx.fillText(
          `${copy.followAlongCta}${cards.length > 1 ? ` · ${cardIdx + 1}/${cards.length}` : ''}`,
          width / 2,
          cardTop + cardH - 46,
          cardW - 80
        );
      } else if (cards.length > 1) {
        ctx.fillStyle = theme.subColor;
        ctx.font = `800 30px ${uiFont}`;
        ctx.fillText(`${cardIdx + 1} / ${cards.length}`, width / 2, cardTop + cardH - 36);
      }

      // Bottom High-Contrast CTA Banner (placed cleanly in Shorts Safe Zone)
      if (hasBottomCta) {
        const ctaX = cardPadX;
        const ctaY = 1710;
        const ctaW = cardW;
        const ctaH = 122;
        drawRoundedRect(ctx, ctaX, ctaY, ctaW, ctaH, 26);
        ctx.fillStyle = theme.ctaBg;
        ctx.fill();

        drawFittedMultilineText(
          ctx,
          cleanBottomCta,
          width / 2,
          ctaY + ctaH / 2,
          ctaW - 64,
          40,
          28,
          900,
          uiFont,
          theme.ctaText,
          2
        );
      }
    } else {
      // 16:9 Widescreen Main (1920 x 1080)
      const padX = 56;
      const cardTop = hasTopHook ? 124 : 52;
      const cardBottom = hasBottomCta ? 952 : 1028;
      const cardW = width - padX * 2;
      const cardH = cardBottom - cardTop;

      if (hasTopHook) {
        drawFittedMultilineText(
          ctx,
          cleanTopHook,
          width / 2,
          64,
          width - 140,
          46,
          30,
          900,
          uiFont,
          theme.hookText,
          1
        );
      }

      drawRoundedRect(ctx, padX, cardTop, cardW, cardH, 38);
      ctx.fillStyle = theme.surfaceBg;
      ctx.fill();
      ctx.lineWidth = 10;
      ctx.strokeStyle = theme.surfaceBorder;
      ctx.stroke();

      // Top bar inside card
      const barY = cardTop + 30;
      drawRoundedRect(ctx, padX + 40, barY, 168, 56, 14);
      ctx.fillStyle = theme.badgeBg;
      ctx.fill();
      ctx.fillStyle = theme.badgeText;
      ctx.font = `900 28px ${uiFont}`;
      ctx.fillText(groupBadge, padX + 40 + 84, barY + 29);

      if (showWatermark) {
        ctx.textAlign = 'left';
        ctx.fillStyle = theme.subColor;
        ctx.font = `800 28px ${uiFont}`;
        ctx.fillText(`${copy.brand} · ${copy.strokeSeriesName}`, padX + 230, barY + 29);
      }

      if (cards.length > 1) {
        ctx.textAlign = 'right';
        ctx.fillStyle = theme.subColor;
        ctx.font = `900 30px ${uiFont}`;
        ctx.fillText(`${cardIdx + 1} / ${cards.length}`, padX + cardW - 40, barY + 29);
      }
      ctx.textAlign = 'center';

      // Left: Large Stroke Box
      const boxSize = hasTopHook || hasBottomCta ? 630 : 720;
      const boxX = padX + 100;
      const contentCenterY = cardTop + 98 + (cardH - 120) / 2;
      const boxY = contentCenterY - boxSize / 2;
      drawStrokeBox(ctx, boxX, boxY, boxSize, card, measured, activeStrokeIdx, activeStrokeProgress, theme, showStrokeNumbers, uiFont);

      // Right: Typography & Word Panel
      const rightCenterX = 1365;
      ctx.fillStyle = theme.titleColor;
      ctx.font = `900 ${hasTopHook || hasBottomCta ? 116 : 132}px ${handFont}`;
      ctx.fillText(card.name, rightCenterX, contentCenterY - 190);

      drawRoundedRect(ctx, rightCenterX - 230, contentCenterY - 102, 460, 70, 16);
      ctx.fillStyle = theme.romajaBg;
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = theme.romajaBorder;
      ctx.stroke();
      ctx.fillStyle = theme.romajaText;
      ctx.font = `900 36px ${uiFont}`;
      ctx.fillText(`${card.romaja}  ·  ${copy.strokesUnit(measured.length)}`, rightCenterX, contentCenterY - 66);

      // Word card
      const wBoxW = 720;
      const wBoxX = rightCenterX - wBoxW / 2;
      const wBoxY = contentCenterY + 6;
      const wBoxH = 224;
      drawRoundedRect(ctx, wBoxX, wBoxY, wBoxW, wBoxH, 30);
      ctx.fillStyle = theme.wordCardBg;
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = theme.wordCardBorder;
      ctx.stroke();

      ctx.fillStyle = theme.titleColor;
      ctx.font = `900 82px ${handFont}`;
      ctx.fillText(card.sampleWord, rightCenterX, wBoxY + 86);

      ctx.fillStyle = theme.subColor;
      ctx.font = `800 36px ${uiFont}`;
      const subLine =
        showSubtitle && lang !== 'ko'
          ? `[${card.sampleWordRomaja}]  ·  ${card.meanings[lang]}`
          : `[${card.sampleWordRomaja}]`;
      ctx.fillText(subLine, rightCenterX, wBoxY + 166, wBoxW - 48);

      if (!hasBottomCta) {
        ctx.fillStyle = theme.subColor;
        ctx.font = `800 28px ${uiFont}`;
        ctx.fillText(copy.followAlongCta, rightCenterX, wBoxY + wBoxH + 54, 720);
      }

      if (hasBottomCta) {
        const ctaY = 972;
        const ctaH = 78;
        drawRoundedRect(ctx, padX, ctaY, cardW, ctaH, 20);
        ctx.fillStyle = theme.ctaBg;
        ctx.fill();
        drawFittedMultilineText(
          ctx,
          cleanBottomCta,
          width / 2,
          ctaY + ctaH / 2,
          cardW - 80,
          36,
          24,
          900,
          uiFont,
          theme.ctaText,
          1
        );
      }
    }
  };

  recorder.start(250);

  const waitFrame = () =>
    new Promise<number>((resolve) => {
      requestAnimationFrame((ts) => resolve(ts));
    });

  const leadInMs = 420;
  const strokeMs = Math.max(400, secPerStroke * 1000);
  const pauseMs = Math.max(600, pauseAfterCardSec * 1000);

  const totalEstimatedMs = cards.reduce((acc, c) => {
    const sc = Math.max(1, c.strokes?.length || 1);
    return acc + leadInMs + sc * strokeMs + pauseMs;
  }, 0);
  let elapsedTotalMs = 0;

  try {
    for (let cIdx = 0; cIdx < cards.length; cIdx++) {
      if (signal?.aborted) break;
      const card = cards[cIdx];
      const strokes = card.strokes && card.strokes.length > 0 ? card.strokes : [];
      const { svg, items: measured } = measureStrokes(strokes);

      try {
        const cardDurationMs = leadInMs + Math.max(1, measured.length) * strokeMs + pauseMs;
        const cardStart = performance.now();

        while (true) {
          if (signal?.aborted) break;
          const now = await waitFrame();
          const cardElapsed = now - cardStart;

          let activeStrokeIdx = -1;
          let activeProgress = 0;

          if (cardElapsed < leadInMs) {
            activeStrokeIdx = -1;
            activeProgress = 0;
          } else {
            const drawElapsed = cardElapsed - leadInMs;
            const totalDrawMs = measured.length * strokeMs;
            if (drawElapsed < totalDrawMs) {
              activeStrokeIdx = Math.floor(drawElapsed / strokeMs);
              activeProgress = Math.min(1, (drawElapsed % strokeMs) / strokeMs);
            } else {
              activeStrokeIdx = measured.length;
              activeProgress = 1;
            }
          }

          renderFrame(card, cIdx, measured, activeStrokeIdx, activeProgress);

          const overallPercent = Math.min(
            99,
            Math.round(((elapsedTotalMs + Math.min(cardElapsed, cardDurationMs)) / Math.max(1, totalEstimatedMs)) * 100)
          );
          onProgress?.({ currentIndex: cIdx + 1, total: cards.length, percent: overallPercent });

          if (cardElapsed >= cardDurationMs) {
            break;
          }
        }
        elapsedTotalMs += cardDurationMs;
      } finally {
        svg.remove();
      }
    }
  } finally {
    if (recorder.state !== 'inactive') {
      recorder.stop();
    }
    stream.getTracks().forEach((t) => t.stop());
  }

  const blob = await stopPromise;
  if (signal?.aborted) return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName.endsWith('.webm') ? fileName : `${fileName}.webm`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function drawStrokeBox(
  ctx: CanvasRenderingContext2D,
  boxX: number,
  boxY: number,
  boxSize: number,
  card: HangeulCardData,
  measured: MeasuredStroke[],
  activeStrokeIdx: number,
  activeStrokeProgress: number,
  theme: StrokeStageThemePalette,
  showStrokeNumbers: boolean,
  fontFamily: string
) {
  ctx.save();

  // Outer dashed handwriting box (matching HangeulStrokeFlashcardSection)
  drawRoundedRect(ctx, boxX, boxY, boxSize, boxSize, 32);
  ctx.fillStyle = theme.cardBg;
  ctx.fill();
  ctx.save();
  ctx.lineWidth = 6;
  ctx.strokeStyle = theme.cardBorder;
  ctx.setLineDash([16, 12]);
  ctx.stroke();
  ctx.restore();

  // Dashed crosshair grid
  ctx.save();
  ctx.strokeStyle = theme.gridLine;
  ctx.lineWidth = 4;
  ctx.setLineDash([14, 14]);
  ctx.beginPath();
  ctx.moveTo(boxX + boxSize / 2, boxY + 20);
  ctx.lineTo(boxX + boxSize / 2, boxY + boxSize - 20);
  ctx.moveTo(boxX + 20, boxY + boxSize / 2);
  ctx.lineTo(boxX + boxSize - 20, boxY + boxSize / 2);
  ctx.stroke();
  ctx.restore();

  // Transform to 160x160 stroke coordinate system
  const pad = boxSize * 0.08;
  const innerSize = boxSize - pad * 2;
  const scale = innerSize / 160;

  ctx.save();
  ctx.translate(boxX + pad, boxY + pad);
  ctx.scale(scale, scale);

  // Layer 1: Haebol signature colorful base strokes (or theme guideStroke in dark mode)
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 14;
  measured.forEach((m, idx) => {
    ctx.strokeStyle = theme.useColorfulBaseStrokes
      ? HAEBOL_STROKE_COLORS[idx % HAEBOL_STROKE_COLORS.length]
      : theme.guideStroke;
    ctx.stroke(m.path2d);
  });

  // Layer 2: Completed overwrite strokes (#441A75 Haebol Deep Purple!)
  ctx.lineWidth = 15.5;
  ctx.strokeStyle = theme.completedStroke;
  for (let i = 0; i < Math.min(activeStrokeIdx, measured.length); i++) {
    ctx.stroke(measured[i].path2d);
  }

  // Layer 3: Currently drawing stroke + glowing pen dot
  if (activeStrokeIdx >= 0 && activeStrokeIdx < measured.length) {
    const active = measured[activeStrokeIdx];
    const drawnLen = Math.max(0.5, active.length * activeStrokeProgress);
    ctx.save();
    ctx.strokeStyle = theme.activeStroke;
    ctx.lineWidth = 16;
    ctx.setLineDash([drawnLen, active.length + 20]);
    ctx.stroke(active.path2d);
    ctx.restore();

    try {
      const pt = active.el.getPointAtLength(drawnLen);
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 12.5, 0, Math.PI * 2);
      ctx.fillStyle = theme.penGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = theme.penCore;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
    } catch {
      // Ignore point query errors
    }
  }

  // Stroke numbers (①, ②, ③...)
  if (showStrokeNumbers && card.strokePoints) {
    card.strokePoints.forEach((pt, idx) => {
      const isCurrent = idx === activeStrokeIdx;
      const isDone = idx < activeStrokeIdx;
      const baseColor = theme.useColorfulBaseStrokes
        ? HAEBOL_STROKE_COLORS[idx % HAEBOL_STROKE_COLORS.length]
        : '#64748B';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, isCurrent ? 9.5 : 8, 0, Math.PI * 2);
      ctx.fillStyle = isCurrent || isDone ? theme.activeStroke : baseColor;
      ctx.fill();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `900 9.5px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(idx + 1), pt.x, pt.y + 0.5);
    });
  }

  ctx.restore();
  ctx.restore();
}
