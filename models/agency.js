const mongoose = require('mongoose');

let Agency = mongoose.model('Agency', {

    name : {
        type: String,
        required : true,
        trim : true
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Agency;