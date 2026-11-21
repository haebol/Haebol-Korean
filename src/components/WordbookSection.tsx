import React from 'react';
import { Volume2, Trash2, Star, BookMarked, ArrowRight } from 'lucide-react';
import { VocabularyItem, SupportedLanguage, getCircledNumber } from '../types';
import { speakKorean, playCutePop } from '../utils/audio';
import { VocabVisual } from './VocabVisual';

interface WordbookSectionProps {
  vocabulary: VocabularyItem[];
  savedWords: string[];
  onToggleSave: (ko: string) => void;
  lang: SupportedLanguage;
  onGoToFlashcards: () => void;
}

export const WordbookSection: React.FC<WordbookSectionProps> = ({
  vocabulary,
  savedWords,
  onToggleSave,
  lang,
  onGoToFlashcards
}) => {
  const savedItems = vocabulary.filter(v => savedWords.includes(v.ko));

  const handleSpeak = (text: string, rate: number = 0.85) => {
    playCutePop();
    speakKorean(text, rate);
  };

  const labels = {
    en: {
      title: 'My Saved Words',
      count: 'words',
      empty: 'No saved words yet!',
      emptySub: 'Tap the star icon (⭐) on flashcards to save words you want to practice.',
      goCards: 'Go to Flashcards',
      remove: 'Remove'
    },
    vi: {
      title: 'Sổ Từ Của Em',
      count: 'từ',
      empty: 'Chưa có từ nào được lưu!',
      emptySub: 'Chạm vào biểu tượng ngôi sao (⭐) trên thẻ để lưu từ em muốn ôn tập nhé.',
      goCards: 'Đến Thẻ Từ Vựng',
      remove: 'Xóa'
    },
    bn: {
      title: 'আমার সংরক্ষিত শব্দ',
      count: 'টি শব্দ',
      empty: 'এখনও কোনো শব্দ সংরক্ষণ করা হয়নি!',
      emptySub: 'যে শব্দগুলো চর্চা করতে চান, সেগুলোর ওপরের তারকা (⭐) স্পর্শ করুন।',
      goCards: 'শব্দকার্ডে যান',
      remove: 'মুছে ফেলুন'
    }
  }[lang];

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl p-4 shadow-sm border-2 border-amber-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-xl text-amber-800">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800 font-['Jua',sans-serif]">
              {labels.title}
            </h3>
            <p className="text-xs text-slate-500">
              {savedItems.length} {labels.count}
            </p>
          </div>
        </div>

        {savedItems.length > 0 && (
          <button
            onClick={onGoToFlashcards}
            className="min-h-[44px] px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-300"
          >
            <span>{labels.goCards}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {savedItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border-2 border-dashed border-amber-300 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-3xl mb-3 text-amber-600">
            ⭐
          </div>
          <h4 className="text-xl font-extrabold text-slate-800 font-['Jua',sans-serif] mb-1">
            {labels.empty}
          </h4>
          <p className="text-sm text-slate-500 max-w-sm mb-5">
            {labels.emptySub}
          </p>
          <button
            onClick={onGoToFlashcards}
            className="min-h-[48px] px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold rounded-2xl shadow-md flex items-center gap-2"
          >
            <span>{labels.goCards}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="responsive-cards-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
          {savedItems.map(item => (
            <div
              key={item.ko}
              className="bg-white rounded-2xl p-3.5 border-2 border-amber-200 hover:border-emerald-400 shadow-sm transition-all flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <VocabVisual item={item} size="md" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-slate-900 font-['Jua',sans-serif] truncate">
                      {item.ko}
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold flex-shrink-0">
                      {getCircledNumber(item.ch)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-700 truncate">
                    {item[lang]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handleSpeak(item.ko, 0.85)}
                  className="w-11 h-11 rounded-xl bg-emerald-100 hover:bg-emerald-200 active:scale-95 text-emerald-900 flex items-center justify-center"
                  title="듣기"
                  aria-label={`${item.ko} 발음 듣기`}
                >
                  <Volume2 className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    playCutePop();
                    onToggleSave(item.ko);
                  }}
                  className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-400 flex items-center justify-center transition-colors"
                  title={labels.remove}
                  aria-label={`${item.ko} 단어장에서 삭제`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
