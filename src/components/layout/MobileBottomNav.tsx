import React from 'react';
import { Swords, ShieldAlert, Sparkles, MessageSquareCode } from 'lucide-react';
import { ActiveModule } from './Navigation';
import { soundManager } from '../../services/sound';

interface MobileBottomNavProps {
  activeModule: ActiveModule;
  onChangeModule: (module: ActiveModule) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeModule,
  onChangeModule,
}) => {
  const tabs = [
    {
      id: 'draft' as ActiveModule,
      label: 'Draft',
      icon: Swords,
    },
    {
      id: 'itemization' as ActiveModule,
      label: 'Items',
      icon: ShieldAlert,
    },
    {
      id: 'emblems' as ActiveModule,
      label: 'Emblems',
      icon: Sparkles,
    },
    {
      id: 'oracle' as ActiveModule,
      label: 'Oracle',
      icon: MessageSquareCode,
    },
  ];

  const handleTabClick = (tabId: ActiveModule) => {
    soundManager.playClick();
    onChangeModule(tabId);
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-canvas/95 backdrop-blur-xl border-t border-surface-border px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_25px_rgba(0,0,0,0.7)] select-none"
      aria-label="Mobile Navigation"
    >
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeModule === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-gold-300 bg-surface-elevated border border-gold-500/40 shadow-mythic-glow'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              {/* Active Golden Neon Indicator Dot */}
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_8px_#F59E0B]" />
              )}

              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-gold-400' : 'text-slate-400'
                }`}
              />

              <span
                className={`text-[10px] tracking-wider mt-1 truncate ${
                  isActive ? 'font-bold text-white' : 'font-medium text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
