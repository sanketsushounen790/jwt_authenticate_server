const {HOST_CLIENT_DOMAIN} = require('./enviromentVars')

const allowedOrigins = [
    HOST_CLIENT_DOMAIN
]

module.exports = allowedOrigins