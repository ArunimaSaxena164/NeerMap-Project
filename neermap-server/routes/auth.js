const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const { registerSchema, loginSchema } = require("../schemas.js");
const { isAuthenticated,validateBody } = require("../middleware.js");
const router = express.Router();

router.post("/register", validateBody(registerSchema), async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // 1. Check if email exists (since Passport doesn't do this by default)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "This Email is already Registered" });
    }

    // 2. Let Passport handle username uniqueness & registration
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    // 3. Log in the user after successful registration
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log in after registration." });
      }
      return res.status(201).json({
        message: "Successfully registered and logged in!",
        user: registeredUser,
      });
    });

  } catch (err) {
    // Handle Passport's username duplicate error (and other possible errors)
    if (err.name === "UserExistsError" || err.code === 11000) {
      return res.status(400).json({ error: "Username is already taken." });
    }
    // Generic error (e.g., password validation, DB issues)
    res.status(400).json({ error: "Registration failed. Please try again." });
  }
});

router.post("/login", validateBody(loginSchema), async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const { user, error } = await new Promise((resolve) => {
      User.authenticate()(username, password, (err, user, info) => {
        if (err) return resolve({ error: err });
        if (!user) return resolve({ error: info });
        resolve({ user });
      });
    });

    if (error) {
      // Customize error messages
      if (error.name === "IncorrectUsernameError") {
        return res.status(401).json({ message: "This user does not exist" });
      } else if (error.name === "IncorrectPasswordError") {
        return res.status(401).json({ message: "Password is Incorrect" });
      }
      return res.status(401).json({ message: error.message || "Invalid Credentials" });
    }

    // If authenticated, log in user manually
    req.login(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: "Logged in successfully", user });
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid"); // optional for cookie cleanup
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/check", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(200).json({ user: null });
  }
});

module.exports = router;
