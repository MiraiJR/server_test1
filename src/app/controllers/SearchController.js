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
}

module.exports = new SiteController()