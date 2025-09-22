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

// GET /api/diet (protected)
router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "All diet plans",
    diets: [
      { id: 1, name: "Low Carb", calories: 1800 },
      { id: 2, name: "High Protein", calories: 2200 },
    ],
  });
});

// POST /api/diet (protected)
router.post("/", verifyToken, (req, res) => {
  const { name, calories } = req.body;
  res.json({ message: "Diet plan created", diet: { name, calories } });
});

module.exports = router;

