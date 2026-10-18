import React, { useState, useEffect } from 'react';
import { Hero, Item, Lane } from '../../types/mlbb';
import { HEROES } from '../../data/heroes';
import { ITEMS } from '../../data/items';
import { recommendItems } from '../../services/api';
import { ItemTooltip } from './ItemTooltip';
import { CounterRulesView } from './CounterRulesView';
import { ItemSwapper } from './ItemSwapper';
import { BuildLoadoutCalculator } from './BuildLoadoutCalculator';
import { Shield, Sparkles, AlertTriangle, ArrowRight, Layers, Crosshair, Zap, BookOpen, Search, Sword, Footprints, Calculator } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface EquipmentMatrixProps {
  blueTeam: Record<Lane, string | null>;
  redTeam: Record<Lane, string | null>;
}

export const EquipmentMatrix: React.FC<EquipmentMatrixProps> = ({ blueTeam, redTeam }) => {
  const [activeSubTab, setActiveSubTab] = useState<'reactive' | 'builder' | 'rules' | 'swapping' | 'catalog'>('reactive');
  
  // Selected ally hero for building
  const [selectedAllyId, setSelectedAllyId] = useState<string>(() => {
    return Object.values(blueTeam).find(Boolean) || 'ruby';
  });

  // Selected enemy heroes to counter
  const [selectedEnemyIds, setSelectedEnemyIds] = useState<string[]>(() => {
    const fromRed = Object.values(redTeam).filter(Boolean) as string[];
    return fromRed.length > 0 ? fromRed : ['estes', 'change', 'terizla', 'claude', 'fanny'];
  });

  const [recommendation, setRecommendation] = useState<{
    recommended_items: Item[];
    rules_triggered: string[];
    swapping_sequence: string[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // Catalog category & search state
  const [catalogCategory, setCatalogCategory] = useState<string>('All');
  const [catalogSearch, setCatalogSearch] = useState<string>('');

  const filteredCatalogItems = React.useMemo(() => {
    return ITEMS.filter((item) => {
      const matchesCategory =
        catalogCategory === 'All' ||
        item.category === catalogCategory ||
        item.subcategory === catalogCategory;

      const q = catalogSearch.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.stats.toLowerCase().includes(q) ||
        item.passive.toLowerCase().includes(q) ||
        item.counter_tags.some(tag => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [catalogCategory, catalogSearch]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    recommendItems(selectedAllyId, selectedEnemyIds).then((res) => {
      if (isMounted) {
        setRecommendation(res);
        setIsLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [selectedAllyId, selectedEnemyIds]);

  const allyHero = HEROES.find(h => h.id === selectedAllyId) || HEROES[2]; // Ruby fallback

  return (
    <div className="space-y-6">
      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-surface-border pb-3 gap-3">
        <div className="flex items-center space-x-2">
          {[
            { id: 'reactive', label: 'Reactive Build Generator', icon: Shield },
            { id: 'builder', label: '6-Slot Loadout & Duel Sim', icon: Calculator },
            { id: 'rules', label: 'Direct Counter Rules', icon: Crosshair },
            { id: 'swapping', label: 'Late-Game Swapping Sim', icon: Zap },
            { id: 'catalog', label: 'Equipment Compendium', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveSubTab(tab.id as any);
                }}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gold-500 text-slate-950 font-bold shadow-mythic-glow'
                    : 'bg-surface hover:bg-surface-elevated text-slate-400 hover:text-slate-200 border border-surface-border'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-400 font-mono hidden md:inline">
          MLBB Patch 1.8.x Itemization Matrix
        </span>
      </div>

      {/* TAB 1: REACTIVE BUILD GENERATOR */}
      {activeSubTab === 'reactive' && (
        <div className="space-y-6">
          {/* Target Hero & Enemy Team Selection Card */}
          <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-4">
              {/* Ally Hero Selection */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-1">
                  1. Ally Hero to Itemize:
                </label>
                <select
                  value={selectedAllyId}
                  onChange={(e) => {
                    soundManager.playClick();
                    setSelectedAllyId(e.target.value);
                  }}
                  className="bg-surface-elevated border border-surface-border rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-gold-500 cursor-pointer font-bold"
                >
                  {HEROES.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} ({h.role} - {h.primary_lane} Lane)
                    </option>
                  ))}
                </select>
              </div>

              {/* Enemy Lineup Preview */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-red-400 block mb-1">
                  2. Opposing 5-Man Threats Evaluated:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEnemyIds.map((id) => {
                    const hero = HEROES.find(h => h.id === id);
                    if (!hero) return null;
                    return (
                      <span
                        key={id}
                        className="px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-500/30 text-xs font-bold text-red-200 flex items-center gap-1"
                      >
                        {hero.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Reactive Build Output */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-1.5 font-['Rajdhani',sans-serif]">
                  <Sparkles className="w-4 h-4 text-gold-400" /> Reactive 6-Slot Adaptation for {allyHero.name}
                </h3>
                <span className="text-xs text-slate-400">Dynamically generated against opposing threat stack</span>
              </div>

              {recommendation && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {recommendation.recommended_items.slice(0, 6).map((item, index) => (
                    <ItemTooltip key={`${item.id}-${index}`} item={item}>
                      <div className="bg-surface-elevated hover:bg-surface border border-surface-borderLight hover:border-gold-400 rounded-xl p-2.5 transition-all cursor-pointer flex flex-col justify-between h-32 group shadow-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                            Slot #{index + 1}
                          </span>
                          <span className="text-[9px] uppercase font-bold text-slate-400 truncate">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 my-auto">
                          <div className="w-11 h-11 rounded-lg overflow-hidden border border-gold-500/40 bg-slate-900 shrink-0 group-hover:scale-105 transition-transform shadow-md">
                            <img
                              src={`/items/${item.id}.png`}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-100 group-hover:text-gold-300 leading-tight truncate">
                              {item.name}
                            </h4>
                            <span className="text-[10px] text-emerald-400 font-mono mt-0.5 block">
                              {item.cost}g
                            </span>
                          </div>
                        </div>
                      </div>
                    </ItemTooltip>
                  ))}
                </div>
              )}
            </div>

            {/* Tactical Rationales & Triggered Rules */}
            {recommendation && recommendation.rules_triggered.length > 0 && (
              <div className="pt-3 border-t border-surface-border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Itemization Adaptation Triggers:
                </h4>
                <div className="space-y-1.5">
                  {recommendation.rules_triggered.map((rule, idx) => (
                    <div
                      key={idx}
                      className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-2.5 text-xs text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 6-SLOT LOADOUT & LIVE STAT CALCULATOR + 1v1 DUEL SIM */}
      {activeSubTab === 'builder' && (
        <BuildLoadoutCalculator blueTeam={blueTeam} redTeam={redTeam} />
      )}

      {/* TAB 3: DIRECT COUNTER RULES */}
      {activeSubTab === 'rules' && <CounterRulesView />}

      {/* TAB 4: LATE-GAME SWAPPING SIMULATOR */}
      {activeSubTab === 'swapping' && <ItemSwapper />}

      {/* TAB 4: EQUIPMENT COMPENDIUM */}
      {activeSubTab === 'catalog' && (
        <div className="bg-surface border border-surface-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
          {/* Header & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-border pb-4 gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold-400" /> MLBB Equipment Compendium & Counter Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Organized into Physical, Magic, Defense, Core Boots, and Roam Boots with verified patch passives and counter tags.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-surface-elevated border border-gold-500/30 text-gold-400 font-mono">
                {ITEMS.length} Total Items
              </span>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-surface-subtle p-3 rounded-xl border border-surface-border">
            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name, stats, passive, tags..."
                value={catalogSearch}
                onChange={(e) => setCatalogSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-canvas border border-surface-border rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              {[
                { id: 'All', label: 'All', icon: Layers, count: ITEMS.length, color: 'text-slate-300' },
                { id: 'Physical', label: 'Physical', icon: Sword, count: ITEMS.filter(i => i.category === 'Physical').length, color: 'text-red-400' },
                { id: 'Magic', label: 'Magic', icon: Sparkles, count: ITEMS.filter(i => i.category === 'Magic').length, color: 'text-purple-400' },
                { id: 'Defense', label: 'Defense', icon: Shield, count: ITEMS.filter(i => i.category === 'Defense').length, color: 'text-blue-400' },
                { id: 'Core Boots', label: 'Core Boots', icon: Footprints, count: ITEMS.filter(i => i.category === 'Core Boots').length, color: 'text-amber-400' },
                { id: 'Roam Boots', label: 'Roam Boots', icon: Zap, count: ITEMS.filter(i => i.category === 'Roam Boots').length, color: 'text-emerald-400' },
              ].map((cat) => {
                const Icon = cat.icon;
                const isSelected = catalogCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundManager.playClick();
                      setCatalogCategory(cat.id);
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-gold-500 text-slate-950 font-bold border-gold-400 shadow-mythic-glow'
                        : 'bg-surface text-slate-400 hover:text-slate-200 border-surface-border hover:bg-surface-elevated'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : cat.color}`} />
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-canvas text-slate-400'
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grouped View when 'All' selected & no search */}
          {catalogCategory === 'All' && !catalogSearch ? (
            <div className="space-y-6">
              {[
                { title: 'Physical Equipment', category: 'Physical', icon: Sword, color: 'text-red-400', desc: 'Attack damage, attack speed, critical strike chance, and armor penetration' },
                { title: 'Magic Equipment', category: 'Magic', icon: Sparkles, color: 'text-purple-400', desc: 'Magic power, mana sustain, magic penetration, and spell vamp' },
                { title: 'Defense Equipment', category: 'Defense', icon: Shield, color: 'text-blue-400', desc: 'Physical/magic mitigation, HP scaling, anti-heal aura, and resurrection' },
                { title: 'Core Boots', category: 'Core Boots', icon: Footprints, color: 'text-amber-400', desc: 'Base movement speed, CC resilience, CD reduction, and early sustain' },
                { title: 'Roam Boots', category: 'Roam Boots', icon: Zap, color: 'text-emerald-400', desc: 'Support/roam blessings: Conceal, Encourage, Favor, and Dire Hit' },
              ].map((section) => {
                const sectionItems = ITEMS.filter(i => i.category === section.category || i.subcategory === section.category);
                const SectionIcon = section.icon;
                return (
                  <div key={section.category} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-surface-border/60 pb-2">
                      <div className="flex items-center space-x-2">
                        <SectionIcon className={`w-4 h-4 ${section.color}`} />
                        <h4 className="text-sm font-bold text-slate-100 font-['Cinzel',serif]">
                          {section.title}
                        </h4>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-surface-elevated border border-surface-border text-slate-400">
                          {sectionItems.length} items
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 hidden sm:inline">{section.desc}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {sectionItems.map((item) => (
                        <ItemTooltip key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="text-xs text-slate-400 mb-3 flex items-center justify-between">
                <span>Showing {filteredCatalogItems.length} items matching criteria</span>
                {catalogCategory !== 'All' && (
                  <button
                    onClick={() => setCatalogCategory('All')}
                    className="text-gold-400 hover:underline text-xs"
                  >
                    View All Categories
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredCatalogItems.map((item) => (
                  <ItemTooltip key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
