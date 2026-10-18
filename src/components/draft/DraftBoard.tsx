import React, { useState, useMemo } from 'react';
import { Hero, Lane, DraftMetrics } from '../../types/mlbb';
import { HEROES } from '../../data/heroes';
import { HeroSlot } from './HeroSlot';
import { HeroDrawer, DrawerTarget } from './HeroDrawer';
import { WinRateGauge } from './WinRateGauge';
import { MetricsPanel } from './MetricsPanel';
import { CounterPanel } from './CounterPanel';
import { CompositionSuggester } from './CompositionSuggester';
import { LaneClashMatrix } from './LaneClashMatrix';
import { ComboTreeVisualizer } from './ComboTreeVisualizer';
import { MatchTimelineScrubber } from './MatchTimelineScrubber';
import { TournamentDraftBar } from './TournamentDraftBar';
import { DraftExportModal } from './DraftExportModal';
import { getCounterRecommendations } from '../../services/draftEngine';
import { Ban, Sparkles, ChevronDown, ChevronUp, RefreshCw, X, Share2, Swords, Flame, Clock, Trophy } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface DraftBoardProps {
  blueTeam: Record<Lane, string | null>;
  redTeam: Record<Lane, string | null>;
  bansBlue: (string | null)[];
  bansRed: (string | null)[];
  blueMetrics: DraftMetrics;
  redMetrics: DraftMetrics;
  onUpdateSlot: (team: 'blue' | 'red', lane: Lane, heroId: string | null) => void;
  onUpdateBan: (team: 'blue' | 'red', index: number, heroId: string | null) => void;
  onApplyComposition?: (team: 'blue' | 'red', comp: Record<Lane, string>) => void;
  onResetDraft?: () => void;
}

const LANES: Lane[] = ['EXP', 'Jungle', 'Mid', 'Gold', 'Roam'];

