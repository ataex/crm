const mongoose = require('mongoose');

let Job = mongoose.model('Job', {

    sex : {
        type : Boolean,
        required : true,
    },
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

module.exports = Job;