const Comic = require('../models/Comic')
var User = require('../models/User')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

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
                        if(req.session.userId == null) {
                            return res.render('home', {
                                comics: mutipleMongooseToObject(comics), 
                                history: mutipleMongooseToObject(history),
                            })
                        }else {
                            User.findOne({_id: `${req.session.userId}`})
                                .then((user) => {
                                    return res.render('home', {
                                        comics: mutipleMongooseToObject(comics), 
                                        history: mutipleMongooseToObject(history),
                                        user: mongooseToObject(user)
                                    })
                                })
                        }
                    })
            })
            .catch((error) => {
                console.log(error)
                res.render('error/error')
            })
    }
}

module.exports = new SiteController()