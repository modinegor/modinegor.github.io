const config = require('../config').mongo;
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


mongoose.Promise = Promise;

const auth = config.username ? `${config.username}:${config.password}@` : '';
const connection_string = `mongodb://${auth}${config.host}:${config.port}/${config.db}`;

const connection = mongoose.createConnection(connection_string);
autoIncrement.initialize(connection);

const blogSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    title: String,
    body: String
});
blogSchema.plugin(autoIncrement.plugin, config.collection);

const blog = connection.model(config.collection, blogSchema);

module.exports = blog;
