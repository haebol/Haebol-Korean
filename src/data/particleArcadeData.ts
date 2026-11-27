export type ParticleGameUnitId =
  | 'unit1'
  | 'unit2'
  | 'sentence1'
  | 'unit3'
  | 'unit4'
  | 'unit5'
  | 'sentence2'
  | 'unit6'
  | 'unit6_2'
  | 'unit7'
  | 'sentence3'
  | 'unit8'
  | 'unit9'
  | 'unit10'
  | 'sentence4'
  | 'unit11'
  | 'unit12'
  | 'unit13'
  | 'sentence5'
  | 'unit14'
  | 'unit15'
  | 'unit16'
  | 'sentence6'
  | 'unit17'
  | 'unit18'
  | 'unit19'
  | 'sentence7'
  | 'unit20'
  | 'unit21'
  | 'sentence8';

export type Unit1Particle = '은' | '는' | '을';
export type Unit2Particle = '이에요' | '예요' | '고';
export type Unit3Particle = '이' | '가' | '을';
export type Unit4Particle = '이' | '가' | '을';
export type Unit5Particle = '을' | '를';
export type Unit6Particle = '에' | '에서' | '께서';
export type Unit7Particle = '도' | '에서' | '이에요';
export type Unit8Particle = '와' | '과' | '하고' | '이랑' | '랑';
export type Unit9Particle = '으로' | '로' | '에게';
export type Unit10Particle = '에게' | '한테' | '로' | '으로';
export type Unit11To13Particle = '부터' | '까지' | '이나' | '나' | '마다';
export type Unit14To16Particle = '만' | '밖에' | '보다';
export type Unit17To19Particle = '처럼' | '같이' | '의' | '끼리';
export type Unit20To21Particle = '께서' | '께' | '아' | '야';
export type ParticleChoice =
  | Unit1Particle
  | Unit2Particle
  | Unit3Particle
  | Unit4Particle
  | Unit5Particle
  | Unit6Particle
  | Unit7Particle
  | Unit8Particle
  | Unit9Particle
  | Unit10Particle
  | Unit11To13Particle
  | Unit14To16Particle
  | Unit17To19Particle
  | Unit20To21Particle;
export type MissKind = 'short' | 'over';
export type GamePhase = 'ready' | 'flying' | 'impact' | 'missed' | 'cleared';
export type ControlMode = 'arcade' | 'easy';
export type FaceMode = 'happy' | 'panic' | 'dizzy' | 'crying' | 'headClutch';

export type Unit1NounId = 'na' | 'chingu' | 'dongsaeng' | 'seonsaengnim' | 'gabang';
export type Unit2NounId = 'haksaeng' | 'yeonpil' | 'chilpan' | 'uija' | 'jiugae';
export type Unit3NounId = 'mul' | 'chaek' | 'yak' | 'bae' | 'binu';
export type Unit4NounId = 'na5' | 'neo5' | 'jeo5' | 'nugu5' | 'igeot5';
export type Unit5NounId = 'bap' | 'son' | 'mueot' | 'uyu' | 'sagwa';
export type Unit6NounId =
  | 'hakgyo'
  | 'jip_e'
  | 'eodi'
  | 'achim'
  | 'jeomsim'
  | 'gyosil'
  | 'undongjang'
  | 'doseogwan'
  | 'eoneunara'
  | 'jip_eseo';
export type Unit7NounId = 'na' | 'chingu' | 'mul' | 'sagwa' | 'usan';
export type Unit8NounId = 'eomma' | 'uyu' | 'yeonpil' | 'chaek' | 'chingu';
export type Unit9NounId = 'hakgyo' | 'undongjang' | 'yeonpil' | 'beoseu' | 'sutgarak';
export type Unit10NounId = 'jjakkkung' | 'chingu' | 'dongsaeng' | 'uri' | 'nugu10';
export type Unit11NounId = 'achim' | 'wolyoil' | 'jeonyeok' | 'hakgyo' | 'eodi';
export type Unit12NounId = 'ppang' | 'mul' | 'chaek' | 'sagwa' | 'beoseu';
export type Unit13NounId = 'nal' | 'achim' | 'jumal' | 'gyosil' | 'saram';
export type Unit14NounId = 'mul' | 'na' | 'hana' | 'oneul' | 'sagwa';
export type Unit15NounId = 'hana' | 'mul' | 'na' | 'sigan' | 'ppang';
export type Unit16NounId = 'hyeong' | 'eoje' | 'beoseu' | 'sagwa' | 'nugu10';
export type Unit17NounId = 'tokki' | 'gureum' | 'chingu' | 'nun' | 'byeol';
export type Unit18NounId = 'chingu' | 'seonsaengnim' | 'na25' | 'neo25' | 'jeo25';
export type Unit19NounId = 'chingu' | 'uri' | 'namja' | 'yeoja' | 'haksaeng';
export type Unit20NounId = 'halmeoni' | 'seonsaengnim' | 'bumonim' | 'halabeoji' | 'eoreun';
export type Unit21NounId = 'minsu' | 'sujin' | 'gangaji' | 'chingu' | 'dongsaeng';
export type SentenceNounId =
  | 'na'
  | 'yeoja'
  | 'haksaeng'
  | 'dongsaeng'
  | 'gabang'
  | 'changmun'
  | 'geurim'
  | 'chingu'
  | 'norae'
  | 'hakgyo'
  | 'achim'
  | 'undongjang'
  | 'sagwa'
  | 'gicha'
  | 'yeongeo'
  | 'gongchaek'
  | 'geumyoil'
  | 'ppang'
  | 'jumal'
  | 'eonje'
  | 'neo23'
  | 'nugu23'
  | 'eoje23'
  | 'sarang'
  | 'tokki'
  | 'halmeoni'
  | 'seonsaengnim'
  | 'bumonim'
  | 'sujin';

export interface ArcadeButtonConfig {
  particle: ParticleChoice;
  idx: number;
  label: string;
  bgHex: string;
  borderHex: string;
  shadowHex: string;
  accentHex: string;
  keyHint: string;
}

export interface Unit1QuestionItem {
  id: Unit1NounId;
  prefix?: string;
  noun: string;
  predicate: string;
  isRedPredicate?: boolean;
  correct: '은' | '는';
  wrongParticleChoice: '은' | '는';
  particleWrongBoardBanner: string;
  particleWrongMsg: string;
  particleWrongSpeech: string;
  eulBoardReplace: string;
  eulBoardBanner: string;
  eulWrongMsg: string;
  eulWrongSpeech: string;
  correctMsg: string;
  correctSpeech: string;
}

export interface Unit2QuestionItem {
  id: Unit2NounId;
  prefix: string;
  noun: string;
  correct: '이에요' | '예요';
  wrongGrammarChoice: '이에요' | '예요';
  grammarWrongBoardBanner: string;
  grammarWrongMsg: string;
  grammarWrongSpeech: string;
  goPunBoardBanner: string;
  goPunMsg: string;
  goPunSpeech: string;
  correctMsg: string;
  correctSpeech: string;
}

export interface Unit34QuestionItem<TId extends string> {
  id: TId;
  prefix?: string;
  noun: string;
  predicate: string;
  isRedPredicate?: boolean;
  correct: '이' | '가';
  wrongSubjectChoice: '이' | '가';
  transformedWord?: string;
  transformedHead?: string;
  transformedTail?: string;
  subjectWrongBoardBanner: string;
  subjectWrongMsg: string;
  subjectWrongSpeech: string;
  eulBoardReplace: string;
  eulBoardBanner: string;
  eulWrongMsg: string;
  eulWrongSpeech: string;
  correctMsg: string;
  correctSpeech: string;
}

export interface Unit5QuestionItem {
  id: Unit5NounId;
  prefix?: string;
  noun: string;
  predicate: string;
  isRedPredicate?: boolean;
  correct: '을' | '를';
  wrongChoice: '을' | '를';
  wrongBoardBanner: string;
  wrongMsg: string;
  wrongSpeech: string;
  correctMsg: string;
  correctSpeech: string;
}

export interface WrongOptionFeedback {
  boardBanner: string;
  wrongMsg: string;
  wrongSpeech: string;
  isSpaceGag?: boolean;
  boardReplace?: string;
}

export interface MultiParticleQuestionItem<TId extends string, P extends ParticleChoice> {
  id: TId;
  prefix?: string;
  noun: string;
  predicate: string;
  isRedPredicate?: boolean;
  correctList: P[];
  transformedWord?: string;
  transformedHead?: string;
  transformedTail?: string;
  wrongFeedback: Record<string, WrongOptionFeedback>;
  correctMsg: string;
  correctSpeech: string;
  correctMsgByChoice?: Partial<Record<P, string>>;
  correctSpeechByChoice?: Partial<Record<P, string>>;
}

