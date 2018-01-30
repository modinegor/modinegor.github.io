const express = require('express');


const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.send('Blogs page');
    })
    .post((req, res) => {
        res.end();
    });

router.route('/:id')
    .get((req, res) => {
        res.send('Some blog ' + req.params.id);
    })
    .post((req, res) => {
        res.end();
    })
    .delete((req, res) => {
        res.end();
    });

module.exports = router;
