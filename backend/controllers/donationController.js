const Donation = require("../models/Donation");

// ─── GET /api/donations/stats — Public transparency stats ─
const getDonationStats = async (req, res) => {
  try {
    const [totalResult, donorCount, purposeBreakdown] = await Promise.all([
      Donation.aggregate([
        { $match: { status: { $in: ["paid", "interest"] } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Donation.countDocuments({ status: { $in: ["paid", "interest"] } }),
      Donation.aggregate([
        { $match: { status: { $in: ["paid", "interest"] } } },
        { $group: { _id: "$purpose", total: { $sum: "$amount" }, count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      totalRaised: totalResult[0]?.total || 0,
      donorCount,
      purposeBreakdown,
    });
  } catch (error) {
    console.error("[Donation Stats Error]", error.message);
    res.status(500).json({ message: "Server error fetching donation stats" });
  }
};

// ─── GET /api/donations — Admin: all donations ────────────
const getDonations = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Donation.countDocuments(filter);

    // Aggregate total for filtered view
    const totalRaised = await Donation.aggregate([
      { $match: { ...filter, status: { $in: ["paid", "interest"] } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      donations,
      total,
      totalRaised: totalRaised[0]?.total || 0,
    });
  } catch (error) {
    console.error("[Donations GET Error]", error.message);
    res.status(500).json({ message: "Server error fetching donations" });
  }
};

// ─── POST /api/donations/interest — Register donor interest ─
// (Stub: Razorpay not integrated yet — captures intent only)
const registerDonationInterest = async (req, res) => {
  try {
    const { name, email, phone, amount, purpose, message, isAnonymous } = req.body;

    if (!name || !email || !amount) {
      return res.status(400).json({ message: "Name, email and amount are required" });
    }

    if (Number(amount) < 1) {
      return res.status(400).json({ message: "Amount must be at least ₹1" });
    }

    const donation = new Donation({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim(),
      amount: Number(amount),
      purpose: purpose || "general",
      message: message?.trim(),
      isAnonymous: !!isAnonymous,
      status: "interest",
    });

    await donation.save();

    res.status(201).json({
      message: "Thank you for your support! We will contact you to complete your donation.",
      donationId: donation._id,
    });
  } catch (error) {
    console.error("[Donation Interest Error]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ─── PATCH /api/donations/:id/status — Admin update status ──
const updateDonationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["interest", "pending", "paid", "failed", "refunded"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.json({ message: "Status updated", donation });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ─── DELETE /api/donations/:id — Admin delete ─────────────
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getDonationStats,
  getDonations,
  registerDonationInterest,
  updateDonationStatus,
  deleteDonation,
};
