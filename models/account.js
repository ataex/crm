const mongoose = require('mongoose');

let Account = mongoose.model('Account', {

    company : {
        type: String,
        required : true,
        trim : true
    },
    stripe : {
        type : String
    }
});

module.exports = Account;