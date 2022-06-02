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

    showChapter(req, res, next) {
        // res.json(req.params)
        Comic.findOne({slug: req.params.slug})
            .then((comic) => {
                // res.send(Number(req.params.number))
                var chapter
                for (let i = 0; i < comic.detailChapters.length; i++) {
                    if(comic.detailChapters[i].chapterNumber == req.params.number){
                        chapter = comic.detailChapters[i]
                    }
                }
                res.render('comic/showChapter', {
                    chapter: mongooseToObject(chapter),
                })
                // res.render('comic/showComic', {
                //     comic: mongooseToObject(comic),
                // })
            })
            .catch(next)
        // res.render('comic/showChapter')
    }
}

module.exports = new ComicController()