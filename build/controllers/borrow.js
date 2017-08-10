'use strict';

var borrow = require('../models').borrow;

var currentDate = new Date();
var books = require('../models').book;
var users = require('../models').users;

var borrowBook = function borrowBook(req, res) {
    users.findById(req.params.userId).then(function (foundUser) {
        // Check for book borrwed limit using memebership

        if (foundUser.membership === 'Silver') {
            if (foundUser.borrowed >= 3) {
                return res.status(403).send({
                    message: 'Sorry you have rached Your borrowed book limit'
                });
            }
        } else if (foundUser.membership === 'Gold') {
            if (foundUser.borrowed >= 9) {
                return res.status(403).send({
                    message: 'Sorry you have rached Your borrowed book limit'
                });
            }
        } else if (foundUser.membership === 'Green') {
            if (foundUser.borrowed >= 12) {
                return res.status(403).send({
                    message: 'Sorry you have rached Your borrowed book limit'
                });
            }
        }
        if (!foundUser) {
            res.status(404).send({
                message: 'User not found'
            });
        } else {
            users.update({
                borrowed: foundUser.borrowed + 1
            }, {
                fields: ['borrowed'],
                where: {
                    id: req.params.userId
                }
            });
        }
    });
    books.findById(req.body.bookId).then(function (foundBook) {
        if (foundBook.quantity !== 0) {
            books.update({
                quantity: foundBook.quantity - 1
            }, {
                fields: ['quantity'],
                where: {
                    id: req.body.bookId
                }
            });
        }
    });
    books.findById(req.body.bookId).then(function (books) {
        if (!books) {
            return res.status(404).send({
                message: 'Book not found'
            });
        } else if (books.quantity <= 0) {
            return res.status(404).send({
                message: 'This Book is out of stock!'
            });
        }
        // return res.status(200).send(books)
        return borrow.create({
            userId: req.params.userId,
            bookId: req.body.bookId,
            date_collected: currentDate,
            date_due: currentDate.getDay() + 7
        }).then(function (borrow) {
            return res.status(200).send({
                message: 'Book has been borrowed succesfully!'
            });
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};

var yetToReturn = function yetToReturn(req, res) {
    console.log(req.params);
    return borrow.findAll({
        where: {
            userId: req.params.userId,
            returned: req.query.returned
        }
    }).then(function (pending) {
        console.log(pending);
        if (pending.length === 0) {
            return res.status(200).send({
                message: 'You have returned all books '
            });
        }
        return res.status(200).send(pending);
    });
};

var returnBook = function returnBook(req, res) {
    users.findById(req.params.userId).then(function (foundUser) {
        if (foundUser.borrowed > 0) {
            users.update({
                borrowed: foundUser.borrowed - 1
            }, {
                fields: ['borrowed'],
                where: {
                    id: req.params.userId
                }
            });
        }
    });

    return borrow.find({
        where: {
            bookId: req.body.bookId,
            userId: req.params.userId
        }
    }).then(function (foundUser) {
        if (foundUser.returned === false) {
            books.findById(req.body.bookId).then(function (foundBook) {
                books.update({
                    quantity: foundBook.quantity + 1
                }, {
                    fields: ['quantity'],
                    where: {
                        id: req.body.bookId
                    }
                });
            });
            borrow.update({
                date_returned: currentDate,
                returned: true
            }, {
                fields: ['returned'],
                where: {
                    bookId: req.body.bookId,
                    returned: false
                }
            }).then(res.status(201).send({ message: 'Book has been returned!' })).catch(function (error) {
                res.status(400).send(error);
            });
        } else {
            return res.status(200).send({
                message: 'You have already returned this book'
            });
        }
    });
};

var viewHistory = function viewHistory(req, res) {
    return borrow.findAll({
        where: {
            userId: req.params.userId
        }
    }).then(function (history) {
        return res.status(200).send(history);
    });
};
module.exports = {
    borrowBook: borrowBook,
    yetToReturn: yetToReturn,
    returnBook: returnBook,
    viewHistory: viewHistory
};