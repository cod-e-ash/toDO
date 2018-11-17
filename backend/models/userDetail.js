const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userDetail = mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    passWord: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String}
});

userDetail.plugin(uniqueValidator);

module.exports = mongoose.model('UserDetail', userDetail);