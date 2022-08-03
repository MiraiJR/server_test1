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

    uploadImage(req, res, next) {
        const file = req.file
        
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }

        return res.json(`/image/uploads/${file.filename}`)
    }


    changeAvatarUser(req, res, next) {
        const linkImage = req.body.linkImage

        User.updateOne({_id: req.session.userId}, {
            $set: {avatar: linkImage}
        })
        .then(() => {
            return res.send('success')
        })
    }
}

module.exports = new MeController()