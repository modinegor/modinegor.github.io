const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const config = require('./mongo-config');

const auth = config.username ? `${config.username}:${config.password}@` : '';
const connection_string = `mongodb://${auth}${config.host}:${config.port}/${config.db}`;

mongoose.Promise = Promise;

const connection = mongoose.createConnection(connection_string);
autoIncrement.initialize(connection);

module.exports = connection;
