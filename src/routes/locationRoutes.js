const express = require("express");
const {
  getAllLocations,
  createLocation,
} = require("../controller/locationController");
const router = express.Router();

// Get all locations
router.get("/", getAllLocations);
router.post("/", createLocation);

module.exports = router;
