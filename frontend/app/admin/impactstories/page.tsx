"use client";
import { useState } from "react";

export default function AddImpactStory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState("Community");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("featured", String(featured));
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/impact-stories`,
        {
          method: "POST",
          headers: {
            // ✅ FIX: Authorization header was missing — caused 401 on every upload
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Story uploaded successfully");
        setTitle("");
        setDescription("");
        setSlug("");
        setFeatured(false);
        setCategory("Community");
        setTags("");
        setImage(null);
      } else {
        alert(`❌ Error: ${data.error || data.message}`);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed (check backend / CORS)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Impact Story</h1>
        <p className="text-sm text-gray-500 mt-0.5">Upload a new story with image to Cloudinary</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              placeholder="Story title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              placeholder="Story description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input
              type="text"
              placeholder="e.g. helping-hands-2026"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Community</option>
                <option>Environment</option>
                <option>Women Empowerment</option>
                <option>Education</option>
                <option>Health</option>
                <option>Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. trees, youth, 2026"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 p-3 bg-green-50 rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 accent-green-600"
            />
            <span className="text-sm font-medium text-gray-700">Set as Featured Story</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image * (JPG, PNG, WEBP)</label>
            <input
              type="file"
              accept="image/jpg,image/jpeg,image/png,image/webp"
              required
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Uploading...
              </>
            ) : (
              "📸 Upload Story"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}