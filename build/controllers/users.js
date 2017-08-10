'use strict';

var users = require('../models').users;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var register = function register(req, res) {
    return users.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        date: req.body.date,
        role: req.body.role
    }).then(function (register) {
        return res.status(201).send(register);
    }).catch(function (error) {
        if (error.name === 'SequelizeValidationError') {
            res.status(400).send({
                message: 'Please enter all fields'
            });
        }
    });
};

var login = function login(req, res) {
    return users.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (found) {
        var hashedPassword = bcrypt.compareSync(req.body.password, found.password);
        // console.log(found.password)
        // console.log('from Db: ' + found.password + " **** From user: " + hashedPassword)
        if (found === null) {
            res.status(401).send({
                message: 'User does not exsist! '
            });
        } else if (hashedPassword) {
            var user = {
                email: found.email,
                password: found.password
            };
            var token = jwt.sign(user, process.env.SECRET_KEY, {
                expiresIn: 4000
            });

            res.status(200).send({
                message: 'Login Successful!',
                token: token
            });
        } else {
            res.status(500).send({
                message: 'Wrong password'
            });
        }
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};
module.exports = {
    register: register,
    login: login
};