const Comic = require('../models/Comic')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { json } = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const getSlug = require('speakingurl')  
 

class AdminController {
    admin(req, res, next) {
        Comic.find().sort({name: 1})
            .then(comics => res.render('admin/admin', {
                comics: mutipleMongooseToObject(comics)
            }))
            .catch(() => {
                return res.render('error/error')
            })
    }

    create(req, res, next) {
        var message = ""
        if(req.body.name == "" || req.body.urlImage == "" || req.body.author == "" || req.body.content == "") {
            message = "Empty value! Please input value again!"
            Comic.find().sort({name: 1})
            .then(comics => res.render('admin/admin', {
                comics: mutipleMongooseToObject(comics), message
            }))
            .catch(() => {
                return res.render('error/error')
            })
        }
        else {
            const comic = new Comic(req.body)
            comic.save()
                .then(() => res.redirect('/admin'))
                .catch(() => {
                    return res.render('error/error')
                })
        }
    }

    edit(req, res, next) {
        Comic.findOne({_id: req.params.id})
            .then((comic) => {
                res.render('admin/edit', {
                    comic: mongooseToObject(comic),
                })
            })
            .catch(() => {
                return res.render('error/error')
            })
    }

    update(req, res, next) {
        Comic.findOne({_id: req.params.id})
            .then((resultComic) => {
                if(req.body.detailChapters[0] == "")
                {
                    try {
                        axios.get(`https://truyentranhlh.net/truyen-tranh/${resultComic.slug}`)
                        .then(function(response){
                            var $ = cheerio.load(response.data)
                            var listTitle = []
                            var links = []
                            var listItem = $('.list-chapters > a').each(function(i, elem) {
                                listTitle.push($(elem).attr('title'))
                                links.push($(elem).attr('href'))
                            })
                            var listChapter = []
                            for (let i = 0; i < listTitle.length; i++) {
                                const title = listTitle[i]
                                const linkImage = links[i]
                                listChapter.push({
                                    title,
                                    linkImage,
                                })
                            }
                            for(let i = 0; i < listChapter.length; i++) {
                                var slug = getSlug(listChapter[i].title)
                                Comic.updateOne({_id: resultComic.id}, {$push: {detailChapter: {name: listChapter[i].title, linkImage: listChapter[i].linkImage, slugComic: resultComic.slug, slugChapter: slug}}})
                                    .then()
                                    .catch(next)
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    } catch (error) {
                        alert(error)
                    }
                    res.redirect('/admin')
                }else {
                    // Comic.updateOne({_id: req.params.id}, {$push: {detailChapters: {chapterNumber: req.body.detailChapters[0], images: req.body.detailChapters[1].split(', ')}}} , {$sort: {name: 1}})
                    //     .then(() => res.redirect("/admin"))
                    //     .catch(next)
                }
            })
            .catch(() => {
                return res.render('error/error')
            })
    }

    delete(req, res, next) {
        Comic.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(() => {
                return res.render('error/error')
            })
    }

    updateChapter(req, res, next) {
        Comic.findOne({_id: req.params.id})
            .then((resultComic) => {
                try {
                    axios.get(`https://truyentranhlh.net/truyen-tranh/${resultComic.slug}`)
                    .then(function(response){
                        var $ = cheerio.load(response.data)
                        var listTitle = []
                        var links = []
                        var listItem = $('.list-chapters > a').each(function(i, elem) {
                            listTitle.push($(elem).attr('title'))
                            links.push($(elem).attr('href'))
                        })
                        var listChapter = []
                        for (let i = 0; i < listTitle.length; i++) {
                            const title = listTitle[i]
                            const linkImage = links[i]
                            listChapter.push({
                                title,
                                linkImage,
                            })
                        }

                        for(let i = 0; i < listChapter.length; i++) {
                            Comic.find({slug: resultComic.slug, detailChapter: {$elemMatch: {name: listChapter[i].title}}})
                                .then(rs => {
                                    if(rs.length > 0)
                                    {
                                    }else {
                                        var slug = getSlug(listChapter[i].title)
                                        Comic.updateOne({_id: resultComic.id}, {$push: {detailChapter: {name: listChapter[i].title, linkImage: listChapter[i].linkImage, slugComic: resultComic.slug, slugChapter: slug}}})
                                            .then()
                                            .catch(next)
                                    }
                                })
                        }
                    })
                    .catch(() => {
                        return res.render('error/error')
                    })
                } catch (error) {
                    console.log(error);
                    res.sendStatus(500);
                    return
                }
                return res.redirect('back')
            })
            .catch(next)
    }
}

module.exports = new AdminController()