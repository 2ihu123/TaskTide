const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
router.post('/addtask', async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      priority: req.body.priority || 'Medium', // Default to 'Medium' if not provided
    });
    await task.save();
    res.status(201).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

  router.post('/gettask/upcoming', async (req, res) => {
    try {
      
      // Get the current date and set the time to 00:00:00 for comparison purposes
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Remove the time part (set to midnight)
      
      // Find tasks where the dueDate is greater than the current date and email matches
      const tasks = await Task.find({
        email: req.body.email,
        dueDate: { $gt: currentDate },
        completed: false, // Only tasks with dueDate greater than the current date
      });
      
      // Send the response with the filtered tasks
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  router.post('/gettask/overdue', async (req, res) => {
    try {
      
      // Get the current date and set the time to 00:00:00 for comparison purposes
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Remove the time part (set to midnight)
      
      // Find tasks where the dueDate is greater than the current date and email matches
      const tasks = await Task.find({
        email: req.body.email,
        dueDate: { $lt: currentDate },
        completed: false, // Only tasks with dueDate greater than the current date
      });
      
      // Send the response with the filtered tasks
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  router.post('/gettask/completed', async (req, res) => {
    try {
      const tasks = await Task.find({
        email: req.body.email,
        completed: true, 
      });
      
      // Send the response with the filtered tasks
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  router.post('/gettask', async (req, res) => {
    try {
      const tasks = await Task.find({
        email: req.body.email,
        completed: false,  
      });
      
      // Send the response with the filtered tasks
      res.status(200).json({ success: true, tasks });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  router.post('/updatetask', async (req, res) => {
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
        { new: true } // This returns the updated task
      );
  
      if (!updatedTask) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
  
      res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  router.post('/deletetask', async (req, res) => {
    try {
      const { taskId } = req.body;
  
      // Delete the task by its ID
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
  
      res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  
  // Update task status to 'completed'
router.post('/completetask', async (req, res) => {
  try {
    const { taskId } = req.body;

    // Find the task by its ID and update the completed status to true
    const task = await Task.findByIdAndUpdate(
      taskId,
      { completed: true ,completionDate: new Date()},  // Mark the task as completed
      { new: true }  // Return the updated task
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
router.post('/restoretask', async (req, res) => {
  try {
    const { taskId } = req.body;

    // Find the task by ID and update its completed status to false
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
