const express = require('express')
const router = express.Router()

const historyController = require('../app/controllers/HistoryController')

router.get('/', historyController.history)

module.exports = router