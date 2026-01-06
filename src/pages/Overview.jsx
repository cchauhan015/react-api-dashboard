import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';

const Overview = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=5')
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard title="Total Revenue" value="$54,230" icon={DollarSign} trend={12.5} />
                <StatsCard title="Total Orders" value="1,245" icon={ShoppingCart} trend={-2.4} />
                <StatsCard title="New Customers" value="320" icon={Users} trend={8.1} />
                <StatsCard title="Growth Rate" value="24.5%" icon={TrendingUp} trend={4.3} trendLabel="vs last year" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <RevenueChart />
                </div>

                <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 flex flex-col h-[400px]">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
                        <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View All</button>
                    </div>

                    <div className="overflow-auto flex-1 p-0">
                        {loading ? (
                            <div className="flex items-center justify-center h-full text-gray-400">Loading users...</div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-3">User</th>
                                        <th className="px-6 py-3 text-right">Age</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {users.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.image}
                                                        alt={user.firstName}
                                                        className="w-10 h-10 rounded-full bg-indigo-50 object-cover border border-indigo-100"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-sm text-gray-900">{user.firstName} {user.lastName}</p>
                                                        <p className="text-xs text-gray-500 truncate max-w-[120px]">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 text-right">{user.age}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.age > 30 ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    Active
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;