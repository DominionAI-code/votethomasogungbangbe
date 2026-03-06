"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import { Phone, MapPin, UserCheck, Mail } from "lucide-react";

export default function CoordinatorSupporterList() {
  const { user, supporters } = useCampaignStore();

  // Strict LGA Filter
  const mySupporters = (supporters || []).filter((s) => s.lga === user?.lga);

  return (
    <DashboardLayout roleTitle={`Mobilization: ${user?.lga}`}>
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">
            Local <span className="text-[#D4AF37]">Supporters</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase text-[10px] mt-2 tracking-widest">
            Total mobilized in {user?.lga}: {mySupporters.length}
          </p>
        </div>
        <div className="bg-black text-[#D4AF37] px-6 py-3 rounded-2xl font-black text-xs">
          OFFICIAL REGISTRY
        </div>
      </div>

      <div className="bg-white rounded-[50px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Full Name
              </th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Contact Intel
              </th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                Assigned Ward
              </th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                PVC Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mySupporters.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition group">
                <td className="p-8 font-black text-slate-900 text-lg flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] group-hover:scale-150 transition" />{" "}
                  {s.name}
                </td>
                <td className="p-8">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Phone size={14} className="text-[#D4AF37]" /> {s.phone}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                      <Mail size={12} /> {s.email}
                    </div>
                  </div>
                </td>
                <td className="p-8 text-center">
                  <span className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border border-blue-100">
                    {s.ward}
                  </span>
                </td>
                <td className="p-8 text-right">
                  {s.hasVotersCard ? (
                    <span className="text-emerald-600 font-black text-[10px] uppercase flex items-center justify-end gap-1">
                      <UserCheck size={14} /> Ready
                    </span>
                  ) : (
                    <span className="text-red-400 font-black text-[10px] uppercase">
                      Pending PVC
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mySupporters.length === 0 && (
          <div className="p-24 text-center">
            <MapPin className="w-16 h-16 text-slate-100 mx-auto mb-4" />
            <h3 className="text-xl font-black text-slate-300 uppercase italic">
              No Data Captured
            </h3>
            <p className="text-slate-400 text-xs font-bold">
              Awaiting public sign-ups from {user?.lga}.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
