import React, { useEffect, useState } from 'react';

const CustomersView = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=10')
            .then(res => res.json())
            .then(data => {
                setCustomers(data.users);
                setLoading(false);
            })
            .catch(err => setLoading(false));
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
                    <p className="text-gray-500 mt-1">View and manage customer data</p>
                </div>
                <button className="border border-gray-300 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                    Export List
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Company</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading customers...</td></tr>
                            ) : (
                                customers.map((user) => (
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
                                                    <p className="text-xs text-gray-500">ID: #{user.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-900">{user.email}</span>
                                                <span className="text-xs text-gray-500">{user.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {user.company.name}
                                            <div className="text-xs text-gray-400">{user.company.title}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                Active
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomersView;