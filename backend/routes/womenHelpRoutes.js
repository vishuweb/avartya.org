const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { formLimiter } = require("../middleware/rateLimiter");
const {
  submitHelpRequest, getAllRequests, updateRequestStatus,
} = require("../controllers/womenHelpController");

// Public — submit (rate limited)
router.post("/", formLimiter, submitHelpRequest);

// Admin only
router.get("/", verifyToken, getAllRequests);
router.patch("/:id/status", verifyToken, updateRequestStatus);

module.exports = router;
