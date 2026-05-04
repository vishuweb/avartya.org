const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const impactRoutes = require("./routes/impactRoutes");
const updateRoutes = require("./routes/updateRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const womenHelpRoutes = require("./routes/womenHelpRoutes");
const sustainabilityRoutes = require("./routes/sustainabilityRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const emailRoutes = require("./routes/emailRoutes");
const aiRoutes = require("./routes/aiRoutes");
const impactEntryRoutes = require("./routes/impactEntryRoutes");
const teamRoutes = require("./routes/teamRoutes");
const donationRoutes = require("./routes/donationRoutes");
const { globalLimiter } = require("./middleware/rateLimiter");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// ─── Security Headers ───────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// ─── CORS ──────────────────────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "https://avartya.org",
  "https://www.avartya.org",
  "https://avartya-org.vercel.app",
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman in dev)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: origin not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ─── Body Parsers ──────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ─── Global Rate Limiter ───────────────────────────────────
app.use(globalLimiter);

// ─── Database Connection ───────────────────────────────────
// Validate required environment variables early for clearer errors
const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
const missingEnv = requiredEnv.filter((k) => !process.env[k]);
if (missingEnv.length) {
  console.error(`❌ Missing required environment variables: ${missingEnv.join(", ")}`);
  console.error("Please set them in backend/.env or your deployment environment.");
  process.exit(1);
}

connectDB();

// ─── Static Files ──────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Routes ────────────────────────────────────────────────
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/impact-stories", impactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/women-help", womenHelpRoutes);
app.use("/api/sustainability", sustainabilityRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/impact", impactEntryRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/payments", paymentRoutes);

// ─── Health Check ──────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Avartya Backend Running",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global Error Handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack || err.message}`);

  if (err.message?.includes("CORS")) {
    return res.status(403).json({ message: "CORS policy violation" });
  }

  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Something went wrong",
  });
});

// ─── Start Server ──────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT} [${process.env.NODE_ENV || "development"}]`);
});