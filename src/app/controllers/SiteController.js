const Comic = require('../models/Comic')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    home(req, res, next) {
        Comic.find({})
            .then(comics => res.render('home', {
                comics: mutipleMongooseToObject(comics)
            }))
            .catch(next)
    }
}

module.exports = new SiteController()