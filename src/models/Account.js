const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        max: 20,
        min: 6
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        max: 20,
        min: 6
    },
    activeStatus: {
        type: Boolean,
        default: true
    },
    refreshToken: {
        type: String
    },
});

module.exports =  mongoose.model('Account', accountSchema);