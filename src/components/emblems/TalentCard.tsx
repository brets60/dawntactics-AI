import React from 'react';
import { Talent } from '../../types/mlbb';
import { Clock, Check } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface TalentCardProps {
  talent: Talent;
  isSelected: boolean;
  onSelect: () => void;
}

export const TalentCard: React.FC<TalentCardProps> = ({ talent, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => {
        soundManager.playClick();
        onSelect();
      }}
      className={`group relative rounded-xl p-3 border transition-all cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'bg-amber-950/30 border-gold-400 shadow-mythic-glow ring-2 ring-gold-400/80 scale-[1.02]'
          : 'bg-surface hover:bg-surface-elevated border-surface-border hover:border-surface-borderLight'
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          {/* Authentic Talent Icon */}
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-900 border border-gold-500/30 p-1 flex items-center justify-center shrink-0 shadow-md group-hover:border-gold-400 group-hover:shadow-mythic-gold transition-all relative">
            <img
              src={`/talents/${talent.id}.png`}
              alt={talent.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-base absolute pointer-events-none">{talent.icon}</span>
          </div>

          <div className="flex items-center space-x-1">
            {talent.cooldown && (
              <span className="text-[10px] font-mono text-slate-400 bg-surface px-1.5 py-0.5 rounded border border-surface-border flex items-center gap-0.5">
                <Clock className="w-2.5 h-2.5 text-gold-400" /> {talent.cooldown}
              </span>
            )}
            {isSelected && (
              <span className="w-5 h-5 rounded-full bg-gold-500 text-slate-950 flex items-center justify-center shadow-md">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
            )}
          </div>
        </div>

        <h4 className="text-xs font-bold text-slate-100 group-hover:text-gold-300 leading-tight font-['Rajdhani',sans-serif]">
          {talent.name}
        </h4>

        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-3">
          {talent.effect}
        </p>
      </div>

      <div className="mt-2.5 pt-2 border-t border-surface-border/60 flex items-center justify-between text-[10px] text-slate-500">
        <span className="uppercase font-bold tracking-wider text-gold-500/80">
          Tier {talent.tier}
        </span>
        <span className="truncate max-w-[110px] text-slate-400">
          {talent.recommended_roles.slice(0, 2).join(', ')}
        </span>
      </div>
    </div>
  );
};
