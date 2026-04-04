"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

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

const tabs = [
  { key: "all",    label: "All",    icon: "📋" },
  { key: "news",   label: "News",   icon: "📰" },
  { key: "jobs",   label: "Jobs",   icon: "💼" },
  { key: "events", label: "Events", icon: "🎉" },
];

const typeConfig: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  news:   { icon: "📰", color: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200" },
  jobs:   { icon: "💼", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  events: { icon: "🎉", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
};

function UpdateCard({ update }: { update: Update }) {
  const cfg = typeConfig[update.type];
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm border ${cfg.border} hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${cfg.bg}`}>
          {cfg.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
              {update.type.toUpperCase()}
            </span>
            {update.location && (
              <span className="text-xs text-gray-400">📍 {update.location}</span>
            )}
            <span className="text-xs text-gray-400">
              📅 {new Date(update.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1 leading-snug">{update.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{update.description}</p>
          <div className="flex items-center gap-4 mt-3">
            {update.source && (
              <span className="text-xs text-gray-400">🔖 Source: {update.source}</span>
            )}
            {update.link && (
              <a
                href={update.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-green-600 hover:underline"
              >
                Learn More →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchUpdates();
  }, [activeTab]);

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== "all") params.set("type", activeTab);
      params.set("limit", "50");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updates?${params}`);
      const data = await res.json();
      setUpdates(data.updates || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("[Updates fetch error]", err);
    } finally {
      setLoading(false);
    }
  };

  const grouped = {
    news: updates.filter((u) => u.type === "news"),
    jobs: updates.filter((u) => u.type === "jobs"),
    events: updates.filter((u) => u.type === "events"),
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-green-800 to-emerald-900 py-16 px-4 text-white text-center">
          <p className="text-green-300 text-sm font-bold tracking-widest uppercase mb-3">Local Intelligence</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            News, Jobs & Events
          </h1>
          <p className="text-green-100 max-w-xl mx-auto text-lg">
            Stay informed about what's happening in your district — opportunities, updates, and events curated for our community.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-10">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-white rounded-2xl p-2 shadow-sm border border-gray-100 w-fit mx-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                <span className="mr-1.5">{tab.icon}</span>
                {tab.label}
                {tab.key !== "all" && (
                  <span className="ml-1.5 text-xs opacity-75">
                    ({grouped[tab.key as keyof typeof grouped]?.length ?? 0})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-2xl p-6 shadow-sm animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : updates.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No updates yet</h3>
              <p className="text-gray-500 mb-6">Check back soon for local news, job postings, and events.</p>
              <Link
                href="/"
                className="text-green-600 font-semibold hover:underline"
              >
                ← Back to Home
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {updates.map((u) => (
                <UpdateCard key={u._id} update={u} />
              ))}
              <p className="text-center text-sm text-gray-400 pt-4">
                Showing {updates.length} of {total} updates
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
