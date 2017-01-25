let express             = require('express');
let router              = express.Router();
let { ObjectID }        = require('mongodb');
let _                   = require('lodash');
let Subscription        = require('./../models/subscription');
let Account             = require('./../models/account');
let User                = require('./../models/user');
let crypto              = require('crypto');
let sendgrid            = require('./../services/sendgrid');

// Create account and admin user
router.post('/register', (req, res, next) => {

    //@todo : Validate data before doing any registration to avoid orphan data in database
    //@todo : Use bluebird library and avoid global scope variables

    let subscription = new Subscription();
    let account;
    let user;

    subscription
        .save()
        .then(_subscription => {
            let account             = new Account(req.body);
            account.token           = crypto.randomBytes(32).toString('hex');
            account._subscription   = subscription._id;

            return account.save();
        })
        .then(_account => {
            account = _account;
            // Create owner user
            let user = new User({
                type : 'owner',
                _account : account._id,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : req.body.password
            });

            return user.save();
        })
        .then(_user => {
            // Send email
            user        = _user;
            let title   = 'activate_account';

            return new Promise((resolve, reject) => {
                res.render('email/activate', { account, subscription, user, title }, (error, html) => {
                    error ? reject(error) : resolve(html);
                });
            });
        })
        .then(html => {
            return sendgrid.send(user.email, 'activate_account', html);
        })
        .then(response => {
            res.send();
        })
        .catch(e => {
            res.status(400).send(e)
        });
});

// Create account and admin user
router.post('/activate/:token', (req, res, next) => {

    Subscription
        .findOneAndUpdate({ token : req.params.token }, {  $set : { enabledAt : new Date } }, { new : true } ).populate('_account')
        .then((subscription) => {
            res.send(subscription.toJSON());
        })
        .catch((e) => res.status(400).send(e));
});


module.exports = router;
