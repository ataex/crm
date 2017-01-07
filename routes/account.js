let express             = require('express');
let router              = express.Router();
let { ObjectID }        = require('mongodb');
let _                   = require('lodash');
let Subscription        = require('./../models/subscription');
let Account             = require('./../models/account');
let User                = require('./../models/user');
let crypto              = require('crypto-js');
let sendgrid            = require('./../services/sendgrid');

// Create account and admin user
router.post('/register', (req, res, next) => {

    // Create account
    let account         = new Account(req.body);
    let accountSaved;
    let subscriptionSaved;

    account.save().then((account) => {
        // Create subscription
        let token            = crypto.SHA256();
        console.log(token, token.toString());
        accountSaved        = account;
        let subscription    = new Subscription({ token : token, _account : accountSaved._id });

        return subscription.save();
    })
    .then((subscription) => {
        subscriptionSaved = subscription;
        // Create amin user
        let user = new User({ _type : 'admin', _account : accountSaved._id, email : req.body.email, password : req.body.password  });

        return user.save();
    })
    .then((user) => {
        // Send email
        res.render('activate', { account : accountSaved, subscription : subscriptionSaved }, (error, html) => {
            //sendgrid.send(user.email, 'Activate your account', html);
            res.send({ message : `An email has been sent to ${user.email}, please confirm your account.` });
        });
    })
    .catch((e) => res.status(400).send(e));
});

// Create account and admin user
router.post('/activate/:token', (req, res, next) => {

    Subscription
        .findOneAndUpdate({ token : req.params.token }, {  $set : req.body }, { new : true } )
        .then((subscription) => {
            subscription.enabledAt = new Date;
        })
        .catch((e) => res.status(400).send(e));

    let user        = new User(req.body);
    user._account   = accountId;

    user.save().then((doc) => res.send(doc)).catch((e) => res.status(400).send(e));
});


module.exports = router;
