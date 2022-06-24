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
    
                if(user.type == 'user') {
                    return res.redirect('/me')
                } else if (user.type == 'admin') {
                    return res.redirect('/admin')
                }
                
                next()
            })
    },

}