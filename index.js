const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const Product = require("./module/productModule.js"); 
const productRoutes = require ("./routes/productRoutes.js")
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config()

app.use(express.json());
app.use(cors());

// routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

app.listen(8000, () => {
  console.log("server is running on port 8000");
});







app.get("/", (req, res) => {
  res.send("mr mike project");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(() => {
    console.log("Connection failed");
  });
