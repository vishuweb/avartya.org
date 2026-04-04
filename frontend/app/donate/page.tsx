"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const purposeOptions = [
  { value: "general",   label: "General Fund",         icon: "🌍", desc: "Support our overall mission" },
  { value: "trees",     label: "Tree Plantation",       icon: "🌳", desc: "Plant more native trees" },
  { value: "education", label: "Education",             icon: "📚", desc: "Support student programmes" },
  { value: "women",     label: "Women Empowerment",     icon: "💜", desc: "Support women's safety & skills" },
  { value: "health",    label: "Health Awareness",      icon: "❤️", desc: "Fund health camps & awareness" },
];

const amounts = [100, 250, 500, 1000, 2500, 5000];

export default function DonatePage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    amount: "", purpose: "general",
    message: "", isAnonymous: false,
  });
  const [customAmount, setCustomAmount] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const selectAmount = (amt: number) => {
    setSelectedPreset(amt);
    setCustomAmount(false);
    setForm({ ...form, amount: String(amt) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.amount) {
      setError("Name, email and amount are required.");
      return;
    }
    if (Number(form.amount) < 1) {
      setError("Amount must be at least ₹1.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations/interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You! 💛</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Your support means the world to us. Our team will reach out to you shortly to complete your donation.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              A confirmation will be sent to <strong>{form.email}</strong>
            </p>
            <button
              onClick={() => { setSuccess(false); setForm({ name: "", email: "", phone: "", amount: "", purpose: "general", message: "", isAnonymous: false }); setSelectedPreset(null); }}
              className="mt-6 text-green-600 font-semibold hover:underline text-sm"
            >
              Make another donation
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
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-yellow-600 to-orange-600 py-16 px-4 text-white text-center">
          <p className="text-yellow-200 text-sm font-bold tracking-widest uppercase mb-3">Make a Difference</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Support AVARTYA</h1>
          <p className="text-yellow-100 max-w-xl mx-auto text-lg">
            Every rupee you give directly funds real impact — trees planted, students supported, and communities empowered.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-8 py-6">
              <h2 className="text-xl font-bold text-white">Register Your Support</h2>
              <p className="text-green-200 text-sm mt-1">
                Fill in the form — our team will contact you to complete your donation securely via Razorpay.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Purpose Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  I want to support
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {purposeOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.purpose === opt.value
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="purpose"
                        value={opt.value}
                        checked={form.purpose === opt.value}
                        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                        className="sr-only"
                      />
                      <span className="text-2xl shrink-0">{opt.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{opt.label}</p>
                        <p className="text-xs text-gray-500">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Choose Amount (₹)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => selectAmount(amt)}
                      className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                        selectedPreset === amt && !customAmount
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-200 text-gray-700 hover:border-green-400"
                      }`}
                    >
                      ₹{amt >= 1000 ? `${amt / 1000}k` : amt}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => { setCustomAmount(true); setSelectedPreset(null); setForm({ ...form, amount: "" }); }}
                  className={`text-sm font-semibold px-4 py-2 rounded-xl border-2 transition-all ${
                    customAmount ? "border-green-500 text-green-700 bg-green-50" : "border-gray-200 text-gray-500 hover:border-green-300"
                  }`}
                >
                  Custom Amount
                </button>
                {customAmount && (
                  <div className="mt-3 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                    <input
                      type="number"
                      min={1}
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      placeholder="Enter amount"
                      className="w-full pl-8 border-2 border-green-400 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Donor Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message (optional)</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Any message for the team..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={form.isAnonymous}
                      onChange={(e) => setForm({ ...form, isAnonymous: e.target.checked })}
                      className="w-4 h-4 accent-green-600"
                    />
                    Donate anonymously (your name won't be shown publicly)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (!form.amount)}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-base hover:bg-green-700 transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  "💛 Register My Donation"
                )}
                {!loading && form.amount && ` — ₹${Number(form.amount).toLocaleString("en-IN")}`}
              </button>

              <p className="text-center text-xs text-gray-400">
                Your information is secure and will only be used by Avartya Foundation. Razorpay payment link will be shared by our team.
              </p>
            </form>
          </div>

          {/* Transparency Note */}
          <div className="mt-8 bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center">
            <p className="text-emerald-800 font-semibold mb-1">100% Transparent Usage</p>
            <p className="text-emerald-600 text-sm">
              All donations are logged, tracked, and published on our platform. You can view the impact every rupee creates.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
