const express = require('express');
const bodyParser = require('body-parser');
const toDoExpApp = express();

toDoExpApp.use(bodyParser.json());
toDoExpApp.use(bodyParser.urlencoded({extended: false}));

toDoExpApp.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

toDoExpApp.post('/api/lists', (req,res,next) => {
    const list = req.body; 
    res.status(201).json({
      message: 'List Added'
    });
});

toDoExpApp.get('/api/lists',(req, res, next) => {

    const commonList= [{
        _id:'1',
        user: 'ashish',
        title: 'First Item',
        content: [{
          text: 'First Item in the List',
          done: false
        },{
          text: 'Second Item in the List',
          done: false
        },{
          text: 'Third Item in the List',
          done: false
        },{
          text: 'Fourth Item in the List',
          done: true
        },{
          text: 'Fifth Item in the List',
          done: false
        },{
          text: 'Sixth Item in the List',
          done: true
        }],
        lastupd: new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
      },{
        _id:'2',
        user: 'ashish',
        title: 'Second List',
        content: [{
          text: 'First Item in the List',
          done: false
        },{
          text: 'Second Item in the List',
          done: true
        },{
          text: 'Third Item in the List',
          done: true
        }],
        lastupd: new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
      },{
        _id:'3',
        user: 'ashish',
        title: 'Third Item',
        content: [{
          text: 'First Item in the List',
          done: false
        },{
          text: 'Second Item in the List',
          done: false
        },{
          text: 'Third Item in the List',
          done: false
        },{
          text: 'Fourth Item in the List',
          done: true
        },{
          text: 'Fifth Item in the List',
          done: false
        },{
          text: '7th Item in the List',
          done: true
        },{
          text: '8th Item in the List',
          done: true
        },{
          text: '9th Item in the List',
          done: false
        },{
          text: '10th Item in the List',
          done: true
        }],
        lastupd: new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
      },{
        _id:'4',
        user: 'anu',
        title: 'First Item',
        content: [{
          text: 'First Item in the List',
          done: false
        },{
          text: 'Second Item in the List',
          done: false
        },{
          text: 'Third Item in the List',
          done: false
        },{
          text: 'Fourth Item in the List',
          done: true
        },{
          text: 'Fifth Item in the List',
          done: false
        },{
          text: 'Sixth Item in the List',
          done: true
        }],
        lastupd: new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
      },{
        _id:'6',
        user: 'ashish',
        title: 'Second List',
        content: [{
          text: 'First Item in the List',
          done: false
        },{
          text: 'Second Item in the List',
          done: true
        },{
          text: 'Third Item in the List',
          done: true
        }],
        lastupd: new Date(+(new Date()) - Math.floor(Math.random()*10000000000))
      }];

    res.status(200).json(commonList);

});

module.exports = toDoExpApp;