// routes/propertyRoutes.js
const express = require("express");
const {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controller/propertyController");
const router = express.Router();

// Route to create a new property
router.post("/", createProperty);

// Route to get all properties
router.get("/", getAllProperties);

// Route to get a property by ID
router.get("/:id", getPropertyById);

// Route to update a property by ID
router.put("/:id", updateProperty);

// Route to delete a property by ID
router.delete("/:id", deleteProperty);

module.exports = router;
