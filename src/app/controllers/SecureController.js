const Comic = require('../models/Comic')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SecureController {
    loginPage(req, res, next) {
        try {
            res.render('secure/login')
        } catch (error) {
            res.render('error/error')
        }
    }
}

module.exports = new SecureController()