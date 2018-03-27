const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();

app.use(cors());

app.get('/data', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(path.resolve('data.json'))));
});

app.listen(5003);
