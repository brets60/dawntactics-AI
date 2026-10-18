import React, { useState, useRef, useEffect } from 'react';
import { OracleChatMessage } from '../../types/mlbb';
import { askDawnOracle } from '../../services/api';
import { CooldownReference } from './CooldownReference';
import { Sparkles, Send, Bot, User, AlertOctagon, BookOpen, Clock, Zap, HelpCircle } from 'lucide-react';
import { soundManager } from '../../services/sound';

import { GeminiService } from '../../services/gemini';
import { GeminiKeyModal } from '../layout/GeminiKeyModal';
import { Key } from 'lucide-react';

export const DawnOracleChat: React.FC = () => {
  const [messages, setMessages] = useState<OracleChatMessage[]>([
    {
      id: 'welcome',
      sender: 'oracle',
      text: `### Welcome to the Celestial DawnOracle

I am your domain-locked strategic guardian for the **Land of Dawn**. My cognition is dedicated strictly to:
- **Hero Counters & Synergies** (e.g. Neutralizing Fanny, shutdown picks against Estes).
- **Reactive Itemization** (Radiant Armor vs. Athena's Shield, Malefic Roar scaling).
- **Lane Wave Management** (Wave freezes, slow pushes, fast crashes).
- **Macro Rotations & Objective Timers** (Turtle/Lord dances, 3-minute roamer routing).
- **Battle Spell Cooldown Tracking** (Flicker, Purify, Retribution windows).

*Inquiries regarding subjects outside the Land of Dawn will be rejected.* Ask your tactical question below or select an instant query!`,
      timestamp: 'Just now',
      tactical_tags: ['Land of Dawn', 'Strategic Engine']
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSpellReference, setShowSpellReference] = useState(false);
  const [geminiModalOpen, setGeminiModalOpen] = useState(false);
  const [hasGeminiKey, setHasGeminiKey] = useState(GeminiService.hasKey());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptChips = [
    "How to deal with a snowballing Fanny?",
    "Radiant Armor vs. Athena's Shield: Which to buy against Chang'e?",
    "EXP Lane Wave Freeze against high sustain fighters",
    "Full Battle Spell Cooldown Reference",
    "Optimal Roamer rotation for the first 3 minutes",
    "How do I bake a chocolate cake?", // Non-MLBB test chip!
  ];

  const handleSend = async (queryText: string) => {
    const text = queryText.trim();
    if (!text || isTyping) return;

    soundManager.playClick();
    const userMsg: OracleChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const oracleReply = await askDawnOracle(text);
      if (oracleReply.isRejected) {
        soundManager.playClick();
      } else {
        soundManager.playLockIn();
      }
      setMessages((prev) => [...prev, oracleReply]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown renderer for headers, bold, and bullets
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-base font-bold text-gold-300 font-['Cinzel',serif] mt-2 mb-1">
                {line.replace('### ', '')}
              </h3>
            );
          }
          if (line.startsWith('**') && line.endsWith('**')) {
            return (
              <p key={idx} className="font-bold text-slate-100">
                {line.replace(/\*\*/g, '')}
              </p>
            );
          }
          if (line.startsWith('- ') || line.startsWith('* ')) {
            return (
              <div key={idx} className="flex items-start space-x-2 pl-2">
                <span className="text-gold-400 font-bold shrink-0">•</span>
                <span className="text-slate-200">
                  {line.replace(/^[-*]\s+/, '').split('**').map((chunk, i) =>
                    i % 2 === 1 ? <strong key={i} className="text-gold-300">{chunk}</strong> : chunk
                  )}
                </span>
              </div>
            );
          }
          if (line.trim().startsWith('|') && line.includes('|')) {
            return (
              <div key={idx} className="font-mono text-[11px] text-slate-300 bg-surface/60 px-2 py-0.5 rounded overflow-x-auto">
                {line}
              </div>
            );
          }
          if (line.trim() === '') {
            return <div key={idx} className="h-1.5" />;
          }
          return (
            <p key={idx} className="text-slate-200">
              {line.split('**').map((chunk, i) =>
                i % 2 === 1 ? <strong key={i} className="text-gold-300">{chunk}</strong> : chunk
              )}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Cooldown Reference Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-border pb-3 gap-2">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 font-['Rajdhani',sans-serif]">
                Ask DawnOracle Tactical Assistant
              </h3>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setGeminiModalOpen(true);
                }}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                  hasGeminiKey
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/30'
                    : 'bg-surface-elevated text-slate-400 border-surface-border hover:border-gold-500/40'
                }`}
                title="Configure Google Gemini API"
              >
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                <span>{hasGeminiKey ? 'Gemini 2.5 Active' : 'Offline Matrix (Tap to enable Gemini)'}</span>
              </button>
            </div>
            <span className="text-[11px] text-slate-400">Strictly Domain-Locked to Mobile Legends Strategy</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              soundManager.playClick();
              setGeminiModalOpen(true);
            }}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-surface-elevated hover:bg-surface text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 transition-all flex items-center gap-1.5"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gemini Key</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setShowSpellReference(!showSpellReference);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              showSpellReference
                ? 'bg-gold-500 text-slate-950 border-gold-400 font-bold'
                : 'bg-surface-elevated hover:bg-surface text-slate-300 border-surface-border hover:border-gold-500/40'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{showSpellReference ? 'Hide Spells' : 'Spell Timers'}</span>
          </button>
        </div>
      </div>

      {/* Spell Cooldown Matrix Overlay */}
      {showSpellReference && <CooldownReference />}

      {/* Gemini Settings Modal */}
      <GeminiKeyModal
        isOpen={geminiModalOpen}
        onClose={() => setGeminiModalOpen(false)}
        onKeyUpdated={() => setHasGeminiKey(GeminiService.hasKey())}
      />

      {/* Chat Messages Container */}
      <div className="bg-surface border border-surface-border rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col h-[520px] overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((msg) => {
            const isOracle = msg.sender === 'oracle';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isOracle ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    isOracle
                      ? msg.isRejected
                        ? 'bg-red-950/40 border-red-500/50 text-red-400'
                        : 'bg-gradient-to-br from-amber-500 to-gold-600 border-gold-300/60 text-slate-950 font-bold shadow-mythic-gold'
                      : 'bg-blue-600/30 border-blue-400/50 text-blue-200'
                  }`}
                >
                  {isOracle ? (
                    msg.isRejected ? <AlertOctagon className="w-4 h-4" /> : <Sparkles className="w-4 h-4 fill-slate-950" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 border transition-all ${
                    isOracle
                      ? msg.isRejected
                        ? 'bg-red-950/20 border-red-500/40 shadow-sm'
                        : 'bg-surface-elevated border-surface-borderLight shadow-md'
                      : 'bg-blue-600/20 border-blue-500/40 text-blue-100 shadow-sm'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        isOracle
                          ? msg.isRejected
                            ? 'text-red-400'
                            : 'text-gold-400 font-["Cinzel",serif]'
                          : 'text-blue-300'
                      }`}
                    >
                      {isOracle ? (msg.isRejected ? 'DawnOracle [Domain Rejection]' : 'DawnOracle AI') : 'Commander'}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-2">{msg.timestamp}</span>
                  </div>

                  {/* Body Content */}
                  <div>{renderMarkdown(msg.text)}</div>

                  {/* Structured Table if present */}
                  {msg.table_data && (
                    <div className="mt-3 border border-surface-border rounded-xl overflow-hidden">
                      <table className="w-full text-[11px] text-left">
                        <thead className="bg-surface text-gold-400 border-b border-surface-border font-bold">
                          <tr>
                            {msg.table_data.headers.map((h, i) => (
                              <th key={i} className="p-2">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-border bg-surface-elevated/70">
                          {msg.table_data.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-surface">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 text-slate-300">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Tactical Tags */}
                  {msg.tactical_tags && (
                    <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-surface-border/50">
                      {msg.tactical_tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-surface border border-surface-border text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center space-x-3 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-surface-elevated border border-surface-borderLight rounded-xl px-4 py-2 text-xs text-gold-300">
                DawnOracle is consulting the celestial ether of the Land of Dawn...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Inquiry Prompt Chips */}
        <div className="py-2.5 border-t border-surface-border flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
            Quick Queries:
          </span>
          {promptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-surface text-slate-300 hover:text-gold-300 border border-surface-border hover:border-gold-500/40 whitespace-nowrap transition-colors shrink-0 shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputQuery);
          }}
          className="pt-2 flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Ask about MLBB counters, spells, wave management, item builds..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 bg-canvas border border-surface-border focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="px-4 py-2.5 bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs rounded-xl shadow-mythic-gold transition-all flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5 fill-slate-950" />
            <span>Inquire</span>
          </button>
        </form>
      </div>
    </div>
  );
};
