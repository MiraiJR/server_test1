const Comic = require('../models/Comic')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const { json } = require('express');

class AdminController {
    admin(req, res, next) {
        Comic.find().sort({name: 1})
            .then(comics => res.render('admin/admin', {
                comics: mutipleMongooseToObject(comics)
            }))
            .catch(next)
    }

    create(req, res, next) {
        const comic = new Comic(req.body)
        comic.save()
            .then(() => res.redirect('/admin'))
            .catch(next)
    }

    edit(req, res, next) {
        Comic.findOne({_id: req.params.id})
            .then((comic) => {
                res.render('admin/edit', {
                    comic: mongooseToObject(comic),
                })
            })
            .catch(next)
    }

    update(req, res, next) {
        Comic.findOne({_id: req.params.id})
            .then((resultComic) => {
                Comic.updateOne({_id: req.params.id}, {$push: {detailChapters: {chapterNumber: req.body.detailChapters[0], images: req.body.detailChapters[1].split(', '), slug: resultComic.slug}}} , {$sort: {chapterNumber: 1}})
                    .then(() => res.redirect("/admin"))
                    .catch(next)
            })
            .catch(next)
    }
}

module.exports = new AdminController()