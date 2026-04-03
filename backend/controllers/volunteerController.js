const Volunteer = require("../models/Volunteer");

// ─── Register Volunteer ────────────────────────────────────
const registerVolunteer = async (req, res) => {
  try {
    const {
      name, email, phone, education,
      previousWork, skills, city, availability, motivation,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check for duplicate
    const existing = await Volunteer.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "A volunteer with this email already exists" });
    }

    const volunteer = new Volunteer({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone,
      education,
      previousWork,
      skills,
      city,
      availability,
      motivation,
    });

    await volunteer.save();

    res.status(201).json({
      message: "Thank you for registering! We will get in touch soon.",
    });
  } catch (error) {
    console.error("[Volunteer Register Error]", error.message);
    if (error.code === 11000) {
      return res.status(409).json({ message: "A volunteer with this email already exists" });
    }
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ─── Get All Volunteers (Admin only) ──────────────────────
const getVolunteers = async (req, res) => {
  try {
    const { city, availability, motivation, status, search, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (city) filter.city = new RegExp(city, "i");
    if (availability) filter.availability = availability;
    if (motivation) filter.motivation = motivation;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { city: new RegExp(search, "i") },
      ];
    }

    const volunteers = await Volunteer.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Volunteer.countDocuments(filter);

    res.json({ volunteers, total, page: Number(page) });
  } catch (error) {
    console.error("[Volunteer Get Error]", error.message);
    res.status(500).json({ message: "Server error fetching volunteers" });
  }
};

// ─── Update Volunteer Status (Admin only) ─────────────────
const updateVolunteerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "active", "inactive"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }

    res.json({ message: "Status updated", volunteer });
  } catch (error) {
    console.error("[Volunteer Status Error]", error.message);
    res.status(500).json({ message: "Server error updating status" });
  }
};

module.exports = { registerVolunteer, getVolunteers, updateVolunteerStatus };
