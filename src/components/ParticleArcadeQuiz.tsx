import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Hand, Zap } from 'lucide-react';
import { UiLanguage, GAMES_UI, MENU_EXTRAS_UI } from '../i18n/uiTranslations';
import { speakKorean, playApplauseFanfare, playCutePop } from '../utils/audio';
import {
  ArcadeBadgeTier,
  BulletBadgeGraphic,
  GameBadgeAlbumButton,
  GameBadgeAndHallOfFameModal,
  recordSlingshotBadgeClear,
} from '../utils/gameBadges';

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

type Unit1Particle = '은' | '는' | '을';
type Unit2Particle = '이에요' | '예요' | '고';
type Unit3Particle = '이' | '가' | '을';
type Unit4Particle = '이' | '가' | '을';
type Unit5Particle = '을' | '를';
type Unit6Particle = '에' | '에서' | '께서';
type Unit7Particle = '도' | '에서' | '이에요';
type Unit8Particle = '와' | '과' | '하고' | '이랑' | '랑';
type Unit9Particle = '으로' | '로' | '에게';
type Unit10Particle = '에게' | '한테' | '로' | '으로';
type Unit11To13Particle = '부터' | '까지' | '이나' | '나' | '마다';
type Unit14To16Particle = '만' | '밖에' | '보다';
type Unit17To19Particle = '처럼' | '같이' | '의' | '끼리';
type Unit20To21Particle = '께서' | '께' | '아' | '야';
type ParticleChoice =
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
type MissKind = 'short' | 'over';
type GamePhase = 'ready' | 'flying' | 'impact' | 'missed' | 'cleared';
type ControlMode = 'arcade' | 'easy';
type FaceMode = 'happy' | 'panic' | 'dizzy' | 'crying' | 'headClutch';

type Unit1NounId = 'na' | 'chingu' | 'dongsaeng' | 'seonsaengnim' | 'gabang';
type Unit2NounId = 'haksaeng' | 'yeonpil' | 'chilpan' | 'uija' | 'jiugae';
type Unit3NounId = 'mul' | 'chaek' | 'yak' | 'bae' | 'binu';
type Unit4NounId = 'na5' | 'neo5' | 'jeo5' | 'nugu5' | 'igeot5';
type Unit5NounId = 'bap' | 'son' | 'mueot' | 'uyu' | 'sagwa';
type Unit6NounId =
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
type Unit7NounId = 'na' | 'chingu' | 'mul' | 'sagwa' | 'usan';
type Unit8NounId = 'eomma' | 'uyu' | 'yeonpil' | 'chaek' | 'chingu';
type Unit9NounId = 'hakgyo' | 'undongjang' | 'yeonpil' | 'beoseu' | 'sutgarak';
type Unit10NounId = 'jjakkkung' | 'chingu' | 'dongsaeng' | 'uri' | 'nugu10';
type Unit11NounId = 'achim' | 'wolyoil' | 'jeonyeok' | 'hakgyo' | 'eodi';
type Unit12NounId = 'ppang' | 'mul' | 'chaek' | 'sagwa' | 'beoseu';
type Unit13NounId = 'nal' | 'achim' | 'jumal' | 'gyosil' | 'saram';
type Unit14NounId = 'mul' | 'na' | 'hana' | 'oneul' | 'sagwa';
type Unit15NounId = 'hana' | 'mul' | 'na' | 'sigan' | 'ppang';
type Unit16NounId = 'hyeong' | 'eoje' | 'beoseu' | 'sagwa' | 'nugu10';
type Unit17NounId = 'tokki' | 'gureum' | 'chingu' | 'nun' | 'byeol';
type Unit18NounId = 'chingu' | 'seonsaengnim' | 'na25' | 'neo25' | 'jeo25';
type Unit19NounId = 'chingu' | 'uri' | 'namja' | 'yeoja' | 'haksaeng';
type Unit20NounId = 'halmeoni' | 'seonsaengnim' | 'bumonim' | 'halabeoji' | 'eoreun';
type Unit21NounId = 'minsu' | 'sujin' | 'gangaji' | 'chingu' | 'dongsaeng';
type SentenceNounId =
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

interface ArcadeButtonConfig {
  particle: ParticleChoice;
  idx: number;
  label: string;
  bgHex: string;
  borderHex: string;
  shadowHex: string;
  accentHex: string;
  keyHint: string;
}

