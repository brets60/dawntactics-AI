import React, { useState, useMemo } from 'react';
import { HEROES } from '../../data/heroes';
import { Clock, Shield, Swords, Sparkles, AlertTriangle, Trophy, Play, Pause, RotateCcw } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface MatchTimelineScrubberProps {
  blueTeam: Record<string, string | null>;
  redTeam: Record<string, string | null>;
}

interface Milestone {
  timeSeconds: number;
  timeDisplay: string;
  name: string;
  category: 'objective' | 'map_change' | 'boss';
  description: string;
  blueAdvice: string;
  redAdvice: string;
}

const MILESTONES: Milestone[] = [
  {
    timeSeconds: 30,
    timeDisplay: '0:30',
    name: 'Buffs & Lithowanderer Spawn',
    category: 'objective',
    description: 'Buff monsters spawn; Lithowanderer emerges in river providing early vision and HP mana regeneration.',
    blueAdvice: 'Roamer should scout enemy jungle to reveal opposing jungler pathing and contest Lithowanderer.',
    redAdvice: 'Secure safe buff start. If enemy roamer invades, mid laner must collapse immediately.'
  },
  {
    timeSeconds: 120,
    timeDisplay: '2:00',
    name: 'First Turtle Spawn',
    category: 'boss',
    description: 'First Turtle emerges. Awards massive team gold, EXP, and personal shield to the killer.',
    blueAdvice: 'EXP laner must reach level 4 and rotate to Turtle pit by 1:50. Secure river bush control.',
    redAdvice: 'Jungler must preserve Retribution. Zone out enemy jungler or trade opposite outer turret if contest is risky.'
  },
  {
    timeSeconds: 300,
    timeDisplay: '5:00',
    name: 'Turret Gold Shield Falls',
    category: 'map_change',
    description: 'Gold shield on outer turrets disappears. Turret damage reduction drops; roaming rotations unleash.',
    blueAdvice: 'Group as 4 to crash lane and crack first outer turret for map opening and deep jungle invades.',
    redAdvice: 'Defend Tier 1 towers cautiously. Do not overextend past river without vision.'
  },
  {
    timeSeconds: 480,
    timeDisplay: '8:00',
    name: 'First Lord Emerges',
    category: 'boss',
    description: 'Sanctuary Lord replaces Turtle. Marches down the weakest enemy lane with siege waves.',
    blueAdvice: 'Clear side lanes before starting Lord dance. Force enemy to defend waves or lose 5v5 at pit.',
    redAdvice: 'Never check Lord bush blindly. Check with skill shots; bait enemy out of the narrow pit.'
  },
  {
    timeSeconds: 720,
    timeDisplay: '12:00',
    name: 'Evolved Lord (Charges)',
    category: 'boss',
    description: 'Lord evolves into Enhanced charging form. Directly rams the first enemy turret encountered, dealing devastating true damage.',
    blueAdvice: 'Synchronize 3-lane minion wave push with Lord spawn. Backline marksman must focus inhibitor turrets.',
    redAdvice: 'Burst down minion waves before Lord enters turret range. Frontliners must body-block Lord charge.'
  },
  {
    timeSeconds: 1080,
    timeDisplay: '18:00',
    name: 'Twilight Lord (Divine Form)',
    category: 'boss',
    description: 'Lord gains Divine Sanctuary armor and 30k+ HP. Releases devastating shockwaves during fight. 60-second death timers mean 1 team wipe ends the game.',
    blueAdvice: 'Absolute 5-man cohesion required. Keep squishies safe behind tank. One pickoff seals the victory.',
    redAdvice: 'Buy Immortality and Winter Crown. Save heavy CC for enemy marksman and jungler.'
  }
];

