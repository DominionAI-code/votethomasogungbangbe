"use client";
import React, { useState, useEffect } from "react";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import { useCampaignStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Newspaper,
  Calendar,
  Star,
  ChevronRight,
} from "lucide-react";

export default function CampaignPage() {
  const { news, events } = useCampaignStore(); // Fetching live data from Admin CMS
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const heroImages = [
    "/images/thomas.png",
    "/images/thomas1.png",
    "/images/thomas2.png",
  ];

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentHeroImage((p) => (p + 1) % 3),
      3500,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#050a0a]">
      <PublicNavbar />

      {/* HERO SECTION - Gold/Black Vibrant Theme */}
      <section className="relative h-[80vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages[currentHeroImage]}
            className="w-full h-full object-cover opacity-40 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="container mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-xs">
              Osun-East 2026
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white mt-4 italic leading-none">
              WURA <span className="text-[#D4AF37]">DIDAN</span>
            </h1>
            <p className="text-slate-400 mt-6 text-lg max-w-xl border-l-2 border-[#D4AF37] pl-6">
              Leading with Vision, Serving with Honor. The official digital
              portal for Dr. Thomas Ogungbangbe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* DYNAMIC NEWS & UPDATES SECTION */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
            <h2 className="text-4xl font-black text-white uppercase italic">
              Latest <span className="text-[#D4AF37]">Updates</span>
            </h2>
            <Newspaper className="text-[#D4AF37] w-10 h-10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.length > 0 ? (
              news.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white/5 rounded-[40px] border border-white/5 overflow-hidden hover:border-[#D4AF37]/50 transition"
                >
                  <div className="h-56 overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase">
                      {item.category} • {item.createdAt}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 leading-tight">
                      {item.title}
                    </h3>
                    <button className="mt-6 flex items-center gap-2 text-xs font-black text-white uppercase group-hover:text-[#D4AF37] transition">
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic col-span-3 text-center py-10">
                Waiting for campaign updates...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* DYNAMIC EVENTS SECTION */}
      <section className="py-20 bg-[#D4AF37]">
        <div className="container mx-auto px-8">
          <div className="flex items-center gap-4 mb-10 text-black">
            <Calendar size={32} strokeWidth={3} />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">
              Upcoming Campaign Events
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-black text-white p-8 rounded-[40px] flex gap-6 items-center"
              >
                <img
                  src={event.image}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="text-xl font-black">{event.title}</h4>
                  <p className="text-[#D4AF37] text-sm font-bold uppercase mt-1">
                    {event.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
