import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Medal, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  History, 
  ListChecks, 
  Target, 
  Zap,
  TrendingUp,
  BrainCircuit,
  Filter
} from 'lucide-react';
import { PreparedQuestion, RoundResult } from '../types/quiz';
import { soundManager } from '../utils/audio';

interface ResultScreenProps {
  currentRound: number;
  candidateName: string;
  questions: PreparedQuestion[];
  userAnswers: (number | null)[];
  timeSpentSeconds: number;
  roundHistory: RoundResult[];
  onStartNextRound: (mode: 'RANDOM' | 'MISSED') => void;
  onResetToMenu: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  currentRound,
  candidateName,
  questions,
  userAnswers,
  timeSpentSeconds,
  roundHistory,
  onStartNextRound,
  onResetToMenu
}) => {
  const [activeTab, setActiveTab] = useState<'ACTIONS' | 'REVIEW' | 'HISTORY'>('ACTIONS');
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'MISSED' | 'CORRECT'>('ALL');

  // Compute metrics
  const total = questions.length;
  let correctCount = 0;
  const missedIndices: number[] = [];

  questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.answer) {
      correctCount++;
    } else {
      missedIndices.push(idx);
    }
  });

  const percentage = Math.round((correctCount / total) * 100);
  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const avgSpeedPerQuestion = Math.round(timeSpentSeconds / Math.max(1, total));

  // Category breakdown calculation
  const categoryStats: Record<string, { correct: number; total: number }> = {};
  questions.forEach((q, idx) => {
    const cat = q.categoryLabel;
    if (!categoryStats[cat]) {
      categoryStats[cat] = { correct: 0, total: 0 };
    }
    categoryStats[cat].total++;
    if (userAnswers[idx] === q.answer) {
      categoryStats[cat].correct++;
    }
  });

  // Cumulative analytics across rounds
  const totalRounds = roundHistory.length;
  const avgPercentage = totalRounds > 0 
    ? Math.round(roundHistory.reduce((acc, r) => acc + r.percentage, 0) / totalRounds) 
    : percentage;
  const bestPercentage = totalRounds > 0 
    ? Math.max(...roundHistory.map(r => r.percentage)) 
    : percentage;

  // Trigger celebration on mount
  useEffect(() => {
    soundManager.playVictory();
    if (percentage >= 70) {
      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Silently fail if confetti unavailable
      }
    }
  }, [percentage]);

  // Performance Badge
  const getPerformanceBadge = () => {
    if (percentage >= 90) {
      return {
        title: `Extraordinary Mastery, ${candidateName || 'Candidate'}! 🏆`,
        subtitle: `You crushed Round ${currentRound} with near-flawless accuracy. Ready for deeper challenges!`,
        icon: <Trophy className="w-8 h-8 text-amber-300" />,
        badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        ringColor: 'from-amber-400 to-yellow-500'
      };
    } else if (percentage >= 70) {
      return {
        title: `Impressive Performance, ${candidateName || 'Candidate'}! 🌟`,
        subtitle: `Great problem-solving skills across Round ${currentRound}. A few adjustments will push you to 100%!`,
        icon: <Medal className="w-8 h-8 text-indigo-300" />,
        badgeStyle: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
        ringColor: 'from-blue-500 to-indigo-500'
      };
    } else {
      return {
        title: `Round ${currentRound} Complete, ${candidateName || 'Candidate'}! 💪`,
        subtitle: 'Good effort! Review the missed questions below and use the targeted retake mode to master them.',
        icon: <Award className="w-8 h-8 text-rose-300" />,
        badgeStyle: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        ringColor: 'from-rose-500 to-amber-500'
      };
    }
  };

  const perf = getPerformanceBadge();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-12">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-indigo-500/15 blur-3xl pointer-events-none" />

        {/* Hero Result Banner */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 border shadow-xl ${perf.badgeStyle}`}>
            {perf.icon}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-bold text-slate-300 mb-3">
            <span>Round {currentRound} Final Assessment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {perf.title}
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {perf.subtitle}
          </p>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Score</span>
            <div className="text-xl sm:text-2xl font-black text-white">
              {correctCount} <span className="text-sm font-semibold text-slate-500">/ {total}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Percentage</span>
            <div className={`text-xl sm:text-2xl font-black ${
              percentage >= 70 ? 'text-emerald-400' : 'text-amber-400'
            }`}>
              {percentage}%
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Time Elapsed</span>
            <div className="text-xl sm:text-2xl font-black text-blue-400">
              {timeFormatted}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Pace</span>
            <div className="text-xl sm:text-2xl font-black text-purple-400">
              {avgSpeedPerQuestion}s <span className="text-xs font-normal text-slate-400">/ Q</span>
            </div>
          </div>
        </div>

        {/* Category Mastery Breakdown Bars */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <span>Category Mastery Breakdown</span>
          </h3>

          <div className="space-y-3.5">
            {Object.entries(categoryStats).map(([catName, stats]) => {
              const catPct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={catName}>
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-300">{catName}</span>
                    <span className="text-white font-bold">
                      {stats.correct}/{stats.total} ({catPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        catPct >= 80 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                          : catPct >= 50 
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-500' 
                          : 'bg-gradient-to-r from-amber-500 to-rose-500'
                      }`}
                      style={{ width: `${catPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cumulative Overall Cross-Round Summary */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-blue-950/40 border border-indigo-500/30 mb-8">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <span>Cumulative Performance Log (Across All Rounds)</span>
            </h3>
            <span className="text-[11px] text-slate-400">
              Candidate: <strong className="text-white">{candidateName}</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Rounds Played</span>
              <span className="text-lg font-black text-white">{totalRounds}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Cumulative Avg</span>
              <span className="text-lg font-black text-blue-400">{avgPercentage}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-0.5">Personal Best</span>
              <span className="text-lg font-black text-emerald-400">{bestPercentage}%</span>
            </div>
          </div>
        </div>

        {/* View Tabs Selector */}
        <div className="flex items-center justify-center gap-2 mb-6 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => {
              soundManager.playNav();
              setActiveTab('ACTIONS');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'ACTIONS'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Next Round Actions</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playNav();
              setActiveTab('REVIEW');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'REVIEW'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span>Answer Key & Explanations ({total})</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playNav();
              setActiveTab('HISTORY');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'HISTORY'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Round History ({roundHistory.length})</span>
          </button>
        </div>

        {/* TAB 1: NEXT ROUND ACTIONS HUB */}
        {activeTab === 'ACTIONS' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Action 1: Next Round with fresh questions */}
            <button
              type="button"
              onClick={() => {
                soundManager.playSelect();
                onStartNextRound('RANDOM');
              }}
              className="p-5 rounded-2xl bg-gradient-to-b from-blue-900/30 to-indigo-950/40 border border-blue-500/40 hover:border-blue-400 text-left transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <ArrowRight className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-blue-300 transition">
                  Next Round (Fresh Questions)
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Draws fresh random questions from the pool to test broad proficiency.
                </p>
              </div>
              <span className="mt-4 text-xs font-bold text-blue-400 flex items-center gap-1">
                <span>Launch Round {currentRound + 1}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
              </span>
            </button>

            {/* Action 2: Retake Missed Questions */}
            <button
              type="button"
              disabled={missedIndices.length === 0}
              onClick={() => {
                soundManager.playSelect();
                onStartNextRound('MISSED');
              }}
              className={`p-5 rounded-2xl text-left transition-all flex flex-col justify-between ${
                missedIndices.length > 0
                  ? 'bg-gradient-to-b from-amber-900/30 to-orange-950/40 border border-amber-500/40 hover:border-amber-400 group cursor-pointer'
                  : 'bg-slate-900/40 border-slate-800 opacity-40 cursor-not-allowed'
              }`}
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">
                  Retake Missed Questions
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {missedIndices.length > 0
                    ? `Practice only the ${missedIndices.length} questions answered incorrectly or skipped.`
                    : '100% Accuracy achieved! No missed questions to retake.'}
                </p>
              </div>
              {missedIndices.length > 0 && (
                <span className="mt-4 text-xs font-bold text-amber-400 flex items-center gap-1">
                  <span>Target Weak Spots ({missedIndices.length})</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </span>
              )}
            </button>

            {/* Action 3: Change category / menu */}
            <button
              type="button"
              onClick={() => {
                soundManager.playNav();
                onResetToMenu();
              }}
              className="p-5 rounded-2xl bg-gradient-to-b from-purple-900/30 to-slate-950/40 border border-purple-500/30 hover:border-purple-400 text-left transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1 group-hover:text-purple-300 transition">
                  Change Track / Settings
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Switch categories, adjust question counts, or change test parameters.
                </p>
              </div>
              <span className="mt-4 text-xs font-bold text-purple-400 flex items-center gap-1">
                <span>Configure New Track</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
              </span>
            </button>
          </div>
        )}

        {/* TAB 2: DETAILED ANSWER KEY & EXPLANATIONS */}
        {activeTab === 'REVIEW' && (
          <div className="space-y-4">
            {/* Filter buttons */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-indigo-400" />
                <span>Filter Questions:</span>
              </span>
              <div className="flex items-center gap-1 text-xs">
                {(['ALL', 'MISSED', 'CORRECT'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      soundManager.playNav();
                      setReviewFilter(filter);
                    }}
                    className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
                      reviewFilter === filter
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter === 'ALL' ? `All (${total})` : filter === 'MISSED' ? `Missed (${missedIndices.length})` : `Correct (${correctCount})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions breakdown cards */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.answer;
                const isSkipped = userChoice === null;

                if (reviewFilter === 'MISSED' && isCorrect) return null;
                if (reviewFilter === 'CORRECT' && !isCorrect) return null;

                return (
                  <div
                    key={q.id || idx}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      isCorrect
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : isSkipped
                        ? 'bg-amber-950/20 border-amber-500/30'
                        : 'bg-rose-950/20 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 mr-2">
                          {q.categoryLabel}
                        </span>
                        <h4 className="inline font-bold text-white text-sm sm:text-base">
                          <span className="text-indigo-400">Q{idx + 1}. </span>
                          {q.question}
                        </h4>
                      </div>

                      <div className="shrink-0">
                        {isCorrect ? (
                          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Correct</span>
                          </span>
                        ) : isSkipped ? (
                          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                            <MinusCircle className="w-3.5 h-3.5" />
                            <span>Skipped</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Incorrect</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Choices comparison */}
                    <div className="space-y-2 mt-3 text-xs sm:text-sm">
                      <div className={`p-3 rounded-xl border ${
                        isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                          : isSkipped
                          ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                      }`}>
                        <span className="font-bold uppercase tracking-wider text-slate-400 block text-[10px] mb-1">
                          Candidate Selection:
                        </span>
                        <div className="font-medium">
                          {userChoice !== null ? (
                            <span>{String.fromCharCode(65 + userChoice)}. {q.options[userChoice]}</span>
                          ) : (
                            <span className="italic text-slate-500">No option selected (Skipped)</span>
                          )}
                        </div>
                      </div>

                      {!isCorrect && (
                        <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-200">
                          <span className="font-bold uppercase tracking-wider text-emerald-400 block text-[10px] mb-1">
                            Correct Answer:
                          </span>
                          <div className="font-medium">
                            {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}
                          </div>
                        </div>
                      )}

                      {/* Explanation box */}
                      {q.explanation && (
                        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 mt-2">
                          <span className="font-bold uppercase tracking-wider text-indigo-400 block text-[10px] mb-1">
                            Explanation & Key Insight:
                          </span>
                          <p className="text-xs leading-relaxed text-slate-300">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: ROUND-BY-ROUND HISTORY LOG */}
        {activeTab === 'HISTORY' && (
          <div>
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase font-bold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Round</th>
                    <th className="p-3.5">Track</th>
                    <th className="p-3.5">Score</th>
                    <th className="p-3.5">Percentage</th>
                    <th className="p-3.5">Time</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/30">
                  {roundHistory.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition">
                      <td className="p-3.5 font-bold text-indigo-400">
                        Round {r.round}
                      </td>
                      <td className="p-3.5">{r.categoryLabel}</td>
                      <td className="p-3.5 font-semibold text-white">
                        {r.score} / {r.maxScore}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                          r.percentage >= 70
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {r.percentage}%
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400">{r.timeStr}</td>
                      <td className="p-3.5">
                        {r.percentage >= 80 ? (
                          <span className="text-emerald-400 font-semibold text-xs">Mastered</span>
                        ) : r.percentage >= 60 ? (
                          <span className="text-blue-400 font-semibold text-xs">Proficient</span>
                        ) : (
                          <span className="text-amber-400 font-semibold text-xs">Needs Practice</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
