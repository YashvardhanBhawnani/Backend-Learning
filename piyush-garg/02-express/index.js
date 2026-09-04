const express = require("express");
const http = require("http");
const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from Home Page this is yash");
});

app.get("/about", (req, res) => {
  return res.send(`Hello ${req.query.name}`);
});

app.listen(8000, () => console.log("Server Created Successfully!✅"));

// const server = http.createServer(app);
// server.listen(8000, () => console.log("Server Created Successfully!✅"));