export const BTN_PALETTE_YELLOW = { bgHex: '#FFFBEB', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#7E22CE' };
export const BTN_PALETTE_PINK = { bgHex: '#F3E8FF', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#581C87' };
export const BTN_PALETTE_PURPLE = { bgHex: '#FFE4E6', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#9F1239' };
export const BTN_PALETTE_MINT = { bgHex: '#E0F2FE', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#1E3A8A' };
export const BTN_PALETTE_SKY = { bgHex: '#ECFDF5', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#047857' };

export const ARCADE_BUTTONS_U1: ArcadeButtonConfig[] = [
  { particle: '은', idx: 0, label: '은', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '는', idx: 1, label: '는', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '을', idx: 2, label: '을', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U2: ArcadeButtonConfig[] = [
  { particle: '이에요', idx: 0, label: '이에요', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '예요', idx: 1, label: '예요', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '고', idx: 2, label: '고', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U3: ArcadeButtonConfig[] = [
  { particle: '이', idx: 0, label: '이', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '가', idx: 1, label: '가', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '을', idx: 2, label: '을', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U4: ArcadeButtonConfig[] = [
  { particle: '이', idx: 0, label: '이', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '가', idx: 1, label: '가', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '을', idx: 2, label: '을', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U5: ArcadeButtonConfig[] = [
  { particle: '을', idx: 0, label: '을', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '를', idx: 1, label: '를', ...BTN_PALETTE_PINK, keyHint: '2' },
];

export const ARCADE_BUTTONS_U6: ArcadeButtonConfig[] = [
  { particle: '에', idx: 0, label: '에', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '에서', idx: 1, label: '에서', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '께서', idx: 2, label: '께서', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U7: ArcadeButtonConfig[] = [
  { particle: '도', idx: 0, label: '도', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '에서', idx: 1, label: '에서', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '이에요', idx: 2, label: '이에요', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U8: ArcadeButtonConfig[] = [
  { particle: '와', idx: 0, label: '와', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '과', idx: 1, label: '과', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '하고', idx: 2, label: '하고', ...BTN_PALETTE_PURPLE, keyHint: '3' },
  { particle: '이랑', idx: 3, label: '이랑', ...BTN_PALETTE_MINT, keyHint: '4' },
  { particle: '랑', idx: 4, label: '랑', ...BTN_PALETTE_SKY, keyHint: '5' },
];

export const ARCADE_BUTTONS_U9: ArcadeButtonConfig[] = [
  { particle: '으로', idx: 0, label: '으로', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '로', idx: 1, label: '로', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '에게', idx: 2, label: '에게', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U10: ArcadeButtonConfig[] = [
  { particle: '에게', idx: 0, label: '에게', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '한테', idx: 1, label: '한테', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '로', idx: 2, label: '로', ...BTN_PALETTE_PURPLE, keyHint: '3' },
  { particle: '으로', idx: 3, label: '으로', ...BTN_PALETTE_MINT, keyHint: '4' },
];

export const ARCADE_BUTTONS_U11: ArcadeButtonConfig[] = [
  { particle: '부터', idx: 0, label: '부터', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '까지', idx: 1, label: '까지', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '마다', idx: 2, label: '마다', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U12: ArcadeButtonConfig[] = [
  { particle: '이나', idx: 0, label: '이나', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '나', idx: 1, label: '나', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '까지', idx: 2, label: '까지', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U13: ArcadeButtonConfig[] = [
  { particle: '부터', idx: 0, label: '부터', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '까지', idx: 1, label: '까지', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '마다', idx: 2, label: '마다', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U14_TO_16: ArcadeButtonConfig[] = [
  { particle: '만', idx: 0, label: '만', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '밖에', idx: 1, label: '밖에', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '보다', idx: 2, label: '보다', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U17: ArcadeButtonConfig[] = [
  { particle: '처럼', idx: 0, label: '처럼', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '같이', idx: 1, label: '같이', ...BTN_PALETTE_MINT, keyHint: '2' },
  { particle: '의', idx: 2, label: '의', ...BTN_PALETTE_PINK, keyHint: '3' },
  { particle: '끼리', idx: 3, label: '끼리', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

export const ARCADE_BUTTONS_U18: ArcadeButtonConfig[] = [
  { particle: '처럼', idx: 0, label: '처럼', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '의', idx: 1, label: '의', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '끼리', idx: 2, label: '끼리', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U19: ArcadeButtonConfig[] = [
  { particle: '끼리', idx: 0, label: '끼리', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '처럼', idx: 1, label: '처럼', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '의', idx: 2, label: '의', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U20: ArcadeButtonConfig[] = [
  { particle: '께서', idx: 0, label: '께서', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '께', idx: 1, label: '께', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '야', idx: 2, label: '야', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_U21: ArcadeButtonConfig[] = [
  { particle: '아', idx: 0, label: '아', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '야', idx: 1, label: '야', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '께서', idx: 2, label: '께서', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_S1: ArcadeButtonConfig[] = [
  { particle: '은', idx: 0, label: '은', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '는', idx: 1, label: '는', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '이에요', idx: 2, label: '이에요', ...BTN_PALETTE_MINT, keyHint: '3' },
  { particle: '예요', idx: 3, label: '예요', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

export const ARCADE_BUTTONS_S2: ArcadeButtonConfig[] = [
  { particle: '이', idx: 0, label: '이', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '가', idx: 1, label: '가', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '을', idx: 2, label: '을', ...BTN_PALETTE_MINT, keyHint: '3' },
  { particle: '를', idx: 3, label: '를', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

export const ARCADE_BUTTONS_S3: ArcadeButtonConfig[] = [
  { particle: '에', idx: 0, label: '에', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '에서', idx: 1, label: '에서', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '도', idx: 2, label: '도', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_S4: ArcadeButtonConfig[] = [
  { particle: '과', idx: 0, label: '과', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '랑', idx: 1, label: '랑', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '으로', idx: 2, label: '으로', ...BTN_PALETTE_PURPLE, keyHint: '3' },
  { particle: '로', idx: 3, label: '로', ...BTN_PALETTE_MINT, keyHint: '4' },
  { particle: '한테', idx: 4, label: '한테', ...BTN_PALETTE_SKY, keyHint: '5' },
];

export const ARCADE_BUTTONS_S5: ArcadeButtonConfig[] = [
  { particle: '부터', idx: 0, label: '부터', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '까지', idx: 1, label: '까지', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '이나', idx: 2, label: '이나', ...BTN_PALETTE_PURPLE, keyHint: '3' },
  { particle: '나', idx: 3, label: '나', ...BTN_PALETTE_MINT, keyHint: '4' },
  { particle: '마다', idx: 4, label: '마다', ...BTN_PALETTE_SKY, keyHint: '5' },
];

export const ARCADE_BUTTONS_S6: ArcadeButtonConfig[] = [
  { particle: '만', idx: 0, label: '만', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '밖에', idx: 1, label: '밖에', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '보다', idx: 2, label: '보다', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

export const ARCADE_BUTTONS_S7: ArcadeButtonConfig[] = [
  { particle: '의', idx: 0, label: '의', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '을', idx: 1, label: '을', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '끼리', idx: 2, label: '끼리', ...BTN_PALETTE_MINT, keyHint: '3' },
  { particle: '처럼', idx: 3, label: '처럼', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

export const ARCADE_BUTTONS_S8: ArcadeButtonConfig[] = [
  { particle: '께서', idx: 0, label: '께서', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '께', idx: 1, label: '께', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '아', idx: 2, label: '아', ...BTN_PALETTE_MINT, keyHint: '3' },
  { particle: '야', idx: 3, label: '야', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

export const UNIT_1_ITEMS: Unit1QuestionItem[] = [
  {
    id: 'na',
    noun: '나',
    predicate: '학생이에요',
    correct: '는',
    wrongParticleChoice: '은',
    particleWrongBoardBanner: '팅~!! "나은?!" "나"엔 받침이 없잖아!! 💢',
    particleWrongMsg: '문법 땡! "나" 끝엔 받침이 없어서 "은"이 튕겨나가요! 받침이 없으면 "는"이 와야 해요!',
    particleWrongSpeech: '땡! 나에는 받침이 없어서 는이 와야 해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "나을 학생이에요?!" 말이 안 되잖아!! 🚀',
    eulWrongMsg: '비문 개그! "을"은 받침 있는 목적어 짝꿍! 받침도 없고 "학생이에요" 앞이라 내가 우주로 날아갔어요!',
    eulWrongSpeech: '으악! 나를 어디로 던지는 거야!',
    correctMsg: '🎉 정답! "나" 끝에 받침이 없어서 👉 "는"이 정답! (나는 학생이에요.)',
    correctSpeech: '정답! 나는 학생이에요!',
  },
  {
    id: 'chingu',
    noun: '친구',
    predicate: '축구를 해요',
    correct: '는',
    wrongParticleChoice: '은',
    particleWrongBoardBanner: '팅~!! "친구은?!" 받침이 없는데 "은"이 왜 와?! 💢',
    particleWrongMsg: '문법 땡! "친구" 끝 글자 "구"에 받침이 없어요! 받침이 없을 때는 "는"이 와야 해요!',
    particleWrongSpeech: '땡! 친구에는 받침이 없어서 는이 와야 해요!',
    eulBoardReplace: '축구공 뻥!',
    eulBoardBanner: '휘이잉~!! "친구를 축구를 해요?!" "을/를"이 두 번이잖아!! 🚀',
    eulWrongMsg: '비문 개그! 이미 "축구를"이 있는데 "친구를"까지 붙이면 비문! 친구가 축구공이랑 같이 날아갔어요!',
    eulWrongSpeech: '어?! 친구를 축구공처럼 차버렸어!',
    correctMsg: '🎉 정답! "친구" 끝에 받침이 없어서 👉 "는"이 정답! (친구는 축구를 해요.)',
    correctSpeech: '정답! 친구는 축구를 해요!',
  },
  {
    id: 'dongsaeng',
    noun: '동생',
    predicate: '귀여워요',
    correct: '은',
    wrongParticleChoice: '는',
    particleWrongBoardBanner: '팅~!! "동생는?!" 받침 ㅇ 안 보여?! 💢',
    particleWrongMsg: '받침 ㅇ 방어막! "동생" 끝 글자 "생"에 ㅇ 받침이 있어서 "는"이 튕겨나가요!',
    particleWrongSpeech: '땡! 동생 끝엔 받침 이응이 있어서 은이 와야 해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "동생을 귀여워요?!" 형용사에 "을"은 비문!! 🚀',
    eulWrongMsg: '"을"은 행동(동사) 목적어 짝꿍! "귀여워요"는 상태(형용사)라서 동생이 우주로 날아가버렸어요!',
    eulWrongSpeech: '어? 동생을 어디로 던진 거야?!',
    correctMsg: '🎉 정답! "동생" 끝에 받침 ㅇ이 있어서 👉 "은"이 정답! (동생은 귀여워요.)',
    correctSpeech: '정답! 동생은 귀여워요!',
  },
  {
    id: 'seonsaengnim',
    noun: '선생님',
    predicate: '친절해요',
    correct: '은',
    wrongParticleChoice: '는',
    particleWrongBoardBanner: '팅~!! "선생님는?!" 받침 ㅁ 방어막!! 💢',
    particleWrongMsg: '받침 ㅁ 방어막! "선생님" 끝 글자 "님"에 ㅁ 받침이 있어서 "는"이 튕겨나가요!',
    particleWrongSpeech: '땡! 선생님 끝엔 받침 미음이 있어서 은이 와야 해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "선생님을 친절해요?!" 비문이라 우주 발사!! 🚀',
    eulWrongMsg: '"을"은 행동(동사) 목적어 짝꿍! "친절해요"는 상태(형용사)라서 선생님이 우주로 날아가버렸어요!',
    eulWrongSpeech: '으악! 선생님을 어디로 보낸 거야?!',
    correctMsg: '🎉 정답! "선생님" 끝에 받침 ㅁ이 있어서 👉 "은"이 정답! (선생님은 친절해요.)',
    correctSpeech: '정답! 선생님은 친절해요!',
  },
  {
    id: 'gabang',
    prefix: '새',
    noun: '가방',
    predicate: '아주 예뻐요',
    correct: '은',
    wrongParticleChoice: '는',
    particleWrongBoardBanner: '팅~!! "가방는?? 받침 ㅇ 안 보여?!" 💢',
    particleWrongMsg: '받침 ㅇ 방어막! "가방" 끝엔 ㅇ 받침이 있어서 "는"이 튕겨나가요!',
    particleWrongSpeech: '땡! 받침 이응에 튕겨나갔다!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "가방을 예뻐요? 무슨 말이야!" 🚀',
    eulWrongMsg: '"을"은 행동(동사) 짝꿍! "아주 예뻐요"는 상태(형용사)라서 "을"을 못 써요!',
    eulWrongSpeech: '어? 가방을 어디로 던진 거야?!',
    correctMsg: '🔥 보스 호응 정답! "새 가방" 받침 ㅇ + 형용사 "아주 예뻐요" 👉 "은"! (새 가방은 아주 예뻐요.)',
    correctSpeech: '새 가방은 아주 예뻐요!',
  },
];

export const UNIT_2_ITEMS: Unit2QuestionItem[] = [
  {
    id: 'haksaeng',
    prefix: '저는',
    noun: '학생',
    correct: '이에요',
    wrongGrammarChoice: '예요',
    grammarWrongBoardBanner: '팅~!! "학생"에 받침 ㅇ 있잖아!! 💢',
    grammarWrongMsg: '문법 땡! "학생" 끝 글자 "생"에 받침 ㅇ이 있어서 "예요"가 아니라 "이에요"가 와야 해요!',
    grammarWrongSpeech: '땡! 학생 끝엔 받침 이응이 있어서 이에요가 와야 해요!',
    goPunBoardBanner: '학생고?! 학생 GO!! 학원 가라 GO!! 🏃💨',
    goPunMsg: '말장난 개그 발동! "학생고?!" 👉 영어 GO! 인 줄 알고 학생이 책가방 메고 학원으로 달려갔어요!!',
    goPunSpeech: '학생고?! 학생 고! 학원으로 가라고?!',
    correctMsg: '🎉 정답! "학생" 끝에 받침 ㅇ이 있어서 👉 "이에요"가 정답! (저는 학생이에요.)',
    correctSpeech: '정답! 저는 학생이에요!',
  },
  {
    id: 'yeonpil',
    prefix: '이것은',
    noun: '연필',
    correct: '이에요',
    wrongGrammarChoice: '예요',
    grammarWrongBoardBanner: '팅~!! "연필"에 받침 ㄹ 안 보여?! 💢',
    grammarWrongMsg: '문법 땡! "연필" 끝 글자 "필"에 받침 ㄹ이 있어서 "예요"는 못 붙고 "이에요"가 와야 해요!',
    grammarWrongSpeech: '땡! 연필 끝엔 받침 리을이 있어서 이에요가 와야 해요!',
    goPunBoardBanner: '연필고?! 연필 GO!! 시험지로 돌격 GO!! 🚀✏️',
    goPunMsg: '말장난 개그 발동! "연필고?!" 👉 연필 로켓 GO! 시험지 풀러 우주로 날아가 버렸어요!!',
    goPunSpeech: '연필고?! 연필 고! 시험지로 돌격하라 고!',
    correctMsg: '🎉 정답! "연필" 끝에 받침 ㄹ이 있어서 👉 "이에요"가 정답! (이것은 연필이에요.)',
    correctSpeech: '정답! 이것은 연필이에요!',
  },
  {
    id: 'chilpan',
    prefix: '저것은',
    noun: '칠판',
    correct: '이에요',
    wrongGrammarChoice: '예요',
    grammarWrongBoardBanner: '팅~!! "칠판"에 받침 ㄴ 있잖아!! 💢',
    grammarWrongMsg: '문법 땡! "칠판" 끝 글자 "판"에 받침 ㄴ이 있어서 "예요"가 아니라 "이에요"가 와야 해요!',
    grammarWrongSpeech: '땡! 칠판 끝엔 받침 니은이 있어서 이에요가 와야 해요!',
    goPunBoardBanner: '칠판고?! 칠판 GO!! 바퀴 달고 복도로 GO!! 🛹',
    goPunMsg: '말장난 개그 발동! "칠판고?!" 👉 "가라 GO!" 인 줄 알고 칠판이 스케이트보드 타고 복도로 탈주했어요!!',
    goPunSpeech: '칠판고?! 칠판 고! 바퀴 달고 복도로 가라고?!',
    correctMsg: '🎉 정답! "칠판" 끝에 받침 ㄴ이 있어서 👉 "이에요"가 정답! (저것은 칠판이에요.)',
    correctSpeech: '정답! 저것은 칠판이에요!',
  },
  {
    id: 'uija',
    prefix: '이것은',
    noun: '의자',
    correct: '예요',
    wrongGrammarChoice: '이에요',
    grammarWrongBoardBanner: '쿵~!! 받침 없는데 "이"가 왜 와?! 💢',
    grammarWrongMsg: '문법 땡! "의자" 끝 글자 "자"에는 받침이 없어요! 받침이 없을 때는 "이에요"가 아니라 "예요"가 와야 해요!',
    grammarWrongSpeech: '땡! 의자에는 받침이 없어서 예요가 와야 해요!',
    goPunBoardBanner: '의자고?! 의자 GO!! 의자 레이싱 출발 GO!! 🏎️🪑',
    goPunMsg: '말장난 개그 발동! "의자고?!" 👉 바퀴 의자 레이싱 GO! 깃발 휘날리며 붕붕 출발해 버렸어요!!',
    goPunSpeech: '의자고?! 의자 고! 의자 레이싱 출발 고!',
    correctMsg: '🎉 정답! "의자" 끝에 받침이 없어서 👉 "예요"가 정답! (이것은 의자예요.)',
    correctSpeech: '정답! 이것은 의자예요!',
  },
  {
    id: 'jiugae',
    prefix: '이것은 내',
    noun: '지우개',
    correct: '예요',
    wrongGrammarChoice: '이에요',
    grammarWrongBoardBanner: '쿵~!! "지우개"엔 받침이 없잖아!! 💢',
    grammarWrongMsg: '문법 땡! "지우개" 끝 글자 "개"에는 받침이 없어요! 받침이 없을 때는 "예요"가 정답이에요!',
    grammarWrongSpeech: '땡! 지우개에는 받침이 없어서 예요가 와야 해요!',
    goPunBoardBanner: '지우개고?! 지우개 GO!! 다 지우러 출발 GO!! 🧹✨',
    goPunMsg: '말장난 개그 발동! "지우개고?!" 👉 청소 특공대 GO! 지우개가 화면을 쓱쓱 지우러 달려갔어요!!',
    goPunSpeech: '지우개고?! 지우개 고! 글씨 다 지우러 출발 고!',
    correctMsg: '🔥 보스 호응 정답! "지우개" 받침 없음 + 문장 끝 👉 "예요"! (이것은 내 지우개예요.)',
    correctSpeech: '이것은 내 지우개예요!',
  },
];

// 3단원 (학습지 4쪽: 주격 이/가)
export const UNIT_3_ITEMS: Unit34QuestionItem<Unit3NounId>[] = [
  {
    id: 'mul',
    noun: '물',
    predicate: '있어요',
    correct: '이',
    wrongSubjectChoice: '가',
    subjectWrongBoardBanner: '팅~!! "물가?!" 물가가 비싸서 튕겼나?! 💢',
    subjectWrongMsg: '받침 ㄹ 방어막! "물" 끝엔 ㄹ 받침이 있어서 "가"가 아니라 "이"가 와야 해요! ("물가"는 비문!)',
    subjectWrongSpeech: '땡! 물 끝엔 받침 리을이 있어서 이가 와야 해요!',
    eulBoardReplace: '쏟아버렷!',
    eulBoardBanner: '휘이잉~!! "물을 있어요?!" "있어요" 앞에 "을"은 비문!! 🚀',
    eulWrongMsg: '비문 개그! "있어요"는 존재를 말하는 말이라 목적격 "을"을 쓰면 물컵이 우주로 날아가버려요!',
    eulWrongSpeech: '으악! 물컵이 우주로 날아가 버렸어!',
    correctMsg: '🎉 정답! "물" 끝에 받침 ㄹ이 있어서 👉 "이"가 정답! (물이 있어요.)',
    correctSpeech: '정답! 물이 있어요!',
  },
  {
    id: 'chaek',
    noun: '책',
    predicate: '좋아요',
    correct: '이',
    wrongSubjectChoice: '가',
    subjectWrongBoardBanner: '팅~!! "책가?!" 책에 ㄱ 받침 안 보여?! 💢',
    subjectWrongMsg: '받침 ㄱ 방어막! "책" 끝엔 ㄱ 받침이 있어서 "가"가 튕겨나가요! 받침이 있으면 "이"가 정답이에요!',
    subjectWrongSpeech: '땡! 책 끝엔 받침 기역이 있어서 이가 와야 해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "책을 좋아요?!" 말이 안 되잖아!! 🚀',
    eulWrongMsg: '비문 개그! "좋아요"는 상태(형용사)라서 "을"을 못 붙여요! 책이 우주로 날아가 버렸어요!',
    eulWrongSpeech: '어? 책이 하늘로 날아가 버렸어!',
    correctMsg: '🎉 정답! "책" 끝에 받침 ㄱ이 있어서 👉 "이"가 정답! (책이 좋아요.)',
    correctSpeech: '정답! 책이 좋아요!',
  },
  {
    id: 'yak',
    noun: '약',
    predicate: '싫어요',
    correct: '이',
    wrongSubjectChoice: '가',
    subjectWrongBoardBanner: '팅~!! "약가?!" ㄱ 받침 방어막 발동!! 💢',
    subjectWrongMsg: '받침 ㄱ 방어막! "약" 끝엔 ㄱ 받침이 있어서 "가"는 못 붙고 "이"가 와야 해요!',
    subjectWrongSpeech: '땡! 약 끝엔 받침 기역이 있어서 이가 와야 해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "약을 싫어요?!" 비문이라 약봉지가 우주 발사!! 🚀',
    eulWrongMsg: '비문 개그! "싫어요"는 상태(형용사)라서 "을"은 비문! 약봉지가 로켓처럼 우주로 날아갔어요!',
    eulWrongSpeech: '으악! 약봉지가 날아간다!',
    correctMsg: '🎉 정답! "약" 끝에 받침 ㄱ이 있어서 👉 "이"가 정답! (약이 싫어요.)',
    correctSpeech: '정답! 약이 싫어요!',
  },
  {
    id: 'bae',
    noun: '배',
    predicate: '아파요',
    correct: '가',
    wrongSubjectChoice: '이',
    subjectWrongBoardBanner: '팅~!! "배이?!" 받침이 없는데 "이"가 왜 와?! 💢',
    subjectWrongMsg: '문법 땡! "배"에는 받침이 없어요! 받침이 없을 때는 "이"가 아니라 "가"가 와야 해요!',
    subjectWrongSpeech: '땡! 배에는 받침이 없어서 가가 와야 해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "배을 아파요?!" 받침도 없고 형용사라 비문!! 🚀',
    eulWrongMsg: '비문 개그! 받침도 없고 "아파요"는 형용사라 "을"이 올 수 없어요!',
    eulWrongSpeech: '으악! 배을 아파요가 뭐야!',
    correctMsg: '🎉 정답! "배" 끝에 받침이 없어서 👉 "가"가 정답! (배가 아파요.)',
    correctSpeech: '정답! 배가 아파요!',
  },
  {
    id: 'binu',
    prefix: '욕실에',
    noun: '비누',
    predicate: '있어요',
    correct: '가',
    wrongSubjectChoice: '이',
    subjectWrongBoardBanner: '팅~!! "비누이?!" 받침이 없잖아!! 💢',
    subjectWrongMsg: '문법 땡! "비누" 끝 글자 "누"에는 받침이 없어요! 받침이 없을 때는 "가"가 정답이에요!',
    subjectWrongSpeech: '땡! 비누에는 받침이 없어서 가가 와야 해요!',
    eulBoardReplace: '미끌~ 발사!',
    eulBoardBanner: '휘이잉~!! "비누을 있어요?!" 비누가 미끄러져 날아갔어요!! 🚀',
    eulWrongMsg: '비문 개그! 존재 서술어 "있어요" 앞엔 목적격 "을" 불가! 받침 없는 주어 "가"가 정답!',
    eulWrongSpeech: '으악! 비누가 미끄러져 날아가 버렸어!',
    correctMsg: '🔥 보스 호응 정답! "욕실에 비누" + 존재 "있어요" 👉 "가"! (욕실에 비누가 있어요.)',
    correctSpeech: '욕실에 비누가 있어요!',
  },
];

// 4단원 (학습지 5쪽: 주격 ★ 변화형 - 내가, 네가, 제가, 누가, 이게)
export const UNIT_4_ITEMS: Unit34QuestionItem<Unit4NounId>[] = [
  {
    id: 'na5',
    noun: '나',
    predicate: '할게',
    correct: '가',
    wrongSubjectChoice: '이',
    transformedWord: '내가',
    transformedHead: '내',
    transformedTail: '가',
    subjectWrongBoardBanner: '팅~!! "나이 할게?!" 몇 살이에요?! 💢',
    subjectWrongMsg: '문법 땡! "나"엔 받침이 없고, "나 + 가"가 만나면 ★ "내가"로 변신해요!',
    subjectWrongSpeech: '땡! 나 더하기 가는 내가로 변신해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "나을 할게?!" 말도 안 되는 비문!! 🚀',
    eulWrongMsg: '비문 개그! "나"에는 받침도 없고, 주어 자리라 "을"을 쓰면 안 돼요!',
    eulWrongSpeech: '어? 나를 어디로 던지는 거야!',
    correctMsg: '★ 변신 성공! "나" + "가" 👉 "내가"로 변신해요! (내가 할게.)',
    correctSpeech: '정답! 나 더하기 가는 내가! 내가 할게!',
  },
  {
    id: 'neo5',
    noun: '너',
    predicate: '해 봐',
    correct: '가',
    wrongSubjectChoice: '이',
    transformedWord: '네가',
    transformedHead: '네',
    transformedTail: '가',
    subjectWrongBoardBanner: '팅~!! "너이?!" 받침이 없잖아!! 💢',
    subjectWrongMsg: '문법 땡! "너"엔 받침이 없고, "너 + 가"가 만나면 ★ "네가"로 변신해요!',
    subjectWrongSpeech: '땡! 너 더하기 가는 네가로 변신해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "너을 해 봐?!" 비문 우주 발사!! 🚀',
    eulWrongMsg: '비문 개그! "너"에는 받침도 없고 주어 자리라서 "을"은 절대 비문이에요!',
    eulWrongSpeech: '으악! 너을 해 봐가 무슨 말이야!',
    correctMsg: '★ 변신 성공! "너" + "가" 👉 "네가"로 변신해요! (네가 해 봐.)',
    correctSpeech: '정답! 너 더하기 가는 네가! 네가 해 봐!',
  },
  {
    id: 'jeo5',
    noun: '저',
    predicate: '할게요',
    correct: '가',
    wrongSubjectChoice: '이',
    transformedWord: '제가',
    transformedHead: '제',
    transformedTail: '가',
    subjectWrongBoardBanner: '팅~!! "저이 할게요?!" 받침 X!! 💢',
    subjectWrongMsg: '문법 땡! "저"엔 받침이 없고, "저 + 가"가 만나면 ★ "제가"로 변신해요!',
    subjectWrongSpeech: '땡! 저 더하기 가는 제가로 변신해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "저을 할게요?!" 말이 안 돼요!! 🚀',
    eulWrongMsg: '비문 개그! "저"에는 받침도 없고 주어 자리라 "을"을 붙이면 비문이에요!',
    eulWrongSpeech: '으악! 저을 할게요가 뭐야!',
    correctMsg: '★ 변신 성공! "저" + "가" 👉 "제가"로 변신해요! (제가 할게요.)',
    correctSpeech: '정답! 저 더하기 가는 제가! 제가 할게요!',
  },
  {
    id: 'nugu5',
    noun: '누구',
    predicate: '왔어요?',
    correct: '가',
    wrongSubjectChoice: '이',
    transformedWord: '누가',
    transformedHead: '누',
    transformedTail: '가',
    subjectWrongBoardBanner: '팅~!! "누구이 왔어요?!" 받침이 없잖아!! 💢',
    subjectWrongMsg: '문법 땡! "누구" 끝엔 받침이 없고, "누구 + 가"가 만나면 ★ "누가"로 줄어들어요!',
    subjectWrongSpeech: '땡! 누구 더하기 가는 누가로 변신해요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "누구을 왔어요?!" 비문 발사!! 🚀',
    eulWrongMsg: '비문 개그! "왔어요?"의 주어 자리이고 받침도 없어서 "을"은 비문이에요!',
    eulWrongSpeech: '으악! 누구을 왔어요가 무슨 말이야!',
    correctMsg: '★ 변신 성공! "누구" + "가" 👉 "누가"로 변신해요! (누가 왔어요?)',
    correctSpeech: '정답! 누구 더하기 가는 누가! 누가 왔어요?',
  },
  {
    id: 'igeot5',
    noun: '이것',
    predicate: '뭐예요?',
    correct: '이',
    wrongSubjectChoice: '가',
    transformedWord: '이게',
    transformedHead: '이',
    transformedTail: '게',
    subjectWrongBoardBanner: '팅~!! "이것가?!" ㅅ 받침 안 보여?! 💢',
    subjectWrongMsg: '받침 ㅅ 방어막! "이것" 끝엔 ㅅ 받침이 있어서 "가"는 불가! "이것 + 이"는 ★ "이게"로 줄여 말해요!',
    subjectWrongSpeech: '땡! 이것 끝엔 받침 시옷이 있어서 이가 붙어 이게가 돼요!',
    eulBoardReplace: '던져버렷!',
    eulBoardBanner: '휘이잉~!! "이것을 뭐예요?!" "뭐예요?" 앞엔 "을" 불가!! 🚀',
    eulWrongMsg: '비문 개그! "뭐예요?" 앞에 목적격 "을"을 쓰면 비문이에요! 상자가 날아가 버렸어요!',
    eulWrongSpeech: '으악! 이것을 뭐예요가 무슨 말이야!',
    correctMsg: '★ 변신 성공! "이것" + "이" 👉 말할 땐 "이게"로 변신해요! (이게 뭐예요?)',
    correctSpeech: '정답! 이것 더하기 이는 이게! 이게 뭐예요?',
  },
];

// 5단원 (학습지 6쪽: 목적어 을/를)
export const UNIT_5_ITEMS: Unit5QuestionItem[] = [
  {
    id: 'bap',
    noun: '밥',
    predicate: '먹어요',
    correct: '을',
    wrongChoice: '를',
    wrongBoardBanner: '팅~!! "밥를?!" ㅂ 받침 안 보여?! 💢',
    wrongMsg: '받침 ㅂ 방어막! "밥" 끝엔 ㅂ 받침이 있어서 "를"이 튕겨나가요! 받침이 있으면 "을"이 정답이에요!',
    wrongSpeech: '땡! 밥 끝엔 받침 비읍이 있어서 을이 와야 해요!',
    correctMsg: '🎉 정답! "밥" 끝에 받침 ㅂ이 있어서 👉 "을"이 정답! (밥을 먹어요.)',
    correctSpeech: '정답! 밥을 먹어요!',
  },
  {
    id: 'son',
    noun: '손',
    predicate: '씻어요',
    correct: '을',
    wrongChoice: '를',
    wrongBoardBanner: '팅~!! "손를?!" ㄴ 받침 방어막!! 💢',
    wrongMsg: '받침 ㄴ 방어막! "손" 끝엔 ㄴ 받침이 있어서 "를"이 튕겨나가요! 받침이 있으면 "을"이 와야 해요!',
    wrongSpeech: '땡! 손 끝엔 받침 니은이 있어서 을이 와야 해요!',
    correctMsg: '🎉 정답! "손" 끝에 받침 ㄴ이 있어서 👉 "을"이 정답! (손을 씻어요.)',
    correctSpeech: '정답! 손을 씻어요!',
  },
  {
    id: 'mueot',
    noun: '무엇',
    predicate: '먹어요?',
    correct: '을',
    wrongChoice: '를',
    wrongBoardBanner: '팅~!! "무엇를?!" ㅅ 받침 있잖아!! 💢',
    wrongMsg: '받침 ㅅ 방어막! "무엇" 끝 글자 "엇"에 ㅅ 받침이 있어서 "를"은 못 붙고 "을"이 와야 해요!',
    wrongSpeech: '땡! 무엇 끝엔 받침 시옷이 있어서 을이 와야 해요!',
    correctMsg: '🎉 정답! "무엇" 끝에 받침 ㅅ이 있어서 👉 "을"이 정답! (무엇을 먹어요?)',
    correctSpeech: '정답! 무엇을 먹어요?',
  },
  {
    id: 'uyu',
    noun: '우유',
    predicate: '마셔요',
    correct: '를',
    wrongChoice: '을',
    wrongBoardBanner: '팅~!! "우유을?!" 받침이 없잖아!! 💢',
    wrongMsg: '문법 땡! "우유" 끝 글자 "유"에 받침이 없어요! 받침이 없을 때는 "을"이 아니라 "를"이 와야 해요!',
    wrongSpeech: '땡! 우유에는 받침이 없어서 를이 와야 해요!',
    correctMsg: '🎉 정답! "우유" 끝에 받침이 없어서 👉 "를"이 정답! (우유를 마셔요.)',
    correctSpeech: '정답! 우유를 마셔요!',
  },
  {
    id: 'sagwa',
    noun: '사과',
    predicate: '주세요',
    correct: '를',
    wrongChoice: '을',
    wrongBoardBanner: '팅~!! "사과을?!" 받침이 없는데 왜 "을"?! 💢',
    wrongMsg: '문법 땡! "사과" 끝 글자 "과"에 받침이 없어요! 받침이 없을 때는 "를"이 정답이에요!',
    wrongSpeech: '땡! 사과에는 받침이 없어서 를이 와야 해요!',
    correctMsg: '🔥 보스 호응 정답! 목적어 "사과" 받침 없음 + "주세요" 👉 "를"! (사과를 주세요.)',
    correctSpeech: '사과를 주세요!',
  },
];

// 6단원 (학습지 8·9쪽 통합: 에 & 에서 랜덤 5문제 출제) - 보기: 에, 에서, 께서
export const UNIT_6_E_POOL: MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[] = [
  {
    id: 'hakgyo',
    noun: '학교',
    predicate: '가요',
    correctList: ['에'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "학교에서 가요?!" 가는 목적지엔 "에"!! 💢',
        wrongMsg: '문법 땡! 어디를 향해 "가요"라고 목적지를 말할 때는 출발지 "에서"가 아니라 방향 조사 "에"가 와야 해요!',
        wrongSpeech: '땡! 학교에 가요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "학교님께서" 직접 걸어가신다?! 🚀',
        wrongMsg: '비문 개그! "께서"는 높이는 분에게만 쓰는 말! 학교가 발 달고 우주로 걸어가 버렸어요!',
        wrongSpeech: '어? 학교님께서 어디로 가시는 거예요!',
        isSpaceGag: true,
        boardReplace: '학교 행진!',
      },
    },
    correctMsg: '🎉 정답! 가는 목적지 "학교" 뒤에는 👉 "에"가 정답! (학교에 가요.)',
    correctSpeech: '정답! 학교에 가요!',
  },
  {
    id: 'jip_e',
    noun: '집',
    predicate: '있어요',
    correctList: ['에'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "집에서 있어요?!" 상태 "있어요" 앞엔 "에"!! 💢',
        wrongMsg: '문법 땡! 행동하는 게 아니라 단순히 어디에 "있어요"라고 존재를 말할 때는 "에"가 와야 해요!',
        wrongSpeech: '땡! 집에 있어요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "집님께서" 방에 계신다고?! 🚀',
        wrongMsg: '비문 개그! 집은 높일 사람이 아니에요! "집께서"라고 했더니 집이 통째로 우주로 날아가 버렸어요!',
        wrongSpeech: '으악! 집이 우주로 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '집 탈출!',
      },
    },
    correctMsg: '🎉 정답! 있는 장소 "집" 뒤에는 👉 "에"가 정답! (집에 있어요.)',
    correctSpeech: '정답! 집에 있어요!',
  },
  {
    id: 'eodi',
    noun: '어디',
    predicate: '가요?',
    correctList: ['에'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "어디에서 가요?!" 목적지 질문엔 "에"!! 💢',
        wrongMsg: '문법 땡! 어디로 가는지 목적지를 물어볼 때는 "어디에서"가 아니라 "어디에 가요?"가 맞아요!',
        wrongSpeech: '땡! 어디에 가요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "어디님께서" 가세요?! 🚀',
        wrongMsg: '비문 개그! 장소 "어디"에 "께서"를 붙이면 말이 안 돼요! 방향 표지판이 우주로 날아갔어요!',
        wrongSpeech: '으악! 표지판이 어디로 날아가는 거야!',
        isSpaceGag: true,
        boardReplace: '표지판 슝~',
      },
    },
    correctMsg: '🎉 정답! 가는 곳 "어디" 뒤에는 👉 "에"가 정답! (어디에 가요?)',
    correctSpeech: '정답! 어디에 가요?',
  },
  {
    id: 'achim',
    noun: '아침',
    predicate: '일어나요',
    correctList: ['에'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "아침에서 일어나요?!" 시간이 장소니?! 💢',
        wrongMsg: '문법 땡! "아침"은 장소가 아니라 시간이에요! 시간 뒤에는 "에서"가 아니라 "에"가 와야 해요!',
        wrongSpeech: '땡! 아침은 시간이라서 에가 와야 해요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "아침님께서" 직접 기상하신다!! 🚀',
        wrongMsg: '비문 개그! "아침"은 사람이 아니라서 "께서"를 못 붙여요! 알람 시계가 우주로 발사됐어요!',
        wrongSpeech: '따르릉! 알람 시계가 우주로 날아갔다!',
        isSpaceGag: true,
        boardReplace: '알람 발사!',
      },
    },
    correctMsg: '🎉 정답! 시간 "아침" 뒤에는 👉 "에"가 정답! (아침에 일어나요.)',
    correctSpeech: '정답! 아침에 일어나요!',
  },
  {
    id: 'jeomsim',
    noun: '점심',
    predicate: '먹어요',
    correctList: ['에'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "점심에서 먹어요?!" 점심이 식당이니?! 💢',
        wrongMsg: '문법 땡! "점심"은 시간이에요! 시간 뒤에는 장소 조사 "에서"가 아니라 시간 조사 "에"가 와야 해요!',
        wrongSpeech: '땡! 점심 시간 뒤에는 에가 와야 해요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "점심님께서" 식사를 하신다?! 🚀',
        wrongMsg: '비문 개그! 점심은 시간이니까 "께서"를 붙이면 비문! 도시락이 우주로 날아가 버렸어요!',
        wrongSpeech: '으악! 내 도시락이 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '도시락 슝!',
      },
    },
    correctMsg: '🎉 정답! 시간 "점심" 뒤에는 👉 "에"가 정답! (점심에 먹어요.)',
    correctSpeech: '정답! 점심에 먹어요!',
  },
];

export const UNIT_6_ESEO_POOL: MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[] = [
  {
    id: 'gyosil',
    noun: '교실',
    predicate: '공부해요',
    correctList: ['에서'],
    wrongFeedback: {
      에: {
        boardBanner: '팅~!! "교실에 공부해요?!" 공부하는 행동 장소는 "에서"!! 💢',
        wrongMsg: '문법 땡! 단순히 있는 게 아니라 "공부해요"처럼 행동이 일어나는 장소 뒤에는 "에서"가 와야 해요!',
        wrongSpeech: '땡! 교실에서 공부해요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "교실님께서" 열공 중이시다?! 🚀',
        wrongMsg: '비문 개그! 교실이 학생인 줄 알고 책을 펴다가 우주로 날아가 버렸어요! 행동 장소에는 "에서"!',
        wrongSpeech: '어? 교실이 책 펴고 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '교실 열공!',
      },
    },
    correctMsg: '🎉 정답! 공부하는 행동 장소 "교실" 뒤에는 👉 "에서"가 정답! (교실에서 공부해요.)',
    correctSpeech: '정답! 교실에서 공부해요!',
  },
  {
    id: 'undongjang',
    noun: '운동장',
    predicate: '놀아요',
    correctList: ['에서'],
    wrongFeedback: {
      에: {
        boardBanner: '팅~!! "운동장에 놀아요?!" 신나게 노는 행동은 "에서"!! 💢',
        wrongMsg: '문법 땡! "놀아요"처럼 동작이 벌어지는 장소 뒤에는 "에"가 아니라 "에서"가 정답이에요!',
        wrongSpeech: '땡! 운동장에서 놀아요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "운동장님께서" 축구하신다?! 🚀',
        wrongMsg: '비문 개그! 운동장이 사람인 줄 알고 골대랑 같이 우주로 달려가 버렸어요! 장소에는 "에서"!',
        wrongSpeech: '으악! 운동장 골대가 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '골대 질주!',
      },
    },
    correctMsg: '🎉 정답! 노는 행동 장소 "운동장" 뒤에는 👉 "에서"가 정답! (운동장에서 놀아요.)',
    correctSpeech: '정답! 운동장에서 놀아요!',
  },
  {
    id: 'doseogwan',
    noun: '도서관',
    predicate: '읽어요',
    correctList: ['에서'],
    wrongFeedback: {
      에: {
        boardBanner: '팅~!! "도서관에 읽어요?!" 책 읽는 행동 장소는 "에서"!! 💢',
        wrongMsg: '문법 땡! 책을 "읽어요"처럼 행동이 일어나는 장소 뒤에는 "에"가 아니라 "에서"가 와야 해요!',
        wrongSpeech: '땡! 도서관에서 읽어요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "도서관님께서" 독서 중이시다?! 🚀',
        wrongMsg: '비문 개그! 도서관 건물이 독서왕이 되어 책이랑 우주로 날아가 버렸어요! 장소에는 "에서"!',
        wrongSpeech: '으악! 도서관이 우주로 날아갔어!',
        isSpaceGag: true,
        boardReplace: '건물 독서!',
      },
    },
    correctMsg: '🎉 정답! 책 읽는 행동 장소 "도서관" 뒤에는 👉 "에서"가 정답! (도서관에서 읽어요.)',
    correctSpeech: '정답! 도서관에서 읽어요!',
  },
  {
    id: 'eoneunara',
    noun: '어느 나라',
    predicate: '왔어요?',
    correctList: ['에서'],
    wrongFeedback: {
      에: {
        boardBanner: '팅~!! "어느 나라에 왔어요?!" 출발한 곳은 "에서"!! 💢',
        wrongMsg: '문법 땡! 어디로부터 출발해 왔는지(고향·나라)를 물어볼 때는 "에"가 아니라 "에서"가 와야 해요!',
        wrongSpeech: '땡! 어느 나라에서 왔어요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "어느 나라님께서" 걸어오셨어요?! 🚀',
        wrongMsg: '비문 개그! 나라는 사람이 아니라서 "께서" 불가! 지구본이 떼굴떼굴 우주로 굴러갔어요!',
        wrongSpeech: '으악! 지구본이 우주로 굴러가 버렸어!',
        isSpaceGag: true,
        boardReplace: '지구본 슝!',
      },
    },
    correctMsg: '🎉 정답! 출발한 곳 "어느 나라" 뒤에는 👉 "에서"가 정답! (어느 나라에서 왔어요?)',
    correctSpeech: '정답! 어느 나라에서 왔어요?',
  },
  {
    id: 'jip_eseo',
    noun: '집',
    predicate: '쉬어요',
    correctList: ['에서'],
    wrongFeedback: {
      에: {
        boardBanner: '팅~!! "집에 쉬어요?!" 쉬는 행동 장소는 "에서"!! 💢',
        wrongMsg: '문법 땡! 집 안에서 "쉬어요"처럼 행동을 말할 때는 "에"가 아니라 "에서"가 와야 해요!',
        wrongSpeech: '땡! 집에서 쉬어요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "집님께서" 누워서 쉬신다?! 🚀',
        wrongMsg: '비문 개그! 집은 높임 주어 "께서"를 못 붙여요! 집이 이불 덮고 우주로 날아가 버렸어요!',
        wrongSpeech: '으악! 집이 이불 덮고 날아갔어!',
        isSpaceGag: true,
        boardReplace: '집 취침!',
      },
    },
    correctMsg: '🎉 정답! 쉬는 행동 장소 "집" 뒤에는 👉 "에서"가 정답! (집에서 쉬어요.)',
    correctSpeech: '정답! 집에서 쉬어요!',
  },
];

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildRandomUnit6Items(): MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[] {
  const bossPool = [...UNIT_6_E_POOL.filter((i) => i.id === 'eodi' || i.id === 'jeomsim'), ...UNIT_6_ESEO_POOL.filter((i) => i.id === 'eoneunara')];
  const bossItem = bossPool[Math.floor(Math.random() * bossPool.length)] || UNIT_6_ESEO_POOL[3];
  const eCandidates = shuffleArray(UNIT_6_E_POOL.filter((i) => i.id !== bossItem.id));
  const eseoCandidates = shuffleArray(UNIT_6_ESEO_POOL.filter((i) => i.id !== bossItem.id));
  const isBossE = bossItem.correctList[0] === '에';
  const picked = shuffleArray([
    ...eCandidates.slice(0, isBossE ? 2 : 2),
    ...eseoCandidates.slice(0, isBossE ? 2 : 2),
  ]);
  return [...picked, bossItem];
}

// 7단원 (에·에서2: 헷갈리는 목적지·존재 '에' vs 동작 장소 '에서' 심화 5문제) - 보기: 에, 에서, 께서
export const UNIT_6_2_ITEMS: MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[] = [
  {
    id: 'hakgyo',
    noun: '학교',
    predicate: '축구를 해요',
    correctList: ['에서'],
    wrongFeedback: {
      에: {
        boardBanner: '팅~!! "학교에 축구를 해요?!" 행동 장소는 "에서"!! 💢',
        wrongMsg: '문법 땡! "학교에 가요"가 아니라 학교 안에서 "축구를 해요"(동작)하므로 "에서"가 정답이에요!',
        wrongSpeech: '땡! 학교에서 축구를 해요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "학교님께서" 축구 슈팅을 날린다?! 🚀',
        wrongMsg: '비문 개그! 학교 건물이 축구선수가 되어 우주로 날아가 버렸어요! 동작 장소에는 "에서"!',
        wrongSpeech: '어? 학교 건물이 축구를 하러 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '학교 슛!',
      },
    },
    correctMsg: '🎉 정답! 축구를 하는 동작 장소 "학교" 뒤에는 👉 "에서"가 정답! (학교에서 축구를 해요.)',
    correctSpeech: '정답! 학교에서 축구를 해요!',
  },
  {
    id: 'gyosil',
    noun: '교실',
    predicate: '칠판이 있어요',
    correctList: ['에'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "교실에서 칠판이 있어요?!" 존재 "있어요" 앞엔 "에"!! 💢',
        wrongMsg: '문법 땡! "교실에서 공부해요"와 달리 단순히 물건이 "있어요"(존재)할 때는 "에"가 와야 해요!',
        wrongSpeech: '땡! 교실에 칠판이 있어요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "교실님께서" 칠판을 들고 출근하신다?! 🚀',
        wrongMsg: '비문 개그! 교실은 높일 사람이 아니에요! 칠판과 함께 우주로 떠나 버렸어요!',
        wrongSpeech: '으악! 교실이 칠판을 들고 날아갔어!',
        isSpaceGag: true,
        boardReplace: '칠판 출근!',
      },
    },
    correctMsg: '🎉 정답! 물건이 존재하는 장소 "교실" 뒤에는 👉 "에"가 정답! (교실에 칠판이 있어요.)',
    correctSpeech: '정답! 교실에 칠판이 있어요!',
  },
  {
    id: 'undongjang',
    noun: '운동장',
    predicate: '같이 가요',
    correctList: ['에'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "운동장에서 같이 가요?!" 도착 목적지는 "에"!! 💢',
        wrongMsg: '문법 땡! "운동장에서 놀아요"와 달리 어딘가로 향해 "가요"(목적지)할 때는 "에"가 정답이에요!',
        wrongSpeech: '땡! 운동장에 같이 가요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "운동장님께서" 산책을 나오셨다?! 🚀',
        wrongMsg: '비문 개그! 운동장이 사람인 줄 알고 "께서"를 붙였더니 잔디가 우주로 날아가 버렸어요!',
        wrongSpeech: '으악! 운동장 잔디가 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '잔디 산책!',
      },
    },
    correctMsg: '🎉 정답! 가는 목적지 "운동장" 뒤에는 👉 "에"가 정답! (운동장에 같이 가요.)',
    correctSpeech: '정답! 운동장에 같이 가요!',
  },
  {
    id: 'doseogwan',
    noun: '도서관',
    predicate: '책을 빌려요',
    correctList: ['에서'],
    wrongFeedback: {
      에: {
        boardBanner: '팅~!! "도서관에 책을 빌려요?!" 행동 장소엔 "에서"!! 💢',
        wrongMsg: '문법 땡! 책을 "빌려요"처럼 동작이 일어나는 장소 뒤에는 "에"가 아니라 "에서"가 와야 해요!',
        wrongSpeech: '땡! 도서관에서 책을 빌려요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "도서관님께서" 대출 도장을 쾅 찍으신다?! 🚀',
        wrongMsg: '비문 개그! 도서관 건물이 대출증을 물고 우주로 날아가 버렸어요! 행동 장소에는 "에서"!',
        wrongSpeech: '어? 도서관이 책과 함께 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '건물 대출!',
      },
    },
    correctMsg: '🎉 정답! 책을 빌리는 동작 장소 "도서관" 뒤에는 👉 "에서"가 정답! (도서관에서 책을 빌려요.)',
    correctSpeech: '정답! 도서관에서 책을 빌려요!',
  },
  {
    id: 'jip_eseo',
    prefix: '어머니가',
    noun: '집',
    predicate: '요리를 해요',
    correctList: ['에서'],
    wrongFeedback: {
      에: {
        boardBanner: '팅~!! "집에 요리를 해요?!" 요리하는 행동 장소는 "에서"!! 💢',
        wrongMsg: '문법 땡! "집에 있어요"와 달리 "요리를 해요"처럼 행동을 할 때는 "에서"를 써야 해요!',
        wrongSpeech: '땡! 집에서 요리를 해요가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "집님께서" 프라이팬을 돌리신다?! 🚀',
        wrongMsg: '비문 개그! 집이 요리사가 되어 지붕을 날리며 우주로 떠났어요! 행동 장소에는 "에서"!',
        wrongSpeech: '으악! 집이 요리하러 날아갔어!',
        isSpaceGag: true,
        boardReplace: '집 셰프!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 동작 "요리를 해요" 앞 행동 장소 👉 "에서"! (어머니가 집에서 요리를 해요.)',
    correctSpeech: '어머니가 집에서 요리를 해요!',
  },
];

// 8단원 (학습지 10쪽: 추가 도) - 보기: 도, 에서, 이에요
export const UNIT_7_ITEMS: MultiParticleQuestionItem<Unit7NounId, Unit7Particle>[] = [
  {
    id: 'na',
    noun: '나',
    predicate: '갈래요',
    correctList: ['도'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "나에서 갈래요?!" 내 몸이 정류장이니?! 💢',
        wrongMsg: '문법 땡! "에서"는 장소 뒤에 붙어요! "나 역시"라는 뜻으로 더할 때는 "도"가 와야 해요!',
        wrongSpeech: '땡! 나도 갈래요가 맞아요!',
      },
      이에요: {
        boardBanner: '휘이잉~!! "나이에요 갈래요?!" 문장 중간에 "이에요"?! 🚀',
        wrongMsg: '비문 개그! "이에요"는 문장 끝에만 써요! 말이 꼬여서 내가 우주로 날아가 버렸어요!',
        wrongSpeech: '으악! 말이 꼬여서 날아간다!',
        isSpaceGag: true,
        boardReplace: '문장 폭발!',
      },
    },
    correctMsg: '🎉 정답! "나 역시"를 뜻할 때는 👉 "도"가 정답! (나도 갈래요.)',
    correctSpeech: '정답! 나도 갈래요!',
  },
  {
    id: 'chingu',
    noun: '친구',
    predicate: '와요',
    correctList: ['도'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "친구에서 와요?!" 친구가 지하철역이니?! 💢',
        wrongMsg: '문법 땡! "에서"는 장소 뒤에만 붙어요! 친구가 함께 온다고 할 땐 "도"가 와야 해요!',
        wrongSpeech: '땡! 친구도 와요가 맞아요!',
      },
      이에요: {
        boardBanner: '휘이잉~!! "친구이에요 와요?!" 받침도 없고 비문!! 🚀',
        wrongMsg: '비문 개그! "이에요"는 문장 끝 마무리 말이고 "친구"엔 받침도 없어요! 친구가 우주로 날아갔어요!',
        wrongSpeech: '어? 친구가 우주로 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '문장 폭발!',
      },
    },
    correctMsg: '🎉 정답! "친구 역시"를 뜻할 때는 👉 "도"가 정답! (친구도 와요.)',
    correctSpeech: '정답! 친구도 와요!',
  },
  {
    id: 'mul',
    noun: '물',
    predicate: '주세요',
    correctList: ['도'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "물에서 주세요?!" 물속에서 뭘 꺼내니?! 💢',
        wrongMsg: '문법 땡! "물"은 장소가 아니라서 "에서"는 어색해요! 하나 더 달라고 할 땐 "도"가 정답!',
        wrongSpeech: '땡! 물도 주세요가 맞아요!',
      },
      이에요: {
        boardBanner: '휘이잉~!! "물이에요 주세요?!" 문장이 반으로 쪼개졌잖아!! 🚀',
        wrongMsg: '비문 개그! "물이에요"로 문장이 끝나버려서 "주세요"가 붕 떴어요! 물컵이 우주로 날아갔어요!',
        wrongSpeech: '으악! 물컵이 우주로 발사됐어!',
        isSpaceGag: true,
        boardReplace: '물컵 발사!',
      },
    },
    correctMsg: '🎉 정답! 다른 것에 더할 때는 👉 "도"가 정답! (물도 주세요.)',
    correctSpeech: '정답! 물도 주세요!',
  },
  {
    id: 'sagwa',
    noun: '사과',
    predicate: '먹어요',
    correctList: ['도'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "사과에서 먹어요?!" 사과 안에서 밥 먹니?! 💢',
        wrongMsg: '문법 땡! "사과"는 장소가 아니에요! "사과 역시"라고 더해서 말할 때는 "도"가 와야 해요!',
        wrongSpeech: '땡! 사과도 먹어요가 맞아요!',
      },
      이에요: {
        boardBanner: '휘이잉~!! "사과이에요 먹어요?!" 받침도 없고 문법 파괴!! 🚀',
        wrongMsg: '비문 개그! "사과" 끝엔 받침도 없고 문장 중간에 "이에요"는 비문! 사과가 우주로 날아갔어요!',
        wrongSpeech: '으악! 사과가 우주로 날아간다!',
        isSpaceGag: true,
        boardReplace: '사과 발사!',
      },
    },
    correctMsg: '🎉 정답! "사과 역시"를 뜻할 때는 👉 "도"가 정답! (사과도 먹어요.)',
    correctSpeech: '정답! 사과도 먹어요!',
  },
  {
    id: 'usan',
    prefix: '가방에',
    noun: '우산',
    predicate: '있어요',
    correctList: ['도'],
    wrongFeedback: {
      에서: {
        boardBanner: '팅~!! "우산에서 있어요?!" 우산 위에 올라타 있니?! 💢',
        wrongMsg: '문법 땡! "가방에"가 이미 장소예요! "우산 역시 있다"고 더할 때는 추가 조사 "도"가 정답!',
        wrongSpeech: '땡! 우산도 있어요가 맞아요!',
      },
      이에요: {
        boardBanner: '휘이잉~!! "우산이에요 있어요?!" 끝말 "이에요"가 왜 여기에?! 🚀',
        wrongMsg: '비문 개그! "이에요"는 맨 끝에만 붙는 말이라 중간에 넣으면 비문! 우산이 우주로 날아갔어요!',
        wrongSpeech: '으악! 우산 타고 우주로 날아갔다!',
        isSpaceGag: true,
        boardReplace: '우산 비행!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 장소 "가방에" + 하나 더 추가 👉 "도"! (가방에 우산도 있어요.)',
    correctSpeech: '가방에 우산도 있어요!',
  },
];

// 8단원 (학습지 12쪽: 나열·동반 와, 과, 하고, 이랑, 랑) - 받침별 와/과, 이랑/랑 + 만능 하고 복수 정답!
export const UNIT_8_ITEMS: MultiParticleQuestionItem<Unit8NounId, Unit8Particle>[] = [
  {
    id: 'eomma',
    noun: '엄마',
    predicate: '가요',
    correctList: ['와', '하고', '랑'],
    wrongFeedback: {
      과: {
        boardBanner: '팅~!! "엄마과?!" 받침이 없는데 왜 "과"?! 💢',
        wrongMsg: '문법 땡! "엄마" 끝 글자 "마"에는 받침이 없어요! 받침이 없을 때는 "와", "랑" 또는 만능 "하고"를 써야 해요!',
        wrongSpeech: '땡! 엄마에는 받침이 없어서 와, 랑, 하고가 와야 해요!',
      },
      이랑: {
        boardBanner: '팅~!! "엄마이랑?!" 받침이 없는데 "이"가 왜 붙어?! 💢',
        wrongMsg: '문법 땡! "엄마" 끝 글자 "마"에는 받침이 없어요! 받침이 없을 때는 "랑", "와" 또는 만능 "하고"를 써야 해요!',
        wrongSpeech: '땡! 엄마에는 받침이 없어서 랑, 와, 하고가 와야 해요!',
      },
    },
    correctMsg: '🎉 복수 정답! "엄마"엔 받침이 없어서 "와·랑", 만능 "하고" 모두 정답! (엄마와/엄마하고/엄마랑 가요.)',
    correctSpeech: '정답! 엄마하고 가요, 엄마와 가요, 엄마랑 가요 모두 좋아요!',
    correctMsgByChoice: {
      와: '🎉 정답! "엄마" 끝에 받침이 없어서 👉 "와" 정답! ("엄마하고/엄마랑"도 정답이에요!)',
      하고: '🎉 정답! "하고"는 받침 상관없이 언제나 정답! ("엄마와/엄마랑"도 정답이에요!)',
      랑: '🎉 정답! "엄마" 끝에 받침이 없어서 👉 "랑" 정답! ("엄마와/엄마하고"도 정답이에요!)',
    },
    correctSpeechByChoice: {
      와: '정답! 엄마와 가요! 엄마하고, 엄마랑도 맞아요!',
      하고: '정답! 엄마하고 가요! 엄마와, 엄마랑도 맞아요!',
      랑: '정답! 엄마랑 가요! 엄마와, 엄마하고도 맞아요!',
    },
  },
  {
    id: 'uyu',
    noun: '우유',
    predicate: '빵이에요',
    correctList: ['와', '하고', '랑'],
    wrongFeedback: {
      과: {
        boardBanner: '팅~!! "우유과?!" 받침이 없잖아!! 💢',
        wrongMsg: '문법 땡! "우유" 끝 글자 "유"에 받침이 없어서 "과"는 튕겨나가요! 받침이 없으면 "와", "랑" 또는 "하고"가 정답!',
        wrongSpeech: '땡! 우유에는 받침이 없어서 와, 랑, 하고가 와야 해요!',
      },
      이랑: {
        boardBanner: '팅~!! "우유이랑?!" 받침이 없잖아!! 💢',
        wrongMsg: '문법 땡! "우유" 끝 글자 "유"에 받침이 없어서 "이랑"은 튕겨나가요! 받침이 없으면 "와", "랑" 또는 "하고"가 정답!',
        wrongSpeech: '땡! 우유에는 받침이 없어서 와, 랑, 하고가 와야 해요!',
      },
    },
    correctMsg: '🎉 복수 정답! "우유"엔 받침이 없어서 "와·랑", 만능 "하고" 모두 정답!',
    correctSpeech: '정답! 우유와 빵이에요, 우유하고 빵이에요, 우유랑 빵이에요!',
    correctMsgByChoice: {
      와: '🎉 정답! "우유" 끝에 받침이 없어서 👉 "와" 정답! ("우유하고/우유랑"도 정답이에요!)',
      하고: '🎉 정답! "하고"는 받침 상관없이 언제나 정답! ("우유와/우유랑"도 정답이에요!)',
      랑: '🎉 정답! "우유" 끝에 받침이 없어서 👉 "랑" 정답! ("우유와/우유하고"도 정답이에요!)',
    },
    correctSpeechByChoice: {
      와: '정답! 우유와 빵이에요! 우유하고도 맞아요!',
      하고: '정답! 우유하고 빵이에요! 우유와도 맞아요!',
      랑: '정답! 우유랑 빵이에요! 우유와도 맞아요!',
    },
  },
  {
    id: 'yeonpil',
    noun: '연필',
    predicate: '지우개',
    correctList: ['과', '하고', '이랑'],
    wrongFeedback: {
      와: {
        boardBanner: '팅~!! "연필와?!" 받침 ㄹ 방어막 발동!! 💢',
        wrongMsg: '받침 ㄹ 방어막! "연필" 끝 글자 "필"에 받침 ㄹ이 있어서 "와"는 못 붙고 "과", "이랑" 또는 "하고"가 와야 해요!',
        wrongSpeech: '땡! 연필 끝엔 받침이 있어서 과, 이랑, 하고가 와야 해요!',
      },
      랑: {
        boardBanner: '팅~!! "연필랑?!" 받침 ㄹ 방어막 발동!! 💢',
        wrongMsg: '받침 ㄹ 방어막! "연필" 끝 글자 "필"에 받침 ㄹ이 있어서 "랑"은 못 붙고 "이랑", "과" 또는 "하고"가 와야 해요!',
        wrongSpeech: '땡! 연필 끝엔 받침이 있어서 이랑, 과, 하고가 와야 해요!',
      },
    },
    correctMsg: '🎉 복수 정답! "연필"엔 받침이 있어서 "과·이랑", 만능 "하고" 모두 정답!',
    correctSpeech: '정답! 연필과 지우개, 연필이랑 지우개, 연필하고 지우개!',
    correctMsgByChoice: {
      과: '🎉 정답! "연필" 끝에 받침이 있어서 👉 "과" 정답! ("연필이랑/연필하고"도 정답이에요!)',
      하고: '🎉 정답! "하고"는 받침 상관없이 언제나 정답! ("연필과/연필이랑"도 정답이에요!)',
      이랑: '🎉 정답! "연필" 끝에 받침이 있어서 👉 "이랑" 정답! ("연필과/연필하고"도 정답이에요!)',
    },
    correctSpeechByChoice: {
      과: '정답! 연필과 지우개! 연필이랑, 연필하고도 맞아요!',
      하고: '정답! 연필하고 지우개! 연필이랑, 연필과도 맞아요!',
      이랑: '정답! 연필이랑 지우개! 연필과, 연필하고도 맞아요!',
    },
  },
  {
    id: 'chaek',
    noun: '책',
    predicate: '공책',
    correctList: ['과', '하고', '이랑'],
    wrongFeedback: {
      와: {
        boardBanner: '팅~!! "책와?!" 받침 ㄱ 안 보여?! 💢',
        wrongMsg: '받침 ㄱ 방어막! "책" 끝에 받침 ㄱ이 있어서 "와"는 비문! 받침이 있으면 "과", "이랑" 또는 "하고"가 와야 해요!',
        wrongSpeech: '땡! 책 끝엔 받침 기역이 있어서 과, 이랑, 하고가 와야 해요!',
      },
      랑: {
        boardBanner: '팅~!! "책랑?!" 받침 ㄱ 안 보여?! 💢',
        wrongMsg: '받침 ㄱ 방어막! "책" 끝에 받침 ㄱ이 있어서 "랑"은 비문! 받침이 있으면 "이랑", "과" 또는 "하고"가 와야 해요!',
        wrongSpeech: '땡! 책 끝엔 받침 기역이 있어서 이랑, 과, 하고가 와야 해요!',
      },
    },
    correctMsg: '🎉 복수 정답! "책"엔 받침이 있어서 "과·이랑", 만능 "하고" 모두 정답!',
    correctSpeech: '정답! 책과 공책, 책하고 공책, 책이랑 공책!',
    correctMsgByChoice: {
      과: '🎉 정답! "책" 끝에 받침 ㄱ이 있어서 👉 "과" 정답! ("책이랑/책하고"도 정답이에요!)',
      하고: '🎉 정답! "하고"는 받침 상관없이 언제나 정답! ("책과/책이랑"도 정답이에요!)',
      이랑: '🎉 정답! "책" 끝에 받침 ㄱ이 있어서 👉 "이랑" 정답! ("책과/책하고"도 정답이에요!)',
    },
    correctSpeechByChoice: {
      과: '정답! 책과 공책! 책하고, 책이랑도 맞아요!',
      하고: '정답! 책하고 공책! 책과, 책이랑도 맞아요!',
      이랑: '정답! 책이랑 공책! 책과, 책하고도 맞아요!',
    },
  },
  {
    id: 'chingu',
    prefix: '운동장에서',
    noun: '친구',
    predicate: '놀아요',
    correctList: ['와', '하고', '랑'],
    wrongFeedback: {
      과: {
        boardBanner: '팅~!! "친구과?!" 받침이 없는데 왜 "과"?! 💢',
        wrongMsg: '문법 땡! "친구" 끝 글자 "구"에 받침이 없어요! 받침이 없을 때는 "와", "랑" 또는 만능 "하고"가 정답이에요!',
        wrongSpeech: '땡! 친구에는 받침이 없어서 와, 랑, 하고가 와야 해요!',
      },
      이랑: {
        boardBanner: '팅~!! "친구이랑?!" 받침이 없는데 왜 "이랑"?! 💢',
        wrongMsg: '문법 땡! "친구" 끝 글자 "구"에 받침이 없어요! 받침이 없을 때는 "랑", "와" 또는 만능 "하고"가 정답이에요!',
        wrongSpeech: '땡! 친구에는 받침이 없어서 랑, 와, 하고가 와야 해요!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 장소 "운동장에서" + 함께 놀 때 👉 "와/하고/랑"! (운동장에서 친구와/랑 놀아요.)',
    correctSpeech: '운동장에서 친구와 놀아요!',
    correctMsgByChoice: {
      와: '🔥 보스 호응 정답! "친구" 받침 없음 👉 "와" 정답! (운동장에서 친구와 놀아요.)',
      하고: '🔥 보스 호응 정답! "하고"는 받침 상관없이 정답! (운동장에서 친구하고 놀아요.)',
      랑: '🔥 보스 호응 정답! "친구" 받침 없음 👉 "랑" 정답! (운동장에서 친구랑 놀아요.)',
    },
    correctSpeechByChoice: {
      와: '운동장에서 친구와 놀아요!',
      하고: '운동장에서 친구하고 놀아요!',
      랑: '운동장에서 친구랑 놀아요!',
    },
  },
];

// 9단원 (학습지 13쪽: 방향·수단 으로, 로) - "에게" 섞어서 사람이냐고 핀잔주기!
export const UNIT_9_ITEMS: MultiParticleQuestionItem<Unit9NounId, Unit9Particle>[] = [
  {
    id: 'hakgyo',
    noun: '학교',
    predicate: '가요',
    correctList: ['로'],
    wrongFeedback: {
      으로: {
        boardBanner: '팅~!! "학교으로?!" 받침이 없는데 왜 "으로"?! 💢',
        wrongMsg: '문법 땡! "학교" 끝 글자 "교"에 받침이 없어요! 받침이 없을 때는 방향 조사 "로"가 와야 해요!',
        wrongSpeech: '땡! 학교에는 받침이 없어서 로가 와야 해요!',
      },
      에게: {
        boardBanner: '야!! "학교에게?!" 학교가 걸어 다니는 사람이냐?! 🏫💢',
        wrongMsg: '핀잔 발사! 학교가 살아 숨 쉬는 사람이냐?! "에게"는 사람·동물에게만 쓰고, 방향은 "로"를 써야 해요!',
        wrongSpeech: '야! 학교가 사람이냐?! 학교로 가요가 맞지!',
      },
    },
    correctMsg: '🎉 정답! "학교" 끝에 받침이 없어서 방향 조사 👉 "로"가 정답! (학교로 가요.)',
    correctSpeech: '정답! 학교로 가요!',
  },
  {
    id: 'undongjang',
    noun: '운동장',
    predicate: '나가요',
    correctList: ['으로'],
    wrongFeedback: {
      로: {
        boardBanner: '팅~!! "운동장로?!" 받침 ㅇ 방어막!! 💢',
        wrongMsg: '받침 ㅇ 방어막! "운동장" 끝 글자 "장"에 받침 ㅇ이 있어요! 받침이 있을 때는 "으로"가 와야 해요!',
        wrongSpeech: '땡! 운동장 끝엔 받침 이응이 있어서 으로가 와야 해요!',
      },
      에게: {
        boardBanner: '어이!! "운동장에게?!" 운동장이 네 친구 사람이냐?! ⚽💢',
        wrongMsg: '핀잔 발사! 운동장이 말을 하고 뛰어다니는 사람이냐?! 사람한테 쓰는 "에게" 말고 "으로"를 써요!',
        wrongSpeech: '어이! 운동장이 사람이냐?! 운동장으로 나가요가 맞지!',
      },
    },
    correctMsg: '🎉 정답! "운동장" 끝에 받침 ㅇ이 있어서 👉 "으로"가 정답! (운동장으로 나가요.)',
    correctSpeech: '정답! 운동장으로 나가요!',
  },
  {
    id: 'yeonpil',
    noun: '연필',
    predicate: '써요',
    correctList: ['로'],
    wrongFeedback: {
      으로: {
        boardBanner: '팅~!! "연필으로?!" ★ ㄹ 받침 뒤에는 무조건 "로"!! 💢',
        wrongMsg: '★ ㄹ 받침 특급 규칙! "연필" 끝엔 받침이 있지만 ㄹ 받침일 때는 "으로"가 아니라 "로"가 와야 해요!',
        wrongSpeech: '땡! 리을 받침 뒤에는 으로가 아니라 로가 와야 해요!',
      },
      에게: {
        boardBanner: '야!! "연필에게 써요?!" 연필이 사람이냐?! ✏️💢',
        wrongMsg: '핀잔 발사! 연필한테 인사하고 편지 쓰니?! 연필이 사람이냐?! 수단·도구 조사 "로"를 써야 해요!',
        wrongSpeech: '야! 연필이 사람이냐?! 연필로 써요가 맞지!',
      },
    },
    correctMsg: '🎉 정답! ★ ㄹ 받침 뒤에는 "으로"가 아니라 👉 "로"가 정답! (연필로 써요.)',
    correctSpeech: '정답! 연필로 써요!',
  },
  {
    id: 'beoseu',
    noun: '버스',
    predicate: '가요',
    correctList: ['로'],
    wrongFeedback: {
      으로: {
        boardBanner: '팅~!! "버스으로?!" 받침이 없는데 왜 "으로"?! 💢',
        wrongMsg: '문법 땡! "버스" 끝 글자 "스"에 받침이 없어요! 받침이 없을 때는 교통수단 "로"가 정답이에요!',
        wrongSpeech: '땡! 버스에는 받침이 없어서 로가 와야 해요!',
      },
      에게: {
        boardBanner: '어이!! "버스에게?!" 버스가 사람이냐?! 🚌💢',
        wrongMsg: '핀잔 발사! 버스가 걸어 다니는 사람이냐?! 버스한테 인사하지 말고 교통수단 조사 "로"를 써요!',
        wrongSpeech: '어이! 버스가 사람이냐?! 버스로 가요가 맞지!',
      },
    },
    correctMsg: '🎉 정답! "버스" 끝에 받침이 없어서 수단 조사 👉 "로"가 정답! (버스로 가요.)',
    correctSpeech: '정답! 버스로 가요!',
  },
  {
    id: 'sutgarak',
    prefix: '밥을',
    noun: '숟가락',
    predicate: '먹어요',
    correctList: ['으로'],
    wrongFeedback: {
      로: {
        boardBanner: '팅~!! "숟가락로?!" 받침 ㄱ 방어막!! 💢',
        wrongMsg: '받침 ㄱ 방어막! "숟가락" 끝 글자 "락"에 받침 ㄱ이 있어요! 받침이 있을 때는 "으로"가 정답이에요!',
        wrongSpeech: '땡! 숟가락 끝엔 받침 기역이 있어서 으로가 와야 해요!',
      },
      에게: {
        boardBanner: '야!! "숟가락에게?!" 숟가락이 밥 먹는 사람이냐?! 🥄💢',
        wrongMsg: '핀잔 발사! 숟가락이 입 달린 사람이냐?! 목적어 "밥을" 뒤 도구 조사 "으로"를 써요!',
        wrongSpeech: '야! 숟가락이 사람이냐?! 밥을 숟가락으로 먹어요가 맞지!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 목적어 "밥을" + 도구 받침 ㄱ 👉 "으로"! (밥을 숟가락으로 먹어요.)',
    correctSpeech: '밥을 숟가락으로 먹어요!',
  },
];

// 10단원 (학습지 14쪽: 행동 대상 에게, 한테) - 보기: 에게, 한테, 로, 으로 ("에게/한테" 복수 정답, "로/으로" 오답 이유 설명)
export const UNIT_10_ITEMS: MultiParticleQuestionItem<Unit10NounId, Unit10Particle>[] = [
  {
    id: 'jjakkkung',
    noun: '짝꿍',
    predicate: '물어요',
    correctList: ['에게', '한테'],
    wrongFeedback: {
      로: {
        boardBanner: '팅~!! "짝꿍로?!" 방향·도구 조사 "로"는 사람 대상 불가!! 💢',
        wrongMsg: '오답 이유! "로"는 길(방향)이나 연필(도구)에 쓰는 조사예요. 사람("짝꿍")에게 물어볼 때는 "에게"나 "한테"를 써야 해요!',
        wrongSpeech: '땡! 로는 방향이나 도구에 써요. 짝꿍에게, 짝꿍한테가 맞아요!',
      },
      으로: {
        boardBanner: '팅~!! "짝꿍으로 물어요?!" 짝꿍이 도구가 아니잖아!! 💢',
        wrongMsg: '오답 이유! "으로"는 방향이나 수단·도구를 뜻하는 조사예요! 짝꿍에게 질문할 때는 행동 대상 조사 "에게"나 "한테"가 정답이에요!',
        wrongSpeech: '땡! 으로가 아니라 짝꿍에게, 짝꿍한테 물어요가 맞아요!',
      },
    },
    correctMsg: '🎉 복수 정답! 사람 대상 "짝꿍" 뒤에는 👉 "에게", "한테" 모두 정답! (짝꿍에게/한테 물어요.)',
    correctSpeech: '정답! 짝꿍에게 물어요, 짝꿍한테 물어요 둘 다 정답이에요!',
    correctMsgByChoice: {
      에게: '🎉 정답! 사람 대상 뒤에는 👉 "에게" 정답! ("짝꿍한테"도 똑같이 정답이에요!)',
      한테: '🎉 정답! 말할 때 자주 쓰는 👉 "한테" 정답! ("짝꿍에게"도 똑같이 정답이에요!)',
    },
  },
  {
    id: 'chingu',
    noun: '친구',
    predicate: '줘요',
    correctList: ['에게', '한테'],
    wrongFeedback: {
      로: {
        boardBanner: '팅~!! "친구로 줘요?!" 친구를 택배 상자처럼 주니?! 💢',
        wrongMsg: '오답 이유! "로"는 방향이나 수단을 말할 때 써요. 무언가를 받는 사람("친구") 뒤에는 "에게"나 "한테"를 써야 해요!',
        wrongSpeech: '땡! 로는 방향이나 수단에 써요. 친구에게, 친구한테가 맞아요!',
      },
      으로: {
        boardBanner: '팅~!! "친구으로 줘요?!" 받침도 없고 대상 조사도 아님!! 💢',
        wrongMsg: '오답 이유! "으로"는 받침 있는 명사의 방향·수단 조사예요! 사람에게 줄 때는 받침 상관없이 "에게"나 "한테"가 정답!',
        wrongSpeech: '땡! 친구에게 줘요, 친구한테 줘요가 맞아요!',
      },
    },
    correctMsg: '🎉 복수 정답! 받는 사람 "친구" 뒤에는 👉 "에게", "한테" 모두 정답! (친구에게/한테 줘요.)',
    correctSpeech: '정답! 친구에게 줘요, 친구한테 줘요 둘 다 정답이에요!',
    correctMsgByChoice: {
      에게: '🎉 정답! 받는 대상 "친구" 뒤에는 👉 "에게" 정답! ("친구한테"도 정답이에요!)',
      한테: '🎉 정답! 받는 대상 "친구" 뒤에는 👉 "한테" 정답! ("친구에게"도 정답이에요!)',
    },
  },
  {
    id: 'dongsaeng',
    noun: '동생',
    predicate: '말해요',
    correctList: ['에게', '한테'],
    wrongFeedback: {
      로: {
        boardBanner: '팅~!! "동생로 말해요?!" 동생이 마이크니?! 💢',
        wrongMsg: '오답 이유! "로"는 수단(예: 한국어로)이나 방향 조사예요! 동생에게 말을 건넬 때는 대상 조사 "에게"나 "한테"를 써야 해요!',
        wrongSpeech: '땡! 동생에게 말해요, 동생한테 말해요가 맞아요!',
      },
      으로: {
        boardBanner: '팅~!! "동생으로 말해요?!" 동생이 스피커니?! 💢',
        wrongMsg: '오답 이유! "동생으로 말해요"라고 하면 동생을 "도구"처럼 이용해서 말한다는 뜻이 돼요! 대상에겐 "에게"나 "한테"가 정답!',
        wrongSpeech: '땡! 동생은 도구가 아니라 사람이라서 에게나 한테가 와야 해요!',
      },
    },
    correctMsg: '🎉 복수 정답! 말 거는 대상 "동생" 뒤에는 👉 "에게", "한테" 모두 정답! (동생에게/한테 말해요.)',
    correctSpeech: '정답! 동생에게 말해요, 동생한테 말해요 둘 다 정답이에요!',
    correctMsgByChoice: {
      에게: '🎉 정답! 말 거는 대상 "동생" 뒤에는 👉 "에게" 정답! ("동생한테"도 정답이에요!)',
      한테: '🎉 정답! 말 거는 대상 "동생" 뒤에는 👉 "한테" 정답! ("동생에게"도 정답이에요!)',
    },
  },
  {
    id: 'uri',
    noun: '우리',
    predicate: '주세요',
    correctList: ['에게', '한테'],
    wrongFeedback: {
      로: {
        boardBanner: '팅~!! "우리로 주세요?!" 방향·수단 조사 불가!! 💢',
        wrongMsg: '오답 이유! "로"는 방향이나 도구에 쓰는 조사예요. 받는 사람("우리") 뒤에는 "에게"나 "한테"를 써야 해요!',
        wrongSpeech: '땡! 우리에게 주세요, 우리한테 주세요가 맞아요!',
      },
      으로: {
        boardBanner: '팅~!! "우리으로 주세요?!" 받침도 없고 대상 조사 불가!! 💢',
        wrongMsg: '오답 이유! "으로"는 받침 있는 방향·수단 명사에만 써요! 우리에게 건네줄 때는 "에게"나 "한테"가 정답이에요!',
        wrongSpeech: '땡! 우리에게 주세요, 우리한테 주세요가 맞아요!',
      },
    },
    correctMsg: '🎉 복수 정답! 받는 대상 "우리" 뒤에도 👉 "에게", "한테" 모두 정답!',
    correctSpeech: '정답! 우리에게 주세요, 우리한테 주세요 둘 다 정답이에요!',
    correctMsgByChoice: {
      에게: '🎉 정답! 받는 대상 "우리" 뒤에도 👉 "에게" 정답! ("우리한테"도 정답이에요!)',
      한테: '🎉 정답! 말할 때 자주 쓰는 👉 "한테" 정답! ("우리에게"도 정답이에요!)',
    },
  },
  {
    id: 'nugu10',
    prefix: '선물을',
    noun: '누구',
    predicate: '줘요?',
    correctList: ['에게', '한테'],
    wrongFeedback: {
      로: {
        boardBanner: '팅~!! "누구로 줘요?!" 사람을 수단·방향으로 쓰니?! 💢',
        wrongMsg: '오답 이유! "선물을" 받는 사람에게 줄 때는 방향 "로"가 아니라 대상 조사 "에게/한테"를 써야 해요!',
        wrongSpeech: '땡! 누구에게 줘요, 누구한테 줘요가 맞아요!',
      },
      으로: {
        boardBanner: '팅~!! "누구으로 줘요?!" 받침도 없고 대상 조사 불가!! 💢',
        wrongMsg: '오답 이유! "으로"는 받침 있는 방향·수단 명사 짝꿍이에요! 받는 사람을 물을 때는 "에게"나 "한테"가 정답이에요!',
        wrongSpeech: '땡! 누구에게 줘요, 누구한테 줘요가 맞아요!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 목적어 "선물을" + 받는 사람 👉 "에게/한테"! (선물을 누구에게 줘요?)',
    correctSpeech: '선물을 누구에게 줘요?',
    correctMsgByChoice: {
      에게: '🔥 보스 호응 정답! 사람 질문 "누구" 뒤 👉 "에게" 정답! ("선물을 누구한테 줘요?"도 정답!)',
      한테: '🔥 보스 호응 정답! 사람 질문 "누구" 뒤 👉 "한테" 정답! ("선물을 누구에게 줘요?"도 정답!)',
    },
  },
];

// 11단원 (학습지 16단원: 시작과 끝 부터, 까지) - 보기: 부터, 까지, 마다
export const UNIT_11_ITEMS: MultiParticleQuestionItem<Unit11NounId, Unit11To13Particle>[] = [
  {
    id: 'achim',
    noun: '아침',
    predicate: '비가 와요',
    correctList: ['부터'],
    wrongFeedback: {
      까지: {
        boardBanner: '팅~!! "아침까지 비가 와요?!" 비가 시작하는 시간은 "부터"!! 💢',
        wrongMsg: '문법 땡! 비가 내리기 "시작한" 시간일 때는 끝을 뜻하는 "까지"가 아니라 시작 조사 "부터"가 와야 해요!',
        wrongSpeech: '땡! 비가 시작하는 시간은 아침부터가 맞아요!',
      },
      마다: {
        boardBanner: '팅~!! "아침마다 비가 와요?!" 매일 아침 비만 오니?! 💢',
        wrongMsg: '문법 땡! 반복이 아니라 오늘 비가 "언제 시작했는지"를 말할 때는 시작 조사 "부터"를 써야 해요!',
        wrongSpeech: '땡! 시작 시간은 아침부터가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 시작하는 시간 "아침" 뒤에는 👉 "부터"가 정답! (아침부터 비가 와요.)',
    correctSpeech: '정답! 아침부터 비가 와요!',
  },
  {
    id: 'wolyoil',
    noun: '월요일',
    predicate: '학교에 가요',
    correctList: ['부터'],
    wrongFeedback: {
      까지: {
        boardBanner: '팅~!! "월요일까지 학교에 가요?!" 새 주 시작은 "부터"!! 💢',
        wrongMsg: '문법 땡! 등교를 "시작하는" 요일을 말할 때는 끝("까지")이 아니라 시작 조사 "부터"가 정답이에요!',
        wrongSpeech: '땡! 월요일부터 학교에 가요가 맞아요!',
      },
      마다: {
        boardBanner: '팅~!! "월요일마다 학교에 가요?!" 월요일 하루만 가니?! 💢',
        wrongMsg: '문법 땡! 월요일에 등교를 "시작한다"는 뜻이므로 반복("마다")이 아니라 시작 조사 "부터"를 써야 해요!',
        wrongSpeech: '땡! 월요일부터 학교에 가요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 시작하는 요일 "월요일" 뒤에는 👉 "부터"가 정답! (월요일부터 학교에 가요.)',
    correctSpeech: '정답! 월요일부터 학교에 가요!',
  },
  {
    id: 'jeonyeok',
    noun: '저녁',
    predicate: '숙제해요',
    correctList: ['까지'],
    wrongFeedback: {
      부터: {
        boardBanner: '팅~!! "저녁부터 숙제해요?!" 숙제 끝나는 마감은 "까지"!! 💢',
        wrongMsg: '문법 땡! 해 질 녘 저녁이 될 때까지 이어진다는 "끝·한계"를 말할 때는 "부터"가 아니라 "까지"가 정답이에요!',
        wrongSpeech: '땡! 저녁까지 숙제해요가 맞아요!',
      },
      마다: {
        boardBanner: '팅~!! "저녁마다 숙제해요?!" 끝 시점을 말할 땐 "까지"!! 💢',
        wrongMsg: '문법 땡! 언제까지 계속하는지 마감을 말할 때는 반복("마다")이 아니라 끝 조사 "까지"를 써야 해요!',
        wrongSpeech: '땡! 저녁까지 숙제해요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 끝나는 시간 "저녁" 뒤에는 👉 "까지"가 정답! (저녁까지 숙제해요.)',
    correctSpeech: '정답! 저녁까지 숙제해요!',
  },
  {
    id: 'hakgyo',
    prefix: '집에서',
    noun: '학교',
    predicate: '걸어요',
    correctList: ['까지'],
    wrongFeedback: {
      부터: {
        boardBanner: '팅~!! "집에서 학교부터?!" "집에서~" 뒤엔 도착점 "까지"!! 💢',
        wrongMsg: '문법 땡! 앞에 출발지 "집에서"가 나왔으니 도착하는 곳 "학교" 뒤에는 반드시 도착 조사 "까지"가 와야 해요!',
        wrongSpeech: '땡! 집에서 학교까지 걸어요가 맞아요!',
      },
      마다: {
        boardBanner: '팅~!! "집에서 학교마다 걸어요?!" 학교가 몇 개니?! 💢',
        wrongMsg: '문법 땡! 도착 장소를 말할 때는 반복("마다")이 아니라 도착 조사 "까지"가 정답이에요!',
        wrongSpeech: '땡! 집에서 학교까지 걸어요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 출발("집에서") + 도착("학교") 뒤에는 👉 "까지"가 정답! (집에서 학교까지 걸어요.)',
    correctSpeech: '정답! 집에서 학교까지 걸어요!',
  },
  {
    id: 'eodi',
    prefix: '오늘 책을',
    noun: '어디',
    predicate: '읽었어요?',
    correctList: ['까지'],
    wrongFeedback: {
      부터: {
        boardBanner: '팅~!! "어디부터 읽었어요?!" 몇 쪽까지 읽었는지 묻잖아!! 💢',
        wrongMsg: '문법 땡! 진도가 "도달한 끝 위치"를 물어볼 때는 "어디까지 읽었어요?"라고 물어야 자연스러워요!',
        wrongSpeech: '땡! 오늘 책을 어디까지 읽었어요가 맞아요!',
      },
      마다: {
        boardBanner: '휘이잉~!! "어디마다 읽었어요?!" 책장이 춤춘다!! 🚀',
        wrongMsg: '비문 개그! "어디"에 "마다"를 붙이면 어색한 비문이 돼요! 표지판이 우주로 날아가 버렸어요!',
        wrongSpeech: '으악! 어디마다는 비문이에요!',
        isSpaceGag: true,
        boardReplace: '표지판 슝!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 도달한 끝 지점 호응 👉 "까지"! (오늘 책을 어디까지 읽었어요?)',
    correctSpeech: '오늘 책을 어디까지 읽었어요?',
  },
];

// 12단원 (학습지 17단원: 선택 이나, 나) - 보기: 이나, 나, 까지
export const UNIT_12_ITEMS: MultiParticleQuestionItem<Unit12NounId, Unit11To13Particle>[] = [
  {
    id: 'ppang',
    noun: '빵',
    predicate: '먹어요',
    correctList: ['이나'],
    wrongFeedback: {
      나: {
        boardBanner: '팅~!! "빵나 먹어요?!" 받침 ㅇ 방어막 발동!! 💢',
        wrongMsg: '받침 ㅇ 방어막! "빵"에 받침 ㅇ이 있어요! 받침이 있는 말 뒤에는 "나"가 아니라 "이나"를 붙여야 해요!',
        wrongSpeech: '땡! 빵 끝엔 받침 이응이 있어서 빵이나가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "빵까지 먹어요?!" 하나 고를 땐 "이나"!! 💢',
        wrongMsg: '문법 땡! 여러 가지 중에서 하나를 선택해 말할 때는 도착 조사 "까지"가 아니라 선택 조사 "이나"가 정답이에요!',
        wrongSpeech: '땡! 빵이나 먹어요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! "빵" 끝에 받침 ㅇ이 있어서 선택 조사 👉 "이나"가 정답! (빵이나 먹어요.)',
    correctSpeech: '정답! 빵이나 먹어요!',
  },
  {
    id: 'mul',
    noun: '물',
    predicate: '마셔요',
    correctList: ['이나'],
    wrongFeedback: {
      나: {
        boardBanner: '팅~!! "물나 마셔요?!" 받침 ㄹ 방어막 발동!! 💢',
        wrongMsg: '받침 ㄹ 방어막! "물"에 받침 ㄹ이 있어요! 받침이 있을 때는 선택 조사 "이나"가 와야 해요!',
        wrongSpeech: '땡! 물 끝엔 받침 리을이 있어서 물이나가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "물까지 마셔요?!" 목마를 때 선택은 "이나"!! 💢',
        wrongMsg: '문법 땡! 다른 것 대신 물이라도 마시자고 고를 때는 선택 조사 "이나"가 정답이에요!',
        wrongSpeech: '땡! 물이나 마셔요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! "물" 끝에 받침 ㄹ이 있어서 선택 조사 👉 "이나"가 정답! (물이나 마셔요.)',
    correctSpeech: '정답! 물이나 마셔요!',
  },
  {
    id: 'chaek',
    noun: '책',
    predicate: '읽어요',
    correctList: ['이나'],
    wrongFeedback: {
      나: {
        boardBanner: '팅~!! "책나 읽어요?!" 받침 ㄱ 안 보여?! 💢',
        wrongMsg: '받침 ㄱ 방어막! "책" 끝에 받침 ㄱ이 있어서 "나"는 튕겨나가요! 받침이 있을 때는 "이나"가 와야 해요!',
        wrongSpeech: '땡! 책 끝엔 받침 기역이 있어서 책이나가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "책까지 읽어요?!" 심심할 때 고르는 건 "이나"!! 💢',
        wrongMsg: '문법 땡! 여러 활동 중 책 읽기를 하나 고를 때는 "책이나 읽어요"라고 말해요!',
        wrongSpeech: '땡! 책이나 읽어요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! "책" 끝에 받침 ㄱ이 있어서 선택 조사 👉 "이나"가 정답! (책이나 읽어요.)',
    correctSpeech: '정답! 책이나 읽어요!',
  },
  {
    id: 'sagwa',
    noun: '사과',
    predicate: '주세요',
    correctList: ['나'],
    wrongFeedback: {
      이나: {
        boardBanner: '팅~!! "사과이나 주세요?!" 받침이 없는데 왜 "이나"?! 💢',
        wrongMsg: '문법 땡! "사과" 끝 글자 "과"에 받침이 없어요! 받침이 없을 때는 "이나"가 아니라 "나"가 와야 해요!',
        wrongSpeech: '땡! 사과에는 받침이 없어서 사과나가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "사과까지 주세요?!" 하나 고를 땐 "나"!! 💢',
        wrongMsg: '문법 땡! 여러 과일 중 사과를 가볍게 골라 부탁할 때는 선택 조사 "나"를 써야 해요!',
        wrongSpeech: '땡! 사과나 주세요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! "사과" 끝에 받침이 없어서 선택 조사 👉 "나"가 정답! (사과나 주세요.)',
    correctSpeech: '정답! 사과나 주세요!',
  },
  {
    id: 'beoseu',
    prefix: '학교에',
    noun: '버스',
    predicate: '타고 가요',
    correctList: ['나'],
    wrongFeedback: {
      이나: {
        boardBanner: '팅~!! "버스이나 타고 가요?!" 받침이 없잖아!! 💢',
        wrongMsg: '문법 땡! "버스" 끝 글자 "스"에 받침이 없어요! 받침이 없을 때는 "나"가 와야 해요!',
        wrongSpeech: '땡! 버스에는 받침이 없어서 버스나가 맞아요!',
      },
      까지: {
        boardBanner: '휘이잉~!! "학교에 버스까지 타고 가요?!" 버스가 학교 안으로 돌진!! 🚀',
        wrongMsg: '비문 개그! 교통수단 중 버스를 선택해서 탄다는 뜻이므로 "버스나 타고 가요"가 맞아요!',
        wrongSpeech: '으악! 버스가 교실로 들어가겠어요!',
        isSpaceGag: true,
        boardReplace: '버스 돌진!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! "버스" 받침 없음 + 교통수단 선택 👉 "나"! (학교에 버스나 타고 가요.)',
    correctSpeech: '학교에 버스나 타고 가요!',
  },
];

// 13단원 (학습지 18단원: 반복 마다) - 보기: 부터, 까지, 마다
export const UNIT_13_ITEMS: MultiParticleQuestionItem<Unit13NounId, Unit11To13Particle>[] = [
  {
    id: 'nal',
    noun: '날',
    predicate: '운동해요',
    correctList: ['마다'],
    wrongFeedback: {
      부터: {
        boardBanner: '팅~!! "날부터 운동해요?!" 어색한 표현!! 매일 반복은 "마다"!! 💢',
        wrongMsg: '문법 땡! "하루하루 빠짐없이 매일" 반복된다는 뜻은 "날 + 마다(날마다)"라고 해야 해요!',
        wrongSpeech: '땡! 매일 반복될 때는 날마다 운동해요가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "날까지 운동해요?!" 무슨 날인지 몰라!! 반복은 "마다"!! 💢',
        wrongMsg: '문법 땡! "매일매일"이라는 반복 습관을 말할 때는 끝("까지")이 아니라 반복 조사 "마다"가 와야 해요!',
        wrongSpeech: '땡! 날마다 운동해요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! "매일 반복"을 뜻하는 "날" 뒤에는 👉 "마다"가 정답! (날마다 운동해요.)',
    correctSpeech: '정답! 날마다 운동해요!',
  },
  {
    id: 'achim',
    noun: '아침',
    predicate: '우유를 마셔요',
    correctList: ['마다'],
    wrongFeedback: {
      부터: {
        boardBanner: '팅~!! "아침부터 우유를 마셔요?!" 매일 습관은 "마다"!! 💢',
        wrongMsg: '문법 땡! 하루에 한 번씩 "매일 아침마다" 반복하는 습관을 말할 때는 반복 조사 "마다"가 정답이에요!',
        wrongSpeech: '땡! 매일 습관은 아침마다 우유를 마셔요가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "아침까지 우유를 마셔요?!" 밤새 우유만 마셨니?! 💢',
        wrongMsg: '문법 땡! 밤새 마셨다는 뜻이 되어 버려요! "매일 아침"이라는 반복 뜻일 땐 "마다"가 와야 해요!',
        wrongSpeech: '땡! 아침마다 우유를 마셔요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 매일 반복되는 시간 "아침" 뒤에는 👉 "마다"가 정답! (아침마다 우유를 마셔요.)',
    correctSpeech: '정답! 아침마다 우유를 마셔요!',
  },
  {
    id: 'jumal',
    noun: '주말',
    predicate: '도서관에 가요',
    correctList: ['마다'],
    wrongFeedback: {
      부터: {
        boardBanner: '팅~!! "주말부터 도서관에 가요?!" 토·일 내내 반복은 "마다"!! 💢',
        wrongMsg: '문법 땡! 매주 주말이 돌아올 때마다 빠짐없이 간다는 뜻은 "주말마다"가 정답이에요!',
        wrongSpeech: '땡! 주말마다 도서관에 가요가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "주말까지 도서관에 가요?!" 주말이 끝이 아니야!! 💢',
        wrongMsg: '문법 땡! 끝 시점이 아니라 "매주 주말이면 늘"이라는 반복을 뜻할 땐 "마다"를 써야 해요!',
        wrongSpeech: '땡! 주말마다 도서관에 가요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 매주 반복되는 "주말" 뒤에는 👉 "마다"가 정답! (주말마다 도서관에 가요.)',
    correctSpeech: '정답! 주말마다 도서관에 가요!',
  },
  {
    id: 'gyosil',
    noun: '교실',
    predicate: '칠판이 있어요',
    correctList: ['마다'],
    wrongFeedback: {
      부터: {
        boardBanner: '팅~!! "교실부터 칠판이 있어요?!" 모든 교실에 하나씩은 "마다"!! 💢',
        wrongMsg: '문법 땡! 1반, 2반, 3반 "모든 교실 하나하나에 빠짐없이" 있다는 뜻일 때는 "마다"가 와야 해요!',
        wrongSpeech: '땡! 모든 교실 빠짐없이는 교실마다가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "교실까지 칠판이 있어요?!" 교실 밖 복도에 있다니?! 💢',
        wrongMsg: '문법 땡! "모든 교실에 각각" 칠판이 있다는 뜻이므로 "까지"가 아니라 "마다"가 정답이에요!',
        wrongSpeech: '땡! 교실마다 칠판이 있어요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! "모든 교실에 빠짐없이"를 뜻할 때는 👉 "마다"가 정답! (교실마다 칠판이 있어요.)',
    correctSpeech: '정답! 교실마다 칠판이 있어요!',
  },
  {
    id: 'saram',
    prefix: '교실의',
    noun: '사람',
    predicate: '생각이 달라요',
    correctList: ['마다'],
    wrongFeedback: {
      부터: {
        boardBanner: '팅~!! "사람부터 생각이 달라요?!" 한 명 한 명 각각은 "마다"!! 💢',
        wrongMsg: '문법 땡! 각 사람 한 명 한 명 모두 다르다는 뜻일 때는 시작("부터")이 아니라 "사람마다"를 써야 해요!',
        wrongSpeech: '땡! 교실의 사람마다 생각이 달라요가 맞아요!',
      },
      까지: {
        boardBanner: '팅~!! "사람까지 생각이 달라요?!" 사람 각각의 뜻은 "마다"!! 💢',
        wrongMsg: '문법 땡! 사람 한 명 한 명 모두가 각각 다르다는 뜻이므로 반복·포함 조사 "마다"가 정답이에요!',
        wrongSpeech: '땡! 교실의 사람마다 생각이 달라요가 맞아요!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 모든 사람 각각 + "생각이 달라요" 👉 "마다"! (교실의 사람마다 생각이 달라요.)',
    correctSpeech: '교실의 사람마다 생각이 달라요!',
  },
];

// 14단원 (학습지 20단원: 한정 만) - 보기: 만, 밖에, 보다
export const UNIT_14_ITEMS: MultiParticleQuestionItem<Unit14NounId, Unit14To16Particle>[] = [
  {
    id: 'mul',
    noun: '물',
    predicate: '마셔요',
    correctList: ['만'],
    wrongFeedback: {
      밖에: {
        boardBanner: '팅~!! "물밖에 마셔요?!" 뒤에 부정어(안/없다)가 없잖아!! 💢',
        wrongMsg: '핵심 규칙! "밖에"는 뒤가 "안 마셔요 / 없어요"처럼 부정어일 때만 써요! 긍정문 "마셔요" 앞엔 "만"이 정답!',
        wrongSpeech: '땡! 긍정문 마셔요 앞에는 물만이 맞아요!',
      },
      보다: {
        boardBanner: '팅~!! "물보다 마셔요?!" 물을 누구랑 비교하니?! 💢',
        wrongMsg: '문법 땡! "보다"는 두 개를 비교할 때 써요! 다른 건 안 마시고 오직 물 하나만 마실 땐 "만"이 와야 해요!',
        wrongSpeech: '땡! 물만 마셔요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 긍정문에서 오직 하나를 한정할 때는 👉 "만"이 정답! (물만 마셔요.)',
    correctSpeech: '정답! 물만 마셔요!',
  },
  {
    id: 'na',
    noun: '나',
    predicate: '알아요',
    correctList: ['만'],
    wrongFeedback: {
      밖에: {
        boardBanner: '팅~!! "나밖에 알아요?!" 뒤에 "몰라요/없어요"가 아니잖아!! 💢',
        wrongMsg: '핵심 규칙! "밖에" 뒤엔 반드시 "없어요 / 몰라요" 같은 부정어가 와야 해요! 긍정 동사 "알아요" 앞엔 "만"!',
        wrongSpeech: '땡! 알아요 앞에는 밖에가 못 오고 나만이 맞아요!',
      },
      보다: {
        boardBanner: '휘이잉~!! "나보다 알아요?!" 내가 지식 대결 상대니?! 🚀',
        wrongMsg: '비문 개그! 다른 사람 없이 오직 나 혼자만 안다는 뜻인데 비교 조사 "보다"를 써서 내가 날아가 버렸어요!',
        wrongSpeech: '으악! 나보다 알아요가 무슨 말이야!',
        isSpaceGag: true,
        boardReplace: '비문 폭발!',
      },
    },
    correctMsg: '🎉 정답! 오직 나 혼자라는 한정 + 긍정문에는 👉 "만"이 정답! (나만 알아요.)',
    correctSpeech: '정답! 나만 알아요!',
  },
  {
    id: 'hana',
    prefix: '사탕을',
    noun: '하나',
    predicate: '먹어요',
    correctList: ['만'],
    wrongFeedback: {
      밖에: {
        boardBanner: '팅~!! "하나밖에 먹어요?!" "안 먹어요"가 아니라 긍정 "먹어요"잖아!! 💢',
        wrongMsg: '핵심 규칙! "밖에"는 뒤에 부정어("없어요 / 안 먹어요")가 올 때만! 긍정문 "먹어요" 앞엔 "만"이 와야 해요!',
        wrongSpeech: '땡! 긍정문 먹어요 앞에는 하나만이 맞아요!',
      },
      보다: {
        boardBanner: '팅~!! "사탕을 하나보다 먹어요?!" 비교 말이 아니잖아!! 💢',
        wrongMsg: '문법 땡! 개수를 하나뿐으로 한정해서 말할 때는 비교 "보다"가 아니라 한정 조사 "만"이 정답이에요!',
        wrongSpeech: '땡! 사탕을 하나만 먹어요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 수량을 하나뿐으로 한정할 때는 👉 "만"이 정답! (사탕을 하나만 먹어요.)',
    correctSpeech: '정답! 사탕을 하나만 먹어요!',
  },
  {
    id: 'oneul',
    noun: '오늘',
    predicate: '쉬어요',
    correctList: ['만'],
    wrongFeedback: {
      밖에: {
        boardBanner: '팅~!! "오늘밖에 쉬어요?!" 뒤에 "안 쉬어요"가 아니잖아!! 💢',
        wrongMsg: '핵심 규칙! "밖에" 뒤엔 부정어가 와야 해요! 긍정 서술어 "쉬어요"와 짝꿍이 되는 한정은 "만"이에요!',
        wrongSpeech: '땡! 쉬어요 앞에는 오늘만이 맞아요!',
      },
      보다: {
        boardBanner: '팅~!! "오늘보다 쉬어요?!" 비교 대상이 없잖아!! 💢',
        wrongMsg: '문법 땡! 다른 날은 안 쉬고 오직 오늘 하루만 쉰다는 뜻이므로 한정 조사 "만"이 정답이에요!',
        wrongSpeech: '땡! 오늘만 쉬어요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 오직 오늘 하루만 쉴 때는 👉 "만"이 정답! (오늘만 쉬어요.)',
    correctSpeech: '정답! 오늘만 쉬어요!',
  },
  {
    id: 'sagwa',
    prefix: '동생은',
    noun: '사과',
    predicate: '먹어요',
    correctList: ['만'],
    wrongFeedback: {
      밖에: {
        boardBanner: '팅~!! "사과밖에 먹어요?!" 부정어가 없으면 "밖에" 불가!! 💢',
        wrongMsg: '핵심 규칙! "사과밖에 안 먹어요"처럼 부정어가 있을 때만 "밖에"! 긍정 동사 "먹어요" 앞엔 "만"이 정답!',
        wrongSpeech: '땡! 먹어요 앞에는 사과만이 맞아요!',
      },
      보다: {
        boardBanner: '팅~!! "동생은 사과보다 먹어요?!" 사과랑 뭘 비교해?! 💢',
        wrongMsg: '문법 땡! 다른 과일 말고 오직 사과를 골라 먹는다는 뜻이므로 "만"을 써야 해요!',
        wrongSpeech: '땡! 동생은 사과만 먹어요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 다른 것 없이 사과만 한정할 때는 👉 "만"이 정답! (동생은 사과만 먹어요.)',
    correctSpeech: '정답! 동생은 사과만 먹어요!',
  },
];

// 15단원 (학습지 21단원: 부정 한정 ★ 밖에 + 없다/안) - "만" 오답 시 부정어 결합 규칙 안내
export const UNIT_15_ITEMS: MultiParticleQuestionItem<Unit15NounId, Unit14To16Particle>[] = [
  {
    id: 'hana',
    prefix: '연필이',
    noun: '하나',
    predicate: '없어요',
    correctList: ['밖에'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! 뒤에 "없어요"(부정어)가 왔네?! 짝꿍은 "밖에"!! 💢',
        wrongMsg: '★ 부정어 결합 규칙! 뒤에 "없어요 / 안 ~" 같은 부정어가 오면 "만"이 아니라 "밖에"가 짝꿍이에요! (하나밖에 없어요 ✅ / 하나만 있어요 ✅)',
        wrongSpeech: '땡! 뒤에 없어요 같은 부정어가 올 때는 하나밖에 없어요가 맞아요!',
      },
      보다: {
        boardBanner: '휘이잉~!! "연필이 하나보다 없어요?!" 비교가 아니잖아!! 🚀',
        wrongMsg: '비문 개그! 1개 남았다는 뜻인데 비교 조사 "보다"를 써서 연필이 우주로 날아가 버렸어요! 부정어 앞엔 "밖에"!',
        wrongSpeech: '으악! 하나보다 없어요는 말이 안 돼요!',
        isSpaceGag: true,
        boardReplace: '연필 발사!',
      },
    },
    correctMsg: '★ 부정 한정 정답! 뒤에 부정어("없어요")가 와서 👉 "밖에"가 정답! (연필이 하나밖에 없어요.)',
    correctSpeech: '정답! 연필이 하나밖에 없어요!',
  },
  {
    id: 'mul',
    prefix: '집에',
    noun: '물',
    predicate: '없어요',
    correctList: ['밖에'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! 뒤에 "없어요"(부정어)가 있잖아!! "밖에"를 써야지!! 💢',
        wrongMsg: '★ 부정어 결합 규칙! "만"은 긍정("물만 있어요")과 어울리고, 뒤에 부정어("없어요")가 올 때는 반드시 "밖에"를 써야 해요!',
        wrongSpeech: '땡! 뒤에 없어요가 있을 때는 물밖에 없어요가 맞아요!',
      },
      보다: {
        boardBanner: '휘이잉~!! "집에 물보다 없어요?!" 물컵이 날아가 버렸다!! 🚀',
        wrongMsg: '비문 개그! 다른 음료는 없고 물만 남아 있다는 뜻이에요! 부정어 "없어요"의 짝꿍은 "밖에"!',
        wrongSpeech: '으악! 물보다 없어요가 무슨 말이야!',
        isSpaceGag: true,
        boardReplace: '물컵 발사!',
      },
    },
    correctMsg: '★ 부정 한정 정답! 뒤에 부정어("없어요")와 찰떡궁합 👉 "밖에"가 정답! (집에 물밖에 없어요.)',
    correctSpeech: '정답! 집에 물밖에 없어요!',
  },
  {
    id: 'na',
    prefix: '교실에',
    noun: '나',
    predicate: '없어요',
    correctList: ['밖에'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! "나만 없어요"면 내가 없다는 반대 뜻이 돼 버려!! 💢',
        wrongMsg: '★ 뜻 완전 달라짐 주의! "교실에 나만 없어요"는 내가 빠졌다는 뜻이고, 나 혼자만 있다는 뜻에 부정어 "없어요"를 쓸 땐 "나밖에 없어요"예요!',
        wrongSpeech: '조심! 나만 없어요는 뜻이 반대예요! 나밖에 없어요가 맞아요!',
      },
      보다: {
        boardBanner: '휘이잉~!! "교실에 나보다 없어요?!" 내가 우주로 날아갔다!! 🚀',
        wrongMsg: '비문 개그! 비교 조사가 아니라 "나 말고 아무도 없다"는 뜻이므로 "밖에"가 와야 해요!',
        wrongSpeech: '으악! 나보다 없어요는 비문이에요!',
        isSpaceGag: true,
        boardReplace: '나 탈출!',
      },
    },
    correctMsg: '★ 부정 한정 정답! "나 혼자뿐" + 부정어("없어요") 👉 "밖에"가 정답! (교실에 나밖에 없어요.)',
    correctSpeech: '정답! 교실에 나밖에 없어요!',
  },
  {
    id: 'sigan',
    prefix: '조금',
    noun: '시간',
    predicate: '없어요',
    correctList: ['밖에'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! "없어요"(부정어)와 함께 쓰려면 "밖에"가 짝꿍!! 💢',
        wrongMsg: '★ 부정어 결합 규칙! 뒤에 "없어요"처럼 부정 표현이 이어질 때는 "만" 대신 "밖에"를 써야 자연스러워요!',
        wrongSpeech: '땡! 뒤에 없어요가 올 때는 시간밖에 없어요가 맞아요!',
      },
      보다: {
        boardBanner: '휘이잉~!! "시간보다 없어요?!" 모래시계가 우주로 날아갔다!! 🚀',
        wrongMsg: '비문 개그! 시간이 아주 적게 남았다는 뜻이라 비교 "보다"는 비문! 부정 한정 "밖에"가 정답이에요!',
        wrongSpeech: '으악! 모래시계가 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '모래시계 슝!',
      },
    },
    correctMsg: '★ 부정 한정 정답! 뒤에 부정어("없어요")가 와서 👉 "밖에"가 정답! (조금 시간밖에 없어요.)',
    correctSpeech: '정답! 조금 시간밖에 없어요!',
  },
  {
    id: 'ppang',
    prefix: '아침에',
    noun: '빵',
    predicate: '안 먹어요',
    isRedPredicate: true,
    correctList: ['밖에'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! "빵만 안 먹어요"는 빵 빼고 다 먹는다는 뜻이 돼!! 💢',
        wrongMsg: '★ 뜻 완전 주의! "빵만 안 먹어요"는 빵을 싫어한다는 뜻! 오직 빵만 먹는다는 뜻에 부정 "안 먹어요"가 오면 "빵밖에 안 먹어요"예요!',
        wrongSpeech: '조심! 빵만 안 먹어요는 뜻이 반대예요! 빵밖에 안 먹어요가 맞아요!',
      },
      보다: {
        boardBanner: '휘이잉~!! "아침에 빵보다 안 먹어요?!" 식빵이 날아갔다!! 🚀',
        wrongMsg: '비문 개그! 비교가 아니라 "빵 이외에는 안 먹는다"는 뜻이므로 부정 한정 조사 "밖에"가 정답이에요!',
        wrongSpeech: '으악! 식빵이 우주로 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '식빵 발사!',
      },
    },
    correctMsg: '🔥 보스 부정 호응 정답! 부정어("안 먹어요")와 찰떡궁합 👉 "밖에"! (아침에 빵밖에 안 먹어요.)',
    correctSpeech: '아침에 빵밖에 안 먹어요!',
  },
];

// 16단원 (학습지 22단원: 비교 보다) - 보기: 만, 밖에, 보다
export const UNIT_16_ITEMS: MultiParticleQuestionItem<Unit16NounId, Unit14To16Particle>[] = [
  {
    id: 'hyeong',
    prefix: '동생이',
    noun: '형',
    predicate: '빨라요',
    correctList: ['보다'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! "동생이 형만 빨라요?!" 동생과 형을 비교하잖아!! 💢',
        wrongMsg: '문법 땡! 동생과 형 두 사람의 달리기 속도를 서로 비교할 때는 비교 기준 조사 "보다"가 와야 해요!',
        wrongSpeech: '땡! 동생이 형보다 빨라요가 맞아요!',
      },
      밖에: {
        boardBanner: '팅~!! "형밖에 빨라요?!" 긍정 형용사 앞엔 "밖에" 불가!! 💢',
        wrongMsg: '문법 땡! "밖에"는 부정어("없어요/안") 전용이고, 두 대상을 비교할 때는 "보다"를 써야 해요!',
        wrongSpeech: '땡! 비교할 때는 형보다 빨라요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 비교하는 기준 "형" 뒤에는 👉 "보다"가 정답! (동생이 형보다 빨라요.)',
    correctSpeech: '정답! 동생이 형보다 빨라요!',
  },
  {
    id: 'eoje',
    prefix: '오늘이',
    noun: '어제',
    predicate: '따뜻해요',
    correctList: ['보다'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! "오늘이 어제만 따뜻해요?!" 어제와 오늘을 비교하잖아!! 💢',
        wrongMsg: '문법 땡! "오늘"과 "어제"의 날씨를 서로 비교하고 있어요! 비교 기준 뒤에는 "보다"가 정답이에요!',
        wrongSpeech: '땡! 오늘이 어제보다 따뜻해요가 맞아요!',
      },
      밖에: {
        boardBanner: '팅~!! "어제밖에 따뜻해요?!" 부정어도 없고 비교 문장이야!! 💢',
        wrongMsg: '문법 땡! "따뜻해요"는 긍정이고 어제·오늘을 비교하고 있으므로 비교 조사 "보다"가 와야 해요!',
        wrongSpeech: '땡! 오늘이 어제보다 따뜻해요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 비교 기준 "어제" 뒤에는 👉 "보다"가 정답! (오늘이 어제보다 따뜻해요.)',
    correctSpeech: '정답! 오늘이 어제보다 따뜻해요!',
  },
  {
    id: 'beoseu',
    prefix: '기차가',
    noun: '버스',
    predicate: '빨라요',
    correctList: ['보다'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! "기차가 버스만 빨라요?!" 기차와 버스를 비교하잖아!! 💢',
        wrongMsg: '문법 땡! 기차와 버스의 속도를 비교해 "더 빠르다"고 말할 때는 비교 조사 "보다"를 써야 해요!',
        wrongSpeech: '땡! 기차가 버스보다 빨라요가 맞아요!',
      },
      밖에: {
        boardBanner: '팅~!! "버스밖에 빨라요?!" 부정어도 없고 비교 문장이야!! 💢',
        wrongMsg: '문법 땡! 부정 표현이 없고 두 교통수단을 비교하는 문장이라서 비교 조사 "보다"가 정답이에요!',
        wrongSpeech: '땡! 기차가 버스보다 빨라요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 비교 기준 "버스" 뒤에는 👉 "보다"가 정답! (기차가 버스보다 빨라요.)',
    correctSpeech: '정답! 기차가 버스보다 빨라요!',
  },
  {
    id: 'sagwa',
    prefix: '수박이',
    noun: '사과',
    predicate: '커요',
    correctList: ['보다'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! "수박이 사과만 커요?!" 수박과 사과 크기를 비교하잖아!! 💢',
        wrongMsg: '문법 땡! 수박과 사과 크기를 비교할 때는 "만"이 아니라 비교 조사 "보다"가 와야 해요!',
        wrongSpeech: '땡! 수박이 사과보다 커요가 맞아요!',
      },
      밖에: {
        boardBanner: '팅~!! "사과밖에 커요?!" 긍정 "커요" 앞엔 "밖에" 불가!! 💢',
        wrongMsg: '문법 땡! "커요"는 긍정 형용사고 과일 둘을 비교하는 문장이므로 "보다"가 정답이에요!',
        wrongSpeech: '땡! 수박이 사과보다 커요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 비교 기준 "사과" 뒤에는 👉 "보다"가 정답! (수박이 사과보다 커요.)',
    correctSpeech: '정답! 수박이 사과보다 커요!',
  },
  {
    id: 'nugu10',
    prefix: '우리 친구가',
    noun: '누구',
    predicate: '빨라요',
    correctList: ['보다'],
    wrongFeedback: {
      만: {
        boardBanner: '팅~!! "누구만 빨라요?!" 다른 모든 사람과 비교잖아!! 💢',
        wrongMsg: '문법 땡! 친구를 다른 모든 사람("누구")과 비교해서 제일 빠르다고 말할 때는 "보다"가 와야 해요!',
        wrongSpeech: '땡! 우리 친구가 누구보다 빨라요가 맞아요!',
      },
      밖에: {
        boardBanner: '팅~!! "누구밖에 빨라요?!" 부정어가 없잖아!! 💢',
        wrongMsg: '문법 땡! 비교 대상 "누구" 뒤에 긍정 형용사 "빨라요"가 왔으므로 비교 조사 "보다"가 정답이에요!',
        wrongSpeech: '땡! 우리 친구가 누구보다 빨라요가 맞아요!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 주어 "우리 친구가" + 비교 대상 "누구" 👉 "보다"! (우리 친구가 누구보다 빨라요.)',
    correctSpeech: '우리 친구가 누구보다 빨라요!',
  },
];

// 17단원 (학습지 24단원: 비유 처럼, 같이) - 보기: 처럼, 같이, 의, 끼리
export const UNIT_17_ITEMS: MultiParticleQuestionItem<Unit17NounId, Unit17To19Particle>[] = [
  {
    id: 'tokki',
    noun: '토끼',
    predicate: '껑충 뛰어요',
    correctList: ['처럼', '같이'],
    wrongFeedback: {
      의: {
        boardBanner: '팅~!! "토끼의 껑충 뛰어요?!" 소유가 아니라 비유잖아!! 💢',
        wrongMsg: '문법 땡! "의"는 주인(소유)을 나타내는 말이에요! 토끼와 비슷하게 뛴다고 비유할 때는 "처럼"이나 "같이"가 정답!',
        wrongSpeech: '땡! 토끼같이 껑충 뛰어요가 맞아요!',
      },
      끼리: {
        boardBanner: '휘이잉~!! "토끼끼리 껑충 뛰어요?!" 토끼들이 모여 있니?! 🚀',
        wrongMsg: '비문 개그! "끼리"는 여럿이 함께 어울릴 때 써요! 토끼를 흉내 내듯 뛸 땐 비유 조사 "처럼/같이"가 와야 해요!',
        wrongSpeech: '으악! 토끼끼리가 아니라 토끼같이가 맞지!',
        isSpaceGag: true,
        boardReplace: '토끼 점프!',
      },
    },
    correctMsg: '🎉 정답! 비슷한 모습을 빗대어 말할 때는 👉 "처럼 / 같이"가 정답! (토끼같이 껑충 뛰어요.)',
    correctSpeech: '정답! 토끼같이 껑충 뛰어요!',
    correctMsgByChoice: {
      처럼: '🎉 정답! 비슷한 모습을 빗대어 말할 때는 👉 "처럼"이 정답! (토끼처럼 껑충 뛰어요.)',
      같이: '🎉 정답! 비슷한 모습을 빗대어 말할 때는 👉 "같이"도 정답! (토끼같이 껑충 뛰어요.)',
    },
  },
  {
    id: 'gureum',
    prefix: '솜사탕이',
    noun: '구름',
    predicate: '하얘요',
    correctList: ['처럼', '같이'],
    wrongFeedback: {
      의: {
        boardBanner: '팅~!! "솜사탕이 구름의 하얘요?!" 구름 것이 아니잖아!! 💢',
        wrongMsg: '문법 땡! 솜사탕이 구름과 똑같이 하얗다고 비유할 때는 소유 조사 "의"가 아니라 비유 조사 "처럼/같이"가 와야 해요!',
        wrongSpeech: '땡! 구름같이 하얘요가 맞아요!',
      },
      끼리: {
        boardBanner: '휘이잉~!! "구름끼리 하얘요?!" 구름들이 회의하니?! 🚀',
        wrongMsg: '비문 개그! 구름은 함께 어울리는 사람 무리가 아니라서 "끼리"는 비문! 구름같이 하얗다고 비유해요!',
        wrongSpeech: '으악! 구름이 우주로 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '구름 슝~',
      },
    },
    correctMsg: '🎉 정답! 구름과 똑같다고 비유할 때는 👉 "처럼 / 같이"가 정답! (솜사탕이 구름같이 하얘요.)',
    correctSpeech: '정답! 솜사탕이 구름같이 하얘요!',
    correctMsgByChoice: {
      처럼: '🎉 정답! 구름과 똑같다고 비유할 때는 👉 "처럼"이 정답! (솜사탕이 구름처럼 하얘요.)',
      같이: '🎉 정답! 구름과 똑같다고 비유할 때는 👉 "같이"도 정답! (솜사탕이 구름같이 하얘요.)',
    },
  },
  {
    id: 'chingu',
    prefix: '언니와',
    noun: '친구',
    predicate: '지내요',
    correctList: ['처럼', '같이'],
    wrongFeedback: {
      의: {
        boardBanner: '팅~!! "언니와 친구의 지내요?!" 말이 끊겼잖아!! 💢',
        wrongMsg: '문법 땡! "의" 뒤에는 "친구의 가방"처럼 명사가 와야 해요! 친구와 똑같이 다정하게 지낼 땐 "처럼/같이"가 정답!',
        wrongSpeech: '땡! 언니와 친구처럼 지내요가 맞아요!',
      },
      끼리: {
        boardBanner: '팅~!! "언니와 친구끼리 지내요?!" 어색한 문장!! 💢',
        wrongMsg: '문법 땡! 앞의 "언니와"가 있어서 언니와 친구와 다름없이 가깝게 지낸다는 비유 "친구처럼/친구같이"가 자연스러워요!',
        wrongSpeech: '땡! 언니와 친구처럼 지내요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! "친구와 똑같이"라는 비유에는 👉 "처럼 / 같이"가 정답! (언니와 친구처럼 지내요.)',
    correctSpeech: '정답! 언니와 친구처럼 지내요!',
    correctMsgByChoice: {
      처럼: '🎉 정답! "친구와 똑같이"라는 비유에는 👉 "처럼"이 정답! (언니와 친구처럼 지내요.)',
      같이: '🎉 정답! "친구와 똑같이"라는 비유에는 👉 "같이"도 정답! (언니와 친구같이 지내요.)',
    },
  },
  {
    id: 'nun',
    prefix: '종이가',
    noun: '눈',
    predicate: '하얘요',
    correctList: ['처럼', '같이'],
    wrongFeedback: {
      의: {
        boardBanner: '팅~!! "종이가 눈의 하얘요?!" 소유 조사 "의" 불가!! 💢',
        wrongMsg: '문법 땡! 종이가 하얀 겨울 눈과 비슷하다고 비유하는 문장이므로 "의"가 아니라 "처럼/같이"가 와야 해요!',
        wrongSpeech: '땡! 종이가 눈처럼 하얘요가 맞아요!',
      },
      끼리: {
        boardBanner: '휘이잉~!! "눈끼리 하얘요?!" 눈송이가 우주로 날아갔다!! 🚀',
        wrongMsg: '비문 개그! 눈은 사람이 아니라서 "끼리"를 못 써요! 비유 표현에는 "눈처럼/눈같이"가 정답이에요!',
        wrongSpeech: '으악! 눈송이가 우주로 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '눈송이 슝!',
      },
    },
    correctMsg: '🎉 정답! 눈과 같다고 비유할 때는 👉 "처럼 / 같이"가 정답! (종이가 눈처럼 하얘요.)',
    correctSpeech: '정답! 종이가 눈처럼 하얘요!',
    correctMsgByChoice: {
      처럼: '🎉 정답! 눈과 같다고 비유할 때는 👉 "처럼"이 정답! (종이가 눈처럼 하얘요.)',
      같이: '🎉 정답! 눈과 같다고 비유할 때는 👉 "같이"도 정답! (종이가 눈같이 하얘요.)',
    },
  },
  {
    id: 'byeol',
    prefix: '아이 눈이',
    noun: '별',
    predicate: '반짝여요',
    correctList: ['처럼', '같이'],
    wrongFeedback: {
      의: {
        boardBanner: '팅~!! "아이 눈이 별의 반짝여요?!" 어색한 비문!! 💢',
        wrongMsg: '문법 땡! 빛나는 별과 비슷하게 반짝인다는 뜻이므로 소유 "의"가 아니라 비유 조사 "처럼/같이"가 와야 해요!',
        wrongSpeech: '땡! 아이 눈이 별처럼 반짝여요가 맞아요!',
      },
      끼리: {
        boardBanner: '휘이잉~!! "별끼리 반짝여요?!" 별이 우주선 타고 날아갔다!! 🚀',
        wrongMsg: '비문 개그! 별에 비유해 눈이 반짝인다는 문장이므로 "별처럼/별같이"가 정답이에요!',
        wrongSpeech: '으악! 별이 우주로 날아가 버렸어!',
        isSpaceGag: true,
        boardReplace: '별똥별 슝!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 반짝이는 모습을 별에 비유 👉 "처럼 / 같이"! (아이 눈이 별처럼 반짝여요.)',
    correctSpeech: '아이 눈이 별처럼 반짝여요!',
    correctMsgByChoice: {
      처럼: '🔥 보스 호응 정답! 반짝이는 모습을 별에 비유 👉 "처럼"! (아이 눈이 별처럼 반짝여요.)',
      같이: '🔥 보스 호응 정답! 반짝이는 모습을 별에 비유 👉 "같이"! (아이 눈이 별같이 반짝여요.)',
    },
  },
];

// 18단원 (학습지 25단원: 소유 ★ 의, 내, 네, 제) - 보기: 처럼, 의, 끼리
export const UNIT_18_ITEMS: MultiParticleQuestionItem<Unit18NounId, Unit17To19Particle>[] = [
  {
    id: 'chingu',
    noun: '친구',
    predicate: '가방이 예뻐요',
    correctList: ['의'],
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "친구처럼 가방이 예뻐요?!" 가방 주인이 누구야?! 💢',
        wrongMsg: '문법 땡! 그 가방이 "친구의 것(소유)"임을 말할 때는 비유 "처럼"이 아니라 소유 조사 "의"가 와야 해요!',
        wrongSpeech: '땡! 친구의 가방이 예뻐요가 맞아요!',
      },
      끼리: {
        boardBanner: '팅~!! "친구끼리 가방이 예뻐요?!" 말이 안 되잖아!! 💢',
        wrongMsg: '문법 땡! 명사("가방") 앞에서 누구의 물건인지 꾸며 줄 때는 소유 조사 "의"가 정답이에요!',
        wrongSpeech: '땡! 친구의 가방이 예뻐요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 소유·주인을 나타낼 때는 👉 "의"가 정답! (친구의 가방이 예뻐요.)',
    correctSpeech: '정답! 친구의 가방이 예뻐요!',
  },
  {
    id: 'seonsaengnim',
    noun: '선생님',
    predicate: '책이에요',
    correctList: ['의'],
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "선생님처럼 책이에요?!" 선생님이 책이니?! 💢',
        wrongMsg: '문법 땡! 이 책의 주인이 선생님이라는 소유 뜻이므로 "선생님의 책이에요"라고 해야 해요!',
        wrongSpeech: '땡! 선생님의 책이에요가 맞아요!',
      },
      끼리: {
        boardBanner: '팅~!! "선생님끼리 책이에요?!" 소유 앞엔 "의"!! 💢',
        wrongMsg: '문법 땡! 책이 누구의 것인지 나타낼 때는 무리("끼리")가 아니라 소유 조사 "의"가 정답이에요!',
        wrongSpeech: '땡! 선생님의 책이에요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 책의 주인 "선생님" 뒤에는 👉 "의"가 정답! (선생님의 책이에요.)',
    correctSpeech: '정답! 선생님의 책이에요!',
  },
  {
    id: 'na25',
    noun: '나',
    predicate: '연필이 있어요',
    correctList: ['의'],
    transformedWord: '내',
    transformedHead: '내',
    transformedTail: '',
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "나처럼 연필이 있어요?!" 연필 주인은 "내"! 💢',
        wrongMsg: '★ 소유 변신 규칙! "나 + 의"가 만나면 줄여서 ★ "내"가 돼요! (내 연필이 있어요.)',
        wrongSpeech: '땡! 나 더하기 의는 내! 내 연필이 있어요가 맞아요!',
      },
      끼리: {
        boardBanner: '휘이잉~!! "나끼리 연필이 있어요?!" 나 혼자서는 "끼리" 불가!! 🚀',
        wrongMsg: '비문 개그! "끼리"는 여럿이 함께 있을 때만 써요! 연필 주인이 나일 때는 "나 + 의 -> 내"로 줄여 써야 해요!',
        wrongSpeech: '으악! 나 혼자서는 끼리를 못 써요!',
        isSpaceGag: true,
        boardReplace: '연필 발사!',
      },
    },
    correctMsg: '★ 변신 성공! "나" + "의" 👉 "내"로 줄여 말해요! (내 연필이 있어요.)',
    correctSpeech: '정답! 나 더하기 의는 내! 내 연필이 있어요!',
  },
  {
    id: 'neo25',
    prefix: '와,',
    noun: '너',
    predicate: '공책이 정말 크네!',
    correctList: ['의'],
    transformedWord: '네',
    transformedHead: '네',
    transformedTail: '',
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "너처럼 공책이 정말 크네?!" 공책 주인은 "네"! 💢',
        wrongMsg: '★ 소유 변신 규칙! "너 + 의"가 만나면 줄여서 ★ "네"가 돼요! (와, 네 공책이 정말 크네!)',
        wrongSpeech: '땡! 너 더하기 의는 네! 와, 네 공책이 정말 크네가 맞아요!',
      },
      끼리: {
        boardBanner: '휘이잉~!! "너끼리 공책이 정말 크네?!" 말이 안 되잖아!! 🚀',
        wrongMsg: '비문 개그! 공책 주인이 너일 때는 "너 + 의 -> 네"로 변신해요!',
        wrongSpeech: '으악! 너끼리 공책이 무슨 말이야!',
        isSpaceGag: true,
        boardReplace: '공책 비행!',
      },
    },
    correctMsg: '★ 변신 성공! "너" + "의" 👉 "네"로 줄여 말해요! (와, 네 공책이 정말 크네!)',
    correctSpeech: '정답! 너 더하기 의는 네! 와, 네 공책이 정말 크네!',
  },
  {
    id: 'jeo25',
    noun: '저',
    predicate: '우산이에요',
    correctList: ['의'],
    transformedWord: '제',
    transformedHead: '제',
    transformedTail: '',
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "저처럼 우산이에요?!" 겸손 소유는 "제"! 💢',
        wrongMsg: '★ 소유 변신 규칙! "저 + 의"가 만나면 높임 앞에서는 ★ "제"로 줄여 말해요! (제 우산이에요.)',
        wrongSpeech: '땡! 저 더하기 의는 제! 제 우산이에요가 맞아요!',
      },
      끼리: {
        boardBanner: '휘이잉~!! "저끼리 우산이에요?!" 우산이 로켓처럼 날아갔다!! 🚀',
        wrongMsg: '비문 개그! 내 물건을 공손하게 말할 때는 "저 + 의 -> 제"를 써야 해요!',
        wrongSpeech: '으악! 우산 타고 우주로 날아갔어!',
        isSpaceGag: true,
        boardReplace: '우산 발사!',
      },
    },
    correctMsg: '★ 변신 성공! "저" + "의" 👉 "제"로 줄여 말해요! (제 우산이에요.)',
    correctSpeech: '정답! 저 더하기 의는 제! 제 우산이에요!',
  },
];

// 19단원 (학습지 26단원: 무리·함께 끼리) - 보기: 끼리, 처럼, 의
export const UNIT_19_ITEMS: MultiParticleQuestionItem<Unit19NounId, Unit17To19Particle>[] = [
  {
    id: 'chingu',
    noun: '친구',
    predicate: '놀아요',
    correctList: ['끼리'],
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "친구처럼 놀아요?!" 친구들끼리 함께 노는 건 "끼리"!! 💢',
        wrongMsg: '문법 땡! 같은 반 친구들이 여럿이 함께 어울려 논다는 뜻이므로 무리·함께 조사 "끼리"가 정답이에요!',
        wrongSpeech: '땡! 친구끼리 놀아요가 맞아요!',
      },
      의: {
        boardBanner: '팅~!! "친구의 놀아요?!" 뒤에 물건(명사)이 없잖아!! 💢',
        wrongMsg: '문법 땡! "의" 뒤에는 "친구의 공"처럼 명사가 와야 해요! 여럿이 함께 논다는 뜻은 "친구끼리"예요!',
        wrongSpeech: '땡! 친구끼리 놀아요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 같은 무리가 함께 어울릴 때는 👉 "끼리"가 정답! (친구끼리 놀아요.)',
    correctSpeech: '정답! 친구끼리 놀아요!',
  },
  {
    id: 'uri',
    noun: '우리',
    predicate: '이야기해요',
    correctList: ['끼리'],
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "우리처럼 이야기해요?!" 우리들끼리 도란도란은 "끼리"!! 💢',
        wrongMsg: '문법 땡! 다른 사람 빼고 우리들끼리만 함께 이야기한다는 뜻이므로 "우리끼리"가 정답이에요!',
        wrongSpeech: '땡! 우리끼리 이야기해요가 맞아요!',
      },
      의: {
        boardBanner: '팅~!! "우리의 이야기해요?!" "이야기해요"는 동사야!! 💢',
        wrongMsg: '문법 땡! 동사 "이야기해요" 앞에는 소유 "의"를 쓸 수 없어요! 함께 어울린다는 뜻의 "우리끼리"가 와야 해요!',
        wrongSpeech: '땡! 우리끼리 이야기해요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! "우리들끼리 함께"라는 뜻에는 👉 "끼리"가 정답! (우리끼리 이야기해요.)',
    correctSpeech: '정답! 우리끼리 이야기해요!',
  },
  {
    id: 'namja',
    noun: '남자',
    predicate: '축구를 해요',
    correctList: ['끼리'],
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "남자처럼 축구를 해요?!" 남자아이들끼리 팀을 짠 거야!! 💢',
        wrongMsg: '문법 땡! 남학생들이 같은 편으로 모여서 축구를 한다는 뜻이므로 무리 조사 "남자끼리"가 정답이에요!',
        wrongSpeech: '땡! 남자끼리 축구를 해요가 맞아요!',
      },
      의: {
        boardBanner: '팅~!! "남자의 축구를 해요?!" 말이 안 이어지잖아!! 💢',
        wrongMsg: '문법 땡! "남자의" 뒤엔 물건이 와야 해요! 같은 무리끼리 함께한다는 뜻은 "남자끼리"예요!',
        wrongSpeech: '땡! 남자끼리 축구를 해요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 같은 무리 "남자"가 함께 모일 때는 👉 "끼리"가 정답! (남자끼리 축구를 해요.)',
    correctSpeech: '정답! 남자끼리 축구를 해요!',
  },
  {
    id: 'yeoja',
    noun: '여자',
    predicate: '춤을 춰요',
    correctList: ['끼리'],
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "여자처럼 춤을 춰요?!" 여학생들끼리 신나게 추는 거야!! 💢',
        wrongMsg: '문법 땡! 여학생들이 함께 모여 춤춘다는 뜻이므로 "여자끼리 춤을 춰요"가 정답이에요!',
        wrongSpeech: '땡! 여자끼리 춤을 춰요가 맞아요!',
      },
      의: {
        boardBanner: '팅~!! "여자의 춤을 춰요?!" 소유가 아니라 함께하는 무리 "끼리"!! 💢',
        wrongMsg: '문법 땡! 여럿이 같은 무리로 함께 춘다는 뜻이므로 무리·함께 조사 "끼리"를 써야 해요!',
        wrongSpeech: '땡! 여자끼리 춤을 춰요가 맞아요!',
      },
    },
    correctMsg: '🎉 정답! 같은 무리 "여자"가 함께 어울릴 때는 👉 "끼리"가 정답! (여자끼리 춤을 춰요.)',
    correctSpeech: '정답! 여자끼리 춤을 춰요!',
  },
  {
    id: 'haksaeng',
    prefix: '교실에서',
    noun: '학생',
    predicate: '공부해요',
    correctList: ['끼리'],
    wrongFeedback: {
      처럼: {
        boardBanner: '팅~!! "학생처럼 공부해요?!" 학생들끼리 모둠 공부 중!! 💢',
        wrongMsg: '문법 땡! 교실 안에서 학생들끼리 함께 모여 공부한다는 뜻이므로 "학생끼리"가 정답이에요!',
        wrongSpeech: '땡! 교실에서 학생끼리 공부해요가 맞아요!',
      },
      의: {
        boardBanner: '팅~!! "학생의 공부해요?!" 동사 앞엔 "끼리"!! 💢',
        wrongMsg: '문법 땡! "공부해요"는 동사이므로 소유 "의" 불가! 여럿이 함께 공부하는 뜻의 "학생끼리"가 정답이에요!',
        wrongSpeech: '땡! 교실에서 학생끼리 공부해요가 맞아요!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! 장소 "교실에서" + 학생들끼리 함께 공부 👉 "끼리"! (교실에서 학생끼리 공부해요.)',
    correctSpeech: '교실에서 학생끼리 공부해요!',
  },
];

// 20단원 (학습지 28단원: 높임 ★ 께서, 께) - 보기: 께서, 께, 야
export const UNIT_20_ITEMS: MultiParticleQuestionItem<Unit20NounId, Unit20To21Particle>[] = [
  {
    id: 'halmeoni',
    noun: '할머니',
    predicate: '웃으세요',
    correctList: ['께서'],
    wrongFeedback: {
      께: {
        boardBanner: '팅~!! "할머니께 웃으세요?!" 할머니가 주인공(주어)일 땐 "께서"!! 💢',
        wrongMsg: '문법 구별! 할머니에게 뭘 드리는 게 아니라 할머니가 직접 웃으시는 주어 자리이므로 "할머니께서"가 정답!',
        wrongSpeech: '땡! 주어를 높일 때는 할머니께서 웃으세요가 맞아요!',
      },
      야: {
        boardBanner: '으악!! "할머니야 웃으세요?!" 어른한테 반말 부름 큰일!! 🚀',
        wrongMsg: '예절 경보 개그! "야"는 친구나 동생을 부를 때 쓰는 말이에요! 할머니를 높여 말할 때는 "께서"를 써야 해요!',
        wrongSpeech: '으악! 할머니한테 야라고 하면 안 돼요!',
        isSpaceGag: true,
        boardReplace: '예절 경보!',
      },
    },
    correctMsg: '★ 높임 주어 정답! 행동하는 주체 어른("할머니") 뒤에는 👉 "께서"가 정답! (할머니께서 웃으세요.)',
    correctSpeech: '정답! 할머니께서 웃으세요!',
  },
  {
    id: 'seonsaengnim',
    noun: '선생님',
    predicate: '말씀하세요',
    correctList: ['께서'],
    wrongFeedback: {
      께: {
        boardBanner: '팅~!! "선생님께 말씀하세요?!" 주어 높임은 "께서"!! 💢',
        wrongMsg: '문법 구별! 선생님이 직접 말씀하시는 주어 자리이므로 대상 조사 "께"가 아니라 주어 높임 "께서"가 와야 해요!',
        wrongSpeech: '땡! 선생님이 말씀하시는 주어니까 선생님께서가 맞아요!',
      },
      야: {
        boardBanner: '으악!! "선생님야 말씀하세요?!" 선생님한테 반말을?! 🚀',
        wrongMsg: '예절 경보 개그! 선생님께 "야"라고 부르면 대참사! 높임 주어 "께서"를 써야 해요!',
        wrongSpeech: '으악! 선생님한테 야라니 큰일 났어요!',
        isSpaceGag: true,
        boardReplace: '예절 경보!',
      },
    },
    correctMsg: '★ 높임 주어 정답! 말씀하시는 분("선생님") 뒤에는 👉 "께서"가 정답! (선생님께서 말씀하세요.)',
    correctSpeech: '정답! 선생님께서 말씀하세요!',
  },
  {
    id: 'bumonim',
    noun: '부모님',
    predicate: '인사해요',
    correctList: ['께'],
    wrongFeedback: {
      께서: {
        boardBanner: '팅~!! "부모님께서 인사해요?!" 내가 부모님께 드리는 인사잖아!! 💢',
        wrongMsg: '문법 구별! 부모님이 인사하시는 게 아니라 "내가 부모님에게" 인사하는 대상 자리이므로 "부모님께"가 정답!',
        wrongSpeech: '땡! 받는 대상 어른 뒤에는 부모님께 인사해요가 맞아요!',
      },
      야: {
        boardBanner: '으악!! "부모님야 인사해요?!" 받침도 있고 반말 큰일!! 🚀',
        wrongMsg: '예절 경보 개그! 부모님께는 공손하게 대상 높임 조사 "께"를 붙여야 해요!',
        wrongSpeech: '으악! 부모님한테 야라고 하면 안 돼요!',
        isSpaceGag: true,
        boardReplace: '예절 경보!',
      },
    },
    correctMsg: '★ 높임 대상 정답! 존경하는 어른("~에게") 뒤에는 👉 "께"가 정답! (부모님께 인사해요.)',
    correctSpeech: '정답! 부모님께 인사해요!',
  },
  {
    id: 'halabeoji',
    noun: '할아버지',
    predicate: '편지를 써요',
    correctList: ['께'],
    wrongFeedback: {
      께서: {
        boardBanner: '팅~!! "할아버지께서 편지를 써요?!" 받는 대상은 "께"!! 💢',
        wrongMsg: '문법 구별! 내가 할아버지에게 편지를 보내는 "대상"을 높일 때는 "께서"가 아니라 "할아버지께"가 와야 해요!',
        wrongSpeech: '땡! 편지를 받는 분은 할아버지께가 맞아요!',
      },
      야: {
        boardBanner: '으악!! "할아버지야 편지를 써요?!" 어른께 반말 경보!! 🚀',
        wrongMsg: '예절 경보 개그! 할아버지께 편지를 쓸 땐 공손한 높임 대상 조사 "께"를 써야 해요!',
        wrongSpeech: '으악! 할아버지한테 야라고 하면 안 돼요!',
        isSpaceGag: true,
        boardReplace: '예절 경보!',
      },
    },
    correctMsg: '★ 높임 대상 정답! 편지를 받는 어른("할아버지") 뒤에는 👉 "께"가 정답! (할아버지께 편지를 써요.)',
    correctSpeech: '정답! 할아버지께 편지를 써요!',
  },
  {
    id: 'eoreun',
    prefix: '공손히',
    noun: '어른',
    predicate: '두 손으로 드려요',
    isRedPredicate: true,
    correctList: ['께'],
    wrongFeedback: {
      께서: {
        boardBanner: '팅~!! "어른께서 두 손으로 드려요?!" 받는 어른 뒤엔 "께"!! 💢',
        wrongMsg: '문법 구별! 물건을 받는 대상이 어른이므로 주어 "께서"가 아니라 높임 대상 조사 "어른께"가 정답이에요!',
        wrongSpeech: '땡! 물건을 받으시는 어른 뒤에는 어른께가 맞아요!',
      },
      야: {
        boardBanner: '으악!! "어른야 두 손으로 드려요?!" 예절 점수가 날아갔다!! 🚀',
        wrongMsg: '예절 경보 개그! 두 손으로 공손히 드릴 어른 뒤에는 당연히 "어른께"가 와야 해요!',
        wrongSpeech: '으악! 어른한테 야라고 하면 안 돼요!',
        isSpaceGag: true,
        boardReplace: '예절 경보!',
      },
    },
    correctMsg: '🔥 보스 높임 호응 정답! 서술어 "드려요" 받는 대상 👉 "께"! (공손히 어른께 두 손으로 드려요.)',
    correctSpeech: '공손히 어른께 두 손으로 드려요!',
  },
];

// 21단원 (학습지 29단원: 부름 아, 야) - 보기: 아, 야, 께서
export const UNIT_21_ITEMS: MultiParticleQuestionItem<Unit21NounId, Unit20To21Particle>[] = [
  {
    id: 'minsu',
    noun: '민수',
    predicate: '같이 놀자!',
    correctList: ['야'],
    wrongFeedback: {
      아: {
        boardBanner: '팅~!! "민수아?!" "수"에 받침이 없잖아!! 💢',
        wrongMsg: '문법 땡! "민수" 끝 글자 "수"에는 받침이 없어요! 받침이 없을 때 부르는 말은 "아"가 아니라 "야"예요!',
        wrongSpeech: '땡! 민수에는 받침이 없어서 민수야가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "민수께서 같이 놀자?!" 친구한테 너무 높여 부르잖아!! 🚀',
        wrongMsg: '존칭 개그! 친구 민수를 부를 때 "께서"를 쓰다니 너무 거창해서 민수가 왕좌 타고 우주로 날아갔어요!',
        wrongSpeech: '으악! 민수한테 민수께서가 뭐야! 민수야가 맞지!',
        isSpaceGag: true,
        boardReplace: '과잉 존칭!',
      },
    },
    correctMsg: '🎉 정답! "민수" 끝에 받침이 없어서 부름 조사 👉 "야"가 정답! (민수야, 같이 놀자!)',
    correctSpeech: '정답! 민수야, 같이 놀자!',
  },
  {
    id: 'sujin',
    noun: '수진',
    predicate: '학교에 가자!',
    correctList: ['아'],
    wrongFeedback: {
      야: {
        boardBanner: '팅~!! "수진야?!" "진"에 ㄴ 받침 안 보여?! 💢',
        wrongMsg: '받침 ㄴ 방어막! "수진" 끝 글자 "진"에 받침 ㄴ이 있어요! 받침이 있는 이름 뒤에는 "아"가 와야 해요!',
        wrongSpeech: '땡! 수진 끝엔 받침 니은이 있어서 수진아가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "수진께서 학교에 가자?!" 친구가 임금님이니?! 🚀',
        wrongMsg: '존칭 개그! 같은 반 친구 수진이를 부를 때 "께서"를 붙이니 너무 높아서 우주로 날아가 버렸어요!',
        wrongSpeech: '으악! 수진께서가 뭐야! 수진아가 맞지!',
        isSpaceGag: true,
        boardReplace: '과잉 존칭!',
      },
    },
    correctMsg: '🎉 정답! "수진" 끝에 받침 ㄴ이 있어서 부름 조사 👉 "아"가 정답! (수진아, 학교에 가자!)',
    correctSpeech: '정답! 수진아, 학교에 가자!',
  },
  {
    id: 'gangaji',
    noun: '강아지',
    predicate: '이리 오렴!',
    correctList: ['야'],
    wrongFeedback: {
      아: {
        boardBanner: '팅~!! "강아지아?!" "지"에 받침이 없잖아!! 💢',
        wrongMsg: '문법 땡! "강아지" 끝 글자 "지"에 받침이 없어요! 받침이 없을 때는 "야"로 불러야 해요!',
        wrongSpeech: '땡! 강아지에는 받침이 없어서 강아지야가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "강아지께서 이리 오렴?!" 강아지가 사장님이냐?! 🚀',
        wrongMsg: '존칭 개그! 귀여운 강아지를 높임말 "께서"로 모셨더니 왕관 쓰고 우주로 날아가 버렸어요!',
        wrongSpeech: '으악! 강아지한테 강아지께서라니!',
        isSpaceGag: true,
        boardReplace: '멍멍 왕자!',
      },
    },
    correctMsg: '🎉 정답! "강아지" 끝에 받침이 없어서 부름 조사 👉 "야"가 정답! (강아지야, 이리 오렴!)',
    correctSpeech: '정답! 강아지야, 이리 오렴!',
  },
  {
    id: 'chingu',
    noun: '친구',
    predicate: '고마워!',
    correctList: ['야'],
    wrongFeedback: {
      아: {
        boardBanner: '팅~!! "친구아?!" "구"에 받침이 없잖아!! 💢',
        wrongMsg: '문법 땡! "친구" 끝 글자 "구"에는 받침이 없어요! 받침이 없을 때 부르는 말은 "야"가 정답이에요!',
        wrongSpeech: '땡! 친구에는 받침이 없어서 친구야가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "친구께서 고마워?!" 친구한테 극존칭을?! 🚀',
        wrongMsg: '존칭 개그! 친근하게 "친구야"라고 부르면 되는데 "께서"를 붙여서 어색함 폭발! 우주로 날아갔어요!',
        wrongSpeech: '으악! 친구께서 고마워가 무슨 말이야!',
        isSpaceGag: true,
        boardReplace: '과잉 존칭!',
      },
    },
    correctMsg: '🎉 정답! "친구" 끝에 받침이 없어서 부름 조사 👉 "야"가 정답! (친구야, 고마워!)',
    correctSpeech: '정답! 친구야, 고마워!',
  },
  {
    id: 'dongsaeng',
    prefix: '귀여운',
    noun: '동생',
    predicate: '손 씻자!',
    correctList: ['아'],
    wrongFeedback: {
      야: {
        boardBanner: '팅~!! "동생야?!" 받침 ㅇ 방어막 발동!! 💢',
        wrongMsg: '받침 ㅇ 방어막! "동생" 끝 글자 "생"에 ㅇ 받침이 있어요! 받침이 있을 때 부르는 말은 "아"가 정답이에요!',
        wrongSpeech: '땡! 동생 끝엔 받침 이응이 있어서 동생아가 맞아요!',
      },
      께서: {
        boardBanner: '휘이잉~!! "동생께서 손 씻자?!" 아우한테 께서라니?! 🚀',
        wrongMsg: '존칭 개그! 동생에게 반말 호칭 대신 "께서"를 붙였더니 동생이 놀라서 우주로 날아갔어요!',
        wrongSpeech: '으악! 동생한테 동생께서라니!',
        isSpaceGag: true,
        boardReplace: '과잉 존칭!',
      },
    },
    correctMsg: '🔥 보스 호응 정답! "동생" 받침 ㅇ + 친근한 청유 "손 씻자!" 👉 "아"! (귀여운 동생아, 손 씻자!)',
    correctSpeech: '귀여운 동생아, 손 씻자!',
  },
];

// ===== 문장 만들기 1~8 (총 30단원 완성) =====
// 3단원: 문장 만들기 1 (은, 는, 이에요, 예요)
export const UNIT_S1_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
  {
    id: 'na',
    noun: '나',
    predicate: '남자예요.',
    correctList: ['는'],
    wrongFeedback: {
      은: { boardBanner: '', wrongMsg: '', wrongSpeech: '나에는 받침이 없어서 나는이 맞아요.' },
      이에요: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 가운데 주어 자리에는 는이 와요.' },
      예요: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 가운데 주어 자리에는 는이 와요.' },
    },
    correctMsg: '🎉 정답! 나는 남자예요.',
    correctSpeech: '나는 남자예요.',
  },
  {
    id: 'yeoja',
    prefix: '너는',
    noun: '여자',
    predicate: '',
    correctList: ['예요'],
    wrongFeedback: {
      은: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 끝 소개 자리에는 예요가 와요.' },
      는: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 끝 소개 자리에는 예요가 와요.' },
      이에요: { boardBanner: '', wrongMsg: '', wrongSpeech: '여자에는 받침이 없어서 여자예요가 맞아요.' },
    },
    correctMsg: '🎉 정답! 너는 여자예요.',
    correctSpeech: '너는 여자예요.',
  },
  {
    id: 'haksaeng',
    prefix: '친구는',
    noun: '학생',
    predicate: '',
    correctList: ['이에요'],
    wrongFeedback: {
      은: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 끝 소개 자리에는 이에요가 와요.' },
      는: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 끝 소개 자리에는 이에요가 와요.' },
      예요: { boardBanner: '', wrongMsg: '', wrongSpeech: '학생에는 받침이 있어서 학생이에요가 맞아요.' },
    },
    correctMsg: '🎉 정답! 친구는 학생이에요.',
    correctSpeech: '친구는 학생이에요.',
  },
  {
    id: 'dongsaeng',
    noun: '동생',
    predicate: '아기예요.',
    correctList: ['은'],
    wrongFeedback: {
      는: { boardBanner: '', wrongMsg: '', wrongSpeech: '동생에는 받침이 있어서 동생은이 맞아요.' },
      이에요: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 가운데 주어 자리에는 은이 와요.' },
      예요: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 가운데 주어 자리에는 은이 와요.' },
    },
    correctMsg: '🎉 정답! 동생은 아기예요.',
    correctSpeech: '동생은 아기예요.',
  },
  {
    id: 'gabang',
    prefix: '이것은',
    noun: '가방',
    predicate: '',
    correctList: ['이에요'],
    wrongFeedback: {
      은: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 끝 소개 자리에는 이에요가 와요.' },
      는: { boardBanner: '', wrongMsg: '', wrongSpeech: '문장 끝 소개 자리에는 이에요가 와요.' },
      예요: { boardBanner: '', wrongMsg: '', wrongSpeech: '가방에는 받침이 있어서 가방이에요가 맞아요.' },
    },
    correctMsg: '🎉 정답! 이것은 가방이에요.',
    correctSpeech: '이것은 가방이에요.',
  },
];

// 7단원: 문장 만들기 2 (이, 가, 을, 를)
export const UNIT_S2_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
  {
    id: 'changmun',
    prefix: '제가',
    noun: '창문',
    predicate: '열게요.',
    correctList: ['을'],
    wrongFeedback: {
      이: { boardBanner: '', wrongMsg: '', wrongSpeech: '여는 대상 목적어 자리라 창문을이 맞아요.' },
      가: { boardBanner: '', wrongMsg: '', wrongSpeech: '여는 대상 목적어 자리라 창문을이 맞아요.' },
      를: { boardBanner: '', wrongMsg: '', wrongSpeech: '창문에는 받침이 있어서 창문을이 맞아요.' },
    },
    correctMsg: '🎉 정답! 제가 창문을 열게요.',
    correctSpeech: '제가 창문을 열게요.',
  },
  {
    id: 'dongsaeng',
    noun: '동생',
    predicate: '우유를 마셔요.',
    correctList: ['이'],
    wrongFeedback: {
      가: { boardBanner: '', wrongMsg: '', wrongSpeech: '동생에는 받침이 있어서 동생이가 맞아요.' },
      을: { boardBanner: '', wrongMsg: '', wrongSpeech: '마시는 주인 주어 자리라 동생이가 맞아요.' },
      를: { boardBanner: '', wrongMsg: '', wrongSpeech: '마시는 주인 주어 자리라 동생이가 맞아요.' },
    },
    correctMsg: '🎉 정답! 동생이 우유를 마셔요.',
    correctSpeech: '동생이 우유를 마셔요.',
  },
  {
    id: 'geurim',
    prefix: '내가',
    noun: '그림',
    predicate: '그릴게.',
    correctList: ['을'],
    wrongFeedback: {
      이: { boardBanner: '', wrongMsg: '', wrongSpeech: '그리는 대상 목적어 자리라 그림을이 맞아요.' },
      가: { boardBanner: '', wrongMsg: '', wrongSpeech: '그리는 대상 목적어 자리라 그림을이 맞아요.' },
      를: { boardBanner: '', wrongMsg: '', wrongSpeech: '그림에는 받침이 있어서 그림을이 맞아요.' },
    },
    correctMsg: '🎉 정답! 내가 그림을 그릴게.',
    correctSpeech: '내가 그림을 그릴게.',
  },
  {
    id: 'chingu',
    noun: '친구',
    predicate: '무엇을 먹어요?',
    correctList: ['가'],
    wrongFeedback: {
      이: { boardBanner: '', wrongMsg: '', wrongSpeech: '친구에는 받침이 없어서 친구가가 맞아요.' },
      을: { boardBanner: '', wrongMsg: '', wrongSpeech: '먹는 주인 주어 자리라 친구가가 맞아요.' },
      를: { boardBanner: '', wrongMsg: '', wrongSpeech: '먹는 주인 주어 자리라 친구가가 맞아요.' },
    },
    correctMsg: '🎉 정답! 친구가 무엇을 먹어요?',
    correctSpeech: '친구가 무엇을 먹어요?',
  },
  {
    id: 'norae',
    prefix: '누가',
    noun: '노래',
    predicate: '불러요?',
    correctList: ['를'],
    wrongFeedback: {
      이: { boardBanner: '', wrongMsg: '', wrongSpeech: '부르는 대상 목적어 자리라 노래를이 맞아요.' },
      가: { boardBanner: '', wrongMsg: '', wrongSpeech: '부르는 대상 목적어 자리라 노래를이 맞아요.' },
      을: { boardBanner: '', wrongMsg: '', wrongSpeech: '노래에는 받침이 없어서 노래를이 맞아요.' },
    },
    correctMsg: '🎉 정답! 누가 노래를 불러요?',
    correctSpeech: '누가 노래를 불러요?',
  },
];

// 11단원: 문장 만들기 3 (에, 에서, 도)
export const UNIT_S3_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
  {
    id: 'hakgyo',
    prefix: '나도',
    noun: '학교',
    predicate: '가요.',
    correctList: ['에'],
    wrongFeedback: {
      에서: { boardBanner: '', wrongMsg: '', wrongSpeech: '가는 방향 목적지는 학교에가 맞아요.' },
      도: { boardBanner: '', wrongMsg: '', wrongSpeech: '가는 방향 목적지는 학교에가 맞아요.' },
    },
    correctMsg: '🎉 정답! 나도 학교에 가요.',
    correctSpeech: '나도 학교에 가요.',
  },
  {
    id: 'chingu',
    noun: '친구',
    predicate: '교실에서 공부해요.',
    correctList: ['도'],
    wrongFeedback: {
      에: { boardBanner: '', wrongMsg: '', wrongSpeech: '나에 더해 친구까지 함께할 때는 친구도가 맞아요.' },
      에서: { boardBanner: '', wrongMsg: '', wrongSpeech: '사람 뒤에서 나도 너도 할 때는 친구도가 맞아요.' },
    },
    correctMsg: '🎉 정답! 친구도 교실에서 공부해요.',
    correctSpeech: '친구도 교실에서 공부해요.',
  },
  {
    id: 'achim',
    noun: '아침',
    predicate: '우유도 마셔요.',
    correctList: ['에'],
    wrongFeedback: {
      에서: { boardBanner: '', wrongMsg: '', wrongSpeech: '시간을 말할 때는 아침에가 맞아요.' },
      도: { boardBanner: '', wrongMsg: '', wrongSpeech: '시간을 말할 때는 아침에가 맞아요.' },
    },
    correctMsg: '🎉 정답! 아침에 우유도 마셔요.',
    correctSpeech: '아침에 우유도 마셔요.',
  },
  {
    id: 'undongjang',
    prefix: '점심에',
    noun: '운동장',
    predicate: '놀아요.',
    correctList: ['에서'],
    wrongFeedback: {
      에: { boardBanner: '', wrongMsg: '', wrongSpeech: '뛰어노는 행동 장소는 운동장에서가 맞아요.' },
      도: { boardBanner: '', wrongMsg: '', wrongSpeech: '뛰어노는 행동 장소는 운동장에서가 맞아요.' },
    },
    correctMsg: '🎉 정답! 점심에 운동장에서 놀아요.',
    correctSpeech: '점심에 운동장에서 놀아요.',
  },
  {
    id: 'sagwa',
    prefix: '집에서',
    noun: '사과',
    predicate: '먹어요.',
    correctList: ['도'],
    wrongFeedback: {
      에: { boardBanner: '', wrongMsg: '', wrongSpeech: '우유에 더해 사과까지 먹을 때는 사과도가 맞아요.' },
      에서: { boardBanner: '', wrongMsg: '', wrongSpeech: '음식을 더해서 말할 때는 사과도가 맞아요.' },
    },
    correctMsg: '🎉 정답! 집에서 사과도 먹어요.',
    correctSpeech: '집에서 사과도 먹어요.',
  },
];

// 15단원: 문장 만들기 4 (과, 랑, 으로, 로, 한테)
export const UNIT_S4_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
  {
    id: 'chingu',
    noun: '친구',
    predicate: '운동장으로 가요.',
    correctList: ['랑'],
    wrongFeedback: {
      과: { boardBanner: '', wrongMsg: '', wrongSpeech: '친구에는 받침이 없어서 친구랑이 맞아요.' },
      으로: { boardBanner: '', wrongMsg: '', wrongSpeech: '함께 가는 짝꿍이라 친구랑이 맞아요.' },
      로: { boardBanner: '', wrongMsg: '', wrongSpeech: '함께 가는 짝꿍이라 친구랑이 맞아요.' },
      한테: { boardBanner: '', wrongMsg: '', wrongSpeech: '운동장에 함께 갈 때는 친구랑이 맞아요.' },
    },
    correctMsg: '🎉 정답! 친구랑 운동장으로 가요.',
    correctSpeech: '친구랑 운동장으로 가요.',
  },
  {
    id: 'gicha',
    prefix: '동생이랑',
    noun: '기차',
    predicate: '가요.',
    correctList: ['로'],
    wrongFeedback: {
      과: { boardBanner: '', wrongMsg: '', wrongSpeech: '타고 가는 수단은 기차로가 맞아요.' },
      랑: { boardBanner: '', wrongMsg: '', wrongSpeech: '타고 가는 수단은 기차로가 맞아요.' },
      으로: { boardBanner: '', wrongMsg: '', wrongSpeech: '기차에는 받침이 없어서 기차로가 맞아요.' },
      한테: { boardBanner: '', wrongMsg: '', wrongSpeech: '기차는 사람이 아니라서 기차로가 맞아요.' },
    },
    correctMsg: '🎉 정답! 동생이랑 기차로 가요.',
    correctSpeech: '동생이랑 기차로 가요.',
  },
  {
    id: 'chingu',
    prefix: '엄마하고',
    noun: '친구',
    predicate: '가요.',
    correctList: ['한테'],
    wrongFeedback: {
      과: { boardBanner: '', wrongMsg: '', wrongSpeech: '친구에게 다가갈 때는 친구한테가 맞아요.' },
      랑: { boardBanner: '', wrongMsg: '', wrongSpeech: '앞에 엄마하고가 있으니 친구한테 가요가 맞아요.' },
      으로: { boardBanner: '', wrongMsg: '', wrongSpeech: '사람 대상에게는 친구한테가 맞아요.' },
      로: { boardBanner: '', wrongMsg: '', wrongSpeech: '사람 대상에게는 친구한테가 맞아요.' },
    },
    correctMsg: '🎉 정답! 엄마하고 친구한테 가요.',
    correctSpeech: '엄마하고 친구한테 가요.',
  },
  {
    id: 'yeongeo',
    prefix: '친구에게',
    noun: '영어',
    predicate: '말해요.',
    correctList: ['로'],
    wrongFeedback: {
      과: { boardBanner: '', wrongMsg: '', wrongSpeech: '말하는 수단 언어에는 영어로가 맞아요.' },
      랑: { boardBanner: '', wrongMsg: '', wrongSpeech: '말하는 수단 언어에는 영어로가 맞아요.' },
      으로: { boardBanner: '', wrongMsg: '', wrongSpeech: '영어에는 받침이 없어서 영어로가 맞아요.' },
      한테: { boardBanner: '', wrongMsg: '', wrongSpeech: '언어 뒤에는 영어로가 맞아요.' },
    },
    correctMsg: '🎉 정답! 친구에게 영어로 말해요.',
    correctSpeech: '친구에게 영어로 말해요.',
  },
  {
    id: 'gongchaek',
    prefix: '책과',
    noun: '공책',
    predicate: '공부해요.',
    correctList: ['으로'],
    wrongFeedback: {
      과: { boardBanner: '', wrongMsg: '', wrongSpeech: '공부하는 도구에는 공책으로가 맞아요.' },
      랑: { boardBanner: '', wrongMsg: '', wrongSpeech: '공부하는 도구에는 공책으로가 맞아요.' },
      로: { boardBanner: '', wrongMsg: '', wrongSpeech: '공책에는 받침이 있어서 공책으로가 맞아요.' },
      한테: { boardBanner: '', wrongMsg: '', wrongSpeech: '사물 도구 뒤에는 공책으로가 맞아요.' },
    },
    correctMsg: '🎉 정답! 책과 공책으로 공부해요.',
    correctSpeech: '책과 공책으로 공부해요.',
  },
];

// 19단원: 문장 만들기 5 (부터, 까지, 이나, 나, 마다)
export const UNIT_S5_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
  {
    id: 'achim',
    noun: '아침',
    predicate: '저녁까지 공부해요.',
    correctList: ['부터'],
    wrongFeedback: {
      까지: { boardBanner: '', wrongMsg: '', wrongSpeech: '시작하는 시간은 아침부터가 맞아요.' },
      이나: { boardBanner: '', wrongMsg: '', wrongSpeech: '시작 시간에는 아침부터가 맞아요.' },
      나: { boardBanner: '', wrongMsg: '', wrongSpeech: '시작 시간에는 아침부터가 맞아요.' },
      마다: { boardBanner: '', wrongMsg: '', wrongSpeech: '뒤에 저녁까지가 있으니 아침부터가 맞아요.' },
    },
    correctMsg: '🎉 정답! 아침부터 저녁까지 공부해요.',
    correctSpeech: '아침부터 저녁까지 공부해요.',
  },
  {
    id: 'geumyoil',
    prefix: '월요일부터',
    noun: '금요일',
    predicate: '운동해요.',
    correctList: ['까지'],
    wrongFeedback: {
      부터: { boardBanner: '', wrongMsg: '', wrongSpeech: '앞에 월요일부터가 있으니 끝인 금요일까지가 맞아요.' },
      이나: { boardBanner: '', wrongMsg: '', wrongSpeech: '끝나는 요일은 금요일까지가 맞아요.' },
      나: { boardBanner: '', wrongMsg: '', wrongSpeech: '끝나는 요일은 금요일까지가 맞아요.' },
      마다: { boardBanner: '', wrongMsg: '', wrongSpeech: '끝나는 지점은 금요일까지가 맞아요.' },
    },
    correctMsg: '🎉 정답! 월요일부터 금요일까지 운동해요.',
    correctSpeech: '월요일부터 금요일까지 운동해요.',
  },
  {
    id: 'ppang',
    prefix: '아침마다',
    noun: '빵',
    predicate: '우유를 먹어요.',
    correctList: ['이나'],
    wrongFeedback: {
      부터: { boardBanner: '', wrongMsg: '', wrongSpeech: '둘 중 하나 선택은 빵이나가 맞아요.' },
      까지: { boardBanner: '', wrongMsg: '', wrongSpeech: '둘 중 하나 선택은 빵이나가 맞아요.' },
      나: { boardBanner: '', wrongMsg: '', wrongSpeech: '빵에는 받침이 있어서 빵이나가 맞아요.' },
      마다: { boardBanner: '', wrongMsg: '', wrongSpeech: '음식을 고를 때는 빵이나가 맞아요.' },
    },
    correctMsg: '🎉 정답! 아침마다 빵이나 우유를 먹어요.',
    correctSpeech: '아침마다 빵이나 우유를 먹어요.',
  },
  {
    id: 'jumal',
    noun: '주말',
    predicate: '사과나 포도를 먹어요.',
    correctList: ['마다'],
    wrongFeedback: {
      부터: { boardBanner: '', wrongMsg: '', wrongSpeech: '매번 반복되는 주말에는 주말마다가 맞아요.' },
      까지: { boardBanner: '', wrongMsg: '', wrongSpeech: '매번 반복되는 주말에는 주말마다가 맞아요.' },
      이나: { boardBanner: '', wrongMsg: '', wrongSpeech: '매주 반복될 때는 주말마다가 맞아요.' },
      나: { boardBanner: '', wrongMsg: '', wrongSpeech: '매주 반복될 때는 주말마다가 맞아요.' },
    },
    correctMsg: '🎉 정답! 주말마다 사과나 포도를 먹어요.',
    correctSpeech: '주말마다 사과나 포도를 먹어요.',
  },
  {
    id: 'eonje',
    prefix: '언제부터',
    noun: '언제',
    predicate: '방학이에요?',
    correctList: ['까지'],
    wrongFeedback: {
      부터: { boardBanner: '', wrongMsg: '', wrongSpeech: '앞에 언제부터가 있으니 끝은 언제까지가 맞아요.' },
      이나: { boardBanner: '', wrongMsg: '', wrongSpeech: '끝 시점을 물을 때는 언제까지가 맞아요.' },
      나: { boardBanner: '', wrongMsg: '', wrongSpeech: '끝 시점을 물을 때는 언제까지가 맞아요.' },
      마다: { boardBanner: '', wrongMsg: '', wrongSpeech: '언제부터 뒤에는 언제까지가 짝꿍이에요.' },
    },
    correctMsg: '🎉 정답! 언제부터 언제까지 방학이에요?',
    correctSpeech: '언제부터 언제까지 방학이에요?',
  },
];

// 23단원: 문장 만들기 6 (만, 밖에, 보다)
export const UNIT_S6_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
  {
    id: 'neo23',
    prefix: '나는',
    noun: '너',
    predicate: '보여.',
    correctList: ['만'],
    wrongFeedback: {
      밖에: { boardBanner: '', wrongMsg: '', wrongSpeech: '뒤에 긍정 서술어가 있어서 너만이 맞아요.' },
      보다: { boardBanner: '', wrongMsg: '', wrongSpeech: '하나만 딱 고를 때는 너만이 맞아요.' },
    },
    correctMsg: '🎉 정답! 나는 너만 보여.',
    correctSpeech: '나는 너만 보여.',
  },
  {
    id: 'neo23',
    noun: '너',
    predicate: '안 보여.',
    correctList: ['밖에'],
    wrongFeedback: {
      만: { boardBanner: '', wrongMsg: '', wrongSpeech: '뒤에 부정어 안 보여가 있으니 너밖에가 짝꿍이에요.' },
      보다: { boardBanner: '', wrongMsg: '', wrongSpeech: '안 보여 앞에는 너밖에가 맞아요.' },
    },
    correctMsg: '🎉 정답! 너밖에 안 보여.',
    correctSpeech: '너밖에 안 보여.',
  },
  {
    id: 'nugu23',
    prefix: '이 세상',
    noun: '누구',
    predicate: '널 사랑해.',
    correctList: ['보다'],
    wrongFeedback: {
      만: { boardBanner: '', wrongMsg: '', wrongSpeech: '비교 대상 누구와 견줄 때는 누구보다가 맞아요.' },
      밖에: { boardBanner: '', wrongMsg: '', wrongSpeech: '비교하는 문장이라 누구보다가 맞아요.' },
    },
    correctMsg: '🎉 정답! 이 세상 누구보다 널 사랑해.',
    correctSpeech: '이 세상 누구보다 널 사랑해.',
  },
  {
    id: 'eoje23',
    noun: '어제',
    predicate: '오늘 더 네가 좋아.',
    correctList: ['보다'],
    wrongFeedback: {
      만: { boardBanner: '', wrongMsg: '', wrongSpeech: '어제와 오늘을 비교하니 어제보다가 맞아요.' },
      밖에: { boardBanner: '', wrongMsg: '', wrongSpeech: '어제와 오늘을 비교하니 어제보다가 맞아요.' },
    },
    correctMsg: '🎉 정답! 어제보다 오늘 더 네가 좋아.',
    correctSpeech: '어제보다 오늘 더 네가 좋아.',
  },
  {
    id: 'sarang',
    noun: '사랑',
    predicate: '난 몰라.',
    correctList: ['밖에'],
    wrongFeedback: {
      만: { boardBanner: '', wrongMsg: '', wrongSpeech: '뒤에 부정어 난 몰라가 있으니 사랑밖에가 짝꿍이에요.' },
      보다: { boardBanner: '', wrongMsg: '', wrongSpeech: '난 몰라 앞에는 사랑밖에가 맞아요.' },
    },
    correctMsg: '🎉 정답! 사랑밖에 난 몰라.',
    correctSpeech: '사랑밖에 난 몰라.',
  },
];

// 27단원: 문장 만들기 7 (의, 을, 끼리, 처럼)
export const UNIT_S7_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
  {
    id: 'chingu',
    noun: '친구',
    predicate: '가방이 예뻐요.',
    correctList: ['의'],
    wrongFeedback: {
      을: { boardBanner: '', wrongMsg: '', wrongSpeech: '가방의 주인을 말할 때는 친구의가 맞아요.' },
      끼리: { boardBanner: '', wrongMsg: '', wrongSpeech: '가방의 주인을 말할 때는 친구의가 맞아요.' },
      처럼: { boardBanner: '', wrongMsg: '', wrongSpeech: '가방의 주인을 말할 때는 친구의가 맞아요.' },
    },
    correctMsg: '🎉 정답! 친구의 가방이 예뻐요.',
    correctSpeech: '친구의 가방이 예뻐요.',
  },
  {
    id: 'gongchaek',
    prefix: '제',
    noun: '공책',
    predicate: '찾아요.',
    correctList: ['을'],
    wrongFeedback: {
      의: { boardBanner: '', wrongMsg: '', wrongSpeech: '찾는 대상 목적어는 공책을이 맞아요.' },
      끼리: { boardBanner: '', wrongMsg: '', wrongSpeech: '찾는 대상 목적어는 공책을이 맞아요.' },
      처럼: { boardBanner: '', wrongMsg: '', wrongSpeech: '찾는 대상 목적어는 공책을이 맞아요.' },
    },
    correctMsg: '🎉 정답! 제 공책을 찾아요.',
    correctSpeech: '제 공책을 찾아요.',
  },
  {
    id: 'chingu',
    noun: '친구',
    predicate: '운동장에서 놀아요.',
    correctList: ['끼리'],
    wrongFeedback: {
      의: { boardBanner: '', wrongMsg: '', wrongSpeech: '여럿이 함께 어울릴 때는 친구끼리가 맞아요.' },
      을: { boardBanner: '', wrongMsg: '', wrongSpeech: '여럿이 함께 어울릴 때는 친구끼리가 맞아요.' },
      처럼: { boardBanner: '', wrongMsg: '', wrongSpeech: '여럿이 함께 어울릴 때는 친구끼리가 맞아요.' },
    },
    correctMsg: '🎉 정답! 친구끼리 운동장에서 놀아요.',
    correctSpeech: '친구끼리 운동장에서 놀아요.',
  },
  {
    id: 'haksaeng',
    noun: '학생',
    predicate: '교실에서 공부해요.',
    correctList: ['끼리'],
    wrongFeedback: {
      의: { boardBanner: '', wrongMsg: '', wrongSpeech: '학생들이 함께 공부할 때는 학생끼리가 맞아요.' },
      을: { boardBanner: '', wrongMsg: '', wrongSpeech: '학생들이 함께 공부할 때는 학생끼리가 맞아요.' },
      처럼: { boardBanner: '', wrongMsg: '', wrongSpeech: '학생들이 함께 공부할 때는 학생끼리가 맞아요.' },
    },
    correctMsg: '🎉 정답! 학생끼리 교실에서 공부해요.',
    correctSpeech: '학생끼리 교실에서 공부해요.',
  },
  {
    id: 'tokki',
    prefix: '동생이',
    noun: '토끼',
    predicate: '뛰어요.',
    correctList: ['처럼'],
    wrongFeedback: {
      의: { boardBanner: '', wrongMsg: '', wrongSpeech: '토끼와 비슷하게 뛴다고 비유할 때는 토끼처럼이 맞아요.' },
      을: { boardBanner: '', wrongMsg: '', wrongSpeech: '비유해서 말할 때는 토끼처럼이 맞아요.' },
      끼리: { boardBanner: '', wrongMsg: '', wrongSpeech: '동생 한 명이 뛸 때는 토끼처럼이 맞아요.' },
    },
    correctMsg: '🎉 정답! 동생이 토끼처럼 뛰어요.',
    correctSpeech: '동생이 토끼처럼 뛰어요.',
  },
];

// 30단원: 문장 만들기 8 (께서, 께, 아, 야)
export const UNIT_S8_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
  {
    id: 'halmeoni',
    noun: '할머니',
    predicate: '선물을 주셨어요.',
    correctList: ['께서'],
    wrongFeedback: {
      께: { boardBanner: '', wrongMsg: '', wrongSpeech: '주신 주인 어른 주어 자리라 할머니께서가 맞아요.' },
      아: { boardBanner: '', wrongMsg: '', wrongSpeech: '높여 불러야 할 어른이라 할머니께서가 맞아요.' },
      야: { boardBanner: '', wrongMsg: '', wrongSpeech: '높여 불러야 할 어른이라 할머니께서가 맞아요.' },
    },
    correctMsg: '🎉 정답! 할머니께서 선물을 주셨어요.',
    correctSpeech: '할머니께서 선물을 주셨어요.',
  },
  {
    id: 'seonsaengnim',
    noun: '선생님',
    predicate: '책을 읽으세요.',
    correctList: ['께서'],
    wrongFeedback: {
      께: { boardBanner: '', wrongMsg: '', wrongSpeech: '책을 읽으시는 주어 자리라 선생님께서가 맞아요.' },
      아: { boardBanner: '', wrongMsg: '', wrongSpeech: '선생님을 높여 말할 때는 선생님께서가 맞아요.' },
      야: { boardBanner: '', wrongMsg: '', wrongSpeech: '선생님을 높여 말할 때는 선생님께서가 맞아요.' },
    },
    correctMsg: '🎉 정답! 선생님께서 책을 읽으세요.',
    correctSpeech: '선생님께서 책을 읽으세요.',
  },
  {
    id: 'bumonim',
    prefix: '민수야,',
    noun: '부모님',
    predicate: '인사해!',
    correctList: ['께'],
    wrongFeedback: {
      께서: { boardBanner: '', wrongMsg: '', wrongSpeech: '인사를 받는 어른 대상이라 부모님께가 맞아요.' },
      아: { boardBanner: '', wrongMsg: '', wrongSpeech: '어른께 드리는 인사라 부모님께가 맞아요.' },
      야: { boardBanner: '', wrongMsg: '', wrongSpeech: '어른께 드리는 인사라 부모님께가 맞아요.' },
    },
    correctMsg: '🎉 정답! 민수야, 부모님께 인사해!',
    correctSpeech: '민수야, 부모님께 인사해!',
  },
  {
    id: 'sujin',
    noun: '수진',
    predicate: '할아버지께 드려!',
    correctList: ['아'],
    wrongFeedback: {
      께서: { boardBanner: '', wrongMsg: '', wrongSpeech: '이름을 다정하게 부를 때는 수진아가 맞아요.' },
      께: { boardBanner: '', wrongMsg: '', wrongSpeech: '이름을 다정하게 부를 때는 수진아가 맞아요.' },
      야: { boardBanner: '', wrongMsg: '', wrongSpeech: '수진에는 받침이 있어서 수진아가 맞아요.' },
    },
    correctMsg: '🎉 정답! 수진아, 할아버지께 드려!',
    correctSpeech: '수진아, 할아버지께 드려!',
  },
  {
    id: 'chingu',
    noun: '친구',
    predicate: '선생님께 여쭈어보자!',
    correctList: ['야'],
    wrongFeedback: {
      께서: { boardBanner: '', wrongMsg: '', wrongSpeech: '친근하게 부를 때는 친구야가 맞아요.' },
      께: { boardBanner: '', wrongMsg: '', wrongSpeech: '친근하게 부를 때는 친구야가 맞아요.' },
      아: { boardBanner: '', wrongMsg: '', wrongSpeech: '친구에는 받침이 없어서 친구야가 맞아요.' },
    },
    correctMsg: '🎉 정답! 친구야, 선생님께 여쭈어보자!',
    correctSpeech: '친구야, 선생님께 여쭈어보자!',
  },
];
