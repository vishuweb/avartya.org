"use client";

import { useState } from "react";

export default function AdminEmailPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterInterest, setFilterInterest] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm(`Send email to all matching active volunteers?\n\nSubject: ${subject}`)) return;

    setSending(true);
    setResult(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ subject, body, filterCity, filterInterest }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ message: "Failed to send. Check server connection." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Send Bulk Email</h1>
        <p className="text-sm text-gray-500 mt-0.5">Target active volunteers by interest or city</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSend} className="space-y-5">

          {/* Filters */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">🎯 Target Audience (Optional Filters)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Filter by City</label>
                <input
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  placeholder="e.g. Gorakhpur"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Filter by Interest</label>
                <select
                  value={filterInterest}
                  onChange={(e) => setFilterInterest(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Interests</option>
                  <option value="Environment Protection">Environment Protection</option>
                  <option value="Women Safety">Women Safety</option>
                  <option value="Social Service">Social Service</option>
                  <option value="Community Development">Community Development</option>
                  <option value="Health Awareness">Health Awareness</option>
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              ℹ️ Leave both empty to target all active volunteers.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Email Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Subject *</label>
            <input
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Upcoming Tree Plantation Drive — Join Us!"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Body *</label>
            <textarea
              required
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email message here. HTML is supported."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">HTML is supported. Recipients are automatically greeted by name.</p>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {sending ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              "✉️ Send Email Campaign"
            )}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className={`mt-5 p-4 rounded-xl border text-sm ${
            result.sent > 0
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}>
            <p className="font-semibold">{result.message}</p>
            {result.sent !== undefined && (
              <div className="mt-2 flex gap-4 text-xs">
                <span>✓ Sent: {result.sent}</span>
                <span>✗ Failed: {result.failed}</span>
                <span>Total: {result.totalTargeted}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
