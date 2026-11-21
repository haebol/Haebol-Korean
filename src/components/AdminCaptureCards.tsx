import React, { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Volume2, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import { SupportedLanguage, getLanguageMeta } from '../types';
import { VOCABULARY_DATA, CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { VocabVisual } from './VocabVisual';
import { ManduMascot } from './ManduMascot';
import { VERB_UNIT_META, VERB_CARDS_BY_UNIT, VerbUnitType } from './VerbConjugationSection';
import { getFlashcardMagicData } from '../utils/verbConjugationUtils';
import {
  PARTICLE_UNIT_META,
  PARTICLE_COLS_BY_UNIT,
  PARTICLE_ROWS_BY_UNIT,
  ParticleUnitId,
} from '../data/particleWorksheetData';
import { COLS_HINTS, ROW_HINTS } from './ParticleFlashcardSection';
import { BlogSeriesType, VERB_UNIT_TEXT_GUIDES, PARTICLE_UNIT_TEXT_GUIDES } from '../utils/adminDataExtractor';
import { getVerbConjugatedMeaning } from '../data/verbConjugatedMeanings';
import { getParticleBaseMeaning, getParticleCombinedMeaning } from '../data/particleCombinedMeanings';

const FONT_HAND =
  "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif";

const FONT_GOTHIC = "'Hakgyoansim Bareondotum', 'NanumBarunGothic', 'Pretendard', sans-serif";

let cachedFontEmbedCssPromise: Promise<string> | null = null;

async function fetchFontAsDataUrl(path: string): Promise<string | null> {
  try {
    const res = await fetch(path);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '');
      reader.onerror = () => reject(new Error('Font read error'));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

const BENGALI_UNICODE_RANGE =
  'U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0-1CF7, U+200C-200D, U+20B9, U+25CC';

export async function ensureCaptureFontsReady(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await Promise.allSettled([
      document.fonts.load('400 14px "Hakgyoansim Bareondotum"', '가'),
      document.fonts.load('700 14px "Hakgyoansim Bareondotum"', '가'),
      document.fonts.load('400 14px "NanumBarunGothic"', '가'),
      document.fonts.load('700 14px "NanumBarunGothic"', '가'),
      document.fonts.load('500 14px "Noto Sans Bengali"', 'ক'),
      document.fonts.load('700 14px "Noto Sans Bengali"', 'ক'),
    ]);
    await document.fonts.ready;
  } catch {
    // Ignore font preloading errors gracefully
  }
}

export function getLocalFontEmbedCSS(): Promise<string> {
  if (cachedFontEmbedCssPromise) return cachedFontEmbedCssPromise;

  cachedFontEmbedCssPromise = (async () => {
    const [
      bareondotumReg,
      bareondotumBold,
      badasseugiLight,
      badasseugiBold,
      nanumReg,
      nanumBold,
      bengaliMed,
      bengaliBold,
    ] = await Promise.all([
      fetchFontAsDataUrl('/fonts/HakgyoansimBareondotum-Regular.woff2'),
      fetchFontAsDataUrl('/fonts/HakgyoansimBareondotum-Bold.woff2'),
      fetchFontAsDataUrl('/fonts/HakgyoansimBadasseugi-L.woff2'),
      fetchFontAsDataUrl('/fonts/HakgyoansimBadasseugi-B.woff2'),
      fetchFontAsDataUrl('/fonts/NanumBarunGothic.woff2'),
      fetchFontAsDataUrl('/fonts/NanumBarunGothicBold.woff2'),
      fetchFontAsDataUrl('/fonts/NotoSansBengali-Medium.woff2'),
      fetchFontAsDataUrl('/fonts/NotoSansBengali-Bold.woff2'),
    ]);

    const rules: string[] = [];
    const addRule = (
      family: string,
      dataUrl: string | null,
      weight: string,
      unicodeRange?: string
    ) => {
      if (!dataUrl) return;
      const rangeClause = unicodeRange ? ` unicode-range: ${unicodeRange};` : '';
      rules.push(
        `@font-face { font-family: '${family}'; src: url('${dataUrl}') format('woff2'); font-weight: ${weight}; font-style: normal;${rangeClause} }`
      );
    };

    ['Hakgyoansim Bareondotum', '학교안심 바른돋움'].forEach((family) => {
      addRule(family, bareondotumReg, '100 600');
      addRule(family, bareondotumBold, '700 900');
    });

    [
      'Hakgyoansim Badasseugi',
      '학교안심 받아쓰기',
      '학교안심받아쓰기',
      'HakgyoansimBadasseugiTTF-L',
      'Hakgyoansim Badasseugi TTF L',
      '학교알림받아쓰기',
    ].forEach((family) => {
      addRule(family, badasseugiLight, '100 600');
      addRule(family, badasseugiBold || badasseugiLight, '700 900');
    });

    ['NanumBarunGothic', '나눔바른고딕'].forEach((family) => {
      addRule(family, nanumReg, '100 600');
      addRule(family, nanumBold, '700 900');
    });

    // Local static Bengali WOFF2 (500 & 700) prevents variable-font 900 bloating & synthetic bold mismatch
    addRule('Noto Sans Bengali', bengaliMed, '100 600', BENGALI_UNICODE_RANGE);
    addRule('Noto Sans Bengali', bengaliBold || bengaliMed, '700 900', BENGALI_UNICODE_RANGE);

    return rules.join('\n');
  })();

  return cachedFontEmbedCssPromise;
}

export async function captureNodeToPng(
  node: HTMLElement,
  fileName: string,
  options?: { width?: number; height?: number; backgroundColor?: string }
): Promise<void> {
  await ensureCaptureFontsReady();
  const fontEmbedCSS = await getLocalFontEmbedCSS();
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

  const dataUrl = await toPng(node, {
    pixelRatio: 2.5,
    cacheBust: true,
    fontEmbedCSS,
    backgroundColor: options?.backgroundColor || '#ffffff',
    ...(options?.width ? { width: options.width } : {}),
    ...(options?.height ? { height: options.height } : {}),
  });

  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

interface ScaledPreviewFrameProps {
  targetWidth: number;
  fixedHeight?: number;
  children: React.ReactNode;
  className?: string;
}

export const ScaledPreviewFrame: React.FC<ScaledPreviewFrameProps> = ({
  targetWidth,
  fixedHeight,
  children,
  className = '',
}) => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.5);
  const [measuredHeight, setMeasuredHeight] = useState<number>(fixedHeight || 460);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const update = () => {
      const availW = outer.clientWidth;
      if (availW > 0) {
        setScale(Math.min(1, availW / targetWidth));
      }
      if (!fixedHeight) {
        const h = inner.scrollHeight || inner.offsetHeight;
        if (h > 0) {
          setMeasuredHeight(h);
        }
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer);
    ro.observe(inner);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [targetWidth, fixedHeight]);

  const effectiveH = fixedHeight || measuredHeight;

  return (
    <div
      ref={outerRef}
      className={`w-full relative overflow-hidden mx-auto ${className}`}
      style={{ height: `${Math.max(120, Math.ceil(effectiveH * scale))}px` }}
    >
      <div
        ref={innerRef}
        style={{
          width: `${targetWidth}px`,
          ...(fixedHeight ? { height: `${fixedHeight}px` } : {}),
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  );
};

interface NaverBlogThumbnailCardProps {
  series: BlogSeriesType;
  unitKey: string | number;
  targetLang: SupportedLanguage;
}

export const NaverBlogThumbnailCard: React.FC<NaverBlogThumbnailCardProps> = ({
  series,
  unitKey,
  targetLang,
}) => {
  const langMeta = getLanguageMeta(targetLang);

  const palette =
    series === 'classroom'
      ? {
          seriesBadge: '교실한국어 SERIES',
          seriesTitle: '교실 필수 한국어',
          accent: '#D94A6B',
          accentSoft: '#FFF1F5',
          badgeBg: '#FCE7F3',
          badgeText: '#9D174D',
          border: '#F472B6',
          gradient: 'linear-gradient(145deg, #FFF5F8 0%, #FFE4EC 55%, #FFFFFF 100%)',
        }
      : series === 'verb'
      ? {
          seriesBadge: '용언 활용 SERIES',
          seriesTitle: '용언 활용 마스터',
          accent: '#7E22CE',
          accentSoft: '#FAF5FF',
          badgeBg: '#F3E8FF',
          badgeText: '#6B21A8',
          border: '#C084FC',
          gradient: 'linear-gradient(145deg, #FAF5FF 0%, #F3E8FF 55%, #FFFFFF 100%)',
        }
      : {
          seriesBadge: '조사 결합 SERIES',
          seriesTitle: '조사 결합 마스터',
          accent: '#059669',
          accentSoft: '#ECFDF5',
          badgeBg: '#D1FAE5',
          badgeText: '#064E3B',
          border: '#34D399',
          gradient: 'linear-gradient(145deg, #ECFDF5 0%, #D1FAE5 55%, #FFFFFF 100%)',
        };

  let unitBadge = '1단원';
  let mainTitle = '';
  let subRuleLine = '';
  let previewItems: { main: string; sub: string }[] = [];

  if (series === 'classroom') {
    const chNum = typeof unitKey === 'number' ? unitKey : Number(unitKey) || 1;
    const chMeta = CHAPTER_LIST.find((c) => c.ch === chNum) || CHAPTER_LIST[0];
    const items = VOCABULARY_DATA.filter((v) => v.ch === chMeta.ch);
    unitBadge = `${chMeta.ch}단원`;
    mainTitle = `${chMeta.icon} ${getChapterCircledTitle(chMeta.ch, targetLang)}`;
    subRuleLine = `${langMeta.flag} ${langMeta.labelKo} × 한국어 이중언어 어휘·학습지 (${items.length}단어)`;
    previewItems = items.slice(0, 5).map((item) => ({
      main: item.ko,
      sub: (item as unknown as Record<string, string>)[targetLang] || item.en,
    }));
  } else if (series === 'verb') {
    const unitId = (typeof unitKey === 'string' && unitKey.startsWith('unit') ? unitKey : 'unit1') as VerbUnitType;
    const uMeta = VERB_UNIT_META.find((u) => u.id === unitId) || VERB_UNIT_META[0];
    const cards = VERB_CARDS_BY_UNIT[uMeta.id] || [];
    const guide = VERB_UNIT_TEXT_GUIDES[uMeta.id];
    unitBadge = `${uMeta.num}단원`;
    mainTitle = uMeta.label;
    subRuleLine = guide.conjugationType || uMeta.grammar;
    previewItems = cards.slice(0, 5).map((c) => {
      const baseM = c.meanings[targetLang] || c.meanings.en;
      const conjM = getVerbConjugatedMeaning(c.id, targetLang) || baseM;
      return {
        main: `${c.baseWord} → ${c.conjugatedWord}`,
        sub: conjM !== baseM ? `${baseM} → ${conjM}` : baseM,
      };
    });
  } else {
    const pUnitId = (typeof unitKey === 'string' && unitKey.startsWith('unit') ? unitKey : 'unit1') as ParticleUnitId;
    const pIndex = Math.max(0, PARTICLE_UNIT_META.findIndex((u) => u.id === pUnitId));
    const pMeta = PARTICLE_UNIT_META[pIndex] || PARTICLE_UNIT_META[0];
    unitBadge = `${pIndex + 1}단원`;
    mainTitle = `${pMeta.circled} ${pMeta.title}`;
    subRuleLine = `${pMeta.grammar} · ${langMeta.flag} ${langMeta.labelKo} 뜻풀이 포함`;

    if (pMeta.layoutType === 'cols5') {
      const items = PARTICLE_COLS_BY_UNIT[pMeta.id] || [];
      previewItems = items.slice(0, 5).map((item) => {
        const baseM = getParticleBaseMeaning(item, targetLang);
        const combM = getParticleCombinedMeaning(item, targetLang);
        return {
          main: `${item.baseNoun} → ${item.combinedWord}`,
          sub: combM !== baseM ? `${baseM} → ${combM}` : baseM,
        };
      });
    } else {
      const rows = PARTICLE_ROWS_BY_UNIT[pMeta.id] || [];
      previewItems = rows.slice(0, 5).map((r) => ({
        main: r.fullSentence,
        sub: r.meanings[targetLang] || r.meanings.en,
      }));
    }
  }

  return (
    <div
      style={{
        width: '1000px',
        height: '1000px',
        background: palette.gradient,
        fontFamily: FONT_GOTHIC,
      }}
      className="relative flex flex-col justify-between p-14 text-slate-900 overflow-hidden select-none box-border border-[12px] border-white shadow-inner"
    >
      {/* Subtle Decorative Corner Frames */}
      <div
        style={{ borderColor: palette.border }}
        className="absolute inset-6 border-2 border-dashed rounded-3xl pointer-events-none opacity-65"
      />

      {/* 1. Top Brand & Language Concept Bar */}
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-18 h-18 rounded-2xl bg-white shadow-md border-2 border-slate-200 flex items-center justify-center p-2">
            <ManduMascot size="sm" interactive={false} />
          </div>
          <div>
            <div className="text-[30px] font-black tracking-tight text-slate-900 leading-none">
              해볼 한국어
            </div>
            <div className="text-[19px] font-bold text-slate-500 mt-1.5">
              초등 다문화 학생 맞춤형 한국어 교구
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: palette.badgeBg,
            color: palette.badgeText,
            borderColor: palette.border,
          }}
          className="px-6 py-3 rounded-xl border-2 text-[22px] font-black shadow-xs flex items-center gap-2.5"
        >
          <span>{langMeta.flag}</span>
          <span>
            {series === 'classroom'
              ? `${langMeta.labelKo} × 한국어`
              : `${langMeta.labelKo} (${langMeta.nativeName})`}
          </span>
        </div>
      </div>

      {/* 2. Main Hero Title Box */}
      <div className="relative z-10 my-auto py-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-5">
          <span
            style={{ backgroundColor: palette.accent }}
            className="px-6 py-2 rounded-lg text-white text-[24px] font-black tracking-wide shadow-sm"
          >
            {palette.seriesBadge}
          </span>
          <span className="px-6 py-2 rounded-lg bg-slate-900 text-white text-[24px] font-black shadow-sm">
            {unitBadge}
          </span>
        </div>

        <h1
          style={{
            fontFamily: FONT_HAND,
            WebkitTextStroke: '0.7px currentColor',
          }}
          className="text-[58px] leading-[1.22] font-black text-slate-950 break-keep max-w-[840px] mb-4"
        >
          {mainTitle}
        </h1>

        <p
          style={{ color: palette.badgeText, borderColor: palette.border }}
          className="px-7 py-2.5 bg-white/95 rounded-xl border-2 text-[25px] font-extrabold shadow-xs max-w-[820px] break-keep"
        >
          {subRuleLine}
        </p>

        {/* Preview Item Tiles */}
        <div className="mt-8 w-full max-w-[840px] bg-white/95 rounded-2xl border-2 border-slate-200 shadow-md p-6">
          <div className="flex items-center justify-center gap-2 text-[20px] font-black text-slate-600 mb-4">
            <BookOpen className="w-6 h-6" style={{ color: palette.accent }} />
            <span>이번 단원 주요 표현 미리보기</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {previewItems.map((p, idx) => (
              <div
                key={idx}
                style={{ backgroundColor: palette.accentSoft }}
                className="flex items-center justify-between gap-4 px-5 py-3 rounded-xl border border-slate-200/90"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    style={{ backgroundColor: palette.accent }}
                    className="w-8 h-8 rounded-md text-white text-[18px] font-black flex items-center justify-center shrink-0"
                  >
                    {idx + 1}
                  </span>
                  <span
                    style={{ fontFamily: FONT_HAND }}
                    className="text-[28px] font-black text-slate-900 truncate"
                  >
                    {p.main}
                  </span>
                </div>
                <span className="text-[21px] font-bold text-slate-600 truncate max-w-[340px]">
                  {p.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Strip */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t-2 border-slate-300/80 text-[21px] font-black text-slate-700">
        <span className="flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6" style={{ color: palette.accent }} />
          <span>플래시카드 · 해볼쌤 팁 · 인쇄용 학습지 무료 활용</span>
        </span>
        <span style={{ color: palette.accent }}>해볼쌤 블로그 자료실</span>
      </div>
    </div>
  );
};

interface SeriesFirstFlashcardCaptureCardProps {
  series: BlogSeriesType;
  unitKey: string | number;
  targetLang: SupportedLanguage;
}

export const SeriesFirstFlashcardCaptureCard: React.FC<SeriesFirstFlashcardCaptureCardProps> = ({
  series,
  unitKey,
  targetLang,
}) => {
  const langMeta = getLanguageMeta(targetLang);

  if (series === 'classroom') {
    const chNum = typeof unitKey === 'number' ? unitKey : Number(unitKey) || 1;
    const items = VOCABULARY_DATA.filter((v) => v.ch === chNum);
    const item = items[0] || VOCABULARY_DATA[0];
    const meaning = (item as unknown as Record<string, string>)[targetLang] || item.en;

    return (
      <div
        style={{ width: '760px', minHeight: '490px', fontFamily: FONT_GOTHIC }}
        className="relative rounded-xl border-4 border-pink-300 bg-gradient-to-b from-pink-50 via-[#FFF4F7] to-rose-50/80 p-7 flex flex-col justify-between shadow-sm select-none box-border"
      >
        {/* Top Metadata Row (No Interactive Close/Action Chrome) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-pink-100 border border-pink-200 text-rose-800 text-xs font-black">
            <span className="w-2 h-2 rounded-xs bg-rose-500" />
            <span>교실한국어 {chNum}단원 · 1번 낱말 카드</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-sm bg-white border border-purple-200 text-purple-900 text-xs font-black flex items-center gap-1.5 shadow-2xs">
              <span>{langMeta.flag}</span>
              <span>{langMeta.labelKo} ({langMeta.nativeName})</span>
            </div>
            <div className="w-9 h-9 rounded-md bg-white border border-pink-300 flex items-center justify-center text-rose-600 shadow-2xs">
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center my-auto py-4">
          <div className="w-28 h-28 mb-3 flex items-center justify-center drop-shadow-xs">
            <VocabVisual item={item} size="card" />
          </div>

          <div className="flex items-center justify-center gap-3 my-1">
            <h3
              style={{
                fontFamily: FONT_HAND,
                fontWeight: 900,
                WebkitTextStroke: '0.6px currentColor',
              }}
              className="text-5xl font-black text-slate-900 leading-tight"
            >
              {item.ko}
            </h3>
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-rose-100 text-rose-700 border border-rose-200">
              <Volume2 className="w-5 h-5" />
            </span>
          </div>

          {item.romaja && (
            <div className="mt-2 px-4 py-0.5 bg-pink-100/90 text-rose-950 text-base font-bold rounded-sm border border-pink-200">
              [{item.romaja}]
            </div>
          )}

          {/* Multilingual Meaning Card */}
          <div className="mt-4 w-full max-w-lg bg-white rounded-md px-5 py-3 border-2 border-pink-300 shadow-sm flex items-center justify-center gap-3">
            <span className="text-2xl leading-none">{langMeta.flag}</span>
            <span className={`text-2xl font-black text-rose-900 ${langMeta.fontClass || ''}`}>
              {meaning}
            </span>
          </div>

          {/* Sample Sentence with Speaker UI */}
          {item.samplePhrase && (
            <div className="mt-3.5 px-5 py-2.5 bg-white/95 rounded-md border border-pink-200 shadow-xs max-w-lg w-full flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-slate-800">
                <Volume2 className="w-4 h-4 text-rose-600 shrink-0" />
                <p style={{ fontFamily: FONT_HAND }} className="text-lg font-bold">
                  "{item.samplePhrase}"
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-[11px] font-bold text-rose-700/75">
          해볼 한국어 • 교실 필수 어휘 플래시카드
        </div>
      </div>
    );
  }

  if (series === 'verb') {
    const unitId = (typeof unitKey === 'string' && unitKey.startsWith('unit') ? unitKey : 'unit1') as VerbUnitType;
    const uMeta = VERB_UNIT_META.find((u) => u.id === unitId) || VERB_UNIT_META[0];
    const cards = VERB_CARDS_BY_UNIT[uMeta.id] || VERB_CARDS_BY_UNIT.unit1;
    const card = cards[0];
    const magicData = getFlashcardMagicData(card.baseWord, uMeta.id);
    const baseM = card.meanings[targetLang] || card.meanings.en;
    const conjM = getVerbConjugatedMeaning(card.id, targetLang) || baseM;
    const meaning = conjM !== baseM ? `${baseM} → ${conjM}` : baseM;

    return (
      <div
        style={{ width: '760px', minHeight: '490px', fontFamily: FONT_GOTHIC }}
        className="relative rounded-xl border-4 border-purple-300 bg-gradient-to-b from-purple-50 via-[#FAF5FF] to-purple-100/70 p-7 flex flex-col justify-between shadow-sm select-none box-border"
      >
        {/* Top Metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-purple-100 border border-purple-200 text-purple-900 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>용언 활용 {uMeta.num}단원 ({uMeta.grammar}) · 1번 카드</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-sm bg-white border border-purple-200 text-purple-900 text-xs font-black flex items-center gap-1.5 shadow-2xs">
              <span>{langMeta.flag}</span>
              <span>{langMeta.labelKo}</span>
            </div>
            <div className="w-9 h-9 rounded-md bg-white border border-purple-300 flex items-center justify-center text-purple-700 shadow-2xs">
              <Volume2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center my-auto py-4">
          <div className="w-26 h-26 mb-3 flex items-center justify-center drop-shadow-xs">
            {card.illustrationSvg ? (
              <img src={card.illustrationSvg} alt={card.baseWord} className="w-full h-full object-contain" />
            ) : (
              <span className="text-6xl">{card.emojiIcon || '📖'}</span>
            )}
          </div>

          {/* Base -> Conjugated Visual Transformation */}
          <div className="flex flex-wrap items-center justify-center gap-4 my-2">
            <div className="px-4 py-2 bg-white/95 rounded-md border border-purple-200 shadow-2xs flex items-baseline">
              <span
                style={{ fontFamily: FONT_HAND, fontWeight: 900 }}
                className="text-3xl text-slate-800"
              >
                {magicData.baseStem}
              </span>
              <span
                style={{ fontFamily: FONT_HAND, fontWeight: 900 }}
                className="text-3xl text-blue-600"
              >
                {magicData.baseEnding}
              </span>
            </div>

            <span className="text-2xl font-black text-purple-500">→</span>

            <div className="px-5 py-2 bg-white rounded-md border-2 border-purple-300 shadow-sm flex items-center gap-2">
              <div
                style={{
                  fontFamily: FONT_HAND,
                  fontWeight: 900,
                  WebkitTextStroke: '0.6px currentColor',
                }}
                className="text-4xl leading-tight inline-flex items-center"
              >
                {magicData.prefixAdverb && (
                  <span style={{ color: magicData.prefixColor || '#16A34A' }} className="mr-2">
                    {magicData.prefixAdverb}
                  </span>
                )}

                {magicData.isFullWordMagic && magicData.fullConjugatedWord ? (
                  <span style={{ color: '#9333EA' }}>{magicData.fullConjugatedWord}</span>
                ) : (
                  <>
                    {magicData.magicStemChars ? (
                      magicData.magicStemChars.map((ch, idx) => (
                        <span key={idx} style={{ color: ch.color }}>
                          {ch.char}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: magicData.magicStemColor }}>{magicData.magicStem}</span>
                    )}

                    {magicData.midAdverb && (
                      <span style={{ color: magicData.midAdverbColor || '#16A34A' }} className="mx-1.5">
                        {magicData.midAdverb}
                      </span>
                    )}

                    <span style={{ color: magicData.magicEndingColor }}>
                      {uMeta.id === 'unit12' && magicData.midAdverb ? magicData.fallingRedEnding : magicData.magicEnding}
                    </span>
                  </>
                )}
              </div>
              <Volume2 className="w-5 h-5 text-purple-600 shrink-0" />
            </div>
          </div>

          <div className="mt-2 px-3.5 py-0.5 rounded-sm bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black">
            💡 힌트: {card.vowelHint}
          </div>

          {/* Multilingual Meaning */}
          <div className="mt-3.5 px-5 py-1.5 bg-purple-100/95 text-purple-950 text-lg font-black rounded-sm border border-purple-200 flex items-center gap-2">
            <span>{langMeta.flag}</span>
            <span className={langMeta.fontClass || ''}>[{meaning}]</span>
          </div>

          {/* Sample Sentence */}
          <div className="mt-3.5 px-5 py-2.5 bg-white/95 rounded-md border border-purple-200 shadow-xs max-w-lg w-full flex items-center justify-center gap-2">
            <Volume2 className="w-4 h-4 text-purple-600 shrink-0" />
            <p style={{ fontFamily: FONT_HAND }} className="text-lg font-bold text-slate-800">
              "{card.sampleSentence}"
            </p>
          </div>
        </div>

        <div className="text-center text-[11px] font-bold text-purple-700/75">
          해볼 한국어 • 용언 활용 30단원 플래시카드
        </div>
      </div>
    );
  }

  // Particle
  const pUnitId = (typeof unitKey === 'string' && unitKey.startsWith('unit') ? unitKey : 'unit1') as ParticleUnitId;
  const pIndex = Math.max(0, PARTICLE_UNIT_META.findIndex((u) => u.id === pUnitId));
  const pMeta = PARTICLE_UNIT_META[pIndex] || PARTICLE_UNIT_META[0];
  const isRows = pMeta.layoutType === 'rows5';
  const colItem = !isRows ? (PARTICLE_COLS_BY_UNIT[pMeta.id] || [])[0] : undefined;
  const rowItem = isRows ? (PARTICLE_ROWS_BY_UNIT[pMeta.id] || [])[0] : undefined;
  const illustration = colItem?.illustrationSvg || rowItem?.illustrationSvg || '';
  const colBase = colItem ? getParticleBaseMeaning(colItem, targetLang) : '';
  const colComb = colItem ? getParticleCombinedMeaning(colItem, targetLang) : '';
  const meaning = colItem
    ? colComb !== colBase
      ? `${colBase} → ${colComb}`
      : colBase
    : rowItem?.meanings[targetLang] || rowItem?.meanings.en || '';
  const fullSentence = colItem
    ? `${colItem.sentencePrefix}${colItem.sentenceHighlight}${colItem.sentenceSuffix}`
    : rowItem?.fullSentence || '';

  return (
    <div
      style={{ width: '760px', minHeight: '490px', fontFamily: FONT_GOTHIC }}
      className="relative rounded-xl border-4 border-emerald-300 bg-gradient-to-b from-emerald-50 via-[#F4FDF9] to-emerald-100/80 p-7 flex flex-col justify-between shadow-sm select-none box-border"
    >
      {/* Top Metadata */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-100 border border-emerald-200 text-emerald-950 text-xs font-black">
          <span>조사 결합 {pIndex + 1}단원 ({pMeta.grammar}) · 1번 카드</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-sm bg-white border border-emerald-200 text-emerald-950 text-xs font-black flex items-center gap-1.5 shadow-2xs">
            <span>{langMeta.flag}</span>
            <span>{langMeta.labelKo}</span>
          </div>
          <div className="w-9 h-9 rounded-md bg-white border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-2xs">
            <Volume2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center text-center my-auto py-4">
        {illustration && (
          <div className="w-24 h-24 mb-3 flex items-center justify-center drop-shadow-xs">
            <img src={illustration} alt={pMeta.title} className="w-full h-full object-contain" />
          </div>
        )}

        {colItem ? (
          <>
            <div className="flex items-center justify-center gap-4 my-2">
              <div className="px-4 py-2 bg-white rounded-md border border-emerald-200 shadow-2xs">
                <span style={{ fontFamily: FONT_HAND, fontWeight: 900 }} className="text-3xl text-slate-800">
                  {colItem.baseNoun}
                </span>
              </div>
              <span className="text-2xl font-black text-emerald-600">→</span>
              <div className="px-5 py-2 bg-white rounded-md border-2 border-emerald-400 shadow-sm flex items-center gap-2">
                <span
                  style={{
                    fontFamily: FONT_HAND,
                    fontWeight: 900,
                    WebkitTextStroke: '0.6px currentColor',
                  }}
                  className="text-4xl inline-flex items-center"
                >
                  {colItem.combinedSegments.map((seg, i) => (
                    <span key={i} style={{ color: seg.color }}>
                      {seg.text}
                    </span>
                  ))}
                </span>
                <Volume2 className="w-5 h-5 text-emerald-700 shrink-0" />
              </div>
            </div>
            {COLS_HINTS[colItem.id] && (
              <div className="mt-2 px-3.5 py-0.5 rounded-sm bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black">
                💡 {COLS_HINTS[colItem.id]}
              </div>
            )}
          </>
        ) : rowItem ? (
          <>
            <div className="flex flex-wrap items-center justify-center gap-2 my-2">
              {rowItem.blocks.map((block, bIdx) => (
                <React.Fragment key={bIdx}>
                  {bIdx > 0 && <span className="text-lg font-black text-emerald-600">+</span>}
                  <div className="px-3.5 py-1.5 bg-white rounded-md border border-emerald-200 shadow-2xs inline-flex items-center">
                    {block.segments.map((seg, sIdx) => (
                      <span
                        key={sIdx}
                        style={{ fontFamily: FONT_HAND, fontWeight: 900, color: seg.color }}
                        className="text-3xl"
                      >
                        {seg.text}
                      </span>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
            {ROW_HINTS[rowItem.id] && (
              <div className="mt-2 px-3.5 py-0.5 rounded-sm bg-amber-100 border border-amber-300 text-amber-950 text-xs font-black">
                💡 {ROW_HINTS[rowItem.id].join(' / ')}
              </div>
            )}
          </>
        ) : null}

        {/* Meaning Badge */}
        <div className="mt-3.5 px-5 py-1.5 bg-emerald-100 text-emerald-950 text-lg font-black rounded-sm border border-emerald-200 flex items-center gap-2">
          <span>{langMeta.flag}</span>
          <span className={langMeta.fontClass || ''}>[{meaning}]</span>
        </div>

        {/* Sample Sentence */}
        <div className="mt-3.5 px-5 py-2.5 bg-white/95 rounded-md border border-emerald-200 shadow-xs max-w-lg w-full flex items-center justify-center gap-2">
          <Volume2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <p style={{ fontFamily: FONT_HAND }} className="text-lg font-bold text-slate-800">
            "{fullSentence}"
          </p>
        </div>
      </div>

      <div className="text-center text-[11px] font-bold text-emerald-700">
        해볼 한국어 • 조사 결합 30단원 플래시카드
      </div>
    </div>
  );
};
