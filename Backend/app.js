require('dotenv').config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const dietRoutes = require("./routes/dietRoutes");

const app = express();


app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true
}));


app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/diets", dietRoutes); // better: attach diets under /api/diets

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({ message: "Ayur Backend running" });
});

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
