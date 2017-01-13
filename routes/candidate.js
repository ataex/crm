let express                 = require('express');
let router                  = express.Router();
let Candidate               = require('./../models/candidate');
let { ObjectID }            = require('mongodb');
let _                       = require('lodash');

// Get all candidates
router.get('/', (req, res, next)    => {
    Candidate.find({ _account : req.user._account }).then(candidates => res.send(candidates)).catch(e => res.status(400).send(e));
});

// Get candidate
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();
    Candidate.findById(id).then(candidate => res.send(candidate.toJSON())).catch(e => res.status(400).send(e));
});

// Create candidate
router.post('/', (req, res, next) => {

    let candidate = new Candidate(req.body);
    candidate._account = req.user._account;

    candidate.save().then(candidate => res.send(candidate.toJSON())).catch(e => res.status(400).send(e));
});

// Update candidate
router.patch('/:id', (req, res, next) => {

    let id      = req.params.id;

    if(!ObjectID.isValid(id)) res.status(400).send();

    Candidate.findById(id)
        .then((candidate) => {

            if(!candidate) res.status(400).send();
            if(candidate._account.toString() != req.user._account._id.toString()) {
                res.status(403).send();
            }

            let body = _.pick(req.body, ['firstname', 'lastname', 'email', 'birthdate', 'phone', 'availableAt', 'availableUntil']);

            candidate.save({ lastname : 'oooo' });

            return Candidate.findByIdAndUpdate(id, { $set : body }, { new : true });
        })
        .then(candidate => res.send(candidate.toJSON()))
        .catch(e => res.status(400).send(e));
});

// Delete candidate
router.delete('/:id', (req, res, next) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();

    Candidate.findByIdAndRemove(id).then(candidate => res.send(candidate.toJSON())).catch(e => res.status(400).send());
});

module.exports = router;
