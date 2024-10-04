const Location = require("../models/Location");
const Property = require("../models/Property");

// Create a new property
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      locationId, // New field for location ID
      images,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue,
    } = req.body;

    // Check if all required fields are provided
    if (
      !title ||
      !description ||
      !price ||
      !locationId || // Updated to locationId
      !images ||
      images.length === 0 ||
      !category ||
      !roomCount ||
      !bathroomCount ||
      !guestCount ||
      !locationValue
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if location exists
    const location = await Location.findById(locationId);
    if (!location) {
      return res.status(400).json({ message: "Location not found" });
    }

    const newProperty = new Property({
      title,
      description,
      price,
      location: locationId, // Save location ID
      images,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue,
    });

    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all properties
// Get all properties with optional category filter
const getAllProperties = async (req, res) => {
  const { category, locationValue } = req.query; // Get category and locationValue from the query string

  try {
    // Build the filter query based on provided filters
    const filter = {};

    if (category) {
      filter.category = category; // Filter by category if provided
    }

    // Check if locationValue is valid
    if (locationValue) {
      const location = await Location.findOne({ value: locationValue }); // Find location by value
      if (location) {
        filter.location = location._id; // Use the location ObjectId for filtering properties
      } else {
        return res.status(400).json({ message: "Invalid location" });
      }
    }

    const properties = await Property.find(filter).populate("location"); // Populate location details if needed

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single property by ID
const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a property by ID
const updateProperty = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    location,
    images,
    cleaningFee,
    serviceFee,
    category, // Add these fields
    roomCount,
    bathroomCount,
    guestCount,
    locationValue, // If you want to update locationValue too
  } = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
        location,
        images,
        cleaningFee,
        serviceFee,
        category, // Include these in the update
        roomCount,
        bathroomCount,
        guestCount,
        locationValue,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a property by ID
const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProperty = await Property.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
};
