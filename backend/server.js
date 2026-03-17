require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const impactRoutes = require("./routes/impactRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/impact-stories", impactRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Avartya Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});