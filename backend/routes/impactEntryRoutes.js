const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/cloudinaryUpload");
const {
  getImpactTotals,
  getImpactEntries,
  getAllEntriesAdmin,
  createImpactEntry,
  updateImpactEntry,
  deleteImpactEntry,
} = require("../controllers/impactController");

// Public routes
router.get("/totals", getImpactTotals);      // Homepage stats
router.get("/", getImpactEntries);           // Paginated public entries

// Admin routes
router.get("/admin", verifyToken, getAllEntriesAdmin);
router.post("/", verifyToken, upload.single("proofImage"), createImpactEntry);
router.put("/:id", verifyToken, updateImpactEntry);
router.delete("/:id", verifyToken, deleteImpactEntry);

module.exports = router;
