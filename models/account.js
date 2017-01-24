const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

let accountSchema = new Schema({

    company : {
        type: String,
        required : true,
        trim : true
    },
    stripe : {
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

let Account = mongoose.model('Account', accountSchema);

module.exports = Account;