const siteRouter = require('./site')
const adminRouter = require('./admin')
const comicRouter = require('./comic')
const genreRouter = require('./genre')
const listComicRouter = require('./listComic')
// const secureRouter = require('./secure')
const searchRouter = require('./search')
const historyRouter = require('./history')

function route(app) {
    app.use('/history', historyRouter)
    app.use('/getComic', searchRouter)
    // app.use('/secure', secureRouter)
    app.use('/list-comic', listComicRouter)
    app.use('/genre', genreRouter)
    app.use('/comic', comicRouter)
    app.use('/admin', adminRouter)
    app.use('/', siteRouter)
    app.use('*', (req, res) => {
        return res.render('error/error')
    })
}

module.exports = route