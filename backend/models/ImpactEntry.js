const mongoose = require("mongoose");

const ImpactEntrySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["tree", "plastic", "people", "school", "event"],
      required: [true, "Impact type is required"],
    },

    count: {
      type: Number,
      required: [true, "Count is required"],
      min: [1, "Count must be at least 1"],
    },

    unit: {
      type: String,
      trim: true,
      // e.g. "saplings", "kg", "students", "schools", "events"
    },

    location: {
      type: String,
      trim: true,
    },

    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },

    proofImage: {
      type: String, // Cloudinary URL — optional
    },

    date: {
      type: Date,
      default: Date.now,
    },

    addedBy: {
      type: String,
      trim: true,
      default: "Admin",
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },

    isVerified: {
      type: Boolean,
      default: true,
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Index for fast aggregation queries
ImpactEntrySchema.index({ type: 1 });
ImpactEntrySchema.index({ date: -1 });

module.exports = mongoose.model("ImpactEntry", ImpactEntrySchema);
