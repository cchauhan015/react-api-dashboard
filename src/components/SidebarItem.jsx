import React from 'react';

const SidebarItem = ({ icon: Icon, text, active, onClick }) => (
    <li
        onClick={onClick}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
    >
        <Icon size={20} />
        <span className="ml-3 font-medium">{text}</span>
    </li>
);

export default SidebarItem;
