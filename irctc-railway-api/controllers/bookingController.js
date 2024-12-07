// controllers/bookingController.js
const { pool } = require("../config/database");

const bookSeat = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    // Start transaction to handle race conditions
    await connection.beginTransaction();

    const { train_id, seats_to_book } = req.body;
    const user_id = req.user.id;

    // Lock the train row to prevent concurrent modifications
    const [trains] = await connection.query(
      "SELECT * FROM trains WHERE id = ? FOR UPDATE",
      [train_id]
    );

    if (trains.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "Train not found" });
    }

    const train = trains[0];

    // Check seat availability
    if (train.available_seats < seats_to_book) {
      await connection.rollback();
      return res.status(400).json({ error: "Insufficient seats available" });
    }

    // Update available seats
    await connection.query(
      "UPDATE trains SET available_seats = available_seats - ? WHERE id = ?",
      [seats_to_book, train_id]
    );

    // Create booking
    const [bookingResult] = await connection.query(
      "INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)",
      [user_id, train_id, seats_to_book]
    );

    // Commit transaction
    await connection.commit();

    res.status(201).json({
      message: "Booking successful",
      bookingId: bookingResult.insertId,
    });
  } catch (error) {
    // Rollback in case of error
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
};

const getUserBookings = async (req, res) => {
  try {
    const [bookings] = await pool.query(
      `SELECT b.*, t.train_name, t.source, t.destination 
       FROM bookings b
       JOIN trains t ON b.train_id = t.id
       WHERE b.user_id = ?`,
      [req.user.id]
    );

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingDetails = async (req, res) => {
  try {
    const [bookings] = await pool.query(
      `SELECT b.*, t.train_name, t.source, t.destination 
       FROM bookings b
       JOIN trains t ON b.train_id = t.id
       WHERE b.id = ? AND b.user_id = ?`,
      [req.params.bookingId, req.user.id]
    );

    if (bookings.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json(bookings[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  bookSeat,
  getUserBookings,
  getBookingDetails,
};
