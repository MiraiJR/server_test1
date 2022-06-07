const express = require('express')
const router = express.Router()

const secureController = require('../app/controllers/SecureController')

router.post('/login/userLogin', secureController.userLogin)
router.get('/login', secureController.loginPage)

module.exports = router