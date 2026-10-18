import React, { useState } from 'react';
import { BATTLE_SPELLS } from '../../data/tacticalKnowledge';
import { BattleSpell } from '../../types/mlbb';
import { Clock, Shield, Search, Zap } from 'lucide-react';

export const CooldownReference: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = BATTLE_SPELLS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.tactical_use.toLowerCase().includes(search.toLowerCase()) ||
    s.best_roles.some(r => r.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-3">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5 font-['Rajdhani',sans-serif]">
            <Clock className="w-4 h-4 text-gold-400" /> Battle Spell Cooldown & Tactical Index
          </h3>
          <p className="text-xs text-slate-400">
            Track these precise cooldown windows to punish enemy carries when their defensive spells are down!
          </p>
        </div>

        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter spell or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-canvas border border-surface-border rounded-lg text-xs text-slate-200 focus:outline-none focus:border-gold-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((spell) => (
          <div
            key={spell.id}
            className="bg-surface-elevated border border-surface-borderLight rounded-xl p-3.5 hover:border-gold-500/40 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-sm font-bold text-slate-100">{spell.name}</h4>
                <span className="text-xs font-mono font-bold text-gold-400 bg-surface px-2 py-0.5 rounded border border-surface-border">
                  {spell.cooldown}s CD
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{spell.description}</p>
              <div className="mt-2 text-[11px] text-slate-400 bg-surface/70 rounded-lg p-2 border border-surface-border">
                <strong className="text-gold-300">Tactical Window: </strong> {spell.tactical_use}
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-surface-border flex items-center justify-between text-[10px] text-slate-500">
              <span>Best On:</span>
              <div className="flex gap-1">
                {spell.best_roles.map((role) => (
                  <span key={role} className="px-1.5 py-0.2 rounded bg-surface border border-surface-border text-slate-300">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
