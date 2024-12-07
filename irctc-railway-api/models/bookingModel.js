// models/bookingModel.js
const { pool } = require("../config/database");

class BookingModel {
  // Create a new booking
  static async createBooking(bookingData) {
    const { user_id, train_id, seats_booked } = bookingData;

    const [result] = await pool.query(
      "INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)",
      [user_id, train_id, seats_booked]
    );

    return result.insertId;
  }

  // Get user's bookings
  static async getUserBookings(user_id) {
    const [bookings] = await pool.query(
      `SELECT b.*, t.train_name, t.source, t.destination 
       FROM bookings b
       JOIN trains t ON b.train_id = t.id
       WHERE b.user_id = ?`,
      [user_id]
    );
    return bookings;
  }

  // Get specific booking details
  static async getBookingDetails(booking_id, user_id) {
    const [bookings] = await pool.query(
      `SELECT b.*, t.train_name, t.source, t.destination 
       FROM bookings b
       JOIN trains t ON b.train_id = t.id
       WHERE b.id = ? AND b.user_id = ?`,
      [booking_id, user_id]
    );
    return bookings[0];
  }

  // Cancel a booking
  static async cancelBooking(booking_id, user_id) {
    const connection = await pool.getConnection();

    try {
      // Start transaction
      await connection.beginTransaction();

      // Get booking details
      const [bookings] = await connection.query(
        "SELECT * FROM bookings WHERE id = ? AND user_id = ?",
        [booking_id, user_id]
      );

      if (bookings.length === 0) {
        await connection.rollback();
        return false;
      }

      const booking = bookings[0];

      // Refund seats to train
      await connection.query(
        "UPDATE trains SET available_seats = available_seats + ? WHERE id = ?",
        [booking.seats_booked, booking.train_id]
      );

      // Delete booking
      await connection.query("DELETE FROM bookings WHERE id = ?", [booking_id]);

      // Commit transaction
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Get booking statistics
  static async getBookingStats(user_id) {
    const [stats] = await pool.query(
      `SELECT 
        COUNT(*) as total_bookings, 
        SUM(seats_booked) as total_seats_booked
       FROM bookings
       WHERE user_id = ?`,
      [user_id]
    );
    return stats[0];
  }
}

module.exports = BookingModel;
