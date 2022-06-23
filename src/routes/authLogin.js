const express = require('express')
const router = express.Router()

const authController = require('../app/controllers/AuthController')

router.get('/', authController.loginPage)
router.post('/', authController.userLogin)

module.exports = router