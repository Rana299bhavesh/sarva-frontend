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
        setSelectedTeacher(res.data.data[0].teacher_id); // Auto-select first teacher
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

  return (
    <div className="p-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl font-bold text-purple-700">
            {selectedTeacherName.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{selectedTeacherName}</h2>
            <p className="text-gray-500 text-sm mt-1">Performance Overview</p>
          </div>
        </div>
        
        {/* Search / Select Bar */}
        <select 
          className="border border-gray-300 rounded-lg px-6 py-2 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
        >
          <option value="" disabled>Select a Teacher</option>
          {teachers.map(t => (
            <option key={t.teacher_id} value={t.teacher_id}>{t.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
         <div className="text-gray-500">Loading teacher data...</div>
      ) : !selectedTeacher ? (
         <div className="text-gray-500">Please select a teacher to view insights.</div>
      ) : (
        <>
          {/* Subjects Banner */}
          {insights.subjectInsights.length > 0 && (
            <div className="mb-6 text-sm text-gray-700 font-medium">
              Subject: <span className="font-normal text-gray-600">{insights.subjectInsights.map(s => s._id).join(', ')}</span>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Lessons Created" value={insights.stats.lesson || 0} bgColor="bg-purple-50" textColor="text-purple-900" icon="📖" />
            <StatCard title="Quizzes Conducted" value={insights.stats.quiz || 0} bgColor="bg-green-50" textColor="text-green-900" icon="📝" />
            <StatCard title="Assessments Assigned" value={insights.stats.assessment || 0} bgColor="bg-yellow-50" textColor="text-yellow-900" icon="📊" />
            
            {/* Warning Card */}
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm flex flex-col justify-center">
                <h3 className="text-red-800 font-semibold mb-1 text-sm flex items-center"><span className="mr-2">⚠️</span> Low Engagement Note</h3>
                <p className="text-xs text-red-600">Consider reviewing teaching methods or content output.</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeeklyTrendChart data={insights.trends} />
            </div>

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
        </>
      )}
    </div>
  );
}