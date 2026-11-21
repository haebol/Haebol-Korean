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

export interface VerbUnitOption {
  id:
    | 'unit1' | 'unit2' | 'unit3' | 'unit4' | 'unit5'
    | 'unit6' | 'unit7' | 'unit8' | 'unit9' | 'unit10'
    | 'unit11' | 'unit12' | 'unit13' | 'unit14' | 'unit15'
    | 'unit16' | 'unit17' | 'unit18' | 'unit19' | 'unit20'
    | 'unit21' | 'unit22' | 'unit23' | 'unit24' | 'unit25'
    | 'unit26' | 'unit27' | 'unit28' | 'unit29' | 'unit30';
  label: string;
  shortTitle: string;
  badgeText: string;
  verbsPreview: string;
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

export const JAMO_SHEET_BADGES: string[] = [
  'ㄱ~ㅎ', 'ㅏ~ㅣ', '가~힣', '빈칸표',
  'ㄱ~ㄹ', 'ㅁ~ㅇ', 'ㅈ~ㅋ', 'ㅌ~ㅎ', 'ㄲ~ㅉ',
  'ㅏㅑㅓㅕ', 'ㅗㅛㅜㅠ', 'ㅡㅣㅢ', 'ㅐㅒㅔㅖ', 'ㅘㅝㅟ', 'ㅚㅙㅞ'
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

export const CLASSROOM_SUMMARY_SHEET_ITEMS: SheetMetaItem[] = [
  { id: 0, title: '①~⑩ 단원 어휘 총정리 (1~100번)', subtitle: '1~10단원 (100단어)' },
  { id: 1, title: '⑪~⑳ 단원 어휘 총정리 (101~200번)', subtitle: '11~20단원 (100단어)' },
  { id: 2, title: '㉑~㉚ 단원 어휘 총정리 (201~300번)', subtitle: '21~30단원 (100단어)' },
];

export const VERB_UNIT_OPTIONS: VerbUnitOption[] = [
  { id: 'unit1', label: '① -아요 [ㅏ, ㅗ] (받다, 찾다, 놀다, 알다, 닫다)', shortTitle: '① -아요 [ㅏ, ㅗ]', badgeText: '-아요', verbsPreview: '받다·찾다·놀다·알다·닫다' },
  { id: 'unit2', label: '② -어요 [기타 모음] (먹다, 씻다, 입다, 읽다, 열다)', shortTitle: '② -어요 [기타 모음]', badgeText: '-어요', verbsPreview: '먹다·씻다·입다·읽다·열다' },
  { id: 'unit3', label: '③ -해요 (공부하다, 청소하다, 숙제하다, 질문하다, 인사하다)', shortTitle: '③ -해요', badgeText: '-해요', verbsPreview: '공부하다·청소하다·숙제하다' },
  { id: 'unit4', label: '④ -아요★ (오다, 보다, 가다, 아프다, 돕다)', shortTitle: '④ -아요★', badgeText: '-아요★', verbsPreview: '오다·보다·가다·아프다·돕다' },
  { id: 'unit5', label: '⑤ -어요★ (주다, 마시다, 쓰다, 듣다, 부르다)', shortTitle: '⑤ -어요★', badgeText: '-어요★', verbsPreview: '주다·마시다·쓰다·듣다·부르다' },
  { id: 'unit6', label: '⑥ -았어요 (맞다, 닦다, 앉다, 잡다, 좋다)', shortTitle: '⑥ -았어요', badgeText: '-았어요', verbsPreview: '맞다·닦다·앉다·잡다·좋다' },
  { id: 'unit7', label: '⑦ -었어요 (있다, 신다, 웃다, 쉬다, 만들다)', shortTitle: '⑦ -었어요', badgeText: '-었어요', verbsPreview: '있다·신다·웃다·쉬다·만들다' },
  { id: 'unit8', label: '⑧ -했어요 (시작하다, 대답하다, 정리하다, 운동하다, 양보하다)', shortTitle: '⑧ -했어요', badgeText: '-했어요', verbsPreview: '시작하다·대답하다·정리하다' },
  { id: 'unit9', label: '⑨ -았어요★ (타다, 자다, 싸다, 모르다, 낫다)', shortTitle: '⑨ -았어요★', badgeText: '-았어요★', verbsPreview: '타다·자다·싸다·모르다·낫다' },
  { id: 'unit10', label: '⑩ -었어요★ (그리다, 붙이다, 까맣다, 예쁘다, 춥다)', shortTitle: '⑩ -었어요★', badgeText: '-었어요★', verbsPreview: '그리다·붙이다·까맣다·예쁘다' },
  { id: 'unit11', label: '⑪ 부정1 (안 [용언], 못 [용언]) (울다, 쏟다, 남기다, 참다, 던지다)', shortTitle: '⑪ 부정1 (안/못)', badgeText: '안/못', verbsPreview: '울다·쏟다·남기다·참다·던지다' },
  { id: 'unit12', label: '⑫ 부정2 ([명사] 안 해요, [명사] 못 해요) (게임하다, 줄넘기하다, 요리하다, 운전하다, 샤워하다)', shortTitle: '⑫ 부정2 (안/못 해요)', badgeText: '안/못 해요', verbsPreview: '게임하다·줄넘기하다·요리하다' },
  { id: 'unit13', label: '⑬ 희망 (-고 싶어요) (배우다, 만나다, 사다, 여행하다, 잘하다)', shortTitle: '⑬ 희망 (-고 싶어요)', badgeText: '-고 싶어요', verbsPreview: '배우다·만나다·사다·여행하다' },
  { id: 'unit14', label: '⑭ 진행 (-고 있어요) (일하다, 이야기하다, 준비하다, 짓다, 물어보다)', shortTitle: '⑭ 진행 (-고 있어요)', badgeText: '-고 있어요', verbsPreview: '일하다·이야기하다·준비하다' },
  { id: 'unit15', label: '⑮ 요청 (-세요, -으세요) (말하다, 서다, 넣다, 걷다, 풀다)', shortTitle: '⑮ 요청 (-세요)', badgeText: '-세요', verbsPreview: '말하다·서다·넣다·걷다·풀다' },
  { id: 'unit16', label: '⑯ 금지 (-지 마세요) (뛰다, 만지다, 싸우다, 떠들다, 버리다)', shortTitle: '⑯ 금지 (-지 마세요)', badgeText: '-지 마세요', verbsPreview: '뛰다·만지다·싸우다·떠들다' },
  { id: 'unit17', label: '⑰ 미래 (-ㄹ 거예요, -을 거예요) (가져오다, 끝나다, 살다, 놓다, 일어나다)', shortTitle: '⑰ 미래 (-ㄹ 거예요)', badgeText: '-ㄹ 거예요', verbsPreview: '가져오다·끝나다·살다·놓다' },
  { id: 'unit18', label: '⑱ 부탁 (-아 주세요, -어 주세요, -해 주세요) (기다리다, 설명하다, 깎다, 켜다, 끄다)', shortTitle: '⑱ 부탁 (-아 주세요)', badgeText: '-아 주세요', verbsPreview: '기다리다·설명하다·깎다·켜다' },
  { id: 'unit19', label: '⑲ 허락 (-아도 돼요?, -어도 돼요?, -해도 돼요?) (들어가다, 나가다, 빌리다, 사용하다, 움직이다)', shortTitle: '⑲ 허락 (-아도 돼요?)', badgeText: '-아도 돼요?', verbsPreview: '들어가다·나가다·빌리다·사용하다' },
  { id: 'unit20', label: '⑳ 의무 (-아야 돼요, -어야 돼요, -해야 돼요) (조심하다, 남다, 꺼내다, 지키다, 바르다)', shortTitle: '⑳ 의무 (-아야 돼요)', badgeText: '-아야 돼요', verbsPreview: '조심하다·남다·꺼내다·지키다' },
  { id: 'unit21', label: '㉑ 능력 (-ㄹ/을 수 있어요, -ㄹ/을 수 없어요) (건너다, 날다, 접다, 밟다, 올리다)', shortTitle: '㉑ 능력 (-ㄹ 수 있어요)', badgeText: '수 있어요', verbsPreview: '건너다·날다·접다·밟다·올리다' },
  { id: 'unit22', label: '㉒ 제안 (-ㄹ까요?, -을까요?) (나누다, 바꾸다, 모이다, 더하다, 빼다)', shortTitle: '㉒ 제안 (-ㄹ까요?)', badgeText: '-ㄹ까요?', verbsPreview: '나누다·바꾸다·모이다·더하다' },
  { id: 'unit23', label: '㉓ 나열 (-고) (세수하다, 펴다, 챙기다, 치우다, 좋아하다)', shortTitle: '㉓ 나열 (-고)', badgeText: '-고', verbsPreview: '세수하다·펴다·챙기다·치우다' },
  { id: 'unit24', label: '㉔ 대조 (-지만) (어렵다, 슬프다, 무겁다, 멀다, 틀리다)', shortTitle: '㉔ 대조 (-지만)', badgeText: '-지만', verbsPreview: '어렵다·슬프다·무겁다·멀다' },
  { id: 'unit25', label: '㉕ 이유 (-아서, -어서, -해서) (배고프다, 늦다, 덥다, 빠르다, 다치다)', shortTitle: '㉕ 이유 (-아서/어서)', badgeText: '-아서/어서', verbsPreview: '배고프다·늦다·덥다·빠르다' },
  { id: 'unit26', label: '㉖ 조건 (-면, -으면) (필요하다, 그렇다, 궁금하다, 힘들다, 작다)', shortTitle: '㉖ 조건 (-면/으면)', badgeText: '-면/으면', verbsPreview: '필요하다·그렇다·궁금하다' },
  { id: 'unit27', label: '㉗ 시간 (-ㄹ 때, -을 때) (발표하다, 출발하다, 졸리다, 벗다, 혼나다)', shortTitle: '㉗ 시간 (-ㄹ 때)', badgeText: '-ㄹ 때', verbsPreview: '발표하다·출발하다·졸리다·벗다' },
  { id: 'unit28', label: '㉘ 목적 (-러/으러 가요, -러/으러 와요) (구경하다, 산책하다, 반납하다, 심다, 수영하다)', shortTitle: '㉘ 목적 (-러 가요)', badgeText: '-러 가요', verbsPreview: '구경하다·산책하다·반납하다' },
  { id: 'unit29', label: '㉙ 순서 (-기 전에, -ㄴ/은 후에) (양치하다, 자르다, 모으다, 연습하다, 섞다)', shortTitle: '㉙ 순서 (-기 전에/후에)', badgeText: '전/후에', verbsPreview: '양치하다·자르다·모으다·연습하다' },
  { id: 'unit30', label: '㉚ 경험 (-아/어/해 봤어요) (안다, 춤추다, 외우다, 도전하다, 묻다)', shortTitle: '㉚ 경험 (-아 봤어요)', badgeText: '-아 봤어요', verbsPreview: '안다·춤추다·외우다·도전하다' },
];
