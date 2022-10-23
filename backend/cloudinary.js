const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dkg7tct56",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = { cloudinary };
