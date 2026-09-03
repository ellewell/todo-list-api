const todoItemModel = require('../models/todoItemModel')

// Create a new item
const createTodoItem = async (req, res) => {
    const { title } = req.body
    const todoItem = await todoItemModel.create({ title })
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