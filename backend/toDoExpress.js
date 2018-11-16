const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const toDoExpApp = express();

const itemRoutes = require('./routes/itemRoutes');
const listRoutes = require('./routes/listRoutes');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://invo:mongopass2@cluster0-zkcca.mongodb.net/todo?retryWrites=true')
  .then(() => {
    console.log('Database Connected');
  })
  .catch(() => {
    console.log('Database connection failed');
  });

toDoExpApp.use(bodyParser.json());
toDoExpApp.use(bodyParser.urlencoded({extended: false}));

toDoExpApp.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

toDoExpApp.use('/api/lists', listRoutes);
toDoExpApp.use('/api/items', itemRoutes);

module.exports = toDoExpApp;