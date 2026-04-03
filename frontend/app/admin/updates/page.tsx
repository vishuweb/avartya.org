"use client";

import { useEffect, useState } from "react";

type Update = {
  _id: string;
  title: string;
  description: string;
  type: "news" | "jobs" | "events";
  source?: string;
  location?: string;
  date: string;
  link?: string;
  isPublished: boolean;
};

const typeColors: Record<string, string> = {
  news: "bg-blue-100 text-blue-700",
  jobs: "bg-purple-100 text-purple-700",
  events: "bg-orange-100 text-orange-700",
};

export default function UpdatesAdmin() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", type: "news", source: "",
    location: "", date: "", link: "", isPublished: true,
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => { fetchUpdates(); }, []);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updates/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUpdates(data.updates || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowForm(false);
        setForm({ title: "", description: "", type: "news", source: "", location: "", date: "", link: "", isPublished: true });
        fetchUpdates();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const deleteUpdate = async (id: string) => {
    if (!confirm("Delete this update?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updates/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setUpdates((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">News & Updates</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage news, jobs, and events</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2 text-sm"
        >
          {showForm ? "✕ Cancel" : "+ Add Update"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">New Update</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="Update title"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                placeholder="Brief description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
              >
                <option value="news">📰 News</option>
                <option value="jobs">💼 Jobs</option>
                <option value="events">🎉 Events</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
            <input
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Source (optional)"
            />
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Location (optional)"
            />
            <div className="md:col-span-2">
              <input
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="External link (optional)"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60 transition-all text-sm"
              >
                {submitting ? "Publishing..." : "Publish Update"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-20"><div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto" /></div>
      ) : updates.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl">
          <div className="text-4xl mb-3">📰</div>
          <p>No updates yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {updates.map((u) => (
            <div key={u._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 mt-0.5 ${typeColors[u.type]}`}>
                {u.type.toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm">{u.title}</h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{u.description}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                  {u.location && <span>📍 {u.location}</span>}
                  {u.source && <span>🔖 {u.source}</span>}
                  <span>📅 {new Date(u.date).toLocaleDateString("en-IN")}</span>
                  <span className={u.isPublished ? "text-green-600" : "text-red-400"}>
                    {u.isPublished ? "✓ Published" : "✗ Hidden"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => deleteUpdate(u._id)}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
