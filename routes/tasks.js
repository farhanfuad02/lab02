const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const tasks = req.app.locals.tasks;
    res.status(200).json({ success: true, data: tasks });
});

router.get('/', (req, res) => {
  const tasks = req.app.locals.tasks;
  res.status(200).json({ success: true, data: tasks });
});


router.post('/', (req, res) => {
    try {
        const { title } = req.body;
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            return res.status(400).json({ success: false, error: 'Title is required and must be a non-empty string' });
        }
        const newTask = { id: Date.now(), title: title.trim(), completed: false };
        const tasks = req.app.locals.tasks;
        tasks.push(newTask);
        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


module.exports = router;
