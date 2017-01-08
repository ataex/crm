let express                 = require('express');
let router                  = express.Router();
let User                    = require('./../models/user');
let { ObjectID }            = require('mongodb');
let _                       = require('lodash');
let sendgrid                = require('./../services/sendgrid');

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

router.post('/login', (req, res, next) => {

    let user        = new User(req.body);
    user._account   = accountId;

    user.save().then((doc) => res.send(doc)).catch((e) => res.status(400).send(e));
});

router.post('/forgot-password', (req, res, next) => {

    // Find user with given email
    User.findOne({ email : req.params.email }).then((user) => {
        // User found
       if(user) {
           // Check last time user requested forgot-password
           let now                  = time();
           let requestePasswordAt   = user.requestPasswordAt ? user.requestPasswordAt.getTime() : time();

           // If forgot-password requested in the last 24 hours
           if(now - requestePasswordAt <= (24 * 60 * 60)) {
                res.send(400).send({ error : 'password_already_request' });
           }
           else {
               user.requestPasswordAt = new Date();
               return user.save();
           }
       }
       else {
            res.status(400).send({ error : 'user_not_found' });
       }
    })
    .then((user) => {
        res.render('reset-password', { user : user }, (html, error) => {
            if(error) res.status(400).send(error);
            sendgrid.send(user.email, 'reset_password', html);
            res.send(user);
        });
    })
    .catch((e) => res.status(400).send(e));
});

router.post('/reset-password/:token', (req, res, next) => {

    // Find user with given email
    User.findOne({ token : req.params.token }).then((user) => {
        // User found
        if(user) {
            // Check last time user requested forgot-password
            let now                  = time();
            let requestePasswordAt   = user.requestPasswordAt ? user.requestPasswordAt.getTime() : time();

            // If forgot-password requested in the last 24 hours
            if(now - requestePasswordAt <= (24 * 60 * 60)) {
                res.send(400).send({ error : 'password_already_request' });
            }
            else {
                user.requestPasswordAt = new Date();
                return user.save();
            }
        }
        else {
            res.status(400).send({ error : 'user_not_found' });
        }
    })
        .then((user) => {
            res.render('reset-password', { user : user }, (html, error) => {
                if(error) res.status(400).send(error);
                sendgrid.send(user.email, 'reset_password', html);
                res.send(user);
            });
        })
        .catch((e) => res.status(400).send(e));
});

module.exports = router;
