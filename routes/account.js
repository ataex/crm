let express             = require('express');
let router              = express.Router();
let { ObjectID }        = require('mongodb');
let config              = require('./../config/config.js');
let _                   = require('lodash');
let Subscription        = require('./../models/subscription');
let Account             = require('./../models/account');
let User                = require('./../models/user');
let crypto              = require('crypto');
let sendgrid            = require('./../services/sendgrid');

// Create account and admin user
router.post('/register', (req, res, next) => {

    // Create account
    let account         = new Account(req.body);
    let accountSaved;
    let subscriptionSaved;

    account.save().then((account) => {
        // Create subscription
        let token           = crypto.randomBytes(32).toString('hex');
        accountSaved        = account;
        let subscription    = new Subscription({ token : token, _account : accountSaved._id });

        return subscription.save();
    })
    .then((subscription) => {
        subscriptionSaved = subscription;
        // Create amin user
        let user = new User({
            _type : 'admin',
            _account : accountSaved._id,
            email : req.body.email,
            password : req.body.password
        });

        return user.save();
    })
    .then((user) => {
        // Send email
        res.render('activate', { account : accountSaved, subscription : subscriptionSaved, user : user }, (error, html) => {
            if(error) res.status(400).send(error);
            sendgrid.send(user.email, 'activate_account', html);
            res.send(user);
        });
    })
    .catch((e) => res.status(400).send(e));
});

// Create account and admin user
router.post('/activate/:token', (req, res, next) => {

    Subscription
        .findOneAndUpdate({ token : req.params.token }, {  $set : { enabledAt : new Date } }, { new : true } ).populate('_account', '-token')
        .then((subscription) => {
            res.send(subscription.toJSON());
        })
        .catch((e) => res.status(400).send(e));
});


module.exports = router;
