const ImpactEntry = require("../models/ImpactEntry");
const Volunteer = require("../models/Volunteer");
const Campaign = require("../models/Campaign");

// ─── GET /api/impact/totals — Homepage stats (public) ─────
const getImpactTotals = async (req, res) => {
  try {
    // Aggregate ImpactEntry by type
    const entryTotals = await ImpactEntry.aggregate([
      { $match: { isVerified: true } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$count" },
          entries: { $sum: 1 },
        },
      },
    ]);

    // Convert to a clean map
    const totalsMap = {};
    entryTotals.forEach(({ _id, total, entries }) => {
      totalsMap[_id] = { total, entries };
    });

    // Count volunteers and campaigns for supplementary stats
    const [volunteerCount, campaignCount, totalImpactEntries] = await Promise.all([
      Volunteer.countDocuments({ status: "active" }),
      Campaign.countDocuments({ isPublished: true }),
      ImpactEntry.countDocuments({ isVerified: true }),
    ]);

    res.json({
      treesPlanted: totalsMap.tree?.total || 0,
      plasticKg: totalsMap.plastic?.total || 0,
      peopleReached: totalsMap.people?.total || 0,
      schoolsReached: totalsMap.school?.total || 0,
      eventsHeld: totalsMap.event?.total || 0,
      activeVolunteers: volunteerCount,
      totalCampaigns: campaignCount,
      totalEntries: totalImpactEntries,
    });
  } catch (error) {
    console.error("[Impact Totals Error]", error.message);
    res.status(500).json({ message: "Server error fetching impact totals" });
  }
};

// ─── GET /api/impact — Paginated entries (public) ─────────
const getImpactEntries = async (req, res) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;
    const filter = { isVerified: true };
    if (type) filter.type = type;

    const entries = await ImpactEntry.find(filter)
      .sort({ date: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("campaign", "title category");

    const total = await ImpactEntry.countDocuments(filter);

    res.json({ entries, total, page: Number(page) });
  } catch (error) {
    console.error("[Impact Entries Error]", error.message);
    res.status(500).json({ message: "Server error fetching impact entries" });
  }
};

// ─── GET /api/impact/admin — All entries for admin ────────
const getAllEntriesAdmin = async (req, res) => {
  try {
    const entries = await ImpactEntry.find()
      .sort({ createdAt: -1 })
      .populate("campaign", "title");
    res.json({ entries, total: entries.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ─── POST /api/impact — Create entry (admin) ──────────────
const createImpactEntry = async (req, res) => {
  try {
    const {
      type, count, unit, location, coordinates,
      date, addedBy, campaign, notes,
    } = req.body;

    if (!type || !count) {
      return res.status(400).json({ message: "Type and count are required" });
    }

    // Safely parse coordinates JSON if provided
    let parsedCoordinates;
    if (coordinates) {
      try {
        parsedCoordinates = typeof coordinates === "string" ? JSON.parse(coordinates) : coordinates;
      } catch {
        return res.status(400).json({ message: "Invalid coordinates format — must be valid JSON" });
      }
    }

    const entry = new ImpactEntry({
      type,
      count: Number(count),
      unit,
      location,
      coordinates: parsedCoordinates,
      proofImage: req.file?.path || undefined, // Cloudinary URL if image uploaded
      date: date || new Date(),
      addedBy: addedBy || req.admin?.email || "Admin",
      campaign: campaign || undefined,
      notes,
    });

    await entry.save();
    res.status(201).json({ message: "Impact entry logged successfully", entry });
  } catch (error) {
    console.error("[Impact Create Error]", error.message);
    res.status(500).json({ message: "Server error logging impact" });
  }
};

// ─── PUT /api/impact/:id — Update entry (admin) ─────────
const updateImpactEntry = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.count) updates.count = Number(updates.count);
    if (updates.coordinates && typeof updates.coordinates === "string") {
      try {
        updates.coordinates = JSON.parse(updates.coordinates);
      } catch {
        return res.status(400).json({ message: "Invalid coordinates format — must be valid JSON" });
      }
    }
    const entry = await ImpactEntry.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Impact entry updated", entry });
  } catch (error) {
    console.error("[Impact Update Error]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── DELETE /api/impact/:id — Delete entry (admin) ────────
const deleteImpactEntry = async (req, res) => {
  try {
    const entry = await ImpactEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json({ message: "Impact entry deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getImpactTotals,
  getImpactEntries,
  getAllEntriesAdmin,
  createImpactEntry,
  updateImpactEntry,
  deleteImpactEntry,
};
