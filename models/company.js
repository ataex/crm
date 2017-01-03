const mongoose  = require('mongoose');

let Company = mongoose.model('Company', {

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
    birthdate : {
        type : Date,
        required : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    phone : {
        type : Number,
        trim : true
    },
    availableFrom : {
        type : Date
    },
    availableUntil : {
        type : Date
    },
    _account : {
        type : mongoose.Schema.ObjectId,
        ref :  'Account',
        required : true
    }
});

module.exports = Company;