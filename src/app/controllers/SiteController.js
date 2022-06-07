const Comic = require('../models/Comic')
const History = require('../models/History')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const axios = require('axios')

class SiteController {
    home(req, res, next) {
        Comic.find({})
            .then((comics) => {
                axios.get('https://api.db-ip.com/v2/free/self')
                    .then(IPclient => {
                        return res.json(IPclient.data)
                        // History.findOne({ip: IPclient.data.ipAddress})
                        //     .then((history) => {
                        //         return res.render('home', {
                        //             comics: mutipleMongooseToObject(comics), 
                        //             listComicHistory: mutipleMongooseToObject(history.comicHistory),
                        //         })
                        //     })
                    })
            })
            .catch(() => {
                res.render('error/error')
            })
    }
}

module.exports = new SiteController()