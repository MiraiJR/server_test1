const Comic = require('../models/Comic')
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    home(req, res, next) {
        var arrayComic = []

        if(req.session.comic) {
            req.session.comic.forEach(element => {
                arrayComic.push(element.comic)
            });
        }

        Comic.find({}).sort({updateAt: -1})
            .then((comics) => {
                Comic.find({slug: {$in: arrayComic}})
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