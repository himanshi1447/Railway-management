// routes/trainRoutes.js
const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const { checkAdminKey } = require("../middleware/adminMiddleware");
const {
  addTrain,
  getTrainAvailability,
  getAllTrains,
} = require("../controllers/trainController");

const router = express.Router();

// Admin Routes (Protected with Admin Key)
router.post("/add", authenticateUser, checkAdminKey, addTrain);

// User Routes
router.get("/availability", authenticateUser, getTrainAvailability);
router.get("/", authenticateUser, getAllTrains);

module.exports = router;
