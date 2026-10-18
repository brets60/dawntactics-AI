import React from 'react';
import { Swords, ShieldAlert, Sparkles, MessageSquareCode } from 'lucide-react';
import { soundManager } from '../../services/sound';

export type ActiveModule = 'draft' | 'itemization' | 'emblems' | 'oracle';

interface NavigationProps {
  activeModule: ActiveModule;
  onChangeModule: (module: ActiveModule) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeModule, onChangeModule }) => {
  const tabs = [
    {
      id: 'draft' as ActiveModule,
      name: 'Live Draft & Counters',
      shortName: 'Draft Board',
      icon: Swords,
      badge: '5v5 Intel',
      accentColor: 'text-amber-400',
    },
    {
      id: 'itemization' as ActiveModule,
      name: 'Reactive Item Matrix',
      shortName: 'Equipment',
      icon: ShieldAlert,
      badge: 'Swapping Sim',
      accentColor: 'text-emerald-400',
    },
    {
      id: 'emblems' as ActiveModule,
      name: 'Modular Emblem Engine',
      shortName: 'Emblems',
      icon: Sparkles,
      badge: '3-Tier Matrix',
      accentColor: 'text-purple-400',
    },
    {
      id: 'oracle' as ActiveModule,
      name: 'Ask DawnOracle AI',
      shortName: 'Oracle Chat',
      icon: MessageSquareCode,
      badge: 'Domain-Locked',
      accentColor: 'text-cyan-400',
    },
  ];

  return (
    <nav className="border-b border-surface-border bg-surface-subtle/50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-3 overflow-x-auto py-2.5 no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                onChangeModule(tab.id);
              }}
              className={`flex items-center space-x-2.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap relative ${
                isActive
                  ? 'bg-surface-elevated text-gold-300 border border-gold-500/50 shadow-mythic-glow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.accentColor : 'text-slate-500'}`} />
              <span className="hidden md:inline">{tab.name}</span>
              <span className="md:hidden">{tab.shortName}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold ${
                  isActive
                    ? 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                    : 'bg-surface-border text-slate-400'
                }`}
              >
                {tab.badge}
              </span>

              {isActive && (
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-gold-500 to-amber-300 rounded-t-full shadow-mythic-gold" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
