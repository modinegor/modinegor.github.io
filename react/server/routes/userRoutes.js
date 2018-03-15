const router = require('express').Router();
const passport = require('passport');


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({username: req.body.username})
});

module.exports = router;