const mongoose  = require('mongoose');

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
    _office : {
        type : mongoose.Schema.ObjectId,
        ref : 'Company',
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

module.exports = CompanyOffice;