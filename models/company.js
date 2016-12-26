const mongoose = require('mongoose');

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
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Candidate;