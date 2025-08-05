const express = require("express");
const router = express.Router();
const WaterResource = require("../models/WaterResource");

// Advanced Search: Nearby with filters + rating
router.get("/nearby", async (req, res) => {
  try {
    const {
      latitude,
      longitude,
      radiusKm,
      suitability,
      nature,
      type,
      minRating
    } = req.query;

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const radiusInRadians = parseFloat(radiusKm) / 6378.1;

    const query = {
      geometry: {
        $geoWithin: {
          $centerSphere: [[lng, lat], radiusInRadians],
        },
      },
    };

    // Suitability - multiple values
    if (suitability) {
      const suitabilityArray = suitability.split(",");
      query.suitability = { $in: suitabilityArray };
    }

    // Nature - multiple values
    if (nature) {
      const natureArray = nature.split(",");
      query.nature = { $in: natureArray };
    }

    // Type - multiple values
    if (type && type.length > 0) {
      const typeArray = type.split(",");
      query.type = { $in: typeArray };
    }

    // Minimum average rating filter
 if (minRating) {
  const min = parseFloat(minRating);
  if (min > 0) {
    query.averageRating = { $gte: min };
  }
  // else do nothing — show all
}




    const resources = await WaterResource.find(query);
    res.json(resources);
  } catch (err) {
    console.error("Nearby search error:", err);
    res.status(500).json({ error: "Server error during search" });
  }
});

module.exports = router;
