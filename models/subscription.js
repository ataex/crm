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