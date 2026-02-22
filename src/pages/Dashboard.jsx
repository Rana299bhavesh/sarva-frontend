import React, { useState, useEffect } from 'react';
import { fetchInsights, fetchTeachers } from '../services/api';
import StatCard from '../components/StatCard';
import WeeklyTrendChart from '../components/WeeklyTrendChart';

export default function Dashboard() {
  const [insights, setInsights] = useState({ stats: {}, trends: [], subjectInsights: [] });
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [loading, setLoading] = useState(true);
  const [cachedData, setCachedData] = useState({});
  const [lastFetched, setLastFetched] = useState({});

  useEffect(() => {
    loadTeachers();
    loadDashboardData();
  }, []);

  useEffect(() => {
    loadDashboardData(selectedTeacher);
  }, [selectedTeacher]);

  const loadTeachers = async () => {
    try {
      const res = await fetchTeachers();
      setTeachers(res.data.data);
    } catch (err) { console.error(err); }
  };

  const loadDashboardData = async (teacherId = '') => {
  const cacheKey = teacherId || 'global';
  const now = Date.now();
  const TEN_MINUTES = 10 * 60 * 1000;

  // 1. Check if we have fresh data in the last 10 minutes
  if (cachedData[cacheKey] && (now - lastFetched[cacheKey] < TEN_MINUTES)) {
    console.log(` Using 10-minute cache for: ${cacheKey}`);
    setInsights(cachedData[cacheKey]);
    return; // Stop here, no API call needed!
  }

  setLoading(true);
  try {
    const res = await fetchInsights(teacherId);
    const newData = res.data.data;

    
    setInsights(newData);
    setCachedData(prev => ({ ...prev, [cacheKey]: newData }));
    setLastFetched(prev => ({ ...prev, [cacheKey]: now }));
    
  } catch (err) { 
    console.error("Fetch Error:", err); 
  }
  setLoading(false);
};

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-[#0f172a]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-indigo-400 font-bold tracking-widest animate-pulse">Fetching DATA...</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-[#0f172a] min-h-screen overflow-y-auto font-sans selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto p-10">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            <h2 className="text-3xl font-black text-white tracking-tight">Admin Companion</h2>
            <p className="text-slate-400 text-sm font-medium mt-1">
              Live Organization Monitoring & AI-Driven Insights Across Your School
            </p>
          </div>
          
          <div className="relative group">
            <select 
              className="appearance-none border border-slate-700 rounded-2xl px-6 py-4 bg-slate-800/50 text-slate-200 text-sm font-bold shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer pr-12 hover:bg-slate-800"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">All Teachers (School Overview)</option>
              {teachers.map(t => (
                <option key={t.teacher_id} value={t.teacher_id}>{t.name}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              ▼
            </div>
          </div>
        </header>

        {/* Dynamic Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <StatCard title="Total Lessons" value={insights.stats.lesson || 0} bgColor="bg-green-50" textColor="text-emerald-400" icon="📘" />
          <StatCard title="Active Quizzes" value={insights.stats.quiz || 0} bgColor="bg-yellow-50" textColor="text-amber-400" icon="📝" />
          <StatCard title="Assessments" value={insights.stats.assessment || 0} bgColor="bg-red-50" textColor="text-rose-400" icon="📊" />
          
          {selectedTeacher && insights.subjectInsights.length > 0 ? (
            <div className="relative overflow-hidden p-6 rounded-[2rem] bg-indigo-600 border-b-4 border-indigo-400 shadow-2xl shadow-indigo-600/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
               <h3 className="text-indigo-200 font-bold text-[11px] uppercase tracking-[0.15em] mb-2 relative z-10">Primary Discipline</h3>
               <h2 className="text-3xl font-black text-white relative z-10 truncate">
                  {insights.subjectInsights.sort((a,b) => b.count - a.count)[0]?._id}
               </h2>
               <div className="mt-4 flex items-center space-x-2 relative z-10">
                 <span className="text-white text-xs font-bold px-2 py-1 bg-white/20 rounded-lg">LEADER</span>
               </div>
            </div>
          ) : (
            <div className="p-6 rounded-[2rem] bg-slate-800/30 border border-dashed border-slate-700 flex items-center justify-center">
               <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Select Teacher for Depth</p>
            </div>
          )}
        </section>

        {/* Analytics & Insight Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <WeeklyTrendChart data={insights.trends} />
          </div>
          
          <div className="lg:col-span-4 h-full">
            <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-700/50 shadow-2xl h-full min-h-[500px] flex flex-col">
               <div className="flex items-center space-x-3 mb-2">
                 <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]"></div>
                 <h3 className="text-xl font-bold text-white tracking-tight">AI Neural Pulse</h3>
               </div>
               <p className="text-xs text-indigo-400 font-bold uppercase tracking-[0.2em] mb-8">Gemini Cognitive Engine</p>
               
               <div className="space-y-4 flex-1">
                 {insights.aiPulse && insights.aiPulse.length > 0 ? (
                   insights.aiPulse.map((insight, index) => (
                     <div key={index} className="group p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300">
                       <div className="flex items-start space-x-4">
                         <span className="text-xl group-hover:rotate-12 transition-transform">✨</span>
                         <p className="text-sm text-slate-300 leading-relaxed font-medium italic">"{insight}"</p>
                       </div>
                     </div>
                   ))
                 ) : (
                   <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Decoding Ecosystem Patterns...</p>
                   </div>
                 )}
               </div>

               <div className="mt-8 pt-6 border-t border-slate-700/50">
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter text-center">
                   Verified by Google Gemini 1.5 Flash
                 </p>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}