const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
// const authMiddleware = require('../middleware/auth');
// authMiddleware

// CREATE Task
router.post('/', async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = new Task({
      title,
      description,
      dueDate,
      status,
      userId: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// GET All Tasks for User
// authMiddleware
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// UPDATE Task
// authMiddleware
router.put('/:id', async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
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
// authMiddleware
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
