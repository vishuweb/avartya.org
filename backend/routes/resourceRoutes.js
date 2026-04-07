const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const Resource = require("../models/Resource");

// Public — get active resources, optionally filtered by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;

    const resources = await Resource.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ resources, total: resources.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin — get all (including inactive)
router.get("/admin", verifyToken, async (req, res) => {
  try {
    const resources = await Resource.find().sort({ category: 1, order: 1 });
    res.json({ resources, total: resources.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin — create
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, url, description, category, subcategory, order } = req.body;
    if (!title || !url || !category) {
      return res.status(400).json({ message: "Title, URL and category are required" });
    }
    const resource = new Resource({ title, url, description, category, subcategory, order });
    await resource.save();
    res.status(201).json({ message: "Resource created", resource });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin — update
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json({ message: "Resource updated", resource });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Admin — delete
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
