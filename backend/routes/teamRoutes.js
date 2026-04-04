const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/cloudinaryUpload");
const {
  getTeamMembers,
  getAllMembersAdmin,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

// Public
router.get("/", getTeamMembers);

// Admin
router.get("/admin", verifyToken, getAllMembersAdmin);
router.post("/", verifyToken, upload.single("image"), createTeamMember);
router.put("/:id", verifyToken, upload.single("image"), updateTeamMember);
router.delete("/:id", verifyToken, deleteTeamMember);

module.exports = router;
