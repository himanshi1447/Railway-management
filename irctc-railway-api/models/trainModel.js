// models/trainModel.js
const { pool } = require("../config/database");

class TrainModel {
  // Add a new train
  static async createTrain(trainData) {
    const { train_number, train_name, source, destination, total_seats } =
      trainData;

    const [result] = await pool.query(
      "INSERT INTO trains (train_number, train_name, source, destination, total_seats, available_seats) VALUES (?, ?, ?, ?, ?, ?)",
      [train_number, train_name, source, destination, total_seats, total_seats]
    );

    return result.insertId;
  }

  // Find train by train number
  static async findByTrainNumber(train_number) {
    const [trains] = await pool.query(
      "SELECT * FROM trains WHERE train_number = ?",
      [train_number]
    );
    return trains[0];
  }

  // Get trains by source and destination
  static async findTrainsByRoute(source, destination) {
    const [trains] = await pool.query(
      "SELECT * FROM trains WHERE source = ? AND destination = ? AND available_seats > 0",
      [source, destination]
    );
    return trains;
  }

  // Update train seat availability
  static async updateSeatAvailability(train_id, seats_to_update) {
    await pool.query(
      "UPDATE trains SET available_seats = available_seats - ? WHERE id = ?",
      [seats_to_update, train_id]
    );
  }

  // Get train details by ID
  static async getTrainById(train_id) {
    const [trains] = await pool.query("SELECT * FROM trains WHERE id = ?", [
      train_id,
    ]);
    return trains[0];
  }

  // Count total trains
  static async countTrains() {
    const [result] = await pool.query("SELECT COUNT(*) as total FROM trains");
    return result[0].total;
  }
}

module.exports = TrainModel;
