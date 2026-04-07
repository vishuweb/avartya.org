const Razorpay = require("razorpay");
const crypto = require("crypto");
const Donation = require("../models/Donation");

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env");
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

// ─── POST /api/payments/create-order ──────────────
// Creates a Razorpay order linked to an existing donation intent
const createOrder = async (req, res) => {
  try {
    const { donationId } = req.body;

    if (!donationId) {
      return res.status(400).json({ message: "Donation ID is required" });
    }

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: "Donation record not found" });
    }

    if (!["interest", "pending"].includes(donation.status)) {
      return res.status(400).json({ message: "Donation already processed or failed" });
    }

    const razorpay = getRazorpayInstance();

    const order = await razorpay.orders.create({
      amount: donation.amount * 100, // Razorpay expects paise
      currency: "INR",
      receipt: `avartya_${donation._id}`,
      notes: {
        donationId: donation._id.toString(),
        purpose: donation.purpose,
        name: donation.name,
      },
    });

    // Store order ID in donation record
    donation.razorpayOrderId = order.id;
    donation.status = "pending";
    await donation.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      donorName: donation.name,
      donorEmail: donation.email,
      donorPhone: donation.phone || "",
    });
  } catch (error) {
    console.error("[Razorpay Create Order Error]", error.message);
    if (error.message.includes("not configured")) {
      return res.status(503).json({ message: "Payment system not yet configured. Please contact us directly." });
    }
    res.status(500).json({ message: "Failed to create payment order" });
  }
};

// ─── POST /api/payments/verify ────────────────────
// Verifies Razorpay signature after successful payment
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !donationId) {
      return res.status(400).json({ message: "Missing required payment verification fields" });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ message: "Payment system not configured. Please contact us directly." });
    }

    // Verify HMAC signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      // Mark donation as failed on signature mismatch
      await Donation.findByIdAndUpdate(donationId, { status: "failed" });
      return res.status(400).json({ message: "Payment verification failed: invalid signature" });
    }

    // Update donation to paid
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      {
        status: "paid",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ message: "Donation record not found" });
    }

    res.json({
      message: "Payment verified successfully. Thank you for your contribution!",
      donation: {
        id: donation._id,
        amount: donation.amount,
        purpose: donation.purpose,
        status: donation.status,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (error) {
    console.error("[Razorpay Verify Error]", error.message);
    res.status(500).json({ message: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };
