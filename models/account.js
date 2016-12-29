const mongoose = require('mongoose');

let Account = mongoose.model('Account', {

    firstname : {
        type: String,
        required : true,
        trim : true
    },
    lastname : {
        type: String,
        required : true,
        trim : true
    },
    company : {
        type: String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,

    },
    updatedAt : {
        type : Date,
        default : Date.now()
    },
    deletedAt : {
        type : Date,
        default : null
    }
});

module.exports = Account;