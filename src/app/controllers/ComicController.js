const Comic = require('../models/Comic')
const History = require('../models/History')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');
const axios = require('axios')
const cheerio = require('cheerio')

class ComicController {
    showComic(req, res, next) {
        Comic.findOne(req.params)
            .then((comic) => {
                const lastChapter = comic.detailChapter.length - 1
                try {
                    axios.get('https://api.ipify.org/?format=json')
                            .then(resp => {
                                History.findOne({ip: resp.data.ip})
                                    .then((ipHistory) => {
                                        if(ipHistory == null) {
                                            var dataHistory = new History
                                            dataHistory.ip = resp.data.ip
                                            dataHistory.save()
                                                .then(() => {
                                                    History.findOne({ip: dataHistory.ip, comicHistory: {$elemMatch: {name: comic.name}}})
                                                        .then((rs) => {
                                                            if(rs == null){
                                                                History.updateOne({ip: dataHistory.ip}, {$push: {comicHistory: {name: comic.name, slug: comic.slug, urlImage: comic.urlImage}}})
                                                                    .then(console.log('thanh cong'))
                                                            }
                                                        })
                                                })
                                        }
                                        else {
                                            History.findOne({ip: resp.data.ip, comicHistory: {$elemMatch: {name: comic.name}}})
                                                .then((rs) => {
                                                    if(rs == null){
                                                        History.updateOne({ip: resp.data.ip}, {$push: {comicHistory: {name: comic.name, slug: comic.slug, urlImage: comic.urlImage}}})
                                                            .then(console.log('thanh cong'))
                                                    }
                                                })
                                        }
                                    })
                                    .then(() => {
                                        return res.render('comic/showComic', {
                                            comic: mongooseToObject(comic), lastChapter
                                        })
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

    showChapter(req, res, next) {
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
                        res.render('comic/showChapter', {
                            chapter: mongooseToObject(chapter), listImageChapter, listChapters: mutipleMongooseToObject(listChapters), curSlugChapter
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