export const DraftBoard: React.FC<DraftBoardProps> = ({
  blueTeam,
  redTeam,
  bansBlue,
  bansRed,
  blueMetrics,
  redMetrics,
  onUpdateSlot,
  onUpdateBan,
  onApplyComposition,
  onResetDraft,
}) => {
  const [drawerTarget, setDrawerTarget] = useState<DrawerTarget | null>(null);
  const [focusedEnemyId, setFocusedEnemyId] = useState<string | null>(null);
  const [showIntelligencePanel, setShowIntelligencePanel] = useState<boolean>(true);
  const [intelligenceView, setIntelligenceView] = useState<'compositions' | 'clash' | 'combos' | 'timeline'>('compositions');
  const [tournamentModeActive, setTournamentModeActive] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [mobileTeamTab, setMobileTeamTab] = useState<'all' | 'blue' | 'intel' | 'red'>('all');

  // Battle Spells state
  const [blueSpells, setBlueSpells] = useState<Record<Lane, string>>({
    EXP: 'flicker',
    Jungle: 'retribution',
    Mid: 'flicker',
    Gold: 'flicker',
    Roam: 'flicker',
  });
  const [redSpells, setRedSpells] = useState<Record<Lane, string>>({
    EXP: 'flicker',
    Jungle: 'retribution',
    Mid: 'flicker',
    Gold: 'flicker',
    Roam: 'flicker',
  });

  const handleUpdateSpell = (team: 'blue' | 'red', lane: Lane, spellId: string) => {
    if (team === 'blue') {
      setBlueSpells(prev => ({ ...prev, [lane]: spellId }));
    } else {
      setRedSpells(prev => ({ ...prev, [lane]: spellId }));
    }
  };

  // Automatically focus on first available Red hero if none selected
  const activeFocusId = useMemo(() => {
    if (focusedEnemyId && HEROES.some(h => h.id === focusedEnemyId)) return focusedEnemyId;
    const firstRedId = Object.values(redTeam).find(Boolean);
    if (firstRedId) return firstRedId;
    const firstBlueId = Object.values(blueTeam).find(Boolean);
    return firstBlueId || null;
  }, [focusedEnemyId, redTeam, blueTeam]);

  const counterRec = useMemo(() => {
    if (!activeFocusId) return null;
    return getCounterRecommendations(activeFocusId);
  }, [activeFocusId]);

  const selectedHeroIds = useMemo(() => {
    return [
      ...Object.values(blueTeam).filter(Boolean),
      ...Object.values(redTeam).filter(Boolean),
      ...bansBlue.filter(Boolean),
      ...bansRed.filter(Boolean),
    ] as string[];
  }, [blueTeam, redTeam, bansBlue, bansRed]);

  const handleSelectHero = (hero: Hero) => {
    if (!drawerTarget) return;
    if (drawerTarget.type === 'slot') {
      onUpdateSlot(drawerTarget.team, drawerTarget.lane, hero.id);
      if (drawerTarget.team === 'red') {
        setFocusedEnemyId(hero.id);
      }
    } else if (drawerTarget.type === 'ban') {
      onUpdateBan(drawerTarget.team, drawerTarget.index, hero.id);
    }
  };

  const renderBanSlot = (team: 'blue' | 'red', idx: number) => {
    const bansList = team === 'blue' ? bansBlue : bansRed;
    const banHeroId = bansList[idx];
    const hero = HEROES.find((h) => h.id === banHeroId);
    const phase = idx < 3 ? 'Phase 1' : 'Phase 2';

    return (
      <div
        key={idx}
        onClick={() => {
          soundManager.playClick();
          setDrawerTarget({ type: 'ban', team, index: idx });
        }}
        title={hero ? `Banned: ${hero.name} (${phase} Slot #${idx + 1} - Click to swap)` : `Ban Slot #${idx + 1} (${phase} - Click to select)`}
        className={`relative group w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer overflow-hidden ${
          hero
            ? 'bg-red-950/80 border-red-500/70 shadow-sm hover:border-red-400 hover:ring-2 hover:ring-red-500/40'
            : team === 'blue'
            ? 'bg-canvas/80 border-surface-border text-slate-500 hover:border-blue-400 hover:text-blue-300 border-dashed hover:bg-blue-500/5'
            : 'bg-canvas/80 border-surface-border text-slate-500 hover:border-red-400 hover:text-red-300 border-dashed hover:bg-red-500/5'
        }`}
      >
        {hero ? (
          <>
            <img
              src={`/heroes/${hero.id}.png`}
              alt={hero.name}
              className="w-full h-full object-cover grayscale contrast-125 opacity-75"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center">
              <Ban className="w-5 h-5 text-red-500 drop-shadow-md" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick();
                onUpdateBan(team, idx, null);
              }}
              title={`Remove ban on ${hero.name}`}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-[11px] font-black opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow"
            >
              ×
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-0.5">
            <Ban className="w-3.5 h-3.5 text-slate-500 group-hover:text-gold-400 transition-colors" />
            <span className="text-[8px] font-mono text-slate-500 font-bold">#{idx + 1}</span>
          </div>
        )}
      </div>
    );
  };

  const handlePickSynergyHero = (team: 'blue' | 'red', heroId: string) => {
    const hero = HEROES.find((h) => h.id === heroId);
    if (!hero) return;
    const teamData = team === 'blue' ? blueTeam : redTeam;
    const targetLane = !teamData[hero.primary_lane]
      ? hero.primary_lane
      : (LANES.find((l) => !teamData[l]) || hero.primary_lane);
    onUpdateSlot(team, targetLane, hero.id);
  };

  return (
    <div className="space-y-6">
      {/* Official Tournament Draft Simulator & AI Bot Bar */}
      <TournamentDraftBar
        isActive={tournamentModeActive}
        onToggleActive={() => setTournamentModeActive((prev) => !prev)}
        blueTeam={blueTeam}
        redTeam={redTeam}
        bansBlue={bansBlue}
        bansRed={bansRed}
        onUpdateSlot={onUpdateSlot}
        onUpdateBan={onUpdateBan}
        onResetDraft={onResetDraft || (() => {})}
        onRequestSelect={(target) => setDrawerTarget(target)}
      />

      {/* Top Banner & 5-Ban Phase Bar */}
      <div className="bg-surface border border-surface-border rounded-2xl p-4 flex flex-col xl:flex-row items-center justify-between gap-4">
        {/* Blue Bans (5 bans: Phase 1 [0,1,2] + Phase 2 [3,4]) */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-1.5 sm:space-y-0 sm:space-x-2.5 w-full xl:w-auto">
          <div className="flex items-center space-x-1.5">
            <Ban className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Blue Bans (5):
            </span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {/* Phase 1 (3 bans) */}
            <div className="flex items-center space-x-1.5">
              {[0, 1, 2].map((idx) => renderBanSlot('blue', idx))}
            </div>

            {/* Esports Phase Divider */}
            <div className="flex flex-col items-center px-1">
              <div className="h-6 w-px bg-surface-border" />
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">P2</span>
            </div>

            {/* Phase 2 (2 bans) */}
            <div className="flex items-center space-x-1.5">
              {[3, 4].map((idx) => renderBanSlot('blue', idx))}
            </div>
          </div>
        </div>

        {/* Center Draft Stage Status & Export Button */}
        <div className="text-center hidden lg:flex flex-col items-center justify-center">
          <div className="text-xs font-bold uppercase tracking-widest text-gold-400 font-['Cinzel',serif] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Land of Dawn 5v5 Live Draft Intel
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5">
            5 Bans per Team (Phase 1 & 2) • Click any hero or ban slot to update picks & bans
          </span>
          <button
            onClick={() => {
              soundManager.playClick();
              setExportModalOpen(true);
            }}
            className="mt-2 px-3 py-1 rounded-lg bg-surface-elevated hover:bg-gold-500/10 border border-surface-borderLight hover:border-gold-500/40 text-xs font-semibold text-slate-300 hover:text-gold-400 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-gold-400" />
            <span>Export Esports Briefing</span>
          </button>
        </div>

        {/* Red Bans (5 bans: Phase 1 [0,1,2] + Phase 2 [3,4]) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-end space-y-1.5 sm:space-y-0 sm:space-x-2.5 w-full xl:w-auto">
          <div className="flex items-center space-x-1.5">
            <Ban className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              Red Bans (5):
            </span>
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto">
            {/* Phase 1 (3 bans) */}
            <div className="flex items-center space-x-1.5">
              {[0, 1, 2].map((idx) => renderBanSlot('red', idx))}
            </div>

            {/* Esports Phase Divider */}
            <div className="flex flex-col items-center px-1">
              <div className="h-6 w-px bg-surface-border" />
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">P2</span>
            </div>

            {/* Phase 2 (2 bans) */}
            <div className="flex items-center space-x-1.5">
              {[3, 4].map((idx) => renderBanSlot('red', idx))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Screen View Switcher (lg:hidden) */}
      <div className="lg:hidden flex items-center p-1 rounded-xl bg-surface border border-surface-border mb-3 overflow-x-auto gap-1">
        <button
          onClick={() => { soundManager.playClick(); setMobileTeamTab('all'); }}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            mobileTeamTab === 'all'
              ? 'bg-gold-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All View
        </button>
        <button
          onClick={() => { soundManager.playClick(); setMobileTeamTab('blue'); }}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            mobileTeamTab === 'blue'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-blue-400 hover:text-blue-300'
          }`}
        >
          Ally ({Object.values(blueTeam).filter(Boolean).length}/5)
        </button>
        <button
          onClick={() => { soundManager.playClick(); setMobileTeamTab('intel'); }}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            mobileTeamTab === 'intel'
              ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          AI Intel
        </button>
        <button
          onClick={() => { soundManager.playClick(); setMobileTeamTab('red'); }}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
            mobileTeamTab === 'red'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-red-400 hover:text-red-300'
          }`}
        >
          Enemy ({Object.values(redTeam).filter(Boolean).length}/5)
        </button>
      </div>

      {/* Main 5v5 Draft Board Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Blue Team (5 slots) */}
        <div className={`lg:col-span-4 space-y-3 ${mobileTeamTab === 'all' || mobileTeamTab === 'blue' ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between border-b border-blue-500/30 pb-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-blue-glow" />
              <h3 className="font-bold text-base text-blue-300 font-['Cinzel',serif] tracking-wider">
                Blue Team (Ally)
              </h3>
            </div>
            <span className="text-xs font-mono text-blue-400 font-bold">
              {Object.values(blueTeam).filter(Boolean).length} / 5 Picked
            </span>
          </div>

          <div className="space-y-2.5">
            {LANES.map((lane) => {
              const heroId = blueTeam[lane];
              const hero = heroId ? HEROES.find((h) => h.id === heroId) || null : null;
              return (
                <HeroSlot
                  key={`blue-${lane}`}
                  lane={lane}
                  hero={hero}
                  team="blue"
                  isSelectedForCounter={activeFocusId === heroId}
                  onSelectSlot={() => setDrawerTarget({ type: 'slot', team: 'blue', lane })}
                  onClearSlot={() => onUpdateSlot('blue', lane, null)}
                  onFocusCounter={() => heroId && setFocusedEnemyId(heroId)}
                />
              );
            })}
          </div>
        </div>

        {/* Center Intelligence: Win-Rate Gauge & Live Counter Recommendations */}
        <div className={`lg:col-span-4 space-y-5 ${mobileTeamTab === 'all' || mobileTeamTab === 'intel' ? 'block' : 'hidden lg:block'}`}>
          <WinRateGauge
            blueWinRate={blueMetrics.predicted_win_rate}
            ccDelta={blueMetrics.cc_score - redMetrics.cc_score}
            durabilityDelta={blueMetrics.durability_score - redMetrics.durability_score}
          />

          <CounterPanel
            recommendation={counterRec}
            onPickCounterHero={(hero) => {
              // Automatically pick into available lane on blue team
              const targetLane = hero.primary_lane;
              onUpdateSlot('blue', targetLane, hero.id);
            }}
          />
        </div>

        {/* Red Team (5 slots) */}
        <div className={`lg:col-span-4 space-y-3 ${mobileTeamTab === 'all' || mobileTeamTab === 'red' ? 'block' : 'hidden lg:block'}`}>
          <div className="flex items-center justify-between border-b border-red-500/30 pb-2">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-red-glow" />
              <h3 className="font-bold text-base text-red-300 font-['Cinzel',serif] tracking-wider">
                Red Team (Opponent)
              </h3>
            </div>
            <span className="text-xs font-mono text-red-400 font-bold">
              {Object.values(redTeam).filter(Boolean).length} / 5 Picked
            </span>
          </div>

          <div className="space-y-2.5">
            {LANES.map((lane) => {
              const heroId = redTeam[lane];
              const hero = heroId ? HEROES.find((h) => h.id === heroId) || null : null;
              return (
                <HeroSlot
                  key={`red-${lane}`}
                  lane={lane}
                  hero={hero}
                  team="red"
                  isSelectedForCounter={activeFocusId === heroId}
                  onSelectSlot={() => setDrawerTarget({ type: 'slot', team: 'red', lane })}
                  onClearSlot={() => onUpdateSlot('red', lane, null)}
                  onFocusCounter={() => heroId && setFocusedEnemyId(heroId)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Draft Intelligence & Tactical Suite (Dual Tabs: 5-Man Comps vs 1v1 Clash Matrix) */}
      <div className="bg-surface border border-surface-border rounded-2xl p-4 sm:p-5 shadow-xl transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30 shrink-0">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif] tracking-wider">
                  Draft Intelligence & Tactical Suite
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/40">
                  PRO STRATEGY
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Switch between 5-man team compositions, head-to-head lane clash matchups, active wombo combos, and 0-20 min timeline power curves.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Tab switch buttons */}
            <div className="flex items-center bg-canvas/80 p-1 rounded-xl border border-surface-border text-xs overflow-x-auto">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIntelligenceView('compositions');
                  setShowIntelligencePanel(true);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  intelligenceView === 'compositions' && showIntelligencePanel
                    ? 'bg-gold-500 text-slate-950 shadow-mythic-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>5-Man Comps</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setIntelligenceView('clash');
                  setShowIntelligencePanel(true);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  intelligenceView === 'clash' && showIntelligencePanel
                    ? 'bg-gold-500 text-slate-950 shadow-mythic-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Swords className="w-3.5 h-3.5" />
                <span>1v1 Clash</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setIntelligenceView('combos');
                  setShowIntelligencePanel(true);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  intelligenceView === 'combos' && showIntelligencePanel
                    ? 'bg-gold-500 text-slate-950 shadow-mythic-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Wombo Combos</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setIntelligenceView('timeline');
                  setShowIntelligencePanel(true);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  intelligenceView === 'timeline' && showIntelligencePanel
                    ? 'bg-gold-500 text-slate-950 shadow-mythic-glow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Match Timeline (0-20m)</span>
              </button>
            </div>

            {/* Toggle Visibility button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setShowIntelligencePanel(prev => !prev);
              }}
              className="p-2 rounded-xl bg-surface-elevated text-slate-300 hover:text-gold-400 border border-surface-borderLight transition-colors shrink-0"
              title={showIntelligencePanel ? 'Collapse' : 'Expand'}
            >
              {showIntelligencePanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {showIntelligencePanel && (
          <div className="mt-4 pt-4 border-t border-surface-border/60">
            {intelligenceView === 'compositions' && (
              <CompositionSuggester
                enemyTeam={redTeam}
                allyTeam={blueTeam}
                bansBlue={bansBlue}
                bansRed={bansRed}
                onApplyComposition={(team, comp) => {
                  if (onApplyComposition) {
                    onApplyComposition(team, comp);
                  } else {
                    LANES.forEach((l) => onUpdateSlot(team, l, comp[l] || null));
                  }
                }}
              />
            )}

            {intelligenceView === 'clash' && (
              <LaneClashMatrix
                blueTeam={blueTeam}
                redTeam={redTeam}
                blueSpells={blueSpells}
                redSpells={redSpells}
                onUpdateSpell={handleUpdateSpell}
              />
            )}

            {intelligenceView === 'combos' && (
              <ComboTreeVisualizer
                blueTeam={blueTeam}
                redTeam={redTeam}
                onPickHero={handlePickSynergyHero}
              />
            )}

            {intelligenceView === 'timeline' && (
              <MatchTimelineScrubber
                blueTeam={blueTeam}
                redTeam={redTeam}
              />
            )}
          </div>
        )}
      </div>

      {/* Composition Metrics Matrix (Bottom) */}
      <MetricsPanel blueMetrics={blueMetrics} redMetrics={redMetrics} />

      {/* Hero Select Drawer Modal */}
      <HeroDrawer
        isOpen={Boolean(drawerTarget)}
        targetSlot={drawerTarget}
        selectedHeroIds={selectedHeroIds}
        onClose={() => setDrawerTarget(null)}
        onSelectHero={handleSelectHero}
      />

      {/* Esports Match Briefing Export Modal */}
      <DraftExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        blueTeam={blueTeam}
        redTeam={redTeam}
        bansBlue={bansBlue}
        bansRed={bansRed}
        blueMetrics={blueMetrics}
        redMetrics={redMetrics}
        blueSpells={blueSpells}
        redSpells={redSpells}
      />
    </div>
  );
};
