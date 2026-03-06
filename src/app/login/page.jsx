"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCampaignStore } from "@/lib/store";
import { Lock, Mail, ArrowLeft, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const login = useCampaignStore((state) => state.login);
  const coordinators = useCampaignStore((state) => state.coordinators) || [];
  const volunteers = useCampaignStore((state) => state.volunteers) || []; // Add this
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Super Admin Check
    if (email.includes("admin")) {
      login({ name: "Super Admin", email, role: "admin" });
      router.push("/admin");
      return;
    }

    // 2. Coordinator Check
    const foundCoord = coordinators.find(
      (c) => c.email.toLowerCase() === email.toLowerCase(),
    );
    if (foundCoord) {
      login({ ...foundCoord, role: "coordinator" });
      router.push("/coordinator");
      return;
    }

    // 3. THE FIX: Volunteer Check
    // Search the volunteers array for a matching email registered by a Coordinator
    const foundVol = volunteers.find(
      (v) => v.email.toLowerCase() === email.toLowerCase(),
    );

    if (foundVol) {
      // Login with the full profile (includes ward, lga, phone, etc.)
      login({ ...foundVol, role: "volunteer" });
      router.push("/volunteer");
    } else {
      // Fallback for demo/unregistered users
      login({
        name: "Guest Agent",
        email,
        role: "volunteer",
        lga: "Ife Central",
        ward: "Ward 1",
      });
      router.push("/volunteer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050a0a] p-6 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <Link
          href="/"
          className="mb-10 text-slate-500 hover:text-[#D4AF37] flex items-center transition-all group font-black text-[10px] uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Return to Public Site
        </Link>

        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[60px] p-10 md:p-14 shadow-3xl relative overflow-hidden">
          {/* Subtle Internal Gold Border Top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-[#D4AF37] w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
              Command <span className="text-[#D4AF37]">Access</span>
            </h1>
            <p className="text-slate-500 text-[10px] font-black mt-3 tracking-[0.3em] uppercase">
              Secure Campaign Ecosystem
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">
                Official Identifier
              </label>
              <div className="relative">
                <Mail className="absolute left-5 top-5 text-slate-600 w-4 h-4" />
                <input
                  type="email"
                  placeholder="name@campaign.com"
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-5 px-14 text-white placeholder:text-slate-700 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all font-bold text-sm"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2 tracking-widest">
                Access Token
              </label>
              <div className="relative">
                <Lock className="absolute left-5 top-5 text-slate-600 w-4 h-4" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/50 border border-white/5 rounded-2xl py-5 px-14 text-white placeholder:text-slate-700 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/20 transition-all font-bold text-sm"
                  required
                />
              </div>
            </div>

            <button className="w-full bg-[#D4AF37] hover:bg-[#F9E29B] text-black font-black py-5 rounded-2xl transition-all shadow-xl shadow-[#D4AF37]/10 flex items-center justify-center gap-2 group uppercase text-xs tracking-[0.2em] mt-8">
              Authenticate{" "}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <p className="text-center mt-10 text-[9px] text-slate-600 font-bold uppercase tracking-widest">
            Authorized Personnel Only
          </p>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-12 opacity-20 grayscale z-10">
        <p className="text-[10px] font-black text-white tracking-[0.5em] uppercase">
          DominionAI Tech Services
        </p>
      </div>
    </div>
  );
}
