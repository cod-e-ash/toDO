const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userDetail = mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    passWord: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String}
}); 

userDetail.methods.getAuthToken = function() {
    return jwt.sign({
        userName: this.userName, 
        firstName: this.firstName,
        lastName: this.lastName
    }, process.env.JWT_KEY, {expiresIn: '2d' });
};


userDetail.plugin(uniqueValidator);

module.exports = mongoose.model('UserDetail', userDetail);