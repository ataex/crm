let express                 = require('express');
let router                  = express.Router();
let User                    = require('./../models/user');
let { ObjectID }            = require('mongodb');
let _                       = require('lodash');
let accountId               = '586590668201eee091f23008';

// Get all users
router.get('/', (req, res, next)    => {
    User.find().then((user) => res.send(user)).catch((e) => res.status(400).send(e))
});

// Get user
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();

    User.findById(id).then((user) => res.send(user)).catch((e) => res.status(400).send(e));
});

// Create user
router.post('/', (req, res, next) => {

    let user        = new User(req.body);
    user._account   = accountId;

    user.save().then((doc) => res.send(doc)).catch((e) => res.status(400).send(e));
});

// Update user
router.patch('/:id', (req, res, next) => {

    let id      = req.params.id;
    let body    = _.pick(req.body, ['firstname', 'lastname', 'email', 'birthdate', 'phone', 'availableAt', 'availableUntil']);

    if(!ObjectID.isValid(id)) res.status(400).send();

    User.findByIdAndUpdate(id, { $set : body }, { new : true }).then((user) => res.send(user)).catch((e) => res.status(400).send(e));
});

// Delete user
router.delete('/:id', (req, res, next) => {

    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();

    User.findByIdAndRemove(id).then((user) => res.send(user)).catch((e) => res.status(400).send());
});

// Authenticate user
router.post('/authenticate', (req, res, next) => {

    let user        = new User(req.body);
    user._account   = accountId;

    user.save().then((doc) => res.send(doc)).catch((e) => res.status(400).send(e));
});

module.exports = router;
