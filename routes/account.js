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

    let subscription = new Subscription();
    let savedAccount;
    let savedSubscription;

    subscription
        .save()
        .then(subscription => {
            savedSubscription       = subscription;
            let account             = new Account(req.body);
            account.token           = crypto.randomBytes(32).toString('hex');
            account._subscription   = subscription._id;

            return account.save();
        })
        .then(account => {
            savedAccount = account;
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
        .then(user => {
            // Send email
            let title = 'activate_account';

            res.render('email/activate', { account : savedAccount, subscription : savedSubscription, user, title }, (error, html) => {
                if(error) return res.status(400).send(error);
                return sendgrid.send(user.email, 'activate_account', html);
            });
        })
        .then(response => {
            console.log(user);
            // res.send(user);
        })
        .catch(e => {
            console.log(e);
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
