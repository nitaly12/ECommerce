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
import { FaWallet, FaExchangeAlt, FaCreditCard, FaCog, FaSignOutAlt, FaChartPie, FaUserCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Link from 'next/link';

const summary = [
  { label: 'Total Balance', value: '$58,154.07', change: '+2.5%' },
  { label: 'Monthly Income', value: '$68,590.99', change: '+2.5%' },
  { label: 'Monthly Expense', value: '$19,270.56', change: '-6%' },
  { label: 'Monthly Savings', value: '$10,795.12', change: '+2.8%' },
];

const performanceData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 14 },
  { name: 'Mar', value: 10 },
  { name: 'Apr', value: 16 },
  { name: 'May', value: 13 },
  { name: 'Jun', value: 16.25 },
  { name: 'Jul', value: 8 },
];

const bills = [
  { name: 'Netflix Subscription', date: 'Aug 15,2024', price: '$25.30', icon: <span className="bg-red-600 rounded p-1 text-white">N</span> },
  { name: 'Spotify Subscription', date: 'Aug 15,2024', price: '$25.30', icon: <span className="bg-green-500 rounded p-1 text-white">S</span> },
];

const pieData = [
  { name: 'Daily Needs', value: 64, color: '#fbbf24' },
  { name: 'Savings', value: 30, color: '#10b981' },
  { name: 'Shopping', value: 48, color: '#f472b6' },
];

const transactions = [
  { name: 'William Green', type: 'Withdrawal', amount: '-$500.00', date: '10 Aug 2024, 10:12 AM' },
  { name: 'Ethan Cooper', type: 'Transfer', amount: '+$635.00', date: '10 Aug 2024, 10:12 AM' },
  { name: 'Sophia Harper', type: 'Deposit', amount: '+$250.00', date: '10 Aug 2024, 10:12 AM' },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#18181b] text-gray-100">
      {/* Sidebar */}
     
      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Accounts</h1>
          <div className="flex gap-2">
            <button className="bg-[#23232a] px-4 py-2 rounded-lg text-sm font-semibold">Manage Balance</button>
            <button className="bg-orange-500 px-4 py-2 rounded-lg text-sm font-semibold">+ New Payment</button>
          </div>
        </header>
        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summary.map((item, idx) => (
            <div key={idx} className="bg-[#23232a] p-6 rounded-xl shadow flex flex-col gap-2">
              <div className="text-gray-400 text-sm">{item.label}</div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className={`text-xs ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{item.change}</div>
            </div>
          ))}
        </section>
        {/* Chart & Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart */}
          <div className="bg-[#23232a] p-6 rounded-xl shadow col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-gray-400 text-sm">Cash Flow</div>
                <div className="text-xl font-bold">$236,788.12</div>
              </div>
              <select className="bg-[#18181b] text-gray-300 rounded px-2 py-1 text-sm">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#27272a" strokeDasharray="5 5" />
                  <XAxis dataKey="name" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip contentStyle={{ background: '#23232a', border: 'none', color: '#fff' }} />
                  <Line type="monotone" dataKey="value" stroke="#fb923c" strokeWidth={3} dot={{ r: 5, fill: '#fb923c' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          {/* Bills & Payments */}
          <div className="bg-[#23232a] p-6 rounded-xl shadow flex flex-col gap-4">
            <div className="text-gray-400 text-sm mb-2">Bill & Payment</div>
            {bills.map((bill, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#18181b] rounded-lg p-3 mb-2">
                <div className="flex items-center gap-3">
                  {bill.icon}
                  <div>
                    <div className="font-semibold">{bill.name}</div>
                    <div className="text-xs text-gray-400">{bill.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{bill.price}</div>
                  <div className="text-xs text-gray-400">Scheduled</div>
                </div>
              </div>
            ))}
            <button className="text-orange-400 text-sm mt-2">View All</button>
          </div>
        </div>
        {/* Pie Chart & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <div className="bg-[#23232a] p-6 rounded-xl shadow flex flex-col items-center">
            <div className="text-gray-400 text-sm mb-2">Bill & Payment</div>
            <svg width="120" height="120" viewBox="0 0 120 120">
              {(() => {
                let acc = 0;
                return pieData.map((slice, i) => {
                  const r = 50;
                  const cx = 60;
                  const cy = 60;
                  const angle = (slice.value / 142) * 360;
                  const x1 = cx + r * Math.cos((Math.PI * acc) / 180);
                  const y1 = cy + r * Math.sin((Math.PI * acc) / 180);
                  acc += angle;
                  const x2 = cx + r * Math.cos((Math.PI * acc) / 180);
                  const y2 = cy + r * Math.sin((Math.PI * acc) / 180);
                  const largeArc = angle > 180 ? 1 : 0;
                  return (
                    <path
                      key={i}
                      d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`}
                      fill={slice.color}
                      opacity={0.8}
                    />
                  );
                });
              })()}
            </svg>
            <div className="flex flex-col gap-1 mt-4 w-full">
              {pieData.map((slice, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="inline-block w-3 h-3 rounded-full" style={{ background: slice.color }}></span>
                  <span>{slice.name}</span>
                  <span className="ml-auto font-bold">{slice.value}%</span>
                </div>
              ))}
            </div>
          </div>
          {/* Transactions */}
          <div className="col-span-2 bg-[#23232a] p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400 text-sm">Bill & Payment</div>
              <input className="bg-[#18181b] text-gray-300 rounded px-2 py-1 text-sm w-48" placeholder="Search transaction" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-xs">
                    <th className="py-2">Name</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, i) => (
                    <tr key={i} className="border-b border-[#18181b] hover:bg-[#18181b] transition">
                      <td className="py-2 font-semibold">{tx.name}</td>
                      <td className="py-2 text-xs text-gray-400">{tx.type}</td>
                      <td className={`py-2 font-bold ${tx.amount.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>{tx.amount}</td>
                      <td className="py-2 text-xs text-gray-400">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
