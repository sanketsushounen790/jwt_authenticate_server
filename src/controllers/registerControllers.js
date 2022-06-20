const { AccountModel } = require('../models')
const { hashedPassword } = require('../utils')

const handleRegister = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) return res.status(400).json({
        "message": "username, email and password are required !"
    })

    //check for duplicate username and email in DB
    const duplicateUsername = await AccountModel.findOne({username: username.toLowerCase()})
    const duplicateEmail = await AccountModel.findOne({email})

    //if username or email is duplicate return conflict error
    if (duplicateUsername && duplicateEmail){
        return res.status(409).json({ "message": "both username and email already been used by another person ! Please check it first !" }) 
    } else if(duplicateEmail){
        return res.status(409).json({ "message": "email already been used by another person ! Please check it first !" }) 
    } else if(duplicateUsername){
        return res.status(409).json({ "message": "username already been used by another person ! Please check it first !" }) 
    }

    try {
        //encrypt the password(hashed password)
        const encryptPassword = await hashedPassword(password, 10)

        //create new account
        const result = await AccountModel.create({
            "username": username.toLowerCase(),
            "email": email,
            "password": encryptPassword,
        })

        console.log(result)

        res.status(201).json({ 'message': `New user: ${username} created !` })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

const checkDuplicateEmail = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            "message": "email are required !"
        })
    }

    const foundEmail = await AccountModel.findOne({ email })

    if (foundEmail) {
        return res.status(403).json({
            "message": "This email already been used !"
        })
    } else {
        return res.status(200).json({
            "message": "Yes you can use this email !"
        })
    }
}

const checkDuplicateUsername = async (req, res) => {
    const { username } = req.body

    if (!username) {
        return res.status(400).json({
            "message": "email are required !"
        })
    }

    const foundUsername = await AccountModel.findOne({ username })

    if (foundUsername) {
        return res.status(403).json({
            "message": "This username already been used !"
        })
    } else {
        return res.status(200).json({
            "message": "Yes you can use this username !"
        })
    }
}

module.exports = {
    handleRegister,
    checkDuplicateUsername,
    checkDuplicateEmail
}
