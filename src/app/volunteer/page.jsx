"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  MapPin,
  ArrowRight,
  ClipboardList,
  ShieldCheck,
  AlertCircle,
  Activity,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VolunteerDashboard() {
  const tasks = useCampaignStore((state) => state.tasks) ?? [];
  const user = useCampaignStore((state) => state.user);

  if (!user)
    return (
      <div className="p-20 text-center text-[#D4AF37] font-black uppercase">
        Initializing Command...
      </div>
    );

  // Real-life scoping: Match tasks to the user's assigned zone
  const myTasks = tasks.filter(
    (t) => t?.lga === user?.lga && t?.ward === user?.ward,
  );

  return (
    <DashboardLayout roleTitle="Field Command Hub">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* AGENT IDENTITY PASS */}
        <div className="bg-black rounded-[40px] p-8 text-white relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 p-10 opacity-10 text-[#D4AF37]">
            <ShieldCheck size={120} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-lg shadow-[#D4AF37]/20">
                {user?.name?.charAt(0)}
              </div>
              <div>
                <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.3em]">
                  Verified Field Agent
                </p>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter">
                  {user?.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                  Deployment Zone
                </p>
                <div className="flex items-center gap-2 text-sm font-bold uppercase italic text-[#D4AF37]">
                  <MapPin size={14} /> {user?.lga} • {user?.ward}
                </div>
              </div>
              <div>
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">
                  Personnel ID
                </p>
                <div className="text-sm font-bold text-white uppercase tracking-tighter">
                  DAI-{user?.id?.toString().slice(-5)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION FEED */}
        <div>
          <h3 className="text-xl font-black text-slate-900 uppercase italic mb-6 flex items-center gap-2">
            <Activity className="text-[#D4AF37]" /> Mission Log
          </h3>

          <div className="space-y-4">
            {myTasks.length > 0 ? (
              myTasks.map((task) => {
                const isRedo = task.status === "Re-do";
                const isCompleted = task.status === "Completed";

                return (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    key={task.id}
                  >
                    <Link href={`/volunteer/tasks/${task.id}`}>
                      <div
                        className={`p-8 rounded-[48px] border transition-all group relative overflow-hidden bg-white ${
                          isRedo
                            ? "border-red-200 shadow-lg shadow-red-500/5"
                            : "border-slate-100 shadow-sm"
                        }`}
                      >
                        {/* REDO OVERLAY DECORATION */}
                        {isRedo && (
                          <div className="absolute top-0 right-0 p-6 text-red-100">
                            <RotateCcw size={40} />
                          </div>
                        )}

                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <div
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                              isRedo
                                ? "bg-red-50 text-red-500"
                                : "bg-slate-50 text-slate-300 group-hover:bg-[#D4AF37] group-hover:text-black"
                            }`}
                          >
                            {isRedo ? (
                              <AlertCircle size={24} />
                            ) : (
                              <ClipboardList size={24} />
                            )}
                          </div>

                          <div className="text-right">
                            <span
                              className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full border ${
                                isRedo
                                  ? "bg-red-50 text-red-600 border-red-100 animate-pulse"
                                  : isCompleted
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                    : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}
                            >
                              {task.status || "Pending"}
                            </span>
                            {isRedo && (
                              <p className="text-[8px] font-black text-red-400 uppercase mt-2">
                                New Deadline: {task.deadline}
                              </p>
                            )}
                          </div>
                        </div>

                        <h4
                          className={`text-xl font-black mb-1 leading-tight transition ${
                            isRedo
                              ? "text-red-900"
                              : "text-slate-900 group-hover:text-[#D4AF37]"
                          }`}
                        >
                          {task.title}
                        </h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                          {isRedo
                            ? "Action Required: Resubmit Report"
                            : "Target: Field Location"}
                        </p>

                        <div
                          className={`flex items-center justify-between pt-6 border-t ${isRedo ? "border-red-50" : "border-slate-50"}`}
                        >
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest ${isRedo ? "text-red-600" : "text-[#D4AF37]"}`}
                          >
                            {isRedo
                              ? "Correct and Resubmit"
                              : isCompleted
                                ? "View Submission"
                                : "Open Mission Form"}
                          </span>
                          <ArrowRight
                            className={`w-5 h-5 transition-all ${
                              isRedo
                                ? "text-red-300 group-hover:translate-x-2"
                                : "text-slate-200 group-hover:text-[#D4AF37] group-hover:translate-x-2"
                            }`}
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <div className="py-24 text-center bg-white rounded-[60px] border border-dashed border-slate-200">
                <ClipboardList className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-300 uppercase italic">
                  Standby Status
                </h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-2 px-12 italic">
                  No active missions deployed for {user?.ward}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
