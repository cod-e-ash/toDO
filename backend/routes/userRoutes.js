const express = require('express');
const mongoose = require('mongoose');
const UserDetails = require('../models/userDetail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.post('/signup', (req, res, next) => {
    console.log(req);
    bcrypt.hash(req.body.passWord, 10)
    .then(hashPass =>{
        const user = new UserDetails({
            userName: req.body.userName,
            passWord: hashPass,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        user.save()
        .then(result => {
            res.status(201).json({message: 'success'});
        })
        .catch(err => {
            res.status(500).json({message: 'failed', error: err});
        });
    });
});

userRouter.post('/login', (req, res, next) => {
    // console.log(req.body);
    let curUser;
    UserDetails.findOne({userName: req.body.userName})
    .then(rtnUser => {
        if(!rtnUser) {
            return res.status(401).json({
                message: 'failed'
            });
        }
        curUser = rtnUser;
        return bcrypt.compare(req.body.passWord, curUser.passWord);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: 'failed'
            });
        }
        const token = jwt.sign({
            userName: curUser.userName, 
            firstName: curUser.firstName,
            lastName: curUser.lastName
        }, "iLoVe@neW#ash@kEy", {expiresIn: '2d' });
        res.status(200).json({message: 'success', token: token});
    })
    .catch(err => {
        return res.status(401).json({
            message: 'failed'
        });
    });
});

module.exports = userRouter;