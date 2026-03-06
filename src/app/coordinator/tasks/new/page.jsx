"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import { OSUN_EAST_MAP } from "@/lib/geoData";
import {
  Send,
  Calendar,
  MapPin,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

export default function NewTaskDeployment() {
  const { user, addTask } = useCampaignStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ward: "",
    deadline: "",
    priority: "Normal",
    type: "Field Activity",
  });

  const myWards = OSUN_EAST_MAP[user?.lga] || [];

  const handleDeploy = (e) => {
    e.preventDefault();
    if (!formData.ward) return alert("Please select a target Ward.");

    // Deploy task with Coordinator's LGA lock
    addTask({
      ...formData,
      lga: user.lga,
      deployedBy: user.name,
      status: "Pending",
    });

    alert(`Task deployed to ${formData.ward}!`);
    router.push("/coordinator/tasks");
  };

  return (
    <DashboardLayout roleTitle="New Mission Deployment">
      <div className="max-w-3xl bg-white p-10 rounded-[50px] shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]" />

        <div className="flex items-center gap-4 mb-10">
          <div className="bg-black p-4 rounded-2xl text-[#D4AF37]">
            <ClipboardList size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter">
              Deploy Field Mission
            </h2>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
              LGA: {user?.lga}
            </p>
          </div>
        </div>

        <form onSubmit={handleDeploy} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
              Mission Title
            </label>
            <input
              required
              placeholder="e.g. Market Woman PVC Sensitization"
              className="w-full p-5 bg-slate-50 rounded-3xl outline-none focus:border-[#D4AF37] border border-transparent font-bold"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
              Briefing / Instructions
            </label>
            <textarea
              required
              rows={4}
              placeholder="Detailed instructions for field agents..."
              className="w-full p-5 bg-slate-50 rounded-3xl outline-none focus:border-[#D4AF37] border border-transparent font-medium text-sm"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                Target Ward
              </label>
              <select
                className="w-full p-5 bg-slate-50 rounded-3xl outline-none font-black text-xs"
                onChange={(e) =>
                  setFormData({ ...formData, ward: e.target.value })
                }
                required
              >
                <option value="">Select Ward</option>
                {myWards.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                Submission Deadline
              </label>
              <input
                type="date"
                required
                className="w-full p-5 bg-slate-50 rounded-3xl outline-none font-black text-xs"
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-3xl border border-amber-100">
            <AlertCircle className="text-amber-600" size={20} />
            <p className="text-[10px] font-bold text-amber-700 uppercase leading-relaxed">
              This task will be visible to all verified Volunteers in the
              selected Ward.
            </p>
          </div>

          <button className="w-full bg-black text-white font-black py-6 rounded-3xl hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest">
            <Send size={18} /> Broadcast to Field Agents
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
