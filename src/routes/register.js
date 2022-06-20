const express = require('express')
const router = express.Router()

const {registerControllers} = require('../controllers')

router.post('/register', registerControllers.handleRegister)
router.post('/register/check-email', registerControllers.checkDuplicateEmail)
router.post('/register/check-username', registerControllers.checkDuplicateUsername)

module.exports = router