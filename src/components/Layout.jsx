import React, { useState } from 'react';
import { LayoutDashboard, Users, ShoppingBag, Settings, Menu, Bell, Search } from 'lucide-react';
import SidebarItem from './SidebarItem';

const Layout = ({ children, activeTab, setActiveTab }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      `}>
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
                        <LayoutDashboard className="fill-indigo-600 text-indigo-600" />
                        Nexus
                    </h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-500">
                        &times;
                    </button>
                </div>
                <nav className="px-4 mt-4">
                    <ul className="space-y-1">
                        <SidebarItem
                            icon={LayoutDashboard}
                            text="Overview"
                            active={activeTab === 'overview'}
                            onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
                        />
                        <SidebarItem
                            icon={ShoppingBag}
                            text="Products"
                            active={activeTab === 'products'}
                            onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
                        />
                        <SidebarItem
                            icon={Users}
                            text="Customers"
                            active={activeTab === 'customers'}
                            onClick={() => { setActiveTab('customers'); setIsSidebarOpen(false); }}
                        />
                        <div className="pt-4 pb-2">
                            <p className="px-3 text-xs font-semibold text-gray-400 uppercase">System</p>
                        </div>
                        <SidebarItem
                            icon={Settings}
                            text="Settings"
                            active={activeTab === 'settings'}
                            onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
                        />
                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-1 -ml-1 rounded-md text-gray-600 md:hidden hover:bg-gray-100"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
                            <Search size={18} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent border-none focus:outline-none text-sm w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-400 hover:text-gray-600">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-700">Admin User</p>
                                <p className="text-xs text-gray-500">View Profile</p>
                            </div>
                            <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;