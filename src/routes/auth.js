const express = require('express')
const router = express.Router()

const {authControllers} = require('../controllers')

router.post('/auth', authControllers.handleLoginWithUsername)
router.post('/auth/email', authControllers.handleLoginWithEmail)

module.exports = router