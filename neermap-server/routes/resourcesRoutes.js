const express = require("express");
const router = express.Router();
const WaterResource = require("../models/WaterResource");

// GET all water resources
router.get("/", async (req, res) => {
  try {
    const resources = await WaterResource.find();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
