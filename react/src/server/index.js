import express from 'express'
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../components/App';
import template from './template';


const port = 5001;
const server = express();

server.use('/dist', express.static('dist'));

server.get('/', (req, res) => {
    const appString = renderToString(<App />);

    res.send(template({
        body: appString
    }));
});

server.listen(port);
