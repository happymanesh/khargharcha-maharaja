"use client";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { api } from "@/lib/api";
import { Users, Heart, Calendar, UserCheck, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Stats {
  totalMembers: number; newMembersThisMonth: number;
  totalDonations: number; donationsThisMonth: number;
  totalDonationAmount: number; donationAmountThisMonth: number;
  activeVolunteers: number; upcomingEvents: number; totalEvents: number;
}

const fmt = (n: number) => n >= 100000 ? `₹${(n/100000).toFixed(1)}L` : n >= 1000 ? `₹${(n/1000).toFixed(1)}K` : `₹${n}`;

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [donationChart, setDonationChart] = useState<{ date: string; amount: number }[]>([]);
  const [memberGrowth, setMemberGrowth] = useState<{ month: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/dashboard/stats"),
      api.get("/dashboard/donation-chart?days=30"),
      api.get("/dashboard/member-growth"),
    ]).then(([s, d, m]) => {
      setStats(s.data.data);
      setDonationChart(d.data.data);
      setMemberGrowth(m.data.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const statCards = stats ? [
    { label: "Total Members",      value: stats.totalMembers.toLocaleString(),     sub: `+${stats.newMembersThisMonth} this month`, icon: Users,     color: "text-blue-600",    bg: "bg-blue-50",   up: stats.newMembersThisMonth > 0 },
    { label: "Total Donations",    value: fmt(stats.totalDonationAmount),          sub: `${stats.donationsThisMonth} this month`,   icon: IndianRupee,color: "text-green-600",  bg: "bg-green-50",  up: stats.donationsThisMonth > 0 },
    { label: "Active Volunteers",  value: stats.activeVolunteers.toLocaleString(), sub: "currently active",                          icon: UserCheck, color: "text-purple-600",  bg: "bg-purple-50", up: true },
    { label: "Upcoming Events",    value: stats.upcomingEvents.toString(),         sub: `${stats.totalEvents} total`,                icon: Calendar,  color: "text-saffron-600", bg: "bg-saffron-50",up: stats.upcomingEvents > 0 },
  ] : [];

  return (
    <div className="p-6 space-y-6">
      <Header title="Dashboard" subtitle="Welcome back, Admin 🙏" />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="card p-5 h-28 animate-pulse bg-gray-100 rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ label, value, sub, icon: Icon, color, bg, up }) => (
            <div key={label} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`${bg} p-2.5 rounded-xl`}><Icon size={20} className={color} /></div>
                {up ? <TrendingUp size={14} className="text-green-500" /> : <TrendingDown size={14} className="text-red-400" />}
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm font-medium text-gray-600 mt-0.5">{label}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Donations — Last 30 Days</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={donationChart}>
              <defs>
                <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ff6b00" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v) => v.slice(5)} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v >= 1000 ? v/1000+"K" : v}`} />
              <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Amount"]} />
              <Area type="monotone" dataKey="amount" stroke="#ff6b00" fill="url(#dg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Member Growth — Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={memberGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#8B0000" radius={[4, 4, 0, 0]} name="New Members" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Add Event",      href: "/events/new",   emoji: "📅", color: "bg-saffron-50 text-saffron-700 hover:bg-saffron-100" },
            { label: "View Members",   href: "/members",      emoji: "👥", color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
            { label: "All Donations",  href: "/donations",    emoji: "💰", color: "bg-green-50 text-green-700 hover:bg-green-100" },
            { label: "Publish News",   href: "/news/new",     emoji: "📰", color: "bg-purple-50 text-purple-700 hover:bg-purple-100" },
          ].map((a) => (
            <a key={a.label} href={a.href} className={`${a.color} rounded-xl p-4 text-center transition-colors cursor-pointer`}>
              <div className="text-2xl mb-1">{a.emoji}</div>
              <p className="text-sm font-semibold">{a.label}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
