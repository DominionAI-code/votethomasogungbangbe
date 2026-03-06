"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import { OSUN_EAST_MAP } from "@/lib/geoData";
import { UserPlus, CreditCard, Home } from "lucide-react";

export default function RegisterVolunteer() {
  const { user, addVolunteer } = useCampaignStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    homeAddress: "",
    hasVotersCard: false,
    lga: user?.lga || "Ife Central",
    ward: "Ward 1",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addVolunteer({ ...formData, id: Date.now(), coordinatorId: user.id });
    alert("Volunteer fully registered in the district database!");
    setFormData({
      ...formData,
      name: "",
      email: "",
      phone: "",
      homeAddress: "",
      hasVotersCard: false,
    });
  };

  return (
    <DashboardLayout roleTitle="Force Enrollment">
      <div className="max-w-3xl bg-white p-10 rounded-[40px] shadow-sm">
        <h2 className="text-2xl font-black mb-8 italic uppercase flex items-center gap-3">
          <UserPlus className="text-[#D4AF37]" /> Enrollment Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <input
              placeholder="Full Name"
              className="p-4 bg-slate-50 rounded-2xl outline-none"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              placeholder="Phone Number"
              className="p-4 bg-slate-50 rounded-2xl outline-none"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          <input
            placeholder="Email Address"
            type="email"
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <div className="relative">
            <Home className="absolute left-4 top-4 text-slate-300" size={18} />
            <input
              placeholder="Residential/Home Address"
              className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none"
              onChange={(e) =>
                setFormData({ ...formData, homeAddress: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-100 rounded-2xl text-slate-500 font-bold">
              {formData.lga}
            </div>
            <select
              className="p-4 bg-slate-50 rounded-2xl font-bold"
              onChange={(e) =>
                setFormData({ ...formData, ward: e.target.value })
              }
            >
              {OSUN_EAST_MAP[formData.lga].map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <CreditCard
              className={
                formData.hasVotersCard ? "text-emerald-500" : "text-slate-300"
              }
            />
            <span className="flex-1 font-bold text-slate-600">
              Does this volunteer have a Voter's Card (PVC)?
            </span>
            <input
              type="checkbox"
              className="w-6 h-6 accent-[#D4AF37]"
              onChange={(e) =>
                setFormData({ ...formData, hasVotersCard: e.target.checked })
              }
            />
          </div>

          <button className="w-full bg-[#D4AF37] text-black font-black py-5 rounded-2xl uppercase shadow-lg shadow-[#D4AF37]/20">
            Finalize Official Registration
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
