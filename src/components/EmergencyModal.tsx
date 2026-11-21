import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, X, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { EmergencyCardData, SupportedLanguage } from '../types';
import { speakKorean, playCutePop, playEmergencyAlert } from '../utils/audio';

interface EmergencyModalProps {
  card: EmergencyCardData | null;
  onClose: () => void;
  lang: SupportedLanguage;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ card, onClose, lang }) => {
  const [activeSubOption, setActiveSubOption] = useState<string | null>(null);
  const [teacherReply, setTeacherReply] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.85);

  if (!card) return null;

  const currentSentence = activeSubOption || card.mainSentenceKo;
  const currentTranslation = activeSubOption
    ? card.subOptions?.find(s => s.ko === activeSubOption)?.translations[lang] || card.translations[lang]
    : card.translations[lang];

  const handlePlayVoice = (text: string, rate: number = 0.85) => {
    playCutePop();
    setSpeechRate(rate);
    speakKorean(text, rate);
  };

  const handleSelectSub = (subKo: string) => {
    setActiveSubOption(subKo);
    handlePlayVoice(subKo, speechRate);
  };

  const handleTeacherReplySelect = (replyKo: string) => {
    setTeacherReply(replyKo);
    playEmergencyAlert();
    speakKorean(replyKo, 0.9);
  };

  const labelsDict: Record<SupportedLanguage, {
    teacherTitle: string;
    playNormal: string;
    subDetails: string;
    teacherSays: string;
    close: string;
  }> = {
    en: {
      teacherTitle: 'Show this card to your teacher',
      playNormal: 'Listen',
      subDetails: 'Tell more detail:',
      teacherSays: "Teacher's Response:",
      close: 'Close'
    },
    vi: {
      teacherTitle: 'Đưa thẻ này cho Thầy/Cô giáo xem',
      playNormal: 'Nghe phát âm',
      subDetails: 'Nói chi tiết hơn:',
      teacherSays: 'Thầy/Cô trả lời:',
      close: 'Đóng'
    },
    bn: {
      teacherTitle: 'শিক্ষককে এই কার্ডটি দেখান',
      playNormal: 'শুনুন',
      subDetails: 'বিস্তারিত বলুন:',
      teacherSays: 'শিক্ষকের উত্তর:',
      close: 'বন্ধ করুন'
    },
    zh: {
      teacherTitle: '把这张卡片给老师看',
      playNormal: '听发音',
      subDetails: '补充详细说明:',
      teacherSays: '老师的回答:',
      close: '关闭'
    },
    ru: {
      teacherTitle: 'Покажите эту карточку учителю',
      playNormal: 'Слушать',
      subDetails: 'Уточнить подробнее:',
      teacherSays: 'Ответ учителя:',
      close: 'Закрыть'
    },
    ja: {
      teacherTitle: 'このカードを先生に見せましょう',
      playNormal: '発音を聞く',
      subDetails: '詳しい内容を伝える:',
      teacherSays: '先生のお返事:',
      close: '閉じる'
    },
    mn: {
      teacherTitle: 'Энэ картыг багшдаа үзүүлээрэй',
      playNormal: 'Сонсох',
      subDetails: 'Дэлгэрэнгүй хэлэх:',
      teacherSays: 'Багшийн хариулт:',
      close: 'Хаах'
    }
  };

  const labels = labelsDict[lang] || labelsDict.en;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-lg shadow-2xl border-4 border-amber-300 p-4 sm:p-6 flex flex-col"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <span className="text-3xl sm:text-4xl animate-bounce">{card.icon}</span>
            <div>
              <span className="px-2.5 py-0.5 text-xs sm:text-sm font-bold bg-amber-100 text-amber-800 rounded-sm">
                {labels.teacherTitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-korean-gothic">
                선생님께 말씀드려요
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors focus:outline-none"
            aria-label="닫기"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Main High-Contrast Giant Message Box (Designed for Teacher to read from a distance) */}
        <div className="mt-4 p-5 sm:p-7 rounded-md bg-[#FFFDF0] border-3 border-amber-400 shadow-inner flex flex-col items-center text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug font-korean-gothic">
            "{currentSentence}"
          </p>

          {/* Subtitle Translation for Student and Teacher */}
          <p className="mt-3 text-base sm:text-xl font-medium text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-sm border border-emerald-200">
            {currentTranslation}
          </p>

          {/* Audio Playback Button */}
          <div className="flex items-center justify-center mt-5">
            <button
              onClick={() => handlePlayVoice(currentSentence, 0.85)}
              className="min-h-[48px] px-6 py-2.5 rounded-md bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold flex items-center gap-2 shadow-md transition-all text-base sm:text-lg cursor-pointer"
            >
              <Volume2 className="w-6 h-6" />
              <span>{labels.playNormal} 🔊</span>
            </button>
          </div>
        </div>

        {/* Detail Options (Sub-options for precision) */}
        {card.subOptions && card.subOptions.length > 0 && (
          <div className="mt-4">
            <p className="text-xs sm:text-sm font-bold text-slate-500 mb-2">
              💡 {labels.subDetails}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {card.subOptions.map((sub, idx) => {
                const isSelected = activeSubOption === sub.ko;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectSub(sub.ko)}
                    className={`min-h-[48px] p-3 text-left rounded-md border-2 transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-slate-900 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-amber-300 text-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{sub.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm sm:text-base leading-snug">{sub.ko}</p>
                      <p className="text-xs text-slate-500">{sub.translations[lang]}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Teacher Quick Interactive Response Area */}
        <div className="mt-5 p-3.5 bg-sky-50 rounded-md border border-sky-200">
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-sky-600" />
            <span className="text-xs sm:text-sm font-bold text-sky-800">
              👩‍🏫 {labels.teacherSays}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {card.teacherResponses.map((reply, idx) => {
              const isSelected = teacherReply === reply.ko;
              return (
                <button
                  key={idx}
                  onClick={() => handleTeacherReplySelect(reply.ko)}
                  className={`min-h-[48px] p-2.5 rounded-md border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold'
                      : 'bg-white border-sky-100 hover:border-sky-300 text-slate-800'
                  }`}
                >
                  <p className="text-sm font-bold leading-snug">{reply.ko}</p>
                  <p className="text-xs text-slate-500 mt-1">{reply.translations[lang]}</p>
                </button>
              );
            })}
          </div>

          {teacherReply && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-2.5 bg-emerald-50 rounded-md border border-emerald-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-bold text-emerald-900">
                  선생님 답변: "{teacherReply}"
                </span>
              </div>
              <button
                onClick={() => speakKorean(teacherReply, 0.9)}
                className="px-2.5 py-1 text-xs bg-emerald-600 text-white rounded-sm font-bold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> 소리 듣기
              </button>
            </motion.div>
          )}
        </div>

        {/* Bottom Button */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="min-h-[48px] px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-md font-bold transition-transform active:scale-95"
          >
            {labels.close}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
