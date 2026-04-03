const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  getCampaigns, getAllCampaignsAdmin, createCampaign, editCampaign, deleteCampaign,
} = require("../controllers/campaignController");

// Public
router.get("/", getCampaigns);

// Admin only
router.get("/admin", verifyToken, getAllCampaignsAdmin);
router.post("/", verifyToken, createCampaign);
router.put("/:id", verifyToken, editCampaign);
router.delete("/:id", verifyToken, deleteCampaign);

module.exports = router;
