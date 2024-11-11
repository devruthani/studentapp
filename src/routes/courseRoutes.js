
const express = require("express");
const { courseController } = require("../controller/courseController");
const router = express.Router();




router.post("/api/course/create",courseController.createCourse);
router.get("/api/course/getbyid/:courseid",courseController.fetchByid);
// router.get("/api/course/getcourse/:courseid",courseController.getByid);
router.get("/api/course/getall/:offset/:limit",courseController.fetchCourses);
router.put("/api/course/update/:courseid",courseController.editCourse);
router.post("/api/course/delete/:courseid",courseController.delete);





module.exports = router;