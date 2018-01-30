const express = require('express');
const config = require('./config');
const blogs = require('./routes/blogs');
const path = require('path');
const logger = require('./logger');


const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) => {
    logger.info(`Got ${req.method} request at ${Date().toLocaleString()}`);
    next();
});

app.use('/blogs', blogs);

app.all('*', (req, res) => {
    res.render('404', {title: '404', message: `Page "${req.url}" doesn't exist`});
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('Server error =(');
});

app.listen(config.port);
