const dotEnv = require('dotenv')

dotEnv.config()

module.exports = {
    DATABASE_URI : process.env.MONGODB_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPRIES_TIME: process.env.ACCESS_TOKEN_EXPRIES_TIME,
    REFRESH_TOKEN_EXPRIES_TIME: process.env.REFRESH_TOKEN_EXPRIES_TIME,
    PORT : process.env.PORT,
    HOST_CLIENT_DOMAIN: process.env.HOST_CLIENT_DOMAIN
}