const router = require('express').Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const userService = require('../dataservice/user-service');


router.use(bodyParser.json());

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({username: req.body.username})
});

// router.get('/session', {})

router.post('/register', (req, res) => {
    userService.addUser(req.body, (err, answer) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(answer);
    })
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send(null);
});

module.exports = router;