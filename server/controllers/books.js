const books = require('../models').book

const addBook = (req, res) => {
  console.log(req.body)
  books.find({
    where: {
      ISBN: req.body.ISBN
    }
  }).then(found => {
    console.log(found)
    if (found) {
      res.status(400).send({
        message: 'Book already Exist'
      })
    } else {
      return books
        .create({
          ISBN: req.body.ISBN,
          bookname: req.body.bookname,
          author: req.body.author,
          publisher: req.body.publisher,
          category: req.body.category,
          quantity: req.body.quantity,
          details: req.body.details
        })
        .then(createdBooks => res.status(201).send(createdBooks))
        .catch(error => res.status(400).send(error))
    }
  })
}
const getAll = (req, res) => books
  .all()
  .then(createdBooks => res.status(200).send(createdBooks))
  .catch(error => res.status(400).send(error))

const findOne = (req, res) => books
  .findById(req.params.bookId)
  .then((foundBooks) => {
    if (!foundBooks) {
      return res.status(404).send({
        message: 'Book Not Found!'
      })
    }
    return res.status(200).send(foundBooks)
  })
  .catch(error => res.status(400).send(error))

const update = (req, res) => books
  .findById(req.params.bookId)
  .then((updatedBook) => {
    if (!updatedBook) {
      return res.status(404).send({
        message: 'Book not found'
      })
    }
    return books
      .update({
        ISBN: req.body.ISBN,
        bookname: req.body.bookname,
        author: req.body.author,
        publisher: req.body.publisher,
        category: req.body.category,
        quantity: req.body.quantity,
        details: req.body.details
      },
      {
        where: {
          id: req.params.bookId
        } })
      .then((bookupdate) => res.status(200).send({
        message: 'Book has been updated'
      }))
      .catch(error => res.status(400).send(error))
  })

  .catch(error => res.status(400).send(error))

module.exports = {
  addBook,
  getAll,
  findOne,
  update
}
