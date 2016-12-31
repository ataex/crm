let express                 = require('express');
let router                  = express.Router();
let Candidate               = require('./../models/candidate');
let { ObjectID }            = require('mongodb');
let _                       = require('lodash');
let accountId = '586590668201eee091f23008';

// Get all candidates
router.get('/', (req, res, next)    => {
    Candidate.find().then((candidates) => res.send(candidates)).catch((e) => res.status(400).send(e))
});

// Get candidate
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();

    Candidate.findById(id).then((candidate) => res.send(candidate)).catch((e) => res.status(400).send(e));
});

// Create candidate
router.post('/', (req, res, next) => {

    let candidate = new Candidate(req.body);
    candidate._account = accountId;

    candidate.save().then((doc) => res.send(doc)).catch((e) => res.status(400).send(e));
});

// Update candidate
router.patch('/:id', (req, res, next) => {

    let id      = req.params.id;
    let body    = _.pick(req.body, ['firstname', 'lastname', 'email', 'birthdate', 'phone', 'availableAt', 'availableUntil']);

    if(!ObjectID.isValid(id)) res.status(400).send();

    Candidate.findByIdAndUpdate(id, { $set : body }, { new : true }).then((candidate) => res.send(candidate)).catch((e) => res.status(400).send(e));
});

// Delete candidate
router.delete('/:id', (req, res, next) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();

    Candidate.findByIdAndRemove(id).then((candidate) => res.send(candidate)).catch((e) => res.status(400).send());
});

module.exports = router;
