const { AccountModel } = require('../models')
const { generateAccessToken,
        generateRefreshToken,
        verifyRefreshTokenAndReturnDecoded } = require('../utils')

const refreshAccessToken = async (req, res) => {
    //grab the refeshToken in cookies
    const refreshToken = req?.cookies?.jwt

    //if client didn't have the refeshToken store in cookies --> it means they're not login
    if (!refreshToken) return res.status(401).send({ "message": "cannot found any cookies, please login" }) //unauthorized

    //else if they have the refeshToken, find it in database
    const foundAccount = await AccountModel.findOne({ refreshToken })

    //if refeshToken not found on any account in database
    if (!foundAccount) { 
        return res.status(403).json({"message": "refresh token expired !"}) //Forbidden
    }

    //else refeshToken is found on an account in database
    //evaluate it then create new accessToken and send back to client
    const validRefreshToken = verifyRefreshTokenAndReturnDecoded(refreshToken)

    console.log(validRefreshToken)

    //first check if it's valid or not
    //if it's not a valid token --> token expried
    if (!validRefreshToken || (validRefreshToken.username !== foundAccount.username && validRefreshToken.id !== foundAccount._id)) {
        return res.status(403).json({ "message": "unvalid refresh token" }) //forbiden
    }
    else {
        //else(valid normally) sign new accessToken, new refreshToken and send back to frontend
        const newAccessToken = generateAccessToken({
            "username": foundAccount.username,
            "id": foundAccount._id
        })

        const newRefreshToken = generateRefreshToken({
            "username": foundAccount.username,
            "id": foundAccount._id
        })

        // saving refreshToken with current account
        foundAccount.refreshToken = newRefreshToken
        const updatedAccount = await foundAccount.save()
        console.log(updatedAccount)

        //send back newAccessToken
        res.json({ newAccessToken })
    }
}

module.exports = {
    refreshAccessToken
}