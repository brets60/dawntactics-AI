import React, { useState } from 'react';
import { Shield, Flame, Zap, ArrowRight, CheckCircle2, Crosshair, Sparkles } from 'lucide-react';
import { ItemTooltip } from './ItemTooltip';
import { ITEMS } from '../../data/items';

export const CounterRulesView: React.FC = () => {
  // Interactive Radiant vs Athena Calculator State
  const [magicIncomingType, setMagicIncomingType] = useState<'burst' | 'tick'>('tick');
  const [enemyMagicPower, setEnemyMagicPower] = useState<number>(600);

  // Interactive Malefic Roar Calculator State
  const [enemyPhysicalDefense, setEnemyPhysicalDefense] = useState<number>(200);

  const dominanceIce = ITEMS.find(i => i.id === 'dominance_ice')!;
  const seaHalberd = ITEMS.find(i => i.id === 'sea_halberd')!;
  const glowingWand = ITEMS.find(i => i.id === 'glowing_wand')!;
  const radiantArmor = ITEMS.find(i => i.id === 'radiant_armor')!;
  const athenasShield = ITEMS.find(i => i.id === 'athenas_shield')!;
  const maleficRoar = ITEMS.find(i => i.id === 'malefic_roar')!;
  const divineGlaive = ITEMS.find(i => i.id === 'divine_glaive')!;
  const bladeArmor = ITEMS.find(i => i.id === 'blade_armor')!;
  const antiqueCuirass = ITEMS.find(i => i.id === 'antique_cuirass')!;

  // Malefic Roar penetration calculation: 20% base + 0.125% per point of enemy defense (cap 40% total)
  const maleficBonusPen = Math.min(20, Math.round(enemyPhysicalDefense * 0.125));
  const maleficTotalPen = 20 + maleficBonusPen;

  return (
    <div className="space-y-6">
      {/* Rule 1: Anti-Heal & Life Drain Matrix */}
      <div className="bg-surface border border-surface-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-surface-border pb-3">
          <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Flame className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif]">
              1. Anti-Heal & Life Drain Triaging (-50% Shield & HP Regen)
            </h3>
            <p className="text-xs text-slate-400">
              Mandatory adaptation against Estes, Ruby, Uranus, Yu Zhong, and high-lifesteal marksmen.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Dominance Ice */}
          <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Tanks / EXP / Roamers</span>
                <img src={`/items/${dominanceIce.id}.png`} alt={dominanceIce.name} className="w-8 h-8 rounded-lg border border-blue-500/40 shadow-sm object-cover" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">{dominanceIce.name}</h4>
              <p className="text-xs text-slate-400 mt-1">
                Passive <strong>Arctic Cold & Life Drain</strong> aura reduces enemy attack speed and cuts all nearby HP regen / shields by <strong>50%</strong> automatically.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-surface-border flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Application: <strong className="text-slate-200">Aura (Passive)</strong></span>
              <span className="text-gold-400 font-bold">{dominanceIce.cost}g</span>
            </div>
          </div>

          {/* Sea Halberd */}
          <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Physical Carries / MM</span>
                <img src={`/items/${seaHalberd.id}.png`} alt={seaHalberd.name} className="w-8 h-8 rounded-lg border border-red-500/40 shadow-sm object-cover" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">{seaHalberd.name}</h4>
              <p className="text-xs text-slate-400 mt-1">
                Applies 50% Life Drain on any physical hit. Passive <strong>Punish</strong> deals up to 8% extra damage against enemies with higher extra HP (anti-tank).
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-surface-border flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Application: <strong className="text-slate-200">On Physical Hit</strong></span>
              <span className="text-gold-400 font-bold">{seaHalberd.cost}g</span>
            </div>
          </div>

          {/* Glowing Wand */}
          <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Mages / Magic DPS</span>
                <img src={`/items/${glowingWand.id}.png`} alt={glowingWand.name} className="w-8 h-8 rounded-lg border border-purple-500/40 shadow-sm object-cover" />
              </div>
              <h4 className="text-sm font-bold text-slate-100">{glowingWand.name}</h4>
              <p className="text-xs text-slate-400 mt-1">
                Inflicts 50% Life Drain on any magic skill hit, plus burns targets for <strong>1.5% Max HP</strong> per second for 3 seconds.
              </p>
            </div>
            <div className="mt-3 pt-3 border-t border-surface-border flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Application: <strong className="text-slate-200">On Magic Hit</strong></span>
              <span className="text-gold-400 font-bold">{glowingWand.cost}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rule 2: Magic Defense Triaging (Radiant vs Athena) */}
      <div className="bg-surface border border-surface-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-surface-border pb-3">
          <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Shield className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif]">
              2. Magic Defense Triaging: Radiant Armor vs. Athena's Shield
            </h3>
            <p className="text-xs text-slate-400">
              Never buy the wrong magic defense. Continuous tick damage requires Radiant; single-hit burst requires Athena's Shield.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Radiant Armor Card */}
          <div
            onClick={() => setMagicIncomingType('tick')}
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              magicIncomingType === 'tick'
                ? 'bg-amber-950/20 border-gold-400 shadow-mythic-glow ring-1 ring-gold-400'
                : 'bg-surface-elevated border-surface-borderLight'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Continuous Tick Magic Counter</span>
              <img src={`/items/${radiantArmor.id}.png`} alt={radiantArmor.name} className="w-9 h-9 rounded-lg border border-gold-500/40 shadow-sm object-cover" />
            </div>
            <h4 className="text-base font-bold text-slate-100">{radiantArmor.name}</h4>
            <div className="text-xs text-emerald-400 font-medium my-1">{radiantArmor.stats}</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong>Holy Blessing:</strong> Reduces incoming magic damage per tick, stacking up to 6 times. Over a 3-second channel, negates up to <strong>65%</strong> of Chang'e or Valir's damage!
            </p>
            <div className="mt-3 text-[11px] text-slate-400 border-t border-surface-border pt-2">
              Targets: <strong className="text-gold-300">Chang'e, Valir, Yve, Kimmy, Silvanna, Harley</strong>
            </div>
          </div>

          {/* Athena's Shield Card */}
          <div
            onClick={() => setMagicIncomingType('burst')}
            className={`border rounded-xl p-4 cursor-pointer transition-all ${
              magicIncomingType === 'burst'
                ? 'bg-blue-950/20 border-cyan-400 shadow-blue-glow ring-1 ring-cyan-400'
                : 'bg-surface-elevated border-surface-borderLight'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Single-Rotation Burst Counter</span>
              <img src={`/items/${athenasShield.id}.png`} alt={athenasShield.name} className="w-9 h-9 rounded-lg border border-cyan-500/40 shadow-sm object-cover" />
            </div>
            <h4 className="text-base font-bold text-slate-100">{athenasShield.name}</h4>
            <div className="text-xs text-emerald-400 font-medium my-1">{athenasShield.stats}</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong>Shield:</strong> Immediately upon taking magic damage, reduces incoming magic damage taken by <strong>25% for 3s</strong>. Cooldown: 20s. Prevents instant death from bush ambushes.
            </p>
            <div className="mt-3 text-[11px] text-slate-400 border-t border-surface-border pt-2">
              Targets: <strong className="text-cyan-300">Kadita, Pharsa, Eudora, Aurora, Kagura, Vale</strong>
            </div>
          </div>
        </div>

        {/* Interactive Comparison Result Banner */}
        <div className="bg-canvas border border-surface-border rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-gold-400 font-bold">Selected Scenario:</span>
            <span className="text-slate-200 font-medium">
              {magicIncomingType === 'tick' ? "Facing Chang'e / Valir (Multi-tick Meteor Shower)" : "Facing Kadita / Eudora (1-Shot Rough Waves Dive)"}
            </span>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-surface-elevated border border-surface-border text-gold-300">
            Recommended Buy: {magicIncomingType === 'tick' ? "Radiant Armor" : "Athena's Shield"}
          </span>
        </div>
      </div>

      {/* Rule 3: Armor Penetration Scaling (Malefic Roar & Divine Glaive) */}
      <div className="bg-surface border border-surface-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-surface-border pb-3">
          <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Crosshair className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif]">
              3. Armor & Magic Penetration Scaling (Tank Busters)
            </h3>
            <p className="text-xs text-slate-400">
              The more defense the enemy stacks, the more penetration you automatically receive.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Malefic Roar */}
          <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Physical Penetration Scaling</span>
              <img src={`/items/${maleficRoar.id}.png`} alt={maleficRoar.name} className="w-9 h-9 rounded-lg border border-amber-500/40 shadow-sm object-cover" />
            </div>
            <h4 className="text-base font-bold text-slate-100">{maleficRoar.name}</h4>
            <div className="text-xs text-slate-300 mt-2">
              Base Penetration: <strong className="text-emerald-400">+20%</strong> | Passive: <strong className="text-amber-300">+0.125% per 1 Physical Def</strong> (Max 40% Total).
            </div>

            {/* Interactive Slider */}
            <div className="mt-4 pt-3 border-t border-surface-border">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Enemy Physical Defense:</span>
                <span className="font-mono text-gold-400 font-bold">{enemyPhysicalDefense} Armor</span>
              </div>
              <input
                type="range"
                min="50"
                max="400"
                step="10"
                value={enemyPhysicalDefense}
                onChange={(e) => setEnemyPhysicalDefense(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="mt-2 text-xs flex justify-between bg-surface rounded-lg p-2 border border-surface-border">
                <span className="text-slate-400">Calculated Physical Penetration:</span>
                <span className="font-mono text-emerald-400 font-black text-sm">{maleficTotalPen}% Armor Shred</span>
              </div>
            </div>
          </div>

          {/* Divine Glaive */}
          <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Magic Penetration Scaling</span>
                <img src={`/items/${divineGlaive.id}.png`} alt={divineGlaive.name} className="w-9 h-9 rounded-lg border border-purple-500/40 shadow-sm object-cover" />
              </div>
              <h4 className="text-base font-bold text-slate-100">{divineGlaive.name}</h4>
              <div className="text-xs text-slate-300 mt-2">
                Base Penetration: <strong className="text-emerald-400">+40%</strong> | Passive: <strong className="text-purple-300">+0.1% per 1 Magic Def</strong> (Max 20% Extra, up to 60% total).
              </div>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                Essential for Mages against tanks who buy Radiant Armor + Athena's Shield together. Converts opposing magic resistance into your damage multiplier.
              </p>
            </div>
            <div className="mt-3 text-xs bg-surface rounded-lg p-2 border border-surface-border flex justify-between">
              <span className="text-slate-400">Effect against 200 Magic Def:</span>
              <span className="font-mono text-purple-300 font-black text-sm">60% Magic Shred</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rule 4: Physical Mitigation (Blade Armor vs Antique Cuirass) */}
      <div className="bg-surface border border-surface-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-surface-border pb-3">
          <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Shield className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-['Cinzel',serif]">
              4. Physical Defense Mitigation: Blade Armor vs. Antique Cuirass
            </h3>
            <p className="text-xs text-slate-400">
              Countering basic-attack marksmen vs. skill-based assassin burst.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Blade Armor */}
          <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Anti-Crit & Basic Attack DPS</span>
              <img src={`/items/${bladeArmor.id}.png`} alt={bladeArmor.name} className="w-9 h-9 rounded-lg border border-red-500/40 shadow-sm object-cover" />
            </div>
            <h4 className="text-base font-bold text-slate-100">{bladeArmor.name}</h4>
            <div className="text-xs text-emerald-400 font-medium my-1">{bladeArmor.stats}</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Reflects <strong>20% of incoming basic attack damage</strong> back to the attacker as Physical Damage and reduces critical strike damage taken by <strong>20%</strong>. Destroys Claude, Bruno, and Miya!
            </p>
          </div>

          {/* Antique Cuirass */}
          <div className="bg-surface-elevated border border-surface-borderLight rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Anti-Skill Burst Assassins</span>
              <img src={`/items/${antiqueCuirass.id}.png`} alt={antiqueCuirass.name} className="w-9 h-9 rounded-lg border border-blue-500/40 shadow-sm object-cover" />
            </div>
            <h4 className="text-base font-bold text-slate-100">{antiqueCuirass.name}</h4>
            <div className="text-xs text-emerald-400 font-medium my-1">{antiqueCuirass.stats}</div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              <strong>Deter:</strong> When hit by an enemy skill, reduces the attacker's Physical Attack by 6% per stack (up to 3 stacks, <strong>-18% Total Physical Attack</strong>). Hard counters Fanny, Hayabusa, and Paquito!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
