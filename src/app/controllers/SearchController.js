const Comic = require('../models/Comic')
const User = require('../models/UserT')
const { libraryComic } = require('./AdminController')

class SiteController {
    async search(req, res, next) {
        let payload = req.body.payload.trim()
        let searchData = await Comic.find({name: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec()
        
        //limit search
        searchData = searchData.slice(0, 6)
        res.send({payload: searchData})
    }
    history(req, res, next) {
        return res.json(req.session.comic)
    }
    
    updateHistory(req, res, next) {
        req.session.comic = req.body
        return res.json(req.session.comic)
    }

    updateDBComic(req, res, next) {
        Comic.deleteOne({_id: req.body.idComic})
            .then(() => res.redirect('back'))
            .catch(() => {
                return res.render('error/error')
            })
        return res.json()
    }

    user(req, res, next) {
        return res.json(req.session.userId)
    }

    favouriteComic(req, res, next) {
        User.findOne({_id: req.session.userId})
        .then((user)=> {
            return res.json(user.libraryComic)
        })
    }

    favouriteComicPut(req, res, next) {
        User.findOne({_id: req.session.userId})
        .then((user)=> {
            if(!user.libraryComic.includes(req.body.slug)) {
                var message = ""
                
                User.updateOne({_id: req.session.userId}, {
                    $push: {libraryComic: `${req.body.slug}`}
                })
                .then(() => {
                    message = "thành công"
                    return res.json(message)
                })
            }
        })
    }

    favouriteComicRemove(req, res, next) {
        User.findOne({_id: req.session.userId})
        .then((user)=> {
            const arrayComic = user.libraryComic.filter(ele => ele != `${req.body.slug}`)
            var message = ""
            User.updateOne({_id: req.session.userId}, {
                $set: {libraryComic: arrayComic}
            })
            .then(() => {
                message = "thành công"
                return res.json(message)
            })
        })
    }
    
}

module.exports = new SiteController()