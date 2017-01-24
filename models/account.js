const mongoose = require('mongoose');

let Account = mongoose.model('Account', {

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

Account.methods.isCancelled = function() {
    return !!this.cancelledAt;
};

Account.methods.isDisabled = function() {
    return !!this.disabledAt;
};

Account.methods.isEnabled = function() {
    return !!this.enabledAt;
};

Account.methods.isActive = function() => {
    return !this.isCancelled() && !isDisabled() && isEnabled() ? true : false;
};

module.exports = Account;