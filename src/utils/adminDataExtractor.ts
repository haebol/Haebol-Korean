import {
  SUPPORTED_LANGUAGES,
  SupportedLanguage,
  getLanguageMeta,
} from '../types';
import {
  VOCABULARY_DATA,
  CHAPTER_LIST,
  getChapterCircledTitle,
} from '../data/vocabulary';
import { CLASSROOM_PHRASES } from '../data/sentences';
import { EMERGENCY_CARDS } from '../data/emergency';
import { BASIC_LETTERS_DATA } from '../data/basicLettersData';
import { HANGEUL_GROUPS } from '../components/HangeulStrokeFlashcardSection';
import {
  CONSONANTS_DATA,
  VOWELS_DATA,
  CONSONANT_ROMAJA_MAP,
  VOWEL_ROMAJA_MAP,
} from '../components/PrintableJamoSheets';
import { BATCHIM_PAGES_DATA } from '../components/PrintableBatchimSheet';
import {
  VERB_UNIT_META,
  VERB_CARDS_BY_UNIT,
  VerbUnitType,
} from '../components/VerbConjugationSection';
import {
  PARTICLE_UNIT_META,
  PARTICLE_COLS_BY_UNIT,
  PARTICLE_ROWS_BY_UNIT,
  ParticleUnitId,
} from '../data/particleWorksheetData';
import {
  COLS_HINTS,
  ROW_HINTS,
} from '../components/ParticleFlashcardSection';
import { getVerbConjugatedMeaning } from '../data/verbConjugatedMeanings';
import {
  getParticleBaseMeaning,
  getParticleCombinedMeaning,
} from '../data/particleCombinedMeanings';

export type BackupScope = 'all' | 'hangeul' | 'classroom' | 'verb' | 'particle';
export type BlogSeriesType = 'classroom' | 'verb' | 'particle';

export interface UnitGrammarTextGuide {
  tipTitle: string;
  detectiveLines: string[];
  tipRule: string;
  tipExamples: string;
  tipNote: string;
  conjugationType?: string;
}

/**
 * 교실한국어 단원별 7개 언어 자동 로테이션 순서:
 * 1단원(영) → 2단원(베) → 3단원(벵) → 4단원(중) → 5단원(러) → 6단원(일) → 7단원(몽) ...
 */
export const CLASSROOM_LANG_ROTATION: SupportedLanguage[] = [
  'en',
  'vi',
  'bn',
  'zh',
  'ru',
  'ja',
  'mn',
];

export const getClassroomRotatedLang = (chapterNum: number): SupportedLanguage => {
  const idx = (((chapterNum - 1) % CLASSROOM_LANG_ROTATION.length) + CLASSROOM_LANG_ROTATION.length) % CLASSROOM_LANG_ROTATION.length;
  return CLASSROOM_LANG_ROTATION[idx];
};

