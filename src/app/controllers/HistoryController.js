const Comic = require('../models/Comic')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose')

class HistoryController {
    history(req, res, next) {
        Comic.find({slug: {$in: req.session.comic}})
            .then((history) => {
                return res.render('history/history', {
                    history: mutipleMongooseToObject(history),
                })
            })
    }
}

module.exports = new HistoryController()