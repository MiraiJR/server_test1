const Comic = require('../models/Comic')

class AdminController {
    admin(req, res, next) {
        res.render('admin/admin')
    }

    create(req, res, next) {
        const comic = new Comic(req.body)
        comic.save()
            .then(() => res.redirect('/admin'))
            .catch(next)
    }
}

module.exports = new AdminController()