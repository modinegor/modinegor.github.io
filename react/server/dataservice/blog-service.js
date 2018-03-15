const Post = require('../models/post');

exports.getAll = next => {
    Post.find()
        .exec()
        .then(data => next(null, data))
        .catch(err => next(err));
};

exports.addPost = (post, next) => {
    let newPost = new Post({
        text: post.text,
        user: post.user
    });

    newPost.save((err, item) => {
        if (!err)
            return next(null, item);
        next(err);
    })
};

exports.deletePost = (id, next) => {
    Post.find({_id: id})
        .remove()
        .exec()
        .catch(err => next(err));
};


