const express = require('express')
const router = express.Router()

const searchController = require('../app/controllers/SearchController')


router.put('/favouriteComic', searchController.favouriteComicPut)
router.put('/favouriteComicRemove', searchController.favouriteComicRemove)
router.get('/favouriteComic', searchController.favouriteComic)
router.get('/user', searchController.user)
router.post('/updateDBComic', searchController.updateDBComic)
router.post('/updateHistory', searchController.updateHistory)
router.get('/history', searchController.history)
router.post('/', searchController.search)

module.exports = router