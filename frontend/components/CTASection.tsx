"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
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
      className="py-16 lg:py-28 transition-all duration-1000 opacity-0 translate-y-10"
      style={{ backgroundColor: "#ECFDF5" }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE — JOIN CARD */}
          <div className="relative rounded-3xl p-10 lg:p-14 shadow-xl bg-gradient-to-br from-[#4F6F52] to-[#3A5540] text-left">

            <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#A8DF8E]">
              Join Avartya
            </p>

            <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight text-[#FCFFE0]">
              Be part of a{" "}
              <span className="text-[#A8DF8E] italic">greener</span> and{" "}
              <span className="text-[#A8DF8E] italic">safer</span> tomorrow
            </h2>

            <p className="mt-5 text-[#D0E7D2] leading-relaxed max-w-lg">
              Your time, ideas and actions can help build a cleaner environment
              and a safer society for women. Join Avartya and contribute
              directly to meaningful change.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                href="/get-involved/volunteer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-[#A8DF8E] text-[#1e2d1f] hover:bg-[#8ecf77] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Become a Volunteer
              </Link>

              <Link
                href="/campaigns"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold border border-[#A8DF8E] text-[#A8DF8E] hover:bg-[#A8DF8E]/20 transition-all duration-300"
              >
                Explore Campaigns

                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>

              </Link>

            </div>

            {/* Trust indicators */}
            <div className="flex gap-6 flex-wrap mt-8 text-sm text-[#D0E7D2]">

              <span>✓ No experience needed</span>
              <span>✓ Flexible commitment</span>
              <span>✓ Real social impact</span>

            </div>

          </div>


          {/* RIGHT SIDE — IMAGE */}
          <div className="relative">

            <div className="rounded-3xl overflow-hidden shadow-2xl">

              {/* Replace this image with your own */}
              <img
                src="/hero.jpeg"
                alt="Avartya Volunteers"
                className="w-full h-[420px] object-cover"
              />

            </div>

            {/* Soft overlay for aesthetic */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-black/10"></div>

          </div>

        </div>

      </div>
    </section>
  );
}