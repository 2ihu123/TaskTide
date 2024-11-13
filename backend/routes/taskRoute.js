const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticate = require('../middleware/authmiddleware'); 

router.post('/addtask', authenticate, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      priority: req.body.priority || 'Medium', 
      email: req.user.email, 
    });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/gettask/upcoming', authenticate, async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    
    const tasks = await Task.find({
      email: req.user.email, 
      dueDate: { $gt: currentDate },
      completed: false,
    });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/gettask/overdue', authenticate, async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 
    
    const tasks = await Task.find({
      email: req.user.email, 
      dueDate: { $lt: currentDate },
      completed: false,
    });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
router.post('/gettask/completed', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({
      email: req.body.email,
      completed: true, 
    });
    
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/gettask', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({
      email: req.user.email, 
      completed: false,
    });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/updatetask', authenticate, async (req, res) => {
  try {
    const { _id, title, description, dueDate, priority } = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        dueDate: new Date(dueDate),
        priority,
      },
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/deletetask', authenticate, async (req, res) => {
  try {
    const { taskId } = req.body;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/completetask', authenticate, async (req, res) => {
  try {
    const { taskId } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { completed: true, completionDate: new Date() },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/restoretask', authenticate, async (req, res) => {
  try {
    const { taskId } = req.body;

    const restoredTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: false },
      { new: true }
    );

    if (!restoredTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task restored successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
