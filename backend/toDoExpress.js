const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ToDoList = require('./models/toDoList');

const toDoExpApp = express();


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://invo:mongopass2@cluster0-zkcca.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Database Connected');
  })
  .catch(() => {
    console.log('Database connect failed');
  });

toDoExpApp.use(bodyParser.json());
toDoExpApp.use(bodyParser.urlencoded({extended: false}));

toDoExpApp.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

toDoExpApp.post("/api/lists", (req, res, next) => {
  const list = new ToDoList({
    title : req.body.title,
    user : req.body.user,
    content : req.body.content,
    lastupd: req.body.lastupd
  });
  list.save();
  res.status(201).json({
    message: "List added successfully"
  });
});

toDoExpApp.get('/api/lists',(req, res, next) => {
    ToDoList.find()
    .then(documents => {
      res.json(documents);
    });
});

toDoExpApp.delete('/api/lists/:id',(req, res, next) => {
  ToDoList.deleteOne({_id: req.params.id})
  .then(result => {
    res.status(200).json({message: 'List Deleted'});
  });
});

module.exports = toDoExpApp;