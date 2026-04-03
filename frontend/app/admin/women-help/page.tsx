"use client";

import { useEffect, useState } from "react";

type HelpRequest = {
  _id: string;
  name: string;
  contact: string;
  issue: string;
  location?: string;
  issueType: string;
  status: "new" | "reviewed" | "resolved" | "referred";
  adminNotes?: string;
  isAnonymous: boolean;
  createdAt: string;
};

const statusColors: Record<string, string> = {
  new: "bg-red-100 text-red-700",
  reviewed: "bg-yellow-100 text-yellow-700",
  resolved: "bg-green-100 text-green-700",
  referred: "bg-blue-100 text-blue-700",
};

export default function WomenHelpAdmin() {
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => { fetchRequests(); }, [filterStatus]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const params = filterStatus ? `?status=${filterStatus}` : "";
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/women-help${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRequests(data.requests || []);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string) => {
    setUpdating(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/women-help/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus, adminNotes: notes }),
      });
      if (res.ok) {
        setSelectedId(null);
        fetchRequests();
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Women Help Requests</h1>
          <p className="text-sm text-gray-500 mt-0.5">All submissions are private and admin-only</p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="resolved">Resolved</option>
          <option value="referred">Referred</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20"><div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto" /></div>
      ) : requests.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl">
          <div className="text-4xl mb-3">💜</div>
          <p>No help requests found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <div key={r._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-gray-900">
                      {r.isAnonymous ? "Anonymous" : r.name}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[r.status]}`}>
                      {r.status.toUpperCase()}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {r.issueType}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mt-2">{r.issue}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                    {!r.isAnonymous && <span>📞 {r.contact}</span>}
                    {r.location && <span>📍 {r.location}</span>}
                    <span>🕐 {new Date(r.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  {r.adminNotes && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800">
                      <strong>Admin Notes:</strong> {r.adminNotes}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => { setSelectedId(r._id); setNewStatus(r.status); setNotes(r.adminNotes || ""); }}
                  className="text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium shrink-0 border border-green-200"
                >
                  Update
                </button>
              </div>

              {/* Inline update form */}
              {selectedId === r._id && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="resolved">Resolved</option>
                    <option value="referred">Referred to authority</option>
                  </select>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder="Internal notes (optional)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(r._id)}
                      disabled={updating}
                      className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 disabled:opacity-60"
                    >
                      {updating ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
