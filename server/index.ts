import express, { Request, Response } from 'express';
import cors from 'cors';
import { HEROES } from '../src/data/heroes';
import { ITEMS } from '../src/data/items';
import { BASE_EMBLEMS, TALENTS_TIER_1, TALENTS_TIER_2, TALENTS_TIER_3, EMBLEM_PRESETS } from '../src/data/emblems';
import { BATTLE_SPELLS } from '../src/data/tacticalKnowledge';
import { Hero } from '../src/types/mlbb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());

// Standalone APK and Package Download Endpoints (Before express.static to enforce download headers)
app.get(['/DawnTactics.apk', '/api/download/apk', '/download/apk'], (_req: Request, res: Response) => {
  const apkPath = path.resolve(__dirname, '../DawnTactics.apk');
  if (fs.existsSync(apkPath)) {
    const stat = fs.statSync(apkPath);
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', 'attachment; filename="DawnTactics.apk"');
    res.setHeader('Content-Length', stat.size.toString());
    res.sendFile(apkPath);
  } else {
    res.status(404).json({ error: 'APK not found' });
  }
});

// Apple iOS WebClip Configuration Profile Download Endpoint (.mobileconfig)
app.get(['/DawnTactics.mobileconfig', '/api/download/mobileconfig', '/download/ios', '/download/iphone'], (_req: Request, res: Response) => {
  const profilePath = path.resolve(__dirname, '../public/DawnTactics.mobileconfig');
  if (fs.existsSync(profilePath)) {
    const stat = fs.statSync(profilePath);
    res.setHeader('Content-Type', 'application/x-apple-aspen-config; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="DawnTactics.mobileconfig"');
    res.setHeader('Content-Length', stat.size.toString());
    res.sendFile(profilePath);
  } else {
    res.status(404).json({ error: 'iOS configuration profile not found' });
  }
});

// Dedicated Mobile Download Landing Page
app.get(['/download', '/install', '/get-app'], (_req: Request, res: Response) => {
  const downloadHtmlPath = path.resolve(__dirname, '../public/download.html');
  if (fs.existsSync(downloadHtmlPath)) {
    res.sendFile(downloadHtmlPath);
  } else {
    res.redirect('/DawnTactics.apk');
  }
});

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', title: 'DawnTactics AI Engine', version: '1.0.0' });
});

app.get(['/DawnTactics.aab', '/api/download/aab'], (_req: Request, res: Response) => {
  const aabPath = path.resolve(__dirname, '../DawnTactics.aab');
  if (fs.existsSync(aabPath)) {
    res.setHeader('Content-Type', 'application/octet-stream');
    res.download(aabPath, 'DawnTactics.aab');
  } else {
    res.status(404).json({ error: 'AAB bundle not found' });
  }
});

app.get(['/DawnTactics-Android-PWABuilder.zip', '/api/download/zip'], (_req: Request, res: Response) => {
  const zipPath = path.resolve(__dirname, '../DawnTactics-Android-PWABuilder.zip');
  if (fs.existsSync(zipPath)) {
    res.setHeader('Content-Type', 'application/zip');
    res.download(zipPath, 'DawnTactics-Android-PWABuilder.zip');
  } else {
    res.status(404).json({ error: 'Package ZIP not found' });
  }
});

// Catalog Endpoints
app.get('/api/heroes', (_req: Request, res: Response) => {
  res.json(HEROES);
});

app.get('/api/items', (_req: Request, res: Response) => {
  res.json(ITEMS);
});

app.get('/api/emblems', (_req: Request, res: Response) => {
  res.json({
    base_emblems: BASE_EMBLEMS,
    tier_1: TALENTS_TIER_1,
    tier_2: TALENTS_TIER_2,
    tier_3: TALENTS_TIER_3,
    presets: EMBLEM_PRESETS,
  });
});

