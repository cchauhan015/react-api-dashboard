import React from 'react';

const StatsCard = ({ title, value, icon: Icon, trend, trendLabel }) => (
    <div className="bg-white p-6 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:border-indigo-100 transition-all duration-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                <Icon size={22} />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className={`font-semibold flex items-center ${trend >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-gray-400 ml-2">{trendLabel || 'vs last month'}</span>
        </div>
    </div>
);

export default StatsCard;