const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
} = require('../controller/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

// Protect all routes with auth middleware
router.use(auth);

router.get('/search', searchTasks);
router.get('/', getTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
