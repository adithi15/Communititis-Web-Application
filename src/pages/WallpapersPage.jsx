import React, { useState } from 'react';
import { WALLPAPERS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Download } from 'lucide-react';

export default function WallpapersPage() {
  const [wallpaperDevice, setWallpaperDevice] = useState('ALL');
  const [fullscreenWallpaper, setFullscreenWallpaper] = useState(null);

  const filteredWallpapers = wallpaperDevice === 'ALL'
    ? WALLPAPERS
    : WALLPAPERS.filter(w => w.category === wallpaperDevice);

  return (
    <motion.section
      key="wallpapers-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      <div className="text-center max-w-lg mx-auto">
        <span className="font-mono text-xs tracking-widest text-[#05AA3D] bg-[#05AA3D]/10 px-3 py-1 rounded-full uppercase">
          WALLPAPERS DOWNLOAD GATES
        </span>
        <h2 className="font-display font-medium text-3xl text-slate-900 mt-2 tracking-tight">
          SKYLRK APPAREL BACKGROUNDS
        </h2>
        <p className="text-xs text-slate-600 font-sans mt-2">
          Drape your everyday machines in high-fidelity custom apparel illustrations. Select your layout format and download direct previews safely.
        </p>

        {/* Sub-device Filters */}
        <div className="flex justify-center gap-1.5 mt-5">
          {['ALL', 'Desktop', 'Mobile'].map((device) => (
            <button
              key={device}
              onClick={() => setWallpaperDevice(device)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all ${
                wallpaperDevice === device
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white/40 hover:bg-white/70 text-slate-600 border border-white/10'
              }`}
            >
              {device}
            </button>
          ))}
        </div>
      </div>

      {/* Grid layout cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredWallpapers.map((wp) => (
          <motion.div
            key={wp.id}
            layoutId={`wp-card-${wp.id}`}
            className="glass glass-opacity rounded-3xl p-4 border border-white/20 hover:scale-[1.03] duration-300 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 group mb-4 flex items-center justify-center">
              <img
                src={wp.imageUrl}
                alt={wp.title}
                className="w-3/4 max-h-[140px] object-contain group-hover:scale-110 duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
                <button
                  onClick={() => setFullscreenWallpaper(wp.imageUrl)}
                  className="px-4 py-2 border border-white text-white font-mono text-[10px] tracking-widest uppercase rounded-full hover:bg-white hover:text-slate-900 transition-all font-semibold"
                >
                  PREVIEW
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center px-1">
              <div>
                <h4 className="font-display font-bold text-xs text-slate-900 uppercase truncate max-w-[12rem]">
                  {wp.title}
                </h4>
                <span className="font-mono text-[9px] tracking-wider text-slate-500 uppercase">
                  {wp.category} FRAME
                </span>
              </div>

              <button
                onClick={() => {
                  // Simulated download file action
                  const alertDiv = document.createElement('div');
                  alertDiv.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 glass glass-dark px-6 py-3.5 rounded-2xl border border-white/20 font-mono text-xs tracking-widest text-[#D1F362] z-50 animate-bounce shadow-xl';
                  alertDiv.innerText = 'SAVING HIGH RES PREVIEW VIA BLOB...';
                  document.body.appendChild(alertDiv);
                  setTimeout(() => alertDiv.remove(), 2500);
                }}
                className="p-2.5 rounded-xl bg-slate-900 text-white hover:bg-black font-semibold hover:scale-105 active:scale-95 duration-200"
                aria-label="Download design"
              >
                <Download size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* POPUP: Wallpaper full size Previews */}
      <AnimatePresence>
        {fullscreenWallpaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenWallpaper(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 flex flex-col justify-center items-center p-4 cursor-zoom-out"
          >
            <img
              src={fullscreenWallpaper}
              alt="Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10"
            />
            <p className="text-slate-400 font-mono text-[11px] uppercase tracking-widest mt-4">
              Click anywhere to close preview frame
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
