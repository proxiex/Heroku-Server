// const router = Router();
const routes = require('express').Router()
const userController = require('../controllers').users
const bookController = require('../controllers').books
const borrowController = require('../controllers').borrow
const session = require('express-session')

routes.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the begining of nothingness'
}))

module.exports = (app) => {
  // User API's
  app.get('/api/v1/users/signup', (req, res) => res.status(200).send({
    message: 'Welcom to registreaion API'
  }))

  app.use(session({
    secret: 'GodIsLove'
  }))

  app.post('/api/v1/users/signup', userController.register)
  app.post('/api/v1/users/signin', userController.login)

  // Login in Users only

  // Books API's
  app.get('/api/v1/books', bookController.getAll)
  app.post('/api/v1/books', bookController.addBook)
  app.get('/api/v1/books/:bookId/', bookController.findOne)
  app.put('/api/v1/books/:bookId/', bookController.update)

  // Borrow books API's
  app.post('/api/v1/users/:userId/books', borrowController.borrowBook)
  app.get('/api/v1/users/:userId/books', borrowController.yetToReturn)
  app.put('/api/v1/users/:userId/books', borrowController.returnBook)
  app.get('/api/v1/users/:userId/books/history', borrowController.viewHistory)
}
