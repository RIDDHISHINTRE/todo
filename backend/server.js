const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema (NO separate model file)
const Task = mongoose.model("Task", {
  title: String,
  completed: { type: Boolean, default: false }
});

// CREATE
app.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// READ
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
