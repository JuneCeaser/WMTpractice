const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/items", require("./routes/items"));
app.get("/", (req, res) => res.send("Item Manager API running"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err.message));

const PORT = 5000; // TODO: should use the hosting platform's port
app.listen(PORT, () => console.log("Server on " + PORT));
