const mongoose = require("mongoose");

// Donation model — Razorpay fields are placeholder for future integration
const DonationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be positive"],
    },

    purpose: {
      type: String,
      enum: ["general", "trees", "education", "women", "health"],
      default: "general",
    },

    message: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },

    // ─── Razorpay (future integration) ────────────────────
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    status: {
      type: String,
      enum: ["interest", "pending", "paid", "failed", "refunded"],
      default: "interest", // "interest" = registered intent, no payment system yet
    },
  },
  { timestamps: true }
);

DonationSchema.index({ status: 1 });
DonationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Donation", DonationSchema);
