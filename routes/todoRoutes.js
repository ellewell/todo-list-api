const express = require('express');
const todoController = require('../controllers/todoController')

const todoRoutes = express.Router()

todoRoutes.post('/', todoController.createTodoItem) // Create a new item
todoRoutes.get('/', todoController.getTodoItems)    // Get all items

module.exports = todoRoutes