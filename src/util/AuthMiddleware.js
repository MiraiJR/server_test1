const User = require('../app/models/UserT.js')

module.exports = {
    requireAuth: function(req, res, next) {
        if(!req.session.userId) {
            return res.redirect('/login')
        }
        
        const id = req.session.userId
        User.find({_id: `${id}`})
            .then((user) => {
                if(user == null) {
                    return res.redirect('/login')
                }
                
                next()
            })
    },
    authAdmin(req, res, next) {
        User.findOne({_id: req.session.userId})
            .then((user) => {
                if(user) {
                    
                }
                if(user.type != 'admin') {
                    return res.redirect('/')
                }


                next()
            })
    }

}