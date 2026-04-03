const express = require("express");
const router = express.Router();
const { authLimiter } = require("../middleware/rateLimiter");
const { loginAdmin } = require("../controllers/adminController");

router.post("/login", authLimiter, loginAdmin);

module.exports = router;