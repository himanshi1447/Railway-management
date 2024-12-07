// src/components/TrainAvailability.js
import React, { useState } from "react";
import apiService from "../services/apiservice";
import { useAuth } from "../contexts/authContext";

const TrainAvailability = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.getTrainAvailability(
        source,
        destination
      );
      setTrains(response.data);
      setError("");
    } catch (err) {
      setError("No trains found");
      setTrains([]);
    }
  };

  const handleBookSeat = async (trainId) => {
    try {
      await apiService.bookSeat({ train_id: trainId, seats_to_book: 1 }, token);
      alert("Seat booked successfully!");
    } catch (err) {
      alert("Failed to book seat");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Train Availability</h2>
      <form onSubmit={handleSearch} className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search Trains
        </button>
      </form>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">{error}</div>
      )}

      <div className="grid gap-4">
        {trains.map((train) => (
          <div
            key={train.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{train.train_name}</h3>
              <p>
                {train.source} → {train.destination}
              </p>
              <p>Available Seats: {train.available_seats}</p>
            </div>
            <button
              onClick={() => handleBookSeat(train.id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Book Seat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainAvailability;
