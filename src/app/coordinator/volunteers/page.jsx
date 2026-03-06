"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  User,
  Phone,
  MapPin,
  Search,
  Mail,
  Home,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CoordinatorVolunteerList() {
  const allVolunteers = useCampaignStore((state) => state.volunteers) ?? [];
  const user = useCampaignStore((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  if (!user) {
    return (
      <DashboardLayout roleTitle="Loading Command...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
        </div>
      </DashboardLayout>
    );
  }

  // Real-Time Data Scoping: Locked to Coordinator's LGA
  const myTeam = allVolunteers.filter(
    (vol) =>
      vol?.lga === user?.lga &&
      vol?.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <DashboardLayout roleTitle={`Field Intelligence: ${user?.lga}`}>
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Regional <span className="text-[#D4AF37]">Agents</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
            Managing {myTeam.length} Active Personnel in {user.lga}
          </p>
        </div>

        {/* Dynamic Search Interface */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5 group-focus-within:text-[#D4AF37] transition-colors" />
          <input
            type="text"
            placeholder="Search agents by name..."
            className="w-full bg-white border border-slate-200 py-4 px-12 rounded-[20px] focus:ring-2 focus:ring-[#D4AF37] border-transparent outline-none transition-all shadow-sm font-bold text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* VOLUNTEER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {myTeam.map((vol) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={vol.id}
              className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#D4AF37]/30 transition-all group relative overflow-hidden"
            >
              {/* PVC Badge Overlay */}
              <div className="absolute top-6 right-6">
                {vol.hasVotersCard ? (
                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-emerald-100">
                    <CreditCard size={12} /> PVC Verified
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-red-50 text-red-400 px-3 py-1 rounded-full text-[9px] font-black uppercase border border-red-100">
                    <CreditCard size={12} /> No PVC
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-black rounded-[24px] flex items-center justify-center text-[#D4AF37] font-black text-2xl shadow-lg shadow-[#D4AF37]/10 group-hover:scale-110 transition-transform">
                  {vol.name?.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 leading-tight">
                    {vol.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[#D4AF37] font-black text-[10px] uppercase tracking-widest mt-1">
                    <MapPin size={12} /> {vol.ward}
                  </div>
                </div>
              </div>

              <div className="space-y-4 py-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-600 text-xs font-bold">
                  <Phone size={16} className="text-slate-300" /> {vol.phone}
                </div>
                <div className="flex items-center gap-3 text-slate-600 text-xs font-bold">
                  <Mail size={16} className="text-slate-300" /> {vol.email}
                </div>
                <div className="flex items-start gap-3 text-slate-400 text-[11px] font-medium italic leading-relaxed">
                  <Home size={16} className="text-slate-200 shrink-0" />{" "}
                  {vol.homeAddress || "Address not provided"}
                </div>
              </div>

              <button className="w-full mt-8 py-5 bg-slate-50 text-slate-900 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2 group/btn">
                View Performance Analytics{" "}
                <ChevronRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition"
                />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* EMPTY STATE */}
        {myTeam.length === 0 && (
          <div className="col-span-full py-32 text-center bg-white rounded-[60px] border border-dashed border-slate-200">
            <User className="w-20 h-20 text-slate-100 mx-auto mb-6" />
            <h3 className="text-2xl font-black text-slate-300 uppercase italic tracking-tighter">
              No Agents Located
            </h3>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-2">
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : `Your team in ${user.lga} is currently empty.`}
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
