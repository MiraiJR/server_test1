const Comic = require('../models/Comic')
const { mongooseToObject } = require('../../util/mongoose');

class ComicController {
    showComic(req, res, next) {
        // res.render('comic/showComic')
        Comic.findOne(req.params)
            .then((comic) => {
                res.render('comic/showComic', {
                    comic: mongooseToObject(comic),
                })
            })
            .catch(next)
    }
}

module.exports = new ComicController()