"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1974&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex justify-start ml-10">

        {/* Text Block */}
        <div className="text-yellow-300 max-w-xl">

          <h1 className="text-4xl text-blue-50 md:text-6xl font-bold leading-tight">
            Together we build a <br />
            <span className="text-green-400">sustainable future</span> <br />
            for every community.
          </h1>

          {/* Accent Line */}
          <div className="w-28 h-1 bg-green-500 mt-6"></div>

          <p className="text-gray-200 mt-6 text-lg">
            Youth driven action for environment and social awareness.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">

            <Link
              href="/volunteer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Become a Volunteer
            </Link>

            <Link
              href="/campaigns"
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Our Campaigns
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}