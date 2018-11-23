const express = require('express');
const mongoose = require('mongoose');
const UserDetails = require('../models/userDetail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

userRouter.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.passWord, 10)
    .then(hashPass =>{
        const user = new UserDetails({
            userName: req.body.userName,
            passWord: hashPass,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        user.save()
        .then(newUser => {
            const token = user.getAuthToken();
            res.status(200).json({message: 'success', token: token, userName: req.body.userName});
            // res.status(201).json({message: 'success'});
        })
        .catch(err => {
            res.status(500).json({message: 'failed', error: err});
        });
    })
    .catch(err => {
        res.status(500).json({message: 'failed', error: err});
    });
});

userRouter.post('/login', (req, res, next) => {
    let curUser;
    UserDetails.findOne({userName: req.body.userName})
    .then(rtnUser => {
        if(!rtnUser) {
            return res.status(401).json({message: 'failed'});
        }
        curUser = rtnUser;
        bcrypt.compare(req.body.passWord, curUser.passWord)
        .then(result => {
            if(!result) {
                return res.status(401).json({message: 'failed'});
            }
            const token = curUser.getAuthToken();
            res.status(200).json({message: 'success', token: token, userName: curUser.userName});
        })
        .catch(err => {
            return res.status(401).json({message: 'failed'});
        });
    })
    .catch(err => {
        return res.status(401).json({message: 'failed'});
    });
});

module.exports = userRouter;