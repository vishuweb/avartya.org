"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Donation = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  amount: number;
  purpose: string;
  message?: string;
  isAnonymous: boolean;
  status: "interest" | "pending" | "paid" | "failed" | "refunded";
  createdAt: string;
  razorpayPaymentId?: string;
};

type Stats = {
  totalRaised: number;
  donorCount: number;
  purposeBreakdown: { _id: string; total: number; count: number }[];
};

const statusColors: Record<string, string> = {
  interest:  "bg-blue-100 text-blue-700",
  pending:   "bg-yellow-100 text-yellow-800",
  paid:      "bg-green-100 text-green-800",
  failed:    "bg-red-100 text-red-700",
  refunded:  "bg-gray-100 text-gray-600",
};

const purposeLabels: Record<string, string> = {
  general:   "General Fund",
  trees:     "Tree Plantation",
  education: "Education",
  women:     "Women Empowerment",
  health:    "Health Awareness",
};

export default function AdminDonations() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("");
  const [total, setTotal] = useState(0);

  const token = () => (typeof window !== "undefined" ? localStorage.getItem("token") : "");

  useEffect(() => {
    if (!token()) { router.push("/adminlogin"); return; }
    fetchAll();
  }, [filterStatus]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token()}` };
      const params = new URLSearchParams();
      if (filterStatus) params.set("status", filterStatus);

      const [donRes, statsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations?${params}`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations/stats`),
      ]);

      const donData = await donRes.json();
      const statsData = await statsRes.json();

      setDonations(donData.donations || []);
      setTotal(donData.total || 0);
      setStats(statsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ status }),
      });
      setDonations((prev) => prev.map((d) => d._id === id ? { ...d, status: status as Donation["status"] } : d));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteDonation = async (id: string) => {
    if (!confirm("Delete this donation record?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` },
    });
    setDonations((prev) => prev.filter((d) => d._id !== id));
    setTotal((t) => t - 1);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Donations</h1>
        <p className="text-sm text-gray-500 mt-0.5">Transparency view — all donations and intent registrations</p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-green-700">
              ₹{stats.totalRaised.toLocaleString("en-IN")}
            </div>
            <div className="text-sm text-gray-500 mt-1">Total Raised / Committed</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl font-bold text-blue-700">{stats.donorCount}</div>
            <div className="text-sm text-gray-500 mt-1">Total Supporters</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">By Purpose</p>
            <div className="space-y-1.5">
              {stats.purposeBreakdown.map((p) => (
                <div key={p._id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{purposeLabels[p._id] || p._id}</span>
                  <span className="font-semibold text-gray-900">₹{p.total.toLocaleString("en-IN")}</span>
                </div>
              ))}
              {stats.purposeBreakdown.length === 0 && (
                <p className="text-xs text-gray-400">No data yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["", "interest", "paid", "pending", "failed", "refunded"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${filterStatus === s ? "bg-green-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-green-300"}`}
          >
            {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400 self-center">{total} records</span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
        </div>
      ) : donations.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-2xl">
          <div className="text-4xl mb-3">💛</div>
          <p className="font-medium">No donations yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Donor</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Purpose</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Date</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.map((d) => (
                  <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{d.isAnonymous ? "Anonymous" : d.name}</p>
                      {d.phone && <p className="text-xs text-gray-400">{d.phone}</p>}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{d.email}</td>
                    <td className="px-4 py-3 text-right font-bold text-gray-900">
                      ₹{d.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell">
                      {purposeLabels[d.purpose] || d.purpose}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={d.status}
                        onChange={(e) => updateStatus(d._id, e.target.value)}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-green-500 ${statusColors[d.status]}`}
                      >
                        <option value="interest">Interest</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">
                      {new Date(d.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteDonation(d._id)}
                        className="text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
