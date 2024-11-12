import express from 'express';
import { body } from 'express-validator';
import Task from '../models/Task';
import auth from '../middleware/auth';
import { validate } from '../middleware/validation';

const router = express.Router();

// All routes should be protected
router.use(auth);

// Validation rules
const taskValidation = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('duration').isNumeric().withMessage('Duration must be a number'),
  body('description').optional().trim(),
  body('tags').optional().isArray(),
];

// Get all tasks
router.get('/', async (req: any, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get single task
router.get('/:id', async (req: any, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create new task
router.post('/', validate(taskValidation), async (req: any, res) => {
  try {
    const newTask = new Task({
      user: req.user.id,
      ...req.body
    });
    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Invalid task data' });
  }
});

// Update task
router.put('/:id', validate(taskValidation), async (req: any, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // Emit task update event
    req.io.to(`user:${req.user.id}`).emit('task:updated', task);

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete task
router.delete('/:id', async (req: any, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router; 