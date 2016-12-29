const mongoose  = require('mongoose');

let Job = mongoose.model('Job', {

    company : {
        type: mongoose.Schema.ObjectId,
        ref : 'Company',
        required : true
    },
    agency : {
        type : mongoose.Schema.ObjectId,
        ref : 'Agency'
    },
    title : {
        type: String,
        required : true,
        trim : true
    },
    active : {
        type : Boolean,
        default : false
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Job;