import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Globe,
  ChevronDown,
  LayoutGrid,
  Printer,
  Layers,
  ArrowUp,
  BookOpen
} from 'lucide-react';
import {
  VocabularyItem,
  SupportedLanguage,
  LearningTrack,
  LearningMethod,
  SUPPORTED_LANGUAGES,
  SUB_MENU_LABELS
} from '../types';
import { UiLanguage, SUBTAB_UI, NAV_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { PrintableWorksheetPage } from './PrintableWorksheetPage';
import { PrintableWordWorksheetPage } from './PrintableWordWorksheetPage';
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
  VowelsStrokeWorksheetPage6
} from './PrintableJamoSheets';
import { BasicLetterWorksheetPage } from './PrintableJamoSheets';
import { BASIC_LETTERS_DATA } from '../data/basicLettersData';
import { BatchimWorksheetPage, BATCHIM_PAGES_DATA } from './PrintableBatchimSheet';
import { playCutePop } from '../utils/audio';
import { VerbConjugationWorksheetPage } from './VerbConjugationWorksheetPage';
import { VERB_UNIT_META } from './VerbConjugationSection';
import { ParticleWorksheetPage } from './ParticleWorksheetPage';
import { PARTICLE_UNIT_META } from '../data/particleWorksheetData';
import { OverviewGridModal, OverviewCardItem, OverviewThemeColor } from './OverviewGridModal';
import { CompactUnitSelectButton } from './CompactUnitSelectButton';
import { DesktopControlBar } from './DesktopControlBar';
import { MobileScaledWorksheetWrapper } from './MobileScaledWorksheetWrapper';
import {
  JollaHiddenLettersSheet,
  JollaTerritoryGameSheet,
  JollaMazeGameSheet,
  JollaBingoGameSheet,
} from './HangeulJollaQuizAndGameSheets';
import { ChapterCoverSheet, ChapterTocSheet } from './ChapterCoverTocSheets';
import {
  HANGEUL_EXAM_LESSONS,
  HANGEUL_EXAM_PARTS,
  HangeulExamPartId,
  HangeulExamSheet,
} from './HangeulExam20Sheets';
import {
  VERB_EXAM_LESSONS,
  VerbExamSheet,
} from './VerbExam30Sheets';
import {
  PARTICLE_EXAM_LESSONS,
  ParticleExamSheet,
} from './ParticleExam6Sheets';
import {
  CLASSROOM_EXAM_LESSONS,
  ClassroomExamSheet,
} from './ClassroomExam6Sheets';
import {
  CLASSROOM_PLAY_SHEETS_META,
  ClassroomPlayDraftSheet,
} from './ClassroomPlayDraft5Sheets';
import {
  VERB_PLAY_SHEETS_META,
  VerbPlayDraftSheet,
} from './VerbPlayDraft5Sheets';
import {
  PARTICLE_PLAY_SHEETS_META,
  ParticlePlayDraftSheet,
} from './ParticlePlayDraft5Sheets';
import {
  JollaJamoTerritoryBoardSheet,
  JollaConsonantBingoSheet,
  JollaVowelBingoSheet,
  JollaMountainStampSheet,
  JollaDiceFactorySheet,
  JollaHeroAwardCouponSheet,
} from './JollaPrintGameMotivationSheets';

interface StudySectionProps {
  vocabulary: VocabularyItem[];
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  selectedChapter?: number;
  onSelectChapter?: (ch: number) => void;
  selectedHangeulGroupId?: string;
  hangeulJumpTrigger?: number;
  selectedVerbUnitIndex?: number;
  selectedParticleUnitIndex?: number;
  particleJumpTrigger?: number;
  sectionType?: LearningTrack;
  activeMethod?: LearningMethod;
  onSelectMethod?: (method: LearningMethod) => void;
  isMenuCollapsed?: boolean;
}

const HANGEUL_GROUP_TO_SHEET: Record<
  string,
  { mode: 'jamo' | 'basic' | 'batchim'; targetIdx: number }
> = {
  basic_consonants: { mode: 'jamo', targetIdx: 4 },
  double_consonants: { mode: 'jamo', targetIdx: 8 },
  basic_vowels: { mode: 'jamo', targetIdx: 9 },
  compound_vowels: { mode: 'jamo', targetIdx: 12 },
  basic_syllables_p1: { mode: 'basic', targetIdx: 0 },
  basic_syllables_p2: { mode: 'basic', targetIdx: 6 },
  basic_syllables_p3: { mode: 'basic', targetIdx: 10 },
  basic_syllables_p4: { mode: 'basic', targetIdx: 14 },
  basic_syllables_p5: { mode: 'basic', targetIdx: 18 },
  batchim_p1: { mode: 'batchim', targetIdx: 0 },
  batchim_p2: { mode: 'batchim', targetIdx: 7 },
  batchim_p3: { mode: 'batchim', targetIdx: 10 },
};

export type StudyMode =
  | 'cards'
  | 'writing'
  | 'quiz'
  | 'classroomExam'
  | 'classroomPlay'
  | 'jamo'
  | 'basic'
  | 'batchim'
  | 'hangeulExam'
  | 'jollaPlay'
  | 'words'
  | 'verbExam'
  | 'verbPlay'
  | 'particle'
  | 'particleExam'
  | 'particlePlay';

const JAMO_SHEET_ITEMS = [
  { id: 0, title: '① 자음 쓰기', subtitle: '기초 자음 14자 8회 따라쓰기', previewMain: 'ㄱㄴㄷㄹ', previewChips: ['ㄱ~ㅎ', '14자', '8회'] },
  { id: 1, title: '② 모음 쓰기', subtitle: '기본 모음 10자 & 복합 모음 11자', previewMain: 'ㅏㅑㅓㅕ', previewChips: ['기본10', '복합11', '♡'] },
  { id: 2, title: '③ 자음·모음표 따라 쓰기', subtitle: '14자음 × 10모음 140글자', previewMain: '가나다라', previewChips: ['140글자', '따라쓰기'] },
  { id: 3, title: '④ 자음·모음표 스스로 쓰기', subtitle: '한글 음절 조합표 빈칸 연습', previewMain: 'ㄱ+ㅏ', previewChips: ['조합표', '빈칸쓰기'] },
  { id: 4, title: '⑤ 자음 획순 따라 쓰기 ㄱ~ㄹ', subtitle: '획순별 색상 본보기 & 따라쓰기', previewMain: 'ㄱ ㄴ ㄷ ㄹ', previewChips: ['ㄱ', 'ㄴ', 'ㄷ'] },
  { id: 5, title: '⑥ 자음 획순 따라 쓰기 ㅁ~ㅇ', subtitle: '획순별 색상 본보기 & 따라쓰기', previewMain: 'ㅁ ㅂ ㅅ ㅇ', previewChips: ['ㅁ', 'ㅂ', 'ㅅ'] },
  { id: 6, title: '⑦ 자음 획순 따라 쓰기 ㅈ~ㅋ', subtitle: '획순별 색상 본보기 & 따라쓰기', previewMain: 'ㅈ ㅊ ㅋ', previewChips: ['ㅈ', 'ㅊ', 'ㅋ'] },
  { id: 7, title: '⑧ 자음 획순 따라 쓰기 ㅌ~ㅎ', subtitle: '획순별 색상 본보기 & 따라쓰기', previewMain: 'ㅌ ㅍ ㅎ', previewChips: ['ㅌ', 'ㅍ', 'ㅎ'] },
  { id: 8, title: '⑨ 쌍자음 획순 따라 쓰기 ㄲ~ㅉ', subtitle: '획순별 색상 본보기 & 따라쓰기', previewMain: 'ㄲㄸㅃㅆㅉ', previewChips: ['ㄲ', 'ㄸ', 'ㅃ'] },
  { id: 9, title: '⑩ 모음 획순 따라 쓰기 ㅏ·ㅑ·ㅓ·ㅕ', subtitle: '기본 세로 모음 획순 연습', previewMain: 'ㅏ ㅑ ㅓ ㅕ', previewChips: ['ㅏ', 'ㅑ', 'ㅓ'] },
  { id: 10, title: '⑪ 모음 획순 따라 쓰기 ㅗ·ㅛ·ㅜ·ㅠ', subtitle: '기본 가로 모음 획순 연습', previewMain: 'ㅗ ㅛ ㅜ ㅠ', previewChips: ['ㅗ', 'ㅛ', 'ㅜ'] },
  { id: 11, title: '⑫ 모음 획순 따라 쓰기 ㅡ·ㅣ·ㅢ', subtitle: '천·지·인 기본 및 결합 모음', previewMain: 'ㅡ ㅣ ㅢ', previewChips: ['ㅡ', 'ㅣ', 'ㅢ'] },
  { id: 12, title: '⑬ 모음 획순 따라 쓰기 ㅐ·ㅒ·ㅔ·ㅖ', subtitle: 'ㅣ 결합 이중모음 4자', previewMain: 'ㅐ ㅒ ㅔ ㅖ', previewChips: ['ㅐ', 'ㅒ', 'ㅔ'] },
  { id: 13, title: '⑭ 모음 획순 따라 쓰기 ㅘ·ㅝ·ㅟ', subtitle: '소리 결합 이중모음 3자', previewMain: 'ㅘ ㅝ ㅟ', previewChips: ['ㅘ', 'ㅝ', 'ㅟ'] },
  { id: 14, title: '⑮ 모음 획순 따라 쓰기 ㅚ·ㅙ·ㅞ', subtitle: '발음 같은 삼총사 3자', previewMain: 'ㅚ ㅙ ㅞ', previewChips: ['ㅚ', 'ㅙ', 'ㅞ'] },
];

const JAMO_SECTION_OPTIONS = [
  { id: 'chart', label: '1~4쪽 자음모음표', targetSheet: 0 },
  { id: 'consonants', label: '5~9쪽 자음', targetSheet: 4 },
  { id: 'vowels', label: '10~15쪽 모음', targetSheet: 9 },
];

const BASIC_SECTION_OPTIONS = [
  { id: 'basic_1_6', label: '1~6쪽 ㅏㅓㅗㅜㅡㅣ', targetSheet: 0 },
  { id: 'basic_7_10', label: '7~10쪽 ㅑㅕㅛㅠ', targetSheet: 6 },
  { id: 'basic_11_14', label: '11~14쪽 ㅐㅔㅒㅖ', targetSheet: 10 },
  { id: 'basic_15_18', label: '15~18쪽 ㅘㅝㅚㅟ', targetSheet: 14 },
  { id: 'basic_19_21', label: '19~21쪽 ㅙㅞㅢ', targetSheet: 18 },
];

const BATCHIM_SECTION_OPTIONS = [
  { id: 'batchim_1_7', label: '1~7쪽 대표 받침 (ㅁ, ㅂ, ㅇ, ㄱ, ㄴ, ㄹ, ㄷ)', targetSheet: 0 },
  { id: 'batchim_8_11', label: '8~11쪽 받침 가족 (ㄱ/ㅂ/ㄷ 가족)', targetSheet: 7 },
  { id: 'batchim_12', label: '12쪽 겹받침 ① 앞 자음 발음 1 (ㄳ, ㄵ, ㄼ)', targetSheet: 11 },
  { id: 'batchim_13', label: '13쪽 겹받침 ② 앞 자음 발음 2 (ㄽ, ㄾ, ㅄ)', targetSheet: 12 },
  { id: 'batchim_14', label: '14쪽 겹받침 ③ 뒤 자음 발음 (ㄺ, ㄻ, ㄿ)', targetSheet: 13 },
  { id: 'batchim_15', label: '15쪽 겹받침 ④ ㅎ이 있는 받침 (ㄶ, ㅀ)', targetSheet: 14 },
];

const HANGEUL_EXAM_OPTIONS = HANGEUL_EXAM_LESSONS.map((lesson) => ({
  id: lesson.id,
  label: lesson.dropdownLabel,
  targetSheet: lesson.globalIndex,
}));

const VERB_EXAM_OPTIONS = VERB_EXAM_LESSONS.map((lesson) => ({
  id: lesson.id,
  label: lesson.dropdownLabel,
  targetSheet: lesson.globalIndex,
}));

const PARTICLE_EXAM_OPTIONS = PARTICLE_EXAM_LESSONS.map((lesson) => ({
  id: lesson.id,
  label: lesson.dropdownLabel,
  targetSheet: lesson.globalIndex,
}));

const CLASSROOM_EXAM_OPTIONS = CLASSROOM_EXAM_LESSONS.map((lesson) => ({
  id: lesson.id,
  label: lesson.dropdownLabel,
  targetSheet: lesson.globalIndex,
}));

const CLASSROOM_PLAY_OPTIONS = CLASSROOM_PLAY_SHEETS_META.map((sheet) => ({
  id: sheet.id,
  label: sheet.dropdownLabel,
  targetSheet: sheet.idx,
}));

const VERB_PLAY_OPTIONS = VERB_PLAY_SHEETS_META.map((sheet) => ({
  id: sheet.id,
  label: sheet.dropdownLabel,
  targetSheet: sheet.idx,
}));

const PARTICLE_PLAY_OPTIONS = PARTICLE_PLAY_SHEETS_META.map((sheet) => ({
  id: sheet.id,
  label: sheet.dropdownLabel,
  targetSheet: sheet.idx,
}));

const JOLLA_PLAY_OPTIONS = [
  { id: 'jolla_jamo_territory', label: '1쪽 자음·모음 땅 차지하기 (졸라 보드게임)', targetSheet: 0 },
  { id: 'jolla_consonant_bingo', label: '2쪽 졸라맨 자음 빙고게임 (2판 1장)', targetSheet: 1 },
  { id: 'jolla_vowel_bingo', label: '3쪽 졸라맨 모음 빙고게임 (2판 1장)', targetSheet: 2 },
  { id: 'jolla_mountain_stamp', label: '4쪽 동기부여 ① 한글산 20칸 도장판', targetSheet: 3 },
  { id: 'jolla_dice_factory', label: '5쪽 동기부여 ② 주사위 글자 공장', targetSheet: 4 },
  { id: 'jolla_hero_award', label: '6쪽 동기부여 ③ 한글 영웅 상장 & 쿠폰', targetSheet: 5 },
  { id: 'jolla_game_1', label: '7쪽 졸라놀이 ④ 숨은 졸라맨 찾기', targetSheet: 6 },
  { id: 'jolla_game_2', label: '8쪽 졸라놀이 ⑤ 기본글자 땅따먹기', targetSheet: 7 },
  { id: 'jolla_game_3', label: '9쪽 졸라놀이 ⑥ 낱말 미로 탈출', targetSheet: 8 },
  { id: 'jolla_game_4', label: '10쪽 졸라놀이 ⑦ 자모·낱말 빙고', targetSheet: 9 },
];

const JOLLA_PLAY_ITEMS = [
  { id: 0, title: '① 자음·모음 땅 차지하기 (졸라 보드게임)', subtitle: '자음 14 + 모음 10 = 24칸 주사위 보드게임 · 규칙·점수표 포함', previewMain: '🎲 🚩', previewChips: ['자음14+모음10', '보드게임', 'A4가로'] },
  { id: 1, title: '② 졸라맨 자음 빙고게임 (2판 1장)', subtitle: '기본자음 14자 전용 3×3 빙고 · 점선 절취선 짝꿍용', previewMain: 'ㄱ~ㅎ', previewChips: ['자음빙고', '2판1장', '절취형'] },
  { id: 2, title: '③ 졸라맨 모음 빙고게임 (2판 1장)', subtitle: '기본모음 10자(+ㅐ,ㅔ) 전용 3×3 빙고 · 점선 절취선 짝꿍용', previewMain: 'ㅏ~ㅣ', previewChips: ['모음빙고', '2판1장', '절취형'] },
  { id: 3, title: '④ [동기부여 ①] 한글산 20칸 등산 도장판', subtitle: '학습지 완료마다 스티커·도장 쾅! 4단계 보상 약속표', previewMain: '🏔️ 20', previewChips: ['도장판', '동기부여', '보상약속'] },
  { id: 4, title: '⑤ [동기부여 ②] 주사위 글자 공장 챌린지', subtitle: '자음 주사위 + 모음 주사위 합체 쓰기 12칸 & 낱말 보너스', previewMain: '🏭 🎲', previewChips: ['글자합체', '주사위', '쓰기놀이'] },
  { id: 5, title: '⑥ [동기부여 ③] 한글 영웅 상장 & 쿠폰 3종', subtitle: '미션 체크 상장 + 점선 절취 미니 칭찬 쿠폰 3장', previewMain: '🏅 🎁', previewChips: ['상장', '칭찬쿠폰', '절취형'] },
  { id: 6, title: '⑦ 숨은 졸라한글맨 찾기', subtitle: '자모 크기 미니 졸라맨 7명 숨바꼭질 놀이판', previewMain: '🕵️ 7명', previewChips: ['숨은그림', '미니졸라맨', '자음모음'] },
  { id: 7, title: '⑧ 기본글자 땅따먹기', subtitle: '2인 주사위 게임 · 기본글자 읽고 내 깃발 색칠!', previewMain: '🎲 가사', previewChips: ['2인게임', '기본글자', '특수칸'] },
  { id: 8, title: '⑨ 졸라한글맨 낱말 미로 탈출', subtitle: '사자→버터→포도→구두→우유→가지→사과 미로', previewMain: '🌀 🍎', previewChips: ['미로탈출', '7낱말', '함정졸라맨'] },
  { id: 9, title: '⑩ 자모·낱말 3×3 초스피드 빙고', subtitle: 'A판 자음모음 / B판 기본글자 낱말 2라운드 빙고', previewMain: '3×3', previewChips: ['2판1장', '공짜칸★', '빙고'] },
];

