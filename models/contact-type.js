const mongoose = require('mongoose');

let ContactType = mongoose.model('ContactType', {

    name : {
        type : String,
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

module.exports = ContactType;