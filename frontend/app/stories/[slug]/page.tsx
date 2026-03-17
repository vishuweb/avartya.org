"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function StoryDetailPage() {
  const params = useParams(); // This grabs the [slug] from the URL
  const slug = params.slug;

  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/impact-stories/${slug}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Story not found");
        }

        const data = await res.json();
        setStory(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchStory();
    }
  }, [slug]);

  if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading story...</div>;
  if (error) return <div className="text-center py-20 text-xl text-red-500">{error}</div>;
  if (!story) return null;

  const imageUrl = `http://localhost:5000${story.image}`;

  return (
    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Story Image */}
        <div className="relative h-96 w-full">
          <img
            src={imageUrl}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Story Content */}
        <div className="p-10">
          <Link href="/" className="text-green-600 font-semibold hover:underline mb-6 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{story.title}</h1>
          
          <div className="w-16 h-1 bg-green-500 mb-8"></div>

          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
            {story.description}
          </p>
        </div>

      </div>
    </main>
  );
}