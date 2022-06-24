const Comic = require('../models/Comic')

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
    
}

module.exports = new SiteController()