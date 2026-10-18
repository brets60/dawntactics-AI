import React from 'react';
import { Hero, CounterRecommendation } from '../../types/mlbb';
import { ShieldAlert, Crosshair, Users, Ban, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface CounterPanelProps {
  recommendation: CounterRecommendation | null;
  onPickCounterHero?: (hero: Hero) => void;
}

export const CounterPanel: React.FC<CounterPanelProps> = ({
  recommendation,
  onPickCounterHero,
}) => {
  if (!recommendation) {
    return (
      <div className="bg-surface border border-surface-border rounded-2xl p-6 text-center text-slate-400 flex flex-col items-center justify-center min-h-[300px]">
        <Crosshair className="w-10 h-10 text-gold-500/40 mb-3 animate-pulse" />
        <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-['Rajdhani',sans-serif]">
          Target Analysis Mode
        </h4>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          Click any <span className="text-red-400 font-semibold">Red Team</span> or <span className="text-blue-400 font-semibold">Blue Team</span> slot to generate dynamic hard counters, synergistic partner picks, and ban recommendations!
        </p>
      </div>
    );
  }

  const { enemy_hero, hard_counters, synergy_partners, ban_recommendations } = recommendation;

  return (
    <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-2xl space-y-5">
      {/* Target Header */}
      <div className="flex items-center justify-between border-b border-surface-border pb-3 bg-surface-subtle -mx-5 -mt-5 p-5 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 border-2 border-red-500/50 flex items-center justify-center font-black text-red-200 text-lg shadow-lg shrink-0 relative">
            <img
              src={`/heroes/${enemy_hero.id}.png`}
              alt={enemy_hero.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="absolute text-sm uppercase font-bold">{enemy_hero.name.slice(0, 2)}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase font-bold text-red-400">Target Intel</span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-400">{enemy_hero.primary_lane} Lane {enemy_hero.role}</span>
            </div>
            <h3 className="text-lg font-black text-slate-100 font-['Cinzel',serif] tracking-wide">
              {enemy_hero.name} Threat Analysis
            </h3>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Mobility Tier</span>
          <span className="text-sm font-bold text-amber-400 flex items-center justify-end gap-1">
            <Zap className="w-3.5 h-3.5" /> {enemy_hero.mobility_tier}
          </span>
        </div>
      </div>

      {/* Threat Profile Rationale */}
      <div className="bg-red-950/20 border border-red-500/20 rounded-xl p-3 text-xs text-slate-300">
        <span className="font-bold text-red-400 flex items-center gap-1 mb-1">
          <AlertTriangle className="w-3.5 h-3.5" /> Threat Profile & Exploitation:
        </span>
        {enemy_hero.threat_profile}
      </div>

      {/* Hard Counter Picks */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5" /> Priority Hard Counters
          </h4>
          <span className="text-[11px] text-slate-400">Direct neutralization</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {hard_counters.map(({ hero, rationale, lane_matchup }) => (
            <div
              key={hero.id}
              className="group bg-surface-elevated hover:bg-surface-elevated/80 border border-surface-borderLight hover:border-gold-500/50 rounded-xl p-3 transition-all flex items-start justify-between"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 border border-gold-500/40 flex items-center justify-center font-bold text-xs text-gold-300 shrink-0 shadow-sm relative">
                  <img
                    src={`/heroes/${hero.id}.png`}
                    alt={hero.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute text-[10px] uppercase font-bold">{hero.name.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-100 group-hover:text-gold-300 transition-colors">
                      {hero.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-surface-border text-slate-400">
                      {hero.role}
                    </span>
                    {lane_matchup && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {lane_matchup}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rationale}</p>
                </div>
              </div>

              {onPickCounterHero && (
                <button
                  onClick={() => {
                    soundManager.playLockIn();
                    onPickCounterHero(hero);
                  }}
                  className="px-2.5 py-1 text-xs font-semibold bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-slate-950 border border-gold-500/30 rounded-lg transition-all shrink-0 ml-2"
                >
                  Pick
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Synergistic Partner Picks & Ban Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-surface-border">
        {/* Synergies */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> High-Synergy Teammates
          </h4>
          <div className="space-y-1.5">
            {synergy_partners.map(({ hero, rationale }) => (
              <div
                key={hero.id}
                className="bg-surface-elevated/60 border border-surface-borderLight rounded-lg p-2 text-xs"
              >
                <div className="font-bold text-slate-200">{hero.name} ({hero.role})</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{rationale}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Bans */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Ban className="w-3.5 h-3.5" /> Recommended Ban Denials
          </h4>
          <div className="space-y-1.5">
            {ban_recommendations.map(({ hero, urgency, reason }) => (
              <div
                key={hero.id}
                className="bg-surface-elevated/60 border border-surface-borderLight rounded-lg p-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{hero.name}</span>
                  <span
                    className={`text-[9px] uppercase font-black px-1.5 py-0.2 rounded border ${
                      urgency === 'Critical'
                        ? 'bg-red-500/20 text-red-400 border-red-500/40'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    }`}
                  >
                    {urgency} Ban
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{reason}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
