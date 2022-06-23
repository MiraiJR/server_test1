const express = require('express')
const router = express.Router()

const authController = require('../app/controllers/AuthController')

router.post('/', authController.userLogout)

module.exports = router