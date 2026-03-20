"use client";
import { useState } from "react";

export default function AddImpactStory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("FORM SUBMITTED");

    // 🚨 safety check
    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("featured", String(featured));
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/impact-stories`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (res.ok) {
        alert("✅ Story uploaded successfully");

        // reset form
        setTitle("");
        setDescription("");
        setSlug("");
        setFeatured(false);
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
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Impact Story</h1>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">

        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />

        <textarea
          placeholder="Description"
          required
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />

        <input
          type="text"
          placeholder="Slug (e.g., helping-hands-2026)"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border p-2"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <span>Set as Featured Story</span>
        </label>

        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) =>
            setImage(e.target.files ? e.target.files[0] : null)
          }
          className="border p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white p-3 rounded hover:bg-green-800"
        >
          {loading ? "Uploading..." : "Upload Story"}
        </button>

      </form>
    </div>
  );
}