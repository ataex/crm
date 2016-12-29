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
    _account : {
        type: mongoose.Schema.ObjectId,
        ref : 'Company',
        required : true
    },
    _agency : {
        type : mongoose.Schema.ObjectId,
        ref : 'Agency'
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

module.exports = Recruiter;