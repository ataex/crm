const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let subscriptionSchema = new Schema({

    subtotal : {
        type: String,
        required : true,
        trim : true
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
    },
    deletedAt : {
        type : Date,
        default : null
    }
});

subscriptionSchema.plugin(require('./../plugins/updated-at'));
let Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;