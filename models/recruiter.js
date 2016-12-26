const mongoose = require('mongoose');

let Recruiter = mongoose.model('Recruiter', {

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
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    active : {
        type : Boolean,
        default : false
    },
    agency : {

    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Recruiter;