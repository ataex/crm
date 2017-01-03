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

let Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;