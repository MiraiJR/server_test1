const express = require('express')
const router = express.Router()

const secureController = require('../app/controllers/SecureController')

router.get('/login', secureController.loginPage)

module.exports = router