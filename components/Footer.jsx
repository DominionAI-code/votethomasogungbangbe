"use client";
import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    campaign: [
      { name: "The Journey", href: "/public-site/journey" },
      { name: "Our Agenda", href: "/public-site/agenda" },
      { name: "News Updates", href: "/public-site/news" },
      { name: "Upcoming Events", href: "/public-site/events" },
    ],
    support: [
      { name: "Join the Team", href: "/public-site/supporters-signup" },
      { name: "Volunteer Portal", href: "/login" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* BRAND COLUMN */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-2xl flex items-center justify-center font-black text-black text-2xl">
                TO
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black tracking-[0.2em] text-xl uppercase italic leading-none">
                  WURA DIDAN
                </span>
                <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mt-1">
                  Brilliance 2026
                </span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Building the Golden Era for Osun-East. A movement driven by
              innovation, integrity, and the collective will of the people.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-[#D4AF37] font-black uppercase text-xs tracking-[0.3em] mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.campaign.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT & LEGAL */}
          <div>
            <h4 className="text-[#D4AF37] font-black uppercase text-xs tracking-[0.3em] mb-8">
              Involvement
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT & COMMAND */}
          <div className="bg-white/5 p-8 rounded-[40px] border border-white/5">
            <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-6 flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#D4AF37]" /> Command HQ
            </h4>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] shrink-0" />
                <span>Osun-East District Office, Ife Central, Osun State</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37] shrink-0" />
                <span>+234 800 WURA DIDAN</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37] shrink-0" />
                <span>intel@wuradidan2026.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center md:text-left">
            © {currentYear} Wura Didan Campaign Organization. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">
              Powered by DominionAI Tech Services Limited
            </p>
            <ExternalLink size={12} className="text-slate-800" />
          </div>
        </div>
      </div>
    </footer>
  );
}
