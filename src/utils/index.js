const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPRIES_TIME,
    REFRESH_TOKEN_EXPRIES_TIME
} = require('../configs/enviromentVars')

const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPRIES_TIME }
    )
}

const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPRIES_TIME }
    )
}

const verifyRefreshToken = (refeshToken, payload) => {
    let result = new Boolean
    jwt.verify(
        refeshToken,
        REFRESH_TOKEN_SECRET,
        (error) => {
            if (error){
                result = false
            }
            else {
                result = true
            }
        }
    )

    return result
}

const verifyRefreshTokenAndReturnDecoded = (refeshToken) => {
    try {
        return jwt.verify(
            refeshToken,
            REFRESH_TOKEN_SECRET
        )
    } catch (error) {
        if(error) return {}
    }
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

const hashedPassword = (password, salt) => {
    return bcrypt.hash(password, salt)
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    verifyRefreshTokenAndReturnDecoded,
    comparePassword,
    hashedPassword
}