const mongoose = require('mongoose');

let CompanyOffice = mongoose.model('CompanyOffice', {

    name : {
        type: String,
        required : true,
        trim : true
    },
    lat : {
        type: Number,
        required : true
    },
    lng : {
        type : Number,
        required : true
    },
    phone : {
        type : Number
    },
    // AddressObject
    address : {
        type : Number,
        trim : true
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = CompanyOffice;