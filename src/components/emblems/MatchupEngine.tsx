import React, { useState } from 'react';
import { Hero } from '../../types/mlbb';
import { HEROES } from '../../data/heroes';
import { BASE_EMBLEMS, TALENTS_TIER_1, TALENTS_TIER_2, TALENTS_TIER_3, EMBLEM_PRESETS } from '../../data/emblems';
import { Sparkles, Swords, ArrowRight, ShieldCheck, Zap, Check } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface MatchupEngineProps {
  onApplyPreset: (baseEmblemId: string, t1Id: string, t2Id: string, t3Id: string) => void;
}

export const MatchupEngine: React.FC<MatchupEngineProps> = ({ onApplyPreset }) => {
  const [selectedHeroId, setSelectedHeroId] = useState<string>('ruby');
  const [selectedOpponentId, setSelectedOpponentId] = useState<string>('terizla');
  const [applied, setApplied] = useState(false);

  const hero = HEROES.find(h => h.id === selectedHeroId) || HEROES[2];
  const opponent = HEROES.find(h => h.id === selectedOpponentId) || HEROES[5];

  // Look for predefined preset or dynamic mapping
  const preset = EMBLEM_PRESETS.find(p => p.hero_id === hero.id);

  // Map talent names to IDs
  const baseEmblem = BASE_EMBLEMS.find(b => b.name.toLowerCase() === (preset?.base_emblem || 'fighter').toLowerCase()) || BASE_EMBLEMS[1];
  
  // Find Tier 1
  let t1 = TALENTS_TIER_1.find(t => preset?.tier_1.toLowerCase().includes(t.name.toLowerCase())) || TALENTS_TIER_1[0];
  // Find Tier 2
  let t2 = TALENTS_TIER_2.find(t => preset?.tier_2.toLowerCase().includes(t.name.toLowerCase())) || TALENTS_TIER_2[4];
  // Find Tier 3
  let t3 = TALENTS_TIER_3.find(t => preset?.tier_3.toLowerCase().includes(t.name.toLowerCase())) || TALENTS_TIER_3[1];

  // Specific dynamic adaptations if fighting a hard matchup
  let adaptiveNote = preset?.situational_alternative || `Against ${opponent.name}: Consider defensive adjustments if taking high poke.`;
  if (opponent.damage_type === 'Magic' && t1.id === 'thrill') {
    adaptiveNote = `Against ${opponent.name}'s continuous Magic damage: Swapping Tier 1 node to Firmness (+6 Hybrid Defense) reduces early lane trading attrition.`;
  }

  const handleApply = () => {
    soundManager.playLockIn();
    onApplyPreset(baseEmblem.id, t1.id, t2.id, t3.id);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  return (
    <div className="bg-surface border border-surface-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-border pb-4 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              Matchup-Adaptive Engine
            </span>
            <span className="text-xs text-slate-400">• Dynamic Talent Optimization</span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 mt-1 font-['Cinzel',serif]">
            Lane Matchup Talent Calculator
          </h3>
        </div>

        <button
          onClick={handleApply}
          className="px-4 py-2 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-mythic-gold transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          {applied ? <Check className="w-4 h-4 text-slate-950 stroke-[3]" /> : <Sparkles className="w-4 h-4" />}
          {applied ? 'Applied to Builder!' : 'Apply Trio to Builder'}
        </button>
      </div>

      {/* Hero & Opponent Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Your Hero */}
        <div className="bg-surface-elevated rounded-xl p-4 border border-surface-borderLight">
          <label className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-1.5">
            Your Hero:
          </label>
          <select
            value={selectedHeroId}
            onChange={(e) => {
              soundManager.playClick();
              setSelectedHeroId(e.target.value);
            }}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-sm text-slate-100 font-bold focus:outline-none focus:border-gold-500 cursor-pointer"
          >
            {HEROES.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.role} • {h.primary_lane})
              </option>
            ))}
          </select>

          <div className="mt-2 text-xs text-slate-400 flex items-center space-x-2">
            <span>Role: <strong className="text-slate-200">{hero.role}</strong></span>
            <span>•</span>
            <span>Damage: <strong className="text-amber-400">{hero.damage_type}</strong></span>
          </div>
        </div>

        {/* Lane Opponent */}
        <div className="bg-surface-elevated rounded-xl p-4 border border-surface-borderLight">
          <label className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-1.5">
            Direct Lane Opponent:
          </label>
          <select
            value={selectedOpponentId}
            onChange={(e) => {
              soundManager.playClick();
              setSelectedOpponentId(e.target.value);
            }}
            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-sm text-slate-100 font-bold focus:outline-none focus:border-red-500 cursor-pointer"
          >
            {HEROES.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.role} • {h.primary_lane})
              </option>
            ))}
          </select>

          <div className="mt-2 text-xs text-slate-400 flex items-center space-x-2">
            <span>Threat: <strong className="text-red-300">{opponent.threat_profile.slice(0, 55)}...</strong></span>
          </div>
        </div>
      </div>

      {/* Optimal Trio Recommendation Display */}
      <div className="bg-surface-elevated border border-gold-500/40 rounded-2xl p-5 shadow-mythic-glow space-y-4">
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-gold-300 font-['Rajdhani',sans-serif]">
              Optimal 3-Tier Talent Trio: {hero.name} vs. {opponent.name}
            </h4>
          </div>
          <span className="text-xs font-bold text-slate-300 bg-surface px-2.5 py-1 rounded-lg border border-surface-border">
            Base: {baseEmblem.name} Emblem
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Tier 1 Node */}
          <div className="bg-surface rounded-xl p-3.5 border border-surface-border flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-gold-500/30 p-1 flex items-center justify-center shrink-0 shadow-md">
              <img
                src={`/talents/${t1.id}.png`}
                alt={t1.name}
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="text-xl absolute pointer-events-none">{t1.icon}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400">Tier 1 (Stats)</span>
              <h5 className="text-xs font-bold text-slate-100">{t1.name}</h5>
              <p className="text-[11px] text-slate-400 mt-1">{t1.effect}</p>
            </div>
          </div>

          {/* Tier 2 Node */}
          <div className="bg-surface rounded-xl p-3.5 border border-surface-border flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 p-1 flex items-center justify-center shrink-0 shadow-md">
              <img
                src={`/talents/${t2.id}.png`}
                alt={t2.name}
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="text-xl absolute pointer-events-none">{t2.icon}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400">Tier 2 (Combat Utility)</span>
              <h5 className="text-xs font-bold text-slate-100">{t2.name}</h5>
              <p className="text-[11px] text-slate-400 mt-1">{t2.effect}</p>
            </div>
          </div>

          {/* Tier 3 Node */}
          <div className="bg-surface rounded-xl p-3.5 border border-surface-border flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-purple-500/30 p-1 flex items-center justify-center shrink-0 shadow-md">
              <img
                src={`/talents/${t3.id}.png`}
                alt={t3.name}
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <span className="text-xl absolute pointer-events-none">{t3.icon}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-400">Tier 3 (Core Keystone)</span>
              <h5 className="text-xs font-bold text-gold-400">{t3.name}</h5>
              <p className="text-[11px] text-slate-400 mt-1">{t3.effect}</p>
            </div>
          </div>
        </div>

        {/* Synergy Rationale */}
        <div className="bg-surface/80 rounded-xl p-3.5 border border-surface-border text-xs text-slate-300 space-y-1.5">
          <div>
            <strong className="text-gold-400">Core Synergy Rationale: </strong>
            <span>{preset?.synergy_rationale || `Maximizes ${hero.name}'s performance against ${opponent.name} in lane.`}</span>
          </div>
          <div className="pt-1.5 border-t border-surface-border/60 text-slate-400">
            <strong className="text-cyan-400">Matchup-Adaptive Note: </strong>
            <span>{adaptiveNote}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
