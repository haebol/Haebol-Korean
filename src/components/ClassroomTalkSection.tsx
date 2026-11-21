import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Maximize2, X, MessageSquare, Headphones } from 'lucide-react';
import { CLASSROOM_PHRASES, ClassroomPhrase } from '../data/sentences';
import { SupportedLanguage } from '../types';
import { speakKorean, playCutePop } from '../utils/audio';

interface ClassroomTalkSectionProps {
  lang: SupportedLanguage;
}

export const ClassroomTalkSection: React.FC<ClassroomTalkSectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<'student_talk' | 'teacher_command'>('student_talk');
  const [expandedPhrase, setExpandedPhrase] = useState<ClassroomPhrase | null>(null);

  const filteredPhrases = CLASSROOM_PHRASES.filter(p => p.category === activeCategory);

  const handleSpeak = (text: string, rate: number = 0.85) => {
    playCutePop();
    speakKorean(text, rate);
  };

  const labels = {
    en: {
      studentTab: '🙋 I Want to Say',
      teacherTab: '👂 Teacher Instructions',
      showTeacher: 'Show Large Card to Teacher',
      listenNormal: 'Normal',
      fullscreenPrompt: 'Point this screen to teacher or friends'
    },
    vi: {
      studentTab: '🙋 Em muốn nói',
      teacherTab: '👂 Lời dặn của Thầy/Cô',
      showTeacher: 'Chiếu thẻ to cho Thầy/Cô xem',
      listenNormal: 'Nghe',
      fullscreenPrompt: 'Đưa màn hình này cho thầy cô hoặc bạn bè xem'
    },
    bn: {
      studentTab: '🙋 আমি যা বলতে চাই',
      teacherTab: '👂 শিক্ষকের নির্দেশনা শুনুন',
      showTeacher: 'শিক্ষককে বড় করে দেখান',
      listenNormal: 'শুনুন',
      fullscreenPrompt: 'এই স্ক্রিনটি শিক্ষক বা বন্ধুকে দেখান'
    }
  }[lang];

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {/* Category Toggle Tabs */}
      <div className="flex rounded-2xl bg-amber-100/80 p-1.5 border border-amber-300">
        <button
          onClick={() => {
            playCutePop();
            setActiveCategory('student_talk');
          }}
          className={`flex-1 min-h-[48px] rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
            activeCategory === 'student_talk'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-5 h-5 text-emerald-600" />
          <span>{labels.studentTab}</span>
        </button>

        <button
          onClick={() => {
            playCutePop();
            setActiveCategory('teacher_command');
          }}
          className={`flex-1 min-h-[48px] rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
            activeCategory === 'teacher_command'
              ? 'bg-white text-amber-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Headphones className="w-5 h-5 text-amber-600" />
          <span>{labels.teacherTab}</span>
        </button>
      </div>

      {/* Phrases List Grid */}
      <div className="responsive-cards-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredPhrases.map(phrase => (
          <div
            key={phrase.id}
            className="bg-white rounded-2xl p-4 border-2 border-amber-200 hover:border-emerald-300 shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-3xl">{phrase.icon}</span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-full truncate">
                  {phrase.situation}
                </span>
              </div>

              <h4 className="text-xl font-extrabold text-slate-900 font-['Jua',sans-serif] leading-snug">
                "{phrase.ko}"
              </h4>
              <p className="text-sm font-medium text-emerald-700 mt-1">
                {phrase[lang]}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5">
              <button
                onClick={() => handleSpeak(phrase.ko, 0.85)}
                className="min-h-[44px] px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                title="소리 듣기"
              >
                <Volume2 className="w-4 h-4" />
                <span>{labels.listenNormal} 🔊</span>
              </button>

              {/* Big Show Button */}
              <button
                onClick={() => {
                  playCutePop();
                  setExpandedPhrase(phrase);
                  speakKorean(phrase.ko, 0.85);
                }}
                className="min-h-[44px] px-3 py-1.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-1"
                title="크게 보여주기"
              >
                <Maximize2 className="w-4 h-4 text-slate-600" />
                <span className="hidden xs:inline">크게 보기</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Show to Teacher Modal */}
      <AnimatePresence>
        {expandedPhrase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-400 flex flex-col items-center text-center relative"
            >
              <button
                onClick={() => setExpandedPhrase(null)}
                className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="text-6xl mb-3 animate-bounce">{expandedPhrase.icon}</span>

              <span className="text-xs sm:text-sm font-extrabold bg-amber-100 text-amber-900 px-3 py-1 rounded-full mb-3">
                {labels.fullscreenPrompt}
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-['Jua',sans-serif] leading-tight my-4">
                "{expandedPhrase.ko}"
              </h2>

              <p className="text-base sm:text-xl font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200 w-full mb-6">
                {expandedPhrase[lang]}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => speakKorean(expandedPhrase.ko, 0.85)}
                  className="min-h-[48px] px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold rounded-2xl shadow-md text-base sm:text-lg flex items-center gap-2"
                >
                  <Volume2 className="w-6 h-6" />
                  <span>소리 다시 듣기 🔊</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
