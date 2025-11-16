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
  if (!title || typeof title !== 'string' || title.trim().length === 0 || !priority) {
    return res.status(400).json({ error: 'Title and priority required' });
  }
  const tasks = req.app.locals.tasks;
  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false,
    priority,
    createdAt: new Date()
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
