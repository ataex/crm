const mongoose  = require('mongoose');

let Agency = mongoose.model('Agency', {

    name : {
        type: String,
        required : true,
        trim : true
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
    }
});

module.exports = Agency;