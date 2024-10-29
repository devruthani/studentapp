
const express = require("express");
const { courseRegisterController } = require("../controller/courseRegisterController");
const router = express.Router();

// Auth routes 

router.post("/api/coursereg/create",courseRegisterController.createCourseReg);
router.get("/api/coursereg/getall",courseRegisterController.getCourseReg);
router.get("/api/coursereg/getbyid/:courseregid",courseRegisterController.getByid);
router.post("/api/coursereg/delete/:courseregid",courseRegisterController.delete);


module.exports = router;