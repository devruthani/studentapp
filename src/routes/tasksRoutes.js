const express = require("express");
const router = express.Router();
const tasksController = require("../controller/tasksController");

router.post("/api/tasks", tasksController.createTask);
router.get("/api/tasks", tasksController.getTasks);
router.get("/api/tasks/:taskid", tasksController.getTaskById);
router.put("/api/tasks/:taskid", tasksController.updateTask);
router.delete("/api/tasks/:taskid", tasksController.deleteTask);

module.exports = router;
