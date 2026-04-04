"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type TeamMember = {
  _id: string;
  name: string;
  designation: string;
  role?: string;
  image?: string;
  bio?: string;
  linkedin?: string;
  category: "founder" | "core" | "volunteer" | "advisor";
  priority: number;
  isActive: boolean;
};

const categoryColors: Record<string, string> = {
  founder:   "bg-yellow-100 text-yellow-800",
  core:      "bg-blue-100 text-blue-700",
  volunteer: "bg-green-100 text-green-800",
  advisor:   "bg-purple-100 text-purple-700",
};

const defaultForm = {
  name: "", designation: "", role: "", bio: "", linkedin: "",
  imageUrl: "", category: "core", priority: "0", isActive: true,
};

export default function AdminTeam() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [error, setError] = useState("");

  const token = () => (typeof window !== "undefined" ? localStorage.getItem("token") : "");

  useEffect(() => {
    if (!token()) { router.push("/adminlogin"); return; }
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/admin`, {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const data = await res.json();
      setMembers(data.members || []);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingMember(null);
    setForm(defaultForm);
    setError("");
    setShowForm(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditingMember(m);
    setForm({
      name: m.name,
      designation: m.designation,
      role: m.role || "",
      bio: m.bio || "",
      linkedin: m.linkedin || "",
      imageUrl: m.image || "",
      category: m.category,
      priority: String(m.priority),
      isActive: m.isActive,
    });
    setError("");
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.designation) { setError("Name and designation are required."); return; }
    setSubmitting(true);
    try {
      const body = {
        name: form.name.trim(),
        designation: form.designation.trim(),
        role: form.role.trim() || undefined,
        bio: form.bio.trim() || undefined,
        linkedin: form.linkedin.trim() || undefined,
        imageUrl: form.imageUrl.trim() || undefined,
        category: form.category,
        priority: Number(form.priority),
        isActive: form.isActive,
      };

      const url = editingMember
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/team/${editingMember._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/team`;
      const method = editingMember ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowForm(false);
        fetchMembers();
      } else {
        const d = await res.json();
        setError(d.message || "Failed to save member");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    setDeleting(id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } finally {
      setDeleting(null);
    }
  };

  const toggleActive = async (m: TeamMember) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/${m._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ isActive: !m.isActive }),
      });
      setMembers((prev) => prev.map((mem) => mem._id === m._id ? { ...mem, isActive: !mem.isActive } : mem));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
          <p className="text-sm text-gray-500 mt-0.5">{members.length} members — {members.filter((m) => m.isActive).length} active</p>
        </div>
        <button
          onClick={showForm ? () => setShowForm(false) : openCreate}
          className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2 text-sm"
        >
          {showForm ? "✕ Cancel" : "+ Add Member"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editingMember ? `Edit: ${editingMember.name}` : "Add New Team Member"}
          </h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
              <input
                required
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                placeholder="e.g. Co-Founder & CEO"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Area</label>
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Environment & Sustainability"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="founder">Founder</option>
                <option value="core">Core Team</option>
                <option value="volunteer">Lead Volunteer</option>
                <option value="advisor">Advisor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Display Priority (0 = first)</label>
              <input
                type="number"
                min={0}
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL (Cloudinary or external)</label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://res.cloudinary.com/... or https://..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Short bio (2-3 sentences)..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
            <div className="md:col-span-2 flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 accent-green-600"
                />
                Visible on website (isActive)
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60 transition-all text-sm"
              >
                {submitting ? "Saving..." : editingMember ? "💾 Update Member" : "✅ Add Member"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Members List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl">
          <div className="text-4xl mb-3">👤</div>
          <p className="font-medium">No team members yet</p>
          <p className="text-sm mt-1">Add your first member above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <div
              key={m._id}
              className={`bg-white rounded-2xl p-5 shadow-sm border transition-all ${m.isActive ? "border-gray-100" : "border-gray-200 opacity-60"}`}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative w-14 h-14 shrink-0">
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="rounded-xl object-cover"
                      unoptimized={m.image.startsWith("http")}
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-lg">
                      {m.name[0]}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-sm">{m.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${categoryColors[m.category]}`}>
                      {m.category}
                    </span>
                    {!m.isActive && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-500">hidden</span>
                    )}
                  </div>
                  <p className="text-emerald-600 text-xs font-semibold mt-0.5">{m.designation}</p>
                  {m.role && <p className="text-gray-400 text-xs">{m.role}</p>}
                  {m.bio && <p className="text-gray-500 text-xs mt-1 line-clamp-2">{m.bio}</p>}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(m)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    {m.isActive ? "Hide" : "Show"}
                  </button>
                  <button
                    onClick={() => openEdit(m)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMember(m._id)}
                    disabled={deleting === m._id}
                    className="text-xs px-3 py-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 border border-red-100 transition-colors disabled:opacity-50"
                  >
                    {deleting === m._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
