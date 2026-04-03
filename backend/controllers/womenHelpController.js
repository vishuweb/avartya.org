const WomenHelp = require("../models/WomenHelp");

// Submit a help request (public — rate limited)
const submitHelpRequest = async (req, res) => {
  try {
    const { name, contact, issue, location, issueType, isAnonymous } = req.body;

    if (!name || !contact || !issue) {
      return res.status(400).json({ message: "Name, contact, and issue description are required" });
    }

    const request = new WomenHelp({
      name: name.trim(),
      contact: contact.trim(),
      issue: issue.trim(),
      location: location?.trim(),
      issueType: issueType || "Other",
      isAnonymous: !!isAnonymous,
    });

    await request.save();

    res.status(201).json({
      message: "Your request has been received. Our team will contact you shortly. You are not alone.",
    });
  } catch (error) {
    console.error("[WomenHelp Submit Error]", error.message);
    res.status(500).json({ message: "Server error. Please try again or call our helpline." });
  }
};

// Get all requests — Admin only
const getAllRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const requests = await WomenHelp.find(filter).sort({ createdAt: -1 });
    res.json({ requests, total: requests.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update request status — Admin only
const updateRequestStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const validStatuses = ["new", "reviewed", "resolved", "referred"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await WomenHelp.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true }
    );

    if (!request) return res.status(404).json({ message: "Request not found" });

    res.json({ message: "Status updated", request });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitHelpRequest, getAllRequests, updateRequestStatus };
