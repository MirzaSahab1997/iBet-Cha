"use client";

import {
  Users,
  Swords,
  DollarSign,
  Percent,
  AlertTriangle,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  adminStats,
  volumeChartData,
  categoryChartData,
  wagers,
  users,
} from "@/lib/mock-data";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { statusColors, statusLabels } from "@/lib/mock-data";

const kpis = [
  {
    label: "Total Users",
    value: adminStats.totalUsers.toString(),
    sub: `${adminStats.activeUsers} active`,
    icon: Users,
    color: "text-brand-blue",
    bg: "bg-brand-blue/15",
  },
  {
    label: "Active Wagers",
    value: adminStats.activeWagers.toString(),
    sub: `${adminStats.disputedWagers} disputed`,
    icon: Swords,
    color: "text-brand-green",
    bg: "bg-brand-green/15",
  },
  {
    label: "Total Volume",
    value: formatCurrency(adminStats.totalVolume),
    sub: "All-time pot volume",
    icon: DollarSign,
    color: "text-yellow-400",
    bg: "bg-yellow-400/15",
  },
  {
    label: "Platform Revenue",
    value: formatCurrency(adminStats.platformRevenue),
    sub: "10% fees collected",
    icon: Percent,
    color: "text-purple-400",
    bg: "bg-purple-400/15",
  },
];

export default function AdminDashboardPage() {
  const recentWagers = [...wagers]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <div className="min-w-0">
      <h1 className="mb-1 text-xl font-bold sm:text-2xl">Overview</h1>
      <p className="mb-6 text-sm text-slate-400 sm:mb-8">
        Platform analytics and recent activity
      </p>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:gap-4 xl:grid-cols-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-white/5 bg-brand-dark-card p-3.5 sm:p-5"
          >
            <div className="mb-2 flex items-center justify-between sm:mb-3">
              <span className="text-[10px] text-slate-400 sm:text-xs">
                {k.label}
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl sm:h-9 sm:w-9 ${k.bg}`}
              >
                <k.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${k.color}`} />
              </div>
            </div>
            <p className="truncate text-lg font-bold sm:text-2xl">{k.value}</p>
            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:flex-wrap sm:gap-3">
        {adminStats.disputedWagers > 0 && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-400 sm:px-4 sm:text-sm">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {adminStats.disputedWagers} wager(s) under dispute
          </div>
        )}
        {adminStats.pendingWithdrawals > 0 && (
          <div className="flex items-center gap-2 rounded-xl border border-yellow-500/30 bg-yellow-500/10 px-3 py-2.5 text-xs text-yellow-400 sm:px-4 sm:text-sm">
            <Clock className="h-4 w-4 shrink-0" />
            {adminStats.pendingWithdrawals} pending withdrawal(s)
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="mb-6 grid gap-4 sm:mb-8 sm:gap-6 lg:grid-cols-3">
        <div className="min-w-0 rounded-2xl border border-white/5 bg-brand-dark-card p-4 sm:p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-bold">Wager Volume & Revenue</h2>
          <div className="h-52 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={volumeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} width={40} />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e" }}
                  name="Volume"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-white/5 bg-brand-dark-card p-4 sm:p-5">
          <h2 className="mb-4 text-sm font-bold">Wager Categories</h2>
          <div className="h-52 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="45%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryChartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value) => (
                    <span className="text-xs text-slate-400">{value}</span>
                  )}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-2xl border border-white/5 bg-brand-dark-card">
        <div className="border-b border-white/5 px-4 py-3 sm:px-5 sm:py-4">
          <h2 className="text-sm font-bold">Recent Wagers</h2>
        </div>
        <div className="-mx-0 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs text-slate-500">
                <th className="px-4 py-3 font-medium sm:px-5">Statement</th>
                <th className="px-4 py-3 font-medium sm:px-5">Challenger</th>
                <th className="px-4 py-3 font-medium sm:px-5">Pot</th>
                <th className="px-4 py-3 font-medium sm:px-5">Status</th>
                <th className="px-4 py-3 font-medium sm:px-5">Created</th>
              </tr>
            </thead>
            <tbody>
              {recentWagers.map((w) => (
                <tr
                  key={w.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="max-w-[200px] truncate px-4 py-3.5 text-slate-300 sm:max-w-xs sm:px-5">
                    {w.statement}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 sm:px-5">
                    {w.challengerName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-medium text-brand-green sm:px-5">
                    {formatCurrency(w.potTotal)}
                  </td>
                  <td className="px-4 py-3.5 sm:px-5">
                    <StatusBadge
                      label={statusLabels[w.status]}
                      className={statusColors[w.status]}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-slate-500 sm:px-5">
                    {formatDateTime(w.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-600">
        {users.length} users in system · Demo data only
      </p>
    </div>
  );
}
