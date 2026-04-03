"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMotivation, setFilterMotivation] = useState("");
  const [total, setTotal] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/adminlogin");
      return;
    }
    fetchVolunteers();
  }, [search, filterCity, filterStatus, filterMotivation]);

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filterCity) params.set("city", filterCity);
      if (filterStatus) params.set("status", filterStatus);
      if (filterMotivation) params.set("motivation", filterMotivation);

      // FIXED: use env var, response is { volunteers: [], total: N }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/volunteers?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 401) {
        router.push("/adminlogin");
        return;
      }

      const data = await res.json();
      // FIXED: data.volunteers is the array (not just data)
      setVolunteers(Array.isArray(data.volunteers) ? data.volunteers : []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Fetch error:", error);
      setVolunteers([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/volunteers/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      if (res.ok) {
        setVolunteers((prev) =>
          prev.map((v) => (v._id === id ? { ...v, status } : v))
        );
      }
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-600",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteers</h1>
          <p className="text-sm text-gray-500 mt-0.5">{total} total registered</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            placeholder="🔍 Search name, email, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            placeholder="🏙️ Filter by city"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={filterMotivation}
            onChange={(e) => setFilterMotivation(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
            <option value="">All Interests</option>
            <option value="Environment Protection">Environment</option>
            <option value="Women Safety">Women Safety</option>
            <option value="Social Service">Social Service</option>
            <option value="Community Development">Community</option>
            <option value="Health Awareness">Health</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
          </div>
        ) : volunteers.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-4xl mb-3">🌱</div>
            <p className="font-medium">No volunteers found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">City</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Interest</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Education</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">Joined</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {volunteers.map((v: any) => (
                  <tr key={v._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{v.name}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{v.email}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{v.city || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell text-xs">{v.motivation || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{v.education || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[v.status] || statusColors.pending}`}>
                        {v.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">
                      {v.createdAt ? new Date(v.createdAt).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={v.status || "pending"}
                        onChange={(e) => updateStatus(v._id, e.target.value)}
                        disabled={updatingId === v._id}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}