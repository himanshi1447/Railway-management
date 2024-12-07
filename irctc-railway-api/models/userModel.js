// models/userModel.js
const { pool } = require("../config/database");

class UserModel {
  // Find user by username
  static async findByUsername(username) {
    const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return users[0];
  }

  // Find user by ID
  static async findById(id) {
    const [users] = await pool.query(
      "SELECT id, username, email, role FROM users WHERE id = ?",
      [id]
    );
    return users[0];
  }

  // Check if username exists
  static async usernameExists(username) {
    const [users] = await pool.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    return users.length > 0;
  }

  // Check if email exists
  static async emailExists(email) {
    const [users] = await pool.query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    return users.length > 0;
  }

  // Count total users
  static async countUsers() {
    const [result] = await pool.query("SELECT COUNT(*) as total FROM users");
    return result[0].total;
  }

  // Get users with pagination
  static async getPaginatedUsers(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const [users] = await pool.query(
      "SELECT id, username, email, role, created_at FROM users LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return users;
  }
}

module.exports = UserModel;
