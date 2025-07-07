// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes/IndexRoutes");
require("./models");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/", routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;