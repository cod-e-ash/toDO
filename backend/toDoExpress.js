const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ToDoList = require('./models/toDoList');

const toDoExpApp = express();


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://invo:mongopass2@cluster0-zkcca.mongodb.net/todo?retryWrites=true')
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
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

toDoExpApp.post("/api/lists", (req, res, next) => {

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

toDoExpApp.get('/api/lists',(req, res, next) => {

    ToDoList.find().sort({'lastupd':-1})
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


toDoExpApp.post('/api/items/:id',(req, res, next) => {
  
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

toDoExpApp.patch('/api/items/:id',(req, res, next) => {

  ToDoList.updateOne({'_id': req.params.id, 'content._id': req.body._id}, {$set: 
  {
    'content.$._id': req.body._id, 
    'content.$.text': req.body.text,
    'content.$.done': req.body.doney
  }})
  .then(result => {
    console.log(result);
    res.status(200).json({message: 'success'});
  })
  .catch(()=> {
    res.status(400).json({message: 'failed'});
  });

});

toDoExpApp.delete('/api/items/:listId/:contentId', (req, res, next) => {

  ToDoList.updateOne({'_id': req.params.listId}, {$pull: {'content': {'_id': req.params.contentId}}})
  .then((result) => {
    res.status(200).json({message: 'success'});
  })
  .catch(()=> {
    res.status(400).json({message: 'failed'});
  });
  
});

module.exports = toDoExpApp;