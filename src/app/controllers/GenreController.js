const Comic = require('../models/Comic')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class GenreController {
    showGenre(req, res, next) {
        Comic.find({country: req.params.slug}).sort({name: 1})
            .then(comics => res.render('comic/showGenre', {
                comics: mutipleMongooseToObject(comics)
            }))
            .catch(() => {
                res.render('error/error')
            })
    }
}

module.exports = new GenreController()