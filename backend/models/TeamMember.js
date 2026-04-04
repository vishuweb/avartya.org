const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },

    role: {
      type: String,
      trim: true,
    },

    image: {
      type: String, // Cloudinary URL or external URL
    },

    bio: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: ["founder", "core", "volunteer", "advisor"],
      default: "core",
    },

    priority: {
      type: Number,
      default: 0, // Lower number = shown first
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Sort by priority ascending by default
TeamMemberSchema.index({ category: 1, priority: 1 });

module.exports = mongoose.model("TeamMember", TeamMemberSchema);