export const MatchTimelineScrubber: React.FC<MatchTimelineScrubberProps> = ({
  blueTeam,
  redTeam
}) => {
  const [currentSeconds, setCurrentSeconds] = useState<number>(120); // default 2:00
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Compute team power scores across 20 minutes (0 to 1200 seconds, sampled every 60s)
  const powerCurve = useMemo(() => {
    const blueHeroes = Object.values(blueTeam)
      .map(id => HEROES.find(h => h.id === id))
      .filter(Boolean);
    const redHeroes = Object.values(redTeam)
      .map(id => HEROES.find(h => h.id === id))
      .filter(Boolean);

    const points: { minute: number; bluePower: number; redPower: number; diff: number }[] = [];

    for (let minute = 0; minute <= 20; minute++) {
      let bScore = 50;
      let rScore = 50;

      if (blueHeroes.length > 0) {
        const total = blueHeroes.reduce((acc, h) => {
          if (!h) return acc;
          if (minute <= 5) {
            // Early phase
            return acc + (h.early_game * 1.5 + h.mid_game * 0.5);
          } else if (minute <= 12) {
            // Mid phase
            return acc + (h.early_game * 0.5 + h.mid_game * 1.5 + h.late_game * 0.5);
          } else {
            // Late phase
            return acc + (h.mid_game * 0.5 + h.late_game * 2.0);
          }
        }, 0);
        bScore = Math.round(total / blueHeroes.length * 5);
      }

      if (redHeroes.length > 0) {
        const total = redHeroes.reduce((acc, h) => {
          if (!h) return acc;
          if (minute <= 5) {
            return acc + (h.early_game * 1.5 + h.mid_game * 0.5);
          } else if (minute <= 12) {
            return acc + (h.early_game * 0.5 + h.mid_game * 1.5 + h.late_game * 0.5);
          } else {
            return acc + (h.mid_game * 0.5 + h.late_game * 2.0);
          }
        }, 0);
        rScore = Math.round(total / redHeroes.length * 5);
      }

      // Normalize into percentages (sum = 100)
      const sum = Math.max(1, bScore + rScore);
      const bPct = Math.round((bScore / sum) * 100);
      const rPct = 100 - bPct;

      points.push({
        minute,
        bluePower: bPct,
        redPower: rPct,
        diff: bPct - rPct,
      });
    }

    return points;
  }, [blueTeam, redTeam]);

  // Current minute and interpolated power
  const currentMinute = Math.floor(currentSeconds / 60);
  const currentMinuteFraction = currentSeconds / 60;
  const activePoint = powerCurve[Math.min(20, currentMinute)] || { bluePower: 50, redPower: 50, diff: 0 };

  // Nearest or active milestone
  const currentMilestone = useMemo(() => {
    let closest = MILESTONES[0];
    let minDiff = Infinity;
    for (const m of MILESTONES) {
      const diff = Math.abs(m.timeSeconds - currentSeconds);
      if (diff < minDiff) {
        minDiff = diff;
        closest = m;
      }
    }
    return closest;
  }, [currentSeconds]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Playback timer tick effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds(prev => {
          if (prev >= 1200) {
            setIsPlaying(false);
            return 1200;
          }
          return prev + 5;
        });
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <div className="space-y-5">
      {/* Top Controls Bar */}
      <div className="bg-canvas/60 p-4 rounded-xl border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-mono font-black text-slate-100">
                {formatTime(currentSeconds)}
              </span>
              <span className="text-xs font-semibold text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-500/30">
                {currentSeconds < 300 ? 'Early Game' : currentSeconds < 720 ? 'Mid Game' : 'Late Game'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Drag scrubber or click milestones to inspect tactical spike shifts.
            </p>
          </div>
        </div>

        {/* Play / Pause / Reset Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              soundManager.playClick();
              setIsPlaying(!isPlaying);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-gold-500/20 text-slate-200 hover:text-gold-400 border border-surface-borderLight text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isPlaying ? 'Pause' : 'Simulate Match'}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setIsPlaying(false);
              setCurrentSeconds(0);
            }}
            className="p-1.5 rounded-lg bg-surface-elevated text-slate-400 hover:text-slate-200 border border-surface-borderLight transition-all"
            title="Reset to 0:00"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Scrubber Slider */}
      <div className="bg-surface p-4 rounded-xl border border-surface-border space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>00:00 (Buffs)</span>
          <span className="text-gold-400 font-bold">Live Scrubber: {formatTime(currentSeconds)}</span>
          <span>20:00 (Divine Lord)</span>
        </div>

        <input
          type="range"
          min={0}
          max={1200}
          step={5}
          value={currentSeconds}
          onChange={(e) => {
            setCurrentSeconds(Number(e.target.value));
          }}
          className="w-full h-2.5 bg-canvas rounded-lg appearance-none cursor-pointer accent-gold-500 focus:outline-none border border-surface-border"
        />

        {/* Quick Milestone Shortcut Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
          {MILESTONES.map((m) => {
            const isSelected = Math.abs(m.timeSeconds - currentSeconds) <= 30;
            return (
              <button
                key={m.name}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentSeconds(m.timeSeconds);
                }}
                className={`px-2 py-1.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-gold-500/20 border-gold-500/70 shadow-mythic-glow'
                    : 'bg-canvas/60 border-surface-border hover:border-slate-500 text-slate-400'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-gold-400">{m.timeDisplay}</div>
                <div className="text-[11px] font-semibold text-slate-200 truncate">{m.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Power Spike Relative Strength SVG Chart */}
      <div className="bg-surface p-4 rounded-xl border border-surface-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Swords className="w-4 h-4 text-gold-400" />
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-['Cinzel',serif]">
              Team Power Spike Dynamics (0:00 - 20:00)
            </h4>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-blue-300 font-bold">Blue Power: {activePoint.bluePower}%</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-red-300 font-bold">Red Power: {activePoint.redPower}%</span>
            </div>
          </div>
        </div>

        {/* SVG Curve Display */}
        <div className="relative h-32 w-full bg-canvas/90 rounded-lg p-2 border border-surface-border overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
            {/* Center 50% equilibrium line */}
            <line x1="0" y1="50" x2="1000" y2="50" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />

            {/* Blue fill under curve */}
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="redGradient" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Blue line path */}
            <path
              d={`M 0,${100 - powerCurve[0].bluePower} ${powerCurve
                .map((p, i) => `L ${(i / 20) * 1000},${100 - p.bluePower}`)
                .join(' ')}`}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2.5"
            />

            {/* Red line path */}
            <path
              d={`M 0,${100 - powerCurve[0].redPower} ${powerCurve
                .map((p, i) => `L ${(i / 20) * 1000},${100 - p.redPower}`)
                .join(' ')}`}
              fill="none"
              stroke="#EF4444"
              strokeWidth="2.5"
            />

            {/* Current Minute Vertical Line Indicator */}
            <line
              x1={(currentMinuteFraction / 20) * 1000}
              y1="0"
              x2={(currentMinuteFraction / 20) * 1000}
              y2="100"
              stroke="#F59E0B"
              strokeWidth="2"
            />

            {/* Current Minute Node */}
            <circle
              cx={(currentMinuteFraction / 20) * 1000}
              cy={100 - activePoint.bluePower}
              r="4.5"
              fill="#3B82F6"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            <circle
              cx={(currentMinuteFraction / 20) * 1000}
              cy={100 - activePoint.redPower}
              r="4.5"
              fill="#EF4444"
              stroke="#F59E0B"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Tactical Objective & Lane Priority Briefing for Selected Minute */}
      <div className="bg-surface p-4 rounded-xl border border-surface-border space-y-3">
        <div className="flex items-center justify-between border-b border-surface-border pb-2.5">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-gold-400" />
            <h4 className="text-sm font-bold text-slate-100 font-['Cinzel',serif]">
              {currentMilestone.name} ({currentMilestone.timeDisplay})
            </h4>
          </div>
          <span className="text-xs font-mono font-bold text-gold-400">
            {activePoint.diff > 0
              ? `Blue Team +${activePoint.diff}% Advantage`
              : activePoint.diff < 0
              ? `Red Team +${Math.abs(activePoint.diff)}% Advantage`
              : 'Equal Power Equilibrium'}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {currentMilestone.description}
        </p>

        {/* Dual Side Esports Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {/* Blue Side Action */}
          <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/30 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-300">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Blue Team Directive:</span>
            </div>
            <p className="text-xs text-slate-300">{currentMilestone.blueAdvice}</p>
          </div>

          {/* Red Side Action */}
          <div className="p-3 rounded-lg bg-red-950/20 border border-red-500/30 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-red-300">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Red Team Directive:</span>
            </div>
            <p className="text-xs text-slate-300">{currentMilestone.redAdvice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
