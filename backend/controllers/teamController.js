const TeamMember = require("../models/TeamMember");

// ─── GET /api/team — Public, active members only ──────────
const getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true })
      .sort({ category: 1, priority: 1, createdAt: 1 });

    // Group by category for easy frontend consumption
    const grouped = {};
    members.forEach((m) => {
      if (!grouped[m.category]) grouped[m.category] = [];
      grouped[m.category].push(m);
    });

    res.json({ members, grouped, total: members.length });
  } catch (error) {
    console.error("[Team GET Error]", error.message);
    res.status(500).json({ message: "Server error fetching team" });
  }
};

// ─── GET /api/team/admin — All members (admin) ────────────
const getAllMembersAdmin = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ category: 1, priority: 1 });
    res.json({ members, total: members.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ─── POST /api/team — Create member (admin) ───────────────
const createTeamMember = async (req, res) => {
  try {
    const { name, designation, role, bio, linkedin, category, priority, isActive, imageUrl } = req.body;

    if (!name || !designation) {
      return res.status(400).json({ message: "Name and designation are required" });
    }

    // Image: from Cloudinary upload OR external URL provided in body
    const image = req.file?.path || imageUrl || undefined;

    const member = new TeamMember({
      name: name.trim(),
      designation: designation.trim(),
      role: role?.trim(),
      image,
      bio: bio?.trim(),
      linkedin: linkedin?.trim(),
      category: category || "core",
      priority: priority ? Number(priority) : 0,
      isActive: isActive === "false" ? false : true,
    });

    await member.save();
    res.status(201).json({ message: "Team member added", member });
  } catch (error) {
    console.error("[Team Create Error]", error.message);
    res.status(500).json({ message: "Server error creating team member" });
  }
};

// ─── PUT /api/team/:id — Update member (admin) ────────────
const updateTeamMember = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file?.path) updates.image = req.file.path;
    if (updates.priority) updates.priority = Number(updates.priority);
    if (updates.isActive !== undefined) updates.isActive = updates.isActive !== "false";

    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Team member updated", member });
  } catch (error) {
    console.error("[Team Update Error]", error.message);
    res.status(500).json({ message: "Server error updating team member" });
  }
};

// ─── DELETE /api/team/:id — Delete member (admin) ─────────
const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Team member deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTeamMembers,
  getAllMembersAdmin,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
