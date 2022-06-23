const Comic = require('../models/Comic')
var User = require("../models/User")
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { json } = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const getSlug = require('speakingurl')  

class AdminController {
    libraryComic(req, res, next) {
        Comic.find().sort({updateAt: -1})
            .then((comics) => {
                const lengthListComics = comics.length
                if(req.query.page == null) {
                    return res.render('admin/admin', {
                        comics: mutipleMongooseToObject(comics.slice(0, 9)),
                        layout: 'adminLayout',
                        name: `${req.session.userName}`,
                        lengthListComics,
                    })
                }else {
                    const curPage = req.query.page
                    const startFrom = 9*(curPage - 1)
                    const end = 9*(curPage)
                    return res.render('admin/admin', {
                        comics: mutipleMongooseToObject(comics.slice(startFrom, end)),
                        layout: 'adminLayout',
                        name: `${req.session.userName}`,
                        lengthListComics,
                    })
                }
            })
            .catch(() => {
                res.render('error/error')
            })
    }

    create(req, res, next) {
        var message = ""
        if(req.body.name == "" || req.body.urlImage == "" || req.body.author == "" || req.body.content == "") {
            message = "Empty value! Please input value again!"
            return res.render('admin/create', {
                layout: 'adminLayout',
                name: `${req.session.userName}`,
                message
            })
        }
        else {
            const comic = new Comic(req.body)
            comic.save()
                .then(() => {
                    Comic.findOne({_id: comic._id})
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
                                            // lấy số ra khỏi chuỗi dùng regex
                                            if(!title.match(/(\d+\.?(\d+)?)/)) {
                                                continue
                                            } else {
                                                var numberChapter = Number(title.match(/(\d+\.?(\d+)?)/)[0])
                                            }

                                            const linkImage = links[i]
                                            listChapter.push({
                                                title,
                                                linkImage,
                                                numberChapter,
                                            })
                                        }
                                        for(let i = 0; i < listChapter.length; i++) {
                                            // Kiểm tra nếu chapter đã tồn tại thì bỏ qua không push vào array detailChapter còn ngược lại thì push thêm dữ liệu vào
                                            Comic.find({slug: resultComic.slug, detailChapter: {$elemMatch: {name: listChapter[i].title}}})
                                                .then(rs => {
                                                    if(rs.length > 0)
                                                    {
                                                    }else {
                                                        var slugNext
                                                        var slugPre
                                                        var slug = getSlug(listChapter[i].title)
                                                
                                                        if(i == 0)
                                                        {
                                                            slugNext = null
                                                        }else {
                                                            slugNext = getSlug(listChapter[i - 1].title)
                                                        }

                                                        if(i == listChapter.length - 1)
                                                        {
                                                            slugPre = null
                                                        }else {
                                                            slugPre = getSlug(listChapter[i + 1].title)
                                                        }

                                                        Comic.updateOne({_id: resultComic.id}, 
                                                            {
                                                                $set: {updateAt: new Date()},
                                                                $push: {
                                                                    detailChapter: {
                                                                        $each: [ {
                                                                            name: listChapter[i].title, 
                                                                            linkImage: listChapter[i].linkImage, 
                                                                            slugComic: resultComic.slug, 
                                                                            slugChapter: slug, 
                                                                            numberChapter: listChapter[i].numberChapter,
                                                                            nextChapter: slugNext,
                                                                            preChapter: slugPre,
                                                                        }],
                                                                        $sort: {numberChapter: -1}
                                                                    }}})
                                                            .then( )
                                                            .catch(next)
                                                    }
                                                })
                                        }
                                    })
                                    .catch((error) => {
                                        return res.render('error/error')
                                    })
                            } catch (error) {
                                res.sendStatus(500);
                                return
                            }
                            return res.redirect('/admin/library-comic')
                        })
                        .catch(next)
                })
                .catch((error) => {
                    return res.render('error/error')
                })
        }
    }

    edit(req, res, next) {
        Comic.findOne({_id: req.params.id})
            .then((comic) => {
                res.render('admin/edit', {
                    comic: mongooseToObject(comic),
                    layout: 'adminLayout',
                    name: `${req.session.userName}`,
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
                                // lấy số ra khỏi chuỗi dùng regex
                                if(!title.match(/(\d+\.?(\d+)?)/)) {
                                    continue
                                } else {
                                    var numberChapter = Number(title.match(/(\d+\.?(\d+)?)/)[0])
                                }
                                const linkImage = links[i]
                                listChapter.push({
                                    title,
                                    linkImage,
                                    numberChapter,
                                })
                            }
                            for(let i = 0; i < listChapter.length; i++) {
                                // Kiểm tra nếu chapter đã tồn tại thì bỏ qua không push vào array detailChapter còn ngược lại thì push thêm dữ liệu vào
                                Comic.find({slug: resultComic.slug, detailChapter: {$elemMatch: {name: listChapter[i].title}}})
                                    .then(rs => {
                                        if(rs.length > 0)
                                        {
                                        }else {
                                            var slugNext
                                            var slugPre
                                            var slug = getSlug(listChapter[i].title)
                                    
                                            if(i == 0)
                                            {
                                                slugNext = null
                                            }else {
                                                slugNext = getSlug(listChapter[i - 1].title)
                                            }

                                            if(i == listChapter.length - 1)
                                            {
                                                slugPre = null
                                            }else {
                                                slugPre = getSlug(listChapter[i + 1].title)
                                            }
                                            Comic.updateOne({_id: resultComic.id},
                                                {
                                                    $set: {updateAt: new Date()},
                                                    $push: {
                                                        detailChapter: {
                                                            $each: [ {
                                                                name: listChapter[i].title, 
                                                                linkImage: listChapter[i].linkImage, 
                                                                slugComic: resultComic.slug, 
                                                                slugChapter: slug, 
                                                                numberChapter: listChapter[i].numberChapter,
                                                                nextChapter: slugNext,
                                                                preChapter: slugPre,
                                                            }],
                                                            $sort: {numberChapter: -1}
                                                        }}})
                                                .then()
                                                .catch(next)
                                        }
                                    })
                            }
                        })
                        .catch((error) => {
                            return res.render('error/error')
                        })
                } catch (error) {
                    res.sendStatus(500);
                    return
                }
                return res.redirect('back')
            })
            .catch(next)
    }

    createComic(req, res, next) {
        return res.render('admin/create', {
            layout: 'adminLayout',
            name: `${req.session.userName}`,
        })
    }
}

module.exports = new AdminController()