const express = require("express");
const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ msg: "Minimal Express works!" });
});

module.exports = app;