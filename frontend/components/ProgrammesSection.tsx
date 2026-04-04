"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Campaign = {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  participants: number;
  isPublished: boolean;
};

// Visual config per category — design stays in code, data comes from API
const categoryConfig: Record<string, { icon: React.ReactNode; accentColor: string; bgLight: string; tag: string; tagline: string; href: string }> = {
  "Environment": {
    tagline: "Restoring Ecological Balance",
    tag: "Environment", href: "/campaigns",
    accentColor: "#618264", bgLight: "#D0E7D2",
    icon: <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12"><circle cx="32" cy="28" r="20" fill="#D0E7D2" /><path d="M32 56V28" stroke="#618264" strokeWidth="3" strokeLinecap="round" /><ellipse cx="32" cy="22" rx="18" ry="16" fill="#79AC78" opacity="0.7" /></svg>,
  },
  "Women Empowerment": {
    tagline: "Empowering Through Education",
    tag: "Social", href: "/campaigns",
    accentColor: "#C5192D", bgLight: "#F5DAD2",
    icon: <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12"><circle cx="32" cy="32" r="26" fill="#F5DAD2" opacity="0.6" /><circle cx="32" cy="20" r="8" fill="#C5192D" opacity="0.6" /><path d="M16 54c0-10 7-16 16-16s16 6 16 16" fill="#C5192D" opacity="0.3" /></svg>,
  },
  "Education": {
    tagline: "Learning for Every Child",
    tag: "Education", href: "/campaigns",
    accentColor: "#FB8C00", bgLight: "#FFF3E0",
    icon: <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12"><circle cx="32" cy="32" r="22" fill="#FFF3E0" /><rect x="20" y="26" width="24" height="12" rx="2" fill="#FB8C00" /></svg>,
  },
  "Health": {
    tagline: "Healthy Communities, Strong Nation",
    tag: "Health", href: "/campaigns",
    accentColor: "#E53935", bgLight: "#FDEDED",
    icon: <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12"><circle cx="32" cy="32" r="22" fill="#FDEDED" /><path d="M32 18v28M18 32h28" stroke="#E53935" strokeWidth="3" strokeLinecap="round" /></svg>,
  },
  "Community": {
    tagline: "Building Stronger Communities",
    tag: "Community", href: "/campaigns",
    accentColor: "#1976D2", bgLight: "#E3F2FD",
    icon: <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12"><circle cx="32" cy="32" r="22" fill="#E3F2FD" /><path d="M20 40c0-7 6-12 12-12s12 5 12 12" stroke="#1976D2" strokeWidth="2.5" /></svg>,
  },
  "Sports": {
    tagline: "Building Strong Youth",
    tag: "Sports", href: "/campaigns",
    accentColor: "#1976D2", bgLight: "#E3F2FD",
    icon: <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12"><circle cx="32" cy="32" r="22" fill="#E3F2FD" /><circle cx="32" cy="32" r="10" stroke="#1976D2" strokeWidth="3" /></svg>,
  },
  "Agriculture": {
    tagline: "Empowering Farmers",
    tag: "Agriculture", href: "/campaigns",
    accentColor: "#4CAF50", bgLight: "#E8F5E9",
    icon: <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12"><circle cx="32" cy="32" r="22" fill="#E8F5E9" /><path d="M32 48V20" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" /></svg>,
  },
};

function ProgrammeCard({ category, campaigns }: { category: string; campaigns: Campaign[] }) {
  const config = categoryConfig[category] || {
    tagline: "Making an Impact", tag: category, href: "/campaigns",
    accentColor: "#618264", bgLight: "#EAF4EA",
    icon: <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12"><circle cx="32" cy="32" r="22" fill="#EAF4EA" /></svg>,
  };

  // Use the first campaign's description, or a generic one
  const description = campaigns[0]?.description || `Our ${category} programmes make real impact in communities.`;
  const count = campaigns.length;

  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
      style={{ backgroundColor: "#FFFFFF", borderColor: `${config.accentColor}18` }}
    >
      <div className="p-6 flex items-start gap-4" style={{ backgroundColor: config.bgLight }}>
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white">
          {config.icon}
        </div>
        <div>
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mb-2"
            style={{ backgroundColor: `${config.accentColor}18`, color: config.accentColor }}
          >
            {config.tag}
          </span>
          <h3 className="font-bold text-xl text-[#1e2d1f]">{category}</h3>
          <p className="text-xs mt-1" style={{ color: config.accentColor }}>{config.tagline}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="flex items-center gap-2">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: `${config.accentColor}12`, color: config.accentColor }}
          >
            {count} campaign{count !== 1 ? "s" : ""}
          </span>
        </div>
        <Link
          href={config.href}
          className="inline-flex items-center gap-2 text-sm font-semibold mt-auto"
          style={{ color: config.accentColor }}
        >
          Learn More →
        </Link>
      </div>
    </article>
  );
}

export default function ProgrammesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/campaigns`)
      .then((r) => r.json())
      .then((data) => setCampaigns(data.campaigns || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Group campaigns by category
  const grouped = campaigns.reduce<Record<string, Campaign[]>>((acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {});

  const categories = Object.keys(grouped);

  return (
    <section ref={sectionRef} className="py-10 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase text-[#618264]">What We Do</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1e2d1f]">
            Our <span className="italic text-[#618264]">Programmes</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 mt-3">
            Key focus areas where Avartya drives impact across environment, society, health, and community development.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-72" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-2xl mb-2">📢</p>
            <p>Campaign programmes will appear here once added via the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <ProgrammeCard key={cat} category={cat} campaigns={grouped[cat]} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}