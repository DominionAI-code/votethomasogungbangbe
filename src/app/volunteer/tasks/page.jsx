"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import { MapPin, ArrowRight, ClipboardList, Clock } from "lucide-react";
import Link from "next/link";

export default function VolunteerTaskList() {
  const { tasks, user } = useCampaignStore();

  // Filter tasks to show ALL tasks assigned to this agent's Ward/LGA
  const myTasks = (tasks || []).filter(
    (t) => t.lga === user?.lga && t.ward === user?.ward,
  );

  return (
    <DashboardLayout roleTitle="Mission Directory">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-black italic uppercase italic tracking-tighter">
            My <span className="text-[#D4AF37]">Assignments</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase mt-2 tracking-widest">
            Targeting: {user?.ward} in {user?.lga}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myTasks.map((task) => (
            <Link key={task.id} href={`/volunteer/tasks/${task.id}`}>
              <div className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#D4AF37]/40 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                    <ClipboardList size={20} />
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-full border ${
                      task.status === "Re-do"
                        ? "bg-red-50 text-red-600 border-red-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}
                  >
                    {task.status || "Pending"}
                  </span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-[#D4AF37] transition">
                  {task.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                  <Clock size={12} /> Deadline: {task.deadline}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">
                    Enter Field Report
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-slate-200 group-hover:text-[#D4AF37] group-hover:translate-x-2 transition-all"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
