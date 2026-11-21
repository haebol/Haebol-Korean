import { SupportedLanguage } from '../types';
import {
  NA_STUDENT_SVG,
  CHINGU_SOCCER_SVG,
  DONGSAENG_CUTE_SVG,
  SEONSAENGNIM_KIND_SVG,
  GABANG_PRETTY_SVG,
  HAKSAENG_CARD_SVG,
  YEONPIL_SVG,
  CHILPAN_SVG,
  UIJA_CHAIR_SVG,
  JIUGAE_ERASER_SVG,
  NAMJA_BOY_SVG,
  YEOJA_GIRL_SVG,
  AGI_BABY_SVG,
  GABANG_SVG,
  MUL_SVG,
  CHAEK_SVG,
  YAK_SVG,
  BAE_FULL_BODY_SVG,
  BINU_SVG,
  NA_NEGA_SVG,
  NEO_NEGA_SVG,
  JEO_JEGA_SVG,
  NUGU_NUGA_SVG,
  IGEOT_IGE_SVG,
  BAP_SVG,
  SON_SVG,
  UYU_MILK_SVG,
  SAGWA_APPLE_SVG,
  WASH_HANDS_SCENE_SVG,
  DRINK_MILK_SCENE_SVG,
  EAT_APPLE_SCENE_SVG,
  WHO_EATS_RICE_SCENE_SVG,
  UNDONGJANG_SVG,
  DOSEOGWAN_SVG,
  HAKGYO_BUILDING_SVG,
  JIP_HOME_SVG,
  ACHIM_MORNING_SVG,
  JEOMSIM_LUNCH_SVG,
  GYOSIL_ROOM_SVG,
  USAN_UMBRELLA_SVG,
  GO_TO_SCHOOL_SCENE_SVG,
  STUDY_IN_CLASS_SCENE_SVG,
  DRINK_MILK_MORNING_SCENE_SVG,
  PLAY_PLAYGROUND_SCENE_SVG,
  MUEOT_WHAT_SVG,
  FRIEND_WHAT_EAT_SCENE_SVG,
  EODI_WHERE_SVG,
  EONEU_NARA_SVG,
  EAT_APPLE_AT_HOME_SCENE_SVG,
  EOMMA_MOM_SVG,
  BUS_VEHICLE_SVG,
  SUTGARAK_SPOON_SVG,
  GANGAJI_PUPPY_SVG,
  NUGU_HANTE_TO_WHOM_SVG,
  FRIEND_TO_PLAYGROUND_SCENE_SVG,
  MOM_BY_BUS_SCENE_SVG,
  SPEAK_TO_TEACHER_SCENE_SVG,
  SIBLING_TO_MOM_SCENE_SVG,
  CALL_FRIEND_PHONE_SCENE_SVG,
  JJAKKKUNG_PARTNER_SVG,
  URI_PARTICLE_SVG,
} from './particleWorksheetIllustrations';
import {
  OPEN_WINDOW_SCENE_SVG,
  DRAW_PICTURE_SCENE_SVG,
  WHO_SINGS_SONG_SCENE_SVG,
  SIBLING_BY_TRAIN_SCENE_SVG,
  WITH_MOM_TO_FRIEND_SCENE_SVG,
  SPEAK_ENGLISH_TO_FRIEND_SCENE_SVG,
  STUDY_BOOK_NOTEBOOK_SCENE_SVG,
  YEOGI_HERE_SVG,
  JEOGEOT_THAT_SVG,
  GEOGI_THERE_SVG,
  JEOHUI_WE_SVG,
} from './particleWorksheetIllustrations2';
import {
  PARTICLE_UNIT_16_TO_30_META,
  PARTICLE_COLS_16_TO_30,
  PARTICLE_ROWS_16_TO_30,
} from './particleWorksheetData2';

export type ParticleUnitId =
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

export interface ColorSegment {
  text: string;
  color: string;
}

export interface ParticleColsItem {
  id: string;
  badge: string;
  baseNoun: string;
  combinedWord: string;
  combinedSegments: ColorSegment[];
  sentencePrefix: string;
  sentenceHighlight: string;
  sentenceSuffix: string;
  meanings: Record<SupportedLanguage, string>;
  illustrationSvg: string;
}

export interface ParticleSentenceBlock {
  segments: ColorSegment[];
  staticDisplay?: boolean;
}

export interface ParticleRowsItem {
  id: string;
  badge: string;
  blocks: ParticleSentenceBlock[];
  fullSentence: string;
  meanings: Record<SupportedLanguage, string>;
  illustrationSvg: string;
}

export interface ParticleUnitMetaItem {
  id: ParticleUnitId;
  circled: string;
  layoutType: 'cols5' | 'rows5';
  title: string;
  sheetHeaderTitle: string;
  grammar: string;
  tipHeaderTitle: string;
  keywords: string[];
}

const C_BASE = '#1E293B';
const C_PARTICLE = '#E03131';
const C_IRREGULAR = '#9333EA';