const WORDS_SECTION_OPTIONS = [
  { id: 'words_unit1', label: '① 현재형 (-아요)', targetSheet: 0 },
  { id: 'words_unit2', label: '② 현재형 (-어요)', targetSheet: 1 },
  { id: 'words_unit3', label: '③ 현재형 (-해요)', targetSheet: 2 },
  { id: 'words_unit4', label: '④ 현재형 (-아요 ★)', targetSheet: 3 },
  { id: 'words_unit5', label: '⑤ 현재형 (-어요 ★)', targetSheet: 4 },
  { id: 'words_unit6', label: '⑥ 과거형 (-았어요)', targetSheet: 5 },
  { id: 'words_unit7', label: '⑦ 과거형 (-었어요)', targetSheet: 6 },
  { id: 'words_unit8', label: '⑧ 과거형 (-했어요)', targetSheet: 7 },
  { id: 'words_unit9', label: '⑨ 과거형 (-았어요 ★)', targetSheet: 8 },
  { id: 'words_unit10', label: '⑩ 과거형 (-었어요 ★)', targetSheet: 9 },
  { id: 'words_unit11', label: '⑪ 부정1 (안 [용언], 못 [용언])', targetSheet: 10 },
  { id: 'words_unit12', label: '⑫ 부정2 ([명사] 안 해요, [명사] 못 해요)', targetSheet: 11 },
  { id: 'words_unit13', label: '⑬ 희망 (-고 싶어요)', targetSheet: 12 },
  { id: 'words_unit14', label: '⑭ 진행 (-고 있어요)', targetSheet: 13 },
  { id: 'words_unit15', label: '⑮ 요청 (-세요, -으세요)', targetSheet: 14 },
  { id: 'words_unit16', label: '⑯ 금지 (-지 마세요)', targetSheet: 15 },
  { id: 'words_unit17', label: '⑰ 미래 (-ㄹ 거예요, -을 거예요)', targetSheet: 16 },
  { id: 'words_unit18', label: '⑱ 부탁 (-아 주세요, -어 주세요, -해 주세요)', targetSheet: 17 },
  { id: 'words_unit19', label: '⑲ 허락 (-아도 돼요?, -어도 돼요?, -해도 돼요?)', targetSheet: 18 },
  { id: 'words_unit20', label: '⑳ 의무 (-아야 돼요, -어야 돼요, -해야 돼요)', targetSheet: 19 },
  { id: 'words_unit21', label: '㉑ 능력 (-ㄹ(을) 수 있어요, -ㄹ(을) 수 없어요)', targetSheet: 20 },
  { id: 'words_unit22', label: '㉒ 제안 (-ㄹ까요?, -을까요?)', targetSheet: 21 },
  { id: 'words_unit23', label: '㉓ 나열 (-고)', targetSheet: 22 },
  { id: 'words_unit24', label: '㉔ 대조 (-지만)', targetSheet: 23 },
  { id: 'words_unit25', label: '㉕ 이유 (-아서, -어서, -해서)', targetSheet: 24 },
  { id: 'words_unit26', label: '㉖ 조건 (-면, -으면)', targetSheet: 25 },
  { id: 'words_unit27', label: '㉗ 시간 (-ㄹ 때, -을 때)', targetSheet: 26 },
  { id: 'words_unit28', label: '㉘ 목적 (-러 가요, -으러 가요 / -러 와요, -으러 와요)', targetSheet: 27 },
  { id: 'words_unit29', label: '㉙ 순서 (-기 전에, -ㄴ 후에, -은 후에)', targetSheet: 28 },
  { id: 'words_unit30', label: '㉚ 경험 (-아 봤어요, -어 봤어요, -해 봤어요)', targetSheet: 29 },
];

const PARTICLE_COMBINATION_UNITS = PARTICLE_UNIT_META;
const PARTICLE_SENTENCE_UNITS = PARTICLE_UNIT_META.filter((u) => u.layoutType === 'rows5');

const PARTICLE_COMBINATION_OPTIONS = PARTICLE_COMBINATION_UNITS.map((u, idx) => ({
  id: `particle_${u.id}`,
  label: `${u.circled} ${u.title}`,
  targetSheet: idx,
}));

const PARTICLE_SENTENCE_OPTIONS = PARTICLE_SENTENCE_UNITS.map((u, idx) => ({
  id: `particle_${u.id}`,
  label: `${u.circled} ${u.title}`,
  targetSheet: idx,
}));

const BASIC_SHEET_ITEMS = BASIC_LETTERS_DATA.map((item, idx) => ({
  id: idx,
  title: `${item.circledNumber} ${item.vowel}와 만나요 (Build Syllables with ${item.vowel})`,
  subtitle: `자음(${item.cards.map(c => c.consonant).join(', ')}) + 모음(${item.vowel}) 결합 및 단어 '${item.wordCard.word}' 쓰기`
}));


const STUDY_SUB_LABELS: Record<SupportedLanguage, {
  cards: string;
  writing: string;
  quiz: string;
  wordbook: string;
  jamo: string;
  basic: string;
  batchim: string;
}> = {
  en: {
    cards: 'Flashcards',
    writing: 'Tracing',
    quiz: 'Dictation',
    wordbook: 'Word List',
    jamo: 'Letters',
    basic: 'Syllables',
    batchim: 'Final Consonants'
  },
  vi: {
    cards: 'Thẻ từ vựng',
    writing: 'Tập viết',
    quiz: 'Chính tả',
    wordbook: 'Sổ từ vựng',
    jamo: 'Bảng chữ cái',
    basic: 'Ghép chữ cơ bản',
    batchim: 'Phụ âm cuối'
  },
  bn: {
    cards: 'শব্দকার্ড',
    writing: 'লেখা অভ্যাস',
    quiz: 'শ্রুতলিপি',
    wordbook: 'শব্দতালিকা',
    jamo: 'বর্ণমালা',
    basic: 'মৌলিক অক্ষর',
    batchim: 'যুক্তবর্ণ'
  },
  zh: {
    cards: '生词卡',
    writing: '描红书写',
    quiz: '听写测试',
    wordbook: '单词表',
    jamo: '字母表',
    basic: '基础字',
    batchim: '收音'
  },
  ru: {
    cards: 'Карточки',
    writing: 'Прописи',
    quiz: 'Диктант',
    wordbook: 'Словарь',
    jamo: 'Буквы',
    basic: 'Слоги',
    batchim: 'Патчим'
  },
  ja: {
    cards: '単語カード',
    writing: 'なぞり書き',
    quiz: '書き取り',
    wordbook: '単語帳',
    jamo: '字母',
    basic: '基本文字',
    batchim: 'パッチム'
  },
  mn: {
    cards: 'Үгийн карт',
    writing: 'Дагаж бичих',
    quiz: 'Цээж бичиг',
    wordbook: 'Үгсийн сан',
    jamo: 'Үсэг',
    basic: 'Үндсэн үсэг',
    batchim: 'Дэвсгэр үсэг'
  }
};

export const WORKSHEET_LANG_SUBTITLES: Record<SupportedLanguage, string> = {
  en: 'Select Worksheet Languages · 1~3',
  vi: 'Chọn ngôn ngữ học tập · 1~3',
  bn: 'ওয়ার্কশীটের ভাষা নির্বাচন করুন · ১~৩',
  zh: '选择练习册显示语言 · 1~3',
  ru: 'Выберите языки для листов · 1~3',
  ja: '学習プリントの言語を選択 · 1~3',
  mn: 'Дасгалын хэл сонгох · 1~3'
};

