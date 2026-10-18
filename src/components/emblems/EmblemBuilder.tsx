import React, { useState, useMemo } from 'react';
import { BASE_EMBLEMS, TALENTS_TIER_1, TALENTS_TIER_2, TALENTS_TIER_3 } from '../../data/emblems';
import { TalentCard } from './TalentCard';
import { MatchupEngine } from './MatchupEngine';
import { Sparkles, Copy, Check, Shield, Zap, Layers, ChevronRight, Edit3, Flame, Award, Crosshair } from 'lucide-react';
import { soundManager } from '../../services/sound';

export const EmblemBuilder: React.FC = () => {
  const [selectedBaseId, setSelectedBaseId] = useState<string>('fighter');
  const [selectedTier1Id, setSelectedTier1Id] = useState<string>('thrill');
  const [selectedTier2Id, setSelectedTier2Id] = useState<string>('festival_of_blood');
  const [selectedTier3Id, setSelectedTier3Id] = useState<string>('brave_smite');
  const [activeSocketTab, setActiveSocketTab] = useState<1 | 2 | 3>(1);
  const [copied, setCopied] = useState(false);

  const baseEmblem = BASE_EMBLEMS.find((b) => b.id === selectedBaseId) || BASE_EMBLEMS[1];
  const tier1Talent = TALENTS_TIER_1.find((t) => t.id === selectedTier1Id) || TALENTS_TIER_1[0];
  const tier2Talent = TALENTS_TIER_2.find((t) => t.id === selectedTier2Id) || TALENTS_TIER_2[4];
  const tier3Talent = TALENTS_TIER_3.find((t) => t.id === selectedTier3Id) || TALENTS_TIER_3[1];

  const handleApplyPreset = (baseId: string, t1Id: string, t2Id: string, t3Id: string) => {
    setSelectedBaseId(baseId);
    setSelectedTier1Id(t1Id);
    setSelectedTier2Id(t2Id);
    setSelectedTier3Id(t3Id);
  };

  const handleCopyCode = () => {
    soundManager.playGoldChime();
    const code = `[MLBB-EMBLEM:${baseEmblem.name.toUpperCase()}|T1:${tier1Talent.name.toUpperCase()}|T2:${tier2Talent.name.toUpperCase()}|T3:${tier3Talent.name.toUpperCase()}]`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate total combined attributes
  const totalAttributes = useMemo(() => {
    const stats: Record<string, string> = { ...baseEmblem.attributes };
    
    // Add Tier 1 stat bonus
    if (tier1Talent.id === 'thrill') stats['Adaptive Attack'] = (stats['Adaptive Attack'] ? `${stats['Adaptive Attack']} + 16` : '+16');
    if (tier1Talent.id === 'swift') stats['Attack Speed'] = (stats['Attack Speed'] ? `${stats['Attack Speed']} + 10%` : '+10%');
    if (tier1Talent.id === 'vitality') stats['Max HP'] = (stats['HP'] ? `${stats['HP']} + 225` : '+225');
    if (tier1Talent.id === 'rupture') stats['Adaptive Penetration'] = (stats['Adaptive Penetration'] ? `${stats['Adaptive Penetration']} + 5` : '+5');
    if (tier1Talent.id === 'inspire') stats['Cooldown Reduction'] = (stats['Cooldown Reduction'] ? `${stats['Cooldown Reduction']} + 5%` : '+5%');
    if (tier1Talent.id === 'firmness') stats['Hybrid Defense'] = (stats['Hybrid Defense'] ? `${stats['Hybrid Defense']} + 6` : '+6');
    if (tier1Talent.id === 'agility') stats['Movement Speed'] = (stats['Movement Speed'] ? `${stats['Movement Speed']} + 4%` : '+4%');
    if (tier1Talent.id === 'fatal') stats['Critical Stats'] = '+5% Crit Chance, +10% Crit Dmg';

    return stats;
  }, [baseEmblem, tier1Talent]);

  return (
    <div className="space-y-6">
      {/* 1. Integrated Matchup-Adaptive Calculator */}
      <MatchupEngine onApplyPreset={handleApplyPreset} />

      {/* 2. Official MLBB Emblem System Matrix */}
      <div className="bg-surface border border-surface-border rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-border pb-4 gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded border border-gold-500/30 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-gold-400" /> MLBB Official Talent Matrix
              </span>
              <span className="text-xs text-slate-400">• Level 60 Max Emblems</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100 mt-1 font-['Cinzel',serif]">
              Emblem & Talent Builder
            </h3>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={handleCopyCode}
              className="px-3.5 py-2 bg-surface-elevated hover:bg-surface border border-surface-border hover:border-gold-400 text-slate-200 hover:text-gold-400 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gold-400" />}
              {copied ? 'Code Copied!' : 'Export Build Code'}
            </button>
          </div>
        </div>

        {/* 3. Base Emblem Carousel (The 7 MLBB Emblems) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-gold-400 flex items-center gap-1.5 font-['Rajdhani',sans-serif]">
              <Layers className="w-4 h-4 text-gold-400" /> Base Emblem Selection
            </label>
            <span className="text-xs text-slate-400">Select 1 of 7 Base Emblems (Lv. 60)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {BASE_EMBLEMS.map((emblem) => {
              const isSelected = emblem.id === selectedBaseId;
              return (
                <button
                  key={emblem.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedBaseId(emblem.id);
                  }}
                  className={`group relative rounded-xl p-3 border text-center transition-all flex flex-col items-center justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-950/40 to-slate-900 border-gold-400 shadow-mythic-glow ring-2 ring-gold-400'
                      : 'bg-surface-elevated hover:bg-surface border-surface-border hover:border-slate-600'
                  }`}
                >
                  {/* Lv. 60 Badge */}
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-1 font-mono">
                    Lv. 60
                  </span>

                  {/* Emblem Crest Art */}
                  <div className="w-14 h-14 my-1 rounded-xl overflow-hidden p-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img
                      src={`/emblems/${emblem.id}.png`}
                      alt={emblem.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <span className="text-xs font-bold text-slate-100 group-hover:text-gold-300 font-['Cinzel',serif]">
                    {emblem.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Center MLBB Emblem Core Sanctum & 3 Connected Talent Sockets */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-gold-500/30 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          {/* Subtle celestial background rune */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0,transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* LEFT / CENTER: The MLBB 3-Socket Core Wheel */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center py-4">
              <div className="relative flex flex-col items-center">
                
                {/* Center Core Emblem Disc */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gold-500/60 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center p-3 shadow-[0_0_40px_rgba(245,158,11,0.25)] ring-4 ring-gold-500/20">
                  <div className="w-20 h-20 sm:w-24 sm:h-24">
                    <img
                      src={`/emblems/${baseEmblem.id}.png`}
                      alt={baseEmblem.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] animate-pulse"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-3 bg-gold-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    {baseEmblem.name}
                  </div>
                </div>

                {/* 3 Socket Nodes Layout */}
                <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 w-full max-w-lg">
                  
                  {/* Socket 1: Standard Talent */}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveSocketTab(1);
                    }}
                    className={`group rounded-2xl p-3 border transition-all flex flex-col items-center text-center relative ${
                      activeSocketTab === 1
                        ? 'bg-amber-950/40 border-gold-400 shadow-mythic-glow ring-2 ring-gold-400'
                        : 'bg-surface/80 border-surface-border hover:border-gold-500/50 hover:bg-surface'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-amber-400 mb-1">
                      Socket 1
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-gold-500/40 p-1 flex items-center justify-center mb-1.5 shadow-md group-hover:scale-105 transition-transform">
                      <img
                        src={`/talents/${tier1Talent.id}.png`}
                        alt={tier1Talent.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-100 group-hover:text-gold-300 line-clamp-1">
                      {tier1Talent.name}
                    </span>
                    <span className="text-[10px] text-emerald-400 mt-0.5 line-clamp-1">
                      Tier 1 Stat
                    </span>
                  </button>

                  {/* Socket 2: Advanced Talent */}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveSocketTab(2);
                    }}
                    className={`group rounded-2xl p-3 border transition-all flex flex-col items-center text-center relative ${
                      activeSocketTab === 2
                        ? 'bg-amber-950/40 border-gold-400 shadow-mythic-glow ring-2 ring-gold-400'
                        : 'bg-surface/80 border-surface-border hover:border-gold-500/50 hover:bg-surface'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-cyan-400 mb-1">
                      Socket 2
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/40 p-1 flex items-center justify-center mb-1.5 shadow-md group-hover:scale-105 transition-transform">
                      <img
                        src={`/talents/${tier2Talent.id}.png`}
                        alt={tier2Talent.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 line-clamp-1">
                      {tier2Talent.name}
                    </span>
                    <span className="text-[10px] text-cyan-400 mt-0.5 line-clamp-1">
                      Tier 2 Utility
                    </span>
                  </button>

                  {/* Socket 3: Core Keystone Talent */}
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setActiveSocketTab(3);
                    }}
                    className={`group rounded-2xl p-3 border transition-all flex flex-col items-center text-center relative ${
                      activeSocketTab === 3
                        ? 'bg-purple-950/40 border-purple-400 shadow-mythic-glow ring-2 ring-purple-400'
                        : 'bg-surface/80 border-surface-border hover:border-purple-500/50 hover:bg-surface'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-purple-400 mb-1">
                      Socket 3 (Core)
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-purple-500/40 p-1 flex items-center justify-center mb-1.5 shadow-md group-hover:scale-105 transition-transform">
                      <img
                        src={`/talents/${tier3Talent.id}.png`}
                        alt={tier3Talent.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-100 group-hover:text-purple-300 line-clamp-1">
                      {tier3Talent.name}
                    </span>
                    <span className="text-[10px] text-purple-400 mt-0.5 line-clamp-1">
                      Keystone
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT: MLBB "Total Attributes" In-Game Stat Sheet */}
            <div className="lg:col-span-5 bg-surface-elevated/90 border border-gold-500/30 rounded-2xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 font-['Rajdhani',sans-serif] flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-gold-400" /> Total Attributes (Combined)
                </h4>
                <span className="text-[11px] font-bold text-slate-400 font-mono">Lv. 60 Stats</span>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(totalAttributes).map(([stat, val]) => (
                  <div key={stat} className="bg-canvas/80 border border-surface-border rounded-lg p-2 flex flex-col justify-between">
                    <span className="text-slate-400 text-[10px] truncate">{stat}</span>
                    <span className="text-emerald-400 font-bold font-mono text-xs">{val}</span>
                  </div>
                ))}
              </div>

              {/* Active Talent Passives Descriptions */}
              <div className="space-y-2 pt-2 border-t border-surface-border">
                <div className="text-xs bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-2.5">
                  <div className="flex items-center space-x-1.5 text-cyan-300 font-bold mb-1">
                    <span>{tier2Talent.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Combat Utility)</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{tier2Talent.effect}</p>
                </div>

                <div className="text-xs bg-purple-950/20 border border-purple-500/30 rounded-xl p-2.5">
                  <div className="flex items-center space-x-1.5 text-purple-300 font-bold mb-1">
                    <span>{tier3Talent.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">(Core Keystone)</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{tier3Talent.effect}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Talent Selection Matrix (The Talent Picker for Chosen Socket) */}
        <div className="space-y-3 pt-2">
          {/* Socket Picker Tabs */}
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div className="flex items-center space-x-2">
              {[
                { tier: 1, label: 'Socket 1: Standard Talents', count: TALENTS_TIER_1.length, current: tier1Talent.name },
                { tier: 2, label: 'Socket 2: Advanced Talents', count: TALENTS_TIER_2.length, current: tier2Talent.name },
                { tier: 3, label: 'Socket 3: Core Keystones', count: TALENTS_TIER_3.length, current: tier3Talent.name },
              ].map((tab) => (
                <button
                  key={tab.tier}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveSocketTab(tab.tier as 1 | 2 | 3);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    activeSocketTab === tab.tier
                      ? 'bg-gold-500 text-slate-950 shadow-mythic-glow'
                      : 'bg-surface-elevated text-slate-400 hover:text-slate-200 border border-surface-border'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400 hidden sm:inline">
              Selected: <strong className="text-gold-400">
                {activeSocketTab === 1 ? tier1Talent.name : activeSocketTab === 2 ? tier2Talent.name : tier3Talent.name}
              </strong>
            </span>
          </div>

          {/* Grid of Talents for Current Socket */}
          {activeSocketTab === 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {TALENTS_TIER_1.map((talent) => (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                  isSelected={talent.id === selectedTier1Id}
                  onSelect={() => setSelectedTier1Id(talent.id)}
                />
              ))}
            </div>
          )}

          {activeSocketTab === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              {TALENTS_TIER_2.map((talent) => (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                  isSelected={talent.id === selectedTier2Id}
                  onSelect={() => setSelectedTier2Id(talent.id)}
                />
              ))}
            </div>
          )}

          {activeSocketTab === 3 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {TALENTS_TIER_3.map((talent) => (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                  isSelected={talent.id === selectedTier3Id}
                  onSelect={() => setSelectedTier3Id(talent.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
