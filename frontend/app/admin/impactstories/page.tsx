"use client";
import { useState } from "react";

export default function AddImpactStory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // We MUST use FormData when sending files, not standard JSON
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("featured", String(featured));
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(``, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
          // Note: Do NOT set 'Content-Type': 'application/json' here. 
          // The browser sets the correct multipart boundary automatically for FormData.
        },
        body: formData,
      });

      if (res.ok) {
        alert("Impact Story uploaded successfully!");
        // Reset form or redirect
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Impact Story</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
        <input 
          type="text" placeholder="Title" required className="border p-2"
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          placeholder="Description" required className="border p-2" rows={4}
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input 
          type="text" placeholder="Slug (e.g., helping-hands-2026)" required className="border p-2"
          onChange={(e) => setSlug(e.target.value)} 
        />
        
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            onChange={(e) => setFeatured(e.target.checked)} 
          />
          <span>Set as Featured Story</span>
        </label>

        <input 
          type="file" accept="image/*" required className="border p-2"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} 
        />

        <button type="submit" className="bg-green-700 text-white p-3 rounded hover:bg-green-800">
          Upload Story
        </button>
      </form>
    </div>
  );
}