import React from 'react';

export default function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-[#f3f0f7] p-6 border-r border-gray-200 flex flex-col hidden md:flex h-full min-h-screen">
      <h1 className="text-2xl font-bold text-purple-700 tracking-wider mb-10">SAVRA</h1>
      
      <nav className="flex-1 space-y-3">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition-colors ${
            activeTab === 'dashboard' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:bg-white/50'
          }`}
        >
          <span className="text-xl">🏠</span>
          <span>Dashboard</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('teachers')}
          className={`w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition-colors ${
            activeTab === 'teachers' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:bg-white/50'
          }`}
        >
          <span className="text-xl">👥</span>
          <span>Teachers</span>
        </button>
      </nav>
      
      {/* Admin Profile Mockup */}
      <div className="mt-auto pt-8 border-t border-gray-200">
        <div className="flex items-center space-x-3 mt-4">
          <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-yellow-900">
            SR
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-400 font-semibold uppercase">School Admin</p>
            <p className="text-sm font-medium text-gray-800">Shauryaman Ray</p>
          </div>
        </div>
      </div>
    </div>
  );
}