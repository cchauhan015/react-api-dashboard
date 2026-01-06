import React, { useEffect, useState } from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import StatsCard from '../components/StatsCard';
import RevenueChart from '../components/RevenueChart';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Data from Demo API
    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=5')
            .then(res => res.json())
            .then(data => {
                setUsers(data.users);
                setLoading(false);
            });
    }, []);

    return (
        <Layout>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatsCard title="Total Revenue" value="$54,230" icon={DollarSign} trend={12} />
                <StatsCard title="Total Orders" value="1,245" icon={ShoppingCart} trend={-5} />
                <StatsCard title="New Customers" value="320" icon={Users} trend={18} />
                <StatsCard title="Growth" value="24.5%" icon={TrendingUp} trend={4} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Chart Section */}
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>

                {/* Recent Users List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Users</h3>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <p className="text-gray-500">Loading users...</p>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-gray-400 uppercase border-b">
                                        <th className="py-2">User</th>
                                        <th className="py-2">Email</th>
                                        <th className="py-2">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
                                            <td className="py-3 flex items-center gap-3">
                                                <img src={user.image} alt={user.firstName} className="w-8 h-8 rounded-full bg-gray-100" />
                                                <span className="font-medium text-sm text-gray-700">{user.firstName} {user.lastName}</span>
                                            </td>
                                            <td className="py-3 text-sm text-gray-500">{user.email}</td>
                                            <td className="py-3">
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                                    {user.role}
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
        </Layout>
    );
}