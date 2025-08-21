const express = require("express");
const router = express.Router();
const Resource = require("../models/WaterResource"); // Adjust path if needed
const { isAuthenticated, validateBody } = require("../middleware.js");
router.post('/:id/flag', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    await Resource.findByIdAndUpdate(id, { $inc: { flags: 1 } });
    res.json({ message: "Resource flagged for review." });
  } catch (err) {
    res.status(500).json({ error: "Failed to flag resource." });
  }
});

//DELETE ROUTE
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    if (resource.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await Resource.findByIdAndDelete(req.params.id); 
    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete resource" });
  }
});
//UPDATE ROUTE
router.put("/edit/:id", isAuthenticated, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    if (resource.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const { name, description,city, suitability,nature,type, geometry } = req.body;

    resource.name = name;
    resource.description = description;
    resource.city = city;
    resource.suitability = suitability;
    resource.nature=nature;
    resource.type=type;
    resource.geometry = geometry;

    await resource.save();

    res.json({ message: "Resource updated", resource });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update resource" });
  }
});



// GET /api/find/:id
router.get("/:id", async (req, res) => {
  try {
    //const resource = await Resource.findById(req.params.id);
    const resource = await Resource.findById(req.params.id).populate("addedBy");

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    res.json(resource);
  } catch (err) {
    console.error("Error fetching resource:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
