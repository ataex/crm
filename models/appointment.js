const mongoose = require('mongoose');

let Appointment = mongoose.model('Appointment', {

    _recruiter : {
        type: mongoose.Schema.ObjectId,
        ref : 'Recruiter'
    },
    _candidate : {
        type: mongoose.Schema.ObjectId,
        ref : 'Candidate'
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

module.exports = Appointment;