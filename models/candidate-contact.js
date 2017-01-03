const mongoose = require('mongoose');

let CandidateContact = mongoose.model('CandidateContact', {

    _recruiter : {
        type: mongoose.Schema.ObjectId,
        ref : 'Recruiter',
        required : true
    },
    _candidate : {
        type: mongoose.Schema.ObjectId,
        ref : 'Candidate',
        required : true
    },
    _type : {
        type: mongoose.Schema.ObjectId,
        ref : 'ContactType'
    },
    name : {
        type : String
    },
    note : {
        type : String
    },
    at : {
        type : Date,
        required : true
    },
    reminderCandidate : {
        type : Boolean,
        default : false
    },
    reminderRecruiter : {
        type : Boolean,
        default : true
    }
});

module.exports = CandidateContact;