/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import {
  SupportedLanguage,
  EmergencyCardData,
  LearningTrack,
  LearningMethod,
} from './types';
import { UiLanguage, HEADER_UI } from './i18n/uiTranslations';
import { VOCABULARY_DATA } from './data/vocabulary';
import { HeaderAndEmergencyBar } from './components/HeaderAndEmergencyBar';
import { EmergencyModal } from './components/EmergencyModal';
import { StudySection } from './components/StudySection';
import { StudyTabSection } from './components/StudyTabSection';
import { HANGEUL_GROUPS } from './components/HangeulStrokeFlashcardSection';
import { VerbUnitType } from './components/VerbConjugationSection';
import { PARTICLE_UNIT_META, ParticleUnitId } from './data/particleWorksheetData';
import { GamesSection, ParticleGameUnitId } from './components/GamesSection';
import { RealtimeVoiceModal } from './components/RealtimeVoiceModal';
import { MainLearningNav } from './components/MainLearningNav';
import { TeacherAdminStudioModal } from './components/TeacherAdminStudioModal';
import { StickmanBonusModal } from './components/StickmanBonusModal';
import { VERB_UNIT_META } from './components/VerbConjugationSection';

export default function App() {
  const [uiLang, setUiLang] = useState<UiLanguage>('ko');
  const [translationLang, setTranslationLang] = useState<SupportedLanguage>('en');
  const currentLang = translationLang;

  const handleUiLanguageChange = (nextLang: UiLanguage) => {
    setUiLang(nextLang);
    if (nextLang !== 'ko') {
      setTranslationLang(nextLang);
    }
  };
  // 홈페이지 최초 진입 시: [용언 > 플래시카드 > 용언활용 1단원] 바로 표시
  const [activeTrack, setActiveTrack] = useState<LearningTrack>('verb');
  const [activeMethod, setActiveMethod] = useState<LearningMethod>('flashcard');

  const [selectedHangeulGroupId, setSelectedHangeulGroupId] = useState<string>(
    HANGEUL_GROUPS[0]?.id || 'basic_consonants'
  );
  const [selectedVerbUnit, setSelectedVerbUnit] = useState<VerbUnitType>('unit1');
  const [selectedParticleUnit, setSelectedParticleUnit] = useState<ParticleUnitId>('unit1');
  const [selectedParticleGameUnit, setSelectedParticleGameUnit] = useState<ParticleGameUnitId>('unit1');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [activeEmergencyCard, setActiveEmergencyCard] = useState<EmergencyCardData | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isTeacherAdminOpen, setIsTeacherAdminOpen] = useState(false);
  const [isTeacherAuthed, setIsTeacherAuthed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('haebol_teacher_authed') === '1';
    } catch {
      return false;
    }
  });
  const [isStickmanModalOpen, setIsStickmanModalOpen] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [savedWords, setSavedWords] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('haebol_saved_words');
      return stored ? JSON.parse(stored) : ['화장실', '물', '도와주세요', '선생님'];
    } catch {
      return ['화장실', '물', '도와주세요', '선생님'];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('haebol_saved_words', JSON.stringify(savedWords));
    } catch {
      // Ignore localStorage quota errors
    }
  }, [savedWords]);

  // Esc key restores collapsed menu bars
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuCollapsed) {
        setIsMenuCollapsed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuCollapsed]);

  const handleToggleSave = (ko: string) => {
    setSavedWords(prev =>
      prev.includes(ko) ? prev.filter(w => w !== ko) : [...prev, ko]
    );
  };

  const headerUi = HEADER_UI[uiLang] || HEADER_UI.ko;
  const selectedVerbUnitIndex = VERB_UNIT_META.findIndex(u => u.id === selectedVerbUnit);
  const selectedParticleUnitIndex = PARTICLE_UNIT_META.findIndex(u => u.id === selectedParticleUnit);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5F8] text-slate-800 font-sans">
      {/* 1. Layer 1 Main Header Bar (Hidden when collapsed) */}
      {!isMenuCollapsed && (
        <HeaderAndEmergencyBar
          currentLang={currentLang}
          uiLang={uiLang}
          activeTrack={activeTrack}
          onSelectTrack={setActiveTrack}
          onLanguageChange={handleUiLanguageChange}
          onSelectEmergencyCard={setActiveEmergencyCard}
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          onOpenStickmanBonus={() => setIsStickmanModalOpen(true)}
          onOpenTeacherAdmin={() => setIsTeacherAdminOpen(true)}
          onGoHome={() => {
            setActiveTrack('verb');
            setActiveMethod('flashcard');
            setSelectedVerbUnit('unit1');
            setSelectedParticleUnit('unit1');
            setSelectedParticleGameUnit('unit1');
            setSelectedChapter(1);
          }}
          isMenuCollapsed={isMenuCollapsed}
          onToggleMenuCollapse={() => setIsMenuCollapsed(prev => !prev)}
        />
      )}

      {/* Floating Restore Button when Menu Bars are Collapsed ('메뉴 펼치기') */}
      {isMenuCollapsed && (
        <button
          type="button"
          onClick={() => setIsMenuCollapsed(false)}
          className="fixed top-2.5 right-3 z-[60] no-print px-3 py-1.5 rounded-md bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 shadow-lg flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-colors"
          title={`${headerUi.expandMenu} (ESC)`}
          aria-label={headerUi.expandMenu}
        >
          <ChevronDown className="w-3.5 h-3.5" />
          <span>{headerUi.expandMenu}</span>
        </button>
      )}

      {/* Main Content Workspace */}
      <main className={`flex-1 w-full flex flex-col ${isMenuCollapsed ? 'py-1 sm:py-2' : 'pt-0 pb-2 sm:pb-4'}`}>
        <div className="w-full flex flex-col gap-0">
          {/* Mobile Track & Mode Nav (< lg only) */}
          {!isMenuCollapsed && (
            <MainLearningNav
              activeTrack={activeTrack}
              onSelectTrack={setActiveTrack}
              activeMethod={activeMethod}
              onSelectMethod={setActiveMethod}
              currentLang={uiLang}
              onOpenStickmanBonus={() => setIsStickmanModalOpen(true)}
            />
          )}

          {/* Method 1: 플래시카드 (한글 / 교실한국어 / 용언 / 조사) */}
          {activeMethod === 'flashcard' && (
            <StudyTabSection
              activeTrack={activeTrack}
              vocabulary={VOCABULARY_DATA}
              lang={currentLang}
              uiLang={uiLang}
              savedWords={savedWords}
              onToggleSave={handleToggleSave}
              selectedChapter={selectedChapter}
              onSelectChapter={setSelectedChapter}
              selectedHangeulGroupId={selectedHangeulGroupId}
              onSelectHangeulGroupId={setSelectedHangeulGroupId}
              selectedVerbUnit={selectedVerbUnit}
              onSelectVerbUnit={setSelectedVerbUnit}
              selectedParticleUnit={selectedParticleUnit}
              onSelectParticleUnit={setSelectedParticleUnit}
              onLanguageChange={handleUiLanguageChange}
              activeMethod={activeMethod}
              onSelectMethod={setActiveMethod}
              isMenuCollapsed={isMenuCollapsed}
            />
          )}

          {/* Method 2: 프린트·학습지 (한글 / 교실한국어 / 용언 / 조사) */}
          {activeMethod === 'worksheet' && (
            <StudySection
              sectionType={activeTrack}
              vocabulary={VOCABULARY_DATA}
              lang={currentLang}
              uiLang={uiLang}
              selectedChapter={selectedChapter}
              onSelectChapter={setSelectedChapter}
              selectedHangeulGroupId={selectedHangeulGroupId}
              selectedVerbUnitIndex={selectedVerbUnitIndex >= 0 ? selectedVerbUnitIndex : 0}
              selectedParticleUnitIndex={selectedParticleUnitIndex >= 0 ? selectedParticleUnitIndex : 0}
              activeMethod={activeMethod}
              onSelectMethod={setActiveMethod}
              isMenuCollapsed={isMenuCollapsed}
              isTeacherAuthed={isTeacherAuthed}
            />
          )}

          {/* Method 3: 게임 (한글 / 교실한국어 / 용언 / 조사) */}
          {activeMethod === 'game' && (
            <GamesSection
              track={activeTrack}
              vocabulary={VOCABULARY_DATA}
              lang={currentLang}
              uiLang={uiLang}
              selectedChapter={selectedChapter}
              onSelectChapter={setSelectedChapter}
              selectedHangeulGroupId={selectedHangeulGroupId}
              onSelectHangeulGroupId={setSelectedHangeulGroupId}
              selectedVerbUnit={selectedVerbUnit}
              onSelectVerbUnit={setSelectedVerbUnit}
              selectedParticleUnit={selectedParticleGameUnit}
              onSelectParticleUnit={setSelectedParticleGameUnit}
              onSwitchTrackMethod={(t, m) => {
                setActiveTrack(t);
                setActiveMethod(m);
              }}
              activeMethod={activeMethod}
              onSelectMethod={setActiveMethod}
              isMenuCollapsed={isMenuCollapsed}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      {!isMenuCollapsed && (
        <footer className="mt-2 sm:mt-8 border-t border-pink-200/80 bg-[#FFF5F8] py-2.5 sm:py-4 px-3 sm:px-4 text-center no-print">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-sm text-rose-600">
            <div className="flex items-center gap-2">
              <span className="font-bold text-rose-950 font-korean-gothic">해볼 한국어</span>
              <span>•</span>
              <span>{headerUi.footerSubtitle} 🥟</span>
            </div>
          </div>
        </footer>
      )}

      {/* Emergency Full-Screen Polite Modal */}
      <AnimatePresence>
        {activeEmergencyCard && (
          <EmergencyModal
            card={activeEmergencyCard}
            onClose={() => setActiveEmergencyCard(null)}
            lang={currentLang}
          />
        )}
      </AnimatePresence>

      {/* Real-time Voice Two-Way Communication Modal */}
      <RealtimeVoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        lang={currentLang}
      />

      {/* Teacher-Only Admin Studio Modal (Opened secretly via double-click or long-press on '해볼 한국어' logo) */}
      <TeacherAdminStudioModal
        isOpen={isTeacherAdminOpen}
        onClose={() => setIsTeacherAdminOpen(false)}
        onAuthChange={setIsTeacherAuthed}
      />

      {/* Stickman Hangeul Simulation Bonus Modal */}
      <AnimatePresence>
        {isStickmanModalOpen && (
          <StickmanBonusModal
            isOpen={isStickmanModalOpen}
            onClose={() => setIsStickmanModalOpen(false)}
            lang={currentLang}
            uiLang={uiLang}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
