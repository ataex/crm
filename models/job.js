const mongoose  = require('mongoose');

let Job = mongoose.model('Job', {

    _company : {
        type: mongoose.Schema.ObjectId,
        ref : 'Company',
        required : true
    },
    _account : {
        type: mongoose.Schema.ObjectId,
        ref : 'Account',
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
    summary : {
        type : String
    },
    content : {
        type : String,
        required : true
    },
    active : {
        type : Boolean,
        default : false
    },
    publishedAt : {
        type : Date,
        default : Date.now()
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

module.exports = Job;