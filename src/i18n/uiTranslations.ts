import { SupportedLanguage, SUPPORTED_LANGUAGES } from '../types';

export type UiLanguage = 'ko' | SupportedLanguage;

export interface UiLanguageMeta {
  code: UiLanguage;
  nativeName: string;
  koreanName: string;
  flag: string;
  fullName: string;
}

export const UI_LANGUAGES: UiLanguageMeta[] = [
  {
    code: 'ko',
    nativeName: '한국어',
    koreanName: '한국어',
    flag: '🇰🇷',
    fullName: '한국어 (Korean)',
  },
  ...SUPPORTED_LANGUAGES.map((l) => ({
    ...l,
    code: l.code as UiLanguage,
    koreanName: l.labelKo,
  })),
];

export const getUiLanguageMeta = (code: UiLanguage): UiLanguageMeta =>
  UI_LANGUAGES.find((l) => l.code === code) || UI_LANGUAGES[0];

export interface HeaderUiStrings {
  brandTitle: string;
  subtitle: string;
  myLangTitle: string;
  dropdownHeader: string;
  langCountBadge: string;
  aiTeacherTitle: string;
  fullscreenEnter: string;
  fullscreenExit: string;
  collapseMenu: string;
  expandMenu: string;
  openMenu: string;
  exitFullscreenBtn: string;
  footerSubtitle: string;
}

export const HEADER_UI: Record<UiLanguage, HeaderUiStrings> = {
  ko: {
    brandTitle: '해볼 한국어',
    subtitle: '다문화·외국인 초등학생 맞춤 한국어',
    myLangTitle: '내 언어로 이용하기',
    dropdownHeader: '내 언어 선택 · Select Language',
    langCountBadge: '8개 언어 지원',
    aiTeacherTitle: 'AI 한국어 선생님과 대화하기',
    fullscreenEnter: '전체 화면으로 크게 보기',
    fullscreenExit: '전체 화면 나가기',
    collapseMenu: '메뉴 접기',
    expandMenu: '메뉴 펼치기',
    openMenu: '전체 메뉴 및 단원 열기',
    exitFullscreenBtn: '전체 화면 종료 (ESC)',
    footerSubtitle: '초등 다문화 학생용 한국어',
  },
  en: {
    brandTitle: 'Haebol Korean',
    subtitle: 'Korean for Multicultural Elementary Students in South Korea',
    myLangTitle: 'Use in My Language',
    dropdownHeader: 'Select My Language',
    langCountBadge: '8 Languages',
    aiTeacherTitle: 'Talk with AI Korean Teacher',
    fullscreenEnter: 'Enter Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    collapseMenu: 'Hide Menu',
    expandMenu: 'Show Menu',
    openMenu: 'Open All Menus & Units',
    exitFullscreenBtn: 'Exit Fullscreen (ESC)',
    footerSubtitle: 'Korean for Multicultural Elementary Students',
  },
  vi: {
    brandTitle: 'Tiếng Hàn Haebol',
    subtitle: 'Tiếng Hàn dành cho học sinh tiểu học đa văn hóa tại Hàn Quốc',
    myLangTitle: 'Dùng bằng ngôn ngữ của tôi',
    dropdownHeader: 'Chọn ngôn ngữ của tôi',
    langCountBadge: '8 ngôn ngữ',
    aiTeacherTitle: 'Trò chuyện với giáo viên AI tiếng Hàn',
    fullscreenEnter: 'Xem toàn màn hình',
    fullscreenExit: 'Thoát toàn màn hình',
    collapseMenu: 'Ẩn menu',
    expandMenu: 'Hiện menu',
    openMenu: 'Mở menu & danh sách bài học',
    exitFullscreenBtn: 'Thoát toàn màn hình (ESC)',
    footerSubtitle: 'Tiếng Hàn cho học sinh tiểu học đa văn hóa',
  },
  bn: {
    brandTitle: 'হেবল কোরিয়ান',
    subtitle: 'দক্ষিণ কোরিয়ার প্রাথমিক বিদ্যালয়ের শিক্ষার্থীদের জন্য কোরিয়ান',
    myLangTitle: 'আমার ভাষায় ব্যবহার করুন',
    dropdownHeader: 'আমার ভাষা নির্বাচন করুন',
    langCountBadge: '৮টি ভাষা',
    aiTeacherTitle: 'AI কোরিয়ান শিক্ষকের সাথে কথা বলুন',
    fullscreenEnter: 'পূর্ণ স্ক্রিন দেখুন',
    fullscreenExit: 'পূর্ণ স্ক্রিন বন্ধ করুন',
    collapseMenu: 'মেনু লুকান',
    expandMenu: 'মেনু দেখুন',
    openMenu: 'সব মেনু ও অধ্যায় খুলুন',
    exitFullscreenBtn: 'পূর্ণ স্ক্রিন বন্ধ করুন (ESC)',
    footerSubtitle: 'প্রাথমিক শিক্ষার্থীদের জন্য কোরিয়ান',
  },
  zh: {
    brandTitle: 'Haebol 韩语',
    subtitle: '面向韩国多元文化小学学生的韩语学习',
    myLangTitle: '使用我的母语',
    dropdownHeader: '选择我的语言',
    langCountBadge: '支持8种语言',
    aiTeacherTitle: '与AI韩语老师对话',
    fullscreenEnter: '全屏显示',
    fullscreenExit: '退出全屏',
    collapseMenu: '收起菜单',
    expandMenu: '展开菜单',
    openMenu: '打开全部菜单与单元',
    exitFullscreenBtn: '退出全屏 (ESC)',
    footerSubtitle: '面向小学多元文化学生的韩语',
  },
  ru: {
    brandTitle: 'Haebol Корейский',
    subtitle: 'Корейский язык для школьников в Южной Корее',
    myLangTitle: 'На моём языке',
    dropdownHeader: 'Выберите свой язык',
    langCountBadge: '8 языков',
    aiTeacherTitle: 'Поговорить с AI-учителем корейского',
    fullscreenEnter: 'На весь экран',
    fullscreenExit: 'Выйти из полноэкранного режима',
    collapseMenu: 'Скрыть меню',
    expandMenu: 'Показать меню',
    openMenu: 'Открыть меню и разделы',
    exitFullscreenBtn: 'Выйти из полного экрана (ESC)',
    footerSubtitle: 'Корейский для младших школьников',
  },
  ja: {
    brandTitle: 'Haebol 韓国語',
    subtitle: '韓国の多文化小学生のための韓国語学習',
    myLangTitle: '自分の言語で使う',
    dropdownHeader: '言語を選択',
    langCountBadge: '8言語対応',
    aiTeacherTitle: 'AI韓国語先生と話す',
    fullscreenEnter: '全画面で大きく見る',
    fullscreenExit: '全画面を終了',
    collapseMenu: 'メニューを隠す',
    expandMenu: 'メニューを開く',
    openMenu: 'すべてのメニューと単元を開く',
    exitFullscreenBtn: '全画面を終了 (ESC)',
    footerSubtitle: '小学生のための韓国語学習',
  },
  mn: {
    brandTitle: 'Haebol Солонгос хэл',
    subtitle: 'Солонгос дахь бага ангийн сурагчдад зориулсан солонгос хэл',
    myLangTitle: 'Өөрийн хэлээр ашиглах',
    dropdownHeader: 'Миний хэлийг сонгох',
    langCountBadge: '8 хэлний дэмжлэг',
    aiTeacherTitle: 'AI солонгос хэлний багштай ярилцах',
    fullscreenEnter: 'Бүтэн дэлгэцээр харах',
    fullscreenExit: 'Бүтэн дэлгэцээс гарах',
    collapseMenu: 'Цэс нуух',
    expandMenu: 'Цэс нээх',
    openMenu: 'Бүх цэс ба хичээл нээх',
    exitFullscreenBtn: 'Бүтэн дэлгэц хаах (ESC)',
    footerSubtitle: 'Бага ангийн сурагчдад зориулсан солонгос хэл',
  },
};

export interface NavUiStrings {
  tracks: {
    hangeul: string;
    classroom: string;
    verb: string;
    particle: string;
  };
  methods: {
    flashcard: string;
    study: string;
    games: string;
  };
  overviewBtn: string;
}

export const NAV_UI: Record<UiLanguage, NavUiStrings> = {
  ko: {
    tracks: { hangeul: '한글', classroom: '교실한국어', verb: '용언', particle: '조사' },
    methods: { flashcard: '플래시카드', study: '프린트', games: '게임' },
    overviewBtn: '전체 단원 모아보기',
  },
  en: {
    tracks: { hangeul: 'Letter', classroom: 'Vocab', verb: 'Verb', particle: 'Particle' },
    methods: { flashcard: 'Flashcard', study: 'Worksheet', games: 'Game' },
    overviewBtn: 'All Units Overview',
  },
  vi: {
    tracks: { hangeul: 'Chữ cái', classroom: 'Từ vựng', verb: 'Động·Tính từ', particle: 'Tiểu từ' },
    methods: { flashcard: 'Thẻ học', study: 'Bài tập', games: 'Trò chơi' },
    overviewBtn: 'Xem tất cả bài học',
  },
  bn: {
    tracks: { hangeul: 'বর্ণমালা', classroom: 'শব্দভাণ্ডার', verb: 'ক্রিয়া·বিশেষণ', particle: 'অনুসর্গ' },
    methods: { flashcard: 'ফ্ল্যাশকার্ড', study: 'ওয়ার্কশিট', games: 'গেম' },
    overviewBtn: 'সব অধ্যায় একসাথে দেখুন',
  },
  zh: {
    tracks: { hangeul: '韩文字母', classroom: '课堂词汇', verb: '谓词活用', particle: '助词' },
    methods: { flashcard: '闪卡', study: '练习纸', games: '游戏' },
    overviewBtn: '查看全部单元',
  },
  ru: {
    tracks: { hangeul: 'Алфавит', classroom: 'Слова', verb: 'Глагол', particle: 'Частицы' },
    methods: { flashcard: 'Карточки', study: 'Листы', games: 'Игры' },
    overviewBtn: 'Обзор всех тем',
  },
  ja: {
    tracks: { hangeul: '文字', classroom: '語彙', verb: '用言', particle: '助詞' },
    methods: { flashcard: 'フラッシュカード', study: 'プリント', games: 'ゲーム' },
    overviewBtn: '全単元一覧',
  },
  mn: {
    tracks: { hangeul: 'Үсэг', classroom: 'Үгсийн сан', verb: 'Үйл·Тэмдэг нэр', particle: 'Нөхцөл' },
    methods: { flashcard: 'Флаш карт', study: 'Дасгал хуудас', games: 'Тоглоом' },
    overviewBtn: 'Бүх хичээлийг харах',
  },
};

