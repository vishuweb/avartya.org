const Update = require("../models/Update");

// Get all published updates (public)
const getUpdates = async (req, res) => {
  try {
    const { type, limit = 20, page = 1 } = req.query;
    const filter = { isPublished: true };
    if (type) filter.type = type;

    const updates = await Update.find(filter)
      .sort({ date: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Update.countDocuments(filter);
    res.json({ updates, total });
  } catch (error) {
    console.error("[Updates GET Error]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all updates for admin (including unpublished)
const getAllUpdatesAdmin = async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.json({ updates, total: updates.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create update (admin)
const createUpdate = async (req, res) => {
  try {
    const { title, description, type, source, location, date, link, isPublished } = req.body;
    if (!title || !description || !type) {
      return res.status(400).json({ message: "Title, description and type are required" });
    }
    const update = new Update({ title, description, type, source, location, date, link, isPublished });
    await update.save();
    res.status(201).json({ message: "Update created", update });
  } catch (error) {
    console.error("[Update Create Error]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Edit update (admin)
const editUpdate = async (req, res) => {
  try {
    const update = await Update.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!update) return res.status(404).json({ message: "Update not found" });
    res.json({ message: "Update edited", update });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete update (admin)
const deleteUpdate = async (req, res) => {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);
    if (!update) return res.status(404).json({ message: "Update not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUpdates, getAllUpdatesAdmin, createUpdate, editUpdate, deleteUpdate };
