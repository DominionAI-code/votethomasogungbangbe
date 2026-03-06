"use client";
import React from "react";
import Image from "next/image"; //cite: 1, 2
import { useRouter } from "next/navigation";
import { Menu, X, UserPlus } from "lucide-react";

export default function PublicNavbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Home", path: "/public-site" },
    { name: "The Journey", path: "/public-site/profile" },
    { name: "Agenda", path: "/public-site/manifesto" },
    { name: "News", path: "/public-site/news" },
    { name: "Events", path: "/public-site/events" },
  ];

  return (
    <nav className="bg-[#050a0a] text-white sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* =========================================
            NEW BOLDEST LOGO SECTION
            ========================================= */}
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => router.push("/public-site")}
        >
          {/* Logo Container with Custom gold 'glow' for boldness */}
          <div className="relative w-16 h-16 p-1 bg-black rounded-3xl border border-white/10 shadow-[0_0_15px_-3px_rgba(212,175,55,0.3)] group hover:border-[#D4AF37]/50 transition-all duration-300">
            <Image
              src="/images/wura-logo.png" //cite: 3
              alt="WURA DIDAN Logo"
              fill
              className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
              priority //cite: 2, 4
            />
          </div>

          {/* Text branding alongside logo */}
          <div>
            <h1 className="text-xl font-extrabold leading-none tracking-tight">
              WURA<span className="text-[#D4AF37]">DIDAN</span>
            </h1>
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em]">
              Brilliance 2026
            </p>
          </div>
        </div>
        {/* ========================================= */}

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1 bg-white/5 p-1 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => router.push(link.path)}
              className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition"
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={() => router.push("/public-site/supporters-signup")}
            className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm flex items-center hover:bg-[#D4AF37] hover:shadow-[0_0_10px_rgba(212,175,55,0.5)] transition duration-300"
          >
            <UserPlus className="w-4 h-4 mr-2" /> Join Team
          </button>
          <button
            onClick={() => router.push("/login")}
            className="text-slate-400 hover:text-white text-sm font-medium border-l border-white/20 pl-4"
          >
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden bg-[#050a0a] border-b border-white/10 p-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                router.push(link.path);
                setIsOpen(false);
              }}
              className="text-left text-lg font-medium p-2 hover:bg-white/5 rounded-lg"
            >
              {link.name}
            </button>
          ))}
          <div className="border-t border-white/10 pt-4 mt-2">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-[#D4AF37] text-black p-4 rounded-xl font-bold shadow-lg"
            >
              Access Dashboard
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
