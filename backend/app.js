const express = require("express");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const path = require("path");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const messageRouter = require("./routes/messageRouter");
const cors = require("cors");

const { app, server } = require("./utility/socket");

app.use(cors());

// Define the rate limit options
const limiter = rateLimit({
  windowMs: 7 * 24 * 60 * 60 * 1000, // 15 minutes - The duration of the window in milliseconds
  max: 100000, // Max number of requests allowed within the window
  message: "Too many requests from this IP, please try again later.", // Error message sent when limit is exceeded
});

// // Apply the rate limiter to all requests
app.use(limiter);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Using Router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/messages", messageRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
