const express = require('express')
const router = express.Router()

const listComicController = require('../app/controllers/ListComicController')

router.get('/', listComicController.showList)

module.exports = router