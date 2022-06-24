const Comic = require('../models/Comic')
var User = require("../models/User.js")
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')

class HistoryController {
    history(req, res, next) {
        var arrayComic = []
        if(req.session.comic) {
            req.session.comic.forEach(element => {
                arrayComic.push(element.comic)
            });
        }

        Comic.find({slug: {$in: arrayComic}})
            .then((historyComic) => {
                User.findOne({_id: req.session.userId}) 
                    .then((user) => {
                        return res.render('history/history', {
                            historyComic: mutipleMongooseToObject(historyComic),
                            user: mongooseToObject(user)
                        })
                    })
            })
    }
}

module.exports = new HistoryController()