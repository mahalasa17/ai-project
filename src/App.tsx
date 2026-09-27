/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { CategoryId, PreparedQuestion, Question, RoundResult } from './types/quiz';
import { QUESTION_POOL, CATEGORIES } from './data/questionPool';
import { soundManager } from './utils/audio';

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Prepare question with randomized options
function prepareQuestion(original: Question): PreparedQuestion {
  const indexed = original.options.map((opt, idx) => ({
    text: opt,
    isCorrect: idx === original.answer
  }));

  const shuffledOpts = shuffle(indexed);
  const newCorrectIdx = shuffledOpts.findIndex(o => o.isCorrect);

  return {
    ...original,
    options: shuffledOpts.map(o => o.text),
    answer: newCorrectIdx,
    originalAnswerText: original.options[original.answer]
  };
}

export default function App() {
  const [screen, setScreen] = useState<'welcome' | 'quiz' | 'result'>('welcome');
  const [currentRound, setCurrentRound] = useState(1);
  const [candidateName, setCandidateName] = useState(() => {
    return localStorage.getItem('smart_quiz_name') || 'Devin Vance';
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('ALL');
  const [questionCount, setQuestionCount] = useState(15);
  const [timerMinutes, setTimerMinutes] = useState(15);

  const [activeQuestions, setActiveQuestions] = useState<PreparedQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState<boolean[]>([]);
  
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  const [roundHistory, setRoundHistory] = useState<RoundResult[]>([]);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Save candidate name in localStorage
  useEffect(() => {
    if (candidateName) {
      localStorage.setItem('smart_quiz_name', candidateName);
    }
  }, [candidateName]);

  // Audio mute toggle
  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  // Timer handling during active quiz
  useEffect(() => {
    if (screen === 'quiz') {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinalizeQuiz();
            return 0;
          }
          if (prev === 120 || prev === 60 || prev === 30) {
            soundManager.playWarning();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [screen]);

  // Start Quiz with configuration
  const handleStartQuiz = (mode: 'RANDOM' | 'MISSED' = 'RANDOM') => {
    let sourceQuestions: Question[] = [];

    if (mode === 'MISSED' && roundHistory.length > 0) {
      const lastRound = roundHistory[roundHistory.length - 1];
      sourceQuestions = QUESTION_POOL.filter(q => lastRound.missedQuestionIds.includes(q.id));
      if (sourceQuestions.length === 0) {
        sourceQuestions = QUESTION_POOL;
      }
    } else {
      if (selectedCategory === 'ALL') {
        sourceQuestions = QUESTION_POOL;
      } else {
        sourceQuestions = QUESTION_POOL.filter(q => q.category === selectedCategory);
      }
    }

    // Shuffle and pick requested count
    const shuffledPool = shuffle(sourceQuestions);
    const countToPick = mode === 'MISSED' 
      ? shuffledPool.length 
      : Math.min(questionCount, shuffledPool.length);

    const picked = shuffledPool.slice(0, countToPick).map(prepareQuestion);

    setActiveQuestions(picked);
    setUserAnswers(new Array(picked.length).fill(null));
    setFlaggedQuestions(new Array(picked.length).fill(false));

    const totalSeconds = timerMinutes * 60;
    setTimeRemaining(totalSeconds);
    setTimeSpentSeconds(0);
    setScreen('quiz');
  };

  // Finalize & Calculate Quiz Results
  const handleFinalizeQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    const now = Date.now();
    const elapsed = Math.round((now - startTimeRef.current) / 1000);
    setTimeSpentSeconds(elapsed);

    // Compute score & category breakdown
    let correct = 0;
    const missedIds: string[] = [];
    const breakdown: Record<string, { correct: number; total: number }> = {};

    activeQuestions.forEach((q, idx) => {
      const cat = q.categoryLabel;
      if (!breakdown[cat]) {
        breakdown[cat] = { correct: 0, total: 0 };
      }
      breakdown[cat].total++;

      if (userAnswers[idx] === q.answer) {
        correct++;
        breakdown[cat].correct++;
      } else {
        missedIds.push(q.id);
      }
    });

    const total = activeQuestions.length;
    const pct = Math.round((correct / total) * 100);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;
    const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    const catObj = CATEGORIES.find(c => c.id === selectedCategory);
    const catLabel = catObj ? catObj.name : 'All Topics';

    const resultRecord: RoundResult = {
      round: currentRound,
      category: selectedCategory,
      categoryLabel: catLabel,
      score: correct,
      maxScore: total,
      percentage: pct,
      timeSpentSeconds: elapsed,
      timeStr: timeFormatted,
      missedQuestionIds: missedIds,
      categoryBreakdown: breakdown,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setRoundHistory(prev => [...prev, resultRecord]);
    setScreen('result');
  };

  // Launch Next Round
  const handleStartNextRound = (mode: 'RANDOM' | 'MISSED') => {
    setCurrentRound(prev => prev + 1);
    handleStartQuiz(mode);
  };

  // Reset to Menu
  const handleResetToMenu = () => {
    setScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between bg-ambient-mesh subtle-grid relative selection:bg-indigo-500 selection:text-white">
      {/* Background radial gradient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Navigation Bar */}
        <Header
          currentRound={currentRound}
          candidateName={candidateName}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenHelp={() => setIsHelpOpen(true)}
          screen={screen}
        />

        {/* Main Content Router */}
        <main className="flex-1 flex items-center justify-center">
          {screen === 'welcome' && (
            <WelcomeScreen
              currentRound={currentRound}
              candidateName={candidateName}
              setCandidateName={setCandidateName}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              questionCount={questionCount}
              setQuestionCount={setQuestionCount}
              timerMinutes={timerMinutes}
              setTimerMinutes={setTimerMinutes}
              roundHistory={roundHistory}
              onStartQuiz={() => handleStartQuiz('RANDOM')}
            />
          )}

          {screen === 'quiz' && (
            <QuizScreen
              currentRound={currentRound}
              candidateName={candidateName}
              questions={activeQuestions}
              userAnswers={userAnswers}
              setUserAnswers={setUserAnswers}
              flaggedQuestions={flaggedQuestions}
              setFlaggedQuestions={setFlaggedQuestions}
              timeRemaining={timeRemaining}
              setTimeRemaining={setTimeRemaining}
              onSubmitQuiz={handleFinalizeQuiz}
            />
          )}

          {screen === 'result' && (
            <ResultScreen
              currentRound={currentRound}
              candidateName={candidateName}
              questions={activeQuestions}
              userAnswers={userAnswers}
              timeSpentSeconds={timeSpentSeconds}
              roundHistory={roundHistory}
              onStartNextRound={handleStartNextRound}
              onResetToMenu={handleResetToMenu}
            />
          )}
        </main>

        {/* Global Footer */}
        <footer className="w-full text-center py-4 px-4 text-xs text-slate-500 border-t border-white/5 relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Smart Quiz Platform • Multi-Round Adaptive Assessment System</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Engine Online & Ready
            </span>
          </div>
        </footer>
      </div>

      {/* Keyboard Shortcuts Dialog */}
      <KeyboardShortcutsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
