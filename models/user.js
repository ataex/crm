const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let userSchema = new Schema ({

    firstname : {
        type: String,
        trim : true
    },
    lastname : {
        type: String,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    roles : {
        type : Array
    },
    active : {
        type : Boolean,
        default : false
    },
    _account : {
        type: Schema.ObjectId,
        ref : 'Company',
        required : true
    },
    _agency : {
        type : Schema.ObjectId,
        ref : 'Agency'
    },
    _type : {
        type : String,
        ref : 'UserType'
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;