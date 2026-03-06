"use client";
import { useState, useRef, useEffect } from "react";
import { useCampaignStore } from "@/lib/store";
import { Send, X, MessageSquare, Shield, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChat() {
  const { user, messages, addMessage } = useCampaignStore();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  // Context: Coordinators chat in their LGA, Admins see Global
  const chatContext =
    user?.role === "admin" ? "Global HQ" : user?.lga || "Field General";

  const relevantMessages = messages.filter((m) =>
    user?.role === "admin" ? true : m.context === chatContext,
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage({
      context: chatContext,
      senderName: user.name,
      senderRole: user.role,
      text: input,
    });
    setInput("");
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-96 h-[500px] bg-white rounded-[40px] shadow-2xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-black p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D4AF37] rounded-xl flex items-center justify-center text-black">
                  <Shield size={16} />
                </div>
                <div>
                  <h4 className="text-white text-[10px] font-black uppercase tracking-widest">
                    {chatContext}
                  </h4>
                  <p className="text-[#D4AF37] text-[8px] font-bold uppercase italic">
                    Secure Channel
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Feed */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50"
            >
              {relevantMessages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.senderName === user.name ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-[24px] text-xs ${
                      m.senderName === user.name
                        ? "bg-[#D4AF37] text-black font-bold rounded-tr-none"
                        : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none"
                    }`}
                  >
                    <p className="text-[8px] font-black uppercase opacity-40 mb-1">
                      {m.senderName}
                    </p>
                    <p>{m.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-4 bg-white border-t border-slate-50 flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send intelligence..."
                className="flex-1 bg-slate-100 p-4 rounded-2xl outline-none text-xs font-bold"
              />
              <button className="bg-black text-[#D4AF37] p-4 rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all">
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-black text-[#D4AF37] rounded-[24px] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 border border-[#D4AF37]/20"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && relevantMessages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-[#fcfcfc] animate-bounce">
            {relevantMessages.length}
          </span>
        )}
      </button>
    </div>
  );
}
