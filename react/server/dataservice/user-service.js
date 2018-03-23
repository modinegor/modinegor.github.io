const User = require('../models/user');

exports.addUser = (user, next) => {
    let {username, password, email} = user;

    email = email.toLowerCase();

    User.find({$or: [{'username': username}, {'email': email}]})
        .exec((err, exist_user) => {
            if (err)
                next(err);
            else if (exist_user.length > 0)
                next(null, {
                    error: 'User with input name or email already exist',
                    username: null
                });
            else {
                let newUser = new User({
                    username,
                    password,
                    email
                });

                newUser.save(err => {
                    if (err)
                        next(err);
                    else
                        next(null, {
                            error: null,
                            username: username
                        })
                })
            }
    });
};

const findUser = (user, next) => {
    User.findOne(user, (err, user) => {
        next(err, user);
    })
};

exports.findUser = findUser;

exports.authenticate = (username, password, next) => {
    findUser({username}, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return next(null, null);
        }

        if (password === user.password)
            return next(null, user);
        else
            next(user);
    });
};
