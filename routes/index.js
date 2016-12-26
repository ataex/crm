var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    let sengrid = require('./../services/sendgrid');

    sengrid.send('thomas.bousquet@gmail.com', 'Mon objet', 'Contenu de mon courriel');

  res.send({ title: 'Express' });
});

module.exports = router;
