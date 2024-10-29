const { Announcement } = require("../model");
const { Model } = require("../model/announcement.model"); // Assuming the model is located in models directory

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const { announcementid, announcement_title, announcement_description, calltoaction } = req.body;
        const announcement = await Announcement.create({ announcementid, announcement_title, announcement_description, calltoaction });
        res.status(201).json({error:false, message: "Announcement created successfully", data: announcement });
    } catch (error) {
        res.status(500).json({ message: "Error creating announcement", data: error.message , error:true});
    }
};

// Get all announcements
exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.findAll();
        res.status(200).json({ error:false,message:"announcements acquired successfully", data: announcements });
    } catch (error) {
        res.status(500).json({ message: "Error fetching announcements", data: error.message , error:true});
    }
};

// Get a specific announcement by announcementid
exports.getAnnouncementById = async (req, res) => {
    try {
        const { announcementid } = req.params;
        const announcement = await Announcement.findOne({ where: { announcementid } });
        if (!announcement) {
            return res.status(404).json({ error:true, message: "Announcement not found" });
        }
        res.status(200).json({ error:false, data: announcement, message:"announcement found successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching announcement", data: error.message , error:true});
    }
};

// Update an announcement by announcementid
exports.updateAnnouncement = async (req, res) => {
    try {
        const { announcementid } = req.params;
        const updates = req.body;
        const announcement = await Announcement.findOne({ where: { announcementid } });

        if (!announcement) {
            return res.status(404).json({ error:true, message: "Announcement not found" });
        }

        await announcement.update(updates);
        res.status(200).json({error:false, message: "Announcement updated successfully", data: announcement });
    } catch (error) {
        res.status(500).json({ message: "Error updating announcement", data: error.message , error:true});
    }
};

// Delete an announcement by announcementid
exports.deleteAnnouncement = async (req, res) => {
    try {
        const { announcementid } = req.params;
        const announcement = await Announcement.findOne({ where: { announcementid } });

        if (!announcement) {
            return res.status(404).json({ error:true,message: "Announcement not found" });
        }

        await announcement.destroy();
        res.status(200).json({error:false, message: "Announcement deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting announcement", data: error.message , error:true});
    }
};
