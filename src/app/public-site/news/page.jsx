"use client";
import React from "react";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import { useCampaignStore } from "@/lib/store";
import { Calendar, Newspaper, ArrowRight, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsPage() {
  // Connect to the real-time news feed managed by the Admin
  const news = useCampaignStore((state) => state.news) ?? [];

  return (
    <div className="bg-[#050a0a] min-h-screen text-white">
      <PublicNavbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* HEADER SECTION */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#D4AF37] font-black tracking-[0.5em] uppercase text-xs">
              Press & Media
            </span>
            <h1 className="text-5xl md:text-7xl font-black mt-4 italic uppercase">
              Latest <span className="text-[#D4AF37]">Updates</span>
            </h1>
          </motion.div>
        </div>

        {/* NEWS LIST */}
        <div className="space-y-10">
          {news.length > 0 ? (
            news.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row bg-white/5 border border-white/10 rounded-[48px] overflow-hidden hover:border-[#D4AF37]/40 hover:bg-white/[0.07] transition-all duration-500 group cursor-pointer shadow-2xl"
              >
                {/* Image/Flyer Section - Displays the Admin's uploaded file */}
                <div className="md:w-[400px] h-64 md:h-auto relative overflow-hidden bg-slate-900">
                  <img
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                {/* Text Content Section */}
                <div className="p-10 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter border border-[#D4AF37]/20">
                      {item.category || "Press Release"}
                    </span>
                    <button className="text-slate-500 hover:text-[#D4AF37] transition">
                      <Share2 size={18} />
                    </button>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-black mb-6 leading-tight group-hover:text-[#D4AF37] transition duration-300">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                    <div className="flex items-center text-slate-400 text-sm font-bold">
                      <Calendar className="w-5 h-5 mr-3 text-[#D4AF37]" />
                      Published: {item.createdAt}
                    </div>
                    <div className="hidden md:flex items-center text-xs font-black uppercase text-white group-hover:gap-3 transition-all">
                      Read Full Story{" "}
                      <ArrowRight size={16} className="text-[#D4AF37]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            /* EMPTY STATE */
            <div className="py-40 text-center bg-white/5 rounded-[60px] border border-dashed border-white/10">
              <Newspaper className="w-20 h-20 text-slate-800 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-500 uppercase tracking-widest">
                No News Articles Found
              </h3>
              <p className="text-slate-600 mt-2 font-bold italic">
                Check back soon for media updates and press releases.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
