import type { VerbUnitType, VerbCardItem } from '../components/VerbConjugationSection';

export interface ConjugatedCharInfo {
  char: string;
  color: string; // '#1E293B' | '#EF4444' | '#9333EA'
  isModified: boolean; // whether this character was altered/irregular
}

/**
 * 1. 기본형(1행) 어간/어미 분리 규칙:
 * 무조건 마지막 글자 '다'만 파란색(#2563EB), 그 앞의 모든 어간 글자는 100% 검은색(#1E293B)
 * - 3글자 이상 단어: '아프' + '다', '마시' + '다', '부르' + '다', '만들' + '다', '모르' + '다', '붙이' + '다', '예쁘' + '다' 등
 * - 제3단원 및 제8단원 '하다 동사': '공부/청소/숙제/질문/인사' + '하다', '시작/대답/정리/운동/양보' + '하다'
 */
export function getBaseWordParts(baseWord: string, unit: string): { stem: string; ending: string } {
  if (unit === 'unit3' || unit === 'unit8' || baseWord.endsWith('하다')) {
    const stem = baseWord.endsWith('하다') ? baseWord.slice(0, -2) : baseWord.slice(0, -1);
    const ending = baseWord.endsWith('하다') ? '하다' : baseWord.slice(-1);
    return { stem, ending };
  }
  return {
    stem: baseWord.slice(0, -1),
    ending: baseWord.slice(-1) // always '다'
  };
}

/**
 * 2. 2행 활용형 글자별 색상 정밀 매핑
 * - 1~3단원: 어간 검정(#1E293B) + 어미 빨강(#EF4444)
 * - 4·5단원: 변형/수정 글자 보라색(#9333EA), 불변 어간 검정(#1E293B)
 * - 6·7·8단원 (규칙 과거형): 어간 검정(#1E293B) + 어미 영역(았어요/었어요/했어요 3글자 전체 빨강 #EF4444)
/**
 * 2. 2행 활용형 글자별 색상 정밀 매핑 (1~20단원 전체 적용)
 * - 규칙 1: 해당 단원 내에서 활용 시 변하지 않는 어간은 검정 (#1E293B)
 * - 규칙 2: 축약, 탈락, 불규칙 등의 이유로 글씨가 변하는 어간과 어미는 보라 (#9333EA)
 * - 규칙 3: 활용 시 변하지 않은 어미는 빨강 (#EF4444)
 *   (예: 18쪽 1열 2행 '배고파서'는 '배고' 검정, '파' 보라, '서' 빨강)
 * - 규칙 4: '하다'가 '해요'/'했어요'/'해 주세요'/'해도 돼요' 등으로 바뀌는 경우에는 '해요' 계열 전체를 빨강 (#EF4444)
 * - 규칙 5: 11쪽 '배우고 싶어요' 등 보조용언 결합은 띄어쓰기 유지, '배우' 검정 + '고 싶어요' 빨강
 */
const BLACK = '#1E293B';  // 변하지 않는 어간
const PURPLE = '#9333EA'; // 축약, 탈락, 불규칙 등으로 바뀐 글자
const RED = '#EF4444';    // 변하지 않은 어미 및 '해요' 계열
const GREEN = '#16A34A';  // 11단원 신규 도입 부정 부사 (안, 못)

