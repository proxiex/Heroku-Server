// const router = Router();
const routes = require('express').Router()
const path = require('path')
const userController = require('../controllers').users
const bookController = require('../controllers').books
const borrowController = require('../controllers').borrow
const session = require('express-session')
// const jwt = require('jsonwebtoken')
// const loggedIn = require('express').Router()
// const middleware = require('../middleware')

routes.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the begining of nothingness'
}))

module.exports = (app) => {
  // User API's
  app.get('/api/users/signup', (req, res) => res.status(200).send({
    message: 'Welcom to registreaion API'
  }))

  app.use(session({
    secret: 'GodIsLove'
  }))
  // Jwt token key
  process.env.SECRET_KEY = 'GodIsLove'

  // validation middleware
  const loggedIn = (req, res, next) => {
    const token = req.body.token || req.headers['token']

    if (token) {
      jwt.verify(token, process.env.SECTRET_KEY, function (err, decode) {
        if (err) {
          res.status(500).send('Invalid Token')
        } else {
          next()
        }
      })
      res.send('OK')
    }
  }
  app.use('/see', loggedIn)
  // loggedIn.use()

  app.get('/get')

  app.post('/api/users/signup', userController.register)
  app.post('/api/users/signin', userController.login)

  // Login in Users only

  // Books API's
  app.get('/api/books', bookController.getAll)
  app.post('/api/books', bookController.addBook)
  app.get('/api/books/:bookId/', bookController.findOne)
  app.put('/api/books/:bookId/', bookController.update)

  // Borrow books API's
  app.post('/api/users/:userId/books', borrowController.borrowBook)
  app.get('/api/users/:userId/books', borrowController.yetToReturn)
  app.put('/api/users/:userId/books', borrowController.returnBook)
  app.get('/api/users/:userId/books/history', borrowController.viewHistory)
}
