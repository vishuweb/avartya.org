const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const {
  generateCampaignDescription, answerQuery, summarizeData,
} = require("../controllers/aiController");

// Admin only — generate campaign descriptions
router.post("/generate-description", verifyToken, authLimiter, generateCampaignDescription);

// Admin only — summarize data
router.post("/summarize", verifyToken, authLimiter, summarizeData);

// Public query — rate limited (chatbot feature)
router.post("/query", authLimiter, answerQuery);

module.exports = router;
