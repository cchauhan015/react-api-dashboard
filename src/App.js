import React, { useState } from 'react';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import ProductsView from './pages/Products';
import CustomersView from './pages/Customers';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && <Overview />}
      {activeTab === 'products' && <ProductsView />}
      {activeTab === 'customers' && <CustomersView />}
      {activeTab === 'settings' && (
        <div className="flex items-center justify-center h-96 text-gray-400">
          Settings Panel Placeholder
        </div>
      )}
    </Layout>
  );
}
