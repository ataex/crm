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
    }
});

module.exports = UserType;