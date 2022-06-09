const Comic = require('../models/Comic')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const axios = require('axios')
const cheerio = require('cheerio')

class ComicController {
    showComic(req, res, next) {
        
        if(!req.session.comic) {
            req.session.comic = []
            req.session.comic.push(req.params.slug)
        }else {
            if(!req.session.comic.includes(req.params.slug))
            {
                req.session.comic.push(req.params.slug)
            }
        }

        console.log(req.session.comic)

        Comic.findOne(req.params)
            .then((comic) => {
                const lastChapter = comic.detailChapter.length - 1
                try {
                    return res.render('comic/showComic', {
                        comic: mongooseToObject(comic), lastChapter
                    })
                } catch (error) {
                    console.log(error)
                    return res.render('error/error')
                }
            })
            .catch((error) => {
                console.log(error)
                return res.render('error/error')
            })
    }

    showChapter(req, res, next) {
        if(!req.session.comic) {
            req.session.comic = []
            req.session.comic.push(req.params.slug)
        }else {
            if(!req.session.comic.includes(req.params.slug))
            {
                req.session.comic.push(req.params.slug)
            }
        }
        console.log(req.session.comic)
        
        Comic.findOne({slug: req.params.slug})
            .then((comic) => {

                const curSlugChapter = req.params.slugChapter

                const listChapters = comic.detailChapter
                var chapter
                for (let i = 0; i < comic.detailChapter.length; i++) {
                    if(comic.detailChapter[i].slugChapter == req.params.slugChapter){
                        chapter = comic.detailChapter[i]
                    }
                }
                try {
                    axios.get(chapter.linkImage).then(function(response) {
                        var $ = cheerio.load(response.data)
                        var listImageChapter = []
                        var listItem = $('.lazy').each(function(i, elem) {
                            listImageChapter.push($(elem).attr('data-src'))
                        })
                        return res.render('comic/showChapter', {
                            chapter: mongooseToObject(chapter), 
                            listImageChapter, 
                            listChapters: mutipleMongooseToObject(listChapters), 
                            curSlugChapter, 
                            comic: mongooseToObject(comic)
                        })
                    })
                } catch (error) {
                    console.log(error)
                    return res.render('error/error')
                }
            })
            .catch((error) => {
                console.log(error)
                return res.render('error/error')
            })
    }
}

module.exports = new ComicController()