export const VERB_UNIT_TEXT_GUIDES: Record<VerbUnitType, UnitGrammarTextGuide> = {
  unit1: {
    tipTitle: '해볼쌤 팁 | -아요',
    detectiveLines: [
      '‘다’ 앞 글자를 봐!',
      'ㅏ 있어?',
      'ㅗ 있어?',
      '그럼 [아요]를 가져와!!',
    ],
    tipRule: '동사나 형용사의 어간 끝음절 모음이 ㅏ, ㅗ이면 ‘-아요’를 붙여요.',
    tipExamples: '받다 → 받아요 / 놀다 → 놀아요 / 좋다 → 좋아요',
    tipNote:
      '‘-어1’는 동사나 형용사, ‘이다, 아니다′ 뒤에 붙어 생각을 말하거나 설명할 때 사용하는 종결어미이다. 높임 표현으로는 ‘-요’가 결합한 ‘-어요’의 형태로 사용한다. -국립국어원',
    conjugationType: '현재형 기본 (-아요)',
  },
  unit2: {
    tipTitle: '해볼쌤 팁 | -어요',
    detectiveLines: [
      '‘다’ 앞 글자를 봐!',
      'ㅏ 없어?',
      'ㅗ 없어?',
      '그럼 [어요]를 가져와!!',
    ],
    tipRule: '동사나 형용사의 어간 끝음절 모음이 ㅏ, ㅗ가 아니면 ‘-어요’를 붙여요.',
    tipExamples: '먹다 → 먹어요 / 씻다 → 씻어요 / 열다 → 열어요',
    tipNote: '‘다’를 빼고 ‘-어요’를 붙이는 기본 형태를 익혀 보세요.',
    conjugationType: '현재형 기본 (-어요)',
  },
  unit3: {
    tipTitle: '해볼쌤 팁 | -해요',
    detectiveLines: [
      '단어 끝을 봐!',
      '‘하다’가 있어?',
      '그럼 ‘하다’를 쏙 빼고,',
      '[해요]를 가져와!!',
    ],
    tipRule: '‘-하다’가 붙은 동사와 형용사는 ‘-여요’를 붙이며, 일상에서는 줄여서 ‘-해요’라고 써요.',
    tipExamples: '공부하다 → 공부해요 / 청소하다 → 청소해요 / 숙제하다 → 숙제해요',
    tipNote: '‘하여요’보다 ‘해요’ 형태를 일상생활에서 흔히 사용해요. ‘하다’ 자리에 ‘해요’를 쏙 바꿔 넣어 보세요.',
    conjugationType: '현재형 하다 (-해요)',
  },
  unit4: {
    tipTitle: '해볼쌤 팁 | -아요 ★',
    detectiveLines: [
      '‘다’ 앞 글자를 봐!',
      'ㅏ, ㅗ 있어? 그럼 [아요]!',
      '근데 모음이 만나 합체하거나,',
      '글자 모양이 살짝 바뀌기도 해! ★',
    ],
    tipRule: '‘-아요’를 붙일 때 모음이 합쳐지거나(‘오+아→와’), ‘ㅡ’ 탈락, 받침 ‘ㅂ→우(와)’ 변신이 일어나요.',
    tipExamples: '오다 → 와요 (축약) / 가다 → 가요 (탈락) / 아프다 → 아파요 (‘ㅡ’ 탈락) / 돕다 → 도와요 (ㅂ→와)',
    tipNote: '소리 내어 빠르게 읽으면 자연스럽게 줄어드는 모습을 보라색과 함께 익혀 보세요.',
    conjugationType: '축약·탈락·ㅂ불규칙 (-아요 ★)',
  },
  unit5: {
    tipTitle: '해볼쌤 팁 | -어요 ★',
    detectiveLines: [
      '‘다’ 앞 글자를 봐!',
      'ㅏ, ㅗ 없어? 그럼 [어요]!',
      '근데 ‘ㅡ’가 빠지거나 모음이 줄고,',
      '받침·‘르’가 살짝 바뀌기도 해! ★',
    ],
    tipRule: '‘-어요’를 붙일 때 모음이 줄어들거나(‘우+어→워’), ‘ㅡ’ 탈락, 받침 ‘ㄷ→ㄹ’, ‘르→ㄹ러’ 변신이 일어나요.',
    tipExamples: '주다 → 줘요 (축약) / 쓰다 → 써요 (‘ㅡ’ 탈락) / 듣다 → 들어요 (ㄷ→ㄹ) / 부르다 → 불러요 (르→ㄹ러)',
    tipNote: '보라색으로 바뀐 글자를 눈으로 짚어 보며 소리 내어 익혀 보세요.',
    conjugationType: '축약·ㅡ탈락·ㄷ불규칙·르불규칙 (-어요 ★)',
  },
  unit6: {
    tipTitle: '해볼쌤 팁 | -았어요',
    detectiveLines: [
      '과거 일! ‘다’ 앞 글자를 봐!',
      'ㅏ 있어?',
      'ㅗ 있어?',
      '그럼 쌍시옷(ㅆ) 챙겨 [았어요]!!',
    ],
    tipRule: '이미 지나간 일(과거)이고 어간 끝음절 모음이 ㅏ, ㅗ이면 ‘-았어요’를 써요.',
    tipExamples: '닦다 → 닦았어요 / 앉다 → 앉았어요 / 좋다 → 좋았어요',
    tipNote: '과거를 나타내는 쌍시옷(ㅆ) 받침에 주의하며 ‘-았어요’ 형태를 익혀 보세요.',
    conjugationType: '과거형 기본 (-았어요)',
  },
  unit7: {
    tipTitle: '해볼쌤 팁 | -었어요',
    detectiveLines: [
      '과거 일! ‘다’ 앞 글자를 봐!',
      'ㅏ 없어?',
      'ㅗ 없어?',
      '그럼 쌍시옷(ㅆ) 챙겨 [었어요]!!',
    ],
    tipRule: '이미 지나간 일(과거)이고 어간 끝음절 모음이 ㅏ, ㅗ가 아니면 ‘-었어요’를 써요.',
    tipExamples: '신다 → 신었어요 / 웃다 → 웃었어요 / 만들다 → 만들었어요',
    tipNote: '‘-어요’ 자리에 과거를 나타내는 쌍시옷(ㅆ) 받침을 넣어 ‘-었어요’로 말해 보세요.',
    conjugationType: '과거형 기본 (-었어요)',
  },
  unit8: {
    tipTitle: '해볼쌤 팁 | -했어요',
    detectiveLines: [
      '과거 일! 단어 끝을 봐!',
      '‘하다’가 있어?',
      '‘하였어요’가 짧아져서,',
      '‘하다’ 빼고 [했어요]를 가져와!!',
    ],
    tipRule: '‘하다’가 붙은 단어가 이미 끝난 일을 나타낼 때는 ‘-했어요’를 써요.',
    tipExamples: '시작하다 → 시작했어요 / 대답하다 → 대답했어요 / 양보하다 → 양보했어요',
    tipNote: '원래 ‘-하였어요’ 형태이지만 줄여서 ‘-했어요’로 써요. ‘하다’ 자리에 ‘했어요’를 쏙 바꿔 넣어 보세요.',
    conjugationType: '과거형 하다 (-했어요)',
  },
  unit9: {
    tipTitle: '해볼쌤 팁 | -았어요 ★',
    detectiveLines: [
      '과거 일! ‘다’ 앞 글자를 봐!',
      'ㅏ, ㅗ 있어? 그럼 [았어요]!',
      '근데 글자가 합쳐지거나,',
      '‘르’나 받침이 살짝 바뀌기도 해! ★',
    ],
    tipRule: '과거형 ‘-았어요’를 만날 때 같은 모음 ‘ㅏ’가 합쳐지거나, ‘르→ㄹ라’, 받침 ‘ㅅ’ 탈락이 일어나요.',
    tipExamples: '타다 → 탔어요 (모음 합체) / 모르다 → 몰랐어요 (르→ㄹ라 변신) / 낫다 → 나았어요 (‘ㅅ’ 탈락)',
    tipNote: '보라색 글자처럼 모음이 합쳐지거나 ‘르/ㅅ’이 바뀌는 특별한 과거 변화를 눈여겨보세요.',
    conjugationType: '과거 축약·르불규칙·ㅅ불규칙 (-았어요 ★)',
  },
  unit10: {
    tipTitle: '해볼쌤 팁 | -었어요 ★',
    detectiveLines: [
      '과거 일! ‘다’ 앞 글자를 봐!',
      'ㅏ, ㅗ 없어? 그럼 [었어요]!',
      '근데 모음이 합쳐지거나 ‘ㅡ’가 빠지고,',
      '모양이 살짝 바뀌기도 해! ★',
    ],
    tipRule: '과거형 ‘-었어요’를 만날 때 모음이 합쳐지거나 ‘ㅡ’ 탈락, 받침 ‘ㅎ·ㅂ’이 변하기도 해요.',
    tipExamples: '그리다 → 그렸어요 (축약) / 까맣다 → 까맸어요 (ㅎ 불규칙) / 춥다 → 추웠어요 (ㅂ 불규칙)',
    tipNote: '줄어들거나 모양이 바뀐 보라색 부분을 입으로 소리 내어 익혀 보세요.',
    conjugationType: '과거 축약·ㅎ불규칙·ㅡ탈락·ㅂ불규칙 (-었어요 ★)',
  },
  unit11: {
    tipTitle: '해볼쌤 팁 | 안 [용언], 못 [용언]',
    detectiveLines: [
      '하기 싫은 거니? [안]을 앞에 놔!',
      '어쩔 수 없는 거니? [못]을 앞에 놔!!',
    ],
    tipRule: '내 의지로 하지 않을 때는 ‘안 + [용언]’, 능력이 부족하거나 상황상 못 할 때는 ‘못 + [용언]’을 써요.',
    tipExamples: '안 남겨요 (의지) / 못 던져요 (능력) / 못 참아요 (상황)',
    tipNote: '단순 부정(안)과 상황/능력 부정(못)의 차이를 구별하여 표현해요.',
    conjugationType: '부정1 (안/못 + 용언)',
  },
  unit12: {
    tipTitle: '해볼쌤 팁 | [명사] 안 해요, [명사] 못 해요',
    detectiveLines: [
      '하기 싫은 거니? OO [안] [해요]',
      '어쩔 수 없는 거니? OO [못] [해요]',
    ],
    tipRule: '‘[명사] + 하다’ 동사는 ‘안/못’이 명사와 ‘해요’ 사이에 들어가요.',
    tipExamples: '게임하다 → 게임 안 해요(의지) / 줄넘기하다 → 줄넘기 못 해요(능력) / 운전하다 → 운전 못 해요(상황)',
    tipNote: '의지 부정은 ‘명사 안 해요’, 능력·상황 부정은 ‘명사 못 해요’로 구분해 말해요.',
    conjugationType: '부정2 ([명사] 안/못 해요)',
  },
  unit13: {
    tipTitle: '해볼쌤 팁 | -고 싶어요',
    detectiveLines: [
      '‘다’의 앞 글자? 안 봐도 돼!',
      '‘하고 싶은 마음’이야?',
      '‘다’ 빼고 모양 그대로,',
      '그럼 [-고 싶어요]를 가져와!!',
    ],
    tipRule: '동사 어간 뒤에 받침 유무에 상관없이 ‘-고 싶어요’를 붙여 바라는 마음을 말해요.',
    tipExamples: '배우다 → 배우고 싶어요 / 만나다 → 만나고 싶어요 / 잘하다 → 잘하고 싶어요',
    tipNote: '내가 하고 싶은 희망이나 소망을 나타낼 때 자주 쓰는 표현이에요.',
    conjugationType: '희망 (-고 싶어요)',
  },
  unit14: {
    tipTitle: '해볼쌤 팁 | -고 있어요',
    detectiveLines: [
      '‘다’의 앞 글자? 안 봐도 돼!',
      '‘지금 하고 있는 중’이야?',
      '‘다’ 빼고 모양 그대로,',
      '그럼 [-고 있어요]를 가져와!!',
    ],
    tipRule: '동사 어간 뒤에 받침 유무에 상관없이 ‘-고 있어요’를 붙여 지금 하는 중임을 말해요.',
    tipExamples: '일하다 → 일하고 있어요 / 짓다 → 짓고 있어요 / 물어보다 → 물어보고 있어요',
    tipNote: '어떤 동작이 바로 지금 진행되고 있을 때 사용해요.',
    conjugationType: '진행 (-고 있어요)',
  },
  unit15: {
    tipTitle: '해볼쌤 팁 | -세요, -으세요',
    detectiveLines: [
      '‘다’의 앞 글자를 봐요.',
      '받침 없거나 ‘ㄹ’이면? [세요]!',
      '‘ㄹ’ 제외 받침이 있으면?',
      '[으세요]를 가져와!!',
    ],
    tipRule: '받침이 없거나 ‘ㄹ’ 받침이면 ‘-세요’, ‘ㄹ’ 제외 받침이 있으면 ‘-으세요’를 써요.',
    tipExamples: '서다 → 서세요 / 걷다 → 걸으세요 (ㄷ 불규칙) / 풀다 → 푸세요 (ㄹ 탈락)',
    tipNote: '상대방에게 어떤 행동을 정중하게 요청하거나 안내할 때 써요.',
    conjugationType: '요청·높임 (-(으)세요 · ㄷ불규칙/ㄹ탈락)',
  },
  unit16: {
    tipTitle: '해볼쌤 팁 | -지 마세요',
    detectiveLines: [
      '‘다’의 앞 글자? 안 봐도 돼!',
      '‘하지 말라고 약속’할 땐?',
      '‘다’ 빼고 모양 그대로,',
      '그럼 [-지 마세요]를 가져와!!',
    ],
    tipRule: '동사 어간 뒤에 받침 유무에 상관없이 그대로 ‘-지 마세요’를 붙여요.',
    tipExamples: '뛰다 → 뛰지 마세요 / 떠들다 → 떠들지 마세요 / 버리다 → 버리지 마세요',
    tipNote: '공공장소나 학교에서 위험하거나 하면 안 되는 행동을 정중하게 금지할 때 써요.',
    conjugationType: '금지 (-지 마세요)',
  },
  unit17: {
    tipTitle: '해볼쌤 팁 | -ㄹ 거예요, -을 거예요',
    detectiveLines: [
      '‘다’의 앞 글자를 봐요.',
      '받침 없거나 ‘ㄹ’이면? [ㄹ 거예요]!',
      '‘ㄹ’ 제외 받침이 있으면?',
      '[을 거예요]를 가져와!!',
    ],
    tipRule: '받침이 없거나 ‘ㄹ’ 받침이면 ‘-ㄹ 거예요’, 그 외 자음 받침이면 ‘-을 거예요’를 써요.',
    tipExamples: '가져오다 → 가져올 거예요 / 살다 → 살 거예요 (‘ㄹ’ 유지) / 놓다 → 놓을 거예요',
    tipNote: '앞으로 할 계획이나 미래에 일어날 일을 말할 때 사용해요.',
    conjugationType: '미래·계획 (-(으)ㄹ 거예요 · ㄹ유지)',
  },
  unit18: {
    tipTitle: '해볼쌤 팁 | -아 주세요, -어 주세요, -해 주세요',
    detectiveLines: [
      '‘다’의 앞 글자를 봐요.',
      'ㅏ, ㅗ 있어요? [아 주세요]!',
      'ㅏ, ㅗ 없어요? [어 주세요]!',
      '‘하다’는 [해 주세요]를 가져와!!',
    ],
    tipRule: '어간 끝 모음이 ‘ㅏ, ㅗ’면 ‘-아 주세요’, 아니면 ‘-어 주세요’, ‘하다’는 ‘-해 주세요’를 써요.',
    tipExamples: '기다리다 → 기다려 주세요 / 깎다 → 깎아 주세요 / 끄다 → 꺼 주세요 (ㅡ 탈락)',
    tipNote: '다른 사람에게 어떤 행동을 해 달라고 공손하게 부탁하거나 도움을 요청할 때 써요.',
    conjugationType: '부탁 (-아/어/해 주세요 · ㅡ탈락/축약)',
  },
  unit19: {
    tipTitle: '해볼쌤 팁 | -아도 돼요?, -어도 돼요?, -해도 돼요?',
    detectiveLines: [
      '‘다’의 앞 글자를 봐요.',
      'ㅏ, ㅗ 있어요? [아도 돼요?]!',
      'ㅏ, ㅗ 없어요? [어도 돼요?]!',
      '‘하다’는 [해도 돼요?]를 가져와!!',
    ],
    tipRule: '어간 끝 모음이 ‘ㅏ, ㅗ’면 ‘-아도 돼요?’, 아니면 ‘-어도 돼요?’, ‘하다’는 ‘-해도 돼요?’로 허락을 구해요.',
    tipExamples: '들어가다 → 들어가도 돼요? / 빌리다 → 빌려도 돼요? (모음 축약) / 움직이다 → 움직여도 돼요?',
    tipNote: '어떤 행동을 해도 괜찮은지 상대방에게 공손하게 허락을 물어볼 때 사용해요.',
    conjugationType: '허락 (-아/어/해도 돼요? · 모음축약)',
  },
  unit20: {
    tipTitle: '해볼쌤 팁 | -아야 돼요, -어야 돼요, -해야 돼요',
    detectiveLines: [
      '‘다’의 앞 글자를 봐요.',
      'ㅏ, ㅗ 있어요? [아야 돼요]!',
      'ㅏ, ㅗ 없어요? [어야 돼요]!',
      '‘하다’는 [해야 돼요]를 가져와!!',
    ],
    tipRule: '어간 끝 모음이 ‘ㅏ, ㅗ’면 ‘-아야 돼요’, 아니면 ‘-어야 돼요’, ‘하다’는 ‘-해야 돼요’를 써요.',
    tipExamples: '조심하다 → 조심해야 돼요 / 지키다 → 지켜야 돼요 (모음 축약) / 바르다 → 발라야 돼요 (르 불규칙)',
    tipNote: '학교와 생활에서 꼭 해야 하는 일이나 지켜야 할 규칙·의무를 말할 때 써요.',
    conjugationType: '의무 (-아야/어야/해야 돼요 · 르불규칙/모음축약)',
  },
  unit21: {
    tipTitle: '해볼쌤 팁 | -ㄹ(을) 수 있어요, -ㄹ(을) 수 없어요',
    detectiveLines: [
      '‘다’의 앞 글자를 봐요.',
      '받침 없거나 ‘ㄹ’? [ㄹ 수 있어요]!',
      '다른 받침 있으면? [을 수 있어요]!',
      '못 할 땐 [없어요]로 바꿔요!',
    ],
    tipRule: '받침이 없거나 ‘ㄹ’ 받침이면 ‘-ㄹ 수 있어요’, ‘ㄹ’ 제외 자음 받침이면 ‘-을 수 있어요’를 써요.',
    tipExamples: '건너다 → 건널 수 있어요 / 날다 → 날 수 있어요 (‘ㄹ’ 유지) / 밟다 → 밟을 수 없어요',
    tipNote: '어떤 일을 할 수 있는 능력·가능성은 ‘있어요’, 할 수 없을 때는 ‘없어요’를 써요.',
    conjugationType: '능력·가능 (-(으)ㄹ 수 있어요/없어요)',
  },
  unit22: {
    tipTitle: '해볼쌤 팁 | -ㄹ까요?, -을까요?',
    detectiveLines: [
      '상대의 생각이나 제안을 물을 때!',
      '받침 없거나 ‘ㄹ’이면? [ㄹ까요?]!',
      '‘ㄹ’ 제외 받침이 있으면?',
      '[을까요?]를 가져와!!',
    ],
    tipRule: '어간 끝에 받침이 없거나 ‘ㄹ’ 받침이면 ‘-ㄹ까요?’, ‘ㄹ’ 제외 자음 받침이면 ‘-을까요?’를 써요.',
    tipExamples: '나누다 → 나눌까요? / 더하다 → 더할까요? / 빼다 → 뺄까요?',
    tipNote: '상대방에게 함께 하자고 제안하거나 의견을 정중하게 물어볼 때 사용해요.',
    conjugationType: '제안·의문 (-(으)ㄹ까요?)',
  },
  unit23: {
    tipTitle: '해볼쌤 팁 | -고',
    detectiveLines: [
      '‘다’ 앞의 받침? 안 봐도 돼!',
      '두 행동을 순서대로 잇거나',
      '여러 가지를 함께 나열할 땐?',
      '어간 뒤에 [-고]를 붙여!!',
    ],
    tipRule: '어간 끝의 받침이나 모음에 상관없이 어간 뒤에 그대로 ‘-고’를 붙여 연결해요.',
    tipExamples: '세수하다 → 세수하고 / 펴다 → 펴고 / 챙기다 → 챙기고',
    tipNote: '앞 행동을 한 뒤 다음 행동을 이어서 하거나, 여러 가지를 나열할 때 써요.',
    conjugationType: '연결·나열 (-고)',
  },
  unit24: {
    tipTitle: '해볼쌤 팁 | -지만',
    detectiveLines: [
      '‘다’ 앞의 받침? 안 봐도 돼!',
      '앞뒤 내용이 서로 반대될 땐?',
      'ㅂ·ㄹ 불규칙도 변신 없이!',
      '어간 뒤에 [-지만]을 붙여!!',
    ],
    tipRule: '어간의 받침이나 모음 종류에 관계없이 어간 모양 그대로 ‘-지만’을 붙여요.',
    tipExamples: '어렵다 → 어렵지만 / 무겁다 → 무겁지만 / 멀다 → 멀지만 (변화 없음)',
    tipNote: '앞의 내용과 반대되거나 다른 사실을 서로 대조하여 연결할 때 사용해요.',
    conjugationType: '연결·대조 (-지만)',
  },
  unit25: {
    tipTitle: '해볼쌤 팁 | -아서, -어서, -해서',
    detectiveLines: [
      '‘다’의 앞 글자를 봐요.',
      'ㅏ, ㅗ 있어요? 그럼 [아서]!',
      'ㅏ, ㅗ 없어요? 그럼 [어서]!',
      '‘하다’는 [해서]를 가져와!!',
    ],
    tipRule: '어간 끝 모음이 ‘ㅏ, ㅗ’면 ‘-아서’, 아니면 ‘-어서’, ‘하다’는 ‘-해서’로 이유를 말해요.',
    tipExamples: '배고프다 → 배고파서 (ㅡ 탈락) / 덥다 → 더워서 (ㅂ 불규칙) / 빠르다 → 빨라서 (르 불규칙)',
    tipNote: '앞의 내용이 뒤의 일에 대한 이유나 원인일 때 자연스럽게 이어 주는 표현이에요.',
    conjugationType: '이유 (-아서/어서/해서 · ㅡ탈락/ㅂ불규칙/르불규칙)',
  },
  unit26: {
    tipTitle: '해볼쌤 팁 | -면, -으면',
    detectiveLines: [
      '어떤 조건이나 가정을 말할 때!',
      '받침 없거나 ‘ㄹ’이면? [면]!',
      '‘ㄹ’ 제외 받침이 있으면?',
      '[으면]을 가져와!!',
    ],
    tipRule: '어간 끝에 받침이 없거나 ‘ㄹ’ 받침이면 ‘-면’, 그 외 자음 받침이면 ‘-으면’을 써요. (‘그렇다’는 ㅎ·으 탈락!)',
    tipExamples: '그렇다 → 그러면 (ㅎ 불규칙) / 힘들다 → 힘들면 (‘ㄹ’ 유지) / 작다 → 작으면',
    tipNote: '어떤 조건이나 상황이 되었을 때 뒤의 일이나 행동이 이어짐을 말할 때 써요.',
    conjugationType: '조건 (-(으)면 · ㅎ불규칙)',
  },
  unit27: {
    tipTitle: '해볼쌤 팁 | -ㄹ 때, -을 때',
    detectiveLines: [
      '어떤 일이 일어나는 순간이나 시간!',
      '받침 없거나 ‘ㄹ’이면? [ㄹ 때]!',
      '‘ㄹ’ 제외 받침이 있으면?',
      '[을 때]를 가져와!!',
    ],
    tipRule: '어간 끝에 받침이 없거나 ‘ㄹ’ 받침이면 ‘-ㄹ 때’, ‘ㄹ’ 제외 자음 받침이면 ‘-을 때’를 써요.',
    tipExamples: '발표하다 → 발표할 때 / 졸리다 → 졸릴 때 / 벗다 → 벗을 때',
    tipNote: '어떤 행동이나 상태가 일어나는 특정 시간이나 순간을 나타낼 때 사용해요.',
    conjugationType: '시간 (-(으)ㄹ 때)',
  },
  unit28: {
    tipTitle: '해볼쌤 팁 | -러(으러) 가요, -러(으러) 와요',
    detectiveLines: [
      '어떤 일을 하러 가거나 올 때!',
      '받침 없거나 ‘ㄹ’? [러 가요/와요]!',
      '‘ㄹ’ 제외 받침이 있으면?',
      '[으러 가요/와요]를 가져와!!',
    ],
    tipRule: '받침이 없거나 ‘ㄹ’ 받침이면 ‘-러 가요/와요’, ‘ㄹ’ 제외 자음 받침이면 ‘-으러 가요/와요’를 써요.',
    tipExamples: '구경하다 → 구경하러 가요 / 반납하다 → 반납하러 와요 / 심다 → 심으러 가요',
    tipNote: '어떤 행동을 하려는 목적을 가지고 다른 장소로 가거나 올 때 사용해요.',
    conjugationType: '목적 (-(으)러 가요/와요)',
  },
  unit29: {
    tipTitle: '해볼쌤 팁 | -기 전에, -ㄴ 후에, -은 후에',
    detectiveLines: [
      '행동의 순서를 말해요.',
      '하기 앞서서는 [-기 전에]!',
      '마치고 나선 받침 확인!',
      '없으면 [-ㄴ 후에], 있으면 [-은 후에]!',
    ],
    tipRule: '먼저 하는 일 앞에는 ‘-기 전에’, 앞의 일을 마친 뒤에는 받침 없으면 ‘-ㄴ 후에’, 받침 있으면 ‘-은 후에’를 써요.',
    tipExamples: '양치하다 → 양치하기 전에 / 모으다 → 모은 후에 / 섞다 → 섞은 후에',
    tipNote: '두 가지 이상의 행동이 일어나는 앞뒤 시간 순서를 분명하게 연결해 말할 때 써요.',
    conjugationType: '순서 (-기 전에 / -(으)ㄴ 후에)',
  },
  unit30: {
    tipTitle: '해볼쌤 팁 | -아 봤어요, -어 봤어요, -해 봤어요',
    detectiveLines: [
      '‘다’의 앞 글자를 봐요.',
      'ㅏ, ㅗ 있어요? 그럼 [아 봤어요]!',
      'ㅏ, ㅗ 없어요? 그럼 [어 봤어요]!',
      '‘하다’는 [해 봤어요]를 가져와!!',
    ],
    tipRule: '어간 끝 모음이 ‘ㅏ, ㅗ’면 ‘-아 봤어요’, 아니면 ‘-어 봤어요’, ‘하다’는 ‘-해 봤어요’를 써요.',
    tipExamples: '안다 → 안아 봤어요 / 춤추다 → 춤춰 봤어요 (축약) / 묻다 → 물어봤어요 (ㄷ 불규칙)',
    tipNote: '과거에 어떤 일을 직접 시도하거나 경험해 본 적이 있음을 말할 때 써요.',
    conjugationType: '경험 (-아/어/해 봤어요 · 모음축약/ㄷ불규칙)',
  },
};

