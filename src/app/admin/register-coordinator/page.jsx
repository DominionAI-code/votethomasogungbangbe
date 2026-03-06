"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import { UserPlus, ShieldCheck, Home, CreditCard } from "lucide-react";

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

export default function RegisterCoordinator() {
  const addCoordinator = useCampaignStore((state) => state.addCoordinator);

  // Updated state to include Home Address and PVC Status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    homeAddress: "",
    hasVotersCard: false,
    lga: OSUN_EAST_LGAS[0],
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Saves enriched profile to the global store for Admin auditing
    addCoordinator({ ...formData, id: Date.now() });
    setSuccess(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      homeAddress: "",
      hasVotersCard: false,
      lga: OSUN_EAST_LGAS[0],
    });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <DashboardLayout roleTitle="System Administration">
      <div className="max-w-2xl bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 relative overflow-hidden">
        {/* Decorative Gold Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#D4AF37]" />

        <div className="flex items-center gap-4 mb-10">
          <div className="bg-[#D4AF37] p-4 rounded-2xl text-black shadow-lg shadow-[#D4AF37]/20">
            <UserPlus size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
              Add Coordinator
            </h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              Establish Regional Command for Osun-East
            </p>
          </div>
        </div>

        {success && (
          <div className="mb-6 bg-emerald-50 text-emerald-700 p-4 rounded-2xl flex items-center gap-2 font-bold text-sm border border-emerald-100">
            <ShieldCheck size={20} /> Regional Lead successfully integrated into
            the system!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name and Phone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              placeholder="Full Name"
              className="p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37] transition-all font-bold text-sm"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              placeholder="Phone Number"
              className="p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37] transition-all font-bold text-sm"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          {/* Email Field */}
          <input
            type="email"
            placeholder="Official Email (System Login ID)"
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37] transition-all font-bold text-sm"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          {/* New Home Address Field */}
          <div className="relative">
            <Home className="absolute left-4 top-4 text-slate-300" size={18} />
            <input
              placeholder="Residential / Home Address"
              className="w-full p-4 pl-12 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37] transition-all font-bold text-sm"
              value={formData.homeAddress}
              onChange={(e) =>
                setFormData({ ...formData, homeAddress: e.target.value })
              }
              required
            />
          </div>

          {/* LGA Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">
              Assigned Local Government (Osun-East)
            </label>
            <select
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37] transition-all font-black text-xs"
              value={formData.lga}
              onChange={(e) =>
                setFormData({ ...formData, lga: e.target.value })
              }
            >
              {OSUN_EAST_LGAS.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>

          {/* New Voter's Card Status */}
          <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl group border border-transparent hover:border-[#D4AF37]/20 transition-all">
            <div
              className={`p-2 rounded-xl transition-colors ${formData.hasVotersCard ? "bg-[#D4AF37] text-black" : "bg-white text-slate-300"}`}
            >
              <CreditCard size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black uppercase text-slate-800">
                Credential Verification
              </p>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                Does this coordinator have their Voter's Card (PVC)?
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.hasVotersCard}
              className="w-6 h-6 rounded-lg accent-[#D4AF37] cursor-pointer"
              onChange={(e) =>
                setFormData({ ...formData, hasVotersCard: e.target.checked })
              }
            />
          </div>

          <button className="w-full bg-black text-white font-black py-5 rounded-3xl hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl uppercase text-xs tracking-[0.2em] mt-4">
            Authorize Regional Lead
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
