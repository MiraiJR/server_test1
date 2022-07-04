var User = require("../models/UserT.js")
const Comic = require("../models/Comic")
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    mePage(req, res, next) {
        User.findOne({_id: req.session.userId})
            .then((user) => {
                return res.render('me/me', {
                    user: mongooseToObject(user),
                    layout: 'userLayout',
                    name: `${user.username}`
                })
            })
    }

    library(req, res, next) {

        User.findOne({_id: req.session.userId})
            .then((user) => {
                const arrayComic = user.libraryComic

                Comic.find({slug: {$in: arrayComic}})
                .then((comics) => {
                    return res.render('me/library', {
                        comics: mutipleMongooseToObject(comics),
                        user: mongooseToObject(user),
                        layout: 'userLayout',
                        name: `${user.username}`
                    })
                })
            })
    }
}

module.exports = new MeController()