const express = require("express");
const { courseContentController } = require("../controller/courseContentController");

const router = express.Router();



router.post("/api/content/addcontent",courseContentController.createCourseContent);

router.get("/api/content/getall",courseContentController.fetchCourseContent);
router.get("/api/content/getbyid/:contentid",courseContentController.fetchContentByid);
router.get("/api/content/getbycourseid/:courseid",courseContentController.fetchBycourseid);
router.post("/api/content/edit/:contentid",courseContentController.editCourseContent);
router.post("/api/content/delete/:contentid",courseContentController.deleteContent);


module.exports = router;