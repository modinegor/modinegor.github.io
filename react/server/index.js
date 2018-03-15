const express = require('express');
const cors = require('cors');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const blogs = require('./routes/blogRoutes');
const users = require('./routes/userRoutes');
const userModel = require('./models/user');
const path = require("path");

const port = 5002;
const server = express();


server.use(cors());

server.use(express.static(path.join(__dirname, 'dist')));

server.set('views', path.join(__dirname, 'views')); // set views root directory, your .html
server.set('view engine', 'jade');
// server.engine('.html', require('ejs').renderFile);

server.get(['/', '/blog', '/login', '/signup'], (req, res, next) => {
    res.render('./../../index.html');
});

server.use('/api/blog', blogs);

server.use(cookieParser());
server.use(require('express-session')({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));
server.use(passport.initialize());
server.use(passport.session());

passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

server.use('/api/user', users);

server.use((err, req, res, next) => {
    res.status(500).send(`Server error: ${err.stack}`);
});

server.listen(port);
