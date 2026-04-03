"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ImpactStorySection() {
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedStory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/impact-stories/featured`
        );

        if (!res.ok) throw new Error("Failed to fetch story");

        const data = await res.json();
        setStory(data);
      } catch (error) {
        console.error("Failed to fetch featured story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedStory();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-28 bg-gray-100 animate-pulse">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4" />
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div className="h-80 bg-gray-300 rounded-xl" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!story) {
    return null; // Gracefully hide section if no featured story
  }

  // FIXED: Cloudinary images are already full URLs — don't prepend API URL
  const imageUrl = story.image?.startsWith("http")
    ? story.image
    : `${process.env.NEXT_PUBLIC_API_URL}${story.image}`;

  return (
    <section
      className="relative my-5 py-16 lg:py-28 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-[#1d4259]/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-green-400 mb-3">
            Featured Story
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Impact Stories
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt={story.title || "Impact Story"}
                className="w-full h-[260px] sm:h-[320px] object-cover"
              />
            </div>
            <div className="h-1 bg-green-500 mt-3 rounded-full" />
          </div>

          {/* Text */}
          <div className="text-white">
            {story.category && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-600/30 text-green-300 mb-4">
                {story.category}
              </span>
            )}

            <h3 className="text-2xl sm:text-3xl text-orange-200 font-semibold leading-snug">
              {story.title}
            </h3>

            <p className="mt-4 text-base sm:text-lg text-gray-200 whitespace-pre-line line-clamp-5">
              {story.description}
            </p>

            <Link
              href={`/stories/${story.slug}`}
              className="inline-flex items-center gap-2 mt-6 text-green-400 font-semibold hover:text-green-300 hover:gap-3 transition-all"
            >
              Read full story →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}