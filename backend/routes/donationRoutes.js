const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { formLimiter } = require("../middleware/rateLimiter");
const {
  getDonationStats,
  getDonations,
  registerDonationInterest,
  updateDonationStatus,
  deleteDonation,
} = require("../controllers/donationController");

// Public
router.get("/stats", getDonationStats);
router.post("/interest", formLimiter, registerDonationInterest);

// Admin
router.get("/", verifyToken, getDonations);
router.patch("/:id/status", verifyToken, updateDonationStatus);
router.delete("/:id", verifyToken, deleteDonation);

module.exports = router;

