import React, { useState, useMemo, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Printer,
  FileDown,
  Image as ImageIcon,
  Archive,
  Layers,
  BookOpen,
  FileText,
  Globe,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Volume2,
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../types';
import { CHAPTER_LIST, VOCABULARY_DATA, getChapterCircledTitle } from '../data/vocabulary';
import { PrintableWorksheetPage } from './PrintableWorksheetPage';
import { PrintableWordWorksheetPage } from './PrintableWordWorksheetPage';
import { PrintableWordbookSheet } from './PrintableWordbookSheet';
import {
  ConsonantsWorksheetPage,
  VowelsWorksheetPage,
  ComboTracingWorksheetPage,
  ComboWorksheetPage,
  ConsonantsStrokeWorksheetPage,
  ConsonantsStrokeWorksheetPage2,
  ConsonantsStrokeWorksheetPage3,
  ConsonantsStrokeWorksheetPage4,
  ConsonantsStrokeWorksheetPage5,
  VowelsStrokeWorksheetPage1,
  VowelsStrokeWorksheetPage2,
  VowelsStrokeWorksheetPage3,
  VowelsStrokeWorksheetPage4,
  VowelsStrokeWorksheetPage5,
  VowelsStrokeWorksheetPage6,
  ConsonantsSummaryWorksheetPage,
  VowelsSummaryWorksheetPage,
  BasicLetterWorksheetPage,
} from './PrintableJamoSheets';
import { BASIC_LETTERS_DATA } from '../data/basicLettersData';
import {
  BatchimWorksheetPage,
  BatchimSummaryWorksheetPage,
  BATCHIM_PAGES_DATA,
} from './PrintableBatchimSheet';
import { VerbConjugationWorksheetPage } from './VerbConjugationWorksheetPage';
import { VERB_UNIT_META } from './VerbConjugationSection';
import { ParticleWorksheetPage } from './ParticleWorksheetPage';
import { PARTICLE_UNIT_META } from '../data/particleWorksheetData';
import {
  VerbSummaryWorksheetPage,
  ParticleSummaryWorksheetPage,
  ClassroomSummaryWorksheetPage,
  CLASSROOM_SUMMARY_PAGES,
  VerbSummaryCompactWorksheetPage,
  ParticleSummaryCompactWorksheetPage,
  ClassroomSummaryCompactWorksheetPage,
  CLASSROOM_COMPACT_PAGES,
} from './ExtraSummaryWorksheets';
import {
  ADMIN_SUMMARY_LANGUAGES,
  AdminSummaryLang,
  CONSONANTS_SUMMARY_COPIES,
  VOWELS_SUMMARY_COPIES,
  BATCHIM_SUMMARY_COPIES,
  VERB_SUMMARY_COPIES,
  PARTICLE_SUMMARY_COPIES,
} from '../data/summaryTranslations';
import { WORDBOOK_VERB_ITEMS, WORDBOOK_PARTICLE_ITEMS } from '../data/wordbookExtraData';
import { WORDBOOK_SHEET_ITEMS } from '../data/worksheetMeta';
import { ScaledPreviewFrame, captureNodeToPng } from './AdminCaptureCards';
import { exportNodesToPdf, exportNodesToPngZip } from '../utils/adminPdfExporter';
import { playCutePop } from '../utils/audio';

export type AdminPrintCategory =
  | 'classroom_triple'
  | 'classroom_cards'
  | 'classroom_writing'
  | 'classroom_quiz'
  | 'hangeul_jamo'
  | 'hangeul_basic'
  | 'hangeul_batchim'
  | 'verb'
  | 'particle_combo'
  | 'particle_sentence'
  | 'summary_all'
  | 'summary_compact_8'
  | 'wordbook_all';

export type ReferenceItemId =
  | 'summary_consonants'
  | 'summary_vowels'
  | 'summary_batchim'
  | 'summary_verb_1'
  | 'summary_verb_2'
  | 'summary_particle_1'
  | 'summary_particle_2'
  | 'summary_classroom_0'
  | 'summary_classroom_1'
  | 'summary_classroom_2'
  | 'summary_classroom_3'
  | 'summary_classroom_4'
  | 'summary_classroom_5'
  | 'compact_verb'
  | 'compact_particle'
  | 'compact_classroom_0'
  | 'compact_classroom_1'
  | 'compact_classroom_2'
  | 'wordbook_0'
  | 'wordbook_1'
  | 'wordbook_2'
  | 'wordbook_3';

interface SheetRenderDescriptor {
  key: string;
  label: string;
  targetWidth: number;
  wrapperId?: string;
  render: (interactiveAudio: boolean) => React.ReactNode;
}

const JAMO_META_LIST = [
  { idx: 0, label: '① 자음 쓰기 (14자)', render: (audio: boolean) => <ConsonantsWorksheetPage interactiveAudio={audio} /> },
  { idx: 1, label: '② 모음 쓰기 (21자+♡)', render: (audio: boolean) => <VowelsWorksheetPage interactiveAudio={audio} /> },
  { idx: 2, label: '③ 자음·모음표 따라쓰기', render: (audio: boolean) => <ComboTracingWorksheetPage interactiveAudio={audio} /> },
  { idx: 3, label: '④ 자음·모음표 스스로쓰기', render: (audio: boolean) => <ComboWorksheetPage interactiveAudio={audio} /> },
  { idx: 4, label: '⑤ 자음 획순 (ㄱ~ㄹ)', render: (audio: boolean) => <ConsonantsStrokeWorksheetPage interactiveAudio={audio} /> },
  { idx: 5, label: '⑥ 자음 획순 (ㅁ~ㅇ)', render: (audio: boolean) => <ConsonantsStrokeWorksheetPage2 interactiveAudio={audio} /> },
  { idx: 6, label: '⑦ 자음 획순 (ㅈ~ㅋ)', render: (audio: boolean) => <ConsonantsStrokeWorksheetPage3 interactiveAudio={audio} /> },
  { idx: 7, label: '⑧ 자음 획순 (ㅌ~ㅎ)', render: (audio: boolean) => <ConsonantsStrokeWorksheetPage4 interactiveAudio={audio} /> },
  { idx: 8, label: '⑨ 쌍자음 획순 (ㄲ~ㅉ)', render: (audio: boolean) => <ConsonantsStrokeWorksheetPage5 interactiveAudio={audio} /> },
  { idx: 9, label: '⑩ 모음 획순 (ㅏ·ㅑ·ㅓ·ㅕ)', render: (audio: boolean) => <VowelsStrokeWorksheetPage1 interactiveAudio={audio} /> },
  { idx: 10, label: '⑪ 모음 획순 (ㅗ·ㅛ·ㅜ·ㅠ)', render: (audio: boolean) => <VowelsStrokeWorksheetPage2 interactiveAudio={audio} /> },
  { idx: 11, label: '⑫ 모음 획순 (ㅡ·ㅣ·ㅢ)', render: (audio: boolean) => <VowelsStrokeWorksheetPage3 interactiveAudio={audio} /> },
  { idx: 12, label: '⑬ 모음 획순 (ㅐ·ㅒ·ㅔ·ㅖ)', render: (audio: boolean) => <VowelsStrokeWorksheetPage4 interactiveAudio={audio} /> },
  { idx: 13, label: '⑭ 모음 획순 (ㅘ·ㅝ·ㅟ)', render: (audio: boolean) => <VowelsStrokeWorksheetPage5 interactiveAudio={audio} /> },
  { idx: 14, label: '⑮ 모음 획순 (ㅚ·ㅙ·ㅞ)', render: (audio: boolean) => <VowelsStrokeWorksheetPage6 interactiveAudio={audio} /> },
];

const PARTICLE_SENTENCE_UNITS = PARTICLE_UNIT_META.filter((u) => u.layoutType === 'rows5');

const CATEGORY_GROUPS: {
  id: AdminPrintCategory;
  badge: string;
  label: string;
  desc: string;
}[] = [
  { id: 'classroom_triple', badge: '3종세트', label: '교실한국어 3종세트', desc: '단원별 그림카드 + 따라쓰기 + 받아쓰기 3장 묶음' },
  { id: 'classroom_cards', badge: '교실', label: '교실 · 그림카드', desc: '30단원 A4 가로 플래시카드 (1~3개국어)' },
  { id: 'classroom_writing', badge: '교실', label: '교실 · 따라쓰기', desc: '30단원 단어 따라쓰기 학습지' },
  { id: 'classroom_quiz', badge: '교실', label: '교실 · 받아쓰기', desc: '30단원 단어 받아쓰기 테스트지' },
  { id: 'hangeul_jamo', badge: '한글', label: '자음·모음 & 획순 (15쪽)', desc: '기초 자모 쓰기, 조합표, 획순 따라쓰기' },
  { id: 'hangeul_basic', badge: '한글', label: '기본글자 (21쪽)', desc: '자음+모음 음절 결합 21페이지' },
  { id: 'hangeul_batchim', badge: '한글', label: '받침·겹받침 (15쪽)', desc: '대표 받침 7개 및 겹받침 학습지' },
  { id: 'verb', badge: '용언', label: '용언 활용 (30단원)', desc: '30단원 동사·형용사 활용 학습지' },
  { id: 'particle_combo', badge: '조사', label: '조사 결합 (30단원)', desc: '30단원 조사 결합 학습지' },
  { id: 'particle_sentence', badge: '조사', label: '조사 문장 만들기 (8단원)', desc: '조사 문장 연습 8개 단원 학습지' },
  { id: 'summary_all', badge: '총정리', label: '총정리표 6종 (13쪽)', desc: '전 언어 확장판 · 자음·모음·받침(각1) + 용언·조사(각2) + 교실(6)' },
  { id: 'summary_compact_8', badge: '한·영 8쪽', label: '총정리표 6종 · 압축판 (8쪽)', desc: '한국어·영어 전용 기존 8장 버전 (용언1·조사1·교실3)' },
  { id: 'wordbook_all', badge: '단어장', label: '통합 단어장 4종 (4쪽)', desc: 'A4 가로 4열 · 교실 1~150 / 151~300 / 용언 150 / 조사 150' },
];

const REFERENCE_ITEMS: {
  id: ReferenceItemId;
  group: 'summary' | 'wordbook';
  shortLabel: string;
  title: string;
  subtitle: string;
}[] = [
  { id: 'summary_consonants', group: 'summary', shortLabel: '자음 총정리', title: '⑯ 한국어 자음 총정리표', subtitle: '기본자음 14 · 쌍자음 5 · 이름·로마자 [앞/뒤] 안내' },
  { id: 'summary_vowels', group: 'summary', shortLabel: '모음 총정리', title: '⑰ 한국어 모음 총정리표', subtitle: '기본모음 10 · 복합모음 11 · 발음·유사모음 팁' },
  { id: 'summary_batchim', group: 'summary', shortLabel: '받침 총정리', title: '⑯ 한국어 받침 총정리표', subtitle: '7개 대표 받침 로마자 · 받침 가족 · 겹받침 11자' },
  { id: 'summary_verb_1', group: 'summary', shortLabel: '용언 ① 문형표', title: '㉛ 한국어 용언 활용 총정리표 (1/2쪽 · 30단원 문형)', subtitle: '현재·과거 통합 · 5×4 핵심 문형 20카드 (말줄임 없는 넉넉한 레이아웃)' },
  { id: 'summary_verb_2', group: 'summary', shortLabel: '용언 ② 규칙·불규칙', title: '㉛ 한국어 용언 활용 총정리표 (2/2쪽 · 규칙·7대 불규칙)', subtitle: '대표 규칙 활용 3가지 · 한국어교육 기준 7대 불규칙 핵심 정리' },
  { id: 'summary_particle_1', group: 'summary', shortLabel: '조사 ① 30단원표', title: '㉛ 한국어 조사 결합 총정리표 (1/2쪽 · 30단원 카드)', subtitle: '4×6 와이드 카드로 22조사 + 8문장 만들기 한눈에 보기' },
  { id: 'summary_particle_2', group: 'summary', shortLabel: '조사 ② 짝꿍·주의', title: '㉛ 한국어 조사 결합 총정리표 (2/2쪽 · 받침짝꿍·주의)', subtitle: '받침 O/X/ㄹ 짝꿍 7종 · 고정 조사 · 변신/주의 4대 핵심 포인트' },
  { id: 'summary_classroom_0', group: 'summary', shortLabel: '교실 1~5단원', title: '교실한국어 총정리 1쪽 (①~⑤)', subtitle: '1~5단원 50어휘 · 2줄 적층형(말줄임 0%) · 클릭 음성 지원' },
  { id: 'summary_classroom_1', group: 'summary', shortLabel: '교실 6~10단원', title: '교실한국어 총정리 2쪽 (⑥~⑩)', subtitle: '6~10단원 50어휘 · 2줄 적층형(말줄임 0%) · 클릭 음성 지원' },
  { id: 'summary_classroom_2', group: 'summary', shortLabel: '교실 11~15단원', title: '교실한국어 총정리 3쪽 (⑪~⑮)', subtitle: '11~15단원 50어휘 · 2줄 적층형(말줄임 0%) · 클릭 음성 지원' },
  { id: 'summary_classroom_3', group: 'summary', shortLabel: '교실 16~20단원', title: '교실한국어 총정리 4쪽 (⑯~⑳)', subtitle: '16~20단원 50어휘 · 2줄 적층형(말줄임 0%) · 클릭 음성 지원' },
  { id: 'summary_classroom_4', group: 'summary', shortLabel: '교실 21~25단원', title: '교실한국어 총정리 5쪽 (㉑~㉕)', subtitle: '21~25단원 50어휘 · 2줄 적층형(말줄임 0%) · 클릭 음성 지원' },
  { id: 'summary_classroom_5', group: 'summary', shortLabel: '교실 26~30단원', title: '교실한국어 총정리 6쪽 (㉖~㉚)', subtitle: '26~30단원 50어휘 · 2줄 적층형(말줄임 0%) · 클릭 음성 지원' },
  { id: 'wordbook_0', group: 'wordbook', shortLabel: '단어장 ① 교실 1~150', title: WORDBOOK_SHEET_ITEMS[0].title, subtitle: `${WORDBOOK_SHEET_ITEMS[0].subtitle} · A4 가로 4열` },
  { id: 'wordbook_1', group: 'wordbook', shortLabel: '단어장 ② 교실 151~300', title: WORDBOOK_SHEET_ITEMS[1].title, subtitle: `${WORDBOOK_SHEET_ITEMS[1].subtitle} · A4 가로 4열` },
  { id: 'wordbook_2', group: 'wordbook', shortLabel: '단어장 ③ 용언 150', title: WORDBOOK_SHEET_ITEMS[2].title, subtitle: `${WORDBOOK_SHEET_ITEMS[2].subtitle} · A4 가로 4열` },
  { id: 'wordbook_3', group: 'wordbook', shortLabel: '단어장 ④ 조사 150', title: WORDBOOK_SHEET_ITEMS[3].title, subtitle: `${WORDBOOK_SHEET_ITEMS[3].subtitle} · A4 가로 4열` },
];

const COMPACT_SUMMARY_REFERENCE_ITEMS: {
  id: ReferenceItemId;
  group: 'summary';
  shortLabel: string;
  title: string;
  subtitle: string;
}[] = [
  { id: 'summary_consonants', group: 'summary', shortLabel: '자음 총정리', title: '⑯ 한국어 자음 총정리표', subtitle: '기본자음 14 · 쌍자음 5 · 이름·로마자 [앞/뒤] 안내' },
  { id: 'summary_vowels', group: 'summary', shortLabel: '모음 총정리', title: '⑰ 한국어 모음 총정리표', subtitle: '기본모음 10 · 복합모음 11 · 발음·유사모음 팁' },
  { id: 'summary_batchim', group: 'summary', shortLabel: '받침 총정리', title: '⑯ 한국어 받침 총정리표', subtitle: '7개 대표 받침 로마자 · 받침 가족 · 겹받침 11자' },
  { id: 'compact_verb', group: 'summary', shortLabel: '용언 총정리 (1장)', title: '㉛ 한국어 용언 활용 총정리표 (기존 압축 1장)', subtitle: '한·영 전용 기존 1장 압축판 · 30단원 문형 + 규칙·불규칙 한 장 정리' },
  { id: 'compact_particle', group: 'summary', shortLabel: '조사 총정리 (1장)', title: '㉛ 한국어 조사 결합 총정리표 (기존 압축 1장)', subtitle: '한·영 전용 기존 1장 압축판 · 6×4 카드 + 받침 짝꿍·주의 한 장 정리' },
  { id: 'compact_classroom_0', group: 'summary', shortLabel: '교실 1~10단원', title: '교실한국어 총정리 1쪽 (①~⑩ · 압축)', subtitle: '1~10단원 100어휘 · 5×2 압축 1장 · 클릭 음성 지원' },
  { id: 'compact_classroom_1', group: 'summary', shortLabel: '교실 11~20단원', title: '교실한국어 총정리 2쪽 (⑪~⑳ · 압축)', subtitle: '11~20단원 100어휘 · 5×2 압축 1장 · 클릭 음성 지원' },
  { id: 'compact_classroom_2', group: 'summary', shortLabel: '교실 21~30단원', title: '교실한국어 총정리 3쪽 (㉑~㉚ · 압축)', subtitle: '21~30단원 100어휘 · 5×2 압축 1장 · 클릭 음성 지원' },
];

export const ADMIN_PRINT_PORTAL_CSS = `
  @media print {
    @page {
      size: A4 landscape;
      margin: 4mm 6mm;
    }
    body.admin-studio-printing {
      background: #ffffff !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      overflow: visible !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body.admin-studio-printing #root,
    body.admin-studio-printing .no-print,
    body.admin-studio-printing .print-modal-overlay {
      display: none !important;
    }
    body.admin-studio-printing #admin-print-portal-root {
      display: block !important;
      position: static !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #ffffff !important;
    }
    #admin-print-portal-root .admin-print-sheet-item {
      margin: 0 !important;
      padding: 0 !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      page-break-after: always !important;
      break-after: page !important;
      overflow: hidden !important;
    }
    #admin-print-portal-root .admin-print-sheet-item:last-child {
      page-break-after: avoid !important;
      break-after: avoid !important;
      overflow: visible !important;
    }
    #admin-print-portal-root .printable-a4-page {
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      width: 281mm !important;
      max-width: 281mm !important;
      height: 198mm !important;
      min-height: 198mm !important;
      max-height: 198mm !important;
      box-sizing: border-box !important;
      margin: 0 auto !important;
      padding: 2.5mm 3.5mm !important;
      background: #ffffff !important;
      border: 1.5px solid #1e293b !important;
      border-radius: 6px !important;
      box-shadow: none !important;
      overflow: hidden !important;
    }
    #admin-print-portal-root .printable-word-sheet,
    #admin-print-portal-root .print-sheet {
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      width: 281mm !important;
      max-width: 281mm !important;
      height: 194mm !important;
      min-height: 194mm !important;
      max-height: 194mm !important;
      box-sizing: border-box !important;
      margin: 0 auto !important;
      padding: 2.5mm 3.5mm !important;
      background: #ffffff !important;
      border: 1.5px solid #1e293b !important;
      border-radius: 6px !important;
      box-shadow: none !important;
      overflow: hidden !important;
    }
    #admin-print-portal-root .consonants-summary-sheet,
    #admin-print-portal-root .vowels-summary-sheet,
    #admin-print-portal-root .batchim-summary-sheet,
    #admin-print-portal-root .verb-summary-sheet,
    #admin-print-portal-root .particle-summary-sheet,
    #admin-print-portal-root .classroom-summary-sheet {
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;
      width: 281mm !important;
      max-width: 281mm !important;
      height: 194mm !important;
      min-height: 194mm !important;
      max-height: 194mm !important;
      margin: 0 auto !important;
      padding: 2.5mm 3.5mm !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }
    #admin-print-portal-root .summary-basic-grid {
      display: grid !important;
      grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
      gap: 5px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-bottom-split {
      display: grid !important;
      grid-template-columns: 53fr 47fr !important;
      gap: 8px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-double-grid {
      display: grid !important;
      grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      gap: 5px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-vowel-basic-grid {
      display: grid !important;
      grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
      gap: 5px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-vowel-bottom-split {
      display: grid !important;
      grid-template-columns: 57fr 43fr !important;
      gap: 8px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-vowel-compound-grid {
      display: grid !important;
      grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
      gap: 5px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-batchim-rep-grid {
      display: grid !important;
      grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
      gap: 5px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-batchim-bottom-split {
      display: grid !important;
      grid-template-columns: 58fr 42fr !important;
      gap: 8px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-batchim-double-grid {
      display: grid !important;
      grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
      gap: 5px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-verb-grid {
      display: grid !important;
      grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      gap: 6px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-particle-grid {
      display: grid !important;
      grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
      gap: 6px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-particle-compact-grid {
      display: grid !important;
      grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
      gap: 4px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-verb-bottom {
      display: grid !important;
      grid-template-columns: 42fr 58fr !important;
      gap: 10px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-verb-compact-bottom {
      display: grid !important;
      grid-template-columns: 37fr 63fr !important;
      gap: 7px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-particle-bottom {
      display: grid !important;
      grid-template-columns: 50fr 50fr !important;
      gap: 10px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-particle-compact-bottom {
      display: grid !important;
      grid-template-columns: 52fr 48fr !important;
      gap: 7px !important;
      width: 100% !important;
    }
    #admin-print-portal-root .summary-classroom-grid {
      display: grid !important;
      grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
      gap: 7px !important;
      width: 100% !important;
    }
    #admin-print-portal-root table.word-table {
      width: 100% !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
    }
    #admin-print-portal-root table.word-table thead tr {
      height: 6.5mm !important;
      border-bottom: 1.5px solid #374151 !important;
    }
    #admin-print-portal-root table.word-table tbody tr {
      height: 16.5mm !important;
      border-bottom: 1.5px solid #374151 !important;
    }
    #admin-print-portal-root table.word-table th,
    #admin-print-portal-root table.word-table td {
      border: 1.5px solid #374151 !important;
      text-align: center !important;
      vertical-align: middle !important;
      padding: 0 !important;
    }
    #admin-print-portal-root .all-langs-cell {
      height: 100% !important;
      max-height: 16.2mm !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: space-evenly !important;
      padding: 0.3mm 1.2mm !important;
    }
    #admin-print-portal-root .all-langs-cell .lang-row {
      display: flex !important;
      align-items: center !important;
      gap: 0.8mm !important;
      line-height: 1.15 !important;
      white-space: nowrap !important;
      overflow: hidden !important;
    }
    #admin-print-portal-root .all-langs-cell .lang-tag {
      font-size: 5.5pt !important;
      padding: 0.1mm 0.6mm !important;
      line-height: 1 !important;
      border: 0.5px solid #94a3b8 !important;
    }
    #admin-print-portal-root .all-langs-cell .lang-text {
      font-size: 7.2pt !important;
      line-height: 1.15 !important;
    }
    #admin-print-portal-root table.square-grid-table {
      width: 100% !important;
      table-layout: fixed !important;
      border-collapse: collapse !important;
    }
    #admin-print-portal-root table.square-grid-table thead tr {
      height: 6.5mm !important;
    }
    #admin-print-portal-root table.square-grid-table th,
    #admin-print-portal-root table.square-grid-table td {
      border: 1.5px solid #374151 !important;
      padding: 0 !important;
      vertical-align: middle !important;
    }
    #admin-print-portal-root table.consonant-table tbody tr { height: 17.5mm !important; }
    #admin-print-portal-root table.consonant-table tbody td .cell-square-box { height: 17.5mm !important; }
    #admin-print-portal-root table.vowel-table tbody tr { height: 12.2mm !important; }
    #admin-print-portal-root table.vowel-table tbody td .cell-square-box { height: 12.2mm !important; }
    #admin-print-portal-root table.combo-table tbody tr { height: 13.5mm !important; }
    #admin-print-portal-root table.combo-table tbody td .cell-square-box { height: 13.5mm !important; }
    #admin-print-portal-root .printable-wordbook-page {
      height: 194mm !important;
      padding: 2mm 3mm !important;
    }
    #admin-print-portal-root .printable-wordbook-page .wb-columns-grid {
      display: grid !important;
      grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
      flex: 1 1 auto !important;
      gap: 1.8mm !important;
      width: 100% !important;
    }
    #admin-print-portal-root table.wordbook-table {
      width: 100% !important;
      height: 100% !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
    }
    #admin-print-portal-root table.wordbook-table thead tr { height: 4.8mm !important; }
    #admin-print-portal-root table.wordbook-table tbody tr { height: 4.45mm !important; }
    #admin-print-portal-root table.wordbook-table th,
    #admin-print-portal-root table.wordbook-table td {
      padding-top: 0.25mm !important;
      padding-bottom: 0.25mm !important;
    }
    #admin-print-portal-root .jamo-stroke-sheet .jamo-card-grid {
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 14px !important;
    }
    #admin-print-portal-root .basic-letter-sheet .jamo-card-grid {
      display: grid !important;
      grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
      gap: 10px !important;
    }
  }
`;

export const AdminPrintAndReferenceTab: React.FC<{
  mode: 'print' | 'reference';
}> = ({ mode }) => {
  // Print Center State
  const [category, setCategory] = useState<AdminPrintCategory>('classroom_triple');
  const [printScope, setPrintScope] = useState<'single' | 'all'>('single');
  const [selectedChapterCh, setSelectedChapterCh] = useState<number>(CHAPTER_LIST[0]?.ch ?? 1);
  const [selectedJamoIdx, setSelectedJamoIdx] = useState<number>(0);
  const [selectedBasicIdx, setSelectedBasicIdx] = useState<number>(0);
  const [selectedBatchimIdx, setSelectedBatchimIdx] = useState<number>(0);
  const [selectedVerbIdx, setSelectedVerbIdx] = useState<number>(0);
  const [selectedParticleComboIdx, setSelectedParticleComboIdx] = useState<number>(0);
  const [selectedParticleSentenceIdx, setSelectedParticleSentenceIdx] = useState<number>(0);
  const [selectedSummaryIdx, setSelectedSummaryIdx] = useState<number>(0);
  const [selectedCompactSummaryIdx, setSelectedCompactSummaryIdx] = useState<number>(0);
  const [selectedWordbookIdx, setSelectedWordbookIdx] = useState<number>(0);

  // Reference Tab State
  const [selectedRefId, setSelectedRefId] = useState<ReferenceItemId>('summary_consonants');
  const [summaryEdition, setSummaryEdition] = useState<'expanded13' | 'compact8'>('expanded13');

  // Shared Language Controls
  // - customSelectedLangs: Classroom 1~3 langs
  // - singleLang: Teacher Studio language ('ko' + 7 SupportedLanguages)
  const [customSelectedLangs, setCustomSelectedLangs] = useState<SupportedLanguage[]>(['en', 'vi']);
  const [singleLang, setSingleLang] = useState<AdminSummaryLang>('ko');
  const effectiveLearnerLang: SupportedLanguage = singleLang === 'ko' ? 'en' : singleLang;
  const isCompactAllowed = singleLang === 'ko' || singleLang === 'en';
  const effectiveSummaryEdition: 'expanded13' | 'compact8' = isCompactAllowed ? summaryEdition : 'expanded13';
  const compactSummaryLang: 'ko' | 'en' = singleLang === 'en' ? 'en' : 'ko';

  // PDF Export, PNG Export, PNG ZIP Batch Export & Printer Print States
  const [pdfProgress, setPdfProgress] = useState<{ done: number; total: number } | null>(null);
  const [pngZipProgress, setPngZipProgress] = useState<{ done: number; total: number } | null>(null);
  const [pngBusy, setPngBusy] = useState<boolean>(false);
  const [pdfSuccessMsg, setPdfSuccessMsg] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [printSheetsQueue, setPrintSheetsQueue] = useState<SheetRenderDescriptor[] | null>(null);
  const [pdfRenderQueue, setPdfRenderQueue] = useState<{
    sheets: SheetRenderDescriptor[];
    fileName: string;
  } | null>(null);
  const [pngRenderQueue, setPngRenderQueue] = useState<{
    sheet: SheetRenderDescriptor;
    fileName: string;
  } | null>(null);
  const [pngZipRenderQueue, setPngZipRenderQueue] = useState<{
    sheets: SheetRenderDescriptor[];
    zipFileName: string;
    langTag?: string;
  } | null>(null);

  const offscreenPdfRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offscreenPngRef = useRef<HTMLDivElement | null>(null);
  const offscreenPngZipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isExportBusy = Boolean(pdfProgress) || Boolean(pngZipProgress) || pngBusy;

  const handleToggleCustomLang = (code: SupportedLanguage) => {
    playCutePop();
    setCustomSelectedLangs((prev) => {
      if (prev.includes(code)) {
        return prev.length > 1 ? prev.filter((c) => c !== code) : prev;
      }
      return prev.length < 3 ? [...prev, code] : [...prev.slice(1), code];
    });
  };

  // Summary 6 kinds (13 pages total) builder — all charts support full 8-language copies ('ko' + 7)
  const summarySheetDescriptors: SheetRenderDescriptor[] = useMemo(
    () => [
      {
        key: `sum-consonants-${singleLang}`,
        label: `1. 한국어 자음 총정리표 (${singleLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <ConsonantsSummaryWorksheetPage
            interactiveAudio={audio}
            copy={CONSONANTS_SUMMARY_COPIES[singleLang]}
          />
        ),
      },
      {
        key: `sum-vowels-${singleLang}`,
        label: `2. 한국어 모음 총정리표 (${singleLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <VowelsSummaryWorksheetPage
            interactiveAudio={audio}
            copy={VOWELS_SUMMARY_COPIES[singleLang]}
          />
        ),
      },
      {
        key: `sum-batchim-${singleLang}`,
        label: `3. 한국어 받침 총정리표 (${singleLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <BatchimSummaryWorksheetPage
            interactiveAudio={audio}
            copy={BATCHIM_SUMMARY_COPIES[singleLang]}
          />
        ),
      },
      {
        key: `sum-verb-1-${singleLang}`,
        label: `4-1. 용언 활용 총정리표 ① 30단원 문형 (${singleLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <VerbSummaryWorksheetPage
            interactiveAudio={audio}
            copy={VERB_SUMMARY_COPIES[singleLang]}
            pagePart="grid"
          />
        ),
      },
      {
        key: `sum-verb-2-${singleLang}`,
        label: `4-2. 용언 활용 총정리표 ② 규칙·7대 불규칙 (${singleLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <VerbSummaryWorksheetPage
            interactiveAudio={audio}
            copy={VERB_SUMMARY_COPIES[singleLang]}
            pagePart="rules"
          />
        ),
      },
      {
        key: `sum-particle-1-${singleLang}`,
        label: `5-1. 조사 결합 총정리표 ① 30단원 카드 (${singleLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <ParticleSummaryWorksheetPage
            interactiveAudio={audio}
            copy={PARTICLE_SUMMARY_COPIES[singleLang]}
            pagePart="grid"
          />
        ),
      },
      {
        key: `sum-particle-2-${singleLang}`,
        label: `5-2. 조사 결합 총정리표 ② 받침짝꿍·주의 (${singleLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <ParticleSummaryWorksheetPage
            interactiveAudio={audio}
            copy={PARTICLE_SUMMARY_COPIES[singleLang]}
            pagePart="rules"
          />
        ),
      },
      ...CLASSROOM_SUMMARY_PAGES.map((p, i) => ({
        key: `sum-classroom-${i}-${singleLang}`,
        label: `6-${i + 1}. 교실한국어 총정리 (${p.badge})`,
        targetWidth: 1060,
        render: (audio: boolean) => (
          <ClassroomSummaryWorksheetPage
            vocabulary={VOCABULARY_DATA}
            pageIndex={p.pageIndex}
            selectedLang={effectiveLearnerLang}
            uiLang={singleLang}
            interactiveAudio={audio}
          />
        ),
      })),
    ],
    [singleLang, effectiveLearnerLang]
  );

  // Compact Summary 6 kinds (8 pages total) — Korean & English legacy edition
  const compactSummarySheetDescriptors: SheetRenderDescriptor[] = useMemo(
    () => [
      {
        key: `csum-consonants-${compactSummaryLang}`,
        label: `1. 한국어 자음 총정리표 (${compactSummaryLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <ConsonantsSummaryWorksheetPage
            interactiveAudio={audio}
            copy={CONSONANTS_SUMMARY_COPIES[compactSummaryLang]}
          />
        ),
      },
      {
        key: `csum-vowels-${compactSummaryLang}`,
        label: `2. 한국어 모음 총정리표 (${compactSummaryLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <VowelsSummaryWorksheetPage
            interactiveAudio={audio}
            copy={VOWELS_SUMMARY_COPIES[compactSummaryLang]}
          />
        ),
      },
      {
        key: `csum-batchim-${compactSummaryLang}`,
        label: `3. 한국어 받침 총정리표 (${compactSummaryLang})`,
        targetWidth: 1060,
        render: (audio) => (
          <BatchimSummaryWorksheetPage
            interactiveAudio={audio}
            copy={BATCHIM_SUMMARY_COPIES[compactSummaryLang]}
          />
        ),
      },
      {
        key: `csum-verb-${compactSummaryLang}`,
        label: `4. 용언 활용 총정리표 압축1장 (${compactSummaryLang})`,
        targetWidth: 990,
        render: (audio) => (
          <VerbSummaryCompactWorksheetPage
            interactiveAudio={audio}
            copy={VERB_SUMMARY_COPIES[compactSummaryLang]}
          />
        ),
      },
      {
        key: `csum-particle-${compactSummaryLang}`,
        label: `5. 조사 결합 총정리표 압축1장 (${compactSummaryLang})`,
        targetWidth: 990,
        render: (audio) => (
          <ParticleSummaryCompactWorksheetPage
            interactiveAudio={audio}
            copy={PARTICLE_SUMMARY_COPIES[compactSummaryLang]}
          />
        ),
      },
      ...CLASSROOM_COMPACT_PAGES.map((p, i) => ({
        key: `csum-classroom-${i}-${compactSummaryLang}`,
        label: `6-${i + 1}. 교실한국어 총정리 압축 (${p.badge})`,
        targetWidth: 990,
        render: (audio: boolean) => (
          <ClassroomSummaryCompactWorksheetPage
            vocabulary={VOCABULARY_DATA}
            pageIndex={p.pageIndex}
            selectedLang="en"
            uiLang={compactSummaryLang}
            interactiveAudio={audio}
          />
        ),
      })),
    ],
    [compactSummaryLang]
  );

  // Wordbook 4 pages builder (A4 Landscape, 4 balanced columns per page)
  const wordbookSheetDescriptors: SheetRenderDescriptor[] = useMemo(
    () => [
      {
        key: 'wb-0',
        label: WORDBOOK_SHEET_ITEMS[0].title,
        targetWidth: 1060,
        render: (audio) => (
          <PrintableWordbookSheet
            items={VOCABULARY_DATA.slice(0, 150)}
            pageIndex={0}
            totalPages={4}
            startNumber={1}
            selectedLang={effectiveLearnerLang}
            columnsCount={4}
            sheetTitle="① 교실한국어 (1~150번 · 1~15단원)"
            interactiveAudio={audio}
          />
        ),
      },
      {
        key: 'wb-1',
        label: WORDBOOK_SHEET_ITEMS[1].title,
        targetWidth: 1060,
        render: (audio) => (
          <PrintableWordbookSheet
            items={VOCABULARY_DATA.slice(150, 300)}
            pageIndex={1}
            totalPages={4}
            startNumber={151}
            selectedLang={effectiveLearnerLang}
            columnsCount={4}
            sheetTitle="② 교실한국어 (151~300번 · 16~30단원)"
            interactiveAudio={audio}
          />
        ),
      },
      {
        key: 'wb-2',
        label: WORDBOOK_SHEET_ITEMS[2].title,
        targetWidth: 1060,
        render: (audio) => (
          <PrintableWordbookSheet
            items={WORDBOOK_VERB_ITEMS}
            pageIndex={2}
            totalPages={4}
            startNumber={1}
            selectedLang={effectiveLearnerLang}
            columnsCount={4}
            sheetTitle="③ 용언 활용 (1~30단원 · 150단어)"
            interactiveAudio={audio}
          />
        ),
      },
      {
        key: 'wb-3',
        label: WORDBOOK_SHEET_ITEMS[3].title,
        targetWidth: 1060,
        render: (audio) => (
          <PrintableWordbookSheet
            items={WORDBOOK_PARTICLE_ITEMS}
            pageIndex={3}
            totalPages={4}
            startNumber={1}
            selectedLang={effectiveLearnerLang}
            columnsCount={4}
            sheetTitle="④ 조사 결합 (1~30단원 · 150단어)"
            interactiveAudio={audio}
          />
        ),
      },
    ],
    [effectiveLearnerLang]
  );

  // Build descriptors for current selection in Print Center
  const activePrintDescriptors: SheetRenderDescriptor[] = useMemo(() => {
    const chObj = CHAPTER_LIST.find((c) => c.ch === selectedChapterCh) || CHAPTER_LIST[0];
    const targetChapters = printScope === 'all' ? CHAPTER_LIST : [chObj];

    switch (category) {
      case 'classroom_triple': {
        const list: SheetRenderDescriptor[] = [];
        targetChapters.forEach((c) => {
          const items = VOCABULARY_DATA.filter((v) => v.ch === c.ch);
          list.push(
            {
              key: `triple-card-${c.ch}`,
              label: `${c.circledTitle} · ① 그림카드`,
              targetWidth: 990,
              render: (audio) => (
                <PrintableWorksheetPage
                  chapter={c}
                  items={items}
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={audio}
                />
              ),
            },
            {
              key: `triple-writing-${c.ch}`,
              label: `${c.circledTitle} · ② 따라쓰기`,
              targetWidth: 990,
              render: (audio) => (
                <PrintableWordWorksheetPage
                  chapter={c}
                  items={items}
                  mode="writing"
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={audio}
                />
              ),
            },
            {
              key: `triple-quiz-${c.ch}`,
              label: `${c.circledTitle} · ③ 받아쓰기`,
              targetWidth: 990,
              render: (audio) => (
                <PrintableWordWorksheetPage
                  chapter={c}
                  items={items}
                  mode="quiz"
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={audio}
                />
              ),
            }
          );
        });
        return list;
      }
      case 'classroom_cards':
        return targetChapters.map((c) => {
          const items = VOCABULARY_DATA.filter((v) => v.ch === c.ch);
          return {
            key: `card-${c.ch}`,
            label: `${c.circledTitle} 그림카드`,
            targetWidth: 990,
            render: (audio) => (
              <PrintableWorksheetPage
                chapter={c}
                items={items}
                selectedLangs={customSelectedLangs}
                interactiveAudio={audio}
              />
            ),
          };
        });
      case 'classroom_writing':
        return targetChapters.map((c) => {
          const items = VOCABULARY_DATA.filter((v) => v.ch === c.ch);
          return {
            key: `writing-${c.ch}`,
            label: `${c.circledTitle} 따라쓰기`,
            targetWidth: 990,
            render: (audio) => (
              <PrintableWordWorksheetPage
                chapter={c}
                items={items}
                mode="writing"
                selectedLangs={customSelectedLangs}
                interactiveAudio={audio}
              />
            ),
          };
        });
      case 'classroom_quiz':
        return targetChapters.map((c) => {
          const items = VOCABULARY_DATA.filter((v) => v.ch === c.ch);
          return {
            key: `quiz-${c.ch}`,
            label: `${c.circledTitle} 받아쓰기`,
            targetWidth: 990,
            render: (audio) => (
              <PrintableWordWorksheetPage
                chapter={c}
                items={items}
                mode="quiz"
                selectedLangs={customSelectedLangs}
                interactiveAudio={audio}
              />
            ),
          };
        });
      case 'hangeul_jamo': {
        const list =
          printScope === 'all'
            ? JAMO_META_LIST
            : [JAMO_META_LIST[selectedJamoIdx] || JAMO_META_LIST[0]];
        return list.map((m) => ({
          key: `jamo-${m.idx}`,
          label: m.label,
          targetWidth: 990,
          render: (audio) => m.render(audio),
        }));
      }
      case 'hangeul_basic': {
        const list =
          printScope === 'all'
            ? BASIC_LETTERS_DATA.map((p, idx) => ({ p, idx }))
            : [{ p: BASIC_LETTERS_DATA[selectedBasicIdx] || BASIC_LETTERS_DATA[0], idx: selectedBasicIdx }];
        return list.map(({ p, idx }) => ({
          key: `basic-${idx}`,
          label: `${p.circledNumber} ${p.vowel}와 만나요`,
          targetWidth: 990,
          render: (audio) => (
            <BasicLetterWorksheetPage pageIndex={idx} pageData={p} interactiveAudio={audio} />
          ),
        }));
      }
      case 'hangeul_batchim': {
        const list =
          printScope === 'all'
            ? BATCHIM_PAGES_DATA.map((p, idx) => ({ p, idx }))
            : [{ p: BATCHIM_PAGES_DATA[selectedBatchimIdx] || BATCHIM_PAGES_DATA[0], idx: selectedBatchimIdx }];
        return list.map(({ p, idx }) => ({
          key: `batchim-${idx}`,
          label: `${p.title.replace('✏️ ', '')}`,
          targetWidth: 990,
          render: (audio) => (
            <BatchimWorksheetPage pageIndex={idx} pageData={p} interactiveAudio={audio} />
          ),
        }));
      }
      case 'verb': {
        const list =
          printScope === 'all'
            ? VERB_UNIT_META
            : [VERB_UNIT_META[selectedVerbIdx] || VERB_UNIT_META[0]];
        return list.map((u) => ({
          key: `verb-${u.id}`,
          label: `${u.circled} ${u.grammar}`,
          targetWidth: 1040,
          render: () => <VerbConjugationWorksheetPage unit={u.id} lang={effectiveLearnerLang} />,
        }));
      }
      case 'particle_combo': {
        const list =
          printScope === 'all'
            ? PARTICLE_UNIT_META
            : [PARTICLE_UNIT_META[selectedParticleComboIdx] || PARTICLE_UNIT_META[0]];
        return list.map((u) => ({
          key: `pcombo-${u.id}`,
          label: `${u.circled} ${u.title}`,
          targetWidth: 1040,
          render: () => <ParticleWorksheetPage unit={u.id} lang={effectiveLearnerLang} />,
        }));
      }
      case 'particle_sentence': {
        const list =
          printScope === 'all'
            ? PARTICLE_SENTENCE_UNITS
            : [PARTICLE_SENTENCE_UNITS[selectedParticleSentenceIdx] || PARTICLE_SENTENCE_UNITS[0]];
        return list.map((u) => ({
          key: `psent-${u.id}`,
          label: `${u.circled} ${u.title}`,
          targetWidth: 1040,
          render: () => <ParticleWorksheetPage unit={u.id} lang={effectiveLearnerLang} />,
        }));
      }
      case 'summary_all':
        return printScope === 'all'
          ? summarySheetDescriptors
          : [summarySheetDescriptors[selectedSummaryIdx] || summarySheetDescriptors[0]];
      case 'summary_compact_8':
        return printScope === 'all'
          ? compactSummarySheetDescriptors
          : [compactSummarySheetDescriptors[selectedCompactSummaryIdx] || compactSummarySheetDescriptors[0]];
      case 'wordbook_all':
        return printScope === 'all'
          ? wordbookSheetDescriptors
          : [wordbookSheetDescriptors[selectedWordbookIdx] || wordbookSheetDescriptors[0]];
      default:
        return [];
    }
  }, [
    category,
    printScope,
    selectedChapterCh,
    selectedJamoIdx,
    selectedBasicIdx,
    selectedBatchimIdx,
    selectedVerbIdx,
    selectedParticleComboIdx,
    selectedParticleSentenceIdx,
    selectedSummaryIdx,
    selectedCompactSummaryIdx,
    selectedWordbookIdx,
    customSelectedLangs,
    singleLang,
    effectiveLearnerLang,
    summarySheetDescriptors,
    compactSummarySheetDescriptors,
    wordbookSheetDescriptors,
  ]);

  // Execute native browser printer dialog via dedicated body portal
  const triggerPrinterDialog = (sheets: SheetRenderDescriptor[]) => {
    if (!sheets || sheets.length === 0) return;
    playCutePop();
    setActionError(null);
    setPrintSheetsQueue(sheets);
    document.body.classList.add('admin-studio-printing');

    const cleanup = () => {
      document.body.classList.remove('admin-studio-printing');
      setPrintSheetsQueue(null);
      window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);
    setTimeout(() => {
      window.print();
      setTimeout(cleanup, 3000);
    }, 180);
  };

  // Cleanup body print class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('admin-studio-printing');
    };
  }, []);

  // Trigger real multi-page PDF export once offscreen nodes mount
  const triggerPdfDownload = (sheets: SheetRenderDescriptor[], fileName: string) => {
    if (!sheets || sheets.length === 0 || isExportBusy) return;
    playCutePop();
    setActionError(null);
    setPdfSuccessMsg(null);
    offscreenPdfRefs.current = [];
    setPdfProgress({ done: 0, total: sheets.length });
    setPdfRenderQueue({ sheets, fileName });
  };

  useEffect(() => {
    if (!pdfRenderQueue) return;
    let cancelled = false;

    const run = async () => {
      await new Promise((r) => setTimeout(r, 120));
      if (cancelled) return;
      const nodes = offscreenPdfRefs.current
        .slice(0, pdfRenderQueue.sheets.length)
        .filter((el): el is HTMLDivElement => Boolean(el));

      try {
        await exportNodesToPdf(nodes, {
          fileName: pdfRenderQueue.fileName,
          orientation: 'landscape',
          onProgress: (done, total) => {
            if (!cancelled) setPdfProgress({ done, total });
          },
        });
        if (!cancelled) {
          setPdfSuccessMsg(`PDF 저장 완료: ${pdfRenderQueue.fileName} (${pdfRenderQueue.sheets.length}쪽)`);
        }
      } catch (err) {
        if (!cancelled) {
          setActionError(
            err instanceof Error ? `PDF 생성 오류: ${err.message}` : 'PDF 생성 중 오류가 발생했습니다.'
          );
        }
      } finally {
        if (!cancelled) {
          setPdfProgress(null);
          setPdfRenderQueue(null);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [pdfRenderQueue]);

  // Trigger crisp unscaled PNG capture for a single sheet
  const triggerPngDownload = (sheet: SheetRenderDescriptor, fileName: string) => {
    if (!sheet || isExportBusy) return;
    playCutePop();
    setActionError(null);
    setPdfSuccessMsg(null);
    setPngBusy(true);
    setPngRenderQueue({ sheet, fileName });
  };

  useEffect(() => {
    if (!pngRenderQueue) return;
    let cancelled = false;

    const run = async () => {
      await new Promise((r) => setTimeout(r, 140));
      if (cancelled) return;
      const targetNode = offscreenPngRef.current?.firstElementChild as HTMLElement | null;
      if (!targetNode) {
        setPngBusy(false);
        setPngRenderQueue(null);
        return;
      }

      try {
        await captureNodeToPng(targetNode, pngRenderQueue.fileName);
        if (!cancelled) {
          setPdfSuccessMsg(`PNG 저장 완료: ${pngRenderQueue.fileName}`);
        }
      } catch (err) {
        if (!cancelled) {
          setActionError(
            err instanceof Error ? `PNG 생성 오류: ${err.message}` : 'PNG 저장 중 오류가 발생했습니다.'
          );
        }
      } finally {
        if (!cancelled) {
          setPngBusy(false);
          setPngRenderQueue(null);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [pngRenderQueue]);

  // Trigger batch PNG export bundled as a single .zip archive
  const triggerPngZipDownload = (
    sheets: SheetRenderDescriptor[],
    zipFileName: string,
    langTag?: string
  ) => {
    if (!sheets || sheets.length === 0 || isExportBusy) return;
    playCutePop();
    setActionError(null);
    setPdfSuccessMsg(null);
    offscreenPngZipRefs.current = [];
    setPngZipProgress({ done: 0, total: sheets.length });
    setPngZipRenderQueue({ sheets, zipFileName, langTag });
  };

  useEffect(() => {
    if (!pngZipRenderQueue) return;
    let cancelled = false;

    const run = async () => {
      await new Promise((r) => setTimeout(r, 140));
      if (cancelled) return;

      const items = pngZipRenderQueue.sheets
        .map((sheet, idx) => {
          const wrapper = offscreenPngZipRefs.current[idx];
          const targetNode = (wrapper?.firstElementChild as HTMLElement | null) || wrapper;
          if (!targetNode) return null;
          const numPrefix = String(idx + 1).padStart(2, '0');
          const safeName = sheet.label.replace(/[^\w가-힣~]+/g, '_').replace(/^_+|_+$/g, '');
          const langSuffix = pngZipRenderQueue.langTag ? `_${pngZipRenderQueue.langTag}` : '';
          return {
            node: targetNode,
            fileName: `${numPrefix}_${safeName}${langSuffix}.png`,
          };
        })
        .filter((x): x is { node: HTMLElement; fileName: string } => Boolean(x));

      try {
        await exportNodesToPngZip(items, {
          zipFileName: pngZipRenderQueue.zipFileName,
          onProgress: (done, total) => {
            if (!cancelled) setPngZipProgress({ done, total });
          },
        });
        if (!cancelled) {
          setPdfSuccessMsg(
            `PNG 압축(.zip) 저장 완료: ${pngZipRenderQueue.zipFileName} (${items.length}장)`
          );
        }
      } catch (err) {
        if (!cancelled) {
          setActionError(
            err instanceof Error
              ? `PNG ZIP 생성 오류: ${err.message}`
              : 'PNG 일괄 저장 중 오류가 발생했습니다.'
          );
        }
      } finally {
        if (!cancelled) {
          setPngZipProgress(null);
          setPngZipRenderQueue(null);
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [pngZipRenderQueue]);

  // Keep selectedRefId valid when switching languages or summary edition
  useEffect(() => {
    const isCompactId = selectedRefId.startsWith('compact_');
    if (effectiveSummaryEdition === 'expanded13' && isCompactId) {
      setSelectedRefId('summary_consonants');
    } else if (
      effectiveSummaryEdition === 'compact8' &&
      (selectedRefId.startsWith('summary_verb_') ||
        selectedRefId.startsWith('summary_particle_') ||
        selectedRefId.startsWith('summary_classroom_'))
    ) {
      setSelectedRefId('compact_verb');
    }
  }, [effectiveSummaryEdition, selectedRefId]);

  const activeSummaryRefItems =
    effectiveSummaryEdition === 'compact8'
      ? COMPACT_SUMMARY_REFERENCE_ITEMS
      : REFERENCE_ITEMS.filter((r) => r.group === 'summary');

  const activeSummarySheetPool =
    effectiveSummaryEdition === 'compact8'
      ? compactSummarySheetDescriptors
      : summarySheetDescriptors;

  // Active Reference Descriptor (for mode === 'reference')
  const allRefLookup = [...REFERENCE_ITEMS, ...COMPACT_SUMMARY_REFERENCE_ITEMS];
  const activeRefMeta = allRefLookup.find((r) => r.id === selectedRefId) || REFERENCE_ITEMS[0];
  const activeRefDescriptor: SheetRenderDescriptor = useMemo(() => {
    switch (selectedRefId) {
      case 'summary_consonants':
        return activeSummarySheetPool[0];
      case 'summary_vowels':
        return activeSummarySheetPool[1];
      case 'summary_batchim':
        return activeSummarySheetPool[2];
      case 'summary_verb_1':
        return summarySheetDescriptors[3];
      case 'summary_verb_2':
        return summarySheetDescriptors[4];
      case 'summary_particle_1':
        return summarySheetDescriptors[5];
      case 'summary_particle_2':
        return summarySheetDescriptors[6];
      case 'summary_classroom_0':
        return summarySheetDescriptors[7];
      case 'summary_classroom_1':
        return summarySheetDescriptors[8];
      case 'summary_classroom_2':
        return summarySheetDescriptors[9];
      case 'summary_classroom_3':
        return summarySheetDescriptors[10];
      case 'summary_classroom_4':
        return summarySheetDescriptors[11];
      case 'summary_classroom_5':
        return summarySheetDescriptors[12];
      case 'compact_verb':
        return compactSummarySheetDescriptors[3];
      case 'compact_particle':
        return compactSummarySheetDescriptors[4];
      case 'compact_classroom_0':
        return compactSummarySheetDescriptors[5];
      case 'compact_classroom_1':
        return compactSummarySheetDescriptors[6];
      case 'compact_classroom_2':
        return compactSummarySheetDescriptors[7];
      case 'wordbook_0':
        return wordbookSheetDescriptors[0];
      case 'wordbook_1':
        return wordbookSheetDescriptors[1];
      case 'wordbook_2':
        return wordbookSheetDescriptors[2];
      case 'wordbook_3':
        return wordbookSheetDescriptors[3];
      default:
        return activeSummarySheetPool[0];
    }
  }, [
    selectedRefId,
    activeSummarySheetPool,
    summarySheetDescriptors,
    compactSummarySheetDescriptors,
    wordbookSheetDescriptors,
  ]);

  const activeExportLangTag =
    category === 'summary_all'
      ? singleLang
      : category === 'summary_compact_8'
      ? compactSummaryLang
      : effectiveLearnerLang;

  const buildPdfFileName = () => {
    const scopeTag = printScope === 'all' ? '전체일괄' : '1장선택';
    const catName = CATEGORY_GROUPS.find((g) => g.id === category)?.label.replace(/[^\w가-힣]+/g, '_') || category;
    const langTag = showSingleLangPicker ? `_${activeExportLangTag}` : '';
    return `해볼한국어_${catName}_${scopeTag}${langTag}.pdf`;
  };

  const buildSinglePngFileName = () => {
    const first = activePrintDescriptors[0];
    const cleanLabel = (first?.label || category).replace(/[^\w가-힣]+/g, '_');
    const langTag = showSingleLangPicker ? `_${activeExportLangTag}` : '';
    return `해볼한국어_${cleanLabel}${langTag}.png`;
  };

  const buildPngZipFileName = () => {
    const catName = CATEGORY_GROUPS.find((g) => g.id === category)?.label.replace(/[^\w가-힣]+/g, '_') || category;
    const langTag = showSingleLangPicker ? `_${activeExportLangTag}` : '';
    return `해볼한국어_${catName}_PNG_${activePrintDescriptors.length}장${langTag}.zip`;
  };

  const showMultiLangPicker =
    category === 'classroom_triple' ||
    category === 'classroom_cards' ||
    category === 'classroom_writing' ||
    category === 'classroom_quiz';

  const showSingleLangPicker =
    category === 'verb' ||
    category === 'particle_combo' ||
    category === 'particle_sentence' ||
    category === 'summary_all' ||
    category === 'summary_compact_8' ||
    category === 'wordbook_all';

  return (
    <div className="space-y-4">
      <style>{ADMIN_PRINT_PORTAL_CSS}</style>

      {/* Status / Progress Banners */}
      {pdfProgress && (
        <div className="px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-950 text-xs font-black flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
            <span>
              PDF 파일 생성 중... ({pdfProgress.done} / {pdfProgress.total}쪽)
            </span>
          </div>
          <div className="w-36 h-2 rounded-full bg-indigo-200 overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${Math.round((pdfProgress.done / Math.max(1, pdfProgress.total)) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {pngZipProgress && (
        <div className="px-4 py-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-black flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
            <span>
              PNG 압축파일(.zip) 생성 중... ({pngZipProgress.done} / {pngZipProgress.total}장)
            </span>
          </div>
          <div className="w-36 h-2 rounded-full bg-emerald-200 overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all"
              style={{ width: `${Math.round((pngZipProgress.done / Math.max(1, pngZipProgress.total)) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {pdfSuccessMsg && (
        <div className="px-4 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{pdfSuccessMsg}</span>
        </div>
      )}

      {actionError && (
        <div className="px-4 py-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {mode === 'print' ? (
        /* ================================================================== */
        /* ADMIN PRINT & PDF CENTER (전체 인쇄 · 3종세트 · PDF저장/프린트)      */
        /* ================================================================== */
        <div className="space-y-4">
          {/* 1. Category Grid */}
          <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <Printer className="w-4 h-4 text-indigo-600" />
                  <span>해볼쌤 전용 통합 인쇄 · PDF 저장 센터</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  3종세트·한글·교실한국어·용언·조사·총정리 6종·단어장 4종 모두 PDF 직접 저장과 프린트 인쇄를 지원합니다.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 text-indigo-800 text-[11px] font-black">
                현재 선택: 총 {activePrintDescriptors.length}쪽
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {CATEGORY_GROUPS.map((g) => {
                const isActive = category === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setCategory(g.id);
                    }}
                    className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50/70 hover:bg-slate-100 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-black ${
                          isActive
                            ? g.id === 'classroom_triple'
                              ? 'bg-amber-400 text-amber-950'
                              : 'bg-white/20 text-white'
                            : g.id === 'classroom_triple'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {g.badge}
                      </span>
                    </div>
                    <div className="text-xs font-black truncate">{g.label}</div>
                    <div
                      className={`text-[10.5px] truncate mt-0.5 ${
                        isActive ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {g.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Scope, Unit, Language, & Action Buttons */}
          <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-end">
              {/* Scope Toggle */}
              <div className="space-y-1">
                <label className="block text-xs font-black text-slate-700">출력 범위</label>
                <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setPrintScope('single');
                    }}
                    className={`py-1.5 px-2 rounded-md text-xs font-black cursor-pointer transition-colors ${
                      printScope === 'single'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {category === 'classroom_triple' ? '선택 단원 3종세트 (3쪽)' : '선택 1장(단원)만'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setPrintScope('all');
                    }}
                    className={`py-1.5 px-2 rounded-md text-xs font-black cursor-pointer transition-colors ${
                      printScope === 'all'
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    전체 일괄
                  </button>
                </div>
              </div>

              {/* Unit / Page Selector (when scope is single) */}
              <div className="space-y-1">
                <label className="block text-xs font-black text-slate-700">
                  {printScope === 'all' ? '일괄 포함 전체 범위' : '단원 · 페이지 선택'}
                </label>
                {printScope === 'all' ? (
                  <div className="h-[38px] px-3 rounded-md border border-slate-200 bg-slate-50 text-xs font-black text-slate-700 flex items-center">
                    전체 {activePrintDescriptors.length}쪽 일괄 선택됨
                  </div>
                ) : category.startsWith('classroom') ? (
                  <select
                    value={selectedChapterCh}
                    onChange={(e) => setSelectedChapterCh(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {CHAPTER_LIST.map((c) => (
                      <option key={c.ch} value={c.ch}>
                        {c.icon} {getChapterCircledTitle(c.ch, effectiveLearnerLang)}
                      </option>
                    ))}
                  </select>
                ) : category === 'hangeul_jamo' ? (
                  <select
                    value={selectedJamoIdx}
                    onChange={(e) => setSelectedJamoIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {JAMO_META_LIST.map((m) => (
                      <option key={m.idx} value={m.idx}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                ) : category === 'hangeul_basic' ? (
                  <select
                    value={selectedBasicIdx}
                    onChange={(e) => setSelectedBasicIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {BASIC_LETTERS_DATA.map((p, idx) => (
                      <option key={p.pageNumber} value={idx}>
                        {p.circledNumber} {p.vowel}와 만나요 ({p.wordCard.word})
                      </option>
                    ))}
                  </select>
                ) : category === 'hangeul_batchim' ? (
                  <select
                    value={selectedBatchimIdx}
                    onChange={(e) => setSelectedBatchimIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {BATCHIM_PAGES_DATA.map((p, idx) => (
                      <option key={p.pageNumber} value={idx}>
                        {p.title.replace('✏️ ', '')}
                      </option>
                    ))}
                  </select>
                ) : category === 'verb' ? (
                  <select
                    value={selectedVerbIdx}
                    onChange={(e) => setSelectedVerbIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {VERB_UNIT_META.map((u, idx) => (
                      <option key={u.id} value={idx}>
                        {u.circled} {u.grammar} ({u.verbs.slice(0, 3).join(', ')})
                      </option>
                    ))}
                  </select>
                ) : category === 'particle_combo' ? (
                  <select
                    value={selectedParticleComboIdx}
                    onChange={(e) => setSelectedParticleComboIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {PARTICLE_UNIT_META.map((u, idx) => (
                      <option key={u.id} value={idx}>
                        {u.circled} {u.title}
                      </option>
                    ))}
                  </select>
                ) : category === 'particle_sentence' ? (
                  <select
                    value={selectedParticleSentenceIdx}
                    onChange={(e) => setSelectedParticleSentenceIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {PARTICLE_SENTENCE_UNITS.map((u, idx) => (
                      <option key={u.id} value={idx}>
                        {u.circled} {u.title}
                      </option>
                    ))}
                  </select>
                ) : category === 'summary_all' ? (
                  <select
                    value={selectedSummaryIdx}
                    onChange={(e) => setSelectedSummaryIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {summarySheetDescriptors.map((s, idx) => (
                      <option key={s.key} value={idx}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                ) : category === 'summary_compact_8' ? (
                  <select
                    value={selectedCompactSummaryIdx}
                    onChange={(e) => setSelectedCompactSummaryIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {compactSummarySheetDescriptors.map((s, idx) => (
                      <option key={s.key} value={idx}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    value={selectedWordbookIdx}
                    onChange={(e) => setSelectedWordbookIdx(Number(e.target.value))}
                    className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                  >
                    {wordbookSheetDescriptors.map((s, idx) => (
                      <option key={s.key} value={idx}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Language Selector */}
              <div className="space-y-1">
                <label className="block text-xs font-black text-slate-700">
                  {showMultiLangPicker
                    ? `번역 언어 선택 (1~3개 · 현재 ${customSelectedLangs.length}개)`
                    : category === 'summary_compact_8'
                    ? '표기 언어 (한국어·영어 전용)'
                    : showSingleLangPicker
                    ? '표기 번역 언어'
                    : '한국어 전용 학습지'}
                </label>
                {showMultiLangPicker ? (
                  <div className="flex flex-wrap gap-1">
                    {SUPPORTED_LANGUAGES.map((l) => {
                      const active = customSelectedLangs.includes(l.code);
                      return (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => handleToggleCustomLang(l.code)}
                          className={`px-2 py-1 rounded text-[11px] font-black border cursor-pointer transition-colors ${
                            active
                              ? 'bg-purple-700 text-white border-purple-700'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {l.flag} {l.singleChar}
                        </button>
                      );
                    })}
                  </div>
                ) : showSingleLangPicker ? (
                  category === 'summary_all' ? (
                    <select
                      value={singleLang}
                      onChange={(e) => setSingleLang(e.target.value as AdminSummaryLang)}
                      className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                    >
                      {ADMIN_SUMMARY_LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.flag} {l.labelKo} ({l.nativeName})
                        </option>
                      ))}
                    </select>
                  ) : category === 'summary_compact_8' ? (
                    <select
                      value={compactSummaryLang}
                      onChange={(e) => setSingleLang(e.target.value as AdminSummaryLang)}
                      className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                    >
                      {ADMIN_SUMMARY_LANGUAGES.filter((l) => l.code === 'ko' || l.code === 'en').map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.flag} {l.labelKo} ({l.nativeName})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={effectiveLearnerLang}
                      onChange={(e) => setSingleLang(e.target.value as AdminSummaryLang)}
                      className="w-full h-[38px] px-3 rounded-md border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                    >
                      {SUPPORTED_LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>
                          {l.flag} {l.labelKo} ({l.nativeName})
                        </option>
                      ))}
                    </select>
                  )
                ) : (
                  <div className="h-[38px] px-3 rounded-md border border-slate-200 bg-slate-50 text-xs font-bold text-slate-500 flex items-center">
                    한국어 획순 · 음절 전용 (언어 선택 불필요)
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons: PNG Save (1 sheet or .zip batch) + Real PDF Save + Native Printer Print */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-600">
                A4 가로 맞춤 출력 · 총{' '}
                <strong className="text-slate-900">{activePrintDescriptors.length}장</strong> 준비됨
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {activePrintDescriptors.length === 1 ? (
                  <button
                    type="button"
                    disabled={isExportBusy}
                    onClick={() =>
                      triggerPngDownload(activePrintDescriptors[0], buildSinglePngFileName())
                    }
                    className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
                  >
                    {pngBusy ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                    <span>PNG 저장 (1장)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isExportBusy}
                    onClick={() =>
                      triggerPngZipDownload(
                        activePrintDescriptors,
                        buildPngZipFileName(),
                        showSingleLangPicker ? activeExportLangTag : undefined
                      )
                    }
                    className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
                  >
                    {pngZipProgress ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Archive className="w-4 h-4" />
                    )}
                    <span>전체 PNG 저장 (.zip · {activePrintDescriptors.length}장)</span>
                  </button>
                )}

                <button
                  type="button"
                  disabled={isExportBusy}
                  onClick={() => triggerPdfDownload(activePrintDescriptors, buildPdfFileName())}
                  className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  {pdfProgress ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <FileDown className="w-4 h-4" />
                  )}
                  <span>PDF 저장 ({activePrintDescriptors.length}쪽)</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerPrinterDialog(activePrintDescriptors)}
                  className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>프린트로 인쇄 ({activePrintDescriptors.length}쪽)</span>
                </button>
              </div>
            </div>
          </section>

          {/* 3. Scaled Preview Cards (Show first 3 when 'all' to stay snappy) */}
          <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-800">
                미리보기 {activePrintDescriptors.length > 3 ? `(총 ${activePrintDescriptors.length}장 중 앞 3장 미리보기)` : `(${activePrintDescriptors.length}장)`}
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                저장/인쇄 시 전체 {activePrintDescriptors.length}장이 원본 A4 해상도로 출력됩니다
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {activePrintDescriptors.slice(0, 3).map((sheet) => (
                <div key={sheet.key} className="space-y-1.5">
                  <div className="text-xs font-black text-slate-700">{sheet.label}</div>
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-2 overflow-hidden">
                    <ScaledPreviewFrame targetWidth={sheet.targetWidth}>
                      {sheet.render(false)}
                    </ScaledPreviewFrame>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        /* ================================================================== */
        /* REFERENCE TAB: 총정리 6종 + 단어장 4종 전용 열람 · 오디오 · PDF/인쇄 */
        /* ================================================================== */
        <div className="space-y-4">
          <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>총정리표 (6종) · 통합 단어장 (4종) 전용 자료실</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>일반 메뉴에서 이관된 자료입니다. 아래 시트 내 단어·예문을 클릭하면 한국어 발음이 재생됩니다.</span>
                </p>
              </div>

              {/* Language Picker (한국어 원판 + 7개국어 번역) */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <select
                  value={singleLang}
                  onChange={(e) => {
                    playCutePop();
                    setSingleLang(e.target.value as AdminSummaryLang);
                  }}
                  className="bg-transparent text-xs font-black text-slate-900 focus:outline-none cursor-pointer"
                  title="총정리표 5종 및 교실·단어장 언어 선택 (한국어 원판 + 7개국어)"
                >
                  {ADMIN_SUMMARY_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.labelKo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary 6 Kinds Buttons + Compact 8p Edition Toggle (ko & en only) */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[11px] font-black text-rose-800">
                  {effectiveSummaryEdition === 'compact8'
                    ? '총정리표 6종 · 기존 압축판 8쪽 (한·영 전용: 자음·모음·받침·용언·조사 각 1쪽 / 교실 3쪽)'
                    : '총정리표 6종 · 확장판 13쪽 (말줄임 없음: 자음·모음·받침 각 1쪽 / 용언·조사 각 2쪽 / 교실 6쪽)'}
                </div>
                {isCompactAllowed && (
                  <div className="inline-flex items-center bg-rose-50 border border-rose-200 rounded-lg p-0.5 gap-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setSummaryEdition('expanded13');
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-black cursor-pointer transition-colors ${
                        effectiveSummaryEdition === 'expanded13'
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : 'text-rose-900 hover:bg-rose-100'
                      }`}
                    >
                      확장판 13쪽
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playCutePop();
                        setSummaryEdition('compact8');
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-black cursor-pointer transition-colors ${
                        effectiveSummaryEdition === 'compact8'
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'text-rose-900 hover:bg-rose-100'
                      }`}
                    >
                      기존 압축판 8쪽 (한·영)
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeSummaryRefItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setSelectedRefId(item.id);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-black border cursor-pointer transition-colors ${
                      selectedRefId === item.id
                        ? effectiveSummaryEdition === 'compact8'
                          ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                          : 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                        : 'bg-rose-50/60 hover:bg-rose-100 text-rose-950 border-rose-200'
                    }`}
                  >
                    {item.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Wordbook 4 Kinds Buttons */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-black text-teal-800">
                통합 단어장 4종 (A4 가로 4열 · 각 150단어 · 총 600어휘)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {REFERENCE_ITEMS.filter((r) => r.group === 'wordbook').map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setSelectedRefId(item.id);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-black border cursor-pointer transition-colors ${
                      selectedRefId === item.id
                        ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                        : 'bg-teal-50/70 hover:bg-teal-100 text-teal-950 border-teal-200'
                    }`}
                  >
                    {item.shortLabel}
                  </button>
                ))}
              </div>
            </div>

            {/* Export / Print Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <div>
                <div className="text-xs sm:text-sm font-black text-slate-900">
                  {activeRefMeta.title}
                </div>
                <div className="text-[11px] text-slate-500">{activeRefMeta.subtitle}</div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={isExportBusy}
                  onClick={() => {
                    const langTag = activeRefMeta.group === 'summary' ? singleLang : effectiveLearnerLang;
                    triggerPngDownload(
                      activeRefDescriptor,
                      `해볼한국어_${activeRefMeta.shortLabel.replace(/\s+/g, '_')}_${langTag}.png`
                    );
                  }}
                  className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  {pngBusy ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ImageIcon className="w-3.5 h-3.5" />
                  )}
                  <span>현재 표 PNG 저장</span>
                </button>

                <button
                  type="button"
                  disabled={isExportBusy}
                  onClick={() =>
                    activeRefMeta.group === 'summary'
                      ? triggerPngZipDownload(
                          activeSummarySheetPool,
                          effectiveSummaryEdition === 'compact8'
                            ? `해볼한국어_총정리표_6종_압축8쪽_PNG_${compactSummaryLang}.zip`
                            : `해볼한국어_총정리표_6종_전체13쪽_PNG_${singleLang}.zip`,
                          effectiveSummaryEdition === 'compact8' ? compactSummaryLang : singleLang
                        )
                      : triggerPngZipDownload(
                          wordbookSheetDescriptors,
                          `해볼한국어_통합단어장_4종_4열_PNG_${effectiveLearnerLang}.zip`,
                          effectiveLearnerLang
                        )
                  }
                  className="px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  {pngZipProgress ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Archive className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {activeRefMeta.group === 'summary'
                      ? effectiveSummaryEdition === 'compact8'
                        ? '총정리 8쪽 전체 PNG (.zip)'
                        : '총정리 13쪽 전체 PNG (.zip)'
                      : '단어장 4쪽 전체 PNG (.zip)'}
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isExportBusy}
                  onClick={() => {
                    const langTag = activeRefMeta.group === 'summary' ? singleLang : effectiveLearnerLang;
                    triggerPdfDownload(
                      [activeRefDescriptor],
                      `해볼한국어_${activeRefMeta.shortLabel.replace(/\s+/g, '_')}_${langTag}.pdf`
                    );
                  }}
                  className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>현재 표 PDF 저장</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerPrinterDialog([activeRefDescriptor])}
                  className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>현재 표 프린트</span>
                </button>

                <button
                  type="button"
                  disabled={isExportBusy}
                  onClick={() =>
                    activeRefMeta.group === 'summary'
                      ? triggerPdfDownload(
                          activeSummarySheetPool,
                          effectiveSummaryEdition === 'compact8'
                            ? `해볼한국어_총정리표_6종_압축8쪽_${compactSummaryLang}.pdf`
                            : `해볼한국어_총정리표_6종_전체13쪽_${singleLang}.pdf`
                        )
                      : triggerPdfDownload(
                          wordbookSheetDescriptors,
                          `해볼한국어_통합단어장_4종_4열_전체_${effectiveLearnerLang}.pdf`
                        )
                  }
                  className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {activeRefMeta.group === 'summary'
                      ? effectiveSummaryEdition === 'compact8'
                        ? '총정리 8쪽 전체 PDF'
                        : '총정리 13쪽 전체 PDF'
                      : '단어장 4쪽 전체 PDF'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    triggerPrinterDialog(
                      activeRefMeta.group === 'summary'
                        ? activeSummarySheetPool
                        : wordbookSheetDescriptors
                    )
                  }
                  className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>
                    {activeRefMeta.group === 'summary'
                      ? '총정리 전체 프린트'
                      : '단어장 전체 프린트'}
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* Interactive Full-Size Sheet Viewer (Click Words for Audio!) */}
          <div className="bg-white rounded-xl border border-slate-200 p-2 sm:p-4 shadow-2xs overflow-x-auto">
            <div className="w-max min-w-full flex justify-center">
              <div style={{ width: `${activeRefDescriptor.targetWidth}px` }} className="shrink-0">
                {activeRefDescriptor.render(true)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Off-screen unscaled render node ONLY while generating single PNG */}
      {pngRenderQueue && (
        <div
          aria-hidden="true"
          ref={offscreenPngRef}
          style={{
            position: 'fixed',
            left: '-18000px',
            top: 0,
            pointerEvents: 'none',
            zIndex: -1,
            width: `${pngRenderQueue.sheet.targetWidth}px`,
            backgroundColor: '#ffffff',
            padding: '4px',
          }}
        >
          {pngRenderQueue.sheet.render(false)}
        </div>
      )}

      {/* Off-screen unscaled render nodes ONLY while generating batch PNG .zip */}
      {pngZipRenderQueue && (
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
          {pngZipRenderQueue.sheets.map((sheet, idx) => (
            <div
              key={`pngzip-node-${sheet.key}`}
              ref={(el) => {
                offscreenPngZipRefs.current[idx] = el;
              }}
              style={{
                width: `${sheet.targetWidth}px`,
                backgroundColor: '#ffffff',
                padding: '4px',
              }}
            >
              {sheet.render(false)}
            </div>
          ))}
        </div>
      )}

      {/* Off-screen unscaled render nodes ONLY while generating PDF */}
      {pdfRenderQueue && (
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
          {pdfRenderQueue.sheets.map((sheet, idx) => (
            <div
              key={`pdf-node-${sheet.key}`}
              ref={(el) => {
                offscreenPdfRefs.current[idx] = el;
              }}
              style={{
                width: `${sheet.targetWidth}px`,
                backgroundColor: '#ffffff',
                padding: '4px',
              }}
            >
              {sheet.render(false)}
            </div>
          ))}
        </div>
      )}

      {/* Dedicated Body Portal for Native Printer Printing (Invisible on Screen, Sole Content on Print) */}
      {printSheetsQueue &&
        createPortal(
          <div id="admin-print-portal-root" className="hidden print:block">
            {printSheetsQueue.map((sheet) => (
              <div key={`print-${sheet.key}`} className="admin-print-sheet-item">
                {sheet.render(false)}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};
