import React, { useState } from 'react';
import { 
  Brain, 
  Sparkles, 
  Zap, 
  Clock, 
  Layers, 
  ShieldCheck, 
  Binary, 
  Cloud, 
  ArrowRight, 
  User, 
  Shuffle, 
  Award,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { CategoryId, RoundResult } from '../types/quiz';
import { CATEGORIES, QUESTION_POOL } from '../data/questionPool';
import { soundManager } from '../utils/audio';

interface WelcomeScreenProps {
  currentRound: number;
  candidateName: string;
  setCandidateName: (name: string) => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  questionCount: number;
  setQuestionCount: (cnt: number) => void;
  timerMinutes: number;
  setTimerMinutes: (min: number) => void;
  roundHistory: RoundResult[];
  onStartQuiz: () => void;
}

const RANDOM_NAMES = [
  'Alex Chen',
  'Devin Vance',
  'Jordan Sparks',
  'Elena Rostova',
  'Samira Khan',
  'Marcus Thorne',
  'Taylor Swiftly',
  'Morgan Turing'
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  currentRound,
  candidateName,
  setCandidateName,
  selectedCategory,
  setSelectedCategory,
  questionCount,
  setQuestionCount,
  timerMinutes,
  setTimerMinutes,
  roundHistory,
  onStartQuiz
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleRandomizeName = () => {
    soundManager.playNav();
    const random = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
    setCandidateName(random);
    setErrorMsg('');
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) {
      setErrorMsg('Please enter your candidate name or click randomize');
      soundManager.playWarning();
      return;
    }
    soundManager.playSelect();
    onStartQuiz();
  };

  // Icon mapping
  const renderCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'AI_ML':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'CS_FUND':
        return <Binary className="w-5 h-5 text-cyan-400" />;
      case 'NET_HARD':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'CLOUD_WEB':
        return <Cloud className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  // Stats from previous rounds
  const hasHistory = roundHistory.length > 0;
  const bestScore = hasHistory ? Math.max(...roundHistory.map(r => r.percentage)) : 0;
  const avgScore = hasHistory 
    ? Math.round(roundHistory.reduce((acc, r) => acc + r.percentage, 0) / roundHistory.length) 
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-12">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl pointer-events-none" />

        {/* Hero Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Multi-Round Adaptive Assessment</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            {hasHistory ? (
              <span>Ready for <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Round {currentRound}</span>?</span>
            ) : (
              <span>Master Computer Science & <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">AI Intelligence</span></span>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Test and sharpen your engineering and AI instincts. Dynamically shuffled questions, real-time timer, comprehensive explanations, and cumulative multi-round analytics.
          </p>

          {/* Cumulative Mini-Banner if returning */}
          {hasHistory && (
            <div className="mt-5 p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-around text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Rounds Completed: <strong className="text-white">{roundHistory.length}</strong></span>
              </div>
              <div className="w-px h-4 bg-indigo-500/30" />
              <div className="flex items-center gap-2 text-slate-300">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>Average: <strong className="text-blue-300">{avgScore}%</strong></span>
              </div>
              <div className="w-px h-4 bg-indigo-500/30" />
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Personal Best: <strong className="text-emerald-300">{bestScore}%</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Start Configuration Form */}
        <form onSubmit={handleStart} className="space-y-6 sm:space-y-8">
          
          {/* Candidate Name Input */}
          <div className="bg-slate-900/60 rounded-2xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="name-input" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>Candidate Name</span>
                <span className="text-rose-400">*</span>
              </label>
              <button
                type="button"
                onClick={handleRandomizeName}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
              >
                <Shuffle className="w-3 h-3" />
                <span>Randomize</span>
              </button>
            </div>

            <div className="relative">
              <input
                id="name-input"
                type="text"
                value={candidateName}
                onChange={(e) => {
                  setCandidateName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="e.g. John Doe, Ada Lovelace..."
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium transition"
              />
            </div>
            {errorMsg && (
              <p className="mt-2 text-xs text-rose-400 font-medium">{errorMsg}</p>
            )}
          </div>

          {/* Category Cards Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Select Assessment Track</span>
              </label>
              <span className="text-xs text-slate-400">
                Pool: {QUESTION_POOL.length} Questions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const countInCat = cat.id === 'ALL' 
                  ? QUESTION_POOL.length 
                  : QUESTION_POOL.filter(q => q.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      soundManager.playSelect();
                      setSelectedCategory(cat.id);
                    }}
                    className={`relative p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-600/15 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-500/50'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900/90 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-white/5">
                          {renderCategoryIcon(cat.id)}
                        </div>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {countInCat} Qs
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">{cat.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{cat.description}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-end">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Round Controls: Questions Count & Timer Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Questions Per Round */}
            <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-white/5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-cyan-400" />
                <span>Questions Per Round</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => {
                      soundManager.playNav();
                      setQuestionCount(cnt);
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                      questionCount === cnt
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {cnt} Qs {cnt === 20 ? '(Standard)' : cnt === 10 ? '(Sprint)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer Duration */}
            <div className="bg-slate-900/60 rounded-2xl p-4 sm:p-5 border border-white/5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Timer Duration</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      soundManager.playNav();
                      setTimerMinutes(mins);
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                      timerMinutes === mins
                        ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {mins} Min
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Rules & Adaptive Features Briefing */}
          <div className="bg-slate-900/40 rounded-2xl p-4 sm:p-5 border border-white/5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Multi-Round Assessment Features</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 text-[10px] font-bold">1</span>
                <span>Randomized questions & shuffled options every round.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 text-[10px] font-bold">2</span>
                <span>Flag questions, jump via palette, or use hotkeys (A-D, ←, →).</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 text-[10px] font-bold">3</span>
                <span>Targeted Retake mode for missed questions with explanations.</span>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-extrabold text-base tracking-wide shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>{hasHistory ? `Launch Round ${currentRound}` : 'Start Round 1'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
