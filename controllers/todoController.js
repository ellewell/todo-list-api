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

// Get a specific item
const getTodoItem = async (req, res) => {
    try {
        const { id } = req.params
        if (!todoItemModel.isIdValid(id)) {
            return res.status(400).json({ 'error': `Item ${id} not found` })
        }

        const todoItem = await todoItemModel.findById(id)
        if (!todoItem) {
            return res.status(400).json({ 'error': `Item ${id} not found` })
        }

        res.status(200).json(todoItem)
    } catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}

// Update a specific item
const updateTodoItem = async (req, res) => {
    try {
        const { id } = req.params
        if (!todoItemModel.isIdValid(id)) {
            return res.status(400).json({ 'error': `Item ${id} not found` })
        }

        const todoItem = await todoItemModel.findOneAndUpdate({ _id: id }, {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate
        })
        if (!todoItem) {
            return res.status(400).json({ 'error': `Item ${id} not found` })
        }

        res.status(200).json(todoItem)
    } catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}

// Update completion status
const changeCompletionOfTodoItem = async (req, res) => {
    try {
        const { id } = req.params
        if (!todoItemModel.isIdValid(id)) {
            return res.status(400).json({ 'error': `Item ${id} not found` })
        }

        const todoItem = await todoItemModel.findOneAndUpdate({ _id: id }, {
            isCompleted: req.body.isCompleted
        })
        if (!todoItem) {
            return res.status(400).json({ 'error': `Item ${id} not found` })
        }

        res.status(200).json(todoItem)
    } catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}

// Delete a specific item
const deleteTodoItem = async (req, res) => {
    try {
        const { id } = req.params
        if (!todoItemModel.isIdValid(id)) {
            return res.status(400).json({ 'error': `Item ${id} not found` })
        }

        const todoItem = await todoItemModel.findOneAndDelete({ _id: id })
        if (!todoItem) {
            return res.status(400).json({ 'error': `Item ${id} not found` })
        }

        res.status(200).json(todoItem)
    } catch (error) {
        res.status(400).json({ 'error': error.message })
    }
}

module.exports = {
    createTodoItem,
    getTodoItems,
    getTodoItem,
    updateTodoItem,
    changeCompletionOfTodoItem,
    deleteTodoItem
}