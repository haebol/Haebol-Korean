import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Lock,
  Unlock,
  Database,
  FileText,
  Image as ImageIcon,
  Download,
  Copy,
  Check,
  Loader2,
  ChevronDown,
  RotateCcw,
  Sparkles,
  KeyRound,
  AlertCircle,
  Printer,
  BookOpen,
  Video,
  ArrowLeft,
  Columns3,
  Upload,
  FileJson,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage, getLanguageMeta } from '../types';
import { CHAPTER_LIST, VOCABULARY_DATA, getChapterCircledTitle } from '../data/vocabulary';
import { VERB_UNIT_META, VerbUnitType } from './VerbConjugationSection';
import { PARTICLE_UNIT_META, ParticleUnitId } from '../data/particleWorksheetData';
import { PrintableWorksheetPage } from './PrintableWorksheetPage';
import { PrintableWordWorksheetPage } from './PrintableWordWorksheetPage';
import { VerbConjugationWorksheetPage } from './VerbConjugationWorksheetPage';
import { ParticleWorksheetPage } from './ParticleWorksheetPage';
import { MenuCoversGalleryContent } from './MenuCoversGalleryModal';
import {
  BackupScope,
  BlogSeriesType,
  BlogTemplateConfig,
  DEFAULT_BLOG_TEMPLATE,
  getClassroomRotatedLang,
  extractAllCurriculumRows,
  buildBackupPlainText,
  buildBackupCsv,
  loadBlogTemplate,
  saveBlogTemplate,
  buildBlogContextForSelection,
  assembleBlogPost,
} from '../utils/adminDataExtractor';
import {
  captureNodeToPng,
  ScaledPreviewFrame,
  NaverBlogThumbnailCard,
  SeriesFirstFlashcardCaptureCard,
} from './AdminCaptureCards';
import { playCutePop } from '../utils/audio';
import { AdminPrintAndReferenceTab } from './AdminPrintAndReferenceTab';
import { SummaryShareBlogPanel } from './SummaryShareBlogPanel';
import { AdminYoutubeStudioTab } from './AdminYoutubeStudioTab';
import { AdminCurriculumWorkspace } from './AdminCurriculumWorkspace';
import {
  useAdminCurriculumConfig,
  getCurriculumStats,
  exportAdminConfigJson,
  parseAdminConfigJson,
  getDefaultAdminCurriculumConfig,
} from '../utils/adminCurriculumConfig';

interface TeacherAdminStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthChange?: (authed: boolean) => void;
}

type StudioTab = 'curriculum' | 'print' | 'reference' | 'blog' | 'youtube' | 'backup' | 'covers';

const TEACHER_AUTH_SESSION_KEY = 'haebol_teacher_authed';

const VARIABLE_TOKENS = [
  '{{시리즈명}}',
  '{{단원번호}}',
  '{{단원명}}',
  '{{대상언어}}',
  '{{어휘목록}}',
  '{{핵심규칙}}',
  '{{예문}}',
  '{{탐정찬스}}',
];

