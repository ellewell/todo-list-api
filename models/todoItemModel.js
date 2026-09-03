const mongoose = require('mongoose')

const todoItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

todoItemSchema.statics.isIdValid = function(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = mongoose.model('todoItem', todoItemSchema)