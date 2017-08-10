'use strict';

// const router = Router();
var routes = require('express').Router();
var path = require('path');
var userController = require('../controllers').users;
var bookController = require('../controllers').books;
var borrowController = require('../controllers').borrow;
var jwt = require('jsonwebtoken');
var loggedIn = require('express').Router();
// const middleware = require('../middleware')

routes.get('*', function (req, res) {
    return res.status(200).send({
        message: 'Welcome to the begining of nothingness'
    });
});

module.exports = function (app) {
    // User API's
    app.get('/api/users/signup', function (req, res) {
        return res.status(200).send({
            message: 'Welcom to registreaion API'
        });
    });

    // Jwt token key
    process.env.SECRET_KEY = 'GodIsLove';

    // validation middleware
    var loggedIn = function loggedIn(req, res, next) {
        var token = req.body.token || req.headers['token'];

        if (token) {
            jwt.verify(token, process.env.SECTRET_KEY, function (err, decode) {
                if (err) {
                    res.status(500).send('Invalid Token');
                } else {
                    next();
                }
            });
            res.send('OK');
        }
    };
    app.use('/see', loggedIn);
    // loggedIn.use()

    app.post('/api/users/signup', userController.register);
    app.post('/api/users/signin', userController.login);

    // Login in Users only

    // Books API's
    app.get('/api/books', bookController.getAll);
    app.post('/api/books', bookController.addBook);
    app.get('/api/books/:bookId/', bookController.findOne);
    app.put('/api/books/:bookId/', bookController.update);

    // Borrow books API's
    app.post('/api/users/:userId/books', borrowController.borrowBook);
    app.get('/api/users/:userId/books', borrowController.yetToReturn);
    app.put('/api/users/:userId/books', borrowController.returnBook);
    app.get('/api/users/:userId/books/history', borrowController.viewHistory);
};