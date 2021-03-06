const express = require('express')
const router = express.Router()

const comicController = require('../app/controllers/ComicController')

router.get('/:slug/:slugChapter', comicController.showChapter)
router.get('/:slug', comicController.showComic)

module.exports = router