export interface SubTabUiStrings {
  flashcardTabs: {
    jamo: string;
    basic: string;
    batchim: string;
    vocab: string;
    verb: string;
    particle: string;
    hangeulBasic: string;
    classroomVocab: string;
  };
  studyTabs: {
    jamo: string;
    basic: string;
    batchim: string;
    verb: string;
    particle: string;
    flashcards: string;
    writing: string;
    quiz: string;
    wordbook: string;
    summary: string;
  };
  gameTabs: {
    balloon: string;
    memory: string;
    mandu: string;
    slingshot: string;
  };
  studyControls: {
    pickLangs: string;
    pickLangsTitle: string;
    pickModalHeader: string;
    selectedSuffix: string;
    prioritySuffix: string;
    wordbookLangTitle: string;
    overviewTitle: string;
    unitPrintTitle: string;
    allPrintTitle: string;
    allPrintPrefix: string;
    unitSelectTitle: string;
  };
}

export const SUBTAB_UI: Record<UiLanguage, SubTabUiStrings> = {
  ko: {
    flashcardTabs: {
      jamo: '자음모음',
      basic: '기본글자',
      batchim: '받침글자',
      vocab: '그림카드',
      verb: '용언 활용',
      particle: '조사 결합',
      hangeulBasic: '한글기초',
      classroomVocab: '교실어휘',
    },
    studyTabs: {
      jamo: '자음모음',
      basic: '기본글자',
      batchim: '받침글자',
      verb: '용언 활용',
      particle: '조사 결합',
      flashcards: '그림카드',
      writing: '따라쓰기',
      quiz: '받아쓰기',
      wordbook: '단어장',
      summary: '총정리',
    },
    gameTabs: {
      balloon: '풍선게임',
      memory: '메모리게임',
      mandu: '만두요리',
      slingshot: '새총게임',
    },
    studyControls: {
      pickLangs: '언어 골라 담기',
      pickLangsTitle: '학습지에 필요한 언어 골라 담기 (최소 1개 ~ 최대 3개)',
      pickModalHeader: '학습지 표기 언어 담기 (최대 3개)',
      selectedSuffix: '선택됨',
      prioritySuffix: '순위',
      wordbookLangTitle: '단어장에 표기할 번역 언어 선택',
      overviewTitle: '학습지 전체 모아보기',
      unitPrintTitle: '단원별인쇄 (그림카드+따라쓰기+받아쓰기 3장)',
      allPrintTitle: '전체 일괄 인쇄',
      allPrintPrefix: '전체인쇄',
      unitSelectTitle: '단원 선택',
    },
  },
  en: {
    flashcardTabs: {
      jamo: 'Jamo',
      basic: 'Basic Letters',
      batchim: 'Final Consonants',
      vocab: 'Picture Cards',
      verb: 'Verbs',
      particle: 'Particles',
      hangeulBasic: 'Hangeul',
      classroomVocab: 'Vocab',
    },
    studyTabs: {
      jamo: 'Jamo',
      basic: 'Basic Letters',
      batchim: 'Batchim',
      verb: 'Verbs',
      particle: 'Particles',
      flashcards: 'Picture Cards',
      writing: 'Tracing',
      quiz: 'Dictation',
      wordbook: 'Wordbook',
      summary: 'Summary',
    },
    gameTabs: {
      balloon: 'Balloon Pop',
      memory: 'Memory Match',
      mandu: 'Mandu Cook',
      slingshot: 'Slingshot',
    },
    studyControls: {
      pickLangs: 'Pick Languages',
      pickLangsTitle: 'Pick worksheet languages (1 to 3)',
      pickModalHeader: 'Worksheet Languages (Max 3)',
      selectedSuffix: 'selected',
      prioritySuffix: '',
      wordbookLangTitle: 'Select translation language for wordbook',
      overviewTitle: 'View All Worksheets',
      unitPrintTitle: 'Print Unit Set (3 sheets)',
      allPrintTitle: 'Print All Sheets',
      allPrintPrefix: 'Print All',
      unitSelectTitle: 'Select Unit',
    },
  },
  vi: {
    flashcardTabs: {
      jamo: 'Phụ & Nguyên âm',
      basic: 'Chữ cơ bản',
      batchim: 'Âm cuối',
      vocab: 'Thẻ hình ảnh',
      verb: 'Động·Tính từ',
      particle: 'Tiểu từ',
      hangeulBasic: 'Chữ cái',
      classroomVocab: 'Từ vựng',
    },
    studyTabs: {
      jamo: 'Phụ & Nguyên âm',
      basic: 'Chữ cơ bản',
      batchim: 'Âm cuối',
      verb: 'Động·Tính từ',
      particle: 'Tiểu từ',
      flashcards: 'Thẻ hình ảnh',
      writing: 'Tập viết theo',
      quiz: 'Chính tả',
      wordbook: 'Sổ từ vựng',
      summary: 'Tổng hợp',
    },
    gameTabs: {
      balloon: 'Đập bóng bay',
      memory: 'Ghép thẻ nhớ',
      mandu: 'Nấu bánh xếp',
      slingshot: 'Bắn ná',
    },
    studyControls: {
      pickLangs: 'Chọn ngôn ngữ',
      pickLangsTitle: 'Chọn ngôn ngữ trên phiếu bài tập (1~3 ngôn ngữ)',
      pickModalHeader: 'Ngôn ngữ trên bài tập (tối đa 3)',
      selectedSuffix: 'đã chọn',
      prioritySuffix: '',
      wordbookLangTitle: 'Chọn ngôn ngữ dịch cho sổ từ vựng',
      overviewTitle: 'Xem tất cả phiếu bài tập',
      unitPrintTitle: 'In trọn bộ bài (3 tờ)',
      allPrintTitle: 'In tất cả bài tập',
      allPrintPrefix: 'In tất cả',
      unitSelectTitle: 'Chọn bài học',
    },
  },
  bn: {
    flashcardTabs: {
      jamo: 'ব্যঞ্জন·স্বরবর্ণ',
      basic: 'মৌলিক অক্ষর',
      batchim: 'বাচ্ছিম অক্ষর',
      vocab: 'ছবির কার্ড',
      verb: 'ক্রিয়া·বিশেষণ',
      particle: 'অনুসর্গ',
      hangeulBasic: 'বর্ণমালা',
      classroomVocab: 'শব্দভাণ্ডার',
    },
    studyTabs: {
      jamo: 'ব্যঞ্জন·স্বরবর্ণ',
      basic: 'মৌলিক অক্ষর',
      batchim: 'বাচ্ছিম',
      verb: 'ক্রিয়া·বিশেষণ',
      particle: 'অনুসর্গ',
      flashcards: 'ছবির কার্ড',
      writing: 'হাতে লেখা',
      quiz: 'শ্রুতলিপি',
      wordbook: 'শব্দকোষ',
      summary: 'সারসংক্ষেপ',
    },
    gameTabs: {
      balloon: 'বেলুন খেলা',
      memory: 'মেমোরি খেলা',
      mandu: 'মান্ডু রান্না',
      slingshot: 'গুলতি খেলা',
    },
    studyControls: {
      pickLangs: 'ভাষা বাছাই',
      pickLangsTitle: 'ওয়ার্কশিটের ভাষা বাছাই করুন (১~৩টি)',
      pickModalHeader: 'ওয়ার্কশিটের ভাষা (সর্বোচ্চ ৩টি)',
      selectedSuffix: 'নির্বাচিত',
      prioritySuffix: '',
      wordbookLangTitle: 'শব্দকোষের অনুবাদ ভাষা নির্বাচন করুন',
      overviewTitle: 'সব ওয়ার্কশিট দেখুন',
      unitPrintTitle: 'অধ্যায় সেট প্রিন্ট (৩ পাতা)',
      allPrintTitle: 'সব পাতা প্রিন্ট করুন',
      allPrintPrefix: 'সব প্রিন্ট',
      unitSelectTitle: 'অধ্যায় নির্বাচন',
    },
  },
  zh: {
    flashcardTabs: {
      jamo: '辅音·元音',
      basic: '基本字母',
      batchim: '收音字母',
      vocab: '图卡单词',
      verb: '谓词活用',
      particle: '助词搭配',
      hangeulBasic: '韩文基础',
      classroomVocab: '课堂词汇',
    },
    studyTabs: {
      jamo: '辅音·元音',
      basic: '基本字母',
      batchim: '收音字母',
      verb: '谓词活用',
      particle: '助词搭配',
      flashcards: '图卡练习',
      writing: '描红书写',
      quiz: '听写测试',
      wordbook: '单词本',
      summary: '总整理',
    },
    gameTabs: {
      balloon: '气球游戏',
      memory: '记忆翻牌',
      mandu: '做饺子游戏',
      slingshot: '弹弓游戏',
    },
    studyControls: {
      pickLangs: '选择语言',
      pickLangsTitle: '选择练习纸显示的语言（1~3种）',
      pickModalHeader: '练习纸显示语言（最多3种）',
      selectedSuffix: '已选',
      prioritySuffix: '顺位',
      wordbookLangTitle: '选择单词本翻译语言',
      overviewTitle: '查看全部练习纸',
      unitPrintTitle: '按单元打印（3页套装）',
      allPrintTitle: '全部批量打印',
      allPrintPrefix: '全部打印',
      unitSelectTitle: '选择单元',
    },
  },
  ru: {
    flashcardTabs: {
      jamo: 'Согл. и глас.',
      basic: 'Базовые буквы',
      batchim: 'Падчим',
      vocab: 'Карточки слов',
      verb: 'Глаголы',
      particle: 'Частицы',
      hangeulBasic: 'Хангыль',
      classroomVocab: 'Слова',
    },
    studyTabs: {
      jamo: 'Согл. и глас.',
      basic: 'Базовые буквы',
      batchim: 'Падчим',
      verb: 'Глаголы',
      particle: 'Частицы',
      flashcards: 'Карточки',
      writing: 'Прописи',
      quiz: 'Диктант',
      wordbook: 'Словарь',
      summary: 'Сводка',
    },
    gameTabs: {
      balloon: 'Шарики',
      memory: 'Память',
      mandu: 'Готовим манду',
      slingshot: 'Рогатка',
    },
    studyControls: {
      pickLangs: 'Выбрать языки',
      pickLangsTitle: 'Выберите языки для листов (1–3)',
      pickModalHeader: 'Языки в листах (макс. 3)',
      selectedSuffix: 'выбрано',
      prioritySuffix: '',
      wordbookLangTitle: 'Язык перевода в словаре',
      overviewTitle: 'Обзор всех листов',
      unitPrintTitle: 'Печать комплекта (3 листа)',
      allPrintTitle: 'Печатать все листы',
      allPrintPrefix: 'Печать всех',
      unitSelectTitle: 'Выбрать тему',
    },
  },
  ja: {
    flashcardTabs: {
      jamo: '子音·母音',
      basic: '基本文字',
      batchim: 'パッチム',
      vocab: '絵カード',
      verb: '用言活用',
      particle: '助詞結合',
      hangeulBasic: 'ハングル',
      classroomVocab: '語彙',
    },
    studyTabs: {
      jamo: '子音·母音',
      basic: '基本文字',
      batchim: 'パッチム',
      verb: '用言活用',
      particle: '助詞結合',
      flashcards: '絵カード',
      writing: 'なぞり書き',
      quiz: '書き取り',
      wordbook: '単語帳',
      summary: '総まとめ',
    },
    gameTabs: {
      balloon: '風船ゲーム',
      memory: 'メモリーゲーム',
      mandu: 'マンドゥ料理',
      slingshot: 'パチンコゲーム',
    },
    studyControls: {
      pickLangs: '言語を選択',
      pickLangsTitle: 'プリントに表示する言語を選択（1〜3つ）',
      pickModalHeader: 'プリント表示言語（最大3つ）',
      selectedSuffix: '選択中',
      prioritySuffix: '番目',
      wordbookLangTitle: '単語帳の翻訳言語を選択',
      overviewTitle: 'プリント一覧を見る',
      unitPrintTitle: '単元セット印刷（3枚）',
      allPrintTitle: 'すべて一括印刷',
      allPrintPrefix: 'すべて印刷',
      unitSelectTitle: '単元を選択',
    },
  },
  mn: {
    flashcardTabs: {
      jamo: 'Гийг·Эгшиг',
      basic: 'Үндсэн үсэг',
      batchim: 'Батчим үсэг',
      vocab: 'Зурагт карт',
      verb: 'Үйл·Тэмдэг нэр',
      particle: 'Нөхцөл',
      hangeulBasic: 'Үсэг',
      classroomVocab: 'Үгсийн сан',
    },
    studyTabs: {
      jamo: 'Гийг·Эгшиг',
      basic: 'Үндсэн үсэг',
      batchim: 'Батчим',
      verb: 'Үйл·Тэмдэг нэр',
      particle: 'Нөхцөл',
      flashcards: 'Зурагт карт',
      writing: 'Дагаж бичих',
      quiz: 'Цээж бичиг',
      wordbook: 'Үгийн дэвтэр',
      summary: 'Нэгтгэл',
    },
    gameTabs: {
      balloon: 'Бөмбөлөг',
      memory: 'Ой санамж',
      mandu: 'Банш хийх',
      slingshot: 'Чавх',
    },
    studyControls: {
      pickLangs: 'Хэл сонгох',
      pickLangsTitle: 'Дасгал хуудасны хэл сонгох (1–3)',
      pickModalHeader: 'Дасгал хуудасны хэл (дээд нь 3)',
      selectedSuffix: 'сонгосон',
      prioritySuffix: '',
      wordbookLangTitle: 'Үгийн дэвтрийн орчуулгын хэл',
      overviewTitle: 'Бүх дасгалыг харах',
      unitPrintTitle: 'Хичээлийн багц хэвлэх (3 хуудас)',
      allPrintTitle: 'Бүгдийг хэвлэх',
      allPrintPrefix: 'Бүгдийг хэвлэх',
      unitSelectTitle: 'Хичээл сонгох',
    },
  },
};

