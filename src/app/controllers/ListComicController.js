const Comic = require('../models/Comic')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class ListComicController {
    showList(req, res, next) {
        Comic.find().sort({name: 1})
            .then(comics => res.render('comic/showGenre', {
                comics: mutipleMongooseToObject(comics)
            }))
            .catch(next)
    }
}

module.exports = new ListComicController()