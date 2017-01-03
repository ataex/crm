const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

candidateSchema = new Schema({

    firstname : {
        type: String,
        required : true,
        trim : true
    },
    lastname : {
        type: String,
        required : true,
        trim : true
    },
    birthdate : {
        type : Date,
        default : null
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    phone : {
        type : Number,
        trim : true,
        default : null
    },
    _account : {
        type : Schema.ObjectId,
        ref :  'Account',
        required : true
    }
});

let Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;