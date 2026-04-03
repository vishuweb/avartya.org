const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const { sendBulkEmail } = require("../controllers/emailController");

// Admin only — bulk email send (with auth limiter to prevent abuse)
router.post("/bulk", verifyToken, authLimiter, sendBulkEmail);

module.exports = router;
