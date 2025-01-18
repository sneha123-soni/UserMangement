const taskController = require('../controller/taskController');
const auth = require('../auth/auth');
const express = require('express');
const router = express.Router();

router.post('/tasks', auth.authenticateToken, taskController.createTask);
router.put('/tasks/:id', auth.authenticateToken, taskController.updateTask);
router.delete('/tasks/:id', auth.authenticateToken, taskController.deleteTask);
router.get('/tasks', auth.authenticateToken, taskController.getTasks);
router.get('/:id',auth.authenticateToken, taskController.getTaskById);


module.exports = router;
