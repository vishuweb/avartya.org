"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const issueTypes = [
  "Safety Concern", "Domestic Violence", "Legal Help",
  "Financial Support", "Medical Help", "Counseling", "Other",
];

export default function WomenHelpPage() {
  const [form, setForm] = useState({
    name: "", contact: "", issue: "", location: "", issueType: "Other", isAnonymous: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/women-help`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Could not connect. Please call our helpline directly: +91 8881171609");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">

        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-purple-800 to-pink-700 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-pink-300 text-sm font-bold tracking-widest uppercase mb-3">You Are Not Alone</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Women Help & Support</h1>
            <p className="text-pink-100 text-lg max-w-xl mx-auto">
              Reach out confidentially. Our team will respond with care and urgency.
              All submissions are private and admin-only.
            </p>
          </div>
        </section>

        {/* Emergency Numbers */}
        <div className="bg-red-50 border-y border-red-200">
          <div className="max-w-4xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-6 text-sm text-center">
            <div>
              <p className="font-bold text-red-700">🆘 Women Helpline</p>
              <a href="tel:1091" className="text-red-600 font-mono text-lg hover:underline">1091</a>
            </div>
            <div>
              <p className="font-bold text-red-700">🚨 Emergency Police</p>
              <a href="tel:100" className="text-red-600 font-mono text-lg hover:underline">100</a>
            </div>
            <div>
              <p className="font-bold text-red-700">💜 Avartya Helpline</p>
              <a href="tel:8881171609" className="text-red-600 font-mono text-lg hover:underline">+91 8881171609</a>
            </div>
          </div>
        </div>

        {/* Form / Success */}
        <div className="max-w-2xl mx-auto px-4 py-12">
          {success ? (
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Request Received 💜</h2>
              <p className="text-gray-600 leading-relaxed">
                Your request has been received safely. Our team will contact you as soon as possible.
                Remember — you are not alone, and help is on its way.
              </p>
              <div className="mt-6 p-4 bg-red-50 rounded-xl text-sm text-red-700">
                If this is an emergency, please call <strong>100</strong> (Police) or <strong>1091</strong> (Women Helpline) immediately.
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-700 to-pink-600 px-8 py-6">
                <h2 className="text-xl font-bold text-white">Submit Help Request</h2>
                <p className="text-purple-200 text-sm mt-1">Confidential — only Avartya admins can see this</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Anonymous toggle */}
                <label className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl cursor-pointer group">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={form.isAnonymous}
                    onChange={handleChange}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Submit Anonymously</p>
                    <p className="text-xs text-gray-500">Your name won&apos;t be stored, but we&apos;ll still need a way to contact you</p>
                  </div>
                </label>

                {!form.isAnonymous && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Contact Details * <span className="text-gray-400 font-normal">(phone or email)</span>
                  </label>
                  <input
                    name="contact" required value={form.contact} onChange={handleChange}
                    placeholder="Phone number or email address"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type of Help Needed</label>
                  <select
                    name="issueType" value={form.issueType} onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {issueTypes.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Describe Your Situation *</label>
                  <textarea
                    name="issue" required rows={5} value={form.issue} onChange={handleChange}
                    placeholder="Please describe what you are going through. We are here to help and everything is confidential."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Location (Optional)</label>
                  <input
                    name="location" value={form.location} onChange={handleChange}
                    placeholder="City or district (helps us assist better)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {form.isAnonymous && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name (for anonymous) *</label>
                    <input
                      name="name" required value={form.name} onChange={handleChange}
                      placeholder="Use 'Anonymous' or a code name"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-700 text-white py-4 rounded-xl font-bold hover:bg-purple-800 transition-all hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "💜 Submit Request"
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  Your request is completely private. Only Avartya Foundation admins can view it.
                </p>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