const PARTICLE_UNIT_1_TO_15_META: ParticleUnitMetaItem[] = [
  {
    id: 'unit1',
    circled: '①',
    layoutType: 'cols5',
    title: '주제 (은, 는)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ① 주제 (은, 는)',
    grammar: '-은, -는',
    tipHeaderTitle: '해볼쌤 팁 | -은, -는',
    keywords: ['나', '친구', '동생', '선생님', '가방'],
  },
  {
    id: 'unit2',
    circled: '②',
    layoutType: 'cols5',
    title: '소개 (이에요, 예요)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ② 소개 (이에요, 예요)',
    grammar: '-이에요, -예요',
    tipHeaderTitle: '해볼쌤 팁 | -이에요, -예요',
    keywords: ['학생', '연필', '저것', '의자', '지우개'],
  },
  {
    id: 'unit3',
    circled: '③',
    layoutType: 'rows5',
    title: '문장 만들기 1 (은, 는, 이에요, 예요)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ③ 문장 만들기 1 (은, 는, 이에요, 예요)',
    grammar: '주어 + 신분 문장',
    tipHeaderTitle: '해볼쌤 팁 | [주어+은/는] + [명사+이에요/예요]',
    keywords: ['나는 남자예요', '너는 여자예요', '친구는 학생이에요'],
  },
  {
    id: 'unit4',
    circled: '④',
    layoutType: 'cols5',
    title: '주격 (이, 가)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ④ 주격 (이, 가)',
    grammar: '-이, -가',
    tipHeaderTitle: '해볼쌤 팁 | -이, -가',
    keywords: ['물', '책', '약', '배', '비누'],
  },
  {
    id: 'unit5',
    circled: '⑤',
    layoutType: 'cols5',
    title: '주격 ★ (내가, 네가, 제가, 누가, 이게)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑤ 주격 ★ (내가, 네가, 제가, 누가, 이게)',
    grammar: '-이, -가 ★',
    tipHeaderTitle: '해볼쌤 팁 | -이, -가 ★ (변화형)',
    keywords: ['나(내가)', '너(네가)', '저(제가)', '누구(누가)', '이것(이게)'],
  },
  {
    id: 'unit6',
    circled: '⑥',
    layoutType: 'cols5',
    title: '목적격 (을, 를)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑥ 목적격 (을, 를)',
    grammar: '-을, -를',
    tipHeaderTitle: '해볼쌤 팁 | -을, -를',
    keywords: ['밥', '손', '무엇', '우유', '사과'],
  },
  {
    id: 'unit7',
    circled: '⑦',
    layoutType: 'rows5',
    title: '문장 만들기 2 (이, 가, 을, 를)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑦ 문장 만들기 2 (이, 가, 을, 를)',
    grammar: '3어절 문장 완성',
    tipHeaderTitle: '해볼쌤 팁 | [주어] + [목적어] + [동사]',
    keywords: ['제가 창문을 열게요', '내가 그림을 그릴게', '누가 노래를 불러요'],
  },
  {
    id: 'unit8',
    circled: '⑧',
    layoutType: 'cols5',
    title: '장소·시간 (에)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑧ 장소·시간 (에)',
    grammar: '-에',
    tipHeaderTitle: '해볼쌤 팁 | -에',
    keywords: ['여기', '집', '어디', '아침', '점심'],
  },
  {
    id: 'unit9',
    circled: '⑨',
    layoutType: 'cols5',
    title: '동작 장소 (에서)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑨ 동작 장소 (에서)',
    grammar: '-에서',
    tipHeaderTitle: '해볼쌤 팁 | -에서',
    keywords: ['교실', '운동장', '도서관', '어느 나라', '거기'],
  },
  {
    id: 'unit10',
    circled: '⑩',
    layoutType: 'cols5',
    title: '추가 (도)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑩ 추가 (도)',
    grammar: '-도',
    tipHeaderTitle: '해볼쌤 팁 | -도',
    keywords: ['저희', '친구', '물', '사과', '우산'],
  },
  {
    id: 'unit11',
    circled: '⑪',
    layoutType: 'rows5',
    title: '문장 만들기 3 (에, 에서, 도)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑪ 문장 만들기 3 (에, 에서, 도)',
    grammar: '장소·시간·추가 문장',
    tipHeaderTitle: '해볼쌤 팁 | [시간/추가] + [장소+에/에서] + [동사]',
    keywords: ['나도 학교에 가요', '점심에 운동장에서 놀아요', '집에서 사과도 먹어요'],
  },
  {
    id: 'unit12',
    circled: '⑫',
    layoutType: 'cols5',
    title: '나열·동반 (와, 과, 하고, 이랑, 랑)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑫ 나열·동반 (와, 과, 하고, 이랑, 랑)',
    grammar: '-와, -과, -하고, -이랑, -랑',
    tipHeaderTitle: '해볼쌤 팁 | -와, -과, -하고, -이랑, -랑',
    keywords: ['엄마', '우유', '연필', '책', '친구'],
  },
  {
    id: 'unit13',
    circled: '⑬',
    layoutType: 'cols5',
    title: '방향·수단 (으로, 로)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑬ 방향·수단 (으로, 로)',
    grammar: '-으로, -로',
    tipHeaderTitle: '해볼쌤 팁 | -으로, -로',
    keywords: ['학교', '운동장', '연필', '버스', '숟가락'],
  },
  {
    id: 'unit14',
    circled: '⑭',
    layoutType: 'cols5',
    title: '행동 대상 (에게, 한테)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑭ 행동 대상 (에게, 한테)',
    grammar: '-에게, -한테',
    tipHeaderTitle: '해볼쌤 팁 | -에게, -한테',
    keywords: ['짝꿍', '친구', '동생', '우리', '누구'],
  },
  {
    id: 'unit15',
    circled: '⑮',
    layoutType: 'rows5',
    title: '문장 만들기 4 (와, 과, 하고, 이랑, 랑, 으로, 로, 에게, 한테)',
    sheetHeaderTitle: '해볼 한국어 [조사 결합] ⑮ 문장 만들기 4 (와, 과, 하고, 이랑, 랑, 으로, 로, 에게, 한테)',
    grammar: '동반·수단·대상 문장',
    tipHeaderTitle: '해볼쌤 팁 | [동반] + [방향/수단/대상] + [동사]',
    keywords: ['친구랑 운동장으로 가요', '동생이랑 기차로 가요', '책과 공책으로 공부해요'],
  },
];

export const PARTICLE_UNIT_META: ParticleUnitMetaItem[] = [
  ...PARTICLE_UNIT_1_TO_15_META,
  ...PARTICLE_UNIT_16_TO_30_META,
];

