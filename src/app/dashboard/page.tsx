// import NavbarComponent from "@/components/NavbarConponent"
// import SideBarComponent from "../../components/SideBarComponent"
// import UsersPage from "./users/page"
// export default function DashboardPage(){
//     return(
//         <div>
//             <NavbarComponent/>
//             <SideBarComponent/>
//             <UsersPage/>    
//         </div>
//     )
// }
// import NavbarComponent from "@/components/NavbarConponent";
// import SideBarComponent from "@/components/SideBarComponent";
// import Profile from "./profile/page";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div>
//       <h1 className="">Hello</h1>
//     </div>
//   );
// }

// pages/dashboard.tsx
// import React from 'react';
// import Image from 'next/image';
// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex min-h-screen bg-gray-100">

//       {/* Main Content */}
//       <main className="flex-1 p-6 pt-16">
//         {/* Navbar */}
//         <header className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Overview</h1>
//         </header>

//         {/* Cards */}
//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white p-4 rounded-xl shadow-sm">
//             <h3 className="text-sm text-gray-500">Users</h3>
//             <p className="text-2xl font-bold">1,203</p>
//           </div>
//           <div className="bg-white p-4 rounded-xl shadow-sm">
//             <h3 className="text-sm text-gray-500">Revenue</h3>
//             <p className="text-2xl font-bold">$12,450</p>
//           </div>
//           <div className="bg-white p-4 rounded-xl shadow-sm">
//             <h3 className="text-sm text-gray-500">Orders</h3>
//             <p className="text-2xl font-bold">348</p>
//           </div>
//           <div className="bg-white p-4 rounded-xl shadow-sm">
//             <h3 className="text-sm text-gray-500">Pending</h3>
//             <p className="text-2xl font-bold">29</p>
//           </div>
//         </section>

//         {/* Chart Area */}
//         <section className="bg-white p-6 rounded-xl shadow-sm">
//           <h2 className="text-lg font-semibold mb-4">Performance</h2>
//           <div className="h-64 flex items-center justify-center text-gray-400">
//             {/* Placeholder htmlFor a chart */}
//             Chart will go here (e.g., Recharts or Chart.js)
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
// pages/dashboard.tsx
'use client'
// pages/dashboard.tsx
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import UsersPage from './users/page';
import StockPage from './stock/page';

export default function DashboardPage() {
  // Static Data htmlFor the Chart
  const performanceData = [
    { name: 'January', value: 30 },
    { name: 'February', value: 40 },
    { name: 'March', value: 35 },
    { name: 'April', value: 50 },
    { name: 'May', value: 60 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 pt-16">
        {/* Navbar */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Overview</h1>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-sm text-gray-500">Users</h3>
            <p className="text-2xl font-bold">1203</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-sm text-gray-500">Revenue</h3>
            <p className="text-2xl font-bold">$12450</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-sm text-gray-500">Orders</h3>
            <p className="text-2xl font-bold">348</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-sm text-gray-500">Pending</h3>
            <p className="text-2xl font-bold">29</p>
          </div>
        </section>

        {/* Static Chart */}
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Performance</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
        </div>
        </section>
            <StockPage/>
      </main>
    </div>

  );
}
