import { 
  BarChart3, 
  Map as MapIcon, 
  Shield, 
  Award, 
  Settings, 
  Database,
  Globe,
  Plus,
  Search
} from 'lucide-react';
import { View } from '../App';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

export default function Sidebar({ currentView, setView }: SidebarProps) {
  const menuItems = [
    { label: 'Intelligence', icon: BarChart3, value: 'dashboard' as View },
    { label: 'Civic Routes', icon: MapIcon, value: 'dashboard' as View },
    { label: 'Protocols', icon: Database, value: 'stats' as View },
    { label: 'Reputation', icon: Award, value: 'dashboard' as View },
    { label: 'Global Rules', icon: Globe, value: 'dashboard' as View },
  ];

  return (
    <div className="flex flex-col h-full bg-brand-aside">
      <div className="p-4 border-b border-brand-line bg-slate-900/40">
        <div className="flex items-center justify-between mb-4">
          <h2 className="institutional-header">Operational View</h2>
          <span className="text-[9px] font-mono bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">Live_Node: Alpha</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-secondary" size={14} />
          <input 
            type="text" 
            placeholder="Filter protocol..." 
            className="w-full bg-slate-800/50 border border-slate-700 rounded px-3 py-1.5 pl-9 text-xs focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={`${item.label}-${item.value}`}
            onClick={() => setView(item.value)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs transition-all group ${
              currentView === item.value 
                ? 'bg-brand-accent/10 text-brand-accent font-bold' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <item.icon size={16} className={currentView === item.value ? 'text-brand-accent' : 'text-slate-500 group-hover:text-slate-300 transition-colors'} />
            <span className="uppercase tracking-widest">{item.label}</span>
            {currentView === item.value && (
              <div className="ml-auto w-1 h-3 bg-brand-accent rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 bg-slate-950/30 border-t border-brand-line">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-brand-accent/20 rounded flex items-center justify-center text-brand-accent">
            <Shield size={16} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-brand-ink-bright leading-none mb-1 uppercase tracking-tight">Active_Guard</div>
            <div className="text-[9px] text-brand-accent mono-value uppercase">Protocol_Secured</div>
          </div>
        </div>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 text-xs text-slate-500 hover:text-slate-300 transition-all uppercase tracking-widest font-bold">
          <Settings size={14} />
          Settings_Node
        </button>
      </div>
    </div>
  );
}
