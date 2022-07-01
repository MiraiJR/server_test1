const siteRouter = require('./site')
const adminRouter = require('./admin')
const comicRouter = require('./comic')
const genreRouter = require('./genre')
const listComicRouter = require('./listComic')
const authLoginRouter = require('./authLogin')
const authRegisRouter = require('./authRegis')
const searchRouter = require('./search')
const historyRouter = require('./history')
const meRouter = require('./me')
const logoutRouter = require('./authLogout')
const authMw = require('../util/AuthMiddleware')

function route(app) {
    app.use('/logout', logoutRouter)
    app.use('/me', authMw.requireAuth, meRouter)
    app.use('/history', historyRouter)
    app.use('/getComic', searchRouter)
    app.use('/login', authLoginRouter)
    app.use('/register', authRegisRouter)
    app.use('/list-comic', listComicRouter)
    app.use('/genre', genreRouter)
    app.use('/comic', comicRouter)
    app.use('/admin', authMw.requireAuth, authMw.authAdmin, adminRouter)
    app.use('/', siteRouter)
    app.use('*', (req, res) => {
        return res.render('error/error')
    })
}

module.exports = route