const mongoose = require("mongoose");

const impactStorySchema = new mongoose.Schema(
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

    image: {
      type: String,
      required: [true, "Image is required"],
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      enum: ["Environment", "Women Empowerment", "Education", "Health", "Community", "Sports"],
      default: "Community",
    },

    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ImpactStory", impactStorySchema);