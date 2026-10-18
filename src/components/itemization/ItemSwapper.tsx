import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Shield, Zap, Sparkles, AlertTriangle, Coins, CheckCircle, Timer } from 'lucide-react';
import { soundManager } from '../../services/sound';

export const ItemSwapper: React.FC = () => {
  const [drillStage, setDrillStage] = useState<'idle' | 'resurrecting' | 'frozen' | 'lifeline' | 'success' | 'failed'>('idle');
  const [timeLeft, setTimeLeft] = useState(2.5);
  const [scoreMs, setScoreMs] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number>(0);

  // Timer loop for drill
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (drillStage === 'resurrecting' || drillStage === 'frozen') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.05) {
            setDrillStage('failed');
            soundManager.playClick();
            return 0;
          }
          return Number((prev - 0.05).toFixed(2));
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [drillStage]);

  const startDrill = () => {
    soundManager.playLockIn();
    setScoreMs([]);
    setDrillStage('resurrecting');
    setTimeLeft(2.5);
    setStartTime(Date.now());
  };

  const handleSwapToWinter = () => {
    if (drillStage !== 'resurrecting') return;
    const reaction = Date.now() - startTime;
    setScoreMs((prev) => [...prev, reaction]);
    soundManager.playLockIn();
    setDrillStage('frozen');
    setTimeLeft(2.0);
    setStartTime(Date.now());
  };

  const handleSwapToLifeline = () => {
    if (drillStage !== 'frozen') return;
    const reaction = Date.now() - startTime;
    setScoreMs((prev) => [...prev, reaction]);
    soundManager.playGoldChime();
    setDrillStage('success');
  };

  const resetDrill = () => {
    setDrillStage('idle');
    setTimeLeft(2.5);
    setScoreMs([]);
  };

  return (
    <div className="bg-surface border border-surface-border rounded-2xl p-5 sm:p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-border pb-4 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Late-Game Survival Rotation
            </span>
            <span className="text-xs text-slate-400">• Mythic Immortal Execution</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mt-1 font-['Cinzel',serif]">
            Death-Defying Item Swapping Visualizer & APM Simulator
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          {drillStage === 'idle' ? (
            <button
              onClick={startDrill}
              className="px-4 py-2 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-mythic-gold transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" /> Start Swapping Drill
            </button>
          ) : (
            <button
              onClick={resetDrill}
              className="px-3 py-2 bg-surface-elevated hover:bg-surface border border-surface-border text-slate-300 text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Drill
            </button>
          )}
        </div>
      </div>

      {/* Interactive Timeline Progression */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Step 1: Immortality */}
        <div
          className={`border rounded-2xl p-4 transition-all relative ${
            drillStage === 'resurrecting'
              ? 'bg-amber-950/20 border-gold-400 shadow-mythic-glow ring-2 ring-gold-400'
              : 'bg-surface-elevated border-surface-border'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Step 1 (Fatal Hit)</span>
            <img src="/items/immortality.png" alt="Immortality" className="w-9 h-9 rounded-lg border border-gold-500/50 shadow-md object-cover" />
          </div>
          <h4 className="text-base font-bold text-slate-100">Immortality Trigger</h4>
          <p className="text-xs text-slate-400 mt-1">
            Upon taking lethal damage, you enter a <strong className="text-gold-300">2.5s resurrect window</strong>. Open shop, sell Immortality (returns 1,272 gold), and immediately purchase Winter Crown.
          </p>

          <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs">
            <span className="text-slate-400">Window: <strong className="text-slate-200">2.50s</strong></span>
            <span className="text-amber-400 font-bold">Resale: +1,272g</span>
          </div>

          {drillStage === 'resurrecting' && (
            <button
              onClick={handleSwapToWinter}
              className="mt-3 w-full py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl animate-pulse shadow-mythic-gold"
            >
              Click: Sell Immortality & Buy Winter Crown!
            </button>
          )}
        </div>

        {/* Step 2: Winter Crown */}
        <div
          className={`border rounded-2xl p-4 transition-all relative ${
            drillStage === 'frozen'
              ? 'bg-blue-950/20 border-cyan-400 shadow-blue-glow ring-2 ring-cyan-400'
              : 'bg-surface-elevated border-surface-border'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Step 2 (Active Freeze)</span>
            <img src="/items/winter_crown.png" alt="Winter Crown" className="w-9 h-9 rounded-lg border border-cyan-500/50 shadow-md object-cover" />
          </div>
          <h4 className="text-base font-bold text-slate-100">Winter Crown Freeze</h4>
          <p className="text-xs text-slate-400 mt-1">
            Activate Winter Crown for <strong className="text-cyan-300">2.0s untargetable invulnerability</strong>. Channeling skills continue! During this freeze, open shop and buy Rose Gold Meteor or Wind of Nature.
          </p>

          <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs">
            <span className="text-slate-400">Window: <strong className="text-slate-200">2.00s</strong></span>
            <span className="text-cyan-400 font-bold">Resale: +1,146g</span>
          </div>

          {drillStage === 'frozen' && (
            <button
              onClick={handleSwapToLifeline}
              className="mt-3 w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl animate-pulse shadow-blue-glow"
            >
              Click: Sell Winter & Buy Rose Gold / WoN!
            </button>
          )}
        </div>

        {/* Step 3: Lifeline / Immunity */}
        <div
          className={`border rounded-2xl p-4 transition-all relative ${
            drillStage === 'success'
              ? 'bg-emerald-950/20 border-emerald-400 shadow-mythic-gold ring-2 ring-emerald-400'
              : 'bg-surface-elevated border-surface-border'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step 3 (Clutch Outplay)</span>
            <div className="flex items-center space-x-1">
              <img src="/items/rose_gold_meteor.png" alt="Rose Gold Meteor" className="w-8 h-8 rounded-lg border border-rose-500/50 shadow-sm object-cover" />
              <img src="/items/wind_of_nature.png" alt="Wind of Nature" className="w-8 h-8 rounded-lg border border-emerald-500/50 shadow-sm object-cover" />
            </div>
          </div>
          <h4 className="text-base font-bold text-slate-100">Lifeline / Wind Chant</h4>
          <p className="text-xs text-slate-400 mt-1">
            Emerge from freeze with instant <strong className="text-emerald-300">510-1350 HP shield</strong> (Rose Gold Meteor) or <strong className="text-emerald-300">2.0s physical immunity</strong> (Wind of Nature) to clean up the teamfight!
          </p>

          <div className="mt-4 pt-3 border-t border-surface-border flex items-center justify-between text-xs">
            <span className="text-slate-400">Result: <strong className="text-emerald-400">Survival Guaranteed</strong></span>
            <span className="text-emerald-400 font-bold">Outplay Complete</span>
          </div>

          {drillStage === 'success' && (
            <div className="mt-3 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-1">
              <CheckCircle className="w-4 h-4" /> Flawless Swap Executed!
            </div>
          )}
        </div>
      </div>

      {/* Drill Countdown & Reaction Results */}
      {drillStage !== 'idle' && (
        <div className="bg-canvas border border-surface-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Timer className="w-6 h-6 text-gold-400 animate-spin" />
            <div>
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Active Window</span>
              <div className="text-2xl font-black font-mono text-gold-300">
                {timeLeft.toFixed(2)}s remaining
              </div>
            </div>
          </div>

          {scoreMs.length > 0 && (
            <div className="flex items-center space-x-4 text-xs">
              {scoreMs.map((ms, i) => (
                <div key={i} className="text-center">
                  <span className="text-slate-500 block text-[10px]">Swap #{i + 1} Reaction</span>
                  <span className="font-mono font-bold text-slate-200">{ms}ms</span>
                </div>
              ))}
            </div>
          )}

          {drillStage === 'failed' && (
            <div className="text-xs font-bold text-red-400 bg-red-950/40 border border-red-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Swap timed out! Practice faster pre-ordering.
            </div>
          )}
        </div>
      )}

      {/* Gold Requirement Calculator & Pro Setup Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-surface-border">
        {/* Gold Calculator */}
        <div className="bg-surface-elevated/70 rounded-xl p-4 border border-surface-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5 mb-2">
            <Coins className="w-4 h-4 text-gold-400" /> Reserve Gold Bank Calculator
          </h4>
          <ul className="text-xs text-slate-300 space-y-1.5">
            <li className="flex justify-between">
              <span className="text-slate-400">Immortality Resale Value:</span>
              <span className="font-mono text-emerald-400 font-bold">+1,272 Gold</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-400">Winter Crown Purchase Cost:</span>
              <span className="font-mono text-red-400 font-bold">-1,910 Gold</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-400">Net Out-of-Pocket for 1st Swap:</span>
              <span className="font-mono text-amber-300 font-bold">638 Gold</span>
            </li>
            <li className="flex justify-between border-t border-surface-border pt-1.5">
              <span className="text-slate-200 font-bold">Total Safe Bank Needed:</span>
              <span className="font-mono text-gold-400 font-black">~1,800 - 2,200 Gold</span>
            </li>
          </ul>
        </div>

        {/* Pro Execution Setup */}
        <div className="bg-surface-elevated/70 rounded-xl p-4 border border-surface-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" /> Pro Hotkey Pre-Order Setup
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            In competitive MLBB settings, navigate to the shop in the late game. <strong>Pre-order Winter Crown</strong> in the shop menu before the teamfight begins. The moment Immortality pops, tap shop &rarr; sell Immortality &rarr; close shop &rarr; tap the instant 1-tap quick buy button!
          </p>
        </div>
      </div>
    </div>
  );
};
