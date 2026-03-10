import React from 'react';
import { Activity, AlertTriangle, Cpu, Radio, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const METRICS = [
  { label: 'Active Nodes', value: '10,482,901', change: '+12,045', trend: 'up', icon: Activity },
  { label: 'Live Sources', value: '1,048', change: 'NOMINAL', icon: Radio },
  { label: 'Graph Links', value: '45.2M', change: '+105K', trend: 'up', icon: Zap },
  { label: 'Avg Inference', value: '84ms', change: '-2ms', trend: 'down', icon: Cpu },
];

const INGESTION_DATA = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  events: Math.floor(Math.random() * 5000) + 2000,
  entities: Math.floor(Math.random() * 2000) + 500
}));

const THREAT_MATRIX = [
  { domain: 'Geopolitics', score: 85 },
  { domain: 'Defense', score: 65 },
  { domain: 'Economics', score: 90 },
  { domain: 'Climate', score: 70 },
  { domain: 'Society', score: 45 },
];

const LIVE_EVENTS = [
  { time: '14:02:45', level: 'CRITICAL', domain: 'ECON/CLIMATE', text: 'Drought severity in Vidarbha upgraded. Wheat index correlation risk +45%.' },
  { time: '14:00:12', level: 'HIGH', domain: 'DEFENSE', text: 'Atypical drone deployments tracked near Sector 4.' },
  { time: '13:58:33', level: 'ELEVATED', domain: 'GEOPOLITICS', text: 'New CPEC funding tranche approved by Beijing. Analyzing dependencies.' },
  { time: '13:45:10', level: 'NOMINAL', domain: 'SOCIETY', text: 'Social sentiment shifted in Tier-2 urban zones (Maharashtra).' },
];

export const OverviewTab = React.memo(() => {
  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {METRICS.map((metric, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={metric.label}
            className="glass-panel p-4 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-slate-400 tracking-wider font-mono">{metric.label}</span>
              <metric.icon className="w-4 h-4 text-cyan-500 opacity-70" />
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-slate-100 font-mono tracking-tight">{metric.value}</span>
              <span className={`text-xs font-mono font-bold ${metric.trend === 'down' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                {metric.change}
              </span>
            </div>
            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent w-full opacity-50"></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Left Column - Main Charts */}
        <div className="xl:col-span-2 flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-5 flex-1 relative overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-200 tracking-widest font-mono flex items-center">
                <Radio className="w-4 h-4 mr-2 text-cyan-500" />
                REAL-TIME INGESTION
              </h2>
              <div className="flex space-x-2">
                <span className="px-2 py-0.5 text-[10px] bg-cyan-900/40 text-cyan-400 border border-cyan-800 rounded">EVENTS</span>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-900/40 text-emerald-400 border border-emerald-800 rounded">ENTITIES</span>
              </div>
            </div>
            <div className="flex-1 w-full overflow-hidden flex items-center justify-center" style={{ minHeight: '220px' }}>
              <AreaChart width={650} height={220} data={INGESTION_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEntities" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#334155" fontSize={10} tick={{ fill: '#64748b' }} tickLine={false} axisLine={{ stroke: '#1e293b' }} />
                <YAxis stroke="#334155" fontSize={10} tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px' }}
                  itemStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                  labelStyle={{ fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}
                />
                <Area isAnimationActive={false} type="monotone" dataKey="events" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorEvents)" />
                <Area isAnimationActive={false} type="monotone" dataKey="entities" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEntities)" />
              </AreaChart>
            </div>
          </motion.div>

          {/* Bottom table/list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel p-0 flex-1 overflow-hidden flex flex-col border border-rose-900/30"
          >
            <div className="p-4 border-b border-rose-900/30 bg-rose-950/20">
              <h2 className="text-sm font-bold text-rose-400 tracking-widest font-mono flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                CRITICAL TRAJECTORIES
              </h2>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {LIVE_EVENTS.map((event, i) => (
                <div key={i} className="flex space-x-4 items-start p-3 bg-[#0f172a]/50 border border-slate-800 rounded hover:border-slate-600 transition-colors">
                  <span className="text-xs font-mono text-slate-500 mt-0.5 shrink-0">{event.time}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded
                        ${event.level === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          event.level === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            'bg-slate-700/50 text-slate-300'}`}>
                        {event.level}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono tracking-wider">{event.domain}</span>
                    </div>
                    <p className="text-sm text-slate-300">{event.text}</p>
                  </div>
                  <button className="p-1.5 bg-slate-800 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-700 shrink-0 mt-1">
                    <Target className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Threat Matrix */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-5 flex flex-col h-full relative"
        >
          {/* Scanning line effect for threat matrix */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none opacity-50"></div>

          <h2 className="text-sm font-bold text-slate-200 tracking-widest font-mono flex items-center mb-6 relative z-10">
            <Activity className="w-4 h-4 mr-2 text-amber-500" />
            DOMAIN THREAT MATRIX
          </h2>

          <div className="flex-1 relative z-10 -ml-4 -mt-4 w-full flex items-center justify-center" style={{ minHeight: '220px' }}>
            <RadarChart width={250} height={220} cx="50%" cy="50%" outerRadius="70%" data={THREAT_MATRIX}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="domain" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar isAnimationActive={false} name="Threat" dataKey="score" stroke="#0ea5e9" strokeWidth={2} fill="#0ea5e9" fillOpacity={0.2} />
            </RadarChart>
          </div>

          <div className="mt-4 space-y-3 relative z-10">
            <h3 className="text-xs uppercase text-slate-500 font-mono font-bold tracking-widest mb-2 border-b border-slate-800 pb-1">Anomalies Detected</h3>
            {THREAT_MATRIX.sort((a, b) => b.score - a.score).slice(0, 3).map((threat, i) => (
              <div key={i} className="flex justify-between items-center text-sm font-mono">
                <span className="text-slate-300">{threat.domain}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500" style={{ width: `${threat.score}%`, backgroundColor: threat.score > 80 ? '#ef4444' : threat.score > 60 ? '#f59e0b' : '#0ea5e9' }}></div>
                  </div>
                  <span className={`w-6 text-right ${threat.score > 80 ? 'text-rose-400' : threat.score > 60 ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {threat.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
});
