const users = require("../models/users");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// to register the music app and hash the password with bcrypt

router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    req.body.password = hashedPassword;
    const existingUser = await users.findOne({ email: req.body.email });
    const user = new users(req.body);

    if (existingUser) {
      res.status(400).send("User already exists");
    } else {
      await user.save();
      res.status(200).send("User created");
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await users.findOne({ email: req.body.email });
    !user && res.status(404).send("User not found");

    const passwordMatched = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordMatched) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ token, userId: user._id, username: user.username });
    }
  } catch (err) {
    console.log(err);
  }
});

// to get the information of the user who is logged in
router.post("/get-data", authMiddleware, async (req, res) => {
  try {
    const user = await users.findById(req.body.userId);
    user.password = undefined;
    return res.status(200).send({
      message: "User data",
      data: user,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
