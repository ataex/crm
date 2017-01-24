let environement = require('./../config/config.json');

module.exports = (req, res, next) => {
    res.removeHeader('X-Powered-By');

    // Set request type to handle it the way we want later
    let uriSegment = req.path.replace(/^\/|\/$/g, '').split('/');
    req.isApi = uriSegment[0] == 'api' ? true : false;

    console.log(environement);

    next();
};