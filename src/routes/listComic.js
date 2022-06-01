const express = require('express')
const router = express.Router()

const listComicController = require('../app/controllers/listComicController')

router.get('/', listComicController.showList)

module.exports = router