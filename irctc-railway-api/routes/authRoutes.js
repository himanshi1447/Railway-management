// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes (example)
router.get("/profile", authenticateUser, (req, res) => {
  res.json({
    message: "Access to protected route",
    user: req.user,
  });
});

module.exports = router;
