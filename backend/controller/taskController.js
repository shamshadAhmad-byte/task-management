const Task = require('../models/Task');


const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = { userId: req.user.userId };

    if (status && status !== 'All') {
      filter.status = status;
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Tasks retrieved successfully',
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get single task
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to access this task' });
    }

    res.status(200).json({
      message: 'Task retrieved successfully',
      task,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Create task
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide a task title' });
    }

    const task = await Task({
      title,
      description,
      dueDate,
      userId: req.user.userId,
    });
    await task.save();
    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.status(200).json({
      message: 'Task updated successfully',
      task,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if task belongs to user
    if (task.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Search tasks
const searchTasks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Please provide a search query' });
    }

    const tasks = await Task.find({
      userId: req.user.userId,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Tasks searched successfully',
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
};