export interface FlashcardCommonUiStrings {
  prevCard: string;
  nextCard: string;
  prevUnit: string;
  nextUnit: string;
  listenAll: string;
  touchHint: string;
  meaningHint: string;
  selectLangTitle: string;
  closeBtn: string;
}

export const FLASHCARD_COMMON_UI: Record<UiLanguage, FlashcardCommonUiStrings> = {
  ko: {
    prevCard: '이전 글자',
    nextCard: '다음 글자',
    prevUnit: '이전 단원',
    nextUnit: '다음 단원',
    listenAll: '전체 듣기',
    touchHint: '누르면 소리가 나요',
    meaningHint: '클릭하여 뜻 확인',
    selectLangTitle: '언어 선택 · Select Language',
    closeBtn: '닫기',
  },
  en: {
    prevCard: 'Previous Card',
    nextCard: 'Next Card',
    prevUnit: 'Previous Unit',
    nextUnit: 'Next Unit',
    listenAll: 'Listen All',
    touchHint: 'touch',
    meaningHint: 'Tap to see meaning',
    selectLangTitle: 'Select Language',
    closeBtn: 'Close',
  },
  vi: {
    prevCard: 'Thẻ trước',
    nextCard: 'Thẻ tiếp',
    prevUnit: 'Bài trước',
    nextUnit: 'Bài tiếp',
    listenAll: 'Nghe tất cả',
    touchHint: 'chạm nghe',
    meaningHint: 'Chạm để xem nghĩa',
    selectLangTitle: 'Chọn ngôn ngữ',
    closeBtn: 'Đóng',
  },
  bn: {
    prevCard: 'আগের কার্ড',
    nextCard: 'পরের কার্ড',
    prevUnit: 'আগের অধ্যায়',
    nextUnit: 'পরের অধ্যায়',
    listenAll: 'সব শুনুন',
    touchHint: 'স্পর্শ করুন',
    meaningHint: 'অর্থ দেখতে স্পর্শ করুন',
    selectLangTitle: 'ভাষা নির্বাচন করুন',
    closeBtn: 'বন্ধ করুন',
  },
  zh: {
    prevCard: '上一张',
    nextCard: '下一张',
    prevUnit: '上一单元',
    nextUnit: '下一单元',
    listenAll: '全部听一遍',
    touchHint: '点击发音',
    meaningHint: '点击查看释义',
    selectLangTitle: '选择语言',
    closeBtn: '关闭',
  },
  ru: {
    prevCard: 'Назад',
    nextCard: 'Вперёд',
    prevUnit: 'Пред. тема',
    nextUnit: 'След. тема',
    listenAll: 'Слушать всё',
    touchHint: 'нажмите',
    meaningHint: 'Нажмите, чтобы узнать значение',
    selectLangTitle: 'Выбрать язык',
    closeBtn: 'Закрыть',
  },
  ja: {
    prevCard: '前のカード',
    nextCard: '次のカード',
    prevUnit: '前の単元',
    nextUnit: '次の単元',
    listenAll: '全部聞く',
    touchHint: 'タッチで発音',
    meaningHint: 'クリックして意味を確認',
    selectLangTitle: '言語を選択',
    closeBtn: '閉じる',
  },
  mn: {
    prevCard: 'Өмнөх карт',
    nextCard: 'Дараах карт',
    prevUnit: 'Өмнөх хичээл',
    nextUnit: 'Дараах хичээл',
    listenAll: 'Бүгдийг сонсох',
    touchHint: 'дарж сонсох',
    meaningHint: 'Дарж утгыг харах',
    selectLangTitle: 'Хэл сонгох',
    closeBtn: 'Хаах',
  },
};

export interface GamesUiStrings {
  balloon: {
    guideVoice: string;
    guideSpeed: string;
    stopBtn: string;
    listenBtn: string;
    starsLabel: string;
    clearTitle: string;
    clearSubtitle: string;
    nextStageBtn: string;
    replayBtn: string;
    speedUp: string;
    feverTime: string;
    correctPop: string;
  };
  memory: {
    guideLine1: string;
    guideLine2: string;
    turnsPrefix: string;
    turnsSuffix: string;
    newGameBtn: string;
    albumBtn: string;
    nextUnitBtn: string;
    retryGoldBtn: string;
    goldBadge: string;
    silverBadge: string;
    bronzeBadge: string;
    goldRule: string;
    silverRule: string;
    bronzeRule: string;
    earnedAllClear: string;
    resetTitle: string;
    resetMsg: string;
    cancelBtn: string;
    resetBtn: string;
  };
  mandu: {
    guideLine1: string;
    guideLine2: string;
    dragHint: string;
    growthLabel: string;
    burnLabel: string;
    clearBanner: string;
    nextManduBtn: string;
    nextUnitBtn: string;
    burntTitle: string;
    retryManduBtn: string;
    wrongMsg: string;
    levelUpPrefix: string;
  };
  slingshot: {
    holdHint: string;
    launchBadge: string;
    tooWeakMsg: string;
    tooStrongMsg: string;
    weakBanner: string;
    overBanner: string;
    nextQuestion: string;
    fromStart: string;
    retryShot: string;
    allClear: string;
    nextUnitPrefix: string;
    nextUnitSuffix: string;
  };
}

