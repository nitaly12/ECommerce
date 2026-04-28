'use client'
// pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
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
import { getDashboardData } from '@/lib/api/dashboard';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function DashboardPage() {
  const { t } = useTranslation();
  // STATE
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState<any>(null);
  const [insightLoading, setInsightLoading] = useState(false);
  // FETCH API
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await getDashboardData();
        console.log(res);
        setPerformanceData(res.performance || []);
        setStats(res.stats || []);

      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // LOADING UI
  if (loading) {
    return (
      <div className="p-10 text-center text-gray-600">
        {t('dashboard.loading')}
      </div>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {t('dashboard.errorPrefix')}: {error}
      </div>
    );
  }
  const handleExport = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/export`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (!res.ok) throw new Error(t('dashboard.exportFailed'));
  
      // download file
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.csv'; // or .xlsx
      a.click();
    } catch (err) {
      console.error(err);
      alert(t('dashboard.exportFailed'));
    }
  };
  const handleInsights = async () => {
    try {
      setInsightLoading(true);
      setShowInsights(true);
  
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/insights`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (!res.ok) throw new Error(t('dashboard.insightsLoadFailed'));
  
      const data = await res.json();
      setInsights(data);
  
    } catch (err) {
      console.error(err);
    } finally {
      setInsightLoading(false);
    }
  };
  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50/50 text-gray-900 px-4 sm:px-6 lg:px-8">

      {/* HEADER */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-display">{t('dashboard.headerTitle')}</h1>
          <p className="text-gray-500 mt-2">{t('dashboard.headerSubtitle')}</p>
        </div>
        <div className="flex gap-3">
          <LanguageSwitcher />
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors"
          >
            {t('dashboard.exportReport')}
          </button>

          <button
            onClick={handleInsights}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors"
          >
            {t('dashboard.viewInsights')}
          </button>
          {showInsights && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

              <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg relative">

                {/* Close */}
                <button
                  onClick={() => setShowInsights(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                >
                  ✕
                </button>

                <h2 className="text-xl font-bold mb-6">
                  📊 {t('dashboard.insightsTitle')}
                </h2>

                {insightLoading ? (
                  <p className="text-gray-500">{t('dashboard.loadingShort')}</p>
                ) : insights && (
                  <div className="space-y-6">

                    {/* 🔹 TOP STATS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500">{t('dashboard.users')}</p>
                        <p className="text-lg font-bold">{insights.totalUsers}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500">{t('dashboard.orders')}</p>
                        <p className="text-lg font-bold">{insights.totalOrders}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500">{t('dashboard.revenue')}</p>
                        <p className="text-lg font-bold">${insights.totalRevenue}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-500">{t('dashboard.avgOrder')}</p>
                        <p className="text-lg font-bold">
                          ${insights.averageOrderValue}
                        </p>
                      </div>

                    </div>

                    {/* 🔹 GROWTH + BEST MONTH */}
                    <div className="grid grid-cols-2 gap-4">

                      <div className="bg-green-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">{t('dashboard.growthRate')}</p>
                        <p className="text-xl font-bold text-green-600">
                          {insights.monthlyGrowthRate}%
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-xl">
                        <p className="text-sm text-gray-500">{t('dashboard.bestMonth')}</p>
                        <p className="text-xl font-bold text-blue-600">
                          {insights.bestMonth}
                        </p>
                        <p className="text-xs text-gray-400">
                          ${insights.bestMonthRevenue}
                        </p>
                      </div>

                    </div>

                    {/* 🔹 STATUS COUNTS */}
                    <div>
                      <p className="text-sm font-semibold mb-2">{t('dashboard.orderStatus')}</p>

                      <div className="grid grid-cols-3 gap-3">

                        <div className="bg-yellow-50 p-3 rounded-xl text-center">
                          <p className="text-xs text-gray-500">{t('dashboard.pending')}</p>
                          <p className="font-bold">
                            {insights.statusCounts?.PENDING}
                          </p>
                        </div>

                        <div className="bg-green-50 p-3 rounded-xl text-center">
                          <p className="text-xs text-gray-500">{t('dashboard.completed')}</p>
                          <p className="font-bold">
                            {insights.statusCounts?.COMPLETED}
                          </p>
                        </div>

                        <div className="bg-red-50 p-3 rounded-xl text-center">
                          <p className="text-xs text-gray-500">{t('dashboard.cancelled')}</p>
                          <p className="font-bold">
                            {insights.statusCounts?.CANCELLED}
                          </p>
                        </div>

                      </div>
                    </div>

                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STATS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.iconName === 'users'
            ? UsersIcon
            : stat.iconName === 'revenue'
            ? CurrencyDollarIcon
            : stat.iconName === 'orders'
            ? ShoppingBagIcon
            : ClockIcon;

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <div
                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    stat.trendUp
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  <ArrowTrendingUpIcon
                    className={`w-3 h-3 ${
                      stat.trendUp ? '' : 'rotate-180'
                    }`}
                  />
                  {stat.trend}
                </div>
              </div>

              <h3 className="text-sm text-gray-500">{stat.label}</h3>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </section>

      {/* CHART */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <h2 className="text-xl font-bold mb-4">
          {t('dashboard.performanceOverview')}
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* STOCK PAGE */}
      <div className="">
        <StockPage />
      </div>
    </div>
  );
}
// 'use client';

// import React, { useEffect, useState } from 'react';
// import {
//   AreaChart,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';

// import StockPage from './stock/page';
// import { getDashboardData } from '@/lib/api/dashboard';
// import {
//   UsersIcon,
//   CurrencyDollarIcon,
//   ShoppingBagIcon,
//   ClockIcon,
//   ArrowTrendingUpIcon
// } from '@heroicons/react/24/outline';

// export default function DashboardPage() {
//   // STATE
//   const [performanceData, setPerformanceData] = useState<any[]>([]);
//   const [stats, setStats] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // FETCH API
//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         setLoading(true);

//         const res = await getDashboardData();
//         console.log(res);
//         setPerformanceData(res.performance || []);
//         setStats(res.stats || []);

//       } catch (err: any) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   // LOADING UI
//   if (loading) {
//     return (
//       <div className="p-10 text-center text-gray-600">
//         Loading dashboard...
//       </div>
//     );
//   }

//   // ERROR UI
//   if (error) {
//     return (
//       <div className="p-10 text-center text-red-500">
//         Error: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="pt-20 pb-16 min-h-screen bg-gray-50/50 text-gray-900 px-4 sm:px-6 lg:px-8">

//       {/* HEADER */}
//       <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Dashboard Overview</h1>
//           <p className="text-gray-500 mt-2">
//             Welcome back! Here's what's happening today.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button className="px-4 py-2 bg-white border rounded-xl text-sm">
//             Export Report
//           </button>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm">
//             View Insights
//           </button>
//         </div>
//       </div>

//       {/* STATS */}
//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => {
//           const Icon = stat.iconName === 'users'
//             ? UsersIcon
//             : stat.iconName === 'revenue'
//             ? CurrencyDollarIcon
//             : stat.iconName === 'orders'
//             ? ShoppingBagIcon
//             : ClockIcon;

//           return (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-2xl shadow-sm border"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
//                   <Icon className="w-6 h-6" />
//                 </div>

//                 <div
//                   className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
//                     stat.trendUp
//                       ? 'bg-green-50 text-green-700'
//                       : 'bg-red-50 text-red-700'
//                   }`}
//                 >
//                   <ArrowTrendingUpIcon
//                     className={`w-3 h-3 ${
//                       stat.trendUp ? '' : 'rotate-180'
//                     }`}
//                   />
//                   {stat.trend}
//                 </div>
//               </div>

//               <h3 className="text-sm text-gray-500">{stat.label}</h3>
//               <p className="text-3xl font-bold">{stat.value}</p>
//             </div>
//           );
//         })}
//       </section>

//       {/* CHART */}
//       <section className="bg-white p-6 rounded-2xl border mb-10">
//         <h2 className="text-xl font-bold mb-4">
//           Performance Overview
//         </h2>

//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={performanceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />

//               <Area
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#3b82f6"
//                 fill="#3b82f6"
//                 fillOpacity={0.2}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       {/* STOCK PAGE */}
//       <div className="mt-8">
//         <StockPage />
//       </div>
//     </div>
//   );
// }