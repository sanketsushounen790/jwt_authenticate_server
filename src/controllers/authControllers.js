const { AccountModel } = require('../models')
const {
    generateAccessToken,
    generateRefreshToken,
    comparePassword
} = require('../utils')

const handleLoginWithUsername = async (req, res) => {
    //grab username and password
    const { username, password } = req?.body

    //check if username and password has value
    if (!username || !password) {
        return res.status(400).json({ 'message': 'username and password are required !' })
    }

    //finding user existing account
    const foundAccount = await AccountModel.findOne({ username })

    //if cannot find the specific account --> username is not correct or user has not register
    if (!foundAccount) {
        return res.status(401).json({ "message": "username is not correct or user has not register yet !" }) //Unauthorized
    }

    //else if found account but activeStatus = false --> account has been ban
    if (!foundAccount.activeStatus) {
        return res.status(403).json({ "message": `your account @${foundAccount.username} has been banned !` })
    }

    //else, evaluate password
    const validPassword = await comparePassword(password, foundAccount.password)

    //if it's a valid password: send back accessToken in json, refreshToken in cookies
    if (validPassword) {
        //create JWTs here
        const accessToken = generateAccessToken({
            "username": foundAccount.username,
            "id": foundAccount._id
        })

        const refreshToken = generateRefreshToken({
            "username": foundAccount.username,
            "id": foundAccount._id
        })

        //saving refreshToken for current user
        foundAccount.refreshToken = refreshToken
        const updatedAccount = await foundAccount.save()
        console.log(updatedAccount)

        //send back accessToken in json, refreshToken in cookies
        res.cookie('jwt', refreshToken, { htttpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None' })
        res.status(200).json({ accessToken })

    } else {
        //else if password is not valid
        return res.status(401).json({ "message": "password are not correct !" }) //unauthorized
    }
}

const handleLoginWithEmail = async (req, res) => {
    //grab email and password
    const { email, password } = req?.body

    //check if email and password has value
    if (!email || !password) {
        return res.status(400).json({ 'message': 'email and password are required !' })
    }

    //finding user existing account
    const foundAccount = await AccountModel.findOne({ email })

    //if cannot find the specific account --> email is not correct or user has not register
    if (!foundAccount) {
        return res.status(401).json({ "message": "email is not correct or user has not register yet !" }) //Unauthorized
    }

    //else if found account but activeStatus = false --> account has been ban
    if (!foundAccount.activeStatus) {
        return res.status(403).json({ "message": `your account @${foundAccount.username} has been banned !` })
    }

    //else, evaluate password
    const validPassword = await comparePassword(password, foundAccount.password)

    //if it's a valid password: send back accessToken in json, refreshToken in cookies
    if (validPassword) {
        //create JWTs here
        const accessToken = generateAccessToken({
            "username": foundAccount.username,
            "id": foundAccount._id
        })

        const refreshToken = generateRefreshToken({
            "username": foundAccount.username,
            "id": foundAccount._id
        })

        //saving refreshToken for current user
        foundAccount.refreshToken = refreshToken
        const updatedAccount = await foundAccount.save()
        console.log(updatedAccount)

        //send back accessToken in json, refreshToken in cookies
        res.cookie('jwt', refreshToken, { htttpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', secure: true })
        res.status(200).json({ accessToken })

    } else {
        //else if password is not valid
        return res.status(401).json({ "message": "password are not correct !" }) //unauthorized
    }
}

module.exports = {
    handleLoginWithUsername,
    handleLoginWithEmail
}