// Draft Evaluation Endpoint
app.post('/api/draft/evaluate', (req: Request, res: Response) => {
  const { blueTeam = {}, redTeam = {} } = req.body;

  const getTeamHeroes = (team: Record<string, string | null>): Hero[] => {
    return Object.values(team)
      .filter((id): id is string => Boolean(id))
      .map(id => HEROES.find(h => h.id === id))
      .filter((h): h is Hero => Boolean(h));
  };

  const blueHeroes = getTeamHeroes(blueTeam);
  const redHeroes = getTeamHeroes(redTeam);

  const calculateMetrics = (heroes: Hero[], _opponentHeroes: Hero[]) => {
    if (heroes.length === 0) {
      return {
        physical_ratio: 50,
        magic_ratio: 50,
        true_ratio: 0,
        cc_score: 50,
        early_curve: 50,
        mid_curve: 50,
        late_curve: 50,
        durability_score: 50,
        key_strengths: ["No heroes selected yet"],
        vulnerabilities: ["Draft incomplete"]
      };
    }

    let physCount = 0;
    let magicCount = 0;
    let trueCount = 0;
    let ccSum = 0;
    let earlySum = 0;
    let midSum = 0;
    let lateSum = 0;
    let durSum = 0;

    heroes.forEach(h => {
      if (h.damage_type === 'Physical') physCount += 1;
      else if (h.damage_type === 'Magic') magicCount += 1;
      else if (h.damage_type === 'True') trueCount += 1;
      else { physCount += 0.5; magicCount += 0.5; }

      ccSum += h.cc_lockdown;
      earlySum += h.early_game;
      midSum += h.mid_game;
      lateSum += h.late_game;
      durSum += h.durability;
    });

    const totalDmg = (physCount + magicCount + trueCount) || 1;
    const physRatio = Math.round((physCount / totalDmg) * 100);
    const magicRatio = Math.round((magicCount / totalDmg) * 100);
    const trueRatio = Math.round((trueCount / totalDmg) * 100);

    const ccScore = Math.min(100, Math.round((ccSum / (heroes.length * 10)) * 100));
    const earlyCurve = Math.min(100, Math.round((earlySum / (heroes.length * 10)) * 100));
    const midCurve = Math.min(100, Math.round((midSum / (heroes.length * 10)) * 100));
    const lateCurve = Math.min(100, Math.round((lateSum / (heroes.length * 10)) * 100));
    const durabilityScore = Math.min(100, Math.round((durSum / (heroes.length * 10)) * 100));

    const strengths: string[] = [];
    const vulnerabilities: string[] = [];

    if (ccScore >= 75) strengths.push("Heavy CC chain lockdown; extreme kill threat in teamfights.");
    else if (ccScore < 45) vulnerabilities.push("Low crowd control; vulnerable to high-mobility dive assassins.");

    if (durabilityScore >= 70) strengths.push("Solid frontline sponge with high survivability.");
    else if (durabilityScore < 45) vulnerabilities.push("Squishy draft lacking reliable engage/peel frontline.");

    if (physRatio >= 80) vulnerabilities.push("Excessive Physical damage; countered by stacked Blade Armor & Antique Cuirass.");
    if (magicRatio >= 75) vulnerabilities.push("Excessive Magic damage; completely mitigated by Radiant Armor & Athena's Shield.");

    if (earlyCurve >= 75) strengths.push("Explosive early-game invade & first Turtle control.");
    if (lateCurve >= 80) strengths.push("Exceptional late-game hypercarry scaling.");
    if (lateCurve < 55 && earlyCurve >= 75) vulnerabilities.push("Falls off severely past 15 minutes; must close before Enhanced Lord.");

    return {
      physical_ratio: physRatio,
      magic_ratio: magicRatio,
      true_ratio: trueRatio,
      cc_score: ccScore,
      early_curve: earlyCurve,
      mid_curve: midCurve,
      late_curve: lateCurve,
      durability_score: durabilityScore,
      key_strengths: strengths.length > 0 ? strengths : ["Balanced draft composition"],
      vulnerabilities: vulnerabilities.length > 0 ? vulnerabilities : ["No major structural flaws identified"]
    };
  };

  const blueMetrics = calculateMetrics(blueHeroes, redHeroes);
  const redMetrics = calculateMetrics(redHeroes, blueHeroes);

  let winRateDelta = 0;
  winRateDelta += (blueMetrics.cc_score - redMetrics.cc_score) * 0.15;
  winRateDelta += (blueMetrics.durability_score - redMetrics.durability_score) * 0.12;
  if (blueMetrics.physical_ratio > 85 || blueMetrics.magic_ratio > 80) winRateDelta -= 6;
  if (redMetrics.physical_ratio > 85 || redMetrics.magic_ratio > 80) winRateDelta += 6;

  let blueHardCounterPoints = 0;
  let redHardCounterPoints = 0;
  redHeroes.forEach(redH => {
    blueHeroes.forEach(blueH => {
      if (redH.hard_counters.some(c => c.toLowerCase() === blueH.name.toLowerCase())) blueHardCounterPoints += 2.5;
    });
  });
  blueHeroes.forEach(blueH => {
    redHeroes.forEach(redH => {
      if (blueH.hard_counters.some(c => c.toLowerCase() === redH.name.toLowerCase())) redHardCounterPoints += 2.5;
    });
  });

  winRateDelta += (blueHardCounterPoints - redHardCounterPoints);

  const predictedWinRate = Math.min(85, Math.max(15, Math.round(50 + winRateDelta)));

  res.json({
    blue: { ...blueMetrics, predicted_win_rate: predictedWinRate },
    red: { ...redMetrics, predicted_win_rate: 100 - predictedWinRate }
  });
});

