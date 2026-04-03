"use client";

import { useEffect, useState } from "react";

const CATEGORIES = ["Energy", "Water", "Waste", "Agriculture", "Transport", "Biodiversity", "Lifestyle", "Community"];

export default function SustainabilityAdmin() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", category: "Energy", difficulty: "Easy", icon: "🌱",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => { fetchIdeas(); }, []);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sustainability/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setIdeas(data.ideas || []);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sustainability`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ title: "", description: "", category: "Energy", difficulty: "Easy", icon: "🌱" });
      fetchIdeas();
    } finally {
      setSubmitting(false);
    }
  };

  const deleteIdea = async (id: string) => {
    if (!confirm("Delete this idea?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sustainability/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setIdeas((prev) => prev.filter((i) => i._id !== id));
  };

  const difficultyColors: Record<string, string> = {
    Easy: "bg-green-100 text-green-700",
    Moderate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sustainability Ideas</h1>
          <p className="text-sm text-gray-500 mt-0.5">{ideas.length} ideas published</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-all text-sm"
        >
          {showForm ? "✕ Cancel" : "+ Add Idea"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Install Rooftop Solar Panels" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Detailed description of the idea" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Easy</option>
                <option>Moderate</option>
                <option>Advanced</option>
              </select>
            </div>
            <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Icon emoji, e.g. 🌿" />
            <button type="submit" disabled={submitting}
              className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60 transition">
              {submitting ? "Saving..." : "Publish Idea"}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20"><div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto" /></div>
      ) : ideas.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl">
          <div className="text-4xl mb-3">♻️</div>
          <p>No ideas yet. Add your first sustainability idea above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <div key={idea._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-2xl">{idea.icon || "🌿"}</span>
                <button onClick={() => deleteIdea(idea._id)}
                  className="text-red-400 hover:text-red-600 text-xs font-medium px-2 py-1 rounded-lg hover:bg-red-50 transition">
                  Delete
                </button>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{idea.title}</h3>
              <p className="text-gray-500 text-xs line-clamp-2 mb-3">{idea.description}</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">{idea.category}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${difficultyColors[idea.difficulty] || ""}`}>{idea.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
