const users = require('../models').users
const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const register = (req, res) => {
  users.find({
    where: {
      email: req.body.email
    }
  }).then(found => {
    // console.log(found)
    if (found) {
      res.status(400).send({
        message: 'User already Exist'
      })
    } else {
      return users
      // Check if user exist

        .create({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10)
        })
        .then(register => res.status(201).send(register))
        .catch(error => {
          if (error.name === 'SequelizeValidationError') {
            res.status(400).send({
              message: 'Please enter all fields'
            })
          }
        })
    }
  })
}

const login = (req, res) => {
  const session = req.session
  return users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then((found) => {
      // make sure all fields are entered!
      if (!req.body.email || !req.body.password) {
        // console.log('one is empty')
        res.status(400).send({
          message: 'Please enter all fields'
        })
      } else {
        const hashedPassword = bcrypt.compareSync(req.body.password, found.password)
        // console.log('from Db: ' + found.password + " **** From user: " + hashedPassword)
        if (found === null) {
          res.status(401).send({
            message: 'User does not exsist! '
          })
        } else if (hashedPassword) {
          /* const user = {
            email: found.email,
            password: found.password
          }
          const token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: 40000
          }) */
          
          session.uniqueID = req.body.email
          console.log(session)
          res.status(200).send({
            message: 'Login Successful!'
            // token: token
          })
        } else {
          res.status(500).send({
            message: 'Wrong password'
          })
        }
      }
    })
    .catch(error => res.status(400).send(error))
}
module.exports = {
  register,
  login
}
