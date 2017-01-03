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
    }
});

module.exports = IndustryTemplate;