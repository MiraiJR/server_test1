const express = require('express')
const router = express.Router()

const adminController = require('../app/controllers/AdminController')

router.post('/create', adminController.create)
router.get('/', adminController.admin)

module.exports = router