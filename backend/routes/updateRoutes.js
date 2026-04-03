const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  getUpdates, getAllUpdatesAdmin, createUpdate, editUpdate, deleteUpdate,
} = require("../controllers/updateController");

// Public
router.get("/", getUpdates);

// Admin only
router.get("/admin", verifyToken, getAllUpdatesAdmin);
router.post("/", verifyToken, createUpdate);
router.put("/:id", verifyToken, editUpdate);
router.delete("/:id", verifyToken, deleteUpdate);

module.exports = router;
