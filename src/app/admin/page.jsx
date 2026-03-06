"use client";
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  MapPin,
  Activity,
  ShieldCheck,
  Heart,
  TrendingUp,
} from "lucide-react";

export default function AdminAnalytics() {
  // 1. Fetch Real-Time Data from Store
  const volunteers = useCampaignStore((state) => state.volunteers) ?? [];
  const supporters = useCampaignStore((state) => state.supporters) ?? [];
  const reports = useCampaignStore((state) => state.reports) ?? [];
  const coordinators = useCampaignStore((state) => state.coordinators) ?? [];

  // 2. Real Performance Calculations for Osun-East LGAs
  const osunEastLGAs = [
    "Ife Central",
    "Ife East",
    "Ife North",
    "Ife South",
    "Ilesa East",
    "Ilesa West",
    "Atakunmosa East",
    "Atakunmosa West",
    "Obokun",
    "Oriade",
  ];

  const lgaData = osunEastLGAs.map((lga) => ({
    name: lga.split(" ")[0], // Shorten name for chart
    val:
      volunteers.filter((v) => v.lga === lga).length +
      supporters.filter((s) => s.lga === lga).length,
  }));

  const stats = [
    {
      label: "Total Supporters",
      value: supporters.length.toLocaleString(),
      icon: Heart,
      color: "text-[#D4AF37]",
      bg: "bg-[#D4AF37]/10",
    },
    {
      label: "Field Agents",
      value: volunteers.length,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "LGA Leads",
      value: `${coordinators.length}/10`,
      icon: Activity,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      label: "Audit Reports",
      value: reports.length,
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <DashboardLayout roleTitle="Constituency Command Center">
      {/* 3. Real-Time Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6`}
            >
              <stat.icon className="w-7 h-7" />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              {stat.label}
            </p>
            <h3 className="text-4xl font-black text-slate-900 mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 4. REAL GROWTH CHART (Supporters) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black italic uppercase tracking-tighter">
              Mobilization Growth
            </h3>
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold">
              <TrendingUp size={14} /> Live Sync
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={lgaData}>
              <defs>
                <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: "bold" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "24px",
                  border: "none",
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  fontWeight: "bold",
                }}
              />
              <Area
                type="monotone"
                dataKey="val"
                stroke="#D4AF37"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorGold)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 5. LGA PERFORMANCE TABLE */}
        <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8 text-[#D4AF37]">
            Top LGAs
          </h3>
          <div className="space-y-6">
            {lgaData
              .sort((a, b) => b.val - a.val)
              .slice(0, 5)
              .map((lga, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-xs text-slate-400 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors">
                      {i + 1}
                    </div>
                    <span className="font-bold text-slate-700">{lga.name}</span>
                  </div>
                  <span className="text-sm font-black bg-slate-50 px-3 py-1 rounded-full">
                    {lga.val}{" "}
                    <span className="text-[8px] uppercase opacity-50 ml-1">
                      Total
                    </span>
                  </span>
                </div>
              ))}

            {supporters.length === 0 && (
              <div className="text-center py-10">
                <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                  Awaiting Data Entry
                </p>
              </div>
            )}
          </div>
          <button className="w-full mt-10 py-4 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition">
            View Full District Report
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
