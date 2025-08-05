const express = require("express");
const router = express.Router();
const WaterResource = require("../models/WaterResource");
const { isAuthenticated, validateBody } = require("../middleware.js");


router.post("/", isAuthenticated, async (req, res) => {
  try {
    const resource = new WaterResource({
      ...req.body,
      addedBy: req.user._id, // or req.user.id
    });
    await resource.save();
    res.status(201).json(resource);
  } catch (err) {
    console.error("Error saving resource:", err.message);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});


module.exports = router;
