const mongoose  = require('mongoose');

let Industry = mongoose.model('Industry', {

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

module.exports = Industry;