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
    }
});

module.exports = Industry;