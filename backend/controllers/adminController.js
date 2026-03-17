const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginAdmin = async (req, res) => {

  try {

    const { name, password } = req.body;

    const admin = await Admin.findOne({ name });

    if (!admin) {
      return res.status(400).json({ message: "if you are not admin please ..dont try" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

module.exports = { loginAdmin };