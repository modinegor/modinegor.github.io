const mongoose = require('../dataservice/connection');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = require('mongoose').Schema;
const collection = require('./collections').USER_COLLECTION;


const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model(collection, userSchema);
