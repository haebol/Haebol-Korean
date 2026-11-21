import React, { useState, useRef, useMemo } from 'react';
import {
  Download,
  Copy,
  Check,
  Loader2,
  RotateCcw,
  Sparkles,
  FileText,
  Layers,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { VOCABULARY_DATA } from '../data/vocabulary';
import {
  ADMIN_SUMMARY_LANGUAGES,
  AdminSummaryLang,
  CONSONANTS_SUMMARY_COPIES,
  VOWELS_SUMMARY_COPIES,
  BATCHIM_SUMMARY_COPIES,
  VERB_SUMMARY_COPIES,
  PARTICLE_SUMMARY_COPIES,
} from '../data/summaryTranslations';
import {
  SUMMARY_SHARE_COVER_COPY,
  SUMMARY_SHARE_COMPACT_COVER_COPY,
  SummaryShareEdition,
  DEFAULT_SUMMARY_SHARE_DRAFTS,
  SummaryShareBlogDraft,
  SummaryShareDraftMap,
  loadSummaryShareDrafts,
  saveSummaryShareDraft,
  resetSummaryShareDraft,
  getSummaryLangOption,
} from '../data/summaryShareBlogData';
import {
  ConsonantsSummaryWorksheetPage,
  VowelsSummaryWorksheetPage,
} from './PrintableJamoSheets';
import { BatchimSummaryWorksheetPage } from './PrintableBatchimSheet';
import {
  VerbSummaryWorksheetPage,
  ParticleSummaryWorksheetPage,
  ClassroomSummaryWorksheetPage,
  VerbSummaryCompactWorksheetPage,
  ParticleSummaryCompactWorksheetPage,
  ClassroomSummaryCompactWorksheetPage,
} from './ExtraSummaryWorksheets';
import { ScaledPreviewFrame, captureNodeToPng } from './AdminCaptureCards';
import { playCutePop } from '../utils/audio';

const FONT_GOTHIC =
  "'Hakgyoansim Bareondotum', 'NanumBarunGothic', 'Noto Sans Bengali', 'PingFang SC', 'Microsoft YaHei', 'Pretendard', sans-serif";

interface MiniSheetFrameProps {
  label: string;
  accentBg: string;
  accentText: string;
  borderColor: string;
  tiltDeg: number;
  sheetWidth: number;
  extraRightBadge?: string;
  stackedPaper?: boolean;
  children: React.ReactNode;
}

const MiniSheetFrame: React.FC<MiniSheetFrameProps> = ({
  label,
  accentBg,
  accentText,
  borderColor,
  tiltDeg,
  sheetWidth,
  extraRightBadge,
  stackedPaper = false,
  children,
}) => {
  const frameWidth = 446;
  const frameHeight = 208;
  const scale = (frameWidth - 10) / sheetWidth;

  return (
    <div
      style={{
        position: 'relative',
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        transform: `rotate(${tiltDeg}deg)`,
      }}
    >
      {/* 3-page paper stack illusion for Classroom 300 (3장) */}
      {stackedPaper && (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'translate(9px, 8px) rotate(1.3deg)',
              borderRadius: '14px',
              backgroundColor: '#FFF1F5',
              border: '2px solid #FDA4AF',
              boxShadow: '0 6px 14px rgba(15, 23, 42, 0.08)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: 'translate(4.5px, 4px) rotate(0.6deg)',
              borderRadius: '14px',
              backgroundColor: '#FFF7FA',
              border: '2px solid #F9A8D4',
              boxShadow: '0 6px 14px rgba(15, 23, 42, 0.08)',
            }}
          />
        </>
      )}

      {/* Main Sheet Preview Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '14px',
          backgroundColor: '#FFFFFF',
          border: `2.5px solid ${borderColor}`,
          boxShadow: '0 10px 24px rgba(15, 23, 42, 0.11)',
          overflow: 'hidden',
          padding: '5px',
          boxSizing: 'border-box',
        }}
      >
        {/* Scaled Real Summary Sheet */}
        <div
          style={{
            width: `${sheetWidth}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        >
          {children}
        </div>

        {/* Soft bottom veil so the sneak-peek crop feels refined */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '44px',
            background:
              'linear-gradient(to top, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.32) 55%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Crisp Corner Label Ribbon */}
        <div
          style={{
            position: 'absolute',
            left: '10px',
            bottom: '9px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '8px',
            backgroundColor: accentBg,
            color: accentText,
            fontSize: '15px',
            fontWeight: 900,
            letterSpacing: '-0.01em',
            boxShadow: '0 3px 10px rgba(15, 23, 42, 0.16)',
            border: '1.5px solid rgba(255,255,255,0.75)',
          }}
        >
          <span>{label}</span>
        </div>

        {extraRightBadge && (
          <div
            style={{
              position: 'absolute',
              right: '10px',
              bottom: '9px',
              padding: '5px 11px',
              borderRadius: '8px',
              backgroundColor: '#BE123C',
              color: '#FFFFFF',
              fontSize: '14px',
              fontWeight: 900,
              boxShadow: '0 3px 10px rgba(190, 18, 60, 0.28)',
            }}
          >
            {extraRightBadge}
          </div>
        )}
      </div>
    </div>
  );
};

export const SummaryShareCoverCard: React.FC<{
  lang: AdminSummaryLang;
  edition?: SummaryShareEdition;
}> = ({ lang, edition = 'expanded' }) => {
  const isCompact = edition === 'compact' && (lang === 'ko' || lang === 'en');
  const compactLang: 'ko' | 'en' = lang === 'en' ? 'en' : 'ko';
  const cover = isCompact ? SUMMARY_SHARE_COMPACT_COVER_COPY[compactLang] : SUMMARY_SHARE_COVER_COPY[lang];
  const classroomLang: SupportedLanguage = lang === 'ko' ? 'en' : lang;

  return (
    <div
      style={{
        width: '1000px',
        height: '1000px',
        background: isCompact
          ? 'linear-gradient(150deg, #FFFDF8 0%, #FEF3C7 48%, #FFF7ED 100%)'
          : 'linear-gradient(150deg, #FFFDF8 0%, #FFF7E8 48%, #ECFDF5 100%)',
        fontFamily: FONT_GOTHIC,
        padding: '28px 34px 24px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        border: '10px solid #FFFFFF',
      }}
    >
      {/* Soft decorative editorial ambient shapes */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '280px',
          height: '280px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,191,36,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-90px',
          left: '-70px',
          width: '300px',
          height: '300px',
          borderRadius: '9999px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* 1. Editorial Header */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                fontSize: '17px',
                fontWeight: 900,
                letterSpacing: '-0.01em',
              }}
            >
              해볼한국어 · 무료 나눔
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 14px',
                borderRadius: '8px',
                backgroundColor: '#FEF3C7',
                border: '2px solid #F59E0B',
                color: '#78350F',
                fontSize: '17px',
                fontWeight: 900,
              }}
            >
              {cover.langBadge}
            </span>
          </div>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 15px',
              borderRadius: '8px',
              backgroundColor: isCompact ? '#D97706' : '#059669',
              color: '#FFFFFF',
              fontSize: '17px',
              fontWeight: 900,
              boxShadow: isCompact
                ? '0 4px 12px rgba(217, 119, 6, 0.28)'
                : '0 4px 12px rgba(5, 150, 105, 0.25)',
            }}
          >
            {cover.packBadge}
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: '45px',
            lineHeight: 1.18,
            fontWeight: 900,
            color: '#0F172A',
            letterSpacing: '-0.03em',
          }}
        >
          {cover.mainTitle}
        </h1>
        <p
          style={{
            margin: '7px 0 0',
            fontSize: '20px',
            lineHeight: 1.35,
            fontWeight: 800,
            color: '#475569',
            letterSpacing: '-0.01em',
          }}
        >
          {cover.subTitle}
        </p>
      </div>

      {/* 2. Hero 2x3 Collage of ALL 6 Actual Summary Sheets */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 446px)',
          gridTemplateRows: 'repeat(3, 208px)',
          justifyContent: 'space-between',
          alignContent: 'center',
          rowGap: '18px',
          columnGap: '16px',
          margin: '12px 0',
        }}
      >
        {/* 1. 한국어 자음 */}
        <MiniSheetFrame
          label={cover.sheetLabels[0]}
          accentBg="#B45309"
          accentText="#FFFFFF"
          borderColor="#F59E0B"
          tiltDeg={-0.9}
          sheetWidth={1060}
        >
          <ConsonantsSummaryWorksheetPage
            interactiveAudio={false}
            copy={CONSONANTS_SUMMARY_COPIES[lang]}
          />
        </MiniSheetFrame>

        {/* 2. 한국어 모음 */}
        <MiniSheetFrame
          label={cover.sheetLabels[1]}
          accentBg="#0369A1"
          accentText="#FFFFFF"
          borderColor="#38BDF8"
          tiltDeg={0.9}
          sheetWidth={1060}
        >
          <VowelsSummaryWorksheetPage
            interactiveAudio={false}
            copy={VOWELS_SUMMARY_COPIES[lang]}
          />
        </MiniSheetFrame>

        {/* 3. 한국어 받침 */}
        <MiniSheetFrame
          label={cover.sheetLabels[2]}
          accentBg="#4338CA"
          accentText="#FFFFFF"
          borderColor="#818CF8"
          tiltDeg={0.7}
          sheetWidth={1060}
        >
          <BatchimSummaryWorksheetPage
            interactiveAudio={false}
            copy={BATCHIM_SUMMARY_COPIES[lang]}
          />
        </MiniSheetFrame>

        {/* 4. 용언 활용 */}
        <MiniSheetFrame
          label={cover.sheetLabels[3]}
          accentBg="#7E22CE"
          accentText="#FFFFFF"
          borderColor="#C084FC"
          tiltDeg={-0.7}
          sheetWidth={isCompact ? 990 : 1060}
          stackedPaper={!isCompact}
        >
          {isCompact ? (
            <VerbSummaryCompactWorksheetPage
              interactiveAudio={false}
              copy={VERB_SUMMARY_COPIES[compactLang]}
            />
          ) : (
            <VerbSummaryWorksheetPage
              interactiveAudio={false}
              copy={VERB_SUMMARY_COPIES[lang]}
              pagePart="grid"
            />
          )}
        </MiniSheetFrame>

        {/* 5. 조사 결합 */}
        <MiniSheetFrame
          label={cover.sheetLabels[4]}
          accentBg="#047857"
          accentText="#FFFFFF"
          borderColor="#34D399"
          tiltDeg={-0.6}
          sheetWidth={isCompact ? 990 : 1060}
          stackedPaper={!isCompact}
        >
          {isCompact ? (
            <ParticleSummaryCompactWorksheetPage
              interactiveAudio={false}
              copy={PARTICLE_SUMMARY_COPIES[compactLang]}
            />
          ) : (
            <ParticleSummaryWorksheetPage
              interactiveAudio={false}
              copy={PARTICLE_SUMMARY_COPIES[lang]}
              pagePart="grid"
            />
          )}
        </MiniSheetFrame>

        {/* 6. 필수 교실 한국어 300 (6장 또는 3장 압축) */}
        <MiniSheetFrame
          label={cover.sheetLabels[5]}
          accentBg="#9D174D"
          accentText="#FFFFFF"
          borderColor="#F472B6"
          tiltDeg={0.8}
          sheetWidth={isCompact ? 990 : 1060}
          extraRightBadge={cover.classroomPagesBadge}
          stackedPaper
        >
          {isCompact ? (
            <ClassroomSummaryCompactWorksheetPage
              vocabulary={VOCABULARY_DATA}
              pageIndex={0}
              selectedLang="en"
              uiLang={compactLang}
              interactiveAudio={false}
            />
          ) : (
            <ClassroomSummaryWorksheetPage
              vocabulary={VOCABULARY_DATA}
              pageIndex={0}
              selectedLang={classroomLang}
              uiLang={lang}
              interactiveAudio={false}
            />
          )}
        </MiniSheetFrame>
      </div>

      {/* 3. Bottom Strip */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '2px solid rgba(15, 23, 42, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              backgroundColor: '#1E293B',
              color: '#FDE68A',
              fontSize: '14px',
              fontWeight: 900,
              letterSpacing: '0.03em',
            }}
          >
            PNG · PDF
          </span>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 800,
              color: '#1E293B',
            }}
          >
            {cover.footerLeft}
          </span>
        </div>

        <span
          style={{
            fontSize: '17px',
            fontWeight: 900,
            color: '#64748B',
            letterSpacing: '-0.01em',
          }}
        >
          Haebol Korean
        </span>
      </div>
    </div>
  );
};

export const SummaryShareBlogPanel: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<AdminSummaryLang>('ko');
  const [coverEdition, setCoverEdition] = useState<SummaryShareEdition>('expanded');
  const [savedDrafts, setSavedDrafts] = useState<SummaryShareDraftMap>(() => loadSummaryShareDrafts());

  const [copiedKey, setCopiedKey] = useState<'title' | 'body' | 'all' | 'tags' | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  // Cover PNG capture states
  const [captureLang, setCaptureLang] = useState<AdminSummaryLang>('ko');
  const [captureEdition, setCaptureEdition] = useState<SummaryShareEdition>('expanded');
  const [isCapturingSingle, setIsCapturingSingle] = useState(false);
  const [batchProgress, setBatchProgress] = useState<{ done: number; total: number; label: string } | null>(null);
  const [captureNotice, setCaptureNotice] = useState<string | null>(null);
  const [captureError, setCaptureError] = useState<string | null>(null);
  const offscreenCoverRef = useRef<HTMLDivElement | null>(null);

  const supportsCompactCover = selectedLang === 'ko' || selectedLang === 'en';
  const effectiveEdition: SummaryShareEdition = supportsCompactCover ? coverEdition : 'expanded';
  const activeLangMeta = useMemo(() => getSummaryLangOption(selectedLang), [selectedLang]);
  const defaultDraft = DEFAULT_SUMMARY_SHARE_DRAFTS[selectedLang];
  const currentDraft: SummaryShareBlogDraft = savedDrafts[selectedLang] || defaultDraft;
  const isEdited = Boolean(savedDrafts[selectedLang]);
  const editedCount = Object.keys(savedDrafts).length;

  const updateCurrentDraft = (patch: Partial<SummaryShareBlogDraft>) => {
    const nextDraft: SummaryShareBlogDraft = {
      title: patch.title ?? currentDraft.title,
      body: patch.body ?? currentDraft.body,
      tags: patch.tags ?? currentDraft.tags,
    };
    const nextMap = saveSummaryShareDraft(selectedLang, nextDraft);
    setSavedDrafts(nextMap);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1200);
  };

  const handleResetCurrentDraft = () => {
    playCutePop();
    const nextMap = resetSummaryShareDraft(selectedLang);
    setSavedDrafts(nextMap);
  };

  const handleCopy = async (kind: 'title' | 'body' | 'tags' | 'all') => {
    playCutePop();
    const text =
      kind === 'title'
        ? currentDraft.title
        : kind === 'body'
        ? currentDraft.body
        : kind === 'tags'
        ? currentDraft.tags
        : `${currentDraft.title}\n\n${currentDraft.body}\n\n${currentDraft.tags}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(kind);
      window.setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // ignore clipboard restrictions
    }
  };

  const handleDownloadDraftTxt = () => {
    playCutePop();
    const content = `[제목]\n${currentDraft.title}\n\n[본문]\n${currentDraft.body}\n\n[태그]\n${currentDraft.tags}\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `해볼한국어_총정리표_무료나눔_블로그초안_${selectedLang}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const waitForPaint = (ms = 180) =>
    new Promise<void>((resolve) => {
      window.setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }, ms);
    });

  const handleDownloadSingleCover = async (editionOverride?: SummaryShareEdition) => {
    if (isCapturingSingle || batchProgress) return;
    playCutePop();
    const targetEdition: SummaryShareEdition =
      editionOverride ?? effectiveEdition;
    const isTargetCompact = targetEdition === 'compact' && (selectedLang === 'ko' || selectedLang === 'en');
    setCaptureError(null);
    setCaptureNotice(null);
    setIsCapturingSingle(true);
    setCaptureLang(selectedLang);
    setCaptureEdition(isTargetCompact ? 'compact' : 'expanded');

    try {
      await waitForPaint(220);
      if (!offscreenCoverRef.current) {
        throw new Error('대표이미지 캡처 대상을 찾지 못했습니다.');
      }
      const fileName = isTargetCompact
        ? `해볼한국어_총정리표6종_압축8장_대표이미지_${selectedLang}_1000x1000.png`
        : `해볼한국어_총정리표6종_대표이미지_${selectedLang}_1000x1000.png`;
      await captureNodeToPng(offscreenCoverRef.current, fileName, {
        width: 1000,
        height: 1000,
        backgroundColor: '#FFFDF8',
      });
      setCaptureNotice(
        `${activeLangMeta.flag} ${activeLangMeta.labelKo} ${
          isTargetCompact ? '압축판(8장) ' : '확장판(13장) '
        }대표이미지 PNG 저장 완료!`
      );
    } catch (err) {
      setCaptureError(
        err instanceof Error ? `이미지 저장 오류: ${err.message}` : '대표이미지 저장 중 오류가 발생했습니다.'
      );
    } finally {
      setIsCapturingSingle(false);
    }
  };

  const handleBatchDownloadAll8Covers = async () => {
    if (isCapturingSingle || batchProgress) return;
    playCutePop();
    setCaptureError(null);
    setCaptureNotice(null);
    setBatchProgress({ done: 0, total: ADMIN_SUMMARY_LANGUAGES.length, label: '8개국어 확장판(13장)' });

    try {
      for (let i = 0; i < ADMIN_SUMMARY_LANGUAGES.length; i++) {
        const langOpt = ADMIN_SUMMARY_LANGUAGES[i];
        setCaptureLang(langOpt.code);
        setCaptureEdition('expanded');
        await waitForPaint(280);
        if (!offscreenCoverRef.current) {
          throw new Error('대표이미지 캡처 대상을 찾지 못했습니다.');
        }
        const fileName = `해볼한국어_총정리표6종_대표이미지_${i + 1}_${langOpt.code}_1000x1000.png`;
        await captureNodeToPng(offscreenCoverRef.current, fileName, {
          width: 1000,
          height: 1000,
          backgroundColor: '#FFFDF8',
        });
        setBatchProgress({ done: i + 1, total: ADMIN_SUMMARY_LANGUAGES.length, label: '8개국어 확장판(13장)' });
        await new Promise((r) => window.setTimeout(r, 200));
      }
      setCaptureNotice('8개국어 총정리표 대표이미지(13장 확장판) PNG 8장 일괄 저장이 완료되었습니다!');
    } catch (err) {
      setCaptureError(
        err instanceof Error ? `일괄 저장 오류: ${err.message}` : '8개국어 일괄 저장 중 오류가 발생했습니다.'
      );
    } finally {
      setBatchProgress(null);
    }
  };

  const handleBatchDownloadCompact2Covers = async () => {
    if (isCapturingSingle || batchProgress) return;
    playCutePop();
    setCaptureError(null);
    setCaptureNotice(null);
    const compactLangs: ('ko' | 'en')[] = ['ko', 'en'];
    setBatchProgress({ done: 0, total: compactLangs.length, label: '한·영 압축판(8장)' });

    try {
      for (let i = 0; i < compactLangs.length; i++) {
        const code = compactLangs[i];
        setCaptureLang(code);
        setCaptureEdition('compact');
        await waitForPaint(280);
        if (!offscreenCoverRef.current) {
          throw new Error('대표이미지 캡처 대상을 찾지 못했습니다.');
        }
        const fileName = `해볼한국어_총정리표6종_압축8장_대표이미지_${i + 1}_${code}_1000x1000.png`;
        await captureNodeToPng(offscreenCoverRef.current, fileName, {
          width: 1000,
          height: 1000,
          backgroundColor: '#FFFDF8',
        });
        setBatchProgress({ done: i + 1, total: compactLangs.length, label: '한·영 압축판(8장)' });
        await new Promise((r) => window.setTimeout(r, 200));
      }
      setCaptureNotice('한국어·영어 총정리표 6종(압축 8장) 대표이미지 PNG 2장 저장이 완료되었습니다!');
    } catch (err) {
      setCaptureError(
        err instanceof Error ? `압축판 저장 오류: ${err.message}` : '한·영 압축판 저장 중 오류가 발생했습니다.'
      );
    } finally {
      setBatchProgress(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* 1. 8-Language Selector Strip */}
      <section className="bg-white rounded-xl border border-amber-200/90 p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-1.5">
              <span>🎁 ‘총정리표 6종(13장)’ 무료 나눔 블로그 글 초안 & 대표이미지</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              한국어 원판부터 7개국어 번역판까지 언어별 1편씩(총 8편) 초안을 자유롭게 다듬고, 6종 미리보기가 담긴 대표이미지 PNG 1장을 저장하세요.
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-[11px] font-black text-amber-900 whitespace-nowrap shrink-0 tabular-nums">
            8개 언어 지원 · 수정 저장 {editedCount}/8
          </span>
        </div>

        {/* 8 Language Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {ADMIN_SUMMARY_LANGUAGES.map((opt, idx) => {
            const active = selectedLang === opt.code;
            const hasCustom = Boolean(savedDrafts[opt.code]);
            return (
              <button
                key={opt.code}
                type="button"
                onClick={() => {
                  playCutePop();
                  setSelectedLang(opt.code);
                  setCaptureNotice(null);
                  setCaptureError(null);
                }}
                className={`relative px-2 py-2 rounded-lg border text-xs font-black flex items-center justify-center gap-1 cursor-pointer transition-all whitespace-nowrap ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
                }`}
              >
                <span>{opt.flag}</span>
                <span>{opt.code === 'ko' ? '한국어' : opt.labelKo}</span>
                <span className={`text-[10px] tabular-nums ${active ? 'text-amber-300' : 'text-slate-400'}`}>
                  #{idx + 1}
                </span>
                {hasCustom && (
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"
                    title="직접 수정 저장됨"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {captureError && (
        <div className="px-4 py-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{captureError}</span>
        </div>
      )}

      {captureNotice && (
        <div className="px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{captureNotice}</span>
        </div>
      )}

      {/* 2. Main Split Layout: Left = 6-Sheet Collage Cover Generator / Right = Editable Blog Draft */}
      <section className="grid grid-cols-1 xl:grid-cols-[410px_1fr] gap-5 items-start">
        {/* LEFT: Representative Blog Cover (1000x1000 PNG) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>6종 미리보기 대표이미지 (1000×1000)</span>
            </span>
            <span className="text-[11px] font-bold text-slate-400 shrink-0">
              {activeLangMeta.flag} {activeLangMeta.nativeName}
            </span>
          </div>

          {/* 한국어·영어 전용: 확장판 13장 vs 압축판 8장 대표이미지 선택 토글 */}
          {supportsCompactCover && (
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setCoverEdition('expanded');
                }}
                className={`py-1.5 px-2 rounded-md text-[11px] font-black cursor-pointer transition-all ${
                  effectiveEdition === 'expanded'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-white/70'
                }`}
              >
                확장판 · 6종 13장
              </button>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setCoverEdition('compact');
                }}
                className={`py-1.5 px-2 rounded-md text-[11px] font-black cursor-pointer transition-all ${
                  effectiveEdition === 'compact'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-white/70'
                }`}
              >
                압축판 · 6종 8장 (한·영)
              </button>
            </div>
          )}

          <div className="rounded-lg border border-slate-200 overflow-hidden bg-[#FFFDF8]">
            <ScaledPreviewFrame targetWidth={1000} fixedHeight={1000}>
              <SummaryShareCoverCard lang={selectedLang} edition={effectiveEdition} />
            </ScaledPreviewFrame>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              disabled={isCapturingSingle || Boolean(batchProgress)}
              onClick={() => handleDownloadSingleCover()}
              className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {isCapturingSingle ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>PNG 생성 중...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>
                    📸 {activeLangMeta.flag} 현재 대표이미지 저장 ({effectiveEdition === 'compact' ? '압축 8장판' : '확장 13장판'})
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isCapturingSingle || Boolean(batchProgress)}
              onClick={handleBatchDownloadCompact2Covers}
              className="w-full py-2 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 disabled:opacity-50 border border-amber-300 text-amber-950 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              {batchProgress && batchProgress.label === '한·영 압축판(8장)' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>
                    한·영 압축판 저장 중 ({batchProgress.done} / {batchProgress.total})
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>📦 한·영 압축판(6종 8장) 대표이미지 2장 저장</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isCapturingSingle || Boolean(batchProgress)}
              onClick={handleBatchDownloadAll8Covers}
              className="w-full py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 border border-emerald-300 text-emerald-900 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              {batchProgress && batchProgress.label === '8개국어 확장판(13장)' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>
                    8개국어 일괄 저장 중 ({batchProgress.done} / {batchProgress.total})
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>📦 8개국어 확장판(6종 13장) 대표이미지 8장 저장</span>
                </>
              )}
            </button>
          </div>

          {/* Concise Posting Attachment Reminder (No duplicate PNG/PDF downloaders) */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 space-y-1.5 text-[11px] text-slate-600">
            <div className="font-black text-slate-800">📌 이 글(1편) 첨부 구성 체크</div>
            <ul className="space-y-1 font-semibold leading-snug">
              <li>• 대표이미지 1장: 위 버튼으로 PNG 저장</li>
              {effectiveEdition === 'compact' ? (
                <>
                  <li>• 본문 이미지(PNG 8장) &amp; 첨부 PDF(1파일): 기존 압축판 8쪽 {activeLangMeta.labelKo} 파일 첨부</li>
                  <li>• 구성: 자음(1) · 모음(1) · 받침(1) · 용언(1) · 조사(1) · 교실300(3)</li>
                </>
              ) : (
                <>
                  <li>• 본문 이미지(PNG 13장) &amp; 첨부 PDF(1파일): 기존 ‘총정리(6종)’ / ‘인쇄·PDF 센터’ 탭에서 저장한 {activeLangMeta.labelKo} 파일 첨부</li>
                  <li>• 구성: 자음(1) · 모음(1) · 받침(1) · 용언(2) · 조사(2) · 교실300(6)</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* RIGHT: Editable Blog Post Draft Workspace */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
              <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
                {activeLangMeta.flag} {activeLangMeta.labelKo} 무료 나눔 블로그 초안
              </h3>
              {savedFlash ? (
                <span className="text-[11px] font-black text-emerald-700 whitespace-nowrap">
                  ✓ 자동 저장됨
                </span>
              ) : isEdited ? (
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-black text-emerald-700 whitespace-nowrap">
                  수정본 저장됨
                </span>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={handleResetCurrentDraft}
                disabled={!isEdited}
                className="px-2.5 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer whitespace-nowrap"
                title="이 언어 초안을 기본 템플릿으로 되돌리기"
              >
                <RotateCcw className="w-3 h-3" />
                <span>기본 초안 복원</span>
              </button>
              <button
                type="button"
                onClick={handleDownloadDraftTxt}
                className="px-2.5 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <FileText className="w-3 h-3" />
                <span>.txt 저장</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopy('all')}
                className="px-3 py-1.5 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-black flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                {copiedKey === 'all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'all' ? '전체 복사됨!' : '제목+본문+태그 전체 복사'}</span>
              </button>
            </div>
          </div>

          {/* Editable Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="summary-share-title" className="text-xs font-black text-slate-700">
                블로그 제목 (직접 수정 가능 · 자동 저장)
              </label>
              <button
                type="button"
                onClick={() => handleCopy('title')}
                className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                {copiedKey === 'title' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'title' ? '복사됨!' : '제목 복사'}</span>
              </button>
            </div>
            <input
              id="summary-share-title"
              type="text"
              value={currentDraft.title}
              onChange={(e) => updateCurrentDraft({ title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none bg-white text-xs sm:text-sm font-bold text-slate-900"
            />
          </div>

          {/* Editable Body */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="summary-share-body" className="text-xs font-black text-slate-700">
                블로그 본문 초안 (PNG·PDF 첨부 위치 표시 포함 · 순수 텍스트)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                  {currentDraft.body.length.toLocaleString()}자
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy('body')}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black flex items-center gap-1 cursor-pointer whitespace-nowrap"
                >
                  {copiedKey === 'body' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'body' ? '복사됨!' : '본문 복사'}</span>
                </button>
              </div>
            </div>
            <textarea
              id="summary-share-body"
              value={currentDraft.body}
              onChange={(e) => updateCurrentDraft({ body: e.target.value })}
              rows={18}
              className="w-full p-3.5 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none bg-white text-xs sm:text-[13px] leading-relaxed text-slate-800 resize-y"
            />
          </div>

          {/* Editable Hashtags */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="summary-share-tags" className="text-xs font-black text-slate-700">
                해시태그
              </label>
              <button
                type="button"
                onClick={() => handleCopy('tags')}
                className="px-2.5 py-1 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-[11px] font-black flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                {copiedKey === 'tags' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'tags' ? '복사됨!' : '태그 복사'}</span>
              </button>
            </div>
            <input
              id="summary-share-tags"
              type="text"
              value={currentDraft.tags}
              onChange={(e) => updateCurrentDraft({ tags: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-slate-900 focus:outline-none bg-slate-50 text-xs font-bold text-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Off-screen unscaled 1000x1000 capture target */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-18000px',
          top: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <div ref={offscreenCoverRef} style={{ width: '1000px', height: '1000px' }}>
          <SummaryShareCoverCard lang={captureLang} edition={captureEdition} />
        </div>
      </div>
    </div>
  );
};
