const Comic = require('../models/Comic')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class ListComicController {
    showList(req, res, next) {
        Comic.find().sort({name: 1})
            .then((comics) => {
                const lengthListComics = comics.length
                if(req.query.page == null) {
                    return res.render('comic/showGenre', {
                        lengthListComics,
                        comics: mutipleMongooseToObject(comics.slice(0, 16))
                    })
                }else {
                    const curPage = req.query.page
                    const startFrom = 16*(curPage - 1)
                    const end = 16*(curPage)
                    return res.render('comic/showGenre', {
                        lengthListComics,
                        comics: mutipleMongooseToObject(comics.slice(startFrom, end))
                    })
                }
            })
            .catch(() => {
                res.render('error/error')
            })
    }
}

module.exports = new ListComicController()