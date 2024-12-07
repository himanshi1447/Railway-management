// controllers/trainController.js
const { pool } = require("../config/database");

const addTrain = async (req, res) => {
  try {
    const { train_number, train_name, source, destination, total_seats } =
      req.body;

    // Check if train already exists
    const [existingTrains] = await pool.query(
      "SELECT * FROM trains WHERE train_number = ?",
      [train_number]
    );

    if (existingTrains.length > 0) {
      return res.status(400).json({ error: "Train already exists" });
    }

    // Insert new train
    const [result] = await pool.query(
      "INSERT INTO trains (train_number, train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?, ?)",
      [train_number, train_name, source, destination, total_seats, total_seats]
    );

    res.status(201).json({
      message: "Train added successfully",
      trainId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTrainAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;

    const [trains] = await pool.query(
      "SELECT * FROM trains WHERE source = ? AND destination = ? AND available_seats > 0",
      [source, destination]
    );

    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTrains = async (req, res) => {
  try {
    const [trains] = await pool.query("SELECT * FROM trains");
    res.json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTrain,
  getTrainAvailability,
  getAllTrains,
};
