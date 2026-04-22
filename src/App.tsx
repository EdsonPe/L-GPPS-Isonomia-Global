/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Map as MapIcon, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  ChevronRight,
  Database,
  Lock,
  Globe,
  BarChart3,
  Award,
  BookOpen
} from 'lucide-react';

// Components
import Sidebar from './components/Sidebar';
import IncidentList from './components/IncidentList';
import IncidentDetails from './components/IncidentDetails';
import ReportForm from './components/ReportForm';
import StatsOverview from './components/StatsOverview';

export type View = 'dashboard' | 'report' | 'details' | 'stats' | 'reputation';

export interface Incident {
  id: string;
  location: { lat: number; lng: number; address: string };
  category: string;
  subcategory: string;
  urgency: 'Crítica' | 'Alta' | 'Média' | 'Baixa';
  status: string;
  evidenceHash: string;
  timestamp: string;
  governance?: {
    legalBasis: string;
    insight: string;
    impactLevel?: string;
  };
  reputationScore: number;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await fetch('/api/incidents');
      const data = await res.json();
      setIncidents(data);
    } catch (err) {
      console.error('Failed to fetch incidents', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIncident = async (newIncident: Partial<Incident>) => {
    try {
      const res = await fetch('/api/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newIncident),
      });
      if (res.ok) {
        await fetchIncidents();
        setCurrentView('dashboard');
      }
    } catch (err) {
      console.error('Failed to create incident', err);
    }
  };

  const handleSelectIncident = (incident: Incident) => {
    setSelectedIncident(incident);
    setCurrentView('details');
  };

  return (
    <div className="h-screen w-screen bg-brand-bg text-brand-ink font-sans flex flex-col overflow-hidden">
      {/* Top Header Navigation */}
      <header className="h-14 border-b border-brand-line bg-brand-bg/80 backdrop-blur-md flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-accent rounded flex items-center justify-center font-bold text-slate-900">L</div>
            <h1 className="text-lg font-semibold tracking-tight text-brand-ink-bright uppercase flex gap-1">
              L-GPPS <span className="text-brand-accent">2.0</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-4 text-[10px] font-bold uppercase tracking-widest pt-1">
            <button onClick={() => setCurrentView('dashboard')} className={`${currentView === 'dashboard' ? 'text-brand-accent border-b-2 border-brand-accent pb-4 mt-4' : 'text-slate-400 hover:text-white transition-colors pb-4 mt-4'}`}>Civic Network</button>
            <button onClick={() => setCurrentView('stats')} className={`${currentView === 'stats' ? 'text-brand-accent border-b-2 border-brand-accent pb-4 mt-4' : 'text-slate-400 hover:text-white transition-colors pb-4 mt-4'}`}>Analytics</button>
            <button className="text-slate-400 hover:text-white transition-colors pb-4 mt-4">Oracles</button>
            <button className="text-slate-400 hover:text-white transition-colors pb-4 mt-4">Governance</button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
            <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
            <span className="text-[10px] font-mono text-brand-accent">L0_CONSENSUS: ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 border-l border-slate-700 pl-4">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-mono">DID: 0x82...f9e2</p>
              <p className="text-xs font-bold text-white uppercase leading-none">Trust Score: 98.4</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-700 to-slate-500 border border-slate-600"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* Left Sidebar: Sidebar Component */}
        <div className="col-span-12 md:col-span-3 xl:col-span-2 border-r border-brand-line bg-brand-aside overflow-y-auto">
          <Sidebar currentView={currentView} setView={setCurrentView} />
        </div>

        {/* Center Content: Incident Feed/Stats/Reports */}
        <section className="col-span-12 md:col-span-6 xl:col-span-7 bg-slate-900 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <AnimatePresence mode="wait">
              {currentView === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <StatsOverview />
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="institutional-header">Active Civic Routes</h2>
                    <span className="text-[10px] font-mono bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded">Global: {incidents.length + 1204}</span>
                  </div>
                  <IncidentList 
                    incidents={incidents} 
                    onSelect={handleSelectIncident}
                    loading={loading}
                  />
                </motion.div>
              )}

              {currentView === 'report' && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <ReportForm onSubmit={handleCreateIncident} onCancel={() => setCurrentView('dashboard')} />
                </motion.div>
              )}

              {currentView === 'details' && selectedIncident && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <IncidentDetails incident={selectedIncident} onBack={() => setCurrentView('dashboard')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Right Sidebar: Security & Reputation */}
        <aside className="hidden md:flex md:col-span-3 xl:col-span-3 border-l border-brand-line bg-brand-aside flex-col overflow-y-auto">
          <div className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full border-2 border-brand-accent p-1 mb-3">
                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-2xl">⚖️</span>
                </div>
              </div>
              <h2 className="text-lg font-bold text-white">CIVIC PASSPORT</h2>
              <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-tighter">Verified Jurist • Class III</p>
            </div>
            
            <div className="mt-8 space-y-4">
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-bold">
                  <span className="uppercase text-slate-400">Global Reputation</span>
                  <span className="text-brand-accent">Level 42</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent" style={{ width: '75%' }}></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-slate-800/40 rounded border border-slate-700 text-center">
                  <p className="text-[9px] text-slate-500 uppercase">Validations</p>
                  <p className="text-sm font-bold text-white">4,812</p>
                </div>
                <div className="p-3 bg-slate-800/40 rounded border border-slate-700 text-center">
                  <p className="text-[9px] text-slate-500 uppercase">Resolved</p>
                  <p className="text-sm font-bold text-white">128</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-4">
                <h3 className="institutional-header">Protocol Status</h3>
                <SecurityStat label="Zero Trust" status="Active" />
                <SecurityStat label="FHE Encryption" status="Encrypted" />
                <SecurityStat label="L2 Immutability" status="Synced" />
              </div>
            </div>
          </div>
          
          <div className="mt-auto p-4 bg-brand-accent/5">
             <button 
               onClick={() => setCurrentView('report')}
               className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors shadow-lg shadow-emerald-900/20"
             >
               Report New Civic Route
             </button>
          </div>
        </aside>
      </main>

      {/* Bottom Utility Rail */}
      <footer className="h-8 bg-slate-950 border-t border-brand-line px-6 flex items-center justify-between z-50">
        <div className="flex gap-6 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
          <span>GLOBAL_LATENCY: 12ms</span>
          <span>BLOCK_HEIGHT: 18,442,109</span>
          <span>ACTIVE_ORACLES: 1,402</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400">
          PRIVACY_MODE: <span className="text-brand-accent">ZERO_KNOWLEDGE_ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}

function SecurityStat({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-brand-secondary uppercase tracking-tight">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
        <span className="text-[10px] mono-value text-brand-ink/80">{status}</span>
      </div>
    </div>
  );
}

