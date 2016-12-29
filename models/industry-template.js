const mongoose  = require('mongoose');

let IndustryTemplate = mongoose.model('IndustryTemplate', {

    slug : {
        type: String,
        required : true,
        trim : true
    },
    name : {
        type: String,
        required : true,
        trim : true
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

module.exports = IndustryTemplate;