export const GAMES_UI: Record<UiLanguage, GamesUiStrings> = {
  ko: {
    balloon: {
      guideVoice: '들리는 한글을 듣고 / 풍선을 터뜨려요!',
      guideSpeed: '점점 빨라지는 풍선을 / 재빨리 터치해요!',
      stopBtn: '멈춤',
      listenBtn: '다시 듣기',
      starsLabel: '모은 별',
      clearTitle: '🎉 축하해요! 9라운드 완료!',
      clearSubtitle: '별 9개를 모두 모았어요! ⭐',
      nextStageBtn: '다음 풍선 터뜨리기',
      replayBtn: '다시 하기',
      speedUp: '⚡ 속도 UP!',
      feverTime: '🔥 피버 타임!',
      correctPop: '정답! 🎉',
    },
    memory: {
      guideLine1: '같은 카드끼리 뒤집어보세요',
      guideLine2: '금메달 뱃지 30개 모으기 도전!',
      turnsPrefix: '시도 횟수 ·',
      turnsSuffix: '회',
      newGameBtn: '새 게임',
      albumBtn: '내 앨범',
      nextUnitBtn: '다음 카드 뒤집기 도전',
      retryGoldBtn: '다시 도전하기(금메달 도전!)',
      goldBadge: '금메달',
      silverBadge: '은메달',
      bronzeBadge: '동메달',
      goldRule: '6회 이하',
      silverRule: '7~9회',
      bronzeRule: '10회 이상',
      earnedAllClear: '모든 짝을 맞혔어요!',
      resetTitle: '기록 초기화',
      resetMsg: '모은 메달 기록을 모두 지우고 처음부터 다시 시작할까요?',
      cancelBtn: '취소',
      resetBtn: '초기화',
    },
    mandu: {
      guideLine1: '알맞는 어미를 찾아요',
      guideLine2: '',
      dragHint: '클릭하거나 드래그해요',
      growthLabel: '🥟 왕만두 성장',
      burnLabel: '🔥 그을림',
      clearBanner: '🥟 만두 5개 성공! 왕만두 완성! ✨',
      nextManduBtn: '다시 도전',
      nextUnitBtn: '다음 왕만두 찌기',
      burntTitle: '💨 아이코! 만두가 까맣게 타버렸어요!',
      retryManduBtn: '새 만두 다시 요리하기',
      wrongMsg: '앗! 다시 해야 해. 이러다 다 타겠어ㅠㅠ',
      levelUpPrefix: '완성! 다음 단계:',
    },
    slingshot: {
      holdHint: '💡 버튼을 꾹 누르다가 초록 구간에서 손을 떼면 명중합니다!',
      launchBadge: '꾹 눌러 발사!',
      tooWeakMsg: '💧 살짝 눌렀어요! 꾹 누르세요!',
      tooStrongMsg: '🚀 너무 오래 눌러서 하늘로 날아갔어요!!',
      weakBanner: '툭...!! 힘 부족💧',
      overBanner: '🚀 너무 세게 눌렀다!!',
      nextQuestion: '➡️ 다음 문제',
      fromStart: '🏆 처음부터',
      retryShot: '🔄 다시 쏘기',
      allClear: '🏆 모두 클리어!',
      nextUnitPrefix: '🎯',
      nextUnitSuffix: '새총 쏘기',
    },
  },
  en: {
    balloon: {
      guideVoice: 'Listen to Korean & / pop the matching balloon!',
      guideSpeed: 'The balloons speed up — / tap quickly!',
      stopBtn: 'Stop',
      listenBtn: 'Listen',
      starsLabel: 'Stars',
      clearTitle: '🎉 Awesome! All 9 Rounds Done!',
      clearSubtitle: 'You collected all 9 stars! ⭐',
      nextStageBtn: 'Next Stage',
      replayBtn: 'Play Again',
      speedUp: '⚡ SPEED UP!',
      feverTime: '🔥 FEVER TIME!',
      correctPop: 'Correct! 🎉',
    },
    memory: {
      guideLine1: 'Flip cards to find matching pairs!',
      guideLine2: 'Try to collect 30 Gold Medals!',
      turnsPrefix: 'Turns ·',
      turnsSuffix: '',
      newGameBtn: 'New Game',
      albumBtn: 'My Album',
      nextUnitBtn: 'Next Unit',
      retryGoldBtn: 'Try Again (Go for Gold!)',
      goldBadge: 'Gold',
      silverBadge: 'Silver',
      bronzeBadge: 'Bronze',
      goldRule: '6 or fewer',
      silverRule: '7–9 turns',
      bronzeRule: '10+ turns',
      earnedAllClear: 'All pairs matched!',
      resetTitle: 'Reset Progress',
      resetMsg: 'Clear all saved medals and start over?',
      cancelBtn: 'Cancel',
      resetBtn: 'Reset',
    },
    mandu: {
      guideLine1: 'Find the right verb ending!',
      guideLine2: '',
      dragHint: 'Click or drag to pot',
      growthLabel: '🥟 Dumpling',
      burnLabel: '🔥 Burn',
      clearBanner: '🥟 5 solved! Giant Mandu Ready! ✨',
      nextManduBtn: 'Try Again',
      nextUnitBtn: 'Next Unit',
      burntTitle: '💨 Oops! The dumpling got burnt!',
      retryManduBtn: 'Cook New Mandu',
      wrongMsg: 'Oops! Try another ending before it burns!',
      levelUpPrefix: 'Cleared! Next:',
    },
    slingshot: {
      holdHint: '💡 Hold a button and release in the green zone to hit the target!',
      launchBadge: 'Hold to shoot!',
      tooWeakMsg: '💧 Too soft! Hold the button a bit longer!',
      tooStrongMsg: '🚀 Held too long — it flew into space!!',
      weakBanner: 'Plop... Too weak! 💧',
      overBanner: '🚀 Too strong!!',
      nextQuestion: '➡️ Next',
      fromStart: '🏆 Restart',
      retryShot: '🔄 Shoot Again',
      allClear: '🏆 All Clear!',
      nextUnitPrefix: '➡️ Next:',
      nextUnitSuffix: '',
    },
  },
  vi: {
    balloon: {
      guideVoice: 'Nghe âm tiếng Hàn / và đập bóng bay đúng!',
      guideSpeed: 'Bóng bay nhanh dần — / chạm thật nhanh nhé!',
      stopBtn: 'Dừng',
      listenBtn: 'Nghe lại',
      starsLabel: 'Số sao',
      clearTitle: '🎉 Chúc mừng! Hoàn thành 9 vòng!',
      clearSubtitle: 'Bạn đã thu thập đủ 9 ngôi sao! ⭐',
      nextStageBtn: 'Qua màn tiếp theo',
      replayBtn: 'Chơi lại',
      speedUp: '⚡ TĂNG TỐC!',
      feverTime: '🔥 SIÊU TỐC!',
      correctPop: 'Đúng rồi! 🎉',
    },
    memory: {
      guideLine1: 'Lật tìm các cặp thẻ giống nhau!',
      guideLine2: 'Thử thách thu thập 30 huy chương vàng!',
      turnsPrefix: 'Số lượt ·',
      turnsSuffix: 'lần',
      newGameBtn: 'Chơi mới',
      albumBtn: 'Bộ sưu tập',
      nextUnitBtn: 'Bài tiếp theo',
      retryGoldBtn: 'Thử lại (Săn huy chương vàng!)',
      goldBadge: 'Vàng',
      silverBadge: 'Bạc',
      bronzeBadge: 'Đồng',
      goldRule: '≤ 6 lượt',
      silverRule: '7–9 lượt',
      bronzeRule: '≥ 10 lượt',
      earnedAllClear: 'Đã ghép hết tất cả thẻ!',
      resetTitle: 'Đặt lại thành tích',
      resetMsg: 'Xóa toàn bộ huy chương đã lưu và chơi lại từ đầu?',
      cancelBtn: 'Hủy',
      resetBtn: 'Đặt lại',
    },
    mandu: {
      guideLine1: 'Tìm đúng đuôi động từ nhé!',
      guideLine2: '',
      dragHint: 'Chạm hoặc kéo vào nồi',
      growthLabel: '🥟 Bánh xếp',
      burnLabel: '🔥 Cháy khét',
      clearBanner: '🥟 Hoàn thành 5 câu! Bánh xếp hoàn thành! ✨',
      nextManduBtn: 'Thử lại',
      nextUnitBtn: 'Bài tiếp theo',
      burntTitle: '💨 Ôi! Bánh bị cháy đen rồi!',
      retryManduBtn: 'Nấu lại bánh mới',
      wrongMsg: 'Ôi sai rồi! Cẩn thận kẻo cháy bánh!',
      levelUpPrefix: 'Hoàn thành! Tiếp:',
    },
    slingshot: {
      holdHint: '💡 Nhấn giữ nút rồi thả tay ở vùng màu xanh để bắn trúng!',
      launchBadge: 'Nhấn giữ để bắn!',
      tooWeakMsg: '💧 Nhẹ quá! Hãy nhấn giữ lâu hơn một chút!',
      tooStrongMsg: '🚀 Giữ lâu quá nên bay thẳng lên trời rồi!!',
      weakBanner: 'Rơi rồi... Yếu quá! 💧',
      overBanner: '🚀 Mạnh quá rồi!!',
      nextQuestion: '➡️ Câu tiếp',
      fromStart: '🏆 Từ đầu',
      retryShot: '🔄 Bắn lại',
      allClear: '🏆 Hoàn thành!',
      nextUnitPrefix: '➡️ Sang',
      nextUnitSuffix: '',
    },
  },
  bn: {
    balloon: {
      guideVoice: 'কোরিয়ান শুনে / সঠিক বেলুন ফাটান!',
      guideSpeed: 'বেলুনগুলো দ্রুত হচ্ছে — / তাড়াতাড়ি ট্যাপ করুন!',
      stopBtn: 'থামুন',
      listenBtn: 'আবার শুনুন',
      starsLabel: 'তারা',
      clearTitle: '🎉 দারুণ! ৯ রাউন্ড শেষ!',
      clearSubtitle: 'সব ৯টি তারা সংগ্রহ করেছেন! ⭐',
      nextStageBtn: 'পরের ধাপ',
      replayBtn: 'আবার খেলুন',
      speedUp: '⚡ গতি বাড়ল!',
      feverTime: '🔥 ফিভার টাইম!',
      correctPop: 'সঠিক! 🎉',
    },
    memory: {
      guideLine1: 'কার্ড উল্টে জোড়া মেলান!',
      guideLine2: '৩০টি সোনার পদক জেতার চেষ্টা করুন!',
      turnsPrefix: 'চেষ্টা ·',
      turnsSuffix: 'বার',
      newGameBtn: 'নতুন খেলা',
      albumBtn: 'আমার অ্যালবাম',
      nextUnitBtn: 'পরের অধ্যায়',
      retryGoldBtn: 'আবার চেষ্টা (সোনার পদক!)',
      goldBadge: 'স্বর্ণ',
      silverBadge: 'রৌপ্য',
      bronzeBadge: 'ব্রোঞ্জ',
      goldRule: '৬ বা কম',
      silverRule: '৭–৯ বার',
      bronzeRule: '১০+ বার',
      earnedAllClear: 'সব জোড়া মিলেছে!',
      resetTitle: 'রেকর্ড মুছুন',
      resetMsg: 'সংরক্ষিত সব পদক মুছে নতুন করে শুরু করবেন?',
      cancelBtn: 'বাতিল',
      resetBtn: 'রিসেট',
    },
    mandu: {
      guideLine1: 'সঠিক ক্রিয়া সমাপ্তি খুঁজুন!',
      guideLine2: '',
      dragHint: 'ক্লিক বা টেনে দিন',
      growthLabel: '🥟 মান্ডু',
      burnLabel: '🔥 পোড়া',
      clearBanner: '🥟 ৫টি সঠিক! বড় মান্ডু তৈরি! ✨',
      nextManduBtn: 'আবার চেষ্টা করুন',
      nextUnitBtn: 'পরের অধ্যায়',
      burntTitle: '💨 উফ! মান্ডু পুড়ে গেছে!',
      retryManduBtn: 'নতুন মান্ডু রান্না করুন',
      wrongMsg: 'উফ! পুড়ে যাওয়ার আগে আবার চেষ্টা করুন!',
      levelUpPrefix: 'শেষ! পরবর্তী:',
    },
    slingshot: {
      holdHint: '💡 বোতাম চেপে ধরে সবুজ অংশে ছেড়ে দিন!',
      launchBadge: 'চেপে ধরে ছুড়ুন!',
      tooWeakMsg: '💧 খুব হালকা! একটু বেশি সময় চেপে ধরুন!',
      tooStrongMsg: '🚀 বেশি জোরে আকাশে উড়ে গেছে!!',
      weakBanner: 'টুপ... শক্তি কম! 💧',
      overBanner: '🚀 খুব জোরে!!',
      nextQuestion: '➡️ পরের প্রশ্ন',
      fromStart: '🏆 শুরু থেকে',
      retryShot: '🔄 আবার ছুড়ুন',
      allClear: '🏆 সব শেষ!',
      nextUnitPrefix: '➡️ পরবর্তী:',
      nextUnitSuffix: '',
    },
  },
  zh: {
    balloon: {
      guideVoice: '听韩语发音 / 戳破对应的气球！',
      guideSpeed: '气球越来越快 — / 快来点击吧！',
      stopBtn: '暂停',
      listenBtn: '再听一遍',
      starsLabel: '星星',
      clearTitle: '🎉 恭喜！完成全部9关！',
      clearSubtitle: '集齐了全部9颗星星！⭐',
      nextStageBtn: '进入下一阶段',
      replayBtn: '再玩一次',
      speedUp: '⚡ 加速！',
      feverTime: '🔥 狂热时间！',
      correctPop: '答对了！🎉',
    },
    memory: {
      guideLine1: '翻开卡片找出相同的一对！',
      guideLine2: '挑战收集30枚金牌徽章！',
      turnsPrefix: '尝试次数 ·',
      turnsSuffix: '次',
      newGameBtn: '新游戏',
      albumBtn: '我的相册',
      nextUnitBtn: '挑战下一单元',
      retryGoldBtn: '再来一次（冲击金牌！）',
      goldBadge: '金牌',
      silverBadge: '银牌',
      bronzeBadge: '铜牌',
      goldRule: '6次以内',
      silverRule: '7~9次',
      bronzeRule: '10次以上',
      earnedAllClear: '全部配对成功！',
      resetTitle: '重置记录',
      resetMsg: '要清除所有奖牌记录并重新开始吗？',
      cancelBtn: '取消',
      resetBtn: '重置',
    },
    mandu: {
      guideLine1: '找出正确的词尾吧！',
      guideLine2: '',
      dragHint: '点击或拖动到锅里',
      growthLabel: '🥟 大饺子成长',
      burnLabel: '🔥 糊锅值',
      clearBanner: '🥟 答对5题！大饺子完成！✨',
      nextManduBtn: '再次挑战',
      nextUnitBtn: '下一单元',
      burntTitle: '💨 哎呀！饺子烤糊了！',
      retryManduBtn: '重新煮新饺子',
      wrongMsg: '哎呀！选错了，再晚就要糊锅啦！',
      levelUpPrefix: '完成！下一关：',
    },
    slingshot: {
      holdHint: '💡 长按按钮，在绿色区域松手就能命中目标！',
      launchBadge: '长按发射！',
      tooWeakMsg: '💧 力气太小啦！再多按一会儿！',
      tooStrongMsg: '🚀 按太久飞到天上去啦！！',
      weakBanner: '掉下来了…力量不足 💧',
      overBanner: '🚀 用力过猛啦！！',
      nextQuestion: '➡️ 下一题',
      fromStart: '🏆 从头开始',
      retryShot: '🔄 重新发射',
      allClear: '🏆 全部通关！',
      nextUnitPrefix: '➡️ 进入',
      nextUnitSuffix: '',
    },
  },
  ru: {
    balloon: {
      guideVoice: 'Слушайте звук / и лопайте нужный шарик!',
      guideSpeed: 'Шарики ускоряются — / нажимайте быстрее!',
      stopBtn: 'Стоп',
      listenBtn: 'Слушать',
      starsLabel: 'Звёзды',
      clearTitle: '🎉 Отлично! 9 раундов пройдено!',
      clearSubtitle: 'Все 9 звёзд собраны! ⭐',
      nextStageBtn: 'Следующий этап',
      replayBtn: 'Играть снова',
      speedUp: '⚡ УСКОРЕНИЕ!',
      feverTime: '🔥 СУПЕРСКОРОСТЬ!',
      correctPop: 'Верно! 🎉',
    },
    memory: {
      guideLine1: 'Открывайте карточки и ищите пары!',
      guideLine2: 'Соберите все 30 золотых медалей!',
      turnsPrefix: 'Ходы ·',
      turnsSuffix: '',
      newGameBtn: 'Новая игра',
      albumBtn: 'Мой альбом',
      nextUnitBtn: 'Следующая тема',
      retryGoldBtn: 'Ещё раз (за золотом!)',
      goldBadge: 'Золото',
      silverBadge: 'Серебро',
      bronzeBadge: 'Бронза',
      goldRule: 'до 6 ходов',
      silverRule: '7–9 ходов',
      bronzeRule: '10+ ходов',
      earnedAllClear: 'Все пары найдены!',
      resetTitle: 'Сбросить прогресс',
      resetMsg: 'Удалить все сохранённые медали и начать заново?',
      cancelBtn: 'Отмена',
      resetBtn: 'Сбросить',
    },
    mandu: {
      guideLine1: 'Найдите нужное окончание!',
      guideLine2: '',
      dragHint: 'Нажмите или перетащите',
      growthLabel: '🥟 Манду',
      burnLabel: '🔥 Подгорание',
      clearBanner: '🥟 5 ответов! Большие манду готовы! ✨',
      nextManduBtn: 'Попробовать снова',
      nextUnitBtn: 'След. тема',
      burntTitle: '💨 Ой! Манду подгорели!',
      retryManduBtn: 'Начать заново',
      wrongMsg: 'Ой, не то! Попробуйте другое окончание!',
      levelUpPrefix: 'Готово! Далее:',
    },
    slingshot: {
      holdHint: '💡 Зажмите кнопку и отпустите в зелёной зоне, чтобы попасть в цель!',
      launchBadge: 'Зажми для выстрела!',
      tooWeakMsg: '💧 Слишком слабо! Подержите чуть дольше!',
      tooStrongMsg: '🚀 Слишком долго — улетело в космос!!',
      weakBanner: 'Плюх... Слабо! 💧',
      overBanner: '🚀 Слишком сильно!!',
      nextQuestion: '➡️ Дальше',
      fromStart: '🏆 Сначала',
      retryShot: '🔄 Выстрелить ещё раз',
      allClear: '🏆 Всё пройдено!',
      nextUnitPrefix: '➡️ К теме:',
      nextUnitSuffix: '',
    },
  },
  ja: {
    balloon: {
      guideVoice: '聞こえる韓国語を聞いて / 風船を割ろう！',
      guideSpeed: 'だんだん速くなる風船を / 素早くタッチしよう！',
      stopBtn: 'ストップ',
      listenBtn: 'もう一回聞く',
      starsLabel: '星',
      clearTitle: '🎉 おめでとう！9ラウンド完了！',
      clearSubtitle: '星を9個すべて集めました！⭐',
      nextStageBtn: '次のステージへ',
      replayBtn: 'もう一度遊ぶ',
      speedUp: '⚡ スピードUP！',
      feverTime: '🔥 フィーバータイム！',
      correctPop: '正解！🎉',
    },
    memory: {
      guideLine1: '同じカードをめくってペアを見つけよう！',
      guideLine2: '金メダルバッジ30個に挑戦しよう！',
      turnsPrefix: '回数 ·',
      turnsSuffix: '回',
      newGameBtn: 'ニューゲーム',
      albumBtn: 'マイアルバム',
      nextUnitBtn: '次の単元に挑戦',
      retryGoldBtn: 'もう一度挑戦（金メダルを狙おう！）',
      goldBadge: '金メダル',
      silverBadge: '銀メダル',
      bronzeBadge: '銅メダル',
      goldRule: '6回以下',
      silverRule: '7〜9回',
      bronzeRule: '10回以上',
      earnedAllClear: 'すべてのペアが揃いました！',
      resetTitle: '記録をリセット',
      resetMsg: '集めたメダルの記録を消して最初からやり直しますか？',
      cancelBtn: 'キャンセル',
      resetBtn: 'リセット',
    },
    mandu: {
      guideLine1: '正しい語尾を見つけよう！',
      guideLine2: '',
      dragHint: 'クリックまたはドラッグ',
      growthLabel: '🥟 マンドゥ成長',
      burnLabel: '🔥 こげ具合',
      clearBanner: '🥟 5問クリア！マンドゥ完成！✨',
      nextManduBtn: '再挑戦',
      nextUnitBtn: '次の単元へ',
      burntTitle: '💨 あっ！マンドゥが焦げちゃった！',
      retryManduBtn: '新しいマンドゥを作る',
      wrongMsg: 'あっ！間違い！焦げる前にもう一度！',
      levelUpPrefix: '完成！次のステップ：',
    },
    slingshot: {
      holdHint: '💡 ボタンを長押しして緑のエリアで離すと命中します！',
      launchBadge: '長押しで発射！',
      tooWeakMsg: '💧 弱すぎます！もう少し長押ししてね！',
      tooStrongMsg: '🚀 長押ししすぎて空へ飛んでいきました！！',
      weakBanner: 'ポトッ…力不足 💧',
      overBanner: '🚀 強すぎる！！',
      nextQuestion: '➡️ 次の問題',
      fromStart: '🏆 最初から',
      retryShot: '🔄 もう一度撃つ',
      allClear: '🏆 全クリア！',
      nextUnitPrefix: '➡️',
      nextUnitSuffix: 'へ',
    },
  },
  mn: {
    balloon: {
      guideVoice: 'Сонсоод зөв бөмбөлгийг / дарж хагалаарай!',
      guideSpeed: 'Хурдасч байгаа бөмбөлгийг / хурдан дараарай!',
      stopBtn: 'Зогсоох',
      listenBtn: 'Дахин сонсох',
      starsLabel: 'Од',
      clearTitle: '🎉 Баяр хүргэе! 9 үе дууслаа!',
      clearSubtitle: 'Бүх 9 одыг цуглууллаа! ⭐',
      nextStageBtn: 'Дараагийн шат',
      replayBtn: 'Дахин тоглох',
      speedUp: '⚡ ХУРД НЭМЭГДЛЭЭ!',
      feverTime: '🔥 ШУУРХАЙ ҮЕ!',
      correctPop: 'Зөв байна! 🎉',
    },
    memory: {
      guideLine1: 'Ижил картуудыг эргүүлж тааруулаарай!',
      guideLine2: '30 алтан медаль цуглуулаарай!',
      turnsPrefix: 'Оролдлого ·',
      turnsSuffix: 'удаа',
      newGameBtn: 'Шинэ тоглоом',
      albumBtn: 'Миний цомог',
      nextUnitBtn: 'Дараагийн хичээл',
      retryGoldBtn: 'Дахин оролдох (Алт авах!)',
      goldBadge: 'Алт',
      silverBadge: 'Мөнгө',
      bronzeBadge: 'Хүрэл',
      goldRule: '6 буюу цөөн',
      silverRule: '7–9 удаа',
      bronzeRule: '10+ удаа',
      earnedAllClear: 'Бүх хосыг таарууллаа!',
      resetTitle: 'Амжилт арилгах',
      resetMsg: 'Хадгалсан бүх медалийг устгаад шинээр эхлэх үү?',
      cancelBtn: 'Цуцлах',
      resetBtn: 'Шинэчлэх',
    },
    mandu: {
      guideLine1: 'Зөв төгсгөлийг олоорой!',
      guideLine2: '',
      dragHint: 'Дарах эсвэл чирэх',
      growthLabel: '🥟 Мантуу',
      burnLabel: '🔥 Түлэгдэлт',
      clearBanner: '🥟 5 зөв хариулт! Том мантуу бэлэн! ✨',
      nextManduBtn: 'Дахин оролдох',
      nextUnitBtn: 'Дараагийн хичээл',
      burntTitle: '💨 Өө! Мантуу түлэгдчихлээ!',
      retryManduBtn: 'Шинэ мантуу хийх',
      wrongMsg: 'Өө буруу байна! Түлэгдэхээс өмнө дахин оролдоорой!',
      levelUpPrefix: 'Дууслаа! Дараах:',
    },
    slingshot: {
      holdHint: '💡 Товчийг удаан дараад ногоон хэсэгт тавибал ононо!',
      launchBadge: 'Удаан дарж харвах!',
      tooWeakMsg: '💧 Хэт сул! Арай удаан дараарай!',
      tooStrongMsg: '🚀 Хэт удаан дараад тэнгэрт нисчихлээ!!',
      weakBanner: 'Уналаа... Хүч дутлаа 💧',
      overBanner: '🚀 Хэт хүчтэй!!',
      nextQuestion: '➡️ Дараагийн асуулт',
      fromStart: '🏆 Эхнээс нь',
      retryShot: '🔄 Дахин харвах',
      allClear: '🏆 Бүгд дууслаа!',
      nextUnitPrefix: '➡️',
      nextUnitSuffix: '',
    },
  },
};

