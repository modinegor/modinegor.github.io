const mongoose = require('../dataservice/connection');
const Schema = require('mongoose').Schema;
const autoIncrement = require('mongoose-auto-increment');
const collection = require('./collections').POST_COLLECTION;


const postSchema = new Schema({
    date: {type: Date, default: Date.now},
    user: String,
    text: String
});
postSchema.plugin(autoIncrement.plugin, collection);

module.exports = mongoose.model(collection, postSchema);
