const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// CREATE Task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, dueDate, status, userEmail } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      status,
      // userId: req.user.id,
      userEmail
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// GET All Tasks for User
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userEmail: req.user.email });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// UPDATE Task
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userEmail: req.user.email },
      { title, description, dueDate, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE Task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, userEmail: req.user.email });
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
