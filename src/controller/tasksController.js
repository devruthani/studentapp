const { Tasks } = require("../model");
const { Model } = require("../model/tasks.model"); // Assuming the model is in the models directory

// Instantiating the model for use

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { taskid, courseid, taskname, description, instructions, week, status } = req.body;
        const task = await Tasks.create({ taskid, courseid, taskname, description, instructions, week, status });
        res.status(201).json({ error:false, message: "Task created successfully", data: task });
    } catch (error) {
        res.status(500).json({ message: "Error creating task",data: error.message, error:true });
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Tasks.findAll();
        res.status(200).json({ error:false, data: tasks , message: "Task list acquired successfully"});
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks",data: error.message, error:true });
    }
};

// Get a specific task by taskid
exports.getTaskById = async (req, res) => {
    try {
        const { taskid } = req.params;
        const task = await Tasks.findOne({ where: { taskid } });
        if (!task) {
            return res.status(404).json({error:true, message: "Task not found" });
        }
        res.status(200).json({ error:false, message:"Task found successfully",data: task });
    } catch (error) {
        res.status(500).json({ message: "Error fetching task",data: error.message, error:true });
    }
};

// Update a task by taskid
exports.updateTask = async (req, res) => {
    try {
        const { taskid } = req.params;
        const updates = req.body;
        const task = await Tasks.findOne({ where: { taskid } });

        if (!task) {
            return res.status(404).json({error:true,  message: "Task not found" });
        }

        await task.update(updates);
        res.status(200).json({ error:false,message: "Task updated successfully", data: task });
    } catch (error) {
        res.status(500).json({error:true, message: "Error updating task",data: error.message });
    }
};

// Delete a task by taskid
exports.deleteTask = async (req, res) => {
    try {
        const { taskid } = req.params;
        const task = await Tasks.findOne({ where: { taskid } });

        if (!task) {
            return res.status(404).json({ error:true,message: "Task not found" });
        }

        await task.destroy();
        res.status(200).json({ error:false,message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({error:true, message: "Error deleting task",data: error.message });
    }
};
