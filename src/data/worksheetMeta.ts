export interface SheetMetaItem {
  id: number;
  title: string;
  subtitle: string;
}

export interface SectionDropdownOption {
  id: string;
  label: string;
  targetSheet: number;
}

export const JAMO_SHEET_ITEMS: SheetMetaItem[] = [
  { id: 0, title: '① 자음 쓰기 (Consonant Writing)', subtitle: '기초 자음 14자 8회 따라쓰기' },
  { id: 1, title: '② 모음 쓰기 (Vowel Writing)', subtitle: '기본 모음 10자 & 복합 모음 11자 + ♡' },
  { id: 2, title: '③ 자음·모음표 따라 쓰기 (Complete the Chart)', subtitle: '14자음 × 10모음 140글자 회색 따라쓰기' },
  { id: 3, title: '④ 자음·모음표 스스로 쓰기 (Consonant Stroke Order)', subtitle: '한글 음절 조합표 빈칸 스스로쓰기' },
  { id: 4, title: '⑤ 자음 획순 따라 쓰기 ㄱ~ㄹ (Consonant Stroke Order)', subtitle: '획순별 색상 본보기 & 따라쓰기' },
  { id: 5, title: '⑥ 자음 획순 따라 쓰기 ㅁ~ㅇ (Consonant Stroke Order)', subtitle: '획순별 색상 본보기 & 따라쓰기' },
  { id: 6, title: '⑦ 자음 획순 따라 쓰기 ㅈ~ㅋ (Consonant Stroke Order)', subtitle: '획순별 색상 본보기 & 따라쓰기' },
  { id: 7, title: '⑧ 자음 획순 따라 쓰기 ㅌ~ㅎ (Consonant Stroke Order)', subtitle: '획순별 색상 본보기 & 따라쓰기' },
  { id: 8, title: '⑨ 쌍자음 획순 따라 쓰기 ㄲ~ㅉ (Double Consonant Stroke)', subtitle: '획순별 색상 본보기 & 따라쓰기' },
  { id: 9, title: '⑩ 모음 획순 따라 쓰기 ㅏ·ㅑ·ㅓ·ㅕ (Vowel Stroke Order)', subtitle: 'ㅏ, ㅑ, ㅓ, ㅕ (획순별 색상 & 따라쓰기)' },
  { id: 10, title: '⑪ 모음 획순 따라 쓰기 ㅗ·ㅛ·ㅜ·ㅠ (Vowel Stroke Order)', subtitle: 'ㅗ, ㅛ, ㅜ, ㅠ (획순별 색상 & 따라쓰기)' },
  { id: 11, title: '⑫ 모음 획순 따라 쓰기 ㅡ·ㅣ·ㅢ (Vowel Stroke Order)', subtitle: 'ㅡ, ㅣ, ㅢ (획순별 색상 & 따라쓰기)' },
  { id: 12, title: '⑬ 모음 획순 따라 쓰기 ㅐ·ㅒ·ㅔ·ㅖ (Vowel Stroke Order)', subtitle: 'ㅐ, ㅒ, ㅔ, ㅖ (획순별 색상 & 따라쓰기)' },
  { id: 13, title: '⑭ 모음 획순 따라 쓰기 ㅘ·ㅝ·ㅟ (Vowel Stroke Order)', subtitle: 'ㅘ, ㅝ, ㅟ (획순별 색상 & 따라쓰기)' },
  { id: 14, title: '⑮ 모음 획순 따라 쓰기 ㅚ·ㅙ·ㅞ (Vowel Stroke Order)', subtitle: 'ㅚ, ㅙ, ㅞ (획순별 색상 & 따라쓰기)' },
];

export const JAMO_SECTION_OPTIONS: SectionDropdownOption[] = [
  { id: 'chart', label: '1~4쪽 자음모음표', targetSheet: 0 },
  { id: 'consonants', label: '5~9쪽 자음', targetSheet: 4 },
  { id: 'vowels', label: '10~15쪽 모음', targetSheet: 9 },
];

export const BASIC_SECTION_OPTIONS: SectionDropdownOption[] = [
  { id: 'basic_1_6', label: '1~6쪽 ㅏㅓㅗㅜㅡㅣ', targetSheet: 0 },
  { id: 'basic_7_10', label: '7~10쪽 ㅑㅕㅛㅠ', targetSheet: 6 },
  { id: 'basic_11_14', label: '11~14쪽 ㅐㅔㅒㅖ', targetSheet: 10 },
  { id: 'basic_15_18', label: '15~18쪽 ㅘㅝㅚㅟ', targetSheet: 14 },
  { id: 'basic_19_21', label: '19~21쪽 ㅙㅞㅢ', targetSheet: 18 },
];

export const BATCHIM_SECTION_OPTIONS: SectionDropdownOption[] = [
  { id: 'batchim_1_7', label: '1~7쪽 대표 받침 (ㅁ, ㅂ, ㅇ, ㄱ, ㄴ, ㄹ, ㄷ)', targetSheet: 0 },
  { id: 'batchim_8_11', label: '8~11쪽 받침 가족 (ㄱ/ㅂ/ㄷ 가족)', targetSheet: 7 },
  { id: 'batchim_12', label: '12쪽 겹받침 ① 앞 자음 발음 1 (ㄳ, ㄵ, ㄼ)', targetSheet: 11 },
  { id: 'batchim_13', label: '13쪽 겹받침 ② 앞 자음 발음 2 (ㄽ, ㄾ, ㅄ)', targetSheet: 12 },
  { id: 'batchim_14', label: '14쪽 겹받침 ③ 뒤 자음 발음 (ㄺ, ㄻ, ㄿ)', targetSheet: 13 },
  { id: 'batchim_15', label: '15쪽 겹받침 ④ ㅎ이 있는 받침 (ㄶ, ㅀ)', targetSheet: 14 },
];

export const WORDS_SECTION_OPTIONS: SectionDropdownOption[] = [
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

export const WORDBOOK_SHEET_ITEMS: SheetMetaItem[] = [
  { id: 0, title: '① 교실한국어 1~150번 (150단어)', subtitle: '단원 ①~⑮ (150단어)' },
  { id: 1, title: '② 교실한국어 151~300번 (150단어)', subtitle: '단원 ⑯~㉚ (150단어)' },
  { id: 2, title: '③ 용언 활용 1~30단원 (150단어)', subtitle: '기본형 동사·형용사 (150단어)' },
  { id: 3, title: '④ 조사 결합 1~30단원 (150단어)', subtitle: '예문 명사·대명사 (150단어)' },
];
