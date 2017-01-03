const mongoose = require('mongoose');

let ContactType = mongoose.model('ContactType', {

    name : {
        type : String,
        required : true
    }
});

module.exports = ContactType;