import React, { useState, useEffect } from 'react';
import { fetchInsights, fetchTeachers } from '../services/api';
import StatCard from '../components/StatCard';
import WeeklyTrendChart from '../components/WeeklyTrendChart';

export default function Dashboard() {
  const [insights, setInsights] = useState({ stats: {}, trends: [], subjectInsights: [] });
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [loading, setLoading] = useState(true);

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
    setLoading(true);
    try {
      const res = await fetchInsights(teacherId);
      setInsights(res.data.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  if (loading) return <div className="p-8 text-gray-500">Loading insights...</div>;

  return (
    <div className="flex h-screen bg-[#fafafa] font-sans">
      {/* Basic Sidebar Mockup */}
      {/* <div className="w-64 bg-[#f3f0f7] p-6 border-r border-gray-200 flex flex-col">
        <h1 className="text-2xl font-bold text-purple-700 tracking-wider mb-10">SAVRA</h1>
        <nav className="flex-1 space-y-2">
          <a href="#" className="flex items-center space-x-3 text-gray-800 bg-white p-3 rounded-xl font-medium shadow-sm">
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-600 p-3 hover:bg-white/50 rounded-xl font-medium">
            <span>Teachers</span>
          </a>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Companion</h2>
            <p className="text-gray-500 text-sm mt-1">See What's Happening Across your School</p>
          </div>
          
          {/* Teacher Selector Filter */}
          <select 
            className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">All Teachers (School Overview)</option>
            {teachers.map(t => (
              <option key={t.teacher_id} value={t.teacher_id}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Lessons Created" value={insights.stats.lesson || 0} bgColor="bg-green-50" textColor="text-green-900" icon="📖" />
          <StatCard title="Quizzes Conducted" value={insights.stats.quiz || 0} bgColor="bg-yellow-50" textColor="text-yellow-900" icon="📝" />
          <StatCard title="Assessments Made" value={insights.stats.assessment || 0} bgColor="bg-red-50" textColor="text-red-900" icon="📊" />
          
          {selectedTeacher && insights.subjectInsights.length > 0 && (
            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100 shadow-sm col-span-1 md:col-span-1">
               <h3 className="text-gray-600 font-medium text-sm mb-2">Top Subject</h3>
               <h2 className="text-2xl font-semibold text-purple-900">
                  {insights.subjectInsights.sort((a,b) => b.count - a.count)[0]?._id}
               </h2>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeeklyTrendChart data={insights.trends} />
          </div>
          
          {/* AI Pulse Mockup */}
          {/* Real AI Pulse Summary */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="text-lg font-semibold mb-1">AI Pulse Summary</h3>
             <p className="text-sm text-gray-400 mb-4">Real-time insights powered by Gemini</p>
             
             <div className="space-y-3">
               {/* Map through the Gemini insights from the backend */}
               {insights.aiPulse && insights.aiPulse.length > 0 ? (
                 insights.aiPulse.map((insight, index) => (
                   <div key={index} className="p-4 bg-purple-50 rounded-xl text-sm text-purple-900 flex items-start space-x-3">
                     <span className="mt-0.5">✨</span>
                     <p>{insight}</p>
                   </div>
                 ))
               ) : (
                 <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-500 flex items-center space-x-2">
                   <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                   <span>Analyzing data...</span>
                 </div>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}