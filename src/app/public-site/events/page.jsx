"use client";
import React from "react";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import { useCampaignStore } from "@/lib/store";
import { MapPin, Calendar, Clock, Bell, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsPage() {
  // Fetch real events pushed by the Admin from the global store
  const events = useCampaignStore((state) => state.events) ?? [];

  return (
    <div className="bg-[#050a0a] min-h-screen text-white">
      <PublicNavbar />
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[#D4AF37] font-black tracking-[0.4em] uppercase text-xs">
              On The Ground
            </span>
            <h1 className="text-5xl md:text-7xl font-black mt-4 italic uppercase">
              Campaign <span className="text-[#D4AF37]">Events</span>
            </h1>
          </motion.div>
          <button className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl flex items-center hover:bg-[#D4AF37] hover:text-black transition-all font-black uppercase text-xs tracking-widest">
            <Bell className="w-4 h-4 mr-2" /> Get Notifications
          </button>
        </div>

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {events.length > 0 ? (
            events.map((event) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white/5 border border-white/10 rounded-[48px] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 shadow-2xl"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image/Flyer Section */}
                  <div className="md:w-52 h-64 md:h-auto relative overflow-hidden">
                    <img
                      src={
                        event.image ||
                        "https://images.unsplash.com/photo-1540575861501-7ad05823c95b?w=800"
                      }
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border border-[#D4AF37]/20">
                        Osun-East District
                      </span>
                      <button className="text-slate-500 hover:text-[#D4AF37] transition">
                        <Share2 size={18} />
                      </button>
                    </div>

                    <h3 className="text-2xl font-black mb-6 group-hover:text-[#D4AF37] transition duration-300 leading-tight">
                      {event.title}
                    </h3>

                    <div className="space-y-4 mt-auto">
                      <div className="flex items-center text-sm font-bold text-slate-300">
                        <Calendar className="w-5 h-5 mr-3 text-[#D4AF37]" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm font-bold text-slate-400">
                        <Clock className="w-5 h-5 mr-3 text-[#D4AF37]" />
                        Scheduled: 10:00 AM
                      </div>
                      <div className="flex items-center text-sm font-bold text-slate-400">
                        <MapPin className="w-5 h-5 mr-3 text-[#D4AF37]" />
                        Constituency HQ, Ife
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-40 text-center bg-white/5 rounded-[60px] border border-dashed border-white/10">
              <Calendar className="w-20 h-20 text-slate-800 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-500 uppercase tracking-widest">
                No Events Scheduled
              </h3>
              <p className="text-slate-600 mt-2 font-bold">
                Check back soon for upcoming town halls and rallies.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
