const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  shareTask,
} = require("../controllers/taskController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.post("/share", authMiddleware, shareTask);

module.exports = router;
