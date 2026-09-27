import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  Bookmark, 
  BookmarkCheck, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  User, 
  Flame, 
  HelpCircle,
  Hash
} from 'lucide-react';
import { PreparedQuestion } from '../types/quiz';
import { soundManager } from '../utils/audio';

interface QuizScreenProps {
  currentRound: number;
  candidateName: string;
  questions: PreparedQuestion[];
  userAnswers: (number | null)[];
  setUserAnswers: React.Dispatch<React.SetStateAction<(number | null)[]>>;
  flaggedQuestions: boolean[];
  setFlaggedQuestions: React.Dispatch<React.SetStateAction<boolean[]>>;
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  onSubmitQuiz: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  currentRound,
  candidateName,
  questions,
  userAnswers,
  setUserAnswers,
  flaggedQuestions,
  setFlaggedQuestions,
  timeRemaining,
  setTimeRemaining,
  onSubmitQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [paletteFilter, setPaletteFilter] = useState<'ALL' | 'UNANSWERED' | 'FLAGGED'>('ALL');
  const [streak, setStreak] = useState(0);

  const currentQ = questions[currentIndex];
  const isAnswered = userAnswers[currentIndex] !== null;
  const isFlagged = flaggedQuestions[currentIndex];

  // Format time (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isUrgentTimer = timeRemaining <= 120 && timeRemaining > 0;

