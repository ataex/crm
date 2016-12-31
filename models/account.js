const mongoose = require('mongoose');

let Account = mongoose.model('Account', {

    company : {
        type: String,
        required : true,
        trim : true
    },
    stripe : {
        type : String
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