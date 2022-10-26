const express = require('express')
const router = express.Router()
const todoController = require('../../../controllers/todoController')

router.get('/', todoController.getAll)
router.delete('/delete', todoController.removeTodo)
router.post('/add', todoController.newTodo)

module.exports = router