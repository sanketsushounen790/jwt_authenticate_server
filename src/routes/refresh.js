const express = require('express')
const router = express.Router()

const {refreshControllers} = require('../controllers')

router.get('/refresh', refreshControllers.refreshAccessToken)

module.exports = router