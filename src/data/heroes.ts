import { Hero } from '../types/mlbb';

export const HEROES: Hero[] = [
  {
    "id": "miya",
    "name": "Miya",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Franco",
      "Saber",
      "Hayabusa",
      "Chou",
      "Khufra"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Sustained fighters without burst"
    ],
    "synergies": [
      "Tigreal",
      "Lolita",
      "Atlas",
      "Angela"
    ],
    "threat_profile": "Stealth attack speed hypercarry with Hidden Moonlight cleanse; countered by instant hard lock-on CC.",
    "durability": 3,
    "cc_lockdown": 3,
    "early_game": 4,
    "mid_game": 7,
    "late_game": 10,
    "difficulty": "Low"
  },
  {
    "id": "balmond",
    "name": "Balmond",
    "role": "Fighter",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Karrie",
      "Valir",
      "Franco"
    ],
    "counters_to": [
      "Squishy jungle creep farmers",
      "Melee fighters"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Tigreal"
    ],
    "threat_profile": "Cyclone Sweep sustained physical spin with Lethal Counter true damage execute that secures Lord / Turtle.",
    "durability": 8,
    "cc_lockdown": 3,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 6,
    "difficulty": "Low"
  },
  {
    "id": "saber",
    "name": "Saber",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Antique Cuirass users",
      "Wind of Nature",
      "Diggie"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Layla",
      "Miya",
      "Squishy marksmen"
    ],
    "synergies": [
      "Franco",
      "Novaria",
      "Beatrix"
    ],
    "threat_profile": "Orbiting Swords armor shred and Triple Sweep airborne lock-on execution; point-and-click single target deletion.",
    "durability": 3,
    "cc_lockdown": 7,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 5,
    "difficulty": "Low"
  },
  {
    "id": "alice",
    "name": "Alice",
    "role": "Mage/Tank",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Baxia",
      "Sea Halberd / Dominance Ice users",
      "Karrie",
      "Demon Hunter Sword users"
    ],
    "counters_to": [
      "Melee dive teams",
      "Grouped squishy comps"
    ],
    "synergies": [
      "Angela",
      "Floryn",
      "Tigreal"
    ],
    "threat_profile": "Blood Ode perpetual life drain draining enemies in AoE while flowing across map with Flowing Blood.",
    "durability": 8,
    "cc_lockdown": 6,
    "early_game": 5,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "nana",
    "name": "Nana",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Lancelot",
      "Helcurt",
      "Hayabusa",
      "Radiant Armor users"
    ],
    "counters_to": [
      "Dive assassins",
      "Melee fighters",
      "Chou",
      "Fanny"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Franco"
    ],
    "threat_profile": "Molina Smooch morphs approaching enemies into helpless critters; Molina Blitz triple giant footprint stun.",
    "durability": 4,
    "cc_lockdown": 8,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "tigreal",
    "name": "Tigreal",
    "role": "Tank",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Diggie",
      "Valir",
      "Akai"
    ],
    "counters_to": [
      "Immobile backliners",
      "Dive assassin compositions"
    ],
    "synergies": [
      "Pharsa",
      "Beatrix",
      "Claude",
      "Kadita"
    ],
    "threat_profile": "Sacred Hammer push and Implosion vacuum group stun; neutralized completely by Diggie Time Journey.",
    "durability": 9,
    "cc_lockdown": 9,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "alucard",
    "name": "Alucard",
    "role": "Fighter/Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Baxia",
      "Franco",
      "Khufra",
      "Kaja"
    ],
    "counters_to": [
      "Immobile backliners",
      "Heroes without hard CC"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Mathilda"
    ],
    "threat_profile": "Groundsplitter pursuit and Fission Wave hyper lifesteal; highly vulnerable to chain hard CC.",
    "durability": 5,
    "cc_lockdown": 2,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "karina",
    "name": "Karina",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Radiant Armor users",
      "Athena's Shield",
      "Franco"
    ],
    "counters_to": [
      "Attack speed marksmen",
      "Squishy low-HP targets"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Dance of Blades basic attack immunity and Shadow Assault reset execution chain.",
    "durability": 4,
    "cc_lockdown": 2,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "akai",
    "name": "Akai",
    "role": "Tank",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Valir",
      "Diggie",
      "Karrie"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Barats",
      "Fredrinn"
    ],
    "synergies": [
      "Pharsa",
      "Gord",
      "Beatrix"
    ],
    "threat_profile": "Heavy Spin whirlwind pins enemies against terrain continuously; CC immune during spin channel.",
    "durability": 9,
    "cc_lockdown": 8,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "franco",
    "name": "Franco",
    "role": "Tank/Support",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Diggie",
      "Purify",
      "Karrie"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Hayabusa",
      "Chang'e"
    ],
    "synergies": [
      "Novaria",
      "Beatrix",
      "Saber"
    ],
    "threat_profile": "Iron Hook long-range pickoff followed by Bloody Hunt suppression that cannot be cleansed by Purify.",
    "durability": 7,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "bane",
    "name": "Bane",
    "role": "Fighter/Mage",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Valir",
      "Karrie",
      "Baxia"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Tower siege drafts"
    ],
    "synergies": [
      "Atlas",
      "Tigreal",
      "Angela"
    ],
    "threat_profile": "Crab Claw Cannon bounce burst and Deadly Catch tidal shark wave devastating enemy base structures.",
    "durability": 6,
    "cc_lockdown": 5,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "bruno",
    "name": "Bruno",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Saber",
      "Hayabusa",
      "Franco",
      "Eudora"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Melee frontliners"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas",
      "Mathilda"
    ],
    "threat_profile": "Bruno brings powerful Gold lane presence specializing in Finisher and Burst.",
    "durability": 2,
    "cc_lockdown": 2,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "Medium"
  },
  {
    "id": "clint",
    "name": "Clint",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Hayabusa",
      "Lancelot",
      "Khufra",
      "Grock"
    ],
    "counters_to": [
      "Wanwan",
      "Moskov",
      "Claude",
      "Squishy marksmen"
    ],
    "synergies": [
      "Franco",
      "Atlas",
      "Mathilda"
    ],
    "threat_profile": "Long-range burst passive Quick Draw after skill cast with Trapping Recoil immobilization; high early lane dominance.",
    "durability": 4,
    "cc_lockdown": 5,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 9,
    "difficulty": "Medium"
  },
  {
    "id": "rafaela",
    "name": "Rafaela",
    "role": "Support",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Hayabusa",
      "Saber",
      "Burst assassins"
    ],
    "counters_to": [
      "Kite-vulnerable fighters",
      "Slow champions"
    ],
    "synergies": [
      "Irithel",
      "Claude",
      "Fredrinn"
    ],
    "threat_profile": "Holy Healing provides burst move speed and regeneration; Light of Retribution reveals invisible brush campers.",
    "durability": 4,
    "cc_lockdown": 6,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "eudora",
    "name": "Eudora",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Athena's Shield users",
      "Purify",
      "Radiant Armor users",
      "Lolita"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Hayabusa",
      "Squishy marksmen"
    ],
    "synergies": [
      "Saber",
      "Franco",
      "Tigreal"
    ],
    "threat_profile": "Superconductor electric point-and-click stun followed by Thunder's Wrath lightning vaporization.",
    "durability": 3,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "zilong",
    "name": "Zilong",
    "role": "Fighter/Assassin",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Blade Armor users",
      "Khufra",
      "Saber",
      "Franco"
    ],
    "counters_to": [
      "Isolated squishies",
      "Split push turrets"
    ],
    "synergies": [
      "Angela",
      "Franco",
      "Mathilda"
    ],
    "threat_profile": "Supreme Warrior CC immunity move speed flank with Spear Flip displacement and rapid turret dismantling.",
    "durability": 4,
    "cc_lockdown": 5,
    "early_game": 4,
    "mid_game": 7,
    "late_game": 9,
    "difficulty": "Low"
  },
  {
    "id": "fanny",
    "name": "Fanny",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Saber",
      "Franco",
      "Kaja",
      "Phoveus"
    ],
    "counters_to": [
      "Layla",
      "Miya",
      "Gord",
      "Pharsa"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Diggie"
    ],
    "threat_profile": "High aerial burst mobility; vulnerable to suppression and airborne knockups.",
    "durability": 3,
    "cc_lockdown": 2,
    "early_game": 9,
    "mid_game": 8,
    "late_game": 4,
    "difficulty": "Very High"
  },
  {
    "id": "layla",
    "name": "Layla",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Low",
    "hard_counters": [
      "Ling",
      "Fanny",
      "Saber",
      "Hayabusa",
      "Lancelot"
    ],
    "counters_to": [
      "Short-range tanks",
      "Immobile fighters"
    ],
    "synergies": [
      "Tigreal",
      "Hylos",
      "Lolita",
      "Diggie"
    ],
    "threat_profile": "Longest basic attack range in MLBB; devastating backline siege DPS that folds instantly to flank assassins.",
    "durability": 2,
    "cc_lockdown": 3,
    "early_game": 3,
    "mid_game": 6,
    "late_game": 10,
    "difficulty": "Low"
  },
  {
    "id": "minotaur",
    "name": "Minotaur",
    "role": "Tank/Support",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "Low",
    "hard_counters": [
      "Diggie",
      "Valir",
      "Karrie"
    ],
    "counters_to": [
      "Melee dive teams",
      "Sustained skirmishers"
    ],
    "synergies": [
      "Claude",
      "Pharsa",
      "Yve"
    ],
    "threat_profile": "Minoan Fury triple shockwave airborne CC with innate heal and defense shredding aura.",
    "durability": 9,
    "cc_lockdown": 9,
    "early_game": 5,
    "mid_game": 8,
    "late_game": 9,
    "difficulty": "Low"
  },
  {
    "id": "lolita",
    "name": "Lolita",
    "role": "Support/Tank",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Valir",
      "Diggie"
    ],
    "counters_to": [
      "Chang'e",
      "Harley",
      "Granger",
      "Projectile marksmen"
    ],
    "synergies": [
      "Claude",
      "Beatrix",
      "Novaria"
    ],
    "threat_profile": "Guardian's Bulwark projectile deflection shield and massive Noumenon Energy Blast cone stun.",
    "durability": 8,
    "cc_lockdown": 8,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 9,
    "difficulty": "Medium"
  },
  {
    "id": "hayabusa",
    "name": "Hayabusa",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Saber",
      "Kaja",
      "Franco",
      "Wind of Nature"
    ],
    "counters_to": [
      "Squishy isolated carries",
      "Split pushers"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Franco"
    ],
    "threat_profile": "Ninjutsu: Quad Shadow elusive teleportation and Ougi: Shadow Kill single-target invulnerable slashes.",
    "durability": 3,
    "cc_lockdown": 3,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "High"
  },
  {
    "id": "freya",
    "name": "Freya",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Sea Halberd / Dominance Ice users",
      "Valir",
      "Franco"
    ],
    "counters_to": [
      "Melee fighters without escape",
      "Squishy frontliners"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Valkyrie Descent transforms into massive winged shield deity with non-stop Spirit Combo airborne stuns.",
    "durability": 7,
    "cc_lockdown": 7,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "gord",
    "name": "Gord",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "True",
    "mobility_tier": "Low",
    "hard_counters": [
      "Lolita",
      "Lancelot",
      "Hayabusa",
      "Saber",
      "Fanny"
    ],
    "counters_to": [
      "Immobile frontline tanks",
      "Slow siege comps"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Hylos"
    ],
    "threat_profile": "Mystic Gush continuous true damage beam; completely stationary while channeling ultimate.",
    "durability": 2,
    "cc_lockdown": 6,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "natalia",
    "name": "Natalia",
    "role": "Assassin",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Hylos",
      "Rafaela",
      "Aldous",
      "Popol and Kupa"
    ],
    "counters_to": [
      "Isolated squishy mages",
      "Marksmen without vision"
    ],
    "synergies": [
      "Franco",
      "Novaria",
      "Saber"
    ],
    "threat_profile": "Assassin Instinct camouflage stalking with instant silence and The Hunt critical claw strikes.",
    "durability": 3,
    "cc_lockdown": 4,
    "early_game": 9,
    "mid_game": 8,
    "late_game": 6,
    "difficulty": "High"
  },
  {
    "id": "kagura",
    "name": "Kagura",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "S+",
    "hard_counters": [
      "Franco",
      "Kaja",
      "Radiant Armor users"
    ],
    "counters_to": [
      "Immobile mages",
      "Squishy marksmen",
      "Tigreal",
      "Atlas"
    ],
    "synergies": [
      "Atlas",
      "Tigreal",
      "Claude"
    ],
    "threat_profile": "Seimei Umbrella Open displacement with innate cleanse/blink and Yin Yang Overturn burst vortex.",
    "durability": 4,
    "cc_lockdown": 8,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "High"
  },
  {
    "id": "chou",
    "name": "Chou",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Phoveus",
      "Khufra",
      "Diggie",
      "Kaja"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Lancelot",
      "Isolated carries"
    ],
    "synergies": [
      "Pharsa",
      "Beatrix",
      "Novaria"
    ],
    "threat_profile": "The Way of Dragon kick isolates priority enemy into allied firing squad; Jeet Kune Do gives continuous CC and dashes.",
    "durability": 6,
    "cc_lockdown": 8,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "High"
  },
  {
    "id": "sun",
    "name": "Sun",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Ruby",
      "Alpha",
      "Terizla",
      "AoE spellcasters"
    ],
    "counters_to": [
      "Single-target marksmen",
      "Lord / Turtle solo taking"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Mathilda"
    ],
    "threat_profile": "Clone Doppelgangers overwhelm single-target enemies and melt structures in seconds.",
    "durability": 6,
    "cc_lockdown": 3,
    "early_game": 5,
    "mid_game": 8,
    "late_game": 9,
    "difficulty": "Low"
  },
  {
    "id": "alpha",
    "name": "Alpha",
    "role": "Fighter",
    "primary_lane": "Jungle",
    "damage_type": "True",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Valir",
      "Baxia",
      "Karrie"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Tank junglers without mobility"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Beta, Advance! true damage strikes and Spear of Alpha spear dive stun; hyper-efficient jungle clearer.",
    "durability": 7,
    "cc_lockdown": 7,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "ruby",
    "name": "Ruby",
    "role": "Fighter/Tank",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Phoveus",
      "Terizla"
    ],
    "counters_to": [
      "Dash-dependent heroes",
      "Melee squishies"
    ],
    "synergies": [
      "Tigreal",
      "Pharsa",
      "Claude",
      "Estes"
    ],
    "threat_profile": "High spell vamp and continuous displacement; countered by anti-heal and burst suppression.",
    "durability": 8,
    "cc_lockdown": 8,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "yi_sun_shin",
    "name": "Yi Sun-shin",
    "role": "Assassin/Marksman",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Khufra",
      "Saber",
      "Hayabusa"
    ],
    "counters_to": [
      "Stealth heroes",
      "Objective-focused teams"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Grock"
    ],
    "threat_profile": "Mountain Shocker global orbital cannon reveals all enemies; versatile melee/ranged switch passive.",
    "durability": 4,
    "cc_lockdown": 3,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "High"
  },
  {
    "id": "moskov",
    "name": "Moskov",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Saber",
      "Eudora",
      "Khufra",
      "Phoveus"
    ],
    "counters_to": [
      "Claude",
      "Miya",
      "High-mobility dive teams"
    ],
    "synergies": [
      "Atlas",
      "Tigreal",
      "Angela"
    ],
    "threat_profile": "Abyss Spear wall-pin stun with global Spear of Destruction and teleportation flank mechanics.",
    "durability": 3,
    "cc_lockdown": 6,
    "early_game": 5,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "johnson",
    "name": "Johnson",
    "role": "Tank",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "S+",
    "hard_counters": [
      "Diggie",
      "Grock",
      "Baxia",
      "Akai"
    ],
    "counters_to": [
      "Immobile isolated squishies",
      "Split pushers"
    ],
    "synergies": [
      "Odette",
      "Kadita",
      "Badang",
      "Claude"
    ],
    "threat_profile": "Rapid Touchdown vehicular rampage transporting an ally across map for an explosive teamfight crash.",
    "durability": 9,
    "cc_lockdown": 8,
    "early_game": 5,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "cyclops",
    "name": "Cyclops",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Radiant Armor users",
      "Lolita",
      "Lancelot"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "High mobility squishies"
    ],
    "synergies": [
      "Franco",
      "Tigreal",
      "Hylos"
    ],
    "threat_profile": "Star Power Lockdown planetary lock-on snare with Planets Attack rapid homing cooldown spam.",
    "durability": 4,
    "cc_lockdown": 7,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "Low"
  },
  {
    "id": "estes",
    "name": "Estes",
    "role": "Support",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Baxia",
      "Luo Yi",
      "Atlas",
      "Yu Zhong"
    ],
    "counters_to": [
      "Poke compositions without burst execution"
    ],
    "synergies": [
      "Fredrinn",
      "Barats",
      "Ruby",
      "Claude"
    ],
    "threat_profile": "Sustained AoE team heal and slow; countered by 50% Life Drain anti-heal and group CC.",
    "durability": 5,
    "cc_lockdown": 3,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "hilda",
    "name": "Hilda",
    "role": "Fighter/Tank",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Valir",
      "Karrie",
      "Baxia"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Early jungle creep harvesters"
    ],
    "synergies": [
      "Saber",
      "Franco",
      "Mathilda"
    ],
    "threat_profile": "Blessing of Wilderness bushes grant perpetual shields/regen; Power of Wild executes invader junglers.",
    "durability": 8,
    "cc_lockdown": 6,
    "early_game": 10,
    "mid_game": 8,
    "late_game": 5,
    "difficulty": "Low"
  },
  {
    "id": "aurora",
    "name": "Aurora",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Athena's Shield users",
      "Purify",
      "Lancelot"
    ],
    "counters_to": [
      "Grouped dive assassins",
      "Melee frontlines"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Franco"
    ],
    "threat_profile": "Cold Destruction freeze stun combined with Pride of Ice resurrection totem; potent counter-engage mage.",
    "durability": 5,
    "cc_lockdown": 9,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "lapu_lapu",
    "name": "Lapu-Lapu",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Valir",
      "Karrie",
      "Baxia"
    ],
    "counters_to": [
      "Immobile backliners",
      "Squishy marksmen"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Angela"
    ],
    "threat_profile": "Heavy Sword stance grants 50% damage reduction and massive AoE crowd control slashes.",
    "durability": 8,
    "cc_lockdown": 7,
    "early_game": 7,
    "mid_game": 10,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "vexana",
    "name": "Vexana",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Radiant Armor users",
      "Lancelot",
      "Hayabusa"
    ],
    "counters_to": [
      "Grouped minion sieges",
      "Low-mobility frontlines"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Terizla"
    ],
    "threat_profile": "Eternal Guard summons towering undead titan that slams ground for airborne stun and tanky frontlining.",
    "durability": 4,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "roger",
    "name": "Roger",
    "role": "Fighter/Marksman",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Khufra",
      "Franco",
      "Saber"
    ],
    "counters_to": [
      "Low-HP fleeing heroes",
      "Squishy backliners"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Franco"
    ],
    "threat_profile": "Human hunter gun poke transforms into Wolf transformation lunge with massive attack speed and execution claws.",
    "durability": 6,
    "cc_lockdown": 3,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "karrie",
    "name": "Karrie",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Saber",
      "Hayabusa",
      "Franco",
      "Eudora"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Melee frontliners"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas",
      "Mathilda"
    ],
    "threat_profile": "Karrie brings powerful Gold lane presence specializing in Finisher and Damage.",
    "durability": 3,
    "cc_lockdown": 1,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "Medium"
  },
  {
    "id": "gatotkaca",
    "name": "Gatotkaca",
    "role": "Tank/Fighter",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Karrie",
      "Lunox",
      "Valir"
    ],
    "counters_to": [
      "Physical attack speed marksmen",
      "Basic attack divers"
    ],
    "synergies": [
      "Atlas",
      "Tigreal",
      "Angela"
    ],
    "threat_profile": "Steel Bones converts lost HP into massive physical defense; Avatar of Guardian long-range airborne dive.",
    "durability": 9,
    "cc_lockdown": 7,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "harley",
    "name": "Harley",
    "role": "Mage/Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Radiant Armor users",
      "Lolita",
      "Saber"
    ],
    "counters_to": [
      "Immobile mid laners",
      "Squishy marksmen"
    ],
    "synergies": [
      "Franco",
      "Tigreal",
      "Angela"
    ],
    "threat_profile": "Deadly Magic ring death mark combined with Poker Trick card flurry and Space Escape hat blink.",
    "durability": 3,
    "cc_lockdown": 2,
    "early_game": 9,
    "mid_game": 8,
    "late_game": 6,
    "difficulty": "Medium"
  },
  {
    "id": "irithel",
    "name": "Irithel",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Saber",
      "Natalia",
      "Lolita",
      "Hayabusa"
    ],
    "counters_to": [
      "Grouped melee frontliners",
      "Immobile tanks"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Mathilda"
    ],
    "threat_profile": "Mobile run-and-gun basic attack artillery with Heavy Crossbow AoE armor-shredding splash attacks.",
    "durability": 3,
    "cc_lockdown": 3,
    "early_game": 5,
    "mid_game": 8,
    "late_game": 9,
    "difficulty": "Medium"
  },
  {
    "id": "grock",
    "name": "Grock",
    "role": "Tank/Fighter",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Karrie",
      "Lunox",
      "Valir"
    ],
    "counters_to": [
      "Fanny",
      "Pharsa",
      "Narrow terrain drafts"
    ],
    "synergies": [
      "Franco",
      "Badang",
      "Novaria"
    ],
    "threat_profile": "Guardian's Barrier wall creation and Wild Charge wall collision knockup; CC immune near walls.",
    "durability": 8,
    "cc_lockdown": 7,
    "early_game": 9,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "argus",
    "name": "Argus",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Franco",
      "Kaja",
      "Valir",
      "Biting kite comps"
    ],
    "counters_to": [
      "Burst assassins",
      "Burst mages"
    ],
    "synergies": [
      "Angela",
      "Diggie",
      "Mathilda"
    ],
    "threat_profile": "Eternal Evil grants 4 seconds of complete death immunity, converting 100% of damage dealt into HP.",
    "durability": 7,
    "cc_lockdown": 4,
    "early_game": 5,
    "mid_game": 7,
    "late_game": 10,
    "difficulty": "Low"
  },
  {
    "id": "odette",
    "name": "Odette",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Saber",
      "Franco",
      "Kaja",
      "Chou",
      "Khufra"
    ],
    "counters_to": [
      "Compositions without hard CC",
      "Grouped melee heroes"
    ],
    "synergies": [
      "Johnson",
      "Atlas",
      "Tigreal"
    ],
    "threat_profile": "Swan Song immense AoE musical sanctuary dealing crushing magic damage; cancelled by any hard stun/knockup.",
    "durability": 4,
    "cc_lockdown": 6,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "Low"
  },
  {
    "id": "lancelot",
    "name": "Lancelot",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Phoveus",
      "Franco",
      "Kaja",
      "Minsitthar"
    ],
    "counters_to": [
      "Skill-shot mages",
      "Immobile marksmen"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Tigreal"
    ],
    "threat_profile": "Puncture reset dash chain and Thorned Rose invulnerability frames dissecting backlines.",
    "durability": 3,
    "cc_lockdown": 2,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "diggie",
    "name": "Diggie",
    "role": "Support",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Hayabusa",
      "Fanny",
      "Burst damage"
    ],
    "counters_to": [
      "Tigreal",
      "Atlas",
      "Khufra",
      "Ruby",
      "Guinevere"
    ],
    "synergies": [
      "Bruno",
      "Claude",
      "Ling"
    ],
    "threat_profile": "Time Journey provides teamwide CC immunity and shielding, completely neutralizing AOE wombo combos.",
    "durability": 4,
    "cc_lockdown": 6,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "hylos",
    "name": "Hylos",
    "role": "Tank",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Karrie",
      "Baxia",
      "Demon Hunter Sword users"
    ],
    "counters_to": [
      "Low-mobility melee heroes",
      "Early jungle invaders"
    ],
    "synergies": [
      "Chang'e",
      "Claude",
      "Irithel"
    ],
    "threat_profile": "Glorious Pathway team speedway with massive HP pool converted from Mana; drains enemies with Ring of Punishment.",
    "durability": 10,
    "cc_lockdown": 6,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "zhask",
    "name": "Zhask",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Claude",
      "Radiant Armor users",
      "Lancelot"
    ],
    "counters_to": [
      "Melee fighters without burst",
      "Dive assassins"
    ],
    "synergies": [
      "Tigreal",
      "Hylos",
      "Belerick"
    ],
    "threat_profile": "Dominator's Descent fuses into giant alien Nightmare Spawn with laser beams and death ray shielding.",
    "durability": 6,
    "cc_lockdown": 7,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "helcurt",
    "name": "Helcurt",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Hylos",
      "Franco",
      "Saber"
    ],
    "counters_to": [
      "Spellcasters",
      "High mobility squishies"
    ],
    "synergies": [
      "Franco",
      "Angela",
      "Atlas"
    ],
    "threat_profile": "Dark Night Falls blinds entire enemy team map vision while Helcurt silences and executes with Deadly Stinger.",
    "durability": 3,
    "cc_lockdown": 5,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 6,
    "difficulty": "Medium"
  },
  {
    "id": "pharsa",
    "name": "Pharsa",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Franco",
      "Khufra",
      "Lancelot",
      "Hayabusa"
    ],
    "counters_to": [
      "Immobile backlines",
      "Turtle / Lord zoning"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Khufra"
    ],
    "threat_profile": "Feathered Air Strike long-distance artillery bombardment; Wings by Wings grants high-speed bird rotation.",
    "durability": 3,
    "cc_lockdown": 6,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "lesley",
    "name": "Lesley",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "True",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Twilight Armor users",
      "Saber",
      "Hayabusa",
      "Natalia"
    ],
    "counters_to": [
      "High physical armor tanks",
      "Squishy backliners"
    ],
    "synergies": [
      "Angela",
      "Franco",
      "Lolita"
    ],
    "threat_profile": "Lethal Snipe camouflage and true damage crit shots that bypass all physical defense in late game.",
    "durability": 3,
    "cc_lockdown": 3,
    "early_game": 4,
    "mid_game": 7,
    "late_game": 10,
    "difficulty": "Medium"
  },
  {
    "id": "jawhead",
    "name": "Jawhead",
    "role": "Fighter",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Valir",
      "Diggie",
      "Karrie"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Immobile squishy carries"
    ],
    "synergies": [
      "Franco",
      "Beatrix",
      "Novaria"
    ],
    "threat_profile": "Ejector fling tosses priority target directly into allied lines; Unstoppable Force lock-on missile dive.",
    "durability": 7,
    "cc_lockdown": 7,
    "early_game": 9,
    "mid_game": 8,
    "late_game": 6,
    "difficulty": "Medium"
  },
  {
    "id": "angela",
    "name": "Angela",
    "role": "Support",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Sea Halberd users",
      "Burst assassins"
    ],
    "counters_to": [
      "Poke compositions"
    ],
    "synergies": [
      "Ling",
      "Fanny",
      "Claude",
      "Fredrinn",
      "Barats"
    ],
    "threat_profile": "Heartguard possesses allied hypercarry from anywhere on map, bestowing massive shield, move speed, and heals.",
    "durability": 4,
    "cc_lockdown": 5,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "gusion",
    "name": "Gusion",
    "role": "Assassin/Mage",
    "primary_lane": "Jungle",
    "damage_type": "Magic",
    "mobility_tier": "S+",
    "hard_counters": [
      "Radiant Armor users",
      "Khufra",
      "Minsitthar",
      "Franco"
    ],
    "counters_to": [
      "Immobile mages",
      "Squishy marksmen"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Sword Spike teleportation and Incandescence double dagger burst delivering catastrophic magic execution.",
    "durability": 3,
    "cc_lockdown": 2,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 6,
    "difficulty": "High"
  },
  {
    "id": "valir",
    "name": "Valir",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Radiant Armor users",
      "Hayabusa",
      "Pharsa"
    ],
    "counters_to": [
      "Barats",
      "Hylos",
      "Baxia",
      "Belerick",
      "Melee dive tanks"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Hylos"
    ],
    "threat_profile": "Burst Fireball perpetual knockback and stun; Vengeance ultimate acts as built-in Purify against crowd control.",
    "durability": 4,
    "cc_lockdown": 9,
    "early_game": 9,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "martis",
    "name": "Martis",
    "role": "Fighter",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Valir",
      "Franco",
      "Kaja",
      "Baxia"
    ],
    "counters_to": [
      "Low-mobility CC dependent teams",
      "Squishy junglers"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Tigreal"
    ],
    "threat_profile": "Mortal Coil gives unstoppable CC immunity and displacement; Decimation true damage resets on kill.",
    "durability": 7,
    "cc_lockdown": 7,
    "early_game": 10,
    "mid_game": 9,
    "late_game": 6,
    "difficulty": "Medium"
  },
  {
    "id": "uranus",
    "name": "Uranus",
    "role": "Tank",
    "primary_lane": "EXP",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Sea Halberd / Dominance Ice users",
      "Karrie"
    ],
    "counters_to": [
      "Low-burst attrition drafts",
      "Skill-shot tanks"
    ],
    "synergies": [
      "Angela",
      "Floryn",
      "Estes"
    ],
    "threat_profile": "Radiance stacks generate perpetual HP regeneration; frontline harasser that baits enemy cooldowns.",
    "durability": 9,
    "cc_lockdown": 2,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "hanabi",
    "name": "Hanabi",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Low",
    "hard_counters": [
      "Hayabusa",
      "Lancelot",
      "Franco",
      "Saber"
    ],
    "counters_to": [
      "Single-target CC heroes",
      "Melee group comps"
    ],
    "synergies": [
      "Lolita",
      "Atlas",
      "Tigreal"
    ],
    "threat_profile": "Bounce petal basic attacks and innate CC immunity shield; countered by shield-piercing burst damage.",
    "durability": 4,
    "cc_lockdown": 6,
    "early_game": 5,
    "mid_game": 7,
    "late_game": 9,
    "difficulty": "Low"
  },
  {
    "id": "change",
    "name": "Chang'e",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Lolita",
      "Radiant Armor users",
      "Lancelot"
    ],
    "counters_to": [
      "Low mobility tanks without gap-closers"
    ],
    "synergies": [
      "Hylos",
      "Belerick",
      "Grock"
    ],
    "threat_profile": "Continuous long-range magic tick damage; completely mitigated by Radiant Armor.",
    "durability": 3,
    "cc_lockdown": 3,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "kaja",
    "name": "Kaja",
    "role": "Support/Fighter",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Diggie",
      "Valir",
      "Karrie"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Hayabusa",
      "Claude"
    ],
    "synergies": [
      "Beatrix",
      "Novaria",
      "Franco"
    ],
    "threat_profile": "Divine Judgment suppression leash pulls priority target into allied death trap without Purify counter.",
    "durability": 6,
    "cc_lockdown": 9,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "selena",
    "name": "Selena",
    "role": "Assassin/Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Diggie",
      "Radiant Armor users",
      "Tough Boots users"
    ],
    "counters_to": [
      "Immobile carries",
      "Unsuspecting bush campers"
    ],
    "synergies": [
      "Franco",
      "Saber",
      "Chou"
    ],
    "threat_profile": "Abyssal Arrow long-range 3-second stun followed by Shadow Beast form melee claw execution.",
    "durability": 3,
    "cc_lockdown": 8,
    "early_game": 10,
    "mid_game": 8,
    "late_game": 5,
    "difficulty": "Very High"
  },
  {
    "id": "aldous",
    "name": "Aldous",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Twilight Armor users",
      "Wind of Nature",
      "Franco",
      "Minsitthar"
    ],
    "counters_to": [
      "Split pushers",
      "Isolated squishy marksmen"
    ],
    "synergies": [
      "Angela",
      "Johnson",
      "Diggie"
    ],
    "threat_profile": "Soul Steal 500-stack single-punch annihilation with Chase Fate global lock-on flight across map.",
    "durability": 7,
    "cc_lockdown": 5,
    "early_game": 3,
    "mid_game": 7,
    "late_game": 10,
    "difficulty": "Medium"
  },
  {
    "id": "claude",
    "name": "Claude",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Khufra",
      "Saber",
      "Franco",
      "Kaja",
      "Phoveus"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Melee frontliners"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas",
      "Mathilda"
    ],
    "threat_profile": "Claude brings powerful Gold lane presence specializing in Burst and Chase.",
    "durability": 3,
    "cc_lockdown": 1,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "vale",
    "name": "Vale",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Radiant Armor users",
      "Lancelot",
      "Hayabusa",
      "Saber"
    ],
    "counters_to": [
      "Grouped squishy backliners",
      "Low-mobility frontlines"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Franco"
    ],
    "threat_profile": "Windblown tornado crowd control vacuum chained into Windfall nuclear AoE burst eruption.",
    "durability": 3,
    "cc_lockdown": 8,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "Low"
  },
  {
    "id": "leomord",
    "name": "Leomord",
    "role": "Fighter",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Franco",
      "Kaja",
      "Valir",
      "Baxia"
    ],
    "counters_to": [
      "Enemies below 50% HP",
      "Low mobility squads"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Phantom Steed summons Barbiel, entering mounted combat with 100% crit chance on targets below 50% HP.",
    "durability": 7,
    "cc_lockdown": 5,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "lunox",
    "name": "Lunox",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Radiant Armor users",
      "Franco",
      "Kaja",
      "Lolita"
    ],
    "counters_to": [
      "Uranus",
      "Hylos",
      "Barats",
      "High magic resist tanks"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Power of Chaos ignores up to 100% magic defense while Power of Brilliance grants complete invulnerability.",
    "durability": 5,
    "cc_lockdown": 3,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "hanzo",
    "name": "Hanzo",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Natalia",
      "Ling",
      "Hayabusa",
      "Aldous"
    ],
    "counters_to": [
      "Low-mobility defensive setups",
      "Creep dependent junglers"
    ],
    "synergies": [
      "Lolita",
      "Hylos",
      "Angela"
    ],
    "threat_profile": "Kinjutsu: Pinnacle Ninja projects demon ninja form across terrain while physical body hides in brush.",
    "durability": 2,
    "cc_lockdown": 4,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "belerick",
    "name": "Belerick",
    "role": "Tank",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Karrie",
      "Lunox",
      "Valir"
    ],
    "counters_to": [
      "Claude",
      "Miya",
      "Moskov",
      "Attack speed marksmen"
    ],
    "synergies": [
      "Angela",
      "Claude",
      "Novaria"
    ],
    "threat_profile": "Deadly Thorns reflects damage back at attackers; Wrath of Dryad massive AoE taunt lockdown.",
    "durability": 9,
    "cc_lockdown": 8,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 9,
    "difficulty": "Low"
  },
  {
    "id": "kimmy",
    "name": "Kimmy",
    "role": "Marksman/Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Saber",
      "Hayabusa",
      "Franco",
      "Eudora"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Melee frontliners"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas",
      "Mathilda"
    ],
    "threat_profile": "Kimmy brings powerful Mid lane presence specializing in Damage and Magic Damage.",
    "durability": 3,
    "cc_lockdown": 5,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "thamuz",
    "name": "Thamuz",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Sea Halberd / Dominance Ice users",
      "Valir",
      "Karrie"
    ],
    "counters_to": [
      "Melee fighters",
      "Short-range tanks"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Mathilda"
    ],
    "threat_profile": "Grand Lord Lava erupts on basic attacks with scythe toss resets and massive HP recovery.",
    "durability": 8,
    "cc_lockdown": 4,
    "early_game": 9,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "harith",
    "name": "Harith",
    "role": "Mage",
    "primary_lane": "Gold",
    "damage_type": "Magic",
    "mobility_tier": "S+",
    "hard_counters": [
      "Minsitthar",
      "Phoveus",
      "Khufra",
      "Baxia"
    ],
    "counters_to": [
      "Skill-shot dependent mages",
      "Immobile marksmen"
    ],
    "synergies": [
      "Angela",
      "Floryn",
      "Tigreal"
    ],
    "threat_profile": "Zaman Force sword matrix resets Chrono Dash cooldown continuously, generating perpetual shields and magic crits.",
    "durability": 6,
    "cc_lockdown": 4,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "minsitthar",
    "name": "Minsitthar",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Low",
    "hard_counters": [
      "Diggie",
      "Valir",
      "Karrie"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Lancelot",
      "Joy",
      "Harith",
      "Dash heroes"
    ],
    "synergies": [
      "Tigreal",
      "Pharsa",
      "Claude"
    ],
    "threat_profile": "King's Calling gladiator field disables ALL directional blink/dash skills; Spear of Glory hooks multiple foes.",
    "durability": 8,
    "cc_lockdown": 9,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "kadita",
    "name": "Kadita",
    "role": "Mage/Assassin",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Franco",
      "Kaja",
      "Athena's Shield users",
      "Petrify counters"
    ],
    "counters_to": [
      "Immobile marksmen",
      "Squishy mages"
    ],
    "synergies": [
      "Atlas",
      "Tigreal",
      "Johnson"
    ],
    "threat_profile": "Rough Waves lethal dive ambush with Thalassophobia passive HP regeneration and CC immunity.",
    "durability": 5,
    "cc_lockdown": 7,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "faramis",
    "name": "Faramis",
    "role": "Support/Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Valentina",
      "Baxia",
      "Suppressors"
    ],
    "counters_to": [
      "Burst assassination wombo comps",
      "Gloo"
    ],
    "synergies": [
      "Claude",
      "Beatrix",
      "Fredrinn"
    ],
    "threat_profile": "Cult Altar bestows temporary extra life and massive HP buffer to all allies during teamfights.",
    "durability": 5,
    "cc_lockdown": 6,
    "early_game": 7,
    "mid_game": 10,
    "late_game": 9,
    "difficulty": "Medium"
  },
  {
    "id": "badang",
    "name": "Badang",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Diggie",
      "Purify",
      "Valir"
    ],
    "counters_to": [
      "Immobile backliners",
      "Squishies without blink"
    ],
    "synergies": [
      "Johnson",
      "Atlas",
      "Tigreal"
    ],
    "threat_profile": "Fist Break creates stone wall behind target followed by Fist Crack barrage knocking enemies into obstacle.",
    "durability": 6,
    "cc_lockdown": 8,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "khufra",
    "name": "Khufra",
    "role": "Tank",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Franco",
      "Diggie",
      "Valir"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Lancelot",
      "Benedetta",
      "Joy"
    ],
    "synergies": [
      "Pharsa",
      "Beatrix",
      "Claude"
    ],
    "threat_profile": "Bouncing Ball counters all dashes with airborne knockups; Tyrant's Revenge long-range blind-spot engage.",
    "durability": 9,
    "cc_lockdown": 9,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "High"
  },
  {
    "id": "granger",
    "name": "Granger",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Khufra",
      "Saber",
      "Lolita",
      "Hayabusa"
    ],
    "counters_to": [
      "Squishy low-sustain mages",
      "Early skirmishers"
    ],
    "synergies": [
      "Franco",
      "Grock",
      "Angela"
    ],
    "threat_profile": "Rhapsody burst bullets with Death Sonata sniper execution; strong tempo marksman without attack speed dependency.",
    "durability": 4,
    "cc_lockdown": 2,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "guinevere",
    "name": "Guinevere",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Purify",
      "Diggie",
      "Helcurt",
      "Franco"
    ],
    "counters_to": [
      "Immobile mages",
      "Squishy marksmen"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Minotaur"
    ],
    "threat_profile": "Spatial Migration airborne jump chained into Violet Requiem sustained aerial kick suspension.",
    "durability": 6,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "esmeralda",
    "name": "Esmeralda",
    "role": "Tank/Mage",
    "primary_lane": "EXP",
    "damage_type": "Mixed",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Karrie",
      "Lunox",
      "Valir",
      "Baxia"
    ],
    "counters_to": [
      "Dive assassins",
      "Melee fighters"
    ],
    "synergies": [
      "Claude",
      "Pharsa",
      "Beatrix",
      "Novaria"
    ],
    "threat_profile": "Esmeralda brings powerful EXP lane presence specializing in Regen and Mixed Damage.",
    "durability": 9,
    "cc_lockdown": 6,
    "early_game": 3,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "terizla",
    "name": "Terizla",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Low",
    "hard_counters": [
      "Valir",
      "Karrie",
      "Baxia"
    ],
    "counters_to": [
      "Immobile frontlines",
      "Melee group comps"
    ],
    "synergies": [
      "Atlas",
      "Tigreal",
      "Pharsa"
    ],
    "threat_profile": "Smith's Craft damage reduction builds up as HP drops; Penalty Zone chains and pulls enemies to center.",
    "durability": 9,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "xborg",
    "name": "X.Borg",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "True",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Karrie",
      "Lunox"
    ],
    "counters_to": [
      "Low-mobility melee heroes",
      "Sustained tanks"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Firaga Armor true damage flamethrower poke with Last Insanity self-destruct nuclear leap.",
    "durability": 8,
    "cc_lockdown": 4,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "ling",
    "name": "Ling",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Saber",
      "Franco",
      "Kaja",
      "Ruby"
    ],
    "counters_to": [
      "Split pushers",
      "Backline carries without peel"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Tigreal"
    ],
    "threat_profile": "Cloud Walker leaps atop walls freely; Tempest of Blades grants invulnerability while resetting swords.",
    "durability": 2,
    "cc_lockdown": 3,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "Very High"
  },
  {
    "id": "dyrroth",
    "name": "Dyrroth",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Franco",
      "Kaja",
      "Saber",
      "Valir"
    ],
    "counters_to": [
      "Uranus",
      "Hylos",
      "Barats",
      "High physical defense tanks"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Mathilda"
    ],
    "threat_profile": "Spectre Step shreds up to 75% physical defense; Abysm Strike executes frontliners instantly.",
    "durability": 7,
    "cc_lockdown": 5,
    "early_game": 10,
    "mid_game": 8,
    "late_game": 6,
    "difficulty": "Low"
  },
  {
    "id": "lylia",
    "name": "Lylia",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Radiant Armor users",
      "Lancelot",
      "Hayabusa"
    ],
    "counters_to": [
      "Low-mobility melee fighters",
      "Turtle contest setups"
    ],
    "synergies": [
      "Hylos",
      "Tigreal",
      "Belerick"
    ],
    "threat_profile": "Shadow Energy glooms chain explosion slowing enemies permanently; Black Shoes rewinds HP and Mana back 4 seconds.",
    "durability": 5,
    "cc_lockdown": 6,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "baxia",
    "name": "Baxia",
    "role": "Tank",
    "primary_lane": "Jungle",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Karrie",
      "Valir",
      "Diggie"
    ],
    "counters_to": [
      "Estes",
      "Ruby",
      "Alucard",
      "Regen-heavy teams"
    ],
    "synergies": [
      "Pharsa",
      "Yve",
      "Claude"
    ],
    "threat_profile": "Innate 50% anti-heal shield with Baxia-Shield Prowess rapid map rotation rolling over lanes.",
    "durability": 9,
    "cc_lockdown": 6,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "masha",
    "name": "Masha",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Blade Armor users",
      "Dominance Ice",
      "Franco",
      "Kaja"
    ],
    "counters_to": [
      "High HP tanks",
      "Objective / Turret rush"
    ],
    "synergies": [
      "Angela",
      "Diggie",
      "Mathilda"
    ],
    "threat_profile": "Triple HP bars with Life Recovery; Thunderclap deals immense percentage HP burst damage to single target.",
    "durability": 8,
    "cc_lockdown": 4,
    "early_game": 5,
    "mid_game": 8,
    "late_game": 9,
    "difficulty": "Medium"
  },
  {
    "id": "wanwan",
    "name": "Wanwan",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Khufra",
      "Phoveus",
      "Franco",
      "Kaja",
      "Belerick"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Melee fighters",
      "Chou"
    ],
    "synergies": [
      "Tigreal",
      "Angela",
      "Atlas"
    ],
    "threat_profile": "Crossbow of Tang invulnerable aerial slaughter activated by breaking 3 weaknesses; neutralized by suppression and burst.",
    "durability": 3,
    "cc_lockdown": 4,
    "early_game": 4,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "silvanna",
    "name": "Silvanna",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Diggie",
      "Purify",
      "Valir",
      "Franco"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Squishy assassins"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Pharsa"
    ],
    "threat_profile": "Imperial Justice traps single enemy inside unbreakable dueling zone while spiral lance shreds magic resist.",
    "durability": 6,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 6,
    "difficulty": "Medium"
  },
  {
    "id": "cecilion",
    "name": "Cecilion",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Lolita",
      "Lancelot",
      "Hayabusa",
      "Saber"
    ],
    "counters_to": [
      "Late game siege teams",
      "Immobile frontliners"
    ],
    "synergies": [
      "Carmilla",
      "Atlas",
      "Tigreal"
    ],
    "threat_profile": "Overflowing stacks grant boundless mana and bat impact damage; hits harder the longer the match continues.",
    "durability": 4,
    "cc_lockdown": 6,
    "early_game": 4,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "Low"
  },
  {
    "id": "carmilla",
    "name": "Carmilla",
    "role": "Support/Tank",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Diggie",
      "Valir",
      "Karrie"
    ],
    "counters_to": [
      "Grouped melee frontliners",
      "Estes deathball"
    ],
    "synergies": [
      "Cecilion",
      "Claude",
      "Pharsa"
    ],
    "threat_profile": "Curse of Blood chains up to 3 enemy champions, mirroring all damage and CC dealt to one onto all chained victims.",
    "durability": 8,
    "cc_lockdown": 8,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "atlas",
    "name": "Atlas",
    "role": "Tank",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Diggie",
      "Valir",
      "Valentina"
    ],
    "counters_to": [
      "Estes deathball",
      "Claude",
      "Grouped enemies"
    ],
    "synergies": [
      "Claude",
      "Pharsa",
      "Kadita"
    ],
    "threat_profile": "Fatal Links chains all nearby enemies, ejecting in mecha suit and throwing them all into one blast zone.",
    "durability": 8,
    "cc_lockdown": 9,
    "early_game": 6,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "popol_and_kupa",
    "name": "Popol and Kupa",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Benedetta",
      "Lancelot",
      "Hayabusa"
    ],
    "counters_to": [
      "Fanny",
      "Claude",
      "Single dive assassins"
    ],
    "synergies": [
      "Grock",
      "Mathilda",
      "Franco"
    ],
    "threat_profile": "Dual companion pressure with Kupa bite stun and trap vision control; dominant 1v1 laning prowess.",
    "durability": 5,
    "cc_lockdown": 7,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "yu_zhong",
    "name": "Yu Zhong",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Sea Halberd / Dominance Ice users",
      "Valir"
    ],
    "counters_to": [
      "Immobile backliners",
      "Low burst compositions"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Angela",
      "Pharsa"
    ],
    "threat_profile": "Black Dragon Form bypasses frontlines and applies AoE Sha Residue; countered by anti-heal and kiting.",
    "durability": 8,
    "cc_lockdown": 7,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "luo_yi",
    "name": "Luo Yi",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Lancelot",
      "Hayabusa",
      "Spread-out compositions"
    ],
    "counters_to": [
      "Estes deathball",
      "Grouped melee drafts"
    ],
    "synergies": [
      "Atlas",
      "Tigreal",
      "Claude"
    ],
    "threat_profile": "Yin-Yang Duality triggers magnetic pull reaction when opposite marks collide; Diversion teleports entire team across map.",
    "durability": 4,
    "cc_lockdown": 8,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "benedetta",
    "name": "Benedetta",
    "role": "Assassin",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Phoveus",
      "Minsitthar",
      "Franco"
    ],
    "counters_to": [
      "Immobile mages",
      "High burst linear teams"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Angela"
    ],
    "threat_profile": "Swordout Slash passive dash with An Eye for an Eye parry immunity and Alecto: Final Blow slash zone.",
    "durability": 5,
    "cc_lockdown": 5,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Very High"
  },
  {
    "id": "khaleed",
    "name": "Khaleed",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Franco",
      "Kaja",
      "Baxia",
      "Valir"
    ],
    "counters_to": [
      "Early skirmishers",
      "Immobile backliners"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Angela"
    ],
    "threat_profile": "Desert Tornado early damage burst with Quicksand Guard massive HP healing and Raging Sandstorm engage.",
    "durability": 8,
    "cc_lockdown": 7,
    "early_game": 9,
    "mid_game": 8,
    "late_game": 6,
    "difficulty": "Medium"
  },
  {
    "id": "barats",
    "name": "Barats",
    "role": "Tank/Fighter",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "Low",
    "hard_counters": [
      "Karrie",
      "Lunox",
      "Valir"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Squishy melee divers"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Floryn",
      "Estes"
    ],
    "threat_profile": "Big Guy stacks grant immense hybrid defense and resilience; Detona's Welcome devours and spits enemies into walls.",
    "durability": 10,
    "cc_lockdown": 7,
    "early_game": 8,
    "mid_game": 10,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "brody",
    "name": "Brody",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Saber",
      "Hayabusa",
      "Franco",
      "Eudora"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Melee frontliners"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas",
      "Mathilda"
    ],
    "threat_profile": "Brody brings powerful Gold lane presence specializing in Burst and Finisher.",
    "durability": 4,
    "cc_lockdown": 5,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "Medium"
  },
  {
    "id": "yve",
    "name": "Yve",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Franco",
      "Kaja",
      "Hayabusa",
      "Lancelot"
    ],
    "counters_to": [
      "Low-mobility teams",
      "Objective zoning"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Terizla"
    ],
    "threat_profile": "Real World Manipulation 5x5 chessboard matrix slows and controls battlefields; cancelled by suppression CC.",
    "durability": 4,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "High"
  },
  {
    "id": "mathilda",
    "name": "Mathilda",
    "role": "Support/Assassin",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Khufra",
      "Minsitthar",
      "Saber"
    ],
    "counters_to": [
      "Immobile comps",
      "Slow mages"
    ],
    "synergies": [
      "Brody",
      "Paquito",
      "Fredrinn"
    ],
    "threat_profile": "Guiding Wind provides instant escape/dash portal for allies; Circling Eagle dives squishies with airborne CC.",
    "durability": 5,
    "cc_lockdown": 6,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "paquito",
    "name": "Paquito",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Franco",
      "Minsitthar",
      "Phoveus"
    ],
    "counters_to": [
      "Squishy marksmen",
      "Immobile mages"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Atlas"
    ],
    "threat_profile": "Champ Stance eliminates skill cooldowns for infinite boxing combos and shields; countered by hard lockdown.",
    "durability": 6,
    "cc_lockdown": 6,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "gloo",
    "name": "Gloo",
    "role": "Tank",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Faramis",
      "Vexana",
      "Claude",
      "Ruby"
    ],
    "counters_to": [
      "Single target carries",
      "Low-burst fighters"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Novaria"
    ],
    "threat_profile": "Split, Split divides into Goo fragments and attaches onto enemy host, overriding their movement and body-blocking.",
    "durability": 8,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "beatrix",
    "name": "Beatrix",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Saber",
      "Hayabusa",
      "Franco",
      "Eudora"
    ],
    "counters_to": [
      "Low-mobility tanks",
      "Melee frontliners"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas",
      "Mathilda"
    ],
    "threat_profile": "Beatrix brings powerful Gold lane presence specializing in Finisher and Damage.",
    "durability": 3,
    "cc_lockdown": 1,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "phoveus",
    "name": "Phoveus",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Esmeralda",
      "Karrie",
      "Baxia"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Lancelot",
      "Wanwan",
      "Benedetta",
      "Ruby"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Minotaur"
    ],
    "threat_profile": "Demonic Force senses nearby dashes and blinks, repeatedly jumping down with colossal AoE smashes and shields.",
    "durability": 8,
    "cc_lockdown": 6,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "natan",
    "name": "Natan",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Radiant Armor users",
      "Saber",
      "Hayabusa",
      "Lolita"
    ],
    "counters_to": [
      "Physical armor stackers",
      "Grouped frontliners"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Angela"
    ],
    "threat_profile": "Entropy reverse clone magic marksman DPS with displacement knockback; melted by Radiant Armor and burst assassination.",
    "durability": 3,
    "cc_lockdown": 4,
    "early_game": 4,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "High"
  },
  {
    "id": "aulus",
    "name": "Aulus",
    "role": "Fighter",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Franco",
      "Saber",
      "Valir",
      "Early game invades"
    ],
    "counters_to": [
      "Melee fighters",
      "Late-game teamfights"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Tigreal"
    ],
    "threat_profile": "War Axe blade upgrades at level 4, 8, and 12, gaining massive physical attack, lifesteal, and area cleave.",
    "durability": 7,
    "cc_lockdown": 4,
    "early_game": 4,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "Low"
  },
  {
    "id": "aamon",
    "name": "Aamon",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Radiant Armor users",
      "Ruby",
      "Franco",
      "Saber"
    ],
    "counters_to": [
      "Isolated squishies",
      "Immobile mages"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Tigreal"
    ],
    "threat_profile": "Invisible Armor shards and Endless Shards magic barrage tracking down weakened targets.",
    "durability": 4,
    "cc_lockdown": 2,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "valentina",
    "name": "Valentina",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Compositions with weak ultimates",
      "Radiant Armor users"
    ],
    "counters_to": [
      "Atlas",
      "Farami",
      "Yu Zhong",
      "Tigreal",
      "Wanwan"
    ],
    "synergies": [
      "Fredrinn",
      "Claude",
      "Mathilda"
    ],
    "threat_profile": "I Am You steals any enemy ultimate ability, turning enemy powerhouses against their own teammates.",
    "durability": 5,
    "cc_lockdown": 6,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "High"
  },
  {
    "id": "edith",
    "name": "Edith",
    "role": "Tank/Marksman",
    "primary_lane": "EXP",
    "damage_type": "Mixed",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Karrie",
      "Lunox",
      "Demon Hunter Sword users"
    ],
    "counters_to": [
      "Squishy assassins",
      "Burst mages"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Claude"
    ],
    "threat_profile": "Phylax tank vanguard ejects into Edith marksman form, dealing catastrophic Wrath magic burst basic attacks.",
    "durability": 9,
    "cc_lockdown": 8,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "Medium"
  },
  {
    "id": "floryn",
    "name": "Floryn",
    "role": "Support",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Baxia",
      "Hayabusa",
      "Saber"
    ],
    "counters_to": [
      "Anti-heal dependent drafts (Lantern removes anti-heal)",
      "Poke drafts"
    ],
    "synergies": [
      "Fredrinn",
      "Barats",
      "Claude"
    ],
    "threat_profile": "Bloom global healing ultimate removes all Life Drain anti-heal debuffs on allies; gifts free item slot buff.",
    "durability": 4,
    "cc_lockdown": 6,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Low"
  },
  {
    "id": "yin",
    "name": "Yin",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Purify",
      "Wind of Nature",
      "Franco",
      "Valir"
    ],
    "counters_to": [
      "Isolated squishy marksmen",
      "Immobile mages"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Franco"
    ],
    "threat_profile": "My Turn abducts a single enemy hero into Lieh domain dimension for an inescapable 1v1 execution duel.",
    "durability": 6,
    "cc_lockdown": 6,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Low"
  },
  {
    "id": "melissa",
    "name": "Melissa",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Pharsa",
      "Yve",
      "Lolita",
      "Franco"
    ],
    "counters_to": [
      "Melee fighters",
      "Chou",
      "Yu Zhong",
      "Thamuz"
    ],
    "synergies": [
      "Tigreal",
      "Minotaur",
      "Carmilla"
    ],
    "threat_profile": "Muddles voodoo link damage transfer and Cuddles bubble barrier that knocks back and blocks all melee heroes.",
    "durability": 4,
    "cc_lockdown": 4,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "Medium"
  },
  {
    "id": "xavier",
    "name": "Xavier",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Low",
    "hard_counters": [
      "Lolita",
      "Lancelot",
      "Hayabusa",
      "Ling"
    ],
    "counters_to": [
      "Immobile frontliners",
      "Choke-point drafts"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Hylos"
    ],
    "threat_profile": "Transcendence stage 3 enhances skills into continuous laser beams with Dawning Light global sniper railgun.",
    "durability": 3,
    "cc_lockdown": 7,
    "early_game": 5,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "Medium"
  },
  {
    "id": "julian",
    "name": "Julian",
    "role": "Fighter/Mage",
    "primary_lane": "Jungle",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Radiant Armor users",
      "Franco",
      "Kaja",
      "Saber"
    ],
    "counters_to": [
      "Melee fighters",
      "Squishy carries without blink"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Enhanced skills at Level 3 provide airborne displacement, invulnerability, or heavy magic burst chain.",
    "durability": 6,
    "cc_lockdown": 7,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "fredrinn",
    "name": "Fredrinn",
    "role": "Fighter/Tank",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Karrie",
      "Valir"
    ],
    "counters_to": [
      "Fanny",
      "Ling",
      "Melee assassin dive comps"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Pharsa",
      "Yve"
    ],
    "threat_profile": "Crystalline Armor converts damage into decaying grey HP; Appraiser's Wrath converts lost HP into lethal physical blast.",
    "durability": 10,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 10,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "joy",
    "name": "Joy",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Magic",
    "mobility_tier": "S+",
    "hard_counters": [
      "Minsitthar",
      "Franco",
      "Kaja",
      "Phoveus"
    ],
    "counters_to": [
      "Skillshot mages",
      "Squishy marksmen"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Tigreal"
    ],
    "threat_profile": "Look, Rhythm! rhythmic dash tempo providing CC immunity and Ha, Electrifying Beats! AoE magic storm.",
    "durability": 4,
    "cc_lockdown": 2,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Very High"
  },
  {
    "id": "novaria",
    "name": "Novaria",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "High",
    "hard_counters": [
      "Hayabusa",
      "Ling",
      "Lancelot",
      "Radiant Armor users"
    ],
    "counters_to": [
      "Bush-camping assassins",
      "Low-mobility backlines"
    ],
    "synergies": [
      "Franco",
      "Beatrix",
      "Saber"
    ],
    "threat_profile": "Astral Sphere ultra long-range sniper artillery and Astral Echo reveals stealth targets across map.",
    "durability": 3,
    "cc_lockdown": 4,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "High"
  },
  {
    "id": "arlott",
    "name": "Arlott",
    "role": "Fighter/Assassin",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Phoveus",
      "Franco",
      "Kaja"
    ],
    "counters_to": [
      "CC-vulnerable carries",
      "Grouped squishies"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Angela"
    ],
    "threat_profile": "Demon Gaze detects CC marks on enemies, granting non-stop Vengeance dash resets and healing.",
    "durability": 6,
    "cc_lockdown": 8,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "ixia",
    "name": "Ixia",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Low",
    "hard_counters": [
      "Franco",
      "Khufra",
      "Saber",
      "Hayabusa"
    ],
    "counters_to": [
      "Low-mobility frontliners",
      "Grouped choke-point drafts"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Belerick"
    ],
    "threat_profile": "Full Barrage massive conical artillery sector with Starlium Siphon life drain; immobilized during channel.",
    "durability": 3,
    "cc_lockdown": 5,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 9,
    "difficulty": "Medium"
  },
  {
    "id": "nolan",
    "name": "Nolan",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Franco",
      "Saber",
      "Kaja"
    ],
    "counters_to": [
      "Immobile backliners",
      "Low sustain squishies"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Tigreal"
    ],
    "threat_profile": "Dimensional rift burst cutter with Cosmic Leap cleanse; deletes squishies in sub-second rotations.",
    "durability": 4,
    "cc_lockdown": 4,
    "early_game": 9,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "cici",
    "name": "Cici",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Baxia",
      "Dominance Ice",
      "Khufra",
      "Phoveus"
    ],
    "counters_to": [
      "Low mobility melee fighters",
      "Kiteable tanks"
    ],
    "synergies": [
      "Angela",
      "Mathilda",
      "Fredrinn"
    ],
    "threat_profile": "Yo-yo Blitz kite-dancing with percentage max HP physical damage; countered by anti-heal and burst.",
    "durability": 7,
    "cc_lockdown": 4,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "chip",
    "name": "Chip",
    "role": "Support/Tank",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "S+",
    "hard_counters": [
      "Diggie",
      "Valir",
      "Suppressors"
    ],
    "counters_to": [
      "Isolated split pushers",
      "Uncoordinated teams"
    ],
    "synergies": [
      "Tigreal",
      "Pharsa",
      "Terizla"
    ],
    "threat_profile": "Why Walk? portals across map summoning teammates instantly to any lane objective fight.",
    "durability": 8,
    "cc_lockdown": 8,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "High"
  },
  {
    "id": "zhuxin",
    "name": "Zhuxin",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Diggie",
      "Valir",
      "Purify",
      "Lancelot"
    ],
    "counters_to": [
      "Melee fighters without blink",
      "Slow frontlines"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Terizla"
    ],
    "threat_profile": "Lantern Flare pulls enemies into the air and hurls them across map continuously using Soul Snare charges.",
    "durability": 4,
    "cc_lockdown": 9,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "suyou",
    "name": "Suyou",
    "role": "Assassin/Fighter",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Franco",
      "Kaja",
      "Khufra",
      "Phoveus"
    ],
    "counters_to": [
      "Squishy carries",
      "Low CC frontlines"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Dual mortal/immortal stance switching between high-speed tap dashes and devastating charge cleaves.",
    "durability": 6,
    "cc_lockdown": 6,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "High"
  },
  {
    "id": "lukas",
    "name": "Lukas",
    "role": "Fighter",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Baxia",
      "Franco",
      "Kaja",
      "Valir"
    ],
    "counters_to": [
      "Melee fighters without burst",
      "Frontline tanks"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Atlas"
    ],
    "threat_profile": "Sacred Beast avatar transformation with hypercharged claw strikes and sustained brawling resilience.",
    "durability": 8,
    "cc_lockdown": 6,
    "early_game": 7,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "kalea",
    "name": "Kalea",
    "role": "Support/Fighter",
    "primary_lane": "Roam",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Baxia",
      "Valir",
      "Karrie"
    ],
    "counters_to": [
      "Dive assassins",
      "Melee squishies"
    ],
    "synergies": [
      "Claude",
      "Beatrix",
      "Fredrinn"
    ],
    "threat_profile": "Surging Wave aquatic crowd control and frontline sustain providing dynamic disruption in teamfights.",
    "durability": 7,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 8,
    "late_game": 7,
    "difficulty": "Medium"
  },
  {
    "id": "zetian",
    "name": "Zetian",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Radiant Armor users",
      "Athena's Shield users",
      "Lancelot",
      "Hayabusa",
      "Saber"
    ],
    "counters_to": [
      "Immobile tanks",
      "Grouped frontliners",
      "Low-mobility brawlers"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Franco",
      "Terizla"
    ],
    "threat_profile": "Celestial Empress commanding imperial decree burst and domain area-of-effect suppression; dominates mid lane through massive celestial crowd control.",
    "durability": 4,
    "cc_lockdown": 8,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 9,
    "difficulty": "Medium"
  },
  {
    "id": "obsidia",
    "name": "Obsidia",
    "role": "Marksman",
    "primary_lane": "Gold",
    "damage_type": "Physical",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Saber",
      "Hayabusa",
      "Khufra"
    ],
    "counters_to": [
      "High HP tanks",
      "Low-mobility frontliners"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Angela"
    ],
    "threat_profile": "Sovereign of Dark's End long-range shadow marksman piercing heavy frontline armor with void execution.",
    "durability": 3,
    "cc_lockdown": 4,
    "early_game": 6,
    "mid_game": 8,
    "late_game": 10,
    "difficulty": "Medium"
  },
  {
    "id": "sora",
    "name": "Sora",
    "role": "Fighter/Assassin",
    "primary_lane": "EXP",
    "damage_type": "Physical",
    "mobility_tier": "S+",
    "hard_counters": [
      "Khufra",
      "Phoveus",
      "Franco"
    ],
    "counters_to": [
      "Squishy backliners",
      "Immobile mages"
    ],
    "synergies": [
      "Angela",
      "Tigreal",
      "Mathilda"
    ],
    "threat_profile": "Aerial blade skirmisher with rapid skyward dash execution and burst chains.",
    "durability": 6,
    "cc_lockdown": 6,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 8,
    "difficulty": "High"
  },
  {
    "id": "marcel",
    "name": "Marcel",
    "role": "Support",
    "primary_lane": "Roam",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Baxia",
      "Saber",
      "Hayabusa"
    ],
    "counters_to": [
      "Single-target burst drafts",
      "Melee divers"
    ],
    "synergies": [
      "Claude",
      "Fredrinn",
      "Yve"
    ],
    "threat_profile": "Tactical disruption support capable of isolating threats and boosting allied repositioning.",
    "durability": 5,
    "cc_lockdown": 7,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Medium"
  },
  {
    "id": "hirara",
    "name": "Hirara",
    "role": "Assassin",
    "primary_lane": "Jungle",
    "damage_type": "Physical",
    "mobility_tier": "High",
    "hard_counters": [
      "Khufra",
      "Saber",
      "Franco"
    ],
    "counters_to": [
      "Squishy marksmen",
      "Immobile backliners"
    ],
    "synergies": [
      "Angela",
      "Franco",
      "Mathilda"
    ],
    "threat_profile": "Shadow jungle executioner tracking low-health targets and ambushing with quick daggers.",
    "durability": 3,
    "cc_lockdown": 4,
    "early_game": 8,
    "mid_game": 9,
    "late_game": 7,
    "difficulty": "High"
  },
  {
    "id": "dori",
    "name": "Dori",
    "role": "Mage",
    "primary_lane": "Mid",
    "damage_type": "Magic",
    "mobility_tier": "Medium",
    "hard_counters": [
      "Radiant Armor users",
      "Lancelot",
      "Hayabusa"
    ],
    "counters_to": [
      "Immobile siege compositions",
      "Low CC teams"
    ],
    "synergies": [
      "Tigreal",
      "Atlas",
      "Hylos"
    ],
    "threat_profile": "Arcane area disruption and mystic projectile volleys commanding lane priority.",
    "durability": 3,
    "cc_lockdown": 7,
    "early_game": 7,
    "mid_game": 8,
    "late_game": 8,
    "difficulty": "Low"
  }
];
