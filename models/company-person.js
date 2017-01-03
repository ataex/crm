const mongoose  = require('mongoose');

let CompanyPerson = mongoose.model('CompanyPerson', {

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
    email : {
        type: String,
        required : true
    },
    phone : {
        type : Number
    },
    _company : {
        type : mongoose.Schema.ObjectId,
        ref : 'Company',
        required : true
    }
});

module.exports = CompanyPerson;