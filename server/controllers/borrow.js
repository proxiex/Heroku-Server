const borrow = require('../models').borrow
const currentDate = new Date()
const books = require('../models').book
const users = require('../models').users

const borrowBook = (req, res) => {
  const session = req.session
  console.log(session)
  if (!session.uniqueID) {
    res.send({
      message: 'You have to login first!'
    })
  } else {
  // Fetch user borrowed book history 
  // Need to make sure that a user does not borrow a book twice
    borrow.find({
      where: {
        userId: req.params.userId,
        bookId: req.body.bookId
      }
    }).then(foundbook => {
      console.log(foundbook)
      if (foundbook) {
        res.status(200).send({
          message: 'You have already Borrowed this book'
        })
      } else {
      // This is the first time user borrows this book
        users.findById(req.params.userId).then((foundUser) => {
        // Check for book borrwed limit using memebership
          if (foundUser.membership === 'Silver') {
            if (foundUser.borrowed >= 3) {
              return res.status(403).send({
                message: 'Sorry you have rached Your borrowed book limit'
              })
            }
          } else if (foundUser.membership === 'Gold') {
            if (foundUser.borrowed >= 9) {
              return res.status(403).send({
                message: 'Sorry you have rached Your borrowed book limit'
              })
            }
          } else if (foundUser.membership === 'Green') {
            if (foundUser.borrowed >= 12) {
              return res.status(403).send({
                message: 'Sorry you have rached Your borrowed book limit'
              })
            }
          }
          // If user is not found
          if (!foundUser) {
            res.status(404).send({
              message: 'User not found'
            })
          } else {
          // Increase borrowed book quantity
            users.update({
              borrowed: (foundUser.borrowed + 1)
            }, {
              fields: ['borrowed'],
              where: {
                id: req.params.userId
              }
            })
          }
        })
        // Lets loook for the book requested by user and reduce book quantity
        books.findById(req.body.bookId).then((foundBook) => {
          if (foundBook.quantity !== 0) {
            books.update({
              quantity: (foundBook.quantity - 1)
            }, {
              fields: ['quantity'],
              where: {
                id: req.body.bookId
              }
            })
          }
        })

        // Make sure book requestd exist! 
        books.findById(req.body.bookId)
          .then((books) => {
            if (!books) {
              return res.status(404).send({
                message: 'Book not found'
              })

            // Borrow Only if book is available
            } else if (books.quantity <= 0) {
              return res.status(404).send({
                message: 'This Book is out of stock!'
              })
            }
            // return res.status(200).send(books)
            // store borrowed book in DB
            return borrow
              .create({
                userId: req.params.userId,
                bookId: req.body.bookId,
                date_collected: currentDate,
                date_due: currentDate.getDay() + 7
              })
              .then(borrow => res.status(200).send({
                message: 'Book has been borrowed succesfully!'
              }))
              .catch(error => res.status(400).send(error))
          })
          .catch(error => res.status(400).send(error))
      }
    })
  }
}

const yetToReturn = (req, res) => {
  const session = req.session
  console.log(session)
  if (!session.uniqueID) {
    res.send({
      message: 'You have to login first!'
    })
  } else {
    console.log(req.params)
    return borrow
      .findAll({
        where: {
          userId: req.params.userId,
          returned: req.query.returned
        }
      }).then((pending) => {
        console.log(pending)
        if (pending.length === 0) {
          return res.status(200).send({
            message: 'You have returned all books '
          })
        }
        return res.status(200).send(pending)
      })
  }
}

const returnBook = (req, res) => {
  const session = req.session
  console.log(session)
  if (!session.uniqueID) {
    res.send({
      message: 'You have to login first!'
    })
  } else {
    users.findById(req.params.userId).then((foundUser) => {
      if (foundUser.borrowed > 0) {
        users.update({
          borrowed: (foundUser.borrowed - 1)
        }, {
          fields: ['borrowed'],
          where: {
            id: req.params.userId
          }
        })
      }
    })

    return borrow
      .find({
        where: {
          bookId: req.body.bookId,
          userId: req.params.userId
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
              }
            })
          })
          borrow.update({
            date_returned: currentDate,
            returned: true
          }, {
            fields: ['returned'],
            where: {
              bookId: req.body.bookId,
              returned: false
            }
          }).then(res.status(200).send({ message: 'Book has been returned!' }))
            .catch((error) => {
              res.status(400).send(error)
            })
        } else {
          return res.status(200).send({
            message: 'You have already returned this book'
          })
        }
      })
  }
}

const viewHistory = (req, res) => {
  const session = req.session
  console.log(session)
  if (!session.uniqueID) {
    res.send({
      message: 'You have to login first!'
    })
  } else {
    return borrow
      .findAll({
        where: {
          userId: req.params.userId
        }
      }).then((history) => res.status(200).send(history))
  }
}
module.exports = {
  borrowBook,
  yetToReturn,
  returnBook,
  viewHistory
}
