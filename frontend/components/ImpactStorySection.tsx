"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ImpactStorySection() {
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedStory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/impact-stories/featured`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch story");
        }

        const data = await res.json();
        setStory(data);
      } catch (error) {
        console.error("❌ Failed to fetch story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStory();
  }, []);

  // 🔁 Loading state
  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">
        Loading Impact Story...
      </div>
    );
  }

  // ❌ No data case
  if (!story) {
    return (
      <div className="text-center py-10 text-red-500">
        No featured story found
      </div>
    );
  }

  // ✅ FIX: Handle BOTH cases (Cloudinary + local fallback)
  let imageUrl = "";

  if (story.image?.startsWith("http")) {
    // Cloudinary (correct case)
    imageUrl = story.image;
  } else {
    // Local uploads fallback (if ever used)
    imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${story.image}`;
  }

  return (
    <section
      className="relative my-5 py-10 lg:py-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-[#1d4259]/80"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            Impact Stories
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Image */}
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src={imageUrl}
                alt={story.title || "Impact Story"}
                className="w-full h-[320px] object-cover"
              />
            </div>
            <div className="h-1 bg-green-500 mt-3 rounded-full"></div>
          </div>

          {/* Text */}
          <div className="text-white">
            <h3 className="text-3xl font-semibold leading-snug">
              {story.title}
            </h3>

            <p className="mt-6 text-lg text-gray-200 whitespace-pre-line">
              {story.description}
            </p>

            <Link
              href={`/stories/${story.slug}`}
              className="inline-block mt-6 text-green-400 font-semibold hover:underline"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}