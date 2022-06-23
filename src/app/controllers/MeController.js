var User = require('../models/User')
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    mePage(req, res, next) {
        User.findOne({_id: req.session.userId})
            .then((user) => {
                return res.render('me/me', {
                    user: mongooseToObject(user),
                    layout: 'userLayout',
                    name: `${user.username}`
                })
            })
    }
}

module.exports = new MeController()