"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

/* ─── Programme data ─────────────────────────────────── */
const programmes = [
  {
    id: "tree-plantation",
    title: "Tree Plantation",
    tagline: "Restoring Ecological Balance",
    description:
      "Large-scale plantation drives to restore ecological balance and promote environmental sustainability.",
    href: "/campaigns/tree-plantation",
    highlights: [
      "1200+ saplings planted",
      "Native species focus",
      "Community partnerships",
      "Post-plantation care",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="28" r="20" fill="#D0E7D2" />
        <path d="M32 56V28" stroke="#618264" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="32" cy="22" rx="18" ry="16" fill="#79AC78" opacity="0.7" />
      </svg>
    ),
    accentColor: "#618264",
    bgLight: "#D0E7D2",
    tag: "Environment",
  },
  {
    id: "sports-development",
    title: "Sports Development",
    tagline: "Building Strong Youth",
    description:
      "Encouraging youth participation in sports to promote health, teamwork, discipline and leadership.",
    href: "/campaigns/sports",
    highlights: [
      "Local tournaments",
      "Youth training camps",
      "Community sports events",
      "Fitness awareness",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="32" r="22" fill="#E3F2FD" />
        <circle cx="32" cy="32" r="10" stroke="#1976D2" strokeWidth="3" />
      </svg>
    ),
    accentColor: "#1976D2",
    bgLight: "#E3F2FD",
    tag: "Sports",
  },
  {
    id: "health-awareness",
    title: "Health Awareness",
    tagline: "Healthy Communities, Strong Nation",
    description:
      "Organizing health awareness campaigns, medical camps, and wellness programs to promote healthier communities.",
    href: "/campaigns/health",
    highlights: [
      "Free health camps",
      "Rural medical awareness",
      "Nutrition education",
      "Community wellness drives",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="32" r="22" fill="#FDEDED" />
        <path
          d="M32 18v28M18 32h28"
          stroke="#E53935"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
    accentColor: "#E53935",
    bgLight: "#FDEDED",
    tag: "Health",
  },

  {
    id: "women-safety",
    title: "Women Safety Awareness",
    tagline: "Empowering Through Education",
    description:
      "Workshops and awareness sessions in schools and communities focused on women's safety and empowerment.",
    href: "/campaigns/women-safety",
    highlights: [
      "School workshop series",
      "Self-defence training",
      "Legal rights education",
      "Community safe spaces",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="32" r="26" fill="#F5DAD2" opacity="0.6" />
      </svg>
    ),
    accentColor: "#C5192D",
    bgLight: "#F5DAD2",
    tag: "Social",
  },

  {
    id: "pollution-awareness",
    title: "Pollution Awareness",
    tagline: "Educating for Cleaner Tomorrow",
    description:
      "Educational initiatives promoting sustainable living and pollution reduction.",
    href: "/campaigns/pollution-awareness",
    highlights: [
      "Clean city drives",
      "School programmes",
      "Plastic-free campaigns",
      "Air quality monitoring",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="32" r="22" fill="#D0E7D2" />
      </svg>
    ),
    accentColor: "#618264",
    bgLight: "#B0D9B1",
    tag: "Environment",
  },

  {
    id: "agriculture-support",
    title: "Sustainable Agriculture",
    tagline: "Empowering Farmers",
    description:
      "Promoting sustainable farming practices and supporting local farmers through awareness and training programmes.",
    href: "/campaigns/agriculture",
    highlights: [
      "Farmer awareness camps",
      "Organic farming training",
      "Soil health education",
      "Water conservation",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="32" r="22" fill="#E8F5E9" />
        <path d="M32 48V20" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    accentColor: "#4CAF50",
    bgLight: "#E8F5E9",
    tag: "Agriculture",
  },

  {
    id: "education-support",
    title: "Education Support",
    tagline: "Learning for Every Child",
    description:
      "Providing educational support to underprivileged children through mentorship programmes and awareness campaigns.",
    href: "/campaigns/education",
    highlights: [
      "Free learning workshops",
      "School awareness drives",
      "Scholarship guidance",
      "Digital learning support",
    ],
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
        <circle cx="32" cy="32" r="22" fill="#FFF3E0" />
        <rect x="20" y="26" width="24" height="12" rx="2" fill="#FB8C00" />
      </svg>
    ),
    accentColor: "#FB8C00",
    bgLight: "#FFF3E0",
    tag: "Education",
  },

  /* ─── NEW PROGRAMME: HEALTH ─────────────────── */

  
];

/* ─── Programme Card ─────────────────────────────────── */

function ProgrammeCard({ prog }: { prog: (typeof programmes)[number] }) {
  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: `${prog.accentColor}18`,
      }}
    >
      <div
        className="p-6 flex items-start gap-4"
        style={{ backgroundColor: prog.bgLight }}
      >
        <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-white">
          {prog.icon}
        </div>

        <div>
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mb-2"
            style={{
              backgroundColor: `${prog.accentColor}18`,
              color: prog.accentColor,
            }}
          >
            {prog.tag}
          </span>

          <h3 className="font-bold text-xl text-[#1e2d1f]">{prog.title}</h3>

          <p className="text-xs mt-1" style={{ color: prog.accentColor }}>
            {prog.tagline}
          </p>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <p className="text-sm text-gray-600">{prog.description}</p>

        <ul className="space-y-2">
          {prog.highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: prog.accentColor }}
              />
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={prog.href}
          className="inline-flex items-center gap-2 text-sm font-semibold"
          style={{ color: prog.accentColor }}
        >
          Learn More →
        </Link>
      </div>
    </article>
  );
}

export default function ProgrammesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase text-[#618264]">
            What We Do
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold text-[#1e2d1f]">
            Our <span className="italic text-[#618264]">Programmes</span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600">
            Key focus areas where Avartya drives impact across environment,
            society, health, and community development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((prog) => (
            <ProgrammeCard key={prog.id} prog={prog} />
          ))}
        </div>

      </div>
    </section>
  );
}