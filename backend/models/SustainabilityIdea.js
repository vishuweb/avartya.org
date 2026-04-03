const mongoose = require("mongoose");

const SustainabilityIdeaSchema = new mongoose.Schema(
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
        "Energy",
        "Water",
        "Waste",
        "Agriculture",
        "Transport",
        "Biodiversity",
        "Lifestyle",
        "Community",
      ],
      required: true,
    },

    icon: {
      type: String,
      default: "leaf",
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Advanced"],
      default: "Easy",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SustainabilityIdea", SustainabilityIdeaSchema);
