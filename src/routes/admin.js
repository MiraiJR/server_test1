const express = require('express')
const router = express.Router()

const adminController = require('../app/controllers/AdminController')

router.get('/create-comic', adminController.createComic)
router.put('/:id', adminController.updateChapter)
router.delete('/:id', adminController.delete)
router.get('/:id/edit', adminController.edit)
router.post('/create', adminController.create)
router.get('/library-comic', adminController.libraryComic)
// router.get('/', adminController.libraryComic)

module.exports = router