let express             = require('express');
let router              = express.Router();
let { ObjectID }        = require('mongodb');
let _                   = require('lodash');
let accountId           = '586590668201eee091f23008';
let Subscription        = require('./../models/subscription');
let Account             = require('./../models/account');
let User                = require('./../models/user');
let bcrypt              = require('bcryptjs');

// Create account and admin user
router.post('/register', (req, res, next) => {

    // Create account
    let account         = new Account(req.body);
    account.save().then((account) => {
        // Create subscription
        let subscription    = new Subscription({ token : bcrypt.genSaltSync(10), _account : account._id });
        subscription.save();

        // Create amin user
        let user       = new User({ type : 'admin', _account : account._id });
        user.save();
    }).catch((e) => res.status(400).send(e));

    user.save().then((doc) => res.send(doc)).catch((e) => res.status(400).send(e));
});

// Create account and admin user
router.post('/activate/:token', (req, res, next) => {

    Subscription
        .findOneAndUpdate({ token : req.params.token }, {  $set : req.body }, { new : true } )
        .then((subscription) => {
            subscription.enabledAt = new Date;


        })
        .catch((e) => res.status(400).send());

    let user        = new User(req.body);
    user._account   = accountId;

    user.save().then((doc) => res.send(doc)).catch((e) => res.status(400).send(e));
});



module.exports = router;
