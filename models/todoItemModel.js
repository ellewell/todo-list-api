const mongoose = require('mongoose')

const todoItemSchema = new mongoose.Schema({
    title: String
})

module.exports = mongoose.model('todoItem', todoItemSchema)