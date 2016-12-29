const mongoose = require('mongoose');

let CandidateAppointment = mongoose.model('CandidateAppointment', {

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
    name : {
        type : String
    },
    agenda : {
        type : String
    },
    recap : {
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

module.exports = CandidateAppointment;