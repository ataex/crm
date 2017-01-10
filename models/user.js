const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt    = require('bcryptjs');

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
        trim : true,
        unique : true
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
    token : {
        type : String
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

userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.token;
        delete ret.password;
        return ret;
    }
});

userSchema.pre('save', (next) => {
    let user = this;

    if(this.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;