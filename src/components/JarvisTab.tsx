import React, { useState, useEffect, useRef } from 'react';
import { Mic, Cpu, Database, Network as NetworkIcon, Terminal, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function JarvisTab() {
  const [isListening, setIsListening] = useState(false);
  const [history, setHistory] = useState([
    {
      type: 'user',
      text: 'ANVAY, analyze the impact of a 15% reduction in monsoon rainfall in Maharashtra on internal security metrics.'
    },
    {
      type: 'jarvis',
      text: 'Analyzing multi-domain dependencies...',
      entities: ['Monsoon', 'Maharashtra', 'Internal Security'],
      metrics: { latency: '1.2s', nodesRetrieved: 342, confidence: '89%' },
      completed: true,
      content: 'A 15% rainfall deficit in Maharashtra correlates with a 22% drop in crop yield (primarily cotton and soybeans). Entity trajectory models show historical linkage between crop failure in the Vidarbha region and a 3.4x increase in farmer unrest. Additionally, the resulting food inflation metric (predicted +4.1%) elevated social friction indices in urban centers (Mumbai, Pune). Security alert level adjusted to ELEVATED for Q3.'
    }
  ]);

  const [currentQuery, setCurrentQuery] = useState('');
  const inputRef = useRef(null);

  // Fake voice wave simulation
  const bars = Array.from({ length: 48 }).map((_, i) => i);

  const handleSimulateQuery = () => {
    if (!currentQuery.trim()) return;

    setHistory([...history, { type: 'user', text: currentQuery }]);

    const input = currentQuery;
    setCurrentQuery('');

    // Simulate thinking
    setTimeout(() => {
      setHistory(prev => [...prev, {
        type: 'jarvis',
        text: 'Executing GraphRAG traversal...',
        entities: ['Unknown'],
        metrics: { latency: '---', nodesRetrieved: 0, confidence: '---' },
        completed: false,
        content: ''
      }]);

      // Simulate response
      setTimeout(() => {
        setHistory(prev => {
          const newHist = [...prev];
          const last = newHist[newHist.length - 1];
          last.text = 'Synthesis complete.';
          last.completed = true;
          last.entities = ['Extracted Node A', 'Sector 7'];
          last.metrics = { latency: '2.4s', nodesRetrieved: 812, confidence: '94%' };
          last.content = `Simulated response for: "${input}". The ontology confirms a strong correlation with 4 major vectors in the defense matrix. Recommend isolating the subgraph for detailed node inspection.`;
          return newHist;
        });
      }, 2500);
    }, 500);
  };

  return (
    <div className="h-full flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4">
      {/* Left Chat / Interface */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-panel flex-1 flex flex-col relative overflow-hidden h-full border border-cyan-900/50"
      >
        <div className="p-4 border-b border-cyan-900/50 flex justify-between items-center bg-cyan-950/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/50">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-cyan-400 tracking-widest font-mono">JARVIS COGNITIVE CORE</h2>
              <div className="text-[10px] text-slate-500 font-mono">Powered by Sarvam 30B</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex items-center text-[10px] font-mono text-emerald-500">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
              VOICE STT: ACTIVE
            </div>
            <div className="flex items-center text-[10px] font-mono text-cyan-500">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-1.5 animate-pulse"></span>
              GRAPHRAG: ONLINE
            </div>
          </div>
        </div>

        {/* History Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-end">
          {history.map((msg, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'jarvis' && (
                <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center border border-cyan-500/30 mr-3 shrink-0 mt-1">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              )}

              <div className={`max-w-[80%] ${msg.type === 'user' ? 'bg-slate-800/80 border border-slate-700 rounded-tl-xl rounded-b-xl px-4 py-3 text-slate-200' : 'bg-transparent text-slate-300'}`}>
                {msg.type === 'user' ? (
                  <p className="font-mono text-sm leading-relaxed">{msg.text}</p>
                ) : (
                  <div className="space-y-3">
                    {/* Thinking state or header */}
                    <div className="flex items-center space-x-2 text-cyan-500 font-mono text-xs">
                      {!msg.completed && <Activity className="w-3 h-3 animate-spin" />}
                      <span>{msg.text}</span>
                    </div>

                    {/* Response Content */}
                    {msg.content && (
                      <div className="font-sans text-sm leading-relaxed tracking-wide text-slate-200 bg-[#0f172a]/60 border border-slate-700/50 p-4 rounded-lg shadow-lg">
                        <div className="space-y-4">
                          <p className="text-white relative z-10">{msg.content}</p>

                          {/* Citations/Metrics box */}
                          <div className="mt-4 pt-3 border-t border-slate-700/50 grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] font-mono">
                            <div className="bg-slate-900/50 p-1.5 rounded border border-slate-800 flex flex-col items-center justify-center">
                              <span className="text-slate-500 mb-0.5">LATENCY</span>
                              <span className="text-emerald-400">{msg.metrics?.latency}</span>
                            </div>
                            <div className="bg-slate-900/50 p-1.5 rounded border border-slate-800 flex flex-col items-center justify-center">
                              <span className="text-slate-500 mb-0.5">NODES</span>
                              <span className="text-cyan-400">{msg.metrics?.nodesRetrieved}</span>
                            </div>
                            <div className="bg-slate-900/50 p-1.5 rounded border border-slate-800 flex flex-col items-center justify-center">
                              <span className="text-slate-500 mb-0.5">CONFIDENCE</span>
                              <span className="text-amber-400">{msg.metrics?.confidence}</span>
                            </div>
                            <div className="bg-slate-900/50 p-1.5 rounded border border-slate-800 flex items-center justify-center text-cyan-500 hover:bg-slate-800 hover:text-cyan-400 cursor-pointer transition-colors">
                              VIEW SUBGRAPH
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#0f172a]/90 border-t border-slate-800 relative backdrop-blur">
          {/* Animated voice wave (simulated) */}
          <div className="absolute top-0 left-0 w-full h-0.5 pointer-events-none overflow-hidden">
            {isListening && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                className="h-full bg-cyan-500 relative"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-cyan-400 blur-[2px]"></div>
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-3 max-w-4xl mx-auto">
            <button
              onMouseDown={() => setIsListening(true)}
              onMouseUp={() => setIsListening(false)}
              onMouseLeave={() => setIsListening(false)}
              className={`p-3 rounded-full transition-all duration-300 
                ${isListening ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] scale-110' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700'}`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <div className="flex-1 relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={currentQuery}
                onChange={(e) => setCurrentQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSimulateQuery();
                }}
                placeholder={isListening ? "Listening..." : "Type strategic query or hold microphone icon..."}
                className="w-full bg-slate-900/50 border border-slate-700/80 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
              />
              <button
                onClick={handleSimulateQuery}
                className="absolute right-2 p-1.5 text-slate-400 hover:text-cyan-400 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Terminal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voice Waveform visualizer */}
          <AnimatePresence>
            {isListening && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 40 }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex justify-center items-end space-x-1"
              >
                {bars.map(i => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [10, Math.random() * 30 + 10, 10]
                    }}
                    transition={{
                      duration: 0.5 + Math.random() * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 bg-cyan-500 rounded-t shadow-[0_0_5px_rgba(6,182,212,0.8)]"
                    style={{ opacity: 1 - Math.abs(i - 24) * 0.03 }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Side Info Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel w-full xl:w-72 flex flex-col border border-slate-700 shrink-0"
      >
        <div className="p-4 border-b border-slate-700 bg-slate-800/50">
          <h3 className="text-sm font-bold text-slate-200 tracking-widest font-mono flex items-center">
            <Database className="w-4 h-4 mr-2 text-cyan-500" />
            CONTEXT WINDOW
          </h3>
        </div>

        <div className="p-4 flex-1 overflow-y-auto space-y-4 font-mono text-xs">
          <div className="bg-slate-900/50 border border-slate-800 p-3 rounded">
            <div className="text-[10px] text-cyan-500 mb-2 font-bold">ACTIVE GRAPH STATE</div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-500">Nodes Loaded:</span>
              <span className="text-slate-300">4,092</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-slate-500">Edges Resolved:</span>
              <span className="text-slate-300">12,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Graph Sync:</span>
              <span className="text-emerald-400">REAL-TIME</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-500 mb-2 font-bold tracking-widest border-b border-slate-800 pb-1">LLM METRICS (SARVAM 30B)</div>
            <div className="space-y-2 mt-2">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-400">Memory Usage</span>
                  <span className="text-cyan-400">14.2 GB</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[82%] h-full bg-cyan-500"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-slate-400">Context Tokens</span>
                  <span className="text-amber-400">12.4K / 32K</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[38%] h-full bg-amber-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-emerald-500 mb-2 font-bold tracking-widest border-b border-slate-800 pb-1 flex items-center">
              <NetworkIcon className="w-3 h-3 mr-1" />
              RETRIEVED ENTITIES
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Maharashtra', 'Monsoon', 'Agriculture', 'Economy', 'Security'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 font-sans">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
