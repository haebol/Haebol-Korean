import React from 'react';

export type VowelCombinationType = 'horizontal' | 'vertical' | 'compound';

export interface BasicLetterCardData {
  consonant: string;
  consonantName: string;
  vowel: string;
  syllable: string;
}

export interface BasicLetterWordCardData {
  word: string;
  syllables: string[];
  syllableCount: 1 | 2 | 3;
  englishMeaning: string;
  description: string;
}

export interface BasicLetterPageData {
  pageNumber: number; // 1 to 21
  circledNumber: string; // ① to ㉑
  vowel: string;
  combinationType: VowelCombinationType;
  vowelComponents?: [string, string]; // [underPart, rightPart] for compound vowels
  cards: [BasicLetterCardData, BasicLetterCardData, BasicLetterCardData];
  wordCard: BasicLetterWordCardData;
}

// 21 Pages Complete Curriculum Dataset
export const BASIC_LETTERS_DATA: BasicLetterPageData[] = [
  // [1쪽] ㅏ : ㄱ, ㅅ, ㅈ (가, 사, 자) ➔ 단어: 사자 (좌우조합)
  {
    pageNumber: 1,
    circledNumber: '①',
    vowel: 'ㅏ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㄱ', consonantName: '기역', vowel: 'ㅏ', syllable: '가' },
      { consonant: 'ㅅ', consonantName: '시옷', vowel: 'ㅏ', syllable: '사' },
      { consonant: 'ㅈ', consonantName: '지읒', vowel: 'ㅏ', syllable: '자' },
    ],
    wordCard: {
      word: '사자',
      syllables: ['사', '자'],
      syllableCount: 2,
      englishMeaning: 'Lion',
      description: '멋진 갈기를 가진 아기 사자'
    }
  },

  // [2쪽] ㅓ : ㅂ, ㅌ, ㅁ (버, 터, 머) ➔ 단어: 버터 (좌우조합)
  {
    pageNumber: 2,
    circledNumber: '②',
    vowel: 'ㅓ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㅂ', consonantName: '비읍', vowel: 'ㅓ', syllable: '버' },
      { consonant: 'ㅌ', consonantName: '티읕', vowel: 'ㅓ', syllable: '터' },
      { consonant: 'ㅁ', consonantName: '미음', vowel: 'ㅓ', syllable: '머' },
    ],
    wordCard: {
      word: '버터',
      syllables: ['버', '터'],
      syllableCount: 2,
      englishMeaning: 'Butter',
      description: '빵에 바르는 고소하고 노란 버터'
    }
  },

  // [3쪽] ㅗ : ㅍ, ㄷ, ㅌ (포, 도, 토) ➔ 단어: 포도 (상하조합)
  {
    pageNumber: 3,
    circledNumber: '③',
    vowel: 'ㅗ',
    combinationType: 'vertical',
    cards: [
      { consonant: 'ㅍ', consonantName: '피읖', vowel: 'ㅗ', syllable: '포' },
      { consonant: 'ㄷ', consonantName: '디귿', vowel: 'ㅗ', syllable: '도' },
      { consonant: 'ㅌ', consonantName: '티읕', vowel: 'ㅗ', syllable: '토' },
    ],
    wordCard: {
      word: '포도',
      syllables: ['포', '도'],
      syllableCount: 2,
      englishMeaning: 'Grapes',
      description: '달콤하고 알알이 영근 보라색 포도'
    }
  },

  // [4쪽] ㅜ : ㄱ, ㄷ, ㅇ (구, 두, 우) ➔ 단어: 구두 (상하조합)
  {
    pageNumber: 4,
    circledNumber: '④',
    vowel: 'ㅜ',
    combinationType: 'vertical',
    cards: [
      { consonant: 'ㄱ', consonantName: '기역', vowel: 'ㅜ', syllable: '구' },
      { consonant: 'ㄷ', consonantName: '디귿', vowel: 'ㅜ', syllable: '두' },
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅜ', syllable: '우' },
    ],
    wordCard: {
      word: '구두',
      syllables: ['구', '두'],
      syllableCount: 2,
      englishMeaning: 'Shoes',
      description: '또각또각 소리가 나는 예쁜 빨간 구두'
    }
  },

  // [5쪽] ㅡ : ㅅ, ㅋ, ㅌ (스, 크, 트) ➔ 단어: 버스 (상하조합)
  {
    pageNumber: 5,
    circledNumber: '⑤',
    vowel: 'ㅡ',
    combinationType: 'vertical',
    cards: [
      { consonant: 'ㅅ', consonantName: '시옷', vowel: 'ㅡ', syllable: '스' },
      { consonant: 'ㅋ', consonantName: '키읔', vowel: 'ㅡ', syllable: '크' },
      { consonant: 'ㅌ', consonantName: '티읕', vowel: 'ㅡ', syllable: '트' },
    ],
    wordCard: {
      word: '버스',
      syllables: ['버', '스'],
      syllableCount: 2,
      englishMeaning: 'Bus',
      description: '부릉부릉 학교에 가는 노란 버스'
    }
  },

  // [6쪽] ㅣ : ㅂ, ㅅ, ㅈ (비, 시, 지) ➔ 단어: 가지 (좌우조합)
  {
    pageNumber: 6,
    circledNumber: '⑥',
    vowel: 'ㅣ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㅂ', consonantName: '비읍', vowel: 'ㅣ', syllable: '비' },
      { consonant: 'ㅅ', consonantName: '시옷', vowel: 'ㅣ', syllable: '시' },
      { consonant: 'ㅈ', consonantName: '지읒', vowel: 'ㅣ', syllable: '지' },
    ],
    wordCard: {
      word: '가지',
      syllables: ['가', '지'],
      syllableCount: 2,
      englishMeaning: 'Eggplant',
      description: '매끄럽고 보랏빛이 도는 싱싱한 가지'
    }
  },

  // [7쪽] ㅑ : ㅇ, ㅋ, ㅊ (야, 캬, 챠) ➔ 단어: 야자 (좌우조합)
  {
    pageNumber: 7,
    circledNumber: '⑦',
    vowel: 'ㅑ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅑ', syllable: '야' },
      { consonant: 'ㅋ', consonantName: '키읔', vowel: 'ㅑ', syllable: '캬' },
      { consonant: 'ㅊ', consonantName: '치읓', vowel: 'ㅑ', syllable: '챠' },
    ],
    wordCard: {
      word: '야자',
      syllables: ['야', '자'],
      syllableCount: 2,
      englishMeaning: 'Palm Tree',
      description: '시원한 바람이 부는 바닷가 야자나무'
    }
  },

  // [8쪽] ㅕ : ㅇ, ㄴ, ㄹ (여, 녀, 려) ➔ 단어: 여자 (좌우조합)
  {
    pageNumber: 8,
    circledNumber: '⑧',
    vowel: 'ㅕ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅕ', syllable: '여' },
      { consonant: 'ㄴ', consonantName: '니은', vowel: 'ㅕ', syllable: '녀' },
      { consonant: 'ㄹ', consonantName: '리을', vowel: 'ㅕ', syllable: '려' },
    ],
    wordCard: {
      word: '여자',
      syllables: ['여', '자'],
      syllableCount: 2,
      englishMeaning: 'Girl',
      description: '밝게 웃는 예쁜 여자아이'
    }
  },

  // [9쪽] ㅛ : ㅍ, ㄱ, ㄹ (표, 교, 료) ➔ 단어: 표 (1칸 분할, 상하조합)
  {
    pageNumber: 9,
    circledNumber: '⑨',
    vowel: 'ㅛ',
    combinationType: 'vertical',
    cards: [
      { consonant: 'ㅍ', consonantName: '피읖', vowel: 'ㅛ', syllable: '표' },
      { consonant: 'ㄱ', consonantName: '기역', vowel: 'ㅛ', syllable: '교' },
      { consonant: 'ㄹ', consonantName: '리을', vowel: 'ㅛ', syllable: '료' },
    ],
    wordCard: {
      word: '표',
      syllables: ['표'],
      syllableCount: 1,
      englishMeaning: 'Ticket',
      description: '영화나 기차를 탈 때 쓰는 입장권 표'
    }
  },

  // [10쪽] ㅠ : ㅇ, ㅎ, ㄹ (유, 휴, 류) ➔ 단어: 우유 (상하조합)
  {
    pageNumber: 10,
    circledNumber: '⑩',
    vowel: 'ㅠ',
    combinationType: 'vertical',
    cards: [
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅠ', syllable: '유' },
      { consonant: 'ㅎ', consonantName: '히읗', vowel: 'ㅠ', syllable: '휴' },
      { consonant: 'ㄹ', consonantName: '리을', vowel: 'ㅠ', syllable: '류' },
    ],
    wordCard: {
      word: '우유',
      syllables: ['우', '유'],
      syllableCount: 2,
      englishMeaning: 'Milk',
      description: '키가 쑥쑥 자라는 고소한 우유'
    }
  },

  // [11쪽] ㅐ : ㅂ, ㅉ, ㅃ (배, 째, 빼) ➔ 단어: 배 (1칸 분할, 좌우조합)
  {
    pageNumber: 11,
    circledNumber: '⑪',
    vowel: 'ㅐ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㅂ', consonantName: '비읍', vowel: 'ㅐ', syllable: '배' },
      { consonant: 'ㅉ', consonantName: '쌍지읒', vowel: 'ㅐ', syllable: '째' },
      { consonant: 'ㅃ', consonantName: '쌍비읍', vowel: 'ㅐ', syllable: '빼' },
    ],
    wordCard: {
      word: '배',
      syllables: ['배'],
      syllableCount: 1,
      englishMeaning: 'Pear',
      description: '아삭아삭 즙이 많은 꿀맛 과일 배'
    }
  },

  // [12쪽] ㅔ : ㅈ, ㅊ, ㄴ (제, 체, 네) ➔ 단어: 제비 (좌우조합)
  {
    pageNumber: 12,
    circledNumber: '⑫',
    vowel: 'ㅔ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㅈ', consonantName: '지읒', vowel: 'ㅔ', syllable: '제' },
      { consonant: 'ㅊ', consonantName: '치읓', vowel: 'ㅔ', syllable: '체' },
      { consonant: 'ㄴ', consonantName: '니은', vowel: 'ㅔ', syllable: '네' },
    ],
    wordCard: {
      word: '제비',
      syllables: ['제', '비'],
      syllableCount: 2,
      englishMeaning: 'Swallow',
      description: '봄을 알리는 날렵한 제비 새'
    }
  },

  // [13쪽] ㅒ : ㅇ, ㄱ, ㅈ (얘, 걔, 쟤) ➔ 단어: 얘 (1칸 분할, 좌우조합)
  {
    pageNumber: 13,
    circledNumber: '⑬',
    vowel: 'ㅒ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅒ', syllable: '얘' },
      { consonant: 'ㄱ', consonantName: '기역', vowel: 'ㅒ', syllable: '걔' },
      { consonant: 'ㅈ', consonantName: '지읒', vowel: 'ㅒ', syllable: '쟤' },
    ],
    wordCard: {
      word: '얘',
      syllables: ['얘'],
      syllableCount: 1,
      englishMeaning: 'Child calling (Hey / This kid)',
      description: '"얘들아!" 하고 손들며 인사하는 아이'
    }
  },

  // [14쪽] ㅖ : ㄹ, ㄱ, ㅇ (례, 계, 예) ➔ 단어: 시계 (좌우조합)
  {
    pageNumber: 14,
    circledNumber: '⑭',
    vowel: 'ㅖ',
    combinationType: 'horizontal',
    cards: [
      { consonant: 'ㄹ', consonantName: '리을', vowel: 'ㅖ', syllable: '례' },
      { consonant: 'ㄱ', consonantName: '기역', vowel: 'ㅖ', syllable: '계' },
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅖ', syllable: '예' },
    ],
    wordCard: {
      word: '시계',
      syllables: ['시', '계'],
      syllableCount: 2,
      englishMeaning: 'Clock',
      description: '째깍째깍 시간을 알려주는 동그란 시계'
    }
  },

  // [15쪽] ㅘ : ㄱ, ㄴ, ㅎ (과, 놔, 화) ➔ 단어: 사과 (복합배치: ㅗ + ㅏ)
  {
    pageNumber: 15,
    circledNumber: '⑮',
    vowel: 'ㅘ',
    combinationType: 'compound',
    vowelComponents: ['ㅗ', 'ㅏ'],
    cards: [
      { consonant: 'ㄱ', consonantName: '기역', vowel: 'ㅘ', syllable: '과' },
      { consonant: 'ㄴ', consonantName: '니은', vowel: 'ㅘ', syllable: '놔' },
      { consonant: 'ㅎ', consonantName: '히읗', vowel: 'ㅘ', syllable: '화' },
    ],
    wordCard: {
      word: '사과',
      syllables: ['사', '과'],
      syllableCount: 2,
      englishMeaning: 'Apple',
      description: '새빨갛고 탐스러운 달콤한 사과'
    }
  },

  // [16쪽] ㅝ : ㄲ, ㅈ, ㅁ (꿔, 줘, 뭐) ➔ 단어: 뭐 (1칸 분할, 복합배치: ㅜ + ㅓ)
  {
    pageNumber: 16,
    circledNumber: '⑯',
    vowel: 'ㅝ',
    combinationType: 'compound',
    vowelComponents: ['ㅜ', 'ㅓ'],
    cards: [
      { consonant: 'ㄲ', consonantName: '쌍기역', vowel: 'ㅝ', syllable: '꿔' },
      { consonant: 'ㅈ', consonantName: '지읒', vowel: 'ㅝ', syllable: '줘' },
      { consonant: 'ㅁ', consonantName: '미음', vowel: 'ㅝ', syllable: '뭐' },
    ],
    wordCard: {
      word: '뭐',
      syllables: ['뭐'],
      syllableCount: 1,
      englishMeaning: 'What? (Curious)',
      description: '"뭐지?" 하고 호기심 가득한 표정'
    }
  },

  // [17쪽] ㅚ : ㅎ, ㅌ, ㅆ (회, 퇴, 쐬) ➔ 단어: 회사 (복합배치: ㅗ + ㅣ)
  {
    pageNumber: 17,
    circledNumber: '⑰',
    vowel: 'ㅚ',
    combinationType: 'compound',
    vowelComponents: ['ㅗ', 'ㅣ'],
    cards: [
      { consonant: 'ㅎ', consonantName: '히읗', vowel: 'ㅚ', syllable: '회' },
      { consonant: 'ㅌ', consonantName: '티읕', vowel: 'ㅚ', syllable: '퇴' },
      { consonant: 'ㅆ', consonantName: '쌍시옷', vowel: 'ㅚ', syllable: '쐬' },
    ],
    wordCard: {
      word: '회사',
      syllables: ['회', '사'],
      syllableCount: 2,
      englishMeaning: 'Company / Office',
      description: '열심히 일하는 높은 회사 빌딩'
    }
  },

  // [18쪽] ㅟ : ㅇ, ㄱ, ㄸ (위, 귀, 뛰) ➔ 단어: 가위 (복합배치: ㅜ + ㅣ)
  {
    pageNumber: 18,
    circledNumber: '⑱',
    vowel: 'ㅟ',
    combinationType: 'compound',
    vowelComponents: ['ㅜ', 'ㅣ'],
    cards: [
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅟ', syllable: '위' },
      { consonant: 'ㄱ', consonantName: '기역', vowel: 'ㅟ', syllable: '귀' },
      { consonant: 'ㄸ', consonantName: '쌍디귿', vowel: 'ㅟ', syllable: '뛰' },
    ],
    wordCard: {
      word: '가위',
      syllables: ['가', '위'],
      syllableCount: 2,
      englishMeaning: 'Scissors',
      description: '종이를 싹둑싹둑 오리는 문구용 가위'
    }
  },

  // [19쪽] ㅙ : ㄷ, ㅇ, ㅎ (돼, 왜, 홰) ➔ 단어: 돼지 (복합배치: ㅗ + ㅐ)
  {
    pageNumber: 19,
    circledNumber: '⑲',
    vowel: 'ㅙ',
    combinationType: 'compound',
    vowelComponents: ['ㅗ', 'ㅐ'],
    cards: [
      { consonant: 'ㄷ', consonantName: '디귿', vowel: 'ㅙ', syllable: '돼' },
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅙ', syllable: '왜' },
      { consonant: 'ㅎ', consonantName: '히읗', vowel: 'ㅙ', syllable: '홰' },
    ],
    wordCard: {
      word: '돼지',
      syllables: ['돼', '지'],
      syllableCount: 2,
      englishMeaning: 'Pig',
      description: '동글동글 코가 귀여운 분홍 돼지'
    }
  },

  // [20쪽] ㅞ : ㅇ, ㄴ, ㅊ (웨, 눼, 췌) ➔ 단어: 스웨터 (3칸 분할, 복합배치: ㅜ + ㅔ)
  {
    pageNumber: 20,
    circledNumber: '⑳',
    vowel: 'ㅞ',
    combinationType: 'compound',
    vowelComponents: ['ㅜ', 'ㅔ'],
    cards: [
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅞ', syllable: '웨' },
      { consonant: 'ㄴ', consonantName: '니은', vowel: 'ㅞ', syllable: '눼' },
      { consonant: 'ㅊ', consonantName: '치읓', vowel: 'ㅞ', syllable: '췌' },
    ],
    wordCard: {
      word: '스웨터',
      syllables: ['스', '웨', '터'],
      syllableCount: 3,
      englishMeaning: 'Sweater',
      description: '겨울을 따뜻하게 해주는 포근한 털스웨터'
    }
  },

  // [21쪽] ㅢ : ㅇ, ㅎ, ㄸ (의, 희, 띄) ➔ 단어: 의사 (복합배치: ㅡ + ㅣ)
  {
    pageNumber: 21,
    circledNumber: '㉑',
    vowel: 'ㅢ',
    combinationType: 'compound',
    vowelComponents: ['ㅡ', 'ㅣ'],
    cards: [
      { consonant: 'ㅇ', consonantName: '이응', vowel: 'ㅢ', syllable: '의' },
      { consonant: 'ㅎ', consonantName: '히읗', vowel: 'ㅢ', syllable: '희' },
      { consonant: 'ㄸ', consonantName: '쌍디귿', vowel: 'ㅢ', syllable: '띄' },
    ],
    wordCard: {
      word: '의사',
      syllables: ['의', '사'],
      syllableCount: 2,
      englishMeaning: 'Doctor',
      description: '아픈 곳을 치료해 주는 친절한 의사 선생님'
    }
  },
];

export const getBasicLetterPage = (index: number): BasicLetterPageData => {
  return BASIC_LETTERS_DATA[index] || BASIC_LETTERS_DATA[0];
};
