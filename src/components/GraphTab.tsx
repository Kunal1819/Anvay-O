import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { Network, Filter, ZoomIn, ZoomOut, Database } from 'lucide-react';
import { motion } from 'framer-motion';

// Generate mock data for the ontology graph
const generateOntologyData = () => {
  const nodes = [];
  const links = [];
  const domains = ['Geopolitics', 'Defense', 'Economics', 'Climate', 'Society'];
  const colors = ['#0ea5e9', '#ef4444', '#f59e0b', '#10b981', '#a855f7'];

  // Core nodes (countries/regions)
  for (let i = 0; i < 20; i++) {
    nodes.push({ id: `node-${i}`, name: `Entity ${i}`, val: 10 + Math.random() * 20, domain: domains[i % 5], color: colors[i % 5] });
  }

  // Dependent nodes
  for (let i = 20; i < 150; i++) {
    nodes.push({ id: `node-${i}`, name: `Event/Asset ${i}`, val: 2 + Math.random() * 5, domain: domains[i % 5], color: colors[i % 5] });

    // Connect to a random core node
    links.push({ source: `node-${i}`, target: `node-${Math.floor(Math.random() * 20)}`, value: Math.random() * 3 + 1 });

    // Sometimes connect to another dependent node
    if (Math.random() > 0.7) {
      links.push({ source: `node-${i}`, target: `node-${Math.floor(20 + Math.random() * (i - 20))}`, value: Math.random() * 2 });
    }
  }

  return { nodes, links };
};

export function GraphTab() {
  const graphRef = useRef();
  const [data, setData] = useState({ nodes: [], links: [] });
  const [containerDimensions, setContainerDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef(null);

  useEffect(() => {
    setData(generateOntologyData());

    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="h-full flex flex-col xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4">
      {/* Main Graph Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel flex-1 relative overflow-hidden flex flex-col border border-[#1e293b]"
      >
        <div className="absolute top-0 w-full p-4 flex justify-between items-center z-10 pointer-events-none">
          <h2 className="text-sm font-bold text-slate-200 tracking-widest font-mono flex items-center bg-[#0f172a]/80 px-3 py-1.5 rounded backdrop-blur">
            <Network className="w-5 h-5 mr-2 text-cyan-500" />
            LIVE ONTOLOGY GRAPH
          </h2>
          <div className="flex space-x-2 pointer-events-auto">
            <button className="p-2 bg-[#0f172a]/80 border border-slate-700 rounded hover:bg-slate-800 text-slate-300 transition-colors backdrop-blur">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="p-2 bg-[#0f172a]/80 border border-slate-700 rounded hover:bg-slate-800 text-slate-300 transition-colors backdrop-blur">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Graph */}
        <div ref={containerRef} className="flex-1 bg-black/20 w-full h-full cursor-crosshair">
          {data.nodes.length > 0 && (
            <ForceGraph2D
              ref={graphRef}
              width={containerDimensions.width}
              height={containerDimensions.height}
              graphData={data}
              nodeLabel="name"
              nodeColor="color"
              nodeRelSize={4}
              linkColor={() => 'rgba(51, 65, 85, 0.6)'}
              linkWidth={(link) => link.value * 0.5}
              backgroundColor="transparent"
              d3AlphaDecay={0.02}
              d3VelocityDecay={0.3}
              // Palantir-like rendering (glow)
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.name;
                const fontSize = 12 / globalScale;
                const r = Math.sqrt(Math.max(0, node.val || 1)) * 1.5;

                ctx.beginPath();
                ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                ctx.fillStyle = node.color;
                ctx.fill();

                // Add glow
                ctx.shadowColor = node.color;
                ctx.shadowBlur = 10;
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 0.5 / globalScale;
                ctx.stroke();
                ctx.shadowBlur = 0; // reset

                // Draw label for large nodes
                if (node.val > 20) {
                  ctx.font = `${fontSize}px Sans-Serif`;
                  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'middle';
                  ctx.fillText(label, node.x, node.y + r + fontSize);
                }
              }}
            />
          )}
        </div>

        {/* Status overlay */}
        <div className="absolute bottom-4 right-4 pointer-events-none flex flex-col items-end">
          <div className="text-[10px] text-slate-500 font-mono flex items-center mb-1">
            <Database className="w-3 h-3 mr-1" />
            Neo4j Cluster: ONLINE (0.02ms latency)
          </div>
          <div className="text-xs text-cyan-500 font-mono glow-text">
            10,482,901 Nodes | 45.2M Edges
          </div>
        </div>
      </motion.div>

      {/* Target Details Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel w-full xl:w-80 flex flex-col border border-slate-700 xl:shrink-0"
      >
        <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-200 tracking-widest font-mono">SELECTED NODE</h3>
          <Filter className="w-4 h-4 text-slate-400" />
        </div>

        <div className="p-5 flex-1 overflow-y-auto font-mono text-sm border-l-2 border-cyan-500 m-4 bg-[#0f172a] rounded shadow-inner">
          <div className="text-xs text-cyan-500 mb-1">ENTITY_ID: #892-XT-A</div>
          <h4 className="text-lg text-white font-bold mb-4 font-sans tracking-tight">CPEC Infrastructure node (Gwadar)</h4>

          <div className="space-y-4">
            <div>
              <div className="text-[10px] text-slate-500 mb-1">TYPE</div>
              <div className="text-slate-300">GEO_ECONOMIC_ASSET</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 mb-1">CONFIDENCE SCORE</div>
              <div className="flex items-center space-x-2">
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%]"></div>
                </div>
                <span className="text-emerald-400 text-xs">92%</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="text-[10px] text-slate-500 mb-2">1ST DEGREE RELATIONS</div>
              <ul className="space-y-2 text-xs">
                <li className="flex justify-between">
                  <span className="text-amber-400 border border-amber-500/30 bg-amber-500/10 px-1 rounded">DEPENDS_ON</span>
                  <span className="text-slate-400 text-right">Beijing Funds</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-1 rounded">LOCATED_IN</span>
                  <span className="text-slate-400 text-right">Balochistan</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-rose-400 border border-rose-500/30 bg-rose-500/10 px-1 rounded">THREATENS</span>
                  <span className="text-slate-400 text-right">Regional Nav</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-900/50">
          <button className="w-full py-2 bg-cyan-950/40 text-cyan-400 border border-cyan-800 hover:bg-cyan-900/60 rounded text-xs font-bold tracking-widest transition-colors font-mono hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            EXPAND SUBGRAPH
          </button>
        </div>
      </motion.div>
    </div>
  );
}
