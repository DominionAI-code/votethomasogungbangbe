"use client";
import { useState } from "react";
import PublicNavbar from "@/components/PublicNavbar";
import { OSUN_EAST_MAP } from "@/lib/geoData";
import { useCampaignStore } from "@/lib/store";
import {
  Heart,
  CheckCircle,
  User,
  Phone,
  MapPin,
  Mail,
  Home,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SupporterSignup() {
  const addSupporter = useCampaignStore((state) => state.addSupporter);

  // Expanded form state to include all required data points
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    homeAddress: "",
    hasVotersCard: false,
    lga: "Ife Central",
    ward: "Ward 1",
  });

  const [submitted, setSubmitted] = useState(false);

  const lgas = Object.keys(OSUN_EAST_MAP);
  const wards = OSUN_EAST_MAP[formData.lga] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save enriched data to the global store
    addSupporter({ ...formData, id: Date.now() });
    setSubmitted(true);
  };

  return (
    <div className="bg-[#050a0a] min-h-screen text-white font-sans">
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT COLUMN: BRANDING */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block sticky top-32"
        >
          <span className="text-[#D4AF37] font-black tracking-[0.4em] uppercase text-xs mb-4 block">
            Official Registry
          </span>
          <h1 className="text-7xl font-black italic leading-[0.9] mb-8 uppercase">
            Build the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">
              Golden Era.
            </span>
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed border-l-2 border-[#D4AF37] pl-6 italic">
            Your data is secured in our central command system. By joining, you
            help us strategize for a better Osun-East.
          </p>
        </motion.div>

        {/* RIGHT COLUMN: THE ENHANCED FORM */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[60px] shadow-3xl"
              >
                <div className="flex flex-col items-center mb-8">
                  <div className="w-14 h-14 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-black mb-4">
                    <Heart fill="currentColor" size={24} />
                  </div>
                  <h2 className="text-xl font-black uppercase italic tracking-tighter">
                    Become a Supporter
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <User
                        className="absolute left-4 top-4 text-slate-500"
                        size={16}
                      />
                      <input
                        placeholder="Full Name"
                        className="w-full bg-black border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-[#D4AF37] transition-all font-bold text-sm"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone
                        className="absolute left-4 top-4 text-slate-500"
                        size={16}
                      />
                      <input
                        placeholder="Phone Number"
                        className="w-full bg-black border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-[#D4AF37] transition-all font-bold text-sm"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-4 text-slate-500"
                      size={16}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-black border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-[#D4AF37] transition-all font-bold text-sm"
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="relative">
                    <Home
                      className="absolute left-4 top-4 text-slate-500"
                      size={16}
                    />
                    <input
                      placeholder="Home / Residential Address"
                      className="w-full bg-black border border-white/10 p-4 pl-12 rounded-2xl outline-none focus:border-[#D4AF37] transition-all font-bold text-sm"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          homeAddress: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* Geography Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-[#D4AF37] uppercase ml-2">
                        Local Govt
                      </label>
                      <select
                        className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none font-bold text-xs"
                        value={formData.lga}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lga: e.target.value,
                            ward: "Ward 1",
                          })
                        }
                      >
                        {lgas.map((lga) => (
                          <option key={lga} value={lga}>
                            {lga}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-[#D4AF37] uppercase ml-2">
                        Ward
                      </label>
                      <select
                        className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none font-bold text-xs"
                        value={formData.ward}
                        onChange={(e) =>
                          setFormData({ ...formData, ward: e.target.value })
                        }
                      >
                        {wards.map((ward) => (
                          <option key={ward} value={ward}>
                            {ward}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* PVC Indication */}
                  <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-[30px] group hover:border-[#D4AF37]/30 transition-all">
                    <div
                      className={`p-2 rounded-xl transition-colors ${formData.hasVotersCard ? "bg-[#D4AF37] text-black" : "bg-white/10 text-slate-500"}`}
                    >
                      <CreditCard size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black uppercase">
                        Voter Registration
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold">
                        Do you have your Voter's Card (PVC)?
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-6 h-6 rounded-lg accent-[#D4AF37] cursor-pointer"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hasVotersCard: e.target.checked,
                        })
                      }
                    />
                  </div>

                  <button className="w-full bg-[#D4AF37] text-black font-black py-5 rounded-3xl hover:bg-[#F9E29B] transition-all shadow-xl shadow-[#D4AF37]/10 flex items-center justify-center gap-2 group mt-4 uppercase text-xs tracking-widest">
                    Confirm Registration{" "}
                    <ChevronRight
                      size={16}
                      className="group-hover:translate-x-1 transition"
                    />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-[#D4AF37]/30 p-16 rounded-[60px] text-center"
              >
                <CheckCircle className="w-20 h-20 text-[#D4AF37] mx-auto mb-6" />
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                  Verified.
                </h2>
                <p className="text-slate-400 mt-4 leading-relaxed font-medium">
                  Your data has been successfully integrated into the Osun-East
                  2026 supporter database.
                </p>
                <button
                  onClick={() => (window.location.href = "/public-site")}
                  className="mt-12 px-10 py-4 bg-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  Return to Headquarters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
