require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const User = require("./models/User");
const resourceRoutes = require("./routes/resourcesRoutes.js");
const authRoutes = require("./routes/auth");
const waterResourceRoutes = require("./routes/waterResources.js");
const searchResourcesRoute=require("./routes/searchResources.js");
const findResourceRoute=require("./routes/findResourceRoute.js");
const reviewRoutes = require("./routes/reviews.js");
const reportRoute=require("./routes/report.js");
const app = express();
const PORT = process.env.PORT||3000;
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error in connecting to db", err));

// Middleware
app.use(
  cors({
    origin: "https://neer-map-project.vercel.app", // Only allow your frontend
    credentials: true, // Enable sending/receiving cookies (sessions)
  })
);

app.use(express.json());

// Express-session with MongoDB store
app.use(
  session({
    secret: process.env.SECRET, // use .env in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // same as your DB
      collectionName: "sessions", // optional
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite:"none",
      secure:true
    },
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/report",reportRoute);
app.use("/api/resources", resourceRoutes);
app.use("/api/saveres", waterResourceRoutes);
app.use("/api/searchres",searchResourcesRoute);
app.use("/api/find",findResourceRoute);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("hello123");
  console.log("neermap working");
});

// Server

app.listen(PORT, () => {
  console.log("server is listening to port", PORT);

});
