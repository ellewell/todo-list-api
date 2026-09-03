const todoItemModel = require('../models/todoItemModel')

// Create a new item
const createTodoItem = async (req, res) => {
    if(req.body && !('title' in req.body)) {
        res.status(400).json({"error": "Can not create a todo item with a title"})
    }
    const todoItem = await todoItemModel.create({ ...req.body })
    res.status(200).json(todoItem)
}

// Get all items
const getTodoItems = async (req, res) => {
    const todoItems = await todoItemModel.find()
    res.status(200).json(todoItems)
}

module.exports = {
    createTodoItem,
    getTodoItems
}