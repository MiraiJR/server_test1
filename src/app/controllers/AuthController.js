var User = require("../models/UserT.js")

class AuthController {
    loginPage(req, res, next) {
        try {
            if(req.session.userId) {
                return res.redirect('/admin/library-comic')
            }
            return res.render('auth/login')
        } catch (error) {
            return res.render('error/error')
        }
    }

    regisPage(req, res, next) {
        try {
            if(req.session.userId) {
                return res.redirect('/admin/library-comic')
            }
            return res.render('auth/register')
        } catch (error) {
            return res.render('error/error')
        }
    }

    userLogin(req, res, next) {
        try {
            var message = ""
            if(req.body.username == "" || req.body.password == "") {
                message = "Empty value! Please input value"
                return res.render('auth/login', {
                    message
                })
            }

            User.findOne({username: req.body.username}) 
                .then((user) => {
                    if(user == null) {
                        message = "Username is not exists! Please input username correctly!"
                        return res.render('auth/login', {
                            message
                        })
                    }
                    if(req.body.password != user.password) {
                        message = "Password don't correct! Please input password correctly!"
                        return res.render('auth/login', {
                            message
                        })
                    }

                    req.session.userId = user._id
                    if(user.type == 'admin') {
                        return res.redirect('/admin/library-comic')
                    } else if(user.type == 'user') {
                        return res.redirect('/')
                    }
                })
        } catch (error) {
            return res.render('error/error')
        }
    }

    userRegis(req, res, next) {
        try {
            var message = ""
            if(req.body.username == "" || req.body.password == "" || req.body.passwordCheck == "" || req.body.fullname == "" || req.body.email == "") {
                message = "Empty value! Please input value"
                return res.render('auth/register', {
                    message
                })
            }

            if(req.body.passwordCheck != req.body.password) {
                message = "The password is not matching!"
                return res.render('auth/register', {
                    message
                })
            }

            if(req.body.password.length < 8) {
                message = "The password is so short. Please type 8 words at least"
                return res.render('auth/register', {
                    message
                })
            }

            if(req.body.username.length < 2) {
                message = "The username is so short. Please type 3 words at least"
                return res.render('auth/register', {
                    message
                })
            }

            User.find({username: req.body.username})   
                .then((user) => {
                    if(user == null) {
                        message = "The username which you used existed! Please use another username!"
                        return res.render('auth/register', {
                            message
                        })
                    } else {
                        var userRg = {}
                        userRg.username = req.body.username
                        userRg.password = req.body.password
                        userRg.email = req.body.email
                        
                        const newUser = new User(userRg)
                        newUser.save()
                            .then(() => {
                                const messageSuccess = 'Congratulations on your registering successfully!'
                                res.render('auth/register', {
                                    messageSuccess
                                })
                            })
                            .catch(() => {
                                message = "The username which you used existed! Please use another username!"
                                return res.render('auth/register', {
                                    message
                                })
                            })
                    }
                })
        } catch (error) {
            return res.render('error/error')
        }
    }

    userLogout(req, res, next) {
        req.session.userId = null
        return res.redirect('/')
    }

}

module.exports = new AuthController()