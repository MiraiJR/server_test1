const Comic = require('../models/Comic')
const History = require('../models/History')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const axios = require('axios')
const cheerio = require('cheerio')

class SiteController {
    home(req, res, next) {
        Comic.find({})
            .then((comics) => {
                axios.get('https://api.db-ip.com/v2/free/self')
                    .then(IPclient => {
                        History.findOne({ip: IPclient.data.ipAddress})
                            .then((history) => {
                                const listComicHistory = history.comicHistory
                                return res.render('home', {
                                    comics: mutipleMongooseToObject(comics), 
                                    listComicHistory: mutipleMongooseToObject(listComicHistory),
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