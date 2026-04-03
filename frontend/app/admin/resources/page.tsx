"use client";

import { useEffect, useState } from "react";

const CATEGORIES = ["students", "women", "youth", "farmers", "general"];

export default function ResourcesAdmin() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "", url: "", description: "", category: "students", subcategory: "",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => { fetchResources(); }, []);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setResources(data.resources || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ title: "", url: "", description: "", category: "students", subcategory: "" });
      fetchResources();
    } finally {
      setSubmitting(false);
    }
  };

  const deleteResource = async (id: string) => {
    if (!confirm("Delete this resource?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setResources((prev) => prev.filter((r) => r._id !== id));
  };

  const catColors: Record<string, string> = {
    students: "bg-blue-100 text-blue-700",
    women: "bg-pink-100 text-pink-700",
    youth: "bg-purple-100 text-purple-700",
    farmers: "bg-green-100 text-green-700",
    general: "bg-gray-100 text-gray-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Links</h1>
          <p className="text-sm text-gray-500 mt-0.5">Government schemes, scholarships & helpful links</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-all text-sm"
        >
          {showForm ? "✕ Cancel" : "+ Add Resource"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. PM Scholarship Scheme" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
              <input required type="url" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Brief description (optional)" />
            </div>
            <button type="submit" disabled={submitting}
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60">
              {submitting ? "Saving..." : "Add Resource"}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20"><div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto" /></div>
      ) : resources.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl">
          <div className="text-4xl mb-3">🔗</div>
          <p>No resources yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {resources.map((r) => (
            <div key={r._id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 text-sm">{r.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${catColors[r.category] || catColors.general}`}>
                    {r.category}
                  </span>
                </div>
                {r.description && <p className="text-gray-500 text-xs mt-1">{r.description}</p>}
                <a href={r.url} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs mt-1 inline-block truncate max-w-md">{r.url}</a>
              </div>
              <button onClick={() => deleteResource(r._id)}
                className="text-red-400 hover:text-red-600 text-xs font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition shrink-0">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
