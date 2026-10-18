import React, { useState, useMemo } from 'react';
import { X, Search, Zap, Shield, Ban } from 'lucide-react';
import { HEROES } from '../../data/heroes';
import { Hero, Lane } from '../../types/mlbb';
import { soundManager } from '../../services/sound';

export type DrawerTarget = 
  | { type: 'slot'; team: 'blue' | 'red'; lane: Lane }
  | { type: 'ban'; team: 'blue' | 'red'; index: number };

interface HeroDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHero: (hero: Hero) => void;
  targetSlot: DrawerTarget | null;
  selectedHeroIds: string[];
}

export const HeroDrawer: React.FC<HeroDrawerProps> = ({
  isOpen,
  onClose,
  onSelectHero,
  targetSlot,
  selectedHeroIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedLane, setSelectedLane] = useState<string>('All');

  const filteredHeroes = useMemo(() => {
    return HEROES.filter((hero) => {
      const matchesSearch =
        hero.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hero.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hero.primary_lane.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole =
        selectedRole === 'All' || hero.role.toLowerCase().includes(selectedRole.toLowerCase());

      const matchesLane =
        selectedLane === 'All' || hero.primary_lane.toLowerCase() === selectedLane.toLowerCase();

      return matchesSearch && matchesRole && matchesLane;
    });
  }, [searchQuery, selectedRole, selectedLane]);

  if (!isOpen || !targetSlot) return null;

  const roleColors: Record<string, string> = {
    EXP: 'text-role-exp border-role-exp/30 bg-role-exp/10',
    Jungle: 'text-role-jungle border-role-jungle/30 bg-role-jungle/10',
    Mid: 'text-role-mid border-role-mid/30 bg-role-mid/10',
    Gold: 'text-role-gold border-role-gold/30 bg-role-gold/10',
    Roam: 'text-role-roam border-role-roam/30 bg-role-roam/10',
  };

  const isBanTarget = targetSlot.type === 'ban';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl bg-surface-elevated border border-surface-borderLight rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-surface-border flex items-center justify-between bg-surface-subtle">
          <div>
            <div className="flex items-center space-x-2">
              {isBanTarget ? (
                <span className="text-xs uppercase font-bold px-2 py-0.5 rounded border bg-red-950/70 text-red-400 border-red-500/50 flex items-center gap-1.5 shadow-sm">
                  <Ban className="w-3.5 h-3.5 text-red-400" />
                  {targetSlot.team === 'blue' ? 'Blue Team Ban' : 'Red Team Ban'} #{targetSlot.index + 1}
                </span>
              ) : (
                <>
                  <span
                    className={`text-xs uppercase font-bold px-2 py-0.5 rounded border ${
                      targetSlot.team === 'blue'
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                        : 'bg-red-500/20 text-red-400 border-red-500/40'
                    }`}
                  >
                    {targetSlot.team === 'blue' ? 'Blue Team Pick' : 'Red Team Pick'}
                  </span>
                  <span className={`text-xs uppercase font-bold px-2 py-0.5 rounded border ${roleColors[targetSlot.lane]}`}>
                    {targetSlot.lane} Lane
                  </span>
                </>
              )}
            </div>
            <h2 className="text-lg font-bold text-slate-100 mt-1 font-['Cinzel',serif] flex items-center gap-2">
              {isBanTarget ? (
                <>
                  <Ban className="w-5 h-5 text-red-500" />
                  Select Hero to Ban
                </>
              ) : (
                'Select Land of Dawn Hero'
              )}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-surface border border-transparent hover:border-surface-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-4 border-b border-surface-border bg-surface flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hero, role, or lane..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-canvas border border-surface-border rounded-lg text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* Lane Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['All', 'EXP', 'Jungle', 'Mid', 'Gold', 'Roam'].map((lane) => (
              <button
                key={lane}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedLane(lane);
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedLane === lane
                    ? 'bg-gold-500 text-slate-950 font-bold shadow-mythic-glow'
                    : 'bg-canvas text-slate-400 hover:text-slate-200 border border-surface-border'
                }`}
              >
                {lane}
              </button>
            ))}
          </div>

          {/* Role Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['All', 'Assassin', 'Fighter', 'Mage', 'Marksman', 'Tank', 'Support'].map((role) => (
              <button
                key={role}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedRole(role);
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                  selectedRole === role
                    ? 'bg-gold-500 text-slate-950 font-bold shadow-mythic-glow'
                    : 'bg-canvas text-slate-400 hover:text-slate-200 border border-surface-border'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Grid View */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 flex-1">
          {filteredHeroes.map((hero) => {
            const isPicked = selectedHeroIds.includes(hero.id);
            const isRecommendedLane = targetSlot.type === 'slot' && hero.primary_lane === targetSlot.lane;

            return (
              <button
                key={hero.id}
                disabled={isPicked}
                onClick={() => {
                  soundManager.playLockIn();
                  onSelectHero(hero);
                  onClose();
                }}
                className={`group relative rounded-xl p-3 text-left transition-all border flex flex-col justify-between ${
                  isPicked
                    ? 'bg-canvas/40 border-surface-border/40 opacity-40 cursor-not-allowed'
                    : isRecommendedLane
                    ? 'bg-surface border-gold-500/40 hover:border-gold-400 hover:shadow-mythic-gold'
                    : 'bg-surface border-surface-border hover:border-surface-borderLight hover:bg-surface-elevated'
                }`}
              >
                {/* Lane priority badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                      roleColors[hero.primary_lane] || 'text-slate-300 border-slate-700 bg-slate-800'
                    }`}
                  >
                    {hero.primary_lane}
                  </span>

                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                      hero.damage_type === 'Magic'
                        ? 'bg-purple-950/70 text-purple-300'
                        : hero.damage_type === 'True'
                        ? 'bg-amber-950/70 text-amber-300'
                        : 'bg-red-950/70 text-red-300'
                    }`}
                  >
                    {hero.damage_type}
                  </span>
                </div>

                {/* Hero Avatar / Name */}
                <div className="flex items-center space-x-2.5 my-1">
                  <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-slate-200 group-hover:border-gold-500/50 shadow-md shrink-0 relative">
                    <img
                      src={`/heroes/${hero.id}.png`}
                      alt={hero.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="absolute text-xs uppercase font-bold">{hero.name.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-gold-300 leading-tight">
                      {hero.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{hero.role}</p>
                  </div>
                </div>

                {/* Mobility & Durability Indicators */}
                <div className="mt-2 pt-2 border-t border-surface-border/50 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    Mob: <span className="font-semibold text-slate-200">{hero.mobility_tier}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-blue-400" />
                    Dur: <span className="font-semibold text-slate-200">{hero.durability}/10</span>
                  </span>
                </div>

                {isPicked && (
                  <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                    <span className="text-[11px] font-bold tracking-wider text-red-400 uppercase bg-surface-elevated/90 px-2.5 py-1 rounded border border-red-500/40">
                      Already Picked
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
