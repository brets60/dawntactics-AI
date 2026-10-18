import React from 'react';
import {
  X,
  HelpCircle,
  Swords,
  Shield,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckCircle2,
  Trophy,
  BrainCircuit
} from 'lucide-react';
import { soundManager } from '../../services/sound';
import { PRESET_DRAFTS } from '../../data/tacticalKnowledge';
import { PresetDraft } from '../../data/tacticalKnowledge';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetDraft) => void;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-surface border border-gold-500/50 rounded-2xl shadow-mythic-glow overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-surface to-surface-elevated border-b border-surface-border px-5 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-amber-700 flex items-center justify-center shadow-mythic-gold border border-gold-300/40 shrink-0">
              <img src="/icon-192.png" alt="DawnTactics AI" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100 font-['Cinzel',serif] tracking-wide">
                  How DawnTactics AI Works
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40 text-[10px] font-bold">
                  BEGINNER'S GUIDE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Draft better, counter harder, and win more MLBB ranked matches in 4 simple steps
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-surface-elevated hover:bg-surface text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Section 1: Plain-English Analogy */}
          <div className="p-4 rounded-xl bg-gold-950/20 border border-gold-500/30 space-y-2">
            <h3 className="text-xs font-bold text-gold-300 uppercase tracking-wider flex items-center gap-1.5 font-['Cinzel',serif]">
              <BrainCircuit className="w-4 h-4 text-gold-400" />
              <span>What is DawnTactics AI?</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Think of DawnTactics as your <strong>personal MLBB esports coach</strong>. In Mobile Legends, over <strong>60% of matches are decided during the draft phase</strong>. DawnTactics analyzes team synergies, calculates real-time damage splits, recommends lane counter-picks, and automatically generates counter-item builds so you never get caught off-guard.
            </p>
          </div>

          {/* Section 2: 4 Simple Steps */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <span>⚡</span> 4 Easy Steps to Master Any Draft:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Step 1 */}
              <div className="p-3.5 rounded-xl bg-surface-elevated border border-surface-border space-y-1.5">
                <div className="flex items-center gap-2 text-gold-400 font-bold text-xs font-['Cinzel',serif]">
                  <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-[11px] font-mono">1</span>
                  <span>Pick Heroes & Bans</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Click any slot for <strong>EXP, Jungle, Mid, Gold, or Roam</strong> to select a hero. You can also assign 5 bans per team matching official tournament draft rules.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-3.5 rounded-xl bg-surface-elevated border border-surface-border space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-['Cinzel',serif]">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[11px] font-mono">2</span>
                  <span>Read Win Rate & Balance</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  The AI live-calculates <strong>Physical vs. Magic damage ratio</strong>, Crowd Control score, early/mid/late power curves, and <strong>win probability percentage</strong>.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-3.5 rounded-xl bg-surface-elevated border border-surface-border space-y-1.5">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs font-['Cinzel',serif]">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-[11px] font-mono">3</span>
                  <span>1-Tap 5-Man Pro Comps</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Tap <strong>"Suggest 5-Man Comp"</strong> to generate full synergistic teams (like <em>Blacklist UBE Sustain</em> or <em>ONIC Sonic Blitz</em>) complete with strategy guides.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-3.5 rounded-xl bg-surface-elevated border border-surface-border space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-['Cinzel',serif]">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[11px] font-mono">4</span>
                  <span>Smart Counter-Items</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Switch to the <strong>Item Matrix</strong> tab to see automatic counters (e.g. anti-heal against Estes/Ruby, Radiant Armor against continuous magic) and late-game swap sequences.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Try 3 Pro Draft Presets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-gold-400" />
                <span>Try These 3 Pro Tournament Presets:</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">1-Tap to Load</span>
            </div>

            <div className="space-y-2.5">
              {/* Preset 1: Blacklist UBE */}
              <div className="p-3 rounded-xl bg-surface-elevated border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-emerald-500/60 transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100 font-['Cinzel',serif]">
                      Blacklist UBE (Ultimate Bonding Experience)
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Sustain Deathball
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Estes + Ruby + Claude grouping tight for unkillable teamfights and Lord control.
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundManager.playLockIn();
                    onSelectPreset(PRESET_DRAFTS[0]);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center justify-center gap-1.5 shrink-0 transition-all active:scale-95"
                >
                  <span>Load Preset</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Preset 2: Rapid Dive */}
              <div className="p-3 rounded-xl bg-surface-elevated border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-amber-500/60 transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100 font-['Cinzel',serif]">
                      ONIC Rapid Aerial Dive & Assassination
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      High Mobility Dive
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Fanny + Kadita + Chou chain CC and eliminate squishy backlines in 0.5s.
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundManager.playLockIn();
                    onSelectPreset(PRESET_DRAFTS[1]);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 flex items-center justify-center gap-1.5 shrink-0 transition-all active:scale-95"
                >
                  <span>Load Preset</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Preset 3: Heavy CC Lockdown */}
              <div className="p-3 rounded-xl bg-surface-elevated border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-purple-500/60 transition-all">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100 font-['Cinzel',serif]">
                      AP.Bren Heavy Frontline Lockdown
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      Teamfight CC
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Terizla + Khufra + Baxia frontlining with immovable durability and objective control.
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundManager.playLockIn();
                    onSelectPreset(PRESET_DRAFTS[2]);
                    onClose();
                  }}
                  className="px-3.5 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-bold border border-purple-500/40 flex items-center justify-center gap-1.5 shrink-0 transition-all active:scale-95"
                >
                  <span>Load Preset</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-surface-elevated border-t border-surface-border px-6 py-3.5 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Offline Compatible • No Wi-Fi or Data Needed</span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs tracking-wider font-['Cinzel',serif] shadow-mythic-glow transition-all active:scale-95"
          >
            LET'S DRAFT!
          </button>
        </div>
      </div>
    </div>
  );
};
