
const express=require("express");
const Report=require("../models/Report.js");
const router = express.Router();

// POST /api/report
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const report = new Report({ name, email, message });
    await report.save();
    res.status(201).json({ message: "Report submitted successfully." });
  } catch (error) {
    console.error("Report submission failed:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

module.exports = router;
