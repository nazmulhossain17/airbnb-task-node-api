// controllers/reservationController.js
const Reservation = require("../models/Reservation");
const Property = require("../models/Property");

// Create a new reservation
const createReservation = async (req, res) => {
  const { propertyId, checkInDate, checkOutDate, guestCount } = req.body;

  if (!propertyId || !checkInDate || !checkOutDate || !guestCount) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if the property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const reservation = new Reservation({
      property: propertyId,
      checkInDate,
      checkOutDate,
      guestCount,
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reservations
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("property");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id).populate("property");
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a reservation by ID
const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { checkInDate, checkOutDate, guestCount } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { checkInDate, checkOutDate, guestCount },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a reservation by ID
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
