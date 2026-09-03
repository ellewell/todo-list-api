const todoItemModel = require('../models/todoItemModel')

// Create a new item
const createTodoItem = async (req, res) => {
    try {
        if (req.body && !('title' in req.body)) {
            res.status(400).json({ 'error': 'Can not create a todo item with a title' })
        }
        const todoItem = await todoItemModel.create({ ...req.body })
        res.status(200).json(todoItem)
    } catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}

// Get all items
const getTodoItems = async (req, res) => {
    try {
        const filter = (req.body && ('filter' in req.body)) ? req.body.filter : {};
        const sort = (req.body && ('sort' in req.body)) ? req.body.sort : {};
        const todoItems = await todoItemModel.find(filter).sort(sort).select({ title: 1, dueDate: 1, isCompleted: 1 })
        res.status(200).json(todoItems)
    } catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}

module.exports = {
    createTodoItem,
    getTodoItems
}