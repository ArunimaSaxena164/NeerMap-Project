const mongoose = require("mongoose");

const waterResourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required:true,
  },
  type: {
    type: String, // e.g., "Dam", "Lake"
  },
  nature: {
    type: String, // "Natural" or "Man-made"
  },
  suitability: {
    type: String, // e.g., "Drinking", "Irrigation", etc.
  },
  description: {
    type: String,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
    addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  averageRating:{
    type:Number,
    default:0,
  },
  flags: { type: Number, default: 0 }


}, { timestamps: true });
waterResourceSchema.index({ geometry: "2dsphere" });
module.exports = mongoose.model("WaterResource", waterResourceSchema);
