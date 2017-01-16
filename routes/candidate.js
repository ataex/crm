let express                 = require('express');
let router                  = express.Router();
let Candidate               = require('./../models/candidate');
let { ObjectID }            = require('mongodb');
let _                       = require('lodash');
let security                = require('./../services/security')

// Get all candidates
router.get('/', (req, res, next)    => {

    Candidate.find({ _account : req.user._account })
        .then(candidates => res.send(candidates))
        .catch(e => res.status(400).send(e));
});

// Get a candidate
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();

    Candidate
        .findById(id).then(candidate => {
            if(!candidate) res.status(400).send();
            return security.checkModel(req, res, candidate);
        })
        .then(candidate => res.send(candidate.toJSON()), error => res.status(403).send(error))
        .catch(e => res.status(400).send(e));
});

// Create a candidate
router.post('/', (req, res, next) => {

    let body            = _.pick(req.body, ['firstname', 'lastname', 'email', 'phone']);
    let candidate       = new Candidate(body);
    candidate._account  = req.user._account;

    candidate.save().then(candidate => res.send(candidate.toJSON())).catch(e => res.status(400).send(e));
});

// Update a candidate
router.patch('/:id', (req, res, next) => {

    let id = req.params.id;

    if(!ObjectID.isValid(id)) res.status(400).send();

    Candidate.findOne({ _id : id, _account : req.user._account })
        .then((candidate) => {

            if(!candidate) res.status(400).send();
            security.checkModel(req, candidate);

            let body = _.pick(req.body, ['firstname', 'lastname', 'email', 'phone']);

            candidate.save();

            return Candidate.findByIdAndUpdate(id, { $set : body }, { new : true });
        })
        .then(candidate => res.send(candidate.toJSON()))
        .catch(e => res.status(400).send(e));
});

// Delete candidate
router.delete('/:id', (req, res, next) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();

    Candidate.findOne({ _id : id, _account : req.user._account }).then(candidate => {

        if(!candidate) res.status(400).send();
        security.checkModel(req, candidate);

        candidate = candidate.remove();

        res.send(candidate.toJSON());
    }).catch(e => res.status(400).send());
});


module.exports = router;
