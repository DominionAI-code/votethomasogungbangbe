"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  Vote,
  ShieldCheck,
  RefreshCcw,
  TrendingUp,
  BarChart3,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

const OSUN_EAST_LGAS = [
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

export default function AdminResultsMaster() {
  const { results, setLgaResults } = useCampaignStore();
  const [selectedLga, setSelectedLga] = useState(OSUN_EAST_LGAS[0]);
  const [isPublishing, setIsPublishing] = useState(false);

  // Local state for input fields
  const [votes, setVotes] = useState({ TO: 0, OPP1: 0, OPP2: 0 });

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsPublishing(true);

    // Simulate secure "push" to public site
    setTimeout(() => {
      setLgaResults(selectedLga, votes);
      setIsPublishing(false);
      alert(`${selectedLga} results updated and published live!`);
    }, 1500);
  };

  // Calculate Global Totals for the Header Stats
  const totalVotes = Object.values(results ?? {}).reduce(
    (acc, curr) => ({
      TO: acc.TO + (curr.TO || 0),
      OPP1: acc.OPP1 + (curr.OPP1 || 0),
      OPP2: acc.OPP2 + (curr.OPP2 || 0),
    }),
    { TO: 0, OPP1: 0, OPP2: 0 },
  );

  return (
    <DashboardLayout roleTitle="Electoral Command Center">
      {/* GLOBAL TALLY HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-black p-8 rounded-[40px] border border-[#D4AF37]/30 shadow-2xl">
          <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest mb-2">
            Total Votes (TO)
          </p>
          <h3 className="text-4xl font-black text-white italic">
            {totalVotes.TO.toLocaleString()}
          </h3>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
            Total Opposition
          </p>
          <h3 className="text-4xl font-black text-slate-900 italic">
            {(totalVotes.OPP1 + totalVotes.OPP2).toLocaleString()}
          </h3>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
            LGA Coverage
          </p>
          <h3 className="text-4xl font-black text-slate-900 italic">
            {Object.keys(results ?? {}).length} / 10
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* INPUT PANEL: FETCH REAL RESULTS */}
        <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-black rounded-2xl text-[#D4AF37]">
              <Vote size={24} />
            </div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              Result Entry
            </h2>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
                Select LGA Source
              </label>
              <select
                className="w-full p-5 bg-slate-50 rounded-3xl outline-none font-black text-xs border border-transparent focus:border-[#D4AF37] transition-all"
                value={selectedLga}
                onChange={(e) => setSelectedLga(e.target.value)}
              >
                {OSUN_EAST_LGAS.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-slate-50 rounded-[32px] border-l-4 border-[#D4AF37]">
                <p className="text-[10px] font-black text-[#D4AF37] uppercase mb-2">
                  VOTE THOMAS (TO)
                </p>
                <input
                  type="number"
                  className="w-full bg-transparent text-3xl font-black outline-none"
                  value={votes.TO}
                  onChange={(e) =>
                    setVotes({ ...votes, TO: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="p-6 bg-slate-50 rounded-[32px] border-l-4 border-blue-500">
                <p className="text-[10px] font-black text-blue-500 uppercase mb-2">
                  Opposition A
                </p>
                <input
                  type="number"
                  className="w-full bg-transparent text-3xl font-black outline-none"
                  value={votes.OPP1}
                  onChange={(e) =>
                    setVotes({ ...votes, OPP1: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
              <div className="p-6 bg-slate-50 rounded-[32px] border-l-4 border-slate-400">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                  Opposition B
                </p>
                <input
                  type="number"
                  className="w-full bg-transparent text-3xl font-black outline-none"
                  value={votes.OPP2}
                  onChange={(e) =>
                    setVotes({ ...votes, OPP2: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>

            <button
              disabled={isPublishing}
              className={`w-full py-5 rounded-3xl font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${isPublishing ? "bg-slate-100 text-slate-400" : "bg-black text-white hover:bg-[#D4AF37] hover:text-black shadow-xl shadow-[#D4AF37]/10"}`}
            >
              {isPublishing ? (
                <RefreshCcw className="animate-spin" />
              ) : (
                <Lock size={16} />
              )}
              {isPublishing
                ? "Pushing Live..."
                : "Publish Tally to Public Site"}
            </button>
          </form>
        </div>

        {/* PERFORMANCE OVERVIEW */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[50px] border border-slate-100 shadow-sm h-full">
            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-2">
              <BarChart3 className="text-[#D4AF37]" /> LGA Tally Board
            </h3>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4">
              {OSUN_EAST_LGAS.map((lga) => {
                const lgaResult = results?.[lga] || { TO: 0, OPP1: 0, OPP2: 0 };
                const lgaTotal = lgaResult.TO + lgaResult.OPP1 + lgaResult.OPP2;
                const winPercent =
                  lgaTotal > 0
                    ? Math.round((lgaResult.TO / lgaTotal) * 100)
                    : 0;

                return (
                  <div
                    key={lga}
                    className="p-6 bg-slate-50 rounded-[32px] group hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-black text-sm uppercase tracking-widest">
                        {lga}
                      </h4>
                      <span
                        className={`text-xs font-black ${winPercent >= 50 ? "text-[#D4AF37]" : "text-slate-400"}`}
                      >
                        {winPercent}% Lead
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37] transition-all duration-1000"
                        style={{ width: `${winPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] font-black uppercase opacity-60">
                      <span>TO: {lgaResult.TO.toLocaleString()}</span>
                      <span>Total: {lgaTotal.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
