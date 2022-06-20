const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    return res.json({"message": "Hi ! I'm alive !"})
})

module.exports = router