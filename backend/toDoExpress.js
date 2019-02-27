const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const toDoExpApp = express();

const itemRoutes = require('./routes/itemRoutes');
const listRoutes = require('./routes/listRoutes');
const userRoutes = require('./routes/userRoutes');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://invo:' + process.env.MONGO_ATLAS_PW + '@cluster0-zkcca.mongodb.net/todo')
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
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization, User');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

toDoExpApp.use("/", express.static(path.join(__dirname, "ToDO")));

toDoExpApp.use('/api/lists', listRoutes);
toDoExpApp.use('/api/items', itemRoutes);
toDoExpApp.use('/api/users', userRoutes);
toDoExpApp.use((req, res) => {
  res.sendFile(path.join(__dirname, 'ToDO', 'index.html'));
});

module.exports = toDoExpApp;