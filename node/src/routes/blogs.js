const express = require('express');
const Blog = require('../db/mongo');
const bodyParser = require('body-parser');


const router = express.Router();
router.use(bodyParser.json());

router.route('/')
    .post((req, res) => {
        let {title, body} = req.body;

        if (title === '' || body === '')
            res.status(406).send('Cannot save new blog without title or body');
        else {
            let blog = new Blog({title: title, body: body});
            blog.save((err, item) => {
                if (err)
                    res.status(500).send(err);
                else
                    res.send(item);
            });
        }
    });

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id;

        Blog.find({_id: id})
            .exec()
            .then(data => {
                if (data.length === 0 )
                    res.render('404', {title: 'missing', message: `There is no blog with id ${id}`});
                else
                    res.render('blog', data[0]);
            })
    })
    .post((req, res) => {
        let {title, body} = req.body;

        Blog.findById(req.params.id, (err, item) => {
            if (err)
                res.status(500).send(err);
            else {
                item.title = title;
                item.body = body;

                item.save((err, item) => {
                    if (err)
                        res.status(500).send(err);
                    else
                        res.end();
                })
            }
        })
    })
    .delete((req, res) => {
        Blog.find({_id: req.params.id}).remove().exec();
    });

module.exports = router;
