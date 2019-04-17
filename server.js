const express = require("express");
const favicon = require("express-favicon");
const path = require("path");
const port = process.env.PORT
const app = express();
app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/ping", function(req, res) {
  return res.status(200).json({ ping: "pong" });
});
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port, () => console.log("🤘 server up 🤘"));
