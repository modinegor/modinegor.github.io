const express = require('express');
const fs = require('fs');
const path = require('path');
const port = require('./config').port;


const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'))
});

app.get('/api/data', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(path.resolve(__dirname, 'data.json'))));
});

app.listen(port);
