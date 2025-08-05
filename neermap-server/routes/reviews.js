const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const { reviewSchema } = require("../schemas.js");
const { isAuthenticated, validateBody } = require("../middleware.js");
const Resource = require("../models/WaterResource.js"); // or correct path



router.delete("/delete/:reviewId", isAuthenticated, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });
    if (!review.user.equals(req.user._id)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const resourceId = review.resource;
    await review.deleteOne();

    const reviews = await Review.find({ resource: resourceId });
    let avgRating = 0;
    if (reviews.length > 0) {
      avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    }

    await Resource.findByIdAndUpdate(resourceId, {
      averageRating: avgRating.toFixed(1),
    });

    res.json({ message: "Review deleted", resourceId }); // return resourceId if needed
  } catch (err) {
    console.error("Delete review error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add/:id", isAuthenticated, validateBody(reviewSchema), async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { id: resourceId } = req.params;
    const userId = req.user._id;

    // Create and save the new review
    const newReview = new Review({
      user: userId,
      resource: resourceId,
      rating,
      comment,
    });

    await newReview.save();

    // Fetch the resource to update its averageRating
    const Resource = require("../models/WaterResource.js");
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Fetch all reviews for this resource
    const allReviews = await Review.find({ resource: resourceId });

    // Calculate the new average rating
    const avgRating =
      allReviews.reduce((acc, curr) => acc + curr.rating, 0) / allReviews.length;

    resource.averageRating = avgRating.toFixed(1); // one decimal
    await resource.save();

    //  Send response once
    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ error: "Failed to add review" });
  }
});

// GET all reviews for a specific resource
router.get("/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ resource: req.params.id })
      .populate("user", "username");
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;
