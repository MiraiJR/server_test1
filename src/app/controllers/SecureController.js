const User = require('../models/User')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SecureController {
    loginPage(req, res, next) {
        try {
            return res.render('secure/login')
        } catch (error) {
            return res.render('error/error')
        }
    }

    userLogin(req, res, next) {
        try {
            // const user = new User(req.body)
            if(req.body.username == "admin" && req.body.password == "123"){
                
                return res.redirect('/admin')
            }
        } catch (error) {
            console.log(error)
            return res.render('error/error')
        }
    }

}

module.exports = new SecureController()