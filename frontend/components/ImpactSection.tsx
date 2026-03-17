"use client";

import React, { useEffect, useRef, useState } from "react";

/* ─── Impact data ───────────────── */

const impactStats = [
  {
    value: "1200+",
    label: "Trees Planted",
    description:
      "Native saplings planted across Jharkhand through our seasonal drives",
    color: "#618264",
    bgColor: "#EAF4EA",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path
          d="M24 44V24M24 24C18 16 10 14 6 18M24 24C30 14 40 12 44 18"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="24" cy="16" rx="16" ry="14" fill="currentColor" opacity="0.15" />
      </svg>
    ),
  },
  {
    value: "300+",
    label: "Active Volunteers",
    description:
      "Passionate youth changemakers driving our campaigns on the ground",
    color: "#79AC78",
    bgColor: "#F5FBF5",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <circle cx="24" cy="12" r="7" fill="currentColor" />
        <path
          d="M6 38C6 30 10.5 24 16 24H32C37.5 24 42 30 42 38"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Schools Reached",
    description:
      "Educational institutions engaged in our awareness programmes",
    color: "#BACD92",
    bgColor: "#F7FBEF",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path d="M4 18L24 8L44 18" stroke="currentColor" strokeWidth="3" />
        <rect x="8" y="18" width="32" height="24" stroke="currentColor" />
      </svg>
    ),
  },
  {
    value: "20+",
    label: "Campaigns Conducted",
    description:
      "Impactful community campaigns in environmental and social causes",
    color: "#618264",
    bgColor: "#EAF4EA",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7">
        <path
          d="M10 14L38 8V34L10 30V14Z"
          stroke="currentColor"
          strokeWidth="2.5"
        />
      </svg>
    ),
  },
];

/* ─── StatCard ───────────────── */

function StatCard({ stat, index, visible }: any) {
  return (
    <div
      className={`group p-7 rounded-2xl border backdrop-blur-sm
      transition-all duration-700 ease-out
      hover:-translate-y-2 hover:shadow-2xl`}
      style={{
        backgroundColor: stat.bgColor,
        borderColor: `${stat.color}25`,
        transform: visible ? "translateY(0px)" : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 120}ms`,
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5
        transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
        style={{
          backgroundColor: `${stat.color}18`,
          color: stat.color,
        }}
      >
        {stat.icon}
      </div>

      {/* Number */}
      <h3
        className="text-4xl lg:text-5xl font-bold tracking-tight mb-1"
        style={{ color: stat.color }}
      >
        {stat.value}
      </h3>

      {/* Label */}
      <p className="text-lg font-semibold text-[#1e2d1f]">{stat.label}</p>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-2 leading-relaxed">
        {stat.description}
      </p>

      {/* bottom accent */}
      <div
        className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: stat.color }}
      />
    </div>
  );
}

/* ─── Impact Section ───────────────── */

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-4 lg:py-28"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between mb-16 gap-6">

          <div className="space-y-4">
            <p className="text-xs tracking-[0.3em] uppercase font-bold text-[#618264]">
              By the Numbers
            </p>

            <h2 className="text-4xl sm:text-5xl font-bold text-[#1e2d1f]">
              Our <span className="italic text-[#618264]">Impact</span>
            </h2>

            <p className="max-w-lg text-gray-600">
              Measured in trees, lives touched, and communities empowered —
              our impact grows with every campaign.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#EAF4EA" }}
            >
              <svg
                className="w-6 h-6 text-[#618264]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#618264]">
                Since 2026
              </p>
              <p className="text-xs text-gray-500">and working for you</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}