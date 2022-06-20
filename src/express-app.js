const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {corsOptions} = require('./configs')
const {credentials} = require('./middlewares')
const { auth, register, logout, refresh, root, catchAll } = require('./routes')

module.exports = async (app) => {

    //express app configs
    // Handle options credentials check - before CORS!
    // and fetch cookies credentials requirement
    app.use(credentials)
    app.use(cors(corsOptions))
    app.use(express.urlencoded({ extended: true, limit: '1mb' }))
    app.use(express.json({ limit: '1mb' }))
    app.use(cookieParser())

    //routes
    app.use(root)
    app.use(auth)
    app.use(register)
    app.use(logout)
    app.use(refresh)
    app.use(catchAll)

    // error handling
}