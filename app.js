const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// In-memory task storage
let tasks = [];
let nextId = 1;

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task cannot be empty' });
  }
  const newTask = { id: nextId++, text: task.trim() };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE a task by id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Student Task Manager running at http://localhost:${PORT}`);
});
