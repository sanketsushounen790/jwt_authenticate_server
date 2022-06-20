const express = require('express')
const router = express.Router()

router.get('/*', (req, res) => {
    return res.json({ "message": `Cannot find the route for '${req.originalUrl}' url !` })
})

module.exports = router