const express = require('express');
const config = require('./src/config').server;
const blogs = require('./src/routes/blogs');
const path = require('path');
const logger = require('./src/logger');
const db = require('./src/db/mongo');


const app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/', (req, res) => {
    db.find()
        .exec()
        .then(data => {
            if (data.length === 0)
                data = undefined;

            res.render('index', {blogs: data});
        })
});

app.use((req, res, next) => {
    logger.info(`Got ${req.method} request at ${Date().toLocaleString()}`);
    next();
});

app.use('/api/blogs', blogs);

app.all('*', (req, res) => {
    res.render('404', {title: '404', message: `Page "${req.url}" doesn't exist`});
});

app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send(`Server error: ${err.stack}`);
});

app.listen(config.port);
