"use client";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import { useCampaignStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Star,
  MapPin,
  Droplets,
  Zap,
  GraduationCap,
  X,
  BookOpen,
  Stethoscope,
  Briefcase,
  Calendar,
  Newspaper,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

// ==========================================
// --- DATA CONFIGURATION ---
// ==========================================
const heroImages = [
  "/images/thomas.png",
  "/images/thomas1.png",
  "/images/thomas2.png",
];
const sloganWords = ["Vision", "Progress", "Unity"];

const projects = [
  {
    id: 1,
    title: "Central School Renovation",
    category: "Education",
    amount: "N150M",
    x: 35,
    y: 45,
    img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600",
    description: "Complete reconstruction of classroom blocks and library.",
    icon: <GraduationCap size={16} />,
  },
  {
    id: 2,
    title: "Community Borehole System",
    category: "Water",
    amount: "N25M",
    x: 65,
    y: 30,
    img: "https://images.unsplash.com/photo-1574482620826-40685ca5ebd2?w=600",
    description: "Solar-powered industrial borehole for 5,000 residents.",
    icon: <Droplets size={16} />,
  },
];

const policies = [
  {
    id: 1,
    category: "Student",
    title: "Free Jamb Forms",
    icon: <BookOpen />,
    desc: "Providing 5,000 free forms annually.",
  },
  {
    id: 2,
    category: "Trader",
    title: "Market Grants",
    icon: <Briefcase />,
    desc: "Interest-free loans for market women.",
  },
  {
    id: 3,
    category: "Health",
    title: "Clinic Upgrade",
    icon: <Stethoscope />,
    desc: "24/7 solar power for general hospitals.",
  },
  {
    id: 4,
    category: "Youth",
    title: "Tech Hubs",
    icon: <Zap />,
    desc: "Building IT centers for skills acquisition.",
  },
];

export default function CampaignPage() {
  // Pull live data from store
  const { news, events } = useCampaignStore();

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [activePin, setActivePin] = useState(null);
  const [mapFilter, setMapFilter] = useState("All");
  const [policyFilter, setPolicyFilter] = useState("All");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "2348000000000";
    const message = encodeURIComponent(
      "Hello Honorable, I want to join the movement.",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // FIX: Declaring the missing filter variables
  const filteredProjects =
    mapFilter === "All"
      ? projects
      : projects.filter((p) => p.category === mapFilter);

  const filteredPolicies =
    policyFilter === "All"
      ? policies
      : policies.filter((p) => p.category === policyFilter);

  return (
    <div className="flex flex-col w-full bg-[#050a0a] text-white">
      <PublicNavbar />

      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#050a0a] pt-24">
        <div className="relative w-full md:w-[60%] h-[45vh] md:h-full overflow-hidden order-1 z-20 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <img
                src={heroImages[currentHeroImage]}
                className="w-full h-full object-cover object-top"
                alt="Wura Didan Candidate"
              />
              <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-[#050a0a] to-transparent z-10" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-10 left-10 flex gap-3 z-30">
            {heroImages.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-700 ${idx === currentHeroImage ? "w-10 bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]" : "w-3 bg-white/20"}`}
              />
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-[40%] flex items-center bg-[#050a0a] order-2 px-8 md:pl-16 z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em]">
                Brilliance 2026
              </span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black italic leading-none mb-8">
              LEAD WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] to-[#F9E29B]">
                {sloganWords[currentHeroImage]}
              </span>
              .
            </h1>
            <p className="text-slate-400 text-lg mb-10 border-l border-[#D4AF37] pl-6 italic">
              Scientific innovation and strategic development for Osun-East.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-[#D4AF37] text-black font-black rounded-2xl shadow-xl shadow-[#D4AF37]/20 flex items-center gap-2">
                JOIN US <ArrowRight size={18} />
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="px-8 py-4 border border-white/10 rounded-2xl hover:border-[#D4AF37] transition-all"
              >
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DYNAMIC UPDATES (News & Events from Store) */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-black uppercase italic mb-10">
              Press <span className="text-[#D4AF37]">Updates</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.length > 0 ? (
                news.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#050a0a] p-8 rounded-[40px] border border-white/5 group hover:border-[#D4AF37]/50 transition-all"
                  >
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase">
                      {item.category || "General"}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2 group-hover:text-[#D4AF37] transition">
                      {item.title}
                    </h4>
                    <div className="mt-6 flex items-center text-[10px] font-black uppercase text-slate-500">
                      Read Story{" "}
                      <ChevronRight size={14} className="ml-1 text-[#D4AF37]" />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No news published yet.</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#D4AF37] p-10 rounded-[50px] text-black shadow-2xl shadow-[#D4AF37]/10">
            <h3 className="text-xl font-black uppercase italic mb-8 flex items-center gap-2">
              <Calendar size={20} /> Schedule
            </h3>
            <div className="space-y-6">
              {events.length > 0 ? (
                events.slice(0, 3).map((e) => (
                  <div
                    key={e.id}
                    className="border-b border-black/10 pb-4 last:border-0"
                  >
                    <p className="text-[10px] font-black uppercase opacity-60">
                      {e.date}
                    </p>
                    <h5 className="font-black text-lg">{e.title}</h5>
                  </div>
                ))
              ) : (
                <p className="text-black/50 italic">No events scheduled.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: IMPACT MAP */}
      <section
        id="impact"
        className="py-24 bg-[#050a0a] relative overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] font-black tracking-[0.4em] uppercase text-xs mb-4 block">
              Proven Track Record
            </span>
            <h2 className="text-5xl font-black italic">
              IMPACT <span className="text-white/20">MAPPING</span>
            </h2>
          </div>
          <div className="bg-black rounded-[60px] border border-white/5 h-[600px] relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center grayscale opacity-20"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600')",
              }}
            />
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActivePin(project)}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${project.x}%`, top: `${project.y}%` }}
              >
                <span className="absolute w-10 h-10 bg-[#D4AF37]/20 rounded-full animate-ping" />
                <div className="relative w-5 h-5 bg-[#D4AF37] rounded-full border-4 border-black shadow-[0_0_15px_#D4AF37]" />
              </button>
            ))}
            <AnimatePresence>
              {activePin && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-8 right-8 w-80 bg-[#050a0a]/90 backdrop-blur-xl rounded-[40px] border border-[#D4AF37]/30 p-8 z-30 shadow-2xl"
                >
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase">
                    {activePin.category}
                  </span>
                  <h3 className="text-xl font-black mt-2 mb-4">
                    {activePin.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {activePin.description}
                  </p>
                  <button
                    onClick={() => setActivePin(null)}
                    className="w-full py-4 bg-white text-black font-black text-xs rounded-2xl uppercase"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE AGENDA */}
      <section id="manifesto" className="py-24 bg-white rounded-t-[80px]">
        <div className="container mx-auto px-6 text-black">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase">
              The <span className="text-[#D4AF37]">Agenda</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredPolicies.map((policy) => (
              <motion.div
                key={policy.id}
                whileHover={{ y: -10 }}
                className="p-10 bg-slate-50 rounded-[50px] border border-transparent hover:border-[#D4AF37]/30 transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#D4AF37] mb-8 shadow-sm group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                  {React.cloneElement(policy.icon, { size: 28 })}
                </div>
                <h3 className="text-2xl font-black uppercase leading-tight mb-4">
                  {policy.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {policy.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