// Reactive Itemization Recommendation Endpoint
app.post('/api/items/recommend', (req: Request, res: Response) => {
  const { allyHeroId, enemyHeroIds = [] } = req.body;
  const allyHero = HEROES.find(h => h.id === allyHeroId);
  const enemyHeroes = (enemyHeroIds as string[])
    .map(id => HEROES.find(h => h.id === id))
    .filter((h): h is Hero => Boolean(h));

  if (!allyHero) {
    return res.status(400).json({ error: "Invalid ally hero ID" });
  }

  let hasHeavySustain = false;
  const sustainSources: string[] = [];
  const continuousMagicThreats: string[] = [];
  const burstMagicThreats: string[] = [];
  const tankStackers: string[] = [];
  const critMarksmen: string[] = [];
  const skillPhysicalBurst: string[] = [];

  enemyHeroes.forEach((e: Hero) => {
    if (['estes', 'ruby', 'yu_zhong', 'thamuz', 'uranus'].includes(e.id)) {
      hasHeavySustain = true;
      sustainSources.push(e.name);
    }
    if (['change', 'yve', 'valir'].includes(e.id)) {
      continuousMagicThreats.push(e.name);
    }
    if (['kadita', 'pharsa', 'valentina'].includes(e.id)) {
      burstMagicThreats.push(e.name);
    }
    if (e.durability >= 8 || ['fredrinn', 'baxia', 'terizla', 'khufra', 'tigreal'].includes(e.id)) {
      tankStackers.push(e.name);
    }
    if (['bruno', 'beatrix', 'claude'].includes(e.id)) {
      critMarksmen.push(e.name);
    }
    if (['fanny', 'hayabusa', 'lancelot', 'paquito', 'nolan'].includes(e.id)) {
      skillPhysicalBurst.push(e.name);
    }
  });

  const recommendations: any[] = [];
  const rulesTriggered: string[] = [];

  if (hasHeavySustain) {
    if (['Tank', 'Fighter/Tank', 'Tank/Support'].includes(allyHero.role) || allyHero.primary_lane === 'Roam' || allyHero.primary_lane === 'EXP') {
      recommendations.push(ITEMS.find(i => i.id === 'dominance_ice'));
      rulesTriggered.push(`Dominance Ice is MANDATORY to apply 50% Life Drain aura against ${sustainSources.join(', ')} while cutting enemy attack speed.`);
    } else if (allyHero.damage_type === 'Magic') {
      recommendations.push(ITEMS.find(i => i.id === 'glowing_wand'));
      rulesTriggered.push(`Glowing Wand provides 50% Life Drain anti-heal + % HP burn to shred ${sustainSources.join(', ')}.`);
    } else {
      recommendations.push(ITEMS.find(i => i.id === 'sea_halberd'));
      rulesTriggered.push(`Sea Halberd activates 50% Life Drain on physical hits + deals Punish extra damage against high HP targets like ${sustainSources.join(', ')}.`);
    }
  }

  if (continuousMagicThreats.length > 0) {
    recommendations.push(ITEMS.find(i => i.id === 'radiant_armor'));
    rulesTriggered.push(`Radiant Armor is required over Athena's Shield against continuous tick magic from ${continuousMagicThreats.join(', ')}.`);
  }
  if (burstMagicThreats.length > 0 && continuousMagicThreats.length === 0) {
    recommendations.push(ITEMS.find(i => i.id === 'athenas_shield'));
    rulesTriggered.push(`Athena's Shield provides immediate 25% Magic Damage reduction to negate the initial burst rotation of ${burstMagicThreats.join(', ')}.`);
  }

  if (tankStackers.length >= 2) {
    if (allyHero.damage_type === 'Physical') {
      recommendations.push(ITEMS.find(i => i.id === 'malefic_roar'));
      rulesTriggered.push(`Malefic Roar is required: the enemy features high defense tanks (${tankStackers.join(', ')}).`);
    } else if (allyHero.damage_type === 'Magic') {
      recommendations.push(ITEMS.find(i => i.id === 'divine_glaive'));
      rulesTriggered.push(`Divine Glaive is required: converts enemy Magic Defense into bonus % Magic Penetration.`);
    }
  }

  if (critMarksmen.length > 0 && (allyHero.durability >= 6 || allyHero.primary_lane === 'Roam' || allyHero.primary_lane === 'EXP')) {
    recommendations.push(ITEMS.find(i => i.id === 'blade_armor'));
    rulesTriggered.push(`Blade Armor provides +70 Physical Defense, reflects 20% incoming basic attack damage, and mitigates 20% critical damage from ${critMarksmen.join(', ')}.`);
  }

  if (skillPhysicalBurst.length > 0 && (allyHero.durability >= 6 || allyHero.primary_lane === 'Roam' || allyHero.primary_lane === 'EXP')) {
    recommendations.push(ITEMS.find(i => i.id === 'antique_cuirass'));
    rulesTriggered.push(`Antique Cuirass reduces ${skillPhysicalBurst.join(', ')}'s Physical Attack by 18% upon taking skill hits.`);
  }

  recommendations.push(ITEMS.find(i => i.id === 'immortality'));
  recommendations.push(ITEMS.find(i => i.id === 'winter_crown'));

  res.json({
    allyHero,
    recommended_items: recommendations.filter(Boolean),
    rules_triggered: rulesTriggered,
    swapping_sequence: ["immortality", "winter_crown", allyHero.role.includes("Marksman") ? "wind_of_nature" : "rose_gold_meteor"]
  });
});

