const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to protect routes
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}

// GET /api/patient (protected)
router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "All patients data",
    patients: [
      { id: 1, name: "John Doe", age: 30 },
      { id: 2, name: "Jane Smith", age: 25 },
    ],
  });
});

// POST /api/patient (protected)
router.post("/", verifyToken, (req, res) => {
  const { name, age } = req.body;
  res.json({ message: "Patient record created", patient: { name, age } });
});

module.exports = router;
