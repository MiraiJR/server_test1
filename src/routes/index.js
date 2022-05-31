const siteRouter = require('./site')
const adminRouter = require('./admin')
const comicRouter = require('./comic')

function route(app) {
    app.use('/comic', comicRouter)
    app.use('/admin', adminRouter)
    app.use('/', siteRouter)
}

module.exports = route