// Modular Emblem Recommendation Endpoint
app.post('/api/emblems/recommend', (req: Request, res: Response) => {
  const { heroId, opponentHeroId } = req.body;
  const hero = HEROES.find(h => h.id === heroId);
  const opponent = HEROES.find(h => h.id === opponentHeroId);

  if (!hero) {
    return res.status(400).json({ error: "Invalid hero ID" });
  }

  const preset = EMBLEM_PRESETS.find(p => p.hero_id === hero.id);
  if (preset) {
    return res.json({
      hero,
      opponent,
      recommendation: preset,
      adaptive_note: opponent ? `Against ${opponent.name}: Consider tailoring defensive tier nodes if ${opponent.damage_type} damage threatens your early lane phase.` : "Standard competitive tier setup."
    });
  }

  let baseEmblem = "fighter";
  let tier1 = "Thrill (+16 Adaptive Attack)";
  let tier2 = "Festival of Blood (+Spell Vamp)";
  let tier3 = "Brave Smite (Restores 5% HP on skill hit)";

  if (hero.role.includes("Assassin")) {
    baseEmblem = "assassin";
    tier1 = "Rupture (+5 Adaptive Penetration)";
    tier2 = hero.primary_lane === "Jungle" ? "Seasoned Hunter (+15% Lord/Turtle Dmg)" : "Master Assassin (+7% Solo Dmg)";
    tier3 = "Killing Spree (+15% HP & +20% Move Speed on kill)";
  } else if (hero.role.includes("Mage")) {
    baseEmblem = "mage";
    tier1 = "Inspire (+5% CD Reduction)";
    tier2 = "Bargain Hunter (5% Discount)";
    tier3 = "Impure Rage (Adaptive Dmg & Mana restore)";
  } else if (hero.role.includes("Marksman")) {
    baseEmblem = "marksman";
    tier1 = "Swift (+10% Attack Speed)";
    tier2 = "Weapons Master (+5% Extra Attack)";
    tier3 = "Quantum Charge (+30% Move Speed & Heal on hit)";
  } else if (hero.role.includes("Tank") || hero.primary_lane === "Roam") {
    baseEmblem = "tank";
    tier1 = "Firmness (+6 Hybrid Defense)";
    tier2 = "Tenacity (Defense below 50% HP)";
    tier3 = "Concussive Blast (Max HP AoE Magic burst)";
  }

  res.json({
    hero,
    opponent,
    recommendation: {
      hero_id: hero.id,
      base_emblem: baseEmblem,
      tier_1: tier1,
      tier_2: tier2,
      tier_3: tier3,
      synergy_rationale: `Optimized for ${hero.name}'s ${hero.role} kit and ${hero.primary_lane} lane dynamics.`,
      situational_alternative: opponent ? `Swap Tier 1 node to Firmness if taking heavy physical/magic poke against ${opponent.name}.` : "Swap Tier 2 to Pull Yourself Together."
    }
  });
});

