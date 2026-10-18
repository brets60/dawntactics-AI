import React, { useState, useMemo } from 'react';
import { Sparkles, Shield, Swords, RefreshCw, CheckCircle2, Trophy, Flame, ChevronRight, Zap, Target, BookOpen } from 'lucide-react';
import { Lane, Hero } from '../../types/mlbb';
import { HEROES } from '../../data/heroes';
import { 
  TeamComposition, 
  META_COMPOSITIONS, 
  generateDynamicCounterComposition 
} from '../../data/teamCompositions';
import { soundManager } from '../../services/sound';

interface CompositionSuggesterProps {
  enemyTeam: Record<Lane, string | null>;
  allyTeam: Record<Lane, string | null>;
  bansBlue: (string | null)[];
  bansRed: (string | null)[];
  onApplyComposition: (team: 'blue' | 'red', comp: Record<Lane, string>) => void;
  onClose?: () => void;
}

const LANES: Lane[] = ['EXP', 'Jungle', 'Mid', 'Gold', 'Roam'];

const LANE_COLORS: Record<Lane, { border: string; bg: string; text: string; badgeBg: string }> = {
  EXP: { border: 'border-role-exp', bg: 'bg-role-exp/10', text: 'text-role-exp', badgeBg: 'bg-red-500' },
  Jungle: { border: 'border-role-jungle', bg: 'bg-role-jungle/10', text: 'text-role-jungle', badgeBg: 'bg-emerald-500' },
  Mid: { border: 'border-role-mid', bg: 'bg-role-mid/10', text: 'text-role-mid', badgeBg: 'bg-purple-500' },
  Gold: { border: 'border-role-gold', bg: 'bg-role-gold/10', text: 'text-role-gold', badgeBg: 'bg-amber-500' },
  Roam: { border: 'border-role-roam', bg: 'bg-role-roam/10', text: 'text-role-roam', badgeBg: 'bg-blue-500' },
};

