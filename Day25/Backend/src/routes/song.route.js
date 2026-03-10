const express = require('express')
const upload = require('../middleware/upload.middleware')
const {uploadsong,getSong}= require('../controller/song.controller')
const router = express.Router()

router.post('/',upload.single('song'),uploadsong)

router.get('/',getSong)


module.exports = router