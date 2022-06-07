const Comic = require('../models/Comic')
const History = require('../models/History')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const axios = require('axios')

class SiteController {
    home(req, res, next) {
        Comic.find({})
            .then((comics) => {
                axios.get('https://api.ipify.org/?format=json')
                    .then(IPclient => {
                        History.findOne({ip: IPclient.data.ip})
                            .then((history) => {
                                return res.render('home', {
                                    comics: mutipleMongooseToObject(comics), 
                                    history: mongooseToObject(history),
                                })
                            })
                    })
            })
            .catch(() => {
                res.render('error/error')
            })
    }
}

module.exports = new SiteController()