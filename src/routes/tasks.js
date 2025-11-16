// src/routes/tasks.js
const express = require('express');
const router = express.Router();

// GET /tasks (list all 5 tasks)
router.get('/', (req, res) => {
    const tasks = req.app.locals.tasks;
    res.status(200).json({ success: true, data: tasks });
});

// GET /tasks/:id (get one task by ID)
router.get('/:id', (req, res) => {
    const tasks = req.app.locals.tasks;
    const taskId = parseInt(req.params.id);
    const found = tasks.find(t => t.id === taskId);
    if (found) {
        res.status(200).json(found);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// POST /tasks
router.post('/', (req, res) => {
    const { title, priority } = req.body;
    if (!title || typeof title !== 'string' || !priority) {
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
