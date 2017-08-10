const borrow = require('../models').borrow;

const currentDate = new Date();
const books = require('../models').book;
const users = require('../models').users;

const borrowBook = (req, res) => {
    users.findById(req.params.userId).then((foundUser) => {
        // Check for book borrwed limit using memebership

        if (foundUser.membership === 'Silver') {
            if (foundUser.borrowed >= 3) {
                return res.status(403).send({
                    message: 'Sorry you have rached Your borrowed book limit',
                });
            }
        } else if (foundUser.membership === 'Gold') {
            if (foundUser.borrowed >= 9) {
                return res.status(403).send({
                    message: 'Sorry you have rached Your borrowed book limit',
                });
            }
        } else if (foundUser.membership === 'Green') {
            if (foundUser.borrowed >= 12) {
                return res.status(403).send({
                    message: 'Sorry you have rached Your borrowed book limit',
                });
            }
        }
        if (!foundUser) {
            res.status(404).send({
                message: 'User not found',
            });
        } else {
            users.update({
                borrowed: (foundUser.borrowed + 1)
            }, {
                fields: ['borrowed'],
                where: {
                    id: req.params.userId
                },
            });
        }
    });
    books.findById(req.body.bookId).then((foundBook) => {
        if (foundBook.quantity !== 0) {
            books.update({
                quantity: (foundBook.quantity - 1)
            }, {
                fields: ['quantity'],
                where: {
                    id: req.body.bookId
                },
            });
        }
    });
    books.findById(req.body.bookId)
        .then((books) => {
            if (!books) {
                return res.status(404).send({
                    message: 'Book not found',
                });
            } else if (books.quantity <= 0) {
                return res.status(404).send({
                    message: 'This Book is out of stock!',
                });
            }
            // return res.status(200).send(books)
            return borrow
                .create({
                    userId: req.params.userId,
                    bookId: req.body.bookId,
                    date_collected: currentDate,
                    date_due: currentDate.getDay() + 7,
                })
                .then(borrow => res.status(200).send({
                    message: 'Book has been borrowed succesfully!',
                }))
                .catch(error => res.status(400).send(error));



        })
        .catch(error => res.status(400).send(error));
};

const yetToReturn = (req, res) => {
    console.log(req.params);
    return borrow
        .findAll({
            where: {
                userId: req.params.userId,
                returned: req.query.returned,
            }
        }).then((pending) => {
            console.log(pending);
            if (pending.length === 0) {
                return res.status(200).send({
                    message: 'You have returned all books ',
                });
            }
            return res.status(200).send(pending);

        });
};

const returnBook = (req, res) => {
    users.findById(req.params.userId).then((foundUser) => {
        if (foundUser.borrowed > 0) {
            users.update({
                borrowed: (foundUser.borrowed - 1)
            }, {
                fields: ['borrowed'],
                where: {
                    id: req.params.userId
                },
            });
        }
    });

    return borrow
        .find({
            where: {
                bookId: req.body.bookId,
                userId: req.params.userId,
            }
        }).then((foundUser) => {
            if (foundUser.returned === false) {
                books.findById(req.body.bookId).then((foundBook) => {
                    books.update({
                        quantity: (foundBook.quantity + 1)
                    }, {
                        fields: ['quantity'],
                        where: {
                            id: req.body.bookId
                        },
                    });
                });
                borrow.update({
                        date_returned: currentDate,
                        returned: true,
                    }, {
                        fields: ['returned'],
                        where: {
                            bookId: req.body.bookId,
                            returned: false,
                        }
                    }).then(res.status(201).send({ message: 'Book has been returned!' }))
                    .catch((error) => {
                        res.status(400).send(error);
                    });
            } else {
                return res.status(200).send({
                    message: 'You have already returned this book'
                });
            }
        });


};

const viewHistory = (req, res) => borrow
    .findAll({
        where: {
            userId: req.params.userId,
        }
    }).then((history) => res.status(200).send(history));
module.exports = {
    borrowBook,
    yetToReturn,
    returnBook,
    viewHistory,
};