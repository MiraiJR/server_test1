const siteRouter = require('./site')
const adminRouter = require('./admin')
const comicRouter = require('./comic')
const genreRouter = require('./genre')
const listComicRouter = require('./listComic')

function route(app) {
    app.use('/list-comic', listComicRouter)
    app.use('/genre', genreRouter)
    app.use('/comic', comicRouter)
    app.use('/admin', adminRouter)
    app.use('/', siteRouter)
}

module.exports = route