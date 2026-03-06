"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  UserCheck,
  Phone,
  MapPin,
  Shield,
  Home,
  CreditCard,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminCoordinatorList() {
  const { coordinators, volunteers } = useCampaignStore();

  // Dynamic coverage calculation
  const uniqueLGAs = [...new Set(coordinators.map((c) => c.lga))];
  const coverageCount = uniqueLGAs.length;

  return (
    <DashboardLayout roleTitle="Osun-East Regional Leads">
      {/* HEADER STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <MapPin size={80} />
          </div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
            Total LGAs Covered
          </p>
          <h3 className="text-4xl font-black text-[#D4AF37] mt-2">
            {coverageCount}{" "}
            <span className="text-slate-200 text-xl italic font-medium">
              / 10
            </span>
          </h3>
        </motion.div>
      </div>

      {/* COORDINATOR TABLE */}
      <div className="bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Coordinator Info
                </th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Assigned LGA
                </th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Residential Info
                </th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  PVC Status
                </th>
                <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Team Stats
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {coordinators.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  {/* Coordinator Basic Info */}
                  <td className="p-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-base">
                          {c.name}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase mt-1">
                          <Mail size={12} className="text-[#D4AF37]" />{" "}
                          {c.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* LGA Badge */}
                  <td className="p-8 text-center">
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter border border-[#D4AF37]/20">
                      {c.lga}
                    </span>
                  </td>

                  {/* NEW: Residential Info */}
                  <td className="p-8">
                    <div className="flex flex-col gap-1 max-w-[200px]">
                      <div className="flex items-start gap-2 text-slate-600 text-xs font-medium italic">
                        <Home
                          size={14}
                          className="text-slate-300 shrink-0 mt-0.5"
                        />
                        {c.homeAddress || "No Address Provided"}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase ml-5">
                        <Phone size={12} /> {c.phone}
                      </div>
                    </div>
                  </td>

                  {/* NEW: PVC Status Indicator */}
                  <td className="p-8 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`p-2 rounded-xl ${c.hasVotersCard ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                      >
                        <CreditCard size={18} />
                      </div>
                      <span
                        className={`text-[9px] font-black uppercase ${c.hasVotersCard ? "text-emerald-700" : "text-red-700"}`}
                      >
                        {c.hasVotersCard ? "Verified Voter" : "No PVC"}
                      </span>
                    </div>
                  </td>

                  {/* Team Stats */}
                  <td className="p-8 text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className="text-xl font-black text-slate-900">
                        {volunteers.filter((v) => v.lga === c.lga).length}
                      </span>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Total Volunteers
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {coordinators.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
              <UserCheck size={32} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest italic">
              No Regional Leads Found
            </h3>
            <p className="text-slate-400 text-xs mt-2 font-medium">
              Head over to 'Add Coordinator' to begin staffing the district.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
