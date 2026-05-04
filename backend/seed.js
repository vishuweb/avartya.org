const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const Campaign = require("./models/Campaign");
const ImpactStory = require("./models/ImpactStory");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/myproject";

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    // Sample campaigns for each category so they show up on the programmes section
    const campaigns = [
      {
        title: "Green Earth Initiative",
        description: "Our environment programmes make real impact in communities.",
        category: "Environment",
        location: "Ranchi",
        status: "ongoing",
        isPublished: true,
      },
      {
        title: "Women's Skill Development",
        description: "Empowering women with vocational skills.",
        category: "Women Empowerment",
        location: "Bokaro",
        status: "ongoing",
        isPublished: true,
      },
      {
        title: "Night School for Adults",
        description: "Quality education accessible for everyone.",
        category: "Education",
        location: "Dhanbad",
        status: "ongoing",
        isPublished: true,
      },
      {
        title: "Health Camp 2026",
        description: "Free medical checkups for underprivileged areas.",
        category: "Health",
        location: "Jamshedpur",
        status: "ongoing",
        isPublished: true,
      },
      {
        title: "Community Outreach",
        description: "Engaging locals in sustainable growth.",
        category: "Community",
        location: "Hazaribagh",
        status: "ongoing",
        isPublished: true,
      },
      {
        title: "Youth Football League",
        description: "Fostering sportsmanship and physical health among youngsters.",
        category: "Sports",
        location: "Ranchi",
        status: "ongoing",
        isPublished: true,
      },
      {
        title: "Sustainable Farming Training",
        description: "Equipping farmers with modern biological techniques.",
        category: "Agriculture",
        location: "Giridih",
        status: "ongoing",
        isPublished: true,
      },
    ];

    console.log(`Clearing old campaigns...`);
    await Campaign.deleteMany({});
    
    console.log(`Inserting ${campaigns.length} campaigns...`);
    await Campaign.insertMany(campaigns);

    // Add a featured impact story
    const impactStories = [
      {
        title: "How We Planted 5000 Saplings in One Month",
        description: "Through the persistent efforts of our massive volunteer network, we completely revitalized an entire regional park area, combating deforestation and restoring local biodiversity effectively over just a short 30 day period. Read on to see our process and interviews from volunteers.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop", // placeholder green image
        slug: "planted-5000-saplings",
        featured: true,
        category: "Environment",
        tags: ["Trees", "Nature"],
      }
    ];

    console.log(`Clearing old impact stories...`);
    await ImpactStory.deleteMany({});

    console.log(`Inserting featured impact story...`);
    await ImpactStory.insertMany(impactStories);

    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
