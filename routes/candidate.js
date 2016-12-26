let express                 = require('express');
let router                  = express.Router();
let Candidate               = require('./../models/candidate');
let { ObjectID }            = require('mongodb');
let _                       = require('lodash');

// Get all candidates
router.get('/', (req, res, next)    => {
    Candidate.find().then(
        (candidates) => { res.send(candidates) },
        (e) => { res.status(400).send(e); }
    )
});

// Get candidate
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(404).send();

    Candidate.findById(id).then((candidate) => {
        if(!candidate) res.status(404).send();
        res.send(candidate);
    }).catch((e) => res.status(400).send());
});

// Create candidate
router.post('/', (req, res, next) => {

    let candidate = new Candidate(req.body);

    candidate.save().then(
        (doc) => res.send(doc),
        (error) => res.status(400).send(error)
    );
});

// Update candidate
router.patch('/:id', (req, res, next) => {

    let id      = req.params.id;
    let body    = _.pick(req.body, ['firstname', 'lastname', 'email', 'birthdate', 'phone', 'availableFrom', 'availableUntil']);

    if(!ObjectID.isValid(id)) res.status(404).send();

    Candidate.findByIdAndUpdate(id, { $set : body }, { new : true }).then((candidate) => {
        if(!candidate) res.status(404).send();
        res.send(candidate)
    });

    Candidate.findOneAndUpdate();
});

// Delete candidate
router.delete('/:id', (req, res, next) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(404).send();

    Candidate.findByIdAndRemove(id).then((candidate) => {
        if(!candidate) res.status(404).send();
        res.send(candidate);
    }).catch((e) => res.status(400).send());
});

module.exports = router;
