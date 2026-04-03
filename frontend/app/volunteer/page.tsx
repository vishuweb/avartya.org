"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const educationOptions = [
  "High School", "Intermediate", "Diploma", "B.Tech", "B.Sc",
  "B.Com", "B.A", "M.Tech", "M.Sc", "M.A", "MBA", "PhD", "Other",
];

const motivationOptions = [
  "Environment Protection", "Women Safety", "Social Service",
  "Community Development", "Learning & Experience", "Health Awareness", "Education Support",
];

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", education: "",
    previousWork: "", skills: "", city: "", availability: "", motivation: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/volunteers/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch {
      setError("Connection error. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You! 🌱</h2>
            <p className="text-gray-600 leading-relaxed">
              Your registration has been received. The Avartya team will reach out to you soon.
              Welcome to the family!
            </p>
            <button
              onClick={() => { setSuccess(false); setFormData({ name: "", email: "", phone: "", education: "", previousWork: "", skills: "", city: "", availability: "", motivation: "" }); }}
              className="mt-6 text-green-600 font-semibold hover:underline text-sm"
            >
              Register another volunteer
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">

        {/* Hero */}
        <section className="py-16 px-4 text-center">
          <p className="text-green-600 text-sm font-bold tracking-widest uppercase mb-3">Join The Movement</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Become a <span className="text-green-600">Volunteer</span>
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto text-lg">
            Be the change. Join 300+ volunteers driving real impact across environment, education & women's safety.
          </p>
        </section>

        {/* Form */}
        <section className="max-w-2xl mx-auto px-4 pb-20">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-8 py-6">
              <h2 className="text-xl font-bold text-white">Volunteer Registration</h2>
              <p className="text-green-200 text-sm mt-1">Fill in your details below</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                  <input
                    name="name" required value={formData.name} onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    name="email" type="email" required value={formData.email} onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    name="phone" type="tel" value={formData.phone} onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">City</label>
                  <input
                    name="city" value={formData.city} onChange={handleChange}
                    placeholder="Your city"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Education */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Education</label>
                  <select
                    name="education" value={formData.education} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  >
                    <option value="">Select education level</option>
                    {educationOptions.map((e) => <option key={e}>{e}</option>)}
                  </select>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Availability</label>
                  <select
                    name="availability" value={formData.availability} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  >
                    <option value="">When can you help?</option>
                    <option>Weekends</option>
                    <option>Weekdays</option>
                    <option>Both</option>
                    <option>Occasionally</option>
                  </select>
                </div>

                {/* Motivation */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">I am interested in *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {motivationOptions.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                          formData.motivation === opt
                            ? "border-green-500 bg-green-50 text-green-700 font-medium"
                            : "border-gray-200 hover:border-green-300 text-gray-600"
                        }`}
                      >
                        <input
                          type="radio" name="motivation" value={opt}
                          checked={formData.motivation === opt}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                          formData.motivation === opt ? "bg-green-500 border-green-500" : "border-gray-300"
                        }`} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skills</label>
                  <input
                    name="skills" value={formData.skills} onChange={handleChange}
                    placeholder="e.g. Communication, Photography, Teaching..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>

                {/* Previous Work */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Previous Volunteer Experience</label>
                  <textarea
                    name="previousWork" rows={3} value={formData.previousWork} onChange={handleChange}
                    placeholder="Tell us about any previous NGO or volunteer work..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-base hover:bg-green-700 transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "🌱 Join as a Volunteer"
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Your information is secure and will only be used by Avartya Foundation.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}