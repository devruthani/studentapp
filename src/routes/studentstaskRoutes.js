const express = require("express");
const router = express.Router();
const studenttasksController = require("../controller/studenttasksController");

router.post("/api/studenttasks", studenttasksController.createStudentTask);
router.get("/api/studenttasks", studenttasksController.getStudentTasks);
router.get("/api/studenttasks/:studenttaskid", studenttasksController.getStudentTaskById);
router.put("/api/studenttasks/:studenttaskid", studenttasksController.updateStudentTask);
router.delete("/api/studenttasks/:studenttaskid", studenttasksController.deleteStudentTask);

module.exports = router;
