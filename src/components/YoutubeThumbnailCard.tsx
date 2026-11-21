import React from 'react';
import { HangeulCardData } from './HangeulStrokeFlashcardSection';
import {
  YoutubeAspectRatio,
  LANG_LOCALIZED_YT_COPY,
} from '../data/youtubeStudioData';
import { AdminSummaryLang } from '../data/summaryTranslations';
import { HAEBOL_STROKE_COLORS } from '../utils/strokeVideoRecorder';

export type YoutubeThumbThemeId = 'haebol' | 'yellow' | 'red' | 'dark';

export interface YoutubeThumbTheme {
  id: YoutubeThumbThemeId;
  label: string;
  bg: string;
  badgeBg: string;
  badgeText: string;
  headlineColor: string;
  subColor: string;
  cardBg: string;
  cardBorder: string;
  brandBg: string;
  brandText: string;
}

export const YOUTUBE_THUMB_THEMES: Record<YoutubeThumbThemeId, YoutubeThumbTheme> = {
  haebol: {
    id: 'haebol',
    label: '해볼 오리지널 (추천)',
    bg: 'linear-gradient(145deg, #FFF5F8 0%, #FFFBEB 55%, #FEF3C7 100%)',
    badgeBg: '#441A75',
    badgeText: '#FFFFFF',
    headlineColor: '#0F172A',
    subColor: '#78350F',
    cardBg: '#FFFFFF',
    cardBorder: '#F59E0B',
    brandBg: '#441A75',
    brandText: '#FEF08A',
  },
  yellow: {
    id: 'yellow',
    label: '노랑 임팩트 (CTR 추천)',
    bg: 'linear-gradient(135deg, #FEF08A 0%, #FACC15 100%)',
    badgeBg: '#DC2626',
    badgeText: '#FFFFFF',
    headlineColor: '#0F172A',
    subColor: '#1E293B',
    cardBg: '#FFFFFF',
    cardBorder: '#0F172A',
    brandBg: '#0F172A',
    brandText: '#FDE047',
  },
  red: {
    id: 'red',
    label: '레드 후킹 (쇼츠 추천)',
    bg: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
    badgeBg: '#FACC15',
    badgeText: '#0F172A',
    headlineColor: '#FFFFFF',
    subColor: '#FEE2E2',
    cardBg: '#FFFFFF',
    cardBorder: '#FACC15',
    brandBg: '#FFFFFF',
    brandText: '#991B1B',
  },
  dark: {
    id: 'dark',
    label: '다크 스튜디오 (고대비)',
    bg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    badgeBg: '#FACC15',
    badgeText: '#0F172A',
    headlineColor: '#FFFFFF',
    subColor: '#CBD5E1',
    cardBg: '#FFFFFF',
    cardBorder: '#FACC15',
    brandBg: '#FACC15',
    brandText: '#0F172A',
  },
};

export interface YoutubeThumbnailCardProps {
  aspect: YoutubeAspectRatio;
  lang: AdminSummaryLang;
  themeId: YoutubeThumbThemeId;
  badgeText: string;
  headline: string;
  subline: string;
  strokeCard?: HangeulCardData;
}

