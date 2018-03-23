const express = require('express');
const passport = require('passport');
const passportLocal = require("passport-local");
const cookieParser = require('cookie-parser');
const blogs = require('./routes/blogRoutes');
const users = require('./routes/userRoutes');
const path = require("path");
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const mongooseConnection = require('./dataservice/connection');
const userService = require("./dataservice/user-service");


const port = 5002;
const server = express();

const MongoStore = connectMongo(expressSession);


server.set('views', path.resolve(__dirname, 'views'));
server.set('view engine', 'pug');

server.use(express.static(path.join(__dirname, '..', 'dist')));

server.use(cookieParser());
server.use(require('express-session')({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongooseConnection
    })
}));

server.use(passport.initialize());
server.use(passport.session());

passport.use(new passportLocal.Strategy({ usernameField: 'username' }, userService.authenticate));
passport.serializeUser((user, next) => {
    next(null, user.username);
});
passport.deserializeUser((username, next) => {
    userService.findUser({username}, (err, user) => {
        next(err, user);
    });
});

server.get(['/', '/blog', '/login', '/singup'], (req, res, next) => {
    res.render('index');
});

server.use('/api/blog', blogs);
server.use('/api/user', users);

server.use((err, req, res, next) => {
    res.status(500).send(`Server error: ${err.stack}`);
});

server.listen(port);
