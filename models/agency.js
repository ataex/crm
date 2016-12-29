const mongoose  = require('mongoose');

let Agency = mongoose.model('Agency', {

    name : {
        type: String,
        required : true,
        trim : true
    },
    _account : {
        type : mongoose.Schema.ObjectId,
        ref :  'Account'
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Agency;