export const TeacherAdminStudioModal: React.FC<TeacherAdminStudioModalProps> = ({
  isOpen,
  onClose,
  onAuthChange,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(TEACHER_AUTH_SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const pwInputRef = useRef<HTMLInputElement | null>(null);

  const [activeTab, setActiveTab] = useState<StudioTab>('curriculum');
  const [adminConfig, updateAdminConfig] = useAdminCurriculumConfig();
  const curriculumStats = useMemo(() => getCurriculumStats(adminConfig), [adminConfig]);

  // Admin JSON Config Backup / Restore Drawer State
  const [isConfigSyncOpen, setIsConfigSyncOpen] = useState(false);
  const [configCopyDone, setConfigCopyDone] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);
  const [confirmResetStep, setConfirmResetStep] = useState(false);

  // Tool 1: Backup Extractor State
  const [backupScope, setBackupScope] = useState<BackupScope>('all');
  const [backupCopyDone, setBackupCopyDone] = useState(false);

  // Tool 2: Blog Studio State
  const [blogSubMode, setBlogSubMode] = useState<'units' | 'summary_share'>('summary_share');
  const [blogSeries, setBlogSeries] = useState<BlogSeriesType>('classroom');
  const [classroomChapter, setClassroomChapter] = useState<number>(1);
  const [verbUnit, setVerbUnit] = useState<VerbUnitType>('unit1');
  const [particleUnit, setParticleUnit] = useState<ParticleUnitId>('unit1');
  const [targetLang, setTargetLang] = useState<SupportedLanguage>(() =>
    getClassroomRotatedLang(1)
  );

  // Template Accordion & Persistence
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [savedTemplate, setSavedTemplate] = useState<BlogTemplateConfig>(() =>
    loadBlogTemplate()
  );
  const [draftTemplate, setDraftTemplate] = useState<BlogTemplateConfig>(() =>
    loadBlogTemplate()
  );
  const [templateSavedNotice, setTemplateSavedNotice] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  // Capture Loading States
  const [capturingKey, setCapturingKey] = useState<string | null>(null);
  const [captureError, setCaptureError] = useState<string | null>(null);

  // Off-screen clean capture refs
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const card4Ref = useRef<HTMLDivElement | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const verifyPassword = async (rawPassword: string, isAutoSubmit = false) => {
    const candidate = rawPassword.trim();
    if (!candidate || isVerifying) return;
    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/teacher/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: candidate }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (res.ok && data?.ok) {
        try {
          sessionStorage.setItem(TEACHER_AUTH_SESSION_KEY, '1');
        } catch {
          // ignore
        }
        setIsAuthenticated(true);
        onAuthChange?.(true);
        setPasswordInput('');
      } else {
        setAuthError(data?.error || '비밀번호가 일치하지 않습니다.');
        if (isAutoSubmit) {
          setPasswordInput('');
          requestAnimationFrame(() => pwInputRef.current?.focus());
        }
      }
    } catch {
      setAuthError('서버 인증에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyPassword(passwordInput, false);
  };

  const handleLockStudio = () => {
    try {
      sessionStorage.removeItem(TEACHER_AUTH_SESSION_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    onAuthChange?.(false);
    setPasswordInput('');
    setAuthError(null);
  };

  // Switch series & enforce Classroom unit language rotation rule
  const handleSelectSeries = (nextSeries: BlogSeriesType) => {
    playCutePop();
    setBlogSubMode('units');
    setBlogSeries(nextSeries);
    if (nextSeries === 'classroom') {
      setTargetLang(getClassroomRotatedLang(classroomChapter));
    }
  };

  const handleSelectClassroomChapter = (ch: number) => {
    setClassroomChapter(ch);
    setTargetLang(getClassroomRotatedLang(ch));
  };

  // Memoized Backup Data (computed only when authenticated & on backup tab)
  const backupStats = useMemo(() => {
    if (!isAuthenticated || activeTab !== 'backup') {
      return { rowCount: 0, plainText: '' };
    }
    const rows = extractAllCurriculumRows(backupScope);
    const plainText = buildBackupPlainText(backupScope);
    return { rowCount: rows.length, plainText };
  }, [isAuthenticated, activeTab, backupScope]);

  const handleCopyPlainText = async () => {
    try {
      await navigator.clipboard.writeText(backupStats.plainText);
      setBackupCopyDone(true);
      setTimeout(() => setBackupCopyDone(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadTxt = () => {
    playCutePop();
    const blob = new Blob([backupStats.plainText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `해볼한국어_데이터백업_${backupScope}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadCsv = () => {
    playCutePop();
    const csv = buildBackupCsv(backupScope);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `해볼한국어_엑셀백업_${backupScope}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyAdminConfigJson = async () => {
    playCutePop();
    try {
      await navigator.clipboard.writeText(exportAdminConfigJson(adminConfig));
      setConfigCopyDone(true);
      setTimeout(() => setConfigCopyDone(false), 2000);
    } catch {
      setImportStatus({ type: 'err', msg: '클립보드 복사에 실패했습니다. 아래 파일 저장을 이용해 주세요.' });
    }
  };

  const handleDownloadAdminConfigJson = () => {
    playCutePop();
    const json = exportAdminConfigJson(adminConfig);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `해볼한국어_관리자설정_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleApplyImportJson = (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed) {
      setImportStatus({ type: 'err', msg: '복원할 JSON 텍스트를 붙여넣어 주세요.' });
      return;
    }
    const parsed = parseAdminConfigJson(trimmed);
    if ('error' in parsed) {
      setImportStatus({ type: 'err', msg: parsed.error });
      return;
    }
    playCutePop();
    updateAdminConfig(parsed.config);
    setImportJsonText('');
    setImportStatus({
      type: 'ok',
      msg: `설정 복원 완료 (전체 ${parsed.stats.total} · 공개 ${parsed.stats.published} · 준비중 ${parsed.stats.locked})`,
    });
  };

  const handleUploadConfigFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = typeof reader.result === 'string' ? reader.result : '';
      handleApplyImportJson(content);
    };
    reader.readAsText(file, 'utf-8');
    e.target.value = '';
  };

  const handleResetAdminConfig = () => {
    if (!confirmResetStep) {
      setConfirmResetStep(true);
      return;
    }
    playCutePop();
    updateAdminConfig(getDefaultAdminCurriculumConfig());
    setConfirmResetStep(false);
    setImportStatus({ type: 'ok', msg: '모든 단원 순서와 공개 상태가 기본값으로 초기화되었습니다.' });
  };

  // Active Unit & Blog Draft Assembly
  const activeUnitKey: string | number =
    blogSeries === 'classroom'
      ? classroomChapter
      : blogSeries === 'verb'
      ? verbUnit
      : particleUnit;

  const blogContext = useMemo(() => {
    if (!isAuthenticated) return null;
    return buildBlogContextForSelection(blogSeries, activeUnitKey, targetLang);
  }, [isAuthenticated, blogSeries, activeUnitKey, targetLang]);

  const assembledPost = useMemo(() => {
    if (!blogContext) return { title: '', body: '' };
    return assembleBlogPost(savedTemplate, blogContext);
  }, [savedTemplate, blogContext]);

  const handleSaveTemplate = () => {
    playCutePop();
    saveBlogTemplate(draftTemplate);
    setSavedTemplate(draftTemplate);
    setTemplateSavedNotice(true);
    setTimeout(() => setTemplateSavedNotice(false), 2200);
  };

  const handleResetTemplate = () => {
    playCutePop();
    setDraftTemplate(DEFAULT_BLOG_TEMPLATE);
    saveBlogTemplate(DEFAULT_BLOG_TEMPLATE);
    setSavedTemplate(DEFAULT_BLOG_TEMPLATE);
    setTemplateSavedNotice(true);
    setTimeout(() => setTemplateSavedNotice(false), 2200);
  };

  const handleCopyBlogText = async (which: 'title' | 'body') => {
    try {
      await navigator.clipboard.writeText(which === 'title' ? assembledPost.title : assembledPost.body);
      if (which === 'title') {
        setCopiedTitle(true);
        setTimeout(() => setCopiedTitle(false), 1800);
      } else {
        setCopiedBody(true);
        setTimeout(() => setCopiedBody(false), 1800);
      }
    } catch {
      // ignore
    }
  };

  // Classroom Worksheet Props
  const classroomMeta = CHAPTER_LIST.find((c) => c.ch === classroomChapter) || CHAPTER_LIST[0];
  const classroomItems = useMemo(
    () => VOCABULARY_DATA.filter((v) => v.ch === classroomMeta.ch),
    [classroomMeta.ch]
  );
  const classroomSheetChapter = useMemo(
    () => ({
      ch: classroomMeta.ch,
      title: classroomMeta.theme,
      theme: classroomMeta.theme,
      circledTitle: getChapterCircledTitle(classroomMeta.ch, targetLang),
      itemCount: classroomItems.length,
    }),
    [classroomMeta.ch, classroomMeta.theme, targetLang, classroomItems.length]
  );

  const filePrefix = useMemo(() => {
    if (blogSeries === 'classroom') {
      return `해볼한국어_교실한국어_${classroomChapter}단원_${targetLang}`;
    }
    if (blogSeries === 'verb') {
      const num = VERB_UNIT_META.find((u) => u.id === verbUnit)?.num || 1;
      return `해볼한국어_용언활용_${num}단원_${targetLang}`;
    }
    const idx = Math.max(0, PARTICLE_UNIT_META.findIndex((u) => u.id === particleUnit)) + 1;
    return `해볼한국어_조사결합_${idx}단원_${targetLang}`;
  }, [blogSeries, classroomChapter, verbUnit, particleUnit, targetLang]);

  const runCapture = async (
    key: string,
    ref: React.RefObject<HTMLDivElement | null>,
    fileName: string,
    opts?: { width?: number; height?: number }
  ) => {
    if (!ref.current) return;
    setCapturingKey(key);
    setCaptureError(null);
    try {
      await captureNodeToPng(ref.current, fileName, opts);
    } catch (err) {
      console.error(err);
      setCaptureError('이미지 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setCapturingKey(null);
    }
  };

  const handleBatchCapture4Cards = async () => {
    if (capturingKey) return;
    setCapturingKey('batch');
    setCaptureError(null);
    try {
      const items: Array<{ ref: React.RefObject<HTMLDivElement | null>; suffix: string; width?: number }> =
        blogSeries === 'classroom'
          ? [
              { ref: card1Ref, suffix: '1_플래시카드', width: 760 },
              { ref: card2Ref, suffix: '2_그림카드학습지', width: 990 },
              { ref: card3Ref, suffix: '3_따라쓰기학습지', width: 990 },
              { ref: card4Ref, suffix: '4_받아쓰기학습지', width: 990 },
            ]
          : [
              { ref: card1Ref, suffix: '1_플래시카드', width: 760 },
              { ref: card2Ref, suffix: '2_해볼쌤팁', width: 760 },
              { ref: card3Ref, suffix: '3_탐정찬스', width: 640 },
              { ref: card4Ref, suffix: '4_인쇄용학습지', width: 1020 },
            ];

      for (const item of items) {
        if (item.ref.current) {
          await captureNodeToPng(item.ref.current, `${filePrefix}_${item.suffix}.png`, {
            width: item.width,
          });
          await new Promise((r) => setTimeout(r, 220));
        }
      }
    } catch (err) {
      console.error(err);
      setCaptureError('일괄 PNG 저장 중 오류가 발생했습니다.');
    } finally {
      setCapturingKey(null);
    }
  };

  if (!isOpen) return null;

  const captureSpecs =
    blogSeries === 'classroom'
      ? [
          {
            key: 'card1',
            title: '① 플래시카드 1번 단어 화면 (스피커 · 다국어 UI)',
            ref: card1Ref,
            fileName: `${filePrefix}_1_플래시카드.png`,
            targetWidth: 760,
            node: (
              <SeriesFirstFlashcardCaptureCard
                series="classroom"
                unitKey={classroomChapter}
                targetLang={targetLang}
              />
            ),
          },
          {
            key: 'card2',
            title: '② 그림카드 학습지 미리보기',
            ref: card2Ref,
            fileName: `${filePrefix}_2_그림카드학습지.png`,
            targetWidth: 990,
            node: (
              <PrintableWorksheetPage
                chapter={classroomSheetChapter}
                items={classroomItems}
                selectedLangs={[targetLang]}
                interactiveAudio={false}
              />
            ),
          },
          {
            key: 'card3',
            title: '③ 따라쓰기 학습지 미리보기',
            ref: card3Ref,
            fileName: `${filePrefix}_3_따라쓰기학습지.png`,
            targetWidth: 990,
            node: (
              <PrintableWordWorksheetPage
                chapter={classroomSheetChapter}
                items={classroomItems}
                mode="writing"
                selectedLangs={[targetLang]}
                interactiveAudio={false}
              />
            ),
          },
          {
            key: 'card4',
            title: '④ 받아쓰기 학습지 미리보기',
            ref: card4Ref,
            fileName: `${filePrefix}_4_받아쓰기학습지.png`,
            targetWidth: 990,
            node: (
              <PrintableWordWorksheetPage
                chapter={classroomSheetChapter}
                items={classroomItems}
                mode="quiz"
                selectedLangs={[targetLang]}
                interactiveAudio={false}
              />
            ),
          },
        ]
      : blogSeries === 'verb'
      ? [
          {
            key: 'card1',
            title: '① 플래시카드 1번 카드 화면 (스피커 · 다국어 UI)',
            ref: card1Ref,
            fileName: `${filePrefix}_1_플래시카드.png`,
            targetWidth: 760,
            node: (
              <SeriesFirstFlashcardCaptureCard
                series="verb"
                unitKey={verbUnit}
                targetLang={targetLang}
              />
            ),
          },
          {
            key: 'card2',
            title: '② 핵심 문법 팁 (해볼쌤 팁) 카드',
            ref: card2Ref,
            fileName: `${filePrefix}_2_해볼쌤팁.png`,
            targetWidth: 760,
            node: (
              <VerbConjugationWorksheetPage
                lang={targetLang}
                unit={verbUnit}
                interactiveAudio={false}
                renderOnly="tip"
              />
            ),
          },
          {
            key: 'card3',
            title: '③ 탐정찬스 (확인 퀴즈/힌트) 카드',
            ref: card3Ref,
            fileName: `${filePrefix}_3_탐정찬스.png`,
            targetWidth: 640,
            node: (
              <VerbConjugationWorksheetPage
                lang={targetLang}
                unit={verbUnit}
                interactiveAudio={false}
                renderOnly="detective"
              />
            ),
          },
          {
            key: 'card4',
            title: '④ 인쇄용 학습지 미리보기',
            ref: card4Ref,
            fileName: `${filePrefix}_4_인쇄용학습지.png`,
            targetWidth: 1020,
            node: (
              <VerbConjugationWorksheetPage
                lang={targetLang}
                unit={verbUnit}
                interactiveAudio={false}
              />
            ),
          },
        ]
      : [
          {
            key: 'card1',
            title: '① 플래시카드 1번 카드 화면 (스피커 · 다국어 UI)',
            ref: card1Ref,
            fileName: `${filePrefix}_1_플래시카드.png`,
            targetWidth: 760,
            node: (
              <SeriesFirstFlashcardCaptureCard
                series="particle"
                unitKey={particleUnit}
                targetLang={targetLang}
              />
            ),
          },
          {
            key: 'card2',
            title: '② 핵심 문법 팁 (해볼쌤 팁) 카드',
            ref: card2Ref,
            fileName: `${filePrefix}_2_해볼쌤팁.png`,
            targetWidth: 760,
            node: (
              <ParticleWorksheetPage
                lang={targetLang}
                unit={particleUnit}
                interactiveAudio={false}
                renderOnly="tip"
              />
            ),
          },
          {
            key: 'card3',
            title: '③ 탐정찬스 (확인 퀴즈/힌트) 카드',
            ref: card3Ref,
            fileName: `${filePrefix}_3_탐정찬스.png`,
            targetWidth: 640,
            node: (
              <ParticleWorksheetPage
                lang={targetLang}
                unit={particleUnit}
                interactiveAudio={false}
                renderOnly="detective"
              />
            ),
          },
          {
            key: 'card4',
            title: '④ 인쇄용 학습지 미리보기',
            ref: card4Ref,
            fileName: `${filePrefix}_4_인쇄용학습지.png`,
            targetWidth: 1020,
            node: (
              <ParticleWorksheetPage
                lang={targetLang}
                unit={particleUnit}
                interactiveAudio={false}
              />
            ),
          },
        ];

  const langMeta = getLanguageMeta(targetLang);

  return createPortal(
    <div className="fixed inset-0 z-[120] w-screen h-screen bg-[#F8F9FB] flex flex-col overflow-hidden font-korean-gothic no-print">
      {/* Full-Screen Admin Top Bar */}
      <header className="px-4 sm:px-5 h-[56px] bg-[#1E1035] text-white border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
        {/* Left: Brand Title + Live Curriculum Status Summary */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2 min-w-0 shrink-0">
            <span className="w-7 h-7 rounded-md bg-white/15 text-white flex items-center justify-center shrink-0">
              {isAuthenticated ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            </span>
            <h2 className="text-sm sm:text-[15px] font-black tracking-tight whitespace-nowrap">
              해볼한국어 관리자
            </h2>
          </div>

          {isAuthenticated && (
            <div
              className="hidden md:flex items-center gap-2 text-xs text-purple-100/90 border-l border-white/15 pl-4 tabular-nums whitespace-nowrap"
              aria-label="단원 공개 현황 요약"
            >
              <span>
                전체 <strong className="text-white font-black">{curriculumStats.total}</strong>
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>
                공개 <strong className="text-emerald-300 font-black">{curriculumStats.published}</strong>
              </span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>
                준비중 <strong className="text-amber-300 font-black">{curriculumStats.locked}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Right: JSON Sync, Lock, Return to Learner View */}
        <div className="flex items-center gap-2 shrink-0">
          {isAuthenticated && (
            <>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setIsConfigSyncOpen((v) => !v);
                  setImportStatus(null);
                  setConfirmResetStep(false);
                }}
                className={`h-8 px-2.5 sm:px-3 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors border ${
                  isConfigSyncOpen
                    ? 'bg-white text-[#1E1035] border-white'
                    : 'bg-white/10 hover:bg-white/18 text-purple-100 border-white/15'
                }`}
                title="단원 순서 및 공개/준비중 설정 JSON 복사·불러오기"
              >
                <FileJson className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">설정 복사/불러오기</span>
                <span className="sm:hidden">JSON</span>
              </button>

              <button
                type="button"
                onClick={handleLockStudio}
                className="h-8 px-2.5 rounded-md bg-white/10 hover:bg-white/18 text-purple-100 text-xs font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
                title="관리자 잠금"
              >
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">잠금</span>
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              playCutePop();
              onClose();
            }}
            className="h-8 px-3 sm:px-3.5 rounded-md bg-white hover:bg-purple-50 text-[#1E1035] text-xs font-black flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>학습자 화면으로 돌아가기</span>
          </button>
        </div>
      </header>

      {/* Mobile Compact Status Strip (< md, when authenticated) */}
      {isAuthenticated && (
        <div className="md:hidden px-4 py-1.5 bg-[#2A1748] text-purple-100 text-[11.5px] font-semibold flex items-center justify-between border-b border-white/10 tabular-nums shrink-0">
          <span>단원 현황</span>
          <div className="flex items-center gap-2">
            <span>
              전체 <strong className="text-white">{curriculumStats.total}</strong>
            </span>
            <span className="text-white/30">·</span>
            <span>
              공개 <strong className="text-emerald-300">{curriculumStats.published}</strong>
            </span>
            <span className="text-white/30">·</span>
            <span>
              준비중 <strong className="text-amber-300">{curriculumStats.locked}</strong>
            </span>
          </div>
        </div>
      )}

      {/* JSON Backup / Restore Inline Drawer */}
      {isAuthenticated && isConfigSyncOpen && (
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 shrink-0">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left: Export / Copy / Reset */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900">
                  현재 관리자 설정 백업 (단원 순서 · 공개/준비중 상태)
                </h3>
                <button
                  type="button"
                  onClick={() => setIsConfigSyncOpen(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label="설정 백업 닫기"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[11.5px] text-slate-500 leading-relaxed">
                PC에서 설정한 단원 순서와 공개/준비중 상태를 JSON으로 복사하거나 파일로 저장해 폰·태블릿에 그대로 복원할 수 있습니다.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyAdminConfigJson}
                  className="h-8 px-3 rounded-md bg-[#3B1668] hover:bg-[#2E1052] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
                >
                  {configCopyDone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{configCopyDone ? 'JSON 복사됨' : '설정 JSON 복사'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadAdminConfigJson}
                  className="h-8 px-3 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON 파일 저장</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetAdminConfig}
                  className={`h-8 px-3 rounded-md border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
                    confirmResetStep
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'bg-white hover:bg-rose-50 border-slate-300 text-slate-600 hover:text-rose-700'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{confirmResetStep ? '한 번 더 눌러 초기화 확인' : '기본값 초기화'}</span>
                </button>
              </div>
            </div>

            {/* Right: Import Paste or File */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label htmlFor="admin-config-import" className="text-xs font-black text-slate-900">
                  다른 기기 설정 불러오기 (JSON 붙여넣기 또는 파일 선택)
                </label>
                <label className="h-7 px-2.5 rounded border border-slate-300 bg-slate-50 hover:bg-slate-100 text-[11px] font-bold text-slate-700 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap">
                  <Upload className="w-3 h-3" />
                  <span>파일 선택</span>
                  <input
                    type="file"
                    accept="application/json,.json"
                    onChange={handleUploadConfigFile}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex items-stretch gap-2">
                <textarea
                  id="admin-config-import"
                  rows={2}
                  value={importJsonText}
                  onChange={(e) => {
                    setImportJsonText(e.target.value);
                    if (importStatus) setImportStatus(null);
                  }}
                  placeholder='복사한 JSON 설정 텍스트를 여기에 붙여넣으세요...'
                  className="flex-1 px-3 py-2 rounded-md border border-slate-300 focus:border-[#3B1668] focus:outline-none text-[11.5px] font-mono text-slate-800 bg-slate-50 focus:bg-white resize-none"
                />
                <button
                  type="button"
                  onClick={() => handleApplyImportJson(importJsonText)}
                  className="px-3.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors"
                >
                  적용하기
                </button>
              </div>
              {importStatus && (
                <div
                  className={`text-[11.5px] font-bold flex items-center gap-1.5 ${
                    importStatus.type === 'ok' ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {importStatus.type === 'ok' ? (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{importStatus.msg}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Lock Screen vs Authenticated Full-Screen Body */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-slate-50 to-slate-100">
            <form
              onSubmit={handleVerifyPassword}
              className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-lg p-6 sm:p-7 space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">관리자 비밀번호 확인</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    해볼쌤 전용 도구는 서버 비밀번호 확인 후 열립니다.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700" htmlFor="teacher-pw">
                  관리자 비밀번호
                </label>
                <input
                  ref={pwInputRef}
                  id="teacher-pw"
                  type="password"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={passwordInput}
                  onChange={(e) => {
                    const nextVal = e.target.value;
                    setPasswordInput(nextVal);
                    if (authError) setAuthError(null);
                    if (/^\d{4}$/.test(nextVal)) {
                      void verifyPassword(nextVal, true);
                    }
                  }}
                  placeholder="4자리 숫자 입력 시 바로 열립니다"
                  autoFocus
                  className="w-full px-3.5 py-2.5 rounded-md border border-slate-300 focus:border-slate-900 focus:outline-none text-sm font-bold text-slate-900 bg-white tracking-widest"
                />
              </div>

              {authError && (
                <div className="px-3 py-2 rounded-md bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !passwordInput.trim()}
                className="w-full py-2.5 px-4 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>확인 중...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>해볼쌤 전용 스튜디오 열기</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Sub-Tabs Navigation Bar */}
            <nav className="px-4 sm:px-5 bg-white border-b border-slate-200 flex items-center gap-1 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setActiveTab('curriculum');
                }}
                className={`px-3.5 py-2.5 text-xs sm:text-[13px] font-black border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'curriculum'
                    ? 'border-[#3B1668] text-[#3B1668] bg-purple-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Columns3 className="w-4 h-4" />
                <span>단원·공개 관리 (3단)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setActiveTab('print');
                }}
                className={`px-3.5 py-2.5 text-xs sm:text-[13px] font-black border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'print'
                    ? 'border-indigo-600 text-indigo-800 bg-indigo-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Printer className="w-4 h-4" />
                <span>인쇄 · PDF 센터</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setActiveTab('reference');
                }}
                className={`px-3.5 py-2.5 text-xs sm:text-[13px] font-black border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'reference'
                    ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>총정리 · 단어장</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setActiveTab('blog');
                }}
                className={`px-3.5 py-2.5 text-xs sm:text-[13px] font-black border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'blog'
                    ? 'border-rose-600 text-rose-700 bg-rose-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>블로그 스튜디오</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setActiveTab('youtube');
                }}
                className={`px-3.5 py-2.5 text-xs sm:text-[13px] font-black border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'youtube'
                    ? 'border-red-600 text-red-700 bg-red-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>유튜브 스튜디오</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setActiveTab('backup');
                }}
                className={`px-3.5 py-2.5 text-xs sm:text-[13px] font-black border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'backup'
                    ? 'border-slate-900 text-slate-900 bg-slate-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>학습 데이터 백업</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setActiveTab('covers');
                }}
                className={`px-3.5 py-2.5 text-xs sm:text-[13px] font-black border-b-2 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  activeTab === 'covers'
                    ? 'border-purple-700 text-purple-800 bg-purple-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>표지 자료실</span>
              </button>
            </nav>

            {/* Primary Full-Screen 3-Pane Curriculum Manager */}
            {activeTab === 'curriculum' ? (
              <AdminCurriculumWorkspace
                config={adminConfig}
                onUpdateConfig={updateAdminConfig}
              />
            ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* ============================================================ */}
              {/* TAB: 인쇄 · PDF 센터 / 총정리 · 단어장 자료실                   */}
              {/* ============================================================ */}
              {(activeTab === 'print' || activeTab === 'reference') && (
                <AdminPrintAndReferenceTab mode={activeTab} />
              )}

              {/* ============================================================ */}
              {/* TAB: 유튜브 스튜디오 (학습 한국어 · 한글 획순 따라쓰기 전용)     */}
              {/* ============================================================ */}
              {activeTab === 'youtube' && <AdminYoutubeStudioTab />}

              {/* ============================================================ */}
              {/* TAB 1: 전체 학습 데이터 백업 추출기                               */}
              {/* ============================================================ */}
              {activeTab === 'backup' && (
                <div className="space-y-4">
                  <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm sm:text-base font-black text-slate-900">
                          전체 커리큘럼 데이터 전수 백업
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          한글 자모·기본글자·받침, 교실한국어 25단원, 용언 30단원, 조사 30단원과 7개국어 번역, 탐정찬스·해볼쌤 팁까지 모두 추출합니다.
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-black text-slate-800 tabular-nums whitespace-nowrap shrink-0">
                        총 {backupStats.rowCount.toLocaleString()}행 · {backupStats.plainText.length.toLocaleString()}자
                      </span>
                    </div>

                    {/* Scope Buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                      {(
                        [
                          { id: 'all', label: '전체 영역 통합' },
                          { id: 'hangeul', label: '한글 기초 (자모·기본글자·받침)' },
                          { id: 'classroom', label: '교실한국어 (25단원·회화·비상카드)' },
                          { id: 'verb', label: '용언 활용 (30단원)' },
                          { id: 'particle', label: '조사 결합 (30단원)' },
                        ] as { id: BackupScope; label: string }[]
                      ).map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            playCutePop();
                            setBackupScope(opt.id);
                          }}
                          className={`px-3 py-1.5 rounded-md text-xs font-black border cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                            backupScope === opt.id
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {/* Export Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={handleCopyPlainText}
                        className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {backupCopyDone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{backupCopyDone ? '순수 텍스트 복사 완료!' : '📋 블로그용 순수 텍스트 복사'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadTxt}
                        className="px-4 py-2 rounded-md bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>📄 순수 텍스트(.txt) 다운로드</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleDownloadCsv}
                        className="px-4 py-2 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-black flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>📊 전체 데이터 엑셀(.csv, UTF-8 BOM) 다운로드</span>
                      </button>
                    </div>
                  </div>

                  {/* Plain Text Preview Box */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-700">
                        마크다운 기호(#, ** 등) 없는 순수 텍스트 미리보기
                      </span>
                      <span className="text-[11px] font-bold text-slate-400">
                        • / ▶ / ■ 기호 기반 깔끔한 텍스트
                      </span>
                    </div>
                    <textarea
                      readOnly
                      value={backupStats.plainText}
                      className="w-full h-[380px] p-3.5 rounded-md border border-slate-200 bg-slate-50 text-xs leading-relaxed font-mono text-slate-800 resize-y focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* ============================================================ */}
              {/* TAB 2: 블로그 원고 & 이미지 자동 생산기                           */}
              {/* ============================================================ */}
              {activeTab === 'blog' && (
                <div className="space-y-6">
                  {/* 1. Series / Post Type Selector Bar */}
                  <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            playCutePop();
                            setBlogSubMode('summary_share');
                          }}
                          className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-black border cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                            blogSubMode === 'summary_share'
                              ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                              : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                          }`}
                        >
                          🎁 ‘총정리표’ 무료 나눔 글 (8개국어)
                        </button>

                        {(
                          [
                            { id: 'classroom', label: '교실한국어 (25단원)', activeCls: 'bg-[#D94A6B] text-white border-[#D94A6B]' },
                            { id: 'verb', label: '용언 활용 (30단원)', activeCls: 'bg-[#7E22CE] text-white border-[#7E22CE]' },
                            { id: 'particle', label: '조사 결합 (30단원)', activeCls: 'bg-emerald-600 text-white border-emerald-600' },
                          ] as { id: BlogSeriesType; label: string; activeCls: string }[]
                        ).map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => handleSelectSeries(s.id)}
                            className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-black border cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                              blogSubMode === 'units' && blogSeries === s.id
                                ? s.activeCls
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>

                      {blogSubMode === 'units' && blogSeries === 'classroom' && (
                        <span className="px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-bold">
                          단원별 7개국어 컨셉 자동 로테이션 ({classroomChapter}단원 → {langMeta.flag} {langMeta.labelKo})
                        </span>
                      )}
                    </div>

                    {blogSubMode === 'units' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Unit Dropdown */}
                      <div className="space-y-1">
                        <label className="block text-xs font-black text-slate-700">
                          단원 선택
                        </label>
                        {blogSeries === 'classroom' ? (
                          <select
                            value={classroomChapter}
                            onChange={(e) => handleSelectClassroomChapter(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                          >
                            {CHAPTER_LIST.map((c) => (
                              <option key={c.ch} value={c.ch}>
                                {c.ch}단원 · {c.icon} {getChapterCircledTitle(c.ch, targetLang)}
                              </option>
                            ))}
                          </select>
                        ) : blogSeries === 'verb' ? (
                          <select
                            value={verbUnit}
                            onChange={(e) => setVerbUnit(e.target.value as VerbUnitType)}
                            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                          >
                            {VERB_UNIT_META.map((u) => (
                              <option key={u.id} value={u.id}>
                                {u.num}단원 · {u.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <select
                            value={particleUnit}
                            onChange={(e) => setParticleUnit(e.target.value as ParticleUnitId)}
                            className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                          >
                            {PARTICLE_UNIT_META.map((u, idx) => (
                              <option key={u.id} value={u.id}>
                                {idx + 1}단원 · {u.circled} {u.title}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* Language Selector */}
                      <div className="space-y-1">
                        <label className="block text-xs font-black text-slate-700">
                          캡처 · 원고 대상 언어 {blogSeries === 'classroom' ? '(단원 이동 시 자동 순환 · 수동 변경 가능)' : '(선택 가능)'}
                        </label>
                        <select
                          value={targetLang}
                          onChange={(e) => setTargetLang(e.target.value as SupportedLanguage)}
                          className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                        >
                          {SUPPORTED_LANGUAGES.map((m) => (
                            <option key={m.code} value={m.code}>
                              {m.flag} {m.labelKo} ({m.fullName})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    )}
                  </section>

                  {blogSubMode === 'summary_share' ? (
                    <SummaryShareBlogPanel />
                  ) : (
                    <>
                  {captureError && (
                    <div className="px-4 py-2.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{captureError}</span>
                    </div>
                  )}

                  {/* 2. 1000x1000 Thumbnail + Summary Grid */}
                  <section className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5 items-start">
                    {/* Left: 1:1 Thumbnail Preview */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900">
                          네이버 블로그 대표이미지 (1000×1000px)
                        </span>
                        <span className="text-[11px] font-bold text-slate-400">1:1 정사각형</span>
                      </div>

                      <div className="rounded-lg border border-slate-200 overflow-hidden bg-slate-50">
                        <ScaledPreviewFrame targetWidth={1000} fixedHeight={1000}>
                          <NaverBlogThumbnailCard
                            series={blogSeries}
                            unitKey={activeUnitKey}
                            targetLang={targetLang}
                          />
                        </ScaledPreviewFrame>
                      </div>

                      <button
                        type="button"
                        disabled={Boolean(capturingKey)}
                        onClick={() =>
                          runCapture('thumb', thumbRef, `${filePrefix}_대표이미지_1000x1000.png`, {
                            width: 1000,
                            height: 1000,
                          })
                        }
                        className="w-full py-2.5 px-3 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs sm:text-sm font-black flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      >
                        {capturingKey === 'thumb' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        <span>📸 대표이미지 PNG 저장</span>
                      </button>
                    </div>

                    {/* Right: Blog Template Accordion & Draft Assembly */}
                    <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-rose-600" />
                          <h3 className="text-sm sm:text-base font-black text-slate-900">
                            블로그 제목 & 본문 초안 자동 조립기
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => setIsTemplateOpen((prev) => !prev)}
                          className="px-3 py-1.5 rounded-md border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-black text-slate-800 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <span>내 기준 초안(템플릿) 설정</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform ${
                              isTemplateOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Collapsible Template Editor */}
                      {isTemplateOpen && (
                        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-black text-slate-800">
                              사용 가능한 자동 치환 변수 (복사해 원하는 자리에 넣으세요)
                            </span>
                            {templateSavedNotice && (
                              <span className="text-xs font-black text-emerald-700">
                                ✓ 템플릿이 저장되었습니다
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {VARIABLE_TOKENS.map((tok) => (
                              <button
                                key={tok}
                                type="button"
                                onClick={() => navigator.clipboard?.writeText(tok)}
                                title="클릭하여 변수 복사"
                                className="px-2 py-0.5 rounded-sm bg-white border border-slate-300 hover:border-slate-500 text-[11px] font-bold text-slate-700 cursor-pointer"
                              >
                                {tok}
                              </button>
                            ))}
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-black text-slate-700">
                              제목 템플릿
                            </label>
                            <input
                              type="text"
                              value={draftTemplate.titleTemplate}
                              onChange={(e) =>
                                setDraftTemplate((prev) => ({ ...prev, titleTemplate: e.target.value }))
                              }
                              className="w-full px-3 py-1.5 rounded-md border border-slate-300 bg-white text-xs font-bold text-slate-900"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-black text-slate-700">
                              본문 템플릿 (내 말투·문단 구조 저장 시 전 단원에 일괄 반영)
                            </label>
                            <textarea
                              value={draftTemplate.bodyTemplate}
                              onChange={(e) =>
                                setDraftTemplate((prev) => ({ ...prev, bodyTemplate: e.target.value }))
                              }
                              rows={8}
                              className="w-full p-2.5 rounded-md border border-slate-300 bg-white text-xs leading-relaxed text-slate-800"
                            />
                          </div>

                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={handleResetTemplate}
                              className="px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>기본값 복원</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleSaveTemplate}
                              className="px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-black cursor-pointer"
                            >
                              💾 내 템플릿 저장 및 반영
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Assembled Blog Title */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-700">자동 생성된 블로그 제목</span>
                          <button
                            type="button"
                            onClick={() => handleCopyBlogText('title')}
                            className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-black flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            {copiedTitle ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedTitle ? '복사됨!' : '제목 복사'}</span>
                          </button>
                        </div>
                        <input
                          readOnly
                          value={assembledPost.title}
                          className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-xs sm:text-sm font-bold text-slate-900"
                        />
                      </div>

                      {/* Assembled Blog Body */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-700">
                            자동 생성된 블로그 본문 (마크다운 기호 없는 순수 텍스트)
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyBlogText('body')}
                            className="px-3 py-1 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-black flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            {copiedBody ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedBody ? '본문 복사 완료!' : '본문 전체 복사'}</span>
                          </button>
                        </div>
                        <textarea
                          readOnly
                          value={assembledPost.body}
                          rows={12}
                          className="w-full p-3 rounded-md border border-slate-200 bg-slate-50 text-xs leading-relaxed text-slate-800"
                        />
                      </div>
                    </div>
                  </section>

                  {/* 3. 4 Series-Specific Clean Capture Cards */}
                  <section className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-2xs space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm sm:text-base font-black text-slate-900">
                          시리즈별 실제 앱 화면 · 학습지 자동 캡처 카드 (4종)
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          저장 버튼 UI가 제외된 깨끗한 원본 해상도 PNG로 저장됩니다.
                        </p>
                      </div>

                      <button
                        type="button"
                        disabled={Boolean(capturingKey)}
                        onClick={handleBatchCapture4Cards}
                        className="px-3.5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {capturingKey === 'batch' ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>📦 4종 카드 모두 PNG 저장</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {captureSpecs.map((spec) => (
                        <div
                          key={spec.key}
                          className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 flex flex-col justify-between gap-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-slate-800 truncate">
                              {spec.title}
                            </span>
                            <button
                              type="button"
                              disabled={Boolean(capturingKey)}
                              onClick={() =>
                                runCapture(spec.key, spec.ref, spec.fileName, {
                                  width: spec.targetWidth,
                                })
                              }
                              className="px-2.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-[11px] font-black flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                            >
                              {capturingKey === spec.key ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Download className="w-3 h-3" />
                              )}
                              <span>PNG 저장</span>
                            </button>
                          </div>

                          <div className="rounded-lg border border-slate-200 bg-white p-2 overflow-hidden">
                            <ScaledPreviewFrame targetWidth={spec.targetWidth}>
                              {spec.node}
                            </ScaledPreviewFrame>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                    </>
                  )}
                </div>
              )}

              {/* ============================================================ */}
              {/* TAB 3: 메뉴 소개 표지 자료실                                      */}
              {/* ============================================================ */}
              {activeTab === 'covers' && (
                <div className="bg-white rounded-xl border border-slate-200 p-2 sm:p-3 shadow-2xs">
                  <MenuCoversGalleryContent embedded />
                </div>
              )}
            </div>
            )}
          </>
        )}
      </div>

      {/* Off-screen unscaled clean capture targets (Zero button chrome, crisp full-res output) */}
      {isAuthenticated && activeTab === 'blog' && blogSubMode === 'units' && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            left: '-16000px',
            top: 0,
            pointerEvents: 'none',
            zIndex: -1,
          }}
        >
          <div ref={thumbRef} style={{ width: '1000px', height: '1000px' }}>
            <NaverBlogThumbnailCard
              series={blogSeries}
              unitKey={activeUnitKey}
              targetLang={targetLang}
            />
          </div>

          {captureSpecs.map((spec) => (
            <div
              key={`offscreen-${spec.key}`}
              ref={spec.ref}
              style={{ width: `${spec.targetWidth}px`, backgroundColor: '#ffffff' }}
            >
              {spec.node}
            </div>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};
