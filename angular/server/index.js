const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const {port, files} = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'static')));

app.get('/todo', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'part1', 'index.html'))
});
app.get('/blog', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'part2', 'index.html'))
});

app.get('/api/todo', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(files.TODO)));
});

app.get('/api/blog', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(files.BLOG)));
});
app.post('/api/blog', (req, res) => {
    let {title, text} = req.body,
        data = JSON.parse(fs.readFileSync(files.BLOG));

    data.push({title, text});

    fs.writeFile(files.BLOG, JSON.stringify(data));
});
app.post('/api/blog/:id', (req, res) => {
    const id = req.params.id;
    let {title, text} = req.body,
        data = JSON.parse(fs.readFileSync(files.BLOG));

    data[id].text = text;
    data[id].title = title;

    fs.writeFile(files.BLOG, JSON.stringify(data));
});

app.listen(port);