export interface MenuExtrasUiStrings {
  particleSentenceTab: string;
  overview: {
    all: string;
    currentView: string;
    totalPrefix: string;
    totalSuffix: string;
    unitsSuffix: string;
    defaultSubtitle: string;
    closeTitle: string;
    flashcardTitles: {
      hangeul: string;
      classroom: string;
      verb: string;
      particle: string;
      particleSentence: string;
    };
    worksheetTitles: {
      jamo: string;
      basic: string;
      batchim: string;
      verb: string;
      particle: string;
      particleSentence: string;
      classroomCards: string;
      classroomWriting: string;
      classroomQuiz: string;
    };
    gameTitles: {
      hangeul: string;
      classroom: string;
      verb: string;
      particle: string;
    };
    particleGroupLabel: string;
  };
  stickman: {
    modalTitle: string;
    episodes: {
      ep1_consonants: string;
      ep2_vowels: string;
      ep3_double_consonants: string;
      ep4_compound_vowels: string;
    };
    barTitles: {
      ep1: string;
      ep2: string;
      ep3: string;
      ep4: string;
    };
    playAll: string;
    playingAll: string;
    enterFullscreen: string;
    exitFullscreen: string;
    close: string;
  };
  hallOfFame: {
    title: string;
    trophyLabel: string;
    badgeLabel: string;
    trophyUnlockedPrefix: string;
  };
}

