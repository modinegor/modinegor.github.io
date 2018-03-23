const router = require('express').Router();
const bodyParser = require('body-parser');
const blogService = require('../dataservice/blog-service');


router.use(bodyParser.json());

router.route('/')
    .get((req, res) => {
        blogService.getAll((err, data) => {
            if (!err)
                res.send(data);
            else
                res.status(500).send(err);
        })
    })
    .post((req, res) => {
        blogService.addPost(req.body, (err, item) => {
            if (!err)
                res.send(item);
            else
                res.status(500).send(err);
        })
    })
    .delete((req, res) => {

    });

module.exports = router;
