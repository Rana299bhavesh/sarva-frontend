import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-72 bg-[#0f172a] p-8 flex flex-col hidden md:flex h-screen sticky top-0 border-r border-slate-800 shadow-2xl">
      {/* Brand Section */}
      <div className="flex items-center space-x-3 mb-12">
        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-white font-black text-xl">S</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter">
          SAVRA<span className="text-indigo-500">.</span>
        </h1>
      </div>
      
      {/* Navigation Section */}
      <nav className="flex-1 space-y-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 ml-2">
          Main Menu
        </p>
        
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full group flex items-center justify-between p-4 rounded-2xl font-semibold transition-all duration-300 ${
            activeTab === 'dashboard' 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 translate-x-1' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <span className={`text-xl transition-transform duration-300 group-hover:scale-110`}>🏠</span>
            <span className="text-sm">Dashboard</span>
          </div>
          {activeTab === 'dashboard' && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
        </button>
        
        <button 
          onClick={() => setActiveTab('teachers')}
          className={`w-full group flex items-center justify-between p-4 rounded-2xl font-semibold transition-all duration-300 ${
            activeTab === 'teachers' 
              ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 translate-x-1' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <div className="flex items-center space-x-4">
            <span className="text-xl transition-transform duration-300 group-hover:scale-110">👥</span>
            <span className="text-sm">Teachers</span>
          </div>
          {activeTab === 'teachers' && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
        </button>
      </nav>
      
      {/* Enhanced Admin Profile */}
      <div className="mt-auto">
        <div className="p-5 bg-slate-800/40 rounded-3xl border border-slate-700/50 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-white shadow-inner">
                SR
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#0f172a] rounded-full"></div>
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-none mb-1">
                Admin
              </p>
              <p className="text-sm font-bold text-slate-100 truncate">
                Shauryaman Ray
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
