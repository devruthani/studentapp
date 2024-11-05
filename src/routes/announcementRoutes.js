const express = require("express");
const router = express.Router();
const announcementController = require("../controller/announcementController");

router.post("/api/announcements/create", announcementController.createAnnouncement);
router.get("/api/announcements/getall", announcementController.getAnnouncements);
router.get("/api/announcements/getbyid/:announcementid", announcementController.getAnnouncementById);
router.put("/api/announcements/:announcementid", announcementController.updateAnnouncement);
router.delete("/api/announcements/:announcementid", announcementController.deleteAnnouncement);

module.exports = router;
