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
  Area,
  AreaChart
} from 'recharts';
import StockPage from './stock/page';
import {
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ClockIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  // Static Data for the Chart
  const performanceData = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 40 },
    { name: 'Mar', value: 35 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 60 },
    { name: 'Jun', value: 55 },
    { name: 'Jul', value: 70 },
  ];

  const stats = [
    {
      label: 'Total Users',
      value: '1,203',
      icon: UsersIcon,
      trend: '+12.5%',
      trendUp: true,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      label: 'Total Revenue',
      value: '$12,450',
      icon: CurrencyDollarIcon,
      trend: '+8.2%',
      trendUp: true,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      label: 'Total Orders',
      value: '348',
      icon: ShoppingBagIcon,
      trend: '-2.4%',
      trendUp: false,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      label: 'Pending Orders',
      value: '29',
      icon: ClockIcon,
      trend: '+4.1%',
      trendUp: true,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
  ];

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50/50 text-gray-900 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-display">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors">
            View Insights
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {stat.trendUp ? <ArrowTrendingUpIcon className="w-3 h-3" /> : (<ArrowTrendingUpIcon className="w-3 h-3 rotate-180" />)}
                {stat.trend}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Performance Chart */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
            <p className="text-sm text-gray-500 mt-1">Revenue growth over the last 7 months</p>
          </div>
          <select className="bg-gray-50 border-none text-sm font-medium text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 px-3 py-2 cursor-pointer outline-none">
            <option>Last 7 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Integration of Stock Page */}
      <div className="mt-8">
        <StockPage />
      </div>
    </div>
  );
}
