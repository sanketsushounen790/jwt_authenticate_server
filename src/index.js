const express = require('express')
const { PORT } = require('./configs/enviromentVars')
const { databaseConnection } = require('./database')
const expressApp = require('./express-app')

const StartServer = async () => {

    const app = express()

    await databaseConnection()

    await expressApp(app)

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}\nPress Ctrl + C to terminate...`)
    })
    .on('error', (err) => {
        console.log('Connect to server error')
        console.log(err)
    })
}

StartServer()