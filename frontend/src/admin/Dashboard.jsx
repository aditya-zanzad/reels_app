import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import StatsCard from './StatsCard';
import Chart from './Chart';
import Footer from './Footer';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/5 bg-gray-800 text-white p-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-center text-white">Dashboard Menu</h2>
          <ul className="space-y-4">
            <li><Link to="/admin/dashboard" className="text-gray-300 hover:text-white">Home</Link></li>
            <li><Link to="/admin/dashboard/upload" className="text-gray-300 hover:text-white">Upload Videos</Link></li>
            <li><Link to="/admin/orders" className="text-gray-300 hover:text-white">Orders</Link></li>
            <li><Link to="/admin/customers" className="text-gray-300 hover:text-white">Customers</Link></li>
            <li><Link to="/admin/settings" className="text-gray-300 hover:text-white">Settings</Link></li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col w-3/4 bg-gray-100">
        <Header />

        <main className="p-6 flex-grow">
          {/* Stats Cards */}
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
            {[ 
              { title: 'Total Visitors', value: '4564', icon: 'uil-user', color: 'bg-blue-600' },
              { title: 'Revenue', value: '$7564', icon: 'uil-dollar-sign-alt', color: 'bg-green-600' },
              { title: 'Orders', value: '7891+', icon: 'uil-shopping-bag', color: 'bg-yellow-600' },
              { title: 'Items', value: '486', icon: 'uil-store', color: 'bg-indigo-600' }
            ].map((card, index) => (
              <StatsCard key={index} title={card.title} value={card.value} icon={card.icon} color={card.color} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Chart title="Statistics" chartId="morris-bar-example">
                {/* Chart implementation would go here */}
              </Chart>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-5">
                <h4 className="text-xl font-semibold mb-4">Stock Overview</h4>
                <div className="mx-auto text-center">
                  <div style={{ display: 'inline', width: '175px', height: '175px' }}>
                    {/* Knob or circular chart implementation would go here */}
                  </div>
                  <h5 className="text-gray-500 mt-4">Total sales made today</h5>
                </div>
                <div className="flex gap-4 text-center mt-6">
                  <div className="w-1/2">
                    <p className="text-gray-400">Target</p>
                    <h4 className="text-lg">$7.8k</h4>
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-400">Last Week</p>
                    <h4 className="text-lg">$1.4k</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tables Section */}
          <div className="grid xl:grid-cols-2 gap-6">
            {/* Recent Buyers Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b">
                <h4 className="text-xl font-semibold">Recent Buyers</h4>
                <button className="text-sm text-gray-600 bg-gray-200 px-3 py-1 rounded-lg">Export</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  {/* Table content would go here */}
                </table>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b">
                <h4 className="text-xl font-semibold">Account Transactions</h4>
                <button className="text-sm text-gray-600 bg-gray-200 px-3 py-1 rounded-lg">Export</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  {/* Table content would go here */}
                </table>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
