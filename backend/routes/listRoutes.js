const express = require('express');
const ToDoList = require('../models/toDoList');
const mongoose = require('mongoose');

const listRouter = express.Router();

const checkAuth = require('../middleware/checkAuth');

listRouter.get('', checkAuth, (req, res, next) => {
  
  ToDoList.find({'user': req.headers.user}).sort({'lastupd':-1})
  .then(documents => {
    res.status(200).json(documents);
  })
  .catch(ex => {
    res.status(500).json({'message':'Internal Server Error!'});
  });
});

listRouter.get('/mylist', (req, res, next) => {
  
  ToDoList.find().sort({'lastupd':-1})
  .then(documents => {
    res.status(200).json(documents);
  })
  .catch(ex => {
    res.status(500).json({'message':'Internal Server Error!'});
  });
});

listRouter.post('', checkAuth, (req, res, next) => {
    
    if (req.body.user != req.headers.user) {
      return res.status(401).json({message: 'failed'});
    }

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
    list.save()
    .then(list => {
      res.status(201).json({message: "List added successfully"});
    })
    .catch(ex => {
      res.status(500).json({'message':'Internal Server Error!'});
    });
  });
  
listRouter.delete('/:id', checkAuth, (req, res, next) => {
  
    ToDoList.deleteOne({'_id': req.params.id, 'user': req.headers.user})
    .then(result => {
      res.status(200).json({message: 'List Deleted'});
    })
    .catch(ex => {
      res.status(500).json({'message':'Internal Server Error!'});
    });
  
});

module.exports = listRouter;