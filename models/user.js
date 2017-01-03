const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let userSchema = new Schema ({

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
        type : Schema.ObjectId,
        ref : 'UserType'
    },
    deletedAt : {
        type : Date,
        default : null
    }
});

userSchema.plugin(require('./../plugins/updated-at'));

let User = mongoose.model('User', userSchema);

module.exports = User;