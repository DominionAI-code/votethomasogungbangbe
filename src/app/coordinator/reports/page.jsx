"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  Check,
  X,
  UserCheck,
  MapPin,
  Calendar,
  FileText,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

export default function CoordinatorReportReview() {
  const { user, reports, updateTaskStatus, tasks } = useCampaignStore();
  const [selectedReport, setSelectedReport] = useState(null);

  // Filter for reports in this Coordinator's LGA that are awaiting audit
  const myReports = (reports || []).filter(
    (r) => r.lga === user?.lga && r.status === "Pending Review",
  );

  const handleAction = (report, action) => {
    if (action === "Accept") {
      updateTaskStatus(report.taskId, "Completed");
      alert("Intelligence Verified. Mission marked as Completed.");
    } else {
      const reason = prompt("Reason for rejection:");
      const newDeadline = prompt("Enter new deadline for Re-do (YYYY-MM-DD):");
      updateTaskStatus(report.taskId, "Re-do", newDeadline);
      alert(`Mission rejected. Agent notified to re-submit by ${newDeadline}.`);
    }
    // Mark the report as reviewed locally to clear the queue
    report.status = "Reviewed";
    setSelectedReport(null);
  };

  return (
    <DashboardLayout roleTitle="Intelligence Audit">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: INCOMING FEED */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xl font-black italic uppercase tracking-tighter mb-6">
            Pending <span className="text-[#D4AF37]">Verifications</span>
          </h2>
          {myReports.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedReport(r)}
              className={`p-6 rounded-[32px] border cursor-pointer transition-all ${
                selectedReport?.id === r.id
                  ? "bg-black text-white border-black shadow-xl shadow-black/20"
                  : "bg-white border-slate-100 hover:border-[#D4AF37]"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`text-[8px] font-black px-3 py-1 rounded-full uppercase ${
                    selectedReport?.id === r.id
                      ? "bg-[#D4AF37] text-black"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {r.ward}
                </span>
                <span className="text-[8px] font-bold opacity-50">
                  {new Date(r.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <h4 className="font-black text-sm leading-tight mb-2">
                {r.taskTitle}
              </h4>
              <p
                className={`text-[10px] font-bold uppercase ${selectedReport?.id === r.id ? "text-[#D4AF37]" : "text-slate-400"}`}
              >
                Agent: {r.volunteerName}
              </p>
            </div>
          ))}
          {myReports.length === 0 && (
            <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
              <ShieldAlert className="mx-auto text-slate-200 mb-2" />
              <p className="text-slate-400 text-xs font-bold uppercase">
                No reports awaiting audit
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: AUDIT DETAIL PANEL */}
        <div className="lg:col-span-8">
          {selectedReport ? (
            <div className="bg-white p-10 rounded-[50px] border border-slate-100 shadow-sm sticky top-6">
              <div className="flex justify-between items-start mb-10 pb-6 border-b border-slate-50">
                <div>
                  <h3 className="text-2xl font-black italic uppercase">
                    {selectedReport.taskTitle}
                  </h3>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">
                    Submitted by {selectedReport.volunteerName} •{" "}
                    {selectedReport.ward}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(selectedReport, "Reject")}
                    className="p-4 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                  <button
                    onClick={() => handleAction(selectedReport, "Accept")}
                    className="p-4 bg-[#00c853] text-white rounded-2xl hover:bg-black transition-all shadow-lg shadow-[#00c853]/20"
                  >
                    <Check size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Textual Intelligence */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} /> Field Note
                    </label>
                    <div className="p-6 bg-slate-50 rounded-3xl text-sm font-medium leading-relaxed italic text-slate-700">
                      "{selectedReport.note}"
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <UserCheck size={14} /> Witness Credentials
                    </label>
                    <div className="p-6 border border-slate-100 rounded-3xl">
                      <p className="text-sm font-black text-slate-900">
                        {selectedReport.witnessName}
                      </p>
                      <p className="text-xs font-bold text-[#D4AF37] mt-1">
                        {selectedReport.witnessPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Evidence Gallery */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <MapPin size={14} /> Evidence Gallery
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedReport.evidence?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-full h-32 object-cover rounded-2xl border border-slate-100 hover:scale-105 transition-transform cursor-zoom-in"
                        alt="Field Evidence"
                        onClick={() => window.open(img, "_blank")}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[60px] text-slate-300">
              <ChevronRight size={48} className="mb-4 opacity-20" />
              <p className="font-black uppercase tracking-widest italic text-sm">
                Select Intelligence Log to Audit
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
