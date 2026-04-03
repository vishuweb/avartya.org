const mongoose = require("mongoose");

const UpdateSchema = new mongoose.Schema(
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

    type: {
      type: String,
      enum: ["news", "jobs", "events"],
      required: [true, "Type is required"],
    },

    source: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    expiresAt: {
      type: Date,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    link: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Update", UpdateSchema);
