import React from 'react';

export default function StatCard({ title, value, icon, bgColor, textColor }) {
  
  const accentColors = {
    'bg-green-50': 'border-emerald-500/50 shadow-emerald-500/10',
    'bg-yellow-50': 'border-amber-500/50 shadow-amber-500/10',
    'bg-red-50': 'border-rose-500/50 shadow-rose-500/10',
    'bg-purple-50': 'border-indigo-500/50 shadow-indigo-500/10',
  };

  const borderAccent = accentColors[bgColor] || 'border-slate-700 shadow-slate-900/50';

  return (
    <div className={`relative overflow-hidden p-6 rounded-[2rem] bg-[#1e293b] border-b-4 ${borderAccent} shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#243146] group`}>

      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 shadow-inner">
            <span className="text-xl filter drop-shadow-md">{icon}</span>
          </div>
          <div className="flex items-center space-x-1 bg-emerald-500/10 px-2 py-1 rounded-full">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Active</span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-slate-400 font-bold text-[11px] uppercase tracking-[0.15em]">
            {title}
          </h3>
          <div className="flex items-baseline space-x-2">
            <h2 className={`text-5xl font-black tracking-tighter ${textColor} drop-shadow-sm`}>
              {value}
            </h2>
          </div>
          
          <div className="flex items-center pt-4 space-x-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-[#1e293b] bg-slate-700"></div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 font-medium italic">
              Updated just now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}