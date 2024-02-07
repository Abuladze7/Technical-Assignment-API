const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("../util/db");
const blogRoutes = require("../router/blogRoutes");
const userRoutes = require("../router/userRoutes");
const categoryRoutes = require("../router/categoryRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/blogs/", blogRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/category/", categoryRoutes);

app.get("/", (req, res) => {
  res.send("App Works");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
