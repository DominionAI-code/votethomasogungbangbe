"use client";
import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  Users,
  MapPin,
  CheckCircle,
  TrendingUp,
  Send,
  Activity,
  Clock,
  ChevronRight,
} from "lucide-react";
import { OSUN_EAST_MAP } from "@/lib/geoData";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { motion } from "framer-motion";

export default function CoordinatorDashboard() {
  const { user, volunteers, tasks, addTask, supporters } = useCampaignStore();
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  if (!user)
    return (
      <div className="min-h-screen bg-[#050a0a] flex items-center justify-center">
        <div className="animate-pulse text-[#D4AF37] font-black tracking-widest uppercase">
          Initializing Command...
        </div>
      </div>
    );

  // REAL-LIFE DATA SCOPING
  const myVolunteers = useMemo(
    () => (volunteers || []).filter((v) => v.lga === user.lga),
    [volunteers, user.lga],
  );
  const myTasks = useMemo(
    () => (tasks || []).filter((t) => t.lga === user.lga),
    [tasks, user.lga],
  );
  const mySupporters = useMemo(
    () => (supporters || []).filter((s) => s.lga === user.lga),
    [supporters, user.lga],
  );
  const myWards = OSUN_EAST_MAP[user.lga] || [];

  // Generate real-life chart data based on local volunteers
  const chartData = myWards.slice(0, 6).map((ward) => ({
    name: ward,
    count: myVolunteers.filter((v) => v.ward === ward).length,
  }));

  const handleDeployTask = () => {
    if (!taskTitle || !selectedWard)
      return alert("Please specify Mission and Ward.");
    addTask({
      title: taskTitle,
      ward: selectedWard,
      lga: user.lga,
      createdBy: user.name,
      createdAt: new Date().toISOString(),
    });
    setTaskTitle("");
    alert(`Deployment Successful for ${selectedWard}`);
  };

  return (
    <DashboardLayout roleTitle={`${user.lga} Command Hub`}>
      {/* SECTION 1: TOP-LEVEL INTELLIGENCE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Local Agents",
            val: myVolunteers.length,
            icon: Users,
            color: "text-[#D4AF37]",
            bg: "bg-[#D4AF37]/10",
          },
          {
            label: "Area Supporters",
            val: mySupporters.length,
            icon: Activity,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            label: "Open Missions",
            val: myTasks.filter((t) => t.status === "Pending").length,
            icon: Clock,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
          },
          {
            label: "LGA Readiness",
            val: "94%",
            icon: CheckCircle,
            color: "text-[#00c853]",
            bg: "bg-[#00c853]/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm group hover:border-[#D4AF37]/50 transition-all"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
            >
              <stat.icon size={24} />
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
              {stat.label}
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">
              {stat.val}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CONSTITUENCY PULSE CHART */}
        <div className="lg:col-span-8 bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black italic uppercase italic tracking-tighter">
              Mobilization <span className="text-[#D4AF37]">Density</span>
            </h3>
            <span className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded-full uppercase">
              By Ward
            </span>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  borderRadius: "20px",
                  border: "none",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#D4AF37"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorCount)"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* MISSION DEPLOYMENT */}
        <div className="lg:col-span-4 bg-slate-950 p-10 rounded-[48px] text-white shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center text-black shadow-lg shadow-[#D4AF37]/30">
                <Send size={20} />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                New Mission
              </h3>
            </div>
            <div className="space-y-4">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Mission Objective..."
                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] transition font-bold"
              />
              <select
                onChange={(e) => setSelectedWard(e.target.value)}
                className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none text-slate-400 font-black text-xs uppercase"
              >
                <option value="">Target Ward</option>
                {myWards.map((w) => (
                  <option key={w} value={w} className="bg-slate-900">
                    {w}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleDeployTask}
            className="w-full bg-[#D4AF37] text-black font-black py-5 rounded-2xl hover:bg-[#F9E29B] transition-all shadow-xl shadow-[#D4AF37]/20 mt-8 flex items-center justify-center gap-2 group"
          >
            DEPLOY MISSION{" "}
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition"
            />
          </button>
        </div>

        {/* AGENT ROSTER */}
        <div className="lg:col-span-12 bg-white p-10 rounded-[54px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10 border-b border-slate-50 pb-6">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">
              Regional <span className="text-[#D4AF37]">Agents</span>
            </h3>
            <button className="text-[10px] font-black bg-black text-white px-6 py-2 rounded-full uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition">
              Full Roster
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {myVolunteers.slice(0, 4).map((vol) => (
              <div
                key={vol.id}
                className="p-6 bg-slate-50 rounded-[32px] border border-transparent hover:border-[#D4AF37]/30 transition group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-black text-[#D4AF37] flex items-center justify-center font-black shadow-lg">
                    {vol.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 leading-tight">
                      {vol.name}
                    </p>
                    <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-tighter">
                      {vol.ward}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {vol.status || "Active"}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#00c853] animate-pulse" />
                </div>
              </div>
            ))}
            {myVolunteers.length === 0 && (
              <p className="col-span-full py-10 text-center text-slate-300 italic">
                Awaiting Agent Enrollment in {user.lga}...
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
