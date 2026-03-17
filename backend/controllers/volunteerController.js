const Volunteer = require("../models/Volunteer");

const registerVolunteer = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      education,
      previousWork,
      skills,
      city,
      availability,
      motivation
    } = req.body;

    const volunteer = new Volunteer({
      name,
      email,
      phone,
      education,
      previousWork,
      skills,
      city,
      availability,
      motivation
    });

    await volunteer.save();

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer
    });

  } catch (error) {
    res.status(500).json({
      message: "Error registering volunteer",
      error: error.message
    });
  }
};
const getVolunteers = async (req, res) => {
  try {

    const volunteers = await Volunteer.find();

    res.json(volunteers);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};
module.exports = {
  registerVolunteer,
  getVolunteers
};

