const express = require('express');
const app = express()
const todoItemModel = require('./models/todoItemModel')

app.use(express.json())

app.post('/', async (req, res) => {
    const { title } = req.body
    const todoItem = await todoItemModel.create({ title })
    res.status(200).json(todoItem)
})

app.get('/', async (req, res) => {
    const todoItems = await todoItemModel.find()
    res.status(200).json(todoItems)
})

module.exports = app