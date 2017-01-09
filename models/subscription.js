const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let subscriptionSchema = new Schema({

    subtotal : {
        type: Number,
        required : true,
        trim : true,
        default : 0
    },
    currency : {
        type : String
    },
    stripe : {
        type : String
    },
    token : {
        type : String
    },
    _account : {
        type : Schema.ObjectId,
        ref : 'Account',
        required : true
    },
    cancelledAt : {
        type : Date,
        default : null
    },
    disabledAt : {
        type : Date,
        default : null
    },
    enabledAt : {
        type : Date,
        default : null
    }
});

subscriptionSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.token;
        return ret;
    }
});

let Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;