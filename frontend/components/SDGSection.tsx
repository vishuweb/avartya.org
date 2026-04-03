"use client";
import React, { useEffect, useRef, useState } from "react";

export interface SDGGoal {
  number: number;
  label: string;
  color: string;
  icon: React.ReactNode;
}

interface SDGCardProps {
  goal: SDGGoal;
  index: number;
}

/* ─── Scroll Reveal Hook ───────────────── */

function useScrollReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}

/* ─── SDG Data ───────────────── */

const sdgGoals: SDGGoal[] = [
  {
    number: 3,
    label: "Good Health & Well Being",
    color: "#4CAF50",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path d="M24 40C24 40 8 30 8 18C8 12.48 12.48 8 18 8C20.96 8 23.64 9.28 25.48 11.36C27.32 9.28 30 8 33 8C38.52 8 43 12.48 43 18C43 30 24 40 24 40Z" fill="currentColor" />
        <path d="M19 23H22V26H26V23H29V19H26V16H22V19H19V23Z" fill="white" />
      </svg>
    ),
  },
  {
    number: 5,
    label: "Gender Equality",
    color: "#2E7D32",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <circle cx="24" cy="18" r="10" stroke="currentColor" strokeWidth="3" />
        <path d="M24 28V42M18 36H30" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    number: 4,
    label: "Quality Education",
    color: "#1B5E20",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <path d="M24 8L42 18L24 28L6 18L24 8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: 8,
    label: "Decent Work & Economic Growth",
    color: "#388E3C",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <rect x="6" y="18" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="3" />
      </svg>
    ),
  },
  {
    number: 10,
    label: "Reduced Inequalities",
    color: "#2F855A",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <circle cx="16" cy="16" r="7" fill="currentColor" />
        <circle cx="32" cy="28" r="7" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: 17,
    label: "Partnerships for the Goals",
    color: "#1B4332",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
        <circle cx="12" cy="24" r="6" fill="currentColor" />
        <circle cx="36" cy="12" r="6" fill="currentColor" />
      </svg>
    ),
  },
];

/* ─── Background Variants ───────────────── */

const bgVariants = [
  "#EAF7EE", // soft green
  "#FFFFFF", // white
  "#E2F4E8", // second green shade
];

/* ─── Card Component ───────────────── */

const SDGCard: React.FC<SDGCardProps> = ({ goal, index }) => {
  const bg = bgVariants[index % 3];

  return (
    <article
      className="group relative flex flex-col items-center gap-4 p-8 rounded-2xl
      transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        backgroundColor: bg,
        border: "1px solid #E6EFE8",
      }}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-xl flex items-center justify-center
        transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundColor: goal.color, color: "white" }}
      >
        {goal.icon}
      </div>

      {/* Number */}
      <span
        className="text-4xl font-extrabold tracking-tight"
        style={{ color: goal.color }}
      >
        {goal.number}
      </span>

      {/* Title */}
      <h3 className="text-center text-[15px] font-semibold text-gray-800 leading-snug max-w-[130px]">
        {goal.label}
      </h3>

      {/* Bottom Accent */}
      <div
        className="absolute bottom-0 left-0 h-1.5 w-full scale-x-0 origin-left
        transition-transform duration-500 group-hover:scale-x-100"
        style={{ backgroundColor: goal.color }}
      />
    </article>
  );
};

/* ─── Main Section ───────────────── */

export default function SDGSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`py-16 lg:py-28 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ backgroundColor: "#F4F9F5" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <header className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-sm font-bold tracking-[0.25em] uppercase text-emerald-700 mb-4">
            Our Alignment
          </p>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Towards Achieving{" "}
            <span className="text-emerald-600">Sustainable</span> Development Goals
          </h2>

          <p className="text-gray-600 text-lg mt-6 leading-relaxed">
            Avartya aligns its mission with the United Nations Sustainable
            Development Goals, working at the intersection of environment,
            equity, and community empowerment.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sdgGoals.map((goal, index) => (
            <div
              key={goal.number}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <SDGCard goal={goal} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}