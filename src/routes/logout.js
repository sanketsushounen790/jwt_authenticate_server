const express = require('express')
const router = express.Router()

const {logoutControllers} = require('../controllers')

router.get('/logout', logoutControllers.handleLogout)

module.exports = router