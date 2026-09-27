import React from 'react';
import { X, Keyboard, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'A, B, C, D / 1, 2, 3, 4', desc: 'Select option A, B, C, or D' },
    { key: '← / Left Arrow', desc: 'Go to Previous question' },
    { key: '→ / Right Arrow', desc: 'Go to Next question' },
    { key: 'F', desc: 'Flag / Bookmark question for review' },
    { key: 'M', desc: 'Toggle sound effects on/off' },
    { key: 'Esc', desc: 'Close dialogs or modals' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <Keyboard className="w-5 h-5" />
            <h3 className="font-bold text-white text-base">Keyboard Shortcuts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Speed through questions with rapid hotkeys or navigate with mouse/touch gestures.
        </p>

        <div className="space-y-2 mb-6">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
            >
              <span className="text-slate-300">{sc.desc}</span>
              <kbd className="px-2.5 py-1 rounded bg-slate-800 text-indigo-300 font-mono font-bold text-[11px] border border-slate-700 shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-indigo-500/25 transition"
        >
          Got It, Let's Test!
        </button>
      </div>
    </div>
  );
};
