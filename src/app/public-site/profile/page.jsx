"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import {
  Award,
  Briefcase,
  GraduationCap,
  Globe,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

// --- CONFIGURATION: Updated to your local image paths ---
const bioHeroImages = ["/images/thomas.png", "/images/thomas1.png"];

const galleryImages = [
  "/images/thomas.png",
  "/images/thomas1.png",
  "/images/thomas2.png",
  "/images/thomas1.png",
];

// --- CONTENT DATA ---
const careerTimeline = [
  {
    year: "Current Leadership",
    title: "Pioneer & Captain of Industry",
    company: "CITA & AFMAN",
    description:
      "Dr. Thomas Ogungbangbe stands as the Chief Executive Officer of CITA and the Pioneer Chairman of the Aviation Fuel Marketers Association of Nigeria (AFMAN). His influence extends to the board of JUHI-2, steering a consortium including ASCON, ETERNA, and MASTERS ENERGY.",
    icon: <Briefcase className="w-6 h-6" />,
  },
  {
    year: "Strategic Era",
    title: "The Chevron & MRS Years",
    company: "MRS Oil & Gas / Chevron",
    description:
      "Prior to establishing CITA, he served as General Manager, Aviation Business at MRS Oil & Gas. Seconded to Chevron Oil Nigeria Plc, he dominated the West African market as Aviation Marketing Manager and later Group Aviation Manager for West & Central Africa.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    year: "Policy & Reform",
    title: "Champion of Industry Reform",
    company: "Federal Government & Joint Ventures",
    description:
      "A trusted authority, Dr. Thomas led the FGN 6-man Ministerial Committee on Aviation Fuel Pricing. He chaired the management committee of the Joint Aviation Facility in Kano and served on the management of the JUHI concourse.",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    year: "The Foundation",
    title: "Engineering the Future",
    company: "Sahara Group & Conoil",
    description:
      "A co-founder of SO Aviation (Sahara Group), his portfolio spanned engineering, strategic fuel procurement, and aviation insurance. Earlier, as Aviation Operations Manager at Conoil, he championed critical industry reforms.",
    icon: <CheckCircle2 className="w-6 h-6" />,
  },
];

const education = [
  {
    degree: "Ph.D. Marketing Strategy",
    school: "Babcock University",
    detail: "Research on Business Performance of Domestic Airlines.",
  },
  {
    degree: "Alumni",
    school: "University of Oxford",
    detail: "Said Business School",
  },
  {
    degree: "Leadership Fellow",
    school: "Imperial College, UK",
    detail: "LEAD - Leadership on Environment & Development",
  },
  {
    degree: "Executive Education",
    school: "Harvard Business School",
    detail: "Strategic Leadership",
  },
  {
    degree: "B.Sc & Masters",
    school: "University of Ilorin",
    detail: "Scientist by Training",
  },
  {
    degree: "Certified Inspector",
    school: "IATA / EI / ASTM",
    detail: "Jet Fuel Airfield Inspector",
  },
];

// --- COMPONENTS ---
const SectionHeader = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16 md:mb-24"
  >
    <h2 className="text-[10px] font-black tracking-[0.3em] text-[#D4AF37] uppercase mb-3">
      {subtitle}
    </h2>
    <h3 className="text-4xl md:text-6xl font-black text-slate-900 italic uppercase tracking-tighter">
      {title}
    </h3>
    <div className="w-24 h-1.5 bg-[#D4AF37] mt-6" />
  </motion.div>
);

export default function Biography() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % bioHeroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={bioHeroImages[currentHeroIndex]}
              alt="Dr. Thomas Ogungbangbe"
              className="w-full h-full object-cover object-top opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 container mx-auto px-10 grid grid-cols-1 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-2 px-4 border border-[#D4AF37]/40 text-[#D4AF37] rounded-full text-[10px] font-black tracking-widest mb-8 backdrop-blur-md uppercase">
              The Man • The Vision • The Future
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] italic uppercase tracking-tighter">
              Dr. Thomas <br />
              <span className="text-[#D4AF37]">Ogungbangbe</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed border-l-4 border-[#D4AF37] pl-8 italic">
              A Scientist, Captain of Industry, and a Strategic Leader
              redefining aviation and community development in Osun-East.
            </p>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#D4AF37] flex flex-col items-center opacity-50"
        >
          <span className="text-[9px] tracking-[0.4em] font-black uppercase mb-3">
            Scroll The Legacy
          </span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* 2. INTRO SUMMARY */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <ShieldCheck size={400} className="text-[#D4AF37]" />
        </div>
        <div className="container mx-auto px-10 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-20 h-20 text-[#D4AF37] mx-auto mb-10" />
            <p className="text-3xl md:text-5xl leading-[1.1] font-black text-slate-900 italic uppercase tracking-tighter">
              "From multinational boardrooms to grassroots service, Dr. Thomas
              combines{" "}
              <span className="text-[#D4AF37]">Scientific Precision</span> with{" "}
              <span className="text-[#D4AF37]">Strategic Vision</span>."
            </p>
          </div>
        </div>
      </section>

      {/* 3. CAREER TIMELINE */}
      <section className="py-32 bg-[#fcfcfc]">
        <div className="container mx-auto px-10">
          <SectionHeader
            title="A Legacy of Excellence"
            subtitle="Executive Command Career"
          />

          <div className="relative border-l-2 border-slate-100 ml-4 md:ml-12 space-y-24">
            {careerTimeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                className="relative pl-10 md:pl-20 group"
              >
                <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-slate-200 group-hover:bg-[#D4AF37] group-hover:scale-125 transition-all border-4 border-white shadow-lg" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                  <div className="md:col-span-4">
                    <span className="text-[#D4AF37] font-black tracking-widest text-[10px] uppercase block mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">
                      {item.company}
                    </h3>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {item.title}
                    </h4>
                  </div>
                  <div className="md:col-span-8 bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-[#D4AF37]/20 transition-all">
                    <div className="mb-6 text-[#D4AF37] bg-[#D4AF37]/10 w-14 h-14 flex items-center justify-center rounded-[20px]">
                      {item.icon}
                    </div>
                    <p className="text-slate-600 leading-relaxed text-lg font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EDUCATION BENTO GRID */}
      <section className="py-32 bg-black text-white rounded-[60px] md:rounded-[100px] mx-4 my-8 overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div>
              <h2 className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase mb-3">
                Academic Command
              </h2>
              <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
                The Scholar
              </h3>
            </div>
            <GraduationCap className="w-16 h-16 text-white/10 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`p-10 rounded-[40px] border border-white/5 bg-white/5 backdrop-blur-xl transition-all ${
                  index === 0
                    ? "md:col-span-2 bg-gradient-to-br from-[#D4AF37]/20 to-transparent"
                    : ""
                }`}
              >
                <h4 className="text-2xl font-black text-white mb-3 italic uppercase tracking-tighter">
                  {edu.degree}
                </h4>
                <p className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-6">
                  {edu.school}
                </p>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {edu.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IMAGE GALLERY STRIP */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-10 text-center mb-16">
          <h2 className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase mb-4">
            Visual Timeline
          </h2>
          <h3 className="text-5xl font-black italic uppercase tracking-tighter">
            Global Leadership
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {galleryImages.map((imgSrc, i) => (
            <div
              key={i}
              className="h-[400px] bg-slate-100 rounded-[32px] overflow-hidden relative group"
            >
              <img
                src={imgSrc}
                alt={`Dr. Thomas Event ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500" />
              <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black text-white bg-[#D4AF37] px-4 py-2 rounded-full uppercase tracking-widest">
                  View Archive
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
