
const express = require("express");
const { courseController } = require("../controller/courseController");
const router = express.Router();




router.post("/api/course/create",courseController.createCourse);
router.get("/api/course/getbyid/:courseid",courseController.fetchByid);
router.get("/api/course/getall",courseController.fetchCourses);
router.post("/api/course/update",courseController.editCourse);
router.post("/api/course/delete/:courseid",courseController.delete);





module.exports = router;