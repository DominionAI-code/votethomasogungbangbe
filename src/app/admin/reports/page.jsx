"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  FileText,
  MapPin,
  User,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminGlobalReports() {
  // Use Nullish Coalescing to ensure reports is never undefined
  const reports = useCampaignStore((state) => state.reports) ?? [];

  return (
    <DashboardLayout roleTitle="Global Field Intelligence">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black italic uppercase">
            Field <span className="text-[#D4AF37]">Audits</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            Real-time reports from the 10 LGAs
          </p>
        </div>
        <div className="bg-[#D4AF37]/10 px-6 py-3 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37] font-black text-xs uppercase tracking-widest">
          {reports.length} Total Submissions
        </div>
      </div>

      <div className="space-y-5">
        {reports.length > 0 ? (
          reports.map((report, i) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i}
              className="bg-white p-6 rounded-[40px] border border-slate-100 shadow-sm hover:border-[#D4AF37]/40 transition-all flex flex-col md:flex-row items-center justify-between gap-6 group"
            >
              <div className="flex items-center gap-6 w-full">
                {/* Geotagged Photo Container */}
                <div className="w-20 h-20 bg-slate-50 rounded-[24px] overflow-hidden border border-slate-100 shrink-0">
                  {report.photo ? (
                    <img
                      src={report.photo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <FileText size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full uppercase">
                      {report.lga}
                    </span>
                    <span className="text-slate-200">•</span>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">
                      {report.ward}
                    </span>
                  </div>

                  <h4 className="font-black text-slate-900 text-xl leading-tight mb-2 group-hover:text-[#D4AF37] transition">
                    {report.taskTitle || "Field Activity Report"}
                  </h4>

                  <div className="flex flex-wrap items-center gap-6 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" /> Agent:{" "}
                      {report.volunteerName}
                    </span>
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-[#D4AF37]" />{" "}
                      Witness: {report.witnessName}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full md:w-auto p-5 bg-slate-50 rounded-2xl text-slate-400 hover:text-black hover:bg-[#D4AF37] transition-all group/btn flex items-center justify-center gap-2 font-black text-xs uppercase">
                <span className="md:hidden">View Full Audit</span>
                <ExternalLink size={20} />
              </button>
            </motion.div>
          ))
        ) : (
          <div className="py-32 text-center bg-white rounded-[60px] border border-dashed border-slate-200">
            <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">
              Awaiting Intel
            </h3>
            <p className="text-slate-400 text-xs font-bold italic mt-2">
              No field reports have been submitted from the districts yet.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
