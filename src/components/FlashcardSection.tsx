import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  RotateCw,
  Star,
  Globe,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  BookOpen,
  Shuffle,
  VolumeX,
  ChevronDown,
  Check,
  X,
  LayoutGrid
} from 'lucide-react';
import { VocabularyItem, SupportedLanguage, getLanguageMeta } from '../types';
import { UiLanguage, UI_LANGUAGES, FLASHCARD_COMMON_UI, HEADER_UI, NAV_UI, SUBTAB_UI } from '../i18n/uiTranslations';
import { CHAPTER_LIST, getChapterCircledTitle } from '../data/vocabulary';
import { speakKorean, playCutePop, playSuccessChime } from '../utils/audio';
import { VocabVisual } from './VocabVisual';
import { CompactUnitSelectButton } from './CompactUnitSelectButton';

interface FlashcardSectionProps {
  vocabulary: VocabularyItem[];
  lang: SupportedLanguage;
  uiLang?: UiLanguage;
  savedWords: string[];
  onToggleSave: (ko: string) => void;
  initialChapter?: number;
  selectedChapter?: number;
  onSelectChapter?: (ch: number) => void;
  onLanguageChange?: (lang: UiLanguage) => void;
  onOpenOverview?: () => void;
  hideDesktopUnitBar?: boolean;
  isMenuCollapsed?: boolean;
}

