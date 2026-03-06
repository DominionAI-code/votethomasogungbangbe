"use client";
import DashboardLayout from "@/components/DashboardLayout";
import SignupQR from "@/components/SignupQR";
import { useCampaignStore } from "@/lib/store";

export default function VolunteerRecruitPage() {
  const { user } = useCampaignStore();
  // Ensure this points to your live domain when you go live
  const signupUrl = "http://localhost:3000/public-site/supporters-signup";

  return (
    <DashboardLayout roleTitle="Field Growth">
      <div className="max-w-md mx-auto py-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Grow the <span className="text-[#D4AF37]">Team</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            Your Ward: {user?.ward}
          </p>
        </div>

        {/* Reusing the professional SignupQR component we created */}
        <SignupQR url={signupUrl} />

        <div className="bg-black p-8 rounded-[40px] text-white">
          <p className="text-[9px] font-black uppercase text-[#D4AF37] mb-3 tracking-widest">
            Instructions
          </p>
          <ul className="text-xs space-y-3 font-medium opacity-80">
            <li className="flex gap-2">
              • Show this QR code to interested supporters
            </li>
            <li className="flex gap-2">
              • Ask them to scan it with their phone camera
            </li>
            <li className="flex gap-2">
              • Ensure they select <b>{user?.lga}</b> and <b>{user?.ward}</b> on
              the form
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
}
