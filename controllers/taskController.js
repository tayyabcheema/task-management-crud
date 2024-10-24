const Task = require("../models/Task");

// Creating a new Task

const createTask = async (req, res) => {
  const { title, description, status, dueDate, category } = req.body;
  try {
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      category,
      owner: req.user.userId,
    });
    await task.save();
    res.status(201).json({ data: task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetching all tasks data

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [{ owner: req.user.userId }, { sharedWith: req.user.userId }],
    });
    res.json({ data: tasks });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

// Controller function for updating the task

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    //    console.log(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Checking if the owner is requesting to update the data beacuse only the owner can perform this operation
    if (task.owner.toString() !== req.user.userId) {
      return res.status(403).json({
        error: "You do not have permission to perform this operation",
      });
    }
    // If above user is the owner then merge the new data in the existing data
    Object.assign(task, req.body);
    await task.save();
    res.json({ data: task });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

// Controller function for deleting the task

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Checking if the owner is requesting to delete the task
    if (task.owner.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this task" });
    }

    // If above user is owner then delete the task
    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", Message: error.message });
  }
};

const shareTask = async (req, res) => {
  const { taskId, userId } = req.body;
  try {
    const task = await Task.findById(taskId);
    // Cheecking if the user sharing task is the owner or task exists
    if (!task || task.owner.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to share this task" });
    }
    task.sharedWith.push(userId);
    await task.save();
    res.json({ message: "Task shared successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, shareTask };
