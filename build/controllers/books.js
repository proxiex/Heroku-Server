'use strict';

var books = require('../models').book;

var addBook = function addBook(req, res) {
    return books.create({
        ISBN: req.body.ISBN,
        bookname: req.body.bookname,
        author: req.body.author,
        publisher: req.body.publisher,
        category: req.body.category,
        quantity: req.body.quantity,
        details: req.body.details
    }).then(function (createdBooks) {
        return res.status(201).send(createdBooks);
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};

var getAll = function getAll(req, res) {
    return books.all().then(function (createdBooks) {
        return res.status(200).send(createdBooks);
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};

var findOne = function findOne(req, res) {
    return books.findById(req.params.bookId).then(function (foundBooks) {
        if (!foundBooks) {
            return res.status(404).send({
                message: 'Book Not Found!'
            });
        }
        return res.status(200).send(books);
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};

var update = function update(req, res) {
    return books.findById(req.params.bookId).then(function (updatedBook) {
        if (!updatedBook) {
            return res.status(404).send({
                message: 'Book not found'
            });
        }
        return books.update({
            book_id: req.body.book_id,
            bookname: req.body.bookname,
            author: req.body.author,
            publisher: req.body.publisher,
            category: req.body.category,
            quantity: req.body.quantity,
            details: req.body.details
        }).then(function () {
            return res.status(200).send(books);
        }).catch(function (error) {
            return res.status(400).send(error);
        });
    }).catch(function (error) {
        return res.status(400).send(error);
    });
};

module.exports = {
    addBook: addBook,
    getAll: getAll,
    findOne: findOne,
    update: update
};