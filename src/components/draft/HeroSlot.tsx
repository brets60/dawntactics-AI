import React from 'react';
import { Zap, X, Crosshair, Plus, RefreshCw } from 'lucide-react';
import { Hero, Lane } from '../../types/mlbb';
import { soundManager } from '../../services/sound';

interface HeroSlotProps {
  lane: Lane;
  hero: Hero | null;
  team: 'blue' | 'red';
  isSelectedForCounter: boolean;
  onSelectSlot: () => void;
  onClearSlot: () => void;
  onFocusCounter: () => void;
}

export const HeroSlot: React.FC<HeroSlotProps> = ({
  lane,
  hero,
  team,
  isSelectedForCounter,
  onSelectSlot,
  onClearSlot,
  onFocusCounter,
}) => {
  const roleColors: Record<Lane, { border: string; bg: string; text: string; dot: string }> = {
    EXP: { border: 'border-role-exp', bg: 'bg-role-exp/10', text: 'text-role-exp', dot: 'bg-role-exp' },
    Jungle: { border: 'border-role-jungle', bg: 'bg-role-jungle/10', text: 'text-role-jungle', dot: 'bg-role-jungle' },
    Mid: { border: 'border-role-mid', bg: 'bg-role-mid/10', text: 'text-role-mid', dot: 'bg-role-mid' },
    Gold: { border: 'border-role-gold', bg: 'bg-role-gold/10', text: 'text-role-gold', dot: 'bg-role-gold' },
    Roam: { border: 'border-role-roam', bg: 'bg-role-roam/10', text: 'text-role-roam', dot: 'bg-role-roam' },
  };

  const laneInfo = roleColors[lane];

  if (!hero) {
    return (
      <div
        onClick={() => {
          soundManager.playClick();
          onSelectSlot();
        }}
        className={`group relative rounded-xl border-2 border-dashed p-3 transition-all cursor-pointer flex items-center justify-between min-h-[76px] ${
          team === 'blue'
            ? 'border-blue-500/30 hover:border-blue-400/80 hover:bg-blue-500/5'
            : 'border-red-500/30 hover:border-red-400/80 hover:bg-red-500/5'
        } bg-surface/40`}
      >
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg ${laneInfo.bg} border ${laneInfo.border}/40 flex items-center justify-center font-bold text-xs ${laneInfo.text}`}>
            {lane.slice(0, 3)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${laneInfo.text}`}>
                {lane} Lane
              </span>
            </div>
            <span className="text-xs text-slate-400 group-hover:text-slate-200 flex items-center gap-1 mt-0.5">
              <Plus className="w-3.5 h-3.5 text-gold-400" /> Select Draft Hero
            </span>
          </div>
        </div>

        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
          Empty Slot
        </span>
      </div>
    );
  }

  return (
    <div
      className={`group relative rounded-xl border p-3 transition-all flex items-center justify-between min-h-[76px] ${
        isSelectedForCounter
          ? 'ring-2 ring-gold-400 border-gold-400 shadow-mythic-gold bg-surface-elevated'
          : team === 'blue'
          ? 'border-blue-500/40 bg-surface hover:border-blue-400 hover:bg-surface-elevated'
          : 'border-red-500/40 bg-surface hover:border-red-400 hover:bg-surface-elevated'
      }`}
    >
      <div
        onClick={() => {
          soundManager.playClick();
          onSelectSlot();
        }}
        title="Click to change/swap hero"
        className="flex items-center space-x-3 cursor-pointer flex-1"
      >
        {/* Avatar badge */}
        <div
          className={`relative w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center font-black text-sm tracking-wider border shadow-md shrink-0 group-hover:ring-1 group-hover:ring-gold-400/60 ${
            team === 'blue'
              ? 'bg-gradient-to-br from-blue-900 to-slate-900 border-blue-400 text-blue-100'
              : 'bg-gradient-to-br from-red-900 to-slate-900 border-red-400 text-red-100'
          }`}
        >
          <img
            src={`/heroes/${hero.id}.png`}
            alt={hero.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <span className="absolute text-xs uppercase font-bold">{hero.name.slice(0, 2)}</span>
          <span
            className={`absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border border-surface ${laneInfo.dot} z-10`}
            title={`${lane} Lane`}
          />
        </div>

        {/* Hero Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-100 text-sm tracking-wide group-hover:text-gold-300 transition-colors truncate">
              {hero.name}
            </span>
            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded border ${laneInfo.border}/40 ${laneInfo.bg} ${laneInfo.text}`}>
              {lane}
            </span>
          </div>

          <div className="flex items-center space-x-2 mt-0.5 text-[11px] text-slate-400">
            <span className="text-slate-300 font-medium">{hero.role}</span>
            <span>•</span>
            <span
              className={
                hero.damage_type === 'Magic'
                  ? 'text-purple-400 font-medium'
                  : hero.damage_type === 'True'
                  ? 'text-amber-400 font-medium'
                  : 'text-red-400 font-medium'
              }
            >
              {hero.damage_type}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-slate-400">
              <Zap className="w-2.5 h-2.5 text-amber-400" /> {hero.mobility_tier}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-1.5 pl-2">
        {/* Change / Swap Hero button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playClick();
            onSelectSlot();
          }}
          title="Change / Swap Hero"
          className="p-1.5 rounded-lg bg-surface-elevated text-slate-400 hover:text-gold-400 hover:bg-gold-500/10 border border-surface-border hover:border-gold-500/40 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Analyze / Target Counter button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playClick();
            onFocusCounter();
          }}
          title={team === 'red' ? "Generate Counter Recommendations against this pick" : "View Matchup Synergies"}
          className={`p-1.5 rounded-lg border text-xs transition-colors ${
            isSelectedForCounter
              ? 'bg-gold-500 text-slate-950 border-gold-400 font-bold shadow-mythic-glow'
              : 'bg-surface-elevated text-slate-400 hover:text-gold-400 border-surface-border hover:border-gold-500/40'
          }`}
        >
          <Crosshair className="w-3.5 h-3.5" />
        </button>

        {/* Clear slot */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundManager.playClick();
            onClearSlot();
          }}
          title="Remove Hero"
          className="p-1.5 rounded-lg bg-surface-elevated text-slate-500 hover:text-red-400 border border-surface-border hover:border-red-500/40 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
