const mongoose = require('../dataservice/connection');
const Schema = require('mongoose').Schema;
const collection = require('./collections').USER_COLLECTION;
const passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model(collection, userSchema);
