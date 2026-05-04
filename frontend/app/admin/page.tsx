"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserGroupIcon,
  Plant01Icon,
  FavoriteIcon,
  Task01Icon,
  Recycle01Icon,
  Megaphone01Icon,
  ChartLineUp01Icon,
  Leaf01Icon,
  UserAdd01Icon,
  Tree02Icon
} from "hugeicons-react";

type DashboardStats = {
  volunteers: { total: number; pending: number; active: number };
  impact: { treesPlanted: number; plasticKg: number; peopleReached: number; totalEntries: number };
  donations: { totalRaised: number; donorCount: number };
  updates: { total: number };
};

const StatCard = ({
  title,
  value,
  sub,
  icon,
  color,
  href,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}) => (
  <Link href={href}>
    <div className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-green-700 ${color}`}>
          {icon}
        </div>
        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  </Link>
);

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/adminlogin"); return; }
    fetchStats(token);
  }, [router]);

  const fetchStats = async (token: string) => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const base = process.env.NEXT_PUBLIC_API_URL;

      const [volunteerRes, impactRes, donationRes, updatesRes] = await Promise.allSettled([
        fetch(`${base}/api/volunteers?limit=1`, { headers }).then((r) => r.json()),
        fetch(`${base}/api/impact/totals`).then((r) => r.json()),
        fetch(`${base}/api/donations/stats`).then((r) => r.json()),
        fetch(`${base}/api/updates/admin`, { headers }).then((r) => r.json()),
      ]);

      const v = volunteerRes.status === "fulfilled" ? volunteerRes.value : {};
      const imp = impactRes.status === "fulfilled" ? impactRes.value : {};
      const don = donationRes.status === "fulfilled" ? donationRes.value : {};
      const upd = updatesRes.status === "fulfilled" ? updatesRes.value : {};

      setStats({
        volunteers: {
          total: v.total ?? 0,
          pending: 0,
          active: 0,
        },
        impact: {
          treesPlanted: imp.treesPlanted ?? 0,
          plasticKg: imp.plasticKg ?? 0,
          peopleReached: imp.peopleReached ?? 0,
          totalEntries: imp.totalEntries ?? 0,
        },
        donations: {
          totalRaised: don.totalRaised ?? 0,
          donorCount: don.donorCount ?? 0,
        },
        updates: { total: upd.total ?? 0 },
      });
    } catch (err) {
      console.error("[Dashboard stats error]", err);
    } finally {
      setLoading(false);
    }
  };

  const adminName = typeof window !== "undefined" ? localStorage.getItem("adminName") || "Admin" : "Admin";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {adminName} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Here's what's happening with AVARTYA today.
          </p>
        </div>
        <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse h-36">
              <div className="w-12 h-12 bg-gray-200 rounded-xl mb-4" />
              <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-7 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Primary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard
              title="Total Volunteers"
              value={stats?.volunteers.total ?? 0}
              sub="All registered"
              icon={<UserGroupIcon size={24} />}
              color="bg-green-50"
              href="/admin/volunteers"
            />
            <StatCard
              title="Trees Planted"
              value={(stats?.impact.treesPlanted ?? 0).toLocaleString("en-IN")}
              sub={`${stats?.impact.totalEntries ?? 0} impact entries`}
              icon={<Plant01Icon size={24} />}
              color="bg-emerald-50"
              href="/admin/impact"
            />
            <StatCard
              title="Donations Raised"
              value={`₹${(stats?.donations.totalRaised ?? 0).toLocaleString("en-IN")}`}
              sub={`${stats?.donations.donorCount ?? 0} supporters`}
              icon={<FavoriteIcon size={24} className="text-yellow-600" />}
              color="bg-yellow-50"
              href="/admin/donations"
            />
            <StatCard
              title="News & Updates"
              value={stats?.updates.total ?? 0}
              sub="Published updates"
              icon={<Task01Icon size={24} className="text-blue-600" />}
              color="bg-blue-50"
              href="/admin/updates"
            />
          </div>

          {/* Secondary Impact Row */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <StatCard
              title="Plastic Collected"
              value={`${(stats?.impact.plasticKg ?? 0).toLocaleString("en-IN")} kg`}
              icon={<Recycle01Icon size={24} className="text-teal-600" />}
              color="bg-teal-50"
              href="/admin/impact"
            />
            <StatCard
              title="People Reached"
              value={(stats?.impact.peopleReached ?? 0).toLocaleString("en-IN")}
              icon={<UserGroupIcon size={24} className="text-purple-600" />}
              color="bg-purple-50"
              href="/admin/impact"
            />
            <StatCard
              title="Donor Count"
              value={stats?.donations.donorCount ?? 0}
              sub="Total contributors"
              icon={<FavoriteIcon size={24} className="text-red-500" />}
              color="bg-red-50"
              href="/admin/donations"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: "Add Impact", href: "/admin/impact", icon: <Leaf01Icon size={24} className="text-green-600" /> },
                { label: "Add Team Member", href: "/admin/team", icon: <UserAdd01Icon size={24} className="text-green-600" /> },
                { label: "Post Update", href: "/admin/updates", icon: <Megaphone01Icon size={24} className="text-green-600" /> },
                { label: "View Volunteers", href: "/admin/volunteers", icon: <UserGroupIcon size={24} className="text-green-600" /> },
                { label: "View Donations", href: "/admin/donations", icon: <FavoriteIcon size={24} className="text-green-600" /> },
                { label: "Manage Campaigns", href: "/admin/campaigns", icon: <Megaphone01Icon size={24} className="text-green-600" /> },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all cursor-pointer text-center">
                    <div className="flex items-center justify-center p-2 rounded-full bg-green-50">
                      {action.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-600 leading-tight">{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}