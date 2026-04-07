const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const SustainabilityIdea = require("../models/SustainabilityIdea");

// Public — get published ideas
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;

    const ideas = await SustainabilityIdea.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ ideas, total: ideas.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin — get all
router.get("/admin", verifyToken, async (req, res) => {
  try {
    const ideas = await SustainabilityIdea.find().sort({ order: 1, createdAt: -1 });
    res.json({ ideas, total: ideas.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin — create
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, category, difficulty, icon, order } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ message: "Title, description and category are required" });
    }
    const idea = new SustainabilityIdea({ title, description, category, difficulty, icon, order });
    await idea.save();
    res.status(201).json({ message: "Idea created", idea });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin — update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const idea = await SustainabilityIdea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json({ message: "Idea updated", idea });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin — delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const idea = await SustainabilityIdea.findByIdAndDelete(req.params.id);
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
