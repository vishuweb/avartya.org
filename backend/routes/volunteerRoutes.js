const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { registerVolunteer, getVolunteers } = require("../controllers/volunteerController");
router.get("/", verifyToken, getVolunteers);

router.post("/register", registerVolunteer);

router.get("/", getVolunteers);

module.exports = router;