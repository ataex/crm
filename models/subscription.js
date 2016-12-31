const mongoose = require('mongoose');

let Subscription = mongoose.model('Subscription', {

    total : {
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
    updatedAt : {
        type : Date,
        default : Date.now()
    },
    deletedAt : {
        type : Date,
        default : null
    }
});

module.exports = Subscription;