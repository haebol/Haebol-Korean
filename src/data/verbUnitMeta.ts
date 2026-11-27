import type { SupportedLanguage } from '../types';

export type VerbUnitType =
  | 'unit1'
  | 'unit2'
  | 'unit3'
  | 'unit4'
  | 'unit5'
  | 'unit6'
  | 'unit7'
  | 'unit8'
  | 'unit9'
  | 'unit10'
  | 'unit11'
  | 'unit12'
  | 'unit13'
  | 'unit14'
  | 'unit15'
  | 'unit16'
  | 'unit17'
  | 'unit18'
  | 'unit19'
  | 'unit20'
  | 'unit21'
  | 'unit22'
  | 'unit23'
  | 'unit24'
  | 'unit25'
  | 'unit26'
  | 'unit27'
  | 'unit28'
  | 'unit29'
  | 'unit30';

export interface VerbCardItem {
  id: string;
  stem: string; // e.g. '받' or '먹'
  ending: string; // '다'
  conjugatedEnding: string; // '아요' or '어요'
  conjugatedStem?: string;
  conjugatedStemColor?: string;
  baseWord: string; // '받다'
  conjugatedWord: string; // '받아요'
  vowelHint: string; // 'ㅏ 발견' or 'ㅗ 발견!'
  meanings: Record<SupportedLanguage, string> & { ko?: string };
  sampleSentence: string;
  illustrationSvg?: string;
  emojiIcon?: string;
}

export interface VerbUnitMetaItem {
  id: VerbUnitType;
  num: number;
  circled: string;
  grammar: string;
  verbs: string[];
  label: string;
}