export const CompositionSuggester: React.FC<CompositionSuggesterProps> = ({
  enemyTeam,
  allyTeam,
  bansBlue,
  bansRed,
  onApplyComposition,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'counter' | 'meta'>('counter');
  const [selectedMetaId, setSelectedMetaId] = useState<string>(META_COMPOSITIONS[0].id);
  const [appliedFeedback, setAppliedFeedback] = useState<string | null>(null);
  const [counterSeed, setCounterSeed] = useState<number>(0);

  // Dynamic counter comp generated live against opponent's picks
  const dynamicCounterComp = useMemo(() => {
    const validBans = [...bansBlue, ...bansRed].filter((id): id is string => Boolean(id));
    return generateDynamicCounterComposition(enemyTeam, validBans, allyTeam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enemyTeam, bansBlue, bansRed, allyTeam, counterSeed]);

  const activeComp: TeamComposition = useMemo(() => {
    if (activeTab === 'counter') {
      return dynamicCounterComp;
    }
    return META_COMPOSITIONS.find(c => c.id === selectedMetaId) || META_COMPOSITIONS[0];
  }, [activeTab, dynamicCounterComp, selectedMetaId]);

  const handleApply = (team: 'blue' | 'red') => {
    soundManager.playGoldChime();
    onApplyComposition(team, activeComp.heroes);
    setAppliedFeedback(`Applied "${activeComp.name}" to ${team === 'blue' ? 'Blue' : 'Red'} Team!`);
    setTimeout(() => {
      setAppliedFeedback(null);
    }, 3500);
  };

  const enemyPicksCount = Object.values(enemyTeam).filter(Boolean).length;

  return (
    <div className="bg-surface border border-surface-borderLight rounded-2xl p-4 sm:p-6 shadow-2xl space-y-5 animate-fadeIn">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-100 font-['Cinzel',serif] tracking-wider flex items-center gap-2">
              5-Man Composition Intelligence
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40">
                PRO INTEL
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete 5-man lane allocations, power curve analytics, tactical combo sequences & win conditions
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center space-x-1.5 bg-canvas/80 p-1 rounded-xl border border-surface-border">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('counter');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'counter'
                ? 'bg-gold-500 text-slate-950 shadow-mythic-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Dynamic Counter Comp</span>
            {enemyPicksCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('meta');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'meta'
                ? 'bg-gold-500 text-slate-950 shadow-mythic-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Pro Meta Comps ({META_COMPOSITIONS.length})</span>
          </button>
        </div>
      </div>

      {/* Meta Selector Chips if Meta Tab is active */}
      {activeTab === 'meta' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {META_COMPOSITIONS.map((comp) => {
            const isSelected = comp.id === selectedMetaId;
            return (
              <button
                key={comp.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedMetaId(comp.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-surface-elevated text-gold-400 border-gold-500/70 shadow-mythic-gold'
                    : 'bg-canvas/60 text-slate-400 hover:text-slate-200 border-surface-border'
                }`}
              >
                {comp.name.split('&')[0].trim()}
              </button>
            );
          })}
        </div>
      )}

      {/* Dynamic Tab Sub-bar with Re-roll button */}
      {activeTab === 'counter' && (
        <div className="bg-canvas/50 border border-surface-border rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-300 font-medium">
              Targeting Red Team Draft:
            </span>
            <span className="text-slate-400 font-mono">
              {enemyPicksCount} Opponent Hero{enemyPicksCount === 1 ? '' : 'es'} Analyzed
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              setCounterSeed(prev => prev + 1);
            }}
            className="flex items-center space-x-1 text-gold-400 hover:text-gold-300 font-semibold px-2.5 py-1 rounded-md bg-gold-500/10 hover:bg-gold-500/20 border border-gold-500/30 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Re-Generate Counter</span>
          </button>
        </div>
      )}

      {/* Active Composition Showcase Card */}
      <div className="bg-surface-elevated border border-surface-border rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
        {/* Comp Title & Tagline */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-surface-border/60 pb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {activeComp.archetype}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-surface-subtle text-slate-300 border border-surface-border">
                Difficulty: {activeComp.difficulty}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gold-300 font-['Cinzel',serif] tracking-wide">
              {activeComp.name}
            </h3>
            <p className="text-xs text-slate-400 italic mt-0.5">
              "{activeComp.tagline}"
            </p>
          </div>

          {/* Power Curve Bars */}
          <div className="bg-canvas/70 border border-surface-border rounded-lg p-2.5 min-w-[200px]">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center justify-between">
              <span>Power Curve Scaling</span>
              <Zap className="w-3 h-3 text-amber-400" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              <div>
                <span className="text-slate-400 block mb-0.5">Early</span>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${activeComp.power_curve.early * 10}%` }} 
                  />
                </div>
                <span className="font-bold text-slate-200 mt-0.5 block">{activeComp.power_curve.early}/10</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Mid</span>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${activeComp.power_curve.mid * 10}%` }} 
                  />
                </div>
                <span className="font-bold text-slate-200 mt-0.5 block">{activeComp.power_curve.mid}/10</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Late</span>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full" 
                    style={{ width: `${activeComp.power_curve.late * 10}%` }} 
                  />
                </div>
                <span className="font-bold text-slate-200 mt-0.5 block">{activeComp.power_curve.late}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Lane Hero Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {LANES.map((lane) => {
            const heroId = activeComp.heroes[lane];
            const hero = HEROES.find(h => h.id === heroId);
            const laneStyle = LANE_COLORS[lane];

            if (!hero) return null;

            return (
              <div
                key={lane}
                className="group relative bg-surface border border-surface-border rounded-xl p-3 flex flex-col justify-between hover:border-gold-500/50 hover:bg-surface-elevated transition-all"
              >
                {/* Lane Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${laneStyle.border}/40 ${laneStyle.bg} ${laneStyle.text}`}>
                    {lane}
                  </span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                    hero.damage_type === 'Magic' 
                      ? 'bg-purple-950/70 text-purple-300' 
                      : hero.damage_type === 'True' 
                      ? 'bg-amber-950/70 text-amber-300' 
                      : 'bg-red-950/70 text-red-300'
                  }`}>
                    {hero.damage_type}
                  </span>
                </div>

                {/* Hero Avatar & Name */}
                <div className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0 space-y-0 sm:space-y-2 my-1">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-surface-borderLight group-hover:border-gold-400/80 shadow-md relative shrink-0 bg-slate-900">
                    <img
                      src={`/heroes/${hero.id}.png`}
                      alt={hero.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-xs uppercase text-slate-300">
                      {hero.name.slice(0, 2)}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm group-hover:text-gold-300 transition-colors">
                      {hero.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">{hero.role}</p>
                  </div>
                </div>

                {/* Tactical Role Duty */}
                <div className="mt-2 pt-2 border-t border-surface-border/50 text-[11px] text-slate-400 line-clamp-2" title={activeComp.lane_duties[lane]}>
                  {activeComp.lane_duties[lane]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical Strategy & Gameplan Breakdown */}
        <div className="bg-canvas/50 border border-surface-border rounded-xl p-4 space-y-3.5">
          {/* Win Condition Callout */}
          <div className="bg-gold-500/10 border border-gold-500/30 rounded-lg p-3">
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5 mb-1">
              <Target className="w-3.5 h-3.5 text-gold-400" />
              Strategic Win Condition
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {activeComp.explanation.win_condition}
            </p>
          </div>

          {/* Macro Timeline (Early, Mid, Late) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-surface rounded-lg p-3 border border-surface-border">
              <span className="text-[11px] font-bold uppercase text-emerald-400 flex items-center gap-1 mb-1">
                🟢 Early Game (0-5m)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeComp.explanation.early_game}
              </p>
            </div>

            <div className="bg-surface rounded-lg p-3 border border-surface-border">
              <span className="text-[11px] font-bold uppercase text-blue-400 flex items-center gap-1 mb-1">
                🟡 Mid Game (5-12m)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeComp.explanation.mid_game}
              </p>
            </div>

            <div className="bg-surface rounded-lg p-3 border border-surface-border">
              <span className="text-[11px] font-bold uppercase text-purple-400 flex items-center gap-1 mb-1">
                🔴 Late Game (12m+)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeComp.explanation.late_game}
              </p>
            </div>
          </div>

          {/* Key Teamfight Combo Chain */}
          <div className="bg-surface rounded-lg p-3 border border-surface-border">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Prescribed 5v5 Teamfight Combo Sequence
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
              {activeComp.explanation.key_combos.map((combo, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-canvas border border-surface-border text-[11px] text-slate-300 flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] text-gold-400 font-bold mb-0.5">
                    Stage {idx + 1}
                  </span>
                  <span className="leading-snug">{combo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons: Apply to Blue or Red Team */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {appliedFeedback ? (
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs bg-emerald-950/40 border border-emerald-500/40 px-3 py-2 rounded-xl w-full sm:w-auto animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{appliedFeedback}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-400">
              Select team to apply this complete 5-man roster to the live draft board:
            </span>
          )}

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={() => handleApply('blue')}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-blue-500/20 active:scale-95"
            >
              <Shield className="w-4 h-4" />
              <span>Apply to Blue Team</span>
            </button>

            <button
              onClick={() => handleApply('red')}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-red-500/20 active:scale-95"
            >
              <Swords className="w-4 h-4" />
              <span>Apply to Red Team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
