const mongoose = require('mongoose');

const listContent = mongoose.Schema({
    text: String,
    done: Boolean
});

const ToDoList = mongoose.Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: [listContent], required: true},
    lastupd: { type: Date }
});

module.exports = mongoose.model('ToDoList', ToDoList);
