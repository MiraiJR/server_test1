const express = require('express')
const router = express.Router()

const adminController = require('../app/controllers/AdminController')
const authMw = require('../util/AuthMiddleware')

router.get('/create-comic', adminController.createComic)
router.post('/create-comic', adminController.create)
router.put('/:id', adminController.updateChapter)
router.delete('/:id', adminController.delete)
router.get('/:id/edit', adminController.edit)
router.get('/library-comic', adminController.libraryComic)
router.get('/', (req, res, next) => {
    return res.redirect('/admin/library-comic')
})

module.exports = router