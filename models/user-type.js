const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let UserType = mongoose.model('UserType', {

    slug : {
        type: String,
        required : true,
        trim : true
    },
    name : {
        type : String,
        required : true,
        trim : true
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

module.exports = UserType;