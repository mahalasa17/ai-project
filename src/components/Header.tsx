import React from 'react';
import { Brain, Volume2, VolumeX, Sparkles, HelpCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  currentRound: number;
  candidateName: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenHelp: () => void;
  screen: 'welcome' | 'quiz' | 'result';
}

export const Header: React.FC<HeaderProps> = ({
  currentRound,
  candidateName,
  isMuted,
  onToggleMute,
  onOpenHelp,
  screen
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto mb-6 sm:mb-8 pt-4 sm:pt-6 px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel rounded-2xl p-4 sm:px-6 sm:py-3.5 border border-white/10 shadow-xl backdrop-blur-xl">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                SMART QUIZ
              </h1>
              <span className="text-[10px] tracking-wider font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Adaptive 2.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Multi-Round Computer Science & AI Intelligence Test
            </p>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Round Indicator Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-indigo-500/30 text-indigo-300 text-xs font-bold flex items-center gap-1.5 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Round {currentRound}</span>
          </div>

          {/* Candidate Badge if active */}
          {candidateName && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs text-slate-300">
              <span className="text-slate-500">Candidate:</span>
              <span className="font-semibold text-white truncate max-w-[120px]">{candidateName}</span>
            </div>
          )}

          {/* Keyboard shortcuts trigger */}
          <button
            onClick={() => {
              soundManager.playNav();
              onOpenHelp();
            }}
            title="Keyboard Shortcuts & Tips"
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/80 transition-all text-xs flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Tips</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Unmute Audio Feedback' : 'Mute Audio Feedback'}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
              isMuted
                ? 'bg-slate-800/50 text-slate-500 border-slate-700/50'
                : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-600/30'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline font-medium">{isMuted ? 'Muted' : 'Sound'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
