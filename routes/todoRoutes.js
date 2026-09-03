const express = require('express');
const todoController = require('../controllers/todoController')

const todoRoutes = express.Router()

todoRoutes.post('/', todoController.createTodoItem)                 // Create a new item
todoRoutes.get('/', todoController.getTodoItems)                    // Get all items
todoRoutes.get('/:id', todoController.getTodoItem)                  // Get a specific item
todoRoutes.put('/:id', todoController.updateTodoItem)               // Update a specific item
todoRoutes.patch('/:id', todoController.changeCompletionOfTodoItem) // Update completion status
todoRoutes.delete('/:id', todoController.deleteTodoItem)            // Delete a specific item

module.exports = todoRoutes