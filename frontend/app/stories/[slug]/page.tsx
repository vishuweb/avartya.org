"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function StoryDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/impact-stories/${slug}`,
          { cache: "no-store" }
        );

        if (!res.ok) throw new Error("Story not found");

        const data = await res.json();
        setStory(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchStory();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto py-16 px-6 animate-pulse">
            <div className="h-96 bg-gray-300 rounded-2xl mb-8" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
              <div className="h-4 bg-gray-300 rounded w-4/6" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error || !story) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Story Not Found</h1>
            <p className="text-gray-500 mb-6">{error || "This story doesn't exist or has been removed."}</p>
            <Link
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </main>
      </>
    );
  }

  // FIXED: Handle Cloudinary URLs (already full URL) vs local paths
  const imageUrl = story.image?.startsWith("http")
    ? story.image
    : `${process.env.NEXT_PUBLIC_API_URL}${story.image}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Story Image */}
          <div className="relative h-64 sm:h-96 w-full">
            <img
              src={imageUrl}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Story Content */}
          <div className="p-6 sm:p-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 font-semibold hover:underline mb-6"
            >
              ← Back to Home
            </Link>

            {story.category && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 mb-4">
                {story.category}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {story.title}
            </h1>

            <div className="w-16 h-1 bg-green-500 mb-6 rounded-full" />

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {story.description}
            </p>

            {story.createdAt && (
              <p className="mt-8 text-sm text-gray-400">
                Published on {new Date(story.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}