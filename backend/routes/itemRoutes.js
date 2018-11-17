const express = require('express');
const ToDoList = require('../models/toDoList');
const mongoose = require('mongoose');

const itemRouter = express.Router();

const checkAuth = require('../middleware/checkAuth');

itemRouter.post('/:id', checkAuth, (req, res, next) => {

    const newItem = {
      _id: mongoose.Types.ObjectId(),
      text: req.body.text,
      done: false
    };

    ToDoList.updateOne({'_id': req.params.id, 'user': req.headers.user},
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
  
itemRouter.patch('/:id', checkAuth, (req, res, next) => {
  
    ToDoList.updateOne({'_id': req.params.id, 'user': req.headers.user, 'content._id': req.body._id}, {$set: 
    {
      'content.$._id': req.body._id, 
      'content.$.text': req.body.text,
      'content.$.done': req.body.done,
      'lastupd': new Date
    }})
    .then(result => {
      res.status(200).json({message: 'success'});
    })
    .catch(()=> {
      res.status(400).json({message: 'failed'});
    });
  
});
  
itemRouter.delete('/:listId/:contentId', checkAuth, (req, res, next) => {

    ToDoList.updateOne({'_id': req.params.listId, 'user': req.headers.user}, {
      $set: {lastupd: new Date},
      $pull: {'content': {'_id': req.params.contentId}}})
    .then((result) => {
      res.status(200).json({message: 'success'});
    })
    .catch(()=> {
      res.status(400).json({message: 'failed'});
    });
    
});

module.exports = itemRouter;