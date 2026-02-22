// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// export default function WeeklyTrendChart({ data }) {
//   return (
//     <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-80">
//       <h3 className="text-lg font-semibold mb-1">Weekly Activity</h3>
//       <p className="text-sm text-gray-400 mb-6">Content creation trends</p>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
//           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
//           <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
//           <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
//           <Tooltip cursor={{stroke: '#f3f4f6', strokeWidth: 2}} />
//           <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
//           <Line type="monotone" dataKey="lesson" stroke="#34d399" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
//           <Line type="monotone" dataKey="quiz" stroke="#fbbf24" strokeWidth={3} dot={{r: 4}} />
//           <Line type="monotone" dataKey="assessment" stroke="#f87171" strokeWidth={3} dot={{r: 4}} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }








import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function WeeklyTrendChart({ data }) {
  return (
    // We changed the height from h-80 to h-96 and made it a flex column
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col h-96">
      <h3 className="text-lg font-semibold mb-1">Weekly Activity</h3>
      <p className="text-sm text-gray-400 mb-4">Content creation trends</p>
      
      {/* This critical wrapper tells Recharts to ONLY take up the remaining space */}
      <div className="flex-1 w-full min-h-0">
        {/* Using width="99%" instead of 100% prevents another known Recharts resizing bug */}
        <ResponsiveContainer width="99%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
            <Tooltip cursor={{stroke: '#f3f4f6', strokeWidth: 2}} />
            <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
            <Line type="monotone" dataKey="lesson" stroke="#34d399" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
            <Line type="monotone" dataKey="quiz" stroke="#fbbf24" strokeWidth={3} dot={{r: 4}} />
            <Line type="monotone" dataKey="assessment" stroke="#f87171" strokeWidth={3} dot={{r: 4}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}