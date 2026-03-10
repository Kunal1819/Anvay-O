import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Layers, Target, Crosshair, AlertOctagon } from 'lucide-react';
import { motion } from 'framer-motion';

// Fix for Leaflet default icon paths in React
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// Custom div icon for "Palantir" look
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 10px ${color}, 0 0 20px ${color}; border: 2px solid white;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });
};

const MARKERS = [
  { pos: [28.6139, 77.2090], name: 'New Delhi Command Node', type: 'CORE', color: '#0ea5e9' },
  { pos: [25.109, 62.332], name: 'Gwadar Port (CPEC)', type: 'GEO_ECONOMIC', color: '#f59e0b' },
  { pos: [34.152, 77.577], name: 'Ladakh Sector Alpha', type: 'DEFENSE', color: '#ef4444' },
  { pos: [19.076, 72.877], name: 'Mumbai Financial Hub', type: 'ECON', color: '#10b981' },
];

export function MapTab() {
  const [activeLayer, setActiveLayer] = useState('ALL');

  return (
    <div className="h-full relative flex rounded overflow-hidden border border-slate-700/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      {/* Absolute positioning for UI overlays over the map */}

      <div className="absolute top-4 left-4 z-[400] pointer-events-none">
        <h2 className="text-sm font-bold text-slate-200 tracking-widest font-mono flex items-center bg-[#0f172a]/90 px-3 py-1.5 rounded backdrop-blur border border-slate-700">
          <Crosshair className="w-5 h-5 mr-2 text-rose-500" />
          STRATEGIC GEOSPATIAL INTELLIGENCE
        </h2>
      </div>

      <div className="absolute top-16 left-4 z-[400] flex flex-col space-y-2 pointer-events-auto">
        <div className="glass-panel p-2 flex flex-col space-y-1">
          {['ALL', 'DEFENSE', 'GEO_ECONOMIC', 'CLIMATE'].map(layer => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`flex items-center space-x-2 px-3 py-2 rounded text-xs tracking-widest font-mono transition-colors
                 ${activeLayer === layer ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              <Layers className="w-3 h-3" />
              <span>{layer}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-[400] pointer-events-auto">
        <div className="glass-panel p-4 flex flex-col w-64">
          <div className="text-[10px] tracking-widest text-slate-500 font-mono mb-2 flex items-center">
            <AlertOctagon className="w-3 h-3 text-amber-500 mr-1" />
            ACTIVE SECTOR ALERTS
          </div>
          <div className="space-y-2">
            <div className="bg-rose-950/30 border border-rose-900/50 p-2 rounded text-xs font-mono">
              <span className="text-rose-400 font-bold block mb-1">SECTOR A-4 (LADAKH)</span>
              <span className="text-slate-400">Anomalous movement detected. Correlation with logistics node 88%</span>
            </div>
            <div className="bg-amber-950/30 border border-amber-900/50 p-2 rounded text-xs font-mono">
              <span className="text-amber-400 font-bold block mb-1">VIDARBHA REGION</span>
              <span className="text-slate-400">Soil moisture index -2.4σ. Critical threshold imminent.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crosshair Overlay center screen */}
      <div className="absolute inset-0 pointer-events-none z-[400] flex items-center justify-center opacity-30">
        <div className="w-[1px] h-[300px] bg-cyan-500/50 absolute"></div>
        <div className="w-[300px] h-[1px] bg-cyan-500/50 absolute"></div>
        <div className="w-6 h-6 border-2 border-cyan-500 rounded-full"></div>
      </div>

      <div className="flex-1 w-full h-full bg-[#020617] relative z-0" style={{ minHeight: '400px' }}>
        <MapContainer
          center={[22.5, 78.5]}
          zoom={5}
          style={{ height: '100%', width: '100%', background: '#020617' }}
          zoomControl={false}
        >
          {/* Dark Mode Tile Layer - CartoDB Dark Matter */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {/* Render markers */}
          {MARKERS.map((marker, i) => (
            <Marker key={i} position={marker.pos as any} icon={createCustomIcon(marker.color)}>
              <Popup className="custom-popup">
                <div className="font-mono text-sm bg-slate-900 text-slate-200 p-2 rounded border border-slate-700 shadow-xl min-w-[200px]">
                  <div className="text-xs text-cyan-500 mb-1">{marker.type}</div>
                  <div className="font-bold text-white mb-2">{marker.name}</div>
                  <div className="text-[10px] text-slate-500 grid grid-cols-2 gap-1 mb-2">
                    <span>LAT: {marker.pos[0]}</span>
                    <span>LNG: {marker.pos[1]}</span>
                  </div>
                  <button className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 py-1 rounded transition-colors flex items-center justify-center tracking-widest text-[10px]">
                    <Target className="w-3 h-3 mr-1" />
                    ISOLATE NODE
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Decorative radar/coverage circles */}
          <Circle center={[28.6139, 77.2090]} radius={300000} pathOptions={{ color: '#0ea5e9', fillColor: '#0ea5e9', fillOpacity: 0.05, weight: 1, dashArray: '4, 4' }} />
          <Circle center={[34.152, 77.577]} radius={150000} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.1, weight: 1 }} />
        </MapContainer>
      </div>

      {/* Global CSS overrides for Leaflet Popups to fit dark theme */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .leaflet-popup-content-wrapper { background: transparent; padding: 0; box-shadow: none; border-radius: 4px; }
        .leaflet-popup-tip-container { display: none; }
        .leaflet-popup-content { margin: 0; width: auto !important; }
        .leaflet-container { font-family: 'Inter', sans-serif; }
      `}} />
    </div>
  );
}
