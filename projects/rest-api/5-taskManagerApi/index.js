import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

// middleware
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}!`);
});
