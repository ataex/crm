const mongoose  = require('mongoose');

let Candidate = mongoose.model('Candidate', {

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
        default : null
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    phone : {
        type : Number,
        trim : true,
        default : null
    },
    availableAt : {
        type : Date,
        default : null
    },
    availableUntil : {
        type : Date,
        default : null
    },
    _account : {
        type : mongoose.Schema.ObjectId,
        ref :  'Account',
        required : true
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    },
    deletedAt : {
        type : Date,
        default : null
    },
});

module.exports = Candidate;