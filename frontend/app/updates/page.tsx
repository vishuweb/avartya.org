"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Update = {
  _id: string;
  title: string;
  description: string;
  type: "news" | "jobs" | "events";
  source?: string;
  location?: string;
  date: string;
  link?: string;
};

const typeConfig: Record<string, { label: string; bg: string; text: string; icon: string }> = {
  news: { label: "News", bg: "bg-blue-100", text: "text-blue-700", icon: "📰" },
  jobs: { label: "Jobs", bg: "bg-purple-100", text: "text-purple-700", icon: "💼" },
  events: { label: "Events", bg: "bg-orange-100", text: "text-orange-700", icon: "🎉" },
};

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("all");

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      try {
        const params = activeType !== "all" ? `?type=${activeType}` : "";
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/updates${params}`);
        const data = await res.json();
        setUpdates(data.updates || []);
      } catch (err) {
        console.error("Failed to fetch updates:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUpdates();
  }, [activeType]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">

        {/* Hero */}
        <section className="bg-gradient-to-br from-green-800 to-emerald-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-green-300 text-sm font-bold tracking-widest uppercase mb-3">Stay Informed</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Latest Updates</h1>
            <p className="text-green-100 text-lg max-w-xl mx-auto">
              News, upcoming events, and opportunities from Avartya Foundation and our community.
            </p>
          </div>
        </section>

        {/* Filters */}
        <div className="sticky top-[60px] z-10 bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-none">
            {["all", "news", "events", "jobs"].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeType === type
                    ? "bg-green-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {type === "all" ? "🌐 All" : `${typeConfig[type]?.icon} ${typeConfig[type]?.label}`}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-10">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : updates.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📭</div>
              <h2 className="text-xl font-semibold text-gray-700">No updates yet</h2>
              <p className="text-gray-500 mt-2">Check back soon for the latest news and events.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {updates.map((u) => {
                const config = typeConfig[u.type] || typeConfig.news;
                return (
                  <article
                    key={u._id}
                    className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 ${config.bg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${config.bg} ${config.text}`}>
                            {config.label}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {new Date(u.date).toLocaleDateString("en-IN", {
                              year: "numeric", month: "short", day: "numeric",
                            })}
                          </span>
                          {u.location && (
                            <span className="text-gray-400 text-xs">📍 {u.location}</span>
                          )}
                        </div>
                        <h2 className="font-bold text-gray-900 text-base sm:text-lg leading-snug mb-2">
                          {u.title}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">{u.description}</p>
                        <div className="flex items-center gap-4 mt-3">
                          {u.source && (
                            <span className="text-xs text-gray-400">🔖 {u.source}</span>
                          )}
                          {u.link && (
                            <a
                              href={u.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-700 font-semibold text-sm hover:underline"
                            >
                              Learn more →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
