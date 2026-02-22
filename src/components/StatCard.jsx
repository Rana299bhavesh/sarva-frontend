import React from 'react';

export default function StatCard({ title, value, icon, bgColor, textColor }) {
  return (
    <div className={`p-6 rounded-2xl flex flex-col justify-between ${bgColor} shadow-sm border border-gray-100`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-600 font-medium text-sm">{title}</h3>
        <span className="text-gray-400">{icon}</span>
      </div>
      <div>
        <h2 className={`text-4xl font-semibold ${textColor}`}>{value}</h2>
        <p className="text-xs text-gray-500 mt-2">This week</p>
      </div>
    </div>
  );
}