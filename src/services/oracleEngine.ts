import { OracleChatMessage } from '../types/mlbb';
import { BATTLE_SPELLS } from '../data/tacticalKnowledge';

export function solveOracleQueryLocally(query: string): OracleChatMessage {
  const cleanQuery = query.toLowerCase().trim();

  const mlbbKeywords = [
    'mlbb', 'fanny', 'estes', 'ruby', 'claude', 'change', 'yu zhong', 'terizla', 'paquito',
    'benedetta', 'thamuz', 'cici', 'hayabusa', 'ling', 'lancelot', 'nolan', 'baxia', 'fredrinn',
    'pharsa', 'yve', 'valentina', 'luo yi', 'novaria', 'kadita', 'beatrix', 'brody', 'harith',
    'karrie', 'bruno', 'khufra', 'tigreal', 'franco', 'atlas', 'angela', 'mathilda', 'diggie',
    'dominance ice', 'sea halberd', 'radiant armor', 'athena', 'blade armor', 'malefic roar',
    'divine glaive', 'winter crown', 'immortality', 'rose gold meteor', 'wind of nature',
    'antique cuirass', 'demon hunter sword', 'war axe', 'thunder belt', 'glowing wand',
    'flicker', 'purify', 'retribution', 'petrify', 'aegis', 'vengeance', 'sprint', 'inspire',
    'revitalize', 'arrival', 'flameshot', 'spell', 'cooldown', 'cd', 'turtle', 'lord',
    'wave', 'freeze', 'slow push', 'fast push', 'crash', 'exp', 'gold', 'jungle', 'mid',
    'roam', 'emblem', 'talent', 'counter', 'draft', 'hero', 'item', 'build', 'macro',
    'rotation', 'gank', 'invade', 'buff', 'lithowanderer', 'land of dawn', 'spell vamp', 'lifesteal'
  ];

  const isMLBBRelated = mlbbKeywords.some(kw => cleanQuery.includes(kw));

  if (!isMLBBRelated) {
    return {
      id: Math.random().toString(),
      sender: 'oracle',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRejected: true,
      text: "The DawnOracle's celestial eye is locked strictly onto the tactical ether of the Land of Dawn. Inquiries regarding topics outside hero drafts, itemization matrices, emblem synergies, battle spell cooldowns, and lane wave mechanics cannot be deciphered. State your tactical query for the Land of Dawn.",
      tactical_tags: ["Domain-Locked Rejection"]
    };
  }

  // Fanny Counter Manual
  if (cleanQuery.includes('fanny') && (cleanQuery.includes('counter') || cleanQuery.includes('deal with') || cleanQuery.includes('beat'))) {
    return {
      id: Math.random().toString(),
      sender: 'oracle',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRejected: false,
      text: `### Tactical Counter-Manual: Neutralizing a Snowballing Fanny

**1. Draft Hard Counters:**
- **Khufra (Roam):** Skill 2 (*Bouncing Ball*) immediately knocks Fanny down whenever she attempts a cable dive, interrupting her momentum and leaving her stranded.
- **Franco / Kaja (Roam/Mid):** *Bloody Hunt* / *Divine Judgment* suppression cannot be cleansed by Purify. The moment she cables near, suppress and burst her before she casts tornado strike.
- **Saber (Roam/Jungle):** *Triple Sweep* lock-on airborne removes her iframe opportunities.
- **Phoveus (EXP):** Her relentless cable dashes trigger Phoveus's ultimate leap cooldown reset repeatedly.

**2. Mandatory Equipment Adaptation:**
- **Antique Cuirass:** Her tornado strikes are physical skills. Antique Cuirass immediately slashes her physical attack by 18%.
- **Wind of Nature:** Marksmen must pop WoN the moment her cables hit the wall, giving 2s total physical damage immunity.
- **Winter Crown:** Mages/Fighters freeze for 2s while she exhausts her entire energy pool.

**3. Macro Jungle Denial:**
- Fanny is completely crippled without **Purple Buff** (-60% energy reduction). Invade her blue buff at 0:30, 2:00, and every 90 seconds thereafter. If she has no blue buff, she cannot chain cables.`,
      tactical_tags: ["Hero Counter", "Fanny", "Jungle Invade", "Suppression"]
    };
  }

  // Radiant vs Athena Triage
  if ((cleanQuery.includes('radiant') && cleanQuery.includes('athena')) || cleanQuery.includes('magic defense') || (cleanQuery.includes('change') && cleanQuery.includes('radiant'))) {
    return {
      id: Math.random().toString(),
      sender: 'oracle',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRejected: false,
      text: `### Magic Defense Triage: Radiant Armor vs. Athena's Shield

| Equipment | Core Passive | Best Against | Vulnerable To |
| :--- | :--- | :--- | :--- |
| **Radiant Armor** | **Holy Blessing:** Reduces incoming continuous Magic Damage per stack (up to 6 stacks). | Multi-tick, continuous magic DPS: **Chang'e, Valir, Yve, Kimmy, Silvanna, Harley**. | High single-hit burst (Kadita, Eudora). |
| **Athena's Shield** | **Shield:** Triggers upon taking Magic Damage, reducing Magic Damage taken by **25% for 3s** (20s cooldown). | Lethal single-rotation burst mages: **Kadita, Pharsa, Eudora, Aurora, Kagura, Vale**. | Poke tick damage (Chang'e burns through the 3s shield easily). |

**Tactical Rule of Thumb:**
- Facing **Chang'e** or **Valir**? **Radiant Armor is non-negotiable**. A fully-stacked Radiant Armor reduces Chang'e's Meteor Shower damage by over 60%!
- Facing burst ambushers like **Kadita**? Athena's Shield absorbs the initial Rough Waves surge, allowing you to react and retaliate.`,
      tactical_tags: ["Item Triage", "Radiant Armor", "Athena's Shield", "Magic Defense"]
    };
  }

  // Battle Spell Cooldown Index
  if (cleanQuery.includes('spell') || cleanQuery.includes('cooldown') || cleanQuery.includes('flicker') || cleanQuery.includes('purify') || cleanQuery.includes('retri')) {
    const tableData = {
      headers: ["Battle Spell", "Cooldown", "Primary Function", "Key Tactical Note"],
      rows: BATTLE_SPELLS.map(s => [s.name, `${s.cooldown}s`, s.best_roles.join(", "), s.tactical_use])
    };
    return {
      id: Math.random().toString(),
      sender: 'oracle',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRejected: false,
      text: `### Land of Dawn: Comprehensive Battle Spell Cooldown Index

Tracking opponent battle spell cooldowns is the #1 differentiator between Mythic and Mythical Immortal players. When an enemy marksman blows Flicker, you have an exact **120-second window** to execute a guaranteed dive gank!`,
      table_data: tableData,
      tactical_tags: ["Battle Spells", "Cooldown Tracking", "Spell Timers"]
    };
  }

  // Wave Management & Minion Manipulation
  if (cleanQuery.includes('wave') || cleanQuery.includes('freeze') || cleanQuery.includes('push') || cleanQuery.includes('crash')) {
    return {
      id: Math.random().toString(),
      sender: 'oracle',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRejected: false,
      text: `### Tactical Wave Management & Minion Manipulation

**1. Wave Freezing (The Lane Bully Technique):**
- **When:** You have lane dominance or kill threat against your direct opponent in EXP or Gold Lane.
- **Execution:** Do NOT hit the minions until they have under 5% HP. Stand between the enemy minions and the enemy hero to zone them completely out of Gold & EXP range.
- **Result:** You deny 500+ gold and a full level advantage over 2 minutes, forcing the enemy to risk a death or fall behind permanently.

**2. Slow Push (The 5v4 Objective Trap):**
- **When:** Exactly 60 seconds before Turtle or Lord spawns on the far side of the map.
- **Execution:** Kill *only* the enemy ranged caster and siege cart minions; leave the melee minions alive. Your minions will slowly bunch up, creating a 3-wave mega-swarm.
- **Result:** When Turtle spawns, the enemy must send 1 hero to clear the wave before it destroys their inner turret, guaranteeing your team a 5v4 teamfight at the pit!

**3. Fast Crash (The Rotation Gate):**
- **When:** You want to recall to base, rotate to Mid for a 3-man gank, or contest the 2:00 Turtle.
- **Execution:** Dump all AOE waveclear skills instantly. Crash your minions under their turret, giving you a 25-second tempo window where the enemy cannot rotate without sacrificing turret plates.`,
      tactical_tags: ["Wave Control", "Freeze Wave", "Slow Push", "Macro Strategy"]
    };
  }

  // Roam Rotation Guide
  if (cleanQuery.includes('roam') || cleanQuery.includes('rotation') || cleanQuery.includes('first') || cleanQuery.includes('minute')) {
    return {
      id: Math.random().toString(),
      sender: 'oracle',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRejected: false,
      text: `### Optimal Roamer Rotation: The First 3 Minutes (0:00 - 3:00)

- **0:00 - 0:15 | Mid Lane Wave Priority:**
  Accompany your Mid Laner to clear the first minion wave instantly.
- **0:15 - 0:45 | Jungle Vision & Lithowanderer Contest:**
  Check the enemy Jungler's starting buff. Position at the Lithowanderer in the river at 0:45 to help your Jungler secure it.
- **1:00 - 1:40 | EXP Lane Skirmish or Gold Lane Peel:**
  Rotate toward the lane opposite to where the Turtle will spawn.
- **1:45 - 2:00 | Turtle Zone Preparation:**
  Arrive at the Turtle pit **15 seconds before spawn**. Sweep the bushes for enemy vision.`,
      tactical_tags: ["Roam Rotation", "Macro Play", "Lithowanderer", "Turtle Setup"]
    };
  }

  // General Synthesis Fallback
  return {
    id: Math.random().toString(),
    sender: 'oracle',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isRejected: false,
    text: `### DawnOracle Tactical Synthesis for "${query}"

**1. Draft & Matchup Implications:**
In high-rank competitive MLBB, drafting determines 60% of match outcome. Prioritize flex picks like **Valentina**, **Paquito**, or **Ruby** that can pivot between lanes to disguise your strategy.

**2. Itemization Counter-Measures:**
- Check enemy healing sources early. If an **Estes**, **Uranus**, or **Ruby** is drafted, rush **Dominance Ice**, **Sea Halberd**, or **Glowing Wand** as 2nd item!
- Against multi-physical dive (Fanny, Hayabusa, Paquito), prioritize **Antique Cuirass** and **Wind of Nature**.
- Against continuous magic poke (Chang'e, Valir, Yve), stack **Radiant Armor**.

**3. Timing & Objective Windows:**
- **0:45:** Contest Lithowanderer for river control.
- **2:00:** Turtle #1 spawn; Roamer must hold zone control.
- **8:00:** Standard Lord spawns; set up a Slow Push on opposite side.
- **12:00:** Evolved Lord spawns; bait lord dances to force enemy positioning errors.`,
    tactical_tags: ["Tactical Synthesis", "Draft Priority", "Land of Dawn"]
  };
}
