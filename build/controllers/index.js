'use strict';

var users = require('./users');
var books = require('./books');
var borrow = require('./borrow');

module.exports = {
    users: users,
    books: books,
    borrow: borrow
};