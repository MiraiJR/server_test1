const Comic = require('../models/Comic')
const { mutipleMongooseToObject } = require('../../util/mongoose');

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
        console.log(req.session.comic)
        return res.json(req.session.comic)
    }
}

module.exports = new SiteController()