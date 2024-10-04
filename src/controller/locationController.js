const Location = require("../models/Location");

// Get all locations
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createLocation = async (req, res) => {
  const { name, address, coordinates, value } = req.body; // Adjust based on your Location model fields

  // Validate request body
  if (!name || !address || !coordinates || !value) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newLocation = new Location({
    name,
    address,
    coordinates, // This should match the fields in your Location schema
    value, // Ensure the value is included
  });

  try {
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation); // Respond with the created location
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllLocations,
  createLocation,
};