export const StudySection: React.FC<StudySectionProps> = ({
  vocabulary,
  lang,
  uiLang = 'ko',
  selectedChapter: propSelectedChapter,
  onSelectChapter,
  selectedHangeulGroupId,
  hangeulJumpTrigger,
  selectedVerbUnitIndex,
  selectedParticleUnitIndex,
  particleJumpTrigger,
  sectionType = 'classroom',
  activeMethod = 'worksheet',
  onSelectMethod,
  isMenuCollapsed = false,
}) => {
  const [studyMode, setStudyMode] = useState<StudyMode>(
    sectionType === 'hangeul'
      ? 'jamo'
      : sectionType === 'verb'
      ? 'words'
      : sectionType === 'particle'
      ? 'particle'
      : 'cards'
  );
  const [selectedJumpCh, setSelectedJumpCh] = useState<number>(propSelectedChapter ?? 0);
  const [selectedJamoSection, setSelectedJamoSection] = useState<string>('chart');
  const [selectedBasicSection, setSelectedBasicSection] = useState<string>('basic_1_6');
  const [selectedBatchimSection, setSelectedBatchimSection] = useState<string>('batchim_1_7');
  const [selectedHangeulExamSection, setSelectedHangeulExamSection] = useState<string>(
    HANGEUL_EXAM_OPTIONS[0]?.id || 'exam_jamo_1'
  );
  const [examPartFilter, setExamPartFilter] = useState<'all' | HangeulExamPartId>('all');
  const [selectedJollaPlaySection, setSelectedJollaPlaySection] = useState<string>('jolla_jamo_territory');
  const [selectedWordsSection, setSelectedWordsSection] = useState<string>('words_unit1');
  const [selectedVerbExamSection, setSelectedVerbExamSection] = useState<string>(
    VERB_EXAM_OPTIONS[0]?.id || 'verb_exam_1'
  );
  const [selectedParticleExamSection, setSelectedParticleExamSection] = useState<string>(
    PARTICLE_EXAM_OPTIONS[0]?.id || 'particle_exam_1'
  );
  const [selectedClassroomExamSection, setSelectedClassroomExamSection] = useState<string>(
    CLASSROOM_EXAM_OPTIONS[0]?.id || 'classroom_exam_1'
  );
  const [selectedClassroomPlaySection, setSelectedClassroomPlaySection] = useState<string>(
    CLASSROOM_PLAY_OPTIONS[0]?.id || 'classroom_play_1'
  );
  const [selectedVerbPlaySection, setSelectedVerbPlaySection] = useState<string>(
    VERB_PLAY_OPTIONS[0]?.id || 'verb_play_1'
  );
  const [selectedParticlePlaySection, setSelectedParticlePlaySection] = useState<string>(
    PARTICLE_PLAY_OPTIONS[0]?.id || 'particle_play_1'
  );
  const [particleSubMode, setParticleSubMode] = useState<'combination' | 'sentence'>('combination');
  const [selectedParticleSection, setSelectedParticleSection] = useState<string>(
    PARTICLE_COMBINATION_OPTIONS[0]?.id || 'particle_unit1'
  );
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const isInternalJumpRef = useRef(false);
  const prevVerbUnitIndexRef = useRef<number | undefined>(selectedVerbUnitIndex);
  const prevHangeulJumpTriggerRef = useRef<number | undefined>(hangeulJumpTrigger);
  const prevParticleJumpTriggerRef = useRef<number | undefined>(particleJumpTrigger);
  const skipNextModeResetRef = useRef(false);
  const subLabels = SUB_MENU_LABELS[lang] || SUB_MENU_LABELS.en;

  // Sync studyMode when sectionType prop changes
  useEffect(() => {
    if (sectionType === 'hangeul') {
      if (
        hangeulJumpTrigger !== undefined &&
        hangeulJumpTrigger !== prevHangeulJumpTriggerRef.current &&
        selectedHangeulGroupId &&
        HANGEUL_GROUP_TO_SHEET[selectedHangeulGroupId]
      ) {
        return;
      }
      if (
        studyMode !== 'jamo' &&
        studyMode !== 'basic' &&
        studyMode !== 'batchim' &&
        studyMode !== 'hangeulExam' &&
        studyMode !== 'jollaPlay'
      ) {
        setStudyMode('jamo');
      }
    } else if (sectionType === 'verb') {
      if (studyMode !== 'words' && studyMode !== 'verbExam' && studyMode !== 'verbPlay') {
        setStudyMode('words');
      }
    } else if (sectionType === 'particle') {
      if (studyMode !== 'particle' && studyMode !== 'particleExam' && studyMode !== 'particlePlay') {
        setStudyMode('particle');
      }
    } else {
      if (
        studyMode !== 'cards' &&
        studyMode !== 'writing' &&
        studyMode !== 'quiz' &&
        studyMode !== 'classroomExam' &&
        studyMode !== 'classroomPlay'
      ) {
        setStudyMode('cards');
      }
    }
  }, [sectionType]);

  // 1~3개 다국어 커스텀 선택 상태 (그림카드, 쓰기학습지, 테스트지 공통 - 기본 영어, 베트남어 2개 선택)
  const [customSelectedLangs, setCustomSelectedLangs] = useState<SupportedLanguage[]>(['en', 'vi']);
  const [isCustomLangOpen, setIsCustomLangOpen] = useState(false);

  // FIFO auto-rotation language toggle (최대 3개 대기열 순환, 최소 1개 유지)
  const handleToggleCustomLang = (code: SupportedLanguage) => {
    playCutePop();
    setCustomSelectedLangs(prev => {
      const isSelected = prev.includes(code);
      if (isSelected) {
        if (prev.length > 1) {
          return prev.filter(c => c !== code);
        }
        return prev;
      } else {
        if (prev.length < 3) {
          return [...prev, code];
        } else {
          return [...prev.slice(1), code];
        }
      }
    });
  };

  // 단원별 3종세트 (그림카드 + 쓰기학습지 + 테스트지) 일괄 인쇄 상태
  const [isPrintingTripleSet, setIsPrintingTripleSet] = useState(false);

  // 챕터 하단 [표지 · 차례] 개별/묶음 인쇄 상태
  const [extraPrintTarget, setExtraPrintTarget] = useState<
    null | 'all-extras' | 'cover' | 'toc'
  >(null);

  // 한글 시험 20강 / 졸라 놀이 10종 중 1장 단독 인쇄 상태
  const [singleSheetPrintKey, setSingleSheetPrintKey] = useState<string | null>(null);

  // Sync propSelectedChapter with selectedJumpCh when changed externally
  useEffect(() => {
    if (propSelectedChapter !== undefined && sectionType === 'classroom') {
      if (isInternalJumpRef.current) {
        isInternalJumpRef.current = false;
        return;
      }
      setSelectedJumpCh(propSelectedChapter);
      if (studyMode !== 'cards' && studyMode !== 'writing' && studyMode !== 'quiz') {
        setStudyMode('cards');
      }
      setTimeout(() => {
        const targetId = `study-sheet-ch-${propSelectedChapter}`;
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  }, [propSelectedChapter, sectionType]);

  // Sync selectedVerbUnitIndex when changed from sidebar in verb > worksheet
  useEffect(() => {
    if (prevVerbUnitIndexRef.current === selectedVerbUnitIndex) {
      return;
    }
    prevVerbUnitIndexRef.current = selectedVerbUnitIndex;
    if (sectionType === 'verb' && selectedVerbUnitIndex !== undefined && selectedVerbUnitIndex >= 0) {
      setStudyMode('words');
      setSelectedJumpCh(selectedVerbUnitIndex);
      const opt = WORDS_SECTION_OPTIONS[selectedVerbUnitIndex];
      if (opt) setSelectedWordsSection(opt.id);
      setTimeout(() => {
        const element = document.getElementById(`study-words-sheet-${selectedVerbUnitIndex}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }
  }, [selectedVerbUnitIndex, sectionType]);

  // Sync selectedParticleUnitIndex when clicked from sidebar in particle > worksheet
  useEffect(() => {
    if (particleJumpTrigger === undefined || particleJumpTrigger === prevParticleJumpTriggerRef.current) {
      return;
    }
    prevParticleJumpTriggerRef.current = particleJumpTrigger;
    if (sectionType === 'particle' && selectedParticleUnitIndex !== undefined && selectedParticleUnitIndex >= 0) {
      const targetUnit = PARTICLE_UNIT_META[selectedParticleUnitIndex];
      const nextSubMode: 'combination' | 'sentence' =
        particleSubMode === 'sentence' && targetUnit?.layoutType === 'rows5'
          ? 'sentence'
          : 'combination';
      const targetUnits =
        nextSubMode === 'sentence' ? PARTICLE_SENTENCE_UNITS : PARTICLE_COMBINATION_UNITS;
      const targetOpts =
        nextSubMode === 'sentence' ? PARTICLE_SENTENCE_OPTIONS : PARTICLE_COMBINATION_OPTIONS;
      const subIdx = Math.max(
        0,
        targetUnits.findIndex((u) => u.id === targetUnit?.id)
      );

      setStudyMode('particle');
      setParticleSubMode(nextSubMode);
      setSelectedJumpCh(subIdx);
      const opt = targetOpts[subIdx];
      if (opt) setSelectedParticleSection(opt.id);
      setTimeout(() => {
        const element = document.getElementById(`study-particle-sheet-${subIdx}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 90);
    }
  }, [particleJumpTrigger, selectedParticleUnitIndex, sectionType]);

  // Sync selectedHangeulGroupId when clicked from sidebar in hangeul > worksheet
  useEffect(() => {
    if (hangeulJumpTrigger === undefined || hangeulJumpTrigger === prevHangeulJumpTriggerRef.current) {
      return;
    }
    prevHangeulJumpTriggerRef.current = hangeulJumpTrigger;
    if (sectionType !== 'hangeul' || !selectedHangeulGroupId) return;

    const mapping = HANGEUL_GROUP_TO_SHEET[selectedHangeulGroupId];
    if (!mapping) return;

    const { mode, targetIdx } = mapping;
    if (studyMode !== mode) {
      skipNextModeResetRef.current = true;
      setStudyMode(mode);
    }
    setSelectedJumpCh(targetIdx);

    if (mode === 'jamo') {
      const opt = [...JAMO_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= targetIdx);
      if (opt) setSelectedJamoSection(opt.id);
    } else if (mode === 'basic') {
      const opt = [...BASIC_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= targetIdx);
      if (opt) setSelectedBasicSection(opt.id);
    } else if (mode === 'batchim') {
      const opt = [...BATCHIM_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= targetIdx);
      if (opt) setSelectedBatchimSection(opt.id);
    }

    const targetId = `study-${mode}-sheet-${targetIdx}`;
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 90);
  }, [hangeulJumpTrigger, selectedHangeulGroupId, sectionType]);

  // 현재 선택된 단원 객체
  const currentChapterObj = CHAPTER_LIST.find(c => c.ch === selectedJumpCh) || CHAPTER_LIST[0];

  // Reset jump index when switching mode
  useEffect(() => {
    if (skipNextModeResetRef.current) {
      skipNextModeResetRef.current = false;
      return;
    }
    if (propSelectedChapter !== undefined && (studyMode === 'cards' || studyMode === 'writing' || studyMode === 'quiz')) {
      setSelectedJumpCh(propSelectedChapter);
    } else {
      setSelectedJumpCh(0);
    }
  }, [studyMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToSheet = (idx: number) => {
    playCutePop();
    setSelectedJumpCh(idx);

    if (studyMode === 'jamo') {
      const opt = [...JAMO_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= idx);
      if (opt) setSelectedJamoSection(opt.id);
    } else if (studyMode === 'basic') {
      const opt = [...BASIC_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= idx);
      if (opt) setSelectedBasicSection(opt.id);
    } else if (studyMode === 'batchim') {
      const opt = [...BATCHIM_SECTION_OPTIONS].reverse().find(o => o.targetSheet <= idx);
      if (opt) setSelectedBatchimSection(opt.id);
    } else if (studyMode === 'hangeulExam') {
      setExamPartFilter('all');
      const opt = HANGEUL_EXAM_OPTIONS[idx];
      if (opt) setSelectedHangeulExamSection(opt.id);
    } else if (studyMode === 'jollaPlay') {
      const opt = JOLLA_PLAY_OPTIONS[idx];
      if (opt) setSelectedJollaPlaySection(opt.id);
    } else if (studyMode === 'words') {
      const opt = WORDS_SECTION_OPTIONS[idx];
      if (opt) setSelectedWordsSection(opt.id);
    } else if (studyMode === 'verbExam') {
      const opt = VERB_EXAM_OPTIONS[idx];
      if (opt) setSelectedVerbExamSection(opt.id);
    } else if (studyMode === 'verbPlay') {
      const opt = VERB_PLAY_OPTIONS[idx];
      if (opt) setSelectedVerbPlaySection(opt.id);
    } else if (studyMode === 'particleExam') {
      const opt = PARTICLE_EXAM_OPTIONS[idx];
      if (opt) setSelectedParticleExamSection(opt.id);
    } else if (studyMode === 'particlePlay') {
      const opt = PARTICLE_PLAY_OPTIONS[idx];
      if (opt) setSelectedParticlePlaySection(opt.id);
    } else if (studyMode === 'classroomExam') {
      const opt = CLASSROOM_EXAM_OPTIONS[idx];
      if (opt) setSelectedClassroomExamSection(opt.id);
    } else if (studyMode === 'classroomPlay') {
      const opt = CLASSROOM_PLAY_OPTIONS[idx];
      if (opt) setSelectedClassroomPlaySection(opt.id);
    } else if (studyMode === 'particle') {
      const targetOpts =
        particleSubMode === 'sentence' ? PARTICLE_SENTENCE_OPTIONS : PARTICLE_COMBINATION_OPTIONS;
      const opt = targetOpts[idx];
      if (opt) setSelectedParticleSection(opt.id);
    } else if (sectionType === 'classroom' && (studyMode === 'cards' || studyMode === 'writing' || studyMode === 'quiz')) {
      isInternalJumpRef.current = true;
      onSelectChapter?.(idx);
    }

    const targetId =
      studyMode === 'jamo'
        ? `study-jamo-sheet-${idx}`
        : studyMode === 'basic'
        ? `study-basic-sheet-${idx}`
        : studyMode === 'batchim'
        ? `study-batchim-sheet-${idx}`
        : studyMode === 'hangeulExam'
        ? `study-exam-sheet-${idx}`
        : studyMode === 'jollaPlay'
        ? `study-jolla-sheet-${idx}`
        : studyMode === 'words'
        ? `study-words-sheet-${idx}`
        : studyMode === 'verbExam'
        ? `study-verb-exam-sheet-${idx}`
        : studyMode === 'verbPlay'
        ? `study-verb-play-sheet-${idx}`
        : studyMode === 'particleExam'
        ? `study-particle-exam-sheet-${idx}`
        : studyMode === 'particlePlay'
        ? `study-particle-play-sheet-${idx}`
        : studyMode === 'classroomExam'
        ? `study-classroom-exam-sheet-${idx}`
        : studyMode === 'classroomPlay'
        ? `study-classroom-play-sheet-${idx}`
        : studyMode === 'particle'
        ? `study-particle-sheet-${idx}`
        : `study-sheet-ch-${idx}`;
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 30);
  };

  // [단원별 3종세트 인쇄]: 현재 선택된 단원의 [그림카드 + 쓰기학습지 + 테스트지] 3장 연속 인쇄
  const handlePrintTripleSet = () => {
    playCutePop();
    setIsPrintingTripleSet(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsPrintingTripleSet(false);
      }, 1500);
    }, 150);
  };

  // 6. [전체인쇄]
  const handlePrintAll = () => {
    playCutePop();
    setIsPrintingTripleSet(false);
    setExtraPrintTarget(null);
    setSingleSheetPrintKey(null);
    setTimeout(() => {
      window.print();
    }, 120);
  };

  // 챕터 하단 [표지 · 차례] 선택 인쇄
  const handlePrintChapterExtras = (target: 'all-extras' | 'cover' | 'toc') => {
    playCutePop();
    setIsPrintingTripleSet(false);
    setSingleSheetPrintKey(null);
    setExtraPrintTarget(target);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setExtraPrintTarget(null);
      }, 1500);
    }, 150);
  };

  // 개별 시험지 / 졸라 놀이 학습지 1장만 A4 가로 인쇄
  const handlePrintSingleSheet = (sheetKey: string) => {
    playCutePop();
    setIsPrintingTripleSet(false);
    setExtraPrintTarget(null);
    setSingleSheetPrintKey(sheetKey);
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setSingleSheetPrintKey(null);
      }, 1500);
    }, 150);
  };

  const scrollToChapterExtras = () => {
    playCutePop();
    const el = document.getElementById('chapter-bottom-extras');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    playCutePop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuExtras = MENU_EXTRAS_UI[uiLang || 'ko'] || MENU_EXTRAS_UI.ko;

  const overviewConfig = useMemo<{
    title: string;
    subtitle: string;
    accentTheme: OverviewThemeColor;
    items: OverviewCardItem[];
  }>(() => {
    if (studyMode === 'jamo') {
      return {
        title: menuExtras.overview.worksheetTitles.jamo,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: JAMO_SHEET_ITEMS.map((item, idx) => ({
          id: `jamo-${item.id}`,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${JAMO_SHEET_ITEMS.length}`,
          title: item.title,
          subtitle: item.subtitle,
          previewMain: item.previewMain,
          previewChips: item.previewChips,
          themeColor: 'amber',
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'basic') {
      return {
        title: menuExtras.overview.worksheetTitles.basic,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: BASIC_LETTERS_DATA.map((pageData, idx) => ({
          id: `basic-${pageData.pageNumber}`,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${BASIC_LETTERS_DATA.length}`,
          title: `${pageData.circledNumber} ${pageData.vowel}와 만나요`,
          subtitle: pageData.wordCard?.word ? `대표 낱말: ${pageData.wordCard.word}` : undefined,
          previewMain: pageData.vowel,
          previewSecondary: pageData.wordCard?.word,
          previewChips: pageData.cards.map(c => c.syllable),
          themeColor: 'amber',
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'batchim') {
      const totalBatchimSheets = BATCHIM_PAGES_DATA.length;
      return {
        title: menuExtras.overview.worksheetTitles.batchim,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: BATCHIM_PAGES_DATA.map((pageData, idx) => ({
          id: `batchim-${pageData.pageNumber}`,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${totalBatchimSheets}`,
          title: pageData.title.replace('✏️ ', ''),
          subtitle: pageData.subTitle,
          previewMain: pageData.cards[0]?.syllable || pageData.circledNumber,
          previewSecondary: pageData.wordCard?.wordLabel || pageData.wordCard?.audioWord,
          previewChips: pageData.cards.slice(0, 3).map(c => c.syllable),
          themeColor: 'amber' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'hangeulExam') {
      return {
        title: '한글 ( / ) 고르기 쪽지시험 (4파트 × 5강 = 20강)',
        subtitle: '자음모음 · 기본글자 · 받침1(대표·가족) · 받침2(겹받침)',
        accentTheme: 'amber',
        items: HANGEUL_EXAM_LESSONS.map((lesson, idx) => ({
          id: lesson.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${HANGEUL_EXAM_LESSONS.length}`,
          title: lesson.title,
          subtitle: lesson.subtitle,
          previewMain: lesson.previewMain,
          previewChips: lesson.previewChips,
          themeColor: (lesson.partId === 'batchim1'
            ? 'sky'
            : lesson.partId === 'batchim2'
            ? 'purple'
            : 'amber') as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'jollaPlay') {
      return {
        title: '졸라한글맨 놀이 · 동기부여 학습지 (10종)',
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'amber',
        items: JOLLA_PLAY_ITEMS.map((item, idx) => ({
          id: `jolla-${item.id}`,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${JOLLA_PLAY_ITEMS.length}`,
          title: item.title,
          subtitle: item.subtitle,
          previewMain: item.previewMain,
          previewChips: item.previewChips,
          themeColor: 'amber' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'particleExam') {
      return {
        title: '조사 ( / ) 고르기 종합 시험 (5단원씩 총 6강)',
        subtitle: '1~5단원부터 26~30단원까지 5개 단원씩 섞어 출제한 종합 시험',
        accentTheme: 'emerald',
        items: PARTICLE_EXAM_LESSONS.map((lesson, idx) => ({
          id: lesson.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${PARTICLE_EXAM_LESSONS.length}`,
          title: lesson.dropdownLabel,
          subtitle: lesson.subtitle,
          previewMain: lesson.previewMain,
          previewChips: lesson.previewChips,
          themeColor: 'emerald' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'particlePlay') {
      return {
        title: '조사 놀이 학습지 초안 5종 (1강 · 1~5단원)',
        subtitle: '받침 바위 들기·놀이터 시소·문장 로켓·외계인 UFO·방귀 풍선 피하기',
        accentTheme: 'emerald',
        items: PARTICLE_PLAY_SHEETS_META.map((sheet, idx) => ({
          id: sheet.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${PARTICLE_PLAY_SHEETS_META.length}`,
          title: `${sheet.circledNo} ${sheet.title}`,
          subtitle: sheet.subtitle,
          previewMain: sheet.previewMain,
          previewChips: sheet.previewChips,
          themeColor: 'emerald' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'classroomExam') {
      return {
        title: '교실 한국어 ( / ) 고르기 종합 시험 (5단원씩 총 6강)',
        subtitle: '1~5단원부터 26~30단원까지 5개 단원씩 섞어 출제한 종합 시험',
        accentTheme: 'rose',
        items: CLASSROOM_EXAM_LESSONS.map((lesson, idx) => ({
          id: lesson.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${CLASSROOM_EXAM_LESSONS.length}`,
          title: lesson.dropdownLabel,
          subtitle: lesson.subtitle,
          previewMain: lesson.previewMain,
          previewChips: lesson.previewChips,
          themeColor: 'rose' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'classroomPlay') {
      return {
        title: '교실 한국어 놀이 학습지 초안 5종 (1강 · 1~5과)',
        subtitle: '대빵 큰 빙고·학교 대탈출 15칸·화장실 급해 미로·교실 숨은그림·짝꿍 카드',
        accentTheme: 'rose',
        items: CLASSROOM_PLAY_SHEETS_META.map((sheet, idx) => ({
          id: sheet.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${CLASSROOM_PLAY_SHEETS_META.length}`,
          title: `${sheet.circledNo} ${sheet.title}`,
          subtitle: sheet.subtitle,
          previewMain: sheet.previewMain,
          previewChips: sheet.previewChips,
          themeColor: 'rose' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'words') {
      const totalVerbSheets = VERB_UNIT_META.length;
      return {
        title: menuExtras.overview.worksheetTitles.verb,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'purple',
        items: VERB_UNIT_META.map((u, idx) => ({
          id: u.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${totalVerbSheets}`,
          title: `${u.circled} ${u.grammar}`,
          subtitle: u.verbs.join(', '),
          previewMain: u.verbs[0] || u.grammar,
          previewSecondary: u.grammar,
          previewChips: u.verbs.slice(0, 3),
          themeColor: 'purple' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'verbExam') {
      return {
        title: '용언 ( / ) 고르기 종합 시험 (5단원씩 총 6강)',
        subtitle: '1~5단원부터 26~30단원까지 5개 단원씩 섞어 출제한 종합 시험',
        accentTheme: 'purple',
        items: VERB_EXAM_LESSONS.map((lesson, idx) => ({
          id: lesson.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${VERB_EXAM_LESSONS.length}`,
          title: lesson.dropdownLabel,
          subtitle: lesson.subtitle,
          previewMain: lesson.previewMain,
          previewChips: lesson.previewChips,
          themeColor: 'purple' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'verbPlay') {
      return {
        title: '용언 놀이 학습지 초안 5종 (1강 · 1~5단원)',
        subtitle: '왕만두 찜통 요리·3색 풍선 색칠·동작 무대·변신 징검다리·문장 낚시터',
        accentTheme: 'purple',
        items: VERB_PLAY_SHEETS_META.map((sheet, idx) => ({
          id: sheet.id,
          targetIdx: idx,
          pageLabel: `${idx + 1} / ${VERB_PLAY_SHEETS_META.length}`,
          title: `${sheet.circledNo} ${sheet.title}`,
          subtitle: sheet.subtitle,
          previewMain: sheet.previewMain,
          previewChips: sheet.previewChips,
          themeColor: 'purple' as OverviewThemeColor,
          isActive: selectedJumpCh === idx,
        })),
      };
    }

    if (studyMode === 'particle') {
      const isSentence = particleSubMode === 'sentence';
      const targetUnits = isSentence ? PARTICLE_SENTENCE_UNITS : PARTICLE_COMBINATION_UNITS;
      const totalParticleSheets = targetUnits.length;
      const baseItems: OverviewCardItem[] = targetUnits.map((u, idx) => ({
        id: u.id,
        targetIdx: idx,
        pageLabel: `${idx + 1} / ${totalParticleSheets}`,
        title: `${u.circled} ${u.title}`,
        subtitle: u.keywords.join(', '),
        previewMain: u.keywords[0] || u.grammar,
        previewSecondary: u.grammar,
        previewChips: u.keywords.slice(0, 3),
        themeColor: 'emerald',
        isActive: selectedJumpCh === idx,
      }));
      return {
        title: isSentence
          ? menuExtras.overview.worksheetTitles.particleSentence
          : menuExtras.overview.worksheetTitles.particle,
        subtitle: menuExtras.overview.defaultSubtitle,
        accentTheme: 'emerald',
        items: baseItems,
      };
    }

    const modeTitle =
      studyMode === 'cards'
        ? menuExtras.overview.worksheetTitles.classroomCards
        : studyMode === 'writing'
        ? menuExtras.overview.worksheetTitles.classroomWriting
        : menuExtras.overview.worksheetTitles.classroomQuiz;
    const modeTheme: OverviewThemeColor = studyMode === 'cards' ? 'rose' : studyMode === 'writing' ? 'purple' : 'sky';
    return {
      title: modeTitle,
      subtitle: menuExtras.overview.defaultSubtitle,
      accentTheme: modeTheme,
      items: CHAPTER_LIST.map((chObj, idx) => {
        const chWords = vocabulary.filter(v => v.ch === chObj.ch);
        return {
          id: `ch-${chObj.ch}`,
          targetIdx: chObj.ch,
          pageLabel: `${idx + 1} / ${CHAPTER_LIST.length}`,
          title: getChapterCircledTitle(chObj.ch, lang),
          subtitle: `${chWords.length}단어`,
          previewMain: chWords[0]?.ko || chObj.icon,
          previewSecondary: chWords[1]?.ko,
          previewChips: chWords.slice(0, 3).map(w => w.ko),
          themeColor: modeTheme,
          isActive: selectedJumpCh === chObj.ch,
        };
      }),
    };
  }, [studyMode, particleSubMode, selectedJumpCh, vocabulary, lang, menuExtras]);

  const tabUi = SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko;

  const desktopRightControls = (
    <>
      {/* Sub-category text tabs */}
      {sectionType === 'hangeul' && (
        <div className="flex items-center gap-1 mr-1">
          {[
            { id: 'jamo' as StudyMode, label: tabUi.studyTabs.jamo },
            { id: 'basic' as StudyMode, label: tabUi.studyTabs.basic },
            { id: 'batchim' as StudyMode, label: tabUi.studyTabs.batchim },
            { id: 'hangeulExam' as StudyMode, label: '시험' },
            { id: 'jollaPlay' as StudyMode, label: '놀이' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                playCutePop();
                setStudyMode(item.id);
              }}
              className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
                studyMode === item.id
                  ? 'border-amber-500 text-amber-950 font-black'
                  : 'border-transparent text-slate-600 hover:text-amber-900 font-semibold'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {sectionType === 'verb' && (
        <div className="flex items-center gap-1 mr-1">
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setStudyMode('words');
            }}
            className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
              studyMode === 'words'
                ? 'border-[#7E22CE] text-purple-950 font-black'
                : 'border-transparent text-slate-600 hover:text-purple-900 font-semibold'
            }`}
          >
            {tabUi.studyTabs.verb}
          </button>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setStudyMode('verbExam');
            }}
            className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
              studyMode === 'verbExam'
                ? 'border-[#7E22CE] text-purple-950 font-black'
                : 'border-transparent text-slate-600 hover:text-purple-900 font-semibold'
            }`}
          >
            시험
          </button>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setStudyMode('verbPlay');
            }}
            className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
              studyMode === 'verbPlay'
                ? 'border-[#7E22CE] text-purple-950 font-black'
                : 'border-transparent text-slate-600 hover:text-purple-900 font-semibold'
            }`}
          >
            놀이
          </button>
        </div>
      )}

      {sectionType === 'particle' && (
        <div className="flex items-center gap-1 mr-1">
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setStudyMode('particle');
              setParticleSubMode('combination');
              setSelectedJumpCh(0);
              setSelectedParticleSection(PARTICLE_COMBINATION_OPTIONS[0]?.id || 'particle_unit1');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
              studyMode === 'particle' && particleSubMode === 'combination'
                ? 'border-emerald-600 text-emerald-950 font-black'
                : 'border-transparent text-slate-600 hover:text-emerald-950 font-semibold'
            }`}
          >
            {tabUi.studyTabs.particle}
          </button>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setStudyMode('particle');
              setParticleSubMode('sentence');
              setSelectedJumpCh(0);
              setSelectedParticleSection(PARTICLE_SENTENCE_OPTIONS[0]?.id || 'particle_unit3');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
              studyMode === 'particle' && particleSubMode === 'sentence'
                ? 'border-emerald-600 text-emerald-950 font-black'
                : 'border-transparent text-slate-600 hover:text-emerald-950 font-semibold'
            }`}
          >
            {menuExtras.particleSentenceTab}
          </button>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setStudyMode('particleExam');
            }}
            className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
              studyMode === 'particleExam'
                ? 'border-emerald-600 text-emerald-950 font-black'
                : 'border-transparent text-slate-600 hover:text-emerald-950 font-semibold'
            }`}
          >
            시험
          </button>
          <button
            type="button"
            onClick={() => {
              playCutePop();
              setStudyMode('particlePlay');
            }}
            className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
              studyMode === 'particlePlay'
                ? 'border-emerald-600 text-emerald-950 font-black'
                : 'border-transparent text-slate-600 hover:text-emerald-950 font-semibold'
            }`}
          >
            놀이
          </button>
        </div>
      )}

      {sectionType === 'classroom' && (
        <div className="flex items-center gap-1 mr-1">
          {[
            { id: 'cards' as StudyMode, label: tabUi.studyTabs.flashcards },
            { id: 'writing' as StudyMode, label: tabUi.studyTabs.writing },
            { id: 'quiz' as StudyMode, label: tabUi.studyTabs.quiz },
            { id: 'classroomExam' as StudyMode, label: '시험' },
            { id: 'classroomPlay' as StudyMode, label: '놀이' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                playCutePop();
                setStudyMode(item.id);
              }}
              className={`h-8 px-2 text-xs whitespace-nowrap cursor-pointer border-b-2 transition-colors ${
                studyMode === item.id
                  ? 'border-[#D94A6B] text-rose-950 font-black'
                  : 'border-transparent text-slate-600 hover:text-rose-900 font-semibold'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Classroom Multi-language Picker */}
      {sectionType === 'classroom' && (
        <div className="relative z-30 shrink-0">
          <>
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setIsCustomLangOpen((prev) => !prev);
              }}
              className="h-8 px-2 rounded-sm bg-[#441A75] hover:bg-[#52208E] text-white flex items-center gap-1 transition-all cursor-pointer border border-[#6328A6]"
              title={tabUi.studyControls.pickLangsTitle}
              aria-expanded={isCustomLangOpen}
            >
              <span className="text-xs leading-none shrink-0" role="img" aria-label="Globe">🌐</span>
              <span className="hidden xl:inline text-[11.5px] font-bold text-white whitespace-nowrap">
                {tabUi.studyControls.pickLangs}
              </span>
              <span className="bg-[#FEF08A] text-[#1E0B36] font-extrabold text-[10px] px-1 py-0.5 rounded-none whitespace-nowrap leading-none">
                [{customSelectedLangs.length}/3]
              </span>
              <ChevronDown className={`w-3 h-3 text-white transition-transform shrink-0 ${isCustomLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCustomLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[0.5px]"
                  onClick={() => setIsCustomLangOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-[320px] bg-white rounded-lg shadow-2xl border-2 border-[#441A75]/30 p-3 z-50 font-korean-gothic text-xs text-slate-800 animate-in fade-in slide-in-from-top-1">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
                    <span className="font-black text-purple-950 text-xs">
                      {tabUi.studyControls.pickModalHeader}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#1E0B36] bg-[#FEF08A] px-2 py-0.5 rounded-sm shadow-2xs">
                      [{customSelectedLangs.length}/3] {tabUi.studyControls.selectedSuffix}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {SUPPORTED_LANGUAGES.map((langMeta) => {
                      const isChecked = customSelectedLangs.includes(langMeta.code);
                      const orderIdx = customSelectedLangs.indexOf(langMeta.code);
                      const prioritySfx = tabUi.studyControls.prioritySuffix;
                      return (
                        <button
                          key={langMeta.code}
                          type="button"
                          onClick={() => handleToggleCustomLang(langMeta.code)}
                          className={`w-full px-2.5 py-2 rounded-md flex items-center justify-between transition-colors text-left cursor-pointer border ${
                            isChecked
                              ? 'bg-purple-100/80 text-purple-950 font-black border-purple-300 shadow-2xs'
                              : 'bg-white hover:bg-purple-50/80 text-slate-800 font-bold border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base leading-none">{langMeta.flag}</span>
                            <span className="font-bold">{langMeta.fullName}</span>
                            {isChecked && (
                              <span className="text-[10px] font-extrabold text-purple-700 bg-purple-200/80 px-1.5 py-0.2 rounded-sm">
                                #{orderIdx + 1}{prioritySfx ? ` (${orderIdx + 1}${prioritySfx})` : ''}
                              </span>
                            )}
                          </div>
                          <div className={`w-4 h-4 rounded-sm flex items-center justify-center border text-[11px] font-bold ${
                            isChecked
                              ? 'bg-purple-700 border-purple-700 text-white'
                              : 'border-slate-400 bg-white text-transparent'
                          }`}>
                            ✓
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      )}

      {/* Unit / Page Select Dropdown */}
      {sectionType === 'hangeul' && studyMode === 'jamo' && (
        <CompactUnitSelectButton
          value={selectedJamoSection}
          onChange={(val) => {
            setSelectedJamoSection(val);
            const opt = JAMO_SECTION_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={JAMO_SECTION_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="amber"
          title="자음모음 페이지 선택"
          align="right"
          className="w-[175px] xl:w-[210px]"
        />
      )}
      {sectionType === 'hangeul' && studyMode === 'basic' && (
        <CompactUnitSelectButton
          value={selectedBasicSection}
          onChange={(val) => {
            setSelectedBasicSection(val);
            const opt = BASIC_SECTION_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={BASIC_SECTION_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="amber"
          title="기본글자 페이지 선택"
          align="right"
          className="w-[175px] xl:w-[210px]"
        />
      )}
      {sectionType === 'hangeul' && studyMode === 'batchim' && (
        <CompactUnitSelectButton
          value={selectedBatchimSection}
          onChange={(val) => {
            setSelectedBatchimSection(val);
            const opt = BATCHIM_SECTION_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={BATCHIM_SECTION_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="amber"
          title="받침글자 페이지 선택"
          align="right"
          className="w-[175px] xl:w-[210px]"
        />
      )}
      {sectionType === 'hangeul' && studyMode === 'hangeulExam' && (
        <CompactUnitSelectButton
          value={selectedHangeulExamSection}
          onChange={(val) => {
            setSelectedHangeulExamSection(val);
            const opt = HANGEUL_EXAM_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={HANGEUL_EXAM_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="amber"
          title="한글 시험 20강 선택"
          align="right"
          className="w-[195px] xl:w-[240px]"
        />
      )}
      {sectionType === 'hangeul' && studyMode === 'jollaPlay' && (
        <CompactUnitSelectButton
          value={selectedJollaPlaySection}
          onChange={(val) => {
            setSelectedJollaPlaySection(val);
            const opt = JOLLA_PLAY_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={JOLLA_PLAY_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="amber"
          title="졸라 놀이 학습지 선택"
          align="right"
          className="w-[190px] xl:w-[230px]"
        />
      )}
      {sectionType === 'particle' && studyMode === 'particle' && (() => {
        const targetOpts =
          particleSubMode === 'sentence'
            ? PARTICLE_SENTENCE_OPTIONS
            : PARTICLE_COMBINATION_OPTIONS;
        return (
          <CompactUnitSelectButton
            value={selectedParticleSection}
            onChange={(val) => {
              setSelectedParticleSection(val);
              const opt = targetOpts.find((o) => o.id === val);
              if (opt) handleJumpToSheet(opt.targetSheet);
            }}
            options={targetOpts.map((opt) => ({ value: opt.id, label: opt.label }))}
            theme="emerald"
            title={particleSubMode === 'sentence' ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
            align="right"
            className="w-[210px] xl:w-[250px]"
          />
        );
      })()}
      {sectionType === 'verb' && studyMode === 'words' && (
        <CompactUnitSelectButton
          value={selectedWordsSection}
          onChange={(val) => {
            setSelectedWordsSection(val);
            const opt = WORDS_SECTION_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={WORDS_SECTION_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          title="용언 활용 단원 선택"
          align="right"
          className="w-[210px] xl:w-[250px]"
        />
      )}
      {sectionType === 'verb' && studyMode === 'verbExam' && (
        <CompactUnitSelectButton
          value={selectedVerbExamSection}
          onChange={(val) => {
            setSelectedVerbExamSection(val);
            const opt = VERB_EXAM_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={VERB_EXAM_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          title="용언 종합 시험 6강 선택"
          align="right"
          className="w-[210px] xl:w-[255px]"
        />
      )}
      {sectionType === 'verb' && studyMode === 'verbPlay' && (
        <CompactUnitSelectButton
          value={selectedVerbPlaySection}
          onChange={(val) => {
            setSelectedVerbPlaySection(val);
            const opt = VERB_PLAY_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={VERB_PLAY_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="purple"
          title="용언 놀이 초안 5종 선택"
          align="right"
          className="w-[210px] xl:w-[255px]"
        />
      )}
      {sectionType === 'particle' && studyMode === 'particleExam' && (
        <CompactUnitSelectButton
          value={selectedParticleExamSection}
          onChange={(val) => {
            setSelectedParticleExamSection(val);
            const opt = PARTICLE_EXAM_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={PARTICLE_EXAM_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="emerald"
          title="조사 종합 시험 6강 선택"
          align="right"
          className="w-[210px] xl:w-[255px]"
        />
      )}
      {sectionType === 'particle' && studyMode === 'particlePlay' && (
        <CompactUnitSelectButton
          value={selectedParticlePlaySection}
          onChange={(val) => {
            setSelectedParticlePlaySection(val);
            const opt = PARTICLE_PLAY_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={PARTICLE_PLAY_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="emerald"
          title="조사 놀이 초안 5종 선택"
          align="right"
          className="w-[210px] xl:w-[255px]"
        />
      )}
      {sectionType === 'classroom' && studyMode !== 'classroomExam' && studyMode !== 'classroomPlay' && (
        <CompactUnitSelectButton
          value={selectedJumpCh}
          onChange={(val) => handleJumpToSheet(Number(val))}
          options={CHAPTER_LIST.map((ch) => ({
            value: ch.ch,
            label: getChapterCircledTitle(ch.ch, lang),
          }))}
          theme="rose"
          title="교실 한국어 단원 선택"
          align="right"
          className="w-[180px] xl:w-[225px]"
        />
      )}
      {sectionType === 'classroom' && studyMode === 'classroomExam' && (
        <CompactUnitSelectButton
          value={selectedClassroomExamSection}
          onChange={(val) => {
            setSelectedClassroomExamSection(val);
            const opt = CLASSROOM_EXAM_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={CLASSROOM_EXAM_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="rose"
          title="교실 한국어 종합 시험 6강 선택"
          align="right"
          className="w-[210px] xl:w-[255px]"
        />
      )}
      {sectionType === 'classroom' && studyMode === 'classroomPlay' && (
        <CompactUnitSelectButton
          value={selectedClassroomPlaySection}
          onChange={(val) => {
            setSelectedClassroomPlaySection(val);
            const opt = CLASSROOM_PLAY_OPTIONS.find((o) => o.id === val);
            if (opt) handleJumpToSheet(opt.targetSheet);
          }}
          options={CLASSROOM_PLAY_OPTIONS.map((opt) => ({ value: opt.id, label: opt.label }))}
          theme="rose"
          title="교실 한국어 놀이 초안 5종 선택"
          align="right"
          className="w-[210px] xl:w-[255px]"
        />
      )}

      {/* Overview Grid Button */}
      <button
        type="button"
        onClick={() => {
          playCutePop();
          setIsOverviewOpen(true);
        }}
        className={`h-8 w-8 rounded-sm border cursor-pointer shrink-0 flex items-center justify-center transition-colors ${
          sectionType === 'particle'
            ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-emerald-300'
            : sectionType === 'verb'
            ? 'bg-purple-100 hover:bg-purple-200 text-purple-950 border-purple-300'
            : sectionType === 'hangeul'
            ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
            : 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-300'
        }`}
        title={tabUi.studyControls.overviewTitle}
        aria-label={tabUi.studyControls.overviewTitle}
      >
        <LayoutGrid className="w-4 h-4 shrink-0" />
      </button>

      {/* Classroom Triple-Set Unit Print Button */}
      {sectionType === 'classroom' && studyMode !== 'classroomExam' && studyMode !== 'classroomPlay' && (
        <button
          type="button"
          onClick={handlePrintTripleSet}
          className="h-8 px-2 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer shrink-0 flex items-center gap-1 text-xs font-bold transition-colors whitespace-nowrap"
          title={`${tabUi.studyControls.unitPrintTitle}: ${currentChapterObj.circledTitle}`}
          aria-label={tabUi.studyControls.unitPrintTitle}
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden xl:inline">{tabUi.studyControls.unitPrintPrefix}</span>
        </button>
      )}

      {/* Jump to Bottom Cover · TOC (Only on main chapter worksheets) */}
      {studyMode !== 'hangeulExam' &&
        studyMode !== 'jollaPlay' &&
        studyMode !== 'verbExam' &&
        studyMode !== 'verbPlay' &&
        studyMode !== 'particleExam' &&
        studyMode !== 'particlePlay' &&
        studyMode !== 'classroomExam' &&
        studyMode !== 'classroomPlay' && (
        <button
          type="button"
          onClick={scrollToChapterExtras}
          className="h-8 px-2.5 rounded-sm bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold transition-colors whitespace-nowrap"
          title="맨 아래 표지·차례로 이동"
        >
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden xl:inline">표지·차례</span>
        </button>
      )}

      {/* Print All Button */}
      <button
        type="button"
        onClick={handlePrintAll}
        className="h-8 px-2.5 rounded-sm bg-slate-800 hover:bg-slate-900 text-white border border-slate-900 cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold transition-colors whitespace-nowrap"
        title={tabUi.studyControls.allPrintTitle}
        aria-label={tabUi.studyControls.allPrintPrefix}
      >
        <Printer className="w-3.5 h-3.5 shrink-0" />
        <span>{tabUi.studyControls.allPrintPrefix}</span>
      </button>
    </>
  );

  return (
    <div
      className={`study-section flex flex-col items-center w-full ${
        extraPrintTarget || singleSheetPrintKey !== null ? 'printing-chapter-extras' : ''
      }`}
    >
      {/* Print CSS Rules for Continuous Study View & Single Page Printing */}
      <style>{`
        @font-face {
          font-family: 'Hakgyoansim Bareondotum';
          src: local('Hakgyoansim Bareondotum Regular'),
               local('Hakgyoansim Bareondotum'),
               local('학교안심 바른돋움 R'),
               local('학교안심 바른돋움'),
               url('/fonts/HakgyoansimBareondotum-Regular.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Hakgyoansim Bareondotum';
          src: local('Hakgyoansim Bareondotum Bold'),
               local('학교안심 바른돋움 B'),
               url('/fonts/HakgyoansimBareondotum-Bold.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Bold.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교안심 바른돋움';
          src: local('Hakgyoansim Bareondotum Regular'),
               local('Hakgyoansim Bareondotum'),
               local('학교안심 바른돋움 R'),
               local('학교안심 바른돋움'),
               url('/fonts/HakgyoansimBareondotum-Regular.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBareondotum/HakgyoansimBareondotum-Regular.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Hakgyoansim Badasseugi';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Hakgyoansim Badasseugi';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교안심 받아쓰기';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교안심 받아쓰기';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교알림받아쓰기';
          src: local('Hakgyoansim Badasseugi Light'),
               local('Hakgyoansim Badasseugi'),
               local('학교안심 받아쓰기 L'),
               local('학교안심 받아쓰기'),
               url('/fonts/HakgyoansimBadasseugi-L.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-L.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: '학교알림받아쓰기';
          src: local('Hakgyoansim Badasseugi Bold'),
               local('학교안심 받아쓰기 B'),
               url('/fonts/HakgyoansimBadasseugi-B.woff2') format('woff2'),
               url('https://cdn.jsdelivr.net/gh/fonts-archive/HakgyoansimBadasseugi/HakgyoansimBadasseugi-B.woff2') format('woff2');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }
        .font-school-base,
        .font-korean-gothic {
          font-family: 'Hakgyoansim Bareondotum', '학교안심 바른돋움', 'NanumBarunGothic', sans-serif !important;
        }
        .font-school-hand,
        .font-badasseugi,
        .font-kyobo {
          font-family: 'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important;
          letter-spacing: -0.01em;
        }

        @media print {
          @page {
            size: A4 landscape;
            margin: 4mm 6mm;
          }
          html, body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            overflow: visible !important;
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html::-webkit-scrollbar, body::-webkit-scrollbar, *::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          /* Hide app shell and navigation during print */
          header, nav, footer, button, aside, .no-print, .study-section > .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .study-section {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .study-worksheets-container {
            display: block !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .study-sheet-wrapper {
            margin: 0 !important;
            padding: 0 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
            overflow: visible !important;
          }
          .mobile-scaled-outer {
            height: auto !important;
            width: 100% !important;
            overflow: visible !important;
            position: static !important;
            display: block !important;
          }
          .mobile-scaled-inner {
            position: static !important;
            width: 100% !important;
            transform: none !important;
          }

          /* [학습지 - 자음모음 전체인쇄 & 1장인쇄] 7, 8, 12, 14, 15쪽 (3열 학습지) */
          #study-jamo-sheet-6,
          #study-jamo-sheet-7,
          #study-jamo-sheet-11,
          #study-jamo-sheet-13 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          #study-jamo-sheet-14 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
          }
          #study-jamo-sheet-15 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            display: block !important;
          }
          #study-jamo-sheet-16,
          #study-batchim-sheet-15 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            display: block !important;
          }
          #study-jamo-sheet-15 .consonants-summary-sheet,
          #study-jamo-sheet-16 .vowels-summary-sheet,
          #study-batchim-sheet-15 .batchim-summary-sheet {
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
          #study-jamo-sheet-15 .consonants-summary-sheet,
          #study-jamo-sheet-15 .consonants-summary-sheet *,
          #study-jamo-sheet-16 .vowels-summary-sheet,
          #study-jamo-sheet-16 .vowels-summary-sheet *,
          #study-batchim-sheet-15 .batchim-summary-sheet,
          #study-batchim-sheet-15 .batchim-summary-sheet * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #study-jamo-sheet-15 .summary-basic-grid {
            display: grid !important;
            grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-15 .summary-bottom-split {
            display: grid !important;
            grid-template-columns: 57fr 43fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-15 .summary-double-grid {
            display: grid !important;
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-16 .summary-vowel-basic-grid {
            display: grid !important;
            grid-template-columns: repeat(10, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-16 .summary-vowel-bottom-split {
            display: grid !important;
            grid-template-columns: 62fr 38fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-16 .summary-vowel-compound-grid {
            display: grid !important;
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-batchim-sheet-15 .summary-batchim-rep-grid {
            display: grid !important;
            grid-template-columns: repeat(7, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          #study-batchim-sheet-15 .summary-batchim-bottom-split {
            display: grid !important;
            grid-template-columns: 59fr 41fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          #study-batchim-sheet-15 .summary-batchim-double-grid {
            display: grid !important;
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }

          /* 용언·조사·교실한국어 총정리표 인쇄 전용 스타일 */
          #study-words-sheet-30,
          #study-ch-summary-sheet-2 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            display: block !important;
          }
          .study-sheet-wrapper .verb-summary-sheet,
          .study-sheet-wrapper .particle-summary-sheet,
          .study-sheet-wrapper .classroom-summary-sheet {
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
          .study-sheet-wrapper .verb-summary-sheet *,
          .study-sheet-wrapper .particle-summary-sheet *,
          .study-sheet-wrapper .classroom-summary-sheet * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .study-sheet-wrapper .summary-verb-grid {
            display: grid !important;
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper .summary-particle-grid {
            display: grid !important;
            grid-template-columns: repeat(6, minmax(0, 1fr)) !important;
            gap: 5px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper .summary-verb-bottom {
            display: grid !important;
            grid-template-columns: 40fr 60fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper .summary-particle-bottom {
            display: grid !important;
            grid-template-columns: 54fr 46fr !important;
            gap: 8px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper .summary-classroom-grid {
            display: grid !important;
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 6px !important;
            width: 100% !important;
          }

          /* 대형 4분할 결합 쓰기 학습지 (16~19쪽) 인쇄 스타일 */
          .study-sheet-wrapper[id^="study-jamo-sheet-"] table.large-combo-table {
            width: 100% !important;
            height: 156mm !important;
            max-height: 156mm !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
          }
          .study-sheet-wrapper[id^="study-jamo-sheet-"] table.large-combo-table thead tr {
            height: 14mm !important;
            max-height: 14mm !important;
          }
          .study-sheet-wrapper[id^="study-jamo-sheet-"] table.large-combo-table tbody tr {
            height: 28.4mm !important;
            max-height: 28.4mm !important;
          }
          #study-basic-sheet-20 {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            display: block !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"]:not(#study-basic-sheet-20) {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          #study-jamo-sheet-6 .print-sheet,
          #study-jamo-sheet-7 .print-sheet,
          #study-jamo-sheet-11 .print-sheet,
          #study-jamo-sheet-13 .print-sheet,
          #study-jamo-sheet-14 .print-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .print-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2.5mm 3.5mm !important;
            overflow: visible !important;
          }
          #study-jamo-sheet-6 .jamo-card-grid,
          #study-jamo-sheet-7 .jamo-card-grid,
          #study-jamo-sheet-11 .jamo-card-grid,
          #study-jamo-sheet-13 .jamo-card-grid,
          #study-jamo-sheet-14 .jamo-card-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 16px !important;
            width: 100% !important;
            margin: 2mm 0 !important;
            flex: 1 1 auto !important;
          }
          #study-jamo-sheet-6 .jamo-stroke-card,
          #study-jamo-sheet-7 .jamo-stroke-card,
          #study-jamo-sheet-11 .jamo-stroke-card,
          #study-jamo-sheet-13 .jamo-stroke-card,
          #study-jamo-sheet-14 .jamo-stroke-card {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            height: 100% !important;
            padding: 2.5mm 3.5mm !important;
            box-sizing: border-box !important;
          }
          #study-jamo-sheet-6 .stroke-example-cell,
          #study-jamo-sheet-7 .stroke-example-cell,
          #study-jamo-sheet-11 .stroke-example-cell,
          #study-jamo-sheet-13 .stroke-example-cell,
          #study-jamo-sheet-14 .stroke-example-cell {
            flex: 1 1 auto !important;
            min-height: 90px !important;
            max-height: 155px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 1.5mm 0 !important;
          }
          #study-jamo-sheet-6 .stroke-example-cell svg,
          #study-jamo-sheet-7 .stroke-example-cell svg,
          #study-jamo-sheet-11 .stroke-example-cell svg,
          #study-jamo-sheet-13 .stroke-example-cell svg,
          #study-jamo-sheet-14 .stroke-example-cell svg {
            max-height: 145px !important;
            height: 100% !important;
            width: auto !important;
          }
          #study-jamo-sheet-6 .jamo-rows-container,
          #study-jamo-sheet-7 .jamo-rows-container,
          #study-jamo-sheet-11 .jamo-rows-container,
          #study-jamo-sheet-13 .jamo-rows-container,
          #study-jamo-sheet-14 .jamo-rows-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 4px !important;
            margin-top: 2px !important;
            width: 100% !important;
          }
          #study-jamo-sheet-6 .jamo-practice-row,
          #study-jamo-sheet-7 .jamo-practice-row,
          #study-jamo-sheet-11 .jamo-practice-row,
          #study-jamo-sheet-13 .jamo-practice-row,
          #study-jamo-sheet-14 .jamo-practice-row {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            width: 100% !important;
            height: 32mm !important;
            max-height: 32mm !important;
          }
          #study-jamo-sheet-6 .jamo-practice-cell,
          #study-jamo-sheet-7 .jamo-practice-cell,
          #study-jamo-sheet-11 .jamo-practice-cell,
          #study-jamo-sheet-13 .jamo-practice-cell,
          #study-jamo-sheet-14 .jamo-practice-cell {
            height: 32mm !important;
            max-height: 32mm !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper[id^="study-jamo-sheet-"] .jamo-practice-cell span {
            font-size: 24mm !important;
            line-height: 1 !important;
          }
          #study-jamo-sheet-8 .jamo-practice-cell span {
            font-size: 19mm !important;
            line-height: 1 !important;
          }

          /* [기본글자] 21쪽 전체: 4열 인쇄 전용 크기 최적화 (정사각형 셀 & 교과서 느낌 꽉 찬 글자) */
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-card-grid {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 10px !important;
            width: 100% !important;
            margin: 1mm 0 !important;
            flex: 1 1 auto !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-stroke-card {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            height: 100% !important;
            padding: 2mm 2mm !important;
            box-sizing: border-box !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-card-top {
            flex: 1 1 auto !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            min-height: 85px !important;
            padding: 1mm 0 !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-rows-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 3px !important;
            margin-top: 2px !important;
            width: 100% !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-single-col-table {
            width: 50% !important;
            margin: 0 auto !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 3px !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-single-col-table .jamo-practice-row {
            width: 100% !important;
            height: 33mm !important;
            max-height: 33mm !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row {
            display: grid !important;
            width: 100% !important;
            height: 33mm !important;
            max-height: 33mm !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row.grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row.grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row.grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-cell {
            height: 33mm !important;
            max-height: 33mm !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-cell span {
            font-size: 24mm !important;
            line-height: 1 !important;
          }
          .study-sheet-wrapper[id^="study-basic-sheet-"] .jamo-practice-row.grid-cols-3 .jamo-practice-cell span {
            font-size: 15.5mm !important;
            line-height: 1 !important;
          }



          /* 4. Triple Set Print Filtering (단원별 3종세트 일괄 인쇄) */
          ${
            isPrintingTripleSet
              ? `
            .study-sheet-wrapper {
              display: none !important;
            }
            .triple-print-container {
              display: block !important;
            }
            .triple-print-item {
              margin: 0 !important;
              padding: 0 !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              page-break-after: always !important;
              break-after: page !important;
            }
            .triple-print-item:last-child {
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
          `
              : `
            .triple-print-container {
              display: none !important;
            }
          `
          }

          /* 1. Flashcards (그림카드) print layout */
          .printable-a4-page {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
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
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-card {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* 2. Word Writing, Quiz, and Jamo print layout */
          .printable-word-sheet, .print-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
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
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          table.word-table {
            width: 100% !important;
            max-width: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            background: #ffffff !important;
          }
          table.word-table thead tr {
            height: 6.5mm !important;
            max-height: 6.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.word-table tbody tr {
            height: 16.5mm !important;
            max-height: 16.5mm !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.word-table th, table.word-table td {
            border: 1.5px solid #374151 !important;
            text-align: center !important;
            vertical-align: middle !important;
            padding: 0 !important;
            background: transparent !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            box-sizing: border-box !important;
          }

          /* 3열 다국어 함께(all) 3줄 분할 인쇄 전용 스타일 */
          .all-langs-cell {
            height: 100% !important;
            max-height: 16.2mm !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-evenly !important;
            padding: 0.3mm 1.2mm !important;
            box-sizing: border-box !important;
          }
          .all-langs-cell .lang-row {
            display: flex !important;
            align-items: center !important;
            gap: 0.8mm !important;
            line-height: 1.15 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .all-langs-cell .lang-tag {
            font-size: 5.5pt !important;
            padding: 0.1mm 0.6mm !important;
            line-height: 1 !important;
            border: 0.5px solid #94a3b8 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .all-langs-cell .lang-text {
            font-size: 7.2pt !important;
            line-height: 1.15 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          /* 3. 자음 및 모음 18열 테이블 & 조합표 (15×11) 인쇄 스타일 */
          table.square-grid-table {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            table-layout: fixed !important;
            border-collapse: collapse !important;
          }
          table.square-grid-table thead tr {
            height: 6.5mm !important;
            max-height: 6.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.square-grid-table thead th {
            border: 1.5px solid #374151 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            vertical-align: middle !important;
          }
          table.square-grid-table tbody td {
            border: 1.5px solid #374151 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            vertical-align: middle !important;
          }
          table.consonant-table tbody tr {
            height: 17.5mm !important;
            max-height: 17.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.consonant-table tbody td .cell-square-box {
            width: 100% !important;
            height: 17.5mm !important;
            max-height: 17.5mm !important;
          }
          table.vowel-table tbody tr {
            height: 12.2mm !important;
            max-height: 12.2mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.vowel-table tbody td .cell-square-box {
            width: 100% !important;
            height: 12.2mm !important;
            max-height: 12.2mm !important;
          }
          table.combo-table thead tr {
            height: 7mm !important;
            max-height: 7mm !important;
          }
          table.combo-table tbody tr {
            height: 13.5mm !important;
            max-height: 13.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.combo-table tbody td .cell-square-box {
            width: 100% !important;
            height: 13.5mm !important;
            max-height: 13.5mm !important;
          }

          /* 3-1. 대형 4분할 결합표 (16~23쪽) 인쇄 스타일 */
          table.large-combo-table {
            width: 100% !important;
            table-layout: fixed !important;
          }
          table.large-combo-table thead tr {
            height: 8.5mm !important;
            max-height: 8.5mm !important;
          }
          table.large-combo-table tbody tr {
            height: 29.5mm !important;
            max-height: 29.5mm !important;
            border-bottom: 1.5px solid #374151 !important;
          }
          table.large-combo-table th:first-child,
          table.large-combo-table td:first-child {
            width: 4.8% !important;
            max-width: 4.8% !important;
          }
          table.large-combo-table th:not(:first-child),
          table.large-combo-table td:not(:first-child) {
            width: 13.6% !important;
            max-width: 13.6% !important;
          }
          table.large-combo-table tbody td .cell-square-box {
            width: 100% !important;
            height: 29.5mm !important;
            max-height: 29.5mm !important;
          }

          /* 4. Wordbook (단어장) 150단어(5열×30행) 표 print layout */
          .printable-wordbook-page {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            padding: 2mm 3mm !important;
            background: #ffffff !important;
            border: 1.5px solid #1e293b !important;
            border-radius: 6px !important;
            box-shadow: none !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .printable-wordbook-page .wb-columns-grid {
            flex: 1 1 auto !important;
            gap: 2mm !important;
          }
          table.wordbook-table {
            width: 100% !important;
            height: 100% !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            background: #ffffff !important;
          }
          table.wordbook-table thead tr {
            height: 5.3mm !important;
            max-height: 5.3mm !important;
          }
          table.wordbook-table tbody tr {
            height: 5.25mm !important;
            max-height: 5.25mm !important;
          }
          table.wordbook-table th, table.wordbook-table td {
            border-collapse: collapse !important;
            box-sizing: border-box !important;
            padding-top: 0.4mm !important;
            padding-bottom: 0.4mm !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          table.wordbook-table span {
            line-height: 1.15 !important;
          }

          /* 5. 챕터 하단 [표지 · 차례 · ( / ) 고르기 쪽지시험 초안] A4 가로 1쪽 맞춤 인쇄 */
          .chapter-extra-sheet-wrapper {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            page-break-after: always !important;
            break-after: page !important;
            margin: 0 auto !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          .chapter-extra-sheet-wrapper.is-first-extra-sheet {
            page-break-before: always !important;
            break-before: page !important;
          }
          .chapter-extra-sheet-wrapper.is-last-extra-sheet {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .chapter-extra-a4-sheet {
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            width: 281mm !important;
            max-width: 281mm !important;
            height: 194mm !important;
            min-height: 194mm !important;
            max-height: 194mm !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
            box-shadow: none !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .chapter-extra-a4-sheet * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* 개별/묶음 인쇄 모드: 선택된 표지/차례/쪽지시험 시트만 출력 */
          .printing-chapter-extras .study-sheet-wrapper:not(.is-selected-extra-print) {
            display: none !important;
          }
          .printing-chapter-extras .chapter-extra-sheet-wrapper.is-selected-extra-print.is-first-extra-sheet {
            page-break-before: avoid !important;
            break-before: avoid !important;
          }
          .printing-chapter-extras .chapter-extra-sheet-wrapper.is-selected-extra-print.is-single-extra-print {
            page-break-before: avoid !important;
            break-before: avoid !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
        }

        /* Screen Styles for Square Grids (자음 8×18, 모음 12×18, 자음모음 15×11) */
        table.square-grid-table {
          width: 100% !important;
          table-layout: fixed !important;
          border-collapse: collapse !important;
          margin: 0 auto !important;
        }
        table.square-grid-table th,
        table.square-grid-table td {
          padding: 0 !important;
          border: 1.5px solid #374151 !important;
          box-sizing: border-box !important;
          text-align: center !important;
          vertical-align: middle !important;
        }
        table.square-grid-table thead tr {
          height: 28px !important;
        }
        table.square-grid-table thead th {
          padding: 2px 0 !important;
        }
        table.square-grid-table tbody td {
          height: auto !important;
        }
        table.square-grid-table tbody td .cell-square-box {
          width: 100% !important;
          aspect-ratio: 1 / 1 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          position: relative !important;
          box-sizing: border-box !important;
        }
        table.combo-table th,
        table.combo-table td {
          width: 6.66% !important;
        }
        table.combo-table tbody td .cell-square-box {
          aspect-ratio: unset !important;
          height: 44px !important;
          max-height: 48px !important;
        }
        table.large-combo-table th:first-child,
        table.large-combo-table td:first-child {
          width: 4.8% !important;
        }
        table.large-combo-table th:not(:first-child),
        table.large-combo-table td:not(:first-child) {
          width: 13.6% !important;
        }

        .font-school-base,
        .font-korean-gothic {
          font-family: 'Hakgyoansim Bareondotum', '학교안심 바른돋움', 'NanumBarunGothic', sans-serif !important;
        }

        .font-school-hand,
        .font-badasseugi,
        .font-kyobo {
          font-family: 'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', 'KyoboHand', sans-serif !important;
          letter-spacing: -0.01em;
        }

        .wb-columns-grid {
          grid-template-columns: repeat(var(--wb-cols, 5), minmax(0, 1fr)) !important;
        }

        /* Mobile / Narrow Screen: Full Desktop Worksheet Fit-to-Screen View (Print is 100% Untouched) */
        @media screen and (max-width: 768px) {
          .study-sheet-wrapper {
            width: 100% !important;
            overflow: visible !important;
          }
          .study-sheet-wrapper .print-sheet,
          .study-sheet-wrapper .printable-a4-page,
          .study-sheet-wrapper .verb-worksheet-page {
            width: 100% !important;
            max-width: none !important;
          }
          .study-sheet-wrapper .flashcard-print-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 0.5rem !important;
          }
          .study-sheet-wrapper .jamo-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 1.25rem !important;
          }
          .study-sheet-wrapper .jamo-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
            gap: 0.75rem !important;
          }
          .study-sheet-wrapper .jamo-cols-5 {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 0.625rem !important;
          }
          .study-sheet-wrapper .verb-cards-grid {
            grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
            gap: 0.5rem !important;
          }
          .study-sheet-wrapper .particle-rows-grid {
            grid-template-rows: repeat(5, minmax(0, 1fr)) !important;
            gap: 0.375rem !important;
          }
          .study-sheet-wrapper .verb-tips-grid {
            grid-template-columns: 15fr 33fr !important;
            gap: 1rem !important;
          }
          .study-sheet-wrapper .word-trace-row {
            padding-left: 16px !important;
          }
          .study-sheet-wrapper .word-quiz-boxes-row {
            padding-left: 14px !important;
          }
          .study-sheet-wrapper .word-quiz-boxes {
            width: auto !important;
          }
          .study-sheet-wrapper .word-quiz-box {
            flex: none !important;
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>

      {/* Desktop Layer 2 Learning Control Bar */}
      {!isMenuCollapsed && onSelectMethod && (
        <DesktopControlBar
          activeTrack={sectionType}
          activeMethod={activeMethod}
          onSelectMethod={onSelectMethod}
          uiLang={uiLang}
          rightControls={desktopRightControls}
        />
      )}

      {/* Mobile Only Row 5 (< lg, Screen Only): Transparent 최하위 텍스트 메뉴 + [언어담기] + [1x1 단원드롭] [1x1 그리드] [1x1 인쇄] */}
      {!isMenuCollapsed && (
      <div
        className={`lg:hidden no-print sticky top-[80px] sm:top-[90px] ${
          isCustomLangOpen ? 'z-[35]' : 'z-[24]'
        } w-full bg-[#FFF5F8]/95 backdrop-blur-md pb-1 mb-1.5 select-none font-korean-gothic border-b ${
          sectionType === 'hangeul'
            ? 'border-amber-200/80'
            : sectionType === 'particle'
            ? 'border-emerald-200/80'
            : sectionType === 'verb'
            ? 'border-purple-200/80'
            : 'border-rose-200/80'
        }`}
      >
        <div className="flex flex-nowrap items-center justify-between gap-2 h-[38px] sm:h-[42px] px-2.5 sm:px-4 overflow-visible">
          {/* Left: Transparent-background lowest-level subtype text tabs */}
          {(() => {
            const tabUi = SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko;
            const isKoUi = (uiLang || 'ko') === 'ko';
            if (sectionType === 'hangeul') {
              return (
                <div className="flex items-center gap-3.5 sm:gap-6 min-w-0 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('jamo');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'jamo'
                        ? "text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.jamo} (${isKoUi ? subLabels.jamo : '자음모음'})`}
                  >
                    <span>{tabUi.studyTabs.jamo}</span>
                    <span className={`hidden md:inline text-[11px] font-bold ${studyMode === 'jamo' ? 'text-amber-800/85' : 'text-slate-400'}`}>
                      [{isKoUi ? subLabels.jamo : '자음모음'}]
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('basic');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'basic'
                        ? "text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.basic} (${isKoUi ? subLabels.basic : '기본글자'})`}
                  >
                    <span>{tabUi.studyTabs.basic}</span>
                    <span className={`hidden md:inline text-[11px] font-bold ${studyMode === 'basic' ? 'text-amber-800/85' : 'text-slate-400'}`}>
                      [{isKoUi ? subLabels.basic : '기본글자'}]
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('batchim');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'batchim'
                        ? "text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.batchim} (${isKoUi ? subLabels.batchim : '받침글자'})`}
                  >
                    <span>{tabUi.studyTabs.batchim}</span>
                    <span className={`hidden md:inline text-[11px] font-bold ${studyMode === 'batchim' ? 'text-amber-800/85' : 'text-slate-400'}`}>
                      [{isKoUi ? subLabels.batchim : '받침글자'}]
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('hangeulExam');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'hangeulExam'
                        ? "text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold'
                    }`}
                    title="한글 시험 (20강)"
                  >
                    <span>시험</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('jollaPlay');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'jollaPlay'
                        ? "text-amber-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-amber-400"
                        : 'text-slate-500 hover:text-amber-900 font-semibold'
                    }`}
                    title="졸라 놀이 학습지 (10종)"
                  >
                    <span>놀이</span>
                  </button>
                </div>
              );
            }
            if (sectionType === 'verb') {
              return (
                <div className="flex items-center gap-3.5 sm:gap-6 min-w-0 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('words');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'words'
                        ? "text-purple-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#7E22CE]"
                        : 'text-slate-500 hover:text-purple-900 font-semibold'
                    }`}
                    title={`${tabUi.studyTabs.verb} (${isKoUi ? subLabels.words : '용언 활용'})`}
                  >
                    <span>{tabUi.studyTabs.verb}</span>
                    <span className="hidden md:inline text-[11px] font-bold text-purple-700/80">
                      [{isKoUi ? subLabels.words : '용언 활용'}]
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('verbExam');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'verbExam'
                        ? "text-purple-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#7E22CE]"
                        : 'text-slate-500 hover:text-purple-900 font-semibold'
                    }`}
                    title="용언 종합 시험 6강"
                  >
                    <span>시험</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('verbPlay');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'verbPlay'
                        ? "text-purple-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#7E22CE]"
                        : 'text-slate-500 hover:text-purple-900 font-semibold'
                    }`}
                    title="용언 놀이 학습지 초안 5종 (1강)"
                  >
                    <span>놀이</span>
                  </button>
                </div>
              );
            }
            if (sectionType === 'particle') {
              return (
                <div className="flex items-center gap-3 sm:gap-5 min-w-0 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('particle');
                      setParticleSubMode('combination');
                      setSelectedJumpCh(0);
                      setSelectedParticleSection(PARTICLE_COMBINATION_OPTIONS[0]?.id || 'particle_unit1');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'particle' && particleSubMode === 'combination'
                        ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-bold'
                    }`}
                    title={`${tabUi.studyTabs.particle} (${isKoUi ? subLabels.particle : '조사 결합'})`}
                  >
                    <span>{tabUi.studyTabs.particle}</span>
                    <span className="hidden md:inline text-[11px] font-bold text-emerald-700/85">
                      [{isKoUi ? subLabels.particle : '조사 결합'}]
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('particle');
                      setParticleSubMode('sentence');
                      setSelectedJumpCh(0);
                      setSelectedParticleSection(PARTICLE_SENTENCE_OPTIONS[0]?.id || 'particle_unit3');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'particle' && particleSubMode === 'sentence'
                        ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-bold'
                    }`}
                    title={menuExtras.particleSentenceTab}
                  >
                    <span>{menuExtras.particleSentenceTab}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('particleExam');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'particleExam'
                        ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-bold'
                    }`}
                    title="조사 종합 시험 6강"
                  >
                    <span>시험</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setStudyMode('particlePlay');
                    }}
                    className={`relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] transition-colors ${
                      studyMode === 'particlePlay'
                        ? "text-emerald-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-emerald-600"
                        : 'text-slate-500 hover:text-emerald-950 font-bold'
                    }`}
                    title="조사 놀이 학습지 초안 5종 (1강)"
                  >
                    <span>놀이</span>
                  </button>
                </div>
              );
            }
            return (
              <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-5 min-w-0 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setStudyMode('cards');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    studyMode === 'cards'
                      ? "text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold'
                  }`}
                  title={`${tabUi.studyTabs.flashcards} (${isKoUi ? subLabels.cards : '그림카드'})`}
                >
                  <span>{tabUi.studyTabs.flashcards}</span>
                  <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'cards' ? 'text-rose-700/85' : 'text-slate-400'}`}>
                    [{isKoUi ? subLabels.cards : '그림카드'}]
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setStudyMode('writing');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    studyMode === 'writing'
                      ? "text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold'
                  }`}
                  title={`${tabUi.studyTabs.writing} (${isKoUi ? subLabels.writing : '따라쓰기'})`}
                >
                  <span>{tabUi.studyTabs.writing}</span>
                  <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'writing' ? 'text-rose-700/85' : 'text-slate-400'}`}>
                    [{isKoUi ? subLabels.writing : '따라쓰기'}]
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setStudyMode('quiz');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    studyMode === 'quiz'
                      ? "text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold'
                  }`}
                  title={`${tabUi.studyTabs.quiz} (${isKoUi ? subLabels.quiz : '받아쓰기'})`}
                >
                  <span>{tabUi.studyTabs.quiz}</span>
                  <span className={`hidden xl:inline text-[11px] font-bold ${studyMode === 'quiz' ? 'text-rose-700/85' : 'text-slate-400'}`}>
                    [{isKoUi ? subLabels.quiz : '받아쓰기'}]
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setStudyMode('classroomExam');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    studyMode === 'classroomExam'
                      ? "text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold'
                  }`}
                  title="교실 한국어 종합 시험 6강"
                >
                  <span>시험</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setStudyMode('classroomPlay');
                  }}
                  className={`relative py-1.5 px-0.5 sm:px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[11px] xs:text-[12.5px] sm:text-[14.5px] transition-colors ${
                    studyMode === 'classroomPlay'
                      ? "text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-[#D94A6B]"
                      : 'text-slate-500 hover:text-rose-900 font-semibold'
                  }`}
                  title="교실 한국어 놀이 학습지 초안 5종 (1강)"
                >
                  <span>놀이</span>
                </button>
              </div>
            );
          })()}

          {/* Right: (Classroom Lang Control) + [1x1 단원드롭] [1x1 그리드] [단원별인쇄] [전체인쇄] */}
          <div className="flex items-center gap-1 shrink-0 ml-auto">
            {sectionType === 'classroom' && (
              <div className="relative z-30 shrink-0">
                <>
                  <button
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setIsCustomLangOpen(prev => !prev);
                    }}
                    className="h-8 sm:h-8.5 px-1.5 sm:px-2.5 rounded-none bg-[#441A75] hover:bg-[#52208E] active:scale-[0.98] text-white shadow-none flex items-center gap-1 sm:gap-1.5 transition-all focus:outline-none cursor-pointer border border-[#6328A6]"
                    title={(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.pickLangsTitle}
                    aria-expanded={isCustomLangOpen}
                  >
                    <span className="text-xs sm:text-sm leading-none shrink-0" role="img" aria-label="Globe">🌐</span>
                    <span className="hidden md:inline text-xs font-bold text-white tracking-tight whitespace-nowrap">
                      {(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.pickLangs}
                    </span>
                    <span className="bg-[#FEF08A] text-[#1E0B36] font-extrabold text-[9px] sm:text-[10.5px] px-1 py-0.5 rounded-none whitespace-nowrap leading-none">
                      [{customSelectedLangs.length}/3]
                    </span>
                    <ChevronDown className={`w-3 h-3 text-white transition-transform shrink-0 ${isCustomLangOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* 다국어 커스텀 드롭다운 팝오버 (우측 정렬로 화면 밖 잘림 방지) */}
                  {isCustomLangOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[0.5px]"
                        onClick={() => setIsCustomLangOpen(false)}
                      />
                      <div className="absolute right-0 mt-1.5 w-[280px] xs:w-[320px] sm:w-[360px] max-w-[92vw] bg-white rounded-lg shadow-2xl border-2 border-[#441A75]/30 p-2.5 sm:p-3 z-50 font-korean-gothic text-xs text-slate-800 animate-in fade-in slide-in-from-top-1">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-100">
                          <span className="font-black text-purple-950 text-xs">
                            {(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.pickModalHeader}
                          </span>
                          <span className="text-[11px] font-extrabold text-[#1E0B36] bg-[#FEF08A] px-2 py-0.5 rounded-sm shadow-2xs">
                            [{customSelectedLangs.length}/3] {(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.selectedSuffix}
                          </span>
                        </div>

                        <div className="space-y-1">
                          {SUPPORTED_LANGUAGES.map(langMeta => {
                            const isChecked = customSelectedLangs.includes(langMeta.code);
                            const orderIdx = customSelectedLangs.indexOf(langMeta.code);
                            const prioritySfx = (SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.prioritySuffix;
                            return (
                              <button
                                key={langMeta.code}
                                type="button"
                                onClick={() => handleToggleCustomLang(langMeta.code)}
                                className={`w-full px-2.5 py-2 rounded-md flex items-center justify-between transition-colors text-left cursor-pointer border ${
                                  isChecked
                                    ? 'bg-purple-100/80 text-purple-950 font-black border-purple-300 shadow-2xs'
                                    : 'bg-white hover:bg-purple-50/80 text-slate-800 font-bold border-slate-200'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-base leading-none">{langMeta.flag}</span>
                                  <span className="font-bold">{langMeta.fullName}</span>
                                  {isChecked && (
                                    <span className="text-[10px] font-extrabold text-purple-700 bg-purple-200/80 px-1.5 py-0.2 rounded-sm">
                                      #{orderIdx + 1}{prioritySfx ? ` (${orderIdx + 1}${prioritySfx})` : ''}
                                    </span>
                                  )}
                                </div>
                                <div className={`w-4 h-4 rounded-sm flex items-center justify-center border text-[11px] font-bold ${
                                  isChecked
                                    ? 'bg-purple-700 border-purple-700 text-white'
                                    : 'border-slate-400 bg-white text-transparent'
                                }`}>
                                  ✓
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </>
              </div>
            )}

            {/* Unit Dropdown (1x1 icon for Hangeul & Grammar worksheets, single-line title bar for Classroom) */}
            {sectionType === 'hangeul' && studyMode === 'jamo' && (
              <CompactUnitSelectButton
                value={selectedJamoSection}
                onChange={(val) => {
                  setSelectedJamoSection(val);
                  const opt = JAMO_SECTION_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={JAMO_SECTION_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="amber"
                title="자음모음 페이지 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'hangeul' && studyMode === 'basic' && (
              <CompactUnitSelectButton
                value={selectedBasicSection}
                onChange={(val) => {
                  setSelectedBasicSection(val);
                  const opt = BASIC_SECTION_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={BASIC_SECTION_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="amber"
                title="기본글자 페이지 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'hangeul' && studyMode === 'batchim' && (
              <CompactUnitSelectButton
                value={selectedBatchimSection}
                onChange={(val) => {
                  setSelectedBatchimSection(val);
                  const opt = BATCHIM_SECTION_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={BATCHIM_SECTION_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="amber"
                title="받침글자 페이지 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'hangeul' && studyMode === 'hangeulExam' && (
              <CompactUnitSelectButton
                value={selectedHangeulExamSection}
                onChange={(val) => {
                  setSelectedHangeulExamSection(val);
                  const opt = HANGEUL_EXAM_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={HANGEUL_EXAM_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="amber"
                title="한글 시험 20강 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'hangeul' && studyMode === 'jollaPlay' && (
              <CompactUnitSelectButton
                value={selectedJollaPlaySection}
                onChange={(val) => {
                  setSelectedJollaPlaySection(val);
                  const opt = JOLLA_PLAY_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={JOLLA_PLAY_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="amber"
                title="졸라 놀이 학습지 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'particle' && studyMode === 'particle' && (() => {
              const targetOpts =
                particleSubMode === 'sentence'
                  ? PARTICLE_SENTENCE_OPTIONS
                  : PARTICLE_COMBINATION_OPTIONS;
              return (
                <CompactUnitSelectButton
                  value={selectedParticleSection}
                  onChange={(val) => {
                    setSelectedParticleSection(val);
                    const opt = targetOpts.find(o => o.id === val);
                    if (opt) handleJumpToSheet(opt.targetSheet);
                  }}
                  options={targetOpts.map(opt => ({ value: opt.id, label: opt.label }))}
                  theme="emerald"
                  title={particleSubMode === 'sentence' ? '문장 만들기 단원 선택' : '조사 결합 단원 선택'}
                  align="right"
                  className="w-[128px] xs:w-[165px] sm:w-[250px]"
                />
              );
            })()}
            {sectionType === 'verb' && studyMode === 'words' && (
              <CompactUnitSelectButton
                value={selectedWordsSection}
                onChange={(val) => {
                  setSelectedWordsSection(val);
                  const opt = WORDS_SECTION_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={WORDS_SECTION_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="purple"
                title="용언 활용 단원 선택"
                align="right"
                className="w-[128px] xs:w-[165px] sm:w-[250px]"
              />
            )}
            {sectionType === 'verb' && studyMode === 'verbExam' && (
              <CompactUnitSelectButton
                value={selectedVerbExamSection}
                onChange={(val) => {
                  setSelectedVerbExamSection(val);
                  const opt = VERB_EXAM_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={VERB_EXAM_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="purple"
                title="용언 종합 시험 6강 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'verb' && studyMode === 'verbPlay' && (
              <CompactUnitSelectButton
                value={selectedVerbPlaySection}
                onChange={(val) => {
                  setSelectedVerbPlaySection(val);
                  const opt = VERB_PLAY_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={VERB_PLAY_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="purple"
                title="용언 놀이 초안 5종 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'particle' && studyMode === 'particleExam' && (
              <CompactUnitSelectButton
                value={selectedParticleExamSection}
                onChange={(val) => {
                  setSelectedParticleExamSection(val);
                  const opt = PARTICLE_EXAM_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={PARTICLE_EXAM_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="emerald"
                title="조사 종합 시험 6강 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'particle' && studyMode === 'particlePlay' && (
              <CompactUnitSelectButton
                value={selectedParticlePlaySection}
                onChange={(val) => {
                  setSelectedParticlePlaySection(val);
                  const opt = PARTICLE_PLAY_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={PARTICLE_PLAY_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="emerald"
                title="조사 놀이 초안 5종 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'classroom' && studyMode !== 'classroomExam' && studyMode !== 'classroomPlay' && (
              <div className="hidden sm:block">
                <CompactUnitSelectButton
                  value={selectedJumpCh}
                  onChange={(val) => handleJumpToSheet(Number(val))}
                  options={CHAPTER_LIST.map(ch => ({
                    value: ch.ch,
                    label: getChapterCircledTitle(ch.ch, lang),
                  }))}
                  theme="rose"
                  title="교실 한국어 단원 선택"
                  align="right"
                  className="w-[165px] md:w-[220px] lg:w-[255px]"
                />
              </div>
            )}
            {sectionType === 'classroom' && studyMode === 'classroomExam' && (
              <CompactUnitSelectButton
                value={selectedClassroomExamSection}
                onChange={(val) => {
                  setSelectedClassroomExamSection(val);
                  const opt = CLASSROOM_EXAM_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={CLASSROOM_EXAM_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="rose"
                title="교실 한국어 종합 시험 6강 선택"
                align="right"
                compactIcon={true}
              />
            )}
            {sectionType === 'classroom' && studyMode === 'classroomPlay' && (
              <CompactUnitSelectButton
                value={selectedClassroomPlaySection}
                onChange={(val) => {
                  setSelectedClassroomPlaySection(val);
                  const opt = CLASSROOM_PLAY_OPTIONS.find(o => o.id === val);
                  if (opt) handleJumpToSheet(opt.targetSheet);
                }}
                options={CLASSROOM_PLAY_OPTIONS.map(opt => ({ value: opt.id, label: opt.label }))}
                theme="rose"
                title="교실 한국어 놀이 초안 5종 선택"
                align="right"
                compactIcon={true}
              />
            )}

            {/* 1x1 Overview Grid Button */}
            <button
              type="button"
              onClick={() => {
                playCutePop();
                setIsOverviewOpen(true);
              }}
              className={`h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none shadow-none active:scale-95 flex items-center justify-center transition-all cursor-pointer border shrink-0 ${
                sectionType === 'particle'
                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-emerald-300'
                  : sectionType === 'verb'
                  ? 'bg-purple-100 hover:bg-purple-200 text-purple-950 border-purple-300'
                  : sectionType === 'hangeul'
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                  : 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-300'
              }`}
              title={(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.overviewTitle}
              aria-label={(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.overviewTitle}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
            </button>

            {/* 1x1 단원별인쇄 (PC Only: Classroom Cards/Writing/Quiz) */}
            {sectionType === 'classroom' && studyMode !== 'classroomExam' && studyMode !== 'classroomPlay' && (
              <button
                type="button"
                onClick={handlePrintTripleSet}
                className="hidden sm:flex h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none bg-slate-200 hover:bg-slate-300 text-slate-800 shadow-none active:scale-95 items-center justify-center transition-all cursor-pointer border border-slate-300 shrink-0"
                title={`${(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.unitPrintTitle}: ${currentChapterObj.circledTitle}`}
                aria-label={(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.unitPrintTitle}
              >
                <Layers className="w-4 h-4 shrink-0" />
              </button>
            )}

            {/* 1x1 표지·차례 바로가기 */}
            {studyMode !== 'hangeulExam' &&
              studyMode !== 'jollaPlay' &&
              studyMode !== 'verbExam' &&
              studyMode !== 'verbPlay' &&
              studyMode !== 'particleExam' &&
              studyMode !== 'particlePlay' &&
              studyMode !== 'classroomExam' &&
              studyMode !== 'classroomPlay' && (
              <button
                type="button"
                onClick={scrollToChapterExtras}
                className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none bg-white hover:bg-slate-100 text-slate-800 shadow-none active:scale-95 flex items-center justify-center transition-all cursor-pointer border border-slate-300 shrink-0"
                title="맨 아래 표지·차례로 이동"
                aria-label="표지·차례로 이동"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
              </button>
            )}

            {/* 1x1 전체인쇄 */}
            <button
              type="button"
              onClick={handlePrintAll}
              className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none bg-slate-200 hover:bg-slate-300 text-slate-800 shadow-none active:scale-95 flex items-center justify-center transition-all cursor-pointer border border-slate-300 shrink-0"
              title={(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.allPrintTitle}
              aria-label={(SUBTAB_UI[uiLang || 'ko'] || SUBTAB_UI.ko).studyControls.allPrintPrefix}
            >
              <Printer className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Main Worksheet Container */}
      <div className="study-worksheets-container w-full max-w-[1600px] mx-auto flex flex-col items-center space-y-3 sm:space-y-8 px-1 sm:px-4">
        {studyMode === 'jamo' ? (
          /* 7. 한글 자음·모음 16개 학습지 순차 렌더링 */
          <>
            {/* 1장: 자음 쓰기 학습지 (8×18) */}
            <div
              id="study-jamo-sheet-0"
              data-sheet-idx={0}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <ConsonantsWorksheetPage key="study-jamo-p1-roma-v2" interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 2장: 모음 쓰기 학습지 (12×18) */}
            <div
              id="study-jamo-sheet-1"
              data-sheet-idx={1}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <VowelsWorksheetPage key="study-jamo-p2-roma-v2" interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 3장: 자음·모음 결합 따라쓰기 (15×11, 140글자 회색 가이드) */}
            <div
              id="study-jamo-sheet-2"
              data-sheet-idx={2}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <ComboTracingWorksheetPage key="study-jamo-p3-roma-v2" interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 4장: 자음·모음 결합 빈칸 스스로 쓰기 조합표 (15×11) */}
            <div
              id="study-jamo-sheet-3"
              data-sheet-idx={3}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <ComboWorksheetPage key="study-jamo-p4-roma-v2" interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 5장: 자음 쓰기 (ㄱ~ㄹ) 획순별 색상 본보기 & 따라쓰기 학습지 */}
            <div
              id="study-jamo-sheet-4"
              data-sheet-idx={4}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <ConsonantsStrokeWorksheetPage interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 6장: 자음 쓰기 (ㅁ~ㅇ) 획순별 색상 본보기 & 따라쓰기 학습지 */}
            <div
              id="study-jamo-sheet-5"
              data-sheet-idx={5}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <ConsonantsStrokeWorksheetPage2 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 7장: 자음 쓰기 (ㅈ~ㅋ) 획순별 색상 본보기 & 따라쓰기 학습지 */}
            <div
              id="study-jamo-sheet-6"
              data-sheet-idx={6}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <ConsonantsStrokeWorksheetPage3 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 8장: 자음 쓰기 (ㅌ~ㅎ) 획순별 색상 본보기 & 따라쓰기 학습지 */}
            <div
              id="study-jamo-sheet-7"
              data-sheet-idx={7}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <ConsonantsStrokeWorksheetPage4 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 9장: 쌍자음 쓰기 (ㄲ~ㅉ) 획순별 색상 본보기 & 따라쓰기 학습지 */}
            <div
              id="study-jamo-sheet-8"
              data-sheet-idx={8}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <ConsonantsStrokeWorksheetPage5 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 10장: 모음 쓰기 1쪽 (기본형 4자: ㅏ, ㅑ, ㅓ, ㅕ) */}
            <div
              id="study-jamo-sheet-9"
              data-sheet-idx={9}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <VowelsStrokeWorksheetPage1 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 11장: 모음 쓰기 2쪽 (상하형 4자: ㅗ, ㅛ, ㅜ, ㅠ) */}
            <div
              id="study-jamo-sheet-10"
              data-sheet-idx={10}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <VowelsStrokeWorksheetPage2 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 12장: 모음 쓰기 3쪽 (결합 원리 3자: ㅡ, ㅣ, ㅢ) */}
            <div
              id="study-jamo-sheet-11"
              data-sheet-idx={11}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <VowelsStrokeWorksheetPage3 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 13장: 모음 쓰기 4쪽 ('ㅣ' 결합형 4자: ㅐ, ㅒ, ㅔ, ㅖ) */}
            <div
              id="study-jamo-sheet-12"
              data-sheet-idx={12}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <VowelsStrokeWorksheetPage4 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 14장: 모음 쓰기 5쪽 (소리 결합 3자: ㅘ, ㅝ, ㅟ) */}
            <div
              id="study-jamo-sheet-13"
              data-sheet-idx={13}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <VowelsStrokeWorksheetPage5 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>

            {/* 15장: 모음 쓰기 6쪽 (발음 같은 삼총사 3자: ㅚ, ㅙ, ㅞ) */}
            <div
              id="study-jamo-sheet-14"
              data-sheet-idx={14}
              className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
            >
              <MobileScaledWorksheetWrapper desktopWidth={990}>
                <VowelsStrokeWorksheetPage6 interactiveAudio={true} />
              </MobileScaledWorksheetWrapper>
            </div>
          </>
        ) : studyMode === 'basic' ? (
          /* [기본글자] 총 21쪽: 자음·모음 결합 원리 & 단어 쓰기 */
          <>
            {BASIC_LETTERS_DATA.map((pageData, idx) => (
              <div
                key={pageData.pageNumber}
                id={`study-basic-sheet-${idx}`}
                data-sheet-idx={idx}
                className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
              >
                <MobileScaledWorksheetWrapper desktopWidth={990}>
                  <BasicLetterWorksheetPage pageIndex={idx} pageData={pageData} interactiveAudio={true} />
                </MobileScaledWorksheetWrapper>
              </div>
            ))}
          </>
        ) : studyMode === 'batchim' ? (
          /* [받침글자] 1~15쪽 순차 렌더링 */
          <>
            {BATCHIM_PAGES_DATA.map((pageData, idx) => (
              <div
                key={pageData.pageNumber}
                id={`study-batchim-sheet-${idx}`}
                data-sheet-idx={idx}
                className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
              >
                <MobileScaledWorksheetWrapper desktopWidth={990}>
                  <BatchimWorksheetPage pageIndex={idx} pageData={pageData} interactiveAudio={true} />
                </MobileScaledWorksheetWrapper>
              </div>
            ))}
          </>
        ) : studyMode === 'hangeulExam' ? (
          /* [한글 - 학습지 - 시험] 4파트 × 5강 = 총 20강 ( / ) 고르기 쪽지시험 */
          <>
            {/* Part Filter Bar (Web-only) */}
            <div className="no-print w-full max-w-[1040px] mx-auto bg-white border border-amber-200 rounded-xl px-3.5 py-2.5 shadow-2xs flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    setExamPartFilter('all');
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-black cursor-pointer transition-colors border ${
                    examPartFilter === 'all'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  전체 20강
                </button>
                {HANGEUL_EXAM_PARTS.map((part) => (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => {
                      playCutePop();
                      setExamPartFilter(part.id);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-black cursor-pointer transition-colors border ${
                      examPartFilter === part.id
                        ? 'text-white border-transparent'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                    style={
                      examPartFilter === part.id
                        ? { backgroundColor: part.accentHex }
                        : undefined
                    }
                  >
                    {part.partNumber} · {part.shortLabel} (5강)
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-bold text-slate-500">
                해볼 한국어 기존 데이터 100% 기반 · A4 가로 1장 = 1강 (10문항)
              </span>
            </div>

            {HANGEUL_EXAM_LESSONS.filter(
              (lesson) => examPartFilter === 'all' || lesson.partId === examPartFilter
            ).map((lesson) => {
              const printKey = `exam-${lesson.globalIndex}`;
              return (
                <div
                  key={lesson.id}
                  id={`study-exam-sheet-${lesson.globalIndex}`}
                  data-sheet-idx={lesson.globalIndex}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    singleSheetPrintKey === printKey
                      ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                      : ''
                  }`}
                >
                  <div className="no-print w-full max-w-[1040px] flex items-center justify-between mb-1.5 px-1">
                    <span className="text-xs font-extrabold text-slate-600">
                      {lesson.globalIndex + 1} / 20 · {lesson.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePrintSingleSheet(printKey)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-amber-50 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-600" />
                      이 시험지 1장 인쇄
                    </button>
                  </div>
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <HangeulExamSheet lesson={lesson} />
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            })}
          </>
        ) : studyMode === 'jollaPlay' ? (
          /* [한글 - 학습지 - 놀이] 졸라 보드게임·빙고·동기부여 학습지 10종 (A4 가로모드) */
          <>
            {[
              { idx: 0, label: '① 자음·모음 땅 차지하기 (졸라 보드게임)', width: 1040, node: <JollaJamoTerritoryBoardSheet /> },
              { idx: 1, label: '② 졸라맨 자음 빙고게임 (2판 1장)', width: 1040, node: <JollaConsonantBingoSheet /> },
              { idx: 2, label: '③ 졸라맨 모음 빙고게임 (2판 1장)', width: 1040, node: <JollaVowelBingoSheet /> },
              { idx: 3, label: '④ [동기부여 ①] 한글산 20칸 등산 도장판', width: 1040, node: <JollaMountainStampSheet /> },
              { idx: 4, label: '⑤ [동기부여 ②] 주사위 글자 공장 챌린지', width: 1040, node: <JollaDiceFactorySheet /> },
              { idx: 5, label: '⑥ [동기부여 ③] 한글 영웅 상장 & 쿠폰 3종', width: 1040, node: <JollaHeroAwardCouponSheet /> },
              { idx: 6, label: '⑦ 숨은 졸라한글맨 찾기', width: 990, node: <JollaHiddenLettersSheet /> },
              { idx: 7, label: '⑧ 기본글자 땅따먹기', width: 990, node: <JollaTerritoryGameSheet /> },
              { idx: 8, label: '⑨ 졸라한글맨 낱말 미로 탈출', width: 990, node: <JollaMazeGameSheet /> },
              { idx: 9, label: '⑩ 자모·낱말 3×3 초스피드 빙고', width: 990, node: <JollaBingoGameSheet /> },
            ].map((item) => {
              const printKey = `play-${item.idx}`;
              return (
                <div
                  key={item.idx}
                  id={`study-jolla-sheet-${item.idx}`}
                  data-sheet-idx={item.idx}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    singleSheetPrintKey === printKey
                      ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                      : ''
                  }`}
                >
                  <div className="no-print w-full max-w-[1040px] flex items-center justify-between mb-1.5 px-1">
                    <span className="text-xs font-extrabold text-slate-600">{item.label}</span>
                    <button
                      type="button"
                      onClick={() => handlePrintSingleSheet(printKey)}
                      className="px-2.5 py-1 rounded-md bg-white hover:bg-amber-50 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-600" />
                      이 학습지 1장 인쇄
                    </button>
                  </div>
                  <MobileScaledWorksheetWrapper desktopWidth={item.width}>
                    {item.node}
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            })}
          </>
        ) : studyMode === 'particleExam' ? (
          /* [조사 - 학습지 - 시험] 5단원씩 묶어 섞은 종합 시험 총 6강 (A4 가로 6장) */
          <>
            {PARTICLE_EXAM_LESSONS.map((lesson) => {
              const printKey = `particle-exam-${lesson.globalIndex}`;
              return (
                <div
                  key={lesson.id}
                  id={`study-particle-exam-sheet-${lesson.globalIndex}`}
                  data-sheet-idx={lesson.globalIndex}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    singleSheetPrintKey === printKey
                      ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                      : ''
                  }`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <ParticleExamSheet
                      lesson={lesson}
                      lang={lang}
                      onPrintSingle={() => handlePrintSingleSheet(printKey)}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            })}
          </>
        ) : studyMode === 'particlePlay' ? (
          /* [조사 - 학습지 - 놀이] 1강(1~5단원) 놀이 학습지 초안 5종 (A4 가로 5장) */
          <>
            {PARTICLE_PLAY_SHEETS_META.map((sheet) => {
              const printKey = `particle-play-${sheet.idx}`;
              return (
                <div
                  key={sheet.id}
                  id={`study-particle-play-sheet-${sheet.idx}`}
                  data-sheet-idx={sheet.idx}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    singleSheetPrintKey === printKey
                      ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                      : ''
                  }`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <ParticlePlayDraftSheet
                      sheetIndex={sheet.idx}
                      lang={lang}
                      onPrintSingle={() => handlePrintSingleSheet(printKey)}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            })}
          </>
        ) : studyMode === 'classroomExam' ? (
          /* [교실한국어 - 학습지 - 시험] 5단원씩 묶어 섞은 종합 시험 총 6강 (A4 가로 6장) */
          <>
            {CLASSROOM_EXAM_LESSONS.map((lesson) => {
              const printKey = `classroom-exam-${lesson.globalIndex}`;
              return (
                <div
                  key={lesson.id}
                  id={`study-classroom-exam-sheet-${lesson.globalIndex}`}
                  data-sheet-idx={lesson.globalIndex}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    singleSheetPrintKey === printKey
                      ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                      : ''
                  }`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <ClassroomExamSheet
                      lesson={lesson}
                      lang={lang}
                      onPrintSingle={() => handlePrintSingleSheet(printKey)}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            })}
          </>
        ) : studyMode === 'classroomPlay' ? (
          /* [교실한국어 - 학습지 - 놀이] 1강(1~5과) 놀이 학습지 초안 5종 (A4 가로 5장) */
          <>
            {CLASSROOM_PLAY_SHEETS_META.map((sheet) => {
              const printKey = `classroom-play-${sheet.idx}`;
              return (
                <div
                  key={sheet.id}
                  id={`study-classroom-play-sheet-${sheet.idx}`}
                  data-sheet-idx={sheet.idx}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    singleSheetPrintKey === printKey
                      ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                      : ''
                  }`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <ClassroomPlayDraftSheet
                      sheetIndex={sheet.idx}
                      lang={lang}
                      onPrintSingle={() => handlePrintSingleSheet(printKey)}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            })}
          </>
        ) : studyMode === 'verbExam' ? (
          /* [용언 - 학습지 - 시험] 5단원씩 묶어 섞은 종합 시험 총 6강 (A4 가로 6장) */
          <>
            {VERB_EXAM_LESSONS.map((lesson) => {
              const printKey = `verb-exam-${lesson.globalIndex}`;
              return (
                <div
                  key={lesson.id}
                  id={`study-verb-exam-sheet-${lesson.globalIndex}`}
                  data-sheet-idx={lesson.globalIndex}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    singleSheetPrintKey === printKey
                      ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                      : ''
                  }`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <VerbExamSheet
                      lesson={lesson}
                      lang={lang}
                      onPrintSingle={() => handlePrintSingleSheet(printKey)}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            })}
          </>
        ) : studyMode === 'verbPlay' ? (
          /* [용언 - 학습지 - 놀이] 1강(1~5단원) 놀이 학습지 초안 5종 (A4 가로 5장) */
          <>
            {VERB_PLAY_SHEETS_META.map((sheet) => {
              const printKey = `verb-play-${sheet.idx}`;
              return (
                <div
                  key={sheet.id}
                  id={`study-verb-play-sheet-${sheet.idx}`}
                  data-sheet-idx={sheet.idx}
                  className={`study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    singleSheetPrintKey === printKey
                      ? 'is-selected-extra-print chapter-extra-sheet-wrapper is-single-extra-print'
                      : ''
                  }`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <VerbPlayDraftSheet
                      sheetIndex={sheet.idx}
                      lang={lang}
                      onPrintSingle={() => handlePrintSingleSheet(printKey)}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>
              );
            })}
          </>
        ) : studyMode === 'words' ? (
          /* [용언활용] 1~30단원 30장 순차 렌더링 */
          <>
            {VERB_UNIT_META.map((u, idx) => (
              <div
                key={u.id}
                id={`study-words-sheet-${idx}`}
                data-sheet-idx={idx}
                className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 print:mb-0"
              >
                <MobileScaledWorksheetWrapper desktopWidth={1040}>
                  <VerbConjugationWorksheetPage unit={u.id} lang={lang} />
                </MobileScaledWorksheetWrapper>
              </div>
            ))}
          </>
        ) : studyMode === 'particle' ? (
          /* [조사 결합 / 문장 만들기] 단원 순차 렌더링 */
          <>
            {(particleSubMode === 'sentence'
              ? PARTICLE_SENTENCE_UNITS
              : PARTICLE_COMBINATION_UNITS
            ).map((u, idx) => (
              <div
                key={u.id}
                id={`study-particle-sheet-${idx}`}
                data-sheet-idx={idx}
                className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 print:mb-0"
              >
                <MobileScaledWorksheetWrapper desktopWidth={1040}>
                  <ParticleWorksheetPage unit={u.id} lang={lang} />
                </MobileScaledWorksheetWrapper>
              </div>
            ))}
          </>
        ) : (
          /* 그림카드, 따라쓰기, 받아쓰기 30개 단원 렌더링 */
          CHAPTER_LIST.map((chObj) => {
            const items = vocabulary.filter(v => v.ch === chObj.ch);
            return (
              <div
                key={chObj.ch}
                id={`study-sheet-ch-${chObj.ch}`}
                data-sheet-idx={chObj.ch}
                className="study-sheet-wrapper w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
              >
                <MobileScaledWorksheetWrapper desktopWidth={990}>
                  {/* Worksheet Content based on active studyMode */}
                  {studyMode === 'cards' ? (
                    <PrintableWorksheetPage
                      chapter={chObj}
                      items={items}
                      selectedLangs={customSelectedLangs}
                      interactiveAudio={true}
                    />
                  ) : (
                    <PrintableWordWorksheetPage
                      chapter={chObj}
                      items={items}
                      mode={studyMode === 'quiz' ? 'quiz' : 'writing'}
                      selectedLangs={customSelectedLangs}
                      interactiveAudio={true}
                    />
                  )}
                </MobileScaledWorksheetWrapper>
              </div>
            );
          })
        )}

        {/* 각 챕터 학습지 가장 아래: [A4 가로 표지] + [A4 가로 차례] (2장 전용) */}
        {!isPrintingTripleSet &&
          studyMode !== 'hangeulExam' &&
          studyMode !== 'jollaPlay' &&
          studyMode !== 'verbExam' &&
          studyMode !== 'verbPlay' &&
          studyMode !== 'particleExam' &&
          studyMode !== 'particlePlay' &&
          studyMode !== 'classroomExam' &&
          studyMode !== 'classroomPlay' && (() => {
            const classroomVariant =
              studyMode === 'writing'
                ? 'writing'
                : studyMode === 'quiz'
                ? 'quiz'
                : 'cards';
            const coverSectionLabel =
              sectionType === 'classroom'
                ? classroomVariant === 'writing'
                  ? '교실 한국어 [따라쓰기] 제본용 표지 · 차례 (A4 가로)'
                  : classroomVariant === 'quiz'
                  ? '교실 한국어 [받아쓰기] 제본용 표지 · 차례 (A4 가로)'
                  : '교실 한국어 [그림카드] 제본용 표지 · 차례 (A4 가로)'
                : '챕터 제본용 표지 · 차례 (A4 가로)';

            return (
              <>
                <div
                  id="chapter-bottom-extras"
                  className="no-print w-full max-w-[1040px] mx-auto mt-6 pt-6 border-t-2 border-dashed border-slate-300 scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-slate-700 shrink-0" />
                      <div>
                        <div className="text-sm font-black text-slate-900">
                          {coverSectionLabel}
                        </div>
                        <div className="text-xs font-semibold text-slate-500">
                          표지·차례만 골라 바로 인쇄하거나 2장을 한 번에 인쇄할 수 있어요.
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handlePrintChapterExtras('cover')}
                        className="px-2.5 py-1.5 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        표지 인쇄
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePrintChapterExtras('toc')}
                        className="px-2.5 py-1.5 rounded-md text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        차례 인쇄
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePrintChapterExtras('all-extras')}
                        className="px-3 py-1.5 rounded-md text-xs font-black bg-slate-800 hover:bg-slate-900 text-white border border-slate-900 cursor-pointer flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        2장 모두 인쇄
                      </button>
                    </div>
                  </div>
                </div>

                {/* 1) A4 가로 챕터 표지 */}
                <div
                  id={`chapter-cover-sheet-${sectionType}-${classroomVariant}`}
                  className={`study-sheet-wrapper chapter-extra-sheet-wrapper is-first-extra-sheet w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    extraPrintTarget === 'all-extras' || extraPrintTarget === 'cover'
                      ? 'is-selected-extra-print'
                      : ''
                  } ${extraPrintTarget === 'cover' ? 'is-single-extra-print' : ''}`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <ChapterCoverSheet
                      track={sectionType}
                      lang={lang}
                      classroomVariant={classroomVariant}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>

                {/* 2) A4 가로 챕터 차례 */}
                <div
                  id={`chapter-toc-sheet-${sectionType}-${classroomVariant}`}
                  className={`study-sheet-wrapper chapter-extra-sheet-wrapper is-last-extra-sheet w-full flex flex-col items-center scroll-mt-[124px] sm:scroll-mt-[138px] lg:scroll-mt-4 ${
                    extraPrintTarget === 'all-extras' || extraPrintTarget === 'toc'
                      ? 'is-selected-extra-print'
                      : ''
                  } ${extraPrintTarget === 'toc' ? 'is-single-extra-print' : ''}`}
                >
                  <MobileScaledWorksheetWrapper desktopWidth={1040}>
                    <ChapterTocSheet
                      track={sectionType}
                      lang={lang}
                      classroomVariant={classroomVariant}
                    />
                  </MobileScaledWorksheetWrapper>
                </div>
              </>
            );
          })()}

        {/* 단원별 3종세트 (그림카드 + 쓰기학습지 + 테스트지) 전용 인쇄 컨테이너 */}
        {isPrintingTripleSet && (() => {
          const chObj = CHAPTER_LIST.find(c => c.ch === selectedJumpCh) || CHAPTER_LIST[0];
          const items = vocabulary.filter(v => v.ch === chObj.ch);
          return (
            <div className="triple-print-container w-full">
              <div className="triple-print-item w-full flex flex-col items-center">
                <PrintableWorksheetPage
                  chapter={chObj}
                  items={items}
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={false}
                />
              </div>
              <div className="triple-print-item w-full flex flex-col items-center">
                <PrintableWordWorksheetPage
                  chapter={chObj}
                  items={items}
                  mode="writing"
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={false}
                />
              </div>
              <div className="triple-print-item w-full flex flex-col items-center">
                <PrintableWordWorksheetPage
                  chapter={chObj}
                  items={items}
                  mode="quiz"
                  selectedLangs={customSelectedLangs}
                  interactiveAudio={false}
                />
              </div>
            </div>
          );
        })()}
      </div>

      {/* Floating Scroll-to-Top Button Only (모아보기 플로팅 버튼 제거됨) */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="no-print fixed bottom-4 right-3 sm:bottom-6 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-white/95 hover:bg-rose-50 active:scale-95 text-rose-900 border-2 border-rose-300 shadow-[0_6px_20px_rgba(217,74,107,0.22)] flex items-center justify-center transition-all cursor-pointer"
          aria-label="맨 위로 이동"
          title="맨 위로 이동"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Overview Grid Modal */}
      <OverviewGridModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        title={overviewConfig.title}
        subtitle={overviewConfig.subtitle}
        accentTheme={overviewConfig.accentTheme}
        items={overviewConfig.items}
        onSelectItem={(item) => handleJumpToSheet(item.targetIdx)}
        uiLang={uiLang}
      />
    </div>
  );
};
