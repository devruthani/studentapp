
const express = require("express");
const { courseController } = require("../controller/courseController");
const router = express.Router();




router.post("/api/course/create",courseController.createCourse);
router.get("/api/course/getbyid/:courseid",courseController.fetchByid);
router.post("/api/course/update",courseController.editCourse);





module.exports = router;