export const VERB_UNIT_META: VerbUnitMetaItem[] = [
  { id: 'unit1', num: 1, circled: '①', grammar: '-아요 [ㅏ, ㅗ]', verbs: ['받다', '찾다', '놀다', '알다', '닫다'], label: '① 현재형 (-아요)' },
  { id: 'unit2', num: 2, circled: '②', grammar: '-어요 [기타 모음]', verbs: ['먹다', '씻다', '입다', '읽다', '열다'], label: '② 현재형 (-어요)' },
  { id: 'unit3', num: 3, circled: '③', grammar: '-해요', verbs: ['공부하다', '청소하다', '숙제하다', '질문하다', '인사하다'], label: '③ 현재형 (-해요)' },
  { id: 'unit4', num: 4, circled: '④', grammar: '-아요★', verbs: ['오다', '보다', '가다', '아프다', '돕다'], label: '④ 현재형 (-아요 ★)' },
  { id: 'unit5', num: 5, circled: '⑤', grammar: '-어요★', verbs: ['주다', '마시다', '쓰다', '듣다', '부르다'], label: '⑤ 현재형 (-어요 ★)' },
  { id: 'unit6', num: 6, circled: '⑥', grammar: '-았어요', verbs: ['맞다', '닦다', '앉다', '잡다', '좋다'], label: '⑥ 과거형 (-았어요)' },
  { id: 'unit7', num: 7, circled: '⑦', grammar: '-었어요', verbs: ['있다', '신다', '웃다', '쉬다', '만들다'], label: '⑦ 과거형 (-었어요)' },
  { id: 'unit8', num: 8, circled: '⑧', grammar: '-했어요', verbs: ['시작하다', '대답하다', '정리하다', '운동하다', '양보하다'], label: '⑧ 과거형 (-했어요)' },
  { id: 'unit9', num: 9, circled: '⑨', grammar: '-았어요★', verbs: ['타다', '자다', '싸다', '모르다', '낫다'], label: '⑨ 과거형 (-았어요 ★)' },
  { id: 'unit10', num: 10, circled: '⑩', grammar: '-었어요★', verbs: ['그리다', '붙이다', '까맣다', '예쁘다', '춥다'], label: '⑩ 과거형 (-었어요 ★)' },
  { id: 'unit11', num: 11, circled: '⑪', grammar: '부정1 (안/못)', verbs: ['울다', '쏟다', '남기다', '참다', '던지다'], label: '⑪ 부정1 (안 [용언], 못 [용언])' },
  { id: 'unit12', num: 12, circled: '⑫', grammar: '부정2 ([명사] 안/못 해요)', verbs: ['게임하다', '줄넘기하다', '요리하다', '운전하다', '샤워하다'], label: '⑫ 부정2 ([명사] 안 해요, [명사] 못 해요)' },
  { id: 'unit13', num: 13, circled: '⑬', grammar: '희망 (-고 싶어요)', verbs: ['배우다', '만나다', '사다', '여행하다', '잘하다'], label: '⑬ 희망 (-고 싶어요)' },
  { id: 'unit14', num: 14, circled: '⑭', grammar: '진행 (-고 있어요)', verbs: ['일하다', '이야기하다', '준비하다', '짓다', '물어보다'], label: '⑭ 진행 (-고 있어요)' },
  { id: 'unit15', num: 15, circled: '⑮', grammar: '요청 (-세요, -으세요)', verbs: ['말하다', '서다', '넣다', '걷다', '풀다'], label: '⑮ 요청 (-세요, -으세요)' },
  { id: 'unit16', num: 16, circled: '⑯', grammar: '금지 (-지 마세요)', verbs: ['뛰다', '만지다', '싸우다', '떠들다', '버리다'], label: '⑯ 금지 (-지 마세요)' },
  { id: 'unit17', num: 17, circled: '⑰', grammar: '미래 (-ㄹ/을 거예요)', verbs: ['가져오다', '끝나다', '살다', '놓다', '일어나다'], label: '⑰ 미래 (-ㄹ 거예요, -을 거예요)' },
  { id: 'unit18', num: 18, circled: '⑱', grammar: '부탁 (-아/어/해 주세요)', verbs: ['기다리다', '설명하다', '깎다', '켜다', '끄다'], label: '⑱ 부탁 (-아 주세요, -어 주세요, -해 주세요)' },
  { id: 'unit19', num: 19, circled: '⑲', grammar: '허락 (-아도/어도/해도 돼요?)', verbs: ['들어가다', '나가다', '빌리다', '사용하다', '움직이다'], label: '⑲ 허락 (-아도 돼요?, -어도 돼요?, -해도 돼요?)' },
  { id: 'unit20', num: 20, circled: '⑳', grammar: '의무 (-아야/어야/해야 돼요)', verbs: ['조심하다', '남다', '꺼내다', '지키다', '바르다'], label: '⑳ 의무 (-아야 돼요, -어야 돼요, -해야 돼요)' },
  { id: 'unit21', num: 21, circled: '㉑', grammar: '능력 (-ㄹ/을 수 있어요, 없어요)', verbs: ['건너다', '날다', '접다', '밟다', '올리다'], label: '㉑ 능력 (-ㄹ(을) 수 있어요, -ㄹ(을) 수 없어요)' },
  { id: 'unit22', num: 22, circled: '㉒', grammar: '제안 (-ㄹ까요?, -을까요?)', verbs: ['나누다', '바꾸다', '모이다', '더하다', '빼다'], label: '㉒ 제안 (-ㄹ까요?, -을까요?)' },
  { id: 'unit23', num: 23, circled: '㉓', grammar: '나열 (-고)', verbs: ['세수하다', '펴다', '챙기다', '치우다', '좋아하다'], label: '㉓ 나열 (-고)' },
  { id: 'unit24', num: 24, circled: '㉔', grammar: '대조 (-지만)', verbs: ['어렵다', '슬프다', '무겁다', '멀다', '틀리다'], label: '㉔ 대조 (-지만)' },
  { id: 'unit25', num: 25, circled: '㉕', grammar: '이유 (-아서, -어서, -해서)', verbs: ['배고프다', '늦다', '덥다', '빠르다', '다치다'], label: '㉕ 이유 (-아서, -어서, -해서)' },
  { id: 'unit26', num: 26, circled: '㉖', grammar: '조건 (-면, -으면)', verbs: ['필요하다', '그렇다', '궁금하다', '힘들다', '작다'], label: '㉖ 조건 (-면, -으면)' },
  { id: 'unit27', num: 27, circled: '㉗', grammar: '시간 (-ㄹ 때, -을 때)', verbs: ['발표하다', '출발하다', '졸리다', '벗다', '혼나다'], label: '㉗ 시간 (-ㄹ 때, -을 때)' },
  { id: 'unit28', num: 28, circled: '㉘', grammar: '목적 (-러/으러 가요, 와요)', verbs: ['구경하다', '산책하다', '반납하다', '심다', '수영하다'], label: '㉘ 목적 (-러 가요, -으러 가요 / -러 와요, -으러 와요)' },
  { id: 'unit29', num: 29, circled: '㉙', grammar: '순서 (-기 전에, -ㄴ/은 후에)', verbs: ['양치하다', '자르다', '모으다', '연습하다', '섞다'], label: '㉙ 순서 (-기 전에, -ㄴ 후에, -은 후에)' },
  { id: 'unit30', num: 30, circled: '㉚', grammar: '경험 (-아/어/해 봤어요)', verbs: ['안다', '춤추다', '외우다', '도전하다', '묻다'], label: '㉚ 경험 (-아 봤어요, -어 봤어요, -해 봤어요)' },
];
