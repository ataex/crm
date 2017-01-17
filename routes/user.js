let express         = require('express');
let router          = express.Router();
let User            = require('./../models/user');
let { ObjectID }    = require('mongodb');
let _               = require('lodash');
let security        = require('./../services/security');

// Get all users
router.get('/', (req, res, next)    => {
    User.find({ _account : req.user._account, type: { $ne : 'owner', $ne : 'admin' } })
        .then(users => res.send(users))
        .catch(e => res.status(400).send(e));
});

// Get a user
router.get('/:id', (req, res, next) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send({ error : 'object_id_not_valid' });

    User
        .findById(id).then(user => {
            if(!user) res.status(400).send({ error : 'document_not_found' });
            return security.checkModel(req, user);
        })
        .then(user => res.send(user.toJSON()), error => res.status(403).send(error))
        .catch(e => res.status(400).send(e));
});

// Create a user
router.post('/', (req, res, next) => {

    let body        = _.pick(req.body, ['firstname', 'lastname', 'email', 'phone', 'password']);
    let user        = new User(body);
    user._account   = req.user._account;

    user.save().then(user => res.send(user.toJSON())).catch(e => res.status(400).send(e));
});

// Update a user
router.patch('/:id', (req, res, next) => {

    let id = req.params.id;

    if(!ObjectID.isValid(id)) res.status(400).send({ error : 'object_id_not_valid' });

    User.findById(id)
        .then(user => {
            if(!user) res.status(400).send({ error : 'document_not_found' });
            return security.checkModel(req, user);
        })
        .then(
            user => {
                let body = _.pick(req.body, ['firstname', 'lastname', 'email', 'phone']);
                Object.assign(user, body);
                user.save();
                res.send(user.toJSON());
            },
            error => {
                res.status(403).send(error);
            }
        )
        .catch(e => res.status(400).send(e));
});

// Delete user
router.delete('/:id', (req, res, next) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send({ error : 'object_id_not_valid' });

    User
        .findById(id)
        .then(user => {
            if(!user) res.status(400).send({ error : 'document_not_found' });
            return security.checkModel(req, user);
        })
        .then(
            user => {
                user = user.remove();
                res.send(user.toJSON());
            },
            error => res.status(403).send(error)
        )
        .catch(e => res.status(400).send());
});

module.exports = router;
