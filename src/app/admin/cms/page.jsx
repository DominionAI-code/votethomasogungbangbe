"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useCampaignStore } from "@/lib/store";
import {
  Plus,
  Trash2,
  Calendar,
  Newspaper,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminCMS() {
  const { news, events, addNews, deleteNews, addEvent, deleteEvent } =
    useCampaignStore();

  // State for News Form
  const [newsData, setNewsData] = useState({
    title: "",
    category: "Press",
    content: "",
    image: null,
  });
  // State for Event Form
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    image: null,
  });

  // Image Upload Helper
  const handleImage = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "news") setNewsData({ ...newsData, image: reader.result });
        else setEventData({ ...eventData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitNews = (e) => {
    e.preventDefault();
    addNews({
      ...newsData,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
    });
    setNewsData({ title: "", category: "Press", content: "", image: null });
    alert("News published to Public Site!");
  };

  const submitEvent = (e) => {
    e.preventDefault();
    addEvent({ ...eventData, id: Date.now() });
    setEventData({ title: "", date: "", image: null });
    alert("Event added to Public Site!");
  };

  return (
    <DashboardLayout roleTitle="Content Management System">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* --- NEWS DESK --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8">
            <Newspaper className="text-[#D4AF37]" />
            <h3 className="text-xl font-black uppercase italic">News Desk</h3>
          </div>

          <form onSubmit={submitNews} className="space-y-4">
            <select
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none font-bold text-slate-600"
              onChange={(e) =>
                setNewsData({ ...newsData, category: e.target.value })
              }
              value={newsData.category}
            >
              <option>Press News</option>
              <option>Interview</option>
              <option>Campaign Show</option>
              <option>Town Hall Update</option>
            </select>

            <input
              placeholder="Headline Title"
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37]"
              value={newsData.title}
              onChange={(e) =>
                setNewsData({ ...newsData, title: e.target.value })
              }
              required
            />

            <div className="relative h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden">
              {newsData.image ? (
                <img
                  src={newsData.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImageIcon className="text-slate-300" />
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Upload News Image/Flyer
                  </p>
                </>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleImage(e, "news")}
              />
            </div>

            <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all">
              Publish News
            </button>
          </form>

          <div className="mt-10 space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
              Live on Website
            </p>
            {news.map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg overflow-hidden border border-slate-200">
                    <img src={n.image} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 line-clamp-1">
                    {n.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteNews(n.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* --- EVENT DESK --- */}
        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 h-fit">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-[#D4AF37]" />
            <h3 className="text-xl font-black uppercase italic">
              Event Schedule
            </h3>
          </div>

          <form onSubmit={submitEvent} className="space-y-4">
            <input
              placeholder="Event Name"
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none border border-transparent focus:border-[#D4AF37]"
              value={eventData.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
              required
            />
            <input
              type="date"
              className="w-full p-4 bg-slate-50 rounded-2xl outline-none"
              value={eventData.date}
              onChange={(e) =>
                setEventData({ ...eventData, date: e.target.value })
              }
              required
            />
            <div className="relative h-32 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden">
              {eventData.image ? (
                <img
                  src={eventData.image}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImageIcon className="text-slate-300" />
                  <p className="text-[10px] font-black text-slate-400 uppercase">
                    Upload Event Flyer
                  </p>
                </>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleImage(e, "event")}
              />
            </div>

            <button className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-2xl hover:bg-black hover:text-[#D4AF37] transition-all">
              Add to Calendar
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
