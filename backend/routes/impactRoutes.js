const express = require("express");
const router = express.Router();
const ImpactStory = require("../models/ImpactStory");
const upload = require("../middleware/cloudinaryUpload");
const verifyToken = require("../middleware/authMiddleware");

// 1. CREATE STORY — Admin only
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const { title, description, slug, featured, category, tags } = req.body;

    if (!title || !description || !slug) {
      return res.status(400).json({ error: "Title, description, and slug are required" });
    }

    const story = new ImpactStory({
      title: title.trim(),
      description: description.trim(),
      image: req.file.path,
      slug: slug.toLowerCase().trim().replace(/\s+/g, "-"),
      featured: featured === "true",
      category: category || "Community",
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    });

    await story.save();
    res.status(201).json({ message: "Story created successfully", story });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "A story with this slug already exists" });
    }
    console.error("[ImpactStory POST Error]", error.message);
    res.status(500).json({ error: "Server error creating story" });
  }
});

// 2. GET ALL STORIES — Public
router.get("/", async (req, res) => {
  try {
    const { category, limit = 20, page = 1 } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const stories = await ImpactStory.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await ImpactStory.countDocuments(filter);

    res.json({ stories, total, page: Number(page) });
  } catch (error) {
    console.error("[ImpactStory GET Error]", error.message);
    res.status(500).json({ error: "Server error fetching stories" });
  }
});

// 3. GET FEATURED STORY — Public
router.get("/featured", async (req, res) => {
  try {
    const story = await ImpactStory.findOne({ featured: true }).sort({ createdAt: -1 });
    if (!story) {
      return res.status(404).json({ message: "No featured story found" });
    }
    res.json(story);
  } catch (error) {
    console.error("[ImpactStory Featured Error]", error.message);
    res.status(500).json({ error: "Server error fetching featured story" });
  }
});

// 4. GET SINGLE STORY BY SLUG — Public (must be below /featured)
router.get("/:slug", async (req, res) => {
  try {
    const story = await ImpactStory.findOne({ slug: req.params.slug });
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.json(story);
  } catch (error) {
    console.error("[ImpactStory Slug Error]", error.message);
    res.status(500).json({ error: "Server error fetching story" });
  }
});

// 5. UPDATE STORY — Admin only
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { title, description, featured, category, tags } = req.body;
    const story = await ImpactStory.findByIdAndUpdate(
      req.params.id,
      { title, description, featured, category, tags },
      { new: true, runValidators: true }
    );
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ message: "Story updated", story });
  } catch (error) {
    console.error("[ImpactStory PUT Error]", error.message);
    res.status(500).json({ error: "Server error updating story" });
  }
});

// 6. DELETE STORY — Admin only
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const story = await ImpactStory.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    console.error("[ImpactStory DELETE Error]", error.message);
    res.status(500).json({ error: "Server error deleting story" });
  }
});

module.exports = router;