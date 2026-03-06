"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { CheckCircle, Info, Upload } from "lucide-react";

export default function ElectionMonitoringAgent() {
  const [votes, setVotes] = useState({ partyA: "", partyB: "", partyC: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout roleTitle="Polling Unit Reporting">
      <div className="max-w-md mx-auto">
        {submitted ? (
          <div className="bg-[#00c853]/10 p-10 rounded-[40px] text-center border border-[#00c853]/20">
            <CheckCircle className="w-16 h-16 text-[#00c853] mx-auto mb-4" />
            <h3 className="text-xl font-black text-white">
              Results Transmitted
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Verified and added to the central tally.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-start space-x-3">
              <Info className="text-amber-500 w-5 h-5 mt-1" />
              <p className="text-xs text-amber-200">
                Ensure values match the official EC8A form before submitting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-sm space-y-6">
              <div>
                <label className="text-xs font-black text-slate-400 uppercase">
                  Party A (VOTE THOMAS)
                </label>
                <input
                  type="number"
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl mt-2 text-2xl font-black"
                  onChange={(e) =>
                    setVotes({ ...votes, partyA: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="text-xs font-black text-slate-400 uppercase">
                  Party B
                </label>
                <input
                  type="number"
                  className="w-full bg-slate-50 border-none p-4 rounded-2xl mt-2 text-2xl font-black"
                  onChange={(e) =>
                    setVotes({ ...votes, partyB: e.target.value })
                  }
                  required
                />
              </div>

              <div className="pt-4">
                <label className="text-xs font-black text-slate-400 uppercase">
                  Upload EC8A Photo
                </label>
                <div className="mt-2 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center">
                  <Upload className="mx-auto text-slate-300 mb-2" />
                  <p className="text-[10px] text-slate-400">
                    Click to upload result sheet image
                  </p>
                  <input type="file" className="hidden" />
                </div>
              </div>
            </div>

            <button className="w-full bg-[#00c853] text-black font-black py-5 rounded-2xl shadow-xl shadow-[#00c853]/20">
              SUBMIT OFFICIAL TALLY
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