const CONJUGATION_COLOR_MAP: Record<string, ConjugatedCharInfo[]> = {
  // [Unit 1: -아요]
  '받아요': [
    { char: '받', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '찾아요': [
    { char: '찾', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '놀아요': [
    { char: '놀', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '알아요': [
    { char: '알', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '닫아요': [
    { char: '닫', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 2: -어요]
  '먹어요': [
    { char: '먹', color: BLACK, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '씻어요': [
    { char: '씻', color: BLACK, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '입어요': [
    { char: '입', color: BLACK, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '읽어요': [
    { char: '읽', color: BLACK, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '열어요': [
    { char: '열', color: BLACK, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 3: -해요 (하다 동사)]
  '공부해요': [
    { char: '공', color: BLACK, isModified: false },
    { char: '부', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '청소해요': [
    { char: '청', color: BLACK, isModified: false },
    { char: '소', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '숙제해요': [
    { char: '숙', color: BLACK, isModified: false },
    { char: '제', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '질문해요': [
    { char: '질', color: BLACK, isModified: false },
    { char: '문', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '인사해요': [
    { char: '인', color: BLACK, isModified: false },
    { char: '사', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 4: -아요 ★]
  '와요': [
    { char: '와', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],
  '봐요': [
    { char: '봐', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],
  '가요': [
    { char: '가', color: BLACK, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '아파요': [
    { char: '아', color: BLACK, isModified: false },
    { char: '파', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],
  '도와요': [
    { char: '도', color: BLACK, isModified: false },
    { char: '와', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 5: -어요 ★]
  '줘요': [
    { char: '줘', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],
  '마셔요': [
    { char: '마', color: BLACK, isModified: false },
    { char: '셔', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],
  '써요': [
    { char: '써', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],
  '들어요': [
    { char: '들', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '불러요': [
    { char: '불', color: PURPLE, isModified: true },
    { char: '러', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 6: -았어요]
  '맞았어요': [
    { char: '맞', color: BLACK, isModified: false },
    { char: '았', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '닦았어요': [
    { char: '닦', color: BLACK, isModified: false },
    { char: '았', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '앉았어요': [
    { char: '앉', color: BLACK, isModified: false },
    { char: '았', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '잡았어요': [
    { char: '잡', color: BLACK, isModified: false },
    { char: '았', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '좋았어요': [
    { char: '좋', color: BLACK, isModified: false },
    { char: '았', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 7: -었어요]
  '있었어요': [
    { char: '있', color: BLACK, isModified: false },
    { char: '었', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '신었어요': [
    { char: '신', color: BLACK, isModified: false },
    { char: '었', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '웃었어요': [
    { char: '웃', color: BLACK, isModified: false },
    { char: '었', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '쉬었어요': [
    { char: '쉬', color: BLACK, isModified: false },
    { char: '었', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '만들었어요': [
    { char: '만', color: BLACK, isModified: false },
    { char: '들', color: BLACK, isModified: false },
    { char: '었', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 8: -했어요 (하다 동사 과거형)]
  '시작했어요': [
    { char: '시', color: BLACK, isModified: false },
    { char: '작', color: BLACK, isModified: false },
    { char: '했', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '대답했어요': [
    { char: '대', color: BLACK, isModified: false },
    { char: '답', color: BLACK, isModified: false },
    { char: '했', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '정리했어요': [
    { char: '정', color: BLACK, isModified: false },
    { char: '리', color: BLACK, isModified: false },
    { char: '했', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '운동했어요': [
    { char: '운', color: BLACK, isModified: false },
    { char: '동', color: BLACK, isModified: false },
    { char: '했', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '양보했어요': [
    { char: '양', color: BLACK, isModified: false },
    { char: '보', color: BLACK, isModified: false },
    { char: '했', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 9: -았어요 ★]
  '탔어요': [
    { char: '탔', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '잤어요': [
    { char: '잤', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '쌌어요': [
    { char: '쌌', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '몰랐어요': [
    { char: '몰', color: PURPLE, isModified: true },
    { char: '랐', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '나았어요': [
    { char: '나', color: BLACK, isModified: false },
    { char: '았', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 10: -었어요 ★]
  '그렸어요': [
    { char: '그', color: BLACK, isModified: false },
    { char: '렸', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '붙였어요': [
    { char: '붙', color: BLACK, isModified: false },
    { char: '였', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '까맸어요': [
    { char: '까', color: BLACK, isModified: false },
    { char: '맸', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '예뻤어요': [
    { char: '예', color: BLACK, isModified: false },
    { char: '뻤', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '추웠어요': [
    { char: '추', color: BLACK, isModified: false },
    { char: '웠', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 11: -고 싶어요 (보조용언 결합, 띄어쓰기)]
  '배우고 싶어요': [
    { char: '배', color: BLACK, isModified: false },
    { char: '우', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '싶', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '만나고 싶어요': [
    { char: '만', color: BLACK, isModified: false },
    { char: '나', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '싶', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '사고 싶어요': [
    { char: '사', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '싶', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '여행하고 싶어요': [
    { char: '여', color: BLACK, isModified: false },
    { char: '행', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '싶', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '자랑하고 싶어요': [
    { char: '자', color: BLACK, isModified: false },
    { char: '랑', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '싶', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '잘하고 싶어요': [
    { char: '잘', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '싶', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 12: 부정2 ([명사] 안 해요, [명사] 못 해요)]
  '게임 안 해요': [
    { char: '게', color: BLACK, isModified: false },
    { char: '임', color: BLACK, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '안', color: GREEN, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '줄넘기 못 해요': [
    { char: '줄', color: BLACK, isModified: false },
    { char: '넘', color: BLACK, isModified: false },
    { char: '기', color: BLACK, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '못', color: GREEN, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '요리 못 해요': [
    { char: '요', color: BLACK, isModified: false },
    { char: '리', color: BLACK, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '못', color: GREEN, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '운전 못 해요': [
    { char: '운', color: BLACK, isModified: false },
    { char: '전', color: BLACK, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '못', color: GREEN, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '샤워 안 해요': [
    { char: '샤', color: BLACK, isModified: false },
    { char: '워', color: BLACK, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '안', color: GREEN, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 12(기존) / Unit 18(신규): -아/어 주세요]
  '기다려 주세요': [
    { char: '기', color: BLACK, isModified: false },
    { char: '다', color: BLACK, isModified: false },
    { char: '려', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '주', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '설명해 주세요': [
    { char: '설', color: BLACK, isModified: false },
    { char: '명', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '주', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '깎아 주세요': [
    { char: '깎', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '주', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '켜 주세요': [
    { char: '켜', color: BLACK, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '주', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '꺼 주세요': [
    { char: '꺼', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '주', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 13: -(으)세요]
  '말하세요': [
    { char: '말', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '서세요': [
    { char: '서', color: BLACK, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '넣으세요': [
    { char: '넣', color: BLACK, isModified: false },
    { char: '으', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '걸으세요': [
    { char: '걸', color: PURPLE, isModified: true },
    { char: '으', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '푸세요': [
    { char: '푸', color: PURPLE, isModified: true },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 14: -지 마세요]
  '뛰지 마세요': [
    { char: '뛰', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '마', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '만지지 마세요': [
    { char: '만', color: BLACK, isModified: false },
    { char: '지', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '마', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '싸우지 마세요': [
    { char: '싸', color: BLACK, isModified: false },
    { char: '우', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '마', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '떠들지 마세요': [
    { char: '떠', color: BLACK, isModified: false },
    { char: '들', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '마', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '버리지 마세요': [
    { char: '버', color: BLACK, isModified: false },
    { char: '리', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '마', color: RED, isModified: false },
    { char: '세', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 15: -고 있어요]
  '일하고 있어요': [
    { char: '일', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '이야기하고 있어요': [
    { char: '이', color: BLACK, isModified: false },
    { char: '야', color: BLACK, isModified: false },
    { char: '기', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '준비하고 있어요': [
    { char: '준', color: BLACK, isModified: false },
    { char: '비', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '짓고 있어요': [
    { char: '짓', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '물어보고 있어요': [
    { char: '물', color: BLACK, isModified: false },
    { char: '어', color: BLACK, isModified: false },
    { char: '보', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 16: -(으)ㄹ 거예요]
  '가져올 거예요': [
    { char: '가', color: BLACK, isModified: false },
    { char: '져', color: BLACK, isModified: false },
    { char: '올', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '거', color: RED, isModified: false },
    { char: '예', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '끝날 거예요': [
    { char: '끝', color: BLACK, isModified: false },
    { char: '날', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '거', color: RED, isModified: false },
    { char: '예', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '살 거예요': [
    { char: '살', color: BLACK, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '거', color: RED, isModified: false },
    { char: '예', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '놓을 거예요': [
    { char: '놓', color: BLACK, isModified: false },
    { char: '을', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '거', color: RED, isModified: false },
    { char: '예', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '일어날 거예요': [
    { char: '일', color: BLACK, isModified: false },
    { char: '어', color: BLACK, isModified: false },
    { char: '날', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '거', color: RED, isModified: false },
    { char: '예', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 17: -고]
  '세수하고': [
    { char: '세', color: BLACK, isModified: false },
    { char: '수', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '고', color: RED, isModified: false }
  ],
  '빗고': [
    { char: '빗', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false }
  ],
  '챙기고': [
    { char: '챙', color: BLACK, isModified: false },
    { char: '기', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false }
  ],
  '치우고': [
    { char: '치', color: BLACK, isModified: false },
    { char: '우', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false }
  ],
  '좋아하고': [
    { char: '좋', color: BLACK, isModified: false },
    { char: '아', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '고', color: RED, isModified: false }
  ],

  // [Unit 18: -아/어서]
  '배고파서': [
    { char: '배', color: BLACK, isModified: false },
    { char: '고', color: BLACK, isModified: false },
    { char: '파', color: PURPLE, isModified: true },
    { char: '서', color: RED, isModified: false }
  ],
  '늦어서': [
    { char: '늦', color: BLACK, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '서', color: RED, isModified: false }
  ],
  '더워서': [
    { char: '더', color: BLACK, isModified: false },
    { char: '워', color: PURPLE, isModified: true },
    { char: '서', color: RED, isModified: false }
  ],
  '빨라서': [
    { char: '빨', color: PURPLE, isModified: true },
    { char: '라', color: PURPLE, isModified: true },
    { char: '서', color: RED, isModified: false }
  ],
  '다쳐서': [
    { char: '다', color: BLACK, isModified: false },
    { char: '쳐', color: PURPLE, isModified: true },
    { char: '서', color: RED, isModified: false }
  ],

  // [Unit 19: -(으)면]
  '필요하면': [
    { char: '필', color: BLACK, isModified: false },
    { char: '요', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '면', color: RED, isModified: false }
  ],
  '그러면': [
    { char: '그', color: BLACK, isModified: false },
    { char: '러', color: PURPLE, isModified: true },
    { char: '면', color: RED, isModified: false }
  ],
  '막히면': [
    { char: '막', color: BLACK, isModified: false },
    { char: '히', color: BLACK, isModified: false },
    { char: '면', color: RED, isModified: false }
  ],
  '힘들면': [
    { char: '힘', color: BLACK, isModified: false },
    { char: '들', color: BLACK, isModified: false },
    { char: '면', color: RED, isModified: false }
  ],
  '작으면': [
    { char: '작', color: BLACK, isModified: false },
    { char: '으', color: RED, isModified: false },
    { char: '면', color: RED, isModified: false }
  ],

  // [Unit 20: -아/어도 돼요?]
  '들어가도 돼요?': [
    { char: '들', color: BLACK, isModified: false },
    { char: '어', color: BLACK, isModified: false },
    { char: '가', color: BLACK, isModified: false },
    { char: '도', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '나가도 돼요?': [
    { char: '나', color: BLACK, isModified: false },
    { char: '가', color: BLACK, isModified: false },
    { char: '도', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '빌려도 돼요?': [
    { char: '빌', color: BLACK, isModified: false },
    { char: '려', color: PURPLE, isModified: true },
    { char: '도', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '사용해도 돼요?': [
    { char: '사', color: BLACK, isModified: false },
    { char: '용', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '도', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '찍어도 돼요?': [
    { char: '찍', color: BLACK, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '도', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '움직여도 돼요?': [
    { char: '움', color: BLACK, isModified: false },
    { char: '직', color: BLACK, isModified: false },
    { char: '여', color: PURPLE, isModified: true },
    { char: '도', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],

  // [Unit 21: -(으)ㄹ 수 있다/없다]
  '건널 수 있어요': [
    { char: '건', color: BLACK, isModified: false },
    { char: '널', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '수', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '날 수 있어요': [
    { char: '날', color: BLACK, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '수', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '접을 수 있어요': [
    { char: '접', color: BLACK, isModified: false },
    { char: '을', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '수', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '밟을 수 있어요': [
    { char: '밟', color: BLACK, isModified: false },
    { char: '을', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '수', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '올릴 수 있어요': [
    { char: '올', color: BLACK, isModified: false },
    { char: '릴', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '수', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '있', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 11 / Unit 22: 안 - vs 못 -] (처음 도입되는 부정 부사 안/못은 초록색)
  '안 남겨요': [
    { char: '안', color: GREEN, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '남', color: BLACK, isModified: false },
    { char: '겨', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],
  '못 던져요': [
    { char: '못', color: GREEN, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '던', color: BLACK, isModified: false },
    { char: '져', color: PURPLE, isModified: true },
    { char: '요', color: RED, isModified: false }
  ],
  '안 울어요': [
    { char: '안', color: GREEN, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '울', color: BLACK, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '못 참아요': [
    { char: '못', color: GREEN, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '참', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '안 쏟아요': [
    { char: '안', color: GREEN, isModified: false },
    { char: ' ', color: GREEN, isModified: false },
    { char: '쏟', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 23: -(으)러 가요]
  '구경하러 가요': [
    { char: '구', color: BLACK, isModified: false },
    { char: '경', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '러', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '가', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '뽑으러 가요': [
    { char: '뽑', color: BLACK, isModified: false },
    { char: '으', color: RED, isModified: false },
    { char: '러', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '가', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '맞추러 가요': [
    { char: '맞', color: BLACK, isModified: false },
    { char: '추', color: BLACK, isModified: false },
    { char: '러', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '가', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '맡기러 가요': [
    { char: '맡', color: BLACK, isModified: false },
    { char: '기', color: BLACK, isModified: false },
    { char: '러', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '가', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '수영하러 가요': [
    { char: '수', color: BLACK, isModified: false },
    { char: '영', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '러', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '가', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 24: -아/어/해야 돼요]
  '조심해야 돼요': [
    { char: '조', color: BLACK, isModified: false },
    { char: '심', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: '야', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '남아야 돼요': [
    { char: '남', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: '야', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '꺼내야 돼요': [
    { char: '꺼', color: BLACK, isModified: false },
    { char: '내', color: BLACK, isModified: false },
    { char: '야', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '지켜야 돼요': [
    { char: '지', color: BLACK, isModified: false },
    { char: '켜', color: PURPLE, isModified: true },
    { char: '야', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '발라야 돼요': [
    { char: '발', color: PURPLE, isModified: true },
    { char: '라', color: PURPLE, isModified: true },
    { char: '야', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '돼', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 25: -기 전에 / -(으)ㄴ 후에]
  '양치하기 전에': [
    { char: '양', color: BLACK, isModified: false },
    { char: '치', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '기', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '전', color: RED, isModified: false },
    { char: '에', color: RED, isModified: false }
  ],
  '자른 후에': [
    { char: '자', color: BLACK, isModified: false },
    { char: '른', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '후', color: RED, isModified: false },
    { char: '에', color: RED, isModified: false }
  ],
  '모은 후에': [
    { char: '모', color: BLACK, isModified: false },
    { char: '은', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '후', color: RED, isModified: false },
    { char: '에', color: RED, isModified: false }
  ],
  '헹군 후에': [
    { char: '헹', color: BLACK, isModified: false },
    { char: '군', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '후', color: RED, isModified: false },
    { char: '에', color: RED, isModified: false }
  ],
  '묶은 후에': [
    { char: '묶', color: BLACK, isModified: false },
    { char: '은', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '후', color: RED, isModified: false },
    { char: '에', color: RED, isModified: false }
  ],

  // [Unit 24: 하지만 (-지만)]
  '어렵지만': [
    { char: '어', color: BLACK, isModified: false },
    { char: '렵', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: '만', color: RED, isModified: false }
  ],
  '슬프지만': [
    { char: '슬', color: BLACK, isModified: false },
    { char: '프', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: '만', color: RED, isModified: false }
  ],
  '무겁지만': [
    { char: '무', color: BLACK, isModified: false },
    { char: '겁', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: '만', color: RED, isModified: false }
  ],
  '멀지만': [
    { char: '멀', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: '만', color: RED, isModified: false }
  ],
  '틀리지만': [
    { char: '틀', color: BLACK, isModified: false },
    { char: '리', color: BLACK, isModified: false },
    { char: '지', color: RED, isModified: false },
    { char: '만', color: RED, isModified: false }
  ],

  // [Unit 27: -(으)ㄹ 때]
  '발표할 때': [
    { char: '발', color: BLACK, isModified: false },
    { char: '표', color: BLACK, isModified: false },
    { char: '할', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '때', color: RED, isModified: false }
  ],
  '잃을 때': [
    { char: '잃', color: BLACK, isModified: false },
    { char: '을', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '때', color: RED, isModified: false }
  ],
  '졸릴 때': [
    { char: '졸', color: BLACK, isModified: false },
    { char: '릴', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '때', color: RED, isModified: false }
  ],
  '넘어질 때': [
    { char: '넘', color: BLACK, isModified: false },
    { char: '어', color: BLACK, isModified: false },
    { char: '질', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '때', color: RED, isModified: false }
  ],
  '숨을 때': [
    { char: '숨', color: BLACK, isModified: false },
    { char: '을', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '때', color: RED, isModified: false }
  ],

  // [Unit 28: -아/어/해 봤어요]
  '안아 봤어요': [
    { char: '안', color: BLACK, isModified: false },
    { char: '아', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '봤', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '맛봤어요': [
    { char: '맛', color: BLACK, isModified: false },
    { char: '봤', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '외워 봤어요': [
    { char: '외', color: BLACK, isModified: false },
    { char: '워', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '봤', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '도전해 봤어요': [
    { char: '도', color: BLACK, isModified: false },
    { char: '전', color: BLACK, isModified: false },
    { char: '해', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '봤', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '물어봤어요': [
    { char: '물', color: PURPLE, isModified: true },
    { char: '어', color: RED, isModified: false },
    { char: '봤', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Unit 29: -(으)ㄹ까요?]
  '나눌까요?': [
    { char: '나', color: BLACK, isModified: false },
    { char: '눌', color: PURPLE, isModified: true },
    { char: '까', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '바꿀까요?': [
    { char: '바', color: BLACK, isModified: false },
    { char: '꿀', color: PURPLE, isModified: true },
    { char: '까', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '모일까요?': [
    { char: '모', color: BLACK, isModified: false },
    { char: '일', color: PURPLE, isModified: true },
    { char: '까', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '거들까요?': [
    { char: '거', color: BLACK, isModified: false },
    { char: '들', color: BLACK, isModified: false },
    { char: '까', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '끌까요?': [
    { char: '끌', color: BLACK, isModified: false },
    { char: '까', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],

  // [Unit 30: -(으)ㄹ게요]
  '비울게요': [
    { char: '비', color: BLACK, isModified: false },
    { char: '울', color: PURPLE, isModified: true },
    { char: '게', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '보살필게요': [
    { char: '보', color: BLACK, isModified: false },
    { char: '살', color: BLACK, isModified: false },
    { char: '필', color: PURPLE, isModified: true },
    { char: '게', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '믿을게요': [
    { char: '믿', color: BLACK, isModified: false },
    { char: '을', color: RED, isModified: false },
    { char: '게', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '고칠게요': [
    { char: '고', color: BLACK, isModified: false },
    { char: '칠', color: PURPLE, isModified: true },
    { char: '게', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '지울게요': [
    { char: '지', color: BLACK, isModified: false },
    { char: '울', color: PURPLE, isModified: true },
    { char: '게', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],

  // [Units 21~30 신규 추가 활용형 매핑]
  '밟을 수 없어요': [
    { char: '밟', color: BLACK, isModified: false },
    { char: '을', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '수', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '없', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '올릴 수 없어요': [
    { char: '올', color: BLACK, isModified: false },
    { char: '릴', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '수', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '없', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '더할까요?': [
    { char: '더', color: BLACK, isModified: false },
    { char: '할', color: RED, isModified: false },
    { char: '까', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '뺄까요?': [
    { char: '뺄', color: PURPLE, isModified: true },
    { char: '까', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false },
    { char: '?', color: RED, isModified: false }
  ],
  '펴고': [
    { char: '펴', color: BLACK, isModified: false },
    { char: '고', color: RED, isModified: false }
  ],
  '궁금하면': [
    { char: '궁', color: BLACK, isModified: false },
    { char: '금', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '면', color: RED, isModified: false }
  ],
  '출발할 때': [
    { char: '출', color: BLACK, isModified: false },
    { char: '발', color: BLACK, isModified: false },
    { char: '할', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '때', color: RED, isModified: false }
  ],
  '벗을 때': [
    { char: '벗', color: BLACK, isModified: false },
    { char: '을', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '때', color: RED, isModified: false }
  ],
  '혼날 때': [
    { char: '혼', color: BLACK, isModified: false },
    { char: '날', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '때', color: RED, isModified: false }
  ],
  '산책하러 가요': [
    { char: '산', color: BLACK, isModified: false },
    { char: '책', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '러', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '가', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '반납하러 와요': [
    { char: '반', color: BLACK, isModified: false },
    { char: '납', color: BLACK, isModified: false },
    { char: '하', color: RED, isModified: false },
    { char: '러', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '와', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '심으러 가요': [
    { char: '심', color: BLACK, isModified: false },
    { char: '으', color: RED, isModified: false },
    { char: '러', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '가', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ],
  '자르기 전에': [
    { char: '자', color: BLACK, isModified: false },
    { char: '르', color: BLACK, isModified: false },
    { char: '기', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '전', color: RED, isModified: false },
    { char: '에', color: RED, isModified: false }
  ],
  '연습한 후에': [
    { char: '연', color: BLACK, isModified: false },
    { char: '습', color: BLACK, isModified: false },
    { char: '한', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '후', color: RED, isModified: false },
    { char: '에', color: RED, isModified: false }
  ],
  '섞은 후에': [
    { char: '섞', color: BLACK, isModified: false },
    { char: '은', color: RED, isModified: false },
    { char: ' ', color: RED, isModified: false },
    { char: '후', color: RED, isModified: false },
    { char: '에', color: RED, isModified: false }
  ],
  '춤춰 봤어요': [
    { char: '춤', color: BLACK, isModified: false },
    { char: '춰', color: PURPLE, isModified: true },
    { char: ' ', color: RED, isModified: false },
    { char: '봤', color: RED, isModified: false },
    { char: '어', color: RED, isModified: false },
    { char: '요', color: RED, isModified: false }
  ]
};

export function getOptionBCharMapping(baseWord: string, conjugatedWord: string, unit: string): ConjugatedCharInfo[] {
  // 1. 사전 매핑 테이블에서 정밀 일치 검색
  if (CONJUGATION_COLOR_MAP[conjugatedWord]) {
    return CONJUGATION_COLOR_MAP[conjugatedWord];
  }

  // 2. 만약 매핑 테이블에 없는 단어일 경우의 스마트 fallback
  const stem = baseWord.endsWith('하다') ? baseWord.slice(0, -2) : baseWord.slice(0, -1);
  const stemLen = stem.length;

  return conjugatedWord.split('').map((char, idx) => {
    if (idx < stemLen) {
      return { char, color: BLACK, isModified: false };
    }
    return { char, color: RED, isModified: false };
  });
}

export interface FlashcardMagicData {
  baseStem: string;         // '오', '아프', '시작', '타', etc.
  baseEnding: string;       // '다' or '하다'
  fallingRedEnding: string; // '아요', '어요', '해요', '았어요', '었어요', '했어요'
  magicStem: string;        // '와', '봐', '가', '아', '도', '줘', '마', '써', '들', '불'
  magicStemChars?: { char: string; color: string }[]; // per-char colors when part of stem morphs to PURPLE
  isStemAltered: boolean;   // true if stem changed in 4/5단원, 11단원, or 15/17/18/19/20단원
  magicStemColor: string;   // '#9333EA' if altered else '#1E293B'
  magicEnding: string;      // '요', '파요', '와요', '셔요', '어요', '러요', '았어요', '었어요', '했어요'
  magicEndingColor: string; // '#9333EA' or '#EF4444'
  isFullWordMagic?: boolean;   // true for unit9 & unit10 (전체 글자 100% 보라색 전환)
  fullConjugatedWord?: string; // '탔어요', '잤어요', '그렸어요', etc.
  prefixAdverb?: string;       // '안' or '못' for unit11
  prefixColor?: string;        // '#16A34A' (초록색 부사)
  midAdverb?: '안' | '못';     // '안' or '못' between noun stem and '해요' for unit12
  midAdverbColor?: string;     // '#16A34A' (초록색 부사)
}

/**
 * 3. 플래시카드 단원별 어간/어미 및 매직 인터랙션 데이터
 */
export function getFlashcardMagicData(baseWord: string, unit: string): FlashcardMagicData {
  const PURPLE = '#9333EA';
  const RED = '#EF4444';
  const BLACK = '#1E293B';

  // 9단원: -았어요 ★ (타다, 자다, 싸다, 모르다, 낫다) - 학습지 색깔과 100% 일치
  if (unit === 'unit9') {
    switch (baseWord) {
      case '타다':
        return {
          baseStem: '타',
          baseEnding: '다',
          fallingRedEnding: '았어요',
          magicStem: '탔',
          magicStemChars: [{ char: '탔', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '탔어요'
        };
      case '자다':
        return {
          baseStem: '자',
          baseEnding: '다',
          fallingRedEnding: '았어요',
          magicStem: '잤',
          magicStemChars: [{ char: '잤', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '잤어요'
        };
      case '싸다':
        return {
          baseStem: '싸',
          baseEnding: '다',
          fallingRedEnding: '았어요',
          magicStem: '쌌',
          magicStemChars: [{ char: '쌌', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '쌌어요'
        };
      case '모르다':
        return {
          baseStem: '모르',
          baseEnding: '다',
          fallingRedEnding: '았어요',
          magicStem: '몰랐',
          magicStemChars: [
            { char: '몰', color: PURPLE },
            { char: '랐', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '몰랐어요'
        };
      case '낫다':
      default:
        return {
          baseStem: '낫',
          baseEnding: '다',
          fallingRedEnding: '았어요',
          magicStem: '나았',
          magicStemChars: [
            { char: '나', color: BLACK },
            { char: '았', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '나았어요'
        };
    }
  }

  // 10단원: -었어요 ★ (그리다, 붙이다, 까맣다, 예쁘다, 춥다) - 학습지 색깔과 100% 일치
  if (unit === 'unit10') {
    switch (baseWord) {
      case '그리다':
        return {
          baseStem: '그리',
          baseEnding: '다',
          fallingRedEnding: '었어요',
          magicStem: '그렸',
          magicStemChars: [
            { char: '그', color: BLACK },
            { char: '렸', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '그렸어요'
        };
      case '붙이다':
        return {
          baseStem: '붙이',
          baseEnding: '다',
          fallingRedEnding: '었어요',
          magicStem: '붙였',
          magicStemChars: [
            { char: '붙', color: BLACK },
            { char: '였', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '붙였어요'
        };
      case '까맣다':
        return {
          baseStem: '까맣',
          baseEnding: '다',
          fallingRedEnding: '았어요',
          magicStem: '까맸',
          magicStemChars: [
            { char: '까', color: BLACK },
            { char: '맸', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '까맸어요'
        };
      case '예쁘다':
        return {
          baseStem: '예쁘',
          baseEnding: '다',
          fallingRedEnding: '었어요',
          magicStem: '예뻤',
          magicStemChars: [
            { char: '예', color: BLACK },
            { char: '뻤', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '예뻤어요'
        };
      case '춥다':
      default:
        return {
          baseStem: '춥',
          baseEnding: '다',
          fallingRedEnding: '었어요',
          magicStem: '추웠',
          magicStemChars: [
            { char: '추', color: BLACK },
            { char: '웠', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '추웠어요'
        };
    }
  }

  // 6단원: -았어요 규칙 (맞다, 닦다, 앉다, 잡다, 좋다)
  if (unit === 'unit6') {
    const baseParts = getBaseWordParts(baseWord, unit);
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: '았어요',
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: '았어요',
      magicEndingColor: RED
    };
  }

  // 7단원: -었어요 규칙 (있다, 신다, 웃다, 쉬다, 만들다)
  if (unit === 'unit7') {
    const baseParts = getBaseWordParts(baseWord, unit);
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: '었어요',
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: '었어요',
      magicEndingColor: RED
    };
  }

  // 8단원: -했어요 규칙 (시작하다, 대답하다, 정리하다, 운동하다, 양보하다)
  if (unit === 'unit8') {
    const baseParts = getBaseWordParts(baseWord, unit);
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: '했어요',
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: '했어요',
      magicEndingColor: RED
    };
  }

  // 4단원: -아요 ★ - 학습지 색깔과 100% 일치
  if (unit === 'unit4') {
    switch (baseWord) {
      case '오다':
        return {
          baseStem: '오',
          baseEnding: '다',
          fallingRedEnding: '아요',
          magicStem: '와',
          magicStemChars: [{ char: '와', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '요',
          magicEndingColor: RED
        };
      case '보다':
        return {
          baseStem: '보',
          baseEnding: '다',
          fallingRedEnding: '아요',
          magicStem: '봐',
          magicStemChars: [{ char: '봐', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '요',
          magicEndingColor: RED
        };
      case '가다':
        return {
          baseStem: '가',
          baseEnding: '다',
          fallingRedEnding: '아요',
          magicStem: '가',
          magicStemChars: [{ char: '가', color: BLACK }],
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '요',
          magicEndingColor: RED
        };
      case '아프다':
        return {
          baseStem: '아프',
          baseEnding: '다',
          fallingRedEnding: '아요',
          magicStem: '아파',
          magicStemChars: [
            { char: '아', color: BLACK },
            { char: '파', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '요',
          magicEndingColor: RED
        };
      case '돕다':
        return {
          baseStem: '돕',
          baseEnding: '다',
          fallingRedEnding: '아요',
          magicStem: '도와',
          magicStemChars: [
            { char: '도', color: BLACK },
            { char: '와', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '요',
          magicEndingColor: RED
        };
    }
  }

  // 5단원: -어요 ★ - 학습지 색깔과 100% 일치
  if (unit === 'unit5') {
    switch (baseWord) {
      case '주다':
        return {
          baseStem: '주',
          baseEnding: '다',
          fallingRedEnding: '어요',
          magicStem: '줘',
          magicStemChars: [{ char: '줘', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '요',
          magicEndingColor: RED
        };
      case '마시다':
        return {
          baseStem: '마시',
          baseEnding: '다',
          fallingRedEnding: '어요',
          magicStem: '마셔',
          magicStemChars: [
            { char: '마', color: BLACK },
            { char: '셔', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '요',
          magicEndingColor: RED
        };
      case '쓰다':
        return {
          baseStem: '쓰',
          baseEnding: '다',
          fallingRedEnding: '어요',
          magicStem: '써',
          magicStemChars: [{ char: '써', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '요',
          magicEndingColor: RED
        };
      case '듣다':
        return {
          baseStem: '듣',
          baseEnding: '다',
          fallingRedEnding: '어요',
          magicStem: '들',
          magicStemChars: [{ char: '들', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '어요',
          magicEndingColor: RED
        };
      case '부르다':
        return {
          baseStem: '부르',
          baseEnding: '다',
          fallingRedEnding: '어요',
          magicStem: '불러',
          magicStemChars: [
            { char: '불', color: PURPLE },
            { char: '러', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '요',
          magicEndingColor: RED
        };
    }
  }

  // 11단원: 부정1 (안 [용언], 못 [용언])
  // - 어간(검정) + 어미(어요/아요 빨강, 축약 '겨/져' 보라 + '요' 빨강)
  // - 앞 위치 부사('안'/'못')는 초록색(#16A34A)으로 날아와서 위치
  if (unit === 'unit11') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '울다':
        return {
          prefixAdverb: '안',
          prefixColor: GREEN,
          baseStem: '울',
          baseEnding: '다',
          fallingRedEnding: '어요',
          magicStem: '울',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '어요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '안 울어요'
        };
      case '쏟다':
        return {
          prefixAdverb: '안',
          prefixColor: GREEN,
          baseStem: '쏟',
          baseEnding: '다',
          fallingRedEnding: '아요',
          magicStem: '쏟',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '아요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '안 쏟아요'
        };
      case '남기다':
        return {
          prefixAdverb: '안',
          prefixColor: GREEN,
          baseStem: '남기',
          baseEnding: '다',
          fallingRedEnding: '어요',
          magicStem: '남',
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '겨요',
          magicEndingColor: PURPLE,
          isFullWordMagic: false,
          fullConjugatedWord: '안 남겨요'
        };
      case '참다':
        return {
          prefixAdverb: '못',
          prefixColor: GREEN,
          baseStem: '참',
          baseEnding: '다',
          fallingRedEnding: '아요',
          magicStem: '참',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '아요',
          magicEndingColor: RED,
          isFullWordMagic: false,
          fullConjugatedWord: '못 참아요'
        };
      case '던지다':
        return {
          prefixAdverb: '못',
          prefixColor: GREEN,
          baseStem: '던지',
          baseEnding: '다',
          fallingRedEnding: '어요',
          magicStem: '던',
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '져요',
          magicEndingColor: PURPLE,
          isFullWordMagic: false,
          fullConjugatedWord: '못 던져요'
        };
    }

    return {
      prefixAdverb: '안',
      prefixColor: GREEN,
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: '어요',
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: '어요',
      magicEndingColor: RED,
      isFullWordMagic: false
    };
  }

  // 12단원: 부정2 ([명사] 안 해요, [명사] 못 해요)
  if (unit === 'unit12') {
    const baseParts = getBaseWordParts(baseWord, unit);
    const adverb: '안' | '못' = (baseWord === '게임하다' || baseWord === '샤워하다') ? '안' : '못';
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: '해요',
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: '해요',
      magicEndingColor: RED,
      midAdverb: adverb,
      midAdverbColor: GREEN,
      fullConjugatedWord: `${baseParts.stem} ${adverb} 해요`
    };
  }

  // 13단원: 희망 (-고 싶어요)
  if (unit === 'unit13') {
    const baseParts = getBaseWordParts(baseWord, unit);
    const endingText = baseWord.endsWith('하다') ? '하고 싶어요' : '고 싶어요';
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: endingText,
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: endingText,
      magicEndingColor: RED,
      fullConjugatedWord: `${baseParts.stem}${endingText}`
    };
  }

  // 14단원: 진행 (-고 있어요)
  if (unit === 'unit14') {
    const baseParts = getBaseWordParts(baseWord, unit);
    const endingText = baseWord.endsWith('하다') ? '하고 있어요' : '고 있어요';
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: endingText,
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: endingText,
      magicEndingColor: RED,
      fullConjugatedWord: `${baseParts.stem}${endingText}`
    };
  }

  // 15단원: 요청 (-세요, -으세요)
  if (unit === 'unit15') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '걷다':
        return {
          baseStem: '걷',
          baseEnding: '다',
          fallingRedEnding: '으세요',
          magicStem: '걸',
          magicStemChars: [{ char: '걸', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '으세요',
          magicEndingColor: RED,
          fullConjugatedWord: '걸으세요'
        };
      case '풀다':
        return {
          baseStem: '풀',
          baseEnding: '다',
          fallingRedEnding: '세요',
          magicStem: '푸',
          magicStemChars: [{ char: '푸', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '세요',
          magicEndingColor: RED,
          fullConjugatedWord: '푸세요'
        };
      default: {
        const endingText = baseWord === '말하다' ? '하세요' : baseWord === '넣다' ? '으세요' : '세요';
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: endingText,
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: endingText,
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}${endingText}`
        };
      }
    }
  }

  // 16단원: 금지 (-지 마세요)
  if (unit === 'unit16') {
    const baseParts = getBaseWordParts(baseWord, unit);
    const endingText = baseWord.endsWith('하다') ? '하지 마세요' : '지 마세요';
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: endingText,
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: endingText,
      magicEndingColor: RED,
      fullConjugatedWord: `${baseParts.stem}${endingText}`
    };
  }

  // 17단원: 미래 (-ㄹ 거예요, -을 거예요)
  if (unit === 'unit17') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '가져오다':
        return {
          baseStem: '가져오',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ 거예요',
          magicStem: '가져올',
          magicStemChars: [
            { char: '가', color: BLACK },
            { char: '져', color: BLACK },
            { char: '올', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 거예요',
          magicEndingColor: RED,
          fullConjugatedWord: '가져올 거예요'
        };
      case '끝나다':
        return {
          baseStem: '끝나',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ 거예요',
          magicStem: '끝날',
          magicStemChars: [
            { char: '끝', color: BLACK },
            { char: '날', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 거예요',
          magicEndingColor: RED,
          fullConjugatedWord: '끝날 거예요'
        };
      case '일어나다':
        return {
          baseStem: '일어나',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ 거예요',
          magicStem: '일어날',
          magicStemChars: [
            { char: '일', color: BLACK },
            { char: '어', color: BLACK },
            { char: '날', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 거예요',
          magicEndingColor: RED,
          fullConjugatedWord: '일어날 거예요'
        };
      case '살다':
        return {
          baseStem: '살',
          baseEnding: '다',
          fallingRedEnding: ' 거예요',
          magicStem: '살',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: ' 거예요',
          magicEndingColor: RED,
          fullConjugatedWord: '살 거예요'
        };
      case '놓다':
      default:
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: '을 거예요',
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '을 거예요',
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}을 거예요`
        };
    }
  }

  // 18단원: 부탁 (-아 주세요, -어 주세요, -해 주세요)
  if (unit === 'unit18') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '기다리다':
        return {
          baseStem: '기다리',
          baseEnding: '다',
          fallingRedEnding: '어 주세요',
          magicStem: '기다려',
          magicStemChars: [
            { char: '기', color: BLACK },
            { char: '다', color: BLACK },
            { char: '려', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 주세요',
          magicEndingColor: RED,
          fullConjugatedWord: '기다려 주세요'
        };
      case '끄다':
        return {
          baseStem: '끄',
          baseEnding: '다',
          fallingRedEnding: '어 주세요',
          magicStem: '꺼',
          magicStemChars: [{ char: '꺼', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: ' 주세요',
          magicEndingColor: RED,
          fullConjugatedWord: '꺼 주세요'
        };
      case '설명하다':
        return {
          baseStem: '설명',
          baseEnding: '하다',
          fallingRedEnding: '해 주세요',
          magicStem: '설명',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '해 주세요',
          magicEndingColor: RED,
          fullConjugatedWord: '설명해 주세요'
        };
      case '깎다':
        return {
          baseStem: '깎',
          baseEnding: '다',
          fallingRedEnding: '아 주세요',
          magicStem: '깎',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '아 주세요',
          magicEndingColor: RED,
          fullConjugatedWord: '깎아 주세요'
        };
      case '켜다':
      default:
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: ' 주세요',
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: ' 주세요',
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem} 주세요`
        };
    }
  }

  // 19단원: 허락 (-아도 돼요?, -어도 돼요?, -해도 돼요?)
  if (unit === 'unit19') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '빌리다':
        return {
          baseStem: '빌리',
          baseEnding: '다',
          fallingRedEnding: '어도 돼요?',
          magicStem: '빌려',
          magicStemChars: [
            { char: '빌', color: BLACK },
            { char: '려', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '도 돼요?',
          magicEndingColor: RED,
          fullConjugatedWord: '빌려도 돼요?'
        };
      case '움직이다':
        return {
          baseStem: '움직이',
          baseEnding: '다',
          fallingRedEnding: '어도 돼요?',
          magicStem: '움직여',
          magicStemChars: [
            { char: '움', color: BLACK },
            { char: '직', color: BLACK },
            { char: '여', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '도 돼요?',
          magicEndingColor: RED,
          fullConjugatedWord: '움직여도 돼요?'
        };
      case '사용하다':
        return {
          baseStem: '사용',
          baseEnding: '하다',
          fallingRedEnding: '해도 돼요?',
          magicStem: '사용',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '해도 돼요?',
          magicEndingColor: RED,
          fullConjugatedWord: '사용해도 돼요?'
        };
      default:
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: '도 돼요?',
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '도 돼요?',
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}도 돼요?`
        };
    }
  }

  // 20단원: 의무 (-아야 돼요, -어야 돼요, -해야 돼요)
  if (unit === 'unit20') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '지키다':
        return {
          baseStem: '지키',
          baseEnding: '다',
          fallingRedEnding: '어야 돼요',
          magicStem: '지켜',
          magicStemChars: [
            { char: '지', color: BLACK },
            { char: '켜', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '야 돼요',
          magicEndingColor: RED,
          fullConjugatedWord: '지켜야 돼요'
        };
      case '바르다':
        return {
          baseStem: '바르',
          baseEnding: '다',
          fallingRedEnding: '아야 돼요',
          magicStem: '발라',
          magicStemChars: [
            { char: '발', color: PURPLE },
            { char: '라', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '야 돼요',
          magicEndingColor: RED,
          fullConjugatedWord: '발라야 돼요'
        };
      case '조심하다':
        return {
          baseStem: '조심',
          baseEnding: '하다',
          fallingRedEnding: '해야 돼요',
          magicStem: '조심',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '해야 돼요',
          magicEndingColor: RED,
          fullConjugatedWord: '조심해야 돼요'
        };
      case '남다':
        return {
          baseStem: '남',
          baseEnding: '다',
          fallingRedEnding: '아야 돼요',
          magicStem: '남',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '아야 돼요',
          magicEndingColor: RED,
          fullConjugatedWord: '남아야 돼요'
        };
      case '꺼내다':
      default:
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: '야 돼요',
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '야 돼요',
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}야 돼요`
        };
    }
  }

  // 21단원: 능력 (-ㄹ(을) 수 있어요, -ㄹ(을) 수 없어요)
  if (unit === 'unit21') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '건너다':
        return {
          baseStem: '건너',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ 수 있어요',
          magicStem: '건널',
          magicStemChars: [
            { char: '건', color: BLACK },
            { char: '널', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 수 있어요',
          magicEndingColor: RED,
          fullConjugatedWord: '건널 수 있어요'
        };
      case '날다':
        return {
          baseStem: '날',
          baseEnding: '다',
          fallingRedEnding: ' 수 있어요',
          magicStem: '날',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: ' 수 있어요',
          magicEndingColor: RED,
          fullConjugatedWord: '날 수 있어요'
        };
      case '접다':
        return {
          baseStem: '접',
          baseEnding: '다',
          fallingRedEnding: '을 수 있어요',
          magicStem: '접',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '을 수 있어요',
          magicEndingColor: RED,
          fullConjugatedWord: '접을 수 있어요'
        };
      case '밟다':
        return {
          baseStem: '밟',
          baseEnding: '다',
          fallingRedEnding: '을 수 없어요',
          magicStem: '밟',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '을 수 없어요',
          magicEndingColor: RED,
          fullConjugatedWord: '밟을 수 없어요'
        };
      case '올리다':
      default:
        return {
          baseStem: '올리',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ 수 없어요',
          magicStem: '올릴',
          magicStemChars: [
            { char: '올', color: BLACK },
            { char: '릴', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 수 없어요',
          magicEndingColor: RED,
          fullConjugatedWord: '올릴 수 없어요'
        };
    }
  }

  // 22단원: 제안 (-ㄹ까요?, -을까요?)
  if (unit === 'unit22') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '나누다':
        return {
          baseStem: '나누',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ까요?',
          magicStem: '나눌',
          magicStemChars: [
            { char: '나', color: BLACK },
            { char: '눌', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '까요?',
          magicEndingColor: RED,
          fullConjugatedWord: '나눌까요?'
        };
      case '바꾸다':
        return {
          baseStem: '바꾸',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ까요?',
          magicStem: '바꿀',
          magicStemChars: [
            { char: '바', color: BLACK },
            { char: '꿀', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '까요?',
          magicEndingColor: RED,
          fullConjugatedWord: '바꿀까요?'
        };
      case '모이다':
        return {
          baseStem: '모이',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ까요?',
          magicStem: '모일',
          magicStemChars: [
            { char: '모', color: BLACK },
            { char: '일', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '까요?',
          magicEndingColor: RED,
          fullConjugatedWord: '모일까요?'
        };
      case '빼다':
        return {
          baseStem: '빼',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ까요?',
          magicStem: '뺄',
          magicStemChars: [{ char: '뺄', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '까요?',
          magicEndingColor: RED,
          fullConjugatedWord: '뺄까요?'
        };
      case '더하다':
      default:
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: '할까요?',
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '할까요?',
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}할까요?`
        };
    }
  }

  // 23단원: 나열 (-고)
  if (unit === 'unit23') {
    const baseParts = getBaseWordParts(baseWord, unit);
    const endingText = baseWord.endsWith('하다') ? '하고' : '고';
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: endingText,
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: endingText,
      magicEndingColor: RED,
      fullConjugatedWord: `${baseParts.stem}${endingText}`
    };
  }

  // 24단원: 대조 (-지만)
  if (unit === 'unit24') {
    const baseParts = getBaseWordParts(baseWord, unit);
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: '지만',
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: '지만',
      magicEndingColor: RED,
      fullConjugatedWord: `${baseParts.stem}지만`
    };
  }

  // 25단원: 이유 (-아서, -어서, -해서)
  if (unit === 'unit25') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '배고프다':
        return {
          baseStem: '배고프',
          baseEnding: '다',
          fallingRedEnding: '아서',
          magicStem: '배고파',
          magicStemChars: [
            { char: '배', color: BLACK },
            { char: '고', color: BLACK },
            { char: '파', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '서',
          magicEndingColor: RED,
          fullConjugatedWord: '배고파서'
        };
      case '덥다':
        return {
          baseStem: '덥',
          baseEnding: '다',
          fallingRedEnding: '어서',
          magicStem: '더워',
          magicStemChars: [
            { char: '더', color: BLACK },
            { char: '워', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '서',
          magicEndingColor: RED,
          fullConjugatedWord: '더워서'
        };
      case '빠르다':
        return {
          baseStem: '빠르',
          baseEnding: '다',
          fallingRedEnding: '아서',
          magicStem: '빨라',
          magicStemChars: [
            { char: '빨', color: PURPLE },
            { char: '라', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '서',
          magicEndingColor: RED,
          fullConjugatedWord: '빨라서'
        };
      case '다치다':
        return {
          baseStem: '다치',
          baseEnding: '다',
          fallingRedEnding: '어서',
          magicStem: '다쳐',
          magicStemChars: [
            { char: '다', color: BLACK },
            { char: '쳐', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: '서',
          magicEndingColor: RED,
          fullConjugatedWord: '다쳐서'
        };
      case '늦다':
      default:
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: '어서',
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '어서',
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}어서`
        };
    }
  }

  // 26단원: 조건 (-면, -으면)
  if (unit === 'unit26') {
    if (baseWord === '그렇다') {
      return {
        baseStem: '그렇',
        baseEnding: '다',
        fallingRedEnding: '으면',
        magicStem: '그러',
        magicStemChars: [
          { char: '그', color: BLACK },
          { char: '러', color: PURPLE }
        ],
        isStemAltered: true,
        magicStemColor: BLACK,
        magicEnding: '면',
        magicEndingColor: RED,
        fullConjugatedWord: '그러면'
      };
    }
    const baseParts = getBaseWordParts(baseWord, unit);
    const endingText = baseWord.endsWith('하다') ? '하면' : baseWord === '작다' ? '으면' : '면';
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: endingText,
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: endingText,
      magicEndingColor: RED,
      fullConjugatedWord: `${baseParts.stem}${endingText}`
    };
  }

  // 27단원: 시간 (-ㄹ 때, -을 때)
  if (unit === 'unit27') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '졸리다':
        return {
          baseStem: '졸리',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ 때',
          magicStem: '졸릴',
          magicStemChars: [
            { char: '졸', color: BLACK },
            { char: '릴', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 때',
          magicEndingColor: RED,
          fullConjugatedWord: '졸릴 때'
        };
      case '혼나다':
        return {
          baseStem: '혼나',
          baseEnding: '다',
          fallingRedEnding: 'ㄹ 때',
          magicStem: '혼날',
          magicStemChars: [
            { char: '혼', color: BLACK },
            { char: '날', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 때',
          magicEndingColor: RED,
          fullConjugatedWord: '혼날 때'
        };
      case '벗다':
        return {
          baseStem: '벗',
          baseEnding: '다',
          fallingRedEnding: '을 때',
          magicStem: '벗',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '을 때',
          magicEndingColor: RED,
          fullConjugatedWord: '벗을 때'
        };
      default: {
        const endingText = baseWord.endsWith('하다') ? '할 때' : '을 때';
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: endingText,
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: endingText,
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}${endingText}`
        };
      }
    }
  }

  // 28단원: 목적 (-러 가요, -으러 가요 / -러 와요, -으러 와요)
  if (unit === 'unit28') {
    const baseParts = getBaseWordParts(baseWord, unit);
    const endingText =
      baseWord === '반납하다'
        ? '하러 와요'
        : baseWord === '심다'
        ? '으러 가요'
        : baseWord.endsWith('하다')
        ? '하러 가요'
        : '러 가요';
    return {
      baseStem: baseParts.stem,
      baseEnding: baseParts.ending,
      fallingRedEnding: endingText,
      magicStem: baseParts.stem,
      isStemAltered: false,
      magicStemColor: BLACK,
      magicEnding: endingText,
      magicEndingColor: RED,
      fullConjugatedWord: `${baseParts.stem}${endingText}`
    };
  }

  // 29단원: 순서 (-기 전에, -ㄴ 후에, -은 후에)
  if (unit === 'unit29') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '모으다':
        return {
          baseStem: '모으',
          baseEnding: '다',
          fallingRedEnding: 'ㄴ 후에',
          magicStem: '모은',
          magicStemChars: [
            { char: '모', color: BLACK },
            { char: '은', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 후에',
          magicEndingColor: RED,
          fullConjugatedWord: '모은 후에'
        };
      case '양치하다':
        return {
          baseStem: '양치',
          baseEnding: '하다',
          fallingRedEnding: '하기 전에',
          magicStem: '양치',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '하기 전에',
          magicEndingColor: RED,
          fullConjugatedWord: '양치하기 전에'
        };
      case '자르다':
        return {
          baseStem: '자르',
          baseEnding: '다',
          fallingRedEnding: '기 전에',
          magicStem: '자르',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '기 전에',
          magicEndingColor: RED,
          fullConjugatedWord: '자르기 전에'
        };
      case '연습하다':
        return {
          baseStem: '연습',
          baseEnding: '하다',
          fallingRedEnding: '한 후에',
          magicStem: '연습',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '한 후에',
          magicEndingColor: RED,
          fullConjugatedWord: '연습한 후에'
        };
      case '섞다':
      default:
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: '은 후에',
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '은 후에',
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}은 후에`
        };
    }
  }

  // 30단원: 경험 (-아 봤어요, -어 봤어요, -해 봤어요)
  if (unit === 'unit30') {
    const baseParts = getBaseWordParts(baseWord, unit);
    switch (baseWord) {
      case '춤추다':
        return {
          baseStem: '춤추',
          baseEnding: '다',
          fallingRedEnding: '어 봤어요',
          magicStem: '춤춰',
          magicStemChars: [
            { char: '춤', color: BLACK },
            { char: '춰', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 봤어요',
          magicEndingColor: RED,
          fullConjugatedWord: '춤춰 봤어요'
        };
      case '외우다':
        return {
          baseStem: '외우',
          baseEnding: '다',
          fallingRedEnding: '어 봤어요',
          magicStem: '외워',
          magicStemChars: [
            { char: '외', color: BLACK },
            { char: '워', color: PURPLE }
          ],
          isStemAltered: true,
          magicStemColor: BLACK,
          magicEnding: ' 봤어요',
          magicEndingColor: RED,
          fullConjugatedWord: '외워 봤어요'
        };
      case '묻다':
        return {
          baseStem: '묻',
          baseEnding: '다',
          fallingRedEnding: '어봤어요',
          magicStem: '물',
          magicStemChars: [{ char: '물', color: PURPLE }],
          isStemAltered: true,
          magicStemColor: PURPLE,
          magicEnding: '어봤어요',
          magicEndingColor: RED,
          fullConjugatedWord: '물어봤어요'
        };
      case '도전하다':
        return {
          baseStem: '도전',
          baseEnding: '하다',
          fallingRedEnding: '해 봤어요',
          magicStem: '도전',
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '해 봤어요',
          magicEndingColor: RED,
          fullConjugatedWord: '도전해 봤어요'
        };
      case '안다':
      default:
        return {
          baseStem: baseParts.stem,
          baseEnding: baseParts.ending,
          fallingRedEnding: '아 봤어요',
          magicStem: baseParts.stem,
          isStemAltered: false,
          magicStemColor: BLACK,
          magicEnding: '아 봤어요',
          magicEndingColor: RED,
          fullConjugatedWord: `${baseParts.stem}아 봤어요`
        };
    }
  }

  // Fallback for Units 1~3
  const baseParts = getBaseWordParts(baseWord, unit);
  const falling = unit === 'unit3' ? '해요' : unit === 'unit2' ? '어요' : '아요';
  return {
    baseStem: baseParts.stem,
    baseEnding: baseParts.ending,
    fallingRedEnding: falling,
    magicStem: baseParts.stem,
    isStemAltered: false,
    magicStemColor: BLACK,
    magicEnding: falling,
    magicEndingColor: RED
  };
}

/**
 * 4. 플래시카드 단원별 내려오는 카드 기본 텍스트
 */
export function getFallingCardText(unit: string): string {
  switch (unit) {
    case 'unit1':
    case 'unit4':
      return '아요';
    case 'unit2':
    case 'unit5':
      return '어요';
    case 'unit3':
      return '해요';
    case 'unit6':
    case 'unit9':
      return '았어요';
    case 'unit7':
    case 'unit10':
      return '었어요';
    case 'unit8':
      return '했어요';
    case 'unit11':
      return '안 / 못';
    case 'unit12':
      return '안 해요 / 못 해요';
    case 'unit13':
      return '-고 싶어요';
    case 'unit14':
      return '-고 있어요';
    case 'unit15':
      return '-세요 / -으세요';
    case 'unit16':
      return '-지 마세요';
    case 'unit17':
      return '-ㄹ 거예요 / -을 거예요';
    case 'unit18':
      return '-아/어/해 주세요';
    case 'unit19':
      return '-아/어/해도 돼요?';
    case 'unit20':
      return '-아/어/해야 돼요';
    case 'unit21':
      return '-ㄹ/을 수 있어요(없어요)';
    case 'unit22':
      return '-ㄹ까요? / -을까요?';
    case 'unit23':
      return '-고';
    case 'unit24':
      return '-지만';
    case 'unit25':
      return '-아서 / -어서 / -해서';
    case 'unit26':
      return '-면 / -으면';
    case 'unit27':
      return '-ㄹ 때 / -을 때';
    case 'unit28':
      return '-러 가요 / -으러 가요';
    case 'unit29':
      return '-기 전에 / -(으)ㄴ 후에';
    case 'unit30':
      return '-아/어/해 봤어요';
    default:
      return '아요';
  }
}

export interface VerbEndingQuestion {
  unitId: VerbUnitType;
  card: VerbCardItem;
  stemDisplay: string;
  baseEnding: string;
  cueBadge?: string;
  correctOption: string;
  options: string[];
  optionHints?: Record<string, string>;
}

const PRESENT_BY_PAST_GROUP: Record<string, '-아요' | '-어요' | '-해요'> = {
  '-았어요': '-아요',
  '-었어요': '-어요',
  '-했어요': '-해요',
};

export function buildVerbEndingQuestion(
  unit: VerbUnitType,
  card: VerbCardItem
): VerbEndingQuestion {
  const baseParts = getBaseWordParts(card.baseWord, unit);
  const stemDisplay = card.stem || baseParts.stem;
  const baseEnding = baseParts.ending;
  const isHada = baseEnding === '하다';

  let correctOption = '';
  let distractors: string[] = [];
  let cueBadge: string | undefined;
  const optionHints: Record<string, string> = {};

  switch (unit) {
    case 'unit1':
      correctOption = '-아요';
      distractors = ['-어요', '-해요', '-으요'];
      optionHints['-어요'] = "어간에 밝은 모음 'ㅏ·ㅗ'가 있으니 '-어요'는 어색한 비문이에요. '-아요'가 맞아요!";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
      optionHints['-으요'] = "'-으요'라는 활용 어미는 없어요! 모음조화에 맞춰 '-아요'를 붙여요.";
      break;
    case 'unit2':
      correctOption = '-어요';
      distractors = ['-아요', '-해요', '-으요'];
      optionHints['-아요'] = "어간에 'ㅏ·ㅗ'가 없으므로 '-아요'를 붙일 수 없어요. '-어요'가 맞아요!";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
      optionHints['-으요'] = "'-으요'라는 활용 어미는 없어요! '-어요'를 붙여요.";
      break;
    case 'unit3':
      correctOption = '-해요';
      distractors = ['-아요', '-어요', '-으요'];
      optionHints['-아요'] = "'하다' 동사는 어간 뒤에 '-아요'가 아니라 '-해요'로 결합해요!";
      optionHints['-어요'] = "'하다' 동사는 '-어요'가 아니라 '-해요'가 문법에 맞아요!";
      optionHints['-으요'] = "'-으요'라는 어미는 쓸 수 없어요. '하다 → 해요'예요!";
      break;
    case 'unit4':
      correctOption = '-아요';
      distractors = ['-어요', '-해요', '-으요'];
      optionHints['-어요'] = "어간이 변신해도 'ㅏ·ㅗ' 계열이므로 '-어요'는 비문이에요. '-아요'예요!";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 쓸 수 없어요!";
      optionHints['-으요'] = "'-으요'라는 활용 어미는 없어요! '-아요'가 맞아요.";
      cueBadge = '★ 변신 (ㅏ·ㅗ 계열)';
      break;
    case 'unit5':
      correctOption = '-어요';
      distractors = ['-아요', '-해요', '-으요'];
      optionHints['-아요'] = "이 어간은 'ㅏ·ㅗ'가 아니므로 '-아요'가 아니라 '-어요'가 맞아요!";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
      optionHints['-으요'] = "'-으요'라는 활용 어미는 없어요! '-어요'를 골라요.";
      cueBadge = '★ 변신 (ㅓ·ㅜ·ㅡ 계열)';
      break;
    case 'unit6':
    case 'unit9':
      correctOption = '-았어요';
      distractors = ['-었어요', '-해요', '-으어요'];
      cueBadge = unit === 'unit9' ? '🕰️ 과거 ★변신' : '🕰️ 과거';
      optionHints['-었어요'] = "어간에 'ㅏ·ㅗ'가 있으므로 '-었어요'는 비문이에요! '-았어요'가 맞아요.";
      optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
      optionHints['-으어요'] = "'-으어요'라는 어미는 한국어에 없어요!";
      break;
    case 'unit7':
    case 'unit10':
      if (unit === 'unit10' && card.baseWord === '까맣다') {
        correctOption = '-았어요';
        distractors = ['-었어요', '-해요', '-으어요'];
        optionHints['-었어요'] = "'까맣-'에는 밝은 모음 'ㅏ'가 있어서 '-었어요'가 아니라 '-았어요'예요!";
        optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 쓸 수 없어요!";
        optionHints['-으어요'] = "'-으어요'라는 어미는 문법에 맞지 않아요!";
      } else {
        correctOption = '-었어요';
        distractors = ['-았어요', '-해요', '-으어요'];
        optionHints['-았어요'] = "어간에 'ㅏ·ㅗ'가 없으므로 '-았어요'는 비문이에요! '-었어요'가 맞아요.";
        optionHints['-해요'] = "'하다' 동사가 아니므로 '-해요'를 붙일 수 없어요!";
        optionHints['-으어요'] = "'-으어요'라는 어미는 문법에 맞지 않아요!";
      }
      cueBadge = unit === 'unit10' ? '🕰️ 과거 ★변신' : '🕰️ 과거';
      break;
    case 'unit8':
      correctOption = '-했어요';
      distractors = ['-았어요', '-었어요', '-으어요'];
      cueBadge = '🕰️ 과거 (하다)';
      optionHints['-았어요'] = "'하다' 동사의 과거형은 '-았어요'가 아니라 '-했어요'예요!";
      optionHints['-었어요'] = "'하다' 동사의 과거형은 '-었어요'가 아니라 '-했어요'예요!";
      optionHints['-으어요'] = "'-으어요'라는 어미는 쓸 수 없어요. '하다 → 했어요'예요!";
      break;
    case 'unit11': {
      const isAn = card.conjugatedWord.startsWith('안 ');
      const endType = card.conjugatedEnding === '아요' ? '아요' : '어요';
      cueBadge = isAn ? '🙅 안 (안 함 · 의지)' : '🚫 못 (못 함 · 불가)';
      correctOption = `${isAn ? '안' : '못'} ~${endType}`;
      distractors = ['안 ~아요', '안 ~어요', '못 ~아요', '못 ~어요'].filter(
        (x) => x !== correctOption
      );
      for (const d of distractors) {
        if (d.startsWith(isAn ? '못' : '안')) {
          optionHints[d] = isAn
            ? "배지 확인! 스스로 하지 않는 '🙅 안' 부정 표현이에요!"
            : "배지 확인! 할 수 없는 '🚫 못' 부정 표현이에요!";
        } else {
          optionHints[d] = `모음 조화에 맞춰 어미가 '~${endType}'로 끝나야 비문이 되지 않아요!`;
        }
      }
      break;
    }
    case 'unit12': {
      const isAn = card.conjugatedEnding.startsWith('안');
      cueBadge = isAn ? '🙅 안 (의지 부정)' : '🚫 못 (능력·상황 부정)';
      correctOption = isAn ? '안 해요' : '못 해요';
      distractors = ['안 해요', '못 해요', '안 아요', '못 어요'].filter(
        (x) => x !== correctOption
      );
      optionHints[isAn ? '못 해요' : '안 해요'] = isAn
        ? "배지 확인! 스스로 안 하는 '🙅 안 해요'가 맞아요!"
        : "배지 확인! 능력·상황상 어려운 '🚫 못 해요'가 맞아요!";
      optionHints['안 아요'] = "'하다' 동사는 '-아요'가 아니라 '-해요'와 결합해요!";
      optionHints['못 어요'] = "'하다' 동사는 '-어요'가 아니라 '-해요'와 결합해요!";
      break;
    }
    case 'unit13':
      correctOption = isHada ? '-하고 싶어요' : '-고 싶어요';
      distractors = isHada
        ? ['-고 싶어요', '-으고 싶어요', '-아 싶어요']
        : ['-하고 싶어요', '-으고 싶어요', '-아 싶어요'];
      optionHints[isHada ? '-고 싶어요' : '-하고 싶어요'] = isHada
        ? "명사 뒤에 '하다'가 꼭 들어가야 하므로 '-하고 싶어요'예요!"
        : "'하다' 동사가 아니므로 '-하고' 없이 바로 '-고 싶어요'를 붙여요!";
      optionHints['-으고 싶어요'] = "'-고' 앞에는 '으'를 넣지 않아요!";
      optionHints['-아 싶어요'] = "희망을 말할 때는 '-아'가 아니라 '-고 싶어요'예요!";
      break;
    case 'unit14':
      correctOption = isHada ? '-하고 있어요' : '-고 있어요';
      distractors = isHada
        ? ['-고 있어요', '-으고 있어요', '-고 있아요']
        : ['-하고 있어요', '-으고 있어요', '-고 있아요'];
      optionHints[isHada ? '-고 있어요' : '-하고 있어요'] = isHada
        ? "명사 뒤에 '하다'가 살아 있어야 하므로 '-하고 있어요'예요!"
        : "'하다' 동사가 아니므로 '-하고' 없이 바로 '-고 있어요'를 붙여요!";
      optionHints['-으고 있어요'] = "'-고' 앞에는 '으'를 붙이지 않아요!";
      optionHints['-고 있아요'] = "'있-' 뒤에는 '-아요'가 아니라 '-어요'가 와야 해요 ('있어요')!";
      break;
    case 'unit15': {
      correctOption = isHada
        ? '-하세요'
        : card.conjugatedEnding.startsWith('으')
        ? '-으세요'
        : '-세요';
      distractors = ['-세요', '-으세요', '-하세요', '-아세요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      optionHints['-세요'] = "어간 끝에 받침이 남았으니 '-으세요'를 붙여야 발음이 자연스러워요!";
      optionHints['-으세요'] = isHada
        ? "'하다' 동사는 '-하세요'로 결합해요!"
        : "받침이 없거나 'ㄹ' 받침 뒤에는 '으' 없이 바로 '-세요'를 붙여요!";
      optionHints['-하세요'] = "'하다' 동사가 아니므로 '-하세요'는 비문이에요!";
      optionHints['-아세요'] = "요청·명령을 나타내는 어미는 '-아세요'가 아니라 '-(으)세요'예요!";
      break;
    }
    case 'unit16':
      correctOption = '-지 마세요';
      distractors = ['-으지 마세요', '-지 마아요', '-지 마해요'];
      cueBadge = '🚫 금지 부탁';
      optionHints['-으지 마세요'] = "'-지' 앞에는 '으'를 넣지 않고 어간에 바로 '-지 마세요'를 붙여요!";
      optionHints['-지 마아요'] = "'말다+세요'는 '마아요'가 아니라 '-지 마세요'예요!";
      optionHints['-지 마해요'] = "금지 표현의 끝은 '-마해요'가 아니라 '-지 마세요'예요!";
      break;
    case 'unit17':
      correctOption =
        card.conjugatedEnding === ' 거예요'
          ? '- 거예요'
          : card.conjugatedEnding.startsWith('을')
          ? '-을 거예요'
          : '-ㄹ 거예요';
      distractors = ['-ㄹ 거예요', '-을 거예요', '- 거예요', '-으 거예요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🚀 미래 계획';
      optionHints['-ㄹ 거예요'] = "어간 끝 받침이 남아 있으니 '-을 거예요'가 문법에 맞아요!";
      optionHints['-을 거예요'] = "받침이 없거나 'ㄹ' 받침일 때는 '-을'을 붙이면 비문이에요!";
      optionHints['- 거예요'] = "'ㄹ' 받침이 이미 있는 어간이 아니면 '- 거예요'만 붙일 수 없어요!";
      optionHints['-으 거예요'] = "미래 어미에는 ㄹ 받침이 필요해요 ('-(으)ㄹ 거예요')!";
      break;
    case 'unit18':
      if (isHada) correctOption = '-해 주세요';
      else if (card.vowelHint.includes('ㅏ') || card.conjugatedEnding.startsWith('아'))
        correctOption = '-아 주세요';
      else correctOption = '-어 주세요';
      distractors = ['-아 주세요', '-어 주세요', '-해 주세요', '-으 주세요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      optionHints['-아 주세요'] = "어간 모음에 맞게 '-어 주세요' 또는 '-해 주세요'를 써야 해요!";
      optionHints['-어 주세요'] = "어간에 'ㅏ·ㅗ'가 있거나 '하다' 동사일 땐 '-어 주세요'가 비문이에요!";
      optionHints['-해 주세요'] = "'하다' 동사가 아니므로 '-해 주세요'를 붙일 수 없어요!";
      optionHints['-으 주세요'] = "'-으 주세요'라는 형태는 문법에 없어요! '-아/어/해 주세요'예요.";
      break;
    case 'unit19':
      if (isHada) correctOption = '-해도 돼요?';
      else if (card.vowelHint.includes('ㅏ')) correctOption = '-아도 돼요?';
      else correctOption = '-어도 돼요?';
      distractors = ['-아도 돼요?', '-어도 돼요?', '-해도 돼요?', '-으도 돼요?']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🙋 허락 구하기';
      optionHints['-아도 돼요?'] = "'ㅏ·ㅗ'가 없을 땐 '-어도 돼요?'로 써야 자연스러워요!";
      optionHints['-어도 돼요?'] = "'ㅏ·ㅗ' 계열 어간이나 '하다' 동사에는 '-어도 돼요?'가 비문이에요!";
      optionHints['-해도 돼요?'] = "'하다' 동사가 아니므로 '-해도 돼요?'는 붙일 수 없어요!";
      optionHints['-으도 돼요?'] = "'-으도 돼요?'는 없는 형태예요! '-아/어/해도 돼요?'를 골라요.";
      break;
    case 'unit20':
      if (isHada) correctOption = '-해야 돼요';
      else if (
        card.vowelHint.includes('ㅏ 발견') ||
        card.vowelHint.includes('바르+아') ||
        card.conjugatedEnding.startsWith('아')
      ) {
        correctOption = '-아야 돼요';
      } else {
        correctOption = '-어야 돼요';
      }
      distractors = ['-아야 돼요', '-어야 돼요', '-해야 돼요', '-으야 돼요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '📌 의무';
      optionHints['-아야 돼요'] = "어간 모음 조화에 맞게 '-어야 돼요' 또는 '-해야 돼요'가 맞아요!";
      optionHints['-어야 돼요'] = "'ㅏ·ㅗ' 계열이나 '하다' 동사 뒤엔 '-어야 돼요'가 비문이에요!";
      optionHints['-해야 돼요'] = "'하다' 동사가 아니므로 '-해야 돼요'를 쓸 수 없어요!";
      optionHints['-으야 돼요'] = "'-으야 돼요'라는 어미는 한국어에 없어요!";
      break;
    case 'unit21': {
      const isPossible = card.conjugatedWord.includes('있어요');
      cueBadge = isPossible ? '⭕ 가능 (할 수 있음)' : '❌ 불가능 (할 수 없음)';
      if (card.conjugatedEnding.trim() === '수 있어요') correctOption = '- 수 있어요';
      else if (card.conjugatedEnding.startsWith('을'))
        correctOption = isPossible ? '-을 수 있어요' : '-을 수 없어요';
      else correctOption = isPossible ? '-ㄹ 수 있어요' : '-ㄹ 수 없어요';

      const suf = isPossible ? '있어요' : '없어요';
      const oppSuf = isPossible ? '없어요' : '있어요';
      distractors = [
        `-ㄹ 수 ${suf}`,
        `-을 수 ${suf}`,
        `- 수 ${suf}`,
        `-으 수 ${suf}`,
        `-ㄹ 수 ${oppSuf}`,
      ]
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      for (const d of distractors) {
        if (d.endsWith(oppSuf)) {
          optionHints[d] = isPossible
            ? "배지 확인! 할 수 있음('⭕ 가능')이므로 '있어요'를 골라야 해요!"
            : "배지 확인! 할 수 없음('❌ 불가능')이므로 '없어요'를 골라야 해요!";
        } else {
          optionHints[d] = "받침 유무(받침 O → -을, 받침 X → -ㄹ, ㄹ받침 → - 수)에 맞는 형태만 문법에 맞아요!";
        }
      }
      break;
    }
    case 'unit22':
      correctOption = isHada
        ? '-할까요?'
        : card.conjugatedEnding.startsWith('을')
        ? '-을까요?'
        : '-ㄹ까요?';
      distractors = ['-ㄹ까요?', '-을까요?', '-할까요?', '-으까요?']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🤝 제안하기';
      optionHints['-ㄹ까요?'] = "받침이 남는 어간에는 '-을까요?'가 붙어야 자연스러워요!";
      optionHints['-을까요?'] = "받침이 없거나 '하다' 동사에는 '-을까요?'를 붙이면 비문이에요!";
      optionHints['-할까요?'] = "'하다' 동사가 아니므로 '-할까요?'는 쓸 수 없어요!";
      optionHints['-으까요?'] = "'-으까요?'는 비문이에요! ㄹ 받침이 들어간 '-(으)ㄹ까요?'예요.";
      break;
    case 'unit23':
      correctOption = isHada ? '-하고' : '-고';
      distractors = isHada ? ['-고', '-으고', '-아고'] : ['-하고', '-으고', '-아고'];
      optionHints[isHada ? '-고' : '-하고'] = isHada
        ? "명사+'하다' 형태이므로 '-하고'를 붙여야 문장이 완성돼요!"
        : "'하다' 동사가 아니므로 바로 '-고'를 붙여요!";
      optionHints['-으고'] = "'-고' 앞에는 '으'를 넣지 않아요!";
      optionHints['-아고'] = "나열 연결 어미는 '-아고'가 아니라 '-고 / -하고'예요!";
      break;
    case 'unit24':
      correctOption = '-지만';
      distractors = ['-하지만', '-으지만', '-아지만'];
      cueBadge = '⚖️ 대조 연결';
      optionHints['-하지만'] = "'하다' 동사가 아닌데 '-하지만'을 붙이면 비문이에요!";
      optionHints['-으지만'] = "'-지만' 앞에는 '으'가 들어가지 않아요!";
      optionHints['-아지만'] = "'-지만'은 어간에 바로 붙어요 ('-아지만' ❌)!";
      break;
    case 'unit25':
      correctOption = isHada ? '-해서' : card.conjugatedEnding.startsWith('아') ? '-아서' : '-어서';
      distractors = ['-아서', '-어서', '-해서', '-으서']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '💡 이유·원인';
      optionHints['-아서'] = "어간 모음에 맞게 '-어서' 또는 '-해서'를 골라야 해요!";
      optionHints['-어서'] = "'ㅏ·ㅗ'가 있거나 '하다' 동사 뒤엔 '-어서'가 비문이에요!";
      optionHints['-해서'] = "'하다' 동사가 아니므로 '-해서'를 붙일 수 없어요!";
      optionHints['-으서'] = "이유 어미는 '-으서'가 아니라 '-아서/어서/해서'예요!";
      break;
    case 'unit26':
      correctOption = isHada
        ? '-하면'
        : card.conjugatedEnding.startsWith('으')
        ? '-으면'
        : '-면';
      distractors = ['-면', '-으면', '-하면', '-아면']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🔮 조건 (~하면)';
      optionHints['-면'] = "어간 끝 받침이 남아 있으니 '-으면'을 써야 해요!";
      optionHints['-으면'] = "받침이 없거나 'ㄹ' 받침·'하다' 동사에는 '-으면'이 비문이에요!";
      optionHints['-하면'] = "'하다' 동사가 아니므로 '-하면'은 붙일 수 없어요!";
      optionHints['-아면'] = "조건 어미는 '-아면'이 아니라 '-(으)면'이에요!";
      break;
    case 'unit27':
      correctOption = isHada
        ? '-할 때'
        : card.conjugatedEnding.startsWith('을')
        ? '-을 때'
        : '-ㄹ 때';
      distractors = ['-ㄹ 때', '-을 때', '-할 때', '-으 때']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '⏱️ 시간 (~할 때)';
      optionHints['-ㄹ 때'] = "받침이 남는 어간에는 '-을 때'가 붙어야 해요!";
      optionHints['-을 때'] = "받침이 없거나 'ㄹ' 받침·'하다' 동사에는 '-을 때'가 비문이에요!";
      optionHints['-할 때'] = "'하다' 동사가 아니므로 '-할 때'는 쓸 수 없어요!";
      optionHints['-으 때'] = "'-으 때'가 아니라 '-(으)ㄹ 때'로 ㄹ 받침이 들어가야 해요!";
      break;
    case 'unit28': {
      const isCome = card.conjugatedWord.includes('와요');
      if (isCome) {
        cueBadge = '🏫 목적 (~러 와요)';
        correctOption = '-하러 와요';
        distractors = ['-러 와요', '-으러 와요', '-아러 와요'];
        optionHints['-러 와요'] = "명사+'하다'는 '하'가 있어야 하므로 '-하러 와요'예요!";
        optionHints['-으러 와요'] = "'하다' 동사는 '-하러 와요'로 연결해요!";
        optionHints['-아러 와요'] = "'-아러 와요'라는 표현은 문법에 없어요!";
      } else {
        cueBadge = '🚶 목적 (~러 가요)';
        correctOption = isHada
          ? '-하러 가요'
          : card.conjugatedEnding.startsWith('으')
          ? '-으러 가요'
          : '-러 가요';
        distractors = ['-러 가요', '-으러 가요', '-하러 가요', '-아러 가요']
          .filter((x) => x !== correctOption)
          .slice(0, 3);
        optionHints['-러 가요'] = "받침이 남아 있는 어간 뒤에는 '-으러 가요'를 붙여야 해요!";
        optionHints['-으러 가요'] = "받침이 없거나 'ㄹ' 받침·'하다' 동사 뒤에는 '-으러'가 비문이에요!";
        optionHints['-하러 가요'] = "'하다' 동사가 아니므로 '-하러 가요'는 쓸 수 없어요!";
        optionHints['-아러 가요'] = "목적 어미는 '-아러 가요'가 아니라 '-(으)러 가요'예요!";
      }
      break;
    }
    case 'unit29': {
      const isBefore = card.conjugatedWord.includes('전에');
      cueBadge = isBefore ? '⏪ 순서 (~전에)' : '⏩ 순서 (~후에)';
      if (isBefore) {
        correctOption = isHada ? '-하기 전에' : '-기 전에';
        distractors = isHada
          ? ['-기 전에', '-으기 전에', '-아기 전에']
          : ['-하기 전에', '-으기 전에', '-아기 전에'];
        optionHints['-기 전에'] = "'하다' 동사는 '하'가 남아 '-하기 전에'가 맞아요!";
        optionHints['-하기 전에'] = "'하다' 동사가 아니므로 바로 '-기 전에'를 붙여요!";
        optionHints['-으기 전에'] = "'-기' 앞에는 '으'를 붙이지 않아요!";
        optionHints['-아기 전에'] = "순서 표현은 '-아기 전에'가 아니라 '-(하)기 전에'예요!";
      } else {
        correctOption = isHada
          ? '-한 후에'
          : card.conjugatedEnding.startsWith('은')
          ? '-은 후에'
          : '-ㄴ 후에';
        distractors = ['-ㄴ 후에', '-은 후에', '-한 후에', '-으 후에']
          .filter((x) => x !== correctOption)
          .slice(0, 3);
        optionHints['-ㄴ 후에'] = "받침이 있는 어간에는 '-은 후에'가 자연스러워요!";
        optionHints['-은 후에'] = "받침이 없거나 'ㄹ'·모음 어간 예외에는 '-ㄴ 후에'가 붙어요!";
        optionHints['-한 후에'] = "'하다' 동사가 아니므로 '-한 후에'는 쓸 수 없어요!";
        optionHints['-으 후에'] = "'-으 후에'가 아니라 ㄴ 받침이 있는 '-(으)ㄴ 후에'예요!";
      }
      break;
    }
    case 'unit30':
      correctOption = isHada
        ? '-해 봤어요'
        : card.conjugatedEnding.startsWith('아')
        ? '-아 봤어요'
        : '-어 봤어요';
      distractors = ['-아 봤어요', '-어 봤어요', '-해 봤어요', '-으 봤어요']
        .filter((x) => x !== correctOption)
        .slice(0, 3);
      cueBadge = '🌟 경험 (~해 봤어요)';
      optionHints['-아 봤어요'] = "어간 모음에 맞게 '-어 봤어요' 또는 '-해 봤어요'를 써야 해요!";
      optionHints['-어 봤어요'] = "'ㅏ·ㅗ'가 있거나 '하다' 동사 뒤엔 '-어 봤어요'가 비문이에요!";
      optionHints['-해 봤어요'] = "'하다' 동사가 아니므로 '-해 봤어요'는 쓸 수 없어요!";
      optionHints['-으 봤어요'] = "경험 어미는 '-으 봤어요'가 아니라 '-아/어/해 봤어요'예요!";
      break;
    default: {
      const guessedPresent = PRESENT_BY_PAST_GROUP[`-${card.conjugatedEnding.trim()}`];
      correctOption = `-${card.conjugatedEnding.trim()}`;
      distractors = ['-아요', '-어요', '-해요', ...(guessedPresent ? [guessedPresent] : [])]
        .filter((x) => x !== correctOption)
        .slice(0, 3);
    }
  }

  const uniqueDistractors = Array.from(new Set(distractors))
    .filter((d) => d !== correctOption)
    .slice(0, 3);
  const options = [correctOption, ...uniqueDistractors].sort(() => 0.5 - Math.random());

  return {
    unitId: unit,
    card,
    stemDisplay,
    baseEnding,
    cueBadge,
    correctOption,
    options,
    optionHints,
  };
}
