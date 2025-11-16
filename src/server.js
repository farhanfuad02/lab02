const express = require('express');
const taskRouter = require('./routes/tasks.js');
const app = express();

// Parse JSON bodies
app.use(express.json());

// In-memory data
const tasks = [
  { id: 1, title: 'Sample Task 1', completed: false, priority: 'high', createdAt: new Date('2025-11-16T09:00:00+06:00') },
  { id: 2, title: 'Sample Task 2', completed: true, priority: 'medium', createdAt: new Date('2025-11-15T14:00:00+06:00') },
  { id: 3, title: 'Sample Task 3', completed: false, priority: 'low', createdAt: new Date('2025-11-14T10:00:00+06:00') },
  { id: 4, title: 'Sample Task 4', completed: true, priority: 'medium', createdAt: new Date('2025-11-13T17:00:00+06:00') },
  { id: 5, title: 'Sample Task 5', completed: false, priority: 'high', createdAt: new Date('2025-11-12T13:00:00+06:00') }
];
app.locals.tasks = tasks;

// Mount router at /tasks
app.use('/tasks', taskRouter);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

// Root welcome
app.get('/', (req, res) => {
  res.send('Welcome to your Task Manager API!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
