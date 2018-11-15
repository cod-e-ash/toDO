const express = require('express');
const ToDoList = require('../models/toDoList');
const mongoose = require('mongoose');

const itemRouter = express.Router();

itemRouter.post('/:id',(req, res, next) => {
  
    const newItem = {
      _id: mongoose.Types.ObjectId(),
      text: req.body.text,
      done: false
    };
  
    ToDoList.updateOne({'_id': req.params.id},
    { 
      $push: {content : newItem}
    })
    .then(result => {
      res.status(200).json({message: 'success', newItem: newItem});
    })
    .catch(()=> {
      res.status(400).json({message: 'failed', newItem: null});
    });
  
});
  
itemRouter.patch('/:id',(req, res, next) => {
  
    ToDoList.updateOne({'_id': req.params.id, 'content._id': req.body._id}, {$set: 
    {
      'content.$._id': req.body._id, 
      'content.$.text': req.body.text,
      'content.$.done': req.body.doney
    }})
    .then(result => {
      res.status(200).json({message: 'success'});
    })
    .catch(()=> {
      res.status(400).json({message: 'failed'});
    });
  
});
  
itemRouter.delete('/:listId/:contentId', (req, res, next) => {
  
    ToDoList.updateOne({'_id': req.params.listId}, {$pull: {'content': {'_id': req.params.contentId}}})
    .then((result) => {
      res.status(200).json({message: 'success'});
    })
    .catch(()=> {
      res.status(400).json({message: 'failed'});
    });
    
});

module.exports = itemRouter;