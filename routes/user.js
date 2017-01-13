let express         = require('express');
let router          = express.Router();
let User            = require('./../models/user');
let { ObjectID }    = require('mongodb');
let _               = require('lodash');
let sendgrid        = require('./../services/sendgrid');
let crypto          = require('crypto');
let config          = require('./../config/config');
let bcrypt          = require('bcryptjs');
let jwt             = require('jsonwebtoken');


// Get all users
router.get('/', (req, res, next)    => {
    User.find().then((user) => res.send(user)).catch((e) => res.status(400).send(e))
});

// Create user
router.post('/', (req, res, next) => {

    let user        = new User(req.body);
    user._account   = accountId;

    user.save().then((doc) => res.send(doc)).catch((e) => res.status(400).send(e));
});

router.delete('/logout', (req, res, next) => {
    res.removeHeader('X-Auth-Token');
    res.send();
});

router.post('/login', (req, res, next) => {

    let data = _.pick(req.body, ['email', 'password']);

    if(_.isEmpty(data) || !data.email || !data.password) res.status(401).send({ error : 'data_not_valid' });

    // Get user with email
    User.findOne({ email : data.email })
        .populate('_account')
        .then((user) => {
            // If user found
            if(user) {
                // Check password
                bcrypt.compare(data.password, user.password, (error, result) => {
                    // If password is valid
                    if(result) {
                        // Create token
                        let name    = user.firstname && user.lastname ? user.firstname+' '+user.lastname : user._account.name;
                        let token = jwt.sign({ id : user._id, name }, config.secret);
                        res.header({ 'X-Auth-Token' : token }).send();
                    }
                    else {
                        res.status(401).send({ error : 'password_not_valid' });
                    }
                });
            }
            else {
                res.status(401).send({ error : 'user_not_found' });
            }
        }).
    catch((e) => res.status(401).send(e));
});

router.post('/forgot-password', (req, res, next) => {

    // Find user with given email
    User.findOne({ email : req.body.email }).then((user) => {
        // User found
        if(user) {
            // Check last time user requested forgot-password
            let now                  = time();
            let requestePasswordAt   = user.requestPasswordAt ? user.requestPasswordAt.getTime() : time();

            // If forgot-password requested in the last 24 hours
            if(now - requestePasswordAt <= (24 * 60 * 60)) {
                res.send(400).send({ error : 'password_already_requested' });
            }
            else {
                user.requestPasswordAt = new Date();
                user.token = crypto.randomBytes(32).toString('hex');
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
            res.send(user.toJSON());
        });
    })
    .catch((e) => res.status(400).send(e));
});

router.post('/reset-password/:token', (req, res, next) => {

    // Find user with given token
    User.findOne({ token : req.params.token }).then((user) => {
        // User found
        if(user) {
            // User email matches
            if(user.email == req.body.email){
                user.password = req.body.password;
                return user.save();
            }
            else {
                res.status(400).send({ error : 'user_not_found' });
            }
        }
        else {
            res.status(400).send({ error : 'user_not_found' });
        }
    })
    .then((user) => {
        res.send(user.toJSON());
    })
    .catch((e) => res.status(400).send(e));
});

// Get user
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)) res.status(400).send();

    User.findById(id).then((user) => res.send(user)).catch((e) => res.status(400).send(e));
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

module.exports = router;