export const PARTICLE_UNIT_TEXT_GUIDES: Partial<Record<ParticleUnitId, UnitGrammarTextGuide>> = {
  unit1: {
    tipTitle: '해볼쌤 팁 | -은, -는',
    detectiveLines: [
      '끝 글자를 봐!',
      '받침 있어? 그럼 [은]을 가져와!',
      '받침 없어? 그럼 [는]을 가져와!',
      '※ 주제·대조·강조의 뜻이 있어.',
    ],
    tipRule: '명사의 끝음절에 받침이 있으면 ‘은’을, 없으면 ‘는’을 붙여요.',
    tipExamples: '받침X → 나는, 받침O → 동생은',
    tipNote: '‘은1’은 주제를 나타내거나 대조 및 강조의 뜻을 나타내는 보조사이다. 주격조사 ‘이’와 보조사 ‘은’을 헷갈리는 것은 ‘은’이 주어 자리에 자주 나타나기 때문이다. 그러나 ‘은’은 목적어, 부사어 자리에도 온다. -국립국어원 / 4단원에서 주격조사 ‘이’를 더 자세히 배워요.',
  },
  unit2: {
    tipTitle: '해볼쌤 팁 | -이에요, -예요',
    detectiveLines: [
      '명사 마지막 글자의 끝을 봐!',
      '받침이 있어? 그럼 [이에요]를 가져와!',
      '받침이 없어? 그럼 [예요]를 가져와!',
      '※ (친구예요 ○ / 친구에요 ×)',
    ],
    tipRule: '사람이나 사물이 무엇인지 나타낼 때, 명사 끝 받침이 있으면 ‘-이에요’, 없으면 ‘-예요’를 붙여요.',
    tipExamples: '받침 O → 학생이에요, 연필이에요 / 받침 X → 의자예요, 지우개예요',
    tipNote: '받침이 없는 말 뒤에 ‘예요’ 대신 ‘에요’로 쓰기 쉬우니, 손으로 짚어 확인하며 정확히 소리 내어 보세요. 기본형은 ‘-이다’입니다.',
  },
  unit4: {
    tipTitle: '해볼쌤 팁 | -이, -가',
    detectiveLines: [
      '명사 마지막 글자의 끝을 봐!',
      '받침이 있어? 그럼 [이]를 가져와!',
      '받침이 없어? 그럼 [가]를 가져와!',
      '※ 누가·무엇이 그러는지 알려 줘!',
    ],
    tipRule: '어떤 일의 주인공이나 대상이 있음을 말할 때, 받침이 있으면 ‘-이’, 받침이 없으면 ‘-가’를 붙여요.',
    tipExamples: '받침 O → 물이, 책이, 약이 / 받침 X → 배가, 비누가',
    tipNote: '‘물이 있어요’, ‘배가 아파요’처럼 학교와 생활 속에서 필요한 물건이나 상태를 말할 때 자주 써요.',
  },
  unit5: {
    tipTitle: '해볼쌤 팁 | 이/가 ★ 변화형 (내가·네가·제가·누가·이게)',
    detectiveLines: [
      '‘나·너·저·누구·이것’의 끝을 봐!',
      '뒤에 [이/가]가 오면 모양이 변신해!',
      '[내가·네가·제가·누가·이게]를 가져와!',
      '※ ★ ‘나가·저가·누구가’는 안 돼요!',
    ],
    tipRule: '‘나, 너, 저, 누구’ 뒤에 주격 조사 ‘-가’가 오면 앞말이 바뀌고, ‘이것+이’는 줄어서 ‘이게’가 돼요.',
    tipExamples: '나+가 → 내가 / 너+가 → 네가 / 저+가 → 제가 / 누구+가 → 누가 / 이것+이 → 이게',
    tipNote: '‘나가, 저가, 누구가’가 되지 않도록 변화형 5가지를 소리 내어 입에 붙여 익혀 보세요.',
  },
  unit6: {
    tipTitle: '해볼쌤 팁 | -을, -를',
    detectiveLines: [
      '명사 마지막 글자의 끝을 봐!',
      '받침이 있어? 그럼 [을]을 가져와!',
      '받침이 없어? 그럼 [를]를 가져와!',
      '※ 말할 땐 ‘무엇을 → 뭐를·뭘’로 줄여 써요!',
    ],
    tipRule: '어떤 행동의 대상(목적어)을 나타낼 때, 받침이 있으면 ‘-을’, 없으면 ‘-를’을 붙여요.',
    tipExamples: '받침 O → 밥을, 손을, 무엇을 / 받침 X → 우유를, 사과를',
    tipNote: '‘무엇을’은 말할 때 줄여서 ‘뭐를’이나 ‘뭘’로도 자주 써요. (예: 무엇을 먹어요? → 뭐를 먹어요?)',
  },
  unit8: {
    tipTitle: '해볼쌤 팁 | -에',
    detectiveLines: [
      '어디에 있거나 가는지, 언제인지 봐!',
      '받침이 있어도 [에]를 가져와!',
      '받침이 없어도 [에]를 가져와!',
      '※ 있는 곳·가는 곳·시간에 모두 [에]를 써요!',
    ],
    tipRule: '사람이나 물건이 있는 곳, 가는 곳, 또는 시간을 말할 때 받침과 상관없이 명사 뒤에 ‘-에’를 붙여요.',
    tipExamples: '장소·질문 → 학교에, 집에, 어디에 / 시간 → 아침에, 점심에',
    tipNote: '‘학교에 가요’, ‘집에 있어요’, ‘어디에 가요?’처럼 어디로 가는지, 언제인지 함께 말해 보세요.',
  },
  unit9: {
    tipTitle: '해볼쌤 팁 | -에서',
    detectiveLines: [
      '어디에서 행동하는지, 어디에서 왔는지 봐!',
      '받침이 있어도 [에서]를 가져와!',
      '받침이 없어도 [에서]를 가져와!',
      '※ 행동 장소와 ‘어느 나라에서 왔어요?’(출신)에 써요!',
    ],
    tipRule: '어떤 행동이 일어나는 장소나 출발점·출신을 나타낼 때 받침과 상관없이 명사 뒤에 ‘-에서’를 붙여요.',
    tipExamples: '교실에서 공부해요 / 운동장에서 놀아요 / 어느 나라에서 왔어요?',
    tipNote: '‘어디에 있어요(위치)’는 ‘-에’, ‘어디에서 공부해요·어느 나라에서 왔어요(행동·출신)’는 ‘-에서’를 써요.',
  },
  unit10: {
    tipTitle: '해볼쌤 팁 | -도',
    detectiveLines: [
      '앞에 말한 것에 “역시·같이”를 더해 봐!',
      '받침이 있어도 [도]를 가져와!',
      '받침이 없어도 [도]를 가져와!',
      '※ ‘은/는, 이/가, 을/를’ 자리에 [도]가 쏙 들어가요!',
    ],
    tipRule: '이미 이야기한 것에 다른 대상을 똑같이 더하거나 보탤 때 받침과 상관없이 ‘-도’를 붙여요.',
    tipExamples: '나도 갈래요 / 물도 주세요 / 우산도 있어요 (나는도 × → 나도 ○)',
    tipNote: '‘은/는, 이/가, 을/를’ 뒤에 붙이지 않고 그 자리에 바로 ‘-도’를 바꿔 넣어요.',
  },
  unit12: {
    tipTitle: '해볼쌤 팁 | -와, -과, -하고, -이랑, -랑',
    detectiveLines: [
      '명사 마지막 글자의 끝을 봐!',
      '받침 있어? [과 / 이랑]을 가져와!',
      '받침 없어? [와 / 랑], 상관없으면 [하고]!',
      '※ ‘와/과’는 글, ‘하고·랑’은 말할 때 자주 써요!',
    ],
    tipRule: '둘 이상의 명사를 나열하거나 함께 행동하는 대상을 나타낼 때, 받침이 있으면 ‘-과/-이랑’, 없으면 ‘-와/-랑’, 상관없이 ‘-하고’를 써요.',
    tipExamples: '받침 O → 책과, 연필이랑 / 받침 X → 우유와, 친구랑 / 무관 → 엄마하고',
    tipNote: '‘-와/-과’는 글과 설명에, ‘-하고/-이랑/-랑’은 일상 대화에서 아주 자주 써요.',
  },
  unit13: {
    tipTitle: '해볼쌤 팁 | -으로, -로',
    detectiveLines: [
      '명사 마지막 글자의 끝을 봐!',
      '받침이 있어? 그럼 [으로]를 가져와!',
      '받침이 없거나 ‘ㄹ’ 받침? 그럼 [로]를 가져와!',
      '※ ‘연필로·교실로’처럼 ‘ㄹ’ 받침 뒤엔 꼭 [로]예요!',
    ],
    tipRule: '가는 방향이나 수단·도구를 나타낼 때, 받침이 있으면 ‘-으로’, 받침이 없거나 ‘ㄹ’ 받침이면 ‘-로’를 써요.',
    tipExamples: '받침 X·ㄹ 받침 → 학교로, 버스로, 연필로 / 받침 O → 운동장으로, 숟가락으로',
    tipNote: '‘연필로 써요’, ‘교실로 가요’처럼 끝 받침이 ‘ㄹ’일 때는 ‘으로’가 아니라 ‘-로’를 붙이는 점에 주의하세요.',
  },
  unit14: {
    tipTitle: '해볼쌤 팁 | -에게, -한테',
    detectiveLines: [
      '명사 마지막 글자의 끝을 봐!',
      '받침이 있어도 [에게 / 한테]를 가져와!',
      '받침이 없어도 [에게 / 한테]를 가져와!',
      '※ ‘에게’는 글·말, ‘한테’는 말할 때! 어른껜 ‘께’도 써요!',
    ],
    tipRule: '말하거나 물건을 주는 행동의 대상(사람·동물)을 나타낼 때 받침과 상관없이 ‘-에게’나 ‘-한테’를 써요.',
    tipExamples: '글·말 → 짝꿍에게, 친구에게 / 말할 때 → 동생한테, 우리한테, 누구한테',
    tipNote: '선생님이나 부모님처럼 높여야 하는 어른께 말씀드릴 때는 ‘선생님께 드려요’처럼 ‘-께’를 써요.',
  },
  unit16: {
    tipTitle: '해볼쌤 팁 | -부터, -까지',
    detectiveLines: [
      '시간이나 거리·순서의 시작과 끝을 봐!',
      '시작하는 점엔 [부터]를 가져와!',
      '끝나는 점·도착점엔 [까지]를 가져와!',
      '※ ‘아침부터 저녁까지’, ‘집에서 학교까지’처럼 짝으로 잘 써요!',
    ],
    tipRule: '일·시간·순서의 시작 지점에는 ‘-부터’, 시간·거리·범위의 끝이나 도착점에는 ‘-까지’를 받침과 상관없이 붙여요.',
    tipExamples: '시작 → 아침부터, 월요일부터 / 끝·도착 → 저녁까지, 학교까지, 어디까지',
    tipNote: '‘아침부터 저녁까지’처럼 시작과 끝을 짝지어 말하고, 장소 출발점은 ‘집에서 학교까지’처럼 ‘-에서’와 함께 써요.',
  },
  unit17: {
    tipTitle: '해볼쌤 팁 | -이나, -나',
    detectiveLines: [
      '명사 마지막 글자의 끝을 봐!',
      '받침이 있어? 그럼 [이나]를 가져와!',
      '받침이 없어? 그럼 [나]를 가져와!',
      '※ ‘이것 또는 저것’ 여러 가지 중 하나를 고를 때 써요!',
    ],
    tipRule: '여러 대상 가운데 하나를 선택해 말할 때 명사 끝 받침이 있으면 ‘-이나’, 없으면 ‘-나’를 붙여요.',
    tipExamples: '받침 O → 빵이나, 물이나, 책이나 / 받침 X → 사과나, 버스나',
    tipNote: '‘빵이나 우유를 먹어요’처럼 하나를 예로 들어 고르거나 ‘이것 아니면 저것’을 편하게 제안할 때 자주 써요.',
  },
  unit18: {
    tipTitle: '해볼쌤 팁 | -마다 (접미사 -씩)',
    detectiveLines: [
      '빠짐없이 반복되는 시간·곳·사람을 봐!',
      '받침이 있어도 [마다], 없어도 [마다]!',
      '똑같은 수량을 나눌 땐 숫자·단위 뒤 [씩]!',
      '※ ‘매일 = 날마다’, ‘하루에 한 번씩 = 하루씩’!',
    ],
    tipRule: '일정한 시간·대상이 빠짐없이 반복될 때는 ‘-마다’를 쓰고, 일정한 수량·단위를 고르게 나눌 때는 접미사 ‘-씩’을 붙여요.',
    tipExamples: '반복 → 날마다, 아침마다, 주말마다 / 접미사 -씩 → 하루에 한 번씩, 두 개씩, 조금씩',
    tipNote: '‘주말마다 도서관에 가요’처럼 반복 습관엔 ‘-마다’를, ‘아침마다 사과를 한 개씩 먹어요’처럼 나누는 양엔 ‘-씩’을 함께 써 보세요.',
  },
  unit20: {
    tipTitle: '해볼쌤 팁 | -만',
    detectiveLines: [
      '다른 것은 빼고 딱 하나만 고를 때를 봐!',
      '받침이 있어도 [만]을 가져와!',
      '받침이 없어도 [만]을 가져와!',
      '※ ‘은/는, 이/가, 을/를’ 자리에 [만]을 바로 써요!',
    ],
    tipRule: '다른 것은 제외하고 그것 하나뿐임을 나타낼 때 받침과 상관없이 ‘-만’을 붙여요.',
    tipExamples: '물만 마셔요 / 나만 알아요 / 사탕을 하나만 먹어요',
    tipNote: '‘이/가, 을/를’ 자리에 ‘-만’을 바로 넣어 말하면 뜻이 또렷해져요.',
  },
  unit21: {
    tipTitle: '해볼쌤 팁 | -밖에 ★ (밖에 + 없어요/안~)',
    detectiveLines: [
      '뒤에 ‘없어요·안~’ 부정 말이 오는지 봐!',
      '받침 있든 없든 [밖에]를 가져와!',
      '뒤 문장 끝엔 꼭 [없어요 / 안 ~]가 와!',
      '※ ★ (하나밖에 있어요 × / 하나밖에 없어요 ○)',
    ],
    tipRule: '‘그것뿐이고 더 이상 없다’는 뜻으로, ‘-밖에’ 뒤에는 반드시 부정 표현(없어요·안 ~)이 와요.',
    tipExamples: '하나밖에 없어요 ○ / 빵밖에 안 먹어요 ○ / (물밖에 있어요 × → 물만 있어요 ○)',
    tipNote: '긍정 문장에는 ‘-만’, 부정 문장(‘없어요/안 먹어요’)에는 ‘-밖에’가 짝꿍이라는 점을 기억하세요.',
  },
  unit22: {
    tipTitle: '해볼쌤 팁 | -보다',
    detectiveLines: [
      '두 대상을 나란히 비교하는 기준을 봐!',
      '받침이 있어도 [보다]를 가져와!',
      '받침이 없어도 [보다]를 가져와!',
      '※ 비교하는 기준 명사 바로 뒤에 [보다]를 붙여요!',
    ],
    tipRule: '두 대상의 크기·속도·날씨 등을 견줄 때 비교의 기준이 되는 명사 뒤에 ‘-보다’를 붙여요.',
    tipExamples: '동생이 형보다 빨라요 / 오늘이 어제보다 따뜻해요 / 누구보다 빨라요',
    tipNote: '‘수박이 사과보다 커요’처럼 먼저 말한 주어와 ‘명사+보다’가 서로 비교돼요.',
  },
  unit24: {
    tipTitle: '해볼쌤 팁 | -처럼, -같이',
    detectiveLines: [
      '무엇과 모양·모습이 비슷한지 봐!',
      '받침이 있어도 [처럼 / 같이]를 가져와!',
      '받침이 없어도 [처럼 / 같이]를 가져와!',
      '※ ‘토끼같이, 구름같이, 별처럼’ 비유 조사일 땐 항상 붙여 써요!',
    ],
    tipRule: '어떤 대상과 모양·성질·행동이 닮았음을 비유할 때 받침과 상관없이 ‘-처럼, -같이’를 붙여요.',
    tipExamples: '토끼같이 껑충 뛰어요 / 구름같이 하얘요 / 별처럼 반짝여요',
    tipNote: '비유의 뜻을 나타내는 조사 ‘-처럼, -같이’는 앞 명사에 꼭 붙여 쓰며, ‘같이 가다(함께)’일 때는 띄어 써요.',
  },
  unit25: {
    tipTitle: '해볼쌤 팁 | -의 ★ (내·네·제)',
    detectiveLines: [
      '누구의 물건인지 앞말의 끝을 봐!',
      '일반 명사엔 [의] (발음은 [에]로도 해요)!',
      '‘나·너·저+의’는 [내·네·제]로 변신해!',
      '※ ★ ‘나의 책 → 내 책’, ‘저의 우산 → 제 우산’!',
    ],
    tipRule: '앞 명사가 뒤 명사의 주인·소속임을 나타낼 때 ‘-의’를 쓰고, ‘나·너·저’는 ‘내·네·제’로 줄어들어요.',
    tipExamples: '친구의 가방 / 나+의 → 내 / 너+의 → 네 / 저+의 → 제',
    tipNote: '조사 ‘-의’는 말할 때 [에]로 발음되기도 해요. (예: 친구의 [친구의 / 친구에])',
  },
  unit26: {
    tipTitle: '해볼쌤 팁 | -끼리',
    detectiveLines: [
      '같은 무리·여럿이 함께 모였는지 봐!',
      '받침이 있어도 [끼리]를 가져와!',
      '받침이 없어도 [끼리]를 가져와!',
      '※ ‘친구·우리·학생’ 같은 사람·무리 뒤에 붙여요!',
    ],
    tipRule: '같은 부류나 비슷한 처지의 여럿이 함께 어울려 행동함을 나타낼 때 받침과 상관없이 ‘-끼리’를 붙여요.',
    tipExamples: '친구끼리 놀아요 / 우리끼리 이야기해요 / 학생끼리 공부해요',
    tipNote: '혼자가 아니라 둘 이상 여럿이 모인 명사(‘친구, 우리, 남자, 여자, 학생’) 뒤에 붙어 ‘그들끼리만 함께’를 뜻해요.',
  },
  unit28: {
    tipTitle: '해볼쌤 팁 | -께서, -께',
    detectiveLines: [
      '높여야 할 어른이 주어인지 대상인지 봐!',
      '어른이 행동할 땐(주어) [께서]를 가져와!',
      '어른에게 드릴 땐(대상) [께]를 가져와!',
      '※ 어른 뒤엔 ‘이/가 → 께서’, ‘에게/한테 → 께’예요!',
    ],
    tipRule: '어른을 높여 말할 때 주어 ‘이/가’ 대신 ‘-께서’, 행동 대상 ‘에게/한테’ 대신 ‘-께’를 써요.',
    tipExamples: '어른 주어 → 할머니께서 웃으세요 / 어른 대상 → 부모님께 인사해요',
    tipNote: '‘께서’가 올 때는 뒤의 동사도 ‘웃으세요, 말씀하세요’처럼 높임말로 짝을 맞춰요.',
  },
  unit29: {
    tipTitle: '해볼쌤 팁 | -아, -야',
    detectiveLines: [
      '부르는 이름 마지막 글자의 끝을 봐!',
      '받침이 있어? 그럼 [아]를 가져와!',
      '받침이 없어? 그럼 [야]를 가져와!',
      '※ 친구나 동생을 부를 때만 써요! (어른껜 쓰지 않아요)',
    ],
    tipRule: '친구나 동생, 동물 등을 다정하게 부를 때 이름 끝 받침이 있으면 ‘-아’, 없으면 ‘-야’를 붙여요.',
    tipExamples: '받침 O → 수진아, 동생아 / 받침 X → 민수야, 강아지야, 친구야',
    tipNote: '이름 뒤에는 쉼표(,)를 찍고, 선생님이나 어른을 부를 때는 ‘선생님!’처럼 ‘아/야’를 붙이지 않아요.',
  },
};

