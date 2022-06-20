const mongoose = require('mongoose')
const { DATABASE_URI } = require('../configs/enviromentVars')

module.exports = async () => {
    try {
        await mongoose.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected successfully !')

    } catch (error) {
        console.log('Connect to Database error')
        console.error(error)
    }
}
