import React, { useState, useEffect } from 'react';
import { Shield, Globe, Network, Map as MapIcon, Activity, Fingerprint, Search, Mic, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import { OverviewTab } from './components/OverviewTab';
import { GraphTab } from './components/GraphTab';
import { MapTab } from './components/MapTab';
import { JarvisTab } from './components/JarvisTab';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#020617] text-slate-200 overflow-hidden font-sans relative">
      <div className="scanline"></div>

      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-slate-800 flex flex-col z-10 shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <Shield className="w-8 h-8 text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <div>
            <h1 className="text-xl font-bold tracking-widest text-white glow-text">ANVAY</h1>
            <p className="text-xs text-cyan-500 font-mono">■■■■■ OS v2.4</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem icon={<Globe className="w-5 h-5" />} label="Global Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <NavItem icon={<Network className="w-5 h-5" />} label="Knowledge Graph" active={activeTab === 'graph'} onClick={() => setActiveTab('graph')} />
          <NavItem icon={<MapIcon className="w-5 h-5" />} label="Geospatial Intel" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
          <NavItem icon={<Cpu className="w-5 h-5" />} label="JARVIS Node" active={activeTab === 'jarvis'} onClick={() => setActiveTab('jarvis')} />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex flex-col space-y-2 p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
            <div className="flex items-center space-x-3">
              <Fingerprint className="w-5 h-5 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider">AUTH: VERIFIED</span>
                <span className="text-[10px] text-slate-400 font-mono tracking-widest">CLEARANCE: L5</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-slate-800 flex justify-between">
              <span>SARVAM INFERENCE</span>
              <span className="text-cyan-600">ONLINE</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-0">
        {/* Header */}
        <header className="h-16 glass-panel border-b border-slate-800 flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex-1 max-w-3xl relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input
              type="text"
              placeholder="Query Ontology Engine... (Press '/' to focus)"
              className="w-full bg-[#0f172a]/80 border border-slate-700 text-sm rounded pl-10 pr-10 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
            />
            <button className="absolute right-2 p-1.5 rounded hover:bg-slate-700 text-cyan-400 transition-colors group">
              <Mic className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="ml-6 flex items-center space-x-6">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-mono font-bold tracking-widest">LAT</span>
              <span className="text-xs text-slate-300 font-mono">28.6139° N</span>
            </div>
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-mono font-bold tracking-widest">LONG</span>
              <span className="text-xs text-slate-300 font-mono">77.2090° E</span>
            </div>
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-[10px] text-slate-500 font-mono font-bold tracking-widest">SYS TIME</span>
              <span className="text-xs text-cyan-400 font-mono">{currentTime.toLocaleTimeString('en-US', { hour12: false })} IST</span>
            </div>
            <div className="h-8 w-px bg-slate-700"></div>
            <div className="flex items-center space-x-2 bg-emerald-900/20 px-3 py-1.5 rounded border border-emerald-900/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div>
              <span className="text-xs font-mono text-emerald-500 font-bold tracking-wider">NOMINAL</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617] relative">
          <div className="w-full h-full" style={{ position: activeTab === 'overview' ? 'relative' : 'absolute', visibility: activeTab === 'overview' ? 'visible' : 'hidden', left: activeTab === 'overview' ? 0 : '-9999px', top: 0, opacity: activeTab === 'overview' ? 1 : 0 }}>
            <OverviewTab />
          </div>
          <div className="w-full h-full" style={{ position: activeTab === 'graph' ? 'relative' : 'absolute', visibility: activeTab === 'graph' ? 'visible' : 'hidden', left: activeTab === 'graph' ? 0 : '-9999px', top: 0, opacity: activeTab === 'graph' ? 1 : 0 }}>
            <GraphTab />
          </div>
          <div className="w-full h-full" style={{ position: activeTab === 'map' ? 'relative' : 'absolute', visibility: activeTab === 'map' ? 'visible' : 'hidden', left: activeTab === 'map' ? 0 : '-9999px', top: 0, opacity: activeTab === 'map' ? 1 : 0 }}>
            <MapTab />
          </div>
          <div className="w-full h-full" style={{ position: activeTab === 'jarvis' ? 'relative' : 'absolute', visibility: activeTab === 'jarvis' ? 'visible' : 'hidden', left: activeTab === 'jarvis' ? 0 : '-9999px', top: 0, opacity: activeTab === 'jarvis' ? 1 : 0 }}>
            <JarvisTab />
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all 
        ${active ? 'bg-cyan-950/40 border border-cyan-800/50 text-cyan-400 shadow-[inset_0_0_12px_rgba(6,182,212,0.1)]' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}
    >
      <div className={`${active ? 'drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]' : ''}`}>
        {icon}
      </div>
      <span className="font-medium text-sm tracking-wide">{label}</span>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute left-0 w-1 h-8 bg-cyan-500 rounded-r shadow-[0_0_8px_rgba(6,182,212,0.8)]"
        />
      )}
    </button>
  );
}

export default App;
