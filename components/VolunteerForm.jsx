"use client";
import React, { useState } from "react";
import { useCampaignStore } from "../lib/store";
import { CheckCircle2 } from "lucide-react";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "Lagos",
  });
  const [submitted, setSubmitted] = useState(false);
  const addVolunteer = useCampaignStore((state) => state.addVolunteer);

  const handleSubmit = (e) => {
    e.preventDefault();
    addVolunteer({ ...formData, id: Date.now(), status: "Pending" });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 p-8 rounded-3xl text-center border border-green-100">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900">
          Application Received!
        </h3>
        <p className="text-green-700 mt-2">
          Our coordinators will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-4"
    >
      <h3 className="text-xl font-bold mb-6">Join the Movement</h3>
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <select
        className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
      >
        <option>Lagos</option>
        <option>Abuja</option>
        <option>Port Harcourt</option>
      </select>
      <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition">
        Register as Volunteer
      </button>
    </form>
  );
}
