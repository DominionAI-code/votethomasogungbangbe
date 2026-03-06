"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  Clock,
  MoreHorizontal,
  Plus,
  ClipboardList,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CoordinatorTaskList() {
  const { user, tasks } = useCampaignStore();

  // Filter tasks strictly by the Coordinator's LGA
  const myTasks = (tasks || []).filter((t) => t.lga === user?.lga);

  return (
    <DashboardLayout roleTitle="Mission Monitoring">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Field <span className="text-[#D4AF37]">Missions</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] mt-2 tracking-[0.2em]">
            Deployment Registry for {user?.lga}
          </p>
        </div>
        <Link
          href="/coordinator/tasks/new"
          className="bg-black text-[#D4AF37] px-8 py-4 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl"
        >
          <Plus size={16} /> New Deployment
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {myTasks.length > 0 ? (
          myTasks.map((task) => {
            // Dynamic Status Logic
            const isCompleted = task.status === "Completed";
            const isRedo = task.status === "Re-do";

            return (
              <motion.div
                layout
                key={task.id}
                className={`bg-white p-8 rounded-[48px] border flex flex-col md:flex-row justify-between items-center group transition-all duration-300 ${
                  isCompleted
                    ? "border-emerald-100 shadow-emerald-500/5"
                    : "border-slate-100 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-6 w-full">
                  <div
                    className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-500"
                        : "bg-slate-50 text-slate-300 group-hover:bg-[#D4AF37] group-hover:text-black"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={28} />
                    ) : (
                      <ClipboardList size={28} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-black text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full uppercase tracking-tighter">
                        {task.ward}
                      </span>
                      <span className="text-slate-200">•</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={12} /> Deadline: {task.deadline}
                      </span>
                    </div>
                    <h4
                      className={`text-xl font-black transition ${isCompleted ? "text-slate-400 line-through" : "text-slate-900"}`}
                    >
                      {task.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-6 md:mt-0 w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-10">
                  <div className="flex flex-col items-start md:items-end">
                    <span
                      className={`text-[10px] font-black uppercase px-4 py-1.5 rounded-full border ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : isRedo
                            ? "bg-red-50 text-red-600 border-red-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {task.status || "Pending"}
                    </span>
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">
                      Live Status
                    </span>
                  </div>
                  <button className="p-5 bg-slate-50 rounded-[20px] text-slate-400 hover:bg-black hover:text-[#D4AF37] transition-all">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-32 text-center bg-white rounded-[60px] border border-dashed border-slate-200 shadow-inner text-slate-300 uppercase italic font-black">
            No missions found for {user?.lga}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
