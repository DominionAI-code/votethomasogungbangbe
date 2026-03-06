"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import { MapPin, Phone, Mail, Home, CreditCard } from "lucide-react";

export default function AdminVolunteerMaster() {
  const volunteers = useCampaignStore((state) => state.volunteers) ?? [];

  return (
    <DashboardLayout roleTitle="Osun-East Volunteer Command">
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Agent Info
              </th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Location
              </th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Address
              </th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Credentials
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {volunteers.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-6">
                  <p className="font-black text-slate-900">{v.name}</p>
                  <div className="flex flex-col text-[10px] font-bold text-slate-400 gap-1 mt-1 uppercase">
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> {v.email}
                    </span>
                    <span className="flex items-center gap-1 text-[#D4AF37]">
                      <Phone size={12} /> {v.phone}
                    </span>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-black text-slate-700">
                      {v.lga}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-blue-600 uppercase">
                      <MapPin size={10} /> {v.ward}
                    </span>
                  </div>
                </td>
                <td className="p-6 max-w-xs">
                  <p className="text-xs text-slate-500 italic">
                    <Home size={12} className="inline mr-1" />{" "}
                    {v.homeAddress || "N/A"}
                  </p>
                </td>
                <td className="p-6">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${v.hasVotersCard ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                  >
                    <CreditCard size={10} className="inline mr-1" />{" "}
                    {v.hasVotersCard ? "Registered Voter" : "No PVC"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
