export type SupportedLanguage = 'en' | 'vi' | 'bn' | 'zh' | 'ru' | 'ja' | 'mn';

export interface LanguageMeta {
  code: SupportedLanguage;
  flag: string;
  labelKo: string;
  nativeName: string;
  fullName: string; // e.g. "🇺🇸 영어 (English)"
  shortName: string; // e.g. "🇺🇸 영어"
  singleChar: string; // e.g. "영", "베", "벵", "중", "러", "일", "몽"
  tagColor: { bg: string; text: string; border: string };
  fontClass?: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', flag: '🇺🇸', labelKo: '영어', nativeName: 'English', fullName: '영어 (English)', shortName: '영어', singleChar: '영', tagColor: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' } },
  { code: 'vi', flag: '🇻🇳', labelKo: '베트남어', nativeName: 'Tiếng Việt', fullName: '베트남어 (Tiếng Việt)', shortName: '베트남어', singleChar: '베', tagColor: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-200' } },
  { code: 'bn', flag: '🇧🇩', labelKo: '벵골어', nativeName: 'বাংলা', fullName: '벵골어 (বাংলা)', shortName: '벵골어', singleChar: '벵', tagColor: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' }, fontClass: "font-['Noto_Sans_Bengali',sans-serif]" },
  { code: 'zh', flag: '🇨🇳', labelKo: '중국어', nativeName: '中文', fullName: '중국어 (中文)', shortName: '중국어', singleChar: '중', tagColor: { bg: 'bg-rose-50', text: 'text-rose-800', border: 'border-rose-200' } },
  { code: 'ru', flag: '🇷🇺', labelKo: '러시아어', nativeName: 'Русский', fullName: '러시아어 (Русский)', shortName: '러시아어', singleChar: '러', tagColor: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' } },
  { code: 'ja', flag: '🇯🇵', labelKo: '일본어', nativeName: '日本語', fullName: '일본어 (日本語)', shortName: '일본어', singleChar: '일', tagColor: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' } },
  { code: 'mn', flag: '🇲🇳', labelKo: '몽골어', nativeName: 'Монгол', fullName: '몽골어 (Монгол)', shortName: '몽골어', singleChar: '몽', tagColor: { bg: 'bg-purple-50', text: 'text-purple-800', border: 'border-purple-200' } },
];

export const getLanguageMeta = (code: SupportedLanguage): LanguageMeta => {
  return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
};

export interface VocabularyItem {
  ch: number;
  theme: string;
  icon: string;
  imageUrl?: string; // High-definition custom vector/image illustration when emoji is ambiguous
  ko: string;
  romaja: string; // English romanization / phonetic guide (e.g. Hwa-jang-sil)
  en: string;
  vi: string;
  bn: string;
  zh: string;
  ru: string;
  ja: string;
  mn: string;
  pronunciation?: string; // Korean pronunciation in easy phonetic hint
  samplePhrase?: string; // Example sentence in elementary school context
}

export type EmergencyType = 'toilet' | 'water' | 'sick' | 'help';

export interface EmergencyCardData {
  id: EmergencyType;
  titleKo: string;
  icon: string;
  mainSentenceKo: string;
  translations: Record<SupportedLanguage, string>;
  subOptions?: {
    ko: string;
    icon: string;
    translations: Record<SupportedLanguage, string>;
  }[];
  teacherResponses: {
    ko: string;
    translations: Record<SupportedLanguage, string>;
  }[];
}

export type LearningTrack = 'hangeul' | 'classroom' | 'verb' | 'particle';
export type LearningMethod = 'flashcard' | 'worksheet' | 'game';
export type ActiveTab = 'hangeul' | 'classroom' | 'study' | 'games' | LearningTrack;

export const CIRCLED_NUMBERS: Record<number, string> = {
  1: '①',
  2: '②',
  3: '③',
  4: '④',
  5: '⑤',
  6: '⑥',
  7: '⑦',
  8: '⑧',
  9: '⑨',
  10: '⑩',
  11: '⑪',
  12: '⑫',
  13: '⑬',
  14: '⑭',
  15: '⑮',
  16: '⑯',
  17: '⑰',
  18: '⑱',
  19: '⑲',
  20: '⑳',
  21: '㉑',
  22: '㉒',
  23: '㉓',
  24: '㉔',
  25: '㉕',
  26: '㉖',
  27: '㉗',
  28: '㉘',
  29: '㉙',
  30: '㉚',
};

export const getCircledNumber = (n: number): string => CIRCLED_NUMBERS[n] || `(${n})`;

export interface NavMenuSubLabels {
  hangeul: string;
  classroom: string;
  study: string;
  games: string;
  print?: string;
}

export const NAV_SUB_LABELS: Record<SupportedLanguage, NavMenuSubLabels> = {
  en: {
    hangeul: 'Hangeul',
    classroom: 'Classroom',
    study: 'Flashcards',
    games: 'Games',
    print: 'Print'
  },
  vi: {
    hangeul: 'Bảng chữ cái',
    classroom: 'Tiếng Hàn lớp',
    study: 'Thẻ từ vựng',
    games: 'Trò chơi',
    print: 'In ấn'
  },
  bn: {
    hangeul: 'বর্ণমালা',
    classroom: 'শ্রেণিকক্ষ',
    study: 'শব্দকার্ড',
    games: 'খেলা',
    print: 'প্রিন্ট'
  },
  zh: {
    hangeul: '韩文字母',
    classroom: '课堂韩语',
    study: '生词卡片',
    games: '趣味游戏',
    print: '打印'
  },
  ru: {
    hangeul: 'Хангыль',
    classroom: 'В классе',
    study: 'Карточки',
    games: 'Игры',
    print: 'Печать'
  },
  ja: {
    hangeul: 'ハングル',
    classroom: '教室の韓国語',
    study: '単語カード',
    games: 'ゲーム',
    print: '印刷'
  },
  mn: {
    hangeul: 'Хангыль',
    classroom: 'Ангийн хэл',
    study: 'Үгийн карт',
    games: 'Тоглоом',
    print: 'Хэвлэх'
  }
};

export interface TrackNavSubLabels {
  hangeul: string;
  classroom: string;
  verb: string;
  particle: string;
}

export const TRACK_NAV_LABELS: Record<SupportedLanguage, TrackNavSubLabels> = {
  en: { hangeul: 'Letter', classroom: 'Vocab', verb: 'Verb', particle: 'Particle' },
  vi: { hangeul: 'Chữ cái', classroom: 'Từ vựng', verb: 'Động từ', particle: 'Trợ từ' },
  bn: { hangeul: 'বর্ণ', classroom: 'শব্দ', verb: 'ক্রিয়া', particle: 'বিভক্তি' },
  zh: { hangeul: '字母', classroom: '词汇', verb: '谓词', particle: '助词' },
  ru: { hangeul: 'Буквы', classroom: 'Слова', verb: 'Глагол', particle: 'Частица' },
  ja: { hangeul: '文字', classroom: '語彙', verb: '用言', particle: '助詞' },
  mn: { hangeul: 'Үсэг', classroom: 'Үгс', verb: 'Үйл үг', particle: 'Нөхцөл' },
};

export interface MethodNavSubLabels {
  flashcard: string;
  worksheet: string;
  game: string;
}

export const METHOD_NAV_LABELS: Record<SupportedLanguage, MethodNavSubLabels> = {
  en: { flashcard: 'Flashcard', worksheet: 'Worksheet', game: 'Game' },
  vi: { flashcard: 'Thẻ học', worksheet: 'Phiếu tập', game: 'Trò chơi' },
  bn: { flashcard: 'ফ্ল্যাশকার্ড', worksheet: 'ওয়ার্কশিট', game: 'খেলা' },
  zh: { flashcard: '闪卡', worksheet: '练习册', game: '游戏' },
  ru: { flashcard: 'Карточки', worksheet: 'Листы', game: 'Игра' },
  ja: { flashcard: 'カード', worksheet: 'プリント', game: 'ゲーム' },
  mn: { flashcard: 'Карт', worksheet: 'Дасгал', game: 'Тоглоом' },
};

export interface SubMenuLabels {
  // 1~5: 한글 (Hangeul)
  jamo: string;
  basic: string;
  batchim: string;
  words: string;
  particle: string;
  // 5~8: 교실한국어 (Classroom)
  cards: string;
  writing: string;
  quiz: string;
  wordbook: string;
  // 9~11: 공부하기 (Study / Flashcards)
  hangeulIntro: string;
  classroomVocab: string;
  verbConjugation: string;
  // 12~15: 게임 (Games)
  hangeulGame: string;
  kartGame: string;
  particleGame: string;
  balloonGame: string;
  memoryGame: string;
}

export const SUB_MENU_LABELS: Record<SupportedLanguage, SubMenuLabels> = {
  en: {
    jamo: 'Letters',
    basic: 'Basic',
    batchim: 'Final',
    words: 'Verbs',
    particle: 'Particles',
    cards: 'Cards',
    writing: 'Tracing',
    quiz: 'Dictation',
    wordbook: 'Wordbook',
    hangeulIntro: 'Basics',
    classroomVocab: 'Vocab',
    verbConjugation: 'Verbs',
    hangeulGame: 'Letters',
    kartGame: 'Mandu',
    particleGame: 'Sitcom',
    balloonGame: 'Balloon',
    memoryGame: 'Cards'
  },
  vi: {
    jamo: 'Phụ âm',
    basic: 'Cơ bản',
    batchim: 'Phụ âm cuối',
    words: 'Động từ',
    particle: 'Trợ từ',
    cards: 'Thẻ hình',
    writing: 'Tập viết',
    quiz: 'Chính tả',
    wordbook: 'Sổ từ',
    hangeulIntro: 'Cơ bản',
    classroomVocab: 'Từ vựng',
    verbConjugation: 'Động từ',
    hangeulGame: 'Chữ cái',
    kartGame: 'Bánh xếp',
    particleGame: 'Kịch trợ từ',
    balloonGame: 'Bóng bay',
    memoryGame: 'Lật thẻ'
  },
  bn: {
    jamo: 'বর্ণমালা',
    basic: 'মৌলিক',
    batchim: 'অন্ত্যবর্ণ',
    words: 'ক্রিয়াপদ',
    particle: 'বিভক্তি',
    cards: 'ছবি কার্ড',
    writing: 'লেখা',
    quiz: 'শ্রুতি',
    wordbook: 'শব্দকোষ',
    hangeulIntro: 'প্রাথমিক',
    classroomVocab: 'শব্দভাণ্ডার',
    verbConjugation: 'ক্রিয়াপদ',
    hangeulGame: 'বর্ণ খেলা',
    kartGame: 'মান্ডু',
    particleGame: 'সিটকম',
    balloonGame: 'বেলুন',
    memoryGame: 'স্মৃতি'
  },
  zh: {
    jamo: '字母',
    basic: '基本字',
    batchim: '收音',
    words: '动词活用',
    particle: '助词',
    cards: '图卡',
    writing: '描红',
    quiz: '听写',
    wordbook: '生词本',
    hangeulIntro: '基础',
    classroomVocab: '词汇',
    verbConjugation: '动词活用',
    hangeulGame: '字母',
    kartGame: '做饺子',
    particleGame: '助词剧场',
    balloonGame: '气球',
    memoryGame: '配对'
  },
  ru: {
    jamo: 'Буквы',
    basic: 'Основа',
    batchim: 'Патчим',
    words: 'Глаголы',
    particle: 'Частицы',
    cards: 'Карточки',
    writing: 'Прописи',
    quiz: 'Диктант',
    wordbook: 'Словарь',
    hangeulIntro: 'Азы',
    classroomVocab: 'Слова',
    verbConjugation: 'Глаголы',
    hangeulGame: 'Буквы',
    kartGame: 'Манду',
    particleGame: 'Ситком',
    balloonGame: 'Шарики',
    memoryGame: 'Память'
  },
  ja: {
    jamo: '母音子音',
    basic: '基本文字',
    batchim: 'パッチム',
    words: '動詞活用',
    particle: '助詞',
    cards: '絵カード',
    writing: 'なぞり書き',
    quiz: '書き取り',
    wordbook: '単語帳',
    hangeulIntro: 'ハングル基礎',
    classroomVocab: '教室語彙',
    verbConjugation: '動詞活用',
    hangeulGame: '文字',
    kartGame: 'マンドゥ',
    particleGame: 'コント',
    balloonGame: '風船',
    memoryGame: '神経衰弱'
  },
  mn: {
    jamo: 'Үсэг',
    basic: 'Үндсэн',
    batchim: 'Дэвсгэр',
    words: 'Үйл үг',
    particle: 'Нөхцөл',
    cards: 'Зурагт карт',
    writing: 'Бичих',
    quiz: 'Цээж бичиг',
    wordbook: 'Үгийн сан',
    hangeulIntro: 'Суурь',
    classroomVocab: 'Үгс',
    verbConjugation: 'Үйл үг',
    hangeulGame: 'Үсэг',
    kartGame: 'Банш',
    particleGame: 'Ситком',
    balloonGame: 'Бөмбөлөг',
    memoryGame: 'Ой тогтоолт'
  }
};

