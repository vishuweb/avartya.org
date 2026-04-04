const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/paymentController");
const { formLimiter } = require("../middleware/rateLimiter");

// POST /api/payments/create-order — requires donationId in body
router.post("/create-order", formLimiter, createOrder);

// POST /api/payments/verify — verify Razorpay signature after payment
router.post("/verify", verifyPayment);

module.exports = router;
