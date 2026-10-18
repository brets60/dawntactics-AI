import React from 'react';
import { DraftMetrics } from '../../types/mlbb';
import { Shield, Zap, Flame, Clock, CheckCircle, AlertOctagon, Swords } from 'lucide-react';

interface MetricsPanelProps {
  blueMetrics: DraftMetrics;
  redMetrics: DraftMetrics;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ blueMetrics, redMetrics }) => {
  return (
    <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-surface-border pb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400 flex items-center gap-2 font-['Rajdhani',sans-serif]">
          <Swords className="w-4 h-4 text-gold-400" /> Composition Analytics Matrix
        </h3>
        <span className="text-xs text-slate-400">Live 5v5 Differential</span>
      </div>

      {/* Damage Ratio Split */}
      <div>
        <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
          <span className="text-slate-300">Damage Profile Distribution</span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="text-red-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded bg-red-500" /> Phys: {blueMetrics.physical_ratio}%
            </span>
            <span className="text-purple-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded bg-purple-500" /> Magic: {blueMetrics.magic_ratio}%
            </span>
            {blueMetrics.true_ratio > 0 && (
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded bg-amber-500" /> True: {blueMetrics.true_ratio}%
              </span>
            )}
          </div>
        </div>

        {/* Damage Ratio Bar */}
        <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex shadow-inner border border-surface-border">
          <div
            style={{ width: `${blueMetrics.physical_ratio}%` }}
            className="bg-gradient-to-r from-red-600 to-rose-500 transition-all duration-500"
            title={`Physical: ${blueMetrics.physical_ratio}%`}
          />
          <div
            style={{ width: `${blueMetrics.magic_ratio}%` }}
            className="bg-gradient-to-r from-purple-600 to-indigo-500 transition-all duration-500"
            title={`Magic: ${blueMetrics.magic_ratio}%`}
          />
          <div
            style={{ width: `${blueMetrics.true_ratio}%` }}
            className="bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-500"
            title={`True Damage: ${blueMetrics.true_ratio}%`}
          />
        </div>
      </div>

      {/* CC Lockdown & Frontline Durability Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CC Lockdown Score */}
        <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> CC Lockdown Index
            </span>
            <span className="text-xs font-black text-gold-400 font-mono">
              {blueMetrics.cc_score}/100 <span className="text-[10px] text-slate-500 font-normal">vs {redMetrics.cc_score}</span>
            </span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <div
              style={{ width: `${blueMetrics.cc_score}%` }}
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">
            {blueMetrics.cc_score >= 70
              ? "High-impact chain CC (airborne, suppress, stun)."
              : "Moderate CC; coordinate engage with Flicker."}
          </p>
        </div>

        {/* Frontline Durability Rating */}
        <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> Frontline Durability
            </span>
            <span className="text-xs font-black text-cyan-400 font-mono">
              {blueMetrics.durability_score}/100 <span className="text-[10px] text-slate-500 font-normal">vs {redMetrics.durability_score}</span>
            </span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
            <div
              style={{ width: `${blueMetrics.durability_score}%` }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2 line-clamp-1">
            {blueMetrics.durability_score >= 70
              ? "Impenetrable frontline; excellent Turtle zoning."
              : "Light frontline; prioritize kite and flank tactics."}
          </p>
        </div>
      </div>

      {/* Early-Game vs. Late-Game Power Curve */}
      <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gold-400" /> Macro Power Curve (Early / Mid / Late)
          </span>
          <span className="text-[11px] text-slate-400">Blue Curve vs Red Curve</span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          {/* Early */}
          <div className="bg-surface/70 rounded-lg p-2.5 border border-surface-border">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Early (0-5m)</span>
            <div className="text-base font-black text-gold-300 font-mono">
              {blueMetrics.early_curve}%
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Red: {redMetrics.early_curve}%
            </span>
          </div>

          {/* Mid */}
          <div className="bg-surface/70 rounded-lg p-2.5 border border-surface-border">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Mid (5-12m)</span>
            <div className="text-base font-black text-gold-400 font-mono">
              {blueMetrics.mid_curve}%
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Red: {redMetrics.mid_curve}%
            </span>
          </div>

          {/* Late */}
          <div className="bg-surface/70 rounded-lg p-2.5 border border-surface-border">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">Late (12m+)</span>
            <div className="text-base font-black text-amber-300 font-mono">
              {blueMetrics.late_curve}%
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              Red: {redMetrics.late_curve}%
            </span>
          </div>
        </div>
      </div>

      {/* Composition Strengths & Vulnerabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {/* Strengths */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Team Strengths
          </span>
          {blueMetrics.key_strengths.map((str, idx) => (
            <div
              key={idx}
              className="text-xs text-slate-300 bg-emerald-950/20 border border-emerald-500/20 rounded-lg px-2.5 py-1.5"
            >
              • {str}
            </div>
          ))}
        </div>

        {/* Vulnerabilities */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
            <AlertOctagon className="w-3.5 h-3.5" /> Structural Risks
          </span>
          {blueMetrics.vulnerabilities.map((vuln, idx) => (
            <div
              key={idx}
              className="text-xs text-slate-300 bg-rose-950/20 border border-rose-500/20 rounded-lg px-2.5 py-1.5"
            >
              • {vuln}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
