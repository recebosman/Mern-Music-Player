const router = require("express").Router();
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const { cloudinary } = require("cloudinary");
const Song = require("../models/Song");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/add-song",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      cloudinary.v2.uploader.upload(
        req.file.path,
        {
          folder: "music player",
          use_filename: true,
          unique_filename: false,
          resource_type: "raw",
        },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error });
          }
          const song = new Song({
            title: req.body.title,
            artist: req.body.artist,
            src: result.url,
            album: req.body.album,
            duration: req.body.duration,
            year: req.body.year,
          });
          await song.save();
          res.status(200).send({
            message: "Song added successfully",
            data: result,
          });
        }
      );
    } catch (error) {
      res.send({
        message: "Error occured",
        data: error,
        success: false,
      });
    }
  }
);

module.exports = router;
