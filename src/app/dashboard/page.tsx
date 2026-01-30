'use client'

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
  const performanceData = [
    { name: 'January', value: 30 },
    { name: 'February', value: 40 },
    { name: 'March', value: 35 },
    { name: 'April', value: 50 },
    { name: 'May', value: 60 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans text-gray-900">
      <main className="flex-1 px-2 sm:px-4 py-6 pt-20 w-full">
        {/* Sticky Header */}
        <header className="mb-8 sticky top-0 z-10 bg-gray-50/80 backdrop-blur border-b border-gray-200 py-4 px-2 sm:px-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Overview</h1>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 w-full">
          {[
            {
              title: 'Users',
              value: '1,203',
            },
            {
              title: 'Revenue',
              value: '$12,450',
            },
            {
              title: 'Orders',
              value: '348',
            },
            {
              title: 'Pending',
              value: '29',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-center min-w-0 bg-white rounded-2xl shadow-md p-4 sm:p-6 hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.title}</h3>
              <p className="mt-2 text-3xl font-extrabold text-gray-800">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-10"></div>

        {/* Line Chart Section */}
        <section className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-10 border border-gray-100 w-full min-w-0">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#007aff"
                  strokeWidth={2}
                  dot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Additional Component */}
        <StockPage />
      </main>
    </div>
  );
}
