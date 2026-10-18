import { Item } from '../types/mlbb';

export const ITEMS: Item[] = [
  {
    "id": "blade_of_despair",
    "name": "Blade of Despair",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 3010,
    "stats": "+160 Physical Attack, +5% Movement Speed",
    "passive": "Despair: Attacking enemy units that have HP below 50% increases Physical Attack by 25% for 2s.",
    "counter_tags": [
      "execution",
      "burst",
      "raw-damage"
    ],
    "trigger_condition": "Triggers on attacking enemies with under 50% HP.",
    "recommended_against": [
      "Low-durability carries",
      "Squishy targets"
    ],
    "icon_symbol": "🗡️"
  },
  {
    "id": "hunter_strike",
    "name": "Hunter Strike",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2010,
    "stats": "+80 Physical Attack, +10% Cooldown Reduction, +15 Physical Penetration",
    "passive": "Retribution: Dealing damage to an enemy creep or hero 5 times in a row increases Movement Speed by 50% that rapidly decays over 3s. Cooldown: 8s.",
    "counter_tags": [
      "mobility",
      "physical-penetration",
      "kite"
    ],
    "trigger_condition": "Hits an enemy unit 5 times in continuous combat.",
    "recommended_against": [
      "Kiting comps",
      "Squishy backlines"
    ],
    "icon_symbol": "⚡"
  },
  {
    "id": "malefic_roar",
    "name": "Malefic Roar",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2060,
    "stats": "+60 Physical Attack, +20% Physical Penetration",
    "passive": "Armor Buster: Each point of enemy's Physical Defense increases Physical Penetration by 0.125% when dealing damage, capped at 40%.",
    "counter_tags": [
      "anti-tank",
      "armor-penetration",
      "anti-defense"
    ],
    "trigger_condition": "Passive scales dynamically with target's total Physical Defense.",
    "recommended_against": [
      "Tigreal",
      "Baxia",
      "Fredrinn",
      "Khufra",
      "Ruby",
      "Terizla"
    ],
    "icon_symbol": "💥"
  },
  {
    "id": "sea_halberd",
    "name": "Sea Halberd",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2050,
    "stats": "+80 Physical Attack, +20% Attack Speed",
    "passive": "Life Drain: Dealing damage reduces target's shield and HP regen by 50% for 3s. Punish: Increases damage by 8% against enemy heroes with higher extra HP.",
    "counter_tags": [
      "anti-heal",
      "anti-tank",
      "anti-sustain"
    ],
    "trigger_condition": "Triggers on any physical damage dealt to enemies.",
    "recommended_against": [
      "Estes",
      "Fredrinn",
      "Ruby",
      "Barats",
      "Thamuz",
      "Uranus"
    ],
    "icon_symbol": "🔱"
  },
  {
    "id": "demon_hunter_sword",
    "name": "Demon Hunter Sword",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2180,
    "stats": "+35 Physical Attack, +25% Attack Speed",
    "passive": "Devour: Basic attacks deal 8% of target's current HP as extra physical damage. Each basic attack grants 3% Lifesteal for 3s (stacks up to 5 times).",
    "counter_tags": [
      "anti-high-hp",
      "anti-tank",
      "tank-buster"
    ],
    "trigger_condition": "Applies on every basic attack on-hit.",
    "recommended_against": [
      "Fredrinn",
      "Baxia",
      "Hylos",
      "Barats",
      "Terizla",
      "Uranus"
    ],
    "icon_symbol": "⚔️"
  },
  {
    "id": "rose_gold_meteor",
    "name": "Rose Gold Meteor",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2120,
    "stats": "+60 Physical Attack, +23 Magic Defense, +10% Lifesteal",
    "passive": "Lifeline: When HP falls below 30%, gains a 510-1350 point shield and +25 Magic Defense for 3s. Cooldown: 40s.",
    "counter_tags": [
      "clutch-shield",
      "survival",
      "anti-magic-burst"
    ],
    "trigger_condition": "Triggers automatically when dropping below 30% HP.",
    "recommended_against": [
      "Kadita",
      "Pharsa",
      "Eudora",
      "Burst mages"
    ],
    "icon_symbol": "🌹"
  },
  {
    "id": "wind_of_nature",
    "name": "Wind of Nature",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 1910,
    "stats": "+30 Physical Attack, +20% Attack Speed, +10% Lifesteal",
    "passive": "Wind Chant (Active): Immune to all incoming Physical Damage for 2s (1s for non-Marksman). Cooldown: 70s.",
    "counter_tags": [
      "physical-immunity",
      "anti-assassin",
      "clutch"
    ],
    "trigger_condition": "Manually activated upon being dived by physical burst.",
    "recommended_against": [
      "Fanny",
      "Hayabusa",
      "Ling",
      "Saber",
      "Bruno"
    ],
    "icon_symbol": "🍃"
  },
  {
    "id": "war_axe",
    "name": "War Axe",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2100,
    "stats": "+40 Physical Attack, +400 HP, +10% Cooldown Reduction, +12% Spell Vamp",
    "passive": "Fighting Spirit: Dealing damage grants 12 Physical Attack & 2% Spell Vamp per second for 4s (max 6 stacks). At max stacks, deals 10% extra True Damage.",
    "counter_tags": [
      "sustained-fighter",
      "true-damage",
      "spell-vamp"
    ],
    "trigger_condition": "Gains stacks continuously by dealing damage in combat.",
    "recommended_against": [
      "Extended teamfights",
      "Tanky compositions"
    ],
    "icon_symbol": "🪓"
  },
  {
    "id": "endless_battle",
    "name": "Endless Battle",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2470,
    "stats": "+65 Physical Attack, +250 HP, +10% Cooldown Reduction, +8% Hybrid Lifesteal, +5% Movement Speed, +5 Mana Regen",
    "passive": "Divine Justice: After using a skill, next basic attack deals 60% of Physical Attack as True Damage. Chase Fate: Triggers +10% Movement Speed.",
    "counter_tags": [
      "true-damage",
      "hybrid-lifesteal",
      "combo-burst"
    ],
    "trigger_condition": "Triggers on basic attack within 3s after skill cast.",
    "recommended_against": [
      "High-defense armor stackers",
      "Brawlers"
    ],
    "icon_symbol": "🔮"
  },
  {
    "id": "berserkers_fury",
    "name": "Berserker's Fury",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2250,
    "stats": "+65 Physical Attack, +25% Critical Chance, +40% Critical Damage",
    "passive": "Doom: Critical hits grant +5% Physical Attack for 2s.",
    "counter_tags": [
      "crit-burst",
      "scaling-dps"
    ],
    "trigger_condition": "Triggers on critical strike landings.",
    "recommended_against": [
      "Squishy targets",
      "Mid-late game carries"
    ],
    "icon_symbol": "🪓"
  },
  {
    "id": "haas_claws",
    "name": "Haas' Claws",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2020,
    "stats": "+30 Physical Attack, +20% Attack Speed, +20% Critical Chance, +25% Lifesteal",
    "passive": "Frenzy: Critical strikes grant +20% Attack Speed for 2s.",
    "counter_tags": [
      "lifesteal",
      "sustain-dps",
      "crit-synergy"
    ],
    "trigger_condition": "Always active on-hit lifesteal; bonus speed on crits.",
    "recommended_against": [
      "Poke comps",
      "Sustained trades"
    ],
    "icon_symbol": "🐾"
  },
  {
    "id": "golden_staff",
    "name": "Golden Staff",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2000,
    "stats": "+55 Physical Attack, +15% Attack Speed",
    "passive": "Swift: Converts Critical Chance into Attack Speed. Endless Strike: Every 3rd basic attack triggers on-hit effects twice and adds 100% attack speed.",
    "counter_tags": [
      "on-hit-multiplier",
      "attack-speed-hypercarry"
    ],
    "trigger_condition": "Applies bonus strike every 3rd basic attack.",
    "recommended_against": [
      "High HP tanks when paired with DHS"
    ],
    "icon_symbol": "🦯"
  },
  {
    "id": "corrosion_scythe",
    "name": "Corrosion Scythe",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2050,
    "stats": "+30 Physical Attack, +35% Attack Speed, +5% Movement Speed",
    "passive": "Corrosion: Basic attacks deal 80 extra Physical Damage and slow enemies by 8% (stacks up to 5 times, max 40% slow). Impulse: Grants +6% Attack Speed per hit.",
    "counter_tags": [
      "slow",
      "kiting",
      "attack-speed-stacking"
    ],
    "trigger_condition": "Stacks on consecutive basic attacks.",
    "recommended_against": [
      "High mobility heroes without dash",
      "Kiteable melee"
    ],
    "icon_symbol": "🌾"
  },
  {
    "id": "windtalker",
    "name": "Windtalker",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 1820,
    "stats": "+40% Attack Speed, +20 Movement Speed, +10% Critical Chance",
    "passive": "Typhoon: Every 5-3s, next basic attack hits up to 3 enemies with 150-362 Magic Damage (can crit). Each trigger increases Movement Speed by 5% for a short time.",
    "counter_tags": [
      "waveclear",
      "aoe-magic-burst",
      "movement-speed"
    ],
    "trigger_condition": "Triggers automatically every 3-5 seconds on basic attack.",
    "recommended_against": [
      "Grouped minions",
      "Squishy backlines"
    ],
    "icon_symbol": "🌪️"
  },
  {
    "id": "great_dragon_spear",
    "name": "Great Dragon Spear",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2140,
    "stats": "+70 Physical Attack, +10% Cooldown Reduction, +20% Critical Chance",
    "passive": "Supreme Warrior: Casting Ultimate grants 15% Movement Speed for 7.5s. Cooldown: 15s.",
    "counter_tags": [
      "ultimate-mobility",
      "crit-scaling"
    ],
    "trigger_condition": "Triggers immediately upon Ultimate skill activation.",
    "recommended_against": [
      "Flanking assassins",
      "High mobility divers"
    ],
    "icon_symbol": "🔱"
  },
  {
    "id": "blade_of_the_heptaseas",
    "name": "Blade of the Heptaseas",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 1950,
    "stats": "+70 Physical Attack, +250 HP, +15 Physical Penetration",
    "passive": "Ambush: If no damage taken or dealt within 5s, next Basic Attack deals 160 + 40% Physical Attack extra Physical Damage and slows target by 40% for 1.5s.",
    "counter_tags": [
      "ambush-burst",
      "bush-assassin",
      "early-snowball"
    ],
    "trigger_condition": "Triggers out of combat or from bush ambush.",
    "recommended_against": [
      "Squishy marksmen",
      "Immobile mages"
    ],
    "icon_symbol": "🗡️"
  },
  {
    "id": "sky_piercer",
    "name": "Sky Piercer",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 1500,
    "stats": "+60 Adaptive Attack, +15 Movement Speed",
    "passive": "Lethality: Executing enemy heroes below 4% (+0.1% per stack, up to 12%) HP immediately kills them. Stacks up to 80 on kills.",
    "counter_tags": [
      "execute",
      "snowball",
      "adaptive-execution"
    ],
    "trigger_condition": "Dealing damage to targets below execute threshold.",
    "recommended_against": [
      "Snowballing games",
      "Sustain carries that survive on low HP"
    ],
    "icon_symbol": "🏹"
  },
  {
    "id": "malefic_gun",
    "name": "Malefic Gun",
    "category": "Physical",
    "subcategory": "Physical",
    "cost": 2050,
    "stats": "+45 Physical Attack, +25% Attack Speed, +15% Lifesteal",
    "passive": "Malefic Energy (Active): Increases Basic Attack Range by 15% and gains 10% Movement Speed upon basic attacking. Cooldown: 60s.",
    "counter_tags": [
      "range-extension",
      "safe-sieging"
    ],
    "trigger_condition": "Activated to out-range enemy towers or dive threats.",
    "recommended_against": [
      "Dangerous dive compositions",
      "Heavy CC frontlines"
    ],
    "icon_symbol": "🔫"
  },
  {
    "id": "holy_crystal",
    "name": "Holy Crystal",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2180,
    "stats": "+100 Magic Power",
    "passive": "Mystery: Increases Magic Power by 21%-35% (scaling with hero level).",
    "counter_tags": [
      "magic-burst",
      "scaling"
    ],
    "trigger_condition": "Passive percentage amplification of total magic power.",
    "recommended_against": [
      "Squishy targets",
      "Mid-game snowball"
    ],
    "icon_symbol": "💎"
  },
  {
    "id": "divine_glaive",
    "name": "Divine Glaive",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 1970,
    "stats": "+60 Magic Power, +40% Magic Penetration",
    "passive": "Spellbreaker: Each point of enemy's Magic Defense increases Magic Penetration by 0.1% when dealing damage, capped at 20%.",
    "counter_tags": [
      "anti-tank",
      "magic-penetration",
      "anti-magic-defense"
    ],
    "trigger_condition": "Passive scales with target's total Magic Defense.",
    "recommended_against": [
      "Radiant Armor users",
      "Athena's Shield users",
      "Tanks",
      "Baxia"
    ],
    "icon_symbol": "🪄"
  },
  {
    "id": "glowing_wand",
    "name": "Glowing Wand",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2120,
    "stats": "+75 Magic Power, +400 HP, +5% Movement Speed",
    "passive": "Scorch: Burns targets for 1.5% of target's Max HP as Magic Damage per second for 3s. Life Drain: Reduces enemy shield & HP regen by 50% for 3s.",
    "counter_tags": [
      "anti-heal",
      "anti-sustain",
      "burn",
      "anti-tank"
    ],
    "trigger_condition": "Triggers on any magic damage skill hit.",
    "recommended_against": [
      "Estes",
      "Ruby",
      "Fredrinn",
      "Uranus",
      "Barats",
      "Floryn"
    ],
    "icon_symbol": "🔥"
  },
  {
    "id": "winter_crown",
    "name": "Winter Crown",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 1910,
    "stats": "+45 Adaptive Attack, +400 HP, +5% Cooldown Reduction",
    "passive": "Frozen (Active): Freeze yourself for 2s, becoming invulnerable and untargetable while unable to act. Skills currently active continue channeling! Cooldown: 100s.",
    "counter_tags": [
      "invulnerability",
      "survival",
      "anti-burst",
      "clutch"
    ],
    "trigger_condition": "Manually activated. Can be used during skill channels (e.g. Claude ult).",
    "recommended_against": [
      "Hayabusa",
      "Ling",
      "Pharsa",
      "Kadita",
      "Lancelot"
    ],
    "icon_symbol": "👑"
  },
  {
    "id": "genius_wand",
    "name": "Genius Wand",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2000,
    "stats": "+75 Magic Power, +5% Movement Speed, +10 Magic Penetration",
    "passive": "Magic: Dealing damage to enemy heroes reduces their Magic Defense by 3-7 points for 2s (stacks up to 3 times, -21 magic defense).",
    "counter_tags": [
      "flat-magic-penetration",
      "early-shred"
    ],
    "trigger_condition": "Stacks on dealing consecutive magic damage.",
    "recommended_against": [
      "Low magic defense targets",
      "Squishies"
    ],
    "icon_symbol": "🪄"
  },
  {
    "id": "blood_wings",
    "name": "Blood Wings",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 3000,
    "stats": "+150 Magic Power, +500 HP",
    "passive": "Guard: Gains a shield equal to 800 + 100% Magic Power. When shield is destroyed, gains 30 Movement Speed for 1s. Shield restores after 20s.",
    "counter_tags": [
      "huge-shield",
      "late-game-magic-apex"
    ],
    "trigger_condition": "Always active shield regenerating 20s out of combat.",
    "recommended_against": [
      "Burst assassins",
      "Late game teamfights"
    ],
    "icon_symbol": "🪽"
  },
  {
    "id": "lightning_truncheon",
    "name": "Lightning Truncheon",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2250,
    "stats": "+75 Magic Power, +400 Mana, +10% Cooldown Reduction",
    "passive": "Resonate: Every 6s, next magic skill echoes, dealing 50-1000 Magic Damage (scaling with Max Mana) to up to 3 enemies.",
    "counter_tags": [
      "aoe-magic-burst",
      "waveclear"
    ],
    "trigger_condition": "Triggers on skill damage every 6 seconds.",
    "recommended_against": [
      "Grouped squishy backlines",
      "Fast wave clears"
    ],
    "icon_symbol": "⚡"
  },
  {
    "id": "clock_of_destiny",
    "name": "Clock of Destiny",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 1950,
    "stats": "+60 Magic Power, +500 HP, +600 Mana",
    "passive": "Time: Gains 20 Max HP and 5 Magic Power every 20s (up to 10 stacks). At max stacks, gains extra 5% Magic Power and 300 Max Mana.",
    "counter_tags": [
      "mana-scaling",
      "sustain-mage"
    ],
    "trigger_condition": "Passively stacks over 200 seconds of combat/play.",
    "recommended_against": [
      "Late game scaling matches",
      "Mana-hungry mages"
    ],
    "icon_symbol": "⏳"
  },
  {
    "id": "concentrated_energy",
    "name": "Concentrated Energy",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2020,
    "stats": "+70 Magic Power, +700 HP, +20% Spell Vamp",
    "passive": "Recharge: Dealing magic damage grants 5 extra Magic Power for 5s (stacks up to 6 times). At max stacks, increases Magic Damage by 12%.",
    "counter_tags": [
      "spell-vamp",
      "sustain-mage",
      "brawler-mage"
    ],
    "trigger_condition": "Continuously dealing magic damage stacks spell power.",
    "recommended_against": [
      "Attrition fights",
      "Sustained brawlers"
    ],
    "icon_symbol": "🔮"
  },
  {
    "id": "starlium_scythe",
    "name": "Starlium Scythe",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2220,
    "stats": "+70 Magic Power, +10% Cooldown Reduction, +8% Hybrid Lifesteal, +6 Mana Regen",
    "passive": "Crisis: After casting a skill, next Basic Attack deals 100 + 100% Magic Power as extra True Damage and gains 10% Movement Speed.",
    "counter_tags": [
      "true-damage",
      "hybrid-lifesteal",
      "skill-basic-combo"
    ],
    "trigger_condition": "Triggers on basic attack following skill cast.",
    "recommended_against": [
      "High magic resistance tanks",
      "Gusion",
      "Karina",
      "Harith"
    ],
    "icon_symbol": "🌙"
  },
  {
    "id": "feather_of_heaven",
    "name": "Feather of Heaven",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2030,
    "stats": "+55 Magic Power, +20% Attack Speed, +5% Movement Speed, +5% Cooldown Reduction",
    "passive": "Affliction: Basic attacks deal 50 + 30% Magic Power as extra Magic Damage. Impulse: Basic attacks increase Attack Speed by 6% (up to 5 stacks).",
    "counter_tags": [
      "magic-attack-speed",
      "on-hit-magic"
    ],
    "trigger_condition": "Applies on every basic attack.",
    "recommended_against": [
      "Natan",
      "Harith",
      "Zhask",
      "Silvanna"
    ],
    "icon_symbol": "🪶"
  },
  {
    "id": "wishing_lantern",
    "name": "Wishing Lantern",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2160,
    "stats": "+75 Magic Power, +400 HP, +10% Cooldown Reduction",
    "passive": "Butterfly: For every 800 Magic Damage dealt, releases a Butterfly that attacks enemy dealing 10% of target's current HP as Magic Damage.",
    "counter_tags": [
      "anti-tank-magic",
      "high-hp-drain"
    ],
    "trigger_condition": "Accumulates every 800 points of magic damage dealt.",
    "recommended_against": [
      "Hylos",
      "Fredrinn",
      "Barats",
      "High HP frontlines"
    ],
    "icon_symbol": "🏮"
  },
  {
    "id": "flask_of_the_oasis",
    "name": "Flask of the Oasis",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 1850,
    "stats": "+60 Magic Power, +300 HP, +10% Cooldown Reduction, +12% Heal and Shield Effect",
    "passive": "Blessing: After casting a skill that heals or shields an ally, if their HP drops below 35% within 3s, they gain a 660-1500 point shield and 15% CD reduction.",
    "counter_tags": [
      "support-lifesaver",
      "heal-amplification"
    ],
    "trigger_condition": "Triggers upon shielding/healing critical-HP ally.",
    "recommended_against": [
      "Burst assassins attempting to pick off carries"
    ],
    "icon_symbol": "🏺"
  },
  {
    "id": "ice_queen_wand",
    "name": "Ice Queen Wand",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2240,
    "stats": "+75 Magic Power, +10% Spell Vamp, +300 Mana, +7% Movement Speed",
    "passive": "Ice Bound: Skills that deal damage slow enemy heroes by 10% for 2s (stacks up to 3 times, max 30% slow).",
    "counter_tags": [
      "continuous-slow",
      "kiting-zone"
    ],
    "trigger_condition": "Triggers on dealing skill damage.",
    "recommended_against": [
      "Melee heroes without gap closers",
      "Dive compositions"
    ],
    "icon_symbol": "❄️"
  },
  {
    "id": "fleeting_time",
    "name": "Fleeting Time",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 2050,
    "stats": "+70 Magic Power, +350 HP, +15% Cooldown Reduction",
    "passive": "Timestream: Hero kills or assists reduce current Ultimate cooldown by 30%.",
    "counter_tags": [
      "ultimate-cooldown-reset",
      "snowball-reset"
    ],
    "trigger_condition": "Triggers immediately on takedown or assist.",
    "recommended_against": [
      "High ultimate-dependent mages/supports",
      "Atlas",
      "Angela",
      "Diggie"
    ],
    "icon_symbol": "⌛"
  },
  {
    "id": "enchanted_talisman",
    "name": "Enchanted Talisman",
    "category": "Magic",
    "subcategory": "Magic",
    "cost": 1870,
    "stats": "+50 Magic Power, +250 HP, +20% Cooldown Reduction",
    "passive": "Mana Spring: Regenerates 15% Max Mana every 10s. Magic Mastery: Max Cooldown Reduction is increased by 5% (up to 45% CD).",
    "counter_tags": [
      "infinite-mana",
      "max-cooldown-reduction"
    ],
    "trigger_condition": "Always active passive mana regen and CD expansion.",
    "recommended_against": [
      "Spam-heavy mages",
      "Novaria",
      "Cecilion",
      "Xavier"
    ],
    "icon_symbol": "📖"
  },
  {
    "id": "dominance_ice",
    "name": "Dominance Ice",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 2010,
    "stats": "+500 Mana, +55 Physical Defense, +5% Movement Speed",
    "passive": "Life Drain: Reduces shield and HP regen of nearby enemy heroes by 50%. Arctic Cold: Reduces nearby enemy attack speed to 75%.",
    "counter_tags": [
      "anti-heal",
      "anti-sustain",
      "anti-attack-speed"
    ],
    "trigger_condition": "Aura activates automatically within 3.5 yards of enemies.",
    "recommended_against": [
      "Estes",
      "Ruby",
      "Uranus",
      "Yu Zhong",
      "Claude",
      "Bruno"
    ],
    "icon_symbol": "❄️"
  },
  {
    "id": "radiant_armor",
    "name": "Radiant Armor",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 1880,
    "stats": "+950 HP, +40 Magic Defense, +12 HP Regen",
    "passive": "Holy Blessing: Reduces incoming continuous Magic Damage per stack (up to 6 stacks).",
    "counter_tags": [
      "anti-continuous-magic",
      "counter-change",
      "counter-valir",
      "anti-magic"
    ],
    "trigger_condition": "Gains 1 stack each time magic damage is taken; max 6 stacks lasting 3s.",
    "recommended_against": [
      "Chang'e",
      "Valir",
      "Yve",
      "Kimmy",
      "Silvanna",
      "Harley"
    ],
    "icon_symbol": "✨"
  },
  {
    "id": "athenas_shield",
    "name": "Athena's Shield",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 2150,
    "stats": "+900 HP, +62 Magic Defense, +2 HP Regen",
    "passive": "Shield: Triggers upon taking Magic Damage, reducing Magic Damage taken by 25% for 3s.",
    "counter_tags": [
      "anti-burst-magic",
      "counter-eudora",
      "counter-aurora",
      "anti-magic"
    ],
    "trigger_condition": "Triggers immediately on first magic hit; 20s cooldown out of combat.",
    "recommended_against": [
      "Kadita",
      "Pharsa",
      "Eudora",
      "Aurora",
      "Kagura",
      "Vale"
    ],
    "icon_symbol": "🛡️"
  },
  {
    "id": "blade_armor",
    "name": "Blade Armor",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 1910,
    "stats": "+70 Physical Defense",
    "passive": "Bladed Armor: Reflects 20% of incoming Basic Attack physical damage back to attacker and reduces critical strike damage taken by 20%.",
    "counter_tags": [
      "anti-crit",
      "counter-marksman",
      "anti-physical"
    ],
    "trigger_condition": "Always active on taking incoming basic attack physical damage.",
    "recommended_against": [
      "Bruno",
      "Claude",
      "Lesley",
      "Miya",
      "Ling",
      "Beatrix"
    ],
    "icon_symbol": "⚔️"
  },
  {
    "id": "antique_cuirass",
    "name": "Antique Cuirass",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 2170,
    "stats": "+920 HP, +40 Physical Defense, +4 HP Regen",
    "passive": "Deter: When hit by an enemy skill, reduces target's Physical Attack by 6% for 2s (stacks up to 3 times, -18% total physical attack).",
    "counter_tags": [
      "anti-skill-burst",
      "anti-assassin",
      "anti-physical"
    ],
    "trigger_condition": "Triggers automatically upon being struck by an enemy physical skill.",
    "recommended_against": [
      "Fanny",
      "Hayabusa",
      "Lancelot",
      "Paquito",
      "Saber",
      "Yu Zhong"
    ],
    "icon_symbol": "🥋"
  },
  {
    "id": "immortality",
    "name": "Immortality",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 2120,
    "stats": "+800 HP, +20 Physical Defense",
    "passive": "Immortal: Resurrects 2.5s after death with 16% Max HP and a 220-1200 point shield lasting 3s. Cooldown: 210s.",
    "counter_tags": [
      "resurrection",
      "survival",
      "clutch"
    ],
    "trigger_condition": "Triggers automatically on fatal damage. Cooldown 210s.",
    "recommended_against": [
      "High burst compositions",
      "Assassins",
      "Dive comps"
    ],
    "icon_symbol": "⚰️"
  },
  {
    "id": "oracle",
    "name": "Oracle",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 2060,
    "stats": "+850 HP, +25 Magic Defense, +25 Physical Defense, +10% CD Reduction",
    "passive": "Bless: Increases shield absorption and HP regen effects received by 30%.",
    "counter_tags": [
      "sustain-amplification",
      "hybrid-defense",
      "anti-poke"
    ],
    "trigger_condition": "Passively amplifies all incoming heals and shields.",
    "recommended_against": [
      "Poke compositions",
      "Mixed damage teams"
    ],
    "icon_symbol": "🔮"
  },
  {
    "id": "thunder_belt",
    "name": "Thunder Belt",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 1990,
    "stats": "+800 HP, +15 Physical Defense, +15 Magic Defense, +20 Movement Speed",
    "passive": "Thunderbolt: After using a skill, next basic attack deals True Damage based on hybrid defense and permanently stacks hybrid defense per enemy hero hit.",
    "counter_tags": [
      "true-damage",
      "hybrid-scaling",
      "slow"
    ],
    "trigger_condition": "Triggers on basic attack following skill usage.",
    "recommended_against": [
      "Melee duelists",
      "Tank mirrors"
    ],
    "icon_symbol": "⚡"
  },
  {
    "id": "guardian_helmet",
    "name": "Guardian Helmet",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 2200,
    "stats": "+1550 HP, +20 HP Regen",
    "passive": "Recovery: Regenerates 2.5% of Max HP per second outside of combat (1.5% in combat).",
    "counter_tags": [
      "massive-hp",
      "out-of-combat-regen",
      "no-recall"
    ],
    "trigger_condition": "Continuous passive HP regeneration.",
    "recommended_against": [
      "Poke compositions",
      "Attrition lane battles"
    ],
    "icon_symbol": "🪖"
  },
  {
    "id": "twilight_armor",
    "name": "Twilight Armor",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 2100,
    "stats": "+1200 HP, +15 Physical Defense",
    "passive": "Twilight: When taking single physical damage exceeding 600 points, the excess damage is reduced by 20% + 0.3% extra HP.",
    "counter_tags": [
      "anti-one-shot",
      "anti-lesley",
      "anti-aldous"
    ],
    "trigger_condition": "Triggers on taking heavy single-instance physical hit.",
    "recommended_against": [
      "Aldous",
      "Lesley",
      "Brody",
      "One-hit burst carries"
    ],
    "icon_symbol": "🛡️"
  },
  {
    "id": "brute_force_breastplate",
    "name": "Brute Force Breastplate",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 1870,
    "stats": "+600 HP, +23 Physical Defense, +10% Cooldown Reduction",
    "passive": "Brute Force: Using skills or basic attacks grants +6 Physical & Magic Defense and +2% Movement Speed for 4s (stacks up to 6 times). At max stacks, reduces CC duration by 15%.",
    "counter_tags": [
      "hybrid-defense-stacking",
      "tenacity",
      "mobility"
    ],
    "trigger_condition": "Maintains stacks by landing attacks or abilities in combat.",
    "recommended_against": [
      "Mobile fighters",
      "Extended dueling brawlers"
    ],
    "icon_symbol": "🦺"
  },
  {
    "id": "queens_wings",
    "name": "Queen's Wings",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 2250,
    "stats": "+40 Adaptive Attack, +600 HP, +10% Cooldown Reduction, +10% Spell Vamp",
    "passive": "Demonize: When HP drops below 40%, gains 30% Damage Reduction for 3s and reduces skill cooldowns by 2s. Cooldown: 60s.",
    "counter_tags": [
      "clutch-damage-reduction",
      "spell-vamp-fighter"
    ],
    "trigger_condition": "Triggers automatically when falling below 40% HP.",
    "recommended_against": [
      "Heavy execution burst",
      "Fighters needing survival clutch"
    ],
    "icon_symbol": "🪽"
  },
  {
    "id": "cursed_helmet",
    "name": "Cursed Helmet",
    "category": "Defense",
    "subcategory": "Defense",
    "cost": 1760,
    "stats": "+1200 HP, +25 Magic Defense",
    "passive": "Burning Soul: Deals 1.2% of Max HP as Magic Damage per second to nearby enemies (increases by 140% against minions).",
    "counter_tags": [
      "aoe-burn",
      "waveclear-tank",
      "jungle-clear"
    ],
    "trigger_condition": "Aura burns all nearby enemy targets continuously.",
    "recommended_against": [
      "Tank junglers",
      "Waveclear-deficient frontliners"
    ],
    "icon_symbol": "🔥"
  },
  {
    "id": "warrior_boots",
    "name": "Warrior Boots",
    "category": "Core Boots",
    "subcategory": "Core Boots",
    "cost": 720,
    "stats": "+40 Movement Speed, +18 Physical Defense",
    "passive": "Valor: Gains 4 Physical Defense for 3s upon taking Physical Basic Attacks (stacks up to 20).",
    "counter_tags": [
      "anti-physical",
      "early-lane-sustain",
      "core-boots"
    ],
    "trigger_condition": "Triggers on incoming physical basic attacks.",
    "recommended_against": [
      "Bruno",
      "Claude",
      "Beatrix",
      "Paquito",
      "Physical laners"
    ],
    "icon_symbol": "🥾"
  },
  {
    "id": "tough_boots",
    "name": "Tough Boots",
    "category": "Core Boots",
    "subcategory": "Core Boots",
    "cost": 700,
    "stats": "+40 Movement Speed, +18 Magic Defense",
    "passive": "Fortitude: Reduces duration of incoming Crowd Control effects and slow by 30%.",
    "counter_tags": [
      "anti-cc",
      "tenacity",
      "magic-defense",
      "core-boots"
    ],
    "trigger_condition": "Always active against CC & slows.",
    "recommended_against": [
      "Tigreal",
      "Atlas",
      "Yve",
      "Chang'e",
      "Valir",
      "Heavy CC drafts"
    ],
    "icon_symbol": "👢"
  },
  {
    "id": "magic_shoes",
    "name": "Magic Shoes",
    "category": "Core Boots",
    "subcategory": "Core Boots",
    "cost": 710,
    "stats": "+40 Movement Speed, +10% Cooldown Reduction",
    "passive": "CD Acceleration: Grants flat 10% Cooldown Reduction early in match.",
    "counter_tags": [
      "cooldown-reduction",
      "spellcaster-mobility",
      "core-boots"
    ],
    "trigger_condition": "Always active.",
    "recommended_against": [
      "Skill-spam mages",
      "Fighters needing early CDR"
    ],
    "icon_symbol": "👟"
  },
  {
    "id": "arcane_boots",
    "name": "Arcane Boots",
    "category": "Core Boots",
    "subcategory": "Core Boots",
    "cost": 690,
    "stats": "+40 Movement Speed, +10 Magic Penetration",
    "passive": "Magic Pen: Grants flat 10 Magic Penetration to bypass baseline magic resistance.",
    "counter_tags": [
      "magic-penetration",
      "early-burst",
      "core-boots"
    ],
    "trigger_condition": "Always active.",
    "recommended_against": [
      "Squishy targets",
      "Burst mages (Kadita, Eudora, Kagura)"
    ],
    "icon_symbol": "🥾"
  },
  {
    "id": "swift_boots",
    "name": "Swift Boots",
    "category": "Core Boots",
    "subcategory": "Core Boots",
    "cost": 710,
    "stats": "+40 Movement Speed, +15% Attack Speed",
    "passive": "Swift Attack: Grants 15% bonus attack speed for smooth early laning trades.",
    "counter_tags": [
      "attack-speed",
      "marksman-tempo",
      "core-boots"
    ],
    "trigger_condition": "Always active.",
    "recommended_against": [
      "Marksmen",
      "Attack-speed carries (Miya, Layla, Claude)"
    ],
    "icon_symbol": "👟"
  },
  {
    "id": "rapid_boots",
    "name": "Rapid Boots",
    "category": "Core Boots",
    "subcategory": "Core Boots",
    "cost": 750,
    "stats": "+65 Movement Speed, +35% Slow Reduction",
    "passive": "Side Effect: Dealing or taking damage reduces Movement Speed by 25 for 5s.",
    "counter_tags": [
      "high-rotation-speed",
      "slow-resistance",
      "core-boots"
    ],
    "trigger_condition": "Maximum out-of-combat rotation speed across lanes.",
    "recommended_against": [
      "High rotation roamers",
      "Franco",
      "Selena",
      "Natalia"
    ],
    "icon_symbol": "⚡"
  },
  {
    "id": "demon_shoes",
    "name": "Demon Shoes",
    "category": "Core Boots",
    "subcategory": "Core Boots",
    "cost": 720,
    "stats": "+40 Movement Speed, +10 Mana Regen",
    "passive": "Mysticism: Hero kills or assists restore 10% Max Mana. Minion kills restore 4% Max Mana.",
    "counter_tags": [
      "mana-sustain",
      "roam-regen",
      "core-boots"
    ],
    "trigger_condition": "Restores mana upon taking down minions or enemy champions.",
    "recommended_against": [
      "Mana-draining supports/mages",
      "Baxia",
      "Hylos",
      "Uranus"
    ],
    "icon_symbol": "👢"
  },
  {
    "id": "roam_conceal",
    "name": "Roam: Conceal",
    "category": "Roam Boots",
    "subcategory": "Roam Boots",
    "cost": 0,
    "stats": "Blessing attached to Boots: +Gold/XP parity for Roamer",
    "passive": "Conceal (Active): Grants camouflage and 30%-75% extra Movement Speed to self and nearby allies for 5s (ends upon dealing/taking damage). Cooldown: 80s.",
    "counter_tags": [
      "stealth-initiation",
      "team-speed-burst",
      "roam-blessing"
    ],
    "trigger_condition": "Manually activated for teamwide surprise engage or disengage.",
    "recommended_against": [
      "Tigreal",
      "Atlas",
      "Franco",
      "Minotaur",
      "Surprise ganks"
    ],
    "icon_symbol": "👻"
  },
  {
    "id": "roam_encourage",
    "name": "Roam: Encourage",
    "category": "Roam Boots",
    "subcategory": "Roam Boots",
    "cost": 0,
    "stats": "Blessing attached to Boots: +Gold/XP parity for Roamer",
    "passive": "Encourage: Increases Physical Attack and Magic Power of nearby allied heroes by 12-30 points, and their Attack Speed by 15%.",
    "counter_tags": [
      "attack-power-aura",
      "attack-speed-aura",
      "roam-blessing"
    ],
    "trigger_condition": "Passive aura permanently boosting nearby teammates.",
    "recommended_against": [
      "Compositions with high attack-speed carries",
      "Claude",
      "Miya",
      "Irithel"
    ],
    "icon_symbol": "📢"
  },
  {
    "id": "roam_favor",
    "name": "Roam: Favor",
    "category": "Roam Boots",
    "subcategory": "Roam Boots",
    "cost": 0,
    "stats": "Blessing attached to Boots: +Gold/XP parity for Roamer",
    "passive": "Favor: Every 10s, casting a healing or shielding skill on allies restores 300-750 extra HP to the nearby ally with the lowest HP.",
    "counter_tags": [
      "healing-burst",
      "clutch-protection",
      "roam-blessing"
    ],
    "trigger_condition": "Triggers on casting heal or shield skill every 10 seconds.",
    "recommended_against": [
      "Estes",
      "Angela",
      "Rafaela",
      "Floryn",
      "Mathilda"
    ],
    "icon_symbol": "💖"
  },
  {
    "id": "roam_dire_hit",
    "name": "Roam: Dire Hit",
    "category": "Roam Boots",
    "subcategory": "Roam Boots",
    "cost": 0,
    "stats": "Blessing attached to Boots: +Gold/XP parity for Roamer",
    "passive": "Dire Hit: Dealing damage to an enemy hero below 35% HP inflicts extra damage equal to 7%-18% of target's Max HP as Hybrid Damage. Cooldown: 30s.",
    "counter_tags": [
      "kill-execution",
      "hybrid-burst",
      "roam-blessing"
    ],
    "trigger_condition": "Triggers when attacking enemy heroes below 35% HP.",
    "recommended_against": [
      "Damage roamers",
      "Saber",
      "Natalia",
      "Kadita",
      "Grock"
    ],
    "icon_symbol": "🎯"
  }
];
