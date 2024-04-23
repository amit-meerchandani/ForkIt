const app = require("./app");
const { server } = require("./utility/socket");
const connectDB = require("./config/database");
const cloudinary = require("cloudinary");
// CONNECTION TO DATABASE

connectDB();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// START SERVER
// const PORT = process.env.PORT || 8000;
const PORT = 5000 || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
