const express = require("express");
const app = express();
const dbconfig = require("./config/db");
const cors = require("cors");
const Auth = require("./controllers/Auth");
const Song = require("./controllers/Song");
const Admin = require("./controllers/Admin");
require("dotenv").config();
const port = 3000;

app.use(cors());

app.use(express.json());

// router

app.use("/api/auth", Auth);
app.use("/api/songs", Song);
app.use("/api/admin", Admin);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
