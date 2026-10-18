import React, { useState } from 'react';
import { Item } from '../../types/mlbb';
import { Shield, Sparkles, Coins, Zap } from 'lucide-react';

interface ItemTooltipProps {
  item: Item;
  children?: React.ReactNode;
  showBadgeOnly?: boolean;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = ({ item, children, showBadgeOnly }) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors: Record<string, string> = {
    Physical: 'border-red-500/40 text-red-400 bg-red-950/30',
    Attack: 'border-red-500/40 text-red-400 bg-red-950/30',
    Magic: 'border-purple-500/40 text-purple-400 bg-purple-950/30',
    Defense: 'border-blue-500/40 text-blue-400 bg-blue-950/30',
    'Core Boots': 'border-amber-500/40 text-amber-400 bg-amber-950/30',
    'Roam Boots': 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
    Movement: 'border-amber-500/40 text-amber-400 bg-amber-950/30',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children ? (
        children
      ) : (
        <div
          className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-surface border hover:border-gold-400 transition-all cursor-pointer shadow-md ${
            categoryColors[item.category] || 'border-surface-border'
          }`}
        >
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gold-500/30 bg-slate-900 shrink-0 shadow-sm flex items-center justify-center">
            <img
              src={`/items/${item.id}.png`}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // fallback if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-slate-100">{item.name}</div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <Coins className="w-2.5 h-2.5 text-gold-400" /> {item.cost} Gold
            </div>
          </div>
        </div>
      )}

      {/* Floating Hover Card */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 bg-surface-elevated border border-gold-500/40 rounded-xl shadow-2xl p-3.5 z-50 pointer-events-none animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-surface-border pb-2 mb-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-11 h-11 rounded-lg overflow-hidden border border-gold-500/50 bg-slate-900 shrink-0 shadow-md">
                <img
                  src={`/items/${item.id}.png`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-100 font-['Cinzel',serif]">{item.name}</h4>
                <span className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${categoryColors[item.category]}`}>
                  {item.category}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-gold-400 flex items-center gap-1 font-mono">
              <Coins className="w-3 h-3" /> {item.cost}
            </span>
          </div>

          {/* Stats */}
          <div className="text-[11px] font-semibold text-emerald-400 mb-2">
            {item.stats}
          </div>

          {/* Unique Passive */}
          <div className="text-xs text-slate-300 leading-relaxed bg-surface/80 rounded-lg p-2 border border-surface-border mb-2">
            <span className="font-bold text-amber-400">Passive: </span>
            {item.passive}
          </div>

          {/* Trigger Condition */}
          {item.trigger_condition && (
            <div className="text-[10px] text-slate-400 mb-2 flex items-start gap-1">
              <Zap className="w-3 h-3 text-gold-400 shrink-0 mt-0.5" />
              <span><strong className="text-slate-300">Trigger:</strong> {item.trigger_condition}</span>
            </div>
          )}

          {/* Counter Tags */}
          <div className="flex flex-wrap gap-1 pt-1 border-t border-surface-border">
            {item.counter_tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-gold-500/10 text-gold-300 border border-gold-500/30"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
