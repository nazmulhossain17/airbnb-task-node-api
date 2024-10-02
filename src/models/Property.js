// models/Property.js
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  category: {
    type: String, // New field for property category
    required: true,
  },
  roomCount: {
    type: Number, // New field for the number of rooms
    required: true,
  },
  bathroomCount: {
    type: Number, // New field for the number of bathrooms
    required: true,
  },
  guestCount: {
    type: Number, // New field for the maximum guest count
    required: true,
  },
  locationValue: {
    type: String, // New field for location value
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", propertySchema);
