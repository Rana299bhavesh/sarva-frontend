import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function WeeklyTrendChart({ data }) {
  return (
    <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-700/50 shadow-2xl flex flex-col h-[500px] transition-all duration-300 hover:shadow-indigo-500/5">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Weekly Activity</h3>
          <p className="text-xs text-indigo-400 font-bold uppercase tracking-[0.2em] mt-1">Live Analytics Stream</p>
        </div>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-slate-700"></div>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <defs>
              {/* Added Gradients for a premium glow effect */}
              <linearGradient id="colorLesson" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#334155" strokeOpacity={0.5} />
            
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 10, fontWeight: 600}} 
              dy={15}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#64748b', fontSize: 10, fontWeight: 600}} 
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderRadius: '16px', 
                border: '1px solid #334155',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                color: '#f8fafc'
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="diamond" 
              wrapperStyle={{ paddingBottom: '30px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}
            />
            
            <Line 
              type="bundle" 
              dataKey="lesson" 
              stroke="#10b981" 
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }} 
              animationDuration={2000}
            />
            
            <Line 
              type="bundle" 
              dataKey="quiz" 
              stroke="#6366f1" 
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 8, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
              animationDuration={2000}
            />
            
            <Line 
              type="bundle" 
              dataKey="assessment" 
              stroke="#f43f5e" 
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 8, fill: '#f43f5e', stroke: '#fff', strokeWidth: 2 }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}