export const MENU_EXTRAS_UI: Record<UiLanguage, MenuExtrasUiStrings> = {
  ko: {
    particleSentenceTab: '문장 만들기',
    overview: {
      all: '전체',
      currentView: '현재 보기',
      totalPrefix: '총 ',
      totalSuffix: '개',
      unitsSuffix: '개 단원',
      defaultSubtitle: '카드를 선택하면 바로 이동합니다.',
      closeTitle: '닫기 (ESC)',
      flashcardTitles: {
        hangeul: '한글 기초 플래시카드 모아보기',
        classroom: '교실 한국어 플래시카드 모아보기',
        verb: '용언 활용 플래시카드 모아보기',
        particle: '조사 결합 플래시카드 모아보기',
        particleSentence: '문장 만들기 플래시카드 모아보기',
      },
      worksheetTitles: {
        jamo: '한글 · 자음모음 학습지 모아보기',
        basic: '한글 · 기본글자 학습지 모아보기',
        batchim: '한글 · 받침글자 학습지 모아보기',
        verb: '용언 활용 학습지 모아보기',
        particle: '조사 결합 학습지 모아보기',
        particleSentence: '문장 만들기 학습지 모아보기',
        classroomCards: '교실한국어 · 그림카드 모아보기',
        classroomWriting: '교실한국어 · 따라쓰기 모아보기',
        classroomQuiz: '교실한국어 · 받아쓰기 모아보기',
      },
      gameTitles: {
        hangeul: '한글 기초 풍선게임 단원 모아보기',
        classroom: '교실 한국어 카드게임 단원 모아보기',
        verb: '어간·어미 만두요리 단원 모아보기',
        particle: '조사 새총게임 30단원 모아보기',
      },
      particleGroupLabel: '새총게임 · 조사 30단원',
    },
    stickman: {
      modalTitle: '졸라한글맨',
      episodes: {
        ep1_consonants: '01. 자음편',
        ep2_vowels: '02. 모음편',
        ep3_double_consonants: '03. 쌍자음편',
        ep4_compound_vowels: '04. 복합모음편',
      },
      barTitles: {
        ep1: '졸라자음맨 (ㄱ ~ ㅎ)',
        ep2: '졸라모음맨 (ㅏ ~ ㅣ)',
        ep3: '졸라쌍자음맨 (ㄲ ~ ㅉ)',
        ep4: '졸라복합모음맨 (ㅐ ~ ㅢ)',
      },
      playAll: '전체감상',
      playingAll: '전체감상 중',
      enterFullscreen: '전체화면',
      exitFullscreen: '전체화면 나가기',
      close: '닫기',
    },
    hallOfFame: {
      title: '명예의 전당',
      trophyLabel: '트로피',
      badgeLabel: '총 뱃지',
      trophyUnlockedPrefix: '🏛️ 명예의 전당 트로피 획득!',
    },
  },
  en: {
    particleSentenceTab: 'Sentence Making',
    overview: {
      all: 'All',
      currentView: 'Current',
      totalPrefix: 'Total ',
      totalSuffix: '',
      unitsSuffix: ' units',
      defaultSubtitle: 'Tap any card to jump directly to that unit.',
      closeTitle: 'Close (ESC)',
      flashcardTitles: {
        hangeul: 'Hangeul Flashcards Overview',
        classroom: 'Classroom Korean Flashcards Overview',
        verb: 'Verb Conjugation Flashcards Overview',
        particle: 'Particles Flashcards Overview',
        particleSentence: 'Sentence Making Flashcards Overview',
      },
      worksheetTitles: {
        jamo: 'Hangeul · Letters Worksheets Overview',
        basic: 'Hangeul · Syllables Worksheets Overview',
        batchim: 'Hangeul · Final Consonants Overview',
        verb: 'Verb Conjugation Worksheets Overview',
        particle: 'Particles Worksheets Overview',
        particleSentence: 'Sentence Making Worksheets Overview',
        classroomCards: 'Classroom Korean · Picture Cards Overview',
        classroomWriting: 'Classroom Korean · Tracing Sheets Overview',
        classroomQuiz: 'Classroom Korean · Dictation Sheets Overview',
      },
      gameTitles: {
        hangeul: 'Hangeul Balloon Game Units',
        classroom: 'Classroom Korean Memory Game Units',
        verb: 'Verb Mandu Cooking Game Units',
        particle: 'Particles Slingshot Game (30 Units)',
      },
      particleGroupLabel: 'Slingshot · 30 Particle Units',
    },
    stickman: {
      modalTitle: 'Stickman Hangeul',
      episodes: {
        ep1_consonants: '01. Consonants',
        ep2_vowels: '02. Vowels',
        ep3_double_consonants: '03. Double Cons.',
        ep4_compound_vowels: '04. Compound Vowels',
      },
      barTitles: {
        ep1: 'Consonants (ㄱ ~ ㅎ)',
        ep2: 'Vowels (ㅏ ~ ㅣ)',
        ep3: 'Double Consonants (ㄲ ~ ㅉ)',
        ep4: 'Compound Vowels (ㅐ ~ ㅢ)',
      },
      playAll: 'Play All',
      playingAll: 'Playing',
      enterFullscreen: 'Fullscreen',
      exitFullscreen: 'Exit Fullscreen',
      close: 'Close',
    },
    hallOfFame: {
      title: 'Hall of Fame',
      trophyLabel: 'Trophies',
      badgeLabel: 'Badges',
      trophyUnlockedPrefix: '🏛️ Hall of Fame Trophy Unlocked!',
    },
  },
  vi: {
    particleSentenceTab: 'Đặt câu',
    overview: {
      all: 'Tất cả',
      currentView: 'Đang xem',
      totalPrefix: 'Tổng ',
      totalSuffix: '',
      unitsSuffix: ' bài',
      defaultSubtitle: 'Chọn thẻ để chuyển ngay đến bài học đó.',
      closeTitle: 'Đóng (ESC)',
      flashcardTitles: {
        hangeul: 'Tổng quan thẻ học Hangeul',
        classroom: 'Tổng quan thẻ từ vựng lớp học',
        verb: 'Tổng quan thẻ chia động từ',
        particle: 'Tổng quan thẻ tiểu từ',
        particleSentence: 'Tổng quan thẻ đặt câu',
      },
      worksheetTitles: {
        jamo: 'Hangeul · Phiếu bảng chữ cái',
        basic: 'Hangeul · Phiếu ghép chữ cơ bản',
        batchim: 'Hangeul · Phiếu phụ âm cuối',
        verb: 'Tổng quan phiếu chia động từ',
        particle: 'Tổng quan phiếu tiểu từ',
        particleSentence: 'Tổng quan phiếu đặt câu',
        classroomCards: 'Lớp học · Phiếu thẻ tranh',
        classroomWriting: 'Lớp học · Phiếu tập viết',
        classroomQuiz: 'Lớp học · Phiếu chính tả',
      },
      gameTitles: {
        hangeul: 'Bài chơi Bóng bay Hangeul',
        classroom: 'Bài chơi Lật thẻ lớp học',
        verb: 'Bài chơi Nấu bánh Mandu',
        particle: 'Trò chơi Ná cao su (30 bài tiểu từ)',
      },
      particleGroupLabel: 'Ná cao su · 30 bài tiểu từ',
    },
    stickman: {
      modalTitle: 'Người que Hangeul',
      episodes: {
        ep1_consonants: '01. Phụ âm',
        ep2_vowels: '02. Nguyên âm',
        ep3_double_consonants: '03. Phụ âm căng',
        ep4_compound_vowels: '04. Nguyên âm ghép',
      },
      barTitles: {
        ep1: 'Phụ âm (ㄱ ~ ㅎ)',
        ep2: 'Nguyên âm (ㅏ ~ ㅣ)',
        ep3: 'Phụ âm căng (ㄲ ~ ㅉ)',
        ep4: 'Nguyên âm ghép (ㅐ ~ ㅢ)',
      },
      playAll: 'Xem tất cả',
      playingAll: 'Đang phát',
      enterFullscreen: 'Toàn màn hình',
      exitFullscreen: 'Thoát toàn màn hình',
      close: 'Đóng',
    },
    hallOfFame: {
      title: 'Đại sảnh Danh vọng',
      trophyLabel: 'Cúp',
      badgeLabel: 'Huy hiệu',
      trophyUnlockedPrefix: '🏛️ Đạt cúp Đại sảnh Danh vọng!',
    },
  },
  bn: {
    particleSentenceTab: 'বাক্য গঠন',
    overview: {
      all: 'সব',
      currentView: 'বর্তমান',
      totalPrefix: 'মোট ',
      totalSuffix: 'টি',
      unitsSuffix: 'টি অধ্যায়',
      defaultSubtitle: 'সরাসরি যেতে যেকোনো কার্ডে ট্যাপ করুন।',
      closeTitle: 'বন্ধ করুন (ESC)',
      flashcardTitles: {
        hangeul: 'হাঙ্গুল ফ্ল্যাশকার্ড তালিকা',
        classroom: 'শ্রেণিকক্ষ কোরিয়ান কার্ড তালিকা',
        verb: 'ক্রিয়া রূপান্তর কার্ড তালিকা',
        particle: 'অব্যয় (조사) কার্ড তালিকা',
        particleSentence: 'বাক্য গঠন কার্ড তালিকা',
      },
      worksheetTitles: {
        jamo: 'হাঙ্গুল · বর্ণমালা ওয়ার্কশিট',
        basic: 'হাঙ্গুল · মৌলিক অক্ষর ওয়ার্কশিট',
        batchim: 'হাঙ্গুল · বাচিম ওয়ার্কশিট',
        verb: 'ক্রিয়া রূপান্তর ওয়ার্কশিট তালিকা',
        particle: 'অব্যয় ওয়ার্কশিট তালিকা',
        particleSentence: 'বাক্য গঠন ওয়ার্কশিট তালিকা',
        classroomCards: 'শ্রেণিকক্ষ · ছবিকার্ড তালিকা',
        classroomWriting: 'শ্রেণিকক্ষ · লেখা অভ্যাস তালিকা',
        classroomQuiz: 'শ্রেণিকক্ষ · শ্রুতলিপি তালিকা',
      },
      gameTitles: {
        hangeul: 'হাঙ্গুল বেলুন গেম অধ্যায়',
        classroom: 'শ্রেণিকক্ষ মেমোরি গেম অধ্যায়',
        verb: 'মান্দু রান্না গেম অধ্যায়',
        particle: 'অব্যয় গুলতি গেম (৩০টি অধ্যায়)',
      },
      particleGroupLabel: 'গুলতি গেম · ৩০টি অধ্যায়',
    },
    stickman: {
      modalTitle: 'স্টিকম্যান হাঙ্গুল',
      episodes: {
        ep1_consonants: '01. ব্যঞ্জনবর্ণ',
        ep2_vowels: '02. স্বরবর্ণ',
        ep3_double_consonants: '03. যুক্ত ব্যঞ্জন',
        ep4_compound_vowels: '04. যৌগিক স্বর',
      },
      barTitles: {
        ep1: 'ব্যঞ্জনবর্ণ (ㄱ ~ ㅎ)',
        ep2: 'স্বরবর্ণ (ㅏ ~ ㅣ)',
        ep3: 'যুক্ত ব্যঞ্জন (ㄲ ~ ㅉ)',
        ep4: 'যৌগিক স্বর (ㅐ ~ ㅢ)',
      },
      playAll: 'সব দেখুন',
      playingAll: 'চলছে',
      enterFullscreen: 'পূর্ণ স্ক্রিন',
      exitFullscreen: 'পূর্ণ স্ক্রিন বন্ধ',
      close: 'বন্ধ',
    },
    hallOfFame: {
      title: 'হল অব ফেম',
      trophyLabel: 'ট্রফি',
      badgeLabel: 'ব্যাজ',
      trophyUnlockedPrefix: '🏛️ হল অব ফেম ট্রফি অর্জিত!',
    },
  },
  zh: {
    particleSentenceTab: '造句练习',
    overview: {
      all: '全部',
      currentView: '当前',
      totalPrefix: '共 ',
      totalSuffix: '项',
      unitsSuffix: '个单元',
      defaultSubtitle: '点击卡片即可快速跳转到对应单元。',
      closeTitle: '关闭 (ESC)',
      flashcardTitles: {
        hangeul: '韩语字母闪卡总览',
        classroom: '教室韩语闪卡总览',
        verb: '动词变形闪卡总览',
        particle: '助词结合闪卡总览',
        particleSentence: '造句练习闪卡总览',
      },
      worksheetTitles: {
        jamo: '韩语 · 字母练习纸总览',
        basic: '韩语 · 基础字练习纸总览',
        batchim: '韩语 · 收音练习纸总览',
        verb: '动词变形练习纸总览',
        particle: '助词结合练习纸总览',
        particleSentence: '造句练习纸总览',
        classroomCards: '教室韩语 · 词卡总览',
        classroomWriting: '教室韩语 · 描红书写总览',
        classroomQuiz: '教室韩语 · 听写测试总览',
      },
      gameTitles: {
        hangeul: '韩语气球游戏单元总览',
        classroom: '教室韩语翻牌游戏总览',
        verb: '动词饺子料理游戏总览',
        particle: '助词弹弓游戏（30单元）',
      },
      particleGroupLabel: '弹弓游戏 · 助词30单元',
    },
    stickman: {
      modalTitle: '火柴人韩语',
      episodes: {
        ep1_consonants: '01. 辅音篇',
        ep2_vowels: '02. 元音篇',
        ep3_double_consonants: '03. 紧音篇',
        ep4_compound_vowels: '04. 复合元音篇',
      },
      barTitles: {
        ep1: '火柴人辅音 (ㄱ ~ ㅎ)',
        ep2: '火柴人元音 (ㅏ ~ ㅣ)',
        ep3: '火柴人紧音 (ㄲ ~ ㅉ)',
        ep4: '火柴人复合元音 (ㅐ ~ ㅢ)',
      },
      playAll: '全部播放',
      playingAll: '播放中',
      enterFullscreen: '全屏',
      exitFullscreen: '退出全屏',
      close: '关闭',
    },
    hallOfFame: {
      title: '荣誉殿堂',
      trophyLabel: '奖杯',
      badgeLabel: '总徽章',
      trophyUnlockedPrefix: '🏛️ 获得荣誉殿堂奖杯！',
    },
  },
  ru: {
    particleSentenceTab: 'Составление фраз',
    overview: {
      all: 'Все',
      currentView: 'Текущий',
      totalPrefix: 'Всего: ',
      totalSuffix: '',
      unitsSuffix: ' тем',
      defaultSubtitle: 'Нажмите на карточку, чтобы перейти к разделу.',
      closeTitle: 'Закрыть (ESC)',
      flashcardTitles: {
        hangeul: 'Обзор карточек Хангыля',
        classroom: 'Обзор школьных карточек',
        verb: 'Обзор карточек глаголов',
        particle: 'Обзор карточек частиц',
        particleSentence: 'Обзор карточек предложений',
      },
      worksheetTitles: {
        jamo: 'Хангыль · Прописи букв',
        basic: 'Хангыль · Базовые слоги',
        batchim: 'Хангыль · Патчим',
        verb: 'Листы спряжения глаголов',
        particle: 'Листы по частицам',
        particleSentence: 'Листы составления предложений',
        classroomCards: 'Школьный корейский · Карточки',
        classroomWriting: 'Школьный корейский · Прописи',
        classroomQuiz: 'Школьный корейский · Диктант',
      },
      gameTitles: {
        hangeul: 'Темы игры «Шарики Хангыль»',
        classroom: 'Темы игры «Мемори»',
        verb: 'Темы игры «Готовим манду»',
        particle: 'Рогатка частиц (30 тем)',
      },
      particleGroupLabel: 'Рогатка · 30 тем частиц',
    },
    stickman: {
      modalTitle: 'Стикмен Хангыль',
      episodes: {
        ep1_consonants: '01. Согласные',
        ep2_vowels: '02. Гласные',
        ep3_double_consonants: '03. Двойные согл.',
        ep4_compound_vowels: '04. Сложные гл.',
      },
      barTitles: {
        ep1: 'Согласные (ㄱ ~ ㅎ)',
        ep2: 'Гласные (ㅏ ~ ㅣ)',
        ep3: 'Двойные согласные (ㄲ ~ ㅉ)',
        ep4: 'Сложные гласные (ㅐ ~ ㅢ)',
      },
      playAll: 'Смотреть все',
      playingAll: 'Показ',
      enterFullscreen: 'На весь экран',
      exitFullscreen: 'Свернуть экран',
      close: 'Закрыть',
    },
    hallOfFame: {
      title: 'Зал славы',
      trophyLabel: 'Кубки',
      badgeLabel: 'Значки',
      trophyUnlockedPrefix: '🏛️ Получен кубок Зала славы!',
    },
  },
  ja: {
    particleSentenceTab: '文づくり',
    overview: {
      all: 'すべて',
      currentView: '表示中',
      totalPrefix: '全 ',
      totalSuffix: '件',
      unitsSuffix: '単元',
      defaultSubtitle: 'カードを選ぶとすぐにその単元へ移動します。',
      closeTitle: '閉じる (ESC)',
      flashcardTitles: {
        hangeul: 'ハングル基礎カード一覧',
        classroom: '教室韓国語カード一覧',
        verb: '用言活用カード一覧',
        particle: '助詞結合カード一覧',
        particleSentence: '文づくりカード一覧',
      },
      worksheetTitles: {
        jamo: 'ハングル・字母プリント一覧',
        basic: 'ハングル・基本文字プリント一覧',
        batchim: 'ハングル・パッチムプリント一覧',
        verb: '用言活用プリント一覧',
        particle: '助詞結合プリント一覧',
        particleSentence: '文づくりプリント一覧',
        classroomCards: '教室韓国語・絵カード一覧',
        classroomWriting: '教室韓国語・なぞり書き一覧',
        classroomQuiz: '教室韓国語・書き取り一覧',
      },
      gameTitles: {
        hangeul: 'ハングル風船ゲーム単元一覧',
        classroom: '教室韓国語カードゲーム一覧',
        verb: 'マンドゥ料理ゲーム単元一覧',
        particle: '助詞パチンコゲーム（全30単元）',
      },
      particleGroupLabel: 'パチンコゲーム · 助詞30単元',
    },
    stickman: {
      modalTitle: '棒人間ハングル',
      episodes: {
        ep1_consonants: '01. 子音編',
        ep2_vowels: '02. 母音編',
        ep3_double_consonants: '03. 濃音編',
        ep4_compound_vowels: '04. 複合母音編',
      },
      barTitles: {
        ep1: '棒人間・子音 (ㄱ ~ ㅎ)',
        ep2: '棒人間・母音 (ㅏ ~ ㅣ)',
        ep3: '棒人間・濃音 (ㄲ ~ ㅉ)',
        ep4: '棒人間・複合母音 (ㅐ ~ ㅢ)',
      },
      playAll: 'すべて再生',
      playingAll: '再生中',
      enterFullscreen: '全画面',
      exitFullscreen: '全画面終了',
      close: '閉じる',
    },
    hallOfFame: {
      title: '殿堂入り',
      trophyLabel: 'トロフィー',
      badgeLabel: 'バッジ',
      trophyUnlockedPrefix: '🏛️ 殿堂入りトロフィー獲得！',
    },
  },
  mn: {
    particleSentenceTab: 'Өгүүлбэр бүтээх',
    overview: {
      all: 'Бүгд',
      currentView: 'Одоогийн',
      totalPrefix: 'Нийт ',
      totalSuffix: '',
      unitsSuffix: ' хичээл',
      defaultSubtitle: 'Карт дээр дарж тухайн хичээл рүү шууд очно уу.',
      closeTitle: 'Хаах (ESC)',
      flashcardTitles: {
        hangeul: 'Хангыл картын жагсаалт',
        classroom: 'Ангийн солонгос үгийн карт',
        verb: 'Үйл үг хувиргах карт',
        particle: 'Нөхцөл залгах карт',
        particleSentence: 'Өгүүлбэр бүтээх карт',
      },
      worksheetTitles: {
        jamo: 'Хангыл · Үсэг дасгалын хуудас',
        basic: 'Хангыл · Үндсэн үсэг хуудас',
        batchim: 'Хангыл · Дэвсгэр үсэг хуудас',
        verb: 'Үйл үг хувиргах дасгалын хуудас',
        particle: 'Нөхцөл залгах дасгалын хуудас',
        particleSentence: 'Өгүүлбэр бүтээх дасгалын хуудас',
        classroomCards: 'Ангийн солонгос · Зурагт карт',
        classroomWriting: 'Ангийн солонгос · Дагаж бичих',
        classroomQuiz: 'Ангийн солонгос · Цээж бичиг',
      },
      gameTitles: {
        hangeul: 'Хангыл бөмбөлөг тоглоомын хичээл',
        classroom: 'Ангийн үгийн карт тоглоом',
        verb: 'Мантуу хийх тоглоомын хичээл',
        particle: 'Нөхцөлийн харвах тоглоом (30 хичээл)',
      },
      particleGroupLabel: 'Харвах тоглоом · 30 хичээл',
    },
    stickman: {
      modalTitle: 'Зураасан Хангыл',
      episodes: {
        ep1_consonants: '01. Гийгүүлэгч',
        ep2_vowels: '02. Эгшиг',
        ep3_double_consonants: '03. Давхар гийг.',
        ep4_compound_vowels: '04. Нийлмэл эгшиг',
      },
      barTitles: {
        ep1: 'Гийгүүлэгч (ㄱ ~ ㅎ)',
        ep2: 'Эгшиг (ㅏ ~ ㅣ)',
        ep3: 'Давхар гийгүүлэгч (ㄲ ~ ㅉ)',
        ep4: 'Нийлмэл эгшиг (ㅐ ~ ㅢ)',
      },
      playAll: 'Бүгдийг үзэх',
      playingAll: 'Тоглож байна',
      enterFullscreen: 'Бүтэн дэлгэц',
      exitFullscreen: 'Дэлгэц багасгах',
      close: 'Хаах',
    },
    hallOfFame: {
      title: 'Алдрын танхим',
      trophyLabel: 'Цом',
      badgeLabel: 'Тэмдэг',
      trophyUnlockedPrefix: '🏛️ Алдрын танхимын цом авлаа!',
    },
  },
};

