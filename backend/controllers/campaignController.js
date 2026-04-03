const Campaign = require("../models/Campaign");

const getCampaigns = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (status) filter.status = status;

    const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });
    res.json({ campaigns, total: campaigns.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllCampaignsAdmin = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json({ campaigns, total: campaigns.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createCampaign = async (req, res) => {
  try {
    const {
      title, description, category, location,
      coordinates, status, startDate, endDate, participants, isPublished,
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "Title, description and category are required" });
    }

    const campaign = new Campaign({
      title, description, category, location,
      coordinates, status, startDate, endDate, participants, isPublished,
    });

    await campaign.save();
    res.status(201).json({ message: "Campaign created", campaign });
  } catch (error) {
    console.error("[Campaign Create Error]", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const editCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json({ message: "Campaign updated", campaign });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getCampaigns, getAllCampaignsAdmin, createCampaign, editCampaign, deleteCampaign };
