"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ImpactEntry = {
  _id: string;
  type: "tree" | "plastic" | "people" | "school" | "event";
  count: number;
  unit?: string;
  location?: string;
  proofImage?: string;
  date: string;
  addedBy?: string;
  notes?: string;
  isVerified: boolean;
};

const typeConfig: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  tree:    { label: "Trees",   icon: "🌳", color: "text-green-700",  bg: "bg-green-100" },
  plastic: { label: "Plastic", icon: "♻️", color: "text-teal-700",   bg: "bg-teal-100" },
  people:  { label: "People",  icon: "👥", color: "text-blue-700",   bg: "bg-blue-100" },
  school:  { label: "Schools", icon: "🏫", color: "text-purple-700", bg: "bg-purple-100" },
  event:   { label: "Events",  icon: "📅", color: "text-orange-700", bg: "bg-orange-100" },
};

const defaultForm = {
  type: "tree",
  count: "",
  unit: "",
  location: "",
  date: new Date().toISOString().split("T")[0],
  addedBy: "",
  notes: "",
  proofImageUrl: "",
};

export default function AdminImpact() {
  const router = useRouter();
  const [entries, setEntries] = useState<ImpactEntry[]>([]);
  const [totals, setTotals] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [filterType, setFilterType] = useState("");
  const [error, setError] = useState("");

  const token = () => (typeof window !== "undefined" ? localStorage.getItem("token") : "");

  useEffect(() => {
    const t = token();
    if (!t) { router.push("/adminlogin"); return; }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [entriesRes, totalsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/impact/admin`, {
          headers: { Authorization: `Bearer ${token()}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/impact/totals`),
      ]);
      const entryData = await entriesRes.json();
      const totalData = await totalsRes.json();
      setEntries(entryData.entries || []);
      setTotals(totalData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.type || !form.count) { setError("Type and count are required."); return; }
    setSubmitting(true);
    try {
      const body = {
        type: form.type,
        count: Number(form.count),
        unit: form.unit,
        location: form.location,
        date: form.date,
        addedBy: form.addedBy || "Admin",
        notes: form.notes,
        proofImage: form.proofImageUrl || undefined,
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/impact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setForm(defaultForm);
        setShowForm(false);
        fetchAll();
      } else {
        const d = await res.json();
        setError(d.message || "Failed to create entry");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const deleteEntry = async (id: string) => {
    if (!confirm("Delete this impact entry?")) return;
    setDeleting(id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/impact/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const filtered = filterType ? entries.filter((e) => e.type === filterType) : entries;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Impact Tracker</h1>
          <p className="text-sm text-gray-500 mt-0.5">Log and manage all on-ground impact entries</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(""); }}
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2 text-sm"
        >
          {showForm ? "✕ Cancel" : "+ Log Impact"}
        </button>
      </div>

      {/* Totals Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {Object.entries(typeConfig).map(([key, cfg]) => (
          <div key={key} className={`${cfg.bg} rounded-2xl p-4 text-center`}>
            <div className="text-2xl mb-1">{cfg.icon}</div>
            <div className={`text-xl font-bold ${cfg.color}`}>
              {((totals as any)[key === "tree" ? "treesPlanted" : key === "plastic" ? "plasticKg" : key === "people" ? "peopleReached" : key === "school" ? "schoolsReached" : "eventsHeld"] ?? 0).toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-gray-500 font-medium">{cfg.label}</div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Log New Impact Entry</h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Impact Type *</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="tree">🌳 Trees Planted</option>
                <option value="plastic">♻️ Plastic Collected (kg)</option>
                <option value="people">👥 People Reached</option>
                <option value="school">🏫 Schools Reached</option>
                <option value="event">📅 Events Held</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Count *</label>
              <input
                type="number"
                min={1}
                required
                value={form.count}
                onChange={(e) => setForm({ ...form, count: e.target.value })}
                placeholder="e.g. 50"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <input
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                placeholder="saplings / kg / students..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Village / District"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Added By</label>
              <input
                value={form.addedBy}
                onChange={(e) => setForm({ ...form, addedBy: e.target.value })}
                placeholder="Team member name"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Proof Image URL</label>
              <input
                type="url"
                value={form.proofImageUrl}
                onChange={(e) => setForm({ ...form, proofImageUrl: e.target.value })}
                placeholder="https://cloudinary.com/... (optional)"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Any extra context..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60 transition-all text-sm"
              >
                {submitting ? "Logging..." : "✅ Log Entry"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[{ value: "", label: "All Types" }, ...Object.entries(typeConfig).map(([k, v]) => ({ value: k, label: `${v.icon} ${v.label}` }))].map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilterType(opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filterType === opt.value ? "bg-green-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Entries List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl">
          <div className="text-4xl mb-3">🌿</div>
          <p className="font-medium">No impact entries yet</p>
          <p className="text-sm mt-1">Start logging your on-ground work</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((entry) => {
            const cfg = typeConfig[entry.type];
            return (
              <div key={entry._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${cfg.bg}`}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                    <span className="text-base font-bold text-gray-900">
                      {entry.count.toLocaleString("en-IN")}{entry.unit ? ` ${entry.unit}` : ""}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                    {entry.location && <span>📍 {entry.location}</span>}
                    <span>📅 {new Date(entry.date).toLocaleDateString("en-IN")}</span>
                    {entry.addedBy && <span>👤 {entry.addedBy}</span>}
                    {entry.notes && <span className="text-gray-500">💬 {entry.notes}</span>}
                  </div>
                  {entry.proofImage && (
                    <a
                      href={entry.proofImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-1"
                    >
                      🖼️ View Proof
                    </a>
                  )}
                </div>
                <button
                  onClick={() => deleteEntry(entry._id)}
                  disabled={deleting === entry._id}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-xs font-medium shrink-0 disabled:opacity-50"
                >
                  {deleting === entry._id ? "..." : "Delete"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