export const YoutubeThumbnailCard: React.FC<YoutubeThumbnailCardProps> = ({
  aspect,
  lang,
  themeId,
  badgeText,
  headline,
  subline,
  strokeCard,
}) => {
  const theme = YOUTUBE_THUMB_THEMES[themeId];
  const copy = LANG_LOCALIZED_YT_COPY[lang];
  const isVertical = aspect === '9:16';
  const width = isVertical ? 1080 : 1280;
  const height = isVertical ? 1920 : 720;

  const lines = headline.split('\n').filter((l) => l.trim().length > 0);
  const strokes = strokeCard?.strokes || [];
  const strokePoints = strokeCard?.strokePoints || [];

  const renderStrokePanel = (panelSize: number) => (
    <div
      style={{
        width: `${panelSize}px`,
        height: `${panelSize}px`,
        backgroundColor: theme.cardBg,
        border: `10px dashed ${theme.cardBorder}`,
        borderRadius: '44px',
        boxShadow: '0 24px 48px rgba(217, 119, 6, 0.18)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 160 160"
        style={{ width: '88%', height: '88%', overflow: 'visible' }}
      >
        <line
          x1="80"
          y1="8"
          x2="80"
          y2="152"
          stroke="#FDE68A"
          strokeWidth="2.8"
          strokeDasharray="6 6"
        />
        <line
          x1="8"
          y1="80"
          x2="152"
          y2="80"
          stroke="#FDE68A"
          strokeWidth="2.8"
          strokeDasharray="6 6"
        />
        {strokes.map((d, idx) => (
          <path
            key={idx}
            d={d}
            fill="none"
            stroke={HAEBOL_STROKE_COLORS[idx % HAEBOL_STROKE_COLORS.length]}
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {strokePoints.map((pt, idx) => (
          <g key={idx}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r="10.5"
              fill={HAEBOL_STROKE_COLORS[idx % HAEBOL_STROKE_COLORS.length]}
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            <text
              x={pt.x}
              y={pt.y + 3.8}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontWeight="900"
            >
              {idx + 1}
            </text>
          </g>
        ))}
      </svg>
      {strokeCard && (
        <div
          style={{
            position: 'absolute',
            bottom: '18px',
            right: '24px',
            fontSize: isVertical ? '36px' : '28px',
            fontWeight: 900,
            color: '#441A75',
            fontFamily: '"Hakgyoansim Badasseugi", "Hakgyoansim Bareondotum", sans-serif',
          }}
        >
          {strokeCard.name} {strokeCard.romaja}
        </div>
      )}
    </div>
  );

  if (isVertical) {
    return (
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: theme.bg,
          fontFamily: '"Hakgyoansim Bareondotum", "NanumBarunGothic", sans-serif',
          padding: '88px 72px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              backgroundColor: theme.brandBg,
              color: theme.brandText,
              padding: '16px 32px',
              borderRadius: '18px',
              fontSize: '36px',
              fontWeight: 900,
              letterSpacing: '-0.02em',
            }}
          >
            {copy.brand}
          </div>
          <div
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.badgeText,
              padding: '16px 34px',
              borderRadius: '18px',
              fontSize: '36px',
              fontWeight: 900,
            }}
          >
            {badgeText}
          </div>
        </div>

        <div style={{ width: '100%', textAlign: 'center', marginTop: '24px' }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: '96px',
                lineHeight: 1.16,
                fontWeight: 900,
                color: theme.headlineColor,
                letterSpacing: '-0.03em',
                wordBreak: 'keep-all',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ margin: '28px 0' }}>{renderStrokePanel(740)}</div>

        <div
          style={{
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: '46px',
              fontWeight: 800,
              color: theme.subColor,
              lineHeight: 1.3,
              wordBreak: 'keep-all',
            }}
          >
            {subline}
          </div>
          {strokeCard && (
            <div
              style={{
                backgroundColor: theme.brandBg,
                color: theme.brandText,
                padding: '18px 42px',
                borderRadius: '22px',
                fontSize: '44px',
                fontWeight: 900,
              }}
            >
              {strokeCard.sampleWord}
              {lang !== 'ko' ? ` · ${strokeCard.meanings[lang]}` : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: theme.bg,
        fontFamily: '"Hakgyoansim Bareondotum", "NanumBarunGothic", sans-serif',
        padding: '56px 64px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              backgroundColor: theme.badgeBg,
              color: theme.badgeText,
              padding: '12px 28px',
              borderRadius: '14px',
              fontSize: '30px',
              fontWeight: 900,
            }}
          >
            {badgeText}
          </div>
          <div
            style={{
              backgroundColor: theme.brandBg,
              color: theme.brandText,
              padding: '12px 24px',
              borderRadius: '14px',
              fontSize: '26px',
              fontWeight: 900,
            }}
          >
            {copy.brand}
          </div>
        </div>

        <div style={{ margin: '12px 0' }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: lines.length >= 2 ? '82px' : '94px',
                lineHeight: 1.15,
                fontWeight: 900,
                color: theme.headlineColor,
                letterSpacing: '-0.03em',
                wordBreak: 'keep-all',
              }}
            >
              {line}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              fontSize: '34px',
              fontWeight: 800,
              color: theme.subColor,
              lineHeight: 1.3,
              wordBreak: 'keep-all',
            }}
          >
            {subline}
          </div>
          {strokeCard && (
            <div
              style={{
                fontSize: '30px',
                fontWeight: 900,
                color: theme.headlineColor,
                opacity: 0.9,
              }}
            >
              예시: {strokeCard.sampleWord} ({strokeCard.sampleWordRomaja})
              {lang !== 'ko' ? ` · ${strokeCard.meanings[lang]}` : ''}
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0 }}>{renderStrokePanel(510)}</div>
    </div>
  );
};