// Gemini Status & Draft Coach Endpoints
app.get('/api/gemini/status', (_req: Request, res: Response) => {
  const hasEnvKey = Boolean(process.env.GEMINI_API_KEY?.trim());
  res.json({
    enabled: true,
    hasServerKey: hasEnvKey,
    recommendedModel: 'gemini-2.5-flash',
    supportedModels: ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash']
  });
});

app.post('/api/gemini/analyze-draft', async (req: Request, res: Response) => {
  const { blueHeroes = [], redHeroes = [], bans = { blue: [], red: [] }, apiKey } = req.body;
  const activeKey = (apiKey as string)?.trim() || process.env.GEMINI_API_KEY?.trim();

  if (!activeKey) {
    return res.status(400).json({ error: "Missing Gemini API key" });
  }

  const prompt = `Analyze this competitive Mobile Legends: Bang Bang draft:
Ally (Blue): ${blueHeroes.join(', ') || 'Incomplete'}
Enemy (Red): ${redHeroes.join(', ') || 'Incomplete'}
Bans: Blue [${bans.blue?.join(', ') || 'None'}] | Red [${bans.red?.join(', ') || 'None'}]

Provide an elite esports coach breakdown:
1. Win Condition & Power Spikes (Early vs Late game timing)
2. Lane Matchup Triage & Counterplay
3. Priority Counter-Itemization (Anti-heal, armor penetration, magic defense triage)`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(activeKey)}`;
    const apiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
      })
    });
    if (apiRes.ok) {
      const data = await apiRes.json();
      const analysis = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return res.json({ analysis });
    }
    const err = await apiRes.json().catch(() => ({}));
    return res.status(apiRes.status).json({ error: err.error?.message || "Gemini API error" });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Failed to contact Gemini API" });
  }
});

// Domain-Locked "Ask DawnOracle" Chat Endpoint (Powered by Gemini with Offline Heuristic Fallback)
app.post('/api/oracle/chat', async (req: Request, res: Response) => {
  const { query, apiKey, context } = req.body;
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  // 1. If Gemini API key is provided in request or environment, query Google Gemini
  const activeGeminiKey = (apiKey as string)?.trim() || process.env.GEMINI_API_KEY?.trim();
  if (activeGeminiKey) {
    const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(activeGeminiKey)}`;
        const systemPrompt = `You are DawnOracle AI, the premier Mobile Legends: Bang Bang (MLBB) Mythical Immortal Esports Tactical Coach.
You possess master knowledge of hero drafts, counter-picks, item triage (Radiant Armor vs Athena's Shield, Dominance Ice, Malefic Roar), emblem talents, wave freezing/slow pushing, and spell cooldowns (Flicker 120s, Purify 90s).
Answer authoritatively, concisely, in clean Markdown with bolding and bullet points.
If the query is unrelated to MLBB or tactical gaming, reject it respectfully as domain-locked to the Land of Dawn.
${context?.blueHeroes ? `Blue Team: ${context.blueHeroes.join(', ')}` : ''}
${context?.redHeroes ? `Red Team: ${context.redHeroes.join(', ')}` : ''}`;

        const apiRes = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: `${systemPrompt}\n\nCommander Inquiry: ${query}` }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
          })
        });

        if (apiRes.ok) {
          const data = await apiRes.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return res.json({
              sender: "oracle",
              isRejected: false,
              text: replyText,
              tactical_tags: ["Google Gemini API", "Live Esports Intelligence"]
            });
          }
        }
      } catch (err) {
        console.warn(`[Server Gemini] Failed with model ${model}:`, err);
      }
    }
  }

  // 2. Offline / Local Heuristic Engine Fallback
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
    return res.json({
      sender: "oracle",
      isRejected: true,
      text: "The DawnOracle's celestial eye is locked strictly onto the tactical ether of the Land of Dawn. Inquiries regarding topics outside hero drafts, itemization matrices, emblem synergies, battle spell cooldowns, and lane wave mechanics cannot be deciphered. State your tactical query for the Land of Dawn.",
      tactical_tags: ["Domain-Locked Rejection"]
    });
  }

  if (cleanQuery.includes('fanny') && (cleanQuery.includes('counter') || cleanQuery.includes('deal with') || cleanQuery.includes('beat'))) {
    return res.json({
      sender: "oracle",
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
    });
  }

  if ((cleanQuery.includes('radiant') && cleanQuery.includes('athena')) || cleanQuery.includes('magic defense') || (cleanQuery.includes('change') && cleanQuery.includes('radiant'))) {
    return res.json({
      sender: "oracle",
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
    });
  }

  if (cleanQuery.includes('spell') || cleanQuery.includes('cooldown') || cleanQuery.includes('flicker') || cleanQuery.includes('purify') || cleanQuery.includes('retri')) {
    const tableData = {
      headers: ["Battle Spell", "Cooldown", "Primary Function", "Key Tactical Note"],
      rows: BATTLE_SPELLS.map(s => [s.name, `${s.cooldown}s`, s.best_roles.join(", "), s.tactical_use])
    };
    return res.json({
      sender: "oracle",
      isRejected: false,
      text: `### Land of Dawn: Comprehensive Battle Spell Cooldown Index

Tracking opponent battle spell cooldowns is the #1 differentiator between Mythic and Mythical Immortal players. When an enemy marksman blows Flicker, you have an exact **120-second window** to execute a guaranteed dive gank!`,
      table_data: tableData,
      tactical_tags: ["Battle Spells", "Cooldown Tracking", "Spell Timers"]
    });
  }

  if (cleanQuery.includes('wave') || cleanQuery.includes('freeze') || cleanQuery.includes('push') || cleanQuery.includes('crash')) {
    return res.json({
      sender: "oracle",
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
    });
  }

  if (cleanQuery.includes('roam') || cleanQuery.includes('rotation') || cleanQuery.includes('first') || cleanQuery.includes('minute')) {
    return res.json({
      sender: "oracle",
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
    });
  }

  res.json({
    sender: "oracle",
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
  });
});

if (fs.existsSync(distPath)) {
  app.get('*', (req: Request, res: Response, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`[DawnTactics AI] Backend API server active on http://0.0.0.0:${PORT}`);
});

