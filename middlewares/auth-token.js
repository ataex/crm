let jwt         = require('jsonwebtoken');
let config      = require('./../config/config');
let User        = require('./../models/user');
let _           = require('lodash');

module.exports = (req, res, next) => {
    let openRoutes = [
        '/api/user/login',
        '/api/account/register',
        '/api/contact'
    ];

    // If routes is protected
    if(req.method != 'OPTIONS' && !openRoutes.includes(req.path)) {
        // Check if token exists and is valid
        let XAuthToken = req.header('X-Auth-Token');
        jwt.verify(XAuthToken, config.secret, (error, decoded) => {
            let userData = decoded;
            // Deny access
            if(error || _.isEmpty(userData) || !userData.id) { res.status(403).send(); }
            // Allow Access and set environment
            else {
                // Already set token in response
                res.setHeader('X-Auth-Token',  XAuthToken);
                // Get User and set to request so we can use it later
                User.findById(userData.id).populate('_account').then(user => {
                    if(user) req.user = user;
                    else res.status(403).send();
                    next();
                }).catch(e => console.log(e));
            }
        });
    }
    else { next(); }
};