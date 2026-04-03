const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },

    phone: {
      type: String,
      trim: true,
    },

    education: {
      type: String,
      enum: [
        "High School",
        "Intermediate",
        "Diploma",
        "B.Tech",
        "B.Sc",
        "B.Com",
        "B.A",
        "M.Tech",
        "M.Sc",
        "M.A",
        "MBA",
        "PhD",
        "Other",
      ],
    },

    previousWork: {
      type: String,
      trim: true,
    },

    skills: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    availability: {
      type: String,
      enum: ["Weekends", "Weekdays", "Both", "Occasionally"],
    },

    motivation: {
      type: String,
      enum: [
        "Environment Protection",
        "Women Safety",
        "Social Service",
        "Community Development",
        "Learning & Experience",
        "Health Awareness",
        "Education Support",
      ],
    },

    status: {
      type: String,
      enum: ["pending", "active", "inactive"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Volunteer", VolunteerSchema);