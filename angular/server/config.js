const path = require('path');

exports.port = 5003;

exports.files = {
    TODO: path.resolve(__dirname, 'data.json'),
    BLOG: path.resolve(__dirname, 'blog.json')
};