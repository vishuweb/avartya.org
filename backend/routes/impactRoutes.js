const express = require("express");
const router = express.Router();
const ImpactStory = require("../models/ImpactStory");
const upload = require("../middleware/upload");

// 1. CREATE STORY
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Safety check: Ensure an image was actually uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required!" });
    }

    const story = new ImpactStory({
      title: req.body.title,
      description: req.body.description,
      image: `/uploads/${req.file.filename}`,
      slug: req.body.slug,
      featured: req.body.featured
    });

    await story.save();
    res.json(story);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. GET ALL STORIES
router.get("/", async (req, res) => {
  try {
    const stories = await ImpactStory.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. GET FEATURED STORY (Gets the NEWEST featured story)
router.get("/featured", async (req, res) => {
  try {
    const story = await ImpactStory.findOne({ featured: true }).sort({ createdAt: -1 });
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET SINGLE STORY BY SLUG (Must be below /featured)
router.get("/:slug", async (req, res) => {
  try {
    const story = await ImpactStory.findOne({ slug: req.params.slug });
    
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }
    
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;