const express = require('express');
const ToDoList = require('../models/toDoList');
const mongoose = require('mongoose');

const listRouter = express.Router();

listRouter.post('', (req, res, next) => {

    req.body.content.forEach(item => {
      if( item._id === null ) {
        item._id = mongoose.Types.ObjectId();
      }
    });
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
  
  listRouter.get('',(req, res, next) => {
  
      ToDoList.find().sort({'lastupd':-1})
      .then(documents => {
        res.json(documents);
      });
  
});
  
listRouter.delete('/:id',(req, res, next) => {
  
    ToDoList.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({message: 'List Deleted'});
    });
  
});
  

module.exports = listRouter;