export interface HangeulGroupMetaItem {
  id: string;
  titleKo: string;
  badge: string;
  cardCount: number;
  previewChars: string[];
  previewSampleWord: string;
}

export const DEFAULT_HANGEUL_GROUP_ID = 'basic_consonants';

export const HANGEUL_GROUP_META: HangeulGroupMetaItem[] = [
  { id: 'basic_consonants', titleKo: '① 기본 자음 14자 (ㄱ~ㅎ)', badge: '자음', cardCount: 14, previewChars: ['ㄱ', 'ㄴ', 'ㄷ'], previewSampleWord: '가방' },
  { id: 'double_consonants', titleKo: '② 쌍자음 5자 (ㄲ~ㅉ)', badge: '쌍자음', cardCount: 5, previewChars: ['ㄲ', 'ㄸ', 'ㅃ'], previewSampleWord: '꼬리' },
  { id: 'basic_vowels', titleKo: '③ 기본 모음 10자 (ㅏ~ㅣ)', badge: '모음', cardCount: 10, previewChars: ['ㅏ', 'ㅑ', 'ㅓ'], previewSampleWord: '아이' },
  { id: 'compound_vowels', titleKo: '④ 복합 모음 11자 (ㅐ~ㅢ)', badge: '복합모음', cardCount: 11, previewChars: ['ㅐ', 'ㅒ', 'ㅔ'], previewSampleWord: '개미' },
  { id: 'basic_syllables_p1', titleKo: '⑤ 기본글자 만들기 (ㅏㅓㅗㅜㅡㅣ)', badge: '기본글자', cardCount: 24, previewChars: ['가', '사', '자'], previewSampleWord: '가방' },
  { id: 'basic_syllables_p2', titleKo: '⑥ 기본글자 만들기 (ㅑㅕㅛㅠ)', badge: '기본글자', cardCount: 16, previewChars: ['야', '캬', '챠'], previewSampleWord: '야구' },
  { id: 'basic_syllables_p3', titleKo: '⑦ 기본글자 만들기 (ㅐㅔㅒㅖ)', badge: '기본글자', cardCount: 16, previewChars: ['배', '째', '빼'], previewSampleWord: '배' },
  { id: 'basic_syllables_p4', titleKo: '⑧ 기본글자 만들기 (ㅘㅝㅚㅟ)', badge: '기본글자', cardCount: 16, previewChars: ['과', '놔', '화'], previewSampleWord: '과자' },
  { id: 'basic_syllables_p5', titleKo: '⑨ 기본글자 만들기 (ㅙㅞㅢ)', badge: '기본글자', cardCount: 12, previewChars: ['돼', '왜', '홰'], previewSampleWord: '돼지' },
  { id: 'batchim_p1', titleKo: '⑩ 받침글자 만들기 (ㅁㅂㅇㄱㄴㄹㄷ)', badge: '받침', cardCount: 28, previewChars: ['곰', '남', '밤'], previewSampleWord: '곰' },
  { id: 'batchim_p2', titleKo: '⑪ 받침글자 만들기 (받침 가족)', badge: '받침', cardCount: 16, previewChars: ['앞', '옆', '숲'], previewSampleWord: '앞' },
  { id: 'batchim_p3', titleKo: '⑫ 받침글자 만들기 (겹받침)', badge: '겹받침', cardCount: 16, previewChars: ['몫', '앉', '덟'], previewSampleWord: '몫' },
];
