const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const Subscription  = require('./subscription');

let accountSchema = new Schema({

    company : {
        type: String,
        required : true,
        trim : true
    },
    stripe : {
        type : String
    },
    _subscription : {
        type : Schema.ObjectId,
        ref : 'Subscription'
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

accountSchema.methods.isCancelled = function() {
    return !!this.cancelledAt;
};

accountSchema.methods.isDisabled = function() {
    return !!this.disabledAt;
};

accountSchema.methods.isEnabled = function() {
    return !!this.enabledAt;
};

accountSchema.methods.isActive = function() {
    return !!(!this.isCancelled() && !isDisabled() && isEnabled());
};

accountSchema.methods.getSubscription = function() {
    Subscription
        .findById(this._subscription)
        .then(subscription => {
            return subscription;
        })
        .catch(e => e)
};

module.exports = mongoose.model('Account', accountSchema);