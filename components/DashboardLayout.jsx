"use client";
import React, { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import Footer from "./Footer";
import { useCampaignStore } from "@/lib/store";
import FloatingChat from "@/components/FloatingChat";
import {
  LayoutDashboard,
  Users,
  MapPin,
  LogOut,
  Menu,
  X,
  Newspaper,
  Shield,
  ClipboardList,
  Send,
  UserPlus,
  BarChart3,
  Vote,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children, roleTitle }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, reports } = useCampaignStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- DYNAMIC NOTIFICATION LOGIC ---
  const pendingReportsCount = useMemo(() => {
    if (user?.role !== "coordinator") return 0;
    return (reports || []).filter(
      (r) => r.lga === user?.lga && r.status === "Pending Review",
    ).length;
  }, [reports, user]);

  const getMenuItems = () => {
    const baseItems = [
      {
        icon: Vote,
        label: "Election Results",
        path:
          user?.role === "admin" ? "/admin/results" : "/coordinator/results",
      },
    ];

    switch (user?.role) {
      case "admin":
        return [
          { icon: BarChart3, label: "Strategy Room", path: "/admin" },
          { icon: Shield, label: "LGA Leads", path: "/admin/coordinators" },
          {
            icon: UserPlus,
            label: "Add Coordinator",
            path: "/admin/register-coordinator",
          },
          { icon: Users, label: "All Volunteers", path: "/admin/volunteers" },
          { icon: Newspaper, label: "News & Events", path: "/admin/cms" },
          {
            icon: ClipboardList,
            label: "Global Reports",
            path: "/admin/reports",
          },
          ...baseItems,
        ];
      case "coordinator":
        return [
          {
            icon: LayoutDashboard,
            label: "LGA Overview",
            path: "/coordinator",
          },
          {
            icon: Users,
            label: "My Volunteers",
            path: "/coordinator/volunteers",
          },
          {
            icon: UserPlus,
            label: "Register Agent",
            path: "/coordinator/register-volunteer",
          },
          { icon: Send, label: "Deploy Tasks", path: "/coordinator/tasks" },
          {
            icon: ClipboardList,
            label: "Review Reports",
            path: "/coordinator/reports",
            badge: pendingReportsCount,
          },
          {
            icon: Share2,
            label: "Recruit Supporters",
            path: "/coordinator/recruit",
          },
          {
            icon: Users,
            label: "Local Supporters",
            path: "/coordinator/supporters",
          },
          ...baseItems,
        ];
      case "volunteer":
        return [
          { icon: LayoutDashboard, label: "My Dashboard", path: "/volunteer" },
          {
            icon: ClipboardList,
            label: "Active Tasks",
            path: "/volunteer/tasks",
          },
          {
            icon: Share2,
            label: "Recruit Supporters",
            path: "/volunteer/recruit",
          },
          {
            icon: MapPin,
            label: "Submit Report",
            path: "/volunteer/monitoring",
          },
          { icon: Vote, label: "Live Results", path: "/public-site/results" },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex">
      {/* GLOBAL SCROLLBAR HIDER */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-80 bg-[#171515] flex-col fixed h-full z-50 shadow-2xl">
        {/* LOGO SECTION - Static */}
        <div className="p-10 pb-6">
          <div className="flex items-center space-x-4 mb-8">
            {/* 1. INCREASED SIZE & BOLD CONTRAST */}
            <div className="w-16 h-16 bg-[#D4AF37] rounded-3xl overflow-hidden flex items-center justify-center shadow-[0_10px_40px_-10px_#D4AF3740] border-2 border-white/10 shrink-0">
              <img
                src="/images/wura-logo.png"
                alt="Wura Didan Official Logo"
                className="w-full h-full object-contain p-2 scale-110"
              />
            </div>

            {/* 2. MATCHING BOLD TYPOGRAPHY */}
            <div className="flex flex-col">
              <span className="text-white font-black tracking-[0.2em] text-2xl uppercase italic leading-none">
                WURA DIDAN
              </span>
              <span className="text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.3em] mt-2 leading-none">
                Osun-East Command
              </span>
            </div>
          </div>
        </div>

        {/* SCROLLABLE MENU SECTION */}
        <nav className="flex-1 overflow-y-auto scrollbar-hide px-10 space-y-2 py-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-[#D4AF37] text-black font-black shadow-xl shadow-[#D4AF37]/20"
                    : "text-slate-500 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-black" : "text-slate-600 group-hover:text-[#D4AF37]"}`}
                  />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-left leading-none">
                    {item.label}
                  </span>
                </div>

                {item.badge > 0 && (
                  <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* LOGOUT SECTION - Fixed Bottom */}
        <div className="p-10 border-t border-white/5 bg-black">
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="flex items-center space-x-4 text-red-500 p-4 w-full hover:bg-red-500/10 rounded-2xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-black text-[10px] uppercase tracking-widest">
              Terminate Session
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-80 flex flex-col min-w-0">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2"
            >
              <Menu />
            </button>
            <h2 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] italic leading-none">
              {roleTitle}
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest leading-none">
                {user?.role}
              </p>
              <p className="text-[11px] text-slate-900 font-black mt-1 italic uppercase leading-none">
                {user?.lga || "District HQ"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center font-black text-[#D4AF37] border border-white/10 text-lg">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto w-full">{children}</main>

        <Footer />

        <FloatingChat />
      </div>
    </div>
  );
}
