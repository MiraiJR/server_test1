const express = require('express')

const router = express.Router()

const meController = require('../app/controllers/MeController')

const multer = require('multer')

// upload file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/image/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "_" + file.originalname
        cb(null, fileName)
    }
})

const upload = multer({storage: storage})

router.put('/changeAvatarUser', meController.changeAvatarUser)
router.get('/uploadImage', upload.single('user_avatar'), meController.uploadImage)
router.post('/uploadImage', upload.single('user_avatar'), meController.uploadImage)
router.get('/library', meController.library)
router.get('/', meController.mePage)

module.exports = router