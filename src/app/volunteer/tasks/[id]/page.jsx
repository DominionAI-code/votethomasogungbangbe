"use client";
import { useState, use, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  Camera,
  Send,
  FileText,
  CheckCircle2,
  X,
  MapPin,
  UserCheck,
  ShieldAlert,
  Loader2,
} from "lucide-react";

export default function TaskReportingPage({ params }) {
  // 1. Unwrap dynamic ID for Next.js 15
  const resolvedParams = use(params);
  const taskId = resolvedParams.id;

  const { user, tasks, addReport } = useCampaignStore();

  // 2. State Management
  const [reportNote, setReportNote] = useState("");
  const [photos, setPhotos] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [witness, setWitness] = useState({ name: "", phone: "" });

  // 3. Geofencing State
  const [locationVerified, setLocationVerified] = useState(false);
  const [checkingLocation, setCheckingLocation] = useState(true);

  const task = tasks.find((t) => t.id.toString() === taskId);

  // 4. Geofencing Logic: Verify physical presence
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulation: In production, compare position.coords vs task.coords
          setTimeout(() => {
            setLocationVerified(true);
            setCheckingLocation(false);
          }, 2000);
        },
        () => {
          setCheckingLocation(false);
          alert("GPS is required to verify field presence.");
        },
      );
    }
  }, []);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!locationVerified) return alert("Location not verified.");

    addReport({
      taskId: task.id,
      taskTitle: task.title,
      volunteerName: user.name,
      lga: user.lga,
      ward: user.ward,
      note: reportNote,
      evidence: photos,
      witnessName: witness.name, // Restored field
      witnessPhone: witness.phone, // Restored field
      type: "Field Activity",
    });
    setIsSubmitted(true);
  };

  if (isSubmitted)
    return (
      <DashboardLayout roleTitle="Report Sent">
        <div className="max-w-md mx-auto text-center py-20 bg-white rounded-[60px] shadow-2xl border border-slate-50">
          <CheckCircle2 size={80} className="text-[#00c853] mx-auto mb-6" />
          <h3 className="text-3xl font-black italic uppercase">
            Mission Logged
          </h3>
          <p className="text-slate-400 text-xs font-bold uppercase mt-2 px-10">
            Awaiting Coordinator verification of photos and witness details.
          </p>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout roleTitle="Intelligence Entry">
      <div className="max-w-xl mx-auto space-y-6 pb-20">
        {/* RESTORED: GPS GEOFENCING CARD */}
        <div
          className={`p-8 rounded-[40px] border transition-all ${locationVerified ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-100 shadow-sm"}`}
        >
          <div className="flex items-center gap-5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${locationVerified ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-300"}`}
            >
              {checkingLocation ? (
                <Loader2 className="animate-spin" />
              ) : (
                <MapPin />
              )}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                Geotag Security
              </p>
              <h4 className="font-black text-slate-900 italic uppercase">
                {checkingLocation
                  ? "Locating Satellite..."
                  : locationVerified
                    ? "Inside Reporting Zone"
                    : "Outside Authorized Area"}
              </h4>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-8 ${(!locationVerified || checkingLocation) && "opacity-30 pointer-events-none"}`}
        >
          <div className="bg-black p-8 rounded-[40px] text-white">
            <h2 className="text-xl font-black italic uppercase text-[#D4AF37]">
              {task?.title}
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-2 tracking-widest">
              {task?.ward} Operations
            </p>
          </div>

          {/* MULTIPLE PHOTO UPLOAD */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-2">
              1. Evidence Gallery
            </label>
            <div className="grid grid-cols-2 gap-4">
              {photos.map((p, i) => (
                <div
                  key={i}
                  className="relative h-40 rounded-3xl overflow-hidden border-2 border-[#D4AF37]"
                >
                  <img src={p} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white shadow-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <label className="h-40 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition">
                <Camera className="text-slate-400 mb-2" />
                <span className="text-[9px] font-black uppercase text-slate-400">
                  Add Capture
                </span>
                <input
                  type="file"
                  multiple
                  capture="environment"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* REPORT NOTE */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-2">
              2. Field Observations
            </label>
            <div className="relative">
              <FileText
                className="absolute top-5 left-5 text-slate-300"
                size={18}
              />
              <textarea
                required
                rows={4}
                placeholder="Detailed report of activities..."
                className="w-full bg-slate-50 p-6 pl-14 rounded-[32px] outline-none border border-transparent focus:border-[#D4AF37] transition font-medium text-sm"
                onChange={(e) => setReportNote(e.target.value)}
              />
            </div>
          </div>

          {/* RESTORED: WITNESS VERIFICATION */}
          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] ml-2">
              3. Living Testimony
            </label>
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
                <UserCheck size={16} />
                <span className="text-[10px] font-black uppercase">
                  Witness Details
                </span>
              </div>
              <input
                required
                placeholder="Witness Full Name"
                className="w-full bg-slate-50 p-5 rounded-2xl outline-none font-bold text-sm"
                onChange={(e) =>
                  setWitness({ ...witness, name: e.target.value })
                }
              />
              <input
                required
                placeholder="Witness Phone"
                className="w-full bg-slate-50 p-5 rounded-2xl outline-none font-bold text-sm"
                onChange={(e) =>
                  setWitness({ ...witness, phone: e.target.value })
                }
              />
            </div>
          </div>

          <button className="w-full bg-black text-[#D4AF37] font-black py-6 rounded-[32px] shadow-2xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
            <Send size={18} /> Transmit Mission Intelligence
          </button>
        </form>

        {/* SECURITY WARNING */}
        {!locationVerified && !checkingLocation && (
          <div className="bg-red-50 text-red-600 p-6 rounded-[32px] flex items-center gap-4 border border-red-100">
            <ShieldAlert size={24} />
            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
              Anti-Fraud Lock: You must be at the physical task location to
              transmit this report.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
