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

export const HANGEUL_GROUP_TO_SHEET: Record<
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

export const JAMO_SHEET_ITEMS = [
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

export const JAMO_SECTION_OPTIONS = [
  { id: 'chart', label: '1~4쪽 자음모음표', targetSheet: 0 },
  { id: 'consonants', label: '5~9쪽 자음', targetSheet: 4 },
  { id: 'vowels', label: '10~15쪽 모음', targetSheet: 9 },
];

export const BASIC_SECTION_OPTIONS = [
  { id: 'basic_1_6', label: '1~6쪽 ㅏㅓㅗㅜㅡㅣ', targetSheet: 0 },
  { id: 'basic_7_10', label: '7~10쪽 ㅑㅕㅛㅠ', targetSheet: 6 },
  { id: 'basic_11_14', label: '11~14쪽 ㅐㅔㅒㅖ', targetSheet: 10 },
  { id: 'basic_15_18', label: '15~18쪽 ㅘㅝㅚㅟ', targetSheet: 14 },
  { id: 'basic_19_21', label: '19~21쪽 ㅙㅞㅢ', targetSheet: 18 },
];

export const BATCHIM_SECTION_OPTIONS = [
  { id: 'batchim_1_7', label: '1~7쪽 대표 받침 (ㅁ, ㅂ, ㅇ, ㄱ, ㄴ, ㄹ, ㄷ)', targetSheet: 0 },
  { id: 'batchim_8_11', label: '8~11쪽 받침 가족 (ㄱ/ㅂ/ㄷ 가족)', targetSheet: 7 },
  { id: 'batchim_12', label: '12쪽 겹받침 ① 앞 자음 발음 1 (ㄳ, ㄵ, ㄼ)', targetSheet: 11 },
  { id: 'batchim_13', label: '13쪽 겹받침 ② 앞 자음 발음 2 (ㄽ, ㄾ, ㅄ)', targetSheet: 12 },
  { id: 'batchim_14', label: '14쪽 겹받침 ③ 뒤 자음 발음 (ㄺ, ㄻ, ㄿ)', targetSheet: 13 },
  { id: 'batchim_15', label: '15쪽 겹받침 ④ ㅎ이 있는 받침 (ㄶ, ㅀ)', targetSheet: 14 },
];

export const JOLLA_PLAY_OPTIONS = [
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

export const JOLLA_PLAY_ITEMS = [
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

export const WORDS_SECTION_OPTIONS = [
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