interface Unit1QuestionItem {
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

interface Unit2QuestionItem {
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

interface Unit34QuestionItem<TId extends string> {
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

interface Unit5QuestionItem {
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

interface WrongOptionFeedback {
  boardBanner: string;
  wrongMsg: string;
  wrongSpeech: string;
  isSpaceGag?: boolean;
  boardReplace?: string;
}

interface MultiParticleQuestionItem<TId extends string, P extends ParticleChoice> {
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

const BTN_PALETTE_YELLOW = { bgHex: '#FFFBEB', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#7E22CE' };
const BTN_PALETTE_PINK = { bgHex: '#F3E8FF', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#581C87' };
const BTN_PALETTE_PURPLE = { bgHex: '#FFE4E6', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#9F1239' };
const BTN_PALETTE_MINT = { bgHex: '#E0F2FE', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#1E3A8A' };
const BTN_PALETTE_SKY = { bgHex: '#ECFDF5', borderHex: '#1E293B', shadowHex: '#1E293B', accentHex: '#047857' };

const ARCADE_BUTTONS_U1: ArcadeButtonConfig[] = [
  { particle: '은', idx: 0, label: '은', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '는', idx: 1, label: '는', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '을', idx: 2, label: '을', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U2: ArcadeButtonConfig[] = [
  { particle: '이에요', idx: 0, label: '이에요', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '예요', idx: 1, label: '예요', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '고', idx: 2, label: '고', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U3: ArcadeButtonConfig[] = [
  { particle: '이', idx: 0, label: '이', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '가', idx: 1, label: '가', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '을', idx: 2, label: '을', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U4: ArcadeButtonConfig[] = [
  { particle: '이', idx: 0, label: '이', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '가', idx: 1, label: '가', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '을', idx: 2, label: '을', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U5: ArcadeButtonConfig[] = [
  { particle: '을', idx: 0, label: '을', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '를', idx: 1, label: '를', ...BTN_PALETTE_PINK, keyHint: '2' },
];

const ARCADE_BUTTONS_U6: ArcadeButtonConfig[] = [
  { particle: '에', idx: 0, label: '에', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '에서', idx: 1, label: '에서', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '께서', idx: 2, label: '께서', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U7: ArcadeButtonConfig[] = [
  { particle: '도', idx: 0, label: '도', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '에서', idx: 1, label: '에서', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '이에요', idx: 2, label: '이에요', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U8: ArcadeButtonConfig[] = [
  { particle: '와', idx: 0, label: '와', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '과', idx: 1, label: '과', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '하고', idx: 2, label: '하고', ...BTN_PALETTE_PURPLE, keyHint: '3' },
  { particle: '이랑', idx: 3, label: '이랑', ...BTN_PALETTE_MINT, keyHint: '4' },
  { particle: '랑', idx: 4, label: '랑', ...BTN_PALETTE_SKY, keyHint: '5' },
];

const ARCADE_BUTTONS_U9: ArcadeButtonConfig[] = [
  { particle: '으로', idx: 0, label: '으로', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '로', idx: 1, label: '로', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '에게', idx: 2, label: '에게', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U10: ArcadeButtonConfig[] = [
  { particle: '에게', idx: 0, label: '에게', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '한테', idx: 1, label: '한테', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '로', idx: 2, label: '로', ...BTN_PALETTE_PURPLE, keyHint: '3' },
  { particle: '으로', idx: 3, label: '으로', ...BTN_PALETTE_MINT, keyHint: '4' },
];

const ARCADE_BUTTONS_U11: ArcadeButtonConfig[] = [
  { particle: '부터', idx: 0, label: '부터', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '까지', idx: 1, label: '까지', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '마다', idx: 2, label: '마다', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U12: ArcadeButtonConfig[] = [
  { particle: '이나', idx: 0, label: '이나', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '나', idx: 1, label: '나', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '까지', idx: 2, label: '까지', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U13: ArcadeButtonConfig[] = [
  { particle: '부터', idx: 0, label: '부터', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '까지', idx: 1, label: '까지', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '마다', idx: 2, label: '마다', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U14_TO_16: ArcadeButtonConfig[] = [
  { particle: '만', idx: 0, label: '만', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '밖에', idx: 1, label: '밖에', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '보다', idx: 2, label: '보다', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U17: ArcadeButtonConfig[] = [
  { particle: '처럼', idx: 0, label: '처럼', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '같이', idx: 1, label: '같이', ...BTN_PALETTE_MINT, keyHint: '2' },
  { particle: '의', idx: 2, label: '의', ...BTN_PALETTE_PINK, keyHint: '3' },
  { particle: '끼리', idx: 3, label: '끼리', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

const ARCADE_BUTTONS_U18: ArcadeButtonConfig[] = [
  { particle: '처럼', idx: 0, label: '처럼', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '의', idx: 1, label: '의', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '끼리', idx: 2, label: '끼리', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U19: ArcadeButtonConfig[] = [
  { particle: '끼리', idx: 0, label: '끼리', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '처럼', idx: 1, label: '처럼', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '의', idx: 2, label: '의', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U20: ArcadeButtonConfig[] = [
  { particle: '께서', idx: 0, label: '께서', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '께', idx: 1, label: '께', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '야', idx: 2, label: '야', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_U21: ArcadeButtonConfig[] = [
  { particle: '아', idx: 0, label: '아', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '야', idx: 1, label: '야', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '께서', idx: 2, label: '께서', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_S1: ArcadeButtonConfig[] = [
  { particle: '은', idx: 0, label: '은', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '는', idx: 1, label: '는', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '이에요', idx: 2, label: '이에요', ...BTN_PALETTE_MINT, keyHint: '3' },
  { particle: '예요', idx: 3, label: '예요', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

const ARCADE_BUTTONS_S2: ArcadeButtonConfig[] = [
  { particle: '이', idx: 0, label: '이', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '가', idx: 1, label: '가', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '을', idx: 2, label: '을', ...BTN_PALETTE_MINT, keyHint: '3' },
  { particle: '를', idx: 3, label: '를', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

const ARCADE_BUTTONS_S3: ArcadeButtonConfig[] = [
  { particle: '에', idx: 0, label: '에', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '에서', idx: 1, label: '에서', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '도', idx: 2, label: '도', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_S4: ArcadeButtonConfig[] = [
  { particle: '과', idx: 0, label: '과', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '랑', idx: 1, label: '랑', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '으로', idx: 2, label: '으로', ...BTN_PALETTE_PURPLE, keyHint: '3' },
  { particle: '로', idx: 3, label: '로', ...BTN_PALETTE_MINT, keyHint: '4' },
  { particle: '한테', idx: 4, label: '한테', ...BTN_PALETTE_SKY, keyHint: '5' },
];

const ARCADE_BUTTONS_S5: ArcadeButtonConfig[] = [
  { particle: '부터', idx: 0, label: '부터', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '까지', idx: 1, label: '까지', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '이나', idx: 2, label: '이나', ...BTN_PALETTE_PURPLE, keyHint: '3' },
  { particle: '나', idx: 3, label: '나', ...BTN_PALETTE_MINT, keyHint: '4' },
  { particle: '마다', idx: 4, label: '마다', ...BTN_PALETTE_SKY, keyHint: '5' },
];

const ARCADE_BUTTONS_S6: ArcadeButtonConfig[] = [
  { particle: '만', idx: 0, label: '만', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '밖에', idx: 1, label: '밖에', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '보다', idx: 2, label: '보다', ...BTN_PALETTE_PURPLE, keyHint: '3' },
];

const ARCADE_BUTTONS_S7: ArcadeButtonConfig[] = [
  { particle: '의', idx: 0, label: '의', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '을', idx: 1, label: '을', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '끼리', idx: 2, label: '끼리', ...BTN_PALETTE_MINT, keyHint: '3' },
  { particle: '처럼', idx: 3, label: '처럼', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

const ARCADE_BUTTONS_S8: ArcadeButtonConfig[] = [
  { particle: '께서', idx: 0, label: '께서', ...BTN_PALETTE_YELLOW, keyHint: '1' },
  { particle: '께', idx: 1, label: '께', ...BTN_PALETTE_PINK, keyHint: '2' },
  { particle: '아', idx: 2, label: '아', ...BTN_PALETTE_MINT, keyHint: '3' },
  { particle: '야', idx: 3, label: '야', ...BTN_PALETTE_PURPLE, keyHint: '4' },
];

const UNIT_1_ITEMS: Unit1QuestionItem[] = [
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

const UNIT_2_ITEMS: Unit2QuestionItem[] = [
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
const UNIT_3_ITEMS: Unit34QuestionItem<Unit3NounId>[] = [
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
const UNIT_4_ITEMS: Unit34QuestionItem<Unit4NounId>[] = [
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
const UNIT_5_ITEMS: Unit5QuestionItem[] = [
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
const UNIT_6_E_POOL: MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[] = [
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

const UNIT_6_ESEO_POOL: MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[] = [
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

function buildRandomUnit6Items(): MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[] {
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
const UNIT_6_2_ITEMS: MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[] = [
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
const UNIT_7_ITEMS: MultiParticleQuestionItem<Unit7NounId, Unit7Particle>[] = [
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
const UNIT_8_ITEMS: MultiParticleQuestionItem<Unit8NounId, Unit8Particle>[] = [
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
const UNIT_9_ITEMS: MultiParticleQuestionItem<Unit9NounId, Unit9Particle>[] = [
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
const UNIT_10_ITEMS: MultiParticleQuestionItem<Unit10NounId, Unit10Particle>[] = [
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
const UNIT_11_ITEMS: MultiParticleQuestionItem<Unit11NounId, Unit11To13Particle>[] = [
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
const UNIT_12_ITEMS: MultiParticleQuestionItem<Unit12NounId, Unit11To13Particle>[] = [
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
const UNIT_13_ITEMS: MultiParticleQuestionItem<Unit13NounId, Unit11To13Particle>[] = [
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
const UNIT_14_ITEMS: MultiParticleQuestionItem<Unit14NounId, Unit14To16Particle>[] = [
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
const UNIT_15_ITEMS: MultiParticleQuestionItem<Unit15NounId, Unit14To16Particle>[] = [
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
const UNIT_16_ITEMS: MultiParticleQuestionItem<Unit16NounId, Unit14To16Particle>[] = [
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
const UNIT_17_ITEMS: MultiParticleQuestionItem<Unit17NounId, Unit17To19Particle>[] = [
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
const UNIT_18_ITEMS: MultiParticleQuestionItem<Unit18NounId, Unit17To19Particle>[] = [
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
const UNIT_19_ITEMS: MultiParticleQuestionItem<Unit19NounId, Unit17To19Particle>[] = [
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
const UNIT_20_ITEMS: MultiParticleQuestionItem<Unit20NounId, Unit20To21Particle>[] = [
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
const UNIT_21_ITEMS: MultiParticleQuestionItem<Unit21NounId, Unit20To21Particle>[] = [
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
const UNIT_S1_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
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
const UNIT_S2_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
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
const UNIT_S3_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
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
const UNIT_S4_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
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
const UNIT_S5_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
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
const UNIT_S6_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
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
const UNIT_S7_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
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
const UNIT_S8_ITEMS: MultiParticleQuestionItem<SentenceNounId, ParticleChoice>[] = [
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

// ===== 독립형 Web Audio 효과음 & 음성 유틸 =====
let sharedAudioCtx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (Ctx) sharedAudioCtx = new Ctx();
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();
  return sharedAudioCtx;
}

function playTone(type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.2, delay = 0) {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(f1, now);
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, f2), now + dur);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  } catch {}
}

function playButtonSfx(idx: number) {
  const pitches = [523.25, 587.33, 659.25, 783.99];
  const f = pitches[idx % pitches.length];
  playTone('sine', f, f * 1.15, 0.06, 0.1);
}

function playLaunchSfx() {
  playTone('triangle', 220, 520, 0.11, 0.14, 0);
}

function playMissSfx(kind: MissKind) {
  if (kind === 'short') playTone('sine', 240, 110, 0.15, 0.16);
  else playTone('sine', 360, 920, 0.22, 0.14);
}

function playImpactPing(high = true) {
  // 뚜렷하고 경쾌한 '팅!' 타격음
  playTone('sine', high ? 1320 : 960, high ? 1760 : 620, 0.11, 0.48, 0);
  playTone('triangle', high ? 880 : 540, high ? 1180 : 320, 0.09, 0.36, 0);
}

function playBounceSfx() {
  playImpactPing(false);
  playTone('triangle', 460, 175, 0.22, 0.42, 0.02);
  playTone('sine', 260, 120, 0.24, 0.34, 0.06);
}

function playSpaceLaunchSfx() {
  playImpactPing(false);
  playTone('triangle', 340, 960, 0.26, 0.34, 0.03);
}

function playGoPunSfx() {
  playImpactPing(false);
  playTone('triangle', 480, 720, 0.22, 0.34, 0.03);
}

function playJackpotSfx() {
  playImpactPing(true);
  playTone('sine', 523.25, 523.25, 0.11, 0.32, 0.04);
  playTone('sine', 659.25, 659.25, 0.11, 0.32, 0.095);
  playTone('triangle', 783.99, 783.99, 0.18, 0.36, 0.15);
}

function cancelSpeech() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {}
}

function formatCleanSubtitle(raw: string): string {
  return raw
    .replace(/^[🎉★🔥🚀💢💧👉\s]+/, '')
    .replace(
      /^(문법 땡!|비문 개그!|말장난 개그 발동!|받침 [ㄱ-ㅎ]+ 방어막!|문법 구별!|예절 경보 개그!|존칭 개그!|높임 주어 정답!|높임 대상 정답!|보스 부정 호응 정답!|보스 높임 호응 정답!|보스 호응 정답!|정답!)\s*/g,
      ''
    )
    .replace(/👉/g, '→')
    .replace(/[!]{2,}/g, '!')
    .replace(/\?\!/g, '?')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function formatCleanWrongSpeech(raw: string): string {
  return raw
    .replace(/^[🎉★🔥🚀💢💧\s]+/, '')
    .replace(/^(땡!|으악!|어\?!|어\?|헉!)\s*/g, '')
    .replace(/[!]{2,}/g, '.')
    .replace(/\?\!/g, '?')
    .trim();
}

function buildDirectSentenceSpeech(params: {
  prefix?: string;
  noun: string;
  choice: ParticleChoice;
  predicate?: string;
  transformedWord?: string;
}): string {
  const { prefix, noun, choice, predicate, transformedWord } = params;
  const head = transformedWord ? transformedWord : `${noun}${choice}`;
  const parts = [prefix?.trim(), head, predicate?.trim()].filter(Boolean);
  return parts.join(' ').trim();
}

const JONGSEONG_LIST = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
  'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

function getLastBatchimInfo(word: string): { hasBatchim: boolean; batchimChar: string } {
  const cleaned = word.replace(/[^가-힣]/g, '');
  if (!cleaned) return { hasBatchim: false, batchimChar: '' };
  const code = cleaned.charCodeAt(cleaned.length - 1) - 0xac00;
  if (code < 0 || code > 11171) return { hasBatchim: false, batchimChar: '' };
  const jong = code % 28;
  return {
    hasBatchim: jong !== 0,
    batchimChar: JONGSEONG_LIST[jong] || '',
  };
}

interface WrongRuleHighlight {
  badge: string;
  highlightLastSyllable: boolean;
  highlightPredicate: boolean;
}

function getWrongRuleHighlight(
  unit: ParticleGameUnitId,
  noun: string,
  wrongChoice: ParticleChoice,
  predicate: string,
  correctChoiceHint?: string
): WrongRuleHighlight | null {
  const { hasBatchim, batchimChar } = getLastBatchimInfo(noun);

  if (unit === 'unit1' || unit === 'unit3' || unit === 'unit4') {
    if (wrongChoice === '을') {
      return {
        badge: `'을' 불가 → 서술어와 호응하는 주격·주제 자리`,
        highlightLastSyllable: false,
        highlightPredicate: true,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) 확인!` : '받침 없음 확인!',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit2') {
    if (wrongChoice === '고') {
      return {
        badge: hasBatchim ? `끝말 자리! 받침 있음 (${batchimChar}) → 이에요` : '끝말 자리! 받침 없음 → 예요',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 이에요` : '받침 없음 → 예요',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit5') {
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) 확인!` : '받침 없음 확인!',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit8') {
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 과 / 이랑 (만능: 하고)` : '받침 없음 → 와 / 랑 (만능: 하고)',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit9') {
    if (wrongChoice === '에게') {
      return {
        badge: '장소·도구 명사 → 사람 대상 \'에게\' 불가!',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (batchimChar === 'ㄹ') {
      return {
        badge: '★ ㄹ 받침 예외 → 무조건 \'로\'!',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 으로` : '받침 없음 → 로',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit6' || unit === 'unit6_2') {
    if (wrongChoice === '께서') {
      return {
        badge: '장소·시간 명사 → 높임 \'께서\' 불가!',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    return {
      badge: correctChoiceHint === '에' ? '목적지·존재·시간 → \'에\'' : '행동·출발 장소 → \'에서\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit7') {
    return {
      badge: '더할 때 → 추가 조사 \'도\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit10') {
    return {
      badge: '사람·동물 대상 → \'에게 / 한테\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit11') {
    return {
      badge: correctChoiceHint === '부터' ? "시작 시점 → '부터'" : "끝·도착 지점 → '까지'",
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit12') {
    if (wrongChoice === '까지') {
      return {
        badge: "여러 개 중 하나 선택 → '이나 / 나'",
        highlightLastSyllable: false,
        highlightPredicate: true,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 이나` : '받침 없음 → 나',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit13') {
    return {
      badge: '매번 반복·각각 모두 → \'마다\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit14') {
    return {
      badge: '긍정 서술어 호응 → \'만\' (\'밖에\'는 부정어와!)',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit15') {
    return {
      badge: `부정어('${predicate}') 호응 → '밖에'`,
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit16') {
    return {
      badge: '두 대상 비교 기준 → \'보다\'',
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit17') {
    return {
      badge: "비슷한 모습 비유 → '처럼 · 같이'",
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit18') {
    return {
      badge: '주인·소유 → \'의\' (나+의→내, 저+의→제)',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (unit === 'unit19') {
    return {
      badge: "여럿이 함께 어울릴 때 → '끼리'",
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit20') {
    return {
      badge: correctChoiceHint === '께서' ? '어른 주어 높임 → \'께서\'' : `서술어('${predicate}') 높임 대상 → '께'`,
      highlightLastSyllable: false,
      highlightPredicate: true,
    };
  }

  if (unit === 'unit21') {
    if (wrongChoice === '께서') {
      return {
        badge: '친근한 부름 자리 → 높임 \'께서\' 불가!',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    return {
      badge: hasBatchim ? `받침 있음 (${batchimChar}) → 아` : '받침 없음 → 야',
      highlightLastSyllable: true,
      highlightPredicate: false,
    };
  }

  if (
    unit === 'sentence1' ||
    unit === 'sentence2' ||
    unit === 'sentence3' ||
    unit === 'sentence4' ||
    unit === 'sentence5' ||
    unit === 'sentence6' ||
    unit === 'sentence7' ||
    unit === 'sentence8'
  ) {
    const c = correctChoiceHint || '';
    if (c === '은' || c === '는') {
      return {
        badge: hasBatchim ? `받침 있음 (${batchimChar}) → 은` : '받침 없음 → 는',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '이에요' || c === '예요') {
      return {
        badge: hasBatchim ? `받침 있음 (${batchimChar}) → 이에요` : '받침 없음 → 예요',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '이' || c === '가') {
      return {
        badge: hasBatchim ? `주어 자리 · 받침 (${batchimChar}) → 이` : '주어 자리 · 받침 없음 → 가',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '을' || c === '를') {
      return {
        badge: hasBatchim ? `목적어 자리 · 받침 (${batchimChar}) → 을` : '목적어 자리 · 받침 없음 → 를',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '에') return { badge: "목적지·시간 → '에'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '에서') return { badge: "행동 장소 → '에서'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '도') return { badge: "이미 있는 것에 더할 때 → '도'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '랑') return { badge: '함께 · 받침 없음 → 랑', highlightLastSyllable: true, highlightPredicate: false };
    if (c === '으로' || c === '로') {
      return {
        badge: hasBatchim && batchimChar !== 'ㄹ' ? `수단 · 받침 (${batchimChar}) → 으로` : '수단 · 받침 없음/ㄹ → 로',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
    if (c === '한테') return { badge: "사람 대상 → '한테'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '부터') return { badge: "시작 시점 → '부터'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '까지') return { badge: "끝 지점 → '까지'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '이나') return { badge: `선택 · 받침 (${batchimChar}) → 이나`, highlightLastSyllable: true, highlightPredicate: false };
    if (c === '마다') return { badge: "매번 반복 → '마다'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '만') return { badge: "긍정 서술어 호응 → '만'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '밖에') return { badge: `부정어('${predicate}') 호응 → '밖에'`, highlightLastSyllable: false, highlightPredicate: true };
    if (c === '보다') return { badge: "비교 기준 → '보다'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '의') return { badge: "주인·소유 → '의'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '끼리') return { badge: "함께 어울림 → '끼리'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '처럼') return { badge: "비슷한 모습 비유 → '처럼'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '께서') return { badge: "어른 주어 높임 → '께서'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '께') return { badge: "어른 대상 높임 → '께'", highlightLastSyllable: false, highlightPredicate: true };
    if (c === '아' || c === '야') {
      return {
        badge: hasBatchim ? `부름 · 받침 (${batchimChar}) → 아` : '부름 · 받침 없음 → 야',
        highlightLastSyllable: true,
        highlightPredicate: false,
      };
    }
  }

  return null;
}

// ===== 에메랄드 파스텔 마스코트 배지 & 별빛 헬퍼 =====
const PastelMascotBadge: React.FC<{ isCorrect: boolean; children: React.ReactNode }> = ({ isCorrect, children }) => (
  <g>
    <circle cx="0" cy="4" r="56" fill={isCorrect ? '#D1FAE5' : '#FFFFFF'} opacity="0.92" />
    <circle
      cx="0"
      cy="4"
      r="56"
      fill="none"
      stroke={isCorrect ? '#10B981' : '#6EE7B7'}
      strokeWidth={isCorrect ? '3.5' : '2.5'}
    />
    <circle
      cx="0"
      cy="4"
      r="49"
      fill="none"
      stroke={isCorrect ? '#34D399' : '#A7F3D0'}
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    {isCorrect && (
      <g>
        <path d="M-58 -36 L-54 -44 L-50 -36 L-42 -32 L-50 -28 L-54 -20 L-58 -28 L-66 -32 Z" fill="#34D399" />
        <path d="M54 -40 L57 -46 L60 -40 L66 -37 L60 -34 L57 -28 L54 -34 L48 -37 Z" fill="#10B981" />
        <circle cx="62" cy="18" r="4" fill="#6EE7B7" />
        <circle cx="-62" cy="24" r="3.5" fill="#A7F3D0" />
      </g>
    )}
    {children}
  </g>
);

// ===== 독립형 졸라맨 캐릭터 SVG =====
const StickmanPlayer: React.FC<{ face: FaceMode; running: boolean; animTime: number }> = ({
  face,
  running,
  animTime,
}) => {
  const leg = running ? Math.sin(animTime * 22) * 18 : 0;
  const arm = running ? Math.cos(animTime * 22) * 18 : 0;
  return (
    <g>
      <ellipse cx="0" cy="50" rx="18" ry="4.5" fill="#059669" opacity="0.18" />
      <circle cx="0" cy="-38" r="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
      {face === 'happy' && (
        <g>
          <circle cx="-10" cy="-35" r="3.2" fill="#FDA4AF" opacity="0.55" />
          <circle cx="10" cy="-35" r="3.2" fill="#FDA4AF" opacity="0.55" />
          <circle cx="-6" cy="-41" r="2.4" fill="#1E293B" />
          <circle cx="6" cy="-41" r="2.4" fill="#1E293B" />
          <circle cx="-5.2" cy="-41.8" r="0.8" fill="#FFFFFF" />
          <circle cx="6.8" cy="-41.8" r="0.8" fill="#FFFFFF" />
          <path d="M-5.5 -32 Q0 -26.5 5.5 -32" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {face === 'panic' && (
        <g>
          <circle cx="-6" cy="-41" r="3.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="6" cy="-41" r="3.5" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="-6" cy="-41" r="1.2" fill="#1E293B" />
          <circle cx="6" cy="-41" r="1.2" fill="#1E293B" />
          <ellipse cx="0" cy="-30" rx="5" ry="6" fill="#FB7185" stroke="#1E293B" strokeWidth="2" />
        </g>
      )}
      {face === 'dizzy' && (
        <g>
          <path d="M-9 -44 L-3 -38 M-3 -44 L-9 -38" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M3 -44 L9 -38 M9 -44 L3 -38" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M-5 -30 Q0 -34 5 -30" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {(face === 'crying' || face === 'headClutch') && (
        <g>
          <path d="M-9 -42 L-3 -40 L-9 -38" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M9 -42 L3 -40 L9 -38" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="-6" y1="-37" x2="-6" y2="-24" stroke="#60A5FA" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="6" y1="-37" x2="6" y2="-24" stroke="#60A5FA" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M-5 -28 Q0 -33 5 -28" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      <line x1="0" y1="-20" x2="0" y2="16" stroke="#1E293B" strokeWidth="4.8" strokeLinecap="round" />
      <line x1="0" y1="-10" x2={-18 - arm} y2="6" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
      <line x1="0" y1="-10" x2={18 + arm} y2={face === 'headClutch' ? -36 : 4} stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
      <line x1="0" y1="16" x2={-12 + leg} y2="48" stroke="#1E293B" strokeWidth="4.8" strokeLinecap="round" />
      <line x1="0" y1="16" x2={12 - leg} y2="48" stroke="#1E293B" strokeWidth="4.8" strokeLinecap="round" />
    </g>
  );
};

// ===== 1단원 명사별 마스코트 SVG =====
const Unit1NounMascot: React.FC<{ nounId: Unit1NounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  return (
    <g>
      {nounId === 'na' && (
        <g>
          <rect x="-24" y="-2" width="48" height="44" rx="14" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="25" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF">나</text>
          <circle cx="0" cy="-26" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -30 Q0 -52 21 -30" fill="#1E293B" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'chingu' && (
        <g>
          <rect x="-24" y="-4" width="48" height="44" rx="14" fill="#10B981" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-26" r="21" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-20 -31 Q0 -50 20 -31 Z" fill="#78350F" />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="-36" cy="28" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <polygon points="-36,21 -42,26 -39,33 -33,33 -30,26" fill="#1E293B" />
        </g>
      )}
      {nounId === 'dongsaeng' && (
        <g>
          <rect x="-20" y="0" width="40" height="38" rx="13" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-22" r="20" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-20 -26 Q0 -48 20 -26 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-10" cy="-17" r="4" fill="#FDA4AF" opacity="0.7" />
          <circle cx="10" cy="-17" r="4" fill="#FDA4AF" opacity="0.7" />
          <circle cx="-6" cy="-22" r="2.5" fill="#1E293B" />
          <circle cx="6" cy="-22" r="2.5" fill="#1E293B" />
          <path d="M-5 -13 Q0 -8 5 -13" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'seonsaengnim' && (
        <g>
          <rect x="-25" y="-4" width="50" height="46" rx="14" fill="#A78BFA" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="-8,-4 8,-4 0,10" fill="#FFFFFF" />
          <circle cx="0" cy="-28" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-22 -33 Q0 -54 22 -33" fill="#334155" />
          <circle cx="-8" cy="-26" r="6" fill="none" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="8" cy="-26" r="6" fill="none" stroke="#1E293B" strokeWidth="2.2" />
          <line x1="-2" y1="-26" x2="2" y2="-26" stroke="#1E293B" strokeWidth="2.2" />
          <circle cx="-8" cy="-26" r="1.8" fill="#1E293B" />
          <circle cx="8" cy="-26" r="1.8" fill="#1E293B" />
          <path d="M-5 -15 Q0 -10 5 -15" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'gabang' && (
        <g>
          <path d="M-20 -36 Q0 -56 20 -36" fill="none" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
          <rect x="-36" y="-34" width="72" height="78" rx="22" fill={isCorrect ? '#EC4899' : '#FB7185'} stroke="#1E293B" strokeWidth="4" />
          <rect x="-26" y="4" width="52" height="28" rx="10" fill={isCorrect ? '#F472B6' : '#FDA4AF'} stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
    </g>
  );
};

// ===== 2단원 명사별 개그 마스코트 SVG =====
const Unit2NounMascot: React.FC<{
  nounId: Unit2NounId;
  isCorrect: boolean;
  isGoMode: boolean;
  animTime: number;
}> = ({ nounId, isCorrect, isGoMode, animTime }) => {
  const legSwing = Math.sin(animTime * 28) * 18;
  return (
    <g>
      {isGoMode && (
        <g opacity="0.85">
          <line x1="-88" y1="-18" x2="-52" y2="-18" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="-96" y1="4" x2="-56" y2="4" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
          <line x1="-82" y1="24" x2="-50" y2="24" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'haksaeng' && (
        <g>
          {isGoMode && (
            <g>
              <line x1="-12" y1="36" x2={-16 + legSwing} y2="68" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
              <line x1="12" y1="36" x2={16 - legSwing} y2="68" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
          <rect x="-36" y="-8" width="16" height="36" rx="6" fill="#FB7185" stroke="#7F1D1D" strokeWidth="3" />
          <rect x="-22" y="-4" width="44" height="44" rx="14" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-26" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-24 -30 Q0 -54 24 -30 Z" fill="#1E293B" />
          <rect x="6" y="-33" width="22" height="5" rx="2.5" fill="#1E293B" />
          <circle cx="-7" cy="-23" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-23" r="2.6" fill="#1E293B" />
          <path d={isGoMode ? 'M-5 -15 Q0 -8 5 -15' : 'M-5 -16 Q0 -11 5 -16'} fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'yeonpil' && (
        <g>
          {isGoMode && (
            <g transform="translate(0, 48)">
              <polygon points="-14,0 0,34 14,0" fill="#F97316" />
              <polygon points="-7,0 0,20 7,0" fill="#FEF08A" />
            </g>
          )}
          <polygon points="0,-54 -18,-26 18,-26" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="0,-54 -6,-44 6,-44" fill="#1E293B" />
          <rect x="-18" y="-26" width="36" height="58" fill="#FACC15" stroke="#854D0E" strokeWidth="3.5" />
          <line x1="-6" y1="-26" x2="-6" y2="32" stroke="#CA8A04" strokeWidth="2.5" />
          <line x1="6" y1="-26" x2="6" y2="32" stroke="#CA8A04" strokeWidth="2.5" />
          <rect x="-18" y="32" width="36" height="14" rx="4" fill="#FB7185" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-6" cy="-4" r="2.8" fill="#1E293B" />
          <circle cx="6" cy="-4" r="2.8" fill="#1E293B" />
          <path d="M-5 5 Q0 10 5 5" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'chilpan' && (
        <g>
          {isGoMode && (
            <g>
              <rect x="-46" y="42" width="92" height="8" rx="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="2.5" />
              <circle cx="-28" cy="56" r="10" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
              <circle cx="28" cy="56" r="10" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
            </g>
          )}
          <rect x="-52" y="-34" width="104" height="72" rx="10" fill="#34D399" stroke="#1E293B" strokeWidth="7" />
          <rect x="-36" y="34" width="30" height="6" rx="2" fill="#FFFFFF" />
          <rect x="10" y="34" width="18" height="6" rx="2" fill="#FEF08A" />
          <circle cx="-16" cy="-6" r="3.5" fill="#FFFFFF" />
          <circle cx="16" cy="-6" r="3.5" fill="#FFFFFF" />
          <path d="M-10 8 Q0 17 10 8" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'uija' && (
        <g>
          {isGoMode && (
            <g>
              <circle cx="-24" cy="48" r="11" fill="#1E293B" stroke="#FACC15" strokeWidth="3" />
              <circle cx="24" cy="48" r="11" fill="#1E293B" stroke="#FACC15" strokeWidth="3" />
              <line x1="34" y1="-44" x2="34" y2="10" stroke="#1E293B" strokeWidth="3.5" />
              <rect x="34" y="-44" width="24" height="16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              <rect x="34" y="-44" width="12" height="8" fill="#1E293B" />
              <rect x="46" y="-36" width="12" height="8" fill="#1E293B" />
            </g>
          )}
          <rect x="-26" y="-42" width="52" height="36" rx="8" fill="#D97706" stroke="#1E293B" strokeWidth="3.5" />
          <line x1="-20" y1="-6" x2="-20" y2="10" stroke="#1E293B" strokeWidth="5" />
          <line x1="20" y1="-6" x2="20" y2="10" stroke="#1E293B" strokeWidth="5" />
          <rect x="-32" y="8" width="64" height="14" rx="6" fill="#F59E0B" stroke="#1E293B" strokeWidth="3.5" />
          <line x1="-22" y1="22" x2="-22" y2="44" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
          <line x1="22" y1="22" x2="22" y2="44" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
          <circle cx="-9" cy="-26" r="3" fill="#1E293B" />
          <circle cx="9" cy="-26" r="3" fill="#1E293B" />
          <path d="M-6 -17 Q0 -12 6 -17" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {nounId === 'jiugae' && (
        <g>
          {isGoMode && (
            <g>
              <line x1="-14" y1="36" x2={-16 + legSwing} y2="66" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
              <line x1="14" y1="36" x2={16 - legSwing} y2="66" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
            </g>
          )}
          <rect x="-34" y="-36" width="68" height="32" rx="10" fill="#F8FAFC" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-34" y="-10" width="68" height="48" rx="8" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-24" y="14" width="48" height="12" rx="4" fill="#DBEAFE" />
          <circle cx="-11" cy="-22" r="2.8" fill="#1E293B" />
          <circle cx="11" cy="-22" r="2.8" fill="#1E293B" />
          <path d="M-6 -15 Q0 -10 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 3단원 명사별 마스코트 SVG =====
const Unit3NounMascot: React.FC<{ nounId: Unit3NounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  return (
    <g>
      {nounId === 'mul' && (
        <g>
          <polygon points="-28,-30 28,-30 20,40 -20,40" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
          <polygon points="-24,-6 24,-6 18,36 -18,36" fill="#38BDF8" />
          <circle cx="-7" cy="12" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="12" r="2.6" fill="#1E293B" />
          <path d="M-5 21 Q0 26 5 21" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'chaek' && (
        <g>
          <rect x="-34" y="-32" width="68" height="72" rx="8" fill="#6366F1" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-24" y="-32" width="8" height="72" fill="#4F46E5" />
          <rect x="-6" y="-18" width="30" height="22" rx="4" fill="#FFFFFF" />
          <circle cx="4" cy="-7" r="2.4" fill="#1E293B" />
          <circle cx="14" cy="-7" r="2.4" fill="#1E293B" />
          <path d="M5 1 Q9 5 13 1" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'yak' && (
        <g>
          <rect x="-30" y="-34" width="60" height="74" rx="14" fill="#FFFFFF" stroke="#059669" strokeWidth="3.5" />
          <rect x="-12" y="-18" width="24" height="8" rx="2" fill="#FB7185" />
          <rect x="-4" y="-26" width="8" height="24" rx="2" fill="#FB7185" />
          <circle cx="-9" cy="12" r="2.5" fill="#1E293B" />
          <circle cx="9" cy="12" r="2.5" fill="#1E293B" />
          <path d="M-5 20 Q0 25 5 20" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'bae' && (
        <g>
          <rect x="-28" y="-10" width="56" height="52" rx="18" fill="#FBBF24" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-30" r="19" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-6" cy="-30" r="2.4" fill="#1E293B" />
          <circle cx="6" cy="-30" r="2.4" fill="#1E293B" />
          <path d={isCorrect ? 'M-6 -21 Q0 -16 6 -21' : 'M-5 -18 Q0 -23 5 -18'} fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
          <text x="0" y="22" textAnchor="middle" fontSize="18" fontWeight="900" fill="#92400E">{isCorrect ? '튼튼!' : '꼬르륵'}</text>
        </g>
      )}
      {nounId === 'binu' && (
        <g>
          <rect x="-38" y="-18" width="76" height="48" rx="22" fill="#F472B6" stroke="#9D174D" strokeWidth="3.5" />
          <circle cx="-30" cy="-32" r="9" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="28" cy="-36" r="11" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2.5" />
          <circle cx="-10" cy="4" r="2.8" fill="#1E293B" />
          <circle cx="10" cy="4" r="2.8" fill="#1E293B" />
          <path d="M-6 13 Q0 19 6 13" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 4단원 변화형 명사별 마스코트 SVG =====
const Unit4NounMascot: React.FC<{ nounId: Unit4NounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  return (
    <g>
      {(nounId === 'na5' || nounId === 'neo5' || nounId === 'jeo5' || nounId === 'nugu5') && (
        <g>
          <rect
            x="-26"
            y="-4"
            width="52"
            height="46"
            rx="15"
            fill={nounId === 'na5' ? '#3B82F6' : nounId === 'neo5' ? '#F59E0B' : nounId === 'jeo5' ? '#8B5CF6' : '#14B8A6'}
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <text x="0" y="26" textAnchor="middle" fontSize="17" fontWeight="900" fill="#FFFFFF">
            {nounId === 'na5' ? '내가!' : nounId === 'neo5' ? '네가!' : nounId === 'jeo5' ? '제가!' : '누가?'}
          </text>
          <circle cx="0" cy="-28" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-7" cy="-27" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-27" r="2.6" fill="#1E293B" />
          <path d="M-6 -18 Q0 -12 6 -18" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'igeot5' && (
        <g>
          <rect x="-34" y="-26" width="68" height="64" rx="12" fill="#FDE047" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="14" textAnchor="middle" fontSize="26" fontWeight="900" fill="#713F12">이게?</text>
        </g>
      )}
    </g>
  );
};

// ===== 5단원 명사별 마스코트 SVG =====
const Unit5NounMascot: React.FC<{ nounId: Unit5NounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  return (
    <g>
      {nounId === 'bap' && (
        <g>
          <path d="M-38 2 Q0 -34 38 2 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
          <path d="M-40 2 L40 2 Q34 40 0 40 Q-34 40 -40 2 Z" fill="#60A5FA" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-10" cy="18" r="2.8" fill="#FFFFFF" />
          <circle cx="10" cy="18" r="2.8" fill="#FFFFFF" />
          <path d="M-6 26 Q0 31 6 26" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'son' && (
        <g>
          <rect x="-24" y="-8" width="48" height="46" rx="18" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-24" y="-34" width="10" height="30" rx="5" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="-11" y="-42" width="10" height="38" rx="5" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="2" y="-40" width="10" height="36" rx="5" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="15" y="-30" width="9" height="28" rx="4.5" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-7" cy="10" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="10" r="2.5" fill="#1E293B" />
          <path d="M-5 19 Q0 24 5 19" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'mueot' && (
        <g>
          <rect x="-34" y="-30" width="68" height="68" rx="14" fill="#A855F7" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="18" textAnchor="middle" fontSize="44" fontWeight="900" fill="#FEF08A">?</text>
        </g>
      )}
      {nounId === 'uyu' && (
        <g>
          <polygon points="-24,-34 24,-34 30,-16 -30,-16" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-30" y="-16" width="60" height="58" rx="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-30" y="6" width="60" height="22" fill="#38BDF8" />
          <text x="0" y="23" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FFFFFF">우유</text>
          <circle cx="-10" cy="-4" r="2.6" fill="#1E293B" />
          <circle cx="10" cy="-4" r="2.6" fill="#1E293B" />
        </g>
      )}
      {nounId === 'sagwa' && (
        <g>
          <path d="M0 -34 Q8 -48 18 -42 Q12 -32 0 -34 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="0" cy="2" r="36" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-10" cy="0" r="3" fill="#1E293B" />
          <circle cx="10" cy="0" r="3" fill="#1E293B" />
          <path d="M-6 10 Q0 16 6 10" fill="none" stroke="#1E293B" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 6~10단원 명사별 마스코트 SVG =====
const Unit6To10NounMascot: React.FC<{
  nounId: Unit6NounId | Unit7NounId | Unit8NounId | Unit9NounId | Unit10NounId;
  isCorrect: boolean;
}> = ({ nounId, isCorrect }) => {
  if (nounId === 'na' || nounId === 'chingu' || nounId === 'dongsaeng' || nounId === 'seonsaengnim') {
    return <Unit1NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'yeonpil') {
    return <Unit2NounMascot nounId="yeonpil" isCorrect={isCorrect} isGoMode={false} animTime={0} />;
  }
  if (nounId === 'mul' || nounId === 'chaek') {
    return <Unit3NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'sagwa' || nounId === 'uyu') {
    return <Unit5NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  return (
    <g>
      {nounId === 'hakgyo' && (
        <g>
          <rect x="-42" y="-12" width="84" height="54" rx="8" fill="#FEF3C7" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="-48,-12 0,-46 48,-12" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-24" r="10" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2.5" />
          <line x1="0" y1="-24" x2="0" y2="-30" stroke="#1E293B" strokeWidth="2.2" />
          <line x1="0" y1="-24" x2="5" y2="-24" stroke="#1E293B" strokeWidth="2.2" />
          <rect x="-12" y="14" width="24" height="28" rx="4" fill="#92400E" />
          <circle cx="-26" cy="10" r="2.5" fill="#1E293B" />
          <circle cx="26" cy="10" r="2.5" fill="#1E293B" />
        </g>
      )}
      {(nounId === 'jip_e' || nounId === 'jip_eseo') && (
        <g>
          <rect x="-34" y="-6" width="68" height="48" rx="8" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="-42,-4 0,-44 42,-4" fill="#F97316" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-10" y="14" width="20" height="28" rx="4" fill="#B45309" />
          <circle cx="-18" cy="12" r="2.5" fill="#1E293B" />
          <circle cx="18" cy="12" r="2.5" fill="#1E293B" />
          <path d="M-5 2 Q0 7 5 2" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'eodi' && (
        <g>
          <rect x="-6" y="-42" width="12" height="86" rx="4" fill="#92400E" />
          <polygon points="-38,-32 30,-32 44,-16 30,0 -38,0" fill="#38BDF8" stroke="#1E293B" strokeWidth="3" />
          <text x="0" y="-9" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF">어디?</text>
        </g>
      )}
      {nounId === 'achim' && (
        <g>
          <circle cx="0" cy="4" r="34" fill="#FACC15" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-18" cy="-28" r="10" fill="#FB7185" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-28" r="10" fill="#FB7185" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-10" cy="0" r="2.8" fill="#1E293B" />
          <circle cx="10" cy="0" r="2.8" fill="#1E293B" />
          <path d="M-6 12 Q0 18 6 12" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'jeomsim' && (
        <g>
          <rect x="-40" y="-22" width="80" height="58" rx="14" fill="#FB923C" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-30" y="-12" width="26" height="22" rx="6" fill="#FFFFFF" />
          <rect x="4" y="-12" width="26" height="22" rx="6" fill="#FDE047" />
          <circle cx="-10" cy="22" r="2.5" fill="#1E293B" />
          <circle cx="10" cy="22" r="2.5" fill="#1E293B" />
          <path d="M-5 28 Q0 32 5 28" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'gyosil' && (
        <g>
          <rect x="-44" y="-32" width="88" height="54" rx="8" fill="#34D399" stroke="#1E293B" strokeWidth="5" />
          <text x="0" y="0" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FEF08A">공부</text>
          <rect x="-32" y="26" width="64" height="16" rx="4" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
      {nounId === 'undongjang' && (
        <g>
          <rect x="-46" y="10" width="92" height="28" rx="8" fill="#22C55E" stroke="#15803D" strokeWidth="3.5" />
          <path d="M-32 14 L-32 -22 L32 -22 L32 14" fill="none" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
          <circle cx="0" cy="-2" r="14" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <polygon points="0,-9 -6,-3 -4,5 4,5 6,-3" fill="#1E293B" />
        </g>
      )}
      {nounId === 'doseogwan' && (
        <g>
          <rect x="-38" y="-34" width="76" height="76" rx="8" fill="#B45309" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-28" y="-24" width="14" height="24" rx="2" fill="#FB7185" />
          <rect x="-10" y="-24" width="14" height="24" rx="2" fill="#60A5FA" />
          <rect x="8" y="-24" width="16" height="24" rx="2" fill="#10B981" />
          <rect x="-28" y="8" width="16" height="24" rx="2" fill="#FACC15" />
          <rect x="-8" y="8" width="32" height="24" rx="2" fill="#EC4899" />
        </g>
      )}
      {nounId === 'eoneunara' && (
        <g>
          <circle cx="0" cy="2" r="36" fill="#38BDF8" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-20 -10 Q-5 -20 6 -6 Q-6 8 -20 -10 Z" fill="#22C55E" />
          <path d="M10 6 Q24 2 26 18 Q12 24 10 6 Z" fill="#22C55E" />
          <circle cx="-10" cy="0" r="2.8" fill="#1E293B" />
          <circle cx="10" cy="0" r="2.8" fill="#1E293B" />
          <path d="M-6 11 Q0 17 6 11" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'usan' && (
        <g>
          <path d="M-42 0 Q0 -48 42 0 Z" fill="#A78BFA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M0 0 L0 32 Q0 42 10 42 Q18 42 18 34" fill="none" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <circle cx="-12" cy="-12" r="2.6" fill="#FFFFFF" />
          <circle cx="12" cy="-12" r="2.6" fill="#FFFFFF" />
          <path d="M-6 -4 Q0 2 6 -4" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'eomma' && (
        <g>
          <circle cx="-18" cy="-34" r="11" fill="#78350F" />
          <circle cx="18" cy="-34" r="11" fill="#78350F" />
          <rect x="-26" y="-2" width="52" height="44" rx="16" fill="#EC4899" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-10 -2 L0 10 L10 -2" fill="#FCE7F3" />
          <circle cx="0" cy="-26" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-23 -28 Q0 -54 23 -28 Q16 -38 0 -36 Q-16 -38 -23 -28 Z" fill="#78350F" />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="-12" cy="-19" r="3.5" fill="#FDA4AF" opacity="0.7" />
          <circle cx="12" cy="-19" r="3.5" fill="#FDA4AF" opacity="0.7" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'beoseu' && (
        <g>
          <rect x="-48" y="-28" width="96" height="58" rx="14" fill="#FACC15" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-40" y="-18" width="24" height="20" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <rect x="-10" y="-18" width="24" height="20" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <rect x="20" y="-18" width="20" height="20" rx="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <circle cx="-26" cy="30" r="11" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="26" cy="30" r="11" fill="#1E293B" stroke="#CBD5E1" strokeWidth="3" />
          <circle cx="-12" cy="14" r="2.5" fill="#1E293B" />
          <circle cx="12" cy="14" r="2.5" fill="#1E293B" />
          <path d="M-6 20 Q0 24 6 20" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'sutgarak' && (
        <g>
          <rect x="-7" y="-8" width="14" height="56" rx="7" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3.5" />
          <ellipse cx="0" cy="-22" rx="22" ry="28" fill="#E2E8F0" stroke="#1E293B" strokeWidth="3.5" />
          <ellipse cx="0" cy="-24" rx="14" ry="18" fill="#F8FAFC" />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <path d="M-5 -15 Q0 -10 5 -15" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'jjakkkung' && (
        <g>
          <circle cx="-18" cy="-18" r="15" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          <rect x="-33" y="-2" width="30" height="36" rx="10" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-18" r="15" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="3" y="-2" width="30" height="36" rx="10" fill="#F43F5E" stroke="#1E293B" strokeWidth="3" />
          <rect x="-40" y="24" width="80" height="14" rx="4" fill="#D97706" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
      {nounId === 'uri' && (
        <g>
          <circle cx="-18" cy="-18" r="15" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          <rect x="-33" y="-2" width="30" height="40" rx="11" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-18" r="15" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="3" y="-2" width="30" height="40" rx="11" fill="#10B981" stroke="#1E293B" strokeWidth="3" />
          <path d="M-8 14 Q0 8 8 14" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'gangaji' && (
        <g>
          <ellipse cx="-26" cy="-16" rx="11" ry="20" fill="#B45309" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx="26" cy="-16" rx="11" ry="20" fill="#B45309" stroke="#1E293B" strokeWidth="3" />
          <rect x="-24" y="2" width="48" height="38" rx="18" fill="#F59E0B" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-18" r="24" fill="#FBBF24" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-8" cy="-20" r="3" fill="#1E293B" />
          <circle cx="8" cy="-20" r="3" fill="#1E293B" />
          <ellipse cx="0" cy="-12" rx="5" ry="3.5" fill="#1E293B" />
          <path d="M-6 -6 Q0 -1 6 -6" fill="none" stroke="#1E293B" strokeWidth="2.3" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'nugu10' && (
        <g>
          <rect x="-26" y="-4" width="52" height="46" rx="15" fill="#14B8A6" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="26" textAnchor="middle" fontSize="17" fontWeight="900" fill="#FFFFFF">누구?</text>
          <circle cx="0" cy="-28" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-7" cy="-27" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-27" r="2.6" fill="#1E293B" />
          <path d="M-6 -18 Q0 -12 6 -18" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 11~16단원 명사별 마스코트 SVG =====
const Unit11To16NounMascot: React.FC<{
  nounId: Unit11NounId | Unit12NounId | Unit13NounId | Unit14NounId | Unit15NounId | Unit16NounId;
  isCorrect: boolean;
}> = ({ nounId, isCorrect }) => {
  if (
    nounId === 'achim' ||
    nounId === 'hakgyo' ||
    nounId === 'eodi' ||
    nounId === 'gyosil' ||
    nounId === 'beoseu' ||
    nounId === 'nugu10'
  ) {
    return <Unit6To10NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'na') {
    return <Unit1NounMascot nounId="na" isCorrect={isCorrect} />;
  }
  if (nounId === 'mul') {
    return <Unit3NounMascot nounId="mul" isCorrect={isCorrect} />;
  }
  if (nounId === 'chaek') {
    return <Unit3NounMascot nounId="chaek" isCorrect={isCorrect} />;
  }
  if (nounId === 'sagwa') {
    return <Unit5NounMascot nounId="sagwa" isCorrect={isCorrect} />;
  }

  return (
    <g>
      {(nounId === 'wolyoil' || nounId === 'geumyoil' || nounId === 'oneul' || nounId === 'eoje') && (
        <g>
          <rect x="-36" y="-32" width="72" height="74" rx="12" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
          <rect
            x="-36"
            y="-32"
            width="72"
            height="22"
            rx="10"
            fill={
              nounId === 'wolyoil'
                ? '#3B82F6'
                : nounId === 'geumyoil'
                ? '#F59E0B'
                : nounId === 'oneul'
                ? '#EC4899'
                : '#64748B'
            }
          />
          <circle cx="-16" cy="-34" r="4" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
          <circle cx="16" cy="-34" r="4" fill="#CBD5E1" stroke="#1E293B" strokeWidth="2" />
          <text x="0" y="20" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1E293B">
            {nounId === 'wolyoil' ? '월' : nounId === 'geumyoil' ? '금' : nounId === 'oneul' ? '오늘' : '어제'}
          </text>
        </g>
      )}
      {nounId === 'ilbeon' && (
        <g>
          <circle cx="0" cy="4" r="36" fill="#FACC15" stroke="#1E293B" strokeWidth="4" />
          <circle cx="0" cy="4" r="27" fill="#FEF08A" />
          <text x="0" y="15" textAnchor="middle" fontSize="30" fontWeight="900" fill="#854D0E">1번</text>
        </g>
      )}
      {nounId === 'jigeum' && (
        <g>
          <circle cx="0" cy="2" r="36" fill="#38BDF8" stroke="#1E293B" strokeWidth="4" />
          <circle cx="0" cy="2" r="27" fill="#FFFFFF" />
          <line x1="0" y1="2" x2="0" y2="-15" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <line x1="0" y1="2" x2="14" y2="8" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
          <text x="0" y="54" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0369A1">지금!</text>
        </g>
      )}
      {nounId === 'eonje' && (
        <g>
          <rect x="-34" y="-30" width="68" height="68" rx="14" fill="#A78BFA" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FEF08A">언제?</text>
        </g>
      )}
      {nounId === 'jeonyeok' && (
        <g>
          <circle cx="0" cy="2" r="36" fill="#1E293B" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-8 -18 A20 20 0 1 0 18 14 A15 15 0 1 1 -8 -18 Z" fill="#FACC15" />
          <circle cx="14" cy="-14" r="3" fill="#FEF08A" />
          <circle cx="-18" cy="18" r="2.5" fill="#FEF08A" />
        </g>
      )}
      {nounId === 'yeogi' && (
        <g>
          <path d="M0 -38 C-22 -38 -34 -20 -34 -2 C-34 20 0 44 0 44 C0 44 34 20 34 -2 C34 -20 22 -38 0 -38 Z" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-6" r="14" fill="#FFFFFF" />
          <text x="0" y="-1" textAnchor="middle" fontSize="12" fontWeight="900" fill="#991B1B">여기</text>
        </g>
      )}
      {nounId === 'nal' && (
        <g>
          <circle cx="0" cy="2" r="36" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="3.5" />
          <circle cx="0" cy="2" r="18" fill="#FACC15" />
          <text x="0" y="8" textAnchor="middle" fontSize="15" fontWeight="900" fill="#713F12">매일</text>
        </g>
      )}
      {nounId === 'jumal' && (
        <g>
          <rect x="-40" y="-28" width="80" height="66" rx="14" fill="#10B981" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="10" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF">토·일</text>
        </g>
      )}
      {nounId === 'saram' && (
        <g>
          <circle cx="-18" cy="-16" r="14" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          <rect x="-32" y="0" width="28" height="36" rx="10" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-16" r="14" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="4" y="0" width="28" height="36" rx="10" fill="#EC4899" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
      {nounId === 'hana' && (
        <g>
          <circle cx="0" cy="2" r="34" fill="#FB7185" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-26" cy="-20" r="8" fill="#FDA4AF" />
          <circle cx="26" cy="24" r="8" fill="#FDA4AF" />
          <text x="0" y="13" textAnchor="middle" fontSize="28" fontWeight="900" fill="#FFFFFF">1</text>
        </g>
      )}
      {nounId === 'sigan' && (
        <g>
          <rect x="-28" y="-34" width="56" height="8" rx="4" fill="#92400E" />
          <rect x="-28" y="32" width="56" height="8" rx="4" fill="#92400E" />
          <polygon points="-22,-26 22,-26 0,2 -22,32 22,32 0,2" fill="#E0F2FE" stroke="#1E293B" strokeWidth="3" />
          <polygon points="-14,30 14,30 0,14" fill="#F59E0B" />
        </g>
      )}
      {nounId === 'ppang' && (
        <g>
          <path d="M-34 -8 C-34 -34 34 -34 34 -8 L28 36 L-28 36 Z" fill="#FBBF24" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-24 -6 C-24 -24 24 -24 24 -6 L20 28 L-20 28 Z" fill="#FEF3C7" />
          <circle cx="-9" cy="4" r="2.6" fill="#1E293B" />
          <circle cx="9" cy="4" r="2.6" fill="#1E293B" />
          <path d="M-5 13 Q0 18 5 13" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'hyeong' && (
        <g>
          <rect x="-26" y="-2" width="52" height="46" rx="14" fill="#0EA5E9" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="27" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF">형</text>
          <circle cx="0" cy="-26" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -30 Q0 -52 21 -30" fill="#1E293B" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 17~21단원 명사별 마스코트 SVG =====
const Unit17To21NounMascot: React.FC<{
  nounId: Unit17NounId | Unit18NounId | Unit19NounId | Unit20NounId | Unit21NounId;
  isCorrect: boolean;
}> = ({ nounId, isCorrect }) => {
  if (nounId === 'chingu' || nounId === 'dongsaeng' || nounId === 'seonsaengnim') {
    return <Unit1NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'eomma' || nounId === 'gangaji' || nounId === 'nugu10') {
    return <Unit6To10NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'hyeong') {
    return <Unit11To16NounMascot nounId="hyeong" isCorrect={isCorrect} />;
  }
  if (nounId === 'haksaeng') {
    return <Unit2NounMascot nounId="haksaeng" isCorrect={isCorrect} isGoMode={false} animTime={0} />;
  }

  return (
    <g>
      {nounId === 'uri' && (
        <g>
          <circle cx="-18" cy="-18" r="15" fill="#FDE68A" stroke="#1E293B" strokeWidth="3" />
          <rect x="-33" y="-2" width="30" height="40" rx="11" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-18" r="15" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="3" y="-2" width="30" height="40" rx="11" fill="#10B981" stroke="#1E293B" strokeWidth="3" />
          <path d="M-8 14 Q0 8 8 14" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'namja' && (
        <g>
          <rect x="-24" y="-2" width="48" height="44" rx="14" fill="#2563EB" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-26" r="21" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -30 Q0 -52 21 -30 Z" fill="#1E293B" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'yeoja' && (
        <g>
          <circle cx="-18" cy="-34" r="10" fill="#78350F" />
          <circle cx="18" cy="-34" r="10" fill="#78350F" />
          <rect x="-24" y="-2" width="48" height="44" rx="16" fill="#EC4899" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-26" r="21" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -28 Q0 -52 21 -28 Q14 -37 0 -35 Q-14 -37 -21 -28 Z" fill="#78350F" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'tokki' && (
        <g>
          <ellipse cx="-14" cy="-42" rx="9" ry="22" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx="14" cy="-42" rx="9" ry="22" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
          <ellipse cx="-14" cy="-42" rx="4.5" ry="14" fill="#FDA4AF" />
          <ellipse cx="14" cy="-42" rx="4.5" ry="14" fill="#FDA4AF" />
          <circle cx="0" cy="-12" r="26" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-8" cy="-14" r="2.8" fill="#1E293B" />
          <circle cx="8" cy="-14" r="2.8" fill="#1E293B" />
          <circle cx="0" cy="-7" r="3" fill="#FB7185" />
          <path d="M-5 -2 Q0 2 5 -2" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="0" cy="24" rx="22" ry="18" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
        </g>
      )}
      {nounId === 'gureum' && (
        <g>
          <circle cx="-24" cy="4" r="22" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="3" />
          <circle cx="24" cy="4" r="22" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="3" />
          <circle cx="0" cy="-12" r="28" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="3" />
          <rect x="-26" y="-4" width="52" height="28" fill="#FFFFFF" />
          <line x1="-24" y1="26" x2="24" y2="26" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-9" cy="2" r="2.6" fill="#1E293B" />
          <circle cx="9" cy="2" r="2.6" fill="#1E293B" />
          <path d="M-5 10 Q0 15 5 10" fill="none" stroke="#1E293B" strokeWidth="2.3" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'nun' && (
        <g>
          <circle cx="0" cy="-2" r="34" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3.5" />
          <line x1="0" y1="-26" x2="0" y2="22" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="-22" y1="-14" x2="22" y2="10" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="22" y1="-14" x2="-22" y2="10" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="-2" r="7" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
        </g>
      )}
      {nounId === 'byeol' && (
        <g>
          <polygon
            points="0,-42 11,-14 40,-14 17,4 26,34 0,16 -26,34 -17,4 -40,-14 -11,-14"
            fill="#FACC15"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <circle cx="-8" cy="-4" r="2.8" fill="#1E293B" />
          <circle cx="8" cy="-4" r="2.8" fill="#1E293B" />
          <path d="M-5 4 Q0 9 5 4" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {(nounId === 'na25' || nounId === 'neo25' || nounId === 'jeo25') && (
        <g>
          <rect
            x="-26"
            y="-4"
            width="52"
            height="46"
            rx="15"
            fill={nounId === 'na25' ? '#3B82F6' : nounId === 'neo25' ? '#F59E0B' : '#8B5CF6'}
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <text x="0" y="26" textAnchor="middle" fontSize="19" fontWeight="900" fill="#FFFFFF">
            {nounId === 'na25' ? '내!' : nounId === 'neo25' ? '네!' : '제!'}
          </text>
          <circle cx="0" cy="-28" r="22" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-7" cy="-27" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-27" r="2.6" fill="#1E293B" />
          <path d="M-6 -18 Q0 -12 6 -18" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'halmeoni' && (
        <g>
          <circle cx="0" cy="-42" r="11" fill="#CBD5E1" stroke="#1E293B" strokeWidth="3" />
          <rect x="-26" y="-2" width="52" height="44" rx="16" fill="#F472B6" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-24" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -28 Q0 -48 21 -28" fill="#E2E8F0" />
          <circle cx="-7" cy="-22" r="5.5" fill="none" stroke="#1E293B" strokeWidth="2" />
          <circle cx="7" cy="-22" r="5.5" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="-1.5" y1="-22" x2="1.5" y2="-22" stroke="#1E293B" strokeWidth="2" />
          <path d="M-6 -13 Q0 -7 6 -13" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'halabeoji' && (
        <g>
          <rect x="-26" y="-2" width="52" height="44" rx="16" fill="#10B981" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="0" cy="-24" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-21 -28 Q0 -48 21 -28" fill="#CBD5E1" />
          <path d="M-10 -12 Q0 -4 10 -12" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <path d="M-5 -16 Q0 -12 5 -16" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'bumonim' && (
        <g>
          <circle cx="-18" cy="-22" r="16" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="-34" y="-4" width="32" height="42" rx="12" fill="#60A5FA" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="-22" r="16" fill="#FED7AA" stroke="#1E293B" strokeWidth="3" />
          <rect x="2" y="-4" width="32" height="42" rx="12" fill="#EC4899" stroke="#1E293B" strokeWidth="3" />
          <path d="M-6 6 Q0 0 6 6 Q0 14 -6 6 Z" fill="#FB7185" />
        </g>
      )}
      {nounId === 'eoreun' && (
        <g>
          <rect x="-26" y="-4" width="52" height="46" rx="14" fill="#475569" stroke="#1E293B" strokeWidth="3.5" />
          <polygon points="-8,-4 8,-4 0,12" fill="#FB7185" />
          <circle cx="0" cy="-28" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-22 -32 Q0 -54 22 -32" fill="#334155" />
          <circle cx="-7" cy="-26" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-26" r="2.5" fill="#1E293B" />
          <path d="M-5 -16 Q0 -11 5 -16" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
      {(nounId === 'minsu' || nounId === 'sujin') && (
        <g>
          <rect
            x="-24"
            y="-2"
            width="48"
            height="44"
            rx="14"
            fill={nounId === 'minsu' ? '#0EA5E9' : '#FB7185'}
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <text x="0" y="26" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FFFFFF">
            {nounId === 'minsu' ? '민수' : '수진'}
          </text>
          <circle cx="0" cy="-26" r="21" fill="#FDE68A" stroke="#1E293B" strokeWidth="3.5" />
          <path
            d={nounId === 'minsu' ? 'M-21 -30 Q0 -52 21 -30' : 'M-22 -24 Q0 -52 22 -24'}
            fill={nounId === 'minsu' ? '#1E293B' : '#78350F'}
          />
          <circle cx="-7" cy="-24" r="2.5" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.5" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

// ===== 문장 만들기 1~8 명사별 마스코트 SVG =====
const SentenceNounMascot: React.FC<{ nounId: SentenceNounId; isCorrect: boolean }> = ({ nounId, isCorrect }) => {
  if (
    nounId === 'na' ||
    nounId === 'chingu' ||
    nounId === 'dongsaeng' ||
    nounId === 'seonsaengnim' ||
    nounId === 'gabang'
  ) {
    return <Unit1NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'haksaeng') {
    return <Unit2NounMascot nounId="haksaeng" isCorrect={isCorrect} isGoMode={false} animTime={0} />;
  }
  if (nounId === 'sagwa') {
    return <Unit5NounMascot nounId="sagwa" isCorrect={isCorrect} />;
  }
  if (nounId === 'hakgyo' || nounId === 'achim' || nounId === 'undongjang') {
    return <Unit6To10NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'geumyoil' || nounId === 'ppang' || nounId === 'jumal' || nounId === 'eonje') {
    return <Unit11To16NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }
  if (nounId === 'eoje23') {
    return <Unit11To16NounMascot nounId="eoje" isCorrect={isCorrect} />;
  }
  if (
    nounId === 'yeoja' ||
    nounId === 'tokki' ||
    nounId === 'halmeoni' ||
    nounId === 'bumonim' ||
    nounId === 'sujin'
  ) {
    return <Unit17To21NounMascot nounId={nounId} isCorrect={isCorrect} />;
  }

  return (
    <g>
      {nounId === 'changmun' && (
        <g>
          <rect x="-36" y="-32" width="72" height="68" rx="10" fill="#BAE6FD" stroke="#1E293B" strokeWidth="3.5" />
          <line x1="0" y1="-32" x2="0" y2="36" stroke="#FFFFFF" strokeWidth="5" />
          <line x1="-36" y1="2" x2="36" y2="2" stroke="#FFFFFF" strokeWidth="5" />
          <rect x="-36" y="-32" width="72" height="68" rx="10" fill="none" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-18" cy="-16" r="6" fill="#FACC15" />
        </g>
      )}
      {nounId === 'geurim' && (
        <g>
          <rect x="-34" y="-30" width="68" height="58" rx="8" fill="#FFFBEB" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M-24 14 Q0 -18 24 14" fill="none" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
          <path d="M-18 16 Q0 -8 18 16" fill="none" stroke="#34D399" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="16" cy="-14" r="6" fill="#FACC15" />
        </g>
      )}
      {nounId === 'norae' && (
        <g>
          <circle cx="-14" cy="18" r="13" fill="#EC4899" stroke="#1E293B" strokeWidth="3" />
          <circle cx="18" cy="12" r="13" fill="#8B5CF6" stroke="#1E293B" strokeWidth="3" />
          <path d="M-3 18 L-3 -24 L29 -30 L29 12" fill="none" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="-3" y1="-12" x2="29" y2="-18" stroke="#F472B6" strokeWidth="6" />
        </g>
      )}
      {nounId === 'gicha' && (
        <g>
          <rect x="-36" y="-12" width="72" height="40" rx="12" fill="#38BDF8" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-24" y="-28" width="48" height="20" rx="8" fill="#BAE6FD" stroke="#1E293B" strokeWidth="3" />
          <circle cx="-18" cy="30" r="9" fill="#1E293B" />
          <circle cx="18" cy="30" r="9" fill="#1E293B" />
          <circle cx="0" cy="4" r="7" fill="#FEF08A" />
        </g>
      )}
      {nounId === 'yeongeo' && (
        <g>
          <rect x="-36" y="-28" width="72" height="58" rx="16" fill="#6366F1" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="9" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FFFFFF">ABC</text>
        </g>
      )}
      {nounId === 'gongchaek' && (
        <g>
          <rect x="-30" y="-32" width="60" height="72" rx="10" fill="#A7F3D0" stroke="#1E293B" strokeWidth="3.5" />
          <rect x="-18" y="-18" width="36" height="16" rx="4" fill="#FFFFFF" />
          <circle cx="-30" cy="-16" r="4" fill="#1E293B" />
          <circle cx="-30" cy="0" r="4" fill="#1E293B" />
          <circle cx="-30" cy="16" r="4" fill="#1E293B" />
        </g>
      )}
      {nounId === 'neo23' && (
        <g>
          <rect x="-24" y="-2" width="48" height="44" rx="14" fill="#F59E0B" stroke="#1E293B" strokeWidth="3.5" />
          <text x="0" y="25" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF">너</text>
          <circle cx="0" cy="-26" r="22" fill="#FED7AA" stroke="#1E293B" strokeWidth="3.5" />
          <circle cx="-7" cy="-24" r="2.6" fill="#1E293B" />
          <circle cx="7" cy="-24" r="2.6" fill="#1E293B" />
          <path d="M-6 -15 Q0 -9 6 -15" fill="none" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
      {nounId === 'nugu23' && <Unit6To10NounMascot nounId="nugu10" isCorrect={isCorrect} />}
      {nounId === 'sarang' && (
        <g>
          <path
            d="M0 32 C-10 22 -36 4 -36 -14 C-36 -28 -22 -38 -10 -32 C-4 -29 0 -22 0 -22 C0 -22 4 -29 10 -32 C22 -38 36 -28 36 -14 C36 4 10 22 0 32 Z"
            fill="#FB7185"
            stroke="#1E293B"
            strokeWidth="3.5"
          />
          <circle cx="-11" cy="-10" r="2.6" fill="#1E293B" />
          <circle cx="11" cy="-10" r="2.6" fill="#1E293B" />
          <path d="M-6 -1 Q0 4 6 -1" fill="none" stroke="#1E293B" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

const SLING_X = 165;
const SLING_Y = 268;
const TARGET_X_STD = 570;
const TARGET_X_U2 = 740;
const VIEW_WIDTH = 960;
const VIEW_BOTTOM = 386;
const MIN_VIEW_HEIGHT = 355;
const MAX_VIEW_HEIGHT = 760;
const GRAVITY = 960;
const SWEET_MIN = 0.50;
const SWEET_MAX = 0.83;
const CHARGE_FULL_SEC = 1.25;

interface ParticleArcadeQuizProps {
  activeUnit?: ParticleGameUnitId;
  uiLang?: UiLanguage;
  onSelectUnit?: (unit: ParticleGameUnitId) => void;
}

export const ParticleArcadeQuiz = ({
  activeUnit = 'unit1',
  uiLang = 'ko',
  onSelectUnit,
}: ParticleArcadeQuizProps) => {
  const gameUi = (GAMES_UI[uiLang] || GAMES_UI.ko).slingshot;
  const [controlMode, setControlMode] = useState<ControlMode>('arcade');
  const [questionIdx, setQuestionIdx] = useState<number>(0);
  const [selectedParticle, setSelectedParticle] = useState<ParticleChoice>('은');
  const [phase, setPhase] = useState<GamePhase>('ready');
  const [outcome, setOutcome] = useState<ParticleChoice | null>(null);
  const [missKind, setMissKind] = useState<MissKind | null>(null);
  const [missLandingPos, setMissLandingPos] = useState<{ x: number; y: number } | null>(null);
  const [chargingBtn, setChargingBtn] = useState<ParticleChoice | null>(null);
  const [chargePower, setChargePower] = useState(0);
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number } | null>(null);
  const [animTime, setAnimTime] = useState(0);
  const [impactFlash, setImpactFlash] = useState(0);
  const [comboStreak, setComboStreak] = useState(0);
  const [bestComboInUnit, setBestComboInUnit] = useState(0);
  const [firstTryCount, setFirstTryCount] = useState(0);
  const [totalMissesInUnit, setTotalMissesInUnit] = useState(0);
  const totalMissesRef = useRef(0);
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [clearBadgeOutcome, setClearBadgeOutcome] = useState<{
    tier: ArcadeBadgeTier;
    newlyUnlockedTrophyMilestone: number | null;
  } | null>(null);

  const [unit6Items, setUnit6Items] = useState<MultiParticleQuestionItem<Unit6NounId, Unit6Particle>[]>(() =>
    buildRandomUnit6Items()
  );

  const currentU1Item = UNIT_1_ITEMS[questionIdx] || UNIT_1_ITEMS[0];
  const currentU2Item = UNIT_2_ITEMS[questionIdx] || UNIT_2_ITEMS[0];
  const currentU3Item = UNIT_3_ITEMS[questionIdx] || UNIT_3_ITEMS[0];
  const currentU4Item = UNIT_4_ITEMS[questionIdx] || UNIT_4_ITEMS[0];
  const currentU5Item = UNIT_5_ITEMS[questionIdx] || UNIT_5_ITEMS[0];
  const currentU6Item = unit6Items[questionIdx] || unit6Items[0];
  const currentU6_2Item = UNIT_6_2_ITEMS[questionIdx] || UNIT_6_2_ITEMS[0];
  const currentU7Item = UNIT_7_ITEMS[questionIdx] || UNIT_7_ITEMS[0];
  const currentU8Item = UNIT_8_ITEMS[questionIdx] || UNIT_8_ITEMS[0];
  const currentU9Item = UNIT_9_ITEMS[questionIdx] || UNIT_9_ITEMS[0];
  const currentU10Item = UNIT_10_ITEMS[questionIdx] || UNIT_10_ITEMS[0];
  const currentU11Item = UNIT_11_ITEMS[questionIdx] || UNIT_11_ITEMS[0];
  const currentU12Item = UNIT_12_ITEMS[questionIdx] || UNIT_12_ITEMS[0];
  const currentU13Item = UNIT_13_ITEMS[questionIdx] || UNIT_13_ITEMS[0];
  const currentU14Item = UNIT_14_ITEMS[questionIdx] || UNIT_14_ITEMS[0];
  const currentU15Item = UNIT_15_ITEMS[questionIdx] || UNIT_15_ITEMS[0];
  const currentU16Item = UNIT_16_ITEMS[questionIdx] || UNIT_16_ITEMS[0];
  const currentU17Item = UNIT_17_ITEMS[questionIdx] || UNIT_17_ITEMS[0];
  const currentU18Item = UNIT_18_ITEMS[questionIdx] || UNIT_18_ITEMS[0];
  const currentU19Item = UNIT_19_ITEMS[questionIdx] || UNIT_19_ITEMS[0];
  const currentU20Item = UNIT_20_ITEMS[questionIdx] || UNIT_20_ITEMS[0];
  const currentU21Item = UNIT_21_ITEMS[questionIdx] || UNIT_21_ITEMS[0];
  const currentS1Item = UNIT_S1_ITEMS[questionIdx] || UNIT_S1_ITEMS[0];
  const currentS2Item = UNIT_S2_ITEMS[questionIdx] || UNIT_S2_ITEMS[0];
  const currentS3Item = UNIT_S3_ITEMS[questionIdx] || UNIT_S3_ITEMS[0];
  const currentS4Item = UNIT_S4_ITEMS[questionIdx] || UNIT_S4_ITEMS[0];
  const currentS5Item = UNIT_S5_ITEMS[questionIdx] || UNIT_S5_ITEMS[0];
  const currentS6Item = UNIT_S6_ITEMS[questionIdx] || UNIT_S6_ITEMS[0];
  const currentS7Item = UNIT_S7_ITEMS[questionIdx] || UNIT_S7_ITEMS[0];
  const currentS8Item = UNIT_S8_ITEMS[questionIdx] || UNIT_S8_ITEMS[0];

  const isSentenceUnit =
    activeUnit === 'sentence1' ||
    activeUnit === 'sentence2' ||
    activeUnit === 'sentence3' ||
    activeUnit === 'sentence4' ||
    activeUnit === 'sentence5' ||
    activeUnit === 'sentence6' ||
    activeUnit === 'sentence7' ||
    activeUnit === 'sentence8';

  const activeButtons =
    activeUnit === 'unit1'
      ? ARCADE_BUTTONS_U1
      : activeUnit === 'unit2'
      ? ARCADE_BUTTONS_U2
      : activeUnit === 'sentence1'
      ? ARCADE_BUTTONS_S1
      : activeUnit === 'unit3'
      ? ARCADE_BUTTONS_U3
      : activeUnit === 'unit4'
      ? ARCADE_BUTTONS_U4
      : activeUnit === 'unit5'
      ? ARCADE_BUTTONS_U5
      : activeUnit === 'sentence2'
      ? ARCADE_BUTTONS_S2
      : activeUnit === 'unit6' || activeUnit === 'unit6_2'
      ? ARCADE_BUTTONS_U6
      : activeUnit === 'unit7'
      ? ARCADE_BUTTONS_U7
      : activeUnit === 'sentence3'
      ? ARCADE_BUTTONS_S3
      : activeUnit === 'unit8'
      ? ARCADE_BUTTONS_U8
      : activeUnit === 'unit9'
      ? ARCADE_BUTTONS_U9
      : activeUnit === 'unit10'
      ? ARCADE_BUTTONS_U10
      : activeUnit === 'sentence4'
      ? ARCADE_BUTTONS_S4
      : activeUnit === 'unit11'
      ? ARCADE_BUTTONS_U11
      : activeUnit === 'unit12'
      ? ARCADE_BUTTONS_U12
      : activeUnit === 'unit13'
      ? ARCADE_BUTTONS_U13
      : activeUnit === 'sentence5'
      ? ARCADE_BUTTONS_S5
      : activeUnit === 'unit14' || activeUnit === 'unit15' || activeUnit === 'unit16'
      ? ARCADE_BUTTONS_U14_TO_16
      : activeUnit === 'sentence6'
      ? ARCADE_BUTTONS_S6
      : activeUnit === 'unit17'
      ? ARCADE_BUTTONS_U17
      : activeUnit === 'unit18'
      ? ARCADE_BUTTONS_U18
      : activeUnit === 'unit19'
      ? ARCADE_BUTTONS_U19
      : activeUnit === 'sentence7'
      ? ARCADE_BUTTONS_S7
      : activeUnit === 'unit20'
      ? ARCADE_BUTTONS_U20
      : activeUnit === 'unit21'
      ? ARCADE_BUTTONS_U21
      : ARCADE_BUTTONS_S8;

  const isEndSlotLayout =
    activeUnit === 'unit2' || (activeUnit === 'sentence1' && !currentS1Item.predicate);
  const activeTargetX = isEndSlotLayout ? TARGET_X_U2 : TARGET_X_STD;
  const totalQuestions =
    activeUnit === 'unit1'
      ? UNIT_1_ITEMS.length
      : activeUnit === 'unit2'
      ? UNIT_2_ITEMS.length
      : activeUnit === 'sentence1'
      ? UNIT_S1_ITEMS.length
      : activeUnit === 'unit3'
      ? UNIT_3_ITEMS.length
      : activeUnit === 'unit4'
      ? UNIT_4_ITEMS.length
      : activeUnit === 'unit5'
      ? UNIT_5_ITEMS.length
      : activeUnit === 'sentence2'
      ? UNIT_S2_ITEMS.length
      : activeUnit === 'unit6'
      ? unit6Items.length
      : activeUnit === 'unit6_2'
      ? UNIT_6_2_ITEMS.length
      : activeUnit === 'unit7'
      ? UNIT_7_ITEMS.length
      : activeUnit === 'sentence3'
      ? UNIT_S3_ITEMS.length
      : activeUnit === 'unit8'
      ? UNIT_8_ITEMS.length
      : activeUnit === 'unit9'
      ? UNIT_9_ITEMS.length
      : activeUnit === 'unit10'
      ? UNIT_10_ITEMS.length
      : activeUnit === 'sentence4'
      ? UNIT_S4_ITEMS.length
      : activeUnit === 'unit11'
      ? UNIT_11_ITEMS.length
      : activeUnit === 'unit12'
      ? UNIT_12_ITEMS.length
      : activeUnit === 'unit13'
      ? UNIT_13_ITEMS.length
      : activeUnit === 'sentence5'
      ? UNIT_S5_ITEMS.length
      : activeUnit === 'unit14'
      ? UNIT_14_ITEMS.length
      : activeUnit === 'unit15'
      ? UNIT_15_ITEMS.length
      : activeUnit === 'unit16'
      ? UNIT_16_ITEMS.length
      : activeUnit === 'sentence6'
      ? UNIT_S6_ITEMS.length
      : activeUnit === 'unit17'
      ? UNIT_17_ITEMS.length
      : activeUnit === 'unit18'
      ? UNIT_18_ITEMS.length
      : activeUnit === 'unit19'
      ? UNIT_19_ITEMS.length
      : activeUnit === 'sentence7'
      ? UNIT_S7_ITEMS.length
      : activeUnit === 'unit20'
      ? UNIT_20_ITEMS.length
      : activeUnit === 'unit21'
      ? UNIT_21_ITEMS.length
      : UNIT_S8_ITEMS.length;

  const defaultChoiceForUnit = (u: ParticleGameUnitId): ParticleChoice => {
    switch (u) {
      case 'unit1':
      case 'sentence1':
        return '은';
      case 'unit2':
        return '이에요';
      case 'unit3':
      case 'unit4':
      case 'sentence2':
        return '이';
      case 'unit5':
        return '을';
      case 'unit6':
      case 'unit6_2':
      case 'sentence3':
        return '에';
      case 'unit7':
        return '도';
      case 'unit8':
        return '와';
      case 'sentence4':
        return '과';
      case 'unit9':
        return '으로';
      case 'unit10':
        return '에게';
      case 'unit11':
      case 'sentence5':
        return '부터';
      case 'unit12':
        return '이나';
      case 'unit13':
        return '마다';
      case 'unit14':
      case 'unit15':
      case 'unit16':
      case 'sentence6':
        return '만';
      case 'unit17':
      case 'unit18':
        return '처럼';
      case 'unit19':
        return '끼리';
      case 'sentence7':
        return '의';
      case 'unit20':
      case 'sentence8':
        return '께서';
      case 'unit21':
        return '아';
    }
  };

  const nextUnitForUnit = (u: ParticleGameUnitId): ParticleGameUnitId | null => {
    switch (u) {
      case 'unit1':
        return 'unit2';
      case 'unit2':
        return 'sentence1';
      case 'sentence1':
        return 'unit3';
      case 'unit3':
        return 'unit4';
      case 'unit4':
        return 'unit5';
      case 'unit5':
        return 'sentence2';
      case 'sentence2':
        return 'unit6';
      case 'unit6':
        return 'unit6_2';
      case 'unit6_2':
        return 'unit7';
      case 'unit7':
        return 'sentence3';
      case 'sentence3':
        return 'unit8';
      case 'unit8':
        return 'unit9';
      case 'unit9':
        return 'unit10';
      case 'unit10':
        return 'sentence4';
      case 'sentence4':
        return 'unit11';
      case 'unit11':
        return 'unit12';
      case 'unit12':
        return 'unit13';
      case 'unit13':
        return 'sentence5';
      case 'sentence5':
        return 'unit14';
      case 'unit14':
        return 'unit15';
      case 'unit15':
        return 'unit16';
      case 'unit16':
        return 'sentence6';
      case 'sentence6':
        return 'unit17';
      case 'unit17':
        return 'unit18';
      case 'unit18':
        return 'unit19';
      case 'unit19':
        return 'sentence7';
      case 'sentence7':
        return 'unit20';
      case 'unit20':
        return 'unit21';
      case 'unit21':
        return 'sentence8';
      case 'sentence8':
        return null;
    }
  };

  const stageContainerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [stageViewHeight, setStageViewHeight] = useState<number>(390);

  useEffect(() => {
    const el = stageContainerRef.current;
    if (!el) return;
    const updateViewHeight = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const desired = Math.round(VIEW_WIDTH * (rect.height / rect.width));
        const clamped = Math.max(MIN_VIEW_HEIGHT, Math.min(MAX_VIEW_HEIGHT, desired));
        setStageViewHeight((prev) => (Math.abs(prev - clamped) >= 2 ? clamped : prev));
      }
    };
    updateViewHeight();
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateViewHeight);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', updateViewHeight);
    return () => window.removeEventListener('resize', updateViewHeight);
  }, []);

  const viewMinY = VIEW_BOTTOM - stageViewHeight;
  const boardDropOffset = Math.round(Math.max(0, stageViewHeight - 280) * 0.27);
  const boardY = Math.min(134, viewMinY + 74 + boardDropOffset);
  const targetY = boardY - 14;
  const viewMinYRef = useRef(viewMinY);
  viewMinYRef.current = viewMinY;
  const stageViewHeightRef = useRef(stageViewHeight);
  stageViewHeightRef.current = stageViewHeight;
  const targetYRef = useRef(targetY);
  targetYRef.current = targetY;

  const autoAdvanceTimerRef = useRef<number | null>(null);
  const speechTimerRef = useRef<number | null>(null);
  const clearSpeechQueue = useCallback(() => {
    if (speechTimerRef.current !== null) {
      window.clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
    cancelSpeech();
  }, []);
  const clearAutoAdvanceTimer = useCallback(() => {
    if (autoAdvanceTimerRef.current !== null) {
      window.clearTimeout(autoAdvanceTimerRef.current);
      autoAdvanceTimerRef.current = null;
    }
    if (speechTimerRef.current !== null) {
      window.clearTimeout(speechTimerRef.current);
      speechTimerRef.current = null;
    }
  }, []);

  const chargeRef = useRef<{ active: ParticleChoice | null; startTime: number; power: number }>({
    active: null,
    startTime: 0,
    power: 0,
  });
  const flightRef = useRef({
    x: SLING_X,
    y: SLING_Y,
    vx: 0,
    vy: 0,
    particle: defaultChoiceForUnit(activeUnit),
    intendedMiss: null as MissKind | null,
    startTime: 0,
    impactTime: 0,
    resolved: false,
  });
  const phaseRef = useRef<GamePhase>(phase);
  phaseRef.current = phase;
  const controlModeRef = useRef<ControlMode>(controlMode);
  controlModeRef.current = controlMode;
  const hadMistakeThisQuestionRef = useRef(false);
  const hasRecordedResultRef = useRef(false);
  const unitRef = useRef<ParticleGameUnitId>(activeUnit);
  unitRef.current = activeUnit;
  const questionIdxRef = useRef(questionIdx);
  questionIdxRef.current = questionIdx;
  const totalQuestionsRef = useRef(totalQuestions);
  totalQuestionsRef.current = totalQuestions;
  const onSelectUnitRef = useRef(onSelectUnit);
  onSelectUnitRef.current = onSelectUnit;

  const u1ItemRef = useRef(currentU1Item);
  u1ItemRef.current = currentU1Item;
  const u2ItemRef = useRef(currentU2Item);
  u2ItemRef.current = currentU2Item;
  const u3ItemRef = useRef(currentU3Item);
  u3ItemRef.current = currentU3Item;
  const u4ItemRef = useRef(currentU4Item);
  u4ItemRef.current = currentU4Item;
  const u5ItemRef = useRef(currentU5Item);
  u5ItemRef.current = currentU5Item;
  const u6ItemRef = useRef(currentU6Item);
  u6ItemRef.current = currentU6Item;
  const u6_2ItemRef = useRef(currentU6_2Item);
  u6_2ItemRef.current = currentU6_2Item;
  const u7ItemRef = useRef(currentU7Item);
  u7ItemRef.current = currentU7Item;
  const u8ItemRef = useRef(currentU8Item);
  u8ItemRef.current = currentU8Item;
  const u9ItemRef = useRef(currentU9Item);
  u9ItemRef.current = currentU9Item;
  const u10ItemRef = useRef(currentU10Item);
  u10ItemRef.current = currentU10Item;
  const u11ItemRef = useRef(currentU11Item);
  u11ItemRef.current = currentU11Item;
  const u12ItemRef = useRef(currentU12Item);
  u12ItemRef.current = currentU12Item;
  const u13ItemRef = useRef(currentU13Item);
  u13ItemRef.current = currentU13Item;
  const u14ItemRef = useRef(currentU14Item);
  u14ItemRef.current = currentU14Item;
  const u15ItemRef = useRef(currentU15Item);
  u15ItemRef.current = currentU15Item;
  const u16ItemRef = useRef(currentU16Item);
  u16ItemRef.current = currentU16Item;
  const u17ItemRef = useRef(currentU17Item);
  u17ItemRef.current = currentU17Item;
  const u18ItemRef = useRef(currentU18Item);
  u18ItemRef.current = currentU18Item;
  const u19ItemRef = useRef(currentU19Item);
  u19ItemRef.current = currentU19Item;
  const u20ItemRef = useRef(currentU20Item);
  u20ItemRef.current = currentU20Item;
  const u21ItemRef = useRef(currentU21Item);
  u21ItemRef.current = currentU21Item;
  const s1ItemRef = useRef(currentS1Item);
  s1ItemRef.current = currentS1Item;
  const s2ItemRef = useRef(currentS2Item);
  s2ItemRef.current = currentS2Item;
  const s3ItemRef = useRef(currentS3Item);
  s3ItemRef.current = currentS3Item;
  const s4ItemRef = useRef(currentS4Item);
  s4ItemRef.current = currentS4Item;
  const s5ItemRef = useRef(currentS5Item);
  s5ItemRef.current = currentS5Item;
  const s6ItemRef = useRef(currentS6Item);
  s6ItemRef.current = currentS6Item;
  const s7ItemRef = useRef(currentS7Item);
  s7ItemRef.current = currentS7Item;
  const s8ItemRef = useRef(currentS8Item);
  s8ItemRef.current = currentS8Item;
  const activeButtonsRef = useRef(activeButtons);
  activeButtonsRef.current = activeButtons;
  const activeTargetXRef = useRef(activeTargetX);
  activeTargetXRef.current = activeTargetX;

  useEffect(() => {
    clearAutoAdvanceTimer();
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    if (activeUnit === 'unit6') {
      setUnit6Items(buildRandomUnit6Items());
    }
    setQuestionIdx(0);
    setSelectedParticle(defaultChoiceForUnit(activeUnit));
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setChargePower(0);
    setComboStreak(0);
    setBestComboInUnit(0);
    setFirstTryCount(0);
    setTotalMissesInUnit(0);
    totalMissesRef.current = 0;
    setClearBadgeOutcome(null);
    hadMistakeThisQuestionRef.current = false;
    hasRecordedResultRef.current = false;
    setPhase('ready');
    phaseRef.current = 'ready';
    cancelSpeech();
    return () => clearAutoAdvanceTimer();
  }, [activeUnit, clearAutoAdvanceTimer]);

  const handleReplayUnit = useCallback(() => {
    clearAutoAdvanceTimer();
    clearSpeechQueue();
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    if (unitRef.current === 'unit6') {
      setUnit6Items(buildRandomUnit6Items());
    }
    setQuestionIdx(0);
    setSelectedParticle(defaultChoiceForUnit(unitRef.current));
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setChargePower(0);
    setComboStreak(0);
    setBestComboInUnit(0);
    setFirstTryCount(0);
    setTotalMissesInUnit(0);
    totalMissesRef.current = 0;
    setClearBadgeOutcome(null);
    hadMistakeThisQuestionRef.current = false;
    hasRecordedResultRef.current = false;
    setPhase('ready');
    phaseRef.current = 'ready';
  }, [clearAutoAdvanceTimer, clearSpeechQueue]);

  const advanceToNext = useCallback(() => {
    const curIdx = questionIdxRef.current;
    const total = totalQuestionsRef.current;
    const u = unitRef.current;
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    setDragOffset(null);
    if (curIdx < total - 1) {
      hadMistakeThisQuestionRef.current = false;
      hasRecordedResultRef.current = false;
      setQuestionIdx(curIdx + 1);
      setSelectedParticle(defaultChoiceForUnit(u));
      setOutcome(null);
      setMissKind(null);
      setMissLandingPos(null);
      setChargePower(0);
      setPhase('ready');
      phaseRef.current = 'ready';
    } else {
      const outcomeBadge = recordSlingshotBadgeClear(u, totalMissesRef.current);
      setClearBadgeOutcome({
        tier: outcomeBadge.tier,
        newlyUnlockedTrophyMilestone: outcomeBadge.newlyUnlockedTrophyMilestone,
      });
      setPhase('cleared');
      phaseRef.current = 'cleared';
      playApplauseFanfare();
    }
  }, []);

  const scheduleAutoAdvance = useCallback(
    (delayMs = 900) => {
      clearAutoAdvanceTimer();
      autoAdvanceTimerRef.current = window.setTimeout(() => {
        autoAdvanceTimerRef.current = null;
        advanceToNext();
      }, delayMs);
    },
    [advanceToNext, clearAutoAdvanceTimer]
  );

  const playQueuedSpeech = useCallback(
    (text: string, isCorrect: boolean, autoAdvanceAfter = false) => {
      clearSpeechQueue();
      const spoken = isCorrect ? text : formatCleanWrongSpeech(text);
      const minAdvanceAt = performance.now() + 680;
      speechTimerRef.current = window.setTimeout(() => {
        speechTimerRef.current = null;
        speakKorean(spoken, 1.0, 1.0, () => {
          if (!autoAdvanceAfter) return;
          const remaining = Math.max(150, minAdvanceAt - performance.now());
          scheduleAutoAdvance(remaining);
        });
      }, isCorrect ? 80 : 90);
      if (autoAdvanceAfter) {
        // Fallback if speechSynthesis onend does not fire cleanly
        scheduleAutoAdvance(1650);
      }
    },
    [clearSpeechQueue, scheduleAutoAdvance]
  );

  const recordCorrectHit = useCallback(() => {
    if (hasRecordedResultRef.current) return;
    hasRecordedResultRef.current = true;
    if (!hadMistakeThisQuestionRef.current) {
      setFirstTryCount((c) => c + 1);
      setComboStreak((prev) => {
        const next = prev + 1;
        setBestComboInUnit((best) => Math.max(best, next));
        return next;
      });
    }
  }, []);

  const recordMistake = useCallback(() => {
    hadMistakeThisQuestionRef.current = true;
    totalMissesRef.current += 1;
    setTotalMissesInUnit((m) => m + 1);
    setComboStreak(0);
  }, []);

  const triggerImpact = useCallback(
    (choice: ParticleChoice) => {
      clearAutoAdvanceTimer();
      setOutcome(choice);
      setMissKind(null);
      setPhase('impact');
      phaseRef.current = 'impact';
      setImpactFlash(1);
      flightRef.current.impactTime = performance.now();

      const u = unitRef.current;
      if (u === 'unit1') {
        const item = u1ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
            predicate: item.predicate,
          });
          playQueuedSpeech(sentence, true, true);
        } else if (choice === '을') {
          recordMistake();
          playSpaceLaunchSfx();
          playQueuedSpeech('문장에 어울리는 조사를 다시 골라 보세요.', false);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.particleWrongSpeech, false);
        }
        return;
      }

      if (u === 'unit2') {
        const item = u2ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
          });
          playQueuedSpeech(sentence, true, true);
        } else if (choice === '고') {
          recordMistake();
          playGoPunSfx();
          playQueuedSpeech('받침을 보고 알맞은 말을 다시 골라 보세요.', false);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.grammarWrongSpeech, false);
        }
        return;
      }

      if (u === 'unit3') {
        const item = u3ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
            predicate: item.predicate,
          });
          playQueuedSpeech(sentence, true, true);
        } else if (choice === '을') {
          recordMistake();
          playSpaceLaunchSfx();
          playQueuedSpeech('문장에 어울리는 조사를 다시 골라 보세요.', false);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.subjectWrongSpeech, false);
        }
        return;
      }

      if (u === 'unit4') {
        const item = u4ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
            predicate: item.predicate,
            transformedWord: item.transformedWord,
          });
          playQueuedSpeech(sentence, true, true);
        } else if (choice === '을') {
          recordMistake();
          playSpaceLaunchSfx();
          playQueuedSpeech('문장에 어울리는 조사를 다시 골라 보세요.', false);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.subjectWrongSpeech, false);
        }
        return;
      }

      if (u === 'unit5') {
        const item = u5ItemRef.current;
        if (choice === item.correct) {
          recordCorrectHit();
          playJackpotSfx();
          const sentence = buildDirectSentenceSpeech({
            prefix: item.prefix,
            noun: item.noun,
            choice,
            predicate: item.predicate,
          });
          playQueuedSpeech(sentence, true, true);
        } else {
          recordMistake();
          playBounceSfx();
          playQueuedSpeech(item.wrongSpeech, false);
        }
        return;
      }

      const multiItem =
        u === 'unit6'
          ? u6ItemRef.current
          : u === 'unit6_2'
          ? u6_2ItemRef.current
          : u === 'unit7'
          ? u7ItemRef.current
          : u === 'unit8'
          ? u8ItemRef.current
          : u === 'unit9'
          ? u9ItemRef.current
          : u === 'unit10'
          ? u10ItemRef.current
          : u === 'unit11'
          ? u11ItemRef.current
          : u === 'unit12'
          ? u12ItemRef.current
          : u === 'unit13'
          ? u13ItemRef.current
          : u === 'unit14'
          ? u14ItemRef.current
          : u === 'unit15'
          ? u15ItemRef.current
          : u === 'unit16'
          ? u16ItemRef.current
          : u === 'unit17'
          ? u17ItemRef.current
          : u === 'unit18'
          ? u18ItemRef.current
          : u === 'unit19'
          ? u19ItemRef.current
          : u === 'unit20'
          ? u20ItemRef.current
          : u === 'unit21'
          ? u21ItemRef.current
          : u === 'sentence1'
          ? s1ItemRef.current
          : u === 'sentence2'
          ? s2ItemRef.current
          : u === 'sentence3'
          ? s3ItemRef.current
          : u === 'sentence4'
          ? s4ItemRef.current
          : u === 'sentence5'
          ? s5ItemRef.current
          : u === 'sentence6'
          ? s6ItemRef.current
          : u === 'sentence7'
          ? s7ItemRef.current
          : s8ItemRef.current;
      if ((multiItem.correctList as ParticleChoice[]).includes(choice)) {
        recordCorrectHit();
        playJackpotSfx();
        const sentence = buildDirectSentenceSpeech({
          prefix: multiItem.prefix,
          noun: multiItem.noun,
          choice,
          predicate: multiItem.predicate,
          transformedWord: multiItem.transformedWord,
        });
        playQueuedSpeech(sentence, true, true);
      } else {
        recordMistake();
        const fb = multiItem.wrongFeedback[choice];
        if (fb?.isSpaceGag) {
          playSpaceLaunchSfx();
          playQueuedSpeech('문장에 어울리는 조사를 다시 골라 보세요.', false);
        } else {
          playBounceSfx();
          playQueuedSpeech(fb?.wrongSpeech || '다시 생각해 봐요.', false);
        }
      }
    },
    [clearAutoAdvanceTimer, playQueuedSpeech, recordCorrectHit, recordMistake]
  );

  const triggerMiss = useCallback(
    (kind: MissKind, x: number, y: number) => {
      clearAutoAdvanceTimer();
      clearSpeechQueue();
      recordMistake();
      setOutcome(null);
      setMissKind(kind);
      setMissLandingPos({ x, y });
      setPhase('missed');
      phaseRef.current = 'missed';

      playMissSfx(kind);
    },
    [clearAutoAdvanceTimer, clearSpeechQueue, recordMistake]
  );

  const launchFromCharge = useCallback((choice: ParticleChoice, power: number) => {
    const f = flightRef.current;
    f.particle = choice;
    f.x = SLING_X;
    f.y = SLING_Y;
    f.resolved = false;

    if (power < SWEET_MIN) {
      const ratio = Math.max(0.18, power / SWEET_MIN);
      f.intendedMiss = 'short';
      f.vx = 110 + ratio * 155;
      f.vy = -120 - ratio * 165;
    } else if (power <= SWEET_MAX) {
      const T = 0.56;
      f.intendedMiss = null;
      f.vx = (activeTargetXRef.current - SLING_X) / T;
      f.vy = (targetYRef.current - SLING_Y - 0.5 * GRAVITY * T * T) / T;
    } else {
      const over = (power - SWEET_MAX) / (1 - SWEET_MAX);
      const sweetT = 0.56;
      const sweetVy = (targetYRef.current - SLING_Y - 0.5 * GRAVITY * sweetT * sweetT) / sweetT;
      f.intendedMiss = 'over';
      f.vx = 520 + over * 240;
      f.vy = Math.min(-1080, sweetVy - 380) - over * 380;
    }

    f.startTime = performance.now();
    setSelectedParticle(choice);
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setPhase('flying');
    phaseRef.current = 'flying';
    playLaunchSfx();
  }, []);

  const launchManualSlingshot = useCallback((choice: ParticleChoice, vx: number, vy: number) => {
    const f = flightRef.current;
    f.particle = choice;
    f.x = SLING_X;
    f.y = SLING_Y;
    f.vx = vx;
    f.vy = vy;
    f.intendedMiss = null;
    f.resolved = false;
    f.startTime = performance.now();

    setSelectedParticle(choice);
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setPhase('flying');
    phaseRef.current = 'flying';
    playLaunchSfx();
  }, []);

  const startChargingButton = useCallback(
    (btn: ArcadeButtonConfig) => {
      if (phaseRef.current === 'cleared') return;
      if (controlModeRef.current === 'easy') {
        clearAutoAdvanceTimer();
        clearSpeechQueue();
        playButtonSfx(btn.idx);
        chargeRef.current = { active: null, startTime: 0, power: 0.667 };
        setChargingBtn(null);
        setChargePower(0.667);
        launchFromCharge(btn.particle, 0.667);
        return;
      }
      if (chargeRef.current.active === btn.particle) return;
      clearAutoAdvanceTimer();
      clearSpeechQueue();
      playButtonSfx(btn.idx);
      chargeRef.current = { active: btn.particle, startTime: performance.now(), power: 0.04 };
      setSelectedParticle(btn.particle);
      setOutcome(null);
      setMissKind(null);
      setMissLandingPos(null);
      setPhase('ready');
      phaseRef.current = 'ready';
      setChargingBtn(btn.particle);
      setChargePower(0.04);
    },
    [clearAutoAdvanceTimer, clearSpeechQueue, launchFromCharge]
  );

  const releaseChargingButton = useCallback(
    (particle?: ParticleChoice) => {
      const active = chargeRef.current.active;
      if (!active) return;
      if (particle && active !== particle) return;
      const finalPower = chargeRef.current.power;
      chargeRef.current.active = null;
      setChargingBtn(null);
      setChargePower(finalPower);
      launchFromCharge(active, finalPower);
    },
    [launchFromCharge]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const found = activeButtonsRef.current.find((b) => b.keyHint === e.key);
      if (found) startChargingButton(found);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const found = activeButtonsRef.current.find((b) => b.keyHint === e.key);
      if (found) releaseChargingButton(found.particle);
    };
    const onGlobalPointerUp = () => {
      if (chargeRef.current.active) releaseChargingButton();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('pointerup', onGlobalPointerUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('pointerup', onGlobalPointerUp);
    };
  }, [startChargingButton, releaseChargingButton]);

  useEffect(() => {
    let rafId: number;
    let lastNow = performance.now();
    const step = (now: number) => {
      const dt = Math.min((now - lastNow) / 1000, 0.04);
      lastNow = now;
      setAnimTime((t) => t + dt);
      setImpactFlash((f) => Math.max(0, f - dt * 2.4));

      if (chargeRef.current.active) {
        const elapsed = (now - chargeRef.current.startTime) / 1000;
        const p = Math.min(1, 0.04 + elapsed / CHARGE_FULL_SEC);
        chargeRef.current.power = p;
        setChargePower(p);
      }

      if (phaseRef.current === 'flying') {
        const f = flightRef.current;
        const t = (now - f.startTime) / 1000;
        const nx = SLING_X + f.vx * t;
        const ny = SLING_Y + f.vy * t + 0.5 * GRAVITY * t * t;
        f.x = nx;
        f.y = ny;

        if (!f.resolved) {
          if (f.intendedMiss === 'short') {
            if (ny >= 336) {
              f.resolved = true;
              triggerMiss('short', Math.min(nx, 440), 336);
            }
          } else if (f.intendedMiss === 'over') {
            const topOutY = viewMinYRef.current - 45;
            if (ny < topOutY || nx > 1010) {
              f.resolved = true;
              triggerMiss('over', Math.min(910, Math.max(240, nx)), viewMinYRef.current + 36);
            }
          } else {
            const targetX = activeTargetXRef.current;
            const liveTargetY = targetYRef.current;
            const topOutY = viewMinYRef.current - 55;
            const dist = Math.hypot(nx - targetX, ny - liveTargetY);
            if (dist < 68 || (nx >= targetX - 28 && ny <= liveTargetY + 62 && ny >= liveTargetY - 68)) {
              f.resolved = true;
              triggerImpact(f.particle);
            } else if (ny >= 344) {
              f.resolved = true;
              triggerMiss('short', Math.min(nx, 880), 336);
            } else if (ny < topOutY || nx > 1020) {
              f.resolved = true;
              triggerMiss('over', Math.min(910, Math.max(240, nx)), viewMinYRef.current + 36);
            }
          }
        }
      }
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [triggerImpact, triggerMiss]);

  const getSvgCoords = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: SLING_X, y: SLING_Y };
    const ctm = svg.getScreenCTM();
    if (ctm) {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const mapped = pt.matrixTransform(ctm.inverse());
      return { x: mapped.x, y: mapped.y };
    }
    const rect = svg.getBoundingClientRect();
    return {
      x: 20 + ((clientX - rect.left) / rect.width) * VIEW_WIDTH,
      y: viewMinYRef.current + ((clientY - rect.top) / rect.height) * stageViewHeightRef.current,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (phase === 'flying' || phase === 'cleared') return;
    const pt = getSvgCoords(e.clientX, e.clientY);
    if (pt.x < 340 && pt.y > 125) {
      clearAutoAdvanceTimer();
      e.currentTarget.setPointerCapture(e.pointerId);
      setOutcome(null);
      setMissKind(null);
      setMissLandingPos(null);
      setPhase('ready');
      phaseRef.current = 'ready';
      setDragOffset({
        dx: Math.max(-120, Math.min(40, pt.x - SLING_X)),
        dy: Math.max(-45, Math.min(100, pt.y - SLING_Y)),
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragOffset) return;
    const pt = getSvgCoords(e.clientX, e.clientY);
    setDragOffset({
      dx: Math.max(-125, Math.min(30, pt.x - SLING_X)),
      dy: Math.max(-45, Math.min(105, pt.y - SLING_Y)),
    });
  };

  const handlePointerUp = () => {
    if (!dragOffset) return;
    const dragScaleY = stageViewHeightRef.current > 460 ? 10.6 * (stageViewHeightRef.current / 420) : 10.6;
    const powerX = -dragOffset.dx * 9.8;
    const powerY = -dragOffset.dy * dragScaleY;
    if (Math.hypot(dragOffset.dx, dragOffset.dy) > 22 && powerX > 120) {
      launchManualSlingshot(selectedParticle, powerX, powerY);
    } else {
      setDragOffset(null);
    }
  };

  const handleReset = () => {
    clearAutoAdvanceTimer();
    clearSpeechQueue();
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setChargePower(0);
    setPhase('ready');
    phaseRef.current = 'ready';
  };

  const handleGoQuestion = (nextIdx: number) => {
    clearAutoAdvanceTimer();
    clearSpeechQueue();
    chargeRef.current = { active: null, startTime: 0, power: 0 };
    setChargingBtn(null);
    hadMistakeThisQuestionRef.current = false;
    hasRecordedResultRef.current = false;
    setQuestionIdx(nextIdx);
    setSelectedParticle(defaultChoiceForUnit(activeUnit));
    setOutcome(null);
    setMissKind(null);
    setMissLandingPos(null);
    setDragOffset(null);
    setChargePower(0);
    setPhase('ready');
    phaseRef.current = 'ready';
  };

  const impactAge = phase === 'impact' ? Math.max(0, (performance.now() - flightRef.current.impactTime) / 1000) : 0;
  const activeBtnMeta = activeButtons.find((b) => b.particle === (outcome || selectedParticle)) || activeButtons[0];
  const flyingBtnMeta = activeButtons.find((b) => b.particle === flightRef.current.particle) || activeBtnMeta;

  const isU1Correct = activeUnit === 'unit1' && outcome === currentU1Item.correct;
  const isU1ParticleWrong = activeUnit === 'unit1' && outcome === currentU1Item.wrongParticleChoice;
  const isU1EulWrong = activeUnit === 'unit1' && outcome === '을';

  const isU2Correct = activeUnit === 'unit2' && outcome === currentU2Item.correct;
  const isU2GrammarWrong = activeUnit === 'unit2' && outcome === currentU2Item.wrongGrammarChoice;
  const isU2GoGag = activeUnit === 'unit2' && outcome === '고';

  const isU3Correct = activeUnit === 'unit3' && outcome === currentU3Item.correct;
  const isU3SubjectWrong = activeUnit === 'unit3' && outcome === currentU3Item.wrongSubjectChoice;
  const isU3EulWrong = activeUnit === 'unit3' && outcome === '을';

  const isU4Correct = activeUnit === 'unit4' && outcome === currentU4Item.correct;
  const isU4SubjectWrong = activeUnit === 'unit4' && outcome === currentU4Item.wrongSubjectChoice;
  const isU4EulWrong = activeUnit === 'unit4' && outcome === '을';

  const isU5Correct = activeUnit === 'unit5' && outcome === currentU5Item.correct;
  const isU5Wrong = activeUnit === 'unit5' && outcome === currentU5Item.wrongChoice;

  const isMultiUnit =
    activeUnit === 'unit6' ||
    activeUnit === 'unit6_2' ||
    activeUnit === 'unit7' ||
    activeUnit === 'unit8' ||
    activeUnit === 'unit9' ||
    activeUnit === 'unit10' ||
    activeUnit === 'unit11' ||
    activeUnit === 'unit12' ||
    activeUnit === 'unit13' ||
    activeUnit === 'unit14' ||
    activeUnit === 'unit15' ||
    activeUnit === 'unit16' ||
    activeUnit === 'unit17' ||
    activeUnit === 'unit18' ||
    activeUnit === 'unit19' ||
    activeUnit === 'unit20' ||
    activeUnit === 'unit21' ||
    isSentenceUnit;
  const currentMultiItem =
    activeUnit === 'unit6'
      ? currentU6Item
      : activeUnit === 'unit6_2'
      ? currentU6_2Item
      : activeUnit === 'unit7'
      ? currentU7Item
      : activeUnit === 'unit8'
      ? currentU8Item
      : activeUnit === 'unit9'
      ? currentU9Item
      : activeUnit === 'unit10'
      ? currentU10Item
      : activeUnit === 'unit11'
      ? currentU11Item
      : activeUnit === 'unit12'
      ? currentU12Item
      : activeUnit === 'unit13'
      ? currentU13Item
      : activeUnit === 'unit14'
      ? currentU14Item
      : activeUnit === 'unit15'
      ? currentU15Item
      : activeUnit === 'unit16'
      ? currentU16Item
      : activeUnit === 'unit17'
      ? currentU17Item
      : activeUnit === 'unit18'
      ? currentU18Item
      : activeUnit === 'unit19'
      ? currentU19Item
      : activeUnit === 'unit20'
      ? currentU20Item
      : activeUnit === 'unit21'
      ? currentU21Item
      : activeUnit === 'sentence1'
      ? currentS1Item
      : activeUnit === 'sentence2'
      ? currentS2Item
      : activeUnit === 'sentence3'
      ? currentS3Item
      : activeUnit === 'sentence4'
      ? currentS4Item
      : activeUnit === 'sentence5'
      ? currentS5Item
      : activeUnit === 'sentence6'
      ? currentS6Item
      : activeUnit === 'sentence7'
      ? currentS7Item
      : currentS8Item;
  const isMultiCorrect = isMultiUnit && outcome !== null && (currentMultiItem.correctList as ParticleChoice[]).includes(outcome);
  const multiWrongFeedback =
    isMultiUnit && outcome && !(currentMultiItem.correctList as ParticleChoice[]).includes(outcome)
      ? currentMultiItem.wrongFeedback[outcome]
      : undefined;
  const isMultiSpaceGag = Boolean(multiWrongFeedback?.isSpaceGag);
  const isMultiRicochet = Boolean(multiWrongFeedback && !multiWrongFeedback.isSpaceGag);

  const isAnyCorrect = isU1Correct || isU2Correct || isU3Correct || isU4Correct || isU5Correct || isMultiCorrect;
  const isAnySpaceGag = isU1EulWrong || isU3EulWrong || isU4EulWrong || isU2GoGag || isMultiSpaceGag;
  const isAnyRicochet =
    isU1ParticleWrong || isU2GrammarWrong || isU3SubjectWrong || isU4SubjectWrong || isU5Wrong || isMultiRicochet;

  const isLastQuestion = questionIdx === totalQuestions - 1;
  const isUnitAllClear = isAnyCorrect && isLastQuestion;

  let jollaFace: FaceMode = 'happy';
  let jollaX = 105;
  let jollaY = 302;
  const jollaRot = 0;

  if (phase === 'impact') {
    if (isAnyCorrect) {
      jollaFace = 'happy';
      jollaY = 302 - Math.abs(Math.sin(animTime * 9)) * 18;
    } else if (isAnyRicochet) {
      jollaFace = 'dizzy';
      jollaX = 105 + Math.sin(animTime * 24) * 5;
    } else if (isAnySpaceGag) {
      jollaFace = 'panic';
      jollaX = 105 + Math.min(impactAge * 130, 110);
    }
  } else if (phase === 'missed') {
    jollaFace = missKind === 'short' ? 'headClutch' : 'panic';
  }

  let mascotX = 760;
  let mascotY = 266;
  let mascotRot = 0;

  if (phase === 'impact') {
    if (isAnyCorrect) {
      mascotY = 252 + Math.sin(animTime * 5) * 8;
    } else if (isAnyRicochet) {
      mascotX = 760 + Math.sin(animTime * 35) * 4;
    } else if (isU1EulWrong || isU3EulWrong || isU4EulWrong || isMultiSpaceGag) {
      const flyT = Math.min(impactAge / 1.1, 1);
      mascotX = 760 + flyT * 260;
      mascotY = 266 - flyT * 320;
      mascotRot = flyT * 960;
    } else if (isU2GoGag) {
      if (currentU2Item.id === 'yeonpil') {
        const flyT = Math.min(impactAge / 0.95, 1);
        mascotX = 760 + flyT * 210;
        mascotY = 266 - flyT * 330;
        mascotRot = 35;
      } else {
        mascotX = 760 + impactAge * 260;
        mascotY = 264 - Math.abs(Math.sin(animTime * 20)) * 12;
      }
    }
  }

  const shouldRicochet = phase === 'impact' && isAnyRicochet;
  const bounceAge = shouldRicochet ? Math.min(impactAge / 0.55, 1) : 0;
  const ricochetX = shouldRicochet ? activeTargetX + (jollaX + 10 - activeTargetX) * bounceAge : 0;
  const ricochetY = shouldRicochet
    ? targetY + (jollaY - 35 - targetY) * bounceAge - Math.sin(bounceAge * Math.PI) * 95
    : 0;

  const dragScaleY = stageViewHeight > 460 ? 10.6 * (stageViewHeight / 420) : 10.6;
  const effectivePull = dragOffset ? dragOffset : chargingBtn ? { dx: -chargePower * 96, dy: chargePower * 34 } : null;
  const aimDots = dragOffset
    ? Array.from({ length: 10 }).map((_, idx) => {
        const dt = (idx + 1) * 0.055;
        return {
          x: SLING_X + -dragOffset.dx * 9.8 * dt,
          y: SLING_Y + -dragOffset.dy * dragScaleY * dt + 0.5 * GRAVITY * dt * dt,
        };
      })
    : [];

  const currentNounLabel =
    activeUnit === 'unit1'
      ? currentU1Item.noun
      : activeUnit === 'unit2'
      ? currentU2Item.noun
      : activeUnit === 'unit3'
      ? currentU3Item.noun
      : activeUnit === 'unit4'
      ? currentU4Item.noun
      : activeUnit === 'unit5'
      ? currentU5Item.noun
      : currentMultiItem.noun;

  const textForBgHex = (bgHex: string) =>
    ['#F2FCF7', '#ECFDF5', '#E6FFFA', '#D1FAE5', '#DCFCE7', '#FACC15', '#FFFBEB', '#F3E8FF', '#FFE4E6', '#E0F2FE', '#FFF4F7', '#FAF5FF', '#F0F9FF'].includes(bgHex)
      ? '#1E293B'
      : '#FFFFFF';
  const currentBallColor = activeBtnMeta.accentHex || textForBgHex(activeBtnMeta.bgHex);
  const flyingBallColor = flyingBtnMeta.accentHex || textForBgHex(flyingBtnMeta.bgHex);
  const ricochetMeta = activeButtons.find((b) => b.particle === outcome) || activeBtnMeta;
  const ricochetBg = ricochetMeta.bgHex;
  const ricochetColor = ricochetMeta.accentHex || textForBgHex(ricochetBg);

  const stdItem =
    activeUnit === 'unit1'
      ? {
          prefix: currentU1Item.prefix,
          noun: currentU1Item.noun,
          predicate: currentU1Item.predicate,
          isCorrect: isU1Correct,
          isRedPredicate: Boolean(currentU1Item.isRedPredicate),
          transformedHead: undefined,
          transformedTail: undefined,
        }
      : activeUnit === 'unit3'
      ? {
          prefix: currentU3Item.prefix,
          noun: currentU3Item.noun,
          predicate: currentU3Item.predicate,
          isCorrect: isU3Correct,
          isRedPredicate: Boolean(currentU3Item.isRedPredicate),
          transformedHead: undefined,
          transformedTail: undefined,
        }
      : activeUnit === 'unit4'
      ? {
          prefix: currentU4Item.prefix,
          noun: currentU4Item.noun,
          predicate: currentU4Item.predicate,
          isCorrect: isU4Correct,
          isRedPredicate: Boolean(currentU4Item.isRedPredicate),
          transformedHead: isU4Correct ? currentU4Item.transformedHead : undefined,
          transformedTail: isU4Correct ? currentU4Item.transformedTail : undefined,
        }
      : activeUnit === 'unit5'
      ? {
          prefix: currentU5Item.prefix,
          noun: currentU5Item.noun,
          predicate: currentU5Item.predicate,
          isCorrect: isU5Correct,
          isRedPredicate: Boolean(currentU5Item.isRedPredicate),
          transformedHead: undefined,
          transformedTail: undefined,
        }
      : {
          prefix: currentMultiItem.prefix,
          noun: currentMultiItem.noun,
          predicate: currentMultiItem.predicate,
          isCorrect: isMultiCorrect,
          isRedPredicate: Boolean(currentMultiItem.isRedPredicate),
          transformedHead: isMultiCorrect ? currentMultiItem.transformedHead : undefined,
          transformedTail: isMultiCorrect ? currentMultiItem.transformedTail : undefined,
        };

  const correctHintForUnit =
    activeUnit === 'unit1'
      ? currentU1Item.correct
      : activeUnit === 'unit2'
      ? currentU2Item.correct
      : activeUnit === 'unit3'
      ? currentU3Item.correct
      : activeUnit === 'unit4'
      ? currentU4Item.correct
      : activeUnit === 'unit5'
      ? currentU5Item.correct
      : currentMultiItem.correctList[0];

  const wrongRuleCue =
    phase === 'impact' && outcome && !isAnyCorrect
      ? getWrongRuleHighlight(
          activeUnit,
          currentNounLabel,
          outcome,
          activeUnit === 'unit2' ? '' : stdItem.predicate,
          correctHintForUnit
        )
      : null;

  const earnedStars = firstTryCount >= totalQuestions ? 3 : firstTryCount >= 3 ? 2 : 1;

  const flightTimeSec =
    phase === 'flying' ? Math.max(0, (performance.now() - flightRef.current.startTime) / 1000) : 0;
  const flightVelX = flightRef.current.vx;
  const flightVelY = flightRef.current.vy + GRAVITY * flightTimeSec;
  const flightSpeed = Math.hypot(flightVelX, flightVelY) || 1;
  const flightUx = flightVelX / flightSpeed;
  const flightUy = flightVelY / flightSpeed;

  const nextUnitTarget = nextUnitForUnit(activeUnit);
  const nextUnitLabelMap: Record<ParticleGameUnitId, string> = {
    unit1: '① 주제',
    unit2: '② 소개',
    sentence1: '③ 문장 만들기 1',
    unit3: '④ 주격',
    unit4: '⑤ 주격 ★',
    unit5: '⑥ 목적어',
    sentence2: '⑦ 문장 만들기 2',
    unit6: '⑧ 에·에서',
    unit6_2: '⑨ 에·에서2',
    unit7: '⑩ 도',
    sentence3: '⑪ 문장 만들기 3',
    unit8: '⑫ 와·과·하고·이랑·랑',
    unit9: '⑬ 으로·로',
    unit10: '⑭ 에게·한테',
    sentence4: '⑮ 문장 만들기 4',
    unit11: '⑯ 부터·까지',
    unit12: '⑰ 이나·나',
    unit13: '⑱ 마다·-씩',
    sentence5: '⑲ 문장 만들기 5',
    unit14: '⑳ 만',
    unit15: '㉑ 밖에 ★',
    unit16: '㉒ 보다',
    sentence6: '㉓ 문장 만들기 6',
    unit17: '㉔ 처럼·같이',
    unit18: '㉕ 의 ★',
    unit19: '㉖ 끼리',
    sentence7: '㉗ 문장 만들기 7',
    unit20: '㉘ 께서·께 ★',
    unit21: '㉙ 아·야',
    sentence8: '㉚ 문장 만들기 8',
  };
  const nextUnitBtnLabel = nextUnitTarget
    ? `${gameUi.nextUnitPrefix} ${nextUnitLabelMap[nextUnitTarget]}${gameUi.nextUnitSuffix ? ` ${gameUi.nextUnitSuffix}` : ''}`
    : '';

  const unitNumberLabel =
    activeUnit === 'unit1'
      ? '1단원'
      : activeUnit === 'unit2'
      ? '2단원'
      : activeUnit === 'sentence1'
      ? '3단원'
      : activeUnit === 'unit3'
      ? '4단원'
      : activeUnit === 'unit4'
      ? '5단원'
      : activeUnit === 'unit5'
      ? '6단원'
      : activeUnit === 'sentence2'
      ? '7단원'
      : activeUnit === 'unit6'
      ? '8단원'
      : activeUnit === 'unit6_2'
      ? '9단원'
      : activeUnit === 'unit7'
      ? '10단원'
      : activeUnit === 'sentence3'
      ? '11단원'
      : activeUnit === 'unit8'
      ? '12단원'
      : activeUnit === 'unit9'
      ? '13단원'
      : activeUnit === 'unit10'
      ? '14단원'
      : activeUnit === 'sentence4'
      ? '15단원'
      : activeUnit === 'unit11'
      ? '16단원'
      : activeUnit === 'unit12'
      ? '17단원'
      : activeUnit === 'unit13'
      ? '18단원'
      : activeUnit === 'sentence5'
      ? '19단원'
      : activeUnit === 'unit14'
      ? '20단원'
      : activeUnit === 'unit15'
      ? '21단원'
      : activeUnit === 'unit16'
      ? '22단원'
      : activeUnit === 'sentence6'
      ? '23단원'
      : activeUnit === 'unit17'
      ? '24단원'
      : activeUnit === 'unit18'
      ? '25단원'
      : activeUnit === 'unit19'
      ? '26단원'
      : activeUnit === 'sentence7'
      ? '27단원'
      : activeUnit === 'unit20'
      ? '28단원'
      : activeUnit === 'unit21'
      ? '29단원'
      : '30단원';

  return (
    <div className="w-full max-w-4xl mx-auto font-korean-gothic select-none">
      <div
        className={`relative h-[400px] sm:h-[500px] rounded-lg border-2 border-emerald-200 shadow-md ${
          isAnyCorrect ? 'bg-[#CCFBF1]' : 'bg-[#D8FAEC]'
        } overflow-hidden flex flex-col justify-between`}
        style={{
          transform:
            impactFlash > 0.35
              ? `translate(${Math.sin(animTime * 60) * 3 * impactFlash}px, ${Math.cos(animTime * 54) * 2.5 * impactFlash}px)`
              : undefined,
        }}
      >
        {/* 상단 좌/우 안내 문구 + 정중앙 메모리게임 동일 뱃지 앨범 버튼 */}
        <div className="relative z-20 w-full shrink-0 px-2 sm:px-4 pt-1.5 sm:pt-2.5 pb-0.5">
          <div className="w-full grid grid-cols-[1fr_auto_1fr] items-start gap-1.5 sm:gap-4 px-1 pt-0 sm:pt-0.5">
            <div className="flex justify-start pt-0.5 sm:pt-1 pointer-events-none">
              <p className="font-badasseugi text-xs sm:text-sm font-bold text-emerald-950 leading-snug text-left break-keep -rotate-3 origin-center select-none">
                알맞은 조사를 골라요
              </p>
            </div>

            <GameBadgeAlbumButton
              onClick={() => setIsBadgeModalOpen(true)}
              title="내 앨범"
            />

            <div className="flex justify-end pt-0.5 sm:pt-1 pointer-events-none">
              <p className="font-badasseugi text-xs sm:text-sm font-bold text-emerald-900 leading-snug text-right break-keep rotate-3 origin-center select-none">
                버튼을 꾹 눌렀다 떼요
              </p>
            </div>
          </div>
        </div>

        {/* 새총 무대 SVG: 화면 비율에 맞춰 위 하늘 공간을 동적으로 확장 (모바일 상단 데드존 제거) */}
        <div
          ref={stageContainerRef}
          className="relative w-full flex-1 min-h-0 overflow-hidden"
          style={{
            background: isAnyCorrect
              ? 'linear-gradient(to bottom, #CCFBF1 0%, #ECFDF5 68%, #6EE7B7 100%)'
              : 'linear-gradient(to bottom, #D8FAEC 0%, #ECFEF6 68%, #6EE7B7 100%)',
          }}
        >
          <svg
            ref={svgRef}
            viewBox={`20 ${viewMinY} ${VIEW_WIDTH} ${stageViewHeight}`}
            preserveAspectRatio="xMidYMax meet"
            className="absolute inset-0 w-full h-full block touch-pan-y cursor-crosshair"
            style={{ touchAction: dragOffset ? 'none' : 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <defs>
              <linearGradient id="abSkyDefault" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D8FAEC" />
                <stop offset="55%" stopColor="#ECFEF6" />
                <stop offset="100%" stopColor="#F9FFFC" />
              </linearGradient>
              <linearGradient id="abSkyWin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CCFBF1" />
                <stop offset="58%" stopColor="#ECFDF5" />
                <stop offset="100%" stopColor="#FEF9C3" />
              </linearGradient>
              <linearGradient id="mintHillFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.65" />
                <stop offset="35%" stopColor="#A7F3D0" />
                <stop offset="100%" stopColor="#6EE7B7" />
              </linearGradient>
              <filter id="boardShadow" x="-8%" y="-12%" width="116%" height="132%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#10B981" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* 1. 화사한 에메랄드·민트 파스텔 하늘 (상단 끝까지 이음새 없이 풀 블리드) */}
            <rect
              x="-220"
              y={viewMinY - 160}
              width="1440"
              height={stageViewHeight + 280}
              fill={isAnyCorrect ? 'url(#abSkyWin)' : 'url(#abSkyDefault)'}
            />

            {/* 하늘 반짝임 별빛 포인트 */}
            <g fill="#6EE7B7" opacity="0.45">
              <path d={`M120 ${viewMinY + 38} L123 ${viewMinY + 46} L131 ${viewMinY + 49} L123 ${viewMinY + 52} L120 ${viewMinY + 60} L117 ${viewMinY + 52} L109 ${viewMinY + 49} L117 ${viewMinY + 46} Z`} />
              <path d={`M895 ${viewMinY + 34} L897.5 ${viewMinY + 40} L903.5 ${viewMinY + 42.5} L897.5 ${viewMinY + 45} L895 ${viewMinY + 51} L892.5 ${viewMinY + 45} L886.5 ${viewMinY + 42.5} L892.5 ${viewMinY + 40} Z`} />
              <circle cx="290" cy={viewMinY + 36} r="3" fill="#A7F3D0" />
              <circle cx="780" cy={Math.round(boardY + (240 - boardY) * 0.48)} r="3.5" fill="#A7F3D0" />
            </g>

            {/* 2. 몽글몽글 파스텔 구름 (확장된 하늘 전체에 고르게 배치) */}
            <g fill="#FFFFFF" opacity="0.86">
              <g transform={`translate(115, ${Math.round(boardY + 18)})`}>
                <circle cx="-26" cy="8" r="22" />
                <circle cx="0" cy="0" r="28" />
                <circle cx="28" cy="10" r="20" />
                <rect x="-28" y="8" width="58" height="20" rx="10" />
              </g>
              <g transform={`translate(360, ${Math.round(boardY + (240 - boardY) * 0.52)})`}>
                <circle cx="-22" cy="8" r="18" />
                <circle cx="2" cy="0" r="24" />
                <circle cx="26" cy="8" r="17" />
                <rect x="-24" y="6" width="52" height="19" rx="9.5" />
              </g>
              <g transform={`translate(885, ${Math.round(boardY + (240 - boardY) * 0.56)})`}>
                <circle cx="-26" cy="8" r="20" />
                <circle cx="0" cy="0" r="26" />
                <circle cx="28" cy="8" r="19" />
                <rect x="-28" y="8" width="58" height="19" rx="9.5" />
              </g>
            </g>

            {/* 3. 먼 파스텔 민트 언덕 (레이어 1) */}
            <path
              d="M-220 296 Q155 242 320 284 Q490 238 670 282 Q845 240 1220 278 L1220 440 L-220 440 Z"
              fill="#D1FAE5"
              opacity="0.82"
            />

            {/* 4. 중간 부드러운 곡선 민트 언덕 (레이어 2) */}
            <path
              d="M-220 322 Q190 276 380 316 Q585 274 785 316 Q905 292 1220 308 L1220 440 L-220 440 Z"
              fill="#A7F3D0"
              opacity="0.72"
            />

            {/* 5. 포근한 앞쪽 에메랄드 민트 잔디 언덕 바닥 */}
            <path
              d="M-220 352 Q240 334 495 348 Q755 362 1220 344 L1220 440 L-220 440 Z"
              fill="url(#mintHillFront)"
            />
            <path
              d="M-220 352 Q240 334 495 348 Q755 362 1220 344"
              fill="none"
              stroke="#6EE7B7"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* 언덕 위 아기자기한 파스텔 꽃·풀잎 장식 */}
            <g opacity="0.85">
              <circle cx="72" cy="376" r="4" fill="#FFFFFF" />
              <circle cx="72" cy="376" r="1.6" fill="#34D399" />
              <circle cx="295" cy="382" r="4.2" fill="#FFFFFF" />
              <circle cx="295" cy="382" r="1.7" fill="#34D399" />
              <circle cx="640" cy="378" r="4" fill="#FFFFFF" />
              <circle cx="640" cy="378" r="1.6" fill="#10B981" />
              <circle cx="912" cy="370" r="4.2" fill="#FFFFFF" />
              <circle cx="912" cy="370" r="1.7" fill="#34D399" />
              <path d="M442 370 Q445 359 450 368 Q455 358 458 370" fill="none" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M775 376 Q778 365 783 374 Q788 364 791 376" fill="none" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" />
            </g>

            {/* 목표 문장 보드 (하늘 배경 내 동적 최상단 배치) */}
            {isEndSlotLayout ? (
              <g transform={`translate(610, ${boardY})`} filter="url(#boardShadow)">
                {(() => {
                  const endPrefix = activeUnit === 'unit2' ? currentU2Item.prefix : stdItem.prefix || '';
                  const endNoun = activeUnit === 'unit2' ? currentU2Item.noun : stdItem.noun;
                  const endCorrect = activeUnit === 'unit2' ? isU2Correct : stdItem.isCorrect;
                  return (
                    <>
                      <rect
                        x="-260"
                        y="-66"
                        width="520"
                        height="112"
                        rx="24"
                        fill="#FFFFFF"
                        stroke={endCorrect ? '#10B981' : outcome ? '#FB7185' : '#6EE7B7'}
                        strokeWidth="4.5"
                      />
                      <text
                        x="-192"
                        y="6"
                        textAnchor="middle"
                        fontSize={endPrefix.length >= 5 ? 22 : 34}
                        fontWeight="800"
                        fill="#475569"
                      >
                        {endPrefix}
                      </text>
                      <text
                        x="-42"
                        y="12"
                        textAnchor="middle"
                        fontSize={endNoun.length >= 3 ? 44 : 54}
                        fontWeight="900"
                        fill="#1E293B"
                      >
                        {wrongRuleCue?.highlightLastSyllable && endNoun.length > 0 ? (
                          <>
                            <tspan>{endNoun.slice(0, -1)}</tspan>
                            <tspan fill="#E11D48" textDecoration="underline">
                              {endNoun.slice(-1)}
                            </tspan>
                          </>
                        ) : (
                          endNoun
                        )}
                      </text>
                      <g transform="translate(132, -14)">
                        <rect
                          x="-76"
                          y="-40"
                          width="152"
                          height="80"
                          rx="18"
                          fill={endCorrect ? '#D1FAE5' : outcome ? '#FFE4E6' : '#ECFDF5'}
                          stroke={endCorrect ? '#059669' : outcome ? '#FB7185' : '#34D399'}
                          strokeWidth="3.5"
                        />
                        <text
                          x="0"
                          y={outcome ? 15 : 21}
                          textAnchor="middle"
                          fontSize={outcome ? (String(outcome).length > 2 ? 38 : 48) : 52}
                          fontWeight="900"
                          fill={endCorrect ? '#047857' : outcome ? '#E11D48' : '#10B981'}
                        >
                          {outcome ? outcome : '?'}
                        </text>
                      </g>
                    </>
                  );
                })()}
              </g>
            ) : (
              <g transform={`translate(615, ${boardY})`} filter="url(#boardShadow)">
                <rect
                  x={stdItem.prefix ? -382 : -290}
                  y="-66"
                  width={stdItem.prefix ? 672 : 580}
                  height="112"
                  rx="24"
                  fill="#FFFFFF"
                  stroke={stdItem.isCorrect ? '#10B981' : outcome ? '#FB7185' : '#6EE7B7'}
                  strokeWidth="4.5"
                />
                {stdItem.transformedHead ? (
                  <>
                    <text x="-185" y="10" textAnchor="middle" fontSize="36" fontWeight="800" fill="#64748B">
                      {stdItem.noun}+
                    </text>
                    <g transform="translate(-45, -14)">
                      <rect
                        x="-58"
                        y="-40"
                        width="116"
                        height="80"
                        rx="18"
                        fill="#ECFDF5"
                        stroke="#10B981"
                        strokeWidth="3.5"
                      />
                      <text x="0" y="21" textAnchor="middle" fontSize="50" fontWeight="900">
                        <tspan fill="#059669">{stdItem.transformedHead}</tspan>
                        {stdItem.transformedTail ? <tspan fill="#E11D48">{stdItem.transformedTail}</tspan> : null}
                      </text>
                    </g>
                  </>
                ) : (
                  <>
                    {stdItem.prefix && (
                      <text
                        x="-296"
                        y="7"
                        textAnchor="middle"
                        fontSize={stdItem.prefix.length >= 6 ? 21 : stdItem.prefix.length >= 4 ? 25 : 30}
                        fontWeight="800"
                        fill="#475569"
                      >
                        {stdItem.prefix}
                      </text>
                    )}
                    <text
                      x={stdItem.prefix ? -168 : -192}
                      y="10"
                      textAnchor="middle"
                      fontSize={
                        stdItem.prefix
                          ? stdItem.noun.length >= 3
                            ? 38
                            : 46
                          : stdItem.noun.length >= 4
                          ? 32
                          : stdItem.noun.length === 3
                          ? 42
                          : 54
                      }
                      fontWeight="900"
                      fill="#1E293B"
                    >
                      {wrongRuleCue?.highlightLastSyllable && stdItem.noun.length > 0 ? (
                        <>
                          <tspan>{stdItem.noun.slice(0, -1)}</tspan>
                          <tspan fill="#E11D48" textDecoration="underline">
                            {stdItem.noun.slice(-1)}
                          </tspan>
                        </>
                      ) : (
                        stdItem.noun
                      )}
                    </text>
                    <g transform="translate(-45, -14)">
                      <rect
                        x="-50"
                        y="-40"
                        width="100"
                        height="80"
                        rx="18"
                        fill={stdItem.isCorrect ? '#D1FAE5' : outcome ? '#FFE4E6' : '#ECFDF5'}
                        stroke={stdItem.isCorrect ? '#059669' : outcome ? '#FB7185' : '#34D399'}
                        strokeWidth="3.5"
                      />
                      <text
                        x="0"
                        y={outcome && String(outcome).length >= 3 ? 13 : 20}
                        textAnchor="middle"
                        fontSize={outcome ? (String(outcome).length >= 3 ? 30 : String(outcome).length === 2 ? 40 : 52) : 54}
                        fontWeight="900"
                        fill={stdItem.isCorrect ? '#047857' : outcome ? '#E11D48' : '#10B981'}
                      >
                        {outcome ? outcome : '?'}
                      </text>
                    </g>
                  </>
                )}
                <text
                  x="148"
                  y="10"
                  textAnchor="middle"
                  fontSize={
                    stdItem.predicate.length >= 9
                      ? 27
                      : stdItem.predicate.length >= 7
                      ? 31
                      : stdItem.predicate.length >= 5
                      ? 37
                      : 48
                  }
                  fontWeight="900"
                  fill={stdItem.isRedPredicate ? '#E11D48' : wrongRuleCue?.highlightPredicate ? '#BE123C' : '#1E293B'}
                  textDecoration={wrongRuleCue?.highlightPredicate ? 'underline' : undefined}
                >
                  {stdItem.predicate}
                </text>
              </g>
            )}

            {wrongRuleCue && (
              <g transform={`translate(520, ${boardY + 72})`}>
                <text
                  x="0"
                  y="6"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="900"
                  fill="#BE123C"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  style={{ paintOrder: 'stroke fill' }}
                >
                  ⚠️ {wrongRuleCue.badge}
                </text>
              </g>
            )}

            {isAnyCorrect && phase === 'impact' && impactAge < 1.2 && (
              <g transform={`translate(${activeTargetX}, ${targetY})`} opacity={Math.max(0, 1 - impactAge / 1.2)}>
                    <circle
                      cx="0"
                      cy="0"
                      r={24 + impactAge * 68}
                      fill="none"
                      stroke="#34D399"
                      strokeWidth="4"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r={14 + impactAge * 44}
                      fill="none"
                      stroke="#A7F3D0"
                      strokeWidth="3"
                    />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, idx) => {
                      const rad = (deg * Math.PI) / 180;
                      const dist = 28 + impactAge * 72;
                      const sx = Math.cos(rad) * dist;
                      const sy = Math.sin(rad) * dist;
                      return (
                        <g key={deg} transform={`translate(${sx}, ${sy}) scale(${idx % 2 === 0 ? 1.05 : 0.8})`}>
                          <path
                            d="M0 -9 L2.5 -2.5 L9 0 L2.5 2.5 L0 9 L-2.5 2.5 L-9 0 L-2.5 -2.5 Z"
                            fill={idx % 2 === 0 ? '#10B981' : '#6EE7B7'}
                            stroke="#FFFFFF"
                            strokeWidth="1"
                          />
                        </g>
                      );
                    })}
                </g>
            )}

            {/* 목표 명사 캐릭터 */}
            {mascotX < 1080 && mascotY > viewMinY - 120 && (
              <g transform={`translate(${mascotX}, ${mascotY}) rotate(${mascotRot})`}>
                <PastelMascotBadge isCorrect={isAnyCorrect}>
                  {activeUnit === 'unit1' ? (
                    <Unit1NounMascot nounId={currentU1Item.id} isCorrect={isU1Correct} />
                  ) : activeUnit === 'unit2' ? (
                    <Unit2NounMascot
                      nounId={currentU2Item.id}
                      isCorrect={isU2Correct}
                      isGoMode={isU2GoGag}
                      animTime={animTime}
                    />
                  ) : activeUnit === 'unit3' ? (
                    <Unit3NounMascot nounId={currentU3Item.id} isCorrect={isU3Correct} />
                  ) : activeUnit === 'unit4' ? (
                    <Unit4NounMascot nounId={currentU4Item.id} isCorrect={isU4Correct} />
                  ) : activeUnit === 'unit5' ? (
                    <Unit5NounMascot nounId={currentU5Item.id} isCorrect={isU5Correct} />
                  ) : activeUnit === 'unit11' ||
                    activeUnit === 'unit12' ||
                    activeUnit === 'unit13' ||
                    activeUnit === 'unit14' ||
                    activeUnit === 'unit15' ||
                    activeUnit === 'unit16' ? (
                    <Unit11To16NounMascot nounId={currentMultiItem.id} isCorrect={isMultiCorrect} />
                  ) : activeUnit === 'unit17' ||
                    activeUnit === 'unit18' ||
                    activeUnit === 'unit19' ||
                    activeUnit === 'unit20' ||
                    activeUnit === 'unit21' ? (
                    <Unit17To21NounMascot nounId={currentMultiItem.id} isCorrect={isMultiCorrect} />
                  ) : isSentenceUnit ? (
                    <SentenceNounMascot
                      nounId={currentMultiItem.id as SentenceNounId}
                      isCorrect={isMultiCorrect}
                    />
                  ) : (
                    <Unit6To10NounMascot nounId={currentMultiItem.id} isCorrect={isMultiCorrect} />
                  )}
                </PastelMascotBadge>
              </g>
            )}



            {phase === 'missed' && missKind === 'short' && missLandingPos && (
              <text x={missLandingPos.x} y="286" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0F766E" stroke="#FFFFFF" strokeWidth="5" style={{ paintOrder: 'stroke fill' }}>
                {gameUi.weakBanner}
              </text>
            )}
            {phase === 'missed' && missKind === 'over' && missLandingPos && (
              <text x={missLandingPos.x} y={viewMinY + 42} textAnchor="middle" fontSize="22" fontWeight="900" fill="#D97706" stroke="#FFFFFF" strokeWidth="5" style={{ paintOrder: 'stroke fill' }}>
                {gameUi.overBanner}
              </text>
            )}

            {/* 새총 직접 조준 영역만 touch-action: none 적용 (나머지 하늘·민트 배경은 상하 터치 스크롤 허용) */}
            <rect
              x="0"
              y="125"
              width="340"
              height="275"
              fill="transparent"
              style={{
                touchAction: 'none',
                cursor: phase === 'flying' || phase === 'cleared' ? 'default' : dragOffset ? 'grabbing' : 'grab',
              }}
            />

            {/* 새총 & 반짝이는 에메랄드·민트 조준 궤적 */}
            <g style={{ touchAction: 'none' }}>
              {aimDots.map((d, i) =>
                i % 3 === 0 ? (
                  <g key={i} transform={`translate(${d.x}, ${d.y}) scale(${Math.max(0.55, 1.05 - i * 0.04)})`} opacity={Math.max(0.28, 0.94 - i * 0.06)}>
                    <path
                      d="M0 -8 L2.2 -2.2 L8 0 L2.2 2.2 L0 8 L-2.2 2.2 L-8 0 L-2.2 -2.2 Z"
                      fill="#10B981"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                    />
                  </g>
                ) : (
                  <circle
                    key={i}
                    cx={d.x}
                    cy={d.y}
                    r={Math.max(3, 6.2 - i * 0.32)}
                    fill={i % 2 === 1 ? '#34D399' : '#A7F3D0'}
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                    opacity={Math.max(0.28, 0.92 - i * 0.06)}
                  />
                )
              )}

              {/* 새총 발판 그림자 */}
              <ellipse cx={SLING_X} cy="354" rx="26" ry="7" fill="#10B981" opacity="0.24" />

              {/* 뒤쪽 새총 가지 (따뜻한 라이트 우드 + 다크 네이비 외곽선) */}
              <path
                d={`M ${SLING_X} 352 L ${SLING_X} 290 Q ${SLING_X + 12} 276 ${SLING_X + 22} 260`}
                fill="none"
                stroke="#1E293B"
                strokeWidth="15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M ${SLING_X} 352 L ${SLING_X} 290 Q ${SLING_X + 12} 276 ${SLING_X + 22} 260`}
                fill="none"
                stroke="#E5B874"
                strokeWidth="9.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 뒤쪽 에메랄드 고무줄 */}
              <line
                x1={SLING_X + 22}
                y1="260"
                x2={effectivePull ? SLING_X + effectivePull.dx : SLING_X}
                y2={effectivePull ? SLING_Y + effectivePull.dy : SLING_Y}
                stroke="#059669"
                strokeWidth="5.5"
                strokeLinecap="round"
              />

              {/* 장전된 조사 구슬 */}
              {phase === 'ready' && (
                <g transform={`translate(${effectivePull ? SLING_X + effectivePull.dx : SLING_X}, ${effectivePull ? SLING_Y + effectivePull.dy : SLING_Y})`}>
                  <circle cx="0" cy="0" r={selectedParticle.length > 1 ? 30 : 26} fill={activeBtnMeta.bgHex} stroke="#1E293B" strokeWidth="3" />
                  <circle cx="-7" cy="-10" r={selectedParticle.length > 1 ? 6 : 5} fill="#FFFFFF" opacity="0.7" />
                  <text
                    x="0"
                    y={selectedParticle.length > 1 ? 6 : 10}
                    textAnchor="middle"
                    fontSize={selectedParticle.length >= 3 ? 16 : selectedParticle.length === 2 ? 20 : 28}
                    fontWeight="900"
                    fill={currentBallColor}
                  >
                    {selectedParticle}
                  </text>
                </g>
              )}

              {/* 앞쪽 새총 고무줄 */}
              <line
                x1={SLING_X - 18}
                y1="260"
                x2={effectivePull ? SLING_X + effectivePull.dx : SLING_X}
                y2={effectivePull ? SLING_Y + effectivePull.dy : SLING_Y}
                stroke="#34D399"
                strokeWidth="5.5"
                strokeLinecap="round"
              />

              {/* 앞쪽 새총 손잡이 & 가지 (따뜻한 라이트 우드 + 에메랄드 포인트 밴드) */}
              <path
                d={`M ${SLING_X} 352 L ${SLING_X} 290 Q ${SLING_X - 10} 276 ${SLING_X - 18} 260`}
                fill="none"
                stroke="#1E293B"
                strokeWidth="15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={`M ${SLING_X} 352 L ${SLING_X} 290 Q ${SLING_X - 10} 276 ${SLING_X - 18} 260`}
                fill="none"
                stroke="#F6D399"
                strokeWidth="9.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 에메랄드 포인트 그립 & 가지 밴드 */}
              <rect x={SLING_X - 7} y="310" width="14" height="32" rx="6" fill="#10B981" stroke="#1E293B" strokeWidth="2.5" />
              <line x1={SLING_X - 4} y1="319" x2={SLING_X + 4} y2="319" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
              <line x1={SLING_X - 4} y1="328" x2={SLING_X + 4} y2="328" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
              <circle cx={SLING_X - 18} cy="260" r="6" fill="#34D399" stroke="#1E293B" strokeWidth="2.5" />
              <circle cx={SLING_X + 22} cy="260" r="6" fill="#10B981" stroke="#1E293B" strokeWidth="2.5" />
            </g>

            {phase === 'flying' && (
              <g transform={`translate(${flightRef.current.x}, ${flightRef.current.y})`}>
                {/* 기본 반짝이는 에메랄드·민트 별빛 궤적 */}
                {[18, 36, 54, 72].map((dist, idx) => {
                  const tx = -flightUx * dist + Math.sin(animTime * 26 + idx * 1.5) * (idx + 1) * 1.9;
                  const ty = -flightUy * dist + Math.cos(animTime * 22 + idx * 1.7) * (idx + 1) * 1.9;
                  return idx % 2 === 0 ? (
                    <g key={dist} transform={`translate(${tx}, ${ty}) scale(${Math.max(0.55, 1.1 - idx * 0.14)})`} opacity={0.85 - idx * 0.16}>
                      <path
                        d="M0 -10 L2.6 -2.6 L10 0 L2.6 2.6 L0 10 L-2.6 2.6 L-10 0 L-2.6 -2.6 Z"
                        fill="#10B981"
                        stroke="#FFFFFF"
                        strokeWidth="1.2"
                      />
                    </g>
                  ) : (
                    <circle
                      key={dist}
                      cx={tx}
                      cy={ty}
                      r={Math.max(4, 11 - idx * 2)}
                      fill={comboStreak >= 2 ? '#34D399' : '#6EE7B7'}
                      opacity={0.78 - idx * 0.16}
                    />
                  );
                })}
                {comboStreak >= 2 && (
                  <circle
                    cx="0"
                    cy="0"
                    r={flightRef.current.particle.length > 1 ? 39 : 36}
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="4.5"
                    strokeDasharray="8 6"
                    opacity="0.82"
                  />
                )}
                <circle cx="0" cy="0" r={flightRef.current.particle.length > 1 ? 31 : 28} fill={flyingBtnMeta.bgHex} stroke="#1E293B" strokeWidth="3" />
                <text
                  x="0"
                  y={flightRef.current.particle.length > 1 ? 6 : 11}
                  textAnchor="middle"
                  fontSize={flightRef.current.particle.length >= 3 ? 16 : flightRef.current.particle.length === 2 ? 20 : 30}
                  fontWeight="900"
                  fill={flyingBallColor}
                >
                  {flightRef.current.particle}
                </text>
              </g>
            )}

            {shouldRicochet && bounceAge < 1 && (
              <g transform={`translate(${ricochetX}, ${ricochetY}) rotate(${bounceAge * 720})`}>
                <circle cx="0" cy="0" r={String(outcome).length > 1 ? 30 : 26} fill={ricochetBg} stroke="#1E293B" strokeWidth="3" />
                <text
                  x="0"
                  y={String(outcome).length > 1 ? 6 : 10}
                  textAnchor="middle"
                  fontSize={String(outcome).length >= 3 ? 16 : String(outcome).length === 2 ? 20 : 28}
                  fontWeight="900"
                  fill={ricochetColor}
                >
                  {outcome}
                </text>
              </g>
            )}

            <g transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot})`} style={{ touchAction: 'none' }}>
              <StickmanPlayer face={jollaFace} running={isAnySpaceGag && impactAge < 0.8} animTime={animTime} />
            </g>
          </svg>
        </div>

        {/* 동일 통합 박스 하단 조작부: 아이콘 간소화된 발사 모드 토글 + 분홍 게이지 바 + 후추통 선택지 */}
        <div className="shrink-0 relative z-20 bg-gradient-to-b from-[#F4FDF9] to-[#E6FAF0] border-t-2 border-emerald-200 px-2 sm:px-5 pt-1.5 sm:pt-2 pb-2 sm:pb-2.5 flex flex-col gap-1.5">
          {/* 간소화 모드 토글 + 파워 게이지 바 한 줄 배치 (플레이박스 확장 없음) */}
          <div
            className={`${
              activeButtons.length >= 5
                ? 'max-w-[840px]'
                : activeButtons.length === 4
                ? 'max-w-[820px]'
                : activeButtons.length === 2
                ? 'max-w-[540px]'
                : 'max-w-[760px]'
            } w-full mx-auto flex items-center gap-2`}
          >
            <div
              className="inline-flex items-center rounded-md border border-emerald-300 bg-white overflow-hidden shrink-0 shadow-2xs"
              role="group"
              aria-label="발사 방식 선택"
            >
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  setControlMode('arcade');
                }}
                className={`px-2 py-0.5 text-[11px] sm:text-xs font-black flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  controlMode === 'arcade'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-transparent text-slate-700 hover:bg-emerald-50'
                }`}
                title="꾹 누르기"
              >
                <Hand className="w-3.5 h-3.5 shrink-0" />
                <span>꾹</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playCutePop();
                  chargeRef.current = { active: null, startTime: 0, power: 0 };
                  setChargingBtn(null);
                  setChargePower(0);
                  setControlMode('easy');
                }}
                className={`px-2 py-0.5 text-[11px] sm:text-xs font-black border-l border-emerald-200 flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                  controlMode === 'easy'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-transparent text-slate-700 hover:bg-emerald-50'
                }`}
                title="원터치 발사"
              >
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>원터치</span>
              </button>
            </div>

            {controlMode === 'arcade' ? (
              <div className="relative flex-1 h-3.5 sm:h-4 rounded-full bg-white/95 border-2 border-emerald-300 overflow-hidden shadow-inner">
                <div
                  className="absolute top-0 bottom-0 bg-pink-300/85 border-x-2 border-pink-500"
                  style={{ left: `${SWEET_MIN * 100}%`, width: `${(SWEET_MAX - SWEET_MIN) * 100}%` }}
                />
                <div className="absolute top-0 bottom-0 w-0.5 bg-pink-600/60" style={{ left: '66.7%' }} />
                <div
                  className="h-full rounded-l-full"
                  style={{
                    width: `${chargePower * 100}%`,
                    backgroundColor: chargePower < SWEET_MIN ? '#34D399' : chargePower <= SWEET_MAX ? '#EC4899' : '#FB7185',
                  }}
                />
              </div>
            ) : (
              <span className="text-[11px] sm:text-xs font-bold text-emerald-800 truncate">
                조사를 한 번 누르면 바로 명중 구간으로 날아가요!
              </span>
            )}
          </div>

          {/* 후추통 몸통 스타일 파스텔 선택지 (1~2글자: 동그란 원, 3글자+: 타원, 흰 바탕에 작은 글씨) */}
          <div
            className={`flex items-center justify-center flex-wrap w-full mx-auto ${
              activeButtons.length === 5 ? 'gap-1.5 sm:gap-3.5 max-w-[840px]' : 'gap-2 sm:gap-5 max-w-[780px]'
            }`}
          >
            {activeButtons.map((btn) => {
              const isPressed = chargingBtn === btn.particle;
              const isOval = btn.label.length >= 3;
              const isFiveMode = activeButtons.length === 5;
              const shapeClass = isOval
                ? 'rounded-[1.4rem] min-w-[78px] sm:min-w-[116px] h-[44px] sm:h-[60px] px-2 sm:px-3.5'
                : isFiveMode
                ? 'rounded-full w-[42px] h-[42px] sm:w-[58px] sm:h-[58px] p-1'
                : 'rounded-full w-[46px] h-[46px] sm:w-[64px] sm:h-[64px] p-1 sm:p-1.5';

              return (
                <button
                  key={btn.particle}
                  type="button"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    startChargingButton(btn);
                  }}
                  onPointerUp={() => releaseChargingButton(btn.particle)}
                  onPointerCancel={() => releaseChargingButton(btn.particle)}
                  className={`relative ${shapeClass} flex items-center justify-center overflow-hidden transition-transform cursor-pointer touch-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
                  style={{
                    backgroundColor: btn.bgHex,
                    border: '2.5px solid #1E293B',
                    boxShadow: isPressed ? '0 1px 0 #1E293B' : '0 3px 0 #1E293B',
                    transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
                  }}
                >
                  {/* 후추통 왼쪽 광택 라인 */}
                  <span
                    className={`pointer-events-none absolute top-1.5 bottom-2 w-1 sm:w-1.5 rounded-full bg-white/80 ${
                      isOval ? 'left-2' : 'left-1.5 sm:left-2'
                    }`}
                  />

                  {/* 후추통 하단 미세 도트 4개 */}
                  <span className="pointer-events-none absolute bottom-1 inset-x-2 flex justify-center gap-0.5 sm:gap-1 opacity-35">
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-500" />
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-400" />
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-500" />
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-400" />
                  </span>

                  {/* 흰 바탕에 작은 글씨 라벨 */}
                  <span
                    className={`relative z-10 bg-white border border-slate-300/85 shadow-xs font-black whitespace-nowrap leading-none flex items-center justify-center ${
                      isOval
                        ? 'px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-xl text-[11px] sm:text-sm'
                        : isFiveMode
                        ? 'px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs'
                        : 'px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-sm'
                    }`}
                    style={{ color: btn.accentHex }}
                  >
                    {btn.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 단원 클리어 팝업: 뷰포트 중앙에 상하 스크롤 없이 크게 띄우기 */}
      {phase === 'cleared' && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-emerald-950/45 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border-4 border-emerald-300 bg-white px-6 py-7 sm:px-8 sm:py-8 shadow-2xl text-center space-y-5">
            {clearBadgeOutcome ? (
              <div className="w-18 h-18 mx-auto rounded-full bg-emerald-50 border-3 border-emerald-400 flex items-center justify-center shadow-xs p-2">
                <BulletBadgeGraphic tier={clearBadgeOutcome.tier} className="w-13 h-13" />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3].map((starIdx) => (
                  <svg
                    key={starIdx}
                    viewBox="0 0 24 24"
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${
                      starIdx <= earnedStars ? 'text-amber-400 drop-shadow-sm' : 'text-slate-200'
                    }`}
                    fill="currentColor"
                  >
                    <path d="M12 2.5l2.92 5.92 6.53.95-4.72 4.6 1.11 6.5L12 17.4l-5.84 3.07 1.11-6.5-4.72-4.6 6.53-.95L12 2.5z" />
                  </svg>
                ))}
              </div>
            )}

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 break-keep">{unitNumberLabel} 완료!</h3>
              <p className="text-sm sm:text-base font-semibold text-slate-500 mt-1 break-keep">
                {clearBadgeOutcome
                  ? `${
                      clearBadgeOutcome.tier === 'gold'
                        ? '👑 금색 총알'
                        : clearBadgeOutcome.tier === 'silver'
                        ? '🥈 은색 총알'
                        : '🌿 민트 총알'
                    } 뱃지 획득! (실수 ${totalMissesInUnit}회)`
                  : earnedStars === 3
                  ? '한 번에 모든 조사를 정확히 맞혔어요!'
                  : earnedStars === 2
                  ? '보스 문제까지 멋지게 해냈어요!'
                  : '끝까지 포기하지 않고 완주했어요!'}
              </p>
              {clearBadgeOutcome?.newlyUnlockedTrophyMilestone && (() => {
                const hallUi = (MENU_EXTRAS_UI[uiLang] || MENU_EXTRAS_UI.ko).hallOfFame;
                return (
                  <p className="text-xs font-black text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-md mt-2">
                    {hallUi.trophyUnlockedPrefix} ({clearBadgeOutcome.newlyUnlockedTrophyMilestone} {hallUi.badgeLabel})
                  </p>
                );
              })()}
            </div>

            <div className="grid grid-cols-3 gap-2 bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 sm:p-4">
              <div className="min-w-0 px-0.5">
                <div className="text-xs font-bold text-slate-500 break-keep">첫 시도 명중</div>
                <div className="text-lg sm:text-xl font-black text-emerald-800 tabular-nums mt-0.5">
                  {firstTryCount}/{totalQuestions}
                </div>
              </div>
              <div className="min-w-0 px-0.5 border-x border-emerald-200">
                <div className="text-xs font-bold text-slate-500 break-keep">실수</div>
                <div className="text-lg sm:text-xl font-black text-rose-600 tabular-nums mt-0.5">
                  {totalMissesInUnit}회
                </div>
              </div>
              <div className="min-w-0 px-0.5">
                <div className="text-xs font-bold text-slate-500 break-keep">최고 연속</div>
                <div className="text-lg sm:text-xl font-black text-amber-600 tabular-nums mt-0.5">
                  {bestComboInUnit}연속
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                type="button"
                onClick={handleReplayUnit}
                className="sm:w-auto sm:min-w-[124px] shrink-0 min-h-[46px] px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm sm:text-base font-black cursor-pointer whitespace-nowrap"
              >
                🔄 다시 하기
              </button>
              {nextUnitTarget && onSelectUnit ? (
                <button
                  type="button"
                  onClick={() => onSelectUnit(nextUnitTarget)}
                  className="flex-1 min-w-0 min-h-[46px] px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-black cursor-pointer shadow-sm leading-snug break-keep whitespace-normal text-center"
                >
                  {nextUnitBtnLabel}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => (onSelectUnit ? onSelectUnit('unit1') : handleReplayUnit())}
                  className="flex-1 min-w-0 min-h-[46px] px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm sm:text-base font-black cursor-pointer shadow-sm leading-snug break-keep whitespace-normal text-center"
                >
                  🏆 {gameUi.fromStart}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 🏆 SHARED BADGE COLLECTION & HALL OF FAME MODAL */}
      <GameBadgeAndHallOfFameModal
        isOpen={isBadgeModalOpen}
        onClose={() => setIsBadgeModalOpen(false)}
        initialGame="slingshot"
        uiLang={uiLang}
      />
    </div>
  );
};

export default ParticleArcadeQuiz;
