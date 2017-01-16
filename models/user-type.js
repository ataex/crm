const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let userTypeSchema = new Schema({

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

let UserType = mongoose.model('UserType', userTypeSchema);
module.exports = UserType;