  // Handle Option Selection
  const handleSelectOption = useCallback((optionIdx: number) => {
    soundManager.playSelect();
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentIndex] = optionIdx;
      return updated;
    });

    // Check consecutive streak
    setStreak(prev => {
      const next = prev + 1;
      if (next >= 3 && next % 3 === 0) {
        soundManager.playStreak();
      }
      return next;
    });
  }, [currentIndex, setUserAnswers]);

  // Clear answer
  const handleClearAnswer = useCallback(() => {
    soundManager.playNav();
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentIndex] = null;
      return updated;
    });
  }, [currentIndex, setUserAnswers]);

  // Toggle Flag
  const handleToggleFlag = useCallback(() => {
    soundManager.playNav();
    setFlaggedQuestions(prev => {
      const updated = [...prev];
      updated[currentIndex] = !updated[currentIndex];
      return updated;
    });
  }, [currentIndex, setFlaggedQuestions]);

  // Navigation
  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      soundManager.playNav();
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      soundManager.playNav();
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSubmitModal) {
        if (e.key === 'Escape') setShowSubmitModal(false);
        return;
      }

      // Avoid capturing shortcuts if focused in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') {
        if (currentQ?.options[0] !== undefined) handleSelectOption(0);
      } else if (key === 'B' || key === '2') {
        if (currentQ?.options[1] !== undefined) handleSelectOption(1);
      } else if (key === 'C' || key === '3') {
        if (currentQ?.options[2] !== undefined) handleSelectOption(2);
      } else if (key === 'D' || key === '4') {
        if (currentQ?.options[3] !== undefined) handleSelectOption(3);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (key === 'F') {
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSubmitModal, currentQ, handleSelectOption, handleNext, handlePrev, handleToggleFlag]);

  // Stats calculation
  const totalQuestions = questions.length;
  const answeredCount = userAnswers.filter(ans => ans !== null).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = flaggedQuestions.filter(Boolean).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Jump to first unanswered
  const jumpToFirstUnanswered = () => {
    const firstUnanswered = userAnswers.findIndex(ans => ans === null);
    if (firstUnanswered !== -1) {
      setCurrentIndex(firstUnanswered);
      setShowSubmitModal(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-12">
      <div className="glass-panel rounded-3xl p-5 sm:p-8 border border-white/10 shadow-2xl relative">
        
        {/* Top Status & Telemetry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          {/* Candidate & Round Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Test</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  Round {currentRound}
                </span>
                {streak >= 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1 animate-pulse">
                    <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{streak} Streak</span>
                  </span>
                )}
              </div>
              <div className="text-sm sm:text-base font-bold text-white truncate max-w-[200px]">
                {candidateName || 'Candidate'}
              </div>
            </div>
          </div>

          {/* Timer Display */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <div 
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-mono text-base sm:text-lg font-bold border transition-all shadow-inner ${
                isUrgentTimer
                  ? 'bg-rose-950/50 text-rose-300 border-rose-500/50 animate-pulse'
                  : 'bg-slate-900/90 text-amber-300 border-slate-700/80'
              }`}
            >
              <Clock className={`w-4 h-4 ${isUrgentTimer ? 'text-rose-400 animate-spin' : 'text-amber-400'}`} />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* Progress Bar & Counter */}
        <div className="my-5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <div className="flex items-center gap-2">
              <span>Progress:</span>
              <span className="font-bold text-white">{answeredCount} of {totalQuestions} answered</span>
            </div>
            <div className="flex items-center gap-3">
              {flaggedCount > 0 && (
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Bookmark className="w-3 h-3 fill-amber-400/20" />
                  <span>{flaggedCount} Flagged</span>
                </span>
              )}
              <span className="font-bold text-indigo-400">{progressPercent}%</span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Active Question Metadata Pill Bar */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-bold uppercase tracking-wider">
              Question {String(currentIndex + 1).padStart(2, '0')} of {totalQuestions}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
              {currentQ.categoryLabel}
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800 hidden sm:inline">
              {currentQ.difficulty}
            </span>
          </div>

          {/* Flag / Bookmark Button */}
          <button
            type="button"
            onClick={handleToggleFlag}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
              isFlagged
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {isFlagged ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Flagged</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Flag for review</span>
              </>
            )}
          </button>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Option Cards */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((optionText, optIdx) => {
            const isSelected = userAnswers[currentIndex] === optIdx;
            const letter = String.fromCharCode(65 + optIdx);

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`option-card-interactive w-full p-4 rounded-2xl border text-left flex items-center justify-between text-sm sm:text-base group cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-400 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400/40'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-200 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 group-hover:border-slate-600'
                  }`}>
                    {letter}
                  </div>
                  <span className="font-medium text-slate-100">{optionText}</span>
                </div>

                <div className="flex items-center gap-2">
                  <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-500 group-hover:text-slate-400 px-1.5 py-0.5 rounded bg-slate-950/40 border border-slate-800">
                    {letter}
                  </kbd>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Clear Answer Option if selected */}
        {isAnswered && (
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={handleClearAnswer}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear selection</span>
            </button>
          </div>
        )}

        {/* Interactive Question Palette */}
        <div className="pt-5 border-t border-white/10 mb-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-indigo-400" />
              <span>Question Palette</span>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 text-[11px]">
              {(['ALL', 'UNANSWERED', 'FLAGGED'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => {
                    soundManager.playNav();
                    setPaletteFilter(filter);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                    paletteFilter === filter
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter === 'ALL' ? 'All' : filter === 'UNANSWERED' ? `Unanswered (${unansweredCount})` : `Flagged (${flaggedCount})`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
            {questions.map((_, idx) => {
              const isCurr = idx === currentIndex;
              const hasAns = userAnswers[idx] !== null;
              const isFlg = flaggedQuestions[idx];

              // Check filter
              if (paletteFilter === 'UNANSWERED' && hasAns) return null;
              if (paletteFilter === 'FLAGGED' && !isFlg) return null;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    soundManager.playNav();
                    setCurrentIndex(idx);
                  }}
                  className={`relative w-8 h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center border cursor-pointer ${
                    isCurr
                      ? 'border-indigo-400 bg-indigo-600 text-white ring-2 ring-indigo-400/40 scale-110 shadow-md shadow-indigo-500/30'
                      : hasAns
                      ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      : 'border-slate-800 bg-slate-900/70 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <span>{idx + 1}</span>
                  {isFlg && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-slate-900" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs sm:text-sm border border-slate-800 transition flex items-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition flex items-center gap-2 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Review & Finish</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4 text-2xl shadow-inner">
                <Send className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-extrabold text-white mb-2">
                Submit Round {currentRound} Answers?
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                Review your progress summary below before generating your round score and answer explanations.
              </p>

              {/* Status Breakdown Box */}
              <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Answered</div>
                  <div className="text-lg font-extrabold text-emerald-400">{answeredCount}</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Unanswered</div>
                  <div className={`text-lg font-extrabold ${unansweredCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                    {unansweredCount}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">Flagged</div>
                  <div className="text-lg font-extrabold text-amber-400">{flaggedCount}</div>
                </div>
              </div>

              {unansweredCount > 0 && (
                <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs mb-6 text-left flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                    <span>You have <strong>{unansweredCount}</strong> unanswered questions remaining.</span>
                  </div>
                  <button
                    type="button"
                    onClick={jumpToFirstUnanswered}
                    className="underline text-rose-200 hover:text-white shrink-0 font-bold"
                  >
                    Jump
                  </button>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-700 transition cursor-pointer"
                >
                  Continue Test
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmitModal(false);
                    onSubmitQuiz();
                  }}
                  className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition cursor-pointer"
                >
                  Confirm Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
