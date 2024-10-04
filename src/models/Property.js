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
    type: mongoose.Schema.Types.ObjectId, // Change to ObjectId
    ref: "Location", // Reference to Location model
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  bathroomCount: {
    type: Number,
    required: true,
  },
  guestCount: {
    type: Number,
    required: true,
  },
  locationValue: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", propertySchema);
