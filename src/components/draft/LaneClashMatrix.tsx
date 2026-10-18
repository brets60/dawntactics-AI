import React, { useState } from 'react';
import { Lane, Hero, BattleSpell } from '../../types/mlbb';
import { HEROES } from '../../data/heroes';
import { BATTLE_SPELLS } from '../../data/tacticalKnowledge';
import { Swords, Shield, Zap, AlertTriangle, CheckCircle, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface LaneClashMatrixProps {
  blueTeam: Record<Lane, string | null>;
  redTeam: Record<Lane, string | null>;
  blueSpells: Record<Lane, string>;
  redSpells: Record<Lane, string>;
  onUpdateSpell: (team: 'blue' | 'red', lane: Lane, spellId: string) => void;
}

const LANES: Lane[] = ['EXP', 'Jungle', 'Mid', 'Gold', 'Roam'];

const LANE_COLORS: Record<Lane, { border: string; bg: string; text: string; badge: string }> = {
  EXP: { border: 'border-role-exp', bg: 'bg-role-exp/10', text: 'text-role-exp', badge: 'bg-red-500' },
  Jungle: { border: 'border-role-jungle', bg: 'bg-role-jungle/10', text: 'text-role-jungle', badge: 'bg-emerald-500' },
  Mid: { border: 'border-role-mid', bg: 'bg-role-mid/10', text: 'text-role-mid', badge: 'bg-purple-500' },
  Gold: { border: 'border-role-gold', bg: 'bg-role-gold/10', text: 'text-role-gold', badge: 'bg-amber-500' },
  Roam: { border: 'border-role-roam', bg: 'bg-role-roam/10', text: 'text-role-roam', badge: 'bg-blue-500' },
};

export const LaneClashMatrix: React.FC<LaneClashMatrixProps> = ({
  blueTeam,
  redTeam,
  blueSpells,
  redSpells,
  onUpdateSpell,
}) => {
  const [activeSpellSelector, setActiveSpellSelector] = useState<{
    team: 'blue' | 'red';
    lane: Lane;
  } | null>(null);

  const calculateLaneMatchup = (lane: Lane, bHero: Hero | null, rHero: Hero | null) => {
    if (!bHero || !rHero) {
      return {
        blueOdds: 50,
        redOdds: 50,
        verdict: 'Awaiting both lane picks...',
        advantage: 'Even',
        tacticalTip: 'Assign heroes to both sides to compute head-to-head laning calculations.',
      };
    }

    let bScore = 50;
    let rScore = 50;

    // Early game laning power
    bScore += (bHero.early_game - rHero.early_game) * 3;
    rScore += (rHero.early_game - bHero.early_game) * 3;

    // Direct hard counter check
    if (bHero.hard_counters.some(c => c.toLowerCase().includes(rHero.name.toLowerCase()))) {
      rScore += 12;
      bScore -= 12;
    }
    if (rHero.hard_counters.some(c => c.toLowerCase().includes(bHero.name.toLowerCase()))) {
      bScore += 12;
      rScore -= 12;
    }

    // CC lockdown differential
    bScore += (bHero.cc_lockdown - rHero.cc_lockdown) * 1.5;
    rScore += (rHero.cc_lockdown - bHero.cc_lockdown) * 1.5;

    // Clamp
    const total = bScore + rScore;
    const blueOdds = Math.min(85, Math.max(15, Math.round((bScore / total) * 100)));
    const redOdds = 100 - blueOdds;

    let verdict = 'Balanced 50/50 Skill Matchup';
    let advantage = 'Even';
    if (blueOdds >= 60) {
      verdict = `${bHero.name} holds dominant lane prio`;
      advantage = 'Blue Favored';
    } else if (redOdds >= 60) {
      verdict = `${rHero.name} holds dominant lane prio`;
      advantage = 'Red Favored';
    }

    let tacticalTip = `${bHero.name} and ${rHero.name} have closely matched power curves. Level 4 ultimate spike will decide the first neutral objective contest.`;
    if (lane === 'Jungle') {
      tacticalTip = `Retribution smite timing and early buff invade defence are critical. Watch for level 2 invade from ${bHero.early_game > rHero.early_game ? bHero.name : rHero.name}.`;
    } else if (lane === 'Gold') {
      tacticalTip = `Gold lane trading advantage hinges on basic attack range and 1-item spike. Avoid face-checking river bushes without vision.`;
    } else if (lane === 'EXP') {
      tacticalTip = `EXP lane wave equilibrium determines rotation speed to the first 2:00 Turtle. Freezing near ally tower gives ganking angles.`;
    } else if (lane === 'Mid') {
      tacticalTip = `Fastest waveclear secures side-lane gank prio. Clear minion line within 3 seconds, then rotate toward Gold lane.`;
    } else if (lane === 'Roam') {
      tacticalTip = `Vision control and bush zoning around river corridors. Save hard crowd control for enemy core carry.`;
    }

    return { blueOdds, redOdds, verdict, advantage, tacticalTip };
  };

  return (
    <div className="bg-surface border border-surface-border rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-1.5 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/30">
            <Swords className="w-4 h-4 text-gold-400" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif] tracking-wider flex items-center gap-2">
              Head-to-Head Lane Clash Intelligence
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40">
                1V1 MATRIX
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Direct lane matchups, micro advantage calculations, and Battle Spell optimizations
            </p>
          </div>
        </div>
      </div>

      {/* 5 Lane Matchup Rows */}
      <div className="space-y-3">
        {LANES.map((lane) => {
          const blueHeroId = blueTeam[lane];
          const redHeroId = redTeam[lane];
          const bHero = blueHeroId ? HEROES.find(h => h.id === blueHeroId) || null : null;
          const rHero = redHeroId ? HEROES.find(h => h.id === redHeroId) || null : null;
          const laneStyle = LANE_COLORS[lane];
          const matchup = calculateLaneMatchup(lane, bHero, rHero);

          const bSpellId = blueSpells[lane] || (lane === 'Jungle' ? 'retribution' : 'flicker');
          const rSpellId = redSpells[lane] || (lane === 'Jungle' ? 'retribution' : 'flicker');
          const bSpell = BATTLE_SPELLS.find(s => s.id === bSpellId) || BATTLE_SPELLS[0];
          const rSpell = BATTLE_SPELLS.find(s => s.id === rSpellId) || BATTLE_SPELLS[0];

          return (
            <div
              key={lane}
              className="bg-surface-elevated border border-surface-border rounded-xl p-3.5 hover:border-gold-500/40 transition-all space-y-2.5"
            >
              {/* Lane Header Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${laneStyle.border}/40 ${laneStyle.bg} ${laneStyle.text}`}>
                    {lane} Lane Duel
                  </span>
                  <span className="text-xs font-semibold text-slate-300">
                    {matchup.verdict}
                  </span>
                </div>

                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                  matchup.advantage === 'Blue Favored'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : matchup.advantage === 'Red Favored'
                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                    : 'bg-surface-subtle text-slate-400 border-surface-border'
                }`}>
                  {matchup.advantage}
                </span>
              </div>

              {/* Clash Duel Row */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Blue Hero & Battle Spell */}
                <div className="md:col-span-5 flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-blue-500/50 shadow-md relative shrink-0">
                    {bHero ? (
                      <>
                        <img
                          src={`/heroes/${bHero.id}.png`}
                          alt={bHero.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center font-bold text-xs uppercase text-blue-200">
                          {bHero.name.slice(0, 2)}
                        </span>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-bold">
                        Pick
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-blue-300 truncate">
                        {bHero ? bHero.name : `Empty ${lane}`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-0.5">
                      {/* Battle Spell Selector Pill */}
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setActiveSpellSelector({ team: 'blue', lane });
                        }}
                        title={`Current Spell: ${bSpell.name} (Click to change)`}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/40 text-blue-200 hover:border-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1"
                      >
                        <Zap className="w-2.5 h-2.5 text-amber-400" />
                        <span>{bSpell.name}</span>
                      </button>
                      <span className="text-[10px] text-slate-400">
                        {bHero ? `${bHero.role}` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center Advantage Meter */}
                <div className="md:col-span-2 flex flex-col items-center justify-center text-center">
                  <div className="flex justify-between w-full text-[10px] font-mono font-bold mb-1">
                    <span className="text-blue-400">{matchup.blueOdds}%</span>
                    <span className="text-slate-500">VS</span>
                    <span className="text-red-400">{matchup.redOdds}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden flex shadow-inner border border-surface-border">
                    <div
                      style={{ width: `${matchup.blueOdds}%` }}
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500"
                    />
                    <div
                      style={{ width: `${matchup.redOdds}%` }}
                      className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Red Hero & Battle Spell */}
                <div className="md:col-span-5 flex items-center justify-end space-x-3 text-right">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-end space-x-2">
                      <span className="font-bold text-sm text-red-300 truncate">
                        {rHero ? rHero.name : `Empty ${lane}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-end space-x-2 mt-0.5">
                      <span className="text-[10px] text-slate-400">
                        {rHero ? `${rHero.role}` : ''}
                      </span>
                      {/* Battle Spell Selector Pill */}
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setActiveSpellSelector({ team: 'red', lane });
                        }}
                        title={`Current Spell: ${rSpell.name} (Click to change)`}
                        className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-200 hover:border-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1"
                      >
                        <Zap className="w-2.5 h-2.5 text-amber-400" />
                        <span>{rSpell.name}</span>
                      </button>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-red-500/50 shadow-md relative shrink-0">
                    {rHero ? (
                      <>
                        <img
                          src={`/heroes/${rHero.id}.png`}
                          alt={rHero.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center font-bold text-xs uppercase text-red-200">
                          {rHero.name.slice(0, 2)}
                        </span>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-bold">
                        Pick
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Micro Tip */}
              <div className="bg-canvas/50 border border-surface-border rounded-lg px-3 py-1.5 text-[11px] text-slate-400 flex items-center gap-1.5">
                <span className="text-gold-400 font-bold">💡 Micro Tip:</span>
                <span className="truncate">{matchup.tacticalTip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Battle Spell Selection Modal / Drawer */}
      {activeSpellSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-surface-elevated border border-surface-borderLight rounded-2xl shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <div>
                <span className={`text-xs uppercase font-bold px-2 py-0.5 rounded border ${
                  activeSpellSelector.team === 'blue'
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                    : 'bg-red-500/20 text-red-300 border-red-500/40'
                }`}>
                  {activeSpellSelector.team === 'blue' ? 'Blue' : 'Red'} Team • {activeSpellSelector.lane} Lane
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1 font-['Cinzel',serif]">
                  Select Battle Spell
                </h3>
              </div>
              <button
                onClick={() => setActiveSpellSelector(null)}
                className="text-slate-400 hover:text-slate-200 text-sm font-bold p-1.5"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {BATTLE_SPELLS.map((spell) => {
                const isSelected = (activeSpellSelector.team === 'blue' 
                  ? blueSpells[activeSpellSelector.lane] 
                  : redSpells[activeSpellSelector.lane]) === spell.id;

                return (
                  <button
                    key={spell.id}
                    onClick={() => {
                      soundManager.playLockIn();
                      onUpdateSpell(activeSpellSelector.team, activeSpellSelector.lane, spell.id);
                      setActiveSpellSelector(null);
                    }}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-gold-500 text-slate-950 font-bold border-gold-400 shadow-mythic-glow'
                        : 'bg-surface hover:bg-surface-elevated text-slate-200 border-surface-border hover:border-gold-500/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">{spell.name}</span>
                        <span className="text-[10px] font-mono opacity-80">{spell.cooldown}s</span>
                      </div>
                      <p className={`text-[10px] line-clamp-2 leading-relaxed ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                        {spell.description}
                      </p>
                    </div>

                    <div className="mt-2 pt-1 border-t border-surface-border/40 text-[9px] font-semibold opacity-70">
                      Best: {spell.best_roles.join(', ')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
