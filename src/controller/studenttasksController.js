const { Studenttasks } = require("../model");
const { Model } = require("../model/studenttasks.model"); // Assuming the model is located in models directory
/* -------------------------------------------------------------------------- */
/*                         CRUD ITEMS ON STUDENT TASKS                        */
/* -------------------------------------------------------------------------- */
// Create a new student task
exports.createStudentTask = async (req, res) => {
    try {
        const { studenttaskid, courseid, taskid, status } = req.body;
        const studentTask = await Studenttasks.create({ studenttaskid, courseid, taskid, status });
        res.status(201).json({ error:false, message: "Student Task created successfully", data: studentTask });
    } catch (error) {
        res.status(500).json({ message: "Error creating Student Task", error: true, data:error.message });
    }
};

// Get all student tasks
exports.getStudentTasks = async (req, res) => {
    try {
        const studentTasks = await Studenttasks.findAll();
        res.status(200).json({ error:false,data: studentTasks });
    } catch (error) {
        res.status(500).json({ error:true, message: "Error fetching Student Tasks", data: error.message });
    }
};

// Get a specific student task by studenttaskid
exports.getStudentTaskById = async (req, res) => {
    try {
        const { studenttaskid } = req.params;
        const studentTask = await Studenttasks.findOne({ where: { studenttaskid } });
        if (!studentTask) {
            return res.status(404).json({ message: "Student Task not found" });
        }
        res.status(200).json({error:false, data: studentTask });
    } catch (error) {
        res.status(500).json({error:true, message: "Error fetching Student Task", data: error.message });
    }
};

// Update a student task by studenttaskid
exports.updateStudentTask = async (req, res) => {
    try {
        const { studenttaskid } = req.params;
        const updates = req.body;
        const studentTask = await Studenttasks.findOne({ where: { studenttaskid } });

        if (!studentTask) {
            return res.status(404).json({error:true, message: "Student Task not found" });
        }

        await studentTask.update(updates);
        res.status(200).json({error:false, message: "Student Task updated successfully", data: studentTask });
    } catch (error) {
        res.status(500).json({error:true, message: "Error updating Student Task", error: error.message });
    }
};

// Delete a student task by studenttaskid
exports.deleteStudentTask = async (req, res) => {
    try {
        const { studenttaskid } = req.params;
        const studentTask = await Studenttasks.findOne({ where: { studenttaskid } });

        if (!studentTask) {
            return res.status(404).json({error:true, message: "Student Task not found" });
        }

        await studentTask.destroy();
        res.status(200).json({error:false, message: "Student Task deleted successfully" });
    } catch (error) {
        res.status(500).json({error:true, message: "Error deleting Student Task", data: error.message });
    }
};
