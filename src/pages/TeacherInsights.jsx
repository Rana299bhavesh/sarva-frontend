import React, { useState, useEffect } from 'react';
import { fetchInsights, fetchTeachers } from '../services/api';
import StatCard from '../components/StatCard';
import WeeklyTrendChart from '../components/WeeklyTrendChart';

export default function TeacherInsights() {
  const [insights, setInsights] = useState({ stats: {}, trends: [], subjectInsights: [] });
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacher) {
      loadTeacherData(selectedTeacher);
    } else {
      setLoading(false);
    }
  }, [selectedTeacher]);

  const loadTeachers = async () => {
    try {
      const res = await fetchTeachers();
      setTeachers(res.data.data);
      if (res.data.data.length > 0) {
        setSelectedTeacher(res.data.data[0].teacher_id);
      }
    } catch (err) { console.error(err); }
  };

  const loadTeacherData = async (teacherId) => {
    setLoading(true);
    try {
      const res = await fetchInsights(teacherId);
      setInsights(res.data.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const selectedTeacherName = teachers.find(t => t.teacher_id === selectedTeacher)?.name || 'Select a Teacher';

  if (loading && !teachers.length) return (
    <div className="flex items-center justify-center h-screen bg-[#0f172a]">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex-1 bg-[#0f172a] min-h-screen p-10 overflow-y-auto font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header & Selector */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-indigo-500/20">
                {selectedTeacherName.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-[#0f172a] rounded-full"></div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight">{selectedTeacherName}</h2>
              <div className="flex items-center mt-1 space-x-3">
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Faculty Member</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span className="text-xs text-slate-500 font-medium italic">ID: {selectedTeacher.slice(-6)}</span>
              </div>
            </div>
          </div>
          
          <div className="relative w-full lg:w-72">
            <select 
              className="w-full appearance-none border border-slate-700 rounded-2xl px-6 py-4 bg-slate-800/50 text-slate-200 text-sm font-bold shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer hover:bg-slate-800"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="" disabled>Search Faculty...</option>
              {teachers.map(t => (
                <option key={t.teacher_id} value={t.teacher_id}>{t.name}</option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-xs">▼</div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center space-x-4 p-8 bg-slate-800/30 rounded-[2rem] border border-dashed border-slate-700">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">Loading Teachers Data</p>
          </div>
        ) : !selectedTeacher ? (
          <div className="text-slate-500 font-bold p-10 bg-slate-800/20 rounded-[2.5rem] text-center border border-slate-800">
            Awaiting Faculty Selection
          </div>
        ) : (
          <>
            {/* Subjects Chips */}
            {insights.subjectInsights.length > 0 && (
              <div className="flex items-center space-x-4 mb-8 overflow-x-auto pb-2">
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">Active Disciplines:</span>
                {insights.subjectInsights.map((s, i) => (
                  <span key={i} className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold whitespace-nowrap">
                    {s._id}
                  </span>
                ))}
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              <StatCard title="Lessons Created" value={insights.stats.lesson || 0} bgColor="bg-purple-50" textColor="text-indigo-400" icon="📖" />
              <StatCard title="Quizzes Hosted" value={insights.stats.quiz || 0} bgColor="bg-green-50" textColor="text-emerald-400" icon="📝" />
              <StatCard title="Assessments" value={insights.stats.assessment || 0} bgColor="bg-yellow-50" textColor="text-amber-400" icon="📊" />
              
              <div className="relative overflow-hidden p-6 rounded-[2rem] bg-slate-800/40 border border-rose-500/30 shadow-2xl flex flex-col justify-center group hover:bg-rose-500/5 transition-colors">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/20 transition-colors"></div>
                  <h3 className="text-rose-400 font-black text-[10px] uppercase tracking-[0.15em] mb-2 flex items-center">
                    <span className="mr-2">⚡</span> Strategic Note
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    Output is <span className="text-rose-400 font-bold italic">stable</span>. Review engagement trends to optimize content delivery.
                  </p>
              </div>
            </div>

            {/* Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <WeeklyTrendChart data={insights.trends} />
              </div>

              {/* AI Neural Summary */}
              <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-700/50 shadow-2xl min-h-[500px] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">AI Neural Summary</h3>
                    <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] mt-1">Faculty Deep-Analysis</p>
                  </div>
                  <div className="p-2 bg-indigo-500/10 rounded-xl">
                    <span className="text-xl">🤖</span>
                  </div>
                </div>
                
                <div className="space-y-4 flex-1">
                  {insights.aiPulse && insights.aiPulse.length > 0 ? (
                    insights.aiPulse.map((insight, index) => (
                      <div key={index} className="p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-all group">
                        <div className="flex items-start space-x-4">
                          <span className="text-indigo-500 mt-1 font-bold">●</span>
                          <p className="text-sm text-slate-300 leading-relaxed font-medium group-hover:text-slate-100 italic transition-colors">
                            "{insight}"
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 opacity-50">
                      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Synthesizing Feedback...</p>
                    </div>
                  )}
                </div>

                <div className="mt-8 p-4 bg-indigo-600/10 rounded-2xl border border-indigo-500/20">
                  <p className="text-[10px] text-indigo-300/60 font-medium text-center leading-relaxed">
                    Insights generated via <span className="text-indigo-400 font-bold">Gemini-1.5-Flash</span> based on real-time activity metrics.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}