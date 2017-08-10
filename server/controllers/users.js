const users = require('../models').users
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = (req, res) => {
    return users
        .create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            role: req.body.role,
        })
        .then(register => res.status(201).send(register))
        .catch(error => {
            if (error.name === 'SequelizeValidationError') {
                res.status(400).send({
                    message: "Please enter all fields",
                })
            }

        })

}

const login = (req, res) => {
    return users
        .findOne({
            where: {
                email: req.body.email,
            }
        })
        .then((found) => {
            hashedPassword = bcrypt.compareSync(req.body.password, found.password)
            //console.log('from Db: ' + found.password + " **** From user: " + hashedPassword)
            if (found === null) {
                res.status(401).send({
                    message: "User does not exsist! ",
                })
            } else if(hashedPassword){
                const user = {
                    email: found.email,
                    password: found.password
                }
                const token = jwt.sign(user, process.env.SECRET_KEY, {
                    expiresIn: 40000
                });

                res.status(200).send({
                    message: "Login Successful!",
                    token: token,
                })
            }else{
                res.status(500).send({
                    message: "Wrong password"
                })
            }

        })
        .catch(error => res.status(400).send(error))
}
module.exports = {
    register,
    login,
}