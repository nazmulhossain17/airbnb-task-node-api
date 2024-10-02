// routes/reservationRoutes.js
const express = require("express");
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
} = require("../controller/reservationController");
const router = express.Router();

// Route to create a new reservation
router.post("/", createReservation);

// Route to get all reservations
router.get("/", getAllReservations);

// Route to get a reservation by ID
router.get("/:id", getReservationById);

// Route to update a reservation by ID
router.put("/:id", updateReservation);

// Route to delete a reservation by ID
router.delete("/:id", deleteReservation);

module.exports = router;
