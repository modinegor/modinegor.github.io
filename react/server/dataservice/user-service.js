const User = require('../models/user');

exports.addUser = (user, next) => {
    let newUser = new User({
        username: user.username,
        password: user.password,
        email: user.email.toLowerCase()
    });

    newUser.save(err => {
        if (err)
            return next(err);
        next(null);
    })
};

exports.findUser = (user, next) => {
    User.findOne(user, (err, user) => {
        next(err, user);
    })
};