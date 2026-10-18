import React, { useState, useMemo } from 'react';
import { ICONIC_COMBOS, detectTeamCombos, WomboCombo, ActiveComboResult } from '../../data/combos';
import { HEROES } from '../../data/heroes';
import { Zap, ShieldAlert, Sparkles, Flame, CheckCircle2, ChevronRight, HelpCircle, Layers } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface ComboTreeVisualizerProps {
  blueTeam: Record<string, string | null>;
  redTeam: Record<string, string | null>;
  onPickHero?: (team: 'blue' | 'red', heroId: string) => void;
}

export const ComboTreeVisualizer: React.FC<ComboTreeVisualizerProps> = ({
  blueTeam,
  redTeam,
  onPickHero,
}) => {
  const [activeTab, setActiveTab] = useState<'blue' | 'red' | 'all'>('blue');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [expandedComboId, setExpandedComboId] = useState<string | null>(null);

  const blueHeroIds = useMemo(() => Object.values(blueTeam), [blueTeam]);
  const redHeroIds = useMemo(() => Object.values(redTeam), [redTeam]);

  const blueActiveCombos = useMemo(() => detectTeamCombos(blueHeroIds), [blueHeroIds]);
  const redActiveCombos = useMemo(() => detectTeamCombos(redHeroIds), [redHeroIds]);

  const displayedCombos = useMemo(() => {
    if (activeTab === 'blue') return blueActiveCombos;
    if (activeTab === 'red') return redActiveCombos;
    // 'all' returns all iconic combos mapped to empty active state
    return ICONIC_COMBOS.map((combo) => ({
      combo,
      matchedHeroIds: [],
      missingHeroIds: combo.heroIds,
      matchCount: 0,
      totalCount: combo.heroIds.length,
      completionPercentage: 0,
      isComplete: false,
    }));
  }, [activeTab, blueActiveCombos, redActiveCombos]);

  const filteredCombos = useMemo(() => {
    if (selectedTypeFilter === 'all') return displayedCombos;
    return displayedCombos.filter((item) => item.combo.type === selectedTypeFilter);
  }, [displayedCombos, selectedTypeFilter]);

  const completeCount = useMemo(() => {
    const list = activeTab === 'blue' ? blueActiveCombos : redActiveCombos;
    return list.filter((c) => c.isComplete).length;
  }, [activeTab, blueActiveCombos, redActiveCombos]);

  const partialCount = useMemo(() => {
    const list = activeTab === 'blue' ? blueActiveCombos : redActiveCombos;
    return list.filter((c) => !c.isComplete && c.matchCount > 0).length;
  }, [activeTab, blueActiveCombos, redActiveCombos]);

  const getDifficultyColor = (diff: WomboCombo['difficulty']) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Intermediate':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      case 'Master':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Pro Tournament':
        return 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30';
    }
  };

  const getTypeLabel = (type: WomboCombo['type']) => {
    switch (type) {
      case 'wombo_combo':
        return 'Wombo Combo';
      case 'hyper_dive':
        return 'Hyper Dive';
      case 'sustain_engine':
        return 'Sustain Engine';
      case 'pickoff_cc':
        return 'Pickoff CC';
      case 'artillery_siege':
        return 'Artillery Siege';
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-canvas/60 p-3 rounded-xl border border-surface-border">
        {/* Team Tabs */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('blue');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'blue'
                ? 'bg-blue-600 text-white shadow-blue-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-surface'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Blue Team</span>
            {blueActiveCombos.filter((c) => c.isComplete).length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-blue-400/20 text-blue-200 text-[10px] font-mono">
                {blueActiveCombos.filter((c) => c.isComplete).length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('red');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'red'
                ? 'bg-red-600 text-white shadow-red-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-surface'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span>Red Team</span>
            {redActiveCombos.filter((c) => c.isComplete).length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-400/20 text-red-200 text-[10px] font-mono">
                {redActiveCombos.filter((c) => c.isComplete).length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-gold-500 text-slate-950 shadow-mythic-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-surface'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Synergies ({ICONIC_COMBOS.length})</span>
          </button>
        </div>

        {/* Synergy Type Filters */}
        <div className="flex items-center space-x-1 overflow-x-auto text-[11px]">
          {['all', 'wombo_combo', 'hyper_dive', 'sustain_engine', 'pickoff_cc', 'artillery_siege'].map((type) => (
            <button
              key={type}
              onClick={() => {
                soundManager.playClick();
                setSelectedTypeFilter(type);
              }}
              className={`px-2.5 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                selectedTypeFilter === type
                  ? 'bg-surface-elevated text-gold-400 border border-gold-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {type === 'all' ? 'All Types' : getTypeLabel(type as WomboCombo['type'])}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Banner for Active Team */}
      {activeTab !== 'all' && (
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-surface-subtle border border-surface-border text-xs">
          <div className="flex items-center space-x-2">
            <Flame className={`w-4 h-4 ${activeTab === 'blue' ? 'text-blue-400' : 'text-red-400'}`} />
            <span className="text-slate-300">
              Synergy Status:{' '}
              <strong className={activeTab === 'blue' ? 'text-blue-400' : 'text-red-400'}>
                {completeCount} Fully Active
              </strong>
              {partialCount > 0 && <span className="text-slate-400">, {partialCount} Incomplete Setup</span>}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            {completeCount > 0 ? '✨ Teamfight combos enabled!' : 'Select complementary heroes to trigger combos'}
          </span>
        </div>
      )}

      {/* Synergies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredCombos.map((item) => {
          const { combo, matchedHeroIds, missingHeroIds, isComplete, completionPercentage } = item;
          const isExpanded = expandedComboId === combo.id;

          return (
            <div
              key={combo.id}
              className={`rounded-xl border transition-all overflow-hidden flex flex-col justify-between ${
                isComplete
                  ? activeTab === 'blue'
                    ? 'bg-blue-950/30 border-blue-500/50 shadow-blue-glow'
                    : 'bg-red-950/30 border-red-500/50 shadow-red-glow'
                  : completionPercentage > 0
                  ? 'bg-surface border-surface-border hover:border-gold-500/40'
                  : 'bg-surface/60 border-surface-border/60 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Card Header */}
              <div className="p-3.5 border-b border-surface-border/50">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-slate-100 font-['Cinzel',serif] tracking-wider">
                        {combo.name}
                      </h4>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDifficultyColor(combo.difficulty)}`}>
                        {combo.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{combo.tagline}</p>
                  </div>

                  {/* Status Badge */}
                  {activeTab !== 'all' ? (
                    isComplete ? (
                      <span className="shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>ACTIVE</span>
                      </span>
                    ) : completionPercentage > 0 ? (
                      <span className="shrink-0 flex items-center space-x-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[11px] font-bold">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{matchedHeroIds.length}/{combo.heroIds.length} READY</span>
                      </span>
                    ) : (
                      <span className="shrink-0 text-[10px] text-slate-500 font-mono">0/{combo.heroIds.length}</span>
                    )
                  ) : (
                    <span className="shrink-0 text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded bg-canvas border border-surface-border">
                      {getTypeLabel(combo.type)}
                    </span>
                  )}
                </div>

                {/* Hero Avatars in Combo */}
                <div className="mt-3 flex items-center space-x-2">
                  {combo.heroIds.map((heroId) => {
                    const hero = HEROES.find((h) => h.id === heroId);
                    const isPicked = matchedHeroIds.includes(heroId);

                    return (
                      <div
                        key={heroId}
                        className={`relative group flex items-center space-x-1.5 p-1 rounded-lg border transition-all ${
                          isPicked
                            ? activeTab === 'blue'
                              ? 'bg-blue-500/20 border-blue-400/60 shadow-sm'
                              : 'bg-red-500/20 border-red-400/60 shadow-sm'
                            : 'bg-canvas/80 border-surface-border opacity-65'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-md overflow-hidden bg-surface-elevated shrink-0 relative">
                          <img
                            src={`/heroes/${heroId}.png`}
                            alt={hero?.name || heroId}
                            className={`w-full h-full object-cover ${!isPicked && activeTab !== 'all' ? 'grayscale opacity-60' : ''}`}
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <span className={`text-[11px] font-bold pr-1.5 ${isPicked ? 'text-slate-100' : 'text-slate-400'}`}>
                          {hero?.name || heroId}
                        </span>

                        {/* Quick pick button for missing heroes */}
                        {!isPicked && activeTab !== 'all' && onPickHero && (
                          <button
                            onClick={() => {
                              soundManager.playLockIn();
                              onPickHero(activeTab as 'blue' | 'red', heroId);
                            }}
                            title={`Pick ${hero?.name || heroId} for ${activeTab === 'blue' ? 'Blue' : 'Red'} team`}
                            className="hidden group-hover:flex items-center justify-center px-1.5 py-0.5 rounded bg-gold-500 hover:bg-gold-400 text-slate-950 text-[10px] font-black shadow transition-all ml-1"
                          >
                            Pick
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Collapsible Execution Chain & Counterplay */}
              <div className="p-3.5 bg-canvas/40 space-y-2.5">
                {/* Strategic Value */}
                <p className="text-[11px] text-slate-300 italic flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                  <span>{combo.strategicValue}</span>
                </p>

                {isExpanded ? (
                  <div className="space-y-2.5 pt-2 border-t border-surface-border/50 text-xs">
                    {/* Step by Step execution chain */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1">
                        <Flame className="w-3 h-3" /> Execution Sequence:
                      </span>
                      {combo.executionSteps.map((step, idx) => (
                        <div key={idx} className="text-xs text-slate-300 pl-2 border-l-2 border-gold-500/40 py-0.5">
                          {step}
                        </div>
                      ))}
                    </div>

                    {/* Counter tactics */}
                    <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/30 space-y-1">
                      <div className="flex items-center space-x-1.5 text-red-400 font-bold text-[11px]">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                        <span>Esports Counter Tactics:</span>
                      </div>
                      <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-0.5 pl-1">
                        {combo.counterTactics.map((tactic, idx) => (
                          <li key={idx}>{tactic}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommended spells */}
                    {combo.recommendedSpells && (
                      <div className="text-[11px] text-slate-400">
                        <strong className="text-slate-300">Recommended Spells:</strong>{' '}
                        {combo.recommendedSpells.join(' • ')}
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Expand / Collapse Button */}
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setExpandedComboId(isExpanded ? null : combo.id);
                  }}
                  className="w-full pt-1.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-gold-400 transition-colors"
                >
                  <span>{isExpanded ? 'Hide Execution & Counter Details' : 'View Execution Chain & Counterplay'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          );
        })}

        {filteredCombos.length === 0 && (
          <div className="col-span-2 py-8 text-center bg-surface/30 rounded-xl border border-dashed border-surface-border">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-xs text-slate-400">No synergies found matching this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};
