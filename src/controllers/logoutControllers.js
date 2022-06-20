const {AccountModel} = require('../models')

const handleLogout = async (req, res) => {
    //On client, also delete the accessToken here
    //grab the refreshToken from cookies
    const refreshToken = req?.cookies?.jwt

    //if it doesn't have any refreshToken in cookies, account already logout
    if (!refreshToken) return res.sendStatus(204) //No content to sendback

    //else it does, check if refreshToken exists in DB(find the acount that have it)
    const foundAccount = await AccountModel.findOne({ refreshToken })

    //if refreshToken is not found in any account in DB
    if (!foundAccount) {
        //clear the refreshToken in cookies
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }

    //else it does exists in DB(a account have it), delete refreshToken in DB
    foundAccount.refreshToken = ""
    const updatedAccount = await foundAccount.save()

    console.log(updatedAccount)

    //clear the refreshToken in cookies
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }) //secure: true - only serves on https
    res.sendStatus(204)
}

module.exports = {
    handleLogout
}