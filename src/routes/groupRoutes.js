

const express = require("express");
const { groupController } = require("../controller/groupController");
const router = express.Router();




router.post("/api/group/create",groupController.createGroups);
router.get("/api/group/getbyid/:groupid",groupController.fetchByid);
router.post("/api/group/update",groupController.editGroup);





module.exports = router;