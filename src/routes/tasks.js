const express = require('express');
const router = express.Router();

// Helper to check valid ID (positive integer)
function isValidId(id) {
  return String(id).trim() !== '' && !isNaN(id) && Number.isInteger(Number(id)) && Number(id) > 0;
}

// GET /tasks - list all tasks
router.get('/', (req, res) => {
  const tasks = req.app.locals.tasks;
  res.status(200).json({ success: true, data: tasks });
});

// GET /tasks/:id - get one task by id, with error handling
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  const tasks = req.app.locals.tasks;
  const taskId = Number(id);
  const found = tasks.find(t => t.id === taskId);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// POST /tasks - create a new task
router.post('/', (req, res) => {
  const { title, priority } = req.body;

  // Validate title
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
  }

  // Validate priority
  const validPriorities = ['low', 'medium', 'high'];
  if (!priority || !validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be one of: low, medium, high' });
  }

  const tasks = req.app.locals.tasks;

  // Generate new ID (max ID + 1)
  const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;

  const newTask = {
    id: maxId + 1,
    title: title.trim(),
    completed: false,
    priority,
    createdAt: new Date()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