// 1단원: 주어 + 은/는
export const PARTICLE_UNIT_1_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u1-1',
    badge: '1-1',
    baseNoun: '나',
    combinedWord: '나는',
    combinedSegments: [
      { text: '나', color: C_BASE },
      { text: '는', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '나는',
    sentenceSuffix: ' 학생이에요.',
    meanings: { en: 'I / Me', vi: 'Tôi / Mình', bn: 'আমি', zh: '我', ru: 'Я', ja: '私 / ぼく', mn: 'Би' },
    illustrationSvg: NA_STUDENT_SVG,
  },
  {
    id: 'particle-u1-2',
    badge: '1-2',
    baseNoun: '친구',
    combinedWord: '친구는',
    combinedSegments: [
      { text: '친구', color: C_BASE },
      { text: '는', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '친구는',
    sentenceSuffix: ' 축구를 해요.',
    meanings: { en: 'Friend', vi: 'Bạn bè', bn: 'বন্ধু', zh: '朋友', ru: 'Друг', ja: '友達', mn: 'Найз' },
    illustrationSvg: CHINGU_SOCCER_SVG,
  },
  {
    id: 'particle-u1-3',
    badge: '1-3',
    baseNoun: '동생',
    combinedWord: '동생은',
    combinedSegments: [
      { text: '동생', color: C_BASE },
      { text: '은', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '동생은',
    sentenceSuffix: ' 귀여워요.',
    meanings: { en: 'Younger sibling', vi: 'Em', bn: 'ছোট ভাই/বোন', zh: '弟弟/妹妹', ru: 'Младший брат/сестра', ja: '弟 / 妹', mn: 'Дүү' },
    illustrationSvg: DONGSAENG_CUTE_SVG,
  },
  {
    id: 'particle-u1-4',
    badge: '1-4',
    baseNoun: '선생님',
    combinedWord: '선생님은',
    combinedSegments: [
      { text: '선생님', color: C_BASE },
      { text: '은', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '선생님은',
    sentenceSuffix: ' 친절해요.',
    meanings: { en: 'Teacher', vi: 'Giáo viên', bn: 'শিক্ষক', zh: '老师', ru: 'Учитель', ja: '先生', mn: 'Багш' },
    illustrationSvg: SEONSAENGNIM_KIND_SVG,
  },
  {
    id: 'particle-u1-5',
    badge: '1-5',
    baseNoun: '가방',
    combinedWord: '가방은',
    combinedSegments: [
      { text: '가방', color: C_BASE },
      { text: '은', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '가방은',
    sentenceSuffix: ' 예뻐요.',
    meanings: { en: 'Bag / Backpack', vi: 'Cặp sách', bn: 'ব্যাগ', zh: '书包', ru: 'Рюкзак', ja: 'かばん', mn: 'Цүнх' },
    illustrationSvg: GABANG_PRETTY_SVG,
  },
];

// 2단원: 이름·신분 + 이에요/예요
export const PARTICLE_UNIT_2_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u2-1',
    badge: '2-1',
    baseNoun: '학생',
    combinedWord: '학생이에요',
    combinedSegments: [
      { text: '학생', color: C_BASE },
      { text: '이에요', color: C_PARTICLE },
    ],
    sentencePrefix: '저는 ',
    sentenceHighlight: '학생이에요.',
    sentenceSuffix: '',
    meanings: { en: 'Student', vi: 'Học sinh', bn: 'ছাত্র/ছাত্রী', zh: '学生', ru: 'Ученик', ja: '学生', mn: 'Сурагч' },
    illustrationSvg: HAKSAENG_CARD_SVG,
  },
  {
    id: 'particle-u2-2',
    badge: '2-2',
    baseNoun: '연필',
    combinedWord: '연필이에요',
    combinedSegments: [
      { text: '연필', color: C_BASE },
      { text: '이에요', color: C_PARTICLE },
    ],
    sentencePrefix: '이것은 ',
    sentenceHighlight: '연필이에요.',
    sentenceSuffix: '',
    meanings: { en: 'Pencil', vi: 'Bút chì', bn: 'পেন্সিল', zh: '铅笔', ru: 'Карандаш', ja: '鉛筆', mn: 'Харандаа' },
    illustrationSvg: YEONPIL_SVG,
  },
  {
    id: 'particle-u2-3',
    badge: '2-3',
    baseNoun: '저것',
    combinedWord: '저것이에요',
    combinedSegments: [
      { text: '저것', color: C_BASE },
      { text: '이에요', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '저것은',
    sentenceSuffix: ' 칠판이에요.',
    meanings: { en: 'That thing', vi: 'Cái kia', bn: 'ওটা', zh: '那个', ru: 'То (вон то)', ja: 'あれ', mn: 'Тэр' },
    illustrationSvg: JEOGEOT_THAT_SVG,
  },
  {
    id: 'particle-u2-4',
    badge: '2-4',
    baseNoun: '의자',
    combinedWord: '의자예요',
    combinedSegments: [
      { text: '의자', color: C_BASE },
      { text: '예요', color: C_PARTICLE },
    ],
    sentencePrefix: '이것은 ',
    sentenceHighlight: '의자예요.',
    sentenceSuffix: '',
    meanings: { en: 'Chair', vi: 'Cái ghế', bn: 'চেয়ার', zh: '椅子', ru: 'Стул', ja: 'いす', mn: 'Сандал' },
    illustrationSvg: UIJA_CHAIR_SVG,
  },
  {
    id: 'particle-u2-5',
    badge: '2-5',
    baseNoun: '지우개',
    combinedWord: '지우개예요',
    combinedSegments: [
      { text: '지우개', color: C_BASE },
      { text: '예요', color: C_PARTICLE },
    ],
    sentencePrefix: '내 ',
    sentenceHighlight: '지우개예요.',
    sentenceSuffix: '',
    meanings: { en: 'Eraser', vi: 'Cục tẩy', bn: 'ইরেজার', zh: '橡皮', ru: 'Ластик', ja: '消しゴム', mn: 'Баллуур' },
    illustrationSvg: JIUGAE_ERASER_SVG,
  },
];

// 3단원: 5행 문장 만들기 ① (은/는 + 이에요/예요)
export const PARTICLE_UNIT_3_ROWS: ParticleRowsItem[] = [
  {
    id: 'particle-u3-1',
    badge: '3-1',
    blocks: [
      { segments: [{ text: '나', color: C_BASE }, { text: '는', color: C_PARTICLE }] },
      { segments: [{ text: '남자', color: C_BASE }, { text: '예요.', color: C_PARTICLE }] },
    ],
    fullSentence: '나는 남자예요.',
    meanings: {
      en: 'I am a boy.',
      vi: 'Mình là con trai.',
      bn: 'আমি একজন ছেলে।',
      zh: '我是男生。',
      ru: 'Я мальчик.',
      ja: 'ぼくは男の子です。',
      mn: 'Би эрэгтэй хүүхэд.',
    },
    illustrationSvg: NAMJA_BOY_SVG,
  },
  {
    id: 'particle-u3-2',
    badge: '3-2',
    blocks: [
      { segments: [{ text: '너', color: C_BASE }, { text: '는', color: C_PARTICLE }] },
      { segments: [{ text: '여자', color: C_BASE }, { text: '예요.', color: C_PARTICLE }] },
    ],
    fullSentence: '너는 여자예요.',
    meanings: {
      en: 'You are a girl.',
      vi: 'Bạn là con gái.',
      bn: 'তুমি একজন মেয়ে।',
      zh: '你是女生。',
      ru: 'Ты девочка.',
      ja: 'きみは女の子です。',
      mn: 'Чи эмэгтэй хүүхэд.',
    },
    illustrationSvg: YEOJA_GIRL_SVG,
  },
  {
    id: 'particle-u3-3',
    badge: '3-3',
    blocks: [
      { segments: [{ text: '친구', color: C_BASE }, { text: '는', color: C_PARTICLE }] },
      { segments: [{ text: '학생', color: C_BASE }, { text: '이에요.', color: C_PARTICLE }] },
    ],
    fullSentence: '친구는 학생이에요.',
    meanings: {
      en: 'My friend is a student.',
      vi: 'Bạn mình là học sinh.',
      bn: 'আমার বন্ধু একজন ছাত্র।',
      zh: '朋友是学生。',
      ru: 'Мой друг — ученик.',
      ja: '友達は学生です。',
      mn: 'Найз маань сурагч.',
    },
    illustrationSvg: HAKSAENG_CARD_SVG,
  },
  {
    id: 'particle-u3-4',
    badge: '3-4',
    blocks: [
      { segments: [{ text: '동생', color: C_BASE }, { text: '은', color: C_PARTICLE }] },
      { segments: [{ text: '아기', color: C_BASE }, { text: '예요.', color: C_PARTICLE }] },
    ],
    fullSentence: '동생은 아기예요.',
    meanings: {
      en: 'My younger sibling is a baby.',
      vi: 'Em của mình là em bé.',
      bn: 'আমার ছোট ভাই/বোন একটি শিশু।',
      zh: '弟弟/妹妹是小宝宝。',
      ru: 'Младший братик/сестричка — малыш.',
      ja: '妹/弟は赤ちゃんです。',
      mn: 'Дүү маань нялх хүүхэд.',
    },
    illustrationSvg: AGI_BABY_SVG,
  },
  {
    id: 'particle-u3-5',
    badge: '3-5',
    blocks: [
      { segments: [{ text: '이것', color: C_BASE }, { text: '은', color: C_PARTICLE }] },
      { segments: [{ text: '가방', color: C_BASE }, { text: '이에요.', color: C_PARTICLE }] },
    ],
    fullSentence: '이것은 가방이에요.',
    meanings: {
      en: 'This is a bag.',
      vi: 'Đây là cái cặp sách.',
      bn: 'এটি একটি ব্যাগ।',
      zh: '这是书包。',
      ru: 'Это рюкзак.',
      ja: 'これはかばんです。',
      mn: 'Энэ бол цүнх.',
    },
    illustrationSvg: GABANG_SVG,
  },
];

// 4단원: 주격 + 이/가
export const PARTICLE_UNIT_4_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u4-1',
    badge: '4-1',
    baseNoun: '물',
    combinedWord: '물이',
    combinedSegments: [
      { text: '물', color: C_BASE },
      { text: '이', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '물이',
    sentenceSuffix: ' 있어요.',
    meanings: { en: 'Water', vi: 'Nước', bn: 'পানি', zh: '水', ru: 'Вода', ja: 'お水', mn: 'Ус' },
    illustrationSvg: MUL_SVG,
  },
  {
    id: 'particle-u4-2',
    badge: '4-2',
    baseNoun: '책',
    combinedWord: '책이',
    combinedSegments: [
      { text: '책', color: C_BASE },
      { text: '이', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '책이',
    sentenceSuffix: ' 좋아요.',
    meanings: { en: 'Book', vi: 'Sách', bn: 'বই', zh: '书', ru: 'Книга', ja: '本', mn: 'Ном' },
    illustrationSvg: CHAEK_SVG,
  },
  {
    id: 'particle-u4-3',
    badge: '4-3',
    baseNoun: '약',
    combinedWord: '약이',
    combinedSegments: [
      { text: '약', color: C_BASE },
      { text: '이', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '약이',
    sentenceSuffix: ' 싫어요.',
    meanings: { en: 'Medicine', vi: 'Thuốc', bn: 'ওষুধ', zh: '药', ru: 'Лекарство', ja: 'お薬', mn: 'Эм' },
    illustrationSvg: YAK_SVG,
  },
  {
    id: 'particle-u4-4',
    badge: '4-4',
    baseNoun: '배',
    combinedWord: '배가',
    combinedSegments: [
      { text: '배', color: C_BASE },
      { text: '가', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '배가',
    sentenceSuffix: ' 아파요.',
    meanings: { en: 'Stomach', vi: 'Bụng', bn: 'পেট', zh: '肚子', ru: 'Живот', ja: 'お腹', mn: 'Гэдэс' },
    illustrationSvg: BAE_FULL_BODY_SVG,
  },
  {
    id: 'particle-u4-5',
    badge: '4-5',
    baseNoun: '비누',
    combinedWord: '비누가',
    combinedSegments: [
      { text: '비누', color: C_BASE },
      { text: '가', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '비누가',
    sentenceSuffix: ' 있어요.',
    meanings: { en: 'Soap', vi: 'Xà phòng', bn: 'সাবান', zh: '肥皂', ru: 'Мыло', ja: '石けん', mn: 'Саван' },
    illustrationSvg: BINU_SVG,
  },
];

// 5단원: 주격 + 이/가 ★ (변화형)
export const PARTICLE_UNIT_5_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u5-1',
    badge: '5-1',
    baseNoun: '나',
    combinedWord: '내가',
    combinedSegments: [
      { text: '내', color: C_IRREGULAR },
      { text: '가', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '내가',
    sentenceSuffix: ' 할게.',
    meanings: { en: 'I (subject)', vi: 'Mình / Tôi (chủ ngữ)', bn: 'আমি', zh: '我（主语）', ru: 'Я', ja: '私が / ぼくが', mn: 'Би (нэрлэхийн)' },
    illustrationSvg: NA_NEGA_SVG,
  },
  {
    id: 'particle-u5-2',
    badge: '5-2',
    baseNoun: '너',
    combinedWord: '네가',
    combinedSegments: [
      { text: '네', color: C_IRREGULAR },
      { text: '가', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '네가',
    sentenceSuffix: ' 해 봐.',
    meanings: { en: 'You (subject)', vi: 'Bạn (chủ ngữ)', bn: 'তুমি', zh: '你（主语）', ru: 'Ты', ja: 'きみが', mn: 'Чи (нэрлэхийн)' },
    illustrationSvg: NEO_NEGA_SVG,
  },
  {
    id: 'particle-u5-3',
    badge: '5-3',
    baseNoun: '저',
    combinedWord: '제가',
    combinedSegments: [
      { text: '제', color: C_IRREGULAR },
      { text: '가', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '제가',
    sentenceSuffix: ' 할게요.',
    meanings: { en: 'I (polite)', vi: 'Em / Cháu (lịch sự)', bn: 'আমি (বিনীত)', zh: '我（敬语）', ru: 'Я (вежл.)', ja: '私が（丁寧）', mn: 'Би (хүндэтгэл)' },
    illustrationSvg: JEO_JEGA_SVG,
  },
  {
    id: 'particle-u5-4',
    badge: '5-4',
    baseNoun: '누구',
    combinedWord: '누가',
    combinedSegments: [
      { text: '누', color: C_IRREGULAR },
      { text: '가', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '누가',
    sentenceSuffix: ' 왔어요?',
    meanings: { en: 'Who', vi: 'Ai thế?', bn: 'কে', zh: '谁', ru: 'Кто', ja: '誰が', mn: 'Хэн' },
    illustrationSvg: NUGU_NUGA_SVG,
  },
  {
    id: 'particle-u5-5',
    badge: '5-5',
    baseNoun: '이것',
    combinedWord: '이게',
    combinedSegments: [
      { text: '이', color: C_BASE },
      { text: '게', color: C_IRREGULAR },
    ],
    sentencePrefix: '',
    sentenceHighlight: '이게',
    sentenceSuffix: ' 뭐예요?',
    meanings: { en: 'This (contracted)', vi: 'Cái này (rút gọn)', bn: 'এটি (সংক্ষিপ্ত)', zh: '这个（缩略）', ru: 'Это (сокращ.)', ja: 'これが（短縮）', mn: 'Энэ нь' },
    illustrationSvg: IGEOT_IGE_SVG,
  },
];

// 6단원: 목적어 + 을/를
export const PARTICLE_UNIT_6_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u6-1',
    badge: '6-1',
    baseNoun: '밥',
    combinedWord: '밥을',
    combinedSegments: [
      { text: '밥', color: C_BASE },
      { text: '을', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '밥을',
    sentenceSuffix: ' 먹어요.',
    meanings: { en: 'Rice / Meal', vi: 'Cơm', bn: 'ভাত', zh: '米饭', ru: 'Рис / Еда', ja: 'ご飯', mn: 'Будаа / Хоол' },
    illustrationSvg: BAP_SVG,
  },
  {
    id: 'particle-u6-2',
    badge: '6-2',
    baseNoun: '손',
    combinedWord: '손을',
    combinedSegments: [
      { text: '손', color: C_BASE },
      { text: '을', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '손을',
    sentenceSuffix: ' 씻어요.',
    meanings: { en: 'Hand', vi: 'Tay', bn: 'হাত', zh: '手', ru: 'Рука', ja: '手', mn: 'Гар' },
    illustrationSvg: SON_SVG,
  },
  {
    id: 'particle-u6-3',
    badge: '6-3',
    baseNoun: '무엇',
    combinedWord: '무엇을',
    combinedSegments: [
      { text: '무엇', color: C_BASE },
      { text: '을', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '무엇을',
    sentenceSuffix: ' 먹어요?',
    meanings: { en: 'What', vi: 'Cái gì', bn: 'কী', zh: '什么', ru: 'Что', ja: '何', mn: 'Юу' },
    illustrationSvg: MUEOT_WHAT_SVG,
  },
  {
    id: 'particle-u6-4',
    badge: '6-4',
    baseNoun: '우유',
    combinedWord: '우유를',
    combinedSegments: [
      { text: '우유', color: C_BASE },
      { text: '를', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '우유를',
    sentenceSuffix: ' 마셔요.',
    meanings: { en: 'Milk', vi: 'Sữa', bn: 'দুধ', zh: '牛奶', ru: 'Молоко', ja: '牛乳 / ミルク', mn: 'Сүү' },
    illustrationSvg: UYU_MILK_SVG,
  },
  {
    id: 'particle-u6-5',
    badge: '6-5',
    baseNoun: '사과',
    combinedWord: '사과를',
    combinedSegments: [
      { text: '사과', color: C_BASE },
      { text: '를', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '사과를',
    sentenceSuffix: ' 주세요.',
    meanings: { en: 'Apple', vi: 'Quả táo', bn: 'আপেল', zh: '苹果', ru: 'Яблоко', ja: 'りんご', mn: 'Алим' },
    illustrationSvg: SAGWA_APPLE_SVG,
  },
];

// 7단원: 5행 문장 만들기 2 (이, 가, 을, 를 - 직전 4·5·6단원 100% 집중 복습)
export const PARTICLE_UNIT_7_ROWS: ParticleRowsItem[] = [
  {
    id: 'particle-u7-1',
    badge: '7-1',
    blocks: [
      { segments: [{ text: '제', color: C_IRREGULAR }, { text: '가', color: C_PARTICLE }] },
      { segments: [{ text: '창문', color: C_BASE }, { text: '을', color: C_PARTICLE }] },
      { segments: [{ text: '열게요.', color: C_BASE }], staticDisplay: true },
    ],
    fullSentence: '제가 창문을 열게요.',
    meanings: {
      en: 'I will open the window.',
      vi: 'Để em / tôi mở cửa sổ ạ.',
      bn: 'আমি জানালা খুলে দেব।',
      zh: '我来开窗户吧。',
      ru: 'Я открою окно.',
      ja: '私が窓を開けますね。',
      mn: 'Би цонхоо нээе.',
    },
    illustrationSvg: OPEN_WINDOW_SCENE_SVG,
  },
  {
    id: 'particle-u7-2',
    badge: '7-2',
    blocks: [
      { segments: [{ text: '동생', color: C_BASE }, { text: '이', color: C_PARTICLE }] },
      { segments: [{ text: '우유', color: C_BASE }, { text: '를', color: C_PARTICLE }] },
      { segments: [{ text: '마셔요.', color: C_BASE }] },
    ],
    fullSentence: '동생이 우유를 마셔요.',
    meanings: {
      en: 'My sibling drinks milk.',
      vi: 'Em mình uống sữa.',
      bn: 'ছোট ভাই/বোন দুধ খাচ্ছে।',
      zh: '弟弟/妹妹喝牛奶。',
      ru: 'Младший брат/сестра пьёт молоко.',
      ja: '弟/妹が牛乳を飲みます。',
      mn: 'Дүү сүү ууж байна.',
    },
    illustrationSvg: DRINK_MILK_SCENE_SVG,
  },
  {
    id: 'particle-u7-3',
    badge: '7-3',
    blocks: [
      { segments: [{ text: '내', color: C_IRREGULAR }, { text: '가', color: C_PARTICLE }] },
      { segments: [{ text: '그림', color: C_BASE }, { text: '을', color: C_PARTICLE }] },
      { segments: [{ text: '그릴게.', color: C_BASE }], staticDisplay: true },
    ],
    fullSentence: '내가 그림을 그릴게.',
    meanings: {
      en: 'I will draw a picture.',
      vi: 'Mình sẽ vẽ tranh nhé.',
      bn: 'আমি একটি ছবি আঁকব।',
      zh: '我来画画吧。',
      ru: 'Я нарисую рисунок.',
      ja: 'ぼくが絵を描くね。',
      mn: 'Би зураг зуръя.',
    },
    illustrationSvg: DRAW_PICTURE_SCENE_SVG,
  },
  {
    id: 'particle-u7-4',
    badge: '7-4',
    blocks: [
      { segments: [{ text: '친구', color: C_BASE }, { text: '가', color: C_PARTICLE }] },
      { segments: [{ text: '무엇', color: C_BASE }, { text: '을', color: C_PARTICLE }] },
      { segments: [{ text: '먹어요?', color: C_BASE }] },
    ],
    fullSentence: '친구가 무엇을 먹어요?',
    meanings: {
      en: 'What does my friend eat?',
      vi: 'Bạn mình ăn gì thế?',
      bn: 'বন্ধু কী খাচ্ছে?',
      zh: '朋友吃什么？',
      ru: 'Что ест мой друг?',
      ja: '友達は何を食べますか？',
      mn: 'Найз маань юу идэж байна вэ?',
    },
    illustrationSvg: FRIEND_WHAT_EAT_SCENE_SVG,
  },
  {
    id: 'particle-u7-5',
    badge: '7-5',
    blocks: [
      { segments: [{ text: '누', color: C_IRREGULAR }, { text: '가', color: C_PARTICLE }] },
      { segments: [{ text: '노래', color: C_BASE }, { text: '를', color: C_PARTICLE }] },
      { segments: [{ text: '불러요?', color: C_BASE }], staticDisplay: true },
    ],
    fullSentence: '누가 노래를 불러요?',
    meanings: {
      en: 'Who sings a song?',
      vi: 'Ai đang hát thế?',
      bn: 'কে গান গাইছে?',
      zh: '谁在唱歌？',
      ru: 'Кто поёт песню?',
      ja: '誰が歌を歌っていますか？',
      mn: 'Хэн дуу дуулж байна вэ?',
    },
    illustrationSvg: WHO_SINGS_SONG_SCENE_SVG,
  },
];

// 8단원: 장소·시간 (에)
export const PARTICLE_UNIT_8_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u8-1',
    badge: '8-1',
    baseNoun: '여기',
    combinedWord: '여기에',
    combinedSegments: [
      { text: '여기', color: C_BASE },
      { text: '에', color: C_PARTICLE },
    ],
    sentencePrefix: '가방을 ',
    sentenceHighlight: '여기에',
    sentenceSuffix: ' 놓으세요.',
    meanings: { en: 'Here', vi: 'Ở đây / Đây', bn: 'এখানে', zh: '这里', ru: 'Здесь / Сюда', ja: 'ここ', mn: 'Энд' },
    illustrationSvg: YEOGI_HERE_SVG,
  },
  {
    id: 'particle-u8-2',
    badge: '8-2',
    baseNoun: '집',
    combinedWord: '집에',
    combinedSegments: [
      { text: '집', color: C_BASE },
      { text: '에', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '집에',
    sentenceSuffix: ' 있어요.',
    meanings: { en: 'Home / House', vi: 'Nhà', bn: 'বাড়ি', zh: '家', ru: 'Дом', ja: '家', mn: 'Гэр' },
    illustrationSvg: JIP_HOME_SVG,
  },
  {
    id: 'particle-u8-3',
    badge: '8-3',
    baseNoun: '어디',
    combinedWord: '어디에',
    combinedSegments: [
      { text: '어디', color: C_BASE },
      { text: '에', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '어디에',
    sentenceSuffix: ' 가요?',
    meanings: { en: 'Where', vi: 'Ở đâu / Đâu', bn: 'কোথায়', zh: '哪里', ru: 'Куда / Где', ja: 'どこ', mn: 'Хаана / Хаашаа' },
    illustrationSvg: EODI_WHERE_SVG,
  },
  {
    id: 'particle-u8-4',
    badge: '8-4',
    baseNoun: '아침',
    combinedWord: '아침에',
    combinedSegments: [
      { text: '아침', color: C_BASE },
      { text: '에', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '아침에',
    sentenceSuffix: ' 일어나요.',
    meanings: { en: 'Morning', vi: 'Buổi sáng', bn: 'সকাল', zh: '早上', ru: 'Утро', ja: '朝', mn: 'Өглөө' },
    illustrationSvg: ACHIM_MORNING_SVG,
  },
  {
    id: 'particle-u8-5',
    badge: '8-5',
    baseNoun: '점심',
    combinedWord: '점심에',
    combinedSegments: [
      { text: '점심', color: C_BASE },
      { text: '에', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '점심에',
    sentenceSuffix: ' 먹어요.',
    meanings: { en: 'Lunchtime / Noon', vi: 'Buổi trưa', bn: 'দুপুর', zh: '中午', ru: 'Обед / Полдень', ja: '昼 / ランチ', mn: 'Өдөр' },
    illustrationSvg: JEOMSIM_LUNCH_SVG,
  },
];

// 9단원: 동작 장소 (에서)
export const PARTICLE_UNIT_9_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u9-1',
    badge: '9-1',
    baseNoun: '교실',
    combinedWord: '교실에서',
    combinedSegments: [
      { text: '교실', color: C_BASE },
      { text: '에서', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '교실에서',
    sentenceSuffix: ' 공부해요.',
    meanings: { en: 'Classroom', vi: 'Phòng học', bn: 'শ্রেণিকক্ষ', zh: '教室', ru: 'Класс', ja: '教室', mn: 'Анги' },
    illustrationSvg: GYOSIL_ROOM_SVG,
  },
  {
    id: 'particle-u9-2',
    badge: '9-2',
    baseNoun: '운동장',
    combinedWord: '운동장에서',
    combinedSegments: [
      { text: '운동장', color: C_BASE },
      { text: '에서', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '운동장에서',
    sentenceSuffix: ' 놀아요.',
    meanings: { en: 'Playground', vi: 'Sân trường', bn: 'খেলার মাঠ', zh: '操场', ru: 'Спортплощадка', ja: '運動場 / 校庭', mn: 'Спортын талбай' },
    illustrationSvg: UNDONGJANG_SVG,
  },
  {
    id: 'particle-u9-3',
    badge: '9-3',
    baseNoun: '도서관',
    combinedWord: '도서관에서',
    combinedSegments: [
      { text: '도서관', color: C_BASE },
      { text: '에서', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '도서관에서',
    sentenceSuffix: ' 읽어요.',
    meanings: { en: 'Library', vi: 'Thư viện', bn: 'গ্রন্থাগার', zh: '图书馆', ru: 'Библиотека', ja: '図書館', mn: 'Номын сан' },
    illustrationSvg: DOSEOGWAN_SVG,
  },
  {
    id: 'particle-u9-4',
    badge: '9-4',
    baseNoun: '어느 나라',
    combinedWord: '어느 나라에서',
    combinedSegments: [
      { text: '어느 나라', color: C_BASE },
      { text: '에서', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '어느 나라에서',
    sentenceSuffix: ' 왔어요?',
    meanings: { en: 'Which country', vi: 'Nước nào', bn: 'কোন দেশ', zh: '哪个国家', ru: 'Какая страна', ja: 'どこの国', mn: 'Аль улс' },
    illustrationSvg: EONEU_NARA_SVG,
  },
  {
    id: 'particle-u9-5',
    badge: '9-5',
    baseNoun: '거기',
    combinedWord: '거기에서',
    combinedSegments: [
      { text: '거기', color: C_BASE },
      { text: '에서', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '거기에서',
    sentenceSuffix: ' 잠깐 기다리세요.',
    meanings: { en: 'There', vi: 'Ở đó / Kia', bn: 'সেখানে', zh: '那里', ru: 'Там', ja: 'そこ', mn: 'Тэнд' },
    illustrationSvg: GEOGI_THERE_SVG,
  },
];

// 10단원: 추가 (도)
export const PARTICLE_UNIT_10_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u10-1',
    badge: '10-1',
    baseNoun: '저희',
    combinedWord: '저희도',
    combinedSegments: [
      { text: '저희', color: C_BASE },
      { text: '도', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '저희도',
    sentenceSuffix: ' 같이 도서관에 갈까요?',
    meanings: { en: 'We too (polite)', vi: 'Chúng em cũng', bn: 'আমরাও (বিনীত)', zh: '我们也（谦称）', ru: 'Мы тоже (вежл.)', ja: '私たちも（丁寧）', mn: 'Бид ч бас (хүндэт)' },
    illustrationSvg: JEOHUI_WE_SVG,
  },
  {
    id: 'particle-u10-2',
    badge: '10-2',
    baseNoun: '친구',
    combinedWord: '친구도',
    combinedSegments: [
      { text: '친구', color: C_BASE },
      { text: '도', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '친구도',
    sentenceSuffix: ' 와요.',
    meanings: { en: 'Friend too', vi: 'Bạn cũng', bn: 'বন্ধুও', zh: '朋友也', ru: 'И друг тоже', ja: '友達も', mn: 'Найз ч бас' },
    illustrationSvg: CHINGU_SOCCER_SVG,
  },
  {
    id: 'particle-u10-3',
    badge: '10-3',
    baseNoun: '물',
    combinedWord: '물도',
    combinedSegments: [
      { text: '물', color: C_BASE },
      { text: '도', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '물도',
    sentenceSuffix: ' 주세요.',
    meanings: { en: 'Water too', vi: 'Nước nữa', bn: 'পানিও', zh: '水也', ru: 'И воду тоже', ja: 'お水も', mn: 'Ус ч бас' },
    illustrationSvg: MUL_SVG,
  },
  {
    id: 'particle-u10-4',
    badge: '10-4',
    baseNoun: '사과',
    combinedWord: '사과도',
    combinedSegments: [
      { text: '사과', color: C_BASE },
      { text: '도', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '사과도',
    sentenceSuffix: ' 먹어요.',
    meanings: { en: 'Apple too', vi: 'Táo nữa', bn: 'আপেলও', zh: '苹果也', ru: 'И яблоко тоже', ja: 'りんごも', mn: 'Алим ч бас' },
    illustrationSvg: SAGWA_APPLE_SVG,
  },
  {
    id: 'particle-u10-5',
    badge: '10-5',
    baseNoun: '우산',
    combinedWord: '우산도',
    combinedSegments: [
      { text: '우산', color: C_BASE },
      { text: '도', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '우산도',
    sentenceSuffix: ' 있어요.',
    meanings: { en: 'Umbrella too', vi: 'Ô / Dù nữa', bn: 'ছাতাও', zh: '雨伞也', ru: 'И зонт тоже', ja: '傘も', mn: 'Шүхэр ч бас' },
    illustrationSvg: USAN_UMBRELLA_SVG,
  },
];

// 11단원: 5행 문장 만들기 3 (에, 에서, 도 - 직전 8·9·10단원 100% 집중 복습)
export const PARTICLE_UNIT_11_ROWS: ParticleRowsItem[] = [
  {
    id: 'particle-u11-1',
    badge: '11-1',
    blocks: [
      { segments: [{ text: '나', color: C_BASE }, { text: '도', color: C_PARTICLE }] },
      { segments: [{ text: '학교', color: C_BASE }, { text: '에', color: C_PARTICLE }] },
      { segments: [{ text: '가요.', color: C_BASE }] },
    ],
    fullSentence: '나도 학교에 가요.',
    meanings: {
      en: 'I go to school too.',
      vi: 'Mình cũng đến trường.',
      bn: 'আমিও স্কুলে যাই।',
      zh: '我也去学校。',
      ru: 'Я тоже иду в школу.',
      ja: 'わたしも学校に行きます。',
      mn: 'Би ч бас сургууль руу явна.',
    },
    illustrationSvg: GO_TO_SCHOOL_SCENE_SVG,
  },
  {
    id: 'particle-u11-2',
    badge: '11-2',
    blocks: [
      { segments: [{ text: '친구', color: C_BASE }, { text: '도', color: C_PARTICLE }] },
      { segments: [{ text: '교실', color: C_BASE }, { text: '에서', color: C_PARTICLE }] },
      { segments: [{ text: '공부해요.', color: C_BASE }] },
    ],
    fullSentence: '친구도 교실에서 공부해요.',
    meanings: {
      en: 'My friend studies in the classroom too.',
      vi: 'Bạn mình cũng học bài ở phòng học.',
      bn: 'বন্ধুও শ্রেণিকক্ষে পড়াশোনা করছে।',
      zh: '朋友也在教室里学习。',
      ru: 'Друг тоже учится в классе.',
      ja: '友達も教室で勉強します。',
      mn: 'Найз маань ч бас ангидаа хичээл хийж байна.',
    },
    illustrationSvg: STUDY_IN_CLASS_SCENE_SVG,
  },
  {
    id: 'particle-u11-3',
    badge: '11-3',
    blocks: [
      { segments: [{ text: '아침', color: C_BASE }, { text: '에', color: C_PARTICLE }] },
      { segments: [{ text: '우유', color: C_BASE }, { text: '도', color: C_PARTICLE }] },
      { segments: [{ text: '마셔요.', color: C_BASE }] },
    ],
    fullSentence: '아침에 우유도 마셔요.',
    meanings: {
      en: 'I drink milk in the morning too.',
      vi: 'Buổi sáng mình cũng uống sữa.',
      bn: 'সকালে আমি দুধও খাই।',
      zh: '早上我也喝牛奶。',
      ru: 'Утром я также пью молоко.',
      ja: '朝に牛乳も飲みます。',
      mn: 'Өглөө сүү ч бас уудаг.',
    },
    illustrationSvg: DRINK_MILK_MORNING_SCENE_SVG,
  },
  {
    id: 'particle-u11-4',
    badge: '11-4',
    blocks: [
      { segments: [{ text: '점심', color: C_BASE }, { text: '에', color: C_PARTICLE }] },
      { segments: [{ text: '운동장', color: C_BASE }, { text: '에서', color: C_PARTICLE }] },
      { segments: [{ text: '놀아요.', color: C_BASE }] },
    ],
    fullSentence: '점심에 운동장에서 놀아요.',
    meanings: {
      en: 'We play on the playground at lunchtime.',
      vi: 'Buổi trưa chơi ở sân trường.',
      bn: 'দুপুরে খেলার মাঠে খেলি।',
      zh: '中午在操场上玩。',
      ru: 'В обед играем на спортплощадке.',
      ja: '昼休みに運動場で遊びます。',
      mn: 'Өдөр талбай дээр тоглодог.',
    },
    illustrationSvg: PLAY_PLAYGROUND_SCENE_SVG,
  },
  {
    id: 'particle-u11-5',
    badge: '11-5',
    blocks: [
      { segments: [{ text: '집', color: C_BASE }, { text: '에서', color: C_PARTICLE }] },
      { segments: [{ text: '사과', color: C_BASE }, { text: '도', color: C_PARTICLE }] },
      { segments: [{ text: '먹어요.', color: C_BASE }] },
    ],
    fullSentence: '집에서 사과도 먹어요.',
    meanings: {
      en: 'I eat an apple at home too.',
      vi: 'Ở nhà mình cũng ăn táo.',
      bn: 'বাড়িতে আমি আপেলও খাই।',
      zh: '在家里我也吃苹果。',
      ru: 'Дома я также ем яблоко.',
      ja: '家でりんごも食べます。',
      mn: 'Гэртээ алим ч бас иддэг.',
    },
    illustrationSvg: EAT_APPLE_AT_HOME_SCENE_SVG,
  },
];

// 12단원: 나열·동반 (와, 과, 하고, 이랑, 랑)
export const PARTICLE_UNIT_12_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u12-1',
    badge: '12-1',
    baseNoun: '엄마',
    combinedWord: '엄마하고',
    combinedSegments: [
      { text: '엄마', color: C_BASE },
      { text: '하고', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '엄마하고',
    sentenceSuffix: ' 가요.',
    meanings: { en: 'Mom', vi: 'Mẹ', bn: 'মা', zh: '妈妈', ru: 'Мама', ja: 'お母さん', mn: 'Ээж' },
    illustrationSvg: EOMMA_MOM_SVG,
  },
  {
    id: 'particle-u12-2',
    badge: '12-2',
    baseNoun: '우유',
    combinedWord: '우유와',
    combinedSegments: [
      { text: '우유', color: C_BASE },
      { text: '와', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '우유와',
    sentenceSuffix: ' 빵이에요.',
    meanings: { en: 'Milk', vi: 'Sữa', bn: 'দুধ', zh: '牛奶', ru: 'Молоко', ja: '牛乳', mn: 'Сүү' },
    illustrationSvg: UYU_MILK_SVG,
  },
  {
    id: 'particle-u12-3',
    badge: '12-3',
    baseNoun: '연필',
    combinedWord: '연필이랑',
    combinedSegments: [
      { text: '연필', color: C_BASE },
      { text: '이랑', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '연필이랑',
    sentenceSuffix: ' 지우개.',
    meanings: { en: 'Pencil', vi: 'Bút chì', bn: 'পেন্সিল', zh: '铅笔', ru: 'Карандаш', ja: '鉛筆', mn: 'Харандаа' },
    illustrationSvg: YEONPIL_SVG,
  },
  {
    id: 'particle-u12-4',
    badge: '12-4',
    baseNoun: '책',
    combinedWord: '책과',
    combinedSegments: [
      { text: '책', color: C_BASE },
      { text: '과', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '책과',
    sentenceSuffix: ' 공책.',
    meanings: { en: 'Book', vi: 'Sách', bn: 'বই', zh: '书', ru: 'Книга', ja: '本', mn: 'Ном' },
    illustrationSvg: CHAEK_SVG,
  },
  {
    id: 'particle-u12-5',
    badge: '12-5',
    baseNoun: '친구',
    combinedWord: '친구랑',
    combinedSegments: [
      { text: '친구', color: C_BASE },
      { text: '랑', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '친구랑',
    sentenceSuffix: ' 놀아요.',
    meanings: { en: 'Friend', vi: 'Bạn bè', bn: 'বন্ধু', zh: '朋友', ru: 'Друг', ja: '友達', mn: 'Найз' },
    illustrationSvg: CHINGU_SOCCER_SVG,
  },
];

// 13단원: 방향·수단 (으로, 로)
export const PARTICLE_UNIT_13_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u13-1',
    badge: '13-1',
    baseNoun: '학교',
    combinedWord: '학교로',
    combinedSegments: [
      { text: '학교', color: C_BASE },
      { text: '로', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '학교로',
    sentenceSuffix: ' 가요.',
    meanings: { en: 'School', vi: 'Trường học', bn: 'স্কুল', zh: '学校', ru: 'Школа', ja: '学校', mn: 'Сургууль' },
    illustrationSvg: HAKGYO_BUILDING_SVG,
  },
  {
    id: 'particle-u13-2',
    badge: '13-2',
    baseNoun: '운동장',
    combinedWord: '운동장으로',
    combinedSegments: [
      { text: '운동장', color: C_BASE },
      { text: '으로', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '운동장으로',
    sentenceSuffix: ' 나가요.',
    meanings: { en: 'Playground', vi: 'Sân trường', bn: 'খেলার মাঠ', zh: '操场', ru: 'Спортплощадка', ja: '運動場', mn: 'Талбай' },
    illustrationSvg: UNDONGJANG_SVG,
  },
  {
    id: 'particle-u13-3',
    badge: '13-3',
    baseNoun: '연필',
    combinedWord: '연필로',
    combinedSegments: [
      { text: '연필', color: C_BASE },
      { text: '로', color: C_PARTICLE },
    ],
    sentencePrefix: '공책에 ',
    sentenceHighlight: '연필로',
    sentenceSuffix: ' 또박또박 쓰세요.',
    meanings: { en: 'Pencil (ㄹ rule)', vi: 'Bút chì', bn: 'পেন্সিল', zh: '铅笔', ru: 'Карандаш', ja: '鉛筆', mn: 'Харандаа' },
    illustrationSvg: YEONPIL_SVG,
  },
  {
    id: 'particle-u13-4',
    badge: '13-4',
    baseNoun: '버스',
    combinedWord: '버스로',
    combinedSegments: [
      { text: '버스', color: C_BASE },
      { text: '로', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '버스로',
    sentenceSuffix: ' 가요.',
    meanings: { en: 'Bus', vi: 'Xe buýt', bn: 'বাস', zh: '公交车', ru: 'Автобус', ja: 'バス', mn: 'Автобус' },
    illustrationSvg: BUS_VEHICLE_SVG,
  },
  {
    id: 'particle-u13-5',
    badge: '13-5',
    baseNoun: '숟가락',
    combinedWord: '숟가락으로',
    combinedSegments: [
      { text: '숟가락', color: C_BASE },
      { text: '으로', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '숟가락으로',
    sentenceSuffix: ' 먹어요.',
    meanings: { en: 'Spoon', vi: 'Cái thìa', bn: 'চামচ', zh: '勺子', ru: 'Ложка', ja: 'スプーン', mn: 'Халбага' },
    illustrationSvg: SUTGARAK_SPOON_SVG,
  },
];

// 14단원: 행동 대상 (에게, 한테)
export const PARTICLE_UNIT_14_ITEMS: ParticleColsItem[] = [
  {
    id: 'particle-u14-1',
    badge: '14-1',
    baseNoun: '짝꿍',
    combinedWord: '짝꿍에게',
    combinedSegments: [
      { text: '짝꿍', color: C_BASE },
      { text: '에게', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '짝꿍에게',
    sentenceSuffix: ' 물어요.',
    meanings: { en: 'Partner / Deskmate', vi: 'Bạn cùng bàn', bn: 'সহপাঠী', zh: '同桌', ru: 'Сосед по парте', ja: '隣の友達', mn: 'Ширээний найз' },
    illustrationSvg: JJAKKKUNG_PARTNER_SVG,
  },
  {
    id: 'particle-u14-2',
    badge: '14-2',
    baseNoun: '친구',
    combinedWord: '친구에게',
    combinedSegments: [
      { text: '친구', color: C_BASE },
      { text: '에게', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '친구에게',
    sentenceSuffix: ' 줘요.',
    meanings: { en: 'Friend', vi: 'Bạn bè', bn: 'বন্ধু', zh: '朋友', ru: 'Друг', ja: '友達', mn: 'Найз' },
    illustrationSvg: CHINGU_SOCCER_SVG,
  },
  {
    id: 'particle-u14-3',
    badge: '14-3',
    baseNoun: '동생',
    combinedWord: '동생한테',
    combinedSegments: [
      { text: '동생', color: C_BASE },
      { text: '한테', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '동생한테',
    sentenceSuffix: ' 말해요.',
    meanings: { en: 'Younger sibling', vi: 'Em', bn: 'ছোট ভাই/বোন', zh: '弟弟/妹妹', ru: 'Младший брат/сестра', ja: '弟 / 妹', mn: 'Дүү' },
    illustrationSvg: DONGSAENG_CUTE_SVG,
  },
  {
    id: 'particle-u14-4',
    badge: '14-4',
    baseNoun: '우리',
    combinedWord: '우리한테',
    combinedSegments: [
      { text: '우리', color: C_BASE },
      { text: '한테', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '우리한테',
    sentenceSuffix: ' 주세요.',
    meanings: { en: 'We / Us', vi: 'Chúng mình', bn: 'আমরা', zh: '我们', ru: 'Мы', ja: '私たち', mn: 'Бид' },
    illustrationSvg: URI_PARTICLE_SVG,
  },
  {
    id: 'particle-u14-5',
    badge: '14-5',
    baseNoun: '누구',
    combinedWord: '누구한테',
    combinedSegments: [
      { text: '누구', color: C_BASE },
      { text: '한테', color: C_PARTICLE },
    ],
    sentencePrefix: '',
    sentenceHighlight: '누구한테',
    sentenceSuffix: ' 줘요?',
    meanings: { en: 'To whom', vi: 'Cho ai', bn: 'কাকে', zh: '给谁', ru: 'Кому', ja: '誰に', mn: 'Хэнд' },
    illustrationSvg: NUGU_HANTE_TO_WHOM_SVG,
  },
];

// 15단원: 5행 문장 만들기 4 (와, 과, 하고, 이랑, 랑, 으로, 로, 에게, 한테 - 직전 12·13·14단원 100% 집중 복습)
export const PARTICLE_UNIT_15_ROWS: ParticleRowsItem[] = [
  {
    id: 'particle-u15-1',
    badge: '15-1',
    blocks: [
      { segments: [{ text: '친구', color: C_BASE }, { text: '랑', color: C_PARTICLE }] },
      { segments: [{ text: '운동장', color: C_BASE }, { text: '으로', color: C_PARTICLE }] },
      { segments: [{ text: '가요.', color: C_BASE }] },
    ],
    fullSentence: '친구랑 운동장으로 가요.',
    meanings: {
      en: 'I go to the playground with my friend.',
      vi: 'Mình đi ra sân trường cùng bạn.',
      bn: 'বন্ধুর সাথে খেলার মাঠে যাই।',
      zh: '我和朋友一起去操场。',
      ru: 'Я иду на спортплощадку с другом.',
      ja: '友達と運動場へ行きます。',
      mn: 'Найзтайгаа талбай руу явна.',
    },
    illustrationSvg: FRIEND_TO_PLAYGROUND_SCENE_SVG,
  },
  {
    id: 'particle-u15-2',
    badge: '15-2',
    blocks: [
      { segments: [{ text: '동생', color: C_BASE }, { text: '이랑', color: C_PARTICLE }] },
      { segments: [{ text: '기차', color: C_BASE }, { text: '로', color: C_PARTICLE }] },
      { segments: [{ text: '가요.', color: C_BASE }], staticDisplay: true },
    ],
    fullSentence: '동생이랑 기차로 가요.',
    meanings: {
      en: 'I go by train with my younger sibling.',
      vi: 'Mình đi tàu hỏa cùng với em.',
      bn: 'ছোট ভাই/বোনের সাথে ট্রেনে যাই।',
      zh: '我和弟弟/妹妹坐火车去。',
      ru: 'Я еду на поезде с младшим братом/сестрой.',
      ja: '弟/妹と電車で行きます。',
      mn: 'Дүүтэйгээ галт тэргээр явна.',
    },
    illustrationSvg: SIBLING_BY_TRAIN_SCENE_SVG,
  },
  {
    id: 'particle-u15-3',
    badge: '15-3',
    blocks: [
      { segments: [{ text: '엄마', color: C_BASE }, { text: '하고', color: C_PARTICLE }] },
      { segments: [{ text: '친구', color: C_BASE }, { text: '한테', color: C_PARTICLE }] },
      { segments: [{ text: '가요.', color: C_BASE }], staticDisplay: true },
    ],
    fullSentence: '엄마하고 친구한테 가요.',
    meanings: {
      en: 'I go to my friend with Mom.',
      vi: 'Mình cùng mẹ đi đến nhà bạn.',
      bn: 'মায়ের সাথে বন্ধুর কাছে যাই।',
      zh: '我和妈妈去朋友那里。',
      ru: 'Я иду к другу с мамой.',
      ja: 'お母さんと友達のところへ行きます。',
      mn: 'Ээжтэйгээ найз дээрээ очно.',
    },
    illustrationSvg: WITH_MOM_TO_FRIEND_SCENE_SVG,
  },
  {
    id: 'particle-u15-4',
    badge: '15-4',
    blocks: [
      { segments: [{ text: '친구', color: C_BASE }, { text: '에게', color: C_PARTICLE }] },
      { segments: [{ text: '영어', color: C_BASE }, { text: '로', color: C_PARTICLE }] },
      { segments: [{ text: '말해요.', color: C_BASE }], staticDisplay: true },
    ],
    fullSentence: '친구에게 영어로 말해요.',
    meanings: {
      en: 'I speak in English to my friend.',
      vi: 'Mình nói chuyện với bạn bằng tiếng Anh.',
      bn: 'বন্ধুর সাথে ইংরেজিতে কথা বলি।',
      zh: '我用英语和朋友说话。',
      ru: 'Я говорю с другом по-английски.',
      ja: '友達に英語で話します。',
      mn: 'Найзтайгаа англиар ярьдаг.',
    },
    illustrationSvg: SPEAK_ENGLISH_TO_FRIEND_SCENE_SVG,
  },
  {
    id: 'particle-u15-5',
    badge: '15-5',
    blocks: [
      { segments: [{ text: '책', color: C_BASE }, { text: '과', color: C_PARTICLE }] },
      { segments: [{ text: '공책', color: C_BASE }, { text: '으로', color: C_PARTICLE }] },
      { segments: [{ text: '공부해요.', color: C_BASE }], staticDisplay: true },
    ],
    fullSentence: '책과 공책으로 공부해요.',
    meanings: {
      en: 'I study with a book and a notebook.',
      vi: 'Mình học bài bằng sách và vở.',
      bn: 'বই আর খাতা দিয়ে পড়াশোনা করি।',
      zh: '我用书和笔记本学习。',
      ru: 'Я учусь по книге и тетради.',
      ja: '本とノートで勉強します。',
      mn: 'Ном, дэвтрээр хичээлээ хийдэг.',
    },
    illustrationSvg: STUDY_BOOK_NOTEBOOK_SCENE_SVG,
  },
];

export const PARTICLE_COLS_BY_UNIT: Partial<Record<ParticleUnitId, ParticleColsItem[]>> = {
  unit1: PARTICLE_UNIT_1_ITEMS,
  unit2: PARTICLE_UNIT_2_ITEMS,
  unit4: PARTICLE_UNIT_4_ITEMS,
  unit5: PARTICLE_UNIT_5_ITEMS,
  unit6: PARTICLE_UNIT_6_ITEMS,
  unit8: PARTICLE_UNIT_8_ITEMS,
  unit9: PARTICLE_UNIT_9_ITEMS,
  unit10: PARTICLE_UNIT_10_ITEMS,
  unit12: PARTICLE_UNIT_12_ITEMS,
  unit13: PARTICLE_UNIT_13_ITEMS,
  unit14: PARTICLE_UNIT_14_ITEMS,
  ...PARTICLE_COLS_16_TO_30,
};

export const PARTICLE_ROWS_BY_UNIT: Partial<Record<ParticleUnitId, ParticleRowsItem[]>> = {
  unit3: PARTICLE_UNIT_3_ROWS,
  unit7: PARTICLE_UNIT_7_ROWS,
  unit11: PARTICLE_UNIT_11_ROWS,
  unit15: PARTICLE_UNIT_15_ROWS,
  ...PARTICLE_ROWS_16_TO_30,
};


