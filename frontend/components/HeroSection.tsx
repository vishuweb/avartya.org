"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[90vh] flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content Container — fixed mobile overflow */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">

        {/* Text Block */}
        <div className="max-w-xl">

          <p className="text-green-400 text-sm font-bold tracking-[0.2em] uppercase mb-4">
            Avartya Foundation
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Together we build a{" "}
            <br className="hidden sm:block" />
            <span className="text-green-400">sustainable future</span>
            <br />
            for every community.
          </h1>

          {/* Accent Line */}
          <div className="w-20 h-1 bg-green-500 mt-6 rounded-full" />

          <p className="text-gray-200 mt-5 text-base sm:text-lg leading-relaxed max-w-md">
            Youth-driven action for environment, women empowerment, and social awareness across India.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Link
              href="/volunteer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
            >
              🌱 Become a Volunteer
            </Link>

            <Link
              href="/campaigns"
              className="border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-green-800 transition-all duration-300 font-semibold text-center"
            >
              Our Campaigns →
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-6 mt-10 text-white">
            {[
              { value: "1200+", label: "Trees Planted" },
              { value: "300+", label: "Volunteers" },
              { value: "20+", label: "Campaigns" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-green-400">{stat.value}</p>
                <p className="text-xs text-gray-300 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}