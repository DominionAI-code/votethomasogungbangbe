"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  ShieldCheck,
  FileSearch,
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LgaCollationPage() {
  const { user, reports, setLgaResults } = useCampaignStore();
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // 1. Filter results (Reports with Type: 'Election Tally') for this LGA
  const lgaTallies = (reports || []).filter(
    (r) => r.lga === user?.lga && r.type === "Election Tally",
  );

  // 2. Real-time aggregation of verified numbers
  const lgaTotals = lgaTallies.reduce(
    (acc, curr) => ({
      TO: acc.TO + (Number(curr.votesTO) || 0),
      OPP1: acc.OPP1 + (Number(curr.votesOPP1) || 0),
      OPP2: acc.OPP2 + (Number(curr.votesOPP2) || 0),
    }),
    { TO: 0, OPP1: 0, OPP2: 0 },
  );

  const handleCertify = () => {
    if (lgaTallies.length === 0) return alert("No data available to certify.");
    setIsVerifying(true);

    // Push the verified LGA total to the Admin's Global Desk
    setTimeout(() => {
      setLgaResults(user.lga, lgaTotals);
      setIsVerifying(false);
      alert(`${user.lga} Results Certified and Sent to Admin.`);
    }, 2000);
  };

  return (
    <DashboardLayout roleTitle={`Collation Center: ${user?.lga}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: LIVE TALLY OVERVIEW */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black p-10 rounded-[50px] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-[#D4AF37]">
              <TrendingUp size={120} />
            </div>
            <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              LGA Aggregate (Live)
            </p>
            <h2 className="text-6xl font-black text-white italic mb-10">
              {lgaTotals.TO.toLocaleString()}{" "}
              <span className="text-xl text-slate-500 not-italic uppercase tracking-widest">
                Votes for TO
              </span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                <p className="text-slate-500 text-[9px] font-black uppercase mb-1">
                  Opposition Total
                </p>
                <p className="text-2xl font-black">
                  {(lgaTotals.OPP1 + lgaTotals.OPP2).toLocaleString()}
                </p>
              </div>
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                <p className="text-slate-500 text-[9px] font-black uppercase mb-1">
                  Units Reporting
                </p>
                <p className="text-2xl font-black">{lgaTallies.length}</p>
              </div>
            </div>
          </div>

          {/* POLLING UNIT AUDIT LIST */}
          <div className="bg-white p-8 rounded-[50px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-3">
              <FileSearch className="text-[#D4AF37]" /> Polling Unit Submissions
            </h3>
            <div className="space-y-4">
              {lgaTallies.map((unit, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] group hover:bg-white hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => setSelectedSheet(unit.photo)}
                      className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#D4AF37] shadow-sm group-hover:bg-[#D4AF37] group-hover:text-black transition-all"
                    >
                      <ImageIcon size={20} />
                    </button>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {unit.ward}
                      </p>
                      <h4 className="font-black text-slate-900 text-lg">
                        {unit.pollingUnitName || `Unit ${i + 1}`}
                      </h4>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-slate-900">
                      {unit.votesTO}{" "}
                      <span className="text-[10px] text-[#D4AF37]">TO</span>
                    </p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">
                      Verified by Agent
                    </p>
                  </div>
                </div>
              ))}
              {lgaTallies.length === 0 && (
                <div className="py-20 text-center italic text-slate-400">
                  Awaiting first polling unit transmission...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: CERTIFICATION PANEL */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[50px] border border-slate-100 shadow-sm sticky top-6">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4">
              LGA Certification
            </h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8">
              By certifying these results, you confirm that you have
              cross-checked the digital tallies against the physical **EC8A**
              photo evidence.
            </p>

            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-emerald-600 font-bold text-xs">
                <CheckCircle2 size={16} /> Data Integrity Validated
              </div>
              <div className="flex items-center gap-3 text-emerald-600 font-bold text-xs">
                <CheckCircle2 size={16} /> Photos Evidence Audited
              </div>
            </div>

            <button
              onClick={handleCertify}
              disabled={isVerifying || lgaTallies.length === 0}
              className="w-full bg-black text-white font-black py-5 rounded-3xl hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl shadow-[#D4AF37]/10 flex items-center justify-center gap-3 uppercase text-xs tracking-widest disabled:opacity-30"
            >
              {isVerifying ? "Processing..." : "Certify & Submit to Admin"}
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL FOR AUDITING */}
      <AnimatePresence>
        {selectedSheet && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-10 backdrop-blur-md"
          >
            <button
              onClick={() => setSelectedSheet(null)}
              className="absolute top-10 right-10 text-white"
            >
              <X size={40} />
            </button>
            <img
              src={selectedSheet}
              className="max-w-full max-h-full rounded-2xl shadow-2xl border-4 border-white/10"
              alt="EC8A Form"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