export interface CurriculumCsvRow {
  area: string;
  unit: string;
  subType: string;
  indexNo: string;
  korean: string;
  formOrRomaja: string;
  ruleOrHint: string;
  exampleOrSituation: string;
  tipOrDetective: string;
  en: string;
  vi: string;
  bn: string;
  zh: string;
  ru: string;
  ja: string;
  mn: string;
}

const escapeCsvCell = (value: string | undefined | null): string => {
  const safe = (value ?? '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  if (/[",\n]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
};

const getVerbItemsSummary = (unit: VerbUnitType) => {
  return VERB_CARDS_BY_UNIT[unit] || [];
};

const getParticleRowSummary = (row: (typeof PARTICLE_ROWS_BY_UNIT)[ParticleUnitId][number]) => {
  return row.blocks
    .map((b) => b.segments.map((s) => s.text).join(''))
    .join(' + ');
};

export function extractAllCurriculumRows(scope: BackupScope = 'all'): CurriculumCsvRow[] {
  const rows: CurriculumCsvRow[] = [];

  // 1. 한글 영역
  if (scope === 'all' || scope === 'hangeul') {
    // 1-1. 자음 14자 / 모음 22자 표
    CONSONANTS_DATA.forEach((pair, idx) => {
      [pair.left, pair.right].forEach((c, sideIdx) => {
        rows.push({
          area: '한글',
          unit: '자음 일람표 (14자)',
          subType: '기본 자음',
          indexNo: `${idx * 2 + sideIdx + 1}`,
          korean: `${c.char} (${c.name})`,
          formOrRomaja: CONSONANT_ROMAJA_MAP[c.char] || '',
          ruleOrHint: '기본 자음 음가·이름',
          exampleOrSituation: '',
          tipOrDetective: '',
          en: '',
          vi: '',
          bn: '',
          zh: '',
          ru: '',
          ja: '',
          mn: '',
        });
      });
    });

    VOWELS_DATA.forEach((pair, idx) => {
      [pair.left, pair.right]
        .filter((v) => v && v !== '♡')
        .forEach((v, sideIdx) => {
          rows.push({
            area: '한글',
            unit: '모음 일람표 (21자)',
            subType: sideIdx === 0 ? '기본 모음' : '복합 모음',
            indexNo: `${idx * 2 + sideIdx + 1}`,
            korean: v,
            formOrRomaja: VOWEL_ROMAJA_MAP[v] || '',
            ruleOrHint: '모음 음가 표기',
            exampleOrSituation: '',
            tipOrDetective: '',
            en: '',
            vi: '',
            bn: '',
            zh: '',
            ru: '',
            ja: '',
            mn: '',
          });
        });
    });

    // 1-2. HANGEUL_GROUPS (1~12단원 플래시카드 전체)
    HANGEUL_GROUPS.forEach((group) => {
      group.cards.forEach((card, idx) => {
        rows.push({
          area: '한글',
          unit: group.titleKo,
          subType: `${group.badge} (${group.titleEn})`,
          indexNo: `${idx + 1}`,
          korean: card.char,
          formOrRomaja: `${card.name} ${card.romaja}`,
          ruleOrHint: card.combination?.pronunciationNote || '',
          exampleOrSituation: `${card.sampleWord} [${card.sampleWordRomaja}]`,
          tipOrDetective: card.tips?.en || '',
          en: card.meanings?.en || '',
          vi: card.meanings?.vi || '',
          bn: card.meanings?.bn || '',
          zh: card.meanings?.zh || '',
          ru: card.meanings?.ru || '',
          ja: card.meanings?.ja || '',
          mn: card.meanings?.mn || '',
        });
      });
    });

    // 1-3. BASIC_LETTERS_DATA (기본글자 21쪽)
    BASIC_LETTERS_DATA.forEach((page) => {
      const combos = page.cards.map((c) => `${c.consonant}(${c.consonantName})+${c.vowel}=${c.syllable}`).join(' / ');
      rows.push({
        area: '한글',
        unit: `기본글자 ${page.circledNumber} [${page.vowel}]`,
        subType: `모음 결합 (${page.combinationType})`,
        indexNo: `${page.pageNumber}`,
        korean: page.wordCard.word,
        formOrRomaja: `${page.wordCard.syllables.join('-')} (${page.vowelComponents ? page.vowelComponents.join('+') : page.vowel})`,
        ruleOrHint: combos,
        exampleOrSituation: page.wordCard.description,
        tipOrDetective: '',
        en: page.wordCard.englishMeaning,
        vi: '',
        bn: '',
        zh: '',
        ru: '',
        ja: '',
        mn: '',
      });
    });

    // 1-4. BATCHIM_PAGES_DATA (받침 15쪽)
    BATCHIM_PAGES_DATA.forEach((page) => {
      const ruleSummary = page.rulePanel
        ? [
            page.rulePanel.title,
            ...page.rulePanel.sections.flatMap((sec) => [
              sec.text || '',
              ...(sec.bullets || []),
              ...(sec.noteBox?.items || []),
            ]),
          ]
            .filter(Boolean)
            .join(' | ')
        : '';

      page.cards.forEach((c, idx) => {
        rows.push({
          area: '한글',
          unit: `받침 ${page.circledNumber} ${page.title}`,
          subType: page.subTitle,
          indexNo: `${page.pageNumber}-${idx + 1}`,
          korean: c.syllable,
          formOrRomaja: `${c.baseSyllable}(${c.baseRomaja}) + ${c.batchim}(${c.batchimName} ${c.batchimRomaja}) = ${c.syllable} ${c.romaja}`,
          ruleOrHint: c.pronunciationNote || '',
          exampleOrSituation: `${page.wordCard.wordLabel} (${page.wordCard.audioWord})${c.writeWords ? ` | 쓰기: ${c.writeWords.join(', ')}` : ''}`,
          tipOrDetective: idx === 0 ? ruleSummary : '',
          en: '',
          vi: '',
          bn: '',
          zh: '',
          ru: '',
          ja: '',
          mn: '',
        });
      });
    });
  }

  // 2. 교실한국어 영역
  if (scope === 'all' || scope === 'classroom') {
    CHAPTER_LIST.forEach((chMeta) => {
      const items = VOCABULARY_DATA.filter((v) => v.ch === chMeta.ch);
      items.forEach((item, idx) => {
        rows.push({
          area: '교실한국어',
          unit: getChapterCircledTitle(chMeta.ch, 'en'),
          subType: `어휘 (${chMeta.theme})`,
          indexNo: `${chMeta.ch}-${idx + 1}`,
          korean: item.ko,
          formOrRomaja: `[${item.romaja}]`,
          ruleOrHint: item.pronunciation || '',
          exampleOrSituation: item.samplePhrase || '',
          tipOrDetective: '',
          en: item.en,
          vi: item.vi,
          bn: item.bn,
          zh: item.zh,
          ru: item.ru,
          ja: item.ja,
          mn: item.mn,
        });
      });
    });

    // 교실 생활 문장 표현
    CLASSROOM_PHRASES.forEach((phrase, idx) => {
      rows.push({
        area: '교실한국어',
        unit: phrase.category === 'student_talk' ? '교실 회화 (학생 표현)' : '교실 회화 (선생님 안내)',
        subType: '생활 문장',
        indexNo: `${idx + 1}`,
        korean: phrase.ko,
        formOrRomaja: phrase.pronounceKo || '',
        ruleOrHint: '',
        exampleOrSituation: phrase.situation,
        tipOrDetective: '',
        en: phrase.en,
        vi: phrase.vi,
        bn: phrase.bn,
        zh: '',
        ru: '',
        ja: '',
        mn: '',
      });
    });

    // 상단 비상 소통 카드
    EMERGENCY_CARDS.forEach((card, idx) => {
      const subTxt = (card.subOptions || [])
        .map((sub) => `${sub.ko} (en:${sub.translations.en} / vi:${sub.translations.vi})`)
        .join(' | ');
      const respTxt = (card.teacherResponses || [])
        .map((r) => `${r.ko} (en:${r.translations.en})`)
        .join(' | ');
      rows.push({
        area: '교실한국어',
        unit: `비상 소통 카드 (${card.titleKo})`,
        subType: '상단 긴급 소통',
        indexNo: `${idx + 1}`,
        korean: card.mainSentenceKo,
        formOrRomaja: card.titleKo,
        ruleOrHint: subTxt,
        exampleOrSituation: respTxt,
        tipOrDetective: '',
        en: card.translations.en,
        vi: card.translations.vi,
        bn: card.translations.bn,
        zh: card.translations.zh,
        ru: card.translations.ru,
        ja: card.translations.ja,
        mn: card.translations.mn,
      });
    });
  }

  // 3. 용언 영역 (1~30단원 전체)
  if (scope === 'all' || scope === 'verb') {
    VERB_UNIT_META.forEach((uMeta) => {
      const guide = VERB_UNIT_TEXT_GUIDES[uMeta.id];
      const cards = getVerbItemsSummary(uMeta.id);
      const detectiveAndTip = `[탐정찬스] ${guide.detectiveLines.join(' ')} | [${guide.tipTitle}] ${guide.tipRule} (예: ${guide.tipExamples}) ${guide.tipNote}`;

      cards.forEach((card, idx) => {
        const formatVerbLang = (l: SupportedLanguage) => {
          const baseM = card.meanings[l] || '';
          const conjM = getVerbConjugatedMeaning(card.id, l) || baseM;
          return conjM && conjM !== baseM ? `${baseM} → ${conjM}` : baseM;
        };
        rows.push({
          area: '용언 활용',
          unit: uMeta.label,
          subType: guide.conjugationType || uMeta.grammar,
          indexNo: `${uMeta.num}-${idx + 1}`,
          korean: card.baseWord,
          formOrRomaja: `${card.stem} + ${card.ending} → ${card.conjugatedWord}`,
          ruleOrHint: card.vowelHint,
          exampleOrSituation: card.sampleSentence,
          tipOrDetective: idx === 0 ? detectiveAndTip : '',
          en: formatVerbLang('en'),
          vi: formatVerbLang('vi'),
          bn: formatVerbLang('bn'),
          zh: formatVerbLang('zh'),
          ru: formatVerbLang('ru'),
          ja: formatVerbLang('ja'),
          mn: formatVerbLang('mn'),
        });
      });
    });
  }

  // 4. 조사 영역 (1~30단원 전체)
  if (scope === 'all' || scope === 'particle') {
    PARTICLE_UNIT_META.forEach((uMeta, uIdx) => {
      const guide = PARTICLE_UNIT_TEXT_GUIDES[uMeta.id];
      const detectiveAndTip = guide
        ? `[탐정찬스] ${guide.detectiveLines.join(' ')} | [${guide.tipTitle}] ${guide.tipRule} (예: ${guide.tipExamples}) ${guide.tipNote}`
        : '';

      if (uMeta.layoutType === 'cols5') {
        const items = PARTICLE_COLS_BY_UNIT[uMeta.id] || [];
        items.forEach((item, idx) => {
          const formatParticleLang = (l: SupportedLanguage) => {
            const baseM = getParticleBaseMeaning(item, l);
            const combM = getParticleCombinedMeaning(item, l);
            return combM && combM !== baseM ? `${baseM} → ${combM}` : baseM;
          };
          rows.push({
            area: '조사 결합',
            unit: `${uMeta.circled} ${uMeta.title}`,
            subType: uMeta.grammar,
            indexNo: `${uIdx + 1}-${idx + 1}`,
            korean: item.baseNoun,
            formOrRomaja: `${item.baseNoun} → ${item.combinedWord}`,
            ruleOrHint: COLS_HINTS[item.id] || '',
            exampleOrSituation: `${item.sentencePrefix}${item.sentenceHighlight}${item.sentenceSuffix}`,
            tipOrDetective: idx === 0 ? detectiveAndTip : '',
            en: formatParticleLang('en'),
            vi: formatParticleLang('vi'),
            bn: formatParticleLang('bn'),
            zh: formatParticleLang('zh'),
            ru: formatParticleLang('ru'),
            ja: formatParticleLang('ja'),
            mn: formatParticleLang('mn'),
          });
        });
      } else {
        const rowItems = PARTICLE_ROWS_BY_UNIT[uMeta.id] || [];
        rowItems.forEach((rItem, idx) => {
          const hintPair = ROW_HINTS[rItem.id];
          rows.push({
            area: '조사 결합',
            unit: `${uMeta.circled} ${uMeta.title}`,
            subType: `문장 조합 (${uMeta.grammar})`,
            indexNo: `${uIdx + 1}-${idx + 1}`,
            korean: rItem.fullSentence,
            formOrRomaja: getParticleRowSummary(rItem),
            ruleOrHint: hintPair ? `${hintPair[0]} / ${hintPair[1]}` : '',
            exampleOrSituation: rItem.fullSentence,
            tipOrDetective: idx === 0 ? detectiveAndTip : '',
            en: rItem.meanings.en || '',
            vi: rItem.meanings.vi || '',
            bn: rItem.meanings.bn || '',
            zh: rItem.meanings.zh || '',
            ru: rItem.meanings.ru || '',
            ja: rItem.meanings.ja || '',
            mn: rItem.meanings.mn || '',
          });
        });
      }
    });
  }

  return rows;
}

/**
 * [도구 1-1] 블로그용 순수 텍스트(.txt) 백업 문자열 생성
 * 마크다운 기호(#, **, ``` 등)를 일절 사용하지 않고 깔끔한 기호(■, ▶, •)와 줄바꿈만 사용
 */
export function buildBackupPlainText(scope: BackupScope = 'all'): string {
  const lines: string[] = [];
  const scopeLabelMap: Record<BackupScope, string> = {
    all: '전체 학습 데이터 (한글 · 교실한국어 · 용언 · 조사)',
    hangeul: '한글 기초 데이터',
    classroom: '교실한국어 데이터',
    verb: '용언 활용 30단원 데이터',
    particle: '조사 결합 30단원 데이터',
  };

  lines.push('============================================================');
  lines.push(`해볼 한국어 학습 데이터 백업 | ${scopeLabelMap[scope]}`);
  lines.push('============================================================');
  lines.push('');

  if (scope === 'all' || scope === 'hangeul') {
    lines.push('■ 1. 한글 기초 (자모 · 기본글자 · 받침)');
    lines.push('');
    lines.push('▶ 기본 자음 14자');
    lines.push(
      `• ${CONSONANTS_DATA.flatMap((p) => [p.left, p.right])
        .map((c) => `${c.char}(${c.name})${CONSONANT_ROMAJA_MAP[c.char] || ''}`)
        .join(', ')}`
    );
    lines.push('▶ 모음 21자');
    lines.push(
      `• ${VOWELS_DATA.flatMap((p) => [p.left, p.right])
        .filter((v) => v && v !== '♡')
        .map((v) => `${v}${VOWEL_ROMAJA_MAP[v] || ''}`)
        .join(', ')}`
    );
    lines.push('');

    HANGEUL_GROUPS.forEach((group) => {
      lines.push(`▶ ${group.titleKo} (${group.titleEn})`);
      group.cards.forEach((card) => {
        const langMeanings = SUPPORTED_LANGUAGES.map((l) => `${l.code}:${card.meanings?.[l.code] || ''}`).join(' | ');
        lines.push(`• ${card.char} (${card.name}) ${card.romaja} | 대표어휘: ${card.sampleWord} [${card.sampleWordRomaja}]`);
        if (card.combination?.pronunciationNote) {
          lines.push(`  발음 팁: ${card.combination.pronunciationNote}`);
        }
        lines.push(`  뜻: ${langMeanings}`);
      });
      lines.push('');
    });

    lines.push('▶ 기본글자 만들기 (21쪽)');
    BASIC_LETTERS_DATA.forEach((page) => {
      const sylls = page.cards.map((c) => `${c.consonant}+${c.vowel}=${c.syllable}`).join(' / ');
      lines.push(`• ${page.circledNumber} 모음 [${page.vowel}] : ${sylls} → 단어: ${page.wordCard.word} (${page.wordCard.englishMeaning}) - ${page.wordCard.description}`);
    });
    lines.push('');

    lines.push('▶ 받침 학습 (15쪽)');
    BATCHIM_PAGES_DATA.forEach((page) => {
      lines.push(`• ${page.circledNumber} ${page.title} (${page.subTitle})`);
      lines.push(`  대표 글자: ${page.cards.map((c) => `${c.syllable}${c.romaja}`).join(', ')} | 대표 단어: ${page.wordCard.audioWord}`);
      if (page.rulePanel) {
        lines.push(`  규칙 요약: ${page.rulePanel.title}`);
        page.rulePanel.sections.forEach((sec) => {
          if (sec.text) lines.push(`   - ${sec.text}`);
          sec.bullets?.forEach((b) => lines.push(`   - ${b}`));
          sec.noteBox?.items.forEach((n) => lines.push(`   ※ ${n}`));
        });
      }
    });
    lines.push('');
  }

  if (scope === 'all' || scope === 'classroom') {
    lines.push('■ 2. 교실한국어 (25단원 어휘 · 교실 문장 · 비상 소통 카드)');
    lines.push('');
    CHAPTER_LIST.forEach((chMeta) => {
      const items = VOCABULARY_DATA.filter((v) => v.ch === chMeta.ch);
      lines.push(`▶ ${getChapterCircledTitle(chMeta.ch, 'en')} (${chMeta.theme})`);
      items.forEach((item, idx) => {
        const meaningsAll = SUPPORTED_LANGUAGES.map((l) => `${l.shortName}:${(item as unknown as Record<string, string>)[l.code] || ''}`).join(' / ');
        lines.push(`• ${idx + 1}. ${item.ko} [${item.romaja}]`);
        lines.push(`  뜻: ${meaningsAll}`);
        if (item.samplePhrase) {
          lines.push(`  예문: ${item.samplePhrase}`);
        }
      });
      lines.push('');
    });

    lines.push('▶ 교실 생활 문장 표현');
    CLASSROOM_PHRASES.forEach((p, idx) => {
      lines.push(`• ${idx + 1}. ${p.ko} (${p.situation}) | en: ${p.en} / vi: ${p.vi} / bn: ${p.bn}`);
    });
    lines.push('');

    lines.push('▶ 비상 소통 카드 4종');
    EMERGENCY_CARDS.forEach((c) => {
      lines.push(`• [${c.titleKo}] ${c.mainSentenceKo}`);
      lines.push(`  다국어: ${SUPPORTED_LANGUAGES.map((l) => `${l.code}:${c.translations[l.code]}`).join(' | ')}`);
      if (c.subOptions?.length) {
        lines.push(`  세부 표현: ${c.subOptions.map((s) => `${s.ko}(${s.translations.en})`).join(' / ')}`);
      }
      if (c.teacherResponses?.length) {
        lines.push(`  선생님 답장: ${c.teacherResponses.map((r) => `${r.ko}(${r.translations.en})`).join(' / ')}`);
      }
    });
    lines.push('');
  }

  if (scope === 'all' || scope === 'verb') {
    lines.push('■ 3. 용언 활용 30단원 (표제어 150개 · 활용형 · 예문 · 탐정찬스 · 해볼쌤 팁)');
    lines.push('');
    VERB_UNIT_META.forEach((uMeta) => {
      const guide = VERB_UNIT_TEXT_GUIDES[uMeta.id];
      const cards = VERB_CARDS_BY_UNIT[uMeta.id] || [];
      lines.push(`▶ ${uMeta.label} [${guide.conjugationType || uMeta.grammar}]`);
      lines.push(`  탐정 찬스: ${guide.detectiveLines.join(' / ')}`);
      lines.push(`  ${guide.tipTitle}: ${guide.tipRule}`);
      lines.push(`  대표 변화: ${guide.tipExamples}`);
      lines.push(`  지도 포인트: ${guide.tipNote}`);
      cards.forEach((c, idx) => {
        const meaningsAll = SUPPORTED_LANGUAGES.map((l) => {
          const baseM = c.meanings[l.code] || '';
          const conjM = getVerbConjugatedMeaning(c.id, l.code) || baseM;
          return `${l.code}:${conjM && conjM !== baseM ? `${baseM} → ${conjM}` : baseM}`;
        }).join(' / ');
        lines.push(`• ${idx + 1}. ${c.baseWord} → ${c.conjugatedWord} (${c.vowelHint})`);
        lines.push(`  예문: ${c.sampleSentence}`);
        lines.push(`  다국어: ${meaningsAll}`);
      });
      lines.push('');
    });
  }

  if (scope === 'all' || scope === 'particle') {
    lines.push('■ 4. 조사 결합 30단원 (표제어/문장 · 결합 규칙 · 예문 · 탐정찬스 · 해볼쌤 팁)');
    lines.push('');
    PARTICLE_UNIT_META.forEach((uMeta) => {
      const guide = PARTICLE_UNIT_TEXT_GUIDES[uMeta.id];
      lines.push(`▶ ${uMeta.circled} ${uMeta.title}`);
      if (guide) {
        lines.push(`  탐정 찬스: ${guide.detectiveLines.join(' / ')}`);
        lines.push(`  ${guide.tipTitle}: ${guide.tipRule}`);
        lines.push(`  대표 예시: ${guide.tipExamples}`);
        lines.push(`  지도 포인트: ${guide.tipNote}`);
      }

      if (uMeta.layoutType === 'cols5') {
        const items = PARTICLE_COLS_BY_UNIT[uMeta.id] || [];
        items.forEach((item, idx) => {
          const meaningsAll = SUPPORTED_LANGUAGES.map((l) => {
            const baseM = getParticleBaseMeaning(item, l.code);
            const combM = getParticleCombinedMeaning(item, l.code);
            return `${l.code}:${combM && combM !== baseM ? `${baseM} → ${combM}` : baseM}`;
          }).join(' / ');
          lines.push(`• ${idx + 1}. ${item.baseNoun} → ${item.combinedWord} (${COLS_HINTS[item.id] || ''})`);
          lines.push(`  예문: ${item.sentencePrefix}${item.sentenceHighlight}${item.sentenceSuffix}`);
          lines.push(`  다국어: ${meaningsAll}`);
        });
      } else {
        const rowItems = PARTICLE_ROWS_BY_UNIT[uMeta.id] || [];
        rowItems.forEach((row, idx) => {
          const hintPair = ROW_HINTS[row.id];
          const meaningsAll = SUPPORTED_LANGUAGES.map((l) => `${l.code}:${row.meanings[l.code] || ''}`).join(' / ');
          lines.push(`• ${idx + 1}. ${row.fullSentence} (${getParticleRowSummary(row)}${hintPair ? ` | ${hintPair[0]}, ${hintPair[1]}` : ''})`);
          lines.push(`  다국어: ${meaningsAll}`);
        });
      }
      lines.push('');
    });
  }

  return lines.join('\n').trim();
}

/**
 * [도구 1-2] 한글이 깨지지 않는 UTF-8 (BOM 포함) 엑셀 CSV 생성
 */
export function buildBackupCsv(scope: BackupScope = 'all'): string {
  const rows = extractAllCurriculumRows(scope);
  const header = [
    '영역',
    '단원/그룹',
    '세부유형',
    '번호',
    '한국어(표제어/기본형)',
    '활용/결합/발음',
    '규칙/힌트',
    '예문/상황',
    '탐정찬스/해볼쌤팁',
    '영어(en)',
    '베트남어(vi)',
    '벵골어(bn)',
    '중국어(zh)',
    '러시아어(ru)',
    '일본어(ja)',
    '몽골어(mn)',
  ];

  const csvLines = [
    header.map(escapeCsvCell).join(','),
    ...rows.map((r) =>
      [
        r.area,
        r.unit,
        r.subType,
        r.indexNo,
        r.korean,
        r.formOrRomaja,
        r.ruleOrHint,
        r.exampleOrSituation,
        r.tipOrDetective,
        r.en,
        r.vi,
        r.bn,
        r.zh,
        r.ru,
        r.ja,
        r.mn,
      ]
        .map(escapeCsvCell)
        .join(',')
    ),
  ];

  // UTF-8 BOM 포함하여 엑셀에서 한글 및 7개 언어가 깨지지 않게 보장
  return '\uFEFF' + csvLines.join('\r\n');
}

export interface BlogTemplateConfig {
  titleTemplate: string;
  bodyTemplate: string;
}

export const BLOG_TEMPLATE_STORAGE_KEY = 'haebol_teacher_blog_template_v1';

export const DEFAULT_BLOG_TEMPLATE: BlogTemplateConfig = {
  titleTemplate: '[해볼 한국어] {{시리즈명}} {{단원번호}} - {{단원명}} ({{대상언어}} 학습자료·워크지 무료나눔)',
  bodyTemplate: `안녕하세요, 다문화·초등 한국어 맞춤형 교구 [해볼 한국어] 해볼쌤입니다.

오늘은 {{시리즈명}} {{단원번호}} [{{단원명}}] 수업을 준비하시는 선생님과 학부모님을 위해
교실 현장에서 바로 출력해 쓸 수 있는 플래시카드와 인쇄용 학습지를 정리해 드립니다.
(이번 단원 다국어 안내 기준: {{대상언어}})

■ 이번 단원 핵심 어휘 · 표현
{{어휘목록}}

■ 해볼쌤의 핵심 문법·지도 규칙
{{핵심규칙}}

■ 탐정 찬스 (학생과 짚어 보는 확인 질문)
{{탐정찬스}}

■ 교실 실전 예문 (소리 내어 따라 읽기)
{{예문}}

위 카드 이미지와 학습지는 수업·가정 학습용으로 바로 저장해 활용하실 수 있습니다.
궁금한 점이나 추가로 필요한 언어·표현이 있다면 댓글로 편하게 남겨 주세요.
오늘도 아이들과 따뜻한 한국어 시간 보내세요!`,
};

export function loadBlogTemplate(): BlogTemplateConfig {
  try {
    const raw = localStorage.getItem(BLOG_TEMPLATE_STORAGE_KEY);
    if (!raw) return DEFAULT_BLOG_TEMPLATE;
    const parsed = JSON.parse(raw) as Partial<BlogTemplateConfig>;
    return {
      titleTemplate:
        typeof parsed.titleTemplate === 'string' && parsed.titleTemplate.trim()
          ? parsed.titleTemplate
          : DEFAULT_BLOG_TEMPLATE.titleTemplate,
      bodyTemplate:
        typeof parsed.bodyTemplate === 'string' && parsed.bodyTemplate.trim()
          ? parsed.bodyTemplate
          : DEFAULT_BLOG_TEMPLATE.bodyTemplate,
    };
  } catch {
    return DEFAULT_BLOG_TEMPLATE;
  }
}

export function saveBlogTemplate(config: BlogTemplateConfig): void {
  try {
    localStorage.setItem(BLOG_TEMPLATE_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore localStorage quota error
  }
}

export interface AssembledBlogContext {
  seriesName: string;
  unitNumberLabel: string;
  unitTitle: string;
  targetLangLabel: string;
  vocabListText: string;
  coreRuleText: string;
  examplesText: string;
  detectiveText: string;
}

export function buildBlogContextForSelection(
  series: BlogSeriesType,
  unitKey: string | number,
  targetLang: SupportedLanguage
): AssembledBlogContext {
  const langMeta = getLanguageMeta(targetLang);
  const targetLangLabel = `${langMeta.labelKo} (${langMeta.nativeName})`;

  if (series === 'classroom') {
    const chNum = typeof unitKey === 'number' ? unitKey : Number(unitKey) || 1;
    const chMeta = CHAPTER_LIST.find((c) => c.ch === chNum) || CHAPTER_LIST[0];
    const items = VOCABULARY_DATA.filter((v) => v.ch === chMeta.ch);
    const unitTitle = `${chMeta.icon} ${getChapterCircledTitle(chMeta.ch, targetLang)}`;

    const vocabListText = items
      .map((item, idx) => {
        const meaning = (item as unknown as Record<string, string>)[targetLang] || item.en;
        return `• ${idx + 1}. ${item.ko} [${item.romaja}] — ${meaning}`;
      })
      .join('\n');

    const coreRuleText = [
      `• 주제 영역: ${chMeta.theme} (총 ${items.length}개 교실 필수 어휘)`,
      `• 언어 컨셉: ${langMeta.flag} ${langMeta.labelKo} × 한국어 이중언어 맞춤 지도`,
      '• 학습 구성: ① 낱말 플래시카드 → ② 그림카드 학습지 → ③ 따라쓰기 학습지 → ④ 받아쓰기 학습지',
    ].join('\n');

    const examplesText = items
      .filter((item) => Boolean(item.samplePhrase))
      .slice(0, 6)
      .map((item) => {
        const meaning = (item as unknown as Record<string, string>)[targetLang] || item.en;
        return `• ${item.ko} → "${item.samplePhrase}" (${meaning})`;
      })
      .join('\n');

    const detectiveText = [
      '• 카드를 눌러 모국어 뜻을 먼저 확인한 뒤 한국어 발음을 따라 말해 보아요.',
      '• 그림카드 → 따라쓰기 → 받아쓰기 3단계 학습지로 어휘와 문장을 함께 익혀 보세요.',
    ].join('\n');

    return {
      seriesName: '교실한국어',
      unitNumberLabel: `${chMeta.ch}단원`,
      unitTitle,
      targetLangLabel,
      vocabListText,
      coreRuleText,
      examplesText,
      detectiveText,
    };
  }

  if (series === 'verb') {
    const unitId = (typeof unitKey === 'string' && unitKey.startsWith('unit') ? unitKey : 'unit1') as VerbUnitType;
    const uMeta = VERB_UNIT_META.find((u) => u.id === unitId) || VERB_UNIT_META[0];
    const cards = VERB_CARDS_BY_UNIT[uMeta.id] || [];
    const guide = VERB_UNIT_TEXT_GUIDES[uMeta.id];

    const vocabListText = cards
      .map((c, idx) => {
        const baseM = c.meanings[targetLang] || c.meanings.en;
        const conjM = getVerbConjugatedMeaning(c.id, targetLang) || baseM;
        const meaningLabel = conjM !== baseM ? `${baseM} → ${conjM}` : baseM;
        return `• ${idx + 1}. ${c.baseWord} → ${c.conjugatedWord} (${meaningLabel}) [${c.vowelHint}]`;
      })
      .join('\n');

    const coreRuleText = [
      `• 활용 유형: ${guide.conjugationType || uMeta.grammar}`,
      `• 핵심 원리: ${guide.tipRule}`,
      `• 대표 변화: ${guide.tipExamples}`,
      `• 지도 포인트: ${guide.tipNote}`,
    ].join('\n');

    const examplesText = cards
      .map((c) => {
        const conjM = getVerbConjugatedMeaning(c.id, targetLang) || c.meanings[targetLang] || c.meanings.en;
        return `• ${c.baseWord} → "${c.sampleSentence}" (${conjM})`;
      })
      .join('\n');

    const detectiveText = guide.detectiveLines.map((line) => `• ${line}`).join('\n');

    return {
      seriesName: '용언 활용',
      unitNumberLabel: `${uMeta.num}단원`,
      unitTitle: uMeta.label,
      targetLangLabel,
      vocabListText,
      coreRuleText,
      examplesText,
      detectiveText,
    };
  }

  // particle
  const pUnitId = (typeof unitKey === 'string' && unitKey.startsWith('unit') ? unitKey : 'unit1') as ParticleUnitId;
  const pIndex = Math.max(0, PARTICLE_UNIT_META.findIndex((u) => u.id === pUnitId));
  const pMeta = PARTICLE_UNIT_META[pIndex] || PARTICLE_UNIT_META[0];
  const guide = PARTICLE_UNIT_TEXT_GUIDES[pMeta.id];

  let vocabListText = '';
  let examplesText = '';

  if (pMeta.layoutType === 'cols5') {
    const items = PARTICLE_COLS_BY_UNIT[pMeta.id] || [];
    vocabListText = items
      .map((item, idx) => {
        const baseM = getParticleBaseMeaning(item, targetLang);
        const combM = getParticleCombinedMeaning(item, targetLang);
        const meaningLabel = combM !== baseM ? `${baseM} → ${combM}` : baseM;
        return `• ${idx + 1}. ${item.baseNoun} → ${item.combinedWord} (${meaningLabel}) [${COLS_HINTS[item.id] || ''}]`;
      })
      .join('\n');
    examplesText = items
      .map((item) => {
        const combM = getParticleCombinedMeaning(item, targetLang);
        return `• "${item.sentencePrefix}${item.sentenceHighlight}${item.sentenceSuffix}" (${combM})`;
      })
      .join('\n');
  } else {
    const rows = PARTICLE_ROWS_BY_UNIT[pMeta.id] || [];
    vocabListText = rows
      .map((r, idx) => {
        const meaning = r.meanings[targetLang] || r.meanings.en;
        return `• ${idx + 1}. ${getParticleRowSummary(r)} → ${r.fullSentence} (${meaning})`;
      })
      .join('\n');
    examplesText = rows
      .map((r) => `• "${r.fullSentence}" (${r.meanings[targetLang] || r.meanings.en})`)
      .join('\n');
  }

  const coreRuleText = guide
    ? [
        `• 학습 초점: ${pMeta.circled} ${pMeta.title} (${pMeta.grammar})`,
        `• 핵심 원리: ${guide.tipRule}`,
        `• 대표 예시: ${guide.tipExamples}`,
        `• 지도 포인트: ${guide.tipNote}`,
      ].join('\n')
    : [
        `• 학습 초점: ${pMeta.circled} ${pMeta.title} (${pMeta.grammar})`,
        '• 문장 조합 연습: 앞 단원에서 배운 조사를 한 문장으로 자연스럽게 조립해 써 보세요.',
      ].join('\n');

  const detectiveText = guide
    ? guide.detectiveLines.map((line) => `• ${line}`).join('\n')
    : '• 문장의 앞뒤 호응과 받침 유무를 살피며 알맞은 조사를 골라 읽어 보세요.';

  return {
    seriesName: '조사 결합',
    unitNumberLabel: `${pIndex + 1}단원`,
    unitTitle: `${pMeta.circled} ${pMeta.title}`,
    targetLangLabel,
    vocabListText,
    coreRuleText,
    examplesText,
    detectiveText,
  };
}

export function assembleBlogPost(
  template: BlogTemplateConfig,
  ctx: AssembledBlogContext
): { title: string; body: string } {
  const replaceAll = (input: string) =>
    input
      .replace(/\{\{시리즈명\}\}/g, ctx.seriesName)
      .replace(/\{\{단원번호\}\}/g, ctx.unitNumberLabel)
      .replace(/\{\{단원명\}\}/g, ctx.unitTitle)
      .replace(/\{\{대상언어\}\}/g, ctx.targetLangLabel)
      .replace(/\{\{어휘목록\}\}/g, ctx.vocabListText)
      .replace(/\{\{핵심규칙\}\}/g, ctx.coreRuleText)
      .replace(/\{\{예문\}\}/g, ctx.examplesText)
      .replace(/\{\{탐정찬스\}\}/g, ctx.detectiveText);

  return {
    title: replaceAll(template.titleTemplate),
    body: replaceAll(template.bodyTemplate),
  };
}
