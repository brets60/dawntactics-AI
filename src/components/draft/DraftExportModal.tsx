import React, { useState } from 'react';
import { Hero, Lane, DraftMetrics } from '../../types/mlbb';
import { HEROES } from '../../data/heroes';
import { BATTLE_SPELLS } from '../../data/tacticalKnowledge';
import { Copy, Check, X, Shield, Swords, Sparkles, Download, Share2, Ban } from 'lucide-react';
import { soundManager } from '../../services/sound';

interface DraftExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  blueTeam: Record<Lane, string | null>;
  redTeam: Record<Lane, string | null>;
  bansBlue: (string | null)[];
  bansRed: (string | null)[];
  blueMetrics: DraftMetrics;
  redMetrics: DraftMetrics;
  blueSpells?: Record<Lane, string>;
  redSpells?: Record<Lane, string>;
}

const LANES: Lane[] = ['EXP', 'Jungle', 'Mid', 'Gold', 'Roam'];

export const DraftExportModal: React.FC<DraftExportModalProps> = ({
  isOpen,
  onClose,
  blueTeam,
  redTeam,
  bansBlue,
  bansRed,
  blueMetrics,
  redMetrics,
  blueSpells = {} as Record<Lane, string>,
  redSpells = {} as Record<Lane, string>,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getHeroName = (id: string | null) => {
    if (!id) return 'Unassigned';
    const hero = HEROES.find(h => h.id === id);
    return hero ? hero.name : id;
  };

  const getSpellName = (spellId?: string) => {
    if (!spellId) return 'Flicker';
    const spell = BATTLE_SPELLS.find(s => s.id === spellId);
    return spell ? spell.name : spellId;
  };

  const generateMarkdownSummary = () => {
    let text = `🏆 **DawnTactics AI — Competitive Match Intelligence Briefing**\n`;
    text += `*Generated for Mythic / Tournament 5v5 Draft*\n\n`;

    text += `### 🔵 BLUE TEAM (Ally) — Predicted Win Rate: ${blueMetrics.predicted_win_rate}%\n`;
    LANES.forEach(lane => {
      const heroId = blueTeam[lane];
      const spell = getSpellName(blueSpells[lane]);
      text += `- **${lane}**: ${getHeroName(heroId)} [Spell: ${spell}]\n`;
    });
    const validBlueBans = bansBlue.filter(Boolean).map(id => getHeroName(id));
    text += `*Phase 1 & 2 Bans*: ${validBlueBans.length > 0 ? validBlueBans.join(', ') : 'None'}\n\n`;

    text += `### 🔴 RED TEAM (Opponent) — Predicted Win Rate: ${redMetrics.predicted_win_rate}%\n`;
    LANES.forEach(lane => {
      const heroId = redTeam[lane];
      const spell = getSpellName(redSpells[lane]);
      text += `- **${lane}**: ${getHeroName(heroId)} [Spell: ${spell}]\n`;
    });
    const validRedBans = bansRed.filter(Boolean).map(id => getHeroName(id));
    text += `*Phase 1 & 2 Bans*: ${validRedBans.length > 0 ? validRedBans.join(', ') : 'None'}\n\n`;

    text += `### 📊 Match Composition Metrics:\n`;
    text += `- **Blue Damage Profile**: ${blueMetrics.physical_ratio}% Phys / ${blueMetrics.magic_ratio}% Magic / ${blueMetrics.true_ratio}% True\n`;
    text += `- **Red Damage Profile**: ${redMetrics.physical_ratio}% Phys / ${redMetrics.magic_ratio}% Magic / ${redMetrics.true_ratio}% True\n`;
    text += `- **CC Lockdown**: Blue ${blueMetrics.cc_score}/100 vs Red ${redMetrics.cc_score}/100\n`;
    text += `- **Frontline Durability**: Blue ${blueMetrics.durability_score}/100 vs Red ${redMetrics.durability_score}/100\n\n`;

    text += `### ⚔️ Tactical Strengths & Keys to Victory:\n`;
    blueMetrics.key_strengths.forEach(s => {
      text += `✔ ${s}\n`;
    });
    if (blueMetrics.vulnerabilities.length > 0) {
      text += `\n**Watchout / Vulnerabilities:**\n`;
      blueMetrics.vulnerabilities.forEach(v => {
        text += `⚠ ${v}\n`;
      });
    }

    return text;
  };

  const handleCopy = () => {
    soundManager.playGoldChime();
    navigator.clipboard.writeText(generateMarkdownSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-surface-elevated border border-surface-borderLight rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-surface-border flex items-center justify-between bg-surface-subtle">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
              <Share2 className="w-5 h-5 text-gold-400" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-100 font-['Cinzel',serif] tracking-wider">
                Esports Match Intelligence Briefing
              </h2>
              <p className="text-xs text-slate-400">
                Shareable 5v5 draft summary, win-rate breakdown, and tactical notes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-surface border border-transparent hover:border-surface-border"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Win Rate Header Banner */}
          <div className="bg-canvas border border-surface-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-bold text-lg text-blue-300">
                {blueMetrics.predicted_win_rate}%
              </div>
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Blue Team</span>
                <p className="text-sm font-bold text-slate-100">Ally Draft</p>
              </div>
            </div>

            <div className="text-center font-mono text-xs font-bold text-gold-400 uppercase tracking-widest">
              <span>Predicted Win Probability</span>
              <div className="w-48 h-2 rounded-full bg-slate-800 overflow-hidden flex mx-auto mt-1 border border-surface-border">
                <div style={{ width: `${blueMetrics.predicted_win_rate}%` }} className="bg-blue-500 h-full" />
                <div style={{ width: `${redMetrics.predicted_win_rate}%` }} className="bg-red-500 h-full" />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Red Team</span>
                <p className="text-sm font-bold text-slate-100">Opponent Draft</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center font-bold text-lg text-red-300">
                {redMetrics.predicted_win_rate}%
              </div>
            </div>
          </div>

          {/* 5v5 Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Blue Lineup */}
            <div className="bg-surface border border-blue-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-blue-500/20 pb-2">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-400" /> Blue Roster
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  CC: {blueMetrics.cc_score} | Dur: {blueMetrics.durability_score}
                </span>
              </div>
              <div className="space-y-1.5">
                {LANES.map((lane) => {
                  const heroId = blueTeam[lane];
                  const hero = heroId ? HEROES.find(h => h.id === heroId) : null;
                  const spell = getSpellName(blueSpells[lane]);
                  return (
                    <div key={lane} className="flex items-center justify-between text-xs p-1.5 rounded bg-canvas/60">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[10px] text-slate-400 uppercase w-12">{lane}</span>
                        <span className="font-semibold text-slate-100">{hero ? hero.name : 'Empty'}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gold-400 bg-gold-500/10 px-1.5 py-0.5 rounded border border-gold-500/20">
                        {spell}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Bans */}
              <div className="pt-2 border-t border-surface-border text-[11px] text-slate-400 flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-bold text-slate-300">Bans:</span>
                <span className="truncate">
                  {bansBlue.filter(Boolean).map(id => getHeroName(id)).join(', ') || 'None'}
                </span>
              </div>
            </div>

            {/* Red Lineup */}
            <div className="bg-surface border border-red-500/30 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-red-400" /> Red Roster
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  CC: {redMetrics.cc_score} | Dur: {redMetrics.durability_score}
                </span>
              </div>
              <div className="space-y-1.5">
                {LANES.map((lane) => {
                  const heroId = redTeam[lane];
                  const hero = heroId ? HEROES.find(h => h.id === heroId) : null;
                  const spell = getSpellName(redSpells[lane]);
                  return (
                    <div key={lane} className="flex items-center justify-between text-xs p-1.5 rounded bg-canvas/60">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[10px] text-slate-400 uppercase w-12">{lane}</span>
                        <span className="font-semibold text-slate-100">{hero ? hero.name : 'Empty'}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gold-400 bg-gold-500/10 px-1.5 py-0.5 rounded border border-gold-500/20">
                        {spell}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Bans */}
              <div className="pt-2 border-t border-surface-border text-[11px] text-slate-400 flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span className="font-bold text-slate-300">Bans:</span>
                <span className="truncate">
                  {bansRed.filter(Boolean).map(id => getHeroName(id)).join(', ') || 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Key Matchup Takeaways */}
          <div className="bg-canvas/60 border border-surface-border rounded-xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Strategic Execution Summary
            </h4>
            <div className="space-y-1 text-slate-300 leading-relaxed">
              {blueMetrics.key_strengths.map((str, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✔</span>
                  <span>{str}</span>
                </div>
              ))}
              {blueMetrics.vulnerabilities.map((vuln, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">⚠</span>
                  <span>{vuln}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 border-t border-surface-border bg-surface-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Copy briefing text to share on Discord, team chats, or coaching analysis.
          </span>

          <button
            onClick={handleCopy}
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-gold-500 hover:bg-gold-400 text-slate-950 shadow-mythic-glow'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Tactical Briefing'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
