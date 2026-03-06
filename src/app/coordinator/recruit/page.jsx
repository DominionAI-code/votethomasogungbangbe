"use client";
import DashboardLayout from "@/components/DashboardLayout";
import SignupQR from "@/components/SignupQR";

export default function RecruitPage() {
  // Use your actual live domain if deployed, otherwise localhost for testing
  const signupUrl = "http://localhost:3000/public-site/supporters-signup";

  return (
    <DashboardLayout roleTitle="Growth Command">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16 py-10">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-tight">
            Expand the <span className="text-[#D4AF37]">Golden Era</span>{" "}
            Movement
          </h2>
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            Use this official QR code to register new supporters instantly.
            Perfect for town hall meetings, door-to-door visits, and social
            gatherings.
          </p>

          <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">
              Live Deployment Link
            </p>
            <code className="text-xs font-bold text-slate-600 break-all">
              {signupUrl}
            </code>
          </div>
        </div>

        <div className="flex-1">
          <SignupQR url={signupUrl} />
        </div>
      </div>
    </DashboardLayout>
  );
}
