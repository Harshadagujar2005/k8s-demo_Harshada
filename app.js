const express = require("express");
const os = require("os");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Kubernetes! Pod: " + os.hostname());
});

app.get("/health", (req, res) => res.send("OK"));

app.listen(3000, () => console.log("Server running on port 3000"));
