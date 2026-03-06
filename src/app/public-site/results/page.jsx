"use client";
import React from "react";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import { useCampaignStore } from "@/lib/store";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  MapPin,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

export default function LiveResultsPortal() {
  // 1. Fetch Real-Time Results from the Admin's Command
  const { results } = useCampaignStore();

  // 2. Calculate Global Aggregates from all 10 LGAs
  const lgaEntries = Object.values(results ?? {});

  const aggregated = lgaEntries.reduce(
    (acc, curr) => ({
      TO: acc.TO + (Number(curr.TO) || 0),
      OPP1: acc.OPP1 + (Number(curr.OPP1) || 0),
      OPP2: acc.OPP2 + (Number(curr.OPP2) || 0),
    }),
    { TO: 0, OPP1: 0, OPP2: 0 },
  );

  const totalGlobalVotes = aggregated.TO + aggregated.OPP1 + aggregated.OPP2;
  const reportingLGAs = Object.keys(results ?? {}).length;

  // 3. Define Party Data for Display
  const parties = [
    {
      name: "DR. THOMAS OGUNGBANGBE (TO)",
      votes: aggregated.TO,
      color: "bg-[#D4AF37]",
      percent:
        totalGlobalVotes > 0
          ? Math.round((aggregated.TO / totalGlobalVotes) * 100)
          : 0,
    },
    {
      name: "OPPOSITION PARTY A",
      votes: aggregated.OPP1,
      color: "bg-blue-600",
      percent:
        totalGlobalVotes > 0
          ? Math.round((aggregated.OPP1 / totalGlobalVotes) * 100)
          : 0,
    },
    {
      name: "OPPOSITION PARTY B",
      votes: aggregated.OPP2,
      color: "bg-slate-600",
      percent:
        totalGlobalVotes > 0
          ? Math.round((aggregated.OPP2 / totalGlobalVotes) * 100)
          : 0,
    },
  ];

  return (
    <div className="bg-[#050a0a] min-h-screen text-white font-sans">
      <PublicNavbar />

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* LIVE HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-3 text-[#D4AF37] mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Live Election Collation Center
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-none">
              REAL-TIME <span className="text-[#D4AF37]">TALLY</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-8 text-left bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-md">
            <div>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                LGAs Reporting
              </p>
              <p className="text-3xl font-black text-[#D4AF37] italic">
                {reportingLGAs}{" "}
                <span className="text-white/20 text-sm">/ 10</span>
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                Total Valid Cast
              </p>
              <p className="text-3xl font-black text-white italic">
                {(totalGlobalVotes / 1000).toFixed(1)}k
              </p>
            </div>
          </div>
        </div>

        {/* MAIN RESULTS VISUALIZATION */}
        <div className="space-y-12 bg-white/5 p-12 rounded-[60px] border border-white/10 shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <BarChart3 size={200} />
          </div>

          {parties.map((party, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex justify-between items-end mb-5">
                <div>
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter mb-1">
                    {party.name}
                  </h3>
                  <p
                    className={`${i === 0 ? "text-[#D4AF37]" : "text-slate-500"} font-bold text-sm uppercase tracking-widest`}
                  >
                    {party.votes.toLocaleString()} Certified Votes
                  </p>
                </div>
                <span
                  className={`text-4xl font-black italic ${i === 0 ? "text-[#D4AF37]" : "text-white"}`}
                >
                  {party.percent}%
                </span>
              </div>
              <div className="w-full h-5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${party.percent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={`h-full ${party.color} rounded-full shadow-[0_0_15px_rgba(212,175,55,0.3)]`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* VERIFICATION FOOTER */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[40px] flex items-center space-x-6">
            <div className="bg-[#D4AF37] p-3 rounded-2xl text-black">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">
                Integrity Guard
              </p>
              <p className="text-xs text-slate-400 font-bold mt-1">
                All data points are cross-verified by regional coordinators and
                polling unit agents.
              </p>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-[40px] flex items-center space-x-6">
            <div className="bg-white/10 p-3 rounded-2xl text-white">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-widest">
                Constituency Wide
              </p>
              <p className="text-xs text-slate-400 font-bold mt-1">
                Live streams from all 10 Local Government Areas in Osun-East.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
