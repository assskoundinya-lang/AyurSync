const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Dummy users (replace with DB later)
const users = [];

// POST /api/register
router.post("/register", (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }
  users.push({ email, password });
  res.json({ success: true, message: "User registered!" });
});

// POST /api/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  // Create JWT
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ success: true, token });
});

module.exports = router;

