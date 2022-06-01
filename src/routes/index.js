const siteRouter = require('./site')
const adminRouter = require('./admin')
const comicRouter = require('./comic')
const genreRouter = require('./genre')

function route(app) {
    app.use('/genre', genreRouter)
    app.use('/comic', comicRouter)
    app.use('/admin', adminRouter)
    app.use('/', siteRouter)
}

module.exports = route