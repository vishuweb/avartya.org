const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Environment",
        "Women Empowerment",
        "Education",
        "Health",
        "Community",
        "Sports",
        "Agriculture",
      ],
      required: true,
    },

    location: {
      type: String,
      trim: true,
    },

    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },

    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed"],
      default: "upcoming",
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    images: [{ type: String }],

    participants: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
