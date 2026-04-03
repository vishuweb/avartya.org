const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { formLimiter } = require("../middleware/rateLimiter");
const { registerVolunteer, getVolunteers, updateVolunteerStatus } = require("../controllers/volunteerController");

// Public — register (rate limited to prevent spam)
router.post("/register", formLimiter, registerVolunteer);

// Admin only — get all volunteers (FIXED: only one GET / route, protected)
router.get("/", verifyToken, getVolunteers);

// Admin only — update volunteer status
router.patch("/:id/status", verifyToken, updateVolunteerStatus);

module.exports = router;