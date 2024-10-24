const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  dueDate: Date,
  category: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
