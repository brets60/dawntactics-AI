import { HEROES } from '../data/heroes';
import { Hero, DraftMetrics, CounterRecommendation, Lane } from '../types/mlbb';

export function evaluateDraftLocally(
  blueTeam: Record<Lane, string | null>,
  redTeam: Record<Lane, string | null>
): { blue: DraftMetrics; red: DraftMetrics } {
  const getHeroes = (team: Record<Lane, string | null>): Hero[] => {
    return Object.values(team)
      .filter((id): id is string => Boolean(id))
      .map(id => HEROES.find(h => h.id === id))
      .filter((h): h is Hero => Boolean(h));
  };

  const blueHeroes = getHeroes(blueTeam);
  const redHeroes = getHeroes(redTeam);

  const calculate = (heroes: Hero[], opponents: Hero[]): Omit<DraftMetrics, 'predicted_win_rate'> => {
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
        key_strengths: ["Draft in progress..."],
        vulnerabilities: ["Assign heroes to slots"]
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

    if (ccScore >= 75) strengths.push("Devastating CC chain lockdown; high pickoff & teamfight control.");
    else if (ccScore < 45) vulnerabilities.push("Low crowd control; vulnerable to high-mobility dive assassins.");

    if (durabilityScore >= 70) strengths.push("Imposing frontline sponge with high survivability and peeling.");
    else if (durabilityScore < 45) vulnerabilities.push("Squishy draft; vulnerable to dive burst and lack of objective frontline.");

    if (physRatio >= 80) vulnerabilities.push("Excessive Physical damage; easily countered by Blade Armor & Antique Cuirass.");
    if (magicRatio >= 75) vulnerabilities.push("Excessive Magic damage; heavily negated by stacked Radiant Armor & Athena's Shield.");

    if (earlyCurve >= 75) strengths.push("Explosive early-game invade & first Turtle priority.");
    if (lateCurve >= 80) strengths.push("Exceptional late-game teamfight scaling with hypercarry DPS.");
    if (lateCurve < 55 && earlyCurve >= 75) vulnerabilities.push("Falls off severely past 14 minutes; must close before Enhanced Lord.");

    // Check counters against opponent
    opponents.forEach(enemy => {
      heroes.forEach(ally => {
        if (ally.counters_to.some(target => target.toLowerCase().includes(enemy.name.toLowerCase()))) {
          // advantage
        }
      });
    });

    return {
      physical_ratio: physRatio,
      magic_ratio: magicRatio,
      true_ratio: trueRatio,
      cc_score: ccScore,
      early_curve: earlyCurve,
      mid_curve: midCurve,
      late_curve: lateCurve,
      durability_score: durabilityScore,
      key_strengths: strengths.length > 0 ? strengths : ["Balanced competitive profile"],
      vulnerabilities: vulnerabilities.length > 0 ? vulnerabilities : ["No fatal composition vulnerabilities"]
    };
  };

  const blueBase = calculate(blueHeroes, redHeroes);
  const redBase = calculate(redHeroes, blueHeroes);

  let delta = 0;
  delta += (blueBase.cc_score - redBase.cc_score) * 0.15;
  delta += (blueBase.durability_score - redBase.durability_score) * 0.12;
  
  if (blueBase.physical_ratio > 85 || blueBase.magic_ratio > 80) delta -= 6;
  if (redBase.physical_ratio > 85 || redBase.magic_ratio > 80) delta += 6;

  let blueCounterPoints = 0;
  let redCounterPoints = 0;
  redHeroes.forEach(redH => {
    blueHeroes.forEach(blueH => {
      if (redH.hard_counters.some(c => c.toLowerCase().includes(blueH.name.toLowerCase()))) blueCounterPoints += 3;
    });
  });
  blueHeroes.forEach(blueH => {
    redHeroes.forEach(redH => {
      if (blueH.hard_counters.some(c => c.toLowerCase().includes(redH.name.toLowerCase()))) redCounterPoints += 3;
    });
  });

  delta += (blueCounterPoints - redCounterPoints);

  const predictedWinRate = Math.min(88, Math.max(12, Math.round(50 + delta)));

  return {
    blue: { ...blueBase, predicted_win_rate: predictedWinRate },
    red: { ...redBase, predicted_win_rate: 100 - predictedWinRate }
  };
}

export function getCounterRecommendations(enemyHeroId: string): CounterRecommendation | null {
  const enemyHero = HEROES.find(h => h.id === enemyHeroId);
  if (!enemyHero) return null;

  // Find hard counters
  const hardCounters = HEROES.filter(h => 
    enemyHero.hard_counters.some(counterName => h.name.toLowerCase().includes(counterName.toLowerCase())) ||
    h.counters_to.some(target => target.toLowerCase().includes(enemyHero.name.toLowerCase()))
  ).map(hero => {
    let rationale = `Directly counters ${enemyHero.name}'s kit.`;
    if (enemyHero.id === 'fanny' && hero.id === 'khufra') rationale = "Bouncing Ball interrupts cable mobility and grounds Fanny instantly.";
    if (enemyHero.id === 'estes' && hero.id === 'baxia') rationale = "Innate 50% Life Drain completely negates Estes Moonlight Immersion.";
    if (enemyHero.id === 'change' && hero.id === 'lolita') rationale = "Guardian's Bulwark reflects all Meteor Shower bullets back to Chang'e.";
    if (enemyHero.id === 'claude' && hero.id === 'belerick') rationale = "Deadly Thorns reflects Blazing Duet back at Claude, killing him in his own ult.";
    if (enemyHero.id === 'ruby' && hero.id === 'phoveus') rationale = "Every Ruby jump triggers Phoveus ultimate smash reset.";
    return {
      hero,
      rationale,
      lane_matchup: hero.primary_lane === enemyHero.primary_lane ? "Direct Lane Opponent" : `Roam/Cross-lane Counter (${hero.primary_lane})`
    };
  });

  // Find synergistic partner picks for team playing with this hero
  const synergies = HEROES.filter(h => 
    enemyHero.synergies?.some(syn => h.name.toLowerCase().includes(syn.toLowerCase()))
  ).map(hero => ({
    hero,
    rationale: `Creates strong combo synergy alongside ${enemyHero.name} (e.g. AOE wombo or protection).`
  }));

  // Ban recommendations against this hero or complementary threats
  const banRecommendations = HEROES.filter(h =>
    h.id !== enemyHero.id &&
    (enemyHero.synergies?.some(s => h.name.toLowerCase().includes(s.toLowerCase())) ||
     h.mobility_tier === 'S+' ||
     h.early_game >= 9)
  ).slice(0, 3).map(hero => {
    const urgency: 'Critical' | 'High' | 'Medium' = (hero.id === 'fanny' || hero.id === 'diggie' || hero.id === 'ling') ? 'Critical' : 'High';
    return {
      hero,
      urgency,
      reason: `Denies terrifying synergy pair with ${enemyHero.name} or limits uncounterable mobility.`
    };
  });

  return {
    enemy_hero: enemyHero,
    hard_counters: hardCounters.slice(0, 5),
    synergy_partners: synergies.slice(0, 4),
    ban_recommendations: banRecommendations
  };
}
