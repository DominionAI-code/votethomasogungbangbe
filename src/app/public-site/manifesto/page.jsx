"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import {
  Plane,
  BookOpen,
  Briefcase,
  HeartHandshake,
  ArrowRight,
  Target,
  Users,
  GraduationCap,
  Zap,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

// --- DATA: PAST ACHIEVEMENTS (Evidence) ---
const pastProjects = [
  {
    id: 1,
    year: "2022",
    title: "Mallam Aminu Kano Int'l Airport Road",
    value: "N300 Million",
    category: "Infrastructure",
    description:
      "Dr. Ogungbangbe funded the construction of the critical road network for the international airport. This project eased logistics for millions of travelers and businesses, executed purely as a private citizen.",
    icon: <Plane className="w-8 h-8" />,
    image: "/images/manifesto1.png", // Integrated local asset
  },
  {
    id: 2,
    year: "2017",
    title: "University of Ilorin Research Grant",
    value: "$100,000",
    category: "Education & Science",
    description:
      "Awarded a massive research grant for the study of microbial contamination in aviation fuel. The findings were published by Lambert Academic in Germany, putting Nigerian research on the global map.",
    icon: <BookOpen className="w-8 h-8" />,
    image: "/images/manifesto.png", // Integrated local asset
  },
];

// --- DATA: FUTURE AGENDA (The Promise) ---
const agendaItems = [
  {
    id: 1,
    role: "Student",
    title: "The 'Next-Gen' Scholarship",
    desc: "Full tuition coverage for 500 STEM students annually. Focusing on Aviation, Engineering, and Medicine.",
    icon: <GraduationCap />,
    color: "bg-amber-50 text-[#D4AF37]",
  },
  {
    id: 2,
    role: "Trader",
    title: "SME Power Grant",
    desc: "N500,000 interest-free revolving loans for market women and small business owners to boost local commerce.",
    icon: <Briefcase />,
    color: "bg-amber-50 text-[#D4AF37]",
  },
  {
    id: 3,
    role: "Community",
    title: "Solar For All",
    desc: "Installation of solar mini-grids in 50 key rural wards to ensure 24/7 power for clinics and streetlights.",
    icon: <Zap />,
    color: "bg-amber-50 text-[#D4AF37]",
  },
  {
    id: 4,
    role: "Youth",
    title: "Tech Innovation Hubs",
    desc: "Building 3 world-class coding and robotics centers to train 2,000 youths for remote international jobs.",
    icon: <Target />,
    color: "bg-amber-50 text-[#D4AF37]",
  },
];

export default function Manifesto() {
  const [activeRole, setActiveRole] = useState("All");

  const filteredAgenda =
    activeRole === "All"
      ? agendaItems
      : agendaItems.filter(
          (item) => item.role === activeRole || item.role === "Community",
        );

  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      <Navbar />

      {/* 1. HERO SECTION: PARALLAX & IMPACT */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40 grayscale">
          <img
            src="/images/thomas2.png"
            className="w-full h-full object-cover"
            alt="Strategic Vision"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <div className="relative z-10 container mx-auto px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D4AF37] font-black tracking-[0.4em] uppercase text-[10px] mb-6">
              Official Campaign Blueprint
            </h2>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 italic uppercase tracking-tighter leading-[0.9]">
              Proven Action.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-white">
                Strategic Future.
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed italic font-medium">
              We don't just make promises. We have a track record of spending
              private resources for public good. Imagine what we can do with
              official command.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. THE PROVEN RECORD (Iridium Black Mode) */}
      <section className="py-32 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="container mx-auto px-10 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-[#D4AF37] font-black tracking-[0.3em] uppercase text-[10px] mb-3">
                Philanthropy & Impact
              </h2>
              <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
                Done Before Office.
              </h3>
            </div>
            <p className="text-slate-500 max-w-md text-left md:text-right text-sm font-bold uppercase tracking-widest leading-relaxed">
              While others promised, Dr. Thomas Ogungbangbe acted. These
              projects were funded from personal capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {pastProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-[#0a0a0a] border border-white/5 rounded-[48px] overflow-hidden hover:border-[#D4AF37]/40 transition-all shadow-2xl"
              >
                <div className="h-72 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 right-6 z-20 bg-black/80 backdrop-blur-md border border-[#D4AF37]/20 px-6 py-2 rounded-full text-[#D4AF37] font-black text-xs tracking-widest">
                    LOG: {project.year}
                  </div>
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">
                      {project.category}
                    </span>
                    <div className="bg-[#D4AF37]/10 p-4 rounded-2xl text-[#D4AF37]">
                      {project.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-[#D4AF37] transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-4xl font-black text-white mb-8 italic tracking-tighter">
                    {project.value}
                  </div>
                  <p className="text-slate-500 leading-relaxed font-medium border-l-2 border-[#D4AF37]/30 pl-6 italic">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE FUTURE SIMULATOR (Interactive Agenda) */}
      <section className="py-32 bg-[#fcfcfc]">
        <div className="container mx-auto px-10">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] font-black tracking-[0.4em] uppercase text-[10px]">
              Strategic Deployment
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mt-4 mb-8 italic uppercase tracking-tighter leading-none">
              What Is In It <span className="text-[#D4AF37]">For You?</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed italic">
              Select your role to see how Dr. Thomas's command will directly
              impact your lifecycle in Osun-East.
            </p>
          </div>

          {/* Role Selectors */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {["All", "Student", "Trader", "Youth"].map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all transform hover:scale-105 ${
                  activeRole === role
                    ? "bg-black text-[#D4AF37] shadow-2xl shadow-black/20"
                    : "bg-white text-slate-400 border border-slate-100 hover:border-[#D4AF37]"
                }`}
              >
                {role === "All" ? "View Full Command" : `I am a ${role}`}
              </button>
            ))}
          </div>

          {/* Dynamic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filteredAgenda.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-50 hover:shadow-2xl hover:border-[#D4AF37]/20 transition-all group cursor-default"
                >
                  <div
                    className={`w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 bg-black text-[#D4AF37] transition-all group-hover:scale-110`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 italic uppercase tracking-tighter group-hover:text-[#D4AF37] transition-colors leading-none">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed font-medium italic mb-8">
                    {item.desc}
                  </p>
                  <div className="flex items-center text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-all">
                    View Policy Details{" "}
                    <ChevronRight className="ml-2 w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-32 bg-black relative overflow-hidden rounded-t-[100px]">
        <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-overlay opacity-30" />
        <div className="container mx-auto px-10 text-center relative z-10 text-white">
          <ShieldCheck className="w-20 h-20 mx-auto mb-10 text-[#D4AF37] animate-pulse" />
          <h2 className="text-5xl md:text-7xl font-black mb-10 italic uppercase tracking-tighter leading-none">
            Let's Build This <br />
            Future Together
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12 italic font-medium">
            The plans are ready. The record is proven. The only missing piece is
            your official mandate.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-12 py-5 bg-[#D4AF37] text-black font-black rounded-2xl hover:bg-white transition-all uppercase text-xs tracking-widest shadow-2xl shadow-[#D4AF37]/10">
              Enlist as Volunteer
            </button>
            <button className="px-12 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase text-xs tracking-widest">
              Download Strategy PDF
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
