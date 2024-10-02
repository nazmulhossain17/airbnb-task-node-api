const Property = require("../models/Property");

// Create a new property
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      images,
      category, // New field
      roomCount, // New field
      bathroomCount, // New field
      guestCount, // New field
      locationValue, // New field
    } = req.body;

    // Check if all required fields are provided
    if (
      !title ||
      !description ||
      !price ||
      !location ||
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

    const newProperty = new Property({
      title,
      description,
      price,
      location,
      images,
      category, // New field
      roomCount, // New field
      bathroomCount, // New field
      guestCount, // New field
      locationValue, // New field
    });

    await newProperty.save();

    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
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
  } = req.body;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { title, description, price, location, images, cleaningFee, serviceFee },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(updatedProperty);
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
