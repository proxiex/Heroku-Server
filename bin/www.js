// This will be our application entry. We'll setup our server here.
require('babel-register')
require('dotenv').config()
const http = require('http')
const app = require('../app') // The express app we just created

const port = parseInt(process.env.PORT, 10) || 8000
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
console.log('Sever is up and running.....')
