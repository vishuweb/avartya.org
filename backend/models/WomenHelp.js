const mongoose = require("mongoose");

const WomenHelpSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    contact: {
      type: String,
      required: [true, "Contact is required"],
      trim: true,
    },

    issue: {
      type: String,
      required: [true, "Issue description is required"],
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    issueType: {
      type: String,
      enum: [
        "Safety Concern",
        "Domestic Violence",
        "Legal Help",
        "Financial Support",
        "Medical Help",
        "Counseling",
        "Other",
      ],
      default: "Other",
    },

    status: {
      type: String,
      enum: ["new", "reviewed", "resolved", "referred"],
      default: "new",
    },

    adminNotes: {
      type: String,
      trim: true,
    },

    isAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WomenHelp", WomenHelpSchema);
