const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();
const song = require("../models/Song");
const User = require("../models/users");

router.post("/get-songs", authMiddleware, async (req, res) => {
  try {
    const songs = await song.find();
    res.send(songs);
  } catch (error) {
    res.status(500).json(error);
  }
});

// in this post , ı want to push new song to user play list array pls do that for me

router.post("/create-playlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const extingPlaylists = user.playList;
    extingPlaylists.push({
      name: req.body.name,
      songs: req.body.songs,
    });
    await User.findByIdAndUpdate(
      req.body.userId,
      {
        playList: extingPlaylists,
      },
      { new: true }
    );
    res.status(200).json("playlist created");
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