export const FlashcardSection: React.FC<FlashcardSectionProps> = ({
  vocabulary,
  lang,
  uiLang = 'ko',
  savedWords,
  onToggleSave,
  initialChapter = 1,
  selectedChapter: propSelectedChapter,
  onSelectChapter,
  onLanguageChange,
  onOpenOverview,
  hideDesktopUnitBar = false,
  isMenuCollapsed = false,
}) => {
  const [internalChapter, setInternalChapter] = useState<number>(initialChapter);
  const selectedChapter = propSelectedChapter !== undefined ? propSelectedChapter : internalChapter;

  const handleSelectChapter = (ch: number) => {
    setInternalChapter(ch);
    onSelectChapter?.(ch);
    setSearchQuery('');
    setCurrentIndex(0);
    setIsExpanded(false);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [autoPronounce, setAutoPronounce] = useState(true);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // Filter items based on selected chapter or search
  const filteredList = useMemo(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return vocabulary.filter(
        item =>
          item.ko.includes(q) ||
          item.en.toLowerCase().includes(q) ||
          item.vi.toLowerCase().includes(q) ||
          item.bn.toLowerCase().includes(q) ||
          (item.zh && item.zh.includes(q)) ||
          (item.ru && item.ru.toLowerCase().includes(q)) ||
          (item.ja && item.ja.includes(q)) ||
          (item.mn && item.mn.toLowerCase().includes(q))
      );
    }
    return vocabulary.filter(item => item.ch === selectedChapter);
  }, [vocabulary, selectedChapter, searchQuery]);

  const currentItem = filteredList[currentIndex] || filteredList[0];

  // Immediately play current word sound when entering '공부하기' or switching chapters (풍선게임처럼)
  useEffect(() => {
    setCurrentIndex(0);
    setIsExpanded(false);
    setSearchQuery('');
    const firstOfChapter = vocabulary.find(item => item.ch === selectedChapter);
    if (firstOfChapter?.ko) {
      const timer = setTimeout(() => {
        speakKorean(firstOfChapter.ko, 0.85);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [selectedChapter]);

  const handleNext = () => {
    playCutePop();
    setIsExpanded(false);
    const nextIdx = currentIndex < filteredList.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(nextIdx);
    if (filteredList[nextIdx]) {
      setTimeout(() => {
        speakKorean(filteredList[nextIdx].ko, 0.85);
      }, 150);
    }
  };

  const handlePrev = () => {
    playCutePop();
    setIsExpanded(false);
    const prevIdx = currentIndex > 0 ? currentIndex - 1 : filteredList.length - 1;
    setCurrentIndex(prevIdx);
    if (filteredList[prevIdx]) {
      setTimeout(() => {
        speakKorean(filteredList[prevIdx].ko, 0.85);
      }, 150);
    }
  };

  const handlePrevUnit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playCutePop();
    const curIdx = CHAPTER_LIST.findIndex((c) => c.ch === selectedChapter);
    const prevIdx = curIdx > 0 ? curIdx - 1 : CHAPTER_LIST.length - 1;
    handleSelectChapter(CHAPTER_LIST[prevIdx].ch);
  };

  const handleNextUnit = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playCutePop();
    const curIdx = CHAPTER_LIST.findIndex((c) => c.ch === selectedChapter);
    const nextIdx = curIdx < CHAPTER_LIST.length - 1 ? curIdx + 1 : 0;
    handleSelectChapter(CHAPTER_LIST[nextIdx].ch);
  };

  const handleSpeak = (text: string, rate: number = 0.85) => {
    playCutePop();
    speakKorean(text, rate);
  };

  const handleToggleExpand = () => {
    playCutePop();
    if (isExpanded) {
      speakKorean(currentItem.ko, 0.85);
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  const isCurrentSaved = currentItem ? savedWords.includes(currentItem.ko) : false;

  const currentMeaning = currentItem ? (currentItem as any)[lang] || currentItem.en : '';

  const labelsDict: Record<SupportedLanguage | 'ko', {
    chapterSelect: string;
    searchPlaceholder: string;
    flipHint: string;
    normalAudio: string;
    example: string;
    save: string;
    saved: string;
    gameTitle: string;
    cardHint: string;
    pageLabel: string;
  }> = {
    ko: {
      chapterSelect: '단원 선택',
      searchPlaceholder: '단어 검색...',
      flipHint: '카드를 클릭하면 뜻이 보여요',
      normalAudio: '듣기',
      example: '학교 생활 예문',
      save: '단어장에 저장',
      saved: '저장됨',
      gameTitle: '🎴 낱말 카드 공부하기',
      cardHint: '카드를 클릭하면 뜻이 보여요 💡',
      pageLabel: '카드',
    },
    en: {
      chapterSelect: 'Choose Chapter',
      searchPlaceholder: 'Search words in any language...',
      flipHint: 'Tap card to flip meaning',
      normalAudio: 'Listen',
      example: 'School Example',
      save: 'Save to My Wordbook',
      saved: 'Saved',
      gameTitle: '🎴 Korean Flashcard Study',
      cardHint: 'Click or tap the card to see its meaning 💡',
      pageLabel: 'Cards',
    },
    vi: {
      chapterSelect: 'Chọn Bài Học',
      searchPlaceholder: 'Tìm kiếm từ vựng (tiếng Hàn hoặc tiếng mẹ đẻ)...',
      flipHint: 'Chạm thẻ để lật xem nghĩa',
      normalAudio: 'Nghe phát âm',
      example: 'Ví dụ trong lớp học',
      save: 'Lưu vào sổ từ',
      saved: 'Đã lưu',
      gameTitle: '🎴 Thẻ Học Từ Vựng',
      cardHint: 'Chạm vào thẻ để xem nghĩa nhé 💡',
      pageLabel: 'Thẻ',
    },
    bn: {
      chapterSelect: 'অধ্যায় নির্বাচন করুন',
      searchPlaceholder: 'কোরিয়ান বা মাতৃভাষায় শব্দ খুঁজুন...',
      flipHint: 'অর্থ দেখতে কার্ডটি স্পর্শ করুন',
      normalAudio: 'উচ্চারণ শুনুন',
      example: 'বিদ্যালয়ের উদাহরণ',
      save: 'শব্দকোষে রাখুন',
      saved: 'সংরক্ষিত',
      gameTitle: '🎴 শব্দ শেখার ফ্ল্যাশকার্ড',
      cardHint: 'অর্থ দেখতে কার্ডে ক্লিক করুন 💡',
      pageLabel: 'কার্ড',
    },
    zh: {
      chapterSelect: '选择课程',
      searchPlaceholder: '搜索韩语或母语词汇...',
      flipHint: '点击卡片翻转查看释义',
      normalAudio: '听发音',
      example: '学校生活例句',
      save: '加入我的生词本',
      saved: '已保存',
      gameTitle: '🎴 单词卡片自主学习',
      cardHint: '点击卡片即可查看中文释义 💡',
      pageLabel: '张',
    },
    ru: {
      chapterSelect: 'Выбрать главу',
      searchPlaceholder: 'Поиск слов на корейском или родном языке...',
      flipHint: 'Нажмите, чтобы перевернуть карточку',
      normalAudio: 'Слушать',
      example: 'Пример в школе',
      save: 'В мой словарик',
      saved: 'Сохранено',
      gameTitle: '🎴 Карточки со словами',
      cardHint: 'Нажмите на карточку, чтобы увидеть значение 💡',
      pageLabel: 'карт',
    },
    ja: {
      chapterSelect: 'チャプター選択',
      searchPlaceholder: '韓国語または母国語で単語検索...',
      flipHint: 'タップして意味を表示',
      normalAudio: '発音を聞く',
      example: '学校での例文',
      save: '単語帳に保存',
      saved: '保存済み',
      gameTitle: '🎴 単語フラッシュカード学習',
      cardHint: 'カードをクリックすると意味が表示されます 💡',
      pageLabel: '枚',
    },
    mn: {
      chapterSelect: 'Хичээл сонгох',
      searchPlaceholder: 'Солонгос эсвэл төрөлх хэлээр хайх...',
      flipHint: 'Картыг дарж утгыг харах',
      normalAudio: 'Сонсох',
      example: 'Сургуулийн жишээ өгүүлбэр',
      save: 'Үгийн дэвтэрт хадгалах',
      saved: 'Хадгалсан',
      gameTitle: '🎴 Үгийн флаш карт сурах',
      cardHint: 'Карт дээр дарж утгыг нь хараарай 💡',
      pageLabel: 'карт',
    }
  };

  const labels = labelsDict[uiLang] || labelsDict.ko;
  const commonUi = FLASHCARD_COMMON_UI[uiLang] || FLASHCARD_COMMON_UI.ko;
  const headerUi = HEADER_UI[uiLang] || HEADER_UI.ko;
  const navUi = NAV_UI[uiLang] || NAV_UI.ko;
  const subUi = SUBTAB_UI[uiLang] || SUBTAB_UI.ko;

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-1 sm:px-2 space-y-1 sm:space-y-1.5 font-korean-gothic no-print">
        {/* Row 5 Top Bar (Mobile Only when desktop control bar is active): 소제목(교실어휘) + [1x1 단원드롭] [1x1 그리드] */}
        {!isMenuCollapsed && (
          <div className={`${hideDesktopUnitBar ? 'lg:hidden' : ''} sticky top-[80px] sm:top-[90px] lg:static z-[28] bg-[#FFF5F8]/95 backdrop-blur-md pb-1 mb-1.5 border-b border-rose-200/80 no-print w-full max-w-3xl mx-auto px-2.5 sm:px-4 select-none`}>
          <div className="flex items-center justify-between gap-2 h-[38px] sm:h-[42px]">
            <div className="flex items-center gap-3.5 sm:gap-6 min-w-0 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => playCutePop()}
                className="relative py-1.5 px-1 bg-transparent border-0 cursor-pointer flex items-center gap-1 whitespace-nowrap text-[13px] sm:text-[14.5px] text-rose-950 font-black after:content-[''] after:absolute after:bottom-0 after:left-0.5 after:right-0.5 after:h-[2.5px] after:bg-rose-600"
                title={subUi.flashcardTabs.classroomVocab}
              >
                <span>{subUi.flashcardTabs.classroomVocab}</span>
              </button>
            </div>

            <div className="flex items-center gap-1 shrink-0 min-w-0">
              <CompactUnitSelectButton
                value={selectedChapter}
                onChange={(val) => handleSelectChapter(Number(val))}
                options={CHAPTER_LIST.map((ch) => ({
                  value: ch.ch,
                  label: getChapterCircledTitle(ch.ch, lang),
                }))}
                theme="rose"
                title={subUi.studyControls.unitSelectTitle}
                ariaLabel={subUi.studyControls.unitSelectTitle}
                align="right"
                className="w-[155px] xs:w-[195px] sm:w-[270px]"
              />
              {onOpenOverview && (
                <button
                  type="button"
                  onClick={() => {
                    playCutePop();
                    onOpenOverview();
                  }}
                  className="h-8 sm:h-8.5 w-8 sm:w-8.5 rounded-none bg-rose-100 hover:bg-rose-200 text-rose-950 border border-rose-300 cursor-pointer shrink-0 flex items-center justify-center transition-colors"
                  title={navUi.overviewBtn}
                  aria-label={navUi.overviewBtn}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                </button>
              )}
            </div>
          </div>
          </div>
        )}

      {/* Main Flashcard Display Area */}
      {filteredList.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center border-2 border-dashed border-rose-300">
          <p className="text-4xl mb-2">🔍</p>
          <p className="text-base font-bold text-slate-700">검색 결과가 없습니다.</p>
        </div>
      ) : (
        /* Main Flashcard Container: 조사·용언 플래시카드와 동일 규격 */
        <div className="w-full max-w-full sm:max-w-3xl flex justify-center px-1 sm:px-4 font-korean-gothic mx-auto">
          <div className="w-full">
            <div
              onClick={handleToggleExpand}
              className="relative min-h-[400px] sm:min-h-[460px] w-full rounded-lg pt-3 sm:pt-5 px-3 sm:px-6 pb-2 sm:pb-5 shadow-lg border-2 sm:border-4 border-pink-300 flex flex-col justify-between transition-all hover:shadow-xl bg-gradient-to-b from-pink-50 via-[#FFF4F7] to-rose-50/70 select-none cursor-pointer overflow-hidden"
            >
              {/* Top-Left Meaning Badge */}
              <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-pink-100/90 border border-pink-200 text-rose-700 text-[11px] sm:text-xs font-black pointer-events-none shadow-xs">
                <span>{commonUi.meaningHint}</span>
              </div>

              {/* Top-Right: Globe Language Selector Button (내 언어로 이용하기) */}
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    playCutePop();
                    setIsLangModalOpen(true);
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-white/85 hover:bg-purple-100 text-purple-900 border border-purple-200 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                  aria-label={headerUi.myLangTitle}
                  title={headerUi.myLangTitle}
                >
                  <Globe className="w-5 h-5 text-[#441A75]" />
                </button>
              </div>

              {/* Card Center Content: 일러스트 · 단어 · 로마자 · 예문 크기·상하위치 조사 플카와 일치 */}
              <div className="flex flex-col items-center justify-start sm:justify-center flex-1 text-center pt-14 sm:pt-4 sm:my-auto w-full relative z-10">
                {/* 1. Illustration */}
                <div className="mb-3 sm:mb-4 flex items-center justify-center">
                  <div className="w-22 h-22 sm:w-26 sm:h-26 flex items-center justify-center drop-shadow-xs">
                    <VocabVisual item={currentItem} size="card" />
                  </div>
                </div>

                {/* 2. Word Slot */}
                <div className="w-full flex items-center justify-center min-h-[92px] my-2 sm:my-3 px-12 sm:px-16">
                  <h3
                    style={{
                      fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                      fontWeight: 900,
                      WebkitTextStroke: '0.6px currentColor'
                    }}
                    className="text-4xl sm:text-5xl font-black text-slate-900 tracking-normal leading-tight font-badasseugi"
                  >
                    {currentItem.ko}
                  </h3>
                </div>

                {/* 탭 전: 로마자 + 예문 표시 / 탭 후: 고정 높이 슬롯 안에서 흔들림 없이 모국어 뜻으로 전환 */}
                <div className="relative w-full max-w-md h-[126px] sm:h-[138px] mt-2 sm:mt-3 flex items-center justify-center">
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        key="meaning-box"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div className="w-full bg-white/98 rounded-md px-4 py-3 sm:py-4 border-2 border-pink-300 shadow-lg min-h-[84px] sm:min-h-[96px] flex items-center justify-center text-center">
                          <h4
                            style={{
                              fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교알림받아쓰기', sans-serif !important",
                              fontWeight: 800
                            }}
                            className={`text-2xl sm:text-3xl font-extrabold text-rose-900 leading-tight font-badasseugi text-center w-full ${getLanguageMeta(lang).fontClass || ''}`}
                          >
                            {(currentItem as any)[lang] || currentMeaning}
                          </h4>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="romaja-example-box"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-3 w-full"
                      >
                        {currentItem.romaja && (
                          <div className="px-3.5 py-0.5 bg-pink-100/80 text-rose-950 text-sm sm:text-base font-bold rounded-sm border border-pink-200 shadow-xs tracking-wide">
                            [{currentItem.romaja}]
                          </div>
                        )}

                        {currentItem.samplePhrase && (
                          <div className="px-4 py-2 bg-white/95 rounded-md border border-pink-200 shadow-sm w-full relative z-10 text-center">
                            <p
                              style={{
                                fontFamily: "'Hakgyoansim Badasseugi', '학교안심 받아쓰기', '학교안심받아쓰기', 'HakgyoansimBadasseugiTTF-L', 'Hakgyoansim Badasseugi TTF L', '학교알림받아쓰기', 'KyoboHand', cursive, sans-serif",
                                fontWeight: 600
                              }}
                              className="text-sm sm:text-base font-bold text-slate-800 leading-snug font-badasseugi"
                            >
                              "{currentItem.samplePhrase}"
                            </p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 왼쪽 이전 (<) + 이전단원 (<<) 버튼 */}
              <div className="absolute left-1.5 sm:left-3 top-18 sm:top-24 z-[15] flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="h-20 sm:h-24 w-12 sm:w-15 rounded-md bg-transparent hover:bg-pink-500/10 active:scale-95 border-2 border-pink-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-pink-400"
                  title={commonUi.prevCard}
                  aria-label={commonUi.prevCard}
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" />
                </button>
                <button
                  type="button"
                  onClick={handlePrevUnit}
                  className="h-10 sm:h-12 w-12 sm:w-15 rounded-md bg-transparent hover:bg-pink-500/10 active:scale-95 border-2 border-pink-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-pink-400"
                  title={commonUi.prevUnit}
                  aria-label={commonUi.prevUnit}
                >
                  <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                </button>
              </div>

              {/* 오른쪽 다음 (>) + 다음단원 (>>) 버튼 */}
              <div className="absolute right-1.5 sm:right-3 top-18 sm:top-24 z-[15] flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="h-20 sm:h-24 w-12 sm:w-15 rounded-md bg-transparent hover:bg-rose-500/10 active:scale-95 border-2 border-rose-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-rose-400"
                  title={commonUi.nextCard}
                  aria-label={commonUi.nextCard}
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-rose-600" />
                </button>
                <button
                  type="button"
                  onClick={handleNextUnit}
                  className="h-10 sm:h-12 w-12 sm:w-15 rounded-md bg-transparent hover:bg-rose-500/10 active:scale-95 border-2 border-rose-300/80 shadow-none flex items-center justify-center text-slate-800 cursor-pointer transition-all hover:border-rose-400"
                  title={commonUi.nextUnit}
                  aria-label={commonUi.nextUnit}
                >
                  <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Language Selection Modal Dialog ('내 언어로 이용하기') */}
      <AnimatePresence>
        {isLangModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-korean-gothic"
            onClick={() => setIsLangModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-2xl border-2 border-purple-300 w-full max-w-sm overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-700 to-indigo-700 px-5 py-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-200" />
                  <h3 className="font-black text-base sm:text-lg">{headerUi.myLangTitle}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLangModalOpen(false)}
                  className="w-8 h-8 rounded-md bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title={commonUi.closeBtn}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3.5 space-y-1 max-h-[360px] overflow-y-auto">
                <div className="px-2 py-1 text-[11px] font-bold text-slate-500 mb-1 flex items-center justify-between">
                  <span>{headerUi.dropdownHeader}</span>
                  <span className="text-purple-600 font-semibold">{headerUi.langCountBadge}</span>
                </div>
                {UI_LANGUAGES.map(item => {
                  const isSelected = item.code === uiLang;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => {
                        playCutePop();
                        onLanguageChange?.(item.code);
                        setIsLangModalOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-md flex items-center justify-between transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-purple-100/90 text-purple-950 font-black border border-purple-300 shadow-xs'
                          : 'hover:bg-purple-50/80 text-slate-700 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl leading-none">{item.flag}</span>
                        <div>
                          <div className="text-sm font-black leading-tight">{item.fullName}</div>
                          <div className="text-[11px] text-slate-500 font-medium">{item.nativeName}</div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-sm bg-purple-600 text-white flex items-center justify-center">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="px-5 py-3 bg-purple-50/70 border-t border-purple-100 text-center">
                <p className="text-[11px] font-bold text-purple-900">
                  {headerUi.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
