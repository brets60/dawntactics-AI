import React from 'react';
import { Trophy, ShieldAlert, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

interface WinRateGaugeProps {
  blueWinRate: number; // 0 to 100
  ccDelta: number;
  durabilityDelta: number;
}

export const WinRateGauge: React.FC<WinRateGaugeProps> = ({
  blueWinRate,
  ccDelta,
  durabilityDelta,
}) => {
  const redWinRate = 100 - blueWinRate;
  const isBlueFavored = blueWinRate >= 50;

  // Arc calculation for SVG semi-circle gauge (180 degrees)
  // Radius = 75, Circumference = Math.PI * 75 = ~235.6
  const radius = 75;
  const arcLength = Math.PI * radius;
  // Needle rotation: 0% -> -90deg, 50% -> 0deg, 100% -> 90deg
  const needleAngle = (blueWinRate - 50) * 1.8;

  return (
    <div className="bg-surface border border-surface-border rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full flex items-center justify-between text-xs font-semibold px-2 mb-1">
        <span className="text-blue-400 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-blue-500" /> Blue Win Rate
        </span>
        <span className="text-gold-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Predicted Victory Prob.
        </span>
        <span className="text-red-400 flex items-center gap-1">
          Red Win Rate <span className="w-2 h-2 rounded-full bg-red-500" />
        </span>
      </div>

      {/* SVG Arc Gauge */}
      <div className="relative w-56 h-32 flex items-center justify-center">
        <svg viewBox="0 0 200 115" className="w-full h-full overflow-visible">
          {/* Background Track */}
          <path
            d="M 25 100 A 75 75 0 0 1 175 100"
            fill="none"
            stroke="#1F2937"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Red Team Arc Segment */}
          <path
            d="M 25 100 A 75 75 0 0 1 175 100"
            fill="none"
            stroke="#EF4444"
            strokeWidth="14"
            strokeDasharray={`${arcLength}`}
            strokeDashoffset="0"
            strokeLinecap="round"
            className="opacity-70"
          />

          {/* Blue Team Arc Segment */}
          <path
            d="M 25 100 A 75 75 0 0 1 175 100"
            fill="none"
            stroke="url(#blueGoldGradient)"
            strokeWidth="14"
            strokeDasharray={`${(blueWinRate / 100) * arcLength} ${arcLength}`}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="blueGoldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="60%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Gauge Center Pin & Needle */}
          <g
            transform={`translate(100, 100) rotate(${needleAngle})`}
            className="transition-transform duration-700 ease-out"
          >
            <line x1="0" y1="0" x2="0" y2="-65" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="0" cy="0" r="7" fill="#F59E0B" />
            <circle cx="0" cy="0" r="3.5" fill="#0A0E17" />
          </g>
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute bottom-0 text-center flex flex-col items-center">
          <div className="text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold-400 to-amber-500 font-['Rajdhani',sans-serif]">
            {blueWinRate}% <span className="text-sm text-slate-400 font-normal">vs</span> {redWinRate}%
          </div>
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
              isBlueFavored
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'bg-red-500/20 text-red-300 border border-red-500/40'
            }`}
          >
            {isBlueFavored ? 'Blue Team Advantage' : 'Red Team Advantage'}
          </span>
        </div>
      </div>

      {/* Advantage Factor Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 pt-2 border-t border-surface-border w-full">
        {ccDelta !== 0 && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-surface-elevated text-slate-300 border border-surface-borderLight flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-gold-400" />
            CC Spread: <span className={ccDelta > 0 ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'}>{ccDelta > 0 ? `+${ccDelta}` : ccDelta}</span>
          </span>
        )}
        {durabilityDelta !== 0 && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-surface-elevated text-slate-300 border border-surface-borderLight flex items-center gap-1">
            <ShieldAlert className="w-3 h-3 text-cyan-400" />
            Frontline: <span className={durabilityDelta > 0 ? 'text-blue-400 font-bold' : 'text-red-400 font-bold'}>{durabilityDelta > 0 ? `+${durabilityDelta}` : durabilityDelta}</span>
          </span>
        )}
      </div>
    </div>
  );
};
