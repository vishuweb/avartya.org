const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String
  },

  education: {
    type: String,
    enum: [
      "High School",
      "Intermediate",
      "Diploma",
      "B.Tech",
      "B.Sc",
      "M.Tech",
      "M.Sc",
      "PhD",
      "Other"
    ]
  },

  previousWork: {
    type: String
  },

  skills: {
    type: String
  },

  city: {
    type: String
  },

  availability: {
    type: String,
    enum: [
      "Weekends",
      "Weekdays",
      "Both",
      "Occasionally"
    ]
  },

  motivation: {
    type: String,
    enum: [
      "Environment Protection",
      "Women Safety",
      "Social Service",
      "Community Development",
      "Learning & Experience"
    ]
  },

  joinedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Volunteer", VolunteerSchema);