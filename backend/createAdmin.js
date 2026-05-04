const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.join(__dirname, ".env") });

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const db = mongoose.connection.db;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("Vishal@1008", salt);

    await db.collection("admins").updateOne(
      { email: "24je0931@iitism.ac.in" },
      {
        $set: {
          name: "Vishal",
          email: "24je0931@iitism.ac.in",
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    console.log("Admin user created successfully");
    process.exit(0);
  })
  .catch(console.error);
