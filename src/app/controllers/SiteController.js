const Comic = require('../models/Comic')
const History = require('../models/History')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const axios = require('axios')

class SiteController {
    home(req, res, next) {
        Comic.find({})
            .then((comics) => {
                Comic.find({slug: {$in: req.session.comic}})
                    .then((history) => {
                        return res.render('home', {
                            comics: mutipleMongooseToObject(comics), 
                            history: mutipleMongooseToObject(history),
                        })
                    })
            })
            .catch((error) => {
                console.log(error)
                res.render('error/error')
            })
    }
}

module